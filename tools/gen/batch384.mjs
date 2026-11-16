// Library batch v384 (2026-11-16): applies Simon's rule 9 (DESIGN-entries.md "Single-word names: rules 6 to 9", approved 2026-11-16) to the one entry it changes:
//   RECASE: Burgundy [wine] -> burgundy, common (both dictionaries print the wine lowercase; matches white burgundy). The region and colour entries are separate and unchanged.
//   The narrow rule-9 audit of the other wine entries (listed, not applied) and the Bordeaux flag are in tools/gen/batch384-changes.txt.
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch384.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
// [id, old text, new text, new type, reason]
const RECASE = [
  [19664, 'Burgundy', 'burgundy', 'common', 'rule 9 (rule 1 tie-break): Oxford prints the wine lowercase (burgundy), M-W lowercase with "often capitalized"; matches 53833 white burgundy (v383); 36306 Burgundy [region] (place) and 7691 burgundy [color] are separate entries, unchanged; no Simon decision in git history (capital since the depth-3 fill, 518bb6b), DESIGN-entries.md or ISSUES.md (T25 item 5 asked for this call); dictionaries not reachable from this session (M-W 403): recheck'],
];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const log = [];
let n = 0;
for (const [id, old, text, type, why] of RECASE) {
  const e = E(id);
  if (e.text === text && (e.type || 'common') === type) continue;
  if (e.text !== old) throw Error(`entry ${id} is "${e.text}", expected "${old}"`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.use || {}).length || Object.keys(e.show || {}).length) throw Error(`entry ${id} has aliases, use or show: check by hand`);
  const twin = P.entries.find(x => x !== e && x.text === text && (x.gloss || '') === (e.gloss || '')); if (twin) throw Error(`"${text}" [${e.gloss}] would repeat ${twin.id}`);
  const elsewhere = P.entries.find(x => x !== e && Object.values(x.show || {}).includes(old)); if (elsewhere) throw Error(`entry ${elsewhere.id} shows "${old}": check by hand`);
  const d = [`"${e.text}" -> "${text}"`]; if ((e.type || 'common') !== type) d.push(`type ${e.type || 'common'} -> ${type}`);
  log.push(`${id} ${d.join('  ')}${e.gloss ? '  [' + e.gloss + ']' : ''}  themes ${Object.keys(e.typ || {}).join(', ')}  (${why})`);
  e.text = text; e.type = type; n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const TXT = `Rules: Simon's rules 6 to 9, approved 2026-11-16 (DESIGN-entries.md "Single-word names: rules 6 to 9"). Rule 9: a wine named after a place is
  capital only when the dictionaries capitalise the sense; if both print it lowercase, or a dictionary could not be checked, it is lowercase. A call
  made without checking a dictionary is marked "recheck" here.
Git history: Burgundy [wine] has been capital since the depth-3 fill (518bb6b, v88); no Simon decision (git log -S, DESIGN-entries.md, ISSUES.md);
  ISSUES.md T25 item 5 asked whether rule 1's tie-break applies to it. No aliases, use or show texts; the region (36306, place) and the colour
  (7691, common) are separate entries and unchanged.
Recheck: Merriam-Webster refused the fetch (HTTP 403) and Oxford was not reachable, so the Burgundy call and the audit below rest on the
  dictionaries as remembered, not on a lookup made in this session. Earlier record: v383 found M-W "burgundy" lowercase, often capitalized
  (tools/gen/batch383-changes.txt, white burgundy).

Rule-9 audit (narrow: capital entries in the wine themes wines, red wines, white wines, wines named for places, red wine grapes, wine words). NOT applied;
for Simon. Every line is "recheck": no dictionary could be opened from this session.
  Both dictionaries print the wine lowercase (breaks rule 9): none found from memory besides Burgundy (applied above).
  Dictionaries disagree or M-W "often capitalized" (lowercase under rule 1's tie-break and rule 9; recheck): 19671 Chablis, 19680 Sauternes,
    19674 Madeira [wine]. Bordeaux below.
  Not known to be in one dictionary or both (rule 9: lowercase if unchecked; recheck): 19672 Barolo, 19673 Lambrusco, 19682 Amarone,
    53810 Brunello, 53828 Gavi, 53829 Orvieto, 53830 Frascati, 53822 Soave, 53807 Valpolicella, 19681 Tokaji (M-W has Tokay).
  Expected capital in both (consistent; recheck): 19662 Chianti, 19665 Rioja, 19670 Beaujolais, 19675 Marsala [wine], 53808 Côtes du Rhône,
    53832 Liebfraumilch, 53809 Châteauneuf-du-Pape and 53835 Pouilly-Fuissé (checked at v383).
  Not wines: 53837 Müller-Thurgau and 59834 nero d'Avola (grapes, rule 3: proper word), 59871 Brix (a scale named after a person).
  Type: 36456 Sancerre is typed place in "white wines" (the region sense shares the entry; seen at v382).
Bordeaux (flag for Simon, not changed): 19663 Bordeaux [wine] stays capital proper as established (a precedent; one dictionary capitalises
  it). Under rule 9 the dictionaries disagree, which would make it lowercase; Simon to decide.
Lint: burgundy is not in PROPER_WORDS, STYLE_WORDS or the allow-list; a lowercase common entry raises no case-lint kind, so style-case.mjs and
  propword-exceptions.mjs leave it as it is. The case lint's sense-common check flags burgundy in "wines named for places" (a theme of names,
  Burgundy [region] exists), so the link is allowed in js/caselint-allow.js ('19664|wines_named_for_places'), as 7691 burgundy [color] is.
Recheck log (rule 9): muscadet (v383, lowercase; the first call marked recheck), burgundy [wine] (v384), and every audit line above.
`;
  fs.writeFileSync(new URL('batch384-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch384.mjs, ${P.lib.modified}): ${n} change (Burgundy [wine] lowercased under rule 9). Supersedes v381 to v383 for the game.\n\n${log.join('\n')}\n\n${TXT}`);
  console.log('library v' + P.lib.version);
}
