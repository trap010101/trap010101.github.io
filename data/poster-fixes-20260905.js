// Poster asset corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const anime = window.animeData.find(item => item.id === "me-and-big-bro-yuu");
  if (!anime) return;

  anime.poster = {
    ...anime.poster,
    src: "assets/posters/me-and-big-bro-yuu-v2.webp"
  };
  anime.updatedAt = "2026-09-05";
})();
