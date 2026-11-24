// Library export: themes and words filtered by flags, written as a compact columnar JSON file.
//
// Filters are applied per link (entry in theme), because a flag can come from the entry or from the theme it sits in.
// For adult, sensitive, trademark and offensive a link is flagged when the entry OR the theme (or any ancestor) has the flag.
// Offensive words and themes are left out unless the options include them (DESIGN-entries.md 3.8: the toggle is off by default).
// Each filter is 'include' (ignore the flag) or 'exclude' (drop flagged links); 'only' still works in the code but the screen no longer offers it.
// Entries longer than `maxEntryWords` words are dropped (0 = no limit). Entries left with no link are dropped; themes left with fewer than `minWords` distinct words are dropped; the report says how many.
import { eff, difficultyBand, typicality, blendRatings, themeDifficulty, themeProfile, dialectOf, themeLocked, linkIds, shownFor, POS, TYPES, REGIONS } from './model.js';
import { zipf } from './freq.js';
import { isNameWord } from './validate.js';
import { breakPoints } from './breaks.js';
import { clashGroups } from './family.js';

export const DEFAULT_EXPORT = {
  adult: 'include', sensitive: 'include', tm: 'include', offensive: 'exclude', lang: 'include',
  region: { mode: 'all', codes: [...REGIONS], v: 2 }, // 'all' | 'exclude'; codes = the regions the setting applies to (none ticked = nothing is left out)
  synonyms: true, spellings: true,                  // include aliases of each kind
  zipf: false, gloss: false, notes: false,
  recMin: 1, recMax: 5, unrated: true, minWords: 4,
  maxEntryWords: 0,                                 // longest entry (in words) to include; 0 = no limit
};
export const PRESETS = {
  'full': { offensive: 'include' },
  'family': { adult: 'exclude', offensive: 'exclude' },
  'family, no trademarks': { adult: 'exclude', offensive: 'exclude', tm: 'exclude' },
};

const pass = (mode, flagged) => mode === 'include' || (mode === 'exclude' ? !flagged : flagged);
const regionPass = (r, regions) => {
  if (r.mode === 'all') return true;
  const hit = regions.some(c => r.codes.includes(c));
  return r.mode === 'exclude' ? !hit : hit;
};
// Presets saved before version 2 used an empty list to mean every region.
export const fixRegion = r => (r.v === 2 ? r : { ...r, codes: r.codes.length ? r.codes : [...REGIONS], v: 2 });

// Bit layouts, written into the file so the reader does not have to guess.
// What a theme is: category (kinds of one thing), place, property (members share an attribute), wordplay (members chosen by spelling or sound; rule says how to test) and compound (members combine with a shared word).
export const THEME_KINDS = ['category', 'place', 'property', 'wordplay', 'compound'];
export const THEME_BITS = { adult: 1, sensitive: 2, trademark: 4, lang: 8, complete: 16, group: 32, locked: 64, foreign: 128, offensive: 256 };   // locked: show exactly the linked word, no regional or family substitution
export const ENTRY_BITS = { adult: 1, sensitive: 2, trademark: 4, offensive: 8, spelling: 16, form: 32, regional: 64, abbreviation: 128, translation: 256, synonym: 512 };

export function buildExport(P, opt0 = {}) {
  const o = Object.assign({}, DEFAULT_EXPORT, opt0);
  if (opt0.offensive === undefined && opt0.vulgar !== undefined) o.offensive = opt0.vulgar;   // presets saved before the flag was renamed (2026-11-22)
  o.region = fixRegion(o.region);
  const report = { themesIn: 0, themesOut: 0, entriesIn: 0, entriesOut: 0, droppedThin: [], notes: [] };
  const ix = P.ix;

  // 1. Links that pass the filters.
  const keep = new Map();                            // entry id -> [[themeId, difficulty, typicality]]
  const candidates = P.entries.filter(e => e.enabled);
  report.entriesIn = candidates.length;
  const themeOk = t => {
    const f = eff(P, t.id);
    return !t.group && f.enabled && pass(o.lang, f.lang) && regionPass(o.region, f.region);
  };
  const okTheme = new Map(P.themes.map(t => [t.id, themeOk(t)]));
  for (const e of candidates) {
    if (e.aliasOf && !(['synonym', 'regional', 'abbreviation', 'translation'].includes(e.aliasKind) ? o.synonyms : o.spellings)) continue;   // spellings and forms (skis for ski) go together; other names for the thing follow the synonyms option
    if (o.maxEntryWords > 0 && e.text.trim().split(/\s+/).length > o.maxEntryWords) continue;
    if (!regionPass(o.region, ix.entry.get(e.aliasOf || e.id).region)) continue;   // region is judged on the root only: an alias follows its root, never its own tag
    const links = [];
    for (const tid of linkIds(P, e)) {
      if (!okTheme.get(tid)) continue;
      const f = eff(P, tid);
      if (!pass(o.adult, e.adult || f.adult) || !pass(o.sensitive, e.sensitive || f.sensitive) || !pass(o.tm, e.tm || f.tm) || !pass(o.offensive, e.offensive || f.offensive)) continue;
      // A theme may show the entry under a shorter text (show) or as one of its forms (use); that text and its part of speech travel with the link.
      const sh = shownFor(P, e, tid);
      const r = Math.max(difficultyBand(P, e, tid), sh && sh.fam || 0);
      if (r === 0 ? !o.unrated : (r < o.recMin || r > o.recMax)) continue;
      links.push([tid, blendRatings(Math.max(e.fam || 0, sh && sh.fam || 0), typicality(P, e, tid)), typicality(P, e, tid), sh ? sh.text + '|' + POS.indexOf(sh.pos) : '']);   // difficulty is the decimal blend (model.js); the whole-number r above only filters
    }
    if (links.length) keep.set(e.id, links);
  }
  // An alias that only inherits a theme from its root adds nothing there when the root shows the same text (case-insensitive) in that theme: its link is dropped.
  report.inheritedSame = [];
  for (const [id, links] of [...keep]) {
    const e = ix.entry.get(id); if (!e.aliasOf || e.aliasKind === 'form') continue;   // a form alias is the row a root's `use` points at: it stays
    const rl = keep.get(e.aliasOf); if (!rl) continue;
    const root = ix.entry.get(e.aliasOf), shownText = (x, sh) => (sh ? sh.slice(0, sh.lastIndexOf('|')) : x.text).trim().toLowerCase();
    const rest = links.filter(([tid, , , sh]) => {
      if (e.typ[tid] !== undefined) return true;
      const r = rl.find(l => l[0] === tid);
      if (!r || shownText(root, r[3]) !== shownText(e, sh)) return true;
      report.inheritedSame.push(`${e.text} in ${ix.theme.get(tid).name} (root ${root.text} already shows it)`);
      return false;
    });
    if (rest.length) keep.set(id, rest); else keep.delete(id);
  }

  // Two words that read the same in one theme cannot both be placed: the less popular one (then the harder one) is left out of that theme.
  const slot = new Map();                            // themeId + shown text -> [{ id, typicality, familiarity }]
  const textOf = (e, sh) => (sh ? sh.slice(0, sh.lastIndexOf('|')) : e.text).trim().toLowerCase();
  for (const [id, links] of keep) { const e = ix.entry.get(id); for (const [tid, r, p, sh] of links) { if (e.aliasOf && e.typ[tid] === undefined) continue; const k = tid + ': ' + textOf(e, sh); if (!slot.has(k)) slot.set(k, []); slot.get(k).push({ id, tid, typicality: p || 9, familiarity: r || 9 }); } }
  const out = new Set(); report.sameText = [];
  for (const [k, xs] of slot) if (xs.length > 1) {
    xs.sort((a, b) => a.typicality - b.typicality || a.familiarity - b.familiarity || a.id - b.id);
    report.sameText.push(`${k.slice(k.indexOf(': ') + 2)} in ${ix.theme.get(xs[0].tid).name} (kept ${ix.entry.get(xs[0].id).text}, left out ${xs.slice(1).map(x => ix.entry.get(x.id).text).join(', ')})`);
    for (const x of xs.slice(1)) out.add(x.tid + '|' + x.id);
  }
  if (out.size) {
    for (const [id, links] of [...keep]) {
      const e = ix.entry.get(id), rid = e.aliasOf || e.id;
      const rest = links.filter(([tid]) => !out.has(tid + '|' + rid) && !out.has(tid + '|' + id));
      if (rest.length) keep.set(id, rest); else keep.delete(id);
    }
    report.notes.push(`${out.size} links left out because another word reads the same in that theme (the less popular one).`);
  }

  // 2. Drop themes that fall below the minimum, then entries left with no theme; repeat until stable.
  let dropped = new Set();
  for (let pass_ = 0; pass_ < 6; pass_++) {
    const roots = new Map();
    for (const [id, links] of keep) {
      const e = ix.entry.get(id), rid = e.aliasOf || e.id;
      for (const [tid] of links) { if (!roots.has(tid)) roots.set(tid, new Set()); roots.get(tid).add(rid); }
    }
    const thin = [...okTheme].filter(([tid, ok]) => ok && !dropped.has(tid) && (roots.get(tid) || new Set()).size < o.minWords).map(([tid]) => tid);
    if (!thin.length) break;
    thin.forEach(t => dropped.add(t));
    for (const [id, links] of [...keep]) {
      const rest = links.filter(([tid]) => !dropped.has(tid));
      if (rest.length) keep.set(id, rest); else keep.delete(id);
    }
  }
  report.droppedThin = [...dropped].filter(t => (ix.byTheme.get(t) || []).length).map(t => ix.theme.get(t).name);

  // 3. Themes to write: kept playable themes plus the groups above them, in tree order.
  const used = new Set();
  for (const links of keep.values()) for (const [tid] of links) used.add(tid);
  const wanted = new Set(used);
  for (const tid of used) { let t = ix.theme.get(tid); while (t && t.parent) { wanted.add(t.parent); t = ix.theme.get(t.parent); } }
  const themes = P.themes.filter(t => wanted.has(t.id));
  const tIndex = new Map(themes.map((t, i) => [t.id, i]));
  report.themesIn = P.themes.filter(t => !t.group && eff(P, t.id).enabled).length;
  report.themesOut = themes.filter(t => used.has(t.id)).length;

  const regions = [...new Set([...themes.flatMap(t => t.region), ...[...keep.keys()].flatMap(id => ix.entry.get(id).region)])].sort((a, b) => (a === 'UK' ? 0 : a === 'US' ? 1 : 2) - (b === 'UK' ? 0 : b === 'US' ? 1 : 2) || (a < b ? -1 : a > b ? 1 : 0));   // UK and US first
  const REGION_BITS = 30;                            // regions[i] is bit i of the low mask, or bit i-30 of the high mask (JS shifts wrap at 32, so one mask cannot hold more than 31)
  const rMask = list => { let lo = 0, hi = 0; for (const c of list) { const i = regions.indexOf(c); if (i < REGION_BITS) lo |= 1 << i; else hi |= 1 << (i - REGION_BITS); } return [lo, hi]; };

  // 4. Entries. Aliases point at their root; if the root was filtered out, the first alias that survives becomes the root.
  const ids = [...keep.keys()];
  const pos = new Map(ids.map((id, i) => [id, i]));
  const promoted = new Map();                        // missing root id -> the alias that stands in for it
  for (const id of ids) {
    const r = ix.entry.get(id).aliasOf;
    if (r && !pos.has(r) && !promoted.has(r)) promoted.set(r, id);
  }
  // index+1 of the root this entry is an alias of, or 0 when it is a root (or was promoted to one)
  const rootIndex = id => {
    const r = ix.entry.get(id).aliasOf;
    if (!r) return 0;
    if (pos.has(r)) return pos.get(r) + 1;
    return promoted.get(r) === id ? 0 : pos.get(promoted.get(r)) + 1;
  };
  const cols = { text: [], pos: [], type: [], flags: [], familiarity: [], regions: [], regionsHi: [], root: [], clash: [], linkCount: [], links: [] };
  const nameWordLinks = [];                          // numbers of links (position in the concatenated link list, links[4n..4n+3]) whose shown text is just a word of the theme name
  const nameKey = x => x.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/s$/, '');   // a text and a theme name compare equal ignoring case, punctuation and a final s
  const themeByName = new Map();                       // normalised theme name -> theme index (only the first when two themes share a name)
  themes.forEach((t, i) => { const k = nameKey(t.name); if (k && !themeByName.has(k)) themeByName.set(k, i); });
  const nameThemeLinks = [];                          // [link number, theme index] pairs: the link's shown text (or the entry's text) is the whole name of ANOTHER theme (a passenger word)
  const shownUK = [];                                 // [link number, index+1 into shown]: what a British player sees for that link when it differs from the link's own shown text (spelling aliases only: gray -> grey)
  const ukSpell = new Map();                          // root id -> its UK spelling alias entry
  for (const id of ids) { const x = ix.entry.get(id); if (x.aliasOf && x.aliasKind === 'spelling' && (x.region || []).includes('UK') && !(x.region || []).includes('US') && !ukSpell.has(x.aliasOf)) ukSpell.set(x.aliasOf, x); }
  const ukText = (root, uk, text) => {               // the British form of a short text: swap the words that differ between the root and its UK spelling alias
    const a = root.text.split(/\s+/), b = uk.text.split(/\s+/); if (a.length !== b.length) return null;
    const map = new Map(); a.forEach((w, i) => { if (w !== b[i]) map.set(w.toLowerCase(), b[i]); });
    let changed = false; const out = text.split(/(\s+)/).map(w => { const r = map.get(w.toLowerCase()); if (r === undefined) return w; changed = true; return w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase() ? r[0].toUpperCase() + r.slice(1) : r; }).join('');
    return changed ? out : null;
  };
  const shown = [], shownAt = new Map();           // texts a theme shows instead of the entry's own: [text, pos]; a link points at one (index+1, 0 = the entry's own text)
  const clash = clashGroups(P, themes, id => keep.has(id) || promoted.has(id));   // a root left out but stood in for by a promoted alias stays in its groups, so the alias keeps the root's clash id. Words that stand for one another in a theme (its groups) or are kin (one word family across themes) share a clash id: the level builder never puts two of them in one level
  const bp = t => P.lang === 'en' ? breakPoints(t) : [];   // the break table is English-only: other languages get empty lists
  cols.breaks = [];                                 // character indexes in text[i] where a hyphen may go, [] for none
  if (o.zipf && P.lang === "en") cols.zipf = [];
  if (o.gloss) cols.gloss = [];
  if (o.notes) cols.note = [];
  for (const id of ids) {
    const e = ix.entry.get(id), links = keep.get(id);
    let flags = 0;
    if (e.adult) flags |= ENTRY_BITS.adult; if (e.sensitive) flags |= ENTRY_BITS.sensitive; if (e.tm) flags |= ENTRY_BITS.trademark; if (e.offensive) flags |= ENTRY_BITS.offensive;
    if (e.aliasOf && e.aliasKind === 'spelling') flags |= ENTRY_BITS.spelling;
    if (e.aliasOf && e.aliasKind === 'form') flags |= ENTRY_BITS.form;
    if (e.aliasOf && e.aliasKind === 'regional') flags |= ENTRY_BITS.regional;
    if (e.aliasOf && e.aliasKind === 'abbreviation') flags |= ENTRY_BITS.abbreviation;
    if (e.aliasOf && e.aliasKind === 'translation') flags |= ENTRY_BITS.translation;
    if (e.aliasOf && e.aliasKind === 'synonym') flags |= ENTRY_BITS.synonym;
    cols.text.push(e.text);
    cols.breaks.push(bp(e.text));
    cols.pos.push(POS.indexOf(e.pos));
    cols.type.push(TYPES.indexOf(e.type));
    cols.flags.push(flags);
    cols.familiarity.push(e.fam);
    { const [lo, hi] = rMask(e.region); cols.regions.push(lo); cols.regionsHi.push(hi); }
    cols.root.push(rootIndex(id));
    cols.clash.push(clash.id(ix.entry.get(e.aliasOf || e.id).id));
    // An alias row carries no links (the game never reads them): `keep` still holds them so the filters and drops above decide which alias rows exist, but they are not written.
    const written = rootIndex(id) ? [] : links;   // a promoted alias (its root left out) is a root row and keeps its links
    cols.linkCount.push(written.length);
    for (const [tid, r, p, sh] of written) {
      if (isNameWord(ix.theme.get(tid), sh ? sh.slice(0, sh.lastIndexOf('|')) : e.text)) nameWordLinks.push(cols.links.length / 4);
      if (sh && !shownAt.has(sh)) { const [text, ps] = [sh.slice(0, sh.lastIndexOf('|')), +sh.slice(sh.lastIndexOf('|') + 1)]; shown.push([text, ps, bp(text)]); shownAt.set(sh, shown.length); }
      { const txt = sh ? sh.slice(0, sh.lastIndexOf('|')) : e.text, k = nameKey(txt), ot = k ? themeByName.get(k) : undefined; if (ot !== undefined && ot !== tIndex.get(tid)) nameThemeLinks.push([cols.links.length / 4, ot]); }
      if (sh && !e.aliasOf && ukSpell.has(e.id)) {
        const psn = +sh.slice(sh.lastIndexOf('|') + 1), ut = ukText(e, ukSpell.get(e.id), sh.slice(0, sh.lastIndexOf('|')));
        if (ut) { const key = ut + '|' + psn; if (!shownAt.has(key)) { shown.push([ut, psn, bp(ut)]); shownAt.set(key, shown.length); } shownUK.push([cols.links.length / 4, shownAt.get(key)]); }
      }
      cols.links.push(tIndex.get(tid), r, p, sh ? shownAt.get(sh) : 0);
    }
    if (cols.zipf) { const z = zipf(e.text); cols.zipf.push(z == null ? 0 : Math.round(z * 10)); }
    if (o.gloss) cols.gloss.push(e.gloss);
    if (o.notes) cols.note.push(e.note);
  }
  report.entriesOut = ids.length;
  report.notes.push(`${shown.length} texts are shown in place of an entry's own text in some themes; ${clash.clashId.size} groups of words stand for one another.`);

  const themeRows = themes.map(t => {
    const f = eff(P, t.id);
    const bits = (f.adult ? THEME_BITS.adult : 0) | (f.sensitive ? THEME_BITS.sensitive : 0) | (f.tm ? THEME_BITS.trademark : 0) | (f.lang ? THEME_BITS.lang : 0) | (f.foreign ? THEME_BITS.foreign : 0) | (f.offensive ? THEME_BITS.offensive : 0)
      | (t.complete ? THEME_BITS.complete : 0)
      | (themeLocked(P, t) ? THEME_BITS.locked : 0)
      | (t.group || !used.has(t.id) ? THEME_BITS.group : 0);      // an ancestor kept only for the tree is written as a group
    const pr = used.has(t.id) ? themeProfile(P, t.id) : null;   // worked out from every usable word of the theme (not only the ones that pass the filters)
    const [rlo, rhi] = rMask(f.region);
    const row = [t.id, t.name, t.parent ? tIndex.get(t.parent) : -1, bits, rlo, t.pop || 0, pr ? pr.counts.slice(1) : [0, 0, 0, 0, 0], pr ? [pr.lo, pr.hi] : [0, 0], rhi, Math.max(0, THEME_KINDS.indexOf(t.tkind || 'category')), t.rule || '', t.ident || 0, themeDifficulty(t), bp(t.name)];
    if (o.notes) row.push(t.note);
    return row;
  });

  const file = {
    v: 4, lang: P.lang, lib: { version: P.lib.version, modified: P.lib.modified }, generated: /^\d{4}-\d\d-\d\d \d\d:\d\d$/.test(P.lib.modified || '') ? P.lib.modified.replace(' ', 'T') + ':00' : new Date().toISOString(),   // the library's last save time (E5): the same library always gives the same file
    dialect: dialectOf(P), options: o, regions, regionBits: REGION_BITS, kindNames: THEME_KINDS, posNames: POS, typeNames: TYPES, themeBits: THEME_BITS, entryBits: ENTRY_BITS,
    // identifiability 1 (obvious) to 5 (obscure), 0 unrated; popularity 1 (most popular) to 5, 0 unrated; counts = roots at difficulty 1..5; range = difficulty of the 4th easiest and 4th hardest root
    themeFields: ['id', 'name', 'parent', 'flags', 'regions', 'popularity', 'counts', 'range', 'regionsHi', 'kind', 'rule', 'identifiability', 'difficulty', 'breaks'].concat(o.notes ? ['note'] : []),
    themes: themeRows,
    // entries are columns: entry i is text[i], pos[i] ... ; its themes (roots only: an alias row has linkCount 0) are the next linkCount[i] groups of 4 numbers (themeIndex, difficulty, typicality, shown) in `links`; shown is 0 or index+1 into `shown` ([text, pos]), the text and part of speech the theme displays.
    // clash[i] is 0, or an id shared by words that stand for one another in a theme (synonym groups) or are kin (one word family across themes): never put two with the same id in one level.
    // breaks[i] lists the character indexes in text[i] where a hyphen may be placed (a hyphen goes before that character); [] when the text has no break point. Words of 8+ letters only; spaces and existing hyphens are the game's own breaks. Shown texts carry the same list as a third value, and theme rows in the 'breaks' field.
    // nameThemeLinks: [link number, theme index] pairs: the link's text as shown is the whole name of another theme (a passenger word); link number n is links[4n..4n+3]. shownUK: [link number, index+1 into shown]: the text a British player sees for that link when it differs from the shown text (the UK spelling of a short text, gray -> grey); links not listed show the same text to everyone.
    // root[i] is 0 for a root entry, else the index+1 of the root it is an alias of.
    entries: cols,
    shown, nameWordLinks, nameThemeLinks, shownUK,
    linkFields: ['theme', 'difficulty', 'typicality', 'shown'],
  };
  return { file, report };
}

// Shared by the Export window and tools/export-game.mjs: the file name (the preset, plus the library version when ver is true) and the one-line case lint summary.
export const exportName = (P, preset, ver) => `wordlist-game-${String(preset).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'export'}${ver ? '-v' + P.lib.version : ''}.json`;
export const lintLine = n => `case lint: ${n} issue${n === 1 ? '' : 's'} (capital or sense mismatches; see js/caselint.js; Checks and tools/gen/lint-show.mjs list them)`;

export async function sizeOf(text) {
  const raw = new Blob([text]).size;
  let gz = null;
  if (typeof CompressionStream !== 'undefined') {
    const s = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
    gz = (await new Response(s).blob()).size;
  }
  return { raw, gz };
}

// Lists from a report for the dialog and the command line: [{ title, why, lines }] for the dropped themes (names) and the same-text drops, only those with entries, each cut to `cap` lines.
export const capLines = (xs, cap = 200) => xs.length > cap ? [...xs.slice(0, cap), `... and ${xs.length - cap} more`] : xs.slice();
export const reportLists = (report, minWords, cap = 200) => [
  { title: `Dropped themes (${report.droppedThin.length})`, lines: capLines(report.droppedThin, cap), why: `fewer than ${minWords} words after filtering` },
  { title: `Same-text drops (${report.sameText.length})`, lines: capLines(report.sameText, cap), why: 'two words read the same in one theme; the less popular is left out' },
  { title: `Inherited alias links dropped (${(report.inheritedSame || []).length})`, lines: capLines(report.inheritedSame || [], cap), why: 'an alias that only inherits a theme is left out where its root already shows the same text' }].filter(l => l.lines.length);
