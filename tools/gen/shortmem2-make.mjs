// Multi-theme short entries linked to a kinds theme whose full term exists as another entry (not yet linked there).
import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const E = p.entries, tname = new Map(p.themes.map(t => [t.id, t.name]));
const byText = new Map(); for (const e of E) { const k = e.text.toLowerCase(); if (!byText.has(k)) byText.set(k, []); byText.get(k).push(e); }
const sing = w => w.replace(/ies$/, 'y').replace(/ves$/, 'f').replace(/(ses|xes|ches|shes)$/, m => m.slice(0, -2)).replace(/s$/, '');
const STOP = new Set(['and', 'of', 'the', 'in', 'for', 'with', 'things', 'kinds', 'types', 'words', 'names', 'a', 'to']);
const rows = [];
for (const e of E) {
  if (e.aliasOf) continue; const ths = Object.keys(e.typ || {}); if (ths.length < 2) continue;
  for (const t of ths) {
    if (e.show && e.show[t]) continue;
    const ws = String(tname.get(t) || t).toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w));
    const full = new Map();
    for (const w of ws) for (const s of [w, sing(w)]) for (const c of [e.text.toLowerCase() + ' ' + s, s + ' ' + e.text.toLowerCase()]) for (const f of byText.get(c) || []) if (f !== e && !f.aliasOf && !(f.typ && f.typ[t] != null)) full.set(f.id, f);
    if (full.size === 1) { const f = [...full.values()][0]; rows.push({ e: e.id, t, text: e.text, ths: ths.length, f: f.id, ft: f.text }); }
  }
}
fs.mkdirSync(new URL('./shortmem2/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('./shortmem2/candidates.json', import.meta.url), JSON.stringify(rows));
const N = 8, per = Math.ceil(rows.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(new URL(`./shortmem2/list-${i + 1}.txt`, import.meta.url), rows.slice(i * per, (i + 1) * per).map(r => `${r.e}\t${r.t}\t${r.text}\t(${r.ths} themes)\t=> ${r.ft}`).join('\n') + '\n');
console.log(rows.length);
