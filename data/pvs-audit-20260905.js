// Official PV audit verified on 2026-09-05.
// Loaded after data/pvs.js so newly confirmed direct videos can restore otherwise-empty PV buttons.
(() => {
  const verifiedAt = "2026-09-05";
  const pvUpdates = {
    // Recent-addition PV follow-up, verified on 2026-09-08.  Only direct videos
    // published by the title's official channel are included here.
    "mission-yozakura-family-season-2-part-2": [
      {
        label: { ko: "2기 제2쿨 PV", ja: "第2期 第2クールPV", en: "Season 2 Part 2 PV" },
        url: "https://www.youtube.com/watch?v=059cJjeY19Y"
      }
    ],
    "dragon-ball-super-beerus": [
      {
        label: { ko: "시작 트레일러", ja: "超始動トレーラー", en: "Super Surge Trailer" },
        url: "https://www.youtube.com/watch?v=0ExAS1lmMJg"
      }
    ],
    "a-wild-last-boss-appeared-season-2": [
      {
        label: { ko: "2기 PV 1탄", ja: "第2期PV第1弾", en: "Season 2 PV #1" },
        url: "https://www.youtube.com/watch?v=h6NM7IuyxuU"
      }
    ],
    "ace-of-diamond-act-ii-second-season-part-2": [
      {
        label: { ko: "제2쿨 티저 PV", ja: "第2クールティザーPV", en: "Part 2 Teaser PV" },
        url: "https://www.youtube.com/watch?v=9705sc1udLo"
      }
    ],
    "appraisal-skill-season-3": [
      {
        label: { ko: "3기 PV 1탄", ja: "第3期PV第1弾", en: "Season 3 PV #1" },
        url: "https://www.youtube.com/watch?v=v6984NzFOis"
      }
    ],
    "marriage-toxin-season-2": [
      {
        label: { ko: "2기 결정 PV", ja: "第2期決定PV", en: "Season 2 Announcement PV" },
        url: "https://www.youtube.com/watch?v=v_4sJq7FtdI"
      }
    ],
    "midnight-heart-tune-season-2": [
      {
        label: { ko: "2기 제작 결정 특보", ja: "第2期制作決定特別映像", en: "Season 2 Announcement Video" },
        url: "https://www.youtube.com/watch?v=15e4EktHa9I"
      }
    ],
    "dark-gathering-season-2": [
      {
        label: { ko: "2기 PV", ja: "第2期PV", en: "Season 2 PV" },
        url: "https://www.youtube.com/watch?v=CmMCOThEhNk"
      }
    ],
    "haikyu-monsters-go-where": [
      {
        label: { ko: "액션 PV", ja: "アクションPV", en: "Action PV" },
        url: "https://www.youtube.com/watch?v=uEeZdVYu7AA"
      },
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=Aj9mjeLT5Js"
      }
    ],
    "kaiju-no-8-narumis-weekday": [
      {
        label: { ko: "PV", ja: "PV", en: "PV" },
        url: "https://www.youtube.com/watch?v=TMdcTkYVVVk"
      }
    ],
    "looking-for-zombies": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=KbXVkk7UH9Q"
      }
    ],
    "tetsuryo-meet-with-tetsudo-musume": [
      {
        label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" },
        url: "https://www.youtube.com/watch?v=GixEiC7k9_4"
      }
    ],
    "tanuki-and-kitsune": [
      {
        label: { ko: "애니메이션 PV", ja: "アニメPV", en: "Anime PV" },
        url: "https://www.youtube.com/watch?v=DO_UchIVN9Y"
      }
    ],
    "the-seven-knights-of-the-marronnier-kingdom": [
      {
        label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" },
        url: "https://www.youtube.com/watch?v=K6N27yNdNIg"
      }
    ],
    "the-timid-max-lady-took-her-shrewd-fiance-s-bet": [
      {
        label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" },
        url: "https://www.youtube.com/watch?v=e41RGxVwJRs"
      }
    ],
    "i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=6J7MHu2O7Vw"
      }
    ],
    "magical-sisters-lulutto-lilly-part-2": [
      {
        label: { ko: "메인 PV 2탄 (시리즈)", ja: "メインPV第2弾（シリーズ）", en: "Main PV #2 (Series)" },
        url: "https://www.youtube.com/watch?v=7oNuxIfJqiI"
      }
    ],
    "the-iceblade-sorcerer-shall-rule-the-world-ii": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=30rSarCHpmA"
      }
    ],
    "chitose-is-in-the-ramune-bottle-part-2": [
      {
        label: { ko: "제2쿨 PV 1탄", ja: "第2クールPV第1弾", en: "Part 2 PV #1" },
        url: "https://www.youtube.com/watch?v=G14qnuuJWtI"
      }
    ],
    "the-detective-is-already-dead-season-2": [
      {
        label: { ko: "Season 2 PV 1탄", ja: "Season 2 PV第1弾", en: "Season 2 PV #1" },
        url: "https://www.youtube.com/watch?v=nYYGphs8jvA"
      },
      {
        label: { ko: "Season 2 티저 PV", ja: "Season 2 ティザーPV", en: "Season 2 Teaser PV" },
        url: "https://www.youtube.com/watch?v=mHO3ZjEVNbU"
      }
    ],
    "matsurika-kanriden": [
      {
        label: { ko: "메인 PV 1탄", ja: "メインPV第1弾", en: "Main PV #1" },
        url: "https://www.youtube.com/watch?v=7ja8PqzctBg"
      },
      {
        label: { ko: "비주얼 공개 PV", ja: "ビジュアル解禁PV", en: "Visual Reveal PV" },
        url: "https://www.youtube.com/watch?v=UkiFIcxXTxk"
      }
    ],
    "the-principle-of-a-philosopher-by-eternal-fool-asley": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=nlTJz-N_LtI"
      }
    ],
    "giant-ojou-sama": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=CmMCOThEhNk"
      }
    ],
    "hirayasumi": [
      {
        label: { ko: "스페셜 PV", ja: "スペシャルPV", en: "Special PV" },
        url: "https://www.youtube.com/watch?v=Gg-r7oP2x7E"
      }
    ],
    "frieren-beyond-journeys-end-season-3-golden-land-arc": [
      {
        label: { ko: "3기 발표 숏 PV", ja: "第3期発表ショートPV", en: "Season 3 Announcement Short PV" },
        url: "https://www.youtube.com/watch?v=765qxY2Tbm4"
      }
    ],
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": [
      {
        label: { ko: "10주년 기념 PV (4기 발표 포함)", ja: "10周年記念PV（第4期発表含む）", en: "10th Anniversary PV (Season 4 Announcement)" },
        url: "https://www.youtube.com/watch?v=8XpGThBki3Y"
      }
    ],
    "ghost-of-tsushima-legends": [
      {
        label: { ko: "티저", ja: "ティザー", en: "Teaser" },
        url: "https://www.youtube.com/watch?v=uU8slMpqDXU"
      }
    ]
  };

  if (!Array.isArray(window.animeData)) return;

  window.animeData.forEach(anime => {
    const additions = pvUpdates[anime.id];
    if (!additions?.length) return;

    const existing = Array.isArray(anime.pvs) ? anime.pvs : [];
    const seen = new Set();
    anime.pvs = [...additions, ...existing].filter(entry => {
      if (!entry?.url || seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });

    anime.links = anime.links || {};
    anime.links.pv = anime.pvs[0]?.url || null;

    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = verifiedAt;
    if (!Array.isArray(anime.verification.sources)) anime.verification.sources = [];

    additions.forEach(entry => {
      if (anime.verification.sources.some(source => source.url === entry.url)) return;
      anime.verification.sources.push({
        type: "official-youtube",
        url: entry.url,
        label: `Official YouTube — ${entry.label?.en || "PV"}`,
        supports: ["pv"]
      });
    });

    anime.updatedAt = verifiedAt;
  });
})();

// Schedule correction: keep Golden Kamuy's Runaway Train Arc in January 2027.
// This runs after the official-site audit and restores the canonical January 2027 slot.
(() => {
  if (!Array.isArray(window.animeData)) return;
  const anime = window.animeData.find(item => item.id === "golden-kamuy-final-chapter-runaway-train-arc");
  if (!anime) return;

  anime.release = anime.release || {};
  anime.release.japan = {
    status: "month",
    year: 2027,
    month: 1,
    day: null
  };
  anime.season = "2027-winter";
  anime.updatedAt = "2026-09-05";
})();

// October 2026 schedule refresh verified on 2026-09-07.
// Exact countdowns are never inferred from a recurring weekday alone.
(() => {
  "use strict";

  if (!Array.isArray(window.animeData)) return;

  const verifiedAt = "2026-09-07";
  const byId = new Map(window.animeData.map(anime => [anime.id, anime]));

  function ensureVerification(anime, source) {
    if (!anime || !source?.url) return;
    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = verifiedAt;
    anime.verification.sources = Array.isArray(anime.verification.sources) ? anime.verification.sources : [];
    const existing = anime.verification.sources.find(item => item.url === source.url);
    if (existing) {
      existing.verifiedAt = verifiedAt;
      if (source.label) existing.label = source.label;
      if (source.supports) existing.supports = source.supports;
      if (source.type) existing.type = source.type;
      return;
    }
    anime.verification.sources.push({ ...source, verifiedAt });
  }

  function applyExactPremiere(id, { premiere, source, release }) {
    const anime = byId.get(id);
    if (!anime) return;

    if (release) {
      anime.release = anime.release || {};
      anime.release.japan = release;
    }

    anime.schedule = anime.schedule || {};
    anime.schedule.premiere = premiere;
    anime.schedule.source = source.url;
    anime.schedule.verifiedAt = verifiedAt;
    anime.updatedAt = verifiedAt;
    ensureVerification(anime, source);
  }

  // AT-X is the earliest explicitly confirmed first broadcast.
  applyExactPremiere("fx-fighter-kurumi-chan", {
    premiere: {
      type: "tv",
      date: "2026-10-01",
      time: "21:30",
      timezone: "Asia/Tokyo",
      displayTime: "21:30"
    },
    source: {
      type: "official-site",
      url: "https://fxkurumi-info.com/onair/",
      label: "Official ON AIR — October 1, 21:30 (AT-X)",
      supports: ["release"]
    }
  });

  // Frontier Works announced the exact first-air slot on September 4.
  applyExactPremiere("tanuki-and-kitsune", {
    release: {
      status: "date",
      year: 2026,
      month: 10,
      day: 4
    },
    premiere: {
      type: "tv",
      date: "2026-10-04",
      time: "07:00",
      timezone: "Asia/Tokyo",
      displayTime: "07:00"
    },
    source: {
      type: "official-site",
      url: "https://www.fwinc.co.jp/news/113937/",
      label: "Frontier Works official — October 4, 07:00",
      supports: ["release", "format", "pv"]
    }
  });

  // The official ON AIR table supplies the previously missing first-air time.
  applyExactPremiere("the-worlds-strongest-witch-has-begun", {
    premiere: {
      type: "tv",
      date: "2026-10-07",
      time: "22:00",
      timezone: "Asia/Tokyo",
      displayTime: "22:00"
    },
    source: {
      type: "official-site",
      url: "https://sekamajo-anime.com/",
      label: "Official ON AIR — October 7, 22:00 (TOKYO MX)",
      supports: ["release"]
    }
  });

  // Rechecked October titles whose official sources still do not state an
  // exact first broadcast date. Recurring slots are retained as evidence only.
  const rechecked = {
    "looking-for-zombies": ["https://www.tv-asahi.co.jp/imanimation/", "TV Asahi IMAnimation — October 2026 start"],
    "dark-machine-the-animation": ["https://www.fujitv.co.jp/darkmachine_anime/", "Fuji TV official — October 2026 · Tuesdays 25:45"],
    "psyren": ["https://psyren-anime.com/", "Official website — October 2026 start"],
    "the-seven-knights-of-the-marronnier-kingdom": ["https://www.nhk-character.com/chara/marronnier/", "NHK official — October 2026 start"],
    "the-salty-koharu-has-a-soft-spot-for-me": ["https://shioama-anime.com/newsList.html", "Official news — October 2026 start"],
    "the-vermilion-mask": ["https://the-vermilion-mask.com/", "Official website — October 2026 · Saturdays 17:30"],
    "i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary": ["https://saikyosoubi.com/", "Official website — October 2026 start"],
    "super-psychic-policeman-chojo": ["https://chojun-anime.com/", "Official website — October 2026 · Tuesdays 23:00"],
    "a-tale-of-the-secret-saint": ["https://daiseijo-anime.com/news/index00210000.html", "Official delay notice — moved to October 2026"],
    "im-a-reincarnated-goblin-any-questions": ["https://tengobu-anime.com/news/", "Official news — October 2026 start"],
    "a-returners-magic-should-be-special-season-2": ["https://returners-magic.com/", "Official website — October 2026 on Fuji TV +Ultra"],
    "tougen-anki-nikko-and-kegon-falls-arc": ["https://www.tougenanki-anime.com/", "Official website — October 2026 on FRIDAY ANIME NIGHT"],
    "black-clover-2nd-season": ["https://www.bclover.jp/", "Official website — October 2026 start"],
    "sasaki-and-peeps-season-2": ["https://sasapi-anime.com/news/article_045.html", "Official news — October 2026 · episode 1 one-hour special"],
    "chitose-is-in-the-ramune-bottle-part-2": ["https://chiramune.com/news/", "Official news — Part 2 starts October 2026"],
    "suikoden": ["https://suikoden-anime.com/", "Official website — October 2026 · episode 1 one-hour special"],
    "keroro-gunso-star": ["https://www.bn-pictures.co.jp/keroro-anime/tv/", "Official website — Fall 2026; exact date/time not announced"]
  };

  Object.entries(rechecked).forEach(([id, [url, label]]) => {
    const anime = byId.get(id);
    if (!anime) return;
    ensureVerification(anime, {
      type: "official-site",
      url,
      label,
      supports: ["release"]
    });
  });
})();

// Full remaining 2026 audit verified on 2026-09-07.
// Candidate lists were used only for discovery; every entry below is backed by a first-party release source.
(() => {
  "use strict";
  if (!Array.isArray(window.animeData)) return;

  const V = "2026-09-07";
  const date = (month, day) => ({ status: "date", year: 2026, month, day });
  const month = month => ({ status: "month", year: 2026, month, day: null });
  const year = () => ({ status: "year", year: 2026, month: null, day: null });
  const src = (url, label, type = "official-site", supports = ["announcement", "release", "format"]) => ({
    type, url, label, supports, verifiedAt: V
  });
  const event = (type, date, time = null) => ({
    type, date, time, timezone: "Asia/Tokyo", displayTime: type === "theatrical" ? null : time
  });
  const schedule = (premiere, source, broadcast = null) => ({
    premiere,
    ...(broadcast ? { broadcast } : {}),
    source,
    verifiedAt: V
  });

  const additions = [];
  const add = ({ id, ko, ja, en, aliases = [], release, season = "2026-fall", format, origin, tags, poster = null, official, pv = null, sources, schedule: timing }) => {
    additions.push({
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
      pvs: pv ? [{ label: { ko: "PV", ja: "PV", en: "PV" }, url: pv }] : [],
      streaming: {},
      ...(timing ? { schedule: timing } : {}),
      verification: { verifiedAt: V, sources },
      createdAt: V,
      updatedAt: V
    });
  };

  add({
    id: "kaiju-no-8-narumis-weekday",
    ko: "괴수 8호 오리지널 쇼트 애니메이션 「나루미의 평일」",
    ja: "怪獣8号 オリジナルショートアニメ「鳴海の平日」",
    en: "Kaiju No. 8 Original Short Anime: Narumi's Weekday",
    aliases: ["鳴海の平日", "Narumi's Weekday"],
    release: date(9, 5), format: "special", origin: "manga", tags: ["series", "comic"],
    poster: { src: "assets/posters/kaiju-no-8-narumis-weekday-user-20260908.webp", position: null },
    official: "https://www.kaiju-no8.net/",
    pv: "https://www.youtube.com/watch?v=TMdcTkYVVVk",
    sources: [
      src("https://kaiju-no8.net/news/detail_260805_02.html", "Official news — September 5, 20:00 streaming start"),
      src("https://www.youtube.com/watch?v=TMdcTkYVVVk", "TOHO animation — Narumi's Weekday PV", "official-youtube", ["pv"])
    ],
    schedule: schedule(event("streaming", "2026-09-05", "20:00"), "https://kaiju-no8.net/news/detail_260805_02.html")
  });

  add({
    id: "ghost-meets-gal",
    ko: "고스트 미츠 갸루!", ja: "ごーすと・みーつ・ぎゃる！", en: "Ghost Meets Gal!",
    release: date(9, 5), format: "tv", origin: "manga", tags: ["series", "comic"],
    poster: { src: "assets/posters/ghost-meets-gal-user-20260908.webp", position: null },
    official: "https://cf-vanguard.com/anime-ghost_meets_gal/",
    sources: [src("https://cf-vanguard.com/anime-ghost_meets_gal/", "Official website — September 5, 08:00 TV premiere")],
    schedule: schedule(event("tv", "2026-09-05", "08:00"), "https://cf-vanguard.com/anime-ghost_meets_gal/")
  });



  add({
    id: "we-are-aliens",
    ko: "우리는 외계인", ja: "我々は宇宙人", en: "We Are Aliens",
    release: date(9, 25), format: "movie", origin: "original", tags: ["new", "original", "movie"],
    poster: { src: "assets/posters/we-are-aliens.webp", position: "center" },
    official: "https://nothingnew.ltd/ja/films/wearealiens",
    sources: [src("https://nothingnew.ltd/ja/news", "NOTHING NEW official news — nationwide release September 25")],
    schedule: schedule(event("theatrical", "2026-09-25", "00:00"), "https://nothingnew.ltd/ja/news")
  });

  add({
    id: "battle-spirits-re-zekkai-no-ku",
    ko: "Battle Spirits [Re] 절계의 하늘", ja: "Battle Spirits [Re] 絶界の空", en: "Battle Spirits [Re]: Zekkai no Ku",
    release: date(10, 6), format: "tv", origin: "game", tags: ["new", "game"],
    poster: { src: "assets/posters/battle-spirits-re-zekkai-no-ku-user-20260908.webp", position: null },
    official: "https://www.bn-pictures.co.jp/battlespirits/", pv: "https://youtu.be/cXd4pKTx2pI",
    sources: [src("https://www.bn-pictures.co.jp/battlespirits/news/detail/?id=24181", "BN Pictures official — October 6, 23:00 TV premiere", "official-site", ["announcement", "release", "format", "pv"])],
    schedule: schedule(event("tv", "2026-10-06", "23:00"), "https://www.bn-pictures.co.jp/battlespirits/news/detail/?id=24181")
  });

  add({
    id: "girls-und-panzer-motto-love-love-operation",
    ko: "걸즈 앤 판처 좀 더 러브러브 작전입니다!", ja: "ガールズ＆パンツァー もっとらぶらぶ作戦です！", en: "Girls und Panzer: Motto Love Love Sakusen desu!",
    release: date(10, 8), format: "tv", origin: "manga", tags: ["series", "comic"],
    poster: { src: "assets/posters/girls-und-panzer-motto-love-love-operation-user-20260908.webp", position: null },
    official: "https://gup-mottolovelove.jp/", pv: "https://youtu.be/AVIDW2dT2AM",
    sources: [src("https://gup-mottolovelove.jp/article-tv/", "Official TV announcement — October 8, 23:30", "official-site", ["announcement", "release", "format", "pv"])],
    schedule: schedule(event("tv", "2026-10-08", "23:30"), "https://gup-mottolovelove.jp/article-tv/")
  });

  add({
    id: "duel-masters-lost-condemned-boy",
    ko: "Duel Masters LOST ~단죄의 소년~", ja: "Duel Masters LOST ～断罪の少年～", en: "Duel Masters LOST: The Condemned Boy",
    release: date(10, 9), format: "special", origin: "manga", tags: ["series", "comic"],
    poster: { src: "assets/posters/duel-masters-lost-condemned-boy-user-20260908.webp", position: null },
    official: "https://www.shopro.co.jp/anime/duelmasters_lost/index.html",
    sources: [src("https://www.shopro.co.jp/anime/duelmasters_lost/index.html", "ShoPro official — October 9, 21:00 streaming start")],
    schedule: schedule(event("streaming", "2026-10-09", "21:00"), "https://www.shopro.co.jp/anime/duelmasters_lost/index.html")
  });

  add({
    id: "pop-pap-polters",
    ko: "팝 팝 폴터즈", ja: "ポップパップポルターズ", en: "Pop Pap Polters",
    release: date(10, 4), format: "tv", origin: "original", tags: ["new", "original"],
    poster: { src: "assets/posters/pop-pap-polters-user-20260908.webp", position: null },
    official: "https://ppp-anime.jp/",
    sources: [src("https://ppp-anime.jp/", "Official website — October 4, 10:00 TV premiere")],
    schedule: schedule(event("tv", "2026-10-04", "10:00"), "https://ppp-anime.jp/")
  });

  add({
    id: "cardfight-vanguard-divinez-fate-star-war-arc",
    ko: "카드파이트!! 뱅가드 Divinez 운명성전편", ja: "カードファイト!! ヴァンガード Divinez 運命星戦編", en: "Cardfight!! Vanguard Divinez: Parallactic Fate",
    release: date(10, 2), format: "tv", origin: "game", tags: ["series", "game"],
    poster: { src: "assets/posters/cardfight-vanguard-divinez-fate-star-war-arc-user-20260908.webp", position: null },
    official: "https://anime.cf-vanguard.com/vgd/",
    sources: [src("https://anime.cf-vanguard.com/vgd/", "Official website — theatrical advance October 2; TV November 7 at 08:00")],
    schedule: schedule(event("theatrical", "2026-10-02", "00:00"), "https://anime.cf-vanguard.com/vgd/", event("tv", "2026-11-07", "08:00"))
  });

  add({
    id: "maebashi-witches-emoemories",
    ko: "극장판 마에바시 위치스 ~마녀 견습생의 에모에모리즈~", ja: "劇場版 前橋ウィッチーズ ～魔女見習いのエモエモリーズ～", en: "Maebashi Witches: Witch Apprentice Emoemories",
    release: date(10, 23), format: "movie", origin: "original", tags: ["series", "original", "movie"],
    poster: { src: "assets/posters/maebashi-witches-emoemories-user-20260908.webp", position: null },
    official: "https://www.maebashi-witches.com/",
    sources: [src("https://www.maebashi-witches.com/", "Official website — October 23 theatrical release")],
    schedule: schedule(event("theatrical", "2026-10-23", "00:00"), "https://www.maebashi-witches.com/")
  });

  add({
    id: "my-happy-marriage-special-2026",
    ko: "나의 행복한 결혼 특별편", ja: "わたしの幸せな結婚 特別篇", en: "My Happy Marriage Special",
    release: date(10, 25), format: "special", origin: "light-novel", tags: ["series", "ln"],
    poster: { src: "assets/posters/my-happy-marriage-special-2026-user-20260908.webp", position: null },
    official: "https://watakon-anime.com/",
    sources: [src("https://watakon-anime.com/onair/", "Official ON AIR — October 25, 19:00 TV premiere")],
    schedule: schedule(event("tv", "2026-10-25", "19:00"), "https://watakon-anime.com/onair/")
  });

  add({
    id: "inherit-the-winds-the-beginning",
    ko: "극장 선행판 바람을 잇는 이들 -시작-", ja: "劇場先行版 風を継ぐもの -はじまり-", en: "Inherit the Winds: The Beginning — Theatrical Advance Edition",
    release: date(11, 13), format: "movie", origin: "original", tags: ["series", "original", "movie"],
    poster: { src: "assets/posters/inherit-the-winds-the-beginning-user-20260908.webp", position: null },
    official: "https://kaze-tsugu.com/",
    sources: [src("https://news.aniplex.co.jp/detail.html?id=71138", "Aniplex official — November 13 two-week theatrical advance run")],
    schedule: schedule(event("theatrical", "2026-11-13", "00:00"), "https://news.aniplex.co.jp/detail.html?id=71138")
  });

  add({
    id: "takopis-original-sin-thank-you-see-you-tomorrow",
    ko: "타코피의 원죄 -고마워, 또 만나-", ja: "映画『タコピーの原罪 -ありがとう、また明日-』", en: "Takopi's Original Sin: Thank You, See You Tomorrow",
    release: date(11, 27), format: "movie", origin: "manga", tags: ["series", "comic", "movie"],
    official: "https://www.tbs.co.jp/anime/takopi_project/",
    sources: [src("https://www.tbs.co.jp/anime/takopi_project/news/news20260817.html", "TBS official — November 27 theatrical release")],
    schedule: schedule(event("theatrical", "2026-11-27", "00:00"), "https://www.tbs.co.jp/anime/takopi_project/news/news20260817.html")
  });

  const existingIds = new Set(window.animeData.map(anime => anime.id));
  additions.forEach(anime => {
    if (!existingIds.has(anime.id)) window.animeData.push(anime);
  });
})();
