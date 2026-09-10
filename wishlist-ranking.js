(() => {
  'use strict';

  const data = Array.isArray(window.allAnimeData) && window.allAnimeData.length
    ? window.allAnimeData
    : Array.isArray(window.animeData) ? window.animeData : [];
  if (!data.length) return;

  const animeById = new Map(data.map(anime => [anime.id, anime]));
  const copy = {
    ko: {
      kicker: 'Wishlist Ranking', title: '위시리스트 인기 순위', desc: 'NewAnime 이용자들이 가장 많이 저장한 작품입니다.',
      all: '전체', y2026: '2026', y2027: '2027', movie: '극장판', saved: '위시',
      empty: '아직 집계된 위시리스트가 없습니다.', error: '랭킹 데이터를 불러오지 못했습니다.',
      foot: '로그인 계정의 위시리스트를 익명 집계한 결과입니다. 개인별 저장 내역은 공개되지 않습니다.'
    },
    ja: {
      kicker: 'Wishlist Ranking', title: 'ウィッシュリスト人気ランキング', desc: 'NewAnimeユーザーが最も多く保存した作品です。',
      all: '全体', y2026: '2026', y2027: '2027', movie: '劇場版', saved: '保存',
      empty: '集計されたウィッシュリストはまだありません。', error: 'ランキングデータを読み込めませんでした。',
      foot: 'ログインユーザーのウィッシュリストを匿名で集計しています。個別の保存内容は公開されません。'
    },
    en: {
      kicker: 'Wishlist Ranking', title: 'Wishlist Ranking', desc: 'The titles NewAnime users have saved the most.',
      all: 'All', y2026: '2026', y2027: '2027', movie: 'Movies', saved: 'saved',
      empty: 'No wishlist data has been collected yet.', error: 'Could not load ranking data.',
      foot: 'Counts are aggregated anonymously from signed-in wishlists. Individual user lists are never exposed.'
    }
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  const title = anime => anime?.title?.[lang()] || anime?.title?.ko || anime?.title?.ja || anime?.title?.en || anime?.id || '';
  const year = anime => Number(anime?.schedule?.premiere?.date?.slice?.(0, 4)) || Number(anime?.release?.japan?.year || anime?.release?.global?.year || anime?.release?.korea?.year) || null;
  const isMovie = anime => Array.isArray(anime?.tags) && anime.tags.includes('movie') || anime?.type === 'movie' || anime?.format === 'movie';
  const releaseKey = anime => {
    const date = anime?.schedule?.premiere?.date;
    if (/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return date;
    const y = year(anime) || 9999;
    const m = Number(anime?.release?.japan?.month || anime?.release?.global?.month || anime?.release?.korea?.month) || 13;
    const d = Number(anime?.release?.japan?.day || anime?.release?.global?.day || anime?.release?.korea?.day) || 32;
    return `${String(y).padStart(4,'0')}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  };

  let activeFilter = 'all';
  let rows = [];
  let section;
  let list;

  function createSection() {
    if (document.querySelector('.wishlist-ranking')) return document.querySelector('.wishlist-ranking');
    section = document.createElement('section');
    section.className = 'wishlist-ranking';
    section.setAttribute('aria-labelledby', 'wishlistRankingTitle');
    section.innerHTML = `
      <div class="wishlist-ranking-head">
        <div>
          <div class="wishlist-ranking-kicker"></div>
          <h2 id="wishlistRankingTitle"></h2>
          <p class="wishlist-ranking-desc"></p>
        </div>
        <div class="wishlist-ranking-filters" role="group" aria-label="Wishlist ranking filter">
          <button class="wishlist-ranking-filter is-active" type="button" data-ranking-filter="all"></button>
          <button class="wishlist-ranking-filter" type="button" data-ranking-filter="2026"></button>
          <button class="wishlist-ranking-filter" type="button" data-ranking-filter="2027"></button>
          <button class="wishlist-ranking-filter" type="button" data-ranking-filter="movie"></button>
        </div>
      </div>
      <div class="wishlist-ranking-list"></div>
      <p class="wishlist-ranking-foot"></p>`;
    const anchor = document.querySelector('.toolbar') || document.querySelector('.source-box');
    anchor?.parentNode?.insertBefore(section, anchor);
    list = section.querySelector('.wishlist-ranking-list');
    section.addEventListener('click', event => {
      const button = event.target.closest('[data-ranking-filter]');
      if (!button) return;
      activeFilter = button.dataset.rankingFilter;
      section.querySelectorAll('[data-ranking-filter]').forEach(node => node.classList.toggle('is-active', node === button));
      render();
    });
    return section;
  }

  function localize() {
    if (!section) return;
    const t = copy[lang()] || copy.ko;
    section.querySelector('.wishlist-ranking-kicker').textContent = t.kicker;
    section.querySelector('#wishlistRankingTitle').textContent = t.title;
    section.querySelector('.wishlist-ranking-desc').textContent = t.desc;
    section.querySelector('[data-ranking-filter="all"]').textContent = t.all;
    section.querySelector('[data-ranking-filter="2026"]').textContent = t.y2026;
    section.querySelector('[data-ranking-filter="2027"]').textContent = t.y2027;
    section.querySelector('[data-ranking-filter="movie"]').textContent = t.movie;
    section.querySelector('.wishlist-ranking-foot').textContent = t.foot;
  }

  function filteredRows() {
    return rows.filter(row => {
      const anime = animeById.get(row.anime_id);
      if (!anime) return false;
      if (activeFilter === '2026') return year(anime) === 2026;
      if (activeFilter === '2027') return year(anime) === 2027;
      if (activeFilter === 'movie') return isMovie(anime);
      return true;
    }).sort((a, b) => {
      if (b.wishlist_count !== a.wishlist_count) return b.wishlist_count - a.wishlist_count;
      const aAnime = animeById.get(a.anime_id);
      const bAnime = animeById.get(b.anime_id);
      return releaseKey(aAnime).localeCompare(releaseKey(bAnime)) || title(aAnime).localeCompare(title(bAnime), lang());
    }).slice(0, 10);
  }

  function render() {
    if (!section || !list) return;
    localize();
    const t = copy[lang()] || copy.ko;
    const visible = filteredRows();
    list.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'wishlist-ranking-empty';
      empty.textContent = t.empty;
      list.appendChild(empty);
      return;
    }

    visible.forEach((row, index) => {
      const anime = animeById.get(row.anime_id);
      const link = document.createElement('a');
      link.className = 'wishlist-rank-item';
      link.href = `/anime/${encodeURIComponent(anime.id)}/?lang=${lang()}`;

      const rank = document.createElement('span');
      rank.className = 'wishlist-rank-number';
      rank.textContent = String(index + 1).padStart(2, '0');

      const poster = document.createElement('span');
      poster.className = 'wishlist-rank-poster';
      if (anime?.poster?.src) {
        const img = document.createElement('img');
        img.src = anime.poster.src;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.style.objectPosition = anime.poster.position || 'center center';
        img.addEventListener('error', () => { poster.textContent = '?'; });
        poster.appendChild(img);
      } else {
        poster.textContent = '?';
      }

      const copyWrap = document.createElement('span');
      copyWrap.className = 'wishlist-rank-copy';
      const strong = document.createElement('strong');
      strong.className = 'wishlist-rank-title';
      strong.textContent = title(anime);
      const meta = document.createElement('span');
      meta.className = 'wishlist-rank-meta';
      const y = year(anime);
      meta.textContent = y ? String(y) : '—';
      copyWrap.append(strong, meta);

      const count = document.createElement('span');
      count.className = 'wishlist-rank-count';
      count.textContent = `♥ ${row.wishlist_count} ${t.saved}`;

      link.append(rank, poster, copyWrap, count);
      list.appendChild(link);
    });
  }

  async function getClient() {
    if (window.NewAnimeAuth?.client) return window.NewAnimeAuth.client;
    try {
      await window.NewAnimeAuthBootstrap?.ready;
    } catch (_) {}
    return window.NewAnimeAuth?.client || null;
  }

  async function load() {
    createSection();
    localize();
    const client = await getClient();
    if (!client) {
      list.innerHTML = `<div class="wishlist-ranking-error">${(copy[lang()] || copy.ko).error}</div>`;
      return;
    }
    const { data: result, error } = await client
      .from('wishlist_counts')
      .select('anime_id,wishlist_count')
      .gt('wishlist_count', 0)
      .order('wishlist_count', { ascending: false })
      .limit(250);
    if (error) {
      console.warn('Wishlist ranking could not be loaded.', error);
      list.innerHTML = `<div class="wishlist-ranking-error">${(copy[lang()] || copy.ko).error}</div>`;
      return;
    }
    rows = Array.isArray(result) ? result : [];
    render();
  }

  let reloadTimer = null;
  const scheduleReload = () => {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(load, 250);
  };

  document.addEventListener('newanime:language', render);
  document.addEventListener('newanime:wishlist-sync', event => {
    if (event.detail?.status === 'synced') scheduleReload();
  });

  load();
})();