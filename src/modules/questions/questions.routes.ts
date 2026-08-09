import { Router } from 'express';
import * as questionsController from './questions.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createQuestionSchema, updateQuestionSchema, bulkImportSchema } from './questions.schemas';

const router = Router();

// ─── Admin Routes ─────────────────────────────────────────────────────────────
// (Currently, questions are only fetched directly by the exam engine/practice sets.
//  Direct API endpoints are meant for Admin CRM management).

router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/', questionsController.getQuestions);
router.get('/:id', questionsController.getQuestionById);
router.post('/', validate(createQuestionSchema), questionsController.createQuestion);
router.post('/bulk', validate(bulkImportSchema), questionsController.bulkImportQuestions);
router.patch('/:id', validate(updateQuestionSchema), questionsController.updateQuestion);
router.delete('/:id', questionsController.deleteQuestion);

export default router;
