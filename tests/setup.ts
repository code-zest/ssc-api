process.env.RAZORPAY_KEY_ID = 'test_key';
process.env.RAZORPAY_KEY_SECRET = 'test_secret';

import { prisma } from '../src/config/prisma';
import { afterAll } from '@jest/globals';

afterAll(async () => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='test'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"test"."${name}"`)
    .join(', ');

  try {
    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    }
  } catch (error) {
    console.error('Error cleaning up test database:', error);
  }

  await prisma.$disconnect();
});
