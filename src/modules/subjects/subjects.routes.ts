import { Router } from 'express';
import * as subjectsController from './subjects.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createSubjectSchema, updateSubjectSchema } from './subjects.schemas';

const router = Router();

// Public routes (optionally authenticated to check role)
router.get('/', authenticateOptional, subjectsController.getAllSubjects);
router.get('/:slug', authenticateOptional, subjectsController.getSubjectBySlug);
router.get('/:id/chapters', authenticateOptional, subjectsController.getSubjectChapters);

// Admin-only routes
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', validate(createSubjectSchema), subjectsController.createSubject);
router.patch('/:id', validate(updateSubjectSchema), subjectsController.updateSubject);
router.delete('/:id', subjectsController.deleteSubject);

export default router;
