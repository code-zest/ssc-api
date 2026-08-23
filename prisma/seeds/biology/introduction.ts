import { PrismaClient } from "@prisma/client";

export async function seedBiologyIntroduction(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Biology Chapter: Introduction...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: 'intro-to-biology-article' } },
    update: { chapterId: chapterId }, // Ensure it moves if already exists
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: 'Introduction to Biology (Notes)',
      slug: 'intro-to-biology-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. INTRODUCTION</h1>
<p><strong>Biology</strong> is the scientific study of life and living organisms, encompassing their <strong>structure, function, growth, evolution, and distribution</strong>. This expansive discipline includes specialized branches such as <strong>Botany, Zoology, Genetics, Ecology, and Microbiology</strong>.</p>
<FeatureList title="Branches of Biology">
  <FeatureItem title="Anatomy">
    The scientific study of the <strong>structure of human or animal bodies</strong>.
  </FeatureItem>
  <FeatureItem title="Botany">
    The scientific study of <strong>plants</strong>. It includes morphology, taxonomy, evolution, and ecology of plant life.
  </FeatureItem>
  <FeatureItem title="Taxonomy">
    The <strong>classification of organisms</strong> into various ranks.
  </FeatureItem>
  <FeatureItem title="Zoology">
    The branch of biology that studies the <strong>animal kingdom</strong>, including structure, embryology, evolution, classification, habits, and distribution of animals.
  </FeatureItem>
  <FeatureItem title="Microbiology">
    The study of <strong>microorganisms</strong> such as bacteria, archaea, and protists.
  </FeatureItem>
  <FeatureItem title="Mycology">
    The study of <strong>fungi</strong>.
  </FeatureItem>
  <FeatureItem title="Phycology (Algology)">
    The scientific study of <strong>algae</strong>.
  </FeatureItem>
  <FeatureItem title="Parasitology">
    The study of <strong>parasites</strong> and their effects on hosts.
  </FeatureItem>
  <FeatureItem title="Virology">
    A branch of microbiology that studies <strong>viruses</strong>.
  </FeatureItem>
  <FeatureItem title="Physiology">
    The study of the <strong>functions of living organisms</strong>.
  </FeatureItem>
  <FeatureItem title="Theoretical Biology">
    A branch of biological research concerned with <strong>mathematical modeling, computer simulation, and statistical analysis</strong> of biological systems.
  </FeatureItem>
  <FeatureItem title="Cell Biology">
    The study of the <strong>structure and function of cells</strong>, cell organelles, and related processes.
  </FeatureItem>
  <FeatureItem title="Genetics">
    The study of <strong>genes, heredity, and variation</strong> in living organisms; how traits are passed from one generation to the next.
  </FeatureItem>
  <FeatureItem title="Ecology">
    The study of how <strong>living organisms interact with one another and with their environment</strong>.
  </FeatureItem>
  <FeatureItem title="Evolution">
    The process of <strong>gradual change in populations of organisms</strong> over generations.
  </FeatureItem>
  <FeatureItem title="Biochemistry">
    The study of <strong>chemical processes</strong> occurring within living organisms at the molecular level.
  </FeatureItem>
  <FeatureItem title="Biophysics">
    The study of the <strong>physical interactions of biological macromolecules</strong>, mainly proteins.
  </FeatureItem>
  <FeatureItem title="Molecular Biology">
    The study of how <strong>cells function at the molecular level</strong>.
  </FeatureItem>
  <FeatureItem title="Structural Biology">
    The study of the <strong>molecular structure of macromolecules</strong> such as proteins, nucleic acids, and lipids.
  </FeatureItem>
  <FeatureItem title="Biotechnology">
    A branch of biology that <strong>uses biological processes and techniques</strong> to produce useful substances of biological origin.
  </FeatureItem>
  <FeatureItem title="Plant Physiology">
    The study of how <strong>plants function and grow</strong>, including photosynthesis, respiration, cell structure, biochemistry, and genetics.
  </FeatureItem>
  <FeatureItem title="Immunology">
    The study of <strong>the immune system</strong> and how it protects the body from pathogens such as bacteria and viruses.
  </FeatureItem>
  <FeatureItem title="Marine Biology">
    The study of <strong>marine life and marine ecosystems</strong>.
  </FeatureItem>
  <FeatureItem title="Photobiology">
    The study of the <strong>effects of light on living organisms</strong>.
  </FeatureItem>
  <FeatureItem title="Paleobiology">
    The study of the <strong>evolution of life on Earth</strong> by examining how organisms have changed over time using fossils and other evidence.
  </FeatureItem>
  <FeatureItem title="Radiobiology">
    The study of the <strong>biological effects of radiation</strong>.
  </FeatureItem>
</FeatureList>
<Callout variant="tip" title="Quick Tip">
Memorizing the branches of biology is crucial for SSC exams. Focus especially on **Cytology**, **Mycology**, and **Phycology**, as they are frequently tested!
</Callout>
<p>This page serves as an introduction to biology and provides a concise overview of its <strong>26 major branches</strong>, each focusing on a specific aspect of living organisms and life processes.</p>
<p><br/><hr/><br/></p>
<FeatureList title="Research Institutions">
  <FeatureItem title="Indian Institute of Horticultural Research" subtitle="Bangalore"></FeatureItem>
  <FeatureItem title="National Research Centre for Citrus" subtitle="Nagpur"></FeatureItem>
  <FeatureItem title="Indian Institute of Spice Research" subtitle="Calicut"></FeatureItem>
  <FeatureItem title="Indian Institute of Rice Research" subtitle="Hyderabad"></FeatureItem>
  <FeatureItem title="Indian Institute of Wheat and Barley Research" subtitle="Karnal"></FeatureItem>
  <FeatureItem title="Indian Institute of Pulses Research" subtitle="Kanpur"></FeatureItem>
  <FeatureItem title="Indian Institute of Maize Research" subtitle="New Delhi"></FeatureItem>
  <FeatureItem title="Indian Institute of Tobacco Research" subtitle="Rajahmundry"></FeatureItem>
  <FeatureItem title="Indian Institute of Oilseeds Research" subtitle="Hyderabad"></FeatureItem>
  <FeatureItem title="Indian Institute of Vegetable Research" subtitle="Varanasi"></FeatureItem>
  <FeatureItem title="Centre for Cellular and Molecular Biology (CCMB)" subtitle="Hyderabad"></FeatureItem>
  <FeatureItem title="National Institute of Plant Genome Research (NIPGR)" subtitle="Delhi"></FeatureItem>
  <FeatureItem title="Indian Institute of Chemical Biology (IICB)" subtitle="Kolkata"></FeatureItem>
  <FeatureItem title="Bose Institute" subtitle="Kolkata"></FeatureItem>
  <FeatureItem title="Indian Institute of Integrative Medicine (IIIM)" subtitle="Jammu"></FeatureItem>
  <FeatureItem title="Institute of Genomics and Integrative Biology (IGIB)" subtitle="Delhi"></FeatureItem>
  <FeatureItem title="Indian Council of Agricultural Research (ICAR) – Headquarters" subtitle="New Delhi"></FeatureItem>
  <FeatureItem title="Central Drug Research Institute (CSIR-CDRI)" subtitle="Lucknow"></FeatureItem>
  <FeatureItem title="Indian Veterinary Research Institute" subtitle="Izatnagar, Uttar Pradesh"></FeatureItem>
  <FeatureItem title="National Brain Research Centre (NBRC)" subtitle="Manesar, Haryana"></FeatureItem>
  <FeatureItem title="National Institute of Virology (NIV)" subtitle="Pune, Maharashtra"></FeatureItem>
  <FeatureItem title="National Centre for Cell Science (NCCS)" subtitle="Pune, Maharashtra"></FeatureItem>
  <FeatureItem title="Tata Institute of Fundamental Research (TIFR)" subtitle="Mumbai"></FeatureItem>
</FeatureList>
<p><br/><hr/><br/></p>
<FeatureList title="Fathers of Biology">
  <FeatureItem title="Aristotle" subtitle="Biology"></FeatureItem>
  <FeatureItem title="Theophrastus" subtitle="Botany"></FeatureItem>
  <FeatureItem title="Leonardo da Vinci" subtitle="Paleontology"></FeatureItem>
  <FeatureItem title="Francis Galton" subtitle="Eugenics"></FeatureItem>
  <FeatureItem title="Carl Linnaeus" subtitle="Modern Botany"></FeatureItem>
  <FeatureItem title="Edward Jenner" subtitle="Immunology"></FeatureItem>
  <FeatureItem title="Gregor Mendel" subtitle="Genetics"></FeatureItem>
  <FeatureItem title="Thomas Hunt Morgan" subtitle="Modern Genetics"></FeatureItem>
  <FeatureItem title="Robert Hooke" subtitle="Cytology"></FeatureItem>
  <FeatureItem title="Krateuas" subtitle="Botanical Illustrations"></FeatureItem>
  <FeatureItem title="Nehemiah Grew" subtitle="Plant Anatomy"></FeatureItem>
  <FeatureItem title="Aristotle" subtitle="Zoology"></FeatureItem>
  <FeatureItem title="Carl Linnaeus" subtitle="Taxonomy"></FeatureItem>
  <FeatureItem title="Hippocrates" subtitle="Medicine"></FeatureItem>
  <FeatureItem title="Marie François Xavier Bichat" subtitle="Histology"></FeatureItem>
  <FeatureItem title="Hugo de Vries" subtitle="Mutation Theory"></FeatureItem>
  <FeatureItem title="Georges Cuvier" subtitle="Comparative Anatomy"></FeatureItem>
  <FeatureItem title="Pier Antonio Micheli" subtitle="Mycology"></FeatureItem>
  <FeatureItem title="Stephen Hales" subtitle="Plant Physiology"></FeatureItem>
  <FeatureItem title="Louis Pasteur" subtitle="Bacteriology"></FeatureItem>
  <FeatureItem title="Antonie van Leeuwenhoek" subtitle="Microbiology"></FeatureItem>
  <FeatureItem title="Edwin John Butler" subtitle="Indian Mycology"></FeatureItem>
  <FeatureItem title="Shiv Ram Kashyap" subtitle="Indian Bryology"></FeatureItem>
  <FeatureItem title="Ramdeo Misra" subtitle="Indian Ecology"></FeatureItem>
  <FeatureItem title="Parthasarathy Iyengar" subtitle="Indian Phycology"></FeatureItem>
  <FeatureItem title="Karl Ernst von Baer" subtitle="Modern Embryology"></FeatureItem>
</FeatureList>
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
<Callout variant="exam" title="Important for SSC CGL">
Questions regarding the founders of major biological sciences (e.g. Aristotle, Linnaeus) appear in almost every SSC CGL tier-1 paper.
</Callout>
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
<p><img src="/images/primates-evolution.jpg" alt="Skeletal Structures of Primates"></p>
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
}
