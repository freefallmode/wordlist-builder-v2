// Top-up batch 3. Format: tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const P = (o = {}) => ({ type: 'proper', ...o });
const T = (o = {}) => ({ type: 'proper', tm: true, ...o });

export const FIXES = [
  { gloss: ['Arnold Palmer', 'famous_golfers', 'golfer'] },
];

export const DATA = {
  brazilian_food: [
    ['tacacá', 4, 4], ['baião de dois', 4, 4], ['pirão', 5, 4], ['caruru', 5, 4], ['bobó de camarão', 5, 4],
    ['feijão tropeiro', 5, 4], ['maniçoba', 5, 5], ['cocada', 4, 3], ['canjica', 4, 3],
  ],
  north_american_food: [
    ['scrapple', 4, 4], ['johnnycake', 4, 4], ['frybread', 4, 4], ['tourtière', 4, 4], ['butter tart', 3, 3], ['bannock', 4, 4],
    ['cioppino', 4, 4], ['whoopie pie', 3, 3], ['funnel cake', 2, 3],
  ],
  mexican_food: [
    ['tlacoyo', 5, 5], ['chapulines', 5, 4], ['huitlacoche', 5, 5], ['cajeta', 4, 4], ['pambazo', 5, 5], ['esquites', 5, 4],
    ['cemita', 5, 5], ['capirotada', 5, 4], ['tepache', 4, 4], ['atole', 4, 4],
  ],
  southern_food: [
    ['pot likker', 5, 4], ['spoonbread', 4, 4], ['Frogmore stew', 5, 5, P()], ['tomato pie', 4, 4], ['Lane cake', 5, 5, P()],
    ['chess pie', 4, 4], ['burgoo', 4, 4], ['souse', 4, 5],
  ],
  coffee_words: [
    ['cascara', 5, 4], ['peaberry', 5, 5], ['second crack', 5, 4], ['degassing', 5, 5], ['honey process', 5, 5], ['natural process', 5, 5],
    ['tamping', 4, 4], ['cezve', 4, 4], ['bloom', 4, 4, { g: 'coffee' }], ['lungo', 4, 3], ['ristretto', 4, 3],
  ],
  red_wines: [
    ['Xinomavro', 5, 5], ['Nero d\'Avola', 5, 4, P()], ['Aglianico', 5, 4], ['Touriga Nacional', 5, 5, P()], ['Blaufränkisch', 5, 5], ['Zweigelt', 5, 5],
    ['Saperavi', 5, 5], ['Corvina', 5, 5], ['Mencía', 5, 5], ['Negroamaro', 5, 5], ['Cinsault', 4, 4], ['Carignan', 4, 4],
    ['Sagrantino', 5, 5], ['Agiorgitiko', 5, 5], ['Dornfelder', 5, 5],
  ],
  white_wines: [
    ['Furmint', 5, 4], ['Godello', 5, 5], ['Arneis', 5, 5], ['Savagnin', 5, 5], ['Roussanne', 5, 4], ['Garganega', 5, 5],
    ['Vernaccia', 5, 5], ['Falanghina', 5, 5], ['Silvaner', 5, 4], ['Malvasia', 4, 4],
  ],
  wine_words: [
    ['malolactic', 5, 5], ['racking', 5, 5], ['fining', 5, 5], ['veraison', 5, 5], ['pomace', 5, 5], ['maceration', 4, 4],
    ['ullage', 5, 5], ['phylloxera', 5, 4], ['chaptalization', 5, 5], ['solera', 5, 4], ['noble rot', 4, 3], ['botrytis', 5, 4],
    ['minerality', 4, 4], ['Brix', 5, 5, P()], ['tirage', 5, 5], ['riddling', 5, 5], ['punt', 4, 4, { g: 'wine' }],
  ],
  liqueurs: [
    ['Nocino', 5, 5], ['Mirto', 5, 5], ['Becherovka', 5, 4], ['Unicum', 5, 5], ['Kümmel', 5, 4], ['Averna', 5, 4],
    ['Pacharán', 5, 4], ['Licor 43', 5, 4, T()], ['Tuaca', 5, 4, T()], ['Fernet-Branca', 5, 4, T()],
  ],
  national_spirits: [
    ['zivania', 5, 5], ['lambanog', 5, 5], ['awamori', 5, 4], ['arrack', 4, 4], ['sotol', 5, 5], ['orujo', 5, 5],
    ['lao-lao', 5, 5], ['bacanora', 5, 5],
  ],
  lunchbox: [
    ['Dunkaroos', 3, 4, T()], ['Gushers', 3, 4, T()], ['Uncrustables', 4, 4, T()], ['Go-Gurt', 4, 4, T()], ['onigiri', 3, 3],
    ['Fruit by the Foot', 4, 4, T()],
  ],
  foods_named_after_people: [
    ['Victoria sponge', 2, 2], ['Tootsie Roll', 2, 2], ['Mars bar', 2, 2], ['Hershey bar', 2, 2], ['Jack Daniel\'s', 1, 2], ['Johnnie Walker', 1, 2],
    ['Arnold Palmer', 3, 2, { g: 'drink', type: 'proper' }],
  ],
  monkeys: [
    ['talapoin', 5, 5], ['muriqui', 5, 5], ['kipunji', 5, 5], ['douc langur', 5, 4], ['bonnet macaque', 4, 4], ['De Brazza\'s monkey', 5, 4, P()],
    ['cotton-top tamarin', 4, 3], ['pygmy marmoset', 3, 3], ['lion-tailed macaque', 4, 4], ['Goeldi\'s monkey', 5, 5, P()],
    ['hanuman langur', 4, 4], ['pig-tailed macaque', 4, 4],
  ],
  whales_and_dolphins: [
    ['tucuxi', 5, 5], ['franciscana', 5, 5], ['Dall\'s porpoise', 5, 4, P()], ['melon-headed whale', 5, 4], ['Commerson\'s dolphin', 5, 4, P()],
    ['finless porpoise', 5, 4], ['Fraser\'s dolphin', 5, 5, P()], ['rough-toothed dolphin', 5, 4], ['Cuvier\'s beaked whale', 5, 5, P()],
    ['boto', 4, 4, { g: 'dolphin' }],
  ],
  hoofed_mammals: [
    ['bongo', 3, 4, { g: 'antelope' }], ['sitatunga', 5, 5], ['dik-dik', 4, 4], ['gerenuk', 4, 4], ['saola', 5, 5], ['duiker', 4, 4],
    ['bontebok', 5, 5], ['hartebeest', 4, 4], ['nyala', 4, 4], ['markhor', 4, 4], ['argali', 5, 5], ['tahr', 4, 4], ['babirusa', 4, 4],
    ['muntjac', 4, 4], ['banteng', 5, 5], ['tamaraw', 5, 5], ['pudu', 4, 4], ['gemsbok', 4, 4], ['Przewalski\'s horse', 4, 4],
  ],
  birds_of_prey: [
    ['bateleur', 5, 5], ['saker falcon', 4, 4], ['Harris\'s hawk', 4, 3, P()], ['Cooper\'s hawk', 4, 3, P()], ['honey buzzard', 4, 4],
    ['red kite', 3, 3], ['hen harrier', 3, 3], ['Bonelli\'s eagle', 5, 4, P()], ['Egyptian vulture', 4, 3, P()], ['martial eagle', 4, 3],
    ['Steller\'s sea eagle', 5, 4, P()], ['Philippine eagle', 4, 3], ['crowned eagle', 4, 3], ['lappet-faced vulture', 5, 4], ['snail kite', 5, 4],
  ],
  owls: [
    ['boobook', 5, 5], ['morepork', 5, 4], ['Tengmalm\'s owl', 5, 5, P()], ['flammulated owl', 5, 5], ['powerful owl', 4, 4],
    ['sooty owl', 5, 4], ['marsh owl', 5, 4], ['grass owl', 5, 4], ['Pel\'s fishing owl', 5, 5, P()], ['ferruginous pygmy owl', 5, 5],
  ],
  songbirds: [
    ['twite', 5, 5], ['ortolan', 5, 5], ['firecrest', 5, 4], ['chiffchaff', 4, 4], ['whitethroat', 4, 4], ['blackcap', 4, 3],
    ['dipper', 3, 4], ['waxwing', 4, 4], ['bobolink', 4, 4], ['veery', 5, 5], ['bushtit', 5, 4], ['phainopepla', 5, 5], ['wallcreeper', 5, 5],
  ],
  waterbirds: [
    ['smew', 5, 4], ['garganey', 5, 4], ['canvasback', 4, 3], ['bufflehead', 4, 4], ['scoter', 4, 4], ['shelduck', 4, 3],
    ['harlequin duck', 4, 3], ['anhinga', 4, 4], ['ruddy duck', 4, 3], ['long-tailed duck', 4, 3],
  ],
  wading_birds: [
    ['dowitcher', 5, 5], ['stint', 5, 4], ['tattler', 5, 5], ['willet', 5, 5], ['surfbird', 5, 5], ['wrybill', 5, 5],
    ['stone-curlew', 5, 4], ['openbill', 5, 5], ['adjutant stork', 5, 4], ['pratincole', 5, 5], ['boat-billed heron', 5, 4],
    ['purple sandpiper', 5, 4], ['wood stork', 4, 3], ['saddle-billed stork', 5, 4],
  ],
  freshwater_fish: [
    ['loach', 4, 4], ['burbot', 5, 5], ['vendace', 5, 5], ['bowfin', 4, 4], ['paddlefish', 4, 4], ['mahseer', 5, 5],
    ['ruffe', 5, 5], ['stickleback', 3, 4], ['walleye', 3, 4], ['arapaima', 4, 4], ['alligator gar', 4, 4],
  ],
  bees_and_wasps: [
    ['spider wasp', 4, 4], ['pollen wasp', 5, 5], ['plasterer bee', 5, 5], ['cellophane bee', 5, 5], ['mason wasp', 5, 4],
    ['braconid wasp', 5, 5], ['ruby-tailed wasp', 5, 5], ['bald-faced hornet', 4, 3], ['red mason bee', 4, 4], ['buff-tailed bumblebee', 5, 4],
    ['tree bumblebee', 5, 4], ['cuckoo bumblebee', 5, 5], ['blue orchard bee', 5, 5], ['mud wasp', 4, 4],
  ],
  ants_and_termites: [
    ['trap-jaw ant', 4, 4], ['Matabele ant', 5, 4, P()], ['meat ant', 5, 4], ['dracula ant', 5, 5], ['garden ant', 4, 3], ['thief ant', 5, 4],
    ['ghost ant', 5, 4], ['yellow meadow ant', 5, 4], ['dampwood termite', 5, 4], ['Formosan termite', 5, 4, P()], ['compass termite', 5, 4],
    ['alate', 5, 5],
  ],
  worms: [
    ['palolo worm', 5, 5], ['bobbit worm', 5, 4], ['peanut worm', 5, 5], ['arrow worm', 5, 5], ['acorn worm', 5, 5], ['Pompeii worm', 5, 5, P()],
    ['spoon worm', 5, 5], ['Guinea worm', 4, 4, P()], ['lungworm', 4, 4], ['eelworm', 4, 4], ['feather duster worm', 5, 4], ['giant tube worm', 5, 4],
  ],
  pets: [
    ['tarantula', 3, 3], ['hedgehog', 2, 3], ['hissing cockroach', 4, 4], ['praying mantis', 2, 4, { g: 'insect' }], ['blue-tongued skink', 4, 4],
    ['crested gecko', 4, 4], ['kingsnake', 4, 4], ['tree frog', 3, 3], ['chameleon', 2, 3], ['fancy rat', 4, 4], ['African grey', 3, 3],
    ['macaw', 2, 2], ['cockatoo', 2, 2], ['guppy', 2, 2], ['snail', 2, 4], ['fish', 1, 1, { g: 'animal' }], ['bird', 1, 1], ['snake', 2, 3, { g: 'animal' }],
  ],
};
