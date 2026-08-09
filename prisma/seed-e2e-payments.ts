import { Role, SubscriptionTier, AccessTier, ExamType, PurchasableItemType } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Seeding E2E payment data...");

  // 1. Create a Test Student
  const passwordHash = await bcrypt.hash("testpass", 10);
  const student = await prisma.user.upsert({
    where: { email: "e2e.student@gmail.com" },
    update: {},
    create: {
      name: "E2E Student",
      email: "e2e.student@gmail.com",
      passwordHash,
      role: Role.STUDENT,
      subscriptionTier: SubscriptionTier.FREE,
      isEmailVerified: true,
    },
  });

  // 2. Create a Premium Mock Test
  const mockTest = await prisma.mockTest.upsert({
    where: { id: "e2e-mock-test-1" },
    update: {},
    create: {
      id: "e2e-mock-test-1",
      title: "E2E Premium Mock Test",
      examType: ExamType.SSC_CGL,
      totalQuestions: 10,
      totalMarks: 20,
      durationMinutes: 15,
      accessTier: AccessTier.EXCLUSIVE,
      isActive: true,
    },
  });

  // 3. Create a Product to purchase this Mock Test
  const product = await prisma.product.upsert({
    where: { id: "e2e-product-1" },
    update: {},
    create: {
      id: "e2e-product-1",
      name: "E2E Test Unlock",
      description: "Unlocks the E2E Mock Test",
      price: 99.0, // 99 INR
      isActive: true,
      items: {
        create: {
          itemType: PurchasableItemType.MOCK_TEST,
          itemId: mockTest.id,
        },
      },
    },
  });

  console.log("E2E Payment Data Seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
