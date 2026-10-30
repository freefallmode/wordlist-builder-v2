# Brief: second look at words kept under their theme's name

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme; a theme's name is shown only when the theme is complete. A word that contains a word from its theme's name gives the theme away ("tomato soup" in "soups"). Two earlier passes replaced the easy ones, but a first reviewer kept about 5,000 entries under their full name, many of them too readily ("when in doubt, keep"). Your chunk lists those kept entries. Decide again, and this time make each keep EARN its place.

## The test
**The question to ask: "what type/kind of <the category> is it?" If the bare word is a natural answer, it is an S.** What type of shark? Bull. What type of cheese? Blue. What type of tea? White, green, herbal, bubble. What type of pie? Apple. What type of flour? Millet. What type of eggs? Scrambled. What kind of coffee? Irish. It does not matter that the bare word also means something else on its own: in the category it is the natural answer. It fails only when it is not a natural answer to that question ("what type of fruit? dragon" is wrong, "what type of apple? dried" is wrong).

Cover the theme name. Take the text with the theme-name word removed (the listing gives it as `shorter`). Ask two questions:

1. **Would people really call the thing that?** If someone says "I had a canary", "pass me the Erie" or "I'll have the white" (tea) meaning this exact thing, the bare form works. Within a category the distinguishing word alone is the normal shorthand: black, green, white, bubble, herbal for teas; blue for cheese; oyster for mushrooms; tiger and bull for sharks.
2. **Would the player still place it here?** The 4 words of a theme are shown together with 4-word sets from other themes, so siblings named the same way make each other clear (black, green, white, herbal read as teas; canary, musk, honeydew as melons). A bare word that is ambiguous on its own is FINE when it is the usual shorthand and its siblings are alike. It fails only when it points to nothing or is not how anyone shortens the name.

- **S** (replace by the shorter form or another real name) when both answers are yes, or when a different well-known name for the same thing has no theme-name word. Examples: `canary melon` -> `canary`, `musk melon` -> `musk`, `Lake Erie` -> `Erie`, `emperor penguin` -> `emperor`, `hospital gown` -> `gown`, `pigeon loft` -> `loft`, `quad stretch` -> `quad`, `shaving brush` -> `brush`, `crane shot` -> `crane`.
- **K** (keep) only when you can say in a few words why the shorter form fails. Valid reasons:
  - *fixed name*: the full text is one name and the rest is not used alone: `dried apple` (bare "apple" is just a fruit), `dragon fruit`, `passion fruit`, `food truck`, `pad thai`, `vitamin D`, `Pacific Ocean`.
  - *not a shortening*: nobody uses the bare form for this thing, so it would be a different thing or nonsense: `dried apple` ("apple" is the fruit, not dried), `dragon fruit` ("dragon" is never fruit), `milk snake`, `pill bug`. This is NOT satisfied just because the bare word has another, more common meaning: if people do say it for this thing in the category (white tea -> white, blue cheese -> blue, bull shark -> bull), replace it.
  - *nothing left*: the name word is the whole identity (`secondary colors`, `theme song`).
  - *name word is the head noun and no other word names it*: `rock candy`, `measuring cup`.
- A K line carries the reason as a trailing `# reason` of 2-6 words, e.g. `K 41234 # nobody says dragon for it`. "Bare word means something else" is not a reason on its own. If you cannot name a valid reason, it is an S.
- Do not keep because the full name "sounds more natural", "is more precise" or "is how it appears in a dictionary". Real people say the short form; the full form is what leaks.
- Do not be reckless in the other direction: never write a bare form that nobody uses for this thing (`pen name` -> `pen` is wrong, `Ice Age` -> `Ice` is wrong), and never leave only a function word, number or very short fragment.
- Never use D. Never write a new text that still contains a word of the theme name. Never invent names. Aliases are not listed; do not touch them.
- If the theme is wordplay where sharing the word is the whole point (words that start with / end with / contain, hidden words, rhymes, "___ fire" compounds), write `T <id> OK` alone for it.

## Listing
`node tools/gen/leak-make.mjs --kept <n>` (n is given in your task). Per theme: path, flags, note, the forbidden name words, a few other words from the theme, then each kept entry: `<id> <text> (<label>) | pos type | rec r pop p | root | in N themes | shorter: "<bare form>" | existing "<text>": <ids with labels>`. The `shorter` form is mechanical and sometimes poor (it can leave an article, a stray adjective or nothing). If an entry of that text with the right meaning exists, replace by it with `=`. If the text already exists with other meanings, the new entry needs a short meaning label (never containing the theme name). If the entry is in several themes, the replacement applies only to the theme you are looking at; it keeps its other links under its full name.

## Pairs: the bare word AND another name
When you replace by a different well-known name (baking soda -> bicarb, green bean -> haricot vert, killer whale -> orca) and the bare word also passes the test (soda, green, killer), make the BARE word the S and add the other name on an `A` line right below it. The full original name stays as an alias automatically. Skip the A line when the bare word fails the test or there is no other name.

## Output
ONE file `tools/gen/leak/k3-<n>.txt`. For every theme in the chunk, in order:
```
T <themeId>
S <id> = <existing entry id>
S <id> | <new text> | <meaning label or -> | <rec 1-5>
A | <another name for the entry above> | <meaning label or -> | <rec 1-5>
K <id> # reason # reason
```
or `T <themeId> OK` alone. One line for EVERY entry listed under the theme. `rec` = how well known the new text is as that thing (1 every child ... 5 few people). Nothing else in the file: no other comments.

## Test it
Work on a scratch copy; never run the apply script on the real library:
```
cp data/wordlist-en.project.json tools/gen/leak/.scratch-k3-<n>.json
node tools/gen/leak-apply.mjs tools/gen/leak/k3-<n>.txt --kept --lib tools/gen/leak/.scratch-k3-<n>.json
```
It must report no PROBLEM lines. Fix and re-run until it does. Delete the scratch file and its .kept-done.json when done. Do NOT edit the real library, anything under js/, or other agents' files, and do NOT commit.

## Report (under 80 words)
File path, themes, counts of S / K / OK, the most common K reason, and any theme you were unsure about.
