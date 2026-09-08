(() => {
  'use strict';

  function unique(nodes) {
    return [...new Set(nodes.filter(Boolean))];
  }

  function reorder(menu) {
    if (!menu) return;
    const desired = unique([
      menu.querySelector('[data-secondary-updates]'),
      menu.querySelector('#authMenuButton') || menu.querySelector('.detail-account-button'),
      menu.querySelector('#wishlistMenuButton'),
      menu.querySelector('a[href^="mailto:"]'),
      menu.querySelector('[data-secondary-share]') || menu.querySelector('[data-share]')
    ]);
    if (!desired.length) return;

    const current = [...menu.children].filter(node => desired.includes(node));
    if (current.length === desired.length && current.every((node, index) => node === desired[index])) return;
    desired.forEach(node => menu.appendChild(node));
  }

  function init(menu) {
    if (!menu || menu.dataset.secondaryOrderReady === '1') return;
    menu.dataset.secondaryOrderReady = '1';
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        reorder(menu);
      });
    };
    new MutationObserver(schedule).observe(menu, { childList:true });
    schedule();
  }

  const boot = () => document.querySelectorAll('#siteMenu[data-secondary-menu], .secondary-site-menu[data-secondary-menu]').forEach(init);
  boot();
  new MutationObserver(boot).observe(document.body, { childList:true, subtree:true });
})();
