// Depth 4/5 words: Language & Wordplay chunk 1 (languages, number words, hidden words, silent letters, name sets).
const Lg = (t, r, i, o = {}) => [t, r, i, { type: 'proper', ...o }];   // language
const lang = (t, r, i, o = {}) => [t, r, i, { type: 'proper', g: 'language', ...o }];
const N = (t, r, i, o = {}) => [t, r, i, { type: 'proper', ...o }];     // first name
const S = (t, r, i, o = {}) => [t, r, i, { type: 'proper', g: 'surname', ...o }];
const C = (t, r, i, o = {}) => [t, r, i, { type: 'proper', g: 'Scottish clan', ...o }];
const Z = (t, r, i, o = {}) => [t, r, i, { type: 'proper', g: 'Chinese surname', ...o }];
const nf = g => (t, r, i, o = {}) => [t, r, i, { g, ...o }];
const fr = nf('French number'), de = nf('German number'), it = nf('Italian number'), ja = nf('Japanese number');
const al = (t, k, r, i, reg = [], o = {}) => [t, k, r, i, reg, { type: 'proper', ...o }];

export const THEMES = {
  romance_languages: { d: 1 }, germanic_languages: { d: 2 }, slavic_languages: { d: 3 }, languages_of_india: { d: 3 }, languages_of_china: { d: 4 },
  native_north_american_languages: { d: 4 }, indigenous_south_american_languages: { d: 5 },
  numbers_in_french: { d: 2 }, numbers_in_german: { d: 3 }, numbers_in_italian: { d: 3 }, numbers_in_japanese: { d: 3 },
  hidden_birds: { d: 4 }, hidden_insects: { d: 4 }, silent_k_words: { d: 2 }, silent_b_words: { d: 3 }, silent_w_words: { d: 3 }, silent_g_words: { d: 4 },
  flowers_named_after_people: { d: 4 },
  turkish_names: { d: 4 }, arabic_names: { d: 3 }, indian_names: { d: 3 }, japanese_names: { d: 3 }, latin_american_names: { d: 2 }, irish_names: { d: 3 }, russian_names: { d: 3 },
  surnames_that_are_jobs: { d: 2 }, scottish_clan_names: { d: 4 }, chinese_surnames: { d: 4 },
};

const jobs = { archer: 'medieval_jobs', baker: 'medieval_jobs', barber: 'service_jobs', brewer: 'food_jobs', carpenter: 'jobs', cartwright: 'medieval_jobs', chamberlain: 'feudal_ranks', chandler: 'medieval_jobs', collier: 'mining_words', draper: 'old_time_jobs', dyer: 'medieval_jobs', farmer: 'jobs', fletcher: 'medieval_jobs', fuller: 'medieval_jobs', hunter: 'head_blank', shepherd: 'medieval_jobs', skinner: 'medieval_jobs', smith: 'black_blank', tanner: 'medieval_jobs', thatcher: 'medieval_jobs', weaver: 'medieval_jobs' };
export const FIXES = [
  ...Object.entries(jobs).map(([j, t]) => ({ gloss: [j, t, 'job'] })),
  { gloss: ['slater', 'insects_and_bugs', 'woodlouse'] },
  { gloss: ['Buchanan', 'us_presidents', 'president'] }, { gloss: ['MacArthur', 'famous_generals', 'general'] }, { gloss: ['Cameron', 'unisex_names', 'name'] },
  { gloss: ['Dakota', 'names_that_are_places', 'name'] }, { gloss: ['maxwell', 'units_named_after_people', 'unit'] }, { gloss: ['munro', 'scottish_landscape_words', 'hill'] },
  { gloss: ['hay', 'meadow', 'dried grass'] }, { gloss: ['due', 'over_blank', 'owed'] }, { gloss: ['cent', 'coins', 'coin'] },
  { gloss: ['kyu', 'karate_words', 'karate grade'] }, { gloss: ['rei', 'karate_words', 'bow'] }, { gloss: ['trenta', 'size_labels', 'size'] },
  { gloss: ['null', 'coding_words', 'coding'] }, { gloss: ['yang', 'words_from_chinese', 'principle'] }, { gloss: ['ye', 'old_fashioned_english_words', 'old English'] },
  { gloss: ['sun', 'space', 'star'] }, { gloss: ['UN', 'international_organizations', 'United Nations'] }, { gloss: ['Otto', 'palindromes', 'name'] },
];

export const DATA = {
  romance_languages: [
    lang('French', 1, 1), lang('Spanish', 1, 1), lang('Italian', 1, 1), Lg('Portuguese', 1, 1), Lg('Romanian', 2, 2), Lg('Catalan', 3, 2),
    lang('Latin', 1, 4), Lg('Galician', 4, 3), Lg('Occitan', 4, 3, { al: [al('Provencal', 'synonym', 4, 4)] }), Lg('Sardinian', 4, 3), Lg('Corsican', 4, 3),
    Lg('Romansh', 5, 4, { al: [al('Rumantsch', 'spelling', 5, 5)] }), Lg('Walloon', 5, 5), Lg('Ladino', 5, 4, { al: [al('Judeo-Spanish', 'synonym', 5, 5)] }),
    Lg('Friulian', 5, 5), Lg('Sicilian', 4, 3, { g: 'language' }), Lg('Neapolitan', 4, 3, { g: 'language' }), Lg('Haitian Creole', 4, 4), Lg('Aromanian', 5, 5), Lg('Venetian', 4, 4, { g: 'language' }),
  ],
  germanic_languages: [
    lang('English', 1, 2), lang('German', 1, 1), lang('Dutch', 1, 1), Lg('Swedish', 1, 1), lang('Danish', 1, 1), lang('Norwegian', 1, 1), lang('Icelandic', 2, 2),
    Lg('Afrikaans', 3, 2), Lg('Yiddish', 3, 3), Lg('Frisian', 4, 3), Lg('Faroese', 4, 3), Lg('Luxembourgish', 4, 4), Lg('Flemish', 3, 3), Lg('Low German', 4, 4, { al: [al('Plattdeutsch', 'synonym', 5, 5)] }),
    Lg('Scots', 3, 4, { g: 'language' }), Lg('Old English', 3, 3), Lg('Old Norse', 3, 3), Lg('Gothic', 4, 4, { g: 'language' }), Lg('Swiss German', 3, 3), Lg('Norn', 5, 5),
  ],
  slavic_languages: [
    lang('Russian', 1, 1), lang('Polish', 2, 2), lang('Czech', 2, 2), Lg('Ukrainian', 1, 1), Lg('Serbian', 2, 2), Lg('Croatian', 2, 2), Lg('Bulgarian', 2, 2),
    Lg('Slovak', 3, 2), Lg('Slovene', 3, 3), Lg('Macedonian', 3, 3), Lg('Belarusian', 3, 3), Lg('Bosnian', 3, 3), Lg('Montenegrin', 4, 4), Lg('Sorbian', 5, 4),
    Lg('Kashubian', 5, 5), Lg('Rusyn', 5, 5), Lg('Silesian', 5, 5), Lg('Old Church Slavonic', 5, 5), Lg('Serbo-Croatian', 4, 3),
  ],
  languages_of_india: [
    Lg('Hindi', 1, 1), Lg('Bengali', 2, 2), Lg('Urdu', 2, 2), Lg('Tamil', 2, 2), Lg('Telugu', 3, 2), Lg('Punjabi', 2, 2), Lg('Gujarati', 3, 2), Lg('Marathi', 3, 2),
    Lg('Kannada', 3, 3), lang('Malayalam', 3, 3), Lg('Odia', 4, 4, { al: [al('Oriya', 'spelling', 4, 4)] }), Lg('Assamese', 4, 4), Lg('Sanskrit', 2, 3), Lg('Kashmiri', 4, 4),
    Lg('Sindhi', 4, 4), Lg('Konkani', 4, 4), Lg('Nepali', 3, 4), Lg('Maithili', 5, 5), Lg('Santali', 5, 5), Lg('Bhojpuri', 4, 5), Lg('Tulu', 5, 5), lang('Pali', 4, 4),
  ],
  languages_of_china: [
    Lg('Mandarin', 1, 1, { g: 'language' }), Lg('Cantonese', 2, 1), Lg('Hakka', 4, 3), Lg('Wu', 5, 4, { g: 'language' }), Lg('Min', 5, 5, { g: 'language' }), Lg('Shanghainese', 4, 3),
    Lg('Hokkien', 4, 4), Lg('Teochew', 5, 5), Lg('Xiang', 5, 5), Lg('Gan', 5, 5, { g: 'language' }), Lg('Tibetan', 3, 3), Lg('Uyghur', 4, 3), Lg('Zhuang', 5, 5),
    Lg('Mongolian', 3, 4), Lg('Putonghua', 4, 3), Lg('Hmong', 4, 4), Lg('Yi', 5, 5, { g: 'language' }), Lg('Taiwanese', 3, 4, { g: 'language' }), Lg('Manchu', 4, 4, { g: 'language' }),
  ],
  native_north_american_languages: [
    Lg('Navajo', 2, 1), Lg('Cherokee', 2, 1), Lg('Hopi', 3, 2), lang('Apache', 2, 2), Lg('Inuit', 3, 2), Lg('Cree', 3, 2), Lg('Sioux', 2, 2), Lg('Lakota', 3, 2),
    Lg('Dakota', 3, 3, { g: 'language' }), Lg('Ojibwe', 4, 3), Lg('Choctaw', 4, 3), Lg('Mohawk', 3, 3, { g: 'language' }), Lg('Cheyenne', 3, 3, { g: 'language' }),
    lang('Blackfoot', 4, 3), Lg('Shoshone', 4, 4), Lg('Comanche', 3, 3, { g: 'language' }), Lg('Pawnee', 4, 4, { g: 'language' }), Lg('Yupik', 5, 4), Lg('Algonquin', 4, 4, { g: 'language' }),
    Lg('Aleut', 5, 4), Lg('Haida', 5, 4), Lg('Tlingit', 5, 4), Lg('Zuni', 4, 4), Lg('Seminole', 4, 4, { g: 'language' }), Lg('Chickasaw', 5, 4), Lg("Mi'kmaq", 5, 4),
  ],
  indigenous_south_american_languages: [
    Lg('Quechua', 3, 1), Lg('Guarani', 3, 2), Lg('Aymara', 4, 2), Lg('Mapuche', 4, 3), Lg('Tupi', 4, 3), Lg('Wayuu', 5, 4), Lg('Yanomami', 4, 3), Lg('Shipibo', 5, 4),
    Lg('Kichwa', 5, 4), Lg('Mapudungun', 5, 4), Lg('Arawak', 5, 4), Lg('Tehuelche', 5, 5), Lg('Ticuna', 5, 5), Lg('Warao', 5, 5), Lg('Kayapo', 5, 5), Lg('Chibcha', 5, 5),
    Lg('Tucano', 5, 5, { g: 'language' }), Lg('Wichi', 5, 5), Lg('Qom', 5, 5), Lg('Guajajara', 5, 5), Lg('Carib', 4, 4, { g: 'language' }),
  ],

  numbers_in_french: [
    fr('un', 1, 1), fr('deux', 1, 1), fr('trois', 1, 1), fr('quatre', 2, 2), fr('cinq', 2, 2), fr('six', 1, 2), fr('sept', 2, 2), fr('huit', 2, 2), fr('neuf', 2, 2), fr('dix', 1, 2),
    fr('onze', 3, 3), fr('douze', 3, 3), fr('treize', 3, 3), fr('quatorze', 4, 4), fr('quinze', 3, 3), fr('seize', 3, 3), fr('vingt', 2, 3), fr('trente', 3, 3),
    fr('quarante', 3, 3), fr('cinquante', 3, 3), fr('soixante', 3, 3), fr('cent', 2, 3), fr('mille', 2, 3), fr('zero', 3, 3), fr('quatre-vingts', 4, 4), fr('soixante-dix', 4, 4),
  ],
  numbers_in_german: [
    de('eins', 2, 1), de('zwei', 2, 1), de('drei', 2, 1), de('vier', 2, 2), de('fünf', 2, 2), de('sechs', 2, 2), de('sieben', 2, 2), de('acht', 2, 2), de('neun', 2, 2), de('zehn', 2, 2),
    de('elf', 3, 3), de('zwölf', 3, 3), de('dreizehn', 3, 3), de('zwanzig', 3, 3), de('dreißig', 3, 3), de('vierzig', 3, 3), de('fünfzig', 3, 3), de('hundert', 2, 3),
    de('tausend', 3, 3), de('null', 3, 2), de('siebzig', 4, 4), de('achtzig', 4, 4), de('neunzig', 4, 4),
  ],
  numbers_in_italian: [
    it('uno', 1, 1), it('due', 1, 1), it('tre', 2, 2), it('quattro', 2, 2), it('cinque', 2, 2), it('sei', 2, 2), it('sette', 2, 2), it('otto', 2, 2), it('nove', 2, 2), it('dieci', 2, 2),
    it('undici', 3, 3), it('dodici', 3, 3), it('tredici', 3, 3), it('quattordici', 4, 4), it('quindici', 3, 3), it('sedici', 4, 4), it('venti', 3, 3), it('trenta', 3, 3),
    it('quaranta', 3, 3), it('cinquanta', 3, 3), it('cento', 2, 3), it('mille', 3, 3), it('zero', 2, 3), it('sessanta', 4, 4), it('settanta', 4, 4), it('ottanta', 4, 4), it('novanta', 4, 4),
  ],
  numbers_in_japanese: [
    ja('ichi', 2, 1), ja('ni', 2, 1), ja('san', 2, 1), ja('shi', 3, 2, { al: [['yon', 'synonym', 3, 3, [], { g: 'Japanese number' }]] }), ja('go', 2, 2), ja('roku', 3, 2),
    ja('shichi', 3, 3, { al: [['nana', 'synonym', 3, 3, [], { g: 'Japanese number' }]] }), ja('hachi', 3, 2), ja('kyu', 3, 3, { al: [['ku', 'synonym', 4, 4, [], { g: 'Japanese number' }]] }), ja('ju', 3, 3),
    ja('hyaku', 3, 3), ja('sen', 3, 3), ja('man', 3, 4), ja('rei', 4, 4), ja('zero', 3, 4), ja('ju-ichi', 4, 4), ja('ni-ju', 4, 4), ja('oku', 5, 5), ja('hitotsu', 4, 4), ja('futatsu', 4, 4), ja('mittsu', 5, 5),
  ],

  hidden_birds: [
    ['bowl', 1, 2, { g: 'dish' }], ['crown', 1, 2, { g: 'royal' }], ['regret', 1, 3], ['pattern', 1, 3, { g: 'sewing' }], ['howl', 1, 2, { g: 'animal sound' }], ['growl', 1, 2], ['prowl', 2, 2], ['scowl', 2, 2], ['towel', 1, 2], ['trowel', 2, 3],
    ['crowd', 1, 2, { g: 'people' }], ['crowbar', 2, 3], ['when', 1, 3, { g: 'conjunction' }], ['kitchen', 1, 4], ['steal', 1, 4, { g: 'rob' }], ['wrench', 2, 4], ['balloon', 1, 4, { g: 'party' }], ['saloon', 2, 4, { g: 'bar' }], ['baboon', 2, 5],
    ['brook', 2, 3], ['crooked', 1, 3], ['hibiscus', 3, 5], ['tomahawk', 3, 3, { g: 'axe' }], ['gullible', 3, 4], ['lantern', 2, 4], ['eastern', 2, 4], ['cistern', 3, 4], ['scoot', 2, 4], ['emulsion', 3, 5],
    ['moat', 2, 4], ['prowler', 3, 3], ['hawkish', 3, 4],
  ],
  hidden_insects: [
    ['giant', 1, 2, { g: 'creature' }], ['plant', 1, 2, { g: 'garden' }], ['pants', 1, 2, { g: 'clothing' }], ['elegant', 2, 3], ['chant', 1, 2, { g: 'music' }], ['mother', 1, 3], ['smother', 2, 3], ['sticky', 1, 3], ['ticket', 1, 3, { g: 'travel' }], ['bugle', 2, 2],
    ['beetle', 1, 2], ['beer', 1, 3], ['between', 1, 4, { g: 'preposition' }], ['beef', 1, 3], ['beech', 2, 4], ['flyer', 2, 3], ['police', 1, 4], ['malice', 2, 4], ['slice', 1, 4, { g: 'cut' }],
    ['dynamite', 2, 4], ['termite', 2, 3], ['marmite', 3, 5, { tm: true }], ['cognate', 3, 5], ['unit', 1, 4, { g: 'measure' }], ['granite', 2, 5], ['knit', 2, 5], ['antler', 2, 3], ['pliant', 4, 4], ['wasp', 2, 3],
    ['bugbear', 3, 3], ['defiant', 2, 4],
  ],

  silent_k_words: [
    ['knee', 1, 1], ['knife', 1, 1, { g: 'cutlery' }], ['knot', 1, 1, { g: 'tie' }], ['knight', 1, 1, { g: 'warrior' }], ['knock', 1, 1, { g: 'door' }], ['know', 1, 1], ['knit', 1, 1], ['knob', 2, 1, { g: 'handle' }], ['knuckle', 2, 1], ['knack', 3, 2],
    ['knead', 2, 2], ['kneel', 2, 2], ['knave', 3, 3, { g: 'rogue' }], ['knell', 4, 3], ['knickers', 2, 2], ['knapsack', 3, 2], ['knoll', 4, 4], ['knowledge', 1, 2], ['knickknack', 3, 3],
    ['knurl', 5, 5], ['knobbly', 3, 3], ['knitwear', 3, 3], ['knighthood', 3, 3], ['Knossos', 4, 5, { type: 'place' }],
  ],
  silent_b_words: [
    ['lamb', 1, 1, { g: 'animal' }], ['thumb', 1, 1], ['debt', 1, 2], ['climb', 1, 1], ['comb', 1, 1, { g: 'hair tool' }], ['tomb', 1, 2], ['bomb', 1, 2], ['doubt', 1, 2], ['plumber', 1, 2], ['crumb', 1, 2],
    ['numb', 1, 2], ['dumb', 1, 2], ['limb', 1, 2], ['womb', 2, 3], ['subtle', 2, 3], ['jamb', 3, 4], ['succumb', 3, 3], ['aplomb', 4, 4], ['dumbbell', 2, 3], ['redoubt', 4, 5],
    ['indebted', 3, 4], ['catacomb', 3, 4], ['coxswain', 4, 5], ['bdellium', 5, 5], ['crumbs', 1, 2], ['numbskull', 4, 4],
  ],
  silent_w_words: [
    ['write', 1, 1], ['wrist', 1, 1], ['sword', 1, 1, { g: 'weapon' }], ['answer', 1, 1, { g: 'reply' }], ['wrong', 1, 1], ['wrap', 1, 1, { g: 'gift' }], ['wreck', 1, 1], ['wring', 2, 2], ['wrench', 2, 2], ['wren', 2, 3, { g: 'bird' }],
    ['wrinkle', 1, 2], ['two', 1, 2], ['who', 1, 3, { g: 'pronoun' }], ['whole', 1, 3], ['whose', 1, 3, { g: 'pronoun' }], ['wrath', 3, 2], ['wrestle', 2, 2], ['wrangle', 3, 3], ['wreath', 2, 2], ['wretch', 3, 3],
    ['wry', 3, 3], ['playwright', 2, 3], ['awry', 3, 4], ['wraith', 3, 3], ['wrapper', 1, 2], ['Warwick', 3, 5, { type: 'place' }], ['Norwich', 3, 5, { type: 'place' }], ['wrack', 4, 4],
  ],
  silent_g_words: [
    ['gnome', 1, 1, { g: 'fantasy' }], ['gnat', 2, 1], ['gnaw', 2, 1], ['gnu', 3, 2], ['gnash', 3, 2], ['sign', 1, 2, { g: 'notice' }], ['design', 1, 3], ['foreign', 1, 3], ['reign', 2, 3], ['campaign', 2, 3, { g: 'election' }],
    ['benign', 3, 4], ['align', 2, 3], ['resign', 2, 3], ['champagne', 1, 3, { g: 'drink' }], ['cologne', 3, 4, { g: 'perfume' }], ['gnarl', 4, 3], ['gnocchi', 3, 3], ['phlegm', 3, 4], ['paradigm', 3, 4], ['diaphragm', 3, 4, { g: 'body' }],
    ['sovereign', 3, 4, { g: 'ruler' }], ['feign', 3, 4], ['deign', 4, 4], ['assign', 2, 4], ['consign', 4, 5], ['impugn', 5, 5], ['lasagne', 2, 4], ['poignant', 3, 4], ['gnostic', 5, 4], ['gnomic', 5, 4],
  ],

  flowers_named_after_people: [
    ['magnolia', 2, 3], ['dahlia', 2, 3], ['begonia', 2, 3], ['poinsettia', 2, 3], ['fuchsia', 2, 3], ['camellia', 2, 4], ['gardenia', 2, 4], ['wisteria', 2, 4, { g: 'flower' }], ['forsythia', 3, 4],
    ['zinnia', 3, 3], ['lobelia', 3, 4], ['freesia', 3, 4], ['gerbera', 3, 4], ['buddleia', 4, 4, { al: [['buddleja', 'spelling', 4, 5]] }], ['weigela', 4, 4], ['bougainvillea', 3, 4],
    ['plumeria', 4, 4], ['gloxinia', 4, 4], ['deutzia', 5, 5], ['rudbeckia', 4, 4], ['banksia', 4, 4], ['nicotiana', 4, 5], ['clarkia', 5, 5], ['stokesia', 5, 5], ['gaillardia', 5, 5],
    ['matthiola', 5, 5], ['lewisia', 5, 5], ['kerria', 5, 5], ['escallonia', 5, 5], ['cattleya', 4, 4], ['tradescantia', 4, 5],
  ],

  turkish_names: [
    N('Mehmet', 2, 1), N('Ayse', 3, 1), N('Elif', 3, 1), N('Emre', 4, 2), N('Zeynep', 3, 1), N('Mustafa', 2, 2), N('Fatma', 3, 2), N('Ahmet', 3, 2), N('Hasan', 3, 3), N('Yusuf', 3, 3),
    N('Murat', 4, 2), N('Burak', 4, 2), N('Deniz', 4, 3), N('Selin', 4, 2), N('Merve', 4, 2), N('Ece', 5, 3), N('Cem', 5, 3), N('Kemal', 3, 2), N('Orhan', 4, 3),
    N('Ozlem', 5, 3), N('Tolga', 5, 3), N('Seda', 5, 3), N('Gizem', 5, 3), N('Baris', 5, 4), N('Ibrahim', 2, 4), N('Suleyman', 3, 3), N('Hulya', 5, 4), N('Ismail', 3, 4),
  ],
  arabic_names: [
    N('Omar', 2, 1), N('Fatima', 2, 1, { g: 'name' }), N('Layla', 2, 1), N('Khalid', 3, 1), N('Yasmin', 2, 2), N('Ahmed', 2, 1), N('Mohammed', 1, 1), N('Ali', 1, 2, { g: 'name' }), N('Hassan', 2, 2),
    N('Zainab', 3, 2), N('Aisha', 2, 2), N('Samir', 3, 2), N('Karim', 3, 2), N('Nadia', 2, 3), N('Rashid', 3, 3), N('Amira', 3, 3), N('Tariq', 3, 3), N('Salma', 3, 3), N('Youssef', 3, 3),
    N('Hamza', 3, 3), N('Leila', 2, 3), N('Jamal', 3, 3), N('Nour', 4, 3), N('Malik', 3, 4, { g: 'name' }), N('Faisal', 3, 3), N('Rania', 4, 3), N('Imran', 3, 4), N('Sami', 4, 4, { g: 'name' }), N('Mariam', 3, 3),
    N('Bashir', 4, 4),
  ],
  indian_names: [
    N('Priya', 2, 1), N('Arjun', 3, 1), N('Anjali', 3, 2), N('Rahul', 3, 1), N('Vikram', 3, 2), N('Raj', 2, 1, { g: 'name' }), N('Amit', 3, 2), N('Neha', 3, 2), N('Sanjay', 3, 2),
    N('Deepak', 3, 2), N('Pooja', 3, 2), N('Ravi', 3, 2), N('Sunita', 4, 2), N('Aditya', 3, 3), N('Kavita', 4, 3), N('Rohan', 3, 3), N('Divya', 4, 3), N('Ananya', 4, 3), N('Suresh', 4, 3),
    N('Meera', 3, 3), N('Krishna', 2, 3, { g: 'name' }), N('Lakshmi', 3, 3, { g: 'name' }), N('Gopal', 4, 4), N('Ishaan', 4, 4), N('Nikhil', 4, 3), N('Shreya', 4, 3), N('Vivek', 4, 3), N('Aarav', 4, 4), N('Devi', 4, 4),
  ],
  japanese_names: [
    N('Hiroshi', 2, 1), N('Yuki', 3, 1), N('Sakura', 2, 1, { g: 'name' }), N('Kenji', 3, 1), N('Akira', 2, 1, { g: 'name' }), N('Takeshi', 3, 2), N('Haruto', 4, 2), N('Hana', 2, 2, { g: 'name' }),
    N('Satoshi', 3, 2), N('Kazuo', 4, 3), N('Naoko', 4, 3), N('Keiko', 4, 3), N('Emiko', 4, 3), N('Taro', 3, 2), N('Hanako', 4, 2), N('Ichiro', 3, 3), N('Yoko', 2, 2), N('Kaito', 4, 3),
    N('Rin', 3, 3, { g: 'name' }), N('Sora', 3, 4, { g: 'name' }), N('Ren', 4, 3, { g: 'name' }), N('Mei', 3, 4, { g: 'name' }), N('Masashi', 5, 4), N('Haruka', 4, 3), N('Daisuke', 4, 3), N('Kenta', 5, 4), N('Tomoko', 4, 3),
  ],
  latin_american_names: [
    N('Mateo', 2, 1), N('Camila', 2, 1), N('Santiago', 2, 1, { g: 'name' }), N('Valentina', 2, 1), N('Sofia', 2, 2), N('Diego', 1, 1), N('Carlos', 1, 1), N('Maria', 1, 1), N('Jose', 1, 1),
    N('Isabella', 2, 2), N('Lucia', 2, 2), N('Alejandro', 2, 2), N('Juan', 1, 1), N('Pedro', 1, 2), N('Luis', 1, 2), N('Miguel', 1, 2), N('Gabriela', 2, 2), N('Javier', 2, 2), N('Fernando', 2, 2),
    N('Carmen', 1, 3), N('Rodrigo', 3, 2), N('Ximena', 4, 3), N('Emiliano', 4, 3), N('Catalina', 3, 3), N('Sebastian', 2, 3), N('Andres', 3, 3), N('Esperanza', 3, 3), N('Paloma', 3, 4, { g: 'name' }),
    N('Xavier', 3, 4),
  ],
  irish_names: [
    N('Niamh', 3, 1), N('Siobhan', 3, 1), N('Saoirse', 3, 1), N('Declan', 3, 1), N('Oisin', 4, 2), N('Patrick', 1, 1, { g: 'name' }), N('Seamus', 3, 1), N('Aoife', 3, 1), N('Colm', 4, 2), N('Brigid', 3, 2, { g: 'name' }),
    N('Padraig', 4, 2), N('Ciaran', 4, 2), N('Eamon', 4, 2), N('Fionn', 4, 3), N('Cian', 4, 3), N('Roisin', 4, 2), N('Sinead', 3, 2), N('Caoimhe', 5, 3), N('Clodagh', 4, 3), N('Cormac', 4, 3),
    N('Eoin', 4, 3), N('Dermot', 3, 3), N('Fergal', 4, 3), N('Maeve', 3, 3), N('Brendan', 2, 3), N('Rory', 2, 4, { g: 'name' }), N('Tadhg', 5, 4), N('Orla', 3, 3), N('Una', 4, 4), N('Liam', 1, 4),
    N('Aisling', 4, 3),
  ],
  russian_names: [
    N('Ivan', 2, 1), N('Olga', 2, 1), N('Natasha', 2, 1), N('Dmitri', 3, 1), N('Svetlana', 3, 1), N('Vladimir', 2, 1), N('Boris', 2, 2), N('Sergei', 3, 2), N('Anastasia', 2, 2), N('Nikolai', 3, 2),
    N('Katya', 3, 2), N('Mikhail', 3, 2), N('Alexei', 3, 2), N('Tatiana', 3, 2), N('Yuri', 3, 2), N('Igor', 3, 2), N('Vasily', 4, 3), N('Galina', 4, 3), N('Pavel', 3, 3), N('Irina', 3, 3),
    N('Oleg', 4, 3), N('Vera', 3, 4, { g: 'name' }), N('Anya', 3, 3), N('Misha', 4, 3), N('Sasha', 3, 4), N('Nadezhda', 4, 3), N('Leonid', 4, 3), N('Zoya', 4, 4), N('Grigori', 4, 4), N('Ludmila', 4, 3),
    N('Vanya', 4, 3),
  ],

  surnames_that_are_jobs: [
    S('Smith', 1, 1), S('Baker', 1, 1), S('Cooper', 2, 2), S('Thatcher', 2, 2), S('Fletcher', 3, 2), S('Taylor', 1, 2), S('Miller', 1, 2), S('Carter', 1, 2), S('Mason', 1, 2), S('Turner', 1, 3),
    S('Fisher', 1, 2), S('Cook', 1, 2), S('Butcher', 1, 2), S('Weaver', 2, 2), S('Wright', 2, 3), S('Archer', 2, 2), S('Chandler', 2, 3), S('Fuller', 3, 4), S('Sawyer', 2, 2), S('Tanner', 3, 3),
    S('Hunter', 1, 2), S('Shepherd', 2, 2), S('Carpenter', 1, 2), S('Farmer', 1, 2), S('Brewer', 3, 3), S('Potter', 1, 2), S('Glover', 3, 3), S('Porter', 2, 3), S('Skinner', 3, 3),
    S('Slater', 3, 3), S('Draper', 4, 3), S('Barber', 2, 3), S('Bowman', 3, 4), S('Cartwright', 3, 4), S('Wainwright', 4, 4), S('Mercer', 4, 4), S('Dyer', 4, 4), S('Tyler', 2, 3), S('Gardner', 2, 3),
    S('Hooper', 4, 4), S('Joiner', 4, 4), S('Collier', 4, 4), S('Marshall', 2, 4), S('Chamberlain', 3, 4),
  ],
  scottish_clan_names: [
    C('Campbell', 2, 1), C('MacDonald', 2, 1), C('Stewart', 2, 1), C('Fraser', 3, 2), C('MacLeod', 3, 2), C('Murray', 2, 3), C('Gordon', 2, 3), C('Douglas', 2, 3), C('Cameron', 2, 3),
    C('Grant', 1, 3), C('MacKenzie', 3, 2), C('Munro', 3, 3), C('Sinclair', 3, 3), C('Ross', 1, 4), C('Robertson', 2, 4), C('Buchanan', 3, 3), C('Wallace', 2, 3), C('Bruce', 1, 4),
    C('MacGregor', 3, 2), C('Hamilton', 2, 4), C('MacLean', 4, 3), C('Kerr', 4, 4), C('Armstrong', 2, 4), C('Maxwell', 3, 4), C('Ferguson', 3, 4), C('Lindsay', 3, 4), C('Drummond', 4, 4),
    C('Graham', 2, 4), C('MacKay', 4, 3), C('Menzies', 5, 4), C('Hay', 4, 5), C('Carnegie', 4, 5), C('MacArthur', 4, 3), C('Scott', 1, 4), C('Johnstone', 4, 4),
  ],
  chinese_surnames: [
    Z('Wang', 2, 1), Z('Li', 2, 1), Z('Zhang', 2, 1), Z('Chen', 2, 1), Z('Liu', 2, 1), Z('Yang', 3, 2), Z('Huang', 3, 2), Z('Zhao', 3, 2), Z('Wu', 3, 2), Z('Zhou', 3, 3),
    Z('Xu', 4, 3), Z('Sun', 2, 4), Z('Ma', 3, 3), Z('Zhu', 4, 3), Z('Hu', 4, 3), Z('Guo', 4, 3), Z('He', 3, 4), Z('Lin', 3, 3), Z('Gao', 4, 4), Z('Luo', 4, 4), Z('Zheng', 4, 4),
    Z('Liang', 4, 4), Z('Xie', 4, 4), Z('Tang', 3, 4), Z('Han', 3, 4), Z('Deng', 4, 4), Z('Feng', 4, 4), Z('Cao', 4, 4), Z('Peng', 4, 4), Z('Zeng', 5, 5), Z('Xiao', 4, 4),
    Z('Tian', 4, 4), Z('Dong', 4, 4), Z('Yuan', 4, 4), Z('Pan', 3, 4), Z('Yu', 4, 4), Z('Jiang', 4, 4), Z('Cai', 5, 5), Z('Lu', 4, 4), Z('Wei', 4, 4), Z('Ye', 4, 4), Z('Su', 5, 5),
  ],
};
