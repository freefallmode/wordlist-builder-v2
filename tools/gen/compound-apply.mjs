// Applies tools/gen/compound/c-*.txt (BRIEF-compound.md): each compound-theme member moves from the bare word's entry to an entry for the full term, shown as the short word.
//   D <bare id> <theme>                       drop the link
//   U <bare id> <theme> <existing id> | <in> [| fix field=value ...]   use an existing full-term entry
//   N <bare id> <theme> | text | pos | type | rec | in | flags | region | gloss   create the full-term entry
// Run: node tools/gen/compound-apply.mjs [--apply] [--report file.md]   (without --apply nothing is saved)
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json'), APPLY = process.argv.includes('--apply');
const REPORT = process.argv.includes('--report') ? process.argv[process.argv.indexOf('--report') + 1] : '';
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => P.ix.entry.get(+id), T = id => P.ix.theme.get(id);
const stat = { D: 0, U: 0, N: 0, fix: 0, bad: 0, deleted: 0, reused: 0 }, problems = [], log = [], touched = new Set(), made = new Map();
const FIX = { pos: v => v, type: v => v, fam: v => +v, adult: v => v === 'true', sensitive: v => v === 'true', tm: v => v === 'true', vulgar: v => v === 'true', region: v => v === '-' || !v ? [] : v.split(',') };
const detach = (b, t) => {   // the bare word leaves the theme
  const shown = b.show?.[t.id] || b.text; delete b.typ[t.id]; if (b.show) { delete b.show[t.id]; if (!Object.keys(b.show).length) delete b.show; }
  b.nameOkIn = (b.nameOkIn || []).filter(k => k !== t.id); touched.add(b.id); return shown;
};
const regroup = (t, from, to) => { if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(x => x === from ? to : x))]).filter(g => g.length > 1); };
const PFX = process.argv.includes('--prefix') ? process.argv[process.argv.indexOf('--prefix') + 1] : 'c';   // c: compound themes (applied, v275); m: bare modifiers in kinds-of-X themes (BRIEF-modifier.md)
const files = fs.readdirSync(here('./compound/')).filter(f => new RegExp('^' + PFX + '-\\d+\\.txt$').test(f)).sort();
for (const f of files) for (const l0 of fs.readFileSync(here('./compound/' + f), 'utf8').split(/\r?\n/)) {
  const l = l0.trim(); if (!l || l.startsWith('#')) continue;
  if (/^K\s/.test(l)) { stat.K = (stat.K || 0) + 1; continue; }   // keep: the bare word is the thing itself
  const head = /^([DUN])\s+(\d+)\s+(\S+)\s*(.*)$/.exec(l); if (!head) { stat.bad++; problems.push(`${f}: cannot read "${l.slice(0, 80)}"`); continue; }
  const [, verb, bid, tid, rest] = head, b = E(bid), t = T(tid);
  if (!b || !t || b.typ[tid] === undefined) { stat.bad++; problems.push(`${f}: link not there "${l.slice(0, 80)}"`); continue; }
  const inRec = b.typ[tid];
  if (verb === 'D') { detach(b, t); regroup(t, b.id, 0); if (t.groups) t.groups = t.groups.map(g => g.filter(x => x)).filter(g => g.length > 1); stat.D++; log.push(`D ${t.name}: ${b.text}`); continue; }
  let F, shown;
  if (verb === 'U') {
    const parts = rest.replace(/^\|\s*/, '').split('|').map(x => x.trim()); F = E(parts[0].split(/\s+/)[0]);
    if (!F || F.aliasOf) { stat.bad++; problems.push(`${f}: no existing entry in "${l.slice(0, 80)}"`); continue; }
    const rate = +parts[1]; shown = detach(b, t); F.typ[tid] = rate >= 1 && rate <= 5 ? rate : inRec;
    for (const x of parts.slice(2)) { const m = /^fix\s+(\w+)=(.*)$/.exec(x); if (m && FIX[m[1]]) { F[m[1]] = FIX[m[1]](m[2].trim()); stat.fix++; log.push(`fix ${F.text}: ${m[1]}=${m[2]}`); } }
    stat.U++; log.push(`U ${t.name}: ${shown} -> ${F.text} (${F.id}) link ${F.typ[tid]}`);
  } else {
    const p = rest.replace(/^\|\s*/, '').split('|').map(x => x.trim()); if (p.length < 8) { stat.bad++; problems.push(`${f}: too few fields "${l.slice(0, 80)}"`); continue; }
    const [text, pos, type, rec, inr, flags, region, gloss] = p, key = text.toLowerCase() + '|' + (gloss === '-' ? '' : gloss);
    const viaAlias = P.entries.find(e => e.aliasOf && e.text.toLowerCase() === text.toLowerCase() && E(e.aliasOf) && !E(e.aliasOf).aliasOf);   // the term is already an alias (greenfly, public house): link its root and show the short word, as the alias-links cleanup did
    shown = detach(b, t); F = viaAlias ? (['spelling', 'form'].includes(viaAlias.aliasKind) ? E(viaAlias.aliasOf) : viaAlias) : made.get(key) || P.entries.find(e => !e.aliasOf && e.text.toLowerCase() === text.toLowerCase() && (e.gloss || '') === (gloss === '-' ? '' : gloss));
    if (viaAlias) { stat.viaAlias = (stat.viaAlias || 0) + 1; F.typ[tid] = F.typ[tid] || +inr || inRec; log.push('A ' + t.name + ': ' + shown + ' -> ' + text + ' (' + (F === viaAlias ? 'alias entry linked itself, root ' + E(F.aliasOf).text : 'root ' + F.text + ' linked') + ')'); } else if (F) stat.reused++; else {
      F = addEntry(P, text, { pos, type, fam: +rec, gloss: gloss === '-' ? '' : gloss, status: 'gen', region: region === '-' ? [] : region.split(','),
        adult: /adult/.test(flags), sensitive: /sensitive/.test(flags), tm: /\btm\b/.test(flags), vulgar: /vulgar/.test(flags) });
      made.set(key, F); stat.N++;
    }
    F.typ[tid] = +inr || inRec; if (!viaAlias) log.push(`N ${t.name}: ${shown} -> ${text} (${pos}, ${type}, rec ${rec}, link ${inr}${flags !== '-' ? ', ' + flags : ''}${region !== '-' ? ', ' + region : ''})`);
  }
  if (F) { F.show = { ...F.show, [tid]: shown }; if (shown.toLowerCase() !== F.text.toLowerCase()) F.nameOkIn = [...new Set([...(F.nameOkIn || []), tid])]; regroup(t, b.id, F.id); touched.add(F.id); for (const al of P.entries) if (al.aliasOf === F.id) al.nameOkIn = [...new Set([...(al.nameOkIn || []), tid])]; }
}
reindex(P);
// hand fixes found in the dry run: the agent split off entries that already exist under another label, or the same text needs labels to tell the entries apart
const mv = (fromId, toId, tid) => { const f = E(fromId), g = E(toId); if (!f || !g || f.typ[tid] === undefined) return; g.typ[tid] = f.typ[tid]; g.show = { ...g.show, [tid]: f.show?.[tid] || f.text }; g.nameOkIn = [...new Set([...(g.nameOkIn || []), tid])]; for (const al of P.entries) if (al.aliasOf === g.id) al.nameOkIn = [...new Set([...(al.nameOkIn || []), tid])]; delete f.typ[tid]; P.entries.splice(P.entries.indexOf(f), 1); stat.fixups = (stat.fixups || 0) + 1; };
const gl = (id, g) => { if (E(id) && !E(id).gloss) E(id).gloss = g; };
const idOf = (text, g) => (P.entries.find(e => e.text === text && (e.gloss || '') === g) || {}).id;
mv(idOf('ice age', 'glacial period'), 1613, 'ice_blank'); mv(idOf('deadwood', ''), 50195, 'blank_wood'); if (E(50195)) E(50195).type = 'common';
for (const [text, tid] of [['notice board', 'blank_board'], ['exercise book', 'blank_book']]) { const a = P.entries.find(e => e.aliasOf && e.text === text && e.typ[tid] !== undefined); if (a) { delete a.typ[tid]; if (a.show) delete a.show[tid]; stat.fixups = (stat.fixups || 0) + 1; } }   // the root is already in the theme: one word per alias family
gl(6881, 'person'); gl(48659, 'viewpoint'); gl(62004, 'pirate summons'); gl(idOf('snowshoe', ''), 'footwear');
for (const e of P.entries) for (const k of ['show', 'use']) if (e[k]) for (const t of Object.keys(e[k])) if (e.typ[t] === undefined && !e.aliasOf) delete e[k][t];   // a display form for a theme the entry is no longer in
reindex(P);
// a bare word with no theme left (and no aliases with links) is deleted
const gone = P.entries.filter(e => touched.has(e.id) && !e.aliasOf && !Object.keys(e.typ).length && !P.entries.some(a => a.aliasOf === e.id));
for (const e of gone) { P.entries.splice(P.entries.indexOf(e), 1); stat.deleted++; for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.filter(x => x !== e.id)).filter(g => g.length > 1); }
for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.filter(id => E(id) && (E(id).typ[t.id] !== undefined || P.entries.some(x => x.id === id && false)))).filter(g => g.length > 1);
reindex(P);
if (process.env.DBG) for (const id of [11895, 62692, 49021]) console.log(JSON.stringify(E(id)));
console.log(files.length + ' files', stat); console.log(problems.slice(0, 20).join('\n'));
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg) && !/rating-vs-zipf/.test(i.kind || i.msg)); if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify(bad.map(i => i.msg)));
console.log(bad.length, bad.slice(0, 15).map(i => i.msg).join('\n'));
if (REPORT) fs.writeFileSync(REPORT, ['# Compound migration', '', JSON.stringify(stat), '', ...log.map(x => '- ' + x), '', '## Problems', ...problems.map(x => '- ' + x)].join('\n'));
if (APPLY) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
if (process.env.DBG) for (const i of validate(P).filter(i => /theme-name/.test(i.kind))) { const e = E(i.entryId); console.log(i.entryId, JSON.stringify({ t: e.text, aliasOf: e.aliasOf, typ: e.typ, ok: e.nameOkIn, show: e.show })); }
if (process.env.SHOW) for (const id of process.env.SHOW.split(',')) { const e = E(+id); console.log(id, JSON.stringify({ t: e.text, g: e.gloss, pos: e.pos, type: e.type, aliasOf: e.aliasOf, k: e.aliasKind, typ: Object.keys(e.typ).slice(0, 4), show: e.show })); }
if (process.env.TXT) for (const tx of process.env.TXT.split(',')) for (const e of P.entries.filter(x => x.text.toLowerCase() === tx.toLowerCase())) console.log(e.id, JSON.stringify({ t: e.text, g: e.gloss, pos: e.pos, type: e.type, aliasOf: e.aliasOf, typ: Object.keys(e.typ).slice(0, 4), show: e.show, ok: e.nameOkIn }));
