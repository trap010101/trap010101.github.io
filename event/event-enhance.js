(() => {
  'use strict';

  const copy = {
    ko: {
      loginParticipate: '로그인하고 참여하기',
      wishlistProgress: (count, required) => `위시리스트 참여 조건 · ${count}/${required}`,
      wishlistReady: '참여 조건을 충족했습니다. 아래 참여하기 버튼을 눌러 응모를 완료하세요.',
      wishlistNeed: (remaining) => `위시리스트에 기대작을 ${remaining}개 더 추가하면 참여하기 버튼이 나타납니다.`,
      browseAnime: '기대작 찾아보기',
      entryLocked: '이벤트 종료 후에는 응모 정보를 수정할 수 없습니다.',
      loginHint: 'Google 계정으로 로그인하면 참여 조건을 확인하고 응모할 수 있습니다.',
      cancelled: '위시리스트가 참여 조건보다 적어져 이벤트 참여가 취소되었습니다.',
      cancelledDetail: '다시 3개 이상의 작품을 등록하면 이벤트에 다시 참여할 수 있습니다.',
      notice: '유의사항',
      completeEntry: '참여 완료'
    },
    ja: {
      loginParticipate: 'ログインして参加',
      wishlistProgress: (count, required) => `ウィッシュリスト参加条件 · ${count}/${required}`,
      wishlistReady: '参加条件を満たしています。下の参加ボタンから応募を完了してください。',
      wishlistNeed: (remaining) => `あと${remaining}作品をウィッシュリストに追加すると参加ボタンが表示されます。`,
      browseAnime: '作品を探す',
      entryLocked: 'イベント終了後は応募情報を変更できません。',
      loginHint: 'Googleアカウントでログインすると、参加条件を確認して応募できます。',
      cancelled: 'ウィッシュリストが参加条件を下回ったため、応募が取り消されました。',
      cancelledDetail: '3作品以上を再登録すると、もう一度応募できます。',
      notice: '注意事項',
      completeEntry: '参加完了'
    },
    en: {
      loginParticipate: 'Sign in to participate',
      wishlistProgress: (count, required) => `Wishlist eligibility · ${count}/${required}`,
      wishlistReady: 'You meet the requirement. Use the button below to complete your entry.',
      wishlistNeed: (remaining) => `Add ${remaining} more title${remaining === 1 ? '' : 's'} to make the participation button appear.`,
      browseAnime: 'Browse upcoming anime',
      entryLocked: 'Entry details cannot be changed after the event ends.',
      loginHint: 'Sign in with Google to check eligibility and enter.',
      cancelled: 'Your event entry was cancelled because your wishlist fell below the requirement.',
      cancelledDetail: 'Add at least three titles again to re-enter the event.',
      notice: 'Notes',
      completeEntry: 'Complete entry'
    }
  };

  const getLang = () => {
    const value = String(document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const t = key => copy[getLang()]?.[key] || copy.ko[key];
  const eventId = new URLSearchParams(location.search).get('id');
  let client = null;
  let definition = null;
  let currentUser = null;
  let wishlistCount = null;
  let refreshQueued = false;

  const escapeHtml = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const isActive = event => {
    if (!event) return false;
    const now = Date.now();
    return now >= new Date(event.starts_at).getTime() && now <= new Date(event.ends_at).getTime();
  };

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

  async function loadDefinition() {
    if (!eventId || definition) return definition;
    const db = await getClient();
    if (!db) return null;
    const { data } = await db.from('event_definitions')
      .select('id,status,starts_at,ends_at,eligibility_type,eligibility_value')
      .eq('id', eventId)
      .maybeSingle();
    definition = data || null;
    return definition;
  }

  async function loadUserAndProgress() {
    const db = await getClient();
    if (!db) return;
    const { data: sessionData } = await db.auth.getSession();
    currentUser = sessionData?.session?.user || null;
    wishlistCount = null;
    const event = await loadDefinition();
    if (!currentUser || event?.eligibility_type !== 'wishlist_count') return;
    const { count, error } = await db.from('wishlist')
      .select('anime_id', { count: 'exact', head: true })
      .eq('user_id', currentUser.id);
    if (!error) wishlistCount = Number(count || 0);
  }

  function syncCanonical() {
    if (document.body.dataset.eventView !== 'detail' || !eventId) return;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `${location.origin}/event/detail/?id=${encodeURIComponent(eventId)}`;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonical?.href || location.href;
  }

  function decorateNotice() {
    const heading = document.querySelector('.event-condition > strong');
    if (heading && heading.textContent !== t('notice')) heading.textContent = t('notice');
  }

  function renderProgress(panel) {
    if (!currentUser || definition?.eligibility_type !== 'wishlist_count' || wishlistCount === null || panel.querySelector('.event-complete')) {
      panel.querySelector('.event-eligibility-progress')?.remove();
      return;
    }

    const required = Math.max(0, Number(definition.eligibility_value || 0));
    const remaining = Math.max(0, required - wishlistCount);
    const key = `${getLang()}:${wishlistCount}:${required}:${remaining}`;
    let block = panel.querySelector('.event-eligibility-progress');
    if (block?.dataset.renderKey === key) return;

    if (!block) {
      block = document.createElement('div');
      block.className = 'event-eligibility-progress';
      panel.appendChild(block);
    }
    block.dataset.renderKey = key;
    block.classList.toggle('is-ready', remaining === 0);
    block.innerHTML = `
      <div class="event-progress-head">
        <strong>${escapeHtml(t('wishlistProgress')(wishlistCount, required))}</strong>
        <span>${escapeHtml(remaining === 0 ? t('wishlistReady') : t('wishlistNeed')(remaining))}</span>
      </div>
      <div class="event-progress-track" aria-hidden="true"><span style="width:${required > 0 ? Math.min(100, wishlistCount / required * 100) : 100}%"></span></div>
      ${remaining > 0 ? `<a class="event-browse-link" href="/?lang=${getLang()}">${escapeHtml(t('browseAnime'))} <span aria-hidden="true">→</span></a>` : ''}
    `;
  }

  function decorateForm(panel) {
    const form = panel.querySelector('#eventEntryForm');
    if (!form || form.dataset.activationEnhanced === 'true') return;
    const email = form.querySelector('#eventEmail');
    const submit = form.querySelector('button[type="submit"]');
    if (!email || !submit) return;

    const initialText = submit.textContent.trim();
    if (['완료하기', '完了する', 'Complete'].includes(initialText)) submit.textContent = t('completeEntry');

    const syncSubmit = () => {
      const hasValue = email.value.trim().length > 0;
      submit.disabled = !(hasValue && email.checkValidity());
    };

    form.dataset.activationEnhanced = 'true';
    email.addEventListener('input', syncSubmit);
    email.addEventListener('change', syncSubmit);
    syncSubmit();
  }

  async function reconcileCompletedEntry(panel) {
    if (!panel.querySelector('.event-complete')) return;
    if (!currentUser || definition?.eligibility_type !== 'wishlist_count' || wishlistCount === null) return;
    const required = Math.max(0, Number(definition.eligibility_value || 0));
    if (wishlistCount >= required || !isActive(definition)) return;

    const db = await getClient();
    if (!db) return;
    const { data: entry } = await db.from('event_entries')
      .select('event_id')
      .eq('event_id', definition.id)
      .eq('user_id', currentUser.id)
      .maybeSingle();
    if (entry) return;

    panel.innerHTML = `<div class="event-cancelled">
      <h2>${escapeHtml(t('cancelled'))}</h2>
      <p>${escapeHtml(t('cancelledDetail'))}</p>
      <a class="event-secondary" href="/?lang=${getLang()}">${escapeHtml(t('browseAnime'))}</a>
    </div>`;
  }

  function decorateActionPanel() {
    decorateNotice();
    const panel = document.getElementById('eventActionPanel');
    if (!panel || !definition) return;
    const button = panel.querySelector('#participateButton');
    const ended = Date.now() > new Date(definition.ends_at).getTime();

    if (button && isActive(definition) && !currentUser) {
      button.hidden = false;
      button.disabled = false;
      button.dataset.eventLoginCta = 'true';
      if (button.textContent !== t('loginParticipate')) button.textContent = t('loginParticipate');
      const note = panel.querySelector('.event-action-note');
      if (note && note.textContent !== t('loginHint')) note.textContent = t('loginHint');
    } else if (button && currentUser && definition.eligibility_type === 'wishlist_count' && wishlistCount !== null) {
      const required = Math.max(0, Number(definition.eligibility_value || 0));
      const eligible = isActive(definition) && wishlistCount >= required;
      button.hidden = !eligible;
      button.disabled = !eligible;
    }

    renderProgress(panel);
    decorateForm(panel);
    reconcileCompletedEntry(panel);

    const complete = panel.querySelector('.event-complete');
    if (complete && ended) {
      complete.querySelector('#rewriteEmailButton')?.remove();
      if (!complete.querySelector('.event-entry-locked')) {
        const note = document.createElement('p');
        note.className = 'event-entry-locked';
        note.textContent = t('entryLocked');
        complete.appendChild(note);
      }
    }
  }

  async function refresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    try {
      await loadDefinition();
      await loadUserAndProgress();
      decorateActionPanel();
      syncCanonical();
    } finally {
      refreshQueued = false;
    }
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest?.('[data-event-login-cta="true"]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    try {
      await window.NewAnimeAuthBootstrap?.ready;
      window.NewAnimeAuth?.signIn?.();
    } catch (_) {}
  }, true);

  const observer = new MutationObserver(mutations => {
    if (!document.getElementById('eventActionPanel')) return;
    const relevant = mutations.some(mutation => {
      if (mutation.target.closest?.('.event-eligibility-progress, .event-entry-locked, .event-cancelled')) return false;
      return true;
    });
    if (relevant) refresh();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('newanime:auth', () => {
    definition = null;
    refresh();
  });
  document.addEventListener('newanime:wishlist', () => {
    window.setTimeout(refresh, 80);
  });
  document.addEventListener('newanime:wishlist-sync', event => {
    if (!event.detail || ['synced', 'signed-out'].includes(event.detail.status)) window.setTimeout(refresh, 80);
  });
  document.addEventListener('newanime:language', () => {
    decorateActionPanel();
    syncCanonical();
  });

  syncCanonical();
  refresh();
})();
