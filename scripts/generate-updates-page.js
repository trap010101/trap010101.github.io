const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://newani.me';
const UPDATES_PATH = path.join(ROOT, 'updates', 'index.html');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');

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

const animeSourceFiles = [
  'data/anime.js',
  'data/anime-20260904.js',
  'data/title-fixes-20260905.js',
  'data/poster-fixes-20260905.js',
  'data/official-sites-20260905.js',
  'data/pvs.js',
  'data/pvs-audit-20260905.js',
  'data/platforms.js',
  'data/streaming-policy-20260905.js'
];

function runSource(relative) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) return;
  vm.runInContext(fs.readFileSync(filename, 'utf8'), runtime, { filename: relative });
}

animeSourceFiles.forEach(runSource);
const realAnimeIds = new Set(
  (Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [])
    .map(anime => anime?.id)
    .filter(Boolean)
);

const updateDataFiles = fs.readdirSync(path.join(ROOT, 'data'))
  .filter(name => /^updates(?:-.*)?\.js$/.test(name) && name !== 'updates.js')
  .sort()
  .map(name => `data/${name}`);

['data/updates.js', ...updateDataFiles].forEach(runSource);

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];
const animeUpdates = Array.isArray(runtime.window.animeUpdates) ? runtime.window.animeUpdates : [];
const animeById = new Map(animeData.map(anime => [anime?.id, anime]).filter(([id]) => Boolean(id)));

const typeLabels = {
  'anime-added': '신규 등록',
  'release-window': '방영 시기',
  'release-date': '방영일',
  'release-delay': '연기',
  'release-cancelled': '취소',
  poster: '포스터',
  pv: 'PV',
  'official-link': '공식 링크',
  'streaming-added': '스트리밍',
  'streaming-removed': '스트리밍',
  'streaming-updated': '스트리밍',
  title: '제목',
  format: '작품 유형',
  source: '출처',
  other: '기타'
};

const sourceLabels = {
  'official-site': '공식 사이트',
  'official-x': '공식 X 발표',
  'official-youtube': '공식 YouTube',
  'streaming-platform': '스트리밍 서비스',
  publisher: '출판사',
  studio: '제작사',
  news: '공식 뉴스',
  distributor: '배급사',
  other: '기타 출처'
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

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '');
}

function formatDateKo(value) {
  if (!validDate(value)) return value || '';
  const [year, month, day] = value.split('-').map(Number);
  return `${year}년 ${month}월 ${day}일`;
}

const sortedUpdates = animeUpdates
  .map((update, index) => ({ update, index }))
  .filter(({ update }) => update?.id && update?.animeId && animeById.has(update.animeId))
  .sort((a, b) => String(b.update.changedAt || '').localeCompare(String(a.update.changedAt || '')) || a.index - b.index)
  .map(({ update }) => update);

const latestDate = sortedUpdates
  .map(update => update.changedAt)
  .filter(validDate)
  .sort()
  .at(-1) || '2026-09-06';

function titleFor(update) {
  const anime = animeById.get(update.animeId);
  return anime?.title?.ko || anime?.title?.ja || anime?.title?.en || update.animeId;
}

function summaryFor(update) {
  return update?.summary?.ko || update?.summary?.ja || update?.summary?.en || '';
}

function titleMarkup(update) {
  const title = titleFor(update);
  if (!realAnimeIds.has(update.animeId)) return `<h3>${esc(title)}</h3>`;
  return `<h3><a class="update-anime-link" href="/anime/${encodeURIComponent(update.animeId)}/">${esc(title)}</a></h3>`;
}

function sourceMarkup(update) {
  if (!update?.source?.url) return '';
  const label = sourceLabels[update.source.type] || sourceLabels.other;
  return `<a class="update-source-link" href="${esc(update.source.url)}" target="_blank" rel="noopener noreferrer" aria-label="출처 보기: ${esc(label)}">${esc(label)} <span aria-hidden="true">↗</span></a>`;
}

function updateMarkup(update) {
  const type = String(update.type || 'other').replace(/[^a-z0-9-]/gi, '');
  return `      <article class="update-item update-${esc(type)}" id="${esc(update.id)}" data-update-id="${esc(update.id)}">
        <div class="update-poster"><span aria-hidden="true">?</span></div>
        <div class="update-content">
          <div class="update-title-row">
            ${titleMarkup(update)}
            <time datetime="${esc(update.changedAt)}">${esc(formatDateKo(update.changedAt))}</time>
          </div>
          <p>${esc(summaryFor(update))}</p>
          <div class="update-meta">
            <span class="update-type">${esc(typeLabels[update.type] || typeLabels.other)}</span>
            ${sourceMarkup(update)}
          </div>
        </div>
      </article>`;
}

const staticMarkup = sortedUpdates.map(updateMarkup).join('\n');
const description = '2026~2027년 방영 예정 애니메이션의 신규 등록, 방영일, PV, 공식 정보, 스트리밍 변경 내역을 공식 출처와 함께 확인하세요.';
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '애니메이션 최근 업데이트 - NewAnime',
  url: `${SITE}/updates/?lang=ko`,
  description,
  dateModified: latestDate,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: sortedUpdates.length,
    itemListElement: sortedUpdates.map((update, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: titleFor(update),
        description: summaryFor(update),
        url: realAnimeIds.has(update.animeId)
          ? `${SITE}/anime/${encodeURIComponent(update.animeId)}/#${encodeURIComponent(update.id)}`
          : `${SITE}/updates/?lang=ko#${encodeURIComponent(update.id)}`
      }
    }))
  }
};

if (!fs.existsSync(UPDATES_PATH)) throw new Error('updates/index.html not found');
let html = fs.readFileSync(UPDATES_PATH, 'utf8');

html = html.replace(
  /<title>[\s\S]*?<\/title>/,
  '<title>애니메이션 최근 업데이트 | 방영일·PV·스트리밍 - NewAnime</title>'
);
html = html.replace(
  /<meta name="description" id="metaDescription" content="[^"]*" \/>/,
  `<meta name="description" id="metaDescription" content="${esc(description)}" />`
);
html = html.replace(
  /<meta property="og:title" id="ogTitle" content="[^"]*" \/>/,
  '<meta property="og:title" id="ogTitle" content="애니메이션 최근 업데이트 | 방영일·PV·스트리밍 - NewAnime" />'
);
html = html.replace(
  /<meta property="og:description" id="ogDescription" content="[^"]*" \/>/,
  `<meta property="og:description" id="ogDescription" content="${esc(description)}" />`
);
html = html.replace(
  /<meta name="twitter:title" id="twitterTitle" content="[^"]*" \/>/,
  '<meta name="twitter:title" id="twitterTitle" content="애니메이션 최근 업데이트 | 방영일·PV·스트리밍 - NewAnime" />'
);
html = html.replace(
  /<meta name="twitter:description" id="twitterDescription" content="[^"]*" \/>/,
  `<meta name="twitter:description" id="twitterDescription" content="${esc(description)}" />`
);
html = html.replace(
  /<script type="application\/ld\+json" id="updatesStructuredData">[\s\S]*?<\/script>/,
  `<script type="application/ld+json" id="updatesStructuredData">\n  ${safeJson(structuredData)}\n  </script>`
);
html = html.replace(
  /<p id="updatesDescription">[\s\S]*?<\/p>/,
  '<p id="updatesDescription">방영 예정 애니메이션의 신규 등록과 방영일, PV, 스트리밍 등 주요 변경 내역을 공식 출처와 함께 기록합니다.</p>'
);
html = html.replace(
  /<div class="updates-list" id="updatesList">[\s\S]*?<\/div>\s*<p class="updates-empty hidden" id="updatesEmpty">/,
  `<div class="updates-list" id="updatesList">\n${staticMarkup}\n      </div>\n      <p class="updates-empty hidden" id="updatesEmpty">`
);

fs.writeFileSync(UPDATES_PATH, html);

if (fs.existsSync(SITEMAP_PATH)) {
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  sitemap = sitemap.replace(
    /<url>\s*<loc>https:\/\/newani\.me\/updates\/\?lang=(ko|ja|en)<\/loc>[\s\S]*?<\/url>/g,
    block => {
      if (/<lastmod>[^<]+<\/lastmod>/.test(block)) {
        return block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${latestDate}</lastmod>`);
      }
      return block.replace(/(<loc>[^<]+<\/loc>)/, `$1\n    <lastmod>${latestDate}</lastmod>`);
    }
  );
  fs.writeFileSync(SITEMAP_PATH, sitemap);
}

console.log(`Generated static markup for ${sortedUpdates.length} update entries. Latest: ${latestDate}`);
