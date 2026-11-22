// Offensive words, full pass (DESIGN-entries.md 3.8): writes the candidate lists the agents judge under tools/gen/offensive/BRIEF-offensive.md.
// node tools/gen/offensive-make.mjs <wiktionary-dir>
//   a.tsv       entries the offensive-word check reports (contain a list word, not flagged, not allowed)
//   themes.tsv  every playable theme: id, name, parent, flags (topic scan; offensive-theme hits are marked)
//   w1.tsv w2.tsv  entries whose whole text is in a Wiktionary category (vulgarities, offensive terms, ethnic or religious slurs, swear words), not in a.tsv
//   s1.tsv s2.tsv  root entries of slang, insult, drug and similar themes, not in a.tsv or w*.tsv
// Columns of the entry lists: id, text, gloss, type, flags (A adult, S sensitive, O offensive), why (list word or Wiktionary categories), themes, aliases.
import fs from 'node:fs';
import path from 'node:path';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds, eff } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { offensiveWord } from '../../js/offensive.js';
const WD = process.argv[2];
if (!WD) { console.error('usage: offensive-make.mjs <wiktionary-dir>'); process.exit(2); }
const OUT = new URL('./offensive/', import.meta.url); fs.mkdirSync(OUT, { recursive: true });
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const ix = P.ix, tn = id => ix.theme.get(id)?.name || id;
const flags = e => (e.adult ? 'A' : '') + (e.sensitive ? 'S' : '') + (e.offensive ? 'O' : '');
const row = (e, why) => [e.id, e.text, e.gloss, e.type, flags(e), why, linkIds(P, e).map(tn).join('; '), P.entries.filter(a => a.aliasOf === e.id).map(a => `${a.text} (${a.aliasKind})`).join('; ')].join('\t');
const HEAD = 'id\ttext\tgloss\ttype\tflags\twhy\tthemes\taliases';
const write = (f, lines) => { fs.writeFileSync(new URL(f, OUT), [HEAD, ...lines].join('\n') + '\n'); console.log(f, lines.length); };
const issues = validate(P), done = new Set();

// a: the check's hits
const a = issues.filter(i => i.kind === 'offensive-word').map(i => { const e = ix.entry.get(i.entryId); done.add(e.id); return row(e, 'list: ' + offensiveWord(e.text)); });
write('a.tsv', a);

// themes
const hit = new Set(issues.filter(i => i.kind === 'offensive-theme').map(i => i.themeId));
fs.writeFileSync(new URL('themes.tsv', OUT), ['id\tname\tparent\tflags\tname has a list word', ...P.themes.filter(t => !t.group).map(t => { const f = eff(P, t.id); return [t.id, t.name, tn(t.parent), (f.adult ? 'A' : '') + (f.sensitive ? 'S' : '') + (f.offensive ? 'O' : ''), hit.has(t.id) ? 'YES' : ''].join('\t'); })].join('\n') + '\n');
console.log('themes.tsv', P.themes.filter(t => !t.group).length);

// w: Wiktionary categories, whole text
const CATS = { English_vulgarities: 'vulgar', English_offensive_terms: 'offensive', English_ethnic_slurs: 'ethnic slur', English_religious_slurs: 'religious slur', English_swear_words: 'swear' };
const wk = new Map();
for (const [f, tag] of Object.entries(CATS)) for (const t of fs.readFileSync(path.join(WD, f + '.txt'), 'utf8').split(/\r?\n/).filter(Boolean)) { const k = t.toLowerCase(); if (!wk.has(k)) wk.set(k, new Set()); wk.get(k).add(tag); }
const w = [];
for (const e of P.entries) { if (done.has(e.id) || e.offensive || !e.enabled) continue; const k = e.text.toLowerCase(); if (wk.has(k)) { done.add(e.id); w.push(row(e, 'Wiktionary: ' + [...wk.get(k)].join(', '))); } }
const half = Math.ceil(w.length / 2);
write('w1.tsv', w.slice(0, half)); write('w2.tsv', w.slice(half));

// s: high-risk themes
const RISK = ['nicknames_for_drinks', 'illegal_drugs', 'street_names_for_hemp', 'stimulants', 'body_noises', 'nicknames_for_workers', 'slang_terms', 'prison_words', 'money_slang', 'media_slang', 'surfer_slang',
  'anime_and_manga_words', 'internet_words', 'text_speak', 'gen_z_slang', '1920s_slang', 'british_slang', 'cockney_rhyming_slang', 'australian_slang', 'canadian_slang', 'cowboy_slang', 'old_fashioned_insults', 'polite_swears',
  'words_for_toilet', 'words_from_yiddish', 'street_dance_styles'];
const s = [];
for (const tid of RISK) for (const e of ix.byTheme.get(tid) || []) { if (e.aliasOf || done.has(e.id) || e.offensive) continue; done.add(e.id); s.push(row(e, 'theme: ' + tn(tid))); }
const h2 = Math.ceil(s.length / 2);
write('s1.tsv', s.slice(0, h2)); write('s2.tsv', s.slice(h2));
