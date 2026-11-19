// Earth science branch, step 3 of 3: takes out words that don't fit the shorter names and adds shown texts and groups.
// Run after the other two steps: node tools/gen/julia/earth-science-fixes.mjs [library file]
//
// volcanoes:         named volcanoes are in "famous volcanoes" ("Mount St. Helens" here was a second copy of "Mount St Helens" there);
//                    the parts move to "volcano parts" and stratovolcano, shield volcano and lava dome stay in "volcano types".
//                    Out: volcano (the name), Pompeii (a city).
// earthquakes:       out: earthquake, quake, temblor (the name), jargon (megathrust, strike-slip ...), rumble (the sound entry).
// natural disasters: out: famine, blight, locust plague (crop and food disasters), supervolcano (a thing, not an event), seiche,
//                    derecho, waterspout (specialist, rarely disasters), lahar and pyroclastic flow (they stay in volcanoes).
// Earth's layers:    "mantle" was the cloak entry (the earth-layer entry is linked by the batch). Out: iron, nickel, molten iron,
//                    magma (materials), tectonic plate (not a layer), geosphere (the whole solid Earth).
// erosion:           the processes stay. Out: erosion (the name) and the landforms, which are in river, coastal, desert and
//                    mountain features (interlocking spurs is linked to river features by the batch); glacier, topsoil, river bank.
// geothermal features: the natural features stay. Famous places move to "geothermal wonders". Out: energy jargon, steam, sulfur,
//                    hot water, Iceland, spa (the hot-tub entry), thermal bath (a building).
// soil types:        the kinds of soil stay. Layers move to "soil layers"; potting mix, leaf mold and worm castings to "garden".
//                    Out: dirt, mud, gravel, soil science words, duff (the golf entry), permafrost, compost and the other garden words.
// water cycle:       the stages and stores stay. Out: water cycle and hydrologic cycle (the name), weather and water words that are in
//                    weather and bodies of water, hydrosphere, atmospheric river, vadose zone.
// Words taken out stay in the library and in their other themes; the ones left in no theme are listed at the end.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const T = id => { const t = P.ix.theme.get(id); if (!t) throw Error('no theme ' + id); return t; };
const issueKey = i => i.sev + ' ' + i.msg;
const before = new Set(validate(P).filter(i => i.sev !== 'info').map(issueKey));
const touched = new Set();
if (!(P.ix.byTheme.get('soil_layers') || []).length) throw Error('run earth-science-themes.mjs and the earth science batch first');

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
const show = (tid, map) => { for (const [text, short] of Object.entries(map)) { const e = linked(tid, text); e.show = Object.assign({}, e.show, { [tid]: short }); } console.log(`${T(tid).name}: shown short ${Object.values(map).join(', ')}`); };
// Puts these words in one synonym group of the theme, joining any group one of them is already in.
const group = (tid, ...specs) => {
  const t = T(tid), ids = specs.map(s => linked(tid, s).id);
  t.groups = (t.groups || []).filter(g => !g.some(i => ids.includes(i)) || (ids.push(...g.filter(i => !ids.includes(i))), false));
  t.groups.push([...new Set(ids)]); console.log(`${t.name}: group ${specs.join(' = ')}`);
};

// ---------- volcanoes ----------
out('volcano_words', 'volcano', 'Vesuvius', 'Krakatoa', 'Etna', 'Mauna Loa', 'Pinatubo', 'Stromboli|volcano', 'Mount St. Helens', 'Pompeii|ancient Roman city',
  'stratovolcano', 'shield volcano', 'lava dome', 'volcanic dome', 'crater', 'vent|volcano', 'cone|volcano', 'magma chamber', 'caldera');

// ---------- earthquakes ----------
out('earthquake_words', 'earthquake', 'quake', 'temblor', 'megathrust', 'strike-slip', 'moment magnitude', 'hypocenter', 'focus|earthquake', 'seismic zone',
  'rupture', 'rumble|sound');

// ---------- natural disasters ----------
out('natural_disasters', 'famine', 'blight', 'locust plague', 'supervolcano', 'seiche', 'derecho', 'waterspout', 'lahar', 'pyroclastic flow');

// ---------- Earth's layers ----------
out('layers_of_the_earth', 'mantle|cloak', 'iron|metal', 'nickel|metal', 'molten iron', 'magma', 'tectonic plate', 'geosphere');

// ---------- erosion ----------
out('erosion_words', 'erosion', 'canyon', 'gulch', 'arroyo|dry gully', 'delta|river', 'badlands|terrain', 'bluff|landform', 'gully|channel', 'sinkhole', 'scree',
  'oxbow lake', 'hoodoo', 'sand dune', 'sea stack', 'headland', 'wave-cut platform', 'rill', 'meander|river', 'plunge pool|waterfall basin', 'interlocking spurs',
  'glacier|ice', 'topsoil', 'river bank');

// ---------- geothermal features ----------
out('geothermal_words', 'Old Faithful|geyser', 'Yellowstone', 'Blue Lagoon', 'Pamukkale', 'Cotton Castle', 'Rotorua', 'Strokkur|geyser', 'Wai-O-Tapu', 'Beppu',
  'Larderello', 'Wairakei', 'Iceland', 'geothermal energy', 'geothermal plant', 'binary cycle', 'dry steam', 'geothermal gradient', 'ground source heat',
  'steam|vapor', 'sulfur', 'hot water', 'spa|hot tub', 'thermal bath');

// ---------- soil types ----------
show('soil_layers', { 'soil horizon': 'horizon' });
out('soil_words', 'topsoil', 'subsoil', 'bedrock', 'humus', 'soil horizon', 'hardpan', 'regolith', 'potting mix', 'leaf mold', 'worm castings', 'compost', 'mulch',
  'fertilizer', 'manure', 'earthworm', 'dirt|soil', 'mud|dirt', 'gravel|crushed stone', 'nutrients', 'drainage', 'aeration', 'tilth', 'pedology', 'rhizosphere',
  'mycorrhiza', 'duff', 'permafrost');
group('soil_words', 'sand|sediment', 'sandy soil');

// ---------- water cycle ----------
out('water_cycle_words', 'water cycle', 'hydrologic cycle', 'river|water', 'lake', 'stream|woodland', 'reservoir', 'cloud|weather', 'rain|weather', 'rainfall', 'dew',
  'dew point', 'humidity', 'vapor', 'watershed', 'hydrosphere', 'atmospheric river', 'vadose zone');

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
