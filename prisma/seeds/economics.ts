import { PrismaClient } from "@prisma/client";

export async function seed_Economics(prisma: PrismaClient) {
  console.log("Seeding Economics...");
  const subject = await prisma.subject.upsert({
    where: { slug: "economics" },
    update: {},
    create: {
      name: "Economics",
      slug: "economics",
      description: "Indian Economy and Policies",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Indian Economy", slug: "indian-economy" },
    { name: "National Income and accounting", slug: "national-income-and-accounting" },
    { name: "Planning sysytem in India", slug: "planning-sysytem-in-india" },
    { name: "Poverty and Unemployment", slug: "poverty-and-unemployment" },
    { name: "Agriculture Of Indian", slug: "agriculture-of-indian" },
    { name: "Industry and Industrial Policies", slug: "industry-and-industrial-policies" },
    { name: "Money and Banking", slug: "money-and-banking" },
    { name: "Foreign Trade and Balance of Payment", slug: "foreign-trade-and-balance-of-payment" },
    { name: "Liberalisation, Privatisation & Globalisation", slug: "liberalisation-privatisation-globalisation" },
    { name: "Stock Market", slug: "stock-market" },
    { name: "Budgets and Economic Surveys", slug: "budgets-and-economic-surveys" },
    { name: "Central Government Schemes", slug: "central-government-schemes" },
    { name: "Inflation In India", slug: "inflation-in-india" },
    { name: "Important Committee In Economics", slug: "important-committee-in-economics" },

  ];

  for (const chapter of chapters) {
    await prisma.chapter.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: chapter.slug } },
      update: {},
      create: {
        subjectId: subject.id,
        name: chapter.name,
        slug: chapter.slug,
        isActive: true,
      },
    });
  }
}
