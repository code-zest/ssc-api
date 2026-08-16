import { prisma } from "../src/config/prisma";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
<DefinitionBlock term="History">
The word derived from Greek language; in the Greek it’s called as **Historia**. It means research, enquiry and analysis.
In Telugu it’s called as **charitra**, the word derived from Sanskrit. In Sanskrit it is called as **chur**, it means behavior.
</DefinitionBlock>

<Callout variant="info" title="Principle of Uniformity">
Past is a key to the present. When we study the past and present, it helps to estimate the future. This is why we study history.
</Callout>

## Sources of History

- Bookish sources
- Numismatics
- Inscriptions
- Epic Stories
- Archaeological Department
- Carbon dating
- Oral sources
- Foreign Travelers
- Religious books

<Callout variant="exam" title="Key Historical Figures & Discoveries">
  <ul className="list-disc pl-5">
    <li>**Alexander Cunningham** is regarded as father of archaeological department.</li>
    <li>In **1861**, archaeological department established under the ministry of culture, Government of India. This time Governor General was **Lord Canning**.</li>
    <li>Carbon dating was discovered by **W.F. Libby** in **1947** for his work contribution; he received the Nobel Prize.</li>
    <li>Half life of carbon is **5568 years**.</li>
    <li>King Ashok inscriptions are translated into English by **James Prinsep**.</li>
    <li>**Indo-Bactrian** first released the coins in India.</li>
    <li>Father of History is regarded as **Herodotus**; he wrote a book called **History**.</li>
  </ul>
</Callout>

<DefinitionBlock term="Epigraphy">
Study of inscriptions is called Epigraphy.
</DefinitionBlock>

<DefinitionBlock term="Numismatics">
Study of coins is called Numismatics.
</DefinitionBlock>

## History Classification

<Timeline>
  <TimelineItem title="Pre-History">
    No written script or records existed.
  </TimelineItem>
  <TimelineItem title="Proto History">
    Written script existed but remains undeciphered.
  </TimelineItem>
  <TimelineItem title="Historical Age">
    Written script existed and has been deciphered.
  </TimelineItem>
</Timeline>

---

# Stone Age

The Stone Age is the prehistoric period. On the basis of geological age, the type and technology of stone tools, and subsistence base, the **Indian Stone Age is classified primarily into three types**:

<Timeline>
  <TimelineItem period="500,000 – 10,000 BCE" title="Palaeolithic age (Old Stone Age)"></TimelineItem>
  <TimelineItem period="10,000 – 6000 BCE" title="Mesolithic age (Late Stone Age)"></TimelineItem>
  <TimelineItem period="6000 – 1000 BCE" title="Neolithic age (New Stone Age)"></TimelineItem>
  <TimelineItem period="3000 – 500 BCE" title="Chalcolithic Period (Stone Copper Age)"></TimelineItem>
  <TimelineItem period="1500 – 200 BCE" title="Iron Age"></TimelineItem>
</Timeline>

## Palaeolithic Age (Old Stone Age)

The term **Palaeolithic** is derived from the Greek word **‘palaeo’**, which means old, and **‘lithic’**, meaning stone. Therefore, the term Palaeolithic age refers to the old stone age.

### Main characteristics
- The Indian people are believed to have belonged to the **‘Negrito’ race**, and lived in the open air, river valleys, caves and rock shelters.
- They were food gatherers, ate wild fruits and vegetables, and lived on hunting.
- There was no knowledge of houses, pottery, agriculture. It was only in later stages they discovered fire.
- In the upper Palaeolithic age, there is evidence of art in the form of paintings.
- Humans used unpolished, rough stones like hand axes, choppers, blades, burins and scrapers.

### Classification of Palaeolithic age

<Timeline>
  <TimelineItem period="up to 100,000 BC" title="Lower Palaeolithic Age">
    <ul className="list-disc pl-5">
      <li>It covers the greater part of the Ice Age.</li>
      <li>Hunters and food gatherers; tools used were **hand axes, choppers and cleavers**.</li>
      <li>Tools were rough and heavy. Limestone was also used to make tools.</li>
      <li>One of the earliest sites is **Bori in Maharashtra**.</li>
      <li>Important habitation sites include caves and rock shelters like **Bhimbetka in Madhya Pradesh**.</li>
    </ul>
  </TimelineItem>
  
  <TimelineItem period="100,000 BC – 40,000 BC" title="Middle Palaeolithic Age">
    <ul className="list-disc pl-5">
      <li>Tools used were **flakes, blades, pointers, scrapers and borers**.</li>
      <li>The tools were smaller, lighter and thinner.</li>
      <li>Decrease in the use of hand axes with respect to other tools.</li>
      <li>Important sites: Belan Valley in UP, Luni Valley (Rajasthan).</li>
    </ul>
  </TimelineItem>
  
  <TimelineItem period="40,000 BC – 10,000 BC" title="Upper Palaeolithic Age">
    <ul className="list-disc pl-5">
      <li>Coincided with the last phase of the Ice Age when the climate became comparatively warmer and less humid.</li>
      <li>**Emergence of Homo sapiens**.</li>
      <li>Innovation in tools and technology: bone tools, needles, harpoons, parallel-sided blades.</li>
      <li>Bone tools found at cave sites of **Kurnool and Muchchatla Chintamani Gavi** in Andhra Pradesh.</li>
    </ul>
  </TimelineItem>
</Timeline>

---

## Mesolithic Period (Middle Stone Age)

<DefinitionBlock term="Mesolithic">
Derived from two Greek words – **‘meso’** (middle) and **‘lithic’** (stone).
</DefinitionBlock>

Both Mesolithic and Neolithic phases belong to the **Holocene era**. In this era, there was a rise in temperature which resulted in melting of ice and changes in flora and fauna.

### Characteristic Features
- The people of this era believed in life after death and buried the dead with food items and other goods.
- Started to wear clothes made of animal skin.

<Callout variant="tip" title="Microliths">
The characteristic tools were **microliths** – miniature stone tools of geometrical and non-geometrical shapes. These enabled the Mesolithic man to hunt smaller animals and birds.
</Callout>

<FeatureList title="Important Mesolithic Sites">
  <FeatureItem title="Bagor" subtitle="Rajasthan">
    One of the biggest and best-documented sites.
  </FeatureItem>
  <FeatureItem title="Adamgarh" subtitle="Madhya Pradesh">
    Provides the earliest evidence for the domestication of animals.
  </FeatureItem>
  <FeatureItem title="Bhimbetka" subtitle="Madhya Pradesh">
    Famous for Mesolithic rock art (one of ~150 such sites across India).
  </FeatureItem>
  <FeatureItem title="Langhnaj" subtitle="Gujarat">
    Major regional Mesolithic habitation site.
  </FeatureItem>
  <FeatureItem title="Biharanpur" subtitle="West Bengal">
    Major regional Mesolithic habitation site.
  </FeatureItem>
</FeatureList>

---

## Neolithic Period (New Stone Age)

Termed as **‘Neolithic revolution’** since it introduced important changes in social and economic life. It saw man turning into a **food producer from food gatherer**.

### Characteristic Features
- **Tools:** Used microlithic blades in addition to polished stones (celts) and tools made of bones (needles, scrapers, arrowheads).
- **Agriculture:** Cultivated land and grew fruits and corn like **ragi and horse gram (kulati)**. Domesticated cattle, sheep and goats.
- **Pottery:** With agriculture, people required to store food grains. Pottery appeared on a large scale (greyware, black-burnished ware).
- **Housing:** Lived in rectangular or circular houses made of mud and reeds.

<FeatureList title="Important Neolithic Sites">
  <FeatureItem title="Koldihwa & Mahagara" subtitle="Uttar Pradesh">
    Evidence of circular huts; oldest evidence of rice in the world.
  </FeatureItem>
  <FeatureItem title="Mehrgarh" subtitle="Balochistan">
    Earliest Neolithic site; cultivated crops like cotton and wheat.
  </FeatureItem>
  <FeatureItem title="Burzahom" subtitle="Kashmir">
    Pit dwellings; domestic dogs buried with masters.
  </FeatureItem>
  <FeatureItem title="Gufkral" subtitle="Kashmir">
    Famous for pit dwellings, stone tools, and graveyards in houses.
  </FeatureItem>
  <FeatureItem title="Chirand" subtitle="Bihar">
    Abundant tools and weapons made of bones.
  </FeatureItem>
  <FeatureItem title="Belan Valley" subtitle="Uttar Pradesh">
    All three phases (Palaeolithic, Mesolithic, Neolithic) found in sequence.
  </FeatureItem>
</FeatureList>

---

## Chalcolithic Age (Stone Copper Age)

Marked the emergence of the use of metal along with stone tools. The first metal to be used was **copper**.

<FeatureList title="Important Chalcolithic Sites">
  <FeatureItem title="Ahar" subtitle="Banas Valley">
    Practised smelting and metallurgy, supplied copper tools.
  </FeatureItem>
  <FeatureItem title="Daimabad" subtitle="Maharashtra">
    Largest Jorwe culture site in Godavari valley; Bronze goods found.
  </FeatureItem>
  <FeatureItem title="Malwa" subtitle="Madhya Pradesh">
    Richest Chalcolithic ceramics, spindle whorls.
  </FeatureItem>
  <FeatureItem title="Navdatoli" subtitle="On Narmada">
    Largest Chalcolithic settlements in the country.
  </FeatureItem>
</FeatureList>

`;

const QUESTIONS = [
  {
    questionText: "The earliest evidence of rice cultivation comes from which among the following valleys?",
    options: [
      { key: "A", text: "Central Ganga Valley" },
      { key: "B", text: "Belan Valley" },
      { key: "C", text: "Gomal Valley" },
      { key: "D", text: "Bolan Valley" },
    ],
    correctOption: "B", 
  },
  {
    questionText: "Who among the following is known as the father of Indian Prehistory?",
    options: [
      { key: "A", text: "Robert Bruce Foote" },
      { key: "B", text: "Sir William Jones" },
      { key: "C", text: "E.J.H. Mackey" },
      { key: "D", text: "Sir John Marshall" },
    ],
    correctOption: "A",
  },
  {
    questionText: "Which among the following was the main occupation of Palaeolithic (Old Stone) people?",
    options: [
      { key: "A", text: "Agriculture" },
      { key: "B", text: "Farming" },
      { key: "C", text: "Hunting" },
      { key: "D", text: "Fishing" },
    ],
    correctOption: "C",
  },
  {
    questionText: "At which of the following sites, all the Palaeolithic, Mesolithic and Neolithic sites have been found in sequence?",
    options: [
      { key: "A", text: "Sarai Nahar Rai" },
      { key: "B", text: "Kurnool Valley" },
      { key: "C", text: "Belan Valley" },
      { key: "D", text: "Ahar" },
    ],
    correctOption: "C",
  },
  {
    questionText: "The Gufkral prehistoric site is located in which state / Union Territory of India?",
    options: [
      { key: "A", text: "Rajasthan" },
      { key: "B", text: "Jammu & Kashmir" },
      { key: "C", text: "Karnataka" },
      { key: "D", text: "Uttarakhand" },
    ],
    correctOption: "B",
  },
  {
    questionText: "Epigraphy refers to:",
    options: [
      { key: "A", text: "Study of coins" },
      { key: "B", text: "Study of inscriptions" },
      { key: "C", text: "Study of epics" },
      { key: "D", text: "Study of geography" },
    ],
    correctOption: "B",
  },
  {
    questionText: "Study of coins is called as:",
    options: [
      { key: "A", text: "Numismatics" },
      { key: "B", text: "Epigraphy" },
      { key: "C", text: "Paleontology" },
      { key: "D", text: "Coinology" },
    ],
    correctOption: "A",
  },
  {
    questionText: "Which among the following type of people uses color pots, small and sharp tools?",
    options: [
      { key: "A", text: "Paleolithic" },
      { key: "B", text: "Mesolithic" },
      { key: "C", text: "Neolithic" },
      { key: "D", text: "None of the above" },
    ],
    correctOption: "C",
  },
  {
    questionText: "Modern people came from which among the following group?",
    options: [
      { key: "A", text: "Homo sapiens" },
      { key: "B", text: "Neanderthals" },
      { key: "C", text: "Dryopithecus" },
      { key: "D", text: "Ramapithecus" },
    ],
    correctOption: "A",
  },
  {
    questionText: "First humans appeared on Earth approximately 300,000 years ago in which continent?",
    options: [
      { key: "A", text: "Africa" },
      { key: "B", text: "America" },
      { key: "C", text: "Australia" },
      { key: "D", text: "Europe" },
    ],
    correctOption: "A",
  },
];

async function main() {
  console.log("Seeding Pre-Historic Culture Content...");

  // 1. Find the Subject and Chapter
  const subject = await prisma.subject.findUnique({ where: { slug: "indian-history" } });
  if (!subject) {
    throw new Error("Indian History subject not found! Run the main seed script first.");
  }

  const chapter = await prisma.chapter.findUnique({
    where: {
      subjectId_slug: { subjectId: subject.id, slug: "pre-historic-culture" },
    },
  });

  if (!chapter) {
    throw new Error("Pre-Historic Culture chapter not found! Run the main seed script first.");
  }

  // 2. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapter.id, slug: "theory" },
    },
    update: {
      title: "Pre-Historic Culture",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapter.id,
      subjectId: subject.id,
      title: "Pre-Historic Culture",
      slug: "theory",
      type: LessonType.ARTICLE,
      articleHtml: ARTICLE_HTML,
      order: 1,
      accessTier: "FREE",
      isActive: true,
    },
  });
  console.log("✅ Seeded Theory Article Lesson");

  // 3. Create Questions
  console.log("Seeding MCQs...");
  let count = 0;
  for (const q of QUESTIONS) {
    // Check if question exists (to prevent duplicates, we can check by exact text)
    const existing = await prisma.question.findFirst({
      where: {
        chapterId: chapter.id,
        questionText: q.questionText,
      },
    });

    if (!existing) {
      await prisma.question.create({
        data: {
          subjectId: subject.id,
          chapterId: chapter.id,
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

  // 4. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-prehistoric-ps" }, // We don't have a unique constraint, but upsert needs a unique field. We'll use id if we set it.
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-prehistoric-ps", // Force a deterministic ID
      title: "Pre-Historic Culture Practice Quiz",
      subjectId: subject.id,
      chapterId: chapter.id,
      questionCount: QUESTIONS.length,
      accessTier: "FREE",
      order: 1,
      isActive: true,
    }
  });

  // Fetch all questions for this chapter to link them
  const allChapterQuestions = await prisma.question.findMany({
    where: { chapterId: chapter.id }
  });

  for (let i = 0; i < allChapterQuestions.length; i++) {
    await prisma.practiceSetQuestion.upsert({
      where: {
        practiceSetId_questionId: {
          practiceSetId: practiceSet.id,
          questionId: allChapterQuestions[i].id
        }
      },
      update: { order: i + 1 },
      create: {
        practiceSetId: practiceSet.id,
        questionId: allChapterQuestions[i].id,
        order: i + 1
      }
    });
  }

  console.log("✅ Seeded Practice Set!");
  console.log("🎉 Successfully seeded Pre-Historic Culture content!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
