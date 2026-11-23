// Same-text root pairs that are two real senses, so the sense-twin and sense-link checks (js/validate.js) do not report them.
// Key: smallerId|largerId for the pair, or smallerId|largerId|themeId for one theme only (the "linked on the wrong sense?" form).
// Add a line only after a person has checked the two are different senses and each is linked in the right themes.
export const SENSE_OK = new Set([
  '35680|36577|island_nations',  // Malta [country] is right in island nations (Simon, 2026-11-23, v437)
  '35766|36586|island_nations',  // Fiji [country] is right in island nations (Simon, 2026-11-23, v437)
  '35772|36599|island_nations',  // Mauritius [country] is right in island nations (Simon, 2026-11-23, v437)
  '36576|68202|island_nations',  // Cyprus [country] is right in island nations (Simon, 2026-11-23, v437)
  '35915|36091',                 // Memphis [city] (Tennessee) and Memphis [ancient city] (Egypt): two cities (Simon, 2026-11-23, v437)
  '38308|38415|parts_of_a_road', // lane [traffic] is the part of a road; lane [road] the road type (Simon, 2026-11-23, v437)
  '2066|68180|nuclear_power_plant',          // plumbago [graphite] is right in nuclear power plant (Simon, 2026-11-23, v436)
  '30011|30097|things_that_fall_from_trees', // buckeye [nut] is what the tree drops (Simon, 2026-11-23, v436)
]);
