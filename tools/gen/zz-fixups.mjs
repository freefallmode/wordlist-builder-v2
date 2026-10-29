// Applied after all the root batches: gives meaning labels to older entries that now share their text with a newer one, merges the
// same meaning written twice by different batches, adds words the batches had to leave out, and raises the word limit to 3.
export const SETTINGS = { maxWords: 4 };

export const FIXES = [
  // older, unlabelled entries whose text another batch also uses for a different meaning
  { gloss: ['violet', 'colors_of_the_rainbow', 'color'] }, { gloss: ['bishop', 'chess_pieces', 'chess'] }, { gloss: ['rook', 'chess_pieces', 'chess'] },
  { gloss: ['hearing', 'the_five_senses', 'sense'] }, { gloss: ['lime', 'fruits', 'fruit'] }, { gloss: ['peach', 'fruits', 'fruit'] }, { gloss: ['plum', 'fruits', 'fruit'] },
  { gloss: ['olive', 'fruits', 'fruit'] }, { gloss: ['salmon', 'meat_and_seafood', 'fish'] }, { gloss: ['cream', 'dairy_and_eggs', 'dairy'] },
  { gloss: ['amaranth', 'pasta_rice_and_grains', 'grain'] }, { gloss: ['saffron', 'herbs_spices_and_sauces', 'spice'] }, { gloss: ['salsa', 'herbs_spices_and_sauces', 'sauce'] },
  { gloss: ['gold', 'metals', 'metal'] }, { gloss: ['silver', 'metals', 'metal'] }, { gloss: ['copper', 'metals', 'metal'] },
  { gloss: ['periwinkle', 'shades_of_blue', 'color'] }, { gloss: ['chemist', 'shops', 'shop'] },
  // newer entries that clash with each other
  { gloss: ['coral', 'sea_life', 'marine animal'] }, { gloss: ['amber', 'prehistoric_life', 'fossil resin'] }, { gloss: ['mahogany', 'trees', 'wood'] },
  { gloss: ['primrose', 'flowers', 'flower'] }, { gloss: ['narcissus', 'flowers', 'flower'] }, { gloss: ['cinnabar', 'rocks_and_minerals', 'mineral'] },
  { gloss: ['serpent', 'reptiles_and_amphibians', 'snake'] }, { gloss: ['plateau', 'landscapes', 'landform'] }, { gloss: ['geyser', 'landscapes', 'landform'] },
  { gloss: ['cloud', 'weather', 'weather'] }, { gloss: ['twister', 'weather', 'tornado'] }, { gloss: ['hut', 'buildings', 'building'] },
  { gloss: ['leg', 'body_parts', 'body part'] }, { gloss: ['flank', 'body_parts', 'body part'] }, { gloss: ['skeleton', 'inside_the_body', 'body'] },
  { gloss: ['pandemic', 'medicine', 'disease'] }, { gloss: ['hospice', 'medicine', 'care'] }, { gloss: ['soap', 'personal_care', 'wash'] },
  { gloss: ['relief', 'emotions', 'feeling'] }, { gloss: ['trial', 'law_and_order', 'court'] }, { gloss: ['chalk', 'school', 'for writing'] },
  { gloss: ['canteen', 'school', 'dining hall'] }, { gloss: ['apron', 'clothes', 'clothing'] }, { gloss: ['atrium', 'architecture', 'building'] },
  { gloss: ['Sphinx', 'ancient_civilizations', 'myth'] }, { gloss: ['basilisk', 'fantasy', 'monster'] }, { gloss: ['satellite', 'space', 'space'] },
  { gloss: ['cosmos', 'space', 'universe'] }, { gloss: ['measure', 'measurement', 'to measure'] }, { gloss: ['girth', 'measurement', 'size'] },
  { gloss: ['reboot', 'computers', 'computing'] }, { gloss: ['router', 'computers', 'network'] }, { gloss: ['Roomba', 'gadgets', 'gadget'] },
  { gloss: ['tunnel', 'engineering', 'structure'] }, { gloss: ['circuit', 'engineering', 'electric'] }, { gloss: ['stylus', 'alphabets_and_writing', 'ancient'] },
  // the same meaning written in two batches: one entry, linked to both themes
  { merge: ['beaver', ['mammals', 'national_symbols'], ''] }, { merge: ['pilot', ['air_travel', 'jobs'], 'aircraft'] },
  { merge: ['compass', ['maps_and_globes', 'campsite'], ''] }, { merge: ['nurse', ['medicine', 'jobs'], ''] },
  { merge: ['broadcast', ['media_and_communication', 'film_and_tv'], ''] }, { merge: ['streaming', ['media_and_communication', 'film_and_tv'], ''] },
  { merge: ['painting', ['hobbies_and_crafts', 'art'], ''] }, { merge: ['drawing', ['hobbies_and_crafts', 'art'], ''] }, { merge: ['mosaic', ['hobbies_and_crafts', 'art'], ''] },
  { merge: ['plague', ['illnesses', 'medieval_times'], ''] }, { merge: ['captain', ['boats_and_ships', 'pirates'], ''] }, { merge: ['retreat', ['military', 'wars_and_battles'], ''] },
  { merge: ['legend', ['literature', 'mythology'], 'story'] }, { merge: ['hero', ['literature', 'mythology'], ''] }, { merge: ['engine', ['cars', 'engineering'], 'machine'] },
  // too long for the limit
  { del: ['statistical significance', 'scientific_method'] },
];

// words a batch had to leave out because an unlabelled entry of the same text existed
export const DATA = {
  birds: [['rook', 3, 3, { g: 'bird' }]],
  sea_life: [['periwinkle', 4, 4, { g: 'sea snail' }]],
  dance: [['salsa', 2, 2, { g: 'dance' }]],
};
