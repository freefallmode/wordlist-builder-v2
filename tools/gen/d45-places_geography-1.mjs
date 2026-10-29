// Depth 4-5 words, places_geography chunk 1: regional countries, capitals, cities by country, mountains, volcanoes, islands. Format: tools/apply-words.mjs.
// Rows are "Name rec inRec" (comma separated), expanded by L(); every entry is a place. Ambiguous names get a meaning label via GL.
const GL = {};   // text -> gloss (filled below)
const mk = (kind, g, list) => { for (const t of list.split(',')) GL[kind + ':' + t.trim()] = g; };
mk('country', 'country', 'Monaco,Jordan,Turkey,Niger,Guinea,Mauritius,Fiji,Tonga');
mk('country', 'island', 'Cyprus,Barbados,Trinidad,Montserrat,Hispaniola');
mk('city', 'city', 'Paris,Copenhagen,Tripoli,Washington,Santiago,Lima,Kingston,Georgetown,Bristol,York,Nice,Hamburg,Bologna,Trieste,Valencia,Córdoba,Kobe,Nara,Phoenix,Denver,Dover,Atlanta,Boston,Bismarck,Austin,Charleston,Cheyenne,São Paulo,Salvador,Santos,Perth,Adelaide,Darwin,Gold Coast,Geelong,Fremantle,Wellington,Hamilton,Nelson,Baku,Leicester,Durham,Bordeaux,Murcia,Perm,Sapporo,Montgomery,Jackson,Columbus,Columbia,Richmond,Madison,Olympia,Blenheim,Lincoln');
mk('city', 'English city', 'Bath'); mk('city', 'German city', 'Cologne');
mk('feat', 'mountain', 'Mont Blanc,Everest,K2,Fuji'); mk('feat', 'volcano', 'Erebus');
mk('feat', 'island', 'Rhodes,Maui,Midway,Hydra'); mk('feat', 'country', 'Fiji,Tonga');
const SENS = new Set(['Palestine', 'Israel', 'Kosovo']);
const AL = {   // text -> [[alias, kind, rec, inRec, regions?], ...]
  'Ivory Coast': [["Côte d'Ivoire", 'synonym', 3, 3]], 'Cape Verde': [['Cabo Verde', 'synonym', 4, 4]], 'Czech Republic': [['Czechia', 'synonym', 3, 3]],
  'United Kingdom': [['UK', 'synonym', 1, 3]], 'Eswatini': [['Swaziland', 'synonym', 3, 3]], 'Kyiv': [['Kiev', 'spelling', 2, 2]], 'United Arab Emirates': [['UAE', 'synonym', 2, 3]],
  'Beijing': [['Peking', 'synonym', 3, 3]], 'Guangzhou': [['Canton', 'synonym', 4, 4]], 'Mumbai': [['Bombay', 'synonym', 2, 2]], 'Kolkata': [['Calcutta', 'synonym', 3, 3]],
  'Chennai': [['Madras', 'synonym', 3, 3]], 'Bangalore': [['Bengaluru', 'spelling', 3, 3]], 'Cologne': [['Köln', 'synonym', 3, 4]],
  'Munich': [['München', 'synonym', 3, 4]], 'Saint Petersburg': [['St Petersburg', 'spelling', 2, 2]], 'Saint Paul': [['St Paul', 'spelling', 3, 3]], 'Rio de Janeiro': [['Rio', 'synonym', 2, 1]],
  'Everest': [['Mount Everest', 'synonym', 1, 1], ['Chomolungma', 'synonym', 4, 4], ['Sagarmatha', 'synonym', 5, 5]], 'Kangchenjunga': [['Kanchenjunga', 'spelling', 4, 4]],
  'Fuji': [['Mount Fuji', 'synonym', 1, 2]], 'Etna': [['Mount Etna', 'synonym', 2, 1]], 'Denali': [['Mount McKinley', 'synonym', 3, 3]], 'Kosciuszko': [['Mount Kosciuszko', 'synonym', 4, 2]],
  'Matterhorn': [['Cervino', 'synonym', 5, 5]], 'Netherlands': [['The Netherlands', 'synonym', 2, 1]], 'Zakynthos': [['Zante', 'synonym', 4, 4]], 'Kefalonia': [['Cephalonia', 'spelling', 4, 4]],
  'Lesbos': [['Lesvos', 'spelling', 4, 4]], 'Santorini': [['Thira', 'synonym', 5, 5]], 'Saint Lucia': [['St Lucia', 'spelling', 3, 2]],
};
const L = (s, kind) => s.split(',').map(x => x.trim()).filter(Boolean).map(x => {
  const m = x.match(/^(.*) (\d) (\d)$/);
  if (!m) throw Error('bad row ' + x);
  const t = m[1], o = { type: 'place' };
  const g = GL[kind + ':' + t] || GL[t];
  if (g) o.g = g;
  if (SENS.has(t)) o.sens = true;
  if (AL[t]) o.al = AL[t];
  return [t, +m[2], +m[3], o];
});
const C = s => L(s, 'country'), T = s => L(s, 'city'), F = s => L(s, 'feat');

export const THEMES = {
  eastern_european_countries: { d: 2 }, western_european_countries: { d: 2 }, middle_eastern_countries: { d: 2, note: 'including Turkey and Egypt as commonly counted' },
  west_african_countries: { d: 4 }, east_african_countries: { d: 3 }, southern_african_countries: { d: 4 },
  european_capitals: { d: 2 }, asian_capitals: { d: 3 }, african_capitals: { d: 4 },
  american_capitals: { d: 3, region: [], note: 'national capitals of North, Central and South America and the Caribbean' },
  british_cities: { d: 2 }, french_cities: { d: 2 }, german_cities: { d: 3 }, italian_cities: { d: 2 }, spanish_cities: { d: 3 }, russian_cities: { d: 4 },
  chinese_cities: { d: 3 }, japanese_cities: { d: 3 }, indian_cities: { d: 3 }, us_state_capitals: { d: 3 },
  brazilian_cities: { d: 4 }, australian_cities: { d: 2 }, new_zealand_cities: { d: 3 },
  alpine_peaks: { d: 4 }, himalayan_peaks: { d: 4 }, famous_volcanoes: { d: 3 }, seven_summits: { d: 4 },
  caribbean_islands: { d: 2 }, greek_islands: { d: 2 }, pacific_islands: { d: 3 },
};

export const DATA = {
  eastern_european_countries: C(`Poland 2 1, Ukraine 2 1, Russia 1 2, Romania 2 1, Hungary 2 2, Czech Republic 2 2, Slovakia 2 2, Bulgaria 2 2, Belarus 2 2, Moldova 3 3,
    Lithuania 2 3, Latvia 3 3, Estonia 3 3, Serbia 2 3, Croatia 2 3, Slovenia 3 3, Bosnia 3 3, Montenegro 3 3, North Macedonia 3 4, Albania 3 3, Kosovo 3 4`),
  western_european_countries: C(`France 1 1, Germany 1 1, Netherlands 2 1, Belgium 2 1, Luxembourg 3 2, Austria 2 2, Switzerland 2 2, Liechtenstein 3 3, Monaco 3 3,
    Ireland 1 3, United Kingdom 1 3, Britain 1 3, Andorra 3 4, Spain 1 4, Portugal 2 4, Holland 2 2`),
  middle_eastern_countries: C(`Iran 2 1, Iraq 2 1, Israel 2 1, Saudi Arabia 2 1, Syria 2 1, Jordan 2 2, Lebanon 2 2, Yemen 3 2, Oman 3 2, Kuwait 2 2, Qatar 2 2, Bahrain 3 2,
    United Arab Emirates 2 2, Turkey 1 3, Palestine 3 3, Egypt 1 3, Cyprus 3 4`),
  west_african_countries: C(`Nigeria 2 1, Ghana 2 1, Senegal 2 2, Mali 3 2, Niger 3 3, Benin 3 2, Togo 3 2, Guinea 3 2, Liberia 3 2, Sierra Leone 3 2, Ivory Coast 2 2,
    Gambia 3 2, Burkina Faso 3 3, Mauritania 3 3, Cape Verde 3 4, Guinea-Bissau 4 4`),
  east_african_countries: C(`Kenya 1 1, Ethiopia 2 1, Tanzania 2 1, Uganda 2 2, Rwanda 2 2, Somalia 2 2, Sudan 2 3, South Sudan 3 3, Eritrea 3 2, Djibouti 3 3,
    Burundi 3 3, Madagascar 2 3, Mauritius 3 4, Seychelles 3 4, Comoros 4 4`),
  southern_african_countries: C(`South Africa 1 1, Namibia 3 2, Botswana 3 2, Zimbabwe 2 2, Zambia 3 2, Mozambique 3 2, Malawi 3 3, Angola 3 3, Lesotho 3 2, Eswatini 4 3, Madagascar 2 4`),

  european_capitals: T(`London 1 1, Paris 1 1, Berlin 1 1, Madrid 1 1, Rome 1 1, Lisbon 2 2, Vienna 2 1, Brussels 2 2, Amsterdam 1 1, Dublin 1 1, Athens 1 1, Stockholm 2 2,
    Oslo 2 2, Copenhagen 2 2, Helsinki 2 2, Warsaw 2 2, Prague 2 2, Budapest 2 2, Bucharest 3 3, Sofia 3 3, Belgrade 3 3, Zagreb 3 3, Ljubljana 4 4, Bratislava 4 4,
    Vilnius 4 4, Riga 3 3, Tallinn 3 4, Reykjavik 3 3, Valletta 4 4, Bern 3 3, Kyiv 2 2, Moscow 1 2, Tirana 4 4, Sarajevo 3 3, Skopje 4 4, Minsk 3 3, Vaduz 5 5, Podgorica 5 5`),
  asian_capitals: T(`Tokyo 1 1, Beijing 1 1, Seoul 2 1, Bangkok 1 1, New Delhi 2 1, Hanoi 2 2, Jakarta 2 2, Manila 2 2, Kuala Lumpur 2 2, Islamabad 2 2, Kabul 2 2, Dhaka 3 3,
    Kathmandu 2 3, Colombo 3 3, Thimphu 4 4, Naypyidaw 4 4, Vientiane 4 4, Phnom Penh 3 3, Ulaanbaatar 4 4, Pyongyang 2 3, Taipei 2 3, Tehran 2 2, Baghdad 2 2,
    Riyadh 3 3, Damascus 2 3, Amman 3 3, Beirut 2 3, Tashkent 4 4, Astana 4 4, Baku 4 4, Yerevan 4 4, Tbilisi 4 4, Dushanbe 5 5, Bishkek 5 5`),
  african_capitals: T(`Cairo 1 1, Nairobi 2 1, Pretoria 3 2, Abuja 3 3, Accra 3 2, Addis Ababa 3 2, Dakar 3 3, Rabat 3 3, Tunis 3 3, Algiers 3 3, Tripoli 3 3, Khartoum 3 3,
    Kampala 3 3, Lusaka 4 4, Harare 3 3, Luanda 4 4, Kinshasa 3 3, Brazzaville 4 4, Windhoek 4 4, Gaborone 5 5, Maputo 4 4, Antananarivo 5 5, Kigali 3 3, Mogadishu 3 3,
    Bamako 4 4, Niamey 5 5, Ouagadougou 4 4, Freetown 4 4, Monrovia 4 4, Nouakchott 5 5, Asmara 4 4, Lilongwe 5 5, Cape Town 2 3`),
  american_capitals: T(`Washington 1 1, Ottawa 2 1, Mexico City 1 1, Havana 2 2, Brasília 2 2, Buenos Aires 1 1, Santiago 2 2, Lima 2 2, Bogotá 2 2, Caracas 2 3, Quito 3 3,
    La Paz 3 3, Montevideo 3 3, Asunción 3 4, Panama City 2 3, San José 3 3, Managua 3 4, Tegucigalpa 4 4, San Salvador 3 4, Guatemala City 3 3, Belmopan 5 5,
    Kingston 3 3, Nassau 3 3, Port-au-Prince 3 3, Santo Domingo 3 3, Bridgetown 4 4, Port of Spain 4 4, Georgetown 4 4, Paramaribo 5 5, Sucre 5 5`),

  british_cities: T(`London 1 1, Manchester 1 1, Birmingham 1 1, Liverpool 1 1, Leeds 2 1, Sheffield 2 2, Bristol 2 1, Newcastle 2 2, Edinburgh 1 2, Glasgow 1 2, Cardiff 2 2,
    Belfast 2 2, Nottingham 2 2, Leicester 3 2, Oxford 1 2, Cambridge 1 2, York 2 2, Bath 2 2, Norwich 3 3, Exeter 3 3, Canterbury 3 3, Durham 3 3, Lincoln 3 3,
    Aberdeen 3 3, Dundee 3 3, Inverness 3 3, Swansea 3 3, Wolverhampton 3 3, Lichfield 4 4, Ely 4 4, Wells 4 4, Truro 4 4, Salisbury 3 3, Winchester 3 3, Coventry 2 3`),
  french_cities: T(`Paris 1 1, Marseille 2 1, Lyon 2 1, Toulouse 2 2, Nice 2 2, Nantes 3 2, Strasbourg 3 2, Bordeaux 2 2, Lille 3 2, Cannes 2 3, Montpellier 3 3, Rennes 3 3,
    Reims 3 3, Grenoble 3 3, Dijon 3 3, Avignon 3 3, Orléans 3 3, Calais 2 3, Le Havre 3 3, Versailles 2 3, Rouen 3 3, Toulon 4 4, Nîmes 4 4, Limoges 4 4, Amiens 4 4,
    Lourdes 3 4, Chartres 4 4, Biarritz 4 4, Arles 4 4, Metz 4 4, Cherbourg 4 4`),
  german_cities: T(`Berlin 1 1, Munich 1 1, Hamburg 1 1, Frankfurt 1 1, Cologne 2 2, Stuttgart 2 2, Düsseldorf 3 2, Dortmund 3 3, Essen 3 3, Leipzig 3 2, Bremen 3 3, Dresden 2 2,
    Hanover 3 3, Nuremberg 3 3, Bonn 2 3, Heidelberg 3 3, Aachen 3 3, Mainz 4 4, Potsdam 3 3, Kiel 4 4, Lübeck 4 4, Freiburg 4 4, Karlsruhe 4 4, Augsburg 4 4,
    Wiesbaden 4 4, Münster 4 4, Würzburg 4 4, Regensburg 4 4, Trier 4 4, Weimar 3 4`),
  italian_cities: T(`Rome 1 1, Milan 1 1, Naples 2 1, Turin 2 2, Venice 1 1, Florence 1 1, Bologna 2 2, Genoa 2 2, Palermo 3 3, Verona 2 2, Pisa 2 2, Siena 3 3, Bari 4 3,
    Catania 4 3, Padua 3 3, Trieste 3 3, Parma 3 3, Modena 3 3, Perugia 3 4, Ravenna 4 4, Rimini 3 4, Lucca 4 4, Assisi 3 4, Sorrento 3 4, Brindisi 4 4, Cagliari 4 4,
    Taranto 4 4, Bergamo 4 4, Como 3 4, Ferrara 4 4, Messina 4 4, Amalfi 3 4`),
  spanish_cities: T(`Madrid 1 1, Barcelona 1 1, Valencia 2 2, Seville 2 2, Bilbao 3 2, Malaga 3 2, Granada 2 3, Toledo 3 3, Córdoba 3 3, Zaragoza 3 3, Salamanca 3 3, Alicante 3 3,
    Murcia 3 3, Marbella 3 3, Cádiz 3 4, Pamplona 3 3, Santander 3 3, San Sebastián 3 3, Palma 3 4, Vigo 4 4, Gijón 4 4, Oviedo 4 4, Burgos 4 4, Segovia 4 4,
    Ávila 4 4, Girona 4 4, Tarragona 4 4, Almería 4 4, León 4 4, Jerez 4 4, Benidorm 3 4`),
  russian_cities: T(`Moscow 1 1, Saint Petersburg 2 1, Novosibirsk 3 3, Yekaterinburg 3 3, Kazan 3 3, Nizhny Novgorod 4 3, Chelyabinsk 4 4, Samara 4 4, Omsk 4 4, Rostov 4 4,
    Ufa 4 4, Volgograd 3 2, Perm 4 4, Krasnoyarsk 4 4, Voronezh 4 4, Sochi 2 2, Vladivostok 3 3, Murmansk 3 3, Irkutsk 3 3, Kaliningrad 3 3, Arkhangelsk 4 4,
    Tomsk 4 4, Yakutsk 4 4, Smolensk 4 4, Tula 4 4, Grozny 3 3, Magadan 4 4, Norilsk 4 4, Novgorod 4 4, Vladimir 3 4, Pskov 5 5, Kursk 4 4`),
  chinese_cities: T(`Beijing 1 1, Shanghai 1 1, Hong Kong 1 2, Guangzhou 3 2, Shenzhen 3 2, Chengdu 3 3, Tianjin 3 3, Wuhan 2 3, Chongqing 3 3, Nanjing 3 3, Xi'an 3 3, Hangzhou 3 3,
    Macau 3 3, Suzhou 4 4, Harbin 3 4, Qingdao 3 3, Kunming 4 4, Lhasa 3 3, Urumqi 4 4, Guilin 3 4, Xiamen 4 4, Dalian 4 4, Shenyang 4 4, Changsha 4 4, Zhengzhou 4 4,
    Lanzhou 5 5, Nanchang 5 5, Hefei 5 5, Jinan 5 5, Luoyang 4 4, Kashgar 4 4`),
  japanese_cities: T(`Tokyo 1 1, Osaka 2 1, Kyoto 2 1, Yokohama 2 2, Nagoya 3 2, Sapporo 3 2, Kobe 2 2, Hiroshima 2 2, Nagasaki 2 2, Fukuoka 3 3, Sendai 3 3, Nara 3 3,
    Kawasaki 3 4, Kanazawa 4 4, Nagano 3 3, Okayama 4 4, Niigata 4 4, Kumamoto 4 4, Kagoshima 4 4, Hakodate 4 4, Nikko 4 4, Kamakura 4 4, Matsumoto 4 4, Naha 4 4,
    Hamamatsu 4 4, Shizuoka 4 4, Himeji 4 4, Sakai 5 5`),
  indian_cities: T(`Mumbai 1 1, Delhi 1 1, Kolkata 2 1, Chennai 2 2, Bangalore 2 2, Hyderabad 2 2, Pune 3 3, Ahmedabad 3 3, Jaipur 2 2, Agra 2 2, Varanasi 3 3, Lucknow 3 3,
    Kanpur 4 4, Nagpur 4 4, Surat 4 4, Bhopal 4 3, Patna 4 4, Amritsar 3 3, Chandigarh 4 4, Shimla 4 4, Mysore 3 4, Udaipur 3 4, Jodhpur 3 4, Kochi 4 4, Madurai 4 4,
    Indore 4 4, Visakhapatnam 5 5, Srinagar 3 4, Darjeeling 3 4`),
  us_state_capitals: T(`Montgomery 3 3, Juneau 3 3, Phoenix 2 2, Little Rock 3 3, Sacramento 2 2, Denver 2 1, Hartford 3 3, Dover 3 3, Tallahassee 3 3, Atlanta 1 1, Honolulu 2 2,
    Boise 3 3, Springfield 3 4, Indianapolis 2 2, Des Moines 3 3, Topeka 3 3, Frankfort 4 4, Baton Rouge 3 3, Augusta 3 4, Annapolis 3 3, Boston 1 1, Lansing 3 3,
    Saint Paul 3 3, Jackson 3 3, Jefferson City 4 4, Helena 3 4, Lincoln 3 3, Carson City 3 3, Concord 3 4, Trenton 3 3, Santa Fe 3 3, Albany 3 3, Raleigh 3 3,
    Bismarck 3 3, Columbus 2 2, Oklahoma City 2 2, Salem 3 4, Harrisburg 3 3, Providence 3 3, Columbia 3 4, Pierre 4 4, Nashville 2 2, Austin 2 2, Salt Lake City 2 2,
    Montpelier 4 4, Richmond 3 3, Olympia 3 3, Charleston 3 4, Madison 3 3, Cheyenne 3 3`),
  brazilian_cities: T(`São Paulo 1 1, Rio de Janeiro 1 1, Brasília 2 1, Salvador 3 2, Fortaleza 3 3, Belo Horizonte 3 3, Manaus 3 3, Curitiba 3 3, Recife 3 3, Porto Alegre 3 3,
    Belém 3 3, Goiânia 4 4, Campinas 4 4, Santos 3 4, Natal 3 4, Florianópolis 3 4, Ouro Preto 4 4, Paraty 4 4, Foz do Iguaçu 4 4, Búzios 4 4, São Luís 4 4, Maceió 4 4,
    Vitória 4 4, Niterói 4 4, Petrópolis 4 4, Olinda 5 5, Cuiabá 5 5, Campo Grande 4 5, João Pessoa 4 5, Teresina 5 5, Aracaju 5 5, Londrina 5 5`),
  australian_cities: T(`Sydney 1 1, Melbourne 1 1, Brisbane 2 1, Perth 2 1, Adelaide 2 1, Canberra 2 2, Hobart 3 2, Darwin 2 2, Gold Coast 2 3, Newcastle 3 3, Wollongong 4 4,
    Geelong 3 4, Cairns 3 3, Townsville 4 4, Alice Springs 3 3, Launceston 4 4, Toowoomba 4 4, Ballarat 4 4, Bendigo 4 4, Fremantle 4 4, Albury 5 5, Mildura 5 5,
    Broome 4 4, Byron Bay 4 4, Bunbury 5 5, Katherine 5 5, Mackay 5 5, Rockhampton 5 5, Kalgoorlie 4 4, Dubbo 4 4, Bathurst 4 4`),
  new_zealand_cities: T(`Auckland 2 1, Wellington 2 1, Christchurch 2 1, Hamilton 3 2, Dunedin 3 2, Tauranga 3 3, Queenstown 2 3, Rotorua 3 3, Napier 4 4, Nelson 3 3,
    Palmerston North 4 4, Invercargill 4 4, Hastings 3 4, New Plymouth 4 4, Whangarei 4 4, Gisborne 4 4, Timaru 5 5, Taupō 4 4, Blenheim 4 4, Whanganui 5 5, Oamaru 5 5, Kaikōura 4 4`),

  alpine_peaks: F(`Mont Blanc 1 1, Matterhorn 2 1, Eiger 3 2, Jungfrau 3 2, Mönch 4 4, Monte Rosa 4 3, Dom 5 5, Weisshorn 5 5, Grossglockner 4 3, Zugspitze 3 3, Piz Bernina 5 5,
    Aiguille du Midi 4 4, Dufourspitze 5 5, Gran Paradiso 4 4, Grandes Jorasses 5 5, Dent Blanche 5 5, Aletschhorn 5 5, Wetterhorn 5 5, Ortler 5 5, Marmolada 5 5,
    Triglav 4 4, Watzmann 5 5, Finsteraarhorn 5 5, Säntis 5 5, Titlis 4 4, Pilatus 3 3, Rigi 4 4, Schilthorn 4 4`),
  himalayan_peaks: F(`Everest 1 1, K2 2 2, Kangchenjunga 3 3, Lhotse 4 3, Makalu 4 3, Cho Oyu 4 3, Dhaulagiri 4 3, Manaslu 4 3, Nanga Parbat 3 3, Annapurna 3 2, Gasherbrum 5 4,
    Broad Peak 5 4, Shishapangma 5 4, Nuptse 5 4, Ama Dablam 4 4, Machapuchare 5 5, Pumori 5 5, Nanda Devi 4 4, Kamet 5 5, Rakaposhi 5 5, Masherbrum 5 5, Trisul 5 5,
    Mount Kailash 4 4`),
  famous_volcanoes: F(`Vesuvius 2 1, Etna 2 1, Krakatoa 2 2, Mount St Helens 2 1, Fuji 2 2, Kilauea 3 2, Mauna Loa 3 2, Stromboli 3 2, Popocatépetl 3 3, Eyjafjallajökull 3 3,
    Pinatubo 3 3, Tambora 4 4, Mount Pelée 4 4, Erebus 4 4, Cotopaxi 3 3, Mount Rainier 3 4, Merapi 4 4, Nyiragongo 5 5, Ruapehu 4 4, Teide 4 4, Hekla 4 4, Katla 5 5,
    Surtsey 5 5, Paricutín 5 5, Mayon 5 5, Sakurajima 5 5, Mount Shasta 4 4, Kilimanjaro 2 4`),
  seven_summits: F(`Everest 1 1, Aconcagua 3 1, Denali 3 1, Kilimanjaro 2 1, Elbrus 4 1, Vinson 4 1, Kosciuszko 4 1`),

  caribbean_islands: C(`Jamaica 1 1, Cuba 1 1, Barbados 2 1, Bahamas 2 2, Puerto Rico 2 2, Haiti 2 2, Trinidad 2 2, Tobago 3 3, Grenada 3 2, Aruba 2 2, Antigua 3 3, Barbuda 4 4,
    Saint Lucia 3 2, Dominica 3 3, Martinique 3 3, Guadeloupe 3 3, Curaçao 3 3, Bonaire 4 4, Cayman Islands 3 3, Saint Kitts 4 4, Nevis 4 4, Anguilla 4 4, Montserrat 4 4,
    Tortola 4 4, Saint Vincent 4 4, Hispaniola 3 4, Sint Maarten 4 4, Turks and Caicos 4 4, Grand Cayman 3 3, Cozumel 4 4`),
  greek_islands: F(`Crete 2 1, Rhodes 2 1, Corfu 2 1, Santorini 2 1, Mykonos 2 1, Kos 3 2, Zakynthos 3 2, Lesbos 3 2, Naxos 3 3, Paros 3 3, Ios 3 3, Milos 3 3, Samos 3 3,
    Chios 4 4, Skiathos 3 3, Kefalonia 3 3, Lefkada 4 4, Ithaca 3 3, Aegina 4 4, Hydra 3 4, Spetses 5 5, Patmos 4 4, Delos 4 4, Thassos 4 4, Samothrace 5 5, Symi 5 5,
    Karpathos 5 5, Syros 5 5, Skyros 5 5, Lemnos 5 5`),
  pacific_islands: F(`Hawaii 1 1, Tahiti 2 1, Fiji 2 1, Samoa 2 2, Tonga 2 2, Guam 3 2, Bora Bora 2 2, Easter Island 2 2, Galápagos 2 3, Vanuatu 3 3, Solomon Islands 3 3,
    New Caledonia 3 3, Palau 3 3, Kiribati 3 4, Tuvalu 3 4, Nauru 3 4, Marshall Islands 3 3, Micronesia 3 3, Pitcairn 3 4, Moorea 4 4, Rarotonga 4 4, Cook Islands 3 3,
    Maui 2 2, Oahu 3 2, Kauai 3 3, Midway 3 4, Okinawa 3 3, Iwo Jima 3 4, Guadalcanal 3 4, Tarawa 4 4, Saipan 4 4, Bikini 3 4`),
};
