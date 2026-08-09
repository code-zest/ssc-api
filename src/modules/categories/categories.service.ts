import { prisma } from '../../config/prisma';
import { CreateCategoryInput, UpdateCategoryInput } from './categories.schemas';
import { ApiError } from '../../utils/ApiError';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createCategory(data: CreateCategoryInput) {
  const slug = generateSlug(data.name);

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    throw new ApiError(400, 'A category with this name already exists');
  }

  return prisma.category.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function getAllCategories(includeInactive = false) {
  return prisma.category.findMany({
    where: includeInactive ? undefined : { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  let slug = category.slug;
  if (data.name && data.name !== category.name) {
    slug = generateSlug(data.name);
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      throw new ApiError(400, 'A category with this name already exists');
    }
  }

  return prisma.category.update({
    where: { id },
    data: {
      ...data,
      slug,
    },
  });
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { articles: true } } },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  if (category._count.articles > 0) {
    throw new ApiError(400, 'Cannot delete category with associated articles');
  }

  await prisma.category.delete({ where: { id } });
  return { success: true };
}
