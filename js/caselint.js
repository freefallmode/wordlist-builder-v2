// Capital letters of shown words. One rule: a word is shown the way it is correctly written for the sense it has in the theme.
// A capital is for a proper noun (person, place, org, title, proper; trademarks), an acronym or a letter-shaped term (GI, MIDI, X-ray, T-bar); everything else is lowercase.
// The game shows words in lowercase while playing, so this only appears on a finished theme, but there every mismatch shows.
// Returns issues { kind, msg, themeId, entryId }; the kinds are listed below. Used by validate() and by the export (count printed).
import { themeLocked } from './model.js';

const PROPER = new Set(['person', 'place', 'org', 'title', 'proper']);
const isProper = e => PROPER.has(e.type) || !!e.tm;
const startsCap = s => /^\p{Lu}/u.test(s);
const initialism = s => /^\p{Lu}{2,}[a-z]?$/u.test(s) || /^\p{L}-\p{L}/u.test(s) && /^\p{Lu}-/u.test(s) || /^\p{Lu}[\d-]/u.test(s);   // GI, MIDI, MPs, X-ray, T-bar, B6
const norm = s => s.toLowerCase();

export function caseLint(P) {
  const out = [], ix = P.ix;
  const add = (kind, msg, t, e) => out.push({ kind, msg, themeId: t && t.id, entryId: e && e.id });
  const byText = new Map();
  for (const e of P.entries) if (!e.aliasOf) { const k = norm(e.text); if (!byText.has(k)) byText.set(k, []); byText.get(k).push(e); }
  const hasUkAlias = new Map();
  for (const a of P.entries) if (a.aliasOf && (a.aliasKind === 'regional' || a.aliasKind === 'spelling') && a.region && a.region.length) hasUkAlias.set(a.aliasOf, true);
  for (const t of P.themes) {
    if (t.group) continue;
    const members = (ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf);
    if (!members.length) continue;
    const textOf = e => (e.show && e.show[t.id]) || e.text;
    const caps = members.filter(e => startsCap(textOf(e))).length, share = caps / members.length;
    const wordplay = t.tkind === 'wordplay' || t.tkind === 'compound' || themeLocked(P, t);
    for (const e of members) {
      const shown = textOf(e), cap = startsCap(shown), sh = e.show && e.show[t.id];
      // 1. the capital disagrees with the entry's own proper/common mark
      if (!initialism(shown)) {
        if (cap && !isProper(e) && e.type !== 'acronym' && e.type !== 'phrase' && !(sh && startsCap(e.text) === false && false)) add('cap-common', `"${shown}" is shown with a capital in "${t.name}" but "${e.text}" is not marked as a proper noun (type ${e.type}).`, t, e);
        if (!cap && startsCap(e.text) && isProper(e) && !wordplay && members.length >= 8 && share >= 0.8) add('lower-proper', `"${shown}" is shown lowercase in "${t.name}" but "${e.text}" is a ${e.type || 'trademark'} name.`, t, e);
      }
      // 2. wrong sense: a proper entry in a theme of common words (or the reverse) while an entry of the same spelling with the other mark exists
      if (members.length >= 8 && !wordplay) {
        const twins = (byText.get(norm(e.text)) || []).filter(x => x !== e && x.text !== e.text);
        if (isProper(e) && share <= 0.2 && twins.some(x => !isProper(x))) add('sense-proper', `"${e.text}" (${e.type || 'trademark'}) is linked in "${t.name}", a theme of common words, and a common entry with the same spelling exists.`, t, e);
        if (!isProper(e) && share >= 0.8 && twins.some(x => isProper(x))) add('sense-common', `"${e.text}" is linked in "${t.name}", a theme of names, and a proper entry with the same spelling exists.`, t, e);
      }
      // 3. a shown text that only changes the case, where it does harm
      if (sh && norm(sh) === norm(e.text) && sh !== e.text) {
        if (t.tkind === 'wordplay' || t.tkind === 'compound') add('case-shown-wordplay', `"${e.text}" has a case-only shown text "${sh}" in "${t.name}", a wordplay/compound theme (the game reads a shown text there as a leftover part).`, t, e);
        if (hasUkAlias.get(e.id)) add('case-shown-alias', `"${e.text}" has a case-only shown text "${sh}" in "${t.name}" but also a regional/spelling alias (British players would lose it).`, t, e);
      }
    }
  }
  // 4. a bare capitalised single word (not proper) in a theme, with "<word> <theme word>" existing as another entry not linked to the theme
  const stem = w => w.replace(/ies$/, 'y').replace(/s$/, '');
  const STOP = new Set(['and', 'of', 'the', 'in', 'for', 'with', 'things', 'kinds', 'types', 'words', 'names', 'a', 'to']);
  for (const e of P.entries) {
    if (e.aliasOf || isProper(e) || e.type === 'acronym' || /\s/.test(e.text) || !startsCap(e.text) || initialism(e.text) || !e.typ) continue;
    for (const tid of Object.keys(e.typ)) {
      const t = ix.theme.get(tid); if (!t || t.group || e.show?.[tid]) continue;
      const ws = t.name.toLowerCase().split(/[^a-z]+/).filter(w => w && !STOP.has(w));
      for (const w of ws) for (const s of [w, stem(w)]) for (const c of [norm(e.text) + ' ' + s]) { const f = (byText.get(c) || []).find(x => !(x.typ && x.typ[tid] != null)); if (f) { add('bare-stub', `"${e.text}" is a bare capitalised word in "${t.name}" and the full term "${f.text}" exists but is not linked there.`, t, e); break; } }
    }
  }
  return out;
}
