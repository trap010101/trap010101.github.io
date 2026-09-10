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
      title: '인기 순위', scope: '전체', saved: '위시',
      empty: '아직 공개할 수 있는 인기 순위가 없습니다.', error: '랭킹 데이터를 불러오지 못했습니다.',
      foot: '랭킹에는 방영 예정인 작품만 표시 · 매일 00:00 KST 갱신', more: '전체 랭킹 보기',
      pageTitle: '인기 순위', pageDesc: '매일 00:00 KST 기준으로 갱신됩니다.',
      retiredTitle: '순위 외', retiredDesc: '공개가 완료된 작품', completed: '공개 완료'
    },
    ja: {
      title: '人気ランキング', scope: '全体', saved: '保存',
      empty: '公開できる人気ランキングはまだありません。', error: 'ランキングデータを読み込めませんでした。',
      foot: 'ランキングには放送・公開予定作品のみ表示 · 毎日00:00 KST更新', more: '全ランキングを見る',
      pageTitle: '人気ランキング', pageDesc: '毎日00:00 KST時点で更新されます。',
      retiredTitle: 'ランキング対象外', retiredDesc: '公開・放送開始済みの作品', completed: '公開済み'
    },
    en: {
      title: 'Popularity Ranking', scope: 'All', saved: 'saved',
      empty: 'There is no publishable popularity ranking yet.', error: 'Could not load ranking data.',
      foot: 'Ranking includes upcoming titles only · Updated daily at 00:00 KST', more: 'View full ranking',
      pageTitle: 'Popularity Ranking', pageDesc: 'Updated daily based on the 00:00 KST snapshot.',
      retiredTitle: 'Out of ranking', retiredDesc: 'Titles that have already premiered', completed: 'Released'
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

  function primaryRelease(anime) {
    return anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
  }

  function exactDateKeyFromString(value) {
    const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    return Number(match[1]) * 10000 + Number(match[2]) * 100 + Number(match[3]);
  }

  function exactReleaseKey(anime) {
    const scheduleKey = exactDateKeyFromString(anime?.schedule?.premiere?.date);
    if (scheduleKey !== null) return scheduleKey;
    const release = primaryRelease(anime);
    if (!release || release.status !== 'date' || !release.year || !release.month || !release.day) return null;
    return Number(release.year) * 10000 + Number(release.month) * 100 + Number(release.day);
  }

  function japanTodayKey() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const part = type => Number(parts.find(item => item.type === type)?.value || 0);
    return part('year') * 10000 + part('month') * 100 + part('day');
  }

  const todayKey = japanTodayKey();
  const isCompleted = anime => {
    const key = exactReleaseKey(anime);
    return key !== null && key < todayKey;
  };

  const releaseKey = anime => {
    const date = anime?.schedule?.premiere?.date;
    if (/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return date;
    const release = primaryRelease(anime);
    const y = Number(release?.year) || year(anime) || 9999;
    const m = Number(release?.month) || 13;
    const d = Number(release?.day) || 32;
    return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  let rows = [];
  let section;
  let list;
  let podium;
  let retired;
  let retiredList;

  function createSection() {
    const existing = document.querySelector('.wishlist-ranking');
    if (existing) {
      section = existing;
      list = section.querySelector('.wishlist-ranking-list');
      podium = section.querySelector('.wishlist-ranking-podium');
      retired = section.querySelector('.wishlist-ranking-retired');
      retiredList = section.querySelector('.wishlist-ranking-retired-list');
      return existing;
    }

    section = document.createElement('section');
    section.className = `wishlist-ranking${fullMode ? ' wishlist-ranking-full' : ''}`;
    section.setAttribute('aria-labelledby', 'wishlistRankingTitle');
    section.innerHTML = `
      <div class="wishlist-ranking-head">
        <h2 id="wishlistRankingTitle"></h2>
      </div>
      ${fullMode ? '<div class="wishlist-ranking-podium"></div>' : ''}
      <div class="wishlist-ranking-list"></div>
      <div class="wishlist-ranking-bottom">
        <p class="wishlist-ranking-foot"></p>
        ${fullMode ? '' : '<a class="wishlist-ranking-more" href="/ranking/"></a>'}
      </div>
      ${fullMode ? `
        <section class="wishlist-ranking-retired" hidden>
          <div class="wishlist-ranking-retired-head">
            <div>
              <h2 class="wishlist-ranking-retired-title"></h2>
              <p class="wishlist-ranking-retired-desc"></p>
            </div>
          </div>
          <div class="wishlist-ranking-retired-list"></div>
        </section>` : ''}`;

    if (mount) mount.appendChild(section);
    else {
      const anchor = document.querySelector('.toolbar') || document.querySelector('.source-box');
      anchor?.parentNode?.insertBefore(section, anchor);
    }

    list = section.querySelector('.wishlist-ranking-list');
    podium = section.querySelector('.wishlist-ranking-podium');
    retired = section.querySelector('.wishlist-ranking-retired');
    retiredList = section.querySelector('.wishlist-ranking-retired-list');
    return section;
  }

  function localize() {
    if (!section) return;
    const t = copy[lang()] || copy.ko;
    const sectionTitle = section.querySelector('#wishlistRankingTitle');
    const scope = section.querySelector('.wishlist-ranking-scope');
    const foot = section.querySelector('.wishlist-ranking-foot');
    if (sectionTitle) sectionTitle.textContent = t.title;
    if (scope) scope.textContent = t.scope;
    if (foot) foot.textContent = t.foot;

    const more = section.querySelector('.wishlist-ranking-more');
    if (more) {
      more.textContent = t.more;
      more.href = `/ranking/?lang=${lang()}`;
    }

    if (retired) {
      const retiredTitle = retired.querySelector('.wishlist-ranking-retired-title');
      const retiredDesc = retired.querySelector('.wishlist-ranking-retired-desc');
      if (retiredTitle) retiredTitle.textContent = t.retiredTitle;
      if (retiredDesc) retiredDesc.textContent = t.retiredDesc;
    }

    if (fullMode) {
      const pageTitle = document.getElementById('rankingPageTitle');
      const pageDesc = document.getElementById('rankingPageDescription');
      if (pageTitle) pageTitle.textContent = t.pageTitle;
      if (pageDesc) pageDesc.textContent = t.pageDesc;
      document.title = `NewAnime - ${t.pageTitle}`;
    }
  }

  function sortedRows(source) {
    return [...source].sort((a, b) => {
      if (b.wishlist_count !== a.wishlist_count) return b.wishlist_count - a.wishlist_count;
      const aAnime = animeById.get(a.anime_id);
      const bAnime = animeById.get(b.anime_id);
      return releaseKey(aAnime).localeCompare(releaseKey(bAnime)) || title(aAnime).localeCompare(title(bAnime), lang());
    });
  }

  function splitRows() {
    const active = [];
    const completed = [];
    rows.forEach(row => {
      const anime = animeById.get(row.anime_id);
      if (!anime) return;
      (isCompleted(anime) ? completed : active).push(row);
    });
    return { active: sortedRows(active), completed: sortedRows(completed) };
  }

  function addPoster(container, anime) {
    if (anime?.poster?.src) {
      const img = document.createElement('img');
      img.src = anime.poster.src;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.style.objectPosition = anime.poster.position || 'center center';
      img.addEventListener('error', () => {
        container.replaceChildren(document.createTextNode('?'));
      });
      container.appendChild(img);
    } else {
      container.textContent = '?';
    }
  }

  function createListRow(row, rankNumber = null, completed = false) {
    const anime = animeById.get(row.anime_id);
    const t = copy[lang()] || copy.ko;
    const link = document.createElement('a');
    link.className = `wishlist-rank-item${completed ? ' is-completed' : ''}`;
    link.href = `/anime/${encodeURIComponent(anime.id)}/?lang=${lang()}`;

    const rank = document.createElement('span');
    rank.className = 'wishlist-rank-number';
    rank.textContent = rankNumber === null ? '—' : String(rankNumber).padStart(2, '0');

    const poster = document.createElement('span');
    poster.className = 'wishlist-rank-poster';
    addPoster(poster, anime);

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

    const tail = document.createElement('span');
    tail.className = 'wishlist-rank-tail';
    if (completed) {
      const badge = document.createElement('span');
      badge.className = 'wishlist-rank-completed';
      badge.textContent = t.completed;
      tail.appendChild(badge);
    }
    const count = document.createElement('span');
    count.className = 'wishlist-rank-count';
    count.textContent = `♥ ${row.wishlist_count}`;
    count.setAttribute('aria-label', `${row.wishlist_count} ${t.saved}`);
    tail.appendChild(count);

    link.append(rank, poster, copyWrap, tail);
    return link;
  }

  function createPodiumCard(row, rankNumber) {
    const anime = animeById.get(row.anime_id);
    const t = copy[lang()] || copy.ko;
    const link = document.createElement('a');
    link.className = `wishlist-podium-card rank-${rankNumber}`;
    link.href = `/anime/${encodeURIComponent(anime.id)}/?lang=${lang()}`;

    const rank = document.createElement('span');
    rank.className = 'wishlist-podium-rank';
    rank.textContent = String(rankNumber).padStart(2, '0');

    const poster = document.createElement('span');
    poster.className = 'wishlist-podium-poster';
    addPoster(poster, anime);

    const body = document.createElement('span');
    body.className = 'wishlist-podium-body';
    const strong = document.createElement('strong');
    strong.className = 'wishlist-podium-title';
    strong.textContent = title(anime);
    const meta = document.createElement('span');
    meta.className = 'wishlist-podium-meta';
    const y = year(anime);
    meta.textContent = y ? String(y) : '—';
    const count = document.createElement('span');
    count.className = 'wishlist-podium-count';
    count.textContent = `♥ ${row.wishlist_count}`;
    count.setAttribute('aria-label', `${row.wishlist_count} ${t.saved}`);
    body.append(strong, meta, count);

    link.append(rank, poster, body);
    return link;
  }

  function renderEmpty() {
    const t = copy[lang()] || copy.ko;
    const empty = document.createElement('div');
    empty.className = 'wishlist-ranking-empty';
    empty.textContent = t.empty;
    list.appendChild(empty);
  }

  function render() {
    if (!section || !list) return;
    localize();
    const { active, completed } = splitRows();

    list.replaceChildren();
    podium?.replaceChildren();

    if (!active.length) {
      renderEmpty();
    } else if (fullMode) {
      const top = active.slice(0, 3);
      top.forEach((row, index) => podium.appendChild(createPodiumCard(row, index + 1)));
      active.slice(3).forEach((row, index) => list.appendChild(createListRow(row, index + 4)));
      list.hidden = active.length <= 3;
    } else {
      active.slice(0, 5).forEach((row, index) => list.appendChild(createListRow(row, index + 1)));
      list.hidden = false;
    }

    if (fullMode && retired && retiredList) {
      retiredList.replaceChildren();
      completed.forEach(row => retiredList.appendChild(createListRow(row, null, true)));
      retired.hidden = completed.length === 0;
    }
  }

  async function getClient() {
    if (window.NewAnimeAuth?.client) return window.NewAnimeAuth.client;
    try { await window.NewAnimeAuthBootstrap?.ready; } catch (_) {}
    if (window.NewAnimeAuth?.client) return window.NewAnimeAuth.client;

    const config = window.NEWANIME_AUTH_CONFIG || {};
    if (window.supabase?.createClient && config.supabaseUrl && config.supabaseAnonKey) {
      if (!window.NewAnimeWishlistRankingClient) {
        window.NewAnimeWishlistRankingClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
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
    if (['ko', 'ja', 'en'].includes(requested)) document.documentElement.lang = requested;

    document.getElementById('languageSwitcher')?.addEventListener('click', event => {
      const button = event.target.closest('[data-lang]');
      if (!button) return;
      const next = button.dataset.lang;
      if (!['ko', 'ja', 'en'].includes(next)) return;
      document.documentElement.lang = next;
      document.querySelectorAll('#languageSwitcher [data-lang]').forEach(node => node.classList.toggle('active', node.dataset.lang === next));
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
      document.dispatchEvent(new CustomEvent('newanime:language', { detail: { lang: next } }));
      render();
    });
  }

  document.addEventListener('newanime:language', render);
  load();
})();
