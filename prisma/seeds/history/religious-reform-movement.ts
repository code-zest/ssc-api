import { PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# Religious Reform Movement - Jainism & Buddhism

<DefinitionBlock term="Teaching of Jainism">
  Rejected the authority of Vedas & objected to Vedic rituals & sacrifices. Even the practice of agriculture was considered sinful as it caused injury to earth, worms & animals. 
</DefinitionBlock>

- Doctrine of asceticism & renunciation was carried to great lengths by practice of starvation, Nudity & other forms of self-torture (Penance for all sins committed).
- Although Parvanath (23rd Teacher) asked people to cover their upper & lower body part, Mahavira asked them to discard clothes altogether (Extreme austerity).
- Mahavira did not condemn Varna system as Buddhism did. According to Mahavira, a person born in a higher or lower varna is the consequence of the sins of past life.
- Jainism mainly aimed at the freedom of Individual from worldly bonds.

### Spread of Jainism
- Admitted both women and shudras in its order of followers.
- Used Prakrit (common language) for preaching instead of Sanskrit.
- 200 years after the death of Mahavira, there was a serious famine in Ganga valley. Many Jain followers led by Chandragupta Maurya & Bhadrabahu left for south (Karnataka) & rest stayed back under the leadership of Sthalbahu. Emigrants spread Jainism in south India.
- Meanwhile, Sthalbahu changed the code of conduct for the monks which led to the division of Jainism into 2 sects: **Swetambars** (White clad / Northerners) & **Digambars** (Naked / Sky Clad / Southerners).
- 1st Jain council was held at Pataliputra led by Sthalbahu & 2nd was held at Valabhi where 12 Anagas of Swetambars were finally compiled.

---

# Buddhism

<DefinitionBlock term="Origins">
  Founded by Gautam Buddha (Original Name → Siddhartha). Born in 563 BC at Lumbini in Nepal near Kapilavastu (As a kshatriya in Shakya clan). Parents → Suddhodhana & Mahamaya.
</DefinitionBlock>

- Left Home at the age of 29 in search of truth & did intense penance & meditation.
- Attained Nirvana under a Pipal tree at Bodh Gaya & henceforth known as Buddha (The enlightened one).
- Delivered his 1st sermon at Sarnath (Banaras) & died at the age of 80 at Kushinagar (U.P).

### Noble Truths by Buddha:
1. World is full of sorrow.
2. People suffer on account of desires.
3. If desires are conquered, Nirvana can be achieved (i.e., free from the cycle of birth & death).
4. Ashtangika Marga (8 fold path).

### Ashtangika Marga (8 Fold Path)
1. Right Understanding
2. Right Determination
3. Right Speech
4. Right Action
5. Right Livelihood
6. Right Mindfulness
7. Right Exercise
8. Right Meditation

### Tri Ratnas of Buddhism
1. **Buddha** (The enlightened)
2. **Dhamma** (Doctrine of Buddhism)
3. **Sangha** (Order of Buddhism)

## Teachings by Buddha
- Buddha was a practical reformer & did not believe in soul or god or metaphysical world & concerned himself with worldly problems.
- Suggested that a person should avoid extremes of both Luxury & Austerity & prescribed a **middle path**.
- Laid great emphasis on Karma (Varna based on action not on birth) & Ahimsa.
- Opposed the varna system & laid down the principle of social equality.

## Spread of Buddhism
- Buddhism had 2 kinds of disciples – Monks (Bhikshus) & Lay worshippers (Upasikas).
- Monks were organised into Sangha for the purpose of spreading Buddhist teachings.
- Membership was open to all, Male or female without any caste distinction, but every member had to take a vow of continence, poverty & faith.
- Use of **Pali** language also contributed to the spread of Buddhism.

## Buddhist Texts
- **Tripitakas** → All written in Pali Language.
  1. Sutta-pitaka
  2. Vinaya-pitaka
  3. Abhidhamma-pitaka

## Contribution of Buddhism
- Earliest Buddhist text "Suttanipata" pleads for the protection of cattle & helped to prevent their decimation.
- Promoted education through residential universities like Valabhi, Nalanda, Vikramshila.
- Formed Hybrid Sanskrit by a mixture of Pali & Sanskrit.

## Cause of Decline
- Revival of Brahmanism & rise of Bhagavatism.
- Use of Sanskrit instead of Pali from the 4th Buddhist council (Around 100 AD).
- After the birth of Mahayana, the practice of Idol worship, huge offerings & donations became common & led to the deterioration of moral standards.
- Attack of Hunas (Around 500 – 600 AD) & Attack of Turkish invaders (1200 AD) destroyed major Buddhist Monasteries.
- Brahmana ruler Pushyamitra is said to have persecuted Buddhists.
- Shaivite Shashanka is said to have cut the original Bodhi tree at Bodhgaya.

## Buddhist Councils

| S.No | Location | King | Chairman |
|---|---|---|---|
| 1 | Rajgir | Ajatashatru | Mahakashyap |
| 2 | Vaishali | Kalasoka | Sabakami |
| 3 | Patliputra | Ashoka | Mogliputra tissa |
| 4 | Kashmir | Kanishka | Vasumitra |

<FeatureList title="Details of the 4 Councils">
  <FeatureItem title="1st Council @ Rajgir" subtitle="Immediately after Buddha's death">
    Held at Saptaparni cave where unwritten teachings of Buddha were penned down. Ananda composed Suttapitaka & Upali composed Vinaypitaka.
  </FeatureItem>
  <FeatureItem title="2nd Council @ Vaishali" subtitle="Approx 100 years after Buddha's death">
    Held due to 10 disputed points under Vinaypitaka.
  </FeatureItem>
  <FeatureItem title="3rd Council @ Patliputra" subtitle="Patronage of Ashoka">
    Compilation of Abhidhamma pitaka took place (Philosophical exposition of Buddhism). Buddhism preached by Ashoka is known as Hinyana.
  </FeatureItem>
  <FeatureItem title="4th Council @ Kashmir" subtitle="Patronage of Kanishka">
    Resulted in the division of Buddhism into Hinyana & Mahayana. All deliberations were made in Sanskrit.
  </FeatureItem>
</FeatureList>

## Origin of Mahayana Buddhism

| Mahayanism | Hinyanism |
|---|---|
| Individual as center & firm to letter of Buddhist teachings | Sangha as center & firm to essence of Buddhist teaching |
| Scriptures written in Sanskrit are sutra, in Angas | Scriptures written in Pali as Pitakas |
| Salvation by work & Believed in Karmas | Salvation by faith & Believed in karma |
| Strives after his own salvation | Concerned with the salvation of others |
`;

const QUESTIONS = [
  {
    questionText: "Where was Gautam Buddha born?",
    options: [
      { key: "A", text: "Kushinagar" },
      { key: "B", text: "Sarnath" },
      { key: "C", text: "Bodh Gaya" },
      { key: "D", text: "Lumbini" },
    ],
    correctOption: "D",
  },
  {
    questionText: "To which clan did Buddha belong?",
    options: [
      { key: "A", text: "Jnatrika" },
      { key: "B", text: "Maurya" },
      { key: "C", text: "Shakya" },
      { key: "D", text: "Kuru" },
    ],
    correctOption: "C",
  },
  {
    questionText: "Where was the First Buddhist Council held?",
    options: [
      { key: "A", text: "Vaishali" },
      { key: "B", text: "Kashmir" },
      { key: "C", text: "Rajgriha" },
      { key: "D", text: "Pataliputra" },
    ],
    correctOption: "C",
  },
  {
    questionText: "What is the meaning of 'Buddha'?",
    options: [
      { key: "A", text: "Enlightened" },
      { key: "B", text: "Preacher of religion" },
      { key: "C", text: "Talented" },
      { key: "D", text: "Powerful" },
    ],
    correctOption: "A",
  },
  {
    questionText: "Identify the Buddhist literature from the following:",
    options: [
      { key: "A", text: "Tripitaka" },
      { key: "B", text: "Upanishads" },
      { key: "C", text: "Anga" },
      { key: "D", text: "Aranyakas" },
    ],
    correctOption: "A",
  },
  {
    questionText:
      "Buddhism made a significant impact by connecting two sections of society. These sections were:",
    options: [
      { key: "A", text: "Merchants and Priests" },
      { key: "B", text: "Moneylenders and Slaves" },
      { key: "C", text: "Warriors and Traders" },
      { key: "D", text: "Women and Shudras" },
    ],
    correctOption: "D",
  },
  {
    questionText: "Where did Buddha deliver his first sermon?",
    options: [
      { key: "A", text: "Gaya" },
      { key: "B", text: "Sarnath" },
      { key: "C", text: "Pataliputra" },
      { key: "D", text: "Vaishali" },
    ],
    correctOption: "B",
  },
  {
    questionText:
      "The Gandhara art style of painting was initiated by which tradition?",
    options: [
      { key: "A", text: "Hinayana Sect" },
      { key: "B", text: "Mahayana Sect" },
      { key: "C", text: "Vaishnavism" },
      { key: "D", text: "Shaivism" },
    ],
    correctOption: "B",
  },
  {
    questionText: "Metal coins first appeared during:",
    options: [
      { key: "A", text: "Harappan Civilization" },
      { key: "B", text: "Later Vedic Period" },
      { key: "C", text: "Buddha's time" },
      { key: "D", text: "Mauryan Period" },
    ],
    correctOption: "C",
  },
  {
    questionText: "Early Buddhist literature was composed in which language?",
    options: [
      { key: "A", text: "Pali" },
      { key: "B", text: "Sanskrit" },
      { key: "C", text: "Aramaic" },
      { key: "D", text: "Prakrit" },
    ],
    correctOption: "A",
  },
  {
    questionText:
      "The Tamil literary masterpiece 'Jivaka Chintamani' is associated with which religion?",
    options: [
      { key: "A", text: "Jain" },
      { key: "B", text: "Buddh" },
      { key: "C", text: "Hindu" },
      { key: "D", text: "Christian" },
    ],
    correctOption: "A",
  },
  {
    questionText: "Who was Mahavira?",
    options: [
      { key: "A", text: "21st Tirthankara" },
      { key: "B", text: "24th Tirthankara" },
      { key: "C", text: "23rd Tirthankara" },
      { key: "D", text: "22nd Tirthankara" },
    ],
    correctOption: "B",
  },
  {
    questionText: "Who was the mother of Mahavira?",
    options: [
      { key: "A", text: "Yashoda" },
      { key: "B", text: "Anojja" },
      { key: "C", text: "Trishala" },
      { key: "D", text: "Devnandi" },
    ],
    correctOption: "C",
  },
  {
    questionText: "In which Kshatriya clan was Mahavira born?",
    options: [
      { key: "A", text: "Shakya" },
      { key: "B", text: "Jnatrika" },
      { key: "C", text: "Mallas" },
      { key: "D", text: "Licchavi" },
    ],
    correctOption: "B",
  },
  {
    questionText:
      "Who was the famous ruler of ancient India who adopted Jainism in his later years?",
    options: [
      { key: "A", text: "Samudragupta" },
      { key: "B", text: "Bindusara" },
      { key: "C", text: "Chandragupta" },
      { key: "D", text: "Ashoka" },
    ],
    correctOption: "C",
  },
  {
    questionText:
      "Which type of pottery is considered a symbol of the beginning of the second urbanization in India?",
    options: [
      { key: "A", text: "Painted Grey Ware" },
      { key: "B", text: "Northern Black Polished Ware" },
      { key: "C", text: "Ochre-colored Pottery" },
      { key: "D", text: "Black and Red Ware" },
    ],
    correctOption: "B",
  },
];

export async function seedReligiousReform(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Religious Reform Movement Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Religious Reform Movement - Jainism, Buddhism",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Religious Reform Movement - Jainism, Buddhism",
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
    where: { id: "seed-religious-reform-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-religious-reform-ps",
      title: "Jainism & Buddhism Practice Quiz",
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
  console.log("🎉 Successfully seeded Religious Reform Movement content!");
}
