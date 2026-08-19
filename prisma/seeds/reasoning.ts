import { PrismaClient } from "@prisma/client";

export async function seed_Reasoning(prisma: PrismaClient) {
  console.log("Seeding General Intelligence & Reasoning...");
  const subject = await prisma.subject.upsert({
    where: { slug: "general-intelligence-reasoning" },
    update: {},
    create: {
      name: "General Intelligence & Reasoning",
      slug: "general-intelligence-reasoning",
      description: "Verbal and Non-verbal Reasoning",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Number Series", slug: "number-series" },
    { name: "Wrong Number Series", slug: "wrong-number-series" },
    { name: "Letter Series", slug: "letter-series" },
    { name: "Number Analogy", slug: "number-analogy" },
    { name: "Letter Analogy", slug: "letter-analogy" },
    { name: "Verbal Analogy", slug: "verbal-analogy" },
    { name: "Number Classification", slug: "number-classification" },
    { name: "Letter Classification", slug: "letter-classification" },
    { name: "Verbal Classification", slug: "verbal-classification" },
    { name: "Alphabetical Order", slug: "alphabetical-order" },
    { name: "Sequence of words", slug: "sequence-of-words" },
    { name: "Inequalities", slug: "inequalities" },
    { name: "Ranking and Sequence", slug: "ranking-and-sequence" },
    { name: "Coding and Decoding", slug: "coding-and-decoding" },
    { name: "Blood Relations", slug: "blood-relations" },
    { name: "Directions", slug: "directions" },
    { name: "Data Sufficiency", slug: "data-sufficiency" },
    { name: "Mathematical Operations", slug: "mathematical-operations" },
    { name: "Missing Number in Figures", slug: "missing-number-in-figures" },
    { name: "Counting Figures", slug: "counting-figures" },
    { name: "Venn Diagrams", slug: "venn-diagrams" },
    { name: "Calendars", slug: "calendars" },
    { name: "Clocks", slug: "clocks" },
    { name: "Cubes and Dice", slug: "cubes-and-dice" },
    { name: "Puzzles", slug: "puzzles" },
    { name: "Syllogisms", slug: "syllogisms" },
    { name: "Critical Reasoning", slug: "critical-reasoning" },
    { name: "Non-verbal Reasoning-1", slug: "non-verbal-reasoning-1" },
    { name: "Non-verbal Reasoning-2", slug: "non-verbal-reasoning-2" },

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
