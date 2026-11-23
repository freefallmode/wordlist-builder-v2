// Theme pairs that share most of their words on purpose (a true subset kept as its own theme: planets in things in space), so the
// theme-twin and xwords-twin checks (js/validate.js) do not report them. Key: themeIdA|themeIdB, the two ids in sorted order.
// Add a line only after a person has decided both themes stay.
export const THEME_TWIN_OK = new Set([
  'chemical_elements|precious_elements', // precious metals: a subset of the elements kept as its own theme (Simon, 2026-11-23, v436)
  'fruits|jam_flavours',                 // jam flavors: a flavors theme; its words are fruits by nature (Simon, 2026-11-23, v434)
  'green_vegetables|vegetables',         // green vegetables: a color property theme, a subset of vegetables kept on purpose (Simon, 2026-11-23, v434)
  'rain_words|weather',                  // rain words: a sub-topic of weather, not a same-topic twin (Simon, 2026-11-23, v436)
]);
