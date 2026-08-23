import { PrismaClient, Difficulty, AccessTier, LessonType } from "@prisma/client";

export async function seedCountriesParliaments(prisma: PrismaClient, subjectId: string) {
  console.log("  -> Seeding Chapter: Countries and Their Parliaments...");

  const chapter = await prisma.chapter.upsert({
    where: {
      subjectId_slug: {
        subjectId: subjectId,
        slug: "countries-parliaments",
      },
    },
    update: {
      order: 4,
    },
    create: {
      subjectId: subjectId,
      name: "Countries and Their Parliaments",
      slug: "countries-parliaments",
      description: "Learn about the names of parliaments of various countries across the world.",
      order: 4,
      accessTier: AccessTier.FREE,
      isActive: true,
      examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO", "SSC_GD"],
    },
  });

  const parliamentsData = [
    { country: "Afghanistan", parliament: "Shora" },
    { country: "Albania", parliament: "People's Assembly" },
    { country: "Algeria", parliament: "National People's Assembly" },
    { country: "Andorra", parliament: "General Council" },
    { country: "Angola", parliament: "National People's Assembly" },
    { country: "Argentina", parliament: "National Congress" },
    { country: "Australia", parliament: "Federal Parliament" },
    { country: "Austria", parliament: "National Assembly" },
    { country: "Azerbaijan", parliament: "Melli Majlis" },
    { country: "Bahamas", parliament: "General Assembly" },
    { country: "Bahrain", parliament: "Consultative Council" },
    { country: "Bangladesh", parliament: "Jatiya Sangsad" }, // Corrected from Jatia Parliament
    { country: "Belize", parliament: "National Assembly" },
    { country: "Bhutan", parliament: "Tsogdu" },
    { country: "Bolivia", parliament: "National Congress" },
    { country: "Botswana", parliament: "National Assembly" },
    { country: "Brazil", parliament: "National Congress" },
    { country: "Britain", parliament: "Parliament (House Of Commons And House Of Lords)" },
    { country: "Brunei", parliament: "National Assembly" },
    { country: "Bulgaria", parliament: "Narodno Sabranie" },
    { country: "Cambodia", parliament: "National Assembly" },
    { country: "Canada", parliament: "Parliament" },
    { country: "China", parliament: "National People's Congress" }, // Corrected from National People's Assembly
    { country: "Colombia", parliament: "Congress" },
    { country: "Comoros", parliament: "Legislative Council And Senate" },
    { country: "Congo Democratic", parliament: "Rep. Of National Legislative Council" },
    { country: "Costa Rica", parliament: "Legislative Council And Senate" }, // Corrected spelling
    { country: "Croatia", parliament: "Sabor" }, // Corrected spelling
    { country: "Cuba", parliament: "National Assembly Of People's Power" },
    { country: "Denmark", parliament: "Folketing" },
    { country: "East Timor", parliament: "Constituent Assembly" },
    { country: "Ecuador", parliament: "National Congress" },
    { country: "Egypt", parliament: "People's Assembly" },
    { country: "El Salvador", parliament: "Legislative Assembly" },
    { country: "Ethiopia", parliament: "Federal Council And House Of Representative" },
    { country: "Fiji Islands", parliament: "Senate & House Of Representative" },
    { country: "Finland", parliament: "Eduskunta (Parliament)" }, // Corrected spelling Eduskunta
    { country: "France", parliament: "National Assembly" },
    { country: "Germany", parliament: "Bundestag (Lower House) & Bundesrat (Upper House)" },
    { country: "Greece", parliament: "Chamber Of Deputies" }, // Note: officially Hellenic Parliament, but going with book source for SSC
    { country: "Guyana", parliament: "National Assembly" },
    { country: "Hungary", parliament: "National Assembly" },
    { country: "Iceland", parliament: "Althing" },
    { country: "India", parliament: "Sansad" },
    { country: "Indonesia", parliament: "People's Consultative Assembly" },
    { country: "Iran", parliament: "Majlis" },
    { country: "Iraq", parliament: "National Assembly" },
    { country: "Ireland", parliament: "Oireachtas" },
    { country: "Israel", parliament: "The Knesset" },
    { country: "Italy", parliament: "Chamber Of Deputies And Senate" },
    { country: "Japan", parliament: "Diet" },
    { country: "Jordan", parliament: "National Assembly" },
    { country: "Korea (North)", parliament: "Supreme People's Assembly" },
    { country: "Korea (South)", parliament: "National Assembly" },
    { country: "Kuwait", parliament: "National Assembly" },
    { country: "Lebanon", parliament: "National Assembly" }, // Corrected from Labanon
    { country: "Laos", parliament: "People's Supreme Assembly" },
    { country: "Latvia", parliament: "Saeima" }, // Corrected from Lativa
    { country: "Lesotho", parliament: "National Assembly And Senate" },
    { country: "Libya", parliament: "General People's Congress" },
    { country: "Lithuania", parliament: "Seimas" },
    { country: "Luxembourg", parliament: "Chamber Of Deputies" },
    { country: "Madagascar", parliament: "National People's Assembly" },
    { country: "Malaysia", parliament: "Majlis" }, // Corrected spelling Majilis
    { country: "Maldives", parliament: "Majlis" },
    { country: "Mongolia", parliament: "Great People's Khural" }, // Corrected Magnolia duplicate
    { country: "Montenegro", parliament: "Federal Assembly" },
    { country: "Mozambique", parliament: "People's Assembly" },
    { country: "Myanmar", parliament: "Pyithu Hluttaw" },
    { country: "Nepal", parliament: "Federal Parliament of Nepal" },
    { country: "Netherlands", parliament: "States-General (Staten-General)" },
    { country: "New Zealand", parliament: "Parliament (House Of Representative)" },
    { country: "Norway", parliament: "Storting" },
    { country: "Oman", parliament: "Monarchy" },
    { country: "Pakistan", parliament: "National Assembly & Senate" },
    { country: "Papua New Guinea", parliament: "National Parliament" },
    { country: "Paraguay", parliament: "Senate & Chamber Of Deputies" },
    { country: "Philippines", parliament: "The Congress" },
    { country: "Poland", parliament: "Sejm" },
    { country: "Romania", parliament: "Great National Assembly" },
    { country: "Russia", parliament: "Duma & Federal Council" },
    { country: "Saudi Arabia", parliament: "Majlis Al Shura" },
    { country: "South Africa", parliament: "Parliament" },
    { country: "Spain", parliament: "Cortes" }, // Corrected from Crotes
    { country: "Taiwan", parliament: "Yuan" },
    { country: "Turkey", parliament: "Grand National Assembly" },
    { country: "Uruguay", parliament: "General Assembly" },
    { country: "USA", parliament: "Congress" },
    { country: "Uzbekistan", parliament: "Oliy Majlis" },
    { country: "Vietnam", parliament: "National Assembly" },
    { country: "Zambia", parliament: "National Assembly" },
    { country: "Zimbabwe", parliament: "Parliament" },
  ];

  let gridCardsHtml = parliamentsData.map(item => `
    <div class="p-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm flex flex-col justify-center items-center text-center hover:bg-accent hover:text-accent-foreground transition-colors">
      <h3 class="font-bold text-lg mb-1">${item.country}</h3>
      <p class="text-sm text-muted-foreground">${item.parliament}</p>
    </div>
  `).join("");

  const articleHtml = `
  <div class="space-y-6">
    <div class="prose prose-slate dark:prose-invert max-w-none">
      <p>Different countries have different names for their supreme legislative bodies. This comprehensive list covers the parliaments of major countries across the world, which is a highly repeated topic in SSC and other competitive exams.</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${gridCardsHtml}
    </div>
  </div>
  `;

  await prisma.lesson.upsert({
    where: {
      chapterId_slug: {
        chapterId: chapter.id,
        slug: "countries-parliaments",
      },
    },
    update: {
      title: "Countries and Their Parliaments",
      type: LessonType.ARTICLE,
      articleHtml: articleHtml,
    },
    create: {
      chapterId: chapter.id,
      subjectId: subjectId,
      title: "Countries and Their Parliaments",
      slug: "countries-parliaments",
      type: LessonType.ARTICLE,
      articleHtml: articleHtml,
      order: 1,
      accessTier: AccessTier.FREE,
      isActive: true,
      durationMins: 15,
    },
  });

  let practiceSet = await prisma.practiceSet.findFirst({
    where: { chapterId: chapter.id, title: "Countries and Parliaments Practice Set" }
  });

  if (!practiceSet) {
    practiceSet = await prisma.practiceSet.create({
      data: {
        subjectId: subjectId,
        chapterId: chapter.id,
        title: "Countries and Parliaments Practice Set",
        order: 1,
        accessTier: AccessTier.FREE,
        isActive: true,
      }
    });
  }

  const questionsData = [
    {
      text: "The parliament of Australia is?",
      options: ["People's Assembly", "Melli Majlis", "National People's Assembly", "Federal Parliament"],
      correct: "Federal Parliament",
      difficulty: Difficulty.EASY,
      explanation: "The Parliament of Australia is the federal legislative branch of the Australian Government, often called the Federal Parliament.",
    },
    {
      text: "Which is the oldest parliament in the world?",
      options: ["Sansad", "Althing", "Majlis", "Duma & Federal Council"],
      correct: "Althing",
      difficulty: Difficulty.MEDIUM,
      explanation: "The Althing is the national parliament of Iceland. It is the oldest surviving parliament in the world, founded in 930.",
    },
    {
      text: "Which among the following is the parliament of Japan?",
      options: ["General Assembly", "Congress", "Folketing", "Diet"],
      correct: "Diet",
      difficulty: Difficulty.EASY,
      explanation: "The National Diet is Japan's bicameral legislature.",
    },
    {
      text: "What is the parliament of Israel called?",
      options: ["The Knesset", "Chamber of Deputies and Senate", "National Assembly", "Seimas"],
      correct: "The Knesset",
      difficulty: Difficulty.EASY,
      explanation: "The Knesset is the unicameral national legislature of Israel.",
    },
    {
      text: "Which country has the 'Folketing' as parliament?",
      options: ["Indonesia", "Russia", "China", "Denmark"],
      correct: "Denmark",
      difficulty: Difficulty.EASY,
      explanation: "The Folketing is the unicameral national parliament of the Kingdom of Denmark.",
    },
    {
      text: "Which country has the largest parliament with approximately 3000 members?",
      options: ["USA", "Australia", "India", "China"],
      correct: "China",
      difficulty: Difficulty.MEDIUM,
      explanation: "The National People's Congress (NPC) of China is the largest parliamentary body in the world with about 2,980 members.",
    },
    {
      text: "'Duma & Federal Council' is the parliament of ________.",
      options: ["USA", "England", "Spain", "Russia"],
      correct: "Russia",
      difficulty: Difficulty.EASY,
      explanation: "The Federal Assembly is the national legislature of the Russian Federation, consisting of the State Duma (lower house) and the Federation Council (upper house).",
    },
    {
      text: "What is the parliament of \"Colombia\"?",
      options: ["Congress", "Parliament", "Sabor", "Folketing"],
      correct: "Congress",
      difficulty: Difficulty.MEDIUM,
      explanation: "The Congress of the Republic of Colombia is the bicameral national legislature of Colombia.",
    },
    {
      text: "Name the Parliament of Egypt?",
      options: ["People's Assembly", "Shergo", "Shoora", "Majlis"],
      correct: "People's Assembly",
      difficulty: Difficulty.MEDIUM,
      explanation: "The Parliament of Egypt is historically and commonly referred to as the People's Assembly.",
    },
    {
      text: "What is the name of Bangladesh Parliament?",
      options: ["Jatiya Sangsad", "Tsongdu", "Majlis", "Shergo"],
      correct: "Jatiya Sangsad",
      difficulty: Difficulty.EASY,
      explanation: "Jatiya Sangsad is the supreme legislative body of Bangladesh.",
    }
  ];

  for (let i = 0; i < questionsData.length; i++) {
    const q = questionsData[i];
    
    let existingQuestion = await prisma.question.findFirst({
      where: {
        chapterId: chapter.id,
        questionText: q.text,
      }
    });

    if (existingQuestion) {
      await prisma.question.update({
        where: { id: existingQuestion.id },
        data: {
          options: q.options,
          correctOption: q.correct,
          explanation: q.explanation,
          difficulty: q.difficulty,
          practiceSets: {
            upsert: {
              where: {
                practiceSetId_questionId: {
                  practiceSetId: practiceSet.id,
                  questionId: existingQuestion.id,
                }
              },
              update: { order: i + 1 },
              create: { practiceSetId: practiceSet.id, order: i + 1 }
            }
          }
        }
      });
    } else {
      await prisma.question.create({
        data: {
          subjectId: subjectId,
          chapterId: chapter.id,
          questionText: q.text,
          options: q.options,
          correctOption: q.correct,
          explanation: q.explanation,
          difficulty: q.difficulty,
          isActive: true,
          practiceSets: {
            create: {
              practiceSetId: practiceSet.id,
              order: i + 1
            }
          }
        }
      });
    }
  }

  console.log("  -> Countries and Parliaments chapter seeded.");
}
