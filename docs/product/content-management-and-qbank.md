# Content Management & Question Bank Architecture

## Overview
The SSC CGL preparation platform relies heavily on dynamic, reusable content. The architecture separates the **storage of questions** from the **presentation of questions**.

### 1. The Central Question Bank
All questions are stored centrally in the `questions` table. 
* Every question MUST belong to a specific **Subject** and a **Chapter**.
* Questions hold data about difficulty, exam types (e.g., SSC CGL, CHSL), whether they are PYQs (Previous Year Questions), and any relevant tags.
* This centralized approach ensures we don't have duplicated data if a question is used in multiple tests.

### 2. Presentation Layers
Questions sit passively in the Question Bank until they are explicitly mapped to a presentation layer via join tables.

* **Practice Sets (Chapter-wise Q&A):**
  * Practice sets are subject or chapter specific.
  * Questions are mapped via the `PracticeSetQuestion` table, which preserves their exact ordering.
* **Mock Tests (Full-length Exams):**
  * Mock tests simulate real exams and have multiple **Sections** (e.g., Quantitative Aptitude, English).
  * Questions are mapped to a specific section via the `MockTestSectionQuestion` table.
* **SEO PYQ Pages:**
  * The public-facing Next.js client (`/pyq/[subject]/[chapter]`) queries the Question Bank dynamically. It filters by `isPYQ: true` for the specific subject/chapter slug.

## Data Entry & Bulk Import (CSV)

Populating the database manually via UI forms is slow. To streamline operations, the Admin Web (`ssc-admin-web`) features a **Bulk Import** tool for Questions.

### CSV Upload Workflow
Instead of unreliable PDF parsing or Markdown scraping, the system uses strict CSV templating:
1. **Download Template:** Admins can download `question_template.csv` directly from the Bulk Import dialog.
2. **Fill Data:** Content creators fill out the CSV in Excel/Google Sheets. Columns match the API schema exactly (Question Text, Options A-D, Correct Option, Explanation, Difficulty, etc.).
3. **Upload & Map:**
   * Admins drag-and-drop the CSV.
   * Admins select the target **Subject** and **Chapter** via dropdowns in the UI.
   * `papaparse` parses the CSV locally in the browser, mapping rows to the `CreateQuestionInput` schema.
   * The UI injects the selected `subjectId` and `chapterId` into every question automatically.
4. **Submit:** The mapped JSON array is POSTed to `/api/v1/questions/bulk`.

### Why CSV?
* **Robustness:** Structured columns prevent the "thundering herd" of validation errors caused by inconsistent Markdown spacing or PDF OCR failures.
* **Speed:** Content creators can use Excel formulas and bulk-copy options.
* **Client-Side Parsing:** `papaparse` handles the CSV-to-JSON conversion strictly in the browser, reducing server payload complexity and throwing immediate validation errors if the CSV is malformed.
