import { Router } from 'express';
import { createFeedback, getFeedback, updateFeedback, getPublicTestimonials } from './feedback.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/public-testimonials', getPublicTestimonials);

// Student routes
router.post('/', authenticate, createFeedback);

// Admin routes
router.get('/', authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), getFeedback);
router.patch('/:id', authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), updateFeedback);

export default router;
