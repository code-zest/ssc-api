# Daily Quiz — API & Architecture Reference

**Date:** 2026-08-23  
**Status:** ⚠️ Partially Implemented — see Known Gaps below  
**Module:** `src/modules/dailyQuiz/`  
**Related product doc:** [`docs/product-strategy/dynamic-practice.md`](../../../../docs/product-strategy/dynamic-practice.md)

---

## 1. What It Is

The Daily Quiz is a server-generated set of **10 random questions**, refreshed once per calendar day (UTC). It is designed to be the backend for the "Daily 10-Minute Challenge" feature on the student dashboard.

It is distinct from Practice Sets and Mock Tests in that:
- No admin creates it — it is **auto-generated on first request** for the day.
- It supports **both authenticated students and anonymous guests** (via `x-guest-session-id`).
- Its attempt is wired into the standard `TestAttempt` flow so scoring, analytics, and streak mechanics all work for free.

---

## 2. Database Schema

### `DailyQuiz` Model

```prisma
model DailyQuiz {
  id           String              @id @default(cuid())
  date         DateTime            @unique @db.Date   // UTC midnight — enforces one quiz per calendar day
  title        String                                  // e.g. "Daily 10-Minute Challenge - 23/08/2026"
  description  String?
  questions    DailyQuizQuestion[]
  testAttempts TestAttempt[]       // attempts linked to this quiz

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### `DailyQuizQuestion` Junction Model

```prisma
model DailyQuizQuestion {
  dailyQuizId String
  questionId  String
  order       Int       @default(0)   // 1-based display order

  @@id([dailyQuizId, questionId])     // composite PK — no duplicate questions in a quiz
  @@map("daily_quiz_questions")
}
```

### Link on `TestAttempt`

```prisma
// On TestAttempt model:
dailyQuiz   DailyQuiz?  @relation(...)
dailyQuizId String?
```

A daily quiz attempt is stored as a standard `TestAttempt` with `attemptType = 'PRACTICE'` and `dailyQuizId` populated.

### Link on `Question`

```prisma
// On Question model:
dailyQuizzes  DailyQuizQuestion[]
```

---

## 3. Question Generation Logic

When `GET /today` is called and no `DailyQuiz` record exists for UTC today:

```
1. SELECT id FROM "Question" ORDER BY RANDOM() LIMIT 10
2. CREATE DailyQuiz { date: utcMidnightToday, title: "Daily 10-Minute Challenge - DD/MM/YYYY" }
3. CREATE DailyQuizQuestion × 10 (order 1–10)
4. Return the quiz with all question data included
```

Key behaviours:
- **Idempotent**: The `@unique` constraint on `date` means the first request generates the quiz; all subsequent calls that day read the cached record. No cron job required.
- **Random**: Uses PostgreSQL's `ORDER BY RANDOM()` — not seeded, so the selection differs per generation.
- **Throws** `500 Internal Server Error` if the question bank is empty.

---

## 4. API Endpoints

### `GET /api/v1/daily-quiz/today`

Fetches (or lazily generates) today's quiz.

> ⚠️ **BUG — Route Not Mounted:** `dailyQuizRouter` is imported in `src/app.ts` (line 104) but the corresponding `app.use(...)` call is missing. This endpoint is **currently unreachable**. See Known Gaps.

**Auth:** Optional (`authenticateOptional` — works for both logged-in users and guests)

**Response `200 OK`:**
```json
{
  "status": "success",
  "data": {
    "id": "clxyz123",
    "title": "Daily 10-Minute Challenge - 23/08/2026",
    "description": "Take this quick 10-minute challenge to maintain your daily streak!",
    "date": "2026-08-23T00:00:00.000Z",
    "questions": [
      {
        "id": "q_abc",
        "content": "<p>What is the capital of India?</p>",
        "difficulty": "EASY",
        "options": [
          { "key": "A", "text": "Mumbai", "rationale": null },
          { "key": "B", "text": "New Delhi", "rationale": "Correct — New Delhi is the capital." },
          { "key": "C", "text": "Chennai", "rationale": null },
          { "key": "D", "text": "Kolkata", "rationale": null }
        ],
        "correctOption": "B",
        "subjectId": "sub_001",
        "chapterId": "ch_042"
      }
      // ... 9 more questions
    ]
  }
}
```

> Note: `correctOption` and `rationale` are returned in this endpoint (unlike the test engine which hides them until submission). This is intentional for a practice/revision context but should be reviewed if a timed competitive mode is added.

---

### Starting a Daily Quiz Attempt

A student starts a daily quiz attempt by calling the standard attempts endpoint with the quiz ID in the body.

> ⚠️ **BUG — Endpoint Not Registered:** `startDailyQuizAttempt` handler exists in `attempts.controller.ts` but is **not wired up as a route** in `attempts.routes.ts`. See Known Gaps.

**Intended endpoint:** `POST /api/v1/attempts/daily-quiz/start`  
**Body:** `{ "dailyQuizId": "clxyz123" }`  
**Auth:** Optional (authenticated student OR `x-guest-session-id` header)

The handler creates a `TestAttempt` record linked to the `DailyQuiz` plus one `AttemptResponse` per question (blank initially). Submission and scoring then use the **standard** `POST /api/v1/attempts/:id/submit` endpoint — no special handling needed.

---

## 5. Full Lifecycle (When Working)

```
Client                              API
  │                                  │
  ├─ GET /daily-quiz/today ─────────►│  Generate or fetch today's DailyQuiz
  │◄─ { id, questions[] } ──────────┤
  │                                  │
  ├─ POST /attempts/daily-quiz/start►│  Create TestAttempt (type=PRACTICE, dailyQuizId)
  │◄─ { attemptId } ────────────────┤
  │                                  │
  │  (student answers 10 questions)  │
  │                                  │
  ├─ PATCH /attempts/:id/answers ───►│  Sync answers
  ├─ POST /attempts/:id/submit ─────►│  Score + award XP + update streak
  │◄─ { marksObtained, accuracy } ──┤
```

---

## 6. Known Gaps & Bugs

| # | Severity | Gap | Fix Required |
|---|---|---|---|
| 1 | 🔴 **BUG** | `dailyQuizRouter` is imported but not mounted in `app.ts` | Add `app.use(\`/api/${env.API_VERSION}/daily-quiz\`, dailyQuizRouter)` in `src/app.ts` after the gamification router |
| 2 | 🔴 **BUG** | `startDailyQuizAttempt` controller exists but has no route in `attempts.routes.ts` | Add `router.post('/daily-quiz/start', attemptsController.startDailyQuizAttempt)` to `attempts.routes.ts` |
| 3 | 🟡 **Design** | `correctOption` and `rationale` are exposed in the `GET /today` response | Acceptable for a daily revision quiz, but should be intentional product decision |
| 4 | 🟡 **Design** | Question selection is fully random — no subject weighting, no difficulty curve | Future: weight by student's weak topics from `/analytics/weak-topics` |
| 5 | 🟡 **Design** | No `hasTakenToday` flag in the response | Client cannot tell if the student already completed today's quiz without a separate attempt lookup |
| 6 | ⚪ **Missing** | No admin UI to see or override today's daily quiz | Could be added to `ssc-admin-web` in a future phase |
