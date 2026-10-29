// Repair batch: food senses of words skipped under the old clash rule.
export const DATA = {
  apple_varieties: [
    ['Envy', 4, 4, { g: 'apple', type: 'proper', tm: true }],
    ['Cameo', 4, 4, { g: 'apple', type: 'proper' }],
    ['Cosmic Crisp', 4, 4, { type: 'proper', tm: true }],
    ['SweeTango', 5, 4, { type: 'proper', tm: true }],
  ],
  parts_of_a_fruit: [
    ['skin', 1, 1, { g: 'fruit' }],
    ['hull', 3, 3, { g: 'fruit' }],
  ],
  cuts_of_meat: [
    ['saddle', 4, 3, { g: 'lamb cut' }],
    ['flat iron steak', 3, 3, { al: [['flat iron', 'short', 3, 3, [], { g: 'steak' }]] }],
  ],
  butcher_shop: [
    ['saw', 2, 3, { g: 'tool' }],
    ['honing steel', 4, 4, { al: [['steel', 'short', 2, 4, [], { g: 'knife sharpener' }]] }],
    ['meat mallet', 3, 2, { al: [['mallet', 'short', 2, 3, [], { g: 'meat' }]] }],
    ['flat iron steak', 3, 3],
    ['saddle', 4, 3, { g: 'lamb cut' }],
  ],
  kitchen_utensils: [
    ['honing steel', 4, 4],
    ['meat mallet', 3, 2],
  ],
  beans_and_pulses: [
    ['lupini bean', 4, 4, { al: [['lupini', 'short', 4, 4], ['lupin', 'synonym', 3, 5, [], { g: 'bean' }]] }],
  ],
  nuts: [
    ['butternut', 4, 4, { g: 'nut' }],
  ],
  citrus_fruits: [],
};
export const ALIASES = [
  ['citrus_fruits', 'navel orange', '', [['navel', 'short', 2, 2, [], { g: 'orange' }]]],
];
export const FIXES = [
  { gloss: ['navel', 'torso', 'body part'] },
  { gloss: ['envy', 'emotions', 'emotion'] },
  { gloss: ['flat iron', 'hair_care', 'hair tool'] },
  { gloss: ['lupin', 'flowers', 'flower'] },
  { gloss: ['steel', 'metals', 'metal'] },
  { gloss: ['mallet', 'hand_tools', 'tool'] },
];
