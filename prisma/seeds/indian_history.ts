import { PrismaClient } from "@prisma/client";

export async function seed_IndianHistory(prisma: PrismaClient) {
  console.log("Seeding Indian History...");
  const subject = await prisma.subject.upsert({
    where: { slug: "indian-history" },
    update: {},
    create: {
      name: "Indian History",
      slug: "indian-history",
      description: "Ancient, Medieval and Modern History",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Pre-Historic Culture", slug: "pre-historic-culture" },
    { name: "Indus Valley Civilization", slug: "indus-valley-civilization" },
    { name: "Vedic Civilization", slug: "vedic-civilization" },
    { name: "Religious Reform Movement-Jainism,Buddhism", slug: "religious-reform-movement-jainism-buddhism" },
    { name: "Mahajanapada -Rise of Magadha Empire", slug: "mahajanapada-rise-of-magadha-empire" },
    { name: "Mouryan Empire", slug: "mouryan-empire" },
    { name: "Post Mouryan Empire", slug: "post-mouryan-empire" },
    { name: "Gupta Empire", slug: "gupta-empire" },
    { name: "Post Gupta Empire", slug: "post-gupta-empire" },
    { name: "Muslim Invasion", slug: "muslim-invasion" },
    { name: "Delhi Sultanate", slug: "delhi-sultanate" },
    { name: "Vijayanagara Empire", slug: "vijayanagara-empire" },
    { name: "Mughal Empire", slug: "mughal-empire" },
    { name: "Maratha Empire", slug: "maratha-empire" },
    { name: "Bhakti-Sufi Movement", slug: "bhakti-sufi-movement" },
    { name: "Advent of Europeans to India", slug: "advent-of-europeans-to-india" },
    { name: "Establishment of British Empire In India", slug: "establishment-of-british-empire-in-india" },
    { name: "British Policies", slug: "british-policies" },
    { name: "Socio & Religious Reforms Movement", slug: "socio-religious-reforms-movement" },
    { name: "Peasants and Tribal Movements", slug: "peasants-and-tribal-movements" },
    { name: "Sepoy Mutiny-1857", slug: "sepoy-mutiny-1857" },
    { name: "Indian National Movement 1885 to 1947", slug: "indian-national-movement-1885-to-1947" },
    { name: "Governor Generals", slug: "governor-generals" },

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
