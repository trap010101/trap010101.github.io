// Upcoming titles are not treated as currently streamable.
// The Streaming button is reserved for verified catch-up links to earlier installments.
(() => {
  if (!Array.isArray(window.animeData)) return;

  window.animeData.forEach(anime => {
    const previousStreaming = anime?.previousStreaming && typeof anime.previousStreaming === "object"
      ? anime.previousStreaming
      : {};

    // Never expose links as streaming destinations for the upcoming installment.
    anime.currentStreaming = {};
    anime.streaming = { ...previousStreaming };

    if (anime.links) {
      anime.links.streaming = null;
    }
  });
})();
