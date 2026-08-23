import { PrismaClient } from "@prisma/client";

export async function seedGeographyLocationAndExtent(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Geography Chapter: India's Location and Extent...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: 'indias-location-and-unification-article' } },
    update: { chapterId: chapterId }, // Ensure it moves if already exists
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: 'India\'s Location and Unification (Notes)',
      slug: 'indias-location-and-unification-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. LOCATION AND UNIFICATION</h1>
<p>India is a vast country, entirely located in the <strong>Northern Hemisphere</strong> and situated in the <strong>Asia Continent</strong>. It is the <strong>7th largest country in the world</strong>, accounting for approximately <strong>2.4%</strong> of the world's total land area.</p>

<FeatureList title="Geographical Extent">
  <FeatureItem title="Latitude">
    Between <strong>8°4'N</strong> and <strong>37°6'N</strong>
  </FeatureItem>
  <FeatureItem title="Longitude">
    Between <strong>68°7'E</strong> and <strong>97°25'E</strong>
  </FeatureItem>
  <FeatureItem title="Total Extent">
    The latitudinal and longitudinal extent of the mainland is about <strong>30°</strong>.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h2>About Boundary of India</h2>
<p>India shares both vast land boundaries and significant coastal boundaries.</p>

<FeatureList title="Extreme Points of India">
  <FeatureItem title="Northernmost Point" subtitle="Ladakh UT">
    <strong>Indira Col</strong>
  </FeatureItem>
  <FeatureItem title="Southernmost Point" subtitle="Great Nicobar Island">
    <strong>Pygmalion Point</strong> or <strong>Indira Point</strong> (located at 6°45' N latitude)
  </FeatureItem>
  <FeatureItem title="Easternmost Point" subtitle="Arunachal Pradesh">
    <strong>Kibithu</strong>
  </FeatureItem>
  <FeatureItem title="Westernmost Point" subtitle="Gujarat">
    <strong>Ghaur Moti</strong>
  </FeatureItem>
</FeatureList>

<ul className="list-disc pl-5 mt-4">
  <li>India has a land boundary of about <strong>15,200 km</strong>.</li>
  <li>The total length of the coastline of the mainland, including Andaman and Nicobar and Lakshadweep, is <strong>7,516.6 km</strong>.</li>
</ul>

<p><br/><hr/><br/></p>

<h2>Coastal Plains of India</h2>

<h3>Eastern Coastal Plains</h3>
<p>The east coast stretches across <strong>West Bengal, Odisha, Andhra Pradesh, and Tamil Nadu</strong>.</p>
<ul className="list-disc pl-5">
  <li>Deltas of the rivers Mahanadi, Krishna, Godavari, and Cauvery are present in the eastern coastal plain.</li>
  <li>These deltas are very fertile and productive for agriculture.</li>
</ul>
<Callout variant="info" title="Granary of South India">
  Because of its immense fertility, the delta of the River Krishna is called the <strong>'Granary of South India'</strong>.
</Callout>

<FeatureList title="Divisions of the Eastern Coast">
  <FeatureItem title="Utkal Coast">
    Extending between the Chilika Lake and Kolleru Lake, they are much wider than the western coastal plains and undergo immense rainfall. Some cultivated crops here are rice, coconut, and banana.
  </FeatureItem>
  <FeatureItem title="Andhra Coast">
    Extending between the Kolleru Lake and Pulicat Lake, the Andhra coast forms a basin area for the Krishna and Godavari rivers.
  </FeatureItem>
  <FeatureItem title="Coromandel Coast">
    Extends between Pulicat Lake and Kanyakumari in Tamil Nadu. This Indian coastline remains dry in summer and receives rainfall during the winter due to the north-east monsoons.
  </FeatureItem>
</FeatureList>

<h3>Western Coastal Plains</h3>
<p>This passes through <strong>Gujarat, Maharashtra, Goa, Karnataka, and Kerala</strong>. It is narrower than the eastern coast.</p>
<ul className="list-disc pl-5">
  <li>The western coastal plains stretch for <strong>1500 km</strong> north to south and its width ranges from <strong>10 to 25 km</strong>.</li>
  <li>The West Continental Shelf is at its widest off the Bombay coast. This place is <strong>rich in oil</strong>.</li>
  <li>Along the Malabar Coast, there are many beautiful lagoons that make the place a tourist destination.</li>
</ul>

<FeatureList title="Divisions of the Western Coast">
  <FeatureItem title="Kachchh and Kathiawar Coast">
    Kachchh, formerly a gulf, is formed by the deposition of silt by the Indus. The area of Kachchh is covered with shallow water during monsoons and is divided into Great Rann in the north and Little Rann in the east. Kathiawar is situated to the south of Kachchh.
  </FeatureItem>
  <FeatureItem title="Konkan Coast">
    It extends between Daman in the north to Goa in the south. Rice and cashew are the two important crops of this region.
  </FeatureItem>
  <FeatureItem title="Kanada Coast">
    It extends between Marmagao and Mangaluru and is rich in iron deposits.
  </FeatureItem>
  <FeatureItem title="Malabar Coast">
    Extending between Mangaluru to Kanyakumari, the Malabar coast is relatively broad. This region also consists of lagoons running parallel to the coast in southern Kerala.
  </FeatureItem>
</FeatureList>

<Callout variant="tip" title="States with Coastline (In Ascending Order of Length)">
  <p>Gujarat, Andhra Pradesh, Tamil Nadu, Maharashtra, Kerala, Odisha, Karnataka, West Bengal, Goa, Puducherry, and Daman & Diu.</p>
</Callout>

<p><br/><hr/><br/></p>

<h2>India's Land Border with Countries</h2>
<p>India has <strong>15,106.7 Km</strong> of land border running through 13 States and Union Territories (UTs). The states touching the border of respective countries are classified below.</p>

<FeatureList title="Borders by Length (in km)">
  <FeatureItem title="Bangladesh" subtitle="4156 km"></FeatureItem>
  <FeatureItem title="China" subtitle="3488 km"></FeatureItem>
  <FeatureItem title="Pakistan" subtitle="3323 km"></FeatureItem>
  <FeatureItem title="Nepal" subtitle="1758 km"></FeatureItem>
  <FeatureItem title="Myanmar" subtitle="1674 km"></FeatureItem>
  <FeatureItem title="Bhutan" subtitle="699 km"></FeatureItem>
  <FeatureItem title="Afghanistan" subtitle="106 km"></FeatureItem>
</FeatureList>

<h3>The India-Bangladesh Border</h3>
<p>India's <strong>4,156 km</strong> long border with Bangladesh is the longest. This boundary has been determined under the <strong>Radcliffe Award</strong> which divided the erstwhile province of Bengal into two parts.</p>

<h3>The Sino-India Border</h3>
<p>Five Indian states, namely Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, and Arunachal Pradesh touch the Indian boundary with China. The Sino-Indian border is generally divided into three sectors:</p>
<ul className="list-disc pl-5">
  <li>The Western Sector</li>
  <li>The Middle Sector</li>
  <li>The Eastern Sector</li>
</ul>

<h4>The Western Sector</h4>
<ul className="list-disc pl-5">
  <li>Only Ladakh Union territory touches the Sinkiang (Xinjiang) province of China.</li>
  <li>China claims the Aksai Chin district, the Changmo valley, Pangong Tso and Sponggar Tso area of north-east Ladakh, as well as a strip of about 5,000 sq km down the entire length of eastern Ladakh.</li>
  <li>China also claims a part of the Huza-Gilgit area in North Ladakh (ceded to it in 1963 by Pakistan).</li>
  <li>The <strong>Johnson's line</strong> (proposed in 1865) shows Aksai Chin in erstwhile Jammu and Kashmir (now Ladakh) under India's control. The <strong>McDonald Line</strong> (proposed in 1893) places it under China's control.</li>
  <li>India considers the Johnson Line as the correct, rightful national border with China.</li>
</ul>

<Callout variant="warning" title="Disputed Territories: Kalapani">
  Claimed by India as a part of the Pithoragarh district of Uttarakhand, it is situated on the Kailash Mansarovar route. The Kali River in the Kalapani region demarcates the border between India and Nepal. The <strong>Treaty of Sugauli</strong> signed by the Kingdom of Nepal and British India (after the Anglo-Nepalese War) in 1816 located the Kali River as Nepal's western boundary with India.
</Callout>

<h3>The India-Bhutan Boundary</h3>
<p>Quite peaceful border and there is no boundary dispute between the two countries.</p>

<h3>The Indo-Pakistan Boundary</h3>
<p>The Indo-Pakistan boundary is the result of the partition of the country in 1947 under the <strong>Radcliffe award</strong>, of which Sir Cyril Radcliffe was the chairman.</p>

<FeatureList title="Disputed Territories (India - Pakistan)">
  <FeatureItem title="Jammu and Kashmir, PoK, and Gilgit-Baltistan">
    Pakistan is in illegal and forcible occupation of approximately 78,000 sq. km of Indian Territory in Jammu and Kashmir. Under the so-called Sino-Pakistan Boundary Agreement of 1963, Pakistan illegally ceded 5,180 sq. km in Pakistan Occupied Kashmir to China.
  </FeatureItem>
  <FeatureItem title="Siachen Glacier">
    Located in the eastern Karakorum in the Himalayas just east of the Actual Ground Position Line. The entire Siachen Glacier, with all major passes, is currently under the administration of India since 1984 (<strong>Operation Meghdoot</strong>).
  </FeatureItem>
  <FeatureItem title="Sir Creek">
    A 96 km long strip of water disputed between India and Pakistan in the Rann of Kutch marshlands. Pakistan claims the line to follow the eastern shore of the estuary while India claims a centreline (differing interpretations of paragraphs 9 and 10 of the Bombay Government Resolution of 1914). The International Boundary and International Maritime Boundary line (IMBL) have not been demarcated here.
  </FeatureItem>
</FeatureList>

<h3>India-Myanmar Boundary</h3>
<p>This boundary runs roughly along the watershed between the Brahmaputra and Ayeyarwady (Irrawaddy) rivers. It passes through thickly forested regions, with Mizo Hills, Manipur, and Nagaland on the Indian side and Chin Hills, Naga Hills, and Kachin state on the Myanmar side.</p>

<h3>India-Sri Lanka Boundary</h3>
<p>India and Sri Lanka are separated from each other by a narrow and shallow sea called the <strong>Palk Strait</strong>.</p>
<ul className="list-disc pl-5">
  <li><strong>Dhanushkodi</strong> on the Tamil Nadu coast in India is only 32 km away from Talaimannar in the Jaffna peninsula in Sri Lanka. These two points are joined by a group of islets forming <strong>Adam's Bridge</strong>.</li>
  <li>Though mostly peaceful, there were tensions over the question of who owned <strong>Kachchatheevu Island</strong> in the Palk Strait. It was ceded by India to Sri Lanka in 1974.</li>
</ul>
`,
      accessTier: 'PRO',
      isActive: true,
      order: 1
    }
  });
}
