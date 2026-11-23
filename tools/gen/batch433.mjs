// Library batch v433: the tidy-up, step 1 (TIDY-UP.md), parts a-e. A mechanical sweep found by script; for Simon's review.
//   a. Entries in no theme (check `orphan`): a stub made for one theme with no other value is deleted (bare modifier stubs of compound themes,
//      stubs of full terms that exist, descriptions unlinked from complete sets in v410, the ten members of the deleted letters-in-order theme);
//      an entry that is another name of an existing root becomes its alias; a real word with a clearly right theme is linked there (rated);
//      the rest stay, each with a reason in the review.
//   b. Stale nameOkIn keys (check `nameOk-stale`): removed.
//   c. Two roots of one sense: pairs of enabled roots with the same text, part of speech and a meaning or theme that is the same sense
//      (found by tools/gen/batch433-scan.mjs and the scratch pair scan; floss, top hat and fold were v430's examples). The weaker root is merged
//      into the stronger: its links move (the better typicality where both are linked), with show, use, nameOkIn and group places; its kin and
//      aliases move; then it is deleted (its text repeats the survivor's). Pairs that differ in flags, region or type, or follow a library-wide
//      pattern (one term per sport), are listed for Simon, not changed.
//   d. I32 leftovers (ISSUES.md): gaol and paeony untagged; Yemaya, ether, éclair, Atatürk, piñata become roots (the other form their spelling
//      alias); glycerin, Paul McCartney, Sir John Franklin are synonyms, not spellings; cabby, pinkie, emmentaler (written Emmentaler) are
//      spellings of cabbie, pinky, Emmental, not of the general term; ax (untagged spelling of axe) confirmed (status rev);
//      lockpick its own word (pick [tool], an orphan stub, is deleted and its alias lockpick promoted); taekwondo familiarity 1 -> 2 (and
//      tae kwon do 3 -> 2). ax (untagged US spelling of axe) is left for Simon.
//   e. I33: theme names over 24 characters shortened where the short name is clearly right (ids stay; no index shifts); the doubtful ones are
//      proposals for Simon in the review.
// Simon approved v433 with a second reviewer's fixes (2026-11-23, "Yes, fix and apply"): those are in this version.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch433.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, deleteEntry, setKin, moveKin } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
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
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(i.kind === 'rating-vs-zipf' ? `${i.sev} ${i.kind}: entry ${i.entryId}` : `${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], deleted = [], counts = { a: { deleted: 0, alias: 0, linked: 0, left: 0 }, b: 0, c: 0, d: 0 };
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const groupsWith = id => P.themes.filter(t => (t.groups || []).some(g => g.includes(id)));
const linkE = (e, tid, typ, why) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return false;
  e.typ[tid] = typ; n++;
  const leak = nameLeak(T(tid), { ...e, nameOkIn: [] });
  if (leak) { e.nameOkIn = [...new Set([...(e.nameOkIn || []), tid])]; }
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} "${T(tid).name}" (typicality ${typ}${leak ? `; nameOkIn: "${leak}" of the theme name is part of the full term` : ''}): ${why}`);
  return true;
};
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return false;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  if (groupsWith(id).length) throw Error(`${lab(e)} is in a group`);
  const kin = (e.kin || []).length;
  deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e));
  A.push(`deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}${kin ? ' (its kin entries lose it)' : ''}`);
  return true;
};
const setE = (e, field, value, why) => {
  if (JSON.stringify(e[field]) === JSON.stringify(value)) return false;
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++; return true;
};
// An orphan root becomes an alias of another root in place (id kept): it has no links, groups or show to move; its kin goes to the root.
const toAlias = (id, text, rootId, rootText, kind, fam, why) => {
  const e = chk(id, text), r = chk(rootId, rootText);
  if (e.aliasOf === rootId && e.aliasKind === kind) return false;
  if (linkIds(P, e).length || groupsWith(id).length) throw Error(`${lab(e)} is linked or grouped`);
  if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases`);
  if ((e.kin || []).length) moveKin(P, e, r);
  e.aliasOf = rootId; e.aliasKind = kind; e.fam = fam; e.show = {}; e.use = {}; e.nameOkIn = [];
  if (kind === 'spelling') for (const f of ['adult', 'sensitive', 'offensive', 'tm']) e[f] = !!r[f];
  n++; reindex(P);
  A.push(`${lab(e)} becomes a ${kind} alias of ${lab(r)} (familiarity ${fam}): ${why}`);
  return true;
};

// the other form becomes the root: links, gloss, groups, kin, show, use, nameOkIn and the other aliases move; the old root is its spelling alias
const swapRoot = (rootId, rootText, aliasId, aliasText, why) => {
  const r = E(rootId), a = E(aliasId);
  if (a.text !== aliasText || r.text !== rootText) throw Error(`swap ${rootId}/${aliasId}: texts`);
  if (!a.aliasOf && r.aliasOf === aliasId) return;
  if (a.aliasOf !== rootId) throw Error(`${lab(a)} is not an alias of ${lab(r)}`);
  a.aliasOf = 0; a.aliasKind = ''; a.typ = { ...r.typ }; a.show = {}; a.use = { ...(r.use || {}) }; a.nameOkIn = [...(r.nameOkIn || [])];
  for (const [tid, s] of Object.entries(r.show || {})) if (s !== a.text) a.show[tid] = s;
  if (!a.gloss) a.gloss = r.gloss;
  for (const f of ['type', 'pos', 'adult', 'sensitive', 'offensive', 'tm']) a[f] = r[f];
  for (const x of P.entries) if (x.aliasOf === rootId && x !== a) x.aliasOf = aliasId;
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.map(id => id === rootId ? aliasId : id));
  reindex(P); moveKin(P, r, a);
  r.aliasOf = aliasId; r.aliasKind = 'spelling'; r.typ = {}; r.show = {}; r.use = {}; r.nameOkIn = []; r.region = [];
  if (r.gloss === a.gloss) r.gloss = '';
  n++; reindex(P); counts.d++;
  A.push(`${lab(a)} becomes the root and ${lab(r)} its spelling alias (familiarity ${a.fam} / ${r.fam}): ${why}`);
};

// =================== a. entries in no theme ===================
A.push('a. Entries in no theme (orphan)');
const orphans0 = P.entries.filter(e => !e.aliasOf && e.enabled !== false && !linkIds(P, e).length).map(e => e.id);
const STUB = 'a bare modifier stub made for one compound theme (its full term is the member; LIBRARY-RULES 5: never a bare stub); in no theme, no aliases, kin or groups';
const DEL = [
  [63344, 'acoustic', STUB], [63428, 'camel', STUB], [63430, 'condensed', STUB], [63431, 'evaporated', STUB], [63749, 'boreal', STUB],
  [63750, 'cloud', STUB], [63811, 'rose', STUB], [63813, 'smoky', STUB], [63936, 'folding', STUB], [63966, 'pop-up', STUB], [64091, 'bachelorette', STUB],
  [64097, 'retirement', STUB], [64098, 'surprise', STUB], [64383, 'math', STUB], [64402, 'birthday', STUB], [64512, 'suspension', STUB], [64546, 'neutron', STUB],
  [64554, 'whole', STUB], [65486, 'petrified', STUB], [65632, 'trail', STUB], [65634, 'weather', STUB], [65695, 'bedouin', STUB], [65712, 'armored', STUB],
  [65713, 'box', STUB], [65717, 'food', STUB], [65719, 'ice cream', STUB], [65720, 'logging', STUB], [65721, 'mail', STUB], [65722, 'monster', STUB],
  [65725, 'water', STUB], [65954, 'rope', STUB], [65963, 'hipped', STUB], [66093, 'car', STUB], [66126, 'cadmium', STUB],
  [58110, 'right', 'a stub of right angle 41566, which geometry and angle words hold'], [58128, 'equilateral', 'a stub of equilateral triangle 58090, which polygons and triangle types hold'],
  [62926, 'kinetic', 'a stub of kinetic energy 40601, which energy types holds'], [62927, 'potential', 'a stub of potential energy, which energy types holds'],
  [62988, 'shish', 'a stub of shish kebab 17876, which kebab types holds'], [53379, 'adana', 'a stub of Adana kebab 19304, which kebab types holds'],
  [19209, 'margherita', 'a stub of margherita pizza 20266, which pizza styles holds'], [9518, 'Shetland', 'a stub of Shetland pony 1519, which pony breeds holds (Shetland [wool] is another entry)'],
  [14381, 'longest finger', 'a description unlinked from fingers in v410 (not the name of a finger: middle finger is)'], [14383, 'fourth finger', 'a description unlinked from fingers in v410 (ring finger is the name)'],
  [53059, 'neck vertebrae', 'a description unlinked from a complete set in v410 (cervical vertebrae)'], [55048, 'man-eating mares', 'a description unlinked from the labours of Hercules in v410 (the Mares of Diomedes)'],
  [55052, 'red cattle', 'a description unlinked from the labours of Hercules in v410 (the cattle of Geryon)'],
  [49749, 'solar', 'a bare stub of solar power, which renewable energy holds'], [49750, 'wind', 'a bare stub of wind power (renewable energy holds wind turbine, wind farm)'],
  [49751, 'tidal', 'a bare stub of tidal power, which renewable energy holds'],
  ...[[29143, 'almost'], [29146, 'beefy'], [29147, 'billowy'], [29148, 'adopt'], [29156, 'deft'], [29157, 'glow'], [29160, 'most'], [29161, 'aegilops'], [29163, 'access'], [29164, 'effort']]
    .map(([id, t]) => [id, t, 'made for the theme letters in alphabetical order, deleted in v414 (T34); no other value']),
];
for (const [id, text, why] of DEL) if (delE(id, text, why)) counts.a.deleted++;
const ALIAS = [
  [41417, 'Xena', 41416, 'Eris', 'synonym', 5, 'the nickname Eris had before it was named (2005); one body, unlinked from dwarf planets in v410'],
  [51974, 'Farrokh Bulsara', 51973, 'Freddie Mercury', 'synonym', 5, 'Freddie Mercury\'s birth name, the same person'],
];
for (const x of ALIAS) if (toAlias(...x)) counts.a.alias++;
{ // Mount St. Helens 31852 (the library writes St. Louis) is the root, Mount St Helens 36530 its spelling alias (reviewer, Simon)
  const a = E(31852), r = E(36530);
  if (!a.aliasOf && r.aliasOf !== 31852) { if (toAlias(31852, 'Mount St. Helens', 36530, 'Mount St Helens', 'spelling', 2, 'the same volcano')) counts.a.alias++; }
  if (a.aliasOf === 36530) swapRoot(36530, 'Mount St Helens', 31852, 'Mount St. Helens', 'the library writes the period (St. Louis): the orphan with the period takes the links of famous volcanoes and the rest, Mount St Helens is its spelling');
}
{ // bull run [stock market] 50171: the common market term, linked in stock market words (reviewer, Simon), not deleted
  const e = E(50171);
  if (e.text === 'Bull Run') { A.push(`text: Bull Run 50171 -> "bull run": a rising market is a bull run, a common noun (Bull Run [battle] 21327 is the place)`); e.text = 'bull run'; n++; reindex(P); }
  setE(e, 'type', 'common', 'a common noun, not a place');
  setE(e, 'fam', 3, 'many adults know the market term');
  if (linkE(e, 'stock_market_words', 3, 'a period of rising prices (bull [market] and rally [market] are there)')) counts.a.linked++;
}
const LINK = [
  [31836, 'supervolcano', 'volcano_words', 3, 'a volcano word'], [31880, 'hypocenter', 'earthquake_words', 4, 'the point underground where an earthquake starts (epicenter is there)'],
  [31886, 'temblor', 'earthquake_words', 4, 'another word for an earthquake or tremor'], [31887, 'moment magnitude', 'earthquake_words', 5, 'the scale that replaced the Richter scale'],
  [31895, 'seismic zone', 'earthquake_words', 4, 'an earthquake word'], [31896, 'strike-slip', 'earthquake_words', 5, 'a kind of fault (fault is there)'],
  [31897, 'megathrust', 'earthquake_words', 5, 'the great subduction earthquakes'], [32199, 'eutrophication', 'pollution_words', 5, 'water pollution by nutrient run-off'],
  [32309, 'radiative forcing', 'climate_words', 5, 'a climate-change term'], [32312, 'Keeling Curve', 'climate_words', 5, 'the record of rising carbon dioxide'],
  [18669, 'dumpling soup', 'soups', 3, 'a soup'], [60904, 'engagement party', 'kinds_of_party', 3, 'a kind of party'],
  [31814, 'claim jumper', 'gold_rush_words', 4, 'one who seizes another\'s mining claim'], [11180, 'whole tone', 'music_terms', 4, 'an interval (interval is there)'],
  [41302, 'asteroid belt', 'things_in_space', 3, 'a thing in space'], [48044, 'ollie north', 'skateboard_tricks', 5, 'a skateboard trick (an ollie with the front foot off the board)'],
];
for (const [id, text, tid, typ, why] of LINK) if (linkE(chk(id, text), tid, typ, why)) counts.a.linked++;

// =================== b. stale nameOkIn keys ===================
A.push('b. Stale nameOkIn keys (nameOk-stale): the entry is not in that theme, so the key would only mute the leak check if it were linked there later');
for (const e of P.entries) {
  if (!(e.nameOkIn || []).length) continue;
  const ids = linkIds(P, e), stale = e.nameOkIn.filter(t => !ids.includes(t));
  if (!stale.length) continue;
  e.nameOkIn = e.nameOkIn.filter(t => ids.includes(t)); n++; counts.b += stale.length;
  A.push(`${lab(e)}: nameOkIn drops ${stale.join(', ')}`);
}

// =================== c. two roots of one sense ===================
A.push('c. Two roots of one sense merged (the second id goes into the first; links, show, use, nameOkIn, groups, kin and aliases move; the better typicality is kept)');
const mergeRoots = (keepId, goneId, text, gloss, why) => {
  const keep = chk(keepId, text), gone = ix.entry.get(goneId);
  if (gone) {
    chk(goneId, text);
    if (keep.aliasOf || gone.aliasOf) throw Error(`${text}: an alias`);
    const diffs = ['adult', 'sensitive', 'offensive', 'tm'].filter(f => !!keep[f] !== !!gone[f]); if (keep.type !== gone.type && !/typed proper/.test(why)) diffs.push('type');
    if (JSON.stringify([...keep.region].sort()) !== JSON.stringify([...gone.region].sort())) diffs.push('region');
    if (diffs.length) { SKIP.push(`${lab(keep)} [${keep.gloss}] / ${lab(gone)} [${gone.gloss}]: ${diffs.join(', ')} differ`); return; }
    const moved = [], rated = [];
    // aliases of the weaker root move to the survivor (one with the survivor's own alias text is deleted)
    for (const a of P.entries.filter(a => a.aliasOf === goneId)) {
      const dup = P.entries.find(b => b.aliasOf === keepId && b.text === a.text);
      if (dup || a.text === keep.text) { for (const x of P.entries) if (x.use) for (const [t, id] of Object.entries(x.use)) if (id === a.id) delete x.use[t]; P.entries = P.entries.filter(x => x !== a); n++; A.push(`  deleted alias ${lab(a)} of ${lab(gone)}: ${lab(keep)} has it already`); continue; }
      a.aliasOf = keepId; n++; A.push(`  alias ${lab(a)} (${a.aliasKind}) moves to ${lab(keep)}`);
    }
    reindex(P);
    for (const [tid, typ] of Object.entries(gone.typ)) {
      const t = T(tid);
      if (keep.typ[tid] === undefined) {
        keep.typ[tid] = typ; moved.push(`${tid}:${typ}`);
        if ((gone.nameOkIn || []).includes(tid)) keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), tid])];
        if (gone.show?.[tid] && !keep.show?.[tid]) keep.show = { ...(keep.show || {}), [tid]: gone.show[tid] };
        if (gone.use?.[tid] && !keep.use?.[tid]) keep.use = { ...(keep.use || {}), [tid]: gone.use[tid] };
      } else if (typ < keep.typ[tid]) { rated.push(`${tid} ${keep.typ[tid]} -> ${typ}`); keep.typ[tid] = typ; }
      // group places: the survivor takes the weaker root's place; two groups of the theme that now share it are joined
      const gs = (t.groups || []).map(g => g.includes(goneId) ? [...new Set(g.map(id => id === goneId ? keepId : id))] : g);
      const hit = gs.filter(g => g.includes(keepId));
      t.groups = [...gs.filter(g => !hit.includes(g)), ...(hit.length ? [[...new Set(hit.flat())]] : [])].filter(g => g.length > 1);
    }
    n++;
    if ((gone.kin || []).length) { A.push(`  kin of ${lab(gone)} moves to ${lab(keep)}: ${gone.kin.map(id => lab(E(id))).join(', ')}`); moveKin(P, gone, keep); }
    for (const tid of Object.keys(gone.typ)) delete gone.typ[tid];
    gone.show = {}; gone.use = {}; gone.nameOkIn = [];
    reindex(P);
    deleteEntry(P, gone); reindex(P); deleted.push(lab(gone)); counts.c++;
    A.push(`${lab(gone)} [${gone.gloss}] into ${lab(keep)} [${keep.gloss}]${moved.length ? '; links move: ' + moved.join(' ') : ''}${rated.length ? '; better typicality kept: ' + rated.join(', ') : ''}${gone.fam !== keep.fam ? `; familiarity stays ${keep.fam} (the other had ${gone.fam})` : ''}: ${why}`);
  }
  if (gloss && keep.gloss !== gloss) { A.push(`  ${lab(keep)}: gloss "${keep.gloss}" -> "${gloss}": fits both former roots`); keep.gloss = gloss; n++; reindex(P); }
};
const SKIP = [];
const MERGE = [
  [37954, 47462, 'port', "ship's left", 'the left side of a ship, three times'], [37954, 47598, 'port', null, 'the left side of a ship'],
  [2509, 20710, 'keep', null, 'the castle tower'], [46950, 46913, 'transfer', null, 'the ticket for changing buses or trains'],
  [48895, 2848, 'tender', null, 'a ship\'s boat'], [3125, 4451, 'tank', null, 'the armored military vehicle'],
  [8834, 9584, 'tail', null, 'an animal\'s tail'], [8834, 8362, 'tail', null, 'an animal\'s tail (a bird is an animal)'],
  [10336, 9589, 'muzzle', null, 'an animal\'s nose and mouth'], [8359, 10347, 'bill', null, 'a bird\'s beak'], [8382, 10343, 'spur', null, 'the spur on a bird\'s leg'],
  [8367, 10341, 'wattle', null, 'the fold of skin on a bird\'s head'],
  [54269, 21055, 'Terra Nova', null, 'Scott\'s ship'], [47528, 21056, 'Fram', null, 'Nansen\'s ship'], [54270, 21057, 'Erebus', null, 'Franklin\'s (and Ross\'s) ship'],
  [54272, 21058, 'Nimrod', null, 'Shackleton\'s ship'], [47531, 21232, 'Hispaniola', null, 'the Treasure Island ship'], [6754, 21082, 'Endeavour', null, 'Cook\'s ship'],
  [47533, 21096, 'Calypso', null, 'Cousteau\'s ship'], [47526, 21089, 'Nina', null, 'Columbus\'s ship'],
  [7302, 29208, 'RAM', null, 'computer memory'], [1480, 28906, 'drake', 'male duck', 'a male duck'], [1615, 10109, 'amber', null, 'fossil resin'],
  [7168, 49155, 'Hubble', null, 'the space telescope'], [41222, 49149, 'Voyager', null, 'the space probes'], [39833, 47093, 'Concorde', null, 'the airliner'],
  [47256, 34618, 'Harrier', null, 'the jump jet'],
  [22422, 7032, 'familiar', null, 'a witch\'s animal companion'], [22422, 22407, 'familiar', null, 'a witch\'s animal companion'],
  [10130, 9782, 'fawn', 'young deer', 'a young deer'], [21099, 39882, 'Pluto', null, 'the dwarf planet'],
  [36088, 21818, 'Ur', null, 'the Sumerian city'], [50324, 54755, 'Tyre', null, 'the ancient Phoenician city'], [36091, 54765, 'Memphis', null, 'the ancient Egyptian city'],
  [54828, 42216, 'Moray', null, 'the Inca terraces'], [65611, 37500, 'Deir el-Bahri', null, 'the temple site'], [44407, 37561, "Bird's Nest", null, 'the Beijing stadium'],
  [48982, 37741, 'Whistler', null, 'the ski resort'], [21395, 20537, 'Immortals', null, 'the Persian elite soldiers'],
  [63300, 63009, 'boto', null, 'the Amazon river dolphin'], [63990, 64543, 'shuttle', null, 'the space shuttle'], [47564, 48705, 'figure eight', null, 'the knot'],
  [44063, 42646, 'hockey', null, 'field hockey'], [47473, 48902, 'knots', null, 'a ship\'s speed'], [39775, 47095, 'ultralight', null, 'the light aircraft (microlight)'],
  [2711, 34600, 'jet', null, 'a jet aircraft'], [2809, 62653, 'freighter', null, 'a cargo ship'], [2836, 62654, 'liner', null, 'an ocean liner'], [2817, 47428, 'junk', null, 'the Chinese sailing ship'],
  [2806, 29361, 'dock', 'harbor', 'a place where ships tie up'],
  [2862, 2661, 'conductor', 'transport', 'the official on a train or bus'], [2862, 46919, 'conductor', null, 'the official on a train or bus'],
  [9059, 10297, 'drone', null, 'a male bee'], [10285, 1482, 'tom', null, 'a male cat'], [9268, 1460, 'ram', null, 'a male sheep'], [991, 24022, 'mouse', null, 'the rodent'],
  [1154, 29534, 'python', 'snake', 'the snake'], [10126, 9267, 'calf', null, 'a young cow'], [9781, 10303, 'doe', null, 'a female deer (or rabbit)'],
  [50686, 10314, 'pen', null, 'a female swan'], [1289, 9926, 'coral', null, 'the marine animal'], [7746, 40195, 'periwinkle', null, 'the sea snail'],
  [214, 22454, 'mercury', null, 'the metal element'], [38392, 46664, 'tailgate', null, 'driving too close'], [20790, 34653, 'pike', null, 'the long spear'],
  [20791, 34656, 'morning star', null, 'the spiked club'], [25770, 19853, 'sieve', null, 'the kitchen tool'], [7256, 23215, 'monitor', null, 'a computer screen'],
  [39730, 16301, 'amber', null, 'the scent'], [37893, 21018, 'chart', null, 'a sea map'], [23136, 11884, 'mirror', null, 'a looking glass'],
  [26867, 46733, 'cul-de-sac', null, 'a dead-end road'],
  [23702, 39023, 'nail', null, 'the metal fastener'], [40676, 49766, 'fuse', null, 'the electrical fuse'], [31729, 49772, 'solder', null, 'the metal alloy for joining'],
  [20855, 34368, 'habit', 'religious dress', 'the robe of a monk or nun'], [30211, 32025, 'Amazon', null, 'the rainforest region'], [22275, 22520, 'Hector', null, 'the Trojan hero'],
  [21896, 20591, 'Loki', null, 'the Norse god (a deity is typed proper, LIBRARY-RULES 4)'], [21927, 20348, 'Ra', null, 'the Egyptian sun god (typed proper)'], [20658, 34214, 'druid', null, 'the Celtic priest'],
  [25941, 55881, 'Gothic', null, 'the language'], [6660, 20341, 'mummy', 'embalmed body', 'the embalmed body'], [6987, 13609, 'troll', null, 'the folklore monster'],
  [50039, 50325, 'kingdom', null, 'the rank in biology'], [10624, 51571, 'spoons', null, 'the percussion instrument'], [11919, 28815, 'primer', null, 'the base coat of paint'],
  [12560, 45628, 'horror', 'genre', 'the genre (already in film and book genres)'], [12569, 45620, 'adventure', 'genre', 'the genre'],
  [54007, 34696, 'century', 'Roman unit', 'the Roman army unit'], [33532, 29306, 'embargo', 'trade ban', 'a ban on trade'],
  [4835, 23682, 'router', null, 'the woodworking power tool'], [4835, 46042, 'router', null, 'the woodworking power tool'], [5252, 43106, 'pool', null, 'the cue sport'],
  [5962, 46059, 'jacks', null, 'the game played with jacks'], [6289, 11907, 'brush', null, 'a paintbrush'], [4491, 34830, 'grade', null, 'a school mark'],
  [4411, 34560, 'drill', null, 'military training'], [5354, 43513, 'skeleton', 'sled sport', 'the head-first sled sport'], [5354, 44067, 'skeleton', null, 'the head-first sled sport'],
  [42987, 44254, 'love', null, 'zero in tennis'], [10163, 8089, 'hutch', null, 'a rabbit\'s cage'], [16970, 39655, 'rasp', null, 'a harsh sound'],
  [12473, 45915, 'rigging', null, 'a ship\'s ropes (on a model too)'], [30845, 45098, 'col', null, 'a mountain pass'],
  [25337, 41926, 'second', null, 'the unit of time'], [25338, 28787, 'minute', null, 'the unit of time'],
  [547, 17954, 'quark', null, 'the soft cheese'], [3918, 32432, 'partner', null, 'a life partner'], [3451, 15282, 'patient', null, 'a person in medical care'],
  [4487, 34829, 'test', 'exam', 'a school test'], [4190, 33665, 'sentence', null, 'a court\'s punishment'], [4636, 35192, 'scoop', null, 'an exclusive news story'],
  [4992, 24712, 'clutch', null, 'the small handbag'], [5011, 24823, 'ascot', null, 'the cravat'], [4934, 24319, 'shrug', null, 'the cropped cardigan'],
  [5054, 24968, 'dart', null, 'a sewn fold in a garment'], [6611, 14156, 'arcade', null, 'a row of arches'], [6884, 22465, 'hoard', null, 'a store of treasure'],
  [7388, 60686, 'axle', null, 'a wheel shaft'], [7463, 41692, 'bias', null, 'a skew in research or statistics'], [41670, 41450, 'mode', null, 'the most common value'],
  [41671, 41451, 'range', null, 'the spread of values'], [8196, 17738, 'teal', 'duck', 'the duck'], [41069, 9173, 'adult', null, 'the grown stage of a life cycle'],
  [26135, 26109, 'slash', null, 'the / sign'], [12471, 57579, 'ticket booth', 'ticket office', 'a ticket office'], [12471, 46952, 'ticket booth', null, 'a ticket office (at a station)'],
  [33008, 33238, 'porter', 'luggage carrier', 'one who carries luggage (hotel, station, airport: one dictionary sense)'], [33008, 47831, 'porter', null, 'one who carries luggage (the railway porter)'],
  [15842, 63334, 'plank', null, 'the exercise and yoga pose'], [16678, 48550, 'eggs', null, 'the food'], [47443, 43485, 'boom', null, 'the spar of a sail'],
  [23809, 23759, 'paste', null, 'the adhesive (wallpaper paste)'], [28032, 38927, 'arc', null, 'a curved line'], [38907, 38946, 'spiral', null, 'the curve'],
  [30617, 30494, 'wolfsbane', null, 'the poisonous plant'], [46661, 46728, 'merge', null, 'joining traffic'], [46704, 46680, 'slipstream', null, 'the draft behind a vehicle'],
  [48509, 48616, 'awning', null, 'a canopy'], [2050, 24043, 'stone', null, 'rock as a material'], [2057, 31746, 'marble', null, 'the rock'], [4480, 34782, 'chalk', null, 'chalk for writing'],
  [2313, 62566, 'Lady Liberty', null, 'the Statue of Liberty'], [2694, 46965, 'token', null, 'the transit token'], [2718, 47319, 'landing', null, 'a plane coming down'],
  [2750, 7335, 'drone', null, 'the flying drone'], [10716, 51606, 'bridge', null, 'the bridge of a string instrument'], [2886, 47700, 'tunnel', null, 'the railway tunnel'],
  [14812, 16890, 'stroke', null, 'a gentle touch'], [6340, 12040, 'relief', null, 'raised carving'], [20472, 12011, 'paper', null, 'paper the material and the sheet'],
  [5929, 46330, 'marbles', null, 'the game and its glass balls'], [32442, 25167, 'romance', null, 'love and courtship'], [2398, 42072, 'compass', null, 'the magnetic compass'],
  [62738, 62749, 'pigeon', null, 'the yoga pose'],
  // Simon's answers (2026-11-23): one term in two sports where the meaning is the same; human and animal parts where one sense
  [43001, 43077, 'rally', 'racket sports', 'an exchange of shots, the same in tennis and table tennis'], [42993, 43076, 'net', 'racket sports', 'the net across the court or table'],
  [43007, 43085, 'let', 'racket sports', 'a serve replayed after touching the net'], [61611, 60674, '180', 'board trick', 'a half turn, on a skateboard or a snowboard'],
  [43642, 48029, '900', 'board trick', 'two and a half turns'], [43041, 43240, 'handicap', 'score allowance', 'strokes or pins given to even out players'],
  [42765, 42892, 'tackle', 'football', 'bringing down the ball carrier, in American football and rugby'],
  [3177, 9128, 'leg', null, 'a leg, human or animal'], [3168, 9127, 'head', null, 'a head, human or animal'],
  [14217, 67272, 'webbing', 'between digits', 'the skin between fingers or toes'], [8364, 10115, 'crest', 'head crest', 'a crest on the head (birds, dinosaurs)'],
];
for (const [k, g, text, gloss, why] of MERGE) mergeRoots(k, g, text, gloss, why);
const UNCLEAR = [   // Simon's answers (2026-11-23) on the pairs the first draft listed: kept apart
  'kept apart (the meaning differs between sports): volley, block, hook, approach, frame, double, ace; handicap [race] 44850 (a weight allowance) stays apart from the score allowance',
  'kept apart: horse coat colors (chestnut, bay, dun, pinto, champagne) and the plain colors; breast [bird] / [body] and flank [body part] / [animal part]',
  'not merged: goggles [eyewear] 24786 / [swimming] 48808 / [ski] 48872 (one sense, but the merge makes a clash group of 13, clash-big); Lady Liberty 2313 / 62566 (regions differ); sea elephant 9878 (as an alias of elephant seal it would show "sea" in sea mammals); porter [hospital] 15292 (moves patients: another sense)',
  'left for step 3: boar [pig] / [animal]; captain [ship] / [crew]; transfer [transit] / [commuting]; ahead, forward [direction] / [ship]; Thebes, Rome, Broadway, Grand Canal, Fiji, Malta, Mauritius (two place senses); tanuki, halo, canvas, score, ciao, aloha, Pinkerton, pastoral, shaft, washer, sponge, elastic',
  'kept apart on purpose (different senses or words): numbers in other languages (zero, six, mille ...), sports teams of one name (Giants, Rangers, Kings, Jets, Panthers, Cardinals, Oilers), gem / color, flower / color, tree / nut, wine / wine region, dynasty / surname pairs',
];

// =================== d. I32 leftovers ===================
A.push('d. I32 leftovers (ISSUES.md; detail tools/gen/batch420-review.txt)');
if (setE(chk(2487, 'gaol'), 'region', [], 'not the UK display word for prison: an untagged rare variant (Simon, v420); its familiarity 3 is then right')) counts.d++;
if (setE(chk(1718, 'paeony'), 'region', [], 'UK writes peony; paeony is a rare untagged variant (v420); its familiarity 4 is then right')) counts.d++;
swapRoot(22195, 'Yemoja', 22196, 'Yemaya', 'Yemaya is the commoner spelling (v420)');
swapRoot(40583, 'aether', 40584, 'ether', 'ether is the US spelling of the classical element (v420); aether an untagged variant');
swapRoot(18072, 'eclair', 18073, 'éclair', 'rule 8: the dictionaries print éclair (Oxford, M-W); the plain form stays as its spelling');
swapRoot(47289, 'Ataturk', 47290, 'Atatürk', 'rule 8: the name keeps its diacritic (Atatürk); the plain form stays as its spelling');
swapRoot(25139, 'pinata', 25140, 'piñata', 'rule 8: M-W and Oxford print piñata; the plain form stays as its spelling');
for (const [id, text, why] of [[40534, 'glycerin', 'two names of one compound, not one word spelt two ways'], [51969, 'Paul McCartney', 'the full name, not a spelling of McCartney'],
  [54246, 'Sir John Franklin', 'the titled name, not a spelling of John Franklin']])
  if (setE(chk(id, text), 'aliasKind', 'synonym', why)) counts.d++;
if (ix.entry.get(28522)) { const p = chk(28522, 'pick'); if (linkIds(P, p).length) throw Error('pick 28522 linked');
  deleteEntry(P, p); reindex(P); n++; deleted.push(lab(p)); counts.d++;
  A.push(`deleted entry: pick 28522 [tool]: a stub in no theme; its alias lockpick 25709 was not a spelling of it (v420) and is promoted to a root of its own (in no theme)`); }
for (const [id, text, rootId, rootText, why] of [[4116, 'cabby', 4115, 'cabbie', 'a spelling of cabbie, not of taxi driver'], [14386, 'pinkie', 14385, 'pinky', 'a spelling of pinky, not of little finger'],
  [17921, 'emmentaler', 252, 'Emmental', 'a spelling of Emmental (the German form), not of Swiss cheese']]) {
  const e = E(id), r = chk(rootId, rootText); if (e.text !== text && !(id === 17921 && e.text === 'Emmentaler')) throw Error(id + ' text');
  if (e.aliasOf !== rootId) { A.push(`${lab(e)}: alias of ${lab(E(e.aliasOf))} -> spelling alias of ${lab(r)}: ${why}`); e.aliasOf = rootId; e.aliasKind = 'spelling'; n++; counts.d++; reindex(P); }
  setE(e, 'aliasKind', 'spelling', why);
  for (const f of ['adult', 'sensitive', 'offensive', 'tm']) setE(e, f, !!r[f], 'a spelling has its root\'s flags');
  if (e.fam < r.fam) setE(e, 'fam', r.fam, 'a spelling is never easier than its root');
}
{ const e = E(17921); if (e.text === 'emmentaler') { A.push('text: emmentaler 17921 -> "Emmentaler": a spelling of the capitalised Emmental keeps the capital'); e.text = 'Emmentaler'; n++; reindex(P); } setE(e, 'type', 'proper', 'as its root Emmental'); }
{ const ax = chk(67281, 'ax'); if (ax.aliasOf !== 322 || ax.aliasKind !== 'spelling' || ax.region.length) throw Error('ax 67281 is not the untagged spelling of axe');
  if (ax.status !== 'rev') { ax.status = 'rev'; n++; counts.d++; A.push('ax 67281: axe 322 stays the root and ax its untagged spelling (both standard in the US; Simon): confirmed, status rev'); } }
if (setE(chk(5399, 'taekwondo'), 'fam', 2, 'not every child knows it; nearly every adult does (v420: 1 looked too easy)')) counts.d++;
if (setE(chk(5400, 'tae kwon do'), 'fam', 2, 'as common as taekwondo: the same familiarity (an untagged spelling is never easier than its root)')) counts.d++;

// =================== e. theme names over 24 characters (I33) ===================
A.push('e. Theme names over 24 characters shortened (I33; LIBRARY-RULES 6, Names: short, clear on its own, no member\'s word, no "types of"); ids stay');
const NAMES = [
  ['vegetables_that_are_really_fruits', 'fruits called vegetables'], ['birds_named_after_a_colour', 'birds named for a color'], ['local_status_labels', 'birding status labels'],
  ['deadly_creatures', 'deadly Aussie animals'], ['horned_and_armored_beasts', 'horned and armored dinos'],
  ['things_that_fall_from_trees', 'things trees drop'], ['leaves_and_shoots', 'foraged greens'], ['flowers_with_animal_names', 'animal-named flowers'],
  ['plants_of_the_middle_east', 'Middle Eastern plants'], ['sunrise_and_sunset_sights', 'dawn and dusk sights'], 
  ['eastern_european_countries', 'Eastern European nations'], ['western_european_countries', 'Western European nations'], ['southern_african_countries', 'Southern African nations'],
  ['central_african_lands', 'Central African nations'], ['spanish_speaking_countries', 'Spanish-speaking nations'], ['french_speaking_countries', 'French-speaking nations'],
  ['arabic_speaking_countries', 'Arabic-speaking nations'], ['central_american_countries', 'Central American nations'], ['australian_states_and_regions', 'Australian regions'],
  ['famous_canyons_and_gorges', 'canyons and gorges'], ['places_named_after_people', 'places named for people'], ['places_that_are_also_words', 'places that are words'],
  ['things_you_do_at_the_beach', 'beach activities'], ['plain_names_for_body_parts', 'plain body part names'], ['things_you_do_in_the_bath', 'bath activities'],
  ['positive_traits', 'positive traits'], ['negative_traits', 'negative traits'], ['people_who_work_with_sound', 'jobs working with sound'],
  ['central_and_eastern_european_titles', 'Central European titles'], ['ideologies_named_after_people', 'people-named ideologies'], 
  ['latin_american_currencies', 'Latin American money'], ['four_horsemen_of_the_apocalypse', 'the Four Horsemen'], ['parts_of_a_religious_service', 'religious service parts'],
  ['things_with_a_sharp_blade', 'things with a blade'], ['american_football_positions', 'NFL positions'], ['cricket_fielding_positions', 'cricket field positions'],
  ['players_and_officials', 'cricket roles'], ['sports_played_with_sticks', 'stick sports'], 
  ['weapon_based_martial_arts', 'weapon martial arts'], ['american_football_legends', 'NFL legends'], ['middle_eastern_instruments', 'Middle East instruments'],
  ['classical_dances', 'classical music dances'], ['latin_american_folk_dances', 'Latin folk dances'], 
  ['continental_stage_writers', 'continental playwrights'], ['leading_ladies', 'classic leading ladies'], ['characters_in_tragedies', 'Shakespeare tragic roles'],
  ['children_s_book_characters', "kids' book characters"], ['famous_ruins_and_monuments', 'ruins and monuments'], ['african_historical_leaders', 'historic African leaders'],
  ['mount_rushmore_presidents', 'Mount Rushmore faces'], ['ancient_sites_of_the_middle_east', 'ancient Near East sites'], ['symbols_of_the_greek_gods', "Greek gods' symbols"],
  ['periods_named_after_rulers', 'periods named for rulers'], ['ancient_greek_mathematicians', 'Greek mathematicians'], ['four_great_chinese_inventions', "China's great inventions"],
  ['middle_eastern_inventions', 'Middle East inventions'], ['peace_prize_winners', 'Nobel Peace laureates'], ['old_languages_from_last_century', 'old coding languages'],
  ['ways_to_prove_who_you_are', 'ways to verify identity'], 
  ['steps_of_an_investigation', 'scientific method steps'], 
  ['past_tenses_ending_in_silent_e', 'silent-e past tenses'], ['thank_you_around_the_world', 'thanks around the world'], ['french_phrases_in_english', 'French loan phrases'],
  ['numbers_in_other_languages', 'foreign numbers'], ['archaic_pronouns_and_verb_forms', 'archaic grammar words'], ['old_exclamations', 'old exclamations'],
  ['words_made_of_roman_numerals', 'Roman numeral words'], ['starts_with_public_transport', 'starts with transport'], ['starts_with_a_weather_word', 'starts with weather'],
  ['ends_with_public_transport', 'ends with transport'], ['food_and_dining_words', 'French food words'], ['food_and_drink_words', 'Dutch food words'],
  ['flowers_named_after_people', 'flowers named for people'], ['brand_names_used_as_words', 'brands used as words'], ['entertainment_blends', 'showbiz word blends'],
  ['colors_in_other_languages', 'foreign color words'], ['fruit_shades', 'fruit-named colors'], ['drink_shades', 'drink-named colors'],
  ['colors_named_after_flowers', 'flower-named colors'], ['colors_named_after_animals', 'animal-named colors'], ['colors_named_after_places', 'place-named colors'],
  ['animals_covered_in_spikes', 'spiky animals'], ['things_that_come_in_pairs', 'things in pairs'],
  ['things_you_eat_with_a_spoon', 'eaten with a spoon'],
];
const NAME_KEEP = new Map([   // kept as they are (Simon and the reviewer, 2026-11-23): the short name was weaker
  ['exotic_pets', '"cold-blooded pets" would take in goldfish; no short name excludes fish'], ['famous_mountains_and_ranges', 'Simon: keep'],
  ['southeast_asian_martial_arts', '"SE Asian" is weaker'], ['international_organizations', '"international bodies" is vaguer'],
  ['languages_of_southern_africa', '"tongues" is weaker'], ['native_north_american_languages', '"tongues" is weaker'],
  ['science_experiments_for_kids', '"kids\' experiments" loses science'], ['north_american_folk_dances', 'keeps "folk" (Simon); a short name with folk does not fit 24'],
]);
const NAME_DOUBT = [   // first-draft proposals: Simon keeps the current names (fermented foods and drinks, old ways to keep in touch: twins for the step 3 merge)
  ['eastern_mediterranean_sweets', 'eastern Med sweets', '"Levantine" would leave out Greece and Turkey'], ['alkali_and_alkaline_earth_elements', 'group 1 and 2 metals', 'exact, but less known than the chemistry names'],
  ['continents_and_supercontinents', 'continents, then and now', 'Pangaea is a member, so it cannot name the theme'], ['australian_places', 'Aussie eponymous places', '"eponymous" is not everyday'],
  ['us_cities', 'US eponymous cities', '"eponymous" is not everyday'], ['california_parks', 'California parks', 'drops "national": state parks would fit the name'],
  ['eastern_parks', 'eastern US parks', 'drops "national"'], ['types_of_public_transport', 'public transport', 'sits beside "public transport words" (public_transportation)'],
  ['things_for_watching_shows', 'home viewing devices', 'TV would leak into smart TV'], ['holidays_and_celebrations', 'holidays and festivities', 'a big theme; or "celebrations"'],
  ['things_with_a_carrying_handle', 'handheld carriers', 'things with handles is another theme'], ['office_and_school_supplies', 'desk supplies', 'paper and stationery are members'],
  ['games_with_things_you_throw', 'chance throwing games', 'dice is a member'], ['south_american_soccer_clubs', 'South American clubs', 'drops soccer'],
  ['latin_american_liberators', 'the Liberators', 'El Libertador is a member: may read as a leak'], ['norse_mythology', 'Norse myth things', 'Norse mythology names another sense of the group'],
  ['islamic_golden_age_scholars', 'early Islamic scholars', 'loses the Golden Age'], ['data_structures_and_types', 'coding data types', 'array and stack are structures, not types'],
  ['languages_of_the_americas', 'New World languages', 'holds English and Spanish too'], ['indigenous_south_american_languages', 'South American tongues', 'loses "native"'],
  ['old_adverbs_and_prepositions', 'archaic adverbs', 'betwixt and ere are prepositions'], ['starts_with_a_musical_instrument', 'starts with instrument', 'grammar'],
  ['numbers_with_the_first_letter_changed', 'numbers, letter swapped', 'wordplay: the rule must stay clear'], ['toys_and_characters', 'characters with eyes', 'under things with eyes'],
  ['flowers_used_as_girls_names', "girls' flower names", 'LIBRARY-RULES 5 (given names) names this theme'], ['sci_fi_and_fantasy_authors', 'sci-fi/fantasy authors', 'a slash in a game title'],
  ['fermented_foods_and_drinks', 'fermented fare', 'fermented foods (fermented_foods) is another theme: a twin to merge?'],
  ['old_ways_to_keep_in_touch', 'retro contact methods', 'old ways to communicate (old_ways_to_communicate) is another theme: a twin to merge?'],
];
const allNames = new Map(P.themes.map(t => [t.name.toLowerCase(), t.id]));
let renamed = 0; const NERR = [];
for (const [tid, name] of NAMES) {
  const t = T(tid); if (t.name === name) continue;
  try {
  const len = [...name].length; if (len > 24) throw Error(`${tid}: "${name}" has ${len} characters`);
  if (/\b(types|kinds) of\b/i.test(name)) throw Error(`${tid}: types of`);
  const other = allNames.get(name.toLowerCase()); if (other && other !== tid) throw Error(`${tid}: "${name}" is the name of ${other}`);
  const leaks = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined).map(e => [e, nameLeak({ ...t, name }, e.show?.[tid] ? { ...e, text: e.show[tid] } : e)]).filter(x => x[1]);
  const leaks0 = new Set((ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && nameLeak(t, e.show?.[tid] ? { ...e, text: e.show[tid] } : e)).map(e => e.id));
  const fresh = leaks.filter(([e]) => !leaks0.has(e.id));
  if (fresh.length) throw Error(`${tid} "${name}": members leak: ${fresh.map(([e, w]) => e.text + ' (' + w + ')').join(', ')}`);
  A.push(`theme ${tid}: "${t.name}" (${[...t.name].length}) -> "${name}" (${len})`); allNames.delete(t.name.toLowerCase()); allNames.set(name.toLowerCase(), tid);
  t.name = name; n++; renamed++;
  } catch (err) { NERR.push(err.message); }
}
if (NERR.length) throw Error(NERR.join(' | '));
const longLeft = P.themes.filter(t => [...t.name].length > 24 && !NAME_DOUBT.some(([id]) => id === t.id) && !NAME_KEEP.has(t.id));
if (longLeft.length) throw Error('names over 24 not decided: ' + longLeft.map(t => t.id + ' "' + t.name + '"').join(', '));

// =================== orphans left, with reasons ===================
const OUTOF = new Map();   // "out of <theme>: <text> <id>: <why>" lines of earlier batches
for (const f of fs.readdirSync(new URL('./', import.meta.url)).filter(f => /^batch\d+-review\.txt$/.test(f)).sort()) {
  const s = fs.readFileSync(new URL('./' + f, import.meta.url), 'utf8');
  for (const m of s.matchAll(/out of ([a-z0-9_]+): (.+?) (\d+): ([^(\n]+)/g)) OUTOF.set(+m[3], `${f.replace('-review.txt', '')}: out of ${m[1]}: ${m[4].trim()}`);
}
const WHY = new Map([
  ...[32292, 32357, 32007, 32003, 31915, 31978, 32262, 41335].map(id => [id, 'its text is (or repeats) the name of the theme it would fit (climate change, public transport words, water cycle, erosion, nutrients, protected areas, launch pad)']),
  ...[13744].map(id => [id, 'left out of magic shows in v430 (the general word beside its kinds)']),
  ...[22426, 29041].map(id => [id, 'left by v432 (offensive pass)']),
  ...[35765, 36213, 36214].map(id => [id, 'unlinked by Simon in v411 (complete sets): no Canadian territories or overseas-departments theme']),
  ...[63345].map(id => [id, 'a real word (the bass guitar), but no theme takes the bare word']),
  ...[10905].map(id => [id, 'lowercase "bollywood" [Indian film music]: no theme; the proper Bollywood (film industry) would need its own entry']),
  ...[25709].map(id => [id, 'lockpick, promoted from pick [tool] by this batch: no theme of locks or burglary tools']),
  ...[31913, 31914, 31908, 31909].map(id => [id, 'Earth\'s layers words left by v415 (layers of the earth holds inner and outer core)']),
]);
const leftNow = orphans0.filter(id => ix.entry.get(id) && !E(id).aliasOf && !linkIds(P, E(id)).length);
if (ix.entry.get(25709) && !E(25709).aliasOf && !linkIds(P, E(25709)).length && !leftNow.includes(25709)) leftNow.push(25709);
counts.a.left = leftNow.length;
const leftLines = leftNow.map(id => { const e = E(id); return `  ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''} (${e.status}, familiarity ${e.fam}): ${WHY.get(id) || OUTOF.get(id) || (e.status === 'gen' ? 'a generated word with no clearly right theme (left for the group-by-group pass, step 3)' : 'no clearly right theme (left for the group-by-group pass, step 3)')}`; });

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
// a merge or swap changes the survivor's links: they count as touched above

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
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to index ${tLast} ("${x1.themes[tLast]}", was "${x0.themes[tLast]}")`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entry rows ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${id} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const toAliasRows = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(name);
const toRootRows = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] === 0 && x0.root[ia.get(id)] !== 0).map(name);
cmp.push(`root -> alias rows ${toAliasRows.length}: ${toAliasRows.join(', ') || 'none'}; alias -> root rows ${toRootRows.length}: ${toRootRows.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${name(x1.ids[firstLinkShift])}) on, link positions move`}`);
const textChanged = x1.ids.filter((id, i) => ia.has(id) && x0.text[ia.get(id)] !== x1.text[i]).map(id => `${name(id)} (was "${x0.text[ia.get(id)]}")`);
cmp.push(`Rows whose text changed: ${textChanged.join(', ') || 'none'}`);
{ // characters the export never had before (entry texts, shown texts, theme names): the game's font may lack them, so the notice lists them (_WS_, 2026-11-23)
  const chars = x => { const s = new Set(); for (const t of [...x.text, ...x.shown.map(v => v[0]), ...x.themeRows.map(r => r[1])]) for (const ch of String(t)) s.add(ch); return s; };
  const had = new Set([...chars(x0), ...(baseOk ? chars({ text: CE.text, shown: CF.shown || [], themeRows: CF.themes }) : [])]);
  const fresh = [...chars(x1)].filter(ch => !had.has(ch));
  const where = ch => x1.text.filter(t => t.includes(ch)).slice(0, 3).join(', ') || x1.themeRows.map(r => r[1]).filter(t => String(t).includes(ch)).slice(0, 3).join(', ');
  cmp.push(`New characters in the export (list them in the notice: the game font needs them): ${fresh.map(ch => `${ch} U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')} (${where(ch)})`).join(', ') || 'none'}`); }
{ const F = x1.themeFields, pi = F.indexOf('parent'), row = (x, r) => F.map((f, k) => k === pi ? (r[k] === null || r[k] === undefined || r[k] < 0 ? r[k] : x.themes[r[k]]) : r[k]);
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
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = [`Library batch v433: tidy-up step 1, parts a-e (TIDY-UP.md). a. orphans: ${counts.a.deleted} deleted, ${counts.a.alias} made aliases, ${counts.a.linked} linked, ${counts.a.left} left (reasons below); b. ${counts.b} stale nameOkIn keys removed; c. ${counts.c} second roots of one sense merged; d. ${counts.d} I32 fixes; e. ${renamed} theme names shortened, ${NAME_KEEP.size + NAME_DOUBT.length} kept.`,
  ...A.map(x => /^[a-d]\./.test(x) || x.startsWith('  ') ? x : '  ' + x),
  `a. Orphans left in no theme (${leftLines.length}), with the reason:`, ...leftLines,
  `c. Not merged (${SKIP.length} skipped by the script; Simon's answers below):`, ...SKIP.map(x => '  ' + x), ...UNCLEAR.map(x => '  ' + x),
  `e. Theme names: ${renamed} shortened; ${NAME_KEEP.size + NAME_DOUBT.length} kept over 24 characters (Simon). Kept because the short name was weaker:`, ...[...NAME_KEEP].map(([id, why]) => `  ${id} "${T(id).name}" (${[...T(id).name].length}): ${why}`),
  'Kept (Simon: keep the current names); fermented foods and drinks and old ways to keep in touch go to the step 3 merge list as twins of fermented foods and old ways to communicate; flowers used as girls\' names stays (LIBRARY-RULES 5, given names, names it). First-draft proposal, not applied:', ...NAME_DOUBT.map(([id, p, why]) => `  ${id} "${T(id).name}" (${[...T(id).name].length}) -> "${p}" (${[...p].length}): ${why}`),
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch433-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
