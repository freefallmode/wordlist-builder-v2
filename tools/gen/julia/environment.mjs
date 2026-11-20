// Environment branch, step 2 of 3: words for the seven new themes and for "recyclables". Format: tools/apply-words.mjs.
// Run in order: node tools/gen/julia/environment-themes.mjs; node tools/apply-words.mjs tools/gen/julia/environment.mjs; node tools/gen/julia/environment-fixes.mjs
// Ratings: familiarity (1 every child knows it ... 5 few people), then how typical of THIS theme (1 the first words anyone names ... 5 peripheral).
// Most words already exist in the library (same text and meaning label) and are only linked; their own ratings and flags stay.
// Words that move here from the old themes are unlinked there by environment-fixes.mjs.
// Left out: water vapor ("water vapour" is already a form of "vapor"), oil well and oil field (they give the name "oil industry" away; "oil rig" is shown as "rig").

export const THEMES = {
  pollution_types: { pop: 3, ident: 2 },
  oil_industry: { pop: 3, ident: 3 },
  protected_areas: { pop: 3, ident: 3 },
  greenhouse_gases: { pop: 3, ident: 2 },
  eco_habits: { pop: 2, ident: 2 },
  eco_swaps: { pop: 3, ident: 3 },
  eco_home: { pop: 3, ident: 3 },
  recycling_words: { note: 'things that go in the recycling bin: newspaper, cardboard, plastic bottle, glass jar, cans, cartons' },
};

export const DATA = {
  // A kinds theme: full terms, shown short there ("air", "noise" ...) by environment-fixes.mjs.
  pollution_types: [
    ['air pollution', 1, 1], ['water pollution', 1, 1], ['plastic pollution', 1, 1], ['noise pollution', 2, 1], ['light pollution', 2, 2],
    ['soil pollution', 2, 2], ['land pollution', 2, 2], ['thermal pollution', 4, 3], ['visual pollution', 4, 4],
  ],
  oil_industry: [
    ['oil rig', 1, 1], ['drilling', 2, 1], ['refinery', 2, 1], ['pipeline', 2, 2], ['fracking', 3, 2], ['derrick', 3, 2, { g: 'oil well' }],
    ['tanker', 2, 2, { g: 'ship' }], ['barrel', 1, 3, { g: 'container' }], ['OPEC', 3, 3], ['pump jack', 4, 3], ['wellhead', 5, 3],
    ['gusher', 4, 3, { g: 'oil well' }], ['roughneck', 4, 4, { g: 'oil worker' }],
  ],
  protected_areas: [
    ['national park', 1, 1], ['nature reserve', 1, 1], ['wildlife reserve', 2, 1], ['sanctuary', 2, 2, { g: 'refuge' }], ['wildlife refuge', 3, 2, { reg: ['US'] }],
    ['marine park', 3, 2], ['marine reserve', 3, 2], ['game reserve', 2, 2], ['national forest', 2, 3], ['biosphere reserve', 5, 3],
    ['Ramsar site', 5, 4], ['Natura 2000', 4, 4],
  ],
  greenhouse_gases: [
    ['carbon dioxide', 2, 1], ['methane', 3, 1], ['nitrous oxide', 3, 2], ['ozone', 2, 3], ['CFC', 3, 3, { type: 'acronym' }],
    ['sulfur hexafluoride', 5, 4, { al: [['sulphur hexafluoride', 'spelling', 5, 5, ['UK']]] }],
  ],
  // Simon's theme, now "recyclables": the six things it keeps (newspaper, cardboard, plastic bottle, aluminum can, glass jar, scrap metal) plus these.
  recycling_words: [
    ['glass bottle', 1, 1], ['tin can', 1, 1], ['milk carton', 1, 1], ['soda can', 2, 2], ['juice carton', 2, 2], ['egg carton', 2, 2],
    ['cereal box', 2, 2], ['pizza box', 2, 2], ['magazine', 1, 2, { g: 'periodical' }], ['junk mail', 2, 2], ['paper bag', 1, 3],
    ['envelope', 1, 3, { g: 'mail' }],
  ],
  eco_habits: [
    ['recycling', 1, 1, { pos: 'noun' }], ['composting', 2, 1], ['carpooling', 3, 1], ['cycling', 1, 2], ['walking', 1, 2], ['tree planting', 2, 2],
    ['upcycling', 4, 2], ['line drying', 3, 2], ['thrifting', 3, 2], ['mending', 2, 3], ['clothes swap', 3, 3],
  ],
  eco_swaps: [
    ['reusable bag', 1, 1], ['tote bag', 1, 2], ['reusable cup', 2, 1], ['travel mug', 2, 2], ['metal straw', 2, 1], ['bamboo toothbrush', 3, 1],
    ['beeswax wrap', 4, 2], ['shampoo bar', 3, 2], ['LED bulb', 2, 2], ['cloth napkin', 2, 3], ['cloth diaper', 2, 3, { al: [['cloth nappy', 'regional', 2, 3, ['UK']]] }],
    ['rechargeable battery', 2, 2], ['safety razor', 3, 3], ['handkerchief', 1, 3], ['bar soap', 2, 3],
  ],
  eco_home: [
    ['solar panel', 1, 1], ['insulation', 3, 1], ['heat pump', 3, 1], ['smart meter', 3, 2], ['rain barrel', 2, 2], ['compost bin', 2, 2],
    ['double-pane windows', 2, 2], ['draft stopper', 4, 2], ['solar water heater', 3, 2], ['smart thermostat', 3, 3], ['green roof', 3, 3],
    ['clothesline', 2, 3, { g: 'laundry' }], ['wormery', 5, 3],
  ],
};

// Words that stand for one another in the theme: a level shows only one of each group.
export const GROUPS = [
  ['pollution_types', 'soil pollution', 'land pollution'],
  ['protected_areas', 'nature reserve', 'wildlife reserve', 'sanctuary|refuge', 'wildlife refuge'],
  ['protected_areas', 'marine park', 'marine reserve'],
  ['recycling_words', 'aluminum can', 'soda can'],
  ['eco_swaps', 'reusable bag', 'tote bag'],
  ['eco_swaps', 'reusable cup', 'travel mug'],
];
