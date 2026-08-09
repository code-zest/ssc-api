import { Response } from 'express';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200,
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static paginated<T>(
    res: Response,
    data: T[],
    meta: PaginationMeta,
    message = 'Success',
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
    });
  }

  static created<T>(res: Response, data: T, message = 'Created successfully') {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}
