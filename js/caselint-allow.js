// Links where the capital (or lowercase) is intended for the sense the word has in that theme, so the case lint does not flag them.
// Key: entryId|themeId. Add a line only after checking the word is right as shown. Lines are added and removed by hand or by a library batch script (tools/gen/batchNNN.mjs).
export const CASE_OK = new Set([
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
  '32575|military_ranks', // Major in military ranks
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
  '29843|tiny_things', // Dot in tiny things
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
  '29776|old_fashioned_names', // myrtle in old-fashioned names
  '7109|stars', // sun in stars: shown Sun, the name of the star among Sirius and Vega (the entry is the everyday word)
  '15383|brand_names_used_as_words', // plaster in brand names used as words: shown Band-Aid, the brand the theme is about
  '23024|wild_west_town', // Deadwood (the town) in Wild West town, beside the common word deadwood
  '7691|colors_named_after_places', // burgundy the colour in colors named after places, beside Burgundy the wine and the region
  '19663|red_wines', // Bordeaux the wine in red wines: capital kept (Simon's precedent; M-W, Random House, Collins, Oxford Learner's all capitalise it), beside bordeaux the colour (v385)
  '19663|wines', // Bordeaux the wine in wines: capital kept as in red wines (v388 lowercased rioja, beaujolais, chianti, marsala there), beside bordeaux the colour
  '19674|wines', // Madeira the wine in wines: capital kept (v385: M-W, Collins, Oxford Learner's capitalise it), beside madeira the cake (v388 made wines mostly common)
  '1664|names_that_are_flowers', // magnolia shown "Magnolia" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1694|names_that_are_flowers', // tulip shown "Tulip" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1698|names_that_are_flowers', // orchid shown "Orchid" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1706|names_that_are_flowers', // marigold shown "Marigold" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1707|names_that_are_flowers', // pansy shown "Pansy" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1708|names_that_are_flowers', // petunia shown "Petunia" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1713|names_that_are_flowers', // hyacinth shown "Hyacinth" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1715|names_that_are_flowers', // jasmine shown "Jasmine" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1722|names_that_are_flowers', // bluebell shown "Bluebell" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1730|names_that_are_flowers', // dahlia shown "Dahlia" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1733|names_that_are_flowers', // zinnia shown "Zinnia" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1736|names_that_are_flowers', // gardenia shown "Gardenia" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1737|names_that_are_flowers', // camellia shown "Camellia" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1738|names_that_are_flowers', // azalea shown "Azalea" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1751|names_that_are_flowers', // amaryllis shown "Amaryllis" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1770|names_that_are_flowers', // ivy shown "Ivy" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1776|names_that_are_flowers', // clover shown "Clover" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1794|names_that_are_flowers', // heather shown "Heather" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29549|names_that_are_flowers', // wisteria shown "Wisteria" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29857|names_that_are_flowers', // blossom shown "Blossom" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29953|names_that_are_flowers', // holly shown "Holly" in names that are flowers: capital for the name sense (W2, Simon 2026-11-16, v390)
  '2055|names_that_are_gems', // crystal shown "Crystal" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '21206|names_that_are_gems', // jewel shown "Jewel" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '28347|names_that_are_gems', // opal shown "Opal" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29866|names_that_are_gems', // beryl shown "Beryl" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29867|names_that_are_gems', // garnet shown "Garnet" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29868|names_that_are_gems', // jasper shown "Jasper" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29870|names_that_are_gems', // topaz shown "Topaz" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29871|names_that_are_gems', // amethyst shown "Amethyst" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31656|names_that_are_gems', // diamond shown "Diamond" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31658|names_that_are_gems', // emerald shown "Emerald" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31659|names_that_are_gems', // sapphire shown "Sapphire" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31660|names_that_are_gems', // pearl shown "Pearl" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31662|names_that_are_gems', // jade shown "Jade" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31664|names_that_are_gems', // onyx shown "Onyx" in names that are gems: capital for the name sense (W2, Simon 2026-11-16, v390)
  '27146|names_that_are_months', // avril shown "Avril" in names that are months: capital for the name sense (W2, Simon 2026-11-16, v390)
  '27160|names_that_are_months', // julio shown "Julio" in names that are months: capital for the name sense (W2, Simon 2026-11-16, v390)
  '3972|names_that_are_virtues', // joy shown "Joy" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '4000|names_that_are_virtues', // hope shown "Hope" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '4030|names_that_are_virtues', // serenity shown "Serenity" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '4184|names_that_are_virtues', // justice shown "Justice" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '4273|names_that_are_virtues', // faith shown "Faith" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '6058|names_that_are_virtues', // harmony shown "Harmony" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '21504|names_that_are_virtues', // unity shown "Unity" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '28278|names_that_are_virtues', // liberty shown "Liberty" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '28298|names_that_are_virtues', // charity shown "Charity" in names that are virtues: capital for the name sense (W2, Simon 2026-11-16, v390)
  '6|names_that_are_colors', // indigo shown "Indigo" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '64|names_that_are_colors', // azure shown "Azure" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '65|names_that_are_colors', // cyan shown "Cyan" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '92|names_that_are_colors', // cherry shown "Cherry" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '718|names_that_are_colors', // ginger shown "Ginger" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7670|names_that_are_colors', // sable shown "Sable" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7684|names_that_are_colors', // magenta shown "Magenta" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7685|names_that_are_colors', // fuchsia shown "Fuchsia" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7692|names_that_are_colors', // crimson shown "Crimson" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7712|names_that_are_colors', // sienna shown "Sienna" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7716|names_that_are_colors', // tawny shown "Tawny" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7717|names_that_are_colors', // auburn shown "Auburn" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7720|names_that_are_colors', // cerise shown "Cerise" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '7725|names_that_are_colors', // carmine shown "Carmine" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '28022|names_that_are_colors', // sky shown "Sky" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29937|names_that_are_colors', // sandy shown "Sandy" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29938|names_that_are_colors', // raven shown "Raven" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31660|names_that_are_colors', // pearl shown "Pearl" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '31662|names_that_are_colors', // jade shown "Jade" in names that are colors: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1630|names_that_are_trees', // maple shown "Maple" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1633|names_that_are_trees', // willow shown "Willow" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1634|names_that_are_trees', // birch shown "Birch" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1637|names_that_are_trees', // cedar shown "Cedar" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1645|names_that_are_trees', // sequoia shown "Sequoia" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1646|names_that_are_trees', // cypress shown "Cypress" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1648|names_that_are_trees', // aspen shown "Aspen" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1651|names_that_are_trees', // hawthorn shown "Hawthorn" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1655|names_that_are_trees', // juniper shown "Juniper" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1657|names_that_are_trees', // acacia shown "Acacia" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1664|names_that_are_trees', // magnolia shown "Magnolia" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1675|names_that_are_trees', // alder shown "Alder" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '28134|names_that_are_trees', // elder shown "Elder" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29953|names_that_are_trees', // holly shown "Holly" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '29969|names_that_are_trees', // cherry tree shown "Cherry" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '30071|names_that_are_trees', // laurel shown "Laurel" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '39535|names_that_are_trees', // pine tree shown "Pine" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '55699|names_that_are_trees', // cassia tree shown "Cassia" in names that are trees: capital for the name sense (W2, Simon 2026-11-16, v390)
  '1676|names_that_are_trees', // linden shown "Linden" in names that are trees: capital for the name sense (W2; v392, Simon 2026-11-17)
]);
