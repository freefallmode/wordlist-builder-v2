// The 20 full-name aliases that show-migrate.mjs left: most are the same thing as the bare word already in the theme (alias deleted),
// a few are different things (restored as entries shown under the bare text), hot springs is a real form (kept), electric ray shows as torpedo.
// Run once: node tools/gen/show-leftovers.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const O = parseProject(fs.readFileSync(new URL('./.tmp/pre-kept.json', import.meta.url), 'utf8')); reindex(O);
const alias = text => { const a = P.entries.find(e => e.text === text && e.aliasKind === 'form' && e.nameOkIn.length); if (!a) throw Error('no alias ' + text); return a; };
let deleted = 0, restored = 0;
for (const t of ['garden hose', 'garden bench', 'butterfly stroke', 'curling stone', 'rowing eight', 'cheerleading stunt', 'official scorer', 'Heisman Trophy', 'pilgrim traveler', 'power surge', 'baby carrier', 'taper candle', 'black rice', 'sweet violet', 'pink salmon']) { deleteEntry(P, alias(t)); deleted++; }
reindex(P);
// different things: [full name, theme, shown text]
for (const [text, tid, shown] of [['cobweb spider', 'spiders', 'cobweb'], ['moss garden', 'japanese_garden', 'moss'], ['rock goby', 'rock_pool', 'rock']]) {
  const a = alias(text), r = P.ix.entry.get(a.aliasOf);
  a.th[tid] = r.th[tid] || 3; a.show = { [tid]: shown }; delete r.th[tid]; a.aliasOf = 0; a.aliasKind = ''; a.nameOkIn = []; restored++;
  if (!Object.keys(r.th).length && !O.ix.entry.get(r.id) && !P.entries.some(x => x.aliasOf === r.id)) deleteEntry(P, r);
  reindex(P);
}
// pink salmon stays in "salmon and trout" only (the fish salmon already stands in the two pink themes)
const salmon = P.entries.find(e => e.text === 'pink salmon');
if (!salmon) {
  const fish = P.ix.entry.get(466), sample = P.entries.find(e => e.text === 'sockeye' || e.text === 'chinook');
  const e = { ...fish, id: P.nextId++, text: 'pink salmon', gloss: '', th: { salmon_and_trout: fish.th.salmon_and_trout || 3 }, show: { salmon_and_trout: 'pink' }, aliasOf: 0, aliasKind: '', nameOkIn: [], rec: Math.max(fish.rec, 3), status: 'gen', use: {}, region: [] };
  P.entries.push(e); reindex(P); restored++;
}
// electric ray and the eel's bare word both showed as "electric" in rays and eels: the ray has another name
const ray = P.entries.find(e => e.text === 'electric ray'); ray.show = { rays_and_eels: 'torpedo' };
reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
console.log({ deleted, restored }, 'library v' + P.lib.version);
