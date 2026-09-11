from pathlib import Path


def patch_theme():
    path = Path('theme.js')
    source = path.read_text(encoding='utf-8')

    source = source.replace(
        "return VALID.has(value) ? value : 'system';",
        "return VALID.has(value) ? value : 'dark';",
    )
    source = source.replace(
        "    } catch (_) {\n      return 'system';\n    }\n  }\n\n  function safeSet(value)",
        "    } catch (_) {\n      return 'dark';\n    }\n  }\n\n  function safeSet(value)",
    )

    marker = '    html[data-theme="light"] .event-status {'
    patch_marker = '    /* Light-theme completeness patch: hard-coded dark components. */'
    patch = '''    /* Light-theme completeness patch: hard-coded dark components. */
    html[data-theme="light"] .upcoming-slide,
    html[data-theme="light"] .upcoming-slide:is(:hover, :active, :focus, :focus-visible) {
      color: #252b38 !important;
      border-color: rgba(25,31,43,.11) !important;
      background: rgba(255,255,255,.94) !important;
      box-shadow: 0 16px 32px rgba(42,50,70,.13) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] {
      border-color: rgba(97,117,222,.34) !important;
      box-shadow: 0 18px 38px rgba(42,50,70,.17) !important;
    }
    html[data-theme="light"] .upcoming-poster { background: #e8ecf4 !important; }
    html[data-theme="light"] .upcoming-countdown { color: #5368c8 !important; }
    html[data-theme="light"] .upcoming-date { color: #6f7889 !important; }

    html[data-theme="light"] .wishlist-summary {
      color: #52617f !important;
      border-color: rgba(97,117,222,.16) !important;
      background: rgba(97,117,222,.06) !important;
    }
    html[data-theme="light"] .wishlist-item {
      border-color: rgba(25,31,43,.08) !important;
      background: rgba(31,38,54,.025) !important;
    }
    html[data-theme="light"] .wishlist-item-copy strong { color: #252b38 !important; }
    html[data-theme="light"] .wishlist-item-copy > span,
    html[data-theme="light"] .wishlist-unavailable,
    html[data-theme="light"] .wishlist-empty { color: #747d8f !important; }
    html[data-theme="light"] .wishlist-poster {
      color: #8c95a4 !important;
      border-color: rgba(25,31,43,.08) !important;
      background: #edf0f5 !important;
    }
    html[data-theme="light"] .wishlist-close,
    html[data-theme="light"] .wishlist-remove {
      border-color: rgba(25,31,43,.08) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .wishlist-close { color: #596274 !important; }

    html[data-theme="light"] .auth-dialog,
    html[data-theme="light"] .detail-account-dialog {
      border-color: rgba(25,31,43,.11) !important;
      background: radial-gradient(circle at 18% -12%, rgba(97,117,222,.11), transparent 38%), #fff !important;
      box-shadow: 0 26px 76px rgba(42,50,70,.20), inset 0 1px rgba(255,255,255,.6) !important;
    }
    html[data-theme="light"] .auth-dialog::before,
    html[data-theme="light"] .detail-account-dialog::before {
      background: linear-gradient(90deg, transparent, rgba(97,117,222,.24), transparent) !important;
    }
    html[data-theme="light"] .auth-kicker,
    html[data-theme="light"] .detail-account-kicker { color: #5f72d4 !important; }
    html[data-theme="light"] .auth-description,
    html[data-theme="light"] .detail-account-description,
    html[data-theme="light"] .auth-account-copy span,
    html[data-theme="light"] .detail-account-profile span,
    html[data-theme="light"] .auth-status,
    html[data-theme="light"] .detail-account-status { color: #747d8f !important; }
    html[data-theme="light"] .auth-close,
    html[data-theme="light"] .detail-account-close,
    html[data-theme="light"] .auth-signout,
    html[data-theme="light"] .detail-account-signout,
    html[data-theme="light"] .detail-account-button {
      color: #596274 !important;
      border-color: rgba(25,31,43,.09) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .auth-close:hover,
    html[data-theme="light"] .detail-account-close:hover,
    html[data-theme="light"] .auth-signout:hover,
    html[data-theme="light"] .detail-account-signout:hover {
      color: #314278 !important;
      border-color: rgba(97,117,222,.22) !important;
      background: rgba(97,117,222,.08) !important;
    }
    html[data-theme="light"] .auth-account-avatar,
    html[data-theme="light"] .detail-account-profile > img,
    html[data-theme="light"] .detail-account-profile-fallback {
      border-color: rgba(97,117,222,.25) !important;
      background: #eef1f6 !important;
      box-shadow: 0 0 0 4px rgba(97,117,222,.04), 0 10px 24px rgba(42,50,70,.12) !important;
    }

'''
    if patch_marker not in source:
        if marker not in source:
            raise RuntimeError('Could not find light-theme insertion marker')
        source = source.replace(marker, patch + marker, 1)

    path.write_text(source, encoding='utf-8')


def patch_loader(filename):
    path = Path(filename)
    source = path.read_text(encoding='utf-8')
    source = source.replace(
        "const preference = ['system', 'light', 'dark'].includes(saved) ? saved : 'system';",
        "const preference = ['system', 'light', 'dark'].includes(saved) ? saved : 'dark';",
    )
    source = source.replace('/theme.js?v=20260911-theme1', '/theme.js?v=20260911-theme2')
    path.write_text(source, encoding='utf-8')


patch_theme()
patch_loader('language-switcher-compact.js')
patch_loader('secondary-header.js')
