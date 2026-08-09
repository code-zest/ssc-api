import { z } from 'zod';

export const createPracticeSetSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  subjectId: z.string().min(1, 'Subject ID is required'),
  chapterId: z.string().optional().nullable(),
  isFree: z.boolean().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updatePracticeSetSchema = createPracticeSetSchema.partial();

export const addQuestionsToSetSchema = z.object({
  questionIds: z.array(z.string()).min(1, 'At least 1 question ID is required'),
});

export type CreatePracticeSetInput = z.infer<typeof createPracticeSetSchema>;
export type UpdatePracticeSetInput = z.infer<typeof updatePracticeSetSchema>;
export type AddQuestionsToSetInput = z.infer<typeof addQuestionsToSetSchema>;
