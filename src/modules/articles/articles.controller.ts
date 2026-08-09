import { Request, Response, NextFunction } from 'express';
import * as articlesService from './articles.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function createArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const authorId = req.user!.userId;
    const article = await articlesService.createArticle(req.body, authorId);
    ApiResponse.created(res, article, 'Article created successfully');
  } catch (error) {
    next(error);
  }
}

export async function getAllArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user?.role === 'SUPER_ADMIN' || req.user?.role === 'ADMIN';
    // If admin, they can see all. If not, only published.
    const isPublished = isAdmin ? undefined : true;
    const categoryId = req.query.categoryId as string | undefined;

    const articles = await articlesService.getAllArticles({ isPublished, categoryId });
    ApiResponse.success(res, articles);
  } catch (error) {
    next(error);
  }
}

export async function getArticleBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user?.role === 'SUPER_ADMIN' || req.user?.role === 'ADMIN';
    const requirePublished = !isAdmin;
    
    const article = await articlesService.getArticleBySlug(req.params.slug as string, requirePublished);
    ApiResponse.success(res, article);
  } catch (error) {
    next(error);
  }
}

export async function updateArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await articlesService.updateArticle(req.params.id as string, req.body);
    ApiResponse.success(res, article, 'Article updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteArticle(req: Request, res: Response, next: NextFunction) {
  try {
    await articlesService.deleteArticle(req.params.id as string);
    ApiResponse.success(res, null, 'Article deleted successfully');
  } catch (error) {
    next(error);
  }
}
