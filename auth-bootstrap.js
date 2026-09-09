(() => {
  'use strict';

  if (window.NewAnimeAuthBootstrap?.ready) return;

  const script = src => new Promise((resolve, reject) => {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(node => {
      if (!node.src) return false;
      const url = new URL(node.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });

    if (existing) {
      if (existing.dataset.newanimeLoading !== 'true') return resolve(existing);
      existing.addEventListener('load', () => resolve(existing), { once:true });
      existing.addEventListener('error', reject, { once:true });
      return;
    }

    const node = document.createElement('script');
    node.src = src;
    node.async = false;
    node.dataset.newanimeLoading = 'true';
    node.onload = () => {
      node.dataset.newanimeLoading = 'false';
      node.dataset.newanimeLoaded = 'true';
      resolve(node);
    };
    node.onerror = error => {
      node.dataset.newanimeLoading = 'false';
      reject(error);
    };
    document.head.appendChild(node);
  });

  const stylesheet = href => {
    const target = new URL(href, location.href);
    const existing = [...document.querySelectorAll('link[rel="stylesheet"]')].some(node => {
      const url = new URL(node.href, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (existing) return;

    const node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = href;
    document.head.appendChild(node);
  };

  stylesheet('/auth.css?v=20260909-auth5');
  stylesheet('/account-refine.css?v=20260908-authui10');
  stylesheet('/google-login-button-fit.css?v=20260908-1');

  const ready = Promise.resolve()
    .then(() => script('/auth-config.js?v=20260908-auth6'))
    .then(() => {
      const config = window.NEWANIME_AUTH_CONFIG || {};
      if (!config.supabaseUrl || !config.supabaseAnonKey || !config.googleClientId || config.googleEnabled !== true) {
        throw new Error('NewAnime authentication is not configured.');
      }
      return script('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.115.0');
    })
    .then(() => script('/auth.js?v=20260909-auth16'))
    .then(() => script('/auth-profile-bridge.js?v=20260909-profile3'));

  const googleReady = ready
    .then(() => script('https://accounts.google.com/gsi/client'))
    .then(() => {
      const initialized = window.NewAnimeAuth?.initGoogleIdentity?.();
      document.dispatchEvent(new CustomEvent('newanime:google-ready', { detail:{ initialized:Boolean(initialized) } }));
      return initialized;
    })
    .catch(error => {
      console.warn('Google sign-in UI could not be loaded. Existing account sessions remain available.', error);
      return false;
    });

  window.NewAnimeAuthBootstrap = Object.freeze({ ready, googleReady });
})();
