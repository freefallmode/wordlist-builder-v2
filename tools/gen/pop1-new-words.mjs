// Words for the new pop-1 themes (pop1-new.mjs). Row: [text, rec, inRec]
const G = { towel: 'bath cloth', slippers: 'footwear', sponge: 'cleaning', mud: 'dirt', sea: 'water body', shower: 'rain', river: 'water', bath: 'tub', pea: 'vegetable', mouse: 'animal', button: 'sewing', pin: 'fastening', seed: 'plant', flea: 'insect', spoon: 'cutlery', key: 'lock', coin: 'money', nail: 'fastener', bell: 'chime', chain: 'links', pan: 'cookware', fork: 'cutlery', wire: 'electronics', screw: 'fastener', bucket: 'pail', straw: 'drinking tube', comb: 'hair tool', ruler: 'measuring tool' };
const r = (...a) => a.map(([t, x = 1, y = 1]) => G[t] ? [t, x, y, { g: G[t] }] : [t, x, y]);
export const DATA = {
  sandwich_fillings: r(['ham'], ['cheese'], ['tuna'], ['egg'], ['chicken'], ['tomato'], ['lettuce'], ['bacon'], ['cucumber', 1, 2], ['peanut butter'], ['jam', 1, 2], ['turkey', 1, 2]),
  salad_ingredients: r(['lettuce'], ['tomato'], ['cucumber'], ['onion'], ['carrot'], ['pepper', 1, 2], ['radish', 2, 2], ['olive', 1, 2], ['crouton', 2, 3], ['spinach', 1, 2], ['celery', 1, 3], ['dressing', 1, 2]),
  jam_flavours: r(['strawberry'], ['raspberry'], ['apricot', 1, 2], ['blackcurrant', 2, 2], ['marmalade', 1, 2], ['plum', 1, 2], ['cherry', 1, 2], ['blueberry', 1, 2], ['peach', 1, 3], ['fig', 2, 3]),
  ways_to_cook_eggs: r(['boiled'], ['fried'], ['scrambled'], ['poached', 1, 2], ['omelette', 1, 2], ['hard-boiled', 1, 2], ['soft-boiled', 1, 3], ['sunny side up', 2, 2], ['devilled', 2, 3], ['coddled', 3, 4]),
  pet_snacks_and_feed: r(['bone'], ['kibble', 2, 1], ['hay'], ['birdseed', 1, 2], ['catnip', 2, 2], ['fish flakes', 2, 2], ['rawhide', 2, 3], ['dog biscuit', 1, 2], ['carrot', 1, 3], ['chew stick', 2, 3]),
  things_on_wheels: r(['car'], ['bike'], ['bus'], ['skateboard'], ['trolley'], ['pram'], ['scooter'], ['wagon', 1, 2], ['roller skates'], ['suitcase', 1, 3], ['lorry', 1, 2], ['tricycle', 1, 2]),
  things_you_brush: r(['teeth'], ['hair'], ['shoes', 1, 2], ['dog', 1, 3], ['horse', 1, 3], ['carpet', 1, 3], ['coat', 1, 3], ['floor', 1, 3], ['crumbs', 1, 3]),
  things_you_open: r(['door'], ['window'], ['box'], ['book'], ['letter'], ['present'], ['jar'], ['bottle'], ['umbrella', 1, 2], ['curtains', 1, 3], ['eyes', 1, 2], ['can', 1, 2]),
  things_you_pour: r(['water'], ['milk'], ['tea'], ['juice'], ['cereal'], ['sauce', 1, 2], ['coffee'], ['sugar', 1, 2], ['gravy', 1, 2], ['rain', 1, 3], ['paint', 1, 3]),
  fluffy_things: r(['cloud'], ['kitten'], ['bunny'], ['chick'], ['sheep'], ['teddy bear'], ['duckling', 1, 2], ['cotton wool'], ['pom-pom', 2, 3], ['candyfloss', 1, 3], ['towel', 1, 3], ['slippers', 1, 3]),
  wet_things: r(['rain'], ['puddle'], ['sponge', 1, 2], ['mud', 1, 2], ['sea'], ['shower'], ['river'], ['dew', 2, 3], ['tears', 1, 2], ['swimming pool', 1, 2], ['bath', 1, 2]),
  things_made_of_metal: r(['spoon'], ['key'], ['coin'], ['nail'], ['bell'], ['chain'], ['pan'], ['can', 1, 2], ['fork'], ['wire', 1, 2], ['screw', 1, 3], ['padlock', 1, 3]),
  things_made_of_plastic: r(['toy'], ['bucket'], ['straw'], ['comb'], ['lego'], ['bottle'], ['tupperware', 1, 2], ['carrier bag', 1, 2], ['credit card', 1, 3], ['toothbrush', 1, 3], ['ruler', 1, 3]),
  morning_routine: r(['wake up'], ['brush teeth'], ['get dressed'], ['eat breakfast'], ['make the bed'], ['have a shower'], ['wash your face'], ['comb hair'], ['pack a bag', 1, 3], ['stretch', 1, 3]),
};
export const THEMES = {};
