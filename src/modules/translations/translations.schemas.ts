import { z } from 'zod';
import { Language } from '@prisma/client';

export const listTranslationsSchema = z.object({
  query: z.object({
    locale: z.enum(['HI', 'TE'] as const).optional(),
    isVerified: z.enum(['true', 'false']).optional(),
    page: z.string().regex(/^\d+$/).optional().default('1'),
    limit: z.string().regex(/^\d+$/).optional().default('20'),
    type: z.enum(['question', 'lesson']).optional().default('question'),
  }),
});

export const updateQuestionTranslationSchema = z.object({
  body: z.object({
    questionText: z.string().min(1),
    options: z.array(
      z.object({
        key: z.string(),
        text: z.string(),
        imageUrl: z.string().optional(),
      })
    ),
    explanation: z.string().nullable().optional(),
    isVerified: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const updateLessonTranslationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    articleHtml: z.string().nullable().optional(),
    isVerified: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
