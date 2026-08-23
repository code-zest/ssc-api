import { PrismaClient } from "@prisma/client";

export async function seedAwardsAndHonours(prisma: PrismaClient, subjectId: string) {
  console.log("Seeding Chapter: Awards and Honours...");

  const chapterSlug = "awards-and-honours";
  const chapter = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId: subjectId, slug: chapterSlug } },
    update: {},
    create: {
      subjectId: subjectId,
      name: "Awards and Honours",
      slug: chapterSlug,
      description: "Important national and international awards and their associated fields.",
      isActive: true,
      order: 1,
    },
  });

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapter.id, slug: "awards-and-honours-notes" } },
    update: {},
    create: {
      chapterId: chapter.id,
      subjectId: subjectId,
      title: "Awards and Honours (Study Notes)",
      slug: "awards-and-honours-notes",
      type: "ARTICLE",
      articleHtml: `<h1>Awards and Honours - Static GK</h1>
<p>Awards and honours form a crucial part of the Static GK section in SSC exams. Below is a comprehensive list of major national and international awards and their associated fields.</p>

<FeatureList title="International Awards">
  <FeatureItem title="Nobel Prize">Awarded for outstanding contributions in Physics, Chemistry, Physiology or Medicine, Literature, Peace, and Economic Sciences.</FeatureItem>
  <FeatureItem title="Grammy Awards">Presented by the Recording Academy to recognize outstanding achievement in the <strong>Music</strong> industry.</FeatureItem>
  <FeatureItem title="Booker Prize">A literary award conferred each year for the best novel written in the English language and published in the UK and Ireland (<strong>Literature</strong>).</FeatureItem>
  <FeatureItem title="Abel Prize">Awarded annually by the King of Norway to one or more outstanding mathematicians (<strong>Mathematics</strong>).</FeatureItem>
  <FeatureItem title="Emmy Award">An American award that recognizes excellence in the <strong>Television</strong> industry.</FeatureItem>
  <FeatureItem title="Borlaug Award">Awarded for outstanding research and contributions in the field of <strong>Agriculture</strong>.</FeatureItem>
</FeatureList>

<FeatureList title="National Awards (India)">
  <FeatureItem title="Bharat Ratna">The highest civilian award of the Republic of India, awarded for exceptional service/performance of the highest order in any field of human endeavour.</FeatureItem>
  <FeatureItem title="Dada Saheb Phalke Award">India's highest award in the field of cinema (<strong>Film</strong>).</FeatureItem>
  <FeatureItem title="Shanti Swarup Bhatnagar Prize">A prestigious science award in India given annually by the CSIR (<strong>Science and Technology</strong>).</FeatureItem>
  <FeatureItem title="Dhanvantari Award">Presented to recognize excellence in <strong>Medical Sciences</strong>.</FeatureItem>
</FeatureList>

<FeatureList title="Sports Awards (India)">
  <FeatureItem title="Major Dhyan Chand Khel Ratna">The highest sporting honour of India (formerly known as the Rajiv Gandhi Khel Ratna).</FeatureItem>
  <FeatureItem title="Arjuna Award">Given to recognize <strong>outstanding performance in national sports</strong>.</FeatureItem>
  <FeatureItem title="Dronacharya Award">Awarded for excellence in sports coaching.</FeatureItem>
</FeatureList>

<FeatureList title="Gallantry Awards (India)">
  <FeatureItem title="Param Vir Chakra">India's <strong>highest military decoration</strong>, awarded for displaying distinguished acts of valour during wartime (in the presence of the enemy).</FeatureItem>
  <FeatureItem title="Ashoka Chakra">India's highest <strong>peacetime military decoration</strong> awarded for valour, courageous action, or self-sacrifice away from the battlefield (not in the presence of the enemy).</FeatureItem>
  <FeatureItem title="Maha Vir Chakra & Vir Chakra">Second and third highest wartime gallantry awards, respectively.</FeatureItem>
  <FeatureItem title="Kirti Chakra & Shaurya Chakra">Second and third highest peacetime gallantry awards, respectively.</FeatureItem>
</FeatureList>

<Callout variant="exam" title="Important for SSC Exams">
Questions regarding the fields associated with specific awards (e.g., Borlaug for Agriculture, Abel for Mathematics) appear frequently in SSC CGL, CHSL, and MTS exams. Memorize the distinctions between wartime and peacetime gallantry awards!
</Callout>`,
      accessTier: "FREE",
      isActive: true,
      order: 1,
    },
  });

  const questionsData = [
    {
      text: "<p>The Dada Saheb Phalke Award is associated with which of the following fields?</p>",
      options: [
        { key: "A", text: "Journalism" },
        { key: "B", text: "Literature" },
        { key: "C", text: "Film" },
        { key: "D", text: "Sports" },
      ],
      correctOption: "C",
      explanation: "<p>The Dadasaheb Phalke Award is India's highest award in the field of cinema (film).</p>",
    },
    {
      text: "<p>The Grammy Awards are given in the field of:</p>",
      options: [
        { key: "A", text: "Literature" },
        { key: "B", text: "Economics" },
        { key: "C", text: "Film" },
        { key: "D", text: "Music" },
      ],
      correctOption: "D",
      explanation: "<p>The Grammy Award is an award presented by the Recording Academy to recognize outstanding achievement in the music industry.</p>",
    },
    {
      text: "<p>'Shanti Swarup Bhatnagar Prize' is associated with:</p>",
      options: [
        { key: "A", text: "Maths" },
        { key: "B", text: "Science" },
        { key: "C", text: "Literature" },
        { key: "D", text: "Economics" },
      ],
      correctOption: "B",
      explanation: "<p>The Shanti Swarup Bhatnagar Prize for Science and Technology is a science award in India given annually by the CSIR.</p>",
    },
    {
      text: "<p>'Booker Prize' is given in which of the following fields?</p>",
      options: [
        { key: "A", text: "Sports" },
        { key: "B", text: "Film" },
        { key: "C", text: "Literature" },
        { key: "D", text: "Arts" },
      ],
      correctOption: "C",
      explanation: "<p>The Booker Prize is a literary award conferred each year for the best novel written in the English language and published in the UK and Ireland.</p>",
    },
    {
      text: "<p>The Abel Award is associated with:</p>",
      options: [
        { key: "A", text: "Science" },
        { key: "B", text: "Economics" },
        { key: "C", text: "Mathematics" },
        { key: "D", text: "History" },
      ],
      correctOption: "C",
      explanation: "<p>The Abel Prize is awarded annually by the King of Norway to one or more outstanding mathematicians.</p>",
    },
    {
      text: "<p>The Major Dhyan Chand Khel Ratna Award (formerly known as the Rajiv Gandhi Khel Ratna Award) is associated with which of the following fields?</p>",
      options: [
        { key: "A", text: "Economics" },
        { key: "B", text: "Agricultural" },
        { key: "C", text: "Medical" },
        { key: "D", text: "Sports" },
      ],
      correctOption: "D",
      explanation: "<p>It is the highest sporting honour of India.</p>",
    },
    {
      text: "<p>The Dhanwantri Award is given in the field of:</p>",
      options: [
        { key: "A", text: "Physical Science" },
        { key: "B", text: "Agricultural Science" },
        { key: "C", text: "Medical Science" },
        { key: "D", text: "Environment Science" },
      ],
      correctOption: "C",
      explanation: "<p>The Dhanvantari Award is presented to recognize excellence in medical sciences.</p>",
    },
    {
      text: "<p>'Emmy Award' is associated with which of the following fields?</p>",
      options: [
        { key: "A", text: "Journalism" },
        { key: "B", text: "Television" },
        { key: "C", text: "Poetry" },
        { key: "D", text: "Music" },
      ],
      correctOption: "B",
      explanation: "<p>An Emmy Award is an American award that recognizes excellence in the television industry.</p>",
    },
    {
      text: "<p>'Borlaug Award' is given in which of the following fields?</p>",
      options: [
        { key: "A", text: "Professors" },
        { key: "B", text: "Agriculture" },
        { key: "C", text: "Military Captains" },
        { key: "D", text: "Journalism" },
      ],
      correctOption: "B",
      explanation: "<p>The Borlaug Award is an award created by Coromandel International for outstanding research and contributions in the field of agriculture.</p>",
    },
    {
      text: "<p>Param Vir Chakra is associated with which of the following fields?</p>",
      options: [
        { key: "A", text: "Economics" },
        { key: "B", text: "Medical" },
        { key: "C", text: "Sports" },
        { key: "D", text: "Military Service" },
      ],
      correctOption: "D",
      explanation: "<p>It is awarded for military service.</p>",
    },
    {
      text: "<p>Which is the highest gallantry award in India?</p>",
      options: [
        { key: "A", text: "Param Vishishtat Seva Medal" },
        { key: "B", text: "Param Vir Chakra" },
        { key: "C", text: "Kirti Chakra" },
        { key: "D", text: "Vir Chakra" },
      ],
      correctOption: "B",
      explanation: "<p>The Param Vir Chakra (PVC) is India's highest military decoration, awarded for displaying distinguished acts of valour during wartime.</p>",
    },
    {
      text: "<p>'Ashoka Chakra' is awarded for:</p>",
      options: [
        { key: "A", text: "Acts of gallantry in the presence of enemy" },
        { key: "B", text: "Gallantry by children" },
        { key: "C", text: "Outstanding contribution to literature" },
        { key: "D", text: "The most conspicuous bravery or self sacrifice on land, air or sea but not in the presence of the enemy" },
      ],
      correctOption: "D",
      explanation: "<p>The Ashoka Chakra is India's highest peacetime military decoration awarded for valour, courageous action, or self-sacrifice away from the battlefield.</p>",
    },
    {
      text: "<p>Arjuna Award is given for:</p>",
      options: [
        { key: "A", text: "Exceptional service in emergency" },
        { key: "B", text: "Bravery on battlefield" },
        { key: "C", text: "Outstanding performance in sports" },
        { key: "D", text: "Outstanding contribution to literature" },
      ],
      correctOption: "C",
      explanation: "<p>The Arjuna Awards are given by the Ministry of Youth Affairs and Sports, Government of India to recognize outstanding achievement in national sports.</p>",
    },
  ];

  for (const q of questionsData) {
    const exists = await prisma.question.findFirst({
      where: { chapterId: chapter.id, questionText: { equals: q.text } },
    });

    if (!exists) {
      await prisma.question.create({
        data: {
          subjectId: subjectId,
          chapterId: chapter.id,
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
