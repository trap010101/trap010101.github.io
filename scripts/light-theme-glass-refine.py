from pathlib import Path

path = Path('theme.js')
text = path.read_text(encoding='utf-8')
marker_comment = '    /* Light theme refinement v3: restore translucent glass surfaces and remove artificial boxes. */'
if marker_comment not in text:
    marker = '    @media (max-width: 520px) {'
    idx = text.rfind(marker)
    if idx < 0:
        raise SystemExit('final mobile media marker not found')
    block = r'''    /* Light theme refinement v3: restore translucent glass surfaces and remove artificial boxes. */
    html[data-theme="light"] {
      --panel: rgba(255,255,255,.64) !important;
      --panel-2: rgba(250,251,253,.76) !important;
      --surface: rgba(255,255,255,.62) !important;
      --surface-2: rgba(250,251,253,.75) !important;
      --line: rgba(31,37,48,.072) !important;
      --shadow: 0 14px 38px rgba(38,45,61,.072) !important;
    }

    html[data-theme="light"] .site-brand {
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .site-header {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.72) !important;
      box-shadow: 0 8px 28px rgba(38,45,61,.065) !important;
      backdrop-filter: blur(20px) saturate(116%) !important;
      -webkit-backdrop-filter: blur(20px) saturate(116%) !important;
    }

    html[data-theme="light"] .site-header .language-row,
    html[data-theme="light"] .language-row {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.30) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .language-current,
    html[data-theme="light"] .menu-toggle,
    html[data-theme="light"] .auth-header-profile {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.30) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .language-options,
    html[data-theme="light"] .site-menu {
      border-color: rgba(31,37,48,.07) !important;
      background:
        linear-gradient(145deg, rgba(81,69,113,.045), transparent 58%),
        rgba(255,255,255,.82) !important;
      box-shadow: 0 18px 42px rgba(38,45,61,.13) !important;
      backdrop-filter: blur(22px) saturate(118%) !important;
      -webkit-backdrop-filter: blur(22px) saturate(118%) !important;
    }

    html[data-theme="light"] .hero,
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(31,37,48,.065) !important;
      background:
        linear-gradient(120deg, rgba(81,69,113,.055) 0%, rgba(255,255,255,.22) 48%, rgba(49,89,117,.045) 100%),
        rgba(255,255,255,.62) !important;
      box-shadow: 0 14px 38px rgba(38,45,61,.068) !important;
      backdrop-filter: blur(18px) saturate(112%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(112%) !important;
    }

    html[data-theme="light"] .toolbar,
    html[data-theme="light"] .archive-nav {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.67) !important;
      box-shadow: 0 10px 26px rgba(38,45,61,.055) !important;
      backdrop-filter: blur(18px) saturate(112%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(112%) !important;
    }

    html[data-theme="light"] .month,
    html[data-theme="light"] .source-box,
    html[data-theme="light"] .undated-item,
    html[data-theme="light"] .detail-panel,
    html[data-theme="light"] .archive-card,
    html[data-theme="light"] .event-card,
    html[data-theme="light"] .event-detail-panel,
    html[data-theme="light"] .event-meta-box,
    html[data-theme="light"] .info-panel,
    html[data-theme="light"] .info-callout {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.58) !important;
      box-shadow: 0 8px 24px rgba(38,45,61,.045) !important;
    }

    html[data-theme="light"] .month {
      backdrop-filter: blur(12px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(12px) saturate(108%) !important;
    }

    html[data-theme="light"] .card {
      border-color: rgba(31,37,48,.055) !important;
      background: linear-gradient(180deg, rgba(255,255,255,.56), rgba(255,255,255,.34)) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .card:hover,
    html[data-theme="light"] .archive-card:hover,
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible {
      border-color: rgba(93,112,215,.17) !important;
      background: rgba(255,255,255,.72) !important;
      box-shadow: 0 10px 24px rgba(38,45,61,.052) !important;
    }

    html[data-theme="light"] .search-wrap,
    html[data-theme="light"] .toolbar button,
    html[data-theme="light"] .chip,
    html[data-theme="light"] .month-nav a,
    html[data-theme="light"] .month-nav button,
    html[data-theme="light"] .archive-nav a {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.32) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .toolbar button:hover,
    html[data-theme="light"] .chip:hover {
      background: rgba(255,255,255,.52) !important;
    }

    html[data-theme="light"] .upcoming-slide,
    html[data-theme="light"] .upcoming-slide:is(:hover, :active, :focus, :focus-visible) {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.64) !important;
      box-shadow: 0 14px 30px rgba(38,45,61,.085) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] {
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(255,255,255,.74) !important;
      box-shadow: 0 18px 34px rgba(38,45,61,.105) !important;
    }

    html[data-theme="light"] .wishlist-summary,
    html[data-theme="light"] .wishlist-item,
    html[data-theme="light"] .wishlist-ranking-scope,
    html[data-theme="light"] .wishlist-ranking-more,
    html[data-theme="light"] .stream-dialog-note {
      border-color: rgba(31,37,48,.055) !important;
      background: rgba(255,255,255,.34) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .stream-dialog,
    html[data-theme="light"] .wishlist-dialog,
    html[data-theme="light"] .auth-dialog,
    html[data-theme="light"] .account-dialog,
    html[data-theme="light"] .detail-account-dialog,
    html[data-theme="light"] .settings-dialog {
      border-color: rgba(31,37,48,.07) !important;
      background:
        radial-gradient(circle at 14% -10%, rgba(81,69,113,.052), transparent 36%),
        radial-gradient(circle at 92% 8%, rgba(49,89,117,.035), transparent 28%),
        rgba(255,255,255,.88) !important;
      box-shadow: 0 24px 66px rgba(38,45,61,.155) !important;
      backdrop-filter: blur(24px) saturate(116%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(116%) !important;
    }

    html[data-theme="light"] .settings-close,
    html[data-theme="light"] .stream-close,
    html[data-theme="light"] .wishlist-close,
    html[data-theme="light"] .wishlist-remove,
    html[data-theme="light"] .auth-close,
    html[data-theme="light"] .detail-account-close,
    html[data-theme="light"] .auth-signout,
    html[data-theme="light"] .detail-account-signout,
    html[data-theme="light"] .detail-account-button,
    html[data-theme="light"] .settings-dialog .theme-choice {
      border-color: rgba(31,37,48,.055) !important;
      background: rgba(255,255,255,.30) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .settings-dialog .theme-choice:hover,
    html[data-theme="light"] .settings-dialog .theme-choice:focus-visible,
    html[data-theme="light"] .settings-dialog .theme-choice[aria-pressed="true"] {
      border-color: rgba(93,112,215,.18) !important;
      background: rgba(93,112,215,.065) !important;
    }

    html[data-theme="light"] .share-status {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.82) !important;
      box-shadow: 0 12px 28px rgba(38,45,61,.10) !important;
      backdrop-filter: blur(18px) saturate(112%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(112%) !important;
    }

'''
    text = text[:idx] + block + text[idx:]
    path.write_text(text, encoding='utf-8')

for suffix in ('*.html', '*.js'):
    for file in Path('.').rglob(suffix):
        if any(part in {'.git', 'node_modules'} for part in file.parts):
            continue
        data = file.read_text(encoding='utf-8')
        updated = data.replace('20260911-theme5', '20260911-theme6')
        if updated != data:
            file.write_text(updated, encoding='utf-8')
