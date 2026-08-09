-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'STUDENT');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('SSC_CGL', 'SSC_CHSL', 'SSC_MTS', 'SSC_CPO', 'SSC_GD');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('VIDEO', 'ARTICLE', 'PDF');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'HI');

-- CreateEnum
CREATE TYPE "AttemptType" AS ENUM ('PRACTICE', 'MOCK');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'PREMIUM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "avatarUrl" TEXT,
    "phone" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "otpCode" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "targetExam" "ExamType",
    "examYear" INTEGER,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceInfo" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "iconUrl" TEXT,
    "description" TEXT,
    "examTypes" "ExamType"[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "LessonType" NOT NULL,
    "videoUrl" TEXT,
    "articleHtml" TEXT,
    "pdfUrl" TEXT,
    "durationMins" INTEGER,
    "thumbnailUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "questionImageUrl" TEXT,
    "options" JSONB NOT NULL,
    "correctOption" TEXT NOT NULL,
    "explanation" TEXT,
    "explanationImageUrl" TEXT,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "examTypes" "ExamType"[],
    "pyqYear" INTEGER,
    "isPYQ" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "language" "Language" NOT NULL DEFAULT 'EN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_sets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "chapterId" TEXT,
    "questionCount" INTEGER NOT NULL DEFAULT 0,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practice_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_set_questions" (
    "practiceSetId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "practice_set_questions_pkey" PRIMARY KEY ("practiceSetId","questionId")
);

-- CreateTable
CREATE TABLE "mock_tests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "examType" "ExamType" NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "markingCorrect" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "markingIncorrect" DOUBLE PRECISION NOT NULL DEFAULT -0.5,
    "markingSkipped" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mock_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mock_test_sections" (
    "id" TEXT NOT NULL,
    "mockTestId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "maxMarks" INTEGER NOT NULL,
    "durationMins" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mock_test_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mock_test_section_questions" (
    "sectionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mock_test_section_questions_pkey" PRIMARY KEY ("sectionId","questionId")
);

-- CreateTable
CREATE TABLE "test_attempts" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "attemptType" "AttemptType" NOT NULL,
    "practiceSetId" TEXT,
    "mockTestId" TEXT,
    "status" "AttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "timeTakenSeconds" INTEGER,
    "totalCorrect" INTEGER,
    "totalIncorrect" INTEGER,
    "totalSkipped" INTEGER,
    "marksObtained" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "percentile" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempt_responses" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOption" TEXT,
    "isCorrect" BOOLEAN,
    "timeTakenSeconds" INTEGER,
    "marksAwarded" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "attempt_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempt_section_scores" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "correct" INTEGER NOT NULL,
    "incorrect" INTEGER NOT NULL,
    "skipped" INTEGER NOT NULL,
    "marksObtained" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "attempt_section_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_progress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watchedSeconds" INTEGER,

    CONSTRAINT "lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'FREE',
    "examTypes" "ExamType"[],
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_tokenHash_key" ON "refresh_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_slug_key" ON "subjects"("slug");

-- CreateIndex
CREATE INDEX "chapters_subjectId_idx" ON "chapters"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_subjectId_slug_key" ON "chapters"("subjectId", "slug");

-- CreateIndex
CREATE INDEX "lessons_chapterId_idx" ON "lessons"("chapterId");

-- CreateIndex
CREATE INDEX "lessons_subjectId_idx" ON "lessons"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_chapterId_slug_key" ON "lessons"("chapterId", "slug");

-- CreateIndex
CREATE INDEX "questions_subjectId_idx" ON "questions"("subjectId");

-- CreateIndex
CREATE INDEX "questions_chapterId_idx" ON "questions"("chapterId");

-- CreateIndex
CREATE INDEX "questions_difficulty_idx" ON "questions"("difficulty");

-- CreateIndex
CREATE INDEX "questions_isPYQ_idx" ON "questions"("isPYQ");

-- CreateIndex
CREATE INDEX "practice_sets_subjectId_idx" ON "practice_sets"("subjectId");

-- CreateIndex
CREATE INDEX "mock_tests_examType_idx" ON "mock_tests"("examType");

-- CreateIndex
CREATE INDEX "mock_test_sections_mockTestId_idx" ON "mock_test_sections"("mockTestId");

-- CreateIndex
CREATE INDEX "test_attempts_studentId_idx" ON "test_attempts"("studentId");

-- CreateIndex
CREATE INDEX "test_attempts_studentId_mockTestId_idx" ON "test_attempts"("studentId", "mockTestId");

-- CreateIndex
CREATE INDEX "test_attempts_studentId_practiceSetId_idx" ON "test_attempts"("studentId", "practiceSetId");

-- CreateIndex
CREATE INDEX "test_attempts_status_idx" ON "test_attempts"("status");

-- CreateIndex
CREATE INDEX "attempt_responses_attemptId_idx" ON "attempt_responses"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "attempt_responses_attemptId_questionId_key" ON "attempt_responses"("attemptId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "attempt_section_scores_attemptId_sectionId_key" ON "attempt_section_scores"("attemptId", "sectionId");

-- CreateIndex
CREATE INDEX "lesson_progress_studentId_idx" ON "lesson_progress"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_progress_studentId_lessonId_key" ON "lesson_progress"("studentId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_studentId_key" ON "enrollments"("studentId");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_sets" ADD CONSTRAINT "practice_sets_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_sets" ADD CONSTRAINT "practice_sets_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_set_questions" ADD CONSTRAINT "practice_set_questions_practiceSetId_fkey" FOREIGN KEY ("practiceSetId") REFERENCES "practice_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_set_questions" ADD CONSTRAINT "practice_set_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_test_sections" ADD CONSTRAINT "mock_test_sections_mockTestId_fkey" FOREIGN KEY ("mockTestId") REFERENCES "mock_tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_test_section_questions" ADD CONSTRAINT "mock_test_section_questions_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "mock_test_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_test_section_questions" ADD CONSTRAINT "mock_test_section_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_practiceSetId_fkey" FOREIGN KEY ("practiceSetId") REFERENCES "practice_sets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_mockTestId_fkey" FOREIGN KEY ("mockTestId") REFERENCES "mock_tests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_responses" ADD CONSTRAINT "attempt_responses_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "test_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_responses" ADD CONSTRAINT "attempt_responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_section_scores" ADD CONSTRAINT "attempt_section_scores_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "test_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
