// Library batch v376 (2026-11-15, approved by Simon): the high list of the T15 candidate pass (tools/gen/t15-candidates.txt) and T18.
//   T15  single-word names stored lowercase and typed common (breeds, cheeses, wines, liqueurs, dishes, ideologies named after people ...) take
//        their capital and type `proper`, as Labrador, Devon, Dobermann and Bordeaux already are; an existing tm flag stays, none is added.
//        Left out (stay as they are): Simon's doubtful cases (all on the medium list), the places typed common and the two-sense entries
//        (separate decisions), the T23 duplicates (gruyere/gruyère, comte/comté, epoisses/époisses, doberman, worcestershire), limousin 50045
//        (cattle; the word of an excluded place entry), holstein 9339 (cattle: 9863 Holstein [cow] is the same breed already, a duplicate).
//   T18  Composite (column styles) is an ordinary word: composite, typed common. Doric, Ionic column, Corinthian and Tuscan stay capital.
// No entry changed here has aliases, shown texts or `use` entries. Changes nothing when already right, so it can be rerun as a check.
// Writes tools/gen/batch376-changes.txt. Run: node tools/gen/batch376.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// [id, written form]; the old text is the form in lowercase
const CAP = `9303 Siamese|9310 Burmese|9311 Abyssinian|9313 Siberian|9315 Manx|9316 Birman|9317 Himalayan|9326 Tonkinese|9327 Balinese|9329 Chartreux|9330 Korat
|9331 Singapura|9332 Somali|63088 Persian|265 Dalmatian|266 Rottweiler|9290 Weimaraner|9293 Newfoundland|9294 Airedale|9296 Pekingese
|9340 Jersey|9341 Angus|9342 Hereford|9343 Guernsey|9344 Highland|9346 Brahman|9347 Charolais|9349 Simmental|9351 Ayrshire|9353 Dexter|9355 Galloway
|9359 Sussex|9363 Ankole|9365 Piedmontese|9367 Salers|9375 Kerry
|243 Gouda|245 Edam|246 Stilton|247 Gorgonzola|249 Roquefort|250 Manchego|252 Emmental|17927 Colby|17931 Wensleydale|17932 Cheshire|17934 Jarlsberg
|17939 Limburger|17940 Boursin|17941 Babybel|17951 Velveeta|17946 Asiago|39725 Munster|53087 Sbrinz|53088 Cantal|53089 Appenzeller|53090 Lancashire
|53093 Neufchâtel|53098 Cambozola|53100 Cabrales|53102 Dolcelatte|53114 Livarot|53116 Morbier|53126 Montasio|63422 American
|19674 Madeira|19675 Marsala|53807 Valpolicella|53822 Soave|53828 Gavi|53829 Orvieto|53830 Frascati|53832 Liebfraumilch|53867 Cointreau|53870 Chartreuse|53508 Amarula
|19729 Scotch|65150 Scotch|39179 Cajun|18521 Alfredo|18772 Fresno|6282 Charleston|24707 Akubra|55505 Shetland|18157 Biscoff|19227 Detroit-style
|33499 Marxism|33505 Maoism|33506 Leninism|33507 Stalinism|33508 Trotskyism|33515 Thatcherism|33516 Keynesianism|33522 Peronism|61046 Georgism|61049 Gaullism
|61050 Bonapartism|61051 Kemalism|61052 Titoism|61057 Luxemburgism|61059 Blairism|61060 Reaganism`.split('|').map(s => s.trim().split(' ')).map(([id, t]) => [+id, t.toLowerCase(), t, 'proper']);
const FIX = [...CAP, [14142, 'Composite', 'composite', 'common']];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const byText = new Map(); for (const e of P.entries) (byText.get(e.text) || byText.set(e.text, []).get(e.text)).push(e);
const log = [], seen = new Set();
let n = 0;
for (const [id, old, text, type] of FIX) {
  if (seen.has(id)) throw Error(`entry ${id} twice`); seen.add(id);
  const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`);
  if (e.text === text && e.type === type) continue;
  if (e.text !== old || e.type !== 'common' && e.type !== 'proper') throw Error(`entry ${id} is "${e.text}" (${e.type}), expected "${old}"`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.show || {}).length || Object.keys(e.use || {}).length) throw Error(`entry ${id} has aliases or shown texts: check by hand`);
  const twin = (byText.get(text) || []).find(x => x !== e && (x.gloss || '') === (e.gloss || '')); if (twin) throw Error(`entry ${id} "${text}" would repeat ${twin.id} with the same gloss`);
  log.push(`${id} "${e.text}" -> "${text}"  type ${e.type} -> ${type}${e.tm ? '  tm (kept)' : ''}${e.gloss ? '  [' + e.gloss + ']' : ''}`);
  e.text = text; e.type = type; n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.slice(0, 5).join('\n') + (log.length > 5 ? `\n... (${log.length} in all, tools/gen/batch376-changes.txt)` : ''));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const EXCL = `Left out (stay as they are):
  Simon's doubtful cases, not applied: brie, parmesan, camembert, swiss, chihuahua, danish, florentine, manhattan, gibson, jacuzzi, bakelite (all on the medium list); grape varieties (none on the high list).
  places typed common, a separate decision: 9348 limousin, 17506 hokkaido, 28047 dundee, 28233 rhine, 59409 samara.
  two senses in one entry, a split decided later: 41887 erlang, 11783 balboa.
  T23 duplicates, not touched: 253 gruyere / 19293 gruyère, 17937 comte / 53085 comté, 17948 epoisses / 53113 époisses (each pair would become two entries "Gruyère", "Comté", "Époisses"), 9276 doberman (51073 Dobermann), 29563 worcestershire (a county typed common, listed in T23).
  50045 limousin [cattle breed]: the same word as the excluded place entry 9348; left with it.
  9339 holstein [cattle] (cattle breeds): 9863 Holstein [cow] (black and white animals) is the same breed, proper; capitalising would make a duplicate.
  The medium list: not approved.
Brand names on the list that have no tm flag (none added; a decision): Jarlsberg, Cambozola, Dolcelatte, Cointreau, Amarula, Akubra, Biscoff.
`;
  fs.writeFileSync(new URL('batch376-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch376.mjs, ${P.lib.modified}): ${n} entries changed (text, type; flags unchanged).\n\n${log.join('\n')}\n\n${EXCL}`);
  console.log('library v' + P.lib.version);
}
