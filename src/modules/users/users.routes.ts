import { Router } from 'express';
import * as usersController from './users.controller';
import * as onboardingController from './onboarding.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import {
  updateProfileSchema,
  updatePasswordSchema,
  updateRoleSchema,
  onboardingSchema,
} from './users.schemas';
import rateLimit from 'express-rate-limit';
import { RedisStore, type RedisReply } from 'rate-limit-redis';
import { redis, isRedisReady } from '../../config/redis';

const mutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 mutations per 15 min per IP
  message: {
    success: false,
    error: 'Too many update requests. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: isRedisReady() ? new RedisStore({ sendCommand: (...args: string[]) => (redis as unknown as { call: (...args: string[]) => Promise<RedisReply> }).call(...args) }) : undefined,
});


const router = Router();

// All user routes require authentication
router.use(authenticate);

// ─── Self (My Profile) ────────────────────────────────────────────────────────

router.get('/me', usersController.getProfile);
router.patch('/me', mutationLimiter, validate(updateProfileSchema), usersController.updateProfile);
router.patch('/me/password', mutationLimiter, validate(updatePasswordSchema), usersController.updatePassword);

// ─── Onboarding ───────────────────────────────────────────────────────────────

// POST /api/v1/users/onboarding — complete the persona wizard (first-run only)
router.post('/onboarding', mutationLimiter, validate(onboardingSchema), onboardingController.completeOnboarding);


// ─── Admin (Manage Users) ─────────────────────────────────────────────────────

// Only SUPER_ADMIN can manage other users
router.use(authorize('SUPER_ADMIN'));

router.get('/', usersController.getAllUsers);
router.patch('/:id/role', validate(updateRoleSchema), usersController.updateUserRole);
router.patch('/:id/toggle-status', usersController.toggleUserStatus);

export default router;
