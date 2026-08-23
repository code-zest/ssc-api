import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_Reasoning(prisma: PrismaClient) {
  console.log("Seeding General Intelligence & Reasoning...");
  const subject = await prisma.subject.upsert({
    where: { slug: "general-intelligence-reasoning" },
    update: {},
    create: { 
      name: "General Intelligence & Reasoning",
      slug: "general-intelligence-reasoning",
      description: "Verbal and Non-verbal Reasoning",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Number Series", slug: "number-series", accessTier: AccessTier.FREE },
    { name: "Wrong Number Series", slug: "wrong-number-series", accessTier: AccessTier.FREE },
    { name: "Letter Series", slug: "letter-series", accessTier: AccessTier.FREE },
    { name: "Number Analogy", slug: "number-analogy", accessTier: AccessTier.FREE },
    { name: "Letter Analogy", slug: "letter-analogy", accessTier: AccessTier.FREE },
    { name: "Verbal Analogy", slug: "verbal-analogy", accessTier: AccessTier.FREE },
    { name: "Number Classification", slug: "number-classification", accessTier: AccessTier.FREE },
    { name: "Letter Classification", slug: "letter-classification", accessTier: AccessTier.FREE },
    { name: "Verbal Classification", slug: "verbal-classification", accessTier: AccessTier.FREE },
    { name: "Alphabetical Order", slug: "alphabetical-order", accessTier: AccessTier.FREE },
    { name: "Sequence of words", slug: "sequence-of-words", accessTier: AccessTier.FREE },
    { name: "Inequalities", slug: "inequalities", accessTier: AccessTier.PRO },
    { name: "Ranking and Sequence", slug: "ranking-and-sequence", accessTier: AccessTier.PRO },
    { name: "Coding and Decoding", slug: "coding-and-decoding", accessTier: AccessTier.PRO },
    { name: "Blood Relations", slug: "blood-relations", accessTier: AccessTier.PRO },
    { name: "Directions", slug: "directions", accessTier: AccessTier.PRO },
    { name: "Data Sufficiency", slug: "data-sufficiency", accessTier: AccessTier.PRO },
    { name: "Mathematical Operations", slug: "mathematical-operations", accessTier: AccessTier.PRO },
    { name: "Missing Number in Figures", slug: "missing-number-in-figures", accessTier: AccessTier.PRO },
    { name: "Counting Figures", slug: "counting-figures", accessTier: AccessTier.PRO },
    { name: "Venn Diagrams", slug: "venn-diagrams", accessTier: AccessTier.PRO },
    { name: "Calendars", slug: "calendars", accessTier: AccessTier.PRO },
    { name: "Clocks", slug: "clocks", accessTier: AccessTier.PRO },
    { name: "Cubes and Dice", slug: "cubes-and-dice", accessTier: AccessTier.PRO },
    { name: "Puzzles", slug: "puzzles", accessTier: AccessTier.PRO },
    { name: "Syllogisms", slug: "syllogisms", accessTier: AccessTier.PRO },
    { name: "Critical Reasoning", slug: "critical-reasoning", accessTier: AccessTier.PRO },
    { name: "Non-verbal Reasoning-1", slug: "non-verbal-reasoning-1", accessTier: AccessTier.PRO },
    { name: "Non-verbal Reasoning-2", slug: "non-verbal-reasoning-2", accessTier: AccessTier.PRO },

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
