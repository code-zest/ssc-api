import { PrismaClient } from "@prisma/client";
import { seedAwardsAndHonours } from "./awards-and-honours";
import { seedBiosphereReserves } from "./biosphere-reserves";

export async function seedStaticGk(prisma: PrismaClient) {
  console.log("Seeding Subject: Static GK...");

  // 1. Upsert Subject
  const subject = await prisma.subject.upsert({
    where: { slug: "static-gk" },
    update: {},
    create: {
      name: "Static GK",
      slug: "static-gk",
      description: "General Knowledge - Static facts, Awards, Honours, Books, Authors, etc.",
      examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO"],
      isActive: true,
    },
  });

  // 2. Call Chapter Seeds
  await seedAwardsAndHonours(prisma, subject.id);
  await seedBiosphereReserves(prisma, subject.id);

  console.log("Static GK Seed complete.");
}
