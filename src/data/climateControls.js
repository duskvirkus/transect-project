// 7 primary climatic controls analysis for the default transect (Fuji → Lopnur).
// Each entry has a title and an array of paragraphs for its analysis text.
export const CLIMATE_CONTROLS = [
  {
    id: 'latitude',
    title: '1. Latitude / Angle of Insolation',
    paragraphs: [
      'The transect spans a relatively narrow latitudinal range of approximately 35°N to 41°N. Within this band, insolation intensity does not vary dramatically between stations — all receive mid-latitude solar angles with distinct seasonal cycles. However, the slight increase in latitude from the eastern stations (Fuji ~35°N) to the western stations (Lopnur ~40°N) contributes to somewhat colder mean temperatures and a shorter warm season at the western end.',
      'This small latitudinal gradient is largely overwhelmed by the much stronger east–west gradient driven by continentality and distance from moisture sources, but it remains a background control on the seasonal amplitude of temperature at all stations.',
    ],
  },
  {
    id: 'land-sea',
    title: '2. Land-Sea Distribution',
    paragraphs: [
      'The most dramatic climatic gradient along the transect is driven by the transition from maritime to continental environments. The eastern stations (Fuji, Matsue) are directly influenced by the Pacific Ocean and the Sea of Japan, which moderate temperature extremes and supply abundant moisture. Moving west, stations on the Korean Peninsula and Shandong coast (Sangju-si, Rongcheng City) are semi-maritime, still benefiting from proximity to seas during the summer monsoon.',
      'By the time the transect reaches the interior of China (Yangxin County, Loufan, Shizuishan), the moderating influence of any ocean is minimal in winter. The far-western stations — Gansu, Dunhuang, and Lopnur — are among the most continental locations in the world, separated from any ocean by thousands of kilometers of land, resulting in extreme annual temperature ranges and minimal precipitation.',
    ],
  },
  {
    id: 'ocean-currents',
    title: '3. Ocean Currents',
    paragraphs: [
      'The Kuroshio Current (Japan Current) flows northeastward along the Pacific coast of Japan, warming and moistening the air masses that reach eastern stations. This warm current is a key reason why Fuji receives abundant precipitation year-round and does not experience the harsh winters typical of its latitude.',
      'The Sea of Japan, partially warmed by Tsushima Warm Current, plays a critical role for Matsue. Cold Siberian air masses that cross the sea in winter pick up large amounts of moisture and deliver heavy snowfall to the Sea of Japan coastline. No comparable warm ocean current influences the western stations; instead, the Yellow Sea moderately influences Rongcheng City during summer but has limited winter effect.',
    ],
  },
  {
    id: 'winds',
    title: '4. Prevailing Wind Patterns',
    paragraphs: [
      'Seasonal wind reversal — the East Asian Monsoon — dominates the precipitation patterns along this transect. In summer, onshore southerly and southeasterly winds bring moist Pacific air inland, delivering the majority of annual precipitation to eastern and central stations (Fuji through Yangxin County). In winter, the monsoon reverses to strong northwesterly and westerly winds originating from the cold, dry Siberian High, bringing frigid, dry continental air westward across the entire transect.',
      'The western stations (Shizuishan, Gansu, Dunhuang, Lopnur) are dominated by westerly winds year-round and are too far inland to receive significant moisture from the summer monsoon. The westerlies instead bring dry, stable air from Central Asia, reinforcing the hyper-arid conditions in the Tarim Basin.',
    ],
  },
  {
    id: 'pressure',
    title: '5. Semi-Permanent Pressure Systems / Cell Boundaries',
    paragraphs: [
      'The Siberian High is the dominant pressure system controlling winter climate along the entire transect. This intense anticyclone, centered over central Siberia, drives cold, dry northwesterly winds across China and Korea in winter, suppressing precipitation and driving temperatures far below seasonal averages at inland stations.',
      'In summer, a thermal low develops over the Asian continent, and the western Pacific subtropical high (the North Pacific High) expands northward and westward. The interplay of these systems steers the summer monsoon moisture into eastern and central China. The far-western stations remain outside the summer monsoon\'s reach — they lie in the lee of the circulation and within a semi-permanent dry zone between the monsoon system and the descending limb of the Hadley Cell.',
    ],
  },
  {
    id: 'topography',
    title: '6. Mountains / Topography',
    paragraphs: [
      'Several major topographic features shape the climate along the transect. Mount Fuji (3,776 m) lies at or near Station 1 and creates orographic lift that greatly amplifies precipitation on its windward slopes. The Taebaek Mountains in Korea act as a partial barrier, contributing to the drier interior climate of Sangju-si relative to the wetter east coast of Korea.',
      'Most significantly, the Tibetan Plateau and its northeastern escarpment — rising to 4,000–5,000 m — forms a massive barrier that deflects the jet stream and prevents moist Indian Ocean air from reaching the Tarim Basin from the south. This blocking effect, combined with the Tian Shan mountains to the north, traps the Tarim Basin in a rain shadow of continental scale. The elevation of interior stations (Loufan at 1,165 m, Gansu at 1,458 m) also lowers temperatures relative to what latitude alone would predict.',
    ],
  },
  {
    id: 'altitude',
    title: '7. Altitude',
    paragraphs: [
      'Altitude strongly modifies the temperature regime at several stations along the transect. Loufan (1,165 m), Shizuishan (1,099 m), Gansu (1,458 m), and Dunhuang (1,142 m) all sit at elevations that lower mean annual temperatures by approximately 6–9°C relative to sea-level equivalents at the same latitude (using the standard lapse rate of ~6.5°C/1000 m).',
      'This elevation effect partially offsets the warming expected from the low latitudes of eastern stations. At Fuji and Matsue, the low coastal elevations (10 m and 6 m) mean altitude has almost no effect on temperature. The increasing elevation through the interior plateau stations contributes to the perception that these stations have harsher climates than their latitude alone would suggest, and is a key reason for the short growing seasons and cold winters of the Loess Plateau and Hexi Corridor stations.',
    ],
  },
]
