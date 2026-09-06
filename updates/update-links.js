// Keeps update titles linked to the static anime detail pages after client-side filtering/rerendering.
(() => {
  if (!Array.isArray(window.animeUpdates) || !Array.isArray(window.animeData)) return;

  const animeById = new Map(window.animeData.map(anime => [anime?.id, anime]).filter(([id]) => Boolean(id)));
  const updateAnimeId = new Map(window.animeUpdates.map(update => [update?.id, update?.animeId]).filter(([id, animeId]) => Boolean(id && animeId)));

  const activeLanguage = () => {
    const value = document.documentElement.lang?.toLowerCase() || 'ko';
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  function linkEntries(root = document) {
    root.querySelectorAll('.update-item[data-update-id]').forEach(item => {
      const updateId = item.dataset.updateId;
      const animeId = updateAnimeId.get(updateId);
      const anime = animeById.get(animeId);
      if (!animeId || !anime?.release) return;

      const title = item.querySelector('.update-title-row h3');
      if (!title || title.querySelector('.update-anime-link')) return;

      const text = title.textContent.trim();
      if (!text) return;

      const link = document.createElement('a');
      link.className = 'update-anime-link';
      link.href = `/anime/${encodeURIComponent(animeId)}/?lang=${activeLanguage()}`;
      link.textContent = text;
      link.setAttribute('aria-label', `${text} 상세 정보`);
      title.textContent = '';
      title.appendChild(link);
    });
  }

  const list = document.getElementById('updatesList');
  linkEntries(list || document);

  if (list) {
    new MutationObserver(() => linkEntries(list)).observe(list, { childList: true, subtree: true });
  }
})();
