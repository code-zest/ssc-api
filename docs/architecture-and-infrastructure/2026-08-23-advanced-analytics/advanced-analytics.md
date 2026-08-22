# Advanced Analytics — API Reference (Phase 16)

**Date:** 2026-08-23  
**Status:** ✅ Implemented (Phase 16)  
**Module:** `src/modules/analytics/`  
**Base path:** `GET /api/v1/analytics/...`

---

## Overview

The analytics module has two tiers:

| Tier | Phase | Endpoints | Auth |
|---|---|---|---|
| **Basic** (Phase 8) | Dashboard, leaderboards | `GET /dashboard`, `GET /leaderboard/*` | `STUDENT` |
| **Advanced** (Phase 16) | Diagnostics, comparison, trends | `GET /weak-topics`, `/danger-zones`, `/peer-comparison`, `/mastery-trends`, `/dashboard/agenda`, `/test/:id` | `STUDENT` or optional |

This doc covers the **6 Phase 16 endpoints** only.

---

## 1. `GET /api/v1/analytics/weak-topics`

Returns the student's **3 weakest chapters** based on their last 10 submitted test attempts.

**Auth:** Required (student)  
**Query params:** None

**Algorithm:**
1. Fetches the last 10 `SUBMITTED` attempts with chapter-level response data
2. Aggregates correct/total per chapter
3. Filters to chapters with **≥ 3 attempts** (statistical minimum)
4. Filters to chapters with **accuracy < 70%**
5. Sorts worst-first; tie-broken by most total attempts
6. Returns **top 3**

**Response `200 OK`:**
```json
[
  {
    "id": "ch_abc",
    "name": "Simplification",
    "subjectName": "Quantitative Aptitude",
    "correct": 1,
    "total": 8,
    "accuracy": 13
  },
  {
    "id": "ch_def",
    "name": "Reading Comprehension",
    "subjectName": "English",
    "correct": 3,
    "total": 7,
    "accuracy": 43
  }
]
```

**Returns `[]`** if the student has no submitted attempts.

---

## 2. `GET /api/v1/analytics/dashboard/agenda`

Returns the student's **personalised daily study plan** — targets + today's progress + next lesson to study.

**Auth:** Required (student)  
**Query params:** None

**Algorithm:**
- Daily targets are set per `studyPersona`:

| Persona | Lesson Target | Practice Target |
|---|---|---|
| `FULL_TIME_ASPIRANT` (default) | 2 lessons | 1 practice set |
| `PART_TIME_ASPIRANT` | 1 lesson | 1 practice set |
| `REPEAT_ASPIRANT` | 0 lessons | 3 practice sets |

- Progress counts completed lessons and practice attempts **since midnight today**
- `nextLesson` finds the first active, uncompleted lesson ordered by `subject.order → chapter.order → lesson.order`

**Response `200 OK`:**
```json
{
  "persona": "FULL_TIME_ASPIRANT",
  "targets": { "lessons": 2, "practice": 1 },
  "progress": {
    "lessonsCompletedToday": 1,
    "practiceCompletedToday": 0
  },
  "nextLesson": {
    "id": "ls_xyz",
    "title": "Ratio & Proportion — Part 1",
    "slug": "ratio-proportion-part-1",
    "type": "VIDEO",
    "chapterName": "Ratio & Proportion",
    "chapterSlug": "ratio-proportion",
    "subjectName": "Quantitative Aptitude",
    "subjectSlug": "quantitative-aptitude"
  }
}
```

`nextLesson` is `null` if all active lessons are completed.

---

## 3. `GET /api/v1/analytics/danger-zones`

Returns chapters where the student is **consistently struggling** — low accuracy **or** slow response time — across their last 500 answered questions.

**Auth:** Required (student)  
**Query params:** None

**Algorithm:**
1. Fetches the student's last 500 `AttemptResponse` records
2. Aggregates per chapter: total attempted, total correct, total time
3. A chapter qualifies as a **Danger Zone** if:
   - `accuracy <= 50%` **OR** `avg time per question > 45 seconds`
   - Minimum 3 data points required
4. Sorted by accuracy ascending (worst first)

**Response `200 OK`:**
```json
[
  {
    "subjectId": "sub_001",
    "subjectName": "Quantitative Aptitude",
    "chapterId": "ch_abc",
    "chapterName": "Geometry",
    "accuracy": 22,
    "avgTimeSeconds": 62,
    "totalAttempted": 9
  }
]
```

**Difference from `/weak-topics`:**

| | `/weak-topics` | `/danger-zones` |
|---|---|---|
| Data source | Last 10 **attempts** | Last 500 **responses** |
| Time dimension | ❌ | ✅ (flags slow chapters) |
| Accuracy threshold | < 70% | ≤ 50% OR > 45s avg |
| Max results | 3 | Unlimited |

---

## 4. `GET /api/v1/analytics/peer-comparison`

Returns the student's average accuracy compared to **community average** and **top 10%** of all students.

**Auth:** Required (student)  
**Query params:** None

**Algorithm:**
- Calculates the student's average accuracy across all submitted attempts
- Fetches **all** submitted attempts platform-wide (⚠️ see Known Gaps)
- Computes per-user averages, sorts, slices top 10%

**Response `200 OK`:**
```json
{
  "studentAccuracy": 67,
  "communityAverage": 58,
  "top10PercentAverage": 84
}
```

> ⚠️ **Performance Warning:** This query loads all `TestAttempt` rows platform-wide into memory to compute percentiles. At scale this will become slow. Should be migrated to a SQL window function or a nightly aggregation job.

---

## 5. `GET /api/v1/analytics/mastery-trends`

Returns the student's **daily average accuracy over the last 30 days** — used to render a line chart of score progression.

**Auth:** Required (student)  
**Query params:** None

**Algorithm:**
- Fetches submitted attempts from `now - 30 days`
- Groups by calendar date, averages accuracy per day
- Returns chronologically sorted array (only days with at least one submission)

**Response `200 OK`:**
```json
[
  { "date": "2026-07-25", "accuracy": 55 },
  { "date": "2026-07-26", "accuracy": 62 },
  { "date": "2026-08-01", "accuracy": 71 }
]
```

Returns `[]` if no submissions in the last 30 days.

---

## 6. `GET /api/v1/analytics/test/:attemptId`

Returns **deep per-question diagnostics** for a single completed attempt — time-vs-accuracy quadrant data and topic-level performance breakdown.

**Auth:** Optional (`authenticateOptional`) — accessible to both authenticated students and anonymous guest sessions  
**Path params:** `attemptId` — the `TestAttempt` ID

**Response `200 OK`:**
```json
{
  "overview": {
    "avgTimeCorrect": 28,
    "avgTimeIncorrect": 54
  },
  "quadrantData": [
    {
      "questionId": "q_001",
      "timeTaken": 15,
      "isCorrect": 1,
      "isAnswered": true,
      "subjectName": "English",
      "chapterName": "Synonyms"
    }
  ],
  "topicPerformance": [
    {
      "subjectName": "English",
      "chapterName": "Synonyms",
      "total": 5,
      "accuracy": 80,
      "avgTime": 18
    }
  ]
}
```

**`quadrantData`** is intended for a 2-axis scatter plot:
- X-axis: `timeTaken` (speed)
- Y-axis: `isCorrect` (accuracy)
- Quadrant interpretation: fast+correct = strength, slow+incorrect = critical weakness

**Throws `500`** (unhandled) if `attemptId` is not found — should be updated to return a `404`.

---

## Known Gaps

| # | Severity | Gap |
|---|---|---|
| 1 | 🟡 | `/peer-comparison` loads all attempts into memory — needs SQL window function at scale |
| 2 | 🟡 | `/test/:attemptId` throws unhandled `500` on missing attempt — should be `404 ApiError` |
| 3 | 🟡 | `/danger-zones` hardcodes `take: 500` — should be configurable or paginated |
| 4 | ⚪ | No `?subjectId` filter on `/weak-topics` or `/danger-zones` — useful for subject-specific drill-downs |
| 5 | ⚪ | No admin counterparts — admins cannot view per-student analytics via the API |
