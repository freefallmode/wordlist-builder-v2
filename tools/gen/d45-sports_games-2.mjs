// Depth 4+ themes of sports_games, chunk 2: logic puzzles, yard games. Format: tools/apply-words.mjs.
const P = (o = {}) => ({ type: 'proper', ...o });
const BR = (o = {}) => ({ type: 'org', tm: true, ...o });

export const THEMES = {
  logic_puzzles: { d: 3 },
  yard_games: { d: 1 },
};

export const DATA = {
  logic_puzzles: [
    ['sudoku', 1, 1, { al: [['number place', 'synonym', 4, 3]] }], ['crossword', 1, 3, { g: 'puzzle' }], ['jigsaw', 1, 4, { g: 'puzzle' }], ['brain teaser', 2, 1],
    ['Rubik\'s cube', 1, 2, BR()], ['riddle', 1, 2], ['maze', 1, 4], ['mastermind', 2, 3, { g: 'board game' }], ['minesweeper', 2, 2, { g: 'puzzle game' }],
    ['logic puzzle', 2, 1], ['logic grid', 3, 2], ['kakuro', 3, 2], ['nonogram', 3, 2, { al: [['picross', 'synonym', 4, 3], ['hanjie', 'synonym', 5, 4]] }],
    ['killer sudoku', 3, 2], ['futoshiki', 4, 3], ['hitori', 4, 3], ['kenken', 3, 2, P({ al: [['calcudoku', 'synonym', 5, 4]] })],
    ['tower of hanoi', 3, 2, { al: [['Hanoi tower', 'synonym', 5, 4, [], { type: 'proper' }]] }], ['tangram', 3, 4], ['magic square', 3, 2],
    ['river crossing', 3, 2], ['knights and knaves', 4, 3], ['zebra puzzle', 4, 2, { al: [['Einstein\'s puzzle', 'synonym', 4, 3, [], { type: 'proper' }]] }],
    ['knight\'s tour', 4, 3], ['eight queens', 4, 3, { g: 'puzzle' }], ['sliding puzzle', 2, 2], ['slitherlink', 5, 3], ['hashi', 5, 4], ['nurikabe', 5, 4],
    ['akari', 5, 4], ['masyu', 5, 4], ['numbrix', 5, 4], ['water jugs', 4, 3], ['lateral thinking', 3, 3], ['cryptarithm', 5, 4],
  ],
  yard_games: [
    ['cornhole', 1, 1], ['horseshoes', 1, 1, { g: 'game' }], ['badminton', 1, 3], ['croquet', 2, 1], ['bocce', 2, 1], ['frisbee', 1, 2],
    ['tetherball', 2, 2], ['tag', 1, 2, { g: 'game' }], ['hide and seek', 1, 3], ['hopscotch', 1, 4], ['sack race', 1, 3], ['tug of war', 1, 3],
    ['egg and spoon', 2, 4], ['relay race', 1, 4], ['capture the flag', 2, 2], ['kick the can', 3, 3], ['red rover', 3, 3], ['kickball', 2, 3],
    ['wiffle ball', 2, 3], ['stickball', 3, 4], ['water balloon toss', 3, 3], ['slip and slide', 2, 2, { al: [['Slip n Slide', 'spelling', 2, 3, [], BR()]] }],
    ['lawn darts', 2, 1, { al: [['Jarts', 'synonym', 4, 3, [], BR()]] }], ['ring toss', 2, 2], ['bean bag toss', 2, 2], ['washer toss', 3, 2],
    ['ladder toss', 3, 2], ['ladder golf', 4, 2], ['giant jenga', 2, 2], ['giant chess', 3, 3], ['giant connect four', 3, 3], ['spikeball', 2, 3, P()],
    ['Kan Jam', 4, 2, BR()], ['kubb', 4, 3], ['molkky', 4, 3, P({ al: [['mölkky', 'spelling', 5, 4, [], { type: 'proper' }]] })], ['quoits', 4, 3],
    ['lawn bowls', 3, 2, { al: [['lawn bowling', 'synonym', 3, 2, ['US']]] }], ['petanque', 3, 2, { al: [['boules', 'synonym', 3, 3]] }], ['French cricket', 4, 3, P({ al: [] })],
    ['disc golf', 3, 3], ['blind man\'s buff', 3, 4, P()], ['three-legged race', 1, 3],
  ],
};
