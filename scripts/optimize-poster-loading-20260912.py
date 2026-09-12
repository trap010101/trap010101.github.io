from pathlib import Path

app = Path('app.js')
text = app.read_text(encoding='utf-8')

marker = 'function posterMarkup(anime) {'
if marker not in text:
    raise SystemExit('posterMarkup marker missing')

loader = r'''const posterLoader = (() => {
  const queue = [];
  const queued = new WeakMap();
  let active = 0;
  let sequence = 0;
  let observer = null;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const effectiveType = String(connection?.effectiveType || "");
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  const maxConcurrent = connection?.saveData || /(?:^|-)2g$/.test(effectiveType)
    ? 2
    : isMobile || effectiveType === "3g"
      ? 3
      : 5;
  const rootMargin = connection?.saveData ? "320px 0px" : isMobile ? "720px 0px" : "1100px 0px";
  const priorityRank = { high: 0, auto: 1, low: 2 };

  function sortQueue() {
    queue.sort((a, b) =>
      (priorityRank[a.priority] ?? 1) - (priorityRank[b.priority] ?? 1) ||
      a.order - b.order
    );
  }

  function finish(img, ok) {
    active = Math.max(0, active - 1);
    if (ok) {
      img.dataset.posterState = "loaded";
      img.style.removeProperty("visibility");
      img.closest(".poster-frame")?.classList.add("poster-loaded");
    } else {
      img.dataset.posterState = "error";
      img.closest(".poster-frame")?.classList.add("poster-error");
      img.remove();
    }
    pump();
  }

  function start(item) {
    const { img, src, priority } = item;
    queued.delete(img);
    if (!img.isConnected || !src || img.dataset.posterState === "loaded") return;

    active += 1;
    img.dataset.posterState = "loading";
    img.loading = "eager";
    try { img.fetchPriority = priority; } catch (_) {}

    img.addEventListener("load", () => finish(img, true), { once: true });
    img.addEventListener("error", () => finish(img, false), { once: true });
    img.src = src;
  }

  function pump() {
    while (active < maxConcurrent && queue.length) {
      sortQueue();
      const item = queue.shift();
      if (!item?.img?.isConnected || item.img.dataset.posterState === "loaded") {
        if (item?.img) queued.delete(item.img);
        continue;
      }
      start(item);
    }
  }

  function request(img, src = img?.dataset?.posterSrc, priority = "auto", order = null) {
    if (!img || !src) return;
    const state = img.dataset.posterState;
    if (state === "loaded" || state === "error") return;

    img.dataset.posterSrc = src;
    if (!img.style.visibility) img.style.visibility = "hidden";

    if (state === "loading") {
      if (priority === "high") {
        try { img.fetchPriority = "high"; } catch (_) {}
      }
      return;
    }

    const existing = queued.get(img);
    const nextOrder = Number.isFinite(order) ? order : sequence++;
    if (existing) {
      if ((priorityRank[priority] ?? 1) < (priorityRank[existing.priority] ?? 1)) existing.priority = priority;
      existing.order = Math.min(existing.order, nextOrder);
      sortQueue();
      pump();
      return;
    }

    img.dataset.posterState = "queued";
    const item = { img, src, priority, order: nextOrder };
    queued.set(img, item);
    queue.push(item);
    sortQueue();
    pump();
  }

  function ensureObserver() {
    if (observer || !("IntersectionObserver" in window)) return observer;
    observer = new IntersectionObserver(entries => {
      const candidates = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top ||
          a.boundingClientRect.left - b.boundingClientRect.left
        );

      candidates.forEach((entry, index) => {
        const img = entry.target;
        const rect = entry.boundingClientRect;
        const inViewport = rect.bottom >= -80 && rect.top <= window.innerHeight + 80;
        request(img, img.dataset.posterSrc, inViewport ? "high" : "auto", index);
        observer.unobserve(img);
      });
    }, { rootMargin, threshold: 0.01 });
    return observer;
  }

  function observe(root = document) {
    const images = [...root.querySelectorAll('img[data-poster-src]')]
      .filter(img => !["loaded", "loading", "error"].includes(img.dataset.posterState));
    if (!images.length) return;

    const io = ensureObserver();
    if (!io) {
      images.forEach((img, index) => request(img, img.dataset.posterSrc, index < 4 ? "high" : "low", index));
      return;
    }
    images.forEach(img => io.observe(img));
  }

  return { request, observe };
})();

window.NewAnimePosterLoader = posterLoader;

function initPosterLoading() {
  posterLoader.observe(scheduleEl);
  const undatedContent = document.getElementById("undatedContent");
  if (undatedSection && undatedContent && !undatedSection.classList.contains("hidden") && !undatedContent.classList.contains("hidden")) {
    posterLoader.observe(undatedSection);
  }
}

'''
if 'window.NewAnimePosterLoader = posterLoader;' not in text:
    text = text.replace(marker, loader + marker, 1)

old_poster = '''      <img
        src="${anime.poster.src}"
        alt="${localTitle(anime)}"
        style="object-position: ${anime.poster.position || "center center"}"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        referrerpolicy="no-referrer"
        onerror="this.closest('.poster-frame').classList.add('poster-error')"
      >'''
new_poster = '''      <img
        data-poster-src="${anime.poster.src}"
        data-poster-state="pending"
        alt=""
        style="object-position: ${anime.poster.position || "center center"}; visibility: hidden"
        decoding="async"
        fetchpriority="low"
        referrerpolicy="no-referrer"
      >'''
if old_poster not in text:
    raise SystemExit('old poster image markup missing')
text = text.replace(old_poster, new_poster, 1)

old_render_tail = '''  renderUndated();
  updateTitleScrolls();
}'''
new_render_tail = '''  renderUndated();
  initPosterLoading();
  updateTitleScrolls();
}'''
if old_render_tail not in text:
    raise SystemExit('render tail missing')
text = text.replace(old_render_tail, new_render_tail, 1)

old_undated = '''  if (!content.classList.contains("hidden")) updateTitleScrolls();'''
new_undated = '''  if (!content.classList.contains("hidden")) {
    initPosterLoading();
    updateTitleScrolls();
  }'''
if old_undated not in text:
    raise SystemExit('undated toggle marker missing')
text = text.replace(old_undated, new_undated, 1)

old_reveal = '''      const card = document.getElementById(`anime-${id}`);
      if (!card) return;'''
new_reveal = '''      const card = document.getElementById(`anime-${id}`);
      if (!card) return;
      const poster = card.querySelector("img[data-poster-src]");
      if (poster) posterLoader.request(poster, poster.dataset.posterSrc, "high", -1);'''
if old_reveal not in text:
    raise SystemExit('reveal marker missing')
text = text.replace(old_reveal, new_reveal, 1)
app.write_text(text, encoding='utf-8')

carousel = Path('upcoming-carousel.js')
text = carousel.read_text(encoding='utf-8')
old_img = '''      img.src = entry.anime.poster.src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.draggable = false;
      img.referrerPolicy = "no-referrer";
      img.style.objectPosition = entry.anime.poster.position || "center";
      img.addEventListener("error", () => img.remove(), { once: true });'''
new_img = '''      img.dataset.posterSrc = entry.anime.poster.src;
      img.dataset.posterState = "pending";
      img.alt = "";
      img.decoding = "async";
      img.draggable = false;
      img.referrerPolicy = "no-referrer";
      img.style.objectPosition = entry.anime.poster.position || "center";
      img.style.visibility = "hidden";'''
if old_img not in text:
    raise SystemExit('carousel image marker missing')
text = text.replace(old_img, new_img, 1)

helper_marker = '  function refreshSelection(now) {'
helper = r'''  function requestCardPoster(card, priority = "auto") {
    const img = card?.querySelector("img[data-poster-src]");
    if (!img || !img.dataset.posterSrc) return;
    if (window.NewAnimePosterLoader?.request) {
      window.NewAnimePosterLoader.request(img, img.dataset.posterSrc, priority, priority === "high" ? -100 : -50);
      return;
    }
    if (img.dataset.posterState === "loaded" || img.dataset.posterState === "loading") return;
    img.dataset.posterState = "loading";
    img.loading = "eager";
    try { img.fetchPriority = priority; } catch (_) {}
    img.addEventListener("load", () => {
      img.dataset.posterState = "loaded";
      img.style.removeProperty("visibility");
    }, { once: true });
    img.addEventListener("error", () => img.remove(), { once: true });
    img.src = img.dataset.posterSrc;
  }
'''
if helper_marker not in text:
    raise SystemExit('carousel helper insertion marker missing')
if 'function requestCardPoster' not in text:
    text = text.replace(helper_marker, helper + helper_marker, 1)

old_slot = '''      card.dataset.position = slot;
      card.tabIndex = slot === "center" ? 0 : -1;'''
new_slot = '''      card.dataset.position = slot;
      if (slot === "center") requestCardPoster(card, "high");
      else if (slot === "left" || slot === "right") requestCardPoster(card, "auto");
      card.tabIndex = slot === "center" ? 0 : -1;'''
if old_slot not in text:
    raise SystemExit('carousel slot marker missing')
text = text.replace(old_slot, new_slot, 1)
carousel.write_text(text, encoding='utf-8')

index = Path('index.html')
text = index.read_text(encoding='utf-8')
text = text.replace('app.js?v=20260912-perf1', 'app.js?v=20260912-posterload1')
text = text.replace('upcoming-carousel.js?v=20260907-upcoming6', 'upcoming-carousel.js?v=20260912-posterload1')
index.write_text(text, encoding='utf-8')
