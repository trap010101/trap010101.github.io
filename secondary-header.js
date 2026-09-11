(() => {
  'use strict';

  const BRAND_LOGO_SRC = '/assets/newanime-logo.svg?v=20260909-logo2';
  const FAVICON_SRC = '/favicon-32x32.png?v=20260909-icon1';
  const THEME_SCRIPT_SRC = '/theme.js?v=20260911-theme6';

  function bootTheme() {
    try {
      const saved = localStorage.getItem('newanimeTheme');
      const preference = ['system', 'light', 'dark'].includes(saved) ? saved : 'dark';
      const theme = preference === 'system'
        ? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : preference;
      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.themePreference = preference;
    } catch (_) {}

    if (window.NewAnimeTheme?.ready || document.querySelector('script[data-newanime-theme-loader]')) return;
    const script = document.createElement('script');
    script.src = THEME_SCRIPT_SRC;
    script.async = false;
    script.dataset.newanimeThemeLoader = 'true';
    document.head.appendChild(script);
  }

  bootTheme();

  const copy = {
    ko: {
      menu:'메뉴', updates:'업데이트', contact:'문의', share:'공유', copied:'링크를 복사했습니다.', failed:'공유 기능을 사용할 수 없습니다.',
      footer:'방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.'
    },
    ja: {
      menu:'メニュー', updates:'更新', contact:'お問い合わせ', share:'共有', copied:'リンクをコピーしました。', failed:'共有機能を利用できません。',
      footer:'放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。'
    },
    en: {
      menu:'Menu', updates:'UPDATES', contact:'CONTACT', share:'SHARE', copied:'Link copied.', failed:'Sharing is unavailable.',
      footer:'Browse broadcast dates, PVs, official sites, and streaming information for upcoming anime and films.'
    }
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const t = key => copy[lang()]?.[key] || copy.ko[key] || key;
  const menu = () => document.getElementById('siteMenu');
  const toggle = () => document.getElementById('menuToggle');

  function applyBrandAssets() {
    const logo = document.querySelector('.brand-logo');
    if (logo) {
      logo.src = BRAND_LOGO_SRC;
      logo.width = 1518;
      logo.height = 300;
    }

    let icon = document.querySelector('link[rel~="icon"][data-newanime-icon]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/png';
      icon.sizes = '32x32';
      icon.dataset.newanimeIcon = 'true';
      document.head.appendChild(icon);
    }
    icon.href = FAVICON_SRC;
  }

  function closeMenu(restoreFocus = false) {
    const target = menu();
    const button = toggle();
    if (!target || !button || target.classList.contains('hidden')) return;
    target.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
    if (restoreFocus) button.focus();
  }

  function archiveYear() {
    const pathMatch = location.pathname.match(/^\/(2026|2027)(?:\/|$)/);
    if (pathMatch) return pathMatch[1];
    const breadcrumb = [...document.querySelectorAll('.detail-breadcrumb a[href]')]
      .map(link => link.getAttribute('href') || '')
      .find(href => /^\/(2026|2027)\/$/.test(href));
    return breadcrumb?.match(/(2026|2027)/)?.[1] || '2026';
  }

  function refreshLanguage({ notify = false } = {}) {
    const current = lang();
    const button = toggle();
    if (button) {
      button.setAttribute('aria-label', t('menu'));
      button.title = t('menu');
    }
    const updates = document.getElementById('updatesMenuLabel');
    const contact = document.getElementById('contactMenuLabel');
    const share = document.getElementById('shareMenuLabel');
    if (updates) updates.textContent = t('updates');
    if (contact) contact.textContent = t('contact');
    if (share) share.textContent = t('share');
    const updatesLink = document.getElementById('updatesMenuLink');
    if (updatesLink) updatesLink.href = `/updates/?lang=${current}`;
    const brand = document.querySelector('.site-brand');
    if (brand) brand.href = `/?lang=${current}`;
    const footerDescription = document.getElementById('footerDescription');
    if (footerDescription) footerDescription.textContent = t('footer');
    const archive = document.getElementById('archiveFooterLink');
    if (archive) archive.href = `/${archiveYear()}/?lang=${current}`;
    document.querySelectorAll('footer a[href^="/updates/"], footer a[href^="/about/"], footer a[href^="/privacy/"], footer a[href^="/policy/"]').forEach(link => {
      const url = new URL(link.href, location.origin);
      url.searchParams.set('lang', current);
      link.href = url.pathname + url.search;
    });
    if (notify) document.dispatchEvent(new CustomEvent('newanime:language', { detail:{ lang:current } }));
  }

  let toastTimer = null;
  function showStatus(message) {
    const status = document.getElementById('shareStatus');
    if (!status) return;
    clearTimeout(toastTimer);
    status.textContent = message;
    status.classList.remove('hidden');
    toastTimer = setTimeout(() => status.classList.add('hidden'), 2200);
  }

  async function copyUrl(url) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(url);
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('Copy failed');
  }

  document.addEventListener('click', async event => {
    const menuToggle = event.target.closest('#menuToggle');
    if (menuToggle) {
      const target = menu();
      if (!target) return;
      const open = target.classList.contains('hidden');
      if (open) {
        target.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => target.querySelector('[role="menuitem"]')?.focus());
      } else closeMenu();
      return;
    }

    const shareButton = event.target.closest('#shareButton');
    if (shareButton) {
      closeMenu();
      const description = document.querySelector('meta[name="description"]')?.content || '';
      const shareData = { title: document.title, text: description, url: location.href };
      try {
        if (typeof navigator.share === 'function') await navigator.share(shareData);
        else {
          await copyUrl(shareData.url);
          showStatus(t('copied'));
        }
      } catch (error) {
        if (error?.name !== 'AbortError') showStatus(t('failed'));
      }
      return;
    }

    if (event.target.closest('#siteMenu [role="menuitem"]')) {
      closeMenu();
      return;
    }
    if (!event.target.closest('.menu-wrap')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(true);
  });

  new MutationObserver(() => refreshLanguage({ notify:true })).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  applyBrandAssets();
  refreshLanguage();

  window.NewAnimeSecondaryHeader = Object.freeze({ refreshLanguage, closeAll:closeMenu, applyBrandAssets });
})();