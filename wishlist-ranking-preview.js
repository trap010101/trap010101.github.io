(() => {
  'use strict';

  const mount = document.getElementById('wishlistRankingMount');
  const fullMode = mount?.dataset.rankingMode === 'full';
  const section = document.querySelector('.wishlist-ranking');
  const list = section?.querySelector('.wishlist-ranking-list');
  if (!section || !list) return;

  const copy = {
    ko: { waiting: '집계 대기', meta: '—', saved: '위시' },
    ja: { waiting: '集計待ち', meta: '—', saved: '保存' },
    en: { waiting: 'Awaiting data', meta: '—', saved: 'saved' }
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  const style = document.createElement('style');
  style.textContent = `
    .wishlist-rank-placeholder,
    .wishlist-podium-placeholder {
      cursor: default !important;
      user-select: none;
    }
    .wishlist-rank-placeholder:hover,
    .wishlist-rank-placeholder:focus-visible,
    .wishlist-podium-placeholder:hover,
    .wishlist-podium-placeholder:focus-visible {
      transform: none !important;
      background-color: transparent;
      outline: none;
    }
    .wishlist-rank-placeholder .wishlist-rank-poster,
    .wishlist-podium-placeholder .wishlist-podium-poster {
      position: relative;
      overflow: hidden;
      color: transparent;
      background: rgba(255,255,255,.045);
    }
    .wishlist-rank-placeholder .wishlist-rank-poster::after,
    .wishlist-podium-placeholder .wishlist-podium-poster::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,.055) 45%, transparent 65%);
      transform: translateX(-100%);
      animation: ranking-placeholder-sheen 2.4s ease-in-out infinite;
    }
    .wishlist-rank-placeholder .wishlist-rank-title,
    .wishlist-podium-placeholder .wishlist-podium-title {
      color: var(--muted);
    }
    .wishlist-rank-placeholder .wishlist-rank-count,
    .wishlist-podium-placeholder .wishlist-podium-count {
      color: var(--muted);
      background: rgba(255,255,255,.035);
    }
    @keyframes ranking-placeholder-sheen {
      0%, 45% { transform: translateX(-100%); }
      75%, 100% { transform: translateX(100%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .wishlist-rank-placeholder .wishlist-rank-poster::after,
      .wishlist-podium-placeholder .wishlist-podium-poster::after { animation: none; }
    }
  `;
  document.head.appendChild(style);

  function listPlaceholder(rankNumber) {
    const t = copy[lang()] || copy.ko;
    const row = document.createElement('div');
    row.className = 'wishlist-rank-item wishlist-rank-placeholder';
    row.setAttribute('aria-hidden', 'true');
    row.innerHTML = `
      <span class="wishlist-rank-number">${String(rankNumber).padStart(2, '0')}</span>
      <span class="wishlist-rank-poster"></span>
      <span class="wishlist-rank-copy">
        <strong class="wishlist-rank-title">${t.waiting}</strong>
        <span class="wishlist-rank-meta">${t.meta}</span>
      </span>
      <span class="wishlist-rank-tail">
        <span class="wishlist-rank-count">♥ —</span>
      </span>`;
    return row;
  }

  function podiumPlaceholder(rankNumber) {
    const t = copy[lang()] || copy.ko;
    const card = document.createElement('div');
    card.className = `wishlist-podium-card rank-${rankNumber} wishlist-podium-placeholder`;
    card.setAttribute('aria-hidden', 'true');
    card.innerHTML = `
      <span class="wishlist-podium-rank">${String(rankNumber).padStart(2, '0')}</span>
      <span class="wishlist-podium-poster"></span>
      <span class="wishlist-podium-body">
        <strong class="wishlist-podium-title">${t.waiting}</strong>
        <span class="wishlist-podium-meta">${t.meta}</span>
        <span class="wishlist-podium-count">♥ —</span>
      </span>`;
    return card;
  }

  function fillPreview() {
    const empty = list.querySelector('.wishlist-ranking-empty');
    if (!empty) return;

    if (fullMode) {
      const podium = section.querySelector('.wishlist-ranking-podium');
      if (podium) {
        podium.replaceChildren(...[1, 2, 3].map(podiumPlaceholder));
      }
      list.replaceChildren(...[4, 5, 6, 7, 8, 9, 10].map(listPlaceholder));
      list.hidden = false;
    } else {
      list.replaceChildren(...[1, 2, 3, 4, 5].map(listPlaceholder));
      list.hidden = false;
    }
  }

  const observer = new MutationObserver(() => queueMicrotask(fillPreview));
  observer.observe(list, { childList: true });
  fillPreview();

  document.addEventListener('newanime:language', () => requestAnimationFrame(fillPreview));
})();