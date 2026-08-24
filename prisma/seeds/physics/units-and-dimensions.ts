import {
  PrismaClient,
  LessonType,
  Difficulty,
  AccessTier,
  ExamType,
} from "@prisma/client";

const ARTICLE_HTML = `
## Physical quantities
- Quantities that can be measured also, in terms of which laws of Physics can be described, are called **physical quantities**.
- Example: mass, length etc.

## Unit
- Measurement of any physical quantity involves *comparison* with a certain basic, arbitrarily chosen, internationally accepted reference standard known as **unit**.
- Measurements were introduced by Kelvin.
- Liquids can be measured by using burettes, pipettes and flasks.
- In earlier times scientists of different countries were using four different systems of units for measurements:
  1. C.G.S: Centimetre, gram, second
  2. M.K.S: Meter, kilogram, second
  3. F.P.S: Foot, pound, second

## SI system
- The system of units which is at present internationally accepted for measurement is the **Systeme international** abbreviated as SI system.
- The SI system was recommended and developed by general conference on weights and measures in 1971.

## Fundamental quantities
- The quantities that are independent of other quantities are called **fundamental quantities**.
- The units that are used to measure these fundamental quantities are called **fundamental units**.
- There are four systems of units namely C.G.S, M.K.S, F.P.S, and SI.

| Fundamental quantities | C.G.S | M.K.S | F.P.S |
|---|---|---|---|
| Length | Centimetre | Meter | Foot |
| Mass | Gram | Kilogram | Pound |
| Time | Second | Second | Second |

| Fundamental quantity | Unit | Symbol |
|---|---|---|
| Length | Meter | M |
| Mass | Kilogram | Kg |
| Time | Second | Sec |
| Electric current | Ampere | A |
| Thermodynamics temperature | Kelvin | K |
| Intensity of light | Candela | Cd |
| Quantity of substance | Mole | Mol |

## Derived quantities
- The quantities that are derived using the fundamental quantities are called **derived quantities**.
- The units that are used to measure these derived quantities are called **derived units**.

| Derived quantity | Unit | Symbol |
|---|---|---|
| Area | Square meter | m² |
| Volume | Cubic meter | m³ |
| Velocity | Meter per second | m/s |
| Acceleration | Meter per second squared | m/s² |

## Supplementary quantities
| Quantity | Unit | Symbol |
|---|---|---|
| Plane angle | Radian | rad |
| Solid angle | Steridian | sr |

## Some important conclusions
- Angstrom is the unit of length used to measure the wavelength of light. 1 Å = 10⁻¹⁰ m.
- Fermi is the unit of length used to measure nuclear distances. 1 Fermi = 10⁻¹⁵ meter.
- A light year is the unit of length for measuring astronomical distances.
- Light year = distance traveled by light in 1 year = 9.4605 × 10¹⁵ m.
- Astronomical unit = Mean distance between the sun and earth = 1.5 × 10¹¹ m.
- Parsec = 3.26 light years = 3.084 × 10¹⁶ m
- Barn is the unit of area for measuring scattering cross-section of collisions. 1 barn = 10⁻²⁸ m².
- Diamond and gold are measured in carats. 1 carat = 280mg.
- Depth of the sea can be measured in nautical miles. 1 nautical mile = 1.15 miles or 1852 meters.
- The gallon is the unit measurement of volume.
  - 1 gallon (america) = 3.78 litres
  - 1 gallon (british) = 4.45 litres
- Sound can be measured in **decibels**.
- SI unit for radioactivity - **Bequerel**.
- Chronometers and metronomes are time measuring instruments.
- The quantity having the same unit in all the systems of units is time.

## DIMENSIONS
- Dimensions of a physical quantity are the powers to which the fundamental units are raised to obtain one unit of that quantity.

**Dimensional Formula**
- The expression showing the powers to which the fundamental units are to be raised to obtain one unit of a derived quantity is called the **dimensional formula** of that quantity.
- If Q is the unit of a derived quantity represented by
  - \`Q = MᵃLᵇTᶜ\`
- then \`MᵃLᵇTᶜ\` is called dimensional formula and the exponents a, b and c are called the dimensions.

**Dimensional constants**
- The physical quantities which have dimensions and have a fixed value are called **dimensional constants**.
- e.g.: Gravitational constant (G), Planck's constant (h), Universal gas constant (R), Velocity of light in a vacuum (C), etc.

## Some important conversions
- 1 bar = 10⁶ dyne/cm² = 10⁵ Nm⁻² = 10⁵ pascal
- 76 cm of Hg = 1.013 × 10⁶ dyne/cm² = 1.013 × 10⁵ pascal = 1.013 bar.
- 1 torricelli or torr = 1 mm of Hg = 1.333 × 10³ dyne/cm² = 1.333 millibar.
- 1 kmph = 5/18 ms⁻¹
- 1 dyne = 10⁻⁵ N
- 1 H.P = 746 watt
- 1 kilowatt hour = 36 × 10⁵ J
- 1 calorie = 4.2 joule
- 1 electron volt = 1.602 × 10⁻¹⁹ joule
- 1 erg = 10⁻⁷ joule

## Some important physical constants
- Velocity of light in vacuum (c) = 3 × 10⁸ ms⁻¹
- Velocity of sound in air at STP = 331 ms⁻¹
- Acceleration due to gravity (g) = 9.81 ms⁻²
- Avogadro number (N) = 6.023 × 10²³/mol
- Density of water at 4°C = 1000 kg m⁻³ or 1 g/cc
- Absolute zero = -273.15°C or 0 K
- Atomic mass unit = 1.66 × 10⁻²⁷ kg
- Quantum of charge (e) = 1.602 × 10⁻¹⁹ C
- Boltzmann's constant (K) = 1.381 × 10⁻²³ JK⁻¹
- One atmosphere = 76 cm Hg = 1.013 × 10⁵ Pa
- Mechanical equivalent of heat (J) = 4.186 J/cal
- Planck's constant (h) = 6.626 × 10⁻³⁴ Js
- Universal gas constant (R) = 8.314 J/mol-K
- Permeability of free space (μ₀) = 4π × 10⁻⁷ Hm⁻¹
- Permittivity of free space (ε₀) = 8.854 × 10⁻¹² Fm⁻¹
- The density of air at S.T.P. = 1.293 kg m⁻³
- Universal gravitational constant (G) = 6.67 × 10⁻¹¹ Nm²kg⁻²

## Dimensional formulas for physical quantities
| Physical quantity | Unit | Dimensional formula |
|---|---|---|
| Acceleration or acceleration due to gravity | ms⁻² | LT⁻² |
| Angle (arc/radius) | rad | M⁰L⁰T⁰ |
| Area (length x breadth) | m² | L² |
| Density (mass / volume) | kgm⁻³ | ML⁻³ |
| Displacement, wavelength, focal length | m | L |
| Electric current | ampere | I |
| Energy (capacity to do work) | joule | ML²T⁻² |
| Force (mass x acceleration) | newton (N) | MLT⁻² |
| Velocity (displacement/time) | ms⁻¹ | LT⁻¹ |
`;

const QUESTIONS = [
  {
    questionText:
      "Which of the following is not a precaution to be taken while measuring using a scale?",
    options: [
      {
        key: "1",
        text: "The first part of the scale should coincide with the first part of the object",
      },
      {
        key: "2",
        text: "The point on the scale should coincide with the first part of the object",
      },
      {
        key: "3",
        text: "Our eye should be fixed on the point from which we are taking the measurement on the scale",
      },
      {
        key: "4",
        text: "For accuracy, we should measure more than twice and take the average",
      },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "The metre scale, manufactured by which of the following countries, is the internationally accepted standard instrument for measuring distances?",
    options: [
      { key: "1", text: "America" },
      { key: "2", text: "England" },
      { key: "3", text: "France" },
      { key: "4", text: "Russia" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "Which of the following metals is used to make the French meter scale?",
    options: [
      { key: "1", text: "Platinum, gold" },
      { key: "2", text: "Iron, copper" },
      { key: "3", text: "Silver, iridium" },
      { key: "4", text: "Platinum, iridium" },
    ],
    correctOption: "4",
  },
  {
    questionText: "Choose the correct one?",
    options: [
      {
        key: "1",
        text: "10 kilograms should be written as 10kg and not as 10kgs.",
      },
      {
        key: "2",
        text: "All units should be written in the singular form only.",
      },
      { key: "3", text: "Both 1 and 2" },
      { key: "4", text: "None of the above" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "Volume of irregular objects like stones measured with the help of .........",
    options: [
      { key: "1", text: "Small cubes" },
      { key: "2", text: "Graph paper" },
      { key: "3", text: "Tape" },
      { key: "4", text: "Water displacement method" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "Which of the following is the unit commonly used to measure the volume of liquids?",
    options: [
      { key: "1", text: "cubic cm" },
      { key: "2", text: "cm" },
      { key: "3", text: "sq cm" },
      { key: "4", text: "ml" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "Which of the following is an instrument that accurately measures time between two events?",
    options: [
      { key: "1", text: "Sundial" },
      { key: "2", text: "Stopwatch" },
      { key: "3", text: "Hourglass" },
      { key: "4", text: "Water clock" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "The surface tension of a liquid in the following is 70 dyne/cm, its value in MKS method is",
    options: [
      { key: "1", text: "7×10⁻² N/m" },
      { key: "2", text: "70 N/m" },
      { key: "3", text: "7×10² N/m" },
      { key: "4", text: "7×10³ N/m" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "In one of the following systems of units, the unit of force is 100N, the unit of length is 10m, and the unit of time is 100s. The unit of mass in this system is",
    options: [
      { key: "1", text: "10² kg" },
      { key: "2", text: "10⁴ kg" },
      { key: "3", text: "10⁵ kg" },
      { key: "4", text: "10³ kg" },
    ],
    correctOption: "3",
  },
  {
    questionText: "Which of the following is equal to one nanometer?",
    options: [
      { key: "1", text: "10⁹ mm" },
      { key: "2", text: "10⁻⁷ cm" },
      { key: "3", text: "10⁻⁹ mm" },
      { key: "4", text: "10⁻⁶ cm" },
    ],
    correctOption: "2",
  },
];

export async function seedUnitsAndDimensions(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Units and Dimensions Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Units and Dimensions",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Units and Dimensions",
      slug: "theory",
      type: LessonType.ARTICLE,
      articleHtml: ARTICLE_HTML,
      order: 1,
      accessTier: AccessTier.FREE,
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
          tags: ["Physics", "Units and Dimensions"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-units-dimensions-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-units-dimensions-ps",
      title: "Units and Dimensions Practice Quiz",
      subjectId: subjectId,
      chapterId: chapterId,
      questionCount: QUESTIONS.length,
      accessTier: "FREE",
      order: 2,
      isActive: true,
    },
  });

  // 4. Link questions to the practice set
  const allChapterQuestions = await prisma.question.findMany({
    where: { chapterId: chapterId },
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
  console.log("🎉 Successfully seeded Units and Dimensions content!");
}
