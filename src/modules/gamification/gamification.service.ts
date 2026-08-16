import { prisma } from '../../config/prisma';
import { RankTier } from '@prisma/client';

export class GamificationService {
  private static determineRankTier(xp: number): RankTier {
    if (xp >= 10000) return 'COMMISSIONER';
    if (xp >= 5000) return 'INSPECTOR';
    if (xp >= 2000) return 'SUB_INSPECTOR';
    if (xp >= 500) return 'CONSTABLE';
    return 'ASPIRANT';
  }

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
          include: {
            badge: true
          }
        }
      }
    });

    return user;
  }
}
