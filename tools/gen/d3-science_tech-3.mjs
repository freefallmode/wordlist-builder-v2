// Generated word data: Science & Tech depth-3 themes (math, measurement, science history, computers), chunk 3.
// Format is described in tools/apply-words.mjs. Compact helper W: 'text|rec|in[|gloss[|type]]' rows separated by ';'.
// Helper PER: 'Full Name|rec|in[|Short name|shortRec|shortIn]' rows (people; the short form becomes a synonym alias).
const W = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, g, ty] = x.split('|'); const o = {}; if (g) o.g = g; if (ty) o.type = ty;
  return [t, +r, +i, o];
});
const PER = (s, sens = /^$/) => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, sh, sr, si] = x.split('|'); const o = { type: 'person' };
  if (sh) o.al = [[sh, 'synonym', +sr, +si]];
  if (sens.test(t)) o.sens = true;
  return [t, +r, +i, o];
});
const ACR = rows => rows.map(([t, r, i, o = {}]) => [t, r, i, { type: 'acronym', ...o }]);
const PROPER = rows => rows.map(([t, r, i, o = {}]) => [t, r, i, { type: 'proper', ...o }]);

export const THEMES = {
  statistics_words: { d: 3 }, math_tools: { d: 2 }, length_units: { d: 2 }, weight_units: { d: 2 }, volume_units: { d: 2 }, temperature_words: { d: 1 },
  metric_prefixes: { d: 4, complete: true, note: 'the 24 SI prefixes from quecto to quetta (deca also spelled deka)' },
  measuring_instruments: { d: 3 }, imperial_units: { d: 2, lang: true }, units_named_after_people: { d: 4 }, old_units: { d: 5, lang: true },
  metric_units: { d: 2 }, si_base_units: { d: 4, complete: true, note: 'the seven SI base units' },
  scientists: { d: 2 }, famous_mathematicians: { d: 3 }, famous_engineers: { d: 4 }, inventions: { d: 1 }, famous_discoveries: { d: 3 },
  science_fields: { d: 2 }, famous_experiments: { d: 5 }, nobel_laureates: { d: 3 }, inca_engineering: { d: 5 },
  computer_parts: { d: 1 }, programming_languages: { d: 3 }, coding_words: { d: 3 }, software_words: { d: 2 }, internet_words: { d: 2 },
  networking: { d: 4 }, file_types: { d: 3 }, cybersecurity_words: { d: 3 },
};

export const FIXES = [
  { gloss: ['compass', 'maps_and_globes', 'direction'] },
  { gloss: ['gray', 'colors', 'color'] },
  { gloss: ['hand', 'body_parts', 'body part'] },
  { gloss: ['cookie', 'breads_and_baking', 'biscuit'] }, { gloss: ['catfish', 'fish', 'fish'] }, { gloss: ['crystal', 'rocks_and_minerals', 'mineral'] },
  { gloss: ['library', 'buildings', 'building'] }, { gloss: ['stadium', 'buildings', 'building'] }, { gloss: ['zip', 'fabrics_and_sewing', 'fastener'] },
  { gloss: ['Hawking', 'horse_and_animal_sports', 'falconry'] }, { gloss: ['sandbox', 'toys_and_play', 'toy'] }, { gloss: ['Cantor', 'musicians', 'singer'] },
  { gloss: ['wizard', 'fantasy', 'fantasy'] }, { gloss: ['elixir', 'fantasy', 'potion'] },
];

export const DATA = {
  statistics_words: W(`mean|1|3|statistics;median|2|2|statistics;mode|2|3|statistics;range|2|3|statistics;average|1|2;probability|2|2;sample|2|3|statistics;outlier|3|2;data|1|3;
survey|1|3;chance|1|4;odds|2|4;random|1|4;population|2|4|statistics;graph|1|4;histogram|3|2;bar chart|1|3;pie chart|1|3;scatter plot|3|2;box plot|4|3;
variance|3|2;standard deviation|3|2;correlation|3|2;regression|4|3;percentile|3|2;quartile|4|3;hypothesis|3|3;null hypothesis|4|3;normal distribution|4|3;
bell curve|3|2;sample size|3|2;margin of error|3|2;confidence interval|4|3;p-value|4|3;z-score|4|3;skew|4|4|statistics;bias|2|4|statistics;frequency|2|4|statistics;
standard error|4|3;chi-square|5|4;t-test|4|3;covariance|5|4;kurtosis|5|4;Monte Carlo|4|4;mean deviation|4|3;
frequency table|3|3;tally chart|2|3;line graph|1|4;sampling|3|3;expected value|4|3;statistic|3|2;census|2|3;poll|2|3`)
    .concat(ACR([['ANOVA', 5, 4]])),

  math_tools: [
    ...W(`ruler|1|1;protractor|3|1;set square|3|2;calculator|1|1;abacus|2|1;slide rule|3|1;pencil|1|3;eraser|1|4;graph paper|2|2;geometry set|2|1;
tape measure|1|3;meter stick|3|2;yardstick|2|2;number line|2|2;base ten blocks|3|2;counters|2|3;scientific calculator|2|1;graphing calculator|3|1;
T-square|4|2;divider|4|3|drawing;French curve|4|3;Napier's bones|5|3;geoboard|4|3;Cuisenaire rods|5|3;adding machine|3|2;planimeter|5|4;
pantograph|5|4;tally sticks|3|3;counting frame|3|2;stencil|2|4;mechanical pencil|2|4;spirit level|2|4;trundle wheel|4|3;
hundred square|3|3;times table|2|3;stopwatch|2|4`),
    ['compass', 1, 1, { g: 'drawing', al: [['compasses', 'synonym', 2, 1], ['pair of compasses', 'synonym', 3, 2]] }],
  ],

  length_units: W(`meter|1|1|unit;kilometer|1|1;centimeter|1|1;millimeter|1|1;inch|1|1;foot|1|1|unit;yard|1|1|unit;mile|1|1;nautical mile|3|2;light year|2|2;parsec|3|2;
astronomical unit|3|2;micron|3|3;angstrom|4|3;nanometer|3|2;micrometer|3|3|unit;fathom|3|3;furlong|3|3;league|3|3|unit;chain|4|3|unit;hand|3|4|unit;
decimeter|3|2;hectometer|4|3;picometer|4|3;femtometer|5|4;thou|5|4;rod|4|4|unit;cubit|3|3;ell|5|4;link|5|4|unit;
span|3|4|width;kiloparsec|5|4;pica|5|4;barleycorn|5|4;perch|5|4|unit`),

  weight_units: W(`gram|1|1;kilogram|1|1;milligram|2|1;microgram|3|2;tonne|2|2;ton|1|2|unit;pound|1|1|weight;ounce|1|1|unit;stone|2|2|unit;grain|3|3|unit;dram|4|3;
carat|2|3;hundredweight|4|3;troy ounce|3|2;slug|4|4|unit;quintal|5|4;scruple|5|4;short ton|3|2;long ton|4|3;pennyweight|5|4;megagram|5|4;
kilo|1|2;atomic mass unit|4|3;dalton|4|4|unit;metric ton|2|2;tola|5|4;seer|5|4;maund|5|5;catty|5|4;tael|5|4`)
    .concat([['lb', 2, 2], ['oz', 2, 2]]),

  volume_units: W(`liter|1|1;milliliter|3|1;gallon|1|1;quart|2|1;pint|1|1;cup|1|2|unit;tablespoon|1|2;teaspoon|1|2;fluid ounce|2|1;barrel|2|3|unit;bushel|3|3;
cubic meter|2|2;cubic centimeter|2|2;centiliter|3|2;hectoliter|4|3;deciliter|3|2;kiloliter|3|2;drop|1|4|unit;gill|4|3|unit;peck|4|3;
cubic foot|2|2;cubic inch|3|2;cubic yard|3|2;firkin|5|4;hogshead|5|4;jigger|4|4;imperial gallon|3|2;US gallon|3|2;acre-foot|5|4;
fluid dram|5|4;minim|5|4;cord|4|4|unit;cubic kilometer|4|3`)
    .concat([['cc', 3, 3], ['ml', 2, 2]]),

  temperature_words: W(`Celsius|1|1|unit;Fahrenheit|1|1;kelvin|2|2|unit;degree|1|2|temperature;thermometer|1|1;thermostat|1|2;hot|1|2;cold|1|2|temperature;warm|1|2;cool|1|3;freezing|1|2;boiling|1|2;
absolute zero|3|2;frost|1|4;lukewarm|2|2;scorching|2|3;chilly|1|3;mild|2|3;boiling point|2|2;freezing point|2|2;melting point|2|3;room temperature|2|2;
fever|1|4;centigrade|3|2;Rankine|5|4;tepid|3|3;balmy|3|4;sweltering|2|3;icy|1|3;temperature|1|1|measurement;heat|1|3;
subzero|3|3;thermal|2|3;body temperature|2|3;blistering|3|4;frigid|3|3;warmth|2|3`),

  metric_prefixes: W(`quecto|5|4;ronto|5|4;yocto|5|4;zepto|5|4;atto|5|4;femto|4|3;pico|4|3;nano|2|2;micro|2|2;milli|2|2;centi|3|2;deci|3|2;hecto|3|3;kilo|1|1;mega|2|2;giga|2|2;tera|3|2;peta|4|3;exa|4|3;zetta|5|4;yotta|5|4;ronna|5|4;quetta|5|4`)
    .concat([['deca', 4, 3, { al: [['deka', 'spelling', 4, 3]] }]]),

  measuring_instruments: W(`thermometer|1|1;barometer|2|1;voltmeter|3|1;ammeter|3|2;odometer|2|1;speedometer|1|1;seismograph|3|2;anemometer|3|2;hygrometer|4|2;rain gauge|2|2;
scales|1|3;tape measure|1|3;stopwatch|1|3;pedometer|3|2;altimeter|3|2;caliper|3|2;micrometer|4|3|instrument;spirometer|4|3;tachometer|3|2;Geiger counter|2|2;
multimeter|3|2;sextant|3|3;theodolite|4|3;hydrometer|4|2;manometer|5|3;sphygmomanometer|4|3;pyrometer|5|3;photometer|5|3;fuel gauge|2|2;oscilloscope|4|3;
spectrometer|4|3;ohmmeter|4|2;gauge|2|3|instrument;flowmeter|5|3;decibel meter|3|2;breathalyzer|2|3;bathroom scale|1|3;kitchen scale|1|3;measuring jug|2|3;
pressure gauge|2|2;tire gauge|2|3;dipstick|2|4|oil gauge;yardstick|2|3;galvanometer|5|3;chronometer|4|3;clinometer|5|3;ceilometer|5|4;radiometer|5|3;
dosimeter|5|3;tide gauge|4|3;ruler|1|2;protractor|2|3;gas meter|2|3;electricity meter|2|3;water meter|2|3;taximeter|4|3;lux meter|5|3;ergometer|5|4;
barograph|5|3;seismometer|4|2`),

  imperial_units: W(`inch|1|1;foot|1|1|unit;yard|1|1|unit;mile|1|1;ounce|1|1|unit;pound|1|1|weight;stone|2|1|unit;pint|1|1;gallon|1|1;acre|1|1;quart|2|1;fluid ounce|2|1;hundredweight|4|2;
ton|1|2|unit;furlong|3|2;chain|4|2|unit;rod|4|3|unit;thou|5|3;cup|1|3|unit;gill|4|3|unit;peck|4|3;bushel|3|3;barrel|2|3|unit;square foot|1|2;square mile|2|2;
nautical mile|3|3;hand|3|3|unit;short ton|3|3;long ton|4|3;grain|3|3|unit;dram|4|3;perch|5|4|unit;rood|5|4;link|5|4|unit;league|3|3|unit;fathom|3|3;
cubic foot|2|2;cubic yard|3|2;square inch|2|2;square yard|2|2;tablespoon|1|4;teaspoon|1|4;minim|5|4;firkin|5|4;hogshead|5|4`)
    .concat([['mph', 1, 3], ['lb', 2, 2], ['oz', 2, 2], ['ft', 2, 2]]),

  units_named_after_people: W(`newton|2|1|unit;joule|2|1;watt|1|1|unit;volt|1|1;ohm|2|1;kelvin|2|1|unit;hertz|2|1|unit;pascal|3|1|unit;ampere|3|1;coulomb|3|2;farad|3|2;henry|4|3|unit;
tesla|2|1|unit;weber|4|3|unit;siemens|3|2|unit;becquerel|4|2;gray|3|3|unit;sievert|4|3;Celsius|1|2|unit;Fahrenheit|1|2;curie|3|3|unit;rankine|5|4;angstrom|4|3;
gauss|4|2|unit;oersted|5|4;maxwell|5|4;gilbert|5|4;roentgen|4|3;poise|5|4;stokes|5|4;bel|4|3;decibel|2|2;mach|2|3|unit;
baud|4|3;erlang|5|4;jansky|5|4;sverdrup|5|4;rayleigh|5|4;debye|5|4;fermi|5|4;svedberg|5|4;langley|5|4;torr|4|3`),

  old_units: W(`cubit|3|1;furlong|3|1;league|3|1|unit;fathom|3|1;rod|4|2|unit;pole|4|3|unit;span|3|2|width;ell|5|2;bushel|3|1;peck|4|1;gill|4|2|unit;chain|4|2|unit;hand|3|2|unit;
pace|3|3|unit;palm|4|3|unit;digit|4|3|unit;barleycorn|5|3;perch|5|3|unit;rood|5|3;hogshead|5|2;firkin|5|2;scruple|5|3;grain|3|3|unit;dram|4|3;stadium|4|4|unit;
cord|4|3|unit;fother|5|4;bovate|5|4;virgate|5|4;carucate|5|4;oxgang|5|4;hide|4|4|unit;kilderkin|5|4;puncheon|5|4;tierce|5|4;noggin|4|4|unit;
nail|4|4|unit;talent|4|3|unit;shekel|4|3|unit;chaldron|5|4;morgen|5|4;arpent|5|4;toise|5|4;parasang|5|4`),

  metric_units: W(`meter|1|1|unit;gram|1|1;liter|1|1;kilometer|1|1;centimeter|1|1;millimeter|1|1;kilogram|1|1;milligram|2|1;milliliter|3|1;tonne|2|2;hectare|2|2;Celsius|2|3|unit;
newton|2|2|unit;joule|2|2;watt|1|2|unit;pascal|3|3|unit;hertz|2|3|unit;volt|1|2;ampere|2|3;kilowatt|1|2;kilojoule|2|2;micron|3|3;
kilopascal|3|3;megawatt|2|3;nanometer|3|3;microgram|3|3;centiliter|3|2;decimeter|3|2;hectoliter|4|3;mole|3|3|unit;
candela|4|3;tesla|2|3|unit;coulomb|3|3;ohm|2|2;sievert|4|4;becquerel|4|4;
cubic meter|2|2;square meter|1|2;square kilometer|1|2`)
    .concat([['kph', 1, 2]]),

  si_base_units: [
    ...W(`second|1|1|time;kilogram|1|1;ampere|2|2;kelvin|2|2|unit;mole|3|2|unit;candela|4|3`),
    ['meter', 1, 1, { g: 'unit', al: [['metre', 'spelling', 2, 2, ['UK']]] }],
  ],

  scientists: PER(`Albert Einstein|1|1|Einstein|1|1;Isaac Newton|1|1;Marie Curie|1|1;Charles Darwin|1|1|Darwin|1|1;Galileo Galilei|2|1|Galileo|1|1;Nikola Tesla|2|1;
Stephen Hawking|1|1;Louis Pasteur|2|1|Pasteur|2|1;Alexander Fleming|2|1;Niels Bohr|3|2;Max Planck|3|2;Michael Faraday|3|2|Faraday|3|2;
Rosalind Franklin|3|2;Ada Lovelace|2|2;Carl Sagan|2|2;Neil deGrasse Tyson|2|2;Jane Goodall|2|2;Gregor Mendel|3|2|Mendel|3|2;Johannes Kepler|3|2|Kepler|3|2;
Nicolaus Copernicus|3|2|Copernicus|3|2;Archimedes|2|2;Alan Turing|2|2;Richard Feynman|3|2;Edwin Hubble|3|2;James Clerk Maxwell|4|3;Dmitri Mendeleev|3|2|Mendeleev|3|2;
Antoine Lavoisier|4|3;Robert Hooke|4|3;Robert Boyle|3|3;Edward Jenner|3|2;Joseph Lister|3|3;Francis Crick|3|3;James Watson|3|3;Lise Meitner|4|3;
Enrico Fermi|4|3;Robert Oppenheimer|2|2;Werner Heisenberg|4|3;Erwin Schrödinger|3|3;Ernest Rutherford|3|3;Thomas Edison|1|2|Edison|1|2;
Alexander Graham Bell|2|3;Tycho Brahe|4|3;Carl Linnaeus|4|3;Jonas Salk|3|3;Barbara McClintock|4|3;Chien-Shiung Wu|5|4;Katherine Johnson|3|3;Jocelyn Bell Burnell|5|4;
Dorothy Hodgkin|5|4;Mary Anning|3|3;Alfred Wegener|4|3;Humphry Davy|4|3;John Dalton|3|3;Joseph Priestley|4|3;Rachel Carson|3|3;Wilhelm Röntgen|4|3;
Svante Arrhenius|5|4;Hypatia|3|3;Ibn al-Haytham|5|4;Al-Biruni|5|4;Avicenna|4|3;Pierre Curie|4|3;Gertrude Elion|5|4;Marie Tharp|5|4;Jennifer Doudna|4|3`),

  famous_mathematicians: PER(`Euclid|2|1;Pythagoras|1|1;Leonhard Euler|3|2|Euler|3|2;Carl Friedrich Gauss|3|2;Pierre de Fermat|3|2|Fermat|3|2;Fibonacci|2|1;Alan Turing|2|2;
Gottfried Leibniz|3|2|Leibniz|3|2;Isaac Newton|1|2;Archimedes|2|1;René Descartes|2|2|Descartes|2|2;Blaise Pascal|2|2;Bernhard Riemann|4|3|Riemann|4|3;David Hilbert|4|3|Hilbert|4|3;
Georg Cantor|4|3;Srinivasa Ramanujan|3|2|Ramanujan|3|2;Emmy Noether|4|3|Noether|4|3;Ada Lovelace|2|3;Hypatia|3|3;Al-Khwarizmi|4|3;John Napier|4|3;
Joseph Fourier|4|3|Fourier|4|3;Pierre-Simon Laplace|4|4|Laplace|4|3;Évariste Galois|5|3|Galois|5|3;Kurt Gödel|4|3|Gödel|4|3;
Henri Poincaré|4|3|Poincaré|4|3;Paul Erdős|4|3|Erdős|4|3;John Nash|3|3;Godfrey Hardy|5|4;Grigori Perelman|4|3|Perelman|4|3;Benoit Mandelbrot|3|3|Mandelbrot|3|3;
Jacob Bernoulli|5|4;Thales|3|3;Eratosthenes|3|3;Diophantus|5|3;Brahmagupta|5|3;Aryabhata|5|3;Katherine Johnson|3|3;Maryam Mirzakhani|4|3;Terence Tao|4|3;
Andrew Wiles|3|3;Sophie Germain|5|3;George Boole|4|3;Omar Khayyam|4|3;Apollonius|5|3;Hipparchus|5|4;
Augustin Cauchy|5|3;Niels Abel|5|3;Felix Klein|5|3;John von Neumann|3|3;Claude Shannon|4|3;Norbert Wiener|5|4;Ronald Fisher|5|4;Stefan Banach|5|3`),

  famous_engineers: PER(`Isambard Brunel|3|2|Brunel|3|2;James Watt|2|2;George Stephenson|3|2;Gustave Eiffel|2|1|Eiffel|2|1;Nikola Tesla|2|2;John Roebling|4|2|Roebling|4|2;
Thomas Telford|4|3;Joseph Bazalgette|4|3;Thomas Edison|1|3;Karl Benz|2|2;Henry Ford|1|2;Rudolf Diesel|3|3;Ferdinand de Lesseps|4|3;Wernher von Braun|3|3;
Sergei Korolev|4|3;Frank Whittle|4|3;Igor Sikorsky|4|3;Ove Arup|5|3;Fazlur Khan|5|3;Robert Stephenson|4|3;Charles Parsons|5|3;Joseph Strauss|5|3;
Emily Roebling|5|3;Marc Brunel|5|4;John Smeaton|5|3;James Brindley|5|3;Willis Carrier|4|3;Nikolaus Otto|4|3;
Alexander Graham Bell|2|3;Henry Bessemer|5|3;Richard Trevithick|5|3;Thomas Newcomen|5|3;Robert Fulton|4|3;Charles Babbage|3|3;
Alec Issigonis|4|3;Harry Ferguson|5|4;Santiago Calatrava|4|3`)
    .concat([['Wright brothers', 1, 1, { type: 'person' }]]),

  inventions: W(`wheel|1|1;printing press|1|1;telephone|1|1;light bulb|1|1;airplane|1|1;steam engine|2|1;telescope|1|1;microscope|1|1;paper|1|3|material;gunpowder|2|2;clock|1|2;radio|1|1;
television|1|1;camera|1|2;battery|1|2;zipper|1|1;typewriter|1|1;sewing machine|1|1;bicycle|1|2;elevator|1|2;telegraph|2|1;phonograph|2|1;refrigerator|1|2;
vacuum cleaner|1|2;microwave oven|1|2;spinning jenny|3|2;cotton gin|3|2;flying shuttle|4|3;safety pin|1|2;barbed wire|2|2;dynamite|2|2;vacuum flask|2|3;
ballpoint pen|1|2;lightning rod|3|2;bifocals|3|2;stethoscope|2|3;parachute|1|2;crossbow|2|3;stirrup|3|3;sundial|2|3;transistor|3|2;laser|2|2;
jet engine|2|2;helicopter|1|2;rocket|1|3|spacecraft;submarine|1|3;steam locomotive|2|2;smartphone|1|2;3D printer|3|2;compass|1|3|direction;astrolabe|4|3;
water clock|3|3;seismoscope|5|4;Jacquard loom|5|3;wheelbarrow|2|3;spectacles|1|3;electric motor|2|2;daguerreotype|5|3;hot air balloon|1|2;air conditioner|1|2`),

  famous_discoveries: W(`penicillin|1|1;gravity|1|1;X-rays|3|1;radium|3|2;electron|2|2;neutron|2|2;proton|2|2;Higgs boson|3|2;black holes|2|2;expanding universe|3|2;Neptune|2|3;Uranus|2|3;
Pluto|1|3|dwarf planet;Halley's Comet|3|3;insulin|2|2;vaccination|2|2;bacteria|1|2;blood circulation|3|2;laws of motion|3|2;relativity|2|2;
natural selection|2|2;evolution|1|2;heliocentrism|4|2;radioactivity|3|2;oxygen|1|3;hydrogen|1|3;helium|1|3;periodic table|2|2;electricity|1|2;fire|1|3;
cells|2|2;microbes|2|3;germ theory|3|2;pulsars|4|3;exoplanets|3|3;dark matter|2|3;gravitational waves|3|2;cosmic background|4|3;Big Bang|1|2;
Jupiter's moons|3|3;fossils|1|3;dinosaur bones|1|3;magnetism|2|3;nuclear fission|3|2;quantum theory|3|2;antibiotics|2|2;blood types|3|3;human genome|3|2;
double helix|3|2;continental drift|3|2;plate tectonics|3|2;neutrino|3|3;quarks|3|3;superconductivity|4|3;graphene|3|3;CRISPR|4|3`)
    .concat(ACR([['DNA', 1, 1]])),

  science_fields: W(`biology|1|1;chemistry|1|1;physics|1|1;astronomy|1|1;geology|1|1;meteorology|2|1;ecology|2|1;zoology|2|1;botany|2|1;genetics|2|1;anatomy|2|2;psychology|1|3;
oceanography|3|1;paleontology|3|1;entomology|3|1;ornithology|3|1;virology|3|1;immunology|3|2;neuroscience|2|2;cosmology|3|1;astrophysics|3|1;microbiology|3|1;
biochemistry|3|1;toxicology|4|2;seismology|3|1;volcanology|3|1;ethology|4|2;herpetology|4|1;ichthyology|4|1;mycology|4|1;taxonomy|3|2;endocrinology|4|3;
marine biology|2|1;forensic science|2|2;materials science|3|1;limnology|5|2;
pedology|5|3;glaciology|4|2;speleology|4|3;arachnology|5|2;myrmecology|5|2;dendrology|5|2;cetology|5|3;lepidopterology|5|2;nephology|5|3;
hydrology|4|1;climatology|3|1;thermodynamics|3|2;astrobiology|4|2;embryology|4|2;histology|4|2;
parasitology|4|2;bacteriology|4|2;primatology|4|2;mineralogy|4|1;petrology|5|2;sedimentology|5|2;geophysics|4|1;biophysics|4|2;astrochemistry|5|3`),

  // named experiments are proper nouns; plain descriptions are common words
  famous_experiments: [
    ...W(`double-slit experiment|3|2;oil drop experiment|4|2;marshmallow test|2|2;gold foil|4|3;Pisa drop|4|4;Stroop test|3|3;paddle wheel|4|4`),
    ...PROPER([
      ["Schrödinger's cat", 2, 2], ["Pavlov's dogs", 2, 2], ['Milgram experiment', 3, 2, { sens: true }], ['Stanford prison', 3, 2, { sens: true }],
      ['Michelson-Morley', 5, 3], ['Miller-Urey', 5, 3], ['Cavendish experiment', 5, 3], ["Newton's prism", 3, 3], ["Franklin's kite", 3, 2], ["Foucault's pendulum", 4, 2],
      ['swan neck flask', 5, 3, { type: 'common' }], ["Mendel's peas", 3, 2], ['Hershey-Chase', 5, 3], ['Meselson-Stahl', 5, 3], ['Bobo doll', 3, 2], ['Asch conformity', 4, 2],
      ['Little Albert', 3, 2, { sens: true }], ["Harlow's monkeys", 4, 2, { sens: true }], ['Stern-Gerlach', 5, 3], ['Davisson-Germer', 5, 3], ['Eddington eclipse', 5, 3],
      ["Galvani's frogs", 4, 3], ['Trinity test', 3, 2, { sens: true }],
    ]),
  ],

  nobel_laureates: PER(`Albert Einstein|1|1|Einstein|1|1;Marie Curie|1|1;Alexander Fleming|2|2;Ernest Hemingway|2|2;Bob Dylan|1|3;Toni Morrison|3|2;
García Márquez|3|3;Rabindranath Tagore|4|3;Pierre Curie|4|3;Niels Bohr|3|3;Max Planck|3|3;Richard Feynman|3|3;Paul Dirac|4|3;Enrico Fermi|4|3;Werner Heisenberg|4|3;
Erwin Schrödinger|3|3;Ivan Pavlov|3|3;Francis Crick|3|3;James Watson|3|3;Linus Pauling|4|3;Fritz Haber|4|3;Frederick Banting|4|3;Dorothy Hodgkin|5|3;
Barbara McClintock|4|3;Jennifer Doudna|4|3;Albert Camus|3|3;Samuel Beckett|4|3;Rudyard Kipling|3|3;Thomas Mann|4|3;Pablo Neruda|3|3;Kazuo Ishiguro|3|3;
Doris Lessing|4|3;Alice Munro|4|3;Ernest Rutherford|3|3;Peter Higgs|3|3;Roger Penrose|4|3;Geoffrey Hinton|3|3;Demis Hassabis|4|3;Milton Friedman|4|3;
Paul Krugman|4|3;Amartya Sen|4|3;Svetlana Alexievich|5|4;Jean-Paul Sartre|3|3;William Faulkner|3|3;John Steinbeck|2|3;Wole Soyinka|4|3;
Nelson Mandela|1|2;Malala Yousafzai|2|2;Martin Luther King|1|3;Mother Teresa|1|3;Barack Obama|1|3;Winston Churchill|1|4;Albert Schweitzer|4|3;Desmond Tutu|3|3;
Aung San Suu Kyi|3|3;Wangari Maathai|4|3;Jimmy Carter|1|3;Theodore Roosevelt|2|4;Woodrow Wilson|2|4;Henry Kissinger|3|4;Al Gore|2|3;Kofi Annan|3|3;
Muhammad Yunus|4|3;Lech Wałęsa|4|3;Mikhail Gorbachev|3|3;Yasser Arafat|3|3;Elie Wiesel|4|3`,
    /Mandela|Malala|Luther King|Mother Teresa|Obama|Churchill|Schweitzer|Tutu|Suu Kyi|Maathai|Carter|Roosevelt|Wilson|Kissinger|Al Gore|Annan|Yunus|Wałęsa|Gorbachev|Arafat|Wiesel/)
    .concat([['Dalai Lama', 1, 3, { type: 'title', sens: true }]]),

  inca_engineering: [
    ...W(`quipu|3|1;terraces|2|2;rope bridge|2|2;aqueduct|2|3;stone walls|2|3;irrigation|2|3;suspension bridge|2|3;trapezoid doorway|4|2;ashlar masonry|4|3;chasqui|5|2;tambo|5|3;qollqa|5|3`),
    ...PROPER([['Inca road', 3, 1], ['Qhapaq Ñan', 5, 2]]),
    ['Machu Picchu', 1, 2, { type: 'place' }], ['Sacsayhuamán', 4, 2, { type: 'place' }], ['Ollantaytambo', 5, 2, { type: 'place' }], ['Moray', 5, 3, { type: 'place', g: 'Inca site' }],
    ['Maras salt pans', 5, 3, { type: 'place' }], ["Q'eswachaka", 5, 2, { type: 'place' }], ['Coricancha', 5, 3, { type: 'place' }], ['Choquequirao', 5, 3, { type: 'place' }],
    ['Pisac', 5, 3, { type: 'place' }], ['Intihuatana', 5, 3, { type: 'place' }],
  ],

  computer_parts: [
    ...W(`keyboard|1|1|computer;mouse|1|1|computer;monitor|1|1|screen;motherboard|2|1;hard drive|1|1;graphics card|2|1;power supply|2|1;fan|1|3|computer;
case|1|3|computer;webcam|1|1;speaker|1|2;microphone|1|2;printer|1|2;scanner|1|2;USB port|2|2;headphones|1|3;touchpad|2|1;trackpad|3|1;heat sink|3|2;sound card|3|1;
optical drive|3|2;floppy disk|2|2;battery|1|3;screen|1|2|display;processor|2|1|computer;chip|1|3;disk drive|2|1;joystick|2|2;stylus|3|3|gadget;flash drive|2|2;memory card|2|2;
HDMI port|3|2;expansion slot|4|2;chipset|4|2;cooling fan|3|2;CMOS battery|5|2;network card|4|2;video card|3|1;hard disk|2|1;
CD drive|2|2;DVD drive|2|2;trackball|3|2`),
    ...ACR([['CPU', 2, 1], ['SSD', 3, 1], ['GPU', 3, 1], ['BIOS', 4, 2]]),
    ['RAM', 2, 1, { g: 'memory', type: 'acronym' }],
  ],

  programming_languages: PROPER([
    ...W(`Python|1|1|language;Java|1|1|language;JavaScript|1|1;C|2|2|language;C++|2|1;C#|2|1;Ruby|2|2|language;Swift|2|3|language;Go|2|4|language;Rust|2|3|language;
Perl|3|1|language;Kotlin|3|1;Scala|4|2|language;Haskell|4|1;Lisp|3|1;Fortran|3|1;COBOL|3|1;BASIC|2|1|language;Pascal|3|2|language;Ada|4|3|language;Lua|4|2|language;
Dart|3|3|language;R|3|3|language;Julia|3|3|language;Assembly|3|2|language;Scratch|2|2|language;Logo|3|2|language;Prolog|4|1;Erlang|4|1;Elixir|4|2|language;
TypeScript|3|1;Objective-C|4|1;MATLAB|3|1;Smalltalk|4|1;Clojure|4|1;Delphi|4|2|language;Visual Basic|3|1;Bash|3|2|language;Forth|5|2|language;
Zig|5|2|language;OCaml|5|1;F#|5|1;Groovy|4|2|language;Racket|5|2|language;Crystal|5|3|language;Nim|5|2|language`),
    ['Brainfuck', 4, 2, { vulgar: true }],
  ]).concat(ACR([['PHP', 2, 1], ['SQL', 2, 1], ['HTML', 2, 3], ['CSS', 2, 4], ['APL', 5, 1]])),

  coding_words: W(`loop|2|1|programming;variable|2|1|programming;function|2|1|programming;bug|1|1|software;debug|2|1;compile|3|1;syntax|3|1;array|3|1|programming;algorithm|2|1;string|2|2|programming;
integer|3|2;boolean|3|1;class|2|3|programming;object|2|3|programming;method|3|3|programming;parameter|3|2|programming;argument|3|3|programming;constant|3|3|programming;
comment|2|3|programming;conditional|3|2;if statement|2|1;recursion|3|1;iteration|3|2;pointer|3|2|programming;stack|3|3|programming;queue|3|3|programming;syntax error|2|1;
runtime|3|2;library|2|3|programming;framework|3|2;script|2|3|programming;source code|2|1;commit|3|2|programming;branch|2|3|programming;merge|2|3|programming;
repository|3|2;refactor|4|1;boilerplate|4|2;null|3|3;exception|3|3|programming;operator|3|3|programming;inheritance|3|3|programming;polymorphism|4|2;closure|4|3|programming;
callback|4|2;lambda|4|3|programming;hash|3|3|programming;tuple|4|2;dictionary|2|4|programming;code|1|1|programming;coder|1|1;programmer|1|1;
for loop|2|1;while loop|3|1;infinite loop|2|1;compiler|3|1;interpreter|3|3|programming;runtime error|3|1;stack overflow|3|3;spaghetti code|3|1;pseudocode|3|1;
off-by-one|4|1;segfault|5|2;memory leak|3|2;garbage collection|4|2;linked list|3|1;binary tree|3|2;hash table|4|1;parse|3|2`)
    .concat(ACR([['API', 3, 2]])),

  software_words: W(`app|1|1;operating system|1|1;update|1|2;install|1|1;patch|2|2|software;bug|1|2|software;beta|2|2;open source|2|1;freeware|3|1;shareware|3|1;license|2|3|software;
interface|2|2;plugin|2|1;driver|2|2|software;firmware|3|1;widget|2|2;toolbar|2|1;menu|1|3|software;
version|2|2;release|2|3|software;crash|1|2|software;freeze|2|3|software;backup|1|2;spreadsheet|1|1;word processor|2|1;browser|1|2;antivirus|2|2;app store|1|2;extension|2|3|software;
add-on|3|2;launcher|3|2;kernel|3|2|computer;shell|3|3|software;cursor|1|3;download|1|2;upload|1|3;
software|1|1;application|1|2;dashboard|2|3;settings|1|3;preferences|2|3;shortcut|1|3|software;user interface|2|1;wizard|2|4|software;
dialog box|2|1;pop-up|1|2;drop-down menu|2|1;scroll bar|2|1;progress bar|1|2;taskbar|2|1;screensaver|2|2;trial version|2|1;demo|2|3;license key|2|1;
uninstall|2|1;reboot|2|2|computing;virtual machine|3|1;emulator|3|2;patch notes|3|3;changelog|4|2;bloatware|3|1;vaporware|4|2;abandonware|5|2;
cloud storage|2|2;software update|1|1`)
    .concat(ACR([['GUI', 3, 2], ['API', 3, 3], ['SDK', 4, 1], ['IDE', 4, 1]])),

  internet_words: W(`website|1|1;browser|1|1;email|1|1;link|1|2|web;download|1|1;upload|1|1;blog|1|1;hashtag|1|1;meme|1|1;viral|1|2;emoji|1|1;
cookie|2|2|computer;spam|1|2;troll|1|3|internet;online|1|1;offline|1|1;search engine|1|1;homepage|2|1;bookmark|1|2;login|1|1;username|1|1;password|1|2;server|2|2|computer;
streaming|1|1;podcast|1|1;vlog|2|1;selfie|1|2;clickbait|2|1;influencer|1|2;avatar|2|3|internet;bandwidth|3|2;hyperlink|2|1;domain|2|3|internet;tweet|1|2;wiki|2|1;forum|1|2|online;
subscribe|1|2;comment|1|3|internet;like|1|3|internet;feed|1|3|internet;thread|2|3|internet;lurker|3|1;noob|3|1;ghosting|2|3;doomscroll|3|1;catfish|2|3|internet;
emoticon|2|1;livestream|2|1;web page|1|1;web address|2|1;inbox|1|3;attachment|1|2;chat room|2|1;newsfeed|2|1;
dot com|2|1;trending|2|1;going viral|2|2;flame war|3|1;netiquette|4|1`)
    .concat(ACR([['URL', 2, 1], ['GIF', 2, 1], ['LOL', 1, 1], ['BRB', 2, 1], ['FOMO', 3, 1], ['DM', 2, 1], ['OMG', 1, 2], ['AFK', 3, 1], ['ICYMI', 4, 1], ['IMO', 3, 1], ['TBH', 3, 1],
      ['ROFL', 3, 1], ['FYI', 2, 3], ['BTW', 2, 2], ['SMH', 3, 1], ['IRL', 3, 1], ['WWW', 2, 1]]))
    .concat([['WTF', 2, 2, { type: 'acronym', vulgar: true }], ['Wi-Fi', 1, 2, { type: 'proper', tm: true }]]),

  networking: W(`router|2|1|network;modem|2|1;switch|2|2|network;hub|3|2|network;firewall|2|2;IP address|2|1;Ethernet|2|1;packet|3|1;
server|2|2|computer;bandwidth|3|2;proxy|3|2;gateway|3|2;ping|2|2;latency|3|2;protocol|3|2|networking;
access point|3|2;node|3|3|network;subnet|4|2;MAC address|4|2;bridge|3|4|network;repeater|3|2;broadband|2|2;fiber optic|2|3;
host|2|4|network;client|2|4|network;topology|4|2;mesh network|3|2;packet loss|3|2;throughput|4|2;port|3|3|network;
network|1|1|computer;intranet|3|1;extranet|5|2;hotspot|2|2;dial-up|2|2;load balancer|5|2`)
    .concat(ACR([['LAN', 3, 1], ['WAN', 4, 1], ['DNS', 3, 1], ['VPN', 2, 2], ['TCP/IP', 4, 1], ['ISP', 3, 2], ['DHCP', 5, 2], ['VLAN', 5, 2], ['NAT', 5, 2], ['MTU', 5, 3],
      ['DMZ', 5, 3], ['ARP', 5, 3], ['SSID', 5, 2], ['HTTP', 3, 3], ['FTP', 4, 2], ['SMTP', 5, 2], ['TCP', 4, 2], ['UDP', 5, 2]]))
    .concat([['IPv6', 4, 2, { type: 'proper' }], ['IPv4', 4, 2, { type: 'proper' }], ['Wi-Fi', 1, 2, { type: 'proper', tm: true }], ['Bluetooth', 1, 3, { type: 'proper', tm: true }]]),

  file_types: ACR([
    ['PDF', 1, 1], ['JPEG', 2, 1], ['JPG', 1, 1], ['PNG', 2, 1], ['GIF', 2, 1], ['MP3', 1, 1], ['MP4', 1, 1], ['DOCX', 3, 1], ['XLSX', 4, 1], ['PPTX', 4, 1],
    ['TXT', 3, 1], ['HTML', 2, 2], ['CSS', 3, 3], ['ZIP', 2, 2, { g: 'file' }], ['EXE', 3, 1], ['CSV', 4, 1], ['JSON', 4, 2], ['XML', 4, 2], ['WAV', 3, 1],
    ['MOV', 3, 1], ['AVI', 3, 1], ['SVG', 4, 1], ['BMP', 4, 1], ['TIFF', 4, 1], ['RAR', 4, 2], ['ISO', 3, 3], ['DLL', 4, 2], ['APK', 4, 2],
    ['PSD', 4, 1], ['RTF', 4, 1], ['MKV', 4, 1], ['FLAC', 4, 1], ['WEBP', 5, 1], ['HEIC', 5, 1], ['DOC', 2, 1], ['PPT', 3, 1], ['XLS', 3, 1],
    ['MIDI', 3, 2], ['WMV', 4, 1], ['EPUB', 4, 1], ['MPEG', 3, 1],
  ]),

  cybersecurity_words: W(`hacker|1|1;malware|2|1;phishing|2|1;firewall|2|1;password|1|1;encryption|2|1;ransomware|2|1;spyware|2|1;virus|1|1|computer;worm|3|2|computer;trojan|2|2|malware;
botnet|3|1;two-factor|3|1;authentication|3|1;antivirus|2|1;spam|1|3;adware|3|1;keylogger|3|1;backdoor|3|2;exploit|3|2;zero-day|4|1;
social engineering|3|1;brute force|3|2;rootkit|4|1;patch|2|3|software;vulnerability|3|1;breach|2|2;data breach|2|1;penetration test|4|1;white hat|3|2;black hat|3|2;
biometric|2|2;passkey|3|1;token|3|3|security;certificate|3|3|security;sandbox|3|2|security;honeypot|4|1;
identity theft|2|1;scam|1|3;deepfake|3|3;cipher|3|2;decryption|3|1;dark web|2|2;cybercrime|2|1;cyberattack|2|1;hacking|1|1;
security key|3|1;public key|4|2;private key|4|2;digital signature|4|2;man-in-the-middle|4|1;SQL injection|4|1;buffer overflow|5|1;
credential stuffing|5|1;spear phishing|4|1;smishing|5|1;vishing|5|1;script kiddie|4|1;red team|4|2;blue team|4|2;bug bounty|4|1;
threat actor|4|1;insider threat|4|1`)
    .concat([['DDoS', 3, 1, { type: 'proper' }]]).concat(ACR([['VPN', 2, 2], ['CAPTCHA', 2, 2], ['SSL', 4, 2], ['HTTPS', 3, 2], ['MFA', 4, 1]])),
};
