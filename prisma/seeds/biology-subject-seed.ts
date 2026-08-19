import { PrismaClient } from "@prisma/client";

export const biologyTopics = [
  { name: "Introduction", slug: "introduction", order: 1 },
  { name: "Skeletal System", slug: "skeletal-system", order: 2 },
  { name: "Blood Circulation", slug: "blood-circulation", order: 3 },
  { name: "Digestive System", slug: "digestive-system", order: 4 },
  { name: "Respiratory System", slug: "respiratory-system", order: 5 },
  { name: "Excretory System", slug: "excretory-system", order: 6 },
  { name: "Nervous System", slug: "nervous-system", order: 7 },
  { name: "Endocrine System", slug: "endocrine-system", order: 8 },
  { name: "Reproductive System", slug: "reproductive-system", order: 9 },
  { name: "Sensory Organs", slug: "sensory-organs", order: 10 },
  { name: "Nutrition", slug: "nutrition", order: 11 },
  { name: "Pathology", slug: "pathology", order: 12 },
  { name: "Cell Biology", slug: "cell-biology", order: 13 },
  { name: "Classification of Living Organisms", slug: "classification-of-living-organisms", order: 14 },
  { name: "Plant Morphology", slug: "plant-morphology", order: 15 },
  { name: "Photosynthesis", slug: "photosynthesis", order: 16 },
  { name: "Respiration in Plants", slug: "respiration-in-plants", order: 17 },
  { name: "Excretion in Plants", slug: "excretion-in-plants", order: 18 },
  { name: "Phyto Hormones", slug: "phyto-hormones", order: 19 },
  { name: "Reproduction in Plants", slug: "reproduction-in-plants", order: 20 },
  { name: "Economical Importance of Plants", slug: "economical-importance-of-plants", order: 21 },
  { name: "Economical Importance of Animals", slug: "economical-importance-of-animals", order: 22 },
  { name: "Recent Trends in Biology", slug: "recent-trends-in-biology", order: 23 },
  { name: "Environmental Science", slug: "environmental-science", order: 24 }
];

export async function seedBiology(prisma: PrismaClient) {
  console.log("Seeding Biology subject...");

  const subject = await prisma.subject.upsert({
    where: { slug: "biology-cgl" },
    update: {},
    create: { 
      name: "Biology (CGL)",
      slug: "biology-cgl",
      description: "Complete Biology Syllabus for SSC CGL",
       examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
      order: 2, // Assuming Mathematics is 1 or 0
    }
  });

  for (const topic of biologyTopics) {
    await prisma.chapter.upsert({
      where: { 
        subjectId_slug: { subjectId: subject.id, slug: topic.slug } 
      },
      update: {},
      create: { 
        subjectId: subject.id,
        name: topic.name,
        slug: topic.slug,
        description: `Topics related to ${topic.name}`,
        order: topic.order,
         examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"], 
      isActive: true,
      }
    });
  }

  console.log("Biology subject and chapters seeded successfully!");
}
