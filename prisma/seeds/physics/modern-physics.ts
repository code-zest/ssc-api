import {
  PrismaClient,
  LessonType,
  Difficulty,
  AccessTier,
  ExamType,
} from "@prisma/client";

const ARTICLE_HTML = `
## Modern Physics
- Quantum theory was proposed by Max Planck in the 19th century.
- In 1918, Max Planck got nobel prize for quantum theory.
- Father of modern physics - galileo
- Modern physics is a branch to study about atoms, electrons, protons, neutrons, x-rays, cosmic rays, isotopes, radioactive elements, nuclear fusion, nuclear fission, atomic reactors etc.

### Atom
- Atoms are defined as "the basic building blocks of matter".
- It is the smallest constituent unit of matter that possess the properties of the chemical element.
- Although a schoolteacher, a meteorologist, and an expert on color blindness, John Dalton is best known for his pioneering theory of atomism.
- He also developed methods to calculate atomic weights and structures and formulated the law of partial pressures.
- The atomic nucleus is the small, dense region consisting of protons and neutrons at the center of an atom, discovered in 1911 by Ernest Rutherford.
- size of a nucleus = 1 fermi. 1 fermi = $10^{-15}$ m
- Electrons are revolving around the nucleus.

### Electron discovery (cathode ray tube experiment)
- Cathode ray experiment was a result of English physicists named J. J. Thomson experimenting with cathode ray tubes.
- During his experiment he discovered electrons and it is one of the most important discoveries in the history of physics.
- He was even awarded a Nobel Prize in physics for this discovery and his work on the conduction of electricity in gases.
- However, talking about the experiment, J. J. Thomson took a tube made of glass containing two pieces of metal as an electrode.
- The air inside the chamber was subjected to high voltage and electricity flowing through the air from the negative electrode to the positive electrode.

**Properties**
- G. Johnstone Stoney gave the name electron to cathode rays.
- Perrine states that electrons have negative charge only and it was scientifically proved by the scientist millikan.
- Electrons are negatively charged particles.
- The mass of the electron is 1/2000 times lesser than the mass of protons and neutrons. Therefore, the electrons do not contribute to the mass of the atom.
- An electron has an electric charge of $1.602 \\times 10^{-19}$ coulombs.
- Electrons are subatomic particles found outside the nucleus, unlike protons and neutrons, which are present inside the nucleus.
- According to the Bohr atom model, electrons are continuously moving around the nucleus in orbits or shells.
- The invariant mass of an electron is approximately $9.109 \\times 10^{-31}$ kilograms.
- Electrons display both particle properties and wave properties.
- According to the principle of quantum mechanics, position and momentum of the electrons cannot be determined simultaneously.

### Protons
- Protons are the positively charged particles which are present in the nucleus of a hydrogen atom.
- Goldstein in the year 1886 found that the charge to mass ratio of the positive particles depends on the nature of the gas which is present in the discharge tube.
- This means that the charge to mass ratio (e/m) was different for different gases.
- He observed that the charge to mass ratio of the positive rays was highest in case of the hydrogen gas that was used in the discharge tube.
- This is mainly because hydrogen is the lightest atom so m will be the least hence e/m ratio will be highest in this case.
- The particle in the positive rays in the discharge tube was named as a proton.
- A proton can be produced when we remove an electron from the hydrogen atom.

**Properties of Protons**
- **Mass of Proton**
  - The mass of a proton is equal to that of the hydrogen atom.
  - A hydrogen atom consists of one electron and one proton.
  - As the mass of an electron is considered to be negligible therefore it can be said that the mass of a hydrogen atom is equal to the mass of a proton.
  - The mass of a proton is 1840 times the mass of an electron.
  - Mass of proton = $1.676 \\times 10^{-27}$ kg = $1.676 \\times 10^{-24}$ g
- **Charge of Proton**
  - The charge of a proton is equal to and opposite to that of an electron. Thus, it has a unit positive charge.
  - Charge on a proton = $+1.602 \\times 10^{-19}$ coulombs

### Neutrons
- Neutrons are subatomic particles that are one of the primary constituents of atomic nuclei.
- They are usually denoted by the symbol n.
- Neutrons do not have any net electric charge associated with them.

**Properties**
- The electric charge that is associated with a neutron is 0. Therefore, neutrons are neutrally charged subatomic particles.
- The mass of a neutron is roughly equal to 1.008 atomic mass units. When converted into kilograms, the mass of the neutron can be approximated to $1.674 \\times 10^{-27}$ kg.
- Despite the fact that the neutron is considered to be a neutral particle, the magnetic moment of neutrons is not equal to zero.
- Even though electric fields have no effects on neutrons, these subatomic particles are affected by the presence of magnetic fields.
- The magnetic moment associated with the neutron can be considered as an indication of its quark substructure and the distribution of its internal charges.

**Applications**
- In several nuclear reactions, the subatomic particle known as the neutron plays a significant role.
- Knowledge of neutrons and their activity has been especially important in the past for the development of many nuclear reactors (and also several nuclear weapons). The nuclear fissioning of such elements as uranium-235 and plutonium-239 is almost always caused by their neutron absorption.
- Warm, cold, and hot neutron radiation has a very important application in neutron scattering facilities where the radiation is also used in condensed matter research with the help of X-rays.
- When it comes to atomic comparisons, the neutrons are complementary to the latter via different scattering cross sections, their susceptibility to magnetism, their energy spectrum for inelastic neutron spectroscopy, and finally, their deep penetration into matter.
- One of the most significant applications of neutrons is in the excitation of delayed and triggered gamma rays from material components.
- NAA is most widely used to analyze small samples of materials in a nuclear reactor while PGNAA is most often used to examine subterranean rocks on conveyor belts around boreholes and industrial bulk materials.

## Some important terms

### Atomic Number
- Atomic number, the number of a chemical element in the periodic system, whereby the elements are arranged in order of increasing number of protons in the nucleus.
- Accordingly, the number of protons, which is always equal to the number of electrons in the neutral atom, is also the atomic number.

### Atomic Weight
- The total weight of an atom is called the atomic weight. It is approximately equal to the number of protons and neutrons, with a little extra added by the electrons.
- The stability of the nucleus, and hence the atom's radioactivity, is heavily dependent upon the number of neutrons it contains.

### Radio Isotopes
- Radioisotopes are radioactive isotopes of an element. They can also be defined as atoms that contain an unstable combination of neutrons and protons, or excess energy in their nucleus.
- This excess energy can be used in one of three ways: emitted from the nucleus as gamma radiation; transferred to one of its electrons to release it as a conversion electron; or used to create and emit a new particle (alpha particle or beta particle) from the nucleus.
- During those processes, the radionuclide is said to undergo radioactive decay.
- These emissions are considered ionizing radiation because they are powerful enough to liberate an electron from another atom.

**Uses**
- **Radio sodium:** Sodium 24 is used as an electrolyte tracer to follow the path sodium takes in a person's body to see if their uptake levels are within normal ranges, while sodium 22 is used in nuclear medicine imaging for positron emission tomography. Sodium -24 can also be used in non-medical applications.
- **Radio iodine:** Radioactive iodine (RAI, also called I-131) can be used to treat thyroid cancer. The RAI collects mainly in thyroid cells, where the radiation can destroy the thyroid gland and any other thyroid cells (including cancer cells) that take up iodine, with little effect on the rest of your body.
- **Radio phosphorous:** Phosphorus-32 (also known as P-32) treatment uses a radioactive form of sodium phosphate. Because P-32 is radioactive, it can be used to treat some diseases by injecting it into the body. When P-32 is injected into the bloodstream it collects in the bone marrow where it slows down the production of new blood cells.
- **Radio cobalt:** Co-60 is used medically for radiation therapy as implants and as an external source of radiation exposure. It is used industrially in leveling gauges and to x-ray welding seams and other structural elements to detect flaws. Co-60 also is used for food irradiation, a sterilization process.

### Dating Methods
- **Carbon dating $C^{14}$:** Carbon dating is one of the archaeology's mainstream methods for dating organic objects up to 50,000 years old. This method is based on the idea of radiative decay of Carbon-14 isotopes over thousands of years. Through physics, scientists have discovered that radioactive molecules decay at a specific rate dependent on the atomic number and mass of the decaying atoms. This constant can be used to determine the approximate age of the decaying material through the ratio of radioactive isotopes to the estimated initial concentration of these isotopes at the time of the organism's death. Scientists have concluded that very little change has occurred in the ratio of Carbon-12 to Carbon-14 isotopes in the atmosphere meaning that the relationship between these two should be very similar to how they remain today.
- **Uranium dating $U^{238}$:** These uranium isotopes are used to detect the age of the earth.
- **Note:** Indian atomic energy commission established Board of Radiation & Isotope Technology (BRIT) in mumbai.

## X-rays
- We can define X-Rays or X-radiation as a form of electromagnetic radiation.
- They are powerful waves of electromagnetic energy.
- Most of them have a wavelength ranging from 0.01 to 10 nanometres, corresponding to frequencies in the range 30 petahertz to 30 exahertz and energies in the range 100 eV to 100 keV.
- German physicist Wilhelm Rontgen is typically credited for the discovery of X-Rays in 1895.

**Properties**
- They have a shorter wavelength of the electromagnetic spectrum.
- Requires high voltage to produce X-Rays.
- They are used to capture the human skeleton defects.
- They travel in a straight line and do not carry an electric charge with them.
- They are capable of travelling in a vacuum.

**Types of X rays**
- There are two types of X-rays present.
  1) hard X - rays
  2) soft X - rays
- X-rays with high photon energies above 5-10 keV (below 0.2-0.1 nm wavelength) are called hard X-rays
- while those with lower energy (and longer wavelength) are called soft X-rays.
- By contrast, soft X-rays are easily absorbed in air; the attenuation length of 600 eV (~2 nm) X-rays in water is less than 1 micrometer.

**Applications of X-rays**
- Since the discovery of X-radiation, they are used in various fields and for various purposes. Some key uses of X-Ray are given below.
  - **Medical Science:** They are used for medical purposes to detect the breakage in human bones.
  - **Security:** They are used as a scanner to scan the luggage of passengers in airports, rail terminals, and other places.
  - **Astronomy:** It is emitted by celestial objects and are studied to understand the environment.
  - **Industrial Purpose:** It is widely used to detect the defects in the welds.
  - **Restoration:** They are used to restoring old paintings.

## Natural radioactivity
- Due to nuclear instability, an atom's nucleus exhibits the phenomenon of Radioactivity.
- Energy is lost due to radiation that is emitted out of the unstable nucleus of an atom.
- Two forces, namely the force of repulsion that is electrostatic and the powerful forces of attraction of the nucleus keep the nucleus together.
- These two forces are considered extremely strong in the natural environment.
- The chance of encountering instability increases as the size of the nucleus increases because the mass of the nucleus becomes a lot when concentrated.
- That's the reason why atoms of Plutonium, Uranium are extremely unstable and undergo the phenomenon of radioactivity.
- Henry Becquerel discovered radioactivity by accident. A Uranium compound was placed in a drawer containing photographic plates, wrapped in a black paper.
- Radioactivity can be seen in such forms:
  - Alpha Decay (Emission consists of Helium nucleus)
  - Beta Decay (Emission consists of Electrons)
  - Gamma Decay (Photons having high energy are emitted)

**Alpha decay**
- Alpha decay or $\\alpha$-decay is a type of radioactive decay in which the atomic nucleus emits an alpha particle thereby transforming or decaying into a new atomic nucleus.
- Here the atomic mass number of the newly formed atom will be reduced by four and the atomic number will be reduced by two.
- The emitted alpha particle is also known as a helium nucleus.
- The mass of the alpha particles is relatively large and has a positive charge.
- Ernest Rutherford distinguished alpha decay from other forms of radiation by studying the deflection of the radiation through a magnetic field.
- The deflection of alpha decay would be a positive charge as the particles have a +2e charge.

**Beta decay**
- Beta decay occurs in one of the two ways:
  - a) when the nucleus emits an electron and an antineutrino in a process that changes a neutron to a proton
  - b) when the nucleus emits a positron and a neutrino in a process that changes a proton to a neutron.

**Gamma decay**
- Gamma decay is the emission of electromagnetic radiation of an extremely high frequency i.e. very high energy, giving out excess energy in order to stabilize the unstable nucleus.
- You must be quite familiar with the various energy levels in an atom.
- The Nucleus has its own energy levels.
- Gamma decay is the nucleus's way of dropping from a higher energy level to a lower energy level through the emission of high energy photons. The energy level transition energies in the atom are in the order of MeV.
- Therefore, the gamma-ray emitted is also of very high energy of the order of MeV, just like x-rays.
- The gamma rays emitted can be differentiated from x-rays only by the fact that gamma rays come from the nucleus. Due to their high energy, they are extremely penetrating and thereby dangerous to biological life forms.

## Albert Einstein: Mass Energy Formula
- Mass energy formula is one of the significant foundations of Physics. German Physicist Albert Einstein put forth this famous law.
- In this law, it states that mass and energy are relative to each other. Mass energy formula explains how energy can be converted into mass and mass into energy.
- The theory states that the amount of energy possessed by an object is equal to its mass multiplied by the square of the speed of light.
- According to Einstein's Theory, equivalent energy can be calculated using the mass (m) and the speed of light.
  $E=mc^2$
  E = equivalent energy
  m = mass in kg
  c = speed of light ($c \\simeq 3 \\times 10^8$ m/s)

## Nuclear fission
- When the nucleus of an atom splits into lighter nuclei through a nuclear reaction the process is termed as nuclear fission.
- This decay can be natural spontaneous splitting by radioactive decay, or can actually be simulated in a lab by achieving necessary conditions (bombarding with neutrinos).
- The resulting fragments tend to have a combined mass which is less than the original.
- The missing mass is what is converted into nuclear energy in the above reaction.
- Therefore, nuclear fission is defined as the process in nuclear physics in which the nucleus of an atom splits into two daughter nuclei.
- That nuclear fission was first achieved by a team led by the German chemist Otto Hahn in 1938.

**Chain reaction**
- Nuclear chain reactions are series of nuclear fissions (splitting of atomic nuclei), each initiated by a neutron produced in a preceding fission.
- **Uncontrollable chain reaction:** The chain reaction requires both the release of neutrons from fissile isotopes undergoing nuclear fission and the subsequent absorption of some of these neutrons in fissile isotopes. When properly designed, this uncontrolled reaction will lead to an explosive energy release. (Example: Atom bomb).
- **Controllable chain reaction:** A controlled chain reaction is a chain of nuclear reactions that take place subsequently under controlled conditions. A controlled chain reaction is carried out in the presence of moderators. Controlled chain reactions are used in nuclear power plants to generate electricity.

**Nuclear reactor**
- The reactor is powered using continuous fission reactions to generate a continuous flow of energy.
- The kinetic energy produced during the fission reaction is converted into thermal energy.
- The fission products undergo extreme deceleration, where the KE is converted to heat.
- A neutron moderator can be used to check the speed in a reactor.
- The heat produced is transferred to a coolant which is either used directly or indirectly by converting into steam.
- This can be used to operate turbines, thereby converting the thermal energy into mechanical energy.
- In India, nuclear power is the 4th largest source of electricity generation.
- We have around 21 nuclear power reactors operating from around 7 plants over the country.

## Nuclear fusion
- Nuclear fusion is a reaction through which two or more light nuclei collide into each other to form a heavier nucleus.
- This reaction takes place with elements that have a low atomic number, such as hydrogen.
- It is the opposite of nuclear fission reaction in which heavy elements diffuse and form lighter elements.
- Every star in the universe, including the sun, is alive due to nuclear fusion.
- It is through this process that they produce such a mind-boggling amount of heat and energy.
- The pressure at the core of any star is tremendously high and that is where the nuclear fusion reaction takes place.

**Difference between nuclear fission and nuclear fusion**

| Feature | Nuclear fission | Nuclear fusion |
|---|---|---|
| Definition | Breaks heavy atom into two or smaller ones. | Brings two or more small atoms together to form one large atom. |
| Occurrence | Does not happen naturally. | The universe is full of instances of nuclear fusion reactions. Every star uses it to produce energy. |
| Energy | Produces a great deal more energy than chemical reactions but still not as much as fusion. | Produces abundant energy than fission reaction. |
| Condition | Does not require a lot of energy to split an atom into two. | Requires a lot of heat and pressure for the process to happen. |
`;

const QUESTIONS = [
  {
    questionText: "Who was the first Nobel Prize winner in Physics?",
    options: [
      { key: "1", text: "Einstein" },
      { key: "2", text: "Millikan" },
      { key: "3", text: "Roentgen" },
      { key: "4", text: "Rutherford" },
    ],
    correctOption: "3",
  },
  {
    questionText: "What are the basic particles in the atomic nucleus?",
    options: [
      { key: "1", text: "Electrons" },
      { key: "2", text: "Protons" },
      { key: "3", text: "Neutrons" },
      { key: "4", text: "2, 3" },
    ],
    correctOption: "4",
  },
  {
    questionText: "How are electrons produced in the laboratory?",
    options: [
      { key: "1", text: "Discharge in gases" },
      { key: "2", text: "Thermionic emission" },
      { key: "3", text: "Photoelectric effect" },
      { key: "4", text: "None of the above" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "What is the process that causes the sun and stars to become self-luminous?",
    options: [
      { key: "1", text: "Nuclear fission" },
      { key: "2", text: "Nuclear fusion" },
      { key: "3", text: "Both of the above" },
      { key: "4", text: "Chemical reactions" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "Which radioactive isotope is used to detect blood clots in the body?",
    options: [
      { key: "1", text: "Iodine 131" },
      { key: "2", text: "Sodium - 23" },
      { key: "3", text: "Cobalt - 60" },
      { key: "4", text: "Uranium - 233" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "What is the method used to separate light and heavy isotopes in a substance?",
    options: [
      { key: "1", text: "Photographic film" },
      { key: "2", text: "Gigger Muller counter" },
      { key: "3", text: "Cathode tube" },
      { key: "4", text: "Isotron" },
    ],
    correctOption: "4",
  },
  {
    questionText: "Which rays turn a photographic plate black?",
    options: [
      { key: "1", text: "Infrared" },
      { key: "2", text: "X-rays" },
      { key: "3", text: "Visible" },
      { key: "4", text: "Ultraviolet" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "The atomic number of an element depends on the number of fundamental particles?",
    options: [
      { key: "1", text: "Neutrons" },
      { key: "2", text: "Protons" },
      { key: "3", text: "Electrons" },
      { key: "4", text: "All of the above" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "Who invented the carbon dating method to determine the age of fossils?",
    options: [
      { key: "1", text: "Neutron" },
      { key: "2", text: "Libby" },
      { key: "3", text: "Einstein" },
      { key: "4", text: "JJ Thomson" },
    ],
    correctOption: "2",
  },
  {
    questionText: "What is the approximate speed of X-rays?",
    options: [
      { key: "1", text: "3 x 10^8 cms^-1" },
      { key: "2", text: "3 x 10^8 ms^-1" },
      { key: "3", text: "3 x 10^8 kms^-1" },
      { key: "4", text: "3 x 10^12 ms^-1" },
    ],
    correctOption: "2",
  },
];

export async function seedModernPhysics(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Modern Physics Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Modern Physics",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Modern Physics",
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
          tags: ["Physics", "Modern Physics"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-modern-physics-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-modern-physics-ps",
      title: "Modern Physics Practice Quiz",
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
  console.log("🎉 Successfully seeded Modern Physics content!");
}
