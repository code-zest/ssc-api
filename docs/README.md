# SSC API Documentation

Welcome to the documentation for the **SSC Exam Platform — API Repository**.
This folder contains Architecture Decision Records (ADRs), database schema decisions, security policies, and implementation plans for the backend API.

## 📂 Documentation Structure

To prevent documentation fatigue, we organize files by **Domain (Topic) → Chronological Order**.
Deprecated or superseded decisions are moved to the `archive/` folder.

---

### 🏛️ Architecture & Infrastructure
Decisions regarding the core API design, tech stack, folder structure, and middleware.

- [2026-07-26: Core API Architecture](architecture-and-infrastructure/2026-07-26-core-api-architecture/core-api-architecture.md)

---

### 🗄️ Database & Schema
All Prisma schema decisions, migration strategies, indexing, and relational design rationale.

- [2026-07-26: Initial Prisma Schema — Code Zest Academy](database-and-schema/2026-07-26-initial-schema/initial-schema.md)

---

### 🔐 Auth & Security
Authentication flows, JWT strategy, refresh token design, OTP, RBAC role definitions.

- [2026-07-26: Auth & Security Strategy](auth-and-security/2026-07-26-auth-strategy/auth-strategy.md)

---

### 🧪 Testing & QA
API testing strategies, integration tests, test DB setup, coverage targets.

*(No entries yet — add the first one when testing begins)*

---

### 📦 Product & Content Strategy
Decisions and documentation surrounding platform features, content structures, user personas, and personalization.

- [Content Management & Question Bank Architecture](product/content-management-and-qbank.md)
- [Growth & Conversion Strategy](product/growth-and-conversion-strategy.md)
- [Personalization API](product/personalization-api.md)
- [User Personas](product/user-personas.md)

---

### 📈 Progress & Planning
High-level roadmap, epic tracking, and phase status for the AI assistant and developers.

- [2026-07-26: Master Progress Tracker ← **START HERE**](progress-and-planning/2026-07-26-master-progress-tracker/progress-tracker.md)

---

### 📦 Archive
*(Superseded or deprecated decisions live in `docs/archive/`)*

---

## Rule of Thumb for Adding New Docs

1. Pick the correct domain folder (or create one if it doesn't fit).
2. Create a folder named `YYYY-MM-DD-short-topic-name`.
3. Add your markdown file inside.
4. Update this `README.md` to link to your new file.
5. Update the **Master Progress Tracker** if phases changed.
