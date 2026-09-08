(() => {
  'use strict';

  const config = window.NEWANIME_AUTH_CONFIG || {};
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey);
  if (!configured || !window.supabase?.createClient) return;

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  });

  const copy = {
    ko: {
      login: '로그인', account: '계정', titleLogin: '간편 로그인', titleAccount: '내 계정',
      description: 'Google 계정으로 로그인하면 이후 위시리스트 동기화 기능을 사용할 수 있습니다.',
      google: 'Google로 로그인', logout: '로그아웃', close: '닫기',
      signingIn: 'Google 로그인 화면으로 이동합니다.', signingOut: '로그아웃 중…', error: '로그인 처리 중 문제가 발생했습니다.'
    },
    ja: {
      login: 'ログイン', account: 'アカウント', titleLogin: 'かんたんログイン', titleAccount: 'アカウント',
      description: 'Googleでログインすると、今後ウィッシュリスト同期を利用できます。',
      google: 'Googleでログイン', logout: 'ログアウト', close: '閉じる',
      signingIn: 'Googleログインへ移動します。', signingOut: 'ログアウト中…', error: 'ログイン処理中に問題が発生しました。'
    },
    en: {
      login: 'LOGIN', account: 'ACCOUNT', titleLogin: 'Quick login', titleAccount: 'Account',
      description: 'Sign in with Google to enable future wishlist sync across devices.',
      google: 'Continue with Google', logout: 'Sign out', close: 'Close',
      signingIn: 'Opening Google sign-in…', signingOut: 'Signing out…', error: 'Something went wrong while processing sign-in.'
    }
  };

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    if (value.startsWith('ja')) return 'ja';
    if (value.startsWith('en')) return 'en';
    return 'ko';
  };
  const text = key => copy[language()]?.[key] || copy.ko[key] || key;

  const userName = user => user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || '';
  const avatarUrl = user => user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';

  const personSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5.5 19c.8-3.6 3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"></path></svg>';
  const googleSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.25c0-.72-.06-1.25-.2-1.8H12v3.28h5.37a4.6 4.6 0 0 1-1.99 2.93v2.43h3.22c1.88-1.73 2.75-4.3 2.75-6.84Z"/><path fill="#34A853" d="M12 21.5c2.62 0 4.82-.86 6.6-2.4l-3.22-2.44c-.9.6-2.04.95-3.38.95-2.53 0-4.68-1.7-5.45-4.01H3.23v2.5A9.97 9.97 0 0 0 12 21.5Z"/><path fill="#FBBC05" d="M6.55 13.6A5.97 5.97 0 0 1 6.23 12c0-.56.1-1.1.3-1.6V7.9H3.24A9.53 9.53 0 0 0 2.5 12c0 1.48.35 2.88.73 4.1l3.32-2.5Z"/><path fill="#EA4335" d="M12 6.39c1.45 0 2.74.5 3.76 1.47l2.82-2.82C16.8 3.4 14.62 2.5 12 2.5A9.97 9.97 0 0 0 3.23 7.9l3.32 2.5C7.32 8.08 9.47 6.39 12 6.39Z"/></svg>';

  const menu = document.getElementById('siteMenu');
  if (!menu) return;

  const menuButton = document.createElement('button');
  menuButton.className = 'site-menu-item auth-menu-item';
  menuButton.id = 'authMenuButton';
  menuButton.type = 'button';
  menuButton.setAttribute('role', 'menuitem');
  menuButton.innerHTML = `<span class="site-menu-icon auth-menu-icon" aria-hidden="true">${personSvg}</span><span class="auth-menu-content"></span>`;
  const wishlist = document.getElementById('wishlistMenuButton');
  menu.insertBefore(menuButton, wishlist || menu.firstChild);

  const modal = document.createElement('div');
  modal.className = 'auth-modal hidden';
  modal.id = 'authModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'authModalTitle');
  modal.innerHTML = `
    <div class="auth-backdrop" data-auth-close></div>
    <section class="auth-dialog" tabindex="-1">
      <div class="auth-dialog-head">
        <div>
          <div class="auth-kicker">newani.me</div>
          <h2 id="authModalTitle"></h2>
          <p class="auth-description"></p>
        </div>
        <button class="auth-close" type="button" data-auth-close>×</button>
      </div>
      <div class="auth-body"></div>
      <p class="auth-status" role="status" aria-live="polite"></p>
    </section>`;
  document.body.appendChild(modal);

  const body = modal.querySelector('.auth-body');
  const status = modal.querySelector('.auth-status');
  const closeButton = modal.querySelector('.auth-close');
  let currentUser = null;
  let lastFocus = null;

  function render() {
    const menuContent = menuButton.querySelector('.auth-menu-content');
    if (currentUser) {
      const avatar = avatarUrl(currentUser);
      menuContent.innerHTML = avatar
        ? `<span class="auth-menu-user"><img class="auth-menu-avatar" src="${avatar}" alt=""><span class="auth-menu-name">${userName(currentUser)}</span></span>`
        : `<span class="auth-menu-name">${text('account')}</span>`;
      menuButton.setAttribute('aria-label', `${text('account')} · ${userName(currentUser)}`);
    } else {
      menuContent.textContent = text('login');
      menuButton.setAttribute('aria-label', text('login'));
    }

    modal.querySelector('#authModalTitle').textContent = text(currentUser ? 'titleAccount' : 'titleLogin');
    modal.querySelector('.auth-description').textContent = currentUser ? '' : text('description');
    closeButton.setAttribute('aria-label', text('close'));
    closeButton.title = text('close');

    if (currentUser) {
      const avatar = avatarUrl(currentUser);
      body.innerHTML = `
        <div class="auth-account">
          ${avatar ? `<img class="auth-account-avatar" src="${avatar}" alt="">` : '<div class="auth-account-avatar"></div>'}
          <div class="auth-account-copy"><strong>${userName(currentUser)}</strong><span>${currentUser.email || ''}</span></div>
        </div>
        <button class="auth-signout" type="button" data-auth-signout>${text('logout')}</button>`;
    } else {
      body.innerHTML = `<button class="auth-google" type="button" data-auth-google>${googleSvg}<span>${text('google')}</span></button>`;
    }
  }

  function openModal() {
    lastFocus = document.activeElement;
    status.textContent = '';
    render();
    modal.classList.remove('hidden');
    document.body.classList.add('auth-modal-open');
    menu.classList.add('hidden');
    document.getElementById('menuToggle')?.setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeModal() {
    if (modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    document.body.classList.remove('auth-modal-open');
    document.getElementById('menuToggle')?.focus();
    lastFocus = null;
  }

  async function signIn() {
    status.textContent = text('signingIn');
    const redirectTo = `${window.location.origin}/`;
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    });
    if (error) status.textContent = text('error');
  }

  async function signOut() {
    status.textContent = text('signingOut');
    const { error } = await client.auth.signOut();
    if (error) status.textContent = text('error');
  }

  function publishAuth(event, session) {
    currentUser = session?.user || null;
    render();
    document.dispatchEvent(new CustomEvent('newanime:auth', {
      detail: { event, user: currentUser, session: session || null }
    }));
  }

  menuButton.addEventListener('click', openModal);
  modal.addEventListener('click', event => {
    if (event.target.closest('[data-auth-close]')) {
      closeModal();
      return;
    }
    if (event.target.closest('[data-auth-google]')) signIn();
    if (event.target.closest('[data-auth-signout]')) signOut();
  });

  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')]
      .filter(element => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('newanime:language', render);

  client.auth.onAuthStateChange((event, session) => {
    publishAuth(event, session);
    if (event === 'SIGNED_OUT' && !modal.classList.contains('hidden')) status.textContent = '';
  });

  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      currentUser = null;
      render();
      return;
    }
    publishAuth('INITIAL_SESSION', data.session || null);
  });

  window.NewAnimeAuth = Object.freeze({
    client,
    getUser: () => currentUser,
    signIn,
    signOut
  });

  render();
})();
