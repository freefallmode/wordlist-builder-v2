// Library batch v378 (2026-11-16, approved by Simon: "fix the type inconsistencies"): brand names typed by the library's convention, `org` for a brand
//   (TYPE_HELP: company, brand, team, group), as in the brand themes where org+tm is the large majority (liqueurs 20, spreads, cereals, soft drinks, beers, American candy).
//   Only the outliers in those themes change; groups that are consistent among themselves (brand cheeses, hats, adhesives, toys and games, product models) are left for Simon.
//   Sets type and, where the rest of the group carries it, tm. Text is not touched; a different text or a missing entry stops the script.
// Changes nothing when already right, so it can be rerun as a check. Writes tools/gen/batch378-changes.txt. Run: node tools/gen/batch378.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const LIQ = 'liqueur brand; the liqueurs are org+tm (20 of 25 trademarked)', SNACK = 'snack brand; Capri-Sun, Lunchables, Fruit Roll-Up in lunchbox are org+tm';
// [id, text, type, tm (undefined: unchanged), reason]
const CH = [
  [53508, 'Amarula', 'org', undefined, LIQ], [53867, 'Cointreau', 'org', undefined, LIQ], [59882, 'Licor 43', 'org', undefined, LIQ],
  [59883, 'Tuaca', 'org', undefined, LIQ], [59884, 'Fernet-Branca', 'org', undefined, LIQ],
  [53870, 'Chartreuse', 'org', true, LIQ + '; trademark of the Carthusian distillery'], [59381, 'Benedictine', 'org', true, LIQ],
  [59382, 'Chambord', 'org', true, LIQ], [59877, 'Becherovka', 'org', true, LIQ], [59878, 'Unicum', 'org', true, LIQ], [59880, 'Averna', 'org', true, LIQ],
  [18157, 'Biscoff', 'org', undefined, 'cookie brand; Biscoff spread, Nutella, Marmite are org+tm'],
  [59893, 'Dunkaroos', 'org', undefined, SNACK], [59894, 'Gushers', 'org', undefined, SNACK], [59895, 'Uncrustables', 'org', undefined, SNACK],
  [59896, 'Go-Gurt', 'org', undefined, SNACK], [59897, 'Fruit by the Foot', 'org', undefined, SNACK],
  [40150, 'Starburst', 'org', undefined, 'candy brand; American candy is org+tm (38)'], [59403, 'Milky Way', 'org', true, 'candy bar brand; American candy is org+tm (38)'],
  [50099, 'Sapporo', 'org', undefined, 'beer brand; beers are org+tm (18)'], [19710, 'Sapporo', 'place', false, 'the city (gloss city); was typed org with tm, swapped with the beer'],
  [40172, 'Casio', 'org', undefined, 'company; Asian tech companies are org+tm (13)'], [50050, 'Mastodon', 'org', true, 'platform; social media platforms are org+tm (39)'],
];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const log = [];
let n = 0;
for (const [id, text, type, tm, why] of CH) {
  const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id} for "${text}"`);
  if (e.text !== text) throw Error(`entry ${id} is "${e.text}", expected "${text}"`);
  const d = [];
  if (e.type !== type) { d.push(`type ${e.type} -> ${type}`); e.type = type; }
  if (tm !== undefined && !!e.tm !== tm) { d.push(`tm ${!!e.tm} -> ${tm}`); e.tm = tm; }
  if (!d.length) continue;
  log.push(`${id} "${e.text}"  ${d.join(', ')}  (${why})${e.gloss ? '  [' + e.gloss + ']' : ''}`); n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  fs.writeFileSync(new URL('batch378-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch378.mjs, ${P.lib.modified}): ${n} entries changed (type, and tm where the group carries it; text unchanged).\n\n${log.join('\n')}\n`);
  console.log('library v' + P.lib.version);
}
