// One-off cleanup: entries typed 'phrase' only to get past the word limit are given their real type. 'phrase' is for ordinary multi-word expressions, never names.
// Run: node tools/retype-phrases.mjs [library file]   (idempotent)
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../js/store.js';
import { reindex } from '../js/model.js';

const LIB = process.argv[2] || new URL('../data/wordlist-en.project.json', import.meta.url);
const T = {
  person: ['Joan of Arc', 'William the Conqueror', 'Vasco da Gama', 'Samuel de Champlain', 'Long John Silver', 'Dread Pirate Roberts', 'Lewis and Clark', 'Martin Luther King Day:proper'],
  place: ['United States', 'United Kingdom', 'Big Apple', 'Rio de Janeiro', 'Ho Chi Minh City', 'La Tour Eiffel', 'Statue of Liberty', 'Lady Liberty', 'Great Wall of China', 'Pyramids of Giza',
    'the Taj', 'Tower of Pisa', 'Leaning Tower of Pisa', 'Golden Gate Bridge', 'Golden Gate', 'Sydney Opera House', 'Empire State Building', 'Christ the Redeemer', 'Cristo Redentor',
    'Arc de Triomphe', 'Arch of Triumph', 'Tower of London', 'Sultan Ahmed Mosque', 'Cliffs of Moher', 'Pont du Gard', 'Temple of Heaven', 'Greenwich Meridian', 'Tropic of Cancer',
    'Tropic of Capricorn', 'Hanging Gardens', 'Library of Alexandria', 'Great Pyramid', 'Cape of Good Hope', 'Spanish Main', 'Northwest Passage', 'Lost City of Z', 'Bunker Hill', 'Pearl Harbor', 'New World'],
  title: ['Star-Spangled Banner', 'Sonic the Hedgehog', 'The Legend of Zelda', 'Grand Theft Auto', 'Call of Duty', 'World of Warcraft', 'League of Legends', 'Red Dead Redemption',
    'Settlers of Catan', 'Ticket to Ride', 'Chutes and Ladders', 'Dungeons & Dragons', 'Bayeux Tapestry', 'Dead Sea Scrolls', 'Code of Hammurabi'],
  org: ['Hanseatic League', 'Etch A Sketch'],
  proper: ['Terracotta Army'],
};
const P = parseProject(readFileSync(LIB, 'utf8'));
reindex(P);
const map = new Map();
for (const [type, list] of Object.entries(T)) for (const s of list) { const [text, t] = s.split(/:(?=[a-z]+$)/); map.set(text, t || type); }
let n = 0;
for (const e of P.entries) {
  if (e.type !== 'phrase') continue;
  // anything else that starts with a capital letter is a name of some kind: era, event, war, holiday, discipline, ship, myth reference
  const t = map.get(e.text) || (/^[A-ZÀ-Ý]/.test(e.text) ? 'proper' : null);
  if (t) { e.type = t; n++; }
}
stampSave(P);
writeFileSync(LIB, serializeProject(P));
console.log(n + ' entries retyped');
