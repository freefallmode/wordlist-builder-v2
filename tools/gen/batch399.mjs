// Library batch v399 (applied 2026-11-19, Simon approved as proposed): a pilot kin pass over word-family pairs in DIFFERENT themes (I22, DESIGN-entries.md 3.7),
// plus three small in-theme items. Same-family words in two themes (joy in emotions, joyful in happy words) can land in one level in two groups and lure a wrong drop;
// kin between the two entries is exported into the shared clash id, so the game never puts them in one level. Nothing else changes for players.
//   Part 1  the sample: the family-kin suggestions of the check on v398 (7,324) where both entries are in the family export and both have familiarity 1-3,
//           ordered easier member first (min fam, then max fam, then ids); the first 500 of the 4,540 that met the filter (tools/gen/batch399-pairs.txt).
//   Part 2  one decision per pair (batch399-pairs.txt: idA idB decision textA/textB -- reason):
//             K    kin: one word family a player sees as look-alikes (joy/joyful, bake/baker), including one written word in another sense (hearts [suit] / heart [organ])
//             K?   kin, a judgement call
//             KD   kin, and the two look like one word in one sense (apple/apples): perhaps one entry with a form alias ("dup?"); not merged here
//             N    not kin: the letters only (belly/bell), or related long ago and no longer felt (army/arm); put on the allow list (js/family-allow.js, all-theme key a|b)
//             N?   not kin, a judgement call (allow-listed too)
//           Kin that would make an exported clash group (synonym groups + kin, joined; each root counted with its exported aliases, as the clash column) exceed
//           CLASH_MAX (8) is left unlinked ("too big"), worked out pair by pair in the order of the list. Kin is stored on both roots, sorted (setKin).
//   Part 3  familyOk on royal_titles and ranks_of_the_british_peerage (male/female title pairs); the six family-pair hits of the -ie/-sy endings (SIX below).
// Changes nothing when already done, so it can be rerun as a check (allow-list lines are counted apart: only --apply writes js/family-allow.js).
// Run: node tools/gen/batch399.mjs [--apply | --out <path>] [--lib <path>] [--review <path>]
//   (no option) dry run; --apply writes the library and js/family-allow.js; --out writes the changed library to <path> (testing; the allow list is applied
//   in memory only); --lib <path> reads that copy; --review <path> writes the review list for Simon.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, setKin } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT as CLASH_MAX } from '../../js/family.js';   // this batch ran with the old limit of 8
import { FAMILY_OK } from '../../js/family-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/family-allow.js', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const TH = id => { const t = P.ix.theme.get(id); if (!t) throw Error(`no theme ${id}`); return t; };
const lab = e => `${e.text} ${e.id}`, gtxt = g => '(' + g.map(id => E(id).text).join(', ') + ')';
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
// the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
function exp() {
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }); return { ids: file.entries.gloss.map(Number), text: file.entries.text, clash: file.entries.clash, links: file.entries.links, themes: file.themes.map(r => r[0]) }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const allowKey = (a, b) => a < b ? a + '|' + b : b + '|' + a;

// ---------- Part 1/2: the 500 pairs ----------
const PAIRS = fs.readFileSync(new URL('./batch399-pairs.txt', import.meta.url), 'utf8').trim().split('\n').map(l => {
  const m = l.match(/^(\d+) (\d+) (K\?|KD|K|N\?|N) (.*?)(?: -- (.*))?$/); if (!m) throw Error('bad line ' + l);
  return { a: +m[1], b: +m[2], d: m[3], w: m[4], why: m[5] || '' };
});
// ---------- Part 3 ----------
const FAMILY_OK_THEMES = ['royal_titles', 'ranks_of_the_british_peerage'];
const FAMILY_OK_SUGGEST = [   // not set: for Simon
  ['short_forms_of_names', 'collects short forms (Peg/Peggy, grouped at v398); familyOk would let such pairs stand as separate answers'],
  ['feudal_ranks', 'only marquess/marquis now (grouped: spellings); would matter if male/female ranks are added'],
];
// The grammar themes (tenses, irregular_plurals, irregular_past_tenses, past_tenses_ending_in_silent_e, i_to_a_past_tenses, archaic_pronouns_and_verb_forms)
// and anagrams_of_each_other are locked (wordplay) already, so the family-pair check skips them without familyOk.
const SIX = [   // [theme, a, b, outcome, '?', reason]
  ['outback', 32142, 32132, 'group', '', 'swag (the bedroll) joins (swagman, swaggie): the swaggie carries the swag'],
  ['nutrition', 3870, 3854, 'group', '?', 'ketosis joins (keto, ketogenic diet): keto is short for ketogenic, the diet that aims at ketosis; one gives the other away'],
  ['police_words', 33700, 61133, 'group', '', 'the officer and the force'],
  ['forces_of_europe', 33700, 61133, 'group', '', 'as in police words'],
  ['army_words', 34685, 4376, 'group', '?', 'squad joins the soldier group (soldier, trooper, squaddie, digger, GI, grunt): 7 words, within 8; or unlink squaddie (the weaker: typicality 3, fam 4)'],
  ['soccer_terms', 42666, 42673, 'group', '', 'goal joins (goalkeeper, goalie): 4 words with keeper'],
];

const [before, mBefore] = count(), x0 = exp();
const expIds = new Set(x0.ids), expThemes = new Set(x0.themes);
let n = 0; const log = [];

// clash groups as the export writes them: union-find over the exported themes' groups and kin, each root weighing 1 + its exported aliases
const par = new Map(), wt = new Map();
const add = id => { if (!par.has(id)) { par.set(id, id); wt.set(id, 1 + (P.ix.aliases.get(id) || []).filter(a => expIds.has(a.id)).length); } return id; };
const find = x => { add(x); while (par.get(x) !== x) x = par.get(x); return x; };
const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) { par.set(rb, ra); wt.set(ra, wt.get(ra) + wt.get(rb)); } };
for (const t of P.themes) if (expThemes.has(t.id)) for (const g of t.groups || []) { const m = g.filter(id => expIds.has(id)); for (const id of m.slice(1)) union(m[0], id); }
for (const e of P.entries) if (!e.aliasOf && expIds.has(e.id)) for (const k of e.kin || []) if (k > e.id && expIds.has(k)) union(e.id, k);
const size = id => wt.get(find(id));

const cnt = {}, tally = k => { cnt[k] = (cnt[k] || 0) + 1; }, rows = [], allowAdd = [];
const fileAllow = fs.readFileSync(ALLOW, 'utf8');
const ts = e => Object.keys(e.typ).slice(0, 3).join(',') + (Object.keys(e.typ).length > 3 ? ',..' : '');
const kinTally = d => { tally('kin'); if (d === 'K?') tally('  of which kin?'); if (d === 'KD') tally('  of which dup?'); };
for (const p of PAIRS) {
  const A = E(p.a), B = E(p.b);
  if (A.aliasOf || B.aliasOf) throw Error(`${lab(A)} / ${lab(B)}: an alias (kin belongs on roots)`);
  let out;
  if (p.d.startsWith('N')) {
    const k = allowKey(p.a, p.b);
    if ((A.kin || []).includes(p.b)) throw Error(`${lab(A)} / ${lab(B)} are kin already, but decided not kin`);
    if (!fileAllow.includes(`'${k}'`)) { allowAdd.push(`  '${k}', // ${A.text} / ${B.text}: not one family (v399 kin pilot)${p.why ? '; ' + p.why : ''}`); FAMILY_OK.add(k); }
    out = 'not kin'; tally('not kin (allow-listed)'); if (p.d === 'N?') tally('  of which not kin?');
  } else if ((A.kin || []).includes(p.b)) { out = 'kin (done)'; kinTally(p.d); }
  else if (find(p.a) !== find(p.b) && size(p.a) + size(p.b) > CLASH_MAX) { out = `too big: left unlinked (clash groups ${size(p.a)} + ${size(p.b)} > ${CLASH_MAX})`; tally('too big (unlinked)'); }
  else { union(p.a, p.b); setKin(P, A, B, true); n++; log.push(`kin ${lab(A)} / ${lab(B)} (clash group now ${size(p.a)})`); out = 'kin'; kinTally(p.d); }
  const q = p.d.endsWith('?') ? '?' : ' ';
  rows.push(`${q} ${A.text} / ${B.text} (${p.a} / ${p.b}; ${ts(A)} ~ ${ts(B)}): ${out}${p.d === 'KD' && out.startsWith('kin') ? ', dup?' : ''}${p.why ? ' -- ' + p.why : ''}`);
}

// ---------- Part 3 ----------
const three = [];
for (const tid of FAMILY_OK_THEMES) { const t = TH(tid); if (!t.familyOk) { t.familyOk = true; n++; log.push(`familyOk set on ${tid}`); } three.push(`  ${tid}: familyOk set`); }
for (const [tid, why] of FAMILY_OK_SUGGEST) { TH(tid); three.push(`? ${tid}: familyOk suggested, not set -- ${why}`); }
const grpOf = (t, id) => (t.groups || []).find(g => g.includes(id));
for (const [tid, a, b, , q, why] of SIX) {
  const t = TH(tid);
  for (const id of [a, b]) { const e = E(id); if (e.aliasOf || e.typ[tid] === undefined) throw Error(`${lab(e)} is not a root linked in ${tid}`); }
  const ga = grpOf(t, a), gb = grpOf(t, b); let res;
  if (ga && ga === gb) res = `in one group ${gtxt(ga)} (done)`;
  else {
    t.groups ||= [];
    if (!ga && !gb) { t.groups.push([a, b]); res = `new group ${gtxt([a, b])}`; }
    else if (ga && gb) { const was = `${gtxt(ga)} + ${gtxt(gb)}`; ga.push(...gb); t.groups.splice(t.groups.indexOf(gb), 1); res = `two groups merged ${was} -> ${gtxt(ga)}`; }
    else { const g = ga || gb, was = gtxt(g); g.push(ga ? b : a); res = `added to a group ${was} -> ${gtxt(g)}`; }
    n++; log.push(`${tid}: ${lab(E(a))} / ${lab(E(b))}: ${res}`);
  }
  three.push(`${q || ' '} ${tid}: ${E(a).text} / ${E(b).text} (${a} / ${b}): ${res} -- ${why}`);
}
reindex(P);

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const shift = x0.ids.length !== x1.ids.length ? `entry count ${x0.ids.length} -> ${x1.ids.length}` : (() => { const i = x0.ids.findIndex((x, j) => x !== x1.ids[j]); return i < 0 ? 0 : `first at index ${i}`; })();
const linkDiff = x0.links.length !== x1.links.length || x0.links.some((v, i) => v !== x1.links[i]) ? 'changed' : 0;
const clashStat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const big = [...m.values()].sort((p, q) => q.length - p.length); return { words: x.clash.filter(c => c).length, ids: m.size, big }; };
const c0 = clashStat(x0), c1 = clashStat(x1);
const bigLine = c => c.big.slice(0, 6).map(g => `${g.length} (${g.slice(0, 4).join(', ')}${g.length > 4 ? ', ..' : ''})`).join('; ');
const over = c => c.big.filter(g => g.length > CLASH_MAX).length;
const summary = [`${PAIRS.length} pairs; ${JSON.stringify(cnt)}; allow-list lines to add: ${allowAdd.length}`,
  `Export (family preset): entry index shifts ${shift || 0}; link changes ${linkDiff}; words with a clash id ${c0.words} -> ${c1.words}; clash ids ${c0.ids} -> ${c1.ids}; groups over ${CLASH_MAX}: ${over(c0)} -> ${over(c1)}`,
  `Largest clash groups before: ${bigLine(c0)}`, `Largest clash groups after:  ${bigLine(c1)}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`];
console.log(`${log.join('\n') || 'no changes'}\n\n${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);

if (REVIEW) {
  const real = PAIRS.filter(p => p.d.startsWith('K')).length;
  const head = [`Library batch v399 PROPOSAL: pilot kin pass over word-family pairs in different themes (I22), plus three in-theme items. tools/gen/batch399.mjs, on v398.`,
    `Not applied. "?" in the first column: a judgement call. Decisions: kin (one family a player sees as look-alikes, also one written word in another sense),`,
    `kin ? (judgement), dup? (kin, and the two look like one word in one sense: perhaps one entry with a form alias; not merged), not kin (allow-listed in js/family-allow.js),`,
    `too big (kin, but the exported clash group would exceed ${CLASH_MAX}: left unlinked).`, '',
    `Sample: the first ${PAIRS.length} of 4,540 family-kin suggestions (of 7,324 on v398) where both entries are in the family export and have familiarity 1-3,`,
    `easier member first. Real-kin rate in the sample: ${real} of ${PAIRS.length} (${Math.round(100 * real / PAIRS.length)}%) are one family; ${PAIRS.length - real} (${Math.round(100 * (PAIRS.length - real) / PAIRS.length)}%) are not.`, '',
    `Counts:`, ...Object.entries(cnt).map(([k, v]) => `  ${String(v).padStart(4)}  ${k}`), `  ${String(allowAdd.length).padStart(4)}  allow-list lines added`,
    `     ${FAMILY_OK_THEMES.length}  familyOk set (${FAMILY_OK_THEMES.join(', ')}); ${FAMILY_OK_SUGGEST.length} suggested (${FAMILY_OK_SUGGEST.map(x => x[0] + '?').join(', ')})`,
    `     6  family-pair hits of the -ie/-sy endings: all grouped (see Part 3)`, '',
    ...summary.slice(1), '', 'Part 3: in-theme items', ...three, '', `Part 1/2: the ${PAIRS.length} pairs (a / b (ids; up to 3 themes each): decision -- reason)`];
  fs.writeFileSync(REVIEW, head.join('\n') + '\n' + rows.join('\n') + '\n');
  console.log('review written to ' + REVIEW);
}
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written');
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
  if (APPLY && allowAdd.length) { fs.writeFileSync(ALLOW, fileAllow.replace(/\n\]\);\s*$/, '\n' + allowAdd.join('\n') + '\n]);\n')); console.log(`${allowAdd.length} lines added to js/family-allow.js`); }
}
