// Top-up batch 6. Format: tools/apply-words.mjs.
const PL = (o = {}) => ({ type: 'place', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
export const THEMES = {};
export const DATA = {
  famous_gardens: [
    ['Villandry', 4, 4, PL()], ['Great Dixter', 4, 4, PL()], ['Majorelle Garden', 4, 5, PL()], ['Tresco Abbey', 5, 5, PL()],
    ['Ninfa', 5, 5, PL()], ['Mount Stewart', 5, 5, PL()],
  ],
  japanese_garden: [
    ['zen garden', 2, 1], ['shakkei', 5, 5], ['tobi-ishi', 5, 5], ['ishidoro', 5, 5], ['tsuboniwa', 5, 5], ['roji', 5, 5], ['chozubachi', 5, 5], ['kokedera', 5, 5],
  ],
  garden_helpers: [
    ['ladybug', 1, 1], ['centipede', 2, 4], ['ichneumon wasp', 4, 4], ["devil's coach horse", 5, 5], ['predatory mite', 5, 5],
  ],
  river_features: [
    ['thalweg', 5, 5], ['riffle', 4, 4], ['point bar', 5, 5], ['braided river', 4, 4], ['knickpoint', 5, 5], ['cut bank', 5, 5],
  ],
  desert_features: [
    ['yardang', 5, 5], ['ventifact', 5, 5], ['bajada', 5, 5], ['sabkha', 5, 5], ['nebkha', 5, 5], ['arroyo', 3, 4], ['pediment', 4, 5, { g: 'landform' }],
  ],
  ice_features: [
    ['sastrugi', 4, 4], ['bergschrund', 4, 4], ['penitentes', 5, 5], ['brinicle', 5, 5], ['frazil ice', 5, 5], ['esker', 5, 5], ['drumlin', 4, 5], ['cirque', 4, 4],
  ],
  cave_features: [
    ['cenote', 4, 4], ['ponor', 5, 5], ['moonmilk', 5, 5], ['cave bacon', 5, 5], ['anthodite', 5, 5], ['doline', 5, 5], ['karst', 3, 4],
  ],
  flat_landscapes: [
    ['altiplano', 4, 4], ['polder', 4, 4], ['karoo', 5, 5], ['cerrado', 5, 5], ['salt pan', 4, 4], ['tableland', 3, 3],
  ],
  bodies_of_water: [
    ['ria', 5, 5], ['lochan', 5, 5], ['turlough', 5, 5], ['kettle lake', 5, 4], ['inland sea', 3, 3], ['bight', 4, 5],
  ],
  rock_pool: [
    ['sea hare', 4, 4], ['snakelocks anemone', 5, 4], ['coralline algae', 5, 5], ['sea squirt', 3, 4], ['prawn', 1, 2],
  ],
  coastal_features: [
    ['skerry', 4, 4], ['wave-cut notch', 5, 5], ['storm beach', 5, 5], ['tidal flat', 3, 2],
  ],
  tides_and_currents: [
    ['Agulhas Current', 4, 4, P()], ['Benguela Current', 4, 4, P()], ['Labrador Current', 4, 4, P()], ['amphidromic point', 5, 5], ['Ekman spiral', 5, 5], ['Coriolis effect', 4, 4], ['tidal bulge', 4, 4],
  ],
  shipwreck_coast_words: [
    ['lee shore', 4, 4], ['flotsam', 3, 4], ['jetsam', 4, 4],
  ],
  wave_words: [
    ['fetch', 4, 5, { g: 'waves' }], ['capillary wave', 5, 5], ['standing wave', 4, 4], ['solitary wave', 5, 5], ['sneaker wave', 5, 4, { reg: ['US'] }],
  ],
  rain_words: [
    ['mizzle', 4, 4], ['smirr', 5, 5, { reg: ['UK'] }], ['dreich', 5, 5, { reg: ['UK'] }], ['pluvial', 5, 5], ['cloudburst', 3, 2], ['deluge', 3, 2, { g: 'rain' }], ['pitter-patter', 2, 3],
  ],
  wind_words: [
    ['zephyr', 3, 4], ['sirocco', 4, 4], ['mistral', 3, 4, { g: 'wind' }], ['chinook', 4, 4, { g: 'wind' }], ['williwaw', 5, 5], ['foehn', 5, 5], ['katabatic', 5, 5], ['harmattan', 5, 5],
  ],
  storms: [
    ['medicane', 5, 5], ['gustnado', 5, 5], ['landspout', 5, 5], ['thundersnow', 4, 4], ['willy-willy', 5, 5, { reg: ['AU'] }],
  ],
  cloud_types: [
    ['asperitas', 5, 5], ['undulatus', 5, 5], ['pyrocumulus', 5, 4], ['fallstreak hole', 5, 4], ['morning glory', 4, 5, { g: 'cloud' }], ['cumulus humilis', 5, 5], ['arcus', 5, 5],
  ],
  snow_and_ice: [
    ['sastrugi', 4, 4], ['depth hoar', 5, 5], ['diamond dust', 5, 4], ['corn snow', 5, 5], ['ice fog', 4, 4], ['wind slab', 5, 5],
  ],
  weather_instruments: [
    ['nephoscope', 5, 5], ['actinometer', 5, 5], ['pluviometer', 5, 4], ['dropsonde', 5, 5], ['transmissometer', 5, 5], ['anemograph', 5, 5], ['ombrometer', 5, 5], ['wind profiler', 5, 5], ['lysimeter', 5, 5],
  ],
  forecast_words: [
    ['isotherm', 4, 4], ['isohyet', 5, 5], ['lapse rate', 5, 5], ['nowcast', 5, 5], ['ensemble forecast', 5, 5], ['baroclinic', 5, 5], ['cut-off low', 5, 5], ['atmospheric river', 4, 4], ['wind barb', 5, 5],
  ],
  sky_phenomena: [
    ['Belt of Venus', 5, 5, P()], ['circumzenithal arc', 5, 5], ['Lowitz arc', 5, 5, P()], ['tangent arc', 5, 5], ['subsun', 5, 5], ['blue jet', 5, 5], ['anticrepuscular rays', 5, 5], ["Bishop's ring", 5, 5, P()],
  ],
  hot_weather_words: [
    ['estival', 5, 5], ['canicular', 5, 5], ['scorchio', 4, 4, { reg: ['UK'] }], ['heat stress', 3, 3], ['phew what a scorcher', 2, 2, { type: 'phrase' }],
  ],
  signs_of_spring: [
    ['vernal equinox', 3, 3], ['lesser celandine', 4, 5], ['coltsfoot', 5, 5], ['chiffchaff', 5, 5], ['wood anemone', 4, 4], ['brimstone', 4, 5, { g: 'butterfly' }], ['Ostara', 5, 5, P()],
  ],
  signs_of_summer: [
    ['Litha', 5, 5, P()], ['glow-worms', 4, 4], ['elderflower', 3, 4], ['mayfly', 3, 4], ['heat lightning', 4, 4], ['strawberry moon', 4, 5],
  ],
};
export const FIXES = [
  { gloss: ['pediment', 'architecture', 'building'] },
  { gloss: ['morning glory', 'vines_and_climbers', 'flower'] },
];
