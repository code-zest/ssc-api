import { PrismaClient } from "@prisma/client";

export async function seedGeographyPhysiographyOfIndia(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Geography Chapter: Physiography of India...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: 'physiography-of-india-article' } },
    update: { chapterId: chapterId }, // Ensure it moves if already exists
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: 'Physiography of India (Notes)',
      slug: 'physiography-of-india-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. THE EASTERN HILLS AND MOUNTAINS</h1>
<p>Though they are part of the Himalayan mountain system, they have alignment from the north to the south direction. Most of these ranges are separated from each other by numerous small rivers.</p>

<FeatureList title="Local Names of Eastern Hills">
  <FeatureItem title="Patkai Bum"></FeatureItem>
  <FeatureItem title="Naga Hills"></FeatureItem>
  <FeatureItem title="Manipur Hills"></FeatureItem>
  <FeatureItem title="Mizo or Lushai Hills" subtitle="In the South"></FeatureItem>
</FeatureList>

<ul className="list-disc pl-5 mt-4">
  <li>The physiography of Manipur is unique by the presence of a large lake known as <strong>'Loktak' lake</strong> at the centre, surrounded by mountains from all sides.</li>
</ul>

<Callout variant="info" title="The Molasses Basin">
  Mizoram is also known as the <strong>'Molasses basin'</strong> which is made up of soft unconsolidated deposits.
</Callout>

<h3>River Systems in the East</h3>
<ul className="list-disc pl-5">
  <li>Most of the rivers in Nagaland form the tributary of the <strong>Brahmaputra</strong>.</li>
  <li>While two rivers of Mizoram and Manipur are the tributaries of the <strong>Barak river</strong>, which in turn is the tributary of <strong>Meghna</strong>.</li>
  <li>The rivers in the eastern part of Manipur are the tributaries of <strong>Chindwin</strong>, which in turn is a tributary of the <strong>Irrawaddy</strong> of Myanmar.</li>
</ul>

<p><br/><hr/><br/></p>

<h1>2. THE NORTHERN PLAINS</h1>
<p><strong>Formation:</strong> By the alluvial deposits brought by the rivers - the Indus, the Ganga, and the Brahmaputra. These plains extend from the east to the west, but have a slope from west to east.</p>

<p>From the north to the south, these can be divided into three major zones:</p>

<FeatureList title="Zones of the Northern Plains">
  <FeatureItem title="The Bhabar">
    A narrow belt ranging between 8-10 km parallel to the Shiwalik foothills at the break-up of the slope. Have the deposits of heavy materials of rocks and boulders, and at times, <strong>rivers disappear in this zone</strong>.
  </FeatureItem>
  <FeatureItem title="The Tarai Belt">
    South of the Bhabar is the Tarai belt, with an approximate width of 10-20 km where most of the streams and rivers re-emerge without having any properly demarcated channel, thereby creating marshy and swampy conditions. This has a luxurious growth of natural vegetation and houses varied wild life.
  </FeatureItem>
  <FeatureItem title="The Alluvial Plains">
    The south of Tarai is a belt consisting of old (<strong>Bhangar</strong>) and new (<strong>Khadar</strong>) alluvial deposits.
  </FeatureItem>
</FeatureList>

<h3>Characteristic Features</h3>
<ul className="list-disc pl-5">
  <li>Mature stage of fluvial erosional and depositional landforms such as <strong>sand bars, meanders, oxbow lakes and braided channels</strong>.</li>
  <li>The Brahmaputra plains are known for their riverine islands and sand bars. Most of these areas are subjected to periodic floods and shifting river courses forming braided streams.</li>
</ul>

<h3>Deltas & Divides</h3>
<ul className="list-disc pl-5">
  <li><strong>Deltas:</strong> The mouths of these mighty rivers also form some of the largest deltas of the world, for example, the famous <strong>Sundarbans delta</strong>.</li>
  <li>The states of <strong>Haryana and Delhi</strong> form a <strong>water divide</strong> between the Indus and the Ganga river systems.</li>
  <li>As opposed to this, the Brahmaputra river flows from the northeast to the southwest direction before it takes an almost <strong>90° southward turn at Dhubri</strong> before it enters into Bangladesh.</li>
</ul>

<Callout variant="tip" title="Economic Benefits">
  These river valley plains have a fertile alluvial soil cover which supports a variety of crops like wheat, rice, sugarcane and jute, and hence, supports a large population.
</Callout>

<p><br/><hr/><br/></p>

<h1>3. THE PENINSULAR PLATEAU</h1>
<p>Rising from the height of 150 m above the river plains up to an elevation of 600-900 m is the irregular triangle known as the peninsular plateau.</p>

<ul className="list-disc pl-5">
  <li><strong>Extent:</strong> Delhi ridge in the northwest (extension of Aravalis), the Rajmahal hills in the east, Gir range in the west, and the Cardamom hills in the south.</li>
  <li>An extension of this is also seen in the northeast, in the form of Shillong Karbi-Anglong plateau.</li>
</ul>

<FeatureList title="Patland Plateaus">
  <FeatureItem title="Hazaribagh Plateau"></FeatureItem>
  <FeatureItem title="Palamu Plateau"></FeatureItem>
  <FeatureItem title="Ranchi Plateau"></FeatureItem>
  <FeatureItem title="Malwa Plateau"></FeatureItem>
  <FeatureItem title="Coimbatore Plateau"></FeatureItem>
  <FeatureItem title="Karnataka Plateau"></FeatureItem>
</FeatureList>

<h3>Key Features</h3>
<ul className="list-disc pl-5">
  <li>The <strong>general elevation</strong> of the plateau is from the <strong>west to the east</strong>, and hence rivers flow in such direction.</li>
  <li>Important physiographic features: <strong>tors, block mountains, rift valleys, spurs, bare rocky structures, series of hummocky hills and wall-like quartzite dykes</strong> offering natural sites for water storage.</li>
  <li>The western and north-western part of the plateau has an emphatic presence of <strong>black soil</strong>.</li>
  <li>The Bhima fault had gone to recurrent seismic activities.</li>
  <li>The north-western part of the plateau has a complex relief of ravines and gorges. The <strong>ravines of Chambal, Bhind and Morena</strong> are examples.</li>
</ul>

<p>On the basis of prominent relief features, the peninsular plateau is divided into three broad groups: The Deccan Plateau, The Central Highlands, and The North-eastern Plateau.</p>

<p><br/><hr/><br/></p>

<h2>The Deccan Plateau</h2>
<p><strong>Border:</strong> Western Ghats in the west, Eastern Ghats in the east and the Satpura, Maikal range and Mahadeo hills in the north.</p>

<FeatureList title="Western Ghats (Local Names)">
  <FeatureItem title="Sahyadri" subtitle="Maharashtra"></FeatureItem>
  <FeatureItem title="Nilgiri hills" subtitle="Karnataka and Tamil Nadu"></FeatureItem>
  <FeatureItem title="Anaimalai hills & Cardamom hills" subtitle="Kerala"></FeatureItem>
</FeatureList>

<ul className="list-disc pl-5 mt-4">
  <li>Their average elevation is about 1,500 m with the height increasing from north to south.</li>
  <li><strong>'Anaimudi' (2,695 m)</strong> is the highest peak of Peninsular plateaus located on the Anaimalai hills of the Western Ghats followed by <strong>Dodabetta (2,670 m)</strong> on the Nilgiri hills.</li>
  <li>Most of the Peninsular rivers have their origin in the Western Ghats.</li>
</ul>

<h3>The Eastern Ghats</h3>
<ul className="list-disc pl-5">
  <li>Comprising discontinuous and low hills, highly eroded by the rivers such as the Mahanadi, the Godavari, the Krishna, the Kaveri, etc.</li>
  <li>Important ranges include the <strong>Javadi hills, the Palconda range, the Nallamala hills, the Mahendragiri hills</strong>, etc.</li>
  <li>The Eastern and the Western Ghats meet each other at the <strong>Nilgiri hills</strong>.</li>
</ul>

<p><br/><hr/><br/></p>

<h2>The Central Highlands</h2>
<p><strong>Location:</strong> Bounded to the west by the Aravali range & Satpura range, which is formed by a series of scarped plateaus on the south. This forms the northernmost boundary of the Deccan plateau.</p>

<ul className="list-disc pl-5">
  <li>It is a classic example of the <strong>relict mountains</strong> which are highly denuded and form discontinuous ranges.</li>
  <li>In west, the Jaisalmer has been covered by the longitudinal sand ridges and crescent-shaped sand dunes called <strong>barchans</strong>.</li>
  <li>This region has undergone metamorphic processes and has <strong>metamorphic rocks</strong> such as marble, slate, gneiss, etc.</li>
  <li><strong>Slope:</strong> It slopes towards the north and north-eastern directions.</li>
</ul>

<h3>Rivers and Extensions</h3>
<ul className="list-disc pl-5">
  <li>Most of the tributaries of the river <strong>Yamuna</strong> have their origin in the Vindhyan and Kaimur ranges.</li>
  <li><strong>Banas</strong> is the only significant tributary of the river Chambal that originates from the Aravalli in the west.</li>
  <li>An eastern extension of the Central Highland is <strong>Rajmahal hills</strong>, to the south of which lies a large reserve of mineral resources in the <strong>Chotanagpur plateau</strong>.</li>
</ul>

<p><br/><hr/><br/></p>

<h1>4. THE ISLANDS</h1>
<p>There are two major island groups in India - one in the Bay of Bengal and the other in the Arabian Sea. The major islands groups are the <strong>Andaman and Nicobar Archipelago</strong> in the Bay of Bengal and <strong>Lakshadweep islands</strong> in the Arabian Sea.</p>

<h2>Andaman & Nicobar Islands</h2>
<ul className="list-disc pl-5">
  <li>Formed due to collision between Indian Plate and Burma Minor Plate (similar to formation of Himalayas).</li>
  <li>They are a southward extension of Arakan Yoma range while Arakan Yoma in itself is an extension of Purvanchal Hills.</li>
</ul>

<FeatureList title="Important Mountain Peaks">
  <FeatureItem title="Saddle peak" subtitle="North Andaman (738 m)"></FeatureItem>
  <FeatureItem title="Mount Diavolo" subtitle="Middle Andaman (515 m)"></FeatureItem>
  <FeatureItem title="Mount Koyob" subtitle="South Andaman (460 m)"></FeatureItem>
  <FeatureItem title="Mount Thuiller" subtitle="Great Nicobar (642 m)"></FeatureItem>
</FeatureList>

<h3>Geographical Divisions</h3>
<ul className="list-disc pl-5 mt-4">
  <li>The Andaman islands are divided into three main islands i.e. <strong>North, Middle and South</strong>.</li>
  <li><strong>Duncan passage</strong> separates Little Andaman from South Andaman.</li>
  <li>The <strong>Great Andaman group</strong> of islands in the north is separated by the <strong>Ten Degree Channel</strong> from the Nicobar group in the south.</li>
  <li><strong>Port Blair</strong>, the capital of Andaman Nicobar Islands lies in the <strong>South Andaman</strong>.</li>
  <li>Among the Nicobar islands, the <strong>Great Nicobar is the largest</strong>. It is the southernmost island and is very close to Sumatra island of Indonesia. The <strong>Car Nicobar is the northernmost</strong>.</li>
</ul>

<Callout variant="info" title="Composition and Volcanoes">
  <ul className="list-disc pl-5">
    <li>Most of these islands are made of <strong>tertiary sandstone, limestone and shale</strong> resting on basic and ultrabasic volcanoes (Similar to Himalayas).</li>
    <li><strong>THE BARREN AND NARCONDAM ISLANDS</strong>, north of Port Blair, are volcanic islands. These are the <strong>only active volcanoes in India</strong>.</li>
    <li>Some of the islands are fringed with coral reefs. Many are covered with thick forests and are mountainous.</li>
  </ul>
</Callout>

<p><br/><hr/><br/></p>

<h2>Lakshadweep</h2>
<p>Lakshadweep Islands are coral islands. These islands are a part of <strong>Reunion Hotspot volcanism</strong>.</p>

<p>In the Arabian Sea, there are three types of islands:</p>
<FeatureList title="Island Groups in Arabian Sea">
  <FeatureItem title="Amindivi Islands">
    Consisting of six main islands of Amini, Keltan, Chetlat, Kadmat, Bitra and Perumul Par. These are the northernmost.
  </FeatureItem>
  <FeatureItem title="Laccadive Islands">
    Consisting of five major islands of Androth, Kalpeni, Kavaratti, Pitti and Suheli Par.
  </FeatureItem>
  <FeatureItem title="Minicoy Island">
    The southernmost island. It is the largest and most advanced island.
  </FeatureItem>
</FeatureList>

<h3>Key Facts about Lakshadweep</h3>
<ul className="list-disc pl-5">
  <li>At present these islands are collectively known as Lakshadweep. They are widely scattered about <strong>200-500 km south-west of the Kerala coast</strong>.</li>
  <li>All are <strong>tiny islands of coral origin {Atoll}</strong> and are surrounded by fringing reefs.</li>
  <li>Most of the islands have low elevation and do not rise more than <strong>five metres above sea level</strong>.</li>
  <li>Their topography is flat and relief features such as hills, streams, valleys, etc. are absent.</li>
</ul>
`,
      accessTier: 'PRO',
      isActive: true,
      order: 2
    }
  });
}
