// Tops up "onion varieties", which had 5 words but only 3 playable answers once the walking / Egyptian / tree onion synonyms count as one.
// Run: node tools/apply-words.mjs tools/gen/onion-varieties.mjs
export const DATA = {
  onion_varieties: [
    ['red onion', 1, 1], ['white onion', 1, 1], ['yellow onion', 1, 1], ['sweet onion', 2, 2], ['vidalia', 3, 2], ['spanish onion', 3, 2], ['bermuda onion', 3, 3],
    ['pearl onion', 2, 3], ['cipollini', 3, 3], ['walla walla', 4, 3, { g: 'onion' }], ['maui onion', 4, 4], ['texas sweet', 4, 4, { g: 'onion' }],
  ],
};
export const ALIASES = [['onion_varieties', 'yellow onion', '', [['brown onion', 'regional', 2, 2, ['AU', 'UK']]]]];
// the theme's other members show the bare variety word (welsh, torpedo), so the theme name does not give them away
export const SHOW = { 17562: 'red', 17565: 'sweet', 17567: 'pearl', 17580: 'bermuda', 17581: 'spanish', 64680: 'white', 64681: 'yellow', 67274: 'maui' };
