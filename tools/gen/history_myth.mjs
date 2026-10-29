// Generated word data: History & Myth and the playable themes directly under it.
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const P = (o = {}) => ({ type: 'person', ...o });
const PL = (o = {}) => ({ type: 'place', ...o });
const PH = (o = {}) => ({ type: 'phrase', ...o });
const PR = (o = {}) => ({ type: 'proper', ...o });
const T = (o = {}) => ({ type: 'title', ...o });
const V = (o = {}) => ({ pos: 'verb', ...o });
const WAR = (o = {}) => ({ adult: true, sens: true, ...o });

export const THEMES = {
  ancient_civilizations: { d: 2 }, medieval_times: { d: 2 }, exploration: { d: 3 }, pirates: { d: 1 }, wars_and_battles: { d: 2, sensitive: true },
  archaeology: { d: 3 }, mythology: { d: 2 }, fantasy: { d: 2, tm: true }, historical_periods: { d: 3 },
};

export const DATA = {
  // ---------------------------------------------------------------- ancient civilizations
  ancient_civilizations: [
    ['Egypt', 1, 2, PL()], ['pharaoh', 1, 1], ['pyramid', 1, 2], ['Sphinx', 2, 2], ['gladiator', 1, 2], ['Colosseum', 2, 2, PL({ al: [['Coliseum', 'spelling', 2, 2, ['US']]] })],
    ['Parthenon', 2, 2, PL()], ['Acropolis', 3, 3, PL()], ['Sparta', 2, 2, PL()], ['Athens', 1, 3, PL()], ['Troy', 2, 3, PL()], ['Babylon', 2, 2, PL()],
    ['Persia', 2, 2, PL()], ['Carthage', 3, 2, PL()], ['Phoenicians', 3, 3, PR()], ['Sumerians', 3, 2, PR()], ['Assyrians', 3, 3, PR()], ['Hittites', 4, 3, PR()],
    ['Minoans', 3, 3, PR()], ['Mycenaeans', 4, 3, PR()], ['Etruscans', 3, 3, PR()], ['Olmecs', 4, 3, PR()], ['Aztecs', 2, 2, PR()], ['Incas', 2, 2, PR()], ['Maya', 2, 2, PR()],
    ['Nubia', 4, 4, PL()], ['Kush', 5, 4, PL()], ['Harappa', 4, 4, PL()], ['Mohenjo-daro', 5, 4, PL()], ['Akkadians', 5, 4, PR()],
    ['toga', 1, 2], ['legion', 2, 2], ['senate', 2, 3], ['aqueduct', 2, 2], ['amphitheater', 3, 3, { al: [['amphitheatre', 'spelling', 3, 3, ['UK', 'AU', 'NZ', 'IE']]] }],
    ['hieroglyphs', 2, 2, { al: [['hieroglyphics', 'synonym', 2, 2]] }], ['cuneiform', 3, 3], ['papyrus', 2, 3], ['ziggurat', 3, 3], ['amphora', 3, 3],
    ['Olympic Games', 1, 3, PH()], ['oracle', 2, 3, { g: 'prophet' }], ['Hanging Gardens', 3, 3, PH()], ['Library of Alexandria', 3, 3, PH()], ['Code of Hammurabi', 4, 4, PH()],
    ['Rosetta Stone', 2, 3, PH()], ['Terracotta Army', 2, 3, PH()], ['agora', 4, 3], ['Great Pyramid', 2, 2, PH()], ['mummy', 1, 2, { g: 'Egyptian' }], ['Nile', 2, 3, PL()],
  ],

  // ---------------------------------------------------------------- medieval times
  medieval_times: [
    ['knight', 1, 1], ['castle', 1, 1], ['king', 1, 2], ['peasant', 1, 1], ['serf', 2, 2], ['squire', 3, 2], ['jester', 1, 2], ['minstrel', 2, 2], ['blacksmith', 1, 3],
    ['monk', 1, 3, { sens: true }], ['abbey', 2, 3, { sens: true }], ['moat', 2, 2], ['drawbridge', 2, 2], ['dungeon', 2, 2], ['tapestry', 2, 3], ['feast', 1, 3],
    ['tournament', 2, 2], ['chivalry', 3, 2], ['feudalism', 3, 2], ['manor', 2, 3], ['vassal', 3, 3], ['fief', 4, 3], ['baron', 2, 3], ['Magna Carta', 3, 3, PH({ sens: true })],
    ['Charlemagne', 3, 3, P({ sens: true })], ['Joan of Arc', 2, 3, P({ type: 'phrase', sens: true })], ['William the Conqueror', 2, 3, P({ type: 'phrase', adult: true })], ['Domesday Book', 3, 3, T()],
    ['Bayeux Tapestry', 3, 3, PH()], ['troubadour', 3, 3], ['manuscript', 3, 3], ['guild', 3, 3], ['apprentice', 2, 4], ['scribe', 2, 3],
    ['portcullis', 3, 3], ['battlements', 3, 3], ['keep', 2, 3, { g: 'castle' }], ['pilgrim', 2, 3, { sens: true }], ['tithe', 3, 3, { sens: true }], ['curfew', 3, 4],
    ['fealty', 4, 3], ['villein', 4, 3], ['demesne', 5, 4], ['reeve', 5, 4], ['yeoman', 4, 3], ['burgher', 4, 4], ['Hanseatic League', 4, 4, PH()], ['Black Prince', 4, 3, P()],
    ['Middle Ages', 1, 1, PH({ al: [['Dark Ages', 'synonym', 2, 2]] })], ['medieval', 1, 1, { pos: 'adjective' }], ['wergild', 5, 5], ['scutage', 5, 5], ['hauberk', 5, 4], ['garderobe', 5, 5],
    ['herald', 3, 3], ['alchemist', 3, 4], ['mead', 3, 3, { adult: true, sens: true }], ['trebuchet', 3, 3, { adult: true }], ['plague', 2, 3, { sens: true }], ['crusade', 2, 3, { adult: true, sens: true }],
  ],

  // ---------------------------------------------------------------- exploration
  exploration: [
    ['explorer', 1, 1], ['expedition', 2, 1], ['voyage', 2, 2], ['compass', 1, 2], ['sextant', 3, 3], ['astrolabe', 4, 3], ['caravel', 4, 3], ['galleon', 3, 3],
    ['Christopher Columbus', 1, 1, P({ sens: true })], ['Ferdinand Magellan', 2, 2, P()], ['Vasco da Gama', 3, 2, P({ type: 'phrase' })], ['Marco Polo', 2, 2, P()],
    ['Captain Cook', 2, 2, P()], ['Lewis and Clark', 2, 2, P({ type: 'phrase' })], ['Leif Erikson', 2, 2, P()], ['Roald Amundsen', 3, 3, P()], ['Ernest Shackleton', 3, 3, P()],
    ['Edmund Hillary', 3, 3, P()], ['Tenzing Norgay', 4, 3, P()], ['David Livingstone', 3, 3, P({ sens: true })], ['Henry Hudson', 3, 3, P()], ['Amerigo Vespucci', 3, 3, P()],
    ['John Cabot', 3, 3, P()], ['Jacques Cartier', 4, 3, P()], ['Samuel de Champlain', 4, 3, P({ type: 'phrase' })], ['Zheng He', 4, 4, P()], ['Ibn Battuta', 4, 4, P()],
    ['Bartolomeu Dias', 4, 4, P()], ['Abel Tasman', 4, 4, P()], ['Mungo Park', 5, 4, P()], ['Hiram Bingham', 5, 4, P()], ['Roanoke', 4, 4, PL()],
    ['Northwest Passage', 3, 3, PH()], ['New World', 2, 2, PH()], ['Terra Incognita', 4, 4, PH()], ['uncharted', 3, 2, { pos: 'adjective' }], ['frontier', 2, 3],
    ['Cape of Good Hope', 3, 3, PL({ type: 'phrase' })], ['circumnavigate', 4, 3, V()], ['cartographer', 3, 3], ['navigator', 2, 2], ['pioneer', 2, 2], ['trailblazer', 3, 3],
    ['Mayflower', 2, 3, T({ g: 'ship' })], ['Santa Maria', 3, 3, PH({ g: 'ship' })], ['Kon-Tiki', 4, 3, T()], ['HMS Beagle', 3, 4, PH({ g: 'ship' })], ['Endeavour', 3, 4, PH({ g: 'ship' })],
    ['Apollo 11', 2, 3, PH()], ['dead reckoning', 4, 3, PH()], ['longitude', 3, 4], ['latitude', 2, 4], ['Timbuktu', 3, 3, PL()],
    ['Mount Everest', 1, 3, PL()], ['Lost City of Z', 5, 5, PH()],
  ],

  // ---------------------------------------------------------------- pirates
  pirates: [
    ['pirate', 1, 1], ['buccaneer', 3, 2], ['privateer', 4, 3], ['corsair', 4, 3], ['captain', 1, 3], ['cutlass', 3, 2, { adult: true }], ['parrot', 1, 2], ['treasure', 1, 1],
    ['treasure map', 1, 1, PH()], ['Jolly Roger', 2, 1, P()], ['walk the plank', 2, 1, PH({ adult: true })], ['eye patch', 1, 1, { al: [['eyepatch', 'spelling', 1, 1]] }],
    ['peg leg', 2, 1], ['doubloon', 3, 2], ['pieces of eight', 3, 2, PH()], ['ahoy', 2, 2, { pos: 'other' }], ['matey', 2, 2, { pos: 'other' }], ['Blackbeard', 2, 2, P()],
    ['Captain Kidd', 3, 2, P()], ['Anne Bonny', 4, 3, P()], ['Calico Jack', 4, 3, P()], ['Henry Morgan', 3, 3, P()], ['Black Bart', 4, 3, P()], ['Long John Silver', 2, 2, P({ type: 'phrase', tm: true })],
    ['Captain Hook', 1, 3, P({ tm: true })], ['Jack Sparrow', 1, 2, P({ tm: true })], ['Bartholomew Roberts', 5, 4, P()], ["Grace O'Malley", 5, 4, P()],
    ['rum', 1, 3, { g: 'drink', adult: true, sens: true }], ['grog', 3, 3, { adult: true, sens: true }], ['scurvy', 2, 3], ['keelhaul', 4, 2, V({ adult: true })], ['maroon', 4, 3, V({ g: 'abandon' })],
    ['mutiny', 2, 3], ['booty', 2, 3, { g: 'plunder' }], ['loot', 1, 3], ['plunder', 2, 2], ['buried treasure', 1, 1, PH()], ['treasure chest', 1, 1, PH()],
    ['Tortuga', 4, 3, PL()], ['Port Royal', 4, 3, PL()], ['Barbary Coast', 4, 3, PL()], ['Spanish Main', 4, 3, PL({ type: 'phrase' })], ["crow's nest", 2, 3, PH()],
    ['bandana', 2, 4, { al: [['bandanna', 'spelling', 3, 4, ['US']]] }], ['tricorn', 4, 3, { al: [['tricorne', 'spelling', 5, 4, ['UK']]] }], ['flintlock', 3, 3, { adult: true }],
    ["cat o' nine tails", 4, 3, PH({ adult: true })], ['sea shanty', 2, 3, PH({ al: [['chantey', 'spelling', 5, 5]] })], ['shiver me timbers', 2, 1, PH()], ['yo-ho-ho', 2, 1, PH()],
    ['swashbuckler', 3, 2], ['skull and crossbones', 1, 1, PH({ adult: true, sens: true })], ['gangplank', 3, 3], ['galleon', 3, 3],
    ['sloop', 4, 4], ['brigantine', 5, 4], ['letter of marque', 5, 4, PH()], ['articles of agreement', 5, 5, PH()], ['Dread Pirate Roberts', 4, 3, P({ type: 'phrase', tm: true })],
  ],

  // ---------------------------------------------------------------- wars and battles
  wars_and_battles: [
    ['war', 1, 1, WAR()], ['battle', 1, 1, WAR()], ['army', 1, 1, WAR()], ['soldier', 1, 1, WAR()], ['general', 1, 2, WAR({ g: 'officer' })], ['infantry', 2, 2, WAR()],
    ['cavalry', 2, 2, WAR()], ['artillery', 2, 2, WAR()], ['ally', 1, 2, { sens: true }], ['enemy', 1, 2, WAR()], ['siege', 2, 2, WAR()], ['invasion', 2, 2, WAR()],
    ['victory', 1, 3, { sens: true }], ['defeat', 1, 3, { sens: true }], ['surrender', 2, 2, { sens: true }], ['ceasefire', 2, 3, { sens: true }], ['treaty', 2, 3, { sens: true }],
    ['truce', 2, 3, { sens: true }], ['armistice', 3, 3, { sens: true }], ['retreat', 2, 2, { sens: true }], ['ambush', 2, 2, WAR()], ['skirmish', 3, 2, WAR()],
    ['campaign', 2, 3, { sens: true, g: 'military' }], ['front line', 2, 2, WAR({ al: [['frontline', 'spelling', 2, 2]] })], ['trench', 2, 3, WAR()], ['battlefield', 2, 2, WAR()],
    ['regiment', 3, 2, WAR()], ['battalion', 3, 3, WAR()], ['brigade', 3, 3, WAR()], ['platoon', 3, 3, WAR()], ['garrison', 3, 3, WAR()], ['conquest', 2, 3, WAR()],
    ['rebellion', 2, 3, { sens: true }], ['civil war', 1, 1, WAR({ type: 'phrase' })], ['Waterloo', 2, 2, WAR(PL())], ['Hastings', 3, 2, WAR(PL())], ['Gettysburg', 2, 2, WAR(PL())],
    ['Thermopylae', 4, 3, WAR(PL())], ['Trafalgar', 3, 3, WAR(PL())], ['Stalingrad', 3, 2, WAR(PL())], ['Agincourt', 4, 3, WAR(PL())], ['Normandy', 2, 3, WAR(PL())],
    ['D-Day', 2, 2, WAR(PH())], ['Pearl Harbor', 1, 2, WAR(PL({ type: 'phrase' }))], ['Alamo', 2, 3, WAR(PL())], ['Bunker Hill', 3, 3, WAR(PL({ type: 'phrase' }))],
    ["Hundred Years' War", 3, 3, WAR(PH())], ['Trojan War', 2, 3, WAR(PH())], ['Punic Wars', 4, 4, WAR(PH())], ['Wars of the Roses', 3, 3, WAR(PH())], ['Crimean War', 3, 3, WAR(PH())],
    ['Boer War', 4, 3, WAR(PH({ reg: ['UK', 'ZA', 'AU', 'NZ'] }))], ['Peloponnesian War', 4, 4, WAR(PH())], ['Napoleonic Wars', 3, 3, WAR(PH())], ['Vietnam War', 1, 2, WAR(PH())],
    ['Korean War', 2, 2, WAR(PH())], ['Gulf War', 2, 2, WAR(PH())], ["Seven Years' War", 4, 4, WAR(PH())], ['War of 1812', 3, 3, WAR(PH())], ['Zulu War', 4, 4, WAR(PH({ reg: ['UK', 'ZA'] }))],
    ['Austerlitz', 4, 4, WAR(PL())], ['Marathon', 2, 4, WAR(PL({ g: 'battle' }))], ['Somme', 3, 3, WAR(PL({ reg: ['UK', 'CA', 'AU', 'NZ', 'IE'] }))], ['Verdun', 4, 4, WAR(PL())],
    ['flank', 3, 3, WAR(V({ g: 'attack' }))], ['rout', 4, 4, WAR({ g: 'defeat' })], ['sortie', 5, 4, WAR()], ['enfilade', 5, 5, WAR()], ['redoubt', 5, 4, WAR()],
  ],

  // ---------------------------------------------------------------- archaeology
  archaeology: [
    ['archaeologist', 2, 1, { al: [['archeologist', 'spelling', 2, 1, ['US']]] }], ['excavation', 3, 1], ['dig', 1, 2, { g: 'excavation' }],
    ['artifact', 2, 1, { al: [['artefact', 'spelling', 2, 1, ['UK', 'AU', 'NZ', 'IE', 'IN']]] }], ['fossil', 1, 2], ['potsherd', 4, 3, { al: [['shard', 'synonym', 3, 3, [], { g: 'pottery' }]] }],
    ['trowel', 2, 2], ['stratigraphy', 5, 4], ['radiocarbon dating', 3, 3, PH({ al: [['carbon dating', 'synonym', 2, 2]] })], ['ruins', 1, 2], ['tomb', 1, 3, { sens: true }],
    ['midden', 4, 4], ['cairn', 3, 4], ['barrow', 4, 4, { g: 'burial mound' }], ['tumulus', 5, 4], ['megalith', 4, 3], ['Stonehenge', 2, 2, PL()], ['Pompeii', 2, 2, PL({ sens: true })],
    ['Machu Picchu', 2, 2, PL()], ['Rosetta Stone', 2, 3, PH()], ['Tutankhamun', 2, 2, P({ sens: true, al: [['King Tut', 'synonym', 2, 2]] })], ['Lascaux', 4, 3, PL()],
    ['Howard Carter', 3, 3, P()], ['Heinrich Schliemann', 4, 4, P()], ['Ötzi', 4, 3, P({ al: [['Iceman', 'synonym', 4, 3]] })], ['Neanderthal', 2, 3],
    ['Lucy', 3, 3, P({ g: 'hominid' })], ['obelisk', 3, 3], ['hoard', 3, 3], ['stele', 5, 4, { al: [['stela', 'synonym', 5, 5]] }], ['paleontology', 3, 3, { al: [['palaeontology', 'spelling', 3, 3, ['UK', 'AU', 'NZ', 'IE']]] }],
    ['anthropology', 3, 3], ['dendrochronology', 5, 4], ['lithics', 5, 5], ['flint knapping', 4, 4, PH()], ['strata', 4, 3], ['provenance', 4, 3], ['in situ', 4, 3, PH()],
    ['magnetometer', 5, 4], ['metal detector', 1, 3, PH()], ['Dead Sea Scrolls', 3, 3, PH({ sens: true })], ['sarcophagus', 3, 3, { sens: true }], ['mummy', 1, 3, { g: 'Egyptian' }],
    ['cave painting', 2, 3, PH()], ['petroglyph', 4, 4], ['kiln', 3, 4], ['spoil heap', 5, 5, PH()], ['grid square', 4, 4, PH()], ['Mesa Verde', 4, 4, PL()],
    ['Çatalhöyük', 5, 4, PL()], ['Göbekli Tepe', 5, 4, PL()], ['Sutton Hoo', 4, 4, PL({ reg: ['UK'] })], ['Skara Brae', 5, 4, PL({ reg: ['UK'] })], ['Indiana Jones', 1, 3, P({ tm: true })],
    ['bog body', 5, 4, PH({ sens: true })], ['Terracotta Army', 2, 3, PH()],
  ],

  // ---------------------------------------------------------------- mythology
  mythology: [
    ['myth', 1, 1], ['legend', 1, 2], ['god', 1, 1, { sens: true }], ['goddess', 1, 1, { sens: true }], ['deity', 3, 2, { sens: true }], ['demigod', 3, 2], ['hero', 1, 2],
    ['monster', 1, 2], ['Titan', 2, 2, { g: 'giant god' }], ['Olympus', 2, 2, PL()], ['underworld', 2, 2], ['pantheon', 3, 3], ['oracle', 2, 3, { g: 'prophet' }], ['prophecy', 2, 3],
    ['nymph', 3, 2], ['satyr', 3, 2], ['centaur', 2, 1], ['minotaur', 2, 1], ['Medusa', 1, 1, P({ g: 'gorgon' })], ["Pandora's box", 2, 2, PH()], ['Trojan Horse', 1, 2, PH()],
    ['Golden Fleece', 3, 2, PH()], ['Odyssey', 2, 2, T()], ['Iliad', 3, 2, T()], ['Aeneid', 4, 3, T()], ['Ragnarok', 3, 2, PR()], ['Valhalla', 3, 2, PL()],
    ['Asgard', 3, 2, PL()], ['Atlantis', 2, 2, PL()], ['Elysium', 4, 3, PL()], ['Tartarus', 4, 3, PL()], ['Valkyrie', 3, 2], ['Cyclops', 2, 1], ['Hydra', 2, 1],
    ['Pegasus', 1, 1], ['Cerberus', 2, 1], ['Chimera', 3, 2], ['Griffin', 3, 2, { al: [['gryphon', 'spelling', 3, 2], ['griffon', 'spelling', 4, 3]] }], ['Kraken', 2, 2],
    ['Thor', 1, 1, P({ tm: true, g: 'god' })], ['Zeus', 1, 1, P({ g: 'god' })], ['Hercules', 1, 1, P({ g: 'hero' })], ['Achilles', 2, 1, P()], ['Odysseus', 3, 2, P()],
    ['Perseus', 3, 2, P()], ['Theseus', 3, 2, P()], ['Prometheus', 3, 2, P()], ['Narcissus', 3, 2, P({ g: 'myth' })], ['Midas', 3, 2, P()], ['Icarus', 2, 2, P()],
    ['Sisyphus', 3, 3, P()], ['Orpheus', 3, 3, P()], ['Siren', 2, 2, { g: 'myth' }], ['Phoenix', 1, 2, { g: 'bird' }], ['Harpy', 3, 3], ['Gorgon', 3, 2], ['Banshee', 3, 3],
    ['Leviathan', 3, 3], ['Behemoth', 3, 4], ['Bifrost', 4, 3, PL()], ['Yggdrasil', 4, 3], ['Hesperides', 5, 4, PR()], ['Argonauts', 4, 3, PR()], ['Amazons', 3, 3, PR({ g: 'warriors' })],
    ['Charybdis', 5, 4], ['Scylla', 5, 4], ['Lethe', 5, 4], ['Nemean Lion', 5, 4, PH()], ['Augean stables', 5, 4, PH()], ['Gordian knot', 4, 4, PH()], ['Achilles heel', 2, 3, PH()],
  ],

  // ---------------------------------------------------------------- fantasy
  fantasy: [
    ['wizard', 1, 1], ['witch', 1, 1, { sens: true }], ['dragon', 1, 1], ['elf', 1, 1], ['dwarf', 1, 1, { g: 'fantasy' }], ['orc', 2, 1], ['goblin', 1, 1], ['troll', 1, 2, { g: 'monster' }],
    ['hobbit', 2, 1, { tm: true }], ['fairy', 1, 2], ['unicorn', 1, 2], ['wand', 1, 1], ['spell', 1, 1], ['potion', 1, 1], ['sorcerer', 2, 1], ['enchantment', 3, 2], ['curse', 1, 3],
    ['quest', 1, 2], ['kingdom', 1, 3], ['Excalibur', 3, 2, { g: 'sword' }], ['Camelot', 2, 3, PL()], ['Middle-earth', 3, 2, PL({ tm: true })], ['Narnia', 2, 2, PL({ tm: true })],
    ['Hogwarts', 2, 2, PL({ type: 'org', tm: true })], ['Gandalf', 2, 1, P({ tm: true })], ['Merlin', 2, 2, P({ g: 'wizard' })], ['Dumbledore', 2, 2, P({ tm: true })],
    ['Dungeons & Dragons', 2, 2, T({ type: 'phrase', tm: true })], ['realm', 3, 2], ['dark lord', 3, 1, PH()], ['grimoire', 4, 2], ['spellbook', 3, 1], ['cauldron', 2, 2],
    ['crystal ball', 1, 2, PH()], ['broomstick', 1, 2], ['tome', 3, 3], ['necromancer', 3, 2, { sens: true }], ['warlock', 3, 2, { sens: true }], ['paladin', 3, 2],
    ['halfling', 3, 2], ['gnome', 2, 2, { g: 'fantasy' }], ['ent', 3, 2, { tm: true }], ['wraith', 3, 3], ['lich', 4, 3, { sens: true }], ['basilisk', 3, 3], ['wyvern', 4, 3],
    ['manticore', 4, 3], ['cockatrice', 5, 4], ['golem', 3, 2], ['druid', 3, 3, { g: 'fantasy' }], ['sorceress', 2, 1], ['enchantress', 3, 2], ['mage', 3, 2],
    ['familiar', 4, 3, { g: "witch's pet" }], ['incantation', 4, 3], ['talisman', 3, 3], ['amulet', 2, 3], ['elixir', 3, 3], ['rune', 3, 3], ['sword and sorcery', 4, 3, PH()],
    ['high fantasy', 4, 3, PH()], ['mithril', 5, 3, { tm: true }], ['palantir', 5, 3, { tm: true }], ['arcane', 3, 3, { pos: 'adjective' }], ['conjure', 3, 3, V()],
    ['summoning', 3, 3], ['dungeon master', 3, 3, PH({ tm: true })], ['mana', 3, 3], ['shapeshifter', 3, 2], ['chosen one', 2, 2, PH()], ['fellowship', 2, 3],
  ],

  // ---------------------------------------------------------------- historical periods
  historical_periods: [
    ['Stone Age', 1, 1, PR()], ['Bronze Age', 2, 1, PR()], ['Iron Age', 2, 1, PR()], ['Middle Ages', 1, 1, PH({ al: [['medieval period', 'synonym', 3, 2]] })],
    ['Dark Ages', 2, 2, PR()], ['Renaissance', 2, 1, PR()], ['Enlightenment', 3, 2, PR()], ['Reformation', 3, 3, PR({ sens: true })], ['Industrial Revolution', 2, 1, PR()],
    ['Victorian era', 2, 1, PR({ al: [['Victorian age', 'synonym', 3, 2]] })], ['Edwardian era', 3, 3, PR({ reg: ['UK'] })], ['Georgian era', 3, 3, PR({ reg: ['UK'] })],
    ['Elizabethan era', 3, 2, PR({ reg: ['UK'] })], ['Tudor period', 3, 3, PR({ reg: ['UK'] })], ['Regency', 4, 4, PR({ reg: ['UK'], g: 'period' })], ['Roaring Twenties', 2, 2, PR()],
    ['Great Depression', 1, 2, PR()], ['Cold War', 1, 2, PR({ sens: true })], ['Space Age', 2, 2, PR()], ['Information Age', 3, 3, PR()], ['Jazz Age', 3, 3, PR()],
    ['Gilded Age', 3, 3, PR({ reg: ['US'] })], ['Age of Exploration', 3, 2, PR({ type: 'phrase' })], ['Age of Reason', 4, 3, PR({ type: 'phrase' })], ['Age of Sail', 3, 3, PR({ type: 'phrase' })], ['antiquity', 3, 2],
    ['prehistory', 2, 2, { al: [['prehistoric times', 'synonym', 2, 2]] }], ['Neolithic', 3, 3, PR({ al: [['New Stone Age', 'synonym', 3, 3, [], { type: 'phrase' }]] })],
    ['Paleolithic', 3, 3, PR({ al: [['Palaeolithic', 'spelling', 3, 3, ['UK', 'AU', 'NZ', 'IE']], ['Old Stone Age', 'synonym', 3, 3, [], { type: 'phrase' }]] })], ['Mesolithic', 4, 4, PR()], ['Ice Age', 1, 2, PR()],
    ['Belle Époque', 4, 4, PR({ type: 'phrase' })], ['Interwar period', 4, 4, PH()], ['postwar era', 3, 3, PH()], ['Baroque', 3, 3, PR({ g: 'era' })], ['Romantic era', 3, 3, PR()],
    ['Napoleonic era', 3, 3, PR()], ['Meiji era', 4, 4, PR()], ['Edo period', 4, 4, PR()], ['Heian period', 5, 5, PR()], ['Atomic Age', 3, 3, PR({ sens: true })],
    ['Golden Age', 2, 3, PR()], ['Prohibition', 2, 3, PR({ adult: true, sens: true })], ['Reconstruction', 4, 4, PR({ reg: ['US'], sens: true })], ['Restoration', 4, 4, PR({ reg: ['UK'], g: 'period' })],
    ['Bronze Age collapse', 5, 4, PH()], ['Classical antiquity', 4, 3, PH()], ['Late Antiquity', 5, 4, PH()],
    ['Era of Good Feelings', 5, 5, PH({ reg: ['US'] })], ['Progressive Era', 4, 4, PR({ reg: ['US'] })], ['Swinging Sixties', 3, 3, PH({ reg: ['UK'] })], ['Dot-com boom', 3, 3, PH()],
    ['Tang dynasty', 3, 3, PH()], ['Ancien Régime', 5, 5, PH()], ['Age of Discovery', 3, 3, PR({ type: 'phrase' })],
  ],
};

export const ALIASES = [];
