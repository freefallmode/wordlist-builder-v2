# Brief: which everyday words are really difficulty 1

A word-sorting game shows four words from a theme and the player sorts each into its theme. The easy levels at the start need themes with plenty of words that are difficulty 1: words every child and adult recalls at once. A word's difficulty is the harder of its familiarity (`rec`: how well known the word is) and its typicality (how readily it comes to mind for THIS theme). Earlier reviews picked the harder rating when unsure, so some plainly common words sit at 2. Your listing is words at difficulty 2 in themes that need more difficulty-1 words. Find the ones that should be 1.

Listing: `T <theme id> | <name> | <word count> | <n> at difficulty 1`, then `EASY ALREADY:` (words already at 1, for the standard), then one line per difficulty-2 word: `<entry id> | <shown text> [<meaning>] | <type> | familiarity <rec> | typicality <1-5 or ->`.

## What difficulty 1 means
- Familiarity 1: every child and adult knows the word (apple, doctor, Santa Claus, London). Everyday vocabulary a six-year-old uses.
- Typicality 1: one of the first words anyone names for the theme (apple for fruits, stethoscope for a hospital).
- Difficulty 2 is "nearly every adult" or "a typical, but not first, member". Leave those.

## Decide per word
- Familiarity 2 and typicality 1 or `-`: lower familiarity only if the word itself is plainly everyday (`R`).
- Familiarity 1 and typicality 2: lower typicality only if the word is one of the first things anyone names for THIS theme (`I`).
- Both 2: both only if it clearly meets both tests (`RI`).
- Be strict. The aim is not a quota: write nothing for a word that is a fair 2. Peripheral members, specialist words, named things a child would not know, regional words and long phrases stay at 2.
- Test: would a typical 8-year-old recognise the word, and would an adult list it among the first ten things for this theme?

## Output
ONE file `tools/gen/ease/e-<n>.txt` (n is given in your task). One line per change: `<entry id> <theme id> <R|I|RI>`. A `#` comment line is allowed. Read the whole listing. If nothing changes, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, how many changes, split R / I / RI, and the themes with the most.
