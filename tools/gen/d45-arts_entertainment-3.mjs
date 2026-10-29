// Depth 4+ words: Arts & Entertainment chunk 3 (authors, poets, Shakespeare, classic novel casts, superheroes, magicians, comedians). Format: see tools/apply-words.mjs.
const per = rows => rows.map(([t, r, i, o]) => [t, r, i, { type: 'person', ...o }]);
const ch = rows => rows.map(([t, r, i, o]) => [t, r, i, { type: 'proper', ...o }]);
const hero = rows => rows.map(([t, r, i, o]) => [t, r, i, { type: 'proper', tm: true, ...o }]);

export const THEMES = {
  african_writers: { d: 4 }, japanese_writers: { d: 4 }, latin_american_writers: { d: 4 }, children_s_authors: { d: 2 }, poets: { d: 3 },
  persian_poets: { d: 5 }, shakespeare_characters: { d: 3 }, march_sisters: { d: 3, complete: true }, three_musketeers: { d: 2, complete: true },
  superheroes: { d: 1, tm: true }, superpowers: { d: 1 }, supervillains: { d: 2, tm: true }, famous_magicians: { d: 3 }, comedians: { d: 2 },
};

export const FIXES = [
  { gloss: ['Teller', 'banking_words', 'bank clerk'] }, { gloss: ['bottom', 'body_parts', 'body part'] }, { gloss: ['cheetah', 'big_cats', 'animal'] },
  { gloss: ['viola', 'string_instruments', 'instrument'] }, { gloss: ['penguin', 'birds', 'bird'] }, { gloss: ['robin', 'birds', 'bird'] }, { gloss: ['vulture', 'birds', 'bird'] },
  { gloss: ['lizard', 'lizards', 'reptile'] }, { gloss: ['scarecrow', 'garden', 'field figure'] }, { gloss: ['empathy', 'emotions', 'emotion'] }, { gloss: ['Cyclops', 'mythology', 'myth'] },
  { gloss: ['Macbeth', 'shakespeare_plays', 'play'] }, { gloss: ['mind reading', 'magic_tricks', 'magic trick'] }, { gloss: ['sandman', 'sleep_words', 'folklore'] },
  { gloss: ['attar', 'middle_eastern_scents', 'perfume'] }, { gloss: ['bane', 'blank_berry', 'poison'] }, { gloss: ['cyborg', 'robots', 'robotics'] }, { gloss: ['magnetism', 'forces', 'physics'] },
];

export const DATA = {
  african_writers: per([
    ['Chinua Achebe', 3, 2], ['Wole Soyinka', 3, 3], ['Chimamanda Adichie', 3, 3], ['Nadine Gordimer', 3, 3], ['J. M. Coetzee', 3, 3], ['Alan Paton', 4, 3],
    ['Ngugi wa Thiong\'o', 4, 4, { al: [['Ngũgĩ wa Thiong\'o', 'spelling', 5, 5]] }], ['Naguib Mahfouz', 4, 3], ['Ben Okri', 4, 4], ['Buchi Emecheta', 4, 4], ['Tsitsi Dangarembga', 5, 4],
    ['Mariama Ba', 5, 5, { al: [['Mariama Bâ', 'spelling', 5, 5]] }], ['Camara Laye', 5, 5], ['Ayi Kwei Armah', 5, 5], ['Ama Ata Aidoo', 5, 5], ['Amos Tutuola', 5, 5],
    ['Cyprian Ekwensi', 5, 5], ['Leopold Senghor', 5, 5], ['Assia Djebar', 5, 5], ['Tayeb Salih', 5, 5], ['Nuruddin Farah', 5, 5], ['Abdulrazak Gurnah', 4, 4],
    ['Okot p\'Bitek', 5, 5], ['Athol Fugard', 4, 4], ['Bessie Head', 5, 5], ['Breyten Breytenbach', 5, 5], ['Zakes Mda', 5, 5], ['Teju Cole', 4, 4], ['Helon Habila', 5, 5],
    ['Albert Camus', 2, 5], ['Doris Lessing', 3, 4], ['Nawal El Saadawi', 5, 5],
  ]),
  japanese_writers: per([
    ['Haruki Murakami', 2, 1], ['Yukio Mishima', 3, 2], ['Natsume Soseki', 4, 3, { al: [['Natsume Sōseki', 'spelling', 5, 4]] }], ['Kenzaburo Oe', 4, 3], ['Yasunari Kawabata', 4, 3],
    ['Ryunosuke Akutagawa', 4, 3], ['Osamu Dazai', 4, 3], ['Banana Yoshimoto', 3, 2], ['Junichiro Tanizaki', 4, 3], ['Matsuo Basho', 3, 2, { al: [['Basho', 'synonym', 3, 3]] }],
    ['Murasaki Shikibu', 3, 2], ['Sei Shonagon', 4, 3], ['Ryu Murakami', 4, 3], ['Kobo Abe', 4, 3], ['Fumiko Enchi', 5, 4], ['Shusaku Endo', 4, 4], ['Edogawa Rampo', 5, 4],
    ['Seicho Matsumoto', 5, 4], ['Keigo Higashino', 4, 3], ['Yoko Ogawa', 4, 3], ['Mieko Kawakami', 4, 3], ['Sayaka Murata', 4, 3], ['Hiromi Kawakami', 5, 4],
    ['Kenji Miyazawa', 5, 4], ['Mori Ogai', 5, 4], ['Higuchi Ichiyo', 5, 5], ['Kobayashi Issa', 4, 4], ['Yosa Buson', 5, 5], ['Masaoka Shiki', 5, 5], ['Sawako Ariyoshi', 5, 5],
    ['Natsuo Kirino', 4, 4],
  ]),
  latin_american_writers: per([
    ['Gabriel García Márquez', 3, 2, { al: [['Gabriel Garcia Marquez', 'spelling', 3, 3], ['Gabo', 'synonym', 5, 5]] }], ['Jorge Luis Borges', 3, 2], ['Pablo Neruda', 3, 2], ['Isabel Allende', 3, 2],
    ['Julio Cortázar', 4, 3, { al: [['Julio Cortazar', 'spelling', 4, 4]] }], ['Octavio Paz', 4, 3], ['Mario Vargas Llosa', 4, 3], ['Carlos Fuentes', 4, 3], ['Laura Esquivel', 4, 3],
    ['Roberto Bolaño', 4, 3, { al: [['Roberto Bolano', 'spelling', 4, 4]] }], ['Juan Rulfo', 5, 4], ['Paulo Coelho', 3, 2], ['Clarice Lispector', 4, 4], ['Jorge Amado', 4, 4],
    ['Machado de Assis', 4, 4], ['Gabriela Mistral', 4, 3], ['Horacio Quiroga', 5, 4], ['Ernesto Sabato', 5, 5], ['Manuel Puig', 5, 4], ['José Donoso', 5, 5],
    ['Alejo Carpentier', 5, 5], ['Eduardo Galeano', 4, 4], ['Sor Juana', 5, 4, { al: [['Sor Juana Inés', 'synonym', 5, 5]] }], ['José Martí', 4, 4], ['Rubén Darío', 5, 4], ['César Vallejo', 5, 4],
    ['Elena Poniatowska', 5, 5], ['Mario Benedetti', 5, 5], ['Reinaldo Arenas', 5, 5], ['Guimarães Rosa', 5, 5], ['César Aira', 5, 5], ['Samanta Schweblin', 5, 5],
  ]),
  children_s_authors: per([
    ['Roald Dahl', 1, 1], ['Dr. Seuss', 1, 1, { al: [['Theodor Geisel', 'synonym', 4, 4]] }], ['Beatrix Potter', 2, 2], ['Enid Blyton', 2, 2, { reg: ['UK'] }], ['Judy Blume', 2, 2, { reg: ['US'] }],
    ['A. A. Milne', 3, 2], ['Eric Carle', 2, 2], ['Maurice Sendak', 3, 2], ['Julia Donaldson', 3, 2, { reg: ['UK'] }], ['Jacqueline Wilson', 3, 3, { reg: ['UK'] }],
    ['Lemony Snicket', 2, 2], ['R. L. Stine', 3, 2], ['Shel Silverstein', 3, 3], ['Beverly Cleary', 3, 3], ['E. B. White', 3, 3], ['C. S. Lewis', 2, 3], ['J. K. Rowling', 1, 2],
    ['Michael Morpurgo', 3, 3, { reg: ['UK'] }], ['Dav Pilkey', 3, 3], ['Mo Willems', 3, 3], ['Jeff Kinney', 3, 3], ['Rick Riordan', 3, 3], ['Eoin Colfer', 4, 3],
    ['Philip Pullman', 3, 4], ['David Walliams', 3, 3, { reg: ['UK'] }], ['Astrid Lindgren', 4, 3], ['Mem Fox', 4, 4, { reg: ['AU'] }], ['Margaret Wise Brown', 4, 4],
    ['Laura Ingalls Wilder', 3, 3], ['Richard Scarry', 3, 3], ['Roger Hargreaves', 4, 3, { reg: ['UK'] }], ['Louis Sachar', 4, 4], ['Madeleine L\'Engle', 4, 4], ['Kenneth Grahame', 4, 4],
    ['Lewis Carroll', 2, 3], ['Tomie dePaola', 5, 5], ['Judith Kerr', 4, 4, { reg: ['UK'] }],
  ]),
  poets: per([
    ['William Wordsworth', 3, 2, { al: [['Wordsworth', 'synonym', 3, 3, [], { g: 'poet' }]] }], ['Emily Dickinson', 2, 2], ['Robert Frost', 2, 2], ['Maya Angelou', 2, 2], ['Walt Whitman', 2, 2], ['Edgar Allan Poe', 2, 3],
    ['Sylvia Plath', 3, 2], ['T. S. Eliot', 3, 2], ['W. B. Yeats', 3, 2], ['Lord Byron', 2, 2, { al: [['George Gordon Byron', 'synonym', 5, 5]] }], ['John Keats', 3, 2],
    ['Percy Shelley', 3, 2], ['Alfred Tennyson', 3, 2], ['Robert Burns', 2, 2, { reg: ['UK'] }], ['Langston Hughes', 3, 2], ['Dylan Thomas', 3, 2], ['Seamus Heaney', 3, 2],
    ['Ted Hughes', 3, 3], ['Rupert Brooke', 4, 3], ['Wilfred Owen', 4, 3], ['Geoffrey Chaucer', 3, 3], ['John Milton', 3, 3], ['Alexander Pope', 3, 3], ['Ezra Pound', 4, 3],
    ['Allen Ginsberg', 3, 3], ['Rudyard Kipling', 2, 4], ['Christina Rossetti', 4, 3], ['E. B. Browning', 4, 3], ['Robert Browning', 3, 3],
    ['Samuel Coleridge', 3, 3], ['William Blake', 3, 2], ['Ogden Nash', 4, 4], ['Philip Larkin', 4, 3, { reg: ['UK'] }], ['Carol Ann Duffy', 4, 3, { reg: ['UK'] }],
    ['Pablo Neruda', 3, 3], ['Rabindranath Tagore', 3, 3], ['Charles Bukowski', 4, 4], ['Amanda Gorman', 3, 3], ['Billy Collins', 5, 5],
    ['Wislawa Szymborska', 5, 5], ['Anne Sexton', 5, 5], ['Elizabeth Bishop', 5, 5],
  ]),
  persian_poets: per([
    ['Rumi', 3, 2, { al: [['Jalal ad-Din Rumi', 'synonym', 5, 4]] }], ['Hafez', 4, 3, { al: [['Hafiz', 'spelling', 4, 4]] }],
    ['Omar Khayyam', 3, 2, { al: [['Omar Khayyám', 'spelling', 5, 4]] }], ['Saadi', 5, 4, { al: [['Sa\'di', 'spelling', 5, 5]] }], ['Ferdowsi', 5, 3, { al: [['Firdausi', 'spelling', 5, 5], ['Ferdousi', 'spelling', 5, 5]] }],
    ['Attar', 5, 4, { g: 'poet', al: [['Farid ud-Din Attar', 'synonym', 5, 5]] }], ['Nizami', 5, 4, { al: [['Nizami Ganjavi', 'synonym', 5, 5]] }], ['Jami', 5, 4, { g: 'poet' }],
    ['Sanai', 5, 5], ['Khaqani', 5, 5], ['Sohrab Sepehri', 5, 4], ['Forugh Farrokhzad', 5, 4], ['Nima Yushij', 5, 5], ['Baba Taher', 5, 5], ['Obeid Zakani', 5, 5],
    ['Amir Khusrau', 5, 4, { al: [['Amir Khusro', 'spelling', 5, 5]] }], ['Parvin Etesami', 5, 5], ['Rudaki', 5, 4], ['Manuchehri', 5, 5], ['Anvari', 5, 5], ['Mohammad Shahriar', 5, 5],
    ['Ahmad Shamlou', 5, 5], ['Simin Behbahani', 5, 5], ['Vahshi Bafqi', 5, 5], ['Fakhruddin Iraqi', 5, 5], ['Sheikh Bahai', 5, 5],
  ]),
  shakespeare_characters: ch([
    ['Hamlet', 1, 1, { g: 'prince' }], ['Macbeth', 2, 1, { g: 'character' }], ['Othello', 2, 1, { g: 'character' }], ['Romeo', 1, 1, { g: 'Shakespeare' }], ['Juliet', 1, 1, { g: 'Shakespeare' }],
    ['King Lear', 2, 2], ['Iago', 3, 2], ['Ophelia', 2, 2, { g: 'Hamlet' }], ['Portia', 3, 2], ['Shylock', 3, 2], ['Puck', 3, 2, { g: 'Shakespeare' }], ['Prospero', 3, 2],
    ['Ariel', 2, 3, { g: 'Tempest' }], ['Caliban', 4, 3], ['Falstaff', 3, 2], ['Lady Macbeth', 2, 2], ['Banquo', 4, 3], ['Macduff', 4, 3], ['Titania', 3, 3, { g: 'fairy queen' }],
    ['Oberon', 3, 3, { g: 'fairy king' }], ['Bottom', 3, 3, { g: 'weaver' }], ['Mercutio', 4, 3], ['Tybalt', 4, 3], ['Benedick', 4, 3], ['Beatrice', 3, 3],
    ['Viola', 3, 3, { g: 'Twelfth Night' }], ['Malvolio', 4, 3], ['Rosalind', 4, 3], ['Cordelia', 3, 3], ['Desdemona', 3, 3], ['Horatio', 4, 3], ['Polonius', 4, 3],
    ['Laertes', 4, 3], ['Claudius', 4, 3], ['Gertrude', 3, 3], ['Miranda', 3, 3, { g: 'Tempest' }], ['Petruchio', 5, 4], ['Katherina', 5, 4], ['Hermia', 5, 4], ['Lysander', 5, 4],
    ['Helena', 4, 4, { g: 'Shakespeare' }], ['Jaques', 5, 5], ['Touchstone', 5, 5], ['Feste', 5, 5], ['Coriolanus', 4, 4], ['Titus Andronicus', 5, 4], ['Timon of Athens', 5, 5],
    ['Sir Toby Belch', 5, 4], ['Dogberry', 5, 4], ['Bardolph', 5, 5], ['Prince Hal', 4, 4],
  ]),
  march_sisters: ch([
    ['Meg', 3, 2], ['Jo', 3, 1], ['Beth', 3, 2], ['Amy', 3, 2],
  ]),
  three_musketeers: ch([
    ['Athos', 3, 1], ['Porthos', 3, 1], ['Aramis', 3, 1], ['D\'Artagnan', 3, 2],
  ]),
  superheroes: hero([
    ['Superman', 1, 1, { al: [['Man of Steel', 'synonym', 3, 3], ['Clark Kent', 'synonym', 2, 3, [], { type: 'person' }]] }],
    ['Batman', 1, 1, { al: [['Dark Knight', 'synonym', 3, 3], ['Caped Crusader', 'synonym', 4, 4], ['Bruce Wayne', 'synonym', 2, 3, [], { type: 'person' }]] }],
    ['Wonder Woman', 1, 1], ['Spider-Man', 1, 1, { al: [['Spiderman', 'spelling', 1, 1], ['Spidey', 'synonym', 3, 2], ['Peter Parker', 'synonym', 2, 3, [], { type: 'person' }]] }],
    ['Iron Man', 1, 1, { al: [['Tony Stark', 'synonym', 2, 3, [], { type: 'person' }]] }], ['Captain America', 1, 1], ['Hulk', 1, 1], ['Thor', 1, 2, { g: 'Marvel' }], ['Black Widow', 2, 2, { g: 'Marvel' }], ['Hawkeye', 3, 2, { g: 'Marvel' }],
    ['Flash', 2, 2, { g: 'superhero' }], ['Green Lantern', 2, 2], ['Aquaman', 2, 2], ['Wolverine', 2, 2], ['Cyclops', 3, 3, { g: 'X-Men' }], ['Deadpool', 2, 2], ['Black Panther', 2, 2],
    ['Doctor Strange', 3, 2], ['Ant-Man', 3, 2], ['Daredevil', 3, 2], ['Captain Marvel', 3, 2], ['Supergirl', 2, 2], ['Batgirl', 3, 2], ['Robin', 2, 3, { g: 'sidekick' }],
    ['Green Arrow', 3, 3], ['Shazam', 3, 3], ['Nightwing', 4, 3], ['Cyborg', 3, 3, { g: 'DC' }], ['Martian Manhunter', 4, 3], ['Static Shock', 5, 4], ['Mr. Fantastic', 4, 3],
    ['Invisible Woman', 4, 3], ['Human Torch', 4, 3], ['Silver Surfer', 4, 3], ['Scarlet Witch', 3, 3], ['Star-Lord', 3, 3], ['Rocket Raccoon', 3, 3], ['Hellboy', 3, 3],
    ['Hawkman', 4, 4], ['Plastic Man', 5, 4], ['Blue Beetle', 4, 4], ['Zatanna', 5, 4], ['Mr. Incredible', 3, 3],
  ]),
  superpowers: [
    ['flight', 1, 1, { g: 'superpower' }], ['super strength', 1, 1, { al: [['superhuman strength', 'synonym', 2, 2]] }], ['invisibility', 1, 1], ['x-ray vision', 2, 2], ['telepathy', 2, 2, { al: [['mind reading', 'synonym', 1, 2, [], { g: 'superpower' }]] }],
    ['telekinesis', 2, 2, { al: [['psychokinesis', 'synonym', 4, 4]] }], ['super speed', 1, 1], ['shapeshifting', 2, 2, { al: [['shape-shifting', 'spelling', 2, 2]] }], ['healing factor', 3, 2], ['laser eyes', 1, 1],
    ['heat vision', 2, 2], ['freezing breath', 3, 2], ['teleportation', 2, 2], ['invulnerability', 3, 2], ['force field', 2, 2], ['elasticity', 3, 3, { g: 'superpower' }],
    ['wall crawling', 3, 2], ['super hearing', 2, 2], ['night vision', 2, 3], ['clairvoyance', 3, 3], ['precognition', 4, 3], ['pyrokinesis', 4, 3], ['cryokinesis', 5, 4],
    ['weather control', 2, 2], ['mind control', 1, 2], ['size shifting', 3, 3], ['intangibility', 4, 3], ['phasing', 4, 4, { g: 'superpower' }], ['regeneration', 3, 3, { g: 'superpower' }],
    ['magnetism', 3, 3, { g: 'superpower' }], ['energy blast', 2, 2], ['sonic scream', 3, 3], ['animal communication', 3, 3], ['duplication', 3, 3, { g: 'superpower' }], ['super intelligence', 2, 2],
    ['spider sense', 3, 2], ['electrokinesis', 5, 4], ['hydrokinesis', 5, 4], ['time freezing', 4, 3], ['immortality', 2, 3], ['empathy', 2, 4, { g: 'superpower' }],
  ],
  supervillains: hero([
    ['Joker', 1, 1, { g: 'Batman villain' }], ['Lex Luthor', 2, 2], ['Magneto', 2, 2], ['Green Goblin', 3, 2], ['Doctor Octopus', 3, 2], ['Thanos', 2, 2], ['Loki', 2, 3, { g: 'Marvel' }],
    ['Venom', 2, 2], ['Bane', 3, 2, { g: 'Batman villain' }], ['Penguin', 2, 3, { g: 'Batman villain' }], ['Riddler', 3, 2], ['Catwoman', 2, 2], ['Two-Face', 3, 2], ['Harley Quinn', 2, 2],
    ['Poison Ivy', 3, 2], ['Scarecrow', 2, 3, { g: 'Batman villain' }], ['Mr. Freeze', 3, 2], ['Ultron', 3, 2], ['Red Skull', 3, 2], ['Doctor Doom', 3, 2], ['Galactus', 4, 3],
    ['Mystique', 3, 3], ['Sabretooth', 4, 3], ['Sandman', 3, 3, { g: 'Spider-Man villain' }], ['Kingpin', 3, 3, { g: 'Marvel' }], ['Electro', 3, 3, { g: 'Spider-Man villain' }], ['Mysterio', 4, 3],
    ['Vulture', 2, 3, { g: 'Spider-Man villain' }], ['Darkseid', 4, 3], ['Brainiac', 4, 3], ['General Zod', 3, 2], ['Bizarro', 4, 3], ['Cheetah', 3, 4, { g: 'Wonder Woman villain' }],
    ['Sinestro', 4, 3], ['Black Adam', 4, 3], ['Killer Croc', 4, 3], ['Deathstroke', 4, 3], ['Syndrome', 3, 3], ['Megamind', 3, 3], ['Hela', 4, 3], ['Killmonger', 4, 3],
    ['Ronan', 4, 4, { g: 'Marvel' }], ['Mr. Sinister', 5, 4], ['Apocalypse', 3, 4, { g: 'X-Men' }], ['Lizard', 2, 3, { g: 'Spider-Man villain' }],
  ]),
  famous_magicians: per([
    ['Harry Houdini', 1, 1, { al: [['Houdini', 'synonym', 1, 1, [], { g: 'magician' }], ['Ehrich Weisz', 'synonym', 5, 5]] }],
    ['David Copperfield', 2, 2, { al: [['Copperfield', 'synonym', 3, 3, [], { g: 'magician' }]] }], ['David Blaine', 2, 2], ['Penn Jillette', 3, 3], ['Teller', 3, 3, { g: 'magician' }],
    ['Criss Angel', 3, 2], ['Siegfried and Roy', 3, 2], ['Harry Blackstone', 4, 3], ['Howard Thurston', 4, 3], ['Doug Henning', 4, 3], ['Lance Burton', 4, 3], ['Paul Daniels', 3, 3, { reg: ['UK'] }],
    ['Derren Brown', 3, 3, { reg: ['UK'] }], ['Dynamo', 3, 3, { g: 'magician', reg: ['UK'] }], ['Uri Geller', 3, 3], ['James Randi', 4, 4], ['Chung Ling Soo', 5, 4], ['Harry Kellar', 5, 4],
    ['David Devant', 5, 5], ['Ricky Jay', 4, 4], ['Dai Vernon', 5, 5], ['Mac King', 5, 4], ['Shin Lim', 4, 3], ['Tommy Cooper', 3, 3, { reg: ['UK'] }], ['Harry Anderson', 4, 4],
    ['Cardini', 5, 5], ['Robert-Houdin', 5, 4], ['The Amazing Randi', 4, 4], ['Penn and Teller', 3, 2], ['Lennart Green', 5, 5], ['Jason Latimer', 5, 5], ['Paul Zenon', 5, 5, { reg: ['UK'] }],
    ['Debbie McGee', 4, 5, { reg: ['UK'] }],
  ]),
  comedians: per([
    ['Robin Williams', 1, 1], ['Jerry Seinfeld', 1, 1], ['Eddie Murphy', 1, 1], ['Richard Pryor', 2, 2], ['George Carlin', 2, 2], ['Dave Chappelle', 2, 2], ['Chris Rock', 1, 1],
    ['Kevin Hart', 1, 1], ['Ellen DeGeneres', 1, 2], ['Jim Carrey', 1, 2], ['Steve Martin', 2, 2], ['Bill Murray', 2, 2], ['Billy Connolly', 3, 2, { reg: ['UK'] }], ['Eddie Izzard', 3, 2, { reg: ['UK'] }],
    ['Ricky Gervais', 2, 2, { reg: ['UK'] }], ['Lenny Henry', 3, 3, { reg: ['UK'] }], ['Peter Kay', 3, 2, { reg: ['UK'] }], ['Michael McIntyre', 3, 2, { reg: ['UK'] }], ['Jimmy Carr', 3, 2, { reg: ['UK'] }],
    ['Russell Brand', 2, 3, { reg: ['UK'] }], ['John Cleese', 2, 3], ['Rowan Atkinson', 1, 3], ['Dawn French', 3, 3, { reg: ['UK'] }], ['Victoria Wood', 3, 3, { reg: ['UK'] }],
    ['Bob Hope', 2, 2], ['Charlie Chaplin', 1, 3], ['Buster Keaton', 3, 3], ['Groucho Marx', 2, 3], ['Lucille Ball', 2, 3], ['Joan Rivers', 2, 2], ['Amy Schumer', 2, 2],
    ['Tina Fey', 2, 3], ['Sarah Silverman', 3, 2], ['Bill Burr', 3, 3], ['Jim Gaffigan', 3, 3], ['John Mulaney', 3, 2], ['Hannah Gadsby', 4, 3, { reg: ['AU'] }], ['Tig Notaro', 4, 4],
    ['Mitch Hedberg', 5, 4], ['Rodney Dangerfield', 3, 3], ['Don Rickles', 4, 3], ['Milton Berle', 4, 4], ['Mel Brooks', 3, 3], ['Rik Mayall', 4, 4, { reg: ['UK'] }], ['Spike Milligan', 4, 4, { reg: ['UK'] }],
    ['Ken Dodd', 4, 3, { reg: ['UK'] }], ['Les Dawson', 4, 4, { reg: ['UK'] }], ['Jo Brand', 4, 4, { reg: ['UK'] }], ['Bill Hicks', 4, 4], ['Norm Macdonald', 4, 4], ['Tommy Tiernan', 5, 5, { reg: ['IE'] }],
    ['Dara O Briain', 4, 4, { reg: ['IE', 'UK'], al: [['Dara Ó Briain', 'spelling', 4, 4]] }],
  ]),
};
