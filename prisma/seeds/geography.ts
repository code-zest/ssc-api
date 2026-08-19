import { PrismaClient, AccessTier } from "@prisma/client";

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
    { name: "Introduction, Branches of geography", slug: "introduction-branches-of-geography", accessTier: AccessTier.FREE },
    { name: "Solar System", slug: "solar-system", accessTier: AccessTier.FREE },
    { name: "Atmosphere", slug: "atmosphere", accessTier: AccessTier.FREE },
    { name: "Internal Structure of the earth", slug: "internal-structure-of-the-earth", accessTier: AccessTier.FREE },
    { name: "Latitudes and Longitudes", slug: "latitudes-and-longitudes", accessTier: AccessTier.FREE },
    { name: "Rotation and Revolution", slug: "rotation-and-revolution", accessTier: AccessTier.FREE },
    { name: "GrassLands", slug: "grasslands", accessTier: AccessTier.FREE },
    { name: "Oceans", slug: "oceans", accessTier: AccessTier.FREE },
    { name: "Earthquakes and Volcanoes", slug: "earthquakes-and-volcanoes", accessTier: AccessTier.PRO },
    { name: "Continents of World", slug: "continents-of-world", accessTier: AccessTier.PRO },
    { name: "India's Location and Extent", slug: "india-s-location-and-extent", accessTier: AccessTier.PRO },
    { name: "Physiography of India", slug: "physiography-of-india", accessTier: AccessTier.PRO },
    { name: "River System / Drainage System", slug: "river-system-drainage-system", accessTier: AccessTier.PRO },
    { name: "Climate of India", slug: "climate-of-india", accessTier: AccessTier.PRO },
    { name: "Indian Soils", slug: "indian-soils", accessTier: AccessTier.PRO },
    { name: "Natural Vegetation", slug: "natural-vegetation", accessTier: AccessTier.PRO },
    { name: "Agriculture", slug: "agriculture", accessTier: AccessTier.PRO },
    { name: "Industries", slug: "industries", accessTier: AccessTier.PRO },
    { name: "Minerals", slug: "minerals", accessTier: AccessTier.PRO },
    { name: "Transportation", slug: "transportation", accessTier: AccessTier.PRO },
    { name: "Census / Population Census 2011", slug: "census-population-census-2011", accessTier: AccessTier.PRO },

  ];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    await prisma.chapter.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: chapter.slug } },
      update: { accessTier: chapter.accessTier },
      create: {
        subjectId: subject.id,
        name: chapter.name,
        slug: chapter.slug,
        accessTier: chapter.accessTier,
        isActive: true,
      },
    });
  }
}
