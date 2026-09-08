(() => {
  'use strict';

  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const read = key => hash.get(key) || query.get(key) || '';

  const error = read('error');
  const errorCode = read('error_code');
  const errorDescription = read('error_description');
  if (!error && !errorCode && !errorDescription) return;

  const detail = [errorCode, errorDescription || error].filter(Boolean).join(' · ');
  window.NEWANIME_AUTH_CALLBACK_ERROR = Object.freeze({
    error,
    errorCode,
    errorDescription,
    detail
  });

  const show = () => {
    const modal = document.getElementById('authModal');
    const status = modal?.querySelector('.auth-status');
    if (!modal || !status) return false;

    const lang = (document.documentElement.lang || 'ko').toLowerCase();
    const prefix = lang.startsWith('ja')
      ? 'Googleログインに失敗しました。'
      : lang.startsWith('en')
        ? 'Google sign-in failed.'
        : 'Google 로그인에 실패했습니다.';

    status.textContent = `${prefix} ${detail}`;
    modal.classList.remove('hidden');
    document.body.classList.add('auth-modal-open');
    document.getElementById('siteMenu')?.classList.add('hidden');
    document.getElementById('menuToggle')?.setAttribute('aria-expanded', 'false');
    return true;
  };

  if (show()) return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (show() || attempts >= 120) window.clearInterval(timer);
  }, 50);
})();
