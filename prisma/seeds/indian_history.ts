import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_IndianHistory(prisma: PrismaClient) {
  console.log("Seeding Indian History...");
  const subject = await prisma.subject.upsert({
    where: { slug: "indian-history" },
    update: {},
    create: { 
      name: "Indian History",
      slug: "indian-history",
      description: "Ancient, Medieval and Modern History",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Pre-Historic Culture", slug: "pre-historic-culture", accessTier: AccessTier.FREE },
    { name: "Indus Valley Civilization", slug: "indus-valley-civilization", accessTier: AccessTier.FREE },
    { name: "Vedic Civilization", slug: "vedic-civilization", accessTier: AccessTier.FREE },
    { name: "Religious Reform Movement-Jainism,Buddhism", slug: "religious-reform-movement-jainism-buddhism", accessTier: AccessTier.FREE },
    { name: "Mahajanapada -Rise of Magadha Empire", slug: "mahajanapada-rise-of-magadha-empire", accessTier: AccessTier.FREE },
    { name: "Mouryan Empire", slug: "mouryan-empire", accessTier: AccessTier.FREE },
    { name: "Post Mouryan Empire", slug: "post-mouryan-empire", accessTier: AccessTier.FREE },
    { name: "Gupta Empire", slug: "gupta-empire", accessTier: AccessTier.FREE },
    { name: "Post Gupta Empire", slug: "post-gupta-empire", accessTier: AccessTier.FREE },
    { name: "Muslim Invasion", slug: "muslim-invasion", accessTier: AccessTier.PRO },
    { name: "Delhi Sultanate", slug: "delhi-sultanate", accessTier: AccessTier.PRO },
    { name: "Vijayanagara Empire", slug: "vijayanagara-empire", accessTier: AccessTier.PRO },
    { name: "Mughal Empire", slug: "mughal-empire", accessTier: AccessTier.PRO },
    { name: "Maratha Empire", slug: "maratha-empire", accessTier: AccessTier.PRO },
    { name: "Bhakti-Sufi Movement", slug: "bhakti-sufi-movement", accessTier: AccessTier.PRO },
    { name: "Advent of Europeans to India", slug: "advent-of-europeans-to-india", accessTier: AccessTier.PRO },
    { name: "Establishment of British Empire In India", slug: "establishment-of-british-empire-in-india", accessTier: AccessTier.PRO },
    { name: "British Policies", slug: "british-policies", accessTier: AccessTier.PRO },
    { name: "Socio & Religious Reforms Movement", slug: "socio-religious-reforms-movement", accessTier: AccessTier.PRO },
    { name: "Peasants and Tribal Movements", slug: "peasants-and-tribal-movements", accessTier: AccessTier.PRO },
    { name: "Sepoy Mutiny-1857", slug: "sepoy-mutiny-1857", accessTier: AccessTier.PRO },
    { name: "Indian National Movement 1885 to 1947", slug: "indian-national-movement-1885-to-1947", accessTier: AccessTier.PRO },
    { name: "Governor Generals", slug: "governor-generals", accessTier: AccessTier.PRO },

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
