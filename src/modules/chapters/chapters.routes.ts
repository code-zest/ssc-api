import { Router } from 'express';
import * as chaptersController from './chapters.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createChapterSchema, updateChapterSchema } from './chapters.schemas';

const router = Router();

// Public route (can fetch by ID or slug)
router.get('/:id', authenticateOptional, chaptersController.getChapterById);

// All other Chapter routes are Admin-only
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/:id/lessons', chaptersController.getChapterLessons);
router.post('/', validate(createChapterSchema), chaptersController.createChapter);
router.patch('/reorder', chaptersController.reorderChapters);
router.patch('/:id', validate(updateChapterSchema), chaptersController.updateChapter);
router.delete('/:id', chaptersController.deleteChapter);

export default router;
