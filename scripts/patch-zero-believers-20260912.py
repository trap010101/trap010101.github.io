from pathlib import Path
import re

ROOT = Path('.')
ANIME_ID = 'zero-believers-goddess-isekai-strategy'
OLD_TITLE = '신자 제로의 여신님과 시작하는 이세계 공략'
NEW_TITLE = '신자 0명 여신님과 시작하는 이세계 공략'
OLD_POSTER = 'zero-believers-goddess-isekai-strategy-v2.webp'
NEW_POSTER = 'zero-believers-goddess-isekai-strategy-user-20260912.webp'
NEW_POSTER_PATH = f'assets/posters/{NEW_POSTER}'

TEXT_EXTS = {'.js', '.html', '.json', '.xml'}
SKIP_PARTS = {'.git', 'node_modules'}
changed = []

# The title is sourced from the audited additions file, not the base anime.js file.
source_path = ROOT / 'data/anime-20260904.js'
text = source_path.read_text(encoding='utf-8')
anchor = f'id: "{ANIME_ID}"'
start = text.find(anchor)
if start < 0:
    raise SystemExit(f'Anime ID not found in {source_path}: {ANIME_ID}')
next_obj = text.find('\n    {\n      id: "', start + len(anchor))
end = next_obj if next_obj >= 0 else text.find('\n  ];', start)
if end < 0:
    raise SystemExit('Could not locate end of target anime object')
block = text[start:end]
block2 = block.replace(OLD_TITLE, NEW_TITLE)
block2, count = re.subn(
    r'poster:\s*(?:null|\{[^\n]*\})\s*,',
    f'poster: {{ src: "{NEW_POSTER_PATH}", position: "center center" }},',
    block2,
    count=1,
)
if count != 1:
    raise SystemExit('Could not update audited source poster')
block2 = re.sub(r'updatedAt:\s*VERIFIED_AT', 'updatedAt: "2026-09-12"', block2, count=1)
if block2 == block:
    raise SystemExit('Target source block was not changed')
text = text[:start] + block2 + text[end:]
source_path.write_text(text, encoding='utf-8')
changed.append(str(source_path))

# Keep generated/static representations and the poster override in sync.
for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
        continue
    if any(part in SKIP_PARTS for part in path.parts):
        continue
    try:
        current = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    updated = current.replace(OLD_TITLE, NEW_TITLE).replace(OLD_POSTER, NEW_POSTER)
    if path.as_posix() == 'data/poster-fixes-20260905.js':
        updated = re.sub(
            rf'("{re.escape(ANIME_ID)}"\s*:\s*\{{\s*src:\s*"{re.escape(NEW_POSTER_PATH)}",\s*updatedAt:\s*")[^"]+("\s*\}})',
            rf'\g<1>2026-09-12\2',
            updated,
        )
    if updated != current:
        path.write_text(updated, encoding='utf-8')
        if str(path) not in changed:
            changed.append(str(path))

# Bust relevant data resources so cached mobile pages load the corrected title/poster.
cache_replacements = {
    'data/anime.js?v=20260907-schedule1': 'data/anime.js?v=20260912-zero1',
    '/data/anime.js?v=20260907-schedule1': '/data/anime.js?v=20260912-zero1',
    'data/anime-20260904.js?v=20260910-data3': 'data/anime-20260904.js?v=20260912-zero1',
    '/data/anime-20260904.js?v=20260910-data3': '/data/anime-20260904.js?v=20260912-zero1',
    'data/title-fixes-20260905.js?v=20260909-title2': 'data/title-fixes-20260905.js?v=20260912-zero1',
    '/data/title-fixes-20260905.js?v=20260909-title2': '/data/title-fixes-20260905.js?v=20260912-zero1',
    'data/title-hotfix-20260909.js?v=20260909-1': 'data/title-hotfix-20260909.js?v=20260912-zero1',
    '/data/title-hotfix-20260909.js?v=20260909-1': '/data/title-hotfix-20260909.js?v=20260912-zero1',
    'data/poster-fixes-20260905.js?v=20260907-posters4': 'data/poster-fixes-20260905.js?v=20260912-zero1',
    '/data/poster-fixes-20260905.js?v=20260907-posters4': '/data/poster-fixes-20260905.js?v=20260912-zero1',
}
for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
        continue
    if any(part in SKIP_PARTS for part in path.parts):
        continue
    try:
        current = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    updated = current
    for old, new in cache_replacements.items():
        updated = updated.replace(old, new)
    if updated != current:
        path.write_text(updated, encoding='utf-8')
        if str(path) not in changed:
            changed.append(str(path))

# Focused assertions.
source = source_path.read_text(encoding='utf-8')
if NEW_TITLE not in source or NEW_POSTER_PATH not in source:
    raise SystemExit('Audited source is not synchronized')
poster_fix = (ROOT / 'data/poster-fixes-20260905.js').read_text(encoding='utf-8')
if NEW_POSTER_PATH not in poster_fix:
    raise SystemExit('Poster override did not update')
detail = (ROOT / f'anime/{ANIME_ID}/index.html').read_text(encoding='utf-8')
if OLD_TITLE in detail:
    raise SystemExit('Generated detail page still has old Korean title')
if NEW_TITLE not in detail or NEW_POSTER not in detail:
    raise SystemExit('Generated detail page is not synchronized')

print('Changed files:')
for item in changed:
    print(' -', item)
