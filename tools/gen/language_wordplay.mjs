// Generated word data: Language & Wordplay root, playable themes directly under it (languages, alphabets and writing).
// Format is described in tools/apply-words.mjs.
const P = (o = {}) => ({ type: 'proper', ...o });
const verb = (o = {}) => ({ pos: 'verb', ...o });

export const THEMES = {
  languages: { d: 1 },
  alphabets_and_writing: { d: 2 },
};

export const DATA = {
  languages: [
    ['English', 1, 1, P()], ['Spanish', 1, 1, P()], ['French', 1, 1, P()], ['German', 1, 1, P()], ['Italian', 1, 1, P()], ['Chinese', 1, 1, P()],
    ['Japanese', 1, 1, P()], ['Russian', 1, 1, P()], ['Portuguese', 1, 1, P()], ['Arabic', 1, 1, P()], ['Latin', 1, 2, P()], ['Greek', 1, 2, P()],
    ['Hindi', 2, 1, P()], ['Mandarin', 2, 1, P()], ['Korean', 2, 1, P()], ['Dutch', 2, 1, P()], ['Swedish', 2, 1, P()], ['Hebrew', 2, 1, P()],
    ['Welsh', 2, 2, P()], ['Irish', 2, 2, P({ g: 'language' })], ['Polish', 2, 2, P({ g: 'language' })], ['Turkish', 2, 1, P()], ['Swahili', 2, 2, P()], ['Cantonese', 2, 2, P()],
    ['Vietnamese', 2, 2, P()], ['Thai', 2, 2, P({ g: 'language' })], ['Esperanto', 3, 2, P()], ['Gaelic', 3, 2, P(), ], ['Persian', 3, 2, P({ al: [['Farsi', 'synonym', 3, 3, [], P()]] })],
    ['Urdu', 3, 3, P()], ['Bengali', 3, 3, P()], ['Punjabi', 3, 3, P()], ['Tamil', 3, 3, P()], ['Finnish', 3, 2, P()], ['Hungarian', 3, 2, P()],
    ['Danish', 3, 2, P({ g: 'language' })], ['Norwegian', 3, 2, P()], ['Icelandic', 3, 2, P()], ['Afrikaans', 3, 3, P()], ['Zulu', 3, 3, P()], ['Yiddish', 3, 3, P()],
    ['Tagalog', 3, 3, P({ al: [['Filipino', 'synonym', 3, 3, [], P({ g: 'language' })]] })], ['Indonesian', 3, 3, P()], ['Malay', 3, 3, P({ g: 'language' })],
    ['Sanskrit', 3, 3, P()], ['Klingon', 3, 3, P({ tm: true })], ['Navajo', 3, 3, P()], ['Basque', 3, 3, P()], ['Czech', 3, 3, P({ g: 'language' })], ['Romanian', 3, 3, P()],
    ['Ukrainian', 3, 3, P()], ['Maori', 3, 3, P()], ['Hawaiian', 3, 3, P()], ['Cherokee', 4, 4, P()], ['Quechua', 4, 4, P()], ['Xhosa', 4, 4, P()],
    ['Amharic', 4, 4, P()], ['Hausa', 4, 4, P()], ['Yoruba', 4, 4, P()], ['Igbo', 4, 4, P()], ['Somali', 4, 3, P({ g: 'language' })], ['Pashto', 4, 4, P()],
    ['Kurdish', 4, 4, P()], ['Gujarati', 4, 4, P()], ['Marathi', 4, 4, P()], ['Telugu', 4, 4, P()], ['Mongolian', 4, 3, P()], ['Tibetan', 4, 3, P()],
    ['Maltese', 4, 4, P()], ['Albanian', 4, 3, P()], ['Lithuanian', 4, 3, P()], ['Cornish', 4, 4, P({ g: 'language' })], ['Breton', 4, 4, P({ g: 'language' })],
    ['Romani', 4, 4, P()], ['Inuktitut', 5, 5, P()], ['Guarani', 5, 5, P()], ['Aymara', 5, 5, P()], ['Sami', 5, 5, P({ g: 'language' })], ['Volapuk', 5, 5, P()],
    ['Dzongkha', 5, 5, P()], ['Tok Pisin', 5, 5, P()], ['Wolof', 5, 5, P()],
  ],

  alphabets_and_writing: [
    ['alphabet', 1, 1], ['letter', 1, 1, { g: 'alphabet' }], ['vowel', 1, 1], ['consonant', 1, 1], ['ABC', 1, 1, { type: 'acronym' }], ['spelling', 1, 2],
    ['write', 1, 2, verb()], ['writing', 1, 1, { g: 'activity' }], ['word', 1, 3], ['syllable', 2, 2], ['uppercase', 2, 1, { al: [['capital letter', 'synonym', 1, 1], ['upper case', 'spelling', 2, 2], ['block capitals', 'synonym', 3, 3, ['UK']]] }],
    ['lowercase', 2, 1, { al: [['small letter', 'synonym', 2, 2], ['lower case', 'spelling', 2, 2, ['UK']]] }],
    ['cursive', 2, 2, { al: [['joined-up writing', 'synonym', 3, 3, ['UK'], { type: 'phrase' }]] }],
    ['calligraphy', 2, 2], ['hieroglyphs', 2, 2, { al: [['hieroglyphics', 'synonym', 2, 2]] }], ['Braille', 2, 2, { type: 'proper' }],
    ['Morse code', 2, 3, { type: 'proper' }], ['shorthand', 2, 2], ['initial', 2, 3, { g: 'letter' }], ['character', 2, 3, { g: 'symbol' }],
    ['symbol', 2, 3], ['accent', 2, 3, { g: 'mark' }], ['monogram', 3, 2], ['ampersand', 3, 3], ['umlaut', 3, 3], ['cedilla', 3, 3], ['circumflex', 3, 3],
    ['tilde', 3, 3], ['runes', 3, 3], ['cuneiform', 3, 3], ['pictogram', 3, 3, { al: [['pictograph', 'synonym', 4, 4]] }], ['ideogram', 4, 3],
    ['glyph', 3, 3], ['script', 2, 3, { g: 'writing' }], ['inscription', 3, 3], ['scribble', 2, 3, verb()], ['scrawl', 3, 3, verb()], ['doodle', 2, 4, verb()],
    ['transcribe', 3, 3, verb()], ['stenography', 4, 3], ['abbreviation', 2, 3], ['diacritic', 4, 3, { al: [['diacritical mark', 'synonym', 4, 3, [], { type: 'phrase' }]] }],
    ['digraph', 4, 4], ['ligature', 4, 4], ['logogram', 4, 4], ['syllabary', 4, 4], ['abjad', 5, 5], ['abugida', 5, 5], ['grapheme', 5, 5], ['phoneme', 4, 5],
    ['cipher', 3, 4], ['acrostic', 4, 5], ['palimpsest', 5, 5], ['papyrus', 3, 4], ['manuscript', 3, 4], ['scroll', 2, 4], ['quill', 3, 4], ['inkwell', 3, 4],
    ['stylus', 4, 4], ['hieratic', 5, 5], ['Rosetta Stone', 3, 4, { type: 'proper' }], ['orthography', 5, 4], ['literacy', 3, 3], ['penmanship', 4, 3],
    ['alphabetical order', 2, 2, { type: 'phrase' }], ['zed', 2, 3, { reg: ['UK', 'CA', 'AU'], al: [['zee', 'synonym', 2, 3, ['US']]] }],
  ],
};

export const ALIASES = [];
