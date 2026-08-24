import { PrismaClient } from "@prisma/client";

const HISTORY_CHAPTERS = [
  // Ancient History
  { name: "Pre-Historic Culture", slug: "pre-historic-culture", sectionName: "Ancient History", order: 1 },
  { name: "Indus Valley Civilization / Harappan Civilization", slug: "indus-valley-civilization", sectionName: "Ancient History", order: 2 },
  { name: "Vedic Civilization / Aryan Civilization", slug: "vedic-civilization", sectionName: "Ancient History", order: 3 },
  { name: "Religious Reform Movement - Jainism, Buddhism", slug: "religious-reform-movement", sectionName: "Ancient History", order: 4 },
  { name: "Mahajanapada - Rise of Magadha Empire", slug: "mahajanapada", sectionName: "Ancient History", order: 5 },
  { name: "Mouryan Empire", slug: "mouryan-empire", sectionName: "Ancient History", order: 6 },
  { name: "Post Mouryan Empire", slug: "post-mouryan-empire", sectionName: "Ancient History", order: 7 },
  { name: "Gupta Empire", slug: "gupta-empire", sectionName: "Ancient History", order: 8 },
  { name: "Post Gupta Empire", slug: "post-gupta-empire", sectionName: "Ancient History", order: 9 },

  // Medieval History
  { name: "Muslim Invasion", slug: "muslim-invasion", sectionName: "Medieval History", order: 10 },
  { name: "Delhi Sultanate", slug: "delhi-sultanate", sectionName: "Medieval History", order: 11 },
  { name: "Vijayanagara Empire", slug: "vijayanagara-empire", sectionName: "Medieval History", order: 12 },
  { name: "Mughal Empire", slug: "mughal-empire", sectionName: "Medieval History", order: 13 },
  { name: "Maratha Empire", slug: "maratha-empire", sectionName: "Medieval History", order: 14 },
  { name: "Bhakti-Sufi Movement", slug: "bhakti-sufi-movement", sectionName: "Medieval History", order: 15 },

  // Modern History
  { name: "Advent of Europeans to India", slug: "advent-of-europeans-to-india", sectionName: "Modern History", order: 16 },
  { name: "Establishment of British Empire In India", slug: "establishment-of-british-empire", sectionName: "Modern History", order: 17 },
  { name: "British Policies", slug: "british-policies", sectionName: "Modern History", order: 18 },
  { name: "Socio & Religious Reforms Movement", slug: "socio-religious-reforms", sectionName: "Modern History", order: 19 },
  { name: "Peasants and Tribal Movements", slug: "peasants-and-tribal-movements", sectionName: "Modern History", order: 20 },
  { name: "Sepoy Mutiny-1857", slug: "sepoy-mutiny-1857", sectionName: "Modern History", order: 21 },
  { name: "Indian National Movement 1885 to 1947", slug: "indian-national-movement", sectionName: "Modern History", order: 22 },
  { name: "Governor Generals", slug: "governor-generals", sectionName: "Modern History", order: 23 },
];

import { seedPrehistoricCulture } from "./prehistoric-culture";
import { seedIndusValley } from "./indus-valley";
import { seedVedicCivilization } from "./vedic-civilization";
import { seedReligiousReform } from "./religious-reform-movement";

export async function seedIndianHistory(prisma: PrismaClient) {
  console.log("Seeding Indian History subject...");

  const subject = await prisma.subject.upsert({
    where: { slug: "indian-history" },
    update: {},
    create: {
      name: "Indian History",
      slug: "indian-history",
      description: "Comprehensive Indian History for SSC Exams covering Ancient, Medieval, and Modern History.",
      examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"],
      isActive: true,
      order: 3, // Arbitrary order, can be adjusted
    },
  });

  console.log(`✅ Ensured subject: ${subject.name} exists.`);

  console.log("Seeding Chapters...");
  for (const chap of HISTORY_CHAPTERS) {
    const chapter = await prisma.chapter.upsert({
      where: {
        subjectId_slug: {
          subjectId: subject.id,
          slug: chap.slug,
        },
      },
      update: {
        name: chap.name,
        sectionName: chap.sectionName,
        order: chap.order,
      },
      create: {
        subjectId: subject.id,
        name: chap.name,
        slug: chap.slug,
        sectionName: chap.sectionName,
        order: chap.order,
        isActive: true,
        accessTier: "FREE", 
      },
    });
    console.log(`   Created/Updated chapter: ${chap.name} (${chap.sectionName})`);
    
// Call specific chapter seeds if they exist
    if (chap.slug === "pre-historic-culture") {
      await seedPrehistoricCulture(prisma, subject.id, chapter.id);
    }
if (chap.slug === "indus-valley-civilization") {
      await seedIndusValley(prisma, subject.id, chapter.id);
    }
if (chap.slug === "vedic-civilization") {
      await seedVedicCivilization(prisma, subject.id, chapter.id);
    }
    if (chap.slug === "religious-reform-movement") {
      await seedReligiousReform(prisma, subject.id, chapter.id);
    }
  }

  console.log("🎉 Successfully seeded all Indian History chapters!");
}
