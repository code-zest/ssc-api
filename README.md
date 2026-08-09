# SSC API

The backend REST API for the SSC Competitive Exam Education Platform. 
Built using a Domain-Driven Modular Monolith architecture.

## 🚀 Features
- **Robust Authentication:** JWT-based auth with secure cookies, roles (`STUDENT`, `ADMIN`, `SUPER_ADMIN`).
- **Domain Modules:** Separate logic for Subjects, Chapters, Lessons, Practice Sets, and Mock Tests.
- **Payments:** Razorpay integration and webhook handling for `PRO` and `EXCLUSIVE` content unlocking.
- **Progress Tracking:** User attempt tracking and scoring analytics.

## 🛠️ Tech Stack
- **Framework:** Express.js (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, CORS, Express Rate Limit

## 📋 Prerequisites
- **Node.js**: >= 18.x
- **PostgreSQL**: >= 14.x
- **npm** or **yarn**

## ⚙️ Environment Variables
Copy `.env.example` to `.env`. Key variables include:

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | The port the server runs on (e.g. 5000) | No (defaults to 5000) |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret for signing tokens | Yes |
| `RAZORPAY_KEY_ID` | Razorpay Key ID | Yes (for payments) |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret | Yes (for payments) |

## 🚀 Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Setup Database**
```bash
npx prisma generate
npx prisma db push
```

3. **Seed the Database**
Populate the database with initial admin users, demo data, and subjects (like Biology).
```bash
npm run db:seed
```

4. **Start Development Server**
```bash
npm run dev
```

## 📜 Available Scripts
- `npm run dev` - Starts the development server with hot-reload (ts-node-dev).
- `npm run build` - Compiles TypeScript to JavaScript in the `dist` folder.
- `npm start` - Runs the compiled application.
- `npm run typecheck` - Validates TypeScript types without emitting files.
- `npm run db:seed` - Seeds the Prisma database.

## 📂 Project Structure
```text
ssc-api/
├── prisma/             # Database schema and seed files
├── src/
│   ├── config/         # App configuration and environment variables
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Express middlewares (auth, validation, errors)
│   ├── routes/         # API route definitions
│   ├── services/       # Core business logic
│   ├── types/          # Global TypeScript interfaces
│   └── utils/          # Helpers (AppError, catchAsync, etc.)
└── package.json
```

## 📚 Documentation
- [Core API Architecture](docs/architecture-and-infrastructure/2026-07-26-core-api-architecture/core-api-architecture.md)
- [Database Schema](docs/database-and-schema/2026-07-26-database-schema/database-schema.md)
- [Progress Tracker](docs/progress-and-planning/2026-07-26-master-progress-tracker/progress-tracker.md)

## 🤖 AI Assistant Guidelines
Please refer to [GEMINI.md](GEMINI.md) and [CLAUDE.md](CLAUDE.md) for strict architectural and typing rules (e.g., no `any` types allowed).
