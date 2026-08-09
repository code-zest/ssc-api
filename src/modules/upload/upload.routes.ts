import { Router } from 'express';
import * as uploadController from './upload.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Only admins can upload files
router.post('/presigned-url', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), uploadController.getPresignedUrl);

export default router;
