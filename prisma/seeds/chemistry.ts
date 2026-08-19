import { PrismaClient } from "@prisma/client";

export async function seed_Chemistry(prisma: PrismaClient) {
  console.log("Seeding Chemistry...");
  const subject = await prisma.subject.upsert({
    where: { slug: "chemistry" },
    update: {},
    create: {
      name: "Chemistry",
      slug: "chemistry",
      description: "General Science - Chemistry",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Introduction to the Chemistry", slug: "introduction-to-the-chemistry" },
    { name: "Atomic Structure", slug: "atomic-structure" },
    { name: "Classification of elements", slug: "classification-of-elements" },
    { name: "Chemical Reactions and their equations", slug: "chemical-reactions-and-their-equations" },
    { name: "Chemical Properties of Metals", slug: "chemical-properties-of-metals" },
    { name: "Elements in Chemistry and Carbon Chemistry", slug: "elements-in-chemistry-and-carbon-chemistry" },
    { name: "Alloys", slug: "alloys" },
    { name: "Scientist and their discoveries", slug: "scientist-and-their-discoveries" },
    { name: "Chemicals and their uses", slug: "chemicals-and-their-uses" },
    { name: "Acids and their bases", slug: "acids-and-their-bases" },
    { name: "Combustible Gases-Uses", slug: "combustible-gases-uses" },
    { name: "Plastic Manufacturing", slug: "plastic-manufacturing" },
    { name: "Chemicals uses in daily life", slug: "chemicals-uses-in-daily-life" },
    { name: "Elements and their importance", slug: "elements-and-their-importance" },
    { name: "Mixtures and their uses", slug: "mixtures-and-their-uses" },
    { name: "Industries and their diseases", slug: "industries-and-their-diseases" },
    { name: "Chemical bonds", slug: "chemical-bonds" },
    { name: "Solutions", slug: "solutions" },

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
