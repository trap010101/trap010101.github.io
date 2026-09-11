from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
theme = ROOT / 'theme.js'
text = theme.read_text(encoding='utf-8')
anchor = '''    html[data-theme="light"] .archive-hero::after,\n    html[data-theme="light"] .detail-hero-card::after {\n      display: none !important;\n    }\n'''
insert = '''    html[data-theme="light"] .archive-hero::after,\n    html[data-theme="light"] .detail-hero-card::after {\n      display: none !important;\n    }\n\n    /* Archive hero must be completely flat in light mode. */\n    html[data-theme="light"] .archive-hero {\n      background: #fbfcfd !important;\n      background-image: none !important;\n      backdrop-filter: none !important;\n      -webkit-backdrop-filter: none !important;\n    }\n'''
if anchor not in text:
    raise SystemExit('archive hero anchor not found')
if 'Archive hero must be completely flat in light mode.' not in text:
    text = text.replace(anchor, insert, 1)
    theme.write_text(text, encoding='utf-8')

changed = 0
for path in ROOT.rglob('*'):
    if not path.is_file() or '.git' in path.parts:
        continue
    if path.suffix.lower() not in {'.html', '.js', '.css', '.py', '.yml', '.yaml'}:
        continue
    try:
        src = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    dst = src.replace('20260911-theme12', '20260911-theme13')
    if dst != src:
        path.write_text(dst, encoding='utf-8')
        changed += 1
if changed == 0:
    raise SystemExit('theme12 cache references not found')
print(f'updated theme cache references in {changed} files')
