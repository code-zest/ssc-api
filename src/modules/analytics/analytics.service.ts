import { prisma } from '../../config/prisma';

// ─── Student Dashboard Analytics ─────────────────────────────────────────────

export async function getStudentDashboard(studentId: string) {
  const [user, attempts, attemptResponses] = await Promise.all([
    prisma.user.findUnique({ where: { id: studentId }, select: { streakDays: true, xpPoints: true, rankTier: true } }),
    prisma.testAttempt.findMany({
      where: { studentId, status: 'SUBMITTED' },
      select: {
        id: true,
        attemptType: true,
        totalCorrect: true,
        totalIncorrect: true,
        accuracy: true,
        marksObtained: true,
        timeTakenSeconds: true,
        submittedAt: true,
      },
      orderBy: { submittedAt: 'desc' },
    }),
    prisma.attemptResponse.findMany({
      where: {
        attempt: { studentId, status: 'SUBMITTED' },
        selectedOption: { not: null }
      },
      select: {
        isCorrect: true,
        question: {
          select: {
            isPYQ: true,
            subject: {
              select: { id: true, name: true, slug: true }
            }
          }
        }
      }
    })
  ]);

  const totalTests = attempts.length;
  let sumAccuracy = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;
  let totalTime = 0;
  
  const activityMap: Record<string, number> = {};
  
  // Breakdown by test type
  const typeBreakdown: Record<string, { totalTests: number; sumAccuracy: number }> = {
    PRACTICE: { totalTests: 0, sumAccuracy: 0 },
    MOCK: { totalTests: 0, sumAccuracy: 0 },
    DYNAMIC_PRACTICE: { totalTests: 0, sumAccuracy: 0 },
  };

  for (const attempt of attempts) {
    sumAccuracy += attempt.accuracy || 0;
    totalCorrect += attempt.totalCorrect || 0;
    totalAttempted += (attempt.totalCorrect || 0) + (attempt.totalIncorrect || 0);
    totalTime += attempt.timeTakenSeconds || 0;
    
    if (attempt.submittedAt) {
      const dateStr = attempt.submittedAt.toISOString().split('T')[0];
      activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
    }

    if (typeBreakdown[attempt.attemptType]) {
      typeBreakdown[attempt.attemptType].totalTests += 1;
      typeBreakdown[attempt.attemptType].sumAccuracy += attempt.accuracy || 0;
    }
  }

  // Calculate detailed stats from responses (Subject & PYQ)
  let pyqAttempted = 0;
  let pyqCorrect = 0;
  
  const subjectMap: Record<string, { name: string; slug: string; attempted: number; correct: number }> = {};

  for (const resp of attemptResponses) {
    if (resp.question.isPYQ) {
      pyqAttempted++;
      if (resp.isCorrect) pyqCorrect++;
    }

    const subj = resp.question.subject;
    if (!subjectMap[subj.slug]) {
      subjectMap[subj.slug] = { name: subj.name, slug: subj.slug, attempted: 0, correct: 0 };
    }
    subjectMap[subj.slug].attempted++;
    if (resp.isCorrect) subjectMap[subj.slug].correct++;
  }

  const subjectWiseStats = Object.values(subjectMap).map(stat => ({
    name: stat.name,
    slug: stat.slug,
    totalQuestions: stat.attempted,
    accuracy: stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0
  }));

  const sortedDates = Object.keys(activityMap).sort();
  let longestStreak = 0;
  let currentIterStreak = 0;
  let lastDate: Date | null = null;

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    if (!lastDate) {
      currentIterStreak = 1;
    } else {
      const diffTime = Math.abs(date.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentIterStreak++;
      } else if (diffDays > 1) {
        currentIterStreak = 1;
      }
    }
    
    if (currentIterStreak > longestStreak) {
      longestStreak = currentIterStreak;
    }
    lastDate = date;
  }

  const dailyData = sortedDates.map(date => ({
    date,
    count: activityMap[date]
  }));

  const averageAccuracy = totalTests > 0 ? Math.round(sumAccuracy / totalTests) : 0;
  
  return {
    totalTests,
    totalCorrect,
    totalAttempted,
    averageAccuracy,
    totalTimeSeconds: totalTime,
    recentAttempts: attempts.slice(0, 5), // last 5 attempts
    testTypeBreakdown: {
      practice: {
        totalTests: typeBreakdown.PRACTICE.totalTests,
        averageAccuracy: typeBreakdown.PRACTICE.totalTests > 0 ? Math.round(typeBreakdown.PRACTICE.sumAccuracy / typeBreakdown.PRACTICE.totalTests) : 0
      },
      mock: {
        totalTests: typeBreakdown.MOCK.totalTests,
        averageAccuracy: typeBreakdown.MOCK.totalTests > 0 ? Math.round(typeBreakdown.MOCK.sumAccuracy / typeBreakdown.MOCK.totalTests) : 0
      },
      dynamic: {
        totalTests: typeBreakdown.DYNAMIC_PRACTICE.totalTests,
        averageAccuracy: typeBreakdown.DYNAMIC_PRACTICE.totalTests > 0 ? Math.round(typeBreakdown.DYNAMIC_PRACTICE.sumAccuracy / typeBreakdown.DYNAMIC_PRACTICE.totalTests) : 0
      }
    },
    pyqAnalytics: {
      totalAttempted: pyqAttempted,
      averageAccuracy: pyqAttempted > 0 ? Math.round((pyqCorrect / pyqAttempted) * 100) : 0
    },
    subjectWiseStats,
    activity: {
      dailyData,
      currentStreak: user?.streakDays || 0,
      longestStreak,
      totalContributions: attempts.length
    },
    gamification: {
      xpPoints: user?.xpPoints || 0,
      rankTier: user?.rankTier || 'BRONZE'
    }
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
  // Aggregate students and their gamification profile
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT', xpPoints: { gt: 0 } },
    select: {
      id: true,
      name: true,
      xpPoints: true,
      rankTier: true,
      _count: {
        select: { testAttempts: { where: { status: 'SUBMITTED' } } }
      }
    },
    orderBy: {
      xpPoints: 'desc'
    },
    take: limit
  });

  return students.map((student, index) => ({
    rank: index + 1,
    student: {
      id: student.id,
      name: student.name,
    },
    xpPoints: student.xpPoints,
    rankTier: student.rankTier,
    testsTaken: student._count.testAttempts,
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
