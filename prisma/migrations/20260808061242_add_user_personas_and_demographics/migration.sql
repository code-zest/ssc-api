-- CreateEnum
CREATE TYPE "StudyPersona" AS ENUM ('FULL_TIME_ASPIRANT', 'PART_TIME_ASPIRANT', 'REPEAT_ASPIRANT');

-- CreateEnum
CREATE TYPE "DailyStudyTime" AS ENUM ('LESS_THAN_2_HOURS', 'TWO_TO_FOUR_HOURS', 'MORE_THAN_4_HOURS');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('HIGH_SCHOOL', 'UNDERGRADUATE', 'POSTGRADUATE', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "recommendedFor" "StudyPersona"[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "dailyStudyTime" "DailyStudyTime",
ADD COLUMN     "educationLevel" "EducationLevel",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "hasAttemptedBefore" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "incomeRange" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "studyPersona" "StudyPersona";
