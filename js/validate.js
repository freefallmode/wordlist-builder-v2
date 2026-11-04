// Checks over the whole project. Returns issues { sev: 'error' | 'warn' | 'info', kind, msg, themeId?, entryId? }.
// Errors break the model (a duplicate, a broken alias); warnings are probably mistakes; info is work still to do.
import { eff, effRec, linkIds, themeStats, pathOf, sameText, ALIAS_KINDS } from './model.js';
import { zipf, freqLoaded, fold } from './freq.js';

// A word of the theme's name inside an entry's text ("soup" in "tomato soup" under "soups") gives the theme away. Themes marked nameOk (wordplay, where the shared word is the point) are skipped.
const NAME_STOP = new Set(('a an and or the of in on at to for from with by as is are that this these those your my our their its words word names name types type kinds kind famous common things thing parts part ' +
  'varieties variety styles style ways way terms term items item sorts sort different all some other about into over under more most not no blank').split(/\s+/));
const nameStem = w => w.length > 4 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 4 && /(ches|shes|sses|xes)$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w;
const nameToks = s => (s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').match(/[a-z]+/g) || []);
export const themeNameWords = t => [...new Set(nameToks(t.name).filter(w => w.length > 2 && !NAME_STOP.has(w)).map(nameStem))];
// A single word that IS the thing the theme collects does not give it away: `pants` in pants and shorts, `bug` in garden bugs. The collected things are the last word of the name or of each part of "A and B" / "A, B" (not `police` in police words or `water` in water park). Longer text (cotton candy, tomato soup) still counts as a leak.
const collected = t => new Set(t.name.toLowerCase().split(/\s+and\s+|\s*[,&/]\s*/).map(p => nameToks(p).pop()).filter(w => w && w.length > 2 && !NAME_STOP.has(w)).map(nameStem));
// True when the text shown in the theme is just a word of the theme name (or its singular/plural): `snake` in "snakes", `red` in "shades of red". The leak check lets some of these through (the thing the theme collects); the export flags them so the game can leave them out.
export const isNameWord = (t, text) => { const ts = nameToks(text).map(nameStem); return ts.length === 1 && themeNameWords(t).includes(ts[0]); };
export function nameLeak(t, e, words = themeNameWords(t)) {
  if (t.nameOk || !words.length || (e.nameOkIn || []).includes(t.id)) return null;
  const ts = nameToks(e.text).map(nameStem);
  if (ts.length === 1 && collected(t).has(ts[0])) return null;
  return words.find(k => ts.includes(k)) || null;
}

const words = s => s.trim().split(/\s+/).length;
const letters = s => s.replace(/[^\p{L}\p{N}]/gu, '').length;
const label = e => e.text + (e.gloss ? ` (${e.gloss})` : '');

export function validate(P) {
  const out = [];
  const add = (sev, kind, msg, extra = {}) => out.push({ sev, kind, msg, ...extra });
  const S = P.settings, minWords = S.minWords || 4;
  const ix = P.ix;

  // ----- themes -----
  let unrated = 0;
  for (const t of P.themes) {
    const ef = eff(P, t.id);
    if (!ef.enabled) continue;
    const direct = (ix.byTheme.get(t.id) || []);
    if (t.group) {
      if (direct.length) add('warn', 'group-words', `"${t.name}" is a group (a folder) but has ${direct.length} words linked to it.`, { themeId: t.id });
      continue;
    }
    const st = themeStats(P, t.id);
    if (!t.pop) { if (st.entries) add('warn', 'theme-unrated', `"${t.name}" has words but no theme popularity.`, { themeId: t.id }); else unrated++; }
    if (st.roots === 0) add('info', 'empty', `"${t.name}" has no words yet.`, { themeId: t.id });
    else if (st.roots < minWords) add(t.complete ? 'error' : 'warn', 'thin', `"${t.name}" has ${st.roots} distinct word${st.roots === 1 ? '' : 's'}; a theme needs at least ${minWords}.`, { themeId: t.id });
    if (!t.nameOk) { const ws = themeNameWords(t); for (const e of direct) { const w = nameLeak(t, e.show?.[t.id] ? { ...e, text: e.show[t.id] } : e, ws); if (w) add('warn', 'theme-name', `"${e.text}" contains "${w}" from its theme name "${t.name}", which gives the theme away.`, { themeId: t.id, entryId: e.id }); } }
    for (const g of t.groups || []) {   // synonym groups: at most one member per level
      const mem = g.map(id => ix.entry.get(id));
      if (g.length < 2) add('warn', 'group-small', `A synonym group in "${t.name}" has fewer than two members.`, { themeId: t.id });
      for (const [i, e] of mem.entries()) if (!e || e.aliasOf || !(e.th[t.id] !== undefined)) add('warn', 'group-member', `Synonym group member ${g[i]} in "${t.name}" is not a word of that theme.`, { themeId: t.id });
    }
    const shownAs = new Map();   // two words that read the same in one theme cannot both be placed
    for (const e of direct) { if (e.aliasOf) continue; const x = fold(e.show?.[t.id] || P.ix.entry.get(e.use?.[t.id])?.text || e.text); if (shownAs.has(x)) add('info', 'same-display', `"${e.text}" and "${shownAs.get(x)}" both show as "${x}" in "${t.name}"; the export keeps the more popular one.`, { themeId: t.id, entryId: e.id }); else shownAs.set(x, e.text); }
    const fam = new Map();   // an alias family (a root and its aliases) may have only one member linked in a theme
    for (const e of direct) { if (e.th[t.id] === undefined) continue; const r = e.aliasOf || e.id; if (!fam.has(r)) fam.set(r, []); fam.get(r).push(e); }
    for (const [r, es] of fam) if (es.length > 1) add('warn', 'family-twice', `"${es.map(e => e.text).join('" and "')}" are the same word (one alias family) and both linked in "${t.name}"; keep one.`, { themeId: t.id, entryId: es[0].id });
    if (t.complete && st.roots >= minWords && !t.note) add('info', 'complete-note', `"${t.name}" is complete but has no note listing the exact members.`, { themeId: t.id });
  }
  if (unrated) add('info', 'theme-unrated', `${unrated} empty themes have no theme popularity yet.`);

  // ----- overlap: one word inside another in the same theme (cola / Coca-Cola, pasta / pasta sauce) -----
  const toks = s => s.toLowerCase().match(/[a-z0-9]+/g) || [];
  const hasRun = (big, small) => { for (let i = 0; i + small.length <= big.length; i++) if (small.every((w, j) => big[i + j] === w)) return true; return false; };
  for (const t of P.themes) {
    if (t.group || !eff(P, t.id).enabled) continue;
    const list = (ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.enabled).map(e => ({ e, w: toks(e.show?.[t.id] || e.text) })).filter(x => x.w.length);
    const grouped = new Map(); for (const g of t.groups || []) for (const id of g) grouped.set(id, g);
    for (const a of list) for (const b of list) {
      if (a.w.length >= b.w.length || !hasRun(b.w, a.w) || grouped.get(a.e.id) === grouped.get(b.e.id) && grouped.has(a.e.id)) continue;
      add('info', 'overlap', `"${t.name}" lists both "${a.e.show?.[t.id] || a.e.text}" and "${b.e.show?.[t.id] || b.e.text}". Same thing, a subtype, or a brand of it? Merge, move the brand out, group, or make a sub-theme.`, { themeId: t.id, entryId: b.e.id });
    }
  }

  // ----- entries -----
  const seen = new Map();
  for (const e of P.entries) {
    const loc = { entryId: e.id };
    const text = e.text.trim();
    if (!text) { add('error', 'empty-text', `Entry ${e.id} has no text.`, loc); continue; }
    if (text !== e.text) add('warn', 'spaces', `"${e.text}" has spaces at the start or end.`, loc);
    const key = text.toLowerCase() + '|' + (e.gloss || '').toLowerCase();
    if (seen.has(key)) add('error', 'duplicate', `"${label(e)}" appears twice (entries ${seen.get(key)} and ${e.id}).`, loc); else seen.set(key, e.id);

    const same = sameText(P, text);
    if (same.length > 1 && !e.gloss) add('error', 'needs-gloss', `"${text}" has ${same.length} entries; each needs a short meaning/context to tell them apart.`, loc);
    if (same.length > 1) {
      for (const o of same) if (o.id > e.id && o.pos === e.pos && !e.aliasOf && !o.aliasOf && shares(P, e, o))
        add('warn', 'maybe-duplicate', `"${label(e)}" and "${label(o)}" have the same part of speech and share a theme: one entry or two meanings?`, loc);
    }
    if (words(text) > (S.maxWords || 4)) add('warn', 'long', `"${text}" has more than ${S.maxWords || 4} words.`, loc);
    if (e.type === 'phrase' && /^[A-ZÀ-Ý]/.test(text)) add('warn', 'type', `"${text}" is typed phrase but looks like a name; use person, place, org, title or proper (phrase is for ordinary expressions).`, loc);
    if (letters(text) > (S.maxLen || 20)) add('warn', 'long', `"${text}" is longer than ${S.maxLen || 20} letters.`, loc);

    if (e.type === 'acronym' && text !== text.toUpperCase()) add('warn', 'case', `"${text}" is typed as an acronym but is not in capitals.`, loc);
    if (['person', 'place', 'org', 'title', 'proper'].includes(e.type) && !/\p{Lu}|^\d/u.test(text)) add('warn', 'case', `"${text}" is a ${e.type} name but has no capital letter.`, loc);
    if (e.type === 'common' && /^\p{Lu}/u.test(text) && !/^\p{Lu}+$/u.test(text) && !e.aliasOf) add('info', 'case', `"${text}" is typed as a common word but starts with a capital.`, loc);

    const ids = linkIds(P, e);
    if (e.aliasOf) {
      const r = ix.entry.get(e.aliasOf);
      if (!r) add('error', 'alias-missing', `"${label(e)}" is an alias of entry ${e.aliasOf}, which does not exist.`, loc);
      else {
        if (r.aliasOf) add('error', 'alias-chain', `"${label(e)}" is an alias of "${label(r)}", which is itself an alias. Point it at the root.`, loc);
        if (r.id === e.id) add('error', 'alias-self', `"${label(e)}" is an alias of itself.`, loc);
        if (r.text.toLowerCase() === text.toLowerCase()) add('warn', 'alias-same', `"${label(e)}" has the same text as its root.`, loc);
        if (e.aliasKind && !ALIAS_KINDS.includes(e.aliasKind)) add('warn', 'alias-kind', `Alias "${label(e)}" has an unknown kind (${e.aliasKind}).`, loc);
        if (!e.aliasKind) add('warn', 'alias-kind', `Alias "${label(e)}" has no kind (synonym, spelling, form, regional, abbreviation or translation).`, loc);
        if (e.aliasKind === 'form' && (e.nameOkIn || []).length && text.length > r.text.length && text.toLowerCase().includes(r.text.toLowerCase())) add('info', 'alias-fullname', `"${label(e)}" is kept as a form of "${label(r)}" but is a longer name: make it an entry of its own and give the theme a shown text (show).`, loc);
        if (e.aliasKind === 'regional' && !e.region.length) add('info', 'alias-region', `Regional alias "${label(e)}" has no region (UK, AU ...).`, loc);
      }
      if ((e.aliasKind === 'spelling' || e.aliasKind === 'form') && Object.keys(e.th).length) add('warn', 'alias-link-kind', `"${label(e)}" is a ${e.aliasKind} alias with links of its own; only regional, synonym, abbreviation and translation aliases can be linked on their own.`, loc);
    } else if (!ids.length) add('info', 'orphan', `"${label(e)}" is not linked to any theme.`, loc);

    for (const tid of ids) {
      const t = ix.theme.get(tid);
      if (!t) { add('error', 'bad-theme', `"${label(e)}" is linked to a theme that no longer exists (${tid}).`, loc); continue; }
      if (t.group) add('warn', 'link-group', `"${label(e)}" is linked to "${t.name}", which is a group.`, loc);
      if (fold(t.name) === fold(text)) add('warn', 'is-theme-name', `"${text}" is the name of the theme it is in ("${t.name}").`, loc);
    }
    for (const [tid, v] of Object.entries(e.th)) if (!Number.isInteger(v) || v < 0 || v > 5) add('error', 'bad-rating', `"${label(e)}" has a typicality of ${JSON.stringify(v)} in ${tid}; it must be 0 to 5.`, loc);
    for (const [tid, txt] of Object.entries(e.show || {})) if (!ids.includes(tid) || !String(txt).trim()) add('warn', 'show-theme', `"${label(e)}" has a display text for ${tid}, which it is not in (or the text is empty).`, loc);
    for (const [tid, aid] of Object.entries(e.use || {})) {
      const a = ix.entry.get(aid);
      if (!ids.includes(tid)) add('warn', 'use-theme', `"${label(e)}" names a display form for ${tid}, which it is not in.`, loc);
      if (!a || a.aliasOf !== e.id || a.aliasKind !== 'form') add('warn', 'use-form', `"${label(e)}" shows entry ${aid} in ${tid}, which is not one of its forms.`, loc);
    }
    if (!e.rec && e.enabled) add('info', 'unrated', `"${label(e)}" has no familiarity rating.`, loc);

    if (freqLoaded() && P.lang === 'en' && e.type === 'common' && e.rec && !e.aliasOf) {
      const z = zipf(text);
      // Frequency in text undersells concrete everyday nouns (igloo, tuba, feta sit near Zipf 2.7), so only very rare words are a warning.
      if (e.rec <= 2 && z != null && z < 2.3) add('warn', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.rec} (easy) but is rare in text (Zipf ${z.toFixed(1)}). Check the familiarity.`, loc);
      else if (e.rec <= 2 && z != null && z < 3) add('info', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.rec} (easy) and is fairly rare in text (Zipf ${z.toFixed(1)}).`, loc);
      if (e.rec <= 2 && z === null) add('warn', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.rec} (easy) but is not in the frequency list.`, loc);
      if (e.rec >= 4 && z != null && z > 5) add('info', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.rec} (hard) but is very common in text (Zipf ${z.toFixed(1)}).`, loc);
    }
  }
  return out;
}

function shares(P, a, b) {
  const x = new Set(linkIds(P, a));
  return linkIds(P, b).some(t => x.has(t));
}

export const SEV_ORDER = { error: 0, warn: 1, info: 2 };
