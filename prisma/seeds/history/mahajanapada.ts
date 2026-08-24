import { PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# 5. Mahajanapada - Rise of Magadha Empire

## Mahajanapadas
- Buddhist literature *Angutara Nikaya* gives a list of 16 great kingdoms or Mahajanapadas in the beginning of 6th century B.C.
- Major reason for the formation of Janapadas was the use of Iron tools for agricultural & military purposes.
- In course of time small or weak kingdoms either submitted to stronger rulers or got eliminated. Finally in 6th century BC only 4 major kingdoms survived:
  1. Vatsa
  2. Avanti
  3. Magadha
  4. Kosala

### Vatsa
- Shifted kuru clan with capital Kaushambi.
- Most powerful ruler was Udayana.
- After his death Vatsa was annexed to Avanti.

### Avanti
- Most important ruler was Pradyota.
- Patronized Buddhism.
- Finally was annexed to Magadha.

### Kosala
- Most famous ruler was Prasenjit whose sister was married to Bimbisara.
- Prasenjit gave Kasi as dowry to Magadha.
- After his death Kosala became part of Magadha.

### Magadha
- Famous rulers were Bimbisara, Ajatashatru (Haryankas), Shishunaga, and Nandas.
- Most powerful kingdom of north India & founded by Jarasangha.

---

## The 16 Mahajanapadas and their Capitals

| S.NO | Mahajanapadas | Capital |
|---|---|---|
| 1 | Kamboja | Rajpura |
| 2 | Gandhar | Taxila |
| 3 | Surasena | Mathura |
| 4 | Matsya | Virat |
| 5 | Vatsa | Kaushambi |
| 6 | Chedis | Shuktimati |
| 7 | Kasi | Varanasi |
| 8 | Avanti | Ujjain & Mahismati |
| 9 | Kuru | Hatinapur & Indraprastha |
| 10 | Panchala | Kampilya & Ahichattra |
| 11 | Kosala | Ayodhya & Sravasti |
| 12 | Mallas | Pava & Kusinagar |
| 13 | Vajjis | Vaishali |
| 14 | Anga | Champa |
| 15 | Magadha | Rajgir |
| 16 | Ashmaka | Potana |

---

# Rise of Magadha
The Magadha Kingdom was ruled by 3 dynasties:
1. Haryanka Dynasty
2. Naga Dynasty
3. Nanda Dynasty

### 1) Haryanka Dynasty

<FeatureList title="Rulers of Haryanka Dynasty">
  <FeatureItem title="Bimbisara (546 - 494 BC)">
    Contemporary of both Buddhism & Jainism. Set up his capital at Rajgir (Known as Girivraja). Strengthened his position by marriage alliances (Kosala, Lichhavi (Vaishali) & Madra clan (Punjab)). Acquired Anga under the viceroyalty of Ajatashatru (Born of Lichhavi Princess). Fought with Pradyota of Avanti but later became friends.
  </FeatureItem>
  <FeatureItem title="Ajatashatru">
    Killed his father & succeeded to the throne. Fought with Kosala & Vaishali (Lichhavis – destroyed it in 16 years) & won both wars. Embraced Buddhism & laid the foundation for the 1st Buddhist council at Rajgir.
  </FeatureItem>
  <FeatureItem title="Udayin">
    Successor of Ajatashatru. Founded the new capital at Pataliputra. His death marked the end of the Haryanka dynasty.
  </FeatureItem>
</FeatureList>

### 2) Naga Dynasty

<FeatureList title="Rulers of Naga Dynasty">
  <FeatureItem title="Shishunagas">
    Temporarily shifted the capital to Vaishali. Defeated Avanti & brought an end to the 100-year-old rivalry. Transferred the capital from Vaishali to Patliputra.
  </FeatureItem>
</FeatureList>

### 3) Nanda Dynasty

<FeatureList title="Rulers of Nanda Dynasty">
  <FeatureItem title="Mahapadmananda">
    Known as Ekarat (sole king who destroyed others). Conquered Kalinga & brought the image of Jina as a trophy. Hathigumpha inscription of Kharavela King (Kalinga) refers to the conquest of Kalinga by Nandas.
  </FeatureItem>
  <FeatureItem title="Dhanananda">
    Last ruler of Nanda dynasty. During his reign, Alexander invaded India but did not move ahead to the east (Nanda's Power). Chandragupta Maurya & Kautilya overthrew him as his oppressive way of tax collection was already resented by people.
  </FeatureItem>
</FeatureList>

---

## Cause of Magadha's Success
- Advantageous geographical position & rich iron ores of Rajgir.
- Capitals: Rajgir (Surrounded by 5 hills) + Patliputra (Surrounded by Ganga, Gandhak, Son & Ghagra river -> True Jaladurga).
- Magadha -> 1st used elephants in war against enemies.

---

# Foreign Invasion

### 2) Alexander's Invasion (327 BC)
- After 2 centuries of Persian invasion, Alexander from Macedonia invaded India. Alexander conquered minor Asia along with Iraq & Iran and from Iran he marched into India.
- Alexander conquered the whole of Persia by defeating Darius 3 in the battle of Arabela (330 BC).
- Herodotus, Father of history, wrote that the fabulous wealth of India attracted Alexander & moreover his interest in Geographical enquiry & love of natural history urged him to invade India.
- Alexander believed that on the eastern side of India lies the continuation of the sea & hence by conquering India, he would conquer the eastern boundary of the world.
- After the conquest of Iran, he marched into India through the **Khyber pass** (327 BC) & crossed the Indus in 326 BC.
- Ambhi, the ruler of Taxila readily submitted to him but **Porus** whose kingdom lay between Jhelum & Chenab refused to submit to Alexander.

### Battle of Hydaspes (Jhelum)
- Although Porus had a vast army & fought bravely, he lost to Alexander.
- Alexander, impressed by the bravery of the Indian prince reinstated him to his throne and made him his ally.
- Then he advanced as far as the river Beas, he wanted to move further but his war-weary, diseased Greek soldiers refused to move further due to the hot weather of India, 10 years of continuous fighting, and the enormous power of the Nandas of Magadha.
- Hence, Alexander divided his conquered territories into 3 Parts & placed them under 3 Greek governors.

## Effect of Alexander's Invasion
- 1st contact b/w Europe & India paved the way for increased trade & commerce.
- Encouraged political unification of India under the Mauryas.
- Alexander's authority in the Indus valley was short-lived because of the expansion of the Mauryan Empire under Chandragupta Maurya.
`;

const QUESTIONS = [
  {
    questionText: "Which was the first ruler responsible for the rise of Magadha?",
    options: [
      { key: "A", text: "Bindusara" },
      { key: "B", text: "Ajatashatru" },
      { key: "C", text: "Bimbisara" },
      { key: "D", text: "Vasudeva" },
    ],
    correctOption: "C",
  },
  {
    questionText: "Name the kingdom which first used elephants in wars?",
    options: [
      { key: "A", text: "Kosala" },
      { key: "B", text: "Magadha" },
      { key: "C", text: "Champa" },
      { key: "D", text: "Avanti" },
    ],
    correctOption: "B",
  },
  {
    questionText: "How many great powers (Mahajanpadas) existed in the 7th and early 6th centuries BC, during the lifetime of Lord Gautam Buddha?",
    options: [
      { key: "A", text: "16" },
      { key: "B", text: "13" },
      { key: "C", text: "11" },
      { key: "D", text: "17" },
    ],
    correctOption: "A",
  },
  {
    questionText: "Who among the following wrote the basic text of Vaisheshika philosophy?",
    options: [
      { key: "A", text: "Canada" },
      { key: "B", text: "Shankaracharya" },
      { key: "C", text: "Patanjali" },
      { key: "D", text: "Jaimini" },
    ],
    correctOption: "A",
  },
  {
    questionText: "Which of the following is NOT one of the monarchical states that existed in the 7th and early 6th centuries BC in India?",
    options: [
      { key: "A", text: "Magadha" },
      { key: "B", text: "Vaishali" },
      { key: "C", text: "Avanti" },
      { key: "D", text: "Kosala" },
    ],
    correctOption: "B",
  },
  {
    questionText: "Ajatashatru, a ruler of the Haryanka Dynasty, was the son of _______",
    options: [
      { key: "A", text: "Udayin" },
      { key: "B", text: "Anurudha" },
      { key: "C", text: "Bimbisara" },
      { key: "D", text: "Naga-Dasak" },
    ],
    correctOption: "C",
  },
  {
    questionText: "The first ruler of Magadha from the Haryanka dynasty was _______.",
    options: [
      { key: "A", text: "Ashoka" },
      { key: "B", text: "Prasenajit" },
      { key: "C", text: "Bimbisara" },
      { key: "D", text: "Ajatshatru" },
    ],
    correctOption: "C",
  },
  {
    questionText: "_______ was the capital of Magadha before the 4th century BCE.",
    options: [
      { key: "A", text: "Rajagriha" },
      { key: "B", text: "Pataliputra" },
      { key: "C", text: "Varanasi" },
      { key: "D", text: "Mathura" },
    ],
    correctOption: "A",
  },
  {
    questionText: "In the 4th century BCE, the capital of Magadha was shifted to _______",
    options: [
      { key: "A", text: "Mathura" },
      { key: "B", text: "Varanasi" },
      { key: "C", text: "Panipat" },
      { key: "D", text: "Pataliputra" },
    ],
    correctOption: "D",
  },
  {
    questionText: "According to the Jain Philosophy, the term 'Jina' means_______",
    options: [
      { key: "A", text: "lord." },
      { key: "B", text: "the conqueror" },
      { key: "C", text: "worthy" },
      { key: "D", text: "free from fetters" },
    ],
    correctOption: "B",
  },
];

export async function seedMahajanapada(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Mahajanapada Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Mahajanapada - Rise of Magadha Empire",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Mahajanapada - Rise of Magadha Empire",
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
    where: { id: "seed-mahajanapada-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-mahajanapada-ps",
      title: "Mahajanapada & Magadha Empire Practice Quiz",
      subjectId: subjectId,
      chapterId: chapterId,
      questionCount: QUESTIONS.length,
      accessTier: "FREE",
      order: 1,
      isActive: true,
    }
  });

  // Fetch all questions for this chapter to link them
  const allChapterQuestions = await prisma.question.findMany({
    where: { chapterId: chapterId },
    orderBy: { createdAt: 'asc' }
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
  console.log("🎉 Successfully seeded Mahajanapada content!");
}
