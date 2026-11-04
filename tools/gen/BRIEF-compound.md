# Brief: compound themes, rate the full term

A word-sorting game shows four words from a theme and the player sorts each into its theme. In a compound theme ("___ room", "fire ___") the player sees the short word (break) and decides it completes the shared word (break room). So the thing being tested is the FULL TERM, and its ratings, part of speech and flags must describe the full term, not the bare word. Until now the theme linked the bare word's entry (`break`), whose ratings describe the word alone. We are moving each link to an entry for the full term, shown in the theme as the short word.

Listing: `T <theme id> | <name> | <pattern>`, then one line per member: `<bare entry id> | <shown word> -> <full term> | bare: <id> [<meaning label>] <pos> <type> rec <n> flags <list> region <list> in <n> themes, link <current link rating> | NEW` or `EXISTS: <entry description>` (an entry with the full term's exact text is already in the library; check that it means the same thing) or `CLOSED (already the full term)` (write nothing for CLOSED lines).

## Scales
- `rec` (familiarity of the FULL TERM): 1 every child and adult knows it (tea room, bedroom, lunch time), 2 nearly every adult (panic room, war room), 3 many adults (elbow room, ward room), 4 people with the interest or job, 5 few people (char room).
- `in` (typicality: how readily the full term comes to mind for this compound set): 1 one of the first words anyone names, 2 a common member, 3 recognised but not first, 4 peripheral, 5 real but rare. Difficulty is the harder of `rec` and `in`; do not combine them yourself.
- Be conservative where unsure: pick the harder rating.

## Decide per member
- Is the full term a real, normal term people say (open compound, hyphenated or closed)? If not, drop the link.
- `EXISTS`: if the existing entry means the same thing, keep it and give only the link rating `in`. Report a field only when it is clearly wrong (a wrong part of speech, type, flag, or a rec that is clearly out). If it is a different meaning, treat the member as NEW.
- `NEW`: give the full term's text (as written in a dictionary: `break room`, `break-in` if hyphenated, `firebreak` if closed; the compound spelling people use), its part of speech (noun, verb, adjective, adverb, other), its type (common, phrase for a multi-word idiom or fixed expression; proper for a name; other types as in the library), rec, in, flags, region and a short meaning label only if the text has other common meanings.
- Flags (adult, sensitive, tm, vulgar) and region are set from the FULL TERM, not copied from the bare word. A word that is harmless alone can make a sensitive term (crack house) and the other way round. Trademarks: only if the term itself is a trademark.
- The text must be 1 to 4 words and at most 20 characters.

## Output
ONE file `tools/gen/compound/c-<n>.txt` (n is given in your task). One line per member (skip CLOSED lines), in one of these forms:
- `D <bare id> <theme id>`: drop the link (the full term is not a real term).
- `U <bare id> <theme id> <existing id> | <in>`: use the existing entry; `in` is the link rating. Add `| fix <field>=<value>` (repeatable, for clearly wrong fields only: pos, type, rec, adult, sensitive, tm, vulgar, region).
- `N <bare id> <theme id> | <full term> | <pos> | <type> | <rec> | <in> | <flags or -> | <region or -> | <meaning label or ->`.
`#` comment lines are allowed. Read the whole listing. Never skip a member.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, counts of D, U and N lines, how many `fix` lines, and anything odd.

## Decisions from the pilot (apply them)
- Drop loose phrases that are only an ordinary word plus the shared word (good time, last time, some time): keep a member only if the full term is a fixed term people use as a unit.
- Set a region only if the term is clearly confined to it (a UK-only term like "box room"); terms used in both the US and UK carry no region (break time).
- Dictionary spellings are fine as written: open (break room), hyphenated (part-time) or closed (wardroom, firearm).
