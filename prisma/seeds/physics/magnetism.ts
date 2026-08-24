import {
  PrismaClient,
  LessonType,
  Difficulty,
  AccessTier,
  ExamType,
} from "@prisma/client";

const ARTICLE_HTML = `
## Axial line and equitorial line
- The line which joins the north pole and south pole in a magnet is known as axial line
- The line which is perpendicular to the axial line is called as equitorial line

## Magnetic moment
- Magnetic moment can be defined as the magnetic strength and orientation of a magnet or other object that produces a magnetic field.
- Magnetic moment $M = 2l * m$
- Units : $Amp-m^2$
- A bar magnet of magnetic moment M is axially cut into two equal parts, then the magnetic moment M1 of each part should be half of the magnetic moment of the original magnet and its length should remain same
  - $M1 = 2l * m/2$
  - $M1 = M/2$
- A bar magnet of magnetic moment M is equatorially cut into two equal parts, then the length of each part should be half of the length of the original magnet and its magnetic moment should remain same
  - $M1 = (2l/2)*m$
  - $M1 = M/2$
- When a hole is cut in the bar magnet, the pole strength does not change, as the number of free poles at the ends do not change. Length does not change and magnetic moment also does not change.

## Magnetic field
- Magnetic Field is the region around a magnetic material or a moving electric charge within which the force of magnetism acts
- Units : 1) weber/$m^2$  2) Tesla  3) Oersted  4) Gauss
- Magnetic field intensity is inversely proportional to the square of the distance. That's why when we go far away from a magnet, distance increases then magnetic field intensity increases.
- $B \alpha 1/d^2$

## Methods of magnetisation
- Magnetisation can be defined as a process in which a substance is made a permanent or temporary magnet by exposing them to an external magnetic field.
- It is of 5 types
  1) Single touch method
  2) Double touch method
  3) Heating and cooling method
  4) Magnetic influence method
  5) Electrical method

### Electrical method for magnetisation
- For magnetization, a direct current flowing into a solenoid (a long insulated wire coiled into a cylinder) produces a magnetic field that, inside the coil, is uniform in strength and direction.
- The solenoid becomes a magnet.
- A steel bar placed inside the coil for a short while becomes magnetised due to magnetic induction from the solenoid.
- The polarities of the magnet depend on the direction of current flow.
- Magnetisation by electric current method creates more powerful magnets than other magnetization methods such as stroking.

## Uses of solenoids
- The solenoids are useful in many applications, from appliances to electron hobbies.
- They are usually found in the applications that require a feature that can automatically turn the appliance on or off.
- For example, an electric torch or an engine kill switch commonly used in motorbikes nowadays
- In the construction of transformers, permanent magnets are made up of materials like steel or alnico.

## Uses of magnetic materials
- Magnetic materials are used in speakers
- A bicycle dynamo consists of a permanent magnet and a coil of insulated copper wire wound on a laminated soft iron core
- Permanent magnets are used in electric generators
- Magnetic materials are used for repairing of telephone and telegraph
- The substance coated on plastic tape recorder tapes is ferric oxide or iron oxide
- Liquid state helium gas was used in the magnetic thermometer . This thermometer was used to calculate -233K or 0 degree centigrade.
- Magnets are also used in children's toys.
- Magnets are essential to enabling technologies of medical equipment, such as MRI machines, and also play a part in medical technology such as magnetic switches, blood separators.

## Types of magnetic materials
- In 16th century michael faraday classified the available magnetic materials in to three types

**1) Paramagnetic materials :**
- Paramagnetic materials are materials that tend to get weakly magnetized in the direction of the magnetizing field when placed in a magnetic field.
- These materials usually experience a weak attraction to magnets.
- This type of magnetism is known as paramagnetism.
- Eg.., magnesium , manganasese , aluminium etc..,

**2) Ferro magnetic materials :**
- Ferro magnetic materials are materials that tend to get strongly magnetized in the direction of the magnetizing field when placed in a magnetic field.
- These materials usually experience a strong attraction to magnets.
- This type of magnetism is known as ferro magnetism.
- Eg.., Iron (fe), cobalt (co),nickel(Ni) etc..,

**3) Diamagnetic materials :**
- Diamagnetic materials are materials that are not magnetized in the direction of the magnetizing field when placed in a magnetic field.
- These materials usually experience a strong repulsion to magnets.
- This type of magnetism is known as dia-magnetism.
- Eg.., Silver , gold , mercury , etc ..,
`;

const QUESTIONS = [
  {
    questionText:
      "The angle at which the force acting on a bar magnet should be made with the direction of the magnetic field so that the force acting on it becomes half of the maximum force is",
    options: [
      { key: "1", text: "30°" },
      { key: "2", text: "60°" },
      { key: "3", text: "40°" },
      { key: "4", text: "45°" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "The field intensity produced by a small magnet is inversely proportional to which of the following?",
    options: [
      { key: "1", text: "The square of the distance" },
      { key: "2", text: "The cube of the distance" },
      { key: "3", text: "The fourth power of the distance" },
      { key: "4", text: "None of the above" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "The number of magnetic poles at the centre of a bar magnet one metre long is",
    options: [
      { key: "1", text: "0" },
      { key: "2", text: "1" },
      { key: "3", text: "2" },
      { key: "4", text: "4" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "If a swimmer swims against the direction of the current, the magnetic needle, which is free to rotate in a horizontal plane under the conductor,",
    options: [
      { key: "1", text: "The north pole deviates towards his left hand." },
      { key: "2", text: "The south pole deviates towards his left hand." },
      { key: "3", text: "The needle does not deviate" },
      { key: "4", text: "The needle oscillates." },
    ],
    correctOption: "3",
  },
  {
    questionText: "Which of the following is incorrect?",
    options: [
      {
        key: "1",
        text: "A magnet does not lose its magnetic properties even if it is heated, struck or dropped from a height",
      },
      {
        key: "2",
        text: "While storing bar magnets, like poles should be kept on the same side and a piece of wood should be placed in the middle",
      },
      {
        key: "3",
        text: "To store a horseshoe magnet, a piece of iron should be placed between its poles.",
      },
      {
        key: "4",
        text: "Magnets should be kept away from television, mobiles, CDs and music systems.",
      },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "If the current flows in a circular coil in a counter clockwise direction, the surface will behave as follows.",
    options: [
      { key: "1", text: "South pole" },
      { key: "2", text: "North pole" },
      { key: "3", text: "Both" },
      { key: "4", text: "None" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "The property of a material that allows magnetic lines of force to flow through it is:",
    options: [
      { key: "1", text: "Relative permeability" },
      { key: "2", text: "Permeability" },
      { key: "3", text: "Intensity of magnetization" },
      { key: "4", text: "Magnetic flexibility" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "What is the property of a material to show magnetic properties when it is close to a single magnet?",
    options: [
      { key: "1", text: "Magnetic attraction" },
      { key: "2", text: "Magnetic repulsion" },
      { key: "3", text: "Magnetic induction" },
      { key: "4", text: "Magnetic inverse force" },
    ],
    correctOption: "3",
  },
];

export async function seedMagnetism(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Magnetism Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Magnetism",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Magnetism",
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
          examTypes: [
            ExamType.SSC_CGL,
            ExamType.SSC_CHSL,
            ExamType.SSC_MTS,
            ExamType.SSC_CPO,
            ExamType.SSC_GD,
          ],
          isActive: true,
          tags: ["Physics", "Magnetism"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-magnetism-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-magnetism-ps",
      title: "Magnetism Practice Quiz",
      subjectId: subjectId,
      chapterId: chapterId,
      questionCount: QUESTIONS.length,
      accessTier: AccessTier.FREE,
      order: 2,
      isActive: true,
    },
  });

  // 4. Link questions to the practice set
  const allChapterQuestions = await prisma.question.findMany({
    where: { chapterId: chapterId },
    orderBy: { createdAt: "asc" },
  });

  for (let i = 0; i < allChapterQuestions.length; i++) {
    const question = allChapterQuestions[i];
    await prisma.practiceSetQuestion.upsert({
      where: {
        practiceSetId_questionId: {
          practiceSetId: practiceSet.id,
          questionId: question.id,
        },
      },
      update: { order: i + 1 },
      create: {
        practiceSetId: practiceSet.id,
        questionId: question.id,
        order: i + 1,
      },
    });
  }

  console.log("✅ Seeded Practice Set!");
  console.log("🎉 Successfully seeded Magnetism content!");
}
