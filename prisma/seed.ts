import { Role, SubscriptionTier } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Seeding database...");
  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Super Admin
  await prisma.user.upsert({
    where: { email: "superadmin@codezest.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@codezest.com",
      passwordHash,
      role: Role.SUPER_ADMIN,
      isEmailVerified: true,
    },
  });

  // 2. Admin
  await prisma.user.upsert({
    where: { email: "admin@codezest.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@codezest.com",
      passwordHash,
      role: Role.ADMIN,
      isEmailVerified: true,
    },
  });

  // 3. Staff
  await prisma.user.upsert({
    where: { email: "staff@codezest.com" },
    update: {},
    create: {
      name: "Staff User",
      email: "staff@codezest.com",
      passwordHash,
      role: Role.STAFF,
      isEmailVerified: true,
    },
  });

  // 4. Free Student
  await prisma.user.upsert({
    where: { email: "student.free@gmail.com" },
    update: {},
    create: {
      name: "Free Student",
      email: "student.free@gmail.com",
      passwordHash,
      role: Role.STUDENT,
      subscriptionTier: SubscriptionTier.FREE,
      isEmailVerified: true,
    },
  });

  // 5. Pro Student
  await prisma.user.upsert({
    where: { email: "student.pro@gmail.com" },
    update: {},
    create: {
      name: "Pro Student",
      email: "student.pro@gmail.com",
      passwordHash,
      role: Role.STUDENT,
      subscriptionTier: SubscriptionTier.PRO,
      subscriptionExpiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      isEmailVerified: true,
    },
  });

  // 6. Seed Demo Curriculum Data (Phase 3 & 4 Progress)
  const subject = await prisma.subject.upsert({
    where: { slug: "mathematics-cgl" },
    update: {},
    create: {
      name: "Mathematics (CGL)",
      slug: "mathematics-cgl",
      description: "Quantitative Aptitude for SSC CGL",
      examTypes: ["SSC_CGL"],
      isActive: true,
    }
  });

  const chapter = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId: subject.id, slug: "algebra" } },
    update: {},
    create: {
      subjectId: subject.id,
      name: "Algebra",
      slug: "algebra",
      description: "Basic Algebraic Identities",
      isActive: true,
    }
  });

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapter.id, slug: "intro-to-algebra" } },
    update: {},
    create: {
      chapterId: chapter.id,
      subjectId: subject.id,
      title: "Introduction to Algebra",
      slug: "intro-to-algebra",
      type: "VIDEO",
      videoUrl: "https://example.com/video.mp4",
      accessTier: "FREE",
      isActive: true,
    }
  });

  // Seed a sample question if it doesn't exist
  const existingQuestions = await prisma.question.findMany({ where: { chapterId: chapter.id } });
  if (existingQuestions.length === 0) {
    await prisma.question.create({
      data: {
        subjectId: subject.id,
        chapterId: chapter.id,
        questionText: "<p>If $x + \\frac{1}{x} = 4$, find the value of $x^2 + \\frac{1}{x^2}$.</p>",
        options: [
          { key: "A", text: "12" },
          { key: "B", text: "14" },
          { key: "C", text: "16" },
          { key: "D", text: "18" }
        ],
        correctOption: "B",
        explanation: "<p>Using the identity $(x + \\frac{1}{x})^2 = x^2 + \\frac{1}{x^2} + 2$. So $16 = x^2 + \\frac{1}{x^2} + 2$, meaning it's 14.</p>",
        difficulty: "MEDIUM",
        examTypes: ["SSC_CGL"],
        isPYQ: true,
        pyqYear: 2022,
      }
    });
  }

  // 7. Seed Mock Error Reports for Analytics
  await prisma.errorReport.createMany({
    skipDuplicates: true,
    data: [
      {
        fingerprint: "hash12345",
        severity: "CRITICAL",
        status: "UNRESOLVED",
        occurrenceCount: 15,
        affectedUserCount: 12,
        firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        lastSeenAt: new Date(),
        message: "Network Error: Failed to fetch /api/v1/mock-tests",
        stack: "Error: Network Error\n    at createError (axios/lib/core/createError.js:16:15)\n    at XMLHttpRequest.handleError (axios/lib/adapters/xhr.js:91:14)",
        url: "http://localhost:3000/dashboard/mock-tests",
        routePath: "/dashboard/mock-tests",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0 Safari/537.36",
      },
      {
        fingerprint: "hash67890",
        severity: "HIGH",
        status: "IN_PROGRESS",
        occurrenceCount: 5,
        affectedUserCount: 2,
        firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        lastSeenAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        message: "TypeError: Cannot read properties of undefined (reading 'map')",
        componentStack: "\n    at PracticeSetsPage (webpack-internal:///./app/dashboard/practice-sets/page.tsx:42:25)",
        url: "http://localhost:3000/dashboard/practice-sets",
        routePath: "/dashboard/practice-sets",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0",
      },
      {
        fingerprint: "hashabcde",
        severity: "LOW",
        status: "RESOLVED",
        occurrenceCount: 42,
        affectedUserCount: 38,
        firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
        lastSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        message: "404 Not Found: /dashboard/invalid-route",
        url: "http://localhost:3000/dashboard/invalid-route",
        routePath: "/dashboard/invalid-route",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) Safari/604.1",
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
