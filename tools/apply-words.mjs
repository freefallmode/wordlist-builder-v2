// Adds generated words and theme ratings to the working library, data/wordlist-en.project.json (created from the pilot project if missing).
// Run: node tools/apply-words.mjs tools/gen/food-drink.mjs [library file]
//
// A data module exports:
//   DATA   { themeId: [row, ...] }  row = [text, familiarity, typicality, opts]
//            familiarity  how well known the word itself is (1 every child ... 5 few people)
//            typicality  how typical the word is of THIS theme (1 the first words anyone names for it ... 5 real but peripheral)
//            opts   g gloss, pos, type, tm, adult, sens, vulgar, reg [regions], note,
//                   al [[text, kind, familiarity, typicality, regions, { g, type, adult, sens, tm, vulgar }], ...]
//   ALIASES [[themeId, rootText, rootGloss, [alias row, ...]], ...]  adds aliases to a root that already exists (e.g. from an earlier batch)
//   FIXES  [{ gloss: [text, themeId, newGloss] } | { merge: [text, [themeId, ...], gloss] } | { split: [text, themeId, newGloss, {type, pos, fam}] } | { del: [text, themeId] }, ...]  edits existing entries first (the entry is found by its text and a theme it is in):
//          gloss sets a meaning label; merge joins the entries of that text that sit in the listed themes into one (the lowest id survives, links and aliases move to it); split moves one theme link of an entry that was linked for a different meaning onto a new entry with its own meaning label; del removes one
//   GROUPS [[themeId, 'text', 'text|gloss', ...], ...]  synonym groups for that theme: words of the theme that stand for one another (a level never shows two); each member is the text of a root linked to the theme (add '|gloss' when the text has several meanings there); joins an existing group when a member is already in one
//   SETTINGS { maxWords: 4, ... }  library settings to set
//   THEMES { themeId: { pop: 1-5 (theme popularity, 1 most popular), ident: 1-5 (identifiability, 1 obvious ... 5 obscure), ...flag overrides (complete, adult, sensitive, tm, lang, region, note) } }
// An entry that already exists (same text and gloss) is only linked to the theme (its own ratings and flags stay); a link already there is left alone.
// Aliases inherit part of speech, type, adult, sensitive and trademark from the root unless the alias row says otherwise.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { addEntry, reindex, sameText, linkIds, deleteEntry } from '../js/model.js';
import { parseProject, serializeProject, stampSave } from '../js/store.js';
import { validate } from '../js/validate.js';
import { parseFreq, setFreq } from '../js/freq.js';
import { parseBreaks, MIN_BREAK_LETTERS } from '../js/breaks.js';

const here = p => new URL(p, import.meta.url);
const file = process.argv[2];
const LIB = process.argv[3] ? pathToFileURL(resolve(process.argv[3])) : here('../data/wordlist-en.project.json');   // optional: another library file (a scratch copy for trying a batch)
if (!file) throw Error('usage: node tools/apply-words.mjs <data module>');
const { DATA = {}, THEMES, ALIASES, FIXES, SETTINGS, GROUPS } = await import(pathToFileURL(resolve(file)).href);

const P = parseProject(readFileSync(existsSync(LIB) ? LIB : here('../data/pilot.project.json'), 'utf8'));
reindex(P);
setFreq(parseFreq(readFileSync(here('../data/freq-en.txt'), 'utf8')));

const find = (text, tid) => sameText(P, text).filter(e => linkIds(P, e).includes(tid));
for (const f of FIXES || []) {
  if (f.gloss) {
    // labels an entry that has none; when another batch already labelled it (or the label is already there) this is a no-op
    const [text, tid, gloss] = f.gloss, m = find(text, tid).filter(e => !e.gloss);
    if (m.length > 1) throw Error(`gloss: ${m.length} unlabelled entries for "${text}" in ${tid}`);
    if (m.length === 1) m[0].gloss = gloss;
  } else if (f.merge) {
    const [text, tids, gloss] = f.merge;
    const all = [...new Set(tids.flatMap(t => find(text, t)))].sort((a, b) => a.id - b.id);
    if (all.length < 2) throw Error(`merge: only ${all.length} entries for "${text}"`);
    const [keep, ...rest] = all;
    for (const d of rest) {
      for (const [t, v] of Object.entries(d.typ)) if (keep.typ[t] === undefined) keep.typ[t] = v;
      for (const a of P.entries) if (a.aliasOf === d.id) a.aliasOf = keep.id;
      keep.adult ||= d.adult; keep.sensitive ||= d.sensitive; keep.tm ||= d.tm;
      P.entries = P.entries.filter(x => x !== d);
    }
    keep.gloss = gloss;
  } else if (f.split) {
    // an entry was linked to a theme for a different meaning: move that theme link to a new entry with its own meaning label
    const [text, tid, gloss, o = {}] = f.split, m = find(text, tid).filter(e => e.typ[tid] !== undefined);
    if (m.some(e => e.gloss === gloss)) continue;   // another batch already split it
    if (m.length !== 1) throw Error(`split: ${m.length} entries of "${text}" with their own link to ${tid}`);
    const old = m[0], r = old.typ[tid];
    delete old.typ[tid];
    addEntry(P, text, { gloss, pos: o.pos || old.pos, type: o.type || 'common', fam: (o.fam ?? o.rec) ?? old.fam, typ: { [tid]: r }, status: 'gen' });
  } else if (f.del) {
    const [text, tid] = f.del, m = find(text, tid);
    if (m.length !== 1) throw Error(`del: ${m.length} entries for "${text}" in ${tid}`);
    deleteEntry(P, m[0]);
  }
  reindex(P);
}
const clampRating = n => Math.max(0, Math.min(5, n));
const stats = { made: 0, aliases: 0, linked: 0, kept: 0 };
for (const [tid, rows] of Object.entries(DATA)) {
  if (!P.ix.theme.has(tid)) throw Error('no such theme: ' + tid);
  if (P.ix.theme.get(tid).group) throw Error('theme is a group: ' + tid);
  for (const [text, r, typ, o = {}] of rows) {
    if (!(r >= 1 && r <= 5 && typ >= 1 && typ <= 5)) throw Error(`bad rating on "${text}" in ${tid}`);
    let e = sameText(P, text).find(x => (x.gloss || '') === (o.g || ''));
    if (e) { if (e.typ[tid] === undefined) { e.typ[tid] = typ; stats.linked++; } else stats.kept++; continue; }
    e = addEntry(P, text, { gloss: o.g || '', pos: o.pos || 'noun', type: o.type || 'common', fam: clampRating(r), typ: { [tid]: typ }, tm: !!o.tm, adult: !!o.adult,
      vulgar: !!o.vulgar, sensitive: !!o.sens, region: o.reg || [], note: o.note || '', status: 'gen' });
    reindex(P); stats.made++;
    for (const [at, kind, ar, ai, areg = [], ao = {}] of o.al || []) {
      if (!(ar >= 1 && ar <= 5 && ai >= 1 && ai <= 5)) throw Error(`bad alias rating on "${at}"`);
      const a = addEntry(P, at, { gloss: ao.g || '', pos: e.pos, type: ao.type || e.type, fam: clampRating(ar), aliasOf: e.id, aliasKind: kind, region: areg,
        tm: ao.tm ?? e.tm, adult: ao.adult ?? e.adult, sensitive: ao.sens ?? e.sensitive, vulgar: !!ao.vulgar, status: 'gen' });
      if (ai !== Math.max(typ, ar)) a.typ[tid] = ai;
      reindex(P); stats.aliases++;
    }
  }
}
for (const [tid, rootText, rootGloss, rows] of ALIASES || []) {
  const root = sameText(P, rootText).find(x => (x.gloss || '') === (rootGloss || '') && !x.aliasOf);
  if (!root) throw Error('no root for alias: ' + rootText);
  const typ = root.typ[tid] ?? 0;
  for (const [at, kind, ar, ai, areg = [], ao = {}] of rows) {
    if (sameText(P, at).some(x => (x.gloss || '') === (ao.g || '') && x.aliasOf === root.id)) continue;
    const a = addEntry(P, at, { gloss: ao.g || '', pos: root.pos, type: ao.type || root.type, fam: clampRating(ar), aliasOf: root.id, aliasKind: kind, region: areg,
      tm: ao.tm ?? root.tm, adult: ao.adult ?? root.adult, sensitive: ao.sens ?? root.sensitive, vulgar: !!ao.vulgar, status: 'gen' });
    if (ai !== Math.max(typ, ar)) a.typ[tid] = ai;
    reindex(P); stats.aliases++;
  }
}
for (const [tid, t] of Object.entries(THEMES || {})) {
  const th = P.ix.theme.get(tid);
  if (!th) throw Error('no such theme: ' + tid);
  Object.assign(th, t);
}
for (const [tid, ...members] of GROUPS || []) {
  const t = P.ix.theme.get(tid); if (!t) throw Error('GROUPS: no such theme ' + tid);
  const ids = members.map(m => {
    const [text, gloss] = m.split('|'), hit = sameText(P, text).filter(e => !e.aliasOf && e.typ[tid] !== undefined && (gloss === undefined || (e.gloss || '') === gloss));
    if (hit.length !== 1) throw Error(`GROUPS ${tid}: ${hit.length} words match "${m}"`);
    return hit[0].id;
  });
  t.groups = t.groups || [];
  const hits = [...new Set(ids.map(id => t.groups.find(g => g.includes(id))).filter(Boolean))], first = hits[0] || [];
  for (const id of ids) if (!first.includes(id)) first.push(id);
  for (const g of hits.slice(1)) { for (const id of g) if (!first.includes(id)) first.push(id); t.groups.splice(t.groups.indexOf(g), 1); }
  if (!hits.length) t.groups.push(first);
}
Object.assign(P.settings, SETTINGS || {});
for (const tid of Object.keys(DATA)) if (!P.ix.theme.get(tid).pop) console.log('UNRATED THEME', tid);
for (const tid of Object.keys(DATA)) if (!P.ix.theme.get(tid).ident) console.log('THEME WITHOUT IDENTIFIABILITY', tid);
reindex(P);
stampSave(P);
writeFileSync(LIB, serializeProject(P));
console.log(`${stats.made} words and ${stats.aliases} aliases added, ${stats.linked} existing words linked, ${stats.kept} links kept -> ${LIB.pathname.split("/").slice(-2).join("/")} (library v${P.lib.version})`);
{ const have = existsSync(new URL('../data/breaks-en.txt', import.meta.url)) ? parseBreaks(readFileSync(new URL('../data/breaks-en.txt', import.meta.url), 'utf8')) : new Map(), need = new Set();
  for (const t of [...P.entries.filter(e => e.enabled).map(e => e.text), ...P.themes.map(t => t.name)]) for (const m of String(t).matchAll(/\p{L}[\p{L}']*\p{L}/gu)) { const w = m[0].toLowerCase(); if (w.replace(/'/g, '').length >= MIN_BREAK_LETTERS && !have.has(w)) need.add(w); }
  if (need.size) console.log(`${need.size} long words (8+ letters) have no line-break points yet: regenerate the export, then node tools/brk-tokens.mjs, agents under tools/gen/brk/BRIEF-brk.md, node tools/brk-merge.mjs todo`); }
const issues = validate(P).filter(i => i.sev !== 'info' || ['rating-vs-zipf'].includes(i.kind)).filter(i => !['thin', 'empty'].includes(i.kind));
const ids = new Set(Object.keys(DATA));
{ const done = new URL('./gen/rec/done.json', import.meta.url), seen = new Set(existsSync(done) ? JSON.parse(readFileSync(done, 'utf8')) : []);
  const fresh = P.entries.filter(e => !e.aliasOf && e.fam && (e.type || 'common') !== 'common' && !seen.has(e.id)).length;
  if (fresh) console.log(`${fresh} names (people, places, organisations, titles, acronyms) have no recognisability review yet: node tools/gen/rec-make.mjs, then agents under tools/gen/BRIEF-rec.md, then node tools/gen/rec-apply.mjs --apply`); }
for (const i of issues) {
  const e = i.entryId && P.ix.entry.get(i.entryId);
  const touched = !e || Object.keys(e.typ).some(t => ids.has(t)) || (e.aliasOf && Object.keys(P.ix.entry.get(e.aliasOf)?.typ || {}).some(t => ids.has(t)));
  if (touched || i.sev === 'error') console.log(i.sev, i.kind, i.msg);
}
