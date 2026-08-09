import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  contentMd: z.string().min(10, 'Content must be at least 10 characters'),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  categoryId: z.string().cuid('Invalid category ID').optional().nullable(),
  isPublished: z.boolean().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
