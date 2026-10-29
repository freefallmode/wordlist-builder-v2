// Repair batch: words skipped by the old clash rule (roots animals and people_society).
const E = o => ({ g: 'endearment', reg: undefined, ...o });

export const FIXES = [
  { split: ['quill', 'prickly_things', 'spine'] },
  { gloss: ['quill', 'alphabets_and_writing', 'pen'] },
  { gloss: ['keel', 'boats_and_ships', 'boat part'] },
  { gloss: ['pumpkin', 'vegetables', 'vegetable'] },
  { gloss: ['cupcake', 'cakes', 'cake'] },
  { gloss: ['baby', 'babies_and_birth', 'infant'] },
  { gloss: ['china', 'countries', 'country'] },
  { gloss: ['hen', 'poultry', 'chicken'] },
  { gloss: ['angel', 'angels_and_spirits', 'spirit'] },
  { gloss: ['treasure', 'pirates', 'loot'] },
  { gloss: ['blue', 'colors', 'color'] },
  { gloss: ['sunshine', 'signs_of_summer', 'sun'] },
  { gloss: ['doll', 'toys', 'toy'] },
];

export const DATA = {
  animal_body_parts: [
    ['keel', 4, 4, { g: 'bird' }],
    ['toe', 1, 2], ['nape', 3, 3], ['throat', 1, 3], ['belly', 1, 2], ['haunch', 3, 3],
    ['withers', 4, 4], ['flank', 3, 3, { g: 'animal part' }],
  ],
  bird_body_parts: [
    ['keel', 4, 4, { g: 'bird' }], ['comb', 2, 2, { g: 'bird' }], ['toe', 1, 2], ['throat', 1, 3], ['belly', 1, 2],
  ],
  animal_coverings: [['quill', 3, 2, { g: 'spine' }]],
  weasel_family: [['sable', 3, 3, { g: 'animal' }]],
  terms_of_endearment: [
    ['duck', 3, 4, { g: 'endearment', reg: ['UK'] }],
    ['hen', 3, 4, { g: 'endearment', reg: ['UK'] }],
    ['baby', 1, 1, { g: 'endearment' }],
    ['pumpkin', 2, 2, { g: 'endearment' }],
    ['cupcake', 2, 3, { g: 'endearment' }],
    ['sugar', 2, 2, { g: 'endearment' }],
    ['angel', 1, 2, { g: 'endearment' }],
    ['treasure', 2, 3, { g: 'endearment' }],
    ['sunshine', 2, 2, { g: 'endearment' }],
    ['doll', 2, 3, { g: 'endearment' }],
    ['lamb', 3, 4, { g: 'endearment' }],
    ['ducky', 3, 3, { reg: ['UK'] }],
    ['dearie', 3, 3], ['cutie', 2, 2], ['hun', 2, 2], ['lovey', 3, 3], ['lovebug', 3, 3], ['sugarplum', 3, 3],
    ['honeybun', 3, 3], ['babycakes', 3, 3], ['sweet cheeks', 3, 3],
  ],
  words_for_friend: [
    ['china', 3, 4, { g: 'mate', reg: ['UK'] }],
    ['bro', 1, 2], ['bruv', 3, 3, { reg: ['UK'] }], ['fam', 2, 3], ['dude', 1, 2, { g: 'guy' }],
  ],
  british_slang: [['china', 3, 4, { g: 'mate', reg: ['UK'] }], ['bruv', 3, 3, { reg: ['UK'] }]],
  australian_slang: [['blue', 3, 4, { g: 'fight', reg: ['AU'] }]],
};
