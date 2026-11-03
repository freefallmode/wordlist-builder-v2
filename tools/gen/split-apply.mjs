// Checks (and with --apply, adds) the sub-themes proposed by BRIEF-split.md: node tools/gen/split-apply.mjs <proposal file>... [--apply] [--report file]
//   S <parent id> | <name> | <popularity> | <word ids>   a new sub-theme of the parent; the words keep their parent link and get a link here with the same rating
//   N <parent id>                                       no split
// Without --apply nothing is written. A proposal with a problem is skipped and reported.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, uniqueThemeId, sortDepthFirst } from '../../js/model.js';
import { nameLeak, themeNameWords } from '../../js/validate.js';
import { fold } from '../../js/freq.js';
const args = process.argv.slice(2), APPLY = args.includes('--apply'), ri = args.indexOf('--report');
const REPORT = ri >= 0 ? args.splice(ri, 2)[1] : null;
const files = args.filter(a => !a.startsWith('--'));
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const problems = [], made = [], skipped = [], noSplit = [];
const slug = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
let comment = '';
for (const f of files) for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
  const s = line.trim(); if (!s) continue;
  if (s[0] === '#') { comment = s.replace(/^#\s*/, ''); continue; }
  let m;
  if ((m = /^N (\S+)$/.exec(s))) { if (!P.ix.theme.get(m[1])) problems.push(`${f}: no theme ${m[1]}`); else noSplit.push(m[1]); comment = ''; continue; }
  if (!(m = /^S (\S+) \| (.+?) \| ([1-5]) \| ([\d, ]+)$/.exec(s))) { problems.push(`${f}: cannot read "${s.slice(0, 70)}"`); continue; }
  const [, pid, rawName, pop, idList] = m, name = rawName.trim(), why = comment; comment = '';
  const parent = P.ix.theme.get(pid); if (!parent) { problems.push(`${f}: no theme ${pid}`); continue; }
  const ids = [...new Set(idList.split(',').map(x => +x.trim()).filter(Boolean))];
  const es = ids.map(id => P.ix.entry.get(id));
  const bad = [];
  if (es.some(e => !e || e.aliasOf)) bad.push('a word id is missing or is an alias');
  else if (es.some(e => e.th[pid] === undefined)) bad.push('a word is not in the parent');
  if (ids.length < 4) bad.push(`only ${ids.length} words`);
  const parentN = new Set((P.ix.byTheme.get(pid) || []).map(e => e.aliasOf || e.id)).size;
  if (ids.length > parentN * 0.7) bad.push(`${ids.length} of ${parentN} words is most of the parent`);
  if (parent.complete) bad.push('the parent is complete');
  if (P.themes.some(t => fold(t.name) === fold(name))) bad.push('a theme with this name exists');
  const probe = { id: 'x', name, nameOk: false };
  const leaks = es.filter(e => e && nameLeak(probe, e, themeNameWords(probe))).map(e => e.text);
  if (leaks.length) bad.push(`name gives away ${leaks.slice(0, 4).join(', ')}`);
  if (bad.length) { problems.push(`${f}: "${name}" under ${pid}: ${bad.join('; ')}`); skipped.push({ pid, name }); continue; }
  const id = uniqueThemeId(P, slug(name));
  made.push({ id, name, parent: pid, pop: +pop, ids, why });
  if (APPLY) {
    P.themes.push({ id, name, parent: pid, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: parent.lang, region: [], note: '', pop: +pop });
    reindex(P);
    for (const e of es) e.th[id] = e.th[pid];
    reindex(P);
  }
}
for (const p of problems.slice(0, 60)) console.log('PROBLEM', p);
if (problems.length > 60) console.log('... and', problems.length - 60, 'more');
console.log(`${made.length} sub-themes ${APPLY ? 'added' : 'proposed'}, ${noSplit.length} themes with no split, ${skipped.length} skipped`);
if (APPLY) { sortDepthFirst(P); reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
if (REPORT) {
  const out = ['# Proposed sub-themes', '', `${made.length} proposals`, ''];
  const by = new Map(); for (const x of made) { if (!by.has(x.parent)) by.set(x.parent, []); by.get(x.parent).push(x); }
  for (const [pid, xs] of by) {
    out.push(`## ${P.ix.theme.get(pid).name}`);
    for (const x of xs) out.push(`- **${x.name}** (pop ${x.pop}, ${x.ids.length} words): ${x.why}`, `  ${x.ids.map(i => P.ix.entry.get(i).text).join(', ')}`);
    out.push('');
  }
  fs.writeFileSync(REPORT, out.join('\n'));
}
