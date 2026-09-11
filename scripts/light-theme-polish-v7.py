from pathlib import Path

root = Path('.')
theme_path = root / 'theme.js'
text = theme_path.read_text(encoding='utf-8')
marker = "    @media (max-width: 520px) {\n      .settings-modal { padding: 16px; }"
block = r'''    /* Light theme polish v4: neutral verification, darker footer links, readable carousel. */
    html[data-theme="light"] .verification-trigger {
      color: rgba(48, 55, 68, .58) !important;
      border-color: transparent !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .verification-trigger svg {
      fill: transparent !important;
    }
    html[data-theme="light"] .verification-trigger:hover,
    html[data-theme="light"] .verification-trigger:focus-visible {
      color: #3f4858 !important;
      border-color: transparent !important;
      background: rgba(31, 37, 48, .035) !important;
    }

    html[data-theme="light"] footer .site-footer-links a {
      color: #4f596a !important;
    }
    html[data-theme="light"] footer .site-footer-links a:hover,
    html[data-theme="light"] footer .site-footer-links a:focus-visible {
      color: #303846 !important;
    }

    html[data-theme="light"] .upcoming-slide,
    html[data-theme="light"] .upcoming-slide:is(:hover, :active, :focus, :focus-visible) {
      background: rgba(250, 251, 253, .94) !important;
      backdrop-filter: blur(18px) saturate(104%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(104%) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] {
      background: rgba(252, 253, 254, .985) !important;
    }
    html[data-theme="light"] .upcoming-body {
      background: rgba(252, 253, 254, .97) !important;
      box-shadow: inset 0 1px 0 rgba(31, 37, 48, .035) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] .upcoming-body {
      background: rgba(252, 253, 254, .995) !important;
    }
    html[data-theme="light"] .upcoming-title {
      color: #252b35 !important;
    }
    html[data-theme="light"] .upcoming-date {
      color: #606a7b !important;
    }

'''
if 'Light theme polish v4:' not in text:
    if marker not in text:
        raise SystemExit('theme insertion marker not found')
    text = text.replace(marker, block + marker, 1)
    theme_path.write_text(text, encoding='utf-8')

for path in root.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in {'.html', '.js'}:
        continue
    if path.as_posix().startswith('.github/') or path.as_posix() == 'scripts/light-theme-polish-v7.py':
        continue
    source = path.read_text(encoding='utf-8')
    updated = source.replace('20260911-theme6', '20260911-theme7')
    if updated != source:
        path.write_text(updated, encoding='utf-8')
