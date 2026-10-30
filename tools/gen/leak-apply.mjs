// Applies theme-name review results to the library.
// Run: node tools/gen/leak-apply.mjs <result file>...   [--lib file]
// A result file is plain text. `T <themeId>` starts a theme; `T <themeId> OK` marks the theme nameOk (wordplay where sharing the word is the point) and needs no further lines.
// Then one line per leaking entry of that theme:
//   S <id> = <existingEntryId>                     replace it in this theme by an existing root entry (linked here with the same popularity)
//   S <id> | <new text> | <meaning label or -> | <rec 1-5>   replace it by the entry with that text (found, or created with the old one's part of speech, type and flags)
//   K <id>                                         keep it: the full text is the real name (nameOkIn), no warning for this theme
//   D <id>                                         drop it from this theme
// The old entry loses its link to this theme; with no theme links left it is deleted (its aliases move to the new entry on S, are deleted on D). A leaking alias is always deleted.
// Themes done are recorded in tools/gen/leak/done.json.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, linkIds, addEntry, deleteEntry, sameText } from '../../js/model.js';
import { nameLeak, themeNameWords } from '../../js/validate.js';
const args = process.argv.slice(2), ki = args.indexOf('--keep-drops'), mi = args.indexOf('--merges'), MERGES = mi >= 0, KEEP = ki >= 0 || MERGES;   // --merges: like --keep-drops, but applies only the replacements that merge into an entry already in the theme   // --keep-drops: apply only the replacements; D lines, leaking aliases and replacements that merge into an entry already in the theme are left as they are
if (ki >= 0) args.splice(ki, 1);
const ei = args.indexOf('--kept'), KEPT = ei >= 0; if (KEPT) args.splice(ei, 1);   // --kept: second look at the entries kept by name (leak-make.mjs --kept); a K line is a decision to keep, D lines are refused
if (mi >= 0) args.splice(args.indexOf('--merges'), 1);
const li = args.indexOf('--lib');
const LIB = li >= 0 ? args.splice(li, 2)[1] : new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const doneFile = li >= 0 ? LIB + (KEPT ? '.kept-done.json' : '.done.json') : new URL('./leak/' + (KEPT ? 'kept-done.json' : 'done.json'), import.meta.url);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const problems = [], stat = { themes: 0, S: 0, D: 0, made: 0, deleted: 0, aliased: 0, ok: 0, open: 0, kept: 0, K: 0 };

for (const f of args) {
  let tid = null, need = new Set(), handled = new Set(), last = null;
  const close = () => {
    if (!tid) return;
    const left = [...need].filter(id => !handled.has(id));
    if (KEEP) { stat.kept += left.length; stat.themes++; return; }
    if (left.length) { stat.open += left.length; problems.push(`${f}: ${tid} has ${left.length} leaking entries without an action (${left.slice(0, 4).map(id => P.ix.entry.get(id)?.text).join(', ')}...)`); } else done.add(tid);
    stat.themes++;
  };
  const drop = (e, tid, target) => {   // take e out of theme tid; delete it when it has no links left
    if (e.aliasOf) { deleteEntry(P, e); stat.deleted++; return; }
    delete e.th[tid]; if (e.nameOkIn) e.nameOkIn = e.nameOkIn.filter(x => x !== tid);
    for (const a of P.entries) if (a.aliasOf === e.id) delete a.th[tid];
    if (Object.keys(e.th).length === 0) {
      for (const a of P.entries.filter(x => x.aliasOf === e.id)) { if (target && target !== a) a.aliasOf = target.id; else deleteEntry(P, a); }
      if (KEPT && target) {   // --kept: the full name stays as an alias of the bare word (form when it only adds words to it, else synonym), exempt from the theme-name check here
        const tk = new Set(target.text.toLowerCase().split(/\W+/).filter(Boolean)), ek = new Set(e.text.toLowerCase().split(/\W+/).filter(Boolean));
        e.aliasOf = target.id; e.aliasKind = [...tk].every(w => ek.has(w)) ? 'form' : 'synonym'; e.nameOkIn = [...(e.nameOkIn || []), tid]; stat.aliased++;
      } else { deleteEntry(P, e); stat.deleted++; }
    }
    reindex(P);
  };
  for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const s = line.trim(); if (!s) continue;
    let m;
    if ((m = /^T (\S+)( OK)?$/.exec(s))) {
      close(); tid = m[1]; handled = new Set(); need = new Set(); last = null;
      const t = P.ix.theme.get(tid); if (!t || t.group) { problems.push(`${f}: no playable theme ${tid}`); tid = null; continue; }
      if (m[2]) { t.nameOk = true; stat.ok++; done.add(tid); tid = null; continue; }
      const ws = themeNameWords(t); need = new Set((P.ix.byTheme.get(tid) || []).filter(e => KEPT ? !e.aliasOf && (e.nameOkIn || []).includes(tid) && nameLeak(t, { text: e.text }, ws) : nameLeak(t, e, ws)).map(e => e.id));
    } else if (tid && (m = /^K (\d+)(?: # .*)?$/.exec(s))) {   // keep: the full text is the real name; exempt this entry in this theme
      const e = P.ix.entry.get(+m[1]);
      if (!e || !linkIds(P, e).includes(tid)) { problems.push(`${f}: entry ${m[1]} is not in ${tid}`); continue; }
      if (!(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
      handled.add(e.id); stat.K++;
    } else if (tid && (m = /^D (\d+)$/.exec(s))) {
      const e = P.ix.entry.get(+m[1]);
      if (!e || !linkIds(P, e).includes(tid)) { if (!handled.has(+m[1])) problems.push(`${f}: entry ${m[1]} is not in ${tid}`); continue; }
      if (KEEP || KEPT) { if (KEPT) problems.push(f + ': D is not allowed in a --kept review (' + m[1] + ')'); continue; }
      handled.add(e.id); drop(e, tid, null); stat.D++;
    } else if (tid && (m = /^S (\d+) (?:= (\d+)|\| ([^|]+) \| ([^|]*) \| ([1-5]))$/.exec(s))) {
      const e = P.ix.entry.get(+m[1]), t = P.ix.theme.get(tid);
      if (!e || !linkIds(P, e).includes(tid)) { if (!handled.has(+m[1])) problems.push(`${f}: entry ${m[1]} is not in ${tid}`); continue; }
      if (e.aliasOf) { if (KEEP) continue; handled.add(e.id); drop(e, tid, null); stat.D++; continue; }   // an alias is just dropped
      let target;
      if (m[2]) { target = P.ix.entry.get(+m[2]); if (!target || target.aliasOf) { problems.push(`${f}: ${m[2]} is not a root entry`); continue; } }
      else {
        const text = m[3].trim(), gloss = m[4].trim() === '-' ? '' : m[4].trim();
        if (nameLeak(t, { text })) { problems.push(`${f}: "${text}" still contains a word of the theme name`); continue; }
        const same = sameText(P, text);
        target = same.find(x => !x.aliasOf && (x.gloss || '') === gloss);
        if (!target) {
          if (MERGES) continue;   // a merge never makes a new entry: it would be left with no theme
          if (same.length && !gloss) { problems.push(`${f}: "${text}" exists; give the new entry a meaning label or use S ${e.id} = <id>`); continue; }
          target = addEntry(P, text, { gloss, pos: e.pos, type: e.type, rec: +m[5], adult: e.adult, vulgar: e.vulgar, sensitive: e.sensitive, tm: e.tm, region: [...e.region], status: 'gen' });
          reindex(P); stat.made++;
        }
      }
      if (KEEP && target !== e && (target.th[tid] !== undefined) !== MERGES) continue;
      if (target === e) { problems.push(`${f}: ${e.id} cannot replace itself`); continue; }
      if (target.th[tid] === undefined) target.th[tid] = e.th[tid] || 3;
      handled.add(e.id); drop(e, tid, target); stat.S++; last = target;
    } else if (tid && last && (m = /^A \| ([^|]+) \| ([^|]*) \| ([1-5])$/.exec(s))) {   // another name for the entry the line above made or found: a synonym of it
      const text = m[1].trim(), gloss = m[2].trim() === '-' ? '' : m[2].trim();
      if (nameLeak(P.ix.theme.get(tid), { text })) { problems.push(`${f}: "${text}" still contains a word of the theme name`); continue; }
      if (sameText(P, text).some(x => (x.gloss || '') === gloss && (x.aliasOf === last.id || x === last))) continue;
      if (sameText(P, text).length && !gloss) { problems.push(`${f}: "${text}" exists; give the synonym a meaning label`); continue; }
      const a = addEntry(P, text, { gloss, pos: last.pos, type: last.type, rec: +m[3], adult: last.adult, vulgar: last.vulgar, sensitive: last.sensitive, tm: last.tm, region: [...last.region], status: 'gen' });
      a.aliasOf = last.id; a.aliasKind = 'synonym'; reindex(P); stat.made++;
    } else problems.push(`${f}: cannot read "${s.slice(0, 60)}"`);
  }
  close();
}
for (const p of problems.slice(0, 40)) console.log('PROBLEM', p);
if (problems.length > 40) console.log('... and', problems.length - 40, 'more problems');
reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
if (!KEEP) fs.writeFileSync(doneFile, JSON.stringify([...done].sort()));
console.log(`${stat.themes} themes (${stat.ok} marked nameOk), ${stat.S} replaced, ${stat.D} dropped, ${stat.made} entries made, ${stat.deleted} deleted, ${stat.aliased} kept as aliases, ${stat.open} still open, ${stat.kept} left as they were, ${stat.K} kept by name -> library v${P.lib.version}; ${done.size} themes done`);
