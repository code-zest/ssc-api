import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Seeding SSC CGL Syllabus...");

  const tier1 = await prisma.targetExam.upsert({
    where: { id: "cl_exam_ssc_cgl_tier1" },
    update: {},
    create: {
      id: "cl_exam_ssc_cgl_tier1",
      name: "SSC CGL Tier 1",
      examYear: 2026,
      description: "SSC CGL Tier 1 (Qualifying)",
    },
  });

  const tier2 = await prisma.targetExam.upsert({
    where: { id: "cl_exam_ssc_cgl_tier2" },
    update: {},
    create: {
      id: "cl_exam_ssc_cgl_tier2",
      name: "SSC CGL Tier 2",
      examYear: 2026,
      description: "SSC CGL Tier 2 (Merit-Deciding)",
    },
  });

  const subjectsData = [
    { id: "sub_quant", name: "Quantitative Aptitude", description: "Mathematics" },
    { id: "sub_reasoning", name: "General Intelligence & Reasoning", description: "Reasoning" },
    { id: "sub_english", name: "English Comprehension", description: "English Language" },
    { id: "sub_ga", name: "General Awareness", description: "GK and Current Affairs" },
    { id: "sub_computer", name: "Computer Knowledge", description: "Computer Literacy" },
  ];

  for (const s of subjectsData) {
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    let sub = await prisma.subject.findFirst({ where: { slug } });
    if (!sub) {
        sub = await prisma.subject.create({
          data: { id: s.id, name: s.name, description: s.description, isActive: true, slug },
        });
    }
  }

  const tier1Syllabus: Record<string, string[]> = {
    "sub_quant": ["Number System", "Percentages", "Ratio & Proportion", "Square roots", "Averages", "Interest", "Profit and Loss", "Discount", "Time & Work", "Algebra", "Geometry", "Mensuration", "Trigonometry", "Data Interpretation"],
    "sub_reasoning": ["Analogies", "Similarities & Differences", "Space Visualization", "Problem Solving", "Analysis & Judgment", "Decision Making", "Visual Memory", "Relationship Concepts", "Number Series", "Coding-Decoding", "Syllogistic Reasoning"],
    "sub_english": ["Reading Comprehension", "Fill in the Blanks", "Spelling", "Idioms & Phrases", "One Word Substitution", "Sentence Improvement", "Active/Passive Voice", "Direct/Indirect Speech", "Cloze Passage"],
    "sub_ga": ["History", "Culture", "Geography", "Economic Scene", "General Policy", "Scientific Research", "Current Affairs"],
  };

  const tier2Syllabus: Record<string, string[]> = {
    "sub_quant": ["Number Systems", "Fundamental Arithmetical Operations", "Algebra", "Geometry", "Mensuration", "Trigonometry", "Statistics & Probability"],
    "sub_reasoning": ["Semantic Analogy", "Symbolic operations", "Number Analogy", "Figural Analogy", "Space Orientation", "Venn Diagrams", "Drawing Inferences", "Punched hole/pattern-folding", "Figural Pattern", "Number Series"],
    "sub_english": ["Vocabulary", "Grammar", "Sentence Structure", "Synonyms & Antonyms", "Spot the Error", "Fill in the Blanks", "Spelling", "Idioms & Phrases", "One word substitution", "Sentence Improvement", "Active/Passive", "Direct/Indirect", "Cloze Passage", "Comprehension Passage"],
    "sub_ga": ["History", "Culture", "Geography", "Economic Scene", "General Policy", "Scientific Research", "Current Affairs"],
    "sub_computer": ["Computer Basics", "Software", "Working with Internet and e-mails", "Basics of networking and cyber security"],
  };

  async function seedSyllabus(exam: any, syllabusMap: Record<string, string[]>) {
    for (const [subjectId, chapters] of Object.entries(syllabusMap)) {
      for (let i = 0; i < chapters.length; i++) {
        const chapName = chapters[i];
        const slug = chapName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        
        let chap = await prisma.chapter.findFirst({ where: { subjectId, slug } });
        if (!chap) {
            chap = await prisma.chapter.create({
              data: {
                name: chapName,
                subjectId: subjectId,
                order: i + 1,
                isActive: true,
                slug,
              }
            });
        }

        const nodeId = `node_${exam.id}_${subjectId}_${chap.id}`;
        
        const existingNode = await prisma.syllabusNode.findFirst({
            where: { examId: exam.id, subjectId: subjectId, chapterId: chap.id }
        });

        if (!existingNode) {
            await prisma.syllabusNode.create({
              data: {
                id: nodeId,
                examId: exam.id,
                subjectId: subjectId,
                chapterId: chap.id,
                weightage: 1.0,
                order: i + 1,
              }
            });
        }
      }
    }
  }

  await seedSyllabus(tier1, tier1Syllabus);
  await seedSyllabus(tier2, tier2Syllabus);

  console.log("SSC CGL Syllabus seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
