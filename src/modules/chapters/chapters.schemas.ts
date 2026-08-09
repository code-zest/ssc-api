import { z } from 'zod';

export const createChapterSchema = z.object({
  subjectId: z.string().min(1, 'Subject ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(150),
  description: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

export const updateChapterSchema = createChapterSchema.omit({ subjectId: true }).partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateChapterInput = z.infer<typeof createChapterSchema>;
export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;
