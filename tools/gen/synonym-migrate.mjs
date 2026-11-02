// Retires the `synonym` alias kind (DESIGN-entries.md 3.1). Each synonym alias becomes one of:
//   shown   - the alias is the full name and the root a theme-local shortening of it (butterflies / butterfly collecting): the alias becomes an entry shown under the root's text
//   abbr    - the root is an abbreviation or clipping of the alias (PTH / parathyroid hormone): the alias becomes the root, the old root an `abbreviation` alias
//   regional- the alias carries a UK-type region: kind `regional`
//   entry   - anything else (mimosa / sensitive plant): the alias becomes an entry of its own with the root's theme links and a synonym group per theme
// Run once: node tools/gen/synonym-migrate.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const ABBR = new Set([14613, 14619, 18905, 49247, 12869, 58036, 41737, 61842, 10685, 49502, 32601, 34981, 53083, 40824]);   // alias ids whose root is an abbreviation or clipping
const words = t => t.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const stem = (a, b) => a === b || (Math.min(a.length, b.length) >= 4 && a.slice(0, 4) === b.slice(0, 4) && (a.startsWith(b.slice(0, Math.min(a.length, b.length) - 1)) || b.startsWith(a.slice(0, Math.min(a.length, b.length) - 1))));
const NOT_SHOWN = new Set([12788, 57598]);   // Berlinale and gallerist are names of their own
const plan = { shown: [], abbr: [], regional: [], entry: [] };
const syn = P.entries.filter(e => e.aliasKind === 'synonym');
for (const a of syn) {
  const r = P.ix.entry.get(a.aliasOf);
  const aw = words(a.text), rw = words(r.text);
  const shortOf = rw.every(w => aw.some(x => stem(w, x))) && a.text.length > r.text.length;
  if (ABBR.has(a.id)) plan.abbr.push(a);
  else if (a.region?.some(c => c !== 'US') && !a.region.includes('US')) plan.regional.push(a);
  else if (a.id === 65726) plan.drop = (plan.drop || []).concat(a);
  else if (shortOf && !NOT_SHOWN.has(a.id) && a.nameOkIn?.length && a.nameOkIn.every(t => r.th[t] !== undefined)) plan.shown.push(a);
  else plan.entry.push(a);
}
for (const k in plan) console.log(k, plan[k].length, plan[k].map(a => a.text + '<-' + P.ix.entry.get(a.aliasOf).text).join('; ').slice(0, 1400));
const stat = { shown: 0, abbr: 0, regional: 0, entry: 0, groups: 0, rootsDeleted: 0 };
const own = (a, r) => { a.aliasOf = 0; a.aliasKind = ''; a.pos = a.pos || r.pos; a.type = a.type || r.type; a.region = a.region || []; };
const addGroup = (tid, x, y) => { const t = P.ix.theme.get(tid); t.groups = t.groups || []; const g = t.groups.find(g => g.includes(x)) || t.groups.find(g => g.includes(y)); if (g) { for (const id of [x, y]) if (!g.includes(id)) g.push(id); } else t.groups.push([x, y]); stat.groups++; };
for (const a of plan.regional) { a.aliasKind = 'regional'; stat.regional++; }
for (const a of plan.entry) {
  const r = P.ix.entry.get(a.aliasOf); own(a, r);
  a.th = { ...r.th }; for (const tid in a.th) addGroup(tid, r.id, a.id);
  stat.entry++;
}
for (const a of plan.abbr) {
  const r = P.ix.entry.get(a.aliasOf); own(a, r);
  a.th = { ...r.th }; a.show = { ...r.show, ...a.show }; r.th = {}; delete r.show;
  for (const s of P.entries) if (s.aliasOf === r.id && s !== a) s.aliasOf = a.id;
  r.aliasOf = a.id; r.aliasKind = 'abbreviation'; r.nameOkIn = [];
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === r.id ? a.id : id))]).filter(g => g.length > 1);
  stat.abbr++;
}
for (const a of plan.shown) {
  const r = P.ix.entry.get(a.aliasOf); own(a, r);
  a.th = {}; a.show = {};
  for (const tid of a.nameOkIn) { a.th[tid] = r.th[tid]; a.show[tid] = r.text; delete r.th[tid]; const t = P.ix.theme.get(tid); if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === r.id ? a.id : id))]).filter(g => g.length > 1); }
  a.nameOkIn = []; a.__r = r; stat.shown++;
}
for (const a of plan.drop || []) P.entries.splice(P.entries.indexOf(a), 1);   // e-bike is its own entry already
reindex(P);
for (const a of plan.shown) { const r = a.__r; delete a.__r; if (!Object.keys(r.th).length && !r.aliasOf) { for (const s of P.entries) if (s.aliasOf === r.id) s.aliasOf = a.id; P.entries.splice(P.entries.indexOf(r), 1); stat.rootsDeleted++; } }
reindex(P);
console.log(stat);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 15).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
