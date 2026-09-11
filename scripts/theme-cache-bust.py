from pathlib import Path
import re

ROOT = Path('.')
LANG = re.compile(r'/language-switcher-compact\.js\?v=[^"\']+')
SECONDARY = re.compile(r'/secondary-header\.js\?v=[^"\']+')

changed = []
for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix not in {'.html', '.js'}:
        continue
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    source = path.read_text(encoding='utf-8')
    updated = LANG.sub('/language-switcher-compact.js?v=20260911-theme2', source)
    updated = SECONDARY.sub('/secondary-header.js?v=20260911-theme2', updated)
    if updated != source:
        path.write_text(updated, encoding='utf-8')
        changed.append(str(path))

print(f'Updated theme loader cache keys in {len(changed)} files.')
for item in changed:
    print(item)
