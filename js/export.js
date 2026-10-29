// Library export: themes and words filtered by flags, written as a compact columnar JSON file.
//
// Filters are applied per link (entry in theme), because a flag can come from the entry or from the theme it sits in.
// For adult, sensitive and trademark a link is flagged when the entry OR the theme (or any ancestor) has the flag.
// Each filter is 'include' (ignore the flag) or 'exclude' (drop flagged links); 'only' still works in the code but the screen no longer offers it.
// Entries longer than `maxEntryWords` words are dropped (0 = no limit). Entries left with no link are dropped; themes left with fewer than `minWords` distinct words are dropped; the report says how many.
import { eff, effRec, linkIds, POS, TYPES } from './model.js';
import { zipf, freqLoaded } from './freq.js';

export const DEFAULT_EXPORT = {
  adult: 'include', sensitive: 'include', tm: 'include', vulgar: 'include', lang: 'include',
  region: { mode: 'all', codes: [] },              // 'all' | 'exclude' | 'only', with codes ([] = any region-specific)
  synonyms: true, spellings: true,                  // include aliases of each kind
  zipf: false, gloss: false, notes: false,
  recMin: 1, recMax: 5, unrated: true, minWords: 4,
  maxEntryWords: 0,                                 // longest entry (in words) to include; 0 = no limit
};
export const PRESETS = {
  'full': {},
  'family': { adult: 'exclude', sensitive: 'exclude', vulgar: 'exclude' },
  'family, no trademarks': { adult: 'exclude', sensitive: 'exclude', vulgar: 'exclude', tm: 'exclude' },
  'english spelling only, no regional words': { region: { mode: 'exclude', codes: [] } },
  'no variants': { synonyms: false, spellings: false },
};

const pass = (mode, flagged) => mode === 'include' || (mode === 'exclude' ? !flagged : flagged);
const regionPass = (r, regions) => {
  if (r.mode === 'all') return true;
  const hit = r.codes.length ? regions.some(c => r.codes.includes(c)) : regions.length > 0;
  return r.mode === 'exclude' ? !hit : hit;
};

// Bit layouts, written into the file so the reader does not have to guess.
export const THEME_BITS = { adult: 1, sensitive: 2, trademark: 4, lang: 8, complete: 16, group: 32 };
export const ENTRY_BITS = { adult: 1, sensitive: 2, trademark: 4, vulgar: 8, spelling: 16 };

export function buildExport(P, opt0 = {}) {
  const o = Object.assign({}, DEFAULT_EXPORT, opt0);
  const report = { themesIn: 0, themesOut: 0, entriesIn: 0, entriesOut: 0, droppedThin: [], notes: [] };
  const ix = P.ix;

  // 1. Links that pass the filters.
  const keep = new Map();                            // entry id -> [[themeId, rec]]
  const candidates = P.entries.filter(e => e.enabled);
  report.entriesIn = candidates.length;
  const themeOk = t => {
    const f = eff(P, t.id);
    return !t.group && f.enabled && pass(o.lang, f.lang) && regionPass(o.region, f.region);
  };
  const okTheme = new Map(P.themes.map(t => [t.id, themeOk(t)]));
  for (const e of candidates) {
    if (e.aliasOf && !(e.aliasKind === 'spelling' ? o.spellings : o.synonyms)) continue;
    if (o.maxEntryWords > 0 && e.text.trim().split(/s+/).length > o.maxEntryWords) continue;
    if (!pass(o.vulgar, e.vulgar) || !regionPass(o.region, ix.entry.get(e.aliasOf || e.id).region)) continue;   // region is judged on the root only: an alias follows its root, never its own tag
    const links = [];
    for (const tid of linkIds(P, e)) {
      if (!okTheme.get(tid)) continue;
      const f = eff(P, tid);
      if (!pass(o.adult, e.adult || f.adult) || !pass(o.sensitive, e.sensitive || f.sensitive) || !pass(o.tm, e.tm || f.tm)) continue;
      const r = effRec(P, e, tid);
      if (r === 0 ? !o.unrated : (r < o.recMin || r > o.recMax)) continue;
      links.push([tid, r]);
    }
    if (links.length) keep.set(e.id, links);
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

  const regions = [...new Set([...themes.flatMap(t => t.region), ...[...keep.keys()].flatMap(id => ix.entry.get(id).region)])].sort();
  const rMask = list => list.reduce((m, c) => m | (1 << regions.indexOf(c)), 0);

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
  const cols = { text: [], pos: [], type: [], flags: [], rec: [], regions: [], root: [], linkCount: [], links: [] };
  if (o.zipf && P.lang === "en") cols.zipf = [];
  if (o.gloss) cols.gloss = [];
  if (o.notes) cols.note = [];
  for (const id of ids) {
    const e = ix.entry.get(id), links = keep.get(id);
    let flags = 0;
    if (e.adult) flags |= ENTRY_BITS.adult; if (e.sensitive) flags |= ENTRY_BITS.sensitive; if (e.tm) flags |= ENTRY_BITS.trademark; if (e.vulgar) flags |= ENTRY_BITS.vulgar;
    if (e.aliasOf && e.aliasKind === 'spelling') flags |= ENTRY_BITS.spelling;
    cols.text.push(e.text);
    cols.pos.push(POS.indexOf(e.pos));
    cols.type.push(TYPES.indexOf(e.type));
    cols.flags.push(flags);
    cols.rec.push(e.rec);
    cols.regions.push(rMask(e.region));
    cols.root.push(rootIndex(id));
    cols.linkCount.push(links.length);
    for (const [tid, r] of links) cols.links.push(tIndex.get(tid), r);
    if (cols.zipf) { const z = zipf(e.text); cols.zipf.push(z == null ? 0 : Math.round(z * 10)); }
    if (o.gloss) cols.gloss.push(e.gloss);
    if (o.notes) cols.note.push(e.note);
  }
  report.entriesOut = ids.length;

  const themeRows = themes.map(t => {
    const f = eff(P, t.id);
    const bits = (f.adult ? THEME_BITS.adult : 0) | (f.sensitive ? THEME_BITS.sensitive : 0) | (f.tm ? THEME_BITS.trademark : 0) | (f.lang ? THEME_BITS.lang : 0)
      | (t.complete ? THEME_BITS.complete : 0)
      | (t.group || !used.has(t.id) ? THEME_BITS.group : 0);      // an ancestor kept only for the tree is written as a group
    const row = [t.id, t.name, t.parent ? tIndex.get(t.parent) : -1, bits, t.d, rMask(f.region)];
    if (o.notes) row.push(t.note);
    return row;
  });

  const file = {
    v: 1, lang: P.lang, lib: { version: P.lib.version, modified: P.lib.modified }, generated: new Date().toISOString(),
    options: o, regions, posNames: POS, typeNames: TYPES, themeBits: THEME_BITS, entryBits: ENTRY_BITS,
    themeFields: ['id', 'name', 'parent', 'flags', 'difficulty', 'regions'].concat(o.notes ? ['note'] : []),
    themes: themeRows,
    // entries are columns: entry i is text[i], pos[i] ... ; its themes are the next linkCount[i] pairs (themeIndex, rating) in `links`.
    // root[i] is 0 for a root entry, else the index+1 of the root it is an alias of.
    entries: cols,
  };
  return { file, report };
}

export async function sizeOf(text) {
  const raw = new Blob([text]).size;
  let gz = null;
  if (typeof CompressionStream !== 'undefined') {
    const s = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
    gz = (await new Response(s).blob()).size;
  }
  return { raw, gz };
}
