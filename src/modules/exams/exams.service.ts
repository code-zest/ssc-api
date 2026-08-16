import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';

export async function getAllExams(isAdmin: boolean = false, name?: string) {
  const where: { isActive?: boolean; name?: { contains: string; mode: 'insensitive' } } = isAdmin ? {} : { isActive: true };
  if (name) {
    where.name = { contains: name, mode: 'insensitive' };
  }
  return await prisma.targetExam.findMany({
    where,
    orderBy: [{ examYear: 'desc' }, { name: 'asc' }],
    include: {
      _count: {
        select: { syllabusNodes: true }
      }
    }
  });
}

export async function getExamById(id: string) {
  const exam = await prisma.targetExam.findUnique({
    where: { id },
  });
  if (!exam) throw ApiError.notFound('Exam not found');
  return exam;
}

export async function createExam(data: { name: string; examYear?: number; description?: string; isActive?: boolean }) {
  return await prisma.targetExam.create({
    data,
  });
}

export async function updateExam(id: string, data: any) {
  await getExamById(id);
  return await prisma.targetExam.update({
    where: { id },
    data,
  });
}

export async function deleteExam(id: string) {
  await getExamById(id);
  await prisma.targetExam.delete({ where: { id } });
  return { success: true };
}

export async function getExamSyllabus(id: string) {
  await getExamById(id);
  const nodes = await prisma.syllabusNode.findMany({
    where: { examId: id },
    include: {
      subject: { select: { id: true, name: true, slug: true, description: true } },
      chapter: { select: { id: true, name: true, slug: true } }
    },
    orderBy: [{ order: 'asc' }]
  });

  // Group flat nodes into { subject, chapters[], weightage } structure
  const subjectMap = new Map<string, { subject: { id: string; name: string; slug: string; description: string | null }; chapters: { id: string; name: string; slug: string }[]; weightage: number }>();
  for (const node of nodes) {
    if (!subjectMap.has(node.subjectId)) {
      subjectMap.set(node.subjectId, { subject: node.subject, chapters: [], weightage: node.weightage });
    }
    if (node.chapter) {
      subjectMap.get(node.subjectId)!.chapters.push(node.chapter);
    }
  }

  return Array.from(subjectMap.values());
}

export async function addSyllabusNode(examId: string, data: { subjectId: string; chapterId?: string; weightage?: number; order?: number }) {
  await getExamById(examId);
  return await prisma.syllabusNode.create({
    data: {
      examId,
      ...data
    }
  });
}

export async function deleteSyllabusNode(id: string) {
  const node = await prisma.syllabusNode.findUnique({ where: { id } });
  if (!node) throw ApiError.notFound('Syllabus node not found');
  await prisma.syllabusNode.delete({ where: { id } });
  return { success: true };
}
