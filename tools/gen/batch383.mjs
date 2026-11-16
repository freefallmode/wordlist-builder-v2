// Library batch v383 (2026-11-16, Simon: "Yes, do all six" for ISSUES.md T24). Six groups, each change with its reason below and in tools/gen/batch383-changes.txt:
//   A. FLAG: trademarks used as words get tm (case and type kept: rule 4, lowercase common); words no longer trademarks are left.
//   B/C/E. RECASE: Thermos lowercased (rule 1 tie-break; rule 4), Lycra/Kevlar/Gore-Tex/Tyvek typed org (Brand types), two place-named wines capitalised (rule 1).
//   B/D. SPLIT (as batch380): jeep [safari] keeps the vehicle, a new Jeep [car brand] takes the car-brand links; Google keeps the company, a new google [search the web]
//      takes "brand names used as words".
//   F. MERGE (as batch381): root entries that differ only by accents and are one word in one sense become one root and a spelling alias (links, groups and
//      shown texts move to the root; both ids stay). The script finds every such group itself and prints the verdict for each (merged or left, with the reason).
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch383.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const strip = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/ø/g, 'o').replace(/Ø/g, 'O').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/ł/g, 'l').replace(/đ/g, 'd').replace(/ı/g, 'i').toLowerCase();

// A. [id, text, reason]: tm set, nothing else changed
const TM = 'registered trademark used as a word (rule 4: lowercase common, tm)';
const FLAG = [
  [29569, 'xerox', TM + '; Xerox Corp.'], [29580, 'teflon', TM + '; Chemours'], [29581, 'formica', TM + '; Formica Corp.'], [29574, 'styrofoam', TM + '; DuPont'],
  [29575, 'plexiglas', TM + '; Röhm/Trinseo'], [29571, 'taser', TM + '; Axon'], [29576, 'photoshop', TM + '; Adobe'], [29583, 'sharpie', TM + '; Newell'],
  [29585, 'astroturf', TM + '; AstroTurf LLC'], [29587, 'muzak', TM + '; Mood Media'], [29582, 'jell-o', TM + '; Kraft Heinz'], [29573, 'rollerblade', TM + '; Rollerblade Inc.'],
  [29578, 'portakabin', TM + '; Portakabin Ltd'], [29586, 'breathalyzer', TM + '; M-W and Oxford mark it a trademark'], [29570, 'jet ski', TM + '; Kawasaki'],
  [23980, 'dumpster', TM + '; M-W marks Dumpster a trademark'], [27387, 'tarmac', TM + '; Tarmac (UK); M-W and Oxford mark it a trademark'], [28015, 'ouija', TM + '; Hasbro'],
  [24245, 'bubble wrap', TM + '; Sealed Air'], [3565, 'onesie', TM + '; Gerber Childrenswear (Onesies); its regional alias Babygro has tm'],
  [39992, 'mylar', TM + '; DuPont Teijin (siblings lucite, plexiglass in "plastics" have tm)'],
  [29579, 'jiffy bag', TM + '; Jiffy Packaging (UK); a regional alias of padded envelope with its own link in "brand names used as words"'],
  [48722, 'jeep', TM + '; Jeep (Stellantis); the brand sense is split off below'],
];
// B, C, E. [id, old text, new text, new type, reason]
const RECASE = [
  [3063, 'Thermos', 'thermos', 'common', 'rule 1 tie-break: M-W "thermos" lowercase (genericised in the US, 1963), Oxford "Thermos"; rule 4: its themes (campsite, lunchbox, camping gear, heat science) mean the flask; tm kept'],
  [24847, 'Lycra', 'Lycra', 'org', 'Brand types: a brand name (The Lycra Company), org with tm; capital in M-W and Oxford'],
  [38991, 'Kevlar', 'Kevlar', 'org', 'Brand types: brand name (DuPont), org with tm; capital in M-W and Oxford'],
  [38995, 'Gore-Tex', 'Gore-Tex', 'org', 'Brand types: brand name (W. L. Gore), org with tm; capital in M-W and Oxford'],
  [38996, 'Tyvek', 'Tyvek', 'org', 'Brand types: brand name (DuPont), org with tm; capital in M-W'],
  [53809, 'châteauneuf-du-pape', 'Châteauneuf-du-Pape', 'proper', 'rule 1: M-W and Oxford both capitalise the wine; typed proper as Bordeaux, Côtes du Rhône in "wines named for places"'],
  [53835, 'pouilly-fuissé', 'Pouilly-Fuissé', 'proper', 'rule 1: M-W and Oxford both capitalise the wine; proper as Chablis, Sancerre siblings'],
];
// B, D. old id, old text, moved themes, new sense { text, gloss, type, pos, fam, tm }, reason
const SPLIT = [
  [48722, 'jeep', ['car_brands', 'american_car_brands'], { text: 'Jeep', gloss: 'car brand', type: 'org', fam: 2, tm: true },
    'the car brand is a name (rule 4: brand sense capital, org, tm); siblings Ford, Chevrolet, Dodge [car brand] are org; tm as Rivian and the British car brands (Brand types); jeep [safari] keeps the vehicle (safari words, car types, military vehicles, brand names used as words)'],
  [181, 'Google', ['brand_names_used_as_words'], { text: 'google', gloss: 'search the web', type: 'common', pos: 'verb', fam: 1, tm: true, keepGloss: 'company' },
    'the word in "brand names used as words" is the verb (M-W "google", often capitalized; Oxford "google"): rule 1 tie-break and rule 4, lowercase common with tm; Google [company] stays capital org in the tech-company themes'],
];
// F. [root id, alias id, reason]: the root keeps its text, type, gloss; the other becomes its spelling alias
const ACC = 'the accented form is the standard spelling in English reference usage';
const PREC = 'accented root, plain spelling alias, as Gruyère, crème brûlée, jalapeño, köfte';
const MERGE = [
  [5188, 32559, 'quinceañera: M-W quinceañera; ' + PREC], [5237, 38523, 'pesäpallo: the sport\'s name in English sources; ' + PREC],
  [5529, 44647, 'Emil Zátopek: one person; ' + ACC], [5884, 12031, 'papier-mâché: M-W and Oxford; ' + PREC], [6274, 11756, 'fouetté: M-W and Oxford; as plié, jeté'],
  [6880, 21797, 'Ötzi: one person (the Iceman); ' + ACC], [6906, 21788, 'Çatalhöyük: one site; ' + ACC], [6907, 21787, 'Göbekli Tepe: one site; ' + ACC],
  [38535, 10607, 'cajón: one instrument; ' + PREC + ', bodhrán'], [62513, 11754, 'grand jeté: as jeté'], [42174, 13202, 'García Márquez: one person; as Gabriel García Márquez'],
  [16082, 29288, 'déjà vu: M-W and Oxford'], [53687, 16737, 'açaí: M-W and Oxford açaí; as açaí bowl'], [53687, 62997, 'açaí: a half-accented spelling of the same fruit'],
  [53686, 16752, 'lúcuma: ' + PREC], [62451, 17471, 'frisée: M-W and Oxford'], [53682, 17660, 'chuño: ' + PREC], [53696, 17761, 'linguiça: ' + PREC],
  [53280, 17779, 'jamón ibérico: ' + PREC], [53400, 18826, 'cacık: as köfte, börek (Turkish dishes keep the Turkish letters)'], [53271, 19117, 'crêpe: Oxford crêpe, M-W crepe (also crêpe); as crêpe Suzette; crepe [fabric] stays a separate root'],
  [53369, 19321, 'pastırma: as köfte'], [59703, 19327, 'çiğ köfte: as köfte'], [19423, 53691, 'guarana: M-W and Oxford write it without the accent, so the plain form is the root'],
  [53702, 19427, 'choripán: ' + PREC], [62457, 19431, 'ají amarillo: ' + PREC], [19612, 48869, 'piña colada: M-W and Oxford; the phrase-typed duplicate becomes its alias'],
  [42215, 20441, 'Sacsayhuamán: one site; ' + ACC], [57375, 20643, 'Süleymaniye Mosque: one building; ' + ACC], [20677, 22516, 'Cú Chulainn: one hero; Irish spelling, as in Oxford reference works'],
  [20682, 22250, 'Tuatha Dé Danann: as Cú Chulainn'], [21439, 33537, 'détente: M-W and Oxford'], [54512, 21522, 'Simón Bolívar: one person; ' + ACC],
  [54525, 21543, 'Benito Juárez: one person; ' + ACC], [26865, 26570, 'voilà: M-W voilà (also voila); as olé'], [26808, 32512, 'tschüss: German spelling; ü is standard'],
  [26864, 61438, 'bon appétit: M-W and Oxford'], [48667, 30846, 'arête: M-W and Oxford'], [57154, 36542, 'Popocatépetl: one volcano; ' + ACC],
  [57340, 36792, 'Paraná: one river; ' + ACC], [57284, 36801, 'Rhône: one river; Oxford and Britannica Rhône'], [57417, 37238, 'Place Vendôme: one square; ' + ACC],
  [57404, 37254, 'Champs-Élysées: one street; ' + ACC], [57407, 37311, 'Musée d\'Orsay: one museum; ' + ACC], [57165, 37697, 'Paricutín: one volcano; ' + ACC],
  [44386, 37800, 'Santiago Bernabéu: one stadium; ' + ACC], [57215, 41020, 'Galápagos: the islands; ' + ACC + '; Galapagos [island giant] tortoise stays separate'],
  [48870, 43529, 'après-ski: M-W and Oxford'], [53607, 53186, 'bun cha: Vietnamese dish names are written without tone marks in English (as pho), so the plain form is the root'],
  [53288, 62439, 'turrón: ' + PREC], [54276, 60650, 'Gjøa: one ship; ' + ACC],
];
// F. groups left, by stripped text: reason
const MAORI = 'Māori word: English dictionaries write it without macrons, but "Māori words" (a foreign-language theme, locked) needs the macron form; one root would either drop the macrons there or put them in the English themes: for Simon (one decision for all Māori words; rongoā is a macron root)';
const LEAVE = {
  'indigo': 'different words: índigo is the Spanish colour word (foreign theme), IndiGo an airline', 'yogurt': 'yoğurt is the Turkish word in "Turkish everyday words" (foreign theme); yogurt is the English word with its own alias yoghurt',
  'rose': 'different words and senses (rosé wine; rose flower, colour, name, gem)', 'pokemon': 'three senses with different types (Pokémon [video game] title; Pokemon [anime], [card game] proper): not one entry; the accent on the two is a separate call (the trademark is written Pokémon)',
  'pantheon': 'different buildings (Panthéon in Paris, Pantheon in Rome) and common senses', 'ancien regime': 'types differ (Ancien Régime proper in historical periods, ancien regime common in French revolution): a capital call first (M-W and Oxford lowercase ancien régime): for Simon',
  'sable': 'different words (sablé biscuit; sable colour, animal, antelope)', 'vicuna': '9719 vicuña already has the spelling alias 9720 "vicuna"; making 7939 vicuna [animal] a second "vicuna" alias would repeat it: needs 7939 deleted after its links move (Simon)',
  'kakapo': MAORI, 'kaka': 'Kaká is a footballer; kaka [parrot] / kākā: ' + MAORI, 'whanau': MAORI, 'pakeha': MAORI, 'pukeko': MAORI, 'tui': 'TUI is an airline; tui / tūī: ' + MAORI,
  'weta': MAORI, 'pohutukawa': MAORI, 'kaikoura': 'Māori place name (Kaikōura is the official spelling since 2016, English sources mostly Kaikoura): the same macron decision as the Māori words', 'tane': 'different senses: Tane [god] proper, tāne the Māori word for man',
  'agogo': '46480 agogô already has the spelling alias 46481 "agogo"; making 10617 a second one would repeat it: needs 10617 deleted after its links move (Simon)',
  'san sebastian': 'different senses: San Sebastian [film festival] proper, San Sebastián the city', 'droewors': 'regions differ (droewors tagged ZA, droëwors none): the root\'s region is a call; a spelling alias carries US or UK only',
  'dragees': 'both are linked in "cake decorations" (a duplicate there), and dragees has the regional alias cachous to re-parent: needs a hand merge (Simon)',
  'raki': 'rakı is in "Turkish everyday words" (foreign theme), raki is the English word (M-W, Oxford) in English themes: two forms for two theme kinds', 'doner': 'as raki: döner in "Turkish everyday words" (foreign), doner (M-W, Oxford doner kebab) in "words from Turkish"',
  'cay': 'different words (çay Turkish tea; cay a small island)', 'sari': 'different words (sari garment; sarı Turkish yellow)', 'maitre d\'': '20027 maître d\' already has the spelling alias 20028 "maitre d\'"; 33023 would repeat it: needs 33023 deleted after its link moves (Simon)',
  'are': 'different words (are verb; Åre ski resort)', 'bolivar': 'different senses (bolivar currency; Bolívar club)', 'san jose': 'different places (San Jose, California; San José, Costa Rica)',
  'cordoba': 'different senses (Córdoba city; cordoba currency)', 'medoc': 'different senses (Médoc wine region; Medoc marathon)', 'munster': 'different senses (Munster province and cheese; Münster city)',
  'lame': 'different words (lame; lamé fabric)', 'coupe': 'different senses (coupé fencing; coupe car with its alias coupé; coupe glass)',
  'vuelta a espana': '47963 Vuelta a Espana already has the spelling alias 47965 "Vuelta a España", the text of root 44325: a three-way merge with its abbreviation alias the Vuelta re-parented: for Simon',
  'orleans': 'different senses (siege of Orléans, house of Orleans, the city)', 'vitoria': 'different places (Vitoria, Spain; Vitória, Brazil)', 'belem': 'different places (Belém, Brazil; Belem Tower, Lisbon)',
  'marron': 'different languages (marrón Spanish, marron French colour words)',
};
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'region', 'aliasOf', 'aliasKind', 'status'];
const short = e => KEYS.filter(k => !(k === 'region' && !e.region?.length) && !(k === 'aliasOf' && !e.aliasOf) && !(k === 'aliasKind' && !e.aliasKind) && !(k === 'gloss' && !e.gloss)).map(k => `${k}=${JSON.stringify(e[k])}`).join(' ') + ' typ=' + JSON.stringify(e.typ) + (e.show && Object.keys(e.show).length ? ' show=' + JSON.stringify(e.show) : '') + (e.nameOkIn?.length ? ' nameOkIn=' + JSON.stringify(e.nameOkIn) : '');
let msgs = new Set();
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } msgs = [msgs, m]; return c; };
const before = count();
const groupsWith = id => { const r = []; for (const t of P.themes) for (const g of t.groups || []) if (g.includes(id)) r.push([t, g]); return r; };
const swapInGroups = (from, to, only) => { for (const t of P.themes) { if (only && t.id !== only || !t.groups) continue; t.groups = t.groups.map(g => g.includes(from) ? [...new Set(g.map(x => x === from ? to : x))] : g); const hit = t.groups.filter(g => g.includes(to)); if (hit.length > 1) t.groups = [...t.groups.filter(g => !hit.includes(g)), [...new Set(hit.flat())]]; } };
const log = { A: [], B: [], C: [], D: [], E: [], F: [] };
let n = 0;
// F, listed first from the unchanged library: every group of roots whose texts differ only by accents
const pairList = [];
{
  const m = new Map(); for (const e of P.entries) if (!e.aliasOf) { const k = strip(e.text); if (!m.has(k)) m.set(k, []); m.get(k).push(e); }
  const merged = new Set(MERGE.flatMap(([r, a]) => [r, a]));
  for (const x of P.entries) if (x.aliasOf && x.aliasKind === 'spelling' && MERGE.some(([r, a]) => a === x.id)) merged.add(x.id);
  for (const [k, es] of m) {
    if (es.length < 2 || new Set(es.map(e => e.text.toLowerCase())).size < 2) continue;
    const ids = es.map(e => e.id), mergedHere = ids.filter(i => merged.has(i));
    const verdict = mergedHere.length ? 'merged' : LEAVE[k] ? 'left: ' + LEAVE[k] : null;
    if (!verdict) throw Error(`accent group "${k}" (${ids}) has no verdict`);
    pairList.push(`  ${k}: ${es.map(e => `${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''} (${e.type || 'common'})`).join(' / ')}  -> ${verdict}`);
  }
  for (const k of Object.keys(LEAVE)) if (!m.has(k) || m.get(k).length < 2) throw Error(`LEAVE key "${k}" matches no group`);
}
// A. tm flags
for (const [id, text, why] of FLAG) {
  const e = E(id); if (e.text !== text) throw Error(`entry ${id} is "${e.text}", expected "${text}"`);
  if (e.tm) continue;
  e.tm = true; n++; log.A.push(`${id} "${text}"${e.gloss ? ' [' + e.gloss + ']' : ''}${e.aliasOf ? ' (alias of ' + e.aliasOf + ')' : ''}  tm false -> true  (${why})`);
}
// B, C, E. recase
for (const [id, old, text, type, why] of RECASE) {
  const e = E(id);
  if (e.text === text && (e.type || 'common') === type) continue;
  if (e.text !== old) throw Error(`entry ${id} is "${e.text}", expected "${old}"`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length) throw Error(`entry ${id} has aliases or use: check by hand`);
  const twin = P.entries.find(x => x !== e && x.text === text && (x.gloss || '') === (e.gloss || '')); if (twin) throw Error(`"${text}" [${e.gloss}] would repeat ${twin.id}`);
  const elsewhere = P.entries.find(x => x !== e && Object.values(x.show || {}).includes(old)); if (elsewhere && old !== text) throw Error(`entry ${elsewhere.id} shows "${old}": check by hand`);
  const d = [`"${e.text}" -> "${text}"`]; if ((e.type || 'common') !== type) d.push(`type ${e.type || 'common'} -> ${type}`); if (e.tm) d.push('tm (kept)');
  for (const [k, v] of Object.entries(e.show || {})) if (v.toLowerCase() === old.toLowerCase() && v !== text) { d.push(`show ${k} "${v}" dropped (repeated the entry)`); delete e.show[k]; }
  (id === 3063 ? log.B : id === 53809 || id === 53835 ? log.E : log.C).push(`${id} ${d.join('  ')}${e.gloss ? '  [' + e.gloss + ']' : ''}  (${why})`);
  e.text = text; e.type = type; n++;
}
// B, D. splits
for (const [id, oldText, move, add, why] of SPLIT) {
  const e = E(id);
  const done = P.entries.find(x => x !== e && x.text === add.text && x.gloss === add.gloss);
  if (done) { if (move.some(t => t in e.typ) || move.some(t => !(t in done.typ))) throw Error(`entry ${id}: half done, check by hand`); continue; }
  if (e.text !== oldText || move.some(t => !(t in e.typ))) throw Error(`entry ${id} is "${e.text}" ${JSON.stringify(e.typ)}, expected "${oldText}" linked to ${move}`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length || move.some(t => e.show?.[t] || e.nameOkIn?.includes(t))) throw Error(`entry ${id} has aliases, use, or shown texts in the moved themes: check by hand`);
  const twin = (P.ix.byText.get(add.text.toLowerCase()) || []).find(x => x !== e && (x.gloss || '') === add.gloss); if (twin) throw Error(`"${add.text}" [${add.gloss}] would repeat ${twin.id}`);
  const was = short(e);
  const { id: _i, text: _t, gloss: _g, type: _y, typ: _l, show: _s, use: _u, nameOkIn: _n, ...rest } = structuredClone(e);
  const x = addEntry(P, add.text, { ...rest, gloss: add.gloss, type: add.type, pos: add.pos || e.pos, fam: add.fam, tm: add.tm, typ: Object.fromEntries(move.map(t => [t, e.typ[t]])), show: {}, use: {}, nameOkIn: [] });
  for (const t of move) delete e.typ[t];
  if (add.keepGloss && !e.gloss) e.gloss = add.keepGloss;   // two entries now share the text: each needs a gloss (Checks needs-gloss)
  const gs = []; for (const t of move) for (const g of P.ix.theme.get(t).groups || []) { const i = g.indexOf(id); if (i >= 0) { g[i] = x.id; gs.push(`${t} group [${g.join(',')}]`); } }
  (id === 48722 ? log.D : log.B).push(`${id} before: ${was}\n${id} after:  ${short(e)}\n${x.id} new:    ${short(x)}${gs.length ? '\n  moved: ' + gs.join('; ') : ''}\n  (${why})`);
  n++;
}
// F. merges
const accentShow = (v, root) => { const ws = root.split(' '); for (let i = 0; i < ws.length; i++) for (let j = i + 1; j <= ws.length; j++) { const s = ws.slice(i, j).join(' '); if (strip(s) === strip(v)) return s; } return v; };
for (const [rid, aid, why] of MERGE) {
  const r = E(rid), a = E(aid);
  if (a.aliasOf === rid && a.aliasKind === 'spelling' && !Object.keys(a.typ).length) continue;
  if (strip(r.text) !== strip(a.text)) throw Error(`merge ${rid}/${aid}: texts differ beyond accents`);
  if (a.aliasOf || r.aliasOf || P.entries.some(x => x.aliasOf === aid) || Object.keys(a.use || {}).length || Object.keys(r.use || {}).length) throw Error(`merge ${rid}/${aid}: aliases or use, check by hand`);
  if (P.entries.some(x => x.use && Object.values(x.use).includes(aid))) throw Error(`merge ${rid}/${aid}: a use points at ${aid}`);
  if (P.entries.some(x => x.aliasOf === rid && x.text === a.text)) throw Error(`merge ${rid}/${aid}: root already has an alias "${a.text}"`);
  const wasR = short(r), wasA = short(a), moved = [];
  for (const [tid, v] of Object.entries(a.typ)) {
    if (tid in r.typ) throw Error(`merge ${rid}/${aid}: both in ${tid}, check by hand`);
    r.typ[tid] = v; if (a.show?.[tid]) { r.show ||= {}; r.show[tid] = accentShow(a.show[tid], r.text); }
    if (a.nameOkIn?.includes(tid)) r.nameOkIn = [...new Set([...(r.nameOkIn || []), tid])];
    moved.push(tid);
  }
  const gs = groupsWith(aid).map(([t]) => t.id); swapInGroups(aid, rid);
  const fam = Math.min(r.fam || 5, a.fam || 5); r.fam = fam;
  r.tm ||= a.tm;
  Object.assign(a, { type: r.type, typ: {}, show: {}, use: {}, nameOkIn: [], aliasOf: rid, aliasKind: 'spelling', region: [], fam });
  reindex(P);   // the alias is checked by its own text in its root's unlocked themes: it takes the root's name allowance there, and one for a theme where the root is shown short
  for (const tid of Object.keys(r.typ)) { const t = P.ix.theme.get(tid); if (t && !nameLeak(t, r.show?.[tid] ? { ...r, text: r.show[tid] } : r) && nameLeak(t, a)) a.nameOkIn.push(tid); }
  log.F.push(`${rid} before: ${wasR}\n${aid} before: ${wasA}\n${rid} after:  ${short(r)}\n${aid} after:  ${short(a)}\n  links moved to ${rid}: ${moved.join(', ')}${gs.length ? '; groups: ' + gs.map(t => t + ' ' + JSON.stringify(groupsWith(rid).find(([x]) => x.id === t)[1])).join(', ') : ''}\n  (${why})`);
  n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const [[, b], a] = msgs; const nw = [...a].filter(x => !b.has(x)), gone = [...b].filter(x => !a.has(x)); if (nw.length || gone.length) console.log(`new issues:\n  ${nw.join('\n  ') || 'none'}\ngone:\n  ${gone.join('\n  ') || 'none'}`); }
const SECT = { A: 'A. tm set on trademarks used as words', B: 'B. capital brands in "brand names used as words"', C: 'C. material brands typed org', D: 'D. jeep split', E: 'E. place-named wines', F: 'F. accent-only root pairs merged' };
const body = Object.entries(log).map(([k, v]) => `${SECT[k]} (${v.length}):\n${v.join('\n') || '  none'}`).join('\n\n');
console.log(body);
console.log(`\nAccent groups (${pairList.length}):\n${pairList.join('\n')}`);
console.log(`\n${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = `Method: Simon's five rules (DESIGN-entries.md "Single-word names: the five rules"), Brand types, Oxford and Merriam-Webster usage (from the
dictionaries' known entries; the M-W site refused automated reading, so no page was fetched), and the siblings in each theme.
Git history: none of the words was set by Simon before (git log --grep on each word; DESIGN-entries.md, ISSUES.md mention them only as T24 items).

Left unchanged, and why:
A. Lowercase words in "brand names used as words" and the material themes that are no longer trademarks (no tm): escalator, zipper, yo-yo,
   trampoline, linoleum, granola, dry ice, celluloid, neoprene, coin laundry, vacuum flask, flying disc (generic terms). Doubtful, left for Simon:
   aspirin (generic in the US and UK, a Bayer trademark in Canada and many other countries), cellophane (generic in the US, still a trademark in
   some countries), laundromat (a former Westinghouse mark).
B. Kept capital org with tm (rule 1: M-W and Oxford both capitalise the noun; rule 4's brand sense): Zamboni, Q-tip, Vaseline, ChapStick,
   Hoover [vacuum cleaner] (the verb hoover is lowercase in both, but the entry is the noun, linked in appliance themes), Crock-Pot, Velcro,
   Lego and Frisbee (also in "toy brands"), Walkman, Dictaphone, Tupperware, Kleenex (rule 4 names it), Post-it, Stanley knife (org, a phrase);
   Scotch tape and Sellotape stay proper with tm (Brand types leaves adhesives proper). Uber stays: no dictionary uses it as a word (a split
   would be needed only if Simon wants "uber" as a word). Thermos lowercased (dictionaries disagree), Google split (below).
D. Jeep [car brand] takes the typicality the merged entry had (3) and fam 2; ratings may want a look (Ford and Chevrolet are 1).
   Most American car brands (Ford, Chevrolet, Dodge ...) are org without tm; Jeep has tm as Rivian and the British car brands (Brand types).
E. Lowercase, unchanged (rule 1 tie-break, dictionaries print it lowercase or disagree): prosecco (M-W often capitalized, Oxford lowercase),
   port [wine] (both lowercase), sherry (both lowercase), cava, vinho verde (lowercase), muscadet (M-W often capitalized, Oxford Muscadet),
   white burgundy (M-W burgundy often capitalized). Note: Burgundy [wine] 19664 and the other capital place-named wines (Bordeaux, Chianti,
   Chablis ...) were not reviewed against the tie-break: rule 3 keeps them capital, so white burgundy and Burgundy [wine] now differ (for Simon).
   montepulciano and primitivo in "red wines" are grape names (rule 3), not wines named after places.
F. Merges follow batch381: both ids kept; the alias holds no links, takes the root's type and fam (the lower, more familiar, of the two), no
   region; links, synonym groups and shown texts move to the root (Süleymaniye Mosque's shown "Suleymaniye" became "Süleymaniye"). An alias whose
   own text would leak a theme name gets the name allowance the root has (apres-ski in "ski trip") or one where the root is shown short
   (Suleymaniye Mosque in "famous mosques"), so Checks theme-name stays at 3. The root is the accented form, as the library's precedent (81
   accented roots with plain spelling aliases: Gruyère, crème brûlée, jalapeño, köfte, Brasília), except guarana (M-W and Oxford unaccented)
   and bun cha (Vietnamese dish names are written without tone marks in English, as pho). Locked themes now show the root's form: "words from
   French" shows déjà vu, "interjections" shows voilà, "ways to say goodbye" shows tschüss.
   The task named 61 pairs; the stricter search here (letters equal after removing accents, any case) finds the groups listed above, including
   groups of different words that only look alike.`;
  fs.writeFileSync(new URL('batch383-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch383.mjs, ${P.lib.modified}): ${n} changes (ISSUES.md T24, all six groups). Supersedes v381 and v382 for the game.\nChecks: changed kinds ${diff.join(', ') || 'none'}.\n\n${body}\n\nAccent groups found (${pairList.length}; root entries whose texts are equal after removing accents, case-insensitive, and differ in more than case):\n${pairList.join('\n')}\n\n${NOTE}`);
  console.log('library v' + P.lib.version);
}
