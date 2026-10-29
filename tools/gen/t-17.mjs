// Top-up batch 17: sports & games trophies ... capoeira, and folk/regional instrument and African music themes.
const P = (t, r, i, o = {}) => [t, r, i, { type: 'proper', ...o }];
const N = (t, r, i, o = {}) => [t, r, i, { type: 'person', ...o }];

export const THEMES = {};

export const FIXES = [
  { gloss: ['cabriole', 'ballet_terms', 'ballet'] },
];

export const DATA = {
  trophies_and_prizes: [
    P('Lady Byng Trophy', 4, 4), P('Bledisloe Cup', 4, 4), P('Sheffield Shield', 4, 5), P('Walker Cup', 4, 4), P('Solheim Cup', 3, 4), P('Wisden Trophy', 5, 5), P('Henri Delaunay Cup', 5, 5),
  ],
  famous_races: [
    P('Vasaloppet', 4, 4), P('Marathon des Sables', 4, 4), P('Carrera Panamericana', 4, 5), P('Peking to Paris', 4, 4), P('Strade Bianche', 4, 5), P('Barkley Marathons', 4, 5), P('Gordon Bennett Cup', 5, 5),
  ],
  famous_soccer_players: [
    N('Just Fontaine', 4, 4), N('Josef Bican', 5, 5), N('Obdulio Varela', 5, 5), N('Raymond Kopa', 4, 4), N('Jairzinho', 4, 4), N('Hristo Stoichkov', 3, 4), N('Zbigniew Boniek', 4, 4), N('Nílton Santos', 4, 5),
  ],
  tennis_champions: [
    N('Ken Rosewall', 4, 4), N('Lew Hoad', 5, 5), N('Tony Trabert', 5, 5), N('Jack Kramer', 4, 4), N('Pancho Gonzales', 5, 5), N('Guillermo Vilas', 4, 4), N('Thomas Muster', 4, 4), N('Gaston Gaudio', 5, 5),
  ],
  esports_words: [
    ['gamer', 1, 1], ['gaming', 1, 2], ['leaderboard', 3, 2], ['headset', 2, 2, { g: 'audio' }],
  ],
  power_ups_and_pickups: [
    ['Quad Damage', 4, 5, { type: 'proper' }], ['Soulsphere', 5, 5, { type: 'proper' }], ['Megasphere', 5, 5, { type: 'proper' }], ['Tanooki Suit', 4, 4, { type: 'proper' }], ['Super Leaf', 4, 4, { type: 'proper' }], ['Warp Whistle', 4, 4, { type: 'proper' }], ['Chaos Emerald', 3, 4, { type: 'proper' }], ['Blue Shell', 3, 4, { type: 'proper' }],
  ],
  video_game_characters: [
    N('Gordon Freeman', 3, 4), N('Sephiroth', 3, 4), N('Simon Belmont', 4, 5), N('Captain Falcon', 4, 4), N('Earthworm Jim', 3, 4), N('Pyramid Head', 4, 5), N('Isaac Clarke', 4, 5), N('Marcus Fenix', 4, 5),
  ],
  crafts: [
    ['kumihimo', 4, 4], ['nalbinding', 5, 5], ['shibori', 4, 4], ['bargello', 5, 5], ['smocking', 3, 4], ['goldwork', 4, 5], ['trapunto', 5, 5], ['temari', 5, 5], ['hardanger', 5, 5], ['marquetry', 3, 4],
  ],
  collecting_hobbies: [
    ['philately', 3, 4], ['numismatics', 4, 4], ['deltiology', 5, 5], ['phillumeny', 5, 5], ['cartophily', 5, 5],
  ],
  model_making: [
    ['pin wash', 4, 5], ['photo-etch', 5, 5], ['static grass', 3, 4], ['panel line', 4, 5], ['scribing', 4, 5], ['vacuum forming', 4, 5], ['resin kit', 3, 4],
  ],
  puzzles: [
    ['Slitherlink', 4, 5], ['Nurikabe', 4, 5, { g: 'puzzle' }], ['Masyu', 5, 5], ['cryptarithm', 5, 5], ['Instant Insanity', 4, 5, { type: 'proper' }],
  ],
  paper_crafts: [
    ['iris folding', 4, 4], ['papel picado', 4, 4], ['paper tole', 5, 5], ['pergamano', 5, 5], ['suminagashi', 5, 5], ['mulberry paper', 4, 4],
  ],
  woodworking_words: [
    ['froe', 5, 5], ['adze', 4, 4], ['drawknife', 4, 4], ['card scraper', 4, 5], ['gouge', 3, 4], ['marquetry', 3, 4], ['kumiko', 5, 5], ['cabriole', 4, 5, { g: 'furniture leg' }], ["bird's mouth", 5, 5], ['fretsaw', 4, 4],
  ],
  outdoor_games: [
    ['Aunt Sally', 4, 4], ['skittles', 3, 4, { g: 'game' }], ['caber toss', 3, 4], ['pesäpallo', 5, 5], ['French cricket', 4, 4], ['Pooh sticks', 3, 4, { reg: ['UK'] }], ['klootschieten', 5, 5, { reg: ['NL'] }], ['gaga ball', 4, 4],
  ],
  dolls_and_figures: [
    ['kachina doll', 4, 4], ['matryoshka', 3, 4], ['Frozen Charlotte', 5, 5, { type: 'proper' }], ['ball-jointed doll', 5, 5], ['worry doll', 4, 4], ['corn dolly', 4, 5, { reg: ['UK'] }], ['Sindy', 4, 4, { type: 'proper', tm: true, reg: ['UK'] }], ['Tiny Tears', 4, 4, { type: 'proper', tm: true }],
  ],
  sports_day_events: [
    ['slow bike race', 4, 4], ['tunnel ball', 4, 5], ['triple jump', 2, 4],
  ],
  capoeira_words: [
    ['chapa', 5, 5, { g: 'capoeira kick' }], ['cabeçada', 5, 5, { g: 'capoeira' }], ['tesoura', 5, 5, { g: 'capoeira' }], ['ponteira', 5, 5, { g: 'capoeira' }], ['gunga', 5, 5, { g: 'capoeira' }],
  ],
  folk_instruments: [
    ['acoustic guitar', 1, 2], ['tambourine', 1, 2], ['lute', 2, 2],
  ],
  middle_eastern_instruments: [
    ['lute', 2, 2], ['tambourine', 1, 2], ['finger cymbals', 3, 2],
  ],
  african_instruments: [
    ['thumb piano', 2, 2], ['xylophone', 1, 2], ['African drum', 1, 1],
  ],
  chinese_instruments: [
    ['Chinese zither', 3, 2], ['Chinese lute', 3, 2],
  ],
  japanese_instruments: [
    ['Japanese drum', 2, 1], ['Japanese harp', 3, 2],
  ],
  pacific_instruments: [
    ['steel guitar', 3, 2], ['log drum', 3, 2],
  ],
  andean_instruments: [
    ['Andean flute', 3, 2], ['guitar', 1, 2],
  ],
  african_music_styles: [
    ['African drumming', 2, 2], ['African jazz', 3, 2],
  ],
};
