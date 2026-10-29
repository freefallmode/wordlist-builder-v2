// Depth-3 words: landmarks (buildings ... parks), landmarks by place, continents and world regions. Format: tools/apply-words.mjs.
// Rows are written compactly as "Name rec inRec" (semicolon separated) and expanded by L(); every entry is a place unless TYPE says otherwise.
// Names that clash with another meaning get a gloss (GL); the entries that already exist for those names are labelled in FIXES.
const GL = { Pantheon: 'Rome', 'Joshua Tree': 'park', 'Abel Tasman': 'park', Badlands: 'park', Australia: 'continent', Moai: 'Easter Island', David: 'statue', Eros: 'statue',
  Arches: 'park', Zion: 'park', Jasper: 'park', Broadway: 'street', Bund: 'waterfront', "Bird's Nest": 'stadium', Amazon: 'river', Memphis: 'ancient city', Olympia: 'Greece',
  Whistler: 'resort', Patagonia: 'region', Rhodes: 'island' };
const FIXES = [
  { gloss: ['Pantheon', 'mythology', 'gods'] }, { gloss: ['Joshua Tree', 'trees', 'tree'] }, { gloss: ['Abel Tasman', 'exploration', 'explorer'] },
  { gloss: ['Badlands', 'landscapes', 'terrain'] }, { gloss: ['Australia', 'countries', 'country'] },
];
export { FIXES };
const TYPE = { MoMA: 'org', 'V&A': 'acronym', MCG: 'acronym', Smithsonian: 'org' };
const SENS = new Set(['Hagia Sophia', 'Tiananmen Square', 'Tahrir Square', 'Atomic Bomb Dome', 'Pearl Harbor', 'Ground Zero', 'Via Dolorosa', 'Holy Sepulchre', 'Mount Sinai', 'Hanging Church',
  "St Catherine's", 'Mount Athos', 'Gallipoli', 'Anzac Cove', 'Church of the Nativity', 'Arlington Cemetery', 'Vietnam Memorial', 'Valley of the Fallen', 'Anne Frank House',
  'Jama Masjid', 'Basilica of Guadalupe', 'Al-Azhar Mosque', 'Meryemana', 'Dome of the Rock', "Solomon's Temple", 'Mount Ararat', 'Hiroshima Peace Park', 'Sumela Monastery',
  "St Peter's Basilica", 'Sistine Chapel', 'Mont Saint-Michel', 'Lalibela', 'Robben Island', 'Port Arthur']);
const TM = new Set(['Cinderella Castle', 'Hobbiton']);
const L = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const m = x.match(/^(.*) (\d) (\d)$/);
  if (!m) throw Error('bad row ' + x);
  const t = m[1], o = { type: TYPE[t] || 'place' };
  if (GL[t]) o.g = GL[t];
  if (SENS.has(t)) o.sens = true;
  if (TM.has(t)) o.tm = true;
  return [t, +m[2], +m[3], o];
});
// a row with aliases: A('Name 2 2', [['Alias', 'synonym', 3, 3], ...])
const A = (s, al) => { const r = L(s)[0]; r[3].al = al; return r; };

export const THEMES = {
  famous_buildings: { d: 2 }, famous_bridges: { d: 2 }, famous_towers: { d: 2 }, famous_statues: { d: 2 }, famous_palaces: { d: 2 }, famous_castles: { d: 2 },
  ancient_wonders: { d: 2 }, famous_squares: { d: 3 }, famous_streets: { d: 3 }, famous_museums: { d: 2 }, famous_temples: { d: 3 }, famous_mosques: { d: 3 },
  famous_churches: { d: 3 }, famous_parks: { d: 2 }, turkish_landmarks: { d: 4 }, egyptian_landmarks: { d: 2 }, african_landmarks: { d: 3 }, indian_landmarks: { d: 3 },
  chinese_landmarks: { d: 2 }, japanese_landmarks: { d: 2 }, australian_landmarks: { d: 2 }, new_zealand_landmarks: { d: 3 }, south_american_landmarks: { d: 3 },
  mexican_landmarks: { d: 3 }, us_landmarks: { d: 1 }, canadian_landmarks: { d: 3 }, greek_landmarks: { d: 2 }, spanish_landmarks: { d: 3 },
  continents_and_supercontinents: { d: 1 }, world_regions: { d: 3 },
};

export const DATA = {
  famous_buildings: L(`Empire State Building 1 1; White House 1 1; Colosseum 1 1; Sydney Opera House 1 1; Burj Khalifa 1 1; Pentagon 1 1; Taj Mahal 1 2; Kremlin 2 2; Parthenon 2 2; Pantheon 2 2;
      Hagia Sophia 2 2; Chrysler Building 3 2; Flatiron Building 3 3; Petronas Towers 3 3; Taipei 101 3 3; Sagrada Familia 3 3; Reichstag 3 3; Burj Al Arab 3 3; Rockefeller Center 3 3;
      Louvre Pyramid 3 4; US Capitol 2 2; Lotus Temple 4 4; Willis Tower 4 3; Fallingwater 4 4; Marina Bay Sands 4 4; Bundestag 4 4; Guggenheim Bilbao 4 4; Casa Batllo 5 5;
      Villa Savoye 5 5; Seagram Building 5 5; CCTV Headquarters 5 5; Lloyd's Building 5 5; The Shard 3 3; The Gherkin 3 3`),
  famous_bridges: L(`Golden Gate Bridge 1 1; Brooklyn Bridge 1 1; Tower Bridge 1 1; London Bridge 1 1; Sydney Harbour Bridge 2 2; Rialto Bridge 2 2; Bridge of Sighs 3 3; Ponte Vecchio 3 3;
    Charles Bridge 3 3; Forth Bridge 3 3; Rainbow Bridge 3 3; Pont Neuf 3 3; Millennium Bridge 3 3; Iron Bridge 3 3; Millau Viaduct 4 4; Humber Bridge 4 4; Akashi Kaikyo Bridge 5 5;
    Bosphorus Bridge 4 4; Stari Most 4 4; Pont du Gard 4 4; Chain Bridge 4 4; Oresund Bridge 4 4; Verrazzano Bridge 4 4; Severn Bridge 4 4; Mackinac Bridge 4 4;
    Tacoma Narrows Bridge 4 4; Kwai Bridge 4 4; Sunshine Skyway 5 5; Royal Gorge Bridge 5 5; Vasco da Gama Bridge 5 5; Helix Bridge 5 5`),
  famous_towers: L(`Eiffel Tower 1 1; Leaning Tower of Pisa 1 1; Big Ben 1 1; CN Tower 2 2; Space Needle 2 2; Tower of London 2 2; Tower of Babel 2 2; Tokyo Tower 3 3; Tokyo Skytree 3 3;
    Blackpool Tower 3 3; Shanghai Tower 3 3; Petronas Towers 3 3; Trump Tower 3 3; Galata Tower 3 3; Elizabeth Tower 3 3; Willis Tower 3 3; Sears Tower 3 3; Oriental Pearl Tower 4 4;
    Canton Tower 4 4; Stratosphere Tower 4 4; Berlin TV Tower 4 4; Fernsehturm 4 4; Sky Tower 4 4; Maiden's Tower 4 4; Belem Tower 4 4; Ostankino Tower 4 4; Calgary Tower 5 5;
    Azadi Tower 5 5; Torre del Oro 5 5; Giralda 5 5; Victoria Tower 5 5; Hancock Tower 5 5; Jin Mao Tower 5 5; Lotte World Tower 5 5; Macau Tower 5 5`),
  famous_statues: L(`Statue of Liberty 1 1; Christ the Redeemer 1 1; David 1 2; Venus de Milo 2 2; The Thinker 2 2; Little Mermaid 2 2; Great Sphinx 2 2; Terracotta Army 2 3; Colossus of Rhodes 3 3;
    Moai 3 3; Manneken Pis 3 3; Pieta 3 3; Great Buddha 3 3; Charging Bull 3 3; Fearless Girl 3 3; Angel of the North 3 3; Nelson's Column 3 3; Eros 3 3; Cloud Gate 3 3;
    Statue of Zeus 3 3; Winged Victory 4 4; Discobolus 4 4; Kelpies 4 4; Bronze Horseman 4 4; Statue of Unity 4 4; Nefertiti Bust 4 4; Venus of Willendorf 4 4; Laocoon 5 5;
    Motherland Calls 5 5; Spring Temple Buddha 5 5; Leshan Giant Buddha 5 5; Lion of Lucerne 5 5; Gates of Hell 5 5; Chacmool 5 5`),
  famous_palaces: L(`Buckingham Palace 1 1; Versailles 1 2; Kensington Palace 2 2; Forbidden City 2 3; Winter Palace 3 3; Alhambra 3 3; Topkapi Palace 3 3; Potala Palace 3 3; Palace of Westminster 3 3;
    Blenheim Palace 3 3; Hampton Court 3 3; Grand Palace 3 3; Holyrood Palace 3 3; Schonbrunn Palace 4 4; Hofburg 4 4; Dolmabahce Palace 4 4; Mysore Palace 4 4; Peterhof 4 4;
    Catherine Palace 4 4; Sanssouci 4 4; Palacio Real 4 4; Palace of Knossos 4 4; Pena Palace 4 4; Alcazar 4 4; Fontainebleau 4 4; Royal Pavilion 4 4; Hawa Mahal 4 4;
    Elysee Palace 4 4; Sandringham 4 4; Gyeongbokgung 5 5; Linderhof 5 5; Herrenchiemsee 5 5; Ajuda Palace 5 5; Palazzo Pitti 5 5; Diocletian's Palace 5 5; Umaid Bhawan Palace 5 5; Tuileries 5 5`),
  famous_castles: L(`Windsor Castle 1 1; Neuschwanstein 2 2; Edinburgh Castle 2 2; Cinderella Castle 3 3; Bran Castle 3 3; Himeji Castle 3 3; Warwick Castle 3 3; Dover Castle 3 3; Balmoral 3 3;
    Prague Castle 3 3; Osaka Castle 3 3; Blarney Castle 3 3; Caernarfon Castle 4 4; Stirling Castle 4 4; Eilean Donan 4 4; Alnwick Castle 4 4; Leeds Castle 4 4; Bodiam Castle 4 4; Tintagel 4 4;
    Chambord 4 4; Matsumoto Castle 4 4; Kronborg 4 4; Heidelberg Castle 4 4; Urquhart Castle 4 4; Chateau d'If 4 4; Hohenzollern Castle 5 5; Chenonceau 5 5; Conwy Castle 5 5;
    Corfe Castle 5 5; Malbork 5 5; Krak des Chevaliers 5 5; Sforza Castle 5 5; Wartburg 5 5; Hohensalzburg 5 5; Trakai 5 5; Dunnottar 5 5; Harlech Castle 5 5`),
  ancient_wonders: [
    A('Great Pyramid of Giza 1 1', [['Pyramid of Khufu', 'synonym', 4, 4], ['Pyramid of Cheops', 'synonym', 5, 5]]),
    ...L(`Pyramids of Giza 1 1; Taj Mahal 1 3; Great Wall of China 1 3; Machu Picchu 1 3; Christ the Redeemer 1 3; Colosseum 1 3; Petra 2 3; Chichen Itza 2 3; Colossus of Rhodes 2 2;
      Hanging Gardens 2 2; Statue of Zeus 3 3`),
    A('Temple of Artemis 3 3', [['Temple of Diana', 'synonym', 4, 4]]),
    A('Pharos of Alexandria 4 3', [['Alexandria Lighthouse', 'synonym', 3, 3], ['Pharos', 'short form', 4, 4]]),
    A('Mausoleum of Mausolus 4 3', [['Tomb of Mausolus', 'synonym', 4, 4]]),
  ],
  famous_squares: L(`Times Square 1 1; Red Square 1 1; Trafalgar Square 1 1; Tiananmen Square 2 2; St Peter's Square 2 2; Piccadilly Circus 2 3; Leicester Square 2 2; Place de la Concorde 3 3;
    Wenceslas Square 3 3; Plaza Mayor 3 3; Piazza San Marco 3 3; Washington Square 3 3; Union Square 3 3; Tahrir Square 3 3; Taksim Square 3 3; Alexanderplatz 3 3; Zocalo 4 4;
    Grand Place 4 4; Dam Square 4 4; Marienplatz 4 4; Palace Square 4 4; Piazza Navona 4 4; Plaza de Mayo 4 4; Plaza de Espana 4 4; Place Vendome 4 4; Syntagma Square 4 4;
    Madison Square 4 4; Harvard Square 4 4; Jemaa el-Fnaa 5 5; Maidan Nezalezhnosti 5 5; Heldenplatz 5 5; Piazza del Popolo 5 5; Rynek Glowny 5 5; Place des Vosges 5 5;
    Imam Square 5 5; Registan 5 5; Federation Square 5 5; Sukhbaatar Square 5 5`),
  famous_streets: L(`Broadway 1 1; Wall Street 1 1; Fifth Avenue 1 1; Champs-Elysees 2 2; Oxford Street 2 2; Abbey Road 2 2; Baker Street 2 2; Downing Street 2 2; Rodeo Drive 2 2;
    Hollywood Boulevard 2 2; Sunset Boulevard 2 2; Madison Avenue 2 2; Park Avenue 2 2; Pennsylvania Avenue 2 2; Route 66 2 2; Penny Lane 2 2; Carnaby Street 3 3; Regent Street 3 3;
    Bourbon Street 3 3; Lombard Street 3 3; Las Ramblas 3 3; Savile Row 3 3; Fleet Street 3 3; Bond Street 3 3; Portobello Road 3 3; Brick Lane 3 3; Royal Mile 3 3; Orchard Road 3 3;
    Rue de Rivoli 3 3; Harley Street 4 4; Istiklal Avenue 4 4; Appian Way 3 3; Nevsky Prospect 4 4; Unter den Linden 4 4; Nathan Road 4 4; Khao San Road 4 4; Bleecker Street 4 4;
    Beale Street 4 4; Grafton Street 4 4; Via Veneto 4 4; Via Dolorosa 4 4; Kurfurstendamm 5 5; Rue Mouffetard 5 5; Via Condotti 5 5`),
  famous_museums: L(`Louvre 1 1; British Museum 1 1; Metropolitan Museum 2 2; Smithsonian 2 2; Guggenheim 2 2; Hermitage 2 2; Prado 2 2; Tate Modern 2 2; Natural History Museum 2 2; Science Museum 2 2;
    National Gallery 2 2; Uffizi 3 3; Vatican Museums 3 3; MoMA 3 3; V&A 3 3; Rijksmuseum 3 3; Van Gogh Museum 3 3; Egyptian Museum 3 3; Getty Museum 3 3; Musee d'Orsay 3 3;
    Centre Pompidou 3 3; Anne Frank House 3 3; Air and Space Museum 3 3; Pergamon Museum 4 4; Acropolis Museum 4 4; Tate Britain 4 4; Ashmolean 4 4; Louvre Abu Dhabi 4 4; Reina Sofia 4 4;
    Whitney Museum 4 4; Field Museum 4 4; Exploratorium 4 4; Te Papa 4 4; Deutsches Museum 4 4; Imperial War Museum 4 4; Fitzwilliam Museum 5 5; Hunterian 5 5; Mauritshuis 5 5;
    Pitt Rivers 5 5; Teylers 5 5; Tretyakov Gallery 5 5; Capitoline Museums 5 5`),
  famous_temples: [
    ...L(`Angkor Wat 1 1; Parthenon 1 1; Golden Temple 2 2; Pantheon 2 3; Borobudur 3 3; Karnak 3 3; Temple of Heaven 3 3; Luxor Temple 3 3; Abu Simbel 3 3; Wat Arun 3 3; Lotus Temple 3 3;
      Shaolin Temple 3 3; Tiger's Nest 3 3; Temple of Artemis 3 3; Shwedagon Pagoda 4 4; Wat Pho 4 4; Meenakshi Temple 4 4; Fushimi Inari 4 4; Senso-ji 4 4; Todai-ji 4 4; Ise Shrine 4 4;
      Akshardham 4 4; Konark Sun Temple 4 4; Prambanan 4 4; Temple of Apollo 4 4; Temple of Poseidon 4 4; Templo Mayor 4 4; Temple of Hatshepsut 4 4; Edfu 4 4; Philae 4 4; Wat Phra Kaew 4 4;
      White Temple 4 4; Itsukushima 5 5; Erechtheion 5 5; Temple of Olympian Zeus 5 5; Maison Carree 5 5; Temple of Kukulkan 5 5; Bayon 5 5; Preah Vihear 5 5; Jokhang Temple 5 5;
      Swayambhunath 5 5; Boudhanath 5 5; Brihadeeswarar 5 5; Dendera 5 5; Kom Ombo 5 5`),
    A('Kinkaku-ji 3 3', [['Golden Pavilion', 'synonym', 3, 3]]),
  ],
  famous_mosques: [
    ...L(`Hagia Sophia 2 3; Blue Mosque 2 2; Al-Aqsa Mosque 2 2; Dome of the Rock 2 3; Prophet's Mosque 3 3; Sheikh Zayed Mosque 3 3; Jama Masjid 3 3; Hassan II Mosque 4 4; Umayyad Mosque 4 4;
      Suleymaniye Mosque 4 4; Badshahi Mosque 4 4; Faisal Mosque 4 4; Al-Azhar Mosque 4 4; Djenne Mosque 4 4; Masjid al-Haram 3 3; Selimiye Mosque 5 5; Istiqlal Mosque 5 5;
      Mosque of Muhammad Ali 5 5; Ibn Tulun Mosque 5 5; Kairouan Mosque 5 5; Putra Mosque 5 5; Shah Mosque 5 5; Nasir al-Mulk 5 5; Quba Mosque 5 5; Wazir Khan Mosque 5 5; Kul Sharif 5 5`),
    A('Great Mosque of Cordoba 4 4', [['Mezquita', 'synonym', 3, 3]]),
  ],
  famous_churches: L(`Notre-Dame 1 1; Westminster Abbey 1 1; St Peter's Basilica 2 2; Sagrada Familia 2 2; St Paul's Cathedral 2 2; Canterbury Cathedral 2 2; Sistine Chapel 2 3; Hagia Sophia 2 3;
    St Basil's Cathedral 2 2; Duomo 3 3; Chartres Cathedral 3 3; Cologne Cathedral 3 3; St Mark's Basilica 3 3; Milan Cathedral 3 3; Sacre-Coeur 3 3; York Minster 3 3; Salisbury Cathedral 3 3;
    Mont Saint-Michel 3 3; St Patrick's Cathedral 3 3; Church of the Nativity 3 3; Holy Sepulchre 3 3; Reims Cathedral 4 4; Durham Cathedral 4 4; Lincoln Cathedral 4 4;
    Winchester Cathedral 4 4; Westminster Cathedral 4 4; Sainte-Chapelle 4 4; Bath Abbey 4 4; Tintern Abbey 4 4; Whitby Abbey 4 4; Basilica of Guadalupe 4 4; Seville Cathedral 4 4;
    St Stephen's Cathedral 4 4; Frauenkirche 4 4; Lalibela 4 4; Ely Cathedral 5 5; Wells Cathedral 5 5; Liverpool Cathedral 5 5; Fountains Abbey 5 5; Rievaulx Abbey 5 5; Melk Abbey 5 5;
    Monreale 5 5; Stephansdom 5 5; Hallgrimskirkja 5 5; Kazan Cathedral 5 5`),
  famous_parks: L(`Central Park 1 1; Hyde Park 1 1; Yellowstone 1 2; Yosemite 2 2; Regent's Park 3 3; St James's Park 3 3; Richmond Park 3 3; Kensington Gardens 3 3; Golden Gate Park 3 3;
    Tiergarten 3 3; Tivoli Gardens 3 3; Gardens by the Bay 3 3; Kew Gardens 3 3; Serengeti 3 3; Banff 3 3; Glacier National Park 3 3; Zion 3 3; Everglades 3 3; Joshua Tree 3 3;
    Death Valley 3 3; Green Park 4 4; Phoenix Park 4 4; Griffith Park 4 4; Prospect Park 4 4; Bois de Boulogne 4 4; Luxembourg Gardens 4 4; Retiro Park 4 4; English Garden 4 4;
    Vondelpark 4 4; Yoyogi Park 4 4; Ueno Park 4 4; Stanley Park 4 4; Chapultepec 4 4; Grand Teton 4 4; Great Smoky Mountains 4 4; Denali 4 4; Acadia 4 4; Arches 4 4;
    Centennial Park 5 5; Tuileries Garden 5 5`),
  turkish_landmarks: L(`Cappadocia 2 2; Troy 2 2; Pamukkale 3 3; Ephesus 3 3; Fairy Chimneys 3 3; Dardanelles 3 3; Gallipoli 3 3; Mount Nemrut 4 4; Mount Ararat 3 3; Gobekli Tepe 4 4; Sumela Monastery 4 4;
      Hierapolis 4 4; Pergamon 4 4; Anitkabir 4 4; Library of Celsus 4 4; Lake Van 4 4; Goreme 4 4; Derinkuyu 4 4; Halicarnassus 4 4; Oludeniz 4 4; Anzac Cove 4 4; Aspendos 5 5;
      Safranbolu 5 5; Akdamar Island 5 5; Hasankeyf 5 5; Kaymakli 5 5; Uchisar 5 5; Ihlara Valley 5 5; Termessos 5 5; Xanthos 5 5; Myra 5 5; Meryemana 5 5; Bodrum Castle 5 5`),
  egyptian_landmarks: L(`Great Pyramid of Giza 1 1; Pyramids of Giza 1 1; Great Sphinx 1 1; Nile 1 2; Valley of the Kings 2 2; Abu Simbel 2 2; Suez Canal 2 2; Karnak 3 3; Luxor Temple 3 3; Saqqara 3 3;
    Step Pyramid 3 3; Giza 2 2; Egyptian Museum 3 3; Aswan High Dam 4 4; Bent Pyramid 4 4; Dahshur 4 4; Philae 4 4; Edfu 4 4; Valley of the Queens 4 4; Colossi of Memnon 4 4; Siwa Oasis 4 4;
    Khan el-Khalili 4 4; Mount Sinai 3 3; Temple of Hatshepsut 4 4; Citadel of Saladin 4 4; Cairo Tower 4 4; Red Pyramid 5 5; Kom Ombo 5 5; Dendera 5 5; Deir el-Bahri 5 5; Abydos 5 5;
    Hanging Church 5 5; Medinet Habu 5 5; Ramesseum 5 5; Memphis 4 4; St Catherine's 4 4; Tutankhamun's Tomb 3 3`),
  african_landmarks: L(`Kilimanjaro 1 1; Victoria Falls 2 2; Table Mountain 2 2; Timbuktu 2 2; Sahara 1 2; Cape of Good Hope 2 2; Robben Island 2 2; Zanzibar 2 3; Kruger National Park 3 3; Mount Kenya 3 3;
    Ngorongoro Crater 3 3; Okavango Delta 3 3; Lake Victoria 3 3; Masai Mara 3 3; Atlas Mountains 3 3; Etosha 4 4; Namib Desert 4 4; Drakensberg 4 4; Lalibela 4 4; Great Zimbabwe 4 4;
    Amboseli 4 4; Lake Malawi 4 4; Chefchaouen 4 4; Cape Point 4 4; Soweto 4 4; Mount Cameroon 5 5; Sossusvlei 5 5; Fish River Canyon 5 5; Blyde River Canyon 5 5; Simien Mountains 5 5;
    Danakil Depression 5 5; Mount Nyiragongo 5 5; Virunga 5 5; Bwindi 5 5; Lake Nakuru 5 5; Meroe 5 5; Axum 5 5; Ouarzazate 5 5; Lion's Head 5 5; Kirstenbosch 5 5`),
  indian_landmarks: L(`Taj Mahal 1 1; Red Fort 2 2; India Gate 2 2; Golden Temple 2 2; Ganges 2 2; Qutub Minar 3 3; Gateway of India 3 3; Hawa Mahal 3 3; Charminar 3 3; Lotus Temple 3 3; Jama Masjid 3 3;
    Agra Fort 3 3; Varanasi 3 3; Amber Fort 4 4; Jaisalmer Fort 4 4; Mysore Palace 4 4; Golconda Fort 4 4; Ajanta Caves 4 4; Ellora Caves 4 4; Khajuraho 4 4; Konark Sun Temple 4 4; Hampi 4 4;
    Sanchi Stupa 4 4; Akshardham 4 4; Fatehpur Sikri 4 4; Humayun's Tomb 4 4; Victoria Memorial 4 4; Howrah Bridge 4 4; Kanchenjunga 4 4; Dal Lake 4 4; Meenakshi Temple 4 4;
    Statue of Unity 4 4; Marine Drive 4 4; Rann of Kutch 5 5; Sundarbans 5 5; Kaziranga 5 5; Lake Pichola 5 5; Udaipur City Palace 5 5; Mahabodhi Temple 5 5; Sabarmati Ashram 5 5;
    Rashtrapati Bhavan 5 5; Jantar Mantar 5 5; Elephanta Caves 5 5; Ranthambore 5 5`),
  chinese_landmarks: L(`Great Wall of China 1 1; Forbidden City 2 2; Terracotta Army 2 2; Tiananmen Square 2 2; Yangtze 2 3; Temple of Heaven 3 3; Summer Palace 3 3; Potala Palace 3 3; Oriental Pearl Tower 3 3;
    Three Gorges Dam 3 3; Shaolin Temple 3 3; Victoria Peak 3 3; Bird's Nest 3 3; Bund 4 4; Li River 4 4; Huangshan 5 5; Zhangjiajie 4 4; West Lake 4 4; Tian Tan Buddha 4 4; Canton Tower 4 4;
    Lijiang 4 4; Ming Tombs 4 4; Pearl River 4 4; Leshan Giant Buddha 5 5; Longmen Grottoes 5 5; Mogao Caves 5 5; Lingyin Temple 5 5; Jiuzhaigou 5 5; Mount Tai 5 5; Mount Emei 5 5;
    Lama Temple 5 5; Water Cube 5 5; Stone Forest 5 5; Yungang Grottoes 5 5; Hanging Temple 5 5; Wuyi Mountains 5 5; Dazu Rock Carvings 5 5`),
  japanese_landmarks: [
    ...L(`Mount Fuji 1 1; Tokyo Tower 2 2; Shibuya Crossing 2 2; Tokyo Skytree 3 3; Fushimi Inari 3 3; Himeji Castle 3 3; Osaka Castle 3 3; Senso-ji 3 3; Meiji Shrine 3 3; Atomic Bomb Dome 3 3;
      Imperial Palace 3 3; Akihabara 3 3; Rainbow Bridge 3 3; Itsukushima 4 4; Todai-ji 4 4; Kiyomizu-dera 4 4; Nijo Castle 4 4; Arashiyama 4 4; Nara Park 4 4; Kamakura Buddha 4 4;
      Tsukiji 4 4; Dotonbori 4 4; Matsumoto Castle 4 4; Hakone 4 4; Hiroshima Peace Park 4 4; Kabukicho 5 5; Mount Aso 5 5; Shirakawa-go 5 5; Toshogu 5 5; Kegon Falls 5 5;
      Lake Biwa 5 5; Lake Ashi 5 5; Sapporo Clock Tower 5 5; Naoshima 5 5; Koyasan 5 5; Yakushima 5 5; Jigokudani 5 5`),
    A('Kinkaku-ji 3 3', [['Golden Pavilion', 'synonym', 3, 3]]),
    A('Ginkaku-ji 4 4', [['Silver Pavilion', 'synonym', 4, 4]]),
  ],
  australian_landmarks: [
    ...L(`Sydney Opera House 1 1; Great Barrier Reef 1 1; Sydney Harbour Bridge 2 2; Bondi Beach 2 2; Twelve Apostles 3 3; Kakadu 3 3; Blue Mountains 3 3; Great Ocean Road 3 3;
      Whitsunday Islands 3 3; Fraser Island 3 3; Kangaroo Island 3 3; Murray River 3 3; Daintree 4 4; Cradle Mountain 4 4; Wineglass Bay 4 4; Port Arthur 4 4; Bungle Bungles 4 4;
      Ningaloo Reef 4 4; Shark Bay 4 4; Wave Rock 4 4; Nullarbor Plain 4 4; Lake Eyre 4 4; Rottnest Island 4 4; Sydney Tower 4 4; Coober Pedy 4 4; Devils Marbles 4 4; Kings Canyon 4 4;
      Taronga Zoo 4 4; Big Banana 4 4; MCG 4 4; Federation Square 5 5; Karijini 5 5; Lake Hillier 5 5; Flinders Ranges 5 5; Queen Victoria Market 5 5; Eureka Tower 5 5; Big Pineapple 5 5`),
    A('Uluru 1 1', [['Ayers Rock', 'synonym', 2, 2]]),
    A('Kata Tjuta 4 4', [['The Olgas', 'synonym', 4, 4]]),
  ],
  new_zealand_landmarks: [
    ...L(`Milford Sound 2 2; Queenstown 2 2; Sky Tower 3 3; Hobbiton 3 3; Lake Taupo 3 3; Rotorua 3 3; Tongariro 3 3; Fiordland 3 3; Franz Josef Glacier 3 3; Waitomo Caves 3 3;
      Bay of Islands 3 3; Fox Glacier 4 4; Abel Tasman 4 4; Mount Ruapehu 4 4; Cape Reinga 4 4; Ninety Mile Beach 4 4; Lake Wakatipu 4 4; Lake Tekapo 4 4; Waiheke Island 4 4;
      Stewart Island 4 4; Rangitoto 4 4; White Island 4 4; Hot Water Beach 4 4; Cathedral Cove 4 4; Doubtful Sound 4 4; Mount Maunganui 4 4; Kaikoura 4 4; Te Papa 4 4;
      Moeraki Boulders 5 5; Wai-O-Tapu 5 5; Lake Pukaki 5 5; Marlborough Sounds 5 5; Mitre Peak 5 5; Waitangi 5 5; Larnach Castle 5 5; Arthur's Pass 5 5`),
    A('Mount Cook 3 3', [['Aoraki', 'synonym', 4, 4]]),
    A('Mount Taranaki 4 4', [['Mount Egmont', 'synonym', 5, 5]]),
  ],
  south_american_landmarks: L(`Machu Picchu 1 1; Christ the Redeemer 1 1; Amazon 1 2; Andes 2 2; Galapagos Islands 2 2; Easter Island 2 2; Copacabana 2 2; Iguazu Falls 3 3; Angel Falls 3 3;
    Sugarloaf Mountain 3 3; Ipanema 3 3; Lake Titicaca 3 3; Nazca Lines 3 3; Patagonia 2 3; Atacama Desert 3 3; Aconcagua 3 3; Tierra del Fuego 3 3; Cape Horn 3 3; Moai 3 3;
    Salar de Uyuni 4 4; Sacred Valley 4 4; Torres del Paine 4 4; Perito Moreno 4 4; Cotopaxi 4 4; Pantanal 4 4; Maracana 4 4; La Boca 4 4; Sacsayhuaman 5 5; Cerro Rico 5 5;
    Chimborazo 5 5; Mount Roraima 5 5; Mitad del Mundo 5 5; Recoleta Cemetery 5 5; Choquequirao 5 5; Chan Chan 5 5; Kuelap 5 5; Tayrona 5 5; Rainbow Mountain 5 5; Colca Canyon 5 5`),
  mexican_landmarks: L(`Chichen Itza 1 1; Teotihuacan 2 2; Tulum 3 3; Zocalo 3 3; Angel of Independence 3 3; Pyramid of the Sun 3 3; Popocatepetl 3 3; Cabo San Lucas 3 3; Cozumel 3 3; Playa del Carmen 3 3;
    Palenque 4 4; Monte Alban 4 4; Uxmal 4 4; Copper Canyon 4 4; Templo Mayor 4 4; Chapultepec Castle 4 4; Casa Azul 4 4; Pyramid of the Moon 4 4; El Castillo 4 4; Guanajuato 4 4;
    Xochimilco 4 4; Bellas Artes 4 4; Isla Mujeres 4 4; Basilica of Guadalupe 4 4; Sumidero Canyon 5 5; Iztaccihuatl 5 5; Pico de Orizaba 5 5; Paricutin 5 5; Hierve el Agua 5 5;
    Mexico City Cathedral 5 5; Calakmul 5 5; Coba 5 5; El Tajin 5 5; Mitla 5 5; Lake Chapala 5 5; Sian Ka'an 5 5; Xcaret 5 5`),
  us_landmarks: L(`Statue of Liberty 1 1; Grand Canyon 1 1; Mount Rushmore 1 1; Golden Gate Bridge 1 1; White House 1 1; Empire State Building 1 1; Niagara Falls 1 2; Central Park 1 1;
    Hollywood Sign 2 2; Lincoln Memorial 2 2; Washington Monument 2 2; Liberty Bell 2 2; Alcatraz 2 2; Space Needle 2 2; Hoover Dam 2 2; Gateway Arch 2 2; Brooklyn Bridge 2 3;
    Times Square 2 2; US Capitol 2 2; Pentagon 2 2; Ellis Island 2 2; Yellowstone 2 2; Yosemite 2 2; Alamo 2 2; Independence Hall 3 3; Old Faithful 3 3; Monument Valley 3 3;
    Mount St Helens 3 3; Pearl Harbor 3 3; Ground Zero 3 3; Graceland 3 3; Fort Knox 3 3; Area 51 3 3; Route 66 3 3; Las Vegas Strip 3 3; Jefferson Memorial 3 3; Arlington Cemetery 3 3;
    Everglades 3 3; Cape Canaveral 3 3; Kennedy Space Center 3 3; Venice Beach 3 3; Walk of Fame 3 3; Rockefeller Center 3 3; Grand Central Terminal 3 3; Death Valley 3 3;
    Antelope Canyon 4 4; Bryce Canyon 4 4; Devils Tower 4 4; Crater Lake 4 4; Mount Whitney 4 4; Mount Vernon 4 4; Monticello 4 4; Hearst Castle 4 4; Biltmore Estate 4 4;
    Vietnam Memorial 4 4; Carlsbad Caverns 4 4; Mammoth Cave 4 4; Horseshoe Bend 4 4; Badlands 4 4; Sedona 4 4; Fisherman's Wharf 4 4; Santa Monica Pier 4 4; Griffith Observatory 4 4;
    Four Corners 5 5; Glacier Bay 5 5; Navy Pier 5 5; Pier 39 5 5`),
  canadian_landmarks: L(`CN Tower 1 1; Niagara Falls 2 2; Rocky Mountains 2 2; Banff 3 3; Lake Louise 3 3; Parliament Hill 3 3; Bay of Fundy 3 3; Stanley Park 3 3; Whistler 3 3; Jasper 3 3;
    Hudson Bay 3 3; Chateau Frontenac 4 4; Peggy's Cove 4 4; Cabot Trail 4 4; Butchart Gardens 4 4; Capilano Bridge 4 4; Mount Royal 4 4; Old Montreal 4 4; Rideau Canal 4 4;
    Algonquin Park 4 4; Drumheller 4 4; West Edmonton Mall 4 4; Klondike 4 4; Casa Loma 4 4; Moraine Lake 4 4; Thousand Islands 4 4; Hopewell Rocks 5 5; Fort Henry 5 5; Gros Morne 5 5;
    Perce Rock 5 5; Great Bear Rainforest 5 5; Toronto Islands 5 5; Athabasca Glacier 5 5; Columbia Icefield 5 5; L'Anse aux Meadows 5 5; Signal Hill 5 5; Notre-Dame Basilica 5 5`),
  greek_landmarks: L(`Acropolis 1 1; Parthenon 1 1; Mount Olympus 2 2; Delphi 2 2; Santorini 2 2; Mykonos 2 3; Rhodes 2 3; Meteora 3 3; Olympia 3 3; Knossos 3 3; Mycenae 3 3;
    Thermopylae 3 3; Ancient Agora 3 3; Epidaurus 4 4; Corinth Canal 4 4; Delos 4 4; Erechtheion 4 4; Panathenaic Stadium 4 4; Temple of Poseidon 4 4; Sounion 4 4; Plaka 4 4; Lycabettus 4 4;
    Oia 4 4; Syntagma Square 4 4; Mount Athos 4 4; Mount Parnassus 4 4; Shipwreck Beach 4 4; Palace of Knossos 4 4; Samaria Gorge 5 5; Vikos Gorge 5 5; Propylaea 5 5;
    Temple of Olympian Zeus 5 5; Lindos 5 5; Vergina 5 5; Dodona 5 5; Pnyx 5 5; Lion Gate 5 5; Treasury of Atreus 5 5`),
  spanish_landmarks: L(`Sagrada Familia 2 2; Alhambra 2 2; Park Guell 3 3; Guggenheim Bilbao 3 3; Prado Museum 3 3; Royal Palace of Madrid 3 3; Plaza Mayor 3 3; Puerta del Sol 3 3; Mezquita 3 3;
    Camino de Santiago 3 3; Montserrat 3 3; Mount Teide 3 3; Costa Brava 3 3; Costa del Sol 3 3; Las Ramblas 3 3; Camp Nou 3 3; La Pedrera 4 4; Casa Batllo 4 4; Retiro Park 4 4;
    Cibeles Fountain 4 4; Alcazar of Seville 4 4; Giralda 4 4; Plaza de Espana 4 4; Seville Cathedral 4 4; Aqueduct of Segovia 4 4; El Escorial 4 4; Puente Nuevo 4 4; Montjuic 4 4;
    Tibidabo 4 4; Santiago Bernabeu 4 4; Sierra Nevada 3 3; Santiago de Compostela 3 3; Alcazar of Segovia 5 5; Valley of the Fallen 5 5; Picos de Europa 5 5; Alcazaba 5 5;
    Generalife 5 5; Hanging Houses 5 5; Caminito del Rey 5 5; Albaicin 5 5; Donana 5 5; Torre Agbar 5 5`),
  continents_and_supercontinents: [
    ...L(`Africa 1 1; Asia 1 1; Europe 1 1; Antarctica 1 1; Australia 1 1; North America 1 1; South America 1 1; Oceania 2 2; Americas 2 2; Eurasia 3 3; Australasia 3 3;
      Laurasia 4 4; Zealandia 4 4; Laurentia 5 5; Rodinia 5 5; Nuna 5 5; Pannotia 5 5; Baltica 5 5; Avalonia 5 5; Kenorland 5 5; Vaalbara 5 5; Euramerica 5 5; Amasia 5 5; Pangaea Proxima 5 5`),
    A('Pangaea 3 2', [['Pangea', 'spelling', 3, 3]]),
    A('Gondwana 3 3', [['Gondwanaland', 'synonym', 4, 4]]),
  ],
  world_regions: L(`Middle East 1 1; Caribbean 1 1; Far East 2 2; Balkans 2 2; Scandinavia 2 2; Patagonia 2 2; Southeast Asia 2 2; Central America 2 2; Latin America 2 2; North Africa 2 2;
    Western Europe 2 2; Eastern Europe 2 2; Siberia 2 2; Midwest 2 2; New England 2 2; Outback 2 2; Sub-Saharan Africa 3 3; West Africa 3 3; East Africa 3 3; Central Asia 3 3; South Asia 3 3;
    East Asia 3 3; Baltics 3 3; Benelux 3 3; Levant 3 3; Horn of Africa 3 3; Polynesia 3 3; Mesopotamia 3 3; Arabia 3 3; Near East 3 3; Low Countries 3 3; Central Europe 3 3;
    Indian Subcontinent 3 3; Great Lakes 3 3; Deep South 3 3; Pacific Northwest 3 3; Lapland 3 3; Iberia 4 4; Maghreb 4 4; Melanesia 4 4; Micronesia 4 4; Indochina 4 4; Caucasus 4 4;
    Anatolia 4 4; Sahel 4 4; Asia Minor 4 4; Appalachia 4 4; Occident 5 5; Oceania 3 3`),
};
