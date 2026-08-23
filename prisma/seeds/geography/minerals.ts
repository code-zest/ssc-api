import { PrismaClient } from "@prisma/client";

export async function seedGeographyMinerals(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Geography Chapter: Minerals...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: 'minerals-article' } },
    update: { chapterId: chapterId },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: 'Minerals (Notes)',
      slug: 'minerals-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. MINERALS & INDUSTRIES</h1>
<p>India is endowed with a rich variety of mineral resources due to its varied geological structure.</p>

<ul className="list-disc pl-5">
  <li>Bulk of the valuable minerals are <strong>products of pre-Palaeozoic age</strong> mainly associated with metamorphic and igneous rocks of the peninsular India.</li>
  <li>The vast alluvial plain tract of north India is devoid of minerals of economic use.</li>
</ul>

<p><br/><hr/><br/></p>

<h1>2. MODE OF OCCURRENCE OF MINERALS</h1>

<FeatureList title="Occurrence of Minerals">
  <FeatureItem title="In igneous and metamorphic rocks">
    Minerals may occur in the cracks, crevices, faults or joints. The smaller occurrences are called veins and the larger are called lodes. Major metallic minerals like <strong>tin, copper, zinc and lead</strong> etc. are obtained from veins and lodes.
  </FeatureItem>
  <FeatureItem title="In sedimentary rocks">
    A number of minerals occur in beds or layers. They have been formed as a result of deposition, accumulation and concentration in horizontal strata. <strong>Coal and some forms of iron ore</strong> have been concentrated as a result of long periods under great heat and pressure. Another group of sedimentary minerals include gypsum, potash salt and sodium salt. These are formed as a <strong>result of evaporation especially in arid regions</strong>.
  </FeatureItem>
  <FeatureItem title="Decomposition of surface rocks">
    Another mode of formation involves the decomposition of surface rocks, and the removal of soluble constituents, leaving a residual mass of weathered material containing ores. <strong>Bauxite is formed this way.</strong>
  </FeatureItem>
  <FeatureItem title="Alluvial deposits">
    Certain minerals may occur as alluvial deposits in sands of valley floors and the base of hills. These deposits are called <strong>'placer deposits'</strong> and generally contain minerals, which are not corroded by water. <strong>Gold, silver, tin and platinum</strong> are most important among such minerals.
  </FeatureItem>
  <FeatureItem title="The ocean waters">
    Contain vast quantities of minerals, but most of these are too widely diffused to be of economic significance. However, <strong>common salt, magnesium and bromine</strong> are largely derived from ocean waters. The ocean beds, too, are rich in <strong>manganese nodules</strong>.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h1>3. DISTRIBUTION OF MINERALS IN INDIA</h1>
<p>Most of the metallic minerals in India occur in the <strong>peninsular plateau region in the old crystalline rocks</strong>.</p>

<ul className="list-disc pl-5">
  <li>Over 97 percent of <strong>coal reserves</strong> occur in the valleys of Damodar, Sone, Mahanadi and Godavari.</li>
  <li><strong>Petroleum reserves</strong> are located in the sedimentary basins of Assam, Gujarat and Mumbai High i.e. off-shore region in the Arabian. New reserves have been located in the Krishna-Godavari and Kaveri basins.</li>
  <li>Most of the major mineral resources occur to the east of a line linking Mangalore and Kanpur.</li>
</ul>

<p>Minerals are generally concentrated in three broad belts in India. These belts are:</p>

<FeatureList title="Mineral Belts of India">
  <FeatureItem title="The North-Eastern Plateau Region">
    This belt covers Chotanagpur (Jharkhand), Orissa Plateau, West Bengal and parts of Chhattisgarh.
  </FeatureItem>
  <FeatureItem title="The North-Western Region">
    This belt extends along Aravali in Rajasthan and part of Gujarat and minerals are associated with Dharwar system of rocks.
  </FeatureItem>
</FeatureList>
`,
      accessTier: 'PRO',
      isActive: true,
      order: 1
    }
  });
}
