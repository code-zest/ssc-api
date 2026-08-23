import { PrismaClient, AccessTier } from "@prisma/client";
import { seedGeographyLocationAndExtent } from "./location-and-extent";
import { seedGeographyPhysiographyOfIndia } from "./physiography-of-india";
import { seedGeographyClimateOfIndia } from "./climate-of-india";
import { seedGeographyMinerals } from "./minerals";
import { seedGeographyRiverSystem } from "./river-system";

export async function seed_Geography(prisma: PrismaClient) {
  console.log("Seeding Geography...");
  const subject = await prisma.subject.upsert({
    where: { slug: "geography" },
    update: {},
    create: { 
      name: "Geography",
      slug: "geography",
      description: "World and Indian Geography",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
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

  const locationChapter = await prisma.chapter.findUnique({
    where: { subjectId_slug: { subjectId: subject.id, slug: "india-s-location-and-extent" } },
  });
  if (locationChapter) {
    await seedGeographyLocationAndExtent(prisma, subject.id, locationChapter.id);
  }

  const physiographyChapter = await prisma.chapter.findUnique({
    where: { subjectId_slug: { subjectId: subject.id, slug: "physiography-of-india" } },
  });
  if (physiographyChapter) {
    await seedGeographyPhysiographyOfIndia(prisma, subject.id, physiographyChapter.id);
  }

  const climateChapter = await prisma.chapter.findUnique({
    where: { subjectId_slug: { subjectId: subject.id, slug: "climate-of-india" } },
  });
  if (climateChapter) {
    await seedGeographyClimateOfIndia(prisma, subject.id, climateChapter.id);
  }

  const mineralsChapter = await prisma.chapter.findUnique({
    where: { subjectId_slug: { subjectId: subject.id, slug: "minerals" } },
  });
  if (mineralsChapter) {
    await seedGeographyMinerals(prisma, subject.id, mineralsChapter.id);
  }

  const riverSystemChapter = await prisma.chapter.findUnique({
    where: { subjectId_slug: { subjectId: subject.id, slug: "river-system-drainage-system" } },
  });
  if (riverSystemChapter) {
    await seedGeographyRiverSystem(prisma, subject.id, riverSystemChapter.id);
  }
}
