// Hard outdoor batch: climbing holds, bike tricks, bike park. Specialist words on purpose: themes for hard levels. Format: tools/apply-words.mjs.
// Run in order: node tools/gen/julia/outdoor-hard-themes.mjs; node tools/apply-words.mjs tools/gen/julia/outdoor-hard.mjs
// Ratings: familiarity (1 every child knows it ... 5 few people), then how typical of THIS theme (1 the first words anyone names ... 5 peripheral).
// Many words are new meanings of existing texts (pinch the climbing hold, whip the bike trick). An existing entry of such a text
// that has no meaning label gets one first (FIXES), so each entry of the text can be told apart.
// Left out: "superman" the bike trick (a common "superman" entry makes the case lint flag Superman the hero in two themes).

export const FIXES = [
  { gloss: ['jib', 'sailing_words', 'sail'] },
  { gloss: ['bunny hop', 'dance_moves', 'dance'] },
  { gloss: ['can-can', 'dances', 'dance'] },
  { gloss: ['rock garden', 'garden_styles', 'garden'] },
  { gloss: ['tabletop', 'yoga_poses', 'yoga'] },
  { gloss: ['skinny', 'starts_with_a_body_part', 'thin'] },
  { gloss: ['step-down', 'power_grid_words', 'electrical'] },
];

export const THEMES = {
  climbing_holds: { pop: 4, ident: 3 },
  bike_tricks: { pop: 4, ident: 2 },
  bike_park: { pop: 4, ident: 3 },
};

const H = { g: 'climbing hold' };
export const DATA = {
  climbing_holds: [
    ['jug', 4, 1, H], ['crimp', 4, 1], ['sloper', 4, 1], ['pinch', 4, 2, H], ['pocket', 4, 2, H], ['edge', 4, 2, H],
    ['undercling', 5, 3], ['sidepull', 5, 3], ['volume', 4, 3, H], ['flake', 4, 3, { g: 'rock' }], ['gaston', 5, 4, { g: 'climbing' }], ['jib', 5, 4, H],
  ],
  bike_tricks: [
    ['wheelie', 1, 1], ['bunny hop', 3, 1, { g: 'bike' }], ['manual', 4, 2, { g: 'bike' }], ['no-hander', 3, 2], ['tailwhip', 4, 2], ['barspin', 4, 2],
    ['endo', 4, 2], ['stoppie', 4, 3], ['backflip', 2, 3], ['track stand', 4, 3],
    ['fakie', 4, 4], ['whip', 4, 3, { g: 'bike trick' }], ['can-can', 5, 4, { g: 'bike trick' }],
  ],
  bike_park: [
    ['berm', 4, 1], ['pump track', 3, 1], ['dirt jump', 3, 2], ['kicker', 4, 2, { g: 'ramp' }], ['drop', 3, 2, { g: 'trail feature' }],
    ['rock garden', 4, 3, { g: 'trail' }], ['tabletop', 4, 3, { g: 'jump' }], ['gap jump', 4, 3], ['wall ride', 4, 3], ['step-up', 4, 3],
    ['step-down', 4, 3, { g: 'jump' }], ['skinny', 5, 4, { g: 'narrow plank' }], ['ladder bridge', 5, 4], ['foam pit', 3, 4], ['chairlift', 2, 4],
  ],
};

// Words that stand for one another in the theme: a level shows only one of each group.
export const GROUPS = [
  ['bike_tricks', 'endo', 'stoppie'],
];
