// Library batch v405 (approved by Simon 2026-11-19). Two parts:
// 1. T20: show keys on alias entries for themes the alias does not link itself. The export ignores them (js/export.js: an inherited link shows the alias's
//    own text), so they are dead data. All 51 were checked: moving one to the root would change what the root shows (the root shows its own text or its own
//    show there), so every one is deleted. Players see exactly what they saw.
// 2. places_that_are_also_words: the place, not the common word: paradise 29430 and hell 34404 leave the theme; new entries Paradise (Nevada), Hell (Michigan).
// Every entry this batch changes or checks and confirms gets status "rev" (DESIGN.md, status). Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch405.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, setKin, moveKin, eff, addEntry, deleteEntry } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT, CLASH_MAX } from '../../js/family.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), DIR = new URL('./kin400/', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), inExp0 = new Set(x0.ids);
let n = 0, revSet = 0; const review = [], notes = [];
const rev = e => { if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } };
const set = (e, k, v, why) => { if (JSON.stringify(e[k]) === JSON.stringify(v)) return false; notes.push(`${lab(e)}: ${k} ${JSON.stringify(e[k])} -> ${JSON.stringify(v)}${why ? ' (' + why + ')' : ''}`); e[k] = v; n++; return true; };


// ---------- 1. T20 ----------
const t20 = [], NO20 = process.argv.includes('--no-t20'), ALLOW = process.argv.includes('--allow-new');   // --no-t20: part 2 only; --allow-new: accept the new theme-name warnings T20 uncovers
for (const e of NO20 ? [] : P.entries) if (e.aliasOf && e.show) for (const t of Object.keys(e.show)) if (e.typ[t] === undefined) {
  const r = E(e.aliasOf), rs = r.show?.[t];
  t20.push(`${lab(e)} -> root ${lab(r)}: ${t}, shown "${e.show[t]}": deleted (dead; root ${r.typ[t] !== undefined ? 'links the theme' : 'does NOT link the theme'} and shows ${rs ? '"' + rs + '"' : 'its own text'}, which players keep seeing)`);
  delete e.show[t]; n++; rev(e);
}
if (!t20.length && !NO20) t20.push('T20: done (no dead show key left)');
// The dead keys hid that the alias's own text (what players see) has a theme's name word in it. Each such text is the thing's real name (spring onion,
// shoe shop, sun cream ...: all reviewed, none gives its theme away), so the theme goes into the alias's nameOkIn (DESIGN.md), as v403 did for 41 aliases.
const nameOk = [];
if (!NO20) for (const e of P.entries) if (e.aliasOf) for (const tid of Object.keys(P.ix.entry.get(e.aliasOf).typ)) {
  const t = ix.theme.get(tid); if (!t || e.typ[tid] !== undefined || !t20.some(x => x.startsWith(lab(e) + ' ') && x.includes(': ' + tid + ','))) continue;
  const w = nameLeak(t, e); if (w) { e.nameOkIn = [...(e.nameOkIn || []), tid]; n++; nameOk.push(`${lab(e)} in ${tid} ("${w}")`); }
}
t20.push(`nameOkIn added for ${nameOk.length} alias/theme pairs (real names that contain the theme's name word): ${nameOk.join('; ')}`);

// ---------- 2. places_that_are_also_words ----------
const t4 = [], PT = 'places_that_are_also_words';
for (const [oldId, text, word, gloss, fam, typ, region, why] of [
  [29430, 'Paradise', 'paradise', 'Nevada town', 4, 4, 'US', 'Paradise, Nevada: the town that holds the Las Vegas Strip and the airport'],
  [34404, 'Hell', 'hell', 'Michigan town', 4, 5, 'US', 'Hell, Michigan: the better-known Hell for an English-language game (a tourist stop, "gone to Hell" jokes); Hell, Norway is a village known for its station sign, and NO is not a region the library has']]) {
  const c = E(oldId); if (!c.gloss) { c.gloss = word === 'hell' ? 'the underworld' : 'heaven, bliss'; n++; }
  if (c.text !== word || c.type !== 'common') throw Error(oldId + ' is ' + c.text);
  let M = P.entries.find(e => e.text === text && e.type === 'place');
  if (!M) { M = addEntry(P, text, { gloss, type: 'place', fam, region: [region], typ: { [PT]: typ }, status: 'rev' }); reindex(P); n++; t4.push(`new entry ${text} ${M.id} (${why}; type place, region ${region}, familiarity ${fam}, typicality ${typ})`); }
  else t4.push(`${text} ${M.id}: exists`);
  if (c.typ[PT] !== undefined) { delete c.typ[PT]; n++; t4.push(`${word} [common] ${oldId} leaves ${PT} (its other themes stay)`); }
  rev(c);
}
reindex(P);
{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');

// export comparison (before = the committed v404 file when baseOk)
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')).entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(C.text, x0.text) && same(C.links, x0.links) && same(C.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v404 before the changes: ${baseOk ? 'yes' : 'NO'}`];
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : firstShift}; added ${addedRows.map(id => `${ix.entry.get(id) ? lab(ix.entry.get(id)) : "?" + id} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => String(id)).join(', ') || 'none'}`);
const textCh = x1.ids.filter((id, i) => ia.has(id) && x1.text[i] !== x0.text[ia.get(id)]).map(id => `${x0.text[ia.get(id)]} -> ${x1.text[ib.get(id)]} (${id})`);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]).map(id => lab(ix.entry.get(id)));
const famCh = x1.ids.filter((id, i) => ia.has(id) && x1.fam[i] !== x0.fam[ia.get(id)]).map(id => lab(ix.entry.get(id)));
const rootCh = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== x0.root[ia.get(id)]).map(id => lab(ix.entry.get(id)));
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed: ${flagCh.join(', ') || 'none'}; familiarity changed: ${famCh.join(', ') || 'none'}; root column changed: ${rootCh.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).map(id => lab(ix.entry.get(id)));
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length} (${lcCh.join(', ')})`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(ix.entry.get(x1.ids[firstLinkShift]))}) on, link positions move`}`);
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const m0 = shownMap(x0), m1 = shownMap(x1);
const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
const fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (row of ${id})`; };
cmp.push(`Links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
for (const k of lost) cmp.push(`  gone: ${fmt(k)}`);
for (const k of gained) cmp.push(`  new: ${fmt(k)}`);
for (const k of rated) cmp.push(`  rating: ${fmt(k)} ${m0.get(k)} -> ${m1.get(k)}`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
const clashRows = x1.ids.filter((id, i) => ia.has(id) && x1.clash[i] !== x0.clash[ia.get(id)]).length;
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; rows whose clash id changed ${clashRows}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).sort((p, q) => q.length - p.length).map(g => `${g.length} (${g.slice(0, 5).join(', ')}${g.length > 5 ? ', ..' : ''})`).join('; ') || 'none'}`);

const summary = [`Part 1 T20 (${t20.length}):`, ...t20.map(x => '  ' + x), `Part 2 places: ${t4.join('; ')}`,
  `library changes ${n}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
if (CHANGES) fs.writeFileSync(CHANGES, summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big') && !(ALLOW && x.startsWith('warn theme-name')));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
