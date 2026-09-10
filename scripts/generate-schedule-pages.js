const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://newani.me';
const DEFAULT_LASTMOD = '2026-09-06';

const runtime = {
  window: {},
  document: {
    readyState: 'loading',
    addEventListener() {},
    getElementById() { return null; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    head: { appendChild() {} },
    createElement() { return { style: {}, setAttribute() {}, appendChild() {} }; },
    documentElement: { lang: 'ko' }
  },
  URL,
  Intl,
  Date,
  console
};
runtime.window.window = runtime.window;
runtime.globalThis = runtime;
vm.createContext(runtime);

const sourceFiles = [
  'data/anime.js',
  'data/anime-20260904.js',
  'data/title-fixes-20260905.js',
  'data/poster-fixes-20260905.js',
  'data/official-sites-20260905.js',
  'data/schedule-updates-20260907.js',
  'data/pvs.js',
  'data/pvs-audit-20260905.js',
  'data/platforms.js',
  'data/streaming-policy-20260905.js'
];

for (const relative of sourceFiles) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) continue;
  vm.runInContext(fs.readFileSync(filename, 'utf8'), runtime, { filename: relative });
}

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];
const scheduleMonths = Array.isArray(runtime.window.animeScheduleMonths) ? runtime.window.animeScheduleMonths : [];

const tagLabels = {
  major: { ko: '주요 기대작', ja: '注目作', en: 'Highlight' },
  new: { ko: '신작', ja: '新作', en: 'New' },
  series: { ko: '시리즈', ja: 'シリーズ', en: 'Series' },
  comic: { ko: '코믹스 원작', ja: '漫画原作', en: 'Manga' },
  ln: { ko: '라이트 노벨 원작', ja: 'ライトノベル原作', en: 'Light Novel' },
  webtoon: { ko: '웹툰 원작', ja: 'ウェブトゥーン原作', en: 'Webtoon' },
  webnovel: { ko: '웹소설 원작', ja: 'Web小説原作', en: 'Web Novel' },
  game: { ko: '게임 원작', ja: 'ゲーム原作', en: 'Game' },
  original: { ko: '오리지널', ja: 'オリジナル', en: 'Original' },
  movie: { ko: '극장판', ja: '劇場版', en: 'Movie' }
};

const commonCopy = {
  ko: { back: '전체 일정', titles: '작품', monthTba: '월 미정', browse: '일정 둘러보기' },
  ja: { back: '全体スケジュール', titles: '作品', monthTba: '月未定', browse: 'スケジュールを見る' },
  en: { back: 'Full schedule', titles: 'titles', monthTba: 'Month TBA', browse: 'Browse schedule' }
};

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function primaryRelease(anime) {
  return anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
}

function monthPath(year, month) {
  return `/${year}/${String(month).padStart(2, '0')}/`;
}

function pagePath(year, type, month = null) {
  if (type === 'year') return `/${year}/`;
  if (type === 'tba') return `/${year}/tba/`;
  return monthPath(year, month);
}

function releaseText(release, lang) {
  if (!release) return 'TBA';
  const display = release.display?.[lang] || release.display?.ko;
  if (display) return display;
  if (release.status === 'date') {
    if (lang === 'ko') return `${release.year}년 ${release.month}월 ${release.day}일`;
    if (lang === 'ja') return `${release.year}年${release.month}月${release.day}日`;
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
      .format(new Date(Date.UTC(release.year, release.month - 1, release.day)));
  }
  if (release.status === 'month') {
    if (lang === 'ko') return `${release.year}년 ${release.month}월`;
    if (lang === 'ja') return `${release.year}年${release.month}月`;
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' })
      .format(new Date(Date.UTC(release.year, release.month - 1, 1)));
  }
  if (release.status === 'year') {
    if (lang === 'ko') return `${release.year}년 · 월 미정`;
    if (lang === 'ja') return `${release.year}年・月未定`;
    return `${release.year} · Month TBA`;
  }
  return lang === 'ko' ? '일정 미정' : lang === 'ja' ? '日程未定' : 'TBA';
}

function monthName(year, month, lang) {
  if (lang === 'ko') return `${year}년 ${month}월`;
  if (lang === 'ja') return `${year}年${month}月`;
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, 1)));
}

function pageCopy(year, type, month, lang) {
  if (type === 'month') {
    const label = monthName(year, month, lang);
    if (lang === 'ko') return {
      title: `${label} 방영 예정 애니메이션`,
      description: `${label} 방영·공개 예정 애니메이션과 극장판의 일정, 작품 정보, PV 및 공식 링크를 확인하세요.`,
      kicker: '월별 방영 일정'
    };
    if (lang === 'ja') return {
      title: `${label} 放送予定アニメ`,
      description: `${label}に放送・公開予定のアニメと劇場版のスケジュール、作品情報、PV、公式リンクを確認できます。`,
      kicker: '月別放送スケジュール'
    };
    return {
      title: `Upcoming Anime in ${label}`,
      description: `Browse anime and films scheduled for ${label}, including release dates, title information, PVs, and official links.`,
      kicker: 'Monthly anime schedule'
    };
  }

  if (type === 'tba') {
    if (lang === 'ko') return {
      title: `${year}년 방영 예정 · 월 미정 애니메이션`,
      description: `${year}년 방영 또는 공개가 확정됐지만 정확한 월이 아직 발표되지 않은 애니메이션과 극장판을 확인하세요.`,
      kicker: '월 미정 작품'
    };
    if (lang === 'ja') return {
      title: `${year}年放送予定・月未定アニメ`,
      description: `${year}年の放送・公開は決定しているものの、正確な月が未発表のアニメと劇場版を確認できます。`,
      kicker: '月未定作品'
    };
    return {
      title: `${year} Upcoming Anime · Month TBA`,
      description: `Browse anime and films confirmed for ${year} whose exact release month has not yet been announced.`,
      kicker: 'Month TBA titles'
    };
  }

  if (lang === 'ko') return {
    title: `${year}년 방영 예정 애니메이션`,
    description: `${year}년 방영·공개 예정 애니메이션과 극장판을 월별로 확인하세요. 방영일, PV, 공식 사이트 및 검증된 출처를 정리합니다.`,
    kicker: '연간 방영 일정'
  };
  if (lang === 'ja') return {
    title: `${year}年放送予定アニメ`,
    description: `${year}年放送・公開予定のアニメと劇場版を月別に確認できます。放送日、PV、公式サイト、確認済み情報源を掲載します。`,
    kicker: '年間放送スケジュール'
  };
  return {
    title: `${year} Upcoming Anime`,
    description: `Browse anime and films scheduled for ${year} by month, with release dates, PVs, official sites, and verified sources.`,
    kicker: 'Annual anime schedule'
  };
}

function sortAnime(items) {
  return [...items].sort((a, b) => {
    const ar = primaryRelease(a) || {};
    const br = primaryRelease(b) || {};
    const aKey = [ar.month || 99, ar.day || 99, a.title?.ko || a.id];
    const bKey = [br.month || 99, br.day || 99, b.title?.ko || b.id];
    if (aKey[0] !== bKey[0]) return aKey[0] - bKey[0];
    if (aKey[1] !== bKey[1]) return aKey[1] - bKey[1];
    return String(aKey[2]).localeCompare(String(bKey[2]), 'ko');
  });
}

function yearItems(year) {
  return animeData.filter(anime => primaryRelease(anime)?.year === year);
}

function monthItems(year, month) {
  return sortAnime(animeData.filter(anime => {
    const release = primaryRelease(anime);
    return release?.year === year && release?.month === month && (release.status === 'date' || release.status === 'month');
  }));
}

function tbaItems(year) {
  return sortAnime(animeData.filter(anime => {
    const release = primaryRelease(anime);
    return release?.year === year && (release.status === 'year' || release.status === 'tba');
  }));
}

function latestDate(items) {
  return items
    .flatMap(anime => [anime.updatedAt, anime.verification?.verifiedAt, anime.createdAt])
    .filter(value => /^\d{4}-\d{2}-\d{2}$/.test(value || ''))
    .sort()
    .at(-1) || DEFAULT_LASTMOD;
}

function itemPayload(anime) {
  const release = primaryRelease(anime);
  return {
    id: anime.id,
    titles: anime.title || {},
    release: {
      ko: releaseText(release, 'ko'),
      ja: releaseText(release, 'ja'),
      en: releaseText(release, 'en')
    },
    tags: (anime.tags || []).map(tag => ({
      key: tag,
      ko: tagLabels[tag]?.ko || tag,
      ja: tagLabels[tag]?.ja || tag,
      en: tagLabels[tag]?.en || tag
    }))
  };
}

function cardMarkup(anime, index) {
  const title = anime.title?.ko || anime.title?.ja || anime.title?.en || anime.id;
  const alt = anime.title?.ja && anime.title.ja !== title ? anime.title.ja : anime.title?.en || '';
  const release = primaryRelease(anime);
  const poster = anime.poster?.src;
  const tagHtml = (anime.tags || []).slice(0, 4)
    .map((tag, tagIndex) => `<span class="archive-badge" data-card-tag="${index}:${tagIndex}">${esc(tagLabels[tag]?.ko || tag)}</span>`)
    .join('');
  return `<article class="archive-card" data-card-index="${index}">
    <a class="archive-poster" href="/anime/${encodeURIComponent(anime.id)}/" aria-label="${esc(title)}">
      ${poster ? `<img src="/${esc(poster.replace(/^\//, ''))}" alt="${esc(title)}" style="object-position:${esc(anime.poster?.position || 'center center')}" loading="lazy" decoding="async">` : '<span class="archive-poster-fallback">?</span>'}
    </a>
    <div class="archive-card-body">
      <div class="archive-card-date" data-card-release="${index}">${esc(releaseText(release, 'ko'))}</div>
      <h3><a class="archive-card-title" data-card-title="${index}" href="/anime/${encodeURIComponent(anime.id)}/">${esc(title)}</a></h3>
      <p class="archive-alt-title" data-card-alt="${index}">${esc(alt)}</p>
      <div class="archive-badges">${tagHtml}</div>
    </div>
  </article>`;
}

function navMarkup(year, type, month, availableMonths, hasTba) {
  const links = [2026, 2027].map(navYear => `<a href="/${navYear}/"${type === 'year' && navYear === year ? ' aria-current="page"' : ''}>${navYear}</a>`);
  for (const monthNumber of availableMonths) {
    links.push(`<a href="${monthPath(year, monthNumber)}" data-nav-month="${monthNumber}"${type === 'month' && monthNumber === month ? ' aria-current="page"' : ''}>${monthNumber}월</a>`);
  }
  if (hasTba) links.push(`<a href="/${year}/tba/" data-nav-tba${type === 'tba' ? ' aria-current="page"' : ''}>월 미정</a>`);
  return links.join('');
}

function sectionMarkup(section, cardOffset) {
  const cards = section.items.map((anime, i) => cardMarkup(anime, cardOffset + i)).join('');
  return `<section class="archive-section">
    <div class="archive-section-head">
      <h2>${section.href ? `<a href="${section.href}" data-section-title="${section.key}">${esc(section.labelKo)}</a>` : `<span data-section-title="${section.key}">${esc(section.labelKo)}</span>`}</h2>
      <span class="archive-count" data-section-count="${section.key}">${section.items.length}작품</span>
    </div>
    ${cards ? `<div class="archive-grid">${cards}</div>` : '<div class="archive-empty">등록된 작품이 없습니다.</div>'}
  </section>`;
}

function makePage({ year, type, month = null }) {
  const allYearItems = yearItems(year);
  const availableMonths = [...new Set(allYearItems.map(anime => primaryRelease(anime)?.month).filter(Boolean))].sort((a, b) => a - b);
  const undated = tbaItems(year);
  const items = type === 'month' ? monthItems(year, month) : type === 'tba' ? undated : sortAnime(allYearItems);
  const canonicalPath = pagePath(year, type, month);
  const canonical = `${SITE}${canonicalPath}`;
  const localized = {
    ko: pageCopy(year, type, month, 'ko'),
    ja: pageCopy(year, type, month, 'ja'),
    en: pageCopy(year, type, month, 'en')
  };
  const sections = [];
  if (type === 'year') {
    for (const monthNumber of availableMonths) {
      const monthList = monthItems(year, monthNumber);
      if (!monthList.length) continue;
      sections.push({
        key: `m${monthNumber}`,
        labelKo: `${monthNumber}월`,
        labels: { ko: `${monthNumber}월`, ja: `${monthNumber}月`, en: new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, monthNumber - 1, 1))) },
        href: monthPath(year, monthNumber),
        items: monthList
      });
    }
    if (undated.length) sections.push({
      key: 'tba',
      labelKo: '월 미정',
      labels: { ko: '월 미정', ja: '月未定', en: 'Month TBA' },
      href: `/${year}/tba/`,
      items: undated
    });
  } else {
    sections.push({
      key: type === 'tba' ? 'tba' : `m${month}`,
      labelKo: type === 'tba' ? '월 미정' : `${month}월`,
      labels: type === 'tba'
        ? { ko: '월 미정', ja: '月未定', en: 'Month TBA' }
        : { ko: `${month}월`, ja: `${month}月`, en: new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1))) },
      href: null,
      items
    });
  }

  const flattened = sections.flatMap(section => section.items);
  const pageItems = flattened.map(itemPayload);
  const sectionData = sections.map(section => ({ key: section.key, labels: section.labels, count: section.items.length }));
  let offset = 0;
  const sectionHtml = sections.map(section => {
    const html = sectionMarkup(section, offset);
    offset += section.items.length;
    return html;
  }).join('');
  const summaryCount = type === 'year' ? allYearItems.length : items.length;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: localized.ko.title,
    url: canonical,
    numberOfItems: summaryCount,
    itemListElement: items.map((anime, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: anime.title?.ko || anime.id,
      url: `${SITE}/anime/${encodeURIComponent(anime.id)}/`
    }))
  };
  const archiveData = {
    year,
    type,
    month,
    canonical,
    localized,
    commonCopy,
    items: pageItems,
    sections: sectionData,
    availableMonths,
    hasTba: undated.length > 0
  };

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <title>${esc(localized.ko.title)} | NewAnime</title>
  <meta name="description" content="${esc(localized.ko.description)}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="ko" href="${canonical}?lang=ko" />
  <link rel="alternate" hreflang="ja" href="${canonical}?lang=ja" />
  <link rel="alternate" hreflang="en" href="${canonical}?lang=en" />
  <link rel="alternate" hreflang="x-default" href="${canonical}?lang=ko" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="NewAnime" />
  <meta property="og:title" content="${esc(localized.ko.title)} | NewAnime" />
  <meta property="og:description" content="${esc(localized.ko.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(localized.ko.title)} | NewAnime" />
  <meta name="twitter:description" content="${esc(localized.ko.description)}" />
  <meta name="twitter:image" content="${SITE}/og-image.png" />
  <script type="application/ld+json">${safeJson(jsonLd)}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q89MWGLDE7"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-Q89MWGLDE7');</script>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css" />
  <link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-jp.css" />
  <link rel="stylesheet" href="/schedule-archive.css?v=20260906-seo2" />
</head>
<body>
  <main class="archive-shell">
    <header class="archive-header">
      <a class="archive-brand" href="/" aria-label="NewAnime"><img src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124"></a>
      <div class="archive-header-spacer"></div>
      <div class="archive-language" aria-label="Language">
        <button type="button" class="active" data-lang="ko">KR</button>
        <button type="button" data-lang="ja">JP</button>
        <button type="button" data-lang="en">EN</button>
      </div>
    </header>
    <a class="archive-back" href="/">← <span data-back>전체 일정</span></a>
    <section class="archive-hero">
      <div class="archive-kicker" data-kicker>${esc(localized.ko.kicker)}</div>
      <h1 data-page-title>${esc(localized.ko.title)}</h1>
      <p class="archive-description" data-description>${esc(localized.ko.description)}</p>
      <div class="archive-summary"><span>${year}</span><span data-summary-count>${summaryCount}작품</span></div>
    </section>
    <nav class="archive-nav" aria-label="Schedule archive">${navMarkup(year, type, month, availableMonths, undated.length > 0)}</nav>
    <div class="archive-content">${sectionHtml || '<div class="archive-empty">등록된 작품이 없습니다.</div>'}</div>
    <footer class="archive-footer">
      <a href="/">HOME</a><a href="/${year}/">ARCHIVE</a><a href="/updates/">UPDATES</a><a href="/about/">ABOUT</a><a href="/privacy/">PRIVACY</a><a href="/policy/">POLICY</a>
    </footer>
  </main>
  <script>window.ARCHIVE_PAGE_DATA=${safeJson(archiveData)};</script>
  <script>
  (() => {
    const data = window.ARCHIVE_PAGE_DATA;
    const supported = ['ko','ja','en'];
    const params = new URLSearchParams(location.search);
    const requested = params.get('lang');
    const saved = (() => { try { return localStorage.getItem('animeScheduleLang'); } catch (_) { return null; } })();
    const browser = (navigator.language || '').toLowerCase();
    let lang = supported.includes(requested) ? requested : supported.includes(saved) ? saved : browser.startsWith('ja') ? 'ja' : browser.startsWith('ko') ? 'ko' : 'en';

    function altTitle(item, lang) {
      if (lang === 'ko') return item.titles.ja || item.titles.en || '';
      if (lang === 'ja') return item.titles.ko || item.titles.en || '';
      return item.titles.ko || item.titles.ja || '';
    }

    function apply(next) {
      lang = supported.includes(next) ? next : 'ko';
      const page = data.localized[lang] || data.localized.ko;
      const common = data.commonCopy[lang] || data.commonCopy.ko;
      document.documentElement.lang = lang;
      document.title = page.title + ' | NewAnime';
      document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title + ' | NewAnime');
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', page.title + ' | NewAnime');
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', page.description);
      document.querySelector('[data-page-title]').textContent = page.title;
      document.querySelector('[data-description]').textContent = page.description;
      document.querySelector('[data-kicker]').textContent = page.kicker;
      document.querySelector('[data-back]').textContent = common.back;
      const summary = document.querySelector('[data-summary-count]');
      if (summary) summary.textContent = data.items.length + (lang === 'ja' ? '作品' : lang === 'en' ? ' titles' : '작품');
      document.querySelectorAll('[data-lang]').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

      data.availableMonths.forEach(monthNumber => {
        const el = document.querySelector('[data-nav-month="' + monthNumber + '"]');
        if (!el) return;
        if (lang === 'ko') el.textContent = monthNumber + '월';
        else if (lang === 'ja') el.textContent = monthNumber + '月';
        else el.textContent = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(Date.UTC(data.year, monthNumber - 1, 1)));
        const url = new URL(el.href); url.searchParams.set('lang', lang); el.href = url.pathname + url.search;
      });
      const tbaNav = document.querySelector('[data-nav-tba]');
      if (tbaNav) {
        tbaNav.textContent = common.monthTba;
        const url = new URL(tbaNav.href); url.searchParams.set('lang', lang); tbaNav.href = url.pathname + url.search;
      }
      document.querySelectorAll('.archive-nav a:not([data-nav-month]):not([data-nav-tba])').forEach(el => {
        const url = new URL(el.href); url.searchParams.set('lang', lang); el.href = url.pathname + url.search;
      });

      data.sections.forEach(section => {
        const title = document.querySelector('[data-section-title="' + section.key + '"]');
        if (title) title.textContent = section.labels[lang] || section.labels.ko;
        const count = document.querySelector('[data-section-count="' + section.key + '"]');
        if (count) count.textContent = section.count + (lang === 'ja' ? '作品' : lang === 'en' ? ' titles' : '작품');
      });

      data.items.forEach((item, index) => {
        const title = document.querySelector('[data-card-title="' + index + '"]');
        if (title) {
          title.textContent = item.titles[lang] || item.titles.ko || item.id;
          const url = new URL(title.href); url.searchParams.set('lang', lang); title.href = url.pathname + url.search;
        }
        const poster = document.querySelector('[data-card-index="' + index + '"] .archive-poster');
        if (poster) { const url = new URL(poster.href); url.searchParams.set('lang', lang); poster.href = url.pathname + url.search; }
        const release = document.querySelector('[data-card-release="' + index + '"]');
        if (release) release.textContent = item.release[lang] || item.release.ko;
        const alt = document.querySelector('[data-card-alt="' + index + '"]');
        if (alt) alt.textContent = altTitle(item, lang);
        item.tags.slice(0,4).forEach((tag, tagIndex) => {
          const badge = document.querySelector('[data-card-tag="' + index + ':' + tagIndex + '"]');
          if (badge) badge.textContent = tag[lang] || tag.ko;
        });
      });

      try { localStorage.setItem('animeScheduleLang', lang); } catch (_) {}
      const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState(null, '', url);
    }

    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.lang)));
    apply(lang);
  })();
  </script>
</body>
</html>`;
}

const years = [...new Set([
  ...scheduleMonths.map(item => item.year),
  ...animeData.map(anime => primaryRelease(anime)?.year)
].filter(year => Number.isInteger(year)))].sort((a, b) => a - b);

const generatedUrls = [];
for (const year of years) {
  const yearDir = path.join(ROOT, String(year));
  fs.rmSync(yearDir, { recursive: true, force: true });
  fs.mkdirSync(yearDir, { recursive: true });

  const yearly = yearItems(year);
  if (!yearly.length) continue;
  fs.writeFileSync(path.join(yearDir, 'index.html'), makePage({ year, type: 'year' }));
  generatedUrls.push({ path: `/${year}/`, items: yearly });

  const availableMonths = [...new Set(yearly.map(anime => primaryRelease(anime)?.month).filter(Boolean))].sort((a, b) => a - b);
  for (const month of availableMonths) {
    const items = monthItems(year, month);
    if (!items.length) continue;
    const targetDir = path.join(yearDir, String(month).padStart(2, '0'));
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), makePage({ year, type: 'month', month }));
    generatedUrls.push({ path: monthPath(year, month), items });
  }

  const undated = tbaItems(year);
  if (undated.length) {
    const targetDir = path.join(yearDir, 'tba');
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), makePage({ year, type: 'tba' }));
    generatedUrls.push({ path: `/${year}/tba/`, items: undated });
  }
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/newani\.me\/(?:2026|2027)\/(?:[^<]*)?<\/loc>[\s\S]*?<\/url>/g, '');
  const entries = generatedUrls.map(entry => `  <url>\n    <loc>${SITE}${entry.path}</loc>\n    <lastmod>${latestDate(entry.items)}</lastmod>\n  </url>`).join('\n');
  sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`);
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Generated ${generatedUrls.length} year/month schedule archive pages.`);
