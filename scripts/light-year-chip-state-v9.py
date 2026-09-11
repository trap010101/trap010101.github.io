from pathlib import Path

root = Path('.')
theme = root / 'theme.js'
text = theme.read_text(encoding='utf-8')

marker = '''    /* Light theme polish v8: category color harmony and opaque hamburger menu. */'''
if marker not in text:
    raise SystemExit('v8 marker not found')

insert_before = '''\n  `;\n\n  const style = document.createElement('style');'''
if insert_before not in text:
    raise SystemExit('theme css end marker not found')

block = r'''

    /* Light theme polish v9: stable year filter states. */
    html[data-theme="light"] #yearFilters .year-chip:not(.active) {
      color: #556071 !important;
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(255,255,255,.54) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] #yearFilters .year-chip:not(.active):hover,
    html[data-theme="light"] #yearFilters .year-chip:not(.active):focus-visible {
      color: #35405a !important;
      border-color: rgba(93,112,215,.18) !important;
      background: rgba(255,255,255,.76) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] #yearFilters .year-chip.active,
    html[data-theme="light"] #yearFilters .year-chip.active:hover,
    html[data-theme="light"] #yearFilters .year-chip.active:focus-visible {
      color: #33437f !important;
      border-color: rgba(93,112,215,.30) !important;
      background: linear-gradient(135deg, rgba(93,112,215,.145), rgba(128,101,211,.105)) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.42), 0 4px 12px rgba(93,112,215,.055) !important;
      transform: none !important;
    }
'''

text = text.replace(insert_before, block + insert_before, 1)
theme.write_text(text, encoding='utf-8')

# Bust every shared theme loader/reference so the state fix is applied immediately.
for path in root.rglob('*'):
    if not path.is_file():
        continue
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    try:
        data = path.read_text(encoding='utf-8')
    except Exception:
        continue
    if '20260911-theme8' in data:
        path.write_text(data.replace('20260911-theme8', '20260911-theme9'), encoding='utf-8')
