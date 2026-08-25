import { Router } from 'express';
import * as translationsController from './translations.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { listTranslationsSchema, updateQuestionTranslationSchema, updateLessonTranslationSchema } from './translations.schemas';

const router = Router();

// Require admin access for all translation endpoints
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/', validate(listTranslationsSchema), translationsController.getTranslations);
router.get('/stats', translationsController.getTranslationStats);

router.patch('/questions/:id', validate(updateQuestionTranslationSchema), translationsController.updateQuestionTranslation);
router.patch('/lessons/:id', validate(updateLessonTranslationSchema), translationsController.updateLessonTranslation);

export default router;
