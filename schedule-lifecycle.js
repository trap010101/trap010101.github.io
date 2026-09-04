// Upcoming-title lifecycle for the homepage.
// Exact Japanese release dates are the primary schedule source; global/Korean releases are fallbacks.
(() => {
  if (!Array.isArray(window.animeData)) return;

  function primaryRelease(anime) {
    return anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
  }

  function exactDateKey(release) {
    if (!release || release.status !== "date" || !release.year || !release.month || !release.day) return null;
    return release.year * 10000 + release.month * 100 + release.day;
  }

  function japanTodayKey() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    const value = type => Number(parts.find(part => part.type === type)?.value || 0);
    return value("year") * 10000 + value("month") * 100 + value("day");
  }

  const todayKey = japanTodayKey();
  const completeAnimeData = window.animeData;
  window.allAnimeData = completeAnimeData;

  const startsToday = completeAnimeData.filter(anime => exactDateKey(primaryRelease(anime)) === todayKey);

  // Exact-date titles remain visible throughout their start date and disappear from the
  // upcoming homepage from the next Japan-calendar day. The source data itself is preserved.
  window.animeData = completeAnimeData.filter(anime => {
    const key = exactDateKey(primaryRelease(anime));
    return key === null || key >= todayKey;
  });

  function activeLanguage() {
    const lang = document.documentElement.lang?.toLowerCase() || "ko";
    if (lang.startsWith("ja")) return "ja";
    if (lang.startsWith("en")) return "en";
    return "ko";
  }

  function findTodayAnimeByRenderedTitle(title) {
    return startsToday.find(anime => Object.values(anime.title || {}).some(value => value === title));
  }

  function addTodayBadges() {
    const lang = activeLanguage();
    document.querySelectorAll("#schedule .card").forEach(card => {
      if (card.querySelector(".starts-today")) return;
      const titleElement = card.querySelector(".title");
      const meta = card.querySelector(".meta");
      if (!titleElement || !meta) return;

      const anime = findTodayAnimeByRenderedTitle(titleElement.textContent.trim());
      if (!anime) return;

      const movie = anime.format === "movie";
      const labels = {
        ko: movie ? "오늘 상영 시작" : "오늘 방영 시작",
        ja: movie ? "本日公開" : "本日放送開始",
        en: movie ? "Opens today" : "Starts today"
      };

      const badge = document.createElement("span");
      badge.className = "badge major starts-today";
      badge.textContent = labels[lang];
      meta.prepend(badge);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    addTodayBadges();
    const schedule = document.getElementById("schedule");
    if (!schedule) return;
    new MutationObserver(addTodayBadges).observe(schedule, { childList: true, subtree: true });
  });
})();
