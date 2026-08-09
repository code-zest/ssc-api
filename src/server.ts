import app from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { logger } from './config/logger';

// ─── Start Server ─────────────────────────────────────────────────────────────
const server = app.listen(env.PORT, async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected ✅');
    logger.info(`Server running → http://localhost:${env.PORT}  [${env.NODE_ENV}] 🚀`);
    logger.info(`Health check  → http://localhost:${env.PORT}/health 🩺`);
  } catch (error) {
    logger.error('Database connection failed', { error });
    process.exit(1);
  }
});

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
async function shutdown(signal: string) {
  logger.info(`${signal} received — shutting down gracefully...`);

  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Database disconnected. Server closed. Goodbye. 👋');
    process.exit(0);
  });

  // Force exit after 10 s if graceful shutdown hangs
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

// ─── Unhandled Rejections / Exceptions ────────────────────────────────────────
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception — shutting down', { error });
  process.exit(1);
});
