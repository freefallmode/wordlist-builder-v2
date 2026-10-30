// Reports what the theme-name review results would drop or replace, from the result files and the current library (run it BEFORE applying them).
// Run: node tools/gen/leak-report.mjs [out.md]      default out: tools/gen/leak/dropped.md
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const dir = new URL('./leak/', import.meta.url);
const files = fs.readdirSync(dir).filter(f => /^r-\d+\.txt$/.test(f)).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
const label = e => e ? e.text + (e.gloss ? ` (${e.gloss})` : '') + (e.aliasOf ? ' [alias]' : '') : '?';
const themes = new Map(); let cur = null, nS = 0, nD = 0;
for (const f of files) for (const line of fs.readFileSync(new URL(f, dir), 'utf8').split(/\r?\n/)) {
  const s = line.trim(); let m;
  if ((m = /^T (\S+)( OK)?$/.exec(s))) { cur = themes.get(m[1]) || { id: m[1], ok: !!m[2], D: [], S: [] }; themes.set(m[1], cur); }
  else if (cur && (m = /^D (\d+)$/.exec(s))) { cur.D.push(P.ix.entry.get(+m[1])); nD++; }
  else if (cur && (m = /^S (\d+) (?:= (\d+)|\| ([^|]+) \| ([^|]*) \| \d)$/.exec(s))) { cur.S.push([P.ix.entry.get(+m[1]), m[2] ? label(P.ix.entry.get(+m[2])) + ' (existing)' : m[3].trim() + (m[4].trim() !== '-' ? ` (${m[4].trim()})` : '')]); nS++; }
}
const out = [`# Theme-name review: what would be dropped or replaced`, '',
  `${files.length} result files, ${themes.size} themes, ${nD} entries dropped from their theme, ${nS} replaced. Nothing is applied yet. [alias] entries are deleted outright; a root that has other themes only loses this link.`, ''];
const thin = [];
for (const t of [...themes.values()].sort((a, b) => b.D.length - a.D.length)) {
  const th = P.ix.theme.get(t.id); if (!th) continue;
  const all = P.ix.byTheme.get(t.id) || [], gone = new Set([...t.D, ...t.S.map(x => x[0])]);
  const left = all.filter(e => !gone.has(e) && !e.aliasOf).length + t.S.length;
  if (th.complete && (t.D.length || t.S.length)) thin.push(`${t.id} (complete): ${all.length} -> ${left}`);
  else if (left < 8) thin.push(`${t.id}: ${all.length} -> ${left}`);
}
out.push('## Themes that end up short, or complete sets that lose members', '', ...thin.map(x => '- ' + x), '', '## By theme (most dropped first)', '');
for (const t of [...themes.values()].sort((a, b) => b.D.length - a.D.length)) {
  if (t.ok) { out.push(`### ${t.id}: marked as wordplay (nothing changed)`, ''); continue; }
  if (!t.D.length && !t.S.length) continue;
  out.push(`### ${t.id}${P.ix.theme.get(t.id)?.complete ? ' (complete)' : ''}`);
  if (t.D.length) out.push(`Dropped (${t.D.length}): ${t.D.map(label).join('; ')}`);
  if (t.S.length) out.push(`Replaced (${t.S.length}): ${t.S.map(([e, n]) => `${label(e)} → ${n}`).join('; ')}`);
  out.push('');
}
fs.writeFileSync(process.argv[2] || new URL('./leak/dropped.md', import.meta.url), out.join('\n'));
console.log(files.length, 'files;', themes.size, 'themes;', nD, 'dropped;', nS, 'replaced;', thin.length, 'short or complete themes');
