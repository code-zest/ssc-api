import { PrismaClient } from "@prisma/client";

export async function seedGeographyClimateOfIndia(prisma: PrismaClient, subjectId: string, chapterId: string) {
  console.log("Seeding Geography Chapter: Climate of India...");

  await prisma.lesson.upsert({
    where: { chapterId_slug: { chapterId: chapterId, slug: 'climate-of-india-article' } },
    update: { chapterId: chapterId },
    create: {
      chapterId: chapterId,
      subjectId: subjectId,
      title: 'Climate of India (Notes)',
      slug: 'climate-of-india-article',
      type: 'ARTICLE',
      articleHtml: `<h1>1. CLIMATE OF INDIA</h1>
<p><strong>Climate</strong> refers to the sum total of weather conditions and variations over a large area for a long period of time (more than thirty years). <strong>Weather</strong> refers to the state of the atmosphere over an area at any point of time.</p>

<Callout variant="info" title="Elements of Weather and Climate">
  The elements of weather and climate are the same, i.e., <strong>temperature, atmospheric pressure, wind, humidity and precipitation</strong>.
</Callout>

<p><br/><hr/><br/></p>

<h1>2. FACTORS DETERMINING THE CLIMATE OF INDIA</h1>
<p>India's climate is controlled by a number of factors which can be broadly divided into two groups: factors related to location and relief, and factors related to air pressure and winds.</p>

<FeatureList title="Factors related to Location and Relief">
  <FeatureItem title="Latitude">
    The northern part of the India lies in sub-tropical and temperate zone and the part lying south of the Tropic of Cancer falls in the tropical zone. The tropical zone being nearer to the equator experiences high temperatures throughout the year with small daily and annual range. Area north of the Tropic of Cancer being away from the equator, experiences extreme climate with high daily and annual range of temperature.
  </FeatureItem>
  <FeatureItem title="The Himalayan Mountains">
    The towering mountain chain provides an invincible shield to protect the subcontinent from the cold northern winds, forcing them to shed their moisture within the subcontinent. The Himalayas also trap the monsoon winds.
  </FeatureItem>
  <FeatureItem title="Distribution of Land and Water">
    As compared to the landmass, water heats up or cools down slowly. This differential heating of land and sea creates different air pressure zones in different seasons in and around the Indian subcontinent causing reversal in the direction of monsoon winds.
  </FeatureItem>
  <FeatureItem title="Distance from the Sea">
    With a long coastline, large coastal areas have an equable climate. Areas in the interior of India are far away from the moderating influence of the sea and have extremes of climate.
  </FeatureItem>
  <FeatureItem title="Altitude">
    Temperature decreases with height. Due to thin air, places in the mountains are cooler than places on the plains. For example, <strong>Agra and Darjeeling</strong> are located on the same latitude, but temperature of January in Agra is 16 whereas it is only 4 in Darjeeling.
  </FeatureItem>
  <FeatureItem title="Relief">
    The physiography or relief of India also affects the temperature, air pressure, direction and speed of wind and the amount and distribution of rainfall. <strong>For example:</strong> The windward sides of Western Ghats and Assam receive high rainfall during June-September whereas the southern plateau remains dry due to leeward situation.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h1>3. WESTERN CYCLONIC DISTURBANCE AND TROPICAL CYCLONES</h1>
<ul className="list-disc pl-5">
  <li>The <strong>western cyclone disturbances</strong> blowing West to East in Indian subcontinent during the winter months originate over the <strong>Mediterranean Sea</strong> and are brought into India by the <strong>westerly jet stream</strong>.</li>
  <li>An increase in the prevailing night temperature generally indicates an advance in the arrival of these cyclones disturbances.</li>
  <li><strong>Tropical cyclones</strong> originate over the Bay of Bengal and the Indian Ocean.</li>
  <li>These tropical cyclones have very high wind velocity and heavy rainfall and hit the Tamil Nadu, Andhra Pradesh and Orissa coast.</li>
  <li>Most of these cyclones are very destructive due to high wind velocity and torrential rain that accompanies it.</li>
</ul>

<p><br/><hr/><br/></p>

<h1>4. THE NATURE OF INDIAN MONSOON</h1>
<p>Systematic studies of the causes of rainfall in the South Asian region help to understand the causes and salient features of the monsoon, particularly some of its important aspects, such as: the onset of the monsoon, rain-bearing systems (e.g. tropical cyclones) and the relationship between their frequency and distribution of monsoon rainfall, and break in the monsoon.</p>

<h2>Onset of the Monsoon</h2>
<p>The Causes of Onset of Monsoon are as:</p>
<ul className="list-disc pl-5">
  <li>Differential heating of Landmass (Extreme low pressure in North-Western India & High pressure in Reunion Island).</li>
  <li>Northward shifting of ITCZ.</li>
  <li>Withdrawal of Westerly jets from its position in Northern plain & positioning of easterly jet at 15°N.</li>
  <li>This <strong>easterly jet stream is held responsible for the burst of the monsoon</strong> in India.</li>
</ul>

<h2>Rain-bearing Systems and Rainfall Distribution</h2>
<ul className="list-disc pl-5">
  <li>First originate in the <strong>Bay of Bengal</strong> causing rainfall over the plains of north India.</li>
  <li>Second is the <strong>Arabian Sea current</strong> of the southwest monsoon which brings rain to the west coast of India.</li>
</ul>

<FeatureList title="Rain-bearing Systems">
  <FeatureItem title="Western Ghats">
    Much of the rainfall along the Western Ghats is orographic as the moist air is obstructed and forced to rise along the Ghats. The intensity of rainfall over the west coast of India is, however, related to two factors: the offshore meteorological conditions, and the position of the equatorial jet stream along the eastern coast of Africa.
  </FeatureItem>
  <FeatureItem title="Bay of Bengal">
    The frequency of the tropical depressions originating from the Bay of Bengal varies from year to year. Their paths over India are mainly determined by the <strong>position of ITCZ</strong> which is generally termed as the monsoon trough. As the <strong>axis of the monsoon trough oscillates</strong>, there are fluctuations in the track and direction of these depressions, and the intensity and the amount of rainfall vary from year to year.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h1>5. EL-NINO AND THE INDIAN MONSOON</h1>
<ul className="list-disc pl-5">
  <li>El-Nino is a complex weather system that appears once every three to seven years bringing drought, floods and other weather extremes to different parts of the world.</li>
  <li>The system involves oceanic and atmospheric phenomena with the appearance of warm currents off the coast of peru in the Eastern Pacific and affects weather in many places including India.</li>
  <li>El-Nino is merely an extension of the warm equatorial current which gets replaced temporarily by cold Peruvian current or Humbolt current.</li>
  <li>This current increases the temperature of water on the Peruvian coast by <strong>10°C</strong>.</li>
</ul>

<Callout variant="warning" title="Results of El-Nino">
  <ul className="list-disc pl-5">
    <li>The distortion of equatorial atmospheric circulation;</li>
    <li>Irregularities in the evaporation of sea water;</li>
    <li>Reduction in the amount of planktons which further reduces the number of fish in the sea.</li>
  </ul>
</Callout>

<p>El-Nino is used in India for forecasting long range monsoon rainfall. In 1990-91, there was a wild El-Nino even and the onset of southwest monsoon was delayed over most parts of the country ranging from five to twelve days.</p>

<p><br/><hr/><br/></p>

<h1>6. SOME FAMOUS LOCAL STORMS OF HOT WEATHER SEASON</h1>

<FeatureList title="Local Storms">
  <FeatureItem title="Mango Shower">
    Towards the end of summer. There are pre-monsoon showers which are a common phenomena in Kerala and coastal areas of Karnataka. Locally, they are known as mango showers since <strong>they help in the early ripening of mangoes</strong>.
  </FeatureItem>
  <FeatureItem title="Blossom Shower">
    With this shower, <strong>coffee flowers blossom</strong> in Kerala and nearby areas.
  </FeatureItem>
  <FeatureItem title="Nor-Westers">
    These are dreaded evening thunderstorms in Bengal and Assam. Their notorious nature can be understood from the local nomenclature of <strong>'Kalbaisakhi'</strong>, a calamity of the month of Baisakh. These showers are <strong>useful for tea, jute and rice cultivation</strong>. In Assam, these storms are known as <strong>"Bordoiseela"</strong>.
  </FeatureItem>
  <FeatureItem title="Loo">
    Hot, dry and oppressing winds blowing in the <strong>Northern plains from Punjab to Bihar</strong> with higher intensity between Delhi and Patna.
  </FeatureItem>
</FeatureList>

<p><br/><hr/><br/></p>

<h1>7. DISTRIBUTION OF RAINFALL</h1>
<p>The average annual rainfall in India is about 125 cm, but it has great spatial variations.</p>

<FeatureList title="Rainfall Zones">
  <FeatureItem title="Areas of High Rainfall (Exceeds 200 cm)">
    The highest rainfall occurs along the west coast, on the Western Ghats, as well as in the sub-Himalayan areas in the northeast and the hills of Meghalaya. In some parts of Khasi and Jaintia hills, the rainfall exceeds 1,000 cm. In the Brahmaputra valley and the adjoining hills, the rainfall is less than 200 cm.
  </FeatureItem>
  <FeatureItem title="Areas of Medium Rainfall (100-200 cm)">
    Rainfall between 100-200 cm is received in the southern parts of Gujarat, east Tamil Nadu, north-eastern Peninsula covering Orissa, Jharkhand, Bihar, eastern Madhya Pradesh, northern Ganga plain along the sub-Himalayas and the Cachar Valley and Manipur.
  </FeatureItem>
  <FeatureItem title="Areas of Low Rainfall (50-100 cm)">
    Western Uttar Pradesh, Delhi, Haryana, Punjab, Jammu and Kashmir, eastern Rajasthan, Gujarat and Deccan Plateau receive rainfall between 50-100 cm.
  </FeatureItem>
  <FeatureItem title="Areas of Inadequate Rainfall (Below 50 cm)">
    Parts of the Peninsula, especially in Andhra Pradesh, Karnataka and Maharashtra, Ladakh and most of western Rajasthan receive rainfall below 50 cm. Snowfall is restricted to the Himalayan region.
  </FeatureItem>
</FeatureList>
`,
      accessTier: 'PRO',
      isActive: true,
      order: 3
    }
  });
}
