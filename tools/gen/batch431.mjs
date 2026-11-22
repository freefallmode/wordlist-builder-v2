// Library batch v431: offensive words, part 1 (Simon, 2026-11-22; DESIGN-entries.md 3.8, LIBRARY-RULES 5 "Offensive words"). For Simon's review.
// The 15 entries flagged vulgar at v429 (offensive since the rename) settled as decided, and butt and spotted dick deleted:
//   1. bitch [female dog] 10316 keeps the flag (its harmless meaning; the rude one comes to mind first). Status rev: the field is now written as offensive.
//   2. gitch 27542 is not offensive (ordinary Canadian slang for underwear): flag off.
//   3. Deleted, their meaning crude, vulgar or a slur: ass [buttocks], lap dance, twerk, gyatt, bollocks, bugger, tosser, schmuck, putz, tuchus,
//      Brainfuck, WTF, fart (Simon), spotted dick (Simon); also twerking 11883, the same word family as twerk (added by this batch: Simon to confirm).
//      Each leaves its themes and synonym groups first; kin to them goes with them.
//   4. butt 178 leaves the library (Simon): the entry becomes bottom [body part], keeping its id, links and group place with buttocks, and its
//      UK regional alias bottom 66208 is deleted (bottom takes its familiarity; no region, as it is said in the US too); the shown text
//      "bottom" in hidden names, now its own text, is dropped. Keeping the id keeps the export rows in place.
// Apply after batch 430 (pending): this one is numbered 431. Every entry it changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch431.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteEntry, placeTheme, setKin } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
{ const b = new URL('../../data/breaks-en.txt', import.meta.url); if (fs.existsSync(b)) setBreaks(parseBreaks(fs.readFileSync(b, 'utf8'))); }
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const T = tid => { const t = ix.theme.get(tid); if (!t) throw Error('no theme ' + tid); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
// Difficulty spread and theme-difficulty gap of a theme (LIBRARY-RULES 3.7 and 6): usable roots, band = the game's word band.
const THEMES = ['body_parts', 'torso', 'hidden_names', 'female_animals', 'dance', 'dance_moves', 'street_dance_styles', 'body_noises', 'things_that_smell_bad', 'gen_z_slang', 'british_slang', 'words_meaning_nonsense', 'canadian_slang', 'words_from_yiddish', 'programming_languages', 'internet_words', 'british_food', 'puddings', 'sweet_treats'];
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return 'no theme';
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.offensive);
  const b = ws.map(e => difficultyBand(P, e, tid)).sort((x, y) => x - y), td = themeDifficulty(t);
  return `${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, theme difficulty ${td}, 4th-easiest band ${b[3]}, gap ${b[3] - td}`;
};
const prof0 = Object.fromEntries(THEMES.map(t => [t, profile(t)]));
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], alone = new Set(), deleted = [];
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const chk2 = (id, a, b) => { const e = E(id); if (e.text !== a && e.text !== b) throw Error(`${id} is "${e.text}", not "${a}" or "${b}"`); return e; };
const where = e => { const r = linkIds(P, e).filter(t => ix.theme.has(t)); return r.length ? `stays in ${r.join(', ')}` : 'now in no theme: not exported'; };
const unlinkE = (e, tid, why) => {
  T(tid);
  if (e.typ[tid] === undefined) return;
  unlinkEntry(P, e, tid); n++; reindex(P);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`out of ${tid}: ${lab(e)}: ${why} (${where(e)})`);
};
const out = (tid, list, why) => { for (const [id, text] of list) unlinkE(chk(id, text), tid, why); };
const linkE = (e, tid, typ, why, extra = {}) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return;
  e.typ[tid] = typ; n++;
  if (extra.show) e.show = { ...(e.show || {}), [tid]: extra.show };
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}): ${why}`);
};
const link = (id, text, tid, typ, why, extra) => linkE(chk(id, text), tid, typ, why, extra);
const rate = (id, text, tid, typ, why) => {
  const e = chk(id, text); if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++;
};
const setE = (id, text, field, value, why) => {
  const e = chk(id, text); if (JSON.stringify(e[field]) === JSON.stringify(value)) return;
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++;
};
const retext = (id, from, to, why) => {
  const e = chk2(id, from, to); if (e.text === to) return e;
  A.push(`text: ${from} ${id} -> "${to}": ${why}`); e.text = to; n++; reindex(P); return e;
};
const setShow = (e, tid, text, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.show?.[tid] === text) return;
  e.show = { ...(e.show || {}), [tid]: text }; n++;
  A.push(`${lab(e)} shown "${text}" in ${tid}: ${why}`);
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return;
  A.push(`theme ${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++;
};
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases: delete them first`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  if (P.themes.some(t => (t.groups || []).some(g => g.includes(id)))) throw Error(`${lab(e)} is in a group`);
  const kin = (e.kin || []).length || P.entries.some(x => (x.kin || []).includes(id));
  deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e));
  A.push(`deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}${kin ? ' (its kin entries lose it)' : ''}`);
};


// ---------- 1. bitch [female dog]: kept, flagged offensive ----------
A.push('1. bitch [female dog] keeps its flag (now called offensive)');
{ const e = chk(10316, 'bitch');
  if (!e.offensive) { e.offensive = true; n++; A.push(`${lab(e)}: offensive on`); }
  if (e.status !== 'rev') { e.status = 'rev'; n++; A.push(`${lab(e)}: status rev (the vulgar field is now written as offensive)`); } }

// ---------- 2. gitch: kept, not offensive ----------
A.push('2. gitch: ordinary Canadian slang for underwear, not offensive');
setE(27542, 'gitch', 'offensive', false, 'not crude: Canadian slang for underwear (Simon left it to the batch)');

// ---------- 3. crude, vulgar or slur meanings deleted ----------
A.push('3. Entries whose meaning is crude, vulgar or a slur: out of their themes and groups, then deleted');
const DEL = [
  [179, 'ass', 'buttocks: a crude word for a body part (buttocks and bottom stay in body parts and torso)'],
  [6277, 'lap dance', 'sexual'], [6279, 'twerk', 'a sexual dance move'], [11883, 'twerking', 'the same word as twerk (added by the batch: one word family)'],
  [16985, 'fart', 'crude (Simon)'], [27256, 'gyatt', 'sexual slang'],
  [27352, 'bollocks', 'a swear word'], [27353, 'bugger', 'a swear word'], [27354, 'tosser', 'a vulgar insult'],
  [29407, 'schmuck', 'Yiddish for penis, a vulgar insult'], [29408, 'putz', 'Yiddish for penis, a vulgar insult'], [29414, 'tuchus', 'Yiddish for backside, crude'],
  [42288, 'Brainfuck', 'the name is a swear word'], [42437, 'WTF', 'stands for a swear phrase'],
  [53304, 'spotted dick', 'the name invites the crude reading (Simon)'],
];
for (const [id, text, why] of DEL) {
  const e = ix.entry.get(id); if (!e) continue; chk(id, text);
  for (const t of P.themes) if ((t.groups || []).some(g => g.includes(id))) {
    t.groups = t.groups.map(g => g.filter(x => x !== id)).filter(g => g.length > 1); n++;
    A.push(`theme ${t.id}: ${lab(e)} leaves its synonym group`);
  }
  for (const tid of Object.keys(e.typ)) unlinkE(e, tid, why);
  delE(id, text, why);
}

// ---------- 4. butt -> bottom (the entry keeps its id and row; the word butt leaves the library) ----------
A.push('4. butt (Simon: out) -> bottom [body part]: the entry keeps its id, links and group places; its alias bottom 66208 is deleted');
{ const al = ix.entry.get(66208);
  if (al) {
    chk(66208, 'bottom'); if (al.aliasOf !== 178) throw Error('bottom 66208 is not an alias of 178');
    const fam = al.fam;
    deleteEntry(P, al); reindex(P); n++; deleted.push(lab(al));
    A.push(`deleted entry: ${lab(al)} [body part] (regional alias of butt): its root takes its text`);
    setE(178, 'butt', 'fam', fam, 'the familiarity of bottom, which it becomes');
  }
  const e = retext(178, 'butt', 'bottom', 'butt is offensive (Simon: out); bottom is the everyday word for the same body part, said in the UK and the US');
  setE(178, 'bottom', 'gloss', 'body part', 'Bottom [weaver] shares the text');
  setE(178, 'bottom', 'region', [], 'said in the UK and the US');
  if (e.show?.hidden_names === 'bottom') { const s = { ...e.show }; delete s.hidden_names; e.show = s; n++; A.push(`${lab(e)}: shown "bottom" in hidden_names dropped (now its own text)`); }
  A.push(`  bottom 178 in: ${Object.entries(e.typ).map(([t, v]) => t + ' ' + v).join(', ')}`); }

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const themeless = [...alone].filter(id => ix.entry.get(id) && !linkIds(P, E(id)).length).map(id => lab(E(id)));

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (the library or export code changed since it was written: compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
const tLast = (() => { for (let i = x1.themes.length - 1; i >= 0; i--) if (x0.themes[i] !== x1.themes[i]) return i; return -1; })();
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to index ${tLast} ("${x1.themes[tLast]}", was "${x0.themes[tLast]}")`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${name(id)} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const toAlias = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(name);
cmp.push(`root -> alias rows ${toAlias.length}: ${toAlias.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${name(x1.ids[firstLinkShift])}) on, link positions move`}`);
const textChanged = x1.ids.filter((id, i) => ia.has(id) && x0.text[ia.get(id)] !== x1.text[i]).map(id => `${name(id)} (was "${x0.text[ia.get(id)]}")`);
cmp.push(`Rows whose text changed: ${textChanged.join(', ') || 'none'}`);
{ const F = x1.themeFields, pi = F.indexOf('parent'), row = (x, r) => F.map((f, k) => k === pi ? (r[k] === null || r[k] === undefined || r[k] < 0 ? r[k] : x.themes[r[k]]) : r[k]);   // parent as id: index moves alone are not field changes
  const thCh = x1.themeRows.map((r, i) => [r, i]).filter(([r]) => { const j = x0.themes.indexOf(r[0]); return j >= 0 && JSON.stringify(row(x0, x0.themeRows[j])) !== JSON.stringify(row(x1, r)); })
    .map(([r, i]) => { const j = x0.themes.indexOf(r[0]), a = row(x0, x0.themeRows[j]), b = row(x1, r); return `${r[0]} (index ${j} -> ${i}: ${F.filter((f, k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map(f => { const k = F.indexOf(f); return `${f} ${JSON.stringify(a[k])} -> ${JSON.stringify(b[k])}`; }).join(', ')})`; });
  cmp.push(`Theme rows whose fields changed (parent compared by id): ${thCh.join('; ') || 'none'}`); }
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Offensive words, part 1: the 15 entries flagged vulgar at v429 settled (bitch [female dog] keeps the flag, now offensive; gitch unflagged; ass [buttocks], lap dance, twerk, twerking, gyatt, bollocks, bugger, tosser, schmuck, putz, tuchus, Brainfuck, WTF and fart deleted); butt -> bottom [body part] (same entry), its alias bottom deleted; spotted dick deleted.',
  ...A.map(x => /^\d+\./.test(x) || x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:',
  ...THEMES.map(t => `  ${t}: ${prof0[t]} -> ${profile(t)}`),
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch431-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
