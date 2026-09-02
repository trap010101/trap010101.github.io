from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8')

marker = '''function render() {
  const q = searchEl.value.trim().toLowerCase();'''
helper = '''function scheduleDateSortKey(date) {
  const exactMatch = /^(\\d{1,2})\\/(\\d{1,2})$/.exec(date);
  if (exactMatch) return [0, Number(exactMatch[1]), Number(exactMatch[2])];

  const monthOnlyMatch = /^(\\d{1,2})월$/.exec(date);
  if (monthOnlyMatch) return [1, Number(monthOnlyMatch[1]), 0];

  return [2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
}

function compareScheduleItems(a, b) {
  const aKey = scheduleDateSortKey(a[1]);
  const bKey = scheduleDateSortKey(b[1]);

  for (let i = 0; i < aKey.length; i += 1) {
    if (aKey[i] !== bKey[i]) return aKey[i] - bKey[i];
  }
  return 0;
}

function render() {
  const q = searchEl.value.trim().toLowerCase();'''

if 'function scheduleDateSortKey(date)' not in text:
    if marker not in text:
        raise SystemExit('Could not locate render() marker')
    text = text.replace(marker, helper, 1)

old = '''    const items = month.items.filter(([title, date, tags]) => {
      const searchPool = [title, ...Object.values(titleLocales[title] || {})].join(" ").toLowerCase();
      const searchOk = !q || searchPool.includes(q);
      const filterOk = activeFilter === "all" || tags.includes(activeFilter);
      return searchOk && filterOk;
    });'''
new = '''    const items = month.items.filter(([title, date, tags]) => {
      const searchPool = [title, ...Object.values(titleLocales[title] || {})].join(" ").toLowerCase();
      const searchOk = !q || searchPool.includes(q);
      const filterOk = activeFilter === "all" || tags.includes(activeFilter);
      return searchOk && filterOk;
    }).sort(compareScheduleItems);'''

if old in text:
    text = text.replace(old, new, 1)
elif '}).sort(compareScheduleItems);' not in text:
    raise SystemExit('Could not locate month item filtering block')

path.write_text(text, encoding='utf-8')

scripts = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', text, flags=re.S)
inline = '\n'.join(s for s in scripts if s.strip() and 'application/ld+json' not in s[:100])
Path('tools/temp_inline_script.js').write_text(inline, encoding='utf-8')
