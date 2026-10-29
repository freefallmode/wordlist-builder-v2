// Data model. Pure functions over a plain project object, so they can be tested in Node.
//
// Theme   { id, name, parent, group, enabled, d, complete, adult, sensitive, tm, lang, region[], note }
// Entry   one meaning of one written form: { id, text, gloss, pos, type, enabled, rec, adult, sensitive, tm, vulgar, region[],
//         aliasOf, aliasKind, th{ themeId: inThemeRating }, status, note }
//         Two meanings of "bat" are two entries. Every flag that depends on meaning lives on the entry; the only thing that differs
//         between themes is the in-theme rating in `th`. An alias (aliasOf = id of its root) takes its themes from the root.
// Ratings are 1 to 5 (1 every child knows it ... 5 few people), 0 = not rated.
import { childrenOf } from './outline.js';

export const POS = ['noun', 'verb', 'adjective', 'adverb', 'other'];
export const TYPES = ['common', 'person', 'place', 'org', 'title', 'proper', 'acronym', 'phrase'];
export const TYPE_HELP = { common: 'ordinary word (lowercase)', person: 'a named person or character', place: 'a named place', org: 'company, brand, team, group',
  title: 'book, film, song, game, artwork', proper: 'other proper name (event, era, deity)', acronym: 'letters said as letters or a word (NASA, UFO)', phrase: 'idiom or set phrase' };
export const REGIONS = ['US', 'CA', 'UK', 'IE', 'AU', 'NZ', 'ZA', 'IN', 'TR'];
export const REC_HELP = ['not rated', '1 every child knows it', '2 nearly every adult', '3 many adults, not all', '4 interest, job or region', '5 few people'];
export const ALIAS_KINDS = ['', 'synonym', 'spelling'];
export const STATUS = ['new', 'gen', 'rev'];
export const STATUS_HELP = { new: 'added by hand, unchecked', gen: 'generated, not reviewed', rev: 'reviewed' };

export const nowStamp = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };

export function newProject() {
  return { schema: 1, lang: 'en', lib: { version: 1, modified: nowStamp() }, nextId: 1, themes: [], entries: [], settings: { minWords: 4, maxWords: 4, maxLen: 20 } };
}

export function entryDefaults() {
  return { id: 0, text: '', gloss: '', pos: 'noun', type: 'common', enabled: true, rec: 0, adult: false, sensitive: false, tm: false, vulgar: false,
    region: [], aliasOf: 0, aliasKind: '', th: {}, status: 'new', note: '' };
}

export function addEntry(P, text, over = {}) {
  const e = Object.assign(entryDefaults(), over, { id: P.nextId++, text });
  P.entries.push(e);
  return e;
}

// ---------- indexes (rebuilt after edits) ----------

export function reindex(P) {
  const ix = { theme: new Map(P.themes.map(t => [t.id, t])), kids: childrenOf(P.themes), entry: new Map(P.entries.map(e => [e.id, e])),
    aliases: new Map(), byTheme: new Map(), byText: new Map(), eff: new Map() };
  P.ix = ix;
  for (const e of P.entries) {
    if (e.aliasOf) { if (!ix.aliases.has(e.aliasOf)) ix.aliases.set(e.aliasOf, []); ix.aliases.get(e.aliasOf).push(e); }
    const k = e.text.toLowerCase();
    if (!ix.byText.has(k)) ix.byText.set(k, []);
    ix.byText.get(k).push(e);
  }
  for (const e of P.entries) for (const tid of linkIds(P, e)) {
    if (!ix.byTheme.has(tid)) ix.byTheme.set(tid, []);
    ix.byTheme.get(tid).push(e);
  }
  return ix;
}

export const rootOf = (P, e) => (e.aliasOf && P.ix.entry.get(e.aliasOf)) || e;

// Theme ids an entry belongs to: its own links, plus its root's when it is an alias.
export function linkIds(P, e) {
  if (!e.aliasOf) return Object.keys(e.th);
  const r = P.ix.entry.get(e.aliasOf);
  return r ? [...new Set([...Object.keys(r.th), ...Object.keys(e.th)])] : Object.keys(e.th);
}

// The rating that counts for an entry in one theme.
// Root: its in-theme rating, else its general rating. Alias: its own in-theme override, else the harder of its root's rating there
// and its own general rating (settee is at least as hard as couch, and as hard as settee is on its own).
export function effRec(P, e, tid) {
  if (!e.aliasOf) return e.th[tid] || e.rec || 0;
  if (e.th[tid]) return e.th[tid];
  const r = P.ix.entry.get(e.aliasOf);
  const base = r ? (r.th[tid] || r.rec || 0) : 0;
  return Math.max(base, e.rec || 0);
}

// Theme flags with inheritance: adult, sensitive, trademark, language-specific and disabled pass down the tree; regions are unioned.
export function eff(P, tid) {
  const ix = P.ix;
  if (ix.eff.has(tid)) return ix.eff.get(tid);
  const t = ix.theme.get(tid);
  if (!t) return { adult: false, sensitive: false, tm: false, lang: false, enabled: false, region: [] };
  const p = t.parent && t.parent !== tid ? eff(P, t.parent) : { adult: false, sensitive: false, tm: false, lang: false, enabled: true, region: [] };
  const r = { adult: p.adult || t.adult, sensitive: p.sensitive || t.sensitive, tm: p.tm || t.tm, lang: p.lang || t.lang,
    enabled: p.enabled && t.enabled, region: [...new Set([...p.region, ...t.region])] };
  ix.eff.set(tid, r);
  return r;
}

export function pathOf(P, tid) {
  const out = []; let t = P.ix.theme.get(tid), n = 0;
  while (t && n++ < 50) { out.unshift(t.name); t = t.parent && P.ix.theme.get(t.parent); }
  return out;
}

export function descendants(P, tid) {
  const out = []; const walk = id => { for (const k of P.ix.kids.get(id) || []) { out.push(k); walk(k.id); } };
  walk(tid);
  return out;
}

const usable = e => e.enabled;

// Usable entries of a theme. `roots` counts distinct concepts (an alias group is one); `bands[0]` is unrated, bands[1..5] by rating.
export function themeStats(P, tid) {
  const list = (P.ix.byTheme.get(tid) || []).filter(usable);
  const roots = new Set(list.map(e => e.aliasOf || e.id));
  const bands = [0, 0, 0, 0, 0, 0], rootBands = [0, 0, 0, 0, 0, 0], seen = new Set();
  for (const e of list) {
    const b = effRec(P, e, tid);
    bands[b]++;
    const r = e.aliasOf || e.id;
    if (!seen.has(r + ':' + b)) { seen.add(r + ':' + b); rootBands[b]++; }
  }
  return { entries: list.length, roots: roots.size, bands, rootBands };
}

// ---------- edits ----------

export function linkEntry(P, e, tid, rec = 0) { e.th[tid] = rec; }
export function unlinkEntry(P, e, tid) { delete e.th[tid]; }

export function deleteEntry(P, e) {
  const als = P.entries.filter(a => a.aliasOf === e.id);
  if (als.length) {
    // The first alias becomes the root; it keeps what it was getting from the old root.
    const [first, ...rest] = als;
    for (const [tid, v] of Object.entries(e.th)) if (!(tid in first.th)) first.th[tid] = effRec(P, first, tid);
    first.aliasOf = 0; first.aliasKind = '';
    for (const a of rest) a.aliasOf = first.id;
  }
  P.entries = P.entries.filter(x => x !== e);
}

export function deleteTheme(P, tid) {
  const t = P.ix.theme.get(tid);
  if (!t) return;
  for (const k of P.themes) if (k.parent === tid) k.parent = t.parent;
  for (const e of P.entries) delete e.th[tid];
  P.themes = P.themes.filter(x => x !== t);
}

// Is `a` an ancestor of `b`? (A theme can't move under its own descendant.)
export function isAncestor(P, a, b) {
  let t = P.ix.theme.get(b), n = 0;
  while (t && n++ < 60) { if (t.id === a) return true; t = t.parent && P.ix.theme.get(t.parent); }
  return false;
}

// Moves a theme (and its sub-tree) to be the last child of `parent` (null = top level), keeping outline order depth-first.
export function moveTheme(P, tid, parent) {
  if (parent && isAncestor(P, tid, parent)) throw Error('A theme cannot move into itself.');
  const t = P.ix.theme.get(tid);
  const block = [t, ...descendants(P, tid)];
  P.themes = P.themes.filter(x => !block.includes(x));
  t.parent = parent || null;
  let at = P.themes.length;
  if (parent) { const p = P.themes.find(x => x.id === parent); const last = [p, ...descendantsIn(P.themes, parent)].pop(); at = P.themes.indexOf(last) + 1; }
  P.themes.splice(at, 0, ...block);
}
function descendantsIn(list, id) { const out = []; const walk = i => { for (const k of list) if (k.parent === i) { out.push(k); walk(k.id); } }; walk(id); return out; }

export function uniqueThemeId(P, base) {
  let id = base, n = 2;
  while (P.ix.theme.has(id)) id = base + '_' + n++;
  return id;
}

// Entries with the same text. Used for the "needs a meaning" rule and the duplicate check.
export const sameText = (P, text) => P.ix.byText.get(text.toLowerCase()) || [];

// Puts P.themes back into depth-first outline order (after merging or importing), keeping each parent's children in their current order.
export function sortDepthFirst(P) {
  const kids = childrenOf(P.themes), out = [], seen = new Set();
  const walk = id => { for (const t of kids.get(id) || []) { if (seen.has(t.id)) continue; seen.add(t.id); out.push(t); walk(t.id); } };
  walk('');
  for (const t of P.themes) if (!seen.has(t.id)) { t.parent = null; seen.add(t.id); out.push(t); walk(t.id); }   // orphans (missing parent) go to the top level
  P.themes = out;
}

// Drag and drop in the tree. where: 'in' (last child of target), 'before' / 'after' (sibling of target), 'root' (top level, last).
export function placeTheme(P, id, targetId, where) {
  const t = P.ix.theme.get(id), target = targetId && P.ix.theme.get(targetId);
  if (!t) return false;
  const parent = where === 'root' ? null : where === 'in' ? targetId : target.parent;
  if (id === targetId || (parent && isAncestor(P, id, parent))) return false;
  const block = [t, ...descendantsIn(P.themes, id)];
  const rest = P.themes.filter(x => !block.includes(x));
  t.parent = parent || null;
  let at = rest.length;
  if (where === 'before') at = rest.indexOf(target);
  else if (where === 'after' || where === 'in') at = rest.indexOf(target) + 1 + descendantsIn(rest, targetId).length;
  rest.splice(at, 0, ...block);
  P.themes = rest;
  return true;
}

// What the content flags mean. Used in the generation prompt and as hints in the editors, so the wording stays the same everywhere.
export const FLAG_HELP = {
  tm: 'Trademarks or copyrighted names: brands, titles, characters, and so on.',
  adult: 'Adult: drugs, sexual content, violence, and so on.',
  sensitive: 'Sensitive: religion, politics, death, and so on. The game can keep these out of early or easy levels.',
  lang: 'Language-specific: depends on the spelling, sound or slang of the library language, so it will not translate: rhymes, puns, slang, acronyms, anagrams, spoonerisms, wordplay, and so on.',
};
