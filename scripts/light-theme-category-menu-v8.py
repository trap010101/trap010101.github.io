from pathlib import Path

root = Path('.')
theme_path = root / 'theme.js'
text = theme_path.read_text(encoding='utf-8')
marker = '/* Light theme polish v8: category color harmony and opaque hamburger menu. */'
if marker not in text:
    insert = r'''

    /* Light theme polish v8: category color harmony and opaque hamburger menu. */
    html[data-theme="light"] #filters .chip[data-filter]:not([data-filter="all"]) {
      color: rgb(var(--category-rgb)) !important;
      color: color-mix(in srgb, rgb(var(--category-rgb)) 72%, #111827 28%) !important;
      border-color: rgba(var(--category-rgb), .24) !important;
      background: rgba(var(--category-rgb), .115) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.34) !important;
    }
    html[data-theme="light"] #filters .chip[data-filter]:not([data-filter="all"]):hover {
      color: rgb(var(--category-rgb)) !important;
      color: color-mix(in srgb, rgb(var(--category-rgb)) 68%, #101827 32%) !important;
      border-color: rgba(var(--category-rgb), .34) !important;
      background: rgba(var(--category-rgb), .16) !important;
    }
    html[data-theme="light"] #filters .chip.active:not([data-filter="all"]) {
      color: rgb(var(--category-rgb)) !important;
      color: color-mix(in srgb, rgb(var(--category-rgb)) 64%, #0f172a 36%) !important;
      border-color: rgba(var(--category-rgb), .40) !important;
      background: rgba(var(--category-rgb), .205) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 4px 12px rgba(var(--category-rgb), .075) !important;
    }
    html[data-theme="light"] .site-menu {
      border-color: rgba(31,37,48,.10) !important;
      background:
        linear-gradient(145deg, rgba(93,112,215,.035), transparent 58%),
        rgba(252,253,255,.985) !important;
      box-shadow: 0 18px 44px rgba(38,45,61,.145) !important;
      backdrop-filter: blur(20px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(20px) saturate(108%) !important;
    }
'''
    needle = '\n  `;\n\n  const style = document.createElement(\'style\');'
    if needle not in text:
        raise SystemExit('Could not find theme CSS terminator')
    text = text.replace(needle, insert + needle, 1)
    theme_path.write_text(text, encoding='utf-8')

# Bump the shared theme cache token everywhere it is generated/referenced.
for path in root.rglob('*'):
    if not path.is_file():
        continue
    if '.git' in path.parts or path == theme_path:
        continue
    try:
        data = path.read_text(encoding='utf-8')
    except (UnicodeDecodeError, OSError):
        continue
    if '20260911-theme7' in data:
        path.write_text(data.replace('20260911-theme7', '20260911-theme8'), encoding='utf-8')
