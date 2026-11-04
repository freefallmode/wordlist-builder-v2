// One-off (2026-11-05): fixes found when checking the flagged picks of the compound migration. Run: node tools/gen/flagged-fix.mjs [--apply]
//  - ice pop and ice lolly are generic words, not trademarks (Popsicle is); ice pop leaves "brand names used as words" (that is Popsicle's theme)
//  - date line is a normal term, not an idiom: type common
//  - snow line is the open spelling of snowline: a spelling alias, its theme link moves to the root
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => P.ix.entry.get(id), log = [];
const need = (id, text) => { const e = E(id); if (!e || e.text !== text) throw Error(`entry ${id} is not "${text}"`); return e; };
for (const [id, text] of [[18305, 'ice pop'], [18304, 'ice lolly']]) { const e = need(id, text); if (e.tm) { e.tm = false; log.push(`${text}: trademark off`); } }
const ip = need(18305, 'ice pop'); if (ip.th.brand_names_used_as_words !== undefined) { delete ip.th.brand_names_used_as_words; log.push('ice pop: left brand_names_used_as_words'); }
const dl = need(2427, 'date line'); if (dl.type === 'phrase') { dl.type = 'common'; log.push('date line: type common'); }
const sl = need(45101, 'snow line'), root = need(30851, 'snowline');
if (!sl.aliasOf) {
  for (const [t, v] of Object.entries(sl.th)) if (root.th[t] === undefined) root.th[t] = v;
  sl.th = {}; sl.show = {}; sl.use = {}; sl.aliasOf = root.id; sl.aliasKind = 'spelling'; log.push('snow line: spelling alias of snowline, link moved to the root');
}
// omelette (UK spelling of omelet) and crumbs (plural form of crumb) were linked on their own; spelling and form aliases follow their root. The link moves to the root; crumbs stays the form the theme shows (use).
{ const a = need(533, 'omelette'), r = need(532, 'omelet'); for (const [t, v] of Object.entries(a.th)) { if (r.th[t] === undefined) r.th[t] = v; } if (Object.keys(a.th).length) { a.th = {}; log.push('omelette: link moved to omelet'); } }
{ const a = need(27717, 'crumbs'), r = need(39504, 'crumb'); for (const [t, v] of Object.entries(a.th)) { if (r.th[t] === undefined) r.th[t] = v; r.use = { ...r.use, [t]: a.id }; } if (Object.keys(a.th).length) { a.th = {}; log.push('crumbs: link moved to crumb, the theme shows the form crumbs'); } }
reindex(P);
console.log(log.join('\n'));
const bad = validate(P).filter(i => i.sev === 'error'); console.log('errors', bad.length, bad.slice(0, 5).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
