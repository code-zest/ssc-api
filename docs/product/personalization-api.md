# Personalization API — Spec & Design

**Date:** 2026-08-08  
**Status:** 🔴 Planned  
**Author:** CVS Charan

---

## Overview

This document specifies the backend API changes required to support persona-driven personalization. It covers the new schema fields, the onboarding endpoint, and the updated profile update endpoint.

---

## 1. Database Schema Changes

### New Enums (add to `schema.prisma`)

```prisma
enum StudyPersona {
  FULL_TIME_ASPIRANT
  PART_TIME_ASPIRANT
  REPEAT_ASPIRANT
}

enum DailyStudyTime {
  LESS_THAN_2_HOURS
  TWO_TO_FOUR_HOURS
  MORE_THAN_4_HOURS
}

enum EducationLevel {
  HIGH_SCHOOL
  UNDERGRADUATE
  POSTGRADUATE
  OTHER
}

enum Gender {
  MALE
  FEMALE
  OTHER
  PREFER_NOT_TO_SAY
}
```

### User Model Changes

The following fields are added to the `User` model. All are optional (nullable) because admins and staff do not go through onboarding.

```prisma
// ─── DEMOGRAPHICS (Student-only, all optional) ──────────────────────────────
age                  Int?
gender               Gender?
educationLevel       EducationLevel?
occupation           String?          // Free text — "Software Engineer", "CA Student", etc.
incomeRange          String?          // "< 3 LPA", "3-6 LPA", "> 6 LPA"

// ─── PERSONA SIGNALS (Captured during onboarding) ───────────────────────────
studyPersona         StudyPersona?    // System-assigned, not shown to user
dailyStudyTime       DailyStudyTime?
hasAttemptedBefore   Boolean          @default(false)

// ─── ONBOARDING STATE ───────────────────────────────────────────────────────
onboardingComplete   Boolean          @default(false)
```

### Product Model Changes

```prisma
model Product {
  // ...existing fields...
  recommendedFor StudyPersona[]  // Admin-tagged for recommendation engine
}
```

---

## 2. New API Endpoint — Onboarding

### `POST /api/v1/users/onboarding`

**Auth Required:** Yes (Student only)  
**Purpose:** Collects all persona signals and demographic data in a single atomic operation at the end of the onboarding wizard. Sets `onboardingComplete = true` upon success.

#### Request Body (Zod Schema)

```typescript
const onboardingSchema = z.object({
  // Step 1: Goal (already exists, but may be updated)
  targetExam: z.nativeEnum(ExamType),
  examYear: z.number().int().min(2025).max(2030),

  // Step 2: Situation
  occupation: z.string().max(100),
  hasAttemptedBefore: z.boolean(),

  // Step 3: Commitment
  dailyStudyTime: z.nativeEnum(DailyStudyTime),

  // Step 4: Demographics (all optional)
  age: z.number().int().min(15).max(45).optional(),
  gender: z.nativeEnum(Gender).optional(),
  educationLevel: z.nativeEnum(EducationLevel).optional(),
  city: z.string().max(100).optional(),
  incomeRange: z.string().optional(),
});
```

#### Persona Assignment (Service Layer Logic)

```typescript
function assignPersona(data: OnboardingInput): StudyPersona {
  // Repeat aspirant overrides everything
  if (data.hasAttemptedBefore) return 'REPEAT_ASPIRANT';

  // Part-time signals: job or low time commitment
  const isWorking = ['working', 'professional', 'job', 'employed']
    .some(kw => data.occupation.toLowerCase().includes(kw));
  if (isWorking || data.dailyStudyTime === 'LESS_THAN_2_HOURS') {
    return 'PART_TIME_ASPIRANT';
  }

  return 'FULL_TIME_ASPIRANT';
}
```

#### Response

```typescript
{
  success: true,
  data: {
    studyPersona: 'FULL_TIME_ASPIRANT' | 'PART_TIME_ASPIRANT' | 'REPEAT_ASPIRANT',
    onboardingComplete: true,
    // Full updated user object
    user: { ...UserProfile }
  }
}
```

---

## 3. Updated Endpoint — Profile Update

### `PUT /api/v1/users/profile`

The existing profile update endpoint is extended to accept all demographic fields so students can update them later from their settings page.

**New optional fields added to Zod schema:**
```typescript
age?: z.number().int().min(15).max(45).optional(),
gender?: z.nativeEnum(Gender).optional(),
educationLevel?: z.nativeEnum(EducationLevel).optional(),
occupation?: z.string().max(100).optional(),
incomeRange?: z.string().optional(),
dailyStudyTime?: z.nativeEnum(DailyStudyTime).optional(),
```

> **Note:** `studyPersona` is **not** directly updatable via this endpoint. It can only be re-assigned by the onboarding service or a future "Re-take your profile quiz" action to prevent users from gaming the recommendation engine.

---

## 4. Persona-Filtered Content Endpoints

Once persona is established, the following existing endpoints will be extended with an optional `?persona=` query parameter that the frontend does NOT need to pass explicitly — the API reads it automatically from `req.user.studyPersona`.

| Endpoint | Persona Behavior |
|---|---|
| `GET /api/v1/dashboard/student` | Returns a `recommendedProducts` array filtered by persona |
| `GET /api/v1/products` | Ordered so persona-matched products appear first |
| `GET /api/v1/lessons` | `REPEAT_ASPIRANT` gets hard difficulty pre-selected; `PART_TIME_ASPIRANT` gets lessons filtered to ≤15 min duration |

---

## 5. Admin — Product Tagging

### `PUT /api/v1/products/:id`

The existing product update endpoint is extended:
```typescript
recommendedFor?: z.array(z.nativeEnum(StudyPersona)).optional(),
```

This allows admins in `ssc-admin-web` to curate which persona a product targets.

---

## Related Documents

| Document | Location |
|---|---|
| User Personas | `docs/product/user-personas.md` |
| Core API Architecture | `docs/architecture-and-infrastructure/2026-07-26-core-api-architecture/core-api-architecture.md` |
| Auth Strategy | `docs/auth-and-security/2026-07-26-auth-strategy/auth-strategy.md` |
