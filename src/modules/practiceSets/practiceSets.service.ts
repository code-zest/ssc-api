import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { CreatePracticeSetInput, UpdatePracticeSetInput, AddQuestionsToSetInput } from './practiceSets.schemas';

// ─── Get Practice Sets ────────────────────────────────────────────────────────

import { Prisma } from '@prisma/client';

export async function getPracticeSets(isAdmin: boolean, subjectId?: string, chapterId?: string) {
  const where: Prisma.PracticeSetWhereInput = isAdmin ? {} : { isActive: true };
  if (subjectId) where.subjectId = subjectId;
  if (chapterId) where.chapterId = chapterId;

  return prisma.practiceSet.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      subject: { select: { name: true } },
      chapter: { select: { name: true } },
    },
  });
}

// ─── Get Practice Set Details ─────────────────────────────────────────────────

export async function getPracticeSetById(id: string, isAdmin: boolean) {
  const where = isAdmin ? { id } : { id, isActive: true };
  const practiceSet = await prisma.practiceSet.findUnique({
    where,
    include: {
      subject: { select: { name: true } },
      chapter: { select: { name: true } },
      questions: {
        orderBy: { order: 'asc' },
        include: { question: true },
      },
    },
  });

  if (!practiceSet) throw ApiError.notFound('Practice set not found');
  return practiceSet;
}

// ─── Create Practice Set ──────────────────────────────────────────────────────

export async function createPracticeSet(input: CreatePracticeSetInput) {
  const subject = await prisma.subject.findUnique({ where: { id: input.subjectId } });
  if (!subject) throw ApiError.notFound('Subject not found');

  if (input.chapterId) {
    const chapter = await prisma.chapter.findUnique({ where: { id: input.chapterId } });
    if (!chapter || chapter.subjectId !== input.subjectId) {
      throw ApiError.badRequest('Invalid chapter or subject ID mismatch');
    }
  }

  let order = input.order;
  if (order === undefined) {
    const last = await prisma.practiceSet.findFirst({
      where: { subjectId: input.subjectId, chapterId: input.chapterId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = last ? last.order + 1 : 0;
  }

  return prisma.practiceSet.create({
    data: {
      ...input,
      order,
    },
  });
}

// ─── Update Practice Set ──────────────────────────────────────────────────────

export async function updatePracticeSet(id: string, input: UpdatePracticeSetInput) {
  const practiceSet = await prisma.practiceSet.findUnique({ where: { id } });
  if (!practiceSet) throw ApiError.notFound('Practice set not found');

  return prisma.practiceSet.update({
    where: { id },
    data: input,
  });
}

// ─── Delete Practice Set ──────────────────────────────────────────────────────

export async function deletePracticeSet(id: string) {
  const practiceSet = await prisma.practiceSet.findUnique({ where: { id } });
  if (!practiceSet) throw ApiError.notFound('Practice set not found');

  await prisma.practiceSet.delete({ where: { id } });
  return { message: 'Practice set deleted successfully' };
}

// ─── Assign Questions to Practice Set ─────────────────────────────────────────

export async function assignQuestionsToSet(practiceSetId: string, input: AddQuestionsToSetInput) {
  const practiceSet = await prisma.practiceSet.findUnique({ where: { id: practiceSetId } });
  if (!practiceSet) throw ApiError.notFound('Practice set not found');

  // Verify all questions exist
  const existingQuestions = await prisma.question.findMany({
    where: { id: { in: input.questionIds } },
    select: { id: true },
  });

  if (existingQuestions.length !== input.questionIds.length) {
    throw ApiError.badRequest('One or more question IDs are invalid');
  }

  // Get current max order
  const lastQ = await prisma.practiceSetQuestion.findFirst({
    where: { practiceSetId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  
  let currentOrder = lastQ ? lastQ.order + 1 : 1;

  // We should ignore ones already in the set
  const alreadyInSet = await prisma.practiceSetQuestion.findMany({
    where: { practiceSetId, questionId: { in: input.questionIds } },
    select: { questionId: true },
  });
  const alreadyInSetSet = new Set(alreadyInSet.map(q => q.questionId));

  const toInsert = input.questionIds
    .filter(id => !alreadyInSetSet.has(id))
    .map(id => ({
      practiceSetId,
      questionId: id,
      order: currentOrder++,
    }));

  if (toInsert.length > 0) {
    await prisma.practiceSetQuestion.createMany({ data: toInsert });
    
    // Update question count
    const newCount = await prisma.practiceSetQuestion.count({ where: { practiceSetId } });
    await prisma.practiceSet.update({
      where: { id: practiceSetId },
      data: { questionCount: newCount },
    });
  }

  return { message: `Added ${toInsert.length} new questions to practice set` };
}

// ─── Remove Question from Practice Set ────────────────────────────────────────

export async function removeQuestionFromSet(practiceSetId: string, questionId: string) {
  await prisma.practiceSetQuestion.delete({
    where: { practiceSetId_questionId: { practiceSetId, questionId } },
  });

  const newCount = await prisma.practiceSetQuestion.count({ where: { practiceSetId } });
  await prisma.practiceSet.update({
    where: { id: practiceSetId },
    data: { questionCount: newCount },
  });

  return { message: 'Question removed from practice set' };
}
