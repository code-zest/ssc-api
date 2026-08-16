-- Add examYear column to target_exams
ALTER TABLE target_exams ADD COLUMN IF NOT EXISTS "examYear" INTEGER;

-- Create syllabus_nodes table
CREATE TABLE IF NOT EXISTS syllabus_nodes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "examId" TEXT NOT NULL REFERENCES target_exams(id) ON DELETE CASCADE,
  "subjectId" TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  "chapterId" TEXT REFERENCES chapters(id) ON DELETE CASCADE,
  weightage FLOAT NOT NULL DEFAULT 1.0,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Indexes
CREATE INDEX IF NOT EXISTS syllabus_nodes_exam_id_idx ON syllabus_nodes ("examId");
CREATE INDEX IF NOT EXISTS syllabus_nodes_subject_id_idx ON syllabus_nodes ("subjectId");

-- Unique constraints (partial to handle nullable chapterId)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'syllabus_nodes_exam_subject_chapter_key'
  ) THEN
    CREATE UNIQUE INDEX syllabus_nodes_exam_subject_chapter_key ON syllabus_nodes ("examId", "subjectId", "chapterId") WHERE "chapterId" IS NOT NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'syllabus_nodes_exam_subject_null_key'
  ) THEN
    CREATE UNIQUE INDEX syllabus_nodes_exam_subject_null_key ON syllabus_nodes ("examId", "subjectId") WHERE "chapterId" IS NULL;
  END IF;
END $$;

SELECT column_name FROM information_schema.columns WHERE table_name = 'target_exams' ORDER BY ordinal_position;
