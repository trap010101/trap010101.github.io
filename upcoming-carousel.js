/* Manual cover flow. Schedule parsing/selection lives in schedule-utils.js. */
(() => {
  "use strict";
  const section = document.getElementById("upcoming");
  const S = window.AnimeSchedule;
  if (!section || !S) return;
  const stage = section.querySelector(".upcoming-stage");
  const previous = section.querySelector("[data-upcoming-prev]");
  const next = section.querySelector("[data-upcoming-next]");
  const position = section.querySelector(".upcoming-position");
  const announcement = section.querySelector(".upcoming-announcement");
  const data = window.allAnimeData || window.animeData || [];
  let entries = [], current = 0, timer, disposed = false, visible = true, gesture = null, suppressClickUntil = 0;
  const cards = new Map();
  const lang = () => document.documentElement.lang || "ko";
  const text = key => window.newAnimeHomepage.translate(key);
  const title = anime => anime.title[lang()] || anime.title.ko || anime.title.en || anime.id;
  const put = (node, value) => { if (node.textContent !== value) node.textContent = value; };
  const action = type => text(`upcoming${type === "tv" ? "Air" : type === "theatrical" ? "Open" : "Release"}`);
  function countdownText(entry, compact, now) {
    const c = S.countdown(entry.timing, now, compact);
    const today = text(`upcomingToday${entry.timing.premiere.type === "tv" ? "Air" : entry.timing.premiere.type === "theatrical" ? "Open" : "Release"}`);
    if (c.kind === "passed") return "";
    if (c.kind === "days") return `D-${c.days}`;
    if (c.kind === "today") return today;
    const duration = c.kind === "clock"
      ? [c.hours, c.minutes, c.seconds].map(n => String(n).padStart(2, "0")).join(":")
      : text("upcomingHours").replace("{h}", c.hours).replace("{m}", c.minutes);
    return duration;
  }
  function dateText(entry) {
    const p = entry.timing.premiere;
    const shown = S.presentation(entry.timing, lang());
    const clock = shown.time ? ` ${shown.time}` : "";
    const zone = shown.time && shown.timezone ? ` (${shown.timezone})` : "";
    const today = S.countdown(entry.timing, Date.now(), true).kind === "today";
    const release = today ? text(`upcomingToday${p.type === "tv" ? "Air" : p.type === "theatrical" ? "Open" : "Release"}`) : action(p.type);
    return `${shown.date}${clock}${zone} · ${release}`;
  }
  function createCard(entry) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "upcoming-slide";
    button.dataset.upcomingId = entry.anime.id;
    const poster = document.createElement("span");
    poster.className = "upcoming-poster";
    poster.setAttribute("aria-hidden", "true");
    const fallback = document.createElement("span");
    fallback.className = "upcoming-fallback";
    fallback.textContent = "?";
    poster.append(fallback);
    if (entry.anime.poster?.src) {
      const img = document.createElement("img");
      img.src = entry.anime.poster.src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.draggable = false;
      img.referrerPolicy = "no-referrer";
      img.style.objectPosition = entry.anime.poster.position || "center";
      img.addEventListener("error", () => img.remove(), { once: true });
      poster.append(img);
    }
    const body = document.createElement("span");
    body.className = "upcoming-body";
    for (const name of ["countdown", "title", "date"]) {
      const el = document.createElement("span");
      el.className = `upcoming-${name}`;
      if (name === "countdown") {
        el.id = `upcoming-countdown-${entry.anime.id}`;
        el.setAttribute("role", "timer"); el.setAttribute("aria-live", "off");
        button.setAttribute("aria-describedby", el.id);
      }
      body.append(el);
    }
    button.append(poster, body);
    button.addEventListener("click", event => {
      if (Date.now() < suppressClickUntil) { event.preventDefault(); return; }
      const index = entries.findIndex(e => e.anime.id === entry.anime.id);
      if (index !== current) { current = index; render(true); return; }
      window.newAnimeHomepage.revealAnime(entry.anime.id);
    });
    stage.append(button);
    return button;
  }
  function refreshSelection(now) {
    const focusedId = entries[current]?.anime.id;
    const selected = S.upcoming(data, now);
    const changed = selected.map(e => e.anime.id).join("|") !== entries.map(e => e.anime.id).join("|");
    entries = selected;
    current = Math.max(0, entries.findIndex(e => e.anime.id === focusedId));
    if (changed) {
      const ids = new Set(entries.map(e => e.anime.id));
      for (const [id, card] of cards) if (!ids.has(id)) {
        if (card.contains(document.activeElement)) {
          const target = entries.length > 1 ? next : entries.length ? section.querySelector("h2") : document.getElementById("menuToggle");
          target?.focus({ preventScroll: true });
        }
        card.remove(); cards.delete(id);
      }
      for (const entry of entries) if (!cards.has(entry.anime.id)) cards.set(entry.anime.id, createCard(entry));
    }
    section.hidden = !entries.length;
    previous.hidden = next.hidden = entries.length <= 1;
    previous.disabled = next.disabled = entries.length <= 1;
    return changed;
  }
  function updateCountdowns(now) {
    for (const { index, position: slot } of S.slots(current, entries.length)) {
      const entry = entries[index], card = cards.get(entry.anime.id);
      put(card.querySelector(".upcoming-countdown"), countdownText(entry, slot !== "center", now));
      put(card.querySelector(".upcoming-date"), dateText(entry));
      card.setAttribute("aria-label", `${title(entry.anime)}. ${dateText(entry)}. ${text(slot === "center" ? "upcomingView" : "upcomingSelect")}`);
    }
  }
  function render(announce = false) {
    const now = Date.now();
    const slotMap = new Map(S.slots(current, entries.length).map(slot => [slot.index, slot.position]));
    const hadCardFocus = stage.contains(document.activeElement);
    entries.forEach((entry, index) => {
      const card = cards.get(entry.anime.id), slot = slotMap.get(index) || "offstage";
      card.dataset.position = slot;
      card.tabIndex = slot === "center" ? 0 : -1;
      card.setAttribute("aria-hidden", String(slot === "offstage"));
      card.inert = slot === "offstage";
      put(card.querySelector(".upcoming-title"), title(entry.anime));
      put(card.querySelector(".upcoming-date"), dateText(entry));
      card.setAttribute("aria-label", `${title(entry.anime)}. ${dateText(entry)}. ${text(slot === "center" ? "upcomingView" : "upcomingSelect")}`);
    });
    put(section.querySelector("h2"), text("upcomingTitle"));
    previous.setAttribute("aria-label", text("upcomingPrevious"));
    next.setAttribute("aria-label", text("upcomingNext"));
    section.setAttribute("aria-roledescription", text("upcomingCarousel"));
    put(position, `${entries.length ? current + 1 : 0} / ${entries.length}`);
    updateCountdowns(now);
    if (announce && entries.length) put(announcement, `${current + 1} / ${entries.length}. ${title(entries[current].anime)}. ${dateText(entries[current])}`);
    if (hadCardFocus && entries.length) cards.get(entries[current].anime.id).focus({ preventScroll: true });
    planTick(now);
  }
  function planTick(now) {
    clearTimeout(timer);
    if (disposed || document.hidden) return;
    let delay = S.DAY, hasFuture = false;
    // Wake for future eligibility and expired entries, even while the section is empty/offscreen.
    for (const anime of data) {
      const timing = S.normalizePremiere(anime.schedule?.premiere);
      if (!timing || timing.expiresAt <= now) continue;
      hasFuture = true;
      for (const boundary of [timing.expiresAt, timing.sortTime - S.UPCOMING_WINDOW_DAYS * S.DAY]) {
        if (boundary > now) delay = Math.min(delay, boundary - now);
      }
      // Source-calendar midnight changes date-only D-N labels and eligibility.
      const tomorrow = new Date(S.civilDay(now, timing.premiere.timezone) + S.DAY).toISOString().slice(0, 10);
      const midnight = S.normalizePremiere({ type: "tv", date: tomorrow, time: "00:00", displayTime: "00:00", timezone: timing.premiere.timezone });
      if (midnight?.timestamp > now) delay = Math.min(delay, midnight.timestamp - now);
    }
    if (visible && entries[current]?.timing.exactTime) {
      const remaining = entries[current].timing.timestamp - now;
      delay = Math.min(delay, remaining <= 3600000 ? 1000 - now % 1000 : 60000 - now % 60000);
    }
    if (hasFuture) timer = setTimeout(tick, Math.max(20, Math.ceil(delay)));
  }
  function tick() {
    const now = Date.now();
    if (refreshSelection(now)) render();
    else { if (visible) updateCountdowns(now); planTick(now); }
  }
  function move(delta) {
    refreshSelection(Date.now());
    current = S.wrapIndex(current + delta, entries.length);
    render(true);
  }
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  document.addEventListener("keydown", event => {
    if (event.key === "Tab") section.classList.add("is-keyboard-nav");
  }, true);
  section.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !["ArrowLeft", "ArrowRight"].includes(event.key) || entries.length < 2) return;
    section.classList.add("is-keyboard-nav");
    event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
  });
  stage.addEventListener("pointerdown", event => {
    section.classList.remove("is-keyboard-nav");
    if (!event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  stage.addEventListener("pointermove", event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { gesture = null; return; }
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      stage.setPointerCapture(event.pointerId);
      suppressClickUntil = Date.now() + 500;
    }
  });
  stage.addEventListener("pointerup", event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClickUntil = Date.now() + 500;
      move(dx < 0 ? 1 : -1);
    }
  });
  stage.addEventListener("pointercancel", () => { gesture = null; });
  stage.addEventListener("lostpointercapture", () => { gesture = null; });
  document.addEventListener("newanime:language", () => render(true));
  document.addEventListener("visibilitychange", tick);
  window.addEventListener("pagehide", () => { disposed = true; clearTimeout(timer); });
  window.addEventListener("pageshow", () => { disposed = false; tick(); });
  if ("IntersectionObserver" in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) tick(); else planTick(Date.now());
  }).observe(section);
  refreshSelection(Date.now());
  render();
})();
