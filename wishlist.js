(() => {
  'use strict';

  const STORAGE_KEY = 'newanime:wishlist:v1';
  const data = Array.isArray(window.allAnimeData) && window.allAnimeData.length
    ? window.allAnimeData
    : Array.isArray(window.animeData) ? window.animeData : [];
  const animeById = new Map(data.map(anime => [anime.id, anime]));
  const dataOrder = new Map(data.map((anime, index) => [anime.id, index]));

  const copy = {
    ko: {
      menu: '위시리스트', title: '위시리스트', description: '위시리스트는 로그인한 계정에 저장됩니다.',
      add: '위시리스트에 추가', remove: '위시리스트에서 제거', close: '닫기',
      empty: '아직 저장한 작품이 없습니다.', detail: '상세 정보', saved: '{n}작품',
      unavailable: '현재 일정에서 확인할 수 없는 저장 항목 {n}개는 그대로 보존됩니다.'
    },
    ja: {
      menu: 'ウィッシュリスト', title: 'ウィッシュリスト', description: 'ウィッシュリストはログイン中のアカウントに保存されます。',
      add: 'ウィッシュリストに追加', remove: 'ウィッシュリストから削除', close: '閉じる',
      empty: '保存した作品はまだありません。', detail: '詳細', saved: '{n}作品',
      unavailable: '現在の予定で表示できない保存項目 {n}件はそのまま保持されます。'
    },
    en: {
      menu: 'WISHLIST', title: 'Wishlist', description: 'Your wishlist is saved to your signed-in account.',
      add: 'Add to wishlist', remove: 'Remove from wishlist', close: 'Close',
      empty: 'No saved titles yet.', detail: 'Details', saved: '{n} saved',
      unavailable: '{n} saved item(s) not in the current schedule are kept locally.'
    }
  };

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };
  const text = key => copy[language()]?.[key] || copy.ko[key] || key;
  const title = anime => anime?.title?.[language()] || anime?.title?.ko || anime?.title?.ja || anime?.title?.en || anime?.id || '';

  function readIds() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(value)) return [];
      return [...new Set(value.filter(id => typeof id === 'string' && id.trim()).map(id => id.trim()))];
    } catch (_) {
      return [];
    }
  }

  let ids = readIds();

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch (_) {}
    document.dispatchEvent(new CustomEvent('newanime:wishlist', { detail: { ids: [...ids] } }));
  }

  function has(id) { return ids.includes(id); }
  function add(id) {
    if (!id || has(id)) return false;
    ids.push(id);
    persist();
    refresh();
    return true;
  }
  function remove(id) {
    const next = ids.filter(value => value !== id);
    if (next.length === ids.length) return false;
    ids = next;
    persist();
    refresh();
    return true;
  }
  function toggle(id) { return has(id) ? (remove(id), false) : (add(id), true); }
  function getAll() { return [...ids]; }

  window.NewAnimeWishlist = Object.freeze({ storageKey: STORAGE_KEY, getAll, has, add, remove, toggle });

  function heartSvg() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>';
  }

  function updateToggle(button) {
    const id = button.dataset.wishlistId;
    const active = has(id);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', text(active ? 'remove' : 'add'));
    button.title = text(active ? 'remove' : 'add');
  }

  function injectCardToggles(root = document) {
    root.querySelectorAll('.card[data-anime-id], .undated-item[data-anime-id]').forEach(card => {
      const id = card.dataset.animeId;
      const poster = card.querySelector('.poster-frame');
      if (!id || !poster || poster.querySelector('[data-wishlist-id]')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wishlist-toggle';
      button.dataset.wishlistId = id;
      button.innerHTML = heartSvg();
      updateToggle(button);
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggle(id);
      });
      poster.appendChild(button);
    });
  }

  const menu = document.getElementById('siteMenu');
  let menuButton = document.getElementById('wishlistMenuButton');
  if (menu && !menuButton) {
    menuButton = document.createElement('button');
    menuButton.className = 'site-menu-item wishlist-menu-item';
    menuButton.id = 'wishlistMenuButton';
    menuButton.type = 'button';
    menuButton.setAttribute('role', 'menuitem');
    menuButton.innerHTML = `<span class="site-menu-icon wishlist-menu-icon" aria-hidden="true">${heartSvg()}</span><span class="wishlist-menu-label"></span><span class="wishlist-menu-count" aria-hidden="true"></span>`;
    const contact = menu.querySelector('a[href^="mailto:"]');
    menu.insertBefore(menuButton, contact || menu.firstChild);
  }

  const modal = document.createElement('div');
  modal.className = 'wishlist-modal hidden';
  modal.id = 'wishlistModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'wishlistModalTitle');
  modal.innerHTML = `
    <div class="wishlist-backdrop" data-wishlist-close></div>
    <section class="wishlist-dialog" tabindex="-1">
      <div class="wishlist-head">
        <div>
          <div class="wishlist-kicker">NewAnime</div>
          <h2 id="wishlistModalTitle"></h2>
          <p class="wishlist-description"></p>
        </div>
        <button class="wishlist-close" type="button" data-wishlist-close>×</button>
      </div>
      <div class="wishlist-summary"></div>
      <div class="wishlist-list"></div>
      <p class="wishlist-unavailable hidden"></p>
    </section>`;
  document.body.appendChild(modal);

  const list = modal.querySelector('.wishlist-list');
  const summary = modal.querySelector('.wishlist-summary');
  const unavailable = modal.querySelector('.wishlist-unavailable');
  const closeButton = modal.querySelector('.wishlist-close');
  let lastFocus = null;

  function posterMarkup(anime) {
    if (!anime?.poster?.src) return '<span class="wishlist-poster wishlist-poster-fallback" aria-hidden="true">?</span>';
    return `<span class="wishlist-poster"><img src="${anime.poster.src}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" style="object-position:${anime.poster.position || 'center center'}" onerror="this.remove();this.parentElement.classList.add('wishlist-poster-fallback');this.parentElement.textContent='?'"></span>`;
  }

  function releaseSortKey(anime) {
    const premiereDate = anime?.schedule?.premiere?.date;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(premiereDate || '');
    if (match) {
      return [Number(match[1]), Number(match[2]), Number(match[3]), 0];
    }

    const release = anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
    if (!release) return [Number.MAX_SAFE_INTEGER, 13, 32, 4];

    const year = Number.isFinite(Number(release.year)) ? Number(release.year) : Number.MAX_SAFE_INTEGER;
    const month = Number.isFinite(Number(release.month)) ? Number(release.month) : 13;
    const day = release.status === 'date' && Number.isFinite(Number(release.day)) ? Number(release.day) : 32;
    const precision = release.status === 'date' ? 0 : release.status === 'month' ? 1 : release.status === 'year' ? 2 : 3;
    return [year, month, day, precision];
  }

  function compareByRelease(a, b) {
    const aKey = releaseSortKey(a);
    const bKey = releaseSortKey(b);
    for (let i = 0; i < aKey.length; i += 1) {
      if (aKey[i] !== bKey[i]) return aKey[i] - bKey[i];
    }
    return (dataOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (dataOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER);
  }

  function renderModal() {
    const known = ids.map(id => animeById.get(id)).filter(Boolean).sort(compareByRelease);
    const missingCount = ids.length - known.length;
    modal.querySelector('#wishlistModalTitle').textContent = text('title');
    modal.querySelector('.wishlist-description').textContent = text('description');
    closeButton.setAttribute('aria-label', text('close'));
    closeButton.title = text('close');
    summary.textContent = text('saved').replace('{n}', String(ids.length));

    if (!known.length) {
      list.innerHTML = `<div class="wishlist-empty">${text('empty')}</div>`;
    } else {
      list.innerHTML = known.map(anime => `
        <div class="wishlist-item" data-wishlist-item="${anime.id}">
          <a class="wishlist-item-main" href="/anime/${encodeURIComponent(anime.id)}/?lang=${language()}">
            ${posterMarkup(anime)}
            <span class="wishlist-item-copy">
              <strong>${title(anime)}</strong>
              <span>${text('detail')}</span>
            </span>
          </a>
          <button class="wishlist-remove" type="button" data-wishlist-remove="${anime.id}" aria-label="${text('remove')}" title="${text('remove')}">${heartSvg()}</button>
        </div>`).join('');
    }

    unavailable.classList.toggle('hidden', missingCount === 0);
    unavailable.textContent = missingCount ? text('unavailable').replace('{n}', String(missingCount)) : '';
  }

  function openModal() {
    lastFocus = document.activeElement;
    renderModal();
    modal.classList.remove('hidden');
    document.body.classList.add('wishlist-modal-open');
    menu?.classList.add('hidden');
    document.getElementById('menuToggle')?.setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeModal() {
    if (modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    document.body.classList.remove('wishlist-modal-open');
    const menuToggle = document.getElementById('menuToggle');
    if (lastFocus instanceof HTMLElement && !menu?.contains(lastFocus)) lastFocus.focus();
    else menuToggle?.focus();
    lastFocus = null;
  }

  function updateMenu() {
    if (!menuButton) return;
    const label = menuButton.querySelector('.wishlist-menu-label');
    const count = menuButton.querySelector('.wishlist-menu-count');
    if (label) label.textContent = text('menu');
    if (count) count.textContent = String(ids.length);
    menuButton.setAttribute('aria-label', `${text('menu')} · ${text('saved').replace('{n}', String(ids.length))}`);
  }

  function refresh() {
    document.querySelectorAll('[data-wishlist-id]').forEach(updateToggle);
    updateMenu();
    if (!modal.classList.contains('hidden')) renderModal();
  }

  menuButton?.addEventListener('click', openModal);
  modal.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-wishlist-remove]');
    if (removeButton) {
      remove(removeButton.dataset.wishlistRemove);
      return;
    }
    if (event.target.closest('[data-wishlist-close]')) closeModal();
  });

  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')]
      .filter(element => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  ['schedule', 'undatedList'].forEach(id => {
    const target = document.getElementById(id);
    if (!target) return;
    new MutationObserver(() => injectCardToggles(target)).observe(target, { childList: true, subtree: true });
  });

  document.addEventListener('newanime:language', () => {
    refresh();
    if (!modal.classList.contains('hidden')) renderModal();
  });

  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return;
    ids = readIds();
    refresh();
  });

  injectCardToggles();
  refresh();
})();