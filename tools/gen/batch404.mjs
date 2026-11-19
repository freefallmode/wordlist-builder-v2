// Library batch v404 (approved by Simon 2026-11-19). Four parts:
// 1. Kin re-link (I22, DESIGN-entries.md 3.7 Group size, loosened 2026-11-19): the kin pairs of the v400 pass (tools/gen/kin400/decisions-*.txt with
//    overrides.txt; codes K, K?, KD) that are still not kin on v403 (the 558 "too big" of v400 and 4 more, after the v403 merges: ids resolve to their
//    root; a pair whose two ids now share one root is done). Order as v400: both words in the family export first, then one, then none; chunk order inside.
//    Sizes counted as the clash-big check counts them (synonym groups of playable themes + kin, enabled entries, each root with its enabled aliases).
//      group after the link <= 8 (CLASH_SOFT)        -> kin
//      9..12 (CLASH_MAX)                               -> kin when a sure look-alike (K or KD; a K? pair, one written word in another sense, is a
//                                                         judgement call) and its themes are big: every playable theme of each of the two words has at
//                                                         least BIG members (enabled roots linked; 20 = the lower quartile of theme sizes); else left unlinked
//      over 12                                          -> left unlinked (listed). A left pair whose words end up in one clash group by later links is linked.
// 2. T10: settings.model goes (nothing reads it: js/ai.js keeps the model in the browser); aliasOf null -> 0; nextId above the highest id.
// 3. T16: data oddities of the proper-word review (verdict per item in the review file).
// 4. places_that_are_also_words: the place, not the common word: Bath 16586 for bath [tub] 27983; a new entry Mold (Welsh town) for mold [fungus] 30330.
// Every entry this batch changes or checks and confirms gets status "rev" (DESIGN.md, status). Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch404.mjs [--apply | --out <path>] [--lib <path>] [--review <path>] [--changes <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, setKin, moveKin, eff, addEntry, deleteEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
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

// ---------- 2. T10 ----------
const t10 = [];
if ('model' in P.settings) { delete P.settings.model; n++; t10.push('settings.model removed (nothing reads it; the model is a browser setting, js/ai.js getModel)'); }
{ let k = 0; for (const e of P.entries) if (e.aliasOf === null || e.aliasOf === undefined) { e.aliasOf = 0; k++; } if (k) { n++; t10.push(`aliasOf null -> 0 on ${k} entries`); } }
// nextId: parseProject corrects it on load; checked again after the new entries below

// ---------- 3. T16 ----------
const t16 = [];
// plaster [adhesive] shows Band-Aid in brand names used as words: the brand is the regional alias Band-Aid 15384 (tm, type org), which takes the link itself
// (an alias may carry its own link, as jiffy bag 29579 does there); plaster would lose that link and its shown text.
// HELD (not applied): the theme has 52 tm/proper members of 66; one common word fewer makes it 80% "names", and the case lint (nameThemeCommons) then
// flags its 12 genericised words (granola, zipper, aspirin, escalator ...) as common-in-names, so the strict export fails. Needs Simon's call.
{ const pl = E(15383), ba = E(15384), T = 'brand_names_used_as_words';
  if (ba.text !== 'Band-Aid' || ba.aliasOf !== pl.id || !ba.tm) throw Error('Band-Aid changed');
  t16.push(pl.typ[T] !== undefined ? `plaster/Band-Aid: HELD: moving the link from plaster 15383 to the alias Band-Aid 15384 (tm) tips "${ix.theme.get(T).name}" to 80% names (53 of 66), and the case lint then warns common-in-names on its 12 genericised words (granola, zipper, aspirin ...), failing the strict export; unchanged` : 'plaster/Band-Aid: done'); }
// great Indian bustard shows "great bustard" (another species) in Indian animals: shown text removed; the full name is the real name (nameOkIn)
{ const e = E(51130), T = 'indian_animals';
  if (e.show?.[T]) { delete e.show[T]; n++; t16.push(`great Indian bustard 51130: shown "great bustard" (another species) removed in ${T}; nameOkIn ${T} (the full name is the bird's name)`); } else t16.push('great Indian bustard: done');
  if (!(e.nameOkIn || []).includes(T)) { e.nameOkIn = [...(e.nameOkIn || []), T]; n++; }
  rev(e); }
// atomic: fixed at v402 (atomic family, shown "atomic" in family and friends): nothing to do
t16.push('atomic: fixed at v402 (atomic family): nothing to do');
// Forbidden 64811 and Quarter 63729: capitalised entries with no themes. Deleted when nothing refers to them and they are not in the family export.
for (const [id, text] of [[64811, 'Forbidden'], [63729, 'Quarter']]) {
  const e = ix.entry.get(id);
  if (!e) { t16.push(`${text} ${id}: deleted (done)`); continue; }
  if (e.text !== text) throw Error(`${id} is ${e.text}`);
  const refs = [];
  if (Object.keys(e.typ).length) refs.push('themes');
  if ((ix.aliases.get(id) || []).length) refs.push('aliases');
  if (e.aliasOf) refs.push('is an alias');
  for (const x of P.entries) { if ((x.kin || []).includes(id)) refs.push('kin of ' + lab(x)); for (const v of Object.values(x.use || {})) if (v === id) refs.push('use of ' + lab(x)); }
  for (const t of P.themes) for (const g of t.groups || []) if (g.includes(id)) refs.push('group in ' + t.id);
  if (inExp0.has(id)) refs.push('in the family export');
  if (refs.length) { t16.push(`${text} ${id}: kept (${refs.join(', ')})`); rev(e); continue; }
  deleteEntry(P, e); reindex(P); n++; t16.push(`${text} ${id} [${e.gloss || 'no gloss'}]: deleted (no themes, no aliases, no kin, use or group refers to it, not in the export)`);
}
// Easter egg [hidden feature] 45658 (gaming words) is the meaning of Easter egg [game secret] 5829 (video games): one entry. A form alias cannot have
// its root's text (alias-same), so 45658 becomes the plural form "Easter eggs" of 5829 (same id: no export row moves, as v403 did); its link moves to the root.
{ const R = E(5829), X = E(45658);
  if (X.aliasOf === R.id) t16.push('Easter egg: merged (done)');
  else {
    if (R.text !== 'Easter egg' || X.text !== 'Easter egg') throw Error('Easter egg changed');
    for (const [tid, v] of Object.entries(X.typ)) if (R.typ[tid] === undefined) R.typ[tid] = v;
    for (const t of P.themes) if (t.groups?.some(g => g.includes(X.id))) throw Error('45658 in a group of ' + t.id);
    moveKin(P, X, R);
    Object.assign(X, { text: 'Easter eggs', gloss: R.gloss, typ: {}, show: {}, use: {}, kin: [], aliasOf: R.id, aliasKind: 'form' });
    reindex(P); n++;
    t16.push(`Easter egg: [hidden feature] 45658 merged into [game secret] 5829 (one meaning): gaming_words moves to 5829 (typicality ${R.typ.gaming_words}), 45658 is now its form alias "Easter eggs" (same id)`);
  }
  rev(R); rev(X); }
// parc ferme lacks its accent: text "parc fermé", with the unaccented spelling as a spelling alias (as ancien régime / ancien regime)
{ const e = E(46710);
  if (e.text === 'parc ferme') { e.text = 'parc fermé'; n++; t16.push('parc ferme 46710 -> "parc fermé"'); } else if (e.text !== 'parc fermé') throw Error('parc ferme changed');
  else t16.push('parc fermé: done');
  if (!(ix.aliases.get(e.id) || []).some(a => a.text === 'parc ferme')) { const a = addEntry(P, 'parc ferme', { pos: e.pos, type: e.type, fam: e.fam, region: [...e.region], aliasOf: e.id, aliasKind: 'spelling', status: 'rev' }); reindex(P); n++; t16.push(`  spelling alias "parc ferme" ${a.id} added`); }
  rev(e); }
t16.push('ancien regime: fixed before (Ancien Régime 7104 and ancien régime 55127 with unaccented spelling aliases): nothing to do');
// dada served both baby talk and the art movement: 6359 stays the art movement (its group with dadaism in art and art movements), a new entry dada [baby talk]
{ const e = E(6359), T = 'baby_talk';
  if (e.typ[T] !== undefined) {
    delete e.typ[T]; set(e, 'gloss', 'art movement');
    const b = addEntry(P, 'dada', { gloss: 'baby talk', pos: 'noun', type: 'common', fam: 1, typ: { [T]: 2 }, status: 'rev' }); reindex(P); n++;
    t16.push(`dada: 6359 is the art movement (gloss "art movement"; art, art_movements, grouped with dadaism), leaves baby_talk; new entry dada [baby talk] ${b.id} (familiarity 1, typicality 2) in baby_talk`);
  } else t16.push('dada: split (done)');
  rev(e); }
// brutalism / brutalist in architecture styles: already one synonym group (rule B): confirmed
{ const t = ix.theme.get('architecture_styles'); if (!(t.groups || []).some(g => g.includes(6595) && g.includes(13928))) throw Error('brutalism group gone');
  t16.push('brutalism/brutalist: already one synonym group in architecture_styles (rule B): confirmed'); rev(E(6595)); rev(E(13928)); }
// case left undecided by the reviewers: kept as they are (see the review file); status rev (checked and confirmed)
for (const id of [15499, 5703, 63356, 12006, 34430]) rev(E(id));
t16.push('case kept: special K 15499 (the drug slang, written so), premium bonds 5703, great northern 63356, land art 12006, promised land 34430 (common uses, lowercase as the style rule has it): confirmed');

// ---------- 4. places_that_are_also_words ----------
const t4 = [], PT = 'places_that_are_also_words';
{ const bath = E(27983), Bath = E(16586);
  if (Bath.text !== 'Bath' || Bath.type !== 'place') throw Error('Bath changed');
  if (bath.typ[PT] !== undefined) { const v = bath.typ[PT]; delete bath.typ[PT]; if (Bath.typ[PT] === undefined) Bath.typ[PT] = v; n++; t4.push(`bath [tub] 27983 leaves ${PT}; Bath 16586 (English city) linked at typicality ${v}`); }
  else t4.push('Bath: done');
  rev(bath); rev(Bath); }
{ const mold = E(30330);
  let M = P.entries.find(e => e.text === 'Mold' && e.type === 'place');
  if (!M) { M = addEntry(P, 'Mold', { gloss: 'Welsh town', type: 'place', fam: 5, region: ['UK'], typ: { [PT]: 4 }, status: 'rev' }); reindex(P); n++; t4.push(`new entry Mold ${M.id} (Welsh town, type place, region UK, familiarity 5, typicality 4: a small county town, less known than Slough or Sale, 4)`); }
  else t4.push(`Mold ${M.id}: exists`);
  if (mold.typ[PT] !== undefined) { delete mold.typ[PT]; n++; t4.push(`mold [fungus] 30330 leaves ${PT}`); }
  rev(mold); }
reindex(P);
// T10: nextId above the highest id
{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; t10.push('nextId raised to ' + P.nextId); } t10.push(`nextId ${P.nextId}, highest id ${hi}: right`); }

// ---------- 1. kin re-link ----------
const parse = l => { const m = l.match(/^(\d+) (\d+) (K\?|KD|K|N\?|N) (.*?)(?: -- (.*))?$/); if (!m) throw Error('bad line ' + l); return { a: +m[1], b: +m[2], d: m[3], w: m[4], why: m[5] || '' }; };
const lines = f => fs.readFileSync(new URL(f, DIR), 'utf8').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
const OV = new Map(lines('overrides.txt').map(l => { const p = parse(l); return [p.a + '|' + p.b, p]; }));
const ALL = [];
for (let c = 1; c <= 14; c++) { const nn = String(c).padStart(2, '0'); lines(`decisions-${nn}.txt`).forEach((l, i) => { let p = parse(l); const o = OV.get(p.a + '|' + p.b); if (o) p = { ...p, d: o.d, why: o.why }; ALL.push({ ...p, ch: nn, ln: i + 1 }); }); }
const rootOf = id => { const e = ix.entry.get(id); return e && e.aliasOf ? ix.entry.get(e.aliasOf) : e; };
const playable = P.themes.filter(t => !t.group && eff(P, t.id).enabled), keep = id => !!ix.entry.get(id)?.enabled;
const tsize = new Map(); for (const t of playable) tsize.set(t.id, (ix.byTheme.get(t.id) || []).filter(e => e.enabled && !e.aliasOf && e.typ[t.id] !== undefined).length);
const BIG = 20;
const par = new Map(), wt = new Map();
const add = id => { if (!par.has(id)) { par.set(id, id); wt.set(id, 1 + (ix.aliases.get(id) || []).filter(a => a.enabled).length); } return id; };
const find = x => { add(x); while (par.get(x) !== x) x = par.get(x); return x; };
const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) { par.set(rb, ra); wt.set(ra, wt.get(ra) + wt.get(rb)); } };
for (const t of playable) for (const g of t.groups || []) { const m = g.filter(keep); for (const id of m.slice(1)) union(m[0], id); }
for (const e of P.entries) if (!e.aliasOf && keep(e.id)) for (const k of e.kin || []) if (k > e.id && keep(k)) union(e.id, k);
const size = id => wt.get(find(id));
const pthemes = e => Object.keys(e.typ).filter(t => tsize.has(t));
const minT = e => { const s = pthemes(e).map(t => tsize.get(t)); return s.length ? Math.min(...s) : 0; };
const open = [], seen = new Set(), K = { done: 0 };
for (const p of ALL) {
  if (!p.d.startsWith('K')) continue;
  const A = rootOf(p.a), B = rootOf(p.b);
  if (!A || !B) continue;
  if (A === B) { K.done++; continue; }
  const k = Math.min(A.id, B.id) + '|' + Math.max(A.id, B.id);
  if ((A.kin || []).includes(B.id) || seen.has(k)) continue;
  if (!A.enabled || !B.enabled) continue;
  seen.add(k); open.push({ ...p, A, B, F: (inExp0.has(A.id) ? 'F' : '-') + (inExp0.has(B.id) ? 'F' : '-') });
}
const tier = p => 2 - (p.F.match(/F/g) || []).length;
const order = open.map((p, i) => [p, i]).sort((x, y) => tier(x[0]) - tier(y[0]) || x[1] - y[1]).map(x => x[0]);
const R = { linked: [], large: [], tooBig: [], small: [], q: [], joined: [] };
const row = (p, r) => `${p.d.padEnd(2)} ${p.A.text} / ${p.B.text} (${p.A.id} / ${p.B.id}; ${p.F}; ${p.ch}:${p.ln}): ${r}${p.why ? ' -- ' + p.why : ''}`;
const res = new Map();
for (const p of order) {
  const { A, B } = p;
  if (find(A.id) === find(B.id)) { setKin(P, A, B, true); n++; rev(A); rev(B); R.joined.push(p); res.set(p, 'kin (one clash group already)'); continue; }
  const s = size(A.id) + size(B.id);
  if (s <= CLASH_SOFT) { union(A.id, B.id); setKin(P, A, B, true); n++; rev(A); rev(B); R.linked.push(p); res.set(p, `kin (clash group ${s})`); continue; }
  if (s > CLASH_MAX) { R.tooBig.push(p); res.set(p, `too big: left unlinked (clash groups ${size(A.id)} + ${size(B.id)} = ${s} > ${CLASH_MAX})`); continue; }
  const ma = minT(A), mb = minT(B);
  if (p.d === 'K?') { R.q.push(p); res.set(p, `left unlinked: group would be ${s} (9-12) and the pair is a judgement call (another sense), not a sure look-alike`); continue; }
  if (ma < BIG || mb < BIG) { R.small.push(p); res.set(p, `left unlinked: group would be ${s} (9-12) and a theme is small (smallest theme ${ma} / ${mb} members, under ${BIG})`); continue; }
  union(A.id, B.id); setKin(P, A, B, true); n++; rev(A); rev(B); R.large.push(p); res.set(p, `kin, clash group ${s} (9-12: themes big, smallest ${ma} / ${mb} members)`);
}
// a left pair whose two words are in one clash group by now costs nothing: link it (so a rerun finds nothing to do)
for (const L of [R.tooBig, R.small, R.q]) for (const p of L.splice(0)) {
  if (find(p.A.id) !== find(p.B.id)) { L.push(p); continue; }
  setKin(P, p.A, p.B, true); n++; rev(p.A); rev(p.B); R.joined.push(p); res.set(p, 'kin (in one clash group by now)');
}
reindex(P);

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');

// export comparison (before = the committed v403 file when baseOk)
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')).entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(C.text, x0.text) && same(C.links, x0.links) && same(C.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v403 before the changes: ${baseOk ? 'yes' : 'NO'}`];
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

const summary = [
  `Part 1 kin: ${open.length} decided-kin pairs still not kin on v403 (pairs whose ids now share one root: ${K.done}); linked ${R.linked.length} (group <= ${CLASH_SOFT}) + ${R.large.length} (group 9-${CLASH_MAX}, big themes) + ${R.joined.length} (one clash group already); left unlinked: ${R.tooBig.length} over ${CLASH_MAX}, ${R.small.length} 9-${CLASH_MAX} with a small theme (under ${BIG} members), ${R.q.length} 9-${CLASH_MAX} judgement calls (K?)`,
  `Part 2 T10: ${t10.join('; ')}`, `Part 3 T16:`, ...t16.map(x => '  ' + x), `Part 4 places: ${t4.join('; ')}`,
  `library changes ${n}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
if (REVIEW) {
  const sec = (h, L) => [`== ${h} (${L.length}) ==`, ...(L.length ? L.map(p => row(p, res.get(p))) : ['  none']), ''];
  fs.writeFileSync(REVIEW, [
    `Library batch v404 (approved by Simon 2026-11-19): tools/gen/batch404.mjs on v403. Changes and the export comparison: tools/gen/batch404-changes.txt.`,
    `Part 1: the kin pairs decided kin in the v400 pass (kin400/decisions-*.txt + overrides.txt) still not kin on v403: ${open.length} (v400 left 558 as too big;`,
    `ids merged at v403 resolve to their root). Order: both words in the family export first (FF), then one, then none; chunk order inside.`,
    `Rule (DESIGN-entries.md 3.7, Group size): kin when the clash group stays <= ${CLASH_SOFT}; 9-${CLASH_MAX} when the pair's themes are big (K or KD, not K?, and every playable theme of`,
    `each word has at least ${BIG} members, the lower quartile); over ${CLASH_MAX} left unlinked. Sizes as clash-big counts.`,
    `Code first column: K kin, K? kin (judgement: one written word in another sense), KD kin and one word (not merged at v403).`, '',
    ...sec(`Linked, group <= ${CLASH_SOFT}`, R.linked), ...sec(`Linked, group 9-${CLASH_MAX} (big themes)`, R.large), ...sec('Linked, in one clash group already', R.joined),
    ...sec(`Left unlinked: group over ${CLASH_MAX}`, R.tooBig), ...sec(`Left unlinked: group 9-${CLASH_MAX} but a theme under ${BIG} members`, R.small), ...sec(`Left unlinked: group 9-${CLASH_MAX}, a judgement call (K?, another sense): not a sure look-alike`, R.q),
    `== Clash groups after (full library, as the check counts) ==`, `clash-big (> ${CLASH_MAX}, warn): ${bigs.length}`, ...bigs.map(x => '  ' + x), `clash-large (9-${CLASH_MAX}, info): ${large.length}`, ...large.map(x => '  ' + x), '',
    `== Part 2: T10 ==`, ...t10.map(x => '  ' + x), '', `== Part 3: T16 (verdict and change per item) ==`, ...t16.map(x => '  ' + x), '',
    `== Part 4: places that are also words ==`, ...t4.map(x => '  ' + x), '', `== Field changes ==`, ...notes.map(x => '  ' + x), ''].join('\n'));
}
if (CHANGES) fs.writeFileSync(CHANGES, summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
