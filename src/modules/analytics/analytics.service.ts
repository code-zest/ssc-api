import { prisma } from '../../config/prisma';

// ─── Student Dashboard Analytics ─────────────────────────────────────────────

export async function getStudentDashboard(studentId: string) {
  const attempts = await prisma.testAttempt.findMany({
    where: { studentId, status: 'SUBMITTED' },
    select: {
      attemptType: true,
      totalCorrect: true,
      totalIncorrect: true,
      accuracy: true,
      marksObtained: true,
      timeTakenSeconds: true,
      submittedAt: true,
    },
    orderBy: { submittedAt: 'desc' },
  });

  const totalTests = attempts.length;
  let sumAccuracy = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;
  let totalTime = 0;

  for (const attempt of attempts) {
    sumAccuracy += attempt.accuracy || 0;
    totalCorrect += attempt.totalCorrect || 0;
    totalAttempted += (attempt.totalCorrect || 0) + (attempt.totalIncorrect || 0);
    totalTime += attempt.timeTakenSeconds || 0;
  }

  const averageAccuracy = totalTests > 0 ? sumAccuracy / totalTests : 0;
  
  return {
    totalTests,
    totalCorrect,
    totalAttempted,
    averageAccuracy,
    totalTimeSeconds: totalTime,
    recentAttempts: attempts.slice(0, 5), // last 5 attempts
  };
}

// ─── Mock Test Leaderboard ───────────────────────────────────────────────────

export async function getMockTestLeaderboard(mockTestId: string, limit: number = 10) {
  // Rank by marksObtained DESC, then accuracy DESC, then timeTakenSeconds ASC
  const leaderboard = await prisma.testAttempt.findMany({
    where: { 
      mockTestId, 
      status: 'SUBMITTED' 
    },
    select: {
      id: true,
      marksObtained: true,
      accuracy: true,
      timeTakenSeconds: true,
      student: {
        select: {
          id: true,
          name: true,
        }
      }
    },
    orderBy: [
      { marksObtained: 'desc' },
      { accuracy: 'desc' },
      { timeTakenSeconds: 'asc' },
    ],
    take: limit,
  });

  // Attach rank
  return leaderboard.map((entry, index) => ({
    rank: index + 1,
    ...entry,
  }));
}

// ─── Global Leaderboard ──────────────────────────────────────────────────────

export async function getGlobalLeaderboard(limit: number = 10) {
  // Aggregate all SUBMITTED attempts per student
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: {
      id: true,
      name: true,
      testAttempts: {
        where: { status: 'SUBMITTED' },
        select: {
          marksObtained: true,
          accuracy: true,
        }
      }
    }
  });

  const leaderboardData = students.map(student => {
    let totalScore = 0;
    let totalAccuracy = 0;
    const attempts = student.testAttempts.length;

    student.testAttempts.forEach((attempt) => {
      totalScore += attempt.marksObtained || 0;
      totalAccuracy += attempt.accuracy || 0;
    });

    const averageAccuracy = attempts > 0 ? totalAccuracy / attempts : 0;

    return {
      student: {
        id: student.id,
        name: student.name,
      },
      totalScore,
      averageAccuracy: Math.round(averageAccuracy),
      testsTaken: attempts,
    };
  });

  // Filter out those with no tests, sort by totalScore desc, averageAccuracy desc
  const sorted = leaderboardData
    .filter(entry => entry.testsTaken > 0)
    .sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return b.averageAccuracy - a.averageAccuracy;
    })
    .slice(0, limit);

  return sorted.map((entry, index) => ({
    rank: index + 1,
    ...entry,
  }));
}

// ─── Admin Dashboard Analytics ─────────────────────────────────────────────

export async function getAdminDashboard() {
  const [
    totalStudents,
    totalQuestions,
    totalMockTests,
    totalPracticeSets,
    totalAttempts,
    recentSignups,
    recentAttempts
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.question.count(),
    prisma.mockTest.count({ where: { isActive: true } }),
    prisma.practiceSet.count({ where: { isActive: true } }),
    prisma.testAttempt.count(),
    prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.testAttempt.findMany({
      select: {
        id: true,
        attemptType: true,
        status: true,
        marksObtained: true,
        submittedAt: true,
        startedAt: true,
        student: { select: { name: true, email: true } }
      },
      orderBy: { startedAt: 'desc' },
      take: 5
    })
  ]);

  return {
    metrics: {
      totalStudents,
      totalQuestions,
      activeExams: totalMockTests + totalPracticeSets,
      totalAttempts,
    },
    recentSignups,
    recentAttempts
  };
}

// ─── Weak Topics (Target 160+) ────────────────────────────────────────────────

export async function getWeakTopics(studentId: string) {
  // 1. Fetch the user's last 10 SUBMITTED test attempts with responses and chapter details
  const attempts = await prisma.testAttempt.findMany({
    where: { studentId, status: 'SUBMITTED' },
    orderBy: { submittedAt: 'desc' },
    take: 10,
    include: {
      responses: {
        where: { selectedOption: { not: null } }, // Only attempted questions
        include: {
          question: {
            include: {
              chapter: { select: { id: true, name: true, subject: { select: { name: true } } } }
            }
          }
        }
      }
    }
  });

  if (attempts.length === 0) return [];

  // 2. Aggregate correct and total attempts per chapter
  const chapterStats: Record<string, { id: string; name: string; subjectName: string; correct: number; total: number }> = {};

  attempts.forEach(attempt => {
    attempt.responses.forEach(response => {
      const chapter = response.question.chapter;
      if (!chapterStats[chapter.id]) {
        chapterStats[chapter.id] = {
          id: chapter.id,
          name: chapter.name,
          subjectName: chapter.subject.name,
          correct: 0,
          total: 0
        };
      }
      chapterStats[chapter.id].total++;
      if (response.isCorrect) {
        chapterStats[chapter.id].correct++;
      }
    });
  });

  // 3. Filter for statistical relevance (e.g., at least 3 attempts) and compute accuracy
  const weakTopics = Object.values(chapterStats)
    .filter(stat => stat.total >= 3)
    .map(stat => ({
      ...stat,
      accuracy: Math.round((stat.correct / stat.total) * 100)
    }))
    // Focus on chapters where accuracy is below 70%
    .filter(stat => stat.accuracy < 70)
    .sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.total - a.total; // Tie-breaker: More total attempts means it's a consistently weak area
    })
    .slice(0, 3); // Return bottom 3

  return weakTopics;
}

// ─── Daily Agenda (Personalized Study Plan) ───────────────────────────────────

export async function getDailyAgenda(studentId: string) {
  const user = await prisma.user.findUnique({
    where: { id: studentId },
    select: { studyPersona: true, lastActiveDate: true }
  });

  if (!user) throw new Error("User not found");

  // Determine targets based on Persona
  let targets = { lessons: 2, practice: 1 };
  if (user.studyPersona === 'PART_TIME_ASPIRANT') {
    targets = { lessons: 1, practice: 1 };
  } else if (user.studyPersona === 'REPEAT_ASPIRANT') {
    targets = { lessons: 0, practice: 3 }; // Advanced track focuses on practice
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Count lessons completed today
  const lessonsCompletedToday = await prisma.lessonProgress.count({
    where: {
      studentId,
      completedAt: { gte: todayStart }
    }
  });

  // Count practice attempts completed today (only practice sets, not full mock tests)
  const practiceCompletedToday = await prisma.testAttempt.count({
    where: {
      studentId,
      attemptType: 'PRACTICE',
      startedAt: { gte: todayStart }
    }
  });

  // Find the Next Lesson to study
  // Strategy: Find the first Lesson (ordered properly) that is NOT in the user's LessonProgress
  const completedLessonIds = (await prisma.lessonProgress.findMany({
    where: { studentId },
    select: { lessonId: true }
  })).map(p => p.lessonId);

  const nextLesson = await prisma.lesson.findFirst({
    where: {
      id: { notIn: completedLessonIds },
      isActive: true,
      subject: { isActive: true },
      chapter: { isActive: true }
    },
    orderBy: [
      { subject: { order: 'asc' } },
      { chapter: { order: 'asc' } },
      { order: 'asc' }
    ],
    include: {
      chapter: { select: { slug: true, name: true } },
      subject: { select: { slug: true, name: true } }
    }
  });

  return {
    persona: user.studyPersona || 'FULL_TIME_ASPIRANT',
    targets,
    progress: {
      lessonsCompletedToday,
      practiceCompletedToday
    },
    nextLesson: nextLesson ? {
      id: nextLesson.id,
      title: nextLesson.title,
      slug: nextLesson.slug,
      type: nextLesson.type,
      chapterName: nextLesson.chapter.name,
      chapterSlug: nextLesson.chapter.slug,
      subjectName: nextLesson.subject.name,
      subjectSlug: nextLesson.subject.slug,
    } : null
  };
}
