import { PrismaClient } from "@prisma/client";

export async function seed_EnglishComp(prisma: PrismaClient) {
  console.log("Seeding English Comprehension...");
  const subject = await prisma.subject.upsert({
    where: { slug: "english-comprehension" },
    update: {},
    create: {
      name: "English Comprehension",
      slug: "english-comprehension",
      description: "English Language and Comprehension",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Articles", slug: "articles" },
    { name: "Prepositions", slug: "prepositions" },
    { name: "Adjectives", slug: "adjectives" },
    { name: "Tenses", slug: "tenses" },
    { name: "Active and Passive Voice", slug: "active-and-passive-voice" },
    { name: "If Conditional Clause", slug: "if-conditional-clause" },
    { name: "Narration (Directindirect Speech)", slug: "narration-directindirect-speech" },
    { name: "Concord (Subject verb Agreement)", slug: "concord-subject-verb-agreement" },
    { name: "Simple, Compound & Complex Sentences", slug: "simple-compound-complex-sentences" },
    { name: "Reading Comprehension", slug: "reading-comprehension" },
    { name: "Cloze Text", slug: "cloze-text" },
    { name: "Paragraph Arrangement", slug: "paragraph-arrangement" },
    { name: "Synonyms", slug: "synonyms" },
    { name: "Antonyms", slug: "antonyms" },
    { name: "Homonyms", slug: "homonyms" },
    { name: "Errors", slug: "errors" },
    { name: "Idioms and Phrases", slug: "idioms-and-phrases" },
    { name: "One word substitutes", slug: "one-word-substitutes" },
    { name: "Spellings", slug: "spellings" },

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
