// Region-aware streaming modal for current installments and previous-series catch-up links.
// Streaming region is intentionally independent from the KR/JP/EN UI language.
(() => {
  const STORAGE_KEY = "animeStreamingRegion";
  const REGION_ORDER = Array.isArray(window.streamingRegionOrder)
    ? window.streamingRegionOrder
    : ["kr", "jp", "us"];

  const copy = {
    ko: {
      region: "시청 지역",
      current: "현재 작품 스트리밍",
      currentNote: "공식 서비스 페이지가 확인된 경우에만 표시합니다.",
      previous: "이전 시리즈 정주행",
      previousNote: "선택한 지역에서 이전 시리즈를 시청할 수 있는 서비스입니다. 현재 작품의 스트리밍 확정 정보가 아닙니다.",
      empty: "선택한 지역에서 확인된 스트리밍 정보가 없습니다.",
      open: "열기 ↗"
    },
    ja: {
      region: "視聴地域",
      current: "今作の配信",
      currentNote: "公式サービスの作品ページを確認できた場合のみ表示します。",
      previous: "過去シリーズをまとめて視聴",
      previousNote: "選択した地域で過去シリーズを視聴できるサービスです。今作の配信決定情報ではありません。",
      empty: "選択した地域では、確認済みの配信情報がありません。",
      open: "開く ↗"
    },
    en: {
      region: "Streaming region",
      current: "Current installment",
      currentNote: "Shown only when a verified official service page is available.",
      previous: "Catch up on previous series",
      previousNote: "These services stream earlier installments in the selected region and do not confirm streaming for the upcoming title.",
      empty: "No verified streaming information is available in the selected region.",
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
    if (typeof window.detectDefaultStreamingRegion === "function") {
      const detected = window.detectDefaultStreamingRegion();
      if (REGION_ORDER.includes(detected)) return detected;
    }
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

  const regionData = (anime, regionId = activeRegion) => {
    if (typeof window.getAnimeStreamingForRegion === "function") {
      return window.getAnimeStreamingForRegion(anime, regionId);
    }
    const stored = anime?.streamingByRegion?.[regionId] || {};
    const current = stored.current || {};
    const previous = stored.previous || {};
    return { region: regionId, current, previous, all: { ...previous, ...current } };
  };

  const hasLinks = links => Object.values(links || {}).some(Boolean);

  const hasAnyRegionalLink = anime => REGION_ORDER.some(regionId => {
    const data = regionData(anime, regionId);
    return hasLinks(data.current) || hasLinks(data.previous);
  });

  const platformList = () => Array.isArray(window.ottPlatforms) ? window.ottPlatforms : [];

  const regionLabel = regionId => {
    const lang = activeLanguage();
    const region = window.streamingRegions?.[regionId];
    return region?.[lang] || region?.label?.[lang] || region?.countryCode || regionId.toUpperCase();
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
      .streaming-sections {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }
      .streaming-section + .streaming-section {
        padding-top: 14px;
        border-top: 1px solid rgba(255,255,255,.065);
      }
      .streaming-section-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
      }
      .streaming-region-heading {
        margin: 0 0 9px;
        color: #dfe4f4;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .04em;
      }
      .streaming-section-current .streaming-region-heading {
        color: #eef1ff;
      }
      .streaming-section-current .ott-option {
        border-color: rgba(142,161,255,.24);
        background: linear-gradient(135deg, rgba(142,161,255,.10), rgba(178,140,255,.055));
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
        .streaming-section-grid { grid-template-columns: 1fr; }
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
        ${REGION_ORDER.map(regionId => `<button class="stream-region-btn ${regionId === activeRegion ? "active" : ""}" type="button" data-stream-region="${regionId}" aria-pressed="${regionId === activeRegion}">
          <strong>${regionLabel(regionId)}</strong>
          <small>${regionId.toUpperCase()}</small>
        </button>`).join("")}
      </div>
    `;
  };

  const platformCards = (links, labels) => {
    const available = platformList().filter(platform => links?.[platform.id]);
    return available.map(platform => `
      <a class="ott-option" href="${links[platform.id]}" target="_blank" rel="noopener noreferrer">
        <span class="ott-option-name">${platform.name}</span>
        <span class="ott-option-state">${labels.open}</span>
      </a>`).join("");
  };

  const renderStreamingContent = anime => {
    const grid = document.getElementById("ottGrid");
    const modalTitle = document.getElementById("streamModalTitle");
    if (!grid || !anime) return;

    const lang = activeLanguage();
    const labels = copy[lang] || copy.ko;
    const data = regionData(anime);
    const currentMarkup = platformCards(data.current, labels);
    const previousMarkup = platformCards(data.previous, labels);

    if (modalTitle) {
      try { modalTitle.textContent = typeof localTitle === "function" ? localTitle(anime) : anime.title?.[lang] || anime.title?.ko || ""; }
      catch (_) { modalTitle.textContent = anime.title?.[lang] || anime.title?.ko || ""; }
    }

    renderRegionControls();
    grid.classList.add("streaming-sections");

    const sections = [];
    if (currentMarkup) {
      sections.push(`
        <section class="streaming-section streaming-section-current">
          <h5 class="streaming-region-heading">${labels.current}</h5>
          <div class="streaming-section-grid">${currentMarkup}</div>
          <p class="streaming-region-note">${labels.currentNote}</p>
        </section>`);
    }
    if (previousMarkup) {
      sections.push(`
        <section class="streaming-section streaming-section-previous">
          <h5 class="streaming-region-heading">${labels.previous}</h5>
          <div class="streaming-section-grid">${previousMarkup}</div>
          <p class="streaming-region-note">${labels.previousNote}</p>
        </section>`);
    }

    grid.innerHTML = sections.length
      ? sections.join("")
      : `<p class="streaming-region-empty">${labels.empty}</p>`;
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

    // Re-render once so card buttons reflect current + previous availability across regions.
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
