import { PrismaClient } from "@prisma/client";

export async function seedBiosphereReserves(prisma: PrismaClient, subjectId: string) {
  console.log("Seeding Chapter: Biosphere Reserves in India...");

  const biosphereChapterSlug = "biosphere-reserves";
  const biosphereChapter = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId: subjectId, slug: biosphereChapterSlug } },
    update: {},
    create: {
      subjectId: subjectId,
      name: "Biosphere Reserves in India",
      slug: biosphereChapterSlug,
      description: "Facts about the Biosphere Reserves of India.",
      isActive: true,
      order: 2,
    },
  });

  await prisma.lesson.upsert({
    where: {
      chapterId_slug: {
        chapterId: biosphereChapter.id,
        slug: "biosphere-reserves-notes",
      },
    },
    update: {},
    create: {
      chapterId: biosphereChapter.id,
      subjectId: subjectId,
      title: "Biosphere Reserves in India (Study Notes)",
      slug: "biosphere-reserves-notes",
      type: "ARTICLE",
      articleHtml: `<h1>Biosphere Reserves in India</h1>
<p>The Indian government has established 18 biosphere reserves in India (categories roughly corresponding to IUCN Category V Protected areas) to protect larger areas of natural habitat than a typical national park or animal sanctuary.</p>

<FeatureList title="Key Facts">
  <FeatureItem title="First Biosphere Reserve">The <strong>Nilgiri Biosphere Reserve</strong> (Tamil Nadu, Kerala, Karnataka) was established in 1986.</FeatureItem>
  <FeatureItem title="Largest Biosphere Reserve">The <strong>Gulf of Kachchh (Rann of Kutch)</strong> in Gujarat is the largest biosphere reserve in India.</FeatureItem>
  <FeatureItem title="Smallest Biosphere Reserve"><strong>Dibru-Saikhowa Biosphere Reserve</strong> in Assam is the smallest.</FeatureItem>
</FeatureList>

<FeatureList title="State-wise Important Biosphere Reserves">
  <FeatureItem title="West Bengal">Sundarbans</FeatureItem>
  <FeatureItem title="Odisha">Simlipal</FeatureItem>
  <FeatureItem title="Madhya Pradesh">Pachmarhi, Panna, Achanakmar-Amarkantak (Shared with Chhattisgarh)</FeatureItem>
  <FeatureItem title="Uttarakhand">Nanda Devi</FeatureItem>
  <FeatureItem title="Meghalaya">Nokrek</FeatureItem>
  <FeatureItem title="Sikkim">Khangchendzonga</FeatureItem>
  <FeatureItem title="Tamil Nadu">Gulf of Mannar</FeatureItem>
</FeatureList>
`,
      accessTier: "FREE",
      isActive: true,
      order: 1,
    },
  });

  const biosphereQuestionsData = [
    {
      text: "<p>Which of the following Biosphere reserves was first established by the Government of India?</p>",
      options: [
        { key: "A", text: "Sundarbans Biosphere Reserve" },
        { key: "B", text: "Gulf of Mannar Biosphere Reserve" },
        { key: "C", text: "Nanda Devi Biosphere Reserve" },
        { key: "D", text: "Nilgiri Biosphere Reserve" },
      ],
      correctOption: "D",
      explanation: "<p>The Nilgiri Biosphere Reserve was the first biosphere reserve in India, established in 1986.</p>",
    },
    {
      text: "<p>Simlipal Biosphere Reserve is located in which state of India?</p>",
      options: [
        { key: "A", text: "Andhra Pradesh" },
        { key: "B", text: "West Bengal" },
        { key: "C", text: "Odisha" },
        { key: "D", text: "Tamil Nadu" },
      ],
      correctOption: "C",
      explanation: "<p>Simlipal Biosphere Reserve is located in the Mayurbhanj district of Odisha.</p>",
    },
    {
      text: "<p>Pachmarhi Biosphere Reserve is located in which state?</p>",
      options: [
        { key: "A", text: "Assam" },
        { key: "B", text: "Kerala" },
        { key: "C", text: "Gujarat" },
        { key: "D", text: "Madhya Pradesh" },
      ],
      correctOption: "D",
      explanation: "<p>Pachmarhi Biosphere Reserve is located in the Satpura Range of Madhya Pradesh.</p>",
    },
    {
      text: "<p>Sundarbans Biosphere Reserve is located in which state?</p>",
      options: [
        { key: "A", text: "Tamil Nadu" },
        { key: "B", text: "West Bengal" },
        { key: "C", text: "Uttarakhand" },
        { key: "D", text: "Maharashtra" },
      ],
      correctOption: "B",
      explanation: "<p>The Sundarbans Biosphere Reserve is located in the vast delta on the Bay of Bengal in West Bengal.</p>",
    },
    {
      text: "<p>Nanda Devi Biosphere Reserve is located in which state?</p>",
      options: [
        { key: "A", text: "Andhra Pradesh" },
        { key: "B", text: "Telangana" },
        { key: "C", text: "Madhya Pradesh" },
        { key: "D", text: "Uttarakhand" },
      ],
      correctOption: "D",
      explanation: "<p>Nanda Devi Biosphere Reserve is located in Uttarakhand.</p>",
    },
    {
      text: "<p>Which is the largest Biosphere reserve in India?</p>",
      options: [
        { key: "A", text: "Great Nicobar Biosphere Reserve" },
        { key: "B", text: "Gulf of Mannar Biosphere Reserve" },
        { key: "C", text: "Nilgiri Biosphere Reserve" },
        { key: "D", text: "Gulf of Kachchh Biosphere Reserve" },
      ],
      correctOption: "D",
      explanation: "<p>The Gulf of Kachchh (Rann of Kutch) in Gujarat is the largest Biosphere Reserve in India, covering an area of over 12,454 sq km.</p>",
    },
    {
      text: "<p>Panna Biosphere Reserve is located in which state?</p>",
      options: [
        { key: "A", text: "Tamil Nadu" },
        { key: "B", text: "West Bengal" },
        { key: "C", text: "Uttarakhand" },
        { key: "D", text: "Madhya Pradesh" },
      ],
      correctOption: "D",
      explanation: "<p>Panna Biosphere Reserve is located in the state of Madhya Pradesh.</p>",
    },
    {
      text: "<p>Which is the smallest Biosphere reserve in India?</p>",
      options: [
        { key: "A", text: "Kachchh Biosphere Reserve" },
        { key: "B", text: "Gulf of Mannar Biosphere Reserve" },
        { key: "C", text: "Nokrek Biosphere Reserve" },
        { key: "D", text: "Dibru-Saikhowa Biosphere Reserve" },
      ],
      correctOption: "D",
      explanation: "<p>Dibru-Saikhowa in Assam is the smallest Biosphere Reserve in India with an area of 765 sq km.</p>",
    },
    {
      text: "<p>Khangchendzonga Biosphere Reserve is located in which state?</p>",
      options: [
        { key: "A", text: "Arunachal Pradesh" },
        { key: "B", text: "Sikkim" },
        { key: "C", text: "Uttarakhand" },
        { key: "D", text: "Meghalaya" },
      ],
      correctOption: "B",
      explanation: "<p>Khangchendzonga Biosphere Reserve is a National Park and a Biosphere reserve located in Sikkim, India.</p>",
    },
    {
      text: "<p>Nokrek Biosphere Reserve is located in which state of India?</p>",
      options: [
        { key: "A", text: "Kerala" },
        { key: "B", text: "Goa" },
        { key: "C", text: "Meghalaya" },
        { key: "D", text: "Gujarat" },
      ],
      correctOption: "C",
      explanation: "<p>Nokrek Biosphere Reserve is located in the West Garo Hills district of Meghalaya.</p>",
    },
  ];

  for (const q of biosphereQuestionsData) {
    const exists = await prisma.question.findFirst({
      where: {
        chapterId: biosphereChapter.id,
        questionText: { equals: q.text },
      },
    });

    if (!exists) {
      await prisma.question.create({
        data: {
          subjectId: subjectId,
          chapterId: biosphereChapter.id,
          questionText: q.text,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation,
          difficulty: "EASY",
          examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO"],
          isPYQ: false,
        },
      });
      console.log(`Inserted question: ${q.text.substring(0, 30)}...`);
    } else {
      console.log(`Question already exists: ${q.text.substring(0, 30)}...`);
    }
  }
}
