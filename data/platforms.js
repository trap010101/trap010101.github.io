// Streaming platform presentation metadata and runtime data policy.
// Keep only direct streaming-service destinations that are confirmed for the scheduled installment.
(() => {
  const directServiceMatchers = {
    netflix: url => url.hostname.endsWith("netflix.com") && url.pathname.includes("/title/"),
    laftel: url => url.hostname.endsWith("laftel.net") && url.pathname.includes("/item/"),
    disney: url => url.hostname.endsWith("disneyplus.com") && url.pathname.includes("/browse/entity-"),
    prime: url => url.hostname.endsWith("primevideo.com") && url.pathname.includes("/detail/"),
    crunchyroll: url => url.hostname.endsWith("crunchyroll.com") && url.pathname.includes("/series/"),
    tving: url => url.hostname.endsWith("tving.com") && url.pathname.includes("/contents/"),
    watcha: url => url.hostname.endsWith("watcha.com") && url.pathname.includes("/contents/")
  };

  const isDirectServiceUrl = (platformId, value) => {
    const matcher = directServiceMatchers[platformId];
    if (!matcher || !value) return false;
    try {
      return matcher(new URL(value));
    } catch (_) {
      return false;
    }
  };

  // These titles have current-installment platform confirmation outside the older verification payload.
  // Keep only the direct service page that is already used by the site.
  const confirmedDirectOverrides = {
    "ranma-1-2-season-3": {
      netflix: "https://www.netflix.com/kr/title/81171925"
    },
    "blue-box-season-2": {
      netflix: "https://www.netflix.com/kr/title/81663323"
    },
    "tiger-coming-in-2": {
      laftel: "https://laftel.net/item/42320"
    },
    "sakamoto-days-season-2": {
      netflix: "https://www.netflix.com/kr-en/title/81663325"
    }
  };

  const hasStreamingVerification = anime =>
    (anime?.verification?.sources || []).some(source =>
      Array.isArray(source?.supports) && source.supports.includes("streaming")
    );

  if (Array.isArray(window.animeData)) {
    window.animeData.forEach(anime => {
      const current = anime?.streaming && typeof anime.streaming === "object"
        ? anime.streaming
        : {};
      const filtered = Object.fromEntries(
        Object.entries(current).filter(([platformId, url]) => isDirectServiceUrl(platformId, url))
      );
      const override = confirmedDirectOverrides[anime.id];

      if (override) {
        anime.streaming = { ...override };
      } else if (hasStreamingVerification(anime)) {
        anime.streaming = filtered;
      } else {
        // Do not inherit a previous season/series platform without confirmation for this installment.
        anime.streaming = {};
      }

      // `links.streaming` must follow the same direct-destination rule.
      if (anime.links) {
        anime.links.streaming = Object.values(anime.streaming)[0] || null;
      }
    });
  }
})();

window.ottPlatforms = [
  {
    "id": "netflix",
    "name": "Netflix"
  },
  {
    "id": "laftel",
    "name": "Laftel"
  },
  {
    "id": "disney",
    "name": "Disney+"
  },
  {
    "id": "prime",
    "name": "Prime Video"
  },
  {
    "id": "crunchyroll",
    "name": "Crunchyroll"
  },
  {
    "id": "tving",
    "name": "TVING"
  },
  {
    "id": "watcha",
    "name": "WATCHA"
  }
];
