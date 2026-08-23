import { PrismaClient } from "@prisma/client";

export async function seedSyllabus(prisma: PrismaClient) {
  console.log("Seeding all SSC exam syllabi...");

  const examDefs = [
    { id: "cl_exam_ssc_cgl_tier1",  name: "SSC CGL Tier 1",  examYear: 2026, description: "SSC CGL Tier 1 (Qualifying)" },
    { id: "cl_exam_ssc_cgl_tier2",  name: "SSC CGL Tier 2",  examYear: 2026, description: "SSC CGL Tier 2 (Merit-Deciding)" },
    { id: "cl_exam_ssc_chsl_tier1", name: "SSC CHSL Tier 1", examYear: 2026, description: "SSC CHSL Tier 1 (Computer Based)" },
    { id: "cl_exam_ssc_chsl_tier2", name: "SSC CHSL Tier 2", examYear: 2026, description: "SSC CHSL Tier 2 (Skill Test)" },
    { id: "cl_exam_ssc_mts_tier1",  name: "SSC MTS",         examYear: 2026, description: "SSC Multi-Tasking Staff" },
    { id: "cl_exam_ssc_cpo_tier1",  name: "SSC CPO Tier 1",  examYear: 2026, description: "SSC CPO Paper 1" },
    { id: "cl_exam_ssc_cpo_tier2",  name: "SSC CPO Tier 2",  examYear: 2026, description: "SSC CPO Paper 2 - English" },
    { id: "cl_exam_ssc_gd",         name: "SSC GD",          examYear: 2026, description: "SSC GD Constable" },
  ];

  const exams: Record<string, { id: string }> = {};
  for (const ex of examDefs) {
    exams[ex.id] = await prisma.targetExam.upsert({
      where: { id: ex.id },
      update: { name: ex.name, description: ex.description },
      create: ex,
    });
  }

  const subjectDefs = [
    { id: "sub_quant",     name: "Quantitative Aptitude",            description: "Mathematics & Numerical Ability" },
    { id: "sub_reasoning", name: "General Intelligence & Reasoning",  description: "Reasoning & Logical Thinking" },
    { id: "sub_english",   name: "English Comprehension",            description: "English Language & Grammar" },
    { id: "sub_ga",        name: "General Awareness",                description: "GK, Current Affairs & Static GK" },
    { id: "sub_computer",  name: "Computer Knowledge",               description: "Computer Proficiency & IT Literacy" },
    { id: "sub_hindi",     name: "Hindi Language",                   description: "Hindi Bhasha" },
  ];

  for (const s of subjectDefs) {
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    let sub = await prisma.subject.findFirst({ where: { slug } });
    if (!sub) {
      sub = await prisma.subject.create({
        data: { id: s.id, name: s.name, description: s.description, isActive: true, slug },
      });
    }
  }

  const cglTier1: Record<string, string[]> = {
    sub_quant: ["Number System","Percentages","Ratio & Proportion","Square Roots","Averages","Simple Interest","Compound Interest","Profit and Loss","Discount","Mixture & Alligation","Time & Work","Time Speed & Distance","Algebra","Geometry","Mensuration","Trigonometry","Data Interpretation"],
    sub_reasoning: ["Analogies","Similarities & Differences","Space Visualization","Spatial Orientation","Problem Solving","Analysis & Judgment","Decision Making","Visual Memory","Discrimination & Observation","Relationship Concepts","Arithmetical Reasoning","Figure Classification","Arithmetic Number Series","Non-Verbal Series","Coding-Decoding","Statement & Conclusion","Syllogistic Reasoning"],
    sub_english: ["Reading Comprehension","Fill in the Blanks","Spelling Error","Idioms & Phrases","One Word Substitution","Sentence Improvement","Active/Passive Voice","Direct/Indirect Speech","Cloze Passage","Para Jumbles","Error Spotting"],
    sub_ga: ["History of India","Culture & Heritage","Geography of India & World","Indian Economy","Indian Polity & Constitution","Scientific Research","Biology","Physics","Chemistry","Current Affairs","Awards & Honours","Sports","Books & Authors"],
  };

  const cglTier2: Record<string, string[]> = {
    sub_quant: ["Number Systems","Fundamental Arithmetical Operations","Algebra","Geometry","Mensuration","Trigonometry","Statistics & Probability","Data Interpretation","Data Sufficiency"],
    sub_reasoning: ["Semantic Analogy","Symbolic Operations","Number Analogy","Figural Analogy","Space Orientation","Venn Diagrams","Drawing Inferences","Punched Hole/Pattern-Folding","Figural Pattern Completion","Indexing & Address Matching","Date & City Matching","Number Series"],
    sub_english: ["Vocabulary","Grammar","Sentence Structure","Synonyms & Antonyms","Spot the Error","Fill in the Blanks","Spelling","Idioms & Phrases","One Word Substitution","Sentence Improvement","Active/Passive Voice","Direct/Indirect Speech","Cloze Passage","Comprehension Passage"],
    sub_ga: ["History","Culture","Geography","Economic Scene","General Policy & Scientific Research","Current Affairs"],
    sub_computer: ["Computer Basics (CPU, I/O Devices, Memory, Ports)","Operating Systems (Windows, Unix basics)","MS Office (Word, Excel, PowerPoint)","Working with Internet & E-mails","Networking Basics & Cyber Security","Keyboard Shortcuts"],
  };

  const chslTier1: Record<string, string[]> = {
    sub_quant: ["Number System","Computation of Whole Numbers","Decimals & Fractions","Relationship between Numbers","Percentages","Ratio & Proportion","Square Roots","Averages","Interest","Profit and Loss","Discount","Mensuration","Time & Work","Time Speed & Distance","Use of Tables & Graphs","Data Interpretation"],
    sub_reasoning: ["Semantic Analogy","Symbolic/Number Analogy","Figural Analogy","Semantic Classification","Symbolic/Number Classification","Figural Classification","Semantic Series","Number Series","Figural Series","Problem Solving","Word Building","Coding & Decoding","Numerical Operations","Space Orientation","Space Visualization","Venn Diagrams"],
    sub_english: ["Spot the Error","Fill in the Blanks","Synonyms","Antonyms","Spelling/Detecting Mis-spelt Words","Idioms & Phrases","One Word Substitution","Improvement of Sentences","Active/Passive Voice","Direct/Indirect Speech","Shuffling of Sentence Parts","Cloze Passage","Comprehension Passage"],
    sub_ga: ["India & Its Neighbouring Countries","Sports","History of India","Culture","Geography","Economic Scene","General Polity","Indian Constitution","Scientific Research","Current Affairs"],
  };

  const chslTier2: Record<string, string[]> = {
    sub_quant: ["Number Systems","Algebra","Geometry & Mensuration","Trigonometry","Statistics & Probability","Profit Loss & Discount","Time & Work","Time Speed & Distance"],
    sub_english: ["Vocabulary","Grammar","Synonyms & Antonyms","Spot the Error","Fill in the Blanks","Spelling","Idioms & Phrases","One Word Substitution","Sentence Improvement","Active/Passive Voice","Direct/Indirect Speech","Cloze Passage","Comprehension Passage","Para Jumbles"],
    sub_computer: ["Computer Basics (Organization, CPU, I/O Devices)","Computer Memory & Memory Organization","Backup Devices & Ports","Windows Explorer & Keyboard Shortcuts","Basics of GUI (Windows, Desktop, Taskbar)","MS Word (Editing, Formatting, Printing)","MS Excel (Formulas, Charts, Data)","MS PowerPoint (Presentations, Slides)","Communication via E-mail","Internet & WWW Basics","Networking Basics & Cyber Security"],
    sub_reasoning: ["Analogies","Similarities & Differences","Coding-Decoding","Number Series","Venn Diagrams","Figural Classification","Drawing Inferences","Critical Thinking"],
    sub_ga: ["History","Culture","Geography","Indian Polity","Economic Scene","General Policy & Scientific Research","Current Affairs"],
  };

  const mts: Record<string, string[]> = {
    sub_reasoning: ["Number & Alphabet Series","Coding-Decoding","Analogy","Odd One Out / Classification","Matrix","Mathematical Operations","Word Arrangement","Spatial Reasoning","Venn Diagrams","Data Sufficiency","Direction Sense","Blood Relations","Age Problems","Calendar & Clock"],
    sub_quant: ["Number System","Computation of Whole Numbers","Decimals & Fractions","Percentages","Ratio & Proportion","Averages","Simple & Compound Interest","Profit Loss & Discount","Time & Work","Time Speed & Distance","Mensuration (2D & 3D)","Data Interpretation"],
    sub_english: ["Vocabulary","Grammar","Fill in the Blanks","Spelling Correction","Synonyms","Antonyms","One Word Substitution","Idioms & Phrases","Sentence Rearrangement","Error Spotting","Cloze Passage","Reading Comprehension"],
    sub_ga: ["History of India","Indian Polity & Constitution","Geography of India & World","Indian Economy","Science (Physics Chemistry Biology)","Environment & Ecology","Current Affairs (National & International)","Sports","Books & Authors","Important Dates & Events"],
    sub_hindi: ["Vyakaran (Grammar)","Paryayvachi (Synonyms)","Vilom (Antonyms)","Muhavare aur Lokoktiyan","Rikt Sthan Bharen (Fill in the Blanks)","Vartani (Spelling)","Vakya Sudhar (Sentence Improvement)"],
  };

  const cpoTier1: Record<string, string[]> = {
    sub_reasoning: ["Analogies","Similarities & Differences","Space Visualization & Spatial Orientation","Analysis & Judgment","Decision Making","Problem Solving","Visual Memory","Discrimination & Observation","Relationship Concepts","Arithmetical Reasoning","Figure Classification","Arithmetic Number Series","Non-Verbal Series","Coding-Decoding","Statement & Conclusion","Syllogistic Reasoning","Blood Relations","Direction Sense","Seating Arrangement","Puzzles"],
    sub_ga: ["India & Its Neighbouring Countries","Sports","History of India","Culture & Heritage","Geography of India & World","Economic Scene","General Polity & Indian Constitution","Scientific Research","Biology","Physics","Chemistry","Current Affairs (National & International)","Awards & Honours"],
    sub_quant: ["Number System","HCF & LCM","Decimals & Fractions","Percentages","Ratio & Proportion","Square Roots","Averages","Simple & Compound Interest","Profit Loss & Discount","Mixture & Alligation","Time & Work","Time Speed & Distance","Algebra","Geometry","Mensuration","Trigonometry","Data Interpretation"],
    sub_english: ["Spot the Error","Fill in the Blanks","Synonyms","Antonyms","Spelling/Detecting Mis-spelt Words","Idioms & Phrases","One Word Substitution","Improvement of Sentences","Active/Passive Voice","Direct/Indirect Speech","Para Jumbles","Cloze Passage","Comprehension Passage"],
  };

  const cpoTier2: Record<string, string[]> = {
    sub_english: ["Reading Comprehension","Cloze Passage","Fill in the Blanks","Error Spotting","Sentence Improvement","Para Jumbles","Active/Passive Voice","Direct/Indirect Speech","Synonyms","Antonyms","Idioms & Phrases","One Word Substitution","Vocabulary (Contextual Usage)","Advanced Grammar"],
  };

  const gdConstable: Record<string, string[]> = {
    sub_reasoning: ["Analogies","Similarities & Differences","Spatial Visualization & Orientation","Problem Solving","Analysis & Judgment","Decision Making","Arithmetic Reasoning","Relationship Concepts","Figure Classification","Number Series","Alphabet Series","Coding-Decoding","Blood Relations","Direction Sense","Ranking & Arrangement","Non-Verbal Reasoning"],
    sub_ga: ["History of India & Freedom Movement","Geography of India & World","Indian Polity & Constitution","Indian Economy & Five Year Plans","General Science (Physics Chemistry Biology)","Environment & Ecology","Sports & Games","Current Affairs (National & International)","Important Days & Events","Books & Authors","Awards & Honours","Abbreviations & Important GK"],
    sub_quant: ["Number System","HCF & LCM","Decimals & Fractions","Percentages","Ratio & Proportion","Averages","Simple & Compound Interest","Profit Loss & Discount","Time & Work","Time Speed & Distance","Mensuration (2D & 3D)","Pipes & Cisterns","Elementary Statistics","Data Interpretation"],
    sub_english: ["Spot the Error","Fill in the Blanks","Synonyms","Antonyms","Spelling/Detecting Mis-spelt Words","Idioms & Phrases","One Word Substitution","Improvement of Sentences","Comprehension Passage","Para Jumbles"],
    sub_hindi: ["Vyakaran (Grammar)","Paryayvachi (Synonyms)","Vilom (Antonyms)","Muhavare aur Lokoktiyan","Rikt Sthan Bharen (Fill in the Blanks)","Vartani (Spelling Correction)","Vakya Sudhar (Sentence Improvement)","Apathit Gadyansh (Comprehension Passage)"],
  };

  async function seedExamSyllabus(exam: { id: string }, syllabusMap: Record<string, string[]>) {
    for (const [subjectId, chapters] of Object.entries(syllabusMap)) {
      for (let i = 0; i < chapters.length; i++) {
        const chapName = chapters[i];
        const slug = chapName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        let chap = await prisma.chapter.findFirst({ where: { subjectId, slug } });
        if (!chap) {
          chap = await prisma.chapter.create({
            data: { name: chapName, subjectId, order: i + 1, isActive: true, slug },
          });
        }
        const existingNode = await prisma.syllabusNode.findFirst({
          where: { examId: exam.id, subjectId, chapterId: chap.id },
        });
        if (!existingNode) {
          await prisma.syllabusNode.create({
            data: {
              id: `node_${exam.id}_${subjectId}_${chap.id}`,
              examId: exam.id, subjectId, chapterId: chap.id,
              weightage: 100 / chapters.length, order: i + 1,
            },
          });
        }
      }
    }
    console.log(`  checked ${exam.id}`);
  }

  await seedExamSyllabus(exams["cl_exam_ssc_cgl_tier1"],  cglTier1);
  await seedExamSyllabus(exams["cl_exam_ssc_cgl_tier2"],  cglTier2);
  await seedExamSyllabus(exams["cl_exam_ssc_chsl_tier1"], chslTier1);
  await seedExamSyllabus(exams["cl_exam_ssc_chsl_tier2"], chslTier2);
  await seedExamSyllabus(exams["cl_exam_ssc_mts_tier1"],  mts);
  await seedExamSyllabus(exams["cl_exam_ssc_cpo_tier1"],  cpoTier1);
  await seedExamSyllabus(exams["cl_exam_ssc_cpo_tier2"],  cpoTier2);
  await seedExamSyllabus(exams["cl_exam_ssc_gd"],         gdConstable);

  console.log("\nAll SSC exam syllabi seeded successfully!");
}
