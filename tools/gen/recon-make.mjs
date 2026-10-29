// Writes tools/gen/recon/in-N.json: groups of same-text entries where at least one has no meaning label, for a review agent to resolve.
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const [lib, per = 150] = [process.argv[2], +process.argv[3] || 150];
const P = parseProject(readFileSync(lib, 'utf8')); reindex(P);
const T = id => P.ix.theme.get(id);
const by = new Map();
for (const e of P.entries) { const k = e.text.toLowerCase(); (by.get(k) || by.set(k, []).get(k)).push(e); }
const groups = [];
for (const [k, es] of by) {
  if (es.length < 2 || !es.some(e => !e.gloss)) continue;
  groups.push({ text: k, entries: es.map(e => { const ids = linkIds(P, e);
    return { id: e.id, text: e.text, gloss: e.gloss || '', type: e.type, rec: e.rec, aliasOf: e.aliasOf ? P.ix.entry.get(e.aliasOf)?.text + (P.ix.entry.get(e.aliasOf)?.gloss ? ` (${P.ix.entry.get(e.aliasOf).gloss})` : '') : undefined,
      themes: ids.slice(0, 7).map(t => `${T(t).name} [${T(t).id}]`), more: ids.length > 7 ? ids.length - 7 : undefined }; }) });
}
groups.sort((a, b) => a.text.localeCompare(b.text));
const n = Math.ceil(groups.length / per);
for (let i = 0; i < n; i++) writeFileSync(new URL(`recon/in-${i + 1}.json`, import.meta.url), JSON.stringify(groups.slice(i * per, (i + 1) * per), null, 1));
console.log(groups.length, 'groups in', n, 'files');
