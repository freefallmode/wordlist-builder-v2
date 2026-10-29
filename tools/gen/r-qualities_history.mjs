// Repair batch: words skipped by the old clash rule (qualities, history_myth).
const D = { g: 'dynasty', type: 'proper' };
export const FIXES = [
  { gloss: ['Adobe', 'tech_companies', 'company'] },
  { split: ['Adobe', 'building_materials', 'brick', { type: 'common' }] },
  { split: ['Adobe', 'building_stones', 'brick2', { type: 'common' }] }, { split: ['Adobe', 'natural_materials', 'brick3', { type: 'common' }] }, { split: ['Adobe', 'words_from_spanish', 'brick4', { type: 'common' }] },
  { merge: ['Adobe', ['building_materials', 'building_stones', 'natural_materials', 'words_from_spanish'], 'brick'] },
  { gloss: ['chord', 'music_words', 'music'] },
  { gloss: ['pentagon', 'us_government', 'building'] },
  { gloss: ['trellis', 'garden', 'garden'] },
  { gloss: ['scallop', 'mollusks', 'shellfish'] },
  { gloss: ['hose', 'garden', 'pipe'] },
  { split: ['junket', 'puddings', 'dessert'] },
  { gloss: ['junket', 'journeys', 'trip'] },
  { gloss: ['Qin', 'dynasties', 'dynasty'] },
  { gloss: ['Sui', 'dynasties', 'dynasty'] },
];
export const ALIASES = [
  ['chinese_dynasties', 'Song', 'dynasty', [['Song dynasty', 'synonym', 3, 3]]],
];
export const THEMES = { chinese_dynasties: { d: 3 } };
export const DATA = {
  shades_of_blue: [['cadet blue', 3, 3, { type: 'common' }]],
  shades_of_brown: [['adobe', 3, 4, { g: 'color', type: 'common' }], ['sorrel', 3, 4, { g: 'horse color' }]],
  '2d_shapes': [['pentagon', 1, 1, { g: 'shape', type: 'common' }]],
  '3d_shapes': [['dome', 1, 2, { g: 'shape' }]],
  line_types: [['chord', 2, 4, { g: 'geometry' }]],
  patterns: [['trellis', 3, 4, { g: 'pattern' }], ['scallop', 3, 4, { g: 'pattern' }], ['lattice', 3, 3]],
  medieval_clothing: [
    ['hose', 2, 2, { g: 'legwear' }], ['chausses', 5, 4], ['leggings', 1, 3], ['stockings', 1, 3],
  ],
  medieval_food: [['junket', 4, 4, { g: 'dessert' }]],
  chinese_dynasties: [
    ['Xia', 3, 4, D], ['Shang', 3, 3, D], ['Zhou', 3, 3, D], ['Qin', 3, 3, D], ['Han', 2, 2, D], ['Sui', 4, 4, D],
    ['Tang', 2, 2, D], ['Song', 3, 3, D], ['Yuan', 3, 3, D], ['Ming', 1, 1, D], ['Qing', 2, 2, D],
    ['Jin', 4, 4, D], ['Liao', 5, 5, D], ['Three Kingdoms', 3, 3, { type: 'proper' }],
  ],
};
