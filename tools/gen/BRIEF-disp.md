# Theme display names

Each line of `tools/gen/disp/list-N.txt` is `themeId <TAB> name`. Names are stored in lowercase. For every name that contains a proper noun
(places, nationalities, languages, people, brands, holidays, days, months, religions, named works) or an acronym/initialism, write its
display form: the SAME words in the same order, only capitals changed (`us states` -> `US states`, `african food` -> `African food`,
`new england states` -> `New England states`, `japanese sweets` -> `Japanese sweets`, `world war ii words` -> `World War II words`,
`tv shows` -> `TV shows`, `dc superheroes` -> `DC superheroes`). Do NOT capitalise the first word just because it starts the name, and do not
change, add, drop or reorder any word, spelling or punctuation. Names with no proper noun or acronym (`big cats`, `rain words`) get no line.
Brand names use their usual styling (`iPhone`, `McDonald's`); `ends with`/`starts with` wordplay themes: leave the quoted letters as they are.
Write `tools/gen/disp/r-N.txt`: `themeId <TAB> display`, only for names that change. Edit no other file.
