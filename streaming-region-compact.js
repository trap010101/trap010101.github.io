// Collapsible compact streaming-region selector for homepage modals and anime detail pages.
(() => {
  if (document.getElementById('streamingRegionCompactStyles')) return;

  const style = document.createElement('style');
  style.id = 'streamingRegionCompactStyles';
  style.textContent = `
    .stream-region-wrap,
    .detail-stream-region {
      position: relative !important;
      display: inline-flex !important;
      align-items: center !important;
      width: auto !important;
      gap: 5px !important;
      margin: 0 0 9px !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      overflow: visible !important;
    }

    .detail-stream-region {
      margin: 7px 0 9px !important;
    }

    .stream-region-label,
    .detail-stream-region-label {
      display: none !important;
    }

    .stream-region-current {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      height: 27px;
      min-width: 48px;
      padding: 0 8px;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 8px;
      background: rgba(255,255,255,.025);
      color: #aab3c5;
      font: inherit;
      font-size: 9px;
      font-weight: 850;
      line-height: 1;
      cursor: pointer;
    }

    .stream-region-current::after {
      content: '';
      width: 5px;
      height: 5px;
      border-right: 1.5px solid currentColor;
      border-bottom: 1.5px solid currentColor;
      transform: translateY(-1px) rotate(45deg);
      opacity: .66;
      transition: transform .14s ease;
    }

    .stream-region-wrap.is-open .stream-region-current::after,
    .detail-stream-region.is-open .stream-region-current::after {
      transform: translateY(1px) rotate(225deg);
    }

    .stream-region-current:hover,
    .stream-region-current:focus-visible {
      color: #eef1ff;
      border-color: rgba(142,161,255,.28);
      outline: none;
    }

    .stream-region-options,
    .detail-stream-region-options {
      position: absolute !important;
      top: calc(100% + 4px) !important;
      left: 0 !important;
      z-index: 30 !important;
      display: none !important;
      width: max-content !important;
      min-width: 48px !important;
      padding: 3px !important;
      gap: 2px !important;
      grid-template-columns: none !important;
      border: 1px solid rgba(255,255,255,.09) !important;
      border-radius: 9px !important;
      background: #171a22 !important;
      box-shadow: 0 10px 26px rgba(0,0,0,.34) !important;
    }

    .stream-region-wrap.is-open .stream-region-options,
    .detail-stream-region.is-open .detail-stream-region-options {
      display: flex !important;
      flex-direction: column !important;
    }

    .stream-region-btn,
    .detail-stream-region-btn {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 42px !important;
      width: 100% !important;
      height: 26px !important;
      padding: 0 8px !important;
      border: 0 !important;
      border-radius: 6px !important;
      background: transparent !important;
      color: #8f99ad !important;
      font-size: 9px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
      cursor: pointer !important;
    }

    .stream-region-btn:hover,
    .detail-stream-region-btn:hover,
    .stream-region-btn:focus-visible,
    .detail-stream-region-btn:focus-visible {
      color: #eef1ff !important;
      background: rgba(255,255,255,.055) !important;
      outline: none !important;
    }

    .stream-region-btn.active,
    .detail-stream-region-btn.active {
      color: #eef1ff !important;
      background: rgba(142,161,255,.11) !important;
      box-shadow: none !important;
    }

    .stream-region-btn strong,
    .detail-stream-region-btn strong {
      display: none !important;
    }

    .stream-region-btn small,
    .detail-stream-region-btn small {
      display: block !important;
      margin: 0 !important;
      color: inherit !important;
      opacity: 1 !important;
      font-size: 9px !important;
      font-weight: inherit !important;
      line-height: 1 !important;
    }
  `;
  document.head.appendChild(style);

  const selectorQuery = '.stream-region-wrap, .detail-stream-region';

  const enhanceSelector = wrap => {
    if (!wrap) return;
    const active = wrap.querySelector('.stream-region-btn.active small, .detail-stream-region-btn.active small');
    const code = active?.textContent?.trim() || 'KR';

    let toggle = wrap.querySelector(':scope > .stream-region-current');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'stream-region-current';
      toggle.setAttribute('aria-haspopup', 'listbox');
      toggle.setAttribute('aria-expanded', 'false');
      wrap.insertBefore(toggle, wrap.querySelector('.stream-region-options, .detail-stream-region-options'));
    }
    toggle.textContent = code;
    toggle.setAttribute('aria-label', `Streaming region: ${code}`);
  };

  const enhanceAll = root => {
    if (root?.matches?.(selectorQuery)) enhanceSelector(root);
    root?.querySelectorAll?.(selectorQuery).forEach(enhanceSelector);
  };

  const closeAll = except => {
    document.querySelectorAll(`${selectorQuery}.is-open`).forEach(wrap => {
      if (wrap === except) return;
      wrap.classList.remove('is-open');
      wrap.querySelector(':scope > .stream-region-current')?.setAttribute('aria-expanded', 'false');
    });
  };

  document.addEventListener('click', event => {
    const toggle = event.target.closest('.stream-region-current');
    if (toggle) {
      event.preventDefault();
      event.stopPropagation();
      const wrap = toggle.closest(selectorQuery);
      if (!wrap) return;
      const willOpen = !wrap.classList.contains('is-open');
      closeAll(wrap);
      wrap.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      return;
    }

    const regionButton = event.target.closest('[data-stream-region], [data-detail-stream-region]');
    if (regionButton) {
      const wrap = regionButton.closest(selectorQuery);
      wrap?.classList.remove('is-open');
      wrap?.querySelector(':scope > .stream-region-current')?.setAttribute('aria-expanded', 'false');
      requestAnimationFrame(() => enhanceAll(document));
      return;
    }

    closeAll(null);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector(`${selectorQuery}.is-open`);
    if (!open) return;
    open.classList.remove('is-open');
    const toggle = open.querySelector(':scope > .stream-region-current');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.focus();
  });

  const observer = new MutationObserver(records => {
    for (const record of records) {
      record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) enhanceAll(node);
      });
    }
    enhanceAll(document);
  });

  const start = () => {
    enhanceAll(document);
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
