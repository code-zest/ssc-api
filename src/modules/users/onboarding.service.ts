import { prisma } from "../../config/prisma";
import { StudyPersona, DailyStudyTime } from "@prisma/client";

interface OnboardingInput {
  targetExam: string;
  examYear: number;
  occupation: string;
  hasAttemptedBefore: boolean;
  dailyStudyTime: DailyStudyTime;
  age?: number;
  gender?: string;
  educationLevel?: string;
  city?: string;
  incomeRange?: string;
}

/**
 * Deterministically assigns a StudyPersona based on onboarding signals.
 * Priority: REPEAT_ASPIRANT > PART_TIME_ASPIRANT > FULL_TIME_ASPIRANT
 */
function assignPersona(input: OnboardingInput): StudyPersona {
  // Repeat aspirant overrides all other signals
  if (input.hasAttemptedBefore) {
    return StudyPersona.REPEAT_ASPIRANT;
  }

  // Part-time signals: working job OR low daily time commitment
  const workingKeywords = ["working", "professional", "job", "employed", "engineer", "employee", "manager"];
  const isWorking = workingKeywords.some((kw) =>
    input.occupation.toLowerCase().includes(kw)
  );

  if (isWorking || input.dailyStudyTime === DailyStudyTime.LESS_THAN_2_HOURS) {
    return StudyPersona.PART_TIME_ASPIRANT;
  }

  return StudyPersona.FULL_TIME_ASPIRANT;
}

export const completeOnboarding = async (
  userId: string,
  input: OnboardingInput
) => {
  const studyPersona = assignPersona(input);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      // Goal
      targetExam: input.targetExam as never,
      examYear: input.examYear,

      // Persona signals
      occupation: input.occupation,
      hasAttemptedBefore: input.hasAttemptedBefore,
      dailyStudyTime: input.dailyStudyTime,
      studyPersona,

      // Optional demographics
      ...(input.age !== undefined && { age: input.age }),
      ...(input.gender !== undefined && { gender: input.gender as never }),
      ...(input.educationLevel !== undefined && {
        educationLevel: input.educationLevel as never,
      }),
      ...(input.city !== undefined && { city: input.city }),
      ...(input.incomeRange !== undefined && { incomeRange: input.incomeRange }),

      // Mark onboarding complete
      onboardingComplete: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      targetExam: true,
      examYear: true,
      isEmailVerified: true,
      subscriptionTier: true,
      onboardingComplete: true,
      studyPersona: true,
      dailyStudyTime: true,
      hasAttemptedBefore: true,
      age: true,
      gender: true,
      educationLevel: true,
      city: true,
      occupation: true,
      incomeRange: true,
    },
  });

  return { studyPersona, onboardingComplete: true, user };
};

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    avatarUrl?: string;
    phone?: string;
    city?: string;
    targetExam?: string;
    examYear?: number;
    age?: number;
    gender?: string;
    educationLevel?: string;
    occupation?: string;
    incomeRange?: string;
    dailyStudyTime?: DailyStudyTime;
  }
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.city !== undefined && { city: data.city }),
      ...(data.targetExam !== undefined && { targetExam: data.targetExam as never }),
      ...(data.examYear !== undefined && { examYear: data.examYear }),
      ...(data.age !== undefined && { age: data.age }),
      ...(data.gender !== undefined && { gender: data.gender as never }),
      ...(data.educationLevel !== undefined && { educationLevel: data.educationLevel as never }),
      ...(data.occupation !== undefined && { occupation: data.occupation }),
      ...(data.incomeRange !== undefined && { incomeRange: data.incomeRange }),
      ...(data.dailyStudyTime !== undefined && { dailyStudyTime: data.dailyStudyTime }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      phone: true,
      targetExam: true,
      examYear: true,
      city: true,
      isEmailVerified: true,
      subscriptionTier: true,
      onboardingComplete: true,
      studyPersona: true,
      dailyStudyTime: true,
      hasAttemptedBefore: true,
      age: true,
      gender: true,
      educationLevel: true,
      occupation: true,
      incomeRange: true,
    },
  });
};
