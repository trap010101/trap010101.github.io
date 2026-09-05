// Official-site audit verified on 2026-09-05.
// Runtime overrides keep the audit isolated from the large canonical dataset while preserving stable anime IDs.
(() => {
  const verifiedAt = "2026-09-05";
  const updates = {
    "looking-for-zombies": {
      official: "https://zommasu.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "tetsuryo-meet-with-tetsudo-musume": {
      official: "https://tetsuryo-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "junket-bank": {
      official: "https://junketbank-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-timid-max-lady-took-her-shrewd-fiance-s-bet": {
      official: "https://yowaki-max-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary": {
      official: "https://saikyosoubi.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "magical-sisters-lulutto-lilly-part-2": {
      official: "https://www.luluttolilly.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "a-returners-magic-should-be-special-season-2": {
      official: "https://returners-magic.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-iceblade-sorcerer-shall-rule-the-world-ii": {
      official: "https://hyouken-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "chitose-is-in-the-ramune-bottle-part-2": {
      official: "https://chiramune.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "everyday-host-new-series": {
      official: "https://www.tv-tokyo.co.jp/anime/everydayhost/",
      type: "official-site",
      label: "TV Tokyo official anime site",
      supports: ["announcement", "release", "format"]
    },
    "matsurika-kanriden": {
      official: "https://matsurika-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-principle-of-a-philosopher-by-eternal-fool-asley": {
      official: "https://asley-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": {
      official: "https://monaxmedaka.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "hirayasumi": {
      official: "https://hirayasumi-anime.jp/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "welcome-to-demon-school-iruma-kun-if-episode-of-mafia": {
      official: "https://x.com/nep_irumafia",
      type: "official-x",
      label: "Official X account",
      supports: ["announcement", "release"]
    },
    "the-one-piece": {
      official: "https://www.witstudio.co.jp/works/the-one-piece",
      type: "studio",
      label: "WIT Studio official work page",
      supports: ["announcement", "release-global", "format"]
    }
  };

  if (!Array.isArray(window.animeData)) return;

  window.animeData.forEach(anime => {
    const update = updates[anime.id];
    if (!update) return;

    anime.links = anime.links || {};
    anime.links.official = update.official;

    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = verifiedAt;
    if (!Array.isArray(anime.verification.sources)) anime.verification.sources = [];

    const alreadyTracked = anime.verification.sources.some(source => source.url === update.official);
    if (!alreadyTracked) {
      anime.verification.sources.push({
        type: update.type,
        url: update.official,
        label: update.label,
        supports: update.supports
      });
    }

    anime.updatedAt = verifiedAt;
  });
})();

// Remaining unchecked-entry verification audit completed on 2026-09-05.
(() => {
  const verifiedAt = "2026-09-05";
  const updates = {
    "jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage": {
      official: "https://jojo-portal.com/anime/sbr/",
      source: "https://jojo-portal.com/news/anime/598/",
      type: "official-site",
      label: "JoJo official portal",
      supports: ["announcement", "release", "streaming"]
    },
    "the-new-prince-of-tennis-u-17-world-cup-final-roster-selection": {
      official: "https://www.tv-tokyo.co.jp/anime/tenipri-u17/",
      source: "https://www.tv-tokyo.co.jp/anime/tenipri-u17/news/",
      type: "other",
      label: "TV Tokyo official anime site",
      supports: ["announcement", "release", "format"]
    },
    "a-certain-dark-sides-shared-living": {
      official: "https://toaru-project.com/item/",
      source: "https://toaru-project.com/item/onair/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "made-in-abyss-theatrical-series-part-1-the-awakening-mystery": {
      official: "https://miabyss.com/",
      source: "https://miabyss.com/news_movie/article015.html",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "be-forever-yamato-rebel3199-chapter-7-rainbow-reincarnation": {
      official: "https://starblazers-yamato.net/",
      source: "https://starblazers-yamato.net/news/1782301824.html",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "psyren": {
      official: "https://psyren-anime.com/",
      source: "https://psyren-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-salty-koharu-has-a-soft-spot-for-me": {
      official: "https://shioama-anime.com/",
      source: "https://shioama-anime.com/newsList.html",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "from-far-away": {
      official: "https://kanatakara-anime.com/",
      source: "https://kanatakara-anime.com/news/detail.html?d=20260714_04",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "there-are-holes-in-the-student-council": {
      official: "https://nama-anaru.com/",
      source: "https://nama-anaru.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "tokyo-revengers-three-deities-war-arc": {
      official: "https://tokyo-revengers-anime.com/",
      source: "https://tokyo-revengers-anime.com/news/archives/4935",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format", "streaming"]
    },
    "magical-girl-raising-project-restart": {
      official: "https://mahoiku-restart.com/",
      source: "https://www.tv-tokyo.co.jp/anime/mahoiku-restart/",
      type: "other",
      label: "TV Tokyo official anime site",
      supports: ["announcement", "release", "format"]
    },
    "aoashi-season-2": {
      official: "https://aoashi-pr.com/",
      source: "https://aoashi-pr.com/news/572/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "reincarnated-as-a-sword-ii": {
      official: "https://www.tenken-anime.com/",
      source: "https://www.tenken-anime.com/news.html",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format", "streaming"]
    },
    "firefly-wedding": {
      official: "https://hotaru-anime.com/",
      source: "https://hotaru-anime.com/news/70/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "tiger-coming-in-2": {
      official: "https://x.com/Laftel_net/status/2095084014784901452",
      source: "https://x.com/Laftel_net/status/2095084014784901452",
      type: "official-x",
      label: "Laftel official X announcement",
      supports: ["announcement", "release", "streaming"]
    },
    "monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre": {
      official: "https://www.monogatari-series.com/oms/",
      source: "https://www.monogatari-series.com/sp/news/?article_id=70724",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"],
      releaseJapan: {
        status: "month",
        year: 2026,
        month: 12,
        day: null,
        display: { ko: "2026년 겨울", ja: "2026年冬", en: "Winter 2026" }
      }
    },
    "me-and-big-bro-yuu": {
      official: "https://oretoyunii.com/",
      source: "https://pictures.dmm.com/special/",
      type: "other",
      label: "DMM pictures official lineup",
      supports: ["announcement", "release", "format"]
    },
    "golden-kamuy-final-chapter-runaway-train-arc": {
      official: "https://www.kamuy-anime.com/",
      source: "https://www.kamuy-anime.com/news/index.html",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"],
      releaseJapan: {
        status: "month",
        year: 2026,
        month: 12,
        day: null,
        display: { ko: "2026년 겨울", ja: "2026年冬", en: "Winter 2026" }
      },
      season: "2026-winter"
    },
    "the-dangers-in-my-heart-season-3": {
      official: "https://bokuyaba-anime.com/",
      source: "https://bokuyaba-anime.com/news/detail/?id=1132070",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "alya-sometimes-hides-her-feelings-in-russian-season-2": {
      official: "https://roshidere.com/",
      source: "https://roshidere.com/news/index01470000.html",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-rising-of-the-shield-hero-season-5": {
      official: "https://shieldhero-anime.jp/",
      source: "https://shieldhero-anime.jp/news/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "war-music-classroom": {
      official: "https://thebuglecall-anime.com/",
      source: "https://thebuglecall-anime.com/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-witch-and-the-mercenary": {
      official: "https://www.anime-witch-mercenary-official.com/",
      source: "https://www.anime-witch-mercenary-official.com/news/detail.php?id=23496",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "fate-kaleid-liner-prisma-illya-finale": {
      official: "https://anime.prisma-illya.jp/finale/",
      source: "https://anime.prisma-illya.jp/finale/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "death-stranding-isolations-working-title": {
      official: "https://www.kojimaproductions.jp/ja/ds_animation_project",
      source: "https://kojimaproductions.jp/en/deathstranding-animation-series-announcement",
      type: "studio",
      label: "Kojima Productions official announcement",
      supports: ["announcement", "release", "format", "streaming"],
      format: "ona"
    },
    "ghost-of-tsushima-legends": {
      official: "https://www.crunchyroll.com/news/announcements/2025/1/7/ghost-of-tsushima-legends-anime-series-2027-crunchyroll",
      source: "https://www.crunchyroll.com/news/announcements/2025/1/7/ghost-of-tsushima-legends-anime-series-2027-crunchyroll",
      type: "streaming-platform",
      label: "Crunchyroll official announcement",
      supports: ["announcement", "release", "format", "streaming"]
    },
    "haikyu-the-movie-vs-the-little-giant": {
      official: "https://haikyu.jp/movie/index.html",
      source: "https://haikyu.jp/news/4778/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-eminence-in-shadow-lost-echoes": {
      official: "https://shadow-garden.jp/",
      source: "https://shadow-garden.jp/news/?p=432",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "one-piece-film-god-valley": {
      official: "https://www.onepiece-film.jp/",
      source: "https://www.onepiece-film.jp/",
      type: "official-site",
      label: "Official website",
      supports: ["announcement", "release", "format"]
    },
    "the-end-roll-runs-across-the-sea": {
      official: "https://umi-endroll-movie.com/",
      source: "https://www.shochiku.co.jp/cinema/lineup/%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E6%98%A0%E7%94%BB%E3%80%8E%E6%B5%B7%E3%81%8C%E8%B5%B0%E3%82%8B%E3%82%A8%E3%83%B3%E3%83%89%E3%83%AD%E3%83%BC%E3%83%AB%E3%80%8F/",
      type: "distributor",
      label: "Shochiku official lineup",
      supports: ["announcement", "release", "format"]
    }
  };

  if (!Array.isArray(window.animeData)) return;

  window.animeData.forEach(anime => {
    const update = updates[anime.id];
    if (!update) return;

    anime.links = anime.links || {};
    if (update.official) anime.links.official = update.official;
    if (update.format) anime.format = update.format;
    if (update.season !== undefined) anime.season = update.season;
    if (update.releaseJapan) {
      anime.release = anime.release || {};
      anime.release.japan = Object.assign({}, anime.release.japan || {}, update.releaseJapan);
    }

    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = verifiedAt;
    if (!Array.isArray(anime.verification.sources)) anime.verification.sources = [];

    const sourceUrl = update.source || update.official;
    const alreadyTracked = anime.verification.sources.some(source => source.url === sourceUrl);
    if (!alreadyTracked) {
      anime.verification.sources.push({
        type: update.type,
        url: sourceUrl,
        label: update.label,
        supports: update.supports
      });
    }

    anime.updatedAt = verifiedAt;
  });
})();
