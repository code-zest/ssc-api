import { AccessTier, PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# Physics - Light Energy

## Light Energy
- Light is a form of electromagnetic radiation emitted by hot objects like lasers, bulbs, and the sun.
- Light is a kind of kinetic energy which enables the human eye to see or make things visible.
- Light contains photons which are minute packets of energy. When an object's atoms get heated up, it results in the production of photons and this is how photons are produced.
- The electrons find excitement from the heat and result in earning extra energy. The energy is released in the form of a photon and more photons come out as the substance gets hotter.
- The branch of medicine concerned with the study and treatment of disorders and diseases of the eye is called ophthalmology.

### Luminous & Non-luminous Bodies
We can divide bodies or objects into two categories based on their light emission:

#### 1. Self Luminous Bodies
- Objects that emit their own light are called **luminous objects**.
- The **human eye** perceives the light reflecting from different objects to cause the sensation of vision. In order to reflect from different objects, we must make the light fall on the objects.
- Light is generated only from luminous objects. So luminous objects are responsible for our vision.
- **Examples**: sun, stars, candle, tubelight, electric bulb, etc.
- Luminous bodies can be divided into two categories:
  1. **Natural sources**: sun, stars
  2. **Artificial sources**: tubelight, electric bulb, candle

#### 2. Non Luminous Bodies
- Objects that cannot emit light energy by themselves are known as **non-luminous objects**.
- These objects do not cause the sensation of light.
- The non-luminous objects are visible because of luminous objects.
- **Examples**: earth, moon, satellites, planets, human body, wall, etc.

### Types of Materials
- **Transparent materials**: The materials which allow the light to pass through them are known as transparent materials. (Eg: Glass, water, air).
- **Translucent materials**: The materials which allow the fraction of light passing through them are known as translucent materials. (Eg: Thin tissue paper, waxed papers, frosted glass, etc.).
- **Opaque materials**: The materials which do not allow the light to pass through them are known as opaque materials. (Eg: cardboards, bricks, eyelids, buildings, wall, etc.).

---

## Theories of Light

### Corpuscular Theory
- **Sir Isaac Newton** proposed the corpuscular theory to explain the properties of light.
- According to this theory, light is made from small and extremely light particles called **corpuscles**.
- When these corpuscles travelling in a straight line hit the retina of the eye, it produces the sensation of vision.
- The corpuscles travel with a speed equal to the speed of light in all directions in straight lines.
- The corpuscles of different colours are of different sizes (red corpuscles larger than blue corpuscles).
- Explains that light carries energy and momentum, travels in a straight line, propagates in vacuum, and laws of reflection and refraction.
- Fails to explain interference, diffraction, and polarization.
- A major prediction of the corpuscular theory is that the speed of light in a denser medium is more than the speed of light in a rarer medium. The truth is that the speed of light is smaller in a denser medium. Therefore, Newton's corpuscular theory is wrong.

### Wave Theory of Light
- Wave theory of light was given by **Christian Huygen**. According to this, a luminous body is a source of disturbance in a hypothetical medium ether. This medium pervades all space.
- It is assumed to be transparent and have zero inertia. The disturbance is propagated in the form of waves.
- The waves carry energy and momentum. Huygen assumed that the waves were longitudinal.
- Further when polarization was discovered, to explain it, light waves were assumed to be transverse in nature by Fresnel.
- This theory successfully explains interference and diffraction apart from other properties of light.
- Fails to explain photo-electric effect, Compton's effect, etc.
- Introduces the concept of wavefront.

### Quantum Theory of Light
- According to Planck's quantum theory, different atoms and molecules can emit or absorb energy in discrete quantities only.
- The smallest amount of energy that can be emitted or absorbed in the form of electromagnetic radiation is known as **quantum**.
- The energy of the radiation absorbed or emitted is directly proportional to the frequency of the radiation.
- **Formula**: $E = h \nu$ (where $E$ = Energy, $h$ = Planck's constant $6.626 \\times 10^{-34}$ J.s, $\\nu$ = frequency).

### Electromagnetic Theory of Light
- Introduced by **Maxwell in 1864**.
- According to this theory, light waves are of the same character as electromagnetic waves, that are caused by a rapidly oscillating electric current.
- One of these two directions can be considered to be that of the electric field.

---

## Properties of Light
- Rectilinear propagation of light
- Light velocity
- Reflection
- Refraction
- Total internal reflection
- Dispersion of light
- Scattering of light
- Interference
- Diffraction

### Rectilinear Propagation of Light
- Describes that light travels in a **straight line**.
- When an opaque body is placed in front of a source of light, a black or dark region appears behind it called a **shadow**. The formation of shadow depends on the sources of light.
- If the source of light is a point source, the shadow formed is called **umbra**.
- If the source of light is an extended source, the shadow formed is called **penumbra**.

### Light Intensity
- Refers to the strength or amount of light produced by a specific lamp source. It is the measure of the wavelength-weighted power emitted by a light source.
- **Units**:
  - **Candela (cd)**: SI unit to measure luminous intensity in a specific direction.
  - **Lumen (lm)**: Derived SI unit of luminous flux. Used to measure output of artificial lights.
  - **Lux (lx)**: Unit of illumination, equal to one lumen per square metre. 1 lux = 0.0929 footcandles (metre-candle).
  - **Footcandle (fc or ftc)**: Equivalent to lumens per square foot. Brightness of one candle covering a distance of one foot. Approx 10.7639 lux.
  - Photo meter is used to measure light intensity.

### Speed of Light
- The speed of light (when travelling in a vacuum) is $3 \\times 10^8$ meters per second.
- In miles, the speed of light in a vacuum is 186,282 miles per second.
- This speed is sufficient to travel the Earth's circumference more than 7 times in a single second.
- The distance travelled by light in a year is called a **light-year** ($9.4 \\times 10^{12}$ km).
- Important to note that light travels in waves. Contact with matter can decrease its speed. However, its speed in the Earth's atmosphere is almost similar to its speed in a vacuum.
- **Formula**: Velocity of light ($c$): $c = 3 \\times 10^8$ m/s, $c = s/t$.

---

## Refraction
- **Definition**: Refraction is the change in the direction of a wave passing from one medium to another.
- Refraction of light is one of the most commonly observed phenomena (sound waves and water waves also experience it).
- Makes optical instruments like magnifying glasses, lenses, and prisms possible, and allows us to focus light on our retina.
- Refraction is the bending of a wave caused due to the differences in density between the two substances.

### Causes of Refraction
- **Change of Speed Results in Change in Direction**: A light ray refracts whenever it travels at an angle into a medium of different refractive index.
- Example: air travelling into glass. Light slows down and changes direction slightly. It bends **towards the normal line** (from less dense to denser substance).
- If the light wave approaches perpendicular to the boundary, it does not refract in spite of the change in speed.

### Laws of Refraction of Light (Snell's Law)
- The incident ray, refracted ray, and the normal to the interface of two media all lie on the same plane.
- The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant (**Snell's Law**).
- $\\frac{\\sin i}{\\sin r} = \\text{constant}$

### Refractive Index
- Describes how fast light travels through the material. Dimensionless.
- Ratio between the speed of light in a vacuum ($c$) and the speed of light in the medium ($v$).
- $n = c/v$
- Based on the refractive index, the light ray bends at the junction separating the two media. Bends towards the normal if the new medium has a higher refractive index, else it bends away from the normal.

### Applications of Refraction
- **Optical Illusions**: Mirage and looming.
- **Swimming Pool**: Looks shallower than it really is.
- **Rainbow**: Formation is an example of refraction as sun rays bend through raindrops.
- **Prism**: White light passing through a prism is split into component colours (red, orange, yellow, green, blue, violet).
- **Optics and Technology**: Lens used in spectacles, peepholes of house doors, cameras, movie projectors, telescopes.

---

## Reflection of Light
- A highly polished surface, such as a mirror, reflects most of the light falling on it.
- The phenomenon of **bouncing back of light from a surface** is known as the reflection of light.
- Reflection enables us to see things when the reflected light is received by our eyes.

### Applications of Reflection
- Reason for vision of a human eye.
- Mirrors work under this principle.
- Total internal reflection of light.
- Optical fibre.

### Optical Fibre
- Technology associated with data transmission using light pulses travelling along with a long fiber which is usually made of plastic or glass.
- Preferred for transmission over metal wires as signals travel with fewer damages, and are unaffected by electromagnetic interference.
- Uses total internal reflection of light.
- Single-mode fiber for long-distance, multimode for shorter distances.

---

## Dispersion of Light
- Defined as splitting of white light into seven constituent colours when passed through a prism.
- The spectrum of colours is ordered violet, indigo, blue, green, yellow, orange, and red.
- **Explanation**: Prism acts as a medium for the separation of the colours. Wavelength of different components is different, so each gets deviated by a different angle due to velocity difference in the glass medium.
- **Red colour** has the maximum wavelength, deviates the least (forms upper part of spectrum). **Violet** has the least wavelength, deviates the most.
- **Equations**: $v = \\lambda f$ (where $v$ = velocity, $\\lambda$ = wavelength, $f$ = frequency) and $E = hf$.

### Visible Spectrum
- The human eye can detect the light spectrum ranging from 400 nanometers (violet) to about 700 nanometers (red).

| Colour | Wave length | Frequency |
|---|---|---|
| Violet | 380-450 nm | 668-789 THz |
| Blue | 450-495 nm | 606-668 THz |
| Green | 495-570 nm | 526-606 THz |
| Yellow | 570-590 nm | 508-526 THz |
| Orange | 590-620 nm | 484-508 THz |
| Red | 620-750 nm | 400-484 THz |

---

## Other Light Phenomena

### Scattering of Light
- When light passes from one medium to another (say air to glass of water), a part of the light is absorbed by particles of the medium preceded by subsequent radiation in a particular direction.
- Intensity depends on the size of particles and wavelength of the light.
- **Shorter wavelength** and high frequency scatter more. Longer wavelengths have low frequency, straighter paths, and less chance of colliding with particles.

### Raman Effect
- Discovered by **C.V. Raman** in 1928 (Nobel Prize in 1930).
- Inelastic scattering of photons from molecules such that they are excited to higher levels.
- Produces scattered photons with a different frequency dependent on the source and the vibrational/rotational properties of the molecules. Used in Raman spectroscopy.

### Interference of Light
- When two light waves of similar frequency having a zero or constant phase difference propagate in a medium simultaneously in the same direction, maximum intensity is obtained at few points (constructive interference) and minimum intensity at other few points (destructive interference).
- **Examples**: Kerosene oil spread on water surface showing decent colours, soap bubble having brilliant colours in sunlight.

### Diffraction of Light
- The phenomenon of bending of light around the corners and the spreading of light within the geometrical shadow of the opaque obstacles.
- More effective when dimensions of the aperture of obstacle are comparable to the wavelength of light.
- **Applications**: High quality microscopes showing blurred images, diffraction gratings used to separate colours in light.

### Polarisation
- Phenomenon caused due to the wave nature of electromagnetic radiation.
- **Applications**: Sunglasses (to reduce glare), Polaroid filters for stress analysis in plastic industries, 3D movies, distinguishing transverse/longitudinal waves, Infrared spectroscopy, Chemistry (testing chirality of organic compounds).

---

## Lenses and Mirrors

### Lenses
- A transmissive optical device that focuses or disperses light beams by means of refraction.
- Simple lens (single piece) vs Compound lens (several simple lenses).
- **Convex Lens (Converging)**: Thick in the middle, thinner at the edges. Light rays bend inwards and converge at the focal point.
- **Concave Lens (Diverging)**: Flat in the middle, thicker at the edges. Light rays bend outward and diverge.

### Mirrors
- Reflecting surface explained by the law of reflection (incident ray, reflected ray, normal to the surface).
- **Plane mirror**: Undergoes reflection, refraction, or absorption. So mirrors are polished surfaces coated with mercury. Forms an image using at least two rays.
  - *Applications*: Looking glass, solar cookers, periscopes (in submarines), kaleidoscopes.
- **Convex mirror**: Cut part of a hollow sphere painted from inside. Diverges light. Virtual, erect, and diminished images.
  - *Applications*: Corners of large buildings, sunglasses, vehicle mirrors, magnifying glasses, street light reflectors.
- **Concave mirrors**: Cut part of a hollow sphere painted on the outer surface. Converges light. Image can be small/large, real/virtual.
  - *Applications*: Shaving mirrors, head mirrors, ophthalmoscope, astronomical telescopes, headlights, solar furnaces.

### Formation of Rainbow
- Spectacular light show due to striking of light on water droplets after the rain.
- Multicoloured arc produced by reflection, refraction, and light dispersion.
- At first, there is refraction, then dispersion (white light into colours), then complete internal reflection at the opposite side of the drop, and finally refracted back to the air again.
- Experienced when observing in between 42-20 degrees.

---

## Advanced Optical Instruments and Rays

### Microscopes
- Used to observe small objects, even cells. Magnifies image through at least one lens (bending light toward the eye).
- **Simple microscope**: Magnifying glass with double convex lens (short focal length). Forms virtual, erect, bigger image (cannot be projected on a screen). Used by dermatologists, pedology, jewellers.
- **Compound microscope**: Intricate gathering of a combination of lenses that renders highly maximized image. Used in pathology labs, forensic laboratories, studying microbiology/plant cells.

### Telescopes & Periscopes & Cameras
- **Telescopes**: Look at distant objects. Types of Astronomical telescopes:
  1. **Refracting**: Combination of lenses.
  2. **Reflecting**: Combination of mirrors.
  3. **Catadioptric**: Combination of both lenses and mirrors.
- **Periscope**: Used for observing over/around an obstacle. Mirrors placed parallel at 45° angle. Used in submarines, nuclear reactors, military (tanks/armoured vehicles). Disadvantage: can only be used by one person at a time.
- **Camera**: Light proof box with a converging lens system at one end, light sensitive film at the other end. Real inverted image formed. Invented by **Joseph Niépce**.

### Infrared, Ultraviolet Rays & LASER
- **Infrared rays (IR)**: Wavelengths longer than visible light, undetectable by human eye.
  - *Applications*: Heat source (saunas, manufacturing, plastics), Cosmetology (smoothing wrinkles), Astronomy (infrared telescopes), Massage therapy, Infrared Photography, Infrared Communication (short-range data transmission using LEDs and photodiodes).
- **Ultra violet rays (UV)**: Wavelength between 10 and 400 nm (shorter than visible light, longer than X-rays). 10% of total light from sun. Used in medical/dental practices (killing bacteria), curing inks/resins.
- **LASER (Light Amplification by Stimulated Emission of Radiation)**: Coherent and very weak light produced by optical amplification.
  - *Applications*: DVD/CD/Barcode Scanners, drilling/cutting, medical devices, printing devices, military equipment (anti-missile).
`;

const QUESTIONS = [
  {
    questionText:
      "Which of the following is not an example of total internal reflection of light?",
    options: [
      {
        key: "1",
        text: "A blackened egg shines like silver when placed in water",
      },
      {
        key: "2",
        text: "If a coin is placed under a glass and water is poured into the glass, the coin disappears",
      },
      {
        key: "3",
        text: "If a coin is placed in a glass and water is poured into the glass, the coin appears on the surface of the water",
      },
      { key: "4", text: "Letters appear to be raised under the glass" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "The image formed when an object is placed at the focus in front of a concave mirror is:",
    options: [
      { key: "1", text: "Real image with diffraction" },
      { key: "2", text: "Real image with high curvature" },
      { key: "3", text: "Real image with equal size" },
      { key: "4", text: "False image with curvature" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "If you look at the telescope in the opposite direction, that is, through the objective lens,",
    options: [
      { key: "1", text: "the object appears very small." },
      { key: "2", text: "the object appears very large." },
      { key: "3", text: "There is no change in the image." },
      { key: "4", text: "the image is slightly larger than the first time." },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "The focal length of a compound microscope can be increased in the following ways:",
    options: [
      {
        key: "1",
        text: "When the focal lengths of the objective lens and the eyepiece are small",
      },
      {
        key: "2",
        text: "When the focal length of the objective lens is small and the eyepiece is large",
      },
      { key: "3", text: "When both have large focal lengths" },
      {
        key: "4",
        text: "When the focal length of both the objective lens and the eyepiece is large",
      },
    ],
    correctOption: "1",
  },
  {
    questionText: "The most commonly used optical lenses are made of",
    options: [
      {
        key: "1",
        text: "Crown glass with a high focal length, flint glass with a low focal length",
      },
      {
        key: "2",
        text: "Crown glass with a low focal length, plint glass with a high focal length",
      },
      {
        key: "3",
        text: "Crown glass with a low focal length, plint glass with a high focal length",
      },
      {
        key: "4",
        text: "Borosilicate glass with a high focal length, crown glass with a low focal length",
      },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "A bird flies vertically to catch a fish in a pond. How does the bird appear to the fish?",
    options: [
      { key: "1", text: "Faster than the original speed, smaller" },
      { key: "2", text: "Slower than the original speed, smaller" },
      { key: "3", text: "Slower than the original speed, larger" },
      { key: "4", text: "Faster than the original speed, larger" },
    ],
    correctOption: "1",
  },
];

// Note from Key on Page 22:
// 1.4, 2.2, 3.1, 4.1, 5.3, 6.1
// All keys are exactly matching the ones I put into correctOption

export async function seedLightEnergy(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Light Energy Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Light Energy",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Light Energy",
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
          tags: ["Physics", "Light Energy"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-light-energy-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-light-energy-ps",
      title: "Light Energy Practice Quiz",
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
  console.log("🎉 Successfully seeded Light Energy content!");
}
