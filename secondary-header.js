(() => {
  'use strict';

  const copy = {
    ko: { menu:'메뉴', updates:'업데이트', contact:'문의', share:'공유', copied:'링크를 복사했습니다.', failed:'공유 기능을 사용할 수 없습니다.' },
    ja: { menu:'メニュー', updates:'更新', contact:'お問い合わせ', share:'共有', copied:'リンクをコピーしました。', failed:'共有機能を利用できません。' },
    en: { menu:'Menu', updates:'UPDATES', contact:'CONTACT', share:'SHARE', copied:'Link copied.', failed:'Sharing is unavailable.' }
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const t = key => copy[lang()]?.[key] || copy.ko[key] || key;

  function closeMenu(wrap, restoreFocus = false) {
    const menu = wrap?.querySelector('[data-secondary-menu]');
    const toggle = wrap?.querySelector('[data-secondary-menu-toggle]');
    if (!menu || !toggle || menu.classList.contains('hidden')) return;
    menu.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  }

  function closeAll(except = null) {
    document.querySelectorAll('.secondary-menu-wrap').forEach(wrap => {
      if (wrap !== except) closeMenu(wrap);
    });
  }

  function refreshLanguage({ notify = false } = {}) {
    const current = lang();
    document.querySelectorAll('[data-secondary-menu-toggle]').forEach(toggle => {
      toggle.setAttribute('aria-label', t('menu'));
      toggle.title = t('menu');
    });
    document.querySelectorAll('[data-secondary-menu-label="updates"]').forEach(el => { el.textContent = t('updates'); });
    document.querySelectorAll('[data-secondary-menu-label="contact"]').forEach(el => { el.textContent = t('contact'); });
    document.querySelectorAll('[data-secondary-menu-label="share"]').forEach(el => { el.textContent = t('share'); });
    document.querySelectorAll('[data-secondary-updates]').forEach(link => { link.href = `/updates/?lang=${current}`; });
    document.querySelectorAll('[data-secondary-brand]').forEach(link => { link.href = `/?lang=${current}`; });
    if (notify) document.dispatchEvent(new CustomEvent('newanime:language', { detail:{ lang:current } }));
  }

  let toastTimer = null;
  function showStatus(message) {
    const status = document.querySelector('[data-secondary-share-status]');
    if (!status) return;
    clearTimeout(toastTimer);
    status.textContent = message;
    status.classList.remove('hidden');
    toastTimer = setTimeout(() => status.classList.add('hidden'), 2200);
  }

  async function copyUrl(url) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }
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
    const toggle = event.target.closest('[data-secondary-menu-toggle]');
    if (toggle) {
      const wrap = toggle.closest('.secondary-menu-wrap');
      const menu = wrap?.querySelector('[data-secondary-menu]');
      if (!wrap || !menu) return;
      const willOpen = menu.classList.contains('hidden');
      closeAll(wrap);
      if (willOpen) {
        menu.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => menu.querySelector('[role="menuitem"], .detail-account-button')?.focus());
      } else {
        closeMenu(wrap);
      }
      return;
    }

    const genericShare = event.target.closest('[data-secondary-share]');
    if (genericShare) {
      closeMenu(genericShare.closest('.secondary-menu-wrap'));
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

    const menuItem = event.target.closest('[data-secondary-menu] [role="menuitem"], [data-secondary-menu] .detail-account-button');
    if (menuItem) {
      closeMenu(menuItem.closest('.secondary-menu-wrap'));
      return;
    }

    document.querySelectorAll('.secondary-menu-wrap').forEach(wrap => {
      if (!wrap.contains(event.target)) closeMenu(wrap);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = [...document.querySelectorAll('.secondary-menu-wrap')].find(wrap => !wrap.querySelector('[data-secondary-menu]')?.classList.contains('hidden'));
    if (open) closeMenu(open, true);
  });

  new MutationObserver(() => refreshLanguage({ notify:true })).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  refreshLanguage();

  window.NewAnimeSecondaryHeader = Object.freeze({ refreshLanguage, closeAll });
})();
