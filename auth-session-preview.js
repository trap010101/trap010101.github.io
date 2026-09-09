(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuWrap = header?.querySelector('.menu-wrap');
  if (!header || !menuWrap) return;

  const personSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5.5 19c.8-3.6 3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"></path></svg>';

  let button = document.getElementById('authSessionPreview');
  if (!button) {
    button = document.createElement('button');
    button.id = 'authSessionPreview';
    button.type = 'button';
    button.className = 'auth-header-profile hidden';
    button.setAttribute('aria-haspopup', 'dialog');
    header.insertBefore(button, menuWrap);
  }

  const safeUrl = value => {
    if (!value) return '';
    try {
      const url = new URL(String(value), location.origin);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  };

  const readStoredUser = () => {
    try {
      const preferredKey = 'sb-ojpgkxxojwkoczvwpcyy-auth-token';
      const keys = [preferredKey, ...Object.keys(localStorage).filter(key => /^sb-[a-z0-9]+-auth-token$/i.test(key) && key !== preferredKey)];
      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (!value) continue;
        const stored = JSON.parse(value);
        const session = stored?.currentSession || stored?.session || stored;
        const user = session?.user || stored?.user || null;
        if (user?.id && (session?.access_token || session?.refresh_token || stored?.refresh_token)) return user;
      }
    } catch (_) {}
    return null;
  };

  const avatarUrl = user => {
    const identity = user?.identities?.find(item => item?.provider === 'google')?.identity_data || {};
    return safeUrl(
      user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture ||
      identity?.avatar_url ||
      identity?.picture ||
      ''
    );
  };

  const label = user => user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Account';

  const showFallback = () => {
    const fallback = document.createElement('span');
    fallback.className = 'auth-header-profile-fallback';
    fallback.setAttribute('aria-hidden', 'true');
    fallback.innerHTML = personSvg;
    button.prepend(fallback);
  };

  const render = user => {
    if (!user) {
      button.classList.add('hidden');
      return;
    }

    button.textContent = '';
    const avatar = avatarUrl(user);
    if (avatar) {
      const image = document.createElement('img');
      image.className = 'auth-header-profile-avatar';
      image.src = avatar;
      image.alt = '';
      image.referrerPolicy = 'no-referrer';
      image.addEventListener('error', () => {
        image.remove();
        showFallback();
      }, { once:true });
      button.appendChild(image);
    } else {
      showFallback();
    }

    button.classList.remove('hidden');
    button.dataset.sessionPreview = 'true';
    button.setAttribute('aria-label', `Account · ${label(user)}`);
    button.title = label(user);
  };

  const retirePreview = () => {
    if (!document.getElementById('authHeaderProfile')) return false;
    button.classList.add('hidden');
    return true;
  };

  button.addEventListener('click', () => {
    if (window.NewAnimeAuth?.signIn) window.NewAnimeAuth.signIn();
  });

  document.addEventListener('newanime:auth', retirePreview);
  new MutationObserver(() => retirePreview()).observe(header, { childList:true });

  render(readStoredUser());
  retirePreview();
})();
