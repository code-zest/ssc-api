# Gamification Engine — API & Architecture Reference

**Date:** 2026-08-23  
**Status:** ✅ Implemented (Phase 15)  
**Module:** `src/modules/gamification/`  
**Related product doc:** [gamification-rules.md](../../../../docs/product-strategy/gamification-rules.md)

---

## 1. Database Schema

All gamification state lives on the `User` model — no separate gamification table.

### Fields on `User`

| Field | Type | Default | Description |
|---|---|---|---|
| `xpPoints` | `Int` | `0` | Cumulative XP earned across all test submissions |
| `rankTier` | `RankTier` | `ASPIRANT` | Current rank, derived from `xpPoints` on every test submission |
| `streakDays` | `Int` | `0` | Consecutive days the student has submitted at least one test |
| `lastActiveDate` | `DateTime?` | `null` | Timestamp of last test submission; used to calculate streak continuity |
| `badges` | `UserBadge[]` | — | Junction to awarded badges (see below) |

### `RankTier` Enum

```prisma
enum RankTier {
  ASPIRANT        // Default — 0 XP
  CONSTABLE       // 500+ XP
  SUB_INSPECTOR   // 2,000+ XP
  INSPECTOR       // 5,000+ XP
  COMMISSIONER    // 10,000+ XP
}
```

### `Badge` Model

```prisma
model Badge {
  id          String      @id @default(cuid())
  name        String
  description String
  iconUrl     String?     // Cloudflare R2 URL or generic identifier
  criteria    String      // e.g. "FIRST_TEST", "10_DAY_STREAK"
  users       UserBadge[]
}
```

### `UserBadge` Junction Model

```prisma
model UserBadge {
  id        String   @id @default(cuid())
  userId    String
  badgeId   String
  awardedAt DateTime @default(now())

  @@unique([userId, badgeId])  // A badge can only be awarded once per user
}
```

---

## 2. XP Formula

XP is awarded automatically on every test submission (`POST /api/v1/attempts/:attemptId/submit`).

```
performanceXP = (marksObtained × 10) + (accuracy × 5)
xpGained      = max(0, performanceXP)   // Never negative
```

**Examples:**

| Marks | Accuracy | XP Gained |
|---|---|---|
| 50 | 80% | (50×10) + (80×5) = **900 XP** |
| 20 | 45% | (20×10) + (45×5) = **425 XP** |
| 0 | 0% | (0×10) + (0×5) = **0 XP** |

After XP is added, the `rankTier` is immediately re-evaluated and written to the database.

---

## 3. Rank Tier Thresholds (Implemented)

| Tier | Min XP Required | Theme |
|---|---|---|
| `ASPIRANT` | 0 | Starting point |
| `CONSTABLE` | 500 | First milestone |
| `SUB_INSPECTOR` | 2,000 | Mid-level commitment |
| `INSPECTOR` | 5,000 | High dedication |
| `COMMISSIONER` | 10,000 | Elite rank |

Rank is determined by a pure XP threshold — **streaks do not affect rank** in the current implementation (unlike the product spec which proposed streak requirements for higher tiers).

---

## 4. Streak Logic

Streaks are calculated inside `attempts.service.ts → submitAttempt()`, immediately before XP is processed.

```
IF lastActiveDate is null:
    streakDays = 1   (first ever submission)

ELSE:
    diffDays = calendar-days between today (00:00) and lastActiveDate (00:00)

    IF diffDays == 1:  streakDays += 1  (consecutive day ✅)
    IF diffDays >  1:  streakDays = 1   (streak broken, reset)
    IF diffDays == 0:  no change        (already submitted today)
```

Key implementation detail: comparison is done on **midnight-floored dates**, not raw timestamps — so a submission at 23:59 and one at 00:01 the next calendar day correctly increments the streak by 1.

The `lastActiveDate` and `streakDays` are only written when they actually change (guarded by an `updateStreak` boolean), avoiding unnecessary DB writes for same-day repeat submissions.

---

## 5. API Endpoints

### `GET /api/v1/gamification/profile`

Returns the authenticated student's full gamification snapshot.

**Auth:** Required (`authenticate` middleware, any role)

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "xpPoints": 1250,
    "rankTier": "CONSTABLE",
    "streakDays": 7,
    "badges": [
      {
        "id": "ub_abc123",
        "badgeId": "b_xyz",
        "awardedAt": "2026-08-20T14:30:00.000Z",
        "badge": {
          "id": "b_xyz",
          "name": "First Step",
          "description": "Completed your first test",
          "iconUrl": null,
          "criteria": "FIRST_TEST"
        }
      }
    ]
  }
}
```

**Response `404`:** Profile not found (user record missing).

---

### XP Award (Internal — Not a Public Endpoint)

XP is not manually awarded via an API call. It is triggered automatically as a side-effect of `POST /api/v1/attempts/:attemptId/submit`.

The call chain is:
```
POST /attempts/:id/submit
  → attempts.service.ts → submitAttempt()
      → GamificationService.processTestCompletion(userId, marksObtained, accuracy)
          → updates user.xpPoints, user.rankTier
```

The `processTestCompletion` response `{ xpGained, newXpTotal, newRankTier }` is currently **discarded** by the caller — it is not included in the submit response payload. This is a known gap if you want to show "You earned 450 XP!" toasts on the client.

---

## 6. Known Gaps & Future Work

| Gap | Notes |
|---|---|
| Badge **awarding logic** is unimplemented | The `Badge` and `UserBadge` schema exists but no service code automatically awards badges based on `criteria`. Currently only `GET /profile` reads them. |
| Streak is **not exposed in the submit response** | The client cannot show a "Streak extended!" notification after a test without a separate `GET /gamification/profile` call. |
| Rank **does not consider streaks** | The product spec proposed streak requirements per tier; the implementation uses XP-only thresholds. |
| No **streak freeze** or grace period | A missed day unconditionally resets the streak to 1. |
| No **admin controls** | There is no admin endpoint to manually adjust XP, reset streaks, or award badges. |
