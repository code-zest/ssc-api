import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import * as gamificationController from './gamification.controller';

const router = Router();

// ─── Student-facing ───────────────────────────────────────────────────────────

router.get('/profile', authenticate, gamificationController.getProfile);

// ─── Admin-only ───────────────────────────────────────────────────────────────

const adminAuth = [authenticate, authorize('ADMIN', 'SUPER_ADMIN')];

// Leaderboard
router.get('/leaderboard',            ...adminAuth, gamificationController.getLeaderboard);

// Per-user controls
router.get( '/users/:userId',         ...adminAuth, gamificationController.getAdminUserProfile);
router.patch('/users/:userId/xp',     ...adminAuth, gamificationController.adjustXP);
router.patch('/users/:userId/streak', ...adminAuth, gamificationController.setStreak);
router.post( '/users/:userId/badges', ...adminAuth, gamificationController.awardBadge);

// Badge definitions
router.get(   '/badges',          ...adminAuth, gamificationController.listBadges);
router.post(  '/badges',          ...adminAuth, gamificationController.createBadge);
router.delete('/badges/:badgeId', ...adminAuth, gamificationController.deleteBadge);

export default router;
