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

  const activeYear = () => {
    const value = document.querySelector('.year-chip.active[data-year]')?.dataset.year;
    return value === '2027' ? '2027' : '2026';
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
  `;
  document.head.appendChild(style);

  linkCards();
  updateScheduleArchiveLink();

  ['schedule', 'undatedList'].forEach(id => {
    const target = document.getElementById(id);
    if (!target) return;
    new MutationObserver(() => linkCards(target)).observe(target, { childList: true, subtree: true });
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
      if (existing.dataset.loaded === 'true' || existing.readyState === 'complete') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
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

  loadStylesheet('/wishlist.css?v=20260908-wishlist4');
  loadScript('/wishlist.js?v=20260908-wishlist3')
    .then(() => {
      const kicker = document.querySelector('.wishlist-kicker');
      if (kicker) kicker.textContent = 'newani.me';
    })
    .catch(error => console.warn('Wishlist UI could not be loaded.', error));

  loadScript('/auth-config.js?v=20260908-auth5')
    .then(() => {
      const config = window.NEWANIME_AUTH_CONFIG || {};
      if (!config.supabaseUrl || !config.supabaseAnonKey || !config.googleClientId || config.googleEnabled !== true) return null;
      loadStylesheet('/auth.css?v=20260908-auth2');
      loadStylesheet('/account-refine.css?v=20260908-authui4');
      return loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.115.0')
        .then(() => loadScript('https://accounts.google.com/gsi/client'))
        .then(() => loadScript('/auth.js?v=20260908-auth7'))
        .then(() => loadScript('/wishlist-sync.js?v=20260908-sync1'));
    })
    .catch(error => console.warn('Authentication UI could not be loaded.', error));

  Promise.resolve()
    .then(() => loadScript('/data/streaming-jp-20260906.js?v=20260906-region1'))
    .then(() => loadScript('/data/streaming-us-20260906.js?v=20260906-region1'))
    .then(() => loadScript('/streaming-region-country-default.js?v=20260906-country1'))
    .then(() => loadScript('/streaming-region-ui.js?v=20260906-region1'))
    .then(() => loadScript('/streaming-region-compact.js?v=20260906-region4'))
    .catch(error => console.warn('Regional streaming UI could not be loaded.', error));
})();