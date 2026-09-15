#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data/anime-20260904.js');
const POSTER_FIXES = path.join(ROOT, 'data/poster-fixes-20260905.js');
const INDEX = path.join(ROOT, 'index.html');
const RANKING = path.join(ROOT, 'ranking/index.html');
const MARKER = '// 2026-09-10: SSS-Class Revival Hunter addition';
const CATALOG_MARKER = '// 2026-09-15: requested catalog additions, removal, and title correction';

if (!fs.existsSync(DATA)) throw new Error('Anime additions file not found.');

let source = fs.readFileSync(DATA, 'utf8');
if (!source.includes(MARKER)) {
  source += `\n\n${MARKER}\n(() => {\n  if (!Array.isArray(window.animeData)) return;\n  if (window.animeData.some(anime => anime?.id === 'sss-class-revival-hunter')) return;\n\n  const verifiedAt = '2026-09-10';\n  window.animeData.push({\n    id: 'sss-class-revival-hunter',\n    title: {\n      ko: 'SSS급 죽어야 사는 헌터',\n      ja: '死して生きるSSS級ハンター',\n      en: 'SSS-Class Revival Hunter'\n    },\n    aliases: [\n      'SSS급 자살헌터',\n      'SSS-Class Suicide Hunter',\n      '死して生きるSSS級ハンター'\n    ],\n    release: {\n      japan: { status: 'month', year: 2027, month: 1, day: null },\n      korea: null,\n      global: null\n    },\n    productionStatus: 'scheduled',\n    season: '2027-winter',\n    format: 'tv',\n    origin: 'web-novel',\n    tags: ['new', 'webnovel', 'webtoon'],\n    poster: null,\n    links: {\n      pv: 'https://www.youtube.com/watch?v=3Jbetkscl7k',\n      official: 'https://sss-revival.com/',\n      streaming: null\n    },\n    streaming: {},\n    verification: {\n      verifiedAt,\n      sources: [\n        {\n          type: 'official-x',\n          url: 'https://x.com/SSShunter_anime/status/2097716912893694453',\n          label: 'Official X — TV anime announcement / January 2027',\n          supports: ['announcement', 'release', 'format', 'pv'],\n          verifiedAt\n        },\n        {\n          type: 'official-site',\n          url: 'https://sss-revival.com/',\n          label: 'Official website — January 2027 TV anime',\n          supports: ['announcement', 'release', 'format'],\n          verifiedAt\n        }\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n})();\n`;
}

if (!source.includes(CATALOG_MARKER)) {
  source += `\n\n${CATALOG_MARKER}\n(() => {\n  if (!Array.isArray(window.animeData)) return;\n\n  const verifiedAt = '2026-09-15';\n  const officialSource = (url, label, supports) => ({\n    type: 'official-site',\n    url,\n    label,\n    supports,\n    verifiedAt\n  });\n  const officialYoutube = (url, label) => ({\n    type: 'official-youtube',\n    url,\n    label,\n    supports: ['pv'],\n    verifiedAt\n  });\n  const dateRelease = (year, month, day) => ({ status: 'date', year, month, day });\n  const monthRelease = (year, month) => ({ status: 'month', year, month, day: null });\n  const tvSchedule = (date, time, sourceUrl) => ({\n    premiere: {\n      type: 'tv',\n      date,\n      time,\n      timezone: 'Asia/Tokyo',\n      displayTime: time\n    },\n    source: sourceUrl,\n    verifiedAt\n  });\n  const addIfMissing = anime => {\n    if (!window.animeData.some(item => item?.id === anime.id)) window.animeData.push(anime);\n  };\n\n  // NewAnime indexes first-run titles. This title already premiered in China before\n  // the Japanese broadcast window, so remove it from every runtime/static consumer.\n  const forbiddenCityIndex = window.animeData.findIndex(item => item?.id === 'forbidden-city-cat-guard-room');\n  if (forbiddenCityIndex >= 0) window.animeData.splice(forbiddenCityIndex, 1);\n\n  // User-confirmed Korean display title for the second season/arc.\n  const tougenAnki = window.animeData.find(item => item?.id === 'tougen-anki-nikko-and-kegon-falls-arc');\n  if (tougenAnki) {\n    tougenAnki.title = {\n      ...tougenAnki.title,\n      ko: '도원암귀 ~일광·화엄 폭포 편~'\n    };\n    tougenAnki.updatedAt = verifiedAt;\n  }\n\n  addIfMissing({\n    id: 'from-old-country-bumpkin-to-master-swordsman-season-2',\n    title: {\n      ko: '촌구석 아저씨, 검성이 되다 Ⅱ',\n      ja: '片田舎のおっさん、剣聖になるII',\n      en: 'From Old Country Bumpkin to Master Swordsman Season 2'\n    },\n    aliases: [\n      '片田舎のおっさん、剣聖になる 第2期',\n      'From Old Country Bumpkin to Master Swordsman II'\n    ],\n    release: { japan: dateRelease(2026, 7, 8), korea: null, global: null },\n    productionStatus: 'scheduled',\n    season: '2026-summer',\n    format: 'tv',\n    origin: 'light-novel',\n    tags: ['series', 'ln'],\n    poster: null,\n    links: {\n      pv: 'https://www.youtube.com/watch?v=7n7FDNqtBHg',\n      official: 'https://ossan-kensei.com/',\n      streaming: 'https://ossan-kensei.com/onair/'\n    },\n    streaming: {},\n    schedule: tvSchedule('2026-07-08', '23:45', 'https://ossan-kensei.com/onair/'),\n    verification: {\n      verifiedAt,\n      sources: [\n        officialSource(\n          'https://ossan-kensei.com/onair/',\n          'Official ON AIR — July 8, 23:45 (TV Asahi network); Prime Video world-exclusive streaming from July 9',\n          ['release', 'format', 'streaming']\n        ),\n        officialSource(\n          'https://ossan-kensei.com/news/index00120000.html',\n          'Official website — Season 2 key visual and PV 3',\n          ['announcement', 'poster', 'pv']\n        ),\n        officialYoutube(\n          'https://www.youtube.com/watch?v=7n7FDNqtBHg',\n          'NBCUniversal Anime/Music — Season 2 PV 3'\n        )\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n\n  addIfMissing({\n    id: 'the-exiled-heavy-knight-knows-how-to-game-the-system',\n    title: {\n      ko: '추방 당한 전생 중기사는 게임 지식으로 무쌍한다',\n      ja: '追放された転生重騎士はゲーム知識で無双する',\n      en: 'The Exiled Heavy Knight Knows How to Game the System'\n    },\n    aliases: [\n      '追放された転生重騎士',\n      'Tsuihou sareta Tensei Juukishi wa Game Chishiki de Musou suru'\n    ],\n    release: { japan: dateRelease(2026, 7, 2), korea: null, global: null },\n    productionStatus: 'scheduled',\n    season: '2026-summer',\n    format: 'tv',\n    origin: 'web-novel',\n    tags: ['new', 'webnovel', 'comic'],\n    poster: null,\n    links: {\n      pv: 'https://www.youtube.com/watch?v=uC13b3_8riU',\n      official: 'https://sh-anime.shochiku.co.jp/jukishi-anime/',\n      streaming: 'https://sh-anime.shochiku.co.jp/jukishi-anime/onair/'\n    },\n    streaming: {},\n    schedule: tvSchedule('2026-07-02', '24:26', 'https://sh-anime.shochiku.co.jp/jukishi-anime/onair/'),\n    verification: {\n      verifiedAt,\n      sources: [\n        officialSource(\n          'https://sh-anime.shochiku.co.jp/jukishi-anime/onair/',\n          'Official ON AIR — July 2, 24:26; two consecutive cours; official streaming schedule',\n          ['release', 'format', 'streaming']\n        ),\n        officialSource(\n          'https://sh-anime.shochiku.co.jp/jukishi-anime/news/67/',\n          'Official news — Main PV 2 and streaming information',\n          ['release', 'pv', 'streaming']\n        ),\n        officialYoutube(\n          'https://www.youtube.com/watch?v=uC13b3_8riU',\n          'SHOCHIKU anime Channel — Main PV 2'\n        )\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n\n  addIfMissing({\n    id: 'uchi-no-otouto-domo-ga-sumimasen',\n    title: {\n      ko: '우리 남동생들이 죄송합니다',\n      ja: 'うちの弟どもがすみません',\n      en: 'Uchi no Otouto-domo ga Sumimasen'\n    },\n    aliases: ['うち弟', 'Uchioto'],\n    release: { japan: dateRelease(2026, 7, 3), korea: null, global: null },\n    productionStatus: 'scheduled',\n    season: '2026-summer',\n    format: 'tv',\n    origin: 'manga',\n    tags: ['new', 'comic'],\n    poster: null,\n    links: {\n      pv: 'https://youtu.be/P927_ZvgUUg',\n      official: 'https://uchioto-anime.com/',\n      streaming: 'https://uchioto-anime.com/onair/'\n    },\n    streaming: {},\n    schedule: tvSchedule('2026-07-03', '24:00', 'https://uchioto-anime.com/onair/'),\n    verification: {\n      verifiedAt,\n      sources: [\n        officialSource(\n          'https://uchioto-anime.com/onair/',\n          'Official ON AIR — July 3, 24:00; two consecutive cours / 24 episodes; official streaming schedule',\n          ['release', 'format', 'streaming']\n        ),\n        officialSource(\n          'https://uchioto-anime.com/news/?article_id=70251',\n          'Official news — key visual, cast, broadcast details and PV 1',\n          ['announcement', 'release', 'format', 'poster', 'pv']\n        )\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n\n  addIfMissing({\n    id: 'onegai-aipri',\n    title: {\n      ko: '부탁해 아이프리',\n      ja: 'おねがいアイプリ',\n      en: 'Onegai AiPri'\n    },\n    aliases: ['お願いアイプリ', 'Onegai Aipri'],\n    release: { japan: dateRelease(2026, 4, 5), korea: null, global: null },\n    productionStatus: 'scheduled',\n    season: '2026-spring',\n    format: 'tv',\n    origin: 'game',\n    tags: ['series', 'game'],\n    poster: null,\n    links: {\n      pv: 'https://www.youtube.com/watch?v=j5MgjyhhUBc',\n      official: 'https://aipri.jp/anime/',\n      streaming: 'https://aipri.jp/anime/onair/'\n    },\n    streaming: {},\n    schedule: tvSchedule('2026-04-05', '09:30', 'https://aipri.jp/anime/onair/'),\n    verification: {\n      verifiedAt,\n      sources: [\n        officialSource(\n          'https://aipri.jp/anime/onair/',\n          'Official ON AIR — April 5, 09:30 (TV Tokyo six-station network)',\n          ['release', 'format']\n        ),\n        officialSource(\n          'https://aipri.jp/anime/topics/post-1/',\n          'Official website renewal — Onegai AiPri launch and April 5 premiere',\n          ['announcement', 'release', 'format']\n        )\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n\n  addIfMissing({\n    id: 'horror-collector',\n    title: {\n      ko: '공포 스쿨',\n      ja: '恐怖コレクター',\n      en: 'Horror Collector'\n    },\n    aliases: ['공포 컬렉터', 'Kyoufu Collector'],\n    release: { japan: monthRelease(2026, 10), korea: null, global: null },\n    productionStatus: 'scheduled',\n    season: '2026-fall',\n    format: 'tv',\n    origin: 'novel',\n    tags: ['new'],\n    poster: null,\n    links: {\n      pv: null,\n      official: 'https://www.nhk-character.com/chara/kyoufucollector/',\n      streaming: null\n    },\n    streaming: {},\n    verification: {\n      verifiedAt,\n      sources: [\n        officialSource(\n          'https://www.nhk-character.com/chara/kyoufucollector/news/20260725_48.html',\n          'Official anime site — NHK General TV start in October 2026',\n          ['announcement', 'release', 'format']\n        ),\n        {\n          type: 'publisher',\n          url: 'https://www.kadokawa.co.jp/topics/15231/',\n          label: 'KADOKAWA — TV anime adaptation / Fall 2026; Kadokawa Tsubasa Bunko novel',\n          supports: ['announcement', 'release', 'format', 'origin'],\n          verifiedAt\n        }\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n})();\n`;
}

fs.writeFileSync(DATA, source);
console.log(source.includes(CATALOG_MARKER)
  ? 'Requested 2026-09-15 catalog batch is present.'
  : 'Failed to append requested catalog batch.');

if (fs.existsSync(POSTER_FIXES)) {
  let posterSource = fs.readFileSync(POSTER_FIXES, 'utf8');
  const posterEntries = [
    ['from-old-country-bumpkin-to-master-swordsman-season-2', 'https://www.crank-in.net/img/db/263072075180342_650.jpg'],
    ['the-exiled-heavy-knight-knows-how-to-game-the-system', 'https://futaman.ismcdn.jp/mwimgs/9/c/1456wm/img_9c107a86f12bbf89a9ddeb1574a662c12116267.jpg'],
    ['uchi-no-otouto-domo-ga-sumimasen', 'https://image.tmdb.org/t/p/w500/sFSwNfxWxDGAjfbbzEJYz9BUIbC.jpg'],
    ['onegai-aipri', 'https://www.crank-in.net/img/db/261029260198475_1200.jpg'],
    ['horror-collector', 'https://pbs.twimg.com/media/G7TyG1gbgAAfGb6.png']
  ];
  const missingPosterEntries = posterEntries.filter(([id]) => !posterSource.includes(`"${id}"`));
  if (missingPosterEntries.length) {
    const insertion = missingPosterEntries.map(([id, url]) => [
      `    "${id}": {`,
      `      src: "${url}",`,
      `      updatedAt: "2026-09-15"`,
      '    },'
    ].join('\n')).join('\n');
    posterSource = posterSource.replace(
      '  const fixes = {\n',
      `  const fixes = {\n${insertion}\n`
    );
    fs.writeFileSync(POSTER_FIXES, posterSource);
    console.log(`Added ${missingPosterEntries.length} poster source(s) for catalog batch.`);
  } else {
    console.log('Catalog poster sources already present.');
  }
}

for (const file of [INDEX, RANKING]) {
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const next = html.replace(
    /data\/anime-20260904\.js\?v=[^\"']+/g,
    'data/anime-20260904.js?v=20260915-catalog1'
  );
  if (next !== html) {
    fs.writeFileSync(file, next);
    console.log(`Bumped anime additions cache key in ${path.relative(ROOT, file)}.`);
  }
}
