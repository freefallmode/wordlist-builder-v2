// Applies tools/gen/ease/e-*.txt (BRIEF-ease.md: `<entry id> <theme id> <R|I|RI>`). R sets familiarity (rec) to 1, I sets typicality in that theme to 1.
// Run: node tools/gen/ease-apply.mjs [--apply] [--report file.md]   (without --apply nothing is saved)
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, difficultyBand } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json'), APPLY = process.argv.includes('--apply');
const REPORT = process.argv.includes('--report') ? process.argv[process.argv.indexOf('--report') + 1] : '';
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const stat = { R: 0, I: 0, RI: 0, bad: 0, noop: 0 }, rows = [], problems = [], byTheme = {};
const before = new Map(P.themes.map(t => [t.id, 0]));
const d1 = tid => new Set((P.ix.byTheme.get(tid) || []).filter(e => e.enabled).map(e => e.aliasOf || e.id)).size && [...new Set((P.ix.byTheme.get(tid) || []).filter(e => e.enabled).map(e => e.aliasOf || e.id))].filter(id => difficultyBand(P, P.ix.entry.get(id), tid) === 1).length;
for (const t of P.themes) before.set(t.id, d1(t.id));
for (const f of fs.readdirSync(here('./ease/')).filter(f => /^e-\d+\.txt$/.test(f))) for (const l of fs.readFileSync(here('./ease/' + f), 'utf8').split(/\r?\n/)) {
  if (!l.trim() || l.startsWith('#')) continue;
  const m = /^(\d+)\s+(\S+)\s+(RI|R|I)\b/.exec(l.trim()), e = m && P.ix.entry.get(+m[1]), t = m && P.ix.theme.get(m[2]);
  if (!e || !t || e.aliasOf || e.typ[t.id] === undefined) { stat.bad++; problems.push(`${f}: cannot use "${l.slice(0, 80)}"`); continue; }
  const was = difficultyBand(P, e, t.id), r0 = e.fam, i0 = e.typ[t.id];
  if (m[3].includes('R') && e.fam > 1) e.fam = 1;
  if (m[3].includes('I') && e.typ[t.id] > 1) e.typ[t.id] = 1;
  if (e.fam === r0 && e.typ[t.id] === i0) { stat.noop++; continue; }
  stat[m[3]]++; rows.push({ t, e, from: was, r0, i0, r1: e.fam, i1: e.typ[t.id] }); (byTheme[t.name] ||= []).push(e.text);
}
reindex(P);
const after = P.themes.filter(t => !t.group && t.enabled !== false && t.pop === 1).map(t => d1(t.id));
const c = (a, n) => a.filter(x => x >= n).length;
console.log(stat, problems.slice(0, 10).join('\n'));
console.log('pop-1 themes with >=4 at difficulty 1:', c(P.themes.filter(t => !t.group && t.enabled !== false && t.pop === 1).map(t => before.get(t.id)), 4), '->', c(after, 4), '| >=6:', c(P.themes.filter(t => !t.group && t.enabled !== false && t.pop === 1).map(t => before.get(t.id)), 6), '->', c(after, 6));
if (REPORT) fs.writeFileSync(REPORT, ['# Difficulty-1 changes', '', JSON.stringify(stat), '', ...Object.entries(byTheme).map(([n, w]) => `- **${n}** (${w.length}): ${w.join(', ')}`), '', '## Detail', ...rows.map(r => `- ${r.t.name}: ${r.e.text} rec ${r.r0}->${r.r1}, typicality ${r.i0}->${r.i1}`)].join('\n'));
if (APPLY) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
