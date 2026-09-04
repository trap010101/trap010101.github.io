const animeData = window.animeData || [];
const animeScheduleMonths = window.animeScheduleMonths || [];
const animeById = new Map(animeData.map(anime => [anime.id, anime]));
const ottPlatforms = window.ottPlatforms || [];

const uiLocales = {
  "ko": {
    "title": "방영 예정 애니메이션",
    "tabTitle": "NewAnime - 방영 예정 애니메이션",
    "description": "2026~2027년 방영 예정 애니메이션과 극장판의 방영일, PV, 공식 사이트, 스트리밍 정보를 한눈에 확인하세요.",
    "footerDescription": "방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.",
    "languageLabel": "언어 선택",
    "close": "닫기",
    "menu": "메뉴",
    "shareCopied": "링크를 복사했습니다.",
    "shareFailed": "공유 기능을 사용할 수 없습니다.",
    "shareText": "NewAnime에서 방영 예정 애니메이션 일정을 확인하세요.",
    "hero": "방영일과 PV, 공식 사이트 및 스트리밍 정보를 한눈에 확인하세요.",
    "search": "작품명 검색...",
    "reset": "필터 초기화",
    "year": "연도",
    "month": "월",
    "category": "카테고리",
    "all": "전체",
    "major": "주요 기대작",
    "new": "신작",
    "series": "시리즈",
    "comic": "코믹스 원작",
    "ln": "라이트 노벨 원작",
    "webtoon": "웹툰 원작",
    "webnovel": "웹소설 원작",
    "game": "게임 원작",
    "original": "오리지널",
    "movie": "극장판",
    "pv": "PV",
    "official": "공식 사이트",
    "officialShort": "공식",
    "streaming": "스트리밍",
    "noItems": "현재 검색·필터 조건에 맞는 작품 없음",
    "noConfirmed": "현재 확정된 주요 작품 없음",
    "undated": "2027년 방영 예정 · 월 미정",
    "updated": "업데이트",
    "streamKicker": "스트리밍",
    "streamDesc": "스트리밍 서비스를 선택하세요.",
    "open": "열기 ↗",
    "yearSuffix": "년",
    "monthSuffix": "월",
    "allMonths": "전체 월",
    "collapse": "카테고리 접기",
    "expand": "카테고리 펼치기",
    "searchFilters": "검색 · 필터",
    "showFilters": "검색 UI 펼치기",
    "hideFilters": "검색 UI 접기"
  },
  "ja": {
    "title": "放送予定アニメ",
    "tabTitle": "NewAnime - 放送予定アニメ",
    "description": "2026～2027年放送予定のアニメ・劇場版について、放送日、PV、公式サイト、配信情報をまとめて確認できます。",
    "footerDescription": "放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。",
    "languageLabel": "言語を選択",
    "close": "閉じる",
    "menu": "メニュー",
    "shareCopied": "リンクをコピーしました。",
    "shareFailed": "共有機能を利用できません。",
    "shareText": "NewAnimeで放送予定アニメのスケジュールを確認できます。",
    "hero": "放送日、PV、公式サイト、配信情報をまとめて確認できます。",
    "search": "作品名を検索...",
    "reset": "フィルターをリセット",
    "year": "年",
    "month": "月",
    "category": "カテゴリー",
    "all": "すべて",
    "major": "注目作",
    "new": "新作",
    "series": "シリーズ",
    "comic": "漫画原作",
    "ln": "ライトノベル原作",
    "webtoon": "ウェブトゥーン原作",
    "webnovel": "Web小説原作",
    "game": "ゲーム原作",
    "original": "オリジナル",
    "movie": "劇場版",
    "pv": "PV",
    "official": "公式サイト",
    "officialShort": "公式",
    "streaming": "配信",
    "noItems": "検索・フィルター条件に一致する作品はありません",
    "noConfirmed": "現時点で主要作品の確定情報はありません",
    "undated": "2027年放送予定・月未定",
    "updated": "更新",
    "streamKicker": "配信サービス",
    "streamDesc": "配信サービスを選択してください。",
    "open": "開く ↗",
    "yearSuffix": "年",
    "monthSuffix": "月",
    "allMonths": "全月",
    "collapse": "カテゴリーを閉じる",
    "expand": "カテゴリーを開く",
    "searchFilters": "検索・フィルター",
    "showFilters": "検索UIを開く",
    "hideFilters": "検索UIを閉じる"
  },
  "en": {
    "title": "Upcoming Anime",
    "tabTitle": "NewAnime - Upcoming Anime",
    "description": "Browse broadcast dates, PVs, official sites, and streaming information for upcoming anime and films in 2026–2027.",
    "footerDescription": "Browse broadcast dates, PVs, official sites, and streaming information for upcoming anime and films.",
    "languageLabel": "Select language",
    "close": "Close",
    "menu": "Menu",
    "shareCopied": "Link copied.",
    "shareFailed": "Sharing is unavailable.",
    "shareText": "Browse upcoming anime schedules on NewAnime.",
    "hero": "Browse release dates, PVs, official sites, and streaming information at a glance.",
    "search": "Search titles...",
    "reset": "Reset filters",
    "year": "Year",
    "month": "Month",
    "category": "Category",
    "all": "All",
    "major": "Highlights",
    "new": "New",
    "series": "Series",
    "comic": "Manga",
    "ln": "Light Novel",
    "webtoon": "Webtoon",
    "webnovel": "Web Novel",
    "game": "Game",
    "original": "Original",
    "movie": "Movie",
    "pv": "PV",
    "official": "Official Site",
    "officialShort": "Official",
    "streaming": "Streaming",
    "noItems": "No titles match the current search or filters",
    "noConfirmed": "No major titles confirmed yet",
    "undated": "Scheduled for 2027 · Month TBA",
    "updated": "Updated",
    "streamKicker": "Streaming",
    "streamDesc": "Choose a streaming service.",
    "open": "Open ↗",
    "yearSuffix": "",
    "monthSuffix": "",
    "allMonths": "All months",
    "collapse": "Collapse categories",
    "expand": "Expand categories",
    "searchFilters": "Search · Filters",
    "showFilters": "Expand search UI",
    "hideFilters": "Collapse search UI"
  }
};

const seasonLocales = {
  "2026-fall": {ko:"2026 가을", ja:"2026年 秋", en:"Fall 2026"},
  "2026-winter": {ko:"2026 겨울", ja:"2026年 冬", en:"Winter 2026"},
  "2027-winter": {ko:"2027 겨울", ja:"2027年 冬", en:"Winter 2027"},
  "2027-spring": {ko:"2027 봄", ja:"2027年 春", en:"Spring 2027"},
  "2027-summer": {ko:"2027 여름", ja:"2027年 夏", en:"Summer 2027"},
  "2027-fall": {ko:"2027 가을", ja:"2027年 秋", en:"Fall 2027"}
};

const filterNames = {
  major: "major",
  new: "new",
  series: "series",
  comic: "comic",
  ln: "ln",
  game: "game",
  original: "original",
  movie: "movie"
};


function safeStorageGet(key) {
  try { return window.localStorage.getItem(key); } catch (_) { return null; }
}

function safeStorageSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (_) {}
}

const supportedLanguages = ["ko", "ja", "en"];

function detectPreferredLanguage() {
  const language = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
  const normalized = String(language || "").toLowerCase();

  if (normalized === "ko" || normalized.startsWith("ko-")) return "ko";
  if (normalized === "ja" || normalized.startsWith("ja-")) return "ja";
  return "en";
}

const requestedLang = new URLSearchParams(window.location.search).get("lang");
const savedLang = safeStorageGet("animeScheduleLang");
let activeLang = supportedLanguages.includes(requestedLang)
  ? requestedLang
  : supportedLanguages.includes(savedLang)
    ? savedLang
    : detectPreferredLanguage();

function t(key) {
  return uiLocales[activeLang]?.[key] ?? uiLocales.ko[key] ?? key;
}

function localTitle(anime) {
  return anime?.title?.[activeLang] || anime?.title?.ko || "";
}

function localSeason(season) {
  return seasonLocales[season]?.[activeLang] || season;
}

function localMonthName(year, month) {
  if (activeLang === "ko") return `${year}년 ${month}월`;
  if (activeLang === "ja") return `${year}年${month}月`;
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })
    .format(new Date(year, month - 1, 1));
}

function localDateLabel(anime) {
  return anime.release.label?.[activeLang] || anime.release.label?.ko || "";
}

function categoryLabel(tag) {
  const key = filterNames[tag] || tag;
  return t(key) || tag;
}

function updateStaticLanguage() {
  document.documentElement.lang = activeLang === "ko" ? "ko" : activeLang === "ja" ? "ja" : "en";

  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const search = document.getElementById("search");
  const reset = document.getElementById("resetBtn");
  const yearLabel = document.getElementById("yearLabel");
  const monthLabel = document.getElementById("monthLabel");
  const categoryLabelEl = document.getElementById("categoryLabel");
  const updatedLabel = document.getElementById("updatedLabel");
  const streamKicker = document.getElementById("streamKicker");
  const streamDesc = document.getElementById("streamDesc");
  const mobileToolbarTitle = document.getElementById("mobileToolbarTitle");
  const languageSwitcher = document.getElementById("languageSwitcher");
  const footerDescription = document.getElementById("footerDescription");
  const closeButton = document.querySelector(".stream-close");
  const menuToggle = document.getElementById("menuToggle");
  const pageUrl = `https://newani.me/?lang=${activeLang}`;
  const locale = activeLang === "ko" ? "ko_KR" : activeLang === "ja" ? "ja_JP" : "en_US";

  if (heroTitle) heroTitle.textContent = t("title");
  if (heroSubtitle) heroSubtitle.textContent = t("hero");
  if (mobileToolbarTitle) mobileToolbarTitle.textContent = t("searchFilters");
  document.title = t("tabTitle");
  document.getElementById("metaDescription")?.setAttribute("content", t("description"));
  document.getElementById("contentLanguageMeta")?.setAttribute("content", activeLang);
  document.getElementById("canonicalLink")?.setAttribute("href", pageUrl);
  document.getElementById("ogTitle")?.setAttribute("content", t("tabTitle"));
  document.getElementById("ogDescription")?.setAttribute("content", t("description"));
  document.getElementById("ogUrl")?.setAttribute("content", pageUrl);
  document.getElementById("ogLocale")?.setAttribute("content", locale);
  document.getElementById("twitterTitle")?.setAttribute("content", t("tabTitle"));
  document.getElementById("twitterDescription")?.setAttribute("content", t("description"));
  if (languageSwitcher) languageSwitcher.setAttribute("aria-label", t("languageLabel"));
  if (footerDescription) footerDescription.textContent = t("footerDescription");
  if (closeButton) closeButton.setAttribute("aria-label", t("close"));
  if (menuToggle) {
    menuToggle.setAttribute("aria-label", t("menu"));
    menuToggle.title = t("menu");
  }

  const structuredData = document.getElementById("websiteStructuredData");
  if (structuredData) {
    try {
      const schema = JSON.parse(structuredData.textContent);
      schema.description = t("description");
      schema.inLanguage = activeLang;
      schema.url = pageUrl;
      structuredData.textContent = JSON.stringify(schema);
    } catch (_) {}
  }

  if (search) search.placeholder = t("search");
  if (reset) reset.textContent = t("reset");
  if (yearLabel) yearLabel.textContent = t("year");
  if (monthLabel) monthLabel.textContent = t("month");
  if (categoryLabelEl) categoryLabelEl.textContent = t("category");
  if (updatedLabel) updatedLabel.textContent = t("updated");
  if (streamKicker) streamKicker.textContent = t("streamKicker");
  if (streamDesc) streamDesc.textContent = t("streamDesc");

document.querySelectorAll("#languageSwitcher .language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === activeLang);
  });

  document.querySelectorAll("#filters .chip").forEach(btn => {
    const filter = btn.dataset.filter;
    btn.textContent = filter === "all" ? t("all") : categoryLabel(filter);
  });

  const undatedLabel = document.querySelector("#undatedToggle > span:first-child");
  if (undatedLabel) undatedLabel.textContent = t("undated");
  updateCategoryCollapse();
  updateToolbarCollapse();
}

let activeFilter = "all";
let activeYear = 2026;
let activeMonth = "all";
let categoryCollapsed = safeStorageGet("animeScheduleCategoryCollapsed") === "1";
const mobileToolbarQuery = window.matchMedia("(max-width: 720px)");
const toolbarCollapsedSaved = safeStorageGet("animeScheduleToolbarCollapsed");
let toolbarCollapsed = toolbarCollapsedSaved === null ? mobileToolbarQuery.matches : toolbarCollapsedSaved === "1";

const scheduleEl = document.getElementById("schedule");
const searchEl = document.getElementById("search");
const monthNavEl = document.getElementById("monthNav");
const undatedSection = document.querySelector(".undated");
const toolbarEl = document.getElementById("toolbar");
const mobileToolbarToggle = document.getElementById("mobileToolbarToggle");
const siteMenuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");
const siteMenuWrap = document.querySelector(".menu-wrap");
const shareButton = document.getElementById("shareButton");
const shareStatus = document.getElementById("shareStatus");
let shareStatusTimer;

function closeSiteMenu({ restoreFocus = false } = {}) {
  if (!siteMenu || !siteMenuToggle || siteMenu.classList.contains("hidden")) return;
  siteMenu.classList.add("hidden");
  siteMenuToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) siteMenuToggle.focus();
}

function showShareStatus(message) {
  if (!shareStatus) return;
  clearTimeout(shareStatusTimer);
  shareStatus.textContent = message;
  shareStatus.classList.remove("hidden");
  shareStatusTimer = setTimeout(() => {
    shareStatus.classList.add("hidden");
  }, 2200);
}

async function copyShareUrl(url) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const temporaryInput = document.createElement("textarea");
  temporaryInput.value = url;
  temporaryInput.setAttribute("readonly", "");
  temporaryInput.style.position = "fixed";
  temporaryInput.style.opacity = "0";
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  const copied = document.execCommand("copy");
  temporaryInput.remove();
  if (!copied) throw new Error("Copy failed");
}

siteMenuToggle?.addEventListener("click", () => {
  const willOpen = siteMenu?.classList.contains("hidden");
  if (!siteMenu || !willOpen) {
    closeSiteMenu();
    return;
  }

  siteMenu.classList.remove("hidden");
  siteMenuToggle.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => siteMenu.querySelector("[role='menuitem']")?.focus());
});

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: t("tabTitle"),
    text: t("shareText"),
    url: window.location.href
  };

  closeSiteMenu();
  try {
    if (typeof navigator.share === "function") {
      await navigator.share(shareData);
    } else {
      await copyShareUrl(shareData.url);
      showShareStatus(t("shareCopied"));
    }
  } catch (error) {
    if (error?.name !== "AbortError") showShareStatus(t("shareFailed"));
  }
});

document.addEventListener("click", event => {
  if (siteMenuWrap && !siteMenuWrap.contains(event.target)) closeSiteMenu();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && siteMenu && !siteMenu.classList.contains("hidden")) {
    closeSiteMenu({ restoreFocus: true });
  }
});

document.getElementById("categoryToggle")?.addEventListener("click", () => {
  categoryCollapsed = !categoryCollapsed;
  safeStorageSet("animeScheduleCategoryCollapsed", categoryCollapsed ? "1" : "0");
  updateCategoryCollapse();
  updateTitleScrolls();
});

mobileToolbarToggle?.addEventListener("click", () => {
  toolbarCollapsed = !toolbarCollapsed;
  safeStorageSet("animeScheduleToolbarCollapsed", toolbarCollapsed ? "1" : "0");
  updateToolbarCollapse();
});

const handleToolbarViewportChange = () => updateToolbarCollapse();
if (mobileToolbarQuery.addEventListener) {
  mobileToolbarQuery.addEventListener("change", handleToolbarViewportChange);
} else if (mobileToolbarQuery.addListener) {
  mobileToolbarQuery.addListener(handleToolbarViewportChange);
}

function updateToolbarCollapse() {
  if (!toolbarEl || !mobileToolbarToggle) return;

  const effectiveCollapsed = mobileToolbarQuery.matches ? toolbarCollapsed : false;
  toolbarEl.classList.toggle("is-mobile-collapsed", effectiveCollapsed);
  mobileToolbarToggle.setAttribute("aria-expanded", String(!effectiveCollapsed));
  mobileToolbarToggle.setAttribute("aria-label", t(effectiveCollapsed ? "showFilters" : "hideFilters"));
  mobileToolbarToggle.title = t(effectiveCollapsed ? "showFilters" : "hideFilters");

  const titleEl = document.getElementById("mobileToolbarTitle");
  const iconEl = document.getElementById("mobileToolbarIcon");
  if (titleEl) titleEl.textContent = t("searchFilters");
  if (iconEl) iconEl.textContent = effectiveCollapsed ? "＋" : "－";
}

function updateCategoryCollapse() {
  const group = document.getElementById("categoryGroup");
  const toggle = document.getElementById("categoryToggle");
  const icon = document.getElementById("categoryToggleIcon");
  if (!group || !toggle) return;

  group.classList.toggle("is-collapsed", categoryCollapsed);
  toggle.setAttribute("aria-expanded", String(!categoryCollapsed));
  toggle.setAttribute("aria-label", t(categoryCollapsed ? "expand" : "collapse"));
  toggle.title = t(categoryCollapsed ? "expand" : "collapse");
  if (icon) icon.textContent = "⌃";
}


function posterMarkup(anime) {
  if (!anime.poster?.src) {
    return `
      <div class="poster-frame" aria-label="${localTitle(anime)}">
        <div class="poster-fallback" aria-hidden="true">?</div>
      </div>
    `;
  }

  return `
    <div class="poster-frame has-image" aria-label="${localTitle(anime)}">
      <img
        src="${anime.poster.src}"
        alt="${localTitle(anime)}"
        style="object-position: ${anime.poster.position || "center center"}"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        referrerpolicy="no-referrer"
        onerror="this.closest('.poster-frame').classList.add('poster-error')"
      >
      <div class="poster-fallback" aria-hidden="true">?</div>
    </div>
  `;
}

function resourceButton(url, label, shortLabel = null) {
  const labelMarkup = shortLabel
    ? `<span class="resource-label-long">${label}</span><span class="resource-label-short">${shortLabel}</span>`
    : `<span>${label}</span>`;

  if (!url) {
    return `<span class="resource-btn disabled" aria-disabled="true">${labelMarkup}</span>`;
  }

  return `<a class="resource-btn" href="${url}" target="_blank" rel="noopener noreferrer">${labelMarkup}<span class="external">↗</span></a>`;
}

function hasOttLink(anime) {
  return Object.values(anime.streaming || {}).some(Boolean);
}

function streamingButton(anime) {
  if (!hasOttLink(anime)) {
    return `<button class="stream-trigger disabled" type="button" disabled >${t("streaming")}</button>`;
  }

  return `<button class="stream-trigger" type="button" data-anime-id="${anime.id}">${t("streaming")} <span class="external">▾</span></button>`;
}

function isXLink(url) {
  if (!url) return false;
  try {
    const host = new URL(url, window.location.href).hostname.toLowerCase();
    return host === "x.com" || host.endsWith(".x.com") ||
           host === "twitter.com" || host.endsWith(".twitter.com");
  } catch (_) {
    return false;
  }
}

function resourceActions(anime) {
  const links = anime.links;
  const officialIsX = isXLink(links.official);
  const officialLabel = officialIsX ? "X" : t("official");
  const officialShortLabel = officialIsX ? "X" : t("officialShort");

  return `
    <div class="resource-actions">
      ${resourceButton(links.pv, t("pv"))}
      ${resourceButton(links.official, officialLabel, officialShortLabel)}
      ${streamingButton(anime)}
    </div>
  `;
}

const streamModal = document.getElementById("streamModal");
const streamModalTitle = document.getElementById("streamModalTitle");
const ottGrid = document.getElementById("ottGrid");
let lastStreamTrigger = null;

function openStreamingModal(anime, trigger = null) {
  const links = anime.streaming || {};
  lastStreamTrigger = trigger;

  streamModalTitle.textContent = localTitle(anime);
  const availablePlatforms = ottPlatforms.filter(platform => links[platform.id]);

  ottGrid.innerHTML = availablePlatforms.map(platform => {
    const url = links[platform.id];
    return `
      <a class="ott-option" href="${url}" target="_blank" rel="noopener noreferrer">
        <span class="ott-option-name">${platform.name}</span>
        <span class="ott-option-state">${t("open")}</span>
      </a>
    `;
  }).join("");

  streamModal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  const closeButton = streamModal.querySelector(".stream-close");
  requestAnimationFrame(() => closeButton?.focus());
}

function closeStreamingModal() {
  if (streamModal.classList.contains("hidden")) return;

  streamModal.classList.add("hidden");
  document.body.classList.remove("modal-open");

  if (lastStreamTrigger) {
    lastStreamTrigger.focus();
    lastStreamTrigger = null;
  }
}

document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-anime-id]");
  if (trigger) {
    const anime = animeById.get(trigger.dataset.animeId);
    if (anime) openStreamingModal(anime, trigger);
    return;
  }

  if (event.target.closest("[data-stream-close]")) {
    closeStreamingModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeStreamingModal();
});

function renderMonthNav() {
  const months = animeScheduleMonths.filter(item => item.year === activeYear);
  monthNavEl.innerHTML = [
    `<button class="${activeMonth === "all" ? "active" : ""}" data-month="all">${t("all")}</button>`,
    ...months.map(item => {
      const monthNum = item.month;
      return `<button class="${activeMonth === item.id ? "active" : ""}" data-month="${item.id}">${activeLang === "en" ? new Intl.DateTimeFormat("en-US",{month:"short"}).format(new Date(activeYear, monthNum-1, 1)) : monthNum + t("monthSuffix")}</button>`;
    })
  ].join("");

  monthNavEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      activeMonth = btn.dataset.month;
      renderMonthNav();
      render();
    });
  });
}

function renderUndated() {
  const undatedAnime = animeData.filter(anime =>
    anime.release.status === "year" || anime.release.status === "tba"
  );

  document.getElementById("undatedList").innerHTML = undatedAnime.map(anime => `
    <div class="undated-item">
      <div class="undated-layout">
        ${posterMarkup(anime)}
        <div class="undated-content-main">
          <div class="undated-title-scroll"><div class="undated-title undated-title-scroll-inner">${localTitle(anime)}</div></div>
          <div class="meta">
            ${anime.tags.map(tag => `<span class="badge ${tag}">${categoryLabel(tag)}</span>`).join("")}
          </div>
          ${resourceActions(anime)}
        </div>
      </div>
    </div>
  `).join("");

  undatedSection.classList.toggle("hidden", activeYear !== 2027);
}

function updateTitleScrolls() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".title-scroll, .undated-title-scroll").forEach(wrapper => {
      const inner = wrapper.firstElementChild;
      if (!inner || wrapper.clientWidth <= 0) return;

      wrapper.classList.remove("is-overflowing", "has-scrolled");
      wrapper.style.removeProperty("--scroll-distance");
      wrapper.style.removeProperty("--scroll-duration");
      inner.style.removeProperty("transform");

      // Measure the natural wrapped title height before deciding to marquee.
      inner.classList.add("measure-title");
      const style = getComputedStyle(inner);
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
      const naturalHeight = inner.scrollHeight;
      inner.classList.remove("measure-title");

      const exceedsTwoLines = naturalHeight > (lineHeight * 2 + 2);
      if (!exceedsTwoLines) return;

      wrapper.classList.add("is-overflowing");

      // Now that it is single-line, measure the horizontal travel distance.
      const overflow = Math.max(0, Math.ceil(inner.scrollWidth - wrapper.clientWidth));
      wrapper.style.setProperty("--scroll-distance", `${overflow + 8}px`);

      const duration = Math.max(8, Math.min(22, 6 + overflow / 28));
      wrapper.style.setProperty("--scroll-duration", `${duration}s`);

      const markScrolled = () => wrapper.classList.add("has-scrolled");
      inner.addEventListener("animationiteration", markScrolled, { once: true });
    });
  });
}

let titleResizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(titleResizeTimer);
  titleResizeTimer = setTimeout(updateTitleScrolls, 120);
});

function scheduleDateSortKey(anime) {
  const rawLabel = anime.release.rawLabel || "";
  const exactMatch = /^(\d{1,2})\/(\d{1,2})$/.exec(rawLabel);
  if (exactMatch) return [0, Number(exactMatch[1]), Number(exactMatch[2])];

  const monthOnlyMatch = /^(\d{1,2})월$/.exec(rawLabel);
  if (monthOnlyMatch) return [1, Number(monthOnlyMatch[1]), 0];

  return [2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
}

function compareScheduleItems(a, b) {
  const aKey = scheduleDateSortKey(a);
  const bKey = scheduleDateSortKey(b);

  for (let i = 0; i < aKey.length; i += 1) {
    if (aKey[i] !== bKey[i]) return aKey[i] - bKey[i];
  }
  return 0;
}

function render() {
  const q = searchEl.value.trim().toLowerCase();
  let previousSeason = "";

  const visibleMonths = animeScheduleMonths.filter(month => {
    const yearOk = month.year === activeYear;
    const monthOk = activeMonth === "all" || month.id === activeMonth;
    return yearOk && monthOk;
  });

  scheduleEl.innerHTML = `
    <div class="year-summary">${activeLang === "ko" ? activeYear + "년" : activeLang === "ja" ? activeYear + "年" : activeYear} · ${activeMonth === "all" ? t("allMonths") : (activeLang === "en" ? new Intl.DateTimeFormat("en-US",{month:"long"}).format(new Date(activeYear, Number(activeMonth.slice(5,7))-1, 1)) : Number(activeMonth.slice(5,7)) + t("monthSuffix"))}</div>
  ` + visibleMonths.map(month => {
    const monthAnime = animeData.filter(anime =>
      anime.release.year === month.year &&
      anime.release.month === month.month &&
      (anime.release.status === "date" || anime.release.status === "month")
    );
    const items = monthAnime.filter(anime => {
      const searchPool = [...Object.values(anime.title), ...(anime.aliases || [])].join(" ").toLowerCase();
      const searchOk = !q || searchPool.includes(q);
      const filterOk = activeFilter === "all" || anime.tags.includes(activeFilter);
      return searchOk && filterOk;
    }).sort(compareScheduleItems);

    const seasonHeader = month.season !== previousSeason
      ? `<div class="season-divider"><h2>${localSeason(month.season)}</h2></div>`
      : "";

    previousSeason = month.season;

    const cards = items.length
      ? items.map(anime => `
          <article class="card">
            <div class="card-layout">
              ${posterMarkup(anime)}
              <div class="card-content">
                <div class="card-top">
                  <div class="title-scroll"><div class="title title-scroll-inner">${localTitle(anime)}</div></div>
                  <div class="date">${localDateLabel(anime)}</div>
                </div>
                <div class="meta">
                  ${anime.tags.map(tag => `<span class="badge ${tag}">${categoryLabel(tag)}</span>`).join("")}
                </div>
                ${resourceActions(anime)}
              </div>
            </div>
          </article>
        `).join("")
      : `<div class="empty">${
          monthAnime.length === 0
            ? t("noConfirmed")
            : t("noItems")
        }</div>`;

    return `
      ${seasonHeader}
      <section class="month" id="m-${month.id}">
        <div class="month-head">
          <div>
            <h3>${localMonthName(month.year, month.month)}</h3>
          </div>
          </div>
          <span class="month-count">${activeLang === "ja" ? items.length + "作品" : activeLang === "en" ? items.length + " titles" : items.length + "작품"}</span>
        </div>
        <div class="cards">${cards}</div>
      </section>
    `;
  }).join("");

  renderUndated();
  updateTitleScrolls();
}

document.querySelectorAll("#languageSwitcher .language-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeLang = btn.dataset.lang;
    safeStorageSet("animeScheduleLang", activeLang);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", activeLang);
    history.replaceState(null, "", nextUrl);
    updateStaticLanguage();
    renderMonthNav();
    render();
  });
});

document.querySelectorAll("#filters .chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#filters .chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

document.querySelectorAll("#yearFilters .year-chip").forEach(btn => {
  btn.addEventListener("click", () => {
    activeYear = Number(btn.dataset.year);
    activeMonth = "all";
    document.querySelectorAll("#yearFilters .year-chip").forEach(b => {
      b.classList.toggle("active", Number(b.dataset.year) === activeYear);
    });
    renderMonthNav();
    render();
  });
});

searchEl.addEventListener("input", render);

document.getElementById("resetBtn").addEventListener("click", () => {
  searchEl.value = "";
  activeFilter = "all";
  activeYear = 2026;
  activeMonth = "all";

  document.querySelectorAll("#filters .chip").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === "all");
  });
  document.querySelectorAll("#yearFilters .year-chip").forEach(b => {
    b.classList.toggle("active", Number(b.dataset.year) === activeYear);
  });

  renderMonthNav();
  render();
});

document.getElementById("undatedToggle").addEventListener("click", () => {
  const content = document.getElementById("undatedContent");
  const arrow = document.getElementById("undatedArrow");
  content.classList.toggle("hidden");
  arrow.textContent = content.classList.contains("hidden") ? "＋" : "−";
});

updateStaticLanguage();
renderMonthNav();
render();

if (document.fonts?.ready) {
  document.fonts.ready.then(updateTitleScrolls).catch(() => {});
}


