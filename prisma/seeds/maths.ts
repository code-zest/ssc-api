import { PrismaClient } from "@prisma/client";

export async function seed_Maths(prisma: PrismaClient) {
  console.log("Seeding Mathematics...");
  const subject = await prisma.subject.upsert({
    where: { slug: "mathematics" },
    update: {},
    create: {
      name: "Mathematics",
      slug: "mathematics",
      description: "Advance Mathematics",
      examTypes: ["SSC_CGL"],
      isActive: true,
    },
  });

  const chapters = [
    { name: "Theory of Indices & Algebraic expressons", slug: "theory-of-indices-algebraic-expressons" },
    { name: "Surds", slug: "surds" },
    { name: "Polynomials, Linear and quadratic Equations", slug: "polynomials-linear-and-quadratic-equations" },
    { name: "Progressions", slug: "progressions" },
    { name: "Trignometry", slug: "trignometry" },
    { name: "Heights and Distances", slug: "heights-and-distances" },
    { name: "Co-Ordinate Geometry", slug: "co-ordinate-geometry" },
    { name: "Plane Geometry", slug: "plane-geometry" },
    { name: "Lines and Angles", slug: "lines-and-angles" },
    { name: "Triangles", slug: "triangles" },
    { name: "S. Triangles", slug: "s-triangles" },
    { name: "Quadrilaterals", slug: "quadrilaterals" },
    { name: "Circles", slug: "circles" },
    { name: "Areas", slug: "areas" },
    { name: "Volumes", slug: "volumes" },
    { name: "Number System", slug: "number-system" },

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
