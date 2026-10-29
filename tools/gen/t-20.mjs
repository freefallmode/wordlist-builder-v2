// Top-up batch 20: roaring twenties ... AI words.
const P = (o = {}) => ({ type: 'person', ...o });
const PR = (o = {}) => ({ type: 'proper', ...o });
const ORG = (o = {}) => ({ type: 'org', tm: true, ...o });
const ACR = (o = {}) => ({ type: 'acronym', ...o });
const L = (o = {}) => ({ g: 'language', type: 'proper', ...o });
const FILE = (o = {}) => ({ g: 'file', type: 'acronym', ...o });

export const THEMES = {};
export const FIXES = [{ gloss: ['watering hole', 'savanna', 'water source'] }];

export const ALIASES = [
  ['islamic_golden_age_scholars', 'Avicenna', '', [['Ibn Sina', 'synonym', 3, 2]]],
  ['islamic_golden_age_scholars', 'Ibn al-Haytham', '', [['Alhazen', 'synonym', 3, 2]]],
];

export const DATA = {
  roaring_twenties: [
    ['Teapot Dome', 4, 5, PR({ g: 'scandal' })], ['Scopes trial', 3, 4, PR()], ['Bix Beiderbecke', 5, 5, P()], ['Gertrude Ederle', 4, 4, P()],
    ['Ziegfeld Follies', 3, 4, PR()], ['Algonquin Round Table', 4, 5, PR()], ['Buster Keaton', 3, 4, P()], ['Harold Lloyd', 4, 4, P()], ['Marcus Garvey', 4, 4, P()],
  ],
  historic_documents: [
    ['Peace of Augsburg', 4, 4, PR()], ['Treaty of Tilsit', 4, 5, PR()], ['Golden Bull', 5, 5, PR()],
    ['Code of Ur-Nammu', 5, 5, PR()], ['Edict of Worms', 4, 4, PR()], ['Provisions of Oxford', 5, 5, PR()], ['Treaty of Nerchinsk', 5, 5, PR()],
  ],
  southern_sky: [
    ['Southern Cross', 1, 1, PR({ g: 'constellation' })], ['Large Magellanic Cloud', 3, 2, PR()], ['Small Magellanic Cloud', 3, 2, PR()],
  ],
  geometry: [
    ['apothem', 5, 5], ['locus', 4, 5, { g: 'geometry' }], ['secant', 4, 4], ['frustum', 4, 4], ['dodecahedron', 3, 4], ['isosceles', 3, 3], ['scalene', 4, 3], ['trapezoid', 3, 3], ['rhombus', 3, 3],
  ],
  math_operations: [
    ['summation', 4, 4], ['truncate', 4, 5, { pos: 'verb', g: 'math' }], ['factorise', 4, 4, { pos: 'verb' }], ['transpose', 4, 5, { pos: 'verb', g: 'math' }],
    ['dot product', 4, 4], ['convolution', 5, 5],
  ],
  islamic_golden_age_scholars: [
    ['Rumi', 2, 2, P()], ['Al-Ghazali', 4, 3, P()], ['Maimonides', 3, 3, P()],
  ],
  famous_naturalists: [
    ['Darwin', 1, 1, P({ g: 'scientist' })], ['Chris Packham', 3, 3, P()], ['Steve Backshall', 3, 3, P()],
  ],
  famous_engineers: [
    ['Joseph Bramah', 5, 5, P()], ['Benjamin Baker', 5, 5, P()], ['Henry Maudslay', 5, 5, P()], ['Thomas Brassey', 5, 5, P()], ['Joseph Paxton', 4, 4, P()],
  ],
  inventions: [
    ['Archimedes screw', 3, 4], ['sextant', 3, 4], ['Leyden jar', 4, 5], ['armillary sphere', 5, 5], ['abacus', 2, 3], ['phonograph', 3, 3],
  ],
  famous_discoveries: [
    ['cosmic rays', 4, 4], ['Cepheid variables', 5, 5], ["Hubble's law", 4, 4, PR()], ['Rh factor', 4, 4], ['noble gases', 3, 4], ['Lascaux caves', 3, 4, PR()],
  ],
  science_fields: [
    ['oology', 5, 5], ['palynology', 5, 5], ['malacology', 5, 5], ['carcinology', 5, 5], ['mammalogy', 4, 3], ['bryology', 5, 5],
  ],
  famous_experiments: [
    ['Rosenhan experiment', 4, 4, PR()], ['Robbers Cave', 5, 5, PR()], ['visual cliff', 5, 5], ['pitch drop', 4, 4],
  ],
  inca_engineering: [
    ['Chinchero', 4, 4, { type: 'place' }], ['Tipón', 5, 5, { type: 'place' }], ['Rumiqolqa', 5, 5, { type: 'place' }], ['Raqchi', 5, 5, { type: 'place' }],
    ['Ushnu', 5, 5, PR()], ['Ingapirca', 5, 5, { type: 'place' }], ['Wiñay Wayna', 5, 5, { type: 'place' }],
  ],
  computer_parts: [
    ['thermal paste', 3, 4], ['capacitor', 3, 4], ['heat pipe', 4, 4], ['SATA cable', 3, 4], ['PCIe slot', 4, 4], ['VRM', 5, 5, ACR()],
  ],
  programming_languages: [
    ['Tcl', 5, 5, L()], ['AWK', 5, 5, L()], ['Oberon', 5, 5, L()], ['Occam', 5, 5, L()], ['Idris', 5, 5, L()], ['Haxe', 5, 5, L()], ['Simula', 5, 5, L()],
  ],
  coding_words: [
    ['memoization', 5, 5], ['idempotent', 5, 5], ['mutex', 5, 5], ['currying', 5, 5], ['bytecode', 4, 4], ['lexer', 5, 5], ['race condition', 4, 4],
  ],
  software_words: [
    ['middleware', 4, 4], ['codec', 4, 4], ['hypervisor', 4, 4], ['daemon', 4, 4, { g: 'computer' }], ['bootloader', 4, 4],
  ],
  internet_words: [
    ['netizen', 4, 4], ['pwned', 4, 4], ['leetspeak', 4, 5], ['Usenet', 4, 5, PR()], ['sockpuppet', 4, 4], ['astroturfing', 5, 5], ['Streisand effect', 4, 5],
  ],
  file_types: [
    ['TAR', 4, 4, FILE()], ['OGG', 4, 4, FILE()], ['TTF', 4, 4, FILE()], ['WOFF', 5, 5, FILE()], ['YAML', 4, 4, FILE()], ['INI', 4, 4, FILE()],
    ['DMG', 4, 4, FILE()], ['AIFF', 4, 4, FILE()], ['ODT', 4, 4, FILE()], ['AAC', 3, 3, FILE()], ['BAT', 4, 4, FILE()],
  ],
  cybersecurity_words: [
    ['steganography', 5, 5], ['pharming', 4, 4], ['tailgating', 4, 4, { g: 'security' }], ['cryptojacking', 4, 4], ['clickjacking', 4, 4], ['rainbow table', 5, 5], ['watering hole', 5, 5, { g: 'attack' }],
  ],
  silicon_valley_companies: [
    ['HP', 2, 3, ORG()], ['Yahoo', 2, 3, ORG()], ['LinkedIn', 2, 4, ORG()], ['AMD', 3, 3, ORG()], ['Atari', 3, 4, ORG()], ['Broadcom', 4, 4, ORG()], ['Intuit', 4, 4, ORG()],
    ['Sun Microsystems', 4, 4, ORG()], ['VMware', 4, 5, ORG()], ['Juniper Networks', 5, 5, ORG()], ['Applied Materials', 5, 5, ORG()], ['Synopsys', 5, 5, ORG()],
    ['Symantec', 4, 5, ORG()], ['Palo Alto Networks', 4, 4, ORG()], ['Lam Research', 5, 5, ORG()], ['Western Digital', 4, 5, ORG()], ['PayPal', 2, 3, ORG()], ['eBay', 2, 3, ORG()],
  ],
  computer_storage: [
    ['punch card', 3, 4], ['paper tape', 4, 5], ['magnetic drum', 5, 5], ['core memory', 5, 5], ['MiniDisc', 3, 4], ['Optane', 5, 5, ORG({ type: 'proper' })],
  ],
  handheld_gadgets: [
    ['Psion Organiser', 5, 5, ORG({ type: 'proper' })], ['Atari Lynx', 4, 4, ORG({ type: 'proper' })], ['N-Gage', 4, 4, ORG({ type: 'proper' })], ['Zune', 3, 4, ORG({ type: 'proper' })],
    ['Gizmondo', 5, 5, ORG({ type: 'proper' })], ['Sega Nomad', 5, 5, ORG({ type: 'proper' })], ['Game Gear', 3, 3, ORG({ type: 'proper' })], ['Discman', 3, 3, ORG({ type: 'proper' })],
  ],
  phone_features: [
    ['VoLTE', 5, 5, PR()], ['T9', 4, 4, { type: 'proper' }], ['dual SIM', 3, 4], ['visual voicemail', 4, 4], ['call barring', 4, 5], ['USSD', 5, 5, ACR()], ['screen mirroring', 3, 4], ['wireless charging', 2, 2],
  ],
  ai_words: [
    ['RLHF', 5, 5, ACR()], ['RAG', 5, 5, ACR({ g: 'AI' })], ['perceptron', 5, 5], ['tokenizer', 4, 5], ['diffusion model', 4, 4], ['context window', 4, 4], ['softmax', 5, 5],
    ['latent space', 5, 5], ['attention mechanism', 5, 5], ['prompt engineering', 2, 2],
  ],
};
