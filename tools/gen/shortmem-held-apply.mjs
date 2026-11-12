// Settles the held cases (tools/gen/shortmem/held.md) by decision; stubs in "words" themes and ambiguous pairings are kept.
// Group ids pointing at a deleted stub are swapped for the full term.  Run: node tools/gen/shortmem-held-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const c = JSON.parse(fs.readFileSync(here('./shortmem/candidates.json'), 'utf8'));
const all = [...c.convert, ...c.multi];
const CONVERT = new Set(['beds/bunk','cords_and_strings/bungee','chili_peppers/bird\'s eye','asian_trees/bodhi','lizards/monitor','teas/boba','oils_and_vinegars/white','penguins/fairy','saws/circular','embroidery_stitches/blanket','cameras/action','noodles/instant','rice_dishes/egg fried','wild_goats_and_sheep/mountain','bears/Andean','bears/spectacled','bears/sun','owls/eagle','vultures/turkey','pigeons_and_doves/feral','salamanders_and_newts/crested','salamanders_and_newts/great crested','seals_and_sea_lions/harbor','bus_types/articulated','drums/goblet','fingers/little','fingers/middle','moon_phases_and_moods/half','radio_words/two-way','rugs_and_carpets/shag','roof_parts/hip','salads/Olivier','famous_towers/Willis','seals_and_sea_lions/elephant','spiders/crab','lights_and_lamps/oil','dumplings/soup','shades_of_blue/sky','seals_and_sea_lions/Ross','beans_and_pulses/kidney','beans_and_pulses/runner','frogs_and_toads/tree','scooters_and_skates/ice','finches/Darwin\'s','locks_and_keys/spare','rugs_and_carpets/Persian']);
const DEDUPE = new Set(['candle_words/snuffer','bus_types/school','tops/tank','diving_terms/Synchronized','noodles/Glass','chili_peppers/Thai','potato_dishes/baked','electronic_music_styles/jungle','owls/spotted','rays_and_eels/electric']);
const stat = { converted: 0, deduped: 0, swapped: 0, kept: 0 }, log = [];
for (const r of all) {
  const key = r.theme + '/' + r.text, stub = P.ix.entry.get(r.stub); if (!stub) continue;
  const dd = DEDUPE.has(key), cv = CONVERT.has(key);
  if (!dd && !cv) { stat.kept++; continue; }
  let full;
  if (dd) full = r.full.map(f => P.ix.entry.get(f.id)).find(f => f && f.typ[r.theme] != null);
  else { const fs2 = r.full.map(f => P.ix.entry.get(f.id)).filter(f => f && !f.aliasOf && f.typ[r.theme] == null).sort((a, b) => Object.keys(b.typ).length - Object.keys(a.typ).length); full = fs2[0]; }
  if (!full || P.entries.some(a => a.aliasOf === stub.id) || Object.keys(stub.typ).length !== 1) { log.push('skipped ' + key); stat.kept++; continue; }
  if (!dd) full.typ[r.theme] = stub.typ[r.theme];
  full.show = Object.assign({}, full.show, { [r.theme]: stub.text });
  for (const t of P.themes) if (t.groups) { t.groups = t.groups.map(g => [...new Set(g.map(id => { if (id === stub.id) { stat.swapped++; return full.id; } return id; }))]).filter(g => g.length > 1); }
  deleteEntry(P, stub); stat[dd ? 'deduped' : 'converted']++; log.push((dd ? 'dedupe ' : 'convert ') + key + ' => ' + full.text);
}
{ const a = P.ix.entry.get(2701); if (a) a.show = Object.assign({}, a.show, { bus_types: 'bendy' }); } // alias of articulated bus
console.log(stat); console.log(log.filter(l => l.startsWith('skipped')).join('\n'));
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(here('./shortmem/held-log.txt'), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }
