import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { Prisma, Language } from '@prisma/client';

export async function getQuestionTranslations(
  locale?: Language,
  isVerified?: boolean,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;
  const where: Prisma.QuestionTranslationWhereInput = {};
  if (locale) where.locale = locale;
  if (isVerified !== undefined) where.isVerified = isVerified;

  const [data, total] = await Promise.all([
    prisma.questionTranslation.findMany({
      where,
      include: {
        question: {
          include: {
            subject: { select: { name: true } },
            chapter: { select: { name: true } }
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.questionTranslation.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getLessonTranslations(
  locale?: Language,
  isVerified?: boolean,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;
  const where: Prisma.LessonTranslationWhereInput = {};
  if (locale) where.locale = locale;
  if (isVerified !== undefined) where.isVerified = isVerified;

  const [data, total] = await Promise.all([
    prisma.lessonTranslation.findMany({
      where,
      include: {
        lesson: {
          include: {
            subject: { select: { name: true } },
            chapter: { select: { name: true } }
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.lessonTranslation.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function updateQuestionTranslation(
  id: string,
  data: { questionText: string; options: any; explanation?: string | null; isVerified?: boolean },
  userId: string
) {
  const existing = await prisma.questionTranslation.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Question translation not found');

  return prisma.questionTranslation.update({
    where: { id },
    data: {
      ...data,
      translatedBy: data.isVerified ? userId : existing.translatedBy,
    },
  });
}

export async function updateLessonTranslation(
  id: string,
  data: { title: string; articleHtml?: string | null; isVerified?: boolean },
  userId: string
) {
  const existing = await prisma.lessonTranslation.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Lesson translation not found');

  return prisma.lessonTranslation.update({
    where: { id },
    data: {
      ...data,
      translatedBy: data.isVerified ? userId : existing.translatedBy,
    },
  });
}

export async function getTranslationStats() {
  const [qTotal, qVerified, lTotal, lVerified] = await Promise.all([
    prisma.questionTranslation.count(),
    prisma.questionTranslation.count({ where: { isVerified: true } }),
    prisma.lessonTranslation.count(),
    prisma.lessonTranslation.count({ where: { isVerified: true } }),
  ]);

  return {
    questions: { total: qTotal, verified: qVerified },
    lessons: { total: lTotal, verified: lVerified },
  };
}
