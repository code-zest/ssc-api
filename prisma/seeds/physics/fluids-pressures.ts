import {
  PrismaClient,
  LessonType,
  Difficulty,
  AccessTier,
  ExamType,
} from "@prisma/client";

const ARTICLE_HTML = `
## Fluids - Pressures
- Forces are of two types
  1. Cohesive forces
  2. Adhesive forces

### Cohesive forces
- The intermolecular attractive force acting between two adjacent portions of a substance, particularly of a solid or liquid.
- It is this force that holds a piece of matter together.
- Intermolecular forces act also between two dissimilar substances in contact, a phenomenon called adhesion.
- Here Mercury has higher cohesive forces while alcohol, kerosene, water have less cohesive forces.

### Adhesive forces
- Attractive forces between molecules of different types are called adhesive forces.

## Properties of liquids
  1) Surface tension
  2) Capillary action
  3) Viscosity
  4) Pressure

### 1. Surface tension
- Surface tension is the tension of the surface film of a liquid caused by the attraction of the particles in the surface layer by the bulk of the liquid, which tends to minimise surface area.
- Surface tension = cohesive force / length of water droplet.
- Units = 1) dyne / cm  2) N/m

**Examples of surface tension**
- Insects walking on water
- Floating a needle on the surface of the water
- Rainproof tent materials where the surface tension of water will bridge the pores in the tent material
- Clinical test for jaundice
- Surface tension disinfectants (disinfectants are solutions of low surface tension)
- Cleaning of clothes by soaps and detergents which lowers the surface tension of the water
- Washing with cold water
- Round bubbles where the surface tension of water provides the wall tension for the formation of water bubbles
- This phenomenon is also responsible for the shape of liquid droplets

### 2. Capillary action
- Tubes having very small diameters (narrow cylindrical tubes) are called capillary.
- If these narrow tubes dipped in a liquid it is observed that liquid in the capillary either rises (or) falls relative to the surrounding liquid level.
- This phenomenon is called capillary action and such tubes are called capillary
- A wet fluid displays such type of capillary action that is further caused due to the forces of cohesion and surface tension acting together.
- Capillary action is the resultant of intermolecular attraction between the molecules of water and the adhesive force in between the walls of the capillary and the liquid.

**Examples:**
- The oil in the wick of a lamp rises due to the capillary action of threads in the wick.
- The action of a towel in soaking up moisture from the body is due to the capillary action of cotton in the towel.
- Water is retained in a piece of sponge on account of capillarity.
- A blotting paper soaks ink by the capillary action of the pores in the blotting paper.
- The root-hairs of plants draw water from the soil through capillary action.

### 3. Viscosity
- The viscosity of a fluid is a measure of its resistance to deformation at a given rate.
- If the speed of the sphere is less, the viscosity will be more.
- The more viscous a fluid is, the more resistance it offers to any object moving inside it.
- Although all liquids have a certain value of viscosity, the for liquids is generally considered as high or low, keeping the viscosity of water as a benchmark.
- Both cohesion and molecular interchange contribute to liquid viscosity.
- The impact of increasing the temperature of a liquid is to reduce the cohesive forces while simultaneously increasing the rate of molecular interchange.
- The former effect causes a decrease in the shear stress while the latter causes it to increase.
- Units : 1. Pa - sec  2. Poise ( international unit )

**Applications of viscosity**
**Lubrication in vehicles**
- When you put oil into your car or truck, you should be aware of its viscosity. That's because viscosity affects friction, and friction, in turn, affects heat.
- In addition, viscosity also affects the rate of oil consumption and the ease with which your vehicle will start in hot or cold conditions.
- Some oils have a more stable viscosity, while others react to heat or cold; if your oil's viscosity index is low, it may become thinner as it heats, which can cause problems as you operate your car on a hot summer's day.

### 4. Pressure
- The force applied perpendicular to the surface of an object per unit area over which that force is distributed.
  $P = F / A$
- Units : 1) dyne / cm  2) N/m or 1 pascal  3) BAR
- If the cross sectional area of an object decreases then its pressure increases.

## Liquid Pressure
- Liquid pressure is the pressure exerted by the liquid per unit area of the surface.
- Liquid pressure $p = hdg$.
    - p : liquid pressure
    - h : height or depth of the liquid
    - d : density of the liquid
    - g : acceleration due to gravity.
- Note : Study of liquid's in motion is called as hydro dynamics

## Instruments and Laws

### Barometer
- A barometer is an instrument used to measure the air pressure as it varies with distance either above or below sea level.
- The instrument was invented by an Italian scientist Evangelista Torricelli in the year 1643.
- He studied the characteristics of the mercury when placed in a vacuum and used that theory to develop the first barometer.

### Pascal law
- The external static pressure applied on a confined liquid is distributed or transmitted evenly throughout the liquid in all directions.

**Applications:**
- **Hydraulic Lift:** It works based on the principle of equal pressure transmission throughout a fluid (Pascal's Law).
- Pressure applied at piston A is transmitted equally to piston B without diminishing, on the use of the fluid that cannot be compressed. Piston B effectively serves as a platform to lift heavy objects like big machines or vehicles.
- Few more applications include a hydraulic jack and hydraulic press and forced amplification is used in the braking system of most cars.

### Boyle's law
- Boyle's law is a gas law which states that the pressure exerted by a gas (of a given mass, kept at a constant temperature) is inversely proportional to the volume occupied by it.
- In other words, the pressure and volume of a gas are inversely proportional to each other as long as the temperature and the quantity of gas are kept constant.
  $P \alpha (1/V)$
- Where P is the pressure exerted by the gas and V is the volume occupied by it.

### Archimedes principle
- The upward buoyant force that is exerted on a body immersed in a fluid, whether partially or fully submerged, is equal to the weight of the fluid that the body displaces and acts in the upward direction at the center of mass of the displaced fluid.
- For knowing about the purity of gold, archimedes proposed this theory.
`;

const QUESTIONS = [
  {
    questionText:
      "When detergent powder is added to clean water, its contact angle",
    options: [
      { key: "1", text: "increases" },
      { key: "2", text: "decreases" },
      { key: "3", text: "does not change" },
      { key: "4", text: "can be any." },
    ],
    correctOption: "2",
  },
  {
    questionText: "Capillarity is not applicable.",
    options: [
      { key: "1", text: "Kerosene stove, lamp, wax candle working" },
      { key: "2", text: "Sandy soils being moist" },
      { key: "3", text: "Formation of oases in deserts" },
      { key: "4", text: "Water absorbed by plants through the stem rises" },
    ],
    correctOption: "2",
  },
  {
    questionText: "What is the unit of viscosity of substances?",
    options: [
      { key: "1", text: "Poise" },
      { key: "2", text: "Pascal-second" },
      { key: "3", text: "Both of the above" },
      { key: "4", text: "Calorie" },
    ],
    correctOption: "3",
  },
  {
    questionText: "The water in an earthen vessel remains cool. Because.",
    options: [
      {
        key: "1",
        text: "Earthen vessels have the ability to withstand high heat.",
      },
      { key: "2", text: "Earthen vessels are good conductors of heat" },
      {
        key: "3",
        text: "The water that comes out through the pores of the earthen vessels evaporates.",
      },
      { key: "4", text: "Earthen vessels absorb the heat from the water." },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "What is the volume of a balloon rising from the surface of the earth?",
    options: [
      { key: "1", text: "increases" },
      { key: "2", text: "decreases" },
      { key: "3", text: "does not change" },
      { key: "4", text: "does not rise" },
    ],
    correctOption: "1",
  },
  {
    questionText: "Which is not an example of capillarity?",
    options: [
      { key: "1", text: "Formation of oases in sandy deserts" },
      { key: "2", text: "Working of straw used for drinking cold drinks" },
      { key: "3", text: "Water sucked by plant roots rises" },
      { key: "4", text: "Kerosene rises due to pressure in kerosene stove" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "Why does mercury on a glass plate appear as clear liquid droplets?",
    options: [
      { key: "1", text: "Adhesive forces are maximum in mercury." },
      { key: "2", text: "The repulsive forces are maximum in mercury." },
      {
        key: "3",
        text: "The repulsive and cohesive forces are equal in mercury.",
      },
      { key: "4", text: "None" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "In a needle, gun barrel, knife, hammer etc., the tip is made to float, which of the following will happen?",
    options: [
      { key: "1", text: "The volume decreases" },
      { key: "2", text: "The buoyancy decreases" },
      { key: "3", text: "The pressure increases." },
      { key: "4", text: "All of the above" },
    ],
    correctOption: "3",
  },
  {
    questionText: "What is the reason for the spherical shape of raindrops?",
    options: [
      { key: "1", text: "Pressure" },
      { key: "2", text: "Capillary action" },
      { key: "3", text: "Surface tension." },
      { key: "4", text: "Viscosity" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "What is the principle on which Brama press and hydraulic brakes work?",
    options: [
      { key: "1", text: "Pascal's law" },
      { key: "2", text: "Archimedes' law" },
      { key: "3", text: "Boyle's law" },
      { key: "4", text: "Bernoulli's law" },
    ],
    correctOption: "1",
  },
];

export async function seedFluidsPressures(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Fluids - Pressures Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Fluids - Pressures",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Fluids - Pressures",
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
          tags: ["Physics", "Fluids - Pressures"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-fluids-pressures-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-fluids-pressures-ps",
      title: "Fluids - Pressures Practice Quiz",
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
  console.log("🎉 Successfully seeded Fluids - Pressures content!");
}
