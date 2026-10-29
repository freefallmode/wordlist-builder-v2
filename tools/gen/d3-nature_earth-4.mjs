// Depth-3 batch: nature_earth chunk 4 (rocks, earth science, habitats). Format: tools/apply-words.mjs.
// Row shorthand: text|rec|inRec|gloss|type
const W = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, g, ty] = x.split('|'); const o = {};
  if (g === 'place' || g === 'person') o.type = g; else if (g) o.g = g; if (ty) o.type = ty;
  return [t, +r, +i, o];
});
const withAl = (rows, al) => {
  for (const [t, a] of Object.entries(al)) { const r = rows.find(x => x[0] === t); if (!r) throw Error('no root ' + t); (r[3].al ||= []).push(...a); }
  return rows;
};

export const THEMES = {
  rock_types: { d: 2 }, minerals: { d: 3 }, building_stones: { d: 3 }, mining_words: { d: 3 }, gold_rush_words: { d: 3 },
  natural_disasters: { d: 1 }, volcano_words: { d: 2 }, earthquake_words: { d: 2 }, layers_of_the_earth: { d: 2 }, erosion_words: { d: 4 },
  geothermal_words: { d: 4 }, soil_words: { d: 3 }, water_cycle_words: { d: 2 }, layers_of_the_atmosphere: { d: 3, complete: true },
  layers_of_a_rainforest: { d: 3, complete: true }, types_of_volcano: { d: 4, complete: true },
  rainforest: { d: 1 }, ocean: { d: 1 }, desert: { d: 1 }, savanna: { d: 1 }, polar_regions: { d: 1 }, wetlands: { d: 2 }, mountains: { d: 1 },
  meadow: { d: 2 }, pond: { d: 1 }, taiga: { d: 4 }, oasis: { d: 2 }, outback: { d: 2 }, andes: { d: 3 }, prairie: { d: 3 },
};

export const FIXES = [
  { gloss: ['sourdough', 'breads_and_baking', 'bread'] }, { gloss: ['saddle', 'horses', 'horse gear'] }, { gloss: ['bush', 'plants', 'shrub'] }, { gloss: ['sable', 'colors', 'color'] },
  { gloss: ['saloon', 'cars', 'car'] },
];

export const DATA = {
  rock_types: withAl(W(`granite|2|1;basalt|3|1;limestone|2|1;sandstone|2|1;marble|1|2|rock;slate|2|2|rock;shale|3|1;obsidian|3|1;pumice|3|1;quartzite|4|2;gneiss|4|1;schist|4|1;
    chalk|2|2|rock;flint|3|3;conglomerate|4|2;breccia|5|2;rhyolite|5|2;andesite|5|2;gabbro|5|2;diorite|5|2;tuff|5|2;coal|1|3;siltstone|4|2;mudstone|4|2;
    travertine|5|3;scoria|5|3;soapstone|4|3;chert|5|3;igneous rock|3|1;sedimentary rock|3|1;metamorphic rock|3|1;peridotite|5|3;hornfels|5|3;dolostone|5|3;lava rock|3|2`),
    { granite: [] }),
  minerals: W(`quartz|2|1;feldspar|4|1;mica|3|1;calcite|4|1;gypsum|3|1;talc|3|1;halite|4|1;fluorite|4|1;pyrite|3|1;galena|4|1;magnetite|4|1;hematite|4|1;malachite|3|1;azurite|4|1;
    topaz|3|2;garnet|3|2;olivine|4|1;apatite|4|1;corundum|4|1;diamond|1|3;graphite|2|2;sulfur|2|2;rock salt|2|2;bauxite|4|2;cinnabar|4|1|mineral;borax|3|2;beryl|4|2;zircon|4|1;
    kaolinite|5|1;rutile|5|1;amethyst|2|2;dolomite|4|2;orthoclase|5|1;sphalerite|5|1;tourmaline|4|2;serpentine|4|3|mineral;barite|5|1;spinel|5|2;chalcopyrite|5|1;fool's gold|2|3`),
  building_stones: W(`granite|2|1;limestone|2|1;sandstone|2|1;marble|1|1|rock;slate|2|1|rock;flagstone|3|1;cobblestone|2|2;fieldstone|3|1;brownstone|3|2;bluestone|4|2;ashlar|5|2;Portland stone|4|1;
    Bath stone|4|1;travertine|5|2;paving stone|2|2;keystone|3|3;cornerstone|2|3;capstone|3|3;millstone|3|4;flint|3|3;rubble|2|3;river rock|2|3;lava stone|3|3;curbstone|3|2;
    whinstone|5|3;gritstone|4|2;Cotswold stone|4|2;York stone|4|2;Carrara marble|3|1;soapstone|4|3;sarsen|5|3;dressed stone|4|1;quarried stone|3|1;brick|1|4;adobe|3|4;bedrock|3|4`),
  mining_words: W(`shaft|2|1;seam|3|1;ore|2|1;quarry|2|2;nugget|2|2;vein|2|2;lode|4|2;pickaxe|1|1;slag|3|2;smelter|3|2;mine|1|1;miner|1|1;tunnel|1|2|structure;pit|2|2|mine;adit|5|2;headframe|5|3;
    gangue|5|3;tailings|4|3;prospecting|3|2;hard hat|1|2;canary|2|4;dynamite|2|3;mine cart|2|1;coal face|3|2;stope|5|3;assay|4|3;ingot|3|3;smelting|3|2;open pit|3|2;
    strip mining|3|2;fool's gold|2|3;colliery|4|2;pithead|4|2;collier|4|2;coal mine|1|1;gold mine|1|1;headlamp|2|2`),
  gold_rush_words: W(`prospector|2|1;claim|2|2|mining;panning|2|1;sluice|4|2;boomtown|3|2;forty-niner|3|1;Klondike|3|1|region|place;gold pan|2|1;nugget|2|1;gold dust|2|1;mother lode|3|2;pickaxe|1|2;
    placer|5|3;claim jumper|4|2;saloon|2|3|bar;Sutter's Mill|4|2|place;Yukon|3|3|place;Dawson City|4|3|place;Chilkoot Pass|5|3|place;rocker box|5|3;grubstake|5|2;tenderfoot|4|4;sourdough|3|4|prospector;
    gold fever|2|1;fool's gold|2|2;gold rush|1|1;ghost town|2|3;mining camp|3|1;assayer|5|3;Comstock Lode|5|2|place;bonanza|3|2;Eldorado|4|3|place;stake a claim|2|1;Deadwood|4|4|place`),
  natural_disasters: W(`earthquake|1|1;tsunami|1|1;hurricane|1|1;tornado|1|1;flood|1|1|weather;wildfire|1|1;volcanic eruption|1|1;landslide|1|1;avalanche|1|1;drought|1|1;blizzard|1|2;cyclone|2|1;typhoon|2|1;
    famine|2|3;heat wave|1|2;sinkhole|2|2;mudslide|2|1;storm surge|3|2;flash flood|2|1;ice storm|2|2;hailstorm|2|2;derecho|5|3;dust storm|2|2;lahar|5|3;pyroclastic flow|4|3;firestorm|3|3;
    bushfire|2|1;forest fire|1|1;tidal wave|2|1;meteor strike|3|3;asteroid impact|3|3;supervolcano|3|3;seiche|5|4;waterspout|3|3;landslip|4|2;locust plague|3|3;blight|3|4`),
  volcano_words: W(`lava|1|1;magma|2|1;crater|2|1;eruption|1|1;ash|1|2|volcanic;vent|3|1;caldera|3|1;cone|2|2|volcano;ash cloud|2|1;pyroclastic flow|4|2;lahar|5|2;volcanic bomb|4|1;tephra|5|2;fumarole|5|3;
    magma chamber|3|1;dormant|3|2;extinct|2|3;Vesuvius|2|2|place;Krakatoa|3|2|place;Mount St. Helens|2|2|place;Pompeii|2|3|place;Etna|3|2|place;Mauna Loa|4|2|place;pumice|3|2;obsidian|3|3;
    lava flow|2|1;lava tube|4|2;lava lake|4|2;volcanologist|3|2;Ring of Fire|2|2;hot spot|3|3;stratovolcano|4|1;cinder|3|3;spatter cone|5|3;volcanic ash|2|1;Pinatubo|4|2|place;lapilli|5|2`),
  earthquake_words: withAl(W(`epicenter|3|1;fault|2|1|geology;fault line|2|1;tremor|2|1;aftershock|2|1;seismograph|3|1;seismology|4|1;Richter scale|2|1;magnitude|3|2;tectonic plate|2|1;seismic wave|3|1;seismic|3|1;
    foreshock|4|2;hypocenter|5|2;focus|3|4|earthquake;liquefaction|4|2;San Andreas|3|2|fault|place;rupture|3|3;rumble|2|4;quake|2|1;earthquake|1|1;temblor|4|2;moment magnitude|5|2;Mercalli scale|5|2;
    seismometer|4|1;P wave|4|2;S wave|4|2;surface wave|5|2;subduction|4|2;tsunami|1|3;rubble|2|3;drop and cover|2|2;seismic zone|4|2;strike-slip|5|3;megathrust|5|2`),
    { epicenter: [['epicentre', 'spelling', 3, 1, ['UK']]], tremor: [['earth tremor', 'synonym', 3, 1]], quake: [] }),
  layers_of_the_earth: withAl(W(`crust|2|1;mantle|2|1;core|1|1|earth;outer core|3|1;inner core|3|1;lithosphere|4|1;asthenosphere|5|1;continental crust|4|1;oceanic crust|4|1;upper mantle|4|1;lower mantle|4|1;
    magma|2|3;tectonic plate|2|2;molten iron|3|3;nickel|2|4;iron|1|4;geosphere|4|2;transition zone|5|2;earth's crust|2|1;earth's core|1|1;solid core|3|1;liquid core|3|1`),
    { lithosphere: [['Moho', 'synonym', 5, 3, [], { g: 'boundary', type: 'proper' }]] }),
  erosion_words: withAl(W(`erosion|2|1;weathering|3|1;sediment|3|1;deposition|4|1;runoff|3|2;gully|3|2;canyon|1|3;delta|2|3|river;silt|3|2;scree|4|2;sinkhole|2|3;wind erosion|3|1;coastal erosion|3|1;
    abrasion|4|1;attrition|5|2;hydraulic action|5|2;river bank|2|3;topsoil|3|2;sand dune|2|3;glacier|1|3;frost wedging|5|1;freeze-thaw|4|1;wear away|2|1;rill|5|2;meander|3|3|river;oxbow lake|4|3;
    deflation|5|3;denudation|5|1;mass wasting|5|2;slump|4|3;undercut|4|3;scour|4|2;headland|3|4;sea stack|3|3;wave-cut platform|5|3;landslide|1|2;gully erosion|3|1`),
    { 'wear away': [['wear down', 'synonym', 2, 1]], weathering: [['weather', 'synonym', 2, 3, [], { g: 'to erode' }]] }),
  geothermal_words: W(`geyser|2|1|landform;hot spring|2|1;fumarole|5|2;mud pool|3|1;steam vent|3|1;sulfur|2|2;onsen|3|1;Old Faithful|2|1|geyser|place;Yellowstone|2|2|place;Rotorua|4|2|place;geothermal energy|3|1;
    thermal spring|3|1;hot pool|2|1;mud pot|4|1;steam|1|2;boiling mud|3|2;sinter|5|3;travertine terrace|5|3;Blue Lagoon|3|2|place;Iceland|1|3|place;Pamukkale|4|3|place;Strokkur|5|2|geyser|place;
    hydrothermal vent|4|3;geothermal plant|3|1;thermal bath|3|1;mineral spring|3|2;spa|1|4;fissure|4|3;Beppu|5|3|place;hot water|1|3;ground source heat|5|3;Wai-O-Tapu|5|2|place;hot springs|2|1`),
  soil_words: withAl(W(`clay|1|1|soil;loam|3|1;silt|3|1;peat|2|1;humus|3|1;topsoil|2|1;subsoil|3|1;loess|5|1;compost|2|1;sand|1|2|sediment;gravel|1|3;bedrock|3|3;mulch|2|2;fertilizer|2|2;manure|2|2;
    sandy soil|2|1;clay soil|2|1;chalky soil|3|1;soil horizon|4|1;leaf mold|3|2;worm castings|4|2;earthworm|1|3;loamy soil|3|1;dirt|1|1;mud|1|2;nutrients|2|2;aeration|4|2;drainage|2|3;
    tilth|5|2;permafrost|3|3;podzol|5|2;chernozem|5|2;regolith|5|2;marl|5|3;silty soil|3|1;potting soil|2|1`),
    { 'leaf mold': [['leaf mould', 'spelling', 3, 2, ['UK']]] }),
  water_cycle_words: withAl(W(`evaporation|2|1;condensation|2|1;precipitation|3|1;runoff|3|1;groundwater|3|1;aquifer|4|1;transpiration|4|1;infiltration|4|1;percolation|4|2;sublimation|4|2;water vapor|2|1;
    cloud|1|2|weather;rain|1|2;snowmelt|3|2;water table|3|1;reservoir|2|3;stream|1|3;evapotranspiration|5|1;surface water|3|1;hydrologic cycle|5|1;watershed|3|2;humidity|2|3;dew|2|3;
    glacier melt|3|2;lake|1|3;river|1|3;interception|5|2;hydrosphere|4|1;water cycle|2|1;collection|2|3|water`),
    { 'water vapor': [['water vapour', 'spelling', 2, 1, ['UK']]], evaporation: [['evaporate', 'synonym', 2, 1, [], { g: 'to dry up' }]] }),
  layers_of_the_atmosphere: W(`troposphere|3|1;stratosphere|3|1;mesosphere|4|1;thermosphere|4|1;exosphere|4|1`),
  layers_of_a_rainforest: withAl(W(`emergent layer|3|1;canopy|2|1;understory|3|1;forest floor|2|1`),
    { 'emergent layer': [['emergent', 'synonym', 4, 2]], canopy: [['canopy layer', 'synonym', 3, 1]], understory: [['understorey', 'spelling', 4, 1, ['UK']]] }),
  types_of_volcano: withAl(W(`shield|3|2|volcano;cinder cone|3|1;composite|3|2|volcano;lava dome|4|1;caldera|3|1;stratovolcano|4|2`),
    { shield: [['shield volcano', 'synonym', 3, 1]], composite: [['composite volcano', 'synonym', 3, 1]], 'cinder cone': [['scoria cone', 'synonym', 5, 3]], 'lava dome': [['volcanic dome', 'synonym', 5, 3]] }),
  rainforest: W(`canopy|2|1;jungle|1|1;liana|4|2;orchid|2|3;toucan|2|1;jaguar|2|2|animal;monkey|1|2;macaw|2|1;sloth|2|1|animal;parrot|1|2;tree frog|2|2;poison dart frog|3|1;anaconda|2|2;tapir|3|2;orangutan|2|1;
    gorilla|1|3;howler monkey|3|1;chameleon|2|3;epiphyte|4|1;bromeliad|4|2;strangler fig|4|2;Amazon|1|1|region|place;Congo|2|2|place;Borneo|3|2|place;understory|3|1;humidity|2|2;tropical|2|1;
    ocelot|3|2;capybara|2|3;piranha|2|3;leafcutter ant|3|2;mahogany|2|3|wood;kapok|4|3;vine|1|1;bird of paradise|2|3|bird;hornbill|3|3;okapi|4|3;
    cacao|3|4;rainforest floor|2|1`),
  ocean: withAl(W(`wave|1|1;tide|1|1;current|2|1;whale|1|1;dolphin|1|1;shark|1|1;coral reef|1|1;seaweed|1|2;kelp|2|1;plankton|2|1;jellyfish|1|1;octopus|1|2;seabed|3|1;trench|3|1;
    abyss|3|1;salt water|1|1;seagull|1|3;sea turtle|1|1;manta ray|2|2;anglerfish|3|2;starfish|1|2;whirlpool|2|2;Pacific|1|1|ocean|place;
    Atlantic|1|1|ocean|place;Indian Ocean|1|1|ocean|place;continental shelf|4|1;hydrothermal vent|4|2;seamount|5|1;gyre|5|1;riptide|3|2;undertow|3|2;swell|3|2|ocean;brine|3|2;
    abyssal plain|5|1;salinity|3|1;bioluminescence|4|2;krill|3|2;mid-ocean ridge|5|1`),
    { 'salt water': [['saltwater', 'spelling', 1, 1]], seabed: [['ocean floor', 'synonym', 2, 1], ['seafloor', 'spelling', 3, 1]], riptide: [['rip current', 'synonym', 3, 2]] }),
  desert: withAl(W(`sand dune|1|1;cactus|1|1;camel|1|2;oasis|2|1;mirage|2|1;Sahara|1|1|desert|place;scorpion|2|2;sandstorm|2|1;dune|1|1;tumbleweed|2|2;rattlesnake|2|2;lizard|1|3;vulture|2|4;
    Gobi|3|1|desert|place;Mojave|3|1|desert|place;Sonoran|4|2|desert|place;Kalahari|3|1|desert|place;Atacama|3|1|desert|place;wadi|4|2;arroyo|4|2;mesa|3|2;butte|4|3;saguaro|3|1;yucca|3|2;
    Joshua tree|3|1;sagebrush|3|2;coyote|2|3;roadrunner|2|2;fennec fox|3|1;sidewinder|4|2|snake;horned lizard|4|2;barchan|5|1;erg|5|1;hamada|5|1;caravan|2|2;nomad|2|3;
    date palm|2|3;Sahara Desert|1|1`),
    { cactus: [['cacti', 'synonym', 2, 1]], 'sand dune': [['sand hill', 'synonym', 3, 2]] }),
  savanna: withAl(W(`lion|1|1;elephant|1|1;giraffe|1|1;zebra|1|1;wildebeest|2|1;cheetah|1|1;acacia|2|1;baobab|3|1;hyena|2|1;rhino|1|1;Cape buffalo|3|1;antelope|2|1;gazelle|2|1;impala|3|1;warthog|2|1;
    ostrich|1|2;Serengeti|3|1|plain|place;Masai Mara|4|1|reserve|place;grassland|1|1;vulture|2|2;meerkat|2|3;termite mound|3|2;tall grass|2|1;watering hole|2|1;safari|1|1;migration|2|2;
    kudu|4|2;eland|4|2;oryx|4|3;topi|5|2;secretary bird|4|2;jackal|3|2;Kenya|1|3|place;Tanzania|2|3|place;dry season|2|3;mongoose|3|3;leopard|1|2`),
    { grassland: [['savannah', 'spelling', 2, 1]], rhino: [['rhinoceros', 'synonym', 2, 1]] }),
  polar_regions: withAl(W(`iceberg|1|1;penguin|1|2;polar bear|1|1;glacier|1|1;Arctic|1|1|region|place;Antarctica|1|1|continent|place;seal|1|2|animal;walrus|2|1;igloo|1|1;tundra|2|1;permafrost|3|1;aurora|2|2;
    North Pole|1|1|place;South Pole|1|1|place;sled dog|2|2;husky|1|3;ice sheet|2|1;ice floe|3|1;pack ice|3|1;blizzard|1|2;narwhal|2|1;arctic fox|2|1;snowy owl|2|3;reindeer|1|3;caribou|2|3;
    krill|3|3;Greenland|2|1|place;Svalbard|4|1|place;Ross Ice Shelf|5|1|place;ice shelf|3|1;midnight sun|3|1;polar night|3|1;Shackleton|3|2|person;Amundsen|3|2|person;emperor penguin|2|1;
    research station|3|2;fjord|3|3;crevasse|3|2;snow petrel|5|2;skua|5|2`),
    { 'polar bear': [['ice bear', 'synonym', 4, 3]], 'North Pole': [['Arctic Pole', 'synonym', 5, 2]], 'ice floe': [['floe', 'synonym', 4, 2]] }),
  wetlands: withAl(W(`swamp|1|1;marsh|1|1;bog|2|1;fen|3|1;mangrove|3|1;bayou|3|1;Everglades|3|1|place;heron|2|2;egret|3|2;alligator|1|2;cattail|3|1;reed|2|2|plant;bulrush|4|2;peat|2|2;marshland|2|1;
    salt marsh|3|1;mudflat|3|1;estuary|3|2;delta|2|2|river;frog|1|3;dragonfly|2|3;bittern|4|2;ibis|3|3;spoonbill|4|2;waterfowl|3|2;wader|3|3;muskrat|3|2;beaver|1|3;crocodile|1|3;
    sphagnum|5|2;wet meadow|3|1;carr|5|3;floodplain|3|1;lagoon|2|2;slough|4|1|wetland;quagmire|3|2;morass|4|2;mire|3|1;wetland|1|1`),
    { marsh: [['marshes', 'synonym', 2, 1]], swamp: [['swampland', 'synonym', 2, 1]], wetland: [['wetlands', 'synonym', 1, 1]] }),
  mountains: withAl(W(`peak|1|1|mountain;summit|2|1;ridge|2|1;valley|1|2;cliff|1|2;glacier|1|2;avalanche|1|3;slope|2|1;pass|2|3|mountain;crag|3|2;foothills|3|1;Everest|1|1|mountain|place;Alps|1|1|place;Rockies|2|1|place;
    Himalayas|2|1|place;Andes|2|1|place;K2|3|2|mountain|place;Matterhorn|3|1|place;Kilimanjaro|2|1|place;Mont Blanc|3|1|place;Denali|4|1|place;Fuji|2|1|mountain|place;alpine meadow|3|1;treeline|3|1;
    snowcap|3|1;cirque|5|1;arete|5|1;scree|4|2;crevasse|3|2;mountaineer|2|1;base camp|2|1;sherpa|3|2;ibex|3|2;mountain goat|2|1;
    plateau|2|2|landform;fell|4|2|hill;saddle|3|3|mountain;couloir|5|2;moraine|5|2;snowline|4|1`),
    { peak: [['mountaintop', 'synonym', 2, 1]], treeline: [['tree line', 'spelling', 3, 1]], summit: [['mountain top', 'synonym', 2, 1]] }),
  meadow: withAl(W(`grass|1|1;wildflower|1|1;daisy|1|1;poppy|1|1;clover|1|1;buttercup|2|1;butterfly|1|1;bee|1|1;hay|1|1;skylark|3|1;cowslip|4|2;dandelion|1|2;foxglove|3|3;lupin|3|3;
    field mouse|2|2;grasshopper|2|1;cricket|2|3|insect;ladybug|1|2;vole|3|3;hare|2|3;meadowsweet|4|1;sorrel|4|3;yarrow|4|2;knapweed|5|2;cornflower|3|2;corncrake|5|3;lapwing|4|3;dragonfly|2|3;
    bumblebee|1|1;haymaking|3|2;scythe|3|3;field|1|1;meadowlark|3|1;fescue|5|3;timothy grass|5|3;red clover|3|1;oxeye daisy|4|1;speedwell|5|3;ragwort|4|3;thistle|2|3`),
    { ladybug: [['ladybird', 'synonym', 1, 2, ['UK']]], poppy: [['poppies', 'synonym', 1, 1]], 'oxeye daisy': [['moon daisy', 'synonym', 5, 2]] }),
  pond: withAl(W(`frog|1|1;tadpole|1|1;newt|3|1;lily pad|2|1;reed|2|2|plant;dragonfly|2|1;pondweed|3|1;moorhen|3|1;frogspawn|3|1;duck|1|2;goldfish|1|2;koi|2|2;toad|2|2;water lily|2|1;pond skater|3|1;
    water boatman|4|2;mallard|2|2;heron|2|3;algae|2|2;duckweed|3|1;cattail|3|2;stickleback|4|2;snail|1|3;great crested newt|4|2;caddisfly|5|2;mayfly|3|3;leech|2|3;pond life|2|1;
    bulrush|4|2;water snail|2|2;carp|2|3;whirligig beetle|5|2;diving beetle|4|2;pond dipping|3|1;water strider|4|2`),
    { 'pond skater': [['water strider', 'synonym', 4, 2]], 'lily pad': [['lily leaf', 'synonym', 3, 2]], frogspawn: [['frog eggs', 'synonym', 2, 1]] }),
  taiga: withAl(W(`spruce|2|1;larch|4|1;birch|2|2;wolf|1|2;lynx|2|1;moose|1|1;sable|3|2|animal;Siberian tiger|3|1;pine|1|1|tree;fir|2|1;conifer|2|1;evergreen|2|1;boreal forest|3|1;snow|1|2;Siberia|2|1|place;
    Canada|1|3|place;brown bear|1|2;wolverine|3|1;elk|2|2;caribou|2|2;reindeer|1|3;snowshoe hare|3|1;owl|1|3;crossbill|5|2;capercaillie|5|2;lingonberry|4|3;cloudberry|5|3;muskeg|5|1;bog|2|3;
    permafrost|3|2;coniferous|3|1;pine cone|1|2;lumberjack|2|3;fur trapper|3|2;black bear|1|3;grey wolf|2|2;marten|4|2;Yukon|3|3|place;Lake Baikal|3|2|place;Alaska|1|3|place`),
    { 'boreal forest': [['snow forest', 'synonym', 4, 2]], 'grey wolf': [['gray wolf', 'spelling', 2, 2, ['US']]], elk: [['wapiti', 'synonym', 4, 3]] }),
  oasis: withAl(W(`date palm|2|1;well|1|2|water source;spring|1|2|water source;camel|1|1;caravan|2|1;shade|1|2;pool|1|1|water;nomad|2|1;palm tree|1|1;mirage|2|2;desert|1|2;water|1|2;sand|1|3|sediment;Bedouin|3|1;tent|1|2;
    trade route|3|1;Silk Road|2|2;Siwa|5|2|place;Palmyra|4|3|place;Timbuktu|3|3|place;fig tree|2|3;waterhole|2|1;camel train|3|1;rest stop|2|2;groundwater|3|3;aquifer|4|2;Tuareg|4|2;
    dromedary|3|2;tamarisk|5|3;acacia|2|3;irrigation|3|3;palm grove|3|1;Liwa|5|3|place;Tozeur|5|3|place`),
    { waterhole: [['water hole', 'spelling', 2, 1]], pool: [['watering place', 'synonym', 3, 2]] }),
  outback: withAl(W(`red dirt|2|1;spinifex|4|1;billabong|3|1;kangaroo|1|1;dingo|2|1;road train|3|1;station|2|2|farm;termite mound|3|1;Uluru|2|1|place;Ayers Rock|2|1|place;emu|2|2;bush|2|2|countryside;
    swagman|3|1;jackaroo|4|1;jillaroo|5|2;sheep station|3|1;cattle station|3|1;flying doctor|3|1;Alice Springs|3|1|place;Coober Pedy|4|1|place;wombat|2|3;galah|3|2;cockatoo|2|3;boomerang|2|2;
    didgeridoo|2|3;drover|3|1;ute|3|2;swag|3|1|bedroll;dry creek|3|2;gibber plain|5|1;mulga|5|1;saltbush|4|2;red kangaroo|3|2;thorny devil|4|1;brolga|5|3;Nullarbor|4|1|place;
    Kimberley|4|2|place;walkabout|3|2;dust storm|2|2;goanna|3|1`),
    { 'road train': [['road-train', 'spelling', 3, 1]], jackaroo: [['jackeroo', 'spelling', 4, 1]], swagman: [['swaggie', 'synonym', 4, 2]] }),
  andes: withAl(W(`llama|1|1;alpaca|2|1;condor|2|1;vicuna|4|1;glacier|1|3;terraces|3|2;altiplano|5|1;puna|5|1;Machu Picchu|2|1|place;Inca|2|1;Quechua|4|1;Aconcagua|4|1|place;Peru|1|2|place;
    Bolivia|2|3|place;Chile|1|3|place;Ecuador|2|3|place;Lake Titicaca|3|1|place;Cusco|3|1|place;Quito|3|2|place;La Paz|2|2|place;Cotopaxi|4|1|place;Chimborazo|5|1|place;guanaco|4|1;chinchilla|3|2;
    spectacled bear|4|1;Andean condor|3|1;quinoa|3|2;pan flute|3|2;poncho|2|2;cloud forest|3|2;salt flats|3|2;Atacama|3|3|desert|place;Patagonia|3|2|place;
    mountain range|1|2;Torres del Paine|4|3|place;rhea|4|3;Inca Trail|3|1;Sacred Valley|4|1|place`),
    { 'pan flute': [['panpipes', 'synonym', 3, 2]], llama: [['lama', 'spelling', 4, 3]], 'Machu Picchu': [['Machu Pichu', 'spelling', 3, 1]] }),
  prairie: withAl(W(`bison|2|1;prairie dog|2|1;pronghorn|4|1;tallgrass|4|1;tornado|1|2;ranch|1|2|farm;meadowlark|3|1;buffalo|1|1|bison;grassland|1|1;plains|2|1;Great Plains|2|1|place;covered wagon|2|1;pioneer|2|2;
    sod house|4|1;windmill|2|2;coyote|2|2;badger|2|3|animal;hawk|1|3;wheat|1|3;cornfield|1|3;sunflower|1|3;bluestem|5|1;switchgrass|4|2;coneflower|4|2;prairie chicken|4|1;sage grouse|4|2;
    black-footed ferret|5|2;burrowing owl|4|2;homesteader|3|2;sodbuster|5|2;cowboy|1|3;tumbleweed|2|3;Kansas|2|2|place;Nebraska|3|2|place;open range|3|2;steppe|3|3;
    prairie schooner|4|1;cattle drive|3|3;thunderstorm|2|3;Midwest|2|3|place`),
    { 'covered wagon': [['Conestoga wagon', 'synonym', 4, 2]] }),
};
