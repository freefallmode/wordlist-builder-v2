// Library batch v449: tidy-up follow-up (TIDY-UP.md, "Left for the tree batch and later": the diacritics pass). Names and titles written plain
// whose usual written form in English sources keeps the diacritics (English Wikipedia's article title, checked with its API: the plain text
// redirects to the accented title; Britannica or another source where noted). Each root is retexted to the accented form and keeps (or gets)
// the plain text as a `spelling` alias with no region (LIBRARY-RULES 5, rule 8); a surname synonym alias of a person takes the same accents
// (precedent: René Descartes / Descartes, Kurt Gödel / Gödel); shown texts and complete-set notes of the entry's themes follow the root.
// English exonyms stay plain, as the library already treats them (Mexico City, Montreal, Quebec, Zurich, Istanbul): a capital İ alone is not
// a reason to change (Izmir, Iznik). Drafted on library v448 (after the tree batch): everything works by entry id + text, and a change
// is skipped when its entry is gone, an alias, or has another text (rerun: 0 changes). Dürer / Durer is left to v448.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch449.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, linkIds, plainText, addEntry } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks, MIN_BREAK_LETTERS } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
let BRK = new Map();
{ const b = new URL('../../data/breaks-en.txt', import.meta.url); if (fs.existsSync(b)) { BRK = parseBreaks(fs.readFileSync(b, 'utf8')); setBreaks(BRK); } }
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(i.kind === 'rating-vs-zipf' ? `${i.sev} ${i.kind}: entry ${i.entryId}` : `${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, links: X.links, linkCount: X.linkCount, root: X.root, themes: file.themes.map(t => t[0]), themeRows: file.themes, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], added = [], skipped = [], done = [], newTexts = new Set();
const sec = s => A.push('#' + s);

// The game tests root text in wordplay and compound themes with a rule (not curated): a retexted root must still pass. These names sit in none
// (checked below; a change into such a theme is refused).
const testedThemes = e => linkIds(P, e).map(t => ix.theme.get(t)).filter(t => t && (t.tkind === 'wordplay' || t.tkind === 'compound') && t.rule && t.rule !== 'curated');
// Map a plain substring of `from` onto `to` (one accented char for one plain char).
const mapSub = (from, to, s) => { if ([...from].length !== [...to].length) return null; const k = from.indexOf(s); if (k < 0) return null; return [...to].slice([...from.slice(0, k)].length, [...from.slice(0, k)].length + [...s].length).join(''); };
const swapWord = (text, from, to) => text.replace(new RegExp(`(^|[^\\p{L}])${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^\\p{L}])`, 'gu'), (m, p) => p + to);

// One change: root `id` from `from` to `to`. src: the source. o.syn: [aliasId, plain, accented] surname synonyms retexted the same way.
const change = (id, from, to, src, o = {}) => {
  const e = ix.entry.get(id);
  if (!e) { skipped.push(`${from} ${id}: gone (another batch)`); return; }
  if (e.aliasOf) { skipped.push(`${from} ${id}: now an alias of ${lab(E(e.aliasOf))} (another batch)`); return; }
  if (e.text !== from && e.text !== to) { skipped.push(`${from} ${id}: now "${e.text}" (another batch)`); return; }
  if (plainText(to) !== from) throw Error(`${to}: its plain form is "${plainText(to)}", not "${from}"`);
  const tt = testedThemes(e); if (tt.length) { skipped.push(`${from} ${id}: in tested themes ${tt.map(t => t.id + ' (' + t.rule + ')').join(', ')}: left for a check by hand`); return; }
  const k0n = n;
  if (e.text !== to) {
    const dupe = P.entries.find(a => a.aliasOf === id && a.text === to);
    if (dupe) {   // an accented alias already: it becomes the plain spelling (or goes, when the plain one is there too)
      if (P.entries.some(a => a.aliasOf === id && a.text === from)) { P.entries = P.entries.filter(x => x !== dupe); A.push(`  deleted alias ${lab(dupe)} (${dupe.aliasKind}): the root takes its text`); }
      else { A.push(`  alias ${lab(dupe)} (${dupe.aliasKind}) -> "${from}" spelling: the root takes the accented text`); dupe.text = from; dupe.aliasKind = 'spelling'; dupe.region = []; dupe.fam = Math.max(dupe.fam || 0, e.fam); }
      n++; reindex(P);
    }
    A.push(`text: ${lab(e)} -> "${to}"${e.gloss ? ' [' + e.gloss + ']' : ''} (${e.type}): ${src}`); e.text = to; n++; newTexts.add(to); reindex(P);
  }
  // a text now shared with another entry: both get a gloss
  if (o.gloss && !e.gloss) { A.push(`  ${lab(e)}: gloss "${o.gloss}" (its text is now shared)`); e.gloss = o.gloss; n++; reindex(P); }
  for (const [oid, otext, og] of o.other || []) { const x = ix.entry.get(oid); if (x && x.text === otext && !x.gloss) { A.push(`  ${lab(x)}: gloss "${og}" (its text is now shared with ${lab(e)})`); x.gloss = og; n++; reindex(P); } }
  // surname synonyms (and other short aliases inside the name) take the same accents
  for (const s of P.entries.filter(a => a.aliasOf === id && (a.aliasKind === 'synonym' || a.aliasKind === 'abbreviation') && plainText(a.text) === a.text)) {
    const m = mapSub(from, to, s.text); if (!m || m === s.text) continue;
    if ((o.keepSyn || []).includes(s.id)) continue;
    o.syn = [...(o.syn || []), [s.id, s.text, m]];
  }
  // the plain spelling alias (rule 8)
  const pa = P.entries.find(a => a.aliasOf === id && a.text === from);
  if (!pa) {
    const clash = (ix.byText.get(from.toLowerCase()) || []).filter(x => x.id !== id && x.aliasOf !== id);
    const gloss = clash.length ? (e.gloss || o.gloss || null) : null;
    if (clash.length && !gloss) throw Error(`${from}: text shared with ${clash.map(lab).join(', ')}: give o.gloss`);
    const a = { text: from, gloss: gloss || '', pos: e.pos, type: e.type, fam: e.fam, region: [], aliasOf: id, aliasKind: 'spelling', adult: !!e.adult, sensitive: !!e.sensitive, offensive: !!e.offensive, tm: !!e.tm, ...((e.nameOkIn || []).length ? { nameOkIn: [...e.nameOkIn] } : {}) };   // nameOkIn as the root's (as Galapagos penguin)
    const ne = addEntryLike(a); added.push(ne.id);
    // where the root shows a short text (Adélie in penguins), the plain full name would leak the theme word: nameOkIn there, as the root's own full name
    for (const tid of linkIds(P, e)) { const t = ix.theme.get(tid); if (t && !(ne.nameOkIn || []).includes(tid) && nameLeak(t, ne)) ne.nameOkIn = [...(ne.nameOkIn || []), tid]; }
    A.push(`  new entry: ${lab(ne)}${gloss ? ' [' + gloss + ']' : ''}: spelling alias of ${lab(e)}, familiarity ${e.fam}, no region (rule 8: the plain form is kept)`);
  } else if (pa.aliasKind !== 'spelling' || (pa.region || []).length) A.push(`  (note: alias ${lab(pa)} is ${pa.aliasKind}${pa.region?.length ? ' [' + pa.region + ']' : ''}; kept as it is)`);
  for (const [aid, af, at] of o.syn || []) {
    const s = ix.entry.get(aid); if (!s || s.aliasOf !== id) { skipped.push(`synonym ${af} ${aid}: not an alias of ${id}`); continue; }
    if (s.text === at) continue; if (s.text !== af) { skipped.push(`synonym ${af} ${aid}: now "${s.text}"`); continue; }
    A.push(`  alias ${lab(s)} (${s.aliasKind}) -> "${at}": the short name takes the root's accents (as Descartes, Gödel, García Márquez)`); s.text = at; n++; newTexts.add(at); reindex(P);
  }
  // shown texts keep the root's diacritics; complete-set notes follow
  for (const [tid, sh] of Object.entries(e.show || {})) {
    if (plainText(sh) !== sh) continue; const m = mapSub(from, to, sh); if (!m || m === sh) continue;
    A.push(`  ${lab(e)} in ${tid}: shown "${sh}" -> "${m}" (a shown text keeps the root's diacritics)`); e.show = { ...e.show, [tid]: m }; n++; newTexts.add(m);
  }
  for (const tid of linkIds(P, e)) {
    const t = ix.theme.get(tid); if (!t?.note) continue;
    const nn = swapWord(t.note, from, to); if (nn !== t.note) { A.push(`  theme ${tid}: note item "${from}" -> "${to}"`); t.note = nn; n++; }
  }
  if (n > k0n) done.push({ id, from, to, src, type: e.type, themes: linkIds(P, e) });
};
const addEntryLike = a => { const { text, ...rest } = a; const e = addEntry(P, text, { ...rest, status: 'rev' }); n++; reindex(P); return e; };

// =================================================================================================
// CHANGES-START
sec("1. Names and titles retexted to the accented form (by entry id; the source after the colon)");
change(2299, "Reykjavik", "Reykjavík", 'English Wikipedia: "Reykjavík"');
change(7593, "Volapuk", "Volapük", 'English Wikipedia: "Volapük"');
change(8236, "Adelie penguin", "Adélie penguin", 'English Wikipedia: "Adélie penguin"');
change(8248, "Atitlan grebe", "Atitlán grebe", 'English Wikipedia: "Atitlán grebe"');
change(9490, "Selle Francais", "Selle Français", 'English Wikipedia: "Selle Français"');
change(9615, "Grevy's zebra", "Grévy's zebra", 'English Wikipedia: "Grévy\'s zebra"');
change(11396, "Dvorak", "Dvořák", 'English Wikipedia: "Antonín Dvořák" (the name as the library writes it)');
change(11410, "Saint-Saens", "Saint-Saëns", 'English Wikipedia: "Camille Saint-Saëns" (the name as the library writes it)');
change(11426, "Bartok", "Bartók", 'English Wikipedia: "Béla Bartók" (the name as the library writes it)');
change(11427, "Janacek", "Janáček", 'English Wikipedia: "Leoš Janáček" (the name as the library writes it)');
change(11435, "Arvo Part", "Arvo Pärt", 'English Wikipedia: "Arvo Pärt"');
change(11474, "Beyonce", "Beyoncé", 'English Wikipedia: "Beyoncé"');
change(11592, "Baris Manco", "Barış Manço", 'English Wikipedia: "Barış Manço"');
change(11593, "Ibrahim Tatlises", "Ibrahim Tatlıses", 'English Wikipedia: "İbrahim Tatlıses", with the capital I plain as English writes it (reviewer)');
change(11597, "Muslum Gurses", "Müslüm Gürses", 'English Wikipedia: "Müslüm Gürses"');
change(11598, "Zeki Muren", "Zeki Müren", 'English Wikipedia: "Zeki Müren"');
change(11599, "Bulent Ersoy", "Bülent Ersoy", 'English Wikipedia: "Bülent Ersoy"');
change(11600, "Kenan Dogulu", "Kenan Doğulu", 'English Wikipedia: "Kenan Doğulu"');
change(11601, "Gulsen", "Gülşen", 'English Wikipedia: "Gülşen"');
change(11602, "Yildiz Tilbe", "Yıldız Tilbe", 'English Wikipedia: "Yıldız Tilbe"');
change(11604, "Demet Akalin", "Demet Akalın", 'English Wikipedia: "Demet Akalın"');
change(11607, "Sebnem Ferah", "Şebnem Ferah", 'English Wikipedia: "Şebnem Ferah"');
change(11613, "Angelique Kidjo", "Angélique Kidjo", 'English Wikipedia: "Angélique Kidjo"');
change(11621, "King Sunny Ade", "King Sunny Adé", 'English Wikipedia: "King Sunny Adé"');
change(11622, "Oumou Sangare", "Oumou Sangaré", 'English Wikipedia: "Oumou Sangaré"');
change(11623, "Ali Farka Toure", "Ali Farka Touré", 'English Wikipedia: "Ali Farka Touré"');
change(11624, "Toumani Diabate", "Toumani Diabaté", 'English Wikipedia: "Toumani Diabaté"');
change(11625, "Cesaria Evora", "Cesária Évora", 'English Wikipedia: "Cesária Évora"');
change(11626, "Mory Kante", "Mory Kanté", 'English Wikipedia: "Mory Kanté"');
change(11645, "Victor Jara", "Víctor Jara", 'English Wikipedia: "Víctor Jara"');
change(11649, "Maria Bethania", "Maria Bethânia", 'English Wikipedia: "Maria Bethânia"');
change(11651, "Joao Gilberto", "João Gilberto", 'English Wikipedia: "João Gilberto"');
change(11662, "Charly Garcia", "Charly García", 'English Wikipedia: "Charly García"');
change(11669, "Sebastian Yatra", "Sebastián Yatra", 'English Wikipedia: "Sebastián Yatra"');
change(11710, "Niccolo Paganini", "Niccolò Paganini", 'English Wikipedia: "Niccolò Paganini"');
change(11716, "Jacqueline du Pre", "Jacqueline du Pré", 'English Wikipedia: "Jacqueline du Pré"');
change(11718, "Andres Segovia", "Andrés Segovia", 'English Wikipedia: "Andrés Segovia"');
change(11737, "Bela Fleck", "Béla Fleck", 'English Wikipedia: "Béla Fleck"');
change(11934, "Salvador Dali", "Salvador Dalí", 'English Wikipedia: "Salvador Dalí"');
change(11943, "Paul Cezanne", "Paul Cézanne", 'English Wikipedia: "Paul Cézanne"');
change(11953, "Rene Magritte", "René Magritte", 'English Wikipedia: "René Magritte"');
change(11954, "Joan Miro", "Joan Miró", 'English Wikipedia: "Joan Miró"');
change(11956, "Diego Velazquez", "Diego Velázquez", 'English Wikipedia: "Diego Velázquez"');
change(11968, "Eugene Delacroix", "Eugène Delacroix", 'English Wikipedia: "Eugène Delacroix"');
change(12132, "Cafe Terrace at Night", "Café Terrace at Night", 'English Wikipedia: "Café Terrace at Night"');
change(12484, "Moliere", "Molière", 'English Wikipedia: "Molière"');
change(12502, "Garcia Lorca", "García Lorca", 'English Wikipedia: "Federico García Lorca" (the name as the library writes it)');
change(12510, "Noel Coward", "Noël Coward", 'English Wikipedia: "Noël Coward"');
change(12521, "Eugene Ionesco", "Eugène Ionesco", 'English Wikipedia: "Eugène Ionesco"');
change(12776, "San Sebastian", "San Sebastián", 'English Wikipedia: "San Sebastián"', { gloss: 'film festival', other: [[56949, 'San Sebastián', 'city']] });
change(12889, "Weta Workshop", "Wētā Workshop", 'English Wikipedia: "Wētā Workshop"');
change(12916, "Pedro Almodovar", "Pedro Almodóvar", 'English Wikipedia: "Pedro Almodóvar"');
change(12920, "Francois Truffaut", "François Truffaut", 'English Wikipedia: "François Truffaut"');
change(12942, "Chloe Zhao", "Chloé Zhao", 'English Wikipedia: "Chloé Zhao"');
change(12952, "Agnes Varda", "Agnès Varda", 'English Wikipedia: "Agnès Varda"');
change(12953, "Luis Bunuel", "Luis Buñuel", 'English Wikipedia: "Luis Buñuel"');
change(13471, "Les Miserables", "Les Misérables", 'English Wikipedia: "Les Misérables"');
change(13957, "Antoni Gaudi", "Antoni Gaudí", 'English Wikipedia: "Antoni Gaudí"');
change(13985, "Jorn Utzon", "Jørn Utzon", 'English Wikipedia: "Jørn Utzon"');
change(20607, "Bjorn Ironside", "Björn Ironside", 'English Wikipedia: "Björn Ironside"');
change(20636, "Topkapi Palace", "Topkapı Palace", 'English Wikipedia: "Topkapı Palace"');
change(21523, "Mustafa Kemal Ataturk", "Mustafa Kemal Atatürk", 'English Wikipedia: "Mustafa Kemal Atatürk"');
change(22177, "Ruaumoko", "Rūaumoko", 'English Wikipedia: "Rūaumoko"');
change(22298, "Laocoon", "Laocoön", 'English Wikipedia: "Laocoön"');
change(22309, "Tir na nOg", "Tír na nÓg", 'English Wikipedia: "Tír na nÓg"');
change(22686, "Tepegoz", "Tepegöz", 'English Wikipedia: "Tepegöz"');
change(22690, "Karagoz and Hacivat", "Karagöz and Hacivat", 'English Wikipedia: "Karagöz and Hacivat"');
change(26002, "Vigenere cipher", "Vigenère cipher", 'English Wikipedia: "Vigenère cipher"');
change(26044, "Laadan", "Láadan", 'English Wikipedia: "Láadan"');
change(30213, "Bialowieza", "Białowieża", 'English Wikipedia: "Białowieża"');
change(34346, "Teresa of Avila", "Teresa of Ávila", 'English Wikipedia: "Teresa of Ávila"');
change(35745, "Sao Tome and Principe", "São Tomé and Príncipe", 'English Wikipedia: "São Tomé and Príncipe"');
change(35833, "Gdansk", "Gdańsk", 'English Wikipedia: "Gdańsk"');
change(35842, "Eskisehir", "Eskişehir", 'English Wikipedia: "Eskişehir"');
change(35843, "Diyarbakir", "Diyarbakır", 'English Wikipedia: "Diyarbakır"');
change(35848, "Canakkale", "Çanakkale", 'English Wikipedia: "Çanakkale"');
change(35849, "Kusadasi", "Kuşadası", 'English Wikipedia: "Kuşadası"');
change(35857, "Cesme", "Çeşme", 'English Wikipedia: "Çeşme"');
change(36035, "Noumea", "Nouméa", 'English Wikipedia: "Nouméa"');
change(36103, "Cancun", "Cancún", 'English Wikipedia: "Cancún"');
change(36116, "Mazatlan", "Mazatlán", 'English Wikipedia: "Mazatlán"');
change(36117, "Ciudad Juarez", "Ciudad Juárez", 'English Wikipedia: "Ciudad Juárez"');
change(36119, "Queretaro", "Querétaro", 'English Wikipedia: "Querétaro"');
change(36126, "Culiacan", "Culiacán", 'English Wikipedia: "Culiacán"');
change(36128, "San Luis Potosi", "San Luis Potosí", 'English Wikipedia: "San Luis Potosí"');
change(36131, "Torreon", "Torreón", 'English Wikipedia: "Torreón"');
change(36216, "Yucatan", "Yucatán", 'English Wikipedia: "Yucatán"');
change(36224, "Nuevo Leon", "Nuevo León", 'English Wikipedia: "Nuevo León"');
change(36233, "Michoacan", "Michoacán", 'English Wikipedia: "Michoacán"');
change(36649, "Yucatan Peninsula", "Yucatán Peninsula", 'English Wikipedia: "Yucatán Peninsula"');
change(36848, "Lake Wanaka", "Lake Wānaka", 'English Wikipedia: "Lake Wānaka"');
change(36872, "Skogafoss", "Skógafoss", 'English Wikipedia: "Skógafoss"');
change(37055, "Casa Batllo", "Casa Batlló", 'English Wikipedia: "Casa Batlló"');
change(37121, "Pieta", "Pietà", 'English Wikipedia: "Pietà"');
change(37193, "Chateau d'If", "Château d'If", 'English Wikipedia: "Château d\'If"');
change(37230, "Zocalo", "Zócalo", 'English Wikipedia: "Zócalo"');
change(37237, "Plaza de Espana", "Plaza de España", 'English Wikipedia: "Plaza de España"');
change(37291, "Kurfurstendamm", "Kurfürstendamm", 'English Wikipedia: "Kurfürstendamm"');
change(37357, "Maison Carree", "Maison Carrée", 'English Wikipedia: "Maison carrée" (the name as the library writes it)');
change(37430, "Hallgrimskirkja", "Hallgrímskirkja", 'English Wikipedia: "Hallgrímskirkja"');
change(37472, "Anitkabir", "Anıtkabir", 'English Wikipedia: "Anıtkabir"');
change(37475, "Goreme", "Göreme", 'English Wikipedia: "Göreme"');
change(37478, "Oludeniz", "Ölüdeniz", 'English Wikipedia: "Ölüdeniz"');
change(37682, "Kuelap", "Kuélap", 'English Wikipedia: "Kuélap"');
change(37687, "Monte Alban", "Monte Albán", 'English Wikipedia: "Monte Albán"');
change(37702, "El Tajin", "El Tajín", 'English Wikipedia: "El Tajín"');
change(37743, "Chateau Frontenac", "Château Frontenac", 'English Wikipedia: "Château Frontenac"');
change(37759, "Perce Rock", "Percé Rock", 'English Wikipedia: "Percé Rock"');
change(37784, "Park Guell", "Park Güell", 'English Wikipedia: "Park Güell"');
change(37794, "Alcazar of Seville", "Alcázar of Seville", 'English Wikipedia: "Alcázar of Seville"');
change(37798, "Montjuic", "Montjuïc", 'English Wikipedia: "Montjuïc"');
change(37801, "Alcazar of Segovia", "Alcázar of Segovia", 'English Wikipedia: "Alcázar of Segovia"');
change(37807, "Albaicin", "Albaicín", 'English Wikipedia: "Albaicín"');
change(40413, "Buchner funnel", "Büchner funnel", 'English Wikipedia: "Büchner funnel"');
change(41165, "Bootes", "Boötes", 'English Wikipedia: "Boötes"');
change(44596, "Canelo Alvarez", "Canelo Álvarez", 'English Wikipedia: "Canelo Álvarez"');
change(44603, "Roberto Duran", "Roberto Durán", 'English Wikipedia: "Roberto Durán"');
change(44610, "Julio Cesar Chavez", "Julio César Chávez", 'English Wikipedia: "Julio César Chávez"');
change(44624, "Nikola Jokic", "Nikola Jokić", 'English Wikipedia: "Nikola Jokić"');
change(44637, "Manu Ginobili", "Manu Ginóbili", 'English Wikipedia: "Manu Ginóbili"');
change(44658, "Kimi Raikkonen", "Kimi Räikkönen", 'English Wikipedia: "Kimi Räikkönen"');
change(44665, "Mika Hakkinen", "Mika Häkkinen", 'English Wikipedia: "Mika Häkkinen"');
change(44682, "Sergio Perez", "Sergio Pérez", 'English Wikipedia: "Sergio Pérez"');
change(44704, "Annika Sorenstam", "Annika Sörenstam", 'English Wikipedia: "Annika Sörenstam"');
change(44712, "Padraig Harrington", "Pádraig Harrington", 'English Wikipedia: "Pádraig Harrington"');
change(44716, "Sergio Garcia", "Sergio García", 'English Wikipedia: "Sergio García"');
change(44970, "El Cordobes", "El Cordobés", 'English Wikipedia: "El Cordobés"');
change(46128, "Molkky", "Mölkky", 'English Wikipedia: "Mölkky"');
change(46580, "Citroen", "Citroën", 'English Wikipedia: "Citroën"');
change(47242, "Aeromexico", "Aeroméxico", 'English Wikipedia: "Aeroméxico"');
change(47298, "Galeao", "Galeão", 'English Wikipedia: "Galeão"');
change(47592, "Gota Canal", "Göta Canal", 'English Wikipedia: "Göta Canal"');
change(47821, "Haydarpasa", "Haydarpaşa", 'English Wikipedia: "Haydarpaşa"');
change(47966, "Liege-Bastogne-Liege", "Liège-Bastogne-Liège", 'English Wikipedia: "Liège–Bastogne–Liège" (the name as the library writes it)');
change(47973, "Fleche Wallonne", "Flèche Wallonne", 'English Wikipedia: "La Flèche Wallonne" (the name as the library writes it)');
change(48421, "Hotel de Paris", "Hôtel de Paris", 'English Wikipedia: "Hôtel de Paris"');
change(48962, "Parc Asterix", "Parc Astérix", 'English Wikipedia: "Parc Astérix"');
change(49624, "Leclanche cell", "Leclanché cell", 'English Wikipedia: "Leclanché cell"');
change(50610, "Ruppell's vulture", "Rüppell's vulture", 'English Wikipedia: "Rüppell\'s vulture"');
change(51007, "Lowchen", "Löwchen", 'English Wikipedia: "Löwchen"');
change(51882, "Heinrich Schutz", "Heinrich Schütz", 'English Wikipedia: "Heinrich Schütz"');
change(51901, "Cesar Franck", "César Franck", 'English Wikipedia: "César Franck"');
change(51910, "Cesar Cui", "César Cui", 'English Wikipedia: "César Cui"');
change(51945, "Ludwig Goransson", "Ludwig Göransson", 'English Wikipedia: "Ludwig Göransson"');
change(51958, "Miklos Rozsa", "Miklós Rózsa", 'English Wikipedia: "Miklós Rózsa"');
change(51966, "Johann Johannsson", "Jóhann Jóhannsson", 'English Wikipedia: "Jóhann Jóhannsson"');
change(51977, "Agnetha Faltskog", "Agnetha Fältskog", 'English Wikipedia: "Agnetha Fältskog"');
change(51979, "Bjorn Ulvaeus", "Björn Ulvaeus", 'English Wikipedia: "Björn Ulvaeus"');
change(51999, "La Bayadere", "La Bayadère", 'English Wikipedia: "La Bayadère"');
change(52017, "La Fille mal gardee", "La Fille mal gardée", 'English Wikipedia: "La fille mal gardée" (the name as the library writes it)');
change(52143, "Edouard Manet", "Édouard Manet", 'English Wikipedia: "Édouard Manet"');
change(52148, "Frederic Bazille", "Frédéric Bazille", 'English Wikipedia: "Frédéric Bazille"');
change(52154, "Eugene Boudin", "Eugène Boudin", 'English Wikipedia: "Eugène Boudin"');
change(52160, "Eva Gonzales", "Eva Gonzalès", 'English Wikipedia: "Eva Gonzalès"');
change(52205, "Francisco de Zurbaran", "Francisco de Zurbarán", 'English Wikipedia: "Francisco de Zurbarán"');
change(52206, "Joaquin Sorolla", "Joaquín Sorolla", 'English Wikipedia: "Joaquín Sorolla"');
change(52208, "Antoni Tapies", "Antoni Tàpies", 'English Wikipedia: "Antoni Tàpies"');
change(52211, "Santiago Rusinol", "Santiago Rusiñol", 'English Wikipedia: "Santiago Rusiñol"');
change(52212, "Antonio Lopez Garcia", "Antonio López García", 'English Wikipedia: "Antonio López García"');
change(52213, "Luis Melendez", "Luis Meléndez", 'English Wikipedia: "Luis Meléndez"');
change(52222, "Jose Clemente Orozco", "José Clemente Orozco", 'English Wikipedia: "José Clemente Orozco"');
change(52224, "Joaquin Torres-Garcia", "Joaquín Torres-García", 'English Wikipedia: "Joaquín Torres-García"');
change(52229, "Oswaldo Guayasamin", "Oswaldo Guayasamín", 'English Wikipedia: "Oswaldo Guayasamín"');
change(52232, "Helio Oiticica", "Hélio Oiticica", 'English Wikipedia: "Hélio Oiticica"');
change(52234, "Jesus Rafael Soto", "Jesús Rafael Soto", 'English Wikipedia: "Jesús Rafael Soto"');
change(52237, "Maria Izquierdo", "María Izquierdo", 'English Wikipedia: "María Izquierdo"');
change(52238, "Armando Reveron", "Armando Reverón", 'English Wikipedia: "Armando Reverón"');
change(52371, "La Boheme", "La Bohème", 'English Wikipedia: "La bohème" (the name as the library writes it)');
change(52382, "Cosi fan tutte", "Così fan tutte", 'English Wikipedia: "Così fan tutte"');
change(52404, "Die Walkure", "Die Walküre", 'English Wikipedia: "Die Walküre"');
change(52405, "Gotterdammerung", "Götterdämmerung", 'English Wikipedia: "Götterdämmerung"');
change(52462, "Charlotte Bronte", "Charlotte Brontë", 'English Wikipedia: "Charlotte Brontë"');
change(52463, "Emily Bronte", "Emily Brontë", 'English Wikipedia: "Emily Brontë"');
change(52486, "John le Carre", "John le Carré", 'English Wikipedia: "John le Carré"');
change(52539, "Yasar Kemal", "Yaşar Kemal", 'English Wikipedia: "Yaşar Kemal"');
change(52540, "Nazim Hikmet", "Nâzım Hikmet", 'English Wikipedia: "Nâzım Hikmet"');
change(52544, "Resat Nuri Guntekin", "Reşat Nuri Güntekin", 'English Wikipedia: "Reşat Nuri Güntekin"');
change(52545, "Ahmet Hamdi Tanpinar", "Ahmet Hamdi Tanpınar", 'English Wikipedia: "Ahmet Hamdi Tanpınar"');
change(52546, "Oguz Atay", "Oğuz Atay", 'English Wikipedia: "Oğuz Atay"');
change(52548, "Yusuf Atilgan", "Yusuf Atılgan", 'English Wikipedia: "Yusuf Atılgan"');
change(52552, "Namik Kemal", "Namık Kemal", 'English Wikipedia: "Namık Kemal"');
change(52556, "Ayse Kulin", "Ayşe Kulin", 'English Wikipedia: "Ayşe Kulin"');
change(52558, "Burhan Sonmez", "Burhan Sönmez", 'English Wikipedia: "Burhan Sönmez"');
change(52559, "Zulfu Livaneli", "Zülfü Livaneli", 'English Wikipedia: "Zülfü Livaneli"');
change(52561, "Cahit Sitki Taranci", "Cahit Sıtkı Tarancı", 'English Wikipedia: "Cahit Sıtkı Tarancı"');
change(52562, "Ziya Gokalp", "Ziya Gökalp", 'English Wikipedia: "Ziya Gökalp"');
change(52565, "Evliya Celebi", "Evliya Çelebi", 'English Wikipedia: "Evliya Çelebi"');
change(52576, "Mariama Ba", "Mariama Bâ", 'English Wikipedia: "Mariama Bâ"');
change(52728, "Wislawa Szymborska", "Wisława Szymborska", 'English Wikipedia: "Wisława Szymborska"');
change(53014, "Dara O Briain", "Dara Ó Briain", 'English Wikipedia: "Dara Ó Briain"');
change(54148, "Antonio de Abreu", "António de Abreu", 'English Wikipedia: "António de Abreu"');
change(54775, "Djenne", "Djenné", 'English Wikipedia: "Djenné"');
change(54817, "Quirigua", "Quiriguá", 'English Wikipedia: "Quiriguá"');
change(54831, "Chavin de Huantar", "Chavín de Huántar", 'English Wikipedia: "Chavín de Huántar"');
change(54841, "San Agustin", "San Agustín", 'English Wikipedia: "San Agustín"');
change(54995, "Beast of Gevaudan", "Beast of Gévaudan", 'English Wikipedia: "Beast of Gévaudan"');
change(55123, "Sieyes", "Sieyès", 'English Wikipedia: "Emmanuel Joseph Sieyès" (the name as the library writes it)');
change(55129, "Vendee", "Vendée", 'English Wikipedia: "Vendée"');
change(55167, "Orleans", "Orléans", 'English Wikipedia: "Orléans"');
change(55168, "Trastamara", "Trastámara", 'English Wikipedia: "House of Trastámara" (the name as the library writes it)');
change(56940, "Malaga", "Málaga", 'English Wikipedia: "Málaga"');
change(57345, "Rio de la Plata", "Río de la Plata", 'English Wikipedia: "Río de la Plata"');
change(58143, "Irene Joliot-Curie", "Irène Joliot-Curie", 'English Wikipedia: "Irène Joliot-Curie"');
change(58480, "Atletico Madrid", "Atlético Madrid", 'English Wikipedia: "Atlético Madrid"');
change(58877, "Judit Polgar", "Judit Polgár", 'English Wikipedia: "Judit Polgár"');
change(59446, "Tete de Moine", "Tête de Moine", 'English Wikipedia: "Tête de Moine"');
change(60704, "Movenpick", "Mövenpick", 'English Wikipedia: "Mövenpick"');
change(61725, "Vendee Globe", "Vendée Globe", 'English Wikipedia: "Vendée Globe"');
change(61752, "Estadio da Luz", "Estádio da Luz", 'English Wikipedia: "Estádio da Luz"');
change(61792, "Gaston Gaudio", "Gastón Gaudio", 'English Wikipedia: "Gastón Gaudio"');
change(61867, "Ebru Gundes", "Ebru Gündeş", 'English Wikipedia: "Ebru Gündeş"');
change(61929, "Jenufa", "Jenůfa", 'English Wikipedia: "Jenůfa"');
change(61935, "Andrea Chenier", "Andrea Chénier", 'English Wikipedia: "Andrea Chénier"');
change(61972, "Adalet Agaoglu", "Adalet Ağaoğlu", 'English Wikipedia: "Adalet Ağaoğlu"');
change(61974, "Tezer Ozlu", "Tezer Özlü", 'English Wikipedia: "Tezer Özlü"');
change(62558, "Belem Tower", "Belém Tower", 'English Wikipedia: "Belém Tower"');
change(62575, "Schonbrunn", "Schönbrunn", 'English Wikipedia: "Schönbrunn"');
change(62816, "Medoc", "Médoc", 'English Wikipedia: "Médoc"', { gloss: 'marathon', other: [[36474, 'Médoc', 'wine region']] });
change(63210, "Skocjan", "Škocjan", 'English Wikipedia: "Škocjan"');
sec('2. Names that hold a word accented above (checked against the same source)');
change(12382, 'Karagoz', 'Karagöz', 'English Wikipedia: "Karagöz and Hacivat" (the shadow play; as Karagöz and Hacivat 22690)');
change(37379, 'Djenne Mosque', 'Djenné Mosque', 'English Wikipedia: "Great Mosque of Djenné" (as Djenné 54775)');
change(58868, 'Jose Capablanca', 'José Capablanca', 'English Wikipedia: "José Raúl Capablanca"');
change(61943, 'Cesar Award', 'César Award', 'English Wikipedia: "César Awards"');
sec("3. Reviewer's fixes (2026-11-23, standing approval)");
// Nadia Comaneci, Chisinau and Ihsan Oktay Anar stay plain (no change line above); İbrahim Tatlıses keeps a plain capital I (line above).
const noteSwap = (tid, from, to, why) => { const t = ix.theme.get(tid); if (!t?.note) return; const nn = swapWord(t.note, from, to); if (nn === t.note) return; A.push(`theme ${tid}: note item "${from}" -> "${to}": ${why}`); t.note = nn; n++; };
noteSwap('abba_members', 'Bjorn', 'Björn', 'the note follows Björn Ulvaeus and his alias Björn (reviewer)');
noteSwap('peninsulas', 'Yucatan', 'Yucatán', 'the note follows Yucatán Peninsula (reviewer)');
// Kız Kulesi is Maiden's Tower: one landmark, two roots. Maiden's Tower stays the root; 65572 becomes its translation alias "Kız Kulesi" (id kept).
{ const k = ix.entry.get(65572), m = ix.entry.get(37102);
  if (k && m && m.text === "Maiden's Tower" && !m.aliasOf && k.aliasOf !== 37102 && !k.aliasOf && (k.text === 'Kiz Kulesi' || k.text === 'Kız Kulesi')) {
    for (const [tid, typ] of Object.entries(k.typ)) {
      if (m.typ[tid] === undefined) { m.typ[tid] = typ; A.push(`linked: ${lab(m)} in ${tid} (typicality ${typ}): the link of ${lab(k)}, the same landmark (reviewer)`); }
      else if (typ < m.typ[tid]) m.typ[tid] = typ;
      const t = ix.theme.get(tid); if (t && nameLeak(t, m) && !(m.nameOkIn || []).includes(tid)) { m.nameOkIn = [...(m.nameOkIn || []), tid]; A.push(`  ${lab(m)} in ${tid}: nameOkIn (the full name is the member, as the other towers)`); }
      for (const g of t?.groups || []) { const i = g.indexOf(65572); if (i >= 0) g[i] = 37102; }
    }
    k.typ = {}; k.show = {}; k.use = {}; k.nameOkIn = []; k.kin = [];
    A.push(`${lab(k)} [${k.gloss}] becomes the translation alias "Kız Kulesi" of ${lab(m)} (Turkish name; familiarity ${k.fam}; gloss dropped, its text is not shared): one landmark stored twice (reviewer)`);
    k.text = 'Kız Kulesi'; k.aliasOf = 37102; k.aliasKind = 'translation'; k.gloss = ''; k.region = []; n += 2; newTexts.add('Kız Kulesi'); reindex(P);
  } }
// CHANGES-END

const REVIEW_TAIL = `Decided (standing approval; second-agent review 2026-11-23: "apply after five small fixes"):
  Keep the diacritics that English encyclopedias print. Leave a name plain where English has its own name for it, where the person writes
  their name plain in English, or where the form is technical (Turkish dotted capital İ, Romanian comma-below ș and ț). A given name on its
  own stays plain; a real person's full name follows that person.

How the candidates were found: every plain root of type place, person, title, proper or org that is linked to a theme (15,441 texts) was
looked up with the English Wikipedia API (action=query&redirects); a hit is a plain text whose article title is the same text with
diacritics (or, for a surname root, the end of the full title: Dvořák, Bartók, Saint-Saëns). 325 hits; 222 taken, less the three the reviewer kept plain (Nadia Comaneci, Chisinau, Ihsan Oktay Anar), plus four names holding a word accented here (section 2) and the Kız Kulesi merge (section 3); the rest left as below.
The Wikipedia title stands for "the usual written form in English encyclopedias"; Britannica and dictionaries were not checked one by one.

Not verified (no English Wikipedia article under the plain or accented title; left unchanged):
  El Silbon (El Silbón), Boitata (Boitatá).

Left as is: the English usage or the library's own precedent keeps them plain
  - English exonyms and plain English titles, as the library already treats them: Mexico City, Montreal (Montréal its alias), Quebec,
    Zurich (Zürich its alias), Zurich Hauptbahnhof, Istanbul; San Jose [US city] 35909 (San José 56849 is the Costa Rican capital).
  - Wikipedia's own title is plain: Chichen Itza, Teotihuacan, Tenochtitlan, Iztaccihuatl, Edzna, Kukulkan, Itzamna, Coppelia, Ernesto Sabato,
    Candido Portinari, Iguazu Falls, Alcazar, Cesar Chavez, Ruy Lopez, Chateau Marmont.
  - A capital İ only (English drops the dot, as in Istanbul): Izmir, Istiklal Avenue, Iznik, Ibrahim I, Ibrahim [name], Ihsan Oktay Anar; İbrahim Tatlıses is written Ibrahim Tatlıses (reviewer).
  - Technical forms (reviewer): Chisinau (Romanian comma-below ș, ț). A person who writes their name plain in English: Nadia Comaneci.
  - Swapped, not left: Citroen, Mariama Ba and Dara O Briain were plain roots with an accented alias (from the generation passes, no decision
    of Simon's found in git history); the accented text becomes the root and the alias takes the plain text (ids kept).
  - Japanese macrons (precedent: Natsume Soseki root plain, v420): Yasujiro Ozu, Shonen Jump, Senso-ji, Ryoan-ji, Todai-ji, Nijo Castle, Dotonbori,
    Kabukicho, Kyoto Station, Tokaido, Nakasendo, Kumano Kodo, Momotaro, Urashima Taro, Issun-boshi, Hattori Hanzo, Jurojin, Okuninushi, Ryujin,
    Shuten-doji, Hyakki Yagyo, Chojun Miyagi, Kenzaburo Oe, Ryunosuke Akutagawa, Matsuo Basho, Sei Shonagon, Ryu Murakami, Kobo Abe, Shusaku Endo,
    Seicho Matsumoto, Yoko Ogawa, Mori Ogai.
  - Nahuatl vowel marks, which English sources drop: Quetzalcoatl, Huitzilopochtli, Tlaloc, Coatlicue, Coyolxauhqui, Xochiquetzal, Tonatiuh, Centeotl,
    Tlazolteotl, Huehuecoyotl, Chicomecoatl, Itzpapalotl, Ometeotl, Xochipilli, Cihuacoatl, Mictecacihuatl, Tepeyollotl, Mictlan.
  - Yoruba tone marks: Oya, Olorun, Obatala, Orunmila, Osanyin, Babalu-Aye, Erinle, Ifa. Hawaiian: Waikiki, Haleakala, Kilauea.
  - Norse names in their English (popular) spelling: Ragnarok, Bifrost, Mjolnir, Tyr, Mimir, Hoenir, Fafnir, Jormungandr, Folkvangr, Brisingamen.
  - Other transliterations English usually prints plain: Nuwa, Urumqi, Wangari Maathai, Thabit ibn Qurra, Sukhbaatar, Giap, Ngugi wa Thiong'o
    (Ngũgĩ its alias), Constantin Brancusi, Gabriel Metsu, Manco Capac, Pisac, Meroe, Benicassim, Morrigan, Ronan [Marvel], Vezina,
    Kosciuszko [Mount Kosciuszko, the Australian name is plain], Wichi.
  - Dog and other breed names that the kennel clubs print plain: Munsterlander, Hamiltonstovare; Hagglund (unclear sense).
  - Given names in the names themes (one decision for the whole theme, for Simon): Jose, Maria, Lucia, Andres, Sebastian [Latin American names];
    Ayse, Baris, Ozlem, Hulya, Ibrahim, Suleyman ... [Turkish names]; Padraig, Ciaran, Sinead [Irish names]. Hits for Ozlem, Hulya, Padraig,
    Ciaran and Sinead were not taken, so the themes stay consistent.

The reverse case (accented roots; English Wikipedia title looked up for all 273): no root changed.
  - Wikipedia's title is the English name, not the plain form: Côte d'Ivoire (Ivory Coast), Côte d'Azur (French Riviera), Te Ika-a-Māui
    (North Island), Lourenço Marques (Maputo); kept: the library uses these names on purpose.
  - Galápagos penguin, Galápagos racer, Galápagos rail and Galápagos cormorant: Wikipedia prints the bird and snake names plain; kept by rule 8
    and the W7 decision (Galápagos keeps its accent in shown texts and the theme name).
  - Mérida, León, Vitória, Paraná, Narváez, Comté redirect from the accented title to a plain disambiguation page: not a reverse case.
  - Paricutín: Wikipedia writes Parícutin; Britannica Paricutín; kept.
  - café: the library has only the plain root cafe 29284 (no accented form). Rule 8 (Oxford prints café) would make café the root with cafe its
    alias; a common word, outside this names pass: left for a rule-8 pass on common words with facade, coupe and the like.

Follow-ups noticed (not changed here):
  - (Done in section 3, reviewer: Kız Kulesi 65572 is now the translation alias of Maiden's Tower 37102, which takes its famous towers link.)
  - Joan Miró, René Magritte and several of the retexted people have no surname synonym alias yet (people's-names rule).
`;

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (compared with the in-memory export before the changes)'}`];
const tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; theme indexes shift: ${tShift < 0 ? 'none' : 'from index ' + tShift}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
cmp.push(`Entry rows ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length}; added ${addedRows.length}${addedRows.length ? ` (rows ${ib.get(addedRows[0])}-${ib.get(addedRows.at(-1))}, at the end)` : ''}; removed ${removedRows.map(id => `${id} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
{ const st = x => { const o = []; let q = 0; for (const c of x.linkCount) { o.push(q); q += c; } return o; }, s0 = st(x0), s1 = st(x1);
  const fl = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
  cmp.push(`Link-index shifts: ${fl < 0 ? 'none' : `from row ${fl} (${name(x1.ids[fl])}) on, link positions move`}`); }
const textChanged = x1.ids.filter((id, i) => ia.has(id) && x0.text[ia.get(id)] !== x1.text[i]);
cmp.push(`Rows whose text changed: ${textChanged.length}`);
let fresh = [];
{ const chars = x => { const s = new Set(); for (const t of [...x.text, ...x.shown.map(v => v[0]), ...x.themeRows.map(r => r[1])]) for (const ch of String(t)) s.add(ch); return s; };
  const had = new Set([...chars(x0), ...(baseOk ? chars({ text: CE.text, shown: CF.shown || [], themeRows: CF.themes }) : [])]);
  fresh = [...chars(x1)].filter(ch => !had.has(ch));
  cmp.push(`New characters in the export (the game font needs them): ${fresh.map(ch => `${ch} U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(', ') || 'none'}`); }
// line-break points: tokens of 8+ letters in the new texts that data/breaks-en.txt lacks (node tools/brk-tokens.mjs at apply)
const WORD = /\p{L}[\p{L}']*\p{L}|\p{L}/gu, brk = new Set();
for (const t of newTexts) for (const m of t.matchAll(WORD)) { const w = m[0].toLowerCase(); if (w.replace(/'/g, '').length >= MIN_BREAK_LETTERS && !BRK.has(w)) brk.add(w); }

const kinds = {}; for (const d of done) kinds[d.type] = (kinds[d.type] || 0) + 1;
const summary = [`Library batch v449: tidy-up follow-up, the diacritics pass. ${done.length} roots retexted to their accented form (${Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}), ${added.length} plain spelling aliases added, ${skipped.length} skipped.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  `Skipped ${skipped.length}: ${skipped.join('; ') || 'none'}`,
  `New words of ${MIN_BREAK_LETTERS}+ letters without line-break points (${brk.size}; node tools/brk-tokens.mjs, then tools/gen/brk/BRIEF-brk.md and node tools/brk-merge.mjs todo at apply): ${[...brk].sort().join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const body = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
const NOTICE = [
  'Notice for the game (_WS_; send only on Simon\'s word):',
  `  Library v449: ${done.length} names and titles now carry the diacritics of their usual English written form (Cancún, Querétaro, Yucatán, Zócalo,`,
  '  Belém Tower, Topkapı Palace, Göreme, Málaga, Reykjavík, Gdańsk, Édouard Manet, Salvador Dalí, Joan Miró, Diego Velázquez,',
  '  Paul Cézanne, Dvořák, Bartók, Charlotte Brontë, Les Misérables, La Bohème, Die Walküre, Beyoncé, Kimi Räikkönen ...); the surname',
  '  aliases Dalí, Cézanne, Velázquez, Gaudí, Zurbarán and Björn follow. Every one keeps its plain text as a spelling alias with no region,',
  `  so the old text still finds it (${added.length} new aliases; ${addedRows.length} new export rows, appended at the end of the entry table: no row of an existing entry moves).`,
  '  Entry texts change in place (same rows); no theme row or theme index changes; links change only for Kız Kulesi (below); shown texts follow the root (Adélie, Topkapı,',
  '  Yucatán, Wānaka, Göta, Belém, Rüppell\'s in their themes). Two new glosses: San Sebastián [city] / [film festival], Médoc [wine region] / [marathon].',
  "  Kız Kulesi 65572 is now a translation alias of Maiden's Tower 37102 (export row kept, now an alias row); Maiden's Tower takes its famous towers link, so link positions move from row 33953 (Calgary Tower) on.",
  `  New characters for the game font: ${fresh.map(ch => `${ch} U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(', ') || 'none'}.`,
  '  Please confirm that the game font covers Latin-1 Supplement and Latin Extended-A (U+00C0-U+017F): all the new letters are in these two blocks.',
  '  Line-break points for the new long words are added at apply (data/breaks-en.txt).'].join('\n') + '\n';
if (CHANGES) fs.writeFileSync(CHANGES, body + '\n' + NOTICE);
if (REVIEW) fs.writeFileSync(REVIEW, body + '\n' + REVIEW_TAIL);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
