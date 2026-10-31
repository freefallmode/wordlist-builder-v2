// Prototype of the synonym-group / display-form design (DESIGN-entries.md) on the weather themes.
// Run once: node tools/gen/weather-proto.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, sameText } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; };
const log = [];

// 1. synonyms that stand in these themes become entries of their own (a regional tag where the word is local)
const promote = { 1966: [], 1968: [], 1975: ['UK'], 1976: ['UK'], 1978: [], 1980: [], 1989: [], 1991: ['UK'], 1995: [], 1997: [], 2005: [], 2006: [] };
for (const [id, region] of Object.entries(promote)) {
  const a = E(+id); a.aliasOf = 0; a.aliasKind = ''; if (region.length) a.region = region; log.push('entry ' + a.text);
}
reindex(P);

// 2. synonym groups
const byText = (t, tid) => { const e = P.entries.find(x => x.text === t && !x.aliasOf && x.th[tid] !== undefined); if (!e) throw Error(`${t} not in ${tid}`); return e.id; };
const groups = {
  weather: [['rain', 'rainfall'], ['snow', 'snowfall'], ['fog', 'pea-souper', 'haar'], ['thunderstorm', 'electrical storm'], ['breeze', 'zephyr'], ['sleet', 'wintry mix'], ['drizzle', 'mizzle'], ['tornado', 'twister'], ['blizzard', 'snowstorm'], ['downpour', 'cloudburst', 'deluge']],
  storms: [['thunderstorm', 'electrical storm'], ['tornado', 'twister'], ['storm', 'tempest'], ['blizzard', 'snowstorm']],
};
for (const [tid, gs] of Object.entries(groups)) P.ix.theme.get(tid).groups = gs.map(g => g.map(t => byText(t, tid)));

// 3. forms: fix the part of speech of two, add the missing ones
E(31246).pos = 'adjective'; E(31247).pos = 'adjective';
const newForm = (root, text, rec) => {
  const r = E(root); if (sameText(P, text).length) throw Error(text + ' exists');
  const a = addEntry(P, text, { pos: 'adjective', rec, aliasOf: r.id, aliasKind: 'form', status: 'gen' }); reindex(P); return a;
};
const misty = newForm(1986, 'misty', 2), hazy = newForm(2011, 'hazy', 2), showery = newForm(1983, 'showery', 3), drizzly = newForm(1990, 'drizzly', 3), thundery = newForm(1972, 'thundery', 3);

// 4. weather: nouns only. The adjectives move to a new theme of their own.
const adjectives = [2020, 2007, 2026, 2027, 2028, 2029, 2030, 2031];   // sunny overcast chilly muggy balmy sultry blustery wintry
for (const id of adjectives) delete E(id).th.weather;

// 5. weather conditions: one theme of adjectives; a noun root shows its adjective form
const wc = { id: 'weather_conditions', name: 'weather conditions', parent: 'weather', group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: '', pop: 2 };
P.themes.splice(P.themes.findIndex(t => t.id === 'storms') + 1, 0, wc);
const own = { 2020: 1, 2007: 2, 2026: 2, 2027: 2, 2028: 4, 2029: 4, 2030: 3, 2031: 3, 39964: 1, 39945: 2, 39917: 2, 31443: 2 };   // sunny overcast chilly muggy balmy sultry blustery wintry snowy frosty icy humid
for (const [id, p] of Object.entries(own)) E(+id).th.weather_conditions = p;
const viaForm = [[1965, 2022, 1], [1969, 2023, 1], [1970, 2021, 1], [1971, 2025, 2], [1974, 2024, 2], [1979, 31246, 2], [2014, 31247, 3], [1986, misty.id, 2], [2011, hazy.id, 2], [1983, showery.id, 3], [1990, drizzly.id, 3], [1972, thundery.id, 3]];
for (const [root, form, p] of viaForm) { const r = E(root); r.th.weather_conditions = p; r.use = { ...r.use, weather_conditions: typeof form === 'number' ? form : form.id }; }

reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
console.log('library v' + P.lib.version, log.length, 'synonyms promoted');
