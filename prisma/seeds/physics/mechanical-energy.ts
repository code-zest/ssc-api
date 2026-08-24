import {
  PrismaClient,
  LessonType,
  Difficulty,
  AccessTier,
  ExamType,
} from "@prisma/client";

const ARTICLE_HTML = `
## Acceleration
- Acceleration is defined as the rate of change of velocity with respect to time.
  - Acceleration (a) = change in velocity / time
- Units: \`m/sec²\` or \`cm/sec²\`
- It is a vector quantity.
- Acceleration is classified into two types:
  1. Positive acceleration
  2. Negative acceleration

**Positive acceleration**
- A positive acceleration means an increase in velocity with time.

**Negative acceleration**
- Negative acceleration means the speed reduces with time. It's a retardation.

**Note:**
- If the speed is increasing, the car has positive acceleration. When the car slows down, the speed decreases.
- When an object is speeding up, the acceleration is in the same direction as the velocity. Thus, this object has a positive acceleration.
- If the body is at rest, change in velocity is equal to zero, then its acceleration is equal to zero.
  - \`a = v/t\`
  - \`v = 0\`
  - \`a = 0\`

## Linear momentum (p)
- Linear momentum is the vector quantity and defined as the product of the mass of an object, m, and its velocity, v.
- The body's momentum is always in the same direction as its velocity vector.
- It's a conserved quantity which means that the total momentum of a system is constant.
- The units of linear momentum are \`gm cm / s\` (or) \`kg m / s\`.
  - \`P = m V\`
  - m : mass
  - V : velocity

## Force
- The quantity of force is expressed by the vector product of mass (m) and acceleration (a).
  - \`F = m a\`
  - m : mass
  - a : acceleration
- Units: 
  1. dyne
  2. Newton
- \`1 newton = 10⁵ dynes\`

**Internal force**
- Internal forces are forces exchanged by the objects in the system. To determine what part should be considered external and internal, mechanical system should be clearly defined.

**External force**
- External forces are forces resulting from the interaction between human body and its environment.
- External forces can be divided into contact forces and non-contact forces.
- Most forces that biomechanics works with are contact forces.
- Gravitational force, acting on all objects on the Earth, is a non-contact force.

## Newton's laws of motion

### Newton's first law of motion
- Newton's 1st law states that a body at rest or uniform motion will continue to be at rest or uniform motion until and unless a net external force acts on it.

**Inertia**
- This property of massive bodies to resist changes in their state of motion is called **inertia**.
- There are three types of inertia present:
  1. inertia of Rest
  2. inertia of Motion
  3. inertia of direction

**Inertia of rest**
- When the resistance is offered by the body to continue in the state of rest unless an external force acts on it.
- **Examples:**
  - when you shake a branch the leaves get detached.
  - when you beat a carpet the dust particles come out.
  - when you are sitting in a car and it starts moving you lean backward.

**Inertia of direction**
- When the resistance is offered by the body to continue the motion in the same direction unless an external force acts on it.
- **Examples:**
  - **Our protection through umbrella:** The rain drops falling vertically downwards cannot change their direction of motion and so cannot wet us when the umbrella is up.

**Inertia of motion**
- When the resistance is offered by the body to continue to be in the uniform motion unless an external force acts on it.
- **Examples:**
  - A person trying to get down from a running bus falls forward.
  - The fruits fall off due to the inertia of motion along the direction of wind.
  - The swirling of milk in a glass continues even after the stirring is stopped.

### Newton's second law of motion
- Newton's 2nd law states that the acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.
  - \`F = ma\`
  - m : mass of the object
  - a : acceleration of the object

### Newton's third law of motion
- The Newton's 3rd law states that for every action there is an equal and opposite reaction.
- **Applications:**
  - **A swimmer pushes the water backward** by his/her hands and in return the water pushes the swimmer forwards, thus enabling him to go forward during swimming.
  - **A man walking on the ground:** While walking, a person pushes the ground in the backward direction, and the ground in return pushes the person in the forward direction, thus making him/her walk.
  - **A bird while flying** pushes the air downwards with the help of its wings. Consistent with Newton's third law of motion, the air pushes the bird upwards.
  - **When a person is lying on a bed**, his weight is opposed by a reaction force from the bed (assuming it must be there because of Newton's third law of Motion). In turn, both forces cancel each other out, and the person enjoys the equilibrium position.

## Impulse
- Impulse is the big force acting for a very small interval of time. It is represented by \`J\` -> \`J\`->.
- Impulse Formula is articulated as:
  - \`J = F × t\`
  - Where, Force applied is given as F, Time interval throughout which force is applied is given as t.
- Impulse can also be articulated as the rate of change of momentum.
  - \`J = m × v\`
  - Where, Mass of the body is given as m, The velocity with which the body is moving is given as v.
- Velocity is articulated as \`v = v_f - v_i\`
  - Where, Initial Velocity is given as \`v_i\`, Final Velocity is given as \`v_f\`.
- Therefore, the Impulsive force is articulated as:
  - \`f = m(v_f - v_i)/t\`
- Impulse is articulated in \`Kgms⁻¹\` and Impulsive force is articulated in Newton (N).
- **Applications:**
  - Shock absorbers are used in vehicles such as scooters, motorcycles, car, etc
  - Buffers are provided between the bogies of a train
  - A cricket player lowers his hands while catching a fast moving cricket ball to avoid injury

## Projectile
- A projectile is any object thrown into space upon which the only acting force is gravity.
- The primary force acting on a projectile is gravity.
- The path followed by a projectile is known as a trajectory. A baseball batted or thrown is an example of the projectile.

**Projectile Motion**
- When a particle is thrown obliquely near the earth's surface, it moves along a curved path under constant acceleration that is directed towards the centre of the earth (we assume that the particle remains close to the surface of the earth). The path of such a particle is called a projectile and the motion is called projectile motion.
- In a Projectile Motion, there are two simultaneous independent rectilinear motions:
  - **Along the x-axis:** uniform velocity, responsible for the horizontal (forward) motion of the particle.
  - **Along y-axis:** uniform acceleration, responsible for the vertical (downwards) motion of the particle.

**Acceleration in the horizontal projectile motion and vertical projectile motion of a particle:**
- When a particle is projected in the air with some speed, the only force acting on it during its time in the air is the acceleration due to gravity (g).
- This acceleration acts vertically downward.
- There is no acceleration in the horizontal direction, which means that the velocity of the particle in the horizontal direction remains constant.

**Parabolic Motion of Projectiles**
- Let us consider a ball projected at an angle θ with respect to the horizontal x-axis with the initial velocity u.
- The point O is called the point of projection; θ is the angle of projection and OB = Horizontal Range or Simply Range. The total time taken by the particle from reaching O to B is called the time of flight.

## Kinetic energy
- Kinetic energy of an object is the measure of the work an object can do by the virtue of its motion.
  - \`K.E = ½ mv²\`
  - m: mass of the body
  - v: velocity of the body
- Here m : constant. So if velocity increases kinetic energy also increases: \`K.E α v²\`

**Relation between kinetic energy and momentum**
- \`K.E = ½ mv² ———(1)\`
- \`P = mv ———————(2)\`
- Multiply and divide equ(1) by m
  - \`K.E = ½ mv² (m/m)\`
  - \`= ½ (m²v²/m)\`
  - \`K.E = P²/2m\`

## Centripetal force
- A force that acts on a body moving in a circular path and directed towards the centre around which the body is moving is called **Centripetal force**.
- When an object travels around a circular path with a constant speed, it experiences an accelerating centripetal force towards the centre.
- The equation for centripetal force is as shown below:
  - \`F_c = mv²/r\`
  - Where \`F_c\` is the centripetal force, \`m\` is mass, \`v\` is velocity, \`r\` is the radius of the path.

**Examples:**
- **Spinning a ball on a string or twirling a lasso:** Here the centripetal force is provided by the force of tension on the rope pulls the object in toward the centre.
- **Turning a car:** Here the centripetal force is provided by the frictional force between the ground and the wheels.
- **Going through a loop on a roller coaster:** The force is provided by the Normal Force as the seat or wall pushes you toward the centre.
- **Planets orbiting around the Sun:** Centripetal Force is provided by Gravity.

## Centrifugal force
- If an object moving in a circle and experiences an outward force than this force is called the **centrifugal force**.
- However, the force also depends on the mass of the object, the distance from the centre of the circle and also the speed of rotation.
- If the object has more mass, the force of the movement and the speed of the object will be greater.
- If the distance is far from the centre of the circle the force of the movement will be more.
- Centrifugal force is a force that arises from the body's inertia and appears to act on a body that is moving in a circular path which is directed away from the centre around which the body is moving.
- Centrifugal force unit is **Newton**.
- The centrifugal force drives the object away from the centre. It is a fictitious force.
- Where, \`F_c = mv²/r\`
  - \`F_c\` is the Centrifugal force
  - \`m\` is the mass of the object
  - \`v\` is the velocity or speed of the object
  - \`r\` is the radius
- Centrifugal Force acts on every object moving in a circular path when viewed from a rotating frame of reference.

**Examples:**
- Weight of an object at the poles and on the equator
- A bike making a turn.
- Vehicle driving around a curve
- Equatorial railway

## Simple harmonic motion
- Simple harmonic motion can be described as an oscillatory motion in which the acceleration of the particle at any position is directly proportional to the displacement from the mean position.
- It is a special case of oscillatory motion.
- All the Simple Harmonic Motions are oscillatory and also periodic but not all oscillatory motions are SHM.
- Oscillatory motion is also called the harmonic motion of all the oscillatory motions wherein the most important one **is simple harmonic motion (SHM)**.
- In this type of oscillatory motion displacement, velocity and acceleration and force vary (w.r.t time) in a way that can be described by either sine (or) the cosine functions collectively called sinusoids.

**Applications:**
- Clock
- Car Shock Absorbers
- Musical Instruments
- Bungee Jumping
- Diving Board
- The Process of Hearing
- Earthquake-proof buildings
- Metronome.
`;

const QUESTIONS = [
  {
    questionText: "Which of the following is correct?",
    options: [
      {
        key: "1",
        text: "Rockets and jet planes operate on the basis of Newton's 3rd law of motion.",
      },
      {
        key: "2",
        text: "The weight of a person in a freely falling elevator is zero",
      },
      {
        key: "3",
        text: "If the mass of the object increases, the inertia of the object also increases.",
      },
      { key: "4", text: "All of the above" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "Which force acts on the person in the elevator is greater in this case?",
    options: [
      { key: "1", text: "When the elevator is accelerating downwards" },
      { key: "2", text: "When the elevator is accelerating upwards" },
      { key: "3", text: "When the elevator is descending at a constant speed" },
      { key: "4", text: "When the elevator is ascending at a constant speed" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "When a person in a downwards moving elevator drops a ball from his hand, what happens to it?",
    options: [
      { key: "1", text: "It falls downwards" },
      { key: "2", text: "It moves upwards" },
      { key: "3", text: "It stops at the midpoint of the elevator" },
      { key: "4", text: "It moves in a straight line." },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "What is the force acting on an airplane travelling in the air?",
    options: [
      { key: "1", text: "Potential energy" },
      { key: "2", text: "Kinetic energy" },
      { key: "3", text: "Both of the above" },
      { key: "4", text: "None of the above" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "What will happen if an object is dropped into a hole made from the North Pole to the South Pole of the Earth?",
    options: [
      { key: "1", text: "North Pole" },
      { key: "2", text: "South Pole" },
      { key: "3", text: "Center of the Earth" },
      { key: "4", text: "It moves linearly between the two poles." },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "In which part of the body should the centre of gravity of a vehicle be placed for safe travel on a curved path?",
    options: [
      { key: "1", text: "Above" },
      { key: "2", text: "In the middle" },
      { key: "3", text: "Below" },
      { key: "4", text: "Behind" },
    ],
    correctOption: "3",
  },
  {
    questionText: "Which of the following is not a correct statement?",
    options: [
      { key: "1", text: "Centripetal force is a real force" },
      { key: "2", text: "Centripetal force is a mean force" },
      { key: "3", text: "Centripetal and centrifugal forces are real forces" },
      {
        key: "4",
        text: "Centripetal force is provided by the centre of the circle.",
      },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "A horse rider may fall if the horse suddenly moves forward. The reason for this is?",
    options: [
      { key: "1", text: "Illusion of inertia" },
      { key: "2", text: "Law of conservation of mass" },
      { key: "3", text: "Inertia" },
      { key: "4", text: "Newton's 3rd law of motion" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "The force exerted by the blades of a rotating ceiling fan is?",
    options: [
      { key: "1", text: "Kinetic energy" },
      { key: "2", text: "Rotational kinetic energy" },
      { key: "3", text: "Static energy" },
      { key: "4", text: "2 and 3" },
    ],
    correctOption: "4",
  },
  {
    questionText: "Which is correct about the weight of an object?",
    options: [
      { key: "1", text: "Equal everywhere on the surface of the earth" },
      { key: "2", text: "Maximum at the poles" },
      { key: "3", text: "Maximum at the equator" },
      { key: "4", text: "Greater on hills than on flat land" },
    ],
    correctOption: "2",
  },
];

export async function seedMechanicalEnergy(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Mechanical Energy Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Mechanical Energy",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Mechanical Energy",
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
          tags: ["Physics", "Mechanical Energy"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-mechanical-energy-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-mechanical-energy-ps",
      title: "Mechanical Energy Practice Quiz",
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
  console.log("🎉 Successfully seeded Mechanical Energy content!");
}
