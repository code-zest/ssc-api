# Multilingual Architecture: Hindi (HI) + Telugu (TE)

**Date:** 2026-08-25
**Status:** 🔴 Not Started — Approved Plan
**Applies to:** `ssc-api`
**Related:** [ssc-client multilingual doc](../../../../../ssc-client/docs/frontend-and-ux/2026-08-25-multilingual-i18n/multilingual-client.md) · [ssc-admin-web multilingual doc](../../../../../ssc-admin-web/docs/frontend-and-ux/2026-08-25-multilingual-i18n/multilingual-admin.md)

---

## 1. Context & Problem

All content in the database (questions, lessons, chapters, subjects) is **English only**. The `Language` enum (`EN | HI`) exists in the schema and `Question.language` defaults to `EN` — but this is an unused tag, not a translation mechanism.

The SSC exam audience is predominantly Hindi-medium with a large Telugu-speaking base (AP/Telangana). Native-language content is a major retention and conversion lever.

### Why runtime/on-demand translation is rejected

`generateDynamicAttempt` picks questions from a random pool at request time. Calling a translation API per-question at runtime would:
- Add 300–800ms per API round-trip, serialised per question
- Make test start latency 3–8 seconds for a 10-question set
- Burn API credits on every page load
- Introduce third-party uptime dependency into the core test flow

**Verdict: Content must be pre-translated and stored in the DB.**

---

## 2. Architecture: Pre-Translated Storage Pattern

```
OFFLINE (one-time batch run)
  scripts/translate-content.ts
    └── Sarvam AI API (mayura model, en-IN → hi-IN / te-IN)
          ├── question_translations  (one row per question+locale)
          └── lesson_translations   (one row per lesson+locale)

RUNTIME (zero added latency)
  GET /api/v1/attempts/:id?locale=hi
    └── Prisma include translations
          ├── translation found → overlay HI fields on EN base
          └── no translation   → return EN (silent fallback, never throws)
```

---

## 3. Schema Changes

### 3a. Extend Language Enum

```prisma
enum Language {
  EN
  HI
  TE   // ADD: Telugu
}
```

### 3b. QuestionTranslation Model (NEW)

```prisma
model QuestionTranslation {
  id           String   @id @default(cuid())
  question     Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  questionId   String
  locale       Language // HI | TE (never EN — EN is the authoritative source)

  questionText String
  // Same JSON shape as Question.options: [{ key: "1"|"2"|"3"|"4", text: string }]
  // CRITICAL: key values are NEVER translated. Only text is translated.
  // Question.correctOption ("1"|"2"|"3"|"4") is locale-agnostic and never changes.
  options      Json
  explanation  String?

  isVerified   Boolean  @default(false) // false = AI draft, true = human-reviewed
  translatedBy String   @default("AI")  // "AI" | reviewer name

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@unique([questionId, locale])
  @@index([questionId])
  @@map("question_translations")
}
```

Add to Question model:
```prisma
translations QuestionTranslation[]
```

### 3c. LessonTranslation Model (NEW)

Only `ARTICLE` type lessons have translatable `articleHtml`. `VIDEO` and `PDF` lessons are exempt.

```prisma
model LessonTranslation {
  id          String   @id @default(cuid())
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  lessonId    String
  locale      Language

  title       String
  articleHtml String?  @db.Text  // KaTeX preserved via placeholder extraction (see §5)

  isVerified  Boolean  @default(false)
  translatedBy String  @default("AI")

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([lessonId, locale])
  @@index([lessonId])
  @@map("lesson_translations")
}
```

Add to Lesson model:
```prisma
translations LessonTranslation[]
```

### 3d. User Locale Preference

```prisma
model User {
  // ... existing ...
  preferredLocale Language @default(EN)   // ADD
}
```

---

## 4. Batch Translation Script

### File: `scripts/translate-content.ts`

**Provider: Sarvam AI** — built specifically for Indian languages, direct EN→HI/TE without English bridge.

| Provider | Cost / 1M chars | HI/TE quality |
|---|---|---|
| **Sarvam AI** | ₹23 (~$0.28) | Excellent |
| Google Translate | ₹1,650 (~$20) | Good |
| DeepL | Not supported | — |

**Total cost estimate:** ~1.6M chars × 2 locales ≈ **₹37 total**

**Usage:**
```bash
bun scripts/translate-content.ts --locale=hi --dry-run      # Preview, no writes
bun scripts/translate-content.ts --locale=hi                # Translate to Hindi
bun scripts/translate-content.ts --locale=te                # Translate to Telugu
bun scripts/translate-content.ts --locale=all               # Both
bun scripts/translate-content.ts --locale=hi --questionId=<id>  # Single re-translate
```

**Sarvam AI API call:**
```typescript
POST https://api.sarvam.ai/translate
Headers: { 'API-Subscription-Key': process.env.SARVAM_API_KEY }
Body: {
  input: "Who discovered radioactivity?",
  source_language_code: "en-IN",
  target_language_code: "hi-IN", // or "te-IN"
  mode: "formal",
  model: "mayura:v1",
  enable_preprocessing: false
}
// Response: { translated_text: "रेडियोधर्मिता की खोज किसने की?" }
```

Add to `.env` / `.env.example`:
```
SARVAM_API_KEY=your_sarvam_api_key_here
```

### KaTeX Preservation (Critical for lesson articleHtml)

```typescript
// Extract math placeholders BEFORE sending to Sarvam
function extractMath(html: string): { cleaned: string; math: string[] } {
  const math: string[] = [];
  const cleaned = html.replace(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g, (match) => {
    math.push(match);
    return `[[MATH_${math.length - 1}]]`;
  });
  return { cleaned, math };
}

// Reinsert AFTER translation
function reinsertMath(translated: string, math: string[]): string {
  return translated.replace(/\[\[MATH_(\d+)\]\]/g, (_, i) => math[Number(i)]);
}
```

### Options JSON integrity

```typescript
// Only option.text is translated. option.key is NEVER touched.
const translatedOptions = await Promise.all(
  question.options.map(async (opt) => ({
    key: opt.key,                              // preserved
    text: await translateText(opt.text, locale), // translated
  }))
);
```

### English Comprehension exemption

All questions where `subject.slug === 'english-comprehension'` are skipped. This subject tests English language proficiency — translating it defeats the purpose.

---

## 5. API: Locale-Aware Serving

### Query param

```
GET /api/v1/attempts/:id?locale=hi
GET /api/v1/attempts/:id?locale=te
GET /api/v1/attempts/:id               → defaults to EN (backwards compatible)
GET /api/v1/lessons/:slug?locale=hi
GET /api/v1/practice-sets/:id/questions?locale=te
```

### Overlay utility (`src/utils/locale.ts`)

Response shape is **identical** regardless of locale — client receives the same structure, just with different text:

```typescript
export function applyLocale(question: QuestionWithTranslations, locale: Language) {
  if (locale === 'EN') return question;

  const t = question.translations?.find((tr) => tr.locale === locale);
  if (!t) return question; // Silent EN fallback — never throws, never errors

  return {
    ...question,
    questionText: t.questionText,
    options: t.options,
    explanation: t.explanation ?? question.explanation,
    translations: undefined, // Strip raw translation rows from API response
  };
}
```

### Affected services

| Service | Change Required |
|---|---|
| `attempts.service.ts → getAttemptDetails` | `include: { translations: true }`, apply `applyLocale` per question |
| `practiceSets.service.ts → getPracticeSetQuestions` | Same pattern |
| `lessons.service.ts → getLessonById` | Return translated `title` + `articleHtml` if available |
| `questions.service.ts → getQuestions` (admin) | No locale param — admin always sees EN + `translations` array for status |

### Fallback behaviour

| Scenario | Result |
|---|---|
| `?locale=hi`, no HI translation | Serve EN silently |
| `?locale=te`, no TE translation | Serve EN silently |
| Locale omitted | Serve EN (default) |
| `?locale=invalid_value` | 400 Bad Request |
| English Comprehension + any locale | Always serve EN |

---

## 6. Admin-Facing Endpoints

New endpoints needed for the admin translation management page:

```
GET    /api/v1/admin/questions/:id/translations      → list translations for a question
PATCH  /api/v1/admin/questions/:id/translations/:locale → update a translation text + isVerified
DELETE /api/v1/admin/questions/:id/translations/:locale → delete (triggers re-translate on next script run)
GET    /api/v1/admin/translation-stats               → { total, translatedHI, translatedTE, verifiedHI, verifiedTE }
```

---

## 7. Migration Steps

```bash
# 1. Add schema changes
bunx prisma migrate dev --name add_multilingual_translation_tables

# 2. Set up Sarvam API key in .env
echo "SARVAM_API_KEY=your_key" >> .env

# 3. Dry run to verify
bun scripts/translate-content.ts --locale=hi --dry-run

# 4. Run translation (do HI first, verify quality, then TE)
bun scripts/translate-content.ts --locale=hi
bun scripts/translate-content.ts --locale=te

# 5. Verify counts
# psql: SELECT locale, COUNT(*) FROM question_translations GROUP BY locale;
# psql: SELECT locale, COUNT(*) FROM lesson_translations GROUP BY locale;
```

---

## 8. Progress Tracker

| Task | Status |
|---|---|
| Schema: TE enum value | 🔴 Not Started |
| Schema: `QuestionTranslation` model | 🔴 Not Started |
| Schema: `LessonTranslation` model | 🔴 Not Started |
| Schema: `User.preferredLocale` | 🔴 Not Started |
| Prisma migration | 🔴 Not Started |
| `scripts/translate-content.ts` | 🔴 Not Started |
| Run batch HI translation | 🔴 Not Started |
| Run batch TE translation | 🔴 Not Started |
| `src/utils/locale.ts` | 🔴 Not Started |
| `attempts.service.ts` locale support | 🔴 Not Started |
| `lessons.service.ts` locale support | 🔴 Not Started |
| `practiceSets.service.ts` locale support | 🔴 Not Started |
| Admin translation CRUD endpoints | 🔴 Not Started |
