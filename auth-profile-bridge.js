(() => {
  'use strict';

  const auth = window.NewAnimeAuth;
  const config = window.NEWANIME_AUTH_CONFIG || {};
  if (!auth || !config.googleClientId) return;

  const personSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M5.5 19c.8-3.6 3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"></path></svg>';
  let requestingProfile = false;
  let tokenClient = null;

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
    if (user && !avatarUrl(user) && event !== 'INITIAL_SESSION') requestGoogleProfile(false);
  }

  document.addEventListener('newanime:auth', event => {
    handleUser(event.detail?.user || null, event.detail?.event || '');
  });

  const current = auth.getUser?.();
  handleUser(current || null, 'INITIAL_SESSION');

  document.addEventListener('click', event => {
    if (!event.target.closest('#authHeaderProfile')) return;
    const user = auth.getUser?.();
    if (user && !avatarUrl(user)) requestGoogleProfile(true);
  }, true);
})();
