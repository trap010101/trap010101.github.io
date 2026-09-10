(() => {
  'use strict';

  const copy = {
    ko: '랭킹에는 방영 예정인 작품만 표시 · 매일 00:00 KST 갱신',
    ja: 'ランキングには放送・公開予定作品のみ表示 · 毎日00:00 KST更新',
    en: 'Ranking includes upcoming titles only · Updated daily at 00:00 KST'
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  function ensureHeaderActionStyles() {
    if (document.getElementById('wishlistRankingHeaderActionStyle')) return;
    const style = document.createElement('style');
    style.id = 'wishlistRankingHeaderActionStyle';
    style.textContent = `
      .wishlist-ranking:not(.wishlist-ranking-full) .wishlist-ranking-head {
        align-items: center;
        justify-content: space-between;
      }

      .wishlist-ranking:not(.wishlist-ranking-full) .wishlist-ranking-head .wishlist-ranking-more {
        flex: 0 0 auto;
        width: auto;
        min-width: 0;
        min-height: 30px;
        padding: 0 11px;
        font-size: .6875rem;
        line-height: 1;
        white-space: nowrap;
      }

      .wishlist-ranking:not(.wishlist-ranking-full) .wishlist-ranking-bottom {
        justify-content: flex-start;
      }

      @media (max-width: 680px) {
        .wishlist-ranking:not(.wishlist-ranking-full) .wishlist-ranking-head {
          gap: 12px;
        }

        .wishlist-ranking:not(.wishlist-ranking-full) .wishlist-ranking-head .wishlist-ranking-more {
          width: auto;
          min-height: 28px;
          padding: 0 9px;
          font-size: .625rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function apply() {
    document.querySelectorAll('.wishlist-ranking-scope').forEach(node => node.remove());

    const foot = document.querySelector('.wishlist-ranking-foot');
    const nextFoot = copy[lang()] || copy.ko;
    if (foot && foot.textContent !== nextFoot) foot.textContent = nextFoot;

    const mainRanking = document.querySelector('.wishlist-ranking:not(.wishlist-ranking-full)');
    const head = mainRanking?.querySelector('.wishlist-ranking-head');
    const more = mainRanking?.querySelector('.wishlist-ranking-more');
    if (head && more && more.parentElement !== head) head.appendChild(more);

    const rankingKicker = document.querySelector('.ranking-page .hero-kicker');
    if (rankingKicker && rankingKicker.textContent !== 'newani.me') rankingKicker.textContent = 'newani.me';
  }

  ensureHeaderActionStyles();

  // wishlist-ranking.js already owns rendering. Do not observe the ranking subtree here:
  // changing text inside a MutationObserver callback can recursively enqueue itself.
  document.addEventListener('newanime:language', () => requestAnimationFrame(apply));
  apply();
})();
