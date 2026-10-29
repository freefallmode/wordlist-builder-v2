// Depth-4/5 words: places to visit (beach ... water park) and building kinds. Format: tools/apply-words.mjs.
// Rows are compact: "text rec inRec" then optional tokens ~gloss ^type %sens %tm %adult @REGION +alias/kind/rec/inRec/REGION (kind y=synonym, s=spelling).
const L = s => s.split(',').map(x => x.trim()).filter(Boolean).map(x => {
  const m = x.match(/^(.*?) (\d) (\d)((?: [~^%@+].*)?)$/);
  if (!m) throw Error('bad row ' + x);
  const o = {}; const al = [];
  for (const t of m[4].trim().split(/(?=[~^%@+])/).filter(Boolean)) {
    const v = t.slice(1).trim();
    if (t[0] === '~') o.g = v; else if (t[0] === '^') o.type = v; else if (t[0] === '%') o[v] = true;
    else if (t[0] === '@') o.reg = v.split('/'); else {
      const [at, k, r, i, rg] = v.split('/');
      al.push([at, k === 'y' ? 'synonym' : 'spelling', +r, +i, rg ? rg.split('/') : []]);
    }
  }
  if (al.length) o.al = al;
  return [m[1], +m[2], +m[3], o];
});

export const THEMES = {
  beach: { d: 1 }, airport: { d: 2 }, museum: { d: 1 }, art_gallery: { d: 2 }, aquarium: { d: 2 }, movie_theater: { d: 1 },
  swimming_pool: { d: 1 }, ski_resort: { d: 3 }, water_park: { d: 2 }, traditional_dwellings: { d: 5 },
  religious_buildings: { d: 3 }, public_buildings: { d: 2 }, farm_buildings: { d: 3 }, industrial_buildings: { d: 4 },
};

export const DATA = {
  beach: L(`sand 1 1 ~sediment, sea 1 2, wave 1 1 ~water, towel 1 1, sunscreen 1 2, sunbathing 1 1, seashell 1 1 ~shell +shell/y/1/2, sandcastle 1 1, bucket 1 2 ~beach, spade 1 3, flip-flops 1 2,
    parasol 2 2 +beach umbrella/y/1/2, deckchair 3 2, lifeguard 1 1, surfboard 1 2, bikini 1 2, snorkel 2 3 ~diving, boogie board 3 2, tide 2 3, seagull 1 3, pier 2 3 ~jetty, dune 2 3,
    driftwood 3 3 ~beach, seaweed 2 3, rock pool 3 3, shoreline 3 3, jetty 3 4, windbreak 3 3, beach ball 1 1, cooler 2 4, crab 1 3 ~animal, starfish 2 3, sunbed 2 2, beach hut 2 2,
    promenade 3 4 ~walk, groyne 4 5 @UK, undertow 3 4, riptide 3 4, flotsam 4 5, sea glass 4 4, cabana 3 3`),
  airport: L(`runway 1 1, terminal 1 1 ~airport, gate 1 2 ~airport, check-in 2 1, baggage claim 2 1, passport control 2 2, security 1 2 ~airport, departures 1 1, arrivals 1 1, boarding pass 1 1,
    control tower 2 1, hangar 2 2, duty-free 2 2, luggage trolley 2 3 @UK +baggage cart/y/2/3/US, carousel 2 2 ~baggage, lounge 2 3 ~airport, jet bridge 3 2 +jetway/y/3/3, customs 2 2,
    taxiway 4 3, apron 4 4 ~airport, windsock 3 3, departure board 2 2, immigration 2 3 ~airport, tarmac 2 2, metal detector 2 3, air traffic control 2 2, shuttle bus 2 3, layover 2 3,
    ground crew 3 3, luggage tag 2 3, baggage handler 3 3, concourse 3 2, airside 4 4, landside 5 5, boarding gate 2 2`),
  museum: L(`exhibit 1 1, display case 2 2, curator 2 1, gift shop 1 2, audio guide 2 2, artifact 2 1 +artefact/s/2/1/UK, fossil 1 3, mummy 1 3 ~Egyptian, guided tour 1 2, plaque 2 3 ~sign,
    exhibition 2 1, docent 4 3, diorama 3 3, replica 2 3, relic 3 3, specimen 2 3, cloakroom 2 4, sculpture 1 3, antiquity 3 3, archive 3 4, conservator 4 3, collection 1 1 ~art,
    interactive display 2 3, rope barrier 2 4, Rosetta Stone 3 4 ^proper, taxidermy 3 3, meteorite 3 4, provenance 5 5, acquisition 4 4 ~art, exhibit hall 2 2, vitrine 5 4,
    coin collection 2 3, dinosaur skeleton 1 2`),
  art_gallery: L(`painting 1 1, canvas 1 2 ~painting surface, frame 1 3 ~picture, portrait 1 1, landscape 1 2, sculpture 1 2, exhibition 2 1, curator 2 2, easel 2 3, watercolor 1 2 +watercolour/s/1/2/UK,
    oil painting 1 1, abstract 2 2 ~art, still life 2 2, vernissage 5 4, mural 2 3, installation 3 3 ~art, collage 2 3, lithograph 4 4, etching 3 3, triptych 4 4, gilded frame 3 3,
    spotlight 2 4 ~concert, gallery owner 2 2, art dealer 2 2, auction 2 4 ~art, impressionism 3 2, miniature 3 4 ~painting, fresco 3 3, pastel 3 3 ~art, charcoal drawing 2 3,
    artist statement 4 3, private view 4 4 @UK, retrospective 4 3, acrylic 2 3 ~paint, sketch 1 2 ~art`),
  aquarium: L(`fish tank 1 1, shark 1 2 ~fish, jellyfish 1 1, stingray 2 1, touch pool 3 2, seahorse 1 1, octopus 1 2 ~animal, penguin 1 3, sea turtle 1 2, coral reef 2 2, glass tunnel 2 2,
    clownfish 3 1, dolphin show 2 2, otter 2 3, sea lion 1 3, anemone 3 2 ~sea creature, manta ray 2 2, eel 2 3, piranha 2 3, lionfish 3 3, moray eel 3 3, cuttlefish 3 3, sea dragon 4 3,
    axolotl 3 5, nautilus 4 4 ~mollusk, tide pool 3 3, kelp forest 3 3, feeding time 2 3, plankton 3 4, wrasse 5 4, pufferfish 3 2, angelfish 3 2, blue tang 3 3, krill 4 4, beluga 3 3 ~whale,
    whale shark 3 2`),
  movie_theater: L(`screen 1 1 ~film, popcorn 1 1, projector 2 1, ticket 1 2 ~cinema, seat 1 2 ~cinema, trailer 1 1 ~film, usher 2 2 ~theater, concession stand 2 2, 3D glasses 3 2, cup holder 2 3,
    aisle 2 3 ~walkway, balcony 3 4, soda 1 3, candy 1 3, nachos 2 3, box office 2 1, marquee 3 3 ~cinema sign, popcorn machine 2 2, reclining seat 3 3, IMAX 3 2 ^proper %tm, premiere 2 3,
    matinee 3 3, surround sound 2 3, Dolby 3 4 ^proper %tm, film reel 3 3, projection booth 4 3, showtime 2 2, lobby 2 3 ~building, exit sign 2 5, previews 3 3, now showing 2 2,
    usherette 4 3, ticket stub 2 3, double feature 3 3, multiplex 3 2, arthouse 4 3`),
  swimming_pool: L(`diving board 1 1, lane 1 2 ~swimming, lifeguard 1 1, goggles 1 1 ~eyewear, swimming cap 1 2, chlorine 1 2, deep end 1 1, shallow end 1 1, ladder 1 3 ~steps, kickboard 2 2,
    pool noodle 1 2, float 1 3 ~swimming, armbands 1 2 @UK +water wings/y/2/2/US, changing room 1 2 ~pool, locker 1 3 ~swimming, diving block 3 2, lane rope 3 2, whistle 1 4 ~safety,
    pool filter 3 3, skimmer 3 3 ~pool, springboard 3 3, lap 2 3 ~swimming, paddling pool 2 3 @UK +wading pool/y/2/3/US, hot tub 1 4, sun lounger 2 3, pool cover 2 3, shower 1 3 ~bathroom,
    footbath 4 3, water polo 2 3, timing board 4 4, lane marker 3 3, pool net 3 4, flip turn 3 3, trunks 2 2 ~swimming`),
  ski_resort: L(`ski lift 1 1, chairlift 1 1, gondola 2 2 ~ski, slope 1 1 ~skiing, piste 2 2 ~ski @UK, ski pass 2 2 ~skiing, snowboard 1 1, skis 1 1, ski boots 1 2, ski poles 1 2, chalet 2 1,
    apres-ski 3 2, snow cannon 3 3, ski school 2 2, instructor 2 3 ~ski, moguls 3 3, black diamond 3 2, bunny hill 3 3 @US, nursery slope 3 3 @UK, T-bar 3 3, button lift 4 4,
    snowmobile 2 3, avalanche 2 3 ~skiing, ski patrol 3 3, powder 2 3 ~snow, halfpipe 3 3, snow groomer 4 4, lodge 2 2 ~accommodation, hot chocolate 1 4, off-piste 3 3, ski jump 2 3,
    terrain park 4 3, magic carpet 4 3 ~ski lift, goggles 1 3 ~ski, base lodge 4 3`),
  water_park: L(`water slide 1 1, wave pool 1 1, lazy river 1 1, splash pad 2 2, inner tube 1 2, flume 3 2 ~ride, wading pool 3 3, kiddie pool 2 2 @US, cabana 3 3, lifeguard 1 2,
    wristband 2 3, locker 2 3 ~swimming, tipping bucket 4 2, wave machine 3 2, tube slide 2 2, body slide 3 3, speed slide 3 3, bowl slide 4 3, raft ride 3 3, water cannon 2 3,
    sunscreen 1 4, sun lounger 2 3, splash zone 3 2, mat racer 4 3, life vest 1 3, rubber ring 2 3, snack bar 1 4, water gun 2 3, free fall slide 3 3, towel 1 4`),
  traditional_dwellings: L(`igloo 1 1, yurt 2 1 +ger/y/4/2, tepee 2 1 ~tent +tipi/s/3/1, wigwam 2 2, longhouse 3 3, hogan 4 3 ~Navajo house, rondavel 4 3, trullo 5 4, adobe house 3 3, pueblo 3 3,
    thatched cottage 2 3, log cabin 1 3, crannog 5 4, roundhouse 4 3, stilt house 3 3, bothy 5 4 @UK, hut 1 3 ~building, kraal 4 4 ~village, turf house 4 3, sod house 4 3, earth lodge 5 4,
    chickee 5 4, cave dwelling 2 3, cliff dwelling 3 3, minka 5 4, tulou 5 4, hanok 5 4, cob house 4 4, pit house 4 4, nipa hut 4 4, mud hut 2 3, tent 1 3, shieling 5 5 @UK`),
  religious_buildings: L(`church 1 1, mosque 1 1, synagogue 1 1, temple 1 1 ~worship, cathedral 1 1, chapel 1 1, monastery 2 2, abbey 2 2, convent 2 3, priory 4 4, pagoda 2 2, shrine 2 2,
    gurdwara 3 2, basilica 2 2, minaret 2 3, mandir 3 2, stupa 3 3, kirk 3 3 @UK, meeting house 3 4, tabernacle 4 3, oratory 4 4, baptistry 4 4, minster 3 3 @UK, bell tower 2 3,
    cloister 3 3, vihara 5 4, parish church 2 2, ashram 3 4, kingdom hall 4 3, zendo 5 4, fire temple 5 4, chantry 5 5, hermitage 3 4 ~dwelling, wat 4 3, gompa 5 4, sanctuary 3 4 ~church`),
  public_buildings: L(`town hall 1 1, library 1 1 ~building, school 1 1 ~building, hospital 1 1, post office 1 1, fire station 1 1, police station 1 1, courthouse 1 1, museum 1 2, city hall 1 1,
    train station 1 2, bus station 2 2, airport 1 3, parliament 2 2 ~government, embassy 2 2, prison 1 2, community center 2 2 +community centre/s/2/2/UK, civic center 3 2, council offices 3 2 @UK,
    customs house 4 3, registry office 3 3 @UK, capitol 3 3, statehouse 4 3, guildhall 3 3, public toilets 2 3, swimming baths 3 3 @UK, leisure centre 3 3 @UK, consulate 3 3,
    barracks 3 4, assembly hall 3 3, jobcentre 4 3 @UK, tax office 2 3, magistrates court 4 3 @UK, senate house 4 4`),
  farm_buildings: L(`barn 1 1, silo 2 1, stable 1 1 ~building, henhouse 1 1 +chicken coop/y/1/1, pigsty 2 2 +pigpen/y/2/2/US, cowshed 2 2, farmhouse 1 1 ~house, granary 3 2, dairy 2 2, milking parlor 3 2,
    greenhouse 1 3, windmill 1 4 ~building, shed 1 2, hayloft 2 2, tractor shed 2 3, outhouse 2 4, smokehouse 3 3, root cellar 3 3, corn crib 4 3, oast house 5 4 @UK, dovecote 4 3,
    sheepfold 4 3, kennel 2 4, loose box 4 4 @UK, byre 5 3 @UK, shippon 5 5 @UK, tithe barn 4 3 @UK, hay barn 2 2, lambing shed 3 3, apiary 3 4, machine shed 3 3, poultry house 3 3,
    cattle barn 2 2, pole barn 4 3, Dutch barn 4 3, feed store 3 3, polytunnel 3 4, grain bin 3 3, stable block 3 3, horse barn 2 2`),
  industrial_buildings: L(`factory 1 1, warehouse 1 1, mill 2 1 ~building, refinery 2 1, silo 2 2, foundry 3 1, power station 1 1, workshop 1 2, assembly plant 3 2, brewery 2 2, distillery 3 2,
    sawmill 3 2, cannery 4 3, tannery 4 3, smelter 4 2, steelworks 3 2, ironworks 4 2, gasworks 4 3 @UK, cement works 4 3, textile mill 3 2, cotton mill 3 2, bottling plant 3 2,
    chemical plant 3 2, nuclear plant 2 2, cooling tower 2 3, hangar 2 3, distribution center 3 3, storage depot 3 3, sewage works 4 3, pumping station 4 3, substation 4 3, kiln 3 4,
    forge 3 3, shipyard 2 3, dockyard 3 3, grain elevator 3 3, gasometer 5 4 @UK, maltings 5 5 @UK, paper mill 2 2, flour mill 2 2, data center 2 4, recycling plant 2 3, waterworks 3 3,
    loading dock 3 4, cold store 4 3`),
};
