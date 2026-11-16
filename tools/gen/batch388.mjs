// Library batch v388 (2026-11-16, Simon: "do all"): rule 9 applied to the place-named wines v385 found outside its recheck list, read again on dictionary pages this session;
//   yoğurt merged into yogurt under amended rule 8. hoover [verb] and Côtes du Rhône, Liebfraumilch, Gavi: reported, not changed (see the changes file).
//   SPLIT: Rioja and Beaujolais served the wine and the region in one entry: a new "Rioja" / "Beaujolais" [wine region] (place) takes "wine regions", as Sancerre at v385.
//   RECASE: the wine entry (old id kept) is lowercased, common, gloss "wine": rioja, beaujolais, chianti, marsala (rule 9: the dictionaries disagree).
//   MERGE: yoğurt (62335) becomes a spelling alias of yogurt (522), its link moves to the root and "Turkish everyday words" (locked) shows yoğurt, as raki at v385.
// Every call and its evidence: tools/gen/batch388-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch388.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const strip = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/ı/g, 'i').toLowerCase();
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'region', 'aliasOf', 'aliasKind'];
const short = e => KEYS.filter(k => !(k === 'region' && !e.region?.length) && !(k === 'aliasOf' && !e.aliasOf) && !(k === 'aliasKind' && !e.aliasKind) && !(k === 'gloss' && !e.gloss) && !(k === 'tm' && !e.tm)).map(k => `${k}=${JSON.stringify(e[k])}`).join(' ')
  + ` links={${Object.entries(e.typ || {}).map(([k, v]) => k + ':' + v).join(',')}}${Object.keys(e.show || {}).length ? ' show=' + JSON.stringify(e.show) : ''}`;
let msgs = new Set();
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } msgs = [msgs, m]; return c; };
const before = count();
const groupsWith = id => { const r = []; for (const t of P.themes) for (const g of t.groups || []) if (g.includes(id)) r.push([t, g]); return r; };
const swapInGroups = (from, to) => { for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.includes(from) ? [...new Set(g.map(x => x === from ? to : x))] : g).filter(g => g.length > 1); };
const log = { A: [], B: [] };
let n = 0;

// Merge alias-to-be `aid` into root `rid` (same word, same sense), as batch385. opt.show: { themeId: text } shown on the root after the move.
function merge(rid, aid, why, opt = {}) {
  const r = E(rid), a = E(aid);
  if (a.aliasOf === rid && !Object.keys(a.typ).length) return null;
  if (strip(r.text) !== strip(a.text)) throw Error(`merge ${rid}/${aid}: texts differ beyond accents`);
  if (a.aliasOf || r.aliasOf || Object.keys(a.use || {}).length || Object.keys(r.use || {}).length) throw Error(`merge ${rid}/${aid}: aliases or use, check by hand`);
  if (P.entries.some(x => x.use && Object.values(x.use).includes(aid))) throw Error(`merge ${rid}/${aid}: a use points at ${aid}`);
  if (P.entries.some(x => x.aliasOf === rid && x.text === a.text)) throw Error(`merge ${rid}/${aid}: root already has an alias "${a.text}"`);
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
  for (const x of P.entries) if (x.aliasOf === aid) throw Error(`merge ${rid}/${aid}: ${aid} has aliases, re-parent first`);
  Object.assign(a, { type: r.type, typ: {}, show: {}, use: {}, nameOkIn: [], aliasOf: rid, aliasKind: 'spelling', region: [], fam });
  reindex(P);
  for (const tid of Object.keys(r.typ)) { const t = P.ix.theme.get(tid); if (t && !nameLeak(t, r.show?.[tid] ? { ...r, text: r.show[tid] } : r) && nameLeak(t, a)) a.nameOkIn.push(tid); }
  n++;
  return `${rid} before: ${wasR}\n${aid} before: ${wasA}\n${rid} after:  ${short(r)}\n${aid} after:  ${short(a)}\n  links moved to ${rid}: ${moved.join(', ') || 'none'}${kept.length ? '; ' + kept.join('; ') : ''}${gs.length ? '; groups: ' + gs.join(', ') : ''}\n  (${why})`;
}
// The wine and the region share entry `id`: a new [wine region] place entry takes "wine regions" (as Sancerre, v385).
function splitRegion(id, text) {
  const e = E(id), done = P.entries.find(x => x !== e && x.text === text && x.gloss === 'wine region');
  if (done) { if ('wine_regions' in e.typ || !('wine_regions' in done.typ)) throw Error(`${text}: half split, check by hand`); return null; }
  if (e.text !== text || !('wine_regions' in e.typ)) throw Error(`${text} ${id} not as expected`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length || e.show?.wine_regions || e.nameOkIn?.includes('wine_regions')) throw Error(`${text}: check by hand`);
  const was = short(e);
  const x = addEntry(P, text, { pos: e.pos, fam: e.fam, status: e.status, region: [], gloss: 'wine region', type: 'place', typ: { wine_regions: e.typ.wine_regions }, show: {}, use: {}, nameOkIn: [] });
  delete e.typ.wine_regions;
  for (const g of P.ix.theme.get('wine_regions').groups || []) { const i = g.indexOf(id); if (i >= 0) g[i] = x.id; }
  reindex(P); n++;
  return `${id} before: ${was}\n${id} after:  ${short(e)}\n${x.id} new:    ${short(x)}\n  (the region keeps its capital as a place in "wine regions" (siblings Bordeaux, Sancerre [wine region]: place); one entry served both senses; the wine is lowercased below)`;
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

// ---------- A. place-named wines, rule 9 (dictionary pages read 2026-11-16, this session) ----------
const W = 'rule 9: the dictionaries disagree, so lowercase';
push('A', splitRegion(19665, 'Rioja'));
push('A', recase(19665, 'Rioja', { text: 'rioja', type: 'common', gloss: 'wine' }, W + ' (M-W rioja "variants often Rioja"; Collins rioja; Random House Rioja; Oxford Learner\'s Rioja)'));
push('A', splitRegion(19670, 'Beaujolais'));
push('A', recase(19670, 'Beaujolais', { text: 'beaujolais', type: 'common', gloss: 'wine' }, W + ' (Collins beaujolais "(sometimes capital)"; M-W Beaujolais; Random House Beaujolais; Oxford Learner\'s Beaujolais)'));
push('A', recase(19662, 'Chianti', { text: 'chianti', type: 'common', gloss: 'wine' }, W + ' (Collins chianti "(sometimes capital)"; M-W Chianti; Random House Chianti; Oxford Learner\'s Chianti); Chianti [region] 36455 stays a capital place'));
push('A', recase(19675, 'Marsala', { text: 'marsala', type: 'common', gloss: 'wine' }, W + ' (M-W marsala "variants often Marsala"; Random House Marsala; Collins Marsala "(sometimes not capital)"; Oxford Learner\'s Marsala); Marsala [town] 38125 stays a capital place'));

// ---------- B. yoğurt / yogurt (amended rule 8) ----------
push('B', merge(522, 62335, 'yogurt: one food; amended rule 8: no English dictionary prints yoğurt (M-W yogurt "or less commonly yoghurt", Oxford Learner\'s yogurt "British English also yoghurt", Cambridge yogurt, Random House yogurt "Or yoghurt", Collins yogurt; yoğurt appears only in the etymologies of M-W and Dictionary.com; Wordnik has no definitions for yoğurt), so the plain root stays, yoğurt becomes its spelling alias; "Turkish everyday words" (locked) shows yoğurt, as raki/rakı', { show: { turkish_everyday_words: 'yoğurt' } }));

reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const [[, b], a] = msgs; const nw = [...a].filter(x => !b.has(x)), gone = [...b].filter(x => !a.has(x)); if (nw.length || gone.length) console.log(`new issues:\n  ${nw.join('\n  ') || 'none'}\ngone:\n  ${gone.join('\n  ') || 'none'}`); }
const SECT = { A: 'A. place-named wines lowercased under rule 9 (dictionaries read this session), Rioja and Beaujolais split from their regions', B: 'B. yoğurt merged into yogurt (amended rule 8)' };
const body = Object.entries(log).map(([k, v]) => `${SECT[k]} (${v.length}):\n${v.join('\n') || '  none'}`).join('\n\n');
console.log(body);
console.log(`\n${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = '(evidence, items not changed and hoover [verb]: written once at v388; see the committed batch388-changes.txt)';
  fs.writeFileSync(new URL('batch388-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch388.mjs, ${P.lib.modified}): ${n} changes (rule 9: rioja, beaujolais, chianti, marsala lowercased, Rioja and Beaujolais regions split off; yoğurt a spelling alias of yogurt; hoover [verb] not done, see below).\nChecks: changed kinds ${diff.join(', ') || 'none'}\n\n${body}\n\n${NOTE}`);
  console.log('library v' + P.lib.version);
}
