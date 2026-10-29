// Generated word data: Science & Tech deeper themes (chunk 1): lab kit, states of matter, forces, optics, nucleobases, viruses, planets, moons, stars, spaceflight,
// numbers, geometry, scientists and Chinese inventions.
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
export const FIXES = [{ gloss: ['condenser', 'microscope_parts', 'microscope'] }];

export const THEMES = {
  lab_glassware: { d: 3 }, lab_safety_gear: { d: 3 }, four_states_of_matter: { d: 1 }, fundamental_forces: { d: 3 }, optical_instruments: { d: 2 },
  nucleobases: { d: 4 }, viruses: { d: 2 }, inner_planets: { d: 1 }, outer_planets: { d: 1 }, galilean_moons: { d: 3 }, star_types: { d: 3 },
  rocket_parts: { d: 3 }, astronaut_gear: { d: 2 }, ordinal_numbers: { d: 1 }, numbers_one_to_ten: { d: 1 }, teen_numbers: { d: 1 }, multiples_of_ten: { d: 1 },
  polygons: { d: 2 }, circle_parts: { d: 3 }, angle_words: { d: 3 }, types_of_triangle: { d: 3 }, platonic_solids: { d: 4 }, conic_sections: { d: 4 },
  arithmetic_operations: { d: 1 }, women_in_science: { d: 3 }, islamic_golden_age_scholars: { d: 5 }, ancient_greek_thinkers: { d: 3 }, famous_physicists: { d: 2 },
  famous_naturalists: { d: 4 }, chinese_inventions: { d: 2 }, four_great_chinese_inventions: { d: 3 },
};

export const ALIASES = [
  ['platonic_solids', 'tetrahedron', '', [['triangular pyramid', 'synonym', 3, 3]]],
  ['famous_physicists', 'Richard Feynman', '', [['Feynman', 'short form', 3, 2]]],
  ['famous_physicists', 'Niels Bohr', '', [['Bohr', 'short form', 3, 3]]],
  ['famous_physicists', 'Max Planck', '', [['Planck', 'short form', 3, 3]]],
  ['famous_physicists', 'Werner Heisenberg', '', [['Heisenberg', 'short form', 3, 3]]],
  ['famous_physicists', 'Ernest Rutherford', '', [['Rutherford', 'short form', 3, 3]]],
];

export const DATA = {
  lab_glassware: [
    ['test tube', 1, 1], ['beaker', 2, 1], ['flask', 2, 2], ['funnel', 2, 3, { g: 'tool' }], ['petri dish', 2, 2], ['pipette', 3, 2, { al: [['pipet', 'spelling', 4, 3, ['US']]] }],
    ['measuring cylinder', 3, 2], ['conical flask', 3, 2, { al: [['Erlenmeyer flask', 'synonym', 4, 3]] }], ['burette', 4, 3, { al: [['buret', 'spelling', 5, 4, ['US']]] }],
    ['condenser', 4, 4, { g: 'laboratory', al: [['Liebig condenser', 'synonym', 5, 4]] }], ['round-bottom flask', 4, 3], ['volumetric flask', 4, 3], ['watch glass', 4, 3], ['microscope slide', 2, 3],
    ['vial', 3, 3], ['stirring rod', 3, 3], ['cuvette', 4, 4], ['boiling tube', 4, 3], ['separatory funnel', 5, 4], ['Buchner funnel', 5, 5], ['Dewar flask', 5, 4],
    ['distillation flask', 4, 4], ['Florence flask', 5, 5], ['thistle funnel', 5, 5], ['evaporating dish', 4, 3], ['Schlenk flask', 5, 5], ['dropper', 2, 3, { g: 'glass' }],
  ],
  lab_safety_gear: [
    ['lab coat', 1, 1], ['safety goggles', 2, 1], ['goggles', 2, 2, { g: 'eyewear' }], ['gloves', 1, 2], ['safety glasses', 2, 2, { g: 'protective' }], ['fire extinguisher', 1, 2],
    ['fire blanket', 2, 2], ['fume hood', 3, 2], ['eye wash', 3, 2, { al: [['eyewash station', 'synonym', 3, 3]] }], ['safety shower', 3, 2], ['face shield', 2, 2],
    ['first aid kit', 1, 3, { g: 'medical' }], ['nitrile gloves', 3, 2], ['respirator', 3, 3], ['dust mask', 2, 3], ['lab apron', 3, 2], ['spill kit', 4, 3],
    ['biohazard bag', 4, 3], ['sharps bin', 4, 4, { reg: ['UK'], al: [['sharps container', 'synonym', 4, 4, ['US']]] }], ['blast shield', 4, 4], ['glove box', 4, 4], ['ear defenders', 3, 4, { reg: ['UK'] }],
    ['hazmat suit', 2, 3], ['hair net', 2, 4], ['closed-toe shoes', 3, 3], ['hearing protection', 3, 4],
  ],
  four_states_of_matter: [
    ['solid', 1, 1, { g: 'state of matter' }], ['liquid', 1, 1], ['gas', 1, 1, { g: 'state of matter' }], ['plasma', 3, 3, { g: 'physics' }],
  ],
  fundamental_forces: [
    ['gravity', 1, 1, { al: [['gravitation', 'synonym', 3, 2]] }], ['electromagnetism', 3, 2, { al: [['electromagnetic force', 'synonym', 3, 2]] }],
    ['strong nuclear force', 4, 3, { al: [['strong force', 'short form', 3, 3], ['strong interaction', 'synonym', 4, 4]] }],
    ['weak nuclear force', 4, 3, { al: [['weak force', 'short form', 3, 3], ['weak interaction', 'synonym', 4, 4]] }],
  ],
  optical_instruments: [
    ['telescope', 1, 1], ['microscope', 1, 1], ['binoculars', 1, 2, { al: [['field glasses', 'synonym', 3, 3]] }], ['periscope', 2, 2], ['magnifying glass', 1, 2],
    ['kaleidoscope', 2, 3], ['camera', 1, 3], ['spyglass', 3, 2], ['monocular', 3, 3], ['opera glasses', 3, 3], ['projector', 1, 4], ['loupe', 4, 3],
    ['refracting telescope', 3, 3], ['reflecting telescope', 3, 3], ['spectroscope', 4, 3], ['spectrometer', 4, 4], ['endoscope', 3, 4], ['rangefinder', 4, 4],
    ['telescopic sight', 3, 4], ['stereoscope', 5, 4], ['interferometer', 5, 4], ['theodolite', 5, 5], ['camera obscura', 4, 4],
  ],
  nucleobases: [
    ['adenine', 3, 3], ['thymine', 3, 3], ['guanine', 4, 3], ['cytosine', 4, 3], ['uracil', 4, 3],
  ],
  viruses: [
    ['flu', 1, 2, { al: [['influenza', 'synonym', 2, 3]] }], ['measles', 2, 3], ['rabies', 2, 3], ['polio', 2, 3], ['ebola', 2, 3, { type: 'proper' }], ['zika', 3, 3, { type: 'proper' }],
    ['smallpox', 2, 3], ['HIV', 1, 2, { type: 'acronym' }], ['COVID-19', 1, 2, { type: 'acronym' }], ['herpes', 2, 3], ['mumps', 2, 3], ['rubella', 3, 3],
    ['dengue', 3, 3], ['yellow fever', 2, 3], ['rotavirus', 3, 2], ['norovirus', 3, 2], ['rhinovirus', 3, 2], ['adenovirus', 4, 3], ['hantavirus', 4, 3],
    ['papillomavirus', 4, 3, { al: [['HPV', 'short form', 3, 3, [], { type: 'acronym' }]] }], ['monkeypox', 3, 3, { al: [['mpox', 'synonym', 3, 3]] }], ['chikungunya', 4, 4],
    ['Epstein-Barr virus', 4, 4, { type: 'proper' }], ['cytomegalovirus', 5, 4], ['Marburg', 4, 4, { g: 'virus', type: 'proper' }], ['Nipah', 5, 5, { g: 'virus', type: 'proper' }],
    ['bacteriophage', 4, 3], ['retrovirus', 3, 3], ['West Nile virus', 3, 3, { type: 'proper' }],
  ],
  inner_planets: [
    ['Mercury', 1, 1, { g: 'planet', type: 'place' }], ['Venus', 1, 1, { g: 'planet', type: 'place' }], ['Earth', 1, 1, { g: 'planet', type: 'place' }], ['Mars', 1, 1, { g: 'planet', type: 'place' }],
  ],
  outer_planets: [
    ['Jupiter', 1, 1, { g: 'planet', type: 'place' }], ['Saturn', 1, 1, { g: 'planet', type: 'place' }], ['Uranus', 1, 1, { g: 'planet', type: 'place' }], ['Neptune', 1, 1, { g: 'planet', type: 'place' }],
  ],
  galilean_moons: [
    ['Io', 3, 3, { g: 'moon', type: 'proper' }], ['Europa', 3, 3, { g: 'moon', type: 'proper' }], ['Ganymede', 3, 3, { type: 'proper' }], ['Callisto', 3, 3, { type: 'proper' }],
  ],
  star_types: [
    ['red dwarf', 3, 2], ['white dwarf', 3, 2], ['red giant', 2, 2], ['blue giant', 3, 3], ['supergiant', 3, 3], ['neutron star', 3, 2], ['pulsar', 3, 3], ['supernova', 2, 3],
    ['brown dwarf', 3, 3], ['yellow dwarf', 3, 3], ['binary star', 2, 3], ['nova', 3, 4], ['magnetar', 4, 4], ['protostar', 4, 4], ['main sequence', 4, 4], ['variable star', 4, 4],
    ['red supergiant', 4, 4], ['blue supergiant', 4, 4], ['black dwarf', 4, 4], ['hypergiant', 5, 4], ['Cepheid variable', 5, 5], ['T Tauri star', 5, 5], ['Wolf-Rayet star', 5, 5], ['carbon star', 5, 5],
  ],
  rocket_parts: [
    ['rocket engine', 2, 1], ['booster', 3, 2, { g: 'rocket' }], ['nozzle', 3, 3], ['nose cone', 2, 2], ['fuel tank', 2, 2], ['payload', 3, 3], ['capsule', 2, 2, { g: 'spacecraft' }],
    ['fairing', 4, 3, { g: 'rocket' }], ['first stage', 3, 3], ['second stage', 3, 3], ['heat shield', 3, 3], ['thruster', 3, 3, { g: 'spacecraft engine' }], ['escape tower', 4, 3],
    ['solid rocket booster', 3, 3], ['upper stage', 4, 4], ['propellant', 3, 3], ['combustion chamber', 4, 4], ['fins', 3, 3, { g: 'rocket' }], ['guidance system', 3, 4],
    ['service module', 4, 4], ['oxidizer tank', 5, 5, { al: [['oxidiser tank', 'spelling', 5, 5, ['UK']]] }], ['turbopump', 5, 5], ['interstage', 5, 5], ['grid fins', 5, 5], ['landing legs', 4, 4], ['gimbal', 5, 5, { g: 'rocket' }],
  ],
  astronaut_gear: [
    ['space suit', 1, 1], ['space helmet', 1, 1, { al: [['astronaut helmet', 'synonym', 1, 1]] }], ['space gloves', 2, 2], ['space boots', 2, 2], ['oxygen tank', 3, 3], ['jetpack', 2, 3],
    ['tether', 3, 3], ['gold visor', 3, 3], ['pressure suit', 3, 3], ['flight suit', 2, 3], ['mission patch', 3, 4], ['EVA suit', 4, 4], ['maneuvering unit', 4, 4],
    ['cooling garment', 5, 5], ['life support pack', 4, 4], ['communications cap', 5, 5], ['space food', 2, 4], ['safety tether', 3, 4], ['spacewalk suit', 3, 3],
  ],
  ordinal_numbers: [
    ['first', 1, 1, { al: [['1st', 'short form', 1, 2]] }], ['second', 1, 1, { g: 'ordinal', al: [['2nd', 'short form', 1, 2]] }], ['third', 1, 1, { g: 'ordinal', al: [['3rd', 'short form', 1, 2]] }],
    ['fourth', 1, 1, { al: [['4th', 'short form', 1, 2]] }], ['fifth', 1, 1, { g: 'ordinal' }], ['sixth', 1, 1, { g: 'ordinal' }], ['seventh', 1, 1], ['eighth', 1, 1, { g: 'ordinal' }], ['ninth', 1, 1],
    ['tenth', 1, 1, { g: 'ordinal' }], ['eleventh', 2, 2], ['twelfth', 2, 2], ['thirteenth', 2, 2], ['twentieth', 2, 2], ['twenty-first', 2, 2], ['thirtieth', 2, 3], ['fortieth', 2, 3],
    ['fiftieth', 2, 3], ['hundredth', 2, 2, { g: 'ordinal' }], ['thousandth', 3, 3], ['millionth', 3, 3], ['umpteenth', 4, 4], ['zeroth', 5, 5],
  ],
  numbers_one_to_ten: [
    ['one', 1, 1, { g: 'number' }], ['two', 1, 1], ['three', 1, 1], ['four', 1, 1, { g: 'number' }], ['five', 1, 1], ['six', 1, 1, { g: 'number' }], ['seven', 1, 1],
    ['eight', 1, 1, { g: 'number' }], ['nine', 1, 1], ['ten', 1, 1, { g: 'number' }],
  ],
  teen_numbers: [
    ['thirteen', 1, 1], ['fourteen', 1, 1], ['fifteen', 1, 1], ['sixteen', 1, 1], ['seventeen', 1, 1], ['eighteen', 1, 1], ['nineteen', 1, 1],
  ],
  multiples_of_ten: [
    ['ten', 1, 1, { g: 'number' }], ['twenty', 1, 1], ['thirty', 1, 1], ['forty', 1, 2], ['fifty', 1, 1], ['sixty', 1, 1], ['seventy', 1, 1], ['eighty', 1, 1], ['ninety', 1, 1],
  ],
  polygons: [
    ['triangle', 1, 1, { g: 'shape' }], ['square', 1, 1, { g: 'shape' }], ['rectangle', 1, 1], ['pentagon', 1, 1, { g: 'shape' }], ['hexagon', 1, 1], ['octagon', 1, 1], ['rhombus', 2, 2],
    ['trapezoid', 3, 2, { al: [['trapezium', 'synonym', 3, 2, ['UK'], { g: 'shape' }]] }], ['parallelogram', 2, 2], ['kite', 1, 3, { g: 'shape' }], ['quadrilateral', 3, 2],
    ['heptagon', 3, 2], ['nonagon', 3, 3, { al: [['enneagon', 'synonym', 5, 5]] }], ['decagon', 3, 3], ['dodecagon', 4, 3], ['polygon', 2, 2],
    ['equilateral triangle', 2, 3], ['regular polygon', 3, 3], ['rhomboid', 4, 4, { g: 'shape' }], ['hendecagon', 5, 5, { al: [['undecagon', 'synonym', 5, 5]] }],
    ['icosagon', 5, 5], ['chiliagon', 5, 5], ['tetragon', 5, 5], ['irregular polygon', 3, 3], ['star polygon', 5, 4],
  ],
  circle_parts: [
    ['radius', 2, 1, { g: 'geometry' }], ['diameter', 2, 1], ['circumference', 2, 2], ['arc', 3, 2, { g: 'geometry' }], ['chord', 3, 3, { g: 'geometry' }], ['sector', 3, 3, { g: 'geometry' }],
    ['tangent', 3, 3, { g: 'geometry' }], ['segment', 3, 3, { g: 'geometry' }], ['center', 1, 2, { g: 'circle', al: [['centre', 'spelling', 1, 2, ['UK'], { g: 'circle' }]] }], ['secant', 4, 4], ['semicircle', 2, 3],
    ['quadrant', 3, 3, { g: 'circle' }], ['annulus', 5, 5], ['major arc', 4, 4], ['minor arc', 4, 4], ['central angle', 4, 4], ['inscribed angle', 5, 5], ['major sector', 4, 4],
    ['minor segment', 5, 5],
  ],
  angle_words: [
    ['acute', 2, 1], ['obtuse', 3, 1], ['right', 1, 1, { g: 'angle' }], ['reflex', 3, 2, { g: 'angle' }], ['straight', 1, 2, { g: 'angle' }], ['complementary', 3, 2], ['supplementary', 3, 2],
    ['adjacent', 3, 3], ['vertical', 2, 3, { g: 'angle' }], ['corresponding', 3, 3], ['alternate', 3, 3, { g: 'angle' }], ['interior', 3, 3, { g: 'angle' }], ['exterior', 3, 3, { g: 'angle' }],
    ['degrees', 1, 3], ['protractor', 3, 3], ['vertex', 3, 3], ['ray', 3, 4, { g: 'line' }], ['vertically opposite', 4, 4], ['co-interior', 5, 5], ['full angle', 4, 4],
    ['radian', 4, 4, { g: 'angle' }], ['right angle', 1, 2], ['acute angle', 2, 2], ['obtuse angle', 3, 2], ['reflex angle', 3, 2], ['oblique', 4, 4, { g: 'angle' }],
  ],
  types_of_triangle: [
    ['equilateral', 3, 2], ['isosceles', 3, 2], ['scalene', 4, 3], ['right triangle', 2, 2, { al: [['right-angled triangle', 'synonym', 3, 3, ['UK']]] }],
    ['acute triangle', 3, 3], ['obtuse triangle', 3, 3],
  ],
  platonic_solids: [
    ['tetrahedron', 3, 3], ['cube', 1, 3, { g: 'shape' }], ['octahedron', 4, 3], ['dodecahedron', 4, 3], ['icosahedron', 5, 3],
  ],
  conic_sections: [
    ['circle', 1, 3, { g: 'shape' }], ['ellipse', 3, 2], ['parabola', 3, 2], ['hyperbola', 4, 3],
  ],
  arithmetic_operations: [
    ['addition', 1, 1], ['subtraction', 1, 1], ['multiplication', 1, 1], ['division', 1, 1, { g: 'math' }],
  ],
  women_in_science: [
    ['Marie Curie', 1, 1], ['Ada Lovelace', 2, 2], ['Rosalind Franklin', 3, 2], ['Jane Goodall', 2, 2], ['Rachel Carson', 3, 3], 
    ['Grace Hopper', 3, 3], ['Lise Meitner', 4, 3], ['Emmy Noether', 4, 4], ['Mary Anning', 3, 3], ['Hypatia', 3, 3], ['Katherine Johnson', 3, 3], ['Barbara McClintock', 4, 4],
    ['Dorothy Hodgkin', 4, 4], ['Chien-Shiung Wu', 4, 4], ['Dian Fossey', 3, 3], ['Mae Jemison', 3, 3], ['Sally Ride', 2, 3], ['Annie Jump Cannon', 5, 4], ['Henrietta Leavitt', 5, 4],
    ['Caroline Herschel', 5, 4], ['Vera Rubin', 4, 4], ['Jocelyn Bell Burnell', 4, 4], ['Rita Levi-Montalcini', 5, 5], ['Lynn Margulis', 5, 5], ['Margaret Hamilton', 4, 4],
    ['Maryam Mirzakhani', 5, 5], ['Sophie Germain', 5, 5], ['Jennifer Doudna', 4, 4], ['Irene Joliot-Curie', 5, 5], ['Cecilia Payne', 5, 5], ['Tu Youyou', 5, 5],
  ].map(r => r.length === 3 ? [...r, { type: 'person' }] : r),
  islamic_golden_age_scholars: [
    ['Avicenna', 4, 3, { al: [['Ibn Sina', 'synonym', 4, 4, [], { type: 'person' }]] }], ['Al-Khwarizmi', 4, 3], ['Al-Biruni', 5, 4], ['Ibn al-Haytham', 5, 4, { al: [['Alhazen', 'synonym', 5, 5, [], { type: 'person' }]] }],
    ['Al-Razi', 5, 4, { type: 'person', al: [['Rhazes', 'synonym', 5, 5, [], { type: 'person' }]] }], ['Averroes', 4, 4, { al: [['Ibn Rushd', 'synonym', 5, 5, [], { type: 'person' }]] }],
    ['Al-Kindi', 5, 5, { type: 'person' }], ['Omar Khayyam', 3, 3], ['Al-Zahrawi', 5, 5, { type: 'person', al: [['Albucasis', 'synonym', 5, 5, [], { type: 'person' }]] }],
    ['Jabir ibn Hayyan', 5, 5, { type: 'person', al: [['Geber', 'synonym', 5, 5, [], { type: 'person' }]] }], ['Ibn Khaldun', 4, 4, { type: 'person' }], ['Al-Farabi', 5, 5, { type: 'person' }],
    ['Ibn Battuta', 3, 4], ['Al-Idrisi', 5, 5, { type: 'person' }], ['Ibn al-Nafis', 5, 5, { type: 'person' }], ['Al-Jazari', 5, 5, { type: 'person' }], ['Thabit ibn Qurra', 5, 5, { type: 'person' }],
    ['Al-Battani', 5, 5, { type: 'person' }], ['Al-Sufi', 5, 5, { type: 'person' }], ['Nasir al-Din al-Tusi', 5, 5, { type: 'person' }], ['Ibn Zuhr', 5, 5, { type: 'person' }],
    ['Ibn Tufail', 5, 5, { type: 'person' }], ['Fatima al-Fihri', 5, 5, { type: 'person' }], ['Al-Zarqali', 5, 5, { type: 'person' }], ['Abu Kamil', 5, 5, { type: 'person' }],
  ],
  ancient_greek_thinkers: [
    ['Aristotle', 2, 2], ['Archimedes', 2, 1], ['Euclid', 3, 2], ['Hippocrates', 2, 2], ['Ptolemy', 3, 3, { g: 'astronomer', type: 'person' }], ['Democritus', 4, 3, { type: 'person' }],
    ['Plato', 1, 2], ['Socrates', 1, 2], ['Pythagoras', 2, 2], ['Thales', 4, 3], ['Eratosthenes', 4, 3], ['Hipparchus', 5, 4], ['Anaximander', 5, 4, { type: 'person' }],
    ['Heraclitus', 4, 4, { type: 'person' }], ['Epicurus', 4, 4, { type: 'person' }], ['Theophrastus', 5, 5, { type: 'person' }], ['Galen', 4, 3], ['Parmenides', 5, 5, { type: 'person' }],
    ['Empedocles', 5, 5, { type: 'person' }], ['Aristarchus', 5, 4, { type: 'person' }], ['Anaxagoras', 5, 5, { type: 'person' }], ['Hero of Alexandria', 5, 4, { type: 'person' }],
    ['Diophantus', 5, 5, { type: 'person' }], ['Leucippus', 5, 5, { type: 'person' }], ['Anaximenes', 5, 5, { type: 'person' }], ['Protagoras', 5, 5, { type: 'person' }],
    ['Strabo', 5, 5, { type: 'person' }],
  ],
  famous_physicists: [
    ['Isaac Newton', 1, 1], ['Albert Einstein', 1, 1], ['Galileo Galilei', 2, 2], ['Niels Bohr', 3, 3], ['Richard Feynman', 3, 3], ['Stephen Hawking', 1, 1], ['Michael Faraday', 3, 2],
    ['James Clerk Maxwell', 3, 3], ['Max Planck', 3, 3], ['Werner Heisenberg', 3, 3], ['Ernest Rutherford', 3, 3], ['Enrico Fermi', 3, 3], ['Erwin Schrödinger', 3, 3, { al: [['Erwin Schrodinger', 'spelling', 3, 3]] }],
    ['Marie Curie', 1, 2], ['Nikola Tesla', 2, 3], ['Lise Meitner', 4, 3], ['Paul Dirac', 4, 4], ['Wolfgang Pauli', 4, 4], ['Johannes Kepler', 3, 3], ['Lord Kelvin', 4, 3, { type: 'title' }],
    ['Heinrich Hertz', 4, 4], ['Alessandro Volta', 3, 3], ['Georg Ohm', 4, 4], ['Peter Higgs', 3, 3], ['Christiaan Huygens', 5, 4], ['Robert Hooke', 4, 4], ['Satyendra Nath Bose', 5, 5],
    ['Brian Cox', 3, 3, { g: 'physicist' }],
  ].map(r => r.length === 3 ? [...r, { type: 'person' }] : r),
  famous_naturalists: [
    ['Charles Darwin', 1, 2, { g: 'scientist' }], ['Linnaeus', 3, 3], ['Alfred Wallace', 4, 3, { type: 'person' }],
    ['Audubon', 3, 3], ['Alexander Humboldt', 4, 4, { type: 'person' }], ['David Attenborough', 1, 1, { type: 'person', al: [['Attenborough', 'short form', 2, 2]] }], ['Gregor Mendel', 3, 4],
    ['Jane Goodall', 2, 3], ['Dian Fossey', 3, 4], ['Jacques Cousteau', 3, 4, { type: 'person' }], ['Gerald Durrell', 4, 4, { type: 'person' }], ['Joseph Banks', 4, 4, { type: 'person' }],
    ['John Muir', 3, 3, { type: 'person' }], ['Rachel Carson', 3, 3], ['Thomas Huxley', 4, 4, { type: 'person' }], ['Henry Bates', 5, 5, { type: 'person' }], ['Ernst Haeckel', 5, 4, { type: 'person' }],
    ['Georges Cuvier', 4, 4, { type: 'person' }], ['Buffon', 5, 4, { type: 'person' }], ['Steve Irwin', 2, 3, { type: 'person' }], ['Jean-Henri Fabre', 5, 5, { type: 'person' }],
    ['Gilbert White', 5, 5, { type: 'person' }], ['Konrad Lorenz', 4, 4, { type: 'person' }], ['Aldo Leopold', 5, 5, { type: 'person' }], ['E. O. Wilson', 4, 4, { type: 'person' }],
    ['Lamarck', 4, 4], ['Mary Leakey', 4, 5, { type: 'person' }], ['Carl Akeley', 5, 5, { type: 'person' }],
  ],
  chinese_inventions: [
    ['paper', 1, 1, { g: 'material' }], ['printing', 2, 2], ['compass', 1, 2, { g: 'direction' }], ['gunpowder', 1, 1, { g: 'explosive' }], ['silk', 1, 2], ['porcelain', 2, 2, { g: 'ceramic' }],
    ['kite', 1, 2, { g: 'toy' }], ['paper money', 2, 2], ['wheelbarrow', 2, 3], ['seismograph', 3, 3], ['abacus', 2, 2], ['crossbow', 2, 3], ['fireworks', 1, 2], ['toilet paper', 2, 3],
    ['movable type', 3, 3], ['woodblock printing', 3, 3], ['tofu', 2, 4], ['stirrup', 3, 4, { g: 'tack' }], ['rudder', 3, 4], ['cast iron', 3, 4], ['mechanical clock', 3, 4],
    ['suspension bridge', 2, 4], ['playing cards', 2, 4], ['lacquer', 4, 4], ['mahjong', 3, 3], ['iron plow', 5, 5, { al: [['iron plough', 'spelling', 5, 5, ['UK']]] }], ['water clock', 3, 4],
  ],
  four_great_chinese_inventions: [
    ['paper', 1, 1, { g: 'material' }], ['printing', 2, 2], ['compass', 1, 2, { g: 'direction' }], ['gunpowder', 1, 1, { g: 'explosive' }],
  ],
};
