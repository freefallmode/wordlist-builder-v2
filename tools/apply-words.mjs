// Adds generated words and theme ratings to the working library, data/wordlist-en.project.json (created from the pilot project if missing).
// Run: node tools/apply-words.mjs tools/gen/food-drink.mjs [library file]
//
// A data module exports:
//   DATA   { themeId: [row, ...] }  row = [text, rec, inRec, opts]
//            rec    how well known the word itself is (1 every child ... 5 few people)
//            inRec  how readily a player places it in THIS theme (same scale)
//            opts   g gloss, pos, type, tm, adult, sens, vulgar, reg [regions], note,
//                   al [[text, kind, rec, inRec, regions, { g, type, adult, sens, tm, vulgar }], ...]
//   ALIASES [[themeId, rootText, rootGloss, [alias row, ...]], ...]  adds aliases to a root that already exists (e.g. from an earlier batch)
//   FIXES  [{ gloss: [text, themeId, newGloss] } | { merge: [text, [themeId, ...], gloss] } | { del: [text, themeId] }, ...]  edits existing entries first (the entry is found by its text and a theme it is in):
//          gloss sets a meaning label; merge joins the entries of that text that sit in the listed themes into one (the lowest id survives, links and aliases move to it); del removes one
//   SETTINGS { maxWords: 3, ... }  library settings to set
//   THEMES { themeId: { d: 1-5, ...flag overrides (complete, adult, sensitive, tm, lang, region, note) } }
// An entry that already exists (same text and gloss) is only linked to the theme (its own ratings and flags stay); a link already there is left alone.
// Aliases inherit part of speech, type, adult, sensitive and trademark from the root unless the alias row says otherwise.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { addEntry, reindex, sameText, linkIds, deleteEntry } from '../js/model.js';
import { parseProject, serializeProject, stampSave } from '../js/store.js';
import { validate } from '../js/validate.js';
import { parseFreq, setFreq } from '../js/freq.js';

const here = p => new URL(p, import.meta.url);
const file = process.argv[2];
const LIB = process.argv[3] ? pathToFileURL(resolve(process.argv[3])) : here('../data/wordlist-en.project.json');   // optional: another library file (a scratch copy for trying a batch)
if (!file) throw Error('usage: node tools/apply-words.mjs <data module>');
const { DATA = {}, THEMES, ALIASES, FIXES, SETTINGS } = await import(pathToFileURL(resolve(file)).href);

const P = parseProject(readFileSync(existsSync(LIB) ? LIB : here('../data/pilot.project.json'), 'utf8'));
reindex(P);
setFreq(parseFreq(readFileSync(here('../data/freq-en.txt'), 'utf8')));

const find = (text, tid) => sameText(P, text).filter(e => linkIds(P, e).includes(tid));
for (const f of FIXES || []) {
  if (f.gloss) {
    const [text, tid, gloss] = f.gloss, m = find(text, tid);
    if (m.length !== 1) throw Error(`gloss: ${m.length} entries for "${text}" in ${tid}`);
    m[0].gloss = gloss;
  } else if (f.merge) {
    const [text, tids, gloss] = f.merge;
    const all = [...new Set(tids.flatMap(t => find(text, t)))].sort((a, b) => a.id - b.id);
    if (all.length < 2) throw Error(`merge: only ${all.length} entries for "${text}"`);
    const [keep, ...rest] = all;
    for (const d of rest) {
      for (const [t, v] of Object.entries(d.th)) if (keep.th[t] === undefined) keep.th[t] = v;
      for (const a of P.entries) if (a.aliasOf === d.id) a.aliasOf = keep.id;
      keep.adult ||= d.adult; keep.sensitive ||= d.sensitive; keep.tm ||= d.tm;
      P.entries = P.entries.filter(x => x !== d);
    }
    keep.gloss = gloss;
  } else if (f.del) {
    const [text, tid] = f.del, m = find(text, tid);
    if (m.length !== 1) throw Error(`del: ${m.length} entries for "${text}" in ${tid}`);
    deleteEntry(P, m[0]);
  }
  reindex(P);
}
const rec = n => Math.max(0, Math.min(5, n));
const stats = { made: 0, aliases: 0, linked: 0, kept: 0 };
for (const [tid, rows] of Object.entries(DATA)) {
  if (!P.ix.theme.has(tid)) throw Error('no such theme: ' + tid);
  if (P.ix.theme.get(tid).group) throw Error('theme is a group: ' + tid);
  for (const [text, r, inR, o = {}] of rows) {
    if (!(r >= 1 && r <= 5 && inR >= 1 && inR <= 5)) throw Error(`bad rating on "${text}" in ${tid}`);
    let e = sameText(P, text).find(x => (x.gloss || '') === (o.g || ''));
    if (e) { if (e.th[tid] === undefined) { e.th[tid] = inR; stats.linked++; } else stats.kept++; continue; }
    e = addEntry(P, text, { gloss: o.g || '', pos: o.pos || 'noun', type: o.type || 'common', rec: rec(r), th: { [tid]: inR }, tm: !!o.tm, adult: !!o.adult,
      vulgar: !!o.vulgar, sensitive: !!o.sens, region: o.reg || [], note: o.note || '', status: 'gen' });
    reindex(P); stats.made++;
    for (const [at, kind, ar, ai, areg = [], ao = {}] of o.al || []) {
      if (!(ar >= 1 && ar <= 5 && ai >= 1 && ai <= 5)) throw Error(`bad alias rating on "${at}"`);
      const a = addEntry(P, at, { gloss: ao.g || '', pos: e.pos, type: ao.type || e.type, rec: rec(ar), aliasOf: e.id, aliasKind: kind, region: areg,
        tm: ao.tm ?? e.tm, adult: ao.adult ?? e.adult, sensitive: ao.sens ?? e.sensitive, vulgar: !!ao.vulgar, status: 'gen' });
      if (ai !== Math.max(inR, ar)) a.th[tid] = ai;
      reindex(P); stats.aliases++;
    }
  }
}
for (const [tid, rootText, rootGloss, rows] of ALIASES || []) {
  const root = sameText(P, rootText).find(x => (x.gloss || '') === (rootGloss || '') && !x.aliasOf);
  if (!root) throw Error('no root for alias: ' + rootText);
  const inR = root.th[tid] ?? 0;
  for (const [at, kind, ar, ai, areg = [], ao = {}] of rows) {
    if (sameText(P, at).some(x => (x.gloss || '') === (ao.g || '') && x.aliasOf === root.id)) continue;
    const a = addEntry(P, at, { gloss: ao.g || '', pos: root.pos, type: ao.type || root.type, rec: rec(ar), aliasOf: root.id, aliasKind: kind, region: areg,
      tm: ao.tm ?? root.tm, adult: ao.adult ?? root.adult, sensitive: ao.sens ?? root.sensitive, vulgar: !!ao.vulgar, status: 'gen' });
    if (ai !== Math.max(inR, ar)) a.th[tid] = ai;
    reindex(P); stats.aliases++;
  }
}
for (const [tid, t] of Object.entries(THEMES || {})) {
  const th = P.ix.theme.get(tid);
  if (!th) throw Error('no such theme: ' + tid);
  Object.assign(th, t);
}
Object.assign(P.settings, SETTINGS || {});
for (const tid of Object.keys(DATA)) if (!P.ix.theme.get(tid).d) console.log('UNRATED THEME', tid);
reindex(P);
stampSave(P);
writeFileSync(LIB, serializeProject(P));
console.log(`${stats.made} words and ${stats.aliases} aliases added, ${stats.linked} existing words linked, ${stats.kept} links kept -> ${LIB.pathname.split("/").slice(-2).join("/")} (library v${P.lib.version})`);
const issues = validate(P).filter(i => i.sev !== 'info' || ['rating-vs-zipf'].includes(i.kind)).filter(i => !['thin', 'empty'].includes(i.kind));
const ids = new Set(Object.keys(DATA));
for (const i of issues) {
  const e = i.entryId && P.ix.entry.get(i.entryId);
  const touched = !e || Object.keys(e.th).some(t => ids.has(t)) || (e.aliasOf && Object.keys(P.ix.entry.get(e.aliasOf)?.th || {}).some(t => ids.has(t)));
  if (touched || i.sev === 'error') console.log(i.sev, i.kind, i.msg);
}
