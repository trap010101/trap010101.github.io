(() => {
  'use strict';

  const config = window.NEWANIME_AUTH_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !config.googleClientId || !window.supabase?.createClient || !window.google?.accounts?.id) return;

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  const VERIFIED_ACCOUNT_EMAILS = new Set([
    'admin@newani.me'
  ]);

  const copy = {
    ko: { login:'로그인', account:'계정', titleLogin:'간편 로그인', titleAccount:'내 계정', description:'Google 계정으로 간편하게 로그인할 수 있습니다. 로그인하면 위시리스트가 기기 간에 동기화됩니다.', logout:'로그아웃', close:'닫기', signingOut:'로그아웃 중…', error:'로그인 처리 중 문제가 발생했습니다.', verified:'인증된 계정' },
    ja: { login:'ログイン', account:'アカウント', titleLogin:'かんたんログイン', titleAccount:'アカウント', description:'Googleアカウントで簡単にログインできます。ログインするとウィッシュリストが端末間で同期されます。', logout:'ログアウト', close:'閉じる', signingOut:'ログアウト中…', error:'ログイン処理中に問題が発生しました。', verified:'認証済みアカウント' },
    en: { login:'LOGIN', account:'ACCOUNT', titleLogin:'Quick login', titleAccount:'Account', description:'Sign in quickly with Google. Your wishlist will stay synced across devices.', logout:'Sign out', close:'Close', signingOut:'Signing out…', error:'Something went wrong while processing sign-in.', verified:'Verified account' }
  };

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const text = key => copy[language()]?.[key] || copy.ko[key] || key;
  const escapeHtml = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const userName = user => user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || '';
  const normalizedEmail = user => String(user?.email || '').trim().toLowerCase();
  const isVerifiedUser = user => VERIFIED_ACCOUNT_EMAILS.has(normalizedEmail(user));
  const avatarUrl = user => {
    const value = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';
    if (!value) return '';
    try {
      const url = new URL(value, location.origin);
      return ['http:','https:'].includes(url.protocol) ? url.href : '';
    } catch (_) { return ''; }
  };

  const personSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5.5 19c.8-3.6 3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"></path></svg>';
  const verifiedSvg = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9"></circle><path d="m6.2 10.1 2.4 2.4 5.2-5.2"></path></svg>';
  const verifiedMark = (extraClass = '') => {
    const label = escapeHtml(text('verified'));
    return `<span class="auth-verified-mark${extraClass ? ` ${extraClass}` : ''}" role="img" aria-label="${label}" title="${label}">${verifiedSvg}</span>`;
  };

  const menu = document.getElementById('siteMenu');
  if (!menu) return;

  const menuButton = document.createElement('button');
  menuButton.className = 'site-menu-item auth-menu-item';
  menuButton.id = 'authMenuButton';
  menuButton.type = 'button';
  menuButton.setAttribute('role','menuitem');
  menuButton.innerHTML = `<span class="site-menu-icon auth-menu-icon" aria-hidden="true">${personSvg}</span><span class="auth-menu-content"></span>`;
  const wishlist = document.getElementById('wishlistMenuButton');
  menu.insertBefore(menuButton, wishlist || menu.firstChild);

  const header = menu.closest('.site-header');
  const menuWrap = menu.closest('.menu-wrap');
  const profileButton = document.createElement('button');
  profileButton.className = 'auth-header-profile hidden';
  profileButton.id = 'authHeaderProfile';
  profileButton.type = 'button';
  profileButton.setAttribute('aria-haspopup','dialog');
  profileButton.innerHTML = `<span class="auth-header-profile-fallback" aria-hidden="true">${personSvg}</span>`;
  if (header && menuWrap) header.insertBefore(profileButton, menuWrap);

  const modal = document.createElement('div');
  modal.className = 'auth-modal hidden';
  modal.id = 'authModal';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-labelledby','authModalTitle');
  modal.innerHTML = `<div class="auth-backdrop" data-auth-close></div><section class="auth-dialog" tabindex="-1"><div class="auth-dialog-head"><div><div class="auth-kicker">newani.me</div><h2 id="authModalTitle"></h2><p class="auth-description"></p></div><button class="auth-close" type="button" data-auth-close>×</button></div><div class="auth-body"></div><p class="auth-status" role="status" aria-live="polite"></p></section>`;
  document.body.appendChild(modal);

  const body = modal.querySelector('.auth-body');
  const status = modal.querySelector('.auth-status');
  const closeButton = modal.querySelector('.auth-close');
  let currentUser = null;

  async function handleGoogleCredential(response) {
    if (!response?.credential) { status.textContent = text('error'); return; }
    status.textContent = '';
    const { error } = await client.auth.signInWithIdToken({ provider:'google', token:response.credential });
    if (error) status.textContent = `${text('error')} ${error.message || ''}`.trim();
  }

  window.google.accounts.id.initialize({
    client_id: config.googleClientId,
    callback: handleGoogleCredential,
    auto_select: false,
    use_fedcm_for_button: false,
    button_auto_select: false
  });

  function renderGoogleButton() {
    const host = body.querySelector('[data-auth-google-host]');
    if (!host || currentUser) return;
    host.textContent = '';
    try {
      window.google.accounts.id.renderButton(host, {
        type: 'standard', theme: 'outline_dark', size: 'medium', shape: 'pill',
        text: 'continue_with', logo_alignment: 'left', width: 190
      });
      status.textContent = '';
    } catch (error) {
      console.warn('Google Identity Services button could not be rendered.', error);
      status.textContent = text('error');
    }
  }

  function render() {
    const menuContent = menuButton.querySelector('.auth-menu-content');
    if (currentUser) {
      const avatar = avatarUrl(currentUser), name = userName(currentUser), verified = isVerifiedUser(currentUser);
      menuButton.classList.add('hidden');
      profileButton.classList.remove('hidden');
      profileButton.innerHTML = `${avatar
        ? `<img class="auth-header-profile-avatar" src="${escapeHtml(avatar)}" alt="">`
        : `<span class="auth-header-profile-fallback" aria-hidden="true">${personSvg}</span>`}${verified ? verifiedMark('auth-header-verified') : ''}`;
      profileButton.setAttribute('aria-label', `${text('account')} · ${name}${verified ? ` · ${text('verified')}` : ''}`);
      profileButton.title = `${name || text('account')}${verified ? ` · ${text('verified')}` : ''}`;
      menuContent.innerHTML = avatar ? `<span class="auth-menu-user"><img class="auth-menu-avatar" src="${escapeHtml(avatar)}" alt=""><span class="auth-menu-name">${escapeHtml(name)}</span></span>` : `<span class="auth-menu-name">${text('account')}</span>`;
      menuButton.setAttribute('aria-label', `${text('account')} · ${name}`);
    } else {
      profileButton.classList.add('hidden');
      profileButton.innerHTML = `<span class="auth-header-profile-fallback" aria-hidden="true">${personSvg}</span>`;
      profileButton.removeAttribute('title');
      menuButton.classList.remove('hidden');
      menuContent.textContent = text('login');
      menuButton.setAttribute('aria-label', text('login'));
    }

    modal.querySelector('#authModalTitle').textContent = text(currentUser ? 'titleAccount' : 'titleLogin');
    modal.querySelector('.auth-description').textContent = currentUser ? '' : text('description');
    closeButton.setAttribute('aria-label', text('close'));
    closeButton.title = text('close');

    if (currentUser) {
      const avatar = avatarUrl(currentUser), name = userName(currentUser), verified = isVerifiedUser(currentUser);
      body.innerHTML = `<div class="auth-account">${avatar ? `<img class="auth-account-avatar" src="${escapeHtml(avatar)}" alt="">` : `<div class="auth-account-avatar auth-account-avatar-fallback" aria-hidden="true">${personSvg}</div>`}<div class="auth-account-copy"><div class="auth-account-name-row"><strong>${escapeHtml(name)}</strong>${verified ? verifiedMark() : ''}</div><span class="auth-account-email">${escapeHtml(currentUser.email || '')}</span></div></div><button class="auth-signout" type="button" data-auth-signout>${text('logout')}</button>`;
    } else {
      body.innerHTML = '<div class="auth-google-host" data-auth-google-host></div>';
      requestAnimationFrame(renderGoogleButton);
    }
  }

  function openModal() {
    status.textContent = '';
    render();
    modal.classList.remove('hidden');
    document.body.classList.add('auth-modal-open');
    menu.classList.add('hidden');
    document.getElementById('menuToggle')?.setAttribute('aria-expanded','false');
    requestAnimationFrame(() => { renderGoogleButton(); closeButton.focus(); });
  }
  function closeModal() {
    if (modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    document.body.classList.remove('auth-modal-open');
    (currentUser ? profileButton : document.getElementById('menuToggle'))?.focus();
  }
  async function signOut() {
    status.textContent = text('signingOut');
    const { error } = await client.auth.signOut();
    if (error) { status.textContent = text('error'); return; }
    window.google.accounts.id.disableAutoSelect();
  }
  function publishAuth(event, session) {
    currentUser = session?.user || null;
    render();
    document.dispatchEvent(new CustomEvent('newanime:auth',{ detail:{ event, user:currentUser, session:session || null, verified:isVerifiedUser(currentUser) } }));
  }

  menuButton.addEventListener('click', openModal);
  profileButton.addEventListener('click', openModal);
  modal.addEventListener('click', event => {
    if (event.target.closest('[data-auth-close]')) return closeModal();
    if (event.target.closest('[data-auth-signout]')) signOut();
  });
  modal.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
  document.addEventListener('newanime:language', render);
  client.auth.onAuthStateChange((event, session) => publishAuth(event, session));
  client.auth.getSession().then(({ data, error }) => error ? render() : publishAuth('INITIAL_SESSION', data.session || null));

  window.NewAnimeAuth = Object.freeze({ client, getUser:() => currentUser, isVerified:() => isVerifiedUser(currentUser), signIn:openModal, signOut });
  render();
})();