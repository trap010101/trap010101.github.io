from pathlib import Path

root = Path('.')
theme = root / 'theme.js'
text = theme.read_text(encoding='utf-8')

repls = [
    ("settings: '설정', settingsTitle: '설정', settingsDescription: '사이트 표시 환경을 설정합니다.',",
     "settings: '설정', settingsKicker: 'newani.me', settingsTitle: '설정', settingsDescription: '사이트 표시 환경을 설정합니다.',"),
    ("settings: '設定', settingsTitle: '設定', settingsDescription: 'サイトの表示環境を設定します。',",
     "settings: '設定', settingsKicker: 'newani.me', settingsTitle: '設定', settingsDescription: 'サイトの表示環境を設定します。',"),
    ("settings: 'SETTINGS', settingsTitle: 'Settings', settingsDescription: 'Customize how NewAnime is displayed.',",
     "settings: 'SETTINGS', settingsKicker: 'newani.me', settingsTitle: 'Settings', settingsDescription: 'Customize how NewAnime is displayed.',"),
    ("""    .settings-kicker {\n      margin: 0 0 7px;\n      color: #91a2ff;\n      font-size: 9px;\n      font-weight: 900;\n      letter-spacing: .13em;\n      text-transform: uppercase;\n    }""",
     """    .settings-kicker {\n      margin: 0 0 6px;\n      color: #8993a7;\n      font-size: 10px;\n      font-weight: 900;\n      letter-spacing: .13em;\n      text-transform: none;\n    }"""),
    ('html[data-theme="light"] .settings-kicker { color: #5669c8 !important; }',
     'html[data-theme="light"] .settings-kicker { color: #8993a7 !important; }'),
    ('<div class="settings-kicker" data-settings-kicker>SETTINGS</div>',
     '<div class="settings-kicker" data-settings-kicker>newani.me</div>'),
    ("['[data-settings-kicker]', copy.settings],",
     "['[data-settings-kicker]', copy.settingsKicker],"),
]

for old, new in repls:
    if old not in text:
        raise SystemExit(f'missing expected theme.js pattern: {old[:80]}')
    text = text.replace(old, new, 1)

theme.write_text(text, encoding='utf-8')

# Bust the shared theme loader cache everywhere it is referenced.
for path in root.rglob('*'):
    if not path.is_file():
        continue
    if path.parts[0] in {'.git', 'assets'}:
        continue
    if path.suffix.lower() not in {'.html', '.js', '.css', '.py', '.yml', '.yaml'}:
        continue
    try:
        data = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    updated = data.replace('20260911-theme13', '20260911-theme14')
    if updated != data:
        path.write_text(updated, encoding='utf-8')

# Sanity checks.
check = theme.read_text(encoding='utf-8')
assert "settingsKicker: 'newani.me'" in check
assert "['[data-settings-kicker]', copy.settingsKicker]" in check
assert 'font-size: 10px;' in check
assert 'text-transform: none;' in check
