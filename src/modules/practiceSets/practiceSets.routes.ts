import { Router } from 'express';
import * as practiceSetsController from './practiceSets.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createPracticeSetSchema, updatePracticeSetSchema, addQuestionsToSetSchema } from './practiceSets.schemas';

const router = Router();

// Public / Student Routes
router.get('/', authenticateOptional, practiceSetsController.getPracticeSets);
router.get('/:id', authenticateOptional, practiceSetsController.getPracticeSetById);

// Admin-only Routes
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', validate(createPracticeSetSchema), practiceSetsController.createPracticeSet);
router.patch('/:id', validate(updatePracticeSetSchema), practiceSetsController.updatePracticeSet);
router.delete('/:id', practiceSetsController.deletePracticeSet);

// Questions management within Practice Sets
router.post('/:id/questions', validate(addQuestionsToSetSchema), practiceSetsController.assignQuestionsToSet);
router.delete('/:id/questions/:questionId', practiceSetsController.removeQuestionFromSet);

export default router;
