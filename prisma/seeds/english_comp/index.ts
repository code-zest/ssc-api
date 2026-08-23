import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_EnglishComp(prisma: PrismaClient) {
  console.log("Seeding English Comprehension...");
  const subject = await prisma.subject.upsert({
    where: { slug: "english-comprehension" },
    update: {},
    create: { 
      name: "English Comprehension",
      slug: "english-comprehension",
      description: "English Language and Comprehension",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Articles", slug: "articles", accessTier: AccessTier.FREE },
    { name: "Prepositions", slug: "prepositions", accessTier: AccessTier.FREE },
    { name: "Adjectives", slug: "adjectives", accessTier: AccessTier.FREE },
    { name: "Tenses", slug: "tenses", accessTier: AccessTier.FREE },
    { name: "Active and Passive Voice", slug: "active-and-passive-voice", accessTier: AccessTier.FREE },
    { name: "If Conditional Clause", slug: "if-conditional-clause", accessTier: AccessTier.FREE },
    { name: "Narration (Directindirect Speech)", slug: "narration-directindirect-speech", accessTier: AccessTier.FREE },
    { name: "Concord (Subject verb Agreement)", slug: "concord-subject-verb-agreement", accessTier: AccessTier.PRO },
    { name: "Simple, Compound & Complex Sentences", slug: "simple-compound-complex-sentences", accessTier: AccessTier.PRO },
    { name: "Reading Comprehension", slug: "reading-comprehension", accessTier: AccessTier.PRO },
    { name: "Cloze Text", slug: "cloze-text", accessTier: AccessTier.PRO },
    { name: "Paragraph Arrangement", slug: "paragraph-arrangement", accessTier: AccessTier.PRO },
    { name: "Synonyms", slug: "synonyms", accessTier: AccessTier.PRO },
    { name: "Antonyms", slug: "antonyms", accessTier: AccessTier.PRO },
    { name: "Homonyms", slug: "homonyms", accessTier: AccessTier.PRO },
    { name: "Errors", slug: "errors", accessTier: AccessTier.PRO },
    { name: "Idioms and Phrases", slug: "idioms-and-phrases", accessTier: AccessTier.PRO },
    { name: "One word substitutes", slug: "one-word-substitutes", accessTier: AccessTier.PRO },
    { name: "Spellings", slug: "spellings", accessTier: AccessTier.PRO },

  ];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    await prisma.chapter.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: chapter.slug } },
      update: { accessTier: chapter.accessTier, examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO"] },
      create: { 
        subjectId: subject.id,
        name: chapter.name,
        slug: chapter.slug,
        accessTier: chapter.accessTier,
         examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO"], 
      isActive: true,
      },
    });
  }
}
