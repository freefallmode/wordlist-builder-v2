// Repair batch round 2: seed words skipped by the old clash rule, added as their own labelled entries.
export const FIXES = [
  { gloss: ['Bayern', 'german_states', 'region'] },
  { gloss: ['EMU', 'birds', 'bird'] },
  { gloss: ['gi', 'army_words', 'soldier'] },
  { gloss: ['plow', 'snow_blank', 'snow'] },
  { gloss: ['Manx', 'cat_breeds', 'cat'] },
  { split: ['Manx', 'european_languages', 'language'] },
  { gloss: ['Sublime', 'hidden_colors', 'adjective'] },
  { gloss: ['Tool', 'blank_box', 'implement'] },
  { gloss: ['Garbage', 'bins_and_recycling', 'rubbish'] },
  { gloss: ['Placebo', 'medicine', 'medicine'] },
  { del: ['Maltese monk seal', 'seals_and_sea_lions'] },
  { del: ['tombstone', 'wild_west_town'] },
];

const lang = { type: 'proper' };
const band = { g: 'band', type: 'org' };
export const ALIASES = [
  ['european_soccer_clubs', 'Bayern Munich', 'soccer club', [['Bayern', 'synonym', 3, 3, [], { g: 'soccer club' }]]],
  ['farm_vehicles', 'plough', 'farm implement', [['plow', 'spelling', 2, 3, ['US'], { g: 'farm implement' }]]],
  ['cables_and_connectors', 'lightning cable', '', [['Lightning connector', 'synonym', 3, 3]]],
  ['celtic_languages', 'Irish', 'language', [['Irish Gaelic', 'synonym', 3, 3, [], lang], ['Gaeilge', 'synonym', 4, 4, [], lang]]],
  ['celtic_languages', 'Welsh', 'language', [['Cymraeg', 'synonym', 4, 4, [], lang]]],
  ['celtic_languages', 'Scots Gaelic', '', [['Scottish Gaelic', 'synonym', 3, 3, [], lang]]],
  ['children_s_authors', 'H. C. Andersen', '', [['Andersen', 'short form', 3, 4]]],
];
export const THEMES = { celtic_languages: { d: 4 } };

export const DATA = {
  sections_of_the_spine: [['sacrum', 3, 3]],
  circle_parts: [['Pi', 2, 3, { g: 'math' }], ['circle', 1, 3, { g: 'shape' }]],
  women_in_science: [['Hedy Lamarr', 3, 4, { type: 'person' }], ['Florence Nightingale', 2, 4, { type: 'person' }]],
  train_types: [['EMU', 4, 4, { g: 'train', type: 'acronym' }]],
  hats: [['montera', 4, 4]],
  karate_words: [['gi', 3, 2, { g: 'uniform' }]],
  judo_words: [['gi', 3, 2, { g: 'uniform' }]],
  sports_clothing: [['gi', 3, 3, { g: 'uniform' }]],
  wild_west: [['Tombstone', 2, 2, { g: 'wild west town', type: 'place' }]],
  wild_west_town: [['Tombstone', 2, 2, { g: 'wild west town', type: 'place' }]],
  european_soccer_clubs: [['Bayern Munich', 2, 2, { g: 'soccer club', type: 'org' }]],
  children_s_authors: [['H. C. Andersen', 3, 3, { type: 'person' }]],
  famous_bands: [['Sublime', 3, 4, band], ['Tool', 3, 4, band], ['Garbage', 3, 4, band], ['Placebo', 3, 4, band]],
  seals_and_sea_lions: [['monk seal', 3, 3]],
  celtic_languages: [
    ['Irish', 1, 1, { g: 'language', ...lang }], ['Welsh', 1, 1, { g: 'language', ...lang }], ['Scots Gaelic', 3, 2, lang],
    ['Gaelic', 2, 2, lang], ['Breton', 3, 2, { g: 'language', ...lang }], ['Cornish', 3, 2, { g: 'language', ...lang }],
    ['Manx', 4, 3, { g: 'language', ...lang }], ['Gaulish', 4, 3, lang], ['Celtiberian', 5, 4, lang], ['Cumbric', 5, 4, lang],
    ['Pictish', 5, 4, lang], ['Brythonic', 5, 4, lang], ['Goidelic', 5, 4, lang], ['Old Irish', 5, 4, lang], ['Galatian', 5, 5, { g: 'language', ...lang }],
  ],
};
