import { z } from 'zod';
import { ExamType } from '@prisma/client';

export const createSubjectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  iconUrl: z.string().url('Invalid URL').optional().nullable(),
  description: z.string().optional().nullable(),
  examTypes: z.array(z.nativeEnum(ExamType)).optional(),
  order: z.number().int().optional(),
});

export const updateSubjectSchema = createSubjectSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;
