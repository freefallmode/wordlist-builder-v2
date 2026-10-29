// Checks over the whole project. Returns issues { sev: 'error' | 'warn' | 'info', kind, msg, themeId?, entryId? }.
// Errors break the model (a duplicate, a broken alias); warnings are probably mistakes; info is work still to do.
import { eff, effRec, linkIds, themeStats, pathOf, sameText } from './model.js';
import { zipf, freqLoaded, fold } from './freq.js';

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
    if (!t.d) { if (st.entries) add('warn', 'theme-unrated', `"${t.name}" has words but no difficulty rating.`, { themeId: t.id }); else unrated++; }
    if (st.roots === 0) add('info', 'empty', `"${t.name}" has no words yet.`, { themeId: t.id });
    else if (st.roots < minWords) add(t.complete ? 'error' : 'warn', 'thin', `"${t.name}" has ${st.roots} distinct word${st.roots === 1 ? '' : 's'}; a theme needs at least ${minWords}.`, { themeId: t.id });
    if (t.complete && st.roots >= minWords && !t.note) add('info', 'complete-note', `"${t.name}" is complete but has no note listing the exact members.`, { themeId: t.id });
  }
  if (unrated) add('info', 'theme-unrated', `${unrated} empty themes have no difficulty rating yet.`);

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
    if (words(text) > (S.maxWords || 3) && e.type !== 'phrase') add('warn', 'long', `"${text}" has more than ${S.maxWords || 3} words.`, loc);
    if (letters(text) > (S.maxLen || 20)) add('warn', 'long', `"${text}" is longer than ${S.maxLen || 20} letters.`, loc);

    if (e.type === 'acronym' && text !== text.toUpperCase()) add('warn', 'case', `"${text}" is typed as an acronym but is not in capitals.`, loc);
    if (['person', 'place', 'org', 'title', 'proper'].includes(e.type) && !/\p{Lu}/u.test(text)) add('warn', 'case', `"${text}" is a ${e.type} name but has no capital letter.`, loc);
    if (e.type === 'common' && /^\p{Lu}/u.test(text) && !/^\p{Lu}+$/u.test(text) && !e.aliasOf) add('info', 'case', `"${text}" is typed as a common word but starts with a capital.`, loc);

    const ids = linkIds(P, e);
    if (e.aliasOf) {
      const r = ix.entry.get(e.aliasOf);
      if (!r) add('error', 'alias-missing', `"${label(e)}" is an alias of entry ${e.aliasOf}, which does not exist.`, loc);
      else {
        if (r.aliasOf) add('error', 'alias-chain', `"${label(e)}" is an alias of "${label(r)}", which is itself an alias. Point it at the root.`, loc);
        if (r.id === e.id) add('error', 'alias-self', `"${label(e)}" is an alias of itself.`, loc);
        if (r.text.toLowerCase() === text.toLowerCase()) add('warn', 'alias-same', `"${label(e)}" has the same text as its root.`, loc);
        if (!e.aliasKind) add('warn', 'alias-kind', `Alias "${label(e)}" has no kind (synonym or spelling).`, loc);
        if (e.aliasKind === 'spelling' && !e.region.length) add('info', 'alias-region', `Spelling alias "${label(e)}" has no region (US, UK ...).`, loc);
      }
    } else if (!ids.length) add('info', 'orphan', `"${label(e)}" is not linked to any theme.`, loc);

    for (const tid of ids) {
      const t = ix.theme.get(tid);
      if (!t) { add('error', 'bad-theme', `"${label(e)}" is linked to a theme that no longer exists (${tid}).`, loc); continue; }
      if (t.group) add('warn', 'link-group', `"${label(e)}" is linked to "${t.name}", which is a group.`, loc);
      if (fold(t.name) === fold(text)) add('warn', 'is-theme-name', `"${text}" is the name of the theme it is in ("${t.name}").`, loc);
    }
    if (!e.rec && e.enabled) add('info', 'unrated', `"${label(e)}" has no recognisability rating.`, loc);

    if (freqLoaded() && P.lang === 'en' && e.type === 'common' && e.rec && !e.aliasOf) {
      const z = zipf(text);
      // Frequency in text undersells concrete everyday nouns (igloo, tuba, feta sit near Zipf 2.7), so only very rare words are a warning.
      if (e.rec <= 2 && z != null && z < 2.3) add('warn', 'rating-vs-zipf', `"${label(e)}" is rated ${e.rec} (easy) but is rare in text (Zipf ${z.toFixed(1)}). Check the rating.`, loc);
      else if (e.rec <= 2 && z != null && z < 3) add('info', 'rating-vs-zipf', `"${label(e)}" is rated ${e.rec} (easy) and is fairly rare in text (Zipf ${z.toFixed(1)}).`, loc);
      if (e.rec <= 2 && z === null) add('warn', 'rating-vs-zipf', `"${label(e)}" is rated ${e.rec} (easy) but is not in the frequency list.`, loc);
      if (e.rec >= 4 && z != null && z > 5) add('info', 'rating-vs-zipf', `"${label(e)}" is rated ${e.rec} (hard) but is very common in text (Zipf ${z.toFixed(1)}).`, loc);
    }
  }
  return out;
}

function shares(P, a, b) {
  const x = new Set(linkIds(P, a));
  return linkIds(P, b).some(t => x.has(t));
}

export const SEV_ORDER = { error: 0, warn: 1, info: 2 };
