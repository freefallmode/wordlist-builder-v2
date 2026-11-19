// Library batch v406 (approved by Simon 2026-11-19).
// A. Sponge (game decision D2): "sponge cake" 66357 takes the cakes link of "sponge" 28037 (rating 1, shown "sponge"); 28037 becomes an alias of 66357 (kind abbreviation: a clipped
//    form of the full term, which is what DESIGN-entries.md 3.1 gives abbreviation for; the model has no "clipping" kind), converted in place (id kept, as batch403 does). Its kin goes to the root.
// B. blank_cake: the texts shown for Dundee cake and Madeira cake are "Dundee" and "Madeira" (proper names).
// C. maori_culture, maori_mythology, maori_words are named with the macron (root spelling, DESIGN-entries.md theme-name rule). Ids unchanged.
// D. Theme renames from tools/gen/names406-approved.tsv (themeId, oldLen, oldName, newLen, newName, action, reason; header line): every RENAME whose oldName still matches. Absent file: skipped.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch406.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>] [--names <tsv>] [--allow-new]
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


// ---------- A. sponge ----------
const A = [], R = E(66357), X = E(28037);
if (R.text !== 'sponge cake' || X.text !== 'sponge') throw Error('66357 / 28037 are not sponge cake / sponge');
if (X.aliasOf === R.id) A.push('done: sponge 28037 is already an alias of sponge cake 66357');
else {
  if (X.aliasOf || Object.keys(X.typ).join() !== 'cakes' || R.typ.cakes !== undefined) throw Error('sponge / sponge cake are not in the expected state');
  const v = X.typ.cakes; R.typ.cakes = v; R.show = { ...(R.show || {}), cakes: 'sponge' };
  A.push(`${lab(R)} takes the cakes link (typicality ${v}, the rating ${lab(X)} had) shown "sponge"; it stays in blank_cake (typicality ${R.typ.blank_cake}, shown "${R.show.blank_cake}")`);
  for (const t of P.themes) if (t.groups) {   // synonym places of the alias go to the root (dropped where the root already has a place)
    const gs = [];
    for (const g of t.groups) { if (!g.includes(X.id)) { gs.push(g); continue; } const ng = g.some(id => id === R.id) ? g.filter(id => id !== X.id) : g.map(id => id === X.id ? R.id : id); A.push(`${t.id} group (${g.map(id => E(id).text).join(', ')}) -> ${ng.length > 1 ? '(' + ng.map(id => E(id).text).join(', ') + ')' : 'gone'}`); if (ng.length > 1) gs.push(ng); }
    t.groups = gs; if (!gs.length) delete t.groups;
  }
  for (const e of P.entries) if (e.use) for (const [tid, id] of Object.entries(e.use)) if (id === X.id) throw Error(`${lab(e)} uses ${X.id}`);
  const kin = [...(X.kin || [])];
  moveKin(P, X, R);
  A.push(`kin of ${lab(X)} moved to the root: ${kin.map(id => lab(E(id))).join(', ') || 'none'} (partners updated both ways; root kin now ${R.kin.join(', ')})`);
    Object.assign(X, { typ: {}, show: {}, use: {}, kin: [], aliasOf: R.id, aliasKind: 'abbreviation' });
  A.push(`${lab(X)} [gloss "${X.gloss}" kept: five entries spell sponge, the needs-gloss check requires it] is now an alias of ${lab(R)}, kind abbreviation (a clipped form of the full term; DESIGN-entries.md 3.1 has no clipping kind, abbreviation is the nearest: own recognisability, shared typicality); own links removed (aliases take the root's themes)`);
  A.push('note: the export keeps an alias row beside the root row in each theme (an inherited link is never dropped as same text, js/export.js sameText skips aliases without own typ), so "sponge" appears as root-show and alias in cakes and blank_cake; the same pattern exists for 18 aliases (lasagne/lasagna, EVA/spacewalk ...); one answer per theme would need an export.js change');
  n += 6; rev(R); rev(X); reindex(P);
}

// ---------- B. blank_cake shown texts ----------
const B = [];
for (const [id, to] of [[66363, 'Dundee'], [66364, 'Madeira']]) { const e = E(id); if (e.show?.blank_cake === undefined) throw Error(lab(e) + ' has no blank_cake show'); if (set(e, 'show', { ...e.show, blank_cake: to }, 'blank_cake shows the proper name')) { rev(e); B.push(`${lab(e)}: blank_cake shown "${to}"`); } }

// ---------- C + D. theme names ----------
const CM = [], D = [], renameTheme = (id, from, to, why) => {
  const t = ix.theme.get(id); if (!t) { D.push(`SKIP ${id}: no such theme`); return; }
  if (t.name === to) return;
  if (t.name !== from) { D.push(`SKIP ${id}: name is now "${t.name}", not "${from}"`); return; }
  const clash = P.themes.find(x => x !== t && x.name.toLowerCase() === to.toLowerCase());
  if (clash) { D.push(`SKIP ${id}: "${to}" is the name of ${clash.id} already`); return; }
  t.name = to; n++; (why === 'C' ? CM : D).push(`${id}: "${from}" (${[...from].length}) -> "${to}" (${[...to].length})${why === 'C' ? '' : ' ' + why}`);
};
for (const [id, from, to] of [['maori_culture', 'Maori culture', 'Māori culture'], ['maori_mythology', 'Maori mythology', 'Māori mythology'], ['maori_words', 'Maori words', 'Māori words']]) renameTheme(id, from, to, 'C');
const NAMES = new URL(arg('--names') || './names406-approved.tsv', import.meta.url); let dNote;
if (!fs.existsSync(NAMES)) dNote = 'D skipped: tools/gen/names406-approved.tsv does not exist';
else {
  const rows = fs.readFileSync(NAMES, 'utf8').split(/\r?\n/).slice(1).filter(l => l.trim()).map(l => l.split('\t')); let seen = 0;
  for (const [id, , oldName, , newName, action, reason] of rows) { if (String(action).trim() !== 'RENAME') continue; seen++; renameTheme(id.trim(), oldName, newName, `(${(reason || '').trim()})`); }
  dNote = `D: ${seen} RENAME rows read, ${D.filter(x => !x.startsWith('SKIP')).length} applied, ${D.filter(x => x.startsWith('SKIP')).length} skipped (name no longer matches)`;
}
reindex(P);
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

// export comparison (before = the committed v405 file when baseOk)
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')).entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(C.text, x0.text) && same(C.links, x0.links) && same(C.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v405 before the changes: ${baseOk ? 'yes' : 'NO'}`];
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

const summary = [`A. sponge (${A.length}):`, ...A.map(x => '  ' + x), `B. blank_cake: ${B.join('; ') || 'done'}`, `C. Maori themes: ${CM.join('; ') || 'done'}`, `D. ${dNote}`, ...D.map(x => '  ' + x),
  `library changes ${n}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch406-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big') && !(ALLOW && x.startsWith('warn theme-name')));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
