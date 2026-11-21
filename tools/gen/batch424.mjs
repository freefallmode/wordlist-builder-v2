// Library batch v424: sleep (Body & Health > sleep), proposed on branch julia-category-fixes-2 for Simon's review.
// Each change, by kind:
//   1. sleep words merges into sleep (LIBRARY-RULES: a theme and its "X words" twin merge). About 25 of its 36 words are already in sleep, and the
//      theme-twin check flags short sleeps as sharing 9 of its 10 words with it. The words sleep lacks move there at the same typicality, with
//      their groups (sleep in = lie-in, dead to the world = out like a light). hibernate and somnambulist do not move: sleep already has
//      hibernation and somnambulism, their kin. sleepover and dormant stay in their party and volcano themes. Then sleep words is deleted.
//   2. sleep: new words body clock (same answer as circadian rhythm) and all-nighter. (light sleep is not added: sleep has light sleeper,
//      and its shown text "light" would overlap that and out like a light.)
//   3. bedding: sheet was two entries for one sense: sheet [bed] 3673 takes the place of sheet [bedding] 16030 (link and group), which is deleted.
//      headboard is part of the bed frame (stays in bedroom); thread count is a measure; percale and sateen are fabrics; memory foam is a material.
//   4. nightwear: romper is daywear, a playsuit (stays in clothes).
//   5. dream words: rem sleep (lowercase) duplicated REM: REM is linked in its place and rem sleep is deleted (as an alias, "REM sleep"
//      would give away the theme sleep, where REM is). sleepwalking and somnambulism are sleep disorders (they stay there); vivid, nocturnal and déjà vu are general words;
//      sleep talking moves to sleep disorders.
//   6. sleep disorders: sleep talking joins, same answer as somniloquy. CPAP is a breathing machine that treats apnea, not a disorder;
//      "exploding head" is "exploding head syndrome" cut short. The UK alias of apnea is "apnoea", not "sleep apnoea" (the root is "apnea").
//   7. bedtime routine: say prayers is flagged sensitive (religion), like christening.
//   8. New theme feeling tired under sleep: words for being tired. Six easy, seven middle and five hard words. sleepy = drowsy and
//      lethargic = listless are grouped as they are in sleep and moods. dog-tired is left out (it contains the theme's name word), and
//      zonked too (its first sense is being high on drugs).
// Words taken out stay in the library. Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch424.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, addEntry, linkIds, placeTheme, themeDifficulty, difficultyBand, deleteEntry, deleteTheme, setKin } from '../../js/model.js';
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
const THEMES = ['sleep', 'sleep_words', 'bedding', 'nightwear', 'dream_words', 'bedtime_routine', 'sleep_disorders', 'short_sleeps', 'feeling_tired'];
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return 'no theme';
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.vulgar);
  const b = ws.map(e => difficultyBand(P, e, tid)).sort((x, y) => x - y), td = themeDifficulty(t);
  return `${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, theme difficulty ${td}, 4th-easiest band ${b[3]}, gap ${b[3] - td}`;
};
const prof0 = Object.fromEntries(THEMES.map(t => [t, profile(t)]));
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], alone = new Set(), deleted = [];
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
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
  if (extra.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}${extra.nameOk ? ', may contain the theme name (nameOkIn)' : ''}): ${why}`);
};
const link = (id, text, tid, typ, why, extra) => linkE(chk(id, text), tid, typ, why, extra);
const setE = (id, text, field, value, why) => {
  const e = chk(id, text); if (JSON.stringify(e[field]) === JSON.stringify(value)) return;
  if (P.entries.some(a => a.aliasOf === e.id) && ['adult', 'sensitive', 'tm', 'vulgar'].includes(field)) throw Error(`${lab(e)} has aliases: set their flag too`);
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++;
};
const addToGroup = (tid, ids, why) => {   // ids join one synonym group of tid (joined with any group they are already in)
  const t = T(tid); t.groups ||= [];
  for (const id of ids) if (E(id).typ[tid] === undefined) throw Error(`${id} is not in ${tid}`);
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++;
  A.push(`group in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`);
};
const makeTheme = (id, name, after, fields, why) => {   // a new theme placed right after the theme `after` (same parent)
  if (ix.theme.has(id)) return;
  if (P.themes.some(t => t.name.toLowerCase() === name.toLowerCase())) throw Error('a theme is already named ' + name);
  const parent = T(after).parent;
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: '', ...fields });
  reindex(P); if (!placeTheme(P, id, after, 'after')) throw Error('place ' + id); reindex(P); n++;
  A.push(`new theme: ${id} "${name}" under ${parent}, after ${after} (pop ${fields.pop}, ident ${fields.ident}, note "${fields.note}"): ${why}`);
};
const findNew = (text, gloss, alias) => {   // the entry a previous run of this batch made (a rerun finds it), or null
  const m = (ix.byText.get(text.toLowerCase()) || []).filter(e => e.text === text);
  if (!m.length) return null;
  const hit = m.filter(e => e.gloss === gloss && (alias ? e.aliasOf === alias : !e.aliasOf));
  if (hit.length !== 1) throw Error(`"${text}" already exists (${m.map(lab).join(', ')}): by hand`);
  return hit[0];
};
const newRoot = (text, o, why) => {
  const had = findNew(text, o.gloss || '', 0); if (had) return had;
  if ((ix.byText.get(text.toLowerCase()) || []).length) throw Error(`"${text}" exists in another case or sense: by hand`);
  const e = addEntry(P, text, { gloss: o.gloss || '', pos: o.pos, type: o.type || 'common', fam: o.fam, region: [], typ: {}, status: 'rev' }); n++; reindex(P);
  A.push(`new word: ${lab(e)} (${o.pos}, ${o.type || 'common'}, familiarity ${o.fam}${o.gloss ? ', gloss ' + o.gloss : ''}): ${why}`);
  return e;
};
const kinE = (a, b, why) => { if ((a.kin || []).includes(b.id)) return; setKin(P, a, b, true); n++; A.push(`kin: ${lab(a)} <-> ${lab(b)}: ${why}`); };
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return;
  chk(id, text); deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e));
  A.push(`deleted entry: ${lab(e)}: ${why}`);
};

// ---------- 1. sleep words merges into sleep ----------
A.push('1. sleep words merges into sleep (a theme and its "X words" twin)');
{
  const MOVE = [[16021, 'sleep in', { nameOk: true }], [16022, 'dead to the world'], [16023, 'out like a light'], [16024, 'hit the hay'], [16025, 'sandman'], [16027, 'repose'], [16026, 'soporific']];
  const STAY = new Map([[16020, 'hibernate: sleep has hibernation, its kin'], [16029, 'somnambulist: sleep has somnambulism, its kin'], [3935, 'sleepover: a party, not sleep (stays in its party themes)'], [16028, 'dormant: stays in volcano words']]);
  if (ix.theme.has('sleep_words')) {
    const lack = (ix.byTheme.get('sleep_words') || []).filter(e => !e.aliasOf && e.typ.sleep_words !== undefined && e.typ.sleep === undefined);
    const unknown = lack.filter(e => !MOVE.some(([id]) => id === e.id) && !STAY.has(e.id));
    if (unknown.length) throw Error('sleep words has words this batch does not decide: ' + unknown.map(lab).join(', '));
    for (const [id, text, extra] of MOVE) { const e = chk(id, text); linkE(e, 'sleep', e.typ.sleep_words, 'from sleep words, at the same typicality', extra); }
    addToGroup('sleep', [16021, 3706], 'same answer, as in sleep words');
    addToGroup('sleep', [16022, 16023], 'same answer, as in sleep words');
    const ids = (ix.byTheme.get('sleep_words') || []).filter(e => e.typ.sleep_words !== undefined).map(e => e.id);
    deleteTheme(P, 'sleep_words'); reindex(P); n++;
    A.push(`deleted theme: sleep_words "sleep words": merged into sleep; ${ids.length} links go with it`);
    for (const id of ids) { const e = E(id); if (!linkIds(P, e).length) { alone.add(id); A.push(`  now in no theme: ${lab(e)}: ${STAY.get(id) || ''}`); } }
  }
}

// ---------- 2. sleep ----------
A.push('2. sleep');
{
  const clock = newRoot('body clock', { pos: 'noun', fam: 2 }, 'the everyday word for circadian rhythm');
  linkE(clock, 'sleep', 3, 'the everyday word for circadian rhythm');
  addToGroup('sleep', [3701, clock.id], 'same answer');
  const night = newRoot('all-nighter', { pos: 'noun', fam: 2 }, 'a night without sleep');
  linkE(night, 'sleep', 3, 'a night without sleep');
}

// ---------- 3. bedding ----------
A.push('3. bedding');
if (ix.entry.get(16030)) {
  chk(16030, 'sheet');
  link(3673, 'sheet', 'bedding', E(16030).typ.bedding, 'sheet [bed] takes the place of its duplicate sheet [bedding]');
  addToGroup('bedding', [3673, 16046, 16042], 'the same group sheet [bedding] was in');
  delE(16030, 'sheet', 'a duplicate of sheet [bed] 3673 (same sense, same kin), which takes its link and group');
}
out('bedding', [[16053, 'headboard']], 'part of the bed frame, not bedding');
out('bedding', [[16054, 'thread count']], 'a measure of fabric, not bedding');
out('bedding', [[16050, 'percale'], [16051, 'sateen']], 'a fabric, not bedding');
out('bedding', [[16047, 'memory foam']], 'a material, not bedding');

// ---------- 4. nightwear ----------
A.push('4. nightwear');
out('nightwear', [[4909, 'romper']], 'daywear (a playsuit)');

// ---------- 5. dream words ----------
A.push('5. dream words');
if (ix.entry.get(16081)) {
  const rem = chk(3699, 'REM'), rs = chk(16081, 'rem sleep');
  if (P.entries.some(a => a.aliasOf === rs.id) || Object.keys(rs.typ).join() !== 'dream_words') throw Error('16081 is not the plain "rem sleep" this batch expects');
  linkE(rem, 'dream_words', rs.typ.dream_words, 'REM sleep is the dreaming stage; REM takes the place of its lowercase duplicate');
  delE(16081, 'rem sleep', 'a lowercase duplicate of REM 3699, which takes its place in dream words; as an alias "REM sleep" would give away the theme sleep');
}
out('dream_words', [[3696, 'sleepwalking'], [3697, 'somnambulism']], 'a sleep disorder, not a dream word');
out('dream_words', [[16079, 'vivid'], [16093, 'nocturnal'], [16082, 'déjà vu']], 'a general word, not a dream word');
link(16085, 'sleep talking', 'sleep_disorders', 2, 'a sleep disorder (somniloquy)', { nameOk: true });
out('dream_words', [[16085, 'sleep talking']], 'a sleep disorder; moved to sleep disorders');

// ---------- 6. sleep disorders ----------
A.push('6. sleep disorders');
addToGroup('sleep_disorders', [16085, 16139], 'same answer: somniloquy is the medical word for sleep talking');
out('sleep_disorders', [[16148, 'CPAP']], 'a breathing machine that treats sleep apnea, not a disorder');
out('sleep_disorders', [[16150, 'exploding head']], 'the disorder is exploding head syndrome; the short form is misleading');
{
  const al = E(3714), apnea = chk(62750, 'apnea');
  if (al.aliasOf !== apnea.id) throw Error('3714 is not an alias of apnea');
  if (al.text === 'sleep apnoea') {
    A.push(`alias text: sleep apnoea 3714 -> "apnoea", nameOkIn ${JSON.stringify(al.nameOkIn)} -> []: the UK spelling of its root "apnea"`);
    al.text = 'apnoea'; al.nameOkIn = []; n++; reindex(P);
  } else if (al.text !== 'apnoea') throw Error('3714 is "' + al.text + '"');
}

// ---------- 7. bedtime routine ----------
A.push('7. bedtime routine');
setE(16121, 'say prayers', 'sensitive', true, 'religion (LIBRARY-RULES 4: sensitive)');

// ---------- 8. feeling tired ----------
A.push('8. New theme: feeling tired');
makeTheme('feeling_tired', 'feeling tired', 'short_sleeps', { pop: 2, ident: 2, note: 'tired, sleepy, exhausted, worn out, weary' }, 'words for being tired; no theme had them');
link(62393, 'tired', 'feeling_tired', 1, 'the theme word itself');
link(3686, 'sleepy', 'feeling_tired', 1, 'a first word for tired');
link(3687, 'drowsy', 'feeling_tired', 2, 'a common word for tired');
link(27311, 'knackered', 'feeling_tired', 3, 'British slang for tired');
link(32933, 'lethargic', 'feeling_tired', 4, 'lacking energy');
link(32934, 'listless', 'feeling_tired', 4, 'lacking energy');
{
  const NEW = [['exhausted', 1, 1], ['worn out', 1, 2], ['weary', 2, 2], ['drained', 2, 3], ['groggy', 2, 3], ['sluggish', 2, 3], ['shattered', 3, 3], ['pooped', 3, 3], ['fatigued', 3, 2], ['bushed', 4, 3], ['bleary-eyed', 3, 4], ['run-down', 3, 4]];
  const made = {};
  for (const [text, fam, typ] of NEW) { const e = newRoot(text, { pos: 'adjective', fam }, 'a word for tired'); made[text] = e; linkE(e, 'feeling_tired', typ, 'a word for tired'); }
  kinE(made.exhausted, chk(29115, 'exhaustion'), 'one word family');
  kinE(made.fatigued, chk(15034, 'fatigue'), 'one word family');
  kinE(made['bleary-eyed'], chk(14682, 'bleary'), 'one word family');
  kinE(made.drained, chk(23628, 'drain'), 'one word family (drained is the past participle of drain), so the game keeps them apart in a level');
}
addToGroup('feeling_tired', [3686, 3687], 'same answer, as in sleep');
addToGroup('feeling_tired', [32933, 32934], 'same answer, as in moods');

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
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}")`}`);
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
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Sleep (Body & Health): sleep words merged into sleep; duplicates fixed (sheet, rem sleep, the apnea alias text); words that are not bedding, nightwear, dream words or disorders out; say prayers sensitive; new theme feeling tired; body clock and all-nighter added to sleep.',
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
fs.writeFileSync(REVIEW || new URL('./batch424-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
