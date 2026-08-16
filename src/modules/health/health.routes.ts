import { Router } from 'express';
import { getHealthMetrics } from './health.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Only SUPER_ADMIN can view system health
router.get('/metrics', authenticate, authorize('SUPER_ADMIN'), getHealthMetrics);

export default router;
