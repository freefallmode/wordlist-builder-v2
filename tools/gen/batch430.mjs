// Library batch v430: topic / "X words" twins (Simon, 2026-11-22, LIBRARY-RULES 6: a theme X and an "X words" theme of the same topic merge
// into X; an "X words" theme of how people talk about X, a different kind of answer, stays and is renamed for what it is). Replaces v408,
// which kept these pairs. For Simon's review.
// Each change, by pair:
//   1. religion words merges into religion (38 of its 57 words already there). The words religion lacks move there at their typicality;
//      the shared words keep the better typicality of the two (holy 1, scripture 2, transgression 3, trespass 3); pray joins the prayer group
//      as in religion words. atheism (atheist is in religion, its kin) and bless (blessing is there, its kin) do not move: one word family
//      may give only one answer in a theme. Its four sub-themes move up to religion. Then religion words is deleted.
//   2. archaeology words merges into archaeology (25 of 35 shared). The words archaeology lacks move at their typicality; grid square 3
//      and lithics 4 keep the better typicality; dig site joins the excavation / dig group, artifact and relic form a group, as in
//      archaeology words. Then archaeology words is deleted.
//   3. pirate words: its pirate people, ships and things (buccaneer, corsair, freebooter, privateer, swashbuckler, doubloon, pieces of
//      eight, plunder, grog, keelhaul, letter of marque, Black Spot, Davy Jones) leave it; pirates gets the three it lacks (freebooter,
//      grouped with pirate, buccaneer and corsair; Black Spot; Davy Jones). The 18 words of pirate speech stay; the theme is renamed
//      "pirate talk" (id pirate_words kept).
//   4. wine words is renamed "wine world" (id kept): it is the general vocabulary of wine (people, places, vessels, labels, tasting and
//      making), not tasting language alone; the two sharper sets already exist as its children (wine tasting notes, winemaking terms).
//   5. card game words is renamed "card game terms" (id kept): terms of play.
//   6. dinosaur words is renamed "dinosaur science" (id kept): fossils, anatomy, classification, extinction and the people who study them.
//      Out: shooting star and falling star (names of a meteor seen in the sky, typicality 5; meteor stays). The films Jurassic Park and
//      The Land Before Time stay (Simon: keep them in the game; no films theme exists). pop 4 -> 3, ident 4 -> 3.
//   7. Card senses (Simon: "Can you fix these?"): card game terms linked shuffle [walk], talon [bird], grand slam (the baseball and tennis
//      entry) and wild card (the tournament entry); poker terms linked kicker [football] and showdown (the Wild West entry). Each gets a
//      card-sense root (shuffle [cards], talon [cards], grand slam [bridge], wild card [cards], kicker [poker], showdown [poker]) that takes
//      the link at the same typicality; the old entries that had no gloss get one (grand slam [sports], wild card [tournament], showdown
//      [confrontation]). Kin follows the pattern of the other card senses: same-text senses are not kin (no kicker is kin of another);
//      shuffle [cards] is kin of shuffling [dance] like shuffle [walk] and [dance move], kicker [poker] of kick like every kicker.
//   8. Same-topic twins found by the overlap scan (LIBRARY-RULES 6). Merged into the theme whose name is their topic: sewing words ->
//      fabrics and sewing, map words -> maps and globes, war words -> wars and battles, magic show words -> magic tricks, ice words -> snow
//      and ice, dental words -> dentist's office, mail words -> post office (the place, as airport words went into airport in v408).
//      Kept (a sharper sub-theme of a broader topic, beside siblings of the same kind): music terms, army words, painting words, astronomy
//      terms, courtroom words, film words; horse riding words is riding, not the animal (horses).
//      Simon's follow-ups: grand slam 42810 keeps the baseball sense (gloss baseball) and grand slam [tennis] takes tennis terms; two roots
//      of one sense merge (fold [cards] into fold [poker], glossed cards; floss [teeth] into floss [dental]; top hat [magic] into top hat
//      [hat]); magic tricks is renamed "magic shows" (id kept) with famous magicians under it; atheism joins religion in the atheist group;
//      mentalist joins magic shows in the mind reading / mentalism group; magic trick stays out (overlap rule); pirate talk gains five
//      attested words (bucko, splice the mainbrace, dance the hempen jig, blow me down, belay [stop]; Wiktionary).
//   9. Wrong senses found on the way: army words links trench [ocean] (trench [military] takes it); horse riding words links pommel [sword]
//      (pommel [saddle part] takes it) and bit [horse bit] 44843, a second root of bit [horse tack] 1536 (1536 takes the link, 44843 is
//      deleted; both had the same kin).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch430.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin, placeTheme } from '../../js/model.js';
import { nameLeak } from '../../js/validate.js';
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
const THEMES = ['religion', 'religion_words', 'archaeology', 'archaeology_words', 'pirates', 'pirate_words', 'wine_words', 'card_game_words', 'dinosaur_words',
  'poker_terms', 'fabrics_and_sewing', 'sewing_words', 'maps_and_globes', 'map_words', 'wars_and_battles', 'war_words', 'magic_tricks', 'magic_show_words',
  'snow_and_ice', 'ice_words', 'dentist_s_office', 'dental_words', 'post_office', 'mail_words', 'army_words', 'horse_riding_words'];
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return 'no theme';
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.vulgar);
  const b = ws.map(e => difficultyBand(P, e, tid)).sort((x, y) => x - y), td = themeDifficulty(t);
  return `"${t.name}" pop ${t.pop} ident ${t.ident}: ${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, theme difficulty ${td}, 4th-easiest band ${b[3]}, gap ${b[3] - td}`;
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
  if (extra.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.nameOk ? ', may contain a word of the theme name (nameOkIn): the full name of the thing' : ''}): ${why}`);
};
const added = [];
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e)); alone.delete(id);
  A.push(`deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}`);
};
// A theme's link moves from a wrong-sense entry to the right one (same typicality unless given; group places follow).
const swap = (tid, fromE, toE, why, typ) => {
  if (fromE.typ[tid] === undefined) return;
  const t = typ ?? fromE.typ[tid], nameOk = (fromE.nameOkIn || []).includes(tid);
  const gs = (T(tid).groups || []).filter(g => g.includes(fromE.id));
  linkE(toE, tid, t, why, { nameOk });
  for (const g of gs) { if (!g.includes(toE.id)) g.push(toE.id); A.push(`  group in ${tid}: ${lab(toE)} takes the place of ${lab(fromE)}`); }
  unlinkE(fromE, tid, `wrong sense: ${lab(toE)}${toE.gloss ? ' [' + toE.gloss + ']' : ''} takes the link`);
};
// A card sense: a new root with its own gloss takes the link (rerun: found by text + gloss).
const sense = (oldId, oldText, tid, gloss, fields, why) => {
  const old = chk(oldId, oldText);
  let e = (ix.byText.get(oldText.toLowerCase()) || []).find(x => !x.aliasOf && x.text === oldText && x.gloss === gloss);
  if (!e) {
    if (old.typ[tid] === undefined) throw Error(`${lab(old)} is not in ${tid}`);
    e = addEntry(P, oldText, { gloss, status: 'rev', ...fields }); reindex(P); n++; added.push(e.id);
    A.push(`new entry: ${lab(e)} [${gloss}] ${e.pos}, ${e.type}, familiarity ${e.fam}: ${why}`);
  }
  swap(tid, old, e, `the ${gloss} sense, at the typicality of the old link`);
  return [old, e];
};
const glossE = (e, g, why) => { if (e.gloss) return; A.push(`${lab(e)}: gloss "" -> "${g}": ${why}`); e.gloss = g; n++; reindex(P); };
const kinE = (a, b, why) => { if ((a.kin || []).includes(b.id)) return; setKin(P, a, b, true); n++; A.push(`kin: ${lab(a)} <-> ${lab(b)}: ${why}`); };
const rate = (e, tid, typ, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++;
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return;
  A.push(`theme ${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++;
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
// Merge theme `from` into `into` (LIBRARY-RULES 2, deleting a theme): the words `into` lacks move at their typicality (except STAY), shared
// words keep the better (lower) typicality, groups are joined by the caller, sub-themes move up (deleteTheme), then `from` is deleted.
// MOVE lists the ids expected to move, so a library that changed since this batch was written stops it.
const merge = (from, into, MOVE, STAY, groups) => {
  if (!ix.theme.has(from)) return;
  const f = T(from), it = T(into);
  if (f.note) throw Error(`${from} has a note: move its items by hand`);
  if (P.themes.some(t => /^(?:starts|ends|hidden):@/.test(t.rule || '') && t.rule.endsWith('@' + from))) throw Error(`a rule names ${from}`);
  const ws = (ix.byTheme.get(from) || []).filter(e => !e.aliasOf && e.typ[from] !== undefined);
  const lack = ws.filter(e => e.typ[into] === undefined), shared = ws.filter(e => e.typ[into] !== undefined);
  const unknown = lack.filter(e => !MOVE.some(([id]) => id === e.id) && !STAY.has(e.id)), gone = MOVE.filter(([id]) => !lack.some(e => e.id === id));
  if (unknown.length || gone.length) throw Error(`${from}: words this batch does not decide: ${unknown.map(lab).join(', ')}; expected but not there: ${gone.map(x => x.join(' ')).join(', ')}`);
  A.push(`${from} "${f.name}": ${ws.length} words, ${shared.length} already in ${into}, ${MOVE.length} move, ${STAY.size} stay out`);
  for (const [id, text, extra] of MOVE) { const e = chk(id, text); linkE(e, into, e.typ[from], `from ${f.name}, at the same typicality`, extra); }
  for (const e of shared) if (e.typ[from] < e.typ[into]) rate(e, into, e.typ[from], `its typicality in ${f.name}, the better of the two (a merge keeps the better typicality)`);
  for (const [ids, why] of groups) addToGroup(into, ids, why);
  const kids = P.themes.filter(t => t.parent === from).map(t => t.id);
  const ids = ws.map(e => e.id);
  deleteTheme(P, from); reindex(P); n++;
  A.push(`deleted theme: ${from} "${f.name}": merged into ${into} "${it.name}"; ${ids.length} links go with it${kids.length ? `; its sub-themes move up to ${f.parent}: ${kids.join(', ')}` : ''}`);
  for (const id of ids) { const e = E(id); if (!linkIds(P, e).length) { alone.add(id); A.push(`  now in no theme: ${lab(e)}: ${STAY.get(id) || ''}`); } else if (STAY.has(id)) A.push(`  not moved: ${lab(e)}: ${STAY.get(id)} (${where(e)})`); }
};

// ---------- 1. religion words merges into religion ----------
A.push('1. religion words merges into religion (a theme and its same-topic "X words" twin)');
merge('religion_words', 'religion',
  [[34187, 'absolution'], [61173, 'apotheosis'], [34188, 'canon'], [34191, 'catechism'], [33756, 'covenant'], [34184, 'creed'], [34186, 'divine'],
   [22790, 'exorcism'], [34189, 'grace'], [61172, 'numinous'], [34190, 'offering'], [6920, 'pantheon'], [6690, 'pilgrim'], [34183, 'pray'],
   [34181, 'soul'], [61171, 'syncretism'], [61170, 'theodicy'], [34185, 'atheism']],
  new Map([[34182, 'bless: blessing 4304, its kin, is in religion (one word family gives one answer in a theme)']]),
  [[[4276, 34183], 'pray joins the prayer group (prayer, orison, supplication), as in religion words'],
   [[4318, 4319, 4320, 34185], 'atheism joins atheist, nonbeliever and unbeliever: one word family (atheist / atheism) may share a theme only inside one group (Simon: keep atheism in the game)']]);

// ---------- 2. archaeology words merges into archaeology ----------
A.push('2. archaeology words merges into archaeology (a theme and its same-topic "X words" twin)');
merge('archaeology_words', 'archaeology',
  [[7073, 'antiquity'], [10106, 'dig site'], [21694, 'field walking'], [21691, 'geophysics'], [21695, 'Mortimer Wheeler'], [21688, 'relic'],
   [21693, 'site survey'], [21689, 'trench'], [21690, 'typology'], [21692, 'unearth']],
  new Map(),
  [[[6858, 6859, 10106], 'dig site joins excavation and dig, as in archaeology words'], [[6860, 21688], 'artifact and relic, the same answer, as in archaeology words']]);

// ---------- 3. pirate words -> pirate talk ----------
A.push('3. pirate words: pirate people, ships and things to pirates; the speech stays, renamed "pirate talk"');
{ const why = 'from pirate words, at the same typicality: a pirate thing or figure, not pirate speech';
  for (const [id, text] of [[21186, 'freebooter'], [62004, 'Black Spot'], [21180, 'Davy Jones']]) { const e = chk(id, text); if (e.typ.pirate_words !== undefined) linkE(e, 'pirates', e.typ.pirate_words, why); }
  addToGroup('pirates', [6759, 6760, 6762, 21186], 'freebooter is another word for a pirate, like buccaneer and corsair');
  out('pirate_words', [[6760, 'buccaneer'], [6762, 'corsair'], [21186, 'freebooter'], [6761, 'privateer'], [6806, 'swashbuckler'], [21180, 'Davy Jones']], 'a pirate or sea figure, not pirate speech (in pirates)');
  out('pirate_words', [[6771, 'doubloon'], [6772, 'pieces of eight'], [6791, 'plunder'], [6786, 'grog'], [6787, 'keelhaul'], [6808, 'letter of marque'], [62004, 'Black Spot']], 'a pirate thing, not pirate speech (in pirates)');
  setT('pirate_words', 'name', 'pirate talk', 'how pirates talk (LIBRARY-RULES 6: an "X words" theme of how people talk about X is renamed for what it is); the id stays');
  const left = (ix.byTheme.get('pirate_words') || []).filter(e => e.typ.pirate_words !== undefined);
  A.push(`  pirate talk keeps ${left.length} words: ${left.map(e => e.text).sort().join(', ')}`); }

// ---------- 4. wine words -> wine world ----------
A.push('4. wine words -> wine world');
setT('wine_words', 'name', 'wine world', 'the general vocabulary of wine (sommelier, vintner, vineyard, cellar, carafe, chateau, cork, vintage, terroir, tannin and tasting and making words); not tasting language alone, and its two sharper sets are already its sub-themes (wine tasting notes, winemaking terms); the id stays');

// ---------- 5. card game words -> card game terms ----------
A.push('5. card game words -> card game terms');
setT('card_game_words', 'name', 'card game terms', 'terms of play (shuffle, deal, trump, ante, trick), not card games; the id stays');

// ---------- 6. dinosaur words -> dinosaur science ----------
A.push('6. dinosaur words -> dinosaur science');
out('dinosaur_words', [[7129, 'shooting star'], [7130, 'falling star']], 'a meteor as seen in the sky, typicality 5; meteor stays');
setT('dinosaur_words', 'name', 'dinosaur science', 'fossils, anatomy, classification, extinction and the people who study them (paleontology is a member, so it cannot be the name); the id stays');
setT('dinosaur_words', 'pop', 3, 'dinosaurs appeal widely, the science side a little less: ordinary');
setT('dinosaur_words', 'ident', 3, 'fossil, extinct, paleontologist, dinosaur bone point at dinosaurs, but fossils and prehistoric life fit too: needs a moment');

// ---------- 7. card senses ----------
A.push('7. Card senses in card game terms and poker terms');
{ const [, sh] = sense(16872, 'shuffle', 'card_game_words', 'cards', { pos: 'verb', type: 'common', fam: 1 }, 'mixing the cards, the sense card game terms means (shuffle [walk] is dragging the feet)');
  kinE(sh, E(11878), 'one word family (shuffle / shuffling), as shuffle [walk] and shuffle [dance move] are kin of shuffling');
  sense(8120, 'talon', 'card_game_words', 'cards', { pos: 'noun', type: 'common', fam: 5 }, 'the undealt cards left after the deal (talon [bird] is a claw)');
  const [gs] = sense(42810, 'grand slam', 'card_game_words', 'bridge', { pos: 'noun', type: 'common', fam: 4 }, 'winning all thirteen tricks in bridge; the old entry is the sports sense');
  glossE(gs, 'baseball', 'its text is now shared; 42810 keeps the baseball sense (baseball terms, hitting terms, scoring words)');
  sense(42810, 'grand slam', 'tennis_terms', 'tennis', { pos: 'noun', type: 'common', fam: 2 }, 'winning all four major tournaments in a year (Simon: split the baseball and tennis senses); same text, so no kin');
  const [wc] = sense(44348, 'wild card', 'card_game_words', 'cards', { pos: 'noun', type: 'common', fam: 2 }, 'a card that stands for any other; the old entry is the tournament sense (an extra entrant)');
  glossE(wc, 'tournament', 'its text is now shared');
  const [, kk] = sense(42794, 'kicker', 'poker_terms', 'poker', { pos: 'noun', type: 'common', fam: 4 }, 'the side card that breaks a tie (kicker [football] kicks the ball)');
  kinE(kk, E(16865), 'one word family (kick / kicker), as every other kicker');
  const [sd] = sense(23020, 'showdown', 'poker_terms', 'poker', { pos: 'noun', type: 'common', fam: 3 }, 'showing the hands at the end of the betting; the old entry is the confrontation (Wild West)');
  glossE(sd, 'confrontation', 'its text is now shared'); }

// ---------- 7b. two roots for one sense (Simon) ----------
// The weaker root's links move to the survivor (the better typicality where both are linked), with show, nameOkIn and group places; its kin
// moves; then it is deleted (its text repeats the survivor's, LIBRARY-RULES 5).
const mergeRoots = (keepId, goneId, text, why, gloss) => {
  const keep = chk(keepId, text), gone = ix.entry.get(goneId);
  if (gone) {
    chk(goneId, text);
    if (P.entries.some(a => a.aliasOf === goneId)) throw Error(`${lab(gone)} has aliases: by hand`);
    for (const [tid, typ] of Object.entries(gone.typ)) {
      if (keep.typ[tid] === undefined) {
        linkE(keep, tid, typ, `from ${lab(gone)} [${gone.gloss}], the same sense`, { nameOk: (gone.nameOkIn || []).includes(tid) });
        if (gone.show?.[tid]) keep.show = { ...(keep.show || {}), [tid]: gone.show[tid] };
      } else if (typ < keep.typ[tid]) rate(keep, tid, typ, `the better typicality of the two roots (${lab(gone)} had ${typ})`);
      for (const g of (T(tid).groups || []).filter(g => g.includes(goneId))) { if ((T(tid).groups || []).some(h => h !== g && h.includes(keepId))) throw Error(`groups of ${tid}: by hand`); if (!g.includes(keepId)) g.push(keepId); }
    }
    if ((gone.kin || []).length) { A.push(`kin of ${lab(gone)} moves to ${lab(keep)}: ${gone.kin.map(id => lab(E(id))).join(', ')}`); moveKin(P, gone, keep); n++; }
    for (const tid of Object.keys(gone.typ)) unlinkEntry(P, gone, tid);
    reindex(P);
    delE(goneId, text, `a second root of the sense of ${lab(keep)} [${keep.gloss}]: ${why}`);
  }
  if (gloss && keep.gloss !== gloss) { A.push(`${lab(keep)}: gloss "${keep.gloss}" -> "${gloss}": fits both former roots`); keep.gloss = gloss; n++; reindex(P); }
};
A.push('7b. Two roots for one sense merged');
mergeRoots(45247, 45511, 'fold', 'folding a hand is one sense in poker and in other card games', 'cards');
mergeRoots(3731, 16116, 'floss', 'dental floss and flossing are one word in one sense (the noun root; the verb use needs no entry of its own)');
mergeRoots(13720, 45963, 'top hat', 'the magician\'s top hat is the hat itself; gloss "hat" fits both');

// ---------- 8. same-topic twins ----------
const NO = { nameOk: true };
A.push('8a. sewing words merges into fabrics and sewing (its parent, named for its topic)');
merge('sewing_words', 'fabrics_and_sewing',
  [[24873, 'gather'], [24874, 'bias binding'], [24875, 'mending'], [24876, 'fabric scissors', NO], [24877, 'cross stitch'], [24878, 'satin stitch'], [24879, 'French knot'],
   [24880, 'feather stitch'], [24881, 'whip stitch'], [24882, 'hemstitch'], [24883, 'presser foot'], [25002, 'pin']],
  new Map(), [[[5059, 24875], 'darning and mending, the same answer, as in sewing words']]);
A.push('8b. map words merges into maps and globes (its parent, named for its topic)');
merge('map_words', 'maps_and_globes',
  [[2437, 'map reference', NO], [20356, 'cartouche'], [21021, 'compass rose'], [37883, 'north arrow'], [37884, 'grid'], [37885, 'map symbol', NO], [37886, 'inset'],
   [37887, 'orientation'], [37889, 'landmark'], [37890, 'scale bar'], [37891, 'neatline'], [37892, 'toponym']],
  new Map(), [[[2436, 2437], 'grid reference and map reference, the same answer, as in map words']]);
A.push('8c. war words merges into wars and battles (its parent, named for its topic)');
merge('war_words', 'wars_and_battles',
  [[3075, 'bivouac'], [4391, 'forces'], [4439, 'reconnaissance'], [4444, 'conscription'], [21362, 'weapon'], [21363, 'attack'],
   [21364, 'casualty'], [21365, 'barrage'], [21366, 'muster'], [21367, 'war crime', NO], [21368, 'vanguard'], [21369, 'salvo'], [21370, 'sapper'], [21371, 'attrition'],
   [21372, 'foray'], [21373, 'reinforcements']],
  new Map([[4390, 'troops: trooper 4374, of its word family, is in wars and battles (in the soldier group)'], [4468, 'flank [military]: wars and battles has flank [attack] 6852, which shows the same text']]), []);
A.push('8d. magic show words merges into magic tricks (the same topic: magic tricks already holds magician, wand, top hat, abracadabra)');
merge('magic_show_words', 'magic_tricks',
  [[13726, 'vanishing act'], [13731, 'patter'], [13732, 'false bottom'], [13733, 'hocus pocus'], [13734, 'conjurer'], [13735, 'illusionist'], [13738, 'prestidigitation'],
   [13739, 'legerdemain'], [13741, 'black art'], [13743, 'forcing'], [13746, 'magic box', NO], [13729, 'mentalist']],
  new Map([[13744, 'magic trick: the general word beside its kinds (card trick, coin trick, rope trick) breaks the overlap rule (LIBRARY-RULES 5), and it would show a word of the theme name']]),
  [[[13719, 13734, 13735, 13723], 'magician, conjurer, illusionist and illusion, as in magic show words (illusion and illusionist are one word family)'], [[13721, 13733, 50083], 'magic words, the same answer, as in magic show words'],
   [[13722, 13738, 13739], 'sleight of hand, as in magic show words'], [[13745, 13726], 'vanishing act joins disappearing act and vanish'], [[13747, 45962, 13729], 'mentalist joins mind reading and mentalism: one word family (mentalism / mentalist) may share a theme only inside one group'], [[13743, 45969], 'forcing is the card force']]);
A.push('8d2. magic tricks -> magic shows (Simon): it holds magician, wand and top hat as well as the tricks');
setT('magic_tricks', 'name', 'magic shows', 'the theme now holds the performers, props and words of a magic show as well as the tricks (Simon); the id stays');
if (T('famous_magicians').parent !== 'magic_tricks') { const from = T('famous_magicians').parent; if (!placeTheme(P, 'famous_magicians', 'magic_tricks', 'in')) throw Error('place famous_magicians'); reindex(P); n++; A.push(`theme famous_magicians moved from ${from} to magic_tricks (magic shows): the magicians of the magic show (it was under magic show words)`); }
setT('magic_tricks', 'pop', 2, 'a popular topic (checked)');
setT('magic_tricks', 'ident', 2, 'magician, wand, top hat, abracadabra name it after a second look (checked)');
{ const t = T('magic_tricks');
  for (const e of (ix.byTheme.get('magic_tricks') || []).filter(e => !e.aliasOf && e.typ.magic_tricks !== undefined)) {
    const had = (e.nameOkIn || []).includes('magic_tricks'), leak = nameLeak(t, { ...e, nameOkIn: [] });
    if (had && !leak) { e.nameOkIn = e.nameOkIn.filter(x => x !== 'magic_tricks'); n++; A.push(`${lab(e)}: nameOkIn for magic_tricks dropped: no word of "magic shows" in it`); }
    if (!had && leak) { e.nameOkIn = [...(e.nameOkIn || []), 'magic_tricks']; n++; A.push(`${lab(e)}: nameOkIn magic_tricks: "${leak}" of "magic shows" is part of its full name`); } } }
A.push('8e. ice words merges into snow and ice (named for its topic)');
merge('ice_words', 'snow_and_ice',
  [[1964, 'moraine'], [2017, 'thaw'], [2019, 'hailstone'], [30904, 'pack ice', NO], [30908, 'serac'], [30912, 'nunatak'], [30913, 'bergy bit'], [32179, 'brash ice', NO],
   [39915, 'glaze'], [39916, 'frozen'], [39917, 'icy'], [39918, 'calve'], [39920, 'frazil'], [39921, 'cryosphere'], [39922, 'freeze-up']],
  new Map([[1613, 'Ice Age: a period, not snow or ice'], [39043, 'ice rink: a venue'], [15009, 'frostbite: an injury (in cold-weather ailments)'],
           [19888, 'freeze [preserve]: the food sense, not ice']]),
  []);
A.push('8f. dental words merges into dentist\'s office (the place of the topic, as airport words went into airport in v408)');
merge('dental_words', 'dentist_s_office',
  [[3730, 'toothpaste'], [14486, 'wisdom tooth'], [14489, 'premolar'], [14490, 'enamel'], [14499, 'dentin'], [14503, 'bicuspid'], [14506, 'implant'],
   [14512, 'bridge'], [15416, 'canine tooth'], [15419, 'veneer'], [15421, 'tooth abscess'], [15422, 'gingivitis'], [15425, 'scale and polish'], [15426, 'tooth pulp'],
   [15427, 'periodontist'], [15430, 'dental dam'], [15431, 'dental probe'], [15432, 'amalgam'], [15433, 'caries'], [15434, 'tooth extraction'], [15435, 'dental drill'],
   [15436, 'bite wing']],
  new Map(), [[[14503, 14489], 'bicuspid and premolar, the same answer'], [[15413, 15433], 'cavity and caries, the same answer']]);
A.push('8g. mail words merges into post office (the place of the topic, as airport words went into airport in v408)');
merge('mail_words', 'post_office',
  [[4562, 'postcard'], [22986, 'Penny Black'], [35161, 'address'], [35166, 'junk mail'], [35169, 'first class'], [35175, 'chain letter'], [35176, 'dead letter'],
   [35177, 'return to sender'], [35179, 'parcel post', NO], [35180, 'mail bag'], [35181, 'air letter'], [35182, 'aerogramme'], [35183, 'express mail'], [35184, 'franking'],
   [35185, 'mail order'], [35187, 'sealing wax'], [35189, 'bulk mail'], [61355, 'cancellation'], [61357, 'postal code'], [61358, 'general delivery'], [61359, 'postal worker']],
  new Map([[35160, 'post office: the theme\'s own name'], [3958, 'pen pal: a friend you write to (in family and friends)'], [5863, 'philately: stamp collecting (in collecting hobbies)']]),
  [[[35181, 35182], 'air letter and aerogramme'], [[26017, 61357], 'zip code and postal code'], [[35168, 61355], 'postmark and cancellation'], [[4120, 61359], 'mail carrier and postal worker']]);

{ const fc = chk(38233, 'first class'), fm = chk(35169, 'first class');
  if (fc.typ.post_office !== undefined) {
    if (fm.typ.post_office === undefined) throw Error('first class [mail] is not in post office');
    rate(fm, 'post_office', Math.min(fm.typ.post_office, fc.typ.post_office), 'the better typicality of the two first class links in post office');
    unlinkE(fc, 'post_office', 'wrong sense: first class [mail] 35169 is the postal sense'); } }

// ---------- 9. wrong senses found on the way ----------
A.push('9. Wrong senses in army words and horse riding words');
swap('army_words', E(32036), chk(4404, 'trench'), 'the military trench', 3);
swap('horse_riding_words', E(43807), chk(9581, 'pommel'), 'the front of the saddle');
if (ix.entry.get(44843)) swap('horse_riding_words', E(44843), chk(1536, 'bit'), 'the same sense: bit [horse tack] 1536 is the root');
delE(44843, 'bit', 'a second root of bit [horse tack] 1536 (same sense, same kin), now in no theme (LIBRARY-RULES 5: two roots for one sense are merged)');

// ---------- 10. pirate talk: hard words (Simon) ----------
A.push('10. pirate talk: attested hard words of pirate and sailor speech (sources: Wiktionary entries, checked 2026-11-22)');
const newWord = (text, gloss, fields, tid, typ, why) => {
  let e = (ix.byText.get(text.toLowerCase()) || []).find(x => !x.aliasOf && x.text === text && x.gloss === gloss);
  if (!e) { e = addEntry(P, text, { gloss, status: 'rev', ...fields }); reindex(P); n++; added.push(e.id); A.push(`new entry: ${lab(e)}${gloss ? ' [' + gloss + ']' : ''} ${e.pos}, ${e.type}, familiarity ${e.fam}: ${why}`); }
  linkE(e, tid, typ, why); return e;
};
newWord('bucko', '', { pos: 'noun', type: 'common', fam: 4 }, 'pirate_words', 3, 'Wiktionary "bucko": nautical slang, a swaggering bully; also a term of address');
newWord('splice the mainbrace', '', { pos: 'verb', type: 'phrase', fam: 5 }, 'pirate_words', 3, 'Wiktionary "splice the mainbrace": nautical idiom, to have a drink (of rum)');
newWord('dance the hempen jig', '', { pos: 'verb', type: 'phrase', fam: 5 }, 'pirate_words', 3, 'Wiktionary "dance the hempen jig": colloquial, to be hanged');
newWord('blow me down', '', { pos: 'other', type: 'phrase', fam: 3 }, 'pirate_words', 3, 'Wiktionary "blow me down": an exclamation of surprise, sailor speech');
newWord('belay', 'stop', { pos: 'verb', type: 'common', fam: 4 }, 'pirate_words', 3, 'Wiktionary "belay", nautical sense: stop, cease ("Belay that!"); the climbing sense is another entry');
glossE(E(45052), 'climbing', 'its text is now shared with belay [stop]');

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
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.map(t => `${t} (index ${x0.themes.indexOf(t)})`).join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to index ${tLast} ("${x1.themes[tLast]}", was "${x0.themes[tLast]}")`}`);
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
  const byTheme = ks => { const c = {}; for (const k of ks) { const t = k.split('\t')[0]; c[t] = (c[t] || 0) + 1; } return Object.entries(c).map(([t, v]) => `${t} ${v}`).join(', '); };
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length} (${byTheme(lost)}), new ${gained.length} (${byTheme(gained)}), rating changed ${rated.length}`);
  cmp.push(`  gone (other than the deleted themes): ${lost.filter(k => !tGone.includes(k.split('\t')[0])).map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Library batch v430. Topic / "X words" twins (Simon, 2026-11-22; replaces v408): religion words, archaeology words, sewing words, map words, war words, magic show words, ice words, dental words and mail words merge into religion, archaeology, fabrics and sewing, maps and globes, wars and battles, magic tricks, snow and ice, dentist\'s office and post office; pirate words keeps the speech and is renamed pirate talk (its pirate things go to pirates); wine words -> wine world; card game words -> card game terms; dinosaur words -> dinosaur science (shooting star and falling star out); magic tricks -> magic shows; pirate talk gains five attested words. Card senses: shuffle, talon, grand slam, wild card, kicker and showdown get card-sense entries; grand slam split into baseball and tennis; fold, floss and top hat each lose a second root. Wrong senses fixed in army words (trench) and horse riding words (pommel, bit; the duplicate bit deleted).',
  ...A.map(x => /^\d+\./.test(x) || x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:',
  ...THEMES.map(t => `  ${t}: ${prof0[t]} -> ${profile(t)}`),
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + ' [' + E(id).gloss + ']').join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch430-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
