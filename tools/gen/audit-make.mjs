// Writes tools/gen/recon/audit-in-N.json: single unlabelled entries linked into themes of 2+ unrelated roots (possible mixed meanings).
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const P = parseProject(readFileSync(process.argv[2], 'utf8')), per = +process.argv[3] || 150; reindex(P);
const T = id => P.ix.theme.get(id), root = id => { let t = T(id); while (t.parent && T(t.parent)) t = T(t.parent); return t.id; };
const skip = new Set(['language_wordplay']);
const done = new Set(JSON.parse(readFileSync(new URL('recon/audited-ids.json', import.meta.url), 'utf8')));   // entries already reviewed in an earlier round
const by = new Map(); for (const e of P.entries) { const k = e.text.toLowerCase(); (by.get(k) || by.set(k, []).get(k)).push(e); }
const out = [];
for (const [k, es] of by) {
  if (es.length !== 1 || es[0].gloss || es[0].aliasOf || done.has(es[0].id)) continue;
  const ids = linkIds(P, es[0]).filter(t => !skip.has(root(t)));
  const roots = new Set(ids.map(root)); if (roots.size < 2) continue;
  const e = es[0];
  out.push({ id: e.id, text: e.text, type: e.type, fam: e.fam, themes: ids.slice(0, 10).map(t => `${T(t).name} [${T(t).id}] (${root(t)})`) });
}
out.sort((a, b) => a.text.localeCompare(b.text));
const n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) writeFileSync(new URL(`recon/audit-in-${i + 1}.json`, import.meta.url), JSON.stringify(out.slice(i * per, (i + 1) * per), null, 1));
console.log(out.length, 'candidates in', n, 'files');
