(() => {
  'use strict';

  const detail = window.ANIME_DETAIL;
  const config = window.NEWANIME_AUTH_CONFIG || {};
  const wishlist = window.NewAnimeWishlist;
  if (!detail?.id || !config.supabaseUrl || !config.supabaseAnonKey || !window.supabase?.createClient || !wishlist) return;

  const copy = {
    ko:{ login:'로그인', account:'계정', title:'간편 로그인', titleAccount:'내 계정', logout:'로그아웃', close:'닫기', add:'위시리스트에 추가', remove:'위시리스트에서 제거', description:'Google 계정으로 간편하게 로그인할 수 있습니다. 로그인하면 위시리스트가 기기 간에 동기화됩니다.', error:'Google 로그인에 실패했습니다.' },
    ja:{ login:'ログイン', account:'アカウント', title:'かんたんログイン', titleAccount:'アカウント', logout:'ログアウト', close:'閉じる', add:'ウィッシュリストに追加', remove:'ウィッシュリストから削除', description:'Googleアカウントで簡単にログインできます。ログインするとウィッシュリストが端末間で同期されます。', error:'Googleログインに失敗しました。' },
    en:{ login:'LOGIN', account:'ACCOUNT', title:'Quick login', titleAccount:'Account', logout:'Sign out', close:'Close', add:'Add to wishlist', remove:'Remove from wishlist', description:'Sign in quickly with Google. Your wishlist will stay synced across devices.', error:'Google sign-in failed.' }
  };

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const text = key => copy[language()]?.[key] || copy.ko[key] || key;
  const escapeHtml = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const userName = user => user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || '';
  const avatarUrl = user => {
    const value = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';
    if (!value) return '';
    try { const url = new URL(value, location.origin); return ['http:','https:'].includes(url.protocol) ? url.href : ''; }
    catch (_) { return ''; }
  };

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
  });
  let currentUser = null;

  const heartSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>';
  const personSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5.5 19c.8-3.6 3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"></path></svg>';

  const posterWrap = document.querySelector('.detail-poster-wrap');
  const heart = document.createElement('button');
  heart.type = 'button';
  heart.className = 'detail-wishlist-toggle';
  heart.innerHTML = heartSvg;
  posterWrap?.appendChild(heart);

  function renderHeart() {
    const active = wishlist.has(detail.id);
    heart.classList.toggle('is-active', active);
    heart.setAttribute('aria-pressed', String(active));
    heart.setAttribute('aria-label', text(active ? 'remove' : 'add'));
    heart.title = text(active ? 'remove' : 'add');
  }
  heart.addEventListener('click', () => wishlist.toggle(detail.id));
  document.addEventListener('newanime:wishlist', renderHeart);

  const headerActions = document.querySelector('.detail-header-actions');
  if (!headerActions) return;
  const accountButton = document.createElement('button');
  accountButton.type = 'button';
  accountButton.className = 'detail-account-button';
  accountButton.innerHTML = `<span class="detail-account-icon">${personSvg}</span><span class="detail-account-label"></span>`;
  headerActions.insertBefore(accountButton, headerActions.querySelector('.detail-share'));

  const modal = document.createElement('div');
  modal.className = 'detail-account-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="detail-account-backdrop" data-detail-account-close></div><section class="detail-account-dialog" role="dialog" aria-modal="true" aria-labelledby="detailAccountTitle" tabindex="-1"><div class="detail-account-head"><div><div class="detail-account-kicker">newani.me</div><h2 id="detailAccountTitle"></h2><p class="detail-account-description"></p></div><button class="detail-account-close" type="button" data-detail-account-close>×</button></div><div class="detail-account-body"></div><p class="detail-account-status" role="status" aria-live="polite"></p></section>`;
  document.body.appendChild(modal);
  const modalBody = modal.querySelector('.detail-account-body');
  const status = modal.querySelector('.detail-account-status');

  async function handleCredential(response) {
    if (!response?.credential) return;
    status.textContent = '';
    const { error } = await client.auth.signInWithIdToken({ provider:'google', token:response.credential });
    if (error) status.textContent = `${text('error')} ${error.message || ''}`.trim();
  }

  window.google.accounts.id.initialize({
    client_id: config.googleClientId,
    callback: handleCredential,
    ux_mode: 'popup',
    use_fedcm_for_button: false,
    button_auto_select: false
  });

  function renderGoogleButton() {
    const slot = modal.querySelector('[data-detail-google]');
    if (!slot || currentUser || !window.google?.accounts?.id || !config.googleClientId) return;
    slot.textContent = '';
    try {
      window.google.accounts.id.renderButton(slot, {
        type:'standard', theme:'outline_dark', size:'medium', shape:'pill',
        text:'continue_with', logo_alignment:'left', width:190
      });
      status.textContent = '';
    } catch (_) { status.textContent = text('error'); }
  }

  function renderAccount() {
    const label = accountButton.querySelector('.detail-account-label');
    const icon = accountButton.querySelector('.detail-account-icon');
    modal.querySelector('#detailAccountTitle').textContent = currentUser ? text('titleAccount') : text('title');
    modal.querySelector('.detail-account-description').textContent = currentUser ? '' : text('description');
    modal.querySelector('.detail-account-close').setAttribute('aria-label', text('close'));

    if (currentUser) {
      const avatar = avatarUrl(currentUser), name = userName(currentUser);
      label.textContent = name || text('account');
      icon.innerHTML = avatar ? `<img src="${escapeHtml(avatar)}" alt="">` : personSvg;
      accountButton.setAttribute('aria-label', `${text('account')} · ${name}`);
      modalBody.innerHTML = `<div class="detail-account-profile">${avatar ? `<img src="${escapeHtml(avatar)}" alt="">` : `<span class="detail-account-profile-fallback">${personSvg}</span>`}<div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(currentUser.email || '')}</span></div></div><button class="detail-account-signout" type="button" data-detail-signout>${text('logout')}</button>`;
    } else {
      icon.innerHTML = personSvg;
      label.textContent = text('login');
      accountButton.setAttribute('aria-label', text('login'));
      modalBody.innerHTML = '<div class="detail-google-slot" data-detail-google></div>';
      requestAnimationFrame(renderGoogleButton);
    }
  }

  function openModal() {
    status.textContent = '';
    renderAccount();
    modal.hidden = false;
    document.body.classList.add('detail-account-open');
    requestAnimationFrame(() => { modal.querySelector('.detail-account-close')?.focus(); renderGoogleButton(); });
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('detail-account-open');
    accountButton.focus();
  }

  accountButton.addEventListener('click', openModal);
  modal.addEventListener('click', async event => {
    if (event.target.closest('[data-detail-account-close]')) return closeModal();
    if (event.target.closest('[data-detail-signout]')) {
      const { error } = await client.auth.signOut();
      if (error) status.textContent = error.message || text('error');
    }
  });
  modal.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

  function publishAuth(event, session) {
    currentUser = session?.user || null;
    renderAccount();
    renderHeart();
    document.dispatchEvent(new CustomEvent('newanime:auth',{ detail:{ event, user:currentUser, session:session || null } }));
  }

  client.auth.onAuthStateChange((event, session) => publishAuth(event, session));
  client.auth.getSession().then(({ data }) => publishAuth('INITIAL_SESSION', data?.session || null));
  document.addEventListener('newanime:language', () => { renderAccount(); renderHeart(); });
  document.querySelectorAll('.detail-language [data-lang]').forEach(btn => btn.addEventListener('click', () => requestAnimationFrame(() => { renderAccount(); renderHeart(); })));

  window.NewAnimeAuth = Object.freeze({ client, getUser:() => currentUser, signOut:() => client.auth.signOut() });
  renderHeart();
  renderAccount();
})();