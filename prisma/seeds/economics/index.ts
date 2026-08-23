import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_Economics(prisma: PrismaClient) {
  console.log("Seeding Economics...");
  const subject = await prisma.subject.upsert({
    where: { slug: "economics" },
    update: {},
    create: { 
      name: "Economics",
      slug: "economics",
      description: "Indian Economy and Policies",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Indian Economy", slug: "indian-economy", accessTier: AccessTier.FREE },
    { name: "National Income and accounting", slug: "national-income-and-accounting", accessTier: AccessTier.FREE },
    { name: "Planning sysytem in India", slug: "planning-sysytem-in-india", accessTier: AccessTier.FREE },
    { name: "Poverty and Unemployment", slug: "poverty-and-unemployment", accessTier: AccessTier.FREE },
    { name: "Agriculture Of Indian", slug: "agriculture-of-indian", accessTier: AccessTier.FREE },
    { name: "Industry and Industrial Policies", slug: "industry-and-industrial-policies", accessTier: AccessTier.PRO },
    { name: "Money and Banking", slug: "money-and-banking", accessTier: AccessTier.PRO },
    { name: "Foreign Trade and Balance of Payment", slug: "foreign-trade-and-balance-of-payment", accessTier: AccessTier.PRO },
    { name: "Liberalisation, Privatisation & Globalisation", slug: "liberalisation-privatisation-globalisation", accessTier: AccessTier.PRO },
    { name: "Stock Market", slug: "stock-market", accessTier: AccessTier.PRO },
    { name: "Budgets and Economic Surveys", slug: "budgets-and-economic-surveys", accessTier: AccessTier.PRO },
    { name: "Central Government Schemes", slug: "central-government-schemes", accessTier: AccessTier.PRO },
    { name: "Inflation In India", slug: "inflation-in-india", accessTier: AccessTier.PRO },
    { name: "Important Committee In Economics", slug: "important-committee-in-economics", accessTier: AccessTier.PRO },

  ];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    await prisma.chapter.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: chapter.slug } },
      update: { accessTier: chapter.accessTier, examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"] },
      create: { 
        subjectId: subject.id,
        name: chapter.name,
        slug: chapter.slug,
        accessTier: chapter.accessTier,
         examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
      },
    });
  }
}
