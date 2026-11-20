// Library batch v421: the senses branch (Body & Health > senses), proposed on branch julia-category-fixes-2 for Simon's review.
// Each category is checked against its siblings and against the themes elsewhere that hold the same words (ways of looking, things your eyes do,
// texture words, sound qualities, acoustics words). Per category:
//   1. senses: a mix of the five senses, the sense organs, eye and ear parts and science words (receptor, stimulus, proprioception). It becomes a
//      folder (no words), like green living (v409). The senses stay in "the five senses"; the organs move to a new complete theme "sense organs"
//      (eye, ear, nose, tongue, skin); blind and peripheral vision move to eyesight; the parts stay in eye parts and ear parts.
//   2. sight words -> "eyesight": "sight words" is also the name of the reading words children learn by sight (the, and, said). 42 of its 50 words
//      were looking verbs that "ways of looking" and "things your eyes do" already hold, or other words (witness, lookout, butcher's). It keeps
//      the words for how well you see, gains blind, peripheral vision and four new words (color-blind, double vision, astigmatism, 20/20 vision),
//      and loses the language-only flag (it was there for the slang). shufti and dekko move to ways of looking (it holds gander and squiz).
//   3. hearing words: the sound words go (loud, quiet, muffled are in sound qualities; decibel, hertz, echo, ultrasound in acoustics words). It keeps
//      the words for hearing and listening. pitch [sound] and frequency [sound] repeat pitch [music] 6069 and frequency [radio] 35258, which
//      acoustics words holds: left in no theme.
//   4. words for noise (new, in the synonyms folder with words for bad, old, strange): din, racket, cacophony would otherwise have no theme.
//      "noise" itself stays out (it is the name's own word).
//   5. smell words: things and other topics go (nose, perfume, musk, incense, sniffer dog, smelling salts, scratch and sniff, nasal, sniffle).
//   6. touch words: the texture words go (texture words holds them; sticky, slippery, gooey, clammy and hard move there, sticky grouped with
//      tacky), grope, fondle and feel up go (a sexual sense) and three specialist terms (mechanoreceptor, somatosensory, paresthesia).
//   7. ear parts: cartilage (a tissue), earwax and cerumen (not parts) go.  8. eye parts: tear (a liquid), eyebrow (above the eye), pupillary
//      (an adjective) go.
//   Also: spy in ways of looking was the secret-agent entry 16942 (pos verb with gloss agent): the looking verb spy [see] 14664 takes its place
//   and 16942 becomes a noun. longsighted 14680 is the UK word for farsighted, not a spelling: regional, like shortsighted.
// Words taken out stay in the library (LIBRARY-RULES 2, Deleting); the ones left in no theme are listed.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch421.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, addEntry, linkIds, placeTheme } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
{ const b = new URL('../../data/breaks-en.txt', import.meta.url); if (fs.existsSync(b)) setBreaks(parseBreaks(fs.readFileSync(b, 'utf8'))); }
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const T = tid => { const t = ix.theme.get(tid); if (!t) throw Error('no theme ' + tid); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], alone = new Set();
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const where = e => { const r = linkIds(P, e).filter(t => ix.theme.has(t)); return r.length ? `stays in ${r.join(', ')}` : 'now in no theme: not exported'; };
const unlinkE = (e, tid, why) => {
  T(tid);
  if (e.typ[tid] === undefined) return;
  unlinkEntry(P, e, tid); n++; reindex(P);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`out of ${tid}: ${lab(e)}: ${why} (${where(e)})`);
};
const out = (tid, list, why) => { for (const [id, text] of list) unlinkE(chk(id, text), tid, why); };
const linkE = (e, tid, typ, why, extra = {}) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return;
  e.typ[tid] = typ; n++;
  if (extra.show) e.show = { ...(e.show || {}), [tid]: extra.show };
  if (extra.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}): ${why}`);
};
const link = (id, text, tid, typ, why, extra) => linkE(chk(id, text), tid, typ, why, extra);
const rate = (id, text, tid, typ, why) => {
  const e = chk(id, text); if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++;
};
const addToGroup = (tid, ids, why) => {   // ids join one synonym group of tid (joined with any group they are already in)
  const t = T(tid); t.groups ||= [];
  for (const id of ids) if (E(id).typ[tid] === undefined) throw Error(`${id} is not in ${tid}`);
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++;
  A.push(`group in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`);
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return;
  A.push(`${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++;
};
const makeTheme = (id, name, after, fields, why) => {   // a new theme placed right after the theme `after` (same parent)
  if (ix.theme.has(id)) return;
  if (P.themes.some(t => t.name.toLowerCase() === name.toLowerCase())) throw Error('a theme is already named ' + name);
  const parent = T(after).parent;
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: '', ...fields });
  reindex(P); if (!placeTheme(P, id, after, 'after')) throw Error('place ' + id); reindex(P); n++;
  A.push(`new theme: ${id} "${name}" under ${parent}, after ${after} (pop ${fields.pop}, ident ${fields.ident}${fields.complete ? ', complete' : ''}): ${why}`);
};
const findNew = (text, gloss, alias) => {   // the entry a previous run of this batch made (a rerun finds it), or null
  const m = (ix.byText.get(text.toLowerCase()) || []).filter(e => e.text === text);
  if (!m.length) return null;
  const hit = m.filter(e => e.gloss === gloss && (alias ? e.aliasOf === alias : !e.aliasOf));
  if (hit.length !== 1) throw Error(`"${text}" already exists (${m.map(lab).join(', ')}): by hand`);
  return hit[0];
};
const newRoot = (text, o, why) => {
  const had = findNew(text, o.gloss || '', 0); if (had) return had;
  const e = addEntry(P, text, { gloss: o.gloss || '', pos: o.pos, type: 'common', fam: o.fam, region: [], typ: {}, status: 'rev' }); n++; reindex(P);
  A.push(`new word: ${lab(e)} (${o.pos}, familiarity ${o.fam}): ${why}`);
  return e;
};
const newAlias = (text, R, kind, region, fam, why) => {
  const had = findNew(text, '', R.id); if (had) return had;
  const a = addEntry(P, text, { gloss: '', pos: R.pos, type: R.type, fam, region, aliasOf: R.id, aliasKind: kind, typ: {}, adult: R.adult, sensitive: R.sensitive, tm: R.tm, vulgar: R.vulgar, status: 'rev' });
  n++; reindex(P);
  A.push(`new alias: ${lab(a)}, ${kind}${region.length ? ' [' + region.join(',') + ']' : ''} of ${lab(R)} (familiarity ${fam}): ${why}`);
  return a;
};

// ---------- 1. senses: sense organs, then the folder ----------
A.push('1. senses becomes a folder; new theme sense organs');
makeTheme('sense_organs', 'sense organs', 'the_five_senses',
  { complete: true, pop: 2, ident: 2, note: 'the five sense organs: eye, ear, nose, tongue, skin' },
  'the five sense organs, a set every child learns beside the five senses (they were in senses)');
for (const [id, text, typ] of [[3185, 'eye', 1], [3186, 'ear', 1], [3183, 'nose', 1], [3206, 'tongue', 1], [3189, 'skin', 2]])
  link(id, text, 'sense_organs', typ, 'a sense organ');
link(3311, 'blind', 'sight_words', 1, 'how well you see (was in senses)');
link(3321, 'peripheral vision', 'sight_words', 3, 'how well you see (was in senses)');
{ const t = T('senses');
  for (const e of [...P.entries]) if (e.typ.senses !== undefined) unlinkE(e, 'senses', 'senses is now a folder with no words');
  if (!t.group) { Object.assign(t, { group: true, note: '', pop: 0 }); delete t.ident; delete t.groups; n++; A.push('senses: now a group (folder) of the sense themes, no words'); }
  reindex(P); }

// ---------- 2. sight words -> eyesight ----------
A.push('2. sight words -> eyesight');
setT('sight_words', 'name', 'eyesight', '"sight words" is also the name of the reading words children learn by sight');
setT('sight_words', 'lang', false, 'the slang that made it language-specific is out');
setT('sight_words', 'note', 'how well people see: blind, nearsighted, farsighted, blurry, color-blind, double vision, 20/20 vision, eagle-eyed', 'what the theme holds now');
setT('sight_words', 'pop', 3, 'a narrower, ordinary theme now');
out('sight_words', [[14649, 'see'], [14650, 'look'], [14651, 'watch'], [14652, 'stare'], [14653, 'glance'], [14654, 'gaze'], [14655, 'glimpse'], [14656, 'peek'],
  [14657, 'squint'], [14658, 'blink'], [14659, 'wink'], [14660, 'glare'], [14661, 'peer'], [14662, 'gawk'], [14663, 'ogle'], [14665, 'spot'], [14666, 'notice'],
  [14667, 'behold'], [14668, 'scan'], [14669, 'scrutinize'], [14671, 'peruse'], [14672, 'view'], [7497, 'observe'], [14689, 'espy'], [14690, 'descry'],
  [50242, 'gander'], [3351, 'eyeball']], 'a looking verb: ways of looking and things your eyes do hold them');
out('sight_words', [[14691, 'discern'], [14692, 'perceive'], [14693, 'visualize'], [14688, 'clock'], [14673, 'visible']], 'a seeing word, not about how well you see');
out('sight_words', [[38, 'sight'], [3310, 'eyesight'], [3309, 'vision']], "the theme name's own word");
out('sight_words', [[4192, 'witness'], [14687, 'lookout'], [13140, "bird's-eye view"], [131, "butcher's"]], 'a person, a camera view, rhyming slang: not eyesight');
// spy [see] takes the place of the secret-agent spy in ways of looking; shufti and dekko join gander and squiz there
{ const agent = chk(16942, 'spy'), typ = agent.typ.ways_of_looking ?? 3;
  link(14664, 'spy', 'ways_of_looking', typ, 'the looking verb (to spy, catch sight of)');
  unlinkE(agent, 'ways_of_looking', 'the secret-agent spy, not a way of looking');
  if (agent.pos !== 'noun') { A.push(`pos: ${lab(agent)} [agent] verb -> noun: the secret agent`); agent.pos = 'noun'; n++; } }
out('sight_words', [[14664, 'spy']], 'a looking verb; moves to ways of looking');
link(14685, 'shufti', 'ways_of_looking', 4, 'UK slang for a look, like gander and squiz');
link(14686, 'dekko', 'ways_of_looking', 4, 'UK slang for a look, like gander and squiz');
out('sight_words', [[14685, 'shufti'], [14686, 'dekko']], 'UK slang for a look; moves to ways of looking');
// the words for how well you see: typicality for the narrower theme, and four new words
rate(3311, 'blind', 'sight_words', 1, 'the first eyesight word');
rate(14677, 'nearsighted', 'sight_words', 1, 'a first eyesight word');
rate(14679, 'farsighted', 'sight_words', 1, 'a first eyesight word');
rate(14674, 'blurry', 'sight_words', 2, 'typical');
rate(14675, 'blurred', 'sight_words', 2, 'typical (grouped with blurry)');
rate(14678, 'myopic', 'sight_words', 3, 'the medical word for nearsighted');
rate(14681, 'hyperopic', 'sight_words', 4, 'the medical word for farsighted, specialist');
rate(14684, 'eagle-eyed', 'sight_words', 3, 'very good eyesight');
{ const cb = newRoot('color-blind', { pos: 'adjective', fam: 2 }, 'unable to tell some colors apart (Merriam-Webster headword color-blind)');
  newAlias('colour-blind', cb, 'spelling', ['UK'], 2, 'the UK spelling (Oxford)');
  linkE(cb, 'sight_words', 2, 'an eyesight condition');
  linkE(newRoot('double vision', { pos: 'noun', fam: 2 }, 'seeing two of everything'), 'sight_words', 2, 'an eyesight problem');
  linkE(newRoot('astigmatism', { pos: 'noun', fam: 3 }, 'blurred sight from an unevenly curved eye'), 'sight_words', 3, 'an eyesight condition');
  // familiarity 3, not 2: UK eye tests say 6/6, so a general UK adult knows the term less (and it is not in the frequency list: rating-vs-zipf)
  linkE(newRoot('20/20 vision', { pos: 'noun', fam: 3 }, 'normal sharp eyesight'), 'sight_words', 2, 'normal eyesight'); }
{ const ls = chk(14680, 'longsighted');
  if (ls.aliasKind !== 'regional') { A.push(`alias kind: ${lab(ls)} [UK] of farsighted 14679 spelling -> regional: the UK word, not a spelling (as shortsighted 14676 is for nearsighted)`); ls.aliasKind = 'regional'; n++; } }

// ---------- 3. hearing words ----------
A.push('3. hearing words');
setT('hearing_words', 'note', 'hearing and listening: hear, listen, deaf, overhear, eavesdrop, earshot, hearing aid, tinnitus', 'what the theme holds now');
setT('hearing_words', 'ident', 2, 'without the sound words, four members (hear, listen, deaf, hearing aid) name it at once');
out('hearing_words', [[11136, 'loud'], [14698, 'quiet'], [14706, 'deafening'], [14709, 'muffled'], [6094, 'timbre']], 'a sound quality: sound qualities holds it');
out('hearing_words', [[14711, 'decibel'], [41873, 'hertz'], [14701, 'echo'], [3537, 'ultrasound'], [14721, 'infrasound'], [14726, 'resonance'], [14700, 'volume'],
  [14714, 'acoustic']], 'a word about sound: acoustics words holds it');
out('hearing_words', [[14710, 'pitch'], [14723, 'frequency']], 'a second copy of pitch [music] 6069 / frequency [radio] 35258, which acoustics words holds');
out('hearing_words', [[14696, 'sound'], [14697, 'noise'], [14713, 'audio'], [14718, 'sonic'], [14724, 'amplify'], [14725, 'reverberate'], [14727, 'hush']], 'a word about sound, not hearing');
out('hearing_words', [[14728, 'din'], [14729, 'racket'], [14730, 'cacophony']], 'a word for noise: moves to words for noise');
out('hearing_words', [[14699, 'whisper'], [14735, 'hearsay'], [7333, 'earphones']], 'speaking, law, audio gear: not hearing');
addToGroup('hearing_words', [3312, 14717], 'stone deaf is a stronger form of deaf: one answer (LIBRARY-RULES Overlap)');

// ---------- 4. words for noise ----------
A.push('4. words for noise (new)');
makeTheme('words_for_noise', 'words for noise', 'words_for_old', { pop: 2, ident: 2, note: 'din, racket, uproar, commotion, hubbub, clamor, cacophony' },
  'synonyms of noise, beside words for bad, old, strange (din, racket and cacophony were in hearing words)');
link(14728, 'din', 'words_for_noise', 1, 'loud noise');
link(14729, 'racket', 'words_for_noise', 1, 'loud noise');
link(14730, 'cacophony', 'words_for_noise', 3, 'harsh mixed noise');
link(27838, 'hubbub', 'words_for_noise', 2, 'noisy busy sound');
link(27797, 'hullabaloo', 'words_for_noise', 3, 'noisy fuss');
link(67075, 'rumpus', 'words_for_noise', 3, 'noisy disturbance');
linkE(newRoot('uproar', { pos: 'noun', fam: 2 }, 'loud noisy disturbance'), 'words_for_noise', 1, 'loud noise');
linkE(newRoot('commotion', { pos: 'noun', fam: 2 }, 'noisy confusion'), 'words_for_noise', 2, 'noisy confusion');
linkE(newRoot('ruckus', { pos: 'noun', fam: 3 }, 'noisy disturbance (common in the US)'), 'words_for_noise', 2, 'noisy disturbance');
{ const c = newRoot('clamor', { pos: 'noun', fam: 3 }, 'loud continuous noise (US spelling)');
  newAlias('clamour', c, 'spelling', ['UK'], 3, 'the UK spelling');
  linkE(c, 'words_for_noise', 2, 'loud noise'); }
linkE(newRoot('tumult', { pos: 'noun', fam: 3 }, 'loud confused noise'), 'words_for_noise', 3, 'loud confused noise');

// ---------- 5. smell words ----------
A.push('5. smell words');
setT('smell_words', 'note', 'words for smells and smelling: scent, aroma, odor, stench, whiff, sniff, musty, pungent', 'what the theme holds now');
out('smell_words', [[3183, 'nose']], 'the organ: sense organs holds it');
out('smell_words', [[3740, 'perfume'], [14759, 'musk'], [14760, 'incense'], [9459, 'sniffer dog'], [14766, 'smelling salts'], [14765, 'scratch and sniff']], 'a thing, not a word for a smell');
out('smell_words', [[14764, 'nasal'], [14775, 'sniffle']], 'a voice quality / crying, not smelling');

// ---------- 6. touch words ----------
A.push('6. touch words');
setT('touch_words', 'note', 'touching and feeling: feel, stroke, pat, tickle, pinch, rub, tingle, numb, goosebumps', 'what the theme holds now');
for (const [id, text, typ] of [[14803, 'hard', 2], [14804, 'sticky', 2], [14809, 'slippery', 2], [14825, 'gooey', 3], [14827, 'clammy', 4]])
  link(id, text, 'texture_words', typ, 'a texture (was in touch words only)');
addToGroup('texture_words', [14804, 14826], 'sticky and tacky are one answer');
out('touch_words', [[11137, 'soft'], [14801, 'rough'], [14802, 'smooth'], [14803, 'hard'], [14804, 'sticky'], [14805, 'slimy'], [14806, 'fuzzy'], [14807, 'prickly'],
  [14808, 'bumpy'], [14809, 'slippery'], [14810, 'squishy'], [14821, 'velvety'], [14822, 'silky'], [14823, 'gritty'], [14824, 'coarse'], [14825, 'gooey'],
  [14826, 'tacky'], [14827, 'clammy'], [14828, 'spongy'], [14829, 'leathery'], [14830, 'fleecy'], [14831, 'abrasive'], [14842, 'sandpapery'], [14843, 'nubbly'],
  [14811, 'wet']], 'a texture: texture words holds the textures');
out('touch_words', [[14820, 'grope'], [14835, 'fondle'], [14837, 'feel up']], 'a sexual sense');
out('touch_words', [[60780, 'mechanoreceptor'], [60781, 'paresthesia'], [60782, 'somatosensory']], 'a specialist term');

// ---------- 7, 8. ear parts, eye parts ----------
A.push('7. ear parts');
out('ear_parts', [[3275, 'cartilage']], 'a tissue, not a part of the ear');
out('ear_parts', [[3352, 'earwax'], [14793, 'cerumen']], 'a substance, not a part of the ear');
A.push('8. eye parts');
out('eye_parts', [[14872, 'tear']], 'a liquid, not a part of the eye');
out('eye_parts', [[3203, 'eyebrow']], 'above the eye, a part of the face');
out('eye_parts', [[14864, 'pupillary']], 'an adjective, not a part');

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const themeless = [...alone].filter(id => ix.entry.get(id) && !linkIds(P, E(id)).length).map(id => lab(E(id)));

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (the library or export code changed since it was written: compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}")`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${name(id)} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const toAlias = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(name);
cmp.push(`root -> alias rows ${toAlias.length}: ${toAlias.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${name(x1.ids[firstLinkShift])}) on, link positions move`}`);
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['The senses branch (Body & Health > senses): senses a folder, new sense organs and words for noise, sight words renamed eyesight, the sense themes trimmed to their own words, ear and eye parts trimmed; spy and longsighted fixed.',
  ...A.map(x => /^\d+\./.test(x) ? x : '  ' + x),
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch421-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
