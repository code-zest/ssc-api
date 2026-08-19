import { PrismaClient, AccessTier } from "@prisma/client";

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
    { name: "Historical background", slug: "historical-background", accessTier: AccessTier.FREE },
    { name: "Making and framing of the Indian constitution", slug: "making-and-framing-of-the-indian-constitution", accessTier: AccessTier.FREE },
    { name: "Preamble", slug: "preamble", accessTier: AccessTier.FREE },
    { name: "Union and its territories", slug: "union-and-its-territories", accessTier: AccessTier.FREE },
    { name: "Citizenship", slug: "citizenship", accessTier: AccessTier.FREE },
    { name: "Fundamental Rights", slug: "fundamental-rights", accessTier: AccessTier.FREE },
    { name: "Directive principles of state policy", slug: "directive-principles-of-state-policy", accessTier: AccessTier.FREE },
    { name: "Fundamental duties of India", slug: "fundamental-duties-of-india", accessTier: AccessTier.PRO },
    { name: "President of India", slug: "president-of-india", accessTier: AccessTier.PRO },
    { name: "Vice president of India", slug: "vice-president-of-india", accessTier: AccessTier.PRO },
    { name: "Council of Ministers", slug: "council-of-ministers", accessTier: AccessTier.PRO },
    { name: "Parliament of India", slug: "parliament-of-india", accessTier: AccessTier.PRO },
    { name: "Governor", slug: "governor", accessTier: AccessTier.PRO },
    { name: "Indian Judiciary", slug: "indian-judiciary", accessTier: AccessTier.PRO },
    { name: "Local bodies", slug: "local-bodies", accessTier: AccessTier.PRO },
    { name: "Emergency provisions", slug: "emergency-provisions", accessTier: AccessTier.PRO },
    { name: "Constitutional bodies & Non-Constitutional bodies", slug: "constitutional-bodies-non-constitutional-bodies", accessTier: AccessTier.PRO },
    { name: "Important Constitutional amendment Acts", slug: "important-constitutional-amendment-acts", accessTier: AccessTier.PRO },
    { name: "Important Supreme Court Judgements", slug: "important-supreme-court-judgements", accessTier: AccessTier.PRO },

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
