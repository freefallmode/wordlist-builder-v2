// Run: node --test tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseOutline, formatOutline } from '../js/outline.js';
import { newProject, addEntry, reindex, themeStats, effRec, eff, deleteEntry, moveTheme, descendants } from '../js/model.js';
import { serializeProject, parseProject } from '../js/store.js';
import { validate } from '../js/validate.js';
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
  const couch = addEntry(P, 'sofa', { rec: 1, th: { fruits: 1 } });
  const settee = addEntry(P, 'settee', { rec: 3, aliasOf: couch.id, aliasKind: 'synonym' });
  reindex(P);
  assert.equal(themeStats(P, 'fruits').roots, 1);
  assert.equal(themeStats(P, 'fruits').entries, 2);
  assert.equal(effRec(P, settee, 'fruits'), 3);
  settee.th.fruits = 2;
  assert.equal(effRec(P, settee, 'fruits'), 2);
  deleteEntry(P, couch); reindex(P);
  assert.equal(settee.aliasOf, 0);
  assert.equal(effRec(P, settee, 'fruits'), 2);
});

test('same text needs a gloss; duplicates are errors', () => {
  const P = project();
  addEntry(P, 'bat', { th: { fruits: 1 }, gloss: 'animal' });
  addEntry(P, 'bat', { th: { citrus: 1 } });
  addEntry(P, 'bat', { th: { citrus: 1 } });
  reindex(P);
  const kinds = validate(P).map(i => i.kind);
  assert.ok(kinds.includes('needs-gloss'));
  assert.ok(kinds.includes('duplicate'));
});

test('project file round-trips and keeps defaults out', () => {
  const P = project();
  addEntry(P, 'lemon', { rec: 1, th: { citrus: 1, fruits: 2 } });
  const text = serializeProject(P);
  assert.ok(!text.includes('"adult":false'.replace('adult', 'vulgar')));
  const Q = parseProject(text);
  assert.equal(Q.entries.length, 1);
  assert.deepEqual(Q.entries[0].th, { citrus: 1, fruits: 2 });
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
  for (const w of ['apple', 'pear', 'plum', 'fig', 'grape']) addEntry(P, w, { rec: 1, th: { fruits: 1 } });
  for (const w of ['navy', 'sky', 'teal', 'cyan']) addEntry(P, w, { rec: 2, th: { shades_of_blue: 2 } });
  const rude = addEntry(P, 'rude', { rec: 2, vulgar: true, th: { fruits: 3 } });
  addEntry(P, 'cheeky', { rec: 2, aliasOf: rude.id, aliasKind: 'synonym' });
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

test('zipf combines phrases', () => {
  setFreq(parseFreq('50 ice\n50 cream'));
  assert.equal(zipf('ice'), 5);
  assert.equal(zipf('ice cream'), 4.7);
  assert.equal(zipf('ice zzz'), null);
});
