import { prisma } from "../src/config/prisma";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
<h1>1. PRE-HISTORIC CULTURE</h1>
<h2>Introduction</h2>
<ul>
  <li>History the word derived from Greek language; in the Greek it’s called as <strong>Historia</strong>. It means research, enquiry and analysis.</li>
  <li>In Telugu it’s called as <strong>charitra</strong>, the word derived from Sanskrit. In Sanskrit it is called as <strong>chur</strong>, it means behavior.</li>
</ul>

<h2>Why should we study history?</h2>
<p><strong>Principle of Uniformity:</strong> Past is a key to the present when we study the past and present it helps to estimate the future.</p>

<h2>Sources of History</h2>
<ol>
  <li>Bookish sources</li>
  <li>Numismatics</li>
  <li>Inscriptions</li>
  <li>Epic Stories</li>
  <li>Archaeological Department</li>
  <li>Carbon dating</li>
  <li>Oral sources</li>
  <li>Foreign Travelers</li>
  <li>Religious books</li>
</ol>

<h3>Note:</h3>
<ul>
  <li><strong>Alexander Cunningham</strong> is regarded as father of archaeological department.</li>
  <li>In the year <strong>1861</strong>, archaeological department established under the ministry of culture, Government of India. This time Governor General was <strong>Lord Canning</strong>.</li>
  <li>Carbon dating was discovered by <strong>W.F. Libby</strong> in <strong>1947</strong> for his work contribution; he received the Nobel Prize.</li>
  <li>His research published in <strong>1951</strong> scientific monthly magazine.</li>
  <li>Half life of carbon is <strong>5568 years</strong>.</li>
  <li>Study of inscriptions is called as <strong>Epigraphy</strong>.</li>
  <li>King Ashok inscriptions are translated into English by <strong>James Prinsep</strong>.</li>
  <li>Study of coins is called as <strong>Numismatics</strong>.</li>
  <li><strong>Indo-Bactrian</strong> first released the coins in India.</li>
  <li>Father of History is regarded as <strong>Herodotus</strong>; he wrote a book called <strong>History</strong>.</li>
</ul>

<h2>History was classified into 3 categories</h2>
<ol>
  <li><strong>Pre-History:</strong> There is no script.</li>
  <li><strong>Proto History:</strong> Script existed but not possible to read.</li>
  <li><strong>Historical Age:</strong> Script existed and understood by the common man also.</li>
</ol>

<h2>Prehistoric Periods in India – According to Tools</h2>
<ol>
  <li><strong>Paleolithic Period (Old Stone Age):</strong> 500,000 BCE – 10,000 BCE</li>
  <li><strong>Mesolithic Period (Late Stone Age):</strong> 10,000 BCE – 6000 BCE</li>
  <li><strong>Neolithic Period (New Stone Age):</strong> 6000 BCE – 1000 BCE</li>
  <li><strong>Chalcolithic Period (Stone Copper Age):</strong> 3000 BCE – 500 BCE</li>
  <li><strong>Iron Age:</strong> 1500 BCE – 200 BCE</li>
</ol>

<hr/>

<h1>Stone Age</h1>
<p>The Stone Age is the prehistoric period. On the basis of geological age, the type and technology of stone tools, and subsistence base, the <strong>Indian Stone Age is classified primarily into three types</strong>:</p>
<ul>
  <li><strong>Palaeolithic age (Old Stone Age):</strong> Period – 500,000 – 10,000 BCE</li>
  <li><strong>Mesolithic age (Late Stone Age):</strong> Period – 10,000 – 6000 BCE</li>
  <li><strong>Neolithic age (New Stone Age):</strong> Period – 6000 – 1000 BCE</li>
</ul>

<h2>Palaeolithic Age (Old Stone Age)</h2>
<p>The term <strong>Palaeolithic</strong> is derived from the Greek word <strong>‘palaeo’</strong>, which means old, and <strong>‘lithic’</strong>, meaning stone. Therefore, the term Palaeolithic age refers to the old stone age.</p>

<h3>Main characteristics of the Palaeolithic age</h3>
<ol>
  <li>The Indian people are believed to have belonged to the <strong>‘Negrito’ race</strong>, and lived in the open air, river valleys, caves and rock shelters.</li>
  <li>They were food gatherers, ate wild fruits and vegetables, and lived on hunting.</li>
  <li>There was no knowledge of houses, pottery, agriculture. It was only in later stages they discovered fire.</li>
  <li>In the upper Palaeolithic age, there is evidence of art in the form of paintings.</li>
  <li>Humans used unpolished, rough stones like hand axes, choppers, blades, burins and scrapers.</li>
</ol>

<h3>Classification of Palaeolithic age</h3>
<ol>
  <li><strong>Lower Palaeolithic Age:</strong> up to 100,000 BC</li>
  <li><strong>Middle Palaeolithic Age:</strong> 100,000 BC – 40,000 BC</li>
  <li><strong>Upper Palaeolithic Age:</strong> 40,000 BC – 10,000 BC</li>
</ol>

<h3>Lower Palaeolithic Age (Early Palaeolithic Age)</h3>
<ul>
  <li>It covers the greater part of the Ice Age.</li>
  <li>Hunters and food gatherers; tools used were <strong>hand axes, choppers and cleavers</strong>.</li>
  <li>Tools were rough and heavy.</li>
  <li>One of the earliest lower Palaeolithic sites is <strong>Bori in Maharashtra</strong>.</li>
  <li>Limestone was also used to make tools.</li>
</ul>

<h3>Major sites of Lower Palaeolithic Age</h3>
<ul>
  <li>Soan Valley (in present Pakistan), Sites in the Thar Desert, Kashmir, Mewar plains, Saurashtra, Gujarat, Central India, Deccan Plateau, Chotanagpur Plateau, North of the Cauvery River, Belan Valley in UP.</li>
  <li>There are habitation sites including caves and rock shelters. An important place is <strong>Bhimbetka in Madhya Pradesh</strong>.</li>
</ul>

<h3>Middle Palaeolithic Age</h3>
<ul>
  <li>Tools used were <strong>flakes, blades, pointers, scrapers and borers</strong>.</li>
  <li>The tools were smaller, lighter and thinner.</li>
  <li>There was a decrease in the use of hand axes with respect to other tools.</li>
  <li>Important sites: Belan Valley in UP, Luni Valley (Rajasthan).</li>
</ul>

<h2>Upper Palaeolithic Age</h2>
<ul>
  <li>The Upper Palaeolithic age coincided with the last phase of the Ice Age when the climate became comparatively warmer and less humid.</li>
  <li>Emergence of <strong>Homo sapiens</strong>.</li>
  <li>The period is marked by innovation in tools and technology. A lot of bone tools, including needles, harpoons, parallel-sided blades, fishing tools and burin tools.</li>
  <li>Major sites: <strong>Bhimbetka</strong> (South of Bhopal), Belan, Son, Chota Nagpur Plateau (Bihar), Maharashtra, Orissa, The Eastern Ghats in Andhra Pradesh.</li>
  <li>Bone tools have been found only at cave sites of <strong>Kurnool and Muchchatla Chintamani Gavi</strong> in Andhra Pradesh.</li>
</ul>

<hr/>

<h2>Mesolithic Period (Middle Stone Age)</h2>
<ul>
  <li>The term Mesolithic is derived from two Greek words – <strong>‘meso’</strong> (middle) and <strong>‘lithic’</strong> (stone).</li>
  <li>Both Mesolithic and Neolithic phases belong to the <strong>Holocene era</strong>. In this era, there was a rise in temperature which resulted in melting of ice and changes in flora and fauna.</li>
</ul>

<h3>Characteristic Features of the Mesolithic Era</h3>
<ul>
  <li>The people of this era believed in life after death and buried the dead with food items and other goods.</li>
  <li>The characteristic tools were <strong>microliths</strong> – miniature stone tools of geometrical and non-geometrical shapes.</li>
  <li>They were used to make composite tools, spearheads, arrowheads and sickles.</li>
  <li>These microliths enabled the Mesolithic man to hunt smaller animals and birds.</li>
  <li>Started to wear clothes made of animal skin.</li>
</ul>

<h3>Important Mesolithic Sites</h3>
<ul>
  <li><strong>Bagor in Rajasthan</strong> is one of the biggest and best-documented sites (on river Kothari).</li>
  <li><strong>Adamgarh in Madhya Pradesh</strong> provides the earliest evidence for the domestication of animals.</li>
  <li>There are about <strong>150 Mesolithic rock art sites</strong> across India (e.g. Bhimbetka caves).</li>
  <li>Microliths found in valleys of river <strong>Tapi, Sabarmati, Narmada and Mahi</strong>.</li>
  <li><strong>Langhnaj in Gujarat</strong> and <strong>Biharanpur in West Bengal</strong> are also important sites. Bones of wild animals excavated from Langhnaj.</li>
  <li>Pottery found in <strong>Langhnaj (Gujarat)</strong> and in the <strong>Kaimur region of Mirzapur (U.P.)</strong>.</li>
</ul>

<hr/>

<h2>Neolithic Period (New Stone Age)</h2>
<ul>
  <li>The term Neolithic refers to the <strong>‘New Stone Age’</strong>.</li>
  <li>Termed as <strong>‘Neolithic revolution’</strong> since it introduced important changes in social and economic life.</li>
  <li>Saw man turning into a <strong>food producer from food gatherer</strong>.</li>
</ul>

<h3>Characteristic Features</h3>
<h4>Tools and Weapons</h4>
<ul>
  <li>Used microlithic blades in addition to tools made of polished stones (celts).</li>
  <li>Used tools and weapons made of bones – needles, scrapers, borers, arrowheads.</li>
</ul>

<h4>Agriculture</h4>
<ul>
  <li>Cultivated land and grew fruits and corn like <strong>ragi and horse gram (kulati)</strong>.</li>
  <li>Domesticated cattle, sheep and goats.</li>
</ul>

<h4>Pottery</h4>
<ul>
  <li>With agriculture, people required to store food grains. Pottery appeared on a large scale.</li>
  <li>Classified under <strong>greyware, black-burnished ware, and mat impressed ware</strong>.</li>
  <li>Initial stages used handmade pottery; later, foot wheels were used.</li>
</ul>

<h4>Housing and Settled Life</h4>
<ul>
  <li>Lived in rectangular or circular houses made of mud and reeds.</li>
  <li>Knew how to make boats, could spin cotton, wool and weave cloth.</li>
  <li>Inhabited mainly the hilly river valleys, rock shelters and slopes.</li>
</ul>

<h3>Important Neolithic Sites</h3>
<ul>
  <li><strong>Koldihwa and Mahagara</strong> – Evidence of circular huts and the oldest evidence of rice in the world.</li>
  <li><strong>Mehrgarh (Balochistan, Pakistan)</strong> – Earliest Neolithic site; cultivated crops like cotton and wheat.</li>
  <li><strong>Burzahom (Kashmir)</strong> – Domestic dogs were buried with masters in graves; pit dwellings.</li>
  <li><strong>Gufkral (Kashmir)</strong> – Famous for pit dwelling, stone tools and graveyards in houses.</li>
  <li><strong>Chirand (Bihar)</strong> – Used tools and weapons made of bones.</li>
  <li><strong>Piklihal, Brahmagiri, Maski, Takkalakota, Hallur (Karnataka)</strong> – Cattle herders, ash mounds found.</li>
  <li><strong>Belan Valley</strong> – All three phases (Palaeolithic, Mesolithic and Neolithic) are found in sequence.</li>
</ul>

<hr/>

<h2>Chalcolithic Age (Stone Copper Age)</h2>
<ul>
  <li>Marked the emergence of the use of metal along with stone tools. The first metal to be used was <strong>copper</strong>.</li>
</ul>

<h3>Important Chalcolithic Sites</h3>
<ul>
  <li><strong>Ahar (Banas Valley)</strong> – Practised smelting and metallurgy, supplied copper tools.</li>
  <li><strong>Gilund</strong> – Stone blade industry.</li>
  <li><strong>Daimabad (Maharashtra)</strong> – Largest Jorwe culture site in Godavari valley. Bronze goods found.</li>
  <li><strong>Malwa (Madhya Pradesh)</strong> – Richest Chalcolithic ceramics, spindle whorls.</li>
  <li><strong>Kayatha (Madhya Pradesh)</strong> – Pre-Harappan elements in pottery, copper objects with sharp cutting edges.</li>
  <li><strong>Navdatoli (on Narmada)</strong> – Largest Chalcolithic settlements in the country.</li>
  <li><strong>Nevasa and Eran</strong> – Known for non-Harappan culture.</li>
</ul>
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
      title: "Theory: Pre-Historic Culture",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapter.id,
      subjectId: subject.id,
      title: "Theory: Pre-Historic Culture",
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
