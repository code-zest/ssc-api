import { Router } from 'express';
import * as attemptsController from './attempts.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { startAttemptSchema, syncAnswersSchema, claimAttemptSchema, generatePYQAttemptSchema } from './attempts.schemas';

const router = Router();

// Attempt routes allow optional authentication to support anonymous PLG attempts
router.use(authenticateOptional);

// Start an attempt (Practice Set or Mock Test)
router.post('/start', validate(startAttemptSchema), attemptsController.startAttempt);

// Generate and start a dynamic PYQ attempt
router.post('/pyq', validate(generatePYQAttemptSchema), attemptsController.generatePYQAttempt);

// Start a Daily Quiz attempt (auth optional — supports guest sessions)
router.post('/daily-quiz/start', attemptsController.startDailyQuizAttempt);

// Generate dynamic attempt (Daily or Practice Set)
router.post('/dynamic', authenticate, attemptsController.generateDynamicAttempt);

// Sync answers periodically while test is active
router.patch('/:id/answers', validate(syncAnswersSchema), attemptsController.syncAnswers);

// Final submission (calculates scores server-side)
router.post('/:id/submit', attemptsController.submitAttempt);

// Get attempt details and results
router.get('/:id', attemptsController.getAttemptDetails);

// Claim an anonymous attempt (requires full auth)
router.post('/:id/claim', authenticate, validate(claimAttemptSchema), attemptsController.claimAttempt);

export default router;
