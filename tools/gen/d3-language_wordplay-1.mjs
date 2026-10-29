// Generated word data: Language & Wordplay, chunk 1 (languages, alphabets and writing, grammar).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const L = (t, r, i, o = {}) => [t, r, i, { type: 'proper', ...o }];
const la = (t, k, r, i, reg = [], o = {}) => [t, k, r, i, reg, { ...o }];
const G = g => (t, r, i, o = {}) => [t, r, i, { g, ...o }];
const other = (g, o = {}) => (t, r, i, o2 = {}) => [t, r, i, { g, pos: 'other', ...o, ...o2 }];
const gram = G('grammar');
const pos_ = G('part of speech');
const pron = other('pronoun');
const prep = other('preposition');
const conj = other('conjunction');
const intj = other('interjection');
const past = (t, r, i, o = {}) => [t, r, i, { g: 'past tense', pos: 'verb', ...o }];
const plur = (t, r, i, o = {}) => [t, r, i, { g: 'plural', ...o }];
const font = (t, r, i, o = {}) => [t, r, i, { g: 'font', type: 'proper', ...o }];
const typo = G('typography');
const sym = G('symbol');
const punc = G('punctuation');
const glet = G('Greek letter');
const nato = (t, r, i, o = {}) => [t, r, i, { g: 'phonetic alphabet', type: 'proper', ...o }];

export const THEMES = {
  european_languages: { d: 1 },
  asian_languages: { d: 2 },
  african_languages: { d: 3 },
  middle_eastern_languages: { d: 3 },
  turkic_languages: { d: 5 },
  pacific_languages: { d: 4 },
  ancient_languages: { d: 3 },
  languages_of_the_americas: { d: 3 },
  codes_and_signals: { d: 2 },
  constructed_languages: { d: 3 },
  greek_letters: { d: 2, complete: true, note: 'the 24 letters: alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega' },
  phonetic_alphabet: { d: 2, complete: true, note: 'the 26 NATO code words: Alpha Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu' },
  punctuation: { d: 1 },
  keyboard_symbols: { d: 2 },
  writing_systems: { d: 4 },
  handwriting_words: { d: 3 },
  typography_words: { d: 4 },
  fonts: { d: 3, tm: true },
  things_you_read: { d: 1 },
  parts_of_speech: { d: 2, complete: true, note: 'the nine parts of speech: noun verb adjective adverb pronoun preposition conjunction interjection determiner' },
  grammar_terms: { d: 3 },
  tenses: { d: 3 },
  sentence_parts: { d: 4 },
  pronouns: { d: 2 },
  prepositions: { d: 2 },
  conjunctions: { d: 3 },
  interjections: { d: 2 },
  irregular_past_tenses: { d: 3 },
  irregular_plurals: { d: 3 },
  figures_of_speech: { d: 4, lang: true },
};

export const DATA = {
  // ---------------------------------------------------------------- european languages
  european_languages: [
    L('French', 1, 1), L('German', 1, 1), L('Spanish', 1, 1), L('Italian', 1, 1), L('Russian', 1, 1), L('Portuguese', 1, 1), L('Dutch', 1, 1), L('Greek', 1, 2),
    L('Swedish', 1, 1), L('Polish', 2, 1, { g: 'language' }), L('Danish', 2, 1, { g: 'language' }), L('Norwegian', 2, 1), L('Finnish', 2, 2), L('Welsh', 2, 2), L('Irish', 2, 2, { g: 'language' }), L('Hungarian', 2, 2),
    L('Czech', 2, 2, { g: 'language' }), L('Romanian', 2, 2), L('Ukrainian', 2, 2), L('Icelandic', 2, 2), L('Bulgarian', 3, 3), L('Serbian', 3, 3), L('Croatian', 3, 3), L('Catalan', 3, 3),
    L('Basque', 3, 3), L('Scots Gaelic', 3, 3), L('Slovak', 3, 3), L('Lithuanian', 3, 3), L('Latvian', 3, 3), L('Estonian', 3, 3), L('Albanian', 3, 3), L('Maltese', 3, 3),
    L('Breton', 4, 4, { g: 'language' }), L('Cornish', 4, 4, { g: 'language' }), L('Frisian', 4, 4), L('Galician', 4, 4), L('Luxembourgish', 4, 4), L('Occitan', 4, 5), L('Faroese', 4, 4), L('Manx', 4, 4),
    L('Slovene', 4, 4), L('Macedonian', 4, 4), L('Sorbian', 5, 5), L('Romansh', 5, 5), L('Sami', 4, 4, { g: 'language', al: [la('Lappish', 'synonym', 5, 5)] }),
  ].map(r => r[0] === 'German' ? r : r),

  // ---------------------------------------------------------------- asian languages
  asian_languages: [
    L('Chinese', 1, 1), L('Mandarin', 1, 1, { al: [la('Putonghua', 'synonym', 4, 4)] }), L('Japanese', 1, 1), L('Korean', 1, 1), L('Hindi', 1, 1), L('Cantonese', 2, 2),
    L('Thai', 2, 2, { g: 'language' }), L('Vietnamese', 2, 2), L('Tagalog', 2, 2, { al: [la('Filipino', 'synonym', 2, 2)] }), L('Indonesian', 2, 2), L('Malay', 2, 2, { g: 'language' }), L('Bengali', 2, 2),
    L('Urdu', 2, 2), L('Punjabi', 2, 2), L('Tamil', 3, 3), L('Telugu', 3, 3), L('Marathi', 3, 3), L('Gujarati', 3, 3), L('Nepali', 3, 3), L('Burmese', 3, 3),
    L('Khmer', 3, 3), L('Mongolian', 3, 3), L('Tibetan', 3, 3), L('Sinhala', 3, 3, { al: [la('Sinhalese', 'synonym', 3, 3)] }), L('Hokkien', 4, 4), L('Javanese', 4, 4),
    L('Kannada', 4, 4), L('Malayalam', 4, 4), L('Lao', 4, 4), L('Hmong', 4, 4), L('Cebuano', 4, 4), L('Hakka', 4, 4), L('Sindhi', 4, 4), L('Assamese', 4, 4),
    L('Odia', 5, 5), L('Dzongkha', 5, 5), L('Kashmiri', 5, 5), L('Sundanese', 5, 5),
  ],

  // ---------------------------------------------------------------- african languages
  african_languages: [
    L('Swahili', 1, 2, { al: [la('Kiswahili', 'synonym', 4, 4)] }), L('Zulu', 2, 2), L('Afrikaans', 2, 2), L('Xhosa', 3, 2), L('Yoruba', 3, 3), L('Igbo', 3, 3),
    L('Hausa', 3, 3), L('Amharic', 3, 3), L('Somali', 3, 3, { g: 'language' }), L('Shona', 3, 3), L('Sesotho', 4, 4), L('Tswana', 4, 4, { al: [la('Setswana', 'synonym', 5, 5)] }),
    L('Wolof', 4, 4), L('Lingala', 4, 4), L('Twi', 4, 4), L('Oromo', 4, 4), L('Tigrinya', 4, 4), L('Kinyarwanda', 4, 4), L('Malagasy', 4, 3),
    L('Fula', 4, 4, { al: [la('Fulani', 'synonym', 4, 4)] }), L('Ndebele', 4, 4), L('Swazi', 4, 4), L('Luganda', 4, 4), L('Kikuyu', 4, 4), L('Chichewa', 4, 4),
    L('Bambara', 5, 5), L('Tsonga', 5, 5), L('Venda', 5, 5), L('Berber', 4, 4, { al: [la('Tamazight', 'synonym', 5, 5), la('Amazigh', 'synonym', 5, 5)] }),
    L('Kirundi', 5, 5), L('Akan', 5, 5), L('Kongo', 5, 5), L('Tswana', 4, 4),
  ].filter((r, i, a) => a.findIndex(x => x[0] === r[0]) === i),

  // ---------------------------------------------------------------- middle eastern languages
  middle_eastern_languages: [
    L('Arabic', 1, 1), L('Hebrew', 1, 1), L('Persian', 2, 2, { al: [la('Farsi', 'synonym', 2, 2)] }), L('Turkish', 2, 3), L('Kurdish', 3, 3), L('Aramaic', 3, 3),
    L('Pashto', 3, 4), L('Armenian', 3, 4), L('Georgian', 3, 4, { g: 'language' }), L('Dari', 4, 4), L('Syriac', 4, 4), L('Assyrian', 4, 4), L('Balochi', 5, 5), L('Tajik', 4, 5),
    L('Ladino', 4, 4), L('Kurmanji', 5, 5), L('Sorani', 5, 5), L('Azerbaijani', 4, 4, { al: [la('Azeri', 'synonym', 4, 4)] }), L('Luri', 5, 5), L('Mehri', 5, 5),
    L('Hebrew', 1, 1),
  ].filter((r, i, a) => a.findIndex(x => x[0] === r[0]) === i),

  // ---------------------------------------------------------------- turkic languages
  turkic_languages: [
    L('Turkish', 2, 2), L('Azerbaijani', 4, 3, { al: [la('Azeri', 'synonym', 4, 4)] }), L('Kazakh', 3, 3), L('Uzbek', 3, 3), L('Turkmen', 4, 3), L('Kyrgyz', 4, 3),
    L('Uyghur', 4, 4), L('Tatar', 4, 4), L('Bashkir', 5, 5), L('Chuvash', 5, 5), L('Yakut', 5, 5, { al: [la('Sakha', 'synonym', 5, 5)] }), L('Gagauz', 5, 5),
    L('Karakalpak', 5, 5), L('Crimean Tatar', 5, 5), L('Tuvan', 5, 5), L('Altai', 5, 5), L('Khakas', 5, 5), L('Karachay', 5, 5), L('Kumyk', 5, 5), L('Nogai', 5, 5),
    L('Salar', 5, 5), L('Khalaj', 5, 5), L('Qashqai', 5, 5), L('Dolgan', 5, 5), L('Shor', 5, 5),
  ],

  // ---------------------------------------------------------------- pacific languages
  pacific_languages: [
    L('Hawaiian', 2, 2), L('Maori', 2, 2, { al: [la('Te Reo', 'synonym', 4, 4, ['NZ'])] }), L('Samoan', 3, 3), L('Tongan', 3, 3), L('Fijian', 3, 3), L('Tahitian', 3, 3),
    L('Tok Pisin', 4, 4), L('Bislama', 4, 4), L('Chamorro', 4, 4), L('Marshallese', 4, 4), L('Palauan', 5, 5), L('Tuvaluan', 5, 5), L('Niuean', 5, 5),
    L('Rarotongan', 5, 5), L('Gilbertese', 5, 5), L('Nauruan', 5, 5), L('Hiri Motu', 5, 5), L('Pohnpeian', 5, 5), L('Chuukese', 5, 5), L('Yapese', 5, 5),
    L('Rapa Nui', 4, 4), L('Tokelauan', 5, 5), L('Wallisian', 5, 5), L('Futunan', 5, 5), L('Kosraean', 5, 5), L('Pitjantjatjara', 5, 5), L('Warlpiri', 5, 5),
    L('Hawaiian Pidgin', 5, 5), L('Solomon Pijin', 5, 5), L('Kanak', 5, 5),
  ],

  // ---------------------------------------------------------------- ancient languages
  ancient_languages: [
    L('Latin', 1, 1), L('Ancient Greek', 2, 2), L('Sanskrit', 2, 2), L('Old English', 2, 2), L('Egyptian', 2, 3, { g: 'ancient language' }),
    L('Hebrew', 1, 3), L('Aramaic', 3, 3), L('Sumerian', 3, 3), L('Akkadian', 4, 4), L('Old Norse', 3, 3), L('Gothic', 3, 3, { g: 'ancient language' }),
    L('Hittite', 4, 4), L('Etruscan', 3, 3), L('Phoenician', 3, 3), L('Coptic', 4, 4), L('Pali', 4, 4), L('Avestan', 5, 5), L('Old Persian', 4, 4),
    L('Babylonian', 3, 3), L('Ugaritic', 5, 5), L('Minoan', 4, 4), L('Middle English', 3, 3), L('Old French', 3, 3), L('Classical Greek', 3, 3),
    L('Koine Greek', 4, 4), L('Vedic', 5, 5), L('Oscan', 5, 5), L('Umbrian', 5, 5), L('Punic', 4, 4), L('Tocharian', 5, 5), L('Elamite', 5, 5),
    L('Pictish', 4, 4), L('Proto-Indo-European', 4, 4, { type: 'proper' }), L('Old Church Slavonic', 5, 5),
  ].map(r => r[0] === 'Hebrew' ? ['Hebrew', 1, 3, { type: 'proper' }] : r),

  // ---------------------------------------------------------------- languages of the americas
  languages_of_the_americas: [
    L('Spanish', 1, 3), L('Portuguese', 1, 3), L('Navajo', 3, 3), L('Cherokee', 3, 3), L('Cree', 3, 3), L('Inuktitut', 4, 3), L('Quechua', 3, 3), L('Guarani', 3, 3),
    L('Nahuatl', 4, 3), L('Mayan', 3, 3), L('Aymara', 4, 4), L('Mapuche', 4, 4), L('Haitian Creole', 3, 3), L('Ojibwe', 4, 4), L('Lakota', 4, 4),
    L('Apache', 3, 3, { g: 'language' }), L('Hopi', 4, 4), L('Mohawk', 4, 4, { g: 'language' }), L('Mixtec', 5, 5), L('Zapotec', 5, 5), L('Greenlandic', 4, 4),
    L('Choctaw', 4, 4), L('Cheyenne', 4, 4, { g: 'language' }), L('Blackfoot', 4, 4, { g: 'language' }), L('Tupi', 5, 5), L('Papiamento', 5, 5), L('Yupik', 5, 5),
    L('Comanche', 4, 4, { g: 'language' }), L('Haida', 5, 5), L('Tlingit', 5, 5), L('Shoshone', 5, 5), L('Arapaho', 5, 5), L('Kichwa', 5, 5), L('Yucatec', 5, 5),
    L('Seneca', 5, 5, { g: 'language' }), L('Inuit', 4, 4, { al: [la('Inuktun', 'synonym', 5, 5)] }),
  ],

  // ---------------------------------------------------------------- codes and signals
  codes_and_signals: [
    ['Morse code', 1, 1, { type: 'proper' }], ['SOS', 1, 1, { type: 'acronym' }], ['Braille', 2, 2, { type: 'proper', al: [['braille', 'spelling', 2, 2]] }],
    ['sign language', 1, 2], ['smoke signal', 2, 1, { al: [['smoke signals', 'synonym', 2, 2]] }], ['semaphore', 3, 2], ['barcode', 1, 3], ['QR code', 1, 3, { type: 'proper' }],
    ['binary', 2, 3, { g: 'code' }], ['ASCII', 3, 3, { type: 'acronym' }], ['Unicode', 3, 3, { type: 'proper' }], ['Caesar cipher', 3, 2, { type: 'proper' }],
    ['Enigma', 3, 3, { g: 'cipher machine', type: 'proper' }], ['flag signals', 3, 3, { g: 'code' }], ['mayday', 2, 3, { g: 'distress call' }],
    ['Pig Latin', 2, 4, { type: 'proper', note: 'a language game' }], ['pigpen cipher', 4, 4], ['Vigenere cipher', 5, 4, { type: 'proper' }], ['Rot13', 4, 4, { type: 'proper' }],
    ['heliograph', 4, 4], ['Aldis lamp', 5, 5, { type: 'proper' }], ['signal flags', 3, 3, { g: 'code' }], ['hex', 3, 4, { g: 'code' }], ['tap code', 4, 4],
    ['one-time pad', 4, 4], ['Polybius square', 5, 5, { type: 'proper' }], ['Atbash', 5, 5, { type: 'proper' }], ['Playfair cipher', 5, 5, { type: 'proper' }],
    ['telegraph', 2, 3], ['bugle call', 3, 3], ['lighthouse flash', 4, 5, { g: 'signal' }], ['hobo signs', 5, 5], ['Navajo code', 4, 4, { type: 'proper' }],
    ['zip code', 1, 4, { g: 'postal' }], ['Morse key', 4, 4, { type: 'proper' }],
  ],

  // ---------------------------------------------------------------- constructed languages
  constructed_languages: [
    ['Esperanto', 2, 1, { type: 'proper' }], ['Klingon', 1, 2, { type: 'proper', tm: true }], ['Elvish', 2, 2, { type: 'proper', tm: true }],
    ['Sindarin', 4, 3, { type: 'proper', tm: true }], ['Quenya', 4, 4, { type: 'proper', tm: true }], ['Dothraki', 3, 3, { type: 'proper', tm: true }],
    ['Valyrian', 4, 3, { type: 'proper', tm: true }], ["Na'vi", 3, 3, { type: 'proper', tm: true }], ['Newspeak', 3, 3, { type: 'proper', tm: true }],
    ['Volapuk', 4, 4, { type: 'proper' }], ['Interlingua', 5, 4, { type: 'proper' }], ['Ido', 5, 5, { type: 'proper' }],
    ['Lojban', 5, 5, { type: 'proper' }], ['Toki Pona', 5, 4, { type: 'proper' }], ['Solresol', 5, 5, { type: 'proper' }],
    ['Novial', 5, 5, { type: 'proper' }], ['Interlingue', 5, 5, { type: 'proper' }], ['Ithkuil', 5, 5, { type: 'proper' }],
    ['Loglan', 5, 5, { type: 'proper' }], ['Glosa', 5, 5, { type: 'proper' }], ['Parseltongue', 2, 3, { type: 'proper', tm: true }],
    ['Nadsat', 4, 4, { type: 'proper', tm: true }], ['Minionese', 3, 4, { type: 'proper', tm: true }], ['Simlish', 3, 3, { type: 'proper', tm: true }],
    ['Basic English', 4, 4, { type: 'proper' }], ['Blissymbols', 5, 5, { type: 'proper' }], ['Kotava', 5, 5, { type: 'proper' }],
    ['Lingua Franca Nova', 5, 5, { type: 'proper' }], ['Laadan', 5, 5, { type: 'proper' }], ['Black Speech', 4, 4, { type: 'proper', tm: true }],
    ['Huttese', 3, 3, { type: 'proper', tm: true }], 
  ],

  // ---------------------------------------------------------------- greek letters
  greek_letters: [
    glet('alpha', 1, 1), glet('beta', 1, 1), glet('gamma', 2, 1), glet('delta', 2, 1), glet('omega', 1, 1), glet('pi', 1, 2), glet('sigma', 2, 2), glet('lambda', 2, 2),
    glet('theta', 3, 2), glet('epsilon', 3, 2), glet('phi', 3, 2), glet('psi', 3, 3), glet('mu', 3, 3), glet('tau', 3, 3), glet('rho', 3, 3), glet('kappa', 3, 3),
    glet('zeta', 3, 3), glet('eta', 3, 3), glet('iota', 3, 3), glet('chi', 3, 4), glet('nu', 3, 4), glet('xi', 4, 4), glet('omicron', 4, 4),
    glet('upsilon', 4, 4, { al: [['ypsilon', 'spelling', 5, 5, [], { g: 'Greek letter' }]] }),
  ],

  // ---------------------------------------------------------------- phonetic alphabet
  phonetic_alphabet: [
    nato('Alpha', 1, 1, { al: [['Alfa', 'spelling', 4, 3, [], { g: 'phonetic alphabet' }]] }), nato('Bravo', 1, 1), nato('Charlie', 1, 1), nato('Delta', 2, 1), nato('Echo', 1, 1),
    ['Foxtrot', 2, 1], ['Golf', 1, 1], ['Hotel', 1, 1], ['India', 1, 2], nato('Juliett', 3, 2, { al: [['Juliet', 'spelling', 2, 2, [], { g: 'phonetic alphabet' }]] }),
    nato('Kilo', 2, 2), nato('Lima', 2, 2), nato('Mike', 1, 2), ['November', 1, 2], nato('Oscar', 1, 2), nato('Papa', 2, 2), nato('Quebec', 3, 3), nato('Romeo', 2, 2),
    nato('Sierra', 2, 2), ['Tango', 2, 2], ['Uniform', 2, 3], nato('Victor', 2, 3), ['whisky', 2, 3],
    ['X-ray', 2, 3], nato('Yankee', 2, 3), ['Zulu', 2, 3],
  ],

  // ---------------------------------------------------------------- punctuation
  punctuation: [
    punc('comma', 1, 1), punc('period', 1, 1, { al: [['full stop', 'synonym', 1, 1, ['UK', 'AU']]] }), punc('colon', 1, 1), ['semicolon', 1, 1],
    ['question mark', 1, 1], ['exclamation mark', 1, 1, { al: [['exclamation point', 'synonym', 1, 1, ['US']]] }], punc('apostrophe', 1, 1),
    punc('hyphen', 1, 1), punc('dash', 1, 2), ['quotation marks', 1, 1, { al: [['inverted commas', 'synonym', 2, 2, ['UK']], ['speech marks', 'synonym', 2, 2, ['UK']]] }],
    ['parentheses', 2, 1, { al: [['round brackets', 'synonym', 2, 2, ['UK']]] }], punc('brackets', 1, 2), punc('braces', 2, 3), ['ellipsis', 2, 2, { g: 'punctuation' }],
    punc('slash', 1, 3), ['em dash', 3, 2], ['en dash', 3, 3], punc('bullet', 2, 3), ['interrobang', 3, 3], ['pilcrow', 4, 3],
    ['guillemets', 4, 4], punc('dagger', 3, 4), ['obelus', 5, 5], ['interpunct', 5, 4], ['section sign', 4, 4], ['double quotes', 2, 2], ['single quotes', 2, 2],
    ['square brackets', 2, 2], ['curly brackets', 3, 3], ['virgule', 5, 5], ['tilde', 3, 4], ['asterisk', 2, 3, { g: 'symbol' }], ['semi-colon', 2, 2, { }],
  ].filter(r => r[0] !== 'semi-colon'),

  // ---------------------------------------------------------------- keyboard symbols
  keyboard_symbols: [
    ['ampersand', 2, 1], sym('asterisk', 2, 1), ['tilde', 3, 1], sym('caret', 3, 1), ['hashtag', 1, 1], sym('hash', 1, 2, { al: [['pound sign', 'synonym', 2, 2, ['US']], ['number sign', 'synonym', 2, 2]] }),
    ['at sign', 1, 1], ['dollar sign', 1, 1], ['percent sign', 1, 1], sym('underscore', 2, 2), sym('backslash', 2, 2), sym('slash', 1, 3), sym('pipe', 2, 3),
    ['plus sign', 1, 2], ['equals sign', 1, 2], ['minus sign', 1, 2], ['backtick', 3, 2], sym('octothorpe', 4, 3), ['vertical bar', 3, 3], ['circumflex', 4, 4],
    ['less-than sign', 2, 3], ['greater-than sign', 2, 3], ['square brackets', 2, 3], ['curly braces', 2, 3], ['grave accent', 4, 4], ['pound symbol', 2, 3],
    ['exclamation mark', 1, 2], ['question mark', 1, 2], ['open parenthesis', 3, 3], ['forward slash', 2, 2], ['tick', 2, 4, { g: 'symbol' }],
    ['euro sign', 2, 2], ['degree sign', 3, 3], ['copyright sign', 3, 3], ['at symbol', 2, 2], ['bang', 3, 4, { g: 'symbol' }], ['splat', 5, 5, { g: 'symbol' }],
    ['scare quotes', 4, 5], ['double dagger', 5, 5],
  ].filter(r => !['exclamation mark', 'question mark', 'square brackets', 'tick', 'bang', 'splat', 'scare quotes', 'double dagger', 'open parenthesis', 'curly braces', 'copyright sign'].includes(r[0]))
   .concat([['curly braces', 2, 3], ['copyright sign', 3, 3]]),

  // ---------------------------------------------------------------- writing systems
  writing_systems: [
    ['alphabet', 1, 1], ['hieroglyphics', 2, 1, { al: [['hieroglyphs', 'synonym', 2, 1]] }], ['cuneiform', 3, 2], ['runes', 2, 2], ['Cyrillic', 2, 2, { type: 'proper' }],
    ['Braille', 2, 3, { type: 'proper', al: [['braille', 'spelling', 2, 3]] }], ['Kanji', 2, 2, { type: 'proper' }], ['Hiragana', 3, 2, { type: 'proper' }], ['Katakana', 3, 2, { type: 'proper' }],
    ['Hangul', 3, 2, { type: 'proper' }], ['Devanagari', 4, 3, { type: 'proper' }], ['Arabic script', 2, 2, { type: 'proper' }], ['Latin alphabet', 2, 2, { type: 'proper' }],
    ['Greek alphabet', 2, 2, { type: 'proper' }], ['Hebrew alphabet', 2, 2, { type: 'proper' }], ['pictogram', 3, 3], ['ideogram', 3, 3], ['logogram', 4, 3],
    ['syllabary', 4, 3], ['abjad', 5, 4], ['abugida', 5, 4], ['Hanzi', 3, 3, { type: 'proper' }], ['Pinyin', 3, 4, { type: 'proper' }], ['Romaji', 4, 4, { type: 'proper' }],
    ['Ogham', 4, 4, { type: 'proper' }], ['Linear B', 4, 4, { type: 'proper' }], ['Futhark', 4, 4, { type: 'proper' }], ['Glagolitic', 5, 5, { type: 'proper' }],
    ['Gurmukhi', 5, 5, { type: 'proper' }], ['Tifinagh', 5, 5, { type: 'proper' }], ["Ge'ez", 5, 5, { type: 'proper' }], ["N'Ko", 5, 5, { type: 'proper' }],
    ['Thai script', 3, 3, { type: 'proper' }], ['Demotic', 5, 5], ['Hieratic', 5, 5], ['Cherokee syllabary', 4, 4, { type: 'proper' }], ['Brahmi', 5, 5, { type: 'proper' }],
    ['shorthand', 2, 3], ['Morse code', 1, 4, { type: 'proper' }],
  ].filter(r => r[0] !== 'Morse code'),

  // ---------------------------------------------------------------- handwriting words
  handwriting_words: [
    ['cursive', 1, 1], ['handwriting', 1, 1], ['scribble', 1, 2], ['scrawl', 2, 1], ['print', 1, 3, { g: 'handwriting' }], ['signature', 1, 2], ['autograph', 2, 3],
    ['doodle', 1, 3], ['neat', 1, 3, { pos: 'adjective', g: 'handwriting' }], ['messy', 1, 3, { pos: 'adjective', g: 'handwriting' }], ['illegible', 3, 2, { pos: 'adjective' }],
    ['legible', 3, 2, { pos: 'adjective' }], ['longhand', 3, 2], ['penmanship', 3, 2], ['calligraphy', 3, 2], ['block capitals', 2, 2, { al: [['block letters', 'synonym', 2, 2]] }],
    ['joined-up writing', 3, 2], ['loopy', 2, 4, { pos: 'adjective', g: 'handwriting' }], ['slanted', 2, 4, { pos: 'adjective', g: 'handwriting' }], ['squiggle', 2, 3],
    ['chicken scratch', 3, 3, { al: [['hen scratch', 'synonym', 4, 4]] }], ['scratchy', 2, 4, { pos: 'adjective', g: 'handwriting' }], ['copperplate', 4, 3, { g: 'handwriting' }],
    ['italic script', 3, 3], ['flourish', 3, 3, { g: 'decorative stroke' }], ['upstroke', 4, 3], ['downstroke', 4, 3], ['uncial', 5, 4], ['Spencerian', 5, 5, { type: 'proper', g: 'handwriting' }],
    ['spidery', 3, 3, { pos: 'adjective' }], ['copybook', 4, 3], ['lettering', 3, 3], ['ligature', 4, 4], ['paleography', 5, 4], ['graphology', 4, 3],
    ['palimpsest', 5, 5], ['scribe', 2, 4, { g: 'handwriting' }], ['penstroke', 3, 3], ['quill', 2, 4, { g: 'handwriting' }],
  ].filter(r => !['scribe', 'quill'].includes(r[0])),

  // ---------------------------------------------------------------- typography words
  typography_words: [
    ['font', 1, 1, { g: 'typography', al: [['typeface', 'synonym', 2, 1, [], { g: 'typography' }]] }], typo('bold', 1, 1), typo('italic', 1, 1), ['underline', 1, 1, { g: 'typography' }],
    ['serif', 2, 1], ['sans serif', 2, 1], typo('margin', 1, 3), ['indent', 2, 2], ['point size', 2, 2], ['capital letters', 1, 3, { g: 'typography' }], ['lowercase', 1, 3],
    ['uppercase', 1, 3], ['kerning', 3, 2], typo('leading', 3, 2), typo('tracking', 3, 3), ['baseline', 3, 2, { g: 'typography' }], ['ascender', 4, 3],
    ['descender', 4, 3], ['x-height', 4, 3], ['glyph', 4, 3], ['small caps', 3, 3], ['drop cap', 3, 3], typo('widow', 4, 3), typo('orphan', 4, 3), ['justified', 2, 3, { pos: 'adjective', g: 'typography' }],
    ['ragged right', 4, 4], typo('gutter', 3, 3), ['pica', 4, 3, { g: 'typography' }], ['em space', 4, 4], ['monospace', 3, 3], ['slab serif', 4, 3],
    ['blackletter', 4, 4], typo('counter', 5, 4), typo('bowl', 3, 5), ['swash', 5, 4], ['fleuron', 5, 5], ['lorem ipsum', 3, 3, { g: 'placeholder text' }],
    typo('bleed', 3, 4), ['hyphenation', 3, 3], ['cap height', 4, 4], ['line height', 3, 3], ['stem', 3, 5, { g: 'typography' }], ['terminal', 3, 5, { g: 'typography' }],
    ['spur', 5, 5, { g: 'typography' }], ['overprint', 5, 4],
  ].filter(r => !['bowl', 'stem', 'terminal', 'spur', 'overprint', 'counter', 'bleed'].includes(r[0])),

  // ---------------------------------------------------------------- fonts
  fonts: [
    font('Arial', 1, 1), font('Helvetica', 2, 1), font('Times New Roman', 1, 1), font('Comic Sans', 1, 1), font('Courier', 2, 2), font('Calibri', 2, 1), font('Verdana', 2, 2),
    font('Georgia', 2, 3), font('Impact', 2, 3), font('Tahoma', 3, 3), font('Garamond', 3, 2), font('Futura', 3, 2), font('Palatino', 3, 3), font('Baskerville', 3, 3),
    font('Bodoni', 4, 3), font('Gill Sans', 4, 3), font('Cambria', 3, 3), font('Rockwell', 3, 3), font('Optima', 4, 4),
    font('Didot', 4, 4), font('Frutiger', 4, 4), font('Univers', 4, 4), font('Century Gothic', 3, 3, { g: 'font' }), font('Lucida', 4, 4), font('Consolas', 3, 3),
    font('Segoe UI', 3, 3), font('Roboto', 3, 3), font('Open Sans', 3, 3), font('Lato', 4, 3), font('Montserrat', 4, 3), font('Avenir', 4, 4), font('Franklin Gothic', 4, 4),
    font('Caslon', 4, 4), font('Clarendon', 4, 4), font('Bookman', 4, 4), font('Wingdings', 2, 2), font('Webdings', 3, 3), font('Zapfino', 4, 4), font('Brush Script', 4, 4),
    font('Perpetua', 5, 5), font('Cooper Black', 4, 4), font('Helvetica Neue', 3, 3), font('Akzidenz-Grotesk', 5, 5), font('Comic Neue', 5, 5),
  ].filter(r => r[0] !== 'Comic Neue'),

  // ---------------------------------------------------------------- things you read
  things_you_read: [
    ['book', 1, 1], ['newspaper', 1, 1], ['magazine', 1, 1, { g: 'periodical' }], ['novel', 1, 1, { g: 'book' }], ['comic', 1, 1, { g: 'comic book' }], ['letter', 1, 1, { g: 'message' }], ['email', 1, 1],
    ['menu', 1, 1, { g: 'restaurant' }], ['map', 1, 2], ['sign', 1, 2, { g: 'notice' }], ['label', 1, 3, { g: 'product' }], ['poem', 1, 1], ['recipe', 1, 1], ['text message', 1, 2],
    ['article', 1, 2, { g: 'news' }], ['essay', 2, 2], ['report', 1, 2], ['brochure', 2, 2], ['leaflet', 2, 2], ['pamphlet', 2, 2], ['manual', 2, 2], ['textbook', 1, 2],
    ['diary', 1, 2], ['blog', 1, 2], ['tweet', 1, 3], ['contract', 2, 3], ['screenplay', 2, 3, { al: [['script', 'synonym', 2, 3, [], { g: 'screenplay' }]] }],
    ['biography', 2, 2], ['memoir', 3, 2], ['encyclopedia', 2, 2], ['dictionary', 1, 2], ['atlas', 2, 3], ['almanac', 3, 3], ['tabloid', 2, 2], ['flyer', 2, 3],
    ['graphic novel', 2, 2], ['manga', 2, 2], ['timetable', 2, 3], ['receipt', 1, 3], ['caption', 2, 3], ['headline', 2, 3], ['horoscope', 2, 3], ['journal', 2, 3, { g: 'publication' }],
    ['gazette', 3, 3], ['tome', 3, 3], ['treatise', 4, 3], ['broadsheet', 3, 3], ['periodical', 4, 3], ['monograph', 5, 4], ['pulp fiction', 3, 3],
  ].slice(0, 40).concat([['gazette', 3, 3]]).filter((r, i, a) => a.findIndex(x => x[0] === r[0]) === i),

  // ---------------------------------------------------------------- parts of speech
  parts_of_speech: [
    pos_('noun', 1, 1, { al: [['naming word', 'synonym', 2, 2, [], { g: 'part of speech' }]] }), pos_('verb', 1, 1, { al: [['doing word', 'synonym', 2, 2, [], { g: 'part of speech' }]] }),
    pos_('adjective', 1, 1, { al: [['describing word', 'synonym', 2, 2, [], { g: 'part of speech' }]] }), pos_('adverb', 2, 1), pos_('pronoun', 2, 1), pos_('preposition', 2, 1),
    pos_('conjunction', 2, 1, { al: [['connective', 'synonym', 3, 3, [], { g: 'part of speech' }]] }), pos_('interjection', 2, 2, { al: [['exclamation', 'synonym', 2, 3, [], { g: 'part of speech' }]] }), pos_('determiner', 4, 3),
  ],

  // ---------------------------------------------------------------- grammar terms
  grammar_terms: [
    ['grammar', 1, 1], ['syntax', 3, 2], ['plural', 1, 2], ['singular', 2, 2], gram('subject', 1, 2), gram('object', 1, 3), ['predicate', 3, 2], gram('clause', 2, 2),
    gram('phrase', 1, 2), gram('modifier', 3, 3), ['conjugation', 3, 2], ['declension', 4, 3], gram('case', 1, 4), gram('gender', 1, 3), gram('mood', 2, 4), gram('voice', 2, 4),
    gram('number', 1, 4), ['possessive', 2, 2], ['comparative', 2, 2], ['superlative', 2, 2], ['auxiliary verb', 3, 3], ['participle', 3, 2], ['infinitive', 3, 2],
    ['gerund', 3, 3], gram('article', 1, 3), ['agreement', 2, 4, { g: 'grammar' }], ['antecedent', 4, 3], ['transitive', 3, 3], ['intransitive', 3, 3], ['active voice', 2, 2],
    ['passive voice', 2, 2], ['split infinitive', 3, 3], ['dangling modifier', 4, 3], ['subjunctive', 4, 3], ['imperative', 2, 3, { g: 'grammar' }], ['indicative', 4, 4],
    ['nominative', 4, 3], ['accusative', 4, 3], ['dative', 4, 3], ['genitive', 4, 3], ['ablative', 5, 4], ['apposition', 5, 4], ['inflection', 4, 3], ['morphology', 4, 3],
    ['syntax tree', 5, 4], ['copula', 5, 4],
  ].slice(0, 42),

  // ---------------------------------------------------------------- tenses
  tenses: [
    G('tense')('present', 1, 1), G('tense')('past', 1, 1), G('tense')('future', 1, 1), ['present tense', 1, 1], ['past tense', 1, 1], ['future tense', 1, 1],
    ['present perfect', 2, 2], ['past perfect', 2, 2, { al: [['pluperfect', 'synonym', 4, 3]] }], ['future perfect', 3, 2], ['present continuous', 2, 2, { al: [['present progressive', 'synonym', 3, 3]] }],
    ['past continuous', 2, 2, { al: [['past progressive', 'synonym', 3, 3]] }], ['future continuous', 3, 3], ['simple present', 2, 2], ['simple past', 2, 2, { al: [['preterite', 'synonym', 5, 4]] }],
    ['simple future', 2, 3], ['present simple', 2, 2], ['past simple', 2, 2], ['future simple', 3, 3], ['imperfect', 3, 3, { g: 'tense' }], G('tense')('perfect', 2, 3),
    ['conditional', 3, 4, { g: 'tense' }], ['aorist', 5, 5], ['historic present', 4, 4], ['perfect continuous', 3, 3], ['future in the past', 4, 4],
    ['progressive', 3, 4, { g: 'tense' }], ['perfective', 5, 5], ['imperfective', 5, 5],
    ['passé composé', 4, 4, { type: 'phrase' }],
  ].filter(r => r[0] !== 'passé composé'),

  // ---------------------------------------------------------------- sentence parts
  sentence_parts: [
    gram('subject', 1, 1), gram('object', 1, 1), ['predicate', 3, 2], pos_('verb', 1, 2), gram('clause', 2, 2), gram('phrase', 1, 2), ['sentence', 1, 3, { g: 'grammar' }],
    ['complement', 3, 3], ['adverbial', 4, 3], ['direct object', 2, 2], ['indirect object', 3, 2], gram('modifier', 3, 3), ['noun phrase', 3, 2], ['verb phrase', 3, 2],
    ['main clause', 3, 2], ['subordinate clause', 3, 2], ['relative clause', 3, 3], ['dependent clause', 3, 2], ['independent clause', 3, 2], ['adjunct', 4, 4],
    ['prepositional phrase', 3, 2], ['appositive', 5, 4], ['vocative', 5, 4], ['agent', 2, 5, { g: 'grammar' }], ['copula', 5, 4], ['auxiliary verb', 3, 3],
    ['finite verb', 4, 3], ['particle', 3, 4, { g: 'grammar' }], ['subject complement', 4, 4], ['fragment', 2, 3, { g: 'grammar' }], ['run-on sentence', 3, 2], ['topic sentence', 3, 3],
    ['head', 1, 5, { g: 'grammar' }], ['noun clause', 4, 3], ['adverb clause', 4, 3], ['adjective clause', 4, 3], ['conjunct', 5, 5], ['determiner', 4, 3, { g: 'part of speech' }],
    ['compound sentence', 3, 2], ['complex sentence', 3, 2],
  ].filter(r => !['agent', 'head', 'particle', 'fragment'].includes(r[0])),

  // ---------------------------------------------------------------- pronouns
  pronouns: [
    pron('he', 1, 1), pron('she', 1, 1), pron('it', 1, 1), pron('we', 1, 1), pron('they', 1, 1), pron('you', 1, 1), pron('me', 1, 1), pron('him', 1, 1), pron('her', 1, 1),
    pron('them', 1, 1), pron('mine', 1, 2), pron('yours', 1, 2), pron('his', 1, 2), pron('hers', 1, 2), pron('ours', 1, 2), pron('theirs', 1, 2),
    pron('myself', 1, 2), pron('yourself', 1, 2), pron('himself', 1, 2), pron('herself', 1, 2), pron('itself', 1, 2), pron('ourselves', 1, 2), pron('themselves', 1, 2),
    pron('who', 1, 2), pron('whom', 3, 2), pron('whose', 2, 3), pron('which', 1, 3), pron('this', 1, 3), pron('these', 1, 3), pron('those', 1, 3), pron('someone', 1, 3),
    pron('anyone', 1, 3), pron('everyone', 1, 3), pron('nobody', 1, 3), pron('something', 1, 3), pron('each other', 2, 3), pron('one another', 2, 3), pron('oneself', 4, 3),
    pron('thou', 3, 3), pron('thee', 3, 3), pron('ye', 4, 4), pron("y'all", 3, 3), pron('youse', 4, 4), pron('whomever', 4, 4), pron('whosoever', 5, 5),
    pron('thine', 4, 4), pron('yourselves', 2, 2),
  ].slice(0, 40),

  // ---------------------------------------------------------------- prepositions
  prepositions: [
    prep('in', 1, 1), prep('on', 1, 1), prep('at', 1, 1), prep('by', 1, 1), prep('for', 1, 1), prep('with', 1, 1), prep('from', 1, 1), prep('to', 1, 1), prep('of', 1, 1),
    prep('under', 1, 1), prep('over', 1, 1), prep('above', 1, 1), prep('below', 1, 1), prep('beside', 1, 1), prep('between', 1, 1), prep('behind', 1, 1), prep('through', 1, 2),
    prep('across', 1, 2), prep('along', 1, 2), prep('around', 1, 2), prep('against', 1, 2), prep('into', 1, 2), prep('onto', 2, 2), prep('upon', 2, 2), prep('within', 2, 2),
    prep('without', 1, 3), prep('toward', 2, 3, { al: [['towards', 'synonym', 2, 3]] }), prep('among', 2, 2, { al: [['amongst', 'synonym', 3, 3]] }), prep('beyond', 2, 3), prep('during', 1, 3),
    prep('amid', 3, 3, { al: [['amidst', 'synonym', 4, 4]] }), prep('despite', 2, 3), prep('throughout', 2, 3), prep('underneath', 2, 2), prep('alongside', 2, 3), prep('atop', 3, 3),
    prep('aboard', 3, 3), prep('per', 3, 3), prep('via', 3, 3), prep('concerning', 3, 4), prep('regarding', 2, 4), prep('notwithstanding', 5, 5), prep('in front of', 1, 2),
    prep('next to', 1, 2), prep('because of', 1, 3), prep('according to', 2, 4), prep('out of', 1, 3), prep('ahead of', 2, 3), prep('thanks to', 2, 4), prep('save', 4, 5),
  ].filter(r => r[0] !== 'save'),

  // ---------------------------------------------------------------- conjunctions
  conjunctions: [
    conj('and', 1, 1), conj('but', 1, 1), conj('or', 1, 1), conj('so', 1, 2), conj('yet', 2, 3), conj('nor', 3, 2), conj('for', 1, 4), conj('because', 1, 2), conj('although', 2, 2),
    conj('though', 2, 2), conj('while', 1, 3), conj('whereas', 3, 3), conj('if', 1, 3), conj('unless', 2, 3), conj('until', 1, 3), conj('since', 1, 3), conj('as', 1, 4),
    conj('when', 1, 3), conj('whenever', 2, 3), conj('whether', 2, 3), conj('after', 1, 4), conj('before', 1, 4), conj('once', 1, 4), conj('than', 1, 4), conj('lest', 4, 4),
    conj('provided that', 3, 3), conj('as long as', 2, 3), conj('even though', 2, 2), conj('so that', 2, 3), conj('whilst', 3, 3), conj('albeit', 4, 4), conj('as if', 2, 3),
    conj('as though', 3, 3), conj('supposing', 4, 4), conj('inasmuch as', 5, 5), conj('wherever', 2, 4), conj('in case', 2, 3), conj('now that', 3, 4), conj('either', 2, 3),
    conj('neither', 3, 3),
  ],

  // ---------------------------------------------------------------- interjections
  interjections: [
    intj('oh', 1, 1), intj('wow', 1, 1), intj('ouch', 1, 1), intj('oops', 1, 1), intj('hey', 1, 1), intj('yay', 1, 1), intj('ugh', 1, 1), intj('yikes', 1, 1), intj('phew', 1, 1),
    intj('hmm', 1, 1), intj('aha', 1, 1), intj('alas', 3, 2), intj('hooray', 1, 1, { al: [['hurray', 'spelling', 2, 2, [], { g: 'interjection', pos: 'other' }], ['hurrah', 'spelling', 3, 3, [], { g: 'interjection', pos: 'other' }]] }),
    intj('eureka', 2, 2), intj('whoa', 1, 2), intj('yuck', 1, 2), intj('shh', 1, 2), intj('psst', 2, 2), intj('gosh', 2, 2), intj('golly', 3, 2), intj('gee', 2, 3),
    intj('blimey', 3, 2, { reg: ['UK'] }), intj('crikey', 3, 2, { reg: ['UK', 'AU'] }), intj('egad', 4, 3), intj('zounds', 5, 4), intj('huzzah', 4, 3), intj('bah', 3, 3),
    intj('ahem', 2, 2), intj('jeepers', 3, 3), intj('yippee', 2, 2), intj('voila', 2, 2), intj('ta-da', 2, 2), intj('eek', 2, 2), intj('hallelujah', 2, 3), intj('drat', 3, 3),
    intj('shucks', 3, 3), intj('gadzooks', 5, 4), intj('eww', 1, 2), intj('hurrah', 3, 3), intj('huh', 1, 2), intj('cripes', 4, 3, { reg: ['UK'] }), intj('tsk', 3, 3), intj('whew', 2, 2),
    intj('woo-hoo', 2, 2),
  ].filter(r => !['hurrah', 'whew'].includes(r[0])),

  // ---------------------------------------------------------------- irregular past tenses
  irregular_past_tenses: [
    past('went', 1, 1), past('swam', 1, 1), past('caught', 1, 1), past('flew', 1, 1), past('ate', 1, 1), past('ran', 1, 1), past('took', 1, 1),
    past('gave', 1, 1), past('began', 1, 1), past('drank', 1, 1), past('sang', 1, 1), past('wrote', 1, 1), past('rode', 1, 1), past('drove', 1, 1), past('spoke', 1, 1),
    past('broke', 1, 1), past('chose', 1, 2), past('froze', 1, 2), past('stole', 1, 2), past('woke', 1, 2), past('wore', 1, 2), past('tore', 1, 2), past('knew', 1, 2),
    past('grew', 1, 2), past('threw', 1, 2), past('drew', 1, 2), past('blew', 1, 2), past('thought', 1, 2), past('bought', 1, 2), past('brought', 1, 2), past('taught', 1, 2),
    past('fought', 1, 2), past('sought', 3, 3), past('slept', 1, 2), past('swept', 2, 3), past('wept', 3, 3), past('crept', 3, 3), past('knelt', 3, 3), past('dealt', 3, 3),
    past('sprang', 3, 3), past('sank', 2, 3), past('stank', 3, 3), past('shrank', 3, 3), past('slid', 2, 3), past('fled', 3, 3), past('strode', 4, 4), past('trod', 4, 4),
    past('slew', 4, 4), past('smote', 5, 5), past('begat', 5, 5), past('forbade', 4, 4), past('wove', 4, 4), past('shone', 3, 3), past('spun', 3, 3), past('bore', 3, 4),
    past('swore', 2, 3), past('forgot', 1, 2), past('hung', 2, 3), past('dug', 2, 3), past('wound', 3, 4), past('bade', 5, 5), past('sped', 4, 4), past('leapt', 4, 4),
  ].filter(r => !['bore', 'wound', 'saw', 'swore', 'sped', 'spun', 'shone', 'hung', 'dug', 'wove', 'slew', 'leapt', 'sank', 'sprang', 'trod', 'knelt'].includes(r[0]))
   .concat([past('sank', 2, 3), past('sprang', 3, 3), past('trod', 4, 4), past('knelt', 3, 3), past('hung', 2, 3), past('dug', 2, 3), past('wove', 4, 4), past('slew', 4, 4), past('spun', 3, 3), past('shone', 3, 3), past('swore', 2, 3)])
   .filter((r, i, a) => a.findIndex(x => x[0] === r[0]) === i),

  // ---------------------------------------------------------------- irregular plurals
  irregular_plurals: [
    plur('mice', 1, 1), plur('geese', 1, 1), plur('cacti', 2, 1), plur('oxen', 2, 1), plur('children', 1, 1), plur('men', 1, 1), plur('women', 1, 1), plur('feet', 1, 1),
    plur('teeth', 1, 1), plur('people', 1, 2), plur('lice', 2, 2), ['sheep', 1, 2], plur('fish', 1, 3), ['deer', 1, 3], ['moose', 1, 3], plur('knives', 1, 2),
    plur('wives', 1, 2), plur('leaves', 1, 3), plur('lives', 1, 3), plur('wolves', 1, 2), plur('halves', 1, 2), plur('shelves', 1, 2), plur('loaves', 1, 2), plur('thieves', 1, 2),
    plur('calves', 2, 2), plur('elves', 2, 2), plur('criteria', 3, 3), plur('phenomena', 3, 3), plur('bacteria', 2, 3), plur('curricula', 4, 4), plur('alumni', 3, 3),
    plur('fungi', 2, 3), plur('nuclei', 3, 3), plur('radii', 4, 4), plur('stimuli', 4, 4), plur('syllabi', 5, 5), plur('octopi', 3, 4), plur('appendices', 4, 4),
    plur('indices', 3, 3), plur('vertices', 4, 4), plur('matrices', 4, 4), plur('analyses', 4, 4), plur('crises', 3, 3), plur('theses', 4, 4), plur('hypotheses', 4, 4),
    plur('oases', 4, 4), plur('larvae', 3, 3), plur('algae', 3, 3), plur('antennae', 4, 4), plur('formulae', 4, 4), plur('vertebrae', 3, 3), plur('nebulae', 4, 4),
    plur('dice', 1, 3), plur('pence', 3, 4, { reg: ['UK'] }), plur('quanta', 5, 5), plur('foci', 5, 5), plur('tableaux', 5, 5), plur('bureaux', 5, 5), plur('paparazzi', 3, 4),
    plur('graffiti', 2, 4), plur('brethren', 4, 4), plur('kine', 5, 5), plur('cherubim', 5, 5), plur('data', 1, 4), plur('media', 2, 4), plur('series', 2, 3), plur('species', 2, 3),
    plur('aircraft', 2, 3), plur('bison', 2, 3), plur('swine', 3, 3), plur('trout', 2, 3), plur('salmon', 2, 3),
  ].slice(0, 40),

  // ---------------------------------------------------------------- figures of speech
  figures_of_speech: [
    ['metaphor', 1, 1], ['simile', 1, 1], ['hyperbole', 2, 1], ['personification', 2, 1], ['irony', 1, 2], ['alliteration', 2, 1], ['onomatopoeia', 2, 1], ['oxymoron', 2, 1],
    ['pun', 1, 2], ['idiom', 1, 2], ['understatement', 2, 2], ['euphemism', 2, 2], ['paradox', 2, 3], ['metonymy', 4, 3], ['synecdoche', 4, 3], ['litotes', 5, 4], ['anaphora', 5, 4],
    ['assonance', 3, 3], ['sarcasm', 1, 3], ['cliche', 2, 3], ['analogy', 2, 3], ['allusion', 3, 3], ['apostrophe', 2, 4, { g: 'figure of speech' }], ['chiasmus', 5, 4], ['zeugma', 5, 4],
    ['tautology', 4, 3], ['pleonasm', 5, 5], ['meiosis', 5, 5], ['bathos', 5, 5], ['antithesis', 3, 3], ['hendiadys', 5, 5], ['epistrophe', 5, 5], ['symploce', 5, 5],
    ['polysyndeton', 5, 5], ['asyndeton', 5, 5], ['malapropism', 4, 3], ['spoonerism', 4, 3], ['innuendo', 3, 3], ['double entendre', 3, 3], ['rhetorical question', 3, 2],
    ['dead metaphor', 4, 4], ['circumlocution', 4, 4],
  ],
};
