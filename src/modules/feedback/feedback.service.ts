import { prisma } from '../../config/prisma';
import type { CreateFeedbackInput, UpdateFeedbackInput } from './feedback.schemas';
import { ApiError } from '../../utils/ApiError';

export async function createFeedback(userId: string, input: CreateFeedbackInput) {
  const feedback = await prisma.feedback.create({
    data: {
      userId,
      type: input.type,
      message: input.message,
      questionId: input.questionId,
    },
  });
  return feedback;
}

export async function getAllFeedback(filters: { type?: string; status?: string }) {
  const where: any = {};
  if (filters.type) where.type = filters.type;
  if (filters.status) where.status = filters.status;

  const feedback = await prisma.feedback.findMany({
    where,
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return feedback;
}

export async function updateFeedback(id: string, input: UpdateFeedbackInput) {
  const existing = await prisma.feedback.findUnique({ where: { id } });
  if (!existing) {
    throw ApiError.notFound('Feedback not found');
  }

  const updated = await prisma.feedback.update({
    where: { id },
    data: input,
    include: {
      user: { select: { name: true, email: true } },
    },
  });
  return updated;
}

export async function getPublicTestimonials() {
  const testimonials = await prisma.feedback.findMany({
    where: {
      type: 'TESTIMONIAL',
      isPublic: true,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return testimonials;
}
