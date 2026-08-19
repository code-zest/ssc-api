import { PrismaClient } from "@prisma/client";

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
    { name: "BASICS OF COMPUTER KNOWLEDGE", slug: "basics-of-computer-knowledge" },
    { name: "SOFTWARES AND MS OFFICE", slug: "softwares-and-ms-office" },
    { name: "MS-ACCESS/DATA BASE MANAGEMENT SYSTEMS", slug: "ms-access-data-base-management-systems" },
    { name: "NETWORKING CONCEPTS", slug: "networking-concepts" },
    { name: "INTERNET CONCEPTS", slug: "internet-concepts" },
    { name: "IMPORTANT ABBREVIATIONS", slug: "important-abbreviations" },
    { name: "TEST SERIES", slug: "test-series" },
    { name: "RRB PO MAINS-2023 (MEMORY BASED QUESTIONS)", slug: "rrb-po-mains-2023-memory-based-questions" },
    { name: "RRB CLERK MAINS-2023 (MEMORY BASED QUESTIONS)", slug: "rrb-clerk-mains-2023-memory-based-questions" },

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
