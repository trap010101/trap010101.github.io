from pathlib import Path

ROOT = Path('.')

# Core controller: invalid/missing preferences now resolve to system.
theme = ROOT / 'theme.js'
text = theme.read_text(encoding='utf-8')
replacements = {
    "return VALID.has(value) ? value : 'dark';": "return VALID.has(value) ? value : 'system';",
    "return 'dark';\n    }\n  }": "return 'system';\n    }\n  }",
    "preference = VALID.has(next) ? next : 'dark';": "preference = VALID.has(next) ? next : 'system';",
}
for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f'missing theme.js pattern: {old!r}')
    text = text.replace(old, new)
theme.write_text(text, encoding='utf-8')

# Shared bootstraps must agree with the controller before it loads.
for rel in ['language-switcher-compact.js', 'secondary-header.js']:
    path = ROOT / rel
    text = path.read_text(encoding='utf-8')
    old = "const preference = ['system', 'light', 'dark'].includes(saved) ? saved : 'dark';"
    new = "const preference = ['system', 'light', 'dark'].includes(saved) ? saved : 'system';"
    if old not in text:
        raise SystemExit(f'missing bootstrap pattern in {rel}')
    path.write_text(text.replace(old, new), encoding='utf-8')

# Native controls should no longer advertise dark-only before the shared theme boots.
for path in ROOT.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    new = text.replace('<meta name="color-scheme" content="dark" />', '<meta name="color-scheme" content="light dark" />')
    if new != text:
        path.write_text(new, encoding='utf-8')

# Bust shared theme caches everywhere they are referenced.
for pattern in ('*.html', '*.js'):
    for path in ROOT.rglob(pattern):
        if '.git' in path.parts:
            continue
        text = path.read_text(encoding='utf-8')
        new = text.replace('20260911-theme9', '20260911-theme10')
        if new != text:
            path.write_text(new, encoding='utf-8')
