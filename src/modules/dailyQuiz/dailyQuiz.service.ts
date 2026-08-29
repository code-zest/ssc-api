import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';

export async function getTodayQuiz(locale: import('@prisma/client').Language = 'EN') {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Check if we already generated a quiz for today
  let quiz = await prisma.dailyQuiz.findUnique({
    where: { date: today },
    include: {
      questions: {
        include: {
          question: {
            include: {
              translations: locale !== 'EN' ? {
                where: { locale, isVerified: true },
                select: { locale: true, questionText: true, options: true, explanation: true },
              } : false,
            }
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  // If not, generate one
  if (!quiz) {
    // Pick 10 random questions
    const randomQuestions = await prisma.$queryRaw<
      { id: string }[]
    >`SELECT id FROM "questions" ORDER BY RANDOM() LIMIT 10`;

    if (randomQuestions.length === 0) {
      throw ApiError.internal('Not enough questions to generate daily quiz');
    }

    const title = `Daily 10-Minute Challenge - ${today.toLocaleDateString('en-GB')}`;
    
    quiz = await prisma.dailyQuiz.create({
      data: {
        date: today,
        title,
        description: 'Take this quick 10-minute challenge to maintain your daily streak!',
        questions: {
          create: randomQuestions.map((q: { id: string }, index: number) => ({
            questionId: q.id,
            order: index + 1,
          })),
        },
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                translations: locale !== 'EN' ? {
                  where: { locale, isVerified: true },
                  select: { locale: true, questionText: true, options: true, explanation: true },
                } : false,
              }
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // Apply locale overlay if needed
  if (locale !== 'EN') {
    const { applyQuestionLocale } = require('../../utils/locale');
    quiz.questions = quiz.questions.map((q: any) => ({
      ...q,
      question: applyQuestionLocale(q.question, locale),
    }));
  }

  // Map to common attempt format structure for the frontend test engine
  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    date: quiz.date,
    questions: quiz.questions.map((q) => ({
      id: q.question.id,
      content: q.question.questionText,
      difficulty: q.question.difficulty,
      options: ((q.question.options as unknown as Array<{ key: string; text: string; rationale: string }>) || []).map((opt) => ({
        key: opt.key,
        text: opt.text,
        rationale: opt.rationale,
      })),
      correctOption: q.question.correctOption,
      subjectId: q.question.subjectId,
      chapterId: q.question.chapterId,
    })),
  };
}
