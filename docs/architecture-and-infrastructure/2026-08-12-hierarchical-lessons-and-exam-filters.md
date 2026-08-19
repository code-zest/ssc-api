# Hierarchical Lessons & Exam Type Filters

**Date**: 2026-08-12
**Updated**: 2026-08-20 (Personalized Curriculum Engine)

## 1. Exam Type Filtering
- **Subject**: Now includes an `examTypes` array (`ExamType[]`).
- **Chapter**: Now includes an `examTypes` array (`ExamType[]`).
- **Personalized API Filtering**: The `getAllSubjects` API dynamically filters content based on an `exams` array (parsed from query params or user profile). The database returns subjects and chapters only if they match at least one of the user's requested exams using the `hasSome` Prisma operator.
- **Cache Isolation**: The backend Redis cache (`cacheMiddleware`) is designed to partition responses based on the requested exams. A user requesting `SSC_CGL` gets a completely different cached curriculum layout than a user requesting `SSC_MTS`.

## 2. Lesson Uniqueness & Routing
- **Lesson Slug**: The `slug` field on the `Lesson` model is **NO LONGER GLOBALLY UNIQUE**. It is only unique per `chapterId`. 
- This means multiple chapters can have a lesson with `slug: 'theory'`.
- **API Routing**: To fetch a lesson uniquely, the frontend must use the hierarchical route: `GET /api/v1/lessons/learn/:subjectSlug/:chapterSlug/:lessonSlug`.
- The `lessons.service.ts` validates that the `subjectSlug` matches the `chapterSlug` which matches the `lessonSlug`.
