// Run: node --test tests/core.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { connect } from 'node:net';
import { networkInterfaces } from 'node:os';
import { parseOutline, formatOutline } from '../js/outline.js';
import { newProject, addEntry, reindex, themeStats, themeRoots, themeCounts, touchedThemes, difficultyBand, eff, deleteEntry, deleteTheme, unlinkEntry, moveTheme, descendants, blendRatings, themeDifficulty, mergeRegions, updateIndex, indexEntry, placeTheme, entryDefaults, sortByKey, flagKey } from '../js/model.js';
import { sig } from '../js/dom.js';
import { serializeProject, parseProject } from '../js/store.js';
import { validate, nameLeak } from '../js/validate.js';
import { buildExport, capLines, reportLists } from '../js/export.js';
import { parseFreq, setFreq, zipf, loadFreq, freqLoaded } from '../js/freq.js';
import { setBreaks, loadBreaks, breaksLoaded } from '../js/breaks.js';
import { isFamily, familyPairs, clashGroups } from '../js/family.js';
import { setKin } from '../js/model.js';
import { FAMILY_OK } from '../js/family-allow.js';

const tree = `Things:
  fruits
    citrus
  colors [adult]
    shades of blue [complete] -- navy, sky
    wild [region:US,UK] [sensitive]
`;
function project() {
  const P = newProject();
  P.themes = parseOutline(tree).themes;
  return P;
}

test('outline round-trips', () => {
  const { themes, errors } = parseOutline(tree);
  assert.deepEqual(errors, []);
  assert.equal(themes.length, 6);
  assert.equal(themes[0].group, true);
  assert.equal(themes[3].adult, true);
  assert.deepEqual(themes[5].region, ['US', 'UK']);
  assert.equal(formatOutline(themes), tree);
});

test('the real skeleton parses cleanly and ids are unique', () => {
  const { themes, errors } = parseOutline(readFileSync(new URL('../data/themes.txt', import.meta.url), 'utf8'));
  assert.deepEqual(errors, []);
  assert.equal(new Set(themes.map(t => t.id)).size, themes.length);
  assert.ok(themes.filter(t => !t.group).length > 2000);
  for (const t of themes) if (t.parent) assert.ok(themes.find(x => x.id === t.parent), t.name);
});

test('flags inherit down the tree', () => {
  const P = project(); reindex(P);
  assert.equal(eff(P, 'shades_of_blue').adult, true);
  assert.equal(eff(P, 'citrus').adult, false);
  assert.deepEqual(eff(P, 'wild').region, ['US', 'UK']);
});

test('aliases take the root themes and the harder rating', () => {
  const P = project();
  const couch = addEntry(P, 'sofa', { fam: 1, typ: { fruits: 1 } });
  const settee = addEntry(P, 'settee', { fam: 3, aliasOf: couch.id, aliasKind: 'synonym' });
  reindex(P);
  assert.equal(themeStats(P, 'fruits').roots, 1);
  assert.equal(themeStats(P, 'fruits').entries, 2);
  assert.equal(themeRoots(P, 'fruits'), 1);   // the tree's fast count agrees
  settee.enabled = false; assert.equal(themeRoots(P, 'fruits'), themeStats(P, 'fruits').roots); settee.enabled = true;
  assert.equal(difficultyBand(P, settee, 'fruits'), 3);
  settee.typ.fruits = 2;
  assert.equal(difficultyBand(P, settee, 'fruits'), 3);   // its own popularity (2) is easier than how well known it is (3)
  deleteEntry(P, couch); reindex(P);
  assert.equal(settee.aliasOf, 0);
  assert.equal(difficultyBand(P, settee, 'fruits'), 3);   // now a root: the harder of its theme rating (2) and its own rating (3)
});

test('same text needs a gloss; duplicates are errors', () => {
  const P = project();
  addEntry(P, 'bat', { typ: { fruits: 1 }, gloss: 'animal' });
  addEntry(P, 'bat', { typ: { citrus: 1 } });
  addEntry(P, 'bat', { typ: { citrus: 1 } });
  reindex(P);
  const kinds = validate(P).map(i => i.kind);
  assert.ok(kinds.includes('needs-gloss'));
  assert.ok(kinds.includes('duplicate'));
});

test('project file round-trips and keeps defaults out', () => {
  const P = project();
  addEntry(P, 'lemon', { fam: 1, typ: { citrus: 1, fruits: 2 } });
  const text = serializeProject(P);
  assert.ok(!text.includes('"adult":false'.replace('adult', 'vulgar')));
  const Q = parseProject(text);
  assert.equal(Q.entries.length, 1);
  assert.deepEqual(Q.entries[0].typ, { citrus: 1, fruits: 2 });
  assert.equal(Q.entries[0].vulgar, false);
  assert.equal(Q.themes.length, P.themes.length);
});

test('moving a theme keeps outline order', () => {
  const P = project(); reindex(P);
  moveTheme(P, 'citrus', 'colors'); reindex(P);
  assert.equal(P.ix.theme.get('citrus').parent, 'colors');
  assert.deepEqual(descendants(P, 'colors').map(t => t.id), ['shades_of_blue', 'wild', 'citrus']);
  assert.throws(() => moveTheme(P, 'colors', 'shades_of_blue'));
});

test('export filters by flag, drops thin themes, promotes aliases', () => {
  const P = project();
  // 5 clean words in fruits, one adult-theme word set, aliases of a vulgar root.
  for (const w of ['apple', 'pear', 'plum', 'fig', 'grape']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  for (const w of ['navy', 'sky', 'teal', 'cyan']) addEntry(P, w, { fam: 2, typ: { shades_of_blue: 2 } });
  const rude = addEntry(P, 'rude', { fam: 2, vulgar: true, typ: { fruits: 3 } });
  addEntry(P, 'cheeky', { fam: 2, aliasOf: rude.id, aliasKind: 'synonym' });
  reindex(P);
  const all = buildExport(P);
  assert.equal(all.file.entries.text.length, 11);
  assert.equal(all.file.themes.filter(r => !(r[3] & 32)).length, 2);

  const family = buildExport(P, { adult: 'exclude', vulgar: 'exclude' });
  // the adult "colors" branch goes, so shades_of_blue disappears; vulgar root goes, its alias stays as a root
  assert.equal(family.file.entries.text.length, 6);
  assert.ok(family.file.entries.text.includes('cheeky'));
  assert.equal(family.file.entries.root[family.file.entries.text.indexOf('cheeky')], 0);
  assert.equal(family.file.themes.filter(r => !(r[3] & 32)).length, 1);

  const only = buildExport(P, { adult: 'only' });
  assert.equal(only.file.entries.text.length, 4);

  const noVariants = buildExport(P, { synonyms: false });
  assert.ok(!noVariants.file.entries.text.includes('cheeky'));
  const z = (setFreq(parseFreq('60 apple pear\n45 plum')), buildExport(P, { zipf: true }));
  assert.equal(z.file.entries.zipf[0], 60);
});

test('difficulty is a one-decimal blend of the ratings', () => {
  assert.equal(blendRatings(4, 4), 4);
  assert.equal(blendRatings(1, 5), 3.8);    // 0.7 x 5 + 0.3 x 1
  assert.equal(blendRatings(5, 1), 3.8);    // order does not matter
  assert.equal(blendRatings(3, 0), 3);      // one rating alone is the value
  assert.equal(blendRatings(0, 0), 0);      // unrated
  assert.equal(themeDifficulty({ ident: 3, pop: 3 }), 3);
  assert.equal(themeDifficulty({ ident: 3, pop: 1 }), 2);     // a popular theme is a step easier
  assert.equal(themeDifficulty({ ident: 4, pop: 5 }), 5);
  assert.equal(themeDifficulty({ ident: 5, pop: 5 }), 5);     // kept within 1 to 5
  assert.equal(themeDifficulty({ ident: 1, pop: 1 }), 1);
  assert.equal(themeDifficulty({ ident: 2, pop: 0 }), 2);     // popularity unrated: identifiability alone
  assert.equal(themeDifficulty({ ident: 0, pop: 2 }), 0);     // identifiability unrated: no value
});

test('zipf combines phrases', () => {
  setFreq(parseFreq('50 ice\n50 cream'));
  assert.equal(zipf('ice'), 5);
  assert.equal(zipf('ice cream'), 4.7);
  assert.equal(zipf('ice zzz'), null);
});

test('export format 4: shown text, display form and clash ids travel with the link', () => {
  const P = project();
  const rain = addEntry(P, 'rain', { fam: 1, typ: { fruits: 1 } }), rainy = addEntry(P, 'rainy', { pos: 'adjective', fam: 2, aliasOf: rain.id, aliasKind: 'form' });
  const fall = addEntry(P, 'rainfall', { fam: 2, typ: { fruits: 2 } });
  const garden = addEntry(P, 'rock garden', { fam: 3, typ: { fruits: 3 } });
  for (const w of ['fig', 'plum']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  P.themes.find(t => t.id === 'fruits').groups = [[rain.id, fall.id]];
  rain.use = { fruits: rainy.id }; garden.show = { fruits: 'rock' };
  reindex(P);
  const { file } = buildExport(P), c = file.entries, at = text => c.text.indexOf(text);
  const link = text => { let o = 0; for (let k = 0; k < at(text); k++) o += c.linkCount[k] * 4; return c.links.slice(o, o + 4); };
  assert.equal(file.v, 4);
  assert.deepEqual(file.shown[link('rock garden')[3] - 1], ['rock', 0, []]);
  assert.deepEqual(file.shown[link('rain')[3] - 1], ['rainy', 2, []]);
  assert.equal(link('rain')[1], 1.7);                                 // the form's own familiarity (2) counts: 0.7 x 2 + 0.3 x 1 (typicality)
  assert.equal(link('fig')[3], 0);
  assert.ok(c.clash[at('rain')] > 0 && c.clash[at('rain')] === c.clash[at('rainfall')] && c.clash[at('fig')] === 0);
  assert.ok(validate(P).every(x => !/not one of its forms|display text/.test(x.msg)));
});

test('theme-name-long: warns above 30 characters (code points), not at 30', () => {
  const P = newProject();
  const T = (id, name) => ({ id, name, parent: null, group: false, enabled: true, region: [] });
  P.themes.push(T('ok30', 'a'.repeat(30)), T('long31', 'b'.repeat(31)), T('maori', 'Māori ' + 'c'.repeat(24)));
  reindex(P);
  const w = validate(P).filter(i => i.kind === 'theme-name-long');
  assert.deepEqual(w.map(i => i.themeId), ['long31']);
});

test('theme-name check: the collected thing alone is fine, longer text and other name words are not', () => {
  const T = name => ({ id: 'x', name }), E = text => ({ text, nameOkIn: [] });
  assert.equal(nameLeak(T('pants and shorts'), E('pants')), null);
  assert.equal(nameLeak(T('garden bugs'), E('bug')), null);
  assert.equal(nameLeak(T('garden bugs'), E('pill bug')), 'bug');
  assert.equal(nameLeak(T('soups'), E('tomato soup')), 'soup');
  assert.equal(nameLeak(T('police words'), E('police')), 'police');
  assert.equal(nameLeak(T('water park'), E('water')), 'water');
});

test('validate warns when a US-tagged spelling alias sits under a non-US root', () => {
  const P = newProject();
  const r = addEntry(P, 'theatre'), a = addEntry(P, 'theater', { aliasOf: r.id, aliasKind: 'spelling', region: ['US'] });
  reindex(P);
  assert.ok(validate(P).some(x => /alias-us-root/.test(x.kind || x.code || '') || /US spelling/.test(x.msg)));
  r.region = ['US']; a.region = ['UK']; reindex(P);
  assert.ok(!validate(P).some(x => /US spelling/.test(x.msg)));
});

test('validate checks that a rule naming a category theme points at an existing theme', () => {
  const P = newProject();
  P.themes.push({ id: 'colors', name: 'colors', parent: null, group: false, enabled: true, region: [] });
  P.themes.push({ id: 'starts_with_a_color', name: 'starts with a color', parent: null, group: false, enabled: true, tkind: 'wordplay', rule: 'starts:@colors', region: [] });
  reindex(P);
  assert.ok(!validate(P).some(x => /no theme with the id/.test(x.msg)));
  P.themes.find(t => t.id === 'starts_with_a_color').rule = 'starts:@nosuch'; reindex(P);
  assert.ok(validate(P).some(x => /no theme with the id nosuch/.test(x.msg)));
});

test('export: longest entry in words counts words split on whitespace', () => {
  const P = project();
  for (const w of ['apple', 'pear', 'plum', 'grapes', 'star fruit']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  reindex(P);
  const t = buildExport(P, { maxEntryWords: 1 }).file.entries.text;
  assert.ok(t.includes('grapes'));
  assert.ok(!t.includes('star fruit'));
});

test('dialog save keeps region codes that have no tick-box', () => {
  assert.deepEqual(mergeRegions(['US', 'BR', 'JP'], ['UK']), ['UK', 'BR', 'JP']);
  assert.deepEqual(mergeRegions(['US', 'UK'], []), []);
  assert.deepEqual(mergeRegions([], ['US']), ['US']);
});

test('deleting a root gives the promoted alias the root rating in each theme', () => {
  const P = project();
  const root = addEntry(P, 'couch', { fam: 1, typ: { fruits: 1 } });
  const al = addEntry(P, 'divan', { fam: 4, aliasOf: root.id, aliasKind: 'synonym' });
  reindex(P);
  deleteEntry(P, root); reindex(P);
  assert.equal(al.aliasOf, 0);
  assert.equal(al.typ.fruits, 1);
});

test('B12: deleting a theme or an entry, or unlinking, leaves no stale reference', () => {
  const P = project();
  const fr = P.themes.find(t => t.id === 'fruits'), ci = P.themes.find(t => t.id === 'citrus');
  const rain = addEntry(P, 'rain', { typ: { fruits: 1, citrus: 2 }, show: { citrus: 'r' }, nameOkIn: ['fruits', 'citrus'] });
  const rainy = addEntry(P, 'rainy', { aliasOf: rain.id, aliasKind: 'form' });
  const fall = addEntry(P, 'rainfall', { typ: { fruits: 2, citrus: 2 } }), fig = addEntry(P, 'fig', { typ: { fruits: 1, citrus: 1 } });
  rain.use = { fruits: rainy.id, citrus: rainy.id };
  fr.groups = [[rain.id, fall.id, fig.id], [7, 8]]; ci.groups = [[rain.id, fall.id]];
  P.themes.push({ id: 'starts_fruit', name: 'starts with a fruit', parent: null, group: false, enabled: true, tkind: 'wordplay', rule: 'starts:@fruits', region: [] });
  reindex(P);
  // a theme named in another theme's rule cannot go, and nothing changes
  const before = structuredClone(P.entries);
  assert.throws(() => deleteTheme(P, 'fruits'), /starts with a fruit/);
  assert.deepEqual(P.entries, before);
  // deleting citrus drops its shown text, form used and name allowance
  deleteTheme(P, 'citrus'); reindex(P);
  assert.deepEqual([rain.typ, rain.show, rain.use, rain.nameOkIn], [{ fruits: 1 }, {}, { fruits: rainy.id }, ['fruits']]);
  // unlinking drops the form used, the name allowance and the synonym group place; an untouched group stays as it was
  unlinkEntry(P, rain, 'fruits'); reindex(P);
  assert.deepEqual([rain.use, rain.nameOkIn, fr.groups], [{}, [], [[fall.id, fig.id], [7, 8]]]);
  // deleting an entry takes it out of the groups (a group left with one member goes) and out of other entries' use
  rain.typ.fruits = 1; rain.use = { fruits: rainy.id }; fr.groups = [[rain.id, fall.id], [7, 8]]; reindex(P);
  deleteEntry(P, rainy); deleteEntry(P, fall); reindex(P);
  assert.deepEqual([rain.use, fr.groups], [{}, [[7, 8]]]);
  assert.ok(!validate(P).some(i => /^(group-small|rule-theme)$/.test(i.kind)));
});

test('B19: the promoted alias takes the root place: links, groups, meaning flags, region, shown text; a spelling is preferred', () => {
  const P = project();
  const fr = P.themes.find(t => t.id === 'fruits');
  const root = addEntry(P, 'color', { fam: 1, typ: { fruits: 2 }, adult: true, sensitive: true, tm: true, vulgar: true, region: ['US'], show: { fruits: 'col' }, nameOkIn: ['fruits'] });
  const syn = addEntry(P, 'hue', { fam: 3, aliasOf: root.id, aliasKind: 'synonym' });
  const sp = addEntry(P, 'colour', { fam: 1, aliasOf: root.id, aliasKind: 'spelling', region: ['UK'] });
  const form = addEntry(P, 'colors', { aliasOf: root.id, aliasKind: 'form' });
  const other = addEntry(P, 'tint', { typ: { fruits: 3 } });
  root.use = { fruits: form.id }; fr.groups = [[root.id, other.id]];
  reindex(P);
  deleteEntry(P, root); reindex(P);
  assert.equal(sp.aliasOf, 0);   // the spelling, not the first alias, takes the root place
  assert.deepEqual([syn.aliasOf, syn.aliasKind, form.aliasOf, form.aliasKind], [sp.id, 'synonym', sp.id, 'form']);
  assert.deepEqual([sp.typ, sp.show, sp.use, sp.nameOkIn, sp.region], [{ fruits: 2 }, { fruits: 'col' }, { fruits: form.id }, ['fruits'], ['UK']]);
  assert.deepEqual([sp.adult, sp.sensitive, sp.tm, sp.vulgar], [true, true, true, true]);
  assert.deepEqual(fr.groups, [[sp.id, other.id]]);

  // another word promoted: meaning flags and region only; the root's spellings and abbreviations become its synonyms
  const Q = project(), qf = Q.themes.find(t => t.id === 'fruits');
  const r = addEntry(Q, 'personal computer', { typ: { fruits: 1 }, sensitive: true, tm: true, region: ['US'], show: { fruits: 'computer' }, nameOkIn: ['fruits'] });
  const home = addEntry(Q, 'home computer', { aliasOf: r.id, aliasKind: 'synonym' });
  const pc = addEntry(Q, 'PC', { aliasOf: r.id, aliasKind: 'abbreviation' });
  const x = addEntry(Q, 'laptop', { typ: { fruits: 1 } });
  qf.groups = [[r.id, x.id], [home.id, 99]];   // the promoted word already in a group: the two groups become one
  reindex(Q);
  deleteEntry(Q, r); reindex(Q);
  assert.deepEqual([home.aliasOf, home.sensitive, home.tm, home.region, home.show, home.nameOkIn], [0, true, false, ['US'], { fruits: 'computer' }, []]);
  assert.deepEqual([pc.aliasOf, pc.aliasKind], [home.id, 'synonym']);
  assert.deepEqual(qf.groups.map(g => [...g].sort((a, b) => a - b)), [[x.id, home.id, 99].sort((a, b) => a - b)]);
});

test('loadFreq fails on an HTTP error or an empty list and leaves the list unloaded', async () => {
  const realFetch = globalThis.fetch, reply = (status, body) => async () => new Response(body, { status });
  try {
    setFreq(null);
    globalThis.fetch = reply(404, 'not found');
    await assert.rejects(loadFreq('x'));
    assert.equal(freqLoaded(), false);
    globalThis.fetch = reply(200, '');
    await assert.rejects(loadFreq('x'));
    assert.equal(freqLoaded(), false);
    globalThis.fetch = reply(200, '50 ice\n');
    await loadFreq('x');
    assert.equal(zipf('ice'), 5);
  } finally { globalThis.fetch = realFetch; setFreq(null); }
});

test('loadBreaks fails on an HTTP error or an empty table; a loaded table puts break points in the export', async () => {
  const realFetch = globalThis.fetch, reply = (status, body) => async () => new Response(body, { status });
  const P = newProject(); P.themes = parseOutline('fruits\n').themes;
  for (const w of ['apple', 'pear', 'plum', 'fig', 'grapefruit']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  reindex(P);
  const brk = f => f.entries.breaks[f.entries.text.indexOf('grapefruit')];
  try {
    setBreaks(new Map());
    globalThis.fetch = reply(404, 'not found');
    await assert.rejects(loadBreaks('x'));
    globalThis.fetch = reply(200, '');
    await assert.rejects(loadBreaks('x'));
    assert.equal(breaksLoaded(), false);
    assert.deepEqual(brk(buildExport(P).file), []);
    globalThis.fetch = reply(200, 'grapefruit=grape-fruit\n');
    await loadBreaks('x');
    assert.equal(breaksLoaded(), true);
    const { file } = buildExport(P);
    assert.deepEqual(brk(file), [5]);
    assert.equal(file.entries.breaks.length, file.entries.text.length);
    assert.equal(file.themeFields.at(-1), 'breaks');
  } finally { globalThis.fetch = realFetch; setBreaks(new Map()); }
});

test('the break table is applied to English libraries only', async () => {
  const realFetch = globalThis.fetch;
  const P = newProject(); P.themes = parseOutline('fruits\n').themes;
  for (const w of ['apple', 'pear', 'plum', 'fig', 'grapefruit']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  reindex(P);
  const brk = f => f.entries.breaks[f.entries.text.indexOf('grapefruit')];
  try {
    globalThis.fetch = async () => new Response('grapefruit=grape-fruit\n', { status: 200 });
    await loadBreaks('x');
    assert.deepEqual(brk(buildExport(P).file), [5]);
    P.lang = 'fr';
    const { file } = buildExport(P);
    assert.deepEqual(brk(file), []);
    assert.equal(file.entries.breaks.length, file.entries.text.length);
    assert.equal(file.themeFields.at(-1), 'breaks');
  } finally { globalThis.fetch = realFetch; setBreaks(new Map()); }
});

test('parseProject works out nextId for 200,000 entries without overflowing the stack', () => {
  const P = newProject();
  P.themes = parseOutline('fruits\n').themes;
  P.entries = Array.from({ length: 200000 }, (_, i) => ({ id: i + 1, text: 'w' + i }));
  P.nextId = 1;
  const Q = parseProject(serializeProject(P));
  assert.equal(Q.entries.length, 200000);
  assert.equal(Q.nextId, 200001);
});

test('outline [id:] tag: written when the id is not the slug of the name, read back, and used by the children', async () => {
  const { mergeOutline } = await import('../js/outline.js');
  const P = project();
  const dairy = P.themes.find(t => t.id === 'fruits');
  dairy.name = 'dairy';
  const text = formatOutline(P.themes);
  assert.match(text, /^ {2}dairy \[id:fruits\]$/m);
  assert.ok(!/citrus \[id:/.test(text));
  const { themes, errors } = parseOutline(text);
  assert.deepEqual(errors, []);
  assert.equal(themes.find(t => t.name === 'dairy').id, 'fruits');
  assert.equal(themes.find(t => t.name === 'citrus').parent, 'fruits');
  assert.deepEqual(mergeOutline(P, text), { added: 0, changed: 0, errors: [] });
  assert.equal(P.themes.length, 6);
  // A line without the tag behaves as before: matched by the slug of its name.
  assert.equal(parseOutline('dairy\n  milk\n').themes[1].parent, 'dairy');
});

test('outline merge writes only what differs, counts real changes and leaves fields the outline cannot carry alone', async () => {
  const { mergeOutline } = await import('../js/outline.js');
  const P = project(), c = P.themes.find(t => t.id === 'citrus');
  Object.assign(c, { tkind: 'list', rule: 'r', locked: true, nameOk: ['x'], groups: [['a', 'b']] });
  delete c.foreign; delete c.ident;
  const before = structuredClone(c);
  let r = mergeOutline(P, formatOutline(P.themes));
  assert.deepEqual([r.added, r.changed], [0, 0]);
  assert.deepEqual(c, before);   // absent keys stay absent
  r = mergeOutline(P, formatOutline(P.themes).replace(/^( +)citrus$/m, '$1citrus [pop:2] -- sour'));
  assert.deepEqual([r.added, r.changed], [0, 1]);
  assert.deepEqual(c, { ...before, pop: 2, note: 'sour' });
});

test('outline round trip of the real library changes nothing (format, parse, merge as the app does)', async () => {
  const { mergeOutline } = await import('../js/outline.js');
  const { sortDepthFirst } = await import('../js/model.js');
  const P = parseProject(readFileSync(new URL('../data/wordlist-en.project.json', import.meta.url), 'utf8'));
  const before = structuredClone(P.themes);
  const text = formatOutline(P.themes);
  const r = mergeOutline(P, text);
  sortDepthFirst(P); reindex(P);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([r.added, r.changed], [0, 0]);
  assert.equal(P.themes.length, before.length);
  assert.deepEqual(P.themes.map(t => [t.id, t.parent]), before.map(t => [t.id, t.parent]));
  assert.deepEqual(P.themes, before);
});

test('case lint runs in validate: a capital shown on an entry typed common is a case-cap-common warning', async () => {
  const { caseLint } = await import('../js/caselint.js');
  const P = project();
  addEntry(P, 'zembla onion', { fam: 3, typ: { fruits: 3 }, show: { fruits: 'Zembla' } });
  addEntry(P, 'Zembla onion', { type: 'proper', fam: 3, typ: { citrus: 3 }, show: { citrus: 'Zembla' } });
  addEntry(P, 'X-ray', { fam: 1, typ: { fruits: 1 } });   // letter-shaped: fine in the lint and in the entry check
  reindex(P);
  assert.deepEqual(caseLint(P).map(i => [i.kind, i.themeId]), [['cap-common', 'fruits']]);
  const v = validate(P).filter(i => /^case/.test(i.kind));
  assert.deepEqual(v.map(i => [i.sev, i.kind, i.themeId]), [['warn', 'case-cap-common', 'fruits']]);
});

test('case lint bare-stub: one issue per link, and the full term is found through a plural theme word', async () => {
  const { caseLint } = await import('../js/caselint.js');
  const P = newProject();
  P.themes = parseOutline('Things:\n  apple pies\n  cakes and cake pops\n').themes;
  addEntry(P, 'Cherry', { fam: 1, typ: { apple_pies: 1 } }); addEntry(P, 'cherry pie', { fam: 1 });
  addEntry(P, 'Carrot', { fam: 1, typ: { cakes_and_cake_pops: 1 } }); addEntry(P, 'carrot cake', { fam: 1 });
  reindex(P);
  const stubs = caseLint(P).filter(i => i.kind === 'bare-stub').map(i => i.themeId).sort();
  assert.deepEqual(stubs, ['apple_pies', 'cakes_and_cake_pops']);
});

test('case lint lower-proper-word: a lowercase phrase with a nationality word is flagged, the capitalised proper entry is not', async () => {
  const { caseLint } = await import('../js/caselint.js');
  const { LOWER_OK } = await import('../js/caselint-words.js');
  const P = project();
  const a = addEntry(P, 'french fries', { fam: 1, typ: { fruits: 1 } });
  addEntry(P, 'French toast', { type: 'proper', fam: 1, typ: { fruits: 1 } });
  addEntry(P, 'french', { fam: 1, typ: { fruits: 1 } });   // one word alone is not judged by this rule
  const b = addEntry(P, 'venetian blind', { fam: 2, typ: { fruits: 2 } });
  const added = !LOWER_OK.has(b.id); LOWER_OK.add(b.id);   // judged right in lowercase (the real list holds library ids, so leave it as it was)
  reindex(P);
  try { assert.deepEqual(caseLint(P).filter(i => i.kind === 'lower-proper-word').map(i => i.entryId), LOWER_OK.has(a.id) ? [] : [a.id]); }
  finally { if (added) LOWER_OK.delete(b.id); }
});

test('case lint style-capital: a style word shown with a capital in a theme of styles is flagged, a name is not', async () => {
  const { caseLint } = await import('../js/caselint.js');
  const P = newProject();
  P.themes = parseOutline('Things:\n  building styles\n  historical periods\n').themes;
  addEntry(P, 'Gothic', { type: 'proper', fam: 2, typ: { building_styles: 2 } });
  addEntry(P, 'Art Deco', { type: 'proper', fam: 2, typ: { building_styles: 2 } });
  addEntry(P, 'baroque', { fam: 3, typ: { building_styles: 3 } });
  addEntry(P, 'Victorian', { type: 'proper', fam: 2, typ: { building_styles: 2 } });
  addEntry(P, 'Renaissance', { type: 'proper', fam: 2, typ: { historical_periods: 1 } });   // the period, in a theme of periods
  reindex(P);
  assert.deepEqual(caseLint(P).filter(i => i.kind === 'style-capital').map(i => P.ix.entry.get(i.entryId).text).sort(), ['Art Deco', 'Gothic']);
});

test('case lint checks a link an alias holds itself (B22), not the links it only inherits from its root', async () => {
  const { caseLint } = await import('../js/caselint.js');
  const P = project();
  const r = addEntry(P, 'ladybug', { fam: 1, typ: { fruits: 1 } });
  addEntry(P, 'ladybird', { fam: 1, aliasOf: r.id, aliasKind: 'regional', region: ['UK'], typ: { citrus: 2 }, show: { citrus: 'Lady', fruits: 'Lady' } });
  reindex(P);
  assert.deepEqual(caseLint(P).map(i => [i.kind, i.themeId, P.ix.entry.get(i.entryId).text]), [['cap-common', 'citrus', 'ladybird']]);
});

test('validate reports a type or part of speech that is not in the lists (B14, B23)', () => {
  const P = newProject();
  const a = addEntry(P, 'South Beach diet', { type: 'name' }), b = addEntry(P, 'single room', { pos: 'noun phrase' }); addEntry(P, 'fine');
  reindex(P);
  const v = validate(P);
  assert.deepEqual(v.filter(x => x.kind === 'bad-type').map(x => x.entryId), [a.id]);
  assert.deepEqual(v.filter(x => x.kind === 'bad-pos').map(x => x.entryId), [b.id]);
});

test('debounce flush runs a pending call at once and only once', async () => {
  const { debounce } = await import('../js/dom.js'); let n = 0;
  const d = debounce(() => n++, 20);
  d.flush(); assert.equal(n, 0);
  d(); d.flush(); assert.equal(n, 1);
  await new Promise(r => setTimeout(r, 50)); assert.equal(n, 1);
});

test('ai: every model has a price, and cost counts cache writes at 1.25x and cache reads at the read price', async () => {
  const { MODELS, cost } = await import('../js/ai.js');
  for (const [id] of MODELS) assert.ok(cost(id, { input_tokens: 1e6 }) > 0, id);
  assert.ok(Math.abs(cost('claude-opus-5-5', { input_tokens: 1e6, output_tokens: 1e6, cache_creation_input_tokens: 1e6, cache_read_input_tokens: 1e6 }) - (4 + 20 + 5 + 0.2)) < 1e-9);
  assert.ok(Math.abs(cost('claude-haiku-5-5', { cache_read_input_tokens: 1e5 }) - 0.001) < 1e-9);   // up to 100K tokens: listed rates
  assert.ok(Math.abs(cost('claude-haiku-5-5', { input_tokens: 2e5, output_tokens: 1e5 }) - (2e5 * 0.5 + 1e5 * 2.5) / 1e6) < 1e-9);   // over 100K: 5x
  assert.ok(Math.abs(cost('claude-fable-5-2', { input_tokens: 1e6 }, 'claude-opus-5-5') - 8) < 1e-9);   // priced by the model that served it
  assert.ok(Math.abs(cost('claude-opus-4-8', { input_tokens: 1e6 }, 'claude-sonnet-5-5') - 2) < 1e-9);   // unlisted served model: the one asked for, not the Opus default
});

// E1: the indexes an edit updates in place (updateIndex) must equal a full reindex, list order included. A fresh reindex on a copy of the project is the reference.
// Compared as ids, key by key (a failed deepStrictEqual of the real library's maps takes minutes to print); the entry map must hold the very objects.
const ixOf = P => Object.fromEntries(['theme', 'kids', 'entry', 'aliases', 'byTheme', 'byText'].map(n => [n, new Map([...P.ix[n]].map(([k, v]) => [k, Array.isArray(v) ? v.map(x => x.id).join() : v]))]));
const sameAsFull = (P, step) => {
  const Q = { ...P }; reindex(Q); const a = ixOf(P), b = ixOf(Q);
  for (const n of Object.keys(a)) { assert.equal(a[n].size, b[n].size, `ix.${n} has ${a[n].size} keys, a full reindex ${b[n].size}, after ${step}`); for (const [k, v] of b[n]) assert.ok(a[n].get(k) === v, `ix.${n} "${k}" differs from a full reindex after ${step}`); }
};

test('E1: indexes updated by each edit equal a full reindex (add, text, alias, link, unlink, delete, themes)', () => {
  const P = project(); reindex(P);
  const step = (name, touch) => { updateIndex(P, touch); sameAsFull(P, name); };
  const sofa = addEntry(P, 'sofa', { typ: { fruits: 1, citrus: 2 } }); step('add', { entries: [sofa] });
  const couch = addEntry(P, 'couch', { aliasOf: sofa.id, aliasKind: 'synonym' }), lime = addEntry(P, 'lime', { typ: { citrus: 1 } });
  step('add two, one an alias', { entries: [couch, lime] });
  const settee = addEntry(P, 'Settee', { aliasOf: sofa.id, aliasKind: 'regional', typ: { colors: 3 } }); indexEntry(P, settee); sameAsFull(P, 'indexEntry');
  lime.text = 'Lime'; step('same text, other case', { entries: [lime] });
  lime.text = 'key lime'; step('text', { entries: [lime] });
  sofa.typ.colors = 2; step('link a root (its aliases follow)', { entries: [sofa] });
  unlinkEntry(P, sofa, 'fruits'); step('unlink', { entries: [sofa] });
  couch.aliasOf = lime.id; step('alias moves to another root', { entries: [couch] });
  couch.aliasOf = 0; couch.aliasKind = ''; couch.typ = { fruits: 4 }; step('alias becomes a root', { entries: [couch] });
  lime.aliasOf = sofa.id; lime.aliasKind = 'synonym'; step('root becomes an alias', { entries: [lime] });
  const navy = addEntry(P, 'navy', { typ: { shades_of_blue: 1 } }); step('add', { entries: [navy] });
  step('delete a root with aliases', deleteEntry(P, sofa));
  assert.equal(lime.aliasOf, 0); assert.equal(settee.aliasOf, lime.id);   // lime promoted, settee moved to it
  const sky = addEntry(P, 'sky', { typ: { shades_of_blue: 2 } }); step('add after a delete', { entries: [sky] });
  step('delete the promoted root', deleteEntry(P, lime));
  step('delete a theme', deleteTheme(P, 'shades_of_blue'));
  moveTheme(P, 'citrus', 'colors'); step('move a theme', { themes: true });
  assert.ok(placeTheme(P, 'citrus', 'fruits', 'before')); step('drag a theme', { themes: true });
  P.entries.splice(0, 0, Object.assign(addEntry(P, 'early', { typ: { fruits: 1 } }), {})); P.entries.pop();
  step('an entry put first (not appended): rebuilt in full', { entries: [P.entries[0]] });
  step('no touch: rebuilt in full', undefined);
});

test('E1: a seeded run of random edits on the real library keeps the indexes equal to a full reindex', () => {
  const P = parseProject(readFileSync(new URL('../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
  let seed = 7; const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % n; };
  const themes = P.themes.filter(t => !t.group).map(t => t.id), pick = () => P.entries[rnd(P.entries.length)];
  for (let i = 1; i <= 300; i++) {
    const e = pick(), k = rnd(8);
    if (k === 0) { const n = addEntry(P, 'zz' + i, { typ: { [themes[rnd(themes.length)]]: 3 } }); updateIndex(P, { entries: [n] }); }
    else if (k === 1) { e.text = e.text + ' x'; updateIndex(P, { entries: [e] }); }
    else if (k === 2) { e.typ[themes[rnd(themes.length)]] = 2; updateIndex(P, { entries: [e] }); }
    else if (k === 3) { const tid = Object.keys(e.typ)[0]; if (tid) unlinkEntry(P, e, tid); updateIndex(P, { entries: [e] }); }
    else if (k === 4) updateIndex(P, deleteEntry(P, P.ix.aliases.has(e.id) ? e : pick()));
    else if (k === 5) { const r = pick(); if (!r.aliasOf && r !== e && !P.ix.aliases.has(e.id)) { e.aliasOf = r.id; e.aliasKind = 'synonym'; } updateIndex(P, { entries: [e] }); }
    else if (k === 6 && i % 50 === 6) { const tid = themes[rnd(themes.length)]; try { updateIndex(P, deleteTheme(P, tid)); } catch { /* a rule names it */ } }
    else { const n = addEntry(P, 'yy' + i, { aliasOf: e.aliasOf || e.id, aliasKind: 'spelling' }); updateIndex(P, { entries: [n] }); }
    if (i % 75 === 0) sameAsFull(P, 'edit ' + i);
  }
});

test('B24: an alias made in the entry dialog (entryDefaults, id given at save, then filed with updateIndex) is linked to its root and indexed like a full reindex', () => {
  const P = project(); reindex(P);
  const root = addEntry(P, 'sofa', { typ: { fruits: 1 } }); updateIndex(P, { entries: [root] });
  const a = Object.assign(entryDefaults(), { aliasOf: root.id, aliasKind: 'synonym', pos: root.pos, type: root.type, text: 'couch' });
  assert.equal(a.id, 0);   // while the dialog is open the new alias has no id, so "has aliases of its own" must not look at it (a root has aliasOf 0)
  assert.ok(P.entries.some(x => x.aliasOf === a.id), 'the id-0 hazard: every root matches');
  a.id = P.nextId++; P.entries.push(a); updateIndex(P, { entries: [a] });
  sameAsFull(P, 'dialog alias');
  assert.deepEqual(P.ix.aliases.get(root.id), [a]); assert.ok(P.ix.byTheme.get('fruits').includes(a));
});

test('export-game --strict exits 1 before writing; without it (or with a clean library) the file is written', async () => {
  const { mkdtempSync, mkdirSync, cpSync, writeFileSync, existsSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os'); const { join } = await import('node:path'); const { spawnSync } = await import('node:child_process');
  const d = mkdtempSync(join(tmpdir(), 'wb-exp-')), out = join(d, 'o', 'x.json');
  try {
    cpSync(new URL('../js', import.meta.url), join(d, 'js'), { recursive: true }); mkdirSync(join(d, 'tools')); mkdirSync(join(d, 'data'));
    cpSync(new URL('../tools/export-game.mjs', import.meta.url), join(d, 'tools', 'export-game.mjs')); writeFileSync(join(d, 'data', 'freq-en.txt'), '77 the\n');
    const P = project(); addEntry(P, 'zembla onion', { fam: 3, typ: { fruits: 3 }, show: { fruits: 'Zembla' } }); reindex(P);
    writeFileSync(join(d, 'data', 'wordlist-en.project.json'), serializeProject(P));
    const run = (...a) => spawnSync(process.execPath, [join(d, 'tools', 'export-game.mjs'), 'full', out, ...a], { encoding: 'utf8' });
    let r = run('--strict'); assert.equal(r.status, 1); assert.match(r.stdout, /case lint: 1 issue/); assert.ok(!existsSync(out), 'strict failure writes nothing');
    r = run(); assert.equal(r.status, 0); assert.ok(existsSync(out)); rmSync(out);
    P.entries[0].show = {}; writeFileSync(join(d, 'data', 'wordlist-en.project.json'), serializeProject(P));
    r = run('--strict'); assert.equal(r.status, 0); assert.ok(existsSync(out));
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('E7: sortByKey (each key worked out once) gives the order of the old sort that compared key() at every step, both directions, on the real library', () => {
  const P = parseProject(readFileSync(new URL('../data/wordlist-en.project.json', import.meta.url), 'utf8'));
  const old = (list, key, dir) => { const kv = new Map(list.map(e => [e, key(e)])), kf = e => kv.get(e); return [...list].sort((a, b) => dir * (kf(a) < kf(b) ? -1 : kf(a) > kf(b) ? 1 : 0)); };
  const list = P.entries.slice(0, 9000);
  for (const key of [e => e.text.toLowerCase(), e => e.fam || 9, e => e.pos, e => e.status, flagKey, e => (e.gloss || '').length % 3])
    for (const dir of [1, -1]) assert.deepEqual(sortByKey([...list], key, dir).map(e => e.id), old(list, key, dir).map(e => e.id));
  // with a memo: reused when nothing changed, sorted again when a key, the list or the direction changed; always the order of a sort from scratch
  const memo = {}, fam = e => e.fam || 9, small = list.slice(0, 3000), same = (l, dir, why) => assert.deepEqual(sortByKey([...l], fam, dir, memo).map(e => e.id), old(l, fam, dir).map(e => e.id), why);
  same(small, 1, 'first'); same(small, 1, 'unchanged'); const out = memo.out; same(small, 1, 'again'); assert.equal(memo.out, out, 'reused');
  small[10].fam = (small[10].fam % 5) + 1; same(small, 1, 'a key changed'); assert.notEqual(memo.out, out);
  same(small, -1, 'direction'); same(small.slice(1), -1, 'list shorter'); same([small[5], ...small.slice(0, 5), ...small.slice(6)], -1, 'list reordered');
});

test('E7: sig is the same for the same h() arguments whatever the handlers, and differs when an element, attribute or text differs', () => {
  const row = (x, f) => sig('tr', { class: x.on ? '' : 'off', onclick: f }, sig('td.word', {}, x.text, x.gloss && sig('span.gloss', ` (${x.gloss})`)), sig('td', [x.pos, null, false]), sig('td', { title: x.title, checked: x.on }), sig('b', 3));
  const a = { on: true, text: 'pun', gloss: '', pos: 'n', title: 't' };
  assert.equal(row(a, () => 1), row({ ...a }, () => 2));
  for (const d of [{ on: false }, { text: 'puns' }, { gloss: 'joke' }, { pos: 'v' }, { title: 'u' }]) assert.notEqual(row({ ...a, ...d }), row(a), JSON.stringify(d));
  assert.notEqual(sig('td', 'ab'), sig('td', 'a', 'b')); assert.notEqual(sig('td', sig('b', 'x')), sig('td', 'x')); assert.notEqual(sig('td.a'), sig('td.b'));
  assert.equal(sig('td', 'x'), sig('td', null, 'x', null, false)); assert.equal(sig('td', ['x', ['y']]), sig('td', {}, 'x', 'y'));
});

test('export: an alias that only inherits a theme is dropped where its root shows the same text', () => {
  const P = project();
  const cake = addEntry(P, 'sponge cake', { fam: 1, typ: { fruits: 1 } }), sp = addEntry(P, 'Sponge', { fam: 2, aliasOf: cake.id, aliasKind: 'synonym' });
  cake.show = { fruits: 'sponge' };
  const keepIt = addEntry(P, 'cob', { fam: 1, typ: { fruits: 1 } }), loaf = addEntry(P, 'bun', { fam: 2, aliasOf: keepIt.id, aliasKind: 'synonym' });
  for (const w of ['fig', 'plum']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  reindex(P);
  const r = buildExport(P);
  assert.deepEqual(r.file.entries.text.filter(x => /^sponge/i.test(x)), ['sponge cake']);   // the alias row had no other link, so it goes
  assert.ok(r.file.entries.text.includes('bun'));                                           // other text than the root's: kept
  assert.equal(r.report.inheritedSame.length, 1); assert.match(r.report.inheritedSame[0], /^Sponge in /);
  assert.equal(reportLists(r.report, 4).filter(l => /Inherited/.test(l.title)).length, 1);
});

test('reportLists: names of dropped themes and same-text drops, capped, empty ones left out', () => {
  assert.deepEqual(capLines(['a', 'b', 'c'], 2), ['a', 'b', '... and 1 more']);
  assert.deepEqual(capLines(['a', 'b'], 2), ['a', 'b']);
  const ls = reportLists({ droppedThin: ['Fruits'], sameText: [] }, 4);
  assert.equal(ls.length, 1); assert.equal(ls[0].title, 'Dropped themes (1)'); assert.deepEqual(ls[0].lines, ['Fruits']); assert.match(ls[0].why, /fewer than 4/);
  assert.equal(reportLists({ droppedThin: [], sameText: [] }, 4).length, 0);
  assert.equal(reportLists({ droppedThin: [], sameText: ['x in T (kept a, left out b)'] }, 4, 5)[0].title, 'Same-text drops (1)');
});

test('dev server listens on 127.0.0.1 only unless --lan', async () => {
  const up = (extra, port) => new Promise((ok, no) => { const c = spawn(process.execPath, ['serve.mjs', String(port), ...extra], { cwd: new URL('..', import.meta.url), stdio: ['ignore', 'pipe', 'ignore'] }); c.stdout.once('data', () => ok(c)); c.once('error', no); setTimeout(() => no(new Error('server did not start')), 5000).unref(); });
  const reach = (host, port) => new Promise(ok => { const s = connect(port, host); s.once('connect', () => { s.destroy(); ok(true); }); s.once('error', () => ok(false)); });
  const lanIp = Object.values(networkInterfaces()).flat().find(i => i.family === 'IPv4' && !i.internal)?.address;
  let c = await up([], 18141);
  try { assert.equal(await reach('127.0.0.1', 18141), true); if (lanIp) assert.equal(await reach(lanIp, 18141), false); } finally { c.kill(); }
  c = await up(['--lan'], 18142);
  try { assert.equal(await reach('127.0.0.1', 18142), true); if (lanIp) assert.equal(await reach(lanIp, 18142), true); } finally { c.kill(); }
});

test('E9: theme counts recounted only for the themes an edit touched equal a full count (add, text, enable, link, unlink, alias, delete)', () => {
  const P = parseProject(readFileSync(new URL('../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
  let seed = 11; const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % n; };
  const themes = P.themes.filter(t => !t.group).map(t => t.id), pick = () => P.entries[rnd(P.entries.length)];
  let c = themeCounts(P);
  const edit = (touch, fn) => { const ix = P.ix, d = touchedThemes(P, touch); fn(); updateIndex(P, touch); assert.equal(P.ix, ix); touchedThemes(P, touch, d); c = themeCounts(P, c, d); };
  for (let i = 1; i <= 200; i++) {
    const e = pick(), k = rnd(6);
    if (k === 0) { const t = { entries: [] }, d = new Set(); t.entries.push(addEntry(P, 'zz' + i, { typ: { [themes[rnd(themes.length)]]: 3 } })); updateIndex(P, t); touchedThemes(P, t, d); c = themeCounts(P, c, d); }
    else if (k === 1) edit({ entries: [e] }, () => { e.enabled = !e.enabled; });
    else if (k === 2) edit({ entries: [e] }, () => { e.typ[themes[rnd(themes.length)]] = 2; });
    else if (k === 3) { const tid = Object.keys(e.typ)[0]; edit({ entries: [e] }, () => { if (tid) unlinkEntry(P, e, tid); }); }
    else if (k === 4) { const x = P.ix.aliases.has(e.id) ? e : pick(), d = new Set(); touchedThemes(P, { entries: [x] }, d); updateIndex(P, deleteEntry(P, x)); touchedThemes(P, { entries: [x] }, d); for (const id of d) if (!P.ix.theme.has(id)) d.delete(id); c = themeCounts(P, c, d); }
    else if (k === 5) { const r = pick(); edit({ entries: [e] }, () => { if (!r.aliasOf && r !== e && !P.ix.aliases.has(e.id)) { e.aliasOf = r.id; e.aliasKind = 'synonym'; } }); }
    if (i % 25 === 0) { const f = themeCounts(P); for (const m of ['own', 'tot', 'ready', 'play']) assert.deepEqual([...c[m]].sort(), [...f[m]].sort(), m + ' at edit ' + i); }
  }
});

// ---------- word families (DESIGN-entries.md 3.7) ----------
test('isFamily: forms, derivations and pet forms are one family; look-alikes on the stop list, compounds and other words are not', () => {
  for (const [a, b] of [['pup', 'puppy'], ['dad', 'daddy'], ['tum', 'tummy'], ['joy', 'joyful'], ['gamer', 'gaming'], ['vote', 'voter'], ['murk', 'murky'], ['host', 'hostess'],
    ['buck', 'bucks'], ['cork', 'corked'], ['mom', 'mommy'], ['teeny', 'teensy'], ['Peg', 'Peggy'], ['onion ring', 'onion rings'], ['sorcery', 'sorcerer']]) assert.ok(isFamily(a, b), a + '/' + b);
  for (const [a, b] of [['earl', 'early'], ['tone', 'tonic'], ['organ', 'organism'], ['busy', 'business'], ['can', 'canister'], ['archer', 'archive'], ['legal', 'legion'],
    ['tension', 'tenement'], ['century', 'centurion'], ['battery', 'battalion'], ['policy', 'polity'], ['solute', 'solution'], ['ban', 'banishment'], ['pet', 'petal'], ['tea', 'teach'],
    ['fish', 'goldfish'], ['ski', 'ski'], ['onion ring', 'onion ring'], ['onion ring', 'ring'], ['cat', 'dog'], ['T-shirt', 'T-shirts']]) assert.ok(!isFamily(a, b), a + '/' + b);
  const pairs = familyPairs([{ id: 1, text: 'joy' }, { id: 2, text: 'joyful' }, { id: 3, text: 'early' }, { id: 4, text: 'earl' }, { id: 5, text: 'joyous' }]);
  assert.deepEqual(pairs.map(p => p.map(x => x.id).sort().join('/')).sort(), ['1/2', '1/5', '2/5']);
});

test('family-pair warns for two family members as separate answers; not when grouped, locked, familyOk or allowed', () => {
  const P = project();
  const pup = addEntry(P, 'pup', { fam: 1, typ: { fruits: 1, citrus: 1, wild: 1 } }), puppy = addEntry(P, 'puppy', { fam: 1, typ: { fruits: 1, citrus: 1, wild: 1 } });
  addEntry(P, 'earl', { fam: 1, typ: { fruits: 1 } }); addEntry(P, 'early', { fam: 1, typ: { fruits: 1 } });
  reindex(P);
  const pairs = () => validate(P).filter(i => i.kind === 'family-pair').map(i => i.themeId).sort();
  assert.deepEqual(pairs(), ['citrus', 'fruits', 'wild']);   // earl/early is on the stop list
  P.ix.theme.get('fruits').groups = [[pup.id, puppy.id]];
  P.ix.theme.get('citrus').familyOk = true;
  P.ix.theme.get('wild').tkind = 'wordplay';                 // locked
  assert.deepEqual(pairs(), []);
  assert.equal(parseProject(serializeProject(P)).themes.find(t => t.id === 'citrus').familyOk, true);   // familyOk round-trips
  assert.equal(buildExport(P).file.themeFields.includes('familyOk'), false);                            // and is not exported
  delete P.ix.theme.get('wild').tkind;
  assert.deepEqual(pairs(), ['wild']);
  const key = Math.min(pup.id, puppy.id) + '|' + Math.max(pup.id, puppy.id) + '|wild';
  FAMILY_OK.add(key);
  try { assert.deepEqual(pairs(), []); } finally { FAMILY_OK.delete(key); }
});

test('family-kin suggests one-family words in different themes; kin silences it; one-sided kin is kin-bad', () => {
  const P = project();
  const joy = addEntry(P, 'joy', { fam: 1, typ: { fruits: 1 } }), joyful = addEntry(P, 'joyful', { fam: 1, typ: { citrus: 1 } });
  reindex(P);
  const count = k => validate(P).filter(i => i.kind === k).length;
  assert.equal(count('family-kin'), 1);
  setKin(P, joy, joyful);
  assert.deepEqual([joy.kin, joyful.kin], [[joyful.id], [joy.id]]);
  assert.equal(count('family-kin'), 0);
  assert.equal(count('kin-bad'), 0);
  joyful.kin = [];
  assert.equal(count('kin-bad'), 1);
});

test('clash-large notes a clash group of 9-12 words, clash-big warns above 12', () => {
  const P = project();
  const a = Array.from({ length: 5 }, (_, i) => addEntry(P, 'fa' + i, { fam: 1, typ: { fruits: 1 } }));
  const b = Array.from({ length: 4 }, (_, i) => addEntry(P, 'cb' + i, { fam: 1, typ: { citrus: 1 } }));
  P.themes.find(t => t.id === 'fruits').groups = [a.map(e => e.id)];
  P.themes.find(t => t.id === 'citrus').groups = [b.map(e => e.id)];
  reindex(P);
  const of = k => validate(P).filter(i => i.kind === k);
  assert.equal(of('clash-large').length + of('clash-big').length, 0);   // 5 and 4
  setKin(P, a[0], b[0]);                                     // kin joins them: 9
  assert.equal(of('clash-large').length, 1);
  assert.equal(of('clash-large')[0].sev, 'info');
  assert.match(of('clash-large')[0].msg, /has 9 words/);
  assert.equal(of('clash-big').length, 0);
  const g = clashGroups(P, P.themes, () => true);
  assert.ok(g.id(a[4].id) > 0 && g.id(a[4].id) === g.id(b[3].id));
  const c = Array.from({ length: 4 }, (_, i) => addEntry(P, 'cc' + i, { fam: 1, typ: { citrus: 1 } }));   // 13 with a second group in citrus joined by kin
  P.themes.find(t => t.id === 'citrus').groups.push(c.map(e => e.id));
  reindex(P);
  setKin(P, b[1], c[0]);
  assert.equal(of('clash-large').length, 0);
  assert.equal(of('clash-big').length, 1);
  assert.equal(of('clash-big')[0].sev, 'warn');
  assert.match(of('clash-big')[0].msg, /has 13 words/);
});

test('case lint kinds show once in Checks (case-split, not case-case-split)', () => {
  const P = project();
  addEntry(P, 'Apple', { fam: 1, type: 'proper', typ: { fruits: 1, citrus: 1 }, show: { citrus: 'apple' } });
  reindex(P);
  const kinds = validate(P).map(i => i.kind).filter(k => k.startsWith('case-'));
  assert.ok(kinds.includes('case-split'), kinds.join());
  assert.ok(!kinds.some(k => k.startsWith('case-case-')), kinds.join());
});

test('kin round-trips through the project file, joins the export clash column, and leaves with a deleted entry', () => {
  const P = project();
  const joy = addEntry(P, 'joy', { fam: 1, typ: { fruits: 1 } }), joyful = addEntry(P, 'joyful', { fam: 1, typ: { citrus: 1 } });
  for (const w of ['fig', 'plum', 'pear']) { addEntry(P, w, { fam: 1, typ: { fruits: 1 } }); addEntry(P, w + 'x', { fam: 1, typ: { citrus: 1 } }); }
  reindex(P);
  assert.ok(buildExport(P).file.entries.clash.every(c => c === 0));
  setKin(P, joy, joyful);
  const text = serializeProject(P);
  assert.ok(!text.includes('"kin":[]'));                     // empty kin is a default: not written
  const Q = parseProject(text); reindex(Q);
  assert.deepEqual(Q.entries.find(e => e.text === 'joy').kin, [joyful.id]);
  assert.deepEqual(Q.entries.find(e => e.text === 'joyful').kin, [joy.id]);
  assert.deepEqual(Q.entries.find(e => e.text === 'fig').kin, []);
  const c = buildExport(Q).file.entries, at = t => c.text.indexOf(t);
  assert.ok(c.clash[at('joy')] > 0 && c.clash[at('joy')] === c.clash[at('joyful')] && c.clash[at('fig')] === 0);
  deleteEntry(Q, Q.entries.find(e => e.text === 'joyful')); reindex(Q);
  assert.deepEqual(Q.entries.find(e => e.text === 'joy').kin, []);
});

test('kin: deleting a root hands its kin to the promoted alias', () => {
  const P = project();
  const joy = addEntry(P, 'joy', { fam: 1, typ: { fruits: 1 } }), joyful = addEntry(P, 'joyful', { fam: 1, typ: { citrus: 1 } });
  const delight = addEntry(P, 'delight', { fam: 1, aliasOf: joy.id, aliasKind: 'synonym' });
  reindex(P); setKin(P, joy, joyful);
  deleteEntry(P, joy); reindex(P);
  assert.deepEqual(delight.kin, [joyful.id]);
  assert.deepEqual(joyful.kin, [delight.id]);
  assert.equal(validate(P).filter(i => i.kind === 'kin-bad').length, 0);
});

test('apply-words merge goes through deleteEntry: ids leave groups, use and kin; show, use, nameOkIn carry over', async () => {
  const { mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os'), { join } = await import('node:path'), { execFileSync } = await import('node:child_process');
  const P = project();
  const keep = addEntry(P, 'jam', { fam: 1, typ: { fruits: 1 } }), dup = addEntry(P, 'jam', { fam: 1, typ: { citrus: 1 } });
  const other = addEntry(P, 'lime', { fam: 1, typ: { citrus: 1 } }), kinW = addEntry(P, 'jammy', { fam: 1, typ: { fruits: 1 } });
  dup.show = { citrus: 'Jam' }; dup.nameOkIn = ['citrus'];
  P.themes.find(t => t.id === 'citrus').groups = [[dup.id, other.id]];
  other.use = { citrus: dup.id };
  setKin(P, dup, kinW);
  reindex(P);
  const dir = mkdtempSync(join(tmpdir(), 'aw-'));
  try {
    writeFileSync(join(dir, 'lib.json'), serializeProject(P));
    writeFileSync(join(dir, 'm.mjs'), "export const FIXES = [{ merge: ['jam', ['fruits', 'citrus'], 'spread'] }];");
    execFileSync(process.execPath, [fileURLToPath(new URL('../tools/apply-words.mjs', import.meta.url)), join(dir, 'm.mjs'), join(dir, 'lib.json')], { stdio: 'pipe' });
    const Q = parseProject(readFileSync(join(dir, 'lib.json'), 'utf8')); reindex(Q);
    const k = Q.entries.find(e => e.id === keep.id);
    assert.ok(!Q.entries.some(e => e.id === dup.id));
    assert.deepEqual(Q.themes.find(t => t.id === 'citrus').groups, [[keep.id, other.id]]);
    assert.equal(Q.entries.find(e => e.id === other.id).use?.citrus, undefined);
    assert.equal(k.show.citrus, 'Jam');
    assert.deepEqual(k.nameOkIn, ['citrus']);
    assert.deepEqual(k.kin, [kinW.id]);
    assert.deepEqual(Q.entries.find(e => e.id === kinW.id).kin, [keep.id]);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('complete themes: extras, aliases, group partners, alternatives, "and" in an item, empty note', () => {
  const P = newProject();
  P.themes.push({ id: 'c', name: 'Closed', parent: null, group: false, enabled: true, region: [], complete: true, note: 'Exactly: the Salt and Pepper, Pharos of Alexandria (Lighthouse of Alexandria), Blood, Phlegm, Gone.', groups: [] });
  P.themes.push({ id: 'n', name: 'No note', parent: null, group: false, enabled: true, region: [], complete: true, note: '' });
  const L = (text, over = {}) => addEntry(P, text, { typ: { c: 3 }, enabled: true, ...over });
  const salt = L('salt and pepper'), lh = L('Lighthouse of Alexandria'), blood = L('blood'), tmp = L('temperament');
  const ph = L('mucus'); addEntry(P, 'Phlegm', { aliasOf: ph.id, aliasKind: 'synonym' });
  const partner = L('black bile'); const gm = L('melancholy'); P.themes[0].groups.push([partner.id, gm.id]);
  P.themes[0].note += ', Black Bile';
  const t = L('Hippocrates');
  reindex(P);
  const v = validate(P);
  const extra = v.filter(i => i.kind === 'complete-extra').map(i => i.entryId).sort((a, b) => a - b);
  assert.deepEqual(extra, [tmp.id, t.id].sort((a, b) => a - b));   // alias, partner, alternative and "and" items are accepted
  assert.deepEqual(v.filter(i => i.kind === 'complete-missing').map(i => i.msg.match(/"(.*?)"/)[1]), ['Gone.']);
  assert.deepEqual(v.filter(i => i.kind === 'complete-no-note').map(i => i.themeId), ['n']);
});
