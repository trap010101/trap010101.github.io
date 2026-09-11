from pathlib import Path

styles = Path('styles.css')
text = styles.read_text(encoding='utf-8')
old = '''.hero::after {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  right: -110px;
  top: -150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(178,140,255,.32), transparent 68%);
  pointer-events: none;
}'''
new = '''.hero::after {
  content: none;
  display: none;
}'''
if old not in text:
    raise SystemExit('hero::after block not found')
styles.write_text(text.replace(old, new, 1), encoding='utf-8')

for path in Path('.').rglob('*.html'):
    source = path.read_text(encoding='utf-8')
    updated = source.replace('styles.css?v=20260905-resource-icons1', 'styles.css?v=20260911-hero1')
    if updated != source:
        path.write_text(updated, encoding='utf-8')
