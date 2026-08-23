import { PrismaClient } from "@prisma/client";
import { seedChapterProducts } from "./chapter-products";
import { seedE2ePayments } from "./e2e-payments";

export async function seedPayments(prisma: PrismaClient) {
  console.log("Seeding Payments and Products...");
  
  await seedChapterProducts(prisma);
  await seedE2ePayments(prisma);
  
  console.log("🎉 Payments seeded successfully!");
}
