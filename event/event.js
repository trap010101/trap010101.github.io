(() => {
  'use strict';

  const LANGS = ['ko','ja','en'];
  const TIMEZONE = 'Asia/Seoul';
  const view = document.body.dataset.eventView || 'list';
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang');

  const copy = {
    ko: {
      pageTitleList:'이벤트 - NewAnime', pageTitleDetail:'이벤트 상세 - NewAnime',
      heroTitle:'이벤트', heroDesc:'NewAnime에서 진행 중이거나 공지된 이벤트를 확인할 수 있습니다.',
      empty:'현재 공개된 이벤트가 없습니다.', loading:'이벤트를 불러오는 중입니다…', loadError:'이벤트 정보를 불러오지 못했습니다.',
      period:'기간', announced:'공지', statusUpcoming:'진행 예정', statusLive:'진행 중', statusEnded:'종료',
      back:'이벤트 목록으로', condition:'참여 조건', participate:'참여하기', checking:'참여 조건 확인 중…',
      loginRequired:'로그인 후 참여할 수 있습니다.', conditionUnmet:'아직 참여 조건을 충족하지 않았습니다.', ended:'이 이벤트는 종료되었습니다.', notStarted:'이벤트 시작 전입니다.',
      emailLabel:'이메일 주소', emailPlaceholder:'당첨 안내를 받을 이메일 주소', complete:'완료하기', update:'수정 완료',
      consentTitle:'개인정보 수집·이용 동의 (필수)', consentItems:'수집 항목: 이메일 주소, 계정 식별자, 이벤트 식별자, 제출·수정 시각',
      consentPurpose:'이용 목적', consentRetention:'보유 기간', consentRefusal:'동의를 거부할 수 있으나, 거부 시 이벤트 응모가 불가능합니다.', privacy:'개인정보처리방침',
      success:'이벤트 참여가 완료되었습니다.', successDesc:'등록한 이메일 주소로 이벤트 관련 안내가 전달될 수 있습니다.', rewrite:'이메일 주소 재작성', return:'돌아가기',
      invalidEmail:'올바른 이메일 주소를 입력해 주세요.', consentRequired:'개인정보 수집·이용 동의가 필요합니다.', duplicateEmail:'이미 이 이벤트에 사용된 이메일 주소입니다.', submitError:'응모 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      eventMissing:'이벤트를 찾을 수 없거나 아직 공개되지 않았습니다.', menu:'메뉴', share:'공유', contact:'문의', updates:'업데이트', shareCopied:'링크를 복사했습니다.'
    },
    ja: {
      pageTitleList:'イベント - NewAnime', pageTitleDetail:'イベント詳細 - NewAnime',
      heroTitle:'イベント', heroDesc:'NewAnimeで開催中、または告知済みのイベントを確認できます。',
      empty:'現在公開中のイベントはありません。', loading:'イベントを読み込んでいます…', loadError:'イベント情報を読み込めませんでした。',
      period:'期間', announced:'告知', statusUpcoming:'開催予定', statusLive:'開催中', statusEnded:'終了',
      back:'イベント一覧へ', condition:'参加条件', participate:'参加する', checking:'参加条件を確認しています…',
      loginRequired:'ログイン後に参加できます。', conditionUnmet:'参加条件をまだ満たしていません。', ended:'このイベントは終了しました。', notStarted:'イベント開始前です。',
      emailLabel:'メールアドレス', emailPlaceholder:'案内を受け取るメールアドレス', complete:'完了する', update:'変更を保存',
      consentTitle:'個人情報の収集・利用への同意（必須）', consentItems:'収集項目：メールアドレス、アカウント識別子、イベント識別子、送信・更新日時',
      consentPurpose:'利用目的', consentRetention:'保有期間', consentRefusal:'同意を拒否できますが、その場合イベントへの応募はできません。', privacy:'プライバシーポリシー',
      success:'イベントへの参加が完了しました。', successDesc:'登録したメールアドレス宛にイベントに関する案内が届く場合があります。', rewrite:'メールアドレスを再入力', return:'戻る',
      invalidEmail:'有効なメールアドレスを入力してください。', consentRequired:'個人情報の収集・利用への同意が必要です。', duplicateEmail:'このイベントですでに使用されているメールアドレスです。', submitError:'応募情報を保存できませんでした。もう一度お試しください。',
      eventMissing:'イベントが見つからないか、まだ公開されていません。', menu:'メニュー', share:'共有', contact:'お問い合わせ', updates:'更新', shareCopied:'リンクをコピーしました。'
    },
    en: {
      pageTitleList:'Events - NewAnime', pageTitleDetail:'Event details - NewAnime',
      heroTitle:'Events', heroDesc:'View current and announced NewAnime events.',
      empty:'There are no published events right now.', loading:'Loading events…', loadError:'Could not load event information.',
      period:'Period', announced:'Announced', statusUpcoming:'Upcoming', statusLive:'Live', statusEnded:'Ended',
      back:'Back to events', condition:'Eligibility', participate:'Participate', checking:'Checking eligibility…',
      loginRequired:'Sign in to participate.', conditionUnmet:'You do not meet the participation requirements yet.', ended:'This event has ended.', notStarted:'This event has not started yet.',
      emailLabel:'Email address', emailPlaceholder:'Email address for winner/contact notices', complete:'Complete', update:'Save changes',
      consentTitle:'Consent to collection and use of personal information (required)', consentItems:'Collected data: email address, account identifier, event identifier, submission and update timestamps',
      consentPurpose:'Purpose', consentRetention:'Retention period', consentRefusal:'You may refuse consent, but you cannot enter the event without it.', privacy:'Privacy Policy',
      success:'Your event entry is complete.', successDesc:'Event-related notices may be sent to the email address you registered.', rewrite:'Rewrite email address', return:'Back',
      invalidEmail:'Enter a valid email address.', consentRequired:'Consent to personal information collection and use is required.', duplicateEmail:'This email address is already used for this event.', submitError:'Could not save your entry. Please try again.',
      eventMissing:'This event could not be found or has not been published yet.', menu:'Menu', share:'Share', contact:'Contact', updates:'Updates', shareCopied:'Link copied.'
    }
  };

  function storedLang() {
    try { return localStorage.getItem('animeScheduleLang'); } catch (_) { return null; }
  }
  function detectLang() {
    const value = String(navigator.language || '').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('ko') ? 'ko' : 'en';
  }
  if (!LANGS.includes(lang)) lang = LANGS.includes(storedLang()) ? storedLang() : detectLang();
  const t = key => copy[lang]?.[key] || copy.ko[key] || key;
  const localized = (event, field) => event?.[`${field}_${lang}`] || event?.[`${field}_ko`] || '';

  function escapeHtml(value) {
    return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function formatDateTime(value) {
    if (!value) return '-';
    const date = new Date(value);
    const locale = lang === 'ja' ? 'ja-JP' : lang === 'en' ? 'en-US' : 'ko-KR';
    return `${new Intl.DateTimeFormat(locale, {
      timeZone: TIMEZONE, year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', hour12:false
    }).format(date)} KST`;
  }

  function formatPeriod(event) {
    return `${formatDateTime(event.starts_at)} — ${formatDateTime(event.ends_at)}`;
  }

  function statusFor(event) {
    const now = Date.now();
    const start = new Date(event.starts_at).getTime();
    const end = new Date(event.ends_at).getTime();
    if (now < start) return { key:'statusUpcoming', className:'' };
    if (now > end) return { key:'statusEnded', className:'is-ended' };
    return { key:'statusLive', className:'is-live' };
  }

  function setLanguage(next, updateUrl = true) {
    lang = LANGS.includes(next) ? next : 'ko';
    try { localStorage.setItem('animeScheduleLang', lang); } catch (_) {}
    document.documentElement.lang = lang;
    document.querySelectorAll('#languageSwitcher [data-lang]').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('brandLink')?.setAttribute('href', `/?lang=${lang}`);
    document.getElementById('updatesMenuLink')?.setAttribute('href', `/updates/?lang=${lang}`);
    document.getElementById('eventMenuLink')?.setAttribute('href', `/event/?lang=${lang}`);
    document.getElementById('aboutFooterLink')?.setAttribute('href', `/about/?lang=${lang}`);
    document.getElementById('privacyFooterLink')?.setAttribute('href', `/privacy/?lang=${lang}`);
    document.getElementById('policyFooterLink')?.setAttribute('href', `/policy/?lang=${lang}`);
    const heroTitle = document.getElementById('eventHeroTitle');
    const heroDesc = document.getElementById('eventHeroDescription');
    if (heroTitle) heroTitle.textContent = t('heroTitle');
    if (heroDesc) heroDesc.textContent = t('heroDesc');
    document.getElementById('updatesMenuLabel') && (document.getElementById('updatesMenuLabel').textContent = t('updates'));
    document.getElementById('contactMenuLabel') && (document.getElementById('contactMenuLabel').textContent = t('contact'));
    document.getElementById('shareMenuLabel') && (document.getElementById('shareMenuLabel').textContent = t('share'));
    document.getElementById('menuToggle')?.setAttribute('aria-label', t('menu'));
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
    document.dispatchEvent(new CustomEvent('newanime:language'));
    document.title = view === 'detail' ? t('pageTitleDetail') : t('pageTitleList');
  }

  function setupMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('siteMenu');
    const wrap = document.querySelector('.menu-wrap');
    const close = () => {
      menu?.classList.add('hidden');
      toggle?.setAttribute('aria-expanded','false');
    };
    toggle?.addEventListener('click', event => {
      event.stopPropagation();
      const open = menu?.classList.contains('hidden');
      menu?.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', event => { if (wrap && !wrap.contains(event.target)) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    document.getElementById('shareButton')?.addEventListener('click', async () => {
      close();
      const data = { title:document.title, text:document.querySelector('meta[name="description"]')?.content || 'NewAnime', url:location.href };
      try {
        if (navigator.share) await navigator.share(data);
        else {
          await navigator.clipboard.writeText(location.href);
          const status = document.getElementById('shareStatus');
          if (status) {
            status.textContent = t('shareCopied');
            status.classList.remove('hidden');
            setTimeout(() => status.classList.add('hidden'), 1800);
          }
        }
      } catch (_) {}
    });
  }

  async function getClient() {
    try {
      if (!window.NewAnimeAuthBootstrap?.ready) return null;
      await window.NewAnimeAuthBootstrap.ready;
      return window.NewAnimeAuth?.client || null;
    } catch (error) {
      console.warn('Event data client could not initialize.', error);
      return null;
    }
  }

  async function renderList() {
    const host = document.getElementById('eventList');
    if (!host) return;
    host.innerHTML = `<div class="event-loading">${escapeHtml(t('loading'))}</div>`;
    const client = await getClient();
    if (!client) {
      host.innerHTML = `<div class="event-error">${escapeHtml(t('loadError'))}</div>`;
      return;
    }
    const { data, error } = await client.from('event_definitions').select('*').order('announcement_at', { ascending:false });
    if (error) {
      console.warn('Event list query failed.', error);
      host.innerHTML = `<div class="event-error">${escapeHtml(t('loadError'))}</div>`;
      return;
    }
    if (!data?.length) {
      host.innerHTML = `<div class="event-empty">${escapeHtml(t('empty'))}</div>`;
      return;
    }
    host.innerHTML = data.map(event => {
      const status = statusFor(event);
      const href = `/event/detail/?id=${encodeURIComponent(event.id)}&lang=${lang}`;
      return `<a class="event-card" href="${href}">
        <div class="event-card-main">
          <div class="event-card-topline"><span class="event-status ${status.className}">${escapeHtml(t(status.key))}</span></div>
          <h2 class="event-card-title">${escapeHtml(localized(event,'title'))}</h2>
          <dl class="event-card-meta">
            <dt>${escapeHtml(t('period'))}</dt><dd>${escapeHtml(formatPeriod(event))}</dd>
            <dt>${escapeHtml(t('announced'))}</dt><dd>${escapeHtml(formatDateTime(event.announcement_at))}</dd>
          </dl>
        </div>
        <span class="event-card-arrow" aria-hidden="true">›</span>
      </a>`;
    }).join('');
  }

  async function renderDetail() {
    const host = document.getElementById('eventDetail');
    if (!host) return;
    const id = new URLSearchParams(location.search).get('id');
    if (!id) {
      host.innerHTML = `<div class="event-error">${escapeHtml(t('eventMissing'))}</div>`;
      return;
    }
    host.innerHTML = `<div class="event-loading">${escapeHtml(t('loading'))}</div>`;
    const client = await getClient();
    if (!client) {
      host.innerHTML = `<div class="event-error">${escapeHtml(t('loadError'))}</div>`;
      return;
    }
    const { data:event, error } = await client.from('event_definitions').select('*').eq('id', id).maybeSingle();
    if (error || !event) {
      host.innerHTML = `<div class="event-error">${escapeHtml(t('eventMissing'))}</div>`;
      return;
    }

    const status = statusFor(event);
    document.title = `${localized(event,'title')} - NewAnime`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', localized(event,'description').slice(0,150));
    host.innerHTML = `<article class="event-detail-panel">
      <a class="event-back-link" href="/event/?lang=${lang}">‹ ${escapeHtml(t('back'))}</a>
      <div class="event-detail-topline"><span class="event-status ${status.className}">${escapeHtml(t(status.key))}</span></div>
      <h1 class="event-detail-title">${escapeHtml(localized(event,'title'))}</h1>
      <div class="event-detail-meta">
        <div class="event-meta-box"><span>${escapeHtml(t('period'))}</span><strong>${escapeHtml(formatPeriod(event))}</strong></div>
        <div class="event-meta-box"><span>${escapeHtml(t('announced'))}</span><strong>${escapeHtml(formatDateTime(event.announcement_at))}</strong></div>
      </div>
      <div class="event-description">${escapeHtml(localized(event,'description'))}</div>
      ${localized(event,'condition') ? `<div class="event-condition"><strong>${escapeHtml(t('condition'))}</strong><br>${escapeHtml(localized(event,'condition'))}</div>` : ''}
      <div class="event-action-panel" id="eventActionPanel"></div>
    </article>`;

    const actionPanel = document.getElementById('eventActionPanel');
    let currentEntry = null;
    let currentUser = null;
    let eligible = false;

    const loadState = async () => {
      const { data:sessionData } = await client.auth.getSession();
      currentUser = sessionData?.session?.user || null;
      currentEntry = null;
      eligible = false;

      if (currentUser) {
        const { data:entry } = await client.from('event_entries').select('*').eq('event_id', event.id).eq('user_id', currentUser.id).maybeSingle();
        currentEntry = entry || null;
      }

      const now = Date.now();
      const active = now >= new Date(event.starts_at).getTime() && now <= new Date(event.ends_at).getTime();
      if (active && currentUser) {
        if (event.eligibility_type === 'wishlist_count') {
          const { count, error:countError } = await client.from('wishlist').select('anime_id', { count:'exact', head:true }).eq('user_id', currentUser.id);
          eligible = !countError && Number(count || 0) >= Number(event.eligibility_value || 0);
        } else {
          eligible = true;
        }
      }
      renderAction();
    };

    const showForm = () => {
      const existingEmail = currentEntry?.email || currentUser?.email || '';
      actionPanel.innerHTML = `<form class="event-form" id="eventEntryForm" novalidate>
        <label for="eventEmail">${escapeHtml(t('emailLabel'))}</label>
        <input class="event-email" id="eventEmail" name="email" type="email" autocomplete="email" maxlength="320" required placeholder="${escapeHtml(t('emailPlaceholder'))}" value="${escapeHtml(existingEmail)}" />
        <label class="event-consent">
          <input id="eventConsent" type="checkbox" required />
          <span><strong>${escapeHtml(t('consentTitle'))}</strong><br>${escapeHtml(t('consentItems'))}<br><strong>${escapeHtml(t('consentPurpose'))}:</strong> ${escapeHtml(localized(event,'consent_purpose'))}<br><strong>${escapeHtml(t('consentRetention'))}:</strong> ${escapeHtml(localized(event,'retention'))}<br>${escapeHtml(t('consentRefusal'))} <a href="/privacy/?lang=${lang}" target="_blank" rel="noopener noreferrer">${escapeHtml(t('privacy'))}</a></span>
        </label>
        <div class="event-form-status" id="eventFormStatus" role="status" aria-live="polite"></div>
        <button class="event-primary" type="submit">${escapeHtml(currentEntry ? t('update') : t('complete'))}</button>
      </form>`;

      document.getElementById('eventEntryForm').addEventListener('submit', async submitEvent => {
        submitEvent.preventDefault();
        const emailInput = document.getElementById('eventEmail');
        const consent = document.getElementById('eventConsent');
        const statusNode = document.getElementById('eventFormStatus');
        const submit = submitEvent.submitter;
        const email = emailInput.value.trim().toLowerCase();
        if (!emailInput.checkValidity()) { statusNode.textContent = t('invalidEmail'); emailInput.focus(); return; }
        if (!consent.checked) { statusNode.textContent = t('consentRequired'); consent.focus(); return; }
        submit.disabled = true;
        statusNode.textContent = '';
        const payload = {
          event_id:event.id,
          user_id:currentUser.id,
          email,
          consent_version:event.consent_version,
          consented_at:new Date().toISOString(),
          updated_at:new Date().toISOString()
        };
        const { data:saved, error:saveError } = await client.from('event_entries').upsert(payload, { onConflict:'event_id,user_id' }).select('*').single();
        submit.disabled = false;
        if (saveError) {
          statusNode.textContent = saveError.code === '23505' ? t('duplicateEmail') : t('submitError');
          console.warn('Event entry save failed.', saveError);
          return;
        }
        currentEntry = saved;
        renderAction();
      });
    };

    const renderAction = () => {
      if (currentEntry) {
        actionPanel.innerHTML = `<div class="event-complete">
          <h2>${escapeHtml(t('success'))}</h2>
          <p>${escapeHtml(t('successDesc'))}</p>
          <p class="event-complete-email">${escapeHtml(currentEntry.email)}</p>
          <div class="event-complete-actions">
            <button class="event-secondary" id="rewriteEmailButton" type="button">${escapeHtml(t('rewrite'))}</button>
            <a class="event-secondary" href="/event/?lang=${lang}">${escapeHtml(t('return'))}</a>
          </div>
        </div>`;
        document.getElementById('rewriteEmailButton')?.addEventListener('click', showForm);
        return;
      }

      const now = Date.now();
      const start = new Date(event.starts_at).getTime();
      const end = new Date(event.ends_at).getTime();
      let note = '';
      if (now < start) note = t('notStarted');
      else if (now > end) note = t('ended');
      else if (!currentUser) note = t('loginRequired');
      else if (!eligible) note = t('conditionUnmet');

      actionPanel.innerHTML = `<button class="event-primary" id="participateButton" type="button" ${eligible ? '' : 'disabled'}>${escapeHtml(t('participate'))}</button>${note ? `<p class="event-action-note">${escapeHtml(note)}</p>` : ''}`;
      document.getElementById('participateButton')?.addEventListener('click', showForm);
    };

    document.addEventListener('newanime:auth', () => loadState());
    await loadState();
  }

  setupMenu();
  document.querySelectorAll('#languageSwitcher [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.lang, true);
      if (view === 'detail') renderDetail(); else renderList();
    });
  });
  setLanguage(lang, !LANGS.includes(params.get('lang')));
  if (view === 'detail') renderDetail(); else renderList();
})();
