// Applies the verdicts in tools/gen/<dir>/v-*.txt (BRIEF-bare.md): a bare modifier in a kinds theme becomes the full term shown short.
//   FULL <theme> <bare id> <full text> <id | NEW | pos | type | rec | link>
// Existing full-term entry: it takes the bare word's place in the theme. NEW and the bare word has only this theme and no aliases: retexted in place (ids stay, no orphan).
// NEW and the bare word is used elsewhere: a new entry is made and the bare word leaves the theme.
// Run: node tools/gen/bare-apply.mjs [--dir bare] [--skip id,id] [--apply] [--report file]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url), arg = (k, d) => process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : d;
const DIR = arg('--dir', 'bare'), SKIP = new Set(arg('--skip', '').split(',').filter(Boolean).map(Number)), SKIPT = new Set(arg('--skip-themes', '').split(',').filter(Boolean)), REPORT = arg('--report', ''), APPLY = process.argv.includes('--apply');
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => P.ix.entry.get(+id);
const stat = { reused: 0, retexted: 0, created: 0, skipped: 0, bad: 0 }, problems = [], log = [], orphans = [];
const regroup = (t, from, to) => { if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === from ? to : id))]).filter(g => g.length > 1); };
const files = fs.readdirSync(here('./' + DIR + '/')).filter(f => /^v-\d+\.txt$/.test(f)).sort();
for (const f of files) for (const raw of fs.readFileSync(here('./' + DIR + '/' + f), 'utf8').split(/\r?\n/)) {
  const l = raw.trim(); if (!l || l.startsWith('#')) continue;
  const m = /^FULL\s+(\S+)\s+(\d+)\s+(.+?)\s+(NEW|\d+)\s*(?:\|(.*))?$/.exec(l);
  if (!m) { stat.bad++; problems.push(`${f}: cannot read "${l.slice(0, 80)}"`); continue; }
  const [, tid, bid, text0, which, rest] = m, t = P.ix.theme.get(tid), b = E(bid);
  if (SKIPT.has(tid)) { stat.skipped++; continue; }
  let text = text0;   // an agent may repeat the bare word before the full term (radiant radiant energy)
  if (b) { const bt = (b.show?.[tid] || b.text).toLowerCase(); if (text.toLowerCase().startsWith(bt + ' ' + bt)) text = text.slice(bt.length + 1); }
  if (SKIP.has(+bid)) { stat.skipped++; continue; }
  if (!t || !b || b.typ[tid] === undefined || b.aliasOf) { stat.bad++; problems.push(`${f}: missing theme, entry or link "${l.slice(0, 80)}"`); continue; }
  const bare = b.show?.[tid] || b.text, link = b.typ[tid];
  const p = (rest || '').split('|').map(x => x.trim()), [pos, type, rec, lk] = p;
  let F = which === 'NEW' ? P.entries.find(e => !e.aliasOf && e.text.toLowerCase() === text.toLowerCase()) : E(which);
  if (which === 'NEW' && P.entries.some(e => e.aliasOf && e.text.toLowerCase() === text.toLowerCase())) { stat.bad++; problems.push(`${f}: "${text}" is already an alias`); continue; }
  if (F && F.aliasOf) { stat.bad++; problems.push(`${f}: "${text}" is an alias`); continue; }
  const aliased = P.entries.some(a => a.aliasOf === b.id), others = Object.keys(b.typ).length > 1;
  if (!F && which === 'NEW' && !aliased && !others) {   // retext in place
    b.text = text; b.gloss = ''; b.pos = pos || b.pos; b.type = type || b.type; b.fam = +rec || b.fam; b.typ[tid] = +lk || link; b.show = { ...b.show, [tid]: bare }; b.nameOkIn = [...new Set([...(b.nameOkIn || []), tid])];
    stat.retexted++; log.push(`R ${t.name}: ${bare} -> ${text} (in place, rec ${b.fam}, link ${b.typ[tid]})`); continue;
  }
  if (!F) { F = addEntry(P, text, { pos: pos || b.pos, type: type || b.type, fam: +rec || b.fam, status: 'gen', region: [...b.region], adult: b.adult, sensitive: b.sensitive, tm: b.tm, vulgar: b.vulgar }); F.typ[tid] = +lk || link; stat.created++; log.push(`N ${t.name}: ${bare} -> ${text}`); }
  else { if (F.typ[tid] === undefined) F.typ[tid] = link; stat.reused++; log.push(`E ${t.name}: ${bare} -> ${text} (${F.id})`); }
  F.show = { ...F.show, [tid]: bare }; F.nameOkIn = [...new Set([...(F.nameOkIn || []), tid])];
  for (const a of P.entries) if (a.aliasOf === F.id) a.nameOkIn = [...new Set([...(a.nameOkIn || []), tid])];
  delete b.typ[tid]; if (b.show) { delete b.show[tid]; if (!Object.keys(b.show).length) delete b.show; } regroup(t, b.id, F.id);
  if (!Object.keys(b.typ).length && !aliased) orphans.push(`${b.id} ${b.text}`);
}
reindex(P);
console.log(stat); console.log(problems.join('\n')); console.log('bare words left with no theme:', orphans.length, orphans.join('; '));
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 8).map(i => i.msg).join('\n'));
if (REPORT) fs.writeFileSync(REPORT, ['# Bare members', '', JSON.stringify(stat), '', ...log.map(x => '- ' + x), '', '## Problems', ...problems.map(x => '- ' + x)].join('\n'));
if (APPLY) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
