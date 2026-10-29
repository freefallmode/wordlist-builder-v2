// Depth-3 batch: Home & Everyday, chunk 4 (holidays and celebrations, time, household objects, household properties).
export const THEMES = {
  birthdays: { d: 1 }, valentine_s_day: { d: 1 }, festivals_of_the_world: { d: 3, sensitive: true }, gift_wrapping: { d: 2 }, fireworks: { d: 2 },
  months: { d: 1, complete: true, note: 'January, February, March, April, May, June, July, August, September, October, November, December' },
  days_and_weeks: { d: 2 }, season_words: { d: 3 }, time_units: { d: 2 }, clocks_and_calendars: { d: 2 }, times_of_day: { d: 2 },
  zodiac_signs: { d: 2, complete: true, note: 'Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces' },
  chinese_zodiac: { d: 3, complete: true, note: 'rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey, rooster, dog, pig' },
  weekdays: { d: 1, complete: true, note: 'Monday, Tuesday, Wednesday, Thursday, Friday' },
  containers: { d: 2 }, cords_and_strings: { d: 3 }, paper_goods: { d: 2 }, candle_words: { d: 4 }, emergency_supplies: { d: 3 },
  retro_household_items: { d: 4 }, home_decor: { d: 2 }, locks_and_keys: { d: 3 }, cozy_things: { d: 1 }, things_you_plug_in: { d: 2 },
  things_with_handles: { d: 3 }, things_with_buttons: { d: 3 }, things_with_lids: { d: 3 }, things_with_legs: { d: 3 },
};

const dedupe = rows => rows.filter((r, i, a) => a.findIndex(x => x[0] === r[0] && (x[3]?.g || '') === (r[3]?.g || '')) === i);
const P = (o = {}) => ({ type: 'proper', ...o });

export const FIXES = [
  { gloss: ['chest', 'body_parts', 'body part'] }, { gloss: ['tin', 'metals', 'metal'] }, { gloss: ['iron', 'metals', 'metal'] },
  { gloss: ['fountain', 'garden', 'garden feature'] }, { gloss: ['willow', 'trees', 'tree'] }, { gloss: ['chrysanthemum', 'flowers', 'flower'] },
  { gloss: ['peony', 'flowers', 'flower'] }, { gloss: ['macrame', 'hobbies_and_crafts', 'craft'] }, { gloss: ['Midsummer', 'holidays_and_celebrations', 'festival'] },
];

export const DATA = {
  birthdays: dedupe([
    ['cake', 1, 1], ['candles', 1, 1], ['balloons', 1, 1], ['present', 1, 1, { g: 'gift' }], ['party hat', 1, 1], ['card', 1, 2, { g: 'greeting' }], ['confetti', 1, 2],
    ['streamers', 2, 2], ['pinata', 2, 2, { al: [['piñata', 'spelling', 3, 3]] }], ['party popper', 2, 2], ['cupcake', 1, 2], ['ice cream', 1, 3], ['birthday cake', 1, 1],
    ['birthday song', 1, 1], ['make a wish', 1, 1, { type: 'phrase' }], ['goodie bag', 2, 2, { al: [['party bag', 'synonym', 2, 2, ['UK']], ['loot bag', 'synonym', 3, 3, ['CA']]] }],
    ['party favor', 2, 2, { al: [['party favour', 'spelling', 2, 2, ['UK']]] }], ['surprise party', 1, 1], ['sweet sixteen', 3, 2], ['bouncy castle', 2, 2, { reg: ['UK'] }],
    ['pass the parcel', 3, 2, { reg: ['UK'] }], ['musical chairs', 2, 3], ['pin the tail', 3, 3], ['party blower', 3, 3], ['cake topper', 3, 3], ['birthday boy', 1, 1],
    ['birthday girl', 1, 1], ['birthday suit', 2, 4, { type: 'phrase' }], ['over the hill', 2, 3, { type: 'phrase' }], ['milestone', 2, 4], ['birthday bumps', 4, 3, { reg: ['UK'] }],
    ['gift card', 2, 3], ['party games', 1, 2], ['clown', 1, 3], ['birthday banner', 2, 2], ['birthday wishes', 2, 1],
  ]),

  valentine_s_day: dedupe([
    ['heart', 1, 1, { g: 'symbol' }], ['roses', 1, 1], ['chocolates', 1, 1], ['Cupid', 1, 1, { g: 'cherub', type: 'proper' }], ['love letter', 1, 1], ['red rose', 1, 1], ['bouquet', 2, 2],
    ['teddy bear', 1, 2], ['sweetheart', 2, 1], ['romance', 2, 2, { g: 'love' }], ['candlelit dinner', 3, 1], ['date night', 2, 2], ['love note', 2, 1], ['secret admirer', 2, 1],
    ['box of chocolates', 1, 1], ['conversation hearts', 3, 2, { reg: ['US'] }], ['love heart', 2, 2, { reg: ['UK'] }], ['xoxo', 3, 3, { al: [['hugs and kisses', 'synonym', 2, 3, [], { type: 'phrase' }]] }],
    ['my valentine', 2, 1, { type: 'phrase' }], ['lovebirds', 2, 2], ['proposal', 2, 3], ['diamond ring', 2, 3], ['kiss', 1, 2],
    ['sonnet', 3, 3], ['love poem', 2, 2], ['Galentine\'s Day', 4, 3, P()], ['Singles Awareness Day', 4, 4, P()], ['lonely hearts', 3, 3],
    ['be mine', 2, 1, { type: 'phrase' }], ['St. Valentine', 4, 3, { type: 'person' }], ['love token', 4, 3],
    ['romantic getaway', 2, 2], ['mix tape', 4, 4], ['pink', 1, 3], ['flowers', 1, 2], ['perfume', 1, 3],
  ]),

  festivals_of_the_world: dedupe([
    ['Diwali', 2, 2, P({ al: [['Deepavali', 'synonym', 4, 4]] })], ['Holi', 3, 2, P()], ['Hanukkah', 2, 2, P({ al: [['Chanukah', 'spelling', 3, 3]] })],
    ['Eid', 3, 2, P()], ['Ramadan', 2, 2, P()], ['Oktoberfest', 2, 1, P({ adult: true })], ['carnival', 2, 2, { g: 'festival' }], ['Mardi Gras', 2, 2, P()],
    ['Day of the Dead', 2, 2, P()], ['Lunar New Year', 2, 2, P({ al: [['Chinese New Year', 'synonym', 1, 2], ['Tet', 'synonym', 4, 4]] })], ['Songkran', 4, 3, P()],
    ['Burning Man', 3, 3, P()], ['La Tomatina', 4, 3, P()], ['Running of the Bulls', 3, 3, P()], ['Up Helly Aa', 5, 4, P({ reg: ['UK'] })], ['Hogmanay', 3, 3, P({ reg: ['UK'] })],
    ['Beltane', 4, 4, P()], ['Midsummer', 3, 3, P({ g: 'festival' })], ['Bastille Day', 3, 3, P()], ['Anzac Day', 3, 3, P({ reg: ['AU', 'NZ'] })], ['St. Patrick\'s Day', 1, 2, P()],
    ['Mid-Autumn Festival', 4, 3, P()], ['Dragon Boat Festival', 4, 3, P()], ['Lantern Festival', 4, 3, P()], ['Vesak', 5, 4, P()], ['Obon', 5, 4, P()],
    ['Pongal', 5, 5, P({ reg: ['IN'] })], ['Onam', 5, 5, P({ reg: ['IN'] })], ['Navratri', 5, 5, P({ reg: ['IN'] })], ['Durga Puja', 5, 5, P({ reg: ['IN'] })],
    ['Purim', 4, 4, P()], ['Sukkot', 5, 4, P()], ['Nowruz', 5, 4, P()], ['Kwanzaa', 3, 3, P({ reg: ['US'] })], ['Juneteenth', 3, 3, P({ reg: ['US'] })],
    ['Cinco de Mayo', 2, 2, P()], ['Inti Raymi', 5, 5, P()], ['Thaipusam', 5, 5, P()], ['Notting Hill Carnival', 4, 3, P({ reg: ['UK'] })], ['Gion Matsuri', 5, 5, P()],
    ['Eid al-Fitr', 4, 3, P()], ['Yom Kippur', 3, 3, P()],
  ]),

  gift_wrapping: dedupe([
    ['wrapping paper', 1, 1, { al: [['gift wrap', 'synonym', 2, 1]] }], ['ribbon', 1, 1], ['bow', 1, 1, { g: 'ribbon' }], ['gift tag', 2, 1],
    ['sticky tape', 1, 1, { reg: ['UK'], al: [['Scotch tape', 'synonym', 2, 2, ['US'], { tm: true, type: 'proper' }]] }],
    ['scissors', 1, 2], ['gift bag', 1, 1], ['tissue paper', 1, 1], ['gift box', 1, 1], ['curling ribbon', 3, 2], ['twine', 2, 3], ['raffia', 4, 4], ['cellophane', 3, 3],
    ['gift basket', 2, 2, { al: [['hamper', 'synonym', 2, 3, ['UK']]] }], ['kraft paper', 3, 3], ['washi tape', 4, 4], ['furoshiki', 5, 4], ['rosette', 4, 4, { g: 'bow' }],
    ['name tag', 2, 3], ['crinkle paper', 4, 3], ['shredded paper', 3, 3], ['gift receipt', 3, 3], ['unwrap', 1, 2, { pos: 'verb' }], ['wrap', 1, 1, { pos: 'verb', g: 'gift' }],
    ['sticker', 1, 3], ['paper bow', 3, 2], ['stick-on bow', 3, 2], ['pom-pom', 3, 4], ['present', 1, 3, { g: 'gift' }],
    ['double-sided tape', 3, 3], ['paper roll', 2, 2],
  ]),

  fireworks: dedupe([
    ['rocket', 1, 2, { g: 'firework' }], ['sparkler', 2, 1], ['firecracker', 1, 1], ['Roman candle', 3, 2, P({ g: 'firework' })], ['Catherine wheel', 3, 2, P()],
    ['bottle rocket', 3, 2], ['fountain', 2, 3, { g: 'firework' }], ['fuse', 2, 2], ['banger', 3, 2, { g: 'firework', reg: ['UK'] }], ['squib', 4, 3, { g: 'firework' }],
    ['smoke bomb', 2, 3], ['pyrotechnics', 3, 2], ['grand finale', 2, 3], ['firework display', 1, 1], ['star shell', 4, 3], ['chrysanthemum', 4, 5, { g: 'firework burst' }],
    ['peony', 4, 5, { g: 'firework burst' }], ['willow', 4, 5, { g: 'firework burst' }], ['crossette', 5, 4], ['fizzer', 5, 4, { reg: ['UK', 'AU'] }], ['whizzbang', 4, 3, { reg: ['UK'] }],
    ['jumping jack', 4, 3], ['cracker', 2, 3, { g: 'firework' }], ['launch tube', 4, 4], ['black powder', 3, 3], ['gunpowder', 2, 3],
    ['M-80', 4, 3, { type: 'proper' }], ['cherry bomb', 3, 3], ['ground spinner', 4, 3], ['pyrotechnician', 4, 2], ['sparkle', 2, 4], ['bang', 1, 4], ['boom', 1, 4],
    ['strobe', 3, 4], ['gerb', 5, 4, { reg: ['UK'] }], ['Bengal light', 5, 4, P()], ['sky rocket', 3, 2], ['barrage', 4, 4, { g: 'firework' }],
  ]),

  months: [
    ['January', 1, 1, P({ al: [['Jan', 'synonym', 2, 3]] })], ['February', 1, 2, P({ al: [['Feb', 'synonym', 2, 3]] })],
    ['March', 1, 1, P({ g: 'month', al: [['Mar', 'synonym', 3, 3]] })], ['April', 1, 1, P({ al: [['Apr', 'synonym', 3, 3]] })], ['May', 1, 1, P({ g: 'month' })],
    ['June', 1, 1, P({ al: [['Jun', 'synonym', 3, 4]] })], ['July', 1, 1, P({ al: [['Jul', 'synonym', 3, 4]] })],
    ['August', 1, 2, P({ g: 'month', al: [['Aug', 'synonym', 3, 3]] })], ['September', 1, 1, P({ al: [['Sept', 'synonym', 2, 3], ['Sep', 'synonym', 3, 3]] })],
    ['October', 1, 1, P({ al: [['Oct', 'synonym', 3, 3]] })], ['November', 1, 1, P({ al: [['Nov', 'synonym', 3, 3]] })],
    ['December', 1, 1, P({ al: [['Dec', 'synonym', 3, 3]] })],
  ],

  days_and_weeks: dedupe([
    ['Monday', 1, 1, P()], ['Tuesday', 1, 1, P()], ['Wednesday', 1, 1, P()], ['Thursday', 1, 1, P()], ['Friday', 1, 1, P()], ['Saturday', 1, 1, P()], ['Sunday', 1, 1, P()],
    ['weekend', 1, 1], ['weekday', 1, 1], ['week', 1, 1], ['fortnight', 2, 2, { reg: ['UK', 'AU', 'IE'], al: [['two weeks', 'synonym', 1, 1]] }], ['midweek', 3, 2], ['sennight', 5, 4],
    ['work week', 2, 2, { al: [['working week', 'synonym', 2, 2, ['UK']]] }], ['long weekend', 2, 2], ['Hump Day', 3, 3, P()], ['Blue Monday', 3, 3, P()], ['Black Friday', 2, 3, P({ tm: true })],
    ['Cyber Monday', 3, 3, P()], ['Shrove Tuesday', 4, 4, P({ sens: true })], ['Good Friday', 2, 3, P({ sens: true })], ['Ash Wednesday', 3, 4, P({ sens: true })],
    ['Palm Sunday', 3, 4, P({ sens: true })], ['Maundy Thursday', 5, 5, P({ sens: true })], ['yesterday', 1, 2], ['today', 1, 2], ['tomorrow', 1, 2], ['weekly', 1, 2, { pos: 'adjective' }],
    ['biweekly', 3, 3, { pos: 'adjective' }], ['Sabbath', 3, 4, P({ sens: true })], ['TGIF', 3, 3, { type: 'acronym' }], ['payday', 2, 4], ['Boxing Day', 2, 4, P({ reg: ['UK', 'AU', 'CA'] })],
    ['day off', 1, 3], ['school week', 2, 3], ['weekend break', 2, 2],
  ]),

  season_words: dedupe([
    ['spring', 1, 1, { g: 'season' }], ['summer', 1, 1], ['autumn', 1, 1, { al: [['fall', 'synonym', 1, 1, ['US', 'CA'], { g: 'season' }]] }], ['winter', 1, 1], ['monsoon', 2, 2],
    ['equinox', 3, 2], ['solstice', 3, 2], ['harvest', 2, 3], ['wet season', 2, 2], ['dry season', 2, 2], ['rainy season', 2, 2], ['midsummer', 3, 3, { g: 'season' }],
    ['midwinter', 3, 3], ['Indian summer', 3, 3, P()], ['thaw', 2, 3], ['springtime', 2, 1], ['wintertime', 2, 1], ['summertime', 1, 1], ['vernal', 4, 3, { pos: 'adjective' }],
    ['autumnal', 3, 3, { pos: 'adjective' }], ['estival', 5, 4, { pos: 'adjective' }], ['hibernal', 5, 4, { pos: 'adjective' }], ['vernal equinox', 3, 3],
    ['autumnal equinox', 4, 3], ['summer solstice', 3, 2], ['winter solstice', 3, 2], ['high season', 2, 3], ['low season', 2, 3], ['off-season', 2, 2], ['peak season', 2, 3],
    ['shoulder season', 4, 3], ['mud season', 4, 3, { reg: ['US'] }], ['harmattan', 5, 4], ['Yuletide', 3, 4], ['leaf fall', 3, 3], ['seasonal', 2, 2, { pos: 'adjective' }],
    ['hurricane season', 2, 3], ['flu season', 2, 4], ['growing season', 3, 3], ['wintry', 3, 3, { pos: 'adjective' }],
  ]),

  time_units: dedupe([
    ['second', 1, 1, { g: 'time unit' }], ['minute', 1, 1, { g: 'time unit' }], ['hour', 1, 1], ['day', 1, 1], ['week', 1, 1], ['month', 1, 1], ['year', 1, 1], ['decade', 1, 1],
    ['century', 1, 1], ['millennium', 2, 1, { al: [['millenium', 'spelling', 2, 3]] }], ['millisecond', 2, 2], ['microsecond', 3, 3], ['nanosecond', 3, 3], ['picosecond', 4, 4],
    ['femtosecond', 5, 5], ['fortnight', 2, 2, { reg: ['UK', 'AU', 'IE'] }], ['leap year', 1, 3], ['jiffy', 3, 4], ['moment', 2, 4, { g: 'time unit' }], ['score', 3, 4, { g: 'twenty years' }],
    ['lustrum', 5, 5], ['quarter', 2, 3, { g: 'three months' }], ['semester', 3, 3], ['epoch', 3, 4], ['eon', 3, 3, { al: [['aeon', 'spelling', 3, 3, ['UK']]] }], ['era', 2, 3],
    ['generation', 2, 3, { g: 'age group' }], ['biennium', 5, 5], ['quarter hour', 2, 2], ['half hour', 1, 2], ['shake', 5, 5, { g: 'time unit' }], ['olympiad', 4, 4],
    ['term', 2, 4, { g: 'school' }], ['tick', 3, 4, { g: 'clock sound' }], ['instant', 2, 4], ['bicentennial', 4, 4],
  ]),

  clocks_and_calendars: dedupe([
    ['clock', 1, 1], ['watch', 1, 1, { g: 'wristwatch' }], ['alarm clock', 1, 1], ['grandfather clock', 2, 1, { al: [['longcase clock', 'synonym', 4, 3]] }], ['cuckoo clock', 2, 1],
    ['sundial', 2, 2], ['hourglass', 2, 2], ['pendulum', 2, 3], ['stopwatch', 2, 2], ['atomic clock', 3, 3], ['digital clock', 1, 1], ['analog clock', 2, 2, { al: [['analogue clock', 'spelling', 2, 2, ['UK']]] }],
    ['wall clock', 1, 1], ['calendar', 1, 1], ['almanac', 3, 3], ['planner', 2, 3], ['diary', 1, 3, { reg: ['UK'] }], ['advent calendar', 2, 2, { sens: true }], ['wall calendar', 1, 1],
    ['desk calendar', 2, 2], ['Gregorian calendar', 3, 3, P()], ['Julian calendar', 4, 3, P()], ['lunar calendar', 3, 2], ['Hebrew calendar', 4, 3, P({ sens: true })],
    ['Mayan calendar', 3, 3, P()], ['minute hand', 1, 1], ['hour hand', 1, 1], ['second hand', 2, 2], ['clock face', 1, 1], ['pocket watch', 2, 1], ['wristwatch', 1, 1],
    ['water clock', 4, 3], ['chronometer', 4, 3], ['timer', 1, 3], ['egg timer', 2, 3], ['carriage clock', 4, 3, { reg: ['UK'] }], ['mantel clock', 3, 2],
    ['mainspring', 4, 4], ['escapement', 5, 5], ['balance wheel', 5, 5], ['bezel', 5, 5], ['chronograph', 4, 4], ['horologe', 5, 5], ['timepiece', 3, 2], ['Roman numerals', 2, 3, P()],
    ['chime', 2, 3], ['dial', 2, 3, { g: 'clock' }], ['leap day', 2, 3], ['datebook', 4, 3, { reg: ['US'] }], ['cog', 3, 4],
  ]),

  times_of_day: dedupe([
    ['morning', 1, 1], ['afternoon', 1, 1], ['evening', 1, 1], ['night', 1, 1], ['dawn', 1, 1], ['dusk', 2, 1], ['noon', 1, 1], ['midnight', 1, 1], ['sunrise', 1, 1], ['sunset', 1, 1],
    ['daybreak', 2, 1], ['twilight', 2, 2], ['midday', 2, 1, { al: [['high noon', 'synonym', 2, 2]] }], ['nightfall', 2, 2], ['sundown', 2, 2], ['sunup', 3, 2, { reg: ['US'] }],
    ['gloaming', 4, 3], ['crack of dawn', 2, 2, { type: 'phrase' }], ['witching hour', 3, 3, { type: 'phrase' }], ['small hours', 3, 3, { type: 'phrase' }], ['rush hour', 1, 4],
    ['happy hour', 1, 4], ['lunchtime', 1, 2], ['bedtime', 1, 3], ['teatime', 2, 3, { reg: ['UK'] }], ['first light', 3, 2], ['cockcrow', 4, 3], ['eventide', 5, 3], ['forenoon', 5, 4],
    ['golden hour', 3, 3], ['blue hour', 4, 4], ['break of day', 3, 2, { type: 'phrase' }], ['wee hours', 3, 3, { type: 'phrase' }], ['nighttime', 1, 1], ['daytime', 1, 1],
    ['dead of night', 3, 3, { type: 'phrase' }], ['half-light', 4, 3], ['elevenses', 4, 4, { reg: ['UK'] }], ['early hours', 2, 2], ['late night', 1, 2], ['crepuscule', 5, 4],
    ['dayspring', 5, 4], ['vespers', 5, 5, { sens: true }], ['breakfast time', 1, 2], ['dinnertime', 1, 2], ['suppertime', 3, 3],
  ]),

  zodiac_signs: [
    ['Aries', 1, 1, P({ al: [['the Ram', 'synonym', 3, 3]] })], ['Taurus', 1, 1, P({ al: [['the Bull', 'synonym', 3, 3]] })],
    ['Gemini', 1, 1, P({ al: [['the Twins', 'synonym', 3, 3]] })], ['Cancer', 1, 1, P({ g: 'star sign', al: [['the Crab', 'synonym', 3, 3]] })],
    ['Leo', 1, 1, P({ al: [['the Lion', 'synonym', 2, 3]] })], ['Virgo', 1, 1, P({ al: [['the Maiden', 'synonym', 4, 4]] })],
    ['Libra', 1, 1, P({ al: [['the Scales', 'synonym', 3, 3]] })], ['Scorpio', 1, 1, P({ al: [['the Scorpion', 'synonym', 2, 3]] })],
    ['Sagittarius', 2, 2, P({ al: [['the Archer', 'synonym', 3, 3]] })], ['Capricorn', 2, 2, P({ al: [['the Sea-Goat', 'synonym', 5, 5]] })],
    ['Aquarius', 2, 2, P({ al: [['the Water Bearer', 'synonym', 4, 4]] })], ['Pisces', 2, 2, P({ al: [['the Fish', 'synonym', 3, 3]] })],
  ],

  chinese_zodiac: [
    ['rat', 1, 2, { g: 'animal' }], ['ox', 2, 3], ['tiger', 1, 2], ['rabbit', 1, 2], ['dragon', 1, 1], ['snake', 1, 2], ['horse', 1, 2], ['goat', 1, 3], ['monkey', 1, 2],
    ['rooster', 1, 3], ['dog', 1, 2], ['pig', 1, 2],
  ],

  weekdays: [
    ['Monday', 1, 1, P()], ['Tuesday', 1, 1, P()], ['Wednesday', 1, 2, P()], ['Thursday', 1, 2, P()], ['Friday', 1, 1, P()],
  ],

  containers: dedupe([
    ['box', 1, 1], ['jar', 1, 1], ['bottle', 1, 1], ['can', 1, 1, { g: 'container' }], ['tin', 1, 1, { g: 'container' }], ['bucket', 1, 1], ['bowl', 1, 2], ['basket', 1, 1], ['crate', 2, 1],
    ['barrel', 1, 1], ['jug', 1, 1], ['pot', 1, 2, { g: 'container' }], ['tub', 1, 2], ['carton', 2, 1], ['bag', 1, 2], ['tote', 3, 3, { g: 'bag' }], ['canister', 3, 2],
    ['flask', 2, 2], ['urn', 2, 2], ['vat', 3, 2], ['drum', 2, 2, { g: 'container' }], ['chest', 2, 2, { g: 'storage' }], ['trunk', 2, 2, { g: 'storage' }], ['hamper', 2, 2], ['pail', 2, 1],
    ['cask', 3, 2], ['keg', 2, 2], ['tank', 2, 3, { g: 'storage tank' }], ['vessel', 3, 3], ['caddy', 3, 3, { g: 'tea caddy' }], ['pitcher', 2, 2], ['vial', 2, 2], ['flagon', 4, 3],
    ['demijohn', 4, 3], ['amphora', 4, 3], ['firkin', 5, 4], ['hogshead', 5, 4], ['carboy', 5, 4], ['bin', 1, 2], ['mug', 1, 3], ['cup', 1, 3], ['Mason jar', 2, 2, { type: 'common' }],
    ['lunch box', 1, 2], ['cookie jar', 1, 2], ['toolbox', 1, 2], ['cruet', 4, 3], ['tureen', 4, 3], ['punnet', 4, 3, { reg: ['UK'] }], ['pannier', 4, 4], ['creel', 5, 4],
    ['ampoule', 4, 3], ['phial', 5, 4], ['tun', 5, 4], ['casket', 3, 3, { g: 'small box' }], ['coffer', 4, 3], ['carafe', 3, 2], ['decanter', 3, 3],
  ]),

  cords_and_strings: dedupe([
    ['rope', 1, 1], ['string', 1, 1], ['twine', 2, 1], ['cord', 1, 1], ['thread', 1, 2, { g: 'sewing' }], ['yarn', 1, 2], ['ribbon', 1, 2], ['shoelace', 1, 1], ['lanyard', 3, 2],
    ['drawstring', 2, 2], ['bungee cord', 2, 2], ['paracord', 4, 3], ['hawser', 5, 4], ['cordage', 4, 3], ['lasso', 2, 3], ['lariat', 4, 3], ['tether', 3, 3], ['leash', 1, 4],
    ['extension cord', 2, 3], ['power cord', 2, 3], ['guitar string', 2, 3], ['fishing line', 1, 3], ['kite string', 2, 2], ['clothesline', 2, 2], ['tow rope', 2, 2],
    ['jump rope', 1, 3], ['tightrope', 2, 4], ['sisal', 4, 3], ['raffia', 4, 4], ['baling twine', 4, 3], ['bootlace', 3, 2, { reg: ['UK'] }], ['piping', 4, 5, { g: 'sewing' }],
    ['braid', 2, 3], ['sash cord', 5, 4], ['shock cord', 4, 3], ['halyard', 5, 4], ['guy rope', 4, 3], ['embroidery floss', 4, 3], ['macrame cord', 4, 3], ['hemp rope', 3, 2],
    ['skipping rope', 2, 2, { reg: ['UK'] }], ['hair tie', 3, 5], ['rubber band', 1, 5], ['wool', 1, 3], ['strand', 3, 3], ['filament', 4, 4], ['cable tie', 3, 4], ['shoestring', 2, 2],
  ]),

  paper_goods: dedupe([
    ['tissue', 1, 1, { g: 'paper' }], ['napkin', 1, 1, { al: [['serviette', 'synonym', 2, 2, ['UK']]] }], ['paper towel', 1, 1, { al: [['kitchen roll', 'synonym', 2, 2, ['UK']]] }],
    ['envelope', 1, 1], ['wrapping paper', 1, 2], ['toilet paper', 1, 1, { al: [['loo roll', 'synonym', 3, 3, ['UK']]] }], ['paper plate', 1, 1], ['paper cup', 1, 1],
    ['notepad', 1, 1], ['notebook', 1, 2, { g: 'paper' }], ['writing paper', 1, 2], ['printer paper', 1, 1], ['cardstock', 3, 3], ['sticky note', 1, 1], ['index card', 2, 2], ['stationery', 2, 2],
    ['letterhead', 3, 3], ['paper bag', 1, 1], ['paper straw', 2, 2], ['tissue paper', 1, 1], ['baking paper', 2, 2, { al: [['parchment paper', 'synonym', 2, 2]] }],
    ['greaseproof paper', 3, 3, { reg: ['UK'] }], ['wax paper', 2, 2], ['tracing paper', 3, 3], ['crepe paper', 3, 3], ['construction paper', 2, 2], ['cardboard', 1, 3],
    ['coffee filter', 2, 2], ['doily', 3, 3], ['facial tissue', 2, 1], ['Kleenex', 2, 2, { type: 'org', tm: true }], ['Post-it', 2, 2, { type: 'org', tm: true }], ['paper napkin', 1, 1],
    ['blotting paper', 4, 3], ['carbon paper', 4, 3], ['origami paper', 3, 3], ['flyer', 2, 4], ['placemat', 3, 4], ['cupcake liner', 3, 3, { al: [['cupcake case', 'synonym', 3, 3, ['UK']]] }],
    ['paper tablecloth', 3, 2], ['photo paper', 2, 2], ['graph paper', 2, 2], ['lined paper', 1, 2], ['sugar paper', 4, 3, { reg: ['UK'] }], ['manila folder', 3, 3, { reg: ['US'] }],
  ]),

  candle_words: dedupe([
    ['candle', 1, 1], ['taper', 3, 2, { g: 'candle' }], ['votive', 4, 3], ['tealight', 3, 2, { al: [['tea light', 'spelling', 2, 2]] }], ['wick', 2, 1], ['wax', 1, 2],
    ['candelabra', 3, 2, { al: [['candelabrum', 'spelling', 4, 3]] }], ['candlestick', 2, 2], ['pillar candle', 3, 2], ['beeswax', 2, 2], ['paraffin', 3, 3, { g: 'wax' }],
    ['soy wax', 3, 2], ['snuffer', 4, 3, { al: [['candle snuffer', 'synonym', 3, 2]] }], ['candle holder', 1, 1], ['sconce', 4, 3], ['menorah', 3, 3, { sens: true }],
    ['birthday candle', 1, 2], ['scented candle', 1, 1], ['jar candle', 2, 2], ['floating candle', 3, 2], ['tallow', 4, 3], ['wax melt', 3, 3], ['wick trimmer', 4, 3],
    ['candlelight', 2, 2], ['chandler', 5, 4], ['advent candle', 3, 3, { sens: true }], ['bobeche', 5, 5], ['dipped candle', 4, 3], ['rushlight', 5, 4], ['spermaceti', 5, 5],
    ['candle flame', 1, 2], ['drip tray', 4, 4], ['candlewick', 4, 3], ['church candle', 2, 3, { sens: true }], ['dinner candle', 3, 2], ['taper candle', 3, 2],
    ['melted wax', 2, 2], ['candle maker', 3, 3], ['stearin', 5, 5], ['dripless', 4, 4],
  ]),

  emergency_supplies: dedupe([
    ['flashlight', 1, 1], ['first aid kit', 1, 1], ['bottled water', 1, 1], ['canned food', 1, 1], ['batteries', 1, 1], ['radio', 1, 2], ['blanket', 1, 2], ['whistle', 1, 2, { g: 'signal' }],
    ['matches', 1, 2, { g: 'fire' }], ['candles', 1, 2], ['tarp', 3, 3], ['duct tape', 2, 3], ['multitool', 3, 3], ['water purifier', 3, 2], ['sleeping bag', 1, 3], ['rope', 1, 3],
    ['gas mask', 2, 3, { adult: true }], ['dust mask', 2, 2], ['hand-crank radio', 4, 2], ['power bank', 2, 3], ['go bag', 3, 2], ['bug-out bag', 4, 3], ['MRE', 4, 3, { type: 'acronym' }],
    ['space blanket', 3, 2, { al: [['emergency blanket', 'synonym', 2, 1]] }], ['fire extinguisher', 1, 2], ['smoke alarm', 1, 3], ['generator', 2, 2], ['road flare', 3, 3],
    ['jump leads', 3, 4, { reg: ['UK'], al: [['jumper cables', 'synonym', 3, 4, ['US']]] }],
    ['sandbags', 3, 2], ['life jacket', 1, 3], ['survival kit', 2, 1], ['water tablets', 4, 2], ['iodine tablets', 4, 3], ['compass', 2, 4],
    ['can opener', 1, 3], ['hand sanitizer', 1, 3], ['glow stick', 2, 3], ['ferro rod', 5, 4], ['dried food', 2, 2], ['energy bars', 2, 2], ['emergency kit', 1, 1],
    ['sleeping mat', 3, 3], ['safety pin', 2, 4], ['trauma kit', 4, 3], ['tourniquet', 3, 3, { adult: true }], ['water barrel', 3, 3],
  ]),

  retro_household_items: dedupe([
    ['rotary phone', 2, 1], ['VCR', 2, 1, { type: 'acronym' }], ['typewriter', 2, 1], ['mangle', 4, 2, { g: 'wringer' }], ['washboard', 3, 2], ['record player', 1, 1, { al: [['turntable', 'synonym', 2, 2]] }],
    ['cassette player', 2, 1], ['Walkman', 2, 2, { type: 'org', tm: true }], ['boombox', 2, 2], ['floppy disk', 2, 2],
    ['CRT television', 3, 2], ['fondue set', 3, 2], ['lava lamp', 2, 2], ['Rolodex', 4, 3, { type: 'org', tm: true }], ['pager', 2, 2], ['slide projector', 3, 2], ['film camera', 2, 3],
    ['Polaroid', 2, 3, { type: 'org', tm: true }], ['VHS', 2, 1, { type: 'acronym' }], ['laserdisc', 4, 3], ['Betamax', 4, 3, { type: 'org', tm: true }], ['answering machine', 2, 1],
    ['dial-up modem', 3, 2], ['fax machine', 2, 1], ['transistor radio', 3, 2], ['gramophone', 3, 2], ['phonograph', 4, 3], ['wringer', 4, 2], ['flat iron', 4, 2], ['chamber pot', 3, 3],
    ['bed warmer', 4, 3], ['warming pan', 4, 3], ['percolator', 3, 3], ['Teasmade', 5, 3, { type: 'org', tm: true, reg: ['UK'] }], ['trouser press', 4, 3, { reg: ['UK'] }],
    ['hostess trolley', 4, 3, { reg: ['UK'] }], ['SodaStream', 3, 4, { type: 'org', tm: true }], ['ashtray', 2, 3, { adult: true }], ['coal scuttle', 4, 3], ['icebox', 3, 3],
    ['carpet sweeper', 4, 3], ['tape recorder', 3, 2], ['8-track', 4, 3], ['cine camera', 4, 3], ['Bakelite phone', 4, 3], ['wind-up clock', 3, 3], ['butter churn', 4, 3],
    ['tin bath', 4, 3], ['washing dolly', 5, 3], ['mimeograph', 5, 3], ['slide rule', 4, 4], ['cathode ray tube', 4, 3], ['party line', 3, 4, { g: 'phone' }],
    ['console television', 4, 3],
  ]),

  home_decor: dedupe([
    ['vase', 1, 1], ['ornament', 2, 1], ['picture frame', 1, 1, { al: [['photo frame', 'synonym', 1, 1]] }], ['figurine', 3, 1], ['candlestick', 2, 2], ['mirror', 1, 2], ['cushion', 1, 2],
    ['throw', 2, 3, { g: 'blanket' }], ['rug', 1, 2], ['curtains', 1, 3], ['wall art', 1, 1], ['painting', 1, 2], ['poster', 1, 2], ['tapestry', 3, 2], ['wreath', 2, 2],
    ['houseplant', 3, 2], ['fairy lights', 2, 2], ['wall hanging', 2, 2], ['bookend', 3, 2], ['knick-knack', 3, 2, { al: [['knickknack', 'spelling', 3, 2]] }], ['doily', 3, 3],
    ['trinket', 3, 2], ['centerpiece', 3, 2, { al: [['centrepiece', 'spelling', 3, 2, ['UK']]] }], ['sculpture', 2, 2], ['wind chime', 2, 2], ['potpourri', 3, 2], ['terrarium', 3, 3],
    ['sconce', 4, 3], ['throw pillow', 2, 2], ['snow globe', 2, 2], ['macrame', 3, 3, { g: 'wall hanging' }], ['tchotchke', 4, 3], ['bric-a-brac', 4, 3], ['curio', 4, 3],
    ['antimacassar', 5, 4], ['jardiniere', 5, 4], ['epergne', 5, 5], ['objet d\'art', 5, 4], ['dried flowers', 2, 2], ['lampshade', 2, 3], ['mantelpiece', 2, 3], ['planter', 2, 3],
    ['bud vase', 3, 2], ['decanter', 3, 4], ['clock', 1, 3], ['candle holder', 1, 2], ['wall sticker', 3, 2], ['gallery wall', 3, 2], ['table runner', 3, 2],
  ]),

  locks_and_keys: dedupe([
    ['padlock', 1, 1], ['deadbolt', 3, 2], ['key', 1, 1, { g: 'lock' }], ['keyhole', 2, 1], ['key ring', 1, 1, { al: [['keyring', 'spelling', 1, 1], ['keychain', 'synonym', 1, 1, ['US']]] }],
    ['latch', 2, 2], ['combination lock', 2, 1], ['bolt', 2, 2, { g: 'door' }], ['skeleton key', 3, 2], ['master key', 2, 2], ['key fob', 3, 2], ['keycard', 3, 2, { al: [['key card', 'spelling', 2, 2]] }],
    ['lock pick', 3, 2, { al: [['lockpick', 'spelling', 3, 2]] }], ['Yale lock', 3, 2, { type: 'proper', tm: true }], ['chain lock', 2, 2, { al: [['door chain', 'synonym', 2, 2]] }],
    ['mortise lock', 4, 3], ['cylinder lock', 4, 3], ['tumbler', 4, 3, { g: 'lock' }], ['bike lock', 1, 2, { al: [['bicycle lock', 'synonym', 1, 2]] }], ['D-lock', 3, 3], ['key safe', 3, 3],
    ['smart lock', 3, 2], ['keypad lock', 3, 2], ['hasp', 4, 3], ['warded lock', 5, 4], ['lever lock', 4, 4], ['pin tumbler', 5, 4], ['spare key', 1, 1], ['house key', 1, 1],
    ['car key', 1, 2], ['key cutter', 3, 3], ['locksmith', 2, 2], ['bump key', 4, 3], ['escutcheon', 5, 4], ['strike plate', 4, 4], ['latchkey', 3, 2], ['ignition key', 2, 3],
    ['time lock', 4, 3], ['dead latch', 5, 4], ['Chubb lock', 4, 3, { type: 'proper', tm: true, reg: ['UK'] }], ['door lock', 1, 1], ['lock', 1, 1, { g: 'door' }],
    ['rim lock', 5, 4], ['night latch', 4, 3, { reg: ['UK'] }], ['cabinet lock', 2, 2], ['luggage lock', 2, 2], ['TSA lock', 3, 3, P()],
  ]),

  cozy_things: dedupe([
    ['blanket', 1, 1], ['cocoa', 1, 1], ['slippers', 1, 1], ['fireplace', 1, 1], ['candle', 1, 2], ['hot chocolate', 1, 1], ['throw', 2, 2, { g: 'blanket' }], ['fuzzy socks', 1, 1],
    ['cardigan', 1, 2], ['woolly socks', 1, 1, { reg: ['UK'] }], ['cup of tea', 1, 1], ['soup', 1, 2], ['hot water bottle', 2, 1, { reg: ['UK'] }], ['knitted jumper', 2, 2, { reg: ['UK'] }],
    ['quilt', 1, 1, { g: 'bedding' }], ['duvet', 2, 2], ['comforter', 2, 2, { g: 'bedding' }], ['armchair', 1, 2], ['bean bag', 2, 3], ['pillow', 1, 2], ['cushions', 1, 2], ['rainy day', 1, 2], ['fairy lights', 2, 2],
    ['book', 1, 3], ['purring cat', 2, 1], ['crackling fire', 1, 1], ['wood burner', 3, 2, { reg: ['UK'] }], ['stew', 1, 2], ['cuddle', 1, 1, { pos: 'verb' }], ['pajamas', 1, 1, { al: [['pyjamas', 'spelling', 1, 1, ['UK']]] }],
    ['dressing gown', 2, 2, { reg: ['UK'], al: [['bathrobe', 'synonym', 1, 2]] }], ['flannel', 3, 2, { g: 'fabric' }], ['fleece', 2, 2], ['sherpa', 4, 3, { g: 'fabric' }], ['snug', 3, 1],
    ['hygge', 4, 1, { note: 'Danish' }], ['reading nook', 3, 1], ['window seat', 2, 2], ['log fire', 2, 1, { reg: ['UK'] }], ['marshmallows', 1, 3], ['electric blanket', 2, 2],
    ['hearth', 3, 2], ['snuggle', 2, 1, { pos: 'verb' }], ['mittens', 1, 4], ['scarf', 1, 4], ['movie night', 1, 2], ['sweater weather', 2, 1, { type: 'phrase' }], ['warm bath', 1, 2],
    ['hot toddy', 3, 3, { adult: true, sens: true }], ['apple cider', 2, 3],
  ]),

  things_you_plug_in: dedupe([
    ['toaster', 1, 1], ['kettle', 1, 1], ['lamp', 1, 1], ['television', 1, 1], ['fridge', 1, 2], ['microwave', 1, 2], ['vacuum cleaner', 1, 1], ['hair dryer', 1, 1],
    ['washing machine', 1, 2], ['phone charger', 1, 1], ['laptop', 1, 2], ['radio', 1, 2], ['fan', 1, 1, { g: 'electric fan' }], ['heater', 1, 1], ['iron', 1, 1, { g: 'appliance' }],
    ['blender', 1, 1], ['dishwasher', 1, 3], ['coffee maker', 1, 1], ['electric blanket', 2, 1], ['clock radio', 2, 1], ['night light', 1, 1], ['printer', 1, 1], ['router', 2, 2, { g: 'network' }],
    ['slow cooker', 2, 1], ['rice cooker', 2, 1], ['mixer', 2, 1, { g: 'kitchen' }], ['food processor', 2, 1], ['juicer', 2, 1], ['air fryer', 2, 1], ['humidifier', 2, 2],
    ['game console', 1, 2], ['desktop computer', 1, 2], ['monitor', 2, 2, { g: 'computer' }], ['electric shaver', 2, 1], ['curling iron', 2, 1, { reg: ['US'] }], ['hair straighteners', 3, 1, { reg: ['UK'] }],
    ['soundbar', 3, 2], ['stereo', 2, 2], ['freezer', 1, 3], ['dehumidifier', 3, 2], ['electric kettle', 1, 1], ['hot plate', 2, 2], ['waffle iron', 2, 1], ['deep fryer', 2, 2],
    ['immersion blender', 3, 2], ['bread maker', 2, 1], ['popcorn maker', 3, 1], ['heat lamp', 3, 2], ['space heater', 2, 1], ['Christmas lights', 1, 2], ['baby monitor', 2, 2],
    ['tumble dryer', 2, 3, { g: 'clothes dryer', reg: ['UK'] }], ['electric toothbrush', 2, 2], ['smart speaker', 2, 2],
    ['sewing machine', 2, 2], ['extension lead', 3, 2, { reg: ['UK'] }],
  ]),

  things_with_handles: dedupe([
    ['mug', 1, 1], ['door', 1, 1], ['suitcase', 1, 1], ['bucket', 1, 1], ['saucepan', 1, 1], ['frying pan', 1, 1], ['knife', 1, 1], ['hammer', 1, 1], ['umbrella', 1, 1],
    ['broom', 1, 1], ['jug', 1, 2], ['basket', 1, 2], ['drawer', 1, 2], ['cupboard', 1, 3], ['teapot', 1, 2], ['watering can', 1, 2], ['shovel', 1, 1], ['rake', 1, 1], ['kettle', 1, 2],
    ['handbag', 1, 2], ['trolley', 2, 3, { g: 'cart' }], ['wheelbarrow', 1, 2], ['toolbox', 1, 2], ['briefcase', 1, 1], ['mop', 1, 2], ['axe', 1, 1], ['cup', 1, 2], ['ladle', 2, 2], ['spatula', 2, 3],
    ['fridge', 1, 4], ['window', 1, 4], ['pram', 2, 3, { reg: ['UK'] }], ['lawnmower', 1, 3], ['joystick', 2, 3], ['crank', 3, 3], ['hoe', 3, 2, { g: 'tool' }], ['spade', 1, 2], ['scythe', 3, 2],
    ['skillet', 2, 2], ['sieve', 2, 3, { g: 'kitchen tool' }], ['whisk', 2, 3], ['cleaver', 3, 2], ['sword', 1, 2], ['trowel', 3, 2], ['paintbrush', 1, 3],
    ['toothbrush', 1, 3], ['razor', 1, 3], ['wok', 2, 3], ['jerry can', 3, 2], ['bicycle', 1, 4], ['screwdriver', 1, 2],
    ['pitchfork', 2, 2], ['hatchet', 3, 2], ['lunchbox', 1, 2], ['tongs', 2, 3], ['peeler', 2, 3], ['wrench', 1, 3], ['crowbar', 2, 2], ['sledgehammer', 2, 2],
    ['scoop', 2, 3, { g: 'utensil' }], ['pestle', 3, 4], ['skimmer', 4, 3], ['pickaxe', 2, 2],
  ]),

  things_with_buttons: dedupe([
    ['shirt', 1, 1], ['remote control', 1, 1], ['jacket', 1, 2], ['coat', 1, 2], ['calculator', 1, 1], ['keyboard', 1, 1, { g: 'computer' }], ['elevator', 1, 1, { al: [['lift', 'synonym', 1, 1, ['UK'], { g: 'elevator' }]] }],
    ['doorbell', 1, 1], ['microwave', 1, 2], ['cardigan', 1, 1], ['blouse', 1, 1], ['trousers', 1, 3], ['jeans', 1, 3], ['waistcoat', 2, 2], ['cash register', 2, 2], ['game controller', 1, 1],
    ['mouse', 1, 2, { g: 'computer' }], ['radio', 1, 2], ['washing machine', 1, 2], ['arcade machine', 2, 1], ['vending machine', 1, 1],
    ['snowman', 1, 3], ['gingerbread man', 2, 3], ['walkie-talkie', 2, 2], ['toaster', 1, 3], ['ATM', 1, 2, { type: 'acronym' }], ['alarm clock', 1, 3], ['camera', 1, 2],
    ['stopwatch', 2, 2], ['accordion', 2, 3], ['overalls', 2, 2], ['pajamas', 1, 2, { al: [['pyjamas', 'spelling', 1, 2, ['UK']]] }], ['duffle coat', 3, 2], ['blazer', 2, 2], ['polo shirt', 1, 2],
    ['pea coat', 3, 2], ['trench coat', 2, 2], ['cordless phone', 3, 2], ['smartphone', 1, 2], ['pinball machine', 3, 2], ['intercom', 3, 1],
    ['panic button', 3, 3], ['dress shirt', 2, 1], ['waistband', 3, 4], ['teddy bear', 1, 4], ['rag doll', 3, 4], ['dashboard', 2, 3],
  ]),

  things_with_lids: dedupe([
    ['jar', 1, 1], ['pot', 1, 1, { g: 'cooking pot' }], ['saucepan', 1, 1], ['teapot', 1, 1], ['bin', 1, 1], ['box', 1, 2], ['coffee cup', 1, 1], ['toilet', 1, 2], ['piano', 1, 3],
    ['laptop', 1, 2], ['trunk', 2, 3, { g: 'storage' }], ['chest', 2, 3, { g: 'storage' }], ['cookie jar', 1, 1], ['kettle', 1, 2], ['casserole dish', 2, 1], ['Tupperware', 1, 1, { type: 'org', tm: true }],
    ['tin', 1, 2, { g: 'container' }], ['can', 1, 3, { g: 'container' }], ['barrel', 2, 3], ['sugar bowl', 2, 1], ['butter dish', 2, 1], ['soup tureen', 3, 1], ['treasure chest', 1, 1],
    ['cooler', 2, 2], ['lunchbox', 1, 2], ['hamper', 2, 2], ['wheelie bin', 2, 1, { reg: ['UK'] }], ['garbage can', 1, 1, { reg: ['US'] }], ['slow cooker', 2, 1], ['rice cooker', 2, 2],
    ['jewelry box', 1, 2], ['music box', 1, 2], ['pencil case', 1, 4], ['cauldron', 2, 2], ['urn', 2, 2], ['teacup', 2, 4], ['takeaway cup', 2, 1],
    ['paint tin', 2, 2], ['trash can', 1, 1, { reg: ['US'] }], ['sandwich box', 2, 2], ['cake tin', 2, 2], ['biscuit tin', 2, 1, { reg: ['UK'] }], ['chest freezer', 2, 2], ['dustbin', 2, 2, { reg: ['UK'] }],
    ['hot tub', 2, 3], ['pill bottle', 2, 2], ['pepper pot', 3, 3], ['jam jar', 1, 1], ['Dutch oven', 3, 2, { g: 'cast iron pot' }], ['canister', 3, 2], ['Crock-Pot', 3, 2, { g: 'slow cooker', tm: true, type: 'org' }], ['stockpot', 3, 1],
    ['washing machine', 2, 3], ['caddy', 3, 3, { g: 'tea caddy' }], ['sugar canister', 3, 2],
  ]),

  things_with_legs: dedupe([
    ['table', 1, 1], ['chair', 1, 1], ['stool', 1, 1], ['bench', 1, 2], ['bed', 1, 2], ['sofa', 1, 2], ['desk', 1, 1], ['tripod', 2, 1], ['easel', 3, 2], ['ladder', 1, 3], ['stepladder', 3, 3],
    ['piano', 1, 4], ['trestle', 4, 2], ['sawhorse', 3, 2], ['music stand', 2, 3], ['ironing board', 1, 2], ['cot', 2, 3, { g: 'baby bed' }], ['crib', 2, 3, { g: 'baby bed' }], ['bar stool', 2, 1], ['footstool', 2, 2],
    ['couch', 1, 2], ['armchair', 1, 2], ['coffee table', 1, 1], ['dressing table', 2, 1], ['bedside table', 1, 1], ['workbench', 2, 2], ['trousers', 1, 1], ['tights', 1, 1], ['compasses', 3, 3],
    ['dividers', 4, 3], ['ottoman', 3, 3], ['pool table', 2, 2], ['dining table', 1, 1], ['deckchair', 3, 2], ['camp bed', 3, 3], ['high chair', 2, 2], ['chaise longue', 4, 3],
    ['trestle table', 3, 1], ['card table', 3, 2], ['tea trolley', 4, 3], ['four-poster', 4, 3, { g: 'bed' }], ['clawfoot tub', 4, 3], ['wardrobe', 2, 4], ['cabinet', 2, 4, { g: 'furniture' }], ['pants', 1, 1],
    ['jeans', 1, 1], ['shorts', 1, 1], ['leggings', 1, 1], ['stockings', 2, 2], ['bunk bed', 1, 3], ['sideboard', 3, 3], ['credenza', 4, 4], ['settee', 3, 3, { reg: ['UK'] }],
    ['writing desk', 2, 2], ['tea table', 3, 2], ['drafting table', 4, 3], ['bookcase', 1, 5], ['sun lounger', 3, 3, { reg: ['UK'] }],
  ]),
};
