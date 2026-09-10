// Newly announced October 2026 broadcast dates/times verified on 2026-09-10.
// Loaded after schedule-updates-20260907.js so newer official announcements win.
(() => {
  "use strict";

  if (!Array.isArray(window.animeData)) return;

  const VERIFIED_AT = "2026-09-10";
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

  function applyExactPremiere(id, { date, time, source, type = "tv" }) {
    const anime = byId.get(id);
    if (!anime) return;

    anime.release = anime.release || {};
    anime.release.japan = {
      status: "date",
      year: Number(date.slice(0, 4)),
      month: Number(date.slice(5, 7)),
      day: Number(date.slice(8, 10))
    };

    anime.schedule = anime.schedule || {};
    anime.schedule.premiere = {
      type,
      date,
      time,
      timezone: "Asia/Tokyo",
      displayTime: time
    };
    anime.schedule.source = source.url;
    anime.schedule.verifiedAt = VERIFIED_AT;
    anime.updatedAt = VERIFIED_AT;

    ensureVerification(anime, {
      type: source.type || "official-site",
      url: source.url,
      label: source.label,
      supports: ["release"]
    });
  }

  const updates = {
    "keroro-gunso-star": {
      date: "2026-10-03",
      time: "09:30",
      source: {
        url: "https://www.tv-tokyo.co.jp/anime/animetable/new_anime_list.html",
        label: "TV Tokyo official — October 3, 09:30"
      }
    },
    "black-clover-2nd-season": {
      date: "2026-10-03",
      time: "23:00",
      source: {
        url: "https://www.tv-tokyo.co.jp/anime/bclover/",
        label: "TV Tokyo official — October 3, 23:00"
      }
    },
    "a-tale-of-the-secret-saint": {
      date: "2026-10-03",
      time: "22:00",
      source: {
        url: "https://daiseijo-anime.com/",
        label: "Official website — October 3, 22:00"
      }
    },
    "hotel-inhumans-season-2": {
      date: "2026-10-04",
      time: "23:45",
      source: {
        url: "https://www.tv-tokyo.co.jp/anime/hotel-inhumans/",
        label: "TV Tokyo official — Season 2 starts October 4, 23:45"
      }
    },
    "banished-cheat-granting-mage-second-life": {
      date: "2026-10-06",
      time: "24:00",
      source: {
        url: "https://www.tv-tokyo.co.jp/anime/",
        label: "TV Tokyo official — October 6, 24:00"
      }
    },
    "ace-of-diamond-act-ii-second-season-part-2": {
      date: "2026-10-11",
      time: "17:30",
      source: {
        url: "https://www.tv-tokyo.co.jp/anime/diaace2_2nd/",
        label: "TV Tokyo official — October 11, 17:30"
      }
    },
    "dark-machine-the-animation": {
      date: "2026-10-13",
      time: "25:45",
      source: {
        url: "https://www.fujitv.co.jp/fujitv/news/20260949.html",
        label: "Fuji TV official — October 13, 25:45"
      }
    }
  };

  Object.entries(updates).forEach(([id, update]) => applyExactPremiere(id, update));
})();
