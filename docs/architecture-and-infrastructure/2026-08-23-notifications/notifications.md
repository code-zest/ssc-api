# Exam Notifications / Job Alerts — API Reference (Phase 14)

**Date:** 2026-08-23  
**Status:** ✅ Implemented  
**Module:** `src/modules/notifications/`  
**Base path:** `/api/v1/notifications`

---

## 1. What It Is

The Notifications module manages **SSC exam job alerts** — official government notifications for recruitment exams (SSC CGL, CHSL, CPO, etc.). These are content entries curated by admins and surfaced to students as:

- A **dashboard widget** listing upcoming active notifications
- **Public SEO pages** (no auth required) so unauthenticated users and search engines can discover them

This is **not** a push notification or in-app alert system — it is a simple CMS-style CRUD for exam recruitment notices.

---

## 2. Database Schema

```prisma
model ExamNotification {
  id                   String   @id @default(cuid())
  title                String                          // e.g. "SSC CGL 2026 Recruitment"
  organization         String                          // e.g. "Staff Selection Commission"
  vacancies            Int                             // total posts advertised
  applicationStartDate DateTime
  applicationEndDate   DateTime
  notificationLink     String                          // URL to official notification PDF/page
  logoUrl              String?                         // Optional org logo (Cloudflare R2 URL)
  isActive             Boolean  @default(true)         // false = hidden from public, visible to admins with ?all=true

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("exam_notifications")
}
```

---

## 3. Auth Matrix

| Endpoint | Auth | Roles |
|---|---|---|
| `GET /` | ❌ Public | Anyone |
| `GET /:id` | ❌ Public | Anyone |
| `POST /` | ✅ Required | `ADMIN`, `SUPER_ADMIN` |
| `PATCH /:id` | ✅ Required | `ADMIN`, `SUPER_ADMIN` |
| `DELETE /:id` | ✅ Required | `ADMIN`, `SUPER_ADMIN` |

---

## 4. API Endpoints

### `GET /api/v1/notifications`

List exam notifications. Returns **only active** records by default; admins can pass `?all=true` to see all.

**Auth:** None (public)  
**Query params:**

| Param | Type | Default | Description |
|---|---|---|---|
| `all` | `"true"` | — | When `"true"`, returns all records regardless of `isActive`. No auth check — relies on admin callers knowing this param. |

> ⚠️ **Gap:** The `?all=true` bypass has no auth guard. Any unauthenticated caller can see inactive (draft) notifications by passing `?all=true`. Consider gating this behind `authenticate + authorize(ADMIN)`.

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ntf_abc",
      "title": "SSC CGL 2026 Notification",
      "organization": "Staff Selection Commission",
      "vacancies": 17727,
      "applicationStartDate": "2026-09-01T00:00:00.000Z",
      "applicationEndDate": "2026-09-30T00:00:00.000Z",
      "notificationLink": "https://ssc.gov.in/cgl-2026",
      "logoUrl": "https://cdn.example.com/ssc-logo.png",
      "isActive": true,
      "createdAt": "2026-08-20T10:00:00.000Z",
      "updatedAt": "2026-08-20T10:00:00.000Z"
    }
  ]
}
```

Results are ordered by `createdAt DESC` (newest first).

---

### `GET /api/v1/notifications/:id`

Fetch a single notification by ID.

**Auth:** None (public)  
**Response `200 OK`:** Single `ExamNotification` object (same shape as above).  
**Response `404`:** `{ "success": false, "message": "Notification not found" }`

---

### `POST /api/v1/notifications`

Create a new exam notification.

**Auth:** Required (`ADMIN` or `SUPER_ADMIN`)  
**Body (JSON):**
```json
{
  "title": "SSC CHSL 2026 Recruitment",
  "organization": "Staff Selection Commission",
  "vacancies": 3712,
  "applicationStartDate": "2026-10-01T00:00:00.000Z",
  "applicationEndDate": "2026-10-31T00:00:00.000Z",
  "notificationLink": "https://ssc.gov.in/chsl-2026",
  "logoUrl": "https://cdn.example.com/ssc-logo.png",
  "isActive": true
}
```

| Field | Type | Required | Validation |
|---|---|---|---|
| `title` | `string` | ✅ | min 1 char |
| `organization` | `string` | ✅ | min 1 char |
| `vacancies` | `integer` | ✅ | ≥ 0 |
| `applicationStartDate` | ISO 8601 datetime string | ✅ | — |
| `applicationEndDate` | ISO 8601 datetime string | ✅ | — |
| `notificationLink` | `string` | ✅ | Valid URL |
| `logoUrl` | `string` | ❌ | Valid URL if provided |
| `isActive` | `boolean` | ❌ | Defaults to `true` |

**Response `201 Created`:** Full `ExamNotification` object.

---

### `PATCH /api/v1/notifications/:id`

Update any field of an existing notification. All fields are optional (partial update).

**Auth:** Required (`ADMIN` or `SUPER_ADMIN`)  
**Body (JSON):** Any subset of the `POST` body fields.

Common use cases:
- `{ "isActive": false }` — soft-hide an expired notification
- `{ "applicationEndDate": "...", "vacancies": 4500 }` — correct an entry

**Response `200 OK`:** Updated `ExamNotification` object.

> ⚠️ **Gap:** No 404 guard — if the `:id` doesn't exist, Prisma throws an unhandled `P2025` error that bypasses the error handler and returns a 500. Should be wrapped with a `findUnique` check first.

---

### `DELETE /api/v1/notifications/:id`

Hard-delete a notification. Permanent — no soft-delete.

**Auth:** Required (`ADMIN` or `SUPER_ADMIN`)  
**Response `200 OK`:**
```json
{ "success": true, "message": "Notification deleted successfully" }
```

---

## 5. No-Service Architecture

Unlike most modules, this one has **no `notifications.service.ts`** — all Prisma calls are directly in the controller. This is appropriate for a thin CRUD module with no complex business logic, but means there is no service layer to add caching or event hooks to later without a refactor.

---

## 6. Client & Admin Integration

### Student-facing (ssc-client)
- **Dashboard widget:** Calls `GET /notifications` and renders the 3 most recent active alerts as cards with the org logo, title, vacancies count, and deadline countdown.
- **Public SEO pages:** `/notifications` and `/notifications/:id` — accessible without auth for discoverability.

### Admin (ssc-admin-web)
- **`/notifications` page:** Full CRUD table — create, edit, toggle `isActive`, delete. No pagination currently (all records loaded at once).

---

## 7. Known Gaps

| # | Severity | Gap |
|---|---|---|
| 1 | 🟡 | `?all=true` has no auth guard — inactive/draft notifications are publicly accessible |
| 2 | 🟡 | `PATCH /:id` has no 404 guard — missing ID returns unhandled Prisma `P2025` error |
| 3 | 🟡 | No pagination on `GET /` — as entries grow, the full list is returned |
| 4 | ⚪ | No `applicationEndDate < now()` auto-deactivation — expired notifications stay `isActive: true` until manually updated |
| 5 | ⚪ | No error handling (`try/catch`) in controller — unhandled rejections bypass the global error middleware |
