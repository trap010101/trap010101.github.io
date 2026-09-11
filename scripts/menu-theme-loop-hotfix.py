from pathlib import Path
import re

path = Path('theme.js')
source = path.read_text(encoding='utf-8')

old_copy = """  function updateControlCopy(control) {
    const copy = COPY[language()] || COPY.ko;
    const heading = control.querySelector('[data-theme-heading]');
    if (heading) heading.textContent = copy.theme;
    ['system', 'light', 'dark'].forEach(key => {
      const button = control.querySelector(`[data-theme-choice=\"${key}\"]`);
      const label = button?.querySelector('.theme-choice-label');
      if (label) label.textContent = copy[key];
      if (button) button.setAttribute('aria-label', `${copy.theme}: ${copy[key]}`);
    });
  }
"""
new_copy = """  function updateControlCopy(control) {
    const copy = COPY[language()] || COPY.ko;
    const heading = control.querySelector('[data-theme-heading]');
    if (heading && heading.textContent !== copy.theme) heading.textContent = copy.theme;
    ['system', 'light', 'dark'].forEach(key => {
      const button = control.querySelector(`[data-theme-choice=\"${key}\"]`);
      const label = button?.querySelector('.theme-choice-label');
      if (label && label.textContent !== copy[key]) label.textContent = copy[key];
      const ariaLabel = `${copy.theme}: ${copy[key]}`;
      if (button && button.getAttribute('aria-label') !== ariaLabel) button.setAttribute('aria-label', ariaLabel);
    });
  }
"""
if old_copy not in source:
    raise RuntimeError('updateControlCopy block not found')
source = source.replace(old_copy, new_copy, 1)

old_observer = """  const menuObserver = new MutationObserver(() => mountControl());
  if (document.body) menuObserver.observe(document.body, { childList: true, subtree: true });
"""
new_observer = """  const menuObserver = new MutationObserver(() => {
    if (!document.getElementById('themeMenuControl')) mountControl();
  });
  if (document.body) menuObserver.observe(document.body, { childList: true, subtree: true });
"""
if old_observer not in source:
    raise RuntimeError('menuObserver block not found')
source = source.replace(old_observer, new_observer, 1)
path.write_text(source, encoding='utf-8')

for file in Path('.').rglob('*'):
    if not file.is_file() or file.suffix not in {'.html', '.js'}:
        continue
    if any(part in {'.git', 'node_modules'} for part in file.parts):
        continue
    text = file.read_text(encoding='utf-8')
    updated = re.sub(r'(?<![A-Za-z0-9_-])/?theme\.js\?v=[^\"\']+', '/theme.js?v=20260911-theme3', text)
    updated = re.sub(r'(?<![A-Za-z0-9_-])/?language-switcher-compact\.js\?v=[^\"\']+', '/language-switcher-compact.js?v=20260911-theme3', updated)
    updated = re.sub(r'(?<![A-Za-z0-9_-])/?secondary-header\.js\?v=[^\"\']+', '/secondary-header.js?v=20260911-theme3', updated)
    if updated != text:
        file.write_text(updated, encoding='utf-8')
