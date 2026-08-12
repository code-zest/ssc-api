# Hierarchical Lessons & Exam Type Filters

**Date**: 2026-08-12

## 1. Exam Type Filtering
- **Subject**: Now includes an `examTypes` array (`ExamType[]`).
- **Chapter**: Now includes an `examTypes` array (`ExamType[]`).
- When fetching subjects or chapters, the API must filter based on the `examType` requested by the frontend (e.g., `?examType=SSC_CGL`).

## 2. Lesson Uniqueness & Routing
- **Lesson Slug**: The `slug` field on the `Lesson` model is **NO LONGER GLOBALLY UNIQUE**. It is only unique per `chapterId`. 
- This means multiple chapters can have a lesson with `slug: 'theory'`.
- **API Routing**: To fetch a lesson uniquely, the frontend must use the hierarchical route: `GET /api/v1/lessons/learn/:subjectSlug/:chapterSlug/:lessonSlug`.
- The `lessons.service.ts` validates that the `subjectSlug` matches the `chapterSlug` which matches the `lessonSlug`.
