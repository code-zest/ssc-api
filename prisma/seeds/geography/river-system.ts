import { PrismaClient } from "@prisma/client";

export async function seedGeographyRiverSystem(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Geography Chapter: River System / Drainage System...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: 'river-system-drainage-system-article' } },
    update: { chapterId: chapterId },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: 'River System & Drainage System (Notes)',
      slug: 'river-system-drainage-system-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. DRAINAGE SYSTEM IN INDIA</h1>
<ul className="list-disc pl-5">
  <li>A river drains the water collected from a specific area, which is called its <strong>'catchment area'</strong>.</li>
  <li>The flow of water through well-defined channels is known as <strong>'drainage'</strong> and the network of such channels is called a <strong>'drainage system'</strong>.</li>
  <li>The boundary line separating one drainage basin from the other is known as the <strong>watershed</strong>.</li>
</ul>

<p>Indian drainage system may be divided on various bases into:</p>

<FeatureList title="On the basis of discharge of water">
  <FeatureItem title="The Arabian Sea drainage">
    23 per cent comprising the Indus, the Narmada, the Tapi, the Mahi and the Periyar systems discharge their waters in the Arabian Sea.
  </FeatureItem>
  <FeatureItem title="The Bay of Bengal drainage">
    Nearly 77 per cent of the drainage area consisting of the Ganga, the Brahmaputra, the Mahanadi, Krishna, etc. is oriented towards the Bay of Bengal.
  </FeatureItem>
</FeatureList>

<ul className="list-disc pl-5 mt-4">
  <li>They are <strong>separated from each other through the Delhi ridge, the Aravalis and the Sahyadris</strong>.</li>
</ul>

<FeatureList title="On the basis of the size of the watershed">
  <FeatureItem title="Major river basins">
    With more than <strong>20,000 sq. km.</strong> of catchment area. Includes 14 drainage basins such as the Ganga, the Brahmaputra, the Krishna, the Tapi, the Narmada, the Mahi, the Pennar, the Sabarmati, the Barak, etc.
  </FeatureItem>
  <FeatureItem title="Medium river basins">
    With catchment area between <strong>2,000-20,000 sq. km.</strong> Incorporating 44 river basins such as the Kalindi, the Periyar, the Meghna, etc.
  </FeatureItem>
  <FeatureItem title="Minor river basins">
    With catchment area of <strong>less than 2,000 sq. km.</strong> Include fairly good number of rivers flowing in the area of low rainfall.
  </FeatureItem>
</FeatureList>

<FeatureList title="On the basis of the mode of origin">
  <FeatureItem title="The Himalayan drainage"></FeatureItem>
  <FeatureItem title="The peninsular drainage"></FeatureItem>
</FeatureList>

<Callout variant="info" title="Important Note">
  Although the peninsular drainage has the problem of including the <strong>Chambal, the Betwa, the Son, etc.</strong> which are <strong>much older in age and origin</strong> than other rivers that have their origin in the Himalayas, it is the most accepted basis of classification.
</Callout>

<p><br/><hr/><br/></p>

<h1>2. IMPORTANT DRAINAGE PATTERNS</h1>

<FeatureList title="Drainage Patterns">
  <FeatureItem title="Dendritic Pattern">
    The drainage pattern resembling the branches of a tree is known as "dendritic". The examples of which are the rivers of the northern plain.
  </FeatureItem>
  <FeatureItem title="Radial Pattern">
    When the rivers originate from a hill and flow in all directions, the drainage pattern is known as 'radial'. The rivers originating from the <strong>Amarkantak range</strong> present a good example of it.
  </FeatureItem>
  <FeatureItem title="Trellis Pattern">
    When the primary tributaries of rivers flow parallel to each other and secondary tributaries join them at right angles, the pattern is known as 'trellis'.
  </FeatureItem>
  <FeatureItem title="Centripetal Pattern">
    When the rivers discharge their waters from all directions in a lake or depression, the pattern is know as 'centripetal'.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h1>3. THE HIMALAYAN DRAINAGE SYSTEM</h1>
<ul className="list-disc pl-5">
  <li>It mainly includes the Ganga, the Indus and the Brahmaputra rivers basins.</li>
  <li>They are perennial rivers as fed by both - <strong>Melting of Glaciers & Precipitation</strong>.</li>
</ul>

<h3>Major Characteristics of Himalayan River</h3>
<ul className="list-disc pl-5">
  <li>Pass through the <strong>giant gorges</strong> carved out by the <strong>erosional activity</strong>.</li>
  <li>Also <strong>form V-shaped valleys</strong>, rapids and waterfalls in their mountainous course.</li>
  <li>In plains, they form <strong>depositional features like flat valleys, ox-bow lakes, flood plains, braided channels, and deltas</strong> near the river mouth.</li>
  <li>Meandering in plains is main display as for example - <strong>River Kosi</strong>, also known as the <strong>'sorrow of Bihar'</strong>, has been notorious for frequently changing its course.</li>
</ul>

<Callout variant="tip" title="Evolution of the Himalayan Drainage">
  <ul className="list-disc pl-5">
    <li>Geologists believe that a mighty river called <strong>Shiwalik or Indo-Brahma traversed the entire longitudinal extent</strong> of the Himalaya from Assam to Punjab and onwards to Sind, and finally discharge into the <strong>Gulf of Sind</strong> during the <strong>Miocene period</strong>.</li>
    <li>Indo-Brahma river was dismembered into three main drainage systems (Indus, Ganga, Brahmaputra).</li>
    <li>The dismemberment was probably due to the <strong>Pleistocene upheaval in the western Himalayas</strong>, including the uplift of the <strong>Potwar Plateau (Delhi Ridge)</strong>, which acted as the water divide between the Indus and Ganga.</li>
    <li>Likewise, the <strong>down thrusting of the Malda gap area</strong> between the Rajmahal hills and the Meghalaya plateau during the <strong>mid-Pleistocene period</strong>, diverted the Ganga and the Brahmaputra systems to flow towards the Bay of Bengal.</li>
  </ul>
</Callout>

<p><br/><hr/><br/></p>

<h2>3.1 The River Systems of the Himalayan Drainage</h2>

<h3>The Indus System</h3>
<ul className="list-disc pl-5">
  <li>The Indus also known as the Sindhu, is the westernmost of the Himalayan rivers in India.</li>
  <li>It originates from a <strong>glacier near Bokhar Chu</strong> in the Tibetan region in the Kailash Mountain range.</li>
  <li>In Tibet, it is known as <strong>'Singi Khamban; or Lion's mouth</strong>.</li>
  <li>After flowing in the <strong>northwest direction between the Ladakh and Zaskar ranges, it passes through Ladakh and Baltistan</strong>.</li>
  <li>It cuts across the ladakh range, forming a <strong>spectacular gorge near Gilgit</strong> in Jammu and Kashmir.</li>
  <li>It finally emerges out of the hills near Attock where it receives the Kabul river on its right bank.</li>
  <li>The river flows southward and receives 'Panjnad' a little above Mithankot.</li>
  <li>The Indus flows in India only through the Leh district in Ladakh UT.</li>
</ul>

<h3>Tributaries of the Indus</h3>
<FeatureList title="Key Tributaries">
  <FeatureItem title="The Jhelum River">
    Rises from a spring at Verinag situated at the foot of the Pir Panjal. Flows through Srinagar and the Wular lake before entering Pakistan. Joins the Chenab near Jhang.
  </FeatureItem>
  <FeatureItem title="The Chenab River">
    <strong>Largest tributary</strong> of the Indus. Formed by two streams, the Chandra and the Bhaga (joins at Tandi). Known as Chandrabhaga.
  </FeatureItem>
  <FeatureItem title="The Ravi River">
    Rises west of the Rohtang pass in Kullu hills. Drains the area lying between south-eastern part of Pir Panjal and Dhauladhar ranges.
  </FeatureItem>
  <FeatureItem title="The Beas River">
    Originating from the Beas Kund near Rohtang Pass. Enters Punjab plains where it meets the Satluj near Harike.
  </FeatureItem>
  <FeatureItem title="The Satluj River">
    Originates in the Rakas lake near Mansarovar in Tibet (known as Langchen Khambab). Flows almost parallel to Indus for 400 km. It is an antecedent river and feeds the Bhakra Nangal project canal system.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h2>3.2 The Ganga River System</h2>
<ul className="list-disc pl-5">
  <li>Most important river of India both from point of view of its basin and cultural significance.</li>
  <li>It rises in the <strong>Gangotri glacier near Gaumukh (3,900 m)</strong> in the Uttarkashi district of Uttarakhand.</li>
  <li>Length of 2,525 km, shared by Uttarakhand, Uttar Pradesh, Bihar and West Bengal.</li>
  <li>Enters the plains at Haridwar. Flows first to the south, then <strong>south-east and east before splitting into two distributaries, namely the Bhagirathi and the Hugli</strong>.</li>
  <li>Discharges into the Bay of Bengal near Sagar Island.</li>
</ul>

<h3>Tributaries of the Ganga</h3>
<FeatureList title="Key Tributaries">
  <FeatureItem title="The Gandak River">
    Comprises two streams, Kaligandak and Trishulganga. Joins the Ganga at Sonpur near Patna.
  </FeatureItem>
  <FeatureItem title="The Ghaghara River">
    Originates in glaciers of Mapchachungo. Joins the Ganga at Chhapra.
  </FeatureItem>
  <FeatureItem title="The Kosi River">
    Antecedent river with source north of Mount Everest. Main stream is Arun. Forms Sapt Kosi.
  </FeatureItem>
  <FeatureItem title="The Ram Ganga River">
    Small river rising in Garhwal hills near Gairsain. Joins Ganga near Kannauj.
  </FeatureItem>
  <FeatureItem title="The Damodar River">
    Occupies eastern margins of Chotanagpur Plateau. Known as 'sorrow of Bengal', now tamed by Damodar Valley corporation.
  </FeatureItem>
  <FeatureItem title="The Mahananda River">
    Rising in Darjeeling hills. Last left bank tributary in West Bengal.
  </FeatureItem>
  <FeatureItem title="The Son River">
    Large south bank tributary originating in Amarkantak plateau. Joins Ganga west of Patna.
  </FeatureItem>
  <FeatureItem title="The Yamuna River">
    Western most and longest tributary. Source in <strong>Yamunotri glacier</strong> on western slopes of Banderpunch range. <strong>Hindon river</strong> is its left bank tributary.
  </FeatureItem>
  <FeatureItem title="The Chambal River">
    Rises near Mhow in Malwa plateau. Famous for its badland topography called <strong>Chambal ravines</strong>. Joins Yamuna.
  </FeatureItem>
  <FeatureItem title="The Saryu River">
    Rises in Milan glacier in Nepal Himalayas where known as Goriganga. Along Indo-Nepal border, it is called Kali or Chauk. Joins Ghaghara.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h2>3.3 The Brahmaputra River System</h2>
<ul className="list-disc pl-5">
  <li>Origin in the <strong>Chemayungdung glacier</strong> of Kailash range near Mansarovar lake.</li>
  <li>Traverses eastward longitudinally in Tibet, where it is known as <strong>Tsangpo</strong>, which means <strong>'the purifier'</strong>.</li>
  <li>The <strong>Rango Tsangpo</strong> is the major right bank tributary of this river in Tibet.</li>
  <li>Emerges as turbulent river after carving deep gorge near Namcha Barwa.</li>
  <li>Emerges from foothills under name <strong>Siang or Dihang</strong>. Enters India west of Sadiya town in Arunachal Pradesh.</li>
  <li>The Subansiri which has its origin in Tibet, is an <strong>antecedent river</strong>.</li>
  <li>In Bangladesh, the <strong>Tista joins it on its right bank</strong> from where the river is known as the <strong>Jamuna</strong>.</li>
  <li>Finally merges with river <strong>Padma</strong>, which falls in the Bay of Bengal.</li>
</ul>

<p><br/><hr/><br/></p>

<h1>4. THE PENINSULAR DRAINAGE SYSTEM</h1>
<ul className="list-disc pl-5">
  <li>Older than the Himalayan one. Evident from the <strong>broad, largely-graded shallow valleys</strong>, and the maturity of the rivers.</li>
  <li>Most of the <strong>major peninsular rivers except Narmada and Tapi flow from west to east</strong>.</li>
  <li>The <strong>Chambal, the Sind, the Betwa, the Ken, the Son</strong>, originating in the northern part of the peninsular belong to the Ganga river system.</li>
  <li>Other major river systems are the <strong>Mahanadi, the Godavari, the Krishna and the Kaveri</strong>.</li>
</ul>

<h3>Characteristics of Peninsular River:</h3>
<ul className="list-disc pl-5">
  <li>Characterized by <strong>fixed course, absence of meanders and no perennial flow of water</strong>.</li>
  <li>The Narmada and the Tapi which flow through the rift valley are, however, exceptions. They meet in Arabian sea.</li>
</ul>

<Callout variant="tip" title="Evolution of Peninsular Drainage System">
  Three major geological events shaped it:
  <ul className="list-disc pl-5">
    <li><strong>Subsidence and submergence</strong> of the western flank of the peninsula during early tertiary period.</li>
    <li><strong>Upheaval of the Himalayas</strong> when northern flank was subjected to subsidence and consequent trough faulting. The Narmada and Tapi flow in trough faults.</li>
    <li><strong>Slight tilting</strong> of the peninsular block from northwest to the south-eastern direction gave orientation towards the Bay of Bengal.</li>
  </ul>
</Callout>

<p><br/><hr/><br/></p>

<h2>4.1 Rivers Flowing to Bay of Bengal</h2>

<FeatureList title="East Flowing Rivers">
  <FeatureItem title="The Mahanadi River">
    Rises near <strong>Sihawa in Raipur district of Chhattisgarh</strong> and runs through Orissa to discharge its water into the Bay of Bengal.
  </FeatureItem>
  <FeatureItem title="The Godavari River">
    The <strong>largest peninsular river system</strong>. Also called the <strong>Dakshin Ganga</strong>. Rises in Nasik district of Maharashtra. Navigable only in deltaic stretch. After Rajamundri splits into branches forming a large delta.
  </FeatureItem>
  <FeatureItem title="The Krishna River">
    Second largest east flowing peninsular river which <strong>rises near Mahabaleshwar</strong> in Sahyadri.
  </FeatureItem>
  <FeatureItem title="The Cauvery River">
    Rises in Brahmagiri hills of Kogadu district in Karnataka. Carries water throughout the year (comparatively less fluctuation) as upper catchment receives rainfall during southwest monsoon (summer) and lower part during northeast monsoon (winter).
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h2>4.2 Rivers Flowing Towards West Coast of India</h2>

<FeatureList title="West Flowing Rivers">
  <FeatureItem title="The Narmada River">
    Originates on western flank of <strong>Amarkantak plateau</strong>. Flowing in a <strong>rift valley</strong> between Satpura (south) and Vindhyan range (north). Forms picturesque gorge in marble rocks and <strong>Dhuandhar waterfall near Jabalpur</strong>. Meets Arabian sea south of Bharuch forming broad 27 km long estuary. Sardar Sarovar Project constructed on this river.
  </FeatureItem>
  <FeatureItem title="The Tapi River">
    Other important westward flowing river. Originates from <strong>Multai in the Betul district</strong> of Madhya Pradesh.
  </FeatureItem>
  <FeatureItem title="The Luni River">
    Largest river system of Rajasthan, west of Aravali. <strong>Originates near Pushkar</strong> in two branches (Saraswati and Sabarmati). Entire river system is <strong>ephemeral</strong>.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h2>4.3 Smaller Rivers Flowing Towards the West</h2>

<FeatureList title="Small West Flowing Rivers">
  <FeatureItem title="Rivers in Gujrat">
    <strong>Shetruniji</strong> (rises near Dalkahwa in Amreli), <strong>Bhadra</strong> (Aniali village in Rajkot), <strong>Dhadhar</strong> (Ghantar village in Panchmahal), <strong>Sabarmati</strong> and <strong>Mahi</strong>. <strong>Mahi river crosses the Tropic of Cancer twice</strong>.
  </FeatureItem>
  <FeatureItem title="Rivers of Maharashtra & Karnataka">
    <strong>Vaitarna</strong> (Trimbak hills in Nasik), <strong>Kalinadi</strong> (Belgaum district), <strong>Bedti river</strong> (Hubli Dharwar), <strong>Sharavati</strong> (Shimoga district of Karnataka).
  </FeatureItem>
  <FeatureItem title="The rivers of Goa">
    <strong>Mandovi</strong> and <strong>Juari</strong>.
  </FeatureItem>
  <FeatureItem title="The rivers of Kerala">
    <strong>Bharathapuzha</strong> (longest river of Kerala, rises near Annamalai hills, also known as Ponnani), <strong>Periyar</strong> (second largest in Kerala), <strong>Pamba river</strong> (falls in Vembanad lake).
  </FeatureItem>
</FeatureList>
`,
      accessTier: 'PRO',
      isActive: true,
      order: 4
    }
  });
}
