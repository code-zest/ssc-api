import { z } from 'zod';
import { Difficulty, ExamType, Language } from '@prisma/client';

export const questionOptionSchema = z.object({
  key: z.string().min(1), // e.g. "A", "B"
  text: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  rationale: z.string().optional().nullable(),
  formatType: z.enum(["TEXT", "RICH_TEXT"]).optional(),
});

export const createQuestionSchema = z.object({
  subjectId: z.string().min(1, 'Subject ID is required'),
  chapterId: z.string().min(1, 'Chapter ID is required'),
  questionText: z.string().min(2, 'Question text is required'),
  questionImageUrl: z.string().url().optional().nullable(),
  options: z.array(questionOptionSchema).min(2, 'At least 2 options required'),
  correctOption: z.string().min(1, 'Correct option key is required'),
  explanation: z.string().optional().nullable(),
  explanationImageUrl: z.string().url().optional().nullable(),
  difficulty: z.nativeEnum(Difficulty).optional(),
  examTypes: z.array(z.nativeEnum(ExamType)).optional(),
  pyqYear: z.number().int().optional().nullable(),
  pyqShift: z.number().int().optional().nullable(),
  pyqDate: z.string().datetime().optional().nullable(),
  isPYQ: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  language: z.nativeEnum(Language).optional(),
});

export const updateQuestionSchema = createQuestionSchema.partial();

export const bulkImportSchema = z.object({
  questions: z.array(createQuestionSchema).min(1, 'At least 1 question is required'),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
export type BulkImportInput = z.infer<typeof bulkImportSchema>;
