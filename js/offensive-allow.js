// Entries that contain an offensive word but are not offensive, so the offensive-word check (js/validate.js) does not report them:
// a phrase that names something harmless (witch hazel, devil ray, volume knob), DESIGN-entries.md 3.8.
// Key: the entry id. Add a line only with Simon's approval, with the text as a comment.
export const OFFENSIVE_OK = new Set([
  57190,   // Lesbos (Greek islands): read as the plural of "lesbo" (Simon, 2026-11-22)
]);
