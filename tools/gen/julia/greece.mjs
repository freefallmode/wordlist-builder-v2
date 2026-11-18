// Ancient Greece batch: Greek goddesses, Greek myth objects, Greek city-states, ancient Greek writers, Greek buildings. Format: tools/apply-words.mjs.
// Run in order: node tools/gen/julia/greece-themes.mjs; node tools/apply-words.mjs tools/gen/julia/greece.mjs; node tools/gen/julia/greece-landmarks.mjs
// Ratings: familiarity (1 every child knows it ... 5 few people), then how typical of THIS theme (1 the first words anyone names ... 5 peripheral).
// Most words already exist in the library (same text and meaning label) and are only linked; their own ratings and flags stay.
// Greek buildings takes the famous buildings out of "Greek landmarks" (greece-landmarks.mjs unlinks them there, and the islands, which
// are all in "Greek islands" already). Not made: kinds of ancient Greek building (temple, stoa ...): too few simple words.

const P = (o = {}) => ({ type: 'person', ...o });

export const THEMES = {
  greek_goddesses: { pop: 2, ident: 1 },
  greek_myth_objects: { pop: 2, ident: 2 },
  greek_city_states: { pop: 3, ident: 2 },
  ancient_greek_writers: { pop: 4, ident: 2 },
  greek_buildings: { pop: 3, ident: 2 },
};

export const DATA = {
  greek_goddesses: [
    ['Athena', 1, 1, { g: 'goddess' }], ['Aphrodite', 1, 1, { g: 'goddess' }], ['Hera', 1, 1, { g: 'goddess' }], ['Artemis', 2, 1, { g: 'goddess' }],
    ['Demeter', 2, 2, { g: 'goddess' }], ['Persephone', 2, 2, { g: 'goddess' }], ['Hestia', 3, 2, { g: 'goddess' }], ['Gaia', 2, 2, { g: 'goddess' }],
    ['Nike', 2, 2, { g: 'goddess' }], ['Iris', 3, 3, { g: 'goddess' }], ['Selene', 3, 3, { g: 'goddess' }], ['Hecate', 3, 3, { g: 'goddess' }],
    ['Nyx', 3, 3, { g: 'goddess' }], ['Nemesis', 3, 3, { g: 'goddess' }], ['Eos', 4, 3, { g: 'goddess' }], ['Rhea', 3, 3, { g: 'goddess' }],
    ['Eris', 4, 3, { g: 'goddess' }], ['Hebe', 4, 4, { g: 'goddess' }], ['Themis', 4, 4, { g: 'goddess' }], ['Leto', 4, 4, { g: 'Titaness' }],
  ],
  greek_myth_objects: [
    ['Trojan Horse', 1, 1], ['Pandora\'s box', 1, 1], ['Golden Fleece', 2, 1, { g: 'myth' }], ['golden apple', 2, 2],
    ['Icarus\'s wings', 3, 2, { type: 'proper' }], ['Argo', 3, 3, { g: 'ship' }], ['Aegis', 3, 3, { g: 'shield' }],
    ['thunderbolt', 2, 3, { g: 'Zeus' }], ['trident', 2, 3, { g: 'Poseidon' }], ['ambrosia', 3, 3, { g: 'god food' }],
    ['cornucopia', 2, 4], ['caduceus', 3, 4], ['Ariadne\'s thread', 4, 4, { type: 'proper' }],
  ],
  greek_city_states: [
    ['Athens', 1, 1], ['Sparta', 1, 1], ['Corinth', 2, 2, { g: 'city' }], ['Thebes', 3, 2, { g: 'ancient city' }],
    ['Mycenae', 3, 3], ['Syracuse', 3, 3, { g: 'city' }], ['Rhodes', 2, 3, { g: 'island' }], ['Miletus', 4, 3],
    ['Argos', 4, 3, { g: 'city', type: 'place' }], ['Ephesus', 3, 4], ['Samos', 4, 4], ['Aegina', 4, 4], ['Byzantium', 3, 4, { g: 'city' }],
  ],
  ancient_greek_writers: [
    ['Homer', 1, 1, { g: 'poet' }], ['Sophocles', 3, 1], ['Aesop', 2, 2, P()], ['Euripides', 3, 2], ['Aeschylus', 3, 2], ['Aristophanes', 3, 2],
    ['Herodotus', 3, 2], ['Sappho', 3, 2], ['Thucydides', 4, 3], ['Plutarch', 3, 3, P()], ['Hesiod', 4, 3, P()], ['Pindar', 4, 3, P()],
  ],
  greek_buildings: [
    ['Parthenon', 2, 1], ['Acropolis', 2, 1, { g: 'ancient citadel' }], ['Knossos', 4, 2], ['Temple of Poseidon', 4, 2], ['Temple of Apollo', 4, 2],
    ['Panathenaic Stadium', 4, 3], ['Temple of Olympian Zeus', 5, 3], ['Temple of Hephaestus', 4, 3, { type: 'place' }],
    ['Tower of the Winds', 4, 3, { type: 'place' }], ['Erechtheion', 5, 4], ['Propylaea', 5, 4], ['Lion Gate', 5, 4], ['Treasury of Atreus', 5, 4],
  ],
};
