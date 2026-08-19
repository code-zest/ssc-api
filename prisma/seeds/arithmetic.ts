import { PrismaClient } from "@prisma/client";

export async function seed_Arithmetic(prisma: PrismaClient) {
  console.log("Seeding Arithmetic...");
  const subject = await prisma.subject.upsert({
    where: { slug: "arithmetic" },
    update: {},
    create: {
      name: "Arithmetic",
      slug: "arithmetic",
      description: "Quantitative Aptitude - Arithmetic",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Percentages", slug: "percentages" },
    { name: "Profit and Loss", slug: "profit-and-loss" },
    { name: "Simple Interest", slug: "simple-interest" },
    { name: "Compound Interest", slug: "compound-interest" },
    { name: "SI & CI Installment Models", slug: "si-ci-installment-models" },
    { name: "Ratio & Proportion", slug: "ratio-proportion" },
    { name: "Partnership", slug: "partnership" },
    { name: "Problems on Ages", slug: "problems-on-ages" },
    { name: "Averages", slug: "averages" },
    { name: "Mixture and Alligations", slug: "mixture-and-alligations" },
    { name: "LCM & HCF", slug: "lcm-hcf" },
    { name: "Time and work", slug: "time-and-work" },
    { name: "Work and wages", slug: "work-and-wages" },
    { name: "Pipes and cisterns", slug: "pipes-and-cisterns" },
    { name: "Time, Speed, Distance", slug: "time-speed-distance" },
    { name: "Trains", slug: "trains" },
    { name: "Races and Games", slug: "races-and-games" },
    { name: "Circular Motion", slug: "circular-motion" },
    { name: "Boats and Streams", slug: "boats-and-streams" },
    { name: "Circluar Tracks", slug: "circluar-tracks" },
    { name: "Data Interpretation", slug: "data-interpretation" },

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
