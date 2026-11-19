// Library batch v403 (approved by Simon 2026-11-19; ISSUES.md I23): one word in one sense stored as two roots (apple/apples) becomes one entry
// with a `form` alias (DESIGN-entries.md 3.7 rule A). Input: the 380 dup? pairs of the v400 kin pass (tools/gen/kin400/dups.txt) and the 115 dup?
// lines of the v399 pilot (tools/gen/batch399-review.txt); 495 pairs in 462 clusters (some chain: washer/washers, hieroglyph/hieroglyphs ...).
// For each pair (in input order; ids that were merged above resolve to their root):
//   skip   different senses or not a grammatical form (SKIP_PAIR, reason given); one entry of a cluster that has the same text as the root or
//          the alias (SAME_TEXT: a second entry of that word, often in another sense, which a form alias cannot express); adult/vulgar differ
//          (the merge would move a word into or out of the family export); both entries have aliases of their own. Kin stays as it is.
//   root   the entry with clearly more links (at least twice as many and 3 more); else the better known (lower familiarity, so no link gets
//          harder); else the one with aliases of its own (nothing to re-point); else the base form (shorter text).
//   merge  the other entry becomes aliasOf root, aliasKind 'form', with the same id (no deletion: export rows keep their place). Its links go:
//          a theme the root is not in moves to the root at the alias's typicality, and the root shows the alias's text there (use = alias id,
//          which carries the form's part of speech and familiarity), or the alias's shown text (show) when it had one. A theme both were in
//          keeps the root's link (the alias's is dropped). Synonym-group places of the alias pass to the root (removed where the root is in
//          the theme already); nameOkIn joins the root's; kin moves to the root (moveKin); tm and sensitive: the stricter on both; the alias's
//          own aliases are re-pointed to the root. Both entries get status "rev" (DESIGN.md, status), as do both entries of a pair skipped
//          for its sense (checked and confirmed as two entries).
// Also (Simon, 2026-11-19): prisoner 33709 and jailer 64106 join law_and_order's group [prison, jail] (rule B: one family in one theme only
// inside one group), with kin prison/prisoner and jail/jailer; the two v402 allow keys go from js/family-allow.js (--apply writes the file).
// Changes nothing when already done, so it can be rerun as a check.
// Run: node tools/gen/batch403.mjs [--apply | --out <path>] [--lib <path>] [--review <path>] [--changes <path>]
//   (no option) dry run; --apply writes the library (and js/family-allow.js); --out writes the changed library to <path> (testing);
//   --lib <path> reads that copy; --review <path> writes the one-line-per-pair list; --changes <path> writes the export comparison part.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, moveKin, setKin, linkIds, themeLocked } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_MAX } from '../../js/family.js';
import { FAMILY_OK } from '../../js/family-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/family-allow.js', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; };
const lab = e => `${e.text} ${e.id}`;
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}

// ---------- the input pairs ----------
const PAIRS = [], seenKey = new Set();
const add = (a, b, src, line) => { const k = Math.min(a, b) + '|' + Math.max(a, b); if (seenKey.has(k)) return; seenKey.add(k); PAIRS.push({ a, b, src, line, k }); };
for (const l of fs.readFileSync(new URL('./kin400/dups.txt', import.meta.url), 'utf8').split(/\r?\n/)) { if (!l.trim() || l.startsWith('#')) continue; const c = l.split('\t'); add(+c[0], +c[1], 'v400', `${c[2]} / ${c[3]}`); }
for (const l of fs.readFileSync(new URL('./batch399-review.txt', import.meta.url), 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*\S?\s*(.+?) \((\d+) \/ (\d+);.*dup\?/); if (m) add(+m[2], +m[3], 'v399', m[1]); }

// Entries left out of a cluster: same text as the entry that stays (a second entry of the word; a form alias cannot have the root's text).
const SAME_TEXT = {
  15447: 'matches [smoking] beside matches [fire] 3066', 25482: 'pot [container] beside pot [cookware] 19810', 25788: 'pot [cooking pot] beside pot [cookware] 19810',
  461: 'lamb [meat] beside lamb [animal] 25044 (lambs in signs of spring is the animal)', 64163: 'picnic [outdoor] beside picnic [meal] 55758',
  31841: 'ash [volcanic] (another sense) beside ash [residue] 39899 (ashes in fireplace words is the residue)', 45868: 'sneakers [collecting] beside sneakers [shoes] 24620',
  47854: 'brakes [bicycle] beside brakes [vehicle] 40316, made a form of brake', 47326: 'toilet [plane] beside toilet [bathroom] 23134',
  39869: 'marble [glass ball] beside marble [toy] 39777, made a form of marbles', 49966: 'scales [lab] beside scales [weighing] 38223, made a form of scale',
  7390: 'bolt [hardware] beside bolt [fastener] 23703', 8836: 'scale [fish] beside scale [animal] 10351', 20206: 'pistachio [flavor] (another sense) beside pistachio [nut] 17353',
  60681: 'stairs [skate park] beside stairs [house] 24068', 43298: 'bubble [swimming] beside bubble [air bubble] 39566', 64062: 'bubbles [foaming soap] beside bubbles [foam] 24005, made a form of bubble',
  49868: 'cable [bridge] beside cable [wire] 28704', 53385: 'gyro [kebab] beside gyro [food] 19019', 3222: 'flank [body part] (human) beside flank [animal part] 9593',
  49766: 'fuse [electrical] beside fuse [electric] 40676', 23783: 'washer [tap] beside washer [fastener] 23705', 40232: 'washer [hardware] beside washer [fastener] 23705',
  48141: 'washers [skateboard] beside washers [hardware] 61446, made a form of washer', 63301: 'pepita [pumpkin kernel] beside pepita [pumpkin seed] 17386',
  48550: 'eggs [camping] beside eggs [food] 16678', 3817: 'sponge [bath] beside sponge [cleaning] 23835 (sponges under the sink is the cleaning one)',
  46608: 'battery [car] (a car battery) beside battery [component] 49768', 52270: 'battery [camera] beside battery [component] 49768',
};
// Pairs that are not one word in one sense (or not a grammatical form): kin stays.
const SKIP_PAIR = {
  '10411|39098': 'spike also carries the volleyball hit (volleyball terms); spikes [animal] is the quill sense',
  '28308|45864': 'antique is the adjective (words for old), antiques the noun (collectibles)',
  '6647|53954': 'hieroglyphic is the adjective', '6648|53954': 'hieroglyphic is the adjective; hieroglyphics is the noun',
  '6648|53953': 'hieroglyphics is a derived word, not a grammatical form of hieroglyph (grouped with hieroglyphs since v398)',
  '5732|45535': 'dominoes is the game (table games, pub games), a domino one tile (game pieces)',
  '5273|61695': 'quoits is the game, a quoit the ring (sports equipment)',
  '5020|64301': 'knitting needles are another tool than a sewing needle',
  '27395|39459': 'bonnie/bonny is a spelling pair (would be a spelling alias, not a form)',
  '14843|39131': 'nubbly/nubby: two variant words, not a grammatical form',
  '42999|44361': 'tiebreak/tiebreaker: two variant words, not a grammatical form',
  '12858|13849': 'animatronics is the technique (special effects), an animatronic the figure (theme parks, robots)',
  '25073|37975': 'party streamers vs a streamer flag (pennant, flag words)',
  '25012|25674': 'ornaments are Christmas baubles (alias baubles); ornament is a decorative object (home decor)',
  '25219|55649': 'name tag in gift wrapping is the gift tag (grouped with it); name tags at parties are badges',
  '430|25087': 'yams at Thanksgiving are the US name for sweet potatoes (grouped with sweet potato); yam the root vegetable',
  '1873|32147': 'a garden terrace (patio) vs farming terraces in the Andes (Inca engineering)',
};
const keyOf = (a, b) => Math.min(a, b) + '|' + Math.max(a, b);
for (const k of Object.keys(SKIP_PAIR)) if (!seenKey.has(k)) throw Error('skip for no pair: ' + k);
for (const id of Object.keys(SAME_TEXT)) if (!PAIRS.some(p => p.a === +id || p.b === +id)) throw Error('same-text id in no pair: ' + id);

const [before, mBefore] = count(), x0 = exp();
let n = 0; const review = [], tally = {}, T = k => { tally[k] = (tally[k] || 0) + 1; };
let aliasNok = 0, linksMoved = 0, linksDropped = 0, usesSet = 0, showsSet = 0, groupMoves = 0, repointed = 0, revSet = 0;
const shownChanges = [], flagNotes = [], regionNotes = [], famNotes = [];
const resolve = id => { const e = E(id); return e.aliasOf ? E(e.aliasOf) : e; };
const nLinks = e => Object.keys(e.typ).length;
const groupOf = (t, id) => (t.groups || []).find(g => g.includes(id));
const rev = e => { if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } };
const revAll = new Set();

function chooseRoot(A, B) {
  const la = nLinks(A), lb = nLinks(B);
  if (la >= 2 * lb && la - lb >= 3) return [A, B, `more links (${la} vs ${lb})`];
  if (lb >= 2 * la && lb - la >= 3) return [B, A, `more links (${lb} vs ${la})`];
  if (A.fam && B.fam && A.fam !== B.fam) return A.fam < B.fam ? [A, B, `better known (familiarity ${A.fam} vs ${B.fam})`] : [B, A, `better known (familiarity ${B.fam} vs ${A.fam})`];
  const ha = (P.ix.aliases.get(A.id) || []).length, hb = (P.ix.aliases.get(B.id) || []).length;
  if (ha && !hb) return [A, B, 'has aliases of its own'];
  if (hb && !ha) return [B, A, 'has aliases of its own'];
  if (A.text.length !== B.text.length) return A.text.length < B.text.length ? [A, B, 'base form'] : [B, A, 'base form'];
  return A.id < B.id ? [A, B, 'base form'] : [B, A, 'base form'];
}

function merge(R, X) {
  const did = [];
  const rThemes = new Set(Object.keys(R.typ));
  for (const [tid, v] of Object.entries(X.typ)) {
    const t = P.ix.theme.get(tid);
    if (rThemes.has(tid)) {
      linksDropped++; did.push(`${tid}: both linked, root's link kept (typicality ${R.typ[tid]}; the alias's ${v} dropped${X.show?.[tid] ? `, its shown "${X.show[tid]}"` : ''})`);
      shownChanges.push(`${tid}: "${X.show?.[tid] || X.text}" (${X.id}) no longer a separate answer; "${R.show?.[tid] || (R.use?.[tid] ? E(R.use[tid]).text : R.text)}" (${R.id}) stays`);
    } else {
      R.typ[tid] = v; linksMoved++;
      if (X.show?.[tid]) { R.show ||= {}; R.show[tid] = X.show[tid]; showsSet++; did.push(`${tid}: link moved (typicality ${v}), shown "${X.show[tid]}"`); if ((R.fam || 0) !== (X.fam || 0)) famNotes.push(`${tid}: "${X.show[tid]}" now rated at the root's familiarity ${R.fam} (was ${X.fam})`); }
      else if (X.text !== R.text) { R.use ||= {}; R.use[tid] = X.id; usesSet++; did.push(`${tid}: link moved (typicality ${v}), use ${X.text}`); if ((R.fam || 0) > (X.fam || 0)) famNotes.push(`${tid}: "${X.text}" difficulty from familiarity max(${R.fam}, ${X.fam}) (was ${X.fam})`); }
    }
  }
  // synonym groups: the alias's places pass to the root (dropped where the root has a place in that theme)
  for (const t of P.themes) {
    if (!t.groups) continue;
    const gs = [];
    for (const g of t.groups) {
      if (!g.includes(X.id)) { gs.push(g); continue; }
      const rg = groupOf(t, R.id); let ng;
      if (rg && rg !== g) ng = g.filter(id => id !== X.id);
      else ng = [...new Set(g.map(id => id === X.id ? R.id : id))];
      groupMoves++; did.push(`${t.id} group (${g.map(id => E(id).text).join(', ')}) -> ${ng.length > 1 ? '(' + ng.map(id => E(id).text).join(', ') + ')' : 'gone'}`);
      if (ng.length > 1) gs.push(ng);
    }
    t.groups = gs; if (!gs.length) delete t.groups;
  }
  R.nameOkIn = [...new Set([...(R.nameOkIn || []), ...(X.nameOkIn || [])])];
  for (const k of ['tm', 'sensitive']) if (R[k] !== X[k]) { flagNotes.push(`${k}: ${lab(R)} ${R[k]} / ${lab(X)} ${X[k]} -> both true`); R[k] = X[k] = true; }
  if (JSON.stringify(R.region) !== JSON.stringify(X.region)) regionNotes.push(`${lab(R)} [${R.region}] root, ${lab(X)} [${X.region}] alias (kept on each)`);
  moveKin(P, X, R);
  for (const a of P.ix.aliases.get(X.id) || []) { a.aliasOf = R.id; repointed++; did.push(`alias ${a.text} (${a.aliasKind}) re-pointed to the root`); }
  for (const e of P.entries) if (e.use) for (const [tid, id] of Object.entries(e.use)) if (id === X.id && e !== R) throw Error(`${lab(e)} uses ${X.id}`);
  Object.assign(X, { typ: {}, show: {}, use: {}, kin: [], aliasOf: R.id, aliasKind: 'form' });
  reindex(P);
  // the alias sits in the root's themes under its own text: where that text holds a word of the theme name, it is the real name there too
  // (as the root's), so the alias carries the name allowance (as existing form aliases do: egg sandwich in eggs)
  const gained = Object.keys(R.typ).filter(tid => !rThemes.has(tid));
  for (const a of P.ix.aliases.get(R.id) || []) {
    const ts = a === X ? linkIds(P, X) : gained, nok = new Set(a.nameOkIn || []);
    for (const tid of ts) { const t = P.ix.theme.get(tid); if (t && !themeLocked(P, t) && nameLeak(t, a)) nok.add(tid); }
    const add = [...nok].filter(x => !(a.nameOkIn || []).includes(x)); if (add.length) { aliasNok += add.length; did.push(`name allowance for alias ${a.text} in ${add.join(', ')}`); }
    a.nameOkIn = [...nok];
  }
  return did;
}

for (const p of PAIRS) {
  const A0 = E(p.a), B0 = E(p.b), head = `${A0.text} / ${B0.text} (${p.a} / ${p.b}; ${p.src})`;
  const st = [p.a, p.b].find(id => SAME_TEXT[id]);
  if (SKIP_PAIR[p.k]) { review.push(`skip   ${head}: ${SKIP_PAIR[p.k]}`); T('skipped: other sense or not a form'); for (const e of [A0, B0]) if (!e.aliasOf) revAll.add(e); continue; }
  if (st) { review.push(`skip   ${head}: same text: ${SAME_TEXT[st]}`); T('skipped: same text as the root or alias'); continue; }
  const A = resolve(p.a), B = resolve(p.b);
  if (A === B) { const x = A0.aliasOf ? A0 : B0; review.push(`done   ${head}: ${x.text} is a form alias of ${lab(A)}`); T('merged'); continue; }
  if (A.text.toLowerCase() === B.text.toLowerCase()) { review.push(`skip   ${head}: same text`); T('skipped: same text as the root or alias'); continue; }
  if (A.adult !== B.adult || A.vulgar !== B.vulgar) { review.push(`skip   ${head}: flags differ (${A.adult !== B.adult ? 'adult' : 'vulgar'} on one only): a merge would move a word into or out of the family export`); T('skipped: adult/vulgar differ'); continue; }
  if ((P.ix.aliases.get(A.id) || []).length && (P.ix.aliases.get(B.id) || []).length) { review.push(`skip   ${head}: both have aliases of their own (${[A, B].map(e => (P.ix.aliases.get(e.id) || []).map(a => a.text).join('/')).join(' ; ')}): left for a hand merge`); T('skipped: both have aliases'); continue; }
  const [R, X, why] = chooseRoot(A, B);
  const fam = [R, X, ...(P.ix.aliases.get(R.id) || []), ...(P.ix.aliases.get(X.id) || [])].map(e => e.text.trim().toLowerCase());
  const own = [...Object.keys(R.typ), ...Object.keys(X.typ)].map(tid => P.ix.theme.get(tid)).find(t => t && fam.includes(t.name.trim().toLowerCase()));
  if (own) { review.push(`skip   ${head}: "${own.name}" is a theme of the pair; merged, its family would sit in that theme under the theme's own name (is-theme-name); left as two entries`); T('skipped: the form is the theme name'); for (const e of [A, B]) revAll.add(e); continue; }
  const did = merge(R, X); n++;
  rev(R); rev(X);
  review.push(`merge  ${head}: ${lab(X)} -> root ${lab(R)} (${why}); ${did.join('; ') || 'no links of its own'}`); T('merged');
}
for (const e of revAll) rev(e);

// ---------- prison/prisoner, jail/jailer in law_and_order (Simon) ----------
{
  const t = P.ix.theme.get('law_and_order'), pr = E(2485), pri = E(33709), jl = E(2486), jlr = E(64106);
  if (pr.text !== 'prison' || pri.text !== 'prisoner' || jl.text !== 'jail' || jlr.text !== 'jailer') throw Error('prison entries changed');
  const g = groupOf(t, 2485); if (!g || !g.includes(2486)) throw Error('law_and_order: no group [prison, jail]');
  for (const id of [33709, 64106]) if (!g.includes(id)) { g.push(id); n++; review.push(`extra  law_and_order: ${E(id).text} ${id} joins the group (prison, jail) (Simon: group them, accepting a clash group of about 10)`); }
  for (const [a, b] of [[pr, pri], [jl, jlr]]) if (!(a.kin || []).includes(b.id)) { setKin(P, a, b, true); n++; review.push(`extra  kin ${lab(a)} / ${lab(b)}`); }
  for (const e of [pr, pri, jl, jlr]) rev(e);
  reindex(P);
}
const ALLOW_DROP = ['2485|33709|law_and_order', '2486|64106|law_and_order'];
const allowText = fs.readFileSync(ALLOW, 'utf8'), allowGone = ALLOW_DROP.filter(k => allowText.includes(`'${k}'`) || FAMILY_OK.has(k));
for (const k of allowGone) FAMILY_OK.delete(k);

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');

// export comparison (in memory: before = the committed v402 file when baseOk)
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')).entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(C.text, x0.text) && same(C.links, x0.links) && same(C.clash, x0.clash);
const cmp = [];
cmp.push(`Committed family export equals the in-memory export of v402 before the changes: ${baseOk ? 'yes' : 'NO'}`);
const rowShift = x0.ids.length === x1.ids.length && x0.ids.every((id, i) => id === x1.ids[i]) ? 0 : 'rows differ';
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; rows whose index changed: ${rowShift}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => lab(E(id))).join(', ') || 'none'}`);
const becameAlias = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] && !x0.root[ia.get(id)]);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]);
const famCh = x1.ids.filter((id, i) => ia.has(id) && x1.fam[i] !== x0.fam[ia.get(id)]);
cmp.push(`Rows that became form aliases (root column set, form flag 32): ${becameAlias.length}; rows whose flags changed: ${flagCh.length} (${flagCh.filter(id => !becameAlias.includes(id)).map(id => lab(E(id))).join(', ') || 'only the new aliases'}); familiarity column changed: ${famCh.length}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let p = 0; for (const c of x.linkCount) { s.push(p); p += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.linkCount.filter((c, i) => c !== x0.linkCount[i]).length}`);
const ranges = []; let cur = null;
x1.ids.forEach((id, i) => { const d = s1[i] - s0[i]; if (!cur || cur.d !== d) { cur = { from: i, to: i, d }; ranges.push(cur); } else cur.to = i; });
const moved = ranges.filter(r => r.d);
cmp.push(`Link-index shifts (first link of a row, links[4n..]): ${moved.length ? `${moved.reduce((s, r) => s + r.to - r.from + 1, 0)} rows shift, in ${moved.length} ranges; first change at row ${moved[0].from}; ranges (rows: shift) ${moved.slice(0, 12).map(r => `${r.from}-${r.to}: ${r.d > 0 ? '+' : ''}${r.d}`).join(', ')}${moved.length > 12 ? ', ...; last ' + `${moved.at(-1).from}-${moved.at(-1).to}: ${moved.at(-1).d > 0 ? '+' : ''}${moved.at(-1).d}` : ''}` : 'none'}`);
// what players see: per theme, the texts of the root rows (an alias row's links are its root's family, not a separate answer)
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt.toLowerCase(), `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const m0 = shownMap(x0), m1 = shownMap(x1);
const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
cmp.push(`Shown texts per theme (root rows): lost ${lost.length}, new ${gained.length}, difficulty/typicality changed ${rated.length}`);
for (const k of lost) cmp.push(`  lost: ${k.replace('\t', ': ')} (${m0.get(k)})`);
for (const k of gained) cmp.push(`  new: ${k.replace('\t', ': ')} (${m1.get(k)})`);
for (const k of rated) cmp.push(`  rating: ${k.replace('\t', ': ')} ${m0.get(k)} -> ${m1.get(k)} (difficulty/typicality)`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_MAX} after: ${[...c1.m.values()].filter(g => g.length > CLASH_MAX).map(g => `${g.length} (${g.slice(0, 12).join(', ')}${g.length > 12 ? ', ..' : ''})`).join('; ') || 'none'}`);
const big = [...mAfter].filter(x => x.includes('clash-big')).map(x => x.replace(/^warn clash-big: A clash group \(synonym groups and kin joined across themes\) has /, '').replace(/, more than 8: /, ': ').replace(/\. It can starve.*$/, ''));
const bigNew = nw.filter(x => x.includes('clash-big')).length;

const summary = [`${PAIRS.length} pairs; ${JSON.stringify(tally)}`, `library changes ${n}; form aliases made ${review.filter(l => l.startsWith('merge')).length}; links moved ${linksMoved} (use set ${usesSet}, show set ${showsSet}); alias links dropped where both were linked ${linksDropped}; group places moved ${groupMoves}; aliases re-pointed ${repointed}; name allowances given to new aliases ${aliasNok}; status set to rev ${revSet}`,
  `Allow keys removed from js/family-allow.js: ${allowGone.join(', ') || 'none (already gone)'}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`, `clash-big (full library, as the check counts) after: ${big.join(' | ')}`,
  ...cmp,
  `Flags made stricter: ${flagNotes.join('; ') || 'none'}`, `Root and alias with different regions: ${regionNotes.length}: ${regionNotes.join('; ')}`, `Familiarity notes: ${famNotes.join('; ') || 'none'}`,
  `Answers removed from a theme (both forms were linked): ${shownChanges.length}${shownChanges.length ? '\n  ' + shownChanges.join('\n  ') : ''}`];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
if (REVIEW) fs.writeFileSync(REVIEW, review.join('\n') + '\n');
if (CHANGES) fs.writeFileSync(CHANGES, summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
  if (APPLY && allowGone.length) { let t = fs.readFileSync(ALLOW, 'utf8'); for (const k of allowGone) t = t.replace(new RegExp(`^.*'${k.replace(/\|/g, '\\|')}'.*\\r?\\n`, 'm'), ''); fs.writeFileSync(ALLOW, t); console.log(`${allowGone.length} lines removed from js/family-allow.js`); }
}
