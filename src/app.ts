import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import cookieParser from 'cookie-parser';

import { env } from './config/env';
import { redis, isRedisReady } from './config/redis';
import { httpLogger } from './middleware/httpLogger';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import authRouter from './modules/auth/auth.routes';

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

// ─── Security Headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
      // Allow requests with no origin (Postman, mobile apps, server-to-server)
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    credentials: true, // Required for httpOnly refresh-token cookie
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─── HTTP Request Logging (morgan → winston) ──────────────────────────────────
app.use(httpLogger);

// ─── Global Rate Limiting ─────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased for SPA usage (auth has its own strict limiters)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again in 15 minutes.',
  },
  store: isRedisReady() ? new RedisStore({ sendCommand: (...args: string[]) => (redis as any).call(...args) }) : undefined,
});
app.use(globalLimiter);

// ─── Body Parsing + Cookie Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser()); // Required for reading httpOnly refresh-token cookie

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ssc-api',
    env: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use(`/api/${env.API_VERSION}/auth`, authRouter);     // Phase 2 ✅

// Uncomment as each phase is implemented:
// Phase 3 — Users
import usersRouter from './modules/users/users.routes';
app.use(`/api/${env.API_VERSION}/users`, usersRouter);
//
// Phase 4 — Subjects / Chapters / Lessons
import subjectsRouter  from './modules/subjects/subjects.routes';
import chaptersRouter  from './modules/chapters/chapters.routes';
import lessonsRouter   from './modules/lessons/lessons.routes';
app.use(`/api/${env.API_VERSION}/subjects`,  subjectsRouter);
app.use(`/api/${env.API_VERSION}/chapters`,  chaptersRouter);
app.use(`/api/${env.API_VERSION}/lessons`,   lessonsRouter);
//
// Phase 5 — Questions
import questionsRouter from './modules/questions/questions.routes';
app.use(`/api/${env.API_VERSION}/questions`, questionsRouter);
//
// Phase 6 — Practice Sets / Mock Tests
import practiceSetsRouter from './modules/practiceSets/practiceSets.routes';
import mockTestsRouter from './modules/mockTests/mockTests.routes';
app.use(`/api/${env.API_VERSION}/practice-sets`, practiceSetsRouter);
app.use(`/api/${env.API_VERSION}/mock-tests`, mockTestsRouter);
//
// Phase 7 — Attempts + Scoring
import attemptsRouter from './modules/attempts/attempts.routes';
app.use(`/api/${env.API_VERSION}/attempts`, attemptsRouter);
//
// Phase 8 — Analytics / Leaderboard
import analyticsRouter from './modules/analytics/analytics.routes';
app.use(`/api/${env.API_VERSION}/analytics`, analyticsRouter);

// Phase 9 — Uploads (R2)
import uploadRouter from './modules/upload/upload.routes';
app.use(`/api/${env.API_VERSION}/upload`, uploadRouter);

// Phase 10 — Payments (IAP)
import paymentsRouter from './modules/payments/payments.routes';
import productsRouter from './modules/products/products.routes';
app.use(`/api/${env.API_VERSION}/payments`, paymentsRouter);
app.use(`/api/${env.API_VERSION}/products`, productsRouter);

// Phase 11 — Feedback (Testimonials & Issues)
import feedbackRouter from './modules/feedback/feedback.routes';
app.use(`/api/${env.API_VERSION}/feedback`, feedbackRouter);

// Phase 12 — CMS (Categories & Articles)
import categoriesRouter from './modules/categories/categories.routes';
import articlesRouter from './modules/articles/articles.routes';
app.use(`/api/${env.API_VERSION}/categories`, categoriesRouter);
app.use(`/api/${env.API_VERSION}/articles`, articlesRouter);

// ─── Fallback ─────────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
