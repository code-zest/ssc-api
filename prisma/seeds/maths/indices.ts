import { PrismaClient, Difficulty, ExamType } from "@prisma/client";
import indicesData from "./indices_data.json";

type SeedQuestion = {
  questionText: string;
  options: { key: string; text: string }[];
  correctOption: string;
  difficulty: string;
  examTypes: string[];
  isPYQ?: boolean;
  pyqYear?: number | null;
};


export async function seedTheoryOfIndices(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Theory of Indices & Algebraic Expressions...");
  
  let count = 0;
  for (const q of indicesData as SeedQuestion[]) {
    // We don't have a unique key for upsert besides ID, so we check by questionText and chapterId
    const existing = await prisma.question.findFirst({
      where: {
        chapterId,
        questionText: q.questionText
      }
    });

    const data = {
      subjectId,
      chapterId,
      questionText: q.questionText,
      options: q.options,
      correctOption: q.correctOption,
      difficulty: q.difficulty as Difficulty,
      examTypes: q.examTypes as ExamType[],
      isPYQ: q.isPYQ || false,
      pyqYear: q.pyqYear || null,
    };

    if (existing) {
      await prisma.question.update({
        where: { id: existing.id },
        data
      });
    } else {
      await prisma.question.create({
        data
      });
    }
    count++;
  }
  
  console.log(`Seeded/Upserted ${count} individual questions for Theory of Indices.`);
}
