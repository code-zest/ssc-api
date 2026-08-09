import { z } from 'zod';
import { ExamType } from '@prisma/client';

export const createMockTestSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  examType: z.nativeEnum(ExamType),
  totalQuestions: z.number().int().positive(),
  totalMarks: z.number().int().positive(),
  durationMinutes: z.number().int().positive(),
  markingCorrect: z.number().optional(),
  markingIncorrect: z.number().optional(),
  markingSkipped: z.number().optional(),
  isFree: z.boolean().optional(),
  isActive: z.boolean().optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
});

export const updateMockTestSchema = createMockTestSchema.partial();

export const createMockTestSectionSchema = z.object({
  name: z.string().min(2, 'Section name is required'),
  subjectId: z.string().min(1, 'Subject ID is required'),
  questionCount: z.number().int().positive(),
  maxMarks: z.number().int().positive(),
  durationMins: z.number().int().positive().optional().nullable(),
  order: z.number().int().optional(),
});

export const updateMockTestSectionSchema = createMockTestSectionSchema.partial();

export const assignQuestionsToSectionSchema = z.object({
  questionIds: z.array(z.string()).min(1),
});

export type CreateMockTestInput = z.infer<typeof createMockTestSchema>;
export type UpdateMockTestInput = z.infer<typeof updateMockTestSchema>;
export type CreateMockTestSectionInput = z.infer<typeof createMockTestSectionSchema>;
export type UpdateMockTestSectionInput = z.infer<typeof updateMockTestSectionSchema>;
export type AssignQuestionsToSectionInput = z.infer<typeof assignQuestionsToSectionSchema>;
