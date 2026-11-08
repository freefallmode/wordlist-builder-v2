// Run: node --test tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseOutline, formatOutline } from '../js/outline.js';
import { newProject, addEntry, reindex, themeStats, difficultyBand, eff, deleteEntry, moveTheme, descendants, blendRatings, themeDifficulty } from '../js/model.js';
import { serializeProject, parseProject } from '../js/store.js';
import { validate, nameLeak } from '../js/validate.js';
import { buildExport } from '../js/export.js';
import { parseFreq, setFreq, zipf } from '../js/freq.js';

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
