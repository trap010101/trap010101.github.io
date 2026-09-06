// Region selector for previous-series streaming links.
// Streaming region is intentionally independent from the KR/JP/EN UI language.
(() => {
  const STORAGE_KEY = "animeStreamingRegion";
  const REGION_ORDER = Array.isArray(window.streamingRegionOrder)
    ? window.streamingRegionOrder
    : ["kr", "jp", "us"];

  const copy = {
    ko: {
      region: "시청 지역",
      previous: "이전 시리즈 정주행",
      note: "선택한 지역에서 이전 시리즈를 시청할 수 있는 서비스입니다. 현재 작품의 스트리밍 확정 정보가 아닙니다.",
      empty: "선택한 지역에서 확인된 이전 시리즈 스트리밍 서비스가 없습니다.",
      open: "열기 ↗"
    },
    ja: {
      region: "視聴地域",
      previous: "過去シリーズをまとめて視聴",
      note: "選択した地域で過去シリーズを視聴できるサービスです。今作の配信決定情報ではありません。",
      empty: "選択した地域では、確認済みの過去シリーズ配信サービスがありません。",
      open: "開く ↗"
    },
    en: {
      region: "Streaming region",
      previous: "Catch up on previous series",
      note: "These services stream earlier installments in the selected region and do not confirm streaming for the upcoming title.",
      empty: "No verified previous-series streaming service is available in the selected region.",
      open: "Open ↗"
    }
  };

  const safeGet = key => {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  };

  const safeSet = (key, value) => {
    try { window.localStorage.setItem(key, value); } catch (_) {}
  };

  const detectRegion = () => {
    const language = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
    const normalized = String(language || "").toLowerCase();
    if (normalized === "ko" || normalized.startsWith("ko-")) return "kr";
    if (normalized === "ja" || normalized.startsWith("ja-")) return "jp";
    return "us";
  };

  const savedRegion = safeGet(STORAGE_KEY);
  let activeRegion = REGION_ORDER.includes(savedRegion) ? savedRegion : detectRegion();
  if (!REGION_ORDER.includes(activeRegion)) activeRegion = "kr";

  let currentAnime = null;
  let currentTrigger = null;

  const activeLanguage = () => {
    try {
      if (typeof activeLang !== "undefined" && ["ko", "ja", "en"].includes(activeLang)) return activeLang;
    } catch (_) {}
    return document.documentElement.lang?.startsWith("ja")
      ? "ja"
      : document.documentElement.lang?.startsWith("en") ? "en" : "ko";
  };

  const regionData = anime => {
    if (typeof window.getAnimeStreamingForRegion === "function") {
      return window.getAnimeStreamingForRegion(anime, activeRegion);
    }
    return { region: activeRegion, current: {}, previous: {}, all: {} };
  };

  const hasAnyRegionalLink = anime => REGION_ORDER.some(regionId => {
    const data = typeof window.getAnimeStreamingForRegion === "function"
      ? window.getAnimeStreamingForRegion(anime, regionId)
      : null;
    return Object.values(data?.previous || {}).some(Boolean);
  });

  const platformList = () => Array.isArray(window.ottPlatforms) ? window.ottPlatforms : [];

  const regionLabel = regionId => {
    const lang = activeLanguage();
    const region = window.streamingRegions?.[regionId];
    return region?.label?.[lang] || region?.countryCode || regionId.toUpperCase();
  };

  const injectStyles = () => {
    if (document.getElementById("streamingRegionStyles")) return;
    const style = document.createElement("style");
    style.id = "streamingRegionStyles";
    style.textContent = `
      .stream-region-wrap {
        margin: 0 0 16px;
        padding: 12px;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: rgba(255,255,255,.025);
      }
      .stream-region-label {
        display: block;
        margin: 0 0 8px;
        color: #8f99ad;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .06em;
        text-transform: uppercase;
      }
      .stream-region-options {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
      }
      .stream-region-btn {
        min-width: 0;
        padding: 8px 9px;
        border-radius: 10px;
        color: #aab3c5;
        font-size: 11px;
        font-weight: 850;
      }
      .stream-region-btn.active {
        color: #fff;
        border-color: rgba(142,161,255,.42);
        background: linear-gradient(135deg, rgba(142,161,255,.24), rgba(178,140,255,.16));
      }
      .stream-region-btn strong {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
      }
      .stream-region-btn small {
        display: block;
        margin-top: 2px;
        color: inherit;
        opacity: .62;
        font-size: 9px;
      }
      .streaming-region-heading {
        margin: 0 0 9px;
        color: #dfe4f4;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .06em;
      }
      .streaming-region-note {
        margin: 9px 2px 0;
        color: #7f899c;
        font-size: 10px;
        line-height: 1.55;
      }
      .streaming-region-empty {
        margin: 0;
        padding: 13px 12px;
        border: 1px dashed rgba(255,255,255,.1);
        border-radius: 12px;
        color: #7f899c;
        font-size: 11px;
        line-height: 1.55;
      }
      @media (max-width: 480px) {
        .stream-region-options { grid-template-columns: 1fr; }
        .stream-region-btn { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .stream-region-btn small { margin-top: 0; }
      }
    `;
    document.head.appendChild(style);
  };

  const ensureRegionControls = () => {
    const desc = document.getElementById("streamDesc");
    const grid = document.getElementById("ottGrid");
    if (!grid) return null;

    let wrap = document.getElementById("streamRegionWrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "streamRegionWrap";
      wrap.className = "stream-region-wrap";
      if (desc?.nextSibling) desc.parentNode.insertBefore(wrap, desc.nextSibling);
      else grid.parentNode.insertBefore(wrap, grid);
    }
    return wrap;
  };

  const renderRegionControls = () => {
    const wrap = ensureRegionControls();
    if (!wrap) return;
    const lang = activeLanguage();
    const labels = copy[lang] || copy.ko;
    wrap.innerHTML = `
      <span class="stream-region-label">${labels.region}</span>
      <div class="stream-region-options">
        ${REGION_ORDER.map(regionId => {
          const region = window.streamingRegions?.[regionId];
          return `<button class="stream-region-btn ${regionId === activeRegion ? "active" : ""}" type="button" data-stream-region="${regionId}" aria-pressed="${regionId === activeRegion}">
            <strong>${regionLabel(regionId)}</strong>
            <small>${region?.countryCode || regionId.toUpperCase()}</small>
          </button>`;
        }).join("")}
      </div>
    `;
  };

  const renderStreamingContent = anime => {
    const grid = document.getElementById("ottGrid");
    const modalTitle = document.getElementById("streamModalTitle");
    if (!grid || !anime) return;

    const lang = activeLanguage();
    const labels = copy[lang] || copy.ko;
    const links = regionData(anime).previous || {};
    const available = platformList().filter(platform => links[platform.id]);

    if (modalTitle) {
      try { modalTitle.textContent = typeof localTitle === "function" ? localTitle(anime) : anime.title?.[lang] || anime.title?.ko || ""; }
      catch (_) { modalTitle.textContent = anime.title?.[lang] || anime.title?.ko || ""; }
    }

    renderRegionControls();
    grid.classList.add("streaming-sections");

    if (!available.length) {
      grid.innerHTML = `
        <section class="streaming-section streaming-section-previous">
          <h5 class="streaming-region-heading">${labels.previous}</h5>
          <p class="streaming-region-empty">${labels.empty}</p>
          <p class="streaming-region-note">${labels.note}</p>
        </section>`;
      return;
    }

    grid.innerHTML = `
      <section class="streaming-section streaming-section-previous">
        <h5 class="streaming-region-heading">${labels.previous}</h5>
        <div class="streaming-section-grid">
          ${available.map(platform => `
            <a class="ott-option" href="${links[platform.id]}" target="_blank" rel="noopener noreferrer">
              <span class="ott-option-name">${platform.name}</span>
              <span class="ott-option-state">${labels.open}</span>
            </a>`).join("")}
        </div>
        <p class="streaming-region-note">${labels.note}</p>
      </section>`;
  };

  const regionAwareOpenStreamingModal = (anime, trigger = null) => {
    const modal = document.getElementById("streamModal");
    if (!modal || !anime || !hasAnyRegionalLink(anime)) return;
    currentAnime = anime;
    currentTrigger = trigger;
    try { lastStreamTrigger = trigger; } catch (_) {}
    renderStreamingContent(anime);
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.querySelector(".stream-close")?.focus());
  };

  const setRegion = regionId => {
    if (!REGION_ORDER.includes(regionId)) return;
    activeRegion = regionId;
    safeSet(STORAGE_KEY, activeRegion);
    if (currentAnime) renderStreamingContent(currentAnime);
    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("newanime:streaming-region-change", { detail: { region: activeRegion } }));
    }
  };

  const install = () => {
    injectStyles();

    window.getActiveStreamingRegion = () => activeRegion;
    window.setActiveStreamingRegion = setRegion;
    window.hasRegionalStreamingLink = hasAnyRegionalLink;

    try { hasOttLink = hasAnyRegionalLink; } catch (_) { window.hasOttLink = hasAnyRegionalLink; }
    try { openStreamingModal = regionAwareOpenStreamingModal; } catch (_) { window.openStreamingModal = regionAwareOpenStreamingModal; }

    document.addEventListener("click", event => {
      const button = event.target.closest("[data-stream-region]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      setRegion(button.dataset.streamRegion);
    });

    const streamModal = document.getElementById("streamModal");
    streamModal?.addEventListener("transitionend", () => {
      if (streamModal.classList.contains("hidden")) {
        currentAnime = null;
        currentTrigger = null;
      }
    });

    // Re-render once so streaming buttons reflect availability across all supported regions.
    try {
      if (typeof render === "function") render();
      if (typeof updateStaticLanguage === "function") updateStaticLanguage();
    } catch (_) {}
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
