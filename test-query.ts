import { prisma } from './src/config/prisma';
async function main() {
  const c = await prisma.chapter.findMany();
  console.log(JSON.stringify(c, null, 2));
}
main().finally(() => prisma.$disconnect());
