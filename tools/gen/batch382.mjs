// Library batch v382 (2026-11-16): makes the library consistent with Simon's five capital rules for single-word names (approved 2026-11-16;
//   DESIGN-entries.md "Single-word names: the five rules"). Supersedes the v381 calls on Ankara [fabric], Jacuzzi and Bakelite.
//   1. RECASE: written form and type of single entries; the tm flag is never changed (rule 4: a genericised trademark keeps it).
//   2. NOTE: the salad dressings theme note follows rule 5 (Caesar, Thousand Island).
//   The narrow audit (grape varieties, "brand names used as words", the Caesar and Florentine families) and the items left for Simon are in
//   tools/gen/batch382-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch382.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
// [id, old text, new text, new type, reason]
const RECASE = [
  [55369, 'Ankara', 'ankara', 'common', 'rule 2 (no dictionary entry: sibling convention): place-named fabrics are lowercase (denim, cashmere, madras, paisley); siblings in "African clothing" lowercase (kente, kitenge, adire); reverts v379, common as before; 35793 Ankara [city] unchanged'],
  [16288, 'Jacuzzi', 'jacuzzi', 'common', 'rule 4: a genericised trademark in "brand names used as words" is lowercase common with tm kept (xerox, teflon, formica); its other themes (bath time, spa, bathroom fixtures, hot things) mean the generic tub; reverts v381, common as before'],
  [29559, 'Bakelite', 'bakelite', 'common', 'rule 4: genericised trademark, lowercase common with tm kept; siblings in "plastics" and "man-made materials" lowercase (teflon, formica, styrofoam, celluloid); reverts v381, common as before'],
  [47725, 'Tannoy', 'tannoy', 'common', 'rule 4 (audit, same pattern as xerox): genericised trademark in "brand names used as words" and "station words", typed common with tm but stored with a capital; lowercase, tm kept; no earlier decision (capital since the depth-3 fill, 518bb6b)'],
];
// [theme id, old note, new note, reason]
const NOTE = [['salad_dressings', 'ranch, vinaigrette, caesar, thousand island, honey mustard, green goddess', 'ranch, vinaigrette, Caesar, Thousand Island, honey mustard, green goddess', 'rule 5: the theme note (a creation hint, not exported) follows the entries Caesar [dressing] and Thousand Island']];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const log = [];
let n = 0;
for (const [id, old, text, type, why] of RECASE) {
  const e = E(id);
  if (e.text === text && (e.type || 'common') === type) continue;
  if (e.text !== old) throw Error(`entry ${id} is "${e.text}", expected "${old}"`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length) throw Error(`entry ${id} has aliases or use: check by hand`);
  const twin = P.entries.find(x => x !== e && x.text === text && (x.gloss || '') === (e.gloss || '')); if (twin) throw Error(`"${text}" [${e.gloss}] would repeat ${twin.id}`);
  const elsewhere = P.entries.find(x => x !== e && Object.values(x.show || {}).includes(old)); if (elsewhere) throw Error(`entry ${elsewhere.id} shows "${old}": check by hand`);
  const d = [`"${e.text}" -> "${text}"`]; if ((e.type || 'common') !== type) d.push(`type ${e.type || 'common'} -> ${type}`);
  if (e.tm) d.push('tm (kept)');
  for (const [k, v] of Object.entries(e.show || {})) if (v === old) { d.push(`show ${k} dropped (repeated the entry)`); delete e.show[k]; }
  log.push(`${id} ${d.join('  ')}${e.gloss ? '  [' + e.gloss + ']' : ''}  (${why})`);
  e.text = text; e.type = type; n++;
}
for (const [tid, old, note, why] of NOTE) {
  const t = P.themes.find(x => x.id === tid); if (!t) throw Error(`no theme ${tid}`);
  if (t.note === note) continue;
  if (t.note !== old) throw Error(`theme ${tid} note is not as expected`);
  t.note = note; n++; log.push(`theme ${tid} note: "${old}" -> "${note}"  (${why})`);
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const TXT = `Rules: Simon's five capital rules for single-word names, approved 2026-11-16 (DESIGN-entries.md "Single-word names: the five rules").
Git history: none of the four words was set by Simon before (git log -S on each text; DESIGN-entries.md, ISSUES.md): ankara, jacuzzi, bakelite came
  from the theme fills and were capitalised only by v379/v381 (agent calls), Tannoy has been capital since the depth-3 fill (518bb6b). Types before
  v379/v381: ankara common, jacuzzi common, bakelite common (tm false then; v381 set tm, kept here by rule 4).

Audit (narrow, against the five rules):
(a) Grape varieties ("red wine grapes", "red wines", "white wines", "wines"): no grape is still capitalised without a proper word. Capitals left
  are Müller-Thurgau (person), nero d'Avola (Avola) and wines, not grapes: place-named Chianti, Bordeaux, Burgundy, Rioja, Beaujolais, Barolo,
  Lambrusco, Valpolicella, Côtes du Rhône, Brunello, Chablis, Sauternes, Tokaji, Soave, Gavi, Orvieto, Frascati, Madeira, Marsala, Sancerre;
  Amarone and Liebfraumilch (wine names, not place names; left).
  For Simon (rule 3, "wines named after places stay capital"; not changed, outside the grape check): lowercase place-named wines
  53809 châteauneuf-du-pape, 53835 pouilly-fuissé, 53833 white burgundy (Burgundy [wine] 19664 is capital), 53821 muscadet, 901 prosecco,
  19679 vinho verde, 905 port [wine]; rule 1 may keep some lowercase (port, prosecco: dictionaries lowercase or disagree). All from the
  depth-4/5 fill (65771ff), no Simon decision. Also 36456 Sancerre is typed place in "white wines" (the wine; the region sense shares the entry).
(b) "brand names used as words" (65 members), against rule 4:
  Applied: 47725 Tannoy -> tannoy (above), the one entry stored with a capital but typed common with tm.
  Consistent: lowercase common with tm (popsicle, paddle pop, rawlplug, tipp-ex, biro), and now jacuzzi, bakelite, tannoy.
  For Simon (T24), not changed:
  - 20 capital org entries with tm in the theme: Google, Uber, Thermos, Zamboni, Q-tip, Vaseline, ChapStick, Hoover, Crock-Pot, Velcro, Lego,
    Frisbee, Walkman, Dictaphone, Tupperware, Kleenex, Post-it, Stanley knife (org; a phrase), and proper with tm Scotch tape, Sellotape. Rule 4
    names Kleenex as capital org, and the theme is the genericised sense, so which of these are "used as words" (lowercase, as xerox) is a call
    per word. Several share the entry with brand themes (Lego, Frisbee: toy brands; Google, Uber: tech companies), so lowercasing them
    would need a split or shown text.
  - Lowercase genericised trademarks without the tm flag: xerox, teflon, formica (the rule's own examples), taser, rollerblade, styrofoam,
    plexiglas, photoshop, portakabin, jell-o, sharpie, astroturf, muzak, breathalyzer, jet ski, dumpster, laundromat, escalator, aspirin,
    linoleum, cellophane, granola, onesie, zipper, yo-yo, trampoline, tarmac, ouija, bubble wrap, jiffy bag (alias), dry ice; some are no
    longer trademarks anywhere (aspirin in the US, escalator, zipper, linoleum, cellophane, trampoline, yo-yo). Setting tm is not part of v382.
  - 48722 jeep [safari] is lowercase common but also serves "car brands" and "American car brands", where the brand Jeep is meant (capital,
    org, tm by rule 4): needs a split, as erlang and balboa at v380.
  - 29556 biro has the gloss "brand" though the theme means the pen; 5937 hula hoop and 5934 flying disc are typed phrase.
(c) Caesar family: Caesar [dressing] 53228, Caesar salad 18975 (shown "Caesar" in salads), Caesar [cocktail] 27554 all capital and proper;
  Caesar cipher, Caesar [Roman], Julius Caesar, Caesars Palace capital. Consistent; the salad dressings theme note was the one lowercase
  "caesar" (fixed above). Florentine: 50224 Florentine [of Florence] capital, as all 39 siblings in "city demonyms"; 64703 eggs Florentine
  capital; 18160 florentine [cookie] lowercase. Consistent.
Also seen, not changed: 25664 Bakelite phone (proper) keeps the capital while bakelite [material] is now lowercase (rule 5 may want
  bakelite phone; dictionaries capitalise Bakelite); Lycra, Kevlar, Gore-Tex, Tyvek capital but typed common in the material themes (T24).
Lint: no change needed. None of ankara, jacuzzi, bakelite, tannoy is in PROPER_WORDS, STYLE_WORDS or the allow-list, and lowercase common
  entries raise no case-lint kind, so style-case.mjs and propword-exceptions.mjs leave them as they are.
`;
  fs.writeFileSync(new URL('batch382-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch382.mjs, ${P.lib.modified}): ${n} changes (4 entries recased, tm kept; one theme note). Supersedes v381 on Ankara [fabric], Jacuzzi, Bakelite.\n\n${log.join('\n')}\n\n${TXT}`);
  console.log('library v' + P.lib.version);
}
