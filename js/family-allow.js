// Word-family pairs kept as separate answers on purpose, so the family checks (family-pair, family-kin) do not report them (DESIGN-entries.md 3.7).
// Key: smallerId|largerId|themeId for one theme, or smallerId|largerId for every theme. Add a line only after a person has decided the pair stays apart.
// Themes where the form is the point as a whole (male/female titles, tenses, anagrams) are marked familyOk on the theme instead.
export const FAMILY_OK = new Set([
  '3682|3686|sleep', // sleeplessness / sleepy in sleep: opposite senses; both in groups already (v398 keep apart)
  '3682|3686|sleep_words', // sleeplessness / sleepy in sleep words, as in sleep (v398)
  '966|39566|things_that_pop', // bubbly (champagne) / bubble in things that pop: different things; both in groups already (v398)
]);
