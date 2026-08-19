import { PrismaClient } from "@prisma/client";

export async function seed_Physics(prisma: PrismaClient) {
  console.log("Seeding Physics...");
  const subject = await prisma.subject.upsert({
    where: { slug: "physics" },
    update: {},
    create: {
      name: "Physics",
      slug: "physics",
      description: "General Science - Physics",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Sound Energy", slug: "sound-energy" },
    { name: "Light Energy", slug: "light-energy" },
    { name: "Electrical Energy", slug: "electrical-energy" },
    { name: "Mechanical Energy", slug: "mechanical-energy" },
    { name: "Units and dimensions", slug: "units-and-dimensions" },
    { name: "Our Universe", slug: "our-universe" },
    { name: "Heat Energy", slug: "heat-energy" },
    { name: "Magnetism", slug: "magnetism" },
    { name: "Fluids - Pressures", slug: "fluids-pressures" },
    { name: "Modern Physics", slug: "modern-physics" },

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
