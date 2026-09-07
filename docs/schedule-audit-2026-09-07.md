# Premiere schedule audit — 2026-09-07

Production baseline: `36279a3`, branch `main`. Audited all **132** effective homepage records: 130 in `data/anime.js` plus 2 in `data/anime-20260904.js`. Existing title/poster/official-link overlays were loaded before the audit.

## Result

- 49 structured premiere dates: 28 confirmed non-theatrical clock times, 5 date-only premieres, 16 theatrical opening dates (internal midnight, no visible clock).
- 1 additional broadcast-only record: FX Fighter Kurumi-chan. Its advance streaming date remains unknown.
- 82 records have no exact premiere date verified in the sources inspected. They remain coarse month/year/season entries.
- Every populated event links an official source and records 2026-09-07 verification. No aggregator clocks or platform-default midnight guesses were used.

## Scope and exceptions

Schedules follow the existing Japan-first release model, with announced global streaming originals where applicable. “Premiere” means first regular public TV/streaming availability or theatrical opening, excluding limited advance screening events. This does not claim a worldwide territory-by-territory release audit. Dreamland uses its Japanese broadcast announcement.

The time of first public streaming takes precedence over TV (Sword II: ABEMA one week early). When advance streaming is announced without a date (Kurumi), the confirmed TV schedule is stored in `broadcast` and `premiere` remains null. Unannounced clocks remain null. Official late-night notation is preserved separately from its calculation value.

Three entries rely on official search-index excerpts because the page could not be directly retrieved: **Ave Mujica prima aurora** (opening date; 404), **Tetsuryo** (date/time; 403), **The World's Strongest Witch** (date only; 403). Their source URLs remain traceable. Dandevine uses the official site's Chinese edition. THE ONE PIECE's listing label “2027.02.01~” is not treated as a date confirmation because the announcement text only says February. Older-season dates and book-release dates were excluded.

A source could be unavailable, incomplete, or only announce coarse timing. “No exact date verified” below is a finding of this audit, not proof that no announcement exists elsewhere. Existing coarse dates, tags, titles, links, posters, and streaming resources were preserved.

## Per-title findings

All dates below use the official schedule's calendar date; a time at or after 24:00 normalizes into a later calendar day for computation. Theater 00:00 is internal only.

| # | Title / stable ID | Premiere (JST) | Result / limitation | Official source inspected |
|---|---|---|---|---|
| 1 | SEKIRO: NO DEFEAT<br>`sekiro-no-defeat` | 2026-09-04 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://sekiro-anime.jp/news.html) |
| 2 | 최종악장 울려라! 유포니엄 후편<br>`sound-euphonium-the-final-movement-part-2` | 2026-09-11 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://anime-eupho.com/news/?id=691) |
| 3 | 죠죠의 기묘한 모험 스틸 볼 런 2nd & 3rd STAGE<br>`jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage` | 2026-09-25 time unknown · streaming | Netflix premiere date confirmed; exact start time not stated. | [Official source](https://jojo-portal.com/news/anime/598/) |
| 4 | 신 테니스의 왕자 U-17 WORLD CUP 결승 멤버 결정전<br>`the-new-prince-of-tennis-u-17-world-cup-final-roster-selection` | 2026-09-30 24:00 · tv | Confirmed first regular public schedule. | [Official source](https://www.tv-tokyo.co.jp/anime/tenipri-u17/news/) |
| 5 | 약사의 혼잣말 3기 제1쿨<br>`the-apothecary-diaries-season-3-part-1` | 2026-10-02 23:00 · tv | Confirmed first regular public schedule. | [Official source](https://kusuriyanohitorigoto.jp/news/2623/) |
| 6 | 란마 1/2 3기<br>`ranma-1-2-season-3` | 2026-10-03 24:55 · tv | Confirmed first regular public schedule. | [Official source](https://ranma-pr.com/news/2467/) |
| 7 | 마법기사 레이어스<br>`magic-knight-rayearth` | 2026-10-07 23:45 · tv | Confirmed first regular public schedule. | [Official source](https://rayearth-anime.com/) |
| 8 | 어떤 암부의 소녀공서<br>`a-certain-dark-sides-shared-living` | 2026-10-09 22:30 · tv | Confirmed first regular public schedule. | [Official source](https://toaru-project.com/item/onair/) |
| 9 | 어디보다 먼 곳에 있는 너에게<br>`to-you-in-the-beyond` | 2026-10-09 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://sh-anime.shochiku.co.jp/dokokimi-movie/news/10) |
| 10 | 걸즈 앤 판처 최종장 제5화<br>`girls-und-panzer-das-finale-part-5` | 2026-10-09 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://girls-und-panzer-finale.jp/202603-article-finale5/) |
| 11 | BanG Dream! Ave Mujica prima aurora<br>`bang-dream-ave-mujica-prima-aurora` | 2026-10-16 theatrical (00:00 internal) | Official indexed movie-site announcement confirms October 16; direct movie homepage returned 404. Review when accessible. | [Official source](https://avemujica-movie.bang-dream.com/) |
| 12 | 청춘 돼지는 디어 프렌드의 꿈을 꾸지 않는다<br>`rascal-does-not-dream-of-a-dear-friend` | 2026-10-16 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://ao-buta.com/dearfriend/news/?id=70084) |
| 13 | 사이버펑크: 엣지러너 2<br>`cyberpunk-edgerunners-2` | 2026-10-20 time unknown · streaming | Official streaming premiere date confirmed; exact clock not stated. | [Official source](https://www.cyberpunk.net/en/edgerunners2) |
| 14 | 극장 시리즈 제1부 메이드 인 어비스: 깨어나는 신비<br>`made-in-abyss-theatrical-series-part-1-the-awakening-mystery` | 2026-10-23 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://miabyss.com/news_movie/article015.html) |
| 15 | 야마토여 영원히 REBEL3199 제7장 무지갯빛 윤회<br>`be-forever-yamato-rebel3199-chapter-7-rainbow-reincarnation` | 2026-10-30 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://starblazers-yamato.net/news/1782301824.html) |
| 16 | #좀비를 찾고 있습니다<br>`looking-for-zombies` | — | Monthly Saturday slot announced; first episode date unconfirmed. | [Official source](https://zommasu.com/) |
| 17 | 다크 머신 더 애니메이션<br>`dark-machine-the-animation` | — | October only. | [Official source](https://www.fujitv.co.jp/darkmachine_anime/) |
| 18 | FX전사 쿠루미짱<br>`fx-fighter-kurumi-chan` | Premiere withheld; broadcast 2026-10-01 21:30 | AT-X TV starts October 1 at 21:30; d Anime Store advance streaming is announced without its start date/time. Store broadcast only; earliest premiere withheld. | [Official source](https://fxkurumi-info.com/onair/) |
| 19 | 사이렌<br>`psyren` | — | October only. | [Official source](https://psyren-anime.com/) |
| 20 | TANK CHAIR -탱크체어-<br>`tank-chair` | 2026-10-04 23:00 · tv | Confirmed first regular public schedule. | [Official source](https://www.tankchair-anime.com/en/onair.php) |
| 21 | 드림랜드<br>`dreamland` | 2026-10-17 26:00 · tv | Use Japanese-language broadcast announcement; source article URL corrected for this schedule only. | [Official source](https://www.dreamland-anime.com/2026年10月17日より放送開始！/) |
| 22 | 테츠료! meet with 철도무스메<br>`tetsuryo-meet-with-tetsudo-musume` | 2026-10-08 24:00 · tv | Official indexed ON AIR result confirms October 8 at 24:00; direct page returned 403. Review when accessible. | [Official source](https://tetsuryo-anime.com/onair/) |
| 23 | 정켓 뱅크<br>`junket-bank` | 2026-10-05 24:00 · tv | Confirmed first regular public schedule. | [Official source](https://junketbank-anime.com/) |
| 24 | 너구리랑 여우랑<br>`tanuki-and-kitsune` | — | October only; October 15 is a publication date, not the premiere. | [Official source](https://www.fwinc.co.jp/tanukitsu/wp/?post_type=notice) |
| 25 | 다크 서머너와 사귀고 있다<br>`dating-a-dark-summoner` | 2026-10-04 25:20 · tv | Confirmed first regular public schedule. | [Official source](https://darksummoner.deregula.com/onair/) |
| 26 | 버텍스 포스<br>`vertex-force` | 2026-10-03 23:30 · tv | Confirmed first regular public schedule. | [Official source](https://vertexforce.jp/onair/) |
| 27 | 매지컬★익스플로러<br>`magical-explorer` | 2026-10-03 24:00 · tv | Confirmed first regular public schedule. | [Official source](https://majieku.com/news/?id=71078) |
| 28 | 마로니에 왕국의 7인의 기사<br>`the-seven-knights-of-the-marronnier-kingdom` | — | October only. | [Official source](https://www.nhk-character.com/chara/marronnier/) |
| 29 | 세계 최강의 마녀, 시작했습니다<br>`the-worlds-strongest-witch-has-begun` | 2026-10-07 time unknown · tv | Official indexed news confirms October 7. Direct page returned 403; earliest channel time could not be fully verified, so clock withheld. | [Official source](https://sekamajo-anime.com/news/information/82/) |
| 30 | 흉란영애 니아 리스톤<br>`nia-liston-the-merciless-maiden` | 2026-10-06 21:25 · tv | Confirmed first regular public schedule. | [Official source](https://kyoranreijo-pr.com/) |
| 31 | 쌀쌀맞은 사토 양이 나에게만 상냥하다<br>`the-salty-koharu-has-a-soft-spot-for-me` | — | Homepage/news did not expose a confirmed first-episode date; September event is advance screening. | [Official source](https://shioama-anime.com/newsList.html) |
| 32 | 소심 MAX 영애인데 수완 좋은 약혼자의 내기에 올라타 버렸다<br>`the-timid-max-lady-took-her-shrewd-fiance-s-bet` | 2026-10-04 23:30 · tv | Confirmed first regular public schedule. | [Official source](https://yowaki-max-anime.com/onair/) |
| 33 | 그녀의 친구<br>`her-friend` | 2026-10-04 25:05 · tv | Confirmed first regular public schedule. | [Official source](https://kanojo-no-tomodachi.deregula.com/) |
| 34 | 바람의 저편<br>`from-far-away` | 2026-10-04 24:00 · tv | Confirmed first regular public schedule. | [Official source](https://kanatakara-anime.com/onair/) |
| 35 | 주홍빛 가면<br>`the-vermilion-mask` | — | Weekly Saturday slot only; no starting day. | [Official source](https://the-vermilion-mask.com/) |
| 36 | 수왕무신 단데바인<br>`beast-king-war-god-dandevine` | 2026-10-07 24:30 · tv | Official Chinese-language edition of the same site supplied the schedule; Japanese page timed out. | [Official source](https://gattaishin.com/dandivine/zh/) |
| 37 | 학생회에도 구멍은 있다!<br>`there-are-holes-in-the-student-council` | 2026-10-03 24:30 · tv | Confirmed first regular public schedule. | [Official source](https://nama-anaru.com/onair/) |
| 38 | 눈을 떴더니 최강 무장과 우주선을 가지고 있어서, 집 한채를 목표로 용병으로 자유롭게 살고 싶다<br>`i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary` | — | Month only; limited advance screening excluded. | [Official source](https://saikyosoubi.com/) |
| 39 | 자금·어묘방 ~자금성 고양이 경비실~<br>`forbidden-city-cat-guard-room` | 2026-10-10 20:00 · tv | Confirmed first regular public schedule. | [Official source](https://nekokeibishitsu-anime.com/news/post-2/) |
| 40 | 초순! 초조 선배<br>`super-psychic-policeman-chojo` | — | Weekly Tuesday slot only; no starting day. | [Official source](https://chojun-anime.com/archives/33) |
| 41 | 전생한 대성녀는 성녀임을 숨긴다<br>`a-tale-of-the-secret-saint` | — | October delay announcement, no starting day. | [Official source](https://daiseijo-anime.com/news/index00210000.html) |
| 42 | 전생 고블린인데 질문 있어?<br>`im-a-reincarnated-goblin-any-questions` | — | October only. | [Official source](https://tengobu-anime.com/news/index00060000.html) |
| 43 | 마법의 자매 루룻토릴리 제2쿨<br>`magical-sisters-lulutto-lilly-part-2` | 2026-10-04 22:30 · tv | Confirmed first regular public schedule. | [Official source](https://www.luluttolilly.com/news/detail.php?id=24130) |
| 44 | 귀환자의 마법은 특별해야 합니다 2기<br>`a-returners-magic-should-be-special-season-2` | — | Season 2 month only. July/25:45 on the ON AIR page belongs to Season 1. | [Official source](https://returners-magic.com/) |
| 45 | 도원암귀 닛코·게곤 폭포편<br>`tougen-anki-nikko-and-kegon-falls-arc` | — | New arc month only; prior arc streaming schedules not reused. | [Official source](https://tougenanki-anime.com/) |
| 46 | 도쿄 리벤저스 삼천전쟁편<br>`tokyo-revengers-three-deities-war-arc` | 2026-10-02 深夜1時23分 · tv | Confirmed first regular public schedule. | [Official source](https://tokyo-revengers-anime.com/news/archives/4935) |
| 47 | 마법소녀 육성계획 restart<br>`magical-girl-raising-project-restart` | 2026-10-05 深夜2時00分 · tv | Confirmed first regular public schedule. | [Official source](https://www.tv-tokyo.co.jp/anime/mahoiku-restart/) |
| 48 | 블랙 클로버 2nd Season<br>`black-clover-2nd-season` | — | Season 2 month only; ON AIR URL unavailable. | [Official source](https://bclover.jp/news/detail.php?id=1133984) |
| 49 | 빙검의 마술사가 세계를 다스린다 II<br>`the-iceblade-sorcerer-shall-rule-the-world-ii` | 2026-10-08 深夜1:28 · tv | Confirmed first regular public schedule. | [Official source](https://hyouken-anime.com/) |
| 50 | 사사키와 피짱 Season 2<br>`sasaki-and-peeps-season-2` | — | Season 2 month only; January 5, 2024 streaming is Season 1. | [Official source](https://sasapi-anime.com/news/article_043.html) |
| 51 | 아오아시 Season 2<br>`aoashi-season-2` | 2026-10-04 17:00 · tv | Confirmed first regular public schedule. | [Official source](https://aoashi-pr.com/news/572/) |
| 52 | 전생했더니 검이었습니다 II<br>`reincarnated-as-a-sword-ii` | 2026-09-30 24:30 · streaming | ABEMA regular public streaming September 30 at 24:30 precedes October 7 at 24:00 TV. Preserve both; existing coarse October calendar unchanged. | [Official source](https://www.tenken-anime.com/onair.html) |
| 53 | 치토세 군은 라무네 병 속에 제2쿨<br>`chitose-is-in-the-ramune-bottle-part-2` | — | Second cour month only; October 7, 2025 ON AIR data belongs to first cour. | [Official source](https://chiramune.com/) |
| 54 | 탐정은 이미 죽었다. Season 2<br>`the-detective-is-already-dead-season-2` | 2026-10-07 21:30 · tv | Confirmed first regular public schedule. | [Official source](https://tanmoshi-anime.jp/Season2/onair/index.html) |
| 55 | 푸른 상자 Season 2<br>`blue-box-season-2` | 2026-10-04 16:30 · tv | Confirmed first regular public schedule. | [Official source](https://aonohako-anime.com/) |
| 56 | 반딧불이의 혼례<br>`firefly-wedding` | 2026-10-09 23:30 · tv | Confirmed first regular public schedule. | [Official source](https://hotaru-anime.com/news/70/) |
| 57 | 환상수호전<br>`suikoden` | — | October only, despite network lineup announcement. | [Official source](https://suikoden-anime.com/news/detail.html?d=20260305_1) |
| 58 | GROTESQQQUE -그로테스크-<br>`grotesqqque` | 2026-11-06 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://movie-gtq123.com/) |
| 59 | 데몬즈 크레스트<br>`demons-crest` | 2026-11-06 time unknown · streaming | Prime Video premiere date confirmed; exact clock not stated. | [Official source](https://demonscrest-anime.com/) |
| 60 | 낙원추방: 마음의 레조넌스<br>`expelled-from-paradise-resonance-of-the-heart` | 2026-11-13 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://rakuen-tsuiho-r.com/) |
| 61 | 장갑기병 보톰즈 회색 마녀 제1작<br>`armored-trooper-votoms-the-gray-witch-part-1` | 2026-11-20 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://www.votoms-gh.com/news/detail.php?id=23579) |
| 62 | 마법사의 밤<br>`witch-on-the-holy-night` | 2026-11-20 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://mahoyo-movie.com/) |
| 63 | 풀 나이트<br>`fool-night` | 2026-11-26 time unknown · streaming | Official streaming premiere date confirmed; exact clock not stated. | [Official source](https://www.foolnight.com/) |
| 64 | 호랑이 들어와요2<br>`tiger-coming-in-2` | — | Winter only; official social page could not be retrieved. | [Official source](https://x.com/Laftel_net/status/2095084014784901452) |
| 65 | 극장판 약사의 혼잣말: 망비의 비보<br>`the-apothecary-diaries-the-late-consorts-secret-treasure` | 2026-12-11 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://kusuriyanohitorigoto.jp/news/2520/) |
| 66 | 〈모노가타리〉 시리즈 오프 & 몬스터 시즌 — 업보 이야기 카렌 오거<br>`monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre` | — | Winter only. | [Official source](https://www.monogatari-series.com/oms/news/) |
| 67 | 뱅드림! 잇츠 마이고!!!!! / 아베 무지카 후속 시리즈<br>`bang-dream-its-mygo-ave-mujica-sequel-series` | — | Official homepage returned 404; no exact date verified. | [Official source](https://anime.bang-dream.com/mygo-avemujica/) |
| 68 | 사카모토 데이즈 2기<br>`sakamoto-days-season-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://sakamotodays.jp/) |
| 69 | 에브리데이 호스트 신시리즈<br>`everyday-host-new-series` | — | Homepage has no new-season exact date. | [Official source](https://www.tv-tokyo.co.jp/anime/everydayhost/) |
| 70 | 스다치의 마왕성<br>`sudachis-demon-kings-castle` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://www.sudachi-anime.com/) |
| 71 | 마슐-MASHLE- 3기 「삼마대쟁 신각자 최종시험편」<br>`mashle-season-3-divine-visionary-final-exam-arc` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://mashle.pw/) |
| 72 | 무르시엘라고<br>`murcie-lago` | — | Official year-only announcement; existing month field preserved without endorsing it. | [Official source](https://www.murcielago-anime.com/) |
| 73 | 라멘 아카네코 두 번째<br>`ramen-akaneko-part-two` | — | No Season 2 exact date on homepage. | [Official source](https://ramenakaneko.com/) |
| 74 | 잇시키 양은 사랑을 알고 싶어.<br>`isshiki-san-wants-to-know-love` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://isshikisan-anime.com/) |
| 75 | 나와 유우 형!<br>`me-and-big-bro-yuu` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://oretoyunii.com/) |
| 76 | 상처와 붕대<br>`wound-and-bandage` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://houtaidoumei.com/) |
| 77 | 이지러진 달의 메르세데스<br>`mercedes-and-the-waning-moon` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://mercedes-anime.com/) |
| 78 | 말리화 관리전<br>`matsurika-kanriden` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://matsurika-anime.com/) |
| 79 | 바람을 잇는 이들<br>`those-who-inherit-the-wind` | — | Weekly Sunday slot only, no first day. | [Official source](https://kaze-tsugu.com/) |
| 80 | 악마에 입문했습니다! 이루마 군 : if Episode of 마피아<br>`welcome-to-demon-school-iruma-kun-if-episode-of-mafia` | — | Official X could not be retrieved. | [Official source](https://x.com/nep_irumafia) |
| 81 | 가챠를 돌려 동료를 늘리고 최강의 미소녀 군단을 만들자<br>`gacha-to-build-the-strongest-beautiful-girl-army` | — | Official homepage unavailable. | [Official source](https://gachanime.jp/) |
| 82 | 게임세계전생〈던활〉<br>`reincarnated-in-a-game-world-dungeon-activity` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://dankatsu.com/) |
| 83 | 결계사의 일륜화<br>`bride-of-the-barrier-master` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://kekkaishi-ichirinka-anime.com/) |
| 84 | 골든 카무이 최종장 폭주열차편<br>`golden-kamuy-final-chapter-runaway-train-arc` | — | Current official portal has no new-season exact date. | [Official source](https://www.kamuy-anime.com/) |
| 85 | 공주 기사의 기둥서방<br>`the-kept-man-of-the-princess-knight` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://himehimo.jp/) |
| 86 | 러브라이브! 하스노소라 여학원 스쿨 아이돌 클럽 TV 시리즈<br>`love-live-hasunosora-girls-high-school-idol-club-tv-series` | — | Official page could not be retrieved (403). | [Official source](https://www.lovelive-anime.jp/hasunosora/) |
| 87 | 샹그릴라 프론티어 3rd Season<br>`shangri-la-frontier-season-3` | — | January/Sunday slot only, no first day. | [Official source](https://anime.shangrilafrontier.com/) |
| 88 | 아카네바나시 2기<br>`akane-banashi-season-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://akane-banashi.com/) |
| 89 | 유구의 우자 아즈리의 현자 추천<br>`the-principle-of-a-philosopher-by-eternal-fool-asley` | — | Official homepage unavailable. | [Official source](https://asley-anime.com/) |
| 90 | 이세계 전생 소동기<br>`isekai-tensei-soudouki` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://www.soudouki.com/) |
| 91 | 자이언트 아가씨<br>`giant-ojou-sama` | — | Official page contained no extractable schedule. | [Official source](https://giant-ojosama-anime.com/) |
| 92 | 잡용부여술사가 자신의 최강을 깨닫기까지<br>`the-jack-of-all-trades-support-mage-realizes-hes-the-strongest` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://zatsuyofuyo-pr.com/) |
| 93 | 좀비가 넘쳐나는 세상에서 나만 습격당하지 않는다<br>`in-a-world-overrun-with-zombies-im-the-only-one-they-dont-attack` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://zom-ore.com/) |
| 94 | 카리스마<br>`charisma` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://anime.charisma-house.com/) |
| 95 | 쿠로이와 메다카에게 내 귀여움이 통하지 않아 Season 2<br>`medaka-kuroiwa-is-impervious-to-my-charms-season-2` | — | No Season 2 exact date on homepage. | [Official source](https://monaxmedaka.com/) |
| 96 | 펜과 수갑과 사실혼<br>`pen-handcuffs-and-de-facto-marriage` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://pentowappa-anime.com/) |
| 97 | 히라야스미<br>`hirayasumi` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://hirayasumi-anime.jp/) |
| 98 | 히스토리에<br>`historie` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://www.historie.info/) |
| 99 | ghost／밤의 끝<br>`ghost-the-end-of-night` | 2027-02-11 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://www.ghost-yoruhate.com/) |
| 100 | 극장판 메달리스트<br>`medalist-the-movie` | 2027-02-19 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://medalist-pr.com/) |
| 101 | 더 원피스<br>`the-one-piece` | — | WIT works listing shows 2027.02.01~, but announcement body confirms February only. Treat possible listing placeholder as ambiguous; do not invent February 1 premiere. | [Official source](https://www.witstudio.co.jp/works/the-one-piece) |
| 102 | 기동경찰 패트레이버 EZY File 3<br>`mobile-police-patlabor-ezy-file-3` | 2027-03-05 theatrical (00:00 internal) | Confirmed theatrical opening; internal midnight. | [Official source](https://ezy.patlabor.tokyo/) |
| 103 | 쇼젠<br>`sho-zen` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://www.fujitv.co.jp/shozen/) |
| 104 | 스킵과 로퍼 2nd season<br>`skip-and-loafer-season-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://skip-and-loafer.com/) |
| 105 | 약사의 혼잣말 3기 제2쿨<br>`the-apothecary-diaries-season-3-part-2` | — | Second cour month only; first-cour timing not reused. | [Official source](https://kusuriyanohitorigoto.jp/) |
| 106 | 카구라바치<br>`kagurabachi` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://anime.kagurabachi.jp/) |
| 107 | 텐카이치 일본 최강 무예자 결정전<br>`tenkaichi-the-greatest-warrior-under-the-rising-sun` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://tenkaichi-anime.com/) |
| 108 | 던전밥 Season 2<br>`delicious-in-dungeon-season-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://delicious-in-dungeon.com/) |
| 109 | 장송의 프리렌 3기 — 황금향편<br>`frieren-beyond-journeys-end-season-3-golden-land-arc` | — | 2027 season month only; 2023 first-season date not reused. | [Official source](https://frieren-anime.jp/) |
| 110 | 늑대와 향신료 MERCHANT MEETS THE WISE WOLF 2기<br>`spice-and-wolf-merchant-meets-the-wise-wolf-season-2` | — | 2027 Season 2 only; April 2024 ON AIR is Season 1. | [Official source](https://spice-and-wolf.com/) |
| 111 | 단다단 3기<br>`dan-da-dan-season-3` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://anime-dandadan.com/) |
| 112 | 이 멋진 세계에 축복을! 4기<br>`konosuba-gods-blessing-on-this-wonderful-world-season-4` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://konosuba.com/) |
| 113 | 유루캠△ Season 4<br>`laid-back-camp-season-4` | — | No new-season exact date on official portal. | [Official source](https://yurucamp.jp/) |
| 114 | 내 마음의 위험한 녀석 3기<br>`the-dangers-in-my-heart-season-3` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://bokuyaba-anime.com/) |
| 115 | 망각 배터리 2기<br>`oblivion-battery-season-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://boukyaku-battery.com/) |
| 116 | 옆자리 아랴 양 2기<br>`alya-sometimes-hides-her-feelings-in-russian-season-2` | — | Homepage artwork and existing coarse year differ; no exact date verified. Unrelated coarse metadata preserved for separate review. | [Official source](https://roshidere.com/) |
| 117 | 원펀맨 3기 제2쿨<br>`one-punch-man-season-3-part-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://onepunchman-anime.net/) |
| 118 | 방패 용사 성공담 Season 5<br>`the-rising-of-the-shield-hero-season-5` | — | No exact date for Season 5. | [Official source](https://shieldhero-anime.jp/) |
| 119 | 악역 영애 안의 사람<br>`the-one-within-the-villainess` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://nakanohito-pr.com/) |
| 120 | 비블리아 고서당 사건수첩<br>`the-case-records-of-the-biblia-secondhand-bookstore` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://biblia-anime.com/) |
| 121 | 전주교실<br>`war-music-classroom` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://thebuglecall-anime.com/) |
| 122 | 블레스<br>`bless` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://bless-anime.com/) |
| 123 | 마녀와 용병<br>`the-witch-and-the-mercenary` | — | No exact premiere date. | [Official source](https://www.anime-witch-mercenary-official.com/) |
| 124 | 페이트/칼레이드 라이너 프리즈마☆이리야 피날레<br>`fate-kaleid-liner-prisma-illya-finale` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://anime.prisma-illya.jp/finale/) |
| 125 | 데스 스트랜딩 아이솔레이션즈 (가제)<br>`death-stranding-isolations-working-title` | — | Production announcement only; no exact premiere date. | [Official source](https://www.kojimaproductions.jp/ja/ds_animation_project) |
| 126 | 고스트 오브 쓰시마: 레전드<br>`ghost-of-tsushima-legends` | — | Official Crunchyroll article yielded no readable content; no exact date added. | [Official source](https://www.crunchyroll.com/news/announcements/2025/1/7/ghost-of-tsushima-legends-anime-series-2027-crunchyroll) |
| 127 | 극장판 하이큐!! VS 작은 거인<br>`haikyu-the-movie-vs-the-little-giant` | — | 2027 movie only. | [Official source](https://haikyu.jp/movie/index.html) |
| 128 | 극장판 어둠의 실력자가 되고 싶어서! 잔향편<br>`the-eminence-in-shadow-lost-echoes` | — | Movie announcement only; no exact release date. | [Official source](https://shadow-garden.jp/) |
| 129 | 원피스 필름 갓 밸리<br>`one-piece-film-god-valley` | — | 2027 summer only. | [Official source](https://www.onepiece-film.jp/) |
| 130 | 바다를 달리는 엔딩 크레딧<br>`the-end-roll-runs-across-the-sea` | — | Movie announcement only; no exact date. | [Official source](https://umi-endroll-movie.com/) |
| 131 | 세계 최고의 암살자, 이세계 귀족으로 전생하다 Season 2<br>`the-worlds-finest-assassin-season-2` | — | Inspected official announcement; no exact premiere date verified (coarse timing retained). | [Official source](https://ansatsu-kizoku.jp/) |
| 132 | 개구리 중사 케로로☆<br>`keroro-gunso-star` | — | Official text says autumn; no precise date. Existing user-confirmed October field preserved. | [Official source](https://www.bn-pictures.co.jp/keroro-anime/tv/) |

## Verification architecture

`schedule.source` references a URL in the existing `verification.sources` array; `schedule.verifiedAt` is field-specific. The matching source gets its own `verifiedAt` without changing existing verification labels/support fields. Existing general verification dates are preserved except where previously missing. No second source registry was introduced.

See [schedule schema](schedule-schema.md) and run `node scripts/validate-schedules.js` for current totals and source-reference validation.


## Implementation verification

- 23 Node tests passed, including ordinary/midnight/24:00/25:30/26:00 schedules, leap/year boundaries, unknown times, theatrical midnight, streaming-first chronology, expired items, inclusive 30-day boundary, and multiple viewer timezones. Slot tests cover 0/1/2/3/22 results with modular wrap and no duplicate indexes.
- `validate-schedules.js`: 132 effective records; 49 premiere dates / 28 real clocks / 5 date-only / 16 theatrical / 1 broadcast-only, no errors.
- Existing `validate-data.js`: valid, no errors or warnings. Existing regional streaming validator: passed for 132 records.
- All changed/new JavaScript passed `node --check`; `git diff --check` passed.
- Complete production generation pipeline passed in an isolated copy: 132 anime pages, 13 calendar archive pages, SEO/breadcrumb/streaming enhancements, updates page, and title wrapping. Generated output was not mixed into the focused source changes.
- Browser: KR/JP/EN update immediately, including the selection announcement. Manual previous/next and keyboard navigation wrap both directions. 0 hides the section; 1 hides both controls; 2 uses distinct cards; 3 and 8 show three distinct slots. Seventeen successive right-arrow inputs on 8 items end on item 2 as expected. A horizontal drag in the 320px viewport advances one item without activating its listing link.
- A live near-release fixture decreased its seconds without advancing selection. Advancing its clock past the premiere removed that title and retained the remaining items. Date-only fixtures show localized today wording without a clock and expire at the next source-calendar midnight.
- Visual review at 320, 390, 768 and desktop widths confirmed readable countdowns, clamped long titles, restrained side-card blur, and usable controls. At the narrow 320px iframe (305px content with desktop scrollbar), the existing homepage has 18px horizontal overflow both with and without the new section; the carousel adds none. 390px/tablet layouts do not show that existing overflow. This unrelated baseline layout issue was preserved rather than redesigned.
- Existing year/month/category/search filtering, carousel-to-listing filter reset/focus/anchor, source modal, PV links, previous-series streaming menu, and hamburger menu were exercised successfully. Resource target URLs remain unchanged.
- Reduced-motion CSS and timer cleanup/visibility behavior were reviewed in code. Browser QA uses desktop Chrome at mobile iframe viewport widths and pointer drag; physical Android/iOS touch devices and OS motion-setting emulation were not available in this session.
