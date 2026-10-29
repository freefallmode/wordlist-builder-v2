// Generated word data: Science & Tech depth-3 themes (chemistry, physics, biology), chunk 1.
// Format is described in tools/apply-words.mjs. Compact helper W: 'text|rec|in[|gloss[|type]]' rows separated by ';'.
const W = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, g, ty] = x.split('|'); const o = {}; if (g) o.g = g; if (ty) o.type = ty;
  return [t, +r, +i, o];
});
const tmOrg = { tm: true, type: 'org' };

export const THEMES = {
  chemical_elements: { d: 2, complete: true, note: 'all 118 named elements' },
  lab_equipment: { d: 3 }, chemistry_words: { d: 3 }, states_of_matter: { d: 1 }, gases: { d: 2 }, acids_and_bases: { d: 3 },
  chemical_compounds: { d: 3 }, chemical_reactions: { d: 3 }, plastics: { d: 3 }, household_chemicals: { d: 2 },
  classical_elements: { d: 1, complete: true, note: 'the Western five: earth, water, fire, air, aether' },
  noble_gases: { d: 3, complete: true }, halogens: { d: 4, complete: true }, alkali_metals: { d: 4, complete: true }, alkaline_earth_metals: { d: 5, complete: true },
  physics_words: { d: 3 }, forces: { d: 3 }, energy_types: { d: 2 }, electricity_words: { d: 2 }, light_words: { d: 2 }, magnet_words: { d: 1 },
  acoustics_words: { d: 4 }, particle_physics: { d: 4 }, nuclear_words: { d: 3 }, heat_science: { d: 3 },
  biology_words: { d: 2 }, cell_parts: { d: 3 }, genetics_words: { d: 4 }, plant_biology: { d: 3 }, microbes: { d: 3 },
};

export const DATA = {
  chemical_elements: [
    ...W(`hydrogen|1|1;helium|1|1;lithium|2|2;beryllium|3|2;boron|3|2;carbon|1|1;nitrogen|1|1;oxygen|1|1;fluorine|2|2;neon|1|1;sodium|1|2;magnesium|2|2;silicon|2|2;phosphorus|2|2;chlorine|1|2;argon|2|2;potassium|2|2;calcium|2|2;
scandium|4|3;titanium|2|2;vanadium|3|3;chromium|2|2;manganese|3|3;iron|1|2;cobalt|3|3;nickel|2|2;copper|1|2|metal;zinc|2|2;gallium|3|3;germanium|3|3;arsenic|2|3;selenium|3|3;bromine|2|2;krypton|2|2;
rubidium|4|3;strontium|3|3;yttrium|4|4;zirconium|3|3;niobium|4|4;molybdenum|4|4;technetium|4|4;ruthenium|4|4;rhodium|3|3;palladium|3|3;silver|1|2|metal;cadmium|3|3;indium|4|4;tin|1|2;antimony|3|3;tellurium|4|4;iodine|2|2;xenon|2|2;
barium|3|3;lanthanum|4|4;cerium|4|4;praseodymium|5|4;neodymium|3|4;promethium|5|4;samarium|4|4;europium|4|4;gadolinium|4|4;terbium|4|4;dysprosium|4|4;holmium|5|4;erbium|4|4;thulium|5|4;ytterbium|4|4;lutetium|5|4;
hafnium|4|4;tantalum|4|4;tungsten|3|3;rhenium|5|4;osmium|4|4;iridium|3|3;platinum|2|2;gold|1|1|metal;thallium|4|4;lead|1|2|metal;bismuth|3|3;polonium|3|3;astatine|4|4;radon|3|3;
francium|4|4;radium|3|3;actinium|4|4;thorium|3|3;protactinium|5|5;uranium|2|2;neptunium|4|4;plutonium|3|3;americium|4|4;curium|4|4;berkelium|4|4;californium|4|4;einsteinium|4|4;fermium|5|4;mendelevium|5|4;nobelium|5|4;lawrencium|5|4;
rutherfordium|5|4;dubnium|5|4;seaborgium|5|4;bohrium|5|4;hassium|5|4;meitnerium|5|4;darmstadtium|5|4;roentgenium|5|4;copernicium|5|4;nihonium|5|4;flerovium|5|4;moscovium|5|4;livermorium|5|4;tennessine|5|4;oganesson|5|4`),
    ['aluminum', 2, 2, { al: [['aluminium', 'spelling', 2, 2, ['UK']]] }],
    ['sulfur', 2, 2, { al: [['sulphur', 'spelling', 2, 2, ['UK']]] }],
    ['cesium', 3, 3, { al: [['caesium', 'spelling', 3, 3, ['UK']]] }],
    ['mercury', 1, 2, { g: 'element', al: [['quicksilver', 'synonym', 3, 4]] }],
  ],

  lab_equipment: [
    ...W(`test tube|1|1;microscope|1|1;flask|1|2;pipette|2|2;burette|4|3;tongs|2|3;tripod|2|3|lab stand;centrifuge|3|2;fume hood|4|3;graduated cylinder|3|3;crucible|3|3;mortar and pestle|2|3;spatula|2|3;hot plate|2|3;thermometer|1|3;funnel|1|3;
filter paper|3|3;stirring rod|3|3;wash bottle|4|4;desiccator|5|4;retort stand|4|4;test tube rack|2|2;evaporating dish|4|4;watch glass|4|4;spectrometer|4|4;autoclave|4|4;goggles|1|3;lab coat|1|2;microscope slide|2|3;
separatory funnel|5|5;Schlenk line|5|5;Dewar flask|5|5;Buchner funnel|5|5;clamp stand|3|3;volumetric flask|4|4`),
    ['beaker', 1, 1],
    ['Bunsen burner', 2, 1],
    ['Petri dish', 2, 1, { al: [['culture dish', 'synonym', 4, 4]] }],
    ['Erlenmeyer flask', 3, 3, { al: [['conical flask', 'synonym', 3, 3, ['UK']]] }],
  ],

  chemistry_words: [
    ...W(`molecule|1|1;compound|2|2|chemistry;element|1|2|chemical;mixture|2|2;solution|2|2|chemistry;solvent|2|2;solute|3|3;reaction|1|2|chemical;catalyst|3|2;bond|2|2|chemical;ion|2|2;isotope|3|3;periodic table|1|1;valence|4|3;pH|2|2;
molarity|4|4;mole|3|3|chemistry;titration|3|3;precipitate|3|3;distillation|3|3;filtration|3|3;saturation|4|3;concentration|3|3|chemistry;oxidation|3|3;reduction|3|4|chemistry;emulsion|4|3;colloid|5|4;suspension|4|4|chemistry;
polymer|3|3;monomer|4|4;organic chemistry|3|3;alloy|2|3;electrolyte|4|3;reagent|4|3;covalent bond|4|3;ionic bond|4|3;Avogadro's number|5|4||proper;stoichiometry|5|4;enthalpy|5|4;chirality|5|5;buffer|4|4|chemistry;anion|5|4;cation|5|4;atomic number|3|3;noble gas|2|3;atom|1|2`),
  ],

  states_of_matter: [
    ...W(`solid|1|1;liquid|1|1;gas|1|1;plasma|3|2|physics;melting|1|2;freezing|1|2;boiling|1|2;evaporation|2|2;condensation|2|2;sublimation|4|3;deposition|5|4|phase change;solidification|4|4;liquefaction|4|4;
melting point|2|3;boiling point|2|3;freezing point|3|3;steam|1|3;ice|1|1;phase change|3|3;fluid|2|3;crystallization|4|4;thawing|1|3;dry ice|1|3;triple point|5|5;supercritical fluid|5|5`),
    ['vaporization', 3, 3, { al: [['vaporisation', 'spelling', 3, 3, ['UK']]] }],
    ['vapor', 2, 2, { al: [['vapour', 'spelling', 2, 2, ['UK']]] }],
  ],

  gases: [
    ...W(`oxygen|1|1;hydrogen|1|1;nitrogen|1|1;carbon dioxide|1|1;helium|1|1;methane|2|1;ozone|2|1;neon|1|2;argon|2|2;chlorine|2|2;ammonia|2|2;propane|1|2;butane|2|2;natural gas|1|2;carbon monoxide|2|2;krypton|2|3;xenon|2|3;radon|3|3;
acetylene|4|3;ethylene|4|4;hydrogen sulfide|3|3;nitrogen dioxide|4|4;fluorine|3|3;hydrogen chloride|4|4;ethane|4|4;marsh gas|4|4;sulfur dioxide|3|3;exhaust fumes|1|3;tear gas|2|3;mustard gas|3|3`),
    ['nitrous oxide', 3, 3, { al: [['laughing gas', 'synonym', 2, 3]] }],
  ],

  acids_and_bases: [
    ...W(`acid|1|1;base|2|1|chemistry;alkali|3|2;pH|2|2;litmus paper|3|3;indicator|3|3|chemistry;vinegar|1|2;lemon juice|1|3;hydrochloric acid|2|1;nitric acid|3|2;acetic acid|3|2;citric acid|2|2;carbonic acid|4|3;lactic acid|3|3;
formic acid|4|4;phosphoric acid|4|4;battery acid|2|3;sodium hydroxide|3|2;caustic soda|3|3;potassium hydroxide|4|3;ammonia|2|3;lye|3|3;baking soda|1|3;antacid|3|3;neutral|2|3|pH;strong acid|3|3;weak acid|4|4;hydroxide|4|3;
aqua regia|5|4;universal indicator|4|4;phenolphthalein|5|4;acid rain|2|3;ascorbic acid|4|4;hydrofluoric acid|4|4;litmus|3|3`),
    ['sulfuric acid', 2, 1, { al: [['sulphuric acid', 'spelling', 2, 1, ['UK']]] }],
    ['neutralization', 3, 3, { al: [['neutralisation', 'spelling', 3, 3, ['UK']]] }],
  ],

  chemical_compounds: [
    ...W(`water|1|1;salt|1|3;carbon dioxide|1|1;ammonia|2|1;methane|2|1;glucose|2|1;ozone|2|3;hydrogen peroxide|2|1;ethanol|2|2;sucrose|3|2;carbon monoxide|2|1;sulfuric acid|2|2;sodium bicarbonate|3|2;calcium carbonate|3|2;
caffeine|1|3;benzene|3|2;propane|2|2;acetone|3|2;formaldehyde|4|3;chloroform|3|3;nitroglycerin|3|3;urea|3|2;cellulose|4|3;starch|2|4;fructose|3|2;lactose|3|2;silica|4|3;silicon dioxide|4|3;hydrogen sulfide|3|2;nitrous oxide|3|2;
ammonium nitrate|4|3;toluene|4|3;carbon tetrachloride|5|4;ethylene glycol|4|3;sodium hydroxide|3|2;aspirin|1|4;methanol|3|3;cholesterol|2|4`),
    ['sodium chloride', 2, 1, { al: [['table salt', 'synonym', 1, 2]] }],
    ['potassium nitrate', 4, 3, { al: [['saltpeter', 'synonym', 4, 4, ['US']], ['saltpetre', 'spelling', 4, 4, ['UK']]] }],
    ['glycerol', 4, 3, { al: [['glycerin', 'synonym', 3, 3]] }],
  ],

  chemical_reactions: [
    ...W(`combustion|3|2;oxidation|3|2;rusting|1|2;fermentation|3|2;electrolysis|3|2;corrosion|2|3;burning|1|2;photosynthesis|1|3;precipitation|2|4|chemical;hydrolysis|4|3;displacement|4|3|chemistry;synthesis|3|3|chemistry;saponification|5|4;
esterification|5|5;catalysis|4|3;redox|4|3;thermite reaction|4|3;explosion|1|3;tarnishing|2|3;Maillard reaction|4|4;galvanization|4|4;cracking|4|4|chemistry;acid-base reaction|4|3;decomposition|3|3;reduction|3|3|chemistry;polymerization|4|3`),
    ['neutralization', 3, 2],
    ['caramelization', 3, 4, { al: [['caramelisation', 'spelling', 3, 4, ['UK']]] }],
  ],

  plastics: [
    ...W(`nylon|1|2;polyester|1|2;PVC|2|2||acronym;acrylic|2|2|plastic;polystyrene|2|2;polyethylene|2|2;vinyl|1|2;polypropylene|3|2;celluloid|3|3;polycarbonate|3|2;PET|3|3|plastic|acronym;HDPE|4|4||acronym;LDPE|4|4||acronym;polyurethane|3|3;silicone|2|3;melamine|3|3;
cellophane|2|3;epoxy|3|3;resin|2|3;polyvinyl chloride|4|3;PTFE|4|4||acronym;acetate|4|4|plastic;thermoplastic|3|3;PLA|4|4|plastic|acronym;bioplastic|3|3`),
    ['Teflon', 2, 3, tmOrg], ['Bakelite', 3, 3, tmOrg], ['Styrofoam', 2, 3, tmOrg], ['Plexiglas', 3, 3, tmOrg], ['Lucite', 4, 4, tmOrg], ['Mylar', 3, 3, tmOrg],
    ['Formica', 3, 4, tmOrg], ['Lexan', 4, 4, tmOrg], ['Delrin', 5, 5, tmOrg], ['Perspex', 3, 3, { ...tmOrg, reg: ['UK'] }],
  ],

  household_chemicals: [
    ...W(`bleach|1|1;ammonia|2|2;vinegar|1|1;borax|3|2;lye|3|2;turpentine|3|3;drain cleaner|1|2;rubbing alcohol|2|2;hydrogen peroxide|2|2;laundry detergent|1|2;dish soap|1|2;fabric softener|1|2;window cleaner|1|2;oven cleaner|1|2;
toilet bowl cleaner|1|3;mothballs|3|3;antifreeze|2|3;paint thinner|2|3;acetone|3|3;nail polish remover|2|3;disinfectant|1|2;descaler|3|3;lighter fluid|2|3;chlorine|2|3;washing soda|3|3;citric acid|2|4;caustic soda|3|3;
bug spray|1|3;weed killer|1|3;scouring powder|3|3;kerosene|3|3;mineral spirits|4|4;white spirit|3|3;pesticide|2|3`),
    ['baking soda', 1, 1, { al: [['bicarbonate of soda', 'synonym', 3, 3, ['UK']], ['bicarb', 'short', 3, 3]] }],
    ['methylated spirits', 3, 3, { reg: ['UK'], al: [['meths', 'short', 4, 4, ['UK']], ['denatured alcohol', 'synonym', 4, 4, ['US']]] }],
  ],

  classical_elements: [
    ['fire', 1, 1], ['water', 1, 1], ['earth', 1, 1], ['air', 1, 1],
    ['aether', 4, 3, { al: [['ether', 'synonym', 3, 3, [], { g: 'classical element' }]] }],
  ],
  noble_gases: [...W(`helium|1|1;neon|1|1;argon|2|1;krypton|2|1;xenon|2|1;radon|3|1;oganesson|5|2`)],
  halogens: [...W(`fluorine|2|1;chlorine|1|1;bromine|2|1;iodine|2|1;astatine|4|2;tennessine|5|2`)],
  alkali_metals: [...W(`lithium|2|1;sodium|1|1;potassium|2|1;rubidium|4|2;francium|4|2;cesium|3|2`)],
  alkaline_earth_metals: [...W(`beryllium|3|1;magnesium|2|1;calcium|2|1;strontium|3|2;barium|3|2;radium|3|2`)],

  physics_words: [
    ...W(`energy|1|2;force|1|2|physics;mass|2|2|physics;velocity|2|2;acceleration|2|2;momentum|3|2;gravity|1|2;friction|2|2;inertia|3|2;speed|1|2;motion|1|2;wave|1|3|physics;frequency|3|3;wavelength|3|3;amplitude|4|3;relativity|2|2;quantum|3|2;
entropy|4|3;vector|3|3|physics;scalar|4|4;torque|3|3;density|2|3;pressure|2|3;power|1|3|physics;work|2|3|physics;kinetic energy|2|3;potential energy|3|3;uncertainty principle|4|4;Doppler effect|3|4;superposition|4|4;refraction|3|3;
thermodynamics|3|3;mechanics|3|3;optics|3|3;electromagnetism|4|3;Planck constant|5|5||proper;speed of light|1|3;free fall|3|3;terminal velocity|3|4;centripetal force|4|4;angular momentum|5|4;newton|2|3|unit;joule|3|3`),
  ],

  forces: [
    ...W(`gravity|1|1;friction|2|1;tension|3|2|force;magnetism|2|2;thrust|2|2;drag|2|2;lift|2|3|force;push|1|2|force;pull|1|2|force;normal force|4|3;buoyancy|3|3;air resistance|2|2;centripetal force|4|3;centrifugal force|3|3;
electrostatic force|4|4;tidal force|4|4;surface tension|3|3;spring force|4|4;applied force|3|3;torque|3|4;impulse|4|4|physics;inertia|3|3;gravitational force|2|2;magnetic force|2|2;contact force|4|4;upthrust|4|4;shear|4|4|force;compression|3|3|force`),
    ['strong nuclear force', 4, 3, { al: [['strong force', 'short', 4, 3]] }],
    ['weak nuclear force', 4, 3, { al: [['weak force', 'short', 4, 3]] }],
  ],

  energy_types: [
    ...W(`kinetic energy|2|1;potential energy|3|1;chemical energy|2|1;electrical energy|2|1;light energy|2|2;sound energy|2|2;solar energy|1|2;wind energy|1|2;geothermal energy|3|2;tidal energy|3|2;elastic energy|3|3;gravitational energy|3|3;
mechanical energy|3|2;radiant energy|4|3;magnetic energy|3|3;biomass energy|3|3;renewable energy|2|3;wave energy|3|3;activation energy|4|4;binding energy|5|4;internal energy|5|4;ionization energy|5|5;zero-point energy|5|5;hydroelectric energy|3|3`),
    ['thermal energy', 3, 1, { al: [['heat energy', 'synonym', 2, 2]] }],
    ['nuclear energy', 2, 1, { al: [['atomic energy', 'synonym', 3, 3]] }],
  ],

  electricity_words: [
    ...W(`current|1|2|electric;voltage|1|1;circuit|2|1|electric;battery|1|2;resistor|2|2;capacitor|3|3;transistor|3|3;conductor|2|2|electric;insulator|2|2;volt|2|2;ohm|3|2;watt|2|2;static electricity|2|2;short circuit|2|3;fuse|2|3|electric;
switch|1|3|electric;socket|1|3|electric;AC|2|2|current|acronym;DC|2|2|current|acronym;diode|4|3;inductor|4|4;transformer|2|3|electric;lightning|1|3;extension cord|1|3;circuit breaker|2|2;rheostat|5|4;galvanometer|5|4;multimeter|3|3;
solenoid|4|4;electrode|3|3;anode|4|4;cathode|4|4;semiconductor|3|3;superconductor|4|4;resistance|2|2|electric;kilowatt|2|3;kilowatt-hour|3|3;coulomb|4|3;farad|5|4;live wire|2|3;earth wire|3|3`),
    ['ampere', 3, 2, { al: [['amp', 'short', 2, 2]] }],
  ],

  light_words: [
    ...W(`ray|1|2|light;beam|1|2|light;reflection|1|2|light;refraction|3|2;mirror|1|2;lens|1|2;prism|2|2;spectrum|2|2;rainbow|1|2;laser|1|2;wavelength|3|3;photon|3|3;shadow|1|2;diffraction|4|3;polarization|4|4;absorption|3|4;transparent|1|3;
opaque|2|3;translucent|3|3;luminous|3|3;visible light|2|2;ultraviolet|2|3;infrared|2|3;X-ray|1|3;gamma ray|3|3;radio waves|2|3;speed of light|1|2;light-year|2|3;hologram|3|3;dispersion|4|4|light;convex lens|3|3;concave lens|3|3;
focal point|4|4;candela|5|5;lumen|4|4;lux|5|5;incandescent|3|3;fluorescence|4|4;phosphorescence|5|5;bioluminescence|3|4;red shift|4|4`),
    ['fiber optic', 3, 3, { al: [['fibre optic', 'spelling', 3, 3, ['UK']]] }],
  ],

  magnet_words: [
    ...W(`magnet|1|1;magnetic field|2|1;north pole|1|1;south pole|1|1;compass|1|2;iron filings|2|2;horseshoe magnet|1|1;bar magnet|1|1;fridge magnet|1|2;electromagnet|3|1;magnetism|2|1;polarity|3|2;ferromagnetic|4|3;magnetite|3|3;
lodestone|3|3;magnetic pole|2|2;magnetic north|2|3;gauss|4|4|unit;tesla|3|4|unit;weber|5|5|unit;neodymium magnet|3|2;magnetosphere|4|4;MRI|2|4||acronym;maglev|3|4;magnetic flux|4|3;dipole|4|3;paramagnetic|5|4;diamagnetic|5|4;permanent magnet|3|2;electromagnetic|3|3;compass needle|2|2`),
    ['attract', 1, 1, { pos: 'verb' }], ['repel', 2, 1, { pos: 'verb' }],
  ],

  acoustics_words: [
    ...W(`pitch|2|2|music;frequency|3|2;echo|1|2;decibel|2|2;amplitude|3|2;resonance|3|2;hertz|3|2;volume|1|3|sound;sound wave|2|2;timbre|4|3;tone|2|3|sound;overtone|4|3;harmonic|4|3;ultrasound|2|3;infrasound|4|3;sonar|2|3;acoustic|2|2;
Doppler effect|3|3;standing wave|4|3;sound barrier|2|3;supersonic|2|3;subsonic|3|3;Mach number|3|3;soundproofing|3|3;anechoic chamber|5|4;reverberation time|5|5;sabin|5|5;phon|5|5;rarefaction|5|4;longitudinal wave|4|4;transverse wave|4|4;
sound level|3|3;loudness|2|3;audible|2|3;echolocation|3|3;beats|4|4|sound;speed of sound|2|2;cycles per second|3|4;sound insulation|3|3`),
    ['reverberation', 4, 3, { al: [['reverb', 'short', 3, 3]] }],
  ],

  particle_physics: [
    ...W(`atom|1|1;proton|2|1;neutron|2|1;electron|2|1;quark|3|1|particle;photon|3|2;neutrino|3|2;boson|3|2;Higgs boson|2|1||proper;gluon|4|2;lepton|4|2;hadron|4|2;muon|4|2;tau|5|4|particle;positron|3|2;antimatter|2|3;antiproton|4|3;fermion|4|2;meson|4|3;baryon|4|3;graviton|4|3;
W boson|5|4||proper;Z boson|5|4||proper;up quark|3|2;down quark|3|2;charm quark|4|3;strange quark|4|3;top quark|4|3;bottom quark|4|3;LHC|3|4||acronym;CERN|2|4||acronym;particle accelerator|2|3;collider|3|3;antiparticle|4|3;dark matter|2|4;
tachyon|4|5;pion|5|3;kaon|5|4;Standard Model|3|3||proper`),
  ],

  nuclear_words: [
    ...W(`fission|3|1;fusion|2|1|nuclear;reactor|2|1;uranium|2|1;half-life|3|1;radiation|2|1;chain reaction|3|1;plutonium|3|2;isotope|3|2;radioactivity|3|2;decay|2|3|radioactive;control rods|4|3;fuel rod|3|3;core|2|3|reactor;meltdown|2|2;
Geiger counter|2|2;Chernobyl|2|3||place;Fukushima|2|3||place;Three Mile Island|3|3||place;nuclear power|1|1;nuclear waste|1|2;nuclear weapon|1|3;atomic bomb|1|3;hydrogen bomb|2|3;Manhattan Project|2|3||proper;enriched uranium|3|2;
heavy water|3|3;cooling tower|2|3;fallout|2|3;critical mass|3|2;nuclear winter|2|4;dirty bomb|2|4;becquerel|5|4;sievert|5|4;curie|4|4|unit;nuclear submarine|2|4;tokamak|5|3;breeder reactor|5|3;carbon dating|2|4;alpha particle|3|3;beta decay|4|3`),
    ['radioactive', 2, 2, { pos: 'adjective' }],
  ],

  heat_science: [
    ...W(`conduction|3|1;convection|3|1;thermal radiation|4|2;insulation|2|2;calorie|2|2;joule|3|2;absolute zero|3|2;temperature|1|2|physics;thermometer|1|3;Celsius|1|3||proper;Fahrenheit|1|3||proper;Kelvin|2|2|unit|proper;heat|1|1|physics;
thermal conductivity|4|3;specific heat|4|3;latent heat|4|3;heat capacity|4|3;thermodynamics|3|2;heat transfer|3|2;thermal conductor|3|2;thermal insulator|3|3;heat sink|3|3;thermostat|2|3;boiling point|2|3;freezing point|3|3;
thermal expansion|3|3;BTU|4|3||acronym;calorimeter|4|3;black body|3|4;infrared|2|3;Carnot cycle|5|4;heat engine|4|3;thermal equilibrium|4|3;greenhouse effect|2|3;thermal energy|3|2;friction|2|4;entropy|4|3`),
    ['thermal', 2, 2, { pos: 'adjective' }],
    ['Thermos', 2, 4, tmOrg],
  ],

  biology_words: [
    ...W(`cell|1|1|biology;organism|2|1;species|2|1;evolution|2|1;natural selection|2|2;ecosystem|2|2;habitat|2|2;photosynthesis|2|2;DNA|1|2||acronym;gene|2|2;chromosome|2|3;mitosis|3|2;meiosis|4|3;enzyme|3|2;protein|1|3;tissue|2|2|biology;organ|1|2|biology;
taxonomy|3|2;genus|3|2;phylum|4|2;mutation|2|2;adaptation|2|2;metabolism|3|2;osmosis|3|2;diffusion|3|3;homeostasis|4|3;symbiosis|3|3;predator|1|3;prey|1|3;food chain|1|2;biodiversity|3|2;microorganism|3|3;
antibody|3|3;hormone|2|3;biome|3|3;fossil|1|4;vertebrate|2|3;invertebrate|3|3;cell division|3|3;Charles Darwin|1|3||person;Gregor Mendel|4|4||person`),
  ],

  cell_parts: [
    ...W(`nucleus|2|1|cell;cell membrane|2|1;cytoplasm|3|1;mitochondria|2|1;ribosome|3|1;chloroplast|3|2;vacuole|3|2;Golgi apparatus|4|2||proper;lysosome|4|2;cell wall|2|2;centriole|5|3;cytoskeleton|4|3;nucleolus|4|3;
vesicle|4|3;flagellum|4|3;cilia|4|3;plasma membrane|4|3;organelle|3|2;chromatin|5|4;nuclear envelope|5|4;peroxisome|5|4;cytosol|5|4;plastid|5|4;microtubule|5|4;centrosome|5|4;nuclear pore|5|5;chromosome|2|3;
Golgi body|5|4||proper;cell sap|4|4`),
  ],

  genetics_words: [
    ...W(`gene|2|1;DNA|1|1||acronym;RNA|2|1||acronym;chromosome|2|1;allele|4|2;genome|3|2;mutation|2|2;dominant|2|2|genetics;recessive|3|2;genotype|4|2;phenotype|4|2;heredity|3|2;trait|2|2;Punnett square|4|2||proper;cloning|2|2;
hybrid|2|3;genetic code|3|2;double helix|2|2;nucleotide|4|2;CRISPR|3|3||acronym;gene therapy|3|3;genetic engineering|2|2;GMO|2|3||acronym;DNA sequencing|3|2;heterozygous|5|3;homozygous|5|3;epigenetics|4|3;transcription|4|3|genetics;
X chromosome|3|3;Y chromosome|3|3;carrier|3|3|genetics;haploid|5|4;diploid|5|4;karyotype|5|4;telomere|5|4;gene pool|4|3;selective breeding|3|3;Human Genome Project|3|3||proper;codon|5|3;Gregor Mendel|4|3||person;inheritance|2|3|genetics`),
  ],

  plant_biology: [
    ...W(`root|1|1|plant;stem|1|1|plant;leaf|1|1;flower|1|1;seed|1|1;petal|1|1;stamen|3|2;pistil|4|2;pollen|2|2;pollination|2|2;photosynthesis|2|2;chlorophyll|2|2;stomata|4|2;xylem|4|2;phloem|4|2;germination|3|2;sepal|4|2;
bud|1|2|plant;anther|4|3;ovary|4|3|flower;carpel|5|3;transpiration|4|3;phototropism|5|4;cotyledon|5|4;shoot|2|3|plant;bulb|1|3|plant;tuber|3|3;rhizome|4|3;taproot|3|3;cuticle|5|4|plant;guard cell|5|4;vascular bundle|5|4;
dormancy|3|4;seedling|1|2;sap|2|2;cambium|5|4;auxin|5|4;spore|2|3;fertilization|3|3;seed coat|3|3;embryo|3|4;tropism|5|4`),
  ],

  microbes: [
    ...W(`bacteria|1|1;virus|1|1|microbe;fungus|2|3;yeast|2|2;amoeba|2|1;protozoa|3|2;algae|2|3;germ|1|1|microbe;microbe|2|1;microorganism|3|1;pathogen|3|2;E. coli|2|2||proper;salmonella|2|2;staphylococcus|4|2;streptococcus|4|2;
lactobacillus|4|3;bacteriophage|5|3;parasite|2|3;paramecium|3|2;euglena|5|3;spirochete|5|4;plasmodium|5|4;rhinovirus|4|3;coronavirus|2|3;norovirus|3|3;adenovirus|4|3;retrovirus|4|3;mold|2|3;mildew|2|3;plasmid|5|4;diatom|4|3;
archaea|5|4;cyanobacteria|4|3;penicillium|4|3;mycoplasma|5|4;Giardia|4|4||proper;slime mold|3|3`),
  ],
};
