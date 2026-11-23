// Checks over the whole project. Returns issues { sev: 'error' | 'warn' | 'info', kind, msg, themeId?, entryId? }.
// Errors break the model (a duplicate, a broken alias); warnings are probably mistakes; info is work still to do.
import { eff, linkIds, themeStats, sameText, themeLocked, ruleTheme, parseRule, displayKey, isAncestor, plainText, themeDifficulty, themeProfile, ALIAS_KINDS, POS, TYPES } from './model.js';
import { zipf, freqLoaded, fold } from './freq.js';
import { caseLint, initialism } from './caselint.js';
import { familyPairs, clashGroups, CLASH_SOFT, CLASH_MAX } from './family.js';
import { FAMILY_OK } from './family-allow.js';
import { SENSE_OK } from './sense-allow.js';
import { THEME_TWIN_OK } from './theme-twin-allow.js';
import { offensiveMatch, offensiveWord } from './offensive.js';
import { OFFENSIVE_OK } from './offensive-allow.js';

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
const isRating = v => Number.isInteger(v) && v >= 1 && v <= 5;   // pop, ident, fam, typ: 1 to 5

// A theme named for words in another language (numbers in german, swahili words, days of the week in french) should carry the foreign flag.
// Loanword themes (french phrases in english, words from french) are English and are left alone.
const LANGS = 'french|german|spanish|italian|japanese|chinese|mandarin|cantonese|latin|korean|russian|arabic|portuguese|dutch|swedish|norwegian|danish|finnish|polish|turkish|greek|hindi|urdu|bengali|hebrew|yiddish|welsh|irish|gaelic|swahili|zulu|maori|hawaiian|thai|vietnamese|tagalog|persian|farsi|sanskrit|esperanto';
const FOREIGN_OK = /\b(in english|words from|from other languages|speaking|languages?|letters?|cities|food|painters|writers|kings|gods|myth|cars?)\b/i;
export const foreignListName = name => !FOREIGN_OK.test(name) && new RegExp(String.raw`\bin (${LANGS})\b|\b(${LANGS}) (everyday |basic )?(words|phrases|numbers|colou?rs|greetings|vocabulary)\b`, 'i').test(name);

export const THEME_NAME_SOFT = 24, THEME_NAME_MAX = 30;   // theme name length (DESIGN-entries.md): soft = two lines in the game's narrowest column, hard = the check warns above it
// Distinct concepts of a theme that are not offensive: an alias family counts when one of its enabled members is not offensive.
function cleanRoots(P, tid) {
  const s = new Set();
  for (const e of P.ix.byTheme.get(tid) || []) if (e.enabled && !e.offensive) s.add(e.aliasOf || e.id);
  return s.size;
}

// Offensive words (DESIGN-entries.md 3.8; list js/offensive-words.js, allow list js/offensive-allow.js).
// offensive-word (warn): an entry whose text contains a list word, not flagged and not allowed: flag it, delete it (a crude, vulgar or slur meaning), or allow it (a harmless phrase, Simon's approval).
// offensive-theme (warn): a theme name with a list word, and the theme not offensive.
// offensive-unlisted (info): a flagged entry with no list word: right when it is a judgement (a phrase); else add the word to the list.
function offensiveChecks(P, add) {
  for (const e of P.entries) {
    const w = offensiveMatch(e);
    if (w && !e.offensive && !OFFENSIVE_OK.has(e.id)) add('warn', 'offensive-word', `"${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''}" contains the offensive word "${w}" but is not flagged offensive: flag it, delete it if this meaning is crude, vulgar or a slur, or (a harmless phrase, with Simon's approval) add it to js/offensive-allow.js.`, { entryId: e.id });
    else if (!w && e.offensive) add('info', 'offensive-unlisted', `"${e.text}" is flagged offensive but contains no word of the offensive list (js/offensive-words.js): add the word there if it is offensive wherever it appears.`, { entryId: e.id });
  }
  for (const t of P.themes) {
    const w = offensiveWord(t.name);
    if (w && !eff(P, t.id).offensive) add('warn', 'offensive-theme', `The theme name "${t.name}" contains the offensive word "${w}": flag the theme offensive (its words leave the default export with it) or rename it.`, { themeId: t.id });
  }
}

export function validate(P) {
  const out = [];
  const add = (sev, kind, msg, extra = {}) => out.push({ sev, kind, msg, ...extra });
  const S = P.settings, minWords = S.minWords || 4;
  const ix = P.ix;

  // ----- the theme tree: ids unique, parents existing, no cycle (a cycle would break every inherited flag, so the other checks wait for the fix) -----
  { const ids = new Set(); let cycle = false;
    for (const t of P.themes) {
      if (ids.has(t.id)) add('error', 'theme-dup-id', `Two themes have the id ${t.id}.`, { themeId: t.id }); ids.add(t.id);
      if (t.parent && !ix.theme.get(t.parent)) add('error', 'theme-parent', `"${t.name}" has the parent ${t.parent}, which does not exist (the theme and its words drop out of the export).`, { themeId: t.id });
      for (let p = t.parent, n = 0; p; p = ix.theme.get(p)?.parent, n++) if (p === t.id || n > P.themes.length) { add('error', 'theme-parent', `"${t.name}" has a parent chain that loops (a theme inside itself).`, { themeId: t.id }); cycle = true; break; }
    }
    if (cycle) return out; }

  // ----- themes -----
  let unrated = 0;
  const aliasTexts = new Map();   // root id -> texts of its aliases (for the complete-set check)
  for (const e of P.entries) if (e.aliasOf) { if (!aliasTexts.has(e.aliasOf)) aliasTexts.set(e.aliasOf, []); aliasTexts.get(e.aliasOf).push(e.text); }
  for (const t of P.themes) {
    { const rt = ruleTheme(t); if (rt && !ix.theme.get(rt)) add('error', 'rule-theme', `"${t.name}" has the rule ${t.rule}, but there is no theme with the id ${rt}.`, { themeId: t.id }); }
    if (t.tkind === 'wordplay' || t.tkind === 'compound') { const pr = parseRule(t.rule); if (pr.state !== 'ok') add('error', 'rule-unknown', `"${t.name}" is a ${t.tkind} theme with ${t.rule ? `the rule "${t.rule}", which ${pr.state === 'bad' ? 'has a bad argument' : "is not in the game's grammar"}` : 'no rule'} (GAME-CONTRACT.md: palindrome, double-letters, homophone, onomatopoeia, anagram, no-vowels, roman, reversible, curated, rhyme:X, contains:X, compound-start:X, compound-end:X, starts:X, ends:X, hidden:@id): the game never plays it.`, { themeId: t.id }); }
    { const len = [...t.name].length; if (len > THEME_NAME_MAX) add('warn', 'theme-name-long', `The theme name "${t.name}" has ${len} characters; keep it to ${THEME_NAME_MAX} at most (aim for ${THEME_NAME_SOFT}).`, { themeId: t.id }); }
    const ef = eff(P, t.id);
    if (!ef.enabled) continue;
    const direct = (ix.byTheme.get(t.id) || []);
    if (t.group) {
      if (direct.length) add('warn', 'group-words', `"${t.name}" is a group (a folder) but has ${direct.length} words linked to it.`, { themeId: t.id });
      continue;
    }
    const st = themeStats(P, t.id);
    { const miss = [!isRating(t.pop) && 'popularity', !isRating(t.ident) && 'identifiability'].filter(Boolean);   // ratings: always all four (pop, ident, fam, typ), set in the batch that creates the theme, word or link
      if (miss.length && st.entries) add('error', 'theme-unrated', `"${t.name}" has words but no theme ${miss.join(' and no ')} (1-5).`, { themeId: t.id }); else if (!t.pop) unrated++; }
    if (!ef.foreign && foreignListName(t.name)) add('warn', 'foreign-flag', `"${t.name}" looks like a list of words in another language but is not flagged Foreign language; tick it if its words are mostly not English.`, { themeId: t.id });
    if (st.roots === 0) add('info', 'empty', `"${t.name}" has no words yet.`, { themeId: t.id });
    else { const n = ef.offensive ? st.roots : cleanRoots(P, t.id);   // offensive words do not count toward a theme's minimum (the export leaves them out by default; DESIGN-entries.md 3.8), unless the theme is offensive itself
      if (n < minWords) add('warn', 'thin', `"${t.name}" has ${n} distinct word${n === 1 ? '' : 's'}${n < st.roots ? ` that are not offensive (${st.roots} in all)` : ''}; a theme needs at least ${minWords}.`, { themeId: t.id }); }
    if (!t.nameOk) { const ws = themeNameWords(t); const locked = themeLocked(P, t); for (const e of direct) { if (locked && e.aliasOf && e.typ[t.id] === undefined) continue; const w = nameLeak(t, e.show?.[t.id] ? { ...e, text: e.show[t.id] } : e, ws); if (w) add('warn', 'theme-name', `"${e.text}" contains "${w}" from its theme name "${t.name}", which gives the theme away.`, { themeId: t.id, entryId: e.id }); } }
    for (const g of t.groups || []) {   // synonym groups: at most one member per level
      const mem = g.map(id => ix.entry.get(id));
      if (g.length < 2) add('warn', 'group-small', `A synonym group in "${t.name}" has fewer than two members.`, { themeId: t.id });
      for (const [i, e] of mem.entries()) {
        if (!e) add('error', 'group-missing', `Synonym group member ${g[i]} in "${t.name}" does not exist.`, { themeId: t.id });
        else if (e.aliasOf || e.typ[t.id] === undefined) add('warn', 'group-member', `Synonym group member ${g[i]} in "${t.name}" is not a word of that theme.`, { themeId: t.id });
      }
    }
    const shownAs = new Map();   // two words that read the same in one theme cannot both be placed: compared as the export compares them (model.js displayKey: own links only, enabled, lower-cased, accents kept)
    for (const e of direct) { if (!e.enabled || e.typ[t.id] === undefined) continue; const x = displayKey(P, e, t.id); if (shownAs.has(x)) add('info', 'same-display', `"${e.text}" and "${shownAs.get(x)}" both show as "${x}" in "${t.name}"; the export keeps the more popular one.`, { themeId: t.id, entryId: e.id }); else shownAs.set(x, e.text); }
    const fam = new Map();   // an alias family (a root and its aliases) may have only one member linked in a theme
    for (const e of direct) { if (e.typ[t.id] === undefined) continue; const r = e.aliasOf || e.id; if (!fam.has(r)) fam.set(r, []); fam.get(r).push(e); }
    for (const [r, es] of fam) if (es.length > 1) add('warn', 'family-twice', `"${es.map(e => e.text).join('" and "')}" are the same word (one alias family) and both linked in "${t.name}"; keep one.`, { themeId: t.id, entryId: es[0].id });
    if (t.complete) completeCheck(P, t, direct, aliasTexts, add);
  }
  if (unrated) add('info', 'theme-unrated-empty', `${unrated} empty themes have no theme popularity yet.`);

  // ----- overlap: one word inside another in the same theme (cola / Coca-Cola, pasta / pasta sauce) -----
  const toks = s => s.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];   // Unicode letters: kākā is one word, not k + k
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

  familyChecks(P, add);
  offensiveChecks(P, add);
  senseTwins(P, add);
  themeTwins(P, add);
  xwordsTwins(P, add);
  senseLinks(P, add);
  themeGaps(P, add);

  // ----- entries -----
  const seen = new Map();
  for (const e of P.entries) {
    const loc = { entryId: e.id };
    const text = e.text.trim();
    if (!text) { add('error', 'empty-text', `Entry ${e.id} has no text.`, loc); continue; }
    if (text !== e.text) add('warn', 'spaces', `"${e.text}" has spaces at the start or end.`, loc);
    if (!TYPES.includes(e.type)) add('error', 'bad-type', `"${text}" has type "${e.type}", which is not one of: ${TYPES.join(', ')} (the export writes -1).`, loc);
    if (!POS.includes(e.pos)) add('error', 'bad-pos', `"${text}" has part of speech "${e.pos}", which is not one of: ${POS.join(', ')} (the export writes -1).`, loc);
    const key = text.toLowerCase() + '|' + (e.gloss || '').toLowerCase();
    const famOf = x => x.aliasOf || x.id, dupOf = seen.has(key) ? ix.entry.get(seen.get(key)) : null;   // a root and its own alias with one text: alias-same reports it
    if (dupOf && famOf(dupOf) !== famOf(e)) add('error', 'duplicate', `"${label(e)}" appears twice (entries ${seen.get(key)} and ${e.id}).`, loc); else if (!dupOf) seen.set(key, e.id);

    const same = sameText(P, text), others = same.filter(o => o !== e && famOf(o) !== famOf(e));   // its own alias family: alias-same
    if (others.length && !e.gloss) add('error', 'needs-gloss', `"${text}" has ${same.length} entries; each needs a short meaning/context to tell them apart.`, loc);
    if (same.length > 1) {
      for (const o of same) if (o.id > e.id && o.pos === e.pos && !e.aliasOf && !o.aliasOf && shares(P, e, o))
        add('warn', 'maybe-duplicate', `"${label(e)}" and "${label(o)}" have the same part of speech and share a theme: one entry or two meanings?`, loc);
    }
    if (words(text) > (S.maxWords || 4)) add('warn', 'long', `"${text}" has more than ${S.maxWords || 4} words.`, loc);
    if (e.type === 'phrase' && /^[A-ZÀ-Ý]/.test(text)) add('warn', 'type', `"${text}" is typed phrase but looks like a name; use person, place, org, title or proper (phrase is for ordinary expressions).`, loc);
    if (letters(text) > (S.maxLen || 20)) add('warn', 'long', `"${text}" is longer than ${S.maxLen || 20} letters.`, loc);

    if (e.type === 'acronym' && text !== text.toUpperCase() && !initialism(text)) add('warn', 'case', `"${text}" is typed as an acronym but is not in capitals.`, loc);
    if (['person', 'place', 'org', 'title', 'proper'].includes(e.type) && !/\p{Lu}|^\d/u.test(text)) add('warn', 'case', `"${text}" is a ${e.type} name but has no capital letter.`, loc);
    if (e.type === 'common' && !e.tm && /^\p{Lu}/u.test(text) && !initialism(text) && !e.aliasOf) add('info', 'case', `"${text}" is typed as a common word but starts with a capital.`, loc);   // the entry itself; what each theme shows is the case lint at the end (letter-shaped terms and trademarks are fine, as there)

    const ids = linkIds(P, e);
    if (e.aliasOf) {
      const r = ix.entry.get(e.aliasOf);
      if (!r) add('error', 'alias-missing', `"${label(e)}" is an alias of entry ${e.aliasOf}, which does not exist.`, loc);
      else if (r.id === e.id) add('error', 'alias-self', `"${label(e)}" is an alias of itself.`, loc);
      else {
        if (r.aliasOf) add('error', 'alias-chain', `"${label(e)}" is an alias of "${label(r)}", which is itself an alias. Point it at the root.`, loc);
        { const diff = (e.aliasKind === 'spelling' || e.aliasKind === 'form') ? ['adult', 'offensive', 'sensitive', 'tm'].filter(f => !!e[f] !== !!r[f]) : [];   // the same word takes the root's flags
          if (diff.length) add('warn', 'alias-flags', `"${label(e)}" is a ${e.aliasKind} alias of "${label(r)}" (the same word) but differs in ${diff.map(f => `${f} (${e[f] ? 'on' : 'off'}, root ${r[f] ? 'on' : 'off'})`).join(', ')}: give it the root's flags.`, loc); }
        if (r.text.toLowerCase() === text.toLowerCase()) add('warn', 'alias-same', `"${label(e)}" has the same text as its root.`, loc);
        if (e.aliasKind && !ALIAS_KINDS.includes(e.aliasKind)) add('warn', 'alias-kind', `Alias "${label(e)}" has an unknown kind (${e.aliasKind}).`, loc);
        if (!e.aliasKind) add('warn', 'alias-kind', `Alias "${label(e)}" has no kind (synonym, spelling, form, regional, abbreviation or translation).`, loc);
        if (e.aliasKind === 'form' && (e.nameOkIn || []).length && text.length > r.text.length && text.toLowerCase().includes(r.text.toLowerCase())) add('info', 'alias-fullname', `"${label(e)}" is kept as a form of "${label(r)}" but is a longer name: make it an entry of its own and give the theme a shown text (show).`, loc);
        if (e.aliasKind === 'spelling' && e.region.includes('US') && !r.region.includes('US') && !(P.entries.some(x => x.aliasOf === r.id && x.aliasKind === 'spelling' && x.region.includes('UK')))) add('warn', 'alias-us-root', `"${label(r)}" is the root but its US-tagged spelling "${label(e)}" is the alias: make the US spelling the root and tag the other UK (or drop the US tag if both are standard).`, loc);
        if (e.aliasKind === 'spelling' && e.fam && r.fam) {   // Simon 2026-11-20: a UK/US display spelling has its root's familiarity; no spelling is easier than its root
          if ((e.region.includes('UK') || e.region.includes('US')) && e.fam !== r.fam) add('warn', 'spelling-fam', `"${label(e)}" is a ${e.region.filter(x => x === 'UK' || x === 'US').join('/')} spelling of "${label(r)}" with familiarity ${e.fam}, root ${r.fam}: a dialect spelling has its root's familiarity.`, loc);
          else if (e.fam < r.fam) add('warn', 'spelling-fam', `"${label(e)}" is a spelling of "${label(r)}" rated easier (${e.fam}) than its root (${r.fam}): raise the alias, lower the root, or make the better-known form the root.`, loc);
        }
        if (e.aliasKind === 'regional' && !e.region.length) add('info', 'alias-region', `Regional alias "${label(e)}" has no region (UK, AU ...).`, loc);
        if (e.aliasKind === 'spelling' && e.enabled) { const why = spellingSuspect(e, r); if (why) add('info', 'alias-kind-suspect', `"${label(e)}" is a spelling alias of "${label(r)}" but ${why}: the same word? Otherwise make it regional, a synonym or its own entry.`, loc); }
      }
      { const own = [['theme links', Object.keys(e.typ || {}).length], ['shown texts', Object.keys(e.show || {}).length], ['forms used', Object.keys(e.use || {}).length], ['kin', (e.kin || []).length]].filter(x => x[1]).map(x => x[0]);
        if (own.length) add('error', 'alias-links', `Alias "${label(e)}" has ${own.join(', ')} of its own; an alias holds none: link the root (and show the alias's text there).`, loc); }
    } else if (!ids.length) add('info', 'orphan', `"${label(e)}" is not linked to any theme.`, loc);

    for (const tid of ids) {
      const t = ix.theme.get(tid);
      if (!t) { add('error', 'bad-theme', `"${label(e)}" is linked to a theme that no longer exists (${tid}).`, loc); continue; }
      if (t.group) add('warn', 'link-group', `"${label(e)}" is linked to "${t.name}", which is a group.`, loc);
      if (fold(t.name) === fold(text)) add('warn', 'is-theme-name', `"${text}" is the name of the theme it is in ("${t.name}").`, loc);
    }
    for (const [tid, v] of Object.entries(e.typ)) if (!isRating(v)) add('error', 'bad-rating', `"${label(e)}" has a typicality of ${JSON.stringify(v)} in ${tid}; it must be 1 to 5 (rated in the batch that makes the link).`, loc);
    for (const [tid, txt] of Object.entries(e.show || {})) if (!ids.includes(tid) || !String(txt).trim()) add('warn', 'show-theme', `"${label(e)}" has a display text for ${tid}, which it is not in (or the text is empty).`, loc);
    for (const [tid, aid] of Object.entries(e.use || {})) {
      const a = ix.entry.get(aid);
      if (!ids.includes(tid)) add('warn', 'use-theme', `"${label(e)}" names a display form for ${tid}, which it is not in.`, loc);
      if (!a || a.aliasOf !== e.id || a.aliasKind !== 'form') add('warn', 'use-form', `"${label(e)}" shows entry ${aid} in ${tid}, which is not one of its forms.`, loc);
    }
    if (e.enabled && !isRating(e.fam)) add('error', 'unrated', `"${label(e)}" has ${e.fam ? 'the familiarity ' + JSON.stringify(e.fam) : 'no familiarity'}; every enabled entry and alias needs 1 to 5 (for a general UK/US adult).`, loc);
    for (const tid of e.nameOkIn || []) if (!ids.includes(tid)) add('info', 'nameOk-stale', `"${label(e)}" may contain the name of ${tid} (nameOkIn) but is not in that theme: drop the key, or it silently mutes the leak check if the word is linked there later.`, loc);

    if (freqLoaded() && P.lang === 'en' && e.type === 'common' && e.fam && !e.aliasOf) {
      const z = zipf(text);
      // Frequency in text undersells concrete everyday nouns (igloo, tuba, feta sit near Zipf 2.7), so only very rare words are a warning.
      if (e.fam <= 2 && z != null && z < 2.3) add('warn', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.fam} (easy) but is rare in text (Zipf ${z.toFixed(1)}). Check the familiarity.`, loc);
      else if (e.fam <= 2 && z != null && z < 3) add('info', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.fam} (easy) and is fairly rare in text (Zipf ${z.toFixed(1)}).`, loc);
      if (e.fam <= 2 && z === null) add('warn', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.fam} (easy) but is not in the frequency list.`, loc);
      if (e.fam >= 4 && z != null && z > 5) add('info', 'rating-vs-zipf', `"${label(e)}" has familiarity ${e.fam} (hard) but is very common in text (Zipf ${z.toFixed(1)}).`, loc);
    }
  }
  // ----- capitals of shown words (js/caselint.js): one warning per link -----
  for (const i of caseLint(P)) add('warn', i.kind.startsWith('case-') ? i.kind : 'case-' + i.kind, i.msg, { themeId: i.themeId, entryId: i.entryId });
  return out;
}

// ----- complete themes (DESIGN.md 6): the note lists the exact members, separated by commas -----
// Note: an optional label before a colon is ignored; "(a)" in an item holds alternatives. Items compare folded, without a trailing full stop or a leading "the".
const noteKey = s => fold(s).replace(/\s+/g, ' ').trim().replace(/\.$/, '').trim().replace(/^the /, '');
export function noteItems(note) {
  // A label ends at the first colon when it is "Exactly", starts with "the" or a digit, or the note has a second colon; otherwise the colon belongs to the first item (Star Wars: A New Hope).
  let s = String(note || ''); const c = s.indexOf(':'), head = c >= 0 ? s.slice(0, c).trim() : '';
  if (c >= 0 && !/[,(]/.test(head) && (/^(exactly$|the\b|\d)/i.test(head) || s.indexOf(':', c + 1) >= 0)) s = s.slice(c + 1);
  const parts = []; let depth = 0, cur = '';
  for (const ch of s) { if (ch === '(') depth++; else if (ch === ')') depth = Math.max(0, depth - 1); if (ch === ',' && !depth) { parts.push(cur); cur = ''; } else cur += ch; }
  parts.push(cur);
  return parts.map(p => p.trim()).filter(Boolean).map(p => { const m = p.match(/^(.*?)\s*\(([^)]*)\)\s*\.?$/); const alts = m ? [m[1], m[2]] : [p]; return { raw: p, keys: alts.map(noteKey).filter(Boolean) }; });
}
function completeCheck(P, t, direct, aliasTexts, add) {
  const loc = { themeId: t.id };
  if (!String(t.note || '').trim()) { add('warn', 'complete-no-note', `"${t.name}" is complete but has no note listing the exact members.`, loc); return; }
  const items = noteItems(t.note), known = new Map();
  for (const it of items) for (const k of it.keys) known.set(k, it);
  const shown = e => e.show?.[t.id] || P.ix.entry.get(e.use?.[t.id])?.text || e.text;
  const own = e => { const r = e.aliasOf || e.id, root = P.ix.entry.get(r) || e; return [shown(e), e.text, root.text, ...(aliasTexts.get(r) || [])]; };
  const partners = new Map(); for (const g of t.groups || []) { const es = g.map(id => P.ix.entry.get(id)).filter(Boolean); for (const e of es) partners.set(e.id, es); }
  const covered = new Set();
  for (const e of direct) {
    if (!e.enabled || e.typ[t.id] === undefined) continue;
    const texts = [...own(e), ...(partners.get(e.id) || []).flatMap(own)];
    let hit = false; for (const x of texts) { const it = known.get(noteKey(x)); if (it) { hit = true; covered.add(it); } }
    if (!hit) add('warn', 'complete-extra', `"${shown(e)}" is in the complete theme "${t.name}" but is not in its note; the note lists the exact members, so remove it or fix the note.`, { themeId: t.id, entryId: e.id });
  }
  for (const it of items) if (!covered.has(it)) add('warn', 'complete-missing', `"${it.raw}" is in the note of the complete theme "${t.name}" but no word covers it.`, loc);
}

// ----- word families (DESIGN-entries.md 3.7) -----
const pairKey = (a, b) => a < b ? a + '|' + b : b + '|' + a;
export const familyAllowed = (a, b, tid) => FAMILY_OK.has(pairKey(a, b)) || (tid !== undefined && FAMILY_OK.has(pairKey(a, b) + '|' + tid));
function familyChecks(P, add) {
  const ix = P.ix, playable = P.themes.filter(t => !t.group && eff(P, t.id).enabled), isPlay = new Set(playable.map(t => t.id));
  // family-pair: two separate entries (different alias families) of one word family linked in one theme, not in one of its synonym groups
  for (const t of playable) {
    if (t.familyOk || themeLocked(P, t)) continue;
    const items = (ix.byTheme.get(t.id) || []).filter(e => e.enabled && e.typ[t.id] !== undefined).map(e => ({ id: e.id, text: e.text, r: e.aliasOf || e.id }));
    if (items.length < 2) continue;
    const grp = new Map(); (t.groups || []).forEach((g, i) => { for (const id of g) grp.set(id, i); });
    for (const [a, b] of familyPairs(items)) {
      if (a.r === b.r || (grp.has(a.r) && grp.get(a.r) === grp.get(b.r)) || familyAllowed(a.id, b.id, t.id) || familyAllowed(a.r, b.r, t.id)) continue;
      add('warn', 'family-pair', `"${a.text}" and "${b.text}" are one word family and both separate answers in "${t.name}": put them in one synonym group, or keep the one that fits best (mark the theme familyOk only when the form is the point).`, { themeId: t.id, entryId: b.id });
    }
  }
  // clash groups as the export makes them (synonym groups + kin, union across themes)
  const cg = clashGroups(P, playable, id => !!ix.entry.get(id)?.enabled);
  for (const [c, ids] of cg.members()) {   // counted as the export writes the clash column: each root and its enabled aliases (an alias carries its root's id)
    const rows = ids.flatMap(id => [ix.entry.get(id), ...(ix.aliases.get(id) || []).filter(a => a.enabled)]).filter(Boolean);
    if (rows.length <= CLASH_SOFT) continue;
    const names = rows.map(e => e.text + (e.aliasOf ? '*' : ''));
    if (rows.length <= CLASH_MAX) add('info', 'clash-large', `A clash group (synonym groups and kin joined across themes) has ${rows.length} words (* an alias), more than ${CLASH_SOFT} (up to ${CLASH_MAX} is allowed for real look-alikes in big themes): ${names.join(', ')}.`, { entryId: ids[0] });
    else add('warn', 'clash-big', `A clash group (synonym groups and kin joined across themes) has ${rows.length} words (* an alias), more than ${CLASH_MAX}: ${names.join(', ')}. It can starve a theme of words; unlink the weaker family member instead of joining groups.`, { entryId: ids[0] });
  }
  // kin: symmetric, between existing root entries
  for (const e of P.entries) for (const id of e.kin || []) {
    const k = ix.entry.get(id);
    if (!k) add('error', 'kin-missing', `"${e.text}" has kin ${id}, which does not exist.`, { entryId: e.id });
    else if (e.aliasOf || k === e || k.aliasOf || !(k.kin || []).includes(e.id)) add('warn', 'kin-bad', `"${e.text}" has kin ${id} ("${k.text}"), which is ${e.aliasOf ? 'set on an alias (kin belongs on the root)' : k === e ? 'itself' : k.aliasOf ? 'an alias (kin belongs on the root)' : 'not kin back (kin is stored on both)'}.`, { entryId: e.id });
  }
  // family-kin: one-family root entries linked in different themes, with no kin relation and not kept apart already by one clash group
  const items = [];
  for (const e of P.entries) {
    if (e.aliasOf || !e.enabled) continue;
    const ts = Object.keys(e.typ).filter(tid => isPlay.has(tid));
    if (ts.length) items.push({ id: e.id, text: e.text, ts: new Set(ts), e });
  }
  for (const [a, b] of familyPairs(items)) {
    if ((a.e.kin || []).includes(b.id) || familyAllowed(a.id, b.id)) continue;
    if (a.e.type !== b.e.type || /^\p{Lu}/u.test(a.text) !== /^\p{Lu}/u.test(b.text)) continue;   // a name and a common word (Skinner / skin) are rarely one family
    if (cg.id(a.id) && cg.id(a.id) === cg.id(b.id)) continue;
    if (![...a.ts].some(t => !b.ts.has(t)) && ![...b.ts].some(t => !a.ts.has(t))) continue;   // the same themes: family-pair's work
    add('info', 'family-kin', `"${a.text}" and "${b.text}" look like one word family in different themes: if they are, make them kin (Related words) so the game keeps them apart in a level.`, { entryId: a.id });
  }
}

// ----- heuristics for review (info; each has an allow list or a clear fix) -----
// alias-kind-suspect: a spelling alias far from its root (edit distance at least 3 and above 40% of the longer text, accents plain), or of another type or capitalisation.
function editDistance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) { const cur = [i]; for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[b.length];
}
function spellingSuspect(e, r) {
  const a = plainText(e.text).toLowerCase(), b = plainText(r.text).toLowerCase(), d = editDistance(a, b), why = [];
  if (d >= 3 && d > 0.4 * Math.max(a.length, b.length)) why.push(`differs in ${d} of ${Math.max(a.length, b.length)} letters`);
  if (e.type !== r.type) why.push(`is typed ${e.type}, the root ${r.type}`);
  if (/^\p{Lu}/u.test(e.text) !== /^\p{Lu}/u.test(r.text)) why.push('differs in its initial capital');
  return why.join(' and ');
}

// sense-twin: two enabled roots with the same text, part of speech and type that look like one sense entered twice (their meanings share a word:
// port [ship side] / port [ship left]), or a root linked in a theme whose name its twin's meaning names and its own does not (Maltese [language]
// in dog breeds while Maltese [dog] exists: the link is probably on the wrong sense). Allow list: js/sense-allow.js.
const GLOSS_STOP = new Set('also with from that this type kind sort used word name thing something someone other more very made like into small large'.split(' '));
const glossToks = s => (fold(s || '').match(/[\p{L}\p{N}]+/gu) || []).map(nameStem);
function senseTwins(P, add) {
  const ix = P.ix, byText = new Map();
  for (const e of P.entries) if (!e.aliasOf && e.enabled) { const k = e.text.trim().toLowerCase(); if (!byText.has(k)) byText.set(k, []); byText.get(k).push(e); }
  const ok = (a, b, tid) => SENSE_OK.has(pairKey(a.id, b.id)) || (tid !== undefined && SENSE_OK.has(pairKey(a.id, b.id) + '|' + tid));
  const live = tid => { const t = ix.theme.get(tid); return t && !t.group && eff(P, tid).enabled ? t : null; };
  for (const es of byText.values()) {
    if (es.length < 2) continue;
    for (let i = 0; i < es.length; i++) for (let j = i + 1; j < es.length; j++) {
      const a = es[i], b = es[j];
      if (a.pos !== b.pos || a.type !== b.type || ok(a, b)) continue;
      const ga = glossToks(a.gloss), gb = glossToks(b.gloss);
      const shared = ga.filter(w => w.length >= 4 && !GLOSS_STOP.has(w) && gb.includes(w));
      if (shared.length) { add('info', 'sense-twin', `"${label(a)}" and "${label(b)}" have the same text, part of speech and type, and their meanings share "${shared[0]}": one sense entered twice? Merge them, or list the pair in js/sense-allow.js.`, { entryId: b.id }); continue; }
      for (const [x, y, gx, gy] of [[a, b, ga, gb], [b, a, gb, ga]]) for (const tid of Object.keys(x.typ)) {
        const t = live(tid); if (!t || y.typ[tid] !== undefined || ok(a, b, tid)) continue;
        const ws = themeNameWords(t), hit = ws.find(w => gy.includes(w));
        if (hit && !ws.some(w => gx.includes(w))) add('info', 'sense-twin', `"${label(x)}" is in "${t.name}", but the meaning of "${label(y)}" names the theme ("${hit}"): is the link on the wrong sense? Move it, or list the pair in js/sense-allow.js.`, { themeId: tid, entryId: x.id });
      }
    }
  }
}

// theme-twin: two playable themes, neither inside the other, where at least 80% of the smaller one's words (8 or more) are in the larger one:
// a near-duplicate theme (bike races / cycling races). Allow list: js/theme-twin-allow.js.
export const TWIN_SHARE = 0.8, TWIN_MIN = 8;
function themeTwins(P, add) {
  const ix = P.ix, words = new Map(), inv = new Map();
  for (const t of P.themes) {
    if (t.group || !eff(P, t.id).enabled) continue;
    const s = new Set((ix.byTheme.get(t.id) || []).filter(e => e.enabled && e.typ[t.id] !== undefined).map(e => e.aliasOf || e.id));
    words.set(t.id, s); for (const r of s) { if (!inv.has(r)) inv.set(r, []); inv.get(r).push(t.id); }
  }
  for (const [a, sa] of words) {
    if (sa.size < TWIN_MIN) continue;
    const n = new Map(); for (const r of sa) for (const b of inv.get(r)) if (b !== a) n.set(b, (n.get(b) || 0) + 1);
    for (const [b, k] of n) {
      const sb = words.get(b);
      if (k < TWIN_SHARE * sa.size || sb.size < sa.size || (sb.size === sa.size && b < a)) continue;   // a is the smaller (ties: once, by id)
      if (isAncestor(P, a, b) || isAncestor(P, b, a) || THEME_TWIN_OK.has(a < b ? a + '|' + b : b + '|' + a)) continue;
      add('info', 'theme-twin', `"${ix.theme.get(a).name}" shares ${k} of its ${sa.size} words with "${ix.theme.get(b).name}" (${sb.size} words): a near-duplicate theme? Merge them, make one a sub-theme, or list the pair in js/theme-twin-allow.js.`, { themeId: a });
    }
  }
}

// xwords-twin: an "X words" or "X terms" theme sharing at least 30% of its distinct words (4 or more) with another playable theme, the two
// unrelated or a direct parent and child (a deeper ancestor is the tree's business): same-topic "X words" themes are merged into the topic
// (LIBRARY-RULES 6, Simon 2026-11-22; v430 merged nine such pairs, most of them parent and child). Allow list: THEME_TWIN_OK (both themes stay).
export const XWORDS_SHARE = 0.3, XWORDS_MIN = 4;
const xwordsName = name => / (words|terms)$/i.test(name.trim());
function xwordsTwins(P, add) {
  const ix = P.ix, words = new Map(), inv = new Map();
  for (const t of P.themes) {
    if (t.group || !eff(P, t.id).enabled) continue;
    const s = new Set((ix.byTheme.get(t.id) || []).filter(e => e.enabled && e.typ[t.id] !== undefined).map(e => e.aliasOf || e.id));
    words.set(t.id, s); for (const r of s) { if (!inv.has(r)) inv.set(r, []); inv.get(r).push(t.id); }
  }
  const done = new Set(), depth = (a, b) => { let t = ix.theme.get(b), n = 0; while (t && n++ < 60) { if (t.id === a) return n - 1; t = t.parent && ix.theme.get(t.parent); } return -1; };
  for (const [a, sa] of words) {
    const ta = ix.theme.get(a);
    if (sa.size < XWORDS_MIN || !xwordsName(ta.name)) continue;
    const n = new Map(); for (const r of sa) for (const b of inv.get(r)) if (b !== a) n.set(b, (n.get(b) || 0) + 1);
    for (const [b, k] of n) {
      const key = a < b ? a + '|' + b : b + '|' + a;
      if (k < XWORDS_SHARE * sa.size || done.has(key) || THEME_TWIN_OK.has(key)) continue;
      if (depth(a, b) > 1 || depth(b, a) > 1) continue;   // a grandparent or deeper: not a twin
      done.add(key);
      const tb = ix.theme.get(b), rel = ta.parent === b ? ' (its parent)' : tb.parent === a ? ' (its sub-theme)' : '';
      add('info', 'xwords-twin', `"${ta.name}" shares ${k} of its ${sa.size} words (${Math.round(100 * k / sa.size)}%) with "${tb.name}"${rel} (${words.get(b).size} words): the same topic? Merge the things into "${tb.name}"; if "${ta.name}" is how people talk about it, rename it for what it is (pirate talk); or list the pair in js/theme-twin-allow.js.`, { themeId: a });
    }
  }
}

// sense-link: a link whose entry has a sibling root (same text, case ignored, another meaning) that fits the theme clearly better.
// Each sense is scored by the words of its gloss (stemmed, 3+ letters, not generic) found in the theme's own name (3 each), an ancestor's
// name (1) and the texts and glosses of the theme's other members (1 per member, at most 3 per word). Reported when the sibling scores at
// least 3 and at least twice the linked sense plus 2, and more of the theme's other members share another theme with the sibling than
// with the linked sense (neighbours), by 5 or more when the sibling scores only 3: trench [ocean] in army words, trench [military] exists.
// Not reported: wordplay and compound themes (the sense is not the point), a sibling linked in the theme too (maybe-duplicate), two glosses
// sharing a word (sense-twin), entries with no gloss (needs-gloss). Many hits are one sense entered twice under unrelated glosses (calf
// [cattle] / calf [animal]): a merge. Allow list: js/sense-allow.js (idA|idB or idA|idB|themeId).
const SENSE_STOP = new Set(('a an and or the of in on at to for from with by as is are that this these those your my our their its words word names name types type kinds kind famous common things thing parts part ' +
  'varieties variety styles style ways way terms term items item sorts sort different all some other about into over under more most not no ' +
  'also used something someone very made like small large person people general one two act').split(/\s+/));
const senseToks = s => [...new Set((fold(s || '').match(/[\p{L}\p{N}]+/gu) || []).map(nameStem).filter(w => w.length >= 3 && !SENSE_STOP.has(w)))];
function senseLinks(P, add) {
  const ix = P.ix, byText = new Map(), tk = new Map();
  for (const e of P.entries) if (!e.aliasOf && e.enabled) { const k = e.text.trim().toLowerCase(); if (!byText.has(k)) byText.set(k, []); byText.get(k).push(e); }
  for (const [k, es] of byText) if (es.length < 2) byText.delete(k);
  const toksOf = e => { let x = tk.get(e.id); if (!x) tk.set(e.id, x = { text: senseToks(e.text), gloss: senseToks(e.gloss) }); return x; };
  const ok = (a, b, tid) => SENSE_OK.has(pairKey(a.id, b.id)) || SENSE_OK.has(pairKey(a.id, b.id) + '|' + tid);
  for (const t of P.themes) {
    if (t.group || t.tkind === 'wordplay' || t.tkind === 'compound' || !eff(P, t.id).enabled) continue;
    const mem = (ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.enabled && e.typ[t.id] !== undefined);
    const cand = mem.filter(e => e.gloss && byText.has(e.text.trim().toLowerCase()));
    if (!cand.length) continue;
    const own = new Set(senseToks(t.name)), up = new Set(), bag = new Map();
    for (let x = t.parent && ix.theme.get(t.parent), n = 0; x && n++ < 60; x = x.parent && ix.theme.get(x.parent)) for (const w of senseToks(x.name)) up.add(w);
    for (const e of mem) { const x = toksOf(e); for (const w of new Set([...x.text, ...x.gloss])) bag.set(w, (bag.get(w) || 0) + 1); }
    for (const e of cand) {
      const ex = toksOf(e), eAll = new Set([...ex.text, ...ex.gloss]);
      const score = s => { let n = 0; for (const w of toksOf(s).gloss) if (!ex.text.includes(w)) n += (own.has(w) ? 3 : up.has(w) ? 1 : 0) + Math.min(3, (bag.get(w) || 0) - (eAll.has(w) ? 1 : 0)); return n; };
      let se = null, ce = null;
      for (const o of byText.get(e.text.trim().toLowerCase())) {
        if (o === e || !o.gloss || o.typ[t.id] !== undefined || fold(o.gloss) === fold(e.gloss) || ok(e, o, t.id)) continue;
        if (toksOf(o).gloss.some(w => w.length >= 4 && ex.gloss.includes(w))) continue;
        const so = score(o);
        if (so < 3) continue;
        if (se === null) se = score(e);
        if (so < 2 * se + 2) continue;
        const near = x => { const ts = new Set(Object.keys(x.typ)); ts.delete(t.id); let n = 0; for (const m of mem) if (m !== e && Object.keys(m.typ).some(k => ts.has(k))) n++; return n; };
        if (ce === null) ce = near(e);
        const co = near(o);
        if (co <= ce || (so < 4 && co < ce + 5)) continue;
        add('info', 'sense-link', `"${label(e)}" is in "${t.name}", but "${label(o)}" fits it better (its meaning matches the theme's name and words: ${so} to ${se}; ${co} of the other words share a theme with it, ${ce} with the linked sense): is the link on the wrong sense (move it to entry ${o.id}), or are the two one sense entered twice (merge them)? If both are right, list the pair in js/sense-allow.js.`, { themeId: t.id, entryId: e.id });
      }
    }
  }
}

// theme-gap: LIBRARY-RULES 6, "Theme difficulty against its words" (I30): the 4th-easiest usable word's band (themeProfile lo) 2 or more
// above the theme difficulty (themeDifficulty): the game rarely finds four words easy enough for the theme, so it seldom plays.
export const GAP_MAX = 2;
function themeGaps(P, add) {
  for (const t of P.themes) {
    if (t.group || !eff(P, t.id).enabled) continue;
    const td = themeDifficulty(t); if (!td) continue;   // unrated: theme-unrated
    const lo = themeProfile(P, t.id).lo; if (!lo) continue;   // fewer than 4 words: thin
    const gap = round1(lo - td);
    if (gap >= GAP_MAX) add('warn', 'theme-gap', `"${t.name}" has the theme difficulty ${td} (ident ${t.ident}, pop ${t.pop || '-'}) but its 4th-easiest word is band ${lo} (gap ${gap}): the theme rarely plays. Fix a wrong word rating, add easier words, or raise ident (or pop).`, { themeId: t.id });
  }
}
const round1 = x => Math.round(x * 10) / 10;

function shares(P, a, b) {
  const x = new Set(linkIds(P, a));
  return linkIds(P, b).some(t => x.has(t));
}

export const SEV_ORDER = { error: 0, warn: 1, info: 2 };
