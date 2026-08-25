import { prisma } from '../src/config/prisma';

async function main() {
  console.log('Seeding store items...');

  const items = [
    {
      name: 'Code Zest Coffee Mug',
      description: 'A premium ceramic coffee mug with the Code Zest logo. Perfect for late-night coding sessions.',
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop',
      cost: 500,
      stock: 50,
      isActive: true,
    },
    {
      name: 'Code Zest Premium Pen',
      description: 'A smooth-writing ballpoint pen with a sleek matte black finish. For when you need to write algorithms on paper.',
      imageUrl: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop',
      cost: 200,
      stock: 100,
      isActive: true,
    },
    {
      name: 'Developer Notebook',
      description: 'A dot-grid notebook for system design and architecture planning.',
      imageUrl: 'https://images.unsplash.com/photo-1531346878377-a541e4ab04ce?q=80&w=600&auto=format&fit=crop',
      cost: 800,
      stock: 30,
      isActive: true,
    },
    {
      name: 'Code Zest Sticker Pack',
      description: 'A pack of 5 high-quality vinyl stickers to decorate your laptop.',
      imageUrl: 'https://images.unsplash.com/photo-1572375992501-a189f33ae143?q=80&w=600&auto=format&fit=crop',
      cost: 100,
      stock: 200,
      isActive: true,
    }
  ];

  for (const item of items) {
    await prisma.storeItem.create({
      data: item
    });
  }

  console.log('Successfully seeded store items!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
