// Generated word data: Body & Health deeper themes (chunk 1): hairstyles, beards, hair colours, spine, blood, teeth, brain, ruminant stomachs, K-beauty.
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
export const FIXES = [{ gloss: ['honeycomb', 'patterns', 'pattern'] }, { gloss: ['mist', 'weather', 'weather'] }];
export const THEMES = {
  hairstyles: { d: 1 }, beard_styles: { d: 3 }, hair_colors: { d: 1 },
  sections_of_the_spine: { d: 3, complete: true }, blood_components: { d: 2, complete: true }, tooth_types: { d: 2, complete: true },
  brain_lobes: { d: 4, complete: true }, ruminant_stomachs: { d: 5, complete: true }, korean_skincare: { d: 4, tm: true },
};

export const DATA = {
  hairstyles: [
    ['ponytail', 1, 1], ['braid', 1, 1], ['bun', 1, 1, { g: 'hair' }], ['pigtails', 1, 1], ['bob', 1, 1, { g: 'haircut' }], ['afro', 1, 1],
    ['buzz cut', 1, 1], ['mohawk', 1, 1, { g: 'haircut' }], ['crew cut', 2, 1], ['perm', 2, 2, { g: 'hair' }], ['mullet', 2, 1, { g: 'haircut' }], ['pixie cut', 2, 2],
    ['dreadlocks', 2, 1, { al: [['dreads', 'short form', 2, 2], ['locs', 'synonym', 3, 3]] }], ['cornrows', 2, 2], ['pompadour', 3, 2], ['undercut', 3, 2, { g: 'haircut' }],
    ['topknot', 3, 2], ['bangs', 2, 3, { reg: ['US', 'CA'], al: [['fringe', 'synonym', 2, 3, ['UK', 'AU'], { g: 'hair' }]] }], ['bowl cut', 2, 2], ['flat top', 2, 2],
    ['beehive', 3, 3, { g: 'hairstyle' }], ['french braid', 2, 2, { al: [['French plait', 'synonym', 3, 3, ['UK']]] }], ['chignon', 4, 3], ['updo', 3, 3],
    ['pageboy', 4, 4], ['quiff', 3, 3], ['rat tail', 3, 3, { g: 'hairstyle' }], ['tonsure', 4, 4], ['marcel wave', 5, 5], ['comb-over', 2, 3, { al: [['combover', 'spelling', 2, 3]] }],
    ['bouffant', 4, 3], ['fishtail braid', 3, 3], ['man bun', 2, 2], ['finger waves', 4, 4],
  ],
  beard_styles: [
    ['goatee', 2, 1], ['full beard', 1, 1], ['stubble', 1, 2], ['mustache', 1, 1, { al: [['moustache', 'spelling', 2, 1, ['UK']]] }], ['sideburns', 2, 2],
    ['handlebar moustache', 2, 2, { al: [['handlebar mustache', 'spelling', 2, 2, ['US']]] }], ['soul patch', 2, 2], ['chin strap', 3, 3], ['Van Dyke', 4, 3, { type: 'proper', g: 'beard' }],
    ['mutton chops', 3, 3], ['five o\'clock shadow', 2, 3, { type: 'phrase' }], ['designer stubble', 3, 3], ['circle beard', 4, 4], ['balbo', 5, 5], ['anchor beard', 4, 4],
    ['Garibaldi', 5, 5, { g: 'beard', type: 'proper' }], ['long beard', 1, 2], ['ducktail', 4, 4, { g: 'beard' }], ['pencil mustache', 3, 3], ['walrus mustache', 3, 3],
    ['toothbrush mustache', 3, 3], ['horseshoe mustache', 3, 3], ['Fu Manchu', 4, 4, { type: 'proper', g: 'mustache', sens: true }], ['whiskers', 2, 3, { g: 'beard' }],
    ['imperial', 5, 5, { g: 'beard' }], ['spade beard', 5, 5], ['neckbeard', 3, 3, { note: 'often derogatory' }],
  ],
  hair_colors: [
    ['blonde', 1, 1, { g: 'hair' }], ['brunette', 2, 1], ['redhead', 1, 1], ['black', 1, 2, { g: 'color' }], ['brown', 1, 2, { g: 'color' }], ['gray', 1, 1, { g: 'color' }],
    ['white', 1, 2, { g: 'color' }], ['ginger', 2, 1, { g: 'hair colour' }], ['auburn', 3, 2], ['strawberry blonde', 3, 2], ['platinum blonde', 2, 2], ['dirty blonde', 2, 2],
    ['sandy', 2, 3], ['chestnut', 3, 3, { g: 'color' }], ['raven', 3, 3, { g: 'color' }], ['salt and pepper', 2, 3, { type: 'phrase' }], ['silver', 2, 3, { g: 'color' }],
    ['golden', 1, 3], ['jet black', 2, 2], ['mousy', 3, 4, { al: [['mousey', 'spelling', 3, 4]] }], ['flaxen', 4, 3], ['titian', 5, 4, { g: 'color' }],
    ['ash blonde', 3, 3], ['copper', 2, 4, { g: 'color' }], ['mahogany', 3, 4, { g: 'color' }], ['towheaded', 4, 4], ['bleached', 2, 3, { g: 'hair' }], ['peroxide blonde', 4, 4],
    ['pink', 1, 3, { g: 'color' }], ['blue', 1, 4, { g: 'color' }], ['graying', 2, 3],
  ],
  sections_of_the_spine: [
    ['cervical', 3, 2, { pos: 'adjective', g: 'spine', al: [['neck vertebrae', 'synonym', 3, 2]] }], ['thoracic', 3, 2, { pos: 'adjective', g: 'spine' }],
    ['lumbar', 3, 2, { pos: 'adjective', g: 'spine' }], ['sacral', 4, 2, { pos: 'adjective', g: 'spine' }],
    ['coccyx', 4, 1, { al: [['tailbone', 'synonym', 2, 2]] }],
  ],
  blood_components: [
    ['plasma', 2, 1, { g: 'blood' }], ['platelets', 2, 1, { al: [['thrombocytes', 'synonym', 5, 3]] }],
    ['red blood cells', 2, 1, { al: [['erythrocytes', 'synonym', 5, 3], ['red cells', 'short form', 2, 2]] }],
    ['white blood cells', 2, 1, { al: [['leukocytes', 'synonym', 5, 3], ['white cells', 'short form', 2, 2]] }],
  ],
  tooth_types: [
    ['incisor', 2, 1], ['canine', 2, 1, { g: 'tooth' }], ['premolar', 3, 1, { al: [['bicuspid', 'synonym', 4, 2]] }], ['molar', 2, 1],
  ],
  brain_lobes: [
    ['frontal lobe', 3, 1, { al: [['frontal', 'short form', 3, 2]] }], ['parietal lobe', 4, 1, { al: [['parietal', 'short form', 4, 2]] }],
    ['temporal lobe', 3, 1, { al: [['temporal', 'short form', 3, 2]] }], ['occipital lobe', 4, 1, { al: [['occipital', 'short form', 4, 2]] }],
  ],
  ruminant_stomachs: [
    ['rumen', 3, 1, { al: [['paunch', 'synonym', 4, 3]] }], ['reticulum', 4, 1, { g: 'stomach', al: [['honeycomb', 'synonym', 3, 4, [], { g: 'stomach' }]] }],
    ['omasum', 5, 1, { al: [['psalterium', 'synonym', 5, 4]] }], ['abomasum', 5, 1, { al: [['true stomach', 'synonym', 3, 4]] }],
  ],
  korean_skincare: [
    ['sheet mask', 2, 1], ['essence', 2, 2, { g: 'skincare' }], ['toner', 2, 2, { g: 'skincare' }], ['cleansing oil', 3, 2], ['cleansing balm', 3, 2], ['snail mucin', 3, 1, { al: [['snail essence', 'synonym', 3, 1]] }],
    ['BB cream', 2, 2, { type: 'proper' }], ['CC cream', 3, 3, { type: 'proper' }], ['cushion compact', 3, 2], ['sleeping mask', 3, 2], ['ampoule', 4, 3],
    ['double cleanse', 3, 2], ['glass skin', 3, 1], ['sunscreen', 1, 3], ['moisturizer', 1, 3], ['serum', 2, 3, { g: 'skincare' }], ['eye cream', 2, 3], ['peeling gel', 4, 2],
    ['hydrogel patch', 4, 2], ['pimple patch', 3, 3], ['mugwort', 4, 3], ['centella', 4, 2, { al: [['cica', 'short form', 4, 2]] }], ['green tea', 1, 4],
    ['rice water', 3, 3], ['ginseng', 3, 3], ['propolis', 4, 3], ['hyaluronic acid', 3, 3], ['mist', 3, 4, { g: 'skincare' }], ['K-beauty', 2, 1, { al: [['Korean beauty', 'synonym', 2, 1]] }],
  ],
};
