import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_Physics(prisma: PrismaClient) {
  console.log("Seeding Physics...");
  const subject = await prisma.subject.upsert({
    where: { slug: "physics" },
    update: {},
    create: { 
      name: "Physics",
      slug: "physics",
      description: "General Science - Physics",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Sound Energy", slug: "sound-energy", accessTier: AccessTier.FREE },
    { name: "Light Energy", slug: "light-energy", accessTier: AccessTier.FREE },
    { name: "Electrical Energy", slug: "electrical-energy", accessTier: AccessTier.FREE },
    { name: "Mechanical Energy", slug: "mechanical-energy", accessTier: AccessTier.FREE },
    { name: "Units and dimensions", slug: "units-and-dimensions", accessTier: AccessTier.PRO },
    { name: "Our Universe", slug: "our-universe", accessTier: AccessTier.PRO },
    { name: "Heat Energy", slug: "heat-energy", accessTier: AccessTier.PRO },
    { name: "Magnetism", slug: "magnetism", accessTier: AccessTier.PRO },
    { name: "Fluids - Pressures", slug: "fluids-pressures", accessTier: AccessTier.PRO },
    { name: "Modern Physics", slug: "modern-physics", accessTier: AccessTier.PRO },

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
