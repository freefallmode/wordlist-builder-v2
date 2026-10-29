// Generated word data: Qualities. The only playable theme directly under the root is "colors" (every other child is a group).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const C = (o = {}) => ({ pos: 'adjective', ...o });
const CC = (o = {}) => C({ g: 'color', ...o });

export const THEMES = {
  colors: { d: 1 },
};

export const DATA = {
  colors: [
    // easy
    ['red', 1, 1, C()], ['orange', 1, 1, CC()], ['yellow', 1, 1, C()], ['green', 1, 1, C()], ['blue', 1, 1, C()], ['purple', 1, 1, C()], ['pink', 1, 1, C()],
    ['brown', 1, 1, C()], ['black', 1, 1, C({ al: [['jet', 'synonym', 3, 4, [], { g: 'color' }], ['sable', 'synonym', 5, 5]] })], ['white', 1, 1, C()],
    ['gray', 1, 1, C({ al: [['grey', 'spelling', 1, 1, ['UK', 'IE', 'AU', 'NZ', 'ZA', 'IN']]] })],
    ['gold', 1, 2, CC({ al: [['golden', 'synonym', 2, 2]] })], ['silver', 1, 2, CC()], ['violet', 2, 2, C()], ['indigo', 2, 3, C()], ['navy', 2, 2, C()],
    ['beige', 2, 2, C()], ['cream', 1, 3, CC({ al: [['creme', 'spelling', 3, 4]] })], ['tan', 2, 3, CC()], ['maroon', 2, 2, CC()], ['teal', 2, 2, CC()],
    ['lime', 2, 3, CC()], ['magenta', 2, 2, C({ al: [['fuchsia', 'synonym', 3, 3]] })], ['cyan', 3, 3, C({ al: [['aqua', 'synonym', 2, 3]] })],
    ['turquoise', 2, 2, C()], ['lavender', 2, 3, CC()], ['peach', 1, 3, CC()], ['coral', 2, 3, CC()], ['salmon', 2, 3, CC()], ['khaki', 2, 2, C()],
    ['burgundy', 2, 2, CC()], ['crimson', 2, 2, C()], ['scarlet', 2, 2, C()], ['olive', 1, 3, CC()], ['bronze', 1, 3, CC()], ['ivory', 2, 3, CC()],
    ['lilac', 2, 2, CC()], ['rose', 1, 3, CC()], ['plum', 1, 3, CC()], ['charcoal', 2, 3, CC()],
    // middle
    ['mauve', 3, 3, C()], ['taupe', 3, 3, C()], ['ochre', 3, 3, C({ al: [['ocher', 'spelling', 3, 3, ['US']]] })], ['amber', 2, 3, CC()], ['sepia', 3, 3, C()],
    ['rust', 2, 3, CC()], ['chartreuse', 3, 3, CC()], ['ecru', 3, 3, C()], ['vermilion', 3, 4, C({ al: [['vermillion', 'spelling', 4, 4, ['US']]] })],
    ['sienna', 3, 3, C()], ['umber', 3, 3, C()], ['saffron', 3, 4, CC()], ['mahogany', 3, 4, CC()], ['tawny', 3, 3, C()], ['azure', 3, 3, C()],
    ['auburn', 3, 3, C()], ['ebony', 3, 3, CC()], ['primrose', 3, 4, CC()], ['cerise', 4, 4, C()], ['fawn', 3, 3, CC()], ['cobalt', 3, 3, C()],
    // hard
    ['puce', 4, 4, C()], ['russet', 4, 3, C()], ['celadon', 4, 4, CC()], ['carmine', 4, 4, C()], ['viridian', 4, 4, C()], ['cinnabar', 4, 4, CC()],
    ['verdigris', 4, 4, C()], ['Prussian blue', 4, 4, C({ type: 'proper' })], ['jonquil', 5, 4, CC()], ['heliotrope', 5, 4, CC()],
    ['Tyrian purple', 5, 4, C({ type: 'proper' })], ['rufous', 5, 4, C()], ['glaucous', 5, 5, C()], ['gamboge', 5, 5, C()], ['madder', 5, 5, CC()],
    ['amaranth', 5, 5, CC()], ['bistre', 5, 5, C()], ['cinereous', 5, 5, C()], ['fulvous', 5, 5, C()], ['titian', 5, 4, C()], ['isabelline', 5, 5, C()],
    ['eau de nil', 5, 5, C({ type: 'phrase', reg: ['UK'] })],
  ],
};

export const ALIASES = [
  ['colors', 'navy', '', [['navy blue', 'synonym', 1, 2]]],
];
