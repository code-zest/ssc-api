import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_ComputerKnowledge(prisma: PrismaClient) {
  console.log("Seeding Computer Knowledge...");
  const subject = await prisma.subject.upsert({
    where: { slug: "computer-knowledge" },
    update: {},
    create: {
      name: "Computer Knowledge",
      slug: "computer-knowledge",
      description: "Computer Awareness",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "BASICS OF COMPUTER KNOWLEDGE", slug: "basics-of-computer-knowledge", accessTier: AccessTier.FREE },
    { name: "SOFTWARES AND MS OFFICE", slug: "softwares-and-ms-office", accessTier: AccessTier.FREE },
    { name: "MS-ACCESS/DATA BASE MANAGEMENT SYSTEMS", slug: "ms-access-data-base-management-systems", accessTier: AccessTier.FREE },
    { name: "NETWORKING CONCEPTS", slug: "networking-concepts", accessTier: AccessTier.PRO },
    { name: "INTERNET CONCEPTS", slug: "internet-concepts", accessTier: AccessTier.PRO },
    { name: "IMPORTANT ABBREVIATIONS", slug: "important-abbreviations", accessTier: AccessTier.PRO },
    { name: "TEST SERIES", slug: "test-series", accessTier: AccessTier.PRO },
    { name: "RRB PO MAINS-2023 (MEMORY BASED QUESTIONS)", slug: "rrb-po-mains-2023-memory-based-questions", accessTier: AccessTier.PRO },
    { name: "RRB CLERK MAINS-2023 (MEMORY BASED QUESTIONS)", slug: "rrb-clerk-mains-2023-memory-based-questions", accessTier: AccessTier.PRO },

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
