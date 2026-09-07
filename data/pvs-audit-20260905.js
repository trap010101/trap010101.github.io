// Official PV audit verified on 2026-09-05.
// Loaded after data/pvs.js so newly confirmed direct videos can restore otherwise-empty PV buttons.
(() => {
  const verifiedAt = "2026-09-05";
  const pvUpdates = {
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
