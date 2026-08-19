import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_StaticGk(prisma: PrismaClient) {
  console.log("Seeding Static GK...");
  const subject = await prisma.subject.upsert({
    where: { slug: "static-gk" },
    update: {},
    create: {
      name: "Static GK",
      slug: "static-gk",
      description: "Static General Knowledge",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "AWARDS & HONOURS", slug: "awards-honours", accessTier: AccessTier.FREE },
    { name: "BIOSPHERE RESERVES IN INDIA", slug: "biosphere-reserves-in-india", accessTier: AccessTier.FREE },
    { name: "BIRD SANCTUARIES IN INDIA", slug: "bird-sanctuaries-in-india", accessTier: AccessTier.FREE },
    { name: "BOOKS & AUTHORS", slug: "books-authors", accessTier: AccessTier.FREE },
    { name: "COUNTRIES AND THEIR PARLIAMENTS", slug: "countries-and-their-parliaments", accessTier: AccessTier.FREE },
    { name: "COUNTRIES-CAPITALS-CURRENCIES", slug: "countries-capitals-currencies", accessTier: AccessTier.FREE },
    { name: "CUP & TROPHIES RELATED TO SPORTS", slug: "cup-trophies-related-to-sports", accessTier: AccessTier.FREE },
    { name: "DAMS IN INDIA", slug: "dams-in-india", accessTier: AccessTier.FREE },
    { name: "DANCE FORMS IN INDIA", slug: "dance-forms-in-india", accessTier: AccessTier.FREE },
    { name: "FAMOUS INDIAN PERSONALITIES & THEIR NICKNAMES", slug: "famous-indian-personalities-their-nicknames", accessTier: AccessTier.FREE },
    { name: "FAMOUS TEMPLES IN INDIA", slug: "famous-temples-in-india", accessTier: AccessTier.FREE },
    { name: "FATHER OF DIFFERENT FIELDS", slug: "father-of-different-fields", accessTier: AccessTier.FREE },
    { name: "FESTIVALS OF DIFFERENT STATES OF INDIA", slug: "festivals-of-different-states-of-india", accessTier: AccessTier.FREE },
    { name: "FIRST IN INDIA (FEMALE)", slug: "first-in-india-female", accessTier: AccessTier.FREE },
    { name: "FIRST IN INDIA (MALE)", slug: "first-in-india-male", accessTier: AccessTier.FREE },
    { name: "HISTORICAL MONUMENTS IN INDIA", slug: "historical-monuments-in-india", accessTier: AccessTier.FREE },
    { name: "IMPORTANT DAYS (NATIONAL & INTERNATIONAL)", slug: "important-days-national-international", accessTier: AccessTier.FREE },
    { name: "IMPORTANT REPORTS PUBLISHED BY VARIOUS ORGANIZATIONS", slug: "important-reports-published-by-various-organizations", accessTier: AccessTier.FREE },
    { name: "INDIA'S NEIGHBOURING COUNTRIES", slug: "india-s-neighbouring-countries", accessTier: AccessTier.PRO },
    { name: "INDIAN PORTS", slug: "indian-ports", accessTier: AccessTier.PRO },
    { name: "INDIAN SPACE RESEARCH ORGANIZATIONS", slug: "indian-space-research-organizations", accessTier: AccessTier.PRO },
    { name: "INDIAN TIGER RESERVES", slug: "indian-tiger-reserves", accessTier: AccessTier.PRO },
    { name: "INTERNATIONAL BORDERS", slug: "international-borders", accessTier: AccessTier.PRO },
    { name: "INTERNATIONAL ORGANIZATION HEADQUARTERS", slug: "international-organization-headquarters", accessTier: AccessTier.PRO },
    { name: "INTERNATIONAL AIRPORTS IN INDIA", slug: "international-airports-in-india", accessTier: AccessTier.PRO },
    { name: "INDIAN CITIES THEIR NICKNAMES", slug: "indian-cities-their-nicknames", accessTier: AccessTier.PRO },
    { name: "LAKES IN INDIA", slug: "lakes-in-india", accessTier: AccessTier.PRO },
    { name: "LIST OF COUNTRIES AND THEIR NATIONAL GAMES", slug: "list-of-countries-and-their-national-games", accessTier: AccessTier.PRO },
    { name: "LIST OF IMPORTANT CITIES ON RIVER BANKS IN INDIA", slug: "list-of-important-cities-on-river-banks-in-india", accessTier: AccessTier.PRO },
    { name: "LIST OF PRESIDENTS OF INDIA", slug: "list-of-presidents-of-india", accessTier: AccessTier.PRO },
    { name: "LIST OF PRIME MINISTERS OF INDIA", slug: "list-of-prime-ministers-of-india", accessTier: AccessTier.PRO },
    { name: "LIST OF RBI GOVERNORS OF INDIA", slug: "list-of-rbi-governors-of-india", accessTier: AccessTier.PRO },
    { name: "MOUNTAIN PEAKS IN INDIA", slug: "mountain-peaks-in-india", accessTier: AccessTier.PRO },
    { name: "NATIONAL HIGHWAYS IN INDIA", slug: "national-highways-in-india", accessTier: AccessTier.PRO },
    { name: "NATIONAL PARKS IN INDIA", slug: "national-parks-in-india", accessTier: AccessTier.PRO },
    { name: "NOBEL PRIZE WINNERS OF INDIA", slug: "nobel-prize-winners-of-india", accessTier: AccessTier.PRO },
    { name: "POWER PLANTS IN INDIA", slug: "power-plants-in-india", accessTier: AccessTier.PRO },
    { name: "RAMSAR WETLAND SITES IN INDIA", slug: "ramsar-wetland-sites-in-india", accessTier: AccessTier.PRO },
    { name: "REVOLUTIONS IN INDIA", slug: "revolutions-in-india", accessTier: AccessTier.PRO },
    { name: "SPORTS TERMS", slug: "sports-terms", accessTier: AccessTier.PRO },
    { name: "STADIUMS IN INDIA", slug: "stadiums-in-india", accessTier: AccessTier.PRO },
    { name: "TRIBAL GROUPS IN INDIA", slug: "tribal-groups-in-india", accessTier: AccessTier.PRO },
    { name: "UNESCO WORLD HERITAGE SITES IN INDIA", slug: "unesco-world-heritage-sites-in-india", accessTier: AccessTier.PRO },
    { name: "WATERFALLS IN INDIA", slug: "waterfalls-in-india", accessTier: AccessTier.PRO },
    { name: "IMPORTANT RESEARCH INSTITUTES IN INDIA", slug: "important-research-institutes-in-india", accessTier: AccessTier.PRO },
    { name: "PREVIOUSLY ASKED QUESTIONS RELATED TO STATIC GK", slug: "previously-asked-questions-related-to-static-gk", accessTier: AccessTier.PRO },

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
