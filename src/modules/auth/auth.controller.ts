import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { env } from '../../config/env';

const REFRESH_COOKIE = 'refresh_token';

const getCookieOptions = (rememberMe: boolean) => ({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  // Only set maxAge for persistent sessions, otherwise it's a session cookie
  ...(rememberMe && { maxAge: 30 * 24 * 60 * 60 * 1000 }), // 30 days in ms
});

// ─── POST /auth/register ──────────────────────────────────────────────────────

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body);
    ApiResponse.created(res, user, 'Account created. Check your email for the verification code.');
  } catch (error) {
    next(error);
  }
}

// ─── POST /auth/verify-email ──────────────────────────────────────────────────

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.verifyEmail(req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

// ─── POST /auth/login ─────────────────────────────────────────────────────────

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const deviceInfo = req.headers['user-agent'];
    const { accessToken, refreshToken, rememberMe, user } = await authService.login(req.body, deviceInfo);

    // Set refresh token as httpOnly cookie — never exposed to JavaScript
    res.cookie(REFRESH_COOKIE, refreshToken, getCookieOptions(rememberMe));

    ApiResponse.success(res, { accessToken, user }, 'Login successful');
  } catch (error) {
    next(error);
  }
}

// ─── POST /auth/refresh ───────────────────────────────────────────────────────

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const rawToken = req.cookies?.[REFRESH_COOKIE];
    const { accessToken, refreshToken, rememberMe } = await authService.refresh(rawToken);
    
    // Set new refresh token (rotation)
    res.cookie(REFRESH_COOKIE, refreshToken, getCookieOptions(rememberMe));
    
    ApiResponse.success(res, { accessToken });
  } catch (error) {
    next(error);
  }
}

// ─── POST /auth/logout ────────────────────────────────────────────────────────

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const rawToken = req.cookies?.[REFRESH_COOKIE];
    await authService.logout(rawToken);

    res.clearCookie(REFRESH_COOKIE, { path: '/' });
    ApiResponse.noContent(res);
  } catch (error) {
    next(error);
  }
}

// ─── POST /auth/forgot-password ───────────────────────────────────────────────

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.forgotPassword(req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

// ─── POST /auth/reset-password ────────────────────────────────────────────────

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.resetPassword(req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
