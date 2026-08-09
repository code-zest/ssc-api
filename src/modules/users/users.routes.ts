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


const router = Router();

// All user routes require authentication
router.use(authenticate);

// ─── Self (My Profile) ────────────────────────────────────────────────────────

router.get('/me', usersController.getProfile);
router.patch('/me', validate(updateProfileSchema), usersController.updateProfile);
router.patch('/me/password', validate(updatePasswordSchema), usersController.updatePassword);

// ─── Onboarding ───────────────────────────────────────────────────────────────

// POST /api/v1/users/onboarding — complete the persona wizard (first-run only)
router.post('/onboarding', validate(onboardingSchema), onboardingController.completeOnboarding);


// ─── Admin (Manage Users) ─────────────────────────────────────────────────────

// Only SUPER_ADMIN can manage other users
router.use(authorize('SUPER_ADMIN'));

router.get('/', usersController.getAllUsers);
router.patch('/:id/role', validate(updateRoleSchema), usersController.updateUserRole);
router.patch('/:id/toggle-status', usersController.toggleUserStatus);

export default router;
