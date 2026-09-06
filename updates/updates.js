const siteChangelog = Array.isArray(window.siteChangelog) ? window.siteChangelog : [];

const locales = {
  ko: {
    tabTitle: "최근 업데이트 - NewAnime",
    description: "NewAnime 공개 이후의 주요 기능 개선과 애니메이션 정보 변경 사항을 검수해 날짜별로 요약한 업데이트 기록입니다.",
    heading: "최근 업데이트",
    headingDescription: "사이트 공개 이후의 주요 변경 사항을 작업 기록과 최종 결과를 대조해 날짜별로 정리합니다.",
    kicker: "newani.me",
    languageLabel: "언어 선택",
    menu: "메뉴",
    menuUpdates: "업데이트",
    menuContact: "문의",
    menuShare: "공유",
    shareText: "NewAnime의 전체 업데이트 기록을 확인하세요.",
    shareCopied: "링크를 복사했습니다.",
    shareFailed: "공유 기능을 사용할 수 없습니다.",
    footerDescription: "방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.",
    empty: "표시할 업데이트 기록이 없습니다."
  },
  ja: {
    tabTitle: "最近の更新 - NewAnime",
    description: "NewAnime公開以降の主な機能改善とアニメ情報の変更を確認し、日付ごとにまとめた更新履歴です。",
    heading: "最近の更新",
    headingDescription: "サイト公開以降の主な変更を、作業履歴と最終結果を照合して日付ごとに整理しています。",
    kicker: "newani.me",
    languageLabel: "言語を選択",
    menu: "メニュー",
    menuUpdates: "更新",
    menuContact: "お問い合わせ",
    menuShare: "共有",
    shareText: "NewAnimeの更新履歴を確認できます。",
    shareCopied: "リンクをコピーしました。",
    shareFailed: "共有機能を利用できません。",
    footerDescription: "放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。",
    empty: "表示する更新履歴はありません。"
  },
  en: {
    tabTitle: "Recent Updates - NewAnime",
    description: "A reviewed, date-by-date history of notable NewAnime feature improvements and anime information changes since launch.",
    heading: "Recent Updates",
    headingDescription: "Major changes since launch, reviewed against work history and final site results and summarized by date.",
    kicker: "newani.me",
    languageLabel: "Select language",
    menu: "Menu",
    menuUpdates: "UPDATES",
    menuContact: "CONTACT",
    menuShare: "SHARE",
    shareText: "See NewAnime's full update history.",
    shareCopied: "Link copied.",
    shareFailed: "Sharing is unavailable.",
    footerDescription: "Browse release dates, PVs, official sites, and streaming information for upcoming anime and films.",
    empty: "There is no update history to show."
  }
};

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

function local(value) {
  if (typeof value === "string") return value;
  return value?.[activeLang] || value?.ko || value?.ja || value?.en || "";
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

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return value || "";
  if (activeLang === "ko" || activeLang === "ja") return `${match[1]}.${match[2]}.${match[3]}`;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

function localizedHref(href) {
  if (!href || !href.startsWith("/")) return href || "";
  const url = new URL(href, window.location.origin);
  url.searchParams.set("lang", activeLang);
  return `${url.pathname}${url.search}${url.hash}`;
}

function renderEntry(entry) {
  const title = local(entry.title);
  const titleMarkup = entry.href
    ? `<a class="changelog-entry-title changelog-anime-link" href="${escapeAttr(localizedHref(entry.href))}">${escapeHtml(title)}</a>`
    : `<strong class="changelog-entry-title">${escapeHtml(title)}</strong>`;
  const sourceMarkup = entry.source?.url
    ? `<div class="changelog-entry-meta"><a class="changelog-source" href="${escapeAttr(entry.source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(local(entry.source.label))} <span aria-hidden="true">↗</span></a></div>`
    : "";
  return `
    <li class="changelog-entry" id="${escapeAttr(entry.id)}" data-update-id="${escapeAttr(entry.id)}">
      ${titleMarkup}
      <p>${escapeHtml(local(entry.summary))}</p>
      ${sourceMarkup}
    </li>`;
}

function renderGroup(date, group) {
  const groupId = `group-${date}-${group.id}`;
  return `
    <section class="changelog-group" aria-labelledby="${escapeAttr(groupId)}">
      <h3 id="${escapeAttr(groupId)}">${escapeHtml(local(group.title))}</h3>
      <ul class="changelog-entries">${(group.entries || []).map(renderEntry).join("")}</ul>
    </section>`;
}

function renderUpdates() {
  const list = document.getElementById("updatesList");
  const empty = document.getElementById("updatesEmpty");
  if (!list || !empty) return;

  list.innerHTML = siteChangelog.map(day => `
    <section class="changelog-day" aria-labelledby="date-${escapeAttr(day.date)}">
      <div class="changelog-day-header">
        <h2 id="date-${escapeAttr(day.date)}"><time datetime="${escapeAttr(day.date)}">${escapeHtml(formatDate(day.date))}</time></h2>
      </div>
      <div class="changelog-groups">${(day.groups || []).map(group => renderGroup(day.date, group)).join("")}</div>
    </section>`).join("");

  empty.classList.toggle("hidden", siteChangelog.length > 0);
  updateStructuredData();
}

function flattenEntries() {
  return siteChangelog.flatMap(day => (day.groups || []).flatMap(group => (group.entries || []).map(entry => ({ ...entry, date: day.date }))));
}

function updateStructuredData() {
  const structuredData = document.getElementById("updatesStructuredData");
  if (!structuredData) return;
  const pageUrl = `https://newani.me/updates/?lang=${activeLang}`;
  const entries = flattenEntries();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("tabTitle"),
    url: pageUrl,
    description: t("description"),
    inLanguage: activeLang,
    dateModified: siteChangelog[0]?.date || "2026-09-06",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: local(entry.title),
          description: local(entry.summary),
          url: `${pageUrl}#${entry.id}`
        }
      }))
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
  document.getElementById("languageSwitcher").setAttribute("aria-label", t("languageLabel"));
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
}

const siteMenuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");
const siteMenuWrap = document.querySelector(".menu-wrap");
const shareStatus = document.getElementById("shareStatus");

function closeSiteMenu({ restoreFocus = false } = {}) {
  if (!siteMenu || siteMenu.classList.contains("hidden")) return;
  siteMenu.classList.add("hidden");
  siteMenuToggle?.setAttribute("aria-expanded", "false");
  if (restoreFocus) siteMenuToggle?.focus();
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
