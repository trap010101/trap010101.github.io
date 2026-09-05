const animeData = window.animeData || [];
const animeUpdates = window.animeUpdates || [];
const animeById = new Map(animeData.map(anime => [anime.id, anime]));

const locales = {
  ko: {
    tabTitle: "최근 업데이트 - NewAnime",
    description: "NewAnime에 최근 반영된 방영일, PV, 공식 정보 및 스트리밍 변경 내역을 확인하세요.",
    heading: "최근 업데이트",
    headingDescription: "업데이트 내역에 대한 상세 정보입니다.",
    kicker: "newani.me",
    languageLabel: "언어 선택",
    menu: "메뉴",
    menuUpdates: "업데이트",
    menuContact: "문의",
    menuShare: "공유",
    shareText: "NewAnime의 최근 애니메이션 정보 변경 내역을 확인하세요.",
    shareCopied: "링크를 복사했습니다.",
    shareFailed: "공유 기능을 사용할 수 없습니다.",
    footerDescription: "방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.",
    filtersLabel: "업데이트 필터",
    filterAll: "전체",
    filterAdded: "신규 등록",
    filterRelease: "방영일",
    filterPv: "PV",
    filterStreaming: "스트리밍",
    filterOther: "기타",
    empty: "이 유형의 업데이트가 없습니다.",
    sourceAction: "출처 보기",
    sourceOfficialSite: "공식 사이트",
    sourceOfficialX: "공식 X 발표",
    sourceOfficialYoutube: "공식 YouTube",
    sourceStreamingPlatform: "스트리밍 서비스",
    sourcePublisher: "출판사",
    sourceStudio: "제작사",
    sourceNews: "공식 뉴스",
    sourceDistributor: "배급사",
    sourceOther: "기타 출처",
    typeAnimeAdded: "신규 등록",
    typeReleaseWindow: "방영 시기",
    typeReleaseDate: "방영일",
    typeReleaseDelay: "연기",
    typeReleaseCancelled: "취소",
    typePoster: "포스터",
    typePv: "PV",
    typeOfficialLink: "공식 링크",
    typeStreaming: "스트리밍",
    typeTitle: "제목",
    typeFormat: "작품 유형",
    typeSource: "출처",
    typeOther: "기타"
  },
  ja: {
    tabTitle: "最近の更新 - NewAnime",
    description: "NewAnimeに最近反映された放送日、PV、公式情報、配信情報の変更履歴を確認できます。",
    heading: "最近の更新",
    headingDescription: "NewAnimeに反映された主な情報変更履歴",
    kicker: "最近の変更",
    languageLabel: "言語を選択",
    menu: "メニュー",
    menuUpdates: "更新",
    menuContact: "お問い合わせ",
    menuShare: "共有",
    shareText: "NewAnimeの最近のアニメ情報変更履歴を確認できます。",
    shareCopied: "リンクをコピーしました。",
    shareFailed: "共有機能を利用できません。",
    footerDescription: "放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。",
    filtersLabel: "更新フィルター",
    filterAll: "すべて",
    filterAdded: "新規登録",
    filterRelease: "放送日",
    filterPv: "PV",
    filterStreaming: "配信",
    filterOther: "その他",
    empty: "この種類の更新はありません。",
    sourceAction: "情報源を見る",
    sourceOfficialSite: "公式サイト",
    sourceOfficialX: "公式X発表",
    sourceOfficialYoutube: "公式YouTube",
    sourceStreamingPlatform: "配信サービス",
    sourcePublisher: "出版社",
    sourceStudio: "制作会社",
    sourceNews: "公式ニュース",
    sourceDistributor: "配給会社",
    sourceOther: "その他の情報源",
    typeAnimeAdded: "新規登録",
    typeReleaseWindow: "放送時期",
    typeReleaseDate: "放送日",
    typeReleaseDelay: "延期",
    typeReleaseCancelled: "中止",
    typePoster: "ポスター",
    typePv: "PV",
    typeOfficialLink: "公式リンク",
    typeStreaming: "配信",
    typeTitle: "タイトル",
    typeFormat: "作品形式",
    typeSource: "情報源",
    typeOther: "その他"
  },
  en: {
    tabTitle: "Recent Updates - NewAnime",
    description: "See recent changes to release dates, PVs, official information, and streaming availability on NewAnime.",
    heading: "Recent Updates",
    headingDescription: "Notable information changes published on NewAnime",
    kicker: "WHAT CHANGED",
    languageLabel: "Select language",
    menu: "Menu",
    menuUpdates: "UPDATES",
    menuContact: "CONTACT",
    menuShare: "SHARE",
    shareText: "See recent anime information changes on NewAnime.",
    shareCopied: "Link copied.",
    shareFailed: "Sharing is unavailable.",
    footerDescription: "Browse release dates, PVs, official sites, and streaming information for upcoming anime and films.",
    filtersLabel: "Update filters",
    filterAll: "All",
    filterAdded: "New anime",
    filterRelease: "Release date",
    filterPv: "PV",
    filterStreaming: "Streaming",
    filterOther: "Other",
    empty: "There are no updates of this type.",
    sourceAction: "View source",
    sourceOfficialSite: "Official website",
    sourceOfficialX: "Official X announcement",
    sourceOfficialYoutube: "Official YouTube",
    sourceStreamingPlatform: "Streaming service",
    sourcePublisher: "Publisher",
    sourceStudio: "Studio",
    sourceNews: "Official news",
    sourceDistributor: "Distributor",
    sourceOther: "Other source",
    typeAnimeAdded: "New anime",
    typeReleaseWindow: "Release window",
    typeReleaseDate: "Release date",
    typeReleaseDelay: "Delayed",
    typeReleaseCancelled: "Cancelled",
    typePoster: "Poster",
    typePv: "PV",
    typeOfficialLink: "Official link",
    typeStreaming: "Streaming",
    typeTitle: "Title",
    typeFormat: "Format",
    typeSource: "Source",
    typeOther: "Other"
  }
};

const filterLabels = {
  all: "filterAll",
  added: "filterAdded",
  release: "filterRelease",
  pv: "filterPv",
  streaming: "filterStreaming",
  other: "filterOther"
};

const updateTypeLabels = {
  "anime-added": "typeAnimeAdded",
  "release-window": "typeReleaseWindow",
  "release-date": "typeReleaseDate",
  "release-delay": "typeReleaseDelay",
  "release-cancelled": "typeReleaseCancelled",
  poster: "typePoster",
  pv: "typePv",
  "official-link": "typeOfficialLink",
  "streaming-added": "typeStreaming",
  "streaming-removed": "typeStreaming",
  "streaming-updated": "typeStreaming",
  title: "typeTitle",
  format: "typeFormat",
  source: "typeSource",
  other: "typeOther"
};

const sourceTypeLabels = {
  "official-site": "sourceOfficialSite",
  "official-x": "sourceOfficialX",
  "official-youtube": "sourceOfficialYoutube",
  "streaming-platform": "sourceStreamingPlatform",
  publisher: "sourcePublisher",
  studio: "sourceStudio",
  news: "sourceNews",
  distributor: "sourceDistributor",
  other: "sourceOther"
};

function safeStorageGet(key) {
  try { return window.localStorage.getItem(key); } catch (_) { return null; }
}

function safeStorageSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (_) {}
}

function detectPreferredLanguage() {
  const language = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
  const normalized = String(language || "").toLowerCase();
  if (normalized === "ko" || normalized.startsWith("ko-")) return "ko";
  if (normalized === "ja" || normalized.startsWith("ja-")) return "ja";
  return "en";
}

const supportedLanguages = ["ko", "ja", "en"];
const requestedLang = new URLSearchParams(window.location.search).get("lang");
const savedLang = safeStorageGet("animeScheduleLang");
let activeLang = supportedLanguages.includes(requestedLang)
  ? requestedLang
  : supportedLanguages.includes(savedLang)
    ? savedLang
    : detectPreferredLanguage();
let activeFilter = "all";
let shareStatusTimer;

function t(key) {
  return locales[activeLang]?.[key] ?? locales.ko[key] ?? key;
}

function localTitle(anime) {
  return anime?.title?.[activeLang] || anime?.title?.ko || "";
}

function localSummary(update) {
  return update?.summary?.[activeLang] || update?.summary?.ko || "";
}

function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
}

function formatDate(value) {
  const date = parseIsoDate(value);
  if (!date) return "";
  const languageTags = { ko: "ko-KR", ja: "ja-JP", en: "en-US" };
  return new Intl.DateTimeFormat(languageTags[activeLang], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function filterGroup(type) {
  if (type === "anime-added") return "added";
  if (["release-window", "release-date", "release-delay", "release-cancelled"].includes(type)) return "release";
  if (type === "pv") return "pv";
  if (["streaming-added", "streaming-removed", "streaming-updated"].includes(type)) return "streaming";
  return "other";
}

function posterUrl(src) {
  if (!src || /^(?:https?:)?\/\//.test(src) || src.startsWith("/")) return src || "";
  return `/${src.replace(/^\.\//, "")}`;
}

function updatePosterMarkup(anime) {
  if (!anime.poster?.src) return `<div class="update-poster"><span aria-hidden="true">?</span></div>`;
  return `
    <div class="update-poster has-image">
      <img src="${posterUrl(anime.poster.src)}" alt="" style="object-position: ${anime.poster.position || "center center"}" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer" onerror="this.closest('.update-poster').classList.add('poster-error')">
      <span aria-hidden="true">?</span>
    </div>`;
}

function renderUpdateItem(update) {
  const anime = animeById.get(update.animeId);
  if (!anime) return "";
  const sourceLabel = t(sourceTypeLabels[update.source?.type] || "sourceOther");
  const sourceAction = update.source?.url
    ? `<a class="update-source-link" href="${update.source.url}" target="_blank" rel="noopener noreferrer" aria-label="${t("sourceAction")}: ${sourceLabel}">${sourceLabel} <span aria-hidden="true">↗</span></a>`
    : "";
  return `
    <article class="update-item update-${update.type}" data-update-id="${update.id}">
      ${updatePosterMarkup(anime)}
      <div class="update-content">
        <div class="update-title-row">
          <h3>${localTitle(anime)}</h3>
          <time datetime="${update.changedAt}">${formatDate(update.changedAt)}</time>
        </div>
        <p>${localSummary(update)}</p>
        <div class="update-meta">
          <span class="update-type">${t(updateTypeLabels[update.type] || "typeOther")}</span>
          ${sourceAction}
        </div>
      </div>
    </article>`;
}

const sortedUpdates = animeUpdates
  .map((update, index) => ({ update, index }))
  .filter(({ update }) => animeById.has(update.animeId))
  .sort((a, b) => b.update.changedAt.localeCompare(a.update.changedAt) || a.index - b.index)
  .map(({ update }) => update);

function renderUpdates() {
  const visibleUpdates = activeFilter === "all"
    ? sortedUpdates
    : sortedUpdates.filter(update => filterGroup(update.type) === activeFilter);
  const list = document.getElementById("updatesList");
  const empty = document.getElementById("updatesEmpty");
  list.innerHTML = visibleUpdates.map(renderUpdateItem).join("");
  empty.classList.toggle("hidden", visibleUpdates.length > 0);
}

function updateStaticLanguage() {
  document.documentElement.lang = activeLang;
  const pageUrl = `https://newani.me/updates/?lang=${activeLang}`;
  const locale = activeLang === "ko" ? "ko_KR" : activeLang === "ja" ? "ja_JP" : "en_US";
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
  document.getElementById("updatesTitle").textContent = t("heading");
  document.getElementById("updatesDescription").textContent = t("headingDescription");
  document.getElementById("updatesKicker").textContent = t("kicker");
  document.getElementById("footerDescription").textContent = t("footerDescription");
  document.getElementById("updatesEmpty").textContent = t("empty");
  document.getElementById("languageSwitcher").setAttribute("aria-label", t("languageLabel"));
  document.getElementById("updatesFilters").setAttribute("aria-label", t("filtersLabel"));
  document.getElementById("menuToggle").setAttribute("aria-label", t("menu"));
  document.getElementById("menuToggle").title = t("menu");
  document.getElementById("updatesMenuLabel").textContent = t("menuUpdates");
  document.getElementById("contactMenuLabel").textContent = t("menuContact");
  document.getElementById("shareMenuLabel").textContent = t("menuShare");
  document.getElementById("updatesMenuLink").href = `/updates/?lang=${activeLang}`;
  document.getElementById("homeLink").href = `/?lang=${activeLang}`;

  document.querySelectorAll("#languageSwitcher .language-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === activeLang);
  });
  document.querySelectorAll("#updatesFilters button").forEach(button => {
    button.textContent = t(filterLabels[button.dataset.filter]);
  });

  const structuredData = document.getElementById("updatesStructuredData");
  if (structuredData) {
    try {
      const schema = JSON.parse(structuredData.textContent);
      schema.name = t("tabTitle");
      schema.description = t("description");
      schema.inLanguage = activeLang;
      schema.url = pageUrl;
      structuredData.textContent = JSON.stringify(schema);
    } catch (_) {}
  }
}

const siteMenuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");
const siteMenuWrap = document.querySelector(".menu-wrap");
const shareStatus = document.getElementById("shareStatus");

function closeSiteMenu({ restoreFocus = false } = {}) {
  if (siteMenu.classList.contains("hidden")) return;
  siteMenu.classList.add("hidden");
  siteMenuToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) siteMenuToggle.focus();
}

function showShareStatus(message) {
  clearTimeout(shareStatusTimer);
  shareStatus.textContent = message;
  shareStatus.classList.remove("hidden");
  shareStatusTimer = setTimeout(() => shareStatus.classList.add("hidden"), 2200);
}

async function copyShareUrl(url) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(url);
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

siteMenuToggle.addEventListener("click", () => {
  const willOpen = siteMenu.classList.contains("hidden");
  if (!willOpen) return closeSiteMenu();
  siteMenu.classList.remove("hidden");
  siteMenuToggle.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => siteMenu.querySelector("[role='menuitem']")?.focus());
});

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = { title: t("tabTitle"), text: t("shareText"), url: window.location.href };
  closeSiteMenu();
  try {
    if (typeof navigator.share === "function") await navigator.share(shareData);
    else {
      await copyShareUrl(shareData.url);
      showShareStatus(t("shareCopied"));
    }
  } catch (error) {
    if (error?.name !== "AbortError") showShareStatus(t("shareFailed"));
  }
});

document.addEventListener("click", event => {
  if (!siteMenuWrap.contains(event.target)) closeSiteMenu();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !siteMenu.classList.contains("hidden")) closeSiteMenu({ restoreFocus: true });
});

document.querySelectorAll("#languageSwitcher .language-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeLang = button.dataset.lang;
    safeStorageSet("animeScheduleLang", activeLang);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", activeLang);
    history.replaceState(null, "", nextUrl);
    updateStaticLanguage();
    renderUpdates();
  });
});

document.querySelectorAll("#updatesFilters button").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("#updatesFilters button").forEach(filterButton => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderUpdates();
  });
});

updateStaticLanguage();
renderUpdates();
