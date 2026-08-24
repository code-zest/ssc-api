import { seedTheoryOfIndices } from "./indices";
import { PrismaClient, AccessTier } from "@prisma/client";

export async function seed_Maths(prisma: PrismaClient) {
  console.log("Seeding Mathematics...");
  const subject = await prisma.subject.upsert({
    where: { slug: "mathematics" },
    update: {},
    create: { 
      name: "Mathematics",
      slug: "mathematics",
      description: "Advance Mathematics",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_CPO"], 
      isActive: true,
    },
  });

  const chapters = [
    { name: "Theory of Indices & Algebraic expressons", slug: "theory-of-indices-algebraic-expressons", accessTier: AccessTier.FREE },
    { name: "Surds", slug: "surds", accessTier: AccessTier.FREE },
    { name: "Polynomials, Linear and quadratic Equations", slug: "polynomials-linear-and-quadratic-equations", accessTier: AccessTier.FREE },
    { name: "Progressions", slug: "progressions", accessTier: AccessTier.FREE },
    { name: "Trignometry", slug: "trignometry", accessTier: AccessTier.FREE },
    { name: "Heights and Distances", slug: "heights-and-distances", accessTier: AccessTier.FREE },
    { name: "Co-Ordinate Geometry", slug: "co-ordinate-geometry", accessTier: AccessTier.PRO },
    { name: "Plane Geometry", slug: "plane-geometry", accessTier: AccessTier.PRO },
    { name: "Lines and Angles", slug: "lines-and-angles", accessTier: AccessTier.PRO },
    { name: "Triangles", slug: "triangles", accessTier: AccessTier.PRO },
    { name: "S. Triangles", slug: "s-triangles", accessTier: AccessTier.PRO },
    { name: "Quadrilaterals", slug: "quadrilaterals", accessTier: AccessTier.PRO },
    { name: "Circles", slug: "circles", accessTier: AccessTier.PRO },
    { name: "Areas", slug: "areas", accessTier: AccessTier.PRO },
    { name: "Volumes", slug: "volumes", accessTier: AccessTier.PRO },
    { name: "Number System", slug: "number-system", accessTier: AccessTier.PRO },

  ];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    await prisma.chapter.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: chapter.slug } },
      update: { accessTier: chapter.accessTier, examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_CPO"] },
      create: { 
        subjectId: subject.id,
        name: chapter.name,
        slug: chapter.slug,
        accessTier: chapter.accessTier,
         examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_CPO"], 
      isActive: true,
      },
    });
  }

  const chaptersList = await prisma.chapter.findMany({
    where: { subjectId: subject.id }
  });

  const indicesChapter = chaptersList.find((c: any) => c.slug === "theory-of-indices-algebraic-expressons");

  if (indicesChapter) {
    await seedTheoryOfIndices(prisma, subject.id, indicesChapter.id);
  }
}
