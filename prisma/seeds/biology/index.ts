import { PrismaClient } from "@prisma/client";
import { seedBiologyIntroduction } from "./introduction";
import { seedCellBiology } from "./cell-biology";

export async function seedBiology(prisma: PrismaClient) {
  console.log("Seeding Subject: Biology (CGL)...");

  const subject = await prisma.subject.upsert({
    where: { slug: "biology-cgl" },
    update: {},
    create: {
      name: "Biology (CGL)",
      slug: "biology-cgl",
      description: "General Science - Biology for SSC CGL",
      examTypes: ["SSC_CGL"],
      isActive: true,
    }
  });

  const chapterTitles = [
    "Introduction",
    "Skeletal System",
    "Blood Circulation",
    "Digestive System",
    "Respiratory System",
    "Excretory System",
    "Nervous System",
    "Endocrine System",
    "Reproductive System",
    "Sensory Organs",
    "Nutrition",
    "Pathology",
    "Cell Biology",
    "Classification of Living Organisms",
    "Plant Morphology",
    "Photosynthesis",
    "Respiration in Plants",
    "Excretion in Plants",
    "Phyto Hormones",
    "Reproduction in Plants",
    "Economical Importance of Plants",
    "Economical Importance of Animals",
    "Recent Trends in Biology",
    "Environmental Science"
  ];

  const createdChapters: Record<string, string> = {};

  for (let i = 0; i < chapterTitles.length; i++) {
    const name = chapterTitles[i];
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const chapter = await prisma.chapter.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug } },
      update: { order: i + 1 },
      create: {
        subjectId: subject.id,
        name,
        slug,
        description: `Topics on ${name}`,
        isActive: true,
        order: i + 1
      }
    });
    createdChapters[slug] = chapter.id;
  }

  const chapterIntroId = createdChapters["introduction"];
  const chapter1Id = createdChapters["cell-biology"];

  await seedBiologyIntroduction(prisma, subject.id, chapterIntroId);
  await seedCellBiology(prisma, subject.id, chapter1Id);

  console.log("Biology Seed complete.");
}
