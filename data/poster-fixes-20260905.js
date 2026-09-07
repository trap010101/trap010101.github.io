// Poster asset corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const fixes = {
    "me-and-big-bro-yuu": {
      src: "assets/posters/me-and-big-bro-yuu-v2.webp",
      updatedAt: "2026-09-05"
    },
    "magical-sisters-lulutto-lilly-part-2": {
      src: "assets/posters/magical-sisters-lulutto-lilly-part-2-cropped.svg",
      updatedAt: "2026-09-07"
    }
  };

  for (const anime of window.animeData) {
    const fix = fixes[anime.id];
    if (!fix) continue;
    anime.poster = { ...anime.poster, src: fix.src };
    anime.updatedAt = fix.updatedAt;
  }
})();
