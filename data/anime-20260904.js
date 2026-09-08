// Additions verified through 2026-09-07. Kept separate from the large canonical file to make this update auditable.
(() => {
  const VERIFIED_AT = "2026-09-07";

  const monthRelease = (year, month) => ({ status: "month", year, month, day: null });
  const dateRelease = (year, month, day) => ({ status: "date", year, month, day });
  const officialSource = (url, label, supports = ["announcement", "release", "format"]) => ({
    type: "official-site",
    url,
    label,
    supports,
    verifiedAt: VERIFIED_AT
  });
  const tvSchedule = (date, time, source) => ({
    premiere: {
      type: "tv",
      date,
      time,
      timezone: "Asia/Tokyo",
      displayTime: time
    },
    source,
    verifiedAt: VERIFIED_AT
  });

  const additions = [
    {
      id: "the-worlds-finest-assassin-season-2",
      title: {
        ko: "세계 최고의 암살자, 이세계 귀족으로 전생하다 Season 2",
        ja: "世界最高の暗殺者、異世界貴族に転生する Season2",
        en: "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat Season 2"
      },
      aliases: ["암살 귀족 2기", "暗殺貴族 Season2", "The World's Finest Assassin Season 2"],
      release: { japan: monthRelease(2027, 1), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2027-winter",
      format: "tv",
      origin: "light-novel",
      tags: ["major", "series", "ln"],
      poster: { src: "assets/posters/worlds-finest-assassin-s2.webp", position: "center" },
      links: {
        pv: "https://www.youtube.com/watch?v=DAXn92SSHIo",
        official: "https://ansatsu-kizoku.jp/",
        streaming: null
      },
      streaming: {},
      verification: {
        verifiedAt: "2026-09-04",
        sources: [
          {
            type: "official-site",
            url: "https://ansatsu-kizoku.jp/news/post-37",
            label: "Official website — Season 2 teaser visual",
            supports: ["announcement", "release", "poster"]
          },
          {
            type: "official-x",
            url: "https://x.com/ansatsu_kizoku/status/2095708679857213795",
            label: "Official X announcement",
            supports: ["release", "pv", "announcement"]
          }
        ]
      },
      createdAt: "2026-09-04",
      updatedAt: "2026-09-04"
    },
    {
      id: "keroro-gunso-star",
      title: { ko: "개구리 중사 케로로☆", ja: "ケロロ軍曹☆", en: "Sgt. Frog☆" },
      aliases: ["케로로 중사☆", "케로로 군조☆", "Keroro Gunso☆"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["major", "new", "comic"],
      poster: { src: "assets/posters/keroro-gunso-star.webp", position: "center" },
      links: {
        pv: "https://www.youtube.com/watch?v=S6KZXOfh-uk",
        official: "https://www.bn-pictures.co.jp/keroro-anime/tv/",
        streaming: null
      },
      streaming: {},
      verification: {
        verifiedAt: "2026-09-04",
        sources: [
          {
            type: "official-x",
            url: "https://x.com/keroro_anime/status/2095784141308809403",
            label: "Official X announcement",
            supports: ["announcement", "release"]
          },
          {
            type: "official-site",
            url: "https://www.bn-pictures.co.jp/keroro-anime/tv/",
            label: "Official website",
            supports: ["announcement", "release", "format", "poster"]
          },
          {
            type: "official-youtube",
            url: "https://www.youtube.com/watch?v=S6KZXOfh-uk",
            label: "Official YouTube",
            supports: ["announcement", "release", "pv"]
          }
        ]
      },
      createdAt: "2026-09-04",
      updatedAt: "2026-09-04"
    },
    {
      id: "banished-cheat-granting-mage-second-life",
      title: {
        ko: "추방된 치트 부여 마술사는 제멋대로 세컨드 라이프를 구가한다. ~나는 무기뿐만 아니라, 모든 것에 『강화 포인트』를 부여할 수 있고, 언제든지 효과를 해제할 수 있는데, 남은 사람들은 괜찮아?~",
        ja: "追放されたチート付与魔術師は気ままなセカンドライフを謳歌する。 ～俺は武器だけじゃなく、あらゆるものに『強化ポイント』を付与できるし、俺の意思でいつでも効果を解除できるけど、残った人たち大丈夫？～",
        en: "The Banished Cheat-Granting Mage Enjoys a Carefree Second Life"
      },
      aliases: ["치트 부여", "チー付与", "Chii Fuyo"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "comic",
      tags: ["new", "comic"],
      poster: {
        src: "https://sh-anime.shochiku.co.jp/chiifuyo-anime/common/images/top_fv_kv01.jpg",
        position: "center top"
      },
      links: {
        pv: "https://youtu.be/LBvebquURiU",
        official: "https://sh-anime.shochiku.co.jp/chiifuyo-anime/",
        streaming: null
      },
      streaming: {},
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [
          officialSource(
            "https://sh-anime.shochiku.co.jp/chiifuyo-anime/onair",
            "Official ON AIR — October 2026 on TV Tokyo network",
            ["release", "format"]
          ),
          officialSource(
            "https://sh-anime.shochiku.co.jp/chiifuyo-anime/",
            "Official website",
            ["announcement", "release", "format", "poster"]
          ),
          officialSource(
            "https://sh-anime.shochiku.co.jp/chiifuyo-anime/news/29",
            "Official news — Action PV",
            ["pv"]
          ),
          {
            type: "official-youtube",
            url: "https://youtu.be/LBvebquURiU",
            label: "SHOCHIKU anime Channel — Action PV",
            supports: ["pv"],
            verifiedAt: VERIFIED_AT
          }
        ]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },

    // Officially revalidated omissions discovered during the 2026 fall-season audit.
    {
      id: "ice-wall-season-2",
      title: { ko: "얼음의 성벽 2기", ja: "氷の城壁 第2期", en: "The Ramparts of Ice Season 2" },
      aliases: ["氷の城壁 2期", "Koori no Jouheki Season 2"],
      release: { japan: dateRelease(2026, 10, 1), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["series", "comic"],
      poster: null,
      links: { pv: null, official: "https://korinojoheki-pr.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-01", "23:56", "https://korinojoheki-pr.com/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://korinojoheki-pr.com/", "Official website / TBS — Season 2 starts October 1 at 23:56", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "lent-magic-revolving-collection",
      title: {
        ko: "빌린 마력은 【리볼빙】으로 강제 징수",
        ja: "貸した魔力は【リボ払い】で強制徴収",
        en: "Kashita Maryoku wa [Revolving] de Kyosei Choshu"
      },
      aliases: ["貸した魔力は〖リボ払い〗で強制徴収", "빌린 마력 리볼빙"],
      release: { japan: dateRelease(2026, 10, 3), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "light-novel",
      tags: ["new", "ln"],
      poster: null,
      links: { pv: null, official: "https://revo-anime.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-03", "25:30", "https://revo-anime.com/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://revo-anime.com/", "Official ON AIR — October 3, 25:30 (TV Asahi network)", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "overgeared-the-power-of-items",
      title: { ko: "템빨 ~아이템의 힘~", ja: "テムパル～アイテムの力～", en: "Overgeared: The Power of Items" },
      aliases: ["템빨", "Overgeared", "テムパル"],
      release: { japan: dateRelease(2026, 10, 2), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "web-novel",
      tags: ["new", "webnovel"],
      poster: null,
      links: { pv: null, official: "https://tempal-anime.net/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-02", "23:30", "https://tempal-anime.net/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://tempal-anime.net/", "Official website — October 2, 23:30 (TOKYO MX / BS11)", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "uncle-likes-cute-things",
      title: { ko: "아저씨는 귀여운 것을 좋아해.", ja: "おじさんはカワイイものがお好き。", en: "The Old Man Loves Cute Things." },
      aliases: ["おじカワ", "Ojisan wa Kawaii Mono ga Osuki"],
      release: { japan: dateRelease(2026, 10, 4), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["new", "comic"],
      poster: null,
      links: { pv: "https://www.youtube.com/watch?v=YKgjylmYeoA", official: "https://ojikawa.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-04", "22:00", "https://ojikawa.com/news/post-61"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [
          officialSource("https://ojikawa.com/news/post-61", "Official news — October 4, 22:00 (TOKYO MX)", ["announcement", "release", "format"]),
          officialSource("https://ojikawa.com/", "Official website", ["announcement"])
        ]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "mission-yozakura-family-season-2-part-2",
      title: {
        ko: "요자쿠라 일가의 대작전 2기 제2쿨",
        ja: "夜桜さんちの大作戦 第2期 第2クール",
        en: "Mission: Yozakura Family Season 2 Part 2"
      },
      aliases: ["夜桜さんちの大作戦 2期 2クール", "Mission Yozakura Family S2 Part 2"],
      release: { japan: dateRelease(2026, 10, 11), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["series", "comic"],
      poster: null,
      links: { pv: null, official: "https://mission-yozakura-family.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-11", "17:00", "https://www.sonymusic.co.jp/artist/kidphenomenon/info/586481"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [
          officialSource("https://mission-yozakura-family.com/", "Official anime website — Season 2 Part 2 starts October 2026", ["announcement", "release"]),
          officialSource("https://www.sonymusic.co.jp/artist/kidphenomenon/info/586481", "Sony Music official — October 11, 17:00 (MBS/TBS network)", ["release", "format"])
        ]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "dragon-ball-super-beerus",
      title: { ko: "드래곤볼 슈퍼 비루스", ja: "ドラゴンボール超 ビルス", en: "Dragon Ball Super: Beerus" },
      aliases: ["ドラゴンボール超スーパー ビルス", "Dragon Ball Super Beerus"],
      release: { japan: dateRelease(2026, 10, 11), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["major", "series", "comic"],
      poster: null,
      links: { pv: null, official: "https://dragonball-super.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-11", "23:15", "https://dragonball-super.com/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://dragonball-super.com/", "Official website — October 11, 23:15 (Fuji TV network)", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "zero-believers-goddess-isekai-strategy",
      title: {
        ko: "신자 제로의 여신님과 시작하는 이세계 공략",
        ja: "信者ゼロの女神サマと始める異世界攻略",
        en: "Full Clearing Another World under a Goddess with Zero Believers"
      },
      aliases: ["信者ゼロ", "Zero Believers Goddess"],
      release: { japan: dateRelease(2026, 10, 11), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "light-novel",
      tags: ["new", "ln"],
      poster: null,
      links: { pv: null, official: "https://zero-believers-anime.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-11", "23:30", "https://zero-believers-anime.com/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://zero-believers-anime.com/", "Official ON AIR — October 11, 23:30 (BS Asahi)", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "romelia-war-chronicle",
      title: { ko: "로멜리아 전기", ja: "ロメリア戦記", en: "Romelia War Chronicle" },
      aliases: ["Romelia Senki"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "light-novel",
      tags: ["new", "ln"],
      poster: null,
      links: { pv: null, official: "https://romelia-senki.com/", streaming: null },
      streaming: {},
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://romelia-senki.com/", "Official website — October 2026, two cours", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "hotel-inhumans-season-2",
      title: { ko: "호텔 인휴먼즈 2기", ja: "ホテル・インヒューマンズ 第2期", en: "Hotel Inhumans Season 2" },
      aliases: ["ホテル・インヒューマンズ 2期"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["series", "comic"],
      poster: null,
      links: { pv: null, official: "https://hotel-inhumans.com/", streaming: null },
      streaming: {},
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://hotel-inhumans.com/", "Official website — Season 2 starts October 2026", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "a-wild-last-boss-appeared-season-2",
      title: { ko: "야생의 라스트 보스가 나타났다! 2기", ja: "野生のラスボスが現れた！第2期", en: "A Wild Last Boss Appeared! Season 2" },
      aliases: ["野生のラスボスが現れた 2期"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "light-novel",
      tags: ["series", "ln"],
      poster: { src: "assets/posters/a-wild-last-boss-appeared-season-2-user-20260908.webp", position: null },
      links: { pv: null, official: "https://www.lastboss-anime.com/", streaming: null },
      streaming: {},
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://www.lastboss-anime.com/", "Official website — Season 2 starts October 2026", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "the-witch-was-asked-for-a-love-potion",
      title: {
        ko: "안녕하세요. 반한 사람에게 사랑의 묘약을 의뢰받은 마녀입니다.",
        ja: "どうも、好きな人に惚れ薬を依頼された魔女です。",
        en: "Hello, I Am a Witch, and My Crush Wants Me to Make a Love Potion!"
      },
      aliases: ["惚れ魔女", "Horemajo"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "light-novel",
      tags: ["new", "ln"],
      poster: null,
      links: { pv: "https://www.youtube.com/watch?v=XplGl4tL_8w", official: "https://horemajo-anime.com/", streaming: null },
      streaming: {},
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://horemajo-anime.com/", "Official website — October 2026 start", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "with-vengeance-sincerely-your-broken-saintess-season-2",
      title: {
        ko: "상처투성이 성녀로부터 보복을 담아 Season2",
        ja: "傷だらけ聖女より報復をこめて Season2",
        en: "With Vengeance, Sincerely, Your Broken Saintess Season 2"
      },
      aliases: ["傷だらけ聖女 Season2", "Broken Saintess Season 2"],
      release: { japan: dateRelease(2026, 10, 1), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "webtoon",
      tags: ["series", "webtoon"],
      poster: null,
      links: { pv: "https://youtu.be/wsdW5YP9A_c", official: "https://animationid.com/kizudarakeseijo2/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-10-01", "24:00", "https://animationid.com/kizudarakeseijo2/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://animationid.com/kizudarakeseijo2/", "Official ON AIR — October 1, 24:00 (tvk)", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "ace-of-diamond-act-ii-second-season-part-2",
      title: {
        ko: "다이아몬드 에이스 actⅡ -Second Season- 제2쿨",
        ja: "ダイヤのA actⅡ -Second Season- 第2クール",
        en: "Ace of Diamond act II -Second Season- Part 2"
      },
      aliases: ["ダイヤのA actⅡ SS 第2クール", "Ace of Diamond act II SS Part 2"],
      release: { japan: monthRelease(2026, 10), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["series", "comic"],
      poster: null,
      links: { pv: null, official: "https://diaace.com/", streaming: null },
      streaming: {},
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://diaace.com/onair/", "Official ON AIR — Part 2 starts October 2026 on TV Tokyo network", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "prince-of-tennis-u17-world-cup-final-members-selection",
      title: {
        ko: "신 테니스의 왕자 U-17 WORLD CUP 결승 멤버 결정전",
        ja: "新テニスの王子様 U-17 WORLD CUP 決勝メンバー決定戦",
        en: "The Prince of Tennis II: U-17 World Cup Final Members Selection"
      },
      aliases: ["新テニスの王子様 決勝メンバー決定戦", "New Prince of Tennis U-17"],
      release: { japan: dateRelease(2026, 9, 30), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["series", "comic"],
      poster: null,
      links: { pv: null, official: "https://www.tv-tokyo.co.jp/anime/tenipri-u17/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-09-30", "24:00", "https://www.tv-tokyo.co.jp/anime/tenipri-u17/onair/"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://www.tv-tokyo.co.jp/anime/tenipri-u17/onair/", "TV Tokyo official — September 30, 24:00", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    },
    {
      id: "appraisal-skill-season-3",
      title: {
        ko: "전생 귀족, 감정 스킬로 성공하다 3기",
        ja: "転生貴族、鑑定スキルで成り上がる 第3期",
        en: "As a Reincarnated Aristocrat, I'll Use My Appraisal Skill to Rise in the World Season 3"
      },
      aliases: ["鑑定スキル 第3期", "감정 스킬 3기"],
      release: { japan: dateRelease(2026, 9, 27), korea: null, global: null },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "light-novel",
      tags: ["series", "ln"],
      poster: null,
      links: { pv: null, official: "https://kanteiskill.com/", streaming: null },
      streaming: {},
      schedule: tvSchedule("2026-09-27", "24:00", "https://kanteiskill.com/news/2190"),
      verification: {
        verifiedAt: VERIFIED_AT,
        sources: [officialSource("https://kanteiskill.com/news/2190", "Official news — September 27, first episode at 24:00 (CBC/TBS network)", ["announcement", "release", "format"])]
      },
      createdAt: VERIFIED_AT,
      updatedAt: VERIFIED_AT
    }
  ];

  if (!Array.isArray(window.animeData)) window.animeData = [];
  const existingIds = new Set(window.animeData.map(anime => anime.id));
  additions.forEach(anime => {
    if (!existingIds.has(anime.id)) window.animeData.push(anime);
  });

  // Winter-only announcements do not identify an exact calendar month.
  // Keep the season label for display while classifying these titles as month-TBA.
  const winterOnlyReleaseFixes = {
    "tiger-coming-in-2": {
      release: {
        status: "year",
        year: 2026,
        month: null,
        day: null,
        display: {
          ko: "2026년 겨울 · 월 미정",
          ja: "2026年冬・月未定",
          en: "Winter 2026 · Month TBA"
        }
      },
      source: {
        type: "official-x",
        url: "https://x.com/Laftel_net/status/2095084014784901452",
        label: "LAFTEL official X — Winter 2026",
        supports: ["announcement", "release"]
      }
    },
    "monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre": {
      release: {
        status: "year",
        year: 2026,
        month: null,
        day: null,
        display: {
          ko: "2026년 겨울 · 월 미정",
          ja: "2026年冬・月未定",
          en: "Winter 2026 · Month TBA"
        }
      },
      source: {
        type: "official-site",
        url: "https://www.monogatari-series.com/oms/news/",
        label: "Official website — Winter 2026",
        supports: ["announcement", "release"]
      }
    }
  };

  Object.entries(winterOnlyReleaseFixes).forEach(([id, fix]) => {
    const anime = window.animeData.find(item => item.id === id);
    if (!anime) return;

    anime.release = anime.release || {};
    anime.release.japan = fix.release;
    anime.season = "2026-winter";
    anime.updatedAt = "2026-09-06";

    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = "2026-09-06";
    anime.verification.sources = Array.isArray(anime.verification.sources) ? anime.verification.sources : [];
    if (!anime.verification.sources.some(source => source.url === fix.source.url)) {
      anime.verification.sources.push(fix.source);
    }
  });
})();
