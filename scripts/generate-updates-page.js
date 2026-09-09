const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://newani.me';
const UPDATES_PATH = path.join(ROOT, 'updates', 'index.html');
const CHANGELOG_PATHS = [
  path.join(ROOT, 'data', 'changelog.js'),
  path.join(ROOT, 'data', 'changelog-20260909.js')
];
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');

for (const changelogPath of CHANGELOG_PATHS) {
  if (!fs.existsSync(changelogPath)) throw new Error(`${path.relative(ROOT, changelogPath)} not found`);
}
if (!fs.existsSync(UPDATES_PATH)) throw new Error('updates/index.html not found');

const runtime = { window: {}, console };
runtime.window.window = runtime.window;
runtime.globalThis = runtime;
vm.createContext(runtime);
for (const changelogPath of CHANGELOG_PATHS) {
  vm.runInContext(fs.readFileSync(changelogPath, 'utf8'), runtime, { filename: path.relative(ROOT, changelogPath) });
}

const changelog = Array.isArray(runtime.window.siteChangelog) ? runtime.window.siteChangelog : [];

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

function normalizeText(value) {
  return String(value ?? '').replace(/компакт한/g, '컴팩트한');
}

function local(value, lang = 'ko') {
  if (typeof value === 'string') return normalizeText(value);
  return normalizeText(value?.[lang] || value?.ko || value?.ja || value?.en || '');
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '');
}

function formatDate(value) {
  if (!validDate(value)) return value || '';
  return value.replace(/-/g, '.');
}

function entryMarkup(entry) {
  const title = local(entry.title);
  const titleMarkup = entry.href
    ? `<a class="changelog-entry-title changelog-anime-link" href="${esc(entry.href)}">${esc(title)}</a>`
    : `<strong class="changelog-entry-title">${esc(title)}</strong>`;
  const sourceMarkup = entry.source?.url
    ? `<div class="changelog-entry-meta"><a class="changelog-source" href="${esc(entry.source.url)}" target="_blank" rel="noopener noreferrer">${esc(local(entry.source.label))} <span aria-hidden="true">↗</span></a></div>`
    : '';
  return `                <li class="changelog-entry" id="${esc(entry.id)}">
                  ${titleMarkup}
                  <p>${esc(local(entry.summary))}</p>
                  ${sourceMarkup}
                </li>`;
}

function groupMarkup(date, group) {
  const groupId = `group-${date}-${group.id}`;
  return `            <section class="changelog-group" aria-labelledby="${esc(groupId)}">
              <h3 id="${esc(groupId)}">${esc(local(group.title))}</h3>
              <ul class="changelog-entries">
${(group.entries || []).map(entryMarkup).join('\n')}
              </ul>
            </section>`;
}

function dayMarkup(day) {
  return `        <section class="changelog-day" aria-labelledby="date-${esc(day.date)}">
          <div class="changelog-day-header"><h2 id="date-${esc(day.date)}"><time datetime="${esc(day.date)}">${esc(formatDate(day.date))}</time></h2></div>
          <div class="changelog-groups">
${(day.groups || []).map(group => groupMarkup(day.date, group)).join('\n')}
          </div>
        </section>`;
}

const staticMarkup = changelog.map(dayMarkup).join('\n\n');
const entries = changelog.flatMap(day => (day.groups || []).flatMap(group => (group.entries || []).map(entry => ({ ...entry, date: day.date }))));
const latestDate = changelog.map(day => day.date).filter(validDate).sort().at(-1) || '2026-09-06';
const description = 'NewAnime 공개 이후의 주요 기능 개선과 애니메이션 정보 변경 사항을 검수해 날짜별로 요약한 업데이트 기록입니다.';
const title = '최근 업데이트 - NewAnime';
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  url: `${SITE}/updates/?lang=ko`,
  description,
  inLanguage: 'ko',
  dateModified: latestDate,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: local(entry.title),
        description: local(entry.summary),
        url: `${SITE}/updates/?lang=ko#${encodeURIComponent(entry.id)}`
      }
    }))
  }
};

let html = fs.readFileSync(UPDATES_PATH, 'utf8');
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
html = html.replace(/<meta name="description" id="metaDescription" content="[^"]*" \/>/, `<meta name="description" id="metaDescription" content="${esc(description)}" />`);
html = html.replace(/<meta property="og:title" id="ogTitle" content="[^"]*" \/>/, `<meta property="og:title" id="ogTitle" content="${title}" />`);
html = html.replace(/<meta property="og:description" id="ogDescription" content="[^"]*" \/>/, `<meta property="og:description" id="ogDescription" content="${esc(description)}" />`);
html = html.replace(/<meta name="twitter:title" id="twitterTitle" content="[^"]*" \/>/, `<meta name="twitter:title" id="twitterTitle" content="${title}" />`);
html = html.replace(/<meta name="twitter:description" id="twitterDescription" content="[^"]*" \/>/, `<meta name="twitter:description" id="twitterDescription" content="${esc(description)}" />`);
html = html.replace(/<script type="application\/ld\+json" id="updatesStructuredData">[\s\S]*?<\/script>/, `<script type="application/ld+json" id="updatesStructuredData">\n  ${safeJson(structuredData)}\n  </script>`);
html = html.replace(/<p id="updatesDescription">[\s\S]*?<\/p>/, '<p id="updatesDescription">NewAnime에 반영된 주요 기능 개선과 작품 정보 갱신 내역을 선별해 날짜별로 기록합니다.</p>');
html = html.replace(/<div class="updates-list" id="updatesList">[\s\S]*?<\/div>\s*<p class="updates-empty hidden" id="updatesEmpty">[^<]*<\/p>/, `<div class="updates-list" id="updatesList">\n${staticMarkup}\n      </div>\n      <p class="updates-empty hidden" id="updatesEmpty">표시할 업데이트 기록이 없습니다.</p>`);

// The public changelog is self-contained. Remove legacy or previously generated
// changelog payloads so regeneration always leaves one canonical loading order.
html = html.replace(/\n\s*<script src="\.\.\/data\/anime\.js\?[^\"]*"><\/script>/g, '');
html = html.replace(/\n\s*<script src="\.\.\/data\/anime-20260904\.js\?[^\"]*"><\/script>/g, '');
html = html.replace(/\n\s*<script src="\.\.\/data\/updates(?:-[^\"]+)?\.js\?[^\"]*"><\/script>/g, '');
html = html.replace(/\n\s*<script src="\.\.\/data\/changelog(?:-[^\"]+)?\.js\?[^\"]*"><\/script>/g, '');
html = html.replace(/\n\s*<script src="updates\.js\?[^\"]*"><\/script>/g, '');
html = html.replace(/\s*<\/body>/, '\n  <script src="../data/changelog.js?v=20260909-history3"></script>\n  <script src="../data/changelog-20260909.js?v=20260909-history3"></script>\n  <script src="updates.js?v=20260909-history3"></script>\n</body>');

fs.writeFileSync(UPDATES_PATH, html);

if (fs.existsSync(SITEMAP_PATH)) {
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/newani\.me\/updates\/\?lang=(ko|ja|en)<\/loc>[\s\S]*?<\/url>/g, block => {
    if (/<lastmod>[^<]+<\/lastmod>/.test(block)) return block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${latestDate}</lastmod>`);
    return block.replace(/(<loc>[^<]+<\/loc>)/, `$1\n    <lastmod>${latestDate}</lastmod>`);
  });
  fs.writeFileSync(SITEMAP_PATH, sitemap);
}

console.log(`Generated curated changelog: ${changelog.length} dates, ${entries.length} entries. Latest: ${latestDate}`);
