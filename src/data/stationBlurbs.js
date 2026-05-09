// Per-station data for the 10 default transect stations (Fuji → Lopnur).
// Keyed by station id (0–9).
// controls: each key maps to { text: string, citeIds: string[] }
// Use text: '!needs more information!' or 'Not applicable — ...' as appropriate.
export const STATION_BLURBS = {
  0: {
    name: 'Fuji, Shizuoka',
    population: 245015,
    populationCiteId: 'fuji-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Fuji_City_Panorama.jpg/960px-Fuji_City_Panorama.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Fuji_City_Panorama.jpg',
    },
    citationId: 'fuji-wikipedia',
    blurb: 'Fuji is a city in Shizuoka Prefecture on the Pacific coast of central Honshu, located at the foot of Mount Fuji. It has a humid subtropical climate (Cfa) with year-round precipitation and hot, humid summers.',
    controls: {
      latitude: {
        text: 'At approximately 35°N, Fuji lies at a mid-latitude position where seasonal contrasts in solar angle and day length produce distinct summer and winter seasons.',
        citeIds: ['fuji-wikipedia'],
      },
      'land-sea': {
        text: 'Situated on the Pacific coast, Fuji benefits from maritime influence that moderates temperature extremes and supplies year-round moisture from the Pacific Ocean.',
        citeIds: ['fuji-wikipedia'],
      },
      'ocean-currents': {
        text: 'The Kuroshio Current flows northeastward along the Pacific coast of Japan, warming coastal waters and delivering moisture that contributes to high annual precipitation at Fuji.',
        citeIds: ['currents-of-japan'],
      },
      winds: {
        text: 'The East Asian monsoon drives warm, moist southerly winds inland in summer, bringing heavy rainfall. In winter, cold, dry northwesterly winds from the Siberian interior dominate.',
        citeIds: ['fuji-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High drives cold, dry northwesterly monsoon winds in winter. The North Pacific High (Ogasawara High) expands northwestward in summer, steering warm, moist air into Japan. The Aleutian Low contributes to winter storm activity in the surrounding Pacific region.',
        citeIds: ['siberian-high', 'north-pacific-high', 'aleutian-low'],
      },
      topography: {
        text: 'Mount Fuji (3,776 m) is the dominant topographic feature, producing significant orographic lift and amplifying precipitation on its windward slopes.',
        citeIds: ['fuji-wikipedia'],
      },
      altitude: {
        text: 'The city occupies low-elevation coastal terrain (roughly 5–50 m above sea level), so altitude has minimal direct effect on its temperature regime.',
        citeIds: ['fuji-wikipedia'],
      },
    },
  },
  1: {
    name: 'Matsue',
    population: 196748,
    populationCiteId: 'matsue-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Matsue_City_center_seen_from_Mt.Shinyama.jpg/960px-Matsue_City_center_seen_from_Mt.Shinyama.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Matsue_City_center_seen_from_Mt.Shinyama.jpg',
    },
    citationId: 'matsue-wikipedia',
    blurb: 'Matsue is the capital of Shimane Prefecture, situated on the coast of the Sea of Japan at the western end of Honshu. It is known for its historic castle and experiences some of the heaviest winter snowfall in Japan, fed by cold air masses crossing the Sea of Japan.',
    controls: {
      latitude: {
        text: 'At approximately 35.5°N, Matsue experiences mid-latitude insolation with marked seasonal differences in solar angle — warm summers and cold winters.',
        citeIds: ['matsue-wikipedia'],
      },
      'land-sea': {
        text: "Matsue's position on the Sea of Japan coast means cold Siberian air masses pick up substantial moisture while crossing the sea in winter, releasing it as heavy snow on the coastal plain.",
        citeIds: ['matsue-wikipedia'],
      },
      'ocean-currents': {
        text: 'The Tsushima Warm Current, a branch of the Kuroshio, flows through the Korea Strait and into the Sea of Japan, keeping sea-surface temperatures elevated and maximizing moisture uptake by winter air masses that then deposit heavy snowfall on the coast.',
        citeIds: ['tsushima-current', 'currents-of-japan'],
      },
      winds: {
        text: 'Prevailing winter winds blow from the northwest off the Asian continent, crossing the Sea of Japan and arriving laden with moisture. Summer winds shift to the south with the East Asian monsoon.',
        citeIds: ['matsue-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High dominates in winter, driving cold, dry air masses that pick up moisture over the Sea of Japan and deposit it as heavy snow on the coast. The North Pacific High in summer reduces precipitation relative to Japan\'s Pacific coast. The Aleutian Low modulates winter storm tracks in the North Pacific region.',
        citeIds: ['siberian-high', 'north-pacific-high', 'aleutian-low'],
      },
      topography: {
        text: 'The Chugoku Mountains to the south separate the Sea of Japan coast from the Pacific side, preventing Pacific maritime air from reaching Matsue and reinforcing the Sea of Japan influence.',
        citeIds: ['matsue-wikipedia'],
      },
      altitude: {
        text: 'Matsue sits near sea level (approximately 5–15 m), so altitude plays little role in its climate.',
        citeIds: ['matsue-wikipedia'],
      },
    },
  },
  2: {
    name: 'Sangju',
    population: 101237,
    populationCiteId: 'sangju-gov',
    photo: 'Screenshot_20260509_134052.png',
    photoCredit: {
      text: '비봉산 전망대 by 데미아나',
      url: null,
    },
    citationId: 'sangju-wikipedia',
    blurb: 'Sangju is a city in North Gyeongsang Province in the interior of the Korean Peninsula, historically known for agriculture and silk production.',
    controls: {
      latitude: {
        text: 'At approximately 36.4°N, Sangju receives mid-latitude insolation with clear seasonal contrasts between warm summers and cold winters.',
        citeIds: ['sangju-wikipedia'],
      },
      'land-sea': {
        text: 'Sangju lies in the interior of the Korean Peninsula, separated from both the Yellow Sea and the East Sea by mountain ranges, producing a more continental climate than coastal Korean cities.',
        citeIds: ['sangju-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — Sangju is located in the interior of the Korean Peninsula, beyond the direct influence of any ocean current.',
        citeIds: [],
      },
      winds: {
        text: 'Cold, dry northwesterly winds from the Siberian High dominate in winter. The East Asian monsoon brings warm, moist air from the south in summer, delivering the majority of annual rainfall.',
        citeIds: ['sangju-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High is the dominant winter pressure system, producing cold, dry continental conditions. The North Pacific subtropical high expands in summer, driving the East Asian monsoon and delivering most annual precipitation.',
        citeIds: ['siberian-high', 'north-pacific-high'],
      },
      topography: {
        text: 'The Taebaek Mountains to the east and the Sobaek Mountains to the south create a partial rain shadow, contributing to drier and more continental conditions relative to the coasts.',
        citeIds: ['sangju-wikipedia'],
      },
      altitude: {
        text: 'Sangju is situated at approximately 130 m elevation on an inland basin, slightly reducing temperatures compared to lower-elevation coastal cities at the same latitude.',
        citeIds: ['sangju-wikipedia'],
      },
    },
  },
  3: {
    name: 'Rongcheng, Shandong',
    population: 738600,
    populationCiteId: 'rongcheng-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Rongcheng%2C_Weihai.jpg/960px-Rongcheng%2C_Weihai.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Rongcheng,_Weihai.jpg',
    },
    citationId: 'rongcheng-wikipedia',
    blurb: 'Rongcheng is a county-level city at the eastern tip of the Shandong Peninsula, surrounded on three sides by the Yellow Sea and Bohai Sea. Its peninsula location gives it a relatively temperate climate moderated by the surrounding sea.',
    controls: {
      latitude: {
        text: 'At approximately 37°N, Rongcheng receives mid-latitude insolation. Its latitude places it at the warmer end of the transect\'s eastern stations.',
        citeIds: ['rongcheng-wikipedia'],
      },
      'land-sea': {
        text: 'The Shandong Peninsula location means Rongcheng is surrounded by sea on three sides, which moderates temperature extremes and reduces the severity of both summer heat and winter cold compared to the interior.',
        citeIds: ['rongcheng-wikipedia'],
      },
      'ocean-currents': {
        text: 'The Yellow Sea and Bohai Sea provide some seasonal thermal moderation to the Shandong Peninsula coast, though this coast lacks a strong persistent warm current comparable to the Kuroshio off Japan.',
        citeIds: ['rongcheng-wikipedia'],
      },
      winds: {
        text: 'The East Asian monsoon brings warm, moisture-laden southeasterly winds in summer, producing most of the annual rainfall. In winter, cold northwesterly monsoon winds arrive from the continental interior.',
        citeIds: ['rongcheng-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High dominates in winter, producing cold, dry northwesterly winds. The North Pacific subtropical high drives the East Asian summer monsoon, delivering most of the annual precipitation.',
        citeIds: ['siberian-high', 'north-pacific-high'],
      },
      topography: {
        text: 'The Shandong Peninsula is relatively flat, so topographic effects on climate are minor compared to the dominant maritime influence.',
        citeIds: ['rongcheng-wikipedia'],
      },
      altitude: {
        text: 'Rongcheng lies near sea level on the peninsula, so altitude has negligible impact on its temperature regime.',
        citeIds: ['rongcheng-wikipedia'],
      },
    },
  },
  4: {
    name: 'Yangxin County',
    population: 901971,
    populationCiteId: 'yangxin-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/%E9%BE%99%E6%B8%AF%E5%85%A8%E8%B2%8C_-_panoramio.jpg/960px-%E9%BE%99%E6%B8%AF%E5%85%A8%E8%B2%8C_-_panoramio.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:%E9%BE%99%E6%B8%AF%E5%85%A8%E8%B2%8C_-_panoramio.jpg',
    },
    citationId: 'yangxin-wikipedia',
    blurb: 'This transect station falls within the North China Plain in Hebei Province, a region of flat agricultural lowlands experiencing a temperate continental monsoon climate with cold, dry winters and warm, wet summers.',
    controls: {
      latitude: {
        text: 'At approximately 37.6°N, this station receives mid-latitude insolation with significant seasonal variation — cold winters and warm summers characterize the continental interior.',
        citeIds: ['yangxin-wikipedia'],
      },
      'land-sea': {
        text: 'Positioned inland from the Bohai coast, this station experiences a noticeably more continental climate than the Shandong Peninsula stations, with reduced maritime moderation and larger temperature swings.',
        citeIds: ['yangxin-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — this station is located inland on the North China Plain, beyond the direct influence of any ocean current.',
        citeIds: [],
      },
      winds: {
        text: 'The East Asian monsoon delivers warm, moist southeasterly winds and most annual rainfall in summer. Cold, dry northwesterly winds from the Siberian High dominate in winter, producing very cold and dry conditions.',
        citeIds: ['yangxin-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High is the dominant winter pressure system, driving cold dry air southward across the region. In summer it weakens and the North Pacific High steers monsoon moisture into the area.',
        citeIds: ['siberian-high', 'north-pacific-high'],
      },
      topography: {
        text: 'The North China Plain is exceptionally flat, so terrain has minimal direct effect on climate. The lack of topographic barriers allows cold winter winds to penetrate freely from the north.',
        citeIds: ['yangxin-wikipedia'],
      },
      altitude: {
        text: 'The station sits on the North China Plain at low elevation (approximately 10–50 m), so altitude has negligible effect on temperatures.',
        citeIds: ['yangxin-wikipedia'],
      },
    },
  },
  5: {
    name: 'Loufan County',
    population: 91208,
    populationCiteId: 'loufan-wikipedia',
    photo: 'https://ak-d.tripcdn.com/images/10040u000000j3ut8F300.jpg',
    photoCredit: {
      text: 'Trip.com — Yunding Mountain',
      url: 'https://www.trip.com/travel-guide/attraction/loufan/yunding-mountain-55704159?poiType=3&locale=en-US&curr=USD',
    },
    citationId: 'loufan-wikipedia',
    blurb: 'Loufan County is a mountainous county in the Lüliang Mountains of Shanxi Province, situated on the Loess Plateau. Its relatively high elevation produces a cool semi-arid climate with cold winters and summer-concentrated rainfall.',
    controls: {
      latitude: {
        text: 'At approximately 38°N, Loufan receives mid-latitude insolation. The seasonal cycle is amplified by the inland continental location.',
        citeIds: ['loufan-wikipedia'],
      },
      'land-sea': {
        text: 'Loufan is deep in the continental interior of northern China, far from any ocean, producing low annual precipitation and large temperature swings between summer and winter.',
        citeIds: ['loufan-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — Loufan is located in the continental interior of Shanxi Province, far beyond the influence of any ocean current.',
        citeIds: [],
      },
      winds: {
        text: 'Dry westerly and northwesterly winds dominate in winter, bringing cold, arid air from the Mongolian Plateau. Summer monsoon winds reach Loufan weakened, delivering limited but concentrated rainfall.',
        citeIds: ['loufan-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High dominates in winter, bringing cold, dry air from the Mongolian Plateau. Summer sees some weakening of the continental high and limited monsoon penetration, but Pacific pressure systems have minimal direct influence this far inland.',
        citeIds: ['siberian-high'],
      },
      topography: {
        text: 'The Lüliang Mountains surround Loufan, creating a basin on the Loess Plateau. The mountains intercept what little moisture arrives from the east, contributing to the semi-arid climate.',
        citeIds: ['loufan-wikipedia'],
      },
      altitude: {
        text: 'Loufan sits at approximately 1,100–1,200 m above sea level, which substantially lowers mean temperatures relative to lower-elevation locations at the same latitude.',
        citeIds: ['loufan-wikipedia'],
      },
    },
  },
  6: {
    name: 'Shizuishan',
    population: 730400,
    populationCiteId: 'shizuishan-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/%E6%B2%99%E6%B9%96-2008_-_panoramio.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:%E6%B2%99%E6%B9%96-2008_-_panoramio.jpg',
    },
    citationId: 'shizuishan-wikipedia',
    blurb: 'Shizuishan is a prefecture-level city in the Ningxia Hui Autonomous Region, situated along the Yellow River at the edge of the Tengger Desert. It has a temperate arid continental climate with scarce precipitation and extreme seasonal temperatures.',
    controls: {
      latitude: {
        text: 'At approximately 38.8°N, Shizuishan receives mid-latitude insolation with a pronounced annual temperature cycle driven by its continental interior position.',
        citeIds: ['shizuishan-wikipedia'],
      },
      'land-sea': {
        text: 'Located more than 1,000 km from the nearest ocean coast, Shizuishan experiences a strongly continental climate with minimal maritime moderation — very cold winters and hot summers.',
        citeIds: ['shizuishan-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — Shizuishan is located in the continental interior of Ningxia, far beyond the influence of any ocean current.',
        citeIds: [],
      },
      winds: {
        text: 'Dry northwesterly winds from the Gobi Desert and Mongolian Plateau dominate year-round. The summer East Asian monsoon barely reaches this far west, resulting in very low annual precipitation.',
        citeIds: ['shizuishan-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High is the dominant pressure system in winter, producing very cold, dry conditions. Pacific pressure systems have minimal influence at this distance inland; summer is controlled by a continental thermal regime.',
        citeIds: ['siberian-high'],
      },
      topography: {
        text: 'The Helan Mountains to the west form a barrier that reduces westward moisture transport. The city sits in the upper Yellow River valley between the Ordos Plateau to the east and the Helan Mountains to the west.',
        citeIds: ['shizuishan-wikipedia'],
      },
      altitude: {
        text: 'Shizuishan lies at approximately 1,100 m above sea level in the Yellow River valley, which contributes to cooler temperatures than sea-level locations at the same latitude.',
        citeIds: ['shizuishan-wikipedia'],
      },
    },
  },
  7: {
    name: 'Zhangye',
    population: 1199515,
    populationCiteId: 'zhangye-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sunset_glow_in_Zhangye_Arial.jpg/960px-Sunset_glow_in_Zhangye_Arial.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Sunset_glow_in_Zhangye_Arial.jpg',
    },
    citationId: 'zhangye-wikipedia',
    blurb: 'Zhangye is a prefecture-level city in the Hexi Corridor of Gansu Province, lying between the Qilian Mountains to the south and the Beishan ranges to the north. It has an arid continental climate with cold winters, warm summers, and very low annual precipitation.',
    controls: {
      latitude: {
        text: 'At approximately 38.9°N, Zhangye receives mid-latitude insolation. Its interior position means the seasonal temperature contrast is much larger than its latitude alone would suggest.',
        citeIds: ['zhangye-wikipedia'],
      },
      'land-sea': {
        text: 'The Hexi Corridor is one of the most isolated inland locations in Asia, situated over 2,000 km from the Pacific Ocean. The result is an extremely continental climate with minimal precipitation and very large diurnal and annual temperature ranges.',
        citeIds: ['zhangye-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — Zhangye is located in the Hexi Corridor of Gansu, thousands of kilometres from any coast. No ocean current has any influence on its climate.',
        citeIds: [],
      },
      winds: {
        text: 'The Hexi Corridor acts as a wind channel, funneling westerly and northwesterly winds. The East Asian summer monsoon does not penetrate this far into the interior, so precipitation is sparse year-round.',
        citeIds: ['zhangye-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High controls winter climate, driving frigid, dry conditions through the Hexi Corridor. Summers see some thermal low development over the corridor, but the monsoon circulation does not penetrate this far inland regardless of Pacific pressure patterns.',
        citeIds: ['siberian-high'],
      },
      topography: {
        text: 'The Qilian Mountains (reaching 5,000+ m) to the south form a massive barrier that blocks moisture and creates a pronounced rain shadow over the Hexi Corridor.',
        citeIds: ['zhangye-wikipedia'],
      },
      altitude: {
        text: 'Zhangye city is situated at approximately 1,483 m above sea level, significantly lowering mean temperatures compared to what its latitude alone would predict.',
        citeIds: ['zhangye-wikipedia'],
      },
    },
  },
  8: {
    name: 'Dunhuang',
    population: 185231,
    populationCiteId: 'dunhuang-wikipedia',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Jiucenglou_of_Mogao_Caves.jpg/960px-Jiucenglou_of_Mogao_Caves.jpg',
    photoCredit: {
      text: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Jiucenglou_of_Mogao_Caves.jpg',
    },
    citationId: 'dunhuang-wikipedia',
    blurb: 'Dunhuang is an oasis city in Gansu Province between the Gobi and Taklamakan deserts, historically significant as a Silk Road stop and home to the Mogao Caves UNESCO World Heritage Site. It receives less than 40 mm of precipitation annually and experiences extreme temperature swings.',
    controls: {
      latitude: {
        text: 'At approximately 40°N, Dunhuang receives mid-latitude insolation with strong seasonal contrasts — long, hot summer days and cold, short winter days.',
        citeIds: ['dunhuang-wikipedia'],
      },
      'land-sea': {
        text: 'Dunhuang is among the most isolated locations from any ocean on Earth, situated in a desert basin ringed by high mountains. No maritime influence reaches the city, producing hyperarid conditions.',
        citeIds: ['dunhuang-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — Dunhuang is located at the edge of the Gobi and Taklamakan deserts, far beyond the reach of any ocean current.',
        citeIds: [],
      },
      winds: {
        text: 'Strong, dry westerly and northwesterly winds dominate throughout the year. The summer monsoon cannot penetrate the Qilian and Altyn-Tagh mountain barriers, leaving the city beyond the reach of monsoon moisture.',
        citeIds: ['dunhuang-wikipedia'],
      },
      pressure: {
        text: 'The Siberian High dominates in winter, producing very cold, dry conditions. Summers are hot with a local thermal low over the desert basin, but surrounding mountain barriers prevent monsoon moisture from reaching the region regardless of synoptic pressure patterns.',
        citeIds: ['siberian-high'],
      },
      topography: {
        text: 'Dunhuang lies in a basin between the Qilian Mountains to the south and the Beishan to the north. Both ranges block moisture from reaching the city, reinforcing the hyperarid desert environment.',
        citeIds: ['dunhuang-wikipedia'],
      },
      altitude: {
        text: 'The city is situated at approximately 1,138 m above sea level. This elevation, combined with the desert environment, produces large diurnal temperature swings and very cold winters.',
        citeIds: ['dunhuang-wikipedia'],
      },
    },
  },
  9: {
    name: 'Lopnur',
    population: 4300,
    populationCiteId: 'lopnur-baidu',
    photo: 'https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/51000/51039/lopnur_ali_2011137.jpg?w=720&h=720&fit=crop&crop=faces%2Cfocalpoint',
    photoCredit: {
      text: 'NASA Earth Observatory',
      url: 'https://science.nasa.gov/earth/earth-observatory/lop-nur-xinjiang-china-51039/',
    },
    citationId: 'lopnur-wikipedia',
    blurb: 'Lop Nur is a dried salt lake bed in the Tarim Basin of Xinjiang, one of the most remote and arid locations in Asia. The nearest settlement is Luobupo Town with a population of approximately 4,300.',
    controls: {
      latitude: {
        text: 'At approximately 40.5°N, the Lop Nur area receives mid-latitude insolation. Summers are intensely hot due to the desert surface and trapped heat in the enclosed basin; winters are frigid.',
        citeIds: ['lopnur-wikipedia'],
      },
      'land-sea': {
        text: 'The Tarim Basin is perhaps the most landlocked major basin on Earth, enclosed by the Kunlun Mountains, Tian Shan, and Pamir Plateau. No oceanic moisture reaches this area, producing hyperarid desert conditions.',
        citeIds: ['lopnur-wikipedia'],
      },
      'ocean-currents': {
        text: 'Not applicable — Lop Nur is located in the heart of the Tarim Basin in Xinjiang, one of the most remote inland locations in the world. No ocean current has any influence on its climate.',
        citeIds: [],
      },
      winds: {
        text: 'Dry westerly winds dominate the basin. The enclosing mountain ranges prevent moisture-bearing air masses from entering from any direction, so precipitation is negligible year-round.',
        citeIds: ['lopnur-wikipedia'],
      },
      pressure: {
        text: 'The Tarim Basin is dominated by the continental high-pressure regime derived from the Siberian High in winter. No maritime pressure systems influence this location; the enclosing mountains isolate the basin from any external moisture-bearing circulation.',
        citeIds: ['siberian-high'],
      },
      topography: {
        text: 'The Tarim Basin is completely enclosed by the Kunlun Mountains (south, up to 7,000+ m), the Tian Shan (north), and the Pamir Plateau (west). This total enclosure creates the most extreme continental rain shadow in Asia.',
        citeIds: ['lopnur-wikipedia'],
      },
      altitude: {
        text: 'The Lop Nur basin floor lies at approximately 780 m above sea level. The enclosed basin geometry traps heat in summer and cold in winter, producing extreme temperature ranges despite the relatively modest elevation.',
        citeIds: ['lopnur-wikipedia', 'nasa-lopnur'],
      },
    },
  },
}
