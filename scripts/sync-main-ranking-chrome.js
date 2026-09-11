const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOME = path.join(ROOT, 'index.html');
const RANKING = path.join(ROOT, 'ranking', 'index.html');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function writeIfChanged(file, next) {
  const current = read(file);
  if (current === next) return false;
  fs.writeFileSync(file, next);
  return true;
}

function extract(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find homepage ${label}.`);
  return match[0];
}

function normalizeHomepageChromeAssets() {
  let home = read(HOME);
  home = home
    .replace('href="assets/newanime-logo.svg?v=20260909-logo2"', 'href="/assets/newanime-logo.svg?v=20260909-logo2"')
    .replace('src="assets/newanime-logo.svg?v=20260909-logo2"', 'src="/assets/newanime-logo.svg?v=20260909-logo2"');
  return writeIfChanged(HOME, home);
}

function syncRankingChrome() {
  const home = read(HOME);
  const header = extract(home, /    <header class="site-header">[\s\S]*?    <\/header>/, 'header');
  const footer = extract(home, /    <footer>[\s\S]*?    <\/footer>/, 'footer');
  const siteInfoHref = home.match(/<link rel="stylesheet" href="(?:\/)?site-info\.css\?v=[^"]+"\s*\/?>/)?.[0]
    ?.replace('href="site-info.css', 'href="/site-info.css')
    || '<link rel="stylesheet" href="/site-info.css?v=20260906-info1" />';

  let ranking = read(RANKING);
  ranking = ranking
    .replace(/    <header class="site-header">[\s\S]*?    <\/header>/, header)
    .replace(/    <footer>[\s\S]*?    <\/footer>/, footer)
    .replace('<body class="ranking-page">', '<body class="ranking-page" data-main-chrome-source="homepage">')
    .replace(/\/wishlist-ranking\.css\?v=[^"']+/, '/wishlist-ranking.css?v=20260910-ranking5')
    .replace(/\/wishlist-ranking-refine\.css\?v=[^"']+/, '/wishlist-ranking-refine.css?v=20260910-refine2')
    .replace(/\/secondary-header\.js\?v=[^"']+/, '/secondary-header.js?v=20260911-theme13')
    .replace(/\/wishlist-ranking\.js\?v=[^"']+/, '/wishlist-ranking.js?v=20260910-ranking5')
    .replace(/\/wishlist-ranking-refine\.js\?v=[^"']+/, '/wishlist-ranking-refine.js?v=20260910-refine4');

  if (!/href="\/site-info\.css\?v=[^"]+"/.test(ranking)) {
    ranking = ranking.replace(
      /(<link rel="stylesheet" href="\/styles\.css\?v=[^"]+"\s*\/?>)/,
      `$1\n  ${siteInfoHref.trim()}`
    );
  } else {
    ranking = ranking.replace(/<link rel="stylesheet" href="\/site-info\.css\?v=[^"]+"\s*\/?>/, siteInfoHref.trim());
  }

  return writeIfChanged(RANKING, ranking);
}

function refineRankingSource() {
  const file = path.join(ROOT, 'wishlist-ranking.js');
  let source = read(file);
  source = source
    .replace("foot: '매일 00:00 KST 갱신 · 운영자 계정 제외'", "foot: '랭킹에는 방영 예정인 작품만 표시 · 매일 00:00 KST 갱신'")
    .replace("foot: '毎日00:00 KST更新 · 運営者アカウントを除外'", "foot: 'ランキングには放送・公開予定作品のみ表示 · 毎日00:00 KST更新'")
    .replace("foot: 'Updated daily at 00:00 KST · Operator account excluded'", "foot: 'Ranking includes upcoming titles only · Updated daily at 00:00 KST'")
    .replace('        <span class="wishlist-ranking-scope"></span>\n', '');
  return writeIfChanged(file, source);
}

function refineHomepageLoader() {
  const file = path.join(ROOT, 'anime-links.js');
  let source = read(file);
  source = source
    .replace(/\/wishlist-ranking\.css\?v=[^"']+/, '/wishlist-ranking.css?v=20260910-ranking5')
    .replace(/\/wishlist-ranking-refine\.css\?v=[^"']+/, '/wishlist-ranking-refine.css?v=20260910-refine2')
    .replace(/\/wishlist-ranking\.js\?v=[^"']+/, '/wishlist-ranking.js?v=20260910-ranking5')
    .replace(/\/wishlist-ranking-refine\.js\?v=[^"']+/, '/wishlist-ranking-refine.js?v=20260910-refine4');
  return writeIfChanged(file, source);
}

function bustHomepageRankingLoader() {
  let home = read(HOME);
  home = home.replace(/anime-links\.js\?v=[^"']+/, 'anime-links.js?v=20260910-ranking5');
  return writeIfChanged(HOME, home);
}

function alignSecondaryHeaderWithHomepageMarkup() {
  const file = path.join(ROOT, 'secondary-header.js');
  let source = read(file);
  source = source.replace("event.target.closest('#shareButton[data-secondary-share]')", "event.target.closest('#shareButton')");
  return writeIfChanged(file, source);
}

const changed = [
  normalizeHomepageChromeAssets(),
  syncRankingChrome(),
  refineRankingSource(),
  refineHomepageLoader(),
  bustHomepageRankingLoader(),
  alignSecondaryHeaderWithHomepageMarkup()
].filter(Boolean).length;

console.log(`Synced ranking chrome and ranking copy with homepage (${changed} file${changed === 1 ? '' : 's'} changed).`);
