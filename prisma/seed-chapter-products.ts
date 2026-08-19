import { AccessTier } from '@prisma/client';
import { prisma } from '../src/config/prisma';

async function main() {
  console.log("Seeding chapter products...");
  
  // Find all PRO chapters
  const proChapters = await prisma.chapter.findMany({
    where: { accessTier: AccessTier.PRO }
  });

  let createdCount = 0;

  for (const chapter of proChapters) {
    // Check if a product already exists for this chapter
    const existingProduct = await prisma.product.findFirst({
      where: {
        items: {
          some: {
            itemType: 'CHAPTER',
            itemId: chapter.id
          }
        }
      }
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          name: `${chapter.name} — Unlock Chapter`,
          description: `One-time purchase to unlock the full "${chapter.name}" chapter, including all video lessons and practice sets.`,
          price: 49, // Flat rate ₹49
          isActive: true,
          items: {
            create: [
              {
                itemType: 'CHAPTER',
                itemId: chapter.id
              }
            ]
          }
        }
      });
      createdCount++;
    }
  }

  console.log(`✅ Created ${createdCount} new chapter products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
