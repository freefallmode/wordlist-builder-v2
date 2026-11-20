// Outdoor batch: s'mores, hiking snacks, hiking dangers, bike gear, and more words for "climbing styles". Format: tools/apply-words.mjs.
// Run in order: node tools/gen/julia/outdoor-themes.mjs; node tools/apply-words.mjs tools/gen/julia/outdoor.mjs; node tools/gen/julia/outdoor-fixes.mjs
// Ratings: familiarity (1 every child knows it ... 5 few people), then how typical of THIS theme (1 the first words anyone names ... 5 peripheral).
// Most words already exist in the library (same text and meaning label) and are only linked; their own ratings and flags stay.
// Not made (specialist words, mostly new to the library): climbing holds (jug, crimp, sloper), bike tricks (tailwhip, barspin), bike park features (berm, pump track).

export const THEMES = {
  smores: { pop: 2, ident: 1 },
  hiking_snacks: { pop: 2, ident: 2 },
  hiking_dangers: { pop: 2, ident: 2 },
  bike_gear: { pop: 3, ident: 2 },
};

export const DATA = {
  smores: [
    ['marshmallow', 1, 1], ['chocolate', 1, 1, { g: 'sweet' }], ['graham cracker', 2, 1], ['digestive', 2, 2, { g: 'biscuit' }],
    ['campfire', 1, 2, { g: 'outdoor fire' }], ['roasting stick', 2, 2],
  ],
  hiking_snacks: [
    ['trail mix', 1, 1], ['granola bar', 1, 1], ['energy bar', 2, 1], ['beef jerky', 2, 2], ['dried fruit', 1, 2], ['protein bar', 2, 2],
    ['peanuts', 1, 2], ['banana', 1, 2, { g: 'fruit' }], ['apple', 1, 3, { g: 'fruit' }], ['chocolate', 1, 3, { g: 'sweet' }], ['sandwich', 1, 3],
    ['crackers', 1, 3], ['raisins', 1, 3], ['pretzels', 2, 3], ['dried apricots', 2, 3], ['energy gel', 3, 3], ['Kendal Mint Cake', 4, 3],
  ],
  hiking_dangers: [
    ['blister', 1, 1, { g: 'skin bubble' }], ['sunburn', 1, 2], ['tick', 2, 2, { g: 'bug' }], ['snake', 1, 2, { g: 'animal' }], ['bear', 1, 2, { g: 'animal' }],
    ['lightning', 1, 2, { g: 'storm' }], ['sprained ankle', 1, 2], ['dehydration', 2, 2], ['hypothermia', 2, 2], ['poison ivy', 2, 2, { g: 'plant' }],
    ['heatstroke', 2, 3], ['frostbite', 2, 3], ['flash flood', 2, 3], ['fog', 1, 3], ['mosquito', 1, 3], ['stinging nettle', 2, 3],
    ['rockfall', 3, 3], ['avalanche', 1, 4, { g: 'skiing' }],
  ],
  bike_gear: [
    ['helmet', 1, 1, { g: 'cycling' }], ['D-lock', 3, 2], ['pump', 1, 1, { g: 'tire' }],
    ['lights', 1, 2, { g: 'bicycle' }], ['gloves', 1, 2], ['water bottle', 1, 2], ['knee pads', 2, 2], ['elbow pads', 2, 3],
    ['cycling shorts', 2, 2], ['high-vis vest', 2, 2], ['reflective vest', 2, 2], ['sunglasses', 1, 3], ['hydration pack', 3, 3],
    ['patch kit', 3, 3, { al: [['puncture repair kit', 'regional', 2, 3, ['UK']]] }], ['tire levers', 3, 3, { al: [['tyre levers', 'spelling', 3, 3, ['UK']]] }],
    ['multi-tool', 2, 3], ['goggles', 1, 4, { g: 'eyewear' }],
  ],
  // Simon's theme: full terms, shown short there (outdoor-fixes.mjs), like the four already in it.
  climbing_styles: [
    ['bouldering', 2, 1], ['indoor climbing', 2, 2, { pos: 'noun' }], ['sport climbing', 3, 2], ['lead climbing', 4, 3], ['top rope', 3, 3],
    ['speed climbing', 3, 3], ['aid climbing', 4, 4], ['alpine climbing', 4, 4],
  ],
};

// Other names for words that already exist (they follow their root's themes).
export const ALIASES = [
  ['bike_gear', 'D-lock', '', [['U-lock', 'regional', 3, 3, ['US']]]],
];

// Words that stand for one another in the theme: a level shows only one of each group.
export const GROUPS = [
  ['smores', 'graham cracker', 'digestive'],
  ['bike_gear', 'high-vis vest', 'reflective vest'],
];
