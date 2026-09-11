from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

archive_css = ROOT / 'schedule-archive.css'
css = archive_css.read_text(encoding='utf-8')
wrong = '''\n/* Light theme archive kicker v12: remove dark gradient text treatment. */\nhtml[data-theme="light"] .archive-kicker {\n  color: #687282 !important;\n  background: none !important;\n  background-image: none !important;\n  -webkit-background-clip: border-box !important;\n  background-clip: border-box !important;\n  -webkit-text-fill-color: currentColor !important;\n  text-shadow: none !important;\n}\n'''
if wrong not in css:
    raise SystemExit('previous archive kicker override not found')
css = css.replace(wrong, '\n')
archive_css.write_text(css, encoding='utf-8')

theme = ROOT / 'theme.js'
theme_text = theme.read_text(encoding='utf-8')
marker = '/* Light theme archive hero v13: flat opaque surface, no page gradient bleed. */'
if marker not in theme_text:
    insert = '''\n\n    /* Light theme archive hero v13: flat opaque surface, no page gradient bleed. */\n    html[data-theme="light"] .archive-hero {\n      background: #fbfcfd !important;\n      background-image: none !important;\n      backdrop-filter: none !important;\n      -webkit-backdrop-filter: none !important;\n    }\n'''
    idx = theme_text.rfind('`;' )
    if idx == -1:
        raise SystemExit('theme CSS template terminator not found')
    theme_text = theme_text[:idx] + insert + theme_text[idx:]
    theme.write_text(theme_text, encoding='utf-8')

changed = 0
for path in ROOT.rglob('*'):
    if not path.is_file():
        continue
    if '.git' in path.parts:
        continue
    if path.suffix.lower() not in {'.html', '.js', '.css', '.py', '.yml', '.yaml'}:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    new = text.replace('20260911-theme11', '20260911-theme12')
    if new != text:
        path.write_text(new, encoding='utf-8')
        changed += 1

if changed == 0:
    raise SystemExit('theme11 cache references not found')
print(f'updated theme cache references in {changed} files')
