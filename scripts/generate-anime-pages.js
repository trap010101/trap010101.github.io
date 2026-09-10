const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://newani.me';
const OUT_DIR = path.join(ROOT, 'anime');

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
  'data/pvs.js',
  'data/pvs-audit-20260905.js',
  'data/platforms.js',
  'data/streaming-policy-20260905.js',
  'data/schedule-updates-20260907.js',
  'data/schedule-updates-20260907.js'
];

for (const relative of sourceFiles) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) continue;
  const source = fs.readFileSync(filename, 'utf8');
  vm.runInContext(source, runtime, { filename: relative });
}

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];
const platforms = Array.isArray(runtime.window.ottPlatforms) ? runtime.window.ottPlatforms : [];
const platformNames = Object.fromEntries(platforms.map(item => [item.id, item.name]));

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

const sourceTypeLabels = {
  'official-site': { ko: '공식 사이트', ja: '公式サイト', en: 'Official website' },
  'official-x': { ko: '공식 X 발표', ja: '公式X発表', en: 'Official X announcement' },
  'official-youtube': { ko: '공식 YouTube', ja: '公式YouTube', en: 'Official YouTube' },
  'streaming-platform': { ko: '스트리밍 서비스', ja: '配信サービス', en: 'Streaming service' },
  publisher: { ko: '출판사', ja: '出版社', en: 'Publisher' },
  studio: { ko: '제작사', ja: '制作会社', en: 'Studio' },
  news: { ko: '공식 뉴스', ja: '公式ニュース', en: 'Official news' },
  distributor: { ko: '배급사', ja: '配給会社', en: 'Distributor' },
  other: { ko: '기타 출처', ja: 'その他の情報源', en: 'Other source' }
};

const copy = {
  ko: {
    siteTitle: '방영 예정 애니메이션', back: '전체 일정으로 돌아가기', release: '방영 · 공개 일정', resources: '공식 링크', pv: 'PV', official: '공식 사이트', streaming: '이전 시리즈 정주행', streamingNote: '이전 시리즈를 시청할 수 있는 서비스입니다. 현재 작품의 스트리밍 확정 정보가 아닙니다.', sources: '정보 출처', checked: '마지막 확인', noStreaming: '등록된 이전 시리즈 스트리밍 링크가 없습니다.', noSources: '등록된 공식 출처가 없습니다.', share: '공유', copyDone: '링크를 복사했습니다.'
  },
  ja: {
    siteTitle: '放送予定アニメ', back: '全体スケジュールに戻る', release: '放送・公開予定', resources: '公式リンク', pv: 'PV', official: '公式サイト', streaming: '過去シリーズをまとめて視聴', streamingNote: '過去シリーズを視聴できるサービスです。今作の配信決定情報ではありません。', sources: '情報源', checked: '最終確認', noStreaming: '過去シリーズの配信リンクは登録されていません。', noSources: '公式情報源は登録されていません。', share: '共有', copyDone: 'リンクをコピーしました。'
  },
  en: {
    siteTitle: 'Upcoming Anime', back: 'Back to full schedule', release: 'Release schedule', resources: 'Official links', pv: 'PV', official: 'Official site', streaming: 'Catch up on previous series', streamingNote: 'These services are for earlier installments and do not confirm streaming for the upcoming title.', sources: 'Information sources', checked: 'Last checked', noStreaming: 'No previous-series streaming links are registered.', noSources: 'No official sources are registered.', share: 'Share', copyDone: 'Link copied.'
  }
};

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function primaryRelease(anime) {
  return anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
}

function releaseText(release, lang) {
  if (!release) return 'TBA';
  const display = release.display?.[lang] || release.display?.ko;
  if (display) return display;
  if (release.status === 'date') {
    if (lang === 'ko') return `${release.year}년 ${release.month}월 ${release.day}일`;
    if (lang === 'ja') return `${release.year}年${release.month}月${release.day}日`;
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
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
  return 'TBA';
}

function tagText(tag, lang) {
  return tagLabels[tag]?.[lang] || tag;
}

function sourceTypeText(type, lang) {
  return sourceTypeLabels[type]?.[lang] || sourceTypeLabels.other[lang];
}

function localizedPayload(anime, lang) {
  const title = anime.title?.[lang] || anime.title?.ko || anime.id;
  const release = releaseText(primaryRelease(anime), lang);
  const description = lang === 'ko'
    ? `${title}의 방영·공개 일정, PV, 공식 사이트, 이전 시리즈 스트리밍 및 공식 출처를 확인하세요.`
    : lang === 'ja'
      ? `${title}の放送・公開予定、PV、公式サイト、過去シリーズの配信情報、公式情報源を確認できます。`
      : `Check the release schedule, PV, official site, previous-series streaming, and official sources for ${title}.`;
  return { title, release, description };
}

function resourceLink(url, text) {
  if (!url) return '';
  return `<a class="detail-action" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)}<span aria-hidden="true">↗</span></a>`;
}

function streamingMarkup(anime, lang) {
  const links = anime.previousStreaming || {};
  const rows = Object.entries(links)
    .filter(([, url]) => Boolean(url))
    .map(([platformId, url]) => `<a class="streaming-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span>${esc(platformNames[platformId] || platformId)}</span><span aria-hidden="true">↗</span></a>`)
    .join('');
  return rows || `<p class="empty-state">${esc(copy[lang].noStreaming)}</p>`;
}

function sourcesMarkup(anime, lang) {
  const sources = anime.verification?.sources || [];
  if (!sources.length) return `<p class="empty-state">${esc(copy[lang].noSources)}</p>`;
  return sources.map(source => `<a class="source-link" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer"><span><strong>${esc(sourceTypeText(source.type, lang))}</strong>${source.label ? `<small>${esc(source.label)}</small>` : ''}</span><span aria-hidden="true">↗</span></a>`).join('');
}

function tagsMarkup(anime, lang) {
  return (anime.tags || []).map(tag => `<span class="detail-badge badge-${esc(tag)}">${esc(tagText(tag, lang))}</span>`).join('');
}

function localizedSections(anime) {
  return ['ko', 'ja', 'en'].map(lang => {
    const payload = localizedPayload(anime, lang);
    const langHidden = lang === 'ko' ? '' : ' hidden';
    const official = anime.links?.official;
    const pv = anime.links?.pv;
    const verifiedAt = anime.verification?.verifiedAt || '—';
    return `
      <section class="anime-localized" data-lang-panel="${lang}"${langHidden}>
        <div class="detail-kicker">newani.me · ${esc(copy[lang].siteTitle)}</div>
        <h1>${esc(payload.title)}</h1>
        <div class="alternate-titles">
          ${anime.title?.ja && anime.title.ja !== payload.title ? `<span lang="ja">${esc(anime.title.ja)}</span>` : ''}
          ${anime.title?.en && anime.title.en !== payload.title ? `<span lang="en">${esc(anime.title.en)}</span>` : ''}
        </div>
        <div class="detail-badges">${tagsMarkup(anime, lang)}</div>
        <section class="detail-panel detail-release-panel">
          <span class="panel-label">${esc(copy[lang].release)}</span>
          <strong class="release-value">${esc(payload.release)}</strong>
        </section>
        <section class="detail-panel">
          <div class="panel-heading"><h2>${esc(copy[lang].resources)}</h2></div>
          <div class="detail-actions">
            ${resourceLink(pv, copy[lang].pv)}
            ${resourceLink(official, copy[lang].official)}
          </div>
        </section>
        <section class="detail-panel">
          <div class="panel-heading"><h2>${esc(copy[lang].streaming)}</h2></div>
          <p class="panel-note">${esc(copy[lang].streamingNote)}</p>
          <div class="streaming-list">${streamingMarkup(anime, lang)}</div>
        </section>
        <section class="detail-panel">
          <div class="panel-heading source-heading"><h2>${esc(copy[lang].sources)}</h2><span>${esc(copy[lang].checked)} · ${esc(verifiedAt)}</span></div>
          <div class="source-list-detail">${sourcesMarkup(anime, lang)}</div>
        </section>
      </section>`;
  }).join('');
}

function makePage(anime) {
  const ko = localizedPayload(anime, 'ko');
  const canonical = `${SITE}/anime/${encodeURIComponent(anime.id)}/`;
  const poster = anime.poster?.src ? `${SITE}/${anime.poster.src.replace(/^\//, '')}` : `${SITE}/og-image.png`;
  const release = primaryRelease(anime);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': anime.format === 'movie' ? 'Movie' : 'TVSeries',
    name: ko.title,
    alternateName: [anime.title?.ja, anime.title?.en, ...(anime.aliases || [])].filter(Boolean),
    url: canonical,
    image: poster,
    datePublished: release?.status === 'date'
      ? `${release.year}-${String(release.month).padStart(2, '0')}-${String(release.day).padStart(2, '0')}`
      : undefined,
    sameAs: [anime.links?.official, anime.links?.pv].filter(Boolean)
  };
  Object.keys(jsonLd).forEach(key => jsonLd[key] === undefined && delete jsonLd[key]);
  const detailData = {
    id: anime.id,
    canonical,
    titles: anime.title || {},
    localized: {
      ko: localizedPayload(anime, 'ko'),
      ja: localizedPayload(anime, 'ja'),
      en: localizedPayload(anime, 'en')
    },
    copy
  };

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <title>${esc(ko.title)} | NewAnime</title>
  <meta name="description" content="${esc(ko.description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="NewAnime" />
  <meta property="og:title" content="${esc(ko.title)} | NewAnime" />
  <meta property="og:description" content="${esc(ko.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${esc(poster)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(ko.title)} | NewAnime" />
  <meta name="twitter:description" content="${esc(ko.description)}" />
  <meta name="twitter:image" content="${esc(poster)}" />
  <script type="application/ld+json">${safeJson(jsonLd)}</script>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css" />
  <link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-jp.css" />
  <link rel="stylesheet" href="/anime-detail.css?v=20260906-seo1" />
</head>
<body>
  <main class="detail-shell">
    <header class="detail-header">
      <a class="detail-brand" href="/" aria-label="NewAnime"><img src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124"></a>
      <div class="detail-header-actions">
        <div class="detail-language" aria-label="Language">
          <button type="button" class="active" data-lang="ko">KR</button>
          <button type="button" data-lang="ja">JP</button>
          <button type="button" data-lang="en">EN</button>
        </div>
        <button class="detail-share" type="button" data-share>${esc(copy.ko.share)}</button>
      </div>
    </header>
    <a class="detail-back" href="/">← <span data-back-label>${esc(copy.ko.back)}</span></a>
    <article class="detail-hero-card">
      <div class="detail-poster-wrap">
        ${anime.poster?.src ? `<img class="detail-poster" src="/${esc(anime.poster.src.replace(/^\//, ''))}" alt="${esc(ko.title)}" style="object-position:${esc(anime.poster.position || 'center center')}" decoding="async" fetchpriority="high">` : '<div class="detail-poster detail-poster-fallback">?</div>'}
      </div>
      <div class="detail-main">${localizedSections(anime)}</div>
    </article>
    <footer class="detail-footer"><a href="/about/">ABOUT</a><a href="/updates/">UPDATES</a><a href="/privacy/">PRIVACY</a><a href="/policy/">POLICY</a></footer>
  </main>
  <div class="detail-toast" data-toast hidden></div>
  <script>window.ANIME_DETAIL=${safeJson(detailData)};</script>
  <script>
  (() => {
    const data = window.ANIME_DETAIL;
    const supported = ['ko','ja','en'];
    const params = new URLSearchParams(location.search);
    const requested = params.get('lang');
    const saved = (() => { try { return localStorage.getItem('animeScheduleLang'); } catch (_) { return null; } })();
    const browser = (navigator.language || '').toLowerCase();
    let lang = supported.includes(requested) ? requested : supported.includes(saved) ? saved : browser.startsWith('ja') ? 'ja' : browser.startsWith('ko') ? 'ko' : 'en';
    const apply = next => {
      lang = supported.includes(next) ? next : 'ko';
      document.documentElement.lang = lang;
      document.querySelectorAll('[data-lang-panel]').forEach(el => el.hidden = el.dataset.langPanel !== lang);
      document.querySelectorAll('[data-lang]').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
      const localized = data.localized[lang] || data.localized.ko;
      document.title = localized.title + ' | NewAnime';
      document.querySelector('meta[name="description"]')?.setAttribute('content', localized.description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', localized.title + ' | NewAnime');
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', localized.description);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', localized.title + ' | NewAnime');
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', localized.description);
      document.querySelector('[data-back-label]').textContent = data.copy[lang].back;
      document.querySelector('[data-share]').textContent = data.copy[lang].share;
      try { localStorage.setItem('animeScheduleLang', lang); } catch (_) {}
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    };
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.lang)));
    document.querySelector('[data-share]')?.addEventListener('click', async () => {
      const localized = data.localized[lang] || data.localized.ko;
      const shareData = { title: localized.title + ' | NewAnime', text: localized.description, url: data.canonical + '?lang=' + lang };
      try {
        if (navigator.share) await navigator.share(shareData);
        else await navigator.clipboard.writeText(shareData.url);
        const toast = document.querySelector('[data-toast]');
        if (!navigator.share && toast) {
          toast.textContent = data.copy[lang].copyDone;
          toast.hidden = false;
          setTimeout(() => toast.hidden = true, 1800);
        }
      } catch (_) {}
    });
    apply(lang);
  })();
  </script>
</body>
</html>`;
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const anime of animeData) {
  if (!anime?.id) continue;
  const targetDir = path.join(OUT_DIR, anime.id);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), makePage(anime));
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/newani\.me\/anime\/[^<]+<\/loc>[\s\S]*?<\/url>/g, '');
  const entries = animeData
    .filter(anime => anime?.id)
    .map(anime => `  <url>\n    <loc>${SITE}/anime/${esc(anime.id)}/</loc>\n    <lastmod>${esc(anime.updatedAt || anime.verification?.verifiedAt || '2026-09-06')}</lastmod>\n  </url>`)
    .join('\n');
  sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`);
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log(`Generated ${animeData.length} anime detail pages.`);
