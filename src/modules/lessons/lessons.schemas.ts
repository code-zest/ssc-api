import { z } from 'zod';
import { LessonType } from '@prisma/client';

export const createLessonSchema = z.object({
  chapterId: z.string().min(1, 'Chapter ID is required'),
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  type: z.nativeEnum(LessonType),
  videoUrl: z.string().url('Invalid URL').optional().nullable(),
  articleHtml: z.string().optional().nullable(),
  pdfUrl: z.string().url('Invalid URL').optional().nullable(),
  durationMins: z.number().int().positive().optional().nullable(),
  thumbnailUrl: z.string().url('Invalid URL').optional().nullable(),
  order: z.number().int().optional(),
  isFree: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const updateLessonSchema = createLessonSchema.omit({ chapterId: true }).partial();

export const lessonProgressSchema = z.object({
  watchedSeconds: z.number().int().nonnegative().optional(),
  isCompleted: z.boolean().optional(),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type LessonProgressInput = z.infer<typeof lessonProgressSchema>;
