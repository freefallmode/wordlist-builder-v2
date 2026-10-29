// Depth 4+ batch: Home & Everyday, chunk 2 (festivals of the world, months and seasons, clocks, tableware).
export const THEMES = {
  holi: { d: 3, sensitive: true }, mid_autumn_festival: { d: 4 }, ramadan_and_eid: { d: 2, sensitive: true }, hanukkah: { d: 2, sensitive: true },
  day_of_the_dead: { d: 3, sensitive: true, region: ['MX'] }, anzac_day: { d: 3, sensitive: true, region: ['AU', 'NZ'] }, midsummer: { d: 3 },
  oktoberfest: { d: 2 }, st_patrick_s_day: { d: 1 },
  months_with_31_days: { d: 4 }, the_four_seasons: { d: 1 },
  clock_parts: { d: 3 }, clock_types: { d: 2 },
  cutlery: { d: 1 }, crockery: { d: 2 }, drinking_vessels: { d: 1 }, serving_dishes: { d: 3 },
};

export const FIXES = [
  { gloss: ['face', 'body_parts', 'body part'] }, { gloss: ['schooner', 'boats_and_ships', 'ship'] }, { gloss: ['alarm', 'things_that_ring', 'warning'] }, { gloss: ['coupe', 'car_types', 'car'] },
];

const dedupe = rows => rows.filter((r, i, a) => a.findIndex(x => x[0] === r[0] && (x[3]?.g || '') === (r[3]?.g || '')) === i);

export const DATA = {
  holi: dedupe([
    ['colored powder', 3, 2, { al: [['colour powder', 'spelling', 3, 2, ['UK']]] }], ['water balloon', 1, 3], ['gulal', 5, 4], ['abir', 5, 5], ['pichkari', 5, 4],
    ['water gun', 1, 3], ['Holika Dahan', 5, 4, { type: 'proper' }], ['bonfire', 1, 3], ['Krishna', 3, 3, { g: 'god' }], ['Radha', 4, 4, { g: 'goddess' }],
    ['Prahlad', 5, 5, { type: 'person' }], ['Holika', 5, 5, { type: 'person' }], ['Hiranyakashipu', 5, 5, { type: 'person' }], ['Vishnu', 3, 4, { g: 'god' }],
    ['thandai', 5, 4], ['gujiya', 5, 4], ['bhang', 4, 4, { adult: true }], ['dhol', 4, 4], ['rangoli', 3, 4], ['Mathura', 5, 4], ['Vrindavan', 5, 5, { type: 'place' }],
    ['Festival of Colors', 2, 2, { type: 'proper', al: [['Festival of Colours', 'spelling', 2, 2, ['UK'], { type: 'proper' }]] }], ['Phagwah', 5, 5, { type: 'proper', reg: ['GY', 'TT'] }],
    ['mithai', 4, 4], ['malpua', 5, 5], ['India', 1, 4, { type: 'place' }], ['spring', 1, 4, { g: 'season' }], ['Diwali', 2, 5],
  ]),
  mid_autumn_festival: dedupe([
    ['mooncake', 3, 2, { al: [['moon cake', 'spelling', 3, 2]] }], ['lantern', 2, 2], ['full moon', 1, 3], ['Chang\'e', 4, 3, { g: 'moon' }], ['Jade Rabbit', 5, 4, { type: 'proper' }],
    ['rabbit', 1, 4], ['lotus seed paste', 5, 5], ['salted egg yolk', 4, 5], ['red bean', 3, 5], ['pomelo', 3, 3], ['osmanthus', 4, 4], ['osmanthus wine', 5, 5],
    ['moon gazing', 4, 3], ['harvest moon', 2, 3], ['Wu Gang', 5, 5, { type: 'person' }], ['Hou Yi', 5, 5, { type: 'person' }], ['Moon Festival', 2, 1, { type: 'proper' }],
    ['Chuseok', 4, 3, { type: 'proper', reg: ['KR'] }], ['Tsukimi', 5, 4, { type: 'proper', reg: ['JP'] }], ['cassia tree', 5, 5], ['paper lantern', 2, 2],
    ['family reunion', 2, 3], ['lantern riddle', 5, 4], ['Tet Trung Thu', 5, 5, { type: 'proper', reg: ['VN'] }], ['tea', 1, 4, { g: 'drink' }], ['persimmon', 3, 5],
  ]),
  ramadan_and_eid: dedupe([
    ['Eid al-Fitr', 4, 3, { type: 'proper' }], ['Eid al-Adha', 4, 4, { type: 'proper' }], ['Eid Mubarak', 3, 2, { type: 'proper' }], ['iftar', 3, 2], ['suhoor', 4, 3],
    ['fasting', 2, 2], ['dates', 2, 3, { g: 'fruit' }], ['crescent', 2, 3, { g: 'moon' }], ['hilal', 5, 4], ['moon sighting', 4, 3], ['zakat', 4, 4], ['Quran', 2, 3],
    ['mosque', 1, 3], ['taraweeh', 5, 4], ['Laylat al-Qadr', 5, 5, { type: 'proper' }], ['sawm', 5, 5], ['henna', 3, 3], ['charity', 1, 4], ['feast', 1, 3],
    ['Mecca', 2, 4], ['fanous', 5, 4], ['prayer', 1, 3], ['qurbani', 5, 5], ['sewaiyan', 5, 5], ['maamoul', 5, 4], ['new clothes', 2, 3], ['eidi', 5, 4],
    ['muezzin', 4, 3], ['adhan', 4, 4], ['Hajj', 3, 3, { type: 'proper' }],
  ]),
  hanukkah: dedupe([
    ['menorah', 2, 1], ['dreidel', 2, 1, { al: [['spinning top', 'synonym', 2, 3]] }], ['latke', 3, 2, { al: [['potato pancake', 'synonym', 2, 3]] }],
    ['gelt', 4, 2, { al: [['chocolate coins', 'synonym', 2, 2]] }], ['sufganiyot', 5, 4], ['doughnut', 1, 4], ['candle', 1, 3], ['shamash', 5, 3, { g: 'candle' }],
    ['Maccabees', 4, 3, { type: 'proper' }], ['Judah Maccabee', 5, 4, { type: 'person' }], ['Antiochus', 5, 5, { type: 'person' }], ['miracle', 1, 4],
    ['olive oil', 1, 4], ['Second Temple', 5, 5, { type: 'proper' }], ['Jerusalem', 2, 4, { type: 'place' }], ['eight nights', 2, 3, { type: 'phrase' }],
    ['Festival of Lights', 3, 3, { type: 'proper' }], ['Star of David', 2, 4, { type: 'proper' }], ['Hebrew', 2, 4, { type: 'proper' }], ['brisket', 3, 4],
    ['applesauce', 2, 4, { g: 'food' }], ['sour cream', 1, 4], ['Hasmoneans', 5, 5, { type: 'proper' }], ['Mattathias', 5, 5, { type: 'person' }], ['rededication', 5, 4],
    ['Kislev', 5, 5, { type: 'proper', g: 'Hebrew month' }], ['Maoz Tzur', 5, 5, { type: 'title' }], ['blue and white', 2, 3, { type: 'phrase' }],
  ]),
  day_of_the_dead: dedupe([
    ['Día de los Muertos', 3, 1, { type: 'proper', note: 'Spanish name of the festival' }], ['calavera', 4, 4], ['sugar skull', 3, 2], ['skull', 1, 3], ['skeleton', 1, 3, { g: 'body' }],
    ['marigold', 2, 2], ['cempasúchil', 5, 4], ['ofrenda', 5, 3], ['altar', 2, 3], ['papel picado', 4, 3], ['pan de muerto', 5, 4], ['candle', 1, 3], ['incense', 2, 4, { g: 'smell' }],
    ['copal', 5, 5], ['La Catrina', 4, 3, { type: 'proper', al: [['Catrina', 'short', 4, 3, [], { type: 'proper' }]] }], ['Mexico', 1, 3, { g: 'country', type: 'place' }],
    ['cemetery', 1, 3], ['graveyard', 1, 3], ['face paint', 1, 3], ['Oaxaca', 4, 4, { type: 'place' }], ['Mictecacihuatl', 5, 5, { type: 'proper', g: 'goddess' }], ['Aztec', 3, 4],
    ['ancestor', 2, 3], ['tamale', 2, 4], ['atole', 5, 5], ['remembrance', 2, 3], ['November', 1, 4, { type: 'proper' }], ['grave', 2, 3, { g: 'tomb' }],
    ['monarch butterfly', 3, 4], ['Coco', 2, 3, { type: 'title', tm: true, g: 'film' }], ['mariachi', 3, 4], ['tombstone', 1, 3, { g: 'grave marker' }],
  ]),
  anzac_day: dedupe([
    ['Gallipoli', 3, 3], ['dawn service', 3, 2], ['dawn', 1, 3], ['poppy', 2, 3], ['Last Post', 3, 3, { type: 'proper' }], ['bugle', 3, 3], ['Lest We Forget', 3, 3, { type: 'proper' }],
    ['rosemary', 2, 4], ['digger', 3, 3, { g: 'soldier', reg: ['AU', 'NZ'] }], ['Anzac biscuit', 3, 2, { type: 'proper', reg: ['AU', 'NZ'] }], ['Anzac', 2, 2, { type: 'acronym' }],
    ['April', 1, 3, { type: 'proper' }], ['Australia', 1, 4, { type: 'place', g: 'country' }], ['New Zealand', 1, 4, { type: 'place' }], ['soldier', 1, 3], ['veteran', 2, 3],
    ['parade', 1, 3, { g: 'procession' }], ['two-up', 4, 4], ['Ode of Remembrance', 4, 4, { type: 'title' }], ['Anzac Cove', 4, 4, { type: 'place' }],
    ['Dardanelles', 4, 4, { type: 'place' }], ['memorial', 2, 3], ['wreath', 2, 3], ['cenotaph', 4, 4], ['medals', 2, 3], ['RSL', 4, 4, { type: 'acronym', reg: ['AU'] }],
    ['Lone Pine', 5, 5, { type: 'place' }], ['slouch hat', 4, 4], ['Simpson', 5, 5, { type: 'person', g: 'Anzac stretcher bearer' }], ['Turkey', 2, 4, { g: 'country', type: 'place' }],
    ['one minute\'s silence', 2, 3, { type: 'phrase' }],
  ]),
  midsummer: dedupe([
    ['maypole', 2, 3], ['bonfire', 1, 3], ['flower crown', 2, 3], ['wreath', 2, 3], ['garland', 2, 3], ['solstice', 3, 2], ['summer solstice', 3, 2], ['herring', 2, 4],
    ['new potatoes', 2, 4], ['strawberries', 1, 4], ['schnapps', 3, 4], ['folk dance', 2, 3], ['Sweden', 1, 4, { type: 'place' }], ['Finland', 2, 4, { type: 'place' }],
    ['Stonehenge', 2, 3], ['druid', 3, 4, { g: 'Celtic priest' }], ['Litha', 5, 4, { type: 'proper' }], ['Juhannus', 5, 4, { type: 'proper', reg: ['FI'] }],
    ['Ivan Kupala', 5, 5, { type: 'proper', reg: ['RU'] }], ['longest day', 2, 3], ['daylight', 1, 3], ['June', 1, 3, { type: 'proper' }], ['picnic', 1, 4], ['midnight sun', 3, 4],
    ['sauna', 2, 4], ['wildflower', 2, 3], ['sun', 1, 3], ['Midsommar', 3, 2, { type: 'proper', reg: ['SE'], note: 'Swedish name' }],
  ]),
  oktoberfest: dedupe([
    ['beer', 1, 2], ['stein', 2, 3], ['pretzel', 1, 2], ['bratwurst', 2, 3], ['sauerkraut', 2, 3], ['schnitzel', 2, 3], ['dirndl', 3, 2], ['lederhosen', 2, 2],
    ['Munich', 2, 2, { type: 'place' }], ['Bavaria', 3, 3], ['accordion', 2, 4], ['oompah', 3, 3], ['beer tent', 2, 2], ['beer hall', 2, 3], ['Prost', 3, 3, { type: 'common' }],
    ['hops', 3, 4, { g: 'plant' }], ['Theresienwiese', 5, 4, { type: 'place' }], ['brass band', 2, 4], ['Weisswurst', 4, 4], ['Schweinshaxe', 5, 5], ['Paulaner', 4, 4, { type: 'org', tm: true }],
    ['Hofbräu', 4, 4, { type: 'org', tm: true }], ['lager', 2, 3], ['wheat beer', 3, 3], ['Märzen', 5, 5], ['mug', 1, 3, { g: 'cup' }], ['Ferris wheel', 2, 4], ['Wiesn', 5, 5, { type: 'proper' }],
    ['Tracht', 5, 4, { reg: ['DE'] }], ['Lebkuchen', 4, 4],
  ]),
  st_patrick_s_day: dedupe([
    ['shamrock', 2, 1], ['leprechaun', 2, 1], ['green', 1, 2, { g: 'color' }], ['clover', 1, 3], ['four-leaf clover', 2, 2], ['Ireland', 1, 2, { type: 'place' }],
    ['Dublin', 2, 3, { type: 'place' }], ['Guinness', 2, 3], ['harp', 2, 4], ['pot of gold', 2, 2], ['rainbow', 1, 3, { g: 'weather' }], ['gold', 1, 3, { g: 'metal' }],
    ['parade', 1, 3, { g: 'procession' }], ['Irish stew', 3, 3], ['soda bread', 3, 3], ['corned beef', 2, 3], ['cabbage', 1, 4, { g: 'vegetable' }], ['Saint Patrick', 2, 1, { type: 'person' }],
    ['snakes', 2, 3, { g: 'animal' }], ['Celtic cross', 3, 3], ['jig', 3, 3, { g: 'dance' }], ['Irish dance', 3, 3], ['pub', 2, 4], ['whiskey', 2, 4], ['Irish coffee', 3, 4],
    ['March', 1, 4, { g: 'month', type: 'proper' }], ['luck of the Irish', 3, 3, { type: 'phrase' }], ['Blarney Stone', 4, 4, { type: 'place' }], ['Erin go Bragh', 4, 3, { type: 'proper' }],
    ['Emerald Isle', 3, 3, { type: 'proper' }], ['uilleann pipes', 5, 5], ['Shamrock Shake', 3, 3, { tm: true, type: 'proper' }], ['Chicago River', 4, 4, { type: 'place' }],
    ['Croagh Patrick', 5, 5, { type: 'place' }],
  ]),
  months_with_31_days: [
    ['January', 1, 2, { type: 'proper' }], ['March', 1, 4, { g: 'month', type: 'proper' }], ['May', 1, 4, { g: 'month', type: 'proper' }], ['July', 1, 3, { type: 'proper' }],
    ['August', 1, 3, { g: 'month', type: 'proper' }], ['October', 1, 3, { type: 'proper' }], ['December', 1, 2, { type: 'proper' }],
  ],
  the_four_seasons: [
    ['spring', 1, 1, { g: 'season' }], ['summer', 1, 1], ['autumn', 1, 2], ['winter', 1, 1],
  ],
  clock_parts: dedupe([
    ['hand', 1, 1, { g: 'clock' }], ['minute hand', 1, 2], ['hour hand', 1, 2], ['second hand', 1, 2], ['face', 1, 2, { g: 'clock' }], ['dial', 2, 3, { g: 'clock' }],
    ['pendulum', 2, 2], ['chime', 2, 3], ['cog', 2, 3], ['escapement', 5, 4], ['mainspring', 4, 4], ['balance wheel', 5, 4], ['hairspring', 5, 5], ['bezel', 4, 4],
    ['watch crystal', 4, 4], ['movement', 3, 3, { g: 'clock' }], ['numerals', 2, 3], ['bell', 1, 3, { g: 'clock' }], ['spring', 2, 4, { g: 'coil' }], ['watch strap', 2, 3],
    ['battery', 1, 4, { g: 'component' }], ['tourbillon', 5, 5], ['crown', 3, 4, { g: 'watch' }], ['alarm', 1, 4, { g: 'clock' }], ['winding key', 4, 4], ['pendulum bob', 5, 5], ['gear', 2, 3, { g: 'wheel' }],
    ['case', 2, 4, { g: 'clock' }], ['pallet fork', 5, 5],
  ]),
  clock_types: dedupe([
    ['cuckoo clock', 1, 1], ['grandfather clock', 1, 1, { al: [['longcase clock', 'synonym', 4, 3]] }], ['sundial', 2, 2], ['hourglass', 2, 3, { al: [['sand timer', 'synonym', 2, 3]] }],
    ['stopwatch', 1, 3], ['alarm clock', 1, 1], ['wristwatch', 1, 2], ['pocket watch', 1, 2], ['digital clock', 1, 2], ['analog clock', 2, 2, { al: [['analogue clock', 'spelling', 2, 2, ['UK']]] }],
    ['wall clock', 1, 2], ['water clock', 3, 3, { al: [['clepsydra', 'synonym', 5, 5]] }], ['atomic clock', 2, 3], ['carriage clock', 3, 3], ['mantel clock', 3, 3], ['candle clock', 4, 4],
    ['smartwatch', 2, 3], ['speaking clock', 3, 3, { reg: ['UK'] }], ['chess clock', 3, 4], ['astronomical clock', 4, 4], ['chronometer', 4, 4], ['quartz clock', 3, 3],
    ['bedside clock', 2, 3], ['egg timer', 1, 4], ['tower clock', 3, 3], ['grandmother clock', 4, 4], ['pendulum clock', 3, 3], ['skeleton clock', 5, 5], ['flower clock', 5, 5],
    ['kitchen timer', 2, 4],
  ]),
  cutlery: dedupe([
    ['fork', 1, 1, { g: 'cutlery' }], ['knife', 1, 1, { g: 'cutlery' }], ['spoon', 1, 1], ['teaspoon', 1, 2], ['tablespoon', 2, 2], ['soup spoon', 2, 2], ['dessert spoon', 3, 3],
    ['butter knife', 2, 3], ['steak knife', 2, 2], ['fish knife', 3, 3], ['cake fork', 3, 3], ['salad fork', 3, 3], ['dinner fork', 2, 3], ['chopsticks', 1, 4], ['serving spoon', 2, 3],
    ['carving knife', 2, 3], ['spork', 2, 3], ['ladle', 2, 4], ['pastry fork', 4, 4], ['grapefruit spoon', 4, 4], ['cheese knife', 4, 4], ['bread knife', 2, 3],
    ['dessert fork', 3, 3], ['demitasse spoon', 5, 5], ['fruit knife', 4, 4], ['oyster fork', 5, 5], ['caviar spoon', 5, 5], ['fish fork', 4, 4], ['butter spreader', 4, 4],
    ['sporks', 2, 3, { g: 'cutlery' }],
  ]),
  crockery: dedupe([
    ['plate', 1, 1], ['dinner plate', 1, 1], ['side plate', 2, 2], ['bowl', 1, 1, { g: 'dish' }], ['cup', 1, 1, { g: 'mug' }], ['saucer', 2, 2], ['mug', 1, 2, { g: 'cup' }],
    ['teacup', 1, 2], ['teapot', 1, 3], ['soup bowl', 1, 2], ['cereal bowl', 2, 2], ['egg cup', 2, 3], ['gravy boat', 3, 3], ['sugar bowl', 2, 3], ['milk jug', 2, 3],
    ['ramekin', 3, 3], ['butter dish', 3, 3], ['salad plate', 3, 3], ['dessert bowl', 3, 3], ['pudding bowl', 3, 4, { reg: ['UK'] }], ['tureen', 3, 3], ['platter', 3, 3],
    ['coffee cup', 1, 2], ['espresso cup', 3, 3], ['demitasse', 5, 4], ['bone china', 3, 4], ['stoneware', 3, 4], ['earthenware', 3, 4], ['dinner service', 3, 3, { reg: ['UK'] }],
    ['tea set', 2, 3], ['cake plate', 3, 3], ['pasta bowl', 2, 3], ['noodle bowl', 3, 3], ['trencher', 5, 5, { g: 'medieval plate' }],
  ]),
  drinking_vessels: dedupe([
    ['glass', 1, 1, { g: 'drinking' }], ['cup', 1, 1, { g: 'mug' }], ['mug', 1, 1, { g: 'cup' }], ['tumbler', 2, 2, { g: 'glass' }], ['goblet', 3, 2], ['wine glass', 1, 1],
    ['pint glass', 2, 2], ['shot glass', 2, 2], ['champagne flute', 2, 2], ['tankard', 3, 3], ['stein', 2, 3], ['chalice', 3, 3], ['flask', 2, 4], ['water bottle', 1, 3],
    ['sippy cup', 2, 2], ['teacup', 1, 2], ['coffee mug', 1, 2], ['paper cup', 1, 2], ['highball glass', 3, 3], ['rocks glass', 4, 4], ['snifter', 4, 4], ['coupe', 4, 4, { g: 'glass' }],
    ['martini glass', 2, 3], ['schooner', 4, 4, { g: 'beer glass', reg: ['AU'] }], ['quaich', 5, 5], ['drinking horn', 3, 3], ['hip flask', 2, 3], ['loving cup', 5, 5],
    ['stirrup cup', 5, 5], ['kiddush cup', 5, 5, { g: 'Jewish ritual' }], ['jam jar', 3, 3], ['cocktail glass', 2, 3], ['water glass', 1, 2], ['wine goblet', 3, 3],
    ['yard of ale', 5, 5, { type: 'phrase' }],
  ]),
  serving_dishes: dedupe([
    ['platter', 2, 1], ['tureen', 3, 2], ['gravy boat', 3, 2], ['serving bowl', 1, 1], ['salad bowl', 1, 2], ['casserole dish', 2, 2], ['cake stand', 2, 3], ['butter dish', 2, 3],
    ['sugar bowl', 2, 3], ['milk jug', 2, 3], ['teapot', 1, 3], ['serving tray', 1, 2], ['chafing dish', 4, 4], ['bread basket', 2, 3], ['cheese board', 2, 3], ['serving plate', 1, 2],
    ['sauce boat', 3, 3, { al: [] }], ['soup tureen', 3, 3], ['punch bowl', 2, 3], ['fruit bowl', 1, 2], ['lazy Susan', 3, 4], ['epergne', 5, 5], ['compote dish', 4, 4], ['salver', 5, 5],
    ['cruet set', 4, 4], ['pie dish', 2, 3], ['gratin dish', 4, 4], ['tagine', 3, 4, { g: 'pot' }], ['relish tray', 3, 4], ['fondue pot', 3, 4], ['warming tray', 4, 4], ['bonbon dish', 5, 5],
    ['charger plate', 4, 4],
  ]),
};
