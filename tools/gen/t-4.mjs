// Top-up chunk 4: hard words (and easy sheep-breed aliases) for thin themes.
const BR = { type: 'proper' };

export const FIXES = [
  { gloss: ['bugle', 'brass_instruments', 'instrument'] },
  { gloss: ['reeve', 'medieval_times', 'official'] },
  { gloss: ['mews', 'road_types', 'street'] },
];

export const ALIASES = [
  ['sheep_breeds', 'Suffolk', 'sheep', [['Suffolk sheep', 'synonym', 3, 2]]],
  ['sheep_breeds', 'Shetland', 'sheep', [['Shetland sheep', 'synonym', 3, 2]]],
  ['sheep_breeds', 'Merino', 'sheep', [['Merino sheep', 'synonym', 2, 1]]],
];

export const DATA = {
  small_pets: [
    ['Djungarian hamster', 4, 4, BR], ['Chinese hamster', 4, 4, BR], ['Jersey Wooly', 5, 5, BR],
    ['spiny mouse', 4, 4], ['Flemish giant', 4, 4, BR],
  ],
  pet_supplies: [
    ['vivarium', 4, 4], ['Elizabethan collar', 4, 4, BR], ['millet spray', 5, 5], ['lick mat', 4, 4], ['mealworm', 3, 4],
  ],
  cat_behaviors: [
    ['tail quivering', 4, 4], ['displacement grooming', 5, 5], ['predatory play', 4, 4], ['pawing (cat)', 3, 3],
  ],
  terriers: [
    ['Tenterfield terrier', 5, 5, BR], ['Jagdterrier', 5, 5, BR], ['Miniature bull terrier', 4, 4, BR],
    ['Brazilian terrier', 5, 5, BR], ['AmStaff', 4, 3, BR],
  ],
  hounds: [
    ['Hamiltonstovare', 5, 5, BR], ['Rampur greyhound', 5, 5, BR], ["Cirneco dell'Etna", 5, 5, BR], ['Podenco', 4, 4, BR],
    ['Mudhol hound', 5, 5, BR], ['Segugio Italiano', 5, 5, BR], ['Finnish hound', 4, 4, BR],
  ],
  herding_dogs: [
    ['Bergamasco', 4, 5], ['Entlebucher', 5, 5, BR], ['Berger Picard', 5, 5, BR], ['Schapendoes', 5, 5, BR], ['Croatian sheepdog', 5, 5, BR],
  ],
  working_dogs: [
    ['Kangal', 4, 4, { g: 'dog breed', type: 'proper' }], ['Landseer', 4, 4, BR], ['Broholmer', 5, 5, BR], ['Presa Canario', 5, 5, BR],
    ['Fila Brasileiro', 5, 5, BR], ['Spanish mastiff', 4, 4, BR], ['Tornjak', 5, 5, BR],
  ],
  cat_breeds: [
    ['Sokoke', 5, 5, BR], ['Khao Manee', 5, 5, BR], ['Peterbald', 5, 5, BR], ['Lykoi', 5, 5, BR], ['Toyger', 5, 5, BR], ['Cymric', 4, 4, BR],
    ['Burmilla', 5, 5, BR], ['Nebelung', 5, 5, BR], ['Pixie-bob', 5, 5, BR], ['LaPerm', 5, 5, BR], ['Chausie', 5, 5, BR],
    ['Japanese bobtail', 4, 4, { g: 'cat', type: 'common' }],
  ],
  australian_animals: [
    ['quoll', 4, 4], ['pademelon', 5, 5], ['bettong', 5, 5], ['potoroo', 5, 5], ['antechinus', 5, 5], ['mallee fowl', 5, 5],
  ],
  woodland_animals: [
    ['muntjac', 4, 4], ['goldcrest', 4, 4], ['redstart', 4, 4], ['fire salamander', 4, 4], ['hawfinch', 4, 5],
    ['wildcat', 3, 3], ['wood pigeon', 2, 3], ['fallow deer', 3, 2], ['red deer', 2, 2],
  ],
  insect_eaters: [
    ['golden mole', 4, 4], ['solenodon', 5, 5], ['whip-poor-will', 5, 5], ['dunnart', 5, 5], ['horned lizard', 3, 4],
    ['desman', 5, 5], ['elephant shrew', 4, 4], ['pied flycatcher', 4, 4],
  ],
  dinosaurs: [
    ['Kentrosaurus', 4, 4], ['Psittacosaurus', 4, 4], ['Carcharodontosaurus', 4, 4], ['Amargasaurus', 4, 4], ['Suchomimus', 5, 5],
    ['Herrerasaurus', 4, 4], ['Eoraptor', 4, 4], ['Yutyrannus', 5, 5], ['Pachyrhinosaurus', 5, 5], ['Ouranosaurus', 5, 5],
    ['Mamenchisaurus', 4, 4], ['Leaellynasaura', 5, 5],
  ],
  flying_reptiles: [
    ['Darwinopterus', 5, 4], ['Ctenochasma', 5, 4], ['Germanodactylus', 5, 4], ['Hamipterus', 5, 4], ['Tropeognathus', 5, 4],
    ['Lonchodectes', 5, 5], ['Azhdarcho', 5, 5], ['Campylognathoides', 5, 5], ['Hongshanopterus', 5, 5],
  ],
  sea_reptiles: [
    ['Cymbospondylus', 5, 4], ['Styxosaurus', 5, 4], ['Rhomaleosaurus', 5, 4], ['Muraenosaurus', 5, 4], ['Hainosaurus', 5, 4],
    ['Globidens', 5, 5], ['Keichousaurus', 5, 5], ['Platypterygius', 5, 5], ['Eurhinosaurus', 5, 5],
  ],
  ice_age_animals: [
    ['Homotherium', 5, 4], ['Diprotodon', 4, 4], ['Arctodus', 5, 5], ['Procoptodon', 5, 5], ['Stephanorhinus', 5, 5],
    ['Mylodon', 5, 5], ['Palaeoloxodon', 5, 5], ['Gomphothere', 5, 5],
  ],
  extinct_animals: [
    ['huia', 4, 4], ['Barbary lion', 3, 4, { type: 'proper' }], ['laughing owl', 5, 5], ['Atlas bear', 4, 4], ['Cape lion', 4, 4],
    ['Kauai oo', 5, 5], ['Alaotra grebe', 5, 5], ['Toolache wallaby', 5, 5], ['pig-footed bandicoot', 5, 5], ['Tecopa pupfish', 5, 5],
  ],
  prehistoric_periods: [
    ['Cryogenian', 5, 4, BR], ['Neoproterozoic', 5, 5, BR], ['Cisuralian', 5, 5, BR], ['Lopingian', 5, 5, BR], ['Rhaetian', 5, 5, BR],
    ['Calabrian', 5, 5, BR], ['Eoarchean', 5, 5, BR], ['Tonian', 5, 5, BR],
  ],
  dinosaur_words: [
    ['ornithopod', 4, 3], ['ichnology', 5, 4], ['sauropodomorph', 5, 4], ['Chicxulub', 4, 4, { type: 'place' }], ['osteoderm', 5, 5],
    ['Bone Wars', 5, 5, BR], ['Hell Creek', 5, 5, { type: 'place' }],
  ],
  baby_animals: [
    ['eyas', 5, 5], ['peachick', 3, 3], ['keet', 5, 5], ['alevin', 5, 4], ['puggle', 4, 4], ['fingerling', 4, 4],
  ],
  animal_homes: [
    ['shippon', 5, 4], ['skep', 5, 4], ['termitary', 5, 5], ['vivarium', 4, 4], ['terrarium', 3, 3], ['cowshed', 2, 2],
    ['mews', 4, 5, { g: 'falconry' }],
  ],
  animal_sounds: [
    ['chirr', 4, 4], ['stridulation', 5, 5], ['croon', 3, 3], ['whoop', 3, 3], ['yip', 2, 2],
    ['bugle', 4, 4, { g: 'elk' }], ['boom', 2, 4, { g: 'bittern' }], ['twitter', 2, 2, { g: 'bird' }],
  ],
  collective_nouns: [
    ['prickle', 4, 4, { g: 'porcupines' }], ['bask', 4, 5, { g: 'crocodiles' }], ['obstinacy', 4, 5, { g: 'buffalo' }],
    ['implausibility', 4, 5, { g: 'gnus' }], ['tiding', 5, 5, { g: 'magpies' }], ['labour', 3, 5, { g: 'moles' }],
    ['wisdom', 3, 4, { g: 'wombats' }], ['smack', 3, 4, { g: 'jellyfish' }], ['zeal', 3, 4, { g: 'zebras' }],
    ['flamboyance', 3, 3, { g: 'flamingos' }],
  ],
  male_animals: [
    ['gib', 5, 5, { g: 'cat' }], ['stot', 5, 5], ['reynard', 4, 4], ['gelding', 3, 3], ['cockerel', 2, 2],
    ['pricket', 5, 5], ['brocket', 5, 5], ['dog otter', 4, 4],
  ],
  female_animals: [
    ['reeve', 5, 5, { g: 'female ruff' }], ['gimmer', 5, 5], ['jennet', 4, 4], ['queen bee', 2, 3],
  ],
};
