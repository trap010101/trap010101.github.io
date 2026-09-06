const animeData = Array.isArray(window.animeData) ? window.animeData : [];
const animeUpdates = Array.isArray(window.animeUpdates) ? window.animeUpdates : [];
const animeById = new Map(animeData.map(anime => [anime?.id, anime]).filter(([id]) => id));

const locales = {
  ko: {
    tabTitle: "최근 업데이트 - NewAnime",
    description: "NewAnime에 반영된 주요 기능 개선과 애니메이션 정보 변경 사항을 날짜별로 확인하세요.",
    heading: "최근 업데이트",
    headingDescription: "사용자에게 영향을 주는 주요 변경 사항만 날짜별로 정리합니다.",
    kicker: "newani.me",
    languageLabel: "언어 선택",
    menu: "메뉴",
    menuUpdates: "업데이트",
    menuContact: "문의",
    menuShare: "공유",
    shareText: "NewAnime의 최근 주요 업데이트를 확인하세요.",
    shareCopied: "링크를 복사했습니다.",
    shareFailed: "공유 기능을 사용할 수 없습니다.",
    footerDescription: "방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.",
    empty: "표시할 주요 업데이트가 없습니다.",
    sourceAction: "출처 보기",
    sourceOfficialSite: "공식 사이트",
    sourceOfficialX: "공식 X 발표",
    sourceOfficialYoutube: "공식 YouTube",
    sourceStreamingPlatform: "스트리밍 서비스",
    sourcePublisher: "출판사",
    sourceStudio: "제작사",
    sourceNews: "공식 뉴스",
    sourceDistributor: "배급사",
    sourceOther: "출처",
    groupAdded: "신규 작품",
    groupRelease: "방영 정보",
    groupStreaming: "스트리밍",
    groupContent: "작품 정보",
    groupSite: "사이트 개선"
  },
  ja: {
    tabTitle: "最近の更新 - NewAnime",
    description: "NewAnimeに反映された主な機能改善とアニメ情報の変更を日付ごとに確認できます。",
    heading: "最近の更新",
    headingDescription: "利用者に影響する主な変更のみを日付ごとにまとめています。",
    kicker: "newani.me",
    languageLabel: "言語を選択",
    menu: "メニュー",
    menuUpdates: "更新",
    menuContact: "お問い合わせ",
    menuShare: "共有",
    shareText: "NewAnimeの最近の主な更新内容を確認できます。",
    shareCopied: "リンクをコピーしました。",
    shareFailed: "共有機能を利用できません。",
    footerDescription: "放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。",
    empty: "表示する主な更新はありません。",
    sourceAction: "情報源を見る",
    sourceOfficialSite: "公式サイト",
    sourceOfficialX: "公式X発表",
    sourceOfficialYoutube: "公式YouTube",
    sourceStreamingPlatform: "配信サービス",
    sourcePublisher: "出版社",
    sourceStudio: "制作会社",
    sourceNews: "公式ニュース",
    sourceDistributor: "配給会社",
    sourceOther: "情報源",
    groupAdded: "新規作品",
    groupRelease: "放送・公開情報",
    groupStreaming: "配信",
    groupContent: "作品情報",
    groupSite: "サイト改善"
  },
  en: {
    tabTitle: "Recent Updates - NewAnime",
    description: "See notable NewAnime feature improvements and anime information changes grouped by date.",
    heading: "Recent Updates",
    headingDescription: "Only notable changes that affect visitors are summarized by date.",
    kicker: "newani.me",
    languageLabel: "Select language",
    menu: "Menu",
    menuUpdates: "UPDATES",
    menuContact: "CONTACT",
    menuShare: "SHARE",
    shareText: "See the latest notable updates on NewAnime.",
    shareCopied: "Link copied.",
    shareFailed: "Sharing is unavailable.",
    footerDescription: "Browse release dates, PVs, official sites, and streaming information for upcoming anime and films.",
    empty: "There are no notable updates to show.",
    sourceAction: "View source",
    sourceOfficialSite: "Official website",
    sourceOfficialX: "Official X announcement",
    sourceOfficialYoutube: "Official YouTube",
    sourceStreamingPlatform: "Streaming service",
    sourcePublisher: "Publisher",
    sourceStudio: "Studio",
    sourceNews: "Official news",
    sourceDistributor: "Distributor",
    sourceOther: "Source",
    groupAdded: "New titles",
    groupRelease: "Release information",
    groupStreaming: "Streaming",
    groupContent: "Title information",
    groupSite: "Site improvements"
  }
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

const groupLabels = {
  added: "groupAdded",
  release: "groupRelease",
  streaming: "groupStreaming",
  content: "groupContent",
  site: "groupSite"
};

const groupOrder = ["added", "release", "streaming", "content", "site"];
const supportedLanguages = ["ko", "ja", "en"];
let shareStatusTimer;

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

const requestedLang = new URLSearchParams(window.location.search).get("lang");
const savedLang = safeStorageGet("animeScheduleLang");
let activeLang = supportedLanguages.includes(requestedLang)
  ? requestedLang
  : supportedLanguages.includes(savedLang)
    ? savedLang
    : detectPreferredLanguage();

function t(key) {
  return locales[activeLang]?.[key] ?? locales.ko[key] ?? key;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function localTitle(anime) {
  return anime?.title?.[activeLang] || anime?.title?.ko || anime?.title?.ja || anime?.title?.en || "";
}

function localSummary(update) {
  return update?.summary?.[activeLang] || update?.summary?.ko || update?.summary?.ja || update?.summary?.en || "";
}

function isSiteUpdate(update) {
  return String(update?.animeId || "").startsWith("site-update-");
}

function isMeaningfulUpdate(update) {
  if (!update?.id || !update?.animeId || !update?.changedAt || !animeById.has(update.animeId)) return false;
  if (update.type === "format") return false;
  if (update.type === "source" && !isSiteUpdate(update)) return false;
  if (String(update.id).includes("release-region")) return false;
  return Boolean(localSummary(update));
}

function updateGroup(update) {
  if (update.type === "anime-added") return "added";
  if (["release-window", "release-date", "release-delay", "release-cancelled"].includes(update.type)) return "release";
  if (["streaming-added", "streaming-removed", "streaming-updated"].includes(update.type)) return "streaming";
  if (["pv", "poster", "title", "official-link", "source"].includes(update.type)) return "content";
  return isSiteUpdate(update) ? "site" : "content";
}

function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  return { year: match[1], month: match[2], day: match[3] };
}

function formatDate(value) {
  const parts = parseIsoDate(value);
  if (!parts) return value || "";
  if (activeLang === "ko" || activeLang === "ja") return `${parts.year}.${parts.month}.${parts.day}`;
  const date = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), 12));
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

function sourceMarkup(update) {
  if (!update.source?.url) return "";
  const sourceLabel = t(sourceTypeLabels[update.source?.type] || "sourceOther");
  return `<a class="changelog-source" href="${escapeAttr(update.source.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttr(t("sourceAction"))}: ${escapeAttr(sourceLabel)}">${escapeHtml(sourceLabel)} <span aria-hidden="true">↗</span></a>`;
}

function titleMarkup(update, anime) {
  const title = localTitle(anime);
  if (!title) return "";
  if (isSiteUpdate(update)) return `<strong class="changelog-entry-title">${escapeHtml(title)}</strong>`;
  const href = `/anime/${encodeURIComponent(update.animeId)}/?lang=${activeLang}`;
  return `<a class="changelog-entry-title changelog-anime-link" href="${href}">${escapeHtml(title)}</a>`;
}

function renderEntry(update) {
  const anime = animeById.get(update.animeId);
  if (!anime) return "";
  const source = sourceMarkup(update);
  return `
    <li class="changelog-entry" id="${escapeAttr(update.id)}" data-update-id="${escapeAttr(update.id)}">
      ${titleMarkup(update, anime)}
      <p>${escapeHtml(localSummary(update))}</p>
      ${source ? `<div class="changelog-entry-meta">${source}</div>` : ""}
    </li>`;
}

function buildTimeline() {
  const meaningful = animeUpdates
    .map((update, index) => ({ update, index }))
    .filter(({ update }) => isMeaningfulUpdate(update))
    .sort((a, b) => b.update.changedAt.localeCompare(a.update.changedAt) || a.index - b.index)
    .map(({ update }) => update);

  const byDate = new Map();
  meaningful.forEach(update => {
    if (!byDate.has(update.changedAt)) byDate.set(update.changedAt, new Map());
    const byGroup = byDate.get(update.changedAt);
    const group = updateGroup(update);
    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group).push(update);
  });
  return { meaningful, byDate };
}

function renderUpdates() {
  const list = document.getElementById("updatesList");
  const empty = document.getElementById("updatesEmpty");
  if (!list || !empty) return;

  const { meaningful, byDate } = buildTimeline();
  const dateSections = [...byDate.entries()].map(([date, groups]) => {
    const groupSections = groupOrder
      .filter(group => groups.has(group))
      .map(group => `
        <section class="changelog-group" aria-labelledby="group-${escapeAttr(date)}-${group}">
          <h3 id="group-${escapeAttr(date)}-${group}">${escapeHtml(t(groupLabels[group]))}</h3>
          <ul class="changelog-entries">
            ${groups.get(group).map(renderEntry).join("")}
          </ul>
        </section>`)
      .join("");

    return `
      <section class="changelog-day" aria-labelledby="date-${escapeAttr(date)}">
        <div class="changelog-day-header">
          <h2 id="date-${escapeAttr(date)}"><time datetime="${escapeAttr(date)}">${escapeHtml(formatDate(date))}</time></h2>
        </div>
        <div class="changelog-groups">${groupSections}</div>
      </section>`;
  }).join("");

  list.innerHTML = dateSections;
  empty.classList.toggle("hidden", meaningful.length > 0);
  updateStructuredData(meaningful);
}

function updateStructuredData(updates) {
  const structuredData = document.getElementById("updatesStructuredData");
  if (!structuredData) return;
  const pageUrl = `https://newani.me/updates/?lang=${activeLang}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("tabTitle"),
    url: pageUrl,
    description: t("description"),
    inLanguage: activeLang,
    dateModified: updates[0]?.changedAt || "2026-09-06",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: updates.length,
      itemListElement: updates.map((update, index) => {
        const anime = animeById.get(update.animeId);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Thing",
            name: localTitle(anime),
            description: localSummary(update),
            url: `${pageUrl}#${update.id}`
          }
        };
      })
    }
  };
  structuredData.textContent = JSON.stringify(schema);
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
  document.getElementById("languageSwitcher")?.setAttribute("aria-label", t("languageLabel"));
  document.getElementById("menuToggle")?.setAttribute("aria-label", t("menu"));
  document.getElementById("menuToggle")?.setAttribute("title", t("menu"));
  document.getElementById("updatesMenuLabel").textContent = t("menuUpdates");
  document.getElementById("contactMenuLabel").textContent = t("menuContact");
  document.getElementById("shareMenuLabel").textContent = t("menuShare");
  document.getElementById("updatesMenuLink").href = `/updates/?lang=${activeLang}`;
  document.getElementById("homeLink").href = `/?lang=${activeLang}`;

  document.querySelectorAll("#languageSwitcher .language-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === activeLang);
  });
}

const siteMenuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");
const siteMenuWrap = document.querySelector(".menu-wrap");
const shareStatus = document.getElementById("shareStatus");

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

siteMenuToggle?.addEventListener("click", () => {
  if (!siteMenu) return;
  const willOpen = siteMenu.classList.contains("hidden");
  if (!willOpen) return closeSiteMenu();
  siteMenu.classList.remove("hidden");
  siteMenuToggle.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => siteMenu.querySelector("[role='menuitem']")?.focus());
});

document.getElementById("shareButton")?.addEventListener("click", async () => {
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
  if (siteMenuWrap && !siteMenuWrap.contains(event.target)) closeSiteMenu();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && siteMenu && !siteMenu.classList.contains("hidden")) closeSiteMenu({ restoreFocus: true });
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

updateStaticLanguage();
renderUpdates();
