import { PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# Indus Valley Civilization / Harappan Civilization

<DefinitionBlock term="Timeline">
  The Indus Valley Civilization was established around 3300 BC.
  It flourished between 2700 BC and 1900 BC (Mature Indus Valley Civilization).
  It started declining around 1900 BC and disappeared around 1400 BC.
</DefinitionBlock>

<Callout variant="info" title="First Evidence of Cotton">
  Pre-Harappan civilization has been found at Mehrgarh, Pakistan which shows the first evidence of cotton cultivation.
</Callout>

## Dimensions
- **West:** Sutkagengor (In Baluchistan)
- **East:** Alamgirpur (Western UP)
- **North:** Mandu (Jammu)
- **South:** Daimabad (Ahmednagar, Maharashtra)

*Note: Some Indus Valley sites have also been found in as far away as Afghanistan and Turkmenistan.*

## Contemporary Civilizations

| S.NO | Civilizations | River | Countries |
|---|---|---|---|
| 1 | Mesopotamian | Tigris and Euphrates | Iraq and Kuwait |
| 2 | Egyptian | Great Nile | Egypt |
| 3 | Indus Valley | Indus River | India and Pakistan |
| 4 | Chinese | Huang Ho | China |

## Important Sites In India & Pakistan

<FeatureList title="Key Archaeological Sites">
  <FeatureItem title="Harappa (1921)" subtitle="Discovered by Dayaram Sahni">
    Located on the river Ravi in Punjab, Pakistan. Known for Cemetery H & R37, Coffin burial, Granary outside the fort, Phallus worship, Graveyard, Mother goddess.
  </FeatureItem>
  <FeatureItem title="Mohenjodaro (1922-23)" subtitle="Discovered by R.D. Banerjee">
    Located on the Indus River in Sindh, Pakistan. Known for Prepared Garments, Temple like Palace, Pashupati seal, Statue of a dancing girl, Ivory weight balance, The Great Bath, The Great Granary, Priest king statue.
  </FeatureItem>
  <FeatureItem title="Chanhudaro (1931-35)" subtitle="Discovered by R.C. Majumdar">
    Located on the Indus River in Sindh, Pakistan. Known for Bangle factory, Ink pot, Only city without citadel, Carts with seated driver.
  </FeatureItem>
  <FeatureItem title="Lothal (1954)" subtitle="Discovered by S.R. Rao">
    Located on the Gulf of Khambe in Gujarat, India. Known as a Port Town. Evidence of Rice, Fire Altar, Graveyard, Ivory weight balance, Copper dog.
  </FeatureItem>
  <FeatureItem title="Kalibangan (1953-61)" subtitle="Discovered by Gosh, Lal, Thapar">
    Located on the Ghaggar River in Rajasthan, India. Known for Lower fortified town, Fire Altar, Boustrophedon style, Wooden drainage, Copper ox, Evidence of earthquake, Wooden plough, Camel's bone.
  </FeatureItem>
  <FeatureItem title="Banawali (1973-74)" subtitle="Discovered by R.S. Bist">
    Located on the Saraswathi River in Haryana, India. Known for Oval shaped settlement, Only city with radial streets, Toy plough, Largest number of barley grains.
  </FeatureItem>
  <FeatureItem title="Dholavira (1991-92)" subtitle="Discovered by Joshi and Bist">
    Located in Gujarat, India. Only site to be divided into three parts. Known for Giant water reservoir, Unique water harnessing system, Dams, Embankments, A stadium, Rock-cut architecture.
  </FeatureItem>
  <FeatureItem title="Surkotada (1964)" subtitle="Discovered by Joshi">
    Located in Rann of Kutch, Gujarat, India. Known for Horse bone, Stone covered grave.
  </FeatureItem>
  <FeatureItem title="Ropar" subtitle="">
    Buildings made of stone and soil. Dog buried with humans. One inscribed steatite seal with typical Indus pictographs. Oval pit burials.
  </FeatureItem>
  <FeatureItem title="Daimabad" subtitle="Maha Rashtra, India">
    Known for Bronze Buffalo.
  </FeatureItem>
</FeatureList>

## Economy & Society

### Agriculture
- Agriculture was the most important occupation. The first civilization to cultivate cotton.
- Animals were domesticated like sheep, goats and pigs.
- Crops were wheat, barley, cotton, ragi, dates and peas.

### Trade
- Trade was conducted with the Sumerians.
- Metal products were produced including those with copper, bronze, tin and lead.
- Gold and silver were also known. **Iron was not known to them.**

### Religion
- No structures like temples or palaces have been found.
- The people worshipped male and female deities.
- A seal which was named 'Pashupati Seal' has been excavated and it shows an image of a three-eyed figure (Marshall believed this to be an early form of Lord Shiva).

<Callout variant="tip" title="Important Notes">
  <ul className="list-disc pl-5">
    <li>The civilization was 1st discovered during an excavation campaign under Sir John Hubert Marshall in 1921-22 at Harappa.</li>
    <li>Excellent pieces of red pottery designed in black have been excavated.</li>
    <li>Faience was used to make beads, bangles, earrings and vessels.</li>
    <li>A statuette named 'Dancing Girl' has been found from Mohenjodaro and is believed to be 4000 years old.</li>
    <li>Important God: Ammatalli (Mother Goddess), Pasupati surrounded by tiger, elephant, Rhinoceros and buffalo.</li>
    <li>**They didn't know horse**, however horse evidence are found in Surkotada.</li>
  </ul>
</Callout>

## Characteristics
- Town Planning
- Public places
- Great Bath
- Great Granary
- Social structure

## Cause of the Decline
- People moved eastwards and cities were abandoned.
- Writing and trade declined.
- Mortimer Wheeler suggested that Aryans invasion led to the decline of the Indus Valley.
- Tectonic movements and floods caused the decline.
- A change in the course of the river Indus caused its decline.
- Drying up of rivers, deforestation and a destruction of the green cover.
`;

const QUESTIONS = [
  {
    questionText:
      "Which of the following domesticated animals was NOT present in the terracotta figurines of the Indus Valley Civilization?",
    options: [
      { key: "A", text: "Buffalo" },
      { key: "B", text: "Sheep" },
      { key: "C", text: "Cow" },
      { key: "D", text: "Pig" },
    ],
    correctOption: "C",
  },
  {
    questionText: "The houses in the Indus Valley were made of?",
    options: [
      { key: "A", text: "Bricks" },
      { key: "B", text: "Bamboo" },
      { key: "C", text: "Stone" },
      { key: "D", text: "Wood" },
    ],
    correctOption: "A",
  },
  {
    questionText: "The inhabitants of Harappa were-",
    options: [
      { key: "A", text: "Rural" },
      { key: "B", text: "Urban" },
      { key: "C", text: "Nomadic" },
      { key: "D", text: "Tribal" },
    ],
    correctOption: "B",
  },
  {
    questionText:
      "The Harappan people were the first to produce which of the following?",
    options: [
      { key: "A", text: "Coins" },
      { key: "B", text: "Bronze tools" },
      { key: "C", text: "Cotton" },
      { key: "D", text: "Barley" },
    ],
    correctOption: "C",
  },
  {
    questionText: "The Harappan civilization belonged to which age?",
    options: [
      { key: "A", text: "Bronze Age" },
      { key: "B", text: "Neolithic Age" },
      { key: "C", text: "Paleolithic Age" },
      { key: "D", text: "Iron Age" },
    ],
    correctOption: "A",
  },
  {
    questionText: "What was the script of the Indus Valley Civilization?",
    options: [
      { key: "A", text: "Tamil" },
      { key: "B", text: "Kharosthi" },
      { key: "C", text: "Unknown" },
      { key: "D", text: "Brahmi" },
    ],
    correctOption: "C",
  },
  {
    questionText: "The first ancient city discovered in India was?",
    options: [
      { key: "A", text: "Harappa" },
      { key: "B", text: "Punjab" },
      { key: "C", text: "Mohenjo-daro" },
      { key: "D", text: "Sing" },
    ],
    correctOption: "A",
  },
  {
    questionText:
      "Who among the following is NOT associated with the study of Harappan culture?",
    options: [
      { key: "A", text: "Charles Masson" },
      { key: "B", text: "Cunningham" },
      { key: "C", text: "M. Wheeler" },
      { key: "D", text: "P. S. Vats" },
    ],
    correctOption: "D",
  },
  {
    questionText:
      "The discovery of measuring scales proved that the Indus Valley people were familiar with measurement and weighing. Where was this discovery made?",
    options: [
      { key: "A", text: "Kalibangan" },
      { key: "B", text: "Harappa" },
      { key: "C", text: "Chanhudaro" },
      { key: "D", text: "Lothal" },
    ],
    correctOption: "D",
  },
  {
    questionText:
      "One of the most significant sculptures of the Indus Valley Civilization was?",
    options: [
      { key: "A", text: "Nataraja" },
      { key: "B", text: "Dancing girl" },
      { key: "C", text: "Buddha" },
      { key: "D", text: "Narasimha" },
    ],
    correctOption: "B",
  },
];

export async function seedIndusValley(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Indus Valley Civilization Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Indus Valley Civilization",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Indus Valley Civilization",
      slug: "theory",
      type: LessonType.ARTICLE,
      articleHtml: ARTICLE_HTML,
      order: 1,
      accessTier: "FREE",
      isActive: true,
    },
  });
  console.log("✅ Seeded Theory Article Lesson");

  // 2. Create Questions
  console.log("Seeding MCQs...");
  let count = 0;
  for (const q of QUESTIONS) {
    const existing = await prisma.question.findFirst({
      where: {
        chapterId: chapterId,
        questionText: q.questionText,
      },
    });

    if (!existing) {
      await prisma.question.create({
        data: {
          subjectId: subjectId,
          chapterId: chapterId,
          questionText: q.questionText,
          options: q.options,
          correctOption: q.correctOption,
          difficulty: Difficulty.MEDIUM,
          examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"],
          isActive: true,
          tags: ["History", "Ancient History"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-indus-valley-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-indus-valley-ps",
      title: "Indus Valley Civilization Practice Quiz",
      subjectId: subjectId,
      chapterId: chapterId,
      questionCount: QUESTIONS.length,
      accessTier: "FREE",
      order: 1,
      isActive: true,
    },
  });

  // Fetch all questions for this chapter to link them
  const allChapterQuestions = await prisma.question.findMany({
    where: { chapterId: chapterId },
    orderBy: { createdAt: "asc" },
  });

  for (let i = 0; i < allChapterQuestions.length; i++) {
    await prisma.practiceSetQuestion.upsert({
      where: {
        practiceSetId_questionId: {
          practiceSetId: practiceSet.id,
          questionId: allChapterQuestions[i].id,
        },
      },
      update: { order: i + 1 },
      create: {
        practiceSetId: practiceSet.id,
        questionId: allChapterQuestions[i].id,
        order: i + 1,
      },
    });
  }

  console.log("✅ Seeded Practice Set!");
  console.log("🎉 Successfully seeded Indus Valley Civilization content!");
}
