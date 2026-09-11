from pathlib import Path

ROOT = Path('.')

def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f'{label}: expected text not found')
    return text.replace(old, new, 1)

# Build the light-theme logo from the production vector so geometry stays identical.
dark_logo = ROOT / 'assets/newanime-logo.svg'
light_logo = ROOT / 'assets/newanime-logo-light.svg'
logo = dark_logo.read_text(encoding='utf-8')
logo = replace_once(
    logo,
    'White-haired cat mascot at left, NewAni.me lettering in a pearl-white, lavender and ice-blue gradient at right. Transparent background. All lettering is outlined vector artwork.',
    'White-haired cat mascot at left, NewAni.me lettering in a deep charcoal, violet and slate-blue gradient at right. Transparent background. All lettering is outlined vector artwork.',
    'logo description'
)
for old, new in [
    ('#ffffff', '#242638'),
    ('#f7f4ff', '#34334f'),
    ('#e3ddff', '#514571'),
    ('#d5efff', '#315975'),
]:
    logo = replace_once(logo, f'stop-color="{old}"', f'stop-color="{new}"', f'logo gradient {old}')
light_logo.write_text(logo, encoding='utf-8')

# Theme controller: use the dedicated logo and refresh the light palette gradients.
theme_path = ROOT / 'theme.js'
theme = theme_path.read_text(encoding='utf-8')

theme = replace_once(
    theme,
    "  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)');\n",
    "  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)');\n  const DARK_LOGO_SRC = '/assets/newanime-logo.svg?v=20260909-logo2';\n  const LIGHT_LOGO_SRC = '/assets/newanime-logo-light.svg?v=20260911-light1';\n",
    'logo constants'
)

theme = replace_once(
    theme,
    "  function syncControls() {\n",
    "  function syncLogo(theme) {\n    const expected = theme === 'light' ? LIGHT_LOGO_SRC : DARK_LOGO_SRC;\n    document.querySelectorAll('img.brand-logo').forEach(img => {\n      if (img.getAttribute('src') !== expected) img.setAttribute('src', expected);\n    });\n  }\n\n  function syncControls() {\n",
    'sync logo function'
)

theme = replace_once(
    theme,
    "    syncMeta(theme);\n    syncControls();\n",
    "    syncMeta(theme);\n    syncLogo(theme);\n    syncControls();\n",
    'apply sync logo'
)

theme = replace_once(
    theme,
    "    html[data-theme=\"light\"] .brand-logo {\n      filter: brightness(.56) saturate(.92) contrast(1.12) drop-shadow(0 1px 0 rgba(255,255,255,.5)) !important;\n    }",
    "    html[data-theme=\"light\"] .brand-logo {\n      filter: none !important;\n    }",
    'light logo filter'
)

theme = replace_once(
    theme,
    "    html[data-theme=\"light\"] body {\n      background:\n        radial-gradient(circle at 11% 4%, rgba(113,94,215,.055), transparent 28rem),\n        radial-gradient(circle at 92% 14%, rgba(72,137,219,.045), transparent 32rem),\n        linear-gradient(180deg, #fafbfc 0%, #f6f7f9 48%, #f8f9fb 100%) !important;\n    }",
    "    html[data-theme=\"light\"] body {\n      background:\n        radial-gradient(circle at 9% 2%, rgba(81,69,113,.075), transparent 27rem),\n        radial-gradient(circle at 92% 18%, rgba(49,89,117,.070), transparent 34rem),\n        linear-gradient(135deg, #fffefe 0%, #f8f6fb 46%, #f2f7fa 100%) !important;\n    }",
    'light body gradient'
)

theme = replace_once(
    theme,
    "      background:\n        linear-gradient(135deg, rgba(108,91,205,.055), rgba(73,125,195,.025)),\n        #ffffff !important;",
    "      background:\n        linear-gradient(120deg, rgba(81,69,113,.078) 0%, rgba(255,255,255,.92) 48%, rgba(49,89,117,.064) 100%),\n        #ffffff !important;",
    'light hero gradient'
)

theme = replace_once(
    theme,
    "      background:\n        radial-gradient(circle at 90% 0%, rgba(93,112,215,.055), transparent 17rem),\n        #ffffff !important;",
    "      background:\n        radial-gradient(circle at 8% 0%, rgba(81,69,113,.055), transparent 15rem),\n        radial-gradient(circle at 96% 0%, rgba(49,89,117,.050), transparent 18rem),\n        #ffffff !important;",
    'light modal gradient'
)

theme = replace_once(
    theme,
    "      background:\n        radial-gradient(circle at 18% -10%, rgba(93,112,215,.085), transparent 38%),\n        #ffffff !important;",
    "      background:\n        radial-gradient(circle at 14% -10%, rgba(81,69,113,.075), transparent 36%),\n        radial-gradient(circle at 92% 8%, rgba(49,89,117,.045), transparent 28%),\n        #ffffff !important;",
    'settings gradient'
)

theme_path.write_text(theme, encoding='utf-8')

# Bust shared loaders everywhere, including generated pages and their generators.
for file in ROOT.rglob('*'):
    if not file.is_file() or file.suffix not in {'.html', '.js'}:
        continue
    if any(part in {'.git', 'node_modules'} for part in file.parts):
        continue
    text = file.read_text(encoding='utf-8')
    updated = text.replace('/theme.js?v=20260911-theme4', '/theme.js?v=20260911-theme5')
    updated = updated.replace('/language-switcher-compact.js?v=20260911-theme4', '/language-switcher-compact.js?v=20260911-theme5')
    updated = updated.replace('/secondary-header.js?v=20260911-theme4', '/secondary-header.js?v=20260911-theme5')
    if updated != text:
        file.write_text(updated, encoding='utf-8')

# Ensure the shared loaders themselves request the newest theme controller even if an older key remains.
for name in ['language-switcher-compact.js', 'secondary-header.js']:
    path = ROOT / name
    text = path.read_text(encoding='utf-8')
    import re
    updated = re.sub(r'/theme\.js\?v=20260911-theme\d+', '/theme.js?v=20260911-theme5', text)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
