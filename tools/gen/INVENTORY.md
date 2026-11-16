# tools/gen inventory

What every script, brief and data folder in tools/gen is, and whether anything still uses it. Made on 2026-11-15 at library v366 (commit 6a15bee) by an audit agent from static reading only: no script was run. The manager spot-checked the items quoted in ISSUES.md (G1 to G8); the rest is unverified. "Spent" means no document or live script refers to it any more, not that it has been judged safe to delete.


## 1. Size and file count

```
group | tracked n | tracked MB | untracked n | untracked MB
(top) .json | 3 | 0.19 | 0 | 0.00
(top) .md | 45 | 0.36 | 0 | 0.00
(top) .mjs | 281 | 3.03 | 1 | 0.00
(top) .txt | 4 | 0.15 | 0 | 0.00
.tmp/ | 0 | 0.00 | 43 | 55.45
aliaslinks/ | 2 | 0.02 | 0 | 0.00
bare/ | 5 | 0.05 | 0 | 0.00
bare2/ | 39 | 0.28 | 0 | 0.00
brk/ | 49 | 0.64 | 0 | 0.00
capmark/ | 13 | 0.07 | 0 | 0.00
complete/ | 2 | 0.02 | 0 | 0.00
compound/ | 26 | 0.51 | 0 | 0.00
disp/ | 13 | 0.15 | 0 | 0.00
disp2/ | 13 | 0.10 | 0 | 0.00
ease/ | 17 | 0.09 | 0 | 0.00
easy/ | 14 | 0.07 | 0 | 0.00
ends/ | 27 | 0.05 | 0 | 0.00
full/ | 4 | 0.01 | 0 | 0.00
full2/ | 8 | 0.05 | 0 | 0.00
full3/ | 2 | 0.00 | 0 | 0.00
ident/ | 52 | 0.55 | 0 | 0.00
ident2/ | 52 | 0.58 | 0 | 0.00
kind/ | 13 | 0.46 | 0 | 0.00
leak/ | 111 | 1.31 | 7 | 0.01
lone/ | 18 | 0.16 | 0 | 0.00
long/ | 49 | 1.32 | 0 | 0.00
overlap/ | 29 | 0.67 | 0 | 0.00
overlap2/ | 25 | 0.33 | 0 | 0.00
overlap3/ | 39 | 0.97 | 0 | 0.00
pop/ | 169 | 1.77 | 0 | 0.00
pos/ | 38 | 1.74 | 0 | 0.00
rec/ | 13 | 1.21 | 0 | 0.00
recon/ | 10 | 0.10 | 0 | 0.00
regalias/ | 32 | 0.27 | 0 | 0.00
regrec/ | 21 | 0.22 | 0 | 0.00
regtag/ | 17 | 0.42 | 0 | 0.00
rename/ | 24 | 0.56 | 0 | 0.00
shortmem/ | 21 | 4.47 | 0 | 0.00
shortmem2/ | 18 | 0.15 | 0 | 0.00
split/ | 23 | 0.29 | 0 | 0.00
starts/ | 19 | 0.04 | 0 | 0.00
syn/ | 56 | 0.05 | 0 | 0.00
syn2/ | 4 | 0.01 | 0 | 0.00
syn3/ | 48 | 1.99 | 0 | 0.00
TOTAL tracked 1468 25.47 untracked 51 55.46
```

Top 30 largest files:
```
7.13 U tools/gen/.tmp/pre-syn.json
6.97 U tools/gen/.tmp/before-show.json
6.88 U tools/gen/.tmp/before-syn.json
6.88 U tools/gen/.tmp/before-syn-full.json
6.88 U tools/gen/.tmp/pre210.json
6.87 U tools/gen/.tmp/before-reg.json
6.85 U tools/gen/.tmp/pre-kept.json
6.84 U tools/gen/.tmp/pre.json
4.43 T tools/gen/shortmem/candidates.json
0.72 T tools/gen/long/all.json
0.20 T tools/gen/rec/list-1.txt
0.19 T tools/gen/rec/list-3.txt
0.18 T tools/gen/rec/list-4.txt
0.18 T tools/gen/rec/list-2.txt
0.18 T tools/gen/rec/list-5.txt
0.18 T tools/gen/long-names-list.md
0.18 T tools/gen/pop/metrics.tsv
0.17 T tools/gen/rec/list-6.txt
0.16 T tools/gen/leak/dropped.md
0.15 T tools/gen/brk/tokens.txt
0.12 T tools/gen/pos/list-2.txt
0.12 T tools/gen/pos/list-1.txt
0.12 T tools/gen/case-scan.json
0.12 T tools/gen/pos/list-3.txt
0.12 T tools/gen/pos/list-11.txt
0.11 T tools/gen/pos/list-6.txt
0.11 T tools/gen/pos/list-4.txt
0.11 T tools/gen/pos/list-10.txt
0.11 T tools/gen/pos/list-8.txt
0.11 T tools/gen/split/report.md
```

## 2. Scripts (302 .mjs in tools/gen)

Class totals: ONE-OFF 73 (0.20 MB), UNREFERENCED 65 (0.15 MB), BATCH 149 (2.75 MB), PIPELINE 15 (0.02 MB)

BATCH by family: level-2 root batch (<root>.mjs): 14; d3-*: 67; d45-*: 25; easy/easy-N: 5; other batch: 5; r-* (fix rounds): 9; t-N: 24  (pop1-link.mjs exports DATA but also reads/writes the library, so it is counted as ONE-OFF / UNREFERENCED, not BATCH).

### PIPELINE

| script | first commit (date, library version) | last touched | evidence |
|---|---|---|---|
| audit-apply.mjs | 2026-10-30 v97 | 2026-11-06 | DESIGN s12: applies audit results |
| audit-make.mjs | 2026-10-30 v97 | 2026-11-06 | DESIGN s12: lists single unlabelled entries in unrelated roots; reads recon/audited-ids.json |
| find-word.mjs | 2026-10-30 v88 | 2026-10-30 | DESIGN s12: shows existing entries of a text; named in BRIEF-depth3/rest/easy, REPAIR-BRIEF |
| lint-show.mjs | 2026-11-15 v363-365 | 2026-11-15 | named in CAPITAL-RULE.md and 9 creation briefs (depth3, rest, topup, easy, syn3, pop, full, kind, capmark?) as the case-lint checker |
| list-depth.mjs | 2026-10-30 v88 | 2026-11-06 | DESIGN s12: lists a depth-3 / rest chunk; named in BRIEF-depth3, BRIEF-rest, REPAIR-BRIEF |
| list-topup.mjs | 2026-10-30 | 2026-11-06 | DESIGN s12 + BRIEF-topup: lists thin themes |
| near-dups2.mjs | 2026-10-30 v124 | 2026-10-30 | DESIGN s12: near-duplicate pairs in a theme |
| near-fix.mjs | 2026-10-30 v124 | 2026-11-06 | DESIGN s12: folds reviewed near-dup pairs into aliases |
| rec-apply.mjs | 2026-11-03 v256 | 2026-11-06 | DESIGN-entries s10: applies rec results and appends to rec/done.json; named by tools/apply-words.mjs |
| rec-make.mjs | 2026-11-03 v256 | 2026-11-06 | DESIGN-entries s10 (2026-11-03): lists names not yet reviewed; reads rec/done.json; apply-words.mjs imports its reminder |
| recon-apply.mjs | 2026-10-30 v88 | 2026-11-06 | DESIGN s12: applies reconcile results |
| recon-make.mjs | 2026-10-30 v88 | 2026-11-06 | DESIGN s12: lists same-text groups for reconcile (recon/BRIEF.md) |
| stats.mjs | 2026-10-30 v124 | 2026-11-06 | DESIGN s12: prints the library summary |
| syn3-apply.mjs | 2026-11-08 v328 | 2026-11-08 | partner of syn3-make (same caveat) |
| syn3-make.mjs | 2026-11-08 v328 | 2026-11-08 | named in BRIEF-depth3 and BRIEF-topup ("list a // GROUP comment for a later pass"); DESIGN-entries s10 records the sweep as done 2026-11-08 (UNSURE: could be one-off) |

### ONE-OFF

| script | first commit (date, library version) | last touched | evidence |
|---|---|---|---|
| alias-extra.mjs | 2026-10-30 v153 | 2026-11-06 | briefs: alias-extra-list.md |
| alias-links-apply.mjs | 2026-11-01 v238 | 2026-11-06 | doc: ENTRIES |
| apply-labels.mjs | 2026-11-02 v248 | 2026-11-02 | doc: ENTRIES v240-247 2026-11-02 |
| bare-apply.mjs | 2026-11-05 v288 | 2026-11-06 | doc: ENTRIES v283-288 |
| bare-sample.mjs | 2026-11-05 v288 | 2026-11-06 | doc: ENTRIES v283-288 |
| batch375.mjs | 2026-11-15 v375 | 2026-11-15 | ISSUES.md T1, B23, B14 (data); added after this inventory; rerunnable, prints 0 changes when the library is right; details in batch375-changes.txt |
| batch376.mjs | 2026-11-15 v376 | 2026-11-15 | ISSUES.md T15 (high list of t15-candidates.txt, 102 entries capitalised and typed proper) and T18 (Composite lowercase); added after this inventory; rerunnable, prints 0 changes when the library is right; details and exclusions in batch376-changes.txt |
| batch377.mjs | 2026-11-16 v377 | 2026-11-16 | ISSUES.md T15 (trademark flag set on 7 brand names: Jarlsberg, Cambozola, Dolcelatte, Cointreau, Amarula, Akubra, Biscoff; text and type untouched); rerunnable, prints 0 changes when done; list in batch377-changes.txt |
| batch378.mjs | 2026-11-16 v378 | 2026-11-16 | DESIGN-entries.md brand-type line, ISSUES.md T15 (23 brand entries typed org as their brand theme's majority, 7 tm flags added, Sapporo city typed place without tm); rerunnable, prints 0 changes when done; list in batch378-changes.txt |
| batch379.mjs | 2026-11-16 v379 | 2026-11-16 | ISSUES.md T15 (medium list of t15-candidates.txt: 24 entries capitalised and typed proper, tm on AeroPress and Chemex; Simon's 11 doubtful words and balboa left out); rerunnable, prints 0 changes when done; list and exclusions in batch379-changes.txt |
| batch380.mjs | 2026-11-16 v380 | 2026-11-16 | ISSUES.md T15, T23 (two-sense entries split: 41887 erlang [unit] + new Erlang [language]; 11783 Balboa [dance] + new Balboa [conquistador], person, takes the conquistadors link and group); rerunnable, prints 0 splits when done; before/after and reasoning in batch380-changes.txt |
| batch381.mjs | 2026-11-16 v381 | 2026-11-16 | ISSUES.md T15, T23 closed (doubtful words and grape varieties decided, 5 places typed place, AeroPress/Chemex org, v379 Cotija/Panama/Klondike reverted, Gruyère/Comté/Époisses/Doberman merged with spelling aliases, Hokkaido squash split, Worcestershire and Saskatoon links moved); rerunnable, prints 0 changes when done; every call and reason in batch381-changes.txt |
| batch382.mjs | 2026-11-16 v382 | 2026-11-16 | Simon's five capital rules (DESIGN-entries.md "Single-word names: the five rules"): ankara [fabric], jacuzzi, bakelite reverted to lowercase common (tm kept), tannoy lowercased, salad dressings theme note; ISSUES.md T24; rerunnable, prints 0 changes when done; changes, narrow audit and items for Simon in batch382-changes.txt |
| batch383.mjs | 2026-11-16 v383 | 2026-11-16 | ISSUES.md T24, all six groups: tm on 23 trademarks used as words, Thermos lowercased, Google and jeep split (google [search the web], Jeep [car brand]), Lycra/Kevlar/Gore-Tex/Tyvek typed org, Châteauneuf-du-Pape and Pouilly-Fuissé capitalised, 51 accent-only root pairs merged into a root and a spelling alias (finds every accent group itself and prints a verdict for each); rerunnable, prints 0 changes when done; every call, the groups left and the export shifts in batch383-changes.txt |
| batch384.mjs | 2026-11-16 v384 | 2026-11-16 | Simon's rules 6 to 9 (DESIGN-entries.md "Single-word names: rules 6 to 9"): Burgundy [wine] lowercased common (rule 9), link allowed in js/caselint-allow.js; ISSUES.md T25 item 5; rerunnable, prints 0 changes when done; rule-9 audit of the wine themes (not applied), Bordeaux flag and recheck marks in batch384-changes.txt |
| batch385.mjs | 2026-11-16 v385 | 2026-11-16 | ISSUES.md T25 closed: 9 Māori pairs merged (macron root), duplicates vicuna, agogo, maitre d' and a Vuelta a España alias deleted through deleteEntry after their links moved, dragees, droëwors, rakı, döner made spelling aliases, Pokémon spelt, ancien régime accented; recheck wines settled from dictionary pages (lambrusco, amarone, soave, valpolicella lowercased; Sancerre split); Bordeaux kept, link allowed in js/caselint-allow.js; rerunnable, prints 0 changes when done; calls, dictionary evidence and export shifts in batch385-changes.txt |
| batch386.mjs | 2026-11-16 v386 | 2026-11-16 | Rule 8 amended (Simon): root and spelling alias swap roles (both ids kept; links, show, use, name allowances, groups move), döner, droëwors, agogo become roots, raki stays; rerunnable, prints 0 changes when done; dictionary evidence per word in batch386-changes.txt |
| batch387.mjs | 2026-11-16 v387 | 2026-11-16 | Rule 8: doner kebab (19124) becomes döner kebab, plain "doner kebab" added as spelling alias (new entry appended, as maître d'); rerunnable, prints the same when done; evidence in batch387-changes.txt |
| batch388.mjs | 2026-11-16 v388 | 2026-11-16 | Rule 9: rioja, beaujolais, chianti, marsala [wine] lowercased (dictionaries disagree, read this session); Rioja and Beaujolais [wine region] split off as place entries (appended); yoğurt (62335) a spelling alias of yogurt (522, shown yoğurt in "Turkish everyday words"); hoover [verb] not done (an alias hoover [to vacuum] exists); rerunnable, prints 0 changes when done; evidence in batch388-changes.txt |
| batch389.mjs | 2026-11-16 v389 | 2026-11-16 | hoover [to vacuum] (23868) promoted from a UK regional alias of vacuum [to clean] to its own root (lowercase common verb, tm, region UK kept, linked only in "brand names used as words" typ 1, as google); Hoover [vacuum cleaner] stays capital org+tm; rerunnable, prints 0 changes when done; evidence in batch389-changes.txt |
| capmark-apply.mjs | 2026-11-15 v363-365 | 2026-11-15 | DESIGN-entries names the family by glob (tools/gen/capmark-*.mjs); no exact-name mention |
| capmark-fix.mjs | 2026-11-15 v363-365 | 2026-11-15 | doc: ENTRIES; named in scripts: g:capmark-fix2.mjs |
| capmark-fix2.mjs | 2026-11-15 v363-365 | 2026-11-15 | DESIGN-entries names the family by glob (tools/gen/capmark-*.mjs); no exact-name mention |
| capmark-make.mjs | 2026-11-14 | 2026-11-14 | DESIGN-entries names the family by glob (tools/gen/capmark-*.mjs); no exact-name mention |
| case-fix.mjs | 2026-11-14 v354 | 2026-11-14 | doc: ENTRIES v354 |
| case-scan2.mjs | 2026-11-14 v353 | 2026-11-14 | doc: ENTRIES v354 |
| compound-apply.mjs | 2026-11-05 v278 | 2026-11-06 | doc: ENTRIES v274,275 |
| compound-make.mjs | 2026-11-05 v278 | 2026-11-06 | doc: ENTRIES v274,275 |
| disp-apply.mjs | 2026-11-12 v351-352 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/disp-*.mjs); no exact-name mention |
| disp-make.mjs | 2026-11-12 v351-352 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/disp-*.mjs); no exact-name mention |
| disp2-apply.mjs | 2026-11-12 v351-352 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/disp2-*.mjs); no exact-name mention |
| disp2-make.mjs | 2026-11-12 v351-352 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/disp2-*.mjs); no exact-name mention |
| easy/merge-dups.mjs | 2026-11-09 v336 | 2026-11-09 | doc: ENTRIES v240-247 2026-11-02; commit msg; named in scripts: g:merge-dups.mjs |
| full-apply.mjs | 2026-11-05 v288 | 2026-11-06 | doc: ENTRIES v283-288 |
| full-list.mjs | 2026-11-05 v288 | 2026-11-06 | doc: ENTRIES v283-288 |
| groups-fix.mjs | 2026-11-02 v248 | 2026-11-06 | doc: ENTRIES v240-247 2026-11-02 |
| ident-apply.mjs | 2026-11-05 v298 | 2026-11-05 | commit msg |
| ident-compare.mjs | 2026-11-05 v300 | 2026-11-05 | doc: ENTRIES 2026-11-05; commit msg |
| ident-make.mjs | 2026-11-05 v298 | 2026-11-06 | doc: ENTRIES 2026-11-05; commit msg |
| inflection-dups.mjs | 2026-10-30 | 2026-11-06 | briefs: inflection-dups-list.md; named in scripts: g:inflection-roots.mjs |
| leak-apply.mjs | 2026-10-30 | 2026-11-06 | briefs: BRIEF-leak.md,BRIEF-leak2.md,BRIEF-leak3.md |
| leak-make.mjs | 2026-10-30 | 2026-11-06 | briefs: BRIEF-leak.md,BRIEF-leak2.md,BRIEF-leak3.md; named in scripts: g:leak-apply.mjs |
| list-words.mjs | 2026-10-30 | 2026-11-06 | briefs: BRIEF-long.md |
| lone-apply.mjs | 2026-11-14 v359-360 | 2026-11-14 | DESIGN-entries names the family by glob (tools/gen/lone-*.mjs); no exact-name mention |
| lone-make.mjs | 2026-11-14 v359-360 | 2026-11-14 | DESIGN-entries names the family by glob (tools/gen/lone-*.mjs); no exact-name mention |
| merge-dups.mjs | 2026-11-02 v248 | 2026-11-06 | doc: ENTRIES v240-247 2026-11-02; commit msg |
| mixed-pos.mjs | 2026-10-30 | 2026-10-30 | commit msg |
| needs-gloss.mjs | 2026-10-30 v187 | 2026-11-06 | commit msg |
| pairs-make.mjs | 2026-10-30 | 2026-11-06 | commit msg |
| pop-apply.mjs | 2026-10-30 v159 | 2026-11-03 | briefs: BRIEF-pop.md |
| pop-make.mjs | 2026-10-30 v159 | 2026-11-06 | briefs: BRIEF-pop.md |
| pos-apply.mjs | 2026-10-30 v177 | 2026-11-06 | briefs: BRIEF-pos.md; named in scripts: g:pos-lib.mjs |
| pos-gap.mjs | 2026-10-30 v181 | 2026-10-30 | commit msg |
| pos-make.mjs | 2026-10-30 v177 | 2026-11-06 | briefs: BRIEF-pos.md; named in scripts: g:pos-apply.mjs,g:pos-lib.mjs |
| regalias/alias-apply.mjs | 2026-11-06 v307-314 | 2026-11-06 | commit msg |
| regrec-apply.mjs | 2026-11-11 v346 | 2026-11-11 | doc: ENTRIES v344-346 2026-11-11; named in scripts: g:regrec-make.mjs |
| regrec-make.mjs | 2026-11-11 v346 | 2026-11-11 | doc: ENTRIES v344-346 2026-11-11 |
| regtag-apply.mjs | 2026-11-11 v346 | 2026-11-11 | doc: ENTRIES v344-346 2026-11-11; named in scripts: g:regtag-make.mjs |
| regtag-fix.mjs | 2026-11-11 v346 | 2026-11-11 | doc: ENTRIES v344-346 2026-11-11 |
| regtag-make.mjs | 2026-11-11 v346 | 2026-11-11 | doc: ENTRIES v344-346 2026-11-11 |
| rename-apply.mjs | 2026-11-02 v248 | 2026-11-02 | doc: ENTRIES 2026-11-02; briefs: BRIEF-rename.md |
| rename-make.mjs | 2026-11-02 v248 | 2026-11-06 | doc: ENTRIES 2026-11-02 |
| rooms-fix.mjs | 2026-11-05 v288 | 2026-11-06 | briefs: BRIEF-bare.md |
| rule-categories.mjs | 2026-11-11 v343 | 2026-11-11 | doc: ENTRIES v342-202 2026-11-11; commit msg |
| shortmem-apply.mjs | 2026-11-12 v347 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/shortmem-*.mjs); no exact-name mention |
| shortmem-find.mjs | 2026-11-12 v347 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/shortmem-*.mjs); no exact-name mention |
| shortmem-held-apply.mjs | 2026-11-12 v348 | 2026-11-12 | doc: ENTRIES v348 |
| shortmem-held.mjs | 2026-11-12 v348 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/shortmem-*.mjs); no exact-name mention |
| shortmem-make.mjs | 2026-11-12 v347 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/shortmem-*.mjs); no exact-name mention |
| shortmem2-apply.mjs | 2026-11-12 v349 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/shortmem2-*.mjs); no exact-name mention |
| shortmem2-make.mjs | 2026-11-12 v349 | 2026-11-12 | DESIGN-entries names the family by glob (tools/gen/shortmem2-*.mjs); no exact-name mention |
| show-leftovers.mjs | 2026-10-31 v206 | 2026-11-06 | doc: ENTRIES v204-206 |
| show-migrate.mjs | 2026-10-31 v204 | 2026-11-06 | doc: ENTRIES 2026-11-01; named in scripts: g:show-leftovers.mjs,g:show-migrate2.mjs |
| show-migrate2.mjs | 2026-11-02 v249 | 2026-11-06 | doc: ENTRIES v249-202 2026-11-02 |
| spell-uk.mjs | 2026-11-01 v230 | 2026-11-06 | doc: ENTRIES v230; commit msg |
| spelling-flip.mjs | 2026-11-09 v339 | 2026-11-09 | commit msg; named in scripts: g:spelling-flip2.mjs |
| spelling-flip2.mjs | 2026-11-09 v339 | 2026-11-09 | commit msg |
| split-apply.mjs | 2026-11-01 | 2026-11-06 | doc: ENTRIES 2026-11-01; briefs: BRIEF-split.md |
| split-dairy.mjs | 2026-11-02 v248 | 2026-11-06 | doc: ENTRIES v247 |
| split-make.mjs | 2026-11-01 | 2026-11-06 | doc: ENTRIES 2026-11-01 |
| syn-apply.mjs | 2026-10-31 v207 | 2026-11-06 | doc: ENTRIES 2026-10-31; briefs: BRIEF-syn.md |
| syn-fixups.mjs | 2026-10-31 v210 | 2026-11-06 | doc: ENTRIES 2026-10-31 |
| syn-fixups2.mjs | 2026-11-01 v216 | 2026-11-06 | doc: ENTRIES 2026-11-01 |
| syn-make.mjs | 2026-10-31 v207 | 2026-11-06 | doc: ENTRIES 2026-10-31; briefs: BRIEF-syn.md |
| syn2/loose-ends.mjs | 2026-11-02 v253 | 2026-11-02 | doc: ENTRIES v253 |
| synonym-migrate.mjs | 2026-11-02 v251 | 2026-11-06 | doc: ENTRIES v251-202 2026-11-02; named in scripts: g:syn2/apply.mjs |
| weather-proto.mjs | 2026-10-31 v203 | 2026-11-06 | doc: ENTRIES v203 |
| wordplay-apply.mjs | 2026-11-06 v305 | 2026-11-06 | commit msg |

### UNREFERENCED

| script | first commit (date, library version) | last touched | evidence |
|---|---|---|---|
| alias-links-to-root.mjs | 2026-10-30 v175 | 2026-11-06 | family evidence: family text alias-*, family text alias-links-* |
| case-fix2.mjs | 2026-11-14 v355 | 2026-11-14 | family evidence: family text case-* |
| case-fix3.mjs | 2026-11-14 v356 | 2026-11-14 | family evidence: family text case-* |
| case-fix4.mjs | 2026-11-14 v358 | 2026-11-14 | family evidence: family text case-* |
| case-fix5.mjs | 2026-11-14 v361-362 | 2026-11-14 | family evidence: family text case-* |
| case-scan.mjs | 2026-11-14 v353 | 2026-11-14 | family evidence: family text case-* |
| caselint-allow.mjs | 2026-11-15 v366 | 2026-11-15 | no family evidence; named only in scripts: js/caselint-allow.js |
| caselint-fix.mjs | 2026-11-15 v366 | 2026-11-15 | no family evidence |
| ease-apply.mjs | 2026-11-03 v272 | 2026-11-06 | family evidence: folder ease/, BRIEF-ease.md |
| ease-make.mjs | 2026-11-03 v272 | 2026-11-06 | family evidence: folder ease/, BRIEF-ease.md |
| easy/make-themes.mjs | 2026-11-09 v336 | 2026-11-09 | family evidence: brief in folder; named only in scripts: g:easy/merge-dups.mjs,g:easy/spec.mjs |
| easy/spec.mjs | 2026-11-09 v336 | 2026-11-09 | family evidence: brief in folder; named only in scripts: g:easy/make-themes.mjs |
| ends-apply.mjs | 2026-11-05 v296 | 2026-11-06 | family evidence: folder ends/ |
| ends-cands.mjs | 2026-11-05 v296 | 2026-11-06 | family evidence: folder ends/ |
| five-fix.mjs | 2026-11-05 v295 | 2026-11-05 | no family evidence |
| fix-kindle.mjs | 2026-10-30 v156 | 2026-11-06 | no family evidence |
| flagged-fix.mjs | 2026-11-05 v278 | 2026-11-06 | no family evidence; named only in scripts: g:flagged-fix2.mjs |
| flagged-fix2.mjs | 2026-11-05 v281 | 2026-11-05 | no family evidence |
| footlong-tm.mjs | 2026-11-05 v278 | 2026-11-05 | no family evidence |
| forms-analyze.mjs | 2026-10-30 v164 | 2026-11-06 | no family evidence; named only in scripts: g:forms-apply.mjs |
| forms-apply.mjs | 2026-10-30 v164 | 2026-11-06 | no family evidence |
| hamlet-fix.mjs | 2026-11-05 v289 | 2026-11-06 | no family evidence |
| inflection-roots.mjs | 2026-10-30 | 2026-11-06 | no family evidence |
| kind/apply.mjs | 2026-11-03 v255 | 2026-11-03 | family evidence: family text apply-*; named only in scripts: g:syn2/apply.mjs,g:syn2/loose-ends.mjs |
| leak-bare.mjs | 2026-10-30 | 2026-11-06 | family evidence: folder leak/, BRIEF-leak.md, family text leak-* |
| leak-report.mjs | 2026-10-30 | 2026-10-30 | family evidence: folder leak/, BRIEF-leak.md, family text leak-* |
| list-themes.mjs | 2026-10-29 | 2026-10-29 | family evidence: family text list-* |
| lock-set.mjs | 2026-11-05 v281 | 2026-11-05 | no family evidence |
| milk-fix.mjs | 2026-11-05 v288 | 2026-11-06 | no family evidence |
| near-dups.mjs | 2026-10-30 v124 | 2026-10-30 | family evidence: family text near-* |
| org-scan.mjs | 2026-11-14 v357 | 2026-11-14 | no family evidence |
| overlap-apply.mjs | 2026-11-03 v258 | 2026-11-06 | family evidence: folder overlap/, BRIEF-overlap.md |
| overlap-make.mjs | 2026-11-03 v258 | 2026-11-06 | family evidence: folder overlap/, BRIEF-overlap.md |
| overlap-sample.mjs | 2026-11-05 v281 | 2026-11-06 | family evidence: folder overlap/, BRIEF-overlap.md, BRIEF-overlap-sample.md |
| overlap2-make.mjs | 2026-11-03 v261 | 2026-11-03 | family evidence: folder overlap2/, BRIEF-overlap2.md |
| phonetic-case.mjs | 2026-11-14 v353 | 2026-11-14 | no family evidence |
| pop-normalise.mjs | 2026-10-30 v162 | 2026-11-06 | family evidence: folder pop/, BRIEF-pop.md, family text pop-* |
| pop/metrics.mjs | 2026-11-03 v258 | 2026-11-03 | no family evidence |
| pop1-link.mjs | 2026-11-03 v266 | 2026-11-06 | no family evidence |
| pop1-new.mjs | 2026-11-03 v266 | 2026-11-03 | no family evidence; named only in scripts: g:pop1-new-words.mjs |
| pos-lib.mjs | 2026-10-30 v177 | 2026-10-30 | family evidence: folder pos/, BRIEF-pos.md, family text pos-*; named only in scripts: g:pos-apply.mjs,g:pos-gap.mjs,g:pos-make.mjs |
| pos/apply2.mjs | 2026-11-03 v255 | 2026-11-03 | no family evidence |
| regalias-make.mjs | 2026-11-06 v306 | 2026-11-06 | family evidence: folder regalias/, BRIEF-regalias.md |
| regalias-report.mjs | 2026-11-06 v306 | 2026-11-06 | family evidence: folder regalias/, BRIEF-regalias.md |
| regalias/alias-list.mjs | 2026-11-06 v307-314 | 2026-11-06 | family evidence: family text alias-* |
| regalias/group-apply.mjs | 2026-11-06 v306 | 2026-11-06 | no family evidence |
| regalias/grouped-decide.mjs | 2026-11-06 v307-314 | 2026-11-06 | family evidence: family text grouped-* |
| regalias/grouped-list.mjs | 2026-11-06 v307-314 | 2026-11-06 | family evidence: family text grouped-* |
| regalias/missing-decide.mjs | 2026-11-06 v307-314 | 2026-11-06 | family evidence: family text missing-* |
| regalias/missing-list.mjs | 2026-11-06 v307-314 | 2026-11-06 | family evidence: family text missing-* |
| regional-make.mjs | 2026-11-05 v278 | 2026-11-06 | family evidence: family text regional-* |
| shoe-hand-themes.mjs | 2026-11-08 v328 | 2026-11-08 | no family evidence; named only in scripts: g:shoe-hand-parts.mjs |
| shortmem3-apply.mjs | 2026-11-12 v350 | 2026-11-12 | no family evidence |
| starts-apply.mjs | 2026-11-05 v293 | 2026-11-06 | family evidence: folder starts/, family text starts-* |
| starts-cands.mjs | 2026-11-05 v293 | 2026-11-06 | family evidence: folder starts/, family text starts-* |
| starts-pets.mjs | 2026-11-05 v293 | 2026-11-06 | family evidence: folder starts/, family text starts-* |
| syn-forms.mjs | 2026-11-01 v223 | 2026-11-06 | family evidence: folder syn/, BRIEF-syn.md, family text syn-* |
| syn-leaks.mjs | 2026-11-01 v217 | 2026-11-06 | family evidence: folder syn/, BRIEF-syn.md, family text syn-* |
| syn-leaks2.mjs | 2026-11-01 v219 | 2026-11-06 | family evidence: folder syn/, BRIEF-syn.md, family text syn-* |
| syn-translations.mjs | 2026-11-01 v214 | 2026-11-06 | family evidence: folder syn/, BRIEF-syn.md, family text syn-* |
| syn2/apply.mjs | 2026-11-02 v252 | 2026-11-02 | family evidence: family text apply-*; named only in scripts: g:kind/apply.mjs,g:syn2/loose-ends.mjs |
| syn2/report.mjs | 2026-11-02 v252 | 2026-11-02 | no family evidence |
| theme-name-leaks.mjs | 2026-10-30 | 2026-10-30 | family evidence: family text theme-* |
| tophat-fix.mjs | 2026-11-05 v295 | 2026-11-06 | no family evidence |
| transport-themes.mjs | 2026-10-30 v163 | 2026-11-06 | no family evidence |

### BATCH (listed by family, not by file)

- level-2 root batch (<root>.mjs): 14 files: animals, arts_entertainment, body_health, food-drink, history_myth, home_everyday, language_wordplay, nature_earth, people_society, places_geography, qualities, science_tech, sports_games, travel_transport
- d3-*: 67 files: d3-animals-1, d3-animals-2, d3-animals-3, d3-animals-4, d3-animals-5, d3-arts_entertainment-1, d3-arts_entertainment-2, d3-arts_entertainment-3, d3-arts_entertainment-4, d3-body_health-1, d3-body_health-2, d3-body_health-3, d3-body_health-4, d3-food_drink-1, d3-food_drink-2, d3-food_drink-3, d3-food_drink-4, d3-food_drink-5, d3-history_myth-1, d3-history_myth-2, d3-history_myth-3, d3-history_myth-4, d3-home_everyday-1, d3-home_everyday-2, d3-home_everyday-3, d3-home_everyday-4, d3-language_wordplay-1, d3-language_wordplay-2, d3-language_wordplay-3, d3-language_wordplay-4, d3-language_wordplay-5, d3-language_wordplay-6, d3-nature_earth-1, d3-nature_earth-2, d3-nature_earth-3, d3-nature_earth-4, d3-nature_earth-5, d3-people_society-1, d3-people_society-2, d3-people_society-3, d3-people_society-4, d3-people_society-5, d3-places_geography-1, d3-places_geography-2, d3-places_geography-3, d3-places_geography-4, d3-places_geography-5, d3-places_geography-6, d3-qualities-1, d3-qualities-2, d3-qualities-3, d3-qualities-4, d3-qualities-5, d3-science_tech-1, d3-science_tech-2, d3-science_tech-3, d3-science_tech-4, d3-science_tech-5, d3-sports_games-1, d3-sports_games-2, d3-sports_games-3, d3-sports_games-4, d3-sports_games-5, d3-travel_transport-1, d3-travel_transport-2, d3-travel_transport-3, d3-travel_transport-4
- d45-*: 25 files: d45-animals-1, d45-animals-2, d45-arts_entertainment-1, d45-arts_entertainment-2, d45-arts_entertainment-3, d45-body_health-1, d45-food_drink-1, d45-food_drink-2, d45-history_myth-1, d45-history_myth-2, d45-history_myth-3, d45-home_everyday-1, d45-home_everyday-2, d45-language_wordplay-1, d45-nature_earth-1, d45-people_society-1, d45-places_geography-1, d45-places_geography-2, d45-places_geography-3, d45-qualities-1, d45-science_tech-1, d45-science_tech-2, d45-sports_games-1, d45-sports_games-2, d45-travel_transport-1
- easy/easy-N: 5 files: easy/easy-1, easy/easy-2, easy/easy-3, easy/easy-4, easy/easy-5
- other batch: 5 files: onion-varieties, pop1-new-words, pop1-new-words2, shoe-hand-parts, zz-fixups
- r-* (fix rounds): 9 files: r-animals_people, r-arts, r-body, r-food, r-lang_travel, r-misc, r-qualities_history, r-round2, r-sports
- t-N: 24 files: t-1, t-10, t-11, t-12, t-13, t-14, t-15, t-16, t-17, t-18, t-19, t-2, t-20, t-21, t-22, t-23, t-24, t-3, t-4, t-5, t-6, t-7, t-8, t-9

### Static import check (relative imports and names imported from js/*.js)

- pop/metrics.mjs: js/model.js no export effRec

Also checked with no problems: tools/apply-words.mjs, export-game.mjs, brk-tokens.mjs, brk-merge.mjs, migrate-pop.mjs, pilot.mjs, retype-phrases.mjs, convert-tree.mjs, tests/core.test.mjs, serve.mjs (all relative imports resolve, all named imports are exported by js/*.js).
Caveats: static only; it cannot see a field renamed in the data (v301 renamed entry `rec` to `fam` and `th` to `typ`; syn2/apply.mjs and syn2/loose-ends.mjs still write `th` and would misbehave if rerun), and it cannot see runtime failure from missing input files: show-leftovers.mjs, show-migrate.mjs, syn2/apply.mjs, syn2/report.mjs read tools/gen/.tmp/pre-*.json, which is gitignored (so absent in a fresh clone). leak-make.mjs default reads leak/done.json, which does not exist (treated as empty).

### Hard-coded absolute paths
None found in any tools/gen file (regex for drive letters, /Users, AppData; the two hits were escaped "\n" in strings). shortmem-find.mjs and shortmem-make.mjs use cwd-relative paths (data/..., tools/gen/...), so they only work from the repo root; the others resolve via import.meta.url.
## 3. Briefs

| brief | bytes | status | reason |
|---|---|---|---|
| BRIEF-depth3.md | 12246 | CURRENT | DESIGN s12 names it as the depth-3 brief; carries capital rule; referenced by BRIEF-rest, BRIEF-topup, easy/BRIEF-easy, recon/REPAIR-BRIEF; last edited 2026-11-15 |
| BRIEF-rest.md | 2758 | CURRENT | DESIGN s12; addendum to depth3; carries capital rule |
| BRIEF-topup.md | 5520 | CURRENT | DESIGN s12 (list-topup); carries capital rule |
| CAPITAL-RULE.md | 1251 | CURRENT | capital rule text appended to creation briefs (DESIGN-entries "Capital rule and lint") |
| BRIEF-rec.md | 2499 | CURRENT | DESIGN-entries: agents work under it; rec-make/rec-apply/done.json and apply-words reminder name it |
| brk/BRIEF-brk.md | 1829 | CURRENT | named by tools/apply-words.mjs reminder, DESIGN-entries line-break pipeline |
| recon/BRIEF.md | 2949 | CURRENT | DESIGN s12 (reconcile workflow) |
| recon/AUDIT-BRIEF.md | 2110 | CURRENT | DESIGN s12 (audit workflow) |
| recon/REPAIR-BRIEF.md | 2044 | UNCLEAR | add-back of words skipped by early batches (commit d316569); not in DESIGN; points at depth3 brief |
| easy/BRIEF-easy.md | 6741 | CURRENT? (unclear) | creation brief for easy themes, carries capital rule, edited 2026-11-15; the pass is applied (v336); reusable to add more easy themes |
| BRIEF-ident.md | 5150 | CURRENT | js/ai.js comment and easy/BRIEF-easy.md point to it for the identifiability scale; also referenced by regtag |
| BRIEF-regtag.md | 3154 | CURRENT (as a rule reference) | BRIEF-ident, BRIEF-pop refer to it for the region-tied rule; pass applied v344-346, done.json kept |
| BRIEF-regrec.md | 2894 | finished pass (rule referenced) | ENTRIES lists it among briefs that carry the region rule; pass applied v346 |
| BRIEF-syn3.md | 3999 | UNCLEAR | carries capital rule and was edited 2026-11-15; sweep applied 2026-11-08 (v328); depth3/topup point at syn3-make for later runs |
| BRIEF-pop.md | 5856 | UNCLEAR | finished (v159-162) but carries capital rule, edited 2026-11-15 |
| BRIEF-full.md | 4549 | UNCLEAR | finished kinds-theme pass (v283-288) but carries capital rule, edited 2026-11-15 |
| BRIEF-kind.md | 3850 | UNCLEAR | finished (v255) but carries capital rule, edited 2026-11-15 |
| BRIEF-capmark.md | 1277 | finished pass (v363-365) | the capital marking pass; carries capital rule |
| BRIEF-leak.md | 4686 | SUPERSEDED by BRIEF-leak4.md | first theme-name review (v166-171) |
| BRIEF-leak2.md | 3311 | SUPERSEDED by BRIEF-leak4.md | second pass (v169) |
| BRIEF-leak3.md | 6789 | SUPERSEDED by BRIEF-leak4.md | second look at kept-by-name (v184-192); leak4 is the "third look" (v240-247) |
| BRIEF-leak4.md | 7242 | finished pass (latest of leak 1-4) | v240-247, 2026-11-02; ENTRIES records it as the last review |
| BRIEF-overlap.md | 3318 | SUPERSEDED by BRIEF-overlap3.md (builds on it) | overlap3 says to read it first and its verdicts still apply; pass v258 |
| BRIEF-overlap-sample.md | 2291 | finished | sample check of overlap kept pairs (2026-11-05) |
| BRIEF-overlap2.md | 2426 | finished (different job: brand next to generic) | v261 |
| BRIEF-overlap3.md | 3187 | finished (latest overlap pass) | v281; ENTRIES: "the full pass is BRIEF-overlap3.md" |
| BRIEF-pop2.md | 3901 | finished (second pass after BRIEF-pop) | theme popularity rerate v259-260; also carries capital rule |
| BRIEF-pos.md | 4180 | SUPERSEDED by BRIEF-pos2.md for remaining entries | v177-181 |
| BRIEF-pos2.md | 1808 | finished | v255 |
| BRIEF-disp.md | 1094 | SUPERSEDED by BRIEF-disp2.md (second check) | v351-352 |
| BRIEF-disp2.md | 1660 | finished | v351-352 |
| BRIEF-shortmem.md | 1258 | finished (v347-348) | bare short members |
| BRIEF-shortmem2.md | 1456 | finished (v349) | multi-theme short links |
| BRIEF-syn.md | 8751 | finished pass (phases 2-3, 2026-10-31/11-01) | synonym aliases to entries; syn3 is a different later sweep |
| BRIEF-split.md | 3348 | finished (v228) | theme splits |
| BRIEF-rename.md | 2906 | finished (v248) | theme renames |
| BRIEF-bare.md | 3070 | finished (v283-288) | bare members of kinds themes |
| BRIEF-modifier.md | 3245 | finished (v283-288) | bare modifiers |
| BRIEF-compound.md | 4143 | finished (v274-278) | compound themes |
| BRIEF-ease.md | 2330 | finished (v272) | easy pool |
| BRIEF-ends-with.md | 3831 | finished (v296); reusable generator brief (unclear) | wordplay themes |
| BRIEF-starts-with.md | 3746 | finished (v293); reusable generator brief (unclear) | wordplay themes |
| BRIEF-long.md | 1919 | finished | entries left out for length; long/ folder |
| BRIEF-lone.md | 1180 | finished (v359-360) | lone capitals |
| BRIEF-regalias.md | 2054 | finished (v306-314) | regional equivalents |
| ident2/BRIEF-ident2.md | 3852 | SUPERSEDED by ident3 / experimental | experiment 2026-11-08 |
| ident2/BRIEF-ident3.md | 4153 | experimental, finished | experiment 2026-11-08; not in docs |

Briefs found but not in the table: none

Briefs carrying the capital-rule text (grep "Capital rule"/"correctly written for"): BRIEF-capmark, depth3, full, kind, pop, rest, syn3, topup, easy/BRIEF-easy. Not all of these are creation briefs: pop, full, kind, capmark belong to finished passes, which is why their status is marked unclear.

## 4. Data folders (tracked sizes, content bytes)

| folder | files | MB | pass / version | brief | read by |
|---|---|---|---|---|---|
| aliaslinks/ | 2 | 0.02 | alias-only theme links (v238, 2026-11-01) | - | alias-links-apply.mjs reads decisions.txt (spent) |
| bare/ | 5 | 0.05 | bare members of kinds themes, first round (v283-288) | BRIEF-bare | bare-sample/bare-apply via --dir (spent) |
| bare2/ | 39 | 0.28 | same pass, full round | BRIEF-bare | bare-apply --dir bare2 (spent) |
| brk/ | 49 | 0.64 | line-break points (v315, 2026-11-09) | brk/BRIEF-brk | LIVE: tools/brk-merge.mjs default mode "in" re-reads brk/in-N.txt + out-N.txt; brk-tokens.mjs deletes/writes todo-N; apply-words prints reminder. tokens.txt: no reader found; bad.txt is an empty output of brk-merge |
| capmark/ | 13 | 0.07 | capital marking (v363-365) | BRIEF-capmark | capmark-make/apply (spent, newest pass) |
| complete/ | 2 | 0.02 | notes for 49 complete themes (2026-11-01) | - | no script reads it (notes.txt/list.txt were applied by agents or hand); spent |
| compound/ | 26 | 0.51 | compound themes, full-term rating (v274-278) | BRIEF-compound, BRIEF-modifier | compound-make/apply (spent) |
| disp/ | 13 | 0.15 | theme display names (v351-352) | BRIEF-disp | disp-make/apply (spent) |
| disp2/ | 13 | 0.10 | theme display names second check | BRIEF-disp2 | disp2-make/apply (spent) |
| ease/ | 17 | 0.09 | easy pool: words made difficulty 1 (v272) | BRIEF-ease | ease-make/apply (spent) |
| easy/ | 14 | 0.07 | 39 easy everyday themes (v336) - data modules + scripts + BRIEF-easy | easy/BRIEF-easy | batch modules applied with apply-words; list-N.txt inputs; spent except the brief |
| ends/ | 27 | 0.05 | "ends with" wordplay themes (v296) | BRIEF-ends-with | ends-cands/ends-apply (spent) |
| full/ | 4 | 0.01 | full terms in kinds themes (v283-288) round 1 | BRIEF-full | full-apply --dir (spent) |
| full2/ | 8 | 0.05 | round 2 | BRIEF-full | spent |
| full3/ | 2 | 0.00 | round 3 | BRIEF-full | spent |
| ident/ | 52 | 0.55 | theme identifiability rating (v298-300) | BRIEF-ident | ident-make/apply (spent) |
| ident2/ | 52 | 0.58 | identifiability experiments (2026-11-08) + BRIEF-ident2/3 | ident2/BRIEF-* | ident-compare.mjs (spent, experiment) |
| kind/ | 13 | 0.46 | theme kind and rule (v255) | BRIEF-kind | kind/apply.mjs is its own applier; d3-places_geography-4 / d45-places_geography-3 mention it in comments (spent) |
| leak/ | 111 | 1.31 | theme-name leak reviews 1-4 (v166-247) | BRIEF-leak..leak4 | leak-make/apply/bare/report, groups-fix read k4-N.txt, kept-done.json; kept-done.json read by leak-make --kept (spent pass, rerunnable state) |
| lone/ | 18 | 0.16 | lone capitals (v359-360) | BRIEF-lone | lone-make/apply read candidates.json (spent) |
| long/ | 49 | 1.32 | entries dropped for length (>20 letters), review | BRIEF-long | no script reads it; spent (all.json 0.72 MB + 48 per-root json) |
| overlap/ | 29 | 0.67 | overlap pass 1 + sample (v258, v281) | BRIEF-overlap, BRIEF-overlap-sample | overlap-make/apply/sample (spent) |
| overlap2/ | 25 | 0.33 | brand next to generic (v261) | BRIEF-overlap2 | overlap2-make (spent) |
| overlap3/ | 39 | 0.97 | full overlap pass (v281) | BRIEF-overlap3 | overlap-apply --dir overlap3 (spent) |
| pop/ | 169 | 1.77 | popularity ratings (v159-162) + rounds + pop/metrics | BRIEF-pop, BRIEF-pop2 | pop-make/apply (spent); pop/done.json has no reader (unclear); metrics.mjs/metrics.tsv: script imports a removed export |
| pos/ | 38 | 1.74 | part of speech (v177-181, v255) | BRIEF-pos, BRIEF-pos2 | pos-make/pos-apply read done.json (spent, rerunnable state); two .scratch-N.json.pos-done.json are tracked by accident |
| rec/ | 13 | 1.21 | recognisability review of names (v256) | BRIEF-rec | LIVE: done.json is read by rec-make.mjs, rec-apply.mjs and tools/apply-words.mjs; list-N.txt/r-N.txt are the first-run inputs/answers (spent) |
| recon/ | 10 | 0.10 | reconcile and audit (v88-126) | recon/BRIEF, AUDIT-BRIEF, REPAIR-BRIEF | LIVE: audited-ids.json read by audit-make.mjs; in-1/out-1/audit-in-N/audit-out-N are regenerated per run (first-run files, spent) |
| regalias/ | 32 | 0.27 | regional aliases (v306-314) decisions | BRIEF-regalias | regalias scripts read their own lists/decisions (spent) |
| regrec/ | 21 | 0.22 | re-rate region-tied words (v346) | BRIEF-regrec | regrec-make/apply read done.json (spent, rerunnable state) |
| regtag/ | 17 | 0.42 | tag region-tied themes (v344-346) | BRIEF-regtag | regtag-make/apply read done.json (spent, rerunnable state) |
| rename/ | 24 | 0.56 | theme renames (v248) | BRIEF-rename | no script reads by path (rename-apply takes files as arguments); spent |
| shortmem/ | 21 | 4.47 | bare short members (v347-348) | BRIEF-shortmem | shortmem-* read candidates.json, keep/wrong (spent). candidates.json is 4.4 MB, the largest tracked file |
| shortmem2/ | 18 | 0.15 | multi-theme short links (v349) | BRIEF-shortmem2 | shortmem2-* read candidates.json (spent) |
| split/ | 23 | 0.29 | theme splits (v228) | BRIEF-split | split-apply takes files as arguments; spent |
| starts/ | 19 | 0.04 | "starts with" wordplay themes (v293) | BRIEF-starts-with | starts-cands/apply (spent) |
| syn/ | 56 | 0.05 | synonym aliases to entries (phases 2-3, v207-216) | BRIEF-syn | syn-make/apply read done.json (spent, rerunnable state) |
| syn2/ | 4 | 0.01 | strict synonym re-check (v252-253) | - | own scripts; apply.mjs/report.mjs read gitignored ../.tmp/pre-syn.json; spent |
| syn3/ | 48 | 1.99 | synonym-group sweep (v328, 2026-11-08) | BRIEF-syn3 | syn3-make/apply (PIPELINE-by-brief, unsure); s-N.txt results are spent |

Top-level data files in tools/gen:

- alias-extra-list.md (14040 B)
- case-fix-log.txt (1625 B)
- case-fix2-log.txt (1910 B)
- case-scan.json (128227 B)
- case-scan2.json (6421 B)
- connections-titles.txt (56878 B)
- inflection-dups-list.md (3654 B)
- long-names-list.md (187168 B)
- mixed-pos.md (21596 B)
- nameok-list.txt (99170 B)
- org-scan.json (66434 B)
- wordplay-samples.md (3780 B)

Top-level readers found: case-scan.json (case-scan.mjs, case-scan2.mjs, case-fix.mjs), case-scan2.json (case-scan2.mjs, case-fix.mjs), org-scan.json (org-scan.mjs), case-fix-log.txt / case-fix2-log.txt (written by case-fix*.mjs), mixed-pos.md (written by mixed-pos.mjs), wordplay-samples.md (cited by wordplay-apply.mjs). No reader found for: alias-extra-list.md (output of alias-extra.mjs), connections-titles.txt, inflection-dups-list.md (output), long-names-list.md (0.18 MB, output of a list), nameok-list.txt.

Files that are READ by a live/pipeline script (keep): tools/gen/rec/done.json (rec-make, rec-apply, apply-words), tools/gen/recon/audited-ids.json (audit-make), tools/gen/brk/in-*.txt + out-*.txt (brk-merge default mode; merges into data/breaks-en.txt, re-merging is idempotent but they are the source of those splits). Read only by finished-pass scripts (needed only if that pass is rerun): regtag/done.json, regrec/done.json, pos/done.json, syn/done.json, leak/kept-done.json, shortmem*/candidates.json, lone/candidates.json, case-scan*.json. No reader: pop/done.json, brk/tokens.txt.

## 5. Oddities

- Untracked/ignored: tools/gen/.tmp/ (gitignored, 43 files, 55.45 MB): 8 library snapshots of 6.8-7.1 MB (pre, pre210, pre-syn, pre-kept, before-reg, before-show, before-syn, before-syn-full), done-before-reg.json, 22 scratch .mjs, pairs-*, pilot-*.txt. show-leftovers/show-migrate/syn2/apply/syn2/report read .tmp/pre-*.json, so they cannot run from a fresh clone. leak/.scratch-*.done.json (7 tiny files) are ignored by leak/.gitignore.
- Tracked by accident (probably): tools/gen/pos/.scratch-2.json.pos-done.json and .scratch-3.json.pos-done.json (dot-scratch leftovers; leak/ has a .gitignore for the same pattern, pos/ does not).
- Empty files: tools/gen/brk/bad.txt (tracked, 0 bytes, rewritten by brk-merge each run); tools/gen/.tmp/show-ambiguous.txt (untracked). Tiny: regrec/r-1.txt (39 B, probably an empty agent answer).
- Exact duplicate files (md5, files > 1 byte): none inside tools/gen.
- Docs referring to files that do not exist: none except placeholder patterns (list-N.txt, in-N.json, todo-N.txt).
- Hard-coded absolute paths: none. cwd-relative paths: shortmem-find.mjs, shortmem-make.mjs.
- pop/metrics.mjs imports effRec from js/model.js, which was removed in library v301 (commit 2ac170c renamed it to difficultyBand); it would fail on import.
- Mixed file: pop1-link.mjs both exports DATA/THEMES and does the linking itself (imports ./pop1-new-words.mjs and writes the library).
- caselint-allow.mjs overwrites js/caselint-allow.js (an app file, hand-curated per its own header). It is not a workflow tool; rerunning it would regenerate the allowlist and could drop hand edits. The js file cites it as origin.
- DESIGN.md section 11 layout block says "tools/ ... gen/*.mjs (generated word batches)" and README says tools/gen/*.mjs batches: the folder now holds ~150 non-batch scripts, so the docs under-describe it.
- Subfolders holding scripts: easy/ (8 .mjs), kind/ (1), pop/ (1), pos/ (1), regalias/ (7), syn2/ (3). Briefs in subfolders: easy, brk, recon (3), ident2 (2).
- Library renames not followed by data modules: v301 renamed rec to fam and th to typ; per the commit message the data modules were left as they were and apply-words.mjs still accepts the old `rec` option.