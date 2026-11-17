// Data model. Pure functions over a plain project object, so they can be tested in Node.
//
// Theme   { id, name, parent, group, enabled, pop, complete, adult, sensitive, tm, lang, foreign, region[], note }
// Entry   one meaning of one written form: { id, text, gloss, pos, type, enabled, fam, adult, sensitive, tm, vulgar, region[],
//         aliasOf, aliasKind, typ{ themeId: typicality }, status, note }
//         Two meanings of "bat" are two entries. Every flag that depends on meaning lives on the entry; the only thing that differs
//         between themes is the typicality in `typ` (1 the first words anyone thinks of for the theme ... 5 real but peripheral). An alias (aliasOf = id of its root) takes its themes from the root.
// `fam` (familiarity) is 1 to 5 (1 every child knows it ... 5 few people), 0 = not rated. A theme's `pop` is how good a pick the theme is (1 most popular ... 5 least), 0 = not rated.
// A theme's `ident` is how easily the theme can be worked out from its members (1 obvious ... 5 obscure), 0 = not rated. A word's difficulty is the harder of `fam` and its link rating, and a theme's difficulty is worked out from `ident` and `pop`: both are computed at export and never stored. themeProfile() counts the words of a theme at each difficulty.
import { childrenOf } from './outline.js';

export const POS = ['noun', 'verb', 'adjective', 'adverb', 'other'];
export const flagKey = e => (e.adult ? 'a' : 'z') + (e.sensitive ? 's' : 'z') + (e.tm ? 't' : 'z') + (e.vulgar ? 'v' : 'z') + (e.region.length ? 'r' : 'z');   // flagged words sort first: adult, sensitive, trademark, vulgar, region
export const TYPES = ['common', 'person', 'place', 'org', 'title', 'proper', 'acronym', 'phrase'];
export const TYPE_HELP = { common: 'ordinary word (lowercase)', person: 'a named person or character', place: 'a named place', org: 'company, brand, team, group',
  title: 'book, film, song, game, artwork', proper: 'other proper name (event, era, deity)', acronym: 'letters said as letters or a word (NASA, UFO)', phrase: 'idiom or set phrase' };
export const REGIONS = ['US', 'CA', 'UK', 'IE', 'AU', 'NZ', 'ZA', 'IN', 'TR'];
// Regions after a dialog save: the ticked tick-box codes plus the codes that have no tick-box (BR, JP), kept as they were.
export const mergeRegions = (old, ticked) => [...ticked, ...old.filter(c => !REGIONS.includes(c))];
export const FAMILIARITY_HELP = ['not rated', '1 every child knows it', '2 nearly every adult', '3 many adults, not all', '4 interest, job or region', '5 few people'];
export const TYPICALITY_HELP = ['not rated', '1 the first words anyone thinks of', '2 typical', '3 ordinary member', '4 less typical', '5 real but peripheral'];
export const IDENT_HELP = ['not rated', '1 obvious: four members and the theme is clear', '2 clear', '3 needs a moment', '4 hard: broad, or the link is a trick', '5 obscure: hard to guess even with all four'];
export const ALIAS_KINDS = ['', 'synonym', 'spelling', 'form', 'regional', 'abbreviation', 'translation'];   // spelling and form (skis for ski, rainy for rain) are the same word, so they take the root's popularity; a synonym is rated on its own. regional (bonnet for hood), abbreviation (PC for personal computer) and translation (Danmark for Denmark: the same thing named in another language) are the same thing under another name: they follow the root's themes and are rated on their own. Synonyms are to become theme-level groups (DESIGN-entries.md)
export const STATUS = ['new', 'gen', 'rev'];
export const STATUS_HELP = { new: 'added by hand, unchecked', gen: 'generated, not reviewed', rev: 'reviewed' };

export const nowStamp = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };

export function newProject() {
  return { schema: 1, lang: 'en', lib: { version: 1, modified: nowStamp() }, nextId: 1, themes: [], entries: [], settings: { minWords: 4, maxWords: 4, maxLen: 20 } };
}

export function entryDefaults() {
  return { id: 0, text: '', gloss: '', pos: 'noun', type: 'common', enabled: true, fam: 0, adult: false, sensitive: false, tm: false, vulgar: false,
    region: [], aliasOf: 0, aliasKind: '', typ: {}, status: 'new', note: '', nameOkIn: [], use: {}, show: {} };   // nameOkIn: themes where the full text is the real name and may contain the theme's words (dried apple in dried fruits); use: { themeId: id of a form alias to show instead of the root in that theme }; show: { themeId: text } the theme shows this shorter text for the entry (rock for rock garden)
}

export function addEntry(P, text, over = {}) {
  const e = Object.assign(entryDefaults(), over, { id: P.nextId++, text });
  P.entries.push(e);
  return e;
}

// ---------- indexes ----------
// reindex builds them all. An edit can instead re-file only what it touched (updateIndex); every list stays in P.entries order, so the result equals a full reindex (tested).
// ix.at remembers where each entry was filed (o its place in P.entries, k its text key, a its root, t its themes) so it can be taken out again; ix.n is the next place.

export function reindex(P) {
  const ix = { theme: null, kids: null, entry: new Map(), aliases: new Map(), byTheme: new Map(), byText: new Map(), eff: null, at: new Map(), n: P.entries.length };
  P.ix = ix; reindexThemes(P);
  const rs = P.entries.map((e, o) => { const r = { e, o, k: '', a: 0, t: null }; if (ix.at.has(e.id)) ix.dup = true; ix.entry.set(e.id, e); ix.at.set(e.id, r); fileText(ix, e, r, true); return r; });
  for (const r of rs) fileThemes(P, r.e, r, true);
  if (ix.dup) ix.at = null;   // two entries share an id (validate reports it): no record can be trusted, so every update rebuilds everything
  return ix;
}
export function reindexThemes(P) { const ix = P.ix; ix.theme = new Map(P.themes.map(t => [t.id, t])); ix.kids = childrenOf(P.themes); ix.eff = new Map(); return ix; }
const rec = (ix, e) => { const r = ix.at.get(e.id); return r && r.e === e ? r : null; };   // by id (a Map keyed by the entry objects is several times slower), checked against the entry
const put = (ix, m, k, e, last) => {   // into its place by P.entries order; last: it comes after everything filed so far (a full reindex, a new entry)
  const l = m.get(k); if (!l) return m.set(k, [e]);
  if (last) return l.push(e);
  const o = rec(ix, e).o, ord = x => rec(ix, x).o; let lo = 0, hi = l.length;
  if (ord(l[hi - 1]) < o) return l.push(e);
  while (lo < hi) { const mid = (lo + hi) >> 1; if (ord(l[mid]) < o) lo = mid + 1; else hi = mid; }
  l.splice(lo, 0, e);
};
const take = (m, k, e) => { const l = m.get(k), i = l ? l.indexOf(e) : -1; if (i < 0) return; l.splice(i, 1); if (!l.length) m.delete(k); };
function fileText(ix, e, r, last) { r.k = e.text.toLowerCase(); r.a = e.aliasOf; put(ix, ix.byText, r.k, e, last); if (r.a) put(ix, ix.aliases, r.a, e, last); }
function fileThemes(P, e, r, last) { r.t = linkIds(P, e); for (const tid of r.t) put(P.ix, P.ix.byTheme, tid, e, last); }
function unfile(ix, e) { const r = rec(ix, e); if (!r || r.t === null) return; take(ix.byText, r.k, e); if (r.a) take(ix.aliases, r.a, e); for (const tid of r.t) take(ix.byTheme, tid, e); r.k = ''; r.a = 0; r.t = null; }

// Re-files the entries whose text, root or links may have changed (new ones too: they must be the last of P.entries), with the aliases of each, and drops the deleted ones (gone).
// An entry is new when it has no record yet, and a record is matched by id and entry, so a deleted id handed out again cannot be confused with the old entry.
export function reindexEntries(P, es, gone = []) {
  const ix = P.ix; if (!ix?.at) return reindex(P);
  const all = new Set(es), out = new Set(gone);
  for (const e of [...es, ...gone]) for (const a of ix.aliases.get(e.id) || []) all.add(a);   // an alias takes its root's links
  for (const e of gone) all.delete(e);
  const fresh = [...all].filter(e => !rec(ix, e)), N = P.entries.length;
  if (fresh.length) {
    const pos = new Map(fresh.map(e => [e, P.entries.lastIndexOf(e)]));
    if (fresh.some(e => pos.get(e) < N - fresh.length) || fresh.some(e => ix.at.has(e.id))) return reindex(P);   // not appended, or an id in use: rebuild everything
    fresh.sort((a, b) => pos.get(a) - pos.get(b)); for (const e of fresh) ix.at.set(e.id, { e, o: ix.n++, k: '', a: 0, t: null });
  }
  for (const e of [...out, ...all]) unfile(ix, e);
  for (const e of out) if (rec(ix, e)) { ix.at.delete(e.id); if (ix.entry.get(e.id) === e) ix.entry.delete(e.id); }
  for (const e of all) { ix.entry.set(e.id, e); fileText(ix, e, rec(ix, e)); }
  for (const e of all) fileThemes(P, e, rec(ix, e));
  return ix;
}
// After an edit. touch names what changed: { entries (text, root or links may have changed, or new), gone (deleted entries), themes (added, removed, moved, renamed or flags) }.
// Without touch (or without indexes yet) everything is rebuilt: the safe choice for any edit that does not say.
export function updateIndex(P, touch) {
  if (!touch || !P.ix?.at) return reindex(P);
  if (touch.themes) reindexThemes(P);
  return reindexEntries(P, touch.entries || [], touch.gone || []);
}
export const indexEntry = (P, e) => reindexEntries(P, [e]);

// Theme ids an entry belongs to: its own links, plus its root's when it is an alias.
export function linkIds(P, e) {
  if (!e.aliasOf) return Object.keys(e.typ);
  const r = P.ix.entry.get(e.aliasOf);
  return r ? [...new Set([...Object.keys(r.typ), ...Object.keys(e.typ)])] : Object.keys(e.typ);
}

// Typicality of an entry in a theme (how readily it comes to mind for the theme): its own `typ` value, else its root's (spellings and forms never have their own).
export function typicality(P, e, tid) {
  if (e.typ[tid]) return e.typ[tid];
  const r = e.aliasOf && P.ix.entry.get(e.aliasOf);
  return r ? r.typ[tid] || 0 : 0;
}

// How hard an entry is in a theme: the harder of its familiarity (how well known the word is) and its typicality (how peripheral it is to the theme)
// (a word few people know is hard however typical it is; a famous word that is a stretch for the theme is hard too).
export function difficultyBand(P, e, tid) { return Math.max(typicality(P, e, tid), e.fam || 0); }

// The difficulty the game receives, as a decimal from 1.0 to 5.0 (0 = unrated): 0.7 of the harder of the two ratings plus 0.3 of the easier, rounded to one decimal.
// A word hard on both ratings scores higher than one hard on only one. If only one rating is set, that one is the value. difficultyBand above is the whole-number band used for counting and filtering.
const round1 = x => Math.round(x * 10) / 10;
export const DIFF_WEIGHT = 0.7;
export const blendRatings = (a, b) => {
  const hi = Math.max(a || 0, b || 0), lo = Math.min(a || 0, b || 0);
  return !hi ? 0 : !lo ? hi : round1(DIFF_WEIGHT * hi + (1 - DIFF_WEIGHT) * lo);
};
// A theme's difficulty: its identifiability, moved up or down by popularity (1 most popular ... 5 least) by at most 1: ident + 0.5 x (pop - 3), kept between 1 and 5, one decimal.
// 0 when identifiability is unrated; identifiability alone when popularity is.
export const themeDifficulty = t => !t.ident ? 0 : !t.pop ? t.ident : round1(Math.min(5, Math.max(1, t.ident + 0.5 * (t.pop - 3))));

// Theme flags with inheritance: adult, sensitive, trademark, language-specific, foreign-language and disabled pass down the tree; regions are unioned.
export function eff(P, tid) {
  const ix = P.ix;
  if (ix.eff.has(tid)) return ix.eff.get(tid);
  const t = ix.theme.get(tid);
  if (!t) return { adult: false, sensitive: false, tm: false, lang: false, foreign: false, enabled: false, region: [] };
  const p = t.parent && t.parent !== tid ? eff(P, t.parent) : { adult: false, sensitive: false, tm: false, lang: false, foreign: false, enabled: true, region: [] };
  const r = { adult: p.adult || t.adult, sensitive: p.sensitive || t.sensitive, tm: p.tm || t.tm, lang: p.lang || t.lang, foreign: p.foreign || !!t.foreign,
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
    const b = difficultyBand(P, e, tid);
    bands[b]++;
    const r = e.aliasOf || e.id;
    if (!seen.has(r + ':' + b)) { seen.add(r + ':' + b); rootBands[b]++; }
  }
  return { entries: list.length, roots: roots.size, bands, rootBands };
}
// Sorts list in place by key(e) (ascending, or descending with dir -1), each key worked out once: the same order as comparing key() at every step (both sorts are stable).
// With a memo (an object kept between calls) the last call's order is reused when the list and every key are the same as then (an edit that changed nothing the sort looks at): the result is the same, without sorting again.
export function sortByKey(list, key, dir = 1, memo = null) {
  const ks = list.map(key);
  if (memo && memo.dir === dir && memo.list?.length === list.length && memo.list.every((e, i) => e === list[i]) && memo.keys.every((k, i) => k === ks[i])) { memo.out.forEach((e, i) => { list[i] = e; }); return list; }
  const pre = memo && [...list], d = list.map((e, i) => [ks[i], e]);
  d.sort((a, b) => dir * (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  d.forEach((x, i) => { list[i] = x[1]; });
  if (memo) Object.assign(memo, { dir, list: pre, keys: ks, out: [...list] });
  return list;
}
// themeStats(P, tid).roots alone, about ten times faster: the tree counts every theme after each edit.
export function themeRoots(P, tid) {
  const s = new Set();
  for (const e of P.ix.byTheme.get(tid) || []) if (usable(e)) s.add(e.aliasOf || e.id);
  return s.size;
}

// The themes whose word counts an edit can change: the links of the touched entries and of their aliases, as filed now. Called before updateIndex and after it (union), so removed links count too.
export function touchedThemes(P, touch, into = new Set()) {
  const ix = P.ix; if (!ix?.at) return null;
  for (const e of [...(touch.entries || []), ...(touch.gone || [])]) for (const x of [e, ...(ix.aliases.get(e.id) || [])]) for (const id of ix.at.get(x.id)?.t || []) into.add(id);
  return into;
}
// Distinct enabled roots per theme (own), summed up the tree (tot), with how many themes have min+ words (ready) and how many play (play). With prev (an earlier result of the same indexes) and dirty (touchedThemes) only those themes are recounted.
export function themeCounts(P, prev = null, dirty = null) {
  const own = prev ? prev.own : new Map(), tot = new Map(), ready = new Map(), play = new Map(), min = P.settings.minWords || 4;
  if (prev) for (const id of dirty) { const t = P.ix.theme.get(id); if (t && !t.group) own.set(id, themeRoots(P, id)); }
  else for (const t of P.themes) if (!t.group) own.set(t.id, themeRoots(P, t.id));
  const sum = id => {
    const t = P.ix.theme.get(id);
    let n = t.group ? 0 : own.get(id), r = !t.group && own.get(id) >= min ? 1 : 0, p = t.group ? 0 : 1;
    for (const k of P.ix.kids.get(id) || []) { const c = sum(k.id); n += c[0]; r += c[1]; p += c[2]; }
    tot.set(id, n); ready.set(id, r); play.set(id, p);
    return [n, r, p];
  };
  for (const t of P.ix.kids.get('') || []) sum(t.id);
  return { own, tot, ready, play };
}

// What a theme can serve a level: its distinct roots by difficulty. `counts[1..5]` roots at each difficulty (an alias group counts at every difficulty one of its words has),
// `median` the middle root's difficulty, `lo` and `hi` the difficulty of the 4th easiest and 4th hardest root (the range in which it can fill a 4-word set), `reach` the root count.
export function themeProfile(P, tid) {
  const list = (P.ix.byTheme.get(tid) || []).filter(usable), counts = [0, 0, 0, 0, 0, 0], seen = new Set(), roots = new Map();
  for (const e of list) {
    const b = difficultyBand(P, e, tid) || 5, r = e.aliasOf || e.id;
    if (!seen.has(r + ':' + b)) { seen.add(r + ':' + b); counts[b]++; }
    const rr = P.ix.entry.get(r);
    if (!e.aliasOf || !roots.has(r)) roots.set(r, difficultyBand(P, e.aliasOf && rr ? rr : e, tid) || 5);
  }
  const sorted = [...roots.values()].sort((a, b) => a - b), n = sorted.length, median = n ? sorted[n >> 1] : 0;
  return { counts, reach: n, median, lo: n >= 4 ? sorted[3] : 0, hi: n >= 4 ? sorted[n - 4] : 0 };
}

// The library's default dialect (a setting of the library, so each language can have its own): which regional or spelling variant the app shows for a word that has one.
// It never moves data: the root stays the root. English defaults to US; other languages have none until it is set.
export const dialectOf = P => P.settings?.dialect ?? (P.lang === 'en' ? 'US' : '');
// A locked theme shows exactly the word linked, never a regional, spelling or family substitute: the spelling or sound of the word is the point (wordplay, compound, language-specific themes).
// Derived from the theme's kind and language flag unless the theme says so itself (t.locked true or false).
export const themeLocked = (P, t) => t.locked !== undefined ? !!t.locked : t.tkind === 'wordplay' || t.tkind === 'compound' || !!eff(P, t.id).lang;
export function dialectMember(P, e) {
  const d = dialectOf(P);
  if (!d || e.aliasOf || e.region.includes(d)) return e;
  return (P.ix.aliases.get(e.id) || []).find(a => (a.aliasKind === 'regional' || a.aliasKind === 'spelling') && a.region.includes(d)) || e;
}

// ---------- edits ----------

// Rewrites the synonym groups of theme t through fix (which returns the group itself when it has nothing to change); a changed group left with fewer than two members goes.
function editGroups(t, fix) {
  if (!t?.groups) return;
  const gs = [];
  for (const g of t.groups) { const n = fix(g); if (n === g || n.length > 1) gs.push(n); }
  t.groups = gs; if (!gs.length) delete t.groups;
}
const dropIds = ids => g => g.some(id => ids.has(id)) ? g.filter(id => !ids.has(id)) : g;
// Unlinking also drops what the entry held for that theme: its shown text, and (once it is no longer in the theme at all) the form it used, its name allowance and its place in the theme's synonym groups (with its aliases that leave with it).
export function unlinkEntry(P, e, tid) {
  delete e.typ[tid]; if (e.show) delete e.show[tid];
  const r = e.aliasOf && P.entries.find(x => x.id === e.aliasOf);
  if (r && tid in r.typ) return;   // an alias still in the theme through its root
  if (e.use) delete e.use[tid];
  if (e.nameOkIn?.includes(tid)) e.nameOkIn = e.nameOkIn.filter(x => x !== tid);
  editGroups(P.themes.find(t => t.id === tid), dropIds(new Set([e.id, ...(e.aliasOf ? [] : P.entries.filter(a => a.aliasOf === e.id && !(tid in a.typ)).map(a => a.id))])));
}

const SAME_WORD = ['spelling', 'form'];   // alias kinds that are the root's own word written another way: the root's word-level data fits them
// Deleting a root promotes an alias: the first spelling, else the first that is not a form, else the first. It takes the root's place everywhere:
// its links (with the root's rating where it had none of its own), its synonym groups, adult and sensitive (they follow the meaning), its region when it has none of its own (the export judged it on the root's),
// and the shown text of a theme when it is the same word or its text contains that text. When it is the same word (spelling, form) it also takes trademark, vulgar, the name allowances and the forms the themes used.
// When it is another word, the root's spellings and abbreviations become its synonyms (a spelling of the old root is not a spelling of the new one); forms keep their kind.
// The deleted id leaves every synonym group and every `use`. Returns what updateIndex needs.
export function deleteEntry(P, e) {
  const als = P.entries.filter(a => a.aliasOf === e.id);
  let first = null;
  if (als.length) {
    first = als.find(a => a.aliasKind === 'spelling') || als.find(a => a.aliasKind !== 'form') || als[0];
    const same = SAME_WORD.includes(first.aliasKind);
    for (const [tid, v] of Object.entries(e.typ)) if (!(tid in first.typ)) first.typ[tid] = v;
    first.adult ||= e.adult; first.sensitive ||= e.sensitive;
    if (!first.region.length) first.region = [...e.region];
    first.show ||= {};
    for (const [tid, s] of Object.entries(e.show || {})) if (!first.show[tid] && (same || first.text.toLowerCase().includes(s.toLowerCase()))) first.show[tid] = s;
    if (same) {
      first.tm ||= e.tm; first.vulgar ||= e.vulgar;
      first.nameOkIn = [...new Set([...(first.nameOkIn || []), ...(e.nameOkIn || [])])];
      first.use ||= {};
      for (const [tid, id] of Object.entries(e.use || {})) if (id !== first.id && !first.use[tid] && als.some(a => a.id === id)) first.use[tid] = id;
    }
    first.aliasOf = 0; first.aliasKind = '';
    for (const a of als) if (a !== first) { a.aliasOf = first.id; if (!same && (a.aliasKind === 'spelling' || a.aliasKind === 'abbreviation')) a.aliasKind = 'synonym'; }
  }
  for (const t of P.themes) {
    editGroups(t, first ? g => g.includes(e.id) ? [...new Set(g.map(id => id === e.id ? first.id : id))] : g : dropIds(new Set([e.id])));
    const hit = first && (t.groups || []).filter(g => g.includes(first.id));
    if (hit?.length > 1) t.groups = [...t.groups.filter(g => !hit.includes(g)), [...new Set(hit.flat())]];   // a word is in one group per theme
  }
  for (const x of P.entries) if (x.use) for (const [tid, id] of Object.entries(x.use)) if (id === e.id) delete x.use[tid];
  P.entries = P.entries.filter(x => x !== e);
  return { entries: als, gone: [e] };
}

// The theme a wordplay rule names (starts:@colors), or ''.
export const ruleTheme = t => /^(?:starts|ends|hidden):@(.+)$/.exec(t.rule || '')?.[1] || '';
// Deleting a theme also drops what entries held for it (shown text, form used, name allowance). It is refused while another theme's rule names it. Returns what updateIndex needs.
export function deleteTheme(P, tid) {
  const t = P.ix.theme.get(tid);
  if (!t) return { themes: true };
  const by = P.themes.filter(x => x !== t && ruleTheme(x) === tid);
  if (by.length) throw Error(`"${t.name}" cannot be deleted: the rule of ${by.map(x => `"${x.name}"`).join(', ')} names it. Change that rule first.`);
  for (const k of P.themes) if (k.parent === tid) k.parent = t.parent;
  const es = [];
  for (const e of P.entries) { if (tid in e.typ) es.push(e); delete e.typ[tid]; if (e.show) delete e.show[tid]; if (e.use) delete e.use[tid]; if (e.nameOkIn?.includes(tid)) e.nameOkIn = e.nameOkIn.filter(x => x !== tid); }
  P.themes = P.themes.filter(x => x !== t);
  return { themes: true, entries: es };
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
  foreign: 'Foreign language: the words are mostly NOT English (numbers, days, colors or greetings in another language, Swahili or Maori words). English words of foreign origin (loanwords, french phrases used in English) do not count. The game can hold these back until later levels.',
};
