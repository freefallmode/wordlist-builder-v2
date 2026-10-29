// Depth-3 batch: nature_earth chunk 3 (landscapes, seashore, weather, seasons in nature, gems and metals). Format: tools/apply-words.mjs.
// Row shorthand: text|rec|inRec|gloss|type
const W = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, g, ty] = x.split('|'); const o = {};
  if (g) o.g = g; if (ty) o.type = ty;
  return [t, +r, +i, o];
});
const withAl = (rows, al) => {
  for (const [t, a] of Object.entries(al)) { const r = rows.find(x => x[0] === t); if (!r) throw Error('no root ' + t); (r[3].al ||= []).push(...a); }
  return rows;
};

export const THEMES = {
  scottish_landscape_words: { d: 4, lang: true, region: ['UK'] }, island_types: { d: 3 }, seashells: { d: 2 }, rock_pool: { d: 2 }, beachcombing_finds: { d: 2 },
  coastal_features: { d: 2 }, coastal_plants: { d: 4 }, tides_and_currents: { d: 3 }, shipwreck_coast_words: { d: 3 }, wave_words: { d: 3 },
  rain_words: { d: 1, lang: true }, wind_words: { d: 2, lang: true }, storms: { d: 1 }, cloud_types: { d: 2 }, snow_and_ice: { d: 1 },
  weather_instruments: { d: 3 }, named_winds: { d: 5 }, forecast_words: { d: 2 }, sky_phenomena: { d: 3 }, hot_weather_words: { d: 1 },
  kinds_of_precipitation: { d: 1, complete: true }, signs_of_spring: { d: 1 }, signs_of_summer: { d: 1 }, signs_of_autumn: { d: 1 }, signs_of_winter: { d: 1 },
  nature_at_night: { d: 2 }, monsoon_season: { d: 3 }, dry_season: { d: 3 }, gemstones: { d: 2 }, metals: { d: 2 },
};

export const FIXES = [
  { gloss: ['turquoise', 'colors', 'color'] }, { gloss: ['cobalt', 'colors', 'color'] }, { gloss: ['chop', 'cooking', 'cut'] }, { gloss: ['ridge', 'landscapes', 'landform'] }, { gloss: ['cornice', 'architecture', 'architecture'] },
];

export const DATA = {
  scottish_landscape_words: W(`glen|2|1;loch|2|1;ben|3|2;burn|3|3|stream;brae|4|2;firth|4|2;strath|5|3;corrie|5|3;munro|3|3;moor|2|3;heather|2|3;highland|2|2;lowland|3|3;
    isle|3|3;kyle|5|4;machair|5|4;crag|3|3;tarn|4|4;bothy|4|4;cairn|3|3;lochan|5|3;carse|5|5;ness|4|3;Ben Nevis|2|3|mountain|place;
    skerry|5|5;kirk|4|5;peat bog|3|4;Glen Coe|3|3|valley|place;sea loch|4|4;sgurr|5|4;beinn|5|3;allt|5|3;abhainn|5|4;Loch Ness|1|3|lake|place;Glencoe|3|3|valley|place`),
  island_types: W(`volcanic island|3|1;coral island|3|1;barrier island|4|2;atoll|3|1;archipelago|3|2;islet|3|2;cay|4|2;key|2|3|island;tidal island|4|2;
    continental island|5|2;oceanic island|4|2;river island|4|3;island chain|3|2;desert island|1|3;sea stack|4|4;reef island|4|2;
    holm|5|4;eyot|5|4;ait|5|5;skerry|5|4;man-made island|3|3;floating island|3|4;sandy cay|5|4;island arc|5|3;mid-ocean island|5|3;
    hotspot island|5|3;tropical island|1|2;coral atoll|3|1;sand island|3|2;barrier reef island|5|3`),
  seashells: withAl(W(`conch|2|1;scallop|1|1;cockle|3|1;whelk|3|2;clam|2|2;abalone|3|1;nautilus|3|1;limpet|3|2;sand dollar|3|2;cowrie|3|1;oyster shell|2|1;mussel shell|2|2;
    periwinkle|3|2|sea snail;razor shell|3|2;top shell|4|2;cone shell|3|2;turban shell|4|2;auger shell|5|2;spindle shell|5|3;murex|4|3;tellin|5|3;slipper shell|5|3;
    moon snail|4|3;olive shell|5|3;spiral shell|2|2;angel wing|4|3;sundial shell|5|3;jingle shell|5|3;volute|5|4;tulip shell|5|3;chiton|5|4;pearl oyster|3|3;
    sea snail shell|3|2;queen conch|4|2;heart cockle|5|3`), { cowrie: [['cowry', 'spelling', 4, 3]], scallop: [['coquille', 'synonym', 5, 4]] }),
  rock_pool: W(`crab|1|1;starfish|1|1;limpet|3|1;sea anemone|2|1;barnacle|3|1;periwinkle|3|2|sea snail;shrimp|1|2;blenny|5|2;hermit crab|2|1;seaweed|1|2;mussel|2|2;
    sea urchin|3|2;prawn|2|2;winkle|3|2;dog whelk|4|2;goby|4|2;sea slug|3|2;brittle star|4|2;rockling|5|3;shanny|5|3;
    topshell|4|2;beadlet anemone|5|2;shore crab|4|1;sea snail|2|2;kelp|3|3;tide pool|3|1;sea lettuce|5|3;bladderwrack|4|3;
    sandhopper|4|3;chiton|5|4;sea cucumber|3|3;lobster|1|3;sea sponge|3|3;rock goby|5|3;tompot blenny|5|3`),
  beachcombing_finds: W(`driftwood|2|1;sea glass|2|1;pebbles|1|2;shells|1|1;mermaid's purse|4|2;cuttlebone|4|2;kelp|3|2;seaweed|1|2;sand dollar|3|2;starfish|1|3;
    flotsam|3|2;jetsam|4|2;message in a bottle|2|3;fishing net|2|3;rope|1|3;buoy|3|3;cork float|4|3;amber|3|3|fossil resin;sea bean|5|2;razor shell|3|3;crab shell|2|2;
    fossil|2|4;feather|1|4;whalebone|3|4;plastic bottle|1|4;sea urchin shell|4|3;beach pottery|5|3;glass float|4|3;pumice|4|3;ambergris|5|4;
    sea pottery|5|3;lost flip-flop|3|4;bottle top|2|4;lava rock|4|4`),
  coastal_features: W(`cliff|1|1;cove|2|1;bay|1|1;headland|3|1;peninsula|2|1;spit|4|2|landform;lagoon|2|2;estuary|3|2;delta|2|3|river;fjord|3|2;sea arch|3|1;sea stack|4|2;sea cave|3|2;
    beach|1|1;dune|2|2;sandbar|3|2;reef|2|2;inlet|3|2;cape|2|1|headland;promontory|4|2;tombolo|5|3;wave-cut platform|5|3;shingle bank|4|3;mudflat|3|2;salt marsh|3|2;
    sea wall|2|3;creek|2|3;bight|5|3;gulf|2|2;strait|3|2;isthmus|4|3;blowhole|4|3;barrier beach|5|3;raised beach|5|4;coast|1|2;shoreline|2|2;
    natural arch|3|2;cuspate foreland|5|3;shingle beach|3|1`),
  coastal_plants: W(`marram grass|4|2;sea holly|4|2;samphire|4|2;thrift|4|2;sea kale|4|2;sea lavender|4|2;mangrove|3|1;seaweed|1|3;sea buckthorn|4|2;kelp|3|3;eelgrass|4|3;
    sea pink|4|2;sea campion|5|2;sea beet|5|3;glasswort|5|2;saltwort|5|2;sea rocket|5|2;sea lettuce|5|3;bladderwrack|4|3;sea aster|5|3;sea purslane|5|3;
    sea spurge|5|3;sea bindweed|5|3;rock samphire|5|3;yellow horned poppy|5|3;beach pea|5|3;dune grass|4|3;sea oats|4|3;
    sea grape|4|2;coconut palm|2|3;bull kelp|4|3;oarweed|5|4;laver|5|4|seaweed;dulse|5|4;carrageen|5|4;sea fennel|5|3;sand sedge|5|4;marsh samphire|5|3`),
  tides_and_currents: W(`high tide|1|1;low tide|1|1;spring tide|3|1;neap tide|4|1;ebb|3|1;flood tide|3|2;slack water|4|2;rip current|3|1;undertow|3|1;gulf stream|3|1;eddy|3|2;
    tidal wave|2|3;tidal bore|5|2;riptide|3|1;current|1|2|water;tidal range|4|2;king tide|4|2;whirlpool|2|2;maelstrom|4|2;gyre|4|2;upwelling|5|2;longshore drift|5|3;
    el nino|3|3;la nina|4|3;humboldt current|5|3;kuroshio|5|3;tidal stream|4|2;ocean current|2|1;tide table|3|3;tidal race|5|2;backwash|4|3;tide|1|1;
    rising tide|2|1;falling tide|2|1;tidal flow|3|1;tidal surge|3|2;cross current|4|2;sea current|2|1`),
  shipwreck_coast_words: W(`lighthouse|1|1;reef|2|1;rocks|1|2;wreck|2|1;shoal|4|2;sandbank|3|2;breakers|3|2;foghorn|3|1;beacon|3|2;fog|1|3;gale|2|3;buoy|3|2;
    shipwreck|1|1;salvage|3|2;ghost ship|2|4;undertow|3|3;cliffs|1|3;lifeboat|2|2;distress flare|3|2;mayday|2|2;SOS|1|2|signal|acronym;
    marooned|3|3;castaway|2|3;run aground|3|2;wrecker|4|3;lighthouse keeper|2|2;lantern room|5|3;fog signal|4|2;
    skerries|5|3;sunken ship|1|2;coastguard|2|2;bell buoy|4|3;hidden rocks|2|1;treacherous reef|3|1;foundering|4|3;storm surge|3|3`),
  wave_words: W(`swell|3|1;breaker|3|1;ripple|2|2;surf|1|1;whitecap|3|1;crest|3|2|wave;trough|4|2|wave;tsunami|2|1;rogue wave|3|1;roller|3|1;wake|2|2|wave;chop|3|1|wave;spray|2|2;foam|2|2;
    undulation|5|3;tidal wave|2|2;barrel|3|2|wave;wavelength|4|3;amplitude|4|3;sea state|5|3;swash|5|2;backwash|4|3;spume|5|3;plunging wave|5|2;spilling wave|5|2;
    whitewater|3|2;lapping|4|3;wavelet|4|2;billow|4|2;comber|5|2;surge|2|3;seiche|5|3;wave train|5|3;ground swell|4|2;shorebreak|4|2;wash|3|3|wave;white horses|3|1`),
  rain_words: W(`drizzle|1|1;downpour|1|1;shower|1|1|rain;rain|1|1;cloudburst|3|1;deluge|3|1|rain;sprinkle|2|1;mizzle|4|1;torrent|3|2;pelting|3|2;pouring|1|1;monsoon|2|2;squall|3|3;
    spitting|2|2;rainfall|2|1;raindrop|1|1;puddle|1|3;rainy|1|1;soaking|2|2;bucketing|3|2;tipping down|2|2|idiom|phrase;
    raining cats and dogs|2|1|idiom|phrase;stair rods|5|2|idiom|phrase;heavy rain|1|1;light rain|1|1;rainstorm|2|1;flash flood|2|3;precipitation|3|2;
    chucking it down|4|2|idiom|phrase;lashing|3|2;teeming|4|2;sheeting|4|2;petrichor|4|3;spit and spot|5|3|idiom|phrase`),
  wind_words: W(`breeze|1|1;gust|2|1;gale|2|1;draught|3|3;zephyr|3|1;squall|3|2;blast|2|3;whirlwind|2|2;hurricane|1|2;howling|2|2;blustery|3|1;windy|1|1;
    tailwind|2|2;headwind|2|2;crosswind|3|2;updraft|4|2;downdraft|4|2;sea breeze|2|1;land breeze|3|1;trade wind|3|2;westerly|3|2;easterly|3|2;northerly|3|2;southerly|3|2;
    prevailing wind|4|2;jet stream|3|3;wind shear|4|2;breezy|2|1;gusty|2|1;flurry|3|3;puff|1|3;windswept|3|2;doldrums|4|3;roaring forties|5|3;
    windward|4|2;leeward|4|2;eddy|3|3;stiff breeze|3|1;fresh breeze|3|1`),
  storms: W(`thunderstorm|1|1;hurricane|1|1;tornado|1|1;blizzard|1|1;cyclone|2|1;typhoon|2|1;monsoon|2|2;hailstorm|2|1;sandstorm|2|1;snowstorm|1|1;squall|3|2;tempest|3|1;
    dust storm|2|1;ice storm|2|1;gale|2|2;supercell|4|2;derecho|5|2;nor'easter|4|2;twister|2|1|tornado;waterspout|3|2;thunder|1|2;lightning|1|2;storm surge|3|2;
    haboob|5|2;tropical storm|2|1;superstorm|3|1;firestorm|3|3;windstorm|2|1;electrical storm|2|1;downburst|5|2;microburst|5|2;bomb cyclone|4|2;
    cloudburst|3|2;rainstorm|2|1;tropical cyclone|3|1;storm|1|1`),
  cloud_types: withAl(W(`cumulus|2|1;cirrus|3|1;stratus|3|1;nimbus|3|1;cumulonimbus|3|1;altocumulus|4|1;altostratus|5|1;cirrocumulus|5|1;cirrostratus|5|1;nimbostratus|5|1;stratocumulus|5|1;
    thundercloud|3|2;anvil cloud|4|2;mammatus|5|2;lenticular|5|2;noctilucent|5|3;contrail|3|3;shelf cloud|5|2;roll cloud|5|2;wall cloud|5|2;
    storm cloud|1|2;rain cloud|1|1;cumulus congestus|5|2;virga|5|3;mackerel sky|4|2;castellanus|5|2;fractus|5|2;
    nacreous|5|2;fluffy cloud|1|2;cloud bank|3|2;banner cloud|5|3;pileus|5|3`), { cumulonimbus: [['thunderhead', 'synonym', 4, 3]], cirrus: [["mare's tails", 'synonym', 4, 3]] }),
  snow_and_ice: W(`snowflake|1|1;icicle|1|1;blizzard|1|2;frost|1|1;hail|2|3|weather;sleet|2|2;glacier|2|1;iceberg|1|1;snowdrift|3|1;avalanche|2|2;black ice|2|1;permafrost|3|2;snowball|1|1;
    snowman|1|2;ice sheet|3|1;pack ice|3|1;hoarfrost|4|1;rime|5|1;graupel|5|2;powder|2|2|snow;slush|2|1;snowpack|3|1;snowfall|1|1;ice floe|3|1;sea ice|3|1;
    ice cap|3|1;whiteout|3|2;firn|5|2;verglas|5|2;neve|5|2;flurry|3|2;snowline|3|2;ice crystal|2|1;freezing rain|3|2;snow shower|2|1;
    cornice|4|2|snow;ice shelf|3|1;crevasse|3|3;frozen lake|2|2;ice pellet|4|2;ice storm|2|1;pancake ice|5|2`),
  weather_instruments: withAl(W(`thermometer|1|1;barometer|2|1;anemometer|3|1;rain gauge|2|1;weather vane|2|1;hygrometer|4|1;windsock|2|1;weather balloon|2|2;weather radar|3|2;
    psychrometer|5|2;pyranometer|5|2;sunshine recorder|5|2;ceilometer|5|2;barograph|5|2;thermograph|5|2;stevenson screen|5|2;weather station|2|1;
    wet bulb thermometer|5|2;radiosonde|5|2;disdrometer|5|2;aneroid barometer|5|2;mercury barometer|4|2;snow gauge|4|2;
    cup anemometer|5|2;lightning detector|4|2;weathercock|3|2;doppler radar|3|2;sling psychrometer|5|3;thermohygrometer|5|2;
    wind gauge|3|1;max-min thermometer|5|3;wind sock|2|1;sunshine meter|5|2;storm glass|5|2;cloud camera|5|3`), { barometer: [['weather glass', 'synonym', 5, 3]], 'weather vane': [['weathervane', 'spelling', 2, 1]] }),
  named_winds: W(`mistral|3|2;sirocco|4|2;chinook|3|2;foehn|5|2;bora|5|2;harmattan|5|2;khamsin|5|2;santa ana|4|2;haboob|5|2;monsoon|2|3;trade wind|3|3;zephyr|3|3;
    nor'easter|4|3;levanter|5|2;tramontane|5|2;meltemi|5|2;simoom|5|2;shamal|5|2;pampero|5|2;williwaw|5|3;fremantle doctor|5|3;
    brickfielder|5|3;southerly buster|5|3;diablo wind|5|3;sundowner|4|3;chubasco|5|3;berg wind|5|3;zonda|5|3;etesian|5|3;gregale|5|3;libeccio|5|3;
    bise|5|3;helm wind|5|3;sharav|5|3;kona|5|4;purga|5|3;lodos|5|4;yamase|5|4;ostro|5|3;fohn|5|2;scirocco|4|2;cape doctor|5|3;mistral wind|3|2`),
  forecast_words: W(`front|2|2|weather;pressure|2|2|weather;isobar|4|1|weather map;humidity|2|1;outlook|2|1;dew point|3|1;wind chill|2|1;visibility|2|1;temperature|1|1|weather;forecast|1|1;high pressure|2|1;low pressure|2|1;
    cold front|2|1;warm front|2|1;occluded front|5|1;anticyclone|4|1;trough|4|2|weather;ridge|4|2|weather;heat index|3|1;UV index|3|1;chance of rain|1|1;
    precipitation|3|1;wind speed|1|1;wind direction|2|1;overnight low|2|1;daytime high|2|1;heat advisory|3|1;weather warning|2|1;
    weather watch|3|1;storm warning|2|1;flood watch|3|1;frost warning|3|1;synoptic chart|5|1;weather map|1|1;barometric pressure|3|1;
    mostly sunny|1|1;partly cloudy|1|1;scattered showers|2|1;isolated storms|3|1;meteorologist|2|2;weatherman|2|2;sunny spells|2|1;bright intervals|3|1;pressure system|3|1;gale warning|3|1`),
  sky_phenomena: W(`rainbow|1|1;aurora|3|1;halo|3|2|light;sundog|4|1;moonbow|4|1;mirage|2|1;green flash|4|1;crepuscular rays|5|1;northern lights|1|1;southern lights|3|1;aurora borealis|3|1;
    aurora australis|4|1;double rainbow|2|1;fogbow|5|1;glory|4|2|optical;brocken spectre|5|1;sun pillar|5|1;circumhorizontal arc|5|1;parhelion|5|1;sun halo|4|1;moon halo|3|1;
    shooting star|1|2;meteor shower|2|2;zodiacal light|5|2;airglow|5|1;noctilucent clouds|5|1;red sky|3|2;alpenglow|5|1;afterglow|4|2;
    earthshine|5|2;blue hour|4|2;golden hour|3|2;ball lightning|4|2;sprite|5|2|lightning;st elmo's fire|4|2;gegenschein|5|2;
    sunbeams|3|1;mock sun|5|1;sun dog|4|1;moon dog|5|1;light pillar|5|1;iridescent clouds|5|1`),
  hot_weather_words: W(`heatwave|1|1;scorching|2|1;sweltering|2|1;boiling|1|2;baking|2|2;blistering|3|1;sultry|3|1;muggy|2|1;humid|2|1;balmy|3|2;roasting|2|2;sizzling|2|1;stifling|3|1;
    swelter|3|1;torrid|4|1;oppressive|3|1;heat haze|3|1;heatstroke|2|2;sunburn|1|3;scorcher|3|1;hot spell|2|1;close|3|3|weather;sticky|2|2;steamy|2|2;
    heat dome|4|1;dog days|3|1;sunstroke|3|2;parched|3|3;sun-baked|3|2;hot and dry|1|1;
    heat index|3|2;sweat|1|3;summery|1|2;sunny|1|2;warm|1|2;broiling|3|1;searing|3|2;suffocating|3|2;tropical heat|2|1;heat advisory|3|2`),
  kinds_of_precipitation: W(`rain|1|1;drizzle|1|1;sleet|2|1;hail|2|1|weather;snow|1|1`),
  signs_of_spring: W(`buds|2|1;blossom|1|1;lambs|1|1;catkins|3|1;frogspawn|3|1;nesting|2|1;daffodils|1|1;crocus|2|1;snowdrops|3|1;tulips|1|1;bluebells|2|1;primroses|3|1;
    clocks going forward|2|2;longer days|1|1;spring showers|1|1;swallows return|3|1;cuckoo|2|2;tadpoles|2|1;bees emerging|3|2;fresh grass|2|1;green shoots|3|1;
    new leaves|1|1;baby birds|1|2;chicks|1|2;April showers|1|1;cherry blossom|1|1;ducklings|1|1;seedlings|2|1;
    hay fever|2|2;pollen|2|2;spring cleaning|1|3;maypole|3|3;wild garlic|4|2;pussy willow|3|1;sap rising|4|1;birdsong|2|1;blackbird song|4|2;migrating birds|2|2`),
  signs_of_summer: W(`long days|1|1;heat haze|2|1;ripe berries|2|1;bees|1|1;hay|2|1;thunderstorms|2|1;sunflowers|1|1;sunshine|1|1;strawberries|1|1;barbecues|1|2;ice cream|1|2;
    sunburn|1|2;picnics|1|1;swallows|3|2;dragonflies|3|1;butterflies|1|1;cicadas|3|1;fireflies|2|1;crickets|2|1;wasps|1|2;insect bites|2|2;
    wildflowers|2|1;haymaking|3|1;midsummer|3|1;solstice|3|1;sun hat|1|2;paddling pool|1|2;fruit ripening|2|1;
    lavender|2|2|flower;heatwave|1|1;late sunsets|2|1;golden fields|2|2;grasshoppers|2|1;sweet peas|3|1;summer storm|2|1;sandcastles|2|2;sprinklers|2|2;school holidays|1|3`),
  signs_of_autumn: W(`falling leaves|1|1;acorns|2|1;conkers|2|1;migration|2|1;frost|1|2;fungi|2|1;harvest|1|1;red leaves|1|1;mushrooms|1|1;pumpkins|1|1;shorter days|1|1;spiders' webs|3|1;
    mist|2|2;geese flying south|2|1;squirrels hoarding|3|1;hedgehog hibernating|3|2;rutting stags|4|1;berries|1|2;blackberries|2|2;bonfire|2|3;harvest moon|2|1;
    equinox|3|2;apples|1|2;leaf fall|2|1;woodsmoke|3|2;chestnuts|2|1;beech mast|5|1;scarlet leaves|3|1;swallows leaving|3|1;toadstools|3|1;
    cobwebs|2|1;clocks going back|2|2;darker evenings|1|1;crisp air|2|2;stubble fields|4|2;ploughing|3|2;
    leaf peeping|3|1;harvest festival|2|1;sloes|4|2;rosehips|3|1`),
  signs_of_winter: W(`frost|1|1;icicles|1|1;bare trees|1|1;hibernation|2|1;snow|1|1;short days|1|1;holly|2|2;snowflakes|1|1;ice|1|1;freezing fog|3|1;frozen puddles|2|1;frozen pond|2|1;
    bare branches|1|1;evergreen|2|2;mistletoe|2|2;robin|1|3;sleet|2|2;cold snap|2|1;long nights|1|1;winter solstice|3|1;snowdrops|3|2;
    steaming breath|2|1;chilblains|4|3;gritters|3|2;ice on windscreen|2|2;sledging|2|2;bird feeders|3|3;redwings|5|2;fieldfares|5|2;
    hard frost|2|1;black ice|2|2;dormant plants|3|1;leafless trees|2|1;woolly hats|1|3;snowdrift|3|1;thaw|2|2;short daylight|2|1;frozen ground|2|1`),
  nature_at_night: W(`owls|1|1;bats|1|1;moths|2|1;fireflies|2|1;dew|2|1;moonlight|1|1;glowworms|3|1;hedgehogs|2|1;foxes|1|2;badgers|2|2;stars|1|1;nightingale|3|1;crickets|2|1;
    nightjar|4|1;moon|1|1;night-blooming flowers|4|2;toads|2|3;owl hoot|2|1;nocturnal animals|2|1;bioluminescence|3|1;
    constellations|2|2;shooting stars|1|2;lightning bugs|2|1;night sky|1|1;tawny owl|3|1;barn owl|2|1;pipistrelle|5|1;
    noctule|5|1;moonflower|3|1;evening primrose|4|2;tree frogs|3|2;hawkmoth|4|2;luna moth|4|1;night heron|4|2;raccoons|2|2;
    moonbeams|3|1;starlight|2|1;luminous algae|5|2;fox cubs|2|3;firefly squid|5|3;moth trap|4|3`),
  monsoon_season: W(`downpour|1|1;flood|1|1|weather;paddy fields|3|1;leeches|3|1;humidity|2|1;puddles|1|1;umbrellas|1|1;mud|1|2;rain clouds|1|1;wet season|2|1;torrential rain|2|1;landslide|2|2;
    flash flood|2|1;monsoon winds|3|1;mildew|3|2;rice planting|3|1;overflowing rivers|3|1;waterlogged|3|1;mosquitoes|1|3;dengue|3|3;raincoat|1|2;wellies|2|3;
    thunderclap|2|2;rainy season|1|1;swollen river|3|1;rice terraces|3|2;sandbags|3|2;mould|2|3;damp|2|2;steamy|2|2;
    rain-soaked|2|1;pouring rain|1|1;southwest monsoon|4|1;northeast monsoon|5|1;onset of monsoon|4|1;banana leaves|3|4;tropical rain|2|1;
    cloudburst|3|1;rain shower|1|1;muddy roads|2|1;wet markets|4|4`),
  dry_season: W(`drought|2|1;dust|1|1;waterhole|3|1;cracked earth|3|1;bushfire|2|1;migration|2|2;thorn scrub|4|1;dry riverbed|3|1;parched land|3|1;dust devil|3|2;wildfire|2|1;heat|1|2;
    savanna|2|2;wilting crops|3|1;dry grass|1|1;water shortage|2|1;hosepipe ban|3|1;water rationing|3|1;scorched grass|3|1;harmattan|5|1;baked ground|3|1;
    dry wells|3|1;dry spell|2|1;low rivers|2|1;clear skies|1|2;cloudless sky|1|2;dry wind|2|1;dust storm|2|2;brown grass|2|1;
    fire season|3|1;cracked mud|2|1;shrinking lake|3|1;baobab|3|3;acacia|3|3;wildebeest migration|2|2;watering hole|3|1;dry creek|3|1;wadi|4|2;arroyo|5|2;
    dust cloud|2|1;rain dance|2|3;lack of rain|1|1`),
  gemstones: W(`diamond|1|1|gem;ruby|1|1|gem;emerald|1|1|gem;sapphire|1|1|gem;amethyst|2|1;opal|2|1;topaz|2|1;garnet|2|1;pearl|1|3|gem;turquoise|2|2|gem;jade|2|2|gem;aquamarine|3|1;peridot|3|1;citrine|3|2;
    onyx|3|2|gem;moonstone|3|2;tanzanite|4|1;alexandrite|5|1;tourmaline|4|1;spinel|5|1;zircon|4|2;lapis lazuli|3|2;tiger's eye|3|2;bloodstone|4|2;carnelian|4|2;agate|3|2;
    jasper|4|2;obsidian|3|3;amber|2|3|fossil resin;coral|2|4|gem;malachite|4|2;beryl|4|1;morganite|5|1;kunzite|5|1;iolite|5|1;sunstone|4|2;labradorite|4|2;rose quartz|3|2;
    smoky quartz|4|2;rhodonite|5|2;sodalite|5|2;chrysoprase|5|2;heliodor|5|2;tsavorite|5|2;demantoid|5|2;benitoite|5|2;cat's eye|3|3;black opal|3|2;jet|4|3|gem;
    chalcedony|5|2;fire opal|4|2;star sapphire|4|2;cubic zirconia|3|4;quartz|2|2;birthstone|2|3;larimar|5|2;ametrine|5|2;rubellite|5|2;hiddenite|5|2;apatite|5|2`),
  metals: withAl(W(`iron|1|1;copper|1|1|metal;tin|1|2;lead|1|2|metal;zinc|2|1;nickel|2|1;aluminum|1|1;platinum|2|1;titanium|2|1;mercury|2|3|element;chromium|3|1;cobalt|3|2|metal;tungsten|3|1;
    magnesium|2|2;manganese|4|1;lithium|2|2;sodium|2|3;potassium|2|3;calcium|2|3;uranium|2|2;plutonium|3|2;bismuth|4|1;cadmium|4|1;antimony|4|1;palladium|4|1;rhodium|5|1;iridium|5|1;
    osmium|5|1;gallium|4|1;indium|5|1;vanadium|4|1;molybdenum|5|1;zirconium|4|1;tantalum|5|1;niobium|5|1;rhenium|5|1;ruthenium|5|1;thallium|5|1;beryllium|4|1;barium|4|2;
    strontium|4|2;cesium|4|2;rubidium|5|2;hafnium|5|1;steel|1|3;bronze|1|3|metal;brass|1|3;pewter|3|3;solder|3|3;electrum|5|3;nichrome|5|3;gunmetal|4|3;duralumin|5|3;
    stainless steel|1|3;cast iron|2|2;wrought iron|3|2;pig iron|4|2;sterling silver|3|3;white gold|2|3;rose gold|2|3;gold|1|1|metal;silver|1|1|metal;radium|3|2;
    polonium|4|2;thorium|4|2;scandium|5|1;yttrium|5|1;neodymium|4|1`), { aluminum: [['aluminium', 'spelling', 2, 1, ['UK']]] }),
};
