import { prisma } from '../../config/prisma';
import { CreateArticleInput, UpdateArticleInput } from './articles.schemas';
import { ApiError } from '../../utils/ApiError';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createArticle(data: CreateArticleInput, authorId: string) {
  let slug = generateSlug(data.title);

  // Check if slug exists and make unique if needed
  let existing = await prisma.article.findUnique({ where: { slug } });
  let counter = 1;
  while (existing) {
    slug = `${generateSlug(data.title)}-${counter}`;
    existing = await prisma.article.findUnique({ where: { slug } });
    counter++;
  }

  const publishedAt = data.isPublished ? new Date() : null;

  return prisma.article.create({
    data: {
      ...data,
      slug,
      authorId,
      publishedAt,
    },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } }
    }
  });
}

export async function getAllArticles(filters: { isPublished?: boolean; categoryId?: string } = {}) {
  const where: any = {};
  
  if (filters.isPublished !== undefined) {
    where.isPublished = filters.isPublished;
  }
  
  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  return prisma.article.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } }
    }
  });
}

export async function getArticleBySlug(slug: string, requirePublished = false) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } }
    }
  });

  if (!article) {
    throw new ApiError(404, 'Article not found');
  }

  if (requirePublished && !article.isPublished) {
    throw new ApiError(404, 'Article not found or not published');
  }

  return article;
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    throw new ApiError(404, 'Article not found');
  }

  let slug = article.slug;
  if (data.title && data.title !== article.title) {
    let baseSlug = generateSlug(data.title);
    slug = baseSlug;
    let existing = await prisma.article.findUnique({ where: { slug } });
    let counter = 1;
    while (existing && existing.id !== id) {
      slug = `${baseSlug}-${counter}`;
      existing = await prisma.article.findUnique({ where: { slug } });
      counter++;
    }
  }

  const dataToUpdate: any = { ...data, slug };
  
  // Handle publish timestamp logic
  if (data.isPublished && !article.isPublished) {
    dataToUpdate.publishedAt = new Date();
  } else if (data.isPublished === false) {
    dataToUpdate.publishedAt = null;
  }

  return prisma.article.update({
    where: { id },
    data: dataToUpdate,
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } }
    }
  });
}

export async function deleteArticle(id: string) {
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    throw new ApiError(404, 'Article not found');
  }

  await prisma.article.delete({ where: { id } });
  return { success: true };
}
