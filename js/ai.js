// Claude, called straight from the browser with the user's own API key (kept for the session unless "remember" is ticked).
// Replies use structured outputs, so they are always valid JSON of the shape in the schema.
import { POS, TYPES, REGIONS, FLAG_HELP, pathOf, descendants } from './model.js';

export const MODELS = [['claude-opus-5-5', 'Claude Opus 5.5'], ['claude-sonnet-5-5', 'Claude Sonnet 5.5'], ['claude-haiku-4-5', 'Claude Haiku 4.5']];
const PRICE = { 'claude-opus-5-5': [4, 20, 0.4], 'claude-sonnet-5-5': [2, 10, 0.2], 'claude-haiku-4-5': [1, 5, 0.1] };   // $ per million tokens: in, out, cache read

let sessionKey = '';
export function setKey(k, remember) {
  sessionKey = k.trim();
  try { remember ? localStorage.setItem('wlb2-key', sessionKey) : localStorage.removeItem('wlb2-key'); } catch { /* private window */ }
}
export function getKey() {
  if (!sessionKey) { try { sessionKey = localStorage.getItem('wlb2-key') || ''; } catch { /* ignore */ } }
  return sessionKey;
}

// The model is an app setting (the same for every library), so it lives in the browser, not in the project.
export function getModel() {
  try { const m = localStorage.getItem('wlb2-model'); if (m && MODELS.some(x => x[0] === m)) return m; } catch { /* ignore */ }
  return MODELS[0][0];
}
export function setModel(m) { try { localStorage.setItem('wlb2-model', m); } catch { /* ignore */ } }

export const cost = (model, u) => {
  const p = PRICE[model] || PRICE['claude-opus-5-5'];
  return ((u.input_tokens || 0) * p[0] + (u.cache_creation_input_tokens || 0) * p[0] * 1.25 + (u.cache_read_input_tokens || 0) * p[2] + (u.output_tokens || 0) * p[1]) / 1e6;
};

export async function claude({ model, system, prompt, schema, maxTokens = 12000, effort = 'medium', signal }) {
  const key = getKey();
  if (!key) throw Error('Add your Anthropic API key in Settings first.');
  const body = { model, max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }], output_config: { format: { type: 'json_schema', schema } } };
  if (system) body.system = [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }];
  const headers = { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
  if (model !== 'claude-haiku-4-5') {
    body.output_config.effort = effort;
    body.fallbacks = 'default';                      // if a safety classifier declines, retry on another model instead of failing
    headers['anthropic-beta'] = 'server-side-fallback-2026-07-01';
  }
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body), signal });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Error((j.error && j.error.message) || 'HTTP ' + r.status);
  if (j.stop_reason === 'refusal') throw Error('Claude declined this request.');
  if (j.stop_reason === 'max_tokens') throw Error('The reply was cut off. Ask for fewer words.');
  const text = j.content.filter(c => c.type === 'text').map(c => c.text).join('');
  return { data: JSON.parse(text), cost: j.usage ? cost(j.model || model, j.usage) : 0 };
}

// ---------- word generation ----------

const bool = { type: 'boolean' };
const str = { type: 'string' };
const strs = { type: 'array', items: str };
const int = { type: 'integer' };
const aliasSchema = { type: 'object', additionalProperties: false, required: ['text', 'gloss', 'kind', 'region', 'rec', 'inRec'],
  properties: { text: str, gloss: str, kind: { type: 'string', enum: ['synonym', 'spelling'] }, region: { type: 'array', items: { type: 'string', enum: REGIONS } }, rec: int, inRec: int } };
const entrySchema = { type: 'object', additionalProperties: false,
  required: ['text', 'gloss', 'pos', 'type', 'rec', 'inRec', 'adult', 'sensitive', 'tm', 'vulgar', 'region', 'aliases'],
  properties: { text: str, gloss: str, pos: { type: 'string', enum: POS }, type: { type: 'string', enum: TYPES }, rec: int, inRec: int,
    adult: bool, sensitive: bool, tm: bool, vulgar: bool, region: { type: 'array', items: { type: 'string', enum: REGIONS } }, aliases: { type: 'array', items: aliasSchema } } };
export const WORDS_SCHEMA = { type: 'object', additionalProperties: false, required: ['themeDifficulty', 'entries'], properties: { themeDifficulty: int, entries: { type: 'array', items: entrySchema } } };

export const GAME = `You build the word lists for a themed word-sorting game. A level shows words from 8 to 12 themes, four words per theme, mixed together; the player sorts each word into its theme (and the theme's name is revealed when it is complete). Players are typical adult English readers, and the game has five difficulty modes from easy to ultra-hard, so every theme needs words across the whole range of how well known they are.

Every word you list must belong to the theme unambiguously: a thoughtful player must not be able to argue that it fits a different, ordinary theme better. Prefer words that are specific to the theme.

Entries. An entry is ONE meaning of ONE written form. Write the text as it is normally written: proper nouns capitalized (Paris, Mercury the planet), acronyms in capitals (NASA), common words lowercase, American spelling. Two meanings of a word are two entries; if the text could mean something else that a player might think of, give a short gloss in a few words to tell the meanings apart (for example "ass" with gloss "donkey"; "Apple" with gloss "tech company"); otherwise leave the gloss empty. Single words, or names of two words (up to 20 letters); never longer phrases unless the theme is about phrases.

pos: noun, verb, adjective, adverb, other (prepositions, numbers, interjections and so on). Proper nouns are nouns.
type: common (ordinary word), person (a named person or character), place, org (company, brand, team, group), title (book, film, song, game, artwork), proper (other proper name), acronym, phrase (idiom or set phrase).

rec, how widely known the word itself is among players, 1 to 5. Be honest and conservative; rate by what a typical adult actually knows, not by how common the thing is in the world. 1 = every child and adult knows it (apple, dog). 2 = nearly every adult (plum, otter). 3 = many adults but not all (quince, ocelot). 4 = people with the interest, job or region (kumquat, quokka). 5 = few people (pulasan, a rare specialist term). Do not rate an obscure word as easy.
inRec: how recognisable the word is AS A MEMBER OF THIS THEME, 1 to 5 on the same scale: how readily a player who knows the word would place it in this theme. A word everyone knows can still be a hard fit (a tomato in "fruits" is a 3).

Flags (true only when it really applies to this meaning of the word):
- tm: ${FLAG_HELP.tm}
- adult: ${FLAG_HELP.adult}
- sensitive: ${FLAG_HELP.sensitive}
- vulgar: crude or offensive wording in this meaning.
Themes carry the same adult, sensitive and trademark flags, plus a language-specific flag.
- ${FLAG_HELP.lang}
Theme flags are inherited by its words' links, so a word does not need a flag only because its theme has one.
region: only if the word is mainly known in particular regions, using the codes (US, CA, UK, IE, AU, NZ, ZA, IN, TR); otherwise empty.

Aliases. Add aliases only when there is a real, commonly used alternative that fits the same theme: a synonym (sofa / couch / settee), a regional word (sidewalk US, pavement UK; give region), or a spelling variant (color / colour, kind "spelling", region UK). Each alias gets its own honest rec and inRec: a rarer alias should have a higher number. Never list the same concept as separate top-level entries. Leave aliases empty when there are none.

themeDifficulty: how recognisable the THEME is as a category, 1 to 5 (1 = everyone gets it at a glance, 5 = specialist or obscure; a vague boundary makes it harder). Always give it; it is only used when the theme is still unrated.

Complete themes are a finite set: list EVERY member exactly and correctly, nothing else, however many that is.`;

export function wordsPrompt(P, t, n, spread, extra) {
  const path = pathOf(P, t.id).join(' > ');
  const have = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf).map(e => e.text + (e.gloss ? ` (${e.gloss})` : ''));
  const kids = descendants(P, t.id).slice(0, 12).map(k => k.name);
  const lines = [`Theme: ${t.name}`, `Place in the tree: ${path}`];
  if (t.note) lines.push(`Note: ${t.note}`);
  if (t.lang) lines.push('This theme is language-specific (spelling, sound, slang or wordplay): every word you list must satisfy its rule exactly.');
  if (t.complete) lines.push('COMPLETE theme: list every member of the set (use the note), exactly, with no extras.');
  if (kids.length) lines.push(`Sub-themes exist (${kids.join(', ')}); words here should be typical of this theme itself, not copies of what the sub-themes will hold.`);
  if (have.length) lines.push(`Already in the theme (do not repeat): ${have.slice(0, 150).join(', ')}`);
  if (t.complete) lines.push('Return the whole set.');
  else lines.push(`Return about ${n} words. ${spread}`);
  if (extra) lines.push(`Extra instructions: ${extra}`);
  return lines.join('\n');
}

export const SPREADS = {
  even: 'Spread them across the difficulty range: roughly a third very well known (rec 1 to 2), a third in the middle (rec 3), and a third harder or more specialist (rec 4 to 5), but only words that really belong.',
  easy: 'Give the best-known words first: mostly rec 1 to 2.',
  hard: 'Give harder words that still clearly belong: mostly rec 3 to 5, skipping the obvious ones already listed.',
};

export async function generateWords(P, t, { n = 20, spread = 'even', extra = '', model, signal }) {
  const r = await claude({ model, system: GAME, prompt: wordsPrompt(P, t, n, SPREADS[spread] || SPREADS.even, extra), schema: WORDS_SCHEMA, maxTokens: t.complete ? 16000 : 12000, signal });
  return { entries: r.data.entries, themeDifficulty: r.data.themeDifficulty, cost: r.cost };
}

// ---------- theme difficulty ----------

const RATE_SCHEMA = { type: 'object', additionalProperties: false, required: ['ratings'],
  properties: { ratings: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'd'], properties: { id: str, d: int } } } } };
export const THEME_SCALE = 'Rate how recognisable each THEME is to a typical adult, 1 to 5, as a category a player would see in a sorting game: 1 = everyone gets it at a glance (fruits, animals, colors); 2 = most adults (musical instruments, kitchen tools); 3 = many adults (sailing words, architectural styles); 4 = needs some interest or knowledge (heraldry terms, cheese-making words); 5 = specialist or obscure. Also consider how clear the boundary is; a vague or abstract theme is harder.';

export async function rateThemes(P, themes, { model }) {
  const list = themes.map(t => `${t.id}: ${pathOf(P, t.id).slice(-3).join(' > ')}${t.note ? ' -- ' + t.note : ''}`).join('\n');
  const r = await claude({ model, system: 'You rate the difficulty of themes for a themed word-sorting game. ' + THEME_SCALE, prompt: 'Rate these themes (id: path). Return one rating per id.\n' + list, schema: RATE_SCHEMA, maxTokens: 8000 });
  return { ratings: r.data.ratings, cost: r.cost };
}
