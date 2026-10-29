// Top-up batch 18: arabic music words ... fairy tale characters.
const p = (t, r, i, o) => [t, r, i, { type: 'person', ...o }];
const w = (t, r, i, o) => [t, r, i, { type: 'title', ...o }];

export const THEMES = {};

export const ALIASES = [
  ['middle_eastern_dances', 'dabke', '', [['debka', 'spelling', 3, 2]]],
  ['middle_eastern_dances', 'whirling dervish', '', [['Sufi whirling', 'synonym', 3, 2]]],
  ['middle_eastern_dances', 'belly dance', '', [['raqs sharqi', 'synonym', 4, 3]]],
  ['african_dances', 'adumu', '', [['Maasai jump', 'synonym', 3, 2]]],
  ['african_dances', 'warrior dance', '', [['war dance', 'synonym', 2, 2]]],
  ['african_writers', 'Chinua Achebe', '', [['Achebe', 'short', 3, 2]]],
  ['african_writers', 'Wole Soyinka', '', [['Soyinka', 'short', 3, 2]]],
  ['african_writers', 'Chimamanda Adichie', '', [['Adichie', 'short', 3, 3]]],
  ['persian_poets', 'Omar Khayyam', '', [['Khayyam', 'short', 3, 2]]],
];

export const FIXES = [
  { gloss: ['bellows', 'fireplace_words', 'fireplace'] },
  { gloss: ['Rusalka', 'slavic_folklore', 'spirit'] },
];

export const DATA = {
  arabic_music_words: [
    ['darbuka', 3, 2], ['Umm Kulthum', 3, 2, { type: 'person' }], ['Fairuz', 3, 2, { type: 'person' }],
    ['mizmar', 4, 4], ['rababa', 5, 5],
  ],
  turkish_singers: [
    p('Ahmet Kaya', 3, 2), p('Ferdi Tayfur', 3, 2), p('Ebru Gundes', 3, 2),
  ],
  african_musicians: [
    p('Tyla', 3, 2), p('CKay', 3, 2), p('Ayra Starr', 3, 2), p('Femi Kuti', 4, 4),
  ],
  south_american_singers: [
    p('Feid', 3, 2), p('Tini', 3, 2, { g: 'singer' }), p('Paulo Londra', 4, 2), p('Marisa Monte', 4, 4), p('Gal Costa', 4, 4), p('Mon Laferte', 4, 4),
  ],
  instrument_players: [
    p('Jimi Hendrix', 1, 1), p('Eric Clapton', 2, 2), p('Eddie Van Halen', 2, 2), p('Miles Davis', 2, 2), p('Carlos Santana', 2, 2), p('Charlie Parker', 3, 3),
  ],
  middle_eastern_dances: [
    ['ayyala', 5, 4, { g: 'dance' }], ['tahtib', 5, 4, { g: 'dance' }],
  ],
  african_dances: [
    ['Jerusalema', 2, 2, { type: 'proper', g: 'dance' }], ['kwassa kwassa', 4, 3],
  ],
  dutch_painters: [
    p('Hendrick Avercamp', 4, 4), p('Pieter Saenredam', 4, 4), p('Gabriel Metsu', 4, 4), p('Jan Toorop', 4, 4), p('Kees van Dongen', 4, 4),
    p('Jan Lievens', 4, 4), p('Nicolaes Maes', 5, 5),
  ],
  famous_sculptors: [
    p('Lysippos', 4, 5), p('Myron', 4, 4, { g: 'sculptor' }), p('Scopas', 5, 5), p('Aristide Maillol', 4, 4), p('Naum Gabo', 4, 4),
    p('Ossip Zadkine', 5, 5), p('Houdon', 5, 5),
  ],
  camera_parts: [
    ['film gate', 5, 4], ['leaf shutter', 5, 4], ['bellows', 3, 4, { g: 'camera' }], ['ground glass', 4, 4], ['shutter curtain', 5, 4],
    ['film spool', 4, 4], ['rewind crank', 5, 5],
  ],
  turkish_arts: [
    ['tugra', 4, 4], ['hattat', 5, 5], ['sulus', 5, 5], ['sedefkari', 5, 5], ['telkari', 5, 5], ['Hereke carpet', 4, 4, { type: 'proper' }], ['edirnekari', 5, 5],
  ],
  asian_art_forms: [
    ['nihonga', 4, 4], ['Pichwai', 5, 5], ['Warli art', 5, 5], ['Pattachitra', 5, 5], ['suminagashi', 5, 5], ['gongbi', 5, 5],
  ],
  pacific_art_words: [
    ['korowai', 4, 4], ['taniko', 5, 5], ['malagan', 5, 5], ['ngatu', 5, 5], ['tivaevae', 5, 5], ['tjurunga', 5, 5], ['Sepik carving', 5, 4],
  ],
  african_art_words: [
    ['ibeji', 5, 4, { g: 'twin figure' }], ['gelede', 5, 5], ['lukasa', 5, 5], ['Tingatinga', 4, 4], ['Dogon mask', 3, 3, { type: 'proper' }],
    ['Senufo carving', 5, 4, { type: 'proper' }], ['Asafo flag', 5, 5, { type: 'proper' }], ['Fang mask', 4, 4, { type: 'proper' }],
  ],
  famous_operas: [
    w('Wozzeck', 4, 4), w('Jenufa', 5, 5), w('Rusalka', 4, 4, { g: 'opera' }), w('Idomeneo', 4, 4), w('Billy Budd', 4, 4),
    w('Der Rosenkavalier', 4, 4), w('Ernani', 4, 4), w('Andrea Chenier', 4, 4),
  ],
  famous_musicals: [
    w('Brigadoon', 4, 4), w('Show Boat', 4, 4), w('Merrily We Roll Along', 5, 5), w('Pal Joey', 5, 5), w('Sweet Charity', 4, 4),
    w('Follies', 3, 4, { g: 'musical' }), w('Anything Goes', 3, 3), w('Paint Your Wagon', 4, 4),
  ],
  entertainment_awards: [
    ['Cesar Award', 4, 4, { type: 'proper' }], ['Goya Award', 4, 4, { type: 'proper' }], ['Annie Award', 5, 5, { type: 'proper' }],
    ['Ivor Novello', 4, 4, { type: 'proper' }],
  ],
  british_novelists: [
    p('Barbara Pym', 5, 5), p('Elizabeth Gaskell', 3, 4), p('Ford Madox Ford', 4, 4), p('Anthony Powell', 4, 4), p('Muriel Spark', 4, 4),
    p('Penelope Fitzgerald', 4, 5), p('Angela Carter', 4, 4), p('Samuel Richardson', 4, 4), p('Fanny Burney', 4, 5),
  ],
  american_novelists: [
    p('Richard Yates', 4, 4), p('William Gaddis', 5, 5), p('Wallace Stegner', 5, 5), p('John Dos Passos', 4, 4), p('Theodore Dreiser', 4, 4),
    p('Djuna Barnes', 5, 5), p('Carson McCullers', 4, 4),
  ],
  russian_writers: [
    p('Mikhail Zoshchenko', 4, 4), p('Andrei Platonov', 5, 5), p('Andrei Bely', 5, 5), p('Nikolai Nekrasov', 4, 4), p('Ivan Krylov', 4, 4),
    p('Varlam Shalamov', 5, 5), p('Velimir Khlebnikov', 5, 5),
  ],
  turkish_writers: [
    p('Tevfik Fikret', 4, 4), p('Kemal Tahir', 4, 4), p('Adalet Agaoglu', 4, 4), p('Sevgi Soysal', 4, 4), p('Tezer Ozlu', 5, 5),
    p('Bilge Karasu', 5, 5), p('Haldun Taner', 5, 5),
  ],
  african_writers: [
    p('Wilbur Smith', 2, 2),
  ],
  persian_poets: [
    p('Daqiqi', 5, 5), p('Onsori', 5, 5),
  ],
  shakespeare_plays: [
    w('Edward III', 4, 5, { g: 'play' }), w('Cardenio', 5, 5), w('Sir Thomas More', 5, 5, { g: 'play' }), w("Love's Labour's Won", 5, 5),
  ],
  fairy_tale_characters: [
    ['Vasilisa', 4, 4, { type: 'proper' }], ['Koschei', 4, 5, { type: 'proper' }], ['Gerda', 4, 4, { type: 'proper', g: 'fairy tale' }],
    ['Mother Holle', 4, 4, { type: 'proper' }], ['Donkeyskin', 4, 5, { type: 'title' }], ['Tatterhood', 5, 5, { type: 'proper' }],
    ['Rose White', 5, 5, { type: 'proper' }],
  ],
};
