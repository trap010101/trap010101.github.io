(() => {
  'use strict';

  function unique(nodes) {
    return [...new Set(nodes.filter(Boolean))];
  }

  function reorder(menu) {
    if (!menu) return;
    const desired = unique([
      menu.querySelector('#updatesMenuLink') || menu.querySelector('[data-secondary-updates]'),
      menu.querySelector('#authMenuButton'),
      menu.querySelector('#wishlistMenuButton'),
      menu.querySelector('a[href^="mailto:"]'),
      menu.querySelector('#shareButton') || menu.querySelector('[data-secondary-share]') || menu.querySelector('[data-share]')
    ]);
    if (!desired.length) return;

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

  const boot = () => document.querySelectorAll('#siteMenu[data-secondary-menu], .site-menu[data-secondary-menu]').forEach(init);
  boot();
  new MutationObserver(boot).observe(document.body, { childList:true, subtree:true });
})();
