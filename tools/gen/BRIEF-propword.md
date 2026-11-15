# Proper words inside common entries: capital or not

Library pass of 2026-11-15 (ISSUES.md T14). The library's rule for capitals: **a word is written the way it is correctly written for the sense it has.**
A capital is for a proper noun (person, place, brand, organisation, nationality or language word, title, named period, festival, deity), an acronym or a
letter-shaped term (X-ray, T-bar). Everything else is lowercase. **A phrase that contains a proper word keeps the capital on that word and the entry is
typed `proper`**: `French toast`, `German shepherd`, `Danish pastry`, `Dutch oven`, `Brussels sprouts`, `Bramley apple`, `eggs Benedict`, `baked Alaska`.
About 300 entries already follow this; the entries in your list are typed common (or phrase) and may break it in one of three ways.

## Input

`tools/gen/propword/list-N.txt`, one entry per line, tab-separated:
`id`, `group`, `text`, `meaning label`, `type` (with `alias of "root"` when it is another name of a root entry), `shown texts` (shorter texts some themes
show instead of the entry text, separated by ` | `), `suspect words`, `some of its themes`.

Groups:
- `A` the text already has a capitalised word but the entry is typed common: is the capital right?
- `B` the text is lowercase but a theme shows a short text with a capital (`vidalia onion` shown `Vidalia`): which is right?
- `C` the text is lowercase and one of its words also exists in the library as a name (`french fries`, `yorkshire terrier`). Many of these are
  false hits where the word is just an ordinary word (`wild rice`, `death cap`, `traffic warden`, `lady beetle`).

## Decide, per line, one verdict

- `P` the entry contains a proper word. Give the whole entry text with the correct capitals: `french fries` -> `French fries`, `yorkshire terrier` ->
  `Yorkshire terrier`, `black forest cake` -> `Black Forest cake`, `sauce robert` -> `sauce Robert`, `norwegian forest cat` -> `Norwegian Forest cat`.
  Only the proper words get a capital; the rest stays lowercase. If the text is already right (group A: `baked Alaska`), repeat it unchanged: the entry
  will be retyped proper.
- `C` no proper word: the entry is an ordinary word or phrase and is written lowercase. Give the text in lowercase. Use this in group A when the
  capital is wrong (`Cinnamon` the spice -> `cinnamon`, `Genoise` -> `genoise`), and in group B when the shown capital is wrong.
- `K` keep exactly as it is: it is already right and has no proper word in it. This is the verdict for the false hits of group C (`wild rice`), for a
  letter or code written as a capital (`class A`, `vitamin C`), and for text in another language whose own spelling has the capital (`auf Wiedersehen`).
- `X` something else is wrong and case alone does not fix it: the entry is linked for the wrong meaning, the shown text is a different word, it is a
  trademark that is not flagged, two entries should be one. Say what in the note.
- `?` you cannot decide. Say why in the note. Prefer this to a guess; a person settles these.

## How to decide between P and C

Follow mainstream dictionary usage (Merriam-Webster, Oxford, Collins) for the sense given by the meaning label and the themes.
- **Where dictionaries capitalise, or disagree, or give both forms: `P`, keep the capital.** The library already writes `French toast`, `Danish pastry`,
  `Turkish delight`, `Brussels sprouts`, `Swiss cheese`, so `french fries`, `irish stew`, `persian cat`, `bermuda shorts`, `brazil nut`, `easter egg`
  become `P`.
- **`C` only where dictionaries agree on lowercase** because the word has stopped being felt as a name in that phrase: `venetian blind`, `manila folder`,
  `china clay`, `plaster of paris`, `morocco leather`, `alpine skiing`, `italic type`, `roman type`. (`French kiss` is not one of these: dictionaries
  capitalise it.) If you are not sure dictionaries agree on lowercase, it is `P`.
- Breed, variety and species names keep the capital of the place or person in them: `Yorkshire terrier`, `Maine coon`, `Cornish rex`, `Texas longhorn`,
  `Greenland shark`, `Colorado beetle`, `Hercules beetle`, `Aleppo pepper`, `Vidalia onion`.
- Dishes and drinks named after a place or person keep it: `Irish stew`, `Cobb salad`, `Brunswick stew`, `Black Forest cake`, `eggs Benedict`.
- A word that only looks like a name is not one: `wild`, `death`, `traffic`, `lady`, `lunar`, `southern`, `sergeant`, `matter`, `tool` in ordinary
  phrases are `K`. Compass and season words are lowercase unless part of a real place name.
- Styles, periods and movements: a named historical period or style keeps its capital (`Byzantine art`, `Gothic architecture`, `Victorian house`,
  `Roman numerals`); a generic style word does not (`colonial` as a loose description, `gothic` for the music subculture). If the list gives no way to
  tell which is meant, use `?`.
- Trademarks: if the capital belongs to a brand name the entry is not flagged for (`Frisbee`, `Jacuzzi`), use `X` with the note `trademark`.
- Do not change spelling, hyphens, spaces or accents. `P` and `C` may change only the case of letters. If the spelling itself is wrong, use `X`.

## Output

Write `tools/gen/propword/out-N.txt` (same N as your list): one line per input line, in the same order, every id exactly once, tab-separated:

`id <TAB> verdict <TAB> text <TAB> note`

- `text` is required for `P` and `C` (the full entry text as it should be stored) and left empty for `K`, `X`, `?`.
- `note` is required for `X` and `?`, optional otherwise (use it when the verdict is not obvious).

Edit no other file. Do not run any script under tools/. You may read the library (`data/wordlist-en.project.json`, one entry per line, large: search it,
do not load it whole) to see an entry's other fields or to look at similar entries.
