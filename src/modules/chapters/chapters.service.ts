import slugify from 'slugify';
import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { CreateChapterInput, UpdateChapterInput } from './chapters.schemas';

// ─── Create Chapter ───────────────────────────────────────────────────────────

export async function getChapterById(id: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
  });

  if (!chapter) {
    throw ApiError.notFound('Chapter not found');
  }

  return chapter;
}

export async function getChapterLessons(chapterId: string, isAdmin: boolean) {
  const where = isAdmin ? { chapterId } : { chapterId, isActive: true };

  return prisma.lesson.findMany({
    where,
    orderBy: { order: 'asc' },
  });
}

export async function createChapter(input: CreateChapterInput) {
  const subject = await prisma.subject.findUnique({ where: { id: input.subjectId } });
  if (!subject) throw ApiError.notFound('Subject not found');

  const slug = slugify(input.name, { lower: true, strict: true });

  const existing = await prisma.chapter.findFirst({
    where: { subjectId: input.subjectId, slug },
  });
  if (existing) {
    throw ApiError.conflict('A chapter with a similar name already exists in this subject');
  }

  let order = input.order;
  if (order === undefined) {
    const last = await prisma.chapter.findFirst({
      where: { subjectId: input.subjectId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = last ? last.order + 1 : 0;
  }

  return prisma.chapter.create({
    data: {
      ...input,
      slug,
      order,
    },
  });
}

// ─── Update Chapter ───────────────────────────────────────────────────────────

export async function updateChapter(id: string, input: UpdateChapterInput) {
  const chapter = await prisma.chapter.findUnique({ where: { id } });
  if (!chapter) throw ApiError.notFound('Chapter not found');

  let slug = chapter.slug;
  if (input.name && input.name !== chapter.name) {
    slug = slugify(input.name, { lower: true, strict: true });
    const existing = await prisma.chapter.findFirst({
      where: { subjectId: chapter.subjectId, slug, id: { not: id } },
    });
    if (existing) throw ApiError.conflict('A chapter with this name already exists in this subject');
  }

  return prisma.chapter.update({
    where: { id },
    data: {
      ...input,
      slug,
    },
  });
}

// ─── Delete Chapter ───────────────────────────────────────────────────────────

export async function deleteChapter(id: string) {
  const chapter = await prisma.chapter.findUnique({ where: { id } });
  if (!chapter) throw ApiError.notFound('Chapter not found');

  await prisma.chapter.delete({ where: { id } });
  return { message: 'Chapter deleted successfully' };
}

// ─── Reorder Chapters ─────────────────────────────────────────────────────────

export async function reorderChapters(updates: { id: string; order: number }[]) {
  // Use a transaction to apply all updates at once
  await prisma.$transaction(
    updates.map((update) =>
      prisma.chapter.update({
        where: { id: update.id },
        data: { order: update.order },
      })
    )
  );
  return { message: 'Chapters reordered successfully' };
}
