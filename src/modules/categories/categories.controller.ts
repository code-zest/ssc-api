import { Request, Response, NextFunction } from 'express';
import * as categoriesService from './categories.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { clearCache } from '../../utils/cache';

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoriesService.createCategory(req.body);
    await clearCache('categories*');
    ApiResponse.created(res, category, 'Category created successfully');
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const includeInactive = req.user?.role === 'SUPER_ADMIN' || req.user?.role === 'ADMIN';
    const categories = await categoriesService.getAllCategories(includeInactive);
    ApiResponse.success(res, categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoriesService.getCategoryBySlug(req.params.slug as string);
    ApiResponse.success(res, category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoriesService.updateCategory(req.params.id as string, req.body);
    await clearCache('categories*');
    ApiResponse.success(res, category, 'Category updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    await categoriesService.deleteCategory(req.params.id as string);
    await clearCache('categories*');
    ApiResponse.success(res, null, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
}
