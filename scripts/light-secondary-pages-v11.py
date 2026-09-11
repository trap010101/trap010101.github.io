from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
THEME = ROOT / 'theme.js'
MARKER = 'Light theme secondary pages v11'

css = r'''

    /* Light theme secondary pages v11: archive, detail, info, updates, event, ranking. */
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .info-page .hero,
    html[data-theme="light"] .event-page .hero,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(31,37,48,.07) !important;
      background: rgba(255,255,255,.66) !important;
      box-shadow: 0 14px 36px rgba(38,45,61,.065) !important;
      backdrop-filter: blur(18px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(108%) !important;
    }
    html[data-theme="light"] .archive-hero::after,
    html[data-theme="light"] .detail-hero-card::after {
      display: none !important;
    }

    /* Schedule archive pages. */
    html[data-theme="light"] .archive-back,
    html[data-theme="light"] .archive-kicker,
    html[data-theme="light"] .archive-description,
    html[data-theme="light"] .archive-count,
    html[data-theme="light"] .archive-alt-title {
      color: #687282 !important;
    }
    html[data-theme="light"] .archive-hero h1,
    html[data-theme="light"] .archive-section-head h2,
    html[data-theme="light"] .archive-card h3,
    html[data-theme="light"] .archive-card-title {
      color: #252b35 !important;
    }
    html[data-theme="light"] .archive-section-head h2 a:hover,
    html[data-theme="light"] .archive-card-title:hover,
    html[data-theme="light"] .archive-back:hover {
      color: #33437f !important;
    }
    html[data-theme="light"] .archive-summary span {
      color: #42558f !important;
      border-color: rgba(93,112,215,.16) !important;
      background: rgba(93,112,215,.065) !important;
    }
    html[data-theme="light"] .archive-nav {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.70) !important;
      box-shadow: 0 10px 26px rgba(38,45,61,.055) !important;
    }
    html[data-theme="light"] .archive-nav a {
      color: #596476 !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.32) !important;
    }
    html[data-theme="light"] .archive-nav a:hover,
    html[data-theme="light"] .archive-nav a[aria-current="page"] {
      color: #33437f !important;
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(93,112,215,.085) !important;
    }
    html[data-theme="light"] .archive-card {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.62) !important;
      box-shadow: 0 8px 22px rgba(38,45,61,.045) !important;
    }
    html[data-theme="light"] .archive-card:hover {
      border-color: rgba(93,112,215,.17) !important;
      background: rgba(255,255,255,.78) !important;
      box-shadow: 0 10px 24px rgba(38,45,61,.055) !important;
    }
    html[data-theme="light"] .archive-poster {
      border-color: rgba(31,37,48,.07) !important;
      background: #edf0f4 !important;
      box-shadow: 0 5px 14px rgba(38,45,61,.07) !important;
    }
    html[data-theme="light"] .archive-poster-fallback { color: #8a93a2 !important; }
    html[data-theme="light"] .archive-card-date { color: #52629e !important; }
    html[data-theme="light"] .archive-badge {
      color: #5b6575 !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(31,37,48,.025) !important;
    }
    html[data-theme="light"] .archive-empty {
      color: #687282 !important;
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.38) !important;
    }

    /* Anime detail pages. */
    html[data-theme="light"] .detail-back,
    html[data-theme="light"] .detail-breadcrumb,
    html[data-theme="light"] .detail-kicker,
    html[data-theme="light"] .alternate-titles,
    html[data-theme="light"] .panel-label,
    html[data-theme="light"] .panel-note,
    html[data-theme="light"] .source-heading span,
    html[data-theme="light"] .source-link small,
    html[data-theme="light"] .empty-state {
      color: #687282 !important;
    }
    html[data-theme="light"] .detail-back:hover,
    html[data-theme="light"] .detail-breadcrumb a:hover { color: #33437f !important; }
    html[data-theme="light"] .anime-localized h1,
    html[data-theme="light"] .panel-heading h2,
    html[data-theme="light"] .source-link strong,
    html[data-theme="light"] .release-value {
      color: #252b35 !important;
    }
    html[data-theme="light"] .detail-poster {
      border-color: rgba(31,37,48,.075) !important;
      background: #edf0f4 !important;
      box-shadow: 0 12px 28px rgba(38,45,61,.12) !important;
    }
    html[data-theme="light"] .detail-panel {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.57) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .detail-release-panel {
      background: rgba(245,247,252,.78) !important;
    }
    html[data-theme="light"] .detail-badge {
      color: #566171 !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(31,37,48,.025) !important;
    }
    html[data-theme="light"] .detail-action,
    html[data-theme="light"] .streaming-link,
    html[data-theme="light"] .source-link {
      color: #34405c !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.36) !important;
    }
    html[data-theme="light"] .detail-action:hover,
    html[data-theme="light"] .streaming-link:hover,
    html[data-theme="light"] .source-link:hover {
      color: #33437f !important;
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(93,112,215,.075) !important;
    }
    html[data-theme="light"] .detail-toast {
      color: #35405a !important;
      border-color: rgba(31,37,48,.08) !important;
      background: rgba(252,253,255,.97) !important;
      box-shadow: 0 12px 30px rgba(38,45,61,.12) !important;
    }

    /* About, privacy and policy pages. */
    html[data-theme="light"] .info-panel {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.60) !important;
      box-shadow: 0 8px 24px rgba(38,45,61,.045) !important;
    }
    html[data-theme="light"] .info-panel h2 { color: #252b35 !important; }
    html[data-theme="light"] .info-panel h3 { color: #303744 !important; }
    html[data-theme="light"] .info-panel p,
    html[data-theme="light"] .info-panel li { color: #4f596a !important; }
    html[data-theme="light"] .info-panel strong { color: #2a303b !important; }
    html[data-theme="light"] .info-panel a {
      color: #42558f !important;
      text-decoration-color: rgba(66,85,143,.30) !important;
    }
    html[data-theme="light"] .info-meta { color: #737d8e !important; }
    html[data-theme="light"] .info-callout {
      border-color: rgba(93,112,215,.14) !important;
      background: rgba(93,112,215,.055) !important;
      box-shadow: none !important;
    }

    /* Updates page. */
    html[data-theme="light"] .changelog-day,
    html[data-theme="light"] .changelog-entries,
    html[data-theme="light"] .changelog-entry {
      border-color: rgba(31,37,48,.075) !important;
    }
    html[data-theme="light"] .changelog-day-header h2,
    html[data-theme="light"] .changelog-entry-title { color: #252b35 !important; }
    html[data-theme="light"] .changelog-group > h3,
    html[data-theme="light"] .changelog-entry p,
    html[data-theme="light"] .changelog-source,
    html[data-theme="light"] .updates-empty { color: #687282 !important; }
    html[data-theme="light"] .changelog-source:hover,
    html[data-theme="light"] .changelog-source:focus-visible { color: #33437f !important; }

    /* Event list/detail pages and forms. */
    html[data-theme="light"] {
      --event-panel: rgba(255,255,255,.64) !important;
      --event-line: rgba(31,37,48,.07) !important;
      --event-muted: #687282 !important;
      --event-accent: #5265bd !important;
    }
    html[data-theme="light"] .event-card,
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible,
    html[data-theme="light"] .event-detail-panel {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.62) !important;
      box-shadow: 0 9px 24px rgba(38,45,61,.05) !important;
    }
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible {
      border-color: rgba(93,112,215,.17) !important;
      background: rgba(255,255,255,.78) !important;
    }
    html[data-theme="light"] .event-card-title,
    html[data-theme="light"] .event-detail-title { color: #252b35 !important; }
    html[data-theme="light"] .event-card-meta,
    html[data-theme="light"] .event-description,
    html[data-theme="light"] .event-action-note { color: #4f596a !important; }
    html[data-theme="light"] .event-card-meta dt,
    html[data-theme="light"] .event-meta-box span { color: #737d8e !important; }
    html[data-theme="light"] .event-meta-box strong,
    html[data-theme="light"] .event-form label { color: #303744 !important; }
    html[data-theme="light"] .event-back-link,
    html[data-theme="light"] .event-browse-link { color: #42558f !important; }
    html[data-theme="light"] .event-back-link:hover,
    html[data-theme="light"] .event-browse-link:hover,
    html[data-theme="light"] .event-browse-link:focus-visible { color: #33437f !important; }
    html[data-theme="light"] .event-meta-box,
    html[data-theme="light"] .event-eligibility-progress,
    html[data-theme="light"] .event-consent {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.38) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .event-condition {
      color: #56617a !important;
      border-color: rgba(93,112,215,.13) !important;
      background: rgba(93,112,215,.05) !important;
    }
    html[data-theme="light"] .event-condition > strong,
    html[data-theme="light"] .event-progress-head strong { color: #303744 !important; }
    html[data-theme="light"] .event-progress-head span,
    html[data-theme="light"] .event-entry-locked,
    html[data-theme="light"] .event-consent { color: #687282 !important; }
    html[data-theme="light"] .event-progress-track { background: rgba(31,37,48,.075) !important; }
    html[data-theme="light"] .event-action-panel,
    html[data-theme="light"] .event-entry-locked { border-color: rgba(31,37,48,.065) !important; }
    html[data-theme="light"] .event-secondary {
      color: #394355 !important;
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(255,255,255,.45) !important;
    }
    html[data-theme="light"] .event-email {
      color: #252b35 !important;
      border-color: rgba(31,37,48,.10) !important;
      background: rgba(255,255,255,.72) !important;
    }
    html[data-theme="light"] .event-email::placeholder { color: #8a93a2 !important; }
    html[data-theme="light"] .event-empty,
    html[data-theme="light"] .event-loading,
    html[data-theme="light"] .event-error {
      color: #687282 !important;
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.30) !important;
    }
    html[data-theme="light"] .event-complete {
      border-color: rgba(37,131,95,.15) !important;
      background: rgba(37,131,95,.045) !important;
    }
    html[data-theme="light"] .event-complete p { color: #587066 !important; }
    html[data-theme="light"] .event-complete-email { color: #303744 !important; }
    html[data-theme="light"] .event-cancelled {
      border-color: rgba(191,66,89,.15) !important;
      background: rgba(191,66,89,.045) !important;
    }
    html[data-theme="light"] .event-cancelled h2 { color: #873a49 !important; }
    html[data-theme="light"] .event-cancelled p { color: #6d5b61 !important; }

    /* Ranking page. */
    html[data-theme="light"] .ranking-page .hero::after {
      color: rgba(31,37,48,.035) !important;
    }
    html[data-theme="light"] .ranking-page .hero-kicker { color: #5265bd !important; }
    html[data-theme="light"] .ranking-page .hero p { color: #687282 !important; }
    html[data-theme="light"] .wishlist-rank-item:hover,
    html[data-theme="light"] .wishlist-rank-item:focus-visible { background: rgba(31,37,48,.025) !important; }
    html[data-theme="light"] .wishlist-rank-number { color: #657083 !important; }
    html[data-theme="light"] .wishlist-rank-item:nth-child(-n+3) .wishlist-rank-number { color: #5265bd !important; }
    html[data-theme="light"] .wishlist-rank-poster,
    html[data-theme="light"] .wishlist-podium-poster {
      color: #8993a3 !important;
      background: #edf0f4 !important;
    }
    html[data-theme="light"] .wishlist-podium-card {
      border-color: rgba(31,37,48,.07) !important;
      background: rgba(255,255,255,.62) !important;
      box-shadow: 0 12px 30px rgba(38,45,61,.065) !important;
    }
    html[data-theme="light"] .wishlist-podium-card:hover,
    html[data-theme="light"] .wishlist-podium-card:focus-visible {
      border-color: rgba(93,112,215,.19) !important;
      box-shadow: 0 16px 34px rgba(38,45,61,.085) !important;
    }
    html[data-theme="light"] .wishlist-podium-card.rank-1 {
      border-color: rgba(93,112,215,.18) !important;
      background: rgba(244,246,253,.82) !important;
    }
    html[data-theme="light"] .wishlist-podium-rank {
      color: #38435a !important;
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(252,253,255,.90) !important;
    }
    html[data-theme="light"] .rank-1 .wishlist-podium-rank {
      color: #40528f !important;
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(239,242,253,.94) !important;
    }
    html[data-theme="light"] .ranking-page .wishlist-ranking-list,
    html[data-theme="light"] .wishlist-ranking-retired-list {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.34) !important;
    }
    html[data-theme="light"] .ranking-page .wishlist-ranking-empty {
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.34) !important;
    }
    html[data-theme="light"] .wishlist-rank-completed {
      color: #687282 !important;
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(31,37,48,.025) !important;
    }
'''

text = THEME.read_text(encoding='utf-8')
if MARKER in text:
    raise SystemExit('v11 marker already present')
needle = "\n  `;\n\n  const style = document.createElement('style');"
if needle not in text:
    raise SystemExit('theme insertion point not found')
text = text.replace(needle, css + needle, 1)
THEME.write_text(text, encoding='utf-8')

cache_count = 0
meta_count = 0
for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in {'.html', '.js'}:
        continue
    if '.git' in path.parts:
        continue
    source = path.read_text(encoding='utf-8')
    updated = source.replace('20260911-theme10', '20260911-theme11')
    cache_count += source.count('20260911-theme10')
    if path.parent.name == 'scripts' or 'scripts' in path.parts:
        before = updated
        updated = updated.replace('<meta name="color-scheme" content="dark" />', '<meta name="color-scheme" content="light dark" />')
        meta_count += before.count('<meta name="color-scheme" content="dark" />')
    if updated != source:
        path.write_text(updated, encoding='utf-8')

print(f'cache refs bumped: {cache_count}')
print(f'generator color-scheme defaults fixed: {meta_count}')
