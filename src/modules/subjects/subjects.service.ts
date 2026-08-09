import slugify from 'slugify';
import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { CreateSubjectInput, UpdateSubjectInput } from './subjects.schemas';

// ─── Get All Subjects ─────────────────────────────────────────────────────────

export async function getAllSubjects(isAdmin: boolean) {
  // Public/Student only sees active subjects. Admin sees all.
  const where = isAdmin ? {} : { isActive: true };

  return prisma.subject.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { chapters: true },
      },
    },
  });
}

// ─── Get Subject By Slug ──────────────────────────────────────────────────────

export async function getSubjectBySlug(slug: string, isAdmin: boolean) {
  const where = isAdmin ? { slug } : { slug, isActive: true };

  const subject = await prisma.subject.findFirst({
    where,
    include: {
      chapters: {
        where: isAdmin ? {} : { isActive: true },
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: { lessons: true },
          },
        },
      },
    },
  });

  if (!subject) {
    throw ApiError.notFound('Subject not found');
  }

  return subject;
}

// ─── Get Chapters By Subject ID ───────────────────────────────────────────────

export async function getSubjectChapters(subjectId: string, isAdmin: boolean) {
  const where = isAdmin ? { subjectId } : { subjectId, isActive: true };

  return prisma.chapter.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { lessons: true },
      },
    },
  });
}

// ─── Create Subject ───────────────────────────────────────────────────────────

export async function createSubject(input: CreateSubjectInput) {
  const slug = slugify(input.name, { lower: true, strict: true });

  const existing = await prisma.subject.findUnique({ where: { slug } });
  if (existing) {
    throw ApiError.conflict('A subject with a similar name already exists');
  }

  // If no order provided, put it at the end
  let order = input.order;
  if (order === undefined) {
    const last = await prisma.subject.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = last ? last.order + 1 : 0;
  }

  return prisma.subject.create({
    data: {
      ...input,
      slug,
      order,
    },
  });
}

// ─── Update Subject ───────────────────────────────────────────────────────────

export async function updateSubject(id: string, input: UpdateSubjectInput) {
  const subject = await prisma.subject.findUnique({ where: { id } });
  if (!subject) {
    throw ApiError.notFound('Subject not found');
  }

  let slug = subject.slug;
  if (input.name && input.name !== subject.name) {
    slug = slugify(input.name, { lower: true, strict: true });
    const existing = await prisma.subject.findFirst({
      where: { slug, id: { not: id } },
    });
    if (existing) {
      throw ApiError.conflict('A subject with this name already exists');
    }
  }

  return prisma.subject.update({
    where: { id },
    data: {
      ...input,
      slug,
    },
  });
}

// ─── Delete Subject ───────────────────────────────────────────────────────────

export async function deleteSubject(id: string) {
  const subject = await prisma.subject.findUnique({ where: { id } });
  if (!subject) {
    throw ApiError.notFound('Subject not found');
  }

  await prisma.subject.delete({ where: { id } });
  return { message: 'Subject deleted successfully' };
}
