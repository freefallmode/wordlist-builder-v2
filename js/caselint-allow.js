// Links where the capital (or lowercase) is intended for the sense the word has in that theme, so the case lint does not flag them.
// Key: entryId|themeId. Add a line only after checking the word is right as shown. Lines are added and removed by hand or by a library batch script (tools/gen/batchNNN.mjs).
export const CASE_OK = new Set([
  '68257|charity_words',       // Comic Relief, the UK charity, in charity words (Simon, 2026-11-23, v440)
  '50194|fans_and_followers',  // Deadhead, the Grateful Dead fan (Merriam-Webster capitalizes it) (Simon, 2026-11-23, v440)
  '45559|word_games',          // I spy: the pronoun I is a capital in a common phrase (Simon, 2026-11-23, v442)
  '45559|road_trip_games',     // I spy: the pronoun I is a capital in a common phrase (Simon, 2026-11-23, v442)
  '633|desserts_and_sweets', // Skittles in desserts and sweets
  '20295|canned_foods', // Spam in canned foods
  '1532|horse_breeds', // mustang in horse breeds
  '9863|black_and_white_animals', // Holstein in black and white animals
  '36859|famous_lakes', // Lake Biwa in famous lakes
  '50478|public_transportation', // Greyhound in public transportation
  '50478|bus_types', // Greyhound in bus types
  '47256|flying_machines', // Harrier in flying machines
  '50479|submarine_words', // Nautilus in submarine words
  '3158|special_vehicles', // Bobcat in special vehicles
  '3158|construction_vehicles', // Bobcat in construction vehicles
  '3656|fitness', // Peloton in fitness
  '4459|military', // Pentagon in military
  '4459|camps_and_fortifications', // Pentagon in camps and fortifications
  '29382|school_subjects', // Mandarin in school subjects
  '55461|western_wear', // Wrangler in western wear
  '43450|rowing_words', // Henley in rowing words
  '61743|tournament_words', // Sweet Sixteen in tournament words
  '61743|stages_of_a_tournament', // Sweet Sixteen in stages of a tournament
  '58909|pinball_words', // Stern in pinball words
  '5726|logic_puzzles', // Mastermind in logic puzzles
  '2357|egyptian_symbols', // Sphinx in Egyptian symbols
  '2552|navigation_tools', // Crux in navigation tools
  '6939|giants_of_legend', // cyclops in giants of legend
  '7004|fantasy', // Merlin in fantasy
  '7020|fantasy', // ent in fantasy
  '7020|fantasy_races', // ent in fantasy races
  '59422|wild_west_town', // Tombstone in Wild West town
  '7109|stars', // sun in stars
  '7294|computers', // Mac in computers
  '50053|file_types', // MIDI in file types
  '50053|sound_and_video_formats', // MIDI in audio and video file formats
  '26072|phonetic_alphabet', // Alpha in phonetic alphabet
  '26074|phonetic_alphabet', // Bravo in phonetic alphabet
  '26075|phonetic_alphabet', // Charlie in phonetic alphabet
  '26076|phonetic_alphabet', // Delta in phonetic alphabet
  '26077|phonetic_alphabet', // Echo in phonetic alphabet
  '26080|phonetic_alphabet', // Kilo in phonetic alphabet
  '26083|phonetic_alphabet', // Oscar in phonetic alphabet
  '26084|phonetic_alphabet', // Papa in phonetic alphabet
  '21|things_that_spin', // Earth in things that spin
  '22|red_things', // Mars in red things
  '38122|orange_things', // Cheddar in orange things
  '7354|things_with_screens', // Kindle in things with screens
  '20962|italian_cities', // Genoa in Italian cities
  '20962|port_cities', // Genoa in port cities
  '20962|ports_in_europe', // Genoa in ports in Europe
  '2357|landmarks', // Sphinx in landmarks
  '20690|honorifics', // Sir in honorifics
  '32568|honorifics', // Dame in honorifics
  '32569|honorifics', // Professor in honorifics
  '32572|honorifics', // Lady in honorifics
  '32575|honorifics', // Major in honorifics
  '32576|honorifics', // Sergeant in honorifics
  '5728|table_games', // Ludo in table games
  '5728|board_games', // Ludo in board games
  '5728|asian_board_games', // Ludo in Asian board games
  '2357|ancient_egypt', // Sphinx in ancient Egypt
  '20962|black_death', // Genoa in Black Death
  '27376|street_names', // high street in street names
  '7109|stars', // sun in stars: shown Sun, the name of the star among Sirius and Vega (the entry is the everyday word)
  '15383|brand_names_used_as_words', // plaster in brand names used as words: shown Band-Aid, the brand the theme is about
  '23024|wild_west_town', // Deadwood (the town) in Wild West town, beside the common word deadwood
  '7691|colors_named_after_places', // burgundy the colour in colors named after places, beside Burgundy the wine and the region
  '7684|colors_named_after_places', // magenta the colour in colors named after places, beside Magenta [name] (v397)
  '7685|colors_named_after_places', // fuchsia the colour in colors named after places, beside Fuchsia [name] (v397)
  '7712|colors_named_after_places', // sienna the colour in colors named after places, beside Sienna [name] (v397)
  '19663|red_wines', // Bordeaux the wine in red wines: capital kept (Simon's precedent; M-W, Random House, Collins, Oxford Learner's all capitalise it), beside bordeaux the colour (v385)
  '19663|wines', // Bordeaux the wine in wines: capital kept as in red wines (v388 lowercased rioja, beaujolais, chianti, marsala there), beside bordeaux the colour
  '19674|wines', // Madeira the wine in wines: capital kept (v385: M-W, Collins, Oxford Learner's capitalise it), beside madeira the cake (v388 made wines mostly common)
]);
