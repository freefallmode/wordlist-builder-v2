// Depth-3 words: maps and globes, flags of the world, place names, everyday places (farm ... cafe). Format: tools/apply-words.mjs.
// Rows are written compactly as "text rec inRec" (comma separated) and expanded by M(). Extras after the ratings, separated by "|":
//   g=gloss  type=..  pos=..  reg=UK+US  sens  al=text/kind/rec/inRec/REG+REG/type
const expand = (s, base) => s.split(',').map(x => x.trim()).filter(Boolean).map(x => {
  const [main, ...ex] = x.split('|');
  const m = main.trim().match(/^(.*) (\d) (\d)$/);
  if (!m) throw Error('bad row ' + x);
  const o = { ...base };
  for (const e of ex) {
    const [k, v] = e.split('=');
    if (k === 'sens') o.sens = true;
    else if (k === 'g') o.g = v;
    else if (k === 'type') o.type = v;
    else if (k === 'pos') o.pos = v;
    else if (k === 'reg') o.reg = v.split('+');
    else if (k === 'al') {
      const [t, kind, r, i, reg, type, g] = v.split('/');
      o.al = [...(o.al || []), [t, kind, +r, +i, reg ? reg.split('+') : [], { ...(type ? { type } : {}), ...(g ? { g } : {}) }]];
    } else throw Error('bad extra ' + e);
  }
  return [m[1], +m[2], +m[3], o];
});
const M = (s, base = {}) => expand(s, base);
// places carry the meaning label the other place batches use for names that are also ordinary words
const COUNTRY_G = new Set(['Georgia', 'Jordan', 'Turkey', 'Chad', 'Niger', 'Guinea', 'Panama', 'Congo']);
const CITY_G = new Set(['Victoria', 'Portland', 'Houston', 'Darwin', 'Austin', 'Dallas', 'Denver', 'Wellington', 'Adelaide', 'Cleveland', 'Nice', 'Lima', 'Mobile', 'Orange']);
const place = (s, extra = {}) => expand(s, { type: 'place', ...extra }).map(([t, r, i, o]) => {
  if (!o.g && COUNTRY_G.has(t)) o.g = 'country';
  if (!o.g && CITY_G.has(t)) o.g = 'city';
  return [t, r, i, o];
});

export const THEMES = {
  lines_on_a_map: { d: 4 }, map_words: { d: 3 }, kinds_of_maps: { d: 2 }, compass_directions: { d: 1 }, directions: { d: 1 }, continents: { d: 1 },
  flags_with_stars: { d: 3 }, flags_with_crescents: { d: 4 }, flags_with_crosses: { d: 3 }, red_and_white_flags: { d: 3 }, tricolor_flags: { d: 3 },
  flag_words: { d: 3 }, flags_with_a_sun: { d: 4 }, flags_with_animals: { d: 5 },
  nationalities: { d: 2 }, city_demonyms: { d: 4 }, old_country_names: { d: 3 }, old_city_names: { d: 4 }, places_named_after_people: { d: 4 },
  foods_named_after_places: { d: 4 }, places_that_are_also_words: { d: 3 }, countries_ending_in_ia: { d: 2 }, places_after_new: { d: 3 }, places_ending_in_land: { d: 2 },
  farm: { d: 1 }, restaurant: { d: 1 }, supermarket: { d: 1 }, post_office: { d: 2 }, library: { d: 1 }, cafe: { d: 1 },
};

export const DATA = {
  // ---------------------------------------------------------------- maps and globes
  lines_on_a_map: M(`equator 1 1, prime meridian 2 1, Tropic of Cancer 2 1, Tropic of Capricorn 2 1, Arctic Circle 2 1, Antarctic Circle 2 1,
    date line 3 1|al=dateline/spelling/3/2, latitude 2 1, longitude 2 1, meridian 3 2, parallel 2 2|g=latitude, contour line 3 2,
    isobar 3 3|g=weather map, isotherm 4 4, isohyet 5 5, isobath 5 5, graticule 5 5, border 1 3|g=boundary, Mason-Dixon Line 3 3, 49th parallel 4 3, 38th parallel 3 3,
    Durand Line 5 4, Radcliffe Line 5 4, Green Line 4 3, rhumb line 5 4, great circle 4 3, dotted line 1 3, coastline 1 3|g=shore, Line of Control 4 4,
    isopleth 5 5, Greenwich meridian 3 2`),
  map_words: M(`legend 2 2|g=map, key 1 3|g=map, scale 2 2|g=map, compass rose 2 2, north arrow 3 3, grid reference 3 3, grid 2 3, contour 3 2|g=map line, elevation 3 3|g=height, map symbol 3 3,
    inset 4 3, projection 3 2|g=map, cartography 3 2, cartographer 2 2, orientation 3 3, coordinates 2 2, topography 3 3, bearing 3 3|g=direction, relief 3 3|g=map, landmark 2 3,
    waypoint 3 3, scale bar 3 3, Mercator projection 3 3, neatline 5 5, hachure 5 5, toponym 5 5, gazetteer 5 4, datum 5 4|g=map reference, cartouche 5 5`),
  kinds_of_maps: M(`road map 1 1, atlas 2 1, globe 1 1|g=world model, chart 2 3|g=sea chart, street plan 3 2, relief map 3 2, world map 1 1, treasure map 1 2, topographic map 3 2, political map 2 2, physical map 3 3,
    weather map 1 3, nautical chart 3 2, tourist map 2 2, trail map 2 3, subway map 2 3, site map 3 4, star chart 2 3, city map 1 1, Ordnance Survey map 3 3|reg=UK, bus map 2 3,
    thematic map 4 4, cadastral map 5 5, geological map 4 4, bathymetric chart 5 5, mappa mundi 5 4, orienteering map 5 5, Google Maps 1 3, wall map 2 3,
    choropleth 5 5, pirate map 1 3, tube map 2 3|reg=UK`),
  compass_directions: M(`north 1 1, south 1 1, east 1 1, west 1 1, northeast 1 2|al=north-east/spelling/2/2/UK|al=north east/spelling/2/3, southeast 1 2|al=south-east/spelling/2/2/UK,
    southwest 1 2|al=south-west/spelling/2/2/UK, northwest 1 2|al=north-west/spelling/2/2/UK, north-northeast 3 4, east-northeast 3 4, east-southeast 3 4, south-southeast 3 4,
    south-southwest 3 4, west-southwest 3 4, west-northwest 3 4, north-northwest 3 4`),
  directions: M(`left 1 1, right 1 1, up 1 1, down 1 1, forward 1 1|al=forwards/spelling/2/2, backward 1 1|al=backwards/spelling/1/1, ahead 1 2, behind 1 2, straight on 3 2|reg=UK, turn around 2 2,
    over 1 3, under 1 3, above 1 3, below 1 3, upward 2 2|al=upwards/spelling/2/2, downward 2 2|al=downwards/spelling/2/2, sideways 2 2, clockwise 2 2,
    counterclockwise 2 2|al=anticlockwise/synonym/2/2/UK, inward 3 3, outward 3 3, uphill 2 3, downhill 2 3, diagonal 2 3, u-turn 2 3, port 3 4|g=ship side, starboard 3 4, fore 4 4, aft 4 4,
    windward 4 4, leeward 5 5, widdershins 5 5, deasil 5 5, lengthways 3 3, crosswise 4 4, onward 2 3`),
  continents: M(`Africa 1 1, Antarctica 1 1, Asia 1 1, Europe 1 1, North America 1 1, Oceania 3 2, South America 1 1`, { type: 'place' }),

  // ---------------------------------------------------------------- flags of the world
  flags_with_stars: place(`United States 1 1|al=USA/synonym/1/1//acronym|al=America/synonym/1/2, China 1 2, Brazil 1 3, Turkey 2 3, Vietnam 2 3, Chile 2 3, Australia 1 3, New Zealand 2 3, Cuba 1 3,
    Venezuela 2 4, Panama 2 4, Ghana 2 4, Senegal 3 4, Cameroon 3 5, Morocco 2 4, Israel 1 3, Pakistan 1 3, Malaysia 2 3, Philippines 2 4, Burkina Faso 4 5, Togo 4 5, Liberia 3 4,
    Honduras 3 5, Somalia 3 4, Syria 2 4, Myanmar 3 5, North Korea 2 3, Uzbekistan 3 5, Turkmenistan 4 5, Tuvalu 4 5, Micronesia 4 5, Marshall Islands 4 5, Nauru 4 5, Samoa 3 5,
    Papua New Guinea 3 5, Bosnia 3 5, Kosovo 4 5|sens, Suriname 4 5, Zimbabwe 3 4, Mauritania 4 5`),
  flags_with_crescents: place(`Turkey 2 1, Pakistan 1 2, Algeria 2 3, Tunisia 2 3, Malaysia 2 3, Azerbaijan 3 4, Singapore 1 3, Maldives 2 4, Mauritania 4 5, Libya 2 4, Comoros 4 5,
    Uzbekistan 3 5, Turkmenistan 4 5, Brunei 3 4, Western Sahara 4 5|sens, Northern Cyprus 4 5|sens, Ottoman Empire 3 4, Kashmir 3 5|sens`),
  flags_with_crosses: place(`Switzerland 1 1, Denmark 1 1, Norway 1 1, Sweden 1 1, Finland 1 2, Iceland 1 2, United Kingdom 1 2|al=UK/synonym/1/2//acronym|al=Britain/synonym/1/2, England 1 2, Scotland 1 3, Greece 1 2,
    Georgia 2 4, Malta 2 3, Tonga 3 4, Dominican Republic 2 4, Jamaica 2 3, Slovakia 3 5, Serbia 2 5, Faroe Islands 4 4, Greenland 2 3, Åland 5 5, Northern Ireland 3 3,
    Australia 1 4, New Zealand 1 4, Fiji 3 4, Burundi 4 4, Hawaii 2 4, Cornwall 3 3, Quebec 2 4`),
  red_and_white_flags: place(`Japan 1 1, Canada 1 1, Poland 1 2, Switzerland 1 2, Austria 1 3, Peru 2 3, Denmark 1 3, Turkey 2 3, Indonesia 2 3, Monaco 3 3, Singapore 2 3, Tunisia 3 4, Latvia 3 4, Georgia 2 4,
    England 1 3, Greenland 2 4, Malta 2 3, Bahrain 3 4, Qatar 3 4, Tonga 3 4, Lebanon 3 5, Tahiti 4 5, Trinidad 3 5`),
  tricolor_flags: place(`France 1 1, Italy 1 1, Ireland 1 1, Germany 1 1, Russia 1 1, Mexico 1 2, Netherlands 1 2, Belgium 2 2, Romania 2 3, Hungary 2 3, Bulgaria 3 3, Lithuania 3 3, Estonia 3 3, Luxembourg 3 3,
    Armenia 3 4, Colombia 2 3, Bolivia 3 4, Ecuador 3 4, Nigeria 2 3, Mali 3 4, Ivory Coast 3 4, Ghana 2 4, Chad 3 4, Gabon 4 4, Sierra Leone 3 4, Yemen 3 4, Egypt 1 4, Iran 2 3, India 1 2,
    Thailand 2 3, Austria 2 4, Slovenia 3 4, Slovakia 3 4, Serbia 3 4, Croatia 3 3, Peru 2 4, Sudan 3 4, Guinea 4 4, Senegal 3 4`),
  flag_words: M(`flagpole 1 1, banner 1 2, pennant 2 2, ensign 3 2, canton 4 3|g=flag, half-mast 3 2, standard 2 4, jack 3 4|g=small flag, bunting 2 2, streamer 2 4, colours 3 3|al=colors/spelling/2/3/US, halyard 5 4,
    vexillology 5 3, vexillologist 5 3, hoist 4 4, gonfalon 5 5, burgee 5 5, guidon 5 5, oriflamme 5 5, pennon 5 5, tricolor 3 2|al=tricolour/spelling/3/2/UK, saltire 5 4, Union Jack 1 2|type=proper,
    Stars and Stripes 2 2|type=proper, white flag 1 3, black flag 3 4, checkered flag 2 3|al=chequered flag/spelling/2/3/UK, signal flag 3 3, flagstaff 3 2, 
    unfurl 3 4|pos=verb, Jolly Roger 2 3|type=proper, Old Glory 3 3|type=proper, Red Ensign 5 5|type=proper, semaphore 3 4, flag of convenience 5 5|type=phrase`),
  flags_with_a_sun: place(`Japan 1 1, Argentina 2 3, Uruguay 2 4, Kazakhstan 3 4, Kyrgyzstan 4 5, Taiwan 2 4, Philippines 2 4, Bangladesh 2 4, Palau 4 5, Rwanda 3 5, Malawi 3 4, Namibia 3 4,
    North Macedonia 3 4|al=Macedonia/synonym/3/4, Kiribati 4 4, Niger 3 5, Antigua and Barbuda 4 5, Arizona 2 4, New Mexico 3 4, Nepal 3 5, Mongolia 3 5`),
  flags_with_animals: place(`Mexico 1 3, Wales 2 2, Sri Lanka 3 4, Albania 2 3, Serbia 2 4, Montenegro 3 5, Egypt 1 4, Bhutan 3 3, Zambia 3 5, Uganda 3 5, Papua New Guinea 3 5, Dominica 4 5, Zimbabwe 3 5, Kiribati 4 5,
    Fiji 2 5, California 2 2, Moldova 3 5, Andorra 3 5, Guatemala 3 4, Kazakhstan 3 5, Ecuador 3 5, Bolivia 3 5, Lithuania 3 5, Scotland 1 4`),

  // ---------------------------------------------------------------- place names
  nationalities: M(`Dutch 1 2|g=nationality, Thai 2 2|g=nationality, Welsh 1 2|g=nationality, Swiss 1 2, Greek 1 2|g=nationality, Peruvian 2 2, American 1 1, British 1 1, French 1 2|g=nationality, German 1 2|g=nationality, Italian 1 2|g=nationality, Spanish 1 2|g=nationality, Irish 1 1|g=nationality, Scottish 1 1, English 1 2|g=nationality,
    Chinese 1 2|g=nationality, Japanese 1 2|g=nationality, Indian 1 1, Mexican 1 1, Canadian 1 1, Australian 1 1|al=Aussie/synonym/1/2/AU, Brazilian 1 1, Russian 1 1|g=nationality, Norwegian 2 2|g=nationality, Polish 1 3|g=nationality, Argentinian 2 2|al=Argentine/synonym/3/3,
    Korean 1 2|g=nationality, Vietnamese 2 3|g=nationality, Filipino 2 3|g=nationality, Nigerian 2 3, Israeli 2 3, Emirati 3 4, Omani 4 5, Bhutanese 4 5, Burkinabe 5 5, Maltese 3 3|g=nationality, Cypriot 4 4,
    New Zealander 2 2|al=Kiwi/synonym/1/3///New Zealander, Egyptian 1 2`, { type: 'proper', pos: 'adj' }),
  city_demonyms: M(`Liverpudlian 3 2, Glaswegian 3 2, Parisian 2 1, Muscovite 3 2, Angeleno 4 3, Viennese 3 2, Mancunian 3 2|reg=UK, Geordie 2 3|reg=UK, Brummie 3 3|reg=UK, Scouser 3 3|reg=UK,
    Cockney 2 3|reg=UK, Londoner 1 2, New Yorker 1 1, Bostonian 3 2, Neapolitan 3 3, Venetian 3 2, Florentine 3 3, Berliner 2 2, Dubliner 2 2, Aberdonian 4 3|reg=UK, Dundonian 5 4|reg=UK,
    Torontonian 4 3, Montrealer 3 3, Vancouverite 4 4, Sydneysider 3 3|reg=AU, Melburnian 4 4|reg=AU, Beijinger 3 3, Cairene 5 5, Athenian 3 2, Oxonian 5 4, Cantabrigian 5 4,
    Bristolian 4 3|reg=UK, Madrileño 4 3, Istanbulite 4 4, San Franciscan 4 3, Chicagoan 3 2, Seattleite 4 3, Philadelphian 3 3, Hanoian 5 5, Lisboeta 5 5`, { type: 'proper' }),
  old_country_names: place(`Persia 2 1, Siam 2 1, Ceylon 2 1, Burma 2 3, Zaire 3 1, Rhodesia 3 1, Abyssinia 4 1, Formosa 3 2, Czechoslovakia 2 2, Yugoslavia 2 2,
    Soviet Union 1 2|al=USSR/synonym/2/2//acronym, East Germany 2 3, Prussia 3 3, Mesopotamia 3 3, Upper Volta 4 2, Dahomey 4 2, Gold Coast 3 2, Tanganyika 4 2, Bechuanaland 5 2,
    Nyasaland 5 2, Basutoland 5 2, British Honduras 5 2, Dutch East Indies 4 3, Kampuchea 4 2, Swaziland 3 3, Ottoman Empire 3 4, Gaul 3 4, Hibernia 5 4, Cathay 4 4, Malaya 3 3,
    Muscovy 5 4`),
  old_city_names: place(`Constantinople 2 1, Bombay 2 1, Peking 2 1, Leningrad 2 1, Saigon 2 1, Edo 4 3, Smyrna 4 3, Madras 3 2|g=city, Calcutta 3 2, Byzantium 3 2, New Amsterdam 3 3, Danzig 3 3,
    Königsberg 4 3, Stalingrad 3 2, Batavia 4 3, Christiania 5 4, Pressburg 5 5, Breslau 4 4, Rangoon 3 2, Canton 3 3|g=city, Petrograd 4 3, Peiping 5 4, Tenochtitlan 4 4, Londinium 4 3,
    Lutetia 5 4, Eboracum 5 4, Stanleyville 5 5, Karl-Marx-Stadt 5 5, Tiflis 5 4, Bytown 5 5, Aquae Sulis 5 5, Lourenço Marques 5 4`),
  places_named_after_people: place(`Washington 1 2|g=city, Bolivia 2 3, Victoria 2 3, Darwin 2 4, Houston 2 4, Tasmania 2 3, Philippines 2 3, Colombia 2 3, Maryland 2 3, Virginia 2 3, Louisiana 2 4, Pennsylvania 2 4,
    Jacksonville 3 3, Nashville 3 3, Cleveland 3 4, Dallas 2 5, Denver 2 5, Austin 2 4, Wellington 2 4, Adelaide 2 4, Melbourne 2 4, Sydney 2 4, Brisbane 3 4, Hobart 4 4, Vancouver 3 4,
    Johannesburg 3 4, Pretoria 3 4, Livingstone 4 4, Mauritius 3 4, Saudi Arabia 2 3, Seychelles 4 5, Marshall Islands 4 4, Cook Islands 3 4, Pittsburgh 3 4, Bismarck 3 4,
    Ho Chi Minh City 3 3, Queensland 3 4, Alexandria 3 3`),
  foods_named_after_places: place(`Cheddar 2 1, Hamburg 2 1, Dijon 2 1, Parma 2 1, Champagne 1 1, Bologna 2 2, Camembert 2 2, Roquefort 3 2, Gouda 2 3, Edam 2 3, Stilton 3 2, Gorgonzola 3 2, Emmental 3 3,
    Cognac 2 2, Bordeaux 2 3, Burgundy 2 3|g=region, Chablis 3 3, Madeira 3 3, Marsala 3 3, Worcester 4 3, Bakewell 4 3, Eccles 4 4, Kobe 3 3, Jaffa 3 4, Brussels 2 4, Jerusalem 3 5, Savoy 3 4, Waldorf 3 4,
    Bombay 2 4, Mocha 2 3|g=port, Java 2 4|g=island, Frankfurt 2 3, Manchego 3 3, Cheshire 3 3, Gruyère 3 3, Brie 2 3, Peking 2 3, Kiev 3 3`),
  places_that_are_also_words: place(`Turkey 1 1, Chile 2 2, Nice 1 1, Reading 1 2, Bath 1 1, Split 1 2, Cork 2 2, Mobile 1 3, Orange 1 3, Lima 2 3, China 1 4, Jersey 2 3|g=island, Chad 3 3, Guinea 3 4, Hungary 2 3,
    Greece 2 3, Wales 2 3, Hull 3 3|g=city, Sale 2 4, Rugby 2 3|g=town, Mold 3 4, Wells 3 3, Slough 4 4, Normal 2 4, Hell 2 3, Paradise 2 4, Surprise 3 4|g=town, Cuba 3 5, Jordan 2 4, Holland 3 4, Bury 3 4, Eyam 5 5`),
  countries_ending_in_ia: place(`Australia 1 1, India 1 1, Russia 1 1, Colombia 1 1, Bolivia 1 1, Malaysia 1 1, Algeria 2 2, Tunisia 2 2, Libya 2 2, Nigeria 1 2, Syria 1 2, Tanzania 2 2, Zambia 2 2, Gambia 3 3,
    Namibia 2 2, Somalia 2 2, Ethiopia 2 2, Liberia 2 3, Eritrea 3 3, Mauritania 3 3, Indonesia 2 2, Austria 1 2, Bulgaria 2 2, Croatia 2 2, Serbia 2 3, Slovakia 2 3, Slovenia 2 3, Romania 2 2,
    Albania 2 3, Estonia 2 3, Latvia 2 3, Lithuania 2 3, Armenia 2 3, Georgia 2 3, Mongolia 2 3, Cambodia 2 3, Saudi Arabia 2 3, Micronesia 4 4, Bosnia 3 4, Arabia 3 4`),
  places_after_new: place(`York 1 1, Delhi 1 2, Zealand 1 1, Orleans 2 2, Jersey 2 2|g=island, Mexico 1 1, Hampshire 3 3, England 2 3, Guinea 3 3, Caledonia 4 4, South Wales 3 3, Haven 3 3, Amsterdam 3 3, Hebrides 5 4,
    Brunswick 3 3, Plymouth 4 4, Paltz 5 5, Rochelle 5 5, Bedford 4 4, Canaan 5 5, Glarus 5 5, Forest 3 4, Brighton 4 5, Cross 4 5`),
  places_ending_in_land: place(`Finland 1 1, Ireland 1 1, England 1 1, Scotland 1 1, Poland 1 1, Iceland 1 1, Thailand 1 1, Switzerland 1 1, New Zealand 1 1, Greenland 1 2, Lapland 2 3, Swaziland 3 4, Holland 2 3,
    Maryland 2 3, Queensland 2 3, Newfoundland 2 3, Jutland 4 4, Rutland 3 3, Cumberland 4 4, Sunderland 3 3, Northumberland 3 4, Auckland 2 3, Oakland 3 3, Portland 3 3, Cleveland 3 3,
    Sutherland 4 4, Gotland 5 5, Zululand 4 5, Basutoland 5 5, Rhineland 4 4, Heligoland 5 5, Westmorland 5 5, Wonderland 3 4`),

  // ---------------------------------------------------------------- everyday places
  farm: M(`barn 1 1, tractor 1 1, silo 2 1, scarecrow 1 1, hay bale 1 1, plough 2 2|al=plow/spelling/2/2/US, combine harvester 2 1, pigsty 3 2|al=pigpen/synonym/2/2/US, henhouse 3 1, farmer 1 1, paddock 3 2, trough 2 2,
    haystack 1 2, milking parlour 3 2|al=milking parlor/spelling/3/2/US, orchard 2 2, farmhouse 1 1, stable 1 3|g=building, pitchfork 2 2, wheelbarrow 2 3, sheepdog 2 2, cowshed 3 2, field 1 3, manure 2 2, windmill 2 3,
    silage 4 3, fence 1 3, farmhand 3 2, harvest 1 2, crops 1 2, hayloft 3 2, chicken coop 2 2, sheepfold 4 3, baler 4 3, seed drill 5 4, muck spreader 4 4, slurry 4 4, byre 5 4, granary 4 3,
    cattle grid 4 4|reg=UK, dung heap 3 3`),
  restaurant: M(`menu 1 1, waiter 1 1, waitress 1 1, chef 1 1, tablecloth 1 2, napkin 1 2, bill 1 2|g=restaurant bill|reg=UK, tip 1 3|g=gratuity, reservation 2 1, starter 2 2|reg=UK, appetizer 2 2|reg=US,
    main course 2 2, dessert 1 2, wine list 2 1, sommelier 3 1, maître d' 3 2, host 2 3|g=restaurant, hostess 2 2, booth 2 3, high chair 2 3, specials board 3 2, cover charge 4 3, corkage 4 3,
    amuse-bouche 4 3, cloakroom 3 3, tasting menu 3 3, à la carte 3 3, buffet 2 2|g=meal, set menu 3 2, kids' menu 3 3, doggy bag 3 3, service charge 3 2, sous chef 3 2, head chef 2 2, busboy 3 3|reg=US,
    receipt 1 3, candle 1 3, bread basket 2 3, table for two 3 3, check 2 3|g=restaurant bill|reg=US`),
  supermarket: M(`trolley 1 1|g=shopping|reg=UK|al=cart/synonym/1/2/US, basket 1 1, aisle 1 1, checkout 1 1, till 2 2|reg=UK, cashier 1 1, barcode 1 2, shelf 1 2, freezer 1 3, deli counter 2 2, self-checkout 2 1, loyalty card 2 2,
    receipt 1 3, carrier bag 2 2|reg=UK, produce section 3 2|reg=US, price tag 1 2, special offer 2 2, coupon 2 2, shopping list 1 2, conveyor belt 2 2, barcode scanner 2 2, bagger 3 3|reg=US, stock clerk 3 3,
    trolley bay 3 3|reg=UK, bargain bin 3 3, end cap 5 4, bag for life 3 3|reg=UK, reduced sticker 4 3|reg=UK, bulk bin 4 3|reg=US, dairy aisle 2 2, frozen aisle 2 2, customer service desk 3 3,
    security tag 3 3, weighing scale 2 3, checkout divider 4 4, cart corral 5 4|reg=US, own brand 3 3, meal deal 3 4|reg=UK, bakery counter 2 2, fish counter 2 3`),
  post_office: M(`stamp 1 1, letter 1 1|g=mail, parcel 1 1, envelope 1 1, postbox 3 2|reg=UK|al=mailbox/synonym/1/3/US, mail 1 2, postcode 2 2|reg=UK|al=zip code/synonym/2/2/US, package 1 2, counter 1 3, scales 2 3, postal clerk 3 2,
    queue 2 3|reg=UK|al=line/synonym/1/4/US, postmark 3 2, airmail 3 3, registered mail 3 2, recorded delivery 4 3|reg=UK, PO box 2 2, mailbag 3 2, pigeonhole 4 4, sorting office 4 3|reg=UK,
    customs form 4 3, tracking number 2 3, stamp book 3 3, postal order 4 3|reg=UK, money order 3 3|reg=US, postage 2 2, first class 2 3, second class 3 3|reg=UK, return address 2 3, forwarding address 4 3,
    parcel tape 3 3, bubble wrap 2 3, special delivery 4 3, mail slot 3 3, franking machine 5 4, passport form 3 4, wanted poster 2 4, postmaster 3 2, postman 1 2`),
  library: M(`book 1 1, shelf 1 1, librarian 1 1, library card 1 1, borrow 1 1, due date 2 1|g=library book, fine 2 4|g=penalty, catalogue 3 2|al=catalog/spelling/3/2/US, Dewey Decimal 3 2, reference section 3 2, reading room 2 2,
    study desk 2 2, microfiche 4 3, periodicals 4 3, newspaper 1 3, magazine rack 3 3, children's corner 2 3, audiobook 2 3, computer terminal 3 3, stacks 4 3, bookmark 1 3, return slot 3 3, book trolley 3 3,
    overdue notice 3 2, inter-library loan 5 4, card catalogue 4 3, photocopier 3 4, spine label 5 4, date stamp 3 3, large print 3 3, reserve 2 4|g=hold a book, renewal 3 3, archives 3 4,
    bookend 3 3, e-book 2 3, quiet sign 2 3, hardback 2 3, paperback 1 3, special collections 5 4, bookmobile 4 4`),
  cafe: M(`coffee 1 1, espresso machine 2 1, barista 2 1, latte 1 1, cappuccino 1 1, croissant 1 2, muffin 1 2, pastry cabinet 4 3, tea 1 1, menu board 2 2, counter 1 3, tip jar 2 2, sugar sachet 3 3, napkin dispenser 3 3,
    stirrer 3 3, takeaway cup 2 2|reg=UK, loyalty card 2 3, outdoor seating 3 3, newspaper rack 3 3, cake stand 3 3, scone 2 2, sandwich 1 3, panini 2 2, wifi 1 3, milk jug 2 3, coffee grinder 2 2,
    portafilter 5 4, tamper 4 4, steam wand 5 4, frother 4 3, saucer 2 3, teapot 1 2, flat white 2 2, americano 2 2, iced coffee 1 2, cheesecake 1 3,
    chalkboard 2 3, parasol 2 4, mocha 2 2|g=coffee, macchiato 3 2`),
};

export const FIXES = [
  // nationality adjectives share their text with the language
  { gloss: ['Dutch', 'languages', 'language'] }, { gloss: ['Welsh', 'languages', 'language'] }, { gloss: ['Greek', 'languages', 'language'] }, { gloss: ['French', 'languages', 'language'] }, { gloss: ['German', 'languages', 'language'] }, { gloss: ['Italian', 'languages', 'language'] }, { gloss: ['Spanish', 'languages', 'language'] }, { gloss: ['English', 'languages', 'language'] }, { gloss: ['Chinese', 'languages', 'language'] }, { gloss: ['Japanese', 'languages', 'language'] }, { gloss: ['Russian', 'languages', 'language'] }, { gloss: ['Norwegian', 'languages', 'language'] }, { gloss: ['Korean', 'languages', 'language'] }, { gloss: ['Vietnamese', 'languages', 'language'] }, { gloss: ['Maltese', 'languages', 'language'] },
  { gloss: ['Hull', 'boats_and_ships', 'ship part'] }, { gloss: ['Rugby', 'ball_sports', 'sport'] }, { gloss: ['Surprise', 'emotions', 'feeling'] },
  { gloss: ['due date', 'babies_and_birth', 'birth'] }, { gloss: ['mocha', 'hot_drinks', 'coffee'] },
];
