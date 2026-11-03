# Brief: check how well known each word is (`rec`)

A word-sorting game picks words by how well known they are (`rec`, 1 to 5). The ratings so far were set by agents that compared mostly against word-frequency lists, and those are weak for names (people, places, organisations, titles, acronyms): a famous name can be rare in text and the other way round. Your listing is a chunk of such entries. Check each rating and correct the ones that are wrong.

Listing lines: `<id> | <text> [<meaning label>] | <type> | rec <current> | <up to two themes> | z<Zipf score or ->`. The Zipf score is only a hint (7 is "the", 5 everyday, 3 uncommon, 2 rare); it is often missing or misleading for names.

## The scale (a typical adult player of an English-language game, US and UK mostly)
- 1 every child and adult knows it (Mickey Mouse, London, Elvis Presley, Africa, Santa Claus)
- 2 nearly every adult (Cleopatra, Leonardo da Vinci, Mount Everest, the Nile, Tokyo, NASA)
- 3 many adults, not all (Tutankhamun, Frida Kahlo, Timbuktu, the Pyrenees, UNESCO)
- 4 people with the interest, job or region (Hatshepsut, Lake Titicaca, a county town, a minor league team)
- 5 few people (an obscure official, a village, a specialist organisation)

Rules:
- Rate what a typical adult actually knows, not how important the thing is. Be conservative: between two ratings pick the harder one.
- A name is rated as the name: `Washington [state]` and `Washington [person]` are different entries with their own ratings.
- Regional names (a UK or Australian TV show, a US state park) are rated for a general player of this game, so they are usually harder than for locals.
- Change a rating only when you are confident it is wrong by at least one step. Leave everything else out of the file: most lines will be fine.
- Do not change anything else (text, labels, themes).

## Output
ONE file `tools/gen/rec/r-<n>.txt` (n is given in your task). One line for each entry whose rating should change: `<id> <new rec 1-5>`. Nothing else in the file: no comments. Read the whole listing; do not skip lines or stop early. If nothing needs changing, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, how many lines you wrote, how many went easier and how many harder, and the kinds of names you most often corrected.
