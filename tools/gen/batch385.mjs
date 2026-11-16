// Library batch v385 (2026-11-16, Simon: "do"): closes ISSUES.md T25, settles the "recheck" wines of v384 from dictionary pages read this session, keeps Bordeaux capital.
//   MERGE: one word stored as two roots becomes one root and a spelling alias (links, groups, shown texts, name allowances move to the root; both ids kept), as batch381/383.
//      Māori words: the macron form is the root (Simon: New Zealand English dictionaries and official usage write macrons). raki, doner: the English headword is the root,
//      the Turkish-word theme shows the Turkish spelling through `show`. droewors: the dictionary headword is the root. dragées: the accented headword is the root.
//   DUP: a root that repeats an existing alias (same text, same sense): its links move to the surviving root, then it is deleted with deleteEntry (vicuna, agogo, maitre d').
//   VUELTA: three-way: Vuelta a Espana becomes a spelling alias of Vuelta a España, the abbreviation the Vuelta moves to that root, the alias that repeats the root's text is deleted.
//   RECASE: text, type or gloss changes (Pokémon accents, ancien régime, place-named wines lowercased under rule 9).
//   SPLIT: Sancerre keeps the region (place), a new Sancerre [wine] (proper) takes "white wines".
// Every call and its reason: tools/gen/batch385-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch385.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, deleteEntry } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const has = id => P.ix.entry.has(id);
const strip = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/ı/g, 'i').toLowerCase();
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'region', 'aliasOf', 'aliasKind'];
const short = e => KEYS.filter(k => !(k === 'region' && !e.region?.length) && !(k === 'aliasOf' && !e.aliasOf) && !(k === 'aliasKind' && !e.aliasKind) && !(k === 'gloss' && !e.gloss) && !(k === 'tm' && !e.tm)).map(k => `${k}=${JSON.stringify(e[k])}`).join(' ')
  + ` links={${Object.entries(e.typ || {}).map(([k, v]) => k + ':' + v).join(',')}}${Object.keys(e.show || {}).length ? ' show=' + JSON.stringify(e.show) : ''}`;
let msgs = new Set();
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } msgs = [msgs, m]; return c; };
const before = count();
const groupsWith = id => { const r = []; for (const t of P.themes) for (const g of t.groups || []) if (g.includes(id)) r.push([t, g]); return r; };
const swapInGroups = (from, to) => { for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.includes(from) ? [...new Set(g.map(x => x === from ? to : x))] : g).filter(g => g.length > 1); };
const log = { A: [], B: [], C: [], D: [] };
let n = 0;

// Merge alias-to-be `aid` into root `rid` (same word, same sense). opt.show: { themeId: text } shown on the root after the move; opt.dupOk: the root already has an alias with a's text (a is deleted next).
function merge(rid, aid, why, opt = {}) {
  if (opt.dupOk && !has(aid)) return null;   // merged and deleted on an earlier run
  const r = E(rid), a = E(aid);
  if (a.aliasOf === rid && !Object.keys(a.typ).length) return null;
  if (strip(r.text) !== strip(a.text)) throw Error(`merge ${rid}/${aid}: texts differ beyond accents`);
  if (a.aliasOf || r.aliasOf || Object.keys(a.use || {}).length || Object.keys(r.use || {}).length) throw Error(`merge ${rid}/${aid}: aliases or use, check by hand`);
  if (P.entries.some(x => x.use && Object.values(x.use).includes(aid))) throw Error(`merge ${rid}/${aid}: a use points at ${aid}`);
  if (!opt.dupOk && P.entries.some(x => x.aliasOf === rid && x.text === a.text)) throw Error(`merge ${rid}/${aid}: root already has an alias "${a.text}"`);
  const wasR = short(r), wasA = short(a), moved = [], kept = [];
  for (const [tid, v] of Object.entries(a.typ)) {
    if (tid in r.typ) { kept.push(`${tid} (both linked: root keeps its rating ${r.typ[tid]}, the alias's ${v} dropped)`); continue; }
    r.typ[tid] = v; if (a.show?.[tid]) { r.show ||= {}; r.show[tid] = a.show[tid]; }
    if (a.nameOkIn?.includes(tid)) r.nameOkIn = [...new Set([...(r.nameOkIn || []), tid])];
    moved.push(tid);
  }
  for (const [tid, s] of Object.entries(opt.show || {})) { if (!(tid in r.typ)) throw Error(`merge ${rid}/${aid}: show for ${tid}, not linked`); r.show ||= {}; r.show[tid] = s; }
  const gs = groupsWith(aid).map(([t]) => t.id); swapInGroups(aid, rid);
  const fam = Math.min(r.fam || 5, a.fam || 5); r.fam = fam; r.tm ||= a.tm;
  const reg = a.region?.length ? ` (alias region ${a.region} dropped, as batch383)` : '';
  for (const x of P.entries) if (x.aliasOf === aid) throw Error(`merge ${rid}/${aid}: ${aid} has aliases, re-parent first`);
  Object.assign(a, { type: r.type, typ: {}, show: {}, use: {}, nameOkIn: [], aliasOf: rid, aliasKind: 'spelling', region: [], fam });
  reindex(P);
  for (const tid of Object.keys(r.typ)) { const t = P.ix.theme.get(tid); if (t && !nameLeak(t, r.show?.[tid] ? { ...r, text: r.show[tid] } : r) && nameLeak(t, a)) a.nameOkIn.push(tid); }
  n++;
  return `${rid} before: ${wasR}\n${aid} before: ${wasA}\n${rid} after:  ${short(r)}\n${aid} after:  ${short(a)}${reg}\n  links moved to ${rid}: ${moved.join(', ') || 'none'}${kept.length ? '; ' + kept.join('; ') : ''}${gs.length ? '; groups: ' + gs.join(', ') : ''}\n  (${why})`;
}
function del(id, text, why) {
  if (!has(id)) return null;
  const e = E(id); if (e.text !== text) throw Error(`entry ${id} is "${e.text}", expected "${text}"`);
  if (Object.keys(e.typ).length || P.entries.some(x => x.aliasOf === id)) throw Error(`delete ${id}: still has links or aliases`);
  const was = short(e); deleteEntry(P, e); reindex(P); n++;
  return `${id} deleted: ${was}  (${why})`;
}
function reparent(id, text, root, kind, why) {
  const e = E(id); if (e.text !== text) throw Error(`entry ${id} is "${e.text}", expected "${text}"`);
  if (e.aliasOf === root && e.aliasKind === kind) return null;
  const was = short(e); e.aliasOf = root; e.aliasKind = kind; reindex(P); n++;
  return `${id} re-parented: ${was}  ->  aliasOf=${root} aliasKind=${kind}  (${why})`;
}
function recase(id, old, to, why) {
  const e = E(id);
  const want = { text: to.text ?? e.text, type: to.type ?? (e.type || 'common'), gloss: to.gloss ?? (e.gloss || '') };
  if (e.text === want.text && (e.type || 'common') === want.type && (e.gloss || '') === want.gloss) return null;
  if (e.text !== old) throw Error(`entry ${id} is "${e.text}", expected "${old}"`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length) throw Error(`entry ${id} has aliases or use: check by hand`);
  const twin = P.entries.find(x => x !== e && x.text === want.text && (x.gloss || '') === want.gloss); if (twin) throw Error(`"${want.text}" [${want.gloss}] would repeat ${twin.id}`);
  const elsewhere = P.entries.find(x => x !== e && Object.values(x.show || {}).includes(old)); if (elsewhere && old !== want.text) throw Error(`entry ${elsewhere.id} shows "${old}": check by hand`);
  const d = []; if (e.text !== want.text) d.push(`"${e.text}" -> "${want.text}"`); if ((e.type || 'common') !== want.type) d.push(`type ${e.type || 'common'} -> ${want.type}`); if ((e.gloss || '') !== want.gloss) d.push(`gloss "${e.gloss || ''}" -> "${want.gloss}"`);
  for (const [k, v] of Object.entries(e.show || {})) if (v === old) throw Error(`entry ${id} shows its own old text in ${k}`);
  e.text = want.text; e.type = want.type; e.gloss = want.gloss; n++;
  return `${id} ${d.join('  ')}  themes ${Object.keys(e.typ).join(', ')}  (${why})`;
}
const push = (k, s) => { if (s) log[k].push(s); };

// ---------- A. T25 (1): Māori words, macron root (9 pairs) ----------
const MAORI = 'Māori word, same sense: the macron form is the root (Simon, v385: New Zealand English dictionaries and official usage write macrons; rule 8 as for the cheeses); English themes now show the macron form';
for (const [r, a, w] of [[27112, 8231, 'kākāpō'], [27117, 8284, 'kākā (kaka [parrot]; Kaká the footballer 44519 is another entry, unchanged)'], [27084, 35433, 'whānau'], [27089, 35438, 'pākehā'],
  [27111, 51206, 'pūkeko'], [27113, 51200, 'tūī (TUI [airline] 59082 is another entry, unchanged)'], [27114, 51199, 'wētā'], [27115, 56563, 'pōhutukawa'],
  [57115, 37656, 'Kaikōura: one town and peninsula; official spelling since 2016']]) push('A', merge(r, a, `${w}: ${MAORI}`));

// ---------- B. T25 (2): duplicates ----------
// vicuna: 7939 vicuna [animal] repeats alias 9720 "vicuna" of 9719 vicuña (M-W vicuña, variant vicuna; Oxford Learner's not checked). Links move to 9719, then 7939 is deleted.
push('B', merge(9719, 7939, 'vicuña: one animal; M-W headword vicuña ("or vicuna"); 9720 "vicuna" already is its spelling alias', { dupOk: true }));
push('B', del(7939, 'vicuna', 'repeats 9720 "vicuna", spelling alias of 9719 vicuña; its links moved to 9719 above'));
// agogo: 10617 agogo [percussion] repeats alias 46481 "agogo" of 46480 agogô.
push('B', merge(46480, 10617, 'agogô: one instrument; M-W, Random House, Collins and Oxford Learner\'s have no entry, so rule 8 takes the original-language (Brazilian Portuguese) spelling, the library\'s existing root; Wiktionary prints agogo (call for Simon); 46481 "agogo" already is its spelling alias', { dupOk: true }));
push('B', del(10617, 'agogo', 'repeats 46481 "agogo", spelling alias of 46480 agogô; its links moved to 46480 above'));
// maitre d': 33023 maitre d' [restaurant host] repeats alias 20028 "maitre d'" [head waiter] of 20027 maître d'.
push('B', merge(20027, 33023, 'maître d\': one sense (head waiter, restaurant host); 20028 "maitre d\'" already is its spelling alias', { dupOk: true }));
push('B', del(33023, 'maitre d\'', 'repeats 20028 "maitre d\'", spelling alias of 20027 maître d\'; its link moved to 20027 above'));
// Vuelta a España: three-way.
push('B', reparent(47964, 'the Vuelta', 44325, 'abbreviation', 'the abbreviation follows the race to the accented root before its old root becomes an alias'));
push('B', del(47965, 'Vuelta a España', 'an alias of 47963 whose text repeats root 44325 Vuelta a España (same race): a true duplicate'));
push('B', merge(44325, 47963, 'Vuelta a España: one race; the official Spanish spelling, as Santiago Bernabéu (v383); the plain form becomes its spelling alias'));
// dragées / dragees: both in "cake decorations"; the regional alias cachous moves to the root.
push('B', reparent(59461, 'cachous', 18265, 'regional', 'UK regional name for the same silver balls; follows the word to the root'));
push('B', merge(18265, 67138, 'dragées: one thing; M-W and Oxford Learner\'s headword dragée (accented); both were linked in "cake decorations" and one synonym group'));

// ---------- C. T25 (3): type or region calls ----------
push('C', recase(7104, 'Ancien Régime', { gloss: 'period' }, 'kept capital proper in "historical periods": a period name, as every sibling there (Belle Époque, Regency); the style rule keeps period names capital as separate entries; gloss added because two entries now share the text'));
push('C', recase(55127, 'ancien regime', { text: 'ancien régime', gloss: 'system' }, 'the political system in "French Revolution" (siblings sans-culottes, old regime common): M-W headword "ancien régime", lowercase and accented (rule 1, rule 8; ISSUES.md T16 noted the missing accent); a different sense from the period, so not merged'));
if (E(17804).region?.includes('ZA') && !E(17804).aliasOf) { log.C.push(`17804 "droewors" region ZA -> none  (sibling convention: biltong, boerewors, bobotie in "cured meats" and "South African food" carry no region)`); E(17804).region = E(17804).region.filter(x => x !== 'ZA'); n++; }
push('C', merge(17804, 53496, 'droewors: one sausage; rule 8: Wiktionary prints droewors (South Africa) and has no droëwors; M-W, Random House, Collins have no entry; the plain form is the root (call for Simon: the Afrikaans spelling is droëwors)'));
push('C', recase(13105, 'Pokemon', { text: 'Pokémon' }, 'rule 8: the official spelling, as 5787 Pokémon [video game]; type stays proper with tm by its siblings in "anime and manga words" (Naruto, One Piece, Sailor Moon: proper, tm)'));
push('C', recase(45434, 'Pokemon', { text: 'Pokémon' }, 'rule 8: the official spelling; type stays proper with tm by its siblings in "card games" (Magic: The Gathering, Phase 10, Skip-Bo: proper, tm; only Uno is org)'));
push('C', merge(19298, 26967, 'raki: one drink; M-W, Random House, Collins and Oxford Learner\'s all print raki: the root (rule 8); "Turkish everyday words" (locked) shows rakı', { show: { turkish_everyday_words: 'rakı' } }));
push('C', merge(29440, 26966, 'doner: one dish; Oxford Learner\'s "doner kebab", Wiktionary doner (döner an alternative form): the root (rule 8); "Turkish everyday words" (locked) shows döner', { show: { turkish_everyday_words: 'döner' } }));

// ---------- D. wines (rule 9, dictionary pages read 2026-11-16) and Sancerre ----------
const W = 'rule 9: the dictionaries disagree, so lowercase';
push('D', recase(19673, 'Lambrusco', { text: 'lambrusco', type: 'common' }, W + ' (Random House lambrusco; M-W, Collins, Oxford Learner\'s, Wiktionary Lambrusco)'));
push('D', recase(19682, 'Amarone', { text: 'amarone', type: 'common' }, W + ' (M-W amarone; Wiktionary Amarone; not in Random House, Collins, Oxford Learner\'s)'));
push('D', recase(53822, 'Soave', { text: 'soave', type: 'common' }, W + ' (Random House soave; M-W, Collins, Wiktionary Soave)'));
push('D', recase(53807, 'Valpolicella', { text: 'valpolicella', type: 'common' }, W + ' (M-W valpolicella, "often Valpolicella": the cheddar rule; Random House, Collins, Wiktionary Valpolicella)'));
{ // Sancerre: split the wine from the region
  const e = E(36456), done = P.entries.find(x => x.text === 'Sancerre' && x.gloss === 'wine');
  if (!done) {
    if (e.text !== 'Sancerre' || !('white_wines' in e.typ)) throw Error('Sancerre 36456 not as expected');
    if (e.aliasOf || P.entries.some(a => a.aliasOf === e.id) || Object.keys(e.use || {}).length || e.show?.white_wines) throw Error('Sancerre: check by hand');
    const was = short(e);
    const x = addEntry(P, 'Sancerre', { pos: e.pos, fam: e.fam, status: e.status, region: [], gloss: 'wine', type: 'proper', typ: { white_wines: e.typ.white_wines }, show: {}, use: {}, nameOkIn: [] });
    delete e.typ.white_wines; e.gloss ||= 'wine region';
    for (const g of P.ix.theme.get('white_wines').groups || []) { const i = g.indexOf(e.id); if (i >= 0) g[i] = x.id; }
    log.D.push(`36456 before: ${was}\n36456 after:  ${short(e)}\n${x.id} new:    ${short(x)}\n  (the wine is typed proper with a capital, as its siblings Chablis, Sauternes, Gavi in "white wines" (M-W, Random House, Collins, Wiktionary all print Sancerre); the region stays place in "wine regions", gloss as Bordeaux [wine region]; one entry served both senses)`);
    n++;
  }
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const [[, b], a] = msgs; const nw = [...a].filter(x => !b.has(x)), gone = [...b].filter(x => !a.has(x)); if (nw.length || gone.length) console.log(`new issues:\n  ${nw.join('\n  ') || 'none'}\ngone:\n  ${gone.join('\n  ') || 'none'}`); }
const SECT = { A: 'A. Māori words: macron root, plain spelling alias (T25 item 1)', B: 'B. duplicates (T25 item 2)', C: 'C. type, region and spelling calls (T25 item 3)', D: 'D. place-named wines (rule 9, dictionaries read this session) and Sancerre' };
const body = Object.entries(log).map(([k, v]) => `${SECT[k]} (${v.length}):\n${v.join('\n') || '  none'}`).join('\n\n');
console.log(body);
console.log(`\n${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = `Method: Simon's rules 1 to 9 (DESIGN-entries.md "Single-word names"), sibling convention in each theme, and dictionary pages read on 2026-11-16 in the
  built-in browser (read-only, no sign-in): Merriam-Webster (merriam-webster.com), Dictionary.com (Random House Unabridged, US, and Collins English
  Dictionary, UK, on one page), Oxford Learner's (oxfordlearnersdictionaries.com), Wiktionary. collinsdictionary.com answered with a bot check (403):
  not used. Merges and deletes follow batch381/383; deletes go through deleteEntry after the links moved (no link lost; the survivor holds every theme
  link the deleted entry had).
Git history: no Simon decision on any of these words (git log --grep on each word; DESIGN-entries.md and ISSUES.md mention them only as T16/T24/T25 items).

T25 item 4 (doubtful tm), decided by rule 7, no change:
  aspirin: no tm. M-W, Random House, Oxford Learner's print it lowercase with no trademark label (Random House: "originally a German trademark").
  cellophane: no tm. M-W lowercase, no label; Random House "formerly trademark"; Collins prints Cellophane but gives no trademark label.
  laundromat: no tm, stays lowercase. M-W "Laundromat ... or laundromat ... formerly a U.S. registered trademark"; Random House laundromat ("formerly a
    trademark"); Collins Laundromat: dictionaries disagree on the capital (rule 6: lowercase), and a former trademark takes no tm (rule 7).
  Uber and Hoover (also in item 4): settled by rule 6 at v384 (Hoover capital org tm, both dictionaries capitalise the noun; Uber has no generic use). No change.
T25 item 5 (Burgundy): settled at v384; its dictionary basis is confirmed below.

Place-named wines: the dictionary evidence (wine sense; the form each prints). Rule 9: capital only when the dictionaries capitalise the sense; a
disagreement, or M-W "often capitalized" on a lowercase headword, is lowercase. Verified = two dictionaries agree, or a clear disagreement.
  Lowercased (above): Lambrusco, Amarone, Soave, Valpolicella.
  Kept capital (verified capital; the v384 "recheck" expectations for Chablis, Sauternes, Madeira were wrong):
    Barolo: M-W Barolo; Random House Barolo; Collins Barolo "(sometimes not capital)". Oxford Learner's: no entry.
    Brunello: M-W Brunello; Wiktionary Brunello. Random House, Collins, Oxford Learner's: no entry.
    Orvieto: M-W Orvieto; Random House Orvieto; Collins Orvieto (wine sense of the town entry).
    Frascati: Random House Frascati; Collins Frascati; Wiktionary Frascati (M-W has only the town).
    Chablis: M-W Chablis; Random House Chablis; Collins Chablis "(sometimes not capitals)"; Oxford Learner's Chablis.
    Sauternes: M-W headword sauternes, sense 1 printed "Sauternes" (the French wine; sense 2 sauterne is the American blend); Random House
      Sauternes; Collins Sauternes "(sometimes not capital)".
    Madeira: M-W Madeira; Collins Madeira (wine sense of the island entry); Oxford Learner's Madeira; Random House Madeira "(often lowercase)".
    Sancerre: M-W Sancerre; Random House Sancerre; Collins Sancerre; Wiktionary Sancerre. Split from the region (above).
  Kept capital, a call for Simon: Tokaji: no major dictionary has "Tokaji"; M-W, Random House and Collins print the same wine as "Tokay", capital;
    Wiktionary has only "tokaji", lowercase, as an alternative form of tokay. Read as capital (the three major dictionaries), unchanged.
  Unverified, unchanged: Gavi (no entry in M-W, Random House, Collins, Oxford Learner's or Wiktionary). Stays capital proper; for Simon.
  Found outside the recheck list (rule 9 would lowercase them; NOT changed, for Simon): Rioja (M-W rioja "often Rioja", Collins rioja; Random House
    and Oxford Learner's Rioja), Marsala (M-W marsala "often Marsala"; Random House, Oxford Learner's Marsala; Collins "(sometimes not capital)"),
    Chianti (Collins chianti "(sometimes capital)"; M-W, Random House, Oxford Learner's Chianti), Beaujolais (Collins beaujolais "(sometimes
    capital)"; M-W, Oxford Learner's Beaujolais).
  Burgundy [wine] (v384, lowercase) confirmed: M-W burgundy "or Burgundy"; Oxford Learner's burgundy; Random House Burgundy with "(often lowercase)".
Bordeaux 19663 [wine]: kept capital proper (Simon's precedent: the model for capital wine names). M-W Bordeaux ("or less commonly bordeaux"), Random
  House Bordeaux, Collins Bordeaux and Oxford Learner's Bordeaux all capitalise the wine, so rule 9 agrees and no rule exception is needed; it is
  recorded in DESIGN-entries.md as an explicit decision all the same. Lowercasing three red wines made "red wines" a theme of mostly common words, so
  the case lint warned on Bordeaux there (a common bordeaux [color] exists): allowed in js/caselint-allow.js ('19663|red_wines').

Calls Simon may override: Māori roots with macrons (general dictionaries M-W, Random House, Collins print kakapo, without macrons; English themes now
  show kākāpō, wētā ...); agogô root (only Wiktionary has the word, as agogo); droewors root (only Wiktionary, plain; the Afrikaans form is droëwors);
  raki and doner roots with the Turkish spellings shown only in "Turkish everyday words" (yoğurt / yogurt were left as two entries at v383; the same
  merge could apply); Lambrusco and Soave lowercased though only Random House prints them lowercase (rule 9 counts any disagreement); Tokaji kept capital;
  Ancien Régime [period] and ancien régime [system] kept as two senses.
Locked themes now show the root's form: "words from South American languages" shows vicuña (was vicuna); "Māori words" unchanged (its words were the
  macron roots already); "Turkish everyday words" shows rakı and döner through show texts.
Index shifts: four entries are deleted (7939 vicuna, 10617 agogo, 33023 maitre d', 47965 Vuelta a España alias); entries after each in the export move
  up. Sancerre [wine] is appended.`;
  fs.writeFileSync(new URL('batch385-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch385.mjs, ${P.lib.modified}): ${n} changes (ISSUES.md T25 closed; recheck wines settled from dictionary pages; Bordeaux kept). Supersedes v381 to v384 for the game.\nChecks: changed kinds ${diff.join(', ') || 'none'}\n\n${body}\n\n${NOTE}`);
  console.log('library v' + P.lib.version);
}
