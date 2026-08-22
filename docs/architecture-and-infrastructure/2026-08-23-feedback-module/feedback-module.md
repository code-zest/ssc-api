# Feedback Module — API Reference

**Date:** 2026-08-23  
**Status:** ✅ Implemented (Phase 11)  
**Module:** `src/modules/feedback/`  
**Base path:** `/api/v1/feedback`

---

## 1. What It Is

The Feedback module handles two distinct use cases:

1. **Student Feedback Widget** — Students submit bug reports, feature requests, or question-specific issues directly from the client via a floating action button.
2. **Testimonials** — Students can submit testimonials (`TESTIMONIAL` type) which admins can approve for public display on the marketing site.

It is **not** the crash/error reporting system — that lives in `src/modules/errors/` and uses a separate `ErrorReport` model.

---

## 2. Database Schema

```prisma
model Feedback {
  id         String         @id @default(cuid())
  userId     String
  user       User           @relation(...)
  type       FeedbackType   @default(FEATURE_REQUEST)
  message    String                                    // max 1000 chars (validated)
  questionId String?                                   // optional — links to a specific Question
  isPublic   Boolean        @default(false)            // admin-controlled; true = shown as testimonial
  status     FeedbackStatus @default(OPEN)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([type])
}
```

### Enums

```prisma
enum FeedbackType {
  ISSUE            // Bug report or content error
  FEATURE_REQUEST  // Product suggestion (default)
  TESTIMONIAL      // Positive review for marketing
}

enum FeedbackStatus {
  OPEN      // Default — needs triage
  RESOLVED  // Admin marked as addressed
  IGNORED   // Acknowledged, won't act on
}
```

---

## 3. API Endpoints

### `POST /api/v1/feedback`

Submit feedback. Authenticated students only.

**Auth:** Required (`STUDENT`)  
**Body (JSON):**
```json
{
  "type": "ISSUE",
  "message": "The options for Q3 in Chapter 5 appear scrambled.",
  "questionId": "q_abc123"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | `FeedbackType` enum | ✅ | `ISSUE` \| `FEATURE_REQUEST` \| `TESTIMONIAL` |
| `message` | `string` | ✅ | 1–1000 characters |
| `questionId` | `string` | ❌ | Link to a specific question being reported |

**Response `201 Created`:**
```json
{
  "status": "success",
  "data": {
    "id": "fb_xyz",
    "userId": "usr_abc",
    "type": "ISSUE",
    "message": "The options for Q3 in Chapter 5 appear scrambled.",
    "questionId": "q_abc123",
    "isPublic": false,
    "status": "OPEN",
    "createdAt": "2026-08-23T03:00:00.000Z",
    "updatedAt": "2026-08-23T03:00:00.000Z"
  }
}
```

---

### `GET /api/v1/feedback`

Admin inbox — lists all feedback with optional filters.

**Auth:** Required (`SUPER_ADMIN` or `ADMIN`)  
**Query params:**

| Param | Type | Example | Notes |
|---|---|---|---|
| `type` | `FeedbackType` | `?type=ISSUE` | Optional filter |
| `status` | `FeedbackStatus` | `?status=OPEN` | Optional filter |

**Response `200 OK`:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "fb_xyz",
      "type": "ISSUE",
      "message": "...",
      "questionId": "q_abc123",
      "isPublic": false,
      "status": "OPEN",
      "createdAt": "2026-08-23T03:00:00.000Z",
      "user": { "name": "Rahul Sharma", "email": "rahul@example.com" }
    }
  ]
}
```

Results are ordered by `createdAt DESC` (newest first).

---

### `PATCH /api/v1/feedback/:id`

Admin triage — update status or approve a testimonial for public display.

**Auth:** Required (`SUPER_ADMIN` or `ADMIN`)  
**Body (JSON):**
```json
{
  "status": "RESOLVED",
  "isPublic": true
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | `FeedbackStatus` | ❌ | `OPEN` \| `RESOLVED` \| `IGNORED` |
| `isPublic` | `boolean` | ❌ | Set `true` to approve testimonial for marketing display |

**Response `200 OK`:** Returns the updated `Feedback` object with `user` included.  
**Throws `404`** if the feedback ID does not exist.

---

### `GET /api/v1/feedback/public-testimonials`

Public endpoint — returns all `TESTIMONIAL` type feedback approved by admins (`isPublic: true`).

**Auth:** None (public)  
**Query params:** None

**Response `200 OK`:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "fb_abc",
      "type": "TESTIMONIAL",
      "message": "This platform helped me crack SSC CGL in 3 months!",
      "isPublic": true,
      "status": "OPEN",
      "createdAt": "2026-08-10T12:00:00.000Z",
      "user": { "name": "Priya Singh", "email": "priya@example.com" }
    }
  ]
}
```

> ⚠️ **Privacy Note:** `user.email` is exposed in this public endpoint. Consider stripping email or replacing with a first-name-only display before using this on the marketing site.

---

## 4. Admin Web Integration

The admin feedback inbox is at `src/pages/feedback/index.tsx` in `ssc-admin-web`. It:
- Calls `GET /feedback` with `type` and `status` filter dropdowns
- Displays each submission with the user's name, type badge, message, and linked question ID
- Allows admins to `PATCH` status inline (Resolve / Ignore)
- Allows toggling `isPublic` for testimonials

---

## 5. Client Integration

The client feedback widget (floating action button) is referenced in the UX Architecture doc as a planned feature per the master plan (Pillar 4 → Section 7.2). The `POST /feedback` endpoint is already live and ready to receive submissions.

---

## 6. Known Gaps

| # | Severity | Gap |
|---|---|---|
| 1 | 🟡 | `user.email` exposed in `GET /public-testimonials` — strip before using on marketing site |
| 2 | 🟡 | No pagination on `GET /feedback` admin inbox — will slow down as submissions grow |
| 3 | 🟡 | No error handling (`try/catch`) in the controller — unhandled promise rejections bypass the global error handler |
| 4 | ⚪ | No `pageUrl` field to capture which page/route triggered the feedback submission |
| 5 | ⚪ | No admin notification (email/webhook) when new `ISSUE` feedback is submitted |
