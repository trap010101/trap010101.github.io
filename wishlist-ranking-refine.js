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

  function apply() {
    document.querySelectorAll('.wishlist-ranking-scope').forEach(node => node.remove());

    const foot = document.querySelector('.wishlist-ranking-foot');
    if (foot) foot.textContent = copy[lang()] || copy.ko;

    const rankingKicker = document.querySelector('.ranking-page .hero-kicker');
    if (rankingKicker) rankingKicker.textContent = 'newani.me';
  }

  const mount = document.getElementById('wishlistRankingMount');
  if (mount) {
    new MutationObserver(() => queueMicrotask(apply)).observe(mount, {
      childList: true,
      subtree: true
    });
  }

  document.addEventListener('newanime:language', () => requestAnimationFrame(apply));
  apply();
})();
