// Library batch v411 (Simon 2026-11-20, three fixes after v411):
//   1. French Guiana 35765 is part of France, not a country: unlinked from south_american_countries (complete) and french_speaking_countries; its note
//      item and any group go; the entry is kept (it has no theme then).
//   2. canadian_provinces (complete) holds the 3 territories too: Yukon 31816, Northwest Territories 36214, Nunavut 36213 are unlinked from it (and from
//      its groups); the note is the exact list of the 10 provinces. The territories keep their other themes (any with none is reported).
//   3. Kelvin 40846 is the SI unit, written lowercase like watt, newton, joule, ampere: text "kelvin", type common, id kept.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch411.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, moveKin } from '../../js/model.js';
import { validate, noteItems } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT, CLASH_MAX } from '../../js/family.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const TH = id => { const t = ix.theme.get(id); if (!t) throw Error('no theme ' + id); if (!t.complete) throw Error(id + ' is not complete'); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp();
let n = 0, revSet = 0;
const revd = new Set(), rev = e => { if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } revd.add(e.id); };


// ---------- A. notes ----------
const NOTES = [
  ['south_american_countries', 'the 12 countries and French Guiana: Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname, Uruguay, Venezuela, French Guiana',
    'the 12 countries: Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname, Uruguay, Venezuela', 12],
  ['canadian_provinces', 'the 10 provinces and 3 territories: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador (Newfoundland), Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan, Northwest Territories, Nunavut, Yukon',
    'the 10 provinces: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador (Newfoundland), Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan', 10],
];
const A = [];
for (const [tid, from, to, size] of NOTES) {
  const t = TH(tid), items = noteItems(to);
  if (items.length !== size) throw Error(`${tid}: new note has ${items.length} items, not ${size}`);
  if (t.note === to) { A.push(`done: ${tid}`); continue; }
  if (t.note !== from) throw Error(`${tid}: note is not the v410 one: ${t.note}`);
  t.note = to; n++; A.push(`${tid} "${t.name}" (${items.length} items): "${from}" -> "${to}"`);
}

// ---------- C. unlinks ----------
const C = [];
const UNLINK = [
  ['south_american_countries', 35765, 'French Guiana', 'part of France, not a country'],
  ['french_speaking_countries', 35765, 'French Guiana', 'part of France, not a country'],
  ['canadian_provinces', 31816, 'Yukon', 'a territory, not a province'],
  ['canadian_provinces', 36214, 'Northwest Territories', 'a territory, not a province'],
  ['canadian_provinces', 36213, 'Nunavut', 'a territory, not a province'],
];
for (const [tid, id, text, why] of UNLINK) {
  const t = ix.theme.get(tid); if (!t) throw Error('no theme ' + tid); const e = E(id); if (e.text !== text) throw Error(`${id} is not ${text}`);
  if (e.typ[tid] === undefined) { C.push(`done: ${lab(e)} not in ${tid}`); continue; }
  const grp = (t.groups || []).filter(g => g.includes(id)).map(g => g.map(i => E(i).text).join(' / '));
  unlinkEntry(P, e, tid); n++; rev(e);
  C.push(`${tid}: ${lab(e)} unlinked (${why}); groups it was in: ${grp.join('; ') || 'none'}; still in ${Object.keys(e.typ).join(', ') || 'NO THEME'}`);
}
for (const tid of ['south_american_countries', 'canadian_provinces', 'french_speaking_countries']) {   // no group may keep an unlinked member
  const t = ix.theme.get(tid); if (!t.groups) continue;
  const gs = t.groups.map(g => g.filter(id => E(id).typ[tid] !== undefined)).filter(g => g.length > 1);
  if (JSON.stringify(gs) !== JSON.stringify(t.groups)) { t.groups = gs; if (!gs.length) delete t.groups; n++; C.push(`${tid}: groups tidied`); }
}
reindex(P);
const noTheme = [31816, 36214, 36213, 35765].filter(id => !Object.keys(E(id).typ).length).map(id => lab(E(id)));

// ---------- E. kelvin ----------
// Siblings units named after people (watt 41872, newton 40616, joule 40617, ampere 29547) are lowercase, type common, with no shown text.
const Ex = [];
{ const k = E(40846);
  if (k.text === 'kelvin' && k.type === 'common') Ex.push('done: kelvin 40846 common');
  else { if (k.text !== 'Kelvin' || k.gloss !== 'unit') throw Error('40846 is not Kelvin (unit)'); k.text = 'kelvin'; k.type = 'common'; n++; rev(k);
    Ex.push(`Kelvin 40846 -> kelvin, type proper -> common; show texts ${JSON.stringify(k.show)}; themes ${Object.entries(k.typ).map(([a, b]) => a + ' ' + b).join(', ')}; aliases ${(ix.aliases.get(k.id) || []).map(a => a.text).join(', ') || 'none'}`); }
}
reindex(P);

// ---------- D. the rule on every complete theme (validate's complete-* kinds) ----------
const D = [], cx = validate(P).filter(i => i.kind.startsWith('complete-'));
for (const i of cx) D.push(`${i.sev} ${i.kind}: ${i.msg}`);
const LISTED = ['an alias "Kelvin" (the scale is also called the Kelvin scale; the name is also a given name) is not added; say if wanted'];
{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(CE.text, x0.text) && same(CE.links, x0.links) && same(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v${P.lib.version} before the changes: ${baseOk ? 'yes' : 'NO'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]})`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : firstShift}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${lab(E(id))}`).join(', ') || 'none'}`);
const textCh = x1.ids.filter((id, i) => ia.has(id) && x1.text[i] !== x0.text[ia.get(id)]).map(id => `${x0.text[ia.get(id)]} -> ${x1.text[ib.get(id)]} (${id})`);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]).map(id => lab(E(id)));
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed: ${flagCh.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length} (${lcCh.map(id => lab(E(id))).join(', ') || 'none'})`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(E(x1.ids[firstLinkShift]))}) on, link positions move`}`);
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
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);

const summary = ['Fixes: French Guiana out of South America and French-speaking countries; territories out of Canadian provinces; kelvin lowercase common.',
  `A. notes rewritten (${NOTES.length}):`, ...A.map(x => '  ' + x),
  `C. unlinked:`, ...C.map(x => '  ' + x),
  'E. kelvin:', ...Ex.map(x => '  ' + x),
  `D. complete-* check after: ${D.length ? D.length + ' issues' : 'none'}`, ...D.map(x => '  ' + x),
  `Entries with no theme now: ${noTheme.join(', ') || 'none'}`,
  'Listed, not changed:', ...LISTED.map(x => '  ' + x),
  `library changes ${n}; status set to rev ${revSet}; entries touched ${revd.size}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch411-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
