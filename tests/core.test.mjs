// Run: node --test tests/core.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { connect } from 'node:net';
import { networkInterfaces } from 'node:os';
import { parseOutline, formatOutline } from '../js/outline.js';
import { newProject, addEntry, reindex, themeStats, themeRoots, themeCounts, touchedThemes, difficultyBand, eff, deleteEntry, deleteTheme, unlinkEntry, linkTarget, moveTheme, descendants, blendRatings, themeDifficulty, mergeRegions, updateIndex, indexEntry, placeTheme, entryDefaults, sortByKey, flagKey } from '../js/model.js';
import { sig } from '../js/dom.js';
import { serializeProject, parseProject } from '../js/store.js';
import { validate, nameLeak, themeNameChars } from '../js/validate.js';
import { offensiveMatch, offensivePiece } from '../js/offensive.js';
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
    wild [region:US,UK] [from:31]
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

test('flags belong to each theme: nothing passes down the tree (Simon, 2026-11-27)', () => {
  const P = project();
  P.themes.find(t => t.id === 'colors').enabled = false;
  P.themes.find(t => t.id === 'colors').region = ['AU'];
  reindex(P);
  assert.equal(eff(P, 'colors').adult, true);
  assert.equal(eff(P, 'shades_of_blue').adult, false);   // under the adult group colors, not adult itself
  assert.equal(eff(P, 'shades_of_blue').enabled, true);  // under a disabled group, still enabled
  assert.deepEqual(P.ix.theme.get('wild').firstLevel, [31, 31, 31]);   // its own level field
  assert.equal('sensitive' in eff(P, 'wild'), false);   // themes have no sensitive flag since 2026-11-27
  assert.deepEqual(eff(P, 'wild').region, ['US', 'UK']); // its own regions only, not the group's AU
  assert.equal(eff(P, 'citrus').adult, false);
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
  assert.ok(!text.includes('"adult":false'.replace('adult', 'offensive')));
  const Q = parseProject(text);
  assert.equal(Q.entries.length, 1);
  assert.deepEqual(Q.entries[0].typ, { citrus: 1, fruits: 2 });
  assert.equal(Q.entries[0].offensive, false);
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
  P.themes.find(t => t.id === 'shades_of_blue').adult = true;   // flags do not pass down from the adult group colors: set on the theme itself
  // 5 clean words in fruits, one adult-theme word set, aliases of a offensive root.
  for (const w of ['apple', 'pear', 'plum', 'fig', 'grape']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  for (const w of ['navy', 'sky', 'teal', 'cyan']) addEntry(P, w, { fam: 2, typ: { shades_of_blue: 2 } });
  const rude = addEntry(P, 'rude', { fam: 2, offensive: true, typ: { fruits: 3 } });
  addEntry(P, 'cheeky', { fam: 2, aliasOf: rude.id, aliasKind: 'synonym' });
  reindex(P);
  const all = buildExport(P, { offensive: 'include' });
  assert.equal(all.file.entries.text.length, 11);
  assert.equal(buildExport(P).file.entries.text.length, 10);   // offensive words are left out by default (the alias stands in)
  assert.equal(all.file.themes.filter(r => !(r[3] & 32)).length, 2);

  const family = buildExport(P, { adult: 'exclude', offensive: 'exclude' });
  // the adult theme shades_of_blue disappears; offensive root goes, its alias stays as a root
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
  setFreq(parseFreq('50 ice cream\r\n40 cone\r\n'));   // a Windows checkout of data/freq-en.txt: the last word of a line still counts
  assert.equal(zipf('cream'), 5);
  assert.equal(zipf('cone'), 4);
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

test('theme-name-chars: an error for a name the outline format cannot carry ([, " -- ", a final colon)', () => {
  const P = newProject();
  const T = (id, name) => ({ id, name, parent: null, group: false, enabled: true, region: [] });
  P.themes.push(T('ok', 'Rock-paper-scissors: the game'), T('br', 'Things [odd]'), T('dash', 'Cats -- and dogs'), T('colon', 'Colours:'), T('hy', 'Well-known -people'));
  reindex(P);
  const w = validate(P).filter(i => i.kind === 'theme-name-chars');
  assert.deepEqual(w.map(i => i.themeId), ['br', 'dash', 'colon']);
  assert.ok(w.every(i => i.sev === 'error'));
  assert.equal(themeNameChars('Plain name'), '');
  assert.notEqual(themeNameChars('Ends with: '), '');
});

test('settings.basedOn survives a save and load (the starter version the browser copy came from)', () => {
  const P = newProject(); P.settings.basedOn = 454;
  assert.equal(parseProject(serializeProject(P)).settings.basedOn, 454);
  assert.equal(parseProject(serializeProject(newProject())).settings.basedOn, undefined);
});

test('theme-name check: the collected thing alone is fine, longer text and other name words are not', () => {
  const T = name => ({ id: 'x', name }), E = text => ({ text, nameOkIn: [] });
  assert.equal(nameLeak(T('pants and shorts'), E('pants')), null);
  assert.equal(nameLeak(T('garden bugs'), E('bug')), null);
  assert.equal(nameLeak(T('garden bugs'), E('pill bug')), 'bug');
  assert.equal(nameLeak(T('soups'), E('tomato soup')), 'soup');
  assert.equal(nameLeak(T('police words'), E('police')), 'police');
  assert.equal(nameLeak(T('water park'), E('water')), 'water');
  // I37: a "things …" theme collects things, so its last word alone is a leak; other verb forms of a name word count
  assert.equal(nameLeak(T('things underground'), E('underground')), 'underground');
  assert.equal(nameLeak(T('things you climb'), E('climbing frame')), 'climb');
  assert.equal(nameLeak(T('skiing words'), E('ski lift')), 'skiing');
  assert.equal(nameLeak(T('things that cut'), E('pizza cutter')), 'cut');
  assert.equal(nameLeak(T('baking'), E('bake sale')), 'baking');
  assert.equal(nameLeak(T('things that cut'), E('scissors')), null);
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
  const root = addEntry(P, 'color', { fam: 1, typ: { fruits: 2 }, adult: true, firstLevel: [31, 31, 31], tm: true, offensive: true, region: ['US'], show: { fruits: 'col' }, nameOkIn: ['fruits'] });
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
  assert.deepEqual([sp.adult, sp.firstLevel, sp.tm, sp.offensive], [true, [31, 31, 31], true, true]);
  assert.deepEqual(fr.groups, [[sp.id, other.id]]);

  // another word promoted: meaning flags and region only; the root's spellings and abbreviations become its synonyms
  const Q = project(), qf = Q.themes.find(t => t.id === 'fruits');
  const r = addEntry(Q, 'personal computer', { typ: { fruits: 1 }, firstLevel: [31, 31, 31], tm: true, region: ['US'], show: { fruits: 'computer' }, nameOkIn: ['fruits'] });
  const home = addEntry(Q, 'home computer', { aliasOf: r.id, aliasKind: 'synonym' });
  const pc = addEntry(Q, 'PC', { aliasOf: r.id, aliasKind: 'abbreviation' });
  const x = addEntry(Q, 'laptop', { typ: { fruits: 1 } });
  qf.groups = [[r.id, x.id], [home.id, 99]];   // the promoted word already in a group: the two groups become one
  reindex(Q);
  deleteEntry(Q, r); reindex(Q);
  assert.deepEqual([home.aliasOf, home.firstLevel, home.tm, home.region, home.show, home.nameOkIn], [0, [31, 31, 31], false, ['US'], { fruits: 'computer' }, []]);
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
    assert.deepEqual(file.themeFields.slice(-3), ['breaks', 'firstLevel', 'mustLevels']);
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
    assert.deepEqual(file.themeFields.slice(-3), ['breaks', 'firstLevel', 'mustLevels']);
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

test('checks-core: issues match by identity, counts by baseline', async () => {
  const { newIssues, summarize, issueKey } = await import('../tools/checks-core.mjs');
  const a = { sev: 'warn', kind: 'long', msg: 'old', entryId: 1 }, b = { sev: 'warn', kind: 'long', msg: 'new', entryId: 2 };
  assert.notEqual(issueKey(a), issueKey({ ...a, entryId: 2 }));
  // one fixed, one added: the count is equal but the swap is visible
  assert.deepEqual(newIssues([b], [a]), [b]);
  assert.deepEqual(newIssues([a, a], [a]), [a]);   // multiset
  assert.deepEqual(newIssues([{ sev: 'info', kind: 'overlap', msg: 'x' }], []), []);
  const s = summarize([a, b, { sev: 'error', kind: 'bad-type', msg: 'e' }], { long: 1, thin: 2 });
  assert.equal(s.errors.length, 1);
  assert.deepEqual(s.warn.map(w => [w.kind, w.n, w.max, w.status]), [['long', 2, 1, 'OVER'], ['thin', 0, 2, 'below']]);
});

// ---------- check improvements (v411 review: tools/gen/review-checks-correctness.md, review-checks-coverage.md) ----------
const T = (id, name, over = {}) => ({ id, name, parent: null, group: false, enabled: true, region: [], pop: 2, ident: 2, ...over });
const kinds = (P, k) => validate(P).filter(i => i.kind === k);

// A small library whose family export meets the contract: fruits (5 words, a UK spelling alias), palindromes (wordplay).
function contractProject() {
  const P = newProject();
  P.themes.push(T('food', 'Food', { group: true }), T('fruits', 'fruits', { parent: 'food' }), T('pals', 'palindromes', { tkind: 'wordplay', rule: 'palindrome', pop: 3, ident: 3, region: ['US'] }));
  for (const w of ['apple', 'pear', 'plum', 'fig', 'kiwi']) addEntry(P, w, { fam: 1, typ: { fruits: 2 }, status: 'rev' });
  const gray = addEntry(P, 'gray', { fam: 1, typ: { fruits: 4 } }); addEntry(P, 'grey', { fam: 1, aliasOf: gray.id, aliasKind: 'spelling', region: ['UK'] });
  for (const w of ['level', 'kayak', 'radar', 'civic']) addEntry(P, w, { fam: 2, typ: { pals: 2 } });
  reindex(P);
  return P;
}
const contractOf = async X => (await import('../tools/export-contract.mjs')).checkContract(X);
const exportOf = P => JSON.parse(JSON.stringify(buildExport(P, { adult: 'exclude', offensive: 'exclude', zipf: true }).file));

test('export contract: a clean export passes; each broken rule is an error of its kind', async () => {
  const X0 = exportOf(contractProject());
  assert.deepEqual(await contractOf(X0), []);
  const broken = async (fix, kind) => { const X = structuredClone(X0); fix(X); const is = await contractOf(X); assert.ok(is.some(i => i.sev === 'error' && i.kind === kind), `${kind}: ${JSON.stringify(is)}`); };
  const ti = (X, id) => X.themes.findIndex(r => r[0] === id), tf = (X, f) => X.themeFields.indexOf(f), row = (X, text) => X.entries.text.indexOf(text);
  await broken(X => { X.themes[ti(X, 'fruits')][tf(X, 'parent')] = 99; }, 'contract-parent');                                       // past the end
  await broken(X => { X.themes[0][tf(X, 'parent')] = ti(X, 'fruits'); }, 'contract-parent');                                        // a cycle
  await broken(X => { X.themes[ti(X, 'pals')][tf(X, 'rule')] = 'starts:a'; }, 'contract-rule');                                    // X under 2 letters
  await broken(X => { X.themes[ti(X, 'pals')][tf(X, 'rule')] = 'hidden:@nothing'; }, 'contract-rule');                             // @id not a theme
  await broken(X => { X.themes[ti(X, 'pals')][tf(X, 'rule')] = ''; }, 'contract-rule');
  await broken(X => { X.themes[ti(X, 'pals')][tf(X, 'rule')] = 'other'; }, 'contract-rule-unknown');                             // not in the game's grammar: an error since v414
  await broken(X => { X.themes[ti(X, 'fruits')][tf(X, 'popularity')] = 0; }, 'contract-popularity');
  await broken(X => { X.themes[ti(X, 'fruits')][tf(X, 'difficulty')] = 0; }, 'contract-difficulty');
  await broken(X => { X.themes[ti(X, 'fruits')][tf(X, 'name')] = 'x'.repeat(31); }, 'contract-theme-name');
  await broken(X => { X.themes[ti(X, 'pals')][0] = 'FRUITS'; }, 'contract-theme-id');                                              // ids match case-insensitively
  await broken(X => { X.themes[ti(X, 'fruits')][tf(X, 'kind')] = 7; }, 'contract-kind');
  await broken(X => { X.entries.links[2] = 0; }, 'contract-link');                                                                   // typicality 0
  await broken(X => { X.entries.links[1] = 5.5; }, 'contract-link');
  await broken(X => { X.entries.familiarity[0] = 0; }, 'contract-familiarity');
  await broken(X => { X.entries.pos[0] = 7; }, 'contract-pos');
  await broken(X => { X.entries.zipf[0] = 80; }, 'contract-zipf');
  await broken(X => { X.entries.breaks[0] = [0]; }, 'contract-breaks');
  await broken(X => { X.entries.text[0] = ' '; }, 'contract-text');
  await broken(X => { X.entries.clash[0] = -1; }, 'contract-clash');
  await broken(X => { const g = row(X, 'grey'); X.entries.root[g] = g + 1; }, 'contract-root');                                     // points at itself
  await broken(X => { const g = row(X, 'grey'); X.entries.text.push('greye'); for (const c of Object.keys(X.entries)) if (!['text', 'links'].includes(c)) X.entries[c].push(c === 'root' ? g + 1 : c === 'familiarity' ? 1 : c === 'breaks' ? [] : 0); }, 'contract-root');   // an alias of an alias
  await broken(X => { X.entries.linkCount[0]++; }, 'contract-links');
  await broken(X => { X.kindNames = ['category', 'place']; }, 'contract-top');
  await broken(X => { X.regions = ['US']; }, 'contract-top');
  await broken(X => { X.regionBits = 32; }, 'contract-top');
  await broken(X => { delete X.lib; }, 'contract-top');
  await broken(X => { X.linkFields = ['theme', 'typicality', 'difficulty', 'shown']; }, 'contract-columns');
  await broken(X => { X.shown.push(['', 0, []]); }, 'contract-shown');
  await broken(X => { X.shownUK.push([0, 99]); }, 'contract-shown');
});

test('export contract: the rule grammar; warnings for what skews play; the summary gates them against a baseline', async () => {
  const { contractSummary, parseRule } = await import('../tools/export-contract.mjs');
  for (const r of ['palindrome', 'homophone', 'homophone:animals', 'rhyme:at', 'contains:aeiou', 'contains:silent-b', 'compound-start:air', 'starts:@birds', 'ends:ma', 'hidden:@x', 'no-vowels', 'roman', 'reversible', 'curated']) assert.equal(parseRule(r).state, 'ok', r);
  for (const r of ['other', 'letter:animals:plus', 'alphabetical', 'plus-letter:@animals']) assert.equal(parseRule(r).state, 'unknown', r);
  for (const r of ['starts:a', 'hidden:abc', 'rhyme:', 'compound-end:@x', 'roman:x', 'curated:x']) assert.equal(parseRule(r).state, 'bad', r);
  const P = contractProject();
  P.entries.find(e => e.text === 'apple').region = ['AU'];                            // a root with a region
  P.entries.find(e => e.text === 'grey').region = ['UK', 'US'];                       // an alias tagged both
  const gray = P.entries.find(e => e.text === 'gray'); addEntry(P, 'graye', { fam: 1, aliasOf: gray.id, aliasKind: 'regional', region: ['UK'] });   // a second UK display alias
  addEntry(P, 'Plum', { gloss: 'company', type: 'org', fam: 2, typ: { fruits: 5 } }); P.entries.find(e => e.text === 'plum').gloss = 'fruit';
  addEntry(P, 'kiwi', { gloss: 'bird', type: 'common', fam: 1, typ: { pals: 5 } });   // after an earlier common kiwi: not reported
  addEntry(P, 'level', { gloss: 'tool', type: 'phrase', fam: 1, typ: { fruits: 5 } }); // a lower-case word typed phrase
  P.themes.push(T('few', 'few things')); for (const w of ['ant', 'bee', 'cat', 'dog']) addEntry(P, w, { fam: 1, typ: { few: 1 }, firstLevel: w === 'bee' ? [31, 31, 31] : null, offensive: w === 'cat' || w === 'dog' });   // offensive is dropped; first level 31 (the sensitive bit) is held back (g25) and counts
  reindex(P);
  const X = buildExport(P, { adult: 'exclude', offensive: 'exclude', zipf: true, minWords: 1 }).file;
  const is = await contractOf(X), n = k => is.filter(i => i.kind === k).length;
  assert.deepEqual(is.filter(i => i.sev === 'error'), []);
  assert.equal(n('contract-root-region'), 1);
  assert.equal(is.find(i => i.kind === 'contract-root-region').sev, 'info');   // the game raises a regional root's band (g24): info, not gated
  assert.equal(n('contract-alias-dialect'), 2);    // tagged both, and two UK display aliases
  assert.equal(n('contract-dup-root'), 0);         // Plum (org) comes after the common plum
  assert.equal(n('contract-type-common'), 1);      // level typed phrase
  assert.equal(n('contract-thin'), 1);             // few things: 2 usable words (ant, sensitive bee); cat and dog are offensive
  const s = contractSummary(is, { 'contract-alias-dialect': 2, 'contract-type-common': 1 });
  assert.deepEqual(s.over.map(w => w.kind), ['contract-thin']);
  assert.deepEqual(s.info, { 'contract-root-region': 1 });                      // counted as info, never over a baseline
  assert.ok(!s.warn.some(w => w.kind === 'contract-root-region'));
  // the order in the export decides contract-dup-root: a place row first hides the common word
  const Y = structuredClone(X), r = Y.entries.text.indexOf('fig'); Y.entries.type[r] = 2; Y.entries.text.push('fig'); for (const c of Object.keys(Y.entries)) if (!['text', 'links'].includes(c)) Y.entries[c].push(c === 'familiarity' ? 1 : c === 'breaks' ? [] : 0);
  Y.entries.linkCount[Y.entries.linkCount.length - 1] = 1; Y.entries.links.push(Y.themes.findIndex(t => t[0] === 'fruits'), 2, 2, 0);
  assert.equal((await contractOf(Y)).filter(i => i.kind === 'contract-dup-root').length, 1);
});

test('region-root-equiv: a regional root with a same-sense untagged root (one synonym group, or a sense twin) is a warning', () => {
  const P = contractProject(), fr = P.themes.find(t => t.id === 'fruits');
  const add = (text, o) => addEntry(P, text, { fam: 2, typ: { fruits: 3 }, ...o });
  const bil = add('bilberry', { region: ['UK'] }), wh = add('whortleberry', {});                  // (a) grouped: flagged
  const ap = P.entries.find(e => e.text === 'apple');
  const cox = add('Cox apple', { region: ['UK'] });                                                // the other's words plus more: a subtype
  const both = add('sweetie', { region: ['UK', 'US'] }), sw = add('sweet', {});                    // tagged both UK and US: excluded
  const tmr = add('Fruitella', { region: ['UK'], tm: true }), fc = add('fruit chew', {});         // a trademark: excluded
  const lol = add('lolly', { region: ['AU'], pos: 'verb' }), lp = add('lollipop', {});             // another part of speech: excluded
  fr.groups = [[bil.id, wh.id], [cox.id, ap.id], [both.id, sw.id], [tmr.id, fc.id], [lol.id, lp.id]];
  const t1 = add('jelly', { gloss: 'fruit spread', region: ['US'] }); add('jelly', { gloss: 'fruit spread jam' });   // (b) sense twin, one tagged
  const t2 = add('chips', { gloss: 'potato fries', region: ['UK'] }); add('chips', { gloss: 'potato fries thin' });
  add('pudding', { gloss: 'dessert course', region: ['UK'] }); add('pudding', { gloss: 'custard', region: ['US'] });  // both tagged: not this check
  reindex(P);
  const got = kinds(P, 'region-root-equiv');
  assert.deepEqual(got.map(i => i.entryId).sort(), [bil.id, t1.id, t2.id].sort());
  assert.ok(got.every(i => i.sev === 'warn'));
  assert.match(got.find(i => i.entryId === bil.id).msg, /whortleberry.*synonym group in "fruits"/);
  P.themes.find(t => t.id === 'fruits').enabled = false; reindex(P);                                // a disabled theme's groups do not count
  assert.deepEqual(kinds(P, 'region-root-equiv').map(i => i.entryId).sort(), [t1.id, t2.id].sort());
});

test('wordplay rules (v414): validate and the contract accept the game grammar only; a reversible member needs its reverse in the export', async () => {
  const P = contractProject(), pals = P.themes.find(t => t.id === 'pals');
  assert.deepEqual(kinds(P, 'rule-unknown'), []);
  for (const r of ['other', 'letter:animals:plus', '', 'roman:x']) { pals.rule = r; assert.equal(kinds(P, 'rule-unknown').length, 1, r); }
  for (const r of ['no-vowels', 'roman', 'reversible', 'curated']) { pals.rule = r; assert.deepEqual(kinds(P, 'rule-unknown'), [], r); }
  P.themes.push(T('rev', 'reversible words', { tkind: 'wordplay', rule: 'reversible', pop: 3, ident: 3 }));
  for (const w of ['stop', 'live', 'evil', 'trap', 'kayak']) addEntry(P, w, { fam: 1, typ: { rev: 2 } });
  addEntry(P, 'pots', { fam: 1, aliasOf: P.entries.find(e => e.text === 'plum').id, aliasKind: 'synonym' });   // an alias row counts as a word of the export
  reindex(P);
  const is = (await contractOf(exportOf(P))).filter(i => i.kind === 'contract-reversible-missing');
  assert.deepEqual(is.map(i => i.msg.split('"')[1]).sort(), ['kayak', 'trap']);                                  // part is no word; kayak is a palindrome
  assert.ok(is.every(i => i.sev === 'warn'));
});

test('rating rule: a theme with words needs popularity and identifiability; an enabled entry needs familiarity 1-5; a link typicality 1-5', () => {
  const P = contractProject();
  assert.deepEqual(validate(P).filter(i => i.sev === 'error'), []);
  P.themes.find(t => t.id === 'fruits').ident = 0;
  P.entries.find(e => e.text === 'apple').fam = 0;
  P.entries.find(e => e.text === 'grey').fam = 6;                         // an alias too
  P.entries.find(e => e.text === 'pear').typ.fruits = 0;                  // 0 is no longer allowed
  const off = addEntry(P, 'quince', { fam: 0, enabled: false });          // disabled: not required
  reindex(P);
  const v = validate(P), err = k => v.filter(i => i.sev === 'error' && i.kind === k);
  assert.deepEqual(err('theme-unrated').map(i => i.themeId), ['fruits']);
  assert.match(err('theme-unrated')[0].msg, /identifiability/);
  assert.deepEqual(err('unrated').map(i => P.ix.entry.get(i.entryId).text).sort(), ['apple', 'grey']);
  assert.ok(!err('unrated').some(i => i.entryId === off.id));
  assert.deepEqual(err('bad-rating').map(i => i.entryId), [P.entries.find(e => e.text === 'pear').id]);
  P.themes.push(T('empty', 'empty', { pop: 0, ident: 0 })); reindex(P);  // no words: info only
  assert.ok(!validate(P).some(i => i.sev === 'error' && i.themeId === 'empty'));
});

test('export: an alias promoted to a row of its own keeps its left-out root\'s clash id', () => {
  const P = contractProject();
  const rude = addEntry(P, 'rude', { fam: 1, offensive: true, typ: { fruits: 3 } }), polite = addEntry(P, 'polite', { fam: 1, aliasOf: rude.id, aliasKind: 'synonym' });
  const bread = P.entries.find(e => e.text === 'fig');
  P.themes.find(t => t.id === 'fruits').groups = [[rude.id, bread.id]];
  reindex(P);
  const X = buildExport(P, { adult: 'exclude', offensive: 'exclude' }).file, row = t => X.entries.text.indexOf(t);
  assert.equal(row('rude'), -1); assert.equal(X.entries.root[row('polite')], 0);   // promoted
  assert.ok(X.entries.clash[row('fig')] > 0);
  assert.equal(X.entries.clash[row('polite')], X.entries.clash[row('fig')]);
});

test('export: alias rows are written with linkCount 0 and no links; the contract check flags one that has links', async () => {
  const X = exportOf(contractProject()), c = X.entries;
  const aliases = c.root.map((r, i) => r ? i : -1).filter(i => i >= 0);
  assert.ok(aliases.length > 0 && aliases.every(i => c.linkCount[i] === 0));
  assert.equal(c.linkCount.reduce((a, b) => a + b, 0), c.links.length / 4);
  assert.deepEqual(await contractOf(X), []);
  const a = aliases[0], at0 = c.linkCount.slice(0, a).reduce((x, y) => x + y, 0) * 4;
  c.linkCount[a] = 1; c.links.splice(at0, 0, 0, 2, 2, 0);
  assert.ok((await contractOf(X)).some(i => i.sev === 'error' && i.kind === 'contract-alias-links'));
});
test('same-display matches the export: accents kept apart, an alias with its own link counted, disabled entries skipped', () => {
  const P = contractProject();
  addEntry(P, 'café', { fam: 1, typ: { fruits: 3 } }); addEntry(P, 'cafe', { gloss: 'x', fam: 1, typ: { fruits: 3 } });   // the export keeps both
  const truck = addEntry(P, 'truck', { fam: 1, typ: { fruits: 3 } }); addEntry(P, 'Truck', { gloss: 'regional', fam: 2, aliasOf: truck.id, aliasKind: 'regional', region: ['UK'], typ: { fruits: 4 } });
  addEntry(P, 'Kiwi', { gloss: 'off', fam: 1, typ: { fruits: 3 }, enabled: false });
  reindex(P);
  const sd = kinds(P, 'same-display');
  assert.deepEqual(sd.map(i => P.ix.entry.get(i.entryId).text), ['Truck']);
  const r = buildExport(P, { minWords: 1 }).report;
  assert.deepEqual(r.sameText.map(s => s.split(' in ')[0]), ['truck']);
});

test('noteItems: a colon is a label only after "Exactly", "the ...", a number, or before a second colon', async () => {
  const { noteItems } = await import('../js/validate.js');
  const keys = n => noteItems(n).map(i => i.keys[0]);
  assert.deepEqual(keys('Star Wars: A New Hope, Jaws'), ['star wars: a new hope', 'jaws']);
  assert.deepEqual(keys('Exactly: north, south'), ['north', 'south']);
  assert.deepEqual(keys('the four suits: hearts, spades'), ['hearts', 'spades']);
  assert.deepEqual(keys('12 signs: Aries, Leo'), ['aries', 'leo']);
  assert.deepEqual(keys('Films: Star Wars: A New Hope, Jaws'), ['star wars: a new hope', 'jaws']);
});

test('alias-same fires on its own; alias-self alone; overlap tokens are Unicode words', () => {
  const P = contractProject(), apple = P.entries.find(e => e.text === 'apple');
  addEntry(P, 'Apple', { fam: 1, aliasOf: apple.id, aliasKind: 'spelling' });
  const self = addEntry(P, 'selfie', { fam: 1, aliasKind: 'spelling' }); self.aliasOf = self.id;
  addEntry(P, 'kākā', { fam: 3, typ: { fruits: 3 } }); addEntry(P, 'kākāpō', { fam: 3, typ: { fruits: 3 } });
  addEntry(P, 'tea', { fam: 1, typ: { fruits: 3 } }); addEntry(P, 'green tea', { fam: 1, typ: { fruits: 3 } });
  reindex(P);
  const v = validate(P), at = (k, id) => v.filter(i => i.kind === k && i.entryId === id);
  const alias = P.entries.find(e => e.text === 'Apple');
  assert.equal(at('alias-same', alias.id).length, 1);
  assert.equal(at('duplicate', alias.id).length + at('needs-gloss', alias.id).length + at('needs-gloss', apple.id).length, 0);
  assert.deepEqual(v.filter(i => i.entryId === self.id && i.sev !== 'info').map(i => i.kind), ['alias-self']);
  assert.deepEqual(v.filter(i => i.kind === 'overlap').map(i => P.ix.entry.get(i.entryId).text), ['green tea']);
});

test('severities: a dangling group or kin id is an error; complete-missing and a thin complete set are warnings', () => {
  const P = contractProject(), fruits = P.themes.find(t => t.id === 'fruits'), apple = P.entries.find(e => e.text === 'apple');
  fruits.groups = [[apple.id, 99999]]; apple.kin = [88888];
  P.themes.push(T('set', 'set', { complete: true, note: 'Exactly: one, two, three' })); addEntry(P, 'one', { fam: 1, typ: { set: 1 } }); addEntry(P, 'two', { fam: 1, typ: { set: 1 } });
  reindex(P);
  const v = validate(P), one = k => v.filter(i => i.kind === k).map(i => i.sev);
  assert.deepEqual(one('group-missing'), ['error']);
  assert.deepEqual(one('kin-missing'), ['error']);
  assert.deepEqual(one('kin-bad'), []);
  assert.deepEqual(one('complete-missing'), ['warn']);
  assert.deepEqual(one('thin').filter((s, i) => v.filter(x => x.kind === 'thin')[i].themeId === 'set'), ['warn']);
});

test('spelling-fam: a UK/US spelling has its root familiarity; no spelling is easier than its root', () => {
  const P = contractProject(), apple = P.entries.find(e => e.text === 'apple');
  apple.fam = 2;
  addEntry(P, 'appel', { fam: 3, aliasOf: apple.id, aliasKind: 'spelling', region: ['UK'] });   // UK spelling rated harder: warn
  addEntry(P, 'aple', { fam: 4, aliasOf: apple.id, aliasKind: 'spelling' });                    // untagged and rarer: fine
  addEntry(P, 'appl', { fam: 1, aliasOf: apple.id, aliasKind: 'spelling' });                    // easier than the root: warn
  addEntry(P, 'appul', { fam: 2, aliasOf: apple.id, aliasKind: 'spelling', region: ['US'] });  // same as root: fine
  reindex(P);
  assert.deepEqual(kinds(P, 'spelling-fam').map(i => [i.sev, P.ix.entry.get(i.entryId).text]).sort(), [['warn', 'appel'], ['warn', 'appl']]);
});

test('new checks: alias-flags, nameOk-stale, alias-kind-suspect', () => {
  const P = contractProject(), apple = P.entries.find(e => e.text === 'apple');
  apple.tm = true;
  addEntry(P, 'apples', { fam: 1, aliasOf: apple.id, aliasKind: 'form' });                                  // tm missing: alias-flags
  addEntry(P, 'appel', { fam: 1, aliasOf: apple.id, aliasKind: 'regional' });                               // other kinds are rated on their own
  apple.nameOkIn = ['fruits', 'pals'];                                                                      // pals: not linked
  const gps = addEntry(P, 'GPS', { type: 'acronym', fam: 1, typ: { fruits: 4 } }); addEntry(P, 'satnav', { fam: 2, aliasOf: gps.id, aliasKind: 'spelling', region: ['UK'] });
  reindex(P);
  assert.deepEqual(kinds(P, 'alias-flags').map(i => [i.sev, P.ix.entry.get(i.entryId).text]), [['warn', 'apples']]);
  assert.deepEqual(kinds(P, 'nameOk-stale').map(i => [i.sev, i.entryId]), [['info', apple.id]]);
  const s = kinds(P, 'alias-kind-suspect');
  assert.deepEqual(s.map(i => P.ix.entry.get(i.entryId).text), ['satnav']);   // grey (gray) is a real spelling
  assert.match(s[0].msg, /6 of 6 letters.*typed common/);
});

test('sense-twin: same-text roots that share a meaning word, or one linked where its twin\'s meaning names the theme; the allow list silences them', async () => {
  const { SENSE_OK } = await import('../js/sense-allow.js');
  const P = contractProject();
  P.themes.push(T('dogs', 'dog breeds'));
  const lang = addEntry(P, 'Maltese', { gloss: 'language', type: 'proper', fam: 3, typ: { dogs: 3 } }), dog = addEntry(P, 'Maltese', { gloss: 'dog', type: 'proper', fam: 3 });
  const p1 = addEntry(P, 'port', { gloss: 'ship side', fam: 2 }), p2 = addEntry(P, 'port', { gloss: 'ship left', fam: 2 });
  addEntry(P, 'bat', { gloss: 'animal', fam: 1 }); addEntry(P, 'bat', { gloss: 'club', fam: 1 });          // different senses: quiet
  addEntry(P, 'kiwi', { gloss: 'bird fruit', pos: 'verb', fam: 1 });                                       // other part of speech
  reindex(P);
  let st = kinds(P, 'sense-twin');
  assert.equal(st.length, 2);
  assert.ok(st.some(i => i.entryId === p2.id && /share "ship"/.test(i.msg)));
  assert.ok(st.some(i => i.entryId === lang.id && i.themeId === 'dogs' && /wrong sense/.test(i.msg)));
  SENSE_OK.add(`${p1.id}|${p2.id}`); SENSE_OK.add(`${lang.id}|${dog.id}|dogs`);
  try { assert.equal(kinds(P, 'sense-twin').length, 0); } finally { SENSE_OK.clear(); }
});

test('theme-twin: two themes, neither inside the other, sharing 80% of the smaller one\'s 8+ words; the allow list silences them', async () => {
  const { THEME_TWIN_OK } = await import('../js/theme-twin-allow.js');
  const P = contractProject();
  P.themes.push(T('bike', 'bike races'), T('cyc', 'cycling races'), T('sub', 'road races', { parent: 'cyc' }));
  const ws = Array.from({ length: 10 }, (_, i) => addEntry(P, 'race' + 'abcdefghij'[i], { fam: 2, typ: {} }));
  ws.forEach((e, i) => { if (i < 8) e.typ.bike = 2; e.typ.cyc = 2; if (i < 9) e.typ.sub = 2; });
  reindex(P);
  const tt = kinds(P, 'theme-twin');
  assert.deepEqual(tt.map(i => i.themeId), ['bike', 'bike']);   // bike (8 words) in cycling races (10) and in road races (9); road races is inside cycling races: not reported
  assert.match(tt[0].msg, /8 of its 8 words/);
  THEME_TWIN_OK.add('bike|cyc'); THEME_TWIN_OK.add('bike|sub');
  try { assert.equal(kinds(P, 'theme-twin').length, 0); } finally { THEME_TWIN_OK.clear(); }
});

test('xwords-twin: an "X words" theme sharing 30% of its words with another theme, unrelated or parent and child (not a grandparent); THEME_TWIN_OK silences it', async () => {
  const { THEME_TWIN_OK } = await import('../js/theme-twin-allow.js');
  const P = contractProject();
  P.themes.push(T('mil', 'military'), T('army', 'army words', { parent: 'mil' }), T('fleet', 'fleets', { parent: 'mil' }), T('navy', 'navy words', { parent: 'fleet' }), T('sea', 'sea'), T('few', 'camp words'));
  const w = Array.from({ length: 10 }, (_, i) => addEntry(P, 'arm' + 'abcdefghij'[i], { fam: 2, typ: { army: 2 } }));
  const n = Array.from({ length: 6 }, (_, i) => addEntry(P, 'nav' + 'abcdef'[i], { fam: 2, typ: { navy: 2 } }));
  w.slice(0, 4).forEach(e => { e.typ.mil = 2; e.typ.navy = 2; });   // military holds 4 of army words' 10 (40%); navy words holds 4 of them too
  n[0].typ.fleet = 2; n[1].typ.fleet = 2; n[2].typ.fleet = 2; n[3].typ.fleet = 2;   // fleets: navy words' parent, 4 of its 10 (40%)
  w[9].typ.sea = 2; n[5].typ.sea = 2; n[4].typ.sea = 2;                             // sea: 1 or 2 of 10, under 30%
  for (const e of w.slice(0, 2)) e.typ.few = 2;                                     // camp words: 2 of army words' 10 (20%), and too few words to be reported itself
  reindex(P);
  const xs = kinds(P, 'xwords-twin');
  assert.deepEqual(xs.map(i => [i.themeId, i.msg.match(/with "([^"]+)"/)[1]]), [['army', 'military'], ['army', 'navy words'], ['navy', 'fleets']]);   // navy words and military: grandparent, not reported; the army/navy pair once
  assert.match(xs[0].msg, /4 of its 10 words \(40%\) with "military" \(its parent\) \(4 words\)/);
  assert.match(xs[2].msg, /\(its parent\)/);
  THEME_TWIN_OK.add('army|mil'); THEME_TWIN_OK.add('army|navy'); THEME_TWIN_OK.add('fleet|navy');
  try { assert.equal(kinds(P, 'xwords-twin').length, 0); } finally { THEME_TWIN_OK.clear(); }
});

// The four wrong senses v430 fixed: trench [ocean] in army words, pommel [sword] in horse riding words, talon [bird] and shuffle [walk] in card game words.
function senseProject() {
  const P = contractProject();
  P.themes.push(T('mil', 'military'), T('army', 'army words', { parent: 'mil' }), T('ocean', 'ocean'),
    T('tack', 'horse tack'), T('ride', 'horse riding words'), T('fence', 'fencing terms'),
    T('cards', 'card game words'), T('sol', 'solitaire'), T('prey', 'birds of prey'), T('walk', 'ways of walking'));
  const add = (text, gloss, typ, over = {}) => addEntry(P, text, { gloss, fam: 2, typ, ...over });
  for (const [t, g] of [['soldier', ''], ['military base', ''], ['drill', 'military'], ['rank', 'military']]) add(t, g, { mil: 2, army: 2 });
  add('march', '', { army: 2 });
  for (const t of ['wave', 'reef', 'tide']) add(t, '', { ocean: 2 });
  const tm = add('trench', 'military', { mil: 2 }), to = add('trench', 'ocean', { ocean: 3, army: 5 });
  for (const t of ['saddle', 'stirrup', 'reins', 'bridle', 'girth']) add(t, '', { tack: 2, ride: 2 });
  for (const t of ['side saddle', 'saddle horn', 'canter']) add(t, '', { ride: 3 });
  for (const t of ['foil', 'epee', 'parry']) add(t, '', { fence: 3 });
  const ps = add('pommel', 'saddle part', { tack: 4 }), pw = add('pommel', 'sword', { fence: 4, ride: 4 });
  for (const t of ['deal', 'trick']) add(t, 'cards', { cards: 2, sol: 2 });
  add('trump', 'cards', { cards: 2 }); add('ante', '', { cards: 3 }); add('foundation', '', { sol: 3 });
  for (const t of ['eagle', 'hawk', 'owl']) add(t, '', { prey: 1 });
  for (const t of ['stroll', 'amble', 'trudge']) add(t, '', { walk: 2 }, { pos: 'verb' });
  const tc = add('talon', 'cards', { sol: 4 }), tb = add('talon', 'bird', { prey: 2, cards: 4 });
  const sc = add('shuffle', 'cards', { sol: 1 }, { pos: 'verb' }), sw = add('shuffle', 'walk', { walk: 3, cards: 1 }, { pos: 'verb' });
  reindex(P);
  return { P, tm, to, ps, pw, tc, tb, sc, sw };
}

test('sense-link: a link on a sense whose same-text sibling fits the theme clearly better (v430: trench, pommel, talon, shuffle); the allow list and wordplay themes are quiet', async () => {
  const { SENSE_OK } = await import('../js/sense-allow.js');
  const { P, to, tm, pw, tb, tc, sw } = senseProject();
  const got = () => kinds(P, 'sense-link').map(i => [i.themeId, i.entryId]).sort();
  assert.deepEqual(got(), [['army', to.id], ['cards', sw.id], ['cards', tb.id], ['ride', pw.id]].sort());
  const msg = kinds(P, 'sense-link').find(i => i.entryId === to.id).msg;
  assert.match(msg, /"trench \(ocean\)" is in "army words", but "trench \(military\)" fits it better/);
  assert.match(msg, new RegExp(`entry ${tm.id}`));
  SENSE_OK.add(`${Math.min(tb.id, tc.id)}|${Math.max(tb.id, tc.id)}|cards`);   // one theme only
  try { assert.deepEqual(got(), [['army', to.id], ['cards', sw.id], ['ride', pw.id]].sort()); } finally { SENSE_OK.clear(); }
  // no neighbours: pommel [saddle part] in no theme, so nothing says it is the horse riding sense
  const { P: P2, ps } = senseProject(); ps.typ = {}; reindex(P2);
  assert.ok(!kinds(P2, 'sense-link').some(i => i.themeId === 'ride'));
  // a wordplay theme: the sense is not the point
  const { P: P3 } = senseProject(); P3.ix.theme.get('cards').tkind = 'wordplay'; P3.ix.theme.get('cards').rule = 'curated';
  assert.ok(!kinds(P3, 'sense-link').some(i => i.themeId === 'cards'));
});

test('theme-gap: the 4th-easiest word 2 or more bands above the theme difficulty is a warning (I30)', () => {
  const P = contractProject();
  P.themes.push(T('hard', 'hard words', { ident: 2, pop: 3 }), T('fine', 'fine words', { ident: 3, pop: 3 }), T('three', 'three words', { ident: 1, pop: 3 }));
  for (const c of 'abcde') { addEntry(P, 'hard' + c, { fam: 4, typ: { hard: 2, fine: 2 } }); }
  for (const c of 'abc') addEntry(P, 'three' + c, { fam: 5, typ: { three: 5 } });   // three words: thin, not a gap
  addEntry(P, 'easy', { fam: 1, typ: { hard: 1 } });   // one easy word does not close the gap
  reindex(P);
  const g = kinds(P, 'theme-gap');
  assert.deepEqual(g.map(i => [i.sev, i.themeId]), [['warn', 'hard']]);   // fine: difficulty 3, band 4, gap 1
  assert.match(g[0].msg, /theme difficulty 2 .*band 4 \(gap 2\)/);
});

test('diff rules: an added or changed entry needs status rev; an accented root the change touched keeps its plain alias (rule 8)', async () => {
  const { diffRules, diffRuleLines } = await import('../tools/checks-core.mjs');
  const { plainText } = await import('../js/model.js');
  const base = contractProject();
  const jal = addEntry(base, 'jalapeño', { fam: 2, typ: { fruits: 4 }, status: 'rev' }); addEntry(base, 'jalapeno', { fam: 2, aliasOf: jal.id, aliasKind: 'spelling', status: 'rev' });
  const old = addEntry(base, 'açaí', { fam: 3, typ: { fruits: 5 }, status: 'gen' });   // an older gap: not this change's
  for (const e of base.entries) e.status = 'rev'; old.status = 'gen';
  reindex(base);
  const next = parseProject(serializeProject(base)); reindex(next);
  assert.deepEqual(diffRules(base, next, plainText), { notRev: [], lostPlain: [] });
  next.entries.find(e => e.text === 'apple').fam = 2;                                  // changed, still rev: fine
  next.entries.find(e => e.text === 'pear').fam = 3; next.entries.find(e => e.text === 'pear').status = 'gen';
  addEntry(next, 'mango', { fam: 1, typ: { fruits: 2 }, status: 'gen' });
  next.entries = next.entries.filter(e => e.text !== 'jalapeno');                      // the plain alias goes
  addEntry(next, 'piñata', { fam: 2, typ: { fruits: 5 }, status: 'rev' });            // new, accented, no plain alias
  reindex(next);
  const d = diffRules(base, next, plainText);
  assert.deepEqual(d.notRev.map(x => [x.text, x.how]), [['pear', 'changed'], ['mango', 'added']]);
  assert.deepEqual(d.lostPlain.map(x => x.text), ['jalapeño', 'piñata']);
  assert.equal(diffRuleLines(d).length, 4);
});

test('gate identity, accept list and approvals: a swap within the count is new; raised counts and added keys are reported', async () => {
  const { newIssues, issueKey, baselineRaises, allowAdds } = await import('../tools/checks-core.mjs');
  const a = { sev: 'warn', kind: 'theme-name', msg: 'old wording', themeId: 't', entryId: 1 };
  assert.deepEqual(newIssues([{ ...a, msg: 'new wording' }], [a]), []);                // the same issue reworded
  const b = { ...a, entryId: 2 };
  assert.deepEqual(newIssues([b], [a]), [b]);                                          // one fixed, one added
  assert.deepEqual(newIssues([b], [a], false, new Set([issueKey(b)])), []);            // accepted
  assert.deepEqual(baselineRaises({ warn: { long: 5 }, contract: {} }, { note: 'x', library: 412, warn: { long: 6, x: 0 }, contract: { 'contract-thin': 1 }, accept: ['k'] }),
    ['tools/checks-baseline.json warn.long: 5 -> 6', 'tools/checks-baseline.json contract.contract-thin: 0 -> 1', 'tools/checks-baseline.json accept: 1 key added (k)']);
  assert.deepEqual(baselineRaises({ warn: { long: 5 } }, { warn: { long: 4 } }), []);
  assert.deepEqual(allowAdds('f.js', 'X', new Set(['a']), new Set(['a', 'b'])), ['f.js X: 1 key added (b)']);
  assert.deepEqual(allowAdds('f.js', 'X', undefined, new Set()), []);
});

test('theme tree: a missing parent, a cycle and a duplicate id are errors; a cycle stops the other checks', () => {
  const P = contractProject();
  P.themes.find(t => t.id === 'pals').parent = 'nowhere';
  P.themes.push(T('fruits', 'fruits again'));
  reindex(P);
  assert.deepEqual(validate(P).filter(i => i.sev === 'error').map(i => i.kind).sort(), ['theme-dup-id', 'theme-parent']);
  P.themes.pop(); P.themes.find(t => t.id === 'pals').parent = null;
  P.themes.find(t => t.id === 'food').parent = 'fruits'; reindex(P);
  const v = validate(P);
  assert.ok(v.length >= 2 && v.every(i => i.kind === 'theme-parent'));
});

test('alias-links: an alias with a theme link, shown text or kin is an error; the root is the link target', () => {
  const P = project();
  const r = addEntry(P, 'sofa', { fam: 1, typ: { fruits: 1 } });
  const a = addEntry(P, 'settee', { fam: 3, aliasOf: r.id, aliasKind: 'synonym' });
  const sp = addEntry(P, 'sofah', { fam: 3, aliasOf: r.id, aliasKind: 'spelling' });
  reindex(P);
  assert.ok(!validate(P).some(x => x.kind === 'alias-links'));
  a.typ.fruits = 2; reindex(P);
  const bad = validate(P).filter(x => x.kind === 'alias-links');
  assert.equal(bad.length, 1); assert.equal(bad[0].sev, 'error');
  delete a.typ.fruits; sp.typ.citrus = 1; reindex(P);   // any kind
  assert.equal(validate(P).filter(x => x.kind === 'alias-links').length, 1);
  // the "+ Add words" and generate paths link linkTarget(entry), never an alias
  assert.equal(linkTarget(P, a), r); assert.equal(linkTarget(P, sp), r); assert.equal(linkTarget(P, r), r);
  const m = linkTarget(P, a); m.typ.citrus = 2; assert.equal(a.typ.citrus, undefined);
});

test('offensive: the old vulgar field loads as offensive; the matcher follows the name, hyphen and whole-word rules', () => {
  const Q = parseProject('{"project":{"schema":1,"lang":"en","lib":{"version":1}},"themes":[],"entries":[{"id":1,"text":"bitch","gloss":"female dog","vulgar":true}]}');
  assert.equal(Q.entries[0].offensive, true); assert.ok(!('vulgar' in Q.entries[0]));
  assert.ok(serializeProject(Q).includes('"offensive":true'));
  const m = (text, type = 'common') => offensiveMatch({ text, type });
  assert.equal(m('witch'), 'witch'); assert.equal(m('witches'), 'witch'); assert.equal(m('wicked witch'), 'witch'); assert.equal(m("devil's claw"), 'devil');
  assert.equal(m('switch'), null); assert.equal(m('cocktail'), null); assert.equal(m('scrape'), null); assert.equal(m('shell'), null);
  assert.equal(m('Moby Dick', 'title'), null); assert.equal(m('Negro', 'place'), 'negro'); assert.equal(m('cock-a-doodle-doo'), null);
  assert.equal(m('choc ice'), 'choc ice'); assert.equal(m('cow'), null); assert.equal(m('spade'), null);
  assert.equal(offensivePiece('cock'), 'cock'); assert.equal(offensivePiece('tail'), null);
});

test('offensive: checks report an unflagged word, a theme name, and thin counts leave offensive words out', () => {
  const P = project();
  for (const w of ['apple', 'pear', 'plum']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  const bad = addEntry(P, 'witch', { gloss: 'sorceress', fam: 1, typ: { fruits: 2 } });
  addEntry(P, 'witch', { gloss: 'flatfish', fam: 4, offensive: true });
  P.themes.push(T('wiz', 'wizard words'));
  reindex(P);
  const kinds = k => validate(P).filter(i => i.kind === k);
  assert.deepEqual(kinds('offensive-word').map(i => i.entryId), [bad.id]);
  assert.equal(kinds('offensive-theme').length, 1);
  assert.equal(kinds('thin').filter(i => i.themeId === 'fruits').length, 0);   // 4 words, none offensive yet
  bad.offensive = true; P.themes.find(t => t.id === 'wiz').offensive = true; reindex(P);
  assert.equal(kinds('offensive-word').length, 0); assert.equal(kinds('offensive-theme').length, 0);
  assert.equal(kinds('thin').filter(i => i.themeId === 'fruits').length, 1);   // 3 words that are not offensive
});

test('offensive: a flagged theme leaves the default export with its words and carries theme bit 256 when included', () => {
  const P = project();
  for (const w of ['apple', 'pear', 'plum', 'fig']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  P.themes.find(t => t.id === 'fruits').offensive = true;
  reindex(P);
  const fruitsRow = X => X.themes.find(r => r[0] === 'fruits');
  assert.equal(buildExport(P).file.entries.text.length, 0);
  const inc = buildExport(P, { offensive: 'include' }).file;
  assert.equal(inc.entries.text.length, 4); assert.ok(fruitsRow(inc)[3] & 256);
  assert.equal(buildExport(P, { vulgar: 'include' }).file.entries.text.length, 4);   // a preset saved before the rename
});

// ---------- level fields: firstLevel and mustLevels (Simon, 2026-11-27) ----------
const levelProject = () => {
  const P = newProject();
  P.themes = parseOutline('Things:\n  fruits [pop:2] [ident:1]\n  trees [pop:2] [ident:1]\n').themes;
  for (const w of ['apple', 'pear', 'plum', 'fig']) addEntry(P, w, { fam: 1, typ: { fruits: 1 } });
  for (const w of ['oak', 'ash', 'elm', 'yew']) addEntry(P, w, { fam: 1, typ: { trees: 1 } });
  reindex(P);
  return P;
};
const LEVEL_KINDS = ['level-bad', 'level-below-first', 'level-unplayable', 'level-crowded'];
const levelIssues = P => validate(P).filter(i => LEVEL_KINDS.includes(i.kind));

test('levels: the outline tags [from:] and [at:] round-trip; [sensitive] reads as from 31 and is never written', () => {
  const text = 'Things:\n  fruits [from:40] [at:e5,12;m8;h3]\n  trees [from:-/30/-]\n  nuts [from:5/10/20] [at:h40]\n';
  const { themes, errors } = parseOutline(text);
  assert.deepEqual(errors, []);
  assert.deepEqual(themes[1].firstLevel, [40, 40, 40]);
  assert.deepEqual(themes[1].mustLevels, [[5, 12], [8], [3]]);
  assert.deepEqual(themes[2].firstLevel, [null, 30, null]);
  assert.equal(themes[2].mustLevels, null);
  assert.deepEqual(themes[3].mustLevels, [[], [], [40]]);
  assert.equal(formatOutline(themes), text);
  const old = parseOutline('a [sensitive]\nb [sensitive] [from:-/20/-]\nc [at:m12,5,5]\n').themes;
  assert.deepEqual(old.map(t => t.firstLevel), [[31, 31, 31], [null, 20, null], null]);
  assert.deepEqual(old[2].mustLevels, [[], [5, 12], []]);   // sorted, duplicates dropped
  assert.ok(old.every(t => !('sensitive' in t)));
  assert.equal(formatOutline(old), 'a [from:31]\nb [from:-/20/-]\nc [at:m5,12]\n');
  for (const bad of ['[from:0]', '[from:1/2]', '[from:x]', '[from:-]', '[at:x5]', '[at:e0]', '[at:e5,a]', '[at:]']) assert.equal(parseOutline('t ' + bad + '\n').errors.length, 1, bad);
});

test('levels: the file leaves out empty fields, keeps set ones, and loads a theme sensitive flag as firstLevel 31', () => {
  const P = levelProject();
  const fr = P.ix.theme.get('fruits'), tr = P.ix.theme.get('trees');
  fr.firstLevel = [null, null, null]; fr.mustLevels = [[], [], []];
  tr.firstLevel = [5, null, 20]; tr.mustLevels = [[5], [], [20, 30]];
  const text = serializeProject(P);
  const line = (t, id) => t.split('\n').find(l => l.includes(`"id":"${id}"`));
  assert.ok(!/firstLevel|mustLevels/.test(line(text, 'fruits')));
  assert.ok(!/firstLevel|mustLevels/.test(line(text, 'things')));   // newTheme's nulls are not written
  const Q = parseProject(text), q = Q.themes.find(t => t.id === 'trees');
  assert.deepEqual([q.firstLevel, q.mustLevels], [[5, null, 20], [[5], [], [20, 30]]]);
  assert.ok(!('firstLevel' in Q.themes.find(t => t.id === 'fruits')));
  // A library from before 2026-11-27: a theme's sensitive: true becomes firstLevel [31, 31, 31] unless it has one; sensitive: false just goes.
  const legacy = text.replace('"id":"fruits",', '"id":"fruits","sensitive":true,').replace('"id":"things",', '"id":"things","sensitive":false,').replace('"id":"trees",', '"id":"trees","sensitive":true,');
  const L = parseProject(legacy), byId = id => L.themes.find(t => t.id === id);
  assert.deepEqual(byId('fruits').firstLevel, [31, 31, 31]);
  assert.deepEqual(byId('trees').firstLevel, [5, null, 20]);   // its own firstLevel wins
  assert.ok(L.themes.every(t => !('sensitive' in t)));
  const out = serializeProject(L);
  for (const id of ['fruits', 'things', 'trees']) assert.ok(!line(out, id).includes('sensitive'), id);
  // A script that still sets a theme's sensitive: written as firstLevel 31.
  P.ix.theme.get('fruits').sensitive = true;
  assert.ok(line(serializeProject(P), 'fruits').includes('"firstLevel":[31,31,31]'));
});

test('levels: each check fires, and a clean theme is quiet', () => {
  let P = levelProject();
  assert.deepEqual(levelIssues(P), []);
  P.ix.theme.get('fruits').firstLevel = [5, null, 31]; P.ix.theme.get('fruits').mustLevels = [[5, 9], [], [31]];
  assert.deepEqual(levelIssues(P), []);   // set and valid
  const one = (mut, kind) => { const Q = levelProject(); mut(Q, Q.ix.theme.get('fruits')); reindex(Q); const got = levelIssues(Q); assert.deepEqual(got.map(i => i.kind), [kind], kind + ': ' + JSON.stringify(got)); return got[0]; };
  one((Q, t) => { t.firstLevel = [0, null, null]; }, 'level-bad');
  one((Q, t) => { t.firstLevel = [5, 6]; }, 'level-bad');
  one((Q, t) => { t.firstLevel = [2.5, null, null]; }, 'level-bad');
  one((Q, t) => { t.mustLevels = [[5, 5], [], []]; }, 'level-bad');
  one((Q, t) => { t.mustLevels = [[9, 5], [], []]; }, 'level-bad');
  one((Q, t) => { t.mustLevels = [[5], []]; }, 'level-bad');
  one((Q, t) => { t.mustLevels = [['5'], [], []]; }, 'level-bad');
  const below = one((Q, t) => { t.firstLevel = [31, 31, 31]; t.mustLevels = [[], [12, 40], []]; }, 'level-below-first');
  assert.match(below.msg, /medium level 12, below its first medium level 31/);
  one((Q, t) => { t.mustLevels = [[5], [], []]; t.adult = true; }, 'level-unplayable');
  one((Q, t) => { t.mustLevels = [[5], [], []]; t.offensive = true; }, 'level-unplayable');
  one((Q, t) => { t.mustLevels = [[5], [], []]; t.enabled = false; }, 'level-unplayable');
  one((Q, t) => { t.mustLevels = [[5], [], []]; t.pop = 0; }, 'level-unplayable');
  one(Q => { Q.ix.theme.get('things').mustLevels = [[5], [], []]; }, 'level-unplayable');   // a group
  const thin = one((Q, t) => { t.mustLevels = [[5], [], []]; Q.entries.find(e => e.text === 'fig').typ = {}; }, 'level-unplayable');
  assert.match(thin.msg, /3 usable words \(at least 4 needed\)/);
  // level-crowded: only with settings.themesPerLevel
  P = levelProject();
  P.ix.theme.get('fruits').mustLevels = [[5], [], []]; P.ix.theme.get('trees').mustLevels = [[5, 6], [], []];
  assert.deepEqual(levelIssues(P), []);   // no setting: skipped
  P.settings.themesPerLevel = 2; assert.deepEqual(levelIssues(P), []);
  P.settings.themesPerLevel = 1;
  const c = levelIssues(P);
  assert.deepEqual(c.map(i => [i.sev, i.kind]), [['warn', 'level-crowded']]);
  assert.match(c[0].msg, /2 themes must appear in easy level 5/);
});

test('levels: the export writes firstLevel and mustLevels after the fixed theme columns; bit 2 is no longer written (v519)', () => {
  const P = levelProject();
  const fr = P.ix.theme.get('fruits'), tr = P.ix.theme.get('trees');
  fr.firstLevel = [31, 31, 40]; fr.mustLevels = [[], [35], []];
  tr.firstLevel = [null, 31, 31];
  P.ix.theme.get('things').firstLevel = [31, 31, 31];
  addEntry(P, 'kiwi', { fam: 1, typ: { fruits: 1 }, firstLevel: [31, 31, 31] });
  reindex(P);
  const { file } = buildExport(P);
  const tf = file.themeFields, row = id => file.themes.find(r => r[0] === id), col = (id, k) => row(id)[tf.indexOf(k)];
  assert.deepEqual(tf.slice(-2), ['firstLevel', 'mustLevels']);
  assert.equal(row('fruits').length, tf.length);
  assert.deepEqual(col('fruits', 'firstLevel'), [31, 31, 40]);
  assert.deepEqual(col('fruits', 'mustLevels'), [[], [35], []]);
  assert.deepEqual(col('trees', 'firstLevel'), [null, 31, 31]);
  assert.equal(col('trees', 'mustLevels'), null);
  assert.deepEqual([col('things', 'firstLevel'), col('things', 'mustLevels')], [null, null]);   // a group row
  assert.ok(!(row('fruits')[3] & 2)); assert.ok(!(row('trees')[3] & 2));   // bit 2 is no longer written (v519): the game reads firstLevel
  // The sensitive filter: a link whose word or theme has firstLevel 31+ in every mode. fruits has [31, 31, 40]: all its links go; trees ([null, 31, 31]) stays.
  const ex = buildExport(P, { sensitive: 'exclude', minWords: 1 }).file;
  assert.ok(!ex.entries.text.includes('kiwi') && !ex.entries.text.includes('apple') && ex.entries.text.includes('oak'));
  fr.firstLevel = [30, 31, 31];
  const ex2 = buildExport(P, { sensitive: 'exclude' }).file;
  assert.ok(!ex2.entries.text.includes('kiwi') && ex2.entries.text.includes('apple'));   // the word's own firstLevel
  // The note column, when asked for, comes after them.
  assert.deepEqual(buildExport(P, { notes: true }).file.themeFields.slice(-3), ['firstLevel', 'mustLevels', 'note']);
});

test('levels on words: a root sensitive flag loads as firstLevel 31, an alias drops it; aliases follow the root in the export; checks', () => {
  const P = levelProject();
  const apple = P.entries.find(e => e.text === 'apple'), pear = P.entries.find(e => e.text === 'pear');
  const al = addEntry(P, 'apples', { fam: 1, aliasOf: apple.id, aliasKind: 'form' });
  // legacy file: sensitive on a root, on another root that has a firstLevel, and on an alias
  const text = serializeProject(P).replace(`{"id":${apple.id},"text":"apple",`, `{"id":${apple.id},"text":"apple","sensitive":true,`)
    .replace(`{"id":${pear.id},"text":"pear",`, `{"id":${pear.id},"text":"pear","sensitive":true,"firstLevel":[null,5,null],`)
    .replace(`{"id":${al.id},"text":"apples",`, `{"id":${al.id},"text":"apples","sensitive":true,`);
  assert.ok((text.match(/"sensitive":true/g) || []).length === 3);
  const L = parseProject(text), by = t => L.entries.find(e => e.text === t);
  assert.deepEqual([by('apple').firstLevel, by('pear').firstLevel, by('apples').firstLevel, by('plum').firstLevel], [[31, 31, 31], [null, 5, null], null, null]);
  assert.ok(L.entries.every(e => !('sensitive' in e)));
  const out = serializeProject(L);
  assert.ok(!out.includes('sensitive') && !/"text":"plum"[^\n]*firstLevel/.test(out) && /"text":"apple"[^\n]*"firstLevel":\[31,31,31\]/.test(out));
  // export: the entry column, the alias carries its root's value, no bit 2 (v519)
  reindex(L);
  const { file } = buildExport(L);
  const i = t => file.entries.text.indexOf(t), E = file.entries;
  assert.equal(Object.keys(E).at(-1), 'firstLevel');
  assert.deepEqual([E.firstLevel[i('apple')], E.firstLevel[i('apples')], E.firstLevel[i('pear')], E.firstLevel[i('plum')]], [[31, 31, 31], [31, 31, 31], [null, 5, null], null]);
  assert.ok(!(E.flags[i('apple')] & 2)); assert.ok(!(E.flags[i('apples')] & 2)); assert.ok(!(E.flags[i('pear')] & 2));
  // checks: a clean set is quiet; a bad value or a firstLevel on an alias is level-bad
  assert.deepEqual(levelIssues(L), []);
  by('apples').firstLevel = [31, 31, 31]; by('plum').firstLevel = [0, null, null];
  assert.deepEqual(levelIssues(L).map(x => [x.kind, x.entryId]).sort(), [['level-bad', by('apples').id], ['level-bad', by('plum').id]].sort());
});

test('kinds people and name: exported at the end of kindNames; kind-people and kind-name warn on a missing or wrong kind', () => {
  const P = newProject();
  const T = (id, name, parent = null, x = {}) => ({ id, name, parent, group: false, enabled: true, region: [], pop: 2, ident: 2, ...x });
  P.themes.push(T('scientists', 'scientists'), T('painters', 'painters', null, { tkind: 'people' }), T('mixed', 'mixed', null, { tkind: 'people' }),
    { ...T('names', 'names'), group: true }, T('girls_names', "girls' names", 'names'), T('boys_names', "boys' names", 'names', { tkind: 'name' }));
  reindex(P);
  const add = (text, type, tid) => addEntry(P, text, { type, fam: 1, typ: { [tid]: 1 } });
  for (const w of ['Newton', 'Curie', 'Darwin', 'Einstein']) add(w, 'person', 'scientists');
  for (const w of ['Monet', 'Turner', 'Goya', 'Klimt']) add(w, 'person', 'painters');
  for (const w of ['Rembrandt', 'easel', 'canvas', 'palette']) add(w, w === 'Rembrandt' ? 'person' : 'common', 'mixed');
  for (const w of ['Olivia', 'Emma', 'Ava', 'Mia']) add(w, 'person', 'girls_names');
  for (const w of ['Jack', 'Leo', 'Noah', 'Liam']) add(w, 'person', 'boys_names');
  reindex(P);
  const v = validate(P), of = k => v.filter(i => i.kind === k).map(i => i.themeId).sort();
  assert.deepEqual(of('kind-people'), ['mixed', 'scientists']);
  assert.deepEqual(of('kind-name'), ['girls_names']);
  const f = buildExport(P, {}).file, k = f.themeFields.indexOf('kind'), row = id => f.themes.find(r => r[0] === id);
  assert.deepEqual(f.kindNames.slice(-2), ['people', 'name']);
  assert.equal(f.kindNames[row('painters')[k]], 'people');
  assert.equal(f.kindNames[row('boys_names')[k]], 'name');
});
