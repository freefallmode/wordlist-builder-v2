// One-off: builds data/themes.txt (the v2 skeleton) from the old app's theme tree (data/old-themes.txt).
// Run: node tools/convert-tree.mjs
// After this run data/themes.txt is the maintained file; this script is kept as a record of what changed.
//
// What changes from the old tree:
//   - [separate] is dropped: membership is explicit in v2, so there is nothing to separate.
//   - [english-only] becomes [lang]; the old [region:X] (part of the world) becomes [geo:X]; [region:US,UK] is now the audience.
//   - duplicates and contrived region padding are removed, a few themes renamed, [sensitive] stripped where it did not fit.
//   - new themes, including many more [complete] sets whose notes list the exact members.
import { readFileSync, writeFileSync } from 'node:fs';
import { parseOutline, formatOutline, newTheme, slug } from '../js/outline.js';

const here = p => new URL(p, import.meta.url);
let src = readFileSync(here('../data/old-themes.txt'), 'utf8')
  .replace(/ *\[separate\]/g, '').replace(/\[english-only\]/g, '[lang]').replace(/\[region:/g, '[geo:');
const { themes: parsed, errors } = parseOutline(src);
let themes = parsed;
const log = [];
if (errors.length) log.push('parse: ' + errors.join('; '));

const byName = n => { const m = themes.filter(t => t.name === n); if (m.length !== 1) throw Error(`theme "${n}": ${m.length} matches`); return m[0]; };
const kids = id => themes.filter(t => t.parent === id);
const subtree = id => { const out = []; const walk = i => { for (const k of kids(i)) { out.push(k); walk(k.id); } }; walk(id); return out; };

// ---- removals ----
const REMOVE_TREE = ['travel around the world', 'materials by region', 'homes around the world'];
for (const n of REMOVE_TREE) { const t = byName(n); const gone = new Set([t.id, ...subtree(t.id).map(x => x.id)]); themes = themes.filter(x => !gone.has(x.id)); }
// Removed themes hand their children to the parent.
const REMOVE = ['meal courses', 'types of diving', 'types of rowing', 'types of fishing', 'types of climbing', 'types of hunting',
  'types of horse racing', 'types of skating', 'types of wrestling', 'types of party', 'rodeo events', 'antarctic weather',
  'expedition rations', 'polar expedition gear', 'extreme cold words', 'cappadocia', 'turkish resorts', 'sled types'];
for (const n of REMOVE) { const t = byName(n); for (const k of kids(t.id)) k.parent = t.parent; themes = themes.filter(x => x !== t); }

// ---- renames ----
const RENAME = { 'houses and homes': 'buildings to live in', 'moon phases': 'moon phases and moods', 'seasons': 'season words' };
for (const [a, b] of Object.entries(RENAME)) byName(a).name = b;

// ---- flags ----
// [sensitive] is for topics some players or parents would rather meet later (religion, politics, death, war, drink, drugs, crime,
// illness, sex). The old tree used it more widely than that.
const NOT_SENSITIVE = ['andean crops', 'bitter foods', 'things that tick', 'things that cut', 'fast things', 'fizzy drinks', 'life cycle words',
  'evolution words', 'famous buildings', 'famous squares', 'famous experiments', 'nobel laureates', 'hindi everyday words', 'words for bad',
  'words from yiddish', 'words from afrikaans', '1920s slang', 'british slang', 'yoga words', 'torso', 'hormones', 'things with horns',
  'bad habits', 'things that smell bad', 'game birds', 'ice age animals', 'prehistoric periods', 'ancient india', 'flags with crescents',
  'middle eastern countries', 'middle eastern cities', 'middle eastern pastimes', 'middle eastern scents', 'middle eastern clothing',
  'islamic art words', 'asian temple features', 'ayurveda words', 'viruses', 'sad words', 'old country names', 'famous temples',
  'revolutions', 'social classes', 'protest words', 'famous routes', 'famous ships', 'islam words', 'judaism words', 'buddhism words',
  'hinduism words', 'diwali', 'holi', 'hanukkah', 'ramadan and eid', 'day of the dead', 'anzac day', 'oktoberfest', 'shinto kami',
  'hindu gods', 'yoruba orishas', 'native american remedies', 'cold weather ailments'];
for (const n of NOT_SENSITIVE) { try { byName(n).sensitive = false; } catch (e) { log.push('skip not-sensitive: ' + e.message); } }
// Themes that really are about a fixed set but were not flagged.
for (const n of ['parts of speech', 'main cloud types']) byName(n).complete = true;
// Wordplay depends on English spelling and sound.
for (const t of themes) if (t.kind === 'wordplay') t.lang = true;

// ---- audience regions (first guess from the name; edit in the app) ----
const REGION_RULES = [
  [/^(american|us |nfl|nba|mlb|nhl|mount rushmore|founding fathers|wild west|colonial america|american revolution|baseball|rodeo|cowboy|southern food|thanksgiving|gold rush|new york|civil rights|silicon valley|country singers|american|appalachian|original thirteen)/, ['US']],
  [/^(canadian)/, ['CA']],
  [/^(british|english|scottish|cockney|victorian|london|highland games|royal houses|aussie rules)/, ['UK']],
  [/^(cricket)/, ['UK', 'AU', 'IN', 'ZA']],
  [/^(australian|afl|bush tucker|outback|aboriginal)/, ['AU']],
  [/^(new zealand|maori)/, ['NZ']],
  [/^(turkish|ottoman|istanbul)/, ['TR']],
  [/^(irish|st\. patrick)/, ['IE']],
  [/^(indian|bollywood|hindi|diwali|holi|ayurveda)/, ['IN']],
  [/^(south african|words from afrikaans)/, ['ZA']],
];
for (const t of themes) {
  if (t.region.length) continue;
  for (const [re, codes] of REGION_RULES) if (re.test(t.name)) { t.region = codes; break; }
}
byName('scottish landscape words').region = ['UK'];

// ---- additions: [parent theme name, outline text] ----
const rainbow = 'red, orange, yellow, green, blue, indigo, violet';
const ADD = [
  ['colors', `
colors of the rainbow [complete] -- ${rainbow}
olympic ring colors [complete] -- blue, yellow, black, green, red
shades of black -- charcoal, jet, ebony, onyx, raven, sable, soot
blue-green shades -- teal, turquoise, aqua, cyan, aquamarine, viridian
pastel colors -- lilac, baby blue, mint, peach, lavender, powder pink
neon colors -- electric blue, hot pink, lime, fluorescent yellow, neon orange
earth tones -- ochre, umber, sienna, khaki, terracotta, olive, rust
jewel tones -- emerald, sapphire, ruby, amethyst, topaz, garnet
colors named after foods [property] -- lemon, mint, peach, cherry, chocolate, salmon, cream, olive
colors named after flowers [property] -- rose, violet, lilac, lavender, poppy, marigold, fuchsia
colors named after gems [property] -- emerald, ruby, sapphire, amber, jade, amethyst, topaz
colors named after animals [property] -- salmon, canary, flamingo, mouse gray, fawn, taupe
colors named after places [property] -- sienna, magenta, tuscan, prussian blue, bordeaux, burgundy`],
  ['time', `
days of the week [complete] -- Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
weekdays [complete] -- Monday, Tuesday, Wednesday, Thursday, Friday`],
  ['months', `
months with 30 days [complete] -- April, June, September, November
months with 31 days [complete] -- January, March, May, July, August, October, December`],
  ['senses', `the five senses [complete] -- sight, hearing, smell, taste, touch`],
  ['body parts', `fingers [complete] -- thumb, index finger, middle finger, ring finger, little finger`],
  ['bones', `sections of the spine [complete] -- cervical, thoracic, lumbar, sacral, coccyx`],
  ['countries', `
uk nations [complete] -- England, Scotland, Wales, Northern Ireland
nordic countries [complete] -- Denmark, Finland, Iceland, Norway, Sweden
central american countries [complete] -- Belize, Costa Rica, El Salvador, Guatemala, Honduras, Nicaragua, Panama`],
  ['regions', `
irish provinces [complete] [region:IE] -- Connacht, Leinster, Munster, Ulster
new england states [complete] [region:US] -- Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont
original thirteen colonies [complete] [region:US] -- Delaware, Pennsylvania, New Jersey, Georgia, Connecticut, Massachusetts, Maryland, South Carolina, New Hampshire, Virginia, New York, North Carolina, Rhode Island`],
  ['maps and globes', `continents [complete] -- Africa, Antarctica, Asia, Europe, North America, Oceania, South America`],
  ['famous mountains', `seven summits [complete] -- Everest, Aconcagua, Denali, Kilimanjaro, Elbrus, Vinson, Kosciuszko`],
  ['famous lakes', `great lakes [complete] [region:US,CA] -- Superior, Michigan, Huron, Erie, Ontario`],
  ['oceans and seas', `ocean zones [complete] -- sunlight zone, twilight zone, midnight zone, abyss, trench`],
  ['earth science', `
layers of the atmosphere [complete] -- troposphere, stratosphere, mesosphere, thermosphere, exosphere
layers of a rainforest [complete] -- emergent layer, canopy, understory, forest floor
types of volcano [complete] -- shield, cinder cone, composite, lava dome, caldera`],
  ['weather', `kinds of precipitation [complete] -- rain, drizzle, sleet, hail, snow`],
  ['space', `
phases of the moon [complete] -- new moon, waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, last quarter, waning crescent
types of galaxy [complete] -- spiral, elliptical, irregular, lenticular`],
  ['chemistry', `
noble gases [complete] -- helium, neon, argon, krypton, xenon, radon, oganesson
halogens [complete] -- fluorine, chlorine, bromine, iodine, astatine, tennessine
alkali metals [complete] -- lithium, sodium, potassium, rubidium, cesium, francium
alkaline earth metals [complete] -- beryllium, magnesium, calcium, strontium, barium, radium`],
  ['measurement', `si base units [complete] -- second, meter, kilogram, ampere, kelvin, mole, candela`],
  ['geometry', `
platonic solids [complete] -- tetrahedron, cube, octahedron, dodecahedron, icosahedron
conic sections [complete] -- circle, ellipse, parabola, hyperbola`],
  ['biology', `
phases of mitosis [complete] -- prophase, metaphase, anaphase, telophase
kingdoms of life [complete] -- animals, plants, fungi, protists, bacteria, archaea
taxonomic ranks [complete] -- domain, kingdom, phylum, class, order, family, genus, species`],
  ['minerals', `mohs scale minerals [complete] -- talc, gypsum, calcite, fluorite, apatite, orthoclase, quartz, topaz, corundum, diamond`],
  ['numbers', `
numbers one to ten [complete] [lang] -- one, two, three, four, five, six, seven, eight, nine, ten
teen numbers [complete] [lang] -- thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen
multiples of ten [complete] [lang] -- ten, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety`],
  ['foreign words', `
days of the week in french [complete] [lang] -- lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche
days of the week in spanish [complete] [lang] -- lunes, martes, miercoles, jueves, viernes, sabado, domingo
days of the week in german [complete] [lang] -- Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag
months in french [complete] [lang] -- janvier, fevrier, mars, avril, mai, juin, juillet, aout, septembre, octobre, novembre, decembre
months in spanish [complete] [lang] -- enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre
months in german [complete] [lang] -- Januar, Februar, Marz, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember`],
  ['music words', `
musical modes [complete] -- Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian
solfege notes [complete] [lang] -- do, re, mi, fa, sol, la, ti
note values [complete] -- whole note, half note, quarter note, eighth note, sixteenth note`],
  ['famous bands', `
queen members [complete] [region:UK] -- Freddie Mercury, Brian May, Roger Taylor, John Deacon
abba members [complete] -- Agnetha, Bjorn, Benny, Anni-Frid
led zeppelin members [complete] -- Robert Plant, Jimmy Page, John Paul Jones, John Bonham`],
  ['ancient wonders', `seven wonders of the ancient world [complete] -- Great Pyramid of Giza, Hanging Gardens of Babylon, Statue of Zeus, Temple of Artemis, Mausoleum at Halicarnassus, Colossus of Rhodes, Lighthouse of Alexandria`],
  ['english monarchs', `
tudor monarchs [complete] [region:UK] -- Henry VII, Henry VIII, Edward VI, Mary I, Elizabeth I
wives of henry viii [complete] [region:UK] -- Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, Catherine Parr`],
  ['royal titles', `ranks of the british peerage [complete] [region:UK] -- duke, marquess, earl, viscount, baron`],
  ['greek gods', `
the nine muses [complete] -- Calliope, Clio, Erato, Euterpe, Melpomene, Polyhymnia, Terpsichore, Thalia, Urania
twelve olympians [complete] -- Zeus, Hera, Poseidon, Demeter, Athena, Apollo, Artemis, Ares, Aphrodite, Hephaestus, Hermes, Hestia`],
  ['religion words', `seven deadly sins [complete] [sensitive] -- pride, greed, lust, envy, gluttony, wrath, sloth`],
  ['christmas', `
santa's reindeer [complete] -- Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph
twelve days of christmas gifts [complete] -- partridge, turtle doves, French hens, calling birds, gold rings, geese, swans, maids, ladies, lords, pipers, drummers`],
  ['classic novels', `
march sisters [complete] -- Meg, Jo, Beth, Amy
three musketeers [complete] -- Athos, Porthos, Aramis, D'Artagnan`],
  ['classic film stars', `marx brothers [complete] -- Groucho, Harpo, Chico, Zeppo, Gummo`],
  ['cricket terms', `cricket dismissals [complete] -- bowled, caught, LBW, run out, stumped, hit wicket`],
  ['poker terms', `poker hands [complete] -- high card, pair, two pair, three of a kind, straight, flush, full house, four of a kind, straight flush, royal flush`],
  ['track events', `decathlon events [complete] -- 100 meters, long jump, shot put, high jump, 400 meters, 110 meter hurdles, discus, pole vault, javelin, 1500 meters`],
  ['words before', `
___line [wordplay] -- words that come before "line": head, dead, life, sky, coast, pipe
___wood [wordplay] -- words that come before "wood": fire, drift, drift, hard, sandal, holly
___stone [wordplay] -- words that come before "stone": mile, key, gem, lime, brim, cobble
___ship [wordplay] -- words that come before "ship": friend, relation, battle, air, space, member
___works [wordplay] -- words that come before "works": fire, water, art, clock, wood, earth
___bag [wordplay] -- words that come before "bag": hand, sleeping, tea, bean, punch, air
___bell [wordplay] -- words that come before "bell": blue, door, dumb, cow, bar, hand
___pot [wordplay] -- words that come before "pot": tea, flower, jack, hot, crack, chamber
___shop [wordplay] -- words that come before "shop": work, book, pet, barber, coffee, gift
___paper [wordplay] -- words that come before "paper": news, wall, sand, toilet, wrapping, tissue`],
  ['words after', `
ice___ [wordplay] -- words that come after "ice": cream, berg, cube, skate, pack, age
moon___ [wordplay] -- words that come after "moon": light, shine, walk, beam, stone, struck
paper___ [wordplay] -- words that come after "paper": back, clip, weight, work, boy, plane
door___ [wordplay] -- words that come after "door": bell, step, mat, knob, way, stop
blue___ [wordplay] -- words that come after "blue": berry, bird, print, bell, grass, jay
sand___ [wordplay] -- words that come after "sand": castle, paper, storm, box, bag, stone
eye___ [wordplay] -- words that come after "eye": ball, brow, lash, lid, sight, witness
life___ [wordplay] -- words that come after "life": boat, guard, time, style, jacket, span
over___ [wordplay] -- words that come after "over": coat, night, time, board, flow, look`],
  ['letter play', `
starts with a body part [wordplay] -- words that begin with a body part: handsome, armchair, headline, earring, legend, shipshape
starts with a color [wordplay] -- words that begin with a color: redeem, greenhouse, blackmail, whiteboard, goldfish, pinkie
starts with a number [wordplay] -- words that begin with a number: oneself, twofold, tenant, sixpence, fourteen, ninety`],
];
for (const [parentName, text] of ADD) {
  const parent = byName(parentName);
  const { themes: add, errors: e } = parseOutline(text.trim());
  if (e.length) log.push(`add ${parentName}: ${e.join('; ')}`);
  for (const t of add) { if (t.parent === null) t.parent = parent.id; if (t.kind === 'wordplay') t.lang = true; }
  // Insert after the last descendant of the parent so outline order stays depth-first.
  const last = [parent, ...subtree(parent.id)].pop();
  themes.splice(themes.indexOf(last) + 1, 0, ...add);
}

// ---- ids from the final names; parents rewritten to match ----
const oldToNew = new Map(), used = new Set();
for (const t of themes) {
  let id = slug(t.name), n = 2;
  while (used.has(id)) id = slug(t.name) + '_' + n++;
  used.add(id); oldToNew.set(t, id);
}
const idByOld = new Map(themes.map(t => [t.id, oldToNew.get(t)]));
for (const t of themes) if (t.parent) t.parent = idByOld.get(t.parent);
for (const t of themes) t.id = oldToNew.get(t);
const ids = new Set(themes.map(t => t.id));
for (const t of themes) if (t.parent && !ids.has(t.parent)) log.push(`missing parent for ${t.name}`);
const dupNames = themes.map(t => t.name).filter((n, i, a) => a.indexOf(n) !== i);
if (dupNames.length) log.push('duplicate names: ' + dupNames.join(', '));

writeFileSync(here('../data/themes.txt'), formatOutline(themes));
const play = themes.filter(t => !t.group);
console.log(`themes written: ${themes.length} (${themes.length - play.length} groups, ${play.length} playable), ${play.filter(t => t.complete).length} complete, ${themes.filter(t => t.region.length).length} with an audience region`);
console.log(log.join('\n') || 'no warnings');
