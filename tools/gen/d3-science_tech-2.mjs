// Generated word data: Science & Tech chunk 2 (biology vocabulary, space, math).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const v = (o = {}) => ({ pos: 'verb', ...o });
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const PR = (o = {}) => ({ type: 'proper', ...o });
const ACR = (o = {}) => ({ type: 'acronym', ...o });
const PER = (o = {}) => ({ type: 'person', ...o });
const M = 'math';

export const THEMES = {
  classification_words: { d: 4 }, evolution_words: { d: 3 }, ecology_words: { d: 3 }, life_cycle_words: { d: 2 }, microscope_parts: { d: 2 },
  phases_of_mitosis: { d: 4 }, kingdoms_of_life: { d: 3 }, taxonomic_ranks: { d: 3 },
  planets: { d: 1 }, moons: { d: 3 }, constellations: { d: 3 }, southern_sky: { d: 5 }, space_missions: { d: 3 }, astronomy_terms: { d: 3 }, stars: { d: 3 },
  space_rocks: { d: 2 }, spaceflight_words: { d: 2 }, moon_phases_and_moods: { d: 3 }, galaxies_and_nebulae: { d: 3 }, dwarf_planets: { d: 2 },
  phases_of_the_moon: { d: 2 }, types_of_galaxy: { d: 4 },
  math_terms: { d: 2 }, numbers: { d: 1 }, number_types: { d: 2 }, big_numbers: { d: 2 }, geometry: { d: 2 }, fractions: { d: 1 }, math_operations: { d: 1 }, algebra_words: { d: 3 },
};

export const DATA = {
  // ---------------------------------------------------------------- biology
  classification_words: [
    ['classification', 2, 1], ['classify', 2, 2, v()], ['taxonomy', 3, 1], ['species', 2, 2], ['genus', 3, 1], ['subspecies', 4, 2], ['hybrid', 2, 3],
    ['breed', 2, 4], ['variety', 2, 4, { g: 'biology' }], ['taxon', 5, 2], ['clade', 5, 3], ['cladistics', 5, 3], ['phylogeny', 5, 3], ['nomenclature', 4, 2],
    ['binomial', 4, 2, { g: 'biology' }], ['Linnaeus', 3, 2, PER({ al: [['Carl Linnaeus', 'synonym', 3, 2]] })], ['Latin name', 2, 1], ['scientific name', 2, 1],
    ['common name', 2, 2], ['specimen', 2, 3], ['type specimen', 5, 3], ['dichotomous key', 4, 2], ['field guide', 2, 4], ['herbarium', 4, 4],
    ['taxonomist', 4, 2], ['group', 1, 5, { g: 'biology' }], ['category', 2, 4, { g: 'biology' }], ['order', 1, 4, { g: 'taxonomy' }], ['family', 1, 4],
    ['kingdom', 2, 3], ['sort', 1, 5, v({ g: 'classify' })], ['lump and split', 5, 4], ['monophyletic', 5, 4, adj()], ['cladogram', 5, 3],
    ['Systema Naturae', 5, 4, PR()],
  ],
  evolution_words: [
    ['evolution', 1, 1], ['evolve', 1, 1, v()], ['natural selection', 2, 1], ['adaptation', 2, 2], ['adapt', 1, 2, v()], ['mutation', 2, 2], ['ancestor', 1, 3],
    ['species', 2, 3], ['extinction', 2, 2], ['extinct', 2, 3, adj()], ['fossil', 1, 3], ['Darwin', 1, 1, PER({ al: [['Charles Darwin', 'synonym', 1, 1]] })],
    ['Galapagos', 3, 3, { type: 'place' }], ["Darwin's finches", 4, 2, PR()], ['missing link', 2, 3], ['common ancestor', 3, 2], ['speciation', 4, 3], ['gene pool', 3, 3],
    ['genetic drift', 4, 3], ['inheritance', 2, 4], ['offspring', 2, 4], ['trait', 3, 3], ['variation', 3, 4], ['vestigial', 4, 3, adj()], ['homology', 5, 4],
    ['convergence', 4, 4], ['transitional fossil', 4, 3], ['Lamarck', 4, 4, PER()], ['Origin of Species', 3, 2, { type: 'title' }], ['hominid', 3, 3],
    ['Homo sapiens', 2, 3, PR()], ['Neanderthal', 2, 3], ['artificial selection', 4, 3], ['selective breeding', 3, 3], ['mimicry', 3, 4], ['camouflage', 2, 4],
    ['mass extinction', 3, 3], ['common descent', 4, 3], ['allele', 4, 4], ['gradualism', 5, 4]
  ],
  ecology_words: [
    ['ecosystem', 2, 1], ['ecology', 2, 1], ['food chain', 1, 1], ['food web', 2, 1], ['predator', 1, 1], ['prey', 1, 1], ['producer', 2, 2, { g: 'ecology' }],
    ['consumer', 2, 2, { g: 'ecology' }], ['decomposer', 3, 1], ['niche', 3, 2, { g: 'ecology' }], ['symbiosis', 3, 2], ['habitat', 1, 1], ['biome', 2, 1],
    ['population', 2, 3, { g: 'ecology' }], ['community', 2, 4, { g: 'ecology' }], ['herbivore', 2, 2], ['carnivore', 1, 2], ['omnivore', 3, 2], ['scavenger', 2, 2],
    ['parasite', 2, 2], ['host', 2, 4, { g: 'organism' }], ['mutualism', 4, 2], ['commensalism', 5, 3], ['biodiversity', 3, 2], ['trophic level', 4, 3],
    ['biomass', 3, 3], ['carrying capacity', 4, 3], ['keystone species', 4, 3], ['invasive species', 3, 3], ['apex predator', 3, 2], ['detritivore', 5, 3],
    ['autotroph', 4, 3], ['heterotroph', 5, 3], ['succession', 3, 4, { g: 'ecology' }], ['climax community', 5, 4], ['nutrient cycle', 3, 3], ['carbon cycle', 2, 3],
    ['conservation', 2, 3], ['endangered', 2, 3, adj()], ['native species', 3, 3],
  ],
  life_cycle_words: [
    ['larva', 2, 1], ['pupa', 3, 1], ['chrysalis', 3, 1], ['cocoon', 2, 2], ['tadpole', 1, 1], ['nymph', 3, 2], ['metamorphosis', 2, 1], ['seedling', 2, 2],
    ['caterpillar', 1, 1], ['egg', 1, 2], ['hatchling', 3, 2], ['fingerling', 5, 3], ['froglet', 3, 2], ['elver', 5, 3],
    ['grub', 2, 2, { g: 'larva' }], ['maggot', 2, 2], ['imago', 5, 3], ['instar', 5, 4], ['smolt', 5, 4], ['parr', 5, 4], ['naiad', 5, 4],
    ['germination', 3, 2], ['pupate', 4, 2, v()], ['molt', 3, 3, v({ al: [['moult', 'spelling', 3, 3, ['UK']]] })], ['hatch', 1, 2, v()], ['juvenile', 2, 3],
    ['life cycle', 2, 1, { al: [['lifecycle', 'spelling', 3, 2]] }], ['sapling', 2, 3], ['fledgling', 3, 3], ['wriggler', 5, 4, { g: 'mosquito larva' }],
    ['spawn', 2, 3, { g: 'eggs' }], ['sprout', 1, 3, v({ g: 'plant' })], ['seed', 1, 3, { g: 'plant' }], ['adult', 1, 3, { g: 'life stage' }], ['larvae', 3, 2],
    ['mature', 2, 4, v()], ['emerge', 2, 3, v()], ['cygnet', 3, 4, { g: 'young swan' }],
  ],
  microscope_parts: [
    ['eyepiece', 3, 1, { al: [['ocular', 'synonym', 5, 3]] }], ['objective lens', 3, 1, { al: [['objective', 'synonym', 4, 2, [], { g: 'lens' }]] }], ['stage', 2, 2, { g: 'microscope' }],
    ['slide', 1, 2, { g: 'microscope' }], ['coverslip', 3, 1, { al: [['cover slip', 'spelling', 3, 1], ['cover glass', 'synonym', 5, 4]] }], ['focus knob', 3, 1],
    ['nosepiece', 4, 1, { al: [['revolving nosepiece', 'synonym', 4, 2]] }], ['condenser', 4, 2], ['diaphragm', 4, 2, { g: 'microscope' }], ['light source', 2, 3],
    ['mirror', 1, 4, { g: 'microscope' }], ['arm', 1, 3, { g: 'microscope' }], ['base', 1, 4, { g: 'microscope' }], ['stage clip', 4, 2], ['coarse focus', 3, 2],
    ['fine focus', 3, 2], ['body tube', 4, 3], ['iris diaphragm', 4, 3], ['illuminator', 4, 3], ['mechanical stage', 4, 3],
    ['specimen', 2, 3], ['aperture', 3, 4, { g: 'microscope' }], ['adjustment knob', 3, 2], ['lens', 1, 3], ['stage controls', 4, 3], ['magnification dial', 4, 4],
    ['head', 1, 4, { g: 'microscope' }], ['field lens', 5, 4],
  ],
  phases_of_mitosis: [
    ['prophase', 3, 3], ['metaphase', 3, 3], ['anaphase', 3, 3], ['telophase', 3, 3],
  ],
  kingdoms_of_life: [
    ['animals', 1, 2], ['plants', 1, 2], ['fungi', 2, 3], ['protists', 4, 3, { al: [['protista', 'synonym', 5, 4]] }], ['bacteria', 2, 3, { al: [['monera', 'synonym', 5, 4]] }], ['archaea', 4, 4],
  ],
  taxonomic_ranks: [
    ['domain', 3, 4, { g: 'taxonomy' }], ['kingdom', 2, 3], ['phylum', 4, 3, { al: [['division', 'synonym', 4, 5, [], { g: 'taxonomy' }]] }], ['class', 2, 3, { g: 'taxonomy' }],
    ['order', 1, 3, { g: 'taxonomy' }], ['family', 1, 3], ['genus', 3, 2], ['species', 2, 2],
  ],

  // ---------------------------------------------------------------- space
  planets: [
    ['Mercury', 1, 1, { g: 'planet' }], ['Venus', 1, 1], ['Earth', 1, 1], ['Mars', 1, 1], ['Jupiter', 1, 1], ['Saturn', 1, 1], ['Uranus', 1, 1], ['Neptune', 1, 1],
  ],
  moons: [
    ['Moon', 1, 2, PR({ al: [['Luna', 'synonym', 3, 3]] })], ['Phobos', 3, 2, PR()], ['Deimos', 3, 2, PR()], ['Io', 3, 2, PR({ g: 'moon' })],
    ['Europa', 3, 2, PR({ g: 'moon' })], ['Ganymede', 3, 2, PR()], ['Callisto', 3, 2, PR()], ['Titan', 3, 2, PR({ g: 'moon' })], ['Enceladus', 4, 3, PR()],
    ['Mimas', 5, 4, PR()], ['Rhea', 4, 4, PR({ g: 'moon' })], ['Iapetus', 5, 4, PR()], ['Dione', 5, 4, PR()], ['Tethys', 5, 4, PR()], ['Hyperion', 5, 4, PR({ g: 'moon' })],
    ['Phoebe', 5, 4, PR({ g: 'moon' })], ['Titania', 4, 4, PR({ g: 'moon' })], ['Oberon', 4, 4, PR({ g: 'moon' })], ['Miranda', 4, 4, PR({ g: 'moon' })],
    ['Ariel', 4, 4, PR({ g: 'moon' })], ['Umbriel', 5, 4, PR()], ['Triton', 3, 3, PR({ g: 'moon' })], ['Nereid', 5, 4, PR({ g: 'moon' })], ['Charon', 3, 3, PR({ g: 'moon' })],
    ['Proteus', 5, 4, PR({ g: 'moon' })], ['Amalthea', 5, 4, PR()], ['Himalia', 5, 5, PR()], ['Puck', 5, 4, PR({ g: 'moon' })], ['Janus', 5, 4, PR({ g: 'moon' })],
    ['Pandora', 5, 4, PR({ g: 'moon' })], ['Callirrhoe', 5, 5, PR()], ['Nix', 5, 5, PR({ g: 'moon' })],
    ['natural satellite', 4, 3], ['moonlet', 5, 3],
  ],
  constellations: [
    ['Orion', 2, 2, PR({ g: 'constellation' })], ['Ursa Major', 3, 2, PR({ al: [['Great Bear', 'synonym', 3, 3], ['Big Dipper', 'synonym', 2, 4, [], { g: 'asterism' }]] })],
    ['Ursa Minor', 3, 2, PR({ al: [['Little Bear', 'synonym', 3, 3], ['Little Dipper', 'synonym', 3, 4, [], { g: 'asterism' }]] })], ['Cassiopeia', 3, 2, PR()], ['Andromeda', 3, 3, PR({ g: 'constellation' })],
    ['Perseus', 4, 3, PR()], ['Pegasus', 3, 3, PR()], ['Draco', 4, 3, PR({ g: 'constellation' })], ['Lyra', 4, 3, PR({ g: 'constellation' })],
    ['Cygnus', 4, 3, PR({ g: 'constellation' })], ['Aquila', 4, 4, PR({ g: 'constellation' })], ['Hercules', 3, 4, PR({ g: 'constellation' })], ['Bootes', 5, 4, PR()],
    ['Canis Major', 3, 3, PR()], ['Ophiuchus', 4, 3, PR()], ['Centaurus', 4, 3, PR()], ['Auriga', 4, 4, PR()], ['Cepheus', 5, 4, PR()], ['Corona Borealis', 4, 4, PR()],
    ['Crux', 4, 3, PR({ g: 'constellation', al: [['Southern Cross', 'synonym', 2, 2]] })], ['Delphinus', 5, 4, PR()], ['Eridanus', 5, 4, PR()], ['Lepus', 5, 4, PR()], ['Pavo', 5, 5, PR()],
    ['Tucana', 5, 5, PR()], ['Carina', 5, 4, PR({ g: 'constellation' })],
    ['Aries', 2, 3, PR({ g: 'constellation' })], ['Taurus', 2, 3, PR({ g: 'constellation' })], ['Gemini', 2, 3, PR({ g: 'constellation' })], ['Cancer', 2, 4, PR({ g: 'constellation' })],
    ['Leo', 2, 3, PR({ g: 'constellation' })], ['Virgo', 2, 3, PR({ g: 'constellation' })], ['Libra', 2, 3, PR({ g: 'constellation' })],
    ['Scorpius', 4, 3, PR({ al: [['Scorpio', 'synonym', 2, 3, [], { g: 'constellation' }]] })], ['Sagittarius', 3, 3, PR()],
    ['Capricornus', 5, 4, PR({ al: [['Capricorn', 'synonym', 2, 3, [], { g: 'constellation' }]] })], ['Aquarius', 2, 3, PR({ g: 'constellation' })], ['Pisces', 2, 3, PR({ g: 'constellation' })],
  ],
  southern_sky: [
    ['Crux', 4, 3, PR({ g: 'constellation' })], ['Alpha Centauri', 3, 2, PR({ g: 'star', al: [['Rigil Kentaurus', 'synonym', 5, 4]] })], ['Proxima Centauri', 3, 3, PR({ g: 'star' })],
    ['Canopus', 4, 3, PR({ g: 'star' })], ['Magellanic Clouds', 3, 2, PR()], ['Achernar', 5, 4, PR()], ['Beta Centauri', 5, 4, PR({ g: 'star', al: [['Hadar', 'synonym', 5, 5]] })],
    ['Alpha Crucis', 5, 4, PR({ al: [['Acrux', 'synonym', 5, 4]] })], ['Mimosa', 5, 5, PR({ g: 'star' })], ['Coalsack', 5, 4, PR()], ['Carina Nebula', 4, 3, PR()],
    ['Eta Carinae', 5, 5, PR()], ['Omega Centauri', 4, 4, PR()], ['Tarantula Nebula', 4, 4, PR()], ['Jewel Box', 5, 5, PR({ g: 'star cluster' })], ['False Cross', 5, 4, PR()],
    ['Centaurus', 4, 3, PR()], ['Scorpius', 4, 4, PR()], ['Sagittarius', 3, 4, PR()], ['Carina', 5, 4, PR({ g: 'constellation' })], ['Vela', 5, 4, PR({ g: 'constellation' })],
    ['Pavo', 5, 5, PR()], ['Tucana', 5, 5, PR()], ['Dorado', 5, 4, PR()], ['Volans', 5, 5, PR()], ['Musca', 5, 5, PR()], ['Apus', 5, 5, PR()], ['Octans', 5, 4, PR()],
    ['Hydrus', 5, 5, PR()], ['Mensa', 5, 5, PR()], ['Reticulum', 5, 5, PR()], ['Triangulum Australe', 5, 5, PR()], ['Chamaeleon', 5, 4, PR()],
    ['Phoenix', 4, 4, PR({ g: 'constellation' })], ['Telescopium', 5, 5, PR()],
  ],
  space_missions: [
    ['Apollo 11', 1, 1, PR()], ['Apollo 13', 2, 2, PR()], ['Apollo program', 2, 1, PR()], ['Sputnik', 2, 1, PR()], ['Voyager', 2, 2, PR({ g: 'probe' })],
    ['Hubble', 2, 3, PR({ g: 'telescope' })], ['Challenger', 2, 3, PR({ g: 'space shuttle' })], ['Columbia', 3, 3, PR({ g: 'space shuttle' })],
    ['Discovery', 2, 4, PR({ g: 'space shuttle' })], ['Space Shuttle', 1, 2, PR()], ['Endeavour', 3, 4, PR({ g: 'space shuttle' })],
    ['Gemini', 3, 3, PR({ g: 'NASA program' })], ['Project Mercury', 3, 2, PR()], ['Skylab', 3, 1, PR()], ['Mir', 3, 2, PR({ g: 'space station' })], ['Salyut', 5, 4, PR()],
    ['Vostok 1', 4, 2, PR()], ['Curiosity rover', 3, 3, PR()], ['Perseverance', 3, 3, PR({ g: 'rover' })], ['Opportunity', 4, 3, PR({ g: 'rover' })],
    ['Spirit', 4, 4, PR({ g: 'rover' })], ['Sojourner', 4, 3, PR({ g: 'rover' })], ['Pioneer 10', 4, 3, PR()], ['Viking', 4, 4, PR({ g: 'Mars probe' })],
    ['Cassini', 3, 2, PR()], ['Galileo', 4, 3, PR({ g: 'probe' })], ['Juno', 4, 3, PR({ g: 'probe' })], ['New Horizons', 3, 2, PR()], ['Rosetta', 4, 3, PR({ g: 'probe' })],
    ['Magellan', 5, 4, PR({ g: 'probe' })], ['Mariner', 4, 3, PR()], ['Artemis', 3, 3, PR({ g: 'NASA program' })], ['Soyuz', 3, 2, PR()], ['ISS', 2, 2, ACR()],
    ['Hayabusa', 5, 4, PR()], ['Chandrayaan', 5, 4, PR()], ['James Webb', 3, 2, PR({ g: 'telescope' })], ['Kepler', 4, 3, PR({ g: 'telescope' })],
    ['moon landing', 1, 2], ['Space Race', 2, 3, PR()],
  ],
  astronomy_terms: [
    ['telescope', 1, 1], ['observatory', 2, 1], ['orbit', 1, 2], ['light-year', 2, 1, { al: [['light year', 'spelling', 2, 1]] }], ['parsec', 3, 2], ['eclipse', 1, 2],
    ['solar eclipse', 2, 2], ['lunar eclipse', 2, 2], ['equinox', 3, 3], ['solstice', 3, 3], ['zenith', 3, 2], ['magnitude', 3, 2], ['redshift', 3, 2],
    ['black hole', 1, 2], ['supernova', 2, 2], ['nova', 3, 2], ['quasar', 3, 2], ['pulsar', 3, 2], ['neutron star', 3, 2], ['dark matter', 2, 3], ['dark energy', 3, 3],
    ['Big Bang', 1, 3], ['cosmos', 2, 3, { g: 'universe' }], ['universe', 1, 3], ['celestial', 3, 2, adj()], ['sidereal', 5, 3, adj()], ['ecliptic', 4, 3], ['azimuth', 4, 3], ['declination', 5, 3],
    ['right ascension', 5, 3], ['apogee', 4, 3, { g: 'orbit' }], ['perigee', 4, 3], ['aphelion', 5, 3], ['perihelion', 5, 3], ['albedo', 4, 4], ['transit', 3, 4, { g: 'astronomy' }],
    ['occultation', 5, 4], ['conjunction', 4, 4, { g: 'astronomy' }], ['opposition', 3, 5, { g: 'astronomy' }], ['event horizon', 3, 3],
   
  ],
  stars: [
    ['Sun', 1, 2, { al: [['Sol', 'synonym', 4, 4]] }], ['Sirius', 2, 1, PR({ g: 'star', al: [['Dog Star', 'synonym', 3, 3]] })],
    ['Polaris', 2, 1, PR({ g: 'star', al: [['North Star', 'synonym', 1, 1], ['Pole Star', 'synonym', 4, 3]] })], ['Vega', 3, 2, PR({ g: 'star' })], ['Betelgeuse', 3, 2, PR()],
    ['Rigel', 3, 2, PR({ g: 'star' })], ['Antares', 4, 2, PR()], ['Arcturus', 4, 3, PR({ g: 'star' })], ['Aldebaran', 4, 3, PR()], ['Capella', 4, 3, PR({ g: 'star' })],
    ['Procyon', 4, 3, PR()], ['Altair', 4, 3, PR({ g: 'star' })], ['Deneb', 4, 3, PR()], ['Spica', 4, 3, PR()], ['Pollux', 4, 3, PR({ g: 'star' })], ['Castor', 4, 3, PR({ g: 'star' })],
    ['Regulus', 4, 3, PR()], ['Canopus', 4, 3, PR({ g: 'star' })], ['Alpha Centauri', 3, 2, PR({ g: 'star' })], ['Proxima Centauri', 3, 3, PR({ g: 'star' })],
    ['Achernar', 5, 4, PR()], ['Fomalhaut', 5, 4, PR()], ['Bellatrix', 5, 4, PR()], ['Mizar', 5, 4, PR()], ['Alcor', 5, 5, PR()], ['Algol', 5, 4, PR()],
    ['Alnilam', 5, 5, PR()], ['Mintaka', 5, 5, PR()], ['Alnitak', 5, 5, PR()], ['Thuban', 5, 5, PR()], ['Dubhe', 5, 5, PR()], ['Merak', 5, 5, PR()],
    ['Mimosa', 5, 5, PR({ g: 'star' })], ['Hadar', 5, 5, PR()], ['Acrux', 5, 4, PR()], ['Wolf 359', 5, 4, PR()], ["Barnard's Star", 4, 3, PR()], ['Tau Ceti', 5, 4, PR()],
  ],
  space_rocks: [
    ['asteroid', 1, 1], ['comet', 1, 1], ['meteor', 2, 1, { al: [['shooting star', 'synonym', 1, 1], ['falling star', 'synonym', 3, 2]] }], ['meteorite', 2, 1], ['fireball', 3, 3, { g: 'meteor' }],
    ['Kuiper belt', 3, 2], ['asteroid belt', 2, 1], ['Oort cloud', 3, 3], ['meteoroid', 3, 2], ['bolide', 5, 4], ['tektite', 5, 5], ['micrometeorite', 5, 4],
    ["Halley's Comet", 2, 1, PR()], ['Vesta', 4, 3, PR({ g: 'asteroid' })], ['Pallas', 5, 4, PR({ g: 'asteroid' })], ['Eros', 5, 4, PR({ g: 'asteroid' })], ['Bennu', 4, 3, PR()],
    ['Ryugu', 5, 4, PR()], ['Apophis', 4, 4, PR()], ['meteor shower', 2, 1], ['Perseids', 4, 3, PR()], ['Leonids', 4, 3, PR()], ['Geminids', 4, 4, PR()],
    ['space rock', 1, 1], ['NEO', 5, 4, ACR()], ['planetesimal', 5, 3], ['coma', 4, 3, { g: 'comet' }], ['comet tail', 2, 2], ['impact crater', 2, 4], ['chondrite', 5, 4],
    ['iron meteorite', 4, 3], ['Hale-Bopp', 4, 3, PR()], ['Tunguska', 5, 5, PR({ type: 'place' })], ['near-Earth object', 4, 3],
  ],
  spaceflight_words: [
    ['launch', 1, 1], ['countdown', 1, 1], ['liftoff', 1, 1, { al: [['blast off', 'synonym', 1, 1]] }], ['orbit', 1, 1], ['docking', 2, 1], ['spacewalk', 2, 1, { al: [['EVA', 'synonym', 4, 3, [], { type: 'acronym' }]] }],
    ['splashdown', 3, 1], ['payload', 3, 1], ['mission control', 2, 1], ['ground control', 2, 2], ['astronaut', 1, 2], ['cosmonaut', 2, 2], ['launch pad', 2, 1],
    ['reentry', 3, 2], ['weightless', 2, 3, adj()], ['zero gravity', 2, 2], ['microgravity', 4, 2], ['escape velocity', 3, 2], ['thrust', 2, 3], ['booster', 3, 2],
    ['fairing', 5, 3], ['stage separation', 4, 2], ['heat shield', 3, 2], ['capsule', 2, 2], ['payload bay', 4, 3], ['abort', 2, 3, v({ g: 'spaceflight' })],
    ['T-minus', 3, 2], ['trajectory', 3, 3], ['delta-v', 5, 4], ['rendezvous', 3, 3], ['airlock', 3, 2], ['telemetry', 4, 3], ['burn', 2, 4, { g: 'spaceflight' }],
    ['gravity assist', 4, 3], ['launch window', 3, 2], ['space station', 1, 2], ['spaceport', 3, 2],
  ],
  moon_phases_and_moods: [
    ['new', 1, 3, { g: 'moon phase' }], ['full', 1, 3, { g: 'moon phase' }], ['crescent', 2, 2, { g: 'moon' }], ['gibbous', 4, 2], ['waxing', 3, 2], ['waning', 3, 2],
    ['blue moon', 2, 2], ['supermoon', 3, 2], ['half moon', 1, 1], ['harvest moon', 2, 1], ['wolf moon', 3, 2], ['blood moon', 2, 1], ["hunter's moon", 3, 2],
    ['strawberry moon', 4, 3], ['snow moon', 3, 3], ['pink moon', 4, 3], ['sturgeon moon', 5, 4], ['worm moon', 4, 3], ['flower moon', 3, 3], ['buck moon', 4, 4],
    ['beaver moon', 4, 3], ['cold moon', 4, 3], ['crescent moon', 1, 1], ['full moon', 1, 1], ['new moon', 1, 1], ['quarter moon', 3, 2], ['micromoon', 5, 3],
    ['black moon', 4, 3], ['moonrise', 2, 3], ['moonset', 3, 3], ['super blood moon', 3, 3], ['terminator', 5, 4, { g: 'moon' }], ['earthshine', 5, 4], ['libration', 5, 5],
  ],
  galaxies_and_nebulae: [
    ['Milky Way', 1, 1, PR()], ['Andromeda', 2, 2, PR({ g: 'galaxy', al: [['M31', 'synonym', 5, 4]] })], ['Orion Nebula', 3, 2, PR()], ['Crab Nebula', 3, 2, PR()],
    ['Whirlpool Galaxy', 3, 2, PR({ al: [['M51', 'synonym', 5, 5]] })], ['Horsehead Nebula', 3, 2, PR({ al: [['Horsehead', 'synonym', 3, 2, [], { g: 'nebula' }]] })],
    ['Triangulum Galaxy', 4, 3, PR()], ['Sombrero Galaxy', 4, 3, PR()], ['Pinwheel Galaxy', 4, 3, PR()], ['Cartwheel Galaxy', 4, 4, PR()], ['Cigar Galaxy', 5, 4, PR()],
    ['Eagle Nebula', 3, 3, PR()], ['Pillars of Creation', 3, 2, PR()], ['Ring Nebula', 3, 3, PR()], ['Helix Nebula', 4, 3, PR()], ["Cat's Eye Nebula", 4, 3, PR()],
    ['Lagoon Nebula', 4, 4, PR()], ['Carina Nebula', 4, 3, PR()], ['Tarantula Nebula', 4, 4, PR()], ['Trifid Nebula', 5, 4, PR()], ['Veil Nebula', 5, 4, PR()],
    ['Rosette Nebula', 5, 4, PR()], ['Butterfly Nebula', 5, 4, PR()], ['Black Eye Galaxy', 5, 4, PR()], ['Centaurus A', 5, 4, PR()], ['Messier 87', 4, 4, PR()],
    ['Magellanic Clouds', 3, 3, PR()], ['nebula', 2, 2], ['galaxy', 1, 2], ['planetary nebula', 4, 3], ['dark nebula', 4, 3], ['globular cluster', 4, 3],
    ['Pleiades', 3, 4, PR({ g: 'star cluster' })], ['Hubble Deep Field', 4, 4, PR()],
  ],
  dwarf_planets: [
    ['Pluto', 1, 2, PR({ g: 'dwarf planet' })], ['Ceres', 3, 3, PR({ g: 'dwarf planet' })], ['Eris', 4, 3, PR({ g: 'dwarf planet', al: [['Xena', 'synonym', 5, 4, [], { g: 'dwarf planet' }]] })],
    ['Haumea', 5, 4, PR()], ['Makemake', 5, 4, PR()],
  ],
  phases_of_the_moon: [
    ['new moon', 1, 1], ['waxing crescent', 3, 2], ['first quarter', 3, 2], ['waxing gibbous', 4, 3], ['full moon', 1, 1], ['waning gibbous', 4, 3],
    ['last quarter', 3, 2, { al: [['third quarter', 'synonym', 4, 3]] }], ['waning crescent', 3, 2],
  ],
  types_of_galaxy: [
    ['spiral', 1, 2, { g: 'galaxy', al: [['spiral galaxy', 'synonym', 2, 1]] }], ['elliptical', 3, 2, { g: 'galaxy', al: [['elliptical galaxy', 'synonym', 3, 1]] }],
    ['irregular', 2, 2, { g: 'galaxy', al: [['irregular galaxy', 'synonym', 3, 1]] }], ['lenticular', 4, 3, { g: 'galaxy', al: [['lenticular galaxy', 'synonym', 4, 2]] }],
  ],

  // ---------------------------------------------------------------- math
  math_terms: [
    ['sum', 1, 3, { g: M }], ['difference', 2, 3, { g: M }], ['product', 2, 3, { g: M }], ['quotient', 3, 3], ['remainder', 2, 3], ['digit', 2, 2, { g: 'number' }], ['numeral', 3, 2],
    ['equation', 2, 2], ['fraction', 1, 2], ['decimal', 2, 2], ['percent', 1, 2, { al: [['percentage', 'synonym', 2, 2]] }], ['ratio', 2, 2], ['proportion', 3, 3, { g: M }],
    ['average', 1, 3], ['mean', 2, 3, { g: M }], ['median', 3, 2], ['mode', 2, 4, { g: M }], ['range', 2, 3, { g: M }], ['probability', 2, 2], ['statistics', 2, 2],
    ['theorem', 3, 2], ['proof', 2, 3, { g: M }], ['axiom', 4, 3], ['lemma', 5, 4], ['corollary', 5, 4], ['formula', 2, 2, { g: M }], ['factor', 3, 2, { g: M }],
    ['multiple', 2, 3, { g: M }], ['function', 3, 3, { g: M }], ['axis', 2, 3, { g: M }], ['coordinate', 3, 3], ['slope', 2, 3, { g: M }],
    ['gradient', 3, 3, { g: M }], ['matrix', 3, 3, { g: M }], ['vector', 3, 3, { g: M }], ['set', 1, 5, { g: M }], ['infinity', 2, 3], ['pi', 1, 2, { g: M }],
    ['arithmetic', 2, 2], ['algebra', 1, 2],
  ],
  numbers: [
    ['zero', 1, 1, { al: [['nought', 'synonym', 3, 3, ['UK']], ['naught', 'synonym', 4, 4]] }], ['one', 1, 1, { g: 'number' }], ['two', 1, 1], ['three', 1, 1], ['four', 1, 1],
    ['five', 1, 1], ['six', 1, 1], ['seven', 1, 1], ['eight', 1, 1], ['nine', 1, 1], ['ten', 1, 1], ['eleven', 1, 1], ['twelve', 1, 1], ['thirteen', 1, 1],
    ['fifteen', 1, 1], ['nineteen', 1, 1], ['twenty', 1, 1], ['thirty', 1, 1], ['forty', 1, 1], ['fifty', 1, 1], ['ninety', 1, 1], ['hundred', 1, 1], ['thousand', 1, 1],
    ['million', 1, 2], ['dozen', 2, 2], ['score', 4, 4, { g: 'twenty' }], ['gross', 5, 4, { g: 'twelve dozen' }], ["baker's dozen", 3, 3], ['myriad', 4, 4, { g: 'ten thousand' }],
    ['Roman numeral', 2, 3], ['Arabic numeral', 3, 3], ['binary', 2, 4, { g: 'number system' }], ['hexadecimal', 4, 4],
  ],
  number_types: [
    ['prime', 2, 2, { g: 'number', al: [['prime number', 'synonym', 2, 1]] }], ['odd', 1, 2, { g: 'number', al: [['odd number', 'synonym', 1, 1]] }],
    ['even', 1, 3, { g: 'number', al: [['even number', 'synonym', 1, 1]] }], ['negative', 1, 3, { g: 'number' }], ['positive', 1, 3, { g: 'number' }], ['integer', 3, 2],
    ['whole number', 2, 2], ['natural number', 3, 2], ['rational', 3, 2, { g: 'number' }], ['irrational', 3, 2, { g: 'number' }], ['real number', 3, 2],
    ['imaginary', 3, 2, { g: 'number', al: [['imaginary number', 'synonym', 3, 1]] }], ['complex number', 4, 2], ['square number', 2, 2], ['cube number', 3, 2],
    ['triangular number', 4, 3], ['perfect number', 4, 3], ['Fibonacci number', 3, 3], ['composite', 4, 3, { g: 'number' }], ['decimal', 2, 4],
    ['cardinal', 4, 3, { g: 'number' }], ['ordinal', 3, 3, { g: 'number' }], ['transcendental', 5, 4], ['surd', 5, 4], ['palindromic number', 5, 3], ['amicable number', 5, 4],
    ['happy number', 5, 4], ['Mersenne prime', 5, 4], ['twin prime', 5, 3], ['counting number', 4, 2],
  ],
  big_numbers: [
    ['million', 1, 1], ['billion', 1, 1], ['trillion', 2, 1], ['quadrillion', 3, 2], ['quintillion', 3, 2], ['sextillion', 4, 2], ['septillion', 5, 3], ['octillion', 5, 3],
    ['nonillion', 5, 3], ['decillion', 5, 3], ['googol', 3, 2], ['googolplex', 4, 3], ['zillion', 2, 2, { al: [['jillion', 'synonym', 3, 3]] }], ['bazillion', 3, 3],
    ['gazillion', 3, 3], ['lakh', 4, 3, { reg: ['IN'] }], ['crore', 4, 3, { reg: ['IN'] }], ['myriad', 4, 4, { g: 'ten thousand' }], ['thousand', 1, 3], ['milliard', 5, 4, { reg: ['UK'] }],
    ["Graham's number", 5, 3, PR()], ['centillion', 5, 3], ['umpteen', 3, 4], ['squillion', 3, 4, { reg: ['UK'] }], ['kajillion', 4, 4], ['infinity', 2, 3],
    ["Avogadro's number", 4, 4, PR()], ['hundred thousand', 2, 3],
  ],
  geometry: [
    ['angle', 1, 2], ['line', 1, 3, { g: 'geometry' }], ['point', 1, 3, { g: 'geometry' }], ['plane', 2, 3, { g: 'geometry' }], ['circle', 1, 1], ['triangle', 1, 1, { g: 'shape' }], ['rectangle', 1, 1],
    ['hexagon', 1, 2], ['octagon', 1, 2], ['oval', 1, 2], ['sphere', 1, 2], ['cone', 1, 2, { g: 'shape' }], ['cylinder', 1, 2],
    ['perimeter', 2, 2], ['area', 1, 3, { g: 'geometry' }], ['volume', 2, 3, { g: 'geometry' }], ['radius', 2, 2], ['diameter', 2, 2], ['circumference', 3, 2],
    ['tangent', 3, 3, { g: 'geometry' }], ['arc', 3, 3, { g: 'geometry' }], ['sector', 3, 3, { g: 'geometry' }], ['right angle', 2, 2],
    ['acute angle', 2, 2], ['obtuse angle', 3, 2], ['parallel', 2, 3, { g: 'geometry' }], ['perpendicular', 3, 3], ['vertex', 3, 2], ['edge', 2, 4, { g: 'geometry' }],
    ['hypotenuse', 3, 2], ['Pythagoras', 2, 3, PER()], ['protractor', 3, 3], ['set square', 3, 3, { reg: ['UK'] }], ['symmetry', 2, 3],
    ['congruent', 3, 3, adj()], ['polygon', 2, 2], ['quadrilateral', 3, 2], ['tessellation', 4, 3], ['Euclid', 3, 3, PER()], ['ellipse', 3, 3],
  ],
  fractions: [
    ['fraction', 1, 1], ['numerator', 3, 1], ['denominator', 3, 1], ['half', 1, 1, { g: 'fraction' }], ['third', 1, 2, { g: 'fraction' }], ['quarter', 1, 2, { g: 'fraction' }],
    ['fifth', 1, 3, { g: 'fraction' }], ['sixth', 1, 3, { g: 'fraction' }], ['eighth', 1, 3, { g: 'fraction' }], ['tenth', 1, 3, { g: 'fraction' }], ['sixteenth', 2, 3, { g: 'fraction' }],
    ['hundredth', 2, 3, { g: 'fraction' }], ['three quarters', 2, 2], ['two thirds', 2, 2], ['one half', 1, 2], ['mixed number', 3, 2], ['improper fraction', 3, 1],
    ['proper fraction', 3, 2], ['unit fraction', 4, 3], ['common fraction', 4, 3], ['equivalent fraction', 4, 2], ['simplify', 2, 3, v()], ['lowest terms', 3, 3],
    ['reciprocal', 4, 3], ['decimal', 2, 3], ['percentage', 2, 3], ['ratio', 3, 4], ['common denominator', 4, 2], ['fraction bar', 4, 2], ['vinculum', 5, 3],
    ['Egyptian fraction', 5, 4], ['whole number', 2, 4],
  ],
  math_operations: [
    ['add', 1, 1, v()], ['subtract', 1, 1, v()], ['multiply', 1, 1, v()], ['divide', 1, 1, v()], ['plus', 1, 1], ['minus', 1, 1], ['times', 1, 2, { g: 'multiplication' }],
    ['addition', 1, 1], ['subtraction', 1, 1], ['multiplication', 1, 1], ['division', 1, 1, { g: M }], ['sum', 1, 3, { g: M }], ['square root', 2, 2], ['cube root', 3, 2],
    ['power', 2, 3, { g: M }], ['factorial', 3, 2], ['modulo', 4, 2, { al: [['mod', 'synonym', 4, 3, [], { g: M }]] }], ['round', 1, 3, v({ g: M })], ['differentiate', 4, 3, v()],
    ['integrate', 4, 3, v({ g: M })], ['carry', 2, 3, v({ g: M })], ['borrow', 2, 4, v({ g: M })], ['long division', 2, 2], ['long multiplication', 3, 3],
    ['take away', 1, 2, v()], ['add up', 1, 2, v()], ['increment', 4, 3, v()], ['decrement', 5, 3, v()], ['logarithm', 4, 3, { al: [['log', 'synonym', 3, 3, [], { g: M }]] }],
    ['absolute value', 3, 3], ['plus sign', 1, 2], ['minus sign', 1, 2], ['equals sign', 1, 3], ['calculate', 1, 3, v()], ['exponentiation', 5, 3],
  ],
  algebra_words: [
    ['variable', 2, 1, { g: M }], ['equation', 2, 1], ['formula', 2, 2, { g: M }], ['coefficient', 4, 1], ['exponent', 3, 1], ['polynomial', 4, 1], ['inequality', 3, 2, { g: M }],
    ['expression', 2, 3, { g: M }], ['term', 3, 3, { g: M }], ['constant', 3, 3, { g: M }], ['unknown', 1, 3, { g: M }], ['solve', 1, 3, v({ g: M })],
    ['factorize', 3, 2, v({ al: [['factorise', 'spelling', 3, 2, ['UK']]] })], ['expand', 2, 4, v({ g: M })], ['quadratic', 3, 1], ['linear', 2, 3, { g: M }], ['binomial', 4, 2, { g: M }],
    ['monomial', 5, 3], ['trinomial', 5, 3], ['cubic', 3, 3, { g: M }], ['root', 2, 3, { g: M }], ['intercept', 4, 3], ['slope', 2, 3, { g: M }], ['function', 3, 3, { g: M }],
    ['domain', 4, 3, { g: M }], ['range', 2, 3, { g: M }], ['substitution', 3, 3, { g: M }], ['system of equations', 4, 2], ['FOIL', 4, 3, ACR()], ['distributive law', 4, 3],
    ['commutative', 4, 3, adj()], ['associative', 5, 3, adj()], ['surd', 5, 4], ['like terms', 3, 2], ['discriminant', 5, 3], ['al-Khwarizmi', 5, 4, PER()],
    ['simplify', 2, 3, v()], ['quadratic formula', 4, 2], ['balance', 2, 5, v({ g: M })],
  ],
};
