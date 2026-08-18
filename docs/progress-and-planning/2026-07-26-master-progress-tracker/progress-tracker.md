# SSC API — Master Progress Tracker

**Last Updated:** 2026-08-16  
**Overall Status:** ✅ Phases 1–12 Complete. ✅ Pillar 2 (Exams/Syllabus) & Pillar 3 (Health Monitoring) Implemented. Phase 13 (Personalization) Planned.

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
| **Phase 13** | Persona & Personalization — demographics schema, onboarding endpoint, persona-aware dashboard | 🔴 Planned | See `docs/product/personalization-api.md` |
| **Phase 14** | Exam Notifications (Job Alerts) — Schema, CRUD endpoints, Public API | 🟡 In Progress | ToFu SEO Strategy |

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
| 4 | SSC exam types at launch — all or subset? | 🔴 High | ❌ |
| 5 | Languages — English only or bilingual (EN + HI)? | 🟡 Medium | ❌ |
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
| **User Personas (NEW)** | [user-personas.md](../../product/user-personas.md) |
| **Personalization API Spec (NEW)** | [personalization-api.md](../../product/personalization-api.md) |

## 5. Development Workflow Rules

*   **Pre-commit Hooks (Husky):** All three repositories (`ssc-api`, `ssc-admin-web`, `ssc-client`) have Husky implemented. Every `git commit` triggers a strict TypeScript compilation check (`npm run typecheck`). If there are TS errors, the commit will be blocked. Ensure your types are correct locally!
*   **Testing Standard:** We use `Vitest` + `React Testing Library` for React frontends, and `Jest` + `Supertest` for the Express backend API.

