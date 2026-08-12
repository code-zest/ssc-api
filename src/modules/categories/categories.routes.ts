import { Router } from 'express';
import * as categoriesController from './categories.controller';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { cacheMiddleware } from '../../middleware/cache';
import { createCategorySchema, updateCategorySchema } from './categories.schemas';

const router = Router();

// Public routes (optionally authenticated to check role)
router.get('/', authenticateOptional, cacheMiddleware(3600), categoriesController.getAllCategories);
router.get('/:slug', authenticateOptional, cacheMiddleware(3600), categoriesController.getCategoryBySlug);

// Admin-only routes
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.post('/', validate(createCategorySchema), categoriesController.createCategory);
router.patch('/:id', validate(updateCategorySchema), categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;
