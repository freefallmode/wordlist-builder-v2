// Kitchen batch: bakeware, kitchen linens, food storage. Format: tools/apply-words.mjs. Create the themes first: node tools/gen/julia/kitchen-themes.mjs
// Run: node tools/apply-words.mjs tools/gen/julia/kitchen.mjs
// Ratings: familiarity (1 every child knows it ... 5 few people), then how typical of THIS theme (1 the first words anyone names ... 5 peripheral).
// Most words already exist in the library (same text and meaning) and are only linked; their own ratings and flags stay.

export const THEMES = {
  bakeware: { pop: 2, ident: 2 },
  kitchen_linens: { pop: 3, ident: 2 },
  food_storage: { pop: 2, ident: 2 },
};

export const DATA = {
  bakeware: [
    ['baking sheet', 1, 1], ['cake pan', 1, 1], ['muffin tin', 1, 1], ['pie dish', 1, 2], ['baking dish', 1, 2],
    ['loaf pan', 2, 2], ['cooling rack', 2, 2], ['casserole dish', 2, 3], ['pizza stone', 2, 3], ['brownie pan', 2, 3],
    ['tart pan', 3, 3, { al: [['tart tin', 'regional', 3, 3, ['UK']]] }],
    ['springform pan', 3, 3], ['bundt pan', 3, 3], ['ramekin', 3, 3], ['quiche dish', 3, 3], ['soufflé dish', 3, 3],
    ['madeleine pan', 4, 4],
  ],
  kitchen_linens: [
    ['apron', 1, 1, { g: 'clothing' }], ['dish towel', 1, 1], ['oven mitt', 1, 1], ['tablecloth', 1, 1],
    ['dishcloth', 1, 2], ['napkin', 1, 2], ['placemat', 1, 2], ['pot holder', 2, 2],
    ['table runner', 2, 3], ['tea cosy', 2, 3], ['dish drying mat', 3, 3], ['doily', 3, 4], ['toaster cover', 3, 4],
  ],
  food_storage: [
    ['jar', 1, 1, { g: 'glass container' }], ['plastic wrap', 1, 1], ['aluminum foil', 1, 1], ['tin foil', 1, 1], ['Tupperware', 2, 1],
    ['sandwich bag', 1, 2], ['cookie jar', 1, 2], ['freezer bag', 2, 2], ['bread box', 2, 2], ['canister', 2, 2],
    ['cookie tin', 2, 2, { al: [['biscuit tin', 'regional', 2, 2, ['UK']]] }],
    ['egg carton', 1, 3], ['cooler', 1, 3], ['butter dish', 2, 3], ['wax paper', 2, 3],
    ['bag clip', 2, 3, { al: [['chip clip', 'regional', 2, 3, ['US']]] }],
    ['beeswax wrap', 3, 3],
  ],
};

// Other names for words that already exist (they follow their root's themes).
export const ALIASES = [
  ['bakeware', 'loaf pan', '', [['loaf tin', 'regional', 2, 2, ['UK']]]],
  ['bakeware', 'baking sheet', '', [['cookie sheet', 'regional', 2, 2, ['US']]]],
  ['food_storage', 'aluminum foil', '', [['aluminium foil', 'spelling', 2, 2, ['UK']]]],
];

// Words that stand for one another in the theme: a level shows only one of each group.
export const GROUPS = [
  ['bakeware', 'baking dish', 'casserole dish'],
  ['food_storage', 'aluminum foil', 'tin foil'],
];
