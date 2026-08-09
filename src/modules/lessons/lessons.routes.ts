import { Router } from 'express';
import * as lessonsController from './lessons.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createLessonSchema, updateLessonSchema, lessonProgressSchema } from './lessons.schemas';

const router = Router();

// ─── Public / Student Routes ──────────────────────────────────────────────────

// Fetching lessons optionally checks auth so we can return progress if logged in
router.get('/chapter/:chapterId', authenticateOptional, lessonsController.getLessonsByChapter);
router.get('/:slug', authenticateOptional, lessonsController.getLessonBySlug);

// Tracking progress strictly requires a logged in user
router.post('/:id/progress', authenticate, validate(lessonProgressSchema), lessonsController.updateLessonProgress);

// ─── Admin Routes ─────────────────────────────────────────────────────────────

router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', validate(createLessonSchema), lessonsController.createLesson);
router.patch('/reorder', lessonsController.reorderLessons);
router.patch('/:id', validate(updateLessonSchema), lessonsController.updateLesson);
router.delete('/:id', lessonsController.deleteLesson);

export default router;
