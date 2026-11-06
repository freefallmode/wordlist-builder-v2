// Checks the agents' regional equivalents (tools/gen/regalias/r-<n>.txt: `<id> | <equivalent> | <regions>`) against the library and writes tools/gen/regalias/report.md. Changes nothing in the library.
// Run: node tools/gen/regalias-report.mjs
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const byText = new Map(); for (const e of P.entries) if (e.enabled) { const k = e.text.toLowerCase(); (byText.get(k) || byText.set(k, []).get(k)).push(e); }
const themeNames = e => Object.keys(e.typ).slice(0, 3).map(id => P.ix.theme.get(id)?.name).filter(Boolean).join('; ');
const lab = e => e.text + (e.gloss ? ' [' + e.gloss + ']' : '') + (e.region.length ? ' (' + e.region.join('/') + ')' : '');
const rows = [], bad = [];
for (let i = 1; fs.existsSync(here(`./regalias/list-${i}.txt`)); i++) {
  if (!fs.existsSync(here(`./regalias/r-${i}.txt`))) { bad.push('no result file for chunk ' + i); continue; }
  const listed = new Set(fs.readFileSync(here(`./regalias/list-${i}.txt`), 'utf8').split(/\r?\n/).filter(Boolean).map(l => +l.split(' | ')[0]));
  for (const l of fs.readFileSync(here(`./regalias/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const [id, eq, rg = ''] = l.split('|').map(s => s.trim()), root = P.ix.entry.get(+id);
    if (!root || !listed.has(+id) || !eq) { bad.push('bad line: ' + l); continue; }
    rows.push({ root, eq: eq.toLowerCase(), rg });
  }
}
const cat = { exists: [], aliasOther: [], aliasHere: [], missing: [] };
for (const r of rows) {
  const hits = (byText.get(r.eq) || []).filter(e => e.id !== r.root.id);
  const own = hits.find(e => e.aliasOf === r.root.id);
  if (own) { cat.aliasHere.push({ ...r, own }); continue; }
  const roots = hits.filter(e => !e.aliasOf), als = hits.filter(e => e.aliasOf);
  if (roots.length) cat.exists.push({ ...r, hits: roots });
  else if (als.length) cat.aliasOther.push({ ...r, hits: als });
  else cat.missing.push(r);
}
const n = new Set(rows.map(r => r.root.id)).size;
const out = [`# Regional equivalents for region-flagged common words with no regional alias`, '',
  `${n} words have at least one equivalent (${rows.length} pairs). ${bad.length} problems reading agent files.`, '',
  `- equivalent already an alias of this word under another kind: ${cat.aliasHere.length}`,
  `- equivalent exists as its own root word, not linked as an alias: ${cat.exists.length}`,
  `- equivalent exists only as an alias of a different root: ${cat.aliasOther.length}`,
  `- equivalent does not exist in the library: ${cat.missing.length}`, ''];
const sec = (title, list, f) => { out.push('## ' + title, ''); for (const x of list.sort((a, b) => a.root.text.localeCompare(b.root.text))) out.push(f(x)); out.push(''); };
sec('Already an alias, but not of kind regional', cat.aliasHere, x => `- ${lab(x.root)} -> ${x.eq}: alias kind ${x.own.aliasKind || '?'}, region ${x.own.region.join('/') || 'none'}`);
sec('Equivalent exists as its own word (could become a regional alias)', cat.exists, x => `- ${lab(x.root)} -> ${x.eq} (${x.rg}): ${x.hits.map(e => `#${e.id} ${lab(e)} in ${themeNames(e) || 'no themes'}`).join(' | ')}`);
sec('Equivalent exists only as an alias of another word', cat.aliasOther, x => `- ${lab(x.root)} -> ${x.eq} (${x.rg}): ${x.hits.map(e => `${lab(e)} alias of ${P.ix.entry.get(e.aliasOf)?.text}`).join(' | ')}`);
sec('Equivalent missing from the library', cat.missing, x => `- ${lab(x.root)} -> ${x.eq} (${x.rg})`);
if (bad.length) out.push('## Problems', '', ...bad.map(b => '- ' + b), '');
fs.writeFileSync(here('./regalias/report.md'), out.join('\n'));
console.log(out.slice(0, 11).join('\n'));
