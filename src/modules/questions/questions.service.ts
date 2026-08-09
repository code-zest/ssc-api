import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { CreateQuestionInput, UpdateQuestionInput, BulkImportInput } from './questions.schemas';
import { Prisma } from '@prisma/client';

// ─── Get Questions ────────────────────────────────────────────────────────────

export async function getQuestions(
  page: number,
  limit: number,
  subjectId?: string,
  chapterId?: string,
  search?: string,
) {
  const where: Prisma.QuestionWhereInput = {};

  if (subjectId) where.subjectId = subjectId;
  if (chapterId) where.chapterId = chapterId;
  if (search) {
    where.OR = [
      { questionText: { contains: search, mode: 'insensitive' } },
      { tags: { has: search } },
    ];
  }

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: 'desc' },
      include: {
        subject: { select: { name: true, id: true } },
        chapter: { select: { name: true, id: true } },
      },
    }),
    prisma.question.count({ where }),
  ]);

  return { questions, total };
}

// ─── Get Question by ID ───────────────────────────────────────────────────────

export async function getQuestionById(id: string) {
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      subject: { select: { name: true } },
      chapter: { select: { name: true } },
    },
  });

  if (!question) throw ApiError.notFound('Question not found');
  return question;
}

// ─── Create Question ──────────────────────────────────────────────────────────

export async function createQuestion(input: CreateQuestionInput) {
  // Validate subject & chapter existence
  const chapter = await prisma.chapter.findUnique({ where: { id: input.chapterId } });
  if (!chapter || chapter.subjectId !== input.subjectId) {
    throw ApiError.badRequest('Invalid chapter or subject ID mismatch');
  }

  // Cast options to generic JSON array for Prisma
  const optionsInput = input.options as unknown as Prisma.InputJsonValue;

  return prisma.question.create({
    data: {
      ...input,
      options: optionsInput,
    },
  });
}

// ─── Bulk Import Questions ────────────────────────────────────────────────────

export async function bulkImportQuestions(input: BulkImportInput) {
  // Validate that all chapters exist and map correctly to subjects
  const chapterIds = Array.from(new Set(input.questions.map(q => q.chapterId)));
  const chapters = await prisma.chapter.findMany({
    where: { id: { in: chapterIds } },
    select: { id: true, subjectId: true },
  });

  const chapterMap = new Map(chapters.map(c => [c.id, c.subjectId]));

  const validQuestions = input.questions.map(q => {
    if (chapterMap.get(q.chapterId) !== q.subjectId) {
      throw ApiError.badRequest(`Mismatch between subjectId and chapterId for question: ${q.questionText.substring(0, 30)}...`);
    }
    return {
      ...q,
      options: q.options as unknown as Prisma.InputJsonValue,
    };
  });

  const result = await prisma.question.createMany({
    data: validQuestions,
    skipDuplicates: true,
  });

  return { count: result.count };
}

// ─── Update Question ──────────────────────────────────────────────────────────

export async function updateQuestion(id: string, input: UpdateQuestionInput) {
  const question = await prisma.question.findUnique({ where: { id } });
  if (!question) throw ApiError.notFound('Question not found');

  if (input.chapterId && input.subjectId) {
    const chapter = await prisma.chapter.findUnique({ where: { id: input.chapterId } });
    if (!chapter || chapter.subjectId !== input.subjectId) {
      throw ApiError.badRequest('Invalid chapter or subject ID mismatch');
    }
  }

  const updateData: Prisma.QuestionUpdateInput = { ...input };
  if (input.options) {
    updateData.options = input.options as unknown as Prisma.InputJsonValue;
  }

  return prisma.question.update({
    where: { id },
    data: updateData,
  });
}

// ─── Delete Question ──────────────────────────────────────────────────────────

export async function deleteQuestion(id: string) {
  const question = await prisma.question.findUnique({ where: { id } });
  if (!question) throw ApiError.notFound('Question not found');

  await prisma.question.delete({ where: { id } });
  return { message: 'Question deleted successfully' };
}
