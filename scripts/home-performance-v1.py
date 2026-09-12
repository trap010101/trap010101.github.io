from pathlib import Path
import re

ROOT = Path('.')

# 1) Let same-origin runtime/data scripts download in parallel while preserving
# execution order, and bust only the assets changed by this patch.
index_path = ROOT / 'index.html'
index = index_path.read_text(encoding='utf-8')
original_index = index
index = re.sub(r'<script src="([^"]+)"></script>', r'<script defer src="\1"></script>', index)
index = index.replace('styles.css?v=20260911-hero1', 'styles.css?v=20260912-perf1')
index = index.replace('app.js?v=20260908-logo-refresh1', 'app.js?v=20260912-perf1')
if index == original_index:
    raise SystemExit('index.html: expected performance replacements were not applied')
index_path.write_text(index, encoding='utf-8')

# 2) Skip building the large 2027 undated list when another year is active.
# 3) Measure title overflow only for months near the viewport instead of every
# title in the entire year on each render/font/resize pass.
app_path = ROOT / 'app.js'
app = app_path.read_text(encoding='utf-8')

old_undated_start = '''function renderUndated() {\n  const undatedAnime = animeData.filter(anime =>\n'''
new_undated_start = '''function renderUndated() {\n  const list = document.getElementById("undatedList");\n  const shouldRender = activeYear === 2027;\n  undatedSection.classList.toggle("hidden", !shouldRender);\n\n  if (!shouldRender) {\n    if (list?.childElementCount) list.replaceChildren();\n    return;\n  }\n\n  const undatedAnime = animeData.filter(anime =>\n'''
if old_undated_start not in app:
    raise SystemExit('app.js: renderUndated start not found')
app = app.replace(old_undated_start, new_undated_start, 1)
app = app.replace('  document.getElementById("undatedList").innerHTML = undatedAnime.map(anime => `', '  list.innerHTML = undatedAnime.map(anime => `', 1)
old_undated_tail = '''\n\n  undatedSection.classList.toggle("hidden", activeYear !== 2027);\n}\n\nfunction updateTitleScrolls() {\n  requestAnimationFrame(() => {\n    document.querySelectorAll(".title-scroll, .undated-title-scroll").forEach(wrapper => {\n      const inner = wrapper.firstElementChild;\n      if (!inner || wrapper.clientWidth <= 0) return;\n\n      wrapper.classList.remove("is-overflowing", "has-scrolled");\n      wrapper.style.removeProperty("--scroll-distance");\n      wrapper.style.removeProperty("--scroll-duration");\n      inner.style.removeProperty("transform");\n\n      // Measure the natural wrapped title height before deciding to marquee.\n      inner.classList.add("measure-title");\n      const style = getComputedStyle(inner);\n      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;\n      const naturalHeight = inner.scrollHeight;\n      inner.classList.remove("measure-title");\n\n      const exceedsTwoLines = naturalHeight > (lineHeight * 2 + 2);\n      if (!exceedsTwoLines) return;\n\n      wrapper.classList.add("is-overflowing");\n\n      // Now that it is single-line, measure the horizontal travel distance.\n      const overflow = Math.max(0, Math.ceil(inner.scrollWidth - wrapper.clientWidth));\n      wrapper.style.setProperty("--scroll-distance", `${overflow + 8}px`);\n\n      const duration = Math.max(8, Math.min(22, 6 + overflow / 28));\n      wrapper.style.setProperty("--scroll-duration", `${duration}s`);\n\n      const markScrolled = () => wrapper.classList.add("has-scrolled");\n      inner.addEventListener("animationiteration", markScrolled, { once: true });\n    });\n  });\n}\n\nlet titleResizeTimer;\n'''
new_undated_tail = '''\n}\n\nfunction measureTitleWrapper(wrapper) {\n  const inner = wrapper.firstElementChild;\n  if (!inner || wrapper.clientWidth <= 0) return;\n\n  wrapper.classList.remove("is-overflowing", "has-scrolled");\n  wrapper.style.removeProperty("--scroll-distance");\n  wrapper.style.removeProperty("--scroll-duration");\n  inner.style.removeProperty("transform");\n\n  // Measure the natural wrapped title height only when its month is close to\n  // the viewport. This avoids forcing layout for an entire year up front.\n  inner.classList.add("measure-title");\n  const style = getComputedStyle(inner);\n  const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;\n  const naturalHeight = inner.scrollHeight;\n  inner.classList.remove("measure-title");\n\n  const exceedsTwoLines = naturalHeight > (lineHeight * 2 + 2);\n  if (!exceedsTwoLines) return;\n\n  wrapper.classList.add("is-overflowing");\n  const overflow = Math.max(0, Math.ceil(inner.scrollWidth - wrapper.clientWidth));\n  wrapper.style.setProperty("--scroll-distance", `${overflow + 8}px`);\n  const duration = Math.max(8, Math.min(22, 6 + overflow / 28));\n  wrapper.style.setProperty("--scroll-duration", `${duration}s`);\n\n  const markScrolled = () => wrapper.classList.add("has-scrolled");\n  inner.addEventListener("animationiteration", markScrolled, { once: true });\n}\n\nfunction measureTitleSection(section) {\n  requestAnimationFrame(() => {\n    section.querySelectorAll(".title-scroll, .undated-title-scroll").forEach(measureTitleWrapper);\n  });\n}\n\nlet titleSectionObserver = null;\nfunction updateTitleScrolls() {\n  const sections = [...document.querySelectorAll("#schedule .month")];\n  const undated = document.querySelector(".undated:not(.hidden)");\n  if (undated) sections.push(undated);\n\n  if (!("IntersectionObserver" in window)) {\n    sections.forEach(measureTitleSection);\n    return;\n  }\n\n  if (!titleSectionObserver) {\n    titleSectionObserver = new IntersectionObserver(entries => {\n      entries.forEach(entry => {\n        if (entry.isIntersecting) measureTitleSection(entry.target);\n      });\n    }, { rootMargin: "500px 0px" });\n  } else {\n    titleSectionObserver.disconnect();\n  }\n\n  sections.forEach(section => titleSectionObserver.observe(section));\n}\n\nlet titleResizeTimer;\n'''
if old_undated_tail not in app:
    raise SystemExit('app.js: title measurement block not found')
app = app.replace(old_undated_tail, new_undated_tail, 1)

old_toggle = '''  content.classList.toggle("hidden");\n  arrow.textContent = content.classList.contains("hidden") ? "＋" : "−";\n});\n'''
new_toggle = '''  content.classList.toggle("hidden");\n  arrow.textContent = content.classList.contains("hidden") ? "＋" : "−";\n  if (!content.classList.contains("hidden")) updateTitleScrolls();\n});\n'''
if old_toggle not in app:
    raise SystemExit('app.js: undated toggle block not found')
app = app.replace(old_toggle, new_toggle, 1)
app_path.write_text(app, encoding='utf-8')

# 4) Allow Chromium/WebKit to skip paint/layout work for off-screen month
# sections. `auto` remembers real dimensions after first layout, minimizing
# scroll-position shifts when a month becomes visible.
styles_path = ROOT / 'styles.css'
styles = styles_path.read_text(encoding='utf-8')
marker = '/* Homepage rendering performance v1 */'
if marker not in styles:
    styles += '''\n\n/* Homepage rendering performance v1 */\n@supports (content-visibility: auto) {\n  #schedule .month {\n    content-visibility: auto;\n    contain-intrinsic-size: auto 900px;\n  }\n}\n'''
styles_path.write_text(styles, encoding='utf-8')

print('Applied homepage performance v1')
