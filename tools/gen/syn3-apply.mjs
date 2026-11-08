// Puts the agents' groups (tools/gen/syn3/s-<n>.txt) into the themes' synonym groups. A group that touches an existing group extends it; groups are never split.
// Lines: <theme id> | <id> <id> ... | note. A line is skipped (and listed) when an id is not a root word of that theme.
// Run: node tools/gen/syn3-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url), LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const lab = id => { const e = P.ix.entry.get(id); return e ? e.text + (e.gloss ? ' [' + e.gloss + ']' : '') : '?' + id; };
// themes whose point is a set of words for one thing (slang, street names, nicknames) declare no groups
const NO_GROUPS = /(slang|street names|nicknames for|words for|terms for)/i;
let made = 0, extended = 0, merged = 0, bad = 0; const touched = new Set(), report = [];
for (const f of fs.readdirSync(here('./syn3/')).filter(f => /^s-\d+\.txt$/.test(f)).sort()) {
  for (const l of fs.readFileSync(here('./syn3/' + f), 'utf8').split(/\r?\n/)) {
    if (!l.trim() || l.startsWith('#')) continue;
    const [tid, ids, note] = l.split('|').map(s => s.trim()), t = P.ix.theme.get(tid), m = (ids || '').split(/\s+/).map(Number);
    if (t && NO_GROUPS.test(t.name)) { bad++; report.push('NO-GROUP THEME ' + l); continue; }
    const ok = t && m.length > 1 && m.every(id => { const e = P.ix.entry.get(id); return e && !e.aliasOf && e.typ[tid] !== undefined; });
    if (!ok) { bad++; report.push('SKIPPED ' + l); continue; }
    t.groups = t.groups || [];
    const hit = [...new Set(m.map(id => t.groups.find(g => g.includes(id))).filter(Boolean))];
    if (!hit.length) { t.groups.push([...new Set(m)]); made++; }
    else {
      const [first, ...rest] = hit, before = first.length;
      for (const id of m) if (!first.includes(id)) first.push(id);
      for (const g of rest) { for (const id of g) if (!first.includes(id)) first.push(id); t.groups.splice(t.groups.indexOf(g), 1); merged++; }
      if (first.length > before || rest.length) extended++; else continue;
    }
    touched.add(tid); report.push(`${tid}: ${m.map(lab).join(' / ')}${note ? '  (' + note + ')' : ''}`);
  }
}
console.log(report.join('\n')); console.log({ newGroups: made, extended, merged, skipped: bad, themes: touched.size });
const issues = validate(P).filter(i => /group/i.test(i.kind || '') || /Synonym group/.test(i.msg)); console.log('group issues', issues.length, issues.slice(0, 6).map(i => i.msg));
if (process.argv.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
