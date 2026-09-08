// Title, identity, and additive audit corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const darkSummoner = window.animeData.find(item => item.id === "dating-a-dark-summoner");
  if (darkSummoner) {
    darkSummoner.title = {
      ...darkSummoner.title,
      ko: "다크서머너와 썸을 탔다"
    };

    if (Array.isArray(darkSummoner.aliases)) {
      darkSummoner.aliases = darkSummoner.aliases.map(alias =>
        alias === "ダークサモナーとデキている (다크 서머너와 사귀고 있다)"
          ? "ダークサモナーとデキている (다크서머너와 썸을 탔다)"
          : alias
      );
    }

    darkSummoner.updatedAt = "2026-09-05";
  }

  const luluttoLilly = window.animeData.find(item => item.id === "magical-sisters-lulutto-lilly-part-2");
  if (luluttoLilly) {
    luluttoLilly.title = {
      ...luluttoLilly.title,
      ko: "마법의 자매 루루토리리 제2쿨"
    };

    if (Array.isArray(luluttoLilly.aliases)) {
      luluttoLilly.aliases = luluttoLilly.aliases.map(alias =>
        alias === "魔法の姉妹ルルットリリィ 第2クール (마법의 자매 루룻토릴리 제2쿨)"
          ? "魔法の姉妹ルルットリリィ 第2クール (마법의 자매 루루토리리 제2쿨)"
          : alias
      );
    }

    luluttoLilly.updatedAt = "2026-09-07";
  }

  const cheatGrantingMage = window.animeData.find(item => item.id === "banished-cheat-granting-mage-second-life");
  if (cheatGrantingMage) {
    cheatGrantingMage.title = {
      ...cheatGrantingMage.title,
      en: "The Laid-Off Cheat-Granting Mage Enjoys a Second Lease on Life"
    };
    cheatGrantingMage.updatedAt = "2026-09-07";
  }

  // This title already exists in the canonical dataset with its verified September 30 schedule.
  // Drop the audit-time duplicate while preserving the original ID, poster, PV and prior-series links.
  const duplicateTenipriIndex = window.animeData.findIndex(
    item => item.id === "prince-of-tennis-u17-world-cup-final-members-selection"
  );
  if (duplicateTenipriIndex !== -1) window.animeData.splice(duplicateTenipriIndex, 1);

  // 2027 omission audit. Discovery used broad season lists, but every entry below is
  // backed by an official anime/broadcaster/publisher/platform announcement naming 2027.
  // Keep announcement precision intact: month-only, early-year, spring, and year-only
  // releases must not be promoted to fabricated premiere dates.
  const AUDITED_AT = "2026-09-07";
  const monthRelease = month => ({ status: "month", year: 2027, month, day: null });
  const yearRelease = (ko = "2027년 · 월 미정", ja = "2027年・月未定", en = "2027 · Month TBA") => ({
    status: "year",
    year: 2027,
    month: null,
    day: null,
    display: { ko, ja, en }
  });
  const early2027 = () => yearRelease("2027년 초 · 월 미정", "2027年初旬・月未定", "Early 2027 · Month TBA");
  const spring2027 = () => yearRelease("2027년 봄 · 월 미정", "2027年春・月未定", "Spring 2027 · Month TBA");
  const auditSource = (url, label, type = "official-site") => ({
    type,
    url,
    label,
    supports: ["announcement", "release", "format"],
    verifiedAt: AUDITED_AT
  });
  const make2027 = ({
    id, ko, ja, en, aliases = [], release = yearRelease(), season = "2027-tba",
    format = "tv", origin = "manga", tags = ["new", "comic"], official,
    sourceUrl = official, sourceLabel = "Official announcement — 2027", sourceType = "official-site", pv = null, poster = null
  }) => ({
    id,
    title: { ko, ja, en },
    aliases,
    release: { japan: release, korea: null, global: null },
    productionStatus: "scheduled",
    season,
    format,
    origin,
    tags,
    poster,
    links: { pv, official, streaming: null },
    streaming: {},
    verification: {
      verifiedAt: AUDITED_AT,
      sources: [auditSource(sourceUrl, sourceLabel, sourceType)]
    },
    createdAt: AUDITED_AT,
    updatedAt: AUDITED_AT
  });

  const audit2027 = [
    make2027({
      id: "the-guy-she-was-interested-in-wasnt-a-guy-at-all",
      ko: "관심 있는 사람이 남자가 아니었다",
      ja: "気になってる人が男じゃなかった",
      en: "The Guy She Was Interested in Wasn't a Guy at All",
      release: monthRelease(1), season: "2027-winter",
      official: "https://kinioto-anime.com/",
      sourceUrl: "https://www.aniplex.co.jp/lineup/kinioto/news/detail/?id=70768",
      sourceLabel: "Aniplex official — January 2027 TV broadcast"
    }),
    make2027({
      id: "chihara-san-is-she-a-landmine",
      ko: "지뢰인가요? 지하라 씨",
      ja: "地雷なんですか？地原さん",
      en: "Is Chihara-san a Landmine?",
      release: monthRelease(1), season: "2027-winter",
      official: "https://chiharasan-anime.com/",
      sourceLabel: "Official ON AIR — January 2027; weekly Thursday slot only"
    }),
    make2027({
      id: "arcanadea",
      ko: "아르카나디아", ja: "アルカナディア", en: "ARCANADEA",
      release: monthRelease(1), season: "2027-winter", origin: "original", tags: ["new", "original"],
      official: "https://www.arcanadea-anime.com/",
      sourceLabel: "Official ON AIR — January 2027 on NUMAnimation / BS Asahi"
    }),
    make2027({
      id: "marriage-toxin-season-2",
      ko: "매리지 톡신 2기", ja: "マリッジトキシン 第2期", en: "Marriage Toxin Season 2",
      release: monthRelease(1), season: "2027-winter", tags: ["series", "comic"],
      official: "https://www.marriagetoxin-anime.com/",
      sourceUrl: "https://www.ktv.jp/kaanival11/",
      sourceLabel: "Kansai TV official — Season 2 starts January 2027"
    }),
    make2027({
      id: "eleceed",
      ko: "일렉시드", ja: "ELECEED", en: "ELECEED",
      release: early2027(), season: "2027-winter", origin: "webtoon", tags: ["new", "webtoon"],
      official: "https://eleceed-anime.com/",
      sourceLabel: "Official website — broadcast begins in early 2027"
    }),
    make2027({
      id: "lona",
      ko: "LONA", ja: "LONA", en: "LONA",
      release: spring2027(), season: "2027-spring", origin: "original", tags: ["new", "original"],
      official: "https://lona-animation.com/",
      sourceLabel: "Official website — original TV anime, Spring 2027"
    }),
    make2027({
      id: "kindergarten-wars",
      ko: "유치원 WARS", ja: "幼稚園WARS", en: "Kindergarten WARS",
      release: spring2027(), season: "2027-spring",
      official: "https://www.youchienwars.com/",
      sourceLabel: "Official website — Spring 2027 TV broadcast"
    }),
    make2027({
      id: "free-fire-daybreak",
      ko: "프리 파이어: 데이브레이크", ja: "Free Fire: Daybreak", en: "Free Fire: Daybreak",
      release: spring2027(), season: "2027-spring", origin: "game", tags: ["new", "game"],
      official: "https://freefire-anime.jp/",
      sourceUrl: "https://ff.garena.com/en/article/1690/",
      sourceLabel: "Garena official — Spring 2027 worldwide broadcast and streaming",
      sourceType: "publisher"
    }),
    make2027({
      id: "midnight-heart-tune-season-2",
      ko: "한밤중 하트튠 2기", ja: "真夜中ハートチューン 第2期", en: "Tune In to the Midnight Heart Season 2",
      tags: ["series", "comic"],
      official: "https://mayochu-anime.com/",
      sourceUrl: "https://mayochu-anime.com/news/index00440000.html",
      sourceLabel: "Official news — Season 2 broadcasts in 2027"
    }),
    make2027({
      id: "gate-season-2",
      ko: "GATE SEASON2 자위대, 그의 바다에서 이처럼 싸우며",
      ja: "GATE SEASON2 自衛隊 彼の海にて、斯く戦えり",
      en: "GATE Season 2: The JSDF Fought There, at His Sea",
      origin: "light-novel", tags: ["series", "ln"],
      official: "https://www.gate2-alphapolis.com/",
      sourceLabel: "Official website — TV anime broadcast in 2027"
    }),
    make2027({
      id: "dark-gathering-season-2",
      ko: "다크 개더링 2기", ja: "ダークギャザリング 第2期", en: "Dark Gathering Season 2",
      tags: ["series", "comic"],
      official: "https://darkgathering.jp/",
      sourceUrl: "https://darkgathering.jp/onair/",
      sourceLabel: "Official ON AIR — Season 2 broadcasts in 2027"
    }),
    make2027({
      id: "berserk-of-gluttony-season-2",
      ko: "폭식의 베르세르크 Season 2", ja: "暴食のベルセルク Season 2", en: "Berserk of Gluttony Season 2",
      origin: "light-novel", tags: ["series", "ln"],
      official: "https://www.bousyoku-anime.com/",
      sourceLabel: "Official website — Season 2 broadcasts in 2027"
    }),
    make2027({
      id: "new-kochikame",
      ko: "신 여기는 잘나가는 파출소", ja: "新こちら葛飾区亀有公園前派出所", en: "New KochiKame",
      tags: ["series", "comic"],
      official: "https://kochikame-anime.com/",
      sourceLabel: "Official website — 2027 Fuji TV broadcast and platform streaming"
    }),
    make2027({
      id: "haikyu-monsters-go-where",
      ko: "하이큐!! 괴물들이 가는 곳", ja: "ハイキュー!! バケモノたちの行くところ", en: "Haikyu!! Where the Monsters Go",
      format: "special", tags: ["major", "series", "comic"],
      official: "https://haikyu.jp/",
      sourceLabel: "Official Haikyu site — special anime releases in 2027"
    }),
    make2027({
      id: "red-riding-hood-detective-story",
      ko: "빨간 모자, 여행 중 시체를 만나다.", ja: "赤ずきん、旅の途中で死体と出会う。", en: "Red Riding Hood: A Detective Story",
      origin: "novel", tags: ["new"],
      poster: { src: "assets/posters/red-riding-hood-detective-story-user-20260908.webp", position: null },
      official: "https://akazukin-anime.com/",
      sourceLabel: "Official website — anime adaptation in 2027"
    }),
    make2027({
      id: "seven-sleeping-beauties",
      ko: "7인의 잠자는 공주", ja: "7人の眠り姫", en: "Seven Sleeping Beauties",
      official: "https://7-sleepingbeauties.com/",
      sourceUrl: "https://7-sleepingbeauties.com/news/detail/?id=1134580",
      sourceLabel: "Official news — TV anime in 2027"
    }),
    make2027({
      id: "fall-in-love-you-false-angels",
      ko: "사랑하라, 거짓 천사들이여", ja: "恋せよまやかし天使ども", en: "Fall in Love, You False Angels",
      official: "https://koidomo-anime.com/",
      sourceUrl: "https://koidomo-anime.com/news/?id=70640",
      sourceLabel: "Official news — TV anime in 2027"
    }),
    make2027({
      id: "the-strongest-magicmasters-retirement-plan",
      ko: "최강 마법사의 은둔 계획", ja: "最強魔法師の隠遁計画", en: "The Strongest Magicmaster's Retirement Plan",
      origin: "light-novel", tags: ["new", "ln"],
      official: "https://saikyo-mahoushi.com/",
      sourceUrl: "https://saikyo-mahoushi.com/news/260610_anime-adaptation-announced/",
      sourceLabel: "Official news — 2027 CBC/TBS Agaru Anime broadcast"
    }),
    make2027({
      id: "nabe-ni-dangan",
      ko: "냄비에 총탄을 맞으면서", ja: "鍋に弾丸を受けながら", en: "Nabe ni Dangan wo Ukenagara",
      official: "https://www.asmik-ace.co.jp/news/page/2/",
      sourceLabel: "Asmik Ace official — TV anime in 2027",
      sourceType: "distributor"
    }),
    make2027({
      id: "namidaame-to-serenade",
      ko: "눈물비와 세레나데", ja: "涙雨とセレナーデ", en: "Namidaame to Serenade",
      official: "https://namidaame-anime.com/",
      sourceLabel: "Official website — TV anime in 2027"
    }),
    make2027({
      id: "true-saint-banished-country-done-for",
      ko: "진정한 성녀인 저는 추방당했습니다. 그러니 이 나라는 이제 끝입니다",
      ja: "真の聖女である私は追放されました。だからこの国はもう終わりです",
      en: "Because I, the True Saint, Was Banished, That Country Is Done For!",
      origin: "light-novel", tags: ["new", "ln"],
      official: "https://www.shinnoseijo-anime.com/",
      sourceUrl: "https://www.shinnoseijo-anime.com/news/detail.php?id=23927",
      sourceLabel: "Official news — TV anime broadcasts in 2027"
    }),
    make2027({
      id: "studio-cabana",
      ko: "스튜디오 카바나", ja: "スタジオカバナ", en: "Studio Cabana",
      official: "https://studio-cabana.com/",
      sourceUrl: "https://studio-cabana.com/news/42/",
      sourceLabel: "Official news — TV anime in 2027"
    }),
    make2027({
      id: "soara-and-the-house-of-monsters",
      ko: "소아라와 마물의 집", ja: "ソアラと魔物の家", en: "Soara and the House of Monsters",
      official: "https://soara-anime.com/",
      sourceUrl: "https://soara-anime.com/news/detail.html?d=20260701_07",
      sourceLabel: "Official news — TV anime in 2027"
    }),
    make2027({
      id: "dengeki-daisy",
      ko: "전격 데이지", ja: "電撃デイジー", en: "Dengeki Daisy",
      official: "https://dengeki-daisy.com/",
      sourceUrl: "https://www.aniplex.co.jp/lineup/dengeki-daisy/news/detail/?id=70571",
      sourceLabel: "Aniplex official — TV anime in 2027"
    }),
    make2027({
      id: "magic-to-the-limit-reincarnated-elf",
      ko: "마술을 극한까지 익히고 여행을 떠난 전생 엘프, 남아도는 수명으로 살아있는 전설이 된다",
      ja: "魔術を極めて旅に出た転生エルフ、持て余した寿命で生ける伝説となる",
      en: "The Reincarnated Elf Who Mastered Magic and Set Out on a Journey Becomes a Living Legend",
      official: "https://tenseielf.asmik-ace.co.jp/",
      sourceUrl: "https://www.asmik-ace.co.jp/news/%25newscategory%25/19131/",
      sourceLabel: "Asmik Ace official — TV anime broadcasts in 2027",
      sourceType: "distributor"
    }),
    make2027({
      id: "demons-are-plotting",
      ko: "마물들은 계략을 꾸민다", ja: "魔のものたちは企てる", en: "The Demons Are Plotting",
      official: "https://manomono-anime.com/",
      sourceLabel: "Official website — broadcast in 2027"
    }),
    make2027({
      id: "rebel-robotica",
      ko: "레벨 로보티카", ja: "レベルロボチカ", en: "RE:BEL ROBOTICA",
      origin: "original", tags: ["new", "original"],
      official: "https://rebelrobotica-anime.com/",
      sourceLabel: "Official website — original TV anime broadcasts in 2027"
    }),
    make2027({
      id: "beat-and-motion",
      ko: "BEAT & MOTION", ja: "BEAT＆MOTION", en: "BEAT & MOTION",
      format: "streaming",
      official: "https://beatandmotion-anime.com/",
      sourceUrl: "https://about.netflix.com/en/news/netflix-anime-titles-revealed-mappa-15th-anniversary",
      sourceLabel: "Netflix official — exclusive worldwide release in 2027",
      sourceType: "streaming-platform"
    }),
    make2027({
      id: "unlucky-to-strongest-man",
      ko: "불운에서 최강의 남자로", ja: "不運からの最強男", en: "The Strongest Man from Misfortune",
      official: "https://fuunsaikyo.asmik-ace.co.jp/",
      sourceUrl: "https://www.asmik-ace.co.jp/news/contents/19148/",
      sourceLabel: "Asmik Ace official — TV anime broadcasts in 2027",
      sourceType: "distributor"
    }),
    make2027({
      id: "maiden-blood",
      ko: "Maiden Blood", ja: "Maiden Blood", en: "Maiden Blood",
      origin: "original", tags: ["new", "original"],
      official: "https://maiden-blood.com/",
      sourceUrl: "https://www.ppi.co.jp/news/ppipress20260821/?l=j",
      sourceLabel: "Polygon Pictures official — original TV anime in 2027",
      sourceType: "studio",
      pv: "https://www.youtube.com/watch?v=Z2SIqLntKGc"
    }),
    make2027({
      id: "hokuto-no-ken-fist-of-the-north-star-part-2",
      ko: "북두의 권 -FIST OF THE NORTH STAR- 제2쿨",
      ja: "北斗の拳 -FIST OF THE NORTH STAR- 第2クール",
      en: "Fist of the North Star Part 2",
      tags: ["series", "comic"],
      official: "https://hokuto-anime.com/",
      sourceUrl: "https://hokuto-anime.com/news/",
      sourceLabel: "Official news — Part 2 broadcast and streaming in 2027"
    }),
    make2027({
      id: "unrewarded-villager-a",
      ko: "보답받지 못한 마을사람 A, 귀족에게 거두어져 익애받는 데다, 사실 가지고 있던 전설급 신 스킬도 각성했다",
      ja: "報われなかった村人A、貴族に拾われて溺愛される上に、実は持っていた伝説級の神スキルも覚醒した",
      en: "Necromancer Isekai: How I Went from Abandoned Villager to the Emperor's Favorite",
      origin: "light-novel", tags: ["new", "ln"],
      official: "https://mura-a.com/",
      sourceUrl: "https://mura-a.com/news/article.html?id=3",
      sourceLabel: "Official news — TV anime begins broadcasting in 2027"
    }),
    make2027({
      id: "glasses-sometimes-yankee-kun",
      ko: "안경, 때때로 양아치 군", ja: "メガネ、時々、ヤンキーくん", en: "Glasses, Sometimes Yankee-kun",
      official: "https://otasukebu.com/",
      sourceLabel: "Official website — TV anime broadcasts in 2027"
    })
  ];

  const existingIds2027Audit = new Set(window.animeData.map(item => item.id));
  audit2027.forEach(anime => {
    if (existingIds2027Audit.has(anime.id)) return;
    window.animeData.push(anime);
    existingIds2027Audit.add(anime.id);
  });
})();
