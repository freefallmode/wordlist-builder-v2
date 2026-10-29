// Stricter near-duplicate finder: in one theme, two entries whose texts are equal once filler words are removed ("smell" / "sense of smell", "the Alps" / "Alps").
// Run: node tools/gen/near-dups2.mjs [library] [out.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const P = parseProject(readFileSync(process.argv[2] || new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const FILL = new Set('sense of the a an kind type sort piece to in on at for and with my your'.split(' '));
const key = t => t.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(w => w && !FILL.has(w)).join(' ');
const by = new Map(); for (const e of P.entries) for (const t of linkIds(P, e)) (by.get(t) || by.set(t, []).get(t)).push(e);
const out = [];
for (const [t, es] of by) {
  const m = new Map(); for (const e of es) { const k = key(e.text); if (k) (m.get(k) || m.set(k, []).get(k)).push(e); }
  for (const [k, g] of m) if (g.length > 1 && new Set(g.map(e => e.text.toLowerCase())).size > 1 && !(g.every(e => e.aliasOf === g[0].aliasOf && e.aliasOf)))
    out.push({ theme: t, entries: g.map(e => ({ id: e.id, text: e.text, gloss: e.gloss, aliasOf: e.aliasOf })) });
}
console.log(out.length, 'groups'); for (const o of out.slice(0, 25)) console.log(o.theme, o.entries.map(e => `${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''}#${e.id}${e.aliasOf ? '~' + e.aliasOf : ''}`).join(' | '));
if (process.argv[3]) writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
