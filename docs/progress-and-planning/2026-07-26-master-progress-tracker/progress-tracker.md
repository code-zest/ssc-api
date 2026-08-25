# SSC API — Master Progress Tracker

**Last Updated:** 2026-08-25  
**Overall Status:** ✅ Phases 1–16 Complete. 🔴 Phase 17 (Multilingual) — Not Started.

---

## Platform Summary

| Item | Detail |
|---|---|
| **Product** | SSC Competitive Exam Education Platform |
| **API Repo** | `ssc-api` |
| **Admin Repo** | `ssc-admin-web` |
| **Client Repo** | `ssc-client` |
| **Stack** | Node.js + TypeScript + Express 5 + PostgreSQL (Neon) + Prisma 7 |
| **Auth** | JWT (access 15min) + Refresh Token (7d, httpOnly cookie) |
| **Roles** | `SUPER_ADMIN`, `ADMIN`, `STUDENT` |
| **Storage**| Cloudflare R2 (S3-compatible Presigned URLs) |

---

## Phase Status

| Phase | Scope | Status | Notes |
|---|---|---|---|
| **Phase 1** | Scaffolding — tsconfig, env, Prisma setup, DB connection, middleware | ✅ Complete | Prisma 7 adapter-pg |
| **Phase 2** | Auth module — register, verify email, login, refresh, logout, forgot/reset password | ✅ Complete | NodeMailer OTP, HTTP-Only refresh cookie |
| **Phase 3** | User CRUD + role-based middleware | ✅ Complete | |
| **Phase 4** | Subjects → Chapters → Lessons + lesson progress tracking | ✅ Complete | Client uses React Query Optimistic UI, Auto-Advance Lesson UX integrated |
| **Phase 5** | Question bank — CRUD + bulk import (JSON) | ✅ Complete | |
| **Phase 6** | Practice Sets + Mock Tests — admin CRUD | ✅ Complete | |
| **Phase 7** | Test Attempt engine + Scoring service (server-side, negative marking) | ✅ Complete | Analytics preserved via SetNull schema |
| **Phase 8** | Analytics endpoints + Leaderboard (SQL window functions) | ✅ Complete | Student & Admin Dashboards built |
| **Phase 9** | File upload service — S3 + pre-signed URLs | ✅ Complete | Cloudflare R2 integrated directly from Admin Web |
| **Phase 10** | Payments, Products, Access Tier Gates, Razorpay integration | ✅ Complete | Content locked and unlockable via purchases. Premium Full-Bleed Marketing UI/UX polished. |
| **Phase 11** | Notifications — email digest, test reminders | 🔴 Not Started | Future |
| **Pillar 2** | Exams & Syllabus — `TargetExam`, `SyllabusNode` (versioned tree) CRUD | ✅ Complete | 2026-08-16 |
| **Pillar 3** | System Health — latency middleware, `/health/metrics` endpoint | ✅ Complete | 2026-08-16 |
| **Phase 12** | Test Suites & Pre-commit hooks | ✅ Complete | Vitest for Frontends, Jest for Backend, Husky hooked |
| **Phase 13** | Persona & Personalization — demographics schema, onboarding endpoint, persona-aware dashboard, persona-sorted products, recommended products in dashboard, PART_TIME lesson sort | ✅ Complete | 2026-08-22 |
| **Phase 14** | Exam Notifications (Job Alerts) — Schema, CRUD endpoints, Public API | ✅ Complete | ToFu SEO Strategy |
| **Phase 15** | Gamification — Topic-wise PYQ Learning, Daily 10-Minute Targets & Streaks | ✅ Complete | 2026-08-22 |
| **Phase 16** | Advanced Analytics — Mock Test Time vs. Accuracy Diagnostics | ✅ Complete | 2026-08-22 |
| **Phase 17** | Multilingual — Hindi (HI) + Telugu (TE) content translation. `QuestionTranslation` + `LessonTranslation` schema, Sarvam AI batch script, locale-aware API serving (`?locale=` param), `User.preferredLocale` field | 🔴 Not Started | Sarvam AI (₹37 est.) |

---

## Status Legend

| Symbol | Meaning |
|---|---|
| ✅ | Complete |
| 🟡 | In Progress |
| 🔴 | Not Started |
| ⏸️ | Blocked / On Hold |
| 🗑️ | Deprecated / Removed |

---

## Open Questions

| # | Question | Priority | Resolved? |
|---|---|---|---|
| 1 | PostgreSQL hosting — Supabase, Railway, AWS RDS? | 🔴 High | ✅ Neon Serverless Postgres chosen |
| 2 | Media storage — AWS S3 or Cloudinary? | 🔴 High | ✅ Cloudflare R2 chosen for zero egress |
| 3 | Payments / Subscriptions at launch? | 🟡 Medium | ✅ Yes, via Razorpay |
| 4 | SSC exam types at launch — all or subset? | 🔴 High | ✅ Admin-defined via Exams module — no hardcoded list. Admins create exams, shifts, and syllabus via `/api/v1/exams`. CGL is the primary focus at launch. |
| 5 | Languages — English only or bilingual (EN + HI)? | 🟡 Medium | ✅ English only at launch. Hindi localisation explicitly deferred — no `locale` field exists in schema. |
| 6 | Email service — Nodemailer, SendGrid, or AWS SES? | 🔴 High | ✅ Nodemailer (Ethereal for Dev) |
| 7 | User Persona auto-assignment — purely algorithmic or allow self-selection? | 🟡 Medium | ✅ Auto-assignment based on onboarding signals (no persona label shown to user) |

---

## Key Documents

| Document | Link |
|---|---|
| Core API Architecture | [core-api-architecture.md](../../architecture-and-infrastructure/2026-07-26-core-api-architecture/core-api-architecture.md) |
| Architecture Audit (Aug 5) | [architecture-audit.md](../../../../../docs/architecture-and-infrastructure/2026-08-05-architecture-audit/architecture-audit.md) |
| Cloudflare R2 Setup | [cloudflare-r2-setup.md](../../../../../docs/infrastructure/cloudflare-r2-setup.md) |
| Database Schema ADR | [initial-schema.md](../../database-and-schema/2026-07-26-initial-schema/initial-schema.md) |
| Auth & Security Strategy | [auth-strategy.md](../../auth-and-security/2026-07-26-auth-strategy/auth-strategy.md) |
| User Personas | [user-personas.md](../../product/user-personas.md) |
| Personalization API Spec | [personalization-api.md](../../product/personalization-api.md) |
| **Gamification Engine (Phase 15)** | [gamification-engine.md](../../architecture-and-infrastructure/2026-08-23-gamification-engine/gamification-engine.md) |
| **Daily Quiz (Phase 15)** | [daily-quiz.md](../../architecture-and-infrastructure/2026-08-23-daily-quiz/daily-quiz.md) |
| **Advanced Analytics (Phase 16)** | [advanced-analytics.md](../../architecture-and-infrastructure/2026-08-23-advanced-analytics/advanced-analytics.md) |
| **Feedback Module** | [feedback-module.md](../../architecture-and-infrastructure/2026-08-23-feedback-module/feedback-module.md) |
| **Notifications / Exam Alerts** | [notifications.md](../../architecture-and-infrastructure/2026-08-23-notifications/notifications.md) |
| **Multilingual HI + TE (Phase 17)** | [multilingual-i18n.md](../../architecture-and-infrastructure/2026-08-25-multilingual-i18n/multilingual-i18n.md) |

## 5. Development Workflow Rules

*   **Pre-commit Hooks (Husky):** All three repositories (`ssc-api`, `ssc-admin-web`, `ssc-client`) have Husky implemented. Every `git commit` triggers a strict TypeScript compilation check (`npm run typecheck`). If there are TS errors, the commit will be blocked. Ensure your types are correct locally!
*   **Testing Standard:** We use `Vitest` + `React Testing Library` for React frontends, and `Jest` + `Supertest` for the Express backend API.

