// Applies part-of-speech review results (see BRIEF-pos.md) to the library.
// Run: node tools/gen/pos-apply.mjs <result file>...   [--lib file]
// A result file is plain text: `T <themeId>`, then one line for every entry pos-make.mjs listed under the theme:
//   P <id> <noun|verb|adjective|adverb|other>       the part of speech was tagged wrongly: retag it (nothing else changes)
//   F <id> = <rootId>                               the same word as <rootId> (already in this theme): becomes its `form` alias (rainy -> rain)
//   S <id> = <existingId>                           replace by an existing root entry of the theme's form (linked here with the same popularity)
//   S <id> | <text> | <meaning label or -> | <rec 1-5> | <pos>      replace by the entry with that text (found, or created)
//   K <id>                                          keep it as it is
// F and S take the entry out of this theme; with no theme links left it becomes the form alias (F) or is deleted (S). Complete themes may not lose members.
// Themes done are recorded in tools/gen/pos/done.json.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, linkIds, addEntry, deleteEntry, sameText, POS } from '../../js/model.js';
import { flagged } from './pos-lib.mjs';
const args = process.argv.slice(2), li = args.indexOf('--lib');
const LIB = li >= 0 ? args.splice(li, 2)[1] : new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const doneFile = li >= 0 ? LIB + '.pos-done.json' : new URL('./pos/done.json', import.meta.url);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const problems = [], stat = { themes: 0, P: 0, F: 0, S: 0, K: 0, made: 0, deleted: 0, open: 0 };
const flaggedNow = new Map(flagged(P).map(x => [x.t.id, new Set(x.minor.map(e => e.id))]));

for (const f of args) {
  let tid = null, need = new Set(), handled = new Set();
  const close = () => {
    if (!tid) return;
    const left = [...need].filter(id => !handled.has(id));
    if (left.length) { stat.open += left.length; problems.push(`${f}: ${tid} has ${left.length} listed entries without a line (${left.slice(0, 4).map(id => P.ix.entry.get(id)?.text).join(', ')}...)`); } else done.add(tid);
    stat.themes++;
  };
  const rootsIn = id => (P.ix.byTheme.get(id) || []).filter(e => !e.aliasOf).length;
  // take e out of theme tid; `into` is the entry that stands in for it (F: becomes its alias when e has no other links)
  const leave = (e, t, into, asForm) => {
    delete e.th[t.id];
    if (Object.keys(e.th).length === 0) {
      for (const a of P.entries.filter(x => x.aliasOf === e.id)) { if (a !== into) a.aliasOf = into.id; }
      if (asForm) { e.aliasOf = into.id; e.aliasKind = 'form'; } else { deleteEntry(P, e); stat.deleted++; }
    }
    reindex(P);
  };
  for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const s = line.trim(); if (!s) continue;
    let m;
    if ((m = /^T (\S+)$/.exec(s))) {
      close(); tid = m[1]; handled = new Set(); need = new Set();
      const t = P.ix.theme.get(tid); if (!t || t.group) { problems.push(`${f}: no playable theme ${tid}`); tid = null; continue; }
      need = flaggedNow.get(tid) || new Set();
      continue;
    }
    if (!tid) { problems.push(`${f}: line before any T: "${s.slice(0, 40)}"`); continue; }
    const t = P.ix.theme.get(tid);
    if ((m = /^([PFSK]) (\d+)(.*)$/.exec(s))) {
      const op = m[1], e = P.ix.entry.get(+m[2]), rest = m[3].trim();
      if (!e || e.aliasOf || e.th[tid] === undefined) { if (!handled.has(+m[2])) problems.push(`${f}: entry ${m[2]} is not a root in ${tid}`); continue; }
      if (op === 'K') { handled.add(e.id); stat.K++; continue; }
      if (op === 'P') { const pos = rest; if (!POS.includes(pos)) { problems.push(`${f}: bad part of speech "${pos}"`); continue; } e.pos = pos; handled.add(e.id); stat.P++; continue; }
      let target, mm;
      if ((mm = /^= (\d+)$/.exec(rest))) {
        target = P.ix.entry.get(+mm[1]);
        if (!target || target.aliasOf || target === e) { problems.push(`${f}: ${mm[1]} is not a usable root entry`); continue; }
        if (op === 'F' && target.th[tid] === undefined) { problems.push(`${f}: F ${e.id} = ${target.id}: the root is not in this theme (use S)`); continue; }
      } else if (op === 'S' && (mm = /^\| ([^|]+) \| ([^|]*) \| ([1-5]) \| (\w+)$/.exec(rest))) {
        const text = mm[1].trim(), gloss = mm[2].trim() === '-' ? '' : mm[2].trim(), pos = mm[4];
        if (!POS.includes(pos)) { problems.push(`${f}: bad part of speech "${pos}"`); continue; }
        const same = sameText(P, text);
        target = same.find(x => !x.aliasOf && (x.gloss || '') === gloss);
        if (!target) {
          if (same.length && !gloss) { problems.push(`${f}: "${text}" exists; give the new entry a meaning label or use S ${e.id} = <id>`); continue; }
          target = addEntry(P, text, { gloss, pos, type: e.type, rec: +mm[3], adult: e.adult, vulgar: e.vulgar, sensitive: e.sensitive, tm: e.tm, region: [...e.region], status: 'gen' });
          reindex(P); stat.made++;
        }
      } else { problems.push(`${f}: cannot read "${s.slice(0, 60)}"`); continue; }
      if (t.complete && target.th[tid] !== undefined) { problems.push(`${f}: ${tid} is complete and would lose "${e.text}" (merge into "${target.text}")`); continue; }
      if (target.th[tid] === undefined) target.th[tid] = e.th[tid] || 3;
      handled.add(e.id); leave(e, t, target, op === 'F'); stat[op]++;
    } else problems.push(`${f}: cannot read "${s.slice(0, 60)}"`);
  }
  close();
}
for (const p of problems.slice(0, 40)) console.log('PROBLEM', p);
if (problems.length > 40) console.log('... and', problems.length - 40, 'more problems');
reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
fs.writeFileSync(doneFile, JSON.stringify([...done].sort()));
console.log(`${stat.themes} themes: ${stat.P} retagged, ${stat.F} made form aliases, ${stat.S} replaced (${stat.made} entries made, ${stat.deleted} deleted), ${stat.K} kept, ${stat.open} still open -> library v${P.lib.version}; ${done.size} themes done`);
