// Top-up chunk 22: hard/easy words for wordplay, "words before/after" and word-origin themes.
const OT = { pos: 'other' };
const P = { type: 'proper' };

export const FIXES = [
  { gloss: ['fuchsia', 'colors', 'color'] },
];

export const DATA = {
  silly_sounding_words: [
    ['snollygoster', 5, 5], ['absquatulate', 5, 5], ['gubbins', 3, 4], ['kibosh', 3, 4], ['taradiddle', 4, 4],
    ['widdershins', 4, 4], ['hornswoggle', 4, 4], ['codswallop', 3, 3], ['malarkey', 3, 3], ['poppycock', 3, 3],
  ],
  blank_man: [
    ['hench', 3, 4, OT], ['lay', 3, 4, { g: 'layperson' }], ['pitch', 3, 4, { g: 'sales' }], ['bag', 2, 4, { g: 'shopping' }],
    ['rag', 3, 4, { g: 'cloth' }], ['yes', 1, 2, { g: 'word' }], ['rain', 1, 3, { g: 'weather' }],
  ],
  blank_room: [
    ['ante', 3, 4], ['strong', 1, 4], ['cutting', 2, 4, { g: 'film' }], ['tack', 3, 5, { g: 'horse gear' }], ['still', 2, 5, { g: 'distilling' }],
    ['sick', 1, 4], ['box', 1, 4, { g: 'container' }], ['wiggle', 2, 3], ['standing', 1, 2], ['wash', 1, 2, { g: 'cleaning' }],
  ],
  blank_line: [
    ['Maginot', 3, 4, P], ['Plimsoll', 4, 4, P], ['ley', 4, 5, OT], ['Curzon', 4, 5, P], ['Mason-Dixon', 3, 4, P],
    ['tram', 2, 4], ['hem', 2, 3], ['bikini', 2, 3], ['blood', 1, 3], ['under', 1, 2, { g: 'preposition' }], ['out', 1, 2],
  ],
  blank_stone: [
    ['whin', 4, 5], ['blue', 1, 4, { g: 'color' }], ['Portland', 2, 4, { g: 'city' }], ['bath', 2, 4, { g: 'English city' }],
    ['brown', 1, 3, { g: 'color' }], ['fire', 1, 3, { g: 'flame' }], ['cherry', 1, 3, { g: 'fruit' }], ['peach', 1, 3, { g: 'fruit' }],
  ],
  blank_bag: [
    ['ditty', 4, 5], ['dilly', 4, 5, OT], ['gladstone', 3, 4, { g: 'luggage' }], ['carpet', 2, 4], ['dime', 2, 4],
    ['scum', 3, 3], ['diaper', 2, 2],
  ],
  blank_bell: [
    ['Lutine', 4, 5, P], ['Angelus', 4, 5, P], ["Hell's", 3, 4, P], ['sheep', 1, 3],
  ],
  blank_paper: [
    ['sugar', 1, 4, { g: 'food' }], ['butcher', 2, 4, { g: 'meat seller' }], ['emery', 4, 4], ['tar', 2, 4, { g: 'pitch' }],
    ['glass', 1, 4, { g: 'material' }], ['kraft', 3, 4], ['order', 2, 4, { g: 'parliament' }], ['position', 2, 4],
    ['working', 1, 4], ['lining', 3, 4], ['squared', 2, 3],
  ],
  black_blank: [
    ['pudding', 1, 3], ['currant', 2, 3], ['cab', 2, 3, { g: 'taxi' }], ['friar', 3, 4], ['damp', 3, 5],
    ['heath', 3, 4, { g: 'landscape' }], ['death', 1, 4, { g: 'plague' }], ['prince', 1, 4, { g: 'royal' }],
  ],
  air_blank: [
    ['worthy', 2, 4], ['frame', 2, 4, { g: 'structure' }], ['drome', 3, 5, OT], ['glow', 2, 5], ['burst', 2, 4], ['shaft', 2, 4, { g: 'mine' }],
    ['less', 1, 4], ['gap', 2, 4], ['speed', 1, 3, { g: 'measure' }], ['hole', 1, 3, { g: 'opening' }], ['head', 1, 2, { g: 'body' }],
    ['brake', 2, 3, { g: 'car' }], ['plane', 1, 1, { g: 'aircraft' }],
  ],
  over_blank: [
    ['awe', 3, 4], ['wrought', 4, 4], ['ween', 4, 5, OT], ['tone', 2, 4, { g: 'sound' }], ['bite', 1, 4, { g: 'teeth' }],
    ['burden', 3, 4], ['age', 1, 4], ['joy', 1, 3], ['spill', 2, 3], ['shadow', 1, 3], ['reach', 1, 3], ['rule', 1, 3], ['eat', 1, 3], ['sleep', 1, 2],
  ],
  hidden_colors: [
    ['goldfish', 1, 1], ['blueprint', 2, 1], ['brownie', 1, 2, { g: 'dessert' }], ['bored', 1, 2], ['tired', 1, 2], ['married', 1, 2],
  ],
  hidden_trees: [
    ['ashtray', 1, 1], ['ashes', 1, 1], ['figure', 1, 2], ['ashore', 2, 2],
  ],
  sounds_like_a_number: [
    ['wheat', 1, 4], ['cat', 1, 5], ['sees', 2, 5], ['sank', 1, 4, { g: 'French five' }], ['set', 1, 5, { g: 'French seven' }],
    ['queue', 3, 5, { g: 'line' }], ['knee', 1, 5], ['dry', 1, 5, { g: 'German three' }], ['fear', 1, 5],
  ],
  zigzag_words: [
    ['drip drop', 2, 1], ['snip snap', 3, 2], ['tip tap', 3, 2], ['hee haw', 3, 3], ['trip trap', 3, 3], ['flip flap', 4, 3],
    ['pit pat', 4, 3], ['ticky tacky', 4, 4], ['wiggle waggle', 4, 4], ['bim bam', 4, 4], ['cling clang', 4, 4], ['ting tang', 5, 5], ['clish clash', 5, 5],
  ],
  reversible_words: [
    ['nap', 1, 2], ['god', 1, 1], ['rat', 1, 1, { g: 'animal' }], ['bus', 1, 1], ['pots', 2, 2], ['peels', 3, 4], ['retool', 4, 5],
    ['sloop', 3, 4], ['spoons', 3, 4, { g: 'card game' }], ['denim', 3, 4, { g: 'fabric' }],
  ],
  words_from_dutch: [
    ['Santa Claus', 1, 2], ['skates', 2, 3], ['caboose', 3, 4], ['stoop', 3, 4, { g: 'porch' }], ['gherkin', 3, 4, { g: 'pickle' }],
    ['mannequin', 3, 4], ['bundle', 2, 5],
  ],
  words_from_arabic: [
    ['mosque', 2, 2], ['minaret', 3, 2], ['emir', 3, 2], ['caliph', 3, 2], ['hummus', 2, 2], ['falafel', 2, 2], ['souk', 3, 2],
    ['couscous', 2, 3], ['wadi', 4, 3], ['tahini', 3, 3], ['hookah', 3, 3, { g: 'water pipe' }], ['kohl', 4, 4], ['lute', 3, 4], ['alkali', 4, 4],
  ],
  words_from_persian: [
    ['shah', 3, 2], ['naan', 2, 2], ['chador', 4, 2], ['sitar', 3, 3], ['jackal', 2, 3], ['pilaf', 3, 3], ['satrap', 4, 4],
  ],
  words_from_turkish: [
    ['hamam', 4, 2], ['lokum', 4, 2], ['simit', 4, 2], ['kaftan', 3, 3], ['ayran', 4, 3], ['raki', 4, 3], ['kofta', 3, 3], ['sarma', 4, 3], ['meze', 3, 3],
  ],
  words_from_native_american_languages: [
    ['Mississippi', 1, 2, { g: 'state' }], ['Chicago', 1, 2, { g: 'city' }], ['Ohio', 1, 2, { g: 'state' }], ['Michigan', 2, 2],
    ['Texas', 1, 3], ['Canada', 1, 3], ['Manhattan', 2, 3, { g: 'island' }], ['Missouri', 2, 3, { g: 'state' }], ['Oklahoma', 2, 3],
    ['Niagara', 3, 4], ['wapiti', 4, 4], ['chinook', 3, 4, { g: 'salmon' }], ['woodchuck', 3, 4], ['hooch', 3, 4],
  ],
  words_from_nahuatl: [
    ['Mexico', 1, 2, { g: 'country' }], ['Aztec', 2, 2], ['chia', 2, 3], ['Quetzalcoatl', 3, 3, { g: 'god' }], ['Tenochtitlan', 4, 4],
    ['Popocatépetl', 4, 4], ['Tlaloc', 5, 5, { g: 'god' }], ['Xochimilco', 5, 5], ['huitlacoche', 3, 4],
  ],
  words_from_south_american_languages: [
    ['Inca', 2, 2], ['Machu Picchu', 2, 2], ['coca', 2, 3], ['pisco', 3, 4], ['mate', 3, 4, { g: 'drink' }], ['Titicaca', 3, 4, { type: 'place' }],
  ],
  words_named_after_people: [
    ['teddy bear', 1, 2], ['Ferris wheel', 2, 2], ['Morse code', 2, 2], ['Fahrenheit', 2, 2], ['Celsius', 2, 2, { g: 'unit' }],
    ['Kelvin', 3, 2, { g: 'unit' }], ['Molotov cocktail', 3, 3], ['Draconian', 3, 4], ['Machiavellian', 3, 4], ['Raglan', 3, 4, P], ['Pompadour', 3, 4],
  ],
  flowers_named_after_people: [
    ['fuchsia', 2, 2, { g: 'flower' }], ['narcissus', 3, 2, { g: 'flower' }], ['hyacinth', 2, 2], ['peony', 2, 3, { g: 'flower' }],
    ['iris', 2, 3, { g: 'flower' }], ['hosta', 3, 3], ['rafflesia', 4, 4],
  ],
};
