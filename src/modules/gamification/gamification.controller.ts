import { Request, Response } from 'express';
import { GamificationService } from './gamification.service';

// ─── Student-facing ───────────────────────────────────────────────────────────

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const profile = await GamificationService.getGamificationProfile(userId);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ─── Admin-only ───────────────────────────────────────────────────────────────

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit  = Math.min(Number(req.query.limit)  || 50, 100);
    const offset = Number(req.query.offset) || 0;

    const data = await GamificationService.getLeaderboard(limit, offset);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAdminUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;
    const profile = await GamificationService.getAdminUserProfile(userId);

    if (!profile) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const adjustXP = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;
    const { delta, reason } = req.body as { delta: number; reason: string };

    if (typeof delta !== 'number') {
      res.status(400).json({ success: false, message: 'delta must be a number' });
      return;
    }

    const updated = await GamificationService.adjustXP(userId, delta, reason ?? '');
    res.json({ success: true, data: updated });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Internal server error';
    res.status(msg === 'User not found' ? 404 : 500).json({ success: false, message: msg });
  }
};

export const setStreak = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;
    const { days } = req.body as { days: number };

    if (typeof days !== 'number' || days < 0) {
      res.status(400).json({ success: false, message: 'days must be a non-negative number' });
      return;
    }

    const updated = await GamificationService.setStreak(userId, days);
    res.json({ success: true, data: updated });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ success: false, message: msg });
  }
};

export const awardBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;
    const { badgeId } = req.body as { badgeId: string };

    if (!badgeId) {
      res.status(400).json({ success: false, message: 'badgeId is required' });
      return;
    }

    const userBadge = await GamificationService.awardBadge(userId, badgeId);
    res.json({ success: true, data: userBadge });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Internal server error';
    res.status(msg === 'Badge not found' ? 404 : 500).json({ success: false, message: msg });
  }
};

export const listBadges = async (_req: Request, res: Response): Promise<void> => {
  try {
    const badges = await GamificationService.listBadges();
    res.json({ success: true, data: badges });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, criteria, iconUrl } = req.body as {
      name: string;
      description: string;
      criteria: string;
      iconUrl?: string;
    };

    if (!name || !description || !criteria) {
      res.status(400).json({ success: false, message: 'name, description, and criteria are required' });
      return;
    }

    const badge = await GamificationService.createBadge({ name, description, criteria, iconUrl });
    res.status(201).json({ success: true, data: badge });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const badgeId = req.params.badgeId as string;
    await GamificationService.deleteBadge(badgeId);
    res.json({ success: true, message: 'Badge deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
