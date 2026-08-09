import { Router } from 'express';
import * as analyticsController from './analytics.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Admin routes
router.get('/admin/dashboard', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), analyticsController.getAdminDashboard);

// Student routes (must be logged in)
router.get('/dashboard', authenticate, analyticsController.getStudentDashboard);
router.get('/dashboard/agenda', authenticate, analyticsController.getDailyAgenda);
router.get('/weak-topics', authenticate, analyticsController.getWeakTopics);

// Leaderboards are often public or require auth. Let's make it require auth for now.
router.get('/leaderboard/global', authenticate, analyticsController.getGlobalLeaderboard);
router.get('/leaderboard/mock-tests/:mockTestId', authenticate, analyticsController.getMockTestLeaderboard);

export default router;
