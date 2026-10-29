// Top-up batch 7. Format: tools/apply-words.mjs.
const PL = (o = {}) => ({ type: 'place', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
export const THEMES = {};
export const FIXES = [{ gloss: ['saltation', 'ways_to_jump', 'jump'] }];
export const DATA = {
  signs_of_autumn: [
    ['Michaelmas daisy', 4, 4], ['haws', 5, 4], ['abscission', 5, 5], ['senescence', 5, 5], ['equinoctial gales', 5, 4], ['Indian summer', 3, 3, { type: 'phrase' }],
    ['hazelnuts', 2, 2],
  ],
  signs_of_winter: [
    ['hoarfrost', 4, 3], ['rime', 5, 4], ['torpor', 4, 4], ['overwintering', 4, 4], ['hellebore', 4, 5], ['witch hazel', 4, 5], ['waxwings', 4, 4], ['winter aconite', 5, 5],
  ],
  nature_at_night: [
    ['kakapo', 4, 5], ['tarsier', 4, 4], ['crepuscular', 5, 4], ['horseshoe bat', 4, 4], ['eyeshine', 5, 5], ['churring', 5, 5], ["death's-head hawkmoth", 5, 5],
  ],
  monsoon_season: [
    ['petrichor', 4, 4], ['kharif', 5, 5], ['Cherrapunji', 5, 4, PL()], ['Mawsynram', 5, 5, PL()], ['rainfall', 1, 1],
  ],
  dry_season: [
    ['aestivation', 5, 5], ['Sahel', 4, 4, PL()], ['veld fire', 5, 4], ['lungfish', 4, 5], ['Llanos', 5, 4, PL()], ['dust bowl', 4, 4],
  ],
  metals: [
    ['lanthanum', 5, 5], ['cerium', 5, 5], ['europium', 5, 5], ['gadolinium', 5, 5], ['francium', 5, 5],
  ],
  rock_types: [
    ['greywacke', 5, 5], ['pegmatite', 5, 5], ['gritstone', 4, 4], ['ironstone', 4, 4], ['lignite', 4, 4], ['phyllite', 5, 5], ['amphibolite', 5, 5], ['dunite', 5, 5], ['ignimbrite', 5, 5],
  ],
  minerals: [
    ['halite', 4, 4], ['cassiterite', 5, 5], ['kyanite', 5, 5], ['stibnite', 5, 5], ['cuprite', 5, 5], ['realgar', 5, 5], ['wulfenite', 5, 5], ['rhodochrosite', 5, 5], ['scheelite', 5, 5], ['staurolite', 5, 5],
  ],
  mining_words: [
    ['winze', 5, 5], ['firedamp', 5, 5], ['blackdamp', 5, 5], ['afterdamp', 5, 5], ['sump', 5, 4], ['overburden', 4, 4], ['Davy lamp', 4, 3], ['longwall', 5, 5], ['pit pony', 3, 2],
    ['cave-in', 3, 3],
  ],
  volcano_words: [
    ['volcano', 1, 1], ['lava dome', 4, 4], ['pahoehoe', 5, 5], ['shield volcano', 3, 3], ['Stromboli', 4, 4, PL({ g: 'volcano' })], ['Plinian eruption', 5, 5], ['phreatic eruption', 5, 5], ['pillow lava', 5, 4],
  ],
  erosion_words: [
    ['saltation', 5, 5, { g: 'erosion' }], ['solifluction', 5, 5], ['exfoliation', 5, 4], ['plunge pool', 4, 4, { g: 'waterfall basin' }], ['badlands', 4, 4, { g: 'terrain' }], ['hoodoo', 4, 4], ['bluff', 4, 4, { g: 'landform' }],
    ['interlocking spurs', 5, 5], ['lateral erosion', 5, 5], ['cavitation', 5, 5],
  ],
  geothermal_words: [
    ['solfatara', 5, 5], ['mofette', 5, 5], ['Larderello', 5, 5, PL()], ['Wairakei', 5, 5, PL()], ['binary cycle', 5, 5], ['dry steam', 5, 5], ['geothermal gradient', 5, 4], ['geyser', 1, 1, { g: 'landform' }],
  ],
  soil_words: [
    ['pedology', 5, 5], ['rhizosphere', 5, 5], ['laterite', 5, 5], ['gley', 5, 5], ['hardpan', 5, 5], ['caliche', 5, 5], ['vertisol', 5, 5], ['terra preta', 5, 5], ['mycorrhiza', 5, 4], ['duff', 5, 5],
  ],
  water_cycle_words: [
    ['stemflow', 5, 5], ['throughfall', 5, 5], ['baseflow', 5, 5], ['overland flow', 5, 5], ['vadose zone', 5, 5], ['advection', 5, 5], ['atmospheric river', 4, 4], ['dew point', 4, 4], ['rainfall', 1, 1],
    ['recharge', 4, 5],
  ],
  ocean: [
    ['thermocline', 5, 5], ['halocline', 5, 5], ['upwelling', 5, 4], ['Mariana Trench', 4, 3, PL()], ['Challenger Deep', 5, 4, PL()], ['Sargasso Sea', 4, 4], ['vampire squid', 5, 4], ['gulper eel', 5, 4],
    ['marine snow', 5, 5], ['Gulf Stream', 3, 3], ['Arctic Ocean', 2, 1], ['Southern Ocean', 3, 2], ['sea', 1, 1],
  ],
  desert: [
    ['playa', 5, 4], ['inselberg', 5, 5], ['Taklamakan', 4, 3], ['Empty Quarter', 4, 4], ['jerboa', 4, 4], ['addax', 5, 5], ['gila monster', 4, 3], ['kangaroo rat', 4, 4], ['ocotillo', 5, 4],
  ],
  savanna: [
    ['aardvark', 4, 4], ['serval', 4, 4], ['caracal', 5, 4], ['hartebeest', 5, 4], ['dik-dik', 5, 4], ['hamerkop', 5, 5], ['marabou stork', 5, 4], ['rhino', 1, 1],
  ],
  polar_regions: [
    ['nunatak', 5, 5], ['polynya', 5, 5], ['brash ice', 5, 5], ['Adelie penguin', 5, 4, P()], ['Weddell seal', 5, 4], ['leopard seal', 4, 3], ['ptarmigan', 5, 4], ['musk ox', 4, 4], ['lemming', 4, 4],
    ['snow', 1, 1, { g: 'weather' }], ['ice', 1, 1, { g: 'frozen water' }],
  ],
  wetlands: [
    ['sedge', 4, 4], ['sundew', 4, 4], ['pitcher plant', 4, 4], ['marsh harrier', 5, 4], ['mire', 4, 4], ['sawgrass', 5, 4], ['Ramsar', 5, 4, P()], ['Okavango', 5, 4, PL()], ['Pantanal', 5, 3, PL()],
  ],
  mountains: [
    ['col', 5, 5, { g: 'mountain' }], ['serac', 5, 5], ['corrie', 5, 5], ['cwm', 5, 5, { g: 'valley' }], ['tarn', 4, 4], ['massif', 4, 4], ['chamois', 4, 4, { g: 'animal' }], ['marmot', 4, 4],
    ['edelweiss', 4, 3], ['crampons', 3, 3], ['orogeny', 5, 5],
  ],
  meadow: [
    ['yellow rattle', 5, 5], ['harebell', 4, 4], ['orchid', 3, 4], ['meadow brown', 4, 4], ['ragged robin', 5, 5], ['cuckoo flower', 5, 5], ["bird's-foot trefoil", 5, 5], ["lady's bedstraw", 5, 5],
    ['burnet moth', 5, 4], ["snake's head fritillary", 5, 5],
  ],
  pond: [
    ['water flea', 5, 4], ['daphnia', 5, 5], ['water scorpion', 5, 4], ['ramshorn snail', 5, 4], ['hornwort', 5, 5], ['damselfly', 3, 3], ['smooth newt', 4, 4], ['backswimmer', 5, 5], ['swan', 1, 2],
  ],
  taiga: [
    ['tamarack', 5, 5], ['black spruce', 5, 4], ['jack pine', 5, 5], ['great grey owl', 5, 4], ['Siberian jay', 5, 5], ['wood bison', 5, 5], ['Labrador tea', 5, 5], ['pine grosbeak', 5, 5],
    ['black bear', 1, 2], ['bear', 1, 2, { g: 'animal' }],
  ],
  oasis: [
    ['qanat', 5, 4], ['foggara', 5, 5], ['falaj', 5, 5], ['caravanserai', 5, 4], ['Kharga', 5, 5, PL()], ['Dakhla', 5, 5, PL()], ['Ein Gedi', 5, 4, PL()], ['Turpan', 5, 4, PL()], ['Al-Ahsa', 5, 4, PL()],
    ['date', 2, 2, { g: 'fruit' }],
  ],
  outback: [
    ['mallee', 5, 4], ['gidgee', 5, 5], ['bilby', 4, 4], ['perentie', 5, 4], ['Birdsville', 5, 4, PL()], ['Broken Hill', 4, 3, PL()], ['artesian bore', 5, 5], ['fossicking', 5, 4],
    ['wedge-tailed eagle', 4, 4], ['Pilbara', 4, 3, PL()], ['Kata Tjuta', 4, 3, PL()], ['stockman', 3, 3], ['sheep', 1, 2],
  ],
};
