import { AccessTier, PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# Physics - Sound Energy

## Important Terminology
- **Medium**: The mechanical vibrations that can be interpreted as sound can travel through all forms of matter: gases, liquids, solids, and plasmas. The matter that supports the sound is called the medium.
- **Vacuum**: The place where there is no medium is called a vacuum. We can create these vacuums at any place on the earth.
- **Space**: The place which was present outside of the earth is called space. With no molecules in the vacuum of space, there is no medium for the sound waves to travel through, so there is no sound.
  - The father of chemistry Robert Boyle discovered that for travelling sound waves, a medium is necessary. In a vacuum, there is no medium present, so sound velocity is also zero.
- **Sound on Moon**: The Moon has no atmosphere like earth and there exists a vacuum. In a vacuum, there are no molecules to oscillate for propagating the sound. So, sound cannot travel on the moon.

## Frequencies
- **Audible frequency range**: The human ear can easily detect frequencies between 20 Hz and 20 kHz. Hence, sound waves with a frequency ranging from 20 Hz to 20 kHz are known as audible waves.
- **Infrasonics**: Sound waves with a frequency below **the lower limit of audibility (generally 20 Hz)** are called infrasonics.
  - Hearing gradually decreases as the frequency decreases.
  - People use this frequency range for monitoring earthquakes and volcanoes, charting rock and petroleum formations below the earth.
  - Animals that can communicate using infrasonic sounds are: elephants, whales, octopus, pigeons, squid, cuttlefish, cod, Guinea fowl, etc.
- **Ultrasonics**: Sound waves with a frequency above **the higher limit of audibility (generally 20 kHz)** are called ultrasonics.
  - Ultrasonic devices are used to detect objects and measure distances.
  - Ultrasound imaging or sonography is often used in medicine.
  - In the non-destructive testing of products and structures, ultrasound is used to detect invisible flaws.
  - Animals such as bats and porpoises use ultrasound for locating prey and obstacles.
  - Ultrasound is used for cleaning, mixing, and accelerating chemical processes.
  - **SONAR** (Sound Navigation and Ranging) is a technique that uses sound propagation (usually underwater, as in submarine navigation) to navigate, communicate with or detect objects on or under the surface of the water. In SONAR, we use ultrasonic waves.

## Wave
A wave is a disturbance in a medium that carries energy without a net movement of particles. Wave contains these characteristics:
- **Amplitude (a)**: Maximum displacement from its neutral position.
- **Wave length (λ)**: The distance between two successive crests or troughs of a wave.
  - Units: mm, cm, m. Smallest unit of wavelength is called **armstrong** (1 Å = 10^-10 m).
- **Time Period (T)**: The time taken for a wave to complete one oscillation. Units: sec, min, hr.
- **Frequency**: The number of vibrations of a wave per second.
  - Units: hertz (S.I. unit). (1 KHz = 1000 Hz)

## Types of Waves
### Mechanical Waves
- A wave which needs a medium in order to propagate itself.
- Sound waves, waves in a slinky, and water waves are all examples.

### Electromagnetic Waves
- These waves are the disturbance that does not need any object medium for propagation and can easily travel through the vacuum.
- Produced due to various **magnetic and electric fields**.
- Eg: UV rays, X rays, Gamma rays, Laser rays, etc.
- In air and vacuum, these electromagnetic waves travel with the same velocity of light ($c = 3 \times 10^8$ m/sec).

*These waves are again divided into two types based on their travel direction:*

#### Longitudinal Waves
- A longitudinal wave has the movement of the particles in the medium in the same dimension as the direction of movement of the wave.
- Examples: Sound waves, P-type earthquake waves, Compression wave.
- Parts: **Compression** (particles close together), **Rarefaction** (particles spread apart).

#### Transverse Waves
- Waves in which the medium moves at right angles to the direction of the wave.
- Examples: Water waves (ripples of gravity waves, not sound through water), Light waves, S-wave earthquake waves, Stringed instruments, Torsion wave.
- The high point is a **crest**. The low point is a **trough**.

### Stationary Waves
When two harmonic waves of equal frequency and amplitude travelling through a medium (say string) in opposite directions superimpose each other, we get stationary waves.

---

## Properties of Sound
- **Pitch/Frequency**: The perception of frequency of sound by the human ear is called pitch. Higher frequency = higher pitch. Lower frequency = lower pitch. Tonometer is a device used to measure the level of sound.
- **Amplitude/Loudness**: The amplitude of sound waves determines its loudness. The amplitude is a measure of the magnitude of the maximum disturbance of sound (more energetic vibration = larger amplitude).
- **Reflection of sound**: When sound waves hit the surface of a solid or liquid it bounces back to the same medium. Sound waves follow the laws of reflection.
- **Equation**: 
  - $V = 2d / t$ or $d = vt / 2$
  - Where $v$ = velocity, $d$ = distance, $t$ = time.
  - If $v = 330$ m/sec and $t = 1/10$ sec, then $d = 16.5$ m.
- **Applications**: Sonar is used in navigation, forecasting weather, tracking aircraft/submarines. Also entertainment electronics, radio, cassette, communication.

## Speed of Sound
- The speed at which sound waves travel through the medium is called the speed of sound. It is different for different mediums. Sound travels fastest in solids since atoms are closely packed.
- **Speed of Sound in Air**: The speed refers to the distance travelled per unit time by a sound wave propagating through a medium. In air at $20^\circ$C it is $343.2$ m/s ($1236$ km/h).
- **Pressure**: The force applied perpendicularly to the surface of an object per unit area. Formula: $P = F / A$. Unit: **pascal (Pa)**.

### Factors Affecting the Speed of Sound
- **Density**: Speed of sound decreases with an increase in the density of the medium.
- **Temperature**: $V_{T2} = V_{T1} + 0.61(T2 - T1)$. Speed of sound increases with an increase in temperature.
- **Humidity**: Speed of sound increases in proportion to humidity in air. Humidity has a small but significant effect (causing it to increase by about 0.1%-0.6%) because oxygen and nitrogen molecules are replaced by lighter molecules of water. In dry (0% humidity) air at $0^\circ$C: $v = 331.3 + 0.606T$ m/s.
- **Pressure of the medium**: Speed of sound in air does not depend on pressure.

### Speed of sound in solids and liquids
- **Solids**: Sound is propagated by collisions between particles. Solids are significantly denser than liquids/gases, molecules are closer, so they collide very quickly. Thus, the speed of sound is larger than in a gas. Speed of sound in solid steel is equal to $5100$ m/s (approx $6000$ m/s). Sound travels 35 times faster in diamonds than in air.
- **Liquids**: Density of liquid is greater than gas, so molecules are closer. Speed of sound in liquids lies in between solids and gases. Depends on the young modulus of that liquid.
  - Water: $1435$ m/sec
  - Salt water: $1485$ m/sec
  - Human blood ($37^\circ$C): $1570$ m/sec

---

## Mach Number
- Mach number is the ratio of flow velocity after a certain limit of the sound's speed. In simple words, ratio of speed of a body to the speed of sound in the surrounding medium.
- Formula: $M = u/c$
- Speed of objects compared with speed of sound is divided into 5 types:
  1. **Subsonic**: Speed below speed of sound ($M < 0.8$). Eg: car, bike, bus.
  2. **Sonic**: Speed equal to speed of sound ($M = 1$).
  3. **Supersonic**: Speed above speed of sound. Design involves complete movement of canards, thin aerofoil sections, sharp edges. ($M$ between $1.2$ and $5.0$).
  4. **Hyper sonic**: Features nickel-titanium skin cooled and small wings. ($M$ between $5.0$ and $10.0$). The U.S. plane X-15 created world record of flying at Mach 6.72.
  5. **High hyper sonic**: ($M$ between $10.0$ and $25.0$). Thermal controls become an integral portion of the design.

## Characteristics of Sound
- **Intensity of sound**: Directly proportional to the amplitude of the sound. So if amplitude increases, intensity increases. This unit is taken from the name of Alexander Graham Bell. Sound meter or noise meter is used to measure it.

### Sound Pollution (Intensity in dB)
| Situation | Sound intensity (dB) |
|---|---|
| Whispering | 20-30 dB |
| Conversation | 40-60 dB |
| Pendulum in a clock | 30 dB |
| Ring of landline phone | 60 dB |
| Intensity comes from traffic | 80-90 dB |
| Jet planes, missiles, rockets | 100-200 dB |
| GSLV rocket | 250 dB |
| Bike without silencer | 110-120 dB |

## Doppler Effect
- Defined as the increase (or decrease) in the frequency of sound, light, or other waves as the source and observer move towards (or away from) each other. First proposed by Christian Johann Doppler in 1842.
- **Formula**: $f' = ((V + Vo) / (V + Vs))f$
- **Uses**: Sirens, Radar, Astronomy, Medical Imaging, Blood Flow Measurement, Satellite Communication, Vibration Measurement, Developmental Biology, Audio, Velocity Profile Measurement.
- **Limitations**: Applicable only when the velocities of the source and the observer are much less than the velocity of sound. Motion must be along the same straight line.

## Telephones
Categorised into 3 types:
1. **Landline telephone**: Invented by Alexander Graham Bell.
2. **Mobile telephone**: Invented by Martin Cooper in April 1973.
3. **Hydrophone**: Used under the water. Invented by Ernest Rutherford.
`;

const QUESTIONS = [
  {
    questionText: "The period of a wave with a frequency of 500Hz is",
    options: [
      { key: "1", text: "0.001s" },
      { key: "2", text: "0.005s" },
      { key: "3", text: "0.01s" },
      { key: "4", text: "0.002s" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "In a density and position graph, the highest region is called .... and the lowest region is called ....",
    options: [
      { key: "1", text: "Peak, compression" },
      { key: "2", text: "Rarefaction, trough" },
      { key: "3", text: "Peak, trough" },
      { key: "4", text: "Compression, rarefaction" },
    ],
    correctOption: "4", // Note from image: key says 4? Actually wait, let's look at key: 1.4, 2.3??
    // Let me check the key image carefully.
    // 1.4, 2.3, 3.1, 4.4, 5.1, 6.1, 7.1, 8.1, 9.3, 10.3
  },
  {
    questionText:
      "The frequency of a radio wave with a frequency of 10^9 Hz is ......... (radio wave speed 3 x 10^8 m/s)", // wait, image says 10^9 Hz? the text looks like 10^9 Hz or 10^6 Hz? "10^9 Hz". options: 30 cm, 60 cm, 10 cm, 40 cm
    // v = f * lambda -> lambda = v/f = (3*10^8) / (10^9) = 0.3 m = 30 cm. (Option 1)
    options: [
      { key: "1", text: "30 cm" },
      { key: "2", text: "60 cm" },
      { key: "3", text: "10 cm" },
      { key: "4", text: "40 cm" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "Dogs can hear sounds with frequencies below 2Hz. Humans cannot.",
    options: [
      { key: "1", text: "<2Hz" },
      { key: "2", text: "<=2000Hz" },
      { key: "3", text: "<20000Hz" },
      { key: "4", text: "20000Hz" },
    ],
    // The image text is a bit weird, let me copy exactly:
    // Dogs can hear sounds with frequencies below 2Hz. Humans cannot. (Wait, the question is actually incomplete in the OCR?)
    // Let me just copy it as is. Key is 4.4 -> option 4.
    correctOption: "4",
  },
  {
    questionText:
      "An object has a frequency of 430Hz. The number of vibrations that the object makes in one second is",
    options: [
      { key: "1", text: "430" },
      { key: "2", text: "860" },
      { key: "3", text: "215" },
      { key: "4", text: "zero" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "If the vibration limit is defined in terms of displacement, the units are",
    options: [
      { key: "1", text: "Meter" },
      { key: "2", text: "Pascal" },
      { key: "3", text: "Kgm-3" },
      { key: "4", text: "M-3" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "The speed of sound of different frequencies in a given medium under the same physical conditions is.......",
    options: [
      { key: "1", text: "Constant" },
      { key: "2", text: "Increasing" },
      { key: "3", text: "Decreasing" },
      { key: "4", text: "Increasing or decreasing" },
    ],
    correctOption: "1",
  },
  {
    questionText: "Human auditory range",
    options: [
      { key: "1", text: "20Hz-20000Hz" },
      { key: "2", text: "200Hz-20000Hz" },
      { key: "3", text: "20Hz-2000Hz" },
      { key: "4", text: "2Hz-20000Hz" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "Sound produced by a source is audible if it is reflected back in more than 0.1 seconds.",
    options: [
      { key: "1", text: "reverberation" },
      { key: "2", text: "music" },
      { key: "3", text: "echo" },
      { key: "4", text: "multiple reflection" },
    ],
    correctOption: "3",
  },
  {
    questionText: "Typically the average factory sound intensity is",
    options: [
      { key: "1", text: "70dB" },
      { key: "2", text: "60dB" },
      { key: "3", text: "80dB" },
      { key: "4", text: "30Db" },
    ],
    correctOption: "3",
  },
];

// Let me fix question 2 key, it says 2.3 -> option 3 ("Peak, trough")
QUESTIONS[1].correctOption = "3";

export async function seedSoundEnergy(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Sound Energy Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Sound Energy",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Sound Energy",
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
          tags: ["Physics", "Sound Energy"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-sound-energy-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-sound-energy-ps",
      title: "Sound Energy Practice Quiz",
      subjectId: subjectId,
      chapterId: chapterId,
      questionCount: QUESTIONS.length,
      accessTier: AccessTier.FREE,
      order: 1,
      isActive: true,
    },
  });

  // Fetch all questions for this chapter to link them
  const allChapterQuestions = await prisma.question.findMany({
    where: { chapterId: chapterId },
    orderBy: { createdAt: "asc" },
  });

  for (let i = 0; i < allChapterQuestions.length; i++) {
    await prisma.practiceSetQuestion.upsert({
      where: {
        practiceSetId_questionId: {
          practiceSetId: practiceSet.id,
          questionId: allChapterQuestions[i].id,
        },
      },
      update: { order: i + 1 },
      create: {
        practiceSetId: practiceSet.id,
        questionId: allChapterQuestions[i].id,
        order: i + 1,
      },
    });
  }

  console.log("✅ Seeded Practice Set!");
  console.log("🎉 Successfully seeded Sound Energy content!");
}
