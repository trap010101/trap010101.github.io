// Keeps update titles linked to the static anime detail pages after client-side filtering/rerendering.
// Also restores the SEO-focused metadata after the legacy localization renderer runs.
(() => {
  if (!Array.isArray(window.animeUpdates) || !Array.isArray(window.animeData)) return;

  const animeById = new Map(window.animeData.map(anime => [anime?.id, anime]).filter(([id]) => Boolean(id)));
  const updateAnimeId = new Map(window.animeUpdates.map(update => [update?.id, update?.animeId]).filter(([id, animeId]) => Boolean(id && animeId)));

  const seoCopy = {
    ko: {
      title: '애니메이션 최근 업데이트 | 방영일·PV·스트리밍 - NewAnime',
      description: '2026~2027년 방영 예정 애니메이션의 신규 등록, 방영일, PV, 공식 정보, 스트리밍 변경 내역을 공식 출처와 함께 확인하세요.',
      hero: '방영 예정 애니메이션의 신규 등록과 방영일, PV, 스트리밍 등 주요 변경 내역을 공식 출처와 함께 기록합니다.'
    },
    ja: {
      title: 'アニメ最新更新 | 放送日・PV・配信 - NewAnime',
      description: '2026〜2027年放送予定アニメの新規登録、放送日、PV、公式情報、配信情報の主な変更履歴を公式情報源とともに確認できます。',
      hero: '放送予定アニメの新規登録、放送日、PV、配信などの主な変更履歴を公式情報源とともに記録します。'
    },
    en: {
      title: 'Anime Updates | Release Dates, PVs & Streaming - NewAnime',
      description: 'Track notable changes to upcoming 2026–2027 anime, including new listings, release dates, PVs, official information, and streaming updates.',
      hero: 'Track notable changes to upcoming anime, including new listings, release dates, PVs, streaming information, and official-source updates.'
    }
  };

  const activeLanguage = () => {
    const value = document.documentElement.lang?.toLowerCase() || 'ko';
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };

  function linkEntries(root = document) {
    root.querySelectorAll('.update-item[data-update-id]').forEach(item => {
      const updateId = item.dataset.updateId;
      const animeId = updateAnimeId.get(updateId);
      const anime = animeById.get(animeId);
      if (!animeId || !anime?.release) return;

      const title = item.querySelector('.update-title-row h3');
      if (!title || title.querySelector('.update-anime-link')) return;

      const text = title.textContent.trim();
      if (!text) return;

      const link = document.createElement('a');
      link.className = 'update-anime-link';
      link.href = `/anime/${encodeURIComponent(animeId)}/?lang=${activeLanguage()}`;
      link.textContent = text;
      link.setAttribute('aria-label', `${text} 상세 정보`);
      title.textContent = '';
      title.appendChild(link);
    });
  }

  function applySeoCopy() {
    const lang = activeLanguage();
    const copy = seoCopy[lang] || seoCopy.ko;
    document.title = copy.title;
    document.getElementById('metaDescription')?.setAttribute('content', copy.description);
    document.getElementById('ogTitle')?.setAttribute('content', copy.title);
    document.getElementById('ogDescription')?.setAttribute('content', copy.description);
    document.getElementById('twitterTitle')?.setAttribute('content', copy.title);
    document.getElementById('twitterDescription')?.setAttribute('content', copy.description);
    const hero = document.getElementById('updatesDescription');
    if (hero) hero.textContent = copy.hero;
  }

  const list = document.getElementById('updatesList');
  linkEntries(list || document);
  applySeoCopy();

  if (list) {
    new MutationObserver(() => linkEntries(list)).observe(list, { childList: true, subtree: true });
  }

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => setTimeout(() => {
      linkEntries(list || document);
      applySeoCopy();
    }, 0));
  });
})();
