// Repair batch (body_health): words an earlier batch skipped because their text already existed with another meaning.

export const FIXES = [
  // conflations first: a link that was made for another meaning moves to its own entry
  { split: ['gander', 'ways_of_looking', 'look'] },
  { split: ['pitta', 'colorful_birds', 'bird'] },
  { split: ['weed', 'gardening_verbs', 'remove weeds', { pos: 'verb' }] },
  // label the existing unlabelled entries
  { gloss: ['gander', 'domestic_animals', 'goose'] },
  { gloss: ['pitta', 'breads', 'bread'] },
  { gloss: ['weed', 'plants', 'plant'] },
  { gloss: ['grass', 'plants', 'plant'] },
  { gloss: ['skunk', 'mammals', 'animal'] },
  { gloss: ['hammer', 'hand_tools', 'tool'] },
  { gloss: ['stirrup', 'horse_tack', 'tack'] },
  { gloss: ['thrush', 'birds', 'bird'] },
  { gloss: ['hemisphere', 'maps_and_globes', 'globe'] },
  { gloss: ['vestibule', 'architecture', 'entrance'] },
  { gloss: ['orbit', 'space', 'space'] },
  { gloss: ['plantain', 'fruits', 'fruit'] },
  { gloss: ['ENT', 'fantasy_races', 'tree creature'] },
  { gloss: ['labyrinth', 'words_from_mythology', 'maze'] },
  { gloss: ['sty', 'animal_homes', 'pigpen'] },
  { gloss: ['snow', 'weather', 'weather'] },
  { gloss: ['horse', 'farm_animals', 'animal'] },
];

export const ALIASES = [
  ['ear_parts', 'malleus', '', [['hammer', 'synonym', 2, 3, [], { g: 'ear bone' }]]],
  ['ear_parts', 'stapes', '', [['stirrup', 'synonym', 2, 3, [], { g: 'ear bone' }]]],
  ['illegal_drugs', 'marijuana', '', [
    ['weed', 'slang', 1, 1, [], { g: 'drug' }], ['grass', 'slang', 2, 2, [], { g: 'drug' }], ['skunk', 'slang', 3, 3, [], { g: 'drug' }],
    ['reefer', 'slang', 3, 3], ['spliff', 'slang', 3, 3, ['UK', 'AU', 'NZ', 'IE']], ['bud', 'slang', 3, 3, [], { g: 'drug' }], ['joint', 'slang', 2, 2, [], { g: 'drug' }],
  ]],
  ['illegal_drugs', 'cocaine', '', [['coke', 'slang', 2, 2, [], { g: 'cocaine' }], ['snow', 'slang', 3, 3, [], { g: 'cocaine' }], ['charlie', 'slang', 3, 3, ['UK', 'AU', 'NZ', 'IE'], { g: 'cocaine' }]]],
  ['illegal_drugs', 'heroin', '', [['horse', 'slang', 3, 3, [], { g: 'heroin' }], ['junk', 'slang', 3, 3, [], { g: 'heroin' }], ['skag', 'slang', 4, 4]]],
  ['illegal_drugs', 'methamphetamine', '', [['crystal', 'slang', 3, 3, [], { g: 'meth' }], ['crank', 'slang', 4, 4, [], { g: 'meth' }]]],
  ['illegal_drugs', 'amphetamine', '', [['speed', 'slang', 2, 2, [], { g: 'drug' }]]],
  ['illegal_drugs', 'magic mushrooms', '', [['shrooms', 'slang', 2, 2]]],
];

export const DATA = {
  ear_parts: [['vestibule', 4, 3, { g: 'ear' }], ['labyrinth', 4, 3, { g: 'ear' }]],
  eye_parts: [['orbit', 3, 3, { g: 'eye socket' }]],
  brain_parts: [['hemisphere', 2, 3, { g: 'brain' }]],
  sight_words: [['gander', 3, 3, { g: 'look' }]],
  infections: [['thrush', 3, 3, { g: 'infection' }], ['sty', 3, 3, { g: 'eye' }]],
  four_humours: [['melancholy', 3, 3]],
  ayurveda_words: [['pitta', 4, 3, { g: 'dosha' }]],
  native_american_remedies: [['plantain', 3, 4, { g: 'herb' }]],
  medical_specialties: [
    ['ENT', 2, 3, { g: 'medicine', type: 'acronym', al: [['ear nose and throat', 'synonym', 3, 3, [], { type: 'common' }]] }],
    ['dentistry', 2, 3], ['optometry', 3, 3], ['surgery', 1, 2, { g: 'operation' }],
  ],
  illegal_drugs: [['uppers', 3, 3], ['downers', 3, 3]],
};
