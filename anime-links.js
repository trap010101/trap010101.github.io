// Adds crawlable internal links from homepage cards to generated anime detail pages.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const titleToId = new Map();
  const ambiguous = new Set();

  window.animeData.forEach(anime => {
    Object.values(anime.title || {}).filter(Boolean).forEach(title => {
      const key = String(title).trim();
      if (!key) return;
      if (titleToId.has(key) && titleToId.get(key) !== anime.id) ambiguous.add(key);
      else titleToId.set(key, anime.id);
    });
  });

  ambiguous.forEach(key => titleToId.delete(key));

  const activeLanguage = () => {
    const value = document.documentElement.lang?.toLowerCase() || 'ko';
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  function linkCards(root = document) {
    root.querySelectorAll('.card, .undated-item').forEach(card => {
      const titleEl = card.querySelector('.title, .undated-title');
      if (!titleEl || titleEl.querySelector('.anime-detail-title-link')) return;

      const title = titleEl.textContent.trim();
      const id = titleToId.get(title);
      if (!id) return;

      const link = document.createElement('a');
      link.className = 'anime-detail-title-link';
      link.href = `/anime/${encodeURIComponent(id)}/?lang=${activeLanguage()}`;
      link.textContent = title;
      link.setAttribute('aria-label', `${title} 상세 정보`);
      titleEl.textContent = '';
      titleEl.appendChild(link);
      card.dataset.animeId = id;
    });
  }

  function addScheduleArchiveLinks() {
    const footerNav = document.querySelector('.site-footer-links');
    if (!footerNav || footerNav.querySelector('[data-schedule-archive-link]')) return;

    const reference = footerNav.querySelector('a[href="/about/"]') || footerNav.firstElementChild;
    [2027, 2026].forEach(year => {
      const link = document.createElement('a');
      link.href = `/${year}/?lang=${activeLanguage()}`;
      link.textContent = String(year);
      link.dataset.scheduleArchiveLink = String(year);
      footerNav.insertBefore(link, reference || null);
    });
  }

  function updateScheduleArchiveLanguage() {
    document.querySelectorAll('[data-schedule-archive-link]').forEach(link => {
      const year = link.dataset.scheduleArchiveLink;
      link.href = `/${year}/?lang=${activeLanguage()}`;
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .anime-detail-title-link {
      color: inherit;
      text-decoration: none;
    }
    .anime-detail-title-link:hover,
    .anime-detail-title-link:focus-visible {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
    }
  `;
  document.head.appendChild(style);

  linkCards();
  addScheduleArchiveLinks();

  ['schedule', 'undatedList'].forEach(id => {
    const target = document.getElementById(id);
    if (!target) return;
    new MutationObserver(() => linkCards(target)).observe(target, { childList: true, subtree: true });
  });

  document.getElementById('languageSwitcher')?.addEventListener('click', () => {
    requestAnimationFrame(updateScheduleArchiveLanguage);
  });
})();
