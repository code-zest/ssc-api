import type { Language } from '@prisma/client';

type QuestionTranslation = {
  locale: Language;
  questionText: string;
  options: unknown;
  explanation: string | null;
};

type QuestionWithTranslations = {
  questionText: string;
  options: unknown;
  explanation: string | null;
  translations?: QuestionTranslation[];
  [key: string]: unknown;
};

/**
 * Overlays translated fields onto a question object.
 * Falls back to EN silently — never throws, never errors.
 * The response shape is IDENTICAL regardless of locale.
 */
export function applyQuestionLocale(
  question: QuestionWithTranslations,
  locale: Language
): QuestionWithTranslations {
  if (locale === 'EN' || !question.translations?.length) return question;

  const t = question.translations.find((tr) => tr.locale === locale);
  if (!t) return question; // EN fallback

  return {
    ...question,
    questionText: t.questionText,
    options: t.options,
    explanation: t.explanation ?? question.explanation,
    translations: undefined, // Strip raw rows — client never needs them
  };
}

type LessonTranslation = {
  locale: Language;
  title: string;
  articleHtml: string | null;
};

type LessonWithTranslations = {
  title: string;
  articleHtml: string | null;
  translations?: LessonTranslation[];
  [key: string]: unknown;
};

export function applyLessonLocale(
  lesson: LessonWithTranslations,
  locale: Language
): LessonWithTranslations {
  if (locale === 'EN' || !lesson.translations?.length) return lesson;

  const t = lesson.translations.find((tr) => tr.locale === locale);
  if (!t) return lesson; // EN fallback

  return {
    ...lesson,
    title: t.title,
    articleHtml: t.articleHtml ?? lesson.articleHtml,
    translations: undefined,
  };
}

/**
 * Parse the ?locale= query param. Returns 'EN' if absent or invalid.
 */
export function parseLocale(raw?: string): Language {
  const valid: Language[] = ['EN', 'HI', 'TE'];
  const upper = raw?.toUpperCase() as Language;
  return valid.includes(upper) ? upper : 'EN';
}
