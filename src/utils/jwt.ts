import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AccessTokenPayload {
  userId: string;
  role: string;
}

/**
 * Signs a short-lived access token (15 min by default).
 * Contains userId and role — enough for authenticate + authorize middleware.
 */
export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as jwt.SignOptions['expiresIn'],
    issuer: 'codezest-api',
    audience: 'codezest-client',
  });
}

/**
 * Verifies and decodes an access token.
 * Throws JsonWebTokenError or TokenExpiredError on failure.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: 'codezest-api',
    audience: 'codezest-client',
  }) as AccessTokenPayload;
}
