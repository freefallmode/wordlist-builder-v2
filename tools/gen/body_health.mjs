// Generated word data: Body & Health and the playable themes directly under it.
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const BR = (o = {}) => ({ type: 'org', tm: true, ...o });
const BRIT = ['UK', 'AU', 'NZ', 'IE', 'CA', 'ZA', 'IN'];
const BRIT4 = ['UK', 'AU', 'NZ', 'IE'];

export const THEMES = {
  body_parts: { d: 1 }, inside_the_body: { d: 2 }, senses: { d: 1 }, illnesses: { d: 1 }, medicine: { d: 2 },
  babies_and_birth: { d: 2 }, fitness: { d: 2 }, sleep: { d: 1 }, personal_care: { d: 2 }, nutrition: { d: 2 },
};

export const DATA = {
  // ---------------------------------------------------------------- body parts
  body_parts: [
    ['head', 1, 1, { g: 'body' }], ['neck', 1, 1], ['shoulder', 1, 1], ['arm', 1, 1, { g: 'body' }], ['elbow', 1, 1], ['wrist', 1, 1], ['hand', 1, 1],
    ['finger', 1, 1], ['thumb', 1, 1], ['chest', 1, 1], ['back', 1, 1], ['waist', 1, 1], ['hip', 1, 1], ['leg', 1, 1], ['knee', 1, 1],
    ['ankle', 1, 1], ['foot', 1, 1, { g: 'body' }], ['toe', 1, 1], ['face', 1, 1], ['nose', 1, 1], ['mouth', 1, 1], ['eye', 1, 1], ['ear', 1, 1], ['chin', 1, 1],
    ['forehead', 1, 1], ['skin', 1, 2], ['hair', 1, 2], ['thigh', 1, 1], ['armpit', 1, 1, { al: [['underarm', 'synonym', 2, 2], ['axilla', 'synonym', 5, 5]] }],
    ['stomach', 1, 1, { al: [['tummy', 'synonym', 1, 1], ['tum', 'synonym', 2, 2, BRIT4]] }],
    ['navel', 2, 2, { al: [['belly button', 'synonym', 1, 1], ['umbilicus', 'synonym', 5, 5], ['tummy button', 'synonym', 2, 2, ['UK']]] }],
    ['buttocks', 2, 2, { al: [['bottom', 'synonym', 1, 1, ['UK']], ['bum', 'synonym', 1, 1, ['UK', 'AU', 'NZ', 'IE']], ['butt', 'synonym', 1, 1, ['US', 'CA']],
      ['rump', 'synonym', 3, 3], ['derriere', 'synonym', 3, 3], ['posterior', 'synonym', 3, 3], ['backside', 'synonym', 2, 2], ['tush', 'synonym', 3, 3, ['US']],
      ['arse', 'synonym', 2, 2, ['UK', 'AU', 'IE'], { vulgar: true }]] }],
    ['groin', 2, 2], ['calf', 2, 2, { g: 'leg' }], ['shin', 2, 2], ['palm', 1, 2, { g: 'hand' }], ['knuckle', 2, 2], ['eyebrow', 1, 1], ['eyelid', 2, 2], ['lip', 1, 1],
    ['tongue', 1, 1], ['throat', 1, 2], ['abdomen', 2, 2], ['torso', 2, 2], ['scalp', 2, 2], ['jaw', 1, 2], ['nostril', 2, 2], ['heel', 1, 1, { g: 'foot' }],
    ['sole', 2, 2, { g: 'foot' }], ['temple', 2, 3, { g: 'head' }], ['instep', 3, 3], ["Adam's apple", 2, 3], ['earlobe', 2, 2], ['kneecap', 2, 2],
    ['shoulder blade', 2, 3], ['funny bone', 2, 3], ['midriff', 3, 3], ['flank', 3, 4], ['limb', 2, 3], ['digit', 3, 3, { g: 'finger' }],
    ['nape', 3, 3, { al: [['scruff', 'synonym', 4, 4, [], { g: 'neck' }]] }], ['haunch', 4, 4], ['fontanelle', 4, 4], ['philtrum', 4, 4], ['glabella', 5, 5],
    ['lunula', 5, 5], ['hallux', 5, 5, { al: [['big toe', 'synonym', 1, 1]] }], ['frenulum', 5, 5], ['occiput', 5, 5], ['small of the back', 3, 3, { type: 'phrase' }],
    ['ball of the foot', 3, 3, { type: 'phrase' }],
  ],

  // ---------------------------------------------------------------- inside the body
  inside_the_body: [
    ['heart', 1, 1, { g: 'organ' }], ['lung', 1, 1], ['liver', 1, 1], ['kidney', 1, 1], ['brain', 1, 1], ['bone', 1, 1], ['muscle', 1, 1], ['blood', 1, 1],
    ['stomach', 1, 1], ['skull', 1, 2], ['spine', 2, 2], ['rib', 1, 2], ['skeleton', 1, 1], ['vein', 2, 2], ['artery', 2, 2], ['nerve', 2, 2, { g: 'body' }],
    ['intestine', 2, 2, { al: [['gut', 'synonym', 2, 2], ['bowel', 'synonym', 3, 3]] }], ['bladder', 2, 2], ['appendix', 2, 2, { g: 'organ' }], ['spleen', 3, 3],
    ['pancreas', 3, 3], ['gallbladder', 3, 3], ['colon', 3, 3, { g: 'intestine' }], ['rectum', 3, 3], ['tonsils', 2, 3],
    ['oesophagus', 3, 3, { al: [['esophagus', 'spelling', 3, 3, ['US', 'CA']], ['gullet', 'synonym', 3, 3]] }],
    ['windpipe', 2, 2, { al: [['trachea', 'synonym', 3, 3]] }], ['diaphragm', 3, 3, { g: 'body' }], ['thyroid', 3, 3], ['larynx', 3, 3, { al: [['voice box', 'synonym', 2, 2]] }],
    ['bone marrow', 2, 3], ['tendon', 2, 2], ['ligament', 3, 3], ['cartilage', 3, 3], ['gland', 2, 3], ['tissue', 2, 3, { g: 'body' }], ['cell', 1, 3, { g: 'biology' }],
    ['aorta', 3, 3], ['capillary', 3, 3], ['pelvis', 3, 3], ['vertebra', 3, 3], ['sternum', 3, 3, { al: [['breastbone', 'synonym', 2, 2]] }], ['femur', 3, 3, { al: [['thigh bone', 'synonym', 1, 1]] }],
    ['lymph node', 3, 3], ['adrenal gland', 4, 4], ['bile', 3, 3], ['pharynx', 4, 4], ['duodenum', 4, 4], ['ventricle', 4, 4, { g: 'heart' }], ['atrium', 4, 4, { g: 'heart' }],
    ['pituitary gland', 4, 4], ['hypothalamus', 4, 4], ['gizzard', 5, 5], ['jejunum', 5, 5], ['ileum', 5, 5], ['epiglottis', 4, 4], ['alveoli', 5, 5], ['bronchi', 4, 4],
    ['uvula', 4, 4], ['coccyx', 4, 4, { al: [['tailbone', 'synonym', 2, 2]] }], ['sciatic nerve', 4, 4], ['fascia', 5, 5], ['sinuses', 3, 3], ['mucus', 2, 3],
  ],

  // ---------------------------------------------------------------- senses
  senses: [
    ['sight', 1, 1], ['hearing', 1, 1], ['smell', 1, 1], ['taste', 1, 1], ['touch', 1, 1], ['eye', 1, 1], ['ear', 1, 1], ['nose', 1, 1], ['tongue', 1, 1], ['skin', 1, 2],
    ['vision', 2, 2, { al: [['eyesight', 'synonym', 2, 2]] }], ['blind', 1, 2, adj()], ['deaf', 1, 2, adj()], ['sniff', 1, 2, verb()], ['sixth sense', 2, 3, { type: 'phrase' }],
    ['taste buds', 2, 2], ['eardrum', 2, 2], ['retina', 3, 3], ['cornea', 3, 3], ['pupil', 2, 3, { g: 'eye' }], ['night vision', 2, 3], ['peripheral vision', 3, 3],
    ['scent', 2, 2], ['aroma', 2, 2], ['flavor', 2, 2, { al: [['flavour', 'spelling', 2, 2, BRIT]] }],
    ['texture', 2, 3], ['sensation', 2, 2], ['perception', 3, 3], ['sensory', 3, 3, adj()], ['visual', 2, 2, adj()], ['auditory', 3, 3, adj()],
    ['olfactory', 4, 3, adj()], ['gustatory', 5, 4, adj()], ['tactile', 4, 3, adj()], ['optic', 4, 3, adj()], ['aural', 4, 3, adj()], ['receptor', 3, 3],
    ['stimulus', 3, 3], ['synesthesia', 4, 3, { al: [['synaesthesia', 'spelling', 4, 3, BRIT]] }],
    ['echolocation', 4, 4], ['perfect pitch', 3, 4], ['balance', 2, 3, { g: 'sense' }], ['olfaction', 5, 4], ['gustation', 5, 5], ['audition', 5, 5],
    ['proprioception', 5, 4], ['thermoception', 5, 5], ['nociception', 5, 5], ['inner ear', 2, 3], ['nostril', 2, 2],
    ['eyeball', 1, 2], ['earwax', 2, 3], ['sense of smell', 1, 1, { type: 'phrase' }], ['sense of touch', 1, 1, { type: 'phrase' }],
  ],

  // ---------------------------------------------------------------- illnesses
  illnesses: [
    ['cold', 1, 1, { g: 'illness', al: [['head cold', 'synonym', 2, 2], ['the sniffles', 'synonym', 3, 3], ['lurgy', 'synonym', 4, 4, ['UK', 'AU', 'NZ']]] }],
    ['flu', 1, 1, { al: [['influenza', 'synonym', 3, 3], ['grippe', 'synonym', 5, 5]] }],
    ['measles', 1, 1], ['mumps', 2, 2], ['chickenpox', 1, 1, { al: [['chicken pox', 'spelling', 1, 1]] }], ['cancer', 1, 1, { g: 'disease', sens: true }],
    ['diabetes', 1, 2], ['asthma', 1, 1], ['pneumonia', 2, 2], ['bronchitis', 2, 2], ['malaria', 2, 2],
    ['tuberculosis', 2, 2, { al: [['TB', 'synonym', 2, 2, [], { type: 'acronym' }], ['consumption', 'synonym', 4, 4, [], { g: 'tuberculosis' }]] }],
    ['cholera', 2, 2], ['smallpox', 2, 2], ['polio', 2, 2], ['typhoid', 3, 2], ['plague', 2, 2, { g: 'disease' }], ['dysentery', 3, 3],
    ['COVID-19', 1, 2, { type: 'acronym', al: [['coronavirus', 'synonym', 1, 2, [], { type: 'common' }], ['Covid', 'synonym', 1, 2, [], { type: 'proper' }]] }],
    ['migraine', 2, 2], ['arthritis', 2, 2], ['stroke', 2, 3, { g: 'illness', sens: true }], ['epilepsy', 2, 2], ['anemia', 2, 2, { al: [['anaemia', 'spelling', 2, 2, BRIT]] }],
    ['eczema', 2, 2], ['allergy', 1, 2], ['fever', 1, 1, { al: [['temperature', 'synonym', 2, 3, ['UK'], { g: 'fever' }], ['pyrexia', 'synonym', 5, 5]] }],
    ['tonsillitis', 2, 2], ['appendicitis', 2, 2], ['meningitis', 2, 2], ['hepatitis', 3, 3], ['jaundice', 3, 3], ['rabies', 2, 2], ['tetanus', 3, 2, { al: [['lockjaw', 'synonym', 4, 4]] }],
    ['scurvy', 3, 3], ['rickets', 3, 3], ['gout', 3, 3], ['shingles', 3, 3, { g: 'illness' }],
    ['glandular fever', 3, 3, { reg: ['UK', 'AU', 'NZ'], al: [['mono', 'synonym', 3, 3, ['US', 'CA'], { g: 'illness' }], ['kissing disease', 'synonym', 3, 3]] }],
    ['whooping cough', 2, 2], ['strep throat', 3, 3, { reg: ['US'] }], ['food poisoning', 1, 1],
    ['stomach bug', 1, 1, { al: [['tummy bug', 'synonym', 2, 2, ['UK']], ['gastro', 'synonym', 3, 3, ['AU', 'NZ']], ['Delhi belly', 'synonym', 3, 4]] }],
    ['gastroenteritis', 4, 3], ['sepsis', 3, 3, { sens: true }], ['dementia', 2, 3, { sens: true }], ['ague', 5, 5], ['rubella', 3, 3, { al: [['German measles', 'synonym', 3, 3]] }],
    ['scarlet fever', 3, 3], ['diphtheria', 4, 4], ['gangrene', 3, 3], ['pleurisy', 4, 4], ['lupus', 3, 4], ['hernia', 3, 3],
    ['conjunctivitis', 3, 3, { al: [['pink eye', 'synonym', 2, 2, ['US']]] }],
    ["athlete's foot", 2, 2], ['cold sore', 2, 2], ['ringworm', 2, 2], ['scabies', 3, 3], ['impetigo', 4, 4], ['croup', 4, 4], ['Ebola', 3, 3, { type: 'proper', sens: true }],
    ['dengue', 4, 4], ['lumbago', 4, 4], ['quinsy', 5, 5, { reg: ['UK'] }], ['dropsy', 5, 5], ['pellagra', 5, 5], ['beriberi', 5, 5], ['kidney stones', 2, 3],
    ['hay fever', 1, 1], ['headache', 1, 1], ['sore throat', 1, 1],
  ],

  // ---------------------------------------------------------------- medicine
  medicine: [
    ['doctor', 1, 1], ['nurse', 1, 1, { g: 'medical' }], ['hospital', 1, 1], ['surgery', 1, 1, { g: 'operation' }], ['patient', 1, 1, { g: 'medical' }], ['pill', 1, 1],
    ['vaccine', 1, 1, { al: [['jab', 'synonym', 2, 2, BRIT4, { g: 'vaccine' }], ['shot', 'synonym', 2, 2, ['US', 'CA'], { g: 'vaccine' }]] }],
    ['prescription', 1, 1, { al: [['script', 'synonym', 3, 3, ['AU', 'NZ'], { g: 'prescription' }]] }],
    ['antibiotic', 2, 2], ['X-ray', 1, 1], ['stethoscope', 1, 1], ['thermometer', 1, 1], ['syringe', 2, 2, { al: [['needle', 'synonym', 1, 1, [], { g: 'medical' }]] }],
    ['bandage', 1, 1, { al: [['dressing', 'synonym', 3, 3, [], { g: 'wound' }]] }], ['diagnosis', 2, 2], ['treatment', 1, 1], ['therapy', 2, 2], ['ambulance', 1, 1],
    ['clinic', 1, 1], ['surgeon', 1, 1], ['injection', 1, 1], ['dose', 2, 2], ['checkup', 1, 1, { al: [['check-up', 'spelling', 1, 1]] }], ['scalpel', 2, 2],
    ['stitches', 1, 1, { al: [['sutures', 'synonym', 3, 3]] }], ['anesthetic', 3, 3, { al: [['anaesthetic', 'spelling', 3, 3, BRIT]] }],
    ['transplant', 2, 2], ['antidote', 2, 3], ['placebo', 3, 3], ['epidemic', 2, 3], ['pandemic', 2, 3], ['clinical trial', 3, 3], ['bedside manner', 3, 3],
    ['GP', 2, 2, { type: 'acronym', reg: BRIT4, al: [['family doctor', 'synonym', 1, 1, ['US'], { type: 'common' }], ['general practitioner', 'synonym', 3, 3, [], { type: 'common' }]] }],
    ['paramedic', 2, 2], ['intensive care', 2, 2], ['triage', 3, 3], ['prognosis', 3, 3], ['remission', 3, 3, { sens: true }], ['biopsy', 3, 3], ['MRI', 2, 2, { type: 'acronym' }],
    ['CT scan', 3, 3], ['defibrillator', 3, 3], ['pacemaker', 3, 3], ['locum', 4, 4, { reg: BRIT4 }], ['pathology', 3, 4], ['epidemiology', 4, 4],
    ['pharmacology', 3, 3], ['acupuncture', 2, 3], ['homeopathy', 3, 4], ['hospice', 3, 3, { sens: true }], ['palliative care', 4, 3, { sens: true }],
    ['iatrogenic', 5, 5, adj()], ['contraindication', 5, 4], ['etiology', 5, 5, { al: [['aetiology', 'spelling', 5, 5, BRIT4]] }],
    ['medic', 2, 2], ['vital signs', 3, 3], ['second opinion', 2, 3], ['referral', 3, 3], ['dialysis', 3, 3],
    ['chemotherapy', 2, 3, { sens: true, al: [['chemo', 'synonym', 2, 3]] }], ['immunization', 3, 3, { al: [['immunisation', 'spelling', 3, 3, BRIT4]] }],
    ['sphygmomanometer', 5, 5], ['laparoscopy', 5, 5],
  ],

  // ---------------------------------------------------------------- babies and birth
  babies_and_birth: [
    ['baby', 1, 1], ['newborn', 1, 1], ['infant', 2, 1], ['toddler', 1, 1], ['pregnancy', 1, 1], ['birth', 1, 1], ['midwife', 2, 1],
    ['labor', 2, 2, { g: 'birth', al: [['labour', 'spelling', 2, 2, BRIT, { g: 'birth' }]] }],
    ['contractions', 2, 2], ['delivery', 2, 2, { g: 'birth' }], ['epidural', 3, 3], ['umbilical cord', 2, 2], ['placenta', 3, 3], ['ultrasound', 2, 2], ['due date', 2, 2],
    ['bump', 2, 2, { g: 'pregnancy' }], ['nursery', 1, 2], ['lullaby', 2, 3], ['teething', 2, 2], ['formula', 2, 2, { g: 'baby milk' }], ['breastfeeding', 2, 2], ['colic', 3, 3],
    ['swaddle', 3, 3], ['twins', 1, 2], ['womb', 2, 2],
    ['cesarean', 3, 3, { al: [['C-section', 'synonym', 2, 2], ['caesarean', 'spelling', 3, 3, BRIT]] }],
    ['diaper', 1, 1, { al: [['nappy', 'synonym', 1, 1, BRIT4]] }],
    ['pacifier', 1, 1, { al: [['dummy', 'synonym', 2, 2, BRIT4, { g: 'pacifier' }], ['binky', 'synonym', 3, 3, ['US']]] }],
    ['stroller', 1, 1, { al: [['pushchair', 'synonym', 2, 2, ['UK']], ['pram', 'synonym', 2, 2, BRIT4], ['buggy', 'synonym', 2, 2, ['UK', 'IE'], { g: 'stroller' }]] }],
    ['crib', 1, 1, { g: 'baby bed', al: [['cot', 'synonym', 1, 1, BRIT4, { g: 'baby bed' }]] }],
    ['baby bottle', 1, 1], ['rattle', 1, 1, { g: 'toy' }], ['onesie', 2, 2, { al: [['Babygro', 'synonym', 3, 3, ['UK'], BR()]] }], ['bib', 1, 1],
    ['high chair', 1, 1], ['cradle', 1, 2], ['car seat', 1, 2], ['baby monitor', 2, 2], ['playpen', 2, 2], ['moses basket', 3, 3, { reg: ['UK', 'AU', 'IE'] }],
    ['crawling', 1, 2, verb()], ['first steps', 1, 2], ['burp', 1, 2, verb({ g: 'baby' })], ['obstetrician', 3, 3], ['doula', 4, 4], ['amniotic fluid', 4, 4],
    ['colostrum', 4, 4], ['meconium', 5, 5], ['vernix', 5, 5], ['lanugo', 5, 5], ['caul', 5, 5], ['forceps', 3, 3], ['Apgar score', 5, 5, { type: 'proper' }],
    ['Braxton Hicks', 5, 5, { type: 'phrase' }], ['birthing pool', 3, 3], ['christening', 2, 3, { sens: true }], ['baby shower', 2, 2], ['gender reveal', 3, 3],
    ['fontanelle', 4, 4], ['maternity leave', 2, 2], ['breast pump', 3, 3], ['sleepsuit', 3, 3, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- fitness
  fitness: [
    ['exercise', 1, 1], ['workout', 1, 1],
    ['gym', 1, 1, { al: [['health club', 'synonym', 3, 3], ['fitness center', 'synonym', 2, 2, ['US']], ['fitness centre', 'spelling', 2, 2, ['UK', 'AU', 'NZ', 'IE', 'CA']]] }],
    ['training', 1, 2], ['cardio', 1, 1, { al: [['aerobic exercise', 'synonym', 3, 3]] }], ['strength', 1, 2], ['stamina', 2, 2, { al: [['endurance', 'synonym', 2, 2]] }],
    ['flexibility', 2, 2], ['warm-up', 2, 2], ['cool-down', 2, 2], ['rep', 2, 2, { g: 'exercise', al: [['repetition', 'synonym', 3, 3, [], { g: 'exercise' }]] }],
    ['set', 1, 3, { g: 'exercise' }], ['personal trainer', 2, 2, { al: [['PT', 'synonym', 3, 3, ['UK', 'AU'], { type: 'acronym' }]] }],
    ['treadmill', 1, 1, { al: [['running machine', 'synonym', 3, 3, ['UK']]] }], ['dumbbell', 1, 1, { al: [['free weights', 'synonym', 3, 3]] }], ['personal best', 2, 2],
    ['abs', 1, 1, { al: [['abdominals', 'synonym', 3, 3], ['six-pack', 'synonym', 1, 1]] }], ['core', 2, 2, { g: 'muscles' }], ['aerobics', 2, 1], ['pilates', 2, 2],
    ['bodybuilding', 2, 2], ['powerlifting', 3, 3], ['calisthenics', 3, 3, { al: [['callisthenics', 'spelling', 3, 3]] }], ['circuit training', 2, 2],
    ['interval training', 3, 3], ['HIIT', 3, 3, { type: 'acronym' }], ['spin class', 2, 2], ['protein shake', 2, 2], ['gym membership', 1, 2], ['fitness tracker', 2, 2],
    ['heart rate', 2, 2], ['BMI', 3, 3, { type: 'acronym' }], ['VO2 max', 4, 4], ['one-rep max', 4, 4], ['lactic acid', 3, 3], ['DOMS', 5, 5, { type: 'acronym' }],
    ['plateau', 3, 3, { g: 'fitness' }], ['rest day', 2, 2], ['cheat day', 3, 3], ['macros', 4, 3], ['pre-workout', 4, 4], ['creatine', 4, 4], ['gym rat', 3, 3],
    ['gym bunny', 4, 4, { reg: ['UK', 'AU', 'IE'] }], ['couch potato', 2, 3], ['bulking', 4, 4], ['cutting', 4, 4, { g: 'fitness' }], ['gains', 3, 3, { g: 'fitness' }],
    ['Fitbit', 2, 3, BR()], ['Peloton', 3, 3, BR()], ['CrossFit', 3, 3, BR()], ['Zumba', 2, 3, BR()], ['Weight Watchers', 2, 3, BR()],
    ['Parkrun', 4, 4, BR({ reg: ['UK', 'AU', 'IE', 'NZ'] })], ['step count', 2, 2], ['progressive overload', 5, 4], ['hypertrophy', 5, 4], ['sarcopenia', 5, 5],
  ],

  // ---------------------------------------------------------------- sleep
  sleep: [
    ['nap', 1, 1], ['bed', 1, 1], ['pillow', 1, 1], ['blanket', 1, 1],
    ['duvet', 2, 2, { reg: BRIT4, al: [['comforter', 'synonym', 2, 2, ['US', 'CA'], { g: 'bedding' }], ['quilt', 'synonym', 2, 2, [], { g: 'bedding' }]] }],
    ['mattress', 1, 1], ['sheet', 1, 2, { g: 'bed' }],
    ['pajamas', 1, 1, { al: [['pyjamas', 'spelling', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN', 'ZA']], ['PJs', 'synonym', 1, 1]] }],
    ['nightgown', 1, 2], ['dream', 1, 1, { g: 'sleep' }], ['nightmare', 1, 1], ['snore', 1, 1], ['insomnia', 2, 1, { al: [['sleeplessness', 'synonym', 3, 3]] }], ['yawn', 1, 2],
    ['lullaby', 2, 2], ['bedtime', 1, 1], ['alarm clock', 1, 2], ['sleepy', 1, 1, adj()], ['drowsy', 2, 2, adj()],
    ['snooze', 1, 2, verb({ al: [['doze', 'synonym', 2, 2, [], { g: 'sleep' }], ['nod off', 'synonym', 2, 2]] })],
    ['slumber', 2, 2], ['siesta', 2, 2], ['forty winks', 3, 3, { type: 'phrase', reg: ['UK', 'AU', 'IE'] }], ['kip', 3, 3, { g: 'sleep', reg: ['UK', 'AU', 'IE'] }], ['shut-eye', 3, 3],
    ['sleepwalking', 2, 2, { al: [['somnambulism', 'synonym', 5, 5]] }], ['hibernation', 2, 3], ['REM', 3, 3, { type: 'acronym' }], ['melatonin', 3, 3], ['circadian rhythm', 4, 3],
    ['night owl', 2, 2], ['jet lag', 2, 3], ['power nap', 2, 2], ['catnap', 2, 2], ['beauty sleep', 2, 2], ['lie-in', 3, 3, { reg: ['UK', 'AU', 'IE'] }], ['insomniac', 2, 2],
    ['hammock', 1, 3], ['sleeping bag', 1, 2], ['bunk bed', 1, 2], ['eye mask', 2, 2], ['earplugs', 2, 3], ['white noise', 3, 3], ['sleeping pill', 2, 2],
    ['sleep apnea', 3, 3, { al: [['sleep apnoea', 'spelling', 3, 3, BRIT4]] }], ['narcolepsy', 4, 3], ['somnolent', 5, 4, adj()], ['hypnagogic', 5, 4, adj()],
    ['Morpheus', 4, 4, { type: 'person' }], ['night terror', 3, 3], ['bedroom', 1, 2], ['bedclothes', 3, 3, { al: [['bedding', 'synonym', 2, 2]] }],
    ['deep sleep', 1, 1], ['light sleeper', 2, 2], ['counting sheep', 2, 2],
  ],

  // ---------------------------------------------------------------- personal care
  personal_care: [
    ['soap', 1, 1], ['shampoo', 1, 1], ['conditioner', 1, 1, { g: 'hair' }], ['toothbrush', 1, 1], ['toothpaste', 1, 1], ['floss', 2, 2, { g: 'dental' }], ['mouthwash', 2, 2],
    ['deodorant', 1, 1, { al: [['antiperspirant', 'synonym', 3, 3], ['roll-on', 'synonym', 3, 3, ['UK', 'AU']], ['deo', 'synonym', 3, 3, ['IN', 'ZA']]] }],
    ['razor', 1, 1], ['shaving cream', 1, 1], ['aftershave', 2, 2], ['perfume', 1, 1], ['cologne', 2, 2], ['lotion', 1, 1],
    ['moisturizer', 2, 2, { al: [['moisturiser', 'spelling', 2, 2, BRIT4]] }],
    ['sunscreen', 1, 1, { al: [['sunblock', 'synonym', 2, 2], ['suntan lotion', 'synonym', 2, 2, ['UK']]] }],
    ['lipstick', 1, 1, { al: [['lippy', 'synonym', 3, 3, ['UK', 'AU', 'IE']]] }], ['mascara', 1, 2],
    ['nail polish', 1, 1, { al: [['nail varnish', 'synonym', 2, 2, BRIT4]] }],
    ['comb', 1, 1], ['hairbrush', 1, 1], ['towel', 1, 2], ['shower gel', 1, 1, { al: [['body wash', 'synonym', 2, 2]] }], ['bubble bath', 1, 2],
    ['loofah', 3, 3, { al: [['luffa', 'spelling', 4, 4]] }],
    ['cotton bud', 2, 2, { reg: BRIT4, al: [['Q-tip', 'synonym', 2, 2, ['US', 'CA'], BR()], ['cotton swab', 'synonym', 2, 2, ['US']]] }],
    ['tweezers', 1, 2], ['nail clippers', 1, 2], ['nail file', 1, 2], ['hair dryer', 1, 1, { al: [['blow dryer', 'synonym', 2, 2, ['US']]] }], ['hair gel', 1, 1], ['hairspray', 1, 1],
    ['face wash', 1, 1], ['cleanser', 2, 2], ['toner', 3, 3, { g: 'skincare' }], ['serum', 3, 3, { g: 'skincare' }], ['exfoliator', 3, 3], ['face mask', 2, 2, { g: 'beauty' }],
    ['lip balm', 1, 2], ['cotton wool', 2, 2, { reg: BRIT4, al: [['cotton balls', 'synonym', 2, 2, ['US']]] }], ['talcum powder', 2, 2, { al: [['baby powder', 'synonym', 2, 2]] }],
    ['hand cream', 1, 1], ['foundation', 2, 3, { g: 'makeup' }], ['concealer', 3, 3], ['blusher', 3, 3, { al: [['blush', 'synonym', 2, 2, [], { g: 'makeup' }]] }], ['eyeliner', 2, 2],
    ['eyeshadow', 2, 2], ['pumice stone', 3, 3],
    ['washcloth', 2, 2, { al: [['flannel', 'synonym', 3, 3, ['UK'], { g: 'washcloth' }], ['face cloth', 'synonym', 2, 2]] }],
    ['dry shampoo', 3, 3], ['hair straightener', 2, 2, { al: [['flat iron', 'synonym', 3, 3, ['US']], ['GHDs', 'synonym', 4, 4, ['UK'], BR()]] }],
    ['curling iron', 2, 2, { al: [['curling tongs', 'synonym', 3, 3, ['UK']]] }], ['hair tie', 1, 2],
    ['bobby pin', 2, 2, { al: [['hair grip', 'synonym', 3, 3, ['UK']], ['kirby grip', 'synonym', 4, 4, ['UK']]] }],
    ['Colgate', 2, 3, BR()], ['Gillette', 2, 3, BR()], ['Vaseline', 2, 3, BR({ al: [['petroleum jelly', 'synonym', 3, 3, [], { tm: false, type: 'common' }]] })], ['ChapStick', 2, 3, BR()],
    ['micellar water', 4, 4], ['pomade', 4, 4], ['depilatory cream', 4, 4, { al: [['Veet', 'synonym', 3, 3, ['UK', 'AU', 'IN'], BR()]] }], ['tooth powder', 4, 4],
    ['pore strip', 4, 4], ['bath bomb', 2, 3], ['cuticle oil', 4, 4], ['styptic pencil', 5, 5], ['hair mousse', 3, 3], ['sponge', 1, 3, { g: 'bath' }],
  ],

  // ---------------------------------------------------------------- nutrition
  nutrition: [
    ['protein', 1, 1], ['carbohydrate', 2, 1, { al: [['carbs', 'synonym', 1, 1]] }], ['fat', 1, 2, { g: 'nutrient' }],
    ['fiber', 2, 2, { al: [['fibre', 'spelling', 2, 2, BRIT], ['roughage', 'synonym', 3, 3, ['UK']]] }],
    ['vitamin', 1, 1], ['mineral', 2, 2, { g: 'nutrient' }], ['calorie', 1, 1, { al: [['kilojoule', 'synonym', 3, 3, ['AU', 'NZ']]] }], ['calcium', 1, 2],
    ['sugar', 1, 2], ['salt', 1, 3], ['sodium', 3, 2], ['cholesterol', 2, 2], ['antioxidant', 3, 2], ['omega-3', 3, 3], ['probiotic', 3, 3], ['organic', 2, 3, adj({ g: 'food' })],
    ['vegan', 1, 3, adj()], ['vegetarian', 1, 3, adj()], ['gluten-free', 2, 3, adj()], ['balanced diet', 1, 1], ['food pyramid', 2, 2], ['serving size', 2, 2],
    ['nutrition label', 2, 2, { al: [['nutrition facts', 'synonym', 2, 2, ['US']]] }],
    ['portion', 2, 3], ['macronutrient', 4, 2], ['micronutrient', 4, 2], ['metabolism', 2, 2], ['appetite', 1, 3], ['hydration', 2, 2], ['dehydration', 2, 3], ['malnutrition', 2, 2],
    ['intermittent fasting', 3, 3], ['keto', 2, 3, { al: [['ketogenic diet', 'synonym', 3, 3]] }], ['paleo', 3, 3], ['whole grain', 2, 2], ['saturated fat', 2, 2], ['trans fat', 3, 3],
    ['glycemic index', 4, 4, { al: [['glycaemic index', 'spelling', 4, 4, BRIT4]] }], ['amino acid', 3, 2], ['electrolyte', 3, 3],
    ['folate', 4, 4, { al: [['folic acid', 'synonym', 3, 3]] }],
    ['dietitian', 3, 2, { al: [['dietician', 'spelling', 3, 2], ['nutritionist', 'synonym', 2, 2]] }], ['RDA', 4, 4, { type: 'acronym' }], ['ketosis', 4, 4], ['junk food', 1, 2],
    ['processed food', 2, 2], ['empty calories', 3, 3], ['five a day', 3, 3, { type: 'phrase', reg: ['UK'] }], ['fortified', 3, 3, adj()], ['starch', 2, 3], ['lipid', 4, 4],
    ['glucose', 3, 3], ['fructose', 3, 4], ['lactose', 3, 3], ['trace element', 4, 4], ['superfood', 2, 2], ['bioavailability', 5, 5], ['phytochemical', 5, 5],
    ['beta-carotene', 4, 4], ['thiamine', 5, 5], ['riboflavin', 5, 5], ['niacin', 4, 4], ['essential fatty acids', 4, 4, { type: 'phrase' }], ['complete protein', 4, 4], ['kwashiorkor', 5, 5],
    ['basal metabolic rate', 4, 4, { type: 'phrase' }], ['gut health', 3, 3],
  ],
};

export const ALIASES = [];
