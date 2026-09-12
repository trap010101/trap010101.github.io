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

# First, make the canonical anime object durable even if its current poster is not v2.
anime_path = ROOT / 'data/anime.js'
text = anime_path.read_text(encoding='utf-8')
anchor = f'"id": "{ANIME_ID}"'
start = text.find(anchor)
if start < 0:
    raise SystemExit(f'Anime ID not found in {anime_path}: {ANIME_ID}')
next_obj = text.find('\n  {\n    "id": ', start + len(anchor))
end = next_obj if next_obj >= 0 else text.find('\n];', start)
if end < 0:
    raise SystemExit('Could not locate end of target anime object')
block = text[start:end]
block2 = block.replace(OLD_TITLE, NEW_TITLE)
block2, count = re.subn(
    r'("poster"\s*:\s*\{\s*"src"\s*:\s*")[^"]+("\s*,)',
    rf'\1{NEW_POSTER_PATH}\2',
    block2,
    count=1,
)
if count != 1:
    raise SystemExit('Could not update canonical poster source')
if block2 != block:
    text = text[:start] + block2 + text[end:]
    anime_path.write_text(text, encoding='utf-8')
    changed.append(str(anime_path))

# Keep every generated/static representation and existing override in sync.
for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
        continue
    if any(part in SKIP_PARTS for part in path.parts):
        continue
    if path == anime_path:
        current = path.read_text(encoding='utf-8')
    else:
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

# Bust only the data resources relevant to this title/poster so mobile clients do not retain stale data.
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
poster_fix = (ROOT / 'data/poster-fixes-20260905.js').read_text(encoding='utf-8')
if NEW_POSTER_PATH not in poster_fix:
    raise SystemExit('Poster override did not update')
if OLD_TITLE in (ROOT / f'anime/{ANIME_ID}/index.html').read_text(encoding='utf-8'):
    raise SystemExit('Generated detail page still has old Korean title')
detail = (ROOT / f'anime/{ANIME_ID}/index.html').read_text(encoding='utf-8')
if NEW_TITLE not in detail or NEW_POSTER not in detail:
    raise SystemExit('Generated detail page is not synchronized')

print('Changed files:')
for item in changed:
    print(' -', item)
