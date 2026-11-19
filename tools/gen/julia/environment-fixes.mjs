// Environment branch, step 3 of 3: takes out words that don't fit the shorter names, merges two duplicate themes and adds groups.
// Run after the other two steps: node tools/gen/julia/environment-fixes.mjs [library file]
//
// pollution:        noise and light pollution move to "pollution types" (shown short there). Out: pollutant, contamination (other words
//                   for pollution), air quality, runoff, smokestack, haze, landfill (not pollution itself), eutrophication, greywater.
// recyclables:      only things that go in the recycling bin stay. Reuse, reduce and recycling plant move to "bins and recycling".
//                   Daily, rag, paper and gazette were newspaper nicknames that came in with "newspaper".
// renewable energy: out: jargon (feed-in tariff, net metering ...) and hydrogen and ethanol (not always renewable).
//                   "renewable sources" (energy sources, nearly the same list) is merged into it.
// fossil fuels:     drilling, fracking, refinery, pipeline and wellhead move to "oil industry"; charcoal (made from wood) goes.
//                   "buried fuels" (energy sources, the same list) is merged into it.
// conservation:     the places move to "protected areas". Out: conservation (the name), general nature words that are in
//                   "ecology words" (ecosystem, habitat ...), jargon (SSSI, ex situ ...), rainforest, wetland, green belt.
// climate change:   out: climate change (the name), el nino and la nina (natural cycles), jargon (albedo, Keeling Curve ...),
//                   drought, heatwave, wildfire and flooding (they are in "natural disasters").
// green living:     now a group of eco habits, eco swaps and eco home. "thrift" there was the seaside plant.
// endangered animals: the rhinos, gorillas, sea turtles and tigers are grouped, so a level shows only one of each.
// Words taken out stay in the library and in their other themes; the ones left in no theme are listed at the end.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, deleteTheme } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const T = id => { const t = P.ix.theme.get(id); if (!t) throw Error('no theme ' + id); return t; };
const issueKey = i => i.sev + ' ' + i.msg;
const before = new Set(validate(P).filter(i => i.sev !== 'info').map(issueKey));
const touched = new Set();
if (!P.ix.theme.has('eco_home') || !(P.ix.byTheme.get('eco_home') || []).length) throw Error('run environment-themes.mjs and the environment batch first');

// The entry linked to a theme with this text ('text|gloss' when the text has several meanings).
const linked = (tid, spec) => {
  const [text, gloss] = spec.split('|');
  const m = (P.ix.byTheme.get(tid) || []).filter(e => e.text === text && e.typ[tid] !== undefined && (gloss === undefined || e.gloss === gloss));
  if (m.length !== 1) throw Error(`${m.length} entries "${spec}" linked to ${tid}`);
  return m[0];
};
// Drops ids from a theme's synonym groups; a group left with one member goes.
const ungroup = (tid, ids) => { const t = T(tid); if (!t.groups) return; t.groups = t.groups.map(g => g.filter(i => !ids.includes(i))).filter(g => g.length > 1); if (!t.groups.length) delete t.groups; };
// Removes an entry's link to a theme and every theme-local setting for it.
const unlinkEntry = (tid, e) => { delete e.typ[tid]; if (e.show) delete e.show[tid]; if (e.use) delete e.use[tid]; if (e.nameOkIn) e.nameOkIn = e.nameOkIn.filter(x => x !== tid); ungroup(tid, [e.id]); touched.add(e.id); };
const out = (tid, ...specs) => { for (const s of specs) unlinkEntry(tid, linked(tid, s)); console.log(`${T(tid).name}: out ${specs.join(', ')}`); reindex(P); };
const link = (tid, spec, rating) => { const [text, gloss] = spec.split('|'); const m = P.entries.filter(e => !e.aliasOf && e.text === text && (gloss === undefined || e.gloss === gloss)); if (m.length !== 1) throw Error(`${m.length} entries "${spec}"`); m[0].typ[tid] = rating; console.log(`${T(tid).name}: in ${spec}`); return m[0]; };
const show = (tid, map) => { for (const [text, short] of Object.entries(map)) { const e = linked(tid, text); e.show = Object.assign({}, e.show, { [tid]: short }); } console.log(`${T(tid).name}: shown short ${Object.values(map).join(', ')}`); };
// Puts these words in one synonym group of the theme, joining any group one of them is already in.
const group = (tid, ...specs) => {
  const t = T(tid), ids = specs.map(s => linked(tid, s).id);
  t.groups = (t.groups || []).filter(g => !g.some(i => ids.includes(i)) || (ids.push(...g.filter(i => !ids.includes(i))), false));
  t.groups.push([...new Set(ids)]); console.log(`${t.name}: group ${specs.join(' = ')}`);
};
const shownText = (e, tid) => (e.show?.[tid] || P.ix.entry.get(e.use?.[tid])?.text || e.text).toLowerCase();
// Deletes a theme and the theme-local settings that point at it.
const removeTheme = tid => { for (const e of P.entries) { if (e.typ[tid] !== undefined) touched.add(e.id); if (e.show) delete e.show[tid]; if (e.use) delete e.use[tid]; if (e.nameOkIn?.includes(tid)) e.nameOkIn = e.nameOkIn.filter(x => x !== tid); } deleteTheme(P, tid); reindex(P); };
// Moves the words of `from` into `to` (as tools/gen/category-fixes-1.mjs does), then deletes `from`. `skip` lists words that stay out of `to`.
const merge = (from, to, skip = []) => {
  const f = T(from), t = T(to);
  if (P.themes.some(k => k.parent === from)) throw Error(from + ' has sub-themes');
  const skipIds = skip.map(s => linked(from, s).id);
  const shown = new Set((P.ix.byTheme.get(to) || []).map(e => shownText(e, to)));
  const moved = [], kept = [], skipped = [];
  for (const e of P.entries) {
    if (e.typ[from] === undefined) continue;
    if (e.typ[to] !== undefined) { kept.push(e.text); continue; }
    if (skipIds.includes(e.id) || shown.has(shownText(e, from))) { skipped.push(e.text); continue; }
    e.typ[to] = e.typ[from]; moved.push(e.text);
    if (e.show?.[from] !== undefined && e.show[to] === undefined) e.show[to] = e.show[from];
    if (e.nameOkIn?.includes(from) && !e.nameOkIn.includes(to)) e.nameOkIn.push(to);
  }
  for (const g of f.groups || []) {   // groups whose members are now in the target join the target's groups
    const m = g.filter(id => P.ix.entry.get(id)?.typ[to] !== undefined); if (m.length < 2) continue;
    t.groups = t.groups || [];
    const hits = [...new Set(m.map(id => t.groups.find(x => x.includes(id))).filter(Boolean))], first = hits[0] || [];
    for (const id of m) if (!first.includes(id)) first.push(id);
    for (const x of hits.slice(1)) { for (const id of x) if (!first.includes(id)) first.push(id); t.groups.splice(t.groups.indexOf(x), 1); }
    if (!hits.length) t.groups.push(first);
  }
  removeTheme(from);
  console.log(`merge "${f.name}" into "${t.name}": moved ${moved.length} (${moved.join(', ')}); already there ${kept.length}; left out ${skipped.length}${skipped.length ? ' (' + skipped.join(', ') + ')' : ''}`);
};

// ---------- pollution ----------
show('pollution_types', { 'air pollution': 'air', 'water pollution': 'water', 'plastic pollution': 'plastic', 'noise pollution': 'noise', 'light pollution': 'light',
  'soil pollution': 'soil', 'land pollution': 'land', 'thermal pollution': 'thermal', 'visual pollution': 'visual' });
out('pollution_words', 'noise pollution', 'light pollution', 'pollutant', 'contamination', 'air quality', 'runoff|water runoff', 'smokestack', 'haze', 'landfill',
  'eutrophication', 'greywater');

// ---------- recyclables ----------
link('bins_and_recycling', 'reuse', 2); link('bins_and_recycling', 'reduce|waste', 3);
const plant = link('bins_and_recycling', 'recycling plant', 3); plant.nameOkIn = [...new Set([...(plant.nameOkIn || []), 'bins_and_recycling'])];
out('recycling_words', 'paper|newspaper', 'daily|newspaper', 'rag|newspaper', 'gazette|official journal',
  'recycle', 'recyclable', 'recycling bin', 'bottle bank', 'compost', 'landfill', 'reuse', 'reduce|waste', 'upcycle', 'repurpose', 'curbside collection',
  'deposit scheme', 'recycling plant', 'MRF|recycling', 'refillable', 'reclaimed', 'salvage', 'sort|classify', 'rinse',
  'bale|bundle', 'pulp|paper', 'closed loop', 'downcycle', 'reprocess', 'single stream', 'feedstock');

// ---------- renewable energy ----------
out('renewable_energy', 'feed-in tariff', 'net metering', 'run-of-river', 'wave buoy', 'geothermal well', 'concentrated solar', 'green hydrogen', 'hydrogen', 'ethanol');
// The short forms solar, wind and tidal stay out ("solar power", "wind farm" and "tidal power" are already there), and so does waste-to-energy (it gives the name away).
merge('renewable_sources', 'renewable_energy', ['hydrogen', 'waste-to-energy', 'solar|sun power', 'sunlight|sun light', 'wind|energy', 'tidal|sea power', 'wave power']);

// ---------- fossil fuels ----------
show('oil_industry', { 'oil rig': 'rig' });
out('fossil_fuels', 'drilling', 'fracking', 'refinery', 'pipeline', 'wellhead', 'charcoal|fuel');
merge('buried_fuels', 'fossil_fuels');

// ---------- conservation ----------
out('conservation_words', 'national park', 'nature reserve', 'wildlife reserve', 'sanctuary|refuge', 'marine park', 'biosphere reserve', 'Ramsar site', 'Natura 2000',
  'protected area', 'conservation', 'ecosystem', 'habitat', 'biodiversity', 'extinction', 'sustainable', 'SSSI', 'ex situ', 'buffer zone', 'stewardship',
  'green belt', 'rainforest', 'wetland');

// ---------- climate change ----------
out('climate_words', 'climate change', 'el nino', 'la nina', 'albedo|reflectivity', 'anomaly', 'radiative forcing', 'Keeling Curve', 'adaptation', 'mitigation',
  'drought', 'heatwave', 'wildfire', 'flooding');

// ---------- green living: a group of the three eco themes ----------
{
  const tid = 'green_living_words', t = T(tid), gone = [];
  for (const e of P.entries) if (e.typ[tid] !== undefined) { gone.push(e.text); unlinkEntry(tid, e); }
  Object.assign(t, { group: true, note: '', pop: 0 }); delete t.ident; delete t.groups;
  reindex(P); console.log(`green living: now a group; ${gone.length} words out (${gone.join(', ')})`);
}

// ---------- endangered animals ----------
group('endangered_animals', 'black rhino', 'Javan rhino', 'northern white rhino', 'Sumatran rhino');
group('endangered_animals', 'mountain gorilla', 'Cross River gorilla');
group('endangered_animals', 'sea turtle', 'hawksbill turtle', 'loggerhead turtle');
group('endangered_animals', 'tiger|animal', 'Siberian tiger', 'Amur tiger');

// ---------- words left in no theme (kept in the library) ----------
reindex(P);
const none = [...touched].map(id => P.ix.entry.get(id)).filter(e => e && !e.aliasOf && !Object.keys(e.typ).length && !(P.ix.aliases.get(e.id) || []).some(a => Object.keys(a.typ).length));
console.log(`in no theme now (kept in the library): ${none.length} (${none.map(e => e.text).join(', ')})`);

// ---------- check and save ----------
const after = validate(P).filter(i => i.sev !== 'info'), fresh = after.filter(i => !before.has(issueKey(i)));
console.log(`checks: ${before.size} warnings/errors before, ${after.length} after, ${fresh.length} new`);
for (const i of fresh) console.log('  NEW', i.sev, i.msg);
if (fresh.some(i => i.sev === 'error')) { console.log('Not saved: new errors.'); process.exit(1); }
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
