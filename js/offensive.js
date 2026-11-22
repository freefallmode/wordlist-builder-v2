// Offensive words (DESIGN-entries.md 3.8): does an entry's text or a theme name contain a word some players object to?
// A list word matches as a whole word, or its plural. A name (type person, place, org, title, proper) or a hyphenated
// text matches only when the whole text is the word (Negro [river] yes, Moby Dick and cock-a-doodle-doo no). Letters inside a longer word never
// match (cocktail, scrape, switch). Whether a matching phrase keeps the offending meaning (wicked witch) or names something harmless (witch hazel)
// is a judgement: the harmless ones go on the allow list js/offensive-allow.js.
import { OFFENSIVE_WORDS } from './offensive-words.js';

export const NAME_TYPES = new Set(['person', 'place', 'org', 'title', 'proper']);
const fold = s => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[‘’]/g, "'");
// Words of a text: letters and digits, a possessive 's dropped (devil's claw -> devil claw).
export const offTokens = s => (fold(s).replace(/'s\b/g, '').match(/[a-z0-9]+/g) || []);

let FORMS = null, PHRASES = null;
const build = () => {
  FORMS = new Map(); PHRASES = [];
  const put = (form, w) => { if (!FORMS.has(form)) FORMS.set(form, w); };
  for (const w of OFFENSIVE_WORDS) {
    const t = offTokens(w);
    if (t.length !== 1) { if (t.length) PHRASES.push([t, w]); continue; }
    const x = t[0];
    put(x, w);
    if (!/s$/.test(x)) put(x + 's', w);   // only plurals are added: other forms (-ed, -ing, -er, -y) are listed words of their own, because added suffixes match too much (butt+er, spic+es, cock+y)
    if (/(s|x|z|ch|sh)$/.test(x)) put(x + 'es', w);
    if (/[^aeiou]y$/.test(x)) put(x.slice(0, -1) + 'ies', w);
  }
};
const runAt = (ts, ph) => { for (let i = 0; i + ph.length <= ts.length; i++) if (ph.every((p, j) => ts[i + j] === p)) return true; return false; };

// The list word a text contains, or null. whole: only when the whole text is the word (or phrase).
export function offensiveWord(text, whole = false) {
  if (!FORMS) build();
  const ts = offTokens(text);
  if (!ts.length) return null;
  if (ts.length === 1 && FORMS.has(ts[0])) return FORMS.get(ts[0]);
  for (const [ph, w] of PHRASES) if (ph.length === ts.length && ph.every((p, i) => ts[i] === p)) return w;
  if (whole) return null;
  for (const x of ts) if (FORMS.has(x)) return FORMS.get(x);
  for (const [ph, w] of PHRASES) if (runAt(ts, ph)) return w;
  return null;
}
// The list word an entry contains under the name and hyphen rule, or null.
export const offensiveMatch = e => offensiveWord(e.text, NAME_TYPES.has(e.type) || e.text.includes('-'));
// Is this one piece of a word (one side of a line break) a list word? Pieces are matched exactly, without forms.
export const offensivePiece = s => { if (!FORMS) build(); const ts = offTokens(s); return ts.length === 1 && OFFENSIVE_WORDS.includes(ts[0]) ? ts[0] : null; };
