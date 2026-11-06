// Lists the audit pairs where both words exist, are not aliases of each other, and sit in a synonym group together in at least one theme.
// Changes nothing. Run: node tools/gen/regalias/grouped-list.mjs [out.md]
import fs from 'node:fs';
import { parseProject } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const byText = new Map(); for (const e of P.entries) if (e.enabled) { const k = e.text.toLowerCase(); (byText.get(k) || byText.set(k, []).get(k)).push(e); }
const tn = id => P.ix.theme.get(id)?.name || id;
const lab = e => `#${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''}${e.region.length ? ' (' + e.region.join('/') + ')' : ''} ${e.pos} fam${e.fam}`;
const seen = new Set(), out = [], pairs = [];
for (let i = 1; fs.existsSync(here(`./list-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./r-${i}.txt`), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const [id, eq, rg = ''] = l.split('|').map(s => s.trim()), a = P.ix.entry.get(+id); if (!a || a.aliasOf) continue;
  for (const h of (byText.get(eq.toLowerCase()) || []).filter(e => e.id !== a.id && !e.aliasOf)) {
    const themes = P.themes.filter(t => (t.groups || []).some(g => g.includes(a.id) && g.includes(h.id)));
    if (!themes.length) continue;
    const key = [a.id, h.id].sort().join('-'); if (seen.has(key)) continue; seen.add(key);
    const groups = themes.map(t => t.name + ': ' + t.groups.find(g => g.includes(a.id) && g.includes(h.id)).map(x => P.ix.entry.get(x)?.text).join(', '));
    pairs.push({ a, h, rg, groups, ta: Object.keys(a.typ).length, th: Object.keys(h.typ).length });
  }
}
pairs.sort((x, y) => x.a.text.localeCompare(y.a.text));
pairs.forEach((p, n) => out.push(`${n + 1}. ${lab(p.a)} -> ${lab(p.h)} [eq used in ${p.rg}] links ${p.ta}/${p.th}\n     ${p.groups.join(' | ')}`));
fs.writeFileSync(process.argv[2] || here('./grouped-list.md'), `# Grouped regional pairs (${pairs.length})\n\n` + out.join('\n') + '\n');
fs.writeFileSync(here('./grouped-pairs.json'), JSON.stringify(pairs.map(p => ({ a: p.a.id, b: p.h.id, ra: p.a.region, rb: p.h.region, rg: p.rg })))); console.log(pairs.length);
