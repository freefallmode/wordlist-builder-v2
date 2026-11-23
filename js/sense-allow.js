// Same-text root pairs that are two real senses, so the sense-twin and sense-link checks (js/validate.js) do not report them.
// Key: smallerId|largerId for the pair, or smallerId|largerId|themeId for one theme only (the "linked on the wrong sense?" form).
// Add a line only after a person has checked the two are different senses and each is linked in the right themes.
export const SENSE_OK = new Set([
  '2066|68180|nuclear_power_plant',          // plumbago [graphite] is right in nuclear power plant (Simon, 2026-11-23, v436)
  '30011|30097|things_that_fall_from_trees', // buckeye [nut] is what the tree drops (Simon, 2026-11-23, v436)
]);
