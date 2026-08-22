import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { StartAttemptInput, SyncAnswersInput, GeneratePYQAttemptInput } from './attempts.schemas';
import { GamificationService } from '../gamification/gamification.service';

// ─── Generate PYQ Attempt ─────────────────────────────────────────────────────

export async function generatePYQAttempt(studentId: string | null, guestSessionId: string | null, input: GeneratePYQAttemptInput) {
  const where: any = { isPYQ: true, isActive: true };
  if (input.chapterId) where.chapterId = input.chapterId;
  if (input.subjectId) where.subjectId = input.subjectId;

  // Fetch random questions
  // Since Prisma doesn't have native raw rand() that maps well to our type, 
  // we can fetch IDs, shuffle them, and pick `limit`.
  const allIds = await prisma.question.findMany({
    where,
    select: { id: true }
  });

  if (allIds.length === 0) {
    throw ApiError.notFound('No PYQs found for the given criteria');
  }

  // Shuffle and slice
  const shuffled = allIds.sort(() => 0.5 - Math.random());
  const selectedIds = shuffled.slice(0, input.limit).map(q => q.id);

  // Create Attempt and AttemptResponses inside a transaction
  return prisma.$transaction(async (tx) => {
    const attempt = await tx.testAttempt.create({
      data: {
        studentId,
        guestSessionId: !studentId ? guestSessionId : undefined,
        attemptType: 'PRACTICE',
      }
    });

    const responseData = selectedIds.map(qId => ({
      attemptId: attempt.id,
      questionId: qId,
    }));

    await tx.attemptResponse.createMany({
      data: responseData,
    });

    return attempt;
  });
}

import { GenerateDynamicAttemptInput } from './attempts.schemas';

// ─── Generate Dynamic Attempt ───────────────────────────────────────────────────

export async function generateDynamicAttempt(studentId: string, input: GenerateDynamicAttemptInput) {
  const { subjectId, chapterId, limit = 10 } = input;

  // 1. Find questions the student has already answered correctly
  const correctlyAnswered = await prisma.attemptResponse.findMany({
    where: {
      attempt: { studentId },
      isCorrect: true
    },
    select: { questionId: true }
  });
  const answeredQuestionIds = correctlyAnswered.map(r => r.questionId);

  // 2. Fetch active questions the student has NOT answered correctly
  const whereClause: any = {
    isActive: true,
    id: { notIn: answeredQuestionIds }
  };
  
  if (subjectId) {
    whereClause.subjectId = subjectId;
  }
  if (chapterId) {
    whereClause.chapterId = chapterId;
  }

  const candidateQuestions = await prisma.question.findMany({
    where: whereClause,
    select: { id: true, subjectId: true }
  });

  if (candidateQuestions.length === 0) {
    throw ApiError.notFound('No fresh questions available for this dynamic test');
  }

  // 3. Shuffle and pick
  let selectedIds: string[] = [];
  
  if (subjectId || chapterId) {
    // Mode 2: Targeted subject/chapter - pick limit
    const shuffled = candidateQuestions.sort(() => 0.5 - Math.random());
    selectedIds = shuffled.slice(0, limit).map(q => q.id);
  } else {
    // Mode 1: All subjects - try to distribute evenly across subjects
    const subjectGroups: Record<string, string[]> = {};
    candidateQuestions.forEach(q => {
      if (!subjectGroups[q.subjectId]) subjectGroups[q.subjectId] = [];
      subjectGroups[q.subjectId].push(q.id);
    });

    const subjects = Object.keys(subjectGroups);
    // Shuffle questions inside each group
    subjects.forEach(s => {
      subjectGroups[s] = subjectGroups[s].sort(() => 0.5 - Math.random());
    });

    let i = 0;
    while (selectedIds.length < limit && candidateQuestions.length > selectedIds.length) {
      const subjectIndex = i % subjects.length;
      const subj = subjects[subjectIndex];
      const q = subjectGroups[subj].pop();
      if (q) {
        selectedIds.push(q);
      }
      i++;
    }
  }

  // 4. Create the dynamic test attempt
  return prisma.$transaction(async (tx) => {
    const attempt = await tx.testAttempt.create({
      data: {
        studentId,
        attemptType: 'DYNAMIC_PRACTICE',
      }
    });

    const responseData = selectedIds.map(qId => ({
      attemptId: attempt.id,
      questionId: qId,
    }));

    await tx.attemptResponse.createMany({
      data: responseData,
    });

    return attempt;
  });
}

// ─── Start Attempt ────────────────────────────────────────────────────────────


export async function startDailyQuizAttempt(studentId: string | null, guestSessionId: string | null, dailyQuizId: string) {
  const dailyQuiz = await prisma.dailyQuiz.findUnique({
    where: { id: dailyQuizId },
    include: {
      questions: {
        
        select: { questionId: true }
      }
    }
  });

  if (!dailyQuiz) throw ApiError.notFound('Daily quiz not found');

  return prisma.$transaction(async (tx) => {
    const attempt = await tx.testAttempt.create({
      data: {
        attemptType: 'PRACTICE',
        status: 'IN_PROGRESS',
        dailyQuizId,
        studentId,
        guestSessionId: !studentId ? guestSessionId : undefined,
      },
    });

    const responses = dailyQuiz.questions.map((q, index) => ({
      attemptId: attempt.id,
      questionId: q.questionId,
      
    }));

    if (responses.length > 0) {
      await tx.attemptResponse.createMany({ data: responses });
    }

    return tx.testAttempt.findUnique({
      where: { id: attempt.id },
      include: {
        responses: {
          
          include: { question: true }
        }
      }
    });
  });
}

export async function startAttempt(studentId: string | null, guestSessionId: string | null, input: StartAttemptInput) {
  // Verify test exists
  if (input.attemptType === 'PRACTICE') {
    const ps = await prisma.practiceSet.findUnique({ where: { id: input.practiceSetId! } });
    if (!ps || !ps.isActive) throw ApiError.notFound('Practice set not found or inactive');
  } else {
    const mt = await prisma.mockTest.findUnique({ where: { id: input.mockTestId! } });
    if (!mt || !mt.isActive) throw ApiError.notFound('Mock test not found or inactive');
  }

  // Check if there is already an IN_PROGRESS attempt
  const existing = await prisma.testAttempt.findFirst({
    where: {
      studentId: studentId ?? undefined,
      guestSessionId: !studentId ? guestSessionId : undefined,
      attemptType: input.attemptType,
      practiceSetId: input.practiceSetId,
      mockTestId: input.mockTestId,
      status: 'IN_PROGRESS',
    },
  });

  if (existing) {
    return existing; // Resume existing attempt
  }

  return prisma.testAttempt.create({
    data: {
      studentId,
      guestSessionId: !studentId ? guestSessionId : undefined,
      attemptType: input.attemptType,
      practiceSetId: input.practiceSetId,
      mockTestId: input.mockTestId,
    },
  });
}

// ─── Sync Answers ─────────────────────────────────────────────────────────────

export async function syncAnswers(attemptId: string, studentId: string | null, guestSessionId: string | null, input: SyncAnswersInput) {
  const attempt = await prisma.testAttempt.findUnique({ where: { id: attemptId } });
  if (!attempt) {
    throw ApiError.notFound('Attempt not found');
  }
  
  // Verify ownership
  if (studentId) {
    if (attempt.studentId !== studentId) throw ApiError.notFound('Attempt not found');
  } else {
    if (attempt.guestSessionId !== guestSessionId) throw ApiError.notFound('Attempt not found');
  }

  if (attempt.status !== 'IN_PROGRESS') {
    throw ApiError.badRequest('Cannot sync answers for an attempt that is not in progress');
  }

  // Upsert each response safely
  // For mass sync, doing it sequentially inside a transaction is safer to avoid deadlocks on unique constraints
  await prisma.$transaction(async (tx) => {
    for (const res of input.responses) {
      await tx.attemptResponse.upsert({
        where: {
          attemptId_questionId: {
            attemptId,
            questionId: res.questionId,
          },
        },
        create: {
          attemptId,
          questionId: res.questionId,
          selectedOption: res.selectedOption,
          timeTakenSeconds: res.timeTakenSeconds,
        },
        update: {
          selectedOption: res.selectedOption,
          timeTakenSeconds: res.timeTakenSeconds,
        },
      });
    }
  });

  return { message: 'Answers synchronized successfully' };
}

// ─── Submit & Score Attempt ───────────────────────────────────────────────────

export async function submitAttempt(attemptId: string, studentId: string | null, guestSessionId: string | null) {
  const attempt = await prisma.testAttempt.findUnique({ 
    where: { id: attemptId },
    include: {
      mockTest: true,
      practiceSet: true,
      responses: {
        include: { question: true },
      }
    }
  });

  if (!attempt) {
    throw ApiError.notFound('Attempt not found');
  }
  
  if (studentId) {
    if (attempt.studentId !== studentId) throw ApiError.notFound('Attempt not found');
  } else {
    if (attempt.guestSessionId !== guestSessionId) throw ApiError.notFound('Attempt not found');
  }

  if (attempt.status !== 'IN_PROGRESS') {
    throw ApiError.badRequest('Attempt is already submitted or expired');
  }

  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalSkipped = 0;
  let marksObtained = 0;

  const markCorrect = attempt.attemptType === 'MOCK' ? attempt.mockTest!.markingCorrect : 1;
  const markIncorrect = attempt.attemptType === 'MOCK' ? attempt.mockTest!.markingIncorrect : 0;
  const markSkipped = attempt.attemptType === 'MOCK' ? attempt.mockTest!.markingSkipped : 0;

  const responseUpdates = attempt.responses.map(response => {
    const isSkipped = response.selectedOption === null || response.selectedOption === undefined;
    const isCorrect = !isSkipped && response.selectedOption === response.question.correctOption;
    const isIncorrect = !isSkipped && !isCorrect;

    let marksAwarded = 0;
    if (isCorrect) {
      totalCorrect++;
      marksAwarded = markCorrect;
    } else if (isIncorrect) {
      totalIncorrect++;
      marksAwarded = markIncorrect;
    } else {
      totalSkipped++;
      marksAwarded = markSkipped;
    }

    marksObtained += marksAwarded;

    return prisma.attemptResponse.update({
      where: { id: response.id },
      data: { isCorrect, marksAwarded },
    });
  });

  // Calculate time taken
  const timeTakenSeconds = Math.floor((new Date().getTime() - attempt.startedAt.getTime()) / 1000);
  const totalAttempted = totalCorrect + totalIncorrect;
  const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;

  // Transactionally update the attempt and all responses
  await prisma.$transaction([
    ...responseUpdates,
    prisma.testAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
        timeTakenSeconds,
        totalCorrect,
        totalIncorrect,
        totalSkipped,
        marksObtained,
        accuracy,
      },
    }),
  ]);

  // Update User Streak
  if (studentId) {
    const user = await prisma.user.findUnique({ where: { id: studentId } });
    if (user) {
      const now = new Date();
      let streakDays = user.streakDays || 0;
      let updateStreak = false;

      if (!user.lastActiveDate) {
        streakDays = 1;
        updateStreak = true;
      } else {
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        const lastDate = new Date(user.lastActiveDate);
        lastDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - lastDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          streakDays += 1;
          updateStreak = true;
        } else if (diffDays > 1) {
          streakDays = 1;
          updateStreak = true;
        }
      }

      if (updateStreak) {
        await prisma.user.update({
          where: { id: studentId },
          data: { streakDays, lastActiveDate: now }
        });
      }
      
      // Hook into Gamification Engine to award XP
      await GamificationService.processTestCompletion(studentId, marksObtained, accuracy);
    }
  }

  // TODO: Section scores calculation for Mock Tests (can be handled via background job or expanded here)

  return { message: 'Attempt submitted and scored successfully', marksObtained, accuracy };
}

// ─── Get Attempt Details ──────────────────────────────────────────────────────

export async function getAttemptDetails(attemptId: string, studentId: string | null, guestSessionId: string | null) {
  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: {
      responses: {
        include: { 
          question: {
            include: {
              subject: { select: { name: true } },
              chapter: { select: { name: true } },
            }
          } 
        }
      },
      sectionScores: true,
      practiceSet: { select: { title: true } },
      mockTest: { select: { title: true } },
    },
  });

  if (!attempt) {
    throw ApiError.notFound('Attempt not found');
  }
  
  if (studentId) {
    if (attempt.studentId !== studentId) throw ApiError.notFound('Attempt not found');
  } else {
    if (attempt.guestSessionId !== guestSessionId) throw ApiError.notFound('Attempt not found');
  }

  // Hide correct answers if test is still in progress
  if (attempt.status === 'IN_PROGRESS') {
    attempt.responses = attempt.responses.map(r => {
      const updatedR: any = {
        ...r,
        isCorrect: null,
        marksAwarded: 0,
      };
      if (updatedR.question) {
        delete updatedR.question.correctOption;
        delete updatedR.question.explanation;
        // Optionally omit rationale if it's stored inside options json
      }
      return updatedR;
    });
  }

  return attempt;
}

// ─── Claim Attempt ────────────────────────────────────────────────────────────

export async function claimAttempt(attemptId: string, studentId: string) {
  const attempt = await prisma.testAttempt.findUnique({ where: { id: attemptId } });
  if (!attempt) throw ApiError.notFound('Attempt not found');

  if (attempt.studentId) {
    throw ApiError.badRequest('Attempt has already been claimed by a user');
  }

  // Link it to the newly registered user
  await prisma.testAttempt.update({
    where: { id: attemptId },
    data: {
      studentId,
      guestSessionId: null,
    }
  });

  return { message: 'Attempt claimed successfully' };
}
