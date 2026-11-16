// Library batch v381 (2026-11-16, Simon: "do all" of the T15/T23 remainder, "Fix the five places typed common"; the calls delegated to the manager's agent).
//   Closes ISSUES.md T15 and T23. Five kinds of change, each with its reason in the tables below and in tools/gen/batch381-changes.txt:
//   1. RECASE: written form, type, tm of single entries (places typed common, the doubtful words, the v379 medium re-judgement, brand types, grapes).
//   2. MERGE: one word stored twice under two spellings becomes one root with the other a spelling alias (DESIGN.md 3.1: a spelling alias holds no links,
//      so its links and synonym groups move to the root; both ids stay, so no export index shifts). Root = the correctly written form; for Doberman the
//      US spelling, Dobermann the UK spelling alias (DESIGN-entries.md 3.4, spelling pairs).
//   3. SPLIT: hokkaido served the island and the squash; the squash link moves to a new entry "Hokkaido squash" shown "Hokkaido" (3.6: the member is the full term).
//   4. MOVE: a link held by the wrong entry moves to the right one (worcestershire in "words named after places" means the sauce; serviceberry in
//      "Canadian cities" meant the city Saskatoon, which had no entry).
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch381.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
// [id, old text, new text, new type, tm (undefined: unchanged), reason]
const GRAPE = 'grape variety: lowercase (group decision: M-W, AP and Chicago lowercase varietals, Oxford capitalises; dictionaries disagree for an ordinary noun, cheddar rule; as merlot, syrah, chardonnay)';
const RECASE = [
  // 1. places typed common, and the cattle breed of the same name
  [9348, 'limousin', 'Limousin', 'place', undefined, 'French region; every sibling in "French regions" is place'],
  [17506, 'hokkaido', 'Hokkaido', 'place', undefined, 'Japanese island; every sibling in "famous islands" is place (squash sense split off, below)'],
  [28047, 'dundee', 'Dundee', 'place', undefined, 'Scottish city; "British cities" is place but for Lincoln'],
  [28233, 'rhine', 'Rhine', 'place', undefined, 'river; every sibling in "famous rivers" and "European rivers" is place'],
  [59409, 'samara', 'Samara', 'place', undefined, 'Russian city; siblings place; 30094 samara [seed] stays common, glosses differ'],
  [29563, 'worcestershire', 'Worcestershire', 'place', undefined, 'English county; siblings place (its "words named after places" link moved to the sauce, below)'],
  [50045, 'limousin', 'Limousin', 'proper', undefined, 'cattle breed, after the region; breed names are proper (Charolais, Simmental); differs from 9348 [French region] by gloss, no shared theme'],
  // 3. brand types
  [53780, 'AeroPress', 'AeroPress', 'org', true, 'brand name (the maker sells under it), not a model within a range: org with tm (Brand types; Thermos, Crock-Pot, Hoover)'],
  [53781, 'Chemex', 'Chemex', 'org', true, 'brand name (Chemex Corporation), as AeroPress: org with tm'],
  // 4. v379 medium list re-judged: reverted to lowercase
  [17950, 'Cotija', 'cotija', 'common', undefined, 'reverted: M-W enters it lowercase, Oxford has no entry; an ordinary supermarket cheese name (cheddar rule; brie, camembert stay lowercase)'],
  [24684, 'Panama', 'panama', 'common', undefined, 'reverted: M-W "panama" lowercase (often capitalized), Oxford "Panama"; dictionaries disagree, ordinary noun; 55447 panama hat is lowercase'],
  [45428, 'Klondike', 'klondike', 'common', undefined, 'reverted: M-W "klondike" lowercase (often capitalized), Oxford capital; card-game names are lowercase (canasta, spider); grouped with solitaire'],
  // 5. the doubtful words decided for a capital
  [17956, 'swiss', 'Swiss', 'proper', undefined, 'cheese: M-W and Oxford write Swiss cheese / Swiss with a capital; American [processed slice] is proper in the same theme; nationality word'],
  [261, 'chihuahua', 'Chihuahua', 'proper', undefined, 'dog: M-W and Oxford capital; Pomeranian, Maltese, Pekingese proper; 50321 Chihuahua [city] differs by gloss'],
  [16288, 'jacuzzi', 'Jacuzzi', 'org', true, 'trademark; M-W and Oxford capital; brand name: org with tm (Brand types; Hoover, Velcro in the same theme)'],
  [29559, 'bakelite', 'Bakelite', 'org', true, 'trademark; M-W and Oxford capital; brand name: org with tm (Velcro, Lexan, Delrin)'],
  [18975, 'caesar salad', 'Caesar salad', 'proper', undefined, 'the salad of the same name, capital in both dictionaries; its shown text in "salads" follows'],   // before the dressing: it shows "caesar"
  [53228, 'caesar', 'Caesar', 'proper', undefined, 'dressing: M-W and Oxford Caesar salad, capital (after Caesar Cardini); Catalina, Louis dressing proper in the theme'],
  [19292, 'thousand island', 'Thousand Island', 'proper', undefined, 'dressing: M-W and Oxford Thousand Island dressing, capital (the Thousand Islands)'],
  [27554, 'caesar', 'Caesar', 'proper', undefined, 'Canadian cocktail: Canadian Oxford and Canadian usage "Caesar"; same name as the dressing'],
  [50224, 'florentine', 'Florentine', 'proper', undefined, 'demonym (of Florence): dictionaries capital; all 39 siblings in "city demonyms" proper; florentine [cookie] stays lowercase'],
  // grape varieties: one group decision, lowercase
  ...[[59833, 'Xinomavro'], [59835, 'Aglianico'], [59836, 'Touriga Nacional'], [59837, 'Blaufränkisch'], [59838, 'Zweigelt'], [59839, 'Saperavi'], [59840, 'Corvina'],
    [59841, 'Mencía'], [59842, 'Negroamaro'], [59845, 'Sagrantino'], [59846, 'Agiorgitiko'], [59847, 'Dornfelder'], [59848, 'Furmint'], [59849, 'Godello'], [59850, 'Arneis'],
    [59851, 'Savagnin'], [59852, 'Roussanne'], [59853, 'Garganega'], [59854, 'Vernaccia'], [59855, 'Falanghina'], [59856, 'Silvaner'], [59857, 'Malvasia']]
    .map(([id, t]) => [id, t, t.toLowerCase(), 'common', undefined, GRAPE]),
  [59834, "Nero d'Avola", "nero d'Avola", 'proper', undefined, 'grape variety: lowercase by the group decision; Avola (a town) keeps its capital, so the phrase stays proper'],
];
// Merges: [root id, root text, alias id, alias text, alias region, root fam, reason]
const MERGE = [
  [19293, 'Gruyère', 253, 'Gruyere', [], 3, 'cheese of Gruyères: Oxford and M-W capital; root keeps the accent, the plain spelling is its alias (as crème brûlée / creme brulee); fam 3 (the more familiar of 3 and 4)'],
  [53085, 'Comté', 17937, 'Comte', [], 4, 'cheese of Franche-Comté; capital as Gruyère; root keeps the accent'],
  [53113, 'Époisses', 17948, 'Epoisses', [], 5, 'cheese of Époisses (village); capital; root keeps the accent'],
  [9276, 'Doberman', 51073, 'Dobermann', ['UK'], 2, 'one breed: US spelling Doberman (AKC) is the root, UK Dobermann (Kennel Club) a spelling alias tagged UK (spelling pairs); proper, as Dobermann was'],
];
const OTHER_SHOW = new Set([66363, 66498]);   // Dundee cake shown "dundee" in "___ cake", rhinestone shown "rhine" in "___ stone" (a compound theme shows the leftover part): another entry, left as it is
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'region', 'aliasOf', 'aliasKind', 'status'];
const short = e => KEYS.filter(k => !(k === 'region' && !e.region?.length) && !(k === 'aliasOf' && !e.aliasOf) && !(k === 'aliasKind' && !e.aliasKind)).map(k => `${k}=${JSON.stringify(e[k])}`).join(' ') + ' typ=' + JSON.stringify(e.typ) + (e.show && Object.keys(e.show).length ? ' show=' + JSON.stringify(e.show) : '');
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const groupsWith = id => { const r = []; for (const t of P.themes) for (const g of t.groups || []) if (g.includes(id)) r.push([t, g]); return r; };
const swapInGroups = (from, to, only) => { for (const t of P.themes) { if (only && t.id !== only || !t.groups) continue; t.groups = t.groups.map(g => g.includes(from) ? [...new Set(g.map(x => x === from ? to : x))] : g); const hit = t.groups.filter(g => g.includes(to)); if (hit.length > 1) t.groups = [...t.groups.filter(g => !hit.includes(g)), [...new Set(hit.flat())]]; } };
const log = [];
let n = 0;
// 1. recase
for (const [id, old, text, type, tm, why] of RECASE) {
  const e = E(id);
  if (e.text === text && (e.type || 'common') === type && (tm === undefined || !!e.tm === tm)) continue;
  if (e.text !== old) throw Error(`entry ${id} is "${e.text}", expected "${old}"`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length) throw Error(`entry ${id} has aliases or use: check by hand`);
  const twin = P.entries.find(x => x !== e && x.text === text && (x.gloss || '') === (e.gloss || '')); if (twin) throw Error(`"${text}" [${e.gloss}] would repeat ${twin.id}`);
  const elsewhere = P.entries.find(x => x !== e && Object.values(x.show || {}).includes(old)); if (elsewhere && old !== text && !OTHER_SHOW.has(elsewhere.id)) throw Error(`entry ${elsewhere.id} shows "${old}": check by hand`);
  const d = [`"${e.text}" -> "${text}"`]; if ((e.type || 'common') !== type) d.push(`type ${e.type || 'common'} -> ${type}`);
  if (tm !== undefined && !!e.tm !== tm) { d.push(`tm ${!!e.tm} -> ${tm}`); e.tm = tm; } else if (e.tm) d.push('tm (kept)');
  for (const [k, v] of Object.entries(e.show || {})) if (v.toLowerCase() === old.toLowerCase().split(' ')[0] && v !== text.split(' ')[0]) { d.push(`show ${k} "${v}" -> "${text.split(' ')[0]}"`); e.show[k] = text.split(' ')[0]; }
  log.push(`${id} ${d.join('  ')}${e.gloss ? '  [' + e.gloss + ']' : ''}  (${why})`);
  e.text = text; e.type = type; n++;
}
// 2. merges
for (const [rid, rtext, aid, atext, region, fam, why] of MERGE) {
  const r = E(rid), a = E(aid);
  if (a.aliasOf === rid && r.text === rtext && a.text === atext && !Object.keys(a.typ).length) continue;
  if (a.aliasOf || r.aliasOf || P.entries.some(x => x.aliasOf === aid) || Object.keys(a.use || {}).length || Object.keys(r.use || {}).length) throw Error(`merge ${rid}/${aid}: aliases or use, check by hand`);
  if (P.entries.some(x => x.use && Object.values(x.use).includes(aid))) throw Error(`merge ${rid}/${aid}: a use points at ${aid}`);
  const wasR = short(r), wasA = short(a), moved = [];
  for (const [tid, v] of Object.entries(a.typ)) {
    if (tid in r.typ) throw Error(`merge ${rid}/${aid}: both in ${tid}, check by hand`);
    r.typ[tid] = v; if (a.show?.[tid]) { r.show ||= {}; r.show[tid] = a.show[tid]; }
    if (a.nameOkIn?.includes(tid)) r.nameOkIn = [...new Set([...(r.nameOkIn || []), tid])];
    moved.push(tid);
  }
  const gs = groupsWith(aid).map(([t]) => t.id); swapInGroups(aid, rid);
  Object.assign(r, { text: rtext, type: 'proper', fam });   // all four roots are names
  Object.assign(a, { text: atext, type: r.type, typ: {}, show: {}, use: {}, nameOkIn: [], aliasOf: rid, aliasKind: 'spelling', region: [...region], fam });
  r.tm ||= a.tm;
  log.push(`${rid} before: ${wasR}\n${aid} before: ${wasA}\n${rid} after:  ${short(r)}\n${aid} after:  ${short(a)}\n  links moved to ${rid}: ${moved.join(', ')}${gs.length ? '; groups: ' + gs.map(t => t + ' ' + JSON.stringify(groupsWith(rid).find(([x]) => x.id === t)[1])).join(', ') : ''}\n  (${why})`);
  n++;
}
// 3. split: the squash sense of 17506 hokkaido
{
  const e = E(17506), done = P.entries.find(x => x.text === 'Hokkaido squash');
  if (!done) {
    if (!('squashes' in e.typ)) throw Error('17506 not in squashes');
    const x = addEntry(P, 'Hokkaido squash', { type: 'proper', pos: 'noun', fam: 5, status: e.status, typ: { squashes: e.typ.squashes }, show: { squashes: 'Hokkaido' } });
    delete e.typ.squashes; swapInGroups(17506, x.id, 'squashes');
    const was = e.fam; e.fam = 4; e.typ.famous_islands = 4;
    log.push(`17506 Hokkaido [island]: link squashes moved; fam ${was} -> 4, famous_islands typicality 5 -> 4 (as Honshu f4t4; the merged 5/5 was the squash's)  typ=${JSON.stringify(e.typ)}\n${x.id} new: ${short(x)}  group squashes ${JSON.stringify(groupsWith(x.id)[0]?.[1])}\n  (the squash is called Hokkaido squash or Hokkaido pumpkin (also red kuri, its group partner); a full term shown short, as butternut squash shown "butternut")`);
    n++;
  } else if ('squashes' in e.typ) throw Error('hokkaido half done');
}
// 4. moves
{
  const w = E(29563), sauce = E(773);
  if ('words_named_after_places' in w.typ) {
    if (sauce.text !== 'Worcestershire sauce' || 'words_named_after_places' in sauce.typ) throw Error('773 not as expected');
    sauce.typ.words_named_after_places = w.typ.words_named_after_places; sauce.show.words_named_after_places = 'Worcestershire';
    delete w.typ.words_named_after_places;
    log.push(`29563 Worcestershire [county]: link "words named after places" (typicality ${sauce.typ.words_named_after_places}) moved to 773 Worcestershire sauce, shown "Worcestershire" there; 29563 keeps English counties\n  (the word named after a place is the sauce's name; one entry per sense, as erlang and balboa at v380)`);
    n++;
  }
  const s = E(17197), city = P.entries.find(x => x.text === 'Saskatoon' && x.gloss === 'city');
  if ('canadian_cities' in s.typ) {
    if (city) throw Error('Saskatoon [city] exists while serviceberry still has the link');
    const x = addEntry(P, 'Saskatoon', { gloss: 'city', type: 'place', pos: 'noun', fam: 4, status: s.status, typ: { canadian_cities: 4 } });
    delete s.typ.canadian_cities;
    log.push(`17197 serviceberry: link "Canadian cities" removed (typ ${JSON.stringify(s.typ)})\n${x.id} new: ${short(x)}\n  (the link meant the city Saskatoon, which had no entry: only 17198 saskatoon [serviceberry], a regional alias of the berry; fam 4 and typicality 4 as Regina, a smaller city; the old 5/5 was the berry's)`);
    n++;
  }
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = `Method: each call from Oxford and Merriam-Webster usage, the library's rules (DESIGN-entries.md: capital rule, style rule, Brand types) and the
siblings in the same theme. Where the dictionaries disagree for a word that has become an ordinary noun, it stays lowercase (the cheddar rule).
Git history: none of these words was set by Simon before (T15 candidate pass, tools/gen/t15-hist.mjs; git log); Balboa [dance] capital is Simon's ruling of 2026-11-16.

Left unchanged (decided lowercase, common; dictionaries disagree, ordinary nouns):
  240 brie (M-W brie, Oxford Brie), 241 parmesan (M-W parmesan often capitalized, Oxford Parmesan), 244 camembert (M-W camembert, Oxford Camembert),
  593 danish [pastry] (M-W danish, Oxford Danish; 62422 Danish pastry stays proper, a phrase with the nationality word),
  18160 florentine [cookie] (M-W florentine, Oxford florentine for the biscuit), 19611 manhattan [cocktail] (M-W manhattan, Oxford Manhattan),
  19643 gibson [cocktail] (M-W gibson, Oxford Gibson); siblings martini, negroni, daiquiri are lowercase.
  Grape varieties already lowercase (merlot, shiraz, syrah, malbec, zinfandel, chardonnay, riesling and the rest): kept.
Kept capital (v379 medium list re-judged): 55369 Ankara [fabric] (no dictionary entry; Nigerian and fashion usage capitalise; a fabric named after
  the city, not an ordinary English noun), 53211 Choron (sauce Choron, after the chef; Mornay sauce and sauce Robert are capital in the same theme).
Grape varieties, group decision: a grape variety name is a lowercase common noun (M-W, AP and Chicago lowercase varietals; Oxford capitalises;
  cheddar rule). A word in it that is only a name keeps its capital: 53837 Müller-Thurgau (after Hermann Müller of Thurgau) stays,
  nero d'Avola keeps Avola. Wines named after places stay capital (Chianti, Bordeaux, Soave, Gavi, Chablis, Valpolicella, Brunello, Lambrusco,
  Liebfraumilch, Sauternes, Tokaji). The 22 grapes lowercased here were capitalised by the capital marking pass (v363-v365, capmark r-1), not by Simon.
Brand types: AeroPress and Chemex are each the maker's brand (not a model in a range), so org with tm; Jacuzzi and Bakelite likewise.
  Other trademarks used as words in "brand names used as words" and the material themes (xerox, teflon, formica, styrofoam, plexiglas, taser,
  photoshop, sharpie, astroturf, muzak, jell-o, rollerblade, portakabin and others) are still lowercase common: not part of this batch (ISSUES.md T24).
Merges: both ids kept; the alias holds no links (a spelling alias never does, DESIGN.md 3.1) and takes the root's type and fam. Root fam: the
  lower (more familiar) of the two. The cheese aliases have no region, as the other accent-free spellings (creme brulee, jalapeno).
  Not checked or changed: the other 61 pairs of roots that differ only by accents (quinceañera / quinceanera, déjà vu / deja vu ...): ISSUES.md T24.
Same-text pairs: Limousin [French region] / Limousin [cattle breed], Samara [city] / samara [seed], Chihuahua [dog] / Chihuahua [city],
  Swiss [cheese] / [nationality] / [airline], Caesar [dressing] / [cocktail] / [Roman], Florentine [of Florence] / florentine [cookie]: glosses
  differ and no two share a theme (Checks maybe-duplicate unchanged at 1).
`;
  fs.writeFileSync(new URL('batch381-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch381.mjs, ${P.lib.modified}): ${n} changes (recase, merges into spelling aliases, a split, two moved links).\n\n${log.join('\n')}\n\n${NOTE}`);
  console.log('library v' + P.lib.version);
}
