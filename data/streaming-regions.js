(() => {
  const regionOrder = ["kr", "jp", "us"];
  const regionLabels = {
    kr: { ko: "대한민국", ja: "韓国", en: "South Korea" },
    jp: { ko: "일본", ja: "日本", en: "Japan" },
    us: { ko: "미국", ja: "アメリカ", en: "United States" }
  };

  const platformDefinitions = [
    { id: "netflix", name: "Netflix", regions: ["kr", "jp", "us"] },
    { id: "laftel", name: "Laftel", regions: ["kr"] },
    { id: "disney", name: "Disney+", regions: ["kr", "jp", "us"] },
    { id: "prime", name: "Prime Video", regions: ["kr", "jp", "us"] },
    { id: "crunchyroll", name: "Crunchyroll", regions: ["kr", "us"] },
    { id: "tving", name: "TVING", regions: ["kr"] },
    { id: "watcha", name: "WATCHA", regions: ["kr"] },
    { id: "youtube", name: "YouTube", regions: ["kr", "jp", "us"] },
    { id: "danime", name: "dアニメストア", regions: ["jp"] },
    { id: "unext", name: "U-NEXT", regions: ["jp"] },
    { id: "abema", name: "ABEMA", regions: ["jp"] },
    { id: "hulu_jp", name: "Hulu", regions: ["jp"] },
    { id: "hidive", name: "HIDIVE", regions: ["us"] },
    { id: "hulu_us", name: "Hulu", regions: ["us"] }
  ];

  const directServiceMatchers = {
    netflix: url =>
      (url.hostname === "netflix.com" || url.hostname === "www.netflix.com") &&
      /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?title\/\d+\/?$/i.test(url.pathname),
    laftel: url =>
      (url.hostname === "laftel.net" || url.hostname === "www.laftel.net") &&
      /^\/item\/\d+\/?$/i.test(url.pathname),
    disney: url =>
      (url.hostname === "disneyplus.com" || url.hostname === "www.disneyplus.com") &&
      /^\/(?:[a-z]{2}-[a-z]{2}\/)?browse\/entity-[0-9a-f-]+\/?$/i.test(url.pathname),
    prime: url =>
      (url.hostname === "primevideo.com" || url.hostname === "www.primevideo.com") &&
      /^\/(?:-\/[a-z]{2}\/)?detail\/[^/]+\/?$/i.test(url.pathname),
    crunchyroll: url =>
      (url.hostname === "crunchyroll.com" || url.hostname === "www.crunchyroll.com") &&
      (/^\/series\/[^/]+(?:\/[^/]+)?\/?$/i.test(url.pathname) ||
       /^\/watch\/[^/]+(?:\/[^/]+)?\/?$/i.test(url.pathname)),
    tving: url =>
      (url.hostname === "tving.com" || url.hostname === "www.tving.com") &&
      /^\/contents\/[^/]+\/?$/i.test(url.pathname),
    watcha: url =>
      (url.hostname === "watcha.com" || url.hostname === "www.watcha.com") &&
      /^\/(?:ko(?:-KR)?\/)?contents\/[^/]+\/?$/i.test(url.pathname),
    youtube: url => {
      const host = url.hostname.toLowerCase();
      return (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") &&
        url.pathname === "/playlist" && url.searchParams.has("list");
    },
    danime: url =>
      (url.hostname === "animestore.docomo.ne.jp" || url.hostname === "www.animestore.docomo.ne.jp") &&
      url.pathname === "/animestore/ci_pc" && /^\d+$/.test(url.searchParams.get("workId") || ""),
    unext: url =>
      (url.hostname === "video.unext.jp" || url.hostname === "www.video.unext.jp") &&
      /^\/title\/SID\d+\/?$/i.test(url.pathname),
    abema: url =>
      (url.hostname === "abema.tv" || url.hostname === "www.abema.tv") &&
      /^\/video\/title\/[^/]+\/?$/i.test(url.pathname),
    hulu_jp: url => {
      if (url.hostname !== "hulu.jp" && url.hostname !== "www.hulu.jp") return false;
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
      /^\/series\/(?:.+-)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/i.test(url.pathname)
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
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);

  if (Array.isArray(window.animeData)) {
    for (const anime of window.animeData) {
      anime.streamingByRegion = Object.fromEntries(regionOrder.map(regionId => [regionId, emptyRegionData()]));

      const legacyCurrent = anime.currentStreaming && typeof anime.currentStreaming === "object"
        ? anime.currentStreaming
        : {};
      const legacyPrevious = anime.previousStreaming && typeof anime.previousStreaming === "object"
        ? anime.previousStreaming
        : {};

      // Preserve already verified current-installment links before later policy layers run.
      // Some older runtime code intentionally clears anime.currentStreaming for pre-release titles,
      // so this immutable snapshot is the source of truth for confirmed direct platform pages.
      anime.verifiedCurrentStreaming = validateLinkMap("kr", legacyCurrent);
      anime.streamingByRegion.kr.current = { ...anime.verifiedCurrentStreaming };
      anime.streamingByRegion.kr.previous = validateLinkMap("kr", legacyPrevious);
      anime.streaming = {
        ...anime.streamingByRegion.kr.previous,
        ...anime.streamingByRegion.kr.current
      };
    }
  }

  const resolveAnime = animeOrId => {
    if (!Array.isArray(window.animeData)) return null;
    if (animeOrId && typeof animeOrId === "object") return animeOrId;
    return window.animeData.find(item => item.id === animeOrId) || null;
  };

  window.streamingRegions = regionLabels;
  window.streamingRegionOrder = regionOrder;
  window.isDirectRegionalStreamingUrl = isDirectRegionalStreamingUrl;

  window.getAnimeStreamingForRegion = (animeOrId, regionId) => {
    const anime = resolveAnime(animeOrId);
    if (!anime || !isKnownRegion(regionId)) {
      return { region: regionId, current: {}, previous: {}, all: {} };
    }

    const stored = anime.streamingByRegion?.[regionId] || emptyRegionData();
    const current = {
      ...(regionId === "kr" ? (anime.verifiedCurrentStreaming || {}) : {}),
      ...(stored.current || {})
    };
    const previous = { ...(stored.previous || {}) };

    return {
      region: regionId,
      current,
      previous,
      all: { ...previous, ...current }
    };
  };

  window.setAnimeStreamingForRegion = (animeId, regionId, payload = {}) => {
    if (!isKnownRegion(regionId) || !Array.isArray(window.animeData)) return false;
    const anime = window.animeData.find(item => item.id === animeId);
    if (!anime) return false;

    anime.streamingByRegion ||= Object.fromEntries(regionOrder.map(id => [id, emptyRegionData()]));
    const existing = anime.streamingByRegion[regionId] || emptyRegionData();

    const currentFallback = regionId === "kr"
      ? { ...(anime.verifiedCurrentStreaming || {}), ...(existing.current || {}) }
      : { ...(existing.current || {}) };

    const current = hasOwn(payload, "current")
      ? validateLinkMap(regionId, payload.current || {})
      : currentFallback;
    const previous = hasOwn(payload, "previous")
      ? validateLinkMap(regionId, payload.previous || {})
      : { ...(existing.previous || {}) };

    anime.streamingByRegion[regionId] = { current, previous };

    if (regionId === "kr") {
      anime.currentStreaming = { ...current };
      anime.previousStreaming = { ...previous };
      anime.streaming = { ...previous, ...current };
      if (anime.links) anime.links.streaming = Object.values(current)[0] || null;
    }
    return true;
  };
})();
