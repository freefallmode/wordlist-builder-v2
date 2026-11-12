// Applies tools/gen/shortmem2/r-<n>.txt (`<entryId> <themeId> C|K|X`): C moves the theme link from the short entry to the full term
// (typ copied, show = short text); the short entry stays in its other themes. Groups of that theme follow the full term.
// Run: node tools/gen/shortmem2-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const cand = JSON.parse(fs.readFileSync(here('./shortmem2/candidates.json'), 'utf8'));
const by = new Map(cand.map(r => [r.e + '|' + r.t, r]));
const stat = { C: 0, K: 0, X: 0, bad: 0, skipped: 0 }, log = [];
for (let i = 1; fs.existsSync(here(`./shortmem2/r-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./shortmem2/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const m = /^(\d+)\s+(\S+)\s+([CKX])\s*$/.exec(l.trim()), r = m && by.get(m[1] + '|' + m[2]);
  if (!r) { stat.bad++; console.log('bad ' + l); continue; }
  stat[m[3]]++; if (m[3] !== 'C') continue;
  const e = P.ix.entry.get(r.e), f = P.ix.entry.get(r.f);
  if (!e || !f || e.typ[r.t] == null || f.typ[r.t] != null || Object.keys(e.typ).length < 2) { stat.skipped++; continue; }
  f.typ[r.t] = e.typ[r.t]; f.show = Object.assign({}, f.show, { [r.t]: (e.show && e.show[r.t]) || e.text });
  delete e.typ[r.t]; if (e.show) delete e.show[r.t];
  const th = P.ix.theme.get(r.t); if (th && th.groups) th.groups = th.groups.map(g => [...new Set(g.map(id => id === e.id ? f.id : id))]).filter(g => g.length > 1);
  log.push(r.t + ': ' + e.text + ' => ' + f.text);
}
{ const a = P.ix.entry.get(64971); if (a) a.show = Object.assign({}, a.show, { cables_and_connectors: 'fibre optic' }); } // UK spelling alias of fiber optic cable
console.log(stat);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(here('./shortmem2/log.txt'), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }
