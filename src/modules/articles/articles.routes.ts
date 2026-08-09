import { Router } from 'express';
import * as articlesController from './articles.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createArticleSchema, updateArticleSchema } from './articles.schemas';

const router = Router();

// Public routes (optionally authenticated to check role)
router.get('/', authenticateOptional, articlesController.getAllArticles);
router.get('/:slug', authenticateOptional, articlesController.getArticleBySlug);

// Admin-only routes
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'STAFF'));

router.post('/', validate(createArticleSchema), articlesController.createArticle);
router.patch('/:id', validate(updateArticleSchema), articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle);

export default router;
