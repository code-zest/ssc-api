import { PrismaClient } from "@prisma/client";

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
    { name: "AWARDS & HONOURS", slug: "awards-honours" },
    { name: "BIOSPHERE RESERVES IN INDIA", slug: "biosphere-reserves-in-india" },
    { name: "BIRD SANCTUARIES IN INDIA", slug: "bird-sanctuaries-in-india" },
    { name: "BOOKS & AUTHORS", slug: "books-authors" },
    { name: "COUNTRIES AND THEIR PARLIAMENTS", slug: "countries-and-their-parliaments" },
    { name: "COUNTRIES-CAPITALS-CURRENCIES", slug: "countries-capitals-currencies" },
    { name: "CUP & TROPHIES RELATED TO SPORTS", slug: "cup-trophies-related-to-sports" },
    { name: "DAMS IN INDIA", slug: "dams-in-india" },
    { name: "DANCE FORMS IN INDIA", slug: "dance-forms-in-india" },
    { name: "FAMOUS INDIAN PERSONALITIES & THEIR NICKNAMES", slug: "famous-indian-personalities-their-nicknames" },
    { name: "FAMOUS TEMPLES IN INDIA", slug: "famous-temples-in-india" },
    { name: "FATHER OF DIFFERENT FIELDS", slug: "father-of-different-fields" },
    { name: "FESTIVALS OF DIFFERENT STATES OF INDIA", slug: "festivals-of-different-states-of-india" },
    { name: "FIRST IN INDIA (FEMALE)", slug: "first-in-india-female" },
    { name: "FIRST IN INDIA (MALE)", slug: "first-in-india-male" },
    { name: "HISTORICAL MONUMENTS IN INDIA", slug: "historical-monuments-in-india" },
    { name: "IMPORTANT DAYS (NATIONAL & INTERNATIONAL)", slug: "important-days-national-international" },
    { name: "IMPORTANT REPORTS PUBLISHED BY VARIOUS ORGANIZATIONS", slug: "important-reports-published-by-various-organizations" },
    { name: "INDIA'S NEIGHBOURING COUNTRIES", slug: "india-s-neighbouring-countries" },
    { name: "INDIAN PORTS", slug: "indian-ports" },
    { name: "INDIAN SPACE RESEARCH ORGANIZATIONS", slug: "indian-space-research-organizations" },
    { name: "INDIAN TIGER RESERVES", slug: "indian-tiger-reserves" },
    { name: "INTERNATIONAL BORDERS", slug: "international-borders" },
    { name: "INTERNATIONAL ORGANIZATION HEADQUARTERS", slug: "international-organization-headquarters" },
    { name: "INTERNATIONAL AIRPORTS IN INDIA", slug: "international-airports-in-india" },
    { name: "INDIAN CITIES THEIR NICKNAMES", slug: "indian-cities-their-nicknames" },
    { name: "LAKES IN INDIA", slug: "lakes-in-india" },
    { name: "LIST OF COUNTRIES AND THEIR NATIONAL GAMES", slug: "list-of-countries-and-their-national-games" },
    { name: "LIST OF IMPORTANT CITIES ON RIVER BANKS IN INDIA", slug: "list-of-important-cities-on-river-banks-in-india" },
    { name: "LIST OF PRESIDENTS OF INDIA", slug: "list-of-presidents-of-india" },
    { name: "LIST OF PRIME MINISTERS OF INDIA", slug: "list-of-prime-ministers-of-india" },
    { name: "LIST OF RBI GOVERNORS OF INDIA", slug: "list-of-rbi-governors-of-india" },
    { name: "MOUNTAIN PEAKS IN INDIA", slug: "mountain-peaks-in-india" },
    { name: "NATIONAL HIGHWAYS IN INDIA", slug: "national-highways-in-india" },
    { name: "NATIONAL PARKS IN INDIA", slug: "national-parks-in-india" },
    { name: "NOBEL PRIZE WINNERS OF INDIA", slug: "nobel-prize-winners-of-india" },
    { name: "POWER PLANTS IN INDIA", slug: "power-plants-in-india" },
    { name: "RAMSAR WETLAND SITES IN INDIA", slug: "ramsar-wetland-sites-in-india" },
    { name: "REVOLUTIONS IN INDIA", slug: "revolutions-in-india" },
    { name: "SPORTS TERMS", slug: "sports-terms" },
    { name: "STADIUMS IN INDIA", slug: "stadiums-in-india" },
    { name: "TRIBAL GROUPS IN INDIA", slug: "tribal-groups-in-india" },
    { name: "UNESCO WORLD HERITAGE SITES IN INDIA", slug: "unesco-world-heritage-sites-in-india" },
    { name: "WATERFALLS IN INDIA", slug: "waterfalls-in-india" },
    { name: "IMPORTANT RESEARCH INSTITUTES IN INDIA", slug: "important-research-institutes-in-india" },
    { name: "PREVIOUSLY ASKED QUESTIONS RELATED TO STATIC GK", slug: "previously-asked-questions-related-to-static-gk" },

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
