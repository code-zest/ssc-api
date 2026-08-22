import slugify from 'slugify';
import { StudyPersona } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { CreateLessonInput, UpdateLessonInput, LessonProgressInput } from './lessons.schemas';

// ─── Get Lessons by Chapter ───────────────────────────────────────────────────

export async function getLessonsByChapter(chapterId: string, isAdmin: boolean, userId?: string) {
  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } });
  if (!chapter) throw ApiError.notFound('Chapter not found');

  const where = isAdmin ? { chapterId } : { chapterId, isActive: true };

  // Resolve studyPersona from DB for authenticated students
  let studentPersona: StudyPersona | null = null;
  if (!isAdmin && userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { studyPersona: true },
    });
    studentPersona = user?.studyPersona ?? null;
  }

  // PART_TIME_ASPIRANT: surface short lessons first (industry standard — sort, don't hide)
  // All other personas: standard chapter order
  const orderBy =
    studentPersona === 'PART_TIME_ASPIRANT'
      ? [{ durationMins: 'asc' as const }, { order: 'asc' as const }]
      : [{ order: 'asc' as const }];

  const lessons = await prisma.lesson.findMany({
    where,
    orderBy,
    include: userId
      ? {
          progress: {
            where: { studentId: userId },
            select: { watchedSeconds: true, completedAt: true },
          },
        }
      : undefined,
  });

  return lessons;
}

// ─── Get Lesson Details (Consumption) ─────────────────────────────────────────

export async function getLessonBySlug(subjectSlug: string, chapterSlug: string, lessonSlug: string, isAdmin: boolean, userId?: string) {
  const where = {
    slug: lessonSlug,
    chapter: {
      slug: chapterSlug,
      subject: { slug: subjectSlug }
    },
    ...(isAdmin ? {} : { isActive: true })
  };

  const lesson = await prisma.lesson.findFirst({
    where,
    include: {
      chapter: true,
      subject: true,
      ...(userId
        ? {
            progress: {
              where: { studentId: userId },
              select: { watchedSeconds: true, completedAt: true },
            },
          }
        : {}),
    },
  });

  if (!lesson) throw ApiError.notFound('Lesson not found');
  return lesson;
}

// ─── Create Lesson ────────────────────────────────────────────────────────────

export async function createLesson(input: CreateLessonInput) {
  const chapter = await prisma.chapter.findUnique({ where: { id: input.chapterId } });
  if (!chapter) throw ApiError.notFound('Chapter not found');

  const slug = slugify(input.title, { lower: true, strict: true });

  const existing = await prisma.lesson.findFirst({
    where: { chapterId: input.chapterId, slug },
  });
  if (existing) throw ApiError.conflict('A lesson with a similar title already exists in this chapter');

  let order = input.order;
  if (order === undefined) {
    const last = await prisma.lesson.findFirst({
      where: { chapterId: input.chapterId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = last ? last.order + 1 : 0;
  }

  return prisma.lesson.create({
    data: {
      ...input,
      subjectId: chapter.subjectId, // Denormalized field
      slug,
      order,
    },
  });
}

// ─── Update Lesson ────────────────────────────────────────────────────────────

export async function updateLesson(id: string, input: UpdateLessonInput) {
  const lesson = await prisma.lesson.findUnique({ where: { id } });
  if (!lesson) throw ApiError.notFound('Lesson not found');

  let slug = lesson.slug;
  if (input.title && input.title !== lesson.title) {
    slug = slugify(input.title, { lower: true, strict: true });
    const existing = await prisma.lesson.findFirst({
      where: { chapterId: lesson.chapterId, slug, id: { not: id } },
    });
    if (existing) throw ApiError.conflict('A lesson with this title already exists in this chapter');
  }

  return prisma.lesson.update({
    where: { id },
    data: {
      ...input,
      slug,
    },
  });
}

// ─── Delete Lesson ────────────────────────────────────────────────────────────

export async function deleteLesson(id: string) {
  const lesson = await prisma.lesson.findUnique({ where: { id } });
  if (!lesson) throw ApiError.notFound('Lesson not found');

  await prisma.lesson.delete({ where: { id } });
  return { message: 'Lesson deleted successfully' };
}

// ─── Track Progress ───────────────────────────────────────────────────────────

export async function updateLessonProgress(lessonId: string, studentId: string, input: LessonProgressInput) {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) throw ApiError.notFound('Lesson not found');

  const data: { watchedSeconds?: number; completedAt?: Date } = {};
  if (input.watchedSeconds !== undefined) {
    data.watchedSeconds = input.watchedSeconds;
  }
  if (input.isCompleted) {
    data.completedAt = new Date();
  }

  return prisma.lessonProgress.upsert({
    where: { studentId_lessonId: { studentId, lessonId } },
    create: {
      studentId,
      lessonId,
      watchedSeconds: input.watchedSeconds ?? 0,
      completedAt: input.isCompleted ? new Date() : undefined,
    },
    update: data,
  });
}

// ─── Reorder Lessons ──────────────────────────────────────────────────────────

export async function reorderLessons(updates: { id: string; order: number }[]) {
  await prisma.$transaction(
    updates.map((update) =>
      prisma.lesson.update({
        where: { id: update.id },
        data: { order: update.order },
      })
    )
  );
  return { message: 'Lessons reordered successfully' };
}
