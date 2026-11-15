// The style rule (DESIGN-entries.md, Capital rule and lint), applied entry by entry. Decided by Simon's instruction of 2026-11-15
// ("standardise them all with a rule"), after he made gothic and byzantine lowercase among the art movements.
//
// Rule: the name of a style, movement or school (art, architecture, design, literature, fashion) is lowercase. A word in it keeps a capital
// only when English has that word only as a name or the adjective of a name: a person or ruler (Victorian, Georgian, Tudor, Palladian,
// Queen Anne, Pre-Raphaelite), a place or people (Greek, Norman, Moorish, Chicago, Cape Cod), an organisation (Bauhaus), or a word coined
// from a name that has no lowercase use (Romanesque, Italianate). A word English also uses in lowercase is lowercase as a style name, even
// if it began as a name: gothic, byzantine, baroque, rococo, renaissance, regency, colonial, empire, dada, art deco, art nouveau.
// The name of a historical period is a name: the Renaissance, the Baroque, the Regency keep their capital where the period is meant.
// Titles and trademarks keep their own spelling (American Gothic, Century Gothic).
//
// Each line below is one decision: [id, text as it should be, type]. The script changes nothing when an entry is already right, so it can
// be run again after a later pass as a check. Shown texts follow the case of the entry text word by word.
// Run: node tools/gen/style-case.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint } from '../../js/caselint.js';
import { parseFreq, setFreq } from '../../js/freq.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(here('../../data/freq-en.txt'), 'utf8')));
const errors = () => validate(P).filter(i => i.sev === 'error').length;
const errorsBefore = errors();

const STYLES = [
  // lowercase: the word also lives in lowercase
  [6594, 'art deco', 'common'], [6361, 'art nouveau', 'common'], [6593, 'baroque', 'common'], [13938, 'beaux-arts', 'common'],
  [6595, 'brutalism', 'common'], [13928, 'brutalist', 'common'], [13934, 'byzantine architecture', 'common'], [11994, 'byzantine art', 'common'],
  [13931, 'colonial', 'common'], [67021, 'colonial architecture', 'common'], [13948, 'craftsman', 'common'], [6359, 'dada', 'common'],
  [13937, 'deconstructivism', 'common'], [24363, 'empire line', 'common'], [6592, 'gothic', 'common'], [11993, 'gothic art', 'common'],
  [13168, 'gothic fiction', 'common'], [13932, 'gothic revival', 'common'], [13950, 'international style', 'common'],
  [13947, 'mid-century modern', 'common'], [13955, 'mission revival', 'common'], [13929, 'modernist', 'common'], [13930, 'neoclassical', 'common'],
  [13951, 'perpendicular', 'common'], [13936, 'postmodern', 'common'], [13949, 'prairie style', 'common'], [13941, 'regency', 'common'],
  [13925, 'renaissance', 'common'], [13939, 'rococo', 'common'], [13945, 'streamline moderne', 'common'],
  // a capital only on the name inside
  [13952, 'Chicago school', 'proper'], [13943, 'Greek revival', 'proper'], [13953, 'Tudor revival', 'proper'],
  [11995, 'Pre-Raphaelites', 'proper'], [24161, 'Cape Cod', 'proper'],
];
const core = w => w.replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, '');
const alignCase = (show, text) => { const m = new Map(text.split(/\s+/).map(core).filter(Boolean).map(w => [w.toLowerCase(), w])); return show.split(/(\s+)/).map(tok => { const c = core(tok); return c && m.has(c.toLowerCase()) ? tok.replace(c, m.get(c.toLowerCase())) : tok; }).join(''); };
let n = 0; const log = [];
for (const [id, text, type] of STYLES) {
  const e = P.ix.entry.get(id);
  if (!e || e.text.toLowerCase() !== text.toLowerCase()) throw Error(`entry ${id} is not "${text}"` + (e ? ` but "${e.text}"` : ''));
  if (e.text !== text) { log.push(`text: ${e.text} -> ${text}`); e.text = text; n++; }
  if (e.type !== type) { log.push(`type: ${text}: ${e.type} -> ${type}`); e.type = type; n++; }
  for (const [t, s] of Object.entries(e.show || {})) { const s2 = alignCase(s, text); if (s2 === text) { delete e.show[t]; n++; log.push(`shown text dropped: ${text} in ${t}`); } else if (s2 !== s) { e.show[t] = s2; n++; log.push(`shown: ${text} in ${t}: ${s} -> ${s2}`); } }
}
// The Renaissance: the period (6318) keeps its capital in the themes of periods; in "art movements" and "art" the style is meant, so those links
// move to the lowercase entry (13925), which becomes the style in art and architecture.
{ const period = P.ix.entry.get(6318), style = P.ix.entry.get(13925);
  if (style.gloss !== 'style') { log.push(`label: renaissance [${style.gloss}] -> [style]`); style.gloss = 'style'; n++; }
  for (const tid of ['art_movements', 'art']) {
    if (period.typ[tid] === undefined) continue;
    if (style.typ[tid] === undefined) style.typ[tid] = period.typ[tid];
    delete period.typ[tid]; if (period.show) delete period.show[tid]; n++;
    for (const th of P.themes) if (th.id === tid && th.groups) th.groups = th.groups.map(g => g.map(x => x === 6318 ? 13925 : x));
    log.push(`link moved: ${tid} now holds renaissance [style], not Renaissance [period]`);
  } }
reindex(P);
const lint = caseLint(P), errorsAfter = errors();
console.log(log.join('\n'));
console.log(`\n${n} changes; Checks errors ${errorsBefore} -> ${errorsAfter}; case lint: ${lint.length}`);
for (const i of lint.slice(0, 20)) console.log('  ' + i.kind + ' | ' + i.msg);
if (errorsAfter > errorsBefore) for (const i of validate(P).filter(i => i.sev === 'error')) console.log('  ERROR ' + i.msg);
if (process.argv.includes('--apply') && n) {
  if (errorsAfter > errorsBefore) { console.error('Not applied: it would add Checks errors.'); process.exit(1); }
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
}
