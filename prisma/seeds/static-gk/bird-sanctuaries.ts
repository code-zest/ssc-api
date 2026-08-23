import { PrismaClient, AccessTier, Difficulty, LessonType } from "@prisma/client";

export async function seedBirdSanctuaries(prisma: PrismaClient, subjectId: string) {
  console.log("  -> Seeding Chapter: Bird Sanctuaries in India...");

  const chapter = await prisma.chapter.upsert({
    where: {
      subjectId_slug: {
        subjectId: subjectId,
        slug: "bird-sanctuaries",
      },
    },
    update: {},
    create: {
      subjectId: subjectId,
      name: "Bird Sanctuaries in India",
      slug: "bird-sanctuaries",
      description: "Learn about the important Bird Sanctuaries across various states in India.",
      sectionName: "Ecology & Environment",
      examTypes: ["SSC_CGL", "SSC_CHSL", "SSC_MTS", "SSC_CPO"],
      order: 3,
      accessTier: AccessTier.FREE,
      isActive: true,
    },
  });

  const articleHtml = `
  <div class="prose max-w-none text-foreground">
    <p class="mb-4">India is home to numerous bird sanctuaries that protect a wide variety of resident and migratory bird species. Below is a comprehensive list of important bird sanctuaries categorized by state.</p>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-border border border-border rounded-xl">
        <thead class="bg-muted">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">S.No.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name of the Bird Sanctuary</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">State</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Established Year</th>
          </tr>
        </thead>
        <tbody class="bg-card divide-y divide-border">
          <tr><td class="px-6 py-4 whitespace-nowrap">1</td><td class="px-6 py-4">Atapaka Bird Sanctuary</td><td class="px-6 py-4">Andhra Pradesh</td><td class="px-6 py-4">1999</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">2</td><td class="px-6 py-4">Kaundinya Bird Sanctuary</td><td class="px-6 py-4">Andhra Pradesh</td><td class="px-6 py-4">1990</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">3</td><td class="px-6 py-4">Nelapattu Bird Sanctuary</td><td class="px-6 py-4">Andhra Pradesh</td><td class="px-6 py-4">1976</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">4</td><td class="px-6 py-4">Kolleru Bird Sanctuary</td><td class="px-6 py-4">Andhra Pradesh</td><td class="px-6 py-4">1999</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">5</td><td class="px-6 py-4">Najafgarh Drain Bird Sanctuary</td><td class="px-6 py-4">Delhi</td><td class="px-6 py-4">1995</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">6</td><td class="px-6 py-4">Salim Ali Bird Sanctuary</td><td class="px-6 py-4">Goa</td><td class="px-6 py-4">1988</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">7</td><td class="px-6 py-4">Khijadiya Bird Sanctuary</td><td class="px-6 py-4">Gujarat</td><td class="px-6 py-4">1982</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">8</td><td class="px-6 py-4">Kutch Bustard Sanctuary</td><td class="px-6 py-4">Gujarat</td><td class="px-6 py-4">1992</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">9</td><td class="px-6 py-4">Nal Sarovar Bird Sanctuary</td><td class="px-6 py-4">Gujarat</td><td class="px-6 py-4">1969</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">10</td><td class="px-6 py-4">Porbandar Bird Sanctuary</td><td class="px-6 py-4">Gujarat</td><td class="px-6 py-4">1988</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">11</td><td class="px-6 py-4">Sultanpur Bird Sanctuary</td><td class="px-6 py-4">Haryana</td><td class="px-6 py-4">1972</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">12</td><td class="px-6 py-4">Attiveri Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">2000</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">13</td><td class="px-6 py-4">Bonal Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">1998</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">14</td><td class="px-6 py-4">Gudavi Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">1989</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">15</td><td class="px-6 py-4">Kaggaladu Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">1999</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">16</td><td class="px-6 py-4">Magadi Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">1960</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">17</td><td class="px-6 py-4">Mandagadde Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">1987</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">18</td><td class="px-6 py-4">Ranganathittu Bird Sanctuary</td><td class="px-6 py-4">Karnataka</td><td class="px-6 py-4">1940</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">19</td><td class="px-6 py-4">Kumarakom Bird Sanctuary</td><td class="px-6 py-4">Kerala</td><td class="px-6 py-4">1847</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">20</td><td class="px-6 py-4">Kadalundi Bird Sanctuary</td><td class="px-6 py-4">Kerala</td><td class="px-6 py-4">1983</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">21</td><td class="px-6 py-4">Mangalavanam Bird Sanctuary</td><td class="px-6 py-4">Kerala</td><td class="px-6 py-4">2004</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">22</td><td class="px-6 py-4">Pathiramanal Bird Sanctuary</td><td class="px-6 py-4">Kerala</td><td class="px-6 py-4">2004</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">23</td><td class="px-6 py-4">Thattekkad Bird Sanctuary</td><td class="px-6 py-4">Kerala</td><td class="px-6 py-4">1983</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">24</td><td class="px-6 py-4">Jayakwadi Bird Sanctuary</td><td class="px-6 py-4">Maharashtra</td><td class="px-6 py-4">1986</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">25</td><td class="px-6 py-4">Karnala Bird Sanctuary</td><td class="px-6 py-4">Maharashtra</td><td class="px-6 py-4">1968</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">26</td><td class="px-6 py-4">Mayani Bird Sanctuary</td><td class="px-6 py-4">Maharashtra</td><td class="px-6 py-4">—</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">27</td><td class="px-6 py-4">Nandur Madhmeshwar Bird Sanctuary</td><td class="px-6 py-4">Maharashtra</td><td class="px-6 py-4">1986</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">28</td><td class="px-6 py-4">Chilika Lake Bird Sanctuary</td><td class="px-6 py-4">Odisha</td><td class="px-6 py-4">1973</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">29</td><td class="px-6 py-4">Bharatpur Bird Sanctuary</td><td class="px-6 py-4">Rajasthan</td><td class="px-6 py-4">1982</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">30</td><td class="px-6 py-4">Chitrangudi Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1989</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">31</td><td class="px-6 py-4">Kanjirankulam Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1989</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">32</td><td class="px-6 py-4">Koonthankulam Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1994</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">33</td><td class="px-6 py-4">Pulicat Lake Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1976</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">34</td><td class="px-6 py-4">Suchindram Theroor Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">2002</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">35</td><td class="px-6 py-4">Udayamarthandapuram Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1999</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">36</td><td class="px-6 py-4">Vedanthangal Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1936</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">37</td><td class="px-6 py-4">Vaduvoor Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1999</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">38</td><td class="px-6 py-4">Vellode Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1996</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">39</td><td class="px-6 py-4">Vettangudi Bird Sanctuary</td><td class="px-6 py-4">Tamil Nadu</td><td class="px-6 py-4">1977</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">40</td><td class="px-6 py-4">Asan Barrage Bird Sanctuary</td><td class="px-6 py-4">Uttarakhand</td><td class="px-6 py-4">1967</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">41</td><td class="px-6 py-4">Bakhira Bird Sanctuary</td><td class="px-6 py-4">Uttar Pradesh</td><td class="px-6 py-4">1980</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">42</td><td class="px-6 py-4">Nawabganj Bird Sanctuary</td><td class="px-6 py-4">Uttar Pradesh</td><td class="px-6 py-4">1984</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">43</td><td class="px-6 py-4">Okhla Bird Sanctuary</td><td class="px-6 py-4">Uttar Pradesh</td><td class="px-6 py-4">1990</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">44</td><td class="px-6 py-4">Patna Bird Sanctuary</td><td class="px-6 py-4">Uttar Pradesh</td><td class="px-6 py-4">1991</td></tr>
          <tr><td class="px-6 py-4 whitespace-nowrap">45</td><td class="px-6 py-4">Samaspur Bird Sanctuary</td><td class="px-6 py-4">Uttar Pradesh</td><td class="px-6 py-4">1987</td></tr>
          
          <tr><td class="px-6 py-4 whitespace-nowrap">46</td><td class="px-6 py-4">Chintamoni Kar Bird Sanctuary</td><td class="px-6 py-4">West Bengal</td><td class="px-6 py-4">1982</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  await prisma.lesson.upsert({
    where: {
      chapterId_slug: {
        chapterId: chapter.id,
        slug: "bird-sanctuaries",
      },
    },
    update: {
      title: "Bird Sanctuaries in India",
      type: LessonType.ARTICLE,
      articleHtml: articleHtml,
    },
    create: {
      chapterId: chapter.id,
      subjectId: subjectId,
      title: "Bird Sanctuaries in India",
      slug: "bird-sanctuaries",
      type: LessonType.ARTICLE,
      articleHtml: articleHtml,
      order: 1,
      accessTier: AccessTier.FREE,
      isActive: true,
      durationMins: 15,
    },
  });

  let practiceSet = await prisma.practiceSet.findFirst({
    where: { chapterId: chapter.id, title: "Bird Sanctuaries Practice Set" }
  });

  if (practiceSet) {
    // PracticeSet already exists and doesn't have a description field to update
  } else {
    practiceSet = await prisma.practiceSet.create({
      data: {
        subjectId: subjectId,
        chapterId: chapter.id,
        title: "Bird Sanctuaries Practice Set",
        order: 1,
        accessTier: AccessTier.FREE,
        isActive: true,
      }
    });
  }

  const questionsData = [
    {
      text: "'Nelapattu Bird Sanctuary' is located in which of the following Indian state?",
      options: ["Tamil Nadu", "Odisha", "Rajasthan", "Andhra Pradesh"],
      correct: "Andhra Pradesh",
      difficulty: Difficulty.EASY,
      explanation: "Nelapattu Bird Sanctuary is located in the Nellore district of Andhra Pradesh. It is an important breeding site for spot-billed pelicans.",
    },
    {
      text: "'Najafgarh Drain Bird Sanctuary' is located in which of the following State/UT?",
      options: ["Delhi", "Maharashtra", "Gujarat", "Puducherry"],
      correct: "Delhi",
      difficulty: Difficulty.EASY,
      explanation: "Najafgarh Drain Bird Sanctuary is a wetland ecosystem located in Delhi, playing a vital role in supporting migratory birds in the NCR region.",
    },
    {
      text: "'Nal Sarovar Bird Sanctuary' is located in which of the following state?",
      options: ["Mizoram", "Assam", "Tamil Nadu", "Gujarat"],
      correct: "Gujarat",
      difficulty: Difficulty.EASY,
      explanation: "Nal Sarovar Bird Sanctuary, established in 1969, is located in Gujarat and is the largest wetland bird sanctuary in the state.",
    },
    {
      text: "Which is the biggest Bird Sanctuary in India?",
      options: ["Nal Sarovar Bird Sanctuary", "Vettangudi Bird Sanctuary", "Vedanthangal Bird Sanctuary", "Nelapattu Bird Sanctuary"],
      correct: "Nal Sarovar Bird Sanctuary",
      difficulty: Difficulty.MEDIUM,
      explanation: "Nal Sarovar in Gujarat is considered one of the largest bird sanctuaries in India, spanning over 120 sq km of lake and ambient marshes.",
    },
    {
      text: "'Salim Ali Bird Sanctuary' is located in which of the following Indian state?",
      options: ["Goa", "Jharkhand", "Uttar Pradesh", "Kerala"],
      correct: "Goa",
      difficulty: Difficulty.EASY,
      explanation: "Named after the eminent Indian ornithologist Salim Ali, this sanctuary is an estuarine mangrove habitat located on the island of Chorão in Goa.",
    },
    {
      text: "'Mandagadde Bird Sanctuary' is located in which of the following state?",
      options: ["Tripura", "Karnataka", "West Bengal", "Nagaland"],
      correct: "Karnataka",
      difficulty: Difficulty.EASY,
      explanation: "Mandagadde Bird Sanctuary is located on an island in the Tunga river in the Shimoga district of Karnataka.",
    },
    {
      text: "'Chintamoni Kar Bird Sanctuary' located in ___________.",
      options: ["Madhya Pradesh", "Nagaland", "Karnataka", "West Bengal"],
      correct: "West Bengal",
      difficulty: Difficulty.MEDIUM,
      explanation: "Chintamoni Kar Bird Sanctuary is located in Kolkata, West Bengal, and is known for its wide variety of local birds, butterflies, and orchids.",
    },
    {
      text: "'Thattekkad Bird Sanctuary' is located in which of the following state?",
      options: ["Assam", "Punjab", "Chhattisgarh", "Kerala"],
      correct: "Kerala",
      difficulty: Difficulty.EASY,
      explanation: "Thattekkad Bird Sanctuary is located in Kerala. It was described by Salim Ali as the richest bird habitat in peninsular India.",
    },
    {
      text: "'Chilika Bird Sanctuary' is located in which of the following state?",
      options: ["Manipur", "Odisha", "Mizoram", "Gujarat"],
      correct: "Odisha",
      difficulty: Difficulty.EASY,
      explanation: "Chilika Lake in Odisha is the largest coastal lagoon in India and a major wintering ground for migratory birds.",
    },
    {
      text: "Which is India's first Bird sanctuary?",
      options: ["Nelapattu Bird Sanctuary", "Khijadiya Bird Sanctuary", "Vedanthangal Bird Sanctuary", "Mayani Bird Sanctuary"],
      correct: "Vedanthangal Bird Sanctuary",
      difficulty: Difficulty.MEDIUM,
      explanation: "Vedanthangal Bird Sanctuary in Tamil Nadu is the oldest bird sanctuary in India, with its protection dating back to the 18th century.",
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

  console.log("  -> Bird Sanctuaries chapter seeded.");
}
