from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

wishlist_path = ROOT / 'wishlist.js'
text = wishlist_path.read_text(encoding='utf-8')
old = '''  function posterMarkup(anime) {
    if (!anime?.poster?.src) return '<span class="wishlist-poster wishlist-poster-fallback" aria-hidden="true">?</span>';
    return `<span class="wishlist-poster"><img src="${anime.poster.src}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" style="object-position:${anime.poster.position || 'center center'}" onerror="this.remove();this.parentElement.classList.add('wishlist-poster-fallback');this.parentElement.textContent='?'"></span>`;
  }
'''
new = '''  function posterSrc(anime) {
    const raw = String(anime?.poster?.src || '').trim();
    if (!raw) return '';
    if (/^(?:https?:)?\\/\\//i.test(raw) || /^(?:data|blob):/i.test(raw)) return raw;
    return `/${raw.replace(/^\\/+/, '')}`;
  }

  function posterMarkup(anime) {
    const src = posterSrc(anime);
    if (!src) return '<span class="wishlist-poster wishlist-poster-fallback" aria-hidden="true">?</span>';
    return `<span class="wishlist-poster"><img src="${src}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" style="object-position:${anime.poster.position || 'center center'}" onerror="this.remove();this.parentElement.classList.add('wishlist-poster-fallback');this.parentElement.textContent='?'"></span>`;
  }
'''
if old not in text:
    raise SystemExit('wishlist posterMarkup target not found')
text = text.replace(old, new, 1)
wishlist_path.write_text(text, encoding='utf-8')

# Ensure both direct and secondary loaders fetch the corrected wishlist implementation,
# and refresh secondary-auth-bootstrap itself so nested pages cannot keep the old loader.
text_suffixes = {'.html', '.js'}
for path in ROOT.rglob('*'):
    if not path.is_file() or path.suffix not in text_suffixes:
        continue
    if '.git' in path.parts:
        continue
    source = path.read_text(encoding='utf-8')
    updated = re.sub(r'(wishlist\.js\?v=)[^\"\'\s<)]+', r'\g<1>20260911-poster1', source)
    updated = re.sub(r'(secondary-auth-bootstrap\.js\?v=)[^\"\'\s<)]+', r'\g<1>20260911-wishlist1', updated)
    if updated != source:
        path.write_text(updated, encoding='utf-8')

labels = {
    ROOT / 'about' / 'index.html': 'ABOUT NEWANIME',
    ROOT / 'privacy' / 'index.html': 'PRIVACY',
    ROOT / 'policy' / 'index.html': 'VERIFICATION POLICY',
}
for path, old_label in labels.items():
    source = path.read_text(encoding='utf-8')
    target = f'<div class="hero-kicker">{old_label}</div>'
    count = source.count(target)
    if count != 3:
        raise SystemExit(f'{path}: expected 3 hero kickers for {old_label}, found {count}')
    source = source.replace(target, '<div class="hero-kicker">newani.me</div>')
    path.write_text(source, encoding='utf-8')

# Verification: no old info-page kicker survives and the wishlist normalizer exists.
assert 'function posterSrc(anime)' in wishlist_path.read_text(encoding='utf-8')
assert 'src="${src}"' in wishlist_path.read_text(encoding='utf-8')
for path, old_label in labels.items():
    source = path.read_text(encoding='utf-8')
    assert f'<div class="hero-kicker">{old_label}</div>' not in source
    assert source.count('<div class="hero-kicker">newani.me</div>') == 3

print('Fixed secondary wishlist poster paths and info-page hero kickers.')
