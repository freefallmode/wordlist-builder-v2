// Applies tools/gen/pop/p-*.txt (BRIEF-pop2.md: `<themeId> <new pop> | reason`) to theme popularity.
// Run: node tools/gen/pop-apply.mjs [--apply] [--report file.md]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const REPORT = process.argv.includes('--report') ? process.argv[process.argv.indexOf('--report') + 1] : '';
const moves = {}, rows = [], problems = [];
for (const f of fs.readdirSync(here('./pop/')).filter(f => /^p-\d+\.txt$/.test(f))) for (const l of fs.readFileSync(here('./pop/' + f), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const m = /^(\S+)\s+([1-5])\s*(?:\|\s*(.*))?$/.exec(l.trim()), t = m && P.ix.theme.get(m[1]);
  if (!t) { problems.push(`${f}: cannot read "${l.slice(0, 80)}"`); continue; }
  const to = +m[2]; if (t.pop === to) continue;
  const k = `${t.pop}->${to}`; moves[k] = (moves[k] || 0) + 1; rows.push({ t, from: t.pop, to, why: m[3] || '' });
  t.pop = to;
}
console.log(moves, problems.slice(0, 10).join('\n'));
const now = [1, 2, 3, 4, 5].map(p => P.themes.filter(t => !t.group && t.enabled !== false && t.pop === p).length); console.log('pop 1-5 now', now.join(' / '));
for (const n of ['ancient egypt', 'famous ships', 'nuts', 'dairy', 'herbs', 'countries', 'orange varieties']) { const t = P.themes.find(t => t.name === n); console.log(n, t ? t.pop : '-'); }
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 5).map(i => i.msg).join('\n'));
if (REPORT) fs.writeFileSync(REPORT, ['# Theme popularity changes', '', JSON.stringify(moves), '', ...rows.map(r => `- ${r.t.name}: ${r.from} -> ${r.to} (${r.why})`)].join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
