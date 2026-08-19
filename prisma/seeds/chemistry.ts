import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_Chemistry(prisma: PrismaClient) {
  console.log("Seeding Chemistry...");
  const subject = await prisma.subject.upsert({
    where: { slug: "chemistry" },
    update: {},
    create: { 
      name: "Chemistry",
      slug: "chemistry",
      description: "General Science - Chemistry",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Introduction to the Chemistry", slug: "introduction-to-the-chemistry", accessTier: AccessTier.FREE },
    { name: "Atomic Structure", slug: "atomic-structure", accessTier: AccessTier.FREE },
    { name: "Classification of elements", slug: "classification-of-elements", accessTier: AccessTier.FREE },
    { name: "Chemical Reactions and their equations", slug: "chemical-reactions-and-their-equations", accessTier: AccessTier.FREE },
    { name: "Chemical Properties of Metals", slug: "chemical-properties-of-metals", accessTier: AccessTier.FREE },
    { name: "Elements in Chemistry and Carbon Chemistry", slug: "elements-in-chemistry-and-carbon-chemistry", accessTier: AccessTier.FREE },
    { name: "Alloys", slug: "alloys", accessTier: AccessTier.FREE },
    { name: "Scientist and their discoveries", slug: "scientist-and-their-discoveries", accessTier: AccessTier.PRO },
    { name: "Chemicals and their uses", slug: "chemicals-and-their-uses", accessTier: AccessTier.PRO },
    { name: "Acids and their bases", slug: "acids-and-their-bases", accessTier: AccessTier.PRO },
    { name: "Combustible Gases-Uses", slug: "combustible-gases-uses", accessTier: AccessTier.PRO },
    { name: "Plastic Manufacturing", slug: "plastic-manufacturing", accessTier: AccessTier.PRO },
    { name: "Chemicals uses in daily life", slug: "chemicals-uses-in-daily-life", accessTier: AccessTier.PRO },
    { name: "Elements and their importance", slug: "elements-and-their-importance", accessTier: AccessTier.PRO },
    { name: "Mixtures and their uses", slug: "mixtures-and-their-uses", accessTier: AccessTier.PRO },
    { name: "Industries and their diseases", slug: "industries-and-their-diseases", accessTier: AccessTier.PRO },
    { name: "Chemical bonds", slug: "chemical-bonds", accessTier: AccessTier.PRO },
    { name: "Solutions", slug: "solutions", accessTier: AccessTier.PRO },

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
