// Generated word data: Language & Wordplay, chunk 6 (word origins, names).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
// Given names are type 'proper'; a name whose text is also an ordinary word / place gets the gloss 'name' (see AMB) and the other meaning is labelled in FIXES.
const AMB = new Set([
  'hazel', 'jordan', 'morgan', 'sage', 'tom', 'joe', 'rose', 'violet', 'iris', 'lavender', 'primrose', 'anemone', 'lotus', 'amber', 'coral', 'georgia', 'phoenix', 'patience', 'ivory', 'olive', 'ebony', 'teal', 'fawn', 'ash', 'pine', 'lilac', 'saffron',
]);
const n = (t, r, i, o = {}) => [t, r, i, { type: 'proper', ...(AMB.has(t.toLowerCase()) ? { g: 'name' } : {}), ...o }];
const sp = (t, r, i, reg = [], o = {}) => [t, 'spelling', r, i, reg, o];

export const THEMES = {
  words_from_yiddish: { d: 3, lang: true },
  words_from_arabic: { d: 4, lang: true },
  words_from_persian: { d: 5, lang: true },
  words_from_turkish: { d: 4, lang: true },
  words_from_japanese: { d: 2, lang: true },
  words_from_chinese: { d: 3, lang: true },
  words_from_afrikaans: { d: 5, lang: true },
  words_from_native_american_languages: { d: 4, lang: true },
  words_from_nahuatl: { d: 4, lang: true },
  words_from_south_american_languages: { d: 4, lang: true },
  words_from_mythology: { d: 3, lang: true },
  words_named_after_people: { d: 3, lang: true },
  words_named_after_places: { d: 3, lang: true },
  brand_names_used_as_words: { d: 2, tm: true },
  portmanteau_words: { d: 2 },
  girls_names: { d: 1 },
  boys_names: { d: 1 },
  unisex_names: { d: 2 },
  biblical_names: { d: 2 },
  old_fashioned_names: { d: 2 },
  short_forms_of_names: { d: 2 },
  names_that_are_flowers: { d: 2 },
  names_that_are_gems: { d: 1 },
  names_that_are_months: { d: 3 },
  names_that_are_places: { d: 3 },
  names_that_are_virtues: { d: 2 },
  names_that_are_colors: { d: 2 },
  names_that_are_trees: { d: 3 },
};

export const DATA = {
  words_from_yiddish: [
    ['bagel', 1, 3], ['glitch', 2, 4], ['klutz', 3, 2], ['schmooze', 3, 3, { pos: 'verb' }], ['chutzpah', 3, 2], ['spiel', 3, 3], ['nosh', 3, 3, { pos: 'verb' }],
    ['kvetch', 3, 3, { pos: 'verb' }], ['schlep', 3, 3, { pos: 'verb' }], ['mensch', 3, 3], ['shtick', 3, 3], ['schmaltz', 3, 3], ['lox', 3, 3], ['maven', 3, 4],
    ['tchotchke', 4, 3], ['schmear', 4, 3], ['schlock', 3, 4], ['nudnik', 4, 3], ['bupkis', 4, 3], ['yenta', 4, 3], ['kibitz', 4, 3, { pos: 'verb' }], ['plotz', 4, 3, { pos: 'verb' }],
    ['zaftig', 4, 4, { pos: 'adjective' }], ['shmatte', 5, 4], ['nebbish', 4, 3], ['shlemiel', 4, 3], ['oy vey', 3, 2, { pos: 'other' }], ['mazel tov', 3, 3, { pos: 'other' }],
    ['schmuck', 3, 3, { vulgar: true }], ['putz', 3, 3, { vulgar: true }], ['dreck', 4, 4], ['shtum', 4, 4, { pos: 'adjective', reg: ['UK'] }], ['schnoz', 3, 3], ['megillah', 4, 4],
    ['schmutz', 4, 4], ['tuchus', 4, 4, { vulgar: true }],
  ],

  words_from_arabic: [
    ['algebra', 2, 3], ['coffee', 1, 4], ['sofa', 1, 4], ['magazine', 1, 4, { g: 'periodical' }], ['alcohol', 2, 3], ['algorithm', 2, 3], ['cotton', 1, 4], ['sugar', 1, 4], ['zero', 1, 4],
    ['lemon', 1, 4], ['giraffe', 1, 4], ['candy', 1, 5], ['syrup', 2, 4], ['mattress', 2, 4], ['admiral', 3, 4], ['alchemy', 3, 3], ['elixir', 3, 3], ['cipher', 3, 4],
    ['sherbet', 3, 4], ['jasmine', 2, 4], ['ghoul', 3, 3], ['genie', 2, 3], ['harem', 3, 3], ['hazard', 3, 5, { g: 'danger' }], ['tariff', 3, 4], ['saffron', 3, 4, { g: 'spice' }], ['monsoon', 3, 4],
    ['zenith', 3, 4], ['nadir', 4, 4], ['azimuth', 4, 4], ['albatross', 3, 5], ['apricot', 2, 5], ['artichoke', 3, 5], ['assassin', 2, 4], ['carafe', 3, 5], ['checkmate', 2, 4],
    ['gazelle', 2, 4], ['henna', 3, 3], ['lilac', 2, 5, { g: 'flower' }], ['mummy', 1, 5, { g: 'Egyptian' }], ['sultan', 3, 3], ['sheikh', 3, 3], ['tuna', 1, 5], ['safari', 2, 4], ['ream', 4, 5], ['arsenal', 3, 5], ['average', 2, 5],
    ['orange', 1, 5, { g: 'fruit' }],
  ],

  words_from_persian: [
    ['bazaar', 2, 3], ['caravan', 2, 4], ['pajamas', 1, 4, { al: [sp('pyjamas', 1, 4, ['UK'])] }], ['paradise', 2, 5], ['shawl', 2, 4], ['khaki', 2, 4], ['chess', 1, 5], ['peach', 1, 5, { g: 'fruit' }],
    ['spinach', 1, 5], ['turban', 2, 4], ['azure', 3, 4], ['lilac', 2, 5, { g: 'flower' }], ['magic', 1, 5], ['jasmine', 2, 4], ['pistachio', 2, 5], ['cummerbund', 4, 4],
    ['pashmina', 3, 4], ['dervish', 3, 4], ['julep', 4, 4], ['taffeta', 3, 5], ['sherbet', 3, 4], ['scimitar', 3, 4], ['checkmate', 2, 4], ['lemon', 1, 5],
    ['orange', 1, 5, { g: 'fruit' }], ['kebab', 2, 4], ['mogul', 3, 4], ['divan', 3, 4], ['caviar', 3, 5], ['purdah', 4, 4], ['tulip', 2, 5], ['candy', 1, 5],
  ],

  words_from_turkish: [
    ['yogurt', 1, 3, { al: [sp('yoghurt', 2, 3, ['UK'])] }], ['kiosk', 2, 3], ['kebab', 2, 3], ['tulip', 2, 4], ['divan', 3, 3], ['baklava', 3, 3], ['pasha', 3, 3], ['ottoman', 2, 3, { g: 'furniture' }], ['fez', 2, 3],
    ['khan', 3, 3, { g: 'ruler' }], ['kismet', 3, 3], ['bulgur', 3, 3], ['doner', 3, 3], ['shish kebab', 3, 3], ['kilim', 4, 3], ['janissary', 4, 3], ['odalisque', 4, 4], ['pastrami', 2, 4],
    ['dolma', 4, 3], ['bey', 4, 3], ['effendi', 4, 3], ['coffee', 1, 5], ['horde', 3, 4], ['caviar', 3, 5], ['bosh', 4, 4], ['yataghan', 5, 4], ['sorbet', 3, 4],
  ],

  words_from_japanese: [
    ['tsunami', 1, 2], ['karaoke', 1, 2], ['emoji', 1, 2], ['tycoon', 2, 3], ['sushi', 1, 1], ['karate', 1, 1], ['judo', 1, 1], ['origami', 1, 1], ['haiku', 2, 2], ['bonsai', 2, 2],
    ['kimono', 1, 1], ['samurai', 1, 1], ['ninja', 1, 1], ['sudoku', 1, 2], ['anime', 1, 1], ['manga', 1, 1], ['sake', 2, 2], ['ramen', 1, 1], ['futon', 2, 2],
    ['zen', 2, 2], ['honcho', 3, 4], ['skosh', 4, 5], ['tempura', 2, 2], ['wasabi', 2, 2], ['sayonara', 2, 2], ['kamikaze', 2, 3], ['geisha', 2, 2], ['sumo', 1, 1], ['shogun', 2, 2],
    ['teriyaki', 2, 2], ['edamame', 2, 2], ['umami', 2, 3], ['bento', 2, 2], ['koi', 2, 3], ['katana', 2, 2], ['ikebana', 3, 3], ['shiatsu', 3, 3], ['reiki', 3, 3], ['kawaii', 3, 3],
    ['otaku', 3, 3], ['sensei', 3, 2], ['dojo', 3, 2], ['hibachi', 3, 3], ['rickshaw', 2, 4], ['kudzu', 3, 4], ['tsundoku', 5, 4],
  ],

  words_from_chinese: [
    ['ketchup', 1, 4], ['typhoon', 2, 4], ['wok', 1, 2], ['kowtow', 3, 3, { pos: 'verb' }], ['gung ho', 3, 3, { pos: 'adjective' }], ['tea', 1, 4], ['kung fu', 1, 2], ['tofu', 1, 3], ['chop suey', 2, 2], ['dim sum', 2, 2],
    ['lychee', 2, 3, { al: [sp('litchi', 3, 3)] }], ['ginseng', 2, 3], ['silk', 1, 4], ['yin', 2, 3], ['yang', 2, 3], ['tai chi', 2, 2], ['feng shui', 2, 3], ['chow mein', 2, 2], ['wonton', 3, 2],
    ['mahjong', 2, 3], ['cheongsam', 4, 3], ['oolong', 3, 3], ['lo mein', 3, 3], ['sampan', 3, 3], ['bok choy', 3, 3], ['hoisin', 3, 3], ['kaolin', 4, 4], ['ginkgo', 3, 4],
    ['loquat', 4, 4], ['kumquat', 3, 3], ['mandarin', 2, 4, { g: 'fruit' }], ['yuan', 3, 3], ['kung pao', 3, 3], ['pekoe', 4, 4], ['shih tzu', 3, 3], ['pekingese', 3, 4], ['chow', 2, 3, { g: 'dog' }],
  ],

  words_from_afrikaans: [
    ['aardvark', 2, 2], ['trek', 2, 3, { pos: 'verb' }], ['meerkat', 2, 2], ['wildebeest', 2, 2], ['apartheid', 2, 2, { sens: true }], ['commando', 2, 4], ['spoor', 3, 3], ['veld', 3, 3], ['kraal', 3, 3],
    ['laager', 4, 3], ['biltong', 3, 2], ['boomslang', 4, 3], ['springbok', 3, 2], ['eland', 3, 3], ['rooibos', 3, 2], ['braai', 3, 2], ['kloof', 4, 3], ['koppie', 4, 4], ['lekker', 3, 2, { pos: 'adjective' }],
    ['stoep', 4, 3], ['bakkie', 4, 3], ['rusk', 2, 5], ['hartebeest', 4, 3], ['outspan', 5, 4], ['sjambok', 4, 4], ['vlei', 5, 4], ['dorp', 4, 4], ['boerewors', 4, 3], ['veldt', 3, 3],
    ['gemsbok', 4, 4], ['rand', 3, 4, { g: 'currency' }], ['commandeer', 3, 5, { pos: 'verb' }],
  ],

  words_from_native_american_languages: [
    ['raccoon', 1, 3], ['moose', 1, 3], ['kayak', 1, 3], ['toboggan', 2, 3], ['skunk', 1, 3], ['chipmunk', 1, 3], ['opossum', 2, 3], ['squash', 1, 4, { g: 'vegetable' }], ['hickory', 2, 4],
    ['pecan', 2, 4], ['moccasin', 2, 3], ['tomahawk', 2, 3], ['wigwam', 2, 3], ['teepee', 3, 3, { al: [sp('tipi', 3, 3), sp('tepee', 3, 3)] }], ['powwow', 2, 3], ['caucus', 3, 4], ['igloo', 1, 3],
    ['caribou', 2, 3], ['muskrat', 2, 3], ['pemmican', 4, 4], ['woodchuck', 2, 3], ['terrapin', 3, 4], ['bayou', 3, 3], ['hominy', 3, 4], ['succotash', 3, 4], ['persimmon', 3, 4],
    ['totem', 2, 3], ['sachem', 4, 4], ['mugwump', 4, 4], ['anorak', 3, 4], ['parka', 2, 4], ['hammock', 2, 4], ['barbecue', 1, 5], ['canoe', 1, 4], ['maize', 3, 4], ['tobacco', 2, 5],
  ],

  words_from_nahuatl: [
    ['chocolate', 1, 2], ['tomato', 1, 3], ['avocado', 1, 3], ['coyote', 1, 3], ['chili', 1, 3, { g: 'pepper' }], ['guacamole', 1, 3], ['chia', 2, 3], ['tamale', 2, 3], ['mesquite', 3, 3], ['ocelot', 3, 3],
    ['axolotl', 3, 3], ['peyote', 3, 3, { adult: true }], ['mescal', 3, 4, { adult: true, sens: true }], ['chipotle', 2, 3], ['cacao', 2, 3], ['atlatl', 5, 4], ['tomatillo', 3, 3], ['jicama', 4, 3],
    ['chicle', 4, 3], ['quetzal', 4, 3, { g: 'bird' }], ['nopal', 4, 3], ['mole', 2, 4, { g: 'sauce' }], ['pozole', 4, 3], ['copal', 5, 4], ['chayote', 4, 3], ['epazote', 5, 4], ['sapote', 5, 4], ['cocoa', 1, 4],
    ['elote', 4, 4],
  ],

  words_from_south_american_languages: [
    ['jaguar', 1, 3, { g: 'animal' }], ['piranha', 1, 3], ['llama', 1, 2], ['quinoa', 2, 3], ['condor', 2, 3], ['alpaca', 1, 2], ['puma', 2, 3], ['cashew', 1, 4], ['tapioca', 2, 3],
    ['toucan', 1, 3], ['tapir', 3, 3], ['capybara', 2, 3], ['cougar', 2, 3], ['jerky', 2, 4], ['guano', 3, 4], ['pampas', 3, 3], ['poncho', 2, 4], ['vicuna', 3, 3, { al: [sp('vicuña', 3, 3)] }], ['guanaco', 4, 3],
    ['cayenne', 2, 4], ['petunia', 2, 4], ['acai', 2, 3], ['coati', 4, 3], ['quinine', 3, 4], ['quipu', 5, 4], ['ayahuasca', 4, 3, { adult: true }], ['agouti', 5, 4], ['manioc', 4, 4], ['curare', 4, 4],
    ['tamarin', 4, 4], ['maraca', 3, 4], ['macaw', 2, 3], ['chinchilla', 2, 3], ['cassava', 3, 4], ['guava', 2, 4], ['gaucho', 3, 4], ['jacaranda', 3, 4],
  ],

  words_from_mythology: [
    ['panic', 2, 4], ['echo', 1, 3], ['atlas', 2, 3], ['cereal', 1, 4], ['nemesis', 2, 3], ['narcissist', 2, 3], ['herculean', 3, 3, { pos: 'adjective' }], ['odyssey', 2, 3], ['mentor', 2, 4],
    ['volcano', 1, 4], ['music', 1, 5], ['museum', 1, 5], ['jovial', 3, 4, { pos: 'adjective' }], ['martial', 3, 4, { pos: 'adjective' }], ['mercurial', 3, 4, { pos: 'adjective' }],
    ['saturnine', 4, 4, { pos: 'adjective' }], ['siren', 2, 3, { g: 'myth' }], ['chaos', 2, 4], ['hypnosis', 2, 4], ['morphine', 2, 4, { adult: true }], ['nectar', 2, 4], ['ambrosia', 3, 3],
    ['labyrinth', 2, 3], ['tantalize', 3, 4, { pos: 'verb' }], ['phobia', 2, 5], ['aphrodisiac', 3, 3, { adult: true }], ['halcyon', 4, 4, { pos: 'adjective' }], ['hygiene', 2, 5],
    ['chimera', 3, 3], ['protean', 4, 4, { pos: 'adjective' }], ['cornucopia', 3, 3], ['gorgon', 3, 2], ['aegis', 4, 3], ['mnemonic', 3, 4], ['panacea', 3, 4], ['titanic', 2, 3, { pos: 'adjective' }],
    ['plutocrat', 4, 4], ['lethargy', 3, 5], ['python', 1, 4, { g: 'snake' }], ['hermetic', 4, 4, { pos: 'adjective' }], ['stentorian', 5, 4, { pos: 'adjective' }], ['procrustean', 5, 4, { pos: 'adjective' }],
    ['achilles heel', 2, 2], ['trojan horse', 2, 2],
  ],

  words_named_after_people: [
    ['sandwich', 1, 3], ['cardigan', 2, 3], ['boycott', 2, 3, { pos: 'verb' }], ['leotard', 2, 3], ['saxophone', 1, 3], ['diesel', 2, 3, { g: 'engine' }], ['braille', 2, 2], ['guillotine', 2, 2],
    ['silhouette', 2, 3], ['sideburns', 2, 4], ['bloomers', 3, 3], ['mesmerize', 3, 3, { pos: 'verb' }], ['maverick', 2, 3], ['nicotine', 2, 4, { adult: true }], ['pasteurize', 3, 3, { pos: 'verb' }],
    ['shrapnel', 3, 3], ['dunce', 2, 4], ['mackintosh', 2, 3], ['wellington', 2, 3, { g: 'boot' }], ['zeppelin', 2, 3], ['volt', 2, 3], ['watt', 2, 3], ['ampere', 3, 3], ['pavlova', 3, 3],
    ['bowler', 2, 4, { g: 'hat' }], ['jacuzzi', 2, 3, { tm: true }], ['nachos', 2, 3], ['caesar salad', 2, 4], ['begonia', 3, 3], ['fuchsia', 3, 4], ['dahlia', 3, 3], ['magnolia', 3, 3],
    ['poinsettia', 3, 3], ['wisteria', 3, 3], ['gardenia', 3, 3], ['camellia', 3, 3], ['zinnia', 3, 3], ['praline', 3, 4], ['bechamel', 4, 4], ['stetson', 3, 3, { tm: true }],
    ['derrick', 4, 4], ['sadism', 3, 3, { adult: true }], ['masochism', 3, 3, { adult: true }], ['chauvinism', 4, 3], ['gerrymander', 4, 3, { pos: 'verb' }], ['lynch', 3, 3, { pos: 'verb', sens: true }],
    ['bobby', 3, 4, { g: 'police officer' }], ['biro', 2, 3, { tm: true }], ['bunsen burner', 3, 3], ['salmonella', 2, 3], ['galvanize', 4, 3, { pos: 'verb' }], ['chesterfield', 3, 4],
    ['bakelite', 4, 4], ['doily', 4, 3], ['mausoleum', 3, 3], ['quisling', 4, 3],
  ],

  words_named_after_places: [
    ['jeans', 1, 3], ['denim', 2, 3], ['hamburger', 1, 3], ['marathon', 1, 2, { g: 'race' }], ['bikini', 1, 3], ['champagne', 2, 2], ['cheddar', 2, 3], ['bourbon', 2, 3], ['cologne', 2, 3],
    ['frankfurter', 2, 3], ['bologna', 2, 3], ['cashmere', 2, 3], ['tuxedo', 2, 3], ['jersey', 1, 3, { g: 'sweater' }], ['limousine', 2, 4], ['sardine', 2, 4], ['currant', 3, 4], ['damask', 3, 3],
    ['spaniel', 2, 4], ['labrador', 2, 3], ['dalmatian', 2, 3], ['chihuahua', 2, 3], ['tangerine', 2, 4], ['mayonnaise', 2, 4], ['camembert', 3, 3], ['parmesan', 2, 3],
    ['roquefort', 3, 3], ['jodhpurs', 3, 3], ['balaclava', 3, 3], ['cantaloupe', 3, 4], ['rugby', 2, 3], ['laconic', 3, 3], ['spartan', 2, 3], ['madras', 3, 3],
    ['calico', 3, 3], ['muslin', 3, 3], ['canary', 2, 4], ['bayonet', 3, 4], ['suede', 2, 3], ['tabasco', 2, 3, { g: 'hot sauce', type: 'org', tm: true }], ['worcestershire', 3, 3], ['meander', 3, 4], ['bedlam', 3, 4],
    ['duffel', 3, 4], ['cravat', 4, 4], ['philistine', 3, 4], ['hackney', 4, 4], ['canter', 4, 4, { pos: 'verb' }],
  ],

  brand_names_used_as_words: [
    ['aspirin', 1, 3], ['escalator', 2, 3], ['zipper', 1, 3], ['trampoline', 1, 3], ['frisbee', 1, 2], ['kleenex', 1, 2], ['band-aid', 1, 2], ['velcro', 1, 2], ['jacuzzi', 2, 2],
    ['hoover', 1, 2, { g: 'vacuum cleaner' }], ['xerox', 2, 2, { pos: 'verb' }], ['google', 1, 3, { pos: 'verb' }], ['thermos', 2, 2], ['sellotape', 3, 2, { reg: ['UK'] }], ['biro', 2, 3, { reg: ['UK'] }],
    ['tarmac', 2, 3], ['jet ski', 2, 3], ['popsicle', 2, 3, { reg: ['US'] }], ['taser', 2, 3], ['jeep', 1, 3], ['post-it', 1, 2], ['rollerblade', 3, 3], ['dumpster', 2, 3, { reg: ['US'] }],
    ['onesie', 2, 3], ['linoleum', 2, 3], ['cellophane', 2, 3], ['yo-yo', 1, 3], ['laundromat', 2, 3, { reg: ['US'] }], ['bubble wrap', 1, 3], ['styrofoam', 2, 3], ['tupperware', 2, 2],
    ['q-tip', 2, 3, { reg: ['US'] }], ['crock-pot', 2, 3, { g: 'slow cooker' }], ['plexiglas', 3, 4], ['photoshop', 2, 3, { pos: 'verb' }], ['lego', 1, 2], ['tannoy', 3, 3, { reg: ['UK'] }], ['portakabin', 4, 4, { reg: ['UK'] }],
    ['jiffy bag', 3, 4, { reg: ['UK'] }], ['rawlplug', 5, 5, { reg: ['UK'] }], ['hula hoop', 1, 2], ['dry ice', 2, 4], ['ouija', 2, 3, { sens: true }], ['granola', 2, 4], ['dictaphone', 3, 3], ['teflon', 2, 3],
    ['bakelite', 4, 4], ['formica', 3, 3], ['walkman', 2, 2], ['jell-o', 1, 3, { reg: ['US'] }], ['vaseline', 1, 2],
    ['chapstick', 2, 2, { reg: ['US'] }], ['scotch tape', 2, 3, { reg: ['US'] }], ['sharpie', 2, 3], ['uber', 1, 3, { pos: 'verb' }], ['tipp-ex', 3, 3, { reg: ['UK'] }], ['stanley knife', 3, 3, { g: 'utility knife' }], ['zamboni', 3, 3],
    ['astroturf', 3, 3], ['breathalyzer', 3, 3], ['muzak', 3, 4],
  ],

  portmanteau_words: [
    ['brunch', 1, 1], ['smog', 1, 2], ['motel', 1, 2], ['spork', 2, 1], ['chortle', 3, 3], ['infomercial', 2, 2], ['brexit', 2, 3], ['podcast', 1, 2], ['emoticon', 2, 2],
    ['sitcom', 1, 2], ['workaholic', 2, 2], ['bromance', 2, 2], ['frenemy', 2, 1], ['hangry', 3, 1], ['staycation', 2, 1], ['glamping', 2, 2], ['chillax', 3, 2, { pos: 'verb' }],
    ['guesstimate', 3, 2], ['webinar', 2, 2], ['blog', 1, 3], ['vlog', 2, 3], ['camcorder', 2, 3], ['cyborg', 2, 3], ['spanglish', 3, 2], ['chunnel', 3, 2], ['mockumentary', 3, 2],
    ['edutainment', 3, 2], ['netizen', 3, 2], ['moped', 2, 4], ['telethon', 3, 3], ['fanzine', 3, 3], ['affluenza', 3, 2], ['humongous', 2, 3, { pos: 'adjective' }], ['labradoodle', 3, 1],
    ['cockapoo', 3, 2], ['liger', 3, 2], ['zonkey', 3, 2], ['modem', 2, 4], ['biopic', 3, 2], ['docudrama', 3, 2], ['malware', 3, 3], ['jeggings', 3, 1],
    ['skort', 3, 2], ['cosplay', 2, 2], ['dramedy', 3, 2], ['romcom', 2, 3], ['mansplain', 3, 2, { pos: 'verb' }], ['ginormous', 2, 2, { pos: 'adjective' }],
    ['carjack', 3, 3, { pos: 'verb' }], ['avionics', 4, 3], ['sexting', 3, 2, { adult: true }], ['tigon', 4, 3], ['paratrooper', 3, 4], ['electrocute', 3, 3, { pos: 'verb' }], ['stagflation', 4, 3],
    ['simulcast', 4, 3], ['snowmageddon', 3, 2], ['splurge', 3, 4, { pos: 'verb' }], ['skyjack', 4, 3, { pos: 'verb' }],
  ],

  girls_names: [
    n('Emma', 1, 1), n('Olivia', 1, 1), n('Sophia', 1, 1, { al: [sp('Sofia', 1, 1)] }), n('Isabella', 1, 1), n('Charlotte', 1, 1), n('Amelia', 1, 1), n('Mia', 1, 1), n('Harper', 1, 2),
    n('Evelyn', 1, 2), n('Abigail', 1, 1), n('Emily', 1, 1), n('Ella', 1, 1), n('Elizabeth', 1, 1), n('Chloe', 1, 1), n('Victoria', 1, 1), n('Lily', 1, 2), n('Hannah', 1, 1),
    n('Zoe', 1, 2), n('Natalie', 1, 1), n('Madison', 1, 2), n('Layla', 2, 2), n('Penelope', 2, 2), n('Nora', 2, 2), n('Stella', 2, 2), n('Hazel', 2, 3), n('Ruby', 1, 2),
    n('Daisy', 1, 2), n('Poppy', 1, 3), n('Imogen', 3, 3), n('Beatrice', 2, 3), n('Agnes', 3, 3), n('Bridget', 2, 3), n('Philippa', 3, 3), n('Saoirse', 3, 4), n('Xanthe', 4, 4),
    n('Ottoline', 5, 5), n('Persephone', 3, 4), n('Ingrid', 3, 3), n('Sigrid', 4, 4), n('Gwendolyn', 3, 4), n('Rosalind', 3, 4), n('Tabitha', 3, 3), n('Cordelia', 3, 4),
  ],

  boys_names: [
    n('Liam', 1, 1), n('Noah', 1, 1), n('Oliver', 1, 1), n('James', 1, 1), n('Elijah', 2, 2), n('William', 1, 1), n('Henry', 1, 1), n('Lucas', 1, 2), n('Benjamin', 1, 1),
    n('Theodore', 2, 2), n('Jack', 1, 1), n('Samuel', 1, 1), n('Daniel', 1, 1), n('Matthew', 1, 1), n('Joseph', 1, 1), n('David', 1, 1), n('Michael', 1, 1), n('Thomas', 1, 1),
    n('Charles', 1, 1), n('Harry', 1, 1), n('George', 1, 1), n('Arthur', 1, 2), n('Oscar', 2, 2), n('Leo', 1, 2), n('Freddie', 2, 2), n('Archie', 2, 2), n('Alfie', 2, 2),
    n('Hugo', 2, 3), n('Rupert', 3, 3), n('Barnaby', 3, 4), n('Cormac', 4, 4), n('Ambrose', 3, 4), n('Percival', 3, 4), n('Casper', 3, 3), n('Fergus', 3, 4), n('Gideon', 3, 3),
    n('Lachlan', 4, 4, { reg: ['AU'] }), n('Magnus', 3, 4), n('Torsten', 5, 5), n('Dominic', 2, 3), n('Ignatius', 4, 4),
  ],

  unisex_names: [
    n('Alex', 1, 2), n('Jordan', 1, 2), n('Taylor', 1, 2), n('Casey', 2, 2), n('Riley', 2, 2), n('Morgan', 2, 2), n('Avery', 2, 3), n('Jamie', 2, 2), n('Charlie', 1, 2),
    n('Sam', 1, 2), n('Robin', 2, 3), n('Sydney', 2, 3), n('Quinn', 2, 3), n('Skyler', 3, 3), n('Cameron', 2, 3), n('Kelly', 2, 3), n('Jesse', 2, 3), n('Dana', 2, 3),
    n('Pat', 2, 3), n('Lee', 2, 3), n('Drew', 2, 3), n('Kim', 2, 3), n('Sasha', 3, 3), n('Frankie', 2, 3), n('Max', 1, 3), n('Ashley', 2, 3), n('Leslie', 3, 3),
    n('Shannon', 3, 3), n('Terry', 3, 3), n('Tracy', 3, 3), n('Reese', 3, 4), n('Rowan', 3, 4), n('Sage', 3, 4), n('Blake', 3, 3), n('Bailey', 3, 3), n('Peyton', 3, 4),
    n('Hayden', 3, 4), n('Devon', 3, 4), n('Ari', 4, 4), n('Billie', 3, 3), n('Remy', 4, 4), n('Kai', 4, 4), n('Eden', 3, 4),
  ],

  biblical_names: [
    n('Noah', 1, 1), n('Moses', 1, 1), n('Ruth', 2, 2), n('Esther', 2, 2), n('Isaac', 2, 1), n('Adam', 1, 1), n('Eve', 1, 1), n('Abraham', 1, 1), n('Sarah', 1, 2), n('Rebecca', 2, 2),
    n('Jacob', 1, 1), n('Joseph', 1, 1), n('Mary', 1, 1), n('Martha', 2, 2), n('Peter', 1, 1), n('Paul', 1, 1), n('John', 1, 1), n('Matthew', 1, 1), n('Luke', 1, 1),
    n('Mark', 1, 1), n('Daniel', 1, 2), n('David', 1, 1), n('Solomon', 2, 1), n('Samson', 2, 1), n('Delilah', 2, 2), n('Gabriel', 2, 2), n('Michael', 1, 2), n('Rachel', 2, 2),
    n('Leah', 2, 2), n('Naomi', 3, 2), n('Miriam', 3, 2), n('Aaron', 2, 2), n('Elijah', 2, 2), n('Jonah', 2, 2), n('Job', 2, 3), n('Lazarus', 3, 2), n('Thomas', 1, 2),
    n('Timothy', 2, 3), n('Bathsheba', 3, 3), n('Salome', 4, 3), n('Jezebel', 3, 3), n('Gideon', 3, 2), n('Ezekiel', 3, 3), n('Josiah', 3, 4), n('Hosea', 4, 4), n('Obadiah', 4, 4),
    n('Methuselah', 3, 2), n('Nebuchadnezzar', 4, 3), n('Zacchaeus', 5, 4),
  ],

  old_fashioned_names: [
    n('Mildred', 2, 2), n('Gertrude', 2, 2), n('Ethel', 2, 2), n('Herbert', 2, 2), n('Wilbur', 2, 2), n('Edna', 2, 2), n('Hilda', 2, 3), n('Doris', 2, 2), n('Bertha', 2, 2),
    n('Myrtle', 3, 3), n('Agnes', 3, 3), n('Florence', 2, 3), n('Gladys', 2, 2), n('Beulah', 4, 4), n('Edith', 2, 3), n('Mabel', 2, 3), n('Maude', 3, 3), n('Norma', 3, 3),
    n('Bernice', 3, 3), n('Winifred', 3, 3), n('Eunice', 3, 3), n('Harold', 2, 2), n('Clarence', 2, 2), n('Cecil', 3, 3), n('Elmer', 2, 2), n('Horace', 3, 3), n('Humphrey', 3, 3),
    n('Norman', 2, 3), n('Percy', 3, 3), n('Reginald', 3, 3), n('Stanley', 2, 3), n('Walter', 2, 3), n('Alfred', 2, 3), n('Cuthbert', 4, 3), n('Ernest', 3, 3), n('Chester', 3, 3),
    n('Rufus', 3, 4), n('Lester', 3, 3), n('Roscoe', 4, 4), n('Hubert', 3, 3), n('Mortimer', 3, 3), n('Clyde', 3, 3), n('Wilfred', 4, 3), n('Lionel', 3, 4), n('Mavis', 3, 3),
  ],

  short_forms_of_names: [
    n('Bob', 1, 1), n('Bill', 1, 1), n('Peggy', 2, 2), n('Liz', 1, 1), n('Ted', 1, 1), n('Jim', 1, 1), n('Tom', 1, 1), n('Dave', 1, 1), n('Mike', 1, 1), n('Sue', 1, 1),
    n('Kate', 1, 1), n('Meg', 2, 2), n('Beth', 2, 2), n('Sally', 2, 2), n('Polly', 2, 3), n('Molly', 2, 2), n('Nell', 3, 3), n('Maggie', 2, 2), n('Betty', 2, 2), n('Bess', 3, 3),
    n('Fred', 1, 1), n('Hank', 3, 3), n('Hal', 3, 3), n('Ned', 3, 3), n('Nick', 1, 1), n('Rob', 1, 1), n('Rick', 2, 2), n('Tony', 1, 1), n('Andy', 1, 1), n('Ben', 1, 1),
    n('Joe', 1, 1), n('Chuck', 2, 3), n('Bud', 3, 3), n('Jen', 2, 2), n('Becky', 2, 2), n('Abby', 2, 2), n('Lottie', 3, 3), n('Tess', 3, 3), n('Dot', 3, 3), n('Trixie', 3, 4),
    n('Peg', 3, 3), n('Will', 1, 2), n('Pete', 1, 2), n('Josh', 1, 1), n('Matt', 1, 1), n('Tim', 1, 1), n('Hattie', 3, 4), n('Sadie', 3, 4),
  ],

  names_that_are_flowers: [
    n('Rose', 1, 1), n('Lily', 1, 1), n('Daisy', 1, 1), n('Violet', 1, 1), n('Poppy', 1, 2), n('Iris', 2, 2), n('Jasmine', 1, 2), n('Heather', 2, 2), n('Holly', 2, 3),
    n('Marigold', 2, 2), n('Lavender', 2, 3), n('Primrose', 3, 2), n('Magnolia', 2, 3), n('Dahlia', 3, 2), n('Petunia', 3, 2), n('Hyacinth', 3, 3), n('Camellia', 3, 3), n('Azalea', 3, 3),
    n('Bluebell', 3, 2), n('Ivy', 2, 3), n('Blossom', 2, 2), n('Flora', 3, 3), n('Fleur', 3, 3), n('Peony', 3, 3), n('Zinnia', 4, 3), n('Pansy', 3, 3), n('Posy', 3, 3),
    n('Clover', 3, 4), n('Anemone', 4, 3), n('Amaryllis', 4, 3), n('Gardenia', 3, 3), n('Freesia', 4, 3), n('Briar', 4, 4), n('Lotus', 3, 4), n('Orchid', 3, 3), n('Buttercup', 3, 3),
    n('Wisteria', 3, 3), n('Tulip', 3, 4),
  ],

  names_that_are_gems: [
    n('Ruby', 1, 1), n('Pearl', 1, 1), n('Amber', 1, 2), n('Jade', 1, 1), n('Opal', 2, 2), n('Beryl', 3, 3), n('Garnet', 3, 2), n('Crystal', 1, 2), n('Diamond', 1, 3),
    n('Sapphire', 2, 2), n('Jasper', 2, 3), n('Coral', 2, 3), n('Topaz', 3, 2), n('Emerald', 2, 2), n('Amethyst', 3, 3), n('Onyx', 3, 3), n('Jewel', 2, 2), n('Gemma', 2, 3),
    n('Citrine', 4, 3), n('Esmeralda', 3, 4), n('Peridot', 4, 3), n('Zircon', 4, 4), n('Agate', 4, 4),
  ],

  names_that_are_months: [
    n('April', 1, 1), n('May', 1, 1), n('June', 1, 1), n('August', 2, 2), n('July', 3, 2), n('Augusta', 3, 3), n('Avril', 4, 4), n('Mai', 4, 4),
  ],

  names_that_are_places: [
    n('Paris', 1, 1), n('London', 2, 2), n('Sydney', 2, 2), n('Brooklyn', 1, 2), n('Chelsea', 1, 2), n('Georgia', 1, 2), n('Florence', 2, 2), n('Savannah', 2, 3), n('India', 1, 2),
    n('Austin', 2, 2), n('Dallas', 2, 3), n('Dakota', 2, 3), n('Kenya', 3, 3), n('Asia', 3, 3), n('Camden', 3, 3), n('Orlando', 2, 3), n('Jordan', 1, 3), n('Phoenix', 2, 3),
    n('Israel', 3, 3), n('Lincoln', 2, 3), n('Denver', 3, 3), n('Devon', 3, 3), n('Sierra', 2, 3), n('Adelaide', 2, 3), n('Venice', 3, 3), n('Siena', 3, 4), n('Vienna', 2, 3),
    n('Carolina', 2, 3), n('Virginia', 1, 2), n('Cheyenne', 3, 3), n('Montana', 2, 3), n('Kent', 2, 3), n('Holland', 3, 3), n('Brittany', 2, 3), n('Kimberley', 3, 4),
    n('Aurora', 3, 4), n('Lourdes', 4, 4), n('Alexandria', 2, 3), n('Cairo', 3, 4), n('Regina', 3, 4), n('Troy', 2, 3), n('Preston', 3, 4),
  ],

  names_that_are_virtues: [
    n('Hope', 1, 1), n('Faith', 1, 1), n('Grace', 1, 1), n('Patience', 2, 1), n('Prudence', 3, 1), n('Charity', 2, 2), n('Honor', 2, 3), n('Joy', 1, 2), n('Verity', 4, 3),
    n('Constance', 3, 2), n('Mercy', 2, 2), n('Temperance', 3, 2), n('Felicity', 3, 3), n('Clemency', 4, 4), n('Justice', 2, 3), n('Liberty', 2, 3), n('Harmony', 2, 3),
    n('Serenity', 2, 3), n('Unity', 3, 4), n('Amity', 4, 4), n('Chastity', 3, 3), n('Modesty', 3, 3), n('Trinity', 2, 5), n('Valor', 3, 4), n('Fidelity', 3, 4), n('Sincerity', 3, 4),
    n('Humility', 3, 3), n('Honesty', 2, 3),
  ],

  names_that_are_colors: [
    n('Scarlett', 1, 2), n('Violet', 1, 2), n('Hazel', 2, 2), n('Sienna', 2, 2, { al: [sp('Siena', 3, 4)] }), n('Indigo', 2, 2), n('Rose', 1, 3), n('Ivory', 2, 3), n('Jade', 1, 3), n('Coral', 2, 3),
    n('Olive', 2, 3), n('Lilac', 2, 3), n('Ebony', 2, 2), n('Crimson', 2, 3), n('Saffron', 3, 3), n('Sable', 4, 4), n('Auburn', 3, 3), n('Sky', 1, 4), n('Teal', 3, 3),
    n('Fawn', 3, 4), n('Ginger', 2, 4), n('Blanche', 3, 4), n('Rufus', 3, 4), n('Cerise', 4, 3), n('Azure', 3, 3), n('Russet', 4, 4), n('Rusty', 2, 3), n('Sandy', 2, 3),
    n('Ruby', 1, 3), n('Amber', 1, 3), n('Pearl', 1, 4), n('Lavender', 2, 3), n('Magenta', 3, 3), n('Carmine', 4, 4), n('Cyan', 3, 4), n('Raven', 3, 4),
    n('Cherry', 2, 4), n('Fuchsia', 3, 3), n('Tawny', 3, 4), n('Sepia', 4, 4),
  ],

  names_that_are_trees: [
    n('Ash', 2, 2), n('Willow', 1, 2), n('Rowan', 2, 3), n('Aspen', 2, 2), n('Juniper', 2, 2), n('Hazel', 2, 2), n('Holly', 2, 3), n('Laurel', 2, 3), n('Linden', 3, 3),
    n('Alder', 3, 3), n('Elm', 3, 3), n('Maple', 2, 3), n('Cedar', 2, 3), n('Birch', 3, 3), n('Olive', 2, 3), n('Hawthorn', 4, 3), n('Sequoia', 3, 3), n('Acacia', 3, 3),
    n('Rosewood', 4, 4), n('Hickory', 4, 4), n('Sycamore', 4, 3), n('Cypress', 3, 4), n('Pine', 3, 4), n('Elder', 3, 4), n('Cherry', 2, 4), n('Magnolia', 2, 4), n('Poplar', 4, 4),
    n('Hemlock', 4, 4), n('Larch', 4, 4), n('Teak', 4, 4), n('Cassia', 4, 4), n('Dogwood', 4, 4), n('Mulberry', 4, 4),
  ],
};

export const FIXES = [
  { split: ['mandarin', 'languages', 'language'] },
  { gloss: ['mandarin', 'citrus_fruits', 'fruit'] },
  { gloss: ['rand', 'currencies', 'currency'] },
  { gloss: ['ottoman', 'furniture', 'furniture'] },
];
