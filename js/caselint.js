// Capital letters of shown words. One rule: a word is shown the way it is correctly written for the sense it has in the theme.
// A capital is for a proper noun (person, place, org, title, proper; trademarks), an acronym or a letter-shaped term (GI, MIDI, X-ray, T-bar); everything else is lowercase.
// The game shows words in lowercase while playing, so this only appears on a finished theme, but there every mismatch shows.
// Returns issues { kind, msg, themeId, entryId }; the kinds are listed below. validate() adds each as a warning of kind `case-<kind>`; the export prints the count.
import { themeLocked } from './model.js';
import { CASE_OK } from './caselint-allow.js';
import { PROPER_WORDS, LOWER_OK, STYLE_WORDS } from './caselint-words.js';

const PROPER = new Set(['person', 'place', 'org', 'title', 'proper']);
const isProper = e => PROPER.has(e.type) || !!e.tm;
const startsCap = s => /^\p{Lu}/u.test(s);
export const initialism = s => /^\p{Lu}{2,}[a-z]?$/u.test(s) || /^\p{L}-\p{L}/u.test(s) && /^\p{Lu}-/u.test(s) || /^\p{Lu}[\d-]/u.test(s);   // GI, MIDI, MPs, X-ray, T-bar, B6
const norm = s => s.toLowerCase();

export function caseLint(P) {
  const out = [], ix = P.ix;
  const add = (kind, msg, t, e) => !(e && t && CASE_OK.has(e.id + '|' + t.id)) && out.push({ kind, msg, themeId: t && t.id, entryId: e && e.id });
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
    const properShare = members.filter(isProper).length / members.length;
    const styleTheme = /\b(styles?|movements?|genres?)$/i.test(t.name);
    for (const e of members) {
      const shown = textOf(e), cap = startsCap(shown), sh = e.show && e.show[t.id];
      // 1. the capital disagrees with the entry's own proper/common mark
      if (!initialism(shown)) {
        if (cap && !isProper(e) && e.type !== 'acronym' && e.type !== 'phrase') add('cap-common', `"${shown}" is shown with a capital in "${t.name}" but "${e.text}" is not marked as a proper noun (type ${e.type}).`, t, e);
        if (!cap && startsCap(e.text) && isProper(e) && !wordplay && members.length >= 8 && share >= 0.8) add('lower-proper', `"${shown}" is shown lowercase in "${t.name}" but "${e.text}" is a ${e.type || 'trademark'} name.`, t, e);
      }
      // 1b. the style rule: a style or movement name is lowercase unless its word is only ever a name (gothic, baroque, art deco; but Victorian, Tudor)
      if (styleTheme && cap && STYLE_WORDS.has(norm(shown.split(/\s+/)[0]))) add('style-capital', `"${shown}" is shown with a capital in "${t.name}", but "${norm(shown.split(/\s+/)[0])}" is lowercase as the name of a style or movement (js/caselint-words.js, STYLE_WORDS; allow the link if the capital is intended).`, t, e);
      // 2. wrong sense: a proper entry in a theme of common words (or the reverse) while an entry of the same spelling with the other mark exists
      if (members.length >= 8 && !wordplay) {
        const twins = (byText.get(norm(e.text)) || []).filter(x => x !== e && x.text !== e.text);
        if (isProper(e) && share <= 0.2 && twins.some(x => !isProper(x))) add('sense-proper', `"${e.text}" (${e.type || 'trademark'}) is linked in "${t.name}", a theme of common words, and a common entry with the same spelling exists.`, t, e);
        if (!isProper(e) && share >= 0.8 && twins.some(x => isProper(x))) add('sense-common', `"${e.text}" is linked in "${t.name}", a theme of names, and a proper entry with the same spelling exists.`, t, e);
      }
      // 2c. the same entry shown lowercase (case-only) in one theme and capitalised in another
      if (!sh && startsCap(e.text) && e.show && Object.entries(e.show).some(([k, v]) => v !== e.text && norm(v) === norm(e.text) && !startsCap(v) && k !== t.id && !/phonetic alphabet/i.test(ix.theme.get(k)?.name || ''))) add('case-split', `"${e.text}" is shown lowercase in another theme but capitalised in "${t.name}": type the entry common and lowercase it, or allow the link.`, t, e);
      // 3. a shown text that only changes the case, where it does harm
      if (sh && norm(sh) === norm(e.text) && sh !== e.text) {
        if (t.tkind === 'wordplay' || t.tkind === 'compound') add('case-shown-wordplay', `"${e.text}" has a case-only shown text "${sh}" in "${t.name}", a wordplay/compound theme (the game reads a shown text there as a leftover part).`, t, e);
        if (hasUkAlias.get(e.id)) add('case-shown-alias', `"${e.text}" has a case-only shown text "${sh}" in "${t.name}" but also a regional/spelling alias (players in that region would lose it).`, t, e);
      }
    }
  }
  // 2b. a common entry in a theme of names: nameThemeCommons() below
  for (const [t, e, share] of nameThemeCommons(P)) add('common-in-names', `"${e.text}" is a common word in "${t.name}", a theme of names (${Math.round(share * 100)}% proper).`, t, e);
  // 4. a bare capitalised single word (not proper) in a theme, with "<word> <theme word>" existing as another entry not linked to the theme
  const stems = w => new Set([w, w.replace(/s$/, ''), w.replace(/ies$/, 'y')]);   // pies -> pie, berries -> berry
  const STOP = new Set(['and', 'of', 'the', 'in', 'for', 'with', 'things', 'kinds', 'types', 'words', 'names', 'a', 'to']);
  for (const e of P.entries) {
    if (e.aliasOf || isProper(e) || e.type === 'acronym' || /\s/.test(e.text) || !startsCap(e.text) || initialism(e.text) || !e.typ) continue;
    for (const tid of Object.keys(e.typ)) {
      const t = ix.theme.get(tid); if (!t || t.group || e.show?.[tid]) continue;
      const ws = t.name.toLowerCase().split(/[^a-z]+/).filter(w => w && !STOP.has(w));
      stub: for (const w of ws) for (const s of stems(w)) { const f = (byText.get(norm(e.text) + ' ' + s) || []).find(x => !(x.typ && x.typ[tid] != null)); if (f) { add('bare-stub', `"${e.text}" is a bare capitalised word in "${t.name}" and the full term "${f.text}" exists but is not linked there.`, t, e); break stub; } }   // one issue per link
    }
  }
  // 5. a lowercase entry typed common or phrase that contains a word always written with a capital (french fries, yorkshire terrier): by entry, not by link
  for (const e of P.entries) {
    if ((e.type !== 'common' && e.type !== 'phrase') || LOWER_OK.has(e.id) || /\p{Lu}/u.test(e.text)) continue;
    const ws = properWordsIn(e.text);
    if (ws.length) add('lower-proper-word', `"${e.text}" is lowercase and typed ${e.type} but "${ws[0]}" is written with a capital: capitalise it and type the entry proper, or list the entry in LOWER_OK (js/caselint-words.js) if the word is not a name here.`, null, e);
  }
  return out;
}

// the words of a phrase (two or more words) that are in PROPER_WORDS, lowercase
export function properWordsIn(text) {
  const ws = text.toLowerCase().split(/[\s/]+/).map(w => w.replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, '')).filter(Boolean);
  return ws.length < 2 ? [] : ws.filter(w => PROPER_WORDS.has(w));
}

// themes whose title says "names" and whose members are almost all proper: [theme, entry, proper share] for each member that is a common word
export function nameThemeCommons(P) {
  const res = [];
  for (const t of P.themes) {
    if (t.group || !/\bnames?\b/i.test(t.name)) continue;
    const ms = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf); if (ms.length < 8) continue;
    const share = ms.filter(e => isProper(e)).length / ms.length; if (share < 0.8) continue;
    for (const e of ms) if (!isProper(e) && e.type !== 'acronym' && e.type !== 'phrase') res.push([t, e, share]);
  }
  return res;
}
