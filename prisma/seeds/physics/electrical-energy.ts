import { PrismaClient } from "@prisma/client";
import { ExamType, Difficulty, Language, LessonType } from "@prisma/client";

const ARTICLE_HTML = `
# Physics - Electrical Energy

## Electricity
- Electricity is the flow of **electric charge** across an electrical field.
- **William Gilbert** was the first scientist who did research about electricity.
- Some of the prominent scientists in this field are: Coulomb, Ohm, Faraday.

### Electric Charge
- Electric Charge is the property of subatomic particles that causes it to experience a force when placed in an electromagnetic field.
- Electric charge is a scalar quantity.
- It is denoted by the letter **'q'**.
- The electric charge was measured using **coulomb**.
- **Formula**: $Q = ne$
  - $n$: number of electrons
  - $e$: charge of electron
- **Electron charge** = $1.602 \\times 10^{-19}$ coulombs.
- **Benjamin Franklin**, the scientist, named the two types of charges as **positive** and **negative** charges.
- It has also been observed that like charges repel whereas unlike charges attract each other.
- If an object is neutral, that just means that it has equal number of positively and negatively charged particles.
- When we give a charge to a body, that charge gets concentrated at the end points of that body.
- Based on these principles Benjamin Franklin invented the **lightning conductor**.
  - It protects buildings from lightning strokes by providing an easier path for the current to flow to earth rather than through the building.
  - In the event of a direct lightning strike, the current in the conductor may be so great that it melts or vaporizes the metal, but the damage to the building will be limited.
- The earth is huge, and it is electrically neutral, meaning it can be considered an almost infinite supply of electrons.
- No matter how many electrons we take from the earth, it always remains electrostatically neutral due to its sheer size. This is why the earth always acts as a sink for current to flow towards.

---

## Types of Electricity

### Static Electricity
- The result of an imbalance between negative and positive charges in an object generates static electricity.
- **Application**: One main use is in printers and photocopiers where static electric charges attract the ink, or toner, to the paper. Other uses include paint sprayers, air filters, and dust removal.

### Current Electricity
- Current electricity is defined as the flow of electrons from one section of the circuit to another.
- **Formula**: $\\text{current } (i) = \\text{charge flow } (q) / \\text{time } (t)$
- **Units**: amperes ($1 \\text{ amp} = 1 \\text{ coulomb} / 1 \\text{ second}$)

#### Types of Current Electricity
- **Alternating current (AC)**: The current electricity that is bidirectional and keeps changing the direction of the charge flow is known as alternating current. The bi directionality is caused by a sinusoidally varying current and voltage that reverses directions, creating a periodic back and forth motion for the current. The electrical outlets at our home and industries are supplied with alternating current.
- **Direct current (DC)**: The current electricity whose direction remains the same is known as direct current. Direct current is defined by the constant flow of electrons from a region of high electron density to a region of low electron density. DC is used in many household appliances and applications that involve a battery.

#### Rectification
- The process of converting AC current into DC current is called **rectification**. For rectification, rectifiers are used.
- An **inverter** converts the DC electricity from sources such as batteries or fuel cells to AC electricity.

---

## Based on the flow of charge, substances are classified into three types:

### Conductors
- An electrical conductor is defined as materials that allow electricity to flow through them easily.
- This property of conductors that allow them to conduct electricity is known as conductivity.
- The flow of electrons in a conductor is known as the electric current. The force required to make that current flow through the conductor is known as voltage.
- When a charge is transferred to such an element, it gets distributed across the entire surface of the object, which results in the movement of electrons in the object.
- Metals, humans, and earth are all conductors. This is the reason why we get electric shocks.
- **Examples**: Graphite, the human body, and the earth. Common metal conductors include Copper, Gold, Iron.

### Insulators
- Insulators are materials that hinder the free flow of electrons from one particle of the element to another.
- If we transfer some amount of charge to such an element at any point, the charge remains at the initial location and does not get distributed across the surface.
- The common process of charging such elements includes charging by rubbing and charging by induction.
- **Examples**: Plastic, Wood, Glass.

### Semiconductors
- Semiconductors are the materials which have a conductivity between conductors (generally metals) and non-conductors or insulators (such as ceramics).
- These materials allow electricity to flow through them partially.
- Semiconductors can be compounds such as gallium arsenide or pure elements, such as germanium or silicon.
- **Examples**: Gallium arsenide, germanium, and silicon are some of the most commonly used semiconductors. Silicon is used in electronic circuit fabrication and gallium arsenide is used in solar cells, laser diodes, etc.

#### Silicon
- It is most widely distributed in space in cosmic dusts, planetoids, and planets as various forms of silicon dioxide (silica) or silicates.
- **Uses**:
  - The element is a major constituent in ceramics and bricks.
  - Being a semiconductor, the element is put into use for making transistors.
  - Silicon is widely used in computer chips and solar cells.
  - It is a vital component of Portland cement.
  - Silicon is used in the production of fire bricks.
  - Several waterproofing systems employ silicones as a component.
  - Silicon is used in many mould release agents and moulding compounds.
  - It is also a component of ferrosilicon, an alloy widely used in the steel industry.

---

## Electric Potential & Ohm's Law

### Electric Potential Energy
- Electric potential energy is defined as the total potential energy a unit charge will possess if located at any point in the outer space.
- If two like charges (two protons or two electrons) are brought towards each other, the potential energy of the system increases.
- If two unlike charges i.e. a proton and an electron are brought towards each other, the electric potential energy of the system decreases.
- Electric potential is one of the most commonly used electrical quantities and is fundamental to the storage and release of electrical energy.
- An electron microscope uses a high electric potential difference to accelerate electrons in a beam that bombards the sample under examination.
- The household supply of electricity in our country is at 220V.
- The main function of a **stabilizer** is to make the output voltage that feeds the equipments connected to it as much as possible equivalent to the ideal electrical power supply, ensuring that the oscillations in electrical power are offset, and its output maintain a stable value, preventing them from being experienced by equipments and thereby avoiding their damage.
- We take potential at the surface of earth as reference and is defined as zero.
- By convection, electrostatic potential of earth is taken to be zero. It is considered that earth is a storehouse of infinite negative charges.

### Ohm's Law
- Ohm's law states that the voltage across a conductor is directly proportional to the current flowing through it, provided all physical conditions and temperature remain constant.
- $V \\propto I$
- $V = IR$ (Where $R$ = electric resistance)

---

## Resistance & Combinations

### Electric Resistance
- Resistance is a measure of the opposition to current flow in an electrical circuit.
- Resistance is measured in ohms, symbolized by the Greek letter omega ($\\Omega$).

### Combination of Resistances
#### Series combination
- In a series circuit, the output current of the first resistor flows into the input of the second resistor; therefore, the current is the same in each resistor.
- A circuit is said to be connected in series when the same amount of current flows through the resistors.
- In such circuits, the voltage across each resistor is different. In a series connection, if any resistor is broken or a fault occurs, then the entire circuit is turned off.
- The construction of a series circuit is simpler compared to a parallel circuit.
- **Formula**: $R_{\\text{total}} = R_1 + R_2 + \\dots + R_n$

#### Parallel combination
- In a parallel circuit, all of the resistor leads on one side of the resistors are connected together and all the leads on the other side are connected together.
- A circuit is said to be connected in parallel when the voltage is the same across the resistors.
- In such circuits, the current is branched out and recombines when branches meet at a common point.
- A resistor or any other component can be connected or disconnected easily without affecting other elements in a parallel circuit.
- **Formula**: $1/R_{\\text{total}} = 1/R_1 + 1/R_2 + \\dots + 1/R_n$

---

## Factors Affecting Resistivity
Resistivity of materials depends on the following properties:

### 1. Nature of the material
- The materials are divided into different categories like insulators, conductors and semiconductors etc. according to their level of resistivity.
- Resistivity is high in insulators whereas low in conductors.

### 2. Dimensions
- Resistivity of a material is directly proportional to its length and inversely proportional to the area of cross section of that material.
- $R \\propto (L/A)$

### 3. Temperature
- Resistivity is indirectly proportional to the temperature for some materials. In other words, as you increase the temperature of materials, their resistivities will decrease.
- But this is not true for every material i.e., all materials do not have the same dependence on temperature.
- Materials like Nichrome, Manganin, and constantan are less likely to change their resistivities with temperature. Hence, they are employed in wire-bound standard resistors.
- Semiconductors exhibit an indirect relation with temperature. Resistivities of semiconductors decrease with increasing temperatures.

### 4. Impurities
- A small content of impurity may increase the resistivity of metal considerably.
- Even the impurity of low resistivity increases the resistivity of base metal considerably.
- For example the impurity of silver (having lowest resistivity among all metals) in copper increases the resistivity of copper.

### Specific resistance
- Specific resistance is defined as the resistance offered per unit length and unit cross-sectional area when a known amount of voltage is applied.
- The mathematical representation is as follows: $\\rho = RA/L$
  - $\\rho$: specific resistance
  - $R$: resistance
  - $A$: cross-sectional area
  - $L$: length of the material
- **Units**: ohm-m

### Graphite
- Graphite is a type of crystal carbon and a half-metal along with being one of the renowned carbon allotropes.
- In modern times, Graphite is usually consumed in steelmaking, brake linings, lubricants, foundry facings, batteries to name a few.
- One of the important components of graphite viz, Graphene has certain special features and is one of the widely known strong materials.
- To separate the component from the carbon crystal would require better advances in technology.
- The uses of the crystal include electrodes and refractories used in applications for processing materials in high temperature.

---

## Other Important Concepts & Devices

### Electromotive force
- Electromotive force is defined as the electric potential produced by either electrochemical cell or by changing the magnetic field.
- **Units**: volt
- Devices which provide emf by converting other forms of energy in to electrical energy are called **transducers**.
- Such devices are generators, batteries and cycle dynamo.

### Super conductivity
- Superconductivity is a set of physical properties observed in certain materials where electrical resistance vanishes and magnetic flux fields are expelled from the material.
- Any material exhibiting these properties is a superconductor.
- The Nobel Prize in Physics 1913 was awarded to **Heike Kamerlingh Onnes** for his investigations on the properties of matter at low temperatures production of liquid helium. It is based on the principle of superconductivity only.
- **Georg Bednorz** and **Alex Müller** got the Nobel Prize in Physics in 1987 for their discovery of new superconducting materials.

### Electric devices
1. **Electroscope**: instrument for detecting the presence of an electric charge.
2. **Gold leaf electroscope**: The device is used for detecting electric charge and can also identify its polarity, if compared with a known charge. It was invented by the Scientist **Bennet** in 1786.
3. **Resistance box**: The box which contains the resistors of different values for estimating and comparing the resistance is known as the resistance box. The accuracy of the resistance box is very high. The main application is to control the specific value of current to flow through the circuit.
4. **Rheostat**: adjustable resistor used in applications that require the adjustment of current or the varying of resistance in an electric circuit. Can adjust generator characteristics, dim lights, and start or control the speed of motors.
5. **Moving coil galvanometer**: an instrument which is used to measure electric currents. It is a sensitive electromagnetic device which can measure low currents even of the order of a few microamperes.
6. **Tangent galvanometer**: an early measuring instrument used for the measurement of electric current. It works by using a compass needle to compare a magnetic field generated by the unknown current to the magnetic field of the Earth.
7. **Ammeter**: An instrument used to measure the current in a circuit. Electric currents are measured in amperes (A). Instruments used to measure smaller currents are designated as milliammeters or microammeters.
8. **Voltmeter**: An instrument used for measuring the voltage or potential difference between two points in an electrical circuit. The voltmeter is always connected in parallel. The digital voltmeter shows the voltage in numerical, it has an analog to digital converter.
9. **Potentiometer**: A device used to compare the e.m.f. (electromotive force) of two cells, to measure the internal resistance of a cell, and potential difference across a resistor. It consists of a long wire of uniform cross-sectional area and of 10 m in length. Potentiometers are commonly used to control electrical devices such as volume controls on audio equipment.
10. **Capacitor**: A capacitor (originally known as a condenser) is a passive two-terminal electrical component used to store energy electrostatically in an electric field. Capacitors are widely used as parts of electrical circuits in many common electrical devices. Unlike a resistor, a capacitor does not dissipate energy.
    - *Applications*: Energy storage, Pulsed power and weapons, Power conditioning, Power factor correction, Suppression and coupling, Signal coupling, Decoupling, Motor starters, Signal processing, Tuned circuits, Sensing, Changing the dielectric, Changing the distance between the plates, Oscillators.
11. **Transformer**: Transformers are most commonly used for increasing low AC voltages at high current (a **step-up transformer**) or decreasing high AC voltages at low current (a **step-down transformer**) in electric power applications, and for coupling the stages of signal-processing circuits.
    - Transformers works on the principle of mutual induction.
    - These principles were explained by the scientist Lenz.
    - Michael Faraday had designed the first transformer in august 1831.
    - Core of the transformer is made up of iron.
    - Transformer is also used in stabilisers.

---

## Batteries & Cells

### Cell or battery
- A battery can be defined as an electrochemical device which can be charged with an electric current and discharged whenever required.
- Batteries are usually devices that are made up of multiple electrochemical cells that are connected to external inputs and outputs.
- Batteries are widely employed in order to power small electric devices such as mobile phones, remotes, and flashlights.
- Batteries are broadly classified into two categories, namely:
  1. Primary batteries
  2. Secondary batteries.

#### Primary batteries
- Primary batteries can only be charged once. When these batteries are completely discharged, they become useless and must be discarded.
- The most common reason why primary batteries cannot be recharged is that the electrochemical reaction that takes place inside of them is irreversible in nature.
- It is important to note that primary batteries are also referred to as use-and-throw batteries.
- **Examples**: zinc-carbon (Leclanché) cells, alkaline zinc-manganese dioxide cells, and metal-air depolarized batteries.

#### Secondary batteries
- Secondary batteries are the batteries that can be charged and reused for many charging-discharging cycles.
- The electrochemical reactions that take place inside these batteries are usually reversible in nature.
- Therefore, secondary batteries are also known as rechargeable batteries.
- When discharging, the reactants combine to form products, resulting in the flow of electricity.
- When charging, the flow of electrons into the battery facilitates the reverse reaction, in which the products react to form the reactants.
- **Examples**: lead storage battery and nickel-cadmium storage cell.

### Types of Cells
| Cell | +ve | -ve | Electrolyte |
|---|---|---|---|
| Volta | Cu | Zn | H₂SO₄ (diluted) |
| Lechlanche | C | Zn | NH₄Cl |
| Daniel | Cu | Zn | ZnSO₄ + CuSO₄ |
| Bicromate | 2C | Zn | NH₄Cl (in the form of paste) |

### Applications and usage of battery
- House.
- Health Instruments.
- Medical.
- Logistics and construction.
- Firefighting and Emergency.
- Military etc...

### Storage battery
- A cell or connected group of cells that converts chemical energy into electrical energy by reversible chemical reactions and that may be recharged by passing a current through it in the direction opposite to that of its discharge.
- This was invented by **Thomas Alva Edison**.
- It is also known as lead acid battery.
- These storage batteries mostly used in vehicles.
- Mostly Sulphuric acid is also used in these storage batteries.

---

## Common Electrical Applications

### Bulb
- Electric bulb was invented by **Thomas Alva Edison**.
- A light bulb is a device that produces light from electricity. Light bulbs turn the electricity to light by sending current through a thin wire called filament.
- The filament is usually made of **tungsten**, a material that emits light when electricity is passed through it.
- The emission of light is due to the high resistance offered by the material tungsten.
- Apart from lighting, the light bulbs are used in electronic items as an indicator, traffic signals, indicator lights in cars, etc.

### Fuse
- The primary use of an electric fuse is to protect electrical equipment from excessive current and to prevent short circuits or mismatched loads.
- Electrical fuses play the role of miniature circuit breakers. Apart from protecting equipment, they are also used as safety measures to prevent any safety hazards to humans.

#### Functions of fuse
- Acts as a barrier between the electric circuit and the human body.
- Prevents device failure due to faulty circuit operation.
- Fuse prevents short-circuits.
- Prevents overload and blackouts.
- Prevents damage that is caused due to mismatched loads.

### Electric heater
- **Nichrome** element is used in electric heaters.
- Nichrome is used for making heating element of electrical appliances.
- Because nichrome does not oxidize and burn easily at high temperature i.e. it has higher melting and boiling point than metals.
- Thus it does not melt even when a large amount of heat is produced due to passage of current.

### Thermocouple
- Applications include temperature measurement for kilns, gas turbine exhaust, diesel engines, and other industrial processes.
- Thermocouples are also used in homes, offices and businesses as the temperature sensors in thermostats, and also as flame sensors in safety devices for gas-powered appliances.
`;

const QUESTIONS = [
  {
    questionText:
      "Lightning caused the wind to blow up the clouds, suggesting that electricity was generated by lightning.",
    options: [
      { key: "1", text: "Benjamin Franklin" },
      { key: "2", text: "Thomas Alva Edison" },
      { key: "3", text: "Galileo" },
      { key: "4", text: "Archimedes" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "Reasons for using manganese wire in making standard resistors:",
    options: [
      { key: "1", text: "Low resistance" },
      { key: "2", text: "High resistance" },
      { key: "3", text: "High melting point" },
      { key: "4", text: "Low temperature coefficient of resistance" },
    ],
    correctOption: "4",
  },
  {
    questionText:
      "A wire with resistance is stretched to double its length and bent into the shape of an equilateral triangle. The resulting resistance between the two vertices is",
    options: [
      { key: "1", text: "9/2 Ω" },
      { key: "2", text: "8/3 Ω" },
      { key: "3", text: "2 Ω" },
      { key: "4", text: "1 Ω" },
    ],
    correctOption: "2",
  },
  {
    questionText: "The resistance of a conductor is",
    options: [
      { key: "1", text: "inversely proportional to its length" },
      { key: "2", text: "proportional to the square of its radius." },
      { key: "3", text: "inversely proportional to the square of its radius" },
      { key: "4", text: "proportional to the square root of its length" },
    ],
    correctOption: "3",
  },
  {
    questionText:
      "Coulomb's law is incorrect in describing the electric force.",
    options: [
      { key: "1", text: "Binds electrons of an atom to the nucleus" },
      { key: "2", text: "Bind protons and neutrons to the nucleus." },
      { key: "3", text: "Binds atoms to form elements." },
      { key: "4", text: "Binds atoms and elements to form substances" },
    ],
    correctOption: "2",
  },
  {
    questionText:
      "Why do devices like TV and motors get damaged if the voltage drops when the power is constant?",
    options: [
      { key: "1", text: "Increase in current" },
      { key: "2", text: "Decrease in current" },
      { key: "3", text: "No change in current" },
      { key: "4", text: "Increase in resistance" },
    ],
    correctOption: "1",
  },
  {
    questionText:
      "Which of the following is an incorrect statement about batteries?",
    options: [
      {
        key: "1",
        text: "In TV remotes, torch lights, and laser lights, batteries are connected in series.",
      },
      {
        key: "2",
        text: "When batteries are connected in series, the resulting voltage increases.",
      },
      {
        key: "3",
        text: "When batteries are connected in parallel, the resulting voltage is equal to the voltage of the battery with the maximum voltage.",
      },
      {
        key: "4",
        text: "Parallel connection of batteries is used in inverter batteries.",
      },
    ],
    correctOption: "4",
  },
  {
    questionText: "Incorrect statement regarding electrical circuit",
    options: [
      {
        key: "1",
        text: "When connecting copper wires, the copper coating on both ends of the copper wire should be removed",
      },
      {
        key: "2",
        text: "A circuit is made up of a cell, bulb, switch and wires",
      },
      {
        key: "3",
        text: "A diagram that shows an electrical circuit linearly is called a circuit diagram",
      },
      {
        key: "4",
        text: "Electricians and engineers connect circuits without using these circuit diagrams",
      },
    ],
    correctOption: "4",
  },
  {
    questionText: "Which of the following is incorrect?",
    options: [
      { key: "1", text: "M.C.B is used instead of an electrical fuse." },
      {
        key: "2",
        text: "M.C.B switches itself off when the current in the circuit exceeds the safe level.",
      },
      {
        key: "3",
        text: "M.C.B does not need to be changed frequently. But the fuse should be changed when it burns.",
      },
      { key: "4", text: "M.C.B stands for Miniature Cable Breaker." },
    ],
    correctOption: "4",
  },
  {
    questionText: "Identify the incorrect statement in the following.",
    options: [
      {
        key: "1",
        text: "LED bulbs are used in TVs, laptops and mobile phones",
      },
      {
        key: "2",
        text: "The efficiency of light bulbs is indicated by star ratings",
      },
      {
        key: "3",
        text: "The lifespan of LED bulbs is longer than that of ordinary and CFL bulbs",
      },
      {
        key: "4",
        text: "Bulbs with more star ratings consume more electricity",
      },
    ],
    correctOption: "4",
  },
];

export async function seedElectricalEnergy(
  prisma: PrismaClient,
  subjectId: string,
  chapterId: string,
) {
  console.log("Seeding Electrical Energy Content...");

  // 1. Create the Article Lesson
  await prisma.lesson.upsert({
    where: {
      chapterId_slug: { chapterId: chapterId, slug: "theory" },
    },
    update: {
      title: "Electrical Energy",
      articleHtml: ARTICLE_HTML,
    },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: "Electrical Energy",
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
          tags: ["Physics", "Electrical Energy"],
        },
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} new MCQs!`);

  // 3. Create a Practice Set
  console.log("Seeding Practice Set...");
  const practiceSet = await prisma.practiceSet.upsert({
    where: { id: "seed-electrical-energy-ps" },
    update: {
      questionCount: QUESTIONS.length,
    },
    create: {
      id: "seed-electrical-energy-ps",
      title: "Electrical Energy Practice Quiz",
      subjectId: subjectId,
      chapterId: chapterId,
      questionCount: QUESTIONS.length,
      accessTier: "FREE",
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
  console.log("🎉 Successfully seeded Electrical Energy content!");
}
