import { PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# Vedic Civilization / Aryan Civilization

<DefinitionBlock term="Origins & Geography">
  Aryans called the Indus valley <strong>"Sapt Sindavah"</strong>, which means the land of 7 rivers. The river Indus (Sindhu) is the most mentioned in the Rig Veda, while the <strong>Saraswati (Naditarna)</strong> is mentioned as the holiest river. Aryans appeared in the subcontinent around 1500 B.C.
</DefinitionBlock>

## Conflicts & Tribes

<Callout variant="info" title="Dasas & Dasyus">
  <ul className="list-disc pl-5">
    <li><strong>Dasas:</strong> Mentioned in ancient Iranian literature, hence they may be early Aryans.</li>
    <li><strong>Dasyus:</strong> Possibly original inhabitants of the country who worshipped Phallus (Lingam).</li>
    <li><strong>Trasadasyu:</strong> An Aryan chief who overpowered them. He was soft towards Dasas but hostile towards Dasyus.</li>
  </ul>
</Callout>

- Aryans succeeded everywhere because they possessed chariots driven by horses, coats of mail, and better armory (introduced for the 1st time in west Asia & India).
- Aryans were divided into 5 tribes called <strong>Panchajana</strong>. The most powerful were the Bharatas of the Tritsu Family supported by Viswamitra.

### Battle of 10 Kings
- Fought at River Parushni (Ravi).
- The Bharat ruling clan was opposed by a host of 10 chiefs (5 Aryans & 5 non-Aryans) supported by Vashishta.
- Bharat clan emerged victorious, joined hands with Purus (defeated tribe), and formed a new ruling tribe called <strong>Kurus</strong>.
- <em>Bharatvansa</em> is named after the tribe Bharata & 1st mentioned in the Rig Veda.

## The 4 Vedas

The word Aryan belongs to a race in north India. The Vedas tell about Aryans.

<FeatureList title="The Four Vedas">
  <FeatureItem title="Rig-Veda" subtitle="The Oldest Text">
    Tells about slokas. Contains 1028 slokas classified into 10 chapters. 
    <br/>- The 3rd chapter tells about the <strong>Gayatri Mantra</strong> (spell about Lord Savitri, sun rays).
    <br/>- The 10th chapter tells about the <strong>"Purusha Sukta Mandal" / Chatur varna system</strong>, which dictates 4 varnas originated from Lord Brahma (Tongue: Brahmins, Shoulder: Kshatriya, Ties: Vaishyas, Feet: Shudras).
  </FeatureItem>
  <FeatureItem title="Yajurveda" subtitle="">
    Tells about yagnas and yaagas (sacrifices).
  </FeatureItem>
  <FeatureItem title="Samaveda" subtitle="">
    About music and chants.
  </FeatureItem>
  <FeatureItem title="Atharvanaveda" subtitle="">
    Deals with black magic, eradication of evils, and belongs to medicine.
  </FeatureItem>
</FeatureList>

## Types of Marriages in India

1. Brahma marriage
2. Arsha marriage
3. Daiva marriage
4. Gandharva marriage
5. Asura marriage
6. Rakshasa marriage
7. Paisachika
8. Prajapatya

## Upanishads
- Towards the end of the Vedic period (around 600 BC), a strong reaction against priestly domination, cults & rituals began, leading to the compilation of the Upanishads.
- Mainly philosophical texts criticizing rituals and laying stress on <strong>Right belief & Right knowledge of self</strong> (Relation of Atman with Brahma).
- Describes dialogues between guru & shishya (probably written by Kshatriyas).
- Followed the principle of Jnana (True knowledge for peace, changelessness, indestructibility & immortality of soul, salvation).

## Brahamanas & Aranyakas
- **Brahamanas:** Prose commentaries of all four Vedas (18 in number). The most important is Satapatha Brahamanas. Full of ritualistic formulae.
- **Aranyakas:** Forest books composed in forests. Meant to study in forests, describing the lifestyle of Sanyasis.

---

# Early Vedic Period

<DefinitionBlock term="Economy & Trade">
  Agriculture was known to pre-Aryans & the ploughshare is 1st mentioned in the early part of Rig Veda. However, they were predominantly pastoral people with cattle rearing as the main occupation.
</DefinitionBlock>

- Most wars were fought for the sake of cows (the term for war in Rig Veda is <strong>Gavishti</strong> - search for cows).
- Gifts to priests were in the form of cows & women slaves (not land).
- Artisans included Carpenters, Chariot makers, weavers, Leather workers, Potters.
- The term <strong>Ayas</strong> was used for copper or bronze.

### Rig Vedic Terms

| Term | Meaning |
|---|---|
| Gau | Cow |
| Gavishti | Search for Cows |
| Gopati | Raja or chief, protector of cows |
| Godhuli | Measure of time |
| Duhitr | Daughter or one who milks the cows |
| Gomat | Wealthy man who owned many cattle |

### Administration & Society
- Tribal chief at the center (Rajan). King was known as Gopaljanya (protector of its people & cows).
- Assisted by Purohits, Senani & Gramanis. King's position was hereditary.
- Assemblies: Sabha, Samiti, Vidhata & Gana. Women were allowed to attend Sabha & Vidhata assemblies.
- No introduction of taxes. Voluntary offerings known as <strong>Bali</strong>.
- Society was patriarchal. No mention of sati system or child marriage. Widow remarriage (Levirate) was prevalent. Marriageable age was 16-17 Years.
- Women poets: Apala, Vishwavara, Ghosa & Lopamudra.
- Main pottery: OCP (Ochre Coloured Pottery).

### Early Vedic Gods (No Idol Worship)

| God | Role |
|---|---|
| Indra | Warlord / Raingod / Purandara / Breaker of forts |
| Agni | Fire god & intermediary between God & people |
| Varuna | Personified as water & supposed to keep natural order |
| Soma | God of plants (an intoxicating drink 'somras' named after it) |
| Marut | Personified as storm |
| Aditi / Usha | Goddess of eternity / Appearance of dawn (Not so Prominent) |

---

# Later Vedic Period (1000 – 600 BC)

<DefinitionBlock term="Developments">
  Advent of the Iron Age. Marked by the invention of PGW (Painted Grey Ware). Expansion of Aryans into eastern Gangetic plains.
</DefinitionBlock>

- The era marks the famous Mahabharata war at the land of Kurus (Kurukshetra).
- Iron was called <strong>Shyama or Krishana Aya</strong> (Black metal).
- Agriculture became the chief means of livelihood (transition from pastoral society).
- For the 1st time, Vedic people became acquainted with Rice, calling it <strong>Vrihi</strong>.
- The term <strong>Rashtra</strong> (Territory) appeared for the 1st time.

### Later Vedic Period Crops

| Crop | Name in Later Vedic |
|---|---|
| Wheat | Godhuma |
| Barley | Yava |
| Rice | Vrihi |
| Sugarcane | Ikshu |

### Famous King's Ceremonies
- **Rajasuya Sacrifice:** Conferred supreme power on him.
- **Vajapeya:** Chariot race in which the royal chariot was made to win.
- **Ashvamedha:** Unquestioned control over an area on which the royal horse ran uninterrupted.

### Administration & Society
- Popular assemblies lost their importance. Vidhata completely disappeared. Sabha & Samiti continued, but women were no longer permitted.
- Collection of taxes and tributes became common (officer called <em>Sangrihitri</em>).
- Later Vedic period was divided into four varnas: Brahmanas, Kshatriyas, Vaishyas, Shudras.
- Vaishyas were "Dvija" (Twice born) and tribute payers. Shudras were deprived of the sacred thread ceremony & Gayatri Mantra.

### According to Aitareya Brahmana
- Brahmana: seeker of livelihood & acceptor of gifts.
- Vaishya: tribute payer, meant for being beaten.
- Shudra: servant of another.
- Institution of <strong>Gotra</strong> appeared, signifying descent from common ancestors.

### 4 Ashrams (Stages of Life)
1. Brahamchari (Student)
2. Grihastha (Householder)
3. Vanaprastha (Hermit - gradual detachment)
4. Sanyasin / Ascetic (Renounced the world fully)

### Gods of Later Vedic Period & Women Status
- Indra & Agni lost importance. <strong>Prajapati</strong> (The creator) occupied the supreme position along with Rudra & Vishnu.
- Signs of Idolatry appeared. Sacrifices became more important than prayers.
- Status of women declined. Deprived of attending assemblies, education, and Upanayana ceremony. Child marriage became common.
`;

const QUESTIONS = [
  {
    questionText: "Which of the following Vedas provides information about the civilization of the ancient Vedic era?",
    options: [
      { key: "A", text: "Rigveda" },
      { key: "B", text: "Yajurveda" },
      { key: "C", text: "Atharvaveda" },
      { key: "D", text: "Samaveda" },
    ],
    correctOption: "A",
  },
  {
    questionText: "The primary food of the Vedic Aryans was?",
    options: [
      { key: "A", text: "Barley and Rice" },
      { key: "B", text: "Milk and its products" },
      { key: "C", text: "Rice and Pulses" },
      { key: "D", text: "Vegetables and Fruits" },
    ],
    correctOption: "B",
  },
  {
    questionText: "Which metal was first used by the Vedic people?",
    options: [
      { key: "A", text: "Silver" },
      { key: "B", text: "Gold" },
      { key: "C", text: "Iron" },
      { key: "D", text: "Copper" },
    ],
    correctOption: "D",
  },
  {
    questionText: "The Aryans were successful in their conflicts with pre-Aryans because -",
    options: [
      { key: "A", text: "They used elephants on a large scale" },
      { key: "B", text: "They were taller and stronger" },
      { key: "C", text: "They belonged to an advanced urban culture" },
      { key: "D", text: "They used chariots driven by horses" },
    ],
    correctOption: "D",
  },
  {
    questionText: "In the Aryan civilization, the stages of life, in ascending order, were -",
    options: [
      { key: "A", text: "Brahmacharya-Grihastha-Vanaprastha-Sannyasa" },
      { key: "B", text: "Grihastha-Brahmacharya-Vanaprastha-Sannyasa" },
      { key: "C", text: "Brahmacharya-Vanaprastha-Sannyasa-Grihastha" },
      { key: "D", text: "Grihastha-Sannyasa-Vanaprastha-Brahmacharya" },
    ],
    correctOption: "A",
  },
  {
    questionText: "In the early Vedic period, the Varna system was based on -",
    options: [
      { key: "A", text: "Education" },
      { key: "B", text: "Birth" },
      { key: "C", text: "Profession" },
      { key: "D", text: "Talent" },
    ],
    correctOption: "C",
  },
  {
    questionText: "Who was the first European to call 'Aryans' a race?",
    options: [
      { key: "A", text: "Sir William Jones" },
      { key: "B", text: "H. H. Wilson" },
      { key: "C", text: "Max Muller" },
      { key: "D", text: "General Cunningham" },
    ],
    correctOption: "C",
  },
  {
    questionText: "From where is the famous 'Gayatri Mantra' taken?",
    options: [
      { key: "A", text: "Yajurveda" },
      { key: "B", text: "Atharvaveda" },
      { key: "C", text: "Rigveda" },
      { key: "D", text: "Samaveda" },
    ],
    correctOption: "C",
  },
  {
    questionText: "Which of the following crafts was not practiced by the Aryans?",
    options: [
      { key: "A", text: "Pottery" },
      { key: "B", text: "Jewelry" },
      { key: "C", text: "Carpentry" },
      { key: "D", text: "Blacksmithing" },
    ],
    correctOption: "D",
  },
  {
    questionText: "Which of the following learned women challenged the invincible Yajnavalkya in a debate?",
    options: [
      { key: "A", text: "Ghosha" },
      { key: "B", text: "Apala" },
      { key: "C", text: "Maitreyi" },
      { key: "D", text: "Gargi" },
    ],
    correctOption: "D",
  },
];

export async function seedVedicCivilization(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Vedic Civilization Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Vedic Civilization / Aryan Civilization",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Vedic Civilization / Aryan Civilization",
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
    where: { id: "seed-vedic-civilization-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-vedic-civilization-ps",
      title: "Vedic Civilization Practice Quiz",
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
  console.log("🎉 Successfully seeded Vedic Civilization content!");
}
