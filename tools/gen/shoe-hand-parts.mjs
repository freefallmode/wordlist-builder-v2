// Words for the themes "shoe parts" and "hand parts" (themes made by shoe-hand-themes.mjs).
// Run: node tools/apply-words.mjs tools/gen/shoe-hand-parts.mjs
const ph = (o = {}) => ({ type: 'phrase', ...o });
export const THEMES = { shoe_parts: { pop: 3, ident: 2 }, hand_parts: { pop: 2, ident: 2 }, foot_parts: { pop: 2, ident: 2 } };
// the older entries had no meaning label; they need one now that a second meaning exists. 
export const FIXES = [
  { gloss: ['tongue', 'senses', 'body part'] }, { gloss: ['throat', 'body_parts', 'body part'] }, { gloss: ['tendon', 'inside_the_body', 'body part'] }, { gloss: ['lining', 'clothing_parts', 'clothing'] },
];
export const DATA = {
  foot_parts: [
    ['toe', 1, 1], ['heel', 1, 1, { g: 'foot' }], ['sole', 1, 1, { g: 'foot' }], ['ankle', 1, 1, { g: 'body part' }], ['arch', 2, 2, { g: 'foot' }], ['instep', 3, 2],
    ['big toe', 1, 1], ['little toe', 1, 2], ['toenail', 1, 2], ['pinky toe', 2, 3], ['hallux', 4, 4], ['metatarsal', 4, 4], ['tarsals', 4, 4],
    ['calcaneus', 4, 4], ['talus', 4, 4], ['achilles tendon', 3, 3, ph()], ['toe pad', 3, 4, ph()], ['callus', 3, 5, { g: 'skin' }], ['bunion', 3, 5], ['plantar fascia', 4, 4, ph()],
    ['webbing', 3, 5, { g: 'toes' }],
  ],
  shoe_parts: [
    ['sole', 1, 1, { g: 'shoe' }], ['heel', 1, 1, { g: 'shoe' }], ['upper', 3, 2, { g: 'shoe' }], ['tongue', 1, 2, { g: 'shoe' }],
    ['lace', 1, 1, { g: 'shoelace', al: [['shoelace', 'synonym', 1, 1], ['shoestring', 'synonym', 2, 2, ['US']]] }],
    ['eyelet', 3, 2, { g: 'fastener' }], ['insole', 2, 2], ['outsole', 3, 2], ['midsole', 3, 3], ['toe cap', 3, 2, ph()], ['toe box', 3, 3, ph()],
    ['arch support', 2, 3, ph()], ['buckle', 1, 3, { g: 'fastener' }], ['strap', 1, 3, { g: 'shoe' }], ['velcro', 2, 3, { type: 'org', tm: true }],
    ['vamp', 4, 3, { g: 'shoe' }], ['quarter', 4, 4, { g: 'shoe' }], ['welt', 4, 3], ['shank', 4, 4, { g: 'shoe' }], ['aglet', 4, 3],
    ['heel counter', 4, 4, ph()], ['topline', 4, 4], ['sockliner', 4, 4], ['tread', 2, 2, { g: 'shoe' }], ['lining', 2, 3, { g: 'shoe' }],
    ['heel tab', 4, 4, ph()], ['pull tab', 3, 4, ph()], ['stitching', 2, 4, { g: 'shoe' }], ['last', 4, 5, { g: 'shoe mold' }], ['throat', 5, 5, { g: 'shoe opening' }],
    ['rand', 5, 5, { g: 'shoe' }], ['sidewall', 4, 4, { g: 'shoe' }], ['stud', 2, 4, { g: 'shoe' }],
  ],
  hand_parts: [
    ['palm', 1, 1, { g: 'hand' }], ['finger', 1, 1, { g: 'body part' }], ['thumb', 1, 1], ['knuckle', 1, 1], ['fingernail', 1, 1], ['wrist', 1, 2], ['fingertip', 2, 2],
    ['index finger', 1, 2, ph()], ['middle finger', 1, 2, ph()], ['ring finger', 1, 2, ph()], ['pinky', 1, 2], ['forefinger', 3, 2],
    ['fingerprint', 1, 3], ['cuticle', 3, 3, { g: 'nail' }], ['lunula', 4, 4],
    ['webbing', 3, 4, { g: 'hand' }], ['thenar', 5, 5], ['hypothenar', 5, 5], ['metacarpal', 4, 4], ['phalanges', 4, 4], ['carpals', 4, 4],
    ['nail bed', 3, 3, ph()], ['hangnail', 2, 4], ['palm line', 2, 3, ph()], ['finger pad', 3, 3, ph()], ['ball of the thumb', 3, 3, ph()],
    ['tendon', 3, 4, { g: 'hand' }], ['skin', 1, 4, { g: 'hand' }],
  ],
};
