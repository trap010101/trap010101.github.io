// Region-aware streaming data foundation.
// UI language and streaming availability are intentionally independent.
(() => {
  const regionOrder = ["kr", "jp", "us"];

  const streamingRegions = {
    kr: {
      id: "kr",
      countryCode: "KR",
      locale: "ko-KR",
      label: { ko: "대한민국", ja: "韓国", en: "South Korea" }
    },
    jp: {
      id: "jp",
      countryCode: "JP",
      locale: "ja-JP",
      label: { ko: "일본", ja: "日本", en: "Japan" }
    },
    us: {
      id: "us",
      countryCode: "US",
      locale: "en-US",
      label: { ko: "미국", ja: "アメリカ", en: "United States" }
    }
  };

  const platformDefinitions = [
    { id: "netflix", name: "Netflix", regions: ["kr", "jp", "us"], directUrlPolicy: "verified" },
    { id: "laftel", name: "Laftel", regions: ["kr"], directUrlPolicy: "verified" },
    { id: "disney", name: "Disney+", regions: ["kr", "jp", "us"], directUrlPolicy: "verified" },
    { id: "prime", name: "Prime Video", regions: ["kr", "jp", "us"], directUrlPolicy: "verified" },
    { id: "crunchyroll", name: "Crunchyroll", regions: ["us"], directUrlPolicy: "verified" },
    { id: "tving", name: "TVING", regions: ["kr"], directUrlPolicy: "verified" },
    { id: "watcha", name: "WATCHA", regions: ["kr"], directUrlPolicy: "verified" },
    { id: "youtube", name: "YouTube", regions: ["kr", "jp", "us"], directUrlPolicy: "verified" },
    { id: "danime", name: "dアニメストア", regions: ["jp"], directUrlPolicy: "verified" },
    { id: "unext", name: "U-NEXT", regions: ["jp"], directUrlPolicy: "verified" },
    { id: "abema", name: "ABEMA", regions: ["jp"], directUrlPolicy: "verified" },
    { id: "hulu_jp", name: "Hulu Japan", regions: ["jp"], directUrlPolicy: "verified" },
    { id: "hidive", name: "HIDIVE", regions: ["us"], directUrlPolicy: "verified" },
    { id: "hulu_us", name: "Hulu", regions: ["us"], directUrlPolicy: "verified" }
  ];

  const directServiceMatchers = {
    netflix: url => url.hostname.endsWith("netflix.com") && url.pathname.includes("/title/"),
    laftel: url => url.hostname.endsWith("laftel.net") && url.pathname.includes("/item/"),
    disney: url => url.hostname.endsWith("disneyplus.com") && url.pathname.includes("/browse/entity-"),
    prime: url => url.hostname.endsWith("primevideo.com") && url.pathname.includes("/detail/"),
    crunchyroll: url =>
      url.hostname.endsWith("crunchyroll.com") &&
      (url.pathname.includes("/series/") || url.pathname.includes("/watch/")),
    tving: url => url.hostname.endsWith("tving.com") && url.pathname.includes("/contents/"),
    watcha: url => url.hostname.endsWith("watcha.com") && url.pathname.includes("/contents/"),
    youtube: url =>
      (url.hostname === "youtube.com" || url.hostname.endsWith(".youtube.com")) &&
      url.pathname === "/playlist" &&
      url.searchParams.has("list"),
    danime: url =>
      url.hostname === "animestore.docomo.ne.jp" &&
      url.pathname.startsWith("/animestore/ci") &&
      url.searchParams.has("workId"),
    unext: url =>
      url.hostname === "video.unext.jp" &&
      /^\/title\/SID[0-9A-Z]+\/?$/i.test(url.pathname),
    abema: url =>
      url.hostname === "abema.tv" &&
      url.pathname.startsWith("/video/title/"),
    hulu_jp: url => {
      const hostname = url.hostname.toLowerCase();
      if (hostname !== "hulu.jp" && hostname !== "www.hulu.jp") return false;
      const path = url.pathname.replace(/\/+$/, "");
      if (!path || path === "/") return false;
      return !["/display/", "/comic/", "/features/", "/search", "/categories/"].some(prefix =>
        path === prefix.replace(/\/$/, "") || path.startsWith(prefix)
      );
    },
    hidive: url =>
      (url.hostname === "hidive.com" || url.hostname === "www.hidive.com") &&
      (/^\/tv\/[^/]+\/?$/i.test(url.pathname) ||
       /^\/season\/\d+\/?$/i.test(url.pathname) ||
       /^\/movies?\/[^/]+\/?$/i.test(url.pathname)),
    hulu_us: url =>
      (url.hostname === "hulu.com" || url.hostname === "www.hulu.com") &&
      /^\/series\/.+-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/i.test(url.pathname)
  };

  const platformById = new Map((window.ottPlatforms || []).map(platform => [platform.id, platform]));
  for (const definition of platformDefinitions) {
    const existing = platformById.get(definition.id);
    if (existing) {
      Object.assign(existing, definition);
    } else {
      const platform = { ...definition };
      (window.ottPlatforms ||= []).push(platform);
      platformById.set(platform.id, platform);
    }
  }

  const isKnownRegion = regionId => regionOrder.includes(regionId);

  const parseUrl = value => {
    if (!value) return null;
    try {
      return new URL(value);
    } catch (_) {
      return null;
    }
  };

  const isDirectRegionalStreamingUrl = (regionId, platformId, value) => {
    if (!isKnownRegion(regionId)) return false;
    const platform = platformById.get(platformId);
    if (!platform || !platform.regions?.includes(regionId)) return false;
    const matcher = directServiceMatchers[platformId];
    if (!matcher) return false;
    const url = parseUrl(value);
    return Boolean(url && url.protocol === "https:" && matcher(url));
  };

  const validateLinkMap = (regionId, links) => {
    const safe = {};
    for (const [platformId, value] of Object.entries(links || {})) {
      if (!isDirectRegionalStreamingUrl(regionId, platformId, value)) {
        throw new Error(`Invalid direct streaming URL for ${regionId}/${platformId}: ${value}`);
      }
      safe[platformId] = value;
    }
    return safe;
  };

  const emptyRegionData = () => ({ current: {}, previous: {} });

  if (Array.isArray(window.animeData)) {
    for (const anime of window.animeData) {
      // Upcoming installments are intentionally not treated as currently streamable.
      const krCurrent = {};
      const krPrevious = { ...(anime.previousStreaming || {}) };

      anime.streamingByRegion = {
        kr: { current: krCurrent, previous: krPrevious },
        jp: emptyRegionData(),
        us: emptyRegionData()
      };

      anime.currentStreamingByRegion = {
        kr: anime.streamingByRegion.kr.current,
        jp: anime.streamingByRegion.jp.current,
        us: anime.streamingByRegion.us.current
      };
      anime.previousStreamingByRegion = {
        kr: anime.streamingByRegion.kr.previous,
        jp: anime.streamingByRegion.jp.previous,
        us: anime.streamingByRegion.us.previous
      };
    }
  }

  const getAnimeStreamingForRegion = (anime, regionId = "kr") => {
    const resolvedRegion = isKnownRegion(regionId) ? regionId : "kr";
    const regionData = anime?.streamingByRegion?.[resolvedRegion] || emptyRegionData();
    const current = { ...(regionData.current || {}) };
    const previous = { ...(regionData.previous || {}) };
    return {
      region: resolvedRegion,
      current,
      previous,
      all: { ...previous, ...current }
    };
  };

  const setAnimeStreamingForRegion = (animeId, regionId, payload = {}) => {
    if (!isKnownRegion(regionId)) throw new Error(`Unsupported streaming region: ${regionId}`);
    // The homepage lifecycle removes already-premiered titles from animeData.
    // Keep streaming audits attached to the preserved source list as well, so a
    // past title cannot abort every later audit entry during page startup.
    const activeAnime = Array.isArray(window.animeData) ? window.animeData : [];
    const completeAnime = Array.isArray(window.allAnimeData) ? window.allAnimeData : [];
    const anime = activeAnime.find(item => item.id === animeId) ||
      completeAnime.find(item => item.id === animeId);
    if (!anime) return null;

    if (Object.keys(payload.current || {}).length) {
      throw new Error("Current-installment streaming is disabled by NewAnime policy.");
    }

    const current = {};
    const previous = validateLinkMap(regionId, payload.previous || {});

    anime.streamingByRegion ||= {};
    anime.streamingByRegion[regionId] = { current, previous };
    anime.currentStreamingByRegion ||= {};
    anime.previousStreamingByRegion ||= {};
    anime.currentStreamingByRegion[regionId] = current;
    anime.previousStreamingByRegion[regionId] = previous;

    // Keep the existing homepage/runtime contract Korean-first until the region selector ships.
    if (regionId === "kr") {
      anime.currentStreaming = {};
      anime.previousStreaming = previous;
      anime.streaming = { ...previous };
      if (anime.links) anime.links.streaming = null;
    }

    return getAnimeStreamingForRegion(anime, regionId);
  };

  window.streamingRegionOrder = regionOrder;
  window.streamingRegions = streamingRegions;
  window.streamingPlatformDefinitions = platformDefinitions;
  window.isDirectRegionalStreamingUrl = isDirectRegionalStreamingUrl;
  window.getAnimeStreamingForRegion = getAnimeStreamingForRegion;
  window.setAnimeStreamingForRegion = setAnimeStreamingForRegion;
})();
