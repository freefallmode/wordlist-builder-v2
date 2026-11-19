// Library batch v400 (approved by Simon 2026-11-19, not yet applied; plus the v399 pilot -s/-ing/-ed pairs under the same rule): the kin pass over all family-kin suggestions left on v399 (I22, DESIGN-entries.md 3.7).
// Same-family words in two themes (joy in emotions, joyful in happy words) can land in one level in two groups and lure a wrong drop;
// kin between the two entries is exported into the shared clash id, so the game never puts them in one level. Nothing else changes for players.
//   Input   the 6,823 family-kin suggestions of validate() on v399, in 14 chunks (tools/gen/kin400/chunk-NN.tsv, made by kin400/make-chunks.mjs),
//           one decision per line by 14 reviewers (kin400/decisions-NN.txt, brief kin400/BRIEF.md): idA idB CODE textA/textB -- reason, CODE as v399:
//             K kin; K? kin, a judgement call; KD kin, and one word in one sense stored twice (I23 merge list: kin400/dups.txt);
//             N not kin; N? not kin, a judgement call.
//           kin400/overrides.txt replaces some decisions (same line format, same idA idB): the consistency pass, one rule for all chunks
//           (the same written word in another sense, or a plain -s/-es/-ing/-ed form of it, is kin; a word derived from one sense, paired with the
//           base in an unrelated sense, is not).
//   Kin     set on both roots (setKin, sorted). Order: pairs with both entries in the family export first, then one, then none; chunk order inside
//           (chunks are sorted easier member first). Kin that would make a clash group pass CLASH_MAX (8) is left unlinked ("too big"). The size is
//           counted as the clash-big check (and the full export) counts it: synonym groups of the playable themes + kin, enabled entries, each root
//           with its enabled aliases. This bounds the family export's groups too (a subset).
//   Not kin the all-theme allow key smallerId|largerId goes into js/family-allow.js (only --apply writes the file; otherwise in memory).
//   Skipped pairs whose entries changed since chunking (missing, now an alias, disabled, already kin, already allow-listed), with a note.
// Changes nothing when already done, so it can be rerun as a check (allow-list lines are counted apart: only --apply writes js/family-allow.js).
// Run: node tools/gen/batch400.mjs [--apply | --out <path>] [--lib <path>] [--review <path>] [--dups <path>]
//   (no option) dry run; --apply writes the library and js/family-allow.js; --out writes the changed library to <path> (testing; the allow list is
//   applied in memory only); --lib <path> reads that copy; --review <path> writes the review list for Simon; --dups <path> writes the KD list (I23).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, setKin, eff } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT as CLASH_MAX } from '../../js/family.js';   // this batch ran with the old limit of 8
import { FAMILY_OK } from '../../js/family-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/family-allow.js', import.meta.url);
const DIR = new URL('./kin400/', import.meta.url), COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), DUPS = arg('--dups');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = P.ix, lab = e => `${e.text} ${e.id}`;
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
// the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
function exp() {
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }); return { ids: file.entries.gloss.map(Number), text: file.entries.text, clash: file.entries.clash, links: file.entries.links, themes: file.themes.map(r => r[0]) }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const allowKey = (a, b) => a < b ? a + '|' + b : b + '|' + a;

// ---------- the decisions ----------
const parse = (l, src) => { const m = l.match(/^(\d+) (\d+) (K\?|KD|K|N\?|N) (.*?)(?: -- (.*))?$/); if (!m) throw Error(`bad line in ${src}: ${l}`); return { a: +m[1], b: +m[2], d: m[3], w: m[4], why: m[5] || '' }; };
const lines = f => fs.readFileSync(new URL(f, DIR), 'utf8').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
const OV = new Map(lines('overrides.txt').map(l => { const p = parse(l, 'overrides.txt'); return [p.a + '|' + p.b, p]; }));
const PAIRS = [], usedOv = new Set();
for (let n = 1; n <= 14; n++) {
  const nn = String(n).padStart(2, '0'), ch = lines(`chunk-${nn}.tsv`).map(l => l.split('\t')), de = lines(`decisions-${nn}.txt`);
  if (ch.length !== de.length) throw Error(`chunk ${nn}: ${ch.length} suggestions, ${de.length} decisions`);
  de.forEach((l, i) => {
    let p = parse(l, `decisions-${nn}.txt`); const c = ch[i];
    if (+c[0] !== p.a || +c[1] !== p.b) throw Error(`chunk ${nn} line ${i + 1}: ids differ from the chunk`);
    const o = OV.get(p.a + '|' + p.b); p.orig = p.d;
    if (o) { usedOv.add(p.a + '|' + p.b); p = { ...p, d: o.d, why: o.why, ov: true }; }
    PAIRS.push({ ...p, ch: nn, ln: i + 1, ta: c[2], tb: c[3], F: c[12] || '--' });
  });
}
for (const k of OV.keys()) if (!usedOv.has(k)) throw Error('override for a pair in no chunk: ' + k);
// The v399 pilot under the same rule (Simon, 2026-11-19): its not-kin pairs where one text is a plain -s/-ing/-ed form of the other's written word
// become kin; their all-theme keys leave js/family-allow.js (in memory unless --apply). Found by a script over tools/gen/batch399-pairs.txt and
// checked by hand (excluded as letters only: star/staring, scar/scared, car/caring, hiss/his; ear/earring is a compound).
const PILOT = [
  [2585, 62393, 'tire/tired', 'tired is the -ed form of the written word tire (another sense: tire the wheel)'],
  [3601, 39524, 'training/train', 'training is the -ing form of the written word train (another sense: train the vehicle)'],
  [5250, 20138, 'bowling/bowl', 'bowling is the -ing form of the written word bowl (another sense: bowl the dish)'],
  [5293, 28786, 'rowing/row', 'rowing is the -ing form of the written word row (another sense: row the argument)'],
  [5395, 25473, 'boxing/box', 'boxing is the -ing form of the written word box (another sense: box the container)'],
  [14274, 25256, 'bangs/bang', 'bangs is the -s form of the written word bang (another sense: bangs the hair)'],
];
PILOT.forEach(([a, b, w, why], i) => { const [ta, tb] = w.split('/'); PAIRS.push({ a, b, d: 'K?', orig: 'N', w, why: 'v399 pilot under the v400 rule: ' + why, ch: 'v399', ln: i + 1, ta, tb, F: '--', pilot: true }); });

const [before, mBefore] = count(), x0 = exp();
{ const inExp = new Set(x0.ids); for (const p of PAIRS) if (p.pilot) { p.F = (inExp.has(p.a) ? 'F' : '-') + (inExp.has(p.b) ? 'F' : '-'); FAMILY_OK.delete(allowKey(p.a, p.b)); } }
// clash groups as the clash-big check counts them: union-find over the playable themes' groups and kin, enabled entries, each root weighing 1 + its enabled aliases
const playable = P.themes.filter(t => !t.group && eff(P, t.id).enabled), keep = id => !!ix.entry.get(id)?.enabled;
const par = new Map(), wt = new Map();
const add = id => { if (!par.has(id)) { par.set(id, id); wt.set(id, 1 + (ix.aliases.get(id) || []).filter(a => a.enabled).length); } return id; };
const find = x => { add(x); while (par.get(x) !== x) x = par.get(x); return x; };
const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) { par.set(rb, ra); wt.set(ra, wt.get(ra) + wt.get(rb)); } };
for (const t of playable) for (const g of t.groups || []) { const m = g.filter(keep); for (const id of m.slice(1)) union(m[0], id); }
for (const e of P.entries) if (!e.aliasOf && keep(e.id)) for (const k of e.kin || []) if (k > e.id && keep(k)) union(e.id, k);
const size = id => wt.get(find(id));

const cnt = {}, tally = k => { cnt[k] = (cnt[k] || 0) + 1; }, allowAdd = [], log = [], res = new Map(), tooBig = [], skipped = [];
const fileAllow0 = fs.readFileSync(ALLOW, 'utf8'), allowDrop = [];
const fileAllow = fileAllow0.split('\n').filter(l => { const m = l.match(/^\s*'(\d+)\|(\d+)',/); const hit = m && PAIRS.some(p => p.pilot && allowKey(p.a, p.b) === m[1] + '|' + m[2]); if (hit) allowDrop.push(l.trim()); return !hit; }).join('\n');
let n = 0;
const tier = p => 2 - (p.F.match(/F/g) || []).length;   // both in the family export first
const order = PAIRS.map((p, i) => [p, i]).sort((x, y) => tier(x[0]) - tier(y[0]) || x[1] - y[1]).map(x => x[0]);
for (const p of order) {
  const A = ix.entry.get(p.a), B = ix.entry.get(p.b);
  const kinDone = A && B && (A.kin || []).includes(p.b);
  const why = !A || !B ? `entry ${!A ? p.a : p.b} missing` : A.aliasOf || B.aliasOf ? `${lab(A.aliasOf ? A : B)} is now an alias` : !A.enabled || !B.enabled ? `${lab(!A.enabled ? A : B)} is disabled`
    : A.text !== p.ta || B.text !== p.tb ? `text changed (${p.ta}/${p.tb} -> ${A.text}/${B.text})` : '';
  if (why) { res.set(p, `skipped: ${why}`); skipped.push(p); tally('skipped'); continue; }
  if (p.d.startsWith('N')) {
    const k = allowKey(p.a, p.b);
    if (kinDone) { res.set(p, 'skipped: kin already, but decided not kin'); skipped.push(p); tally('skipped'); continue; }
    if (fileAllow.includes(`'${k}'`) || FAMILY_OK.has(k)) { res.set(p, 'not kin (allow-listed already)'); tally('not kin (allow-listed)'); continue; }
    allowAdd.push(`  '${k}', // ${A.text} / ${B.text}: not one family (v400 kin pass)${p.why ? '; ' + p.why.replace(/\s+/g, ' ') : ''}`); FAMILY_OK.add(k);
    res.set(p, 'not kin'); tally('not kin (allow-listed)'); if (p.d === 'N?') tally('  of which not kin?');
  } else if (kinDone) { res.set(p, 'kin (done)'); tally('kin'); if (p.d === 'K?') tally('  of which kin?'); if (p.d === 'KD') tally('  of which dup?'); }
  else if (find(p.a) !== find(p.b) && size(p.a) + size(p.b) > CLASH_MAX) { res.set(p, `too big: left unlinked (clash groups ${size(p.a)} + ${size(p.b)} > ${CLASH_MAX})`); tooBig.push(p); tally('too big (unlinked)'); }
  else { union(p.a, p.b); setKin(P, A, B, true); n++; log.push(`kin ${lab(A)} / ${lab(B)} (clash group now ${size(p.a)})`); res.set(p, 'kin'); tally('kin'); if (p.d === 'K?') tally('  of which kin?'); if (p.d === 'KD') tally('  of which dup?'); }
}
// a too-big pair whose two words ended up in one clash group through other kin costs nothing: link it (so a rerun finds nothing to do)
for (const p of tooBig.splice(0)) {
  if (find(p.a) !== find(p.b)) { tooBig.push(p); continue; }
  const A = ix.entry.get(p.a), B = ix.entry.get(p.b); setKin(P, A, B, true); n++; log.push(`kin ${lab(A)} / ${lab(B)} (in one clash group by now)`);
  res.set(p, 'kin (in one clash group by now)'); cnt['too big (unlinked)']--; tally('kin'); if (p.d === 'K?') tally('  of which kin?'); if (p.d === 'KD') tally('  of which dup?');
}
reindex(P);

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
// against the committed family export (data/export/wordlist-game-family.json, built from the library this script reads when that is v399)
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), ce = C.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const shiftVs = x => !same(ce.text, x.text) ? (ce.text.length !== x.text.length ? `entry count ${ce.text.length} -> ${x.text.length}` : `first at index ${ce.text.findIndex((t, i) => t !== x.text[i])}`) : 0;
const linksVs = x => same(ce.links, x.links) ? 'identical' : 'CHANGED';
const clashStat = (clash, text) => { const m = new Map(); clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(text[i]); } }); const big = [...m.values()].sort((p, q) => q.length - p.length); const dist = {}; for (const g of big) dist[g.length] = (dist[g.length] || 0) + 1; return { words: clash.filter(c => c).length, ids: m.size, big, dist }; };
const cC = clashStat(ce.clash, ce.text), c0 = clashStat(x0.clash, x0.text), c1 = clashStat(x1.clash, x1.text);
const bigLine = c => c.big.slice(0, 8).map(g => `${g.length} (${g.slice(0, 4).join(', ')}${g.length > 4 ? ', ..' : ''})`).join('; ');
const over = c => c.big.filter(g => g.length > CLASH_MAX).length;
const distLine = c => Object.entries(c.dist).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
const ovCount = PAIRS.filter(p => p.ov).length;
const summary = [
  `${PAIRS.length - PILOT.length} pairs + ${PILOT.length} v399 pilot pairs (${ovCount} decisions replaced by kin400/overrides.txt); ${JSON.stringify(cnt)}; allow-list lines to add: ${allowAdd.length}; pilot allow lines to remove: ${allowDrop.length}`,
  `Family export from this library before the batch vs the committed file: entry shifts ${shiftVs(x0)}, links ${linksVs(x0)}, clash ${same(ce.clash, x0.clash) ? 'identical' : 'differs'}`,
  `Family export after vs the committed file: entry index shifts ${shiftVs(x1)}; links ${linksVs(x1)}; words with a clash id ${cC.words} -> ${c1.words}; clash ids ${cC.ids} -> ${c1.ids}; groups over ${CLASH_MAX}: ${over(cC)} -> ${over(c1)}`,
  `Clash group sizes (size:count) before: ${distLine(cC)}`, `Clash group sizes (size:count) after:  ${distLine(c1)}`,
  `Largest clash groups before: ${bigLine(cC)}`, `Largest clash groups after:  ${bigLine(c1)}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`];
console.log(`${log.length > 40 ? log.slice(0, 20).join('\n') + `\n.. (${log.length - 20} more)` : log.join('\n') || 'no changes'}\n\n${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);

const ts = e => Object.keys(e.typ).slice(0, 2).join(',') + (Object.keys(e.typ).length > 2 ? ',..' : '');
const row = p => { const A = ix.entry.get(p.a), B = ix.entry.get(p.b); const r = res.get(p);
  return `${p.d.endsWith('?') ? '?' : ' '} ${p.ta} / ${p.tb} (${p.a} / ${p.b}; ${A ? ts(A) : '-'} ~ ${B ? ts(B) : '-'}; ${p.ch}:${p.ln}): ${r}${p.d === 'KD' && r.startsWith('kin') ? ', dup?' : ''}${p.why ? ' -- ' + p.why : ''}`; };
if (REVIEW) {
  const V = PAIRS.filter(p => !p.pilot), K = V.filter(p => p.d.startsWith('K')).length, pc = x => Math.round(100 * x / V.length);
  const codes = {}, codes0 = {}; for (const p of V) { codes[p.d] = (codes[p.d] || 0) + 1; codes0[p.orig] = (codes0[p.orig] || 0) + 1; }
  const cs = o => ['K', 'K?', 'KD', 'N', 'N?'].map(k => `${k} ${o[k] || 0}`).join(', ');
  const ovs = PAIRS.filter(p => p.ov), chg = {}; for (const p of ovs) chg[`${p.orig} -> ${p.d}`] = (chg[`${p.orig} -> ${p.d}`] || 0) + 1;
  const tb = new Map(); for (const p of tooBig) { const k = `${p.ta}/${p.tb}`; tb.set(k, (tb.get(k) || 0) + 1); }
  const head = [
    `Library batch v400 (APPROVED by Simon 2026-11-19, NOT YET APPLIED: --apply was blocked by a permission check; with one addition: the v399 pilot's -s/-ing/-ed pairs follow the same rule): the kin pass over all family-kin`,
    `suggestions left on v399 (I22). tools/gen/batch400.mjs, on v399. Changes: tools/gen/batch400-changes.txt.`,
    `Decisions as v399: kin (one family a player sees as look-alikes, also one written word in another sense), kin ? (judgement), dup? (kin, and one word`,
    `in one sense stored twice: kin now, merge later (I23, list tools/gen/kin400/dups.txt)), not kin (allow-listed in js/family-allow.js, all-theme key),`,
    `too big (kin, but a clash group would exceed ${CLASH_MAX}: left unlinked, still suggested by family-kin). "?" in the first column: a judgement call.`, '',
    `Source: the ${V.length} family-kin suggestions of validate() on v399, 14 chunks decided by 14 reviewers (tools/gen/kin400/, brief BRIEF.md, notes.md).`,
    `Codes as reviewed: ${cs(codes0)}. After the consistency pass: ${cs(codes)}.`,
    `Kin rate: ${K} of ${V.length} (${pc(K)}%) are one family; ${V.length - K} (${pc(V.length - K)}%) are not.`, '',
    `Counts (the ${V.length} pairs and the ${PILOT.length} v399 pilot pairs):`, ...Object.entries(cnt).map(([k, v]) => `  ${String(v).padStart(5)}  ${k}`), `  ${String(allowAdd.length).padStart(5)}  allow-list lines added`, `  ${String(allowDrop.length).padStart(5)}  allow-list lines removed (v399 pilot pairs now kin)`,
    `  ${String(ovs.length).padStart(5)}  decisions changed by the consistency pass (${Object.entries(chg).map(([k, v]) => `${k} ${v}`).join(', ')})`, '',
    `Order: pairs with both words in the family export first (FF), then one, then none; chunk order inside (easier member first). Too big is worked out`,
    `pair by pair in that order, counting as the clash-big check does (synonym groups of playable themes + kin, enabled entries, each root with its`,
    `enabled aliases), so the full export cannot grow a group over ${CLASH_MAX} and a rerun cannot change the outcome.`, '',
    ...summary.slice(1), '',
    `== Consistency pass (${ovs.length} decisions changed; tools/gen/kin400/overrides.txt) ==`,
    `Rule for all chunks (chunk 09's, as the pilot: gum/gums, lead/leader, bat/batter, ash/ashes; Simon: one written word in another sense is kin):`,
    `  - the same written word in another sense, or a plain -s/-es/-ing/-ed form of it, even from another sense -> kin (K?): bear/bearing, dock/docking;`,
    `  - a word DERIVED (-er, -or, -y, -ery, -ment ...) from one sense, paired with the base in an unrelated sense -> not kin (N?): porter/port,`,
    `    washer/wash, pitcher (jug)/pitch, rocker/rock (stone), scaly/scale (weighing).`,
    `  Scope: the 115 text pairs that were decided kin in some lines and not kin in others, and the families named in notes.md; each line was`,
    `  checked by its senses, and only lines against the rule (or against the same senses elsewhere) changed. set/settings, setter/set, train/trainer,`,
    `  stationer/station, bowl/bowler and the porter, washer and buff/buffer lines of chunk 12 already followed it (stationery follows stationer: kin?).`,
    `  The v399 pilot follows the same rule now (Simon): its -s/-ing/-ed not-kin pairs become kin (section "v399 pilot pairs" below).`,
    ...ovs.map(p => `  ${p.orig.padEnd(2)} -> ${p.d.padEnd(2)} ${p.ta} / ${p.tb} (${p.a} / ${p.b}; ${p.ch}:${p.ln}): ${res.get(p)} -- ${p.why.replace(/^consistency \(was [^)]*\): /, '')}`), '',
    `== v399 pilot pairs made kin under the same rule (${PILOT.length}; their all-theme allow keys removed from js/family-allow.js: ${allowDrop.length}) ==`,
    ...PAIRS.filter(p => p.pilot).map(row), '',
    `== Too big (${tooBig.length}: kin, left unlinked; ${tb.size} text pairs) ==`, ...tooBig.map(row), '',
    `== Skipped (${skipped.length}) ==`, ...(skipped.length ? skipped.map(row) : ['  none']), '',
    `== Judgement calls: kin? (${V.filter(p => p.d === 'K?').length}) ==`, ...V.filter(p => p.d === 'K?').map(row), '',
    `== Judgement calls: not kin? (${PAIRS.filter(p => p.d === 'N?').length}) ==`, ...PAIRS.filter(p => p.d === 'N?').map(row), '',
    `== Plain kin (K), dup? (KD) and not kin (N): ${PAIRS.filter(p => p.d === 'K').length} + ${PAIRS.filter(p => p.d === 'KD').length} + ${PAIRS.filter(p => p.d === 'N').length} pairs, by text pair (xN: lines; reasons in the decision files; dup? pairs with ids and glosses in tools/gen/kin400/dups.txt for I23) ==`,
  ];
  const compact = d => { const m = new Map(); for (const p of PAIRS.filter(p => p.d === d)) { const k = `${p.ta}/${p.tb}`; const r = res.get(p); const tag = r.startsWith('kin') || r.startsWith('not kin') ? '' : r.split(':')[0]; m.set(k, (m.get(k) || []).concat(tag)); }
    return [...m].map(([k, v]) => { const t = {}; for (const x of v.filter(Boolean)) t[x] = (t[x] || 0) + 1;
      return `${k}${v.length > 1 ? ' x' + v.length : ''}${Object.entries(t).map(([x, c]) => ` [${x}${v.length > 1 ? ' ' + c : ''}]`).join('')}`; }); };
  const wrap = a => { const o = []; let l = ' '; for (const w of a) { if (l.length + w.length > 150) { o.push(l); l = ' '; } l += ' ' + w + ';'; } if (l.trim()) o.push(l); return o; };
  const tail = [`K (kin):`, ...wrap(compact('K')), '', `KD (kin, dup?):`, ...wrap(compact('KD')), '', `N (not kin, allow-listed):`, ...wrap(compact('N'))];
  fs.writeFileSync(REVIEW, head.join('\n') + '\n' + tail.join('\n') + '\n');
  console.log('review written to ' + REVIEW);
}
if (DUPS) {
  const th = e => Object.keys(e.typ).join(',');
  const d = PAIRS.filter(p => p.d === 'KD').map(p => { const A = ix.entry.get(p.a), B = ix.entry.get(p.b);
    return [p.a, p.b, p.ta, p.tb, A ? A.gloss || '' : '', B ? B.gloss || '' : '', A ? th(A) : '', B ? th(B) : '', res.get(p), p.why].join('\t'); });
  fs.writeFileSync(DUPS, ['# I23 input: the dup? (KD) pairs of the v400 kin pass: two entries that look like one word in one sense (apple/apples). Kin in v400; to merge later into one entry with a form alias.',
    '# idA\tidB\ttextA\ttextB\tglossA\tglossB\tthemesA\tthemesB\tv400 outcome\treason', ...d].join('\n') + '\n');
  console.log(`${d.length} dup pairs written to ${DUPS}`);
}
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written');
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
  if (APPLY && (allowAdd.length || allowDrop.length)) { if (allowDrop.length) console.log(`${allowDrop.length} pilot lines removed from js/family-allow.js`); fs.writeFileSync(ALLOW, fileAllow.replace(/\n\]\);\s*$/, '\n' + allowAdd.join('\n') + '\n]);\n')); console.log(`${allowAdd.length} lines added to js/family-allow.js`); }
}
