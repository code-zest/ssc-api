# Auth & Security Strategy

**Date:** 2026-07-26
**Status:** ✅ Approved
**Author:** CVS Charan

---

## Context

The platform requires secure authentication for three roles (`SUPER_ADMIN`, `ADMIN`, `STUDENT`) with email/password login, email verification via OTP, and multi-device support.

---

## Auth Flow

### Register
1. Validate input (Zod)
2. Check email uniqueness
3. Hash password → `bcrypt`, cost factor **12**
4. Generate 6-digit OTP → hash → store in `User.otpCode` + `User.otpExpiresAt` (10 min)
5. Send verification email
6. Return `201` — no tokens issued yet

### Verify Email
1. Receive OTP
2. Compare hash → set `User.isEmailVerified = true`, clear OTP fields
3. Return `200`

### Login
1. Find user by email, check `isActive` and `isEmailVerified`
2. Compare password hash (bcrypt)
3. Generate **access token** → JWT, signed with `JWT_SECRET`, **15-minute** expiry
4. Generate **refresh token** → `crypto.randomBytes(64)` → hash → store in `RefreshToken` table (7-day expiry)
5. Set refresh token in **httpOnly, Secure, SameSite=Strict** cookie
6. Return `{ accessToken, user: { id, name, email, role } }`

### Refresh Token
1. Read token from cookie
2. Hash → lookup `RefreshToken` table
3. Validate expiry
4. Issue new access token
5. Optionally rotate refresh token (recommended for high-security)

### Logout
1. Delete `RefreshToken` record for current device
2. Clear cookie

### Forgot Password
1. Find user by email
2. Generate 6-digit OTP → hash → store
3. Send password reset email

### Reset Password
1. Verify OTP hash + expiry
2. Hash new password (bcrypt)
3. Update `User.passwordHash`
4. Delete **all** `RefreshToken` records for this user (force re-login on all devices)
5. Clear OTP fields

---

## Roles & Authorization

| Role | Capabilities |
|---|---|
| `SUPER_ADMIN` | All endpoints including managing admins |
| `ADMIN` | Manage content, users; cannot manage other admins |
| `STUDENT` | Own data only — learn, attempt tests, view own results |

Authorization middleware:
```typescript
// Usage in routes
router.post('/subjects', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), validate(createSubjectSchema), subjectController.create)
```

---

## Security Decisions

| Concern | Decision |
|---|---|
| Password storage | bcrypt, cost factor 12 |
| Access token expiry | 15 minutes (short-lived) |
| Refresh token storage | Hashed in DB — never raw |
| Refresh token transport | httpOnly cookie — not accessible to JS |
| OTP storage | Hashed in DB |
| OTP expiry | 10 minutes |
| Rate limiting | Auth routes: 10 req / 15 min |
| CORS | Whitelist only `admin-web` and `client` origins |
| Headers | `helmet()` sets all recommended security headers |
| Input validation | Zod on all body / query / params |
| SQL injection | Prisma parameterized queries — safe by default |
