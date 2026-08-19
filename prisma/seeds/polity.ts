import { PrismaClient } from "@prisma/client";

export async function seed_Polity(prisma: PrismaClient) {
  console.log("Seeding Polity...");
  const subject = await prisma.subject.upsert({
    where: { slug: "polity" },
    update: {},
    create: {
      name: "Polity",
      slug: "polity",
      description: "Indian Polity and Constitution",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Historical background", slug: "historical-background" },
    { name: "Making and framing of the Indian constitution", slug: "making-and-framing-of-the-indian-constitution" },
    { name: "Preamble", slug: "preamble" },
    { name: "Union and its territories", slug: "union-and-its-territories" },
    { name: "Citizenship", slug: "citizenship" },
    { name: "Fundamental Rights", slug: "fundamental-rights" },
    { name: "Directive principles of state policy", slug: "directive-principles-of-state-policy" },
    { name: "Fundamental duties of India", slug: "fundamental-duties-of-india" },
    { name: "President of India", slug: "president-of-india" },
    { name: "Vice president of India", slug: "vice-president-of-india" },
    { name: "Council of Ministers", slug: "council-of-ministers" },
    { name: "Parliament of India", slug: "parliament-of-india" },
    { name: "Governor", slug: "governor" },
    { name: "Indian Judiciary", slug: "indian-judiciary" },
    { name: "Local bodies", slug: "local-bodies" },
    { name: "Emergency provisions", slug: "emergency-provisions" },
    { name: "Constitutional bodies & Non-Constitutional bodies", slug: "constitutional-bodies-non-constitutional-bodies" },
    { name: "Important Constitutional amendment Acts", slug: "important-constitutional-amendment-acts" },
    { name: "Important Supreme Court Judgements", slug: "important-supreme-court-judgements" },

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
