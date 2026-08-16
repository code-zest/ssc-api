import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import * as gamificationController from './gamification.controller';

const router = Router();

router.get('/profile', authenticate, gamificationController.getProfile);

export default router;
