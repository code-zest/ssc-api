import { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { getPagination, buildPaginationMeta } from '../../utils/pagination';
import { Role } from '@prisma/client';

// ─── Get Own Profile ──────────────────────────────────────────────────────────

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.getProfile(req.user!.userId);
    ApiResponse.success(res, user);
  } catch (error) {
    next(error);
  }
}

// ─── Update Own Profile ───────────────────────────────────────────────────────

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.updateProfile(req.user!.userId, req.body);
    ApiResponse.success(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
}

// ─── Update Own Password ──────────────────────────────────────────────────────

export async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await usersService.updatePassword(req.user!.userId, req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

// ─── Admin: Get All Users ─────────────────────────────────────────────────────

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const pagination = getPagination(req);
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const role = typeof req.query.role === 'string' ? (req.query.role as Role) : undefined;

    const { users, total } = await usersService.getAllUsers(pagination.page, pagination.limit, search, role);
    const meta = buildPaginationMeta(total, pagination);

    ApiResponse.paginated(res, users, meta, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
}

// ─── Admin: Update User Role ──────────────────────────────────────────────────

export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.updateUserRole(req.user!.userId, req.params.id as string, req.body);
    ApiResponse.success(res, user, 'User role updated successfully');
  } catch (error) {
    next(error);
  }
}

// ─── Admin: Toggle User Status ────────────────────────────────────────────────

export async function toggleUserStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await usersService.toggleUserStatus(req.user!.userId, req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

