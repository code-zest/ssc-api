import { PrismaClient } from "@prisma/client";

export async function seedCellBiology(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Biology Chapter: Cell Biology...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: "intro-to-cells" } },
    update: {},
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Introduction to Cells",
      slug: "intro-to-cells",
      type: "VIDEO",
      videoUrl: "https://example.com/biology-video.mp4",
      accessTier: "FREE",
      isActive: true,
      order: 1
    }
  });

  const existingQuestions = await prisma.question.findMany({ where: { chapterId: chapterId } });
  if (existingQuestions.length === 0) {
    await prisma.question.create({
      data: {
        subjectId: subjectId,
        chapterId: chapterId,
        questionText: "<p>What is the powerhouse of the cell?</p>",
        options: [
          { key: "A", text: "Nucleus" },
          { key: "B", text: "Mitochondria" },
          { key: "C", text: "Ribosome" },
          { key: "D", text: "Endoplasmic Reticulum" }
        ],
        correctOption: "B",
        explanation: "<p>Mitochondria are known as the powerhouses of the cell because they generate most of the cell's supply of ATP.</p>",
        difficulty: "EASY",
        examTypes: ["SSC_CGL"],
        isPYQ: true,
        pyqYear: 2021,
      }
    });
  }
}
