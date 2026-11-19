// Earth science branch, step 2 of 3: words for the three new themes and a few links elsewhere. Format: tools/apply-words.mjs.
// Run in order: node tools/gen/julia/earth-science-themes.mjs; node tools/apply-words.mjs tools/gen/julia/earth-science.mjs; node tools/gen/julia/earth-science-fixes.mjs
// Ratings: familiarity (1 every child knows it ... 5 few people), then how typical of THIS theme (1 the first words anyone names ... 5 peripheral).
// Most words already exist in the library (same text and meaning label) and are only linked; their own ratings and flags stay.
// Words that move here from the old themes are unlinked there by earth-science-fixes.mjs.

export const FIXES = [
  // "conduit" (volcano) is a new meaning: the existing one gets a label first.
  { gloss: ['conduit', 'electrical_fittings', 'electrical'] },
  // "deposition (erosion)" was also linked in courtroom words: that link moves to its own entry.
  { split: ['deposition', 'courtroom_words', 'court', { type: 'common', pos: 'noun', fam: 3 }] },
];

export const THEMES = {
  volcano_parts: { pop: 3, ident: 2 },
  geothermal_wonders: { pop: 4, ident: 3 },
  soil_layers: { pop: 4, ident: 3 },
  soil_words: { note: 'kinds of soil: clay, loam, sandy, silt, chalky, peat, loess, marl, podzol, laterite' },
  geothermal_words: { note: 'natural features of hot ground: geyser, hot spring, mud pool, fumarole, hydrothermal vent, mineral spring' },
};

export const DATA = {
  volcano_parts: [
    ['crater', 2, 1], ['vent', 3, 1, { g: 'volcano' }], ['magma chamber', 3, 1], ['cone', 2, 2, { g: 'volcano' }], ['caldera', 3, 2], ['summit', 2, 2, { g: 'mountaintop' }],
    ['conduit', 4, 2, { g: 'volcano' }], ['fissure', 4, 3], ['flank', 4, 3, { g: 'volcano' }],
  ],
  geothermal_wonders: [
    ['Old Faithful', 2, 1, { g: 'geyser' }], ['Yellowstone', 2, 1], ['Blue Lagoon', 3, 1], ['Pamukkale', 4, 2], ['Cotton Castle', 4, 2], ['Geysir', 4, 2, { type: 'place' }],
    ['Rotorua', 4, 2], ['Strokkur', 5, 3, { g: 'geyser' }], ['Grand Prismatic Spring', 4, 2, { type: 'place' }], ['Wai-O-Tapu', 5, 3], ['Beppu', 5, 3],
  ],
  soil_layers: [
    ['topsoil', 2, 1], ['subsoil', 3, 1], ['bedrock', 3, 1], ['humus', 3, 2], ['soil horizon', 4, 2], ['leaf litter', 2, 2], ['hardpan', 5, 3], ['regolith', 5, 3],
  ],
  // The right "mantle" entry for this theme (it held the cloak).
  layers_of_the_earth: [['mantle', 2, 1, { g: 'earth layer' }]],
  // Garden words that were in "soil words"; compost, mulch and fertilizer are already in "garden".
  garden: [['potting mix', 2, 3], ['leaf mold', 3, 3], ['worm castings', 4, 4]],
  // A river landform from "erosion words".
  river_features: [['interlocking spurs', 5, 5]],
};

// Words that stand for one another in the theme: a level shows only one of each group.
export const GROUPS = [
  ['geothermal_wonders', 'Pamukkale', 'Cotton Castle'],
];
