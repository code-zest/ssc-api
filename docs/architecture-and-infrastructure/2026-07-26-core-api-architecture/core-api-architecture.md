# Core API Architecture

**Date:** 2026-07-26
**Status:** ✅ Approved
**Author:** CVS Charan

---

## Context

We are building the backend API for the SSC Exam Education Platform — a competitive exam prep product covering SSC CGL, CHSL, MTS, CPO, and GD exams.

The API serves two consumers:
- `ssc-admin-web` — content management, user management, analytics
- `ssc-client` — student-facing learning, test-taking, progress tracking

---

## Decisions

### Runtime & Framework
- **Node.js + TypeScript** — type safety end-to-end
- **Express 5** — lightweight, already bootstrapped in `package.json`
- **Feature-sliced modules** (`src/modules/<feature>/`) — each module owns its own `routes.ts`, `controller.ts`, `service.ts`, `validator.ts`

### Database
- **PostgreSQL 16** — relational data fits the domain perfectly (subjects → chapters → lessons → questions → attempts)
- **Prisma 5** — type-safe ORM, auto-generates TypeScript client, version-controlled SQL migrations

> See [Database & Schema](../../database-and-schema/2026-07-26-initial-schema/initial-schema.md) for full schema.

### Auth
- **JWT** — stateless access tokens (15 min)
- **Refresh tokens** — stored hashed in `RefreshToken` table, 7-day expiry, supports multi-device
- **bcrypt** — password hashing, cost factor 12

> See [Auth & Security Strategy](../../auth-and-security/2026-07-26-auth-strategy/auth-strategy.md) for full flow.

### Validation
- **Zod** — runtime request validation on all routes (body, query, params)

### Security Middleware Stack
```
helmet → cors → morgan → rate-limit → authenticate → authorize → validate → controller → errorHandler
```

### Storage (Files & Media)
- **Cloudflare R2** — S3-compatible API for zero-egress file storage.
- **Presigned URLs** — Uploads happen directly from the browser to the cloud bucket, bypassing the Node.js server.

### Folder Structure
```
ssc-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/          # env, prisma client singleton
│   ├── middleware/       # authenticate, authorize, validate, errorHandler
│   ├── modules/          # feature-sliced modules
│   │   ├── auth/
│   │   ├── users/
│   │   ├── subjects/
│   │   ├── chapters/
│   │   ├── lessons/
│   │   ├── questions/
│   │   ├── practiceSets/
│   │   ├── mockTests/
│   │   ├── attempts/
│   │   ├── analytics/
│   │   └── upload/
│   ├── services/         # email, scoring
│   ├── utils/            # ApiResponse, ApiError, pagination, jwt
│   └── index.ts
├── .env.example
├── tsconfig.json
└── Dockerfile
```

---

## Consequences

- All DB queries are type-safe via Prisma — no runtime schema mismatches
- Zod validators are colocated with routes — easy to maintain
- Feature-sliced modules allow parallel development (admin-web and client teams can work independently)


### Error Handling & Client Feedback
- **Automated Telemetry:** Clients capture unhandled errors (Error Boundaries) and send detailed stack traces, route paths, and fingerprints to the `/api/v1/errors` endpoint.
- **User Ticket Integration:** Clients expose a global Support widget (FAB) and inline crash forms that send user-reported issues (with rich telemetry context) to the `/api/v1/feedback` endpoint with `type: 'ISSUE'`.
