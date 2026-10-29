// Depth-3 animal themes, chunk 5 (animal words). Format: tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const AN = (o = {}) => ({ g: 'animal', ...o });
const V = (o = {}) => ({ pos: 'verb', ...o });
const AJ = (o = {}) => ({ pos: 'adjective', ...o });

export const THEMES = {
  female_animals: { d: 2 }, animal_body_parts: { d: 1 }, animal_movements: { d: 2 }, animal_coverings: { d: 2 },
  animal_adjectives: { d: 4 }, animal_experts: { d: 3 }, animal_diets: { d: 3 }, hybrid_animals: { d: 3 },
};

export const FIXES = [
  { gloss: ['queen', 'chess_pieces', 'chess piece'] }, { gloss: ['dam', 'engineering', 'barrier'] },
  { gloss: ['comb', 'personal_care', 'hair tool'] }, { gloss: ['coat', 'clothes', 'clothing'] },
  { gloss: ['fleece', 'fabrics_and_sewing', 'fabric'] }, { gloss: ['browser', 'computers', 'software'] }, { gloss: ['columbine', 'flowers', 'flower'] }, { gloss: ['antenna', 'media_and_communication', 'aerial'] }, { gloss: ['velvet', 'fabrics_and_sewing', 'fabric'] },
];

export const DATA = {
  female_animals: [
    ['cow', 1, 1], ['hen', 1, 1], ['ewe', 2, 1], ['mare', 2, 1, { g: 'horse' }], ['sow', 2, 1, { g: 'pig' }], ['lioness', 1, 1], ['tigress', 2, 1], ['doe', 2, 2, AN()],
    ['vixen', 2, 1], ['filly', 2, 1], ['heifer', 2, 2], ['nanny', 2, 3, AN()], ['nanny goat', 2, 1], ['peahen', 3, 1], ['jenny', 3, 3, AN({ al: [['jennet', 'synonym', 4, 3]] })],
    ['queen', 1, 4, { g: 'cat' }], ['hind', 3, 2, AN()], ['jill', 4, 3, AN()], ['gilt', 4, 3, AN()], ['leopardess', 3, 2], ['she-wolf', 2, 1], ['pen', 3, 3, AN()],
    ['dam', 3, 3, AN()], ['bitch', 2, 2, { g: 'female dog', vulgar: true }], ['she-bear', 3, 2], ['pullet', 3, 3, AN()], ['brood mare', 3, 2], ['cow elephant', 4, 2],
  ],
  animal_body_parts: [
    ['paw', 1, 1], ['claw', 1, 1], ['tail', 1, 1], ['beak', 1, 1], ['fin', 1, 1], ['wing', 1, 2, AN()], ['horn', 1, 2, AN()], ['hoof', 1, 1], ['trunk', 1, 2, { g: 'elephant' }],
    ['mane', 1, 2, { g: 'horse' }], ['snout', 2, 1], ['antler', 2, 1], ['tusk', 2, 1], ['flipper', 2, 1], ['talon', 2, 1], ['whiskers', 2, 1], ['udder', 2, 1], ['fang', 2, 1],
    ['gill', 2, 2, AN()], ['hump', 2, 2], ['muzzle', 3, 2, AN()], ['pouch', 2, 3, AN()], ['tentacle', 2, 1], ['antenna', 2, 3, AN()], ['pincer', 3, 2], ['stinger', 2, 2],
    ['mandible', 4, 3], ['proboscis', 4, 3], ['dewlap', 4, 3], ['wattle', 4, 3, AN()], ['crest', 3, 3, { g: 'bird' }], ['comb', 2, 3, { g: 'bird' }], ['spur', 3, 4, AN()],
    ['fetlock', 4, 3], ['hock', 4, 3, AN()], ['pad', 2, 3, AN()], ['jowls', 3, 3], ['bill', 2, 2, AN()], ['barbel', 5, 4], ['blowhole', 3, 2], ['carapace', 4, 3],
    ['plastron', 5, 5], ['cloaca', 5, 4], ['spiracle', 5, 5], ['pedipalp', 5, 5], ['dorsal fin', 3, 2], ['tail fin', 2, 2], ['webbed foot', 3, 2], ['cloven hoof', 3, 3],
    ['scale', 1, 3, AN()], ['feather', 1, 2], ['shell', 1, 3, AN()],
  ],
  animal_movements: [
    ['hop', 1, 1, V()], ['crawl', 1, 1, V()], ['swim', 1, 1, V()], ['leap', 1, 1, V()], ['trot', 2, 1], ['gallop', 1, 1, V()], ['slither', 2, 1, V()], ['waddle', 2, 1, V()],
    ['scurry', 2, 1, V()], ['soar', 2, 1, V()], ['swoop', 2, 1, V()], ['pounce', 2, 1, V()], ['prowl', 2, 1, V()], ['burrow', 2, 1, V()], ['flutter', 2, 1, V()], ['canter', 2, 2],
    ['scuttle', 3, 1, V()], ['glide', 2, 2, V()], ['bound', 3, 2, V({ g: 'leap' })], ['stalk', 2, 2, V({ g: 'hunt' })], ['dart', 2, 3, V({ g: 'dash' })], ['dive', 1, 2, V()],
    ['flap', 2, 2, V()], ['hover', 2, 2, V()], ['lope', 3, 2, V()], ['amble', 3, 3, V()], ['lollop', 4, 3, V()], ['skitter', 3, 2, V()], ['scamper', 2, 1, V()], ['slink', 3, 2, V()],
    ['wriggle', 2, 2, V()], ['creep', 2, 3, V({ g: 'move' })], ['bolt', 2, 4, V({ g: 'run' })], ['swing', 1, 4, V({ g: 'movement' })], ['brachiate', 5, 3, V()],
    ['undulate', 4, 3, V()], ['sidle', 3, 3, V()], ['prance', 2, 2, V()], ['trundle', 3, 4, V()], ['skulk', 3, 3, V()], ['plod', 3, 3, V()], ['wade', 2, 3, V()],
    ['lumber', 3, 3, V()], ['hobble', 2, 4, V()], ['mosey', 4, 4, V({ reg: ['US'] })], ['saunter', 3, 4, V()],
  ],
  animal_coverings: [
    ['fur', 1, 1], ['feathers', 1, 1], ['scales', 1, 1, AN()], ['quills', 2, 1], ['wool', 1, 2], ['hide', 2, 1, AN()], ['shell', 1, 2, AN()], ['pelt', 2, 1],
    ['fleece', 2, 2, { g: 'sheep' }], ['plumage', 3, 1], ['coat', 1, 2, AN()], ['hair', 1, 3], ['skin', 1, 3], ['down', 2, 2, { g: 'feathers' }], ['bristles', 3, 2],
    ['spines', 2, 2, AN()], ['carapace', 4, 3], ['exoskeleton', 3, 3], ['blubber', 2, 3], ['armour', 3, 3, AN({ al: [['armor', 'spelling', 3, 3, ['US']]] })],
    ['pelage', 5, 3], ['fuzz', 2, 3, AN()], ['scutes', 5, 4], ['cuticle', 3, 4, AN()], ['thorns', 2, 4, AN()], ['spikes', 2, 3, AN()], ['bony plates', 4, 3],
    ['velvet', 3, 4, { g: 'antler' }], ['lanolin', 4, 5], ['mucus', 3, 5],
  ],
  animal_adjectives: [
    ['feline', 2, 1, AJ()], ['canine', 2, 1, AJ()], ['equine', 2, 1, AJ()], ['bovine', 2, 1, AJ()], ['porcine', 3, 1, AJ()], ['ovine', 3, 1, AJ()], ['avian', 2, 1, AJ()],
    ['lupine', 3, 1, AJ()], ['vulpine', 4, 1, AJ()], ['ursine', 4, 1, AJ()], ['leonine', 4, 1, AJ()], ['simian', 3, 1, AJ()], ['piscine', 4, 1, AJ()], ['serpentine', 3, 3, AJ({ g: 'snakelike' })],
    ['asinine', 3, 3, AJ()], ['caprine', 4, 1, AJ()], ['murine', 4, 2, AJ()], ['leporine', 5, 2, AJ()], ['cervine', 5, 2, AJ()], ['aquiline', 4, 3, AJ()], ['anserine', 5, 2, AJ()],
    ['corvine', 5, 2, AJ()], ['elephantine', 4, 3, AJ()], ['taurine', 4, 3, AJ({ g: 'bull' })], ['vespine', 5, 3, AJ()], ['apian', 5, 2, AJ()], ['hircine', 5, 3, AJ()],
    ['columbine', 4, 3, AJ({ g: 'dove' })], ['pavonine', 5, 3, AJ()], ['ranine', 5, 2, AJ()], ['anguine', 5, 3, AJ()], ['sciurine', 5, 2, AJ()], ['pardine', 5, 3, AJ()],
    ['crocodilian', 4, 3, AJ()], ['cetacean', 4, 3, AJ()], ['bestial', 3, 4, AJ()],
  ],
  animal_experts: [
    ['vet', 1, 1, AN()], ['zoologist', 2, 1], ['zookeeper', 1, 1], ['veterinarian', 2, 1], ['ornithologist', 3, 1], ['entomologist', 3, 1], ['herpetologist', 4, 1],
    ['ichthyologist', 4, 1], ['mammalogist', 5, 1], ['primatologist', 4, 1], ['arachnologist', 5, 1], ['ethologist', 4, 1], ['naturalist', 2, 2], ['marine biologist', 2, 2],
    ['lepidopterist', 4, 2], ['beekeeper', 2, 2], ['apiarist', 4, 2], ['malacologist', 5, 2], ['conchologist', 5, 3], ['cetologist', 5, 2], ['oologist', 5, 3], ['game warden', 3, 3],
    ['wildlife biologist', 3, 1], ['animal behaviourist', 3, 1], ['myrmecologist', 5, 2], ['carcinologist', 5, 2], ['teuthologist', 5, 2], ['animal trainer', 2, 2],
    ['dog trainer', 2, 2], ['wildlife rescuer', 3, 2], ['veterinary surgeon', 3, 1], ['falconer', 3, 3], ['conservationist', 3, 3], ['birder', 3, 3], ['herpetoculturist', 5, 3],
  ],
  animal_diets: [
    ['carnivore', 1, 1], ['herbivore', 1, 1], ['omnivore', 3, 1], ['scavenger', 2, 1], ['insectivore', 3, 1], ['piscivore', 4, 1], ['frugivore', 4, 1], ['granivore', 5, 1],
    ['nectarivore', 5, 1], ['folivore', 5, 1], ['detritivore', 4, 2], ['predator', 2, 2], ['grazer', 3, 2], ['browser', 3, 3, AN()], ['filter feeder', 3, 1],
    ['apex predator', 3, 2], ['carrion eater', 3, 1], ['planktivore', 5, 2], ['molluscivore', 5, 2], ['hypercarnivore', 5, 2], ['coprophage', 5, 3], ['myrmecophage', 5, 2],
    ['cannibal', 2, 3], ['parasite', 2, 3], ['insect eater', 2, 1], ['meat eater', 1, 1], ['plant eater', 1, 1], ['seed eater', 2, 2], ['fish eater', 2, 2],
    ['bloodsucker', 3, 3], ['obligate carnivore', 4, 1], ['saprophage', 5, 3],
  ],
  hybrid_animals: [
    ['mule', 1, 1], ['hinny', 3, 1], ['liger', 3, 1], ['tigon', 3, 1], ['zonkey', 3, 1], ['zorse', 3, 1], ['beefalo', 3, 1], ['wholphin', 3, 1], ['geep', 4, 1],
    ['grolar bear', 3, 1], ['pizzly', 3, 2], ['labradoodle', 3, 1], ['cockapoo', 3, 1], ['puggle', 3, 1], ['leopon', 4, 1], ['coywolf', 3, 1], ['wolfdog', 3, 1],
    ['zeedonk', 4, 1], ['dzo', 5, 2], ['cattalo', 5, 1], ['goldendoodle', 3, 1], ['cavapoo', 3, 1], ['maltipoo', 3, 1], ['pomsky', 3, 1], ['chorkie', 4, 1], ['mulard', 5, 2],
    ['zebroid', 4, 1], ['Bengal cat', 3, 3, { type: 'proper' }], ['Savannah cat', 4, 3, { type: 'proper' }], ['yakow', 5, 1], ['cama', 5, 1], ['mongrel', 2, 4],
    ['crossbreed', 3, 2], ['designer dog', 3, 3],
  ],
};
