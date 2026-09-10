(() => {
  'use strict';

  const data = Array.isArray(window.allAnimeData) && window.allAnimeData.length
    ? window.allAnimeData
    : Array.isArray(window.animeData) ? window.animeData : [];
  if (!data.length) return;

  const mount = document.getElementById('wishlistRankingMount');
  const fullMode = mount?.dataset.rankingMode === 'full';
  const animeById = new Map(data.map(anime => [anime.id, anime]));
  const copy = {
    ko: {
      kicker: 'Wishlist Ranking', title: fullMode ? '전체 위시리스트 랭킹' : '위시리스트 인기 순위',
      desc: fullMode ? 'NewAnime 이용자들이 저장한 작품의 전체 랭킹입니다.' : 'NewAnime 이용자들이 가장 많이 저장한 작품 TOP 5입니다.',
      all: '전체', y2026: '2026', y2027: '2027', movie: '극장판', saved: '위시',
      empty: '아직 공개할 수 있는 위시리스트 집계가 없습니다.', error: '랭킹 데이터를 불러오지 못했습니다.',
      foot: '로그인 계정의 위시리스트를 익명 집계하며 운영자 계정은 제외합니다. 집계 결과는 매일 00:00(KST)에 한 번만 공개 갱신됩니다.',
      more: '전체 랭킹 보기', pageTitle: '위시리스트 랭킹', pageDesc: '전날까지 누적된 위시리스트를 매일 00:00(KST)에 공개합니다.'
    },
    ja: {
      kicker: 'Wishlist Ranking', title: fullMode ? 'ウィッシュリスト総合ランキング' : 'ウィッシュリスト人気ランキング',
      desc: fullMode ? 'NewAnimeユーザーが保存した作品の総合ランキングです。' : 'NewAnimeユーザーが最も多く保存した作品TOP 5です。',
      all: '全体', y2026: '2026', y2027: '2027', movie: '劇場版', saved: '保存',
      empty: '公開できるウィッシュリスト集計はまだありません。', error: 'ランキングデータを読み込めませんでした。',
      foot: 'ログインユーザーのウィッシュリストを匿名集計し、運営者アカウントは除外します。集計結果は毎日00:00(KST)に一度だけ公開更新されます。',
      more: '総合ランキングを見る', pageTitle: 'ウィッシュリストランキング', pageDesc: '前日までに累積したウィッシュリストを毎日00:00(KST)に公開します。'
    },
    en: {
      kicker: 'Wishlist Ranking', title: fullMode ? 'Full Wishlist Ranking' : 'Wishlist Ranking',
      desc: fullMode ? 'The full ranking of titles saved by NewAnime users.' : 'The TOP 5 titles saved most by NewAnime users.',
      all: 'All', y2026: '2026', y2027: '2027', movie: 'Movies', saved: 'saved',
      empty: 'There is no publishable wishlist ranking data yet.', error: 'Could not load ranking data.',
      foot: 'Signed-in wishlists are aggregated anonymously and the operator account is excluded. Public counts refresh only once per day at 00:00 KST.',
      more: 'View full ranking', pageTitle: 'Wishlist Ranking', pageDesc: 'Wishlist totals accumulated through the previous day are published daily at 00:00 KST.'
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
  const isMovie = anime => (Array.isArray(anime?.tags) && anime.tags.includes('movie')) || anime?.type === 'movie' || anime?.format === 'movie';
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
    const existing = document.querySelector('.wishlist-ranking');
    if (existing) {
      section = existing;
      list = section.querySelector('.wishlist-ranking-list');
      return existing;
    }

    section = document.createElement('section');
    section.className = `wishlist-ranking${fullMode ? ' wishlist-ranking-full' : ''}`;
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
      <div class="wishlist-ranking-bottom">
        <p class="wishlist-ranking-foot"></p>
        ${fullMode ? '' : '<a class="wishlist-ranking-more" href="/ranking/"></a>'}
      </div>`;

    if (mount) mount.appendChild(section);
    else {
      const anchor = document.querySelector('.toolbar') || document.querySelector('.source-box');
      anchor?.parentNode?.insertBefore(section, anchor);
    }

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
    const more = section.querySelector('.wishlist-ranking-more');
    if (more) {
      more.textContent = t.more;
      more.href = `/ranking/?lang=${lang()}`;
    }
    if (fullMode) {
      const pageTitle = document.getElementById('rankingPageTitle');
      const pageDesc = document.getElementById('rankingPageDescription');
      if (pageTitle) pageTitle.textContent = t.pageTitle;
      if (pageDesc) pageDesc.textContent = t.pageDesc;
      document.title = `NewAnime - ${t.pageTitle}`;
    }
  }

  function filteredRows() {
    const filtered = rows.filter(row => {
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
    });
    return fullMode ? filtered : filtered.slice(0, 5);
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
    try { await window.NewAnimeAuthBootstrap?.ready; } catch (_) {}
    if (window.NewAnimeAuth?.client) return window.NewAnimeAuth.client;

    const config = window.NEWANIME_AUTH_CONFIG || {};
    if (window.supabase?.createClient && config.supabaseUrl && config.supabaseAnonKey) {
      if (!window.NewAnimeWishlistRankingClient) {
        window.NewAnimeWishlistRankingClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
          auth: { persistSession:false, autoRefreshToken:false, detectSessionInUrl:false }
        });
      }
      return window.NewAnimeWishlistRankingClient;
    }
    return null;
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
      .limit(1000);
    if (error) {
      console.warn('Wishlist ranking could not be loaded.', error);
      list.innerHTML = `<div class="wishlist-ranking-error">${(copy[lang()] || copy.ko).error}</div>`;
      return;
    }
    rows = Array.isArray(result) ? result : [];
    render();
  }

  if (fullMode) {
    const params = new URLSearchParams(location.search);
    const requested = params.get('lang');
    if (['ko','ja','en'].includes(requested)) document.documentElement.lang = requested;

    document.getElementById('languageSwitcher')?.addEventListener('click', event => {
      const button = event.target.closest('[data-lang]');
      if (!button) return;
      const next = button.dataset.lang;
      if (!['ko','ja','en'].includes(next)) return;
      document.documentElement.lang = next;
      document.querySelectorAll('#languageSwitcher [data-lang]').forEach(node => node.classList.toggle('active', node.dataset.lang === next));
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
      document.dispatchEvent(new CustomEvent('newanime:language', { detail:{ lang:next } }));
      render();
    });
  }

  document.addEventListener('newanime:language', render);
  load();
})();