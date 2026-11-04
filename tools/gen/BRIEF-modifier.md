# Brief: bare modifiers in "kinds of X" themes

A word-sorting game shows four words from a theme and the player sorts each into its theme. Some themes collect kinds of one thing (teas, swans, rocks, line types). Some members are linked as a BARE MODIFIER: the entry is `green` with the meaning label `[tea]`, so its ratings, part of speech and flags describe the word `green`, not the thing the player is asked to recognise (green tea). We are moving such links to an entry for the full term (`green tea`), shown in the theme as the short word (`green`).

Listing (`tools/gen/compound/m-list-<n>.txt`): `T <theme id> | <theme name>`, then one line per link: `<bare entry id> | <text> [<label>] <pos> <type> rec <n> link <n> | EXISTS: <entry description> or NEW (<candidate full terms>)`. The label names the head noun the theme collects.

## Decide per link: keep (K), fix (N or U), or drop (D)
- **K (keep):** the bare word on its own already means the thing, so a player who sees it knows what it is: `pine` (a tree), `tote` (a bag), `leatherback` (a turtle), `Pacific` (the ocean), `danish` (a pastry), `Manchester`, saints named by first name. Most links are K. Also K when the label is only a classification and the theme is not about kinds of the head noun.
- **Fix:** the bare word is a modifier that does not mean the thing without the head noun: `green`, `herbal`, `bubble` (tea); `mute`, `black` (swan); `coral`, `garter` (snake); `igneous` (rock); `solid`, `broken` (line); `prime`, `composite` (number); `rip` (current); `thoracic` (spine). The full term is a real, normal term people say as a unit.
- **D (drop):** the full term is not a real term.
- If the entry is EXISTS and means the same thing, use `U`; if it is a different meaning, treat as NEW.

## Scales (for the FULL TERM)
- `rec` familiarity: 1 every child and adult knows it (green tea), 2 nearly every adult, 3 many adults, 4 people with the interest or job, 5 few people. Be conservative: pick the harder rating when unsure.
- `in` typicality of the full term for this theme: 1 one of the first words anyone names, 2 common member, 3 recognised but not first, 4 peripheral, 5 real but rare. Difficulty is the harder of `rec` and `in`; do not combine them yourself.
- Flags (adult, sensitive, tm, vulgar) and region are set from the FULL TERM. Region only if clearly confined (UK-only etc.).
- Full term text as written in a dictionary (`green tea`, `black swan`, `rip current`, `solid line`), part of speech (noun for nearly all), type (common; proper for a name), 1 to 4 words, at most 20 characters, a short meaning label only if the text has other common meanings.

## Output
ONE file `tools/gen/compound/m-<n>.txt` (n given in your task). One line per link; read the whole listing, never skip a link:
- `K <bare id> <theme id>`
- `D <bare id> <theme id>`
- `U <bare id> <theme id> <existing id> | <in>` (optionally `| fix <field>=<value>` for clearly wrong fields)
- `N <bare id> <theme id> | <full term> | <pos> | <type> | <rec> | <in> | <flags or -> | <region or -> | <meaning label or ->`

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, counts of K, D, U and N, and anything odd.
