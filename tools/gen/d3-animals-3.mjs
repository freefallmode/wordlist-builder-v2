// Depth-3 animal themes, chunk 3. Format: tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const A = (o = {}) => ({ g: 'animal', ...o });
const B = (o = {}) => ({ g: 'bird', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const CH = (o = {}) => ({ type: 'proper', g: 'chicken', ...o });
const SH = (o = {}) => ({ type: 'proper', g: 'sheep', ...o });
const HB = (o = {}) => ({ type: 'proper', g: 'horse', ...o });
const PO = (o = {}) => ({ type: 'proper', g: 'pony', ...o });

export const THEMES = {
  chicken_breeds: { d: 4 }, sheep_breeds: { d: 4 }, working_animals: { d: 2 },
  horse_breeds: { d: 3 }, pony_breeds: { d: 4 }, horse_colors: { d: 4 }, horse_tack: { d: 3 }, parts_of_a_horse: { d: 4 }, horse_family: { d: 2 },
  african_animals: { d: 1 }, middle_eastern_animals: { d: 3 }, turkish_animals: { d: 4 }, asian_animals: { d: 2 }, australian_animals: { d: 1 },
  antarctic_animals: { d: 2 }, south_american_animals: { d: 2 }, north_american_animals: { d: 1 }, european_animals: { d: 2 }, arctic_animals: { d: 1 },
  pond_life: { d: 2 }, woodland_animals: { d: 1 }, desert_animals: { d: 1 }, rainforest_animals: { d: 1 }, savanna_animals: { d: 1 }, mountain_animals: { d: 2 },
  city_animals: { d: 1 }, nocturnal_animals: { d: 2 }, venomous_animals: { d: 3 }, hibernating_animals: { d: 3 }, migrating_animals: { d: 3 },
};

export const FIXES = [
  { gloss: ['sorrel', 'herbs_spices_and_sauces', 'herb'] }, { gloss: ['champagne', 'drinks', 'drink'] }, { gloss: ['fjord', 'landscapes', 'landform'] },
  { gloss: ['Icelandic', 'languages', 'language'] }, { gloss: ['black', 'colors', 'color'] }, { gloss: ['white', 'colors', 'color'] }, { gloss: ['gray', 'colors', 'color'] },
  { gloss: ['grey', 'colors', 'color'] }, { gloss: ['frog', 'reptiles_and_amphibians', 'amphibian'] }, { gloss: ['Hydra', 'mythology', 'monster'] },
];

export const DATA = {
  chicken_breeds: [
    ['Rhode Island Red', 3, 2, CH()], ['Leghorn', 3, 2, CH()], ['Plymouth Rock', 3, 2, CH()], ['Sussex', 3, 3, CH()], ['Orpington', 3, 3, CH()],
    ['Silkie', 3, 2, CH()], ['bantam', 3, 2], ['Brahma', 3, 3, CH()], ['Cochin', 4, 3, CH()], ['Wyandotte', 4, 3, CH()],
    ['Australorp', 4, 3, CH()], ['Marans', 4, 3, CH()], ['Dorking', 4, 3, CH()], ['Faverolles', 5, 4, CH()], ['Araucana', 4, 3, CH()],
    ['Ancona', 4, 3, CH()], ['Minorca', 4, 3, CH()], ['Barnevelder', 5, 4, CH()], ['Welsummer', 5, 4, CH()], ['Sebright', 5, 4, CH()],
    ['Jersey Giant', 4, 3, CH()], ['Light Sussex', 4, 3, CH()], ['Buff Orpington', 4, 3, CH()], ['Polish', 4, 3, CH()], ['Hamburg', 4, 4, CH()],
    ['Houdan', 5, 4, CH()], ['Campine', 5, 4, CH()], ['Cream Legbar', 5, 4, CH()], ['Serama', 4, 3, CH()], ['Ayam Cemani', 5, 3, CH()],
    ['New Hampshire', 4, 3, CH()], ['Delaware', 5, 4, CH()], ['Dominique', 5, 4, CH()], ['Old English Game', 5, 4, CH()], ['Ixworth', 5, 5, CH({ reg: ['UK'] })],
    ['Scots Dumpy', 5, 4, CH({ reg: ['UK'] })], ['Appenzeller', 5, 5, CH()], ['Naked Neck', 4, 3, CH({ type: 'common' })], ['Frizzle', 4, 3, CH({ type: 'common' })], ['Cornish', 4, 4, CH()],
  ],

  sheep_breeds: [
    ['Merino', 2, 1, SH()], ['Suffolk', 3, 3, SH()], ['Texel', 4, 3, SH()], ['Cheviot', 4, 3, SH()], ['Herdwick', 4, 3, SH({ reg: ['UK'] })],
    ['Jacob', 4, 3, SH()], ['Dorset', 3, 3, SH()], ['Leicester', 3, 3, SH()], ['Romney', 4, 3, SH()], ['Southdown', 4, 3, SH()],
    ['Hampshire', 3, 3, SH()], ['Rambouillet', 5, 4, SH()], ['Corriedale', 4, 3, SH()], ['Swaledale', 4, 3, SH({ reg: ['UK'] })], ['Blackface', 4, 3, SH()],
    ['Border Leicester', 5, 4, SH()], ['Lincoln', 3, 4, SH()], ['Cotswold', 3, 4, SH()], ['Soay', 4, 3, SH()], ['Karakul', 4, 3, SH()],
    ['Dorper', 4, 4, SH()], ['Wensleydale', 3, 4, SH()], ['Hebridean', 4, 3, SH({ reg: ['UK'] })], ['Welsh Mountain', 4, 3, SH()], ['Romanov', 5, 4, SH()],
    ['Icelandic', 3, 4, SH()], ['Katahdin', 5, 4, SH()], ['Awassi', 5, 4, SH()], ['Ryeland', 5, 4, SH()], ['Lleyn', 5, 4, SH()],
    ['Charollais', 5, 4, SH()], ['Polwarth', 5, 4, SH()], ['Shetland', 3, 3, SH()], ['Manx Loaghtan', 5, 4, SH({ reg: ['UK'] })],
  ],

  working_animals: [
    ['guide dog', 1, 1], ['sheepdog', 1, 1], ['sled dog', 2, 1], ['police dog', 1, 1], ['ox', 1, 1], ['oxen', 2, 1], ['camel', 1, 2], ['carthorse', 2, 1, { al: [['cart horse', 'spelling', 2, 2]] }],
    ['plough horse', 2, 1, { al: [['plow horse', 'spelling', 2, 2, ['US']]] }], ['draught horse', 2, 2, { al: [['draft horse', 'spelling', 2, 2, ['US']]] }], ['pack mule', 2, 1], ['packhorse', 4, 1],
    ['donkey', 1, 2], ['mule', 2, 2], ['husky', 1, 2], ['llama', 1, 3], ['reindeer', 1, 3], ['elephant', 1, 3], ['carrier pigeon', 2, 1], ['homing pigeon', 2, 2],
    ['sniffer dog', 2, 1], ['search and rescue dog', 3, 2], ['guard dog', 1, 2], ['herding dog', 2, 1], ['therapy dog', 2, 2], ['cormorant', 3, 4],
    ['ferret', 3, 4], ['water buffalo', 2, 3], ['yak', 3, 3], ['war horse', 2, 2], ['truffle pig', 3, 3], ['mine canary', 3, 4],
    ['seeing eye dog', 2, 2, { reg: ['US'] }], ['bomb disposal dog', 3, 3], ['dray horse', 4, 3], ['cattle dog', 3, 3],
  ],

  horse_breeds: [
    ['Arabian', 2, 2, HB()], ['Thoroughbred', 2, 1], ['Clydesdale', 2, 1], ['Shire', 3, 2, HB()], ['Percheron', 3, 2], ['Appaloosa', 3, 2, P()], ['Mustang', 2, 2, HB()],
    ['Lipizzaner', 3, 2], ['Friesian', 3, 2], ['Morgan', 4, 3, HB()], ['Quarter Horse', 3, 2, P()], ['Andalusian', 4, 3, P()], ['Hanoverian', 4, 3],
    ['Suffolk Punch', 4, 3, P()], ['Belgian', 4, 4, HB()], ['Lusitano', 4, 3], ['Akhal-Teke', 4, 3], ['Trakehner', 4, 3], ['Holsteiner', 5, 4],
    ['Standardbred', 4, 3], ['Tennessee Walker', 4, 3, P()], ['Cleveland Bay', 4, 3, P()], ['Hackney', 4, 3, HB()], ['Oldenburg', 5, 4, HB()], ['Irish Draught', 4, 3, P()],
    ['Przewalski\'s horse', 3, 3, P()], ['Camargue', 4, 3, HB()], ['Criollo', 5, 4], ['Knabstrupper', 5, 4], ['Brumby', 3, 3, { reg: ['AU'] }],
    ['Marwari', 5, 4], ['Ardennes', 5, 4, HB()], ['Orlov Trotter', 5, 4, P()], ['Selle Francais', 5, 4, P()], ['Paint Horse', 3, 3, P()], ['Missouri Fox Trotter', 5, 4, P()],
    ['Dutch Warmblood', 4, 3, P()], ['Mongolian horse', 4, 3, P()],
  ],

  pony_breeds: [
    ['Shetland pony', 2, 1, P()], ['Welsh pony', 3, 2, P()], ['Welsh Cob', 4, 3, P()], ['Exmoor pony', 3, 2, P()], ['Dartmoor pony', 3, 2, P()], ['New Forest pony', 3, 2, P()],
    ['Connemara', 3, 2, PO()], ['Highland pony', 4, 3, P()], ['Fell pony', 4, 3, P()], ['Dales pony', 4, 3, P()], ['Eriskay pony', 5, 4, P()],
    ['Icelandic horse', 3, 3, P()], ['Haflinger', 4, 3, PO()], ['Fjord', 4, 3, PO()], ['Chincoteague pony', 4, 3, P()], ['Pony of the Americas', 5, 4, P()],
    ['Gotland pony', 5, 4, P()], ['Falabella', 4, 3, PO()], ['Caspian', 5, 4, PO()], ['Konik', 5, 4, PO()], ['Pottok', 5, 4, PO()],
    ['Sable Island pony', 5, 4, P()], ['Hackney pony', 4, 3, P()], ['Welsh Mountain pony', 4, 3, P()], ['Shetland', 3, 2, PO()],
    ['Landais', 5, 5, PO()], ['Bardigiano', 5, 5, PO()], ['Newfoundland pony', 5, 4, P()], ['Miniature horse', 3, 3],
  ],

  horse_colors: [
    ['bay', 3, 2, { g: 'horse color' }], ['chestnut', 2, 2, { g: 'horse color' }], ['black', 1, 3, { g: 'horse color' }], ['grey', 1, 3, { g: 'horse color', al: [['gray', 'spelling', 1, 3, ['US'], { g: 'horse color' }]] }],
    ['white', 1, 3, { g: 'horse color' }], ['palomino', 2, 1], ['roan', 3, 2], ['dun', 4, 3, { g: 'horse color' }], ['piebald', 3, 2], ['skewbald', 4, 2],
    ['pinto', 3, 2, { g: 'horse color' }], ['buckskin', 3, 2, { g: 'horse color' }], ['sorrel', 4, 2, { g: 'horse color' }], ['cremello', 5, 3], ['dapple grey', 3, 2, { al: [['dapple gray', 'spelling', 3, 2, ['US']]] }],
    ['strawberry roan', 4, 3], ['blue roan', 4, 3], ['liver chestnut', 4, 3], ['flaxen', 4, 3], ['perlino', 5, 4], ['champagne', 2, 5, { g: 'horse color' }],
    ['grullo', 5, 4], ['brindle', 3, 4, { g: 'horse color' }], ['dark bay', 4, 3],
    ['seal brown', 4, 3], ['flea-bitten grey', 4, 3, { al: [['flea-bitten gray', 'spelling', 4, 3, ['US']]] }], ['red dun', 5, 4], ['bay roan', 5, 4],
    ['mealy', 5, 4, { g: 'horse color' }], ['smoky black', 5, 4],
  ],

  horse_tack: [
    ['saddle', 1, 1], ['bridle', 2, 1], ['reins', 2, 1], ['stirrup', 2, 1], ['halter', 2, 1, { g: 'horse' }], ['harness', 2, 1, { g: 'horse tack' }], ['horseshoe', 1, 1],
    ['bit', 2, 2, { g: 'horse tack' }], ['girth', 3, 2, { g: 'horse' }], ['martingale', 4, 2], ['noseband', 4, 2], ['blinkers', 3, 2, { g: 'horse tack' }], ['saddle blanket', 3, 2], ['saddle pad', 3, 2],
    ['snaffle', 4, 2], ['curb', 3, 4, { g: 'horse bit' }], ['cinch', 3, 3, { g: 'horse tack' }], ['crupper', 4, 3], ['breastplate', 3, 3, { g: 'horse tack' }],
    ['lead rope', 3, 2], ['surcingle', 5, 4], ['numnah', 5, 3, { reg: ['UK'] }], ['browband', 4, 3], ['throatlash', 5, 4], ['headstall', 4, 3],
    ['hackamore', 4, 3], ['spurs', 2, 2, { g: 'horse tack' }], ['riding crop', 2, 2], ['stirrup leather', 4, 3], ['girth strap', 4, 3], ['bridoon', 5, 4],
    ['pelham', 5, 4, { g: 'horse bit' }], ['bosal', 5, 4], ['horse blanket', 2, 2, { al: [['rug', 'synonym', 3, 4, ['UK'], { g: 'horse blanket' }]] }], ['fly mask', 3, 3], ['hobble', 4, 3, { g: 'horse tack' }],
    ['tack', 3, 2, { g: 'horse gear' }], ['pommel', 4, 3, { g: 'saddle part' }], ['cantle', 5, 3], ['saddlebag', 3, 3],
  ],

  parts_of_a_horse: [
    ['mane', 1, 1, { g: 'horse' }], ['tail', 1, 2, { g: 'animal part' }], ['hoof', 1, 1], ['withers', 4, 2], ['fetlock', 4, 2], ['pastern', 4, 2], ['hock', 4, 2, { g: 'leg joint' }],
    ['croup', 4, 2], ['muzzle', 3, 2, { g: 'animal part' }], ['forelock', 4, 2], ['cannon bone', 4, 3], ['coronet', 5, 3, { g: 'horse hoof' }], ['flank', 2, 3, { g: 'animal part' }],
    ['stifle', 4, 3], ['poll', 4, 3, { g: 'horse head' }], ['gaskin', 5, 4], ['loin', 3, 4, { g: 'animal part' }], ['barrel', 2, 4, { g: 'horse body' }], ['chestnut', 4, 4, { g: 'horse leg' }],
    ['ergot', 5, 5], ['frog', 2, 4, { g: 'hoof part' }], ['knee', 1, 3], ['shoulder', 1, 3], ['back', 1, 3], ['neck', 1, 2],
    ['nostril', 2, 2], ['forearm', 2, 3], ['dock', 3, 3, { g: 'horse tail' }], ['crest', 3, 3, { g: 'horse neck' }], ['throatlatch', 5, 4], ['heel', 1, 3, { g: 'horse hoof' }],
    ['point of hip', 5, 4], ['chin groove', 5, 4], ['cheek', 1, 3, { g: 'horse head' }], ['elbow', 1, 4], ['sole', 2, 4, { g: 'horse hoof' }], ['coffin bone', 5, 5],
  ],

  horse_family: [
    ['horse', 1, 1], ['donkey', 1, 1], ['zebra', 1, 1], ['mule', 2, 1], ['pony', 1, 2], ['ass', 2, 2, { g: 'donkey' }], ['hinny', 4, 2], ['onager', 4, 2], ['kiang', 5, 3],
    ['wild ass', 3, 2], ['burro', 3, 2], ['Przewalski\'s horse', 3, 2, P()], ['plains zebra', 3, 2], ['Grevy\'s zebra', 4, 2, P()], ['mountain zebra', 4, 2], ['quagga', 4, 3],
    ['tarpan', 5, 4], ['zorse', 4, 3], ['zonkey', 4, 3], ['zebroid', 5, 4], ['Somali wild ass', 5, 3, P()], ['Asiatic wild ass', 5, 3, P()], ['mustang', 2, 3, A()],
    ['brumby', 3, 3, { reg: ['AU'] }], ['wild horse', 2, 2], ['equid', 5, 3], ['Equus', 5, 4, { type: 'proper' }], ['feral horse', 3, 3],
    ['Tibetan wild ass', 5, 4], ['African wild ass', 5, 3],
  ],

  african_animals: [
    ['lion', 1, 1], ['elephant', 1, 1], ['giraffe', 1, 1], ['zebra', 1, 1], ['hippopotamus', 1, 1], ['rhinoceros', 2, 1], ['gorilla', 1, 1], ['cheetah', 1, 1], ['leopard', 1, 1],
    ['hyena', 2, 1], ['wildebeest', 3, 1], ['warthog', 2, 1], ['meerkat', 2, 1], ['impala', 3, 2], ['baboon', 2, 2], ['chimpanzee', 1, 2], ['ostrich', 1, 1], ['okapi', 3, 2],
    ['aardvark', 3, 2], ['pangolin', 3, 2], ['mandrill', 3, 2], ['kudu', 4, 2], ['eland', 4, 3], ['springbok', 3, 2], ['African wild dog', 3, 2, P()], ['serval', 3, 3],
    ['honey badger', 3, 3], ['secretary bird', 3, 3], ['hartebeest', 4, 3], ['aardwolf', 4, 3], ['gerenuk', 5, 4], ['dik-dik', 4, 3], ['klipspringer', 5, 4], ['black mamba', 3, 2],
    ['Nile crocodile', 3, 2, P()], ['vervet monkey', 4, 3], ['Cape buffalo', 3, 2, P()], ['bonobo', 3, 3], ['bongo', 4, 3, A()], ['caracal', 4, 3], ['fennec fox', 3, 3],
    ['African elephant', 2, 1, P()], ['mongoose', 3, 3], ['jackal', 3, 2], ['tsetse fly', 3, 3],
  ],

  middle_eastern_animals: [
    ['Arabian camel', 3, 1, P()], ['dromedary', 3, 2], ['Arabian oryx', 4, 2, P()], ['sand cat', 4, 3], ['fennec fox', 3, 3], ['caracal', 4, 3], ['striped hyena', 4, 3],
    ['golden jackal', 4, 3], ['Arabian leopard', 4, 2, P()], ['Arabian wolf', 4, 3, P()], ['saluki', 4, 3], ['Arabian horse', 3, 2, P()], ['sand viper', 4, 3], ['horned viper', 4, 3],
    ['spiny-tailed lizard', 5, 3], ['uromastyx', 5, 4], ['hoopoe', 3, 4], ['saker falcon', 4, 3], ['houbara bustard', 5, 3], ['Persian fallow deer', 5, 3, P()],
    ['onager', 4, 4], ['rock hyrax', 4, 4], ['jerboa', 4, 3], ['Nubian ibex', 4, 3, P()], ['camel spider', 3, 4], ['deathstalker', 5, 4, { g: 'scorpion' }],
    ['Egyptian vulture', 4, 4, P()], ['sacred ibis', 4, 4], ['Persian cat', 2, 3, P()], ['Arabian babbler', 5, 4, P()], ['Arabian gazelle', 4, 3, P()], ['desert hedgehog', 4, 4],
    ['goitered gazelle', 5, 4], ['Syrian brown bear', 5, 4, P()],
  ],

  turkish_animals: [
    ['Kangal', 3, 1, { g: 'dog breed', type: 'proper' }], ['Anatolian shepherd', 3, 2, P()], ['Turkish Van', 4, 2, P()], ['Turkish Angora', 4, 2, P()], ['Angora cat', 3, 2, P()],
    ['Angora goat', 3, 2, P()], ['Angora rabbit', 3, 3, P()], ['Akbash', 5, 3, { g: 'dog breed', type: 'proper' }], ['Anatolian leopard', 5, 3, P()], ['Caretta caretta', 4, 2, { type: 'proper' }],
    ['monk seal', 4, 3], ['Dalmatian pelican', 4, 3, P()], ['northern bald ibis', 5, 3], ['Anatolian mouflon', 5, 3, P()], ['Karayaka sheep', 5, 3, P()],
    ['Akkaraman sheep', 5, 4, P()], ['Rahvan horse', 5, 4, P()], ['brown bear', 2, 4], ['grey wolf', 2, 4, { al: [['gray wolf', 'spelling', 2, 4, ['US']]] }],
    ['demoiselle crane', 4, 4], ['eastern imperial eagle', 5, 4], ['flamingo', 2, 5], ['loggerhead turtle', 3, 3],
    ['Anatolian lynx', 5, 4, P()], ['fallow deer', 3, 4], ['wild boar', 2, 4], ['roe deer', 3, 4],
  ],

  asian_animals: [
    ['tiger', 1, 1], ['giant panda', 1, 1], ['orangutan', 2, 1], ['Asian elephant', 2, 1, P()], ['Indian rhinoceros', 3, 2, P()], ['snow leopard', 2, 2], ['red panda', 2, 1],
    ['Komodo dragon', 2, 1, P()], ['king cobra', 2, 1], ['Bengal tiger', 2, 1, P()], ['sloth bear', 3, 2], ['water buffalo', 2, 2], ['yak', 3, 2], ['gibbon', 3, 2], ['macaque', 3, 3],
    ['proboscis monkey', 4, 2], ['tarsier', 4, 2], ['binturong', 5, 3], ['pangolin', 3, 3], ['gaur', 5, 3], ['Malayan tapir', 4, 2, P()], ['saola', 5, 4], ['Bactrian camel', 3, 2, P()],
    ['clouded leopard', 4, 3], ['slow loris', 4, 3], ['Indian peafowl', 4, 3, P()], ['muntjac', 4, 3], ['takin', 5, 4], ['mynah', 3, 3], ['langur', 4, 3], ['dhole', 5, 4],
    ['colugo', 5, 4], ['sun bear', 4, 3], ['Asian black bear', 4, 3, P()], ['reticulated python', 4, 3], ['gharial', 4, 3], ['Mandarin duck', 3, 3, P()], ['mouse deer', 4, 3],
    ['goral', 5, 4], ['Siberian tiger', 3, 2, P()], ['Indian cobra', 3, 3, P()], ['tokay gecko', 4, 4], ['hornbill', 3, 3],
  ],

  australian_animals: [
    ['kangaroo', 1, 1], ['koala', 1, 1], ['wombat', 2, 1], ['platypus', 2, 1], ['echidna', 3, 1], ['Tasmanian devil', 2, 1, P()], ['dingo', 2, 1], ['emu', 2, 1], ['kookaburra', 3, 1],
    ['wallaby', 2, 1], ['possum', 3, 2], ['quokka', 4, 2], ['numbat', 4, 2], ['bilby', 4, 2], ['cassowary', 3, 2], ['thylacine', 4, 2], ['frill-necked lizard', 4, 2],
    ['saltwater crocodile', 3, 2], ['taipan', 4, 2], ['cockatoo', 2, 2], ['galah', 4, 2], ['budgerigar', 3, 3], ['sugar glider', 3, 2], ['bandicoot', 4, 3], ['goanna', 4, 3],
    ['thorny devil', 4, 3], ['funnel-web spider', 3, 2], ['redback spider', 3, 2], ['lyrebird', 4, 3], ['wallaroo', 4, 3], ['Tasmanian tiger', 3, 2, P()], ['box jellyfish', 3, 3],
    ['blue-ringed octopus', 4, 3], ['barramundi', 4, 3], ['black swan', 2, 3], ['joey', 2, 2, A({ g: 'baby kangaroo' })], ['brolga', 5, 3], ['cuscus', 5, 4], ['cane toad', 3, 3],
    ['red kangaroo', 3, 1],
  ],

  antarctic_animals: [
    ['emperor penguin', 2, 1], ['Adelie penguin', 3, 2, P()], ['leopard seal', 3, 2], ['Weddell seal', 4, 2], ['krill', 3, 2], ['orca', 2, 3], ['blue whale', 1, 3], ['elephant seal', 3, 2],
    ['albatross', 2, 3], ['skua', 4, 3], ['snow petrel', 4, 2], ['fur seal', 3, 3], ['crabeater seal', 4, 3], ['Antarctic toothfish', 5, 3], ['chinstrap penguin', 3, 2],
    ['gentoo penguin', 3, 2], ['minke whale', 3, 3], ['humpback whale', 2, 3], ['sheathbill', 5, 3], ['giant petrel', 5, 3], ['Antarctic midge', 5, 3], ['icefish', 4, 3],
    ['Ross seal', 5, 4], ['southern right whale', 4, 4], ['king penguin', 2, 2], ['macaroni penguin', 3, 3], ['rockhopper penguin', 3, 3], ['cape petrel', 5, 4],
    ['wandering albatross', 3, 3], ['Antarctic tern', 5, 3], ['sperm whale', 2, 4], ['Antarctic krill', 4, 2], ['colossal squid', 4, 3], ['springtail', 5, 4], ['tardigrade', 4, 5],
  ],

  south_american_animals: [
    ['llama', 1, 1], ['alpaca', 2, 1], ['jaguar', 1, 1, A()], ['anaconda', 2, 1], ['capybara', 3, 1], ['sloth', 2, 1, A()], ['toucan', 1, 2], ['macaw', 2, 1], ['piranha', 2, 1],
    ['tapir', 3, 2], ['armadillo', 2, 2], ['anteater', 2, 2], ['spectacled bear', 4, 2], ['condor', 2, 2], ['vicuña', 4, 2, { al: [['vicuna', 'spelling', 4, 2]] }], ['guanaco', 4, 2],
    ['poison dart frog', 3, 2], ['howler monkey', 3, 2], ['rhea', 3, 2, B()], ['ocelot', 3, 3], ['caiman', 3, 2], ['pink river dolphin', 4, 2], ['giant otter', 4, 3],
    ['marmoset', 3, 3], ['tamarin', 4, 3], ['scarlet macaw', 3, 2], ['harpy eagle', 4, 2], ['hoatzin', 5, 3], ['chinchilla', 3, 2], ['viscacha', 5, 3], ['maned wolf', 4, 3],
    ['pampas deer', 5, 4], ['coati', 4, 3], ['capuchin', 3, 3], ['electric eel', 2, 3], ['kinkajou', 5, 3], ['agouti', 5, 4], ['paca', 5, 4], ['pudu', 5, 4],
    ['huemul', 5, 5], ['guinea pig', 1, 3], ['Goliath birdeater', 5, 4, P()], ['golden lion tamarin', 5, 3], ['giant anteater', 3, 2],
  ],

  north_american_animals: [
    ['bald eagle', 1, 1], ['grizzly bear', 1, 1], ['black bear', 1, 1], ['moose', 2, 1], ['elk', 2, 1], ['bison', 2, 1], ['coyote', 2, 1], ['raccoon', 2, 1], ['skunk', 2, 1],
    ['opossum', 3, 2], ['beaver', 2, 1], ['porcupine', 2, 2], ['wolverine', 3, 2], ['mountain lion', 2, 2], ['bobcat', 2, 2], ['caribou', 3, 1], ['pronghorn', 4, 2],
    ['prairie dog', 2, 2], ['chipmunk', 2, 1], ['bighorn sheep', 3, 2], ['mountain goat', 2, 2], ['wild turkey', 2, 2], ['rattlesnake', 2, 2], ['Gila monster', 3, 2],
    ['roadrunner', 2, 2], ['cottonmouth', 4, 3], ['groundhog', 3, 2], ['muskrat', 3, 3], ['wapiti', 5, 3], ['polar bear', 1, 2], ['timber wolf', 3, 2], ['white-tailed deer', 2, 2],
    ['mule deer', 3, 3], ['California condor', 3, 3, P()], ['common loon', 4, 3], ['Canada goose', 2, 3, P()], ['black-footed ferret', 4, 3], ['snapping turtle', 3, 3],
    ['bullfrog', 2, 3], ['javelina', 5, 3], ['ringtail', 5, 4], ['fisher', 4, 4, A()], ['northern cardinal', 3, 3], ['whooping crane', 4, 3], ['sea otter', 2, 3],
  ],

  european_animals: [
    ['red deer', 2, 1], ['roe deer', 3, 2], ['wild boar', 2, 1], ['red fox', 2, 1], ['brown bear', 1, 2], ['grey wolf', 2, 2, { al: [['gray wolf', 'spelling', 2, 2, ['US']]] }], ['hedgehog', 1, 1],
    ['badger', 2, 1, A()], ['otter', 2, 2], ['red squirrel', 2, 1], ['European bison', 3, 2, P()], ['lynx', 3, 2], ['ibex', 3, 2], ['chamois', 4, 2], ['mouflon', 4, 3],
    ['stoat', 3, 3], ['weasel', 2, 3], ['pine marten', 4, 3], ['polecat', 3, 3], ['fallow deer', 3, 2], ['white stork', 3, 2], ['golden eagle', 2, 3], ['fire salamander', 4, 3],
    ['grass snake', 3, 2], ['adder', 3, 2, A()], ['European hamster', 4, 3, P()], ['dormouse', 3, 3], ['capercaillie', 4, 3], ['Alpine marmot', 4, 3, P()], ['Iberian lynx', 4, 2, P()],
    ['Barbary macaque', 4, 3, P()], ['edible dormouse', 5, 4], ['genet', 5, 4], ['European mink', 5, 4, P()], ['beech marten', 5, 4], ['hare', 2, 2], ['common toad', 3, 3],
    ['wildcat', 2, 3], ['mole', 2, 3, A()], ['nightingale', 2, 3], ['great bustard', 5, 4],
  ],

  arctic_animals: [
    ['polar bear', 1, 1], ['Arctic fox', 2, 1, P()], ['walrus', 2, 1], ['narwhal', 3, 1], ['beluga whale', 3, 2], ['reindeer', 1, 2], ['caribou', 3, 2], ['musk ox', 3, 2],
    ['snowy owl', 2, 1], ['Arctic hare', 3, 2, P()], ['lemming', 3, 2], ['harp seal', 3, 2], ['ringed seal', 4, 3], ['bowhead whale', 4, 3], ['Arctic tern', 3, 2, P()], ['puffin', 2, 3],
    ['Arctic wolf', 2, 2, P()], ['ermine', 3, 3], ['snow goose', 3, 3], ['ptarmigan', 4, 3], ['gyrfalcon', 5, 4], ['Greenland shark', 4, 3], ['orca', 2, 4], ['common eider', 4, 4],
    ['bearded seal', 4, 3], ['hooded seal', 5, 4], ['Arctic char', 4, 4], ['snow bunting', 5, 4], ['little auk', 5, 4], ['Svalbard reindeer', 5, 4], ['Arctic skua', 5, 4],
    ['Arctic cod', 5, 4], ['white wolf', 3, 3], ['Arctic ground squirrel', 4, 3], ['Ross\'s gull', 5, 5, P()], ['ivory gull', 5, 4], ['wolverine', 3, 4],
  ],

  pond_life: [
    ['frog', 1, 1, { g: 'amphibian' }], ['tadpole', 1, 1], ['newt', 2, 2], ['toad', 1, 2], ['dragonfly', 1, 1], ['damselfly', 3, 2], ['pond skater', 3, 1], ['water boatman', 4, 2], ['great diving beetle', 4, 2],
    ['pond snail', 3, 1], ['duck', 1, 2], ['moorhen', 3, 2], ['coot', 3, 2], ['heron', 2, 3], ['duckweed', 3, 2], ['pondweed', 3, 2], ['water lily', 2, 2],
    ['algae', 2, 3], ['bulrush', 3, 3], ['leech', 2, 2], ['water flea', 4, 2], ['daphnia', 4, 2], ['freshwater shrimp', 4, 2], ['stickleback', 4, 2], ['minnow', 3, 2],
    ['carp', 2, 3], ['goldfish', 1, 3], ['koi', 2, 3], ['water vole', 4, 3], ['mosquito larva', 3, 3], ['whirligig beetle', 5, 3], ['water scorpion', 4, 3], ['backswimmer', 5, 3],
    ['hydra', 4, 4, { g: 'polyp' }], ['amoeba', 3, 3], ['paramecium', 4, 4], ['frogspawn', 3, 1], ['caddisfly larva', 4, 3], ['mayfly nymph', 4, 3], ['terrapin', 3, 3], ['swan', 1, 3],
  ],

  woodland_animals: [
    ['deer', 1, 1], ['fox', 1, 1], ['badger', 2, 1, A()], ['squirrel', 1, 1], ['owl', 1, 1], ['hedgehog', 1, 2], ['woodpecker', 1, 1], ['wild boar', 2, 2], ['dormouse', 3, 2],
    ['wood mouse', 3, 2], ['bank vole', 4, 3], ['stoat', 3, 3], ['weasel', 2, 3], ['pine marten', 4, 2], ['jay', 3, 2, B()], ['tawny owl', 3, 2], ['red squirrel', 2, 1],
    ['roe deer', 3, 2], ['nuthatch', 4, 2], ['treecreeper', 4, 3], ['wren', 3, 3], ['robin', 1, 3], ['woodcock', 4, 3], ['bear', 1, 2, A()], ['raccoon', 2, 2], ['chipmunk', 2, 2],
    ['wolf', 1, 2], ['lynx', 3, 3], ['stag beetle', 3, 2], ['wood ant', 3, 2], ['stag', 2, 2, { g: 'deer' }], ['doe', 2, 2, { g: 'deer' }], ['fawn', 1, 2, { g: 'young deer' }], ['mole', 2, 3, A()],
    ['polecat', 3, 3], ['goshawk', 4, 3], ['sparrowhawk', 4, 3], ['great tit', 3, 3], ['blue tit', 2, 3], ['chaffinch', 3, 3], ['slow worm', 3, 3], ['capercaillie', 4, 3],
  ],

  desert_animals: [
    ['camel', 1, 1], ['scorpion', 2, 1], ['rattlesnake', 2, 1], ['fennec fox', 3, 1], ['roadrunner', 2, 2], ['coyote', 2, 2], ['Gila monster', 3, 1], ['sidewinder', 3, 2, A()],
    ['desert tortoise', 3, 2], ['kangaroo rat', 3, 2], ['jerboa', 4, 2], ['vulture', 2, 3], ['lizard', 1, 2], ['thorny devil', 4, 2], ['meerkat', 2, 3], ['Bactrian camel', 3, 2, P()],
    ['oryx', 3, 2], ['addax', 5, 3], ['dromedary', 3, 1], ['horned viper', 4, 2], ['sand cat', 4, 3], ['tarantula', 2, 3], ['desert iguana', 4, 3], ['chuckwalla', 5, 3],
    ['jackrabbit', 3, 3], ['burrowing owl', 4, 3], ['javelina', 5, 3], ['spadefoot toad', 5, 4], ['camel spider', 3, 3], ['dung beetle', 3, 4], ['locust', 3, 4], ['sandgrouse', 5, 4],
    ['ostrich', 1, 4], ['hyena', 2, 4], ['desert hedgehog', 4, 3], ['gerbil', 2, 3], ['cobra', 2, 3], ['bighorn sheep', 3, 3], ['Mojave rattlesnake', 4, 3], ['Saharan silver ant', 5, 4],
  ],

  rainforest_animals: [
    ['jaguar', 1, 1, A()], ['toucan', 1, 1], ['sloth', 2, 1, A()], ['macaw', 2, 1], ['orangutan', 2, 1], ['gorilla', 1, 2], ['poison dart frog', 3, 1], ['anaconda', 2, 1], ['tapir', 3, 2],
    ['howler monkey', 3, 1], ['spider monkey', 2, 1], ['capuchin', 3, 2], ['ocelot', 3, 2], ['tree frog', 2, 1], ['red-eyed tree frog', 3, 1], ['harpy eagle', 4, 2], ['morpho butterfly', 4, 2],
    ['leafcutter ant', 3, 2], ['tarantula', 2, 3], ['boa constrictor', 2, 2], ['chameleon', 2, 3], ['okapi', 3, 3], ['bonobo', 3, 3], ['chimpanzee', 1, 3], ['hornbill', 3, 3],
    ['bird of paradise', 3, 3, B()], ['cassowary', 3, 3], ['tiger', 1, 3], ['sun bear', 4, 3], ['gibbon', 3, 2], ['lemur', 2, 3], ['kinkajou', 5, 3], ['coati', 4, 4], ['piranha', 2, 2],
    ['caiman', 3, 3], ['pygmy marmoset', 4, 3], ['quetzal', 4, 3, B()], ['hoatzin', 5, 4], ['vampire bat', 3, 3], ['bullet ant', 4, 3], ['basilisk lizard', 4, 3], ['leaf-tailed gecko', 5, 4],
    ['Sumatran rhino', 4, 4], ['golden lion tamarin', 5, 3], ['mandrill', 3, 3], ['proboscis monkey', 4, 3],
  ],

  savanna_animals: [
    ['lion', 1, 1], ['elephant', 1, 1], ['giraffe', 1, 1], ['zebra', 1, 1], ['wildebeest', 3, 1], ['cheetah', 1, 1], ['hyena', 2, 1], ['rhinoceros', 2, 1], ['warthog', 2, 1],
    ['buffalo', 2, 2, A()], ['antelope', 2, 2], ['impala', 3, 1], ['gazelle', 2, 1], ['ostrich', 1, 2], ['vulture', 2, 3], ['meerkat', 2, 2], ['hippopotamus', 1, 3], ['jackal', 3, 2],
    ['leopard', 1, 2], ['baboon', 2, 3], ['secretary bird', 3, 3], ['eland', 4, 3], ['topi', 5, 4], ['kudu', 4, 3], ['oryx', 3, 3], ['hartebeest', 4, 3], ['springbok', 3, 3],
    ['dik-dik', 4, 3], ['serval', 3, 3], ['aardvark', 3, 3], ['termite', 2, 4], ['mongoose', 3, 3], ['African wild dog', 3, 2, P()], ['lilac-breasted roller', 5, 4],
    ['marabou stork', 4, 3], ['crowned crane', 4, 3], ['bat-eared fox', 4, 4], ['dung beetle', 3, 4], ['Thomson\'s gazelle', 4, 2, P()], ['honey badger', 3, 4], ['kori bustard', 5, 5],
    ['tsessebe', 5, 5], ['hyrax', 4, 4],
  ],

  mountain_animals: [
    ['mountain goat', 2, 1], ['ibex', 3, 1], ['snow leopard', 2, 1], ['yak', 3, 2], ['llama', 1, 3], ['alpaca', 2, 3], ['chamois', 4, 2], ['marmot', 3, 2], ['bighorn sheep', 3, 1],
    ['mountain lion', 2, 2], ['golden eagle', 2, 3], ['condor', 2, 2], ['vicuña', 4, 2, { al: [['vicuna', 'spelling', 4, 2]] }], ['pika', 4, 2], ['red panda', 2, 4], ['takin', 5, 3],
    ['markhor', 5, 3], ['argali', 5, 4], ['Himalayan tahr', 5, 3, P()], ['bearded vulture', 4, 3], ['lammergeier', 5, 4], ['alpine chough', 5, 3], ['ptarmigan', 4, 3],
    ['mountain gorilla', 3, 2], ['Andean cat', 5, 3, P()], ['ermine', 3, 4], ['Himalayan monal', 5, 4, P()], ['mouflon', 4, 3], ['mountain hare', 3, 3], ['mountain zebra', 4, 3],
    ['Marco Polo sheep', 5, 4, P()], ['kea', 4, 3], ['spectacled bear', 4, 3], ['gelada', 5, 3], ['hoary marmot', 5, 4], ['Dall sheep', 5, 4, P()], ['Alpine ibex', 4, 2, P()],
  ],

  city_animals: [
    ['pigeon', 1, 1], ['rat', 1, 1, A()], ['mouse', 1, 2, A()], ['fox', 1, 2], ['raccoon', 2, 1], ['squirrel', 1, 1], ['seagull', 1, 2], ['cockroach', 2, 1], ['starling', 2, 2],
    ['house sparrow', 3, 2], ['sparrow', 1, 2], ['feral cat', 2, 1], ['stray dog', 2, 1], ['bat', 1, 4, A()], ['crow', 1, 2, B()], ['magpie', 2, 3], ['rock dove', 4, 3],
    ['coyote', 2, 3], ['opossum', 3, 3], ['skunk', 2, 3], ['house mouse', 3, 2], ['brown rat', 4, 2], ['bedbug', 3, 3], ['ant', 1, 3], ['mosquito', 1, 4], ['spider', 1, 4],
    ['silverfish', 3, 3], ['housefly', 3, 3], ['wasp', 1, 4], ['hedgehog', 1, 4], ['urban fox', 3, 2], ['ring-necked parakeet', 4, 3], ['peregrine falcon', 3, 3], ['monk parakeet', 5, 3],
    ['black rat', 4, 3], ['flea', 2, 4], ['termite', 2, 4], ['feral pigeon', 4, 2], ['Canada goose', 2, 4, P()], ['alley cat', 2, 2], ['sewer rat', 3, 2], ['gull', 2, 3], ['wood pigeon', 4, 3],
  ],

  nocturnal_animals: [
    ['owl', 1, 1], ['bat', 1, 1, A()], ['hedgehog', 1, 2], ['aye-aye', 4, 3], ['badger', 2, 2, A()], ['fox', 1, 3], ['raccoon', 2, 2], ['opossum', 3, 2], ['bushbaby', 3, 2],
    ['tarsier', 4, 3], ['slow loris', 4, 3], ['kiwi', 2, 3, B()], ['firefly', 2, 3], ['moth', 1, 3], ['cockroach', 2, 3], ['nightjar', 4, 3], ['tarantula', 2, 4], ['scorpion', 2, 4],
    ['armadillo', 2, 3], ['kinkajou', 5, 4], ['potoo', 5, 5], ['kakapo', 4, 3], ['aardvark', 3, 3], ['pangolin', 3, 3], ['flying fox', 3, 3, { g: 'bat' }], ['vampire bat', 3, 2],
    ['porcupine', 2, 3], ['tawny owl', 3, 2], ['barn owl', 2, 1], ['jerboa', 4, 4], ['fennec fox', 3, 3], ['Tasmanian devil', 2, 4, P()], ['sugar glider', 3, 3], ['ocelot', 3, 4],
    ['hyena', 2, 4], ['genet', 5, 4], ['civet', 4, 4], ['dormouse', 3, 3], ['loris', 4, 3], ['glow-worm', 3, 3], ['nighthawk', 4, 3], ['bilby', 4, 4], ['platypus', 2, 5],
    ['whip-poor-will', 5, 4], ['springhare', 5, 5], ['bandicoot', 4, 4],
  ],

  venomous_animals: [
    ['cobra', 2, 1], ['scorpion', 2, 1], ['stonefish', 4, 2], ['box jellyfish', 3, 2], ['black widow', 2, 1, { g: 'spider' }], ['brown recluse', 3, 2], ['funnel-web spider', 3, 2], ['king cobra', 2, 1],
    ['rattlesnake', 2, 1], ['black mamba', 3, 1], ['taipan', 4, 2], ['viper', 3, 2, A()], ['coral snake', 3, 2], ['Gila monster', 3, 3], ['platypus', 2, 4], ['blue-ringed octopus', 4, 2],
    ['cone snail', 4, 3], ['lionfish', 3, 2], ['stingray', 2, 2], ['sea snake', 3, 2], ['bee', 1, 3], ['wasp', 1, 3], ['hornet', 2, 3], ['fire ant', 3, 3], ['bullet ant', 4, 3],
    ['centipede', 2, 3], ['Portuguese man o\' war', 3, 2, P()], ['sea wasp', 5, 3], ['tarantula', 2, 3], ['Komodo dragon', 2, 4, P()], ['solenodon', 5, 4], ['slow loris', 4, 4],
    ['puff adder', 4, 3], ['boomslang', 4, 3], ['krait', 4, 3], ['copperhead', 3, 2, A()], ['cottonmouth', 4, 2], ['redback spider', 3, 2], ['weever fish', 5, 4],
    ['scorpionfish', 4, 3], ['wandering spider', 5, 3], ['Gaboon viper', 5, 4], ['inland taipan', 5, 3], ['fer-de-lance', 5, 4], ['Irukandji jellyfish', 5, 4], ['yellow jacket', 3, 4],
  ],

  hibernating_animals: [
    ['bear', 1, 1, A()], ['dormouse', 3, 1], ['hedgehog', 1, 1], ['marmot', 3, 2], ['groundhog', 3, 2], ['bat', 1, 2, A()], ['chipmunk', 2, 2], ['ground squirrel', 3, 2],
    ['badger', 2, 4, A()], ['skunk', 2, 4], ['frog', 1, 3, { g: 'amphibian' }], ['toad', 1, 3], ['snake', 1, 3], ['tortoise', 1, 3], ['bumblebee queen', 4, 4], ['ladybird', 2, 3, { al: [['ladybug', 'synonym', 1, 3, ['US']]] }],
    ['peacock butterfly', 4, 4], ['snail', 1, 3], ['lizard', 1, 4], ['newt', 2, 3], ['hamster', 1, 3], ['polar bear', 1, 4], ['common poorwill', 5, 4], ['wood frog', 4, 4],
    ['turtle', 1, 4], ['Arctic ground squirrel', 4, 3], ['black bear', 1, 1], ['brown bear', 1, 1], ['grizzly bear', 1, 1], ['prairie dog', 2, 4], ['jumping mouse', 5, 4],
    ['hazel dormouse', 4, 2], ['garden dormouse', 5, 3], ['edible dormouse', 5, 3], ['tenrec', 5, 4], ['echidna', 3, 4], ['fat-tailed dwarf lemur', 5, 4],
    ['woodchuck', 4, 3], ['alpine marmot', 4, 3], ['grass snake', 3, 4], ['slow worm', 3, 4],
  ],

  migrating_animals: [
    ['swallow', 2, 1, B()], ['wildebeest', 3, 1], ['monarch butterfly', 2, 1], ['salmon', 1, 1, { g: 'fish' }], ['Arctic tern', 3, 1, P()], ['humpback whale', 2, 2], ['grey whale', 3, 2],
    ['caribou', 3, 2], ['reindeer', 1, 3], ['eel', 2, 2], ['goose', 1, 2], ['Canada goose', 2, 2, P()], ['stork', 2, 2], ['crane', 2, 3, B()], ['cuckoo', 2, 3], ['swift', 3, 3, B()],
    ['sea turtle', 2, 2], ['green turtle', 3, 3], ['loggerhead', 4, 3, { g: 'turtle' }], ['albatross', 2, 3], ['bar-tailed godwit', 5, 3], ['zebra', 1, 3], ['locust', 3, 3],
    ['painted lady', 4, 3, { g: 'butterfly' }], ['globe skimmer', 5, 4], ['bluefin tuna', 3, 3], ['nightingale', 2, 4], ['rufous hummingbird', 4, 3], ['osprey', 3, 3],
    ['flamingo', 1, 4], ['whooper swan', 4, 3], ['fieldfare', 4, 3], ['redwing', 4, 3], ['house martin', 3, 3], ['sand martin', 4, 3], ['wheatear', 4, 4], ['sandpiper', 3, 4],
    ['snow goose', 3, 3], ['red knot', 5, 4], ['sockeye salmon', 3, 2], ['European eel', 4, 3, P()], ['sperm whale', 2, 4], ['great white shark', 2, 4], ['whale shark', 3, 4],
    ['leatherback turtle', 3, 3], ['springbok', 3, 3], ['turkey vulture', 4, 4], ['willow warbler', 5, 4], ['glass eel', 5, 4], ['barnacle goose', 4, 3],
  ],
};
