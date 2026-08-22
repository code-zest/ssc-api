import { Router } from 'express';
import * as dailyQuizController from './dailyQuiz.controller';
import { authenticateOptional } from '../../middleware/authenticate';

const router = Router();

router.get('/today', authenticateOptional, dailyQuizController.getTodayQuiz);

export default router;
