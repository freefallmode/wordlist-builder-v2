// Library batch v379 (2026-11-16, approved by Simon: "Do the medium T15 list"): the medium list of tools/gen/t15-candidates.txt.
//   Single-word names stored lowercase and typed common take their capital and type `proper`, as Labrador, Dobermann and Bordeaux (and the
//   high list at v376). An existing tm flag stays. AeroPress and Chemex (coffee devices) get tm by DESIGN-entries.md "Brand types": a named
//   product is `proper` with `tm`. Each word was judged again against Oxford and Merriam-Webster usage and its theme's siblings.
//   Left out: Simon's doubtful cases (brie, parmesan, camembert, swiss, chihuahua, danish, florentine, manhattan, gibson, jacuzzi, bakelite),
//   balboa (split decided later). See tools/gen/batch379-changes.txt.
// No entry changed here has aliases, shown texts or `use` entries; no shown text elsewhere repeats an old form (8048 vesper bat, shown "vesper" in bats, is another sense). Changes nothing when already
// right, so it can be rerun as a check. Writes tools/gen/batch379-changes.txt. Run: node tools/gen/batch379.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// [id, written form, tm (undefined: unchanged), reason]; the old text is the form in lowercase
const FIX = [
  [9300, 'Bergamasco', undefined, 'dog breed, of Bergamo; kennel clubs capitalise'],
  [9362, 'Watusi', undefined, 'cattle breed (Ankole-Watusi), after a people; Ankole 9363 is capital'],
  [9366, 'Chianina', undefined, 'cattle breed, from Val di Chiana; capital in English breed use'],
  [17936, 'Taleggio', undefined, 'cheese, Val Taleggio; Oxford capital'],
  [63280, 'Danablu', undefined, 'cheese, protected name (PGI, not a trademark)'],
  [53107, 'Stichelton', undefined, 'cheese named by its dairy; brand cheeses stay proper (Brand types), tm not added'],
  [17950, 'Cotija', undefined, 'cheese, after the Mexican town; capital in usage, M-W lowercase'],
  [19634, 'Sazerac', undefined, 'cocktail, after the cognac brand; M-W capital (trademark); tm not added (cocktail, not the brand)'],
  [19641, 'Vesper', undefined, 'cocktail, after Vesper Lynd; capital in usage'],
  [24684, 'Panama', undefined, 'hat; Oxford capital, M-W often capitalised; 35750 Panama [country], 62660 [waterway] differ by gloss'],
  [24673, 'Hessians', undefined, 'boots, after the soldiers; Oxford Hessian boot; 55149 Hessians [soldiers] differs by gloss'],
  [55410, 'Kolhapuri', undefined, 'sandals, from Kolhapur; capital in Indian usage'],
  [55369, 'Ankara', undefined, 'fabric; capital in Nigerian and fashion usage; 35793 Ankara [city] differs by gloss'],
  [11850, 'Carlton', undefined, 'dance move, after the TV character Carlton Banks; 46388 Carlton [AFL club] differs by gloss'],
  [45428, 'Klondike', undefined, 'solitaire, after the region; Hoyle capital, M-W often capitalised; 31809 Klondike [region] differs by gloss'],
  [53236, 'Catalina', undefined, 'dressing, after Santa Catalina Island; 56225 Catalina [name] differs by gloss'],
  [53211, 'Choron', undefined, 'sauce, after the chef; Mornay sauce and sauce Robert are capital in the same theme'],
  [17237, 'Galia', undefined, 'melon cultivar; Oxford Galia melon'],
  [17238, 'Charentais', undefined, 'melon, of Charente; Oxford capital'],
  [17519, 'Jarrahdale', undefined, 'pumpkin, Western Australian town; Hubbard is capital in the same theme'],
  [19520, 'Nilgiri', undefined, 'tea, Nilgiri Hills; Darjeeling and Assam are capital in the same theme'],
  [19726, 'Kölsch', undefined, 'beer of Cologne, protected name; Oxford capital'],
  [53780, 'AeroPress', true, 'coffee device, trademark; a named product is proper with tm (Brand types)'],
  [53781, 'Chemex', true, 'coffee device, trademark; a named product is proper with tm (Brand types)'],
];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const byText = new Map(); for (const e of P.entries) (byText.get(e.text) || byText.set(e.text, []).get(e.text)).push(e);
const shown = new Set(); for (const e of P.entries) if (e.id !== 8048) for (const s of Object.values(e.show || {})) shown.add(String(s)); // 8048 "vesper bat" shown "vesper" in bats: another sense
const log = [], seen = new Set();
let n = 0;
for (const [id, text, tm, why] of FIX) {
  if (seen.has(id)) throw Error(`entry ${id} twice`); seen.add(id);
  const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`);
  const old = text.toLowerCase();
  if (e.text === text && e.type === 'proper' && (tm === undefined || !!e.tm === tm)) continue;
  if (e.text !== old || (e.type || 'common') !== 'common') throw Error(`entry ${id} is "${e.text}" (${e.type}), expected "${old}" (common)`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.show || {}).length || Object.keys(e.use || {}).length) throw Error(`entry ${id} has aliases or shown texts: check by hand`);
  if (shown.has(old)) throw Error(`a shown text elsewhere is "${old}": check by hand`);
  const twin = (byText.get(text) || []).find(x => x !== e && (x.gloss || '') === (e.gloss || '')); if (twin) throw Error(`entry ${id} "${text}" would repeat ${twin.id} with the same gloss`);
  const d = [`"${e.text}" -> "${text}"`, `type ${e.type || 'common'} -> proper`];
  if (tm !== undefined && !!e.tm !== tm) { d.push(`tm ${!!e.tm} -> ${tm}`); e.tm = tm; } else if (e.tm) d.push('tm (kept)');
  log.push(`${id} ${d.join('  ')}${e.gloss ? '  [' + e.gloss + ']' : ''}  (${why})`);
  e.text = text; e.type = 'proper'; n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const EXCL = `Left out (stay as they are):
  Simon's doubtful cases on the medium list, not ruled on: 240 brie, 241 parmesan, 244 camembert, 17956 swiss [cheese], 261 chihuahua, 593 danish [pastry], 18160 florentine [cookie], 19611 manhattan, 19643 gibson, 16288 jacuzzi, 29559 bakelite.
  11783 balboa [dance]: one entry serves the dance and the conquistador; the split is decided later (T15/T23).
  Not part of this batch: the places typed common (limousin, dundee, rhine, samara, hokkaido), the erlang split, the T23 duplicates.
Re-judged and kept (medium, for Simon to confirm if he wishes): Cotija (M-W lowercase), Panama and Klondike (M-W "often capitalized"), Ankara (fabric; no dictionary entry), Choron (no dictionary entry; follows Mornay, sauce Robert).
tm: added to AeroPress and Chemex (Brand types: a named product is proper with tm; org would be the alternative). Not added to Sazerac (a cocktail named after a trademark) or Stichelton (brand cheeses left proper for Simon).
`;
  fs.writeFileSync(new URL('batch379-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch379.mjs, ${P.lib.modified}): ${n} entries changed (text, type; tm on 2).\n\n${log.join('\n')}\n\n${EXCL}`);
  console.log('library v' + P.lib.version);
}
