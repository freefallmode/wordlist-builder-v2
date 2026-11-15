// Run: node --test tests/core.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseOutline, formatOutline } from '../js/outline.js';
import { newProject, addEntry, reindex, themeStats, difficultyBand, eff, deleteEntry, deleteTheme, unlinkEntry, moveTheme, descendants, blendRatings, themeDifficulty, mergeRegions } from '../js/model.js';
import { serializeProject, parseProject } from '../js/store.js';
import { validate, nameLeak } from '../js/validate.js';
import { buildExport } from '../js/export.js';
import { parseFreq, setFreq, zipf, loadFreq, freqLoaded } from '../js/freq.js';

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

test('export format 3: shown text, display form and clash ids travel with the link', () => {
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
  assert.equal(file.v, 3);
  assert.deepEqual(file.shown[link('rock garden')[3] - 1], ['rock', 0, []]);
  assert.deepEqual(file.shown[link('rain')[3] - 1], ['rainy', 2, []]);
  assert.equal(link('rain')[1], 1.7);                                 // the form's own familiarity (2) counts: 0.7 x 2 + 0.3 x 1 (typicality)
  assert.equal(link('fig')[3], 0);
  assert.ok(c.clash[at('rain')] > 0 && c.clash[at('rain')] === c.clash[at('rainfall')] && c.clash[at('fig')] === 0);
  assert.ok(validate(P).every(x => !/not one of its forms|display text/.test(x.msg)));
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
