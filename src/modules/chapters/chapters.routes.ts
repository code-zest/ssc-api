import { Router } from 'express';
import * as chaptersController from './chapters.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createChapterSchema, updateChapterSchema } from './chapters.schemas';

const router = Router();

// All Chapter routes are Admin-only (fetching chapters happens via the Subject endpoints)
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', validate(createChapterSchema), chaptersController.createChapter);
router.patch('/reorder', chaptersController.reorderChapters);
router.patch('/:id', validate(updateChapterSchema), chaptersController.updateChapter);
router.delete('/:id', chaptersController.deleteChapter);

export default router;
