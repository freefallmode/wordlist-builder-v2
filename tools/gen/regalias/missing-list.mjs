// Lists the audit pairs whose equivalent is not in the library (or only exists as another word's alias / another sense). Changes nothing.
// Run: node tools/gen/regalias/missing-list.mjs
import fs from 'node:fs';
import { parseProject } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const byText = new Map(); for (const e of P.entries) if (e.enabled) { const k = e.text.toLowerCase(); (byText.get(k) || byText.set(k, []).get(k)).push(e); }
const tn = id => P.ix.theme.get(id)?.name || id;
const rows = [];
for (let i = 1; fs.existsSync(here(`./list-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./r-${i}.txt`), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const [id, eq, rg = ''] = l.split('|').map(s => s.trim()), a = P.ix.entry.get(+id); if (!a) continue;
  const hits = (byText.get(eq.toLowerCase()) || []).filter(e => e.id !== a.id);
  if (a.aliasOf) continue;   // already made an alias in an earlier batch
  if (hits.some(e => e.aliasOf === a.id)) continue;
  if (!hits.length) rows.push({ a, eq, rg, why: 'missing' });
}
const lab = e => `#${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''} (${e.region.join('/') || '-'}) ${e.pos}/${e.type} fam${e.fam}`;
rows.sort((x, y) => x.a.text.localeCompare(y.a.text));
fs.writeFileSync(here('./missing-list.md'), `# Missing equivalents (${rows.length})\n\n` + rows.map((r, n) => `${n + 1}. ${lab(r.a)} -> ${r.eq} [${r.rg}] | themes ${Object.keys(r.a.typ).length}: ${Object.keys(r.a.typ).slice(0, 3).map(tn).join('; ')} | aliases ${(P.ix.aliases.get(r.a.id) || []).map(o => o.text + ':' + o.aliasKind).join(',') || '-'}`).join('\n') + '\n');
fs.writeFileSync(here('./missing-rows.json'), JSON.stringify(rows.map(r => ({ a: r.a.id, eq: r.eq, rg: r.rg }))));
console.log(rows.length);
