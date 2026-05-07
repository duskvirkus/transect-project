// Path to the bundled Koppen PNG in public/ (generated from Beck et al. 2018 GeoTIFF via GDAL)
// Fallback: swap this for an XYZ tile URL and change MapLibre source type to 'raster' in KoppenMap.jsx
export const KOPPEN_IMAGE_URL = import.meta.env.BASE_URL + 'koppen.png'

// Beck et al. (2018) Koppen-Geiger classification legend
// Colors match the published GeoTIFF color map (class index 1–30)
export const KOPPEN_CLASSES = [
  // Tropical
  { code: 'Af',  name: 'Tropical rainforest',                       color: '#0000FF' },
  { code: 'Am',  name: 'Tropical monsoon',                          color: '#0078FF' },
  { code: 'Aw',  name: 'Tropical savanna',                          color: '#46AAFA' },
  // Arid
  { code: 'BWh', name: 'Hot desert',                                color: '#FF0000' },
  { code: 'BWk', name: 'Cold desert',                               color: '#FF9696' },
  { code: 'BSh', name: 'Hot steppe',                                color: '#F5A500' },
  { code: 'BSk', name: 'Cold steppe',                               color: '#FFDC64' },
  // Temperate
  { code: 'Csa', name: 'Mediterranean, hot summer',                 color: '#FFFF00' },
  { code: 'Csb', name: 'Mediterranean, warm summer',                color: '#C8C800' },
  { code: 'Csc', name: 'Mediterranean, cold summer',                color: '#969600' },
  { code: 'Cwa', name: 'Humid subtropical, dry winter',             color: '#96FF96' },
  { code: 'Cwb', name: 'Subtropical highland, dry winter',          color: '#64C864' },
  { code: 'Cwc', name: 'Subtropical highland, dry & cold winter',   color: '#329632' },
  { code: 'Cfa', name: 'Humid subtropical',                         color: '#C8FF50' },
  { code: 'Cfb', name: 'Oceanic',                                   color: '#64FF50' },
  { code: 'Cfc', name: 'Subpolar oceanic',                          color: '#32C800' },
  // Continental
  { code: 'Dsa', name: 'Continental, hot & dry summer',             color: '#FF00FF' },
  { code: 'Dsb', name: 'Continental, warm & dry summer',            color: '#C800C8' },
  { code: 'Dsc', name: 'Continental subarctic, dry summer',         color: '#963296' },
  { code: 'Dsd', name: 'Continental subarctic, very dry summer',    color: '#966496' },
  { code: 'Dwa', name: 'Humid continental, hot & dry winter',       color: '#AAAFFF' },
  { code: 'Dwb', name: 'Humid continental, warm & dry winter',      color: '#5A78DC' },
  { code: 'Dwc', name: 'Subarctic, dry winter',                     color: '#4B50B4' },
  { code: 'Dwd', name: 'Subarctic, very cold & dry winter',         color: '#320087' },
  { code: 'Dfa', name: 'Humid continental, hot summer',             color: '#00FFFF' },
  { code: 'Dfb', name: 'Humid continental, warm summer',            color: '#37C8FF' },
  { code: 'Dfc', name: 'Subarctic',                                 color: '#007D7D' },
  { code: 'Dfd', name: 'Subarctic, very cold winter',               color: '#00465F' },
  // Polar
  { code: 'ET',  name: 'Tundra',                                    color: '#B2B2B2' },
  { code: 'EF',  name: 'Ice cap',                                   color: '#666666' },
]
