// Library batch v401 (PROPOSAL, not approved, not applied): trim the clash groups that may starve the theme "salty foods" (I22, DESIGN-entries.md 3.7).
// The game measured v400 (`_WS_`, 2026-11-19): salty foods fell in Hard from 16 to 3 appearances over 2,000 levels; 30 of its 54 exported rows carry
// a clash id, 5 in 8-word groups. Clash joins synonym groups and kin across all themes (js/family.js clashGroups), so a kin pair that bridges two
// unrelated senses pulls a salty-foods word into a big group whose other words sit in many other themes; any of them in a level shuts it out.
//   Removed  13 kin pairs (LINKS below), in three chains: chips/chip (food/electronics); salt with bath salts and salty (slang "upset");
//            crackers/cracker (biscuit/firework) with crack (drug, sound) and cracking (chemistry). Kept: genuine look-alikes a player could pair
//            (salt/salty [taste], salt/salt, crackers/cracker [firework], jerky/jerk, brine/briny) and every dup? pair (olive/olives, anchovy/anchovies ...).
//   Allowed  each removed pair's all-theme key smallerId|largerId goes into js/family-allow.js ("allowed: trimmed for clash (v401)"), so family-kin
//            does not suggest it again (only --apply writes the file; otherwise in memory).
// Changes nothing when already done, so it can be rerun as a check (allow-list lines are counted apart: only --apply writes js/family-allow.js).
// Run: node tools/gen/batch401.mjs [--apply | --out <path>] [--lib <path>] [--review <path>]
//   (no option) dry run; --apply writes the library and js/family-allow.js; --out writes the changed library to <path> (testing; the allow list is
//   applied in memory only); --lib <path> reads that copy; --review <path> writes the review list for Simon.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, setKin } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT as CLASH_MAX } from '../../js/family.js';   // this batch ran with the old limit of 8
import { FAMILY_OK } from '../../js/family-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/family-allow.js', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = P.ix, lab = e => `${e.text} ${e.id}`, THEME = 'salty_foods';

// [idA, idB, textA/textB, source of the kin, chain, why removed]
const LINKS = [
  [39159, 49787, 'chips/chip', 'v400 K (01)', 'chips', 'chips (food) / chip (electronics): second sense; joins the food group (French fries, potato chips, crisps, chips) to the electronics group (chip, microchip, silicon chip, integrated circuit): 4 + 4 = 8'],
  [712, 64060, 'salt/salts', 'v400 K (03)', 'salt', 'bath salts: another sense; brings the bath_time group (salts, Epsom salts) into salt'],
  [19885, 64060, 'salt/salts', 'v400 K (04)', 'salt', 'as above (salt for preserving / bath salts)'],
  [39201, 64060, 'salty/salts', 'v400 K (05)', 'salt', 'salty (taste) / bath salts: chains taste words to bath_time'],
  [27229, 64060, 'salty/salts', 'v400 K (09)', 'salt', 'salty (slang, upset) / bath salts: two unrelated second senses'],
  [712, 27229, 'salt/salty', 'v400 K (01)', 'salt', 'salty (Gen Z slang, upset) is a second sense; brings gen_z_slang into salt'],
  [19885, 27229, 'salt/salty', 'v400 K (02)', 'salt', 'as above (salt for preserving / salty slang)'],
  [15493, 19094, 'crack/crackers', 'v400 K? (02)', 'crackers', 'crack (drug) / crackers (biscuit): judgement call, and against the v400 rule (a derived word, crackers from the crack sound, vs the base in an unrelated sense)'],
  [15493, 25248, 'crack/cracker', 'v400 K (07)', 'crackers', 'crack (drug) / cracker (firework): against the v400 rule as above; chains illegal_drugs to fireworks'],
  [19094, 40552, 'crackers/cracking', 'v400 K (05)', 'crackers', 'crackers (biscuit) / cracking (chemical reaction): against the v400 rule as above'],
  [25248, 40552, 'cracker/cracking', 'v400 K (10)', 'crackers', 'cracker (firework) / cracking (chemical reaction): against the v400 rule as above'],
  [19094, 57960, 'crackers/crack', 'v399 K?', 'crackers', 'crackers (biscuit) / crack (impact sound): judgement call; the last bridge from crackers to the crack cluster (crack, crack, cracking)'],
  [25248, 57960, 'cracker/crack', 'v400 K? (02)', 'crackers', 'cracker (firework) / crack (impact sound): judgement call; the last bridge from the firework group to the crack cluster'],
];
const allowKey = (a, b) => a < b ? a + '|' + b : b + '|' + a;
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
// the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
function exp() {
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }); return { ids: file.entries.gloss.map(Number), text: file.entries.text, clash: file.entries.clash, links: file.entries.links, linkCount: file.entries.linkCount, themes: file.themes.map(r => r[0]) }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}

const [before, mBefore] = count(), x0 = exp();
const fileAllow = fs.readFileSync(ALLOW, 'utf8'), allowAdd = [], log = [], res = new Map();
let n = 0;
for (const L of LINKS) {
  const [a, b, w, , , why] = L, A = ix.entry.get(a), B = ix.entry.get(b), [ta, tb] = w.split('/'), k = allowKey(a, b);
  const bad = !A || !B ? `entry ${!A ? a : b} missing` : A.aliasOf || B.aliasOf ? `${lab(A.aliasOf ? A : B)} is an alias` : A.text !== ta || B.text !== tb ? `text changed (${w} -> ${A.text}/${B.text})` : '';
  if (bad) throw Error(`${w} ${a}/${b}: ${bad}`);
  if ((A.kin || []).includes(b) || (B.kin || []).includes(a)) { setKin(P, A, B, false); n++; log.push(`unkin ${lab(A)} / ${lab(B)}`); res.set(L, 'removed'); }
  else res.set(L, 'not kin already');
  if (!fileAllow.includes(`'${k}'`) && !FAMILY_OK.has(k)) { allowAdd.push(`  '${k}', // ${A.text} / ${B.text}: allowed: trimmed for clash (v401); ${why}`); FAMILY_OK.add(k); }
}
reindex(P);

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), ce = C.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const shiftVs = x => !same(ce.text, x.text) ? (ce.text.length !== x.text.length ? `entry count ${ce.text.length} -> ${x.text.length}` : `first at index ${ce.text.findIndex((t, i) => t !== x.text[i])}`) : 0;
const clashStat = (clash, text) => { const m = new Map(); clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(text[i]); } }); const big = [...m.values()].sort((p, q) => q.length - p.length); const dist = {}; for (const g of big) dist[g.length] = (dist[g.length] || 0) + 1; return { words: clash.filter(c => c).length, ids: m.size, big, dist }; };
const cC = clashStat(ce.clash, ce.text), c1 = clashStat(x1.clash, x1.text);
const over = c => c.big.filter(g => g.length > CLASH_MAX).length, at8 = c => c.big.filter(g => g.length === CLASH_MAX).length;
const distLine = c => Object.entries(c.dist).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');

// per export row: its themes, its clash group (row indexes); the theme's rows; how many other themes hold a clash mate
function view(x) {
  const lk = []; let p = 0; for (let i = 0; i < x.text.length; i++) { const a = []; for (let j = 0; j < x.linkCount[i]; j++) { a.push(x.links[p]); p += 4; } lk.push(a); }
  const by = new Map(); x.clash.forEach((c, i) => { if (c) { if (!by.has(c)) by.set(c, []); by.get(c).push(i); } });
  const grp = i => x.clash[i] ? by.get(x.clash[i]) : [i];
  const mates = i => { const s = new Set(); for (const j of grp(i)) if (j !== i) for (const t of lk[j]) if (!lk[i].includes(t)) s.add(t); return s; };
  return { lk, grp, mates, rows: ti => [...lk.keys()].filter(i => lk[i].includes(ti)) };
}
const V0 = view(x0), V1 = view(x1), ti = x1.themes.indexOf(THEME);
const gtxt = (x, V, i) => { const g = V.grp(i); return `${g.length} [${g.map(j => x.text[j]).join(', ')}]`; };
const salty = V1.rows(ti).map(i => ({ i, t: x1.text[i], b: V0.grp(i).length, a: V1.grp(i).length, gb: gtxt(x0, V0, i), ga: gtxt(x1, V1, i), mb: V0.mates(i).size, ma: V1.mates(i).size }));
const sDist = k => { const d = {}; for (const r of salty) d[r[k]] = (d[r[k]] || 0) + 1; return Object.entries(d).sort((p, q) => p[0] - q[0]).map(([s, c]) => `${s}:${c}`).join(' '); };
const sum = k => salty.reduce((s, r) => s + r[k], 0);
// other themes whose rows changed clash group
const changedRows = [...x1.text.keys()].filter(i => x0.clash[i] !== 0 && (V0.grp(i).length !== V1.grp(i).length));
const themeHits = new Map(); for (const i of changedRows) for (const t of V1.lk[i]) { const id = x1.themes[t]; if (!themeHits.has(id)) themeHits.set(id, []); themeHits.get(id).push(`${x1.text[i]} ${V0.grp(i).length}->${V1.grp(i).length}`); }

const summary = [
  `${LINKS.length} kin pairs to remove: ${[...res.values()].filter(r => r === 'removed').length} removed now; allow-list lines to add: ${allowAdd.length}`,
  `Family export after vs the committed file: entry index shifts ${shiftVs(x1)}; links ${same(ce.links, x1.links) ? 'identical' : 'CHANGED'}; words with a clash id ${cC.words} -> ${c1.words}; clash ids ${cC.ids} -> ${c1.ids}; groups of ${CLASH_MAX}: ${at8(cC)} -> ${at8(c1)}; over ${CLASH_MAX}: ${over(cC)} -> ${over(c1)}`,
  `Clash group sizes (size:count) before: ${distLine(cC)}`, `Clash group sizes (size:count) after:  ${distLine(c1)}`,
  `${THEME}: ${salty.length} export rows; with a clash id ${salty.filter(r => r.b > 1).length} -> ${salty.filter(r => r.a > 1).length}; group sizes before ${sDist('b')}; after ${sDist('a')}; other themes holding a clash mate (sum over rows) ${sum('mb')} -> ${sum('ma')}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`];
console.log(`${log.join('\n') || 'no changes'}\n\n${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);

if (REVIEW) {
  const tn = e => Object.keys(e.typ || {}).join(', ') || '-';
  const head = [
    `Library batch v401 (PROPOSAL for Simon, not applied): trim the clash groups that may be starving "salty foods" (I22). tools/gen/batch401.mjs, on v400.`, '',
    `Why. The game measured v400: salty foods in Hard fell from 16 to 3 appearances over 2,000 levels (34 -> 12 distinct words). In the family export`,
    `its 54 rows went from 21 with a clash id (v397; largest group 5) to 30 (v400), five of them in 8-word groups (salt; French fries, potato chips,`,
    `crisps, chips). Counting, for each salty-foods row, the other themes (not its own) that hold a word of its clash group (any of them in a`,
    `level shuts the row out), summed over the rows: 35 at v397, 110 at v400, 86 after this trim. Inside the theme nothing changed (the same rows`,
    `share ids as at v397), so the loss is the outside exposure. Not proven to be the cause; the game can measure it. The trim recovers about a`,
    `third of the rise; most of the rest is dup? pairs (olives 10 themes, pretzels 8, anchovies 7, pickles 6), true families left alone.`, '',
    `Where the exposure comes from (v400):`,
    `  - salt 712 (8): salt/salty (v399 K and v400 K, x2 each), salt/salts (bath salts), salty/salts. Joins chemical_compounds, ways_to_preserve_food`,
    `    (salt 19885, salt-cure), basic_tastes and taste_words (salty 39201), gen_z_slang (salty 27229, "upset"), bath_time (salts, Epsom salts).`,
    `  - French fries / potato chips (+ crisps) / chips (8): one link, chips/chip (v400 K, food / electronics), joins the food group (4, as v397)`,
    `    to the electronics group (chip, microchip, silicon chip, integrated circuit: 4).`,
    `  - crackers (7): crackers/cracker (firework), and the crack family (crack drug 15493, crack sound 57960, cracking chemistry 40552) bridged`,
    `    to it by six links, four of them against the v400 consistency rule (a derived word, cracker(s) from the crack sound, paired with the base`,
    `    in an unrelated sense, is not kin) and two judgement calls (K?).`,
    `  - pork rinds / pork scratchings (6): v397's group of 5 plus crackle/crackling (K?). Kept: crackling is the -ing of crackle (the v400 rule).`,
    `  - olives (3, 10 themes), pretzels (3, 8), anchovies (2, 7), pickles (2, 6), kippers, capers, rollmops: dup? pairs (one word, singular and`,
    `    plural) and olive (colour). Kept: they would give a level away. They are small groups; their exposure comes from the singular's many themes`,
    `    (merging them into one entry, I23, would not change that).`,
    `  - jerky/jerk, brine/briny, capers/caper (jump): kept (small; jerky/jerk and brine/briny are food look-alikes).`, '',
    `Proposal: remove ${LINKS.length} kin pairs; add their all-theme keys to js/family-allow.js ("allowed: trimmed for clash (v401)") so family-kin`,
    `does not suggest them again. Kept on purpose: salt 712 / salty 39201 (taste) and salt 19885 / salty 39201 (a level with salt in salty foods and`,
    `salty in basic tastes would give itself away; they also keep the two "salt" entries in one group), crackers / cracker (firework: "crackers"`,
    `would fit a fireworks group), crack / crack / cracking (one written word).`,
    `Judgement calls for Simon: chips/chip (a level with "chips" among snacks and "microchip" among electronic parts is possible again, as at v397);`,
    `salty 27229 (slang) and salty 39201 (taste) are now in different groups, as salt 712 and salt 19885 were at v397 (same text: the game's own`,
    `same-text rule, if any, applies); bath "salts" can meet "salt" (rare: bath_time with a food theme).`, '',
    ...summary, '',
    `== Removed kin (${LINKS.length}) ==`,
    ...LINKS.map(L => { const [a, b, w, src, ch, why] = L, A = ix.entry.get(a), B = ix.entry.get(b);
      return `  [${ch}] ${w} (${a} / ${b}; ${tn(A)} ~ ${tn(B)}; ${src}): ${res.get(L)} -- ${why}`; }), '',
    `== ${THEME}: clash groups before -> after (export rows; "themes" = other themes holding a clash mate) ==`,
    ...salty.filter(r => r.b > 1 || r.a > 1).map(r => `  ${r.t}: ${r.gb} themes ${r.mb}${r.gb === r.ga ? ' (unchanged)' : `\n      -> ${r.ga} themes ${r.ma}`}`),
    `  no clash id: ${salty.filter(r => r.a === 1).map(r => r.t).join(', ')}`, '',
    `== Other themes affected (rows whose clash group shrank; all groups only get smaller) ==`,
    ...[...themeHits].filter(([t]) => t !== THEME).sort((p, q) => p[0].localeCompare(q[0])).map(([t, l]) => `  ${t}: ${l.join(', ')}`), '',
    `== Allow-list lines (js/family-allow.js, on --apply) ==`, ...(allowAdd.length ? allowAdd : ['  none (already there)']),
  ];
  fs.writeFileSync(REVIEW, head.join('\n') + '\n');
  console.log('review written to ' + REVIEW);
}
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written');
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
  if (APPLY && allowAdd.length) { fs.writeFileSync(ALLOW, fileAllow.replace(/\n\]\);\s*$/, '\n' + allowAdd.join('\n') + '\n]);\n')); console.log(`${allowAdd.length} lines added to js/family-allow.js`); }
}
