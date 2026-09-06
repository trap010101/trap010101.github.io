// Compact visual override for streaming region selectors on homepage modals and anime detail pages.
(() => {
  if (document.getElementById('streamingRegionCompactStyles')) return;

  const style = document.createElement('style');
  style.id = 'streamingRegionCompactStyles';
  style.textContent = `
    .stream-region-wrap,
    .detail-stream-region {
      display: flex !important;
      align-items: center !important;
      gap: 7px !important;
      margin: 0 0 10px !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
    }

    .detail-stream-region {
      margin: 8px 0 10px !important;
    }

    .stream-region-label,
    .detail-stream-region-label {
      flex: 0 0 auto !important;
      display: inline-block !important;
      margin: 0 !important;
      color: #7f899c !important;
      font-size: 9px !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      letter-spacing: .02em !important;
      text-transform: none !important;
      white-space: nowrap !important;
    }

    .stream-region-options,
    .detail-stream-region-options {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      grid-template-columns: none !important;
      gap: 3px !important;
    }

    .stream-region-btn,
    .detail-stream-region-btn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 34px !important;
      width: auto !important;
      height: 28px !important;
      padding: 0 7px !important;
      border: 1px solid rgba(255,255,255,.08) !important;
      border-radius: 8px !important;
      background: rgba(255,255,255,.018) !important;
      color: #8f99ad !important;
      font-size: 9px !important;
      font-weight: 850 !important;
      line-height: 1 !important;
    }

    .stream-region-btn.active,
    .detail-stream-region-btn.active {
      color: #eef1ff !important;
      border-color: rgba(142,161,255,.34) !important;
      background: rgba(142,161,255,.12) !important;
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

    @media (max-width: 540px) {
      .stream-region-wrap,
      .detail-stream-region {
        flex-direction: row !important;
        align-items: center !important;
      }

      .stream-region-options,
      .detail-stream-region-options {
        display: inline-flex !important;
      }

      .stream-region-btn,
      .detail-stream-region-btn {
        display: inline-flex !important;
        min-width: 34px !important;
        height: 28px !important;
      }
    }
  `;

  document.head.appendChild(style);
})();
