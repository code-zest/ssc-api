import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_Arithmetic(prisma: PrismaClient) {
  console.log("Seeding Arithmetic...");
  const subject = await prisma.subject.upsert({
    where: { slug: "arithmetic" },
    update: {},
    create: { 
      name: "Arithmetic",
      slug: "arithmetic",
      description: "Quantitative Aptitude - Arithmetic",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Percentages", slug: "percentages", accessTier: AccessTier.FREE },
    { name: "Profit and Loss", slug: "profit-and-loss", accessTier: AccessTier.FREE },
    { name: "Simple Interest", slug: "simple-interest", accessTier: AccessTier.FREE },
    { name: "Compound Interest", slug: "compound-interest", accessTier: AccessTier.FREE },
    { name: "SI & CI Installment Models", slug: "si-ci-installment-models", accessTier: AccessTier.FREE },
    { name: "Ratio & Proportion", slug: "ratio-proportion", accessTier: AccessTier.FREE },
    { name: "Partnership", slug: "partnership", accessTier: AccessTier.FREE },
    { name: "Problems on Ages", slug: "problems-on-ages", accessTier: AccessTier.FREE },
    { name: "Averages", slug: "averages", accessTier: AccessTier.PRO },
    { name: "Mixture and Alligations", slug: "mixture-and-alligations", accessTier: AccessTier.PRO },
    { name: "LCM & HCF", slug: "lcm-hcf", accessTier: AccessTier.PRO },
    { name: "Time and work", slug: "time-and-work", accessTier: AccessTier.PRO },
    { name: "Work and wages", slug: "work-and-wages", accessTier: AccessTier.PRO },
    { name: "Pipes and cisterns", slug: "pipes-and-cisterns", accessTier: AccessTier.PRO },
    { name: "Time, Speed, Distance", slug: "time-speed-distance", accessTier: AccessTier.PRO },
    { name: "Trains", slug: "trains", accessTier: AccessTier.PRO },
    { name: "Races and Games", slug: "races-and-games", accessTier: AccessTier.PRO },
    { name: "Circular Motion", slug: "circular-motion", accessTier: AccessTier.PRO },
    { name: "Boats and Streams", slug: "boats-and-streams", accessTier: AccessTier.PRO },
    { name: "Circluar Tracks", slug: "circluar-tracks", accessTier: AccessTier.PRO },
    { name: "Data Interpretation", slug: "data-interpretation", accessTier: AccessTier.PRO },

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
