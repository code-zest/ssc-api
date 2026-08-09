# User Personas & Persona-Driven Personalization

**Date:** 2026-08-08  
**Status:** 🟢 Active — Canonical Source of Truth  
**Author:** CVS Charan  
**Applies To:** `ssc-api`, `ssc-client`, `ssc-admin-web`

---

## Purpose

This document defines the three canonical user personas for the Code Zest SSC platform. Every product decision — from content curation to dashboard layout to notification timing — must be evaluated against these personas. This is the north star for the personalization engine.

The three personas below are **archetypes**, not rigid categories. A student may not fit perfectly into one, but their onboarding answers will place them into the closest matching bucket. The system can evolve this classification over time based on actual behavior.

---

## The Three Core Personas

### Persona 1 — The Full-Time Aspirant

> *"I'm all-in. This is my main focus right now."*

| Attribute | Value |
|---|---|
| **Occupation** | Student / Recent Graduate / Unemployed |
| **Daily Study Time** | More than 4 hours |
| **Experience** | First or second attempt |
| **System Persona Value** | `FULL_TIME_ASPIRANT` |

**Pain Points:**
- Doesn't know how to structure a proper preparation schedule.
- Can feel overwhelmed by the breadth of the syllabus.
- May have a limited budget, so needs to feel maximum value from free content.
- Needs beginner-friendly, structured explanations.

**Core Needs:**
- Complete, structured course material from foundation to advanced.
- Daily study plan / timetable suggestions.
- Free PYQs (Previous Year Questions) and regular practice sets.
- Full-length mock tests to simulate exam conditions.
- Progress tracking to maintain motivation.

**Platform Response:**
- Dashboard hero: **"Today's Study Plan"** — structured daily targets (e.g., 2 lessons + 1 practice set).
- Highlight **Foundation Series** and complete subject courses prominently.
- Show subject-wise progress bars to build a sense of completion.
- Weekly mock test suggestion.

---

### Persona 2 — The Part-Time Aspirant

> *"I want to prepare, but I only have 2 hours a day at best."*

| Attribute | Value |
|---|---|
| **Occupation** | Working Professional / Government Employee |
| **Daily Study Time** | Less than 2 hours |
| **Experience** | May be first attempt; preparation spans months/years |
| **System Persona Value** | `PART_TIME_ASPIRANT` |

**Pain Points:**
- Limited and inconsistent daily time for study.
- Difficulty maintaining consistency across a long preparation journey.
- Needs highly concise, mobile-first content that can be consumed in short bursts.
- Full-length mock tests are hard to schedule on weekdays.

**Core Needs:**
- Short, high-value quizzes (10–15 mins).
- Bite-sized lessons (≤15 min video / short articles).
- Daily current affairs digest.
- Weekend-timed mock tests.
- Mobile-friendly interface for commute learning.

**Platform Response:**
- Dashboard hero: **"Your Daily 15-Min Quiz"** — single large CTA, low-commitment entry.
- Filter and surface only **short-format content** (lessons ≤15 mins).
- Weekend notification / modal: *"You have time this weekend — take a full mock test."*
- Deemphasize 200-hour foundation courses (they create anxiety, not motivation).

---

### Persona 3 — The Repeat Aspirant

> *"I've been through this before. I know the basics — I need to sharpen my edge."*

| Attribute | Value |
|---|---|
| **Occupation** | Any |
| **Daily Study Time** | 2–4+ hours |
| **Experience** | Has attempted SSC exam at least once before |
| **System Persona Value** | `REPEAT_ASPIRANT` |

**Pain Points:**
- Already knows the syllabus but has identifiable weak areas.
- Doesn't want to waste time on beginner content they already know.
- Needs to understand *why* they got questions wrong (detailed solutions).
- Wants to benchmark against other aspirants (leaderboard matters more to them).

**Core Needs:**
- Advanced and high-difficulty mock test series.
- Detailed performance analytics and weak-topic identification.
- PYQs with thorough explanations.
- Leaderboard ranking for motivation.

**Platform Response:**
- Dashboard hero: **"Your Weak Areas"** — immediately surface their lowest-accuracy subjects.
- Skip or collapse foundation lessons; surface **Advanced Mock Series** first.
- Show percentile rank prominently in the analytics dashboard.
- Highlight "Hard" difficulty questions in practice sets.

---

## Persona Assignment Logic

The system auto-assigns a persona based on three onboarding answers. No persona label is shown to the student — the experience just changes silently.

```
IF occupation IN [STUDENT, UNEMPLOYED, RECENT_GRADUATE]
   AND hasAttemptedBefore = FALSE
   AND dailyStudyTime = MORE_THAN_4_HOURS
   → FULL_TIME_ASPIRANT

IF occupation = WORKING_PROFESSIONAL
   OR dailyStudyTime = LESS_THAN_2_HOURS
   → PART_TIME_ASPIRANT

IF hasAttemptedBefore = TRUE
   → REPEAT_ASPIRANT
```

> **Priority:** `REPEAT_ASPIRANT` > `PART_TIME_ASPIRANT` > `FULL_TIME_ASPIRANT`  
> If `hasAttemptedBefore = TRUE`, they are always classified as `REPEAT_ASPIRANT` regardless of other signals.

---

## Persona-to-Feature Mapping

| Feature | Full-Time | Part-Time | Repeat |
|---|---|---|---|
| Daily Study Plan (structured targets) | ✅ Hero | ⚠️ Light | ❌ Hidden |
| Foundation Course Series | ✅ Hero | ⚠️ Below fold | ❌ Hidden |
| Daily 15-Min Quiz | ⚠️ Below fold | ✅ Hero | ⚠️ Below fold |
| Bite-sized Lessons (≤15 min) | ⚠️ Listed | ✅ Hero | ⚠️ Listed |
| Advanced Mock Series | ⚠️ Below fold | ❌ Hidden | ✅ Hero |
| Weak Area Analysis | ❌ Hidden | ❌ Hidden | ✅ Hero |
| Leaderboard | ⚠️ Below fold | ❌ Hidden | ✅ Prominent |
| Weekend Mock Reminder | ❌ Hidden | ✅ Notification | ❌ Hidden |

---

## Related Documents

| Document | Location |
|---|---|
| Schema ADR | `ssc-api/docs/database-and-schema/2026-07-26-initial-schema/initial-schema.md` |
| Onboarding Flow (Client) | `ssc-client/docs/frontend-and-ux/2026-08-08-onboarding-flow/onboarding-flow.md` |
| Personalization API Spec | `ssc-api/docs/product/personalization-api.md` |
| Client Data Models | `ssc-client/docs/database-and-schema/2026-07-26-client-data-models/client-data-models.md` |
