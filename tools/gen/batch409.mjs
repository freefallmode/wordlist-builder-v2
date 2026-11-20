// Library batch v409 (Simon 2026-11-20: "replay Julia's branch as v409"): Julia's category work from the branch origin/julia-category-fixes
// (her library v366-v382, made on v365) replayed BY TEXT on top of v408. Her entry ids are never used: the branch's new ids mean other entries on main.
// The analysis and the plan are in tools/gen/julia-integration-report.md. Her word lists are the data modules in tools/gen/julia/ (tools/apply-words.mjs
// format, copied unchanged from the branch); her theme and fix scripts are ported here step by step, in her order, with these changes (Simon's decisions):
//   C1 clean-up: "colours named after fruit" is already merged (v407). bear_types is merged into bears with no second entry for one animal (bears keeps:
//      a complete species set under mammals, popularity 1; neither has sub-themes or a rule naming it). venomous biters goes into venomous snakes: the
//      copperhead and sidewinder of the biters theme move (their bare twins in venomous snakes leave; the copperhead twin is an exact duplicate and is
//      deleted), the Gila monster (a lizard) leaves. four humours keeps exactly blood, yellow bile, black bile and phlegm; its groups go.
//   Words: a word main already has under another spelling or form is linked, not made again (kneepads, multitool, wallride, the skateboard manual,
//      helmet #20685, pump #7389, light #27963 shown "lights"); her spelling becomes a spelling alias (a form alias for lights). A form alias she linked
//      (peanuts, raisins, dried apricots, made form aliases by I23) is linked through its root with use. New words go only into her themes.
//   El Niño / La Niña leave climate change through their roots (el nino / la nina are their aliases since I23). soufflé dish gets the plain spelling
//      souffle dish. Kin: recycling/recycle, thrifting/thrift, gusher/gush, stoppie/stop, deposition (court)/deposit (every sense of stop and deposit,
//      as their kin already are). Entries left in no theme by her steps stay as they are (Simon, decision 4).
// Ratings are not judged here: an optional tools/gen/julia409-ratings.tsv (entryId, themeId or "fam", oldValue, newValue, reason) is applied where the
// old value still matches, and the reviewers' worklist is written: tools/gen/julia409-rating-work.tsv and -1/-2/-3.tsv (chunks by theme).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch409.mjs [--apply | --out <path>] [--lib <path>] [--review <path>] [--changes <path>] [--ratings <path>] [--work <dir>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteTheme, unlinkEntry, addEntry, indexEntry, sameText, deleteEntry, setKin, placeTheme, moveTheme, linkIds } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT, CLASH_MAX } from '../../js/family.js';
import { parseFreq, setFreq, zipf } from '../../js/freq.js';
import * as KITCHEN from './julia/kitchen.mjs';
import * as GREECE from './julia/greece.mjs';
import * as OUTDOOR from './julia/outdoor.mjs';
import * as OUTDOOR_HARD from './julia/outdoor-hard.mjs';
import * as ENVIRONMENT from './julia/environment.mjs';
import * as EARTH from './julia/earth-science.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
const RATINGS = arg('--ratings') || new URL('./julia409-ratings.tsv', import.meta.url), WORK = arg('--work');
if (APPLY && OUT) throw Error('--apply or --out, not both');
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const T = id => { const t = ix.theme.get(id); if (!t) throw Error('no theme ' + id); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp();
const members0 = new Map(); for (const e of P.entries) for (const t in e.typ) (members0.get(t) || members0.set(t, new Set()).get(t)).add(e.id);
const nextId0 = P.nextId;
// Done already? The batch writes all of it at once, so one of its new themes tells. A rerun skips the steps that are done instead of failing on them.
const DONE = ix.theme.has('soil_layers');
let n = 0;
const touched = new Set(), L = [], say = s => L.push('  ' + s), head = s => L.push(s);
const ch = (e) => { touched.add(e.id); n++; };
const miss = s => { if (!DONE) throw Error(s); };

// ---------- helpers (as in Julia's scripts; every change counts and marks the entry) ----------
const ungroup = (tid, ids) => { const t = T(tid); if (!t.groups) return; const g2 = t.groups.map(g => g.filter(i => !ids.includes(i))).filter(g => g.length > 1); if (JSON.stringify(g2) !== JSON.stringify(t.groups)) n++; t.groups = g2; if (!t.groups.length) delete t.groups; };
const drop = (tid, e) => { if (e.typ[tid] === undefined) return false; unlinkEntry(P, e, tid); ungroup(tid, [e.id]); ch(e); return true; };
const linked = (tid, spec) => {   // the entry linked to a theme with this text ('text|gloss' when the text has several meanings)
  const [text, gloss] = spec.split('|');
  const m = (ix.byTheme.get(tid) || []).filter(e => e.text === text && e.typ[tid] !== undefined && (gloss === undefined || e.gloss === gloss));
  if (m.length > 1) throw Error(`${m.length} entries "${spec}" linked to ${tid}`);
  if (!m.length) miss(`no entry "${spec}" linked to ${tid}`);
  return m[0];
};
const out = (tid, ...specs) => { const done = []; for (const s of specs) { const e = linked(tid, s); if (e && drop(tid, e)) done.push(s); } if (done.length) say(`${T(tid).name}: out ${done.join(', ')}`); reindex(P); };
const root = spec => { const [text, gloss] = spec.split('|'); const m = P.entries.filter(e => !e.aliasOf && e.text === text && (gloss === undefined || e.gloss === gloss)); if (m.length !== 1) throw Error(`${m.length} entries "${spec}"`); return m[0]; };
const link = (tid, spec, rating) => { const e = root(spec); if (e.typ[tid] !== rating) { e.typ[tid] = rating; ch(e); say(`${T(tid).name}: in ${spec} ${rating}`); } return e; };
const show = (tid, map) => { const s = []; for (const [text, short] of Object.entries(map)) { const e = linked(tid, text); if (e && e.show?.[tid] !== short) { e.show = Object.assign({}, e.show, { [tid]: short }); ch(e); s.push(short); } } if (s.length) say(`${T(tid).name}: shown short ${s.join(', ')}`); };
const group = (tid, ...specs) => {   // these words in one synonym group of the theme, joining any group one of them is in
  const t = T(tid), ids = specs.map(s => linked(tid, s)?.id).filter(Boolean); if (ids.length < 2) return;
  const g0 = JSON.stringify(t.groups || []);
  t.groups = (t.groups || []).filter(g => !g.some(i => ids.includes(i)) || (ids.push(...g.filter(i => !ids.includes(i))), false));
  t.groups.push([...new Set(ids)]);
  const norm = gs => JSON.stringify(gs.map(g => [...g].sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]));
  if (norm(t.groups) !== norm(JSON.parse(g0))) { n++; say(`${t.name}: group ${specs.join(' = ')}`); for (const id of ids) touched.add(id); }
};
const shownText = (e, tid) => (e.show?.[tid] || ix.entry.get(e.use?.[tid])?.text || e.text).toLowerCase();
const removeTheme = tid => { for (const e of P.entries) if (e.typ[tid] !== undefined) touched.add(e.id); deleteTheme(P, tid); n++; reindex(P); };
// Moves the words of `from` into `to` (Julia's merge: a member the target already has keeps the target's rating; a member whose shown text the target
// already shows is left out), then deletes `from`. skip: { entry id: reason }.
function merge(from, to, skip = {}) {
  if (!ix.theme.has(from)) { say(`done: ${from} is gone`); return; }
  const f = T(from), t = T(to);
  if (P.themes.some(k => k.parent === from)) throw Error(from + ' has sub-themes');
  const shown = new Set((ix.byTheme.get(to) || []).map(e => shownText(e, to)));
  const moved = [], kept = [], skipped = [];
  for (const e of P.entries) {
    if (e.typ[from] === undefined) continue;
    if (e.typ[to] !== undefined) { kept.push(e.text); continue; }
    if (skip[e.id] || shown.has(shownText(e, from))) { skipped.push(`${lab(e)}${skip[e.id] ? ` (${skip[e.id]})` : ''}`); continue; }
    e.typ[to] = e.typ[from]; moved.push(`${lab(e)} ${e.typ[to]}`); ch(e);
    if (e.show?.[from] !== undefined && e.show[to] === undefined) e.show[to] = e.show[from];
    if (e.nameOkIn?.includes(from) && !e.nameOkIn.includes(to)) e.nameOkIn.push(to);
  }
  for (const g of f.groups || []) {   // groups whose members are now in the target join the target's groups
    const m = g.filter(id => ix.entry.get(id)?.typ[to] !== undefined); if (m.length < 2) continue;
    t.groups = t.groups || [];
    const hits = [...new Set(m.map(id => t.groups.find(x => x.includes(id))).filter(Boolean))], first = hits[0] || [];
    for (const id of m) if (!first.includes(id)) first.push(id);
    for (const x of hits.slice(1)) { for (const id of x) if (!first.includes(id)) first.push(id); t.groups.splice(t.groups.indexOf(x), 1); }
    if (!hits.length) t.groups.push(first);
  }
  removeTheme(from);
  say(`merge ${from} "${f.name}" -> ${to} "${t.name}": moved ${moved.length} (${moved.join(', ') || 'none'}); already there ${kept.length}; left out ${skipped.length}${skipped.length ? ' (' + skipped.join(', ') + ')' : ''}; ${from} deleted`);
}
function makeThemes(list) {   // [id, name, parent, note]: a new theme under the theme it is a kind of
  for (const [id, name, parent, note] of list) {
    if (ix.theme.has(id)) continue;
    if (!ix.theme.has(parent)) throw Error('no parent ' + parent);
    if (P.themes.some(t => t.name.toLowerCase() === name.toLowerCase())) throw Error('a theme is already named ' + name);
    P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note });
    reindex(P); moveTheme(P, id, parent); reindex(P); n++; say(`new theme ${id} "${name}" under ${parent}`);
  }
}
function rename(map) {
  for (const [id, name] of Object.entries(map)) {
    const t = T(id); if (t.name === name) continue;
    const other = P.themes.find(x => x.name.toLowerCase() === name.toLowerCase()); if (other && other.id !== id) throw Error(`a theme is already named ${name} (${other.id})`);
    say(`rename ${id} "${t.name}" -> "${name}"`); t.name = name; n++;
  }
}
const move = (id, parent, where = 'in') => { const t = T(id); const want = where === 'in' ? parent : T(parent).parent; if (t.parent === want) return; if (!placeTheme(P, id, parent, where)) throw Error('move ' + id); reindex(P); n++; say(`move ${id} "${t.name}" under ${want}`); };

// ---------- Julia's word lists (tools/apply-words.mjs logic), with the main-entry links ----------
// A word main already has as another spelling or form: link that entry (her rating); her text becomes its alias.
const VARIANT = {
  'bike_gear|helmet|cycling': { id: 20685, text: 'helmet', why: 'the helmet main has (armor; also in protective gear and sports equipment)' },
  'bike_gear|pump|tire': { id: 7389, text: 'pump', why: 'a bike pump is a pump (machine)' },
  'bike_gear|knee pads|': { id: 24462, text: 'kneepads', alias: 'spelling' },
  'bike_gear|multi-tool|': { id: 25623, text: 'multitool', alias: 'spelling' },
  'bike_gear|lights|bicycle': { id: 27963, text: 'light', alias: 'form', use: true },
  'bike_park|wall ride|': { id: 48037, text: 'wallride', alias: 'spelling' },
  'bike_tricks|manual|bike': { id: 48023, text: 'manual', gloss: ['skateboard', 'trick'], why: 'the same trick on a skateboard or a bike' },
};
const clamp = v => Math.max(0, Math.min(5, v));
const newAlias = (r, text, kind, fam, region = [], o = {}) => {
  const have = sameText(P, text).find(x => (x.gloss || '') === (o.g || '') && x.aliasOf === r.id); if (have) return have;
  const a = addEntry(P, text, { gloss: o.g || '', pos: r.pos, type: o.type || r.type, fam: clamp(fam), aliasOf: r.id, aliasKind: kind, region, tm: o.tm ?? r.tm, adult: o.adult ?? r.adult, sensitive: o.sens ?? r.sensitive, vulgar: !!o.vulgar, status: 'gen' });
  indexEntry(P, a); ch(a); ch(r); return a;
};
function words(mod, label) {
  const st = { made: [], aliases: [], linked: 0, viaRoot: [], variant: [] }, at = L.length; L.push(label);
  for (const f of mod.FIXES || []) {
    const find = (text, tid) => sameText(P, text).filter(e => linkIds(P, e).includes(tid));
    if (f.gloss) {
      const [text, tid, gloss] = f.gloss, m = find(text, tid).filter(e => !e.gloss);
      if (m.length > 1) throw Error(`gloss: ${m.length} unlabelled entries for "${text}" in ${tid}`);
      if (m.length === 1) { m[0].gloss = gloss; ch(m[0]); say(`gloss: ${lab(m[0])} -> "${gloss}"`); }
    } else if (f.split) {
      const [text, tid, gloss, o = {}] = f.split, m = find(text, tid).filter(e => e.typ[tid] !== undefined);
      if (m.some(e => e.gloss === gloss)) continue;
      if (m.length !== 1) throw Error(`split: ${m.length} entries of "${text}" with their own link to ${tid}`);
      const old = m[0], r = old.typ[tid];
      unlinkEntry(P, old, tid); ch(old);
      const e = addEntry(P, text, { gloss, pos: o.pos || old.pos, type: o.type || 'common', fam: o.fam ?? old.fam, typ: { [tid]: r }, status: 'gen' }); indexEntry(P, e); ch(e);
      say(`split: ${tid} link of ${lab(old)} moves to the new ${lab(e)} ("${gloss}")`);
    } else throw Error('fix kind not ported: ' + Object.keys(f));
    reindex(P);
  }
  for (const [tid, rows] of Object.entries(mod.DATA)) {
    if (!ix.theme.has(tid)) throw Error('no such theme: ' + tid);
    if (T(tid).group) throw Error('theme is a group: ' + tid);
    for (const [text, r, typ, o = {}] of rows) {
      if (!(r >= 1 && r <= 5 && typ >= 1 && typ <= 5)) throw Error(`bad rating on "${text}" in ${tid}`);
      const v = VARIANT[`${tid}|${text}|${o.g || ''}`];
      if (v) {
        const e = E(v.id); if (e.text !== v.text || e.aliasOf) throw Error(`${v.id} is not the root ${v.text}`);
        if (v.gloss && e.gloss === v.gloss[0]) { e.gloss = v.gloss[1]; ch(e); }
        if (e.typ[tid] === undefined) { e.typ[tid] = typ; ch(e); st.variant.push(`${text} -> ${lab(e)} ${typ}${v.why ? ` (${v.why})` : ''}`); }
        if (v.alias) {
          const had = sameText(P, text).some(x => x.aliasOf === e.id), a = newAlias(e, text, v.alias, r, o.reg || []);
          if (v.use && e.use?.[tid] !== a.id) { e.use = Object.assign({}, e.use, { [tid]: a.id }); ch(e); }
          if (!had) st.variant.push(`  ${text} ${a.id}: new ${v.alias} alias of ${lab(e)}${v.use ? `, shown in ${tid} through use` : ''}`);
        }
        continue;
      }
      let e = sameText(P, text).find(x => (x.gloss || '') === (o.g || ''));
      if (e && e.aliasOf && ['form', 'spelling'].includes(e.aliasKind)) {   // her word is a form or spelling of a root now (I23): link the root
        const a = e; e = E(a.aliasOf);
        if (e.typ[tid] === undefined) { e.typ[tid] = typ; ch(e); st.viaRoot.push(`${a.text} -> root ${lab(e)} ${typ}${a.aliasKind === 'form' ? ', use ' + a.text : ''}`); }
        if (a.aliasKind === 'form' && e.use?.[tid] !== a.id) { e.use = Object.assign({}, e.use, { [tid]: a.id }); ch(e); }
        continue;
      }
      if (e) { if (e.typ[tid] === undefined) { e.typ[tid] = typ; ch(e); st.linked++; } continue; }
      e = addEntry(P, text, { gloss: o.g || '', pos: o.pos || 'noun', type: o.type || 'common', fam: clamp(r), typ: { [tid]: typ }, tm: !!o.tm, adult: !!o.adult,
        vulgar: !!o.vulgar, sensitive: !!o.sens, region: o.reg || [], note: o.note || '', status: 'gen' });
      indexEntry(P, e); ch(e); st.made.push(`${text}${o.g ? ` (${o.g})` : ''} ${e.id}`);
      for (const [at, kind, ar, ai, areg = [], ao = {}] of o.al || []) {
        if (!(ar >= 1 && ar <= 5 && ai >= 1 && ai <= 5)) throw Error(`bad alias rating on "${at}"`);
        const a = newAlias(e, at, kind, ar, areg, ao); if (ai !== Math.max(typ, ar)) a.typ[tid] = ai;
        st.aliases.push(`${at} (${kind}) ${a.id}`);
      }
    }
  }
  for (const [tid, rootText, rootGloss, rows] of mod.ALIASES || []) {
    const r = sameText(P, rootText).find(x => (x.gloss || '') === (rootGloss || '') && !x.aliasOf);
    if (!r) throw Error('no root for alias: ' + rootText);
    const typ = r.typ[tid] ?? 0;
    for (const [at, kind, ar, ai, areg = [], ao = {}] of rows) {
      if (sameText(P, at).some(x => (x.gloss || '') === (ao.g || '') && x.aliasOf === r.id)) continue;
      const a = newAlias(r, at, kind, ar, areg, ao); if (ai !== Math.max(typ, ar)) a.typ[tid] = ai;
      st.aliases.push(`${at} (${kind} of ${r.text}) ${a.id}`);
    }
  }
  for (const [tid, t] of Object.entries(mod.THEMES || {})) { const th = T(tid); for (const [k, v] of Object.entries(t)) if (JSON.stringify(th[k]) !== JSON.stringify(v)) { th[k] = v; n++; } }
  reindex(P);
  for (const [tid, ...specs] of mod.GROUPS || []) {
    const ids = specs.map(m => {
      const [text, gloss] = m.split('|'), hit = sameText(P, text).filter(e => !e.aliasOf && e.typ[tid] !== undefined && (gloss === undefined || (e.gloss || '') === gloss));
      if (hit.length !== 1) throw Error(`GROUPS ${tid}: ${hit.length} words match "${m}"`);
      return hit[0];
    });
    group(tid, ...ids.map(e => e.gloss ? `${e.text}|${e.gloss}` : e.text));
  }
  reindex(P);
  L[at] = `${label}: ${st.made.length} words made, ${st.aliases.length} aliases, ${st.linked} existing words linked`;
  if (st.made.length) say(`made: ${st.made.join(', ')}`);
  if (st.aliases.length) say(`aliases: ${st.aliases.join(', ')}`);
  for (const x of st.variant) say(`main entry linked: ${x}`);
  for (const x of st.viaRoot) say(`through the root: ${x}`);
}

// =============== C1. clean-up 1 (tools/gen/category-fixes-1.mjs on the branch) ===============
head('C1. clean-up 1');
for (const [tid, ids, names] of [['us_states', [36170, 36192], 'Virginia = West Virginia'], ['mexican_states', [36234, 36235], 'Baja California = Baja California Sur'],
  ['german_states', [36391, 36397, 36399], 'Saxony = Lower Saxony = Saxony-Anhalt']]) {
  const t = T(tid), g = (t.groups || []).find(g => g.length === ids.length && ids.every(i => g.includes(i)));
  if (!g) { miss(`no group ${ids} in ${tid}`); continue; }
  t.groups = t.groups.filter(x => x !== g); if (!t.groups.length) delete t.groups; n++; for (const id of ids) touched.add(id);
  say(`${tid}: group ${names} dropped (different states)`);
}
{ // four humours: exactly the four humours (Simon); the temperaments, the doctors and the other names leave, and so do the groups that tied them
  const tid = 'four_humours', t = T(tid), KEEP = { 3245: 'blood', 15548: 'phlegm', 15549: 'yellow bile', 15551: 'black bile' };
  for (const [id, text] of Object.entries(KEEP)) { const e = E(+id); if (e.text !== text || e.aliasOf || e.typ[tid] === undefined) throw Error(`${id} is not ${text} in ${tid}`); }
  const gone = [];
  for (const e of [...(ix.byTheme.get(tid) || [])]) if (!KEEP[e.id] && drop(tid, e)) gone.push(lab(e));
  if (t.groups) { delete t.groups; n++; say('four humours: groups dropped (they tied melancholy, melancholia, melancholic to black bile and choler, choleric to yellow bile)'); }
  if (!t.complete) { t.complete = true; n++; }
  if (gone.length) say(`four humours: out ${gone.join(', ')}; kept ${Object.keys(KEEP).map(id => lab(E(+id))).join(', ')}`);
  say('four humours: choler is an old name for yellow bile (a real synonym; not an answer here, left as it is); melancholy is Greek for "black bile" but means sadness now (not an alias)');
  reindex(P);
}
// nicknames: the link moves from the plain word to its nickname (a regional alias may hold links)
for (const [tid, rid, aid, atext] of [['nicknames_for_workers', 4083, 4085, 'firie'], ['nicknames_for_workers', 4091, 4092, 'sparky'], ['nicknames_for_workers', 4094, 4096, 'chippy'],
  ['nicknames_for_drinks', 226, 962, 'joe'], ['nicknames_for_drinks', 225, 964, 'char']]) {
  const r = E(rid), a = E(aid); if (a.aliasOf !== rid || a.text !== atext || a.aliasKind !== 'regional') throw Error(`${aid} is not the regional alias ${atext} of ${rid}`);
  if (r.typ[tid] === undefined) continue;
  a.typ[tid] = r.typ[tid]; ch(a); drop(tid, r); say(`${tid}: ${lab(r)} -> its nickname ${lab(a)} ${a.typ[tid]}`);
}
reindex(P);
{ const e = E(4242); if (e.text !== 'felony') throw Error('4242'); if (drop('wrongdoers', e)) say('wrongdoers: out felony (a crime, not a person)'); }
reindex(P);
{ // venomous biters -> venomous snakes (Simon: her merge; copperhead and sidewinder move, the Gila monster leaves)
  const src = 'animals_with_a_poisonous_bite', tgt = 'venomous_snakes';
  if (ix.theme.has(src)) {
    for (const [mid, twin, text] of [[1193, 50711, 'copperhead'], [1194, 27592, 'sidewinder']]) {
      const e = E(mid), w = E(twin); if (e.text !== text || w.text !== text) throw Error(`${mid}/${twin} are not ${text}`);
      if (w.typ[tgt] === undefined || e.typ[tgt] !== undefined) continue;
      const v = Math.min(w.typ[tgt], e.typ[src]); drop(tgt, w); e.typ[tgt] = v; ch(e);
      say(`venomous snakes: ${lab(e)} (gloss "${e.gloss}", the one in venomous biters and snakes) comes in at ${v}; its twin ${lab(w)} (gloss "${w.gloss}") leaves`);
    }
    reindex(P);
    merge(src, tgt, { 1174: 'a lizard, not a snake; it stays in venomous animals and lizards' });
  } else say(`done: ${src} is gone`);
  const dup = ix.entry.get(50711);   // the bare copperhead twin: the same snake, no theme left, nothing else on it
  if (dup && dup.text === 'copperhead') {
    if (Object.keys(dup.typ).length || dup.kin?.length || P.entries.some(x => x.aliasOf === dup.id)) throw Error('copperhead 50711 is not bare');
    deleteEntry(P, dup); n++; reindex(P); say('copperhead 50711 deleted: an exact duplicate of copperhead 1193 with no theme left');
  }
  const sw = E(27592); if (sw.typ[tgt] === undefined) say(`note: sidewinder 27592 (gloss "snake") keeps cowboy slang and desert; the snake is sidewinder 1194 — a later gloss pass may split them`);
}
merge('poem_forms', 'poetry_forms');
if (T('poetry_forms').parent !== T('poetry_terms').parent) move('poetry_forms', 'poetry_terms', 'after');
merge('kitchen_crew', 'kitchen_brigade');
merge('chef_roles', 'kitchen_brigade');
merge('whale_types', 'whales_and_dolphins');
merge('seal_types', 'seals_and_sea_lions');
merge('penguin_species', 'penguins');
move('penguins', 'flightless_birds');
// bears: one theme, one entry per animal. bears survives: the complete species set under mammals (popularity 1, identifiability 1); bear_types
// (popularity 3) only adds names of brown and black bears, which bears already holds. Neither has sub-themes or a rule naming it.
merge('bear_types', 'bears', { 7946: 'a brown bear (subspecies); brown bear is there', 7947: 'a brown bear (subspecies); brown bear is there',
  7949: 'the black bear itself; black bear is there', 7951: 'a colour form of the American black bear; black bear is there' });
merge('animals_of_the_far_north', 'arctic_animals', { 264: 'a working dog, not a wild Arctic animal', 9450: 'a working dog, not a wild Arctic animal' });
merge('animals_of_the_far_south', 'antarctic_animals');
merge('soggy_places', 'wetlands');
merge('famous_stretches_of_sand', 'famous_beaches');
{ const b = ix.entry.get(48967); if (b && b.text === 'Bondi' && !Object.keys(b.typ).length && !P.entries.some(x => x.aliasOf === b.id)) { deleteEntry(P, b); n++; reindex(P); say('Bondi 48967 (gloss "beach") deleted: no theme left; famous beaches has Bondi Beach shown "Bondi"'); } }

// =============== C3. kitchen ===============
head('C3. kitchen themes');
makeThemes([
  ['bakeware', 'bakeware', 'cookware', 'pans and dishes that go in the oven for baking: baking sheet, cake pan, muffin tin, pie dish'],
  ['kitchen_linens', 'kitchen linens', 'kitchen', 'cloth things used in the kitchen and at the table: apron, dish towel, oven mitt, tablecloth'],
  ['food_storage', 'food storage', 'containers', 'things for keeping food fresh: jar, plastic wrap, foil, freezer bag, cookie jar'],
]);
words(KITCHEN, 'C3. kitchen words');
{ const r = sameText(P, 'soufflé dish').find(e => !e.aliasOf); if (!r) throw Error('no soufflé dish'); const had = sameText(P, 'souffle dish').length;
  const a = newAlias(r, 'souffle dish', 'spelling', r.fam); if (!had) say(`souffle dish ${a.id}: plain spelling alias of ${lab(r)}`); }

// =============== C4. Ancient Greece ===============
head('C4. Ancient Greece themes');
makeThemes([
  ['greek_goddesses', 'Greek goddesses', 'greek_gods', 'female gods of Greek myth: Athena, Aphrodite, Hera, Artemis, Demeter, Persephone'],
  ['greek_myth_objects', 'Greek myth objects', 'greek_gods', 'famous objects in Greek myths: Trojan Horse, Pandora\'s box, Golden Fleece, golden apple'],
  ['greek_city_states', 'Greek city-states', 'ancient_greece', 'cities of ancient Greece that ruled themselves: Athens, Sparta, Corinth, Thebes'],
  ['ancient_greek_writers', 'ancient Greek writers', 'ancient_greece', 'poets, playwrights and historians of ancient Greece: Homer, Aesop, Sophocles, Sappho, Herodotus'],
  ['greek_buildings', 'Greek buildings', 'greek_landmarks', 'famous ancient buildings of Greece: Parthenon, Acropolis, Erechtheion, Temple of Poseidon'],
]);
words(GREECE, 'C4. Ancient Greece words');
{ // Greek landmarks: the buildings are in Greek buildings, the islands in Greek islands
  const FROM = 'greek_landmarks', MOVE = { greek_buildings: { 2334: 'Acropolis', 2335: 'Parthenon', 21806: 'Knossos', 37347: 'Temple of Poseidon', 37355: 'Erechtheion', 37356: 'Temple of Olympian Zeus',
    37771: 'Panathenaic Stadium', 37777: 'Propylaea', 37782: 'Lion Gate', 37783: 'Treasury of Atreus' }, greek_islands: { 21815: 'Santorini', 36600: 'Mykonos', 36601: 'Rhodes', 37770: 'Delos' } };
  const o = [];
  for (const [to, ids] of Object.entries(MOVE)) for (const [id, text] of Object.entries(ids)) {
    const e = E(+id); if (e.text !== text) throw Error(`${id} is not ${text}`); if (e.typ[to] === undefined) throw Error(`${text} is not in ${to}`);
    if (drop(FROM, e)) o.push(`${text} (in ${T(to).name})`);
  }
  if (o.length) say(`Greek landmarks: out ${o.join(', ')}`); reindex(P);
}

// =============== C5. outdoor ===============
head('C5. outdoor themes');
makeThemes([
  ['smores', 's\'mores', 'campfire_foods', 'what you need to make s\'mores: marshmallow, chocolate, graham cracker, campfire'],
  ['hiking_snacks', 'hiking snacks', 'outdoors', 'food to carry on a hike: trail mix, granola bar, energy bar, beef jerky, banana'],
  ['hiking_dangers', 'hiking dangers', 'outdoors', 'things that can go wrong or hurt you on a hike: blister, sunburn, tick, snake, lightning'],
  ['bike_gear', 'bike gear', 'bikes_and_boards', 'what a cyclist wears or carries: helmet, lock, pump, lights, gloves, water bottle'],
]);
words(OUTDOOR, 'C5. outdoor words');
show('climbing_styles', { 'indoor climbing': 'indoor', 'sport climbing': 'sport', 'lead climbing': 'lead', 'speed climbing': 'speed', 'aid climbing': 'aid', 'alpine climbing': 'alpine' });
{ const u = sameText(P, 'U-lock').find(e => e.aliasOf && ix.entry.get(e.aliasOf)?.text === 'D-lock'); if (!u) throw Error('no U-lock alias of D-lock');
  const want = [...new Set([...(u.nameOkIn || []), ...(E(u.aliasOf).nameOkIn || [])])]; if (want.length !== (u.nameOkIn || []).length) { u.nameOkIn = want; ch(u); say('U-lock: name allowance of D-lock (locks and keys)'); } }

// =============== C6. hard outdoor ===============
head('C6. hard outdoor themes');
makeThemes([
  ['climbing_holds', 'climbing holds', 'climbing_words', 'shapes of hold a climber grabs or stands on: jug, crimp, sloper, pinch, pocket'],
  ['bike_tricks', 'bike tricks', 'bikes_and_boards', 'BMX and mountain bike tricks: wheelie, bunny hop, manual, tailwhip, barspin'],
  ['bike_park', 'bike park', 'bikes_and_boards', 'features of a mountain bike park: berm, pump track, dirt jump, kicker, drop, rock garden'],
]);
words(OUTDOOR_HARD, 'C6. hard outdoor words');

// =============== C7. environment ===============
head('C7. environment themes');
rename({ pollution_words: 'pollution', recycling_words: 'recyclables', conservation_words: 'conservation', climate_words: 'climate change', green_living_words: 'green living' });
makeThemes([
  ['pollution_types', 'pollution types', 'pollution_words', 'kinds of pollution, shown short: air, water, soil, noise, light, plastic, thermal, visual'],
  ['oil_industry', 'oil industry', 'fossil_fuels', 'how oil and gas are got out and moved: oil rig, derrick, pump jack, drilling, fracking, refinery, pipeline, tanker'],
  ['protected_areas', 'protected areas', 'conservation_words', 'places set aside for nature: national park, nature reserve, sanctuary, marine park, game reserve'],
  ['greenhouse_gases', 'greenhouse gases', 'climate_words', 'gases that trap heat: carbon dioxide, methane, nitrous oxide, ozone, CFC'],
  ['eco_habits', 'eco habits', 'green_living_words', 'things people do to live greener: composting, recycling, carpooling, cycling, mending, line drying'],
  ['eco_swaps', 'eco swaps', 'green_living_words', 'reusable or greener things used instead of throwaway ones: reusable bag, metal straw, bamboo toothbrush, beeswax wrap'],
  ['eco_home', 'eco home', 'green_living_words', 'things in a home that save energy or water: solar panel, insulation, heat pump, smart meter, rain barrel'],
]);
words(ENVIRONMENT, 'C7. environment words');
head('C7. environment fixes');
show('pollution_types', { 'air pollution': 'air', 'water pollution': 'water', 'plastic pollution': 'plastic', 'noise pollution': 'noise', 'light pollution': 'light',
  'soil pollution': 'soil', 'land pollution': 'land', 'thermal pollution': 'thermal', 'visual pollution': 'visual' });
out('pollution_words', 'noise pollution', 'light pollution', 'pollutant', 'contamination', 'air quality', 'runoff|water runoff', 'smokestack', 'haze', 'landfill', 'eutrophication', 'greywater');
link('bins_and_recycling', 'reuse', 2); link('bins_and_recycling', 'reduce|waste', 3);
{ const plant = link('bins_and_recycling', 'recycling plant', 3); if (!(plant.nameOkIn || []).includes('bins_and_recycling')) { plant.nameOkIn = [...(plant.nameOkIn || []), 'bins_and_recycling']; ch(plant); } }
out('recycling_words', 'paper|newspaper', 'daily|newspaper', 'rag|newspaper', 'gazette|official journal', 'recycle', 'recyclable', 'recycling bin', 'bottle bank', 'compost', 'landfill',
  'reuse', 'reduce|waste', 'upcycle', 'repurpose', 'curbside collection', 'deposit scheme', 'recycling plant', 'MRF|recycling', 'refillable', 'reclaimed', 'salvage', 'sort|classify', 'rinse',
  'bale|bundle', 'pulp|paper', 'closed loop', 'downcycle', 'reprocess', 'single stream', 'feedstock');
out('renewable_energy', 'feed-in tariff', 'net metering', 'run-of-river', 'wave buoy', 'geothermal well', 'concentrated solar', 'green hydrogen', 'hydrogen', 'ethanol');
{ const skip = {}; if (ix.theme.has('renewable_sources')) for (const s of ['hydrogen', 'waste-to-energy', 'solar|sun power', 'sunlight|sun light', 'wind|energy', 'tidal|sea power', 'wave power']) skip[linked('renewable_sources', s).id] = 'stays out (Julia: a short form or it gives the name away)';
  merge('renewable_sources', 'renewable_energy', skip); }
show('oil_industry', { 'oil rig': 'rig' });
out('fossil_fuels', 'drilling', 'fracking', 'refinery', 'pipeline', 'wellhead', 'charcoal|fuel');
merge('buried_fuels', 'fossil_fuels');
out('conservation_words', 'national park', 'nature reserve', 'wildlife reserve', 'sanctuary|refuge', 'marine park', 'biosphere reserve', 'Ramsar site', 'Natura 2000',
  'protected area', 'conservation', 'ecosystem', 'habitat', 'biodiversity', 'extinction', 'sustainable', 'SSSI', 'ex situ', 'buffer zone', 'stewardship', 'green belt', 'rainforest', 'wetland');
// el nino / la nina are aliases of El Niño / La Niña since I23: their roots leave
out('climate_words', 'climate change', 'El Niño', 'La Niña', 'albedo|reflectivity', 'anomaly', 'radiative forcing', 'Keeling Curve', 'adaptation', 'mitigation', 'drought', 'heatwave', 'wildfire', 'flooding');
{ const tid = 'green_living_words', t = T(tid), gone = [];
  for (const e of [...P.entries]) if (e.typ[tid] !== undefined && drop(tid, e)) gone.push(e.text);
  if (!t.group) { Object.assign(t, { group: true, note: '', pop: 0 }); delete t.ident; delete t.groups; n++; }
  reindex(P); if (gone.length) say(`green living: now a group (folder) of the three eco themes; ${gone.length} words out (${gone.join(', ')})`); }
group('endangered_animals', 'black rhino', 'Javan rhino', 'northern white rhino', 'Sumatran rhino');
group('endangered_animals', 'mountain gorilla', 'Cross River gorilla');
group('endangered_animals', 'sea turtle', 'hawksbill turtle', 'loggerhead turtle');
group('endangered_animals', 'tiger|animal', 'Siberian tiger', 'Amur tiger');

// =============== C8. earth science ===============
head('C8. earth science themes');
rename({ volcano_words: 'volcanoes', types_of_volcano: 'volcano types', earthquake_words: 'earthquakes', layers_of_the_earth: "Earth's layers", earth_s_layers: "Earth's four layers",
  erosion_words: 'erosion', geothermal_words: 'geothermal features', soil_words: 'soil types', water_cycle_words: 'water cycle', layers_of_the_atmosphere: 'atmosphere layers',
  layers_of_a_rainforest: 'rainforest layers' });
move('types_of_volcano', 'volcano_words'); move('layers_of_a_rainforest', 'rainforest');
makeThemes([
  ['volcano_parts', 'volcano parts', 'volcano_words', 'parts of a volcano: crater, vent, cone, magma chamber, caldera, summit, conduit, fissure, flank'],
  ['geothermal_wonders', 'geothermal wonders', 'geothermal_words', 'famous geysers, hot springs and geothermal parks: Old Faithful, Yellowstone, Blue Lagoon, Pamukkale, Rotorua, Geysir'],
  ['soil_layers', 'soil layers', 'soil_words', 'layers from the surface down: leaf litter, humus, topsoil, subsoil, hardpan, regolith, bedrock'],
]);
words(EARTH, 'C8. earth science words');
head('C8. earth science fixes');
out('volcano_words', 'volcano', 'Vesuvius', 'Krakatoa', 'Etna', 'Mauna Loa', 'Pinatubo', 'Stromboli|volcano', 'Mount St. Helens', 'Pompeii|ancient Roman city',
  'stratovolcano', 'shield volcano', 'lava dome', 'volcanic dome', 'crater', 'vent|volcano', 'cone|volcano', 'magma chamber', 'caldera');
out('earthquake_words', 'earthquake', 'quake', 'temblor', 'megathrust', 'strike-slip', 'moment magnitude', 'hypocenter', 'focus|earthquake', 'seismic zone', 'rupture', 'rumble|sound');
out('natural_disasters', 'famine', 'blight', 'locust plague', 'supervolcano', 'seiche', 'derecho', 'waterspout', 'lahar', 'pyroclastic flow');
out('layers_of_the_earth', 'mantle|cloak', 'iron|metal', 'nickel|metal', 'molten iron', 'magma', 'tectonic plate', 'geosphere');
out('erosion_words', 'erosion', 'canyon', 'gulch', 'arroyo|dry gully', 'delta|river', 'badlands|terrain', 'bluff|landform', 'gully|channel', 'sinkhole', 'scree',
  'oxbow lake', 'hoodoo', 'sand dune', 'sea stack', 'headland', 'wave-cut platform', 'rill', 'meander|river', 'plunge pool|waterfall basin', 'interlocking spurs', 'glacier|ice', 'topsoil', 'river bank');
out('geothermal_words', 'Old Faithful|geyser', 'Yellowstone', 'Blue Lagoon', 'Pamukkale', 'Cotton Castle', 'Rotorua', 'Strokkur|geyser', 'Wai-O-Tapu', 'Beppu',
  'Larderello', 'Wairakei', 'Iceland', 'geothermal energy', 'geothermal plant', 'binary cycle', 'dry steam', 'geothermal gradient', 'ground source heat', 'steam|vapor', 'sulfur', 'hot water', 'spa|hot tub', 'thermal bath');
show('soil_layers', { 'soil horizon': 'horizon' });
out('soil_words', 'topsoil', 'subsoil', 'bedrock', 'humus', 'soil horizon', 'hardpan', 'regolith', 'potting mix', 'leaf mold', 'worm castings', 'compost', 'mulch',
  'fertilizer', 'manure', 'earthworm', 'dirt|soil', 'mud|dirt', 'gravel|crushed stone', 'nutrients', 'drainage', 'aeration', 'tilth', 'pedology', 'rhizosphere', 'mycorrhiza', 'duff', 'permafrost');
group('soil_words', 'sand|sediment', 'sandy soil');
out('water_cycle_words', 'water cycle', 'hydrologic cycle', 'river|water', 'lake', 'stream|woodland', 'reservoir', 'cloud|weather', 'rain|weather', 'rainfall', 'dew',
  'dew point', 'humidity', 'vapor', 'watershed', 'hydrosphere', 'atmospheric river', 'vadose zone');

// =============== D. kin (rule 3.7): new words and the words they come from, on roots; every sense of stop and deposit, as their kin already are ===============
head('D. kin');
const newRoot = (text, gloss = '') => { const m = sameText(P, text).filter(e => !e.aliasOf && (e.gloss || '') === gloss); if (m.length !== 1) throw Error(`${m.length} roots "${text}|${gloss}"`); return m[0]; };
for (const [a, bs] of [[newRoot('recycling'), [23977]], [newRoot('thrifting'), [28302]], [newRoot('gusher', 'oil well'), [39625]], [newRoot('stoppie'), [10750, 46717]], [newRoot('deposition', 'court'), [24180, 33913]]]) {
  for (const id of bs) { const b = E(id); if (b.aliasOf) throw Error(lab(b) + ' is an alias'); if (!(a.kin || []).includes(b.id)) { setKin(P, a, b, true); ch(a); ch(b); say(`kin: ${lab(a)} / ${lab(b)}${b.gloss ? ` (${b.gloss})` : ''}`); } }
}

// =============== E. ratings from the reviewers (optional) ===============
head('E. ratings');
{ const f = RATINGS instanceof URL ? RATINGS : new URL(RATINGS, 'file:///' + process.cwd().replace(/\\/g, '/') + '/');
  if (!fs.existsSync(f)) say(`no ratings file (${arg('--ratings') || 'tools/gen/julia409-ratings.tsv'}): ratings as Julia set them`);
  else {
    let ok = 0; const stale = [];
    for (const [i, line] of fs.readFileSync(f, 'utf8').split(/\r?\n/).entries()) {
      if (!line.trim() || line.startsWith('#') || /^entryId\t/i.test(line)) continue;
      const [id, what, oldV, newV, reason = ''] = line.split('\t'); const e = ix.entry.get(+id);
      if (!e) { stale.push(`line ${i + 1}: no entry ${id}`); continue; }
      const nv = +newV; if (!(nv >= 1 && nv <= 5)) throw Error(`line ${i + 1}: bad new value ${newV}`);
      const cur = what === 'fam' ? e.fam : e.typ[what];
      if (String(cur) !== String(oldV).trim()) { if (cur !== nv) stale.push(`line ${i + 1}: ${lab(e)} ${what} is ${cur}, not ${oldV}`); continue; }
      if (cur === nv) continue;
      if (what === 'fam') e.fam = nv; else e.typ[what] = nv; ch(e); ok++; say(`${lab(e)} ${what} ${oldV} -> ${nv}${reason ? ': ' + reason : ''}`);
    }
    say(`ratings applied ${ok}; not applied (old value differs) ${stale.length}${stale.length ? ': ' + stale.join('; ') : ''}`);
  }
}
reindex(P);

// =============== status, ids ===============
let revSet = 0;
for (const id of touched) { const e = ix.entry.get(id); if (e && e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } }
{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }

// =============== worklist for the rating review ===============
const JULIA_THEMES = ['bakeware', 'kitchen_linens', 'food_storage', 'greek_goddesses', 'greek_myth_objects', 'greek_city_states', 'ancient_greek_writers', 'greek_buildings',
  'smores', 'hiking_snacks', 'hiking_dangers', 'bike_gear', 'climbing_holds', 'bike_tricks', 'bike_park', 'pollution_types', 'oil_industry', 'protected_areas', 'greenhouse_gases',
  'eco_habits', 'eco_swaps', 'eco_home', 'volcano_parts', 'geothermal_wonders', 'soil_layers'];
const isNew = e => e.id >= nextId0;
const firstNew = P.entries.find(isNew)?.id ?? nextId0;
const work = { themes: [], lines: 0, chunks: [], typ: 0, fam: 0 };
if (!DONE) {   // written from the replay on v408 only: on a rerun the new words cannot be told from the old
  // her themes, plus the existing themes this batch linked words into (a rating is relative to the theme's other members)
  const added = [...new Set(P.entries.flatMap(e => Object.keys(e.typ).filter(t => !members0.get(t)?.has(e.id))))].filter(t => !JULIA_THEMES.includes(t) && ix.theme.has(t));
  const themes = [...JULIA_THEMES, ...added.sort()];
  const z = t => { const v = zipf(t); return v == null ? '' : v.toFixed(1); };
  const comparables = e => {   // main entries (not from this batch) nearest in Zipf: 2 from its theme, 2 that share a word with it (4 from the theme when none do)
    const toks = e.text.toLowerCase().split(/[\s-]+/).filter(w => w.length > 2), ze = zipf(e.text) ?? 3, ok = x => !x.aliasOf && !isNew(x) && x.id !== e.id && x.fam;
    const near = l => [...new Map(l.map(x => [x.id, x])).values()].sort((a, b) => Math.abs((zipf(a.text) ?? 3) - ze) - Math.abs((zipf(b.text) ?? 3) - ze));
    const word = near(P.entries.filter(x => ok(x) && toks.some(w => x.text.toLowerCase().split(/[\s-]+/).includes(w)))).slice(0, 2);
    const theme = near(Object.keys(e.aliasOf ? E(e.aliasOf).typ : e.typ).flatMap(t => (ix.byTheme.get(t) || []).filter(ok))).filter(x => !word.includes(x)).slice(0, 4 - word.length);
    return [...theme, ...word].map(x => `${x.text}${x.gloss ? ` (${x.gloss})` : ''} fam ${x.fam} z ${z(x.text)}`).join('; ');
  };
  const HEAD = ['kind', 'themeId', 'theme', 'entryId', 'text', 'gloss', 'fam', 'rating', 'zipf', 'status', 'comparables'].join('\t');
  for (const tid of themes) {
    const t = T(tid), mem = (ix.byTheme.get(tid) || []).filter(e => e.typ[tid] !== undefined).sort((a, b) => a.typ[tid] - b.typ[tid] || a.text.localeCompare(b.text));
    const rows = [];
    for (const e of mem) {
      const st = isNew(e) ? 'new word' : !members0.get(tid)?.has(e.id) ? 'linked by v409' : JULIA_THEMES.includes(tid) ? 'member' : 'member (theme kept)';
      rows.push(['typ', tid, t.name, e.id, e.text, e.gloss, e.fam, e.typ[tid], z(e.text), st, ''].join('\t'));
    }
    for (const e of mem.filter(e => isNew(e))) rows.push(['fam', tid, t.name, e.id, e.text, e.gloss, e.fam, '', z(e.text), e.aliasOf ? `alias of ${E(e.aliasOf).text}` : 'new word', comparables(e)].join('\t'));
    for (const a of P.entries.filter(a => isNew(a) && a.aliasOf && ix.entry.get(a.aliasOf)?.typ[tid] !== undefined && a.typ[tid] === undefined && !mem.includes(a)))
      rows.push(['fam', tid, t.name, a.id, a.text, a.gloss, a.fam, '', z(a.text), `${a.aliasKind} alias of ${E(a.aliasOf).text}${a.region.length ? ' ' + a.region.join(',') : ''}`, ''].join('\t'));
    work.themes.push({ tid, rows, julia: JULIA_THEMES.includes(tid) });
  }
  work.lines = work.themes.reduce((s, t) => s + t.rows.length, 0);
  const dir = WORK ? new URL(WORK.replace(/\\/g, '/').replace(/\/?$/, '/'), 'file:///' + process.cwd().replace(/\\/g, '/') + '/') : new URL('./', import.meta.url);
  const note = `# v409 rating review (Julia's themes). typ rows: re-judge the rating of each member in the theme (1 = the first words anyone names ... 5 = real but peripheral), relative to the other members.\n# fam rows: check the familiarity of each new word (1 every child knows it ... 5 few people) against the comparable main entries. Existing entries keep their own fam.\n# Answer in tools/gen/julia409-ratings.tsv: entryId<TAB>themeId or fam<TAB>oldValue<TAB>newValue<TAB>reason (only the changes).\n`;
  fs.writeFileSync(new URL('julia409-rating-work.tsv', dir), note + HEAD + '\n' + work.themes.flatMap(t => t.rows).join('\n') + '\n');
  const K = 3, chunks = Array.from({ length: K }, () => ({ rows: [], ts: [] }));
  for (const t of [...work.themes].sort((a, b) => b.rows.length - a.rows.length)) { const c = chunks.reduce((m, x) => x.rows.length < m.rows.length ? x : m); c.rows.push(...t.rows); c.ts.push(t.tid); }
  chunks.forEach((c, i) => fs.writeFileSync(new URL(`julia409-rating-work-${i + 1}.tsv`, dir), note + HEAD + '\n' + c.rows.join('\n') + '\n'));
  work.chunks = chunks.map(c => `${c.rows.length} lines, ${c.ts.length} themes`);
  work.typ = work.themes.reduce((s, t) => s + t.rows.filter(r => r.startsWith('typ')).length, 0);
  work.fam = work.lines - work.typ;
}

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(CE.text, x0.text) && same(CE.links, x0.links) && same(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v${P.lib.version} before the changes: ${baseOk ? 'yes' : 'NO'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]})`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const labId = id => { const e = ix.entry.get(id); return e ? lab(e) : `#${id} (deleted)`; };
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${labId(x0.ids[firstShift])})`}; added ${addedRows.length} (${addedRows.map(id => `${labId(id)}`).join(', ') || 'none'}); removed ${removedRows.length} (${removedRows.map(labId).join(', ') || 'none'})`);
const textCh = x1.ids.filter((id, i) => ia.has(id) && x1.text[i] !== x0.text[ia.get(id)]).map(id => `${x0.text[ia.get(id)]} -> ${x1.text[ib.get(id)]} (${id})`);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]).map(labId);
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed: ${flagCh.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => !ia.has(id) || s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${labId(x1.ids[firstLinkShift])}) on, link positions move`}`);
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const m0 = shownMap(x0), m1 = shownMap(x1);
const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
const byTh = ks2 => { const c = {}; for (const k of ks2) { const th = k.split('\t')[0]; c[th] = (c[th] || 0) + 1; } return Object.entries(c).map(([t, v]) => `${t} ${v}`).join(', ') || 'none'; };
cmp.push(`Links by theme + shown text + row: gone ${lost.length} (${byTh(lost)}), new ${gained.length} (${byTh(gained)}), rating changed ${rated.length}${rated.length ? ` (${byTh(rated)})` : ''}`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);
const themeless = [...touched].map(id => ix.entry.get(id)).filter(e => e && !e.aliasOf && !Object.keys(e.typ).length && !P.entries.some(a => a.aliasOf === e.id && Object.keys(a.typ).length));

const summary = [`Julia's branch (origin/julia-category-fixes, her v366-v382) replayed by text on v408${DONE ? ' (already applied: this run is a check)' : ''}. Plan and analysis: tools/gen/julia-integration-report.md.`,
  ...L,
  `Entries left in no theme by these steps (kept as they are, Simon): ${themeless.length}${themeless.length ? ': ' + themeless.map(lab).join(', ') : ''}`,
  DONE ? `Rating worklist: not written on a rerun (it is made by the run on v408)` : `Rating worklist: ${work.lines} lines (${work.typ} theme ratings in ${work.themes.length} themes: ${work.themes.filter(t => t.julia).length} of hers and ${work.themes.filter(t => !t.julia).length} existing themes she linked words into; ${work.fam} familiarity checks of new words and aliases); chunks: ${work.chunks.join(' | ')}`,
  `library changes ${n}; status set to rev ${revSet}; entries touched ${touched.size}; new entries from #${firstNew}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch409-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
