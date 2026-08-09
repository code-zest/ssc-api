import { prisma } from "../src/config/prisma";

export async function seedBiology() {
  console.log("Seeding Biology...");

  const subject = await prisma.subject.upsert({
    where: { slug: "biology-cgl" },
    update: {},
    create: {
      name: "Biology (CGL)",
      slug: "biology-cgl",
      description: "General Science - Biology for SSC CGL",
      examTypes: ["SSC_CGL"],
      isActive: true,
    }
  });

  const chapter1 = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId: subject.id, slug: "cell-biology" } },
    update: {},
    create: {
      subjectId: subject.id,
      name: "Cell Biology",
      slug: "cell-biology",
      description: "Structure and function of cells",
      isActive: true,
      order: 1
    }
  });

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapter1.id, slug: "intro-to-cells" } },
    update: {},
    create: {
      chapterId: chapter1.id,
      subjectId: subject.id,
      title: "Introduction to Cells",
      slug: "intro-to-cells",
      type: "VIDEO",
      videoUrl: "https://example.com/biology-video.mp4",
      accessTier: "FREE",
      isActive: true,
      order: 1
    }
  });

  
  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapter1.id, slug: 'intro-to-biology-article' } },
    update: {},
    create: {
      chapterId: chapter1.id,
      subjectId: subject.id,
      title: 'Introduction to Biology (Notes)',
      slug: 'intro-to-biology-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. INTRODUCTION</h1>
<p><strong>Biology</strong> is the scientific study of life and living organisms, encompassing their <strong>structure, function, growth, evolution, and distribution</strong>. This expansive discipline includes specialized branches such as <strong>Botany, Zoology, Genetics, Ecology, and Microbiology</strong>.</p>
<h2>Branches of Biology</h2>
<table>
<thead>
<tr>
<th>S.No</th>
<th>Branch</th>
<th>Explanation</th>
</tr>
</thead>
<tbody><tr>
<td>1</td>
<td>Anatomy</td>
<td>The scientific study of the <strong>structure of human or animal bodies</strong>.</td>
</tr>
<tr>
<td>2</td>
<td>Botany</td>
<td>The scientific study of <strong>plants</strong>. It includes morphology, taxonomy, evolution, and ecology of plant life.</td>
</tr>
<tr>
<td>3</td>
<td>Taxonomy</td>
<td>The <strong>classification of organisms</strong> into various ranks.</td>
</tr>
<tr>
<td>4</td>
<td>Zoology</td>
<td>The branch of biology that studies the <strong>animal kingdom</strong>, including structure, embryology, evolution, classification, habits, and distribution of animals.</td>
</tr>
<tr>
<td>5</td>
<td>Microbiology</td>
<td>The study of <strong>microorganisms</strong> such as bacteria, archaea, and protists.</td>
</tr>
<tr>
<td>6</td>
<td>Mycology</td>
<td>The study of <strong>fungi</strong>.</td>
</tr>
<tr>
<td>7</td>
<td>Phycology (Algology)</td>
<td>The scientific study of <strong>algae</strong>.</td>
</tr>
<tr>
<td>8</td>
<td>Parasitology</td>
<td>The study of <strong>parasites</strong> and their effects on hosts.</td>
</tr>
<tr>
<td>9</td>
<td>Virology</td>
<td>A branch of microbiology that studies <strong>viruses</strong>.</td>
</tr>
<tr>
<td>10</td>
<td>Physiology</td>
<td>The study of the <strong>functions of living organisms</strong>.</td>
</tr>
<tr>
<td>11</td>
<td>Theoretical Biology</td>
<td>A branch of biological research concerned with <strong>mathematical modeling, computer simulation, and statistical analysis</strong> of biological systems.</td>
</tr>
<tr>
<td>12</td>
<td>Cell Biology</td>
<td>The study of the <strong>structure and function of cells</strong>, cell organelles, and related processes.</td>
</tr>
<tr>
<td>13</td>
<td>Genetics</td>
<td>The study of <strong>genes, heredity, and variation</strong> in living organisms; how traits are passed from one generation to the next.</td>
</tr>
<tr>
<td>14</td>
<td>Ecology</td>
<td>The study of how <strong>living organisms interact with one another and with their environment</strong>.</td>
</tr>
<tr>
<td>15</td>
<td>Evolution</td>
<td>The process of <strong>gradual change in populations of organisms</strong> over generations.</td>
</tr>
<tr>
<td>16</td>
<td>Biochemistry</td>
<td>The study of <strong>chemical processes</strong> occurring within living organisms at the molecular level.</td>
</tr>
<tr>
<td>17</td>
<td>Biophysics</td>
<td>The study of the <strong>physical interactions of biological macromolecules</strong>, mainly proteins.</td>
</tr>
<tr>
<td>18</td>
<td>Molecular Biology</td>
<td>The study of how <strong>cells function at the molecular level</strong>.</td>
</tr>
<tr>
<td>19</td>
<td>Structural Biology</td>
<td>The study of the <strong>molecular structure of macromolecules</strong> such as proteins, nucleic acids, and lipids.</td>
</tr>
<tr>
<td>20</td>
<td>Biotechnology</td>
<td>A branch of biology that <strong>uses biological processes and techniques</strong> to produce useful substances of biological origin.</td>
</tr>
<tr>
<td>21</td>
<td>Plant Physiology</td>
<td>The study of how <strong>plants function and grow</strong>, including photosynthesis, respiration, cell structure, biochemistry, and genetics.</td>
</tr>
<tr>
<td>22</td>
<td>Immunology</td>
<td>The study of <strong>the immune system</strong> and how it protects the body from pathogens such as bacteria and viruses.</td>
</tr>
<tr>
<td>23</td>
<td>Marine Biology</td>
<td>The study of <strong>marine life and marine ecosystems</strong>.</td>
</tr>
<tr>
<td>24</td>
<td>Photobiology</td>
<td>The study of the <strong>effects of light on living organisms</strong>.</td>
</tr>
<tr>
<td>25</td>
<td>Paleobiology</td>
<td>The study of the <strong>evolution of life on Earth</strong> by examining how organisms have changed over time using fossils and other evidence.</td>
</tr>
<tr>
<td>26</td>
<td>Radiobiology</td>
<td>The study of the <strong>biological effects of radiation</strong>.</td>
</tr>
</tbody></table>
<p>This page serves as an introduction to biology and provides a concise overview of its <strong>26 major branches</strong>, each focusing on a specific aspect of living organisms and life processes.</p>
<p><br/><hr/><br/></p>
<h1>Biological Research Institutions (India)</h1>
<table>
<thead>
<tr>
<th>S.No</th>
<th>Name of Institute</th>
<th>Location</th>
</tr>
</thead>
<tbody><tr>
<td>1</td>
<td>Indian Institute of Horticultural Research</td>
<td>Bangalore</td>
</tr>
<tr>
<td>2</td>
<td>National Research Centre for Citrus</td>
<td>Nagpur</td>
</tr>
<tr>
<td>3</td>
<td>Indian Institute of Spice Research</td>
<td>Calicut</td>
</tr>
<tr>
<td>4</td>
<td>Indian Institute of Rice Research</td>
<td>Hyderabad</td>
</tr>
<tr>
<td>5</td>
<td>Indian Institute of Wheat and Barley Research</td>
<td>Karnal</td>
</tr>
<tr>
<td>6</td>
<td>Indian Institute of Pulses Research</td>
<td>Kanpur</td>
</tr>
<tr>
<td>7</td>
<td>Indian Institute of Maize Research</td>
<td>New Delhi</td>
</tr>
<tr>
<td>8</td>
<td>Indian Institute of Tobacco Research</td>
<td>Rajahmundry</td>
</tr>
<tr>
<td>9</td>
<td>Indian Institute of Oilseeds Research</td>
<td>Hyderabad</td>
</tr>
<tr>
<td>10</td>
<td>Indian Institute of Vegetable Research</td>
<td>Varanasi</td>
</tr>
<tr>
<td>11</td>
<td>Centre for Cellular and Molecular Biology (CCMB)</td>
<td>Hyderabad</td>
</tr>
<tr>
<td>12</td>
<td>National Institute of Plant Genome Research (NIPGR)</td>
<td>Delhi</td>
</tr>
<tr>
<td>13</td>
<td>Indian Institute of Chemical Biology (IICB)</td>
<td>Kolkata</td>
</tr>
<tr>
<td>14</td>
<td>Bose Institute</td>
<td>Kolkata</td>
</tr>
<tr>
<td>15</td>
<td>Indian Institute of Integrative Medicine (IIIM)</td>
<td>Jammu</td>
</tr>
<tr>
<td>16</td>
<td>Institute of Genomics and Integrative Biology (IGIB)</td>
<td>Delhi</td>
</tr>
<tr>
<td>17</td>
<td>Indian Council of Agricultural Research (ICAR) – Headquarters</td>
<td>New Delhi</td>
</tr>
<tr>
<td>18</td>
<td>Central Drug Research Institute (CSIR-CDRI)</td>
<td>Lucknow</td>
</tr>
<tr>
<td>19</td>
<td>Indian Veterinary Research Institute</td>
<td>Izatnagar, Uttar Pradesh</td>
</tr>
<tr>
<td>20</td>
<td>National Brain Research Centre (NBRC)</td>
<td>Manesar, Haryana</td>
</tr>
<tr>
<td>21</td>
<td>National Institute of Virology (NIV)</td>
<td>Pune, Maharashtra</td>
</tr>
<tr>
<td>22</td>
<td>National Centre for Cell Science (NCCS)</td>
<td>Pune, Maharashtra</td>
</tr>
<tr>
<td>23</td>
<td>Tata Institute of Fundamental Research (TIFR)</td>
<td>Mumbai</td>
</tr>
</tbody></table>
<p><br/><hr/><br/></p>
<h1>Fathers of Biology</h1>
<table>
<thead>
<tr>
<th>S.No</th>
<th>Branch of Biology</th>
<th>Father of the Branch</th>
</tr>
</thead>
<tbody><tr>
<td>1</td>
<td>Biology</td>
<td>Aristotle</td>
</tr>
<tr>
<td>2</td>
<td>Botany</td>
<td>Theophrastus</td>
</tr>
<tr>
<td>3</td>
<td>Paleontology</td>
<td>Leonardo da Vinci</td>
</tr>
<tr>
<td>4</td>
<td>Eugenics</td>
<td>Francis Galton</td>
</tr>
<tr>
<td>5</td>
<td>Modern Botany</td>
<td>Carl Linnaeus</td>
</tr>
<tr>
<td>6</td>
<td>Immunology</td>
<td>Edward Jenner</td>
</tr>
<tr>
<td>7</td>
<td>Genetics</td>
<td>Gregor Mendel</td>
</tr>
<tr>
<td>8</td>
<td>Modern Genetics</td>
<td>Thomas Hunt Morgan</td>
</tr>
<tr>
<td>9</td>
<td>Cytology</td>
<td>Robert Hooke</td>
</tr>
<tr>
<td>10</td>
<td>Botanical Illustrations</td>
<td>Krateuas</td>
</tr>
<tr>
<td>11</td>
<td>Plant Anatomy</td>
<td>Nehemiah Grew</td>
</tr>
<tr>
<td>12</td>
<td>Zoology</td>
<td>Aristotle</td>
</tr>
<tr>
<td>13</td>
<td>Taxonomy</td>
<td>Carl Linnaeus</td>
</tr>
<tr>
<td>14</td>
<td>Medicine</td>
<td>Hippocrates</td>
</tr>
<tr>
<td>15</td>
<td>Histology</td>
<td>Marie François Xavier Bichat</td>
</tr>
<tr>
<td>16</td>
<td>Mutation Theory</td>
<td>Hugo de Vries</td>
</tr>
<tr>
<td>17</td>
<td>Comparative Anatomy</td>
<td>Georges Cuvier</td>
</tr>
<tr>
<td>18</td>
<td>Mycology</td>
<td>Pier Antonio Micheli</td>
</tr>
<tr>
<td>19</td>
<td>Plant Physiology</td>
<td>Stephen Hales</td>
</tr>
<tr>
<td>20</td>
<td>Bacteriology</td>
<td>Louis Pasteur</td>
</tr>
<tr>
<td>21</td>
<td>Microbiology</td>
<td>Antonie van Leeuwenhoek</td>
</tr>
<tr>
<td>22</td>
<td>Indian Mycology</td>
<td>Edwin John Butler</td>
</tr>
<tr>
<td>23</td>
<td>Indian Bryology</td>
<td>Shiv Ram Kashyap</td>
</tr>
<tr>
<td>24</td>
<td>Indian Ecology</td>
<td>Ramdeo Misra</td>
</tr>
<tr>
<td>25</td>
<td>Indian Phycology</td>
<td>Parthasarathy Iyengar</td>
</tr>
<tr>
<td>26</td>
<td>Modern Embryology</td>
<td>Karl Ernst von Baer</td>
</tr>
</tbody></table>
<h3>Important names to remember for SSC exams</h3>
<ul>
<li><strong>Father of Biology</strong> – Aristotle</li>
<li><strong>Father of Botany</strong> – Theophrastus</li>
<li><strong>Father of Zoology</strong> – Aristotle</li>
<li><strong>Father of Taxonomy / Modern Botany</strong> – Carl Linnaeus</li>
<li><strong>Father of Genetics</strong> – Gregor Mendel</li>
<li><strong>Father of Modern Genetics</strong> – Thomas Hunt Morgan</li>
<li><strong>Father of Microbiology</strong> – Antonie van Leeuwenhoek</li>
<li><strong>Father of Bacteriology</strong> – Louis Pasteur</li>
<li><strong>Father of Immunology</strong> – Edward Jenner</li>
<li><strong>Father of Medicine</strong> – Hippocrates</li>
<li><strong>Father of Cytology</strong> – Robert Hooke</li>
<li><strong>Father of Plant Anatomy</strong> – Nehemiah Grew</li>
<li><strong>Father of Plant Physiology</strong> – Stephen Hales</li>
<li><strong>Father of Modern Embryology</strong> – Karl Ernst von Baer</li>
</ul>
<p><br/><hr/><br/></p>
<h1>Key Concepts in Biology</h1>
<ul>
<li><strong>Cells</strong> are the <strong>fundamental unit of life</strong>.</li>
<li><strong>Genes</strong> are the <strong>units of heredity</strong>.</li>
<li><strong>Evolution by natural selection</strong> is the mechanism driving biodiversity.</li>
<li><strong>Homeostasis</strong> is the maintenance of <strong>internal stability</strong> and <strong>energy processing</strong> in living systems.</li>
</ul>
<hr>
<h2>Important Scientists</h2>
<h3>Aristotle – Father of Biology</h3>
<p>Aristotle, often hailed as the <strong>Father of Biology</strong>, laid the foundation for the systematic classification of living organisms through his detailed observations and descriptions of plants and animals.</p>
<h3>Charles Darwin</h3>
<p>Charles Darwin, regarded as the <strong>Father of Modern Biology</strong>, transformed our understanding of life&#39;s diversity through his <strong>Theory of Evolution by Natural Selection</strong>, explaining that all organisms share a common evolutionary heritage.</p>
<h3>Sir Jagadish Chandra Bose</h3>
<p>Sir Jagadish Chandra Bose, known as the <strong>Father of Indian Biology</strong>, pioneered research in <strong>plant physiology</strong> and <strong>biophysics</strong>. He demonstrated that plants respond to external stimuli, significantly advancing biological science in India and worldwide.</p>
<hr>
<h1>Human Evolution</h1>
<p><strong>Question:</strong> Who is considered the first human in biology?</p>
<p>The earliest known member of the genus <strong>Homo</strong> is <strong>Homo habilis</strong>, which evolved approximately <strong>2.8 million years ago</strong>. It is regarded as one of the first human ancestors to show clear evidence of <strong>using stone tools</strong>, marking an important milestone in human evolution.</p>
<h3>Evolution Illustration (left to right)</h3>
<ul>
<li>Gibbon</li>
<li>Human</li>
<li>Chimpanzee</li>
<li>Gorilla</li>
<li>Orangutan</li>
</ul>
<p><img src="https://storage.googleapis.com/ssc-images/primates-evolution.png" alt="Skeletal Structures of Primates"></p>
<blockquote>
<p><strong>Note:</strong> The image compares skeletons of primates. Scientifically, <strong>humans did not evolve from chimpanzees, gorillas, or orangutans</strong>. Instead, humans and these apes <strong>share common ancestors</strong>.</p>
</blockquote>
<hr>
<h1>Various Systems in the Human Body</h1>
<ol>
<li>Digestive System</li>
<li>Blood Circulatory System</li>
<li>Excretory System</li>
<li>Nervous System</li>
<li>Respiratory System</li>
<li>Skeletal System</li>
<li>Endocrine System</li>
<li>Reproductive System</li>
</ol>
<hr>
<h2>SSC Exam Quick Revision</h2>
<h3>Key Concepts</h3>
<ul>
<li>Cell → Basic unit of life</li>
<li>Gene → Unit of heredity</li>
<li>Evolution → Natural selection</li>
<li>Homeostasis → Maintaining a stable internal environment</li>
</ul>
<h3>Important Scientists</h3>
<ul>
<li><strong>Father of Biology</strong> → Aristotle</li>
<li><strong>Father of Modern Biology</strong> → Charles Darwin</li>
<li><strong>Father of Indian Biology</strong> → Sir Jagadish Chandra Bose</li>
</ul>
<h3>First Human</h3>
<ul>
<li>Earliest known human species → <strong>Homo habilis</strong></li>
<li>Approximate age → <strong>2.8 million years ago</strong></li>
<li>Known for → Early <strong>stone tool</strong> use</li>
</ul>
`,
      accessTier: 'FREE',
      isActive: true,
      order: 2
    }
  });

  // Seed a sample question
  const existingQuestions = await prisma.question.findMany({ where: { chapterId: chapter1.id } });
  if (existingQuestions.length === 0) {
    await prisma.question.create({
      data: {
        subjectId: subject.id,
        chapterId: chapter1.id,
        questionText: "<p>What is the powerhouse of the cell?</p>",
        options: [
          { key: "A", text: "Nucleus" },
          { key: "B", text: "Mitochondria" },
          { key: "C", text: "Ribosome" },
          { key: "D", text: "Endoplasmic Reticulum" }
        ],
        correctOption: "B",
        explanation: "<p>Mitochondria are known as the powerhouses of the cell because they generate most of the cell's supply of ATP.</p>",
        difficulty: "EASY",
        examTypes: ["SSC_CGL"],
        isPYQ: true,
        pyqYear: 2021,
      }
    });
  }

  console.log("Biology seeded successfully!");
}

// Allow running directly
if (require.main === module) {
  seedBiology()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
