from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
css_path = ROOT / 'schedule-archive.css'
css = css_path.read_text(encoding='utf-8')
marker = '/* Light theme archive kicker v12: remove dark gradient text treatment. */'
block = r'''

/* Light theme archive kicker v12: remove dark gradient text treatment. */
html[data-theme="light"] .archive-kicker {
  color: #687282 !important;
  background: none !important;
  background-image: none !important;
  -webkit-background-clip: border-box !important;
  background-clip: border-box !important;
  -webkit-text-fill-color: currentColor !important;
  text-shadow: none !important;
}
'''
if marker not in css:
    css_path.write_text(css.rstrip() + block + '\n', encoding='utf-8')

old = 'schedule-archive.css?v=20260908-ui1'
new = 'schedule-archive.css?v=20260911-light12'
for path in ROOT.rglob('*'):
    if not path.is_file():
        continue
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    if path.suffix.lower() not in {'.html', '.js'}:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    if old in text:
        path.write_text(text.replace(old, new), encoding='utf-8')
