# Initial Prisma Schema — Code Zest Academy

**Date:** 2026-07-26
**Status:** ✅ Approved
**Author:** CVS Charan

---

## Context

This document records the initial relational schema design for the SSC Education Platform. All tables are defined in `prisma/schema.prisma` and managed via Prisma Migrate.

---

## Tables

| Table | Purpose |
|---|---|
| `User` | Auth, roles, student profile |
| `RefreshToken` | Multi-device refresh token storage (hashed) |
| `Subject` | Top-level groupings (Quant, English, GA, Reasoning) |
| `Chapter` | Sub-divisions within a subject |
| `Lesson` | Video / Article / PDF learning content |
| `Question` | Central question bank (supports PYQ flag, tagging) |
| `PracticeSet` | Curated topic-wise MCQ sets |
| `PracticeSetQuestion` | Join: PracticeSet ↔ Question (with ordering) |
| `MockTest` | Full SSC-pattern timed tests with marking scheme |
| `MockTestSection` | Sections within a mock test (per subject) |
| `MockTestSectionQuestion` | Join: MockTestSection ↔ Question |
| `TestAttempt` | Per-student attempt record (practice or mock) |
| `AttemptResponse` | Per-question response within an attempt |
| `AttemptSectionScore` | Per-section score for mock tests |
| `LessonProgress` | Tracks which lessons a student completed |
| `Enrollment` | Free vs Pro vs Elite subscription record |

---

## Key Design Decisions

### 1. Denormalized `subjectId` on `Lesson`
`Lesson` carries both `chapterId` and `subjectId` to allow fast queries like "all lessons for a subject" without a join through `Chapter`.

### 2. JSON Column for Question Options
`Question.options` is stored as a PostgreSQL `Json` column:
```json
[
  { "key": "A", "text": "24", "imageUrl": null },
  { "key": "B", "text": "36", "imageUrl": null },
  { "key": "C", "text": "48", "imageUrl": null },
  { "key": "D", "text": "60", "imageUrl": null }
]
```
This avoids a separate `QuestionOption` table while still being queryable.

### 3. PostgreSQL Native Arrays
`Question.tags`, `Question.examTypes`, `Subject.examTypes`, and `Enrollment.examTypes` use Prisma's `String[]` / `Enum[]` types — mapped to PostgreSQL native arrays. No join table needed.

### 4. Soft Deletes via `isActive`
`User`, `Question`, `PracticeSet`, `MockTest`, `Lesson`, `Subject`, `Chapter` all use an `isActive: Boolean` flag instead of hard deletion to preserve referential integrity and audit history.

### 5. Server-Side Scoring Only
All score computation happens in `src/services/scoring.service.ts` at submission time — never trusted from the client. See [Auth & Security](../../auth-and-security/2026-07-26-auth-strategy/auth-strategy.md).

---

## Indexes

| Table | Index |
|---|---|
| `User` | `email` |
| `RefreshToken` | `userId` |
| `Lesson` | `chapterId`, `subjectId` |
| `Question` | `subjectId`, `chapterId`, `difficulty`, `isPYQ` |
| `PracticeSet` | `subjectId` |
| `MockTest` | `examType` |
| `TestAttempt` | `studentId`, `(studentId, mockTestId)`, `(studentId, practiceSetId)`, `status` |
| `AttemptResponse` | `attemptId` |
| `LessonProgress` | `studentId` |

---

## Migration Strategy

- Migrations are generated via `npx prisma migrate dev --name <description>`
- Migration files are committed to git — they are the source of truth for DB history
- Production deployments run `npx prisma migrate deploy` (no interactive prompts)

---

## Seeding Strategy

The database includes a seeding mechanism to populate initial demo data, users, and subjects. The primary entry point is `prisma/seed.ts`.

### Running Seeds
To execute the seed script, run:
```bash
npm run db:seed
```

### Extending Seeds (e.g., Biology Subject)
For modularity, large data sets (like the 24 topics for Biology) are separated into their own files under `prisma/seeds/`. 
For example, the Biology topics are located in `prisma/seeds/biology-subject-seed.ts`. 

To include these in the seeding process:
1. Ensure the new seed module exports a function (e.g., `seedBiology(prisma)`).
2. Import and invoke this function within the `main()` execution block of `prisma/seed.ts`.
