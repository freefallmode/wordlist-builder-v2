// Applies the overlap verdicts in tools/gen/overlap/v-*.txt (BRIEF-overlap.md).
//   MERGE <theme> <A> <B>   B leaves the theme; if that leaves B with no theme it becomes a strict synonym alias of A
//   BRAND <theme> <A> <B>   B leaves the theme (brands live in brand themes); entries left with no theme are listed
//   GROUP <theme> <A> <B>   A and B join one synonym group in the theme
//   SUB <theme> | <id> | <name> | <ids...>   a new sub-theme of the parent with those words
// Run: node tools/gen/overlap-apply.mjs [--apply] [--report file.md]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, sortDepthFirst, uniqueThemeId } from '../../js/model.js';
import { validate, nameLeak, themeNameWords } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const DIR = process.argv.includes('--dir') ? process.argv[process.argv.indexOf('--dir') + 1] : 'overlap';   // overlap, or overlap2 for the brand pass (BRIEF-overlap2.md)
const LIB = here('../../data/wordlist-en.project.json'), APPLY = process.argv.includes('--apply');
const REPORT = process.argv.includes('--report') ? process.argv[process.argv.indexOf('--report') + 1] : '';
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => P.ix.entry.get(+id), T = id => P.ix.theme.get(id);
const stat = { MERGE: 0, BRAND: 0, GROUP: 0, SUB: 0, bad: 0, orphanedToAlias: 0 }, problems = [], orphans = [], kept = [], subs = [], log = [];
const toks = s => s.toLowerCase().match(/[a-z0-9]+/g) || [];
const fold = s => s.toLowerCase().replace(/[^a-z0-9]/g, ''), slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const regroup = (t, fn) => { if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(fn).filter(Boolean))]).filter(g => g.length > 1); };
const files = fs.readdirSync(here('./' + DIR + '/')).filter(f => /^v-\d+\.txt$/.test(f)).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
const lines = [];
for (const f of files) for (const l of fs.readFileSync(here('./' + DIR + '/' + f), 'utf8').split(/\r?\n/)) if (l.trim() && !l.startsWith('#')) lines.push([f, l.trim()]);
const slist = lines.filter(([, l]) => l.startsWith('SUB')), plist = lines.filter(([, l]) => !l.startsWith('SUB'));
const leave = (t, b, why) => {
  if (b.th[t.id] === undefined) return false;
  delete b.th[t.id]; regroup(t, id => id === b.id ? 0 : id);
  if (b.show) { delete b.show[t.id]; if (!Object.keys(b.show).length) delete b.show; }
  return true;
};
for (const [f, l] of plist) {
  const m = /^(MERGE|BRAND|GROUP)\s+(\S+)\s+(\d+)\s+(\d+)$/.exec(l);
  if (!m) { stat.bad++; problems.push(`${f}: cannot read "${l.slice(0, 80)}"`); continue; }
  const [, verb, tid, ai, bi] = m, t = T(tid), a = E(ai), b = E(bi);
  if (!t || !a || !b) { stat.bad++; problems.push(`${f}: missing theme or entry in "${l}"`); continue; }
  if (a.aliasOf || b.aliasOf) { stat.bad++; problems.push(`${f}: alias in "${l}"`); continue; }
  if (a.th[tid] === undefined || b.th[tid] === undefined) { problems.push(`${f}: already gone "${l}"`); continue; }
  if (verb === 'GROUP') {
    t.groups = t.groups || [];
    const ga = t.groups.find(g => g.includes(a.id)), gb = t.groups.find(g => g.includes(b.id));
    if (ga && gb && ga !== gb) { ga.push(...gb.filter(x => !ga.includes(x))); t.groups = t.groups.filter(g => g !== gb); }
    else if (ga) { if (!ga.includes(b.id)) ga.push(b.id); } else if (gb) { gb.push(a.id); } else t.groups.push([a.id, b.id]);
    stat.GROUP++; log.push(`GROUP in ${t.name}: ${a.text} + ${b.text}`); continue;
  }
  if (verb === 'BRAND' && Object.keys(b.th).length === 1) { kept.push(b.id + ' ' + b.text + ' (' + t.name + ')'); continue; }
  leave(t, b); stat[verb]++; log.push(`${verb} in ${t.name}: ${b.text} out (kept ${a.text})`);
  const left = Object.keys(b.th).length;
  if (!left && !P.entries.some(x => x.aliasOf === b.id && Object.keys(x.th).length)) {
    if (verb === 'MERGE') {
      for (const x of P.entries) if (x.aliasOf === b.id) x.aliasOf = a.id;
      for (const x of P.entries) if (x.use) for (const k of Object.keys(x.use)) if (x.use[k] === b.id) delete x.use[k];
      for (const t2 of P.themes) regroup(t2, id => id === b.id ? a.id : id);
      P.entries.splice(P.entries.indexOf(b), 1); stat.orphanedToAlias++;
    } else orphans.push(`${b.id} ${b.text} (from ${t.name})`);
  }
}
for (const [f, l] of slist) {
  const parts = l.replace(/^SUB\s+/, '').split('|').map(x => x.trim());
  if (parts.length < 4) { stat.bad++; problems.push(`${f}: cannot read "${l.slice(0, 80)}"`); continue; }
  const [pid, , name, idsText] = parts, ids = [...new Set((idsText.match(/\d+/g) || []).map(Number))], parent = T(pid), es = ids.map(E);
  let leakShow = null;
  const bad = [], NOISE = new Set(['types', 'type', 'species', 'varieties', 'forms', 'kinds', 'styles', 'subspecies', 'breeds']);
  if (!parent) bad.push('no parent'); else if (parent.complete) bad.push('parent complete');
  else if (es.some(e => !e || e.th[pid] === undefined)) bad.push('a word is not in the parent');
  if (ids.length < 4) bad.push('only ' + ids.length + ' words');
  if (P.themes.some(t => fold(t.name) === fold(name))) bad.push('a theme with this name exists');
  if (!bad.length) {
    const probe = { id: 'x', name, nameOk: false }, leaks = es.filter(e => nameLeak(probe, e, themeNameWords(probe))).map(e => e.text);
    if (leaks.length) { const key = toks(name).filter(w => !NOISE.has(w)); if (!key.length || leaks.length < es.length * 0.6) bad.push('name gives away ' + leaks.slice(0, 4).join(', ')); else leakShow = key.flatMap(w => [w, w.replace(/s$/, ''), w.replace(/ies$/, 'y'), w.replace(/ves$/, 'f')]); }
    const parentN = new Set((P.ix.byTheme.get(pid) || []).map(e => e.aliasOf || e.id)).size;
    if (ids.length > parentN * 0.7) bad.push(`${ids.length} of ${parentN} words is most of the parent`);
  }
  if (bad.length) { stat.bad++; problems.push(`${f}: "${name}" under ${pid}: ${bad.join('; ')}`); continue; }
  const id = uniqueThemeId(P, slug(name));
  const strip = (txt, key) => txt.split(/\s+/).filter(w => !key.includes(w.toLowerCase().replace(/[^a-z0-9]/g, ''))).join(' ');
  subs.push({ id, name, parent: pid, ids, pop: parent.pop || 3 });
  stat.SUB++;
  P.themes.push({ id, name, parent: pid, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: parent.lang, region: [], note: '', pop: parent.pop || 3 });
  reindex(P);
  for (const e of es) { e.th[id] = e.th[pid]; if (leakShow) { const sh = strip(e.show?.[pid] || e.text, leakShow); if (sh && sh !== (e.show?.[pid] || e.text)) { e.show = { ...e.show, [id]: sh }; e.nameOkIn = [...new Set([...(e.nameOkIn || []), id])]; } } }
  if (leakShow) for (const a of P.entries) if (es.some(e => e.id === a.aliasOf)) a.nameOkIn = [...new Set([...(a.nameOkIn || []), id])];
  reindex(P);
}
sortDepthFirst(P); reindex(P);
console.log(files.length + ' files', stat); console.log(problems.slice(0, 40).join('\n'), problems.length > 40 ? `\n... and ${problems.length - 40} more` : '');
console.log('brands kept because they have no other theme:', kept.length);
console.log('orphaned brand entries (no theme left):', orphans.length, orphans.slice(0, 20).join('; '));
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 10).map(i => i.msg).join('\n'));
console.log('overlap pairs left:', validate(P).filter(i => i.kind === 'overlap').length);
if (REPORT) {
  const out = ['# Overlap sweep', '', JSON.stringify(stat), '', '## Sub-themes', ...subs.map(s => `- **${s.name}** under ${s.parent} (${s.ids.length}): ${s.ids.map(i => E(i).text).join(', ')}`), '', '## Brand entries left without a theme', ...orphans.map(o => '- ' + o), '', '## Changes', ...log.map(x => '- ' + x), '', '## Problems', ...problems.map(x => '- ' + x)];
  fs.writeFileSync(REPORT, out.join('\n'));
}
if (APPLY) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
