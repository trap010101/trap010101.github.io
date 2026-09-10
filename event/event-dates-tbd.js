(() => {
  'use strict';

  const labels = { ko: '미정', ja: '未定', en: 'TBD' };
  const getLang = () => {
    const value = String(document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const label = () => labels[getLang()] || labels.ko;
  let client = null;
  let tbdIds = new Set();
  let observer = null;
  let applying = false;

  async function getClient() {
    if (client) return client;
    try {
      await window.NewAnimeAuthBootstrap?.ready;
      client = window.NewAnimeAuth?.client || null;
      return client;
    } catch (_) {
      return null;
    }
  }

  function eventIdFromCard(card) {
    try {
      const url = new URL(card.getAttribute('href') || '', location.origin);
      return url.searchParams.get('id');
    } catch (_) {
      return null;
    }
  }

  function applyToList() {
    document.querySelectorAll('.event-card').forEach(card => {
      const id = eventIdFromCard(card);
      if (!id || !tbdIds.has(id)) return;
      card.querySelectorAll('.event-card-meta dd').forEach(node => {
        if (node.textContent !== label()) node.textContent = label();
      });
    });
  }

  function applyToDetail() {
    const id = new URLSearchParams(location.search).get('id');
    if (!id || !tbdIds.has(id)) return;
    document.querySelectorAll('.event-detail-meta .event-meta-box strong').forEach(node => {
      if (node.textContent !== label()) node.textContent = label();
    });
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      applyToList();
      applyToDetail();
    } finally {
      applying = false;
    }
  }

  async function load() {
    const db = await getClient();
    if (!db) return;
    const { data, error } = await db.from('event_definitions')
      .select('id,dates_tbd')
      .eq('dates_tbd', true);
    if (error) return;
    tbdIds = new Set((data || []).map(row => row.id));
    apply();
  }

  document.addEventListener('newanime:language', apply);
  document.addEventListener('newanime:auth', load);

  observer = new MutationObserver(() => apply());
  observer.observe(document.body, { childList: true, subtree: true });

  load();
})();
