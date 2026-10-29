// Repair batch: band / musician / instrument words skipped earlier because their text already existed.
const og = (t, r, i, o = {}) => [t, r, i, { type: 'org', g: 'band', ...o }];

export const DATA = {
  famous_bands: [
    og('Queen', 1, 2), og('Camel', 3, 4), og('Oasis', 2, 3), og('Boston', 2, 3), og('Nirvana', 1, 2),
    og('Cake', 3, 4), og('Heart', 2, 3), og('Kansas', 2, 3), og('Styx', 3, 4), og('Chicago', 2, 3),
    og('Europe', 3, 4), og('Asia', 3, 4), og('Suede', 3, 4), og('Pulp', 3, 4), og('Muse', 2, 3),
    og('Train', 3, 4), og('Wings', 3, 3), og('Rush', 3, 3), og('Bush', 3, 4), og('Free', 4, 4), og('Jet', 4, 4),
    og('The Police', 2, 2, { g: '' }), og('The Clash', 2, 2, { g: '' }), og('The Cure', 2, 2, { g: '' }),
  ],
  instrument_players: [
    ['Flea', 3, 4, { type: 'person', g: 'bassist' }],
  ],
  pop_stars: [
    ['Sting', 1, 2, { type: 'person', g: 'singer' }], ['Seal', 2, 3, { type: 'person', g: 'singer' }],
    ['Pink', 1, 2, { type: 'person', g: 'singer' }], ['Usher', 2, 2, { type: 'person', g: 'singer' }],
    ['Drake', 1, 2, { type: 'person', g: 'rapper' }], ['Bono', 2, 3, { type: 'person' }],
    ['Moby', 3, 4, { type: 'person' }], ['Enya', 3, 3, { type: 'person' }],
  ],
  instrument_parts: [
    ['neck', 1, 2, { g: 'instrument' }], ['scroll', 3, 3, { g: 'instrument' }], ['head', 2, 3, { g: 'drum' }],
  ],
  string_instruments: [
    ['axe', 2, 4, { g: 'guitar' }],
  ],
  percussion_instruments: [
    ['skins', 3, 4, { g: 'drums' }],
  ],
  music_terms: [
    ['solo', 2, 2],
  ],
};

export const FIXES = [
  { gloss: ['Boston', 'cities', 'city'] },
  { gloss: ['Oasis', 'desert_features', 'desert'] },
  { gloss: ['Camel', 'mammals', 'animal'] },
  { gloss: ['Flea', 'insects_and_bugs', 'insect'] },
  { gloss: ['neck', 'body_parts', 'body part'] },
  { gloss: ['Chicago', 'cities', 'city'] },
  { gloss: ['Kansas', 'us_states', 'state'] },
  { gloss: ['Europe', 'continents', 'continent'] },
  { gloss: ['Asia', 'continents', 'continent'] },
  { gloss: ['Muse', 'art', 'inspiration'] },
  { gloss: ['Suede', 'fabrics', 'fabric'] },
  { gloss: ['Train', 'things_with_wheels', 'vehicle'] },
  { gloss: ['Cake', 'desserts_and_sweets', 'food'] },
  { gloss: ['Sting', 'rhymes_with_ring', 'bite'] },
  { gloss: ['Pink', 'colors', 'color'] },
];
