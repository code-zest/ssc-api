import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { 
  CreateMockTestInput, 
  UpdateMockTestInput, 
  CreateMockTestSectionInput,
  UpdateMockTestSectionInput,
  AssignQuestionsToSectionInput
} from './mockTests.schemas';

// ─── Mock Tests ───────────────────────────────────────────────────────────────

export async function getMockTests(isAdmin: boolean, examType?: string) {
  const where: any = isAdmin ? {} : { isActive: true };
  
  if (examType) {
    where.examType = examType;
  }
  return prisma.mockTest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      sections: {
        orderBy: { order: 'asc' },
      },
      _count: {
        select: { sections: true }
      }
    },
  });
}

export async function getMockTestById(id: string, isAdmin: boolean) {
  const where = isAdmin ? { id } : { id, isActive: true };
  const test = await prisma.mockTest.findUnique({
    where,
    include: {
      sections: {
        orderBy: { order: 'asc' },
        include: {
          questions: {
            orderBy: { order: 'asc' },
            include: { question: true },
          },
        },
      },
    },
  });

  if (!test) throw ApiError.notFound('Mock test not found');
  return test;
}

export async function createMockTest(input: CreateMockTestInput) {
  return prisma.mockTest.create({ data: input });
}

export async function updateMockTest(id: string, input: UpdateMockTestInput) {
  const test = await prisma.mockTest.findUnique({ where: { id } });
  if (!test) throw ApiError.notFound('Mock test not found');
  return prisma.mockTest.update({ where: { id }, data: input });
}

export async function deleteMockTest(id: string) {
  const test = await prisma.mockTest.findUnique({ where: { id } });
  if (!test) throw ApiError.notFound('Mock test not found');
  await prisma.mockTest.delete({ where: { id } });
  return { message: 'Mock test deleted successfully' };
}

// ─── Mock Test Sections ───────────────────────────────────────────────────────

export async function createSection(mockTestId: string, input: CreateMockTestSectionInput) {
  const test = await prisma.mockTest.findUnique({ where: { id: mockTestId } });
  if (!test) throw ApiError.notFound('Mock test not found');

  let order = input.order;
  if (order === undefined) {
    const last = await prisma.mockTestSection.findFirst({
      where: { mockTestId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = last ? last.order + 1 : 0;
  }

  return prisma.mockTestSection.create({
    data: { ...input, mockTestId, order },
  });
}

export async function updateSection(sectionId: string, input: UpdateMockTestSectionInput) {
  const section = await prisma.mockTestSection.findUnique({ where: { id: sectionId } });
  if (!section) throw ApiError.notFound('Section not found');
  return prisma.mockTestSection.update({ where: { id: sectionId }, data: input });
}

export async function deleteSection(sectionId: string) {
  const section = await prisma.mockTestSection.findUnique({ where: { id: sectionId } });
  if (!section) throw ApiError.notFound('Section not found');
  await prisma.mockTestSection.delete({ where: { id: sectionId } });
  return { message: 'Section deleted successfully' };
}

// ─── Assign Questions to Section ──────────────────────────────────────────────

export async function assignQuestionsToSection(sectionId: string, input: AssignQuestionsToSectionInput) {
  const section = await prisma.mockTestSection.findUnique({ where: { id: sectionId } });
  if (!section) throw ApiError.notFound('Section not found');

  // Verify all questions exist
  const existingQuestions = await prisma.question.findMany({
    where: { id: { in: input.questionIds } },
    select: { id: true },
  });

  if (existingQuestions.length !== input.questionIds.length) {
    throw ApiError.badRequest('One or more question IDs are invalid');
  }

  const lastQ = await prisma.mockTestSectionQuestion.findFirst({
    where: { sectionId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  
  let currentOrder = lastQ ? lastQ.order + 1 : 1;

  const alreadyInSet = await prisma.mockTestSectionQuestion.findMany({
    where: { sectionId, questionId: { in: input.questionIds } },
    select: { questionId: true },
  });
  const alreadyInSetSet = new Set(alreadyInSet.map(q => q.questionId));

  const toInsert = input.questionIds
    .filter(id => !alreadyInSetSet.has(id))
    .map(id => ({
      sectionId,
      questionId: id,
      order: currentOrder++,
    }));

  if (toInsert.length > 0) {
    await prisma.mockTestSectionQuestion.createMany({ data: toInsert });
  }

  return { message: `Added ${toInsert.length} new questions to mock test section` };
}

export async function removeQuestionFromSection(sectionId: string, questionId: string) {
  await prisma.mockTestSectionQuestion.delete({
    where: { sectionId_questionId: { sectionId, questionId } },
  });
  return { message: 'Question removed from section' };
}
