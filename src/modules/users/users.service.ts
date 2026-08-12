import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import type { UpdateProfileInput, UpdatePasswordInput, UpdateRoleInput } from './users.schemas';
import { Role } from '@prisma/client';

const BCRYPT_ROUNDS = 12;

// ─── Get Own Profile ──────────────────────────────────────────────────────────

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      targetExam: true,
      subscriptionTier: true,
      subscriptionExpiresAt: true,
      onboardingComplete: true,
      studyPersona: true,
      dailyStudyTime: true,
      hasAttemptedBefore: true,
      isEmailVerified: true,
      isActive: true,
      streakDays: true,
      lastActiveDate: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
}

// ─── Update Own Profile ───────────────────────────────────────────────────────

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: input,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      targetExam: true,
      subscriptionTier: true,
      subscriptionExpiresAt: true,
    },
  });
  return user;
}

// ─── Update Own Password ──────────────────────────────────────────────────────

export async function updatePassword(userId: string, input: UpdatePasswordInput) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const isValid = await bcrypt.compare(input.currentPassword, user.passwordHash);
  if (!isValid) {
    throw ApiError.badRequest('Incorrect current password');
  }

  const newPasswordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    }),
    // Invalidate all existing sessions for security
    prisma.refreshToken.deleteMany({ where: { userId } }),
  ]);

  return { message: 'Password updated successfully. You have been logged out of all other devices.' };
}

// ─── Admin: Get All Users ─────────────────────────────────────────────────────

export async function getAllUsers(page: number, limit: number, search?: string, role?: Role) {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(role && { role }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total };
}

// ─── Admin: Update User Role ──────────────────────────────────────────────────

export async function updateUserRole(adminId: string, targetUserId: string, input: UpdateRoleInput) {
  if (adminId === targetUserId) {
    throw ApiError.forbidden('You cannot change your own role');
  }

  const user = await prisma.user.update({
    where: { id: targetUserId },
    data: { role: input.role },
    select: { id: true, name: true, email: true, role: true },
  });

  return user;
}

// ─── Admin: Toggle User Active Status ─────────────────────────────────────────

export async function toggleUserStatus(adminId: string, targetUserId: string) {
  if (adminId === targetUserId) {
    throw ApiError.forbidden('You cannot deactivate your own account');
  }

  const user = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  // If deactivating, also destroy their sessions
  if (user.isActive) {
    await prisma.$transaction([
      prisma.user.update({ where: { id: targetUserId }, data: { isActive: false } }),
      prisma.refreshToken.deleteMany({ where: { userId: targetUserId } }),
    ]);
    return { message: 'User deactivated successfully' };
  } else {
    await prisma.user.update({ where: { id: targetUserId }, data: { isActive: true } });
    return { message: 'User activated successfully' };
  }
}
