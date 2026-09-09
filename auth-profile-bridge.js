(() => {
  'use strict';

  const auth = window.NewAnimeAuth;
  const config = window.NEWANIME_AUTH_CONFIG || {};
  if (!auth || !config.googleClientId) return;

  const OPERATOR_EMAILS = new Set(['admin@newani.me']);
  const operatorCopy = {
    ko: 'NewAnime 운영자 계정',
    ja: 'NewAnime 運営アカウント',
    en: 'NewAnime operator account'
  };

  const personSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5.5 19c.8-3.6 3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"></path></svg>';
  let requestingProfile = false;
  let tokenClient = null;

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };

  const normalizedEmail = user => String(user?.email || '').trim().toLowerCase();
  const isOperator = user => OPERATOR_EMAILS.has(normalizedEmail(user));

  const normalizeUrl = value => {
    if (!value) return '';
    try {
      const url = new URL(String(value), location.origin);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  };

  const googleIdentity = user => user?.identities?.find(identity => identity?.provider === 'google')?.identity_data || {};

  const avatarUrl = user => {
    const identity = googleIdentity(user);
    return normalizeUrl(
      user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture ||
      identity?.avatar_url ||
      identity?.picture ||
      ''
    );
  };

  const accountLabel = user => user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Account';

  function ensureOperatorStyle() {
    if (document.getElementById('authOperatorBadgeStyle')) return;
    const style = document.createElement('style');
    style.id = 'authOperatorBadgeStyle';
    style.textContent = `
      .auth-verified-mark.auth-operator-mark {
        color: #ffc928 !important;
        background: linear-gradient(145deg, #ffe77a 0%, #ffc928 42%, #efa800 100%) !important;
        clip-path: polygon(50% 0%, 57% 10%, 68% 3%, 73% 16%, 86% 11%, 85% 25%, 99% 28%, 90% 40%, 100% 50%, 90% 60%, 99% 72%, 85% 75%, 86% 89%, 73% 84%, 68% 97%, 57% 90%, 50% 100%, 43% 90%, 32% 97%, 27% 84%, 14% 89%, 15% 75%, 1% 72%, 10% 60%, 0% 50%, 10% 40%, 1% 28%, 15% 25%, 14% 11%, 27% 16%, 32% 3%, 43% 10%);
        filter: drop-shadow(0 1px 2px rgba(0,0,0,.6)) drop-shadow(0 0 3px rgba(255,201,40,.34));
        overflow: visible !important;
      }
      .auth-verified-mark.auth-operator-mark circle {
        fill: transparent !important;
        stroke: none !important;
      }
      .auth-verified-mark.auth-operator-mark path {
        fill: none !important;
        stroke: #fff !important;
        stroke-width: 2.25 !important;
        stroke-linecap: round !important;
        stroke-linejoin: round !important;
      }
      .auth-header-verified.auth-operator-mark {
        width: 15px !important;
        height: 15px !important;
        flex-basis: 15px !important;
        right: -4px !important;
        bottom: -4px !important;
      }
      .auth-account-name-row > .auth-operator-mark {
        width: 17px !important;
        height: 17px !important;
        flex-basis: 17px !important;
      }
      @media (max-width: 520px) {
        .auth-header-verified.auth-operator-mark {
          width: 14px !important;
          height: 14px !important;
          flex-basis: 14px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyOperatorBadge(user = auth.getUser?.()) {
    const operator = isOperator(user);
    const label = operatorCopy[language()] || operatorCopy.ko;
    document.querySelectorAll('.auth-verified-mark').forEach(mark => {
      mark.classList.toggle('auth-operator-mark', operator);
      if (operator) {
        mark.setAttribute('aria-label', label);
        mark.setAttribute('title', label);
      }
    });
    const profileButton = document.getElementById('authHeaderProfile');
    if (profileButton) {
      if (operator) profileButton.dataset.operatorAccount = 'true';
      else delete profileButton.dataset.operatorAccount;
    }
  }

  function ensureProfileButton(user) {
    const header = document.querySelector('.site-header');
    const menuWrap = header?.querySelector('.menu-wrap');
    if (!header || !menuWrap) return null;

    let button = document.getElementById('authHeaderProfile');
    if (!button) {
      button = document.createElement('button');
      button.id = 'authHeaderProfile';
      button.type = 'button';
      button.className = 'auth-header-profile hidden';
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', () => {
        const current = auth.getUser?.();
        if (current && !avatarUrl(current)) requestGoogleProfile(true);
        auth.signIn?.();
      });
      header.insertBefore(button, menuWrap);
    } else if (button.parentElement !== header) {
      header.insertBefore(button, menuWrap);
    }

    if (!user) {
      button.classList.add('hidden');
      return button;
    }

    const avatar = avatarUrl(user);
    button.classList.remove('hidden');
    if (avatar) {
      const verified = button.querySelector('.auth-header-verified')?.outerHTML || '';
      button.innerHTML = `<img class="auth-header-profile-avatar" src="${avatar.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" alt="">${verified}`;
    } else if (!button.querySelector('.auth-header-profile-fallback')) {
      const verified = button.querySelector('.auth-header-verified')?.outerHTML || '';
      button.innerHTML = `<span class="auth-header-profile-fallback" aria-hidden="true">${personSvg}</span>${verified}`;
    }
    button.setAttribute('aria-label', `Account · ${accountLabel(user)}`);
    requestAnimationFrame(() => applyOperatorBadge(user));
    return button;
  }

  async function persistPicture(picture) {
    const safePicture = normalizeUrl(picture);
    if (!safePicture) return;

    ensureProfileButton({
      ...auth.getUser?.(),
      user_metadata: {
        ...(auth.getUser?.()?.user_metadata || {}),
        avatar_url: safePicture,
        picture: safePicture
      }
    });

    const { error } = await auth.client.auth.updateUser({
      data: { avatar_url: safePicture, picture: safePicture }
    });
    if (error) console.warn('Google profile photo could not be saved.', error);
  }

  async function handleAccessToken(response) {
    requestingProfile = false;
    if (!response?.access_token) return;
    try {
      const result = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${response.access_token}` }
      });
      if (!result.ok) return;
      const profile = await result.json();
      await persistPicture(profile?.picture || '');
    } catch (error) {
      console.warn('Google profile photo could not be loaded.', error);
    }
  }

  function requestGoogleProfile(interactive = false) {
    const user = auth.getUser?.();
    if (!user || avatarUrl(user) || requestingProfile || !window.google?.accounts?.oauth2?.initTokenClient) return;

    requestingProfile = true;
    try {
      if (!tokenClient) {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: config.googleClientId,
          scope: 'openid email profile',
          callback: handleAccessToken,
          error_callback: () => { requestingProfile = false; }
        });
      }
      tokenClient.requestAccessToken({ prompt: interactive ? 'consent' : '' });
    } catch (error) {
      requestingProfile = false;
      console.warn('Google profile permission could not be requested.', error);
    }
  }

  function handleUser(user, event = '') {
    ensureProfileButton(user || null);
    requestAnimationFrame(() => applyOperatorBadge(user || null));
    if (user && !avatarUrl(user) && event !== 'INITIAL_SESSION') requestGoogleProfile(false);
  }

  ensureOperatorStyle();

  document.addEventListener('newanime:auth', event => {
    handleUser(event.detail?.user || null, event.detail?.event || '');
  });

  document.addEventListener('newanime:language', () => {
    requestAnimationFrame(() => applyOperatorBadge(auth.getUser?.()));
  });

  const authBody = document.querySelector('#authModal .auth-body');
  if (authBody) {
    new MutationObserver(() => requestAnimationFrame(() => applyOperatorBadge(auth.getUser?.())))
      .observe(authBody, { childList: true, subtree: true });
  }

  const current = auth.getUser?.();
  handleUser(current || null, 'INITIAL_SESSION');

  document.addEventListener('click', event => {
    if (!event.target.closest('#authHeaderProfile')) return;
    const user = auth.getUser?.();
    if (user && !avatarUrl(user)) requestGoogleProfile(true);
    requestAnimationFrame(() => applyOperatorBadge(user || null));
  }, true);
})();
