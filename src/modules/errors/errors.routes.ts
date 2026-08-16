import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import * as errorsController from './errors.controller';
import {
  createErrorReportSchema,
  listErrorReportsSchema,
  updateErrorReportSchema,
} from './errors.schemas';

const router = Router();

// ── Strict rate limit for error reporting ───────────────────────────────────
// Prevents a broken component from flooding the DB
const errorReportLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many error reports. Please wait a moment.' },
});

// POST /api/v1/errors — optionally authenticated (guests can report too)
router.post(
  '/',
  errorReportLimiter,
  authenticateOptional,
  validate(createErrorReportSchema),
  errorsController.reportError,
);

// ── Admin-only routes below ─────────────────────────────────────────────────
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'STAFF'));

router.get(
  '/analytics',
  errorsController.getErrorAnalytics,
);

router.get(
  '/',
  validate(listErrorReportsSchema),
  errorsController.listErrors,
);

router.get('/:id', errorsController.getErrorById);

router.patch(
  '/:id',
  validate(updateErrorReportSchema),
  errorsController.updateError,
);

export default router;
