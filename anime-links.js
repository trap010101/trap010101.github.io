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

  const detailCopy = {
    ko: { detail: '상세 정보', extraTags: n => `추가 태그 ${n}개` },
    ja: { detail: '詳細情報', extraTags: n => `追加タグ ${n}件` },
    en: { detail: 'details', extraTags: n => `${n} more tag${n === 1 ? '' : 's'}` }
  };

  const activeLanguage = () => {
    const value = document.documentElement.lang?.toLowerCase() || 'ko';
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  const activeYear = () => {
    const value = document.querySelector('.year-chip.active[data-year]')?.dataset.year;
    return value === '2027' ? '2027' : '2026';
  };

  function detailLabel(title) {
    const copy = detailCopy[activeLanguage()] || detailCopy.ko;
    return `${title} · ${copy.detail}`;
  }

  function refineMeta(card) {
    const meta = card.querySelector('.meta');
    if (!meta) return;

    const badges = [...meta.querySelectorAll('.badge:not(.badge-overflow)')];
    badges.forEach((badge, index) => {
      badge.classList.toggle('card-tag-overflow-hidden', index >= 2);
    });

    const extraCount = Math.max(0, badges.length - 2);
    let overflow = meta.querySelector('.badge-overflow');
    if (!extraCount) {
      if (overflow) overflow.remove();
      return;
    }

    if (!overflow) {
      overflow = document.createElement('span');
      overflow.className = 'badge badge-overflow';
      meta.appendChild(overflow);
    }

    const nextText = `+${extraCount}`;
    const nextLabel = (detailCopy[activeLanguage()] || detailCopy.ko).extraTags(extraCount);
    if (overflow.textContent !== nextText) overflow.textContent = nextText;
    if (overflow.getAttribute('aria-label') !== nextLabel) overflow.setAttribute('aria-label', nextLabel);
  }

  function linkCards(root = document) {
    root.querySelectorAll('.card, .undated-item').forEach(card => {
      const titleEl = card.querySelector('.title, .undated-title');
      if (!titleEl) return;

      const title = titleEl.textContent.trim();
      const id = card.dataset.animeId || titleToId.get(title);
      if (!id) return;

      card.dataset.animeId = id;
      const href = `/anime/${encodeURIComponent(id)}/?lang=${activeLanguage()}`;

      let titleLink = titleEl.querySelector('.anime-detail-title-link');
      if (!titleLink) {
        titleLink = document.createElement('a');
        titleLink.className = 'anime-detail-title-link';
        titleLink.textContent = title;
        titleEl.textContent = '';
        titleEl.appendChild(titleLink);
      }
      if (titleLink.getAttribute('href') !== href) titleLink.href = href;
      titleLink.setAttribute('aria-label', detailLabel(titleLink.textContent.trim() || title));

      const posterFrame = card.querySelector('.poster-frame');
      if (posterFrame) {
        let posterLink = posterFrame.querySelector('.anime-detail-poster-link');
        if (!posterLink) {
          posterLink = document.createElement('a');
          posterLink.className = 'anime-detail-poster-link';
          posterFrame.appendChild(posterLink);
        }
        if (posterLink.getAttribute('href') !== href) posterLink.href = href;
        posterLink.setAttribute('aria-label', detailLabel(titleLink.textContent.trim() || title));
      }

      refineMeta(card);
      card.classList.add('card-refined');
    });
  }

  function updateScheduleArchiveLink() {
    const link = document.getElementById('archiveFooterLink');
    if (!link) return;
    link.href = `/${activeYear()}/?lang=${activeLanguage()}`;
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
    .anime-detail-poster-link {
      position: absolute;
      inset: 0;
      z-index: 2;
      border-radius: inherit;
    }
    .anime-detail-poster-link:focus-visible {
      outline: 2px solid var(--accent, #8ea1ff);
      outline-offset: -3px;
    }

    /* Active card resources share the same accent family as Streaming.
       Streaming stays slightly stronger as the primary CTA. */
    .card a.resource-btn:not(.disabled),
    .undated-item a.resource-btn:not(.disabled) {
      color: #e8edff;
      border-color: rgba(142,161,255,.24);
      background: linear-gradient(135deg, rgba(142,161,255,.105), rgba(178,140,255,.06));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.012);
    }
    .card a.resource-btn:not(.disabled):hover,
    .undated-item a.resource-btn:not(.disabled):hover {
      color: #fff;
      border-color: rgba(142,161,255,.42);
      background: linear-gradient(135deg, rgba(142,161,255,.17), rgba(178,140,255,.10));
    }
    .card .resource-btn.disabled,
    .undated-item .resource-btn.disabled {
      opacity: .42;
      color: #616979;
      background: rgba(255,255,255,.012);
      border-color: rgba(255,255,255,.035);
    }
  `;
  document.head.appendChild(style);

  linkCards();
  updateScheduleArchiveLink();

  ['schedule', 'undatedList'].forEach(id => {
    const target = document.getElementById(id);
    if (!target) return;
    new MutationObserver(() => linkCards(target)).observe(target, { childList: true, subtree: true });
  });

  document.addEventListener('newanime:language', () => {
    requestAnimationFrame(() => {
      linkCards();
      updateScheduleArchiveLink();
    });
  });

  document.getElementById('languageSwitcher')?.addEventListener('click', () => {
    requestAnimationFrame(updateScheduleArchiveLink);
  });

  document.getElementById('yearFilters')?.addEventListener('click', () => {
    requestAnimationFrame(updateScheduleArchiveLink);
  });

  const loadScript = src => new Promise((resolve, reject) => {
    const targetUrl = new URL(src, window.location.href);
    const existing = [...document.scripts].find(script => {
      if (!script.src) return false;
      const scriptUrl = new URL(script.src, window.location.href);
      return scriptUrl.origin === targetUrl.origin && scriptUrl.pathname === targetUrl.pathname;
    });
    if (existing) {
      // Existing scripts earlier in the defer chain have already executed by the time
      // anime-links.js runs. Do not wait for a load event that has already fired.
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const loadStylesheet = href => {
    const targetUrl = new URL(href, window.location.href);
    const existing = [...document.querySelectorAll('link[rel="stylesheet"]')].some(link => {
      const linkUrl = new URL(link.href, window.location.href);
      return linkUrl.origin === targetUrl.origin && linkUrl.pathname === targetUrl.pathname;
    });
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  loadStylesheet('/wishlist.css?v=20260909-wishlist5');
  loadStylesheet('/wishlist-ranking.css?v=20260910-ranking5');
  loadStylesheet('/wishlist-ranking-refine.css?v=20260910-refine2');
  const wishlistReady = loadScript('/wishlist.js?v=20260911-poster1')
    .then(() => {
      const kicker = document.querySelector('.wishlist-kicker');
      if (kicker) kicker.textContent = 'newani.me';
    });

  const authReady = loadScript('/auth-bootstrap.js?v=20260909-authboot4')
    .then(() => window.NewAnimeAuthBootstrap?.ready || null);

  wishlistReady.catch(error => console.warn('Wishlist UI could not be loaded.', error));
  authReady.catch(error => console.warn('Authentication UI could not be loaded.', error));

  authReady
    .then(() => loadScript('/wishlist-ranking.js?v=20260910-ranking5'))
    .then(() => loadScript('/wishlist-ranking-preview.js?v=20260910-preview1'))
    .then(() => loadScript('/wishlist-ranking-refine.js?v=20260910-refine4'))
    .catch(error => console.warn('Wishlist ranking could not be loaded.', error));

  Promise.all([wishlistReady, authReady])
    .then(() => loadScript('/wishlist-sync.js?v=20260909-sync2'))
    .catch(error => console.warn('Account / wishlist sync could not be loaded.', error));

  // Regional data files are already loaded before this script in index.html.
  // Loading them again used to stall the chain because their load events had already fired.
  Promise.resolve()
    .then(() => loadScript('/streaming-region-country-default.js?v=20260906-country1'))
    .then(() => loadScript('/streaming-region-ui.js?v=20260914-region2'))
    .then(() => loadScript('/streaming-region-compact.js?v=20260906-region4'))
    .catch(error => console.warn('Regional streaming UI could not be loaded.', error));
})();
