import { PrismaClient } from "@prisma/client";

export async function seed_Geography(prisma: PrismaClient) {
  console.log("Seeding Geography...");
  const subject = await prisma.subject.upsert({
    where: { slug: "geography" },
    update: {},
    create: {
      name: "Geography",
      slug: "geography",
      description: "World and Indian Geography",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Introduction, Branches of geography", slug: "introduction-branches-of-geography" },
    { name: "Solar System", slug: "solar-system" },
    { name: "Atmosphere", slug: "atmosphere" },
    { name: "Internal Structure of the earth", slug: "internal-structure-of-the-earth" },
    { name: "Latitudes and Longitudes", slug: "latitudes-and-longitudes" },
    { name: "Rotation and Revolution", slug: "rotation-and-revolution" },
    { name: "GrassLands", slug: "grasslands" },
    { name: "Oceans", slug: "oceans" },
    { name: "Earthquakes and Volcanoes", slug: "earthquakes-and-volcanoes" },
    { name: "Continents of World", slug: "continents-of-world" },
    { name: "India's Location and Extent", slug: "india-s-location-and-extent" },
    { name: "Physiography of India", slug: "physiography-of-india" },
    { name: "River System / Drainage System", slug: "river-system-drainage-system" },
    { name: "Climate of India", slug: "climate-of-india" },
    { name: "Indian Soils", slug: "indian-soils" },
    { name: "Natural Vegetation", slug: "natural-vegetation" },
    { name: "Agriculture", slug: "agriculture" },
    { name: "Industries", slug: "industries" },
    { name: "Minerals", slug: "minerals" },
    { name: "Transportation", slug: "transportation" },
    { name: "Census / Population Census 2011", slug: "census-population-census-2011" },

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
