(() => {
  'use strict';

  const sections = document.querySelectorAll('.detail-shell .anime-localized');
  if (!sections.length) return;

  sections.forEach(section => {
    if (section.querySelector(':scope > .detail-summary-copy')) return;

    const children = [...section.children];
    const summaryNodes = children.filter(node =>
      node.classList?.contains('detail-kicker') ||
      node.tagName === 'H1' ||
      node.classList?.contains('alternate-titles') ||
      node.classList?.contains('detail-badges')
    );

    if (!summaryNodes.length) return;

    const summary = document.createElement('div');
    summary.className = 'detail-summary-copy';
    section.insertBefore(summary, summaryNodes[0]);
    summaryNodes.forEach(node => summary.appendChild(node));
  });
})();
