// Builds data/pilot.project.json: a small hand-written starter set (about 35 themes) to judge data quality before spending on generation.
// Run: node tools/pilot.mjs   Then in the app: File > Open project file > data/pilot.project.json
//
// Entry: [text, rec, inRec, opts]. rec = how well known the word is (1 every child ... 5 few people); inRec = how readily it is placed in
// this theme. opts: g gloss, pos, type, tm, adult, vulgar, sens, reg [regions], al [[text, kind, rec, inRec, regions]].
// An entry written again in another theme (same text and gloss) is the same entry, linked to both.
import { readFileSync, writeFileSync } from 'node:fs';
import { parseOutline } from '../js/outline.js';
import { newProject, addEntry, reindex, sameText } from '../js/model.js';
import { serializeProject } from '../js/store.js';
import { validate } from '../js/validate.js';
import { parseFreq, setFreq } from '../js/freq.js';

const here = p => new URL(p, import.meta.url);
const P = newProject();
P.themes = parseOutline(readFileSync(here('../data/themes.txt'), 'utf8')).themes;
reindex(P);
setFreq(parseFreq(readFileSync(here('../data/freq-en.txt'), 'utf8')));

const month = t => ({ type: 'proper', ...t });
const DATA = {
  // ----- complete sets: exactly the members -----
  colors_of_the_rainbow: [['red', 1, 1], ['orange', 1, 1, { g: 'color' }], ['yellow', 1, 1], ['green', 1, 1], ['blue', 1, 1], ['indigo', 3, 3], ['violet', 2, 2]],
  days_of_the_week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => [d, 1, 1, { type: 'proper' }]),
  months_with_30_days: ['April', 'June', 'September', 'November'].map(d => [d, 1, 1, { type: 'proper' }]),
  planets: [['Mercury', 1, 1, { g: 'planet', type: 'place' }], ['Venus', 1, 1, { type: 'place' }], ['Earth', 1, 1, { type: 'place' }], ['Mars', 1, 1, { type: 'place' }],
    ['Jupiter', 1, 1, { type: 'place' }], ['Saturn', 1, 1, { type: 'place' }], ['Uranus', 2, 2, { type: 'place' }], ['Neptune', 2, 2, { type: 'place' }]],
  card_suits: [['hearts', 1, 1], ['diamonds', 1, 1], ['clubs', 1, 1], ['spades', 1, 1]],
  chess_pieces: [['king', 1, 1], ['queen', 1, 1], ['rook', 2, 2, { al: [['castle', 'synonym', 2, 2]] }], ['bishop', 1, 1], ['knight', 1, 1], ['pawn', 1, 1]],
  the_five_senses: [['sight', 1, 1], ['hearing', 1, 1], ['smell', 1, 1], ['taste', 1, 1], ['touch', 1, 1]],
  cardinal_directions: [['north', 1, 1], ['south', 1, 1], ['east', 1, 1], ['west', 1, 1]],
  uk_nations: [['England', 1, 1, { type: 'place' }], ['Scotland', 1, 1, { type: 'place' }], ['Wales', 1, 1, { type: 'place' }], ['Northern Ireland', 2, 2, { type: 'place' }]],
  main_cloud_types: [['cirrus', 3, 3], ['cirrocumulus', 4, 4], ['cirrostratus', 4, 5], ['altocumulus', 4, 5], ['altostratus', 4, 5], ['nimbostratus', 4, 4],
    ['stratocumulus', 4, 5], ['stratus', 3, 3], ['cumulus', 3, 3], ['cumulonimbus', 3, 3]],

  // ----- general and focused themes -----
  shades_of_blue: [['navy', 1, 1], ['sky blue', 1, 1], ['cobalt', 2, 2], ['azure', 3, 3], ['cyan', 2, 3], ['turquoise', 2, 3], ['indigo', 3, 3], ['royal blue', 2, 2],
    ['baby blue', 2, 2], ['powder blue', 3, 3], ['periwinkle', 3, 4], ['denim', 3, 3], ['ultramarine', 4, 4], ['cerulean', 4, 4]],
  citrus_fruits: [['lemon', 1, 1], ['lime', 1, 1], ['orange', 1, 1, { g: 'fruit' }], ['grapefruit', 1, 1], ['tangerine', 2, 2, { al: [['mandarin', 'synonym', 2, 2]] }], ['clementine', 2, 2],
    ['satsuma', 3, 3, { reg: ['UK'] }], ['kumquat', 4, 4], ['pomelo', 4, 4], ['yuzu', 4, 5, { reg: ['AU'] }], ['bergamot', 4, 5], ['citron', 4, 4]],
  fruits: [['apple', 1, 1, { g: 'fruit' }], ['banana', 1, 1], ['orange', 1, 1, { g: 'fruit' }], ['pear', 1, 1], ['grape', 1, 1], ['strawberry', 1, 1], ['cherry', 1, 1], ['peach', 1, 1],
    ['plum', 2, 2], ['mango', 1, 1], ['pineapple', 1, 1], ['watermelon', 1, 1], ['lemon', 1, 1], ['kiwi', 1, 2, { g: 'fruit', al: [['kiwifruit', 'synonym', 2, 2]] }], ['pomegranate', 2, 3],
    ['fig', 2, 2], ['papaya', 2, 3], ['lychee', 3, 4], ['guava', 3, 4], ['persimmon', 3, 4], ['jackfruit', 3, 4], ['passion fruit', 2, 3], ['quince', 4, 4], ['rambutan', 4, 5],
    ['tomato', 1, 4], ['avocado', 1, 4]],
  buildings_to_live_in: [['house', 1, 1], ['apartment', 1, 1, { al: [['flat', 'synonym', 1, 1, ['UK']]] }], ['bungalow', 2, 2], ['cottage', 2, 2], ['mansion', 1, 1], ['castle', 1, 2],
    ['igloo', 1, 3], ['cabin', 1, 1], ['villa', 2, 2], ['penthouse', 2, 3], ['townhouse', 2, 2], ['houseboat', 2, 3], ['mobile home', 2, 2], ['terraced house', 3, 3, { reg: ['UK'] }],
    ['semi-detached house', 3, 3, { reg: ['UK'] }], ['chalet', 2, 3], ['palace', 2, 3]],
  shops: [['bakery', 1, 1], ['butcher shop', 2, 1, { al: [["butcher's", 'synonym', 2, 2, ['UK']]] }], ['pharmacy', 1, 1, { al: [['chemist', 'synonym', 2, 2, ['UK']], ['drugstore', 'synonym', 2, 2, ['US']]] }],
    ['supermarket', 1, 1], ['florist', 1, 1], ['bookshop', 1, 1, { al: [['bookstore', 'synonym', 1, 1, ['US']]] }], ['greengrocer', 3, 2, { reg: ['UK'] }], ['pet shop', 1, 1],
    ['toy store', 1, 1], ['hardware store', 2, 2], ['jeweler', 2, 2, { al: [['jeweller', 'spelling', 3, 3, ['UK']]] }], ['newsagent', 3, 3, { reg: ['UK'], al: [['newsstand', 'synonym', 3, 3, ['US']]] }],
    ['deli', 2, 2], ['barbershop', 2, 2]],
  farm_animals: [['cow', 1, 1], ['pig', 1, 1], ['sheep', 1, 1], ['chicken', 1, 1], ['horse', 1, 1], ['goat', 1, 1], ['duck', 1, 1], ['turkey', 1, 2, { g: 'bird' }], ['goose', 1, 2],
    ['donkey', 1, 2, { al: [['ass', 'synonym', 3, 4, [], { g: 'donkey' }]] }], ['llama', 2, 3], ['alpaca', 2, 3], ['ox', 2, 3], ['mule', 2, 3], ['bull', 1, 1], ['hen', 1, 1]],
  torso: [['chest', 1, 1], ['belly', 1, 1], ['back', 1, 1], ['waist', 1, 1], ['hip', 1, 2], ['ribs', 1, 2], ['navel', 2, 2, { al: [['belly button', 'synonym', 1, 1]] }], ['abdomen', 2, 2],
    ['spine', 2, 2], ['buttocks', 2, 3, { al: [['bottom', 'synonym', 1, 2, ['UK']], ['butt', 'synonym', 1, 2, ['US']], ['ass', 'synonym', 1, 2, ['US'], { g: 'buttocks', vulgar: true }]] }]],
  silicon_valley_companies: [['Apple', 1, 1, { g: 'tech company', type: 'org', tm: true }], ['Google', 1, 1, { type: 'org', tm: true }], ['Intel', 2, 2, { type: 'org', tm: true }],
    ['Nvidia', 3, 3, { type: 'org', tm: true }], ['Netflix', 1, 2, { type: 'org', tm: true }], ['Oracle', 3, 3, { g: 'tech company', type: 'org', tm: true }], ['Adobe', 3, 3, { type: 'org', tm: true }],
    ['Meta', 2, 2, { g: 'tech company', type: 'org', tm: true }], ['Tesla', 1, 3, { g: 'car company', type: 'org', tm: true }], ['Cisco', 3, 3, { type: 'org', tm: true }],
    ['Uber', 1, 3, { type: 'org', tm: true }], ['Airbnb', 2, 3, { type: 'org', tm: true }]],
  british_car_brands: [['Jaguar', 1, 1, { g: 'car', type: 'org', tm: true }], ['Mini', 1, 1, { g: 'car', type: 'org', tm: true }], ['Bentley', 2, 2, { type: 'org', tm: true }],
    ['Rolls-Royce', 1, 1, { type: 'org', tm: true }], ['Aston Martin', 2, 2, { type: 'org', tm: true }], ['Lotus', 3, 3, { g: 'car', type: 'org', tm: true }], ['McLaren', 3, 3, { type: 'org', tm: true }],
    ['Land Rover', 2, 2, { type: 'org', tm: true }], ['Morgan', 4, 4, { g: 'car', type: 'org', tm: true }]],
  metals: [['iron', 1, 1], ['gold', 1, 1], ['silver', 1, 1], ['copper', 1, 1], ['tin', 1, 1], ['lead', 1, 2, { g: 'metal' }], ['zinc', 2, 2], ['aluminum', 1, 1, { al: [['aluminium', 'spelling', 1, 1, ['UK']]] }],
    ['nickel', 2, 2], ['platinum', 2, 2], ['titanium', 2, 2], ['tungsten', 3, 3], ['mercury', 2, 3, { g: 'element' }]],
  big_cats: [['lion', 1, 1], ['tiger', 1, 1], ['leopard', 1, 1], ['cheetah', 1, 1], ['jaguar', 1, 1, { g: 'animal' }], ['cougar', 2, 2, { al: [['puma', 2, 2], ['mountain lion', 2, 3, ['US']]] }],
    ['snow leopard', 2, 2], ['clouded leopard', 4, 4]],
  hot_drinks: [['tea', 1, 1], ['coffee', 1, 1], ['hot chocolate', 1, 1, { al: [['cocoa', 2, 2]] }], ['latte', 1, 1], ['cappuccino', 1, 1], ['espresso', 2, 2], ['mocha', 2, 2],
    ['chai', 2, 2], ['americano', 2, 3], ['macchiato', 3, 3], ['flat white', 3, 3, { reg: ['UK', 'AU', 'NZ'] }], ['matcha', 3, 3]],
  cheeses: [['cheddar', 1, 1], ['mozzarella', 1, 1], ['brie', 1, 1], ['parmesan', 1, 1], ['feta', 1, 1], ['gouda', 2, 2], ['camembert', 2, 2], ['edam', 2, 2], ['stilton', 3, 3, { reg: ['UK'] }],
    ['gorgonzola', 3, 3], ['halloumi', 3, 3], ['roquefort', 3, 3], ['manchego', 3, 3], ['ricotta', 3, 3], ['emmental', 3, 3], ['gruyere', 3, 3], ['paneer', 3, 4]],
  dog_breeds: [['labrador', 1, 1], ['poodle', 1, 1], ['bulldog', 1, 1], ['beagle', 1, 1], ['German shepherd', 1, 1, { type: 'proper' }], ['golden retriever', 1, 1], ['chihuahua', 1, 1],
    ['dachshund', 2, 2], ['pug', 1, 1], ['husky', 1, 1], ['dalmatian', 1, 1], ['rottweiler', 2, 2], ['border collie', 2, 2], ['greyhound', 2, 2], ['corgi', 2, 2], ['Pomeranian', 2, 2, { type: 'proper' }],
    ['schnauzer', 3, 3], ['whippet', 3, 3], ['Shih Tzu', 3, 3, { type: 'proper' }], ['Akita', 3, 3, { type: 'proper' }], ['Samoyed', 3, 4, { type: 'proper' }], ['basenji', 4, 4], ['saluki', 4, 4], ['vizsla', 4, 5]],
  string_instruments: [['guitar', 1, 1], ['violin', 1, 1], ['cello', 1, 1], ['harp', 1, 1], ['viola', 3, 3], ['double bass', 2, 2], ['banjo', 2, 2], ['ukulele', 2, 2], ['mandolin', 3, 3],
    ['lute', 3, 3], ['sitar', 3, 4], ['balalaika', 4, 4], ['zither', 4, 4]],
  brass_instruments: [['trumpet', 1, 1], ['trombone', 1, 1], ['tuba', 1, 1], ['French horn', 2, 2, { type: 'proper' }], ['cornet', 3, 3], ['bugle', 2, 2], ['euphonium', 4, 4], ['flugelhorn', 4, 4], ['sousaphone', 4, 4]],
  currencies: [['dollar', 1, 1], ['euro', 1, 1], ['pound', 1, 1, { g: 'currency' }], ['yen', 1, 1], ['rupee', 2, 2], ['peso', 2, 2], ['franc', 2, 2], ['yuan', 2, 2], ['ruble', 2, 2], ['rand', 3, 3],
    ['krona', 3, 3], ['won', 3, 4, { g: 'currency' }], ['lira', 3, 3], ['baht', 3, 3], ['dinar', 4, 4]],
  hand_tools: [['hammer', 1, 1], ['screwdriver', 1, 1], ['saw', 1, 1], ['wrench', 1, 1, { al: [['spanner', 'synonym', 1, 1, ['UK']]] }], ['pliers', 1, 1], ['axe', 1, 2], ['chisel', 2, 2], ['mallet', 2, 2], ['crowbar', 2, 2],
    ['hacksaw', 3, 3], ['spirit level', 3, 3], ['hatchet', 3, 3], ['plane', 3, 4, { g: 'tool' }], ['awl', 4, 4], ['adze', 5, 5]],
  seating: [['chair', 1, 1], ['sofa', 1, 1, { al: [['couch', 'synonym', 1, 1], ['settee', 'synonym', 3, 3, ['UK']], ['chesterfield', 'synonym', 4, 4, ['UK']]] }], ['armchair', 1, 1], ['stool', 1, 1],
    ['bench', 1, 1], ['beanbag', 2, 2], ['recliner', 2, 2], ['rocking chair', 2, 2], ['deckchair', 2, 3], ['ottoman', 3, 3], ['loveseat', 3, 3, { reg: ['US'] }], ['chaise longue', 3, 3], ['pew', 3, 4]],
};

const rec = n => Math.max(0, Math.min(5, n));
let made = 0;
for (const [tid, rows] of Object.entries(DATA)) {
  if (!P.ix.theme.has(tid)) throw Error('no such theme: ' + tid);
  for (const [text, r, inR, o = {}] of rows) {
    let e = sameText(P, text).find(x => (x.gloss || '') === (o.g || ''));
    if (e) { e.th[tid] = inR; continue; }
    e = addEntry(P, text, { gloss: o.g || '', pos: o.pos || 'noun', type: o.type || 'common', rec: rec(r), th: { [tid]: inR }, tm: !!o.tm, adult: !!o.adult,
      vulgar: !!o.vulgar, sensitive: !!o.sens, region: o.reg || [], status: 'gen' });
    reindex(P); made++;
    for (const [at, kind, ar, ai, areg = [], ao = {}] of o.al || []) {
      const a = addEntry(P, at, { gloss: ao.g || '', pos: e.pos, type: e.type, rec: rec(ar), aliasOf: e.id, aliasKind: kind, region: areg, tm: e.tm, adult: !!ao.adult,
        vulgar: !!ao.vulgar, status: 'gen' });
      if (ai !== Math.max(inR, ar)) a.th[tid] = ai;
      reindex(P); made++;
    }
  }
}
reindex(P);
writeFileSync(here('../data/pilot.project.json'), serializeProject(P));
const issues = validate(P).filter(i => i.sev !== 'info' || i.kind === 'rating-vs-zipf');
const themes = Object.keys(DATA).length;
console.log(`${made} entries in ${themes} themes -> data/pilot.project.json`);
for (const i of issues.filter(i => !['thin', 'empty'].includes(i.kind))) console.log(i.sev, i.kind, i.msg);
