// October 2026 schedule refresh verified on 2026-09-07.
// Keep exact premiere countdowns source-backed: never infer a first air date from a recurring weekday alone.
(() => {
  "use strict";

  if (!Array.isArray(window.animeData)) return;

  const VERIFIED_AT = "2026-09-07";
  const byId = new Map(window.animeData.map(anime => [anime.id, anime]));

  function ensureVerification(anime, source) {
    if (!anime || !source?.url) return;
    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = VERIFIED_AT;
    anime.verification.sources = Array.isArray(anime.verification.sources) ? anime.verification.sources : [];
    const existing = anime.verification.sources.find(item => item.url === source.url);
    if (existing) {
      existing.verifiedAt = VERIFIED_AT;
      if (source.label) existing.label = source.label;
      if (source.supports) existing.supports = source.supports;
      if (source.type) existing.type = source.type;
      return;
    }
    anime.verification.sources.push({ ...source, verifiedAt: VERIFIED_AT });
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
    anime.schedule.verifiedAt = VERIFIED_AT;
    anime.updatedAt = VERIFIED_AT;
    ensureVerification(anime, source);
  }

  // FX Fighter Kurumi-chan was broadcast-only in the first migration, so the
  // carousel could not see it. AT-X is the earliest verified premiere airing.
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

  // Frontier Works published the first-air date/time on September 4.
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

  // The official ON AIR table now supplies the previously missing first-air time.
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

  // Rechecked October titles whose official sources still do not identify an
  // exact first broadcast date. Record the fresh verification without inventing
  // a countdown date. Where broadcasters publish a recurring slot, keep that
  // detail in the source label only until the first-air date is explicitly stated.
  const rechecked = {
    "looking-for-zombies": {
      url: "https://www.tv-asahi.co.jp/imanimation/",
      label: "TV Asahi IMAnimation — October 2026 start"
    },
    "dark-machine-the-animation": {
      url: "https://www.fujitv.co.jp/darkmachine_anime/",
      label: "Fuji TV official — October 2026 · Tuesdays 25:45"
    },
    "psyren": {
      url: "https://psyren-anime.com/",
      label: "Official website — October 2026 start"
    },
    "the-seven-knights-of-the-marronnier-kingdom": {
      url: "https://www.nhk-character.com/chara/marronnier/",
      label: "NHK official — October 2026 start"
    },
    "the-salty-koharu-has-a-soft-spot-for-me": {
      url: "https://shioama-anime.com/newsList.html",
      label: "Official news — October 2026 start"
    },
    "the-vermilion-mask": {
      url: "https://the-vermilion-mask.com/",
      label: "Official website — October 2026 · Saturdays 17:30"
    },
    "i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary": {
      url: "https://saikyosoubi.com/",
      label: "Official website — October 2026 start"
    },
    "super-psychic-policeman-chojo": {
      url: "https://chojun-anime.com/",
      label: "Official website — October 2026 · Tuesdays 23:00"
    },
    "a-tale-of-the-secret-saint": {
      url: "https://daiseijo-anime.com/news/index00210000.html",
      label: "Official delay notice — moved to October 2026"
    },
    "im-a-reincarnated-goblin-any-questions": {
      url: "https://tengobu-anime.com/news/",
      label: "Official news — October 2026 start"
    },
    "a-returners-magic-should-be-special-season-2": {
      url: "https://returners-magic.com/",
      label: "Official website — October 2026 on Fuji TV +Ultra"
    },
    "tougen-anki-nikko-and-kegon-falls-arc": {
      url: "https://www.tougenanki-anime.com/",
      label: "Official website — October 2026 on FRIDAY ANIME NIGHT"
    },
    "black-clover-2nd-season": {
      url: "https://www.bclover.jp/",
      label: "Official website — October 2026 start"
    },
    "sasaki-and-peeps-season-2": {
      url: "https://sasapi-anime.com/news/article_045.html",
      label: "Official news — October 2026 · episode 1 one-hour special"
    },
    "chitose-is-in-the-ramune-bottle-part-2": {
      url: "https://chiramune.com/news/",
      label: "Official news — Part 2 starts October 2026"
    },
    "suikoden": {
      url: "https://suikoden-anime.com/",
      label: "Official website — October 2026 · episode 1 one-hour special"
    },
    "keroro-gunso-star": {
      url: "https://www.bn-pictures.co.jp/keroro-anime/tv/",
      label: "Official website — Fall 2026 start; exact date/time not announced"
    }
  };

  Object.entries(rechecked).forEach(([id, source]) => {
    const anime = byId.get(id);
    if (!anime) return;
    ensureVerification(anime, {
      type: "official-site",
      url: source.url,
      label: source.label,
      supports: ["release"]
    });
  });

  // Fill official-site gaps discovered during the October recheck.
  const officialLinks = {
    "looking-for-zombies": "https://www.tv-asahi.co.jp/imanimation/",
    "i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary": "https://saikyosoubi.com/",
    "a-returners-magic-should-be-special-season-2": "https://returners-magic.com/",
    "chitose-is-in-the-ramune-bottle-part-2": "https://chiramune.com/"
  };

  Object.entries(officialLinks).forEach(([id, url]) => {
    const anime = byId.get(id);
    if (!anime) return;
    anime.links = anime.links || {};
    anime.links.official = url;
  });
})();
