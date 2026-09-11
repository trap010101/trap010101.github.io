(() => {
  'use strict';

  // Public wishlist ranking is temporarily disabled until enough aggregate
  // wishlist activity has accumulated to make the ranking meaningful.
  // Keep the ranking renderer/data pipeline intact so this can be reopened
  // without changing wishlist save/toggle behaviour.
  const WISHLIST_RANKING_PUBLIC = false;
  if (WISHLIST_RANKING_PUBLIC) return;

  const mount = document.getElementById('wishlistRankingMount');
  const fullMode = mount?.dataset.rankingMode === 'full';

  const copy = {
    ko: {
      status: '위시리스트 인기 데이터를 집계 중입니다. 충분한 표본이 쌓인 뒤 랭킹을 공개할 예정입니다.',
      meta: '현재 순위와 하트 수는 공개하지 않습니다.'
    },
    ja: {
      status: 'ウィッシュリストの人気データを集計中です。十分なデータが集まり次第、ランキングを公開します。',
      meta: '現在、順位とハート数は公開していません。'
    },
    en: {
      status: 'Wishlist popularity data is still being collected. The ranking will be published once the sample is large enough.',
      meta: 'Ranks and heart counts are currently hidden.'
    }
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  function removePublicRanking() {
    document.querySelectorAll('.wishlist-ranking').forEach(section => section.remove());
  }

  function renderHoldingState() {
    if (!fullMode || !mount) return;
    const t = copy[lang()] || copy.ko;
    let notice = mount.querySelector('[data-ranking-holding]');
    if (!notice) {
      notice = document.createElement('section');
      notice.dataset.rankingHolding = '';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      notice.style.cssText = [
        'margin:18px 0 28px',
        'padding:28px 22px',
        'border:1px solid rgba(255,255,255,.09)',
        'border-radius:18px',
        'background:rgba(255,255,255,.035)',
        'text-align:center'
      ].join(';');
      notice.innerHTML = '<strong data-ranking-holding-title style="display:block;font-size:1rem;line-height:1.6"></strong><span data-ranking-holding-meta style="display:block;margin-top:8px;color:var(--muted);font-size:.8rem;line-height:1.6"></span>';
      mount.replaceChildren(notice);
    }
    notice.querySelector('[data-ranking-holding-title]').textContent = t.status;
    notice.querySelector('[data-ranking-holding-meta]').textContent = t.meta;
  }

  function apply() {
    removePublicRanking();
    renderHoldingState();
  }

  // wishlist-ranking.js creates its section synchronously before requesting
  // aggregate data, so removing it here also keeps later async renders detached.
  apply();
  document.addEventListener('newanime:language', () => requestAnimationFrame(apply));
})();
