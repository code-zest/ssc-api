import { Request, Response, NextFunction } from 'express';
import { generatePresignedUrl } from './upload.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';

export async function getPresignedUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { fileName, contentType } = req.body;

    if (!fileName || !contentType) {
      throw ApiError.badRequest('fileName and contentType are required.');
    }

    const result = await generatePresignedUrl(fileName, contentType);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
