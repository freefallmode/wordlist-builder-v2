// Second pass on the theme-name leaks (library v217): the nine UK aliases of US roots that leak; the roots leave those themes too. Run once: node tools/gen/syn-leaks2.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const DROPS = [[1418, 'insects_and_bugs'], [1418, 'garden_bugs'], [5965, 'water_park'], [38477, 'shopping_words'], [35379, 'charity_words'], [23251, 'bins_and_recycling'], [23975, 'bins_and_recycling'], [24183, 'real_estate_words'], [4864, 'pants_and_shorts']];
for (const [id, theme] of DROPS) {
  const e = P.ix.entry.get(id); if (!e || e.th[theme] === undefined) { console.log('MISSING', id, theme); continue; }
  delete e.th[theme]; delete e.show[theme];
  const t = P.ix.theme.get(theme); if (t.groups) { t.groups = t.groups.map(g => g.filter(x => x !== id)).filter(g => g.length > 1); if (!t.groups.length) delete t.groups; }
  console.log('dropped', e.text, 'from', theme);
}
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
