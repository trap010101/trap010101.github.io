(() => {
  'use strict';

  const hero = document.querySelector('.detail-shell .detail-hero-card');
  const main = hero?.querySelector(':scope > .detail-main');
  const poster = hero?.querySelector(':scope > .detail-poster-wrap');
  const sections = main ? [...main.querySelectorAll(':scope > .anime-localized')] : [];
  if (!hero || !main || !poster || !sections.length) return;

  const ensureSummary = section => {
    let summary = section.querySelector(':scope > .detail-summary-copy');
    if (summary) return summary;

    const children = [...section.children];
    const summaryNodes = children.filter(node =>
      node.classList?.contains('detail-kicker') ||
      node.tagName === 'H1' ||
      node.classList?.contains('alternate-titles') ||
      node.classList?.contains('detail-badges')
    );
    if (!summaryNodes.length) return null;

    summary = document.createElement('div');
    summary.className = 'detail-summary-copy';
    section.insertBefore(summary, summaryNodes[0]);
    summaryNodes.forEach(node => summary.appendChild(node));
    return summary;
  };

  const summaries = sections
    .map(section => ({ section, summary: ensureSummary(section) }))
    .filter(item => item.summary);
  if (!summaries.length) return;

  let mobileTop = hero.querySelector(':scope > .detail-mobile-top');
  let host;

  if (!mobileTop) {
    mobileTop = document.createElement('div');
    mobileTop.className = 'detail-mobile-top';
    host = document.createElement('div');
    host.className = 'detail-mobile-summary-host';
    mobileTop.append(poster, host);
    hero.insertBefore(mobileTop, main);
  } else {
    host = mobileTop.querySelector(':scope > .detail-mobile-summary-host');
    if (!host) {
      host = document.createElement('div');
      host.className = 'detail-mobile-summary-host';
      mobileTop.appendChild(host);
    }
    if (poster.parentElement !== mobileTop) mobileTop.prepend(poster);
  }

  host.replaceChildren();

  const clones = summaries.map(({ section, summary }) => {
    const lang = section.dataset.langPanel || '';
    const clone = summary.cloneNode(true);
    clone.classList.add('detail-mobile-summary-copy');
    clone.dataset.mobileSummaryLang = lang;
    clone.hidden = section.hidden;
    host.appendChild(clone);
    return { section, clone };
  });

  const sync = () => {
    clones.forEach(({ section, clone }) => {
      clone.hidden = section.hidden;
    });
  };

  const observer = new MutationObserver(sync);
  sections.forEach(section => observer.observe(section, { attributes: true, attributeFilter: ['hidden'] }));
  document.addEventListener('newanime:language', sync);
  sync();
})();
