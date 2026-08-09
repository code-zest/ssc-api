import { Request } from 'express';

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Extracts and normalises pagination params from the request query.
 * Clamps page >= 1 and limit to [1, 100].
 */
export function getPagination(req: Request): PaginationOptions {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(req.query.limit as string) || 20),
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

/**
 * Builds the meta block for paginated API responses.
 */
export function buildPaginationMeta(
  total: number,
  options: PaginationOptions,
): PaginationMeta {
  return {
    total,
    page: options.page,
    limit: options.limit,
    totalPages: Math.ceil(total / options.limit),
  };
}
