# Next-Gen EdTech Lesson Experience (Rich Interactive Lessons)

**Date**: August 14, 2026
**Domain**: Product & Frontend Architecture
**Status**: Proposal / Architecture Planning

## 1. Vision & Objectives

To compete with top-tier EdTech platforms (Byju's, Unacademy, Coursera), the "Lesson Reading" experience must evolve from static HTML (reading long text) to **Active Learning**. This involves injecting dynamic, highly-visual, and interactive components directly into the lesson content.

### Proposed Active Learning Components
1. **Interactive Timelines:** Essential for subjects like History (e.g., Pre-Historic Culture). A vertical/horizontal scrollable timeline component where students can see chronological events with icons and dates.
2. **Dynamic Mindmaps:** Visual summaries generated via code (e.g., `mermaid.js` or `reactflow`) that students can pan/zoom to understand hierarchical concepts (e.g., Biology Taxonomy).
3. **Embedded Micro-Quizzes:** "Knowledge Checks" (1-2 MCQs) placed in the middle of an article to force active recall before the student can proceed to the next section.
4. **Rich Media & Galleries:** Zoomable high-quality images, SVG diagrams, and tables with Lightbox support.
5. **Callouts & Highlights:** Specialized UI boxes for "Pro Tips", "Important Formulas", and "Exam PYQ Alerts" to break up text monotonously.
6. **Glossary Tooltips:** Dotted underlines on complex jargon that reveal definitions on hover.

---

## 2. Architectural Approaches

To support rich media components within text, we need to upgrade our database schema and admin panel strategy. Currently, we rely on a single `articleHtml` string.

### Approach A: MDX / Custom Markdown (Recommended)
Instead of storing raw HTML, we store **Markdown (MDX)** in the database. MDX allows us to embed React components directly into text.

* **Schema Implications**: 
  * Add `contentMarkdown` (String) to the `Lesson` model (or migrate `articleHtml` to hold MDX).
* **Authoring Experience (Admin)**: 
  * Admins write content in markdown and insert components as JSX tags.
  * Example:
    ```markdown
    # Introduction to Biology
    Biology is the study of life.
    
    <Mindmap data="Root -> Animal, Plant, Fungi" />
    
    <Timeline>
      <TimelineItem year="1665" title="Cell discovered by Robert Hooke" />
    </Timeline>
    ```
* **Client Rendering**: 
  * Use a library like `next-mdx-remote` to parse the MDX string on the server/client and map `<Timeline>` and `<Mindmap>` to our custom React components.
* **Pros**: Extremely fast to build, highly flexible, developer-friendly.

### Approach B: Block-Based JSON Architecture (Enterprise CMS)
This is how modern platforms like Notion or MasterClass structure data. Instead of one big text field, a lesson is made of many individual "Blocks".

* **Schema Implications**:
  ```prisma
  model LessonBlock {
    id        String    @id @default(cuid())
    lessonId  String
    lesson    Lesson    @relation(fields: [lessonId], references: [id])
    type      BlockType // TEXT, IMAGE, TIMELINE, MINDMAP, MICRO_QUIZ, CALLOUT
    content   Json      // Payload depends on block type
    order     Int
  }
  enum BlockType { TEXT, IMAGE, TIMELINE, MINDMAP, MICRO_QUIZ, CALLOUT }
  ```
* **Authoring Experience (Admin)**:
  * Requires building a robust Drag-and-Drop block editor in `ssc-admin-web` (similar to Editor.js).
* **Client Rendering**:
  * The frontend maps over the `LessonBlock` array and renders the corresponding component based on `type`.
* **Pros**: Best long-term structure, prevents syntax errors from admins, enables granular analytics (e.g., "time spent on block 3").
* **Cons**: Massive initial engineering effort to build the block editor.

---

## 3. Implementation Roadmap

Assuming **Approach A (MDX)** is chosen as the MVP, here is the execution plan:

### Phase 1: Foundation
1. Install `next-mdx-remote` into `ssc-client`.
2. Update the `QuestionRenderer` or create a new `MdxRenderer` component that provides MDX scope.
3. Update `ssc-api` Prisma schema (if introducing a new `contentMarkdown` column).

### Phase 2: Core Components Library
Design and implement the following isolated React components in `ssc-client/components/ui/learning`:
1. `<Callout variant="info|warning|exam" />`
2. `<ZoomableImage src="..." caption="..." />`
3. `<Timeline />` and `<TimelineItem />`
4. `<MicroQuiz question="..." options={[]} correctAnswer="..." />`

### Phase 3: Advanced Visualizations
1. `<Mindmap />`: Integrate `mermaid.js` for automatic diagram generation from text syntax.

### Phase 4: Admin Integration
1. Add an MDX preview editor to `ssc-admin-web` so content creators can preview the rendered lesson before publishing.
2. Update the seed scripts (e.g., `seed-biology.ts`) to use MDX payloads.
