import {
  PrismaClient,
  LessonType,
  Difficulty,
  AccessTier,
  ExamType,
} from "@prisma/client";

const ARTICLE_HTML = `
## Our Universe
- The universe is filled with billions of galaxies and trillions of stars, along with nearly uncountable numbers of planets, moons, asteroids, comets and clouds of dust and gas all swirling in the vastness of space.
- The collection of **eight planets and their moons** in orbit around the sun, together with smaller bodies in the form of asteroids, meteoroids, and comets is called the **solar system**.
- The planets of the solar system are (in order of distance from the sun) Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.
- That planetary motion was explained by two types of theories.
  1) Geocentric theory
  2) Heliocentric theory

## Geocentric theory
- Geocentric theory was proposed by the scientist Ptolemy of Alexandria.
- According to these theory, the structure of the solar system (or the universe) in which Earth is assumed to be at the centre of it all.

## Heliocentric theory
- Heliocentric theory was proposed by the scientist Nicholas Copernicus.
- According to these theory the Sun is assumed to lie at or near a central point of the solar system or of the universe, while the Earth and other bodies revolve around it.

## Kepler's laws of planetary motion
- In astronomy, Kepler's laws of planetary motion are three scientific laws describing the motion of planets around the sun.
- Kepler first law – The law of orbits
- Kepler's second law – The law of equal areas
- Kepler's third law – The law of periods

**Kepler first law – The law of orbits**
- Planet revolves in an elliptical orbit around the sun, the sun being at one of the two foci of the ellipse.

**Kepler's second law – The law of equal areas**
- The radius vector of any planet relative to the sun sweeps out equal area in equal time.
- It works on the principle conservation of angular momentum
- Angular momentum
  - \`L = mvr\`
  - m: mass of the planet
  - v: orbital velocity of planet
  - r: orbital radius of planet
  - \`v α (1/r)\`  ('m' is always constant )

**Kepler's third law – The law of periods**
- The square of the time period of revolution of a planet around the sun in an elliptical orbit is directly proportional to the cube of its semi-major axis.
  - \`T² α R³\`
  - r = length of semi major axis
  - T = Time period of the planet .
- Pluto takes 248 Earth years to make one revolution around the sun.

## Newton's Law of Universal Gravitation
- Newton's Law of Universal Gravitation states that every particle attracts every other particle in the universe with a force that is directly proportional to the product of the masses and inversely proportional to the square of the distance between them.
  - \`F α (m₁m₂ / d²)\`
  - \`F = G (m₁m₂ / d²)\`
  - G = universal gravitational constant
  - \`G = F d² / (m₁m₂)\`
- Henry Cavendish discovered these universal gravitational constant.
  - \`G = 6.67 X 10⁻¹¹ Nm²Kg⁻²\`

**Applications**
- It uses this to calculate the force or pull of gravity of the planets in the universe.
- It is also used in calculating the trajectory of astronomical bodies and to predict their motion
- It pulls all the objects towards the earth.

## Some important terms

**Earths gravitational force**
- Each body in this universe attracts other bodies towards itself with a force known as Gravitational Force, thus gravitation is a study of the interaction between two masses. Out of the two masses, the heavier one is called source mass and the lighter one is called test mass.
- Gravitational force is a central force which depends only on the position of test mass from the source mass and always acts along the line joining the centres of the two masses.

**Acceleration due to gravity**
- Acceleration due to gravity is the acceleration gained by an object due to gravitational force.
- Its SI unit is m/s².
- It has both magnitude and direction, hence, it's a vector quantity.
- Acceleration due to gravity is represented by g.
- The standard value of g on the surface of the earth at sea level is 9.8 m/s².
- The velocity of a freely falling body increases, so we consider its acceleration due to gravity as '+g' and the velocity of the vertically projected body decreases, hence we consider its acceleration due to gravity as '-g'.

## Reasons for change in acceleration due to gravity of earth

**Acceleration due to gravity vary with the shape of the earth**
- Acceleration due to gravity of earth
  - \`g= GM/r²\`
  - G : universal gravitational constant
  - M: mass of the earth ( constant )
  - r : radius of the earth ( varies )
  - \`g α 1/r²\`
- As the earth is an oval shape, its radius near the equator is more than its radius near poles.
- Since for a source mass, the acceleration due to gravity is inversely proportional to the square of the radius of the earth, it varies with latitude due to the shape of the earth.

## Orbital velocity
- Orbital velocity is the velocity at which a body revolves around the other body.
- Objects that travel in the uniform circular motion around the Earth are called to be in orbit.
- The velocity of this orbit depends on the distance between the object and the centre of the earth.
- This velocity is usually given to the artificial satellites so that it revolves around any particular planet.
- The orbital velocity formula is given by,
  - \`V_orbit = √(GM / R)\`
  - \`V_o = 7.92 km / sec\`

## Satellites
- An object orbiting around the sun, earth or any other colossal body is known as a **satellite**.
- There are two major types of categorization when it comes down to satellites.
  1) Natural satellite .
  2) Artificial satellite.

**Natural satellite**
- Some examples of natural satellites are planets, moons, and comets.
- Jupiter has 67 natural satellites.
- The earth has one permanent natural satellite, the moon we know, which causes the tides in the sea.
- Sometimes other objects (like asteroids) can enter into temporary orbits of the earth and become a natural satellite for a span.

**Artificial satellite**
- The earth has many man-made satellites that are placed in orbit and are used for different applications in communications and information gathering.
- As the term itself states, an artificial satellite is one that is put in our space by human efforts and follows the orbit of natural satellites.

**Geo stationary satellite**
- These satellites are placed into orbit at a distance of around 35,800 km from the earth's surface.
- They rotate in the same direction as the earth and one revolution of such satellites is the same as one day on earth (roughly 24 hours).
- This means that, as seen from earth, these satellites will appear to be at the same spot throughout. Hence, the name “geostationary” satellites.
- These satellites are used as communication satellites and for weather-based applications.
- A geostationary equatorial orbit (GEO) is a circular geosynchronous orbit in the plane of the Earth's equator with a radius of approximately 42,164 km measured from the center of the Earth.
`;

const QUESTIONS = [
  {
    questionText:
      "The first to state that the sun is at the center of the universe and that all other celestial bodies revolve around the sun.",
    options: [
      { key: "1", text: "Ptolemy" },
      { key: "2", text: "Copernicus" },
      { key: "3", text: "Galileo" },
      { key: "4", text: "Kepler" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "The order in which the Sun, Earth, and Moon are present during a solar eclipse is",
    options: [
      { key: "1", text: "Sun, Earth, Moon" },
      { key: "2", text: "Sun, Moon, Earth" },
      { key: "3", text: "Earth, Sun, Moon" },
      { key: "4", text: "Moon, Sun, Earth" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "Which of the following is incorrect regarding the surface of the moon?",
    options: [
      { key: "1", text: "There is no water or atmosphere on the moon" },
      {
        key: "2",
        text: "The surface of the moon is flat with high mountains.",
      },
      { key: "3", text: "The surface of the moon is barren." },
      {
        key: "4",
        text: "The surface of the moon is completely covered with dust and dirt",
      },
    ],
    correctOption: "2",
  },
  {
    questionText: "Which of the following is incorrect?",
    options: [
      {
        key: "1",
        text: "Mercury, Venus, Earth, and Mars, which are closer to the Sun, are called inner planets",
      },
      {
        key: "2",
        text: "Jupiter, Saturn, Uranus, and Neptune, which are farther from the Sun, are called outer planets.",
      },
      { key: "3", text: "All the outer planets have rings around them" },
      { key: "4", text: "Uranus and Saturn rotate from east to west" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "If Mercury, Venus, Earth, and Mars are arranged in descending order of their sizes, then",
    options: [
      { key: "1", text: "Mars, Earth, Venus, Mercury" },
      { key: "2", text: "Venus, Earth, Mars, Mercury" },
      { key: "3", text: "Earth, Venus, Mars, Mercury" },
      { key: "4", text: "Earth, Mars, Venus, Mercury" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "Which among the following are the reasons for removal Pluto from the planet list?",
    options: [
      {
        key: "1",
        text: "Pluto is interfering with the orbits of its fellow planets and entering the orbit of Neptune",
      },
      { key: "2", text: "It is the farthest from the Sun" },
      {
        key: "3",
        text: "Pluto's orbit is not parallel to the orbits of the other planets",
      },
      { key: "4", text: "Pluto does not rotate on its own axis" },
    ],
    correctOption: "1",
  },
  {
    questionText: "Which of the following is incorrect in terms of Aryabhatta?",
    options: [
      {
        key: "1",
        text: "He stated that the Earth is a sphere and that it rotates on its own axis.",
      },
      {
        key: "2",
        text: "He proposed values for the diameter of the Earth and the period of its rotation very close to the current experimental values",
      },
      {
        key: "3",
        text: "The functioning of artificial satellites is discussed in detail",
      },
      { key: "4", text: "The moon and planets shine only due to sunlight" },
    ],
    correctOption: "3",
  },
  {
    questionText: "Which of the following is incorrect?",
    options: [
      { key: "1", text: "The brightest star in the sky is the Pole star" },
      {
        key: "2",
        text: "A line drawn eastward through the 3 stars in the middle of Orion leads to the star Sirius",
      },
      {
        key: "3",
        text: "The 3 stars in the middle of Orion from the hunter's belt, while the remaining 4 bright stars are arranged in a quadrilateral shape",
      },
      { key: "4", text: "Orion is also called the Hunter" },
    ],
    correctOption: "1",
  },
  {
    questionText: "Distance between Earth and Sun",
    options: [
      { key: "1", text: "150 million km" },
      { key: "2", text: "8 light minutes" },
      { key: "3", text: "150 billion km" },
      { key: "4", text: "1 and 2" },
    ],
    correctOption: "1",
  },
];

export async function seedOurUniverse(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Our Universe Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Our Universe",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Our Universe",
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
          tags: ["Physics", "Our Universe"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-our-universe-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-our-universe-ps",
      title: "Our Universe Practice Quiz",
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
  console.log("🎉 Successfully seeded Our Universe content!");
}
