import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env';

const softDeleteModels = [
  'User', 'TargetExam', 'Subject', 'Chapter', 'Lesson', 
  'Question', 'PracticeSet', 'MockTest', 'TestAttempt', 
  'Enrollment', 'Purchase', 'Article', 'Feedback'
];

// Prevent multiple Prisma Client instances in development (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  const client = new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (model && softDeleteModels.includes(model)) {
            const clientProp = model.charAt(0).toLowerCase() + model.slice(1);
            
            if (operation === 'findUnique' || operation === 'findFirst' || operation === 'findMany' || operation === 'count') {
              if (operation === 'findUnique') {
                const result = await query(args);
                if (result && (result as any).deletedAt !== null) {
                  return null;
                }
                return result;
              } else {
                args.where = { deletedAt: null, ...args.where };
                return query(args);
              }
            }
            if (operation === 'delete') {
              return (client as any)[clientProp].update({
                where: (args as any).where,
                data: { deletedAt: new Date() },
              });
            }
            if (operation === 'deleteMany') {
              return (client as any)[clientProp].updateMany({
                where: (args as any).where,
                data: { deletedAt: new Date() },
              });
            }
          }
          return query(args);
        }
      }
    }
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
