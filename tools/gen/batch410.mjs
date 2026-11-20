// Library batch v410 (Simon 2026-11-20: "check and fix"): complete themes hold exactly the members their note lists.
// A theme with complete: true is a closed set; its note lists the exact members (DESIGN.md) and a level shows it as that exact set. The flag only steered the
// AI prompt, so extras crept in (v409 fixed four humours). The rule, as the complete-extra / complete-missing checks in js/validate.js read it:
//   the note is the members separated by commas; an optional label before a colon is ignored; items compare folded, trimmed, without a trailing full stop
//   or a leading "the"; "(x)" at the end of an item is an accepted alternative. A member counts when its shown text, its own text, its root's or an alias's
//   text, or the same for a member of its synonym group in that theme, matches an item.
// What this batch does:
//   A. Notes that summarised ("Exactly the 50 US states; see the words", "all 118 named elements") or ran the names together with spaces (Greek letters,
//      NATO alphabet) are rewritten as the exact comma list, in the names the members show; a label before the colon is kept. Where a member is shown by a
//      short text (moon, index, first), the item is the standard name with the shown text as its alternative: "moon bear (moon)".
//   B. An alternative name of a real member counts through a synonym group with that member (one per level): sacrum / sacral spine, conquest / pestilence
//      (the first horseman has both names).
//   C. A member that is not part of the set is unlinked (unlinkEntry; the entry keeps its other themes): wintry mix (a mix, not a kind, in precipitation); butterfly (the insect, not a stage, in butterfly life stages);
//      New York #2219 (the city entry) leaves US states and New York State #36163 (the state entry, already in Thirteen Colonies) comes in shown "New York".
// Every entry this batch changes (linked, unlinked, grouped) gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch410.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, moveKin } from '../../js/model.js';
import { validate, noteItems } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT, CLASH_MAX } from '../../js/family.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const TH = id => { const t = ix.theme.get(id); if (!t) throw Error('no theme ' + id); if (!t.complete) throw Error(id + ' is not complete'); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp();
let n = 0, revSet = 0;
const revd = new Set(), rev = e => { if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } revd.add(e.id); };

// ---------- A. notes as exact comma lists (from: the v409 note; a theme whose note is already the new one is done) ----------
const NOTES = [
  ['bears', 'Exactly: giant panda, moon bear, sun bear, sloth bear, spectacled bear, black, brown, polar.',
    'Exactly: giant panda, moon bear (moon), sun bear (sun), sloth bear (sloth), spectacled bear (spectacled), black bear (black), brown bear (brown), polar bear (polar).'],
  ['butterfly_life_stages', 'the four stages of a butterfly, with their common names',
    'the four stages: egg, larva (caterpillar), pupa (chrysalis), adult (imago)'],
  ['north_american_countries', 'includes Central America and the Caribbean',
    'the 23 countries with Central America and the Caribbean: Canada, United States, Mexico, Belize, Costa Rica, El Salvador, Guatemala, Honduras, Nicaragua, Panama, Antigua and Barbuda, Bahamas, Barbados, Cuba, Dominica, Dominican Republic, Grenada, Haiti, Jamaica, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines (Saint Vincent), Trinidad and Tobago'],
  ['south_american_countries', 'includes French Guiana',
    'the 12 countries and French Guiana: Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname, Uruguay, Venezuela, French Guiana'],
  ['spanish_speaking_countries', 'Spanish is the official or main language',
    'the 20 countries where Spanish is the official or main language: Spain, Mexico, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama, Cuba, Dominican Republic, Colombia, Venezuela, Ecuador, Peru, Bolivia, Chile, Argentina, Uruguay, Paraguay, Equatorial Guinea'],
  ['us_state_capitals', 'Exactly the 50 US state capitals; see the words.',
    'the 50 state capitals: Montgomery, Juneau, Phoenix, Little Rock, Sacramento, Denver, Hartford, Dover, Tallahassee, Atlanta, Honolulu, Boise, Springfield, Indianapolis, Des Moines, Topeka, Frankfort, Baton Rouge, Augusta, Annapolis, Boston, Lansing, Saint Paul, Jackson, Jefferson City, Helena, Lincoln, Carson City, Concord, Trenton, Santa Fe, Albany, Raleigh, Bismarck, Columbus, Oklahoma City, Salem, Harrisburg, Providence, Columbia, Pierre, Nashville, Austin, Salt Lake City, Montpelier, Richmond, Olympia, Charleston, Madison, Cheyenne'],
  ['us_states', 'Exactly the 50 US states; see the words.',
    'the 50 states: Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming'],
  ['canadian_provinces', 'provinces and territories',
    'the 10 provinces and 3 territories: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador (Newfoundland), Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan, Northwest Territories, Nunavut, Yukon'],
  ['mexican_states', 'Exactly the 32 federal entities of Mexico (31 states plus Mexico City); see the words.',
    'the 31 states and Mexico City: Aguascalientes, Baja California, Baja California Sur, Campeche, Chiapas, Chihuahua, Coahuila, Colima, Durango, Guanajuato, Guerrero, Hidalgo, Jalisco, State of Mexico, Michoacan, Morelos, Nayarit, Nuevo Leon, Oaxaca, Puebla, Queretaro, Quintana Roo, San Luis Potosi, Sinaloa, Sonora, Tabasco, Tamaulipas, Tlaxcala, Veracruz, Yucatan, Zacatecas, Mexico City'],
  ['original_thirteen_colonies', 'Delaware, Pennsylvania, New Jersey, Georgia, Connecticut, Massachusetts, Maryland, South Carolina, New Hampshire, Virginia, New York, North Carolina, Rhode Island',
    'Delaware, Pennsylvania, New Jersey, Georgia, Connecticut, Massachusetts, Maryland, South Carolina, New Hampshire, Virginia, New York (New York State), North Carolina, Rhode Island'],
  ['the_five_oceans', 'Exactly: Pacific, Atlantic Ocean, Indian Ocean, Southern Ocean, Arctic Ocean.',
    'Exactly: Pacific Ocean (Pacific), Atlantic Ocean (Atlantic), Indian Ocean (Indian), Southern Ocean (Southern), Arctic Ocean (Arctic).'],
  ['ocean_zones', 'the five depth layers of the open ocean, from sunlit surface to the deepest trenches',
    'the five depth layers of the open ocean from the surface down: sunlight zone (sunlight), twilight zone (twilight), midnight zone (midnight), abyssal zone (abyss), hadal zone (trench)'],
  ['seven_wonders_of_the_ancient_world', 'Great Pyramid of Giza, Hanging Gardens of Babylon, Statue of Zeus, Temple of Artemis, Mausoleum at Halicarnassus, Colossus of Rhodes, Lighthouse of Alexandria',
    'Great Pyramid of Giza (Great Pyramid), Hanging Gardens of Babylon (Hanging Gardens), Statue of Zeus, Temple of Artemis, Mausoleum at Halicarnassus (Tomb of Mausolus), Colossus of Rhodes, Lighthouse of Alexandria (Pharos of Alexandria)'],
  ['compass_directions', 'the 16 points of the compass',
    'the 16 points: north, north-northeast, northeast, east-northeast, east, east-southeast, southeast, south-southeast, south, south-southwest, southwest, west-southwest, west, west-northwest, northwest, north-northwest'],
  ['fingers', 'thumb, index finger, middle finger, ring finger, little finger',
    'thumb, index finger (index), middle finger (middle), ring finger (ring), little finger (little)'],
  ['ranks_of_the_british_peerage', 'duke, marquess, earl, viscount, baron',   // familyOk: male and female titles are separate answers (DESIGN-entries 3.7 C)
    'the five ranks with their female titles: duke, duchess, marquess (marquis), marchioness, earl, countess, viscount, viscountess, baron, baroness'],
  ['us_coins', 'Exactly: penny, nickel, dime, quarter, half dollar, dollar coin.',
    'Exactly: penny (cent), nickel, dime, quarter, half dollar, dollar coin (dollar).'],
  ['golf_majors', 'Exactly: The Masters, US Open, PGA Championship, The Open Championship.',
    'Exactly: the Masters, US Open, PGA Championship, the Open Championship (British Open).'],
  ['four_horsemen_of_the_apocalypse', 'Exactly: pestilence, war, famine, Death.',
    'Exactly: pestilence (conquest), war, famine, Death.'],
  ['twelve_days_of_christmas_gifts', 'partridge, turtle doves, French hens, calling birds, gold rings, geese, swans, maids, ladies, lords, pipers, drummers',
    'partridge, turtle doves, French hens, calling birds, gold rings, geese a-laying, swans a-swimming, maids a-milking, ladies dancing, lords a-leaping, pipers piping, drummers drumming'],
  ['baseball_bases', 'Exactly: first base, second base, third base, home plate.',
    'Exactly: first base (first), second base (second), third base (third), home plate.'],
  ['card_suits', 'the four suits of a playing-card deck',
    'the four suits: hearts, diamonds, clubs, spades'],
  ['note_values', 'whole note, half note, quarter note, eighth note, sixteenth note',
    'whole note (whole), half note (half), quarter note (quarter), eighth note (eighth), sixteenth note (sixteenth)'],
  ['abba_members', 'Agnetha, Bjorn, Benny, Anni-Frid',
    'Agnetha, Bjorn, Benny, Anni-Frid (Frida)'],
  ['labors_of_hercules', 'the twelve labors, exactly',
    'the twelve labors: Nemean Lion, Lernaean Hydra (hydra), Ceryneian hind, Erymanthian Boar, Augean stables, Stymphalian Birds, Cretan Bull, Mares of Diomedes, Belt of Hippolyta, Cattle of Geryon, apples of the Hesperides (Hesperides), Cerberus'],
  ['chemical_elements', 'all 118 named elements',
    'the 118 named elements: hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, fluorine, neon, sodium, magnesium, aluminum (aluminium), silicon, phosphorus, sulfur (sulphur), chlorine, argon, potassium, calcium, scandium, titanium, vanadium, chromium, manganese, iron, cobalt, nickel, copper, zinc, gallium, germanium, arsenic, selenium, bromine, krypton, rubidium, strontium, yttrium, zirconium, niobium, molybdenum, technetium, ruthenium, rhodium, palladium, silver, cadmium, indium, tin, antimony, tellurium, iodine, xenon, cesium (caesium), barium, lanthanum, cerium, praseodymium, neodymium, promethium, samarium, europium, gadolinium, terbium, dysprosium, holmium, erbium, thulium, ytterbium, lutetium, hafnium, tantalum, tungsten, rhenium, osmium, iridium, platinum, gold, mercury, thallium, lead, bismuth, polonium, astatine, radon, francium, radium, actinium, thorium, protactinium, uranium, neptunium, plutonium, americium, curium, berkelium, californium, einsteinium, fermium, mendelevium, nobelium, lawrencium, rutherfordium, dubnium, seaborgium, bohrium, hassium, meitnerium, darmstadtium, roentgenium, copernicium, nihonium, flerovium, moscovium, livermorium, tennessine, oganesson'],
  ['phases_of_the_moon', 'new moon, waxing crescent, first quarter, waxing gibbous, full moon, waning gibbous, last quarter, waning crescent',
    'new moon (new), waxing crescent, first quarter, waxing gibbous, full moon (full), waning gibbous, last quarter (third quarter), waning crescent'],
  ['metric_prefixes', 'the 24 SI prefixes from quecto to quetta (deca also spelled deka)',
    'the 24 SI prefixes: quecto, ronto, yocto, zepto, atto, femto, pico, nano, micro, milli, centi, deci, deca (deka), hecto, kilo, mega, giga, tera, peta, exa, zetta, yotta, ronna, quetta'],
  ['si_base_units', 'the seven SI base units',
    'the seven SI base units: meter (metre), kilogram, second, ampere, kelvin, mole, candela'],
  ['greek_letters', 'the 24 letters: alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega',
    'the 24 letters: alpha, beta, gamma, delta, epsilon, zeta, eta, theta, iota, kappa, lambda, mu, nu, xi, omicron, pi, rho, sigma, tau, upsilon, phi, chi, psi, omega'],
  ['phonetic_alphabet', 'the 26 NATO code words: Alpha Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu',
    'the 26 NATO code words: Alpha (Alfa), Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett (Juliet), Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey (whisky), X-ray, Yankee, Zulu'],
  ['parts_of_speech', 'the nine parts of speech: noun verb adjective adverb pronoun preposition conjunction interjection determiner',
    'the nine parts of speech: noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection, determiner'],
];
const SIZE = { us_states: 50, us_state_capitals: 50, chemical_elements: 118, north_american_countries: 23, spanish_speaking_countries: 20, mexican_states: 32, canadian_provinces: 13, metric_prefixes: 24, greek_letters: 24, phonetic_alphabet: 26, compass_directions: 16, labors_of_hercules: 12, seven_wonders_of_the_ancient_world: 7, parts_of_speech: 9, si_base_units: 7, twelve_days_of_christmas_gifts: 12, south_american_countries: 13, ranks_of_the_british_peerage: 10 };
const A = [];
for (const [tid, from, to] of NOTES) {
  const t = TH(tid), items = noteItems(to);
  if (SIZE[tid] && items.length !== SIZE[tid]) throw Error(`${tid}: new note has ${items.length} items, not ${SIZE[tid]}`);
  if (new Set(items.flatMap(i => i.keys)).size !== items.flatMap(i => i.keys).length) throw Error(tid + ': a note key repeats');
  if (t.note === to) { A.push(`done: ${tid}`); continue; }
  if (t.note !== from) throw Error(`${tid}: note is not the v409 one: ${t.note}`);
  t.note = to; n++; A.push(`${tid} "${t.name}" (${items.length} items): "${from}" -> "${to.length > 160 ? to.slice(0, 160) + ' ...' : to}"`);
}

// ---------- B. alternative names grouped with the member they name ----------
const B = [];
function addGroup(T, ids) {   // a synonym group for members linked in T, joined with any T group it shares a member with
  for (const id of ids) { const e = E(id); if (e.aliasOf || e.typ[T.id] === undefined) throw Error(`${lab(e)} is not a root linked in ${T.id}`); }
  const gs = T.groups || (T.groups = []), hit = gs.filter(g => ids.some(id => g.includes(id)));
  const u = [...new Set([...hit.flat(), ...ids])];
  if (hit.length === 1 && hit[0].length === u.length) { B.push(`done: ${T.id} ${u.map(id => E(id).text).join(' / ')}`); return; }
  T.groups = [...gs.filter(g => !hit.includes(g)), u]; n++;
  for (const id of ids) rev(E(id));
  B.push(`${T.id}: ${u.map(id => lab(E(id))).join(' / ')}`);
}
const GROUPS = [
  ['sections_of_the_spine', [14390, 67007], 'sacrum is the sacral section (sacrum / sacral: one family, so one group)'],
  ['four_horsemen_of_the_apocalypse', [20961, 6819], 'the first (white) horseman is called Pestilence or Conquest'],
];
for (const [tid, ids, why] of GROUPS) { const before = B.length; addGroup(TH(tid), ids); if (B.length > before && !B[B.length - 1].startsWith('done')) B[B.length - 1] += `: ${why}`; }

// ---------- C. members that are not part of the set ----------
const C = [];
const UNLINK = [
  ['kinds_of_precipitation', 1989, 'wintry mix', 'a forecast word for a mix of rain, sleet and snow, not one of the kinds'],
  ['butterfly_life_stages', 1348, 'butterfly', 'the insect itself, not a stage (the adult stage is adult / imago); grouping it with adult would join its fly clash group into one of 13'],
  // group partners that pass only through their group must be accepted names of the member, not loose synonyms or descriptions (coordinator, 2026-11-20)
  ['chinese_zodiac', 1439, 'doggo', 'a loose synonym; the sign is Dog'],
  ['chinese_zodiac', 1436, 'hound', 'a loose synonym; the sign is Dog'],
  ['chinese_zodiac', 1437, 'pooch', 'a loose synonym; the sign is Dog'],
  ['chinese_zodiac', 1444, 'bunny', 'a loose synonym; the sign is Rabbit'],
  ['chinese_zodiac', 1136, 'serpent', 'a loose synonym; the sign is Snake'],
  ['cmyk_inks', 7670, 'sable', 'a heraldic black, not a name for the ink'],
  ['olympic_ring_colors', 7670, 'sable', 'a heraldic black, not a name for the ring'],
  ['fingers', 14381, 'longest finger', 'a description of the middle finger, not its name'],
  ['fingers', 14383, 'fourth finger', 'a description of the ring finger, not its name'],
  ['labors_of_hercules', 55048, 'man-eating mares', 'a description of the Mares of Diomedes, not a name in use'],
  ['labors_of_hercules', 55052, 'red cattle', 'a description of the Cattle of Geryon, not a name in use'],
  ['kinds_of_precipitation', 1991, 'mizzle', 'a UK dialect word for misty drizzle, not a name of the kind'],
  ['sections_of_the_spine', 53059, 'neck vertebrae', 'a description of the cervical section, not its name'],
  ['dwarf_planets', 41417, 'Xena', "Eris's informal nickname before it was named (2005), not a name in use"],
  ['us_states', 2219, 'New York', 'the city entry (cities, American cities); the state entry New York State 36163 comes in shown "New York"'],
];
const LINK = [   // [theme, id, text, rating, shown]
  ['us_states', 36163, 'New York State', 1, 'New York'],
];
for (const [tid, id, text, why] of UNLINK) {
  TH(tid); const e = E(id); if (e.text !== text) throw Error(`${id} is not ${text}`);
  if (e.typ[tid] === undefined) { C.push(`done: ${lab(e)} not in ${tid}`); continue; }
  C.push(`${tid}: ${lab(e)} unlinked (was ${e.typ[tid]}): ${why}; still in ${Object.keys(e.typ).filter(k => k !== tid).join(', ') || 'no theme'}`);
  unlinkEntry(P, e, tid); n++; rev(e);
}
for (const [tid, id, text, r, show] of LINK) {
  TH(tid); const e = E(id); if (e.text !== text || e.aliasOf) throw Error(`${id} is not the root ${text}`);
  if (e.typ[tid] !== undefined) { C.push(`done: ${lab(e)} in ${tid}`); continue; }
  e.typ[tid] = r; if (show) (e.show || (e.show = {}))[tid] = show; n++; rev(e);
  C.push(`${tid}: ${lab(e)} linked ${r}${show ? ` shown "${show}"` : ''}`);
}
reindex(P);

// ---------- E. Hydra and the Masters (coordinator 2026-11-20) ----------
// hydra 6940 is the Greek monster in all its themes (gloss monster; the freshwater polyp is hydra 9774), so it becomes the proper name "Hydra" in place
// (id kept). Masters 58912 / The Masters 44305 are one name stored twice: merged as in batch403 (I23), the bare name the root (as Bahamas / The Bahamas),
// The Masters its spelling alias with the same id; both were in the same two themes at the same rating, so the root's links stay and the alias's go;
// their synonym groups (the pair itself) dissolve.
const Ex = [];
{ const h = E(6940);
  if (h.text === 'Hydra' && h.type === 'proper') Ex.push('done: Hydra 6940 proper');
  else { if (h.text !== 'hydra' || h.gloss !== 'monster') throw Error('6940 is not hydra (monster)'); h.text = 'Hydra'; h.type = 'proper'; n++; rev(h); Ex.push(`hydra 6940 -> Hydra, type proper (themes ${Object.keys(h.typ).join(', ')})`); }
}
{ const R = E(58912), X = E(44305);
  if (R.text !== 'Masters' || X.text !== 'The Masters') throw Error('not the Masters pair');
  if (X.aliasOf === R.id && X.aliasKind === 'spelling') Ex.push('done: The Masters 44305 spelling alias of Masters 58912');
  else {
    if (R.aliasOf || X.aliasOf || ix.aliases.get(X.id)?.length) throw Error('Masters: alias chain');
    const did = [];
    for (const [tid, v] of Object.entries(X.typ)) {
      if (R.typ[tid] !== undefined) did.push(`${tid}: both linked, root's ${R.typ[tid]} kept (alias's ${v} dropped)`);
      else { R.typ[tid] = v; if (X.show?.[tid]) (R.show ||= {})[tid] = X.show[tid]; did.push(`${tid}: link moved (${v})`); }
    }
    for (const t of P.themes) {
      if (!t.groups?.some(g => g.includes(X.id))) continue;
      const gs = [];
      for (const g of t.groups) { if (!g.includes(X.id)) { gs.push(g); continue; } const ng = g.includes(R.id) ? g.filter(id => id !== X.id) : g.map(id => id === X.id ? R.id : id); did.push(`${t.id} group (${g.map(id => E(id).text).join(', ')}) -> ${ng.length > 1 ? ng.map(id => E(id).text).join(', ') : 'gone'}`); if (ng.length > 1) gs.push(ng); }
      t.groups = gs; if (!gs.length) delete t.groups;
    }
    R.nameOkIn = [...new Set([...(R.nameOkIn || []), ...(X.nameOkIn || [])])];
    for (const k of ['tm', 'sensitive', 'adult', 'vulgar']) if (R[k] !== X[k]) throw Error('Masters: ' + k + ' differs');
    for (const e of P.entries) if (e.use) for (const id of Object.values(e.use)) if (id === X.id) throw Error(`${lab(e)} uses ${X.id}`);
    if (X.kin?.length) moveKin(P, X, R);
    Object.assign(X, { typ: {}, show: {}, use: {}, kin: [], aliasOf: R.id, aliasKind: 'spelling' }); n++; rev(R); rev(X);
    Ex.push(`The Masters 44305 -> spelling alias of Masters 58912 (bare name the root, as Bahamas / The Bahamas): ${did.join('; ')}`);
  }
}
reindex(P);

// ---------- D. the rule on every complete theme (validate's complete-* kinds) ----------
const D = [], cx = validate(P).filter(i => i.kind.startsWith('complete-'));
for (const i of cx) D.push(`${i.sev} ${i.kind}: ${i.msg}`);
const LISTED = [
  'ranks_of_the_british_peerage: familyOk (male and female titles are separate answers), so the set is the five ranks and their five female titles (10), not 5',
  'south_american_countries: French Guiana is a French region, not a country; kept as the note said',
  'canadian_provinces: named "provinces" but holds the 3 territories too; kept as the note said',
  'si_base_units: Kelvin 40846 is stored with a capital; the unit is written kelvin (case rule); not changed here',
  'labors_of_hercules: Hesperides 6970 is the nymphs (mythology, legendary places) standing for the apples of the Hesperides; kept as the note allows',
  'ocean_zones: trench 32036 and abyss 32037 are the general words standing for the hadal and abyssal zones; kept',
  'kept as accepted names (group partners): honey bear, Andean bear, Himalayan black bear, volcanic dome, scoria cone, stratovolcano, rainforest floor, America, Surinam, Aotearoa, Orissa, epipelagic/mesopelagic/bathypelagic zone, the five wonders alternatives, pointer finger, forefinger, pinky, tailbone, erythrocyte, leukocyte, avarice, the zodiac animals, first sacker, backstop, home base, hot corner, leg before wicket, Roland Garros, javelin/discus throw, fourth/fifth street, one pair, quads, trips, castle, the tarot suit names, Lennon, Macca, Farrokh Bulsara, the ABBA full names, Teddy Roosevelt, girdle of Hippolyta, protista, triangular pyramid, the school names of parts of speech (naming, doing, describing word, connective, exclamation)',
  'original_thirteen_colonies: New York State 36163 is shown in full there; the note takes it as an alternative of New York',
];

{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(CE.text, x0.text) && same(CE.links, x0.links) && same(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v${P.lib.version} before the changes: ${baseOk ? 'yes' : 'NO'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]})`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : firstShift}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${lab(E(id))}`).join(', ') || 'none'}`);
const textCh = x1.ids.filter((id, i) => ia.has(id) && x1.text[i] !== x0.text[ia.get(id)]).map(id => `${x0.text[ia.get(id)]} -> ${x1.text[ib.get(id)]} (${id})`);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]).map(id => lab(E(id)));
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed: ${flagCh.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length} (${lcCh.map(id => lab(E(id))).join(', ') || 'none'})`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(E(x1.ids[firstLinkShift]))}) on, link positions move`}`);
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const m0 = shownMap(x0), m1 = shownMap(x1);
const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
const fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (row of ${id})`; };
cmp.push(`Links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
for (const k of lost) cmp.push(`  gone: ${fmt(k)}`);
for (const k of gained) cmp.push(`  new: ${fmt(k)}`);
for (const k of rated) cmp.push(`  rating: ${fmt(k)} ${m0.get(k)} -> ${m1.get(k)}`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);

const summary = ['Pattern: a complete theme\'s note is the exact comma list of its members (label before a colon ignored, "(x)" an alternative); an alternative name of a member is in a synonym group with it or in the note; a word that is not one of the set is unlinked.',
  `A. notes rewritten (${NOTES.length}):`, ...A.map(x => '  ' + x),
  `B. alternatives grouped (${GROUPS.length}):`, ...B.map(x => '  ' + x),
  `C. unlinked / linked:`, ...C.map(x => '  ' + x),
  'E. Hydra and the Masters:', ...Ex.map(x => '  ' + x),
  `D. complete-* check after: ${D.length ? D.length + ' issues' : 'none'}`, ...D.map(x => '  ' + x),
  'Listed, not changed (doubts):', ...LISTED.map(x => '  ' + x),
  `library changes ${n}; status set to rev ${revSet}; entries touched ${revd.size}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch410-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
