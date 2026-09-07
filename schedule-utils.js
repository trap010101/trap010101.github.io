// Deterministic premiere calculations shared by the homepage and Node validation.
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.AnimeSchedule = api;
})(typeof window === "object" ? window : globalThis, function () {
  "use strict";
  const DAY = 86400000;
  const UPCOMING_WINDOW_DAYS = 30;
  const TYPES = new Set(["tv", "streaming", "theatrical", "ova", "special"]);
  const formatters = new Map();
  function dateParts(date) {
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    const [y, m, d] = date.split("-").map(Number);
    const ms = Date.UTC(y, m - 1, d);
    const check = new Date(ms);
    return y >= 1900 && check.getUTCFullYear() === y && check.getUTCMonth() === m - 1 && check.getUTCDate() === d ? { y, m, d, ms } : null;
  }
  function zonedParts(ms, timezone) {
    if (!formatters.has(timezone)) formatters.set(timezone, new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
    }));
    return Object.fromEntries(formatters.get(timezone).formatToParts(ms).filter(p => p.type !== "literal").map(p => [p.type, Number(p.value)]));
  }
  function civilDay(ms, timezone) {
    const p = zonedParts(ms, timezone);
    return Date.UTC(p.year, p.month - 1, p.day);
  }
  function wallTimeToInstant(wall, timezone) {
    // Fixed offsets for the project's current schedule territories, independent of viewer timezone.
    if (["Asia/Tokyo", "Asia/Seoul"].includes(timezone)) return wall - 9 * 3600000;
    if (timezone === "UTC") return wall;
    // IANA extension: accept only an unambiguous real wall time (reject DST gaps/folds).
    const offsets = new Set();
    for (const shift of [-DAY, 0, DAY]) {
      const sample = wall + shift;
      const p = zonedParts(sample, timezone);
      offsets.add(Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - sample);
    }
    const candidates = [...offsets].map(offset => wall - offset).filter(ms => {
      const p = zonedParts(ms, timezone);
      return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) === wall;
    });
    return candidates.length === 1 ? candidates[0] : null;
  }
  function normalizePremiere(premiere) {
    if (!premiere || !TYPES.has(premiere.type) || typeof premiere.timezone !== "string" || !premiere.timezone) return null;
    const parts = dateParts(premiere.date);
    if (!parts) return null;
    const timed = premiere.time !== null;
    if (timed && (typeof premiere.time !== "string" || !/^[0-4]\d:[0-5]\d$/.test(premiere.time))) return null;
    if (premiere.type === "theatrical" && (premiere.time !== "00:00" || premiere.displayTime !== null)) return null;
    if (!timed && premiere.displayTime != null) return null;
    try {
      const [hour, minute] = timed ? premiere.time.split(":").map(Number) : [0, 0];
      const start = wallTimeToInstant(parts.ms, premiere.timezone);
      const end = wallTimeToInstant(parts.ms + DAY, premiere.timezone);
      const timestamp = timed ? wallTimeToInstant(parts.ms + (hour * 60 + minute) * 60000, premiere.timezone) : null;
      if (start === null || end === null || (timed && timestamp === null)) return null;
      return { premiere, timestamp, start, end, sortTime: timestamp ?? start,
        exactTime: timed && premiere.type !== "theatrical", expiresAt: timestamp ?? end };
    } catch (_) { return null; }
  }
  function upcoming(anime, now = Date.now(), days = UPCOMING_WINDOW_DAYS) {
    if (!Number.isFinite(now) || !Number.isFinite(days) || days < 0) return [];
    return anime.map(item => ({ anime: item, timing: normalizePremiere(item.schedule?.premiere) }))
      .filter(({ anime: item, timing }) => timing && !["cancelled", "released"].includes(item.productionStatus) &&
        timing.expiresAt > now && (timing.timestamp !== null
          ? timing.timestamp <= now + days * DAY
          : dateParts(timing.premiere.date).ms <= civilDay(now, timing.premiere.timezone) + days * DAY))
      .sort((a, b) => a.timing.sortTime - b.timing.sortTime || a.anime.id.localeCompare(b.anime.id));
  }
  function countdown(timing, now = Date.now(), compact = false) {
    if (!timing || timing.expiresAt <= now) return { kind: "passed" };
    const p = timing.premiere;
    const releaseDay = timing.timestamp === null ? dateParts(p.date).ms : civilDay(timing.timestamp, p.timezone);
    const days = Math.max(0, Math.round((releaseDay - civilDay(now, p.timezone)) / DAY));
    if (!timing.exactTime || compact) return { kind: days === 0 ? "today" : "days", days };
    const seconds = Math.max(1, Math.ceil((timing.timestamp - now) / 1000));
    if (seconds > 86400) return { kind: "days", days };
    return { kind: seconds <= 3600 ? "clock" : "hours", today: days === 0,
      hours: Math.floor(seconds / 3600), minutes: Math.floor(seconds % 3600 / 60), seconds: seconds % 60 };
  }
  function dateLabel(p, lang = "ko") {
    const date = dateParts(p.date);
    if (!date) return "";
    return new Intl.DateTimeFormat({ ko: "ko-KR", ja: "ja-JP", en: "en-US" }[lang] || "en-US", {
      timeZone: "UTC", year: "numeric", month: "short", day: "numeric"
    }).format(date.ms);
  }
  function wrapIndex(index, total) { return total > 0 ? (index % total + total) % total : 0; }
  function slots(index, total) {
    if (!total) return [];
    const center = wrapIndex(index, total);
    if (total === 1) return [{ index: center, position: "center" }];
    if (total === 2) return [{ index: center, position: "center" }, { index: wrapIndex(center + 1, total), position: "right" }];
    return [{ index: wrapIndex(center - 1, total), position: "left" }, { index: center, position: "center" }, { index: wrapIndex(center + 1, total), position: "right" }];
  }
  return { DAY, UPCOMING_WINDOW_DAYS, dateParts, civilDay, normalizePremiere, upcoming, countdown, dateLabel, wrapIndex, slots };
});
