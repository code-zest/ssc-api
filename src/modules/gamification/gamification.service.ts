import { prisma } from '../../config/prisma';
import { RankTier } from '@prisma/client';

export class GamificationService {
  // ─── Shared helpers ──────────────────────────────────────────────────────────

  private static determineRankTier(xp: number): RankTier {
    if (xp >= 10000) return 'COMMISSIONER';
    if (xp >= 5000)  return 'INSPECTOR';
    if (xp >= 2000)  return 'SUB_INSPECTOR';
    if (xp >= 500)   return 'CONSTABLE';
    return 'ASPIRANT';
  }

  // ─── Student-facing ──────────────────────────────────────────────────────────

  public static async processTestCompletion(userId: string, marksObtained: number, accuracy: number) {
    const performanceXP = Math.round((marksObtained * 10) + (accuracy * 5));
    const xpGained = Math.max(0, performanceXP);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { xpPoints: true, streakDays: true, lastActiveDate: true }
    });

    if (!user) return null;

    const newXpTotal = user.xpPoints + xpGained;
    const newRankTier = this.determineRankTier(newXpTotal);

    await prisma.user.update({
      where: { id: userId },
      data: {
        xpPoints: newXpTotal,
        coins: { increment: xpGained },
        rankTier: newRankTier,
      }
    });

    return { xpGained, newXpTotal, newRankTier };
  }

  public static async getGamificationProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        xpPoints: true,
        rankTier: true,
        streakDays: true,
        badges: {
          include: { badge: true }
        }
      }
    });

    return user;
  }

  // ─── Admin-only ───────────────────────────────────────────────────────────────

  /** Paginated leaderboard sorted by XP descending. */
  public static async getLeaderboard(limit: number = 50, offset: number = 0) {
    const [students, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: 'STUDENT', isActive: true },
        select: {
          id: true,
          name: true,
          email: true,
          xpPoints: true,
          rankTier: true,
          streakDays: true,
          lastActiveDate: true,
        },
        orderBy: { xpPoints: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.user.count({ where: { role: 'STUDENT', isActive: true } }),
    ]);

    return { students, total, limit, offset };
  }

  /** Full gamification profile for any user (admin view). */
  public static async getAdminUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        xpPoints: true,
        rankTier: true,
        streakDays: true,
        lastActiveDate: true,
        badges: {
          include: { badge: true },
          orderBy: { awardedAt: 'desc' },
        },
      },
    });

    return user;
  }

  /**
   * Adjust a user's XP by a delta (positive = add, negative = subtract).
   * Always recalculates rank tier. Enforces a floor of 0 XP.
   * reason is logged but not persisted (no XPAuditLog table yet).
   */
  public static async adjustXP(userId: string, delta: number, reason: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { xpPoints: true },
    });

    if (!user) throw new Error('User not found');

    console.log(`[GamificationService] adjustXP userId=${userId} delta=${delta} reason="${reason}"`);

    const newXpTotal = Math.max(0, user.xpPoints + delta);
    const newRankTier = this.determineRankTier(newXpTotal);

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { xpPoints: newXpTotal, rankTier: newRankTier, coins: { increment: delta } },
      select: { id: true, xpPoints: true, rankTier: true, coins: true },
    });

    return updated;
  }

  /** Directly set a user's streak days (e.g., grace period restore). */
  public static async setStreak(userId: string, days: number) {
    if (days < 0) throw new Error('Streak days cannot be negative');

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { streakDays: days },
      select: { id: true, streakDays: true },
    });

    return updated;
  }

  /**
   * Award a badge to a user. Idempotent — silently no-ops if already awarded.
   */
  public static async awardBadge(userId: string, badgeId: string) {
    const badge = await prisma.badge.findUnique({ where: { id: badgeId } });
    if (!badge) throw new Error('Badge not found');

    const existing = await prisma.userBadge.findFirst({
      where: { userId, badgeId },
      include: { badge: true },
    });
    if (existing) return existing;

    return prisma.userBadge.create({
      data: { userId, badgeId },
      include: { badge: true },
    });
  }

  /** All badge definitions with earned-count per badge. */
  public static async listBadges() {
    return prisma.badge.findMany({
      include: { _count: { select: { users: true } } },
      orderBy: { name: 'asc' },
    });
  }

  /** Create a new badge definition. */
  public static async createBadge(data: {
    name: string;
    description: string;
    criteria: string;
    iconUrl?: string;
  }) {
    return prisma.badge.create({ data });
  }

  /** Delete a badge definition (cascade deletes UserBadge records). */
  public static async deleteBadge(badgeId: string) {
    await prisma.badge.delete({ where: { id: badgeId } });
  }
}
