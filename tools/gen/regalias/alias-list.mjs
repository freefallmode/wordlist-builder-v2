// Lists the pairs from the regional-equivalent audit where both words exist as separate entries that share no theme, with everything needed to
// turn one into a regional alias of the other: sense candidates, which side should be the root, own aliases, synonym groups, theme links.
// Changes nothing. Run: node tools/gen/regalias/alias-list.mjs [out.md]
import fs from 'node:fs';
import { parseProject } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const byText = new Map(); for (const e of P.entries) if (e.enabled) { const k = e.text.toLowerCase(); (byText.get(k) || byText.set(k, []).get(k)).push(e); }
const tn = id => P.ix.theme.get(id)?.name || id;
const lab = e => `#${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''}${e.region.length ? ' (' + e.region.join('/') + ')' : ''} ${e.pos}${e.type !== 'common' ? ' ' + e.type : ''} fam${e.fam}`;
const info = e => {
  const als = (P.ix.aliases.get(e.id) || []).map(a => `${a.text}:${a.aliasKind}`);
  const grp = []; for (const t of P.themes) for (const g of t.groups || []) if (g.includes(e.id)) grp.push(tn(t.id));
  return `${lab(e)} | themes: ${Object.keys(e.typ).slice(0, 4).map(tn).join('; ') || 'none'} | aliases: ${als.join(', ') || '-'} | groups: ${grp.length}`;
};
const out = [], pairs = [];
const dir = here('./');
for (let i = 1; fs.existsSync(new URL(`list-${i}.txt`, dir)); i++) {
  for (const l of fs.readFileSync(new URL(`r-${i}.txt`, dir), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const [id, eq, rg = ''] = l.split('|').map(s => s.trim()), a = P.ix.entry.get(+id); if (!a) continue;
    const hits = (byText.get(eq.toLowerCase()) || []).filter(e => e.id !== a.id);
    if (hits.some(e => e.aliasOf === a.id)) continue;
    const roots = hits.filter(e => !e.aliasOf); if (!roots.length) continue;
    if (roots.some(h => Object.keys(a.typ).some(t => h.typ[t] !== undefined))) continue;   // shares a theme: already handled as a group
    pairs.push({ a, eq, rg, roots });
  }
}
pairs.sort((x, y) => x.a.text.localeCompare(y.a.text));
pairs.forEach((p, n) => {
  out.push(`${n + 1}. ${p.a.text}  ->  ${p.eq}  (equivalent used in: ${p.rg})`);
  out.push(`   A  ${info(p.a)}`);
  for (const h of p.roots) out.push(`   B  ${info(h)}`);
  out.push('');
});
const text = `# Regional alias candidates: both words exist, no shared theme (${pairs.length})\n\nA = region-flagged word from the audit, B = candidate entries for the equivalent.\n\n` + out.join('\n');
fs.writeFileSync(process.argv[2] ? process.argv[2] : here('./alias-list.md'), text);
console.log(pairs.length, 'pairs');
