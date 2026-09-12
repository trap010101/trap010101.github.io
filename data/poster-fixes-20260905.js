// Poster asset corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const fixes = {
    "me-and-big-bro-yuu": { src: "assets/posters/me-and-big-bro-yuu-v2.webp", updatedAt: "2026-09-05" },
    "magical-sisters-lulutto-lilly-part-2": { src: "assets/posters/magical-sisters-lulutto-lilly-part-2-cropped-v2.webp", updatedAt: "2026-09-07" },
    "ice-wall-season-2": { src: "assets/posters/ice-wall-season-2-v2.webp", updatedAt: "2026-09-07" },
    "lent-magic-revolving-collection": { src: "assets/posters/lent-magic-revolving-collection-v2.webp", updatedAt: "2026-09-07" },
    "overgeared-the-power-of-items": { src: "assets/posters/overgeared-the-power-of-items-v2.webp", updatedAt: "2026-09-07" },
    "uncle-likes-cute-things": { src: "assets/posters/uncle-likes-cute-things-v3.webp", updatedAt: "2026-09-07" },
    "mission-yozakura-family-season-2-part-2": { src: "assets/posters/mission-yozakura-family-season-2-part-2-v2.webp", updatedAt: "2026-09-07" },
    "dragon-ball-super-beerus": { src: "assets/posters/dragon-ball-super-beerus-v2.webp", updatedAt: "2026-09-07" },
    "zero-believers-goddess-isekai-strategy": { src: "assets/posters/zero-believers-goddess-isekai-strategy-user-20260912.webp", updatedAt: "2026-09-12" },
    "romelia-war-chronicle": { src: "assets/posters/romelia-war-chronicle-v2.webp", updatedAt: "2026-09-07" },
    "hotel-inhumans-season-2": { src: "assets/posters/hotel-inhumans-season-2-v2.webp", updatedAt: "2026-09-07" },
    "the-witch-was-asked-for-a-love-potion": { src: "assets/posters/the-witch-was-asked-for-a-love-potion-user-20260908.webp", updatedAt: "2026-09-08" },
    "with-vengeance-sincerely-your-broken-saintess-season-2": { src: "assets/posters/with-vengeance-sincerely-your-broken-saintess-season-2-v2.webp", updatedAt: "2026-09-07" },
    "ace-of-diamond-act-ii-second-season-part-2": { src: "assets/posters/ace-of-diamond-act-ii-second-season-part-2-v2.webp", updatedAt: "2026-09-07" },
    "prince-of-tennis-u17-world-cup-final-members-selection": { src: "assets/posters/prince-of-tennis-u17-world-cup-final-members-selection-v2.webp", updatedAt: "2026-09-07" },
    "appraisal-skill-season-3": { src: "assets/posters/appraisal-skill-season-3-v2.webp", updatedAt: "2026-09-07" },
    "the-guy-she-was-interested-in-wasnt-a-guy-at-all": { src: "assets/posters/the-guy-she-was-interested-in-wasnt-a-guy-at-all-user-20260907-r4.webp", updatedAt: "2026-09-07" },
    "im-a-reincarnated-goblin-any-questions": { src: "assets/posters/im-a-reincarnated-goblin-any-questions-user-20260907-r4.webp", updatedAt: "2026-09-07" },
    "chihara-san-is-she-a-landmine": { src: "assets/posters/chihara-san-is-she-a-landmine-v2.webp", updatedAt: "2026-09-07" },
    "arcanadea": { src: "assets/posters/arcanadea-v2.webp", updatedAt: "2026-09-07" },
    "marriage-toxin-season-2": { src: "assets/posters/marriage-toxin-season-2-v2.webp", updatedAt: "2026-09-07" },
    "eleceed": { src: "assets/posters/eleceed-v2.webp", updatedAt: "2026-09-07" },
    "lona": { src: "assets/posters/lona-v2.webp", updatedAt: "2026-09-07" },
    "kindergarten-wars": { src: "assets/posters/kindergarten-wars-v2.webp", updatedAt: "2026-09-07" },
    "free-fire-daybreak": { src: "assets/posters/free-fire-daybreak-v2.webp", updatedAt: "2026-09-07" },
    "midnight-heart-tune-season-2": { src: "assets/posters/midnight-heart-tune-season-2-v2.webp", updatedAt: "2026-09-07" },
    "gate-season-2": { src: "assets/posters/gate-season-2-v2.webp", updatedAt: "2026-09-07" },
    "dark-gathering-season-2": { src: "assets/posters/dark-gathering-season-2-v2.webp", updatedAt: "2026-09-07" },
    "berserk-of-gluttony-season-2": { src: "assets/posters/berserk-of-gluttony-season-2-v2.webp", updatedAt: "2026-09-07" },
    "new-kochikame": { src: "assets/posters/new-kochikame-v3.webp", updatedAt: "2026-09-07" },
    "haikyu-monsters-go-where": { src: "assets/posters/haikyu-monsters-go-where-v3.webp", updatedAt: "2026-09-07" },
    "seven-sleeping-beauties": { src: "assets/posters/seven-sleeping-beauties-v2.webp", updatedAt: "2026-09-07" },
    "fall-in-love-you-false-angels": { src: "assets/posters/fall-in-love-you-false-angels-v2.webp", updatedAt: "2026-09-07" },
    "the-strongest-magicmasters-retirement-plan": { src: "assets/posters/the-strongest-magicmasters-retirement-plan-v3.webp", updatedAt: "2026-09-07" },
    "nabe-ni-dangan": { src: "assets/posters/nabe-ni-dangan-v3.webp", updatedAt: "2026-09-07" },
    "namidaame-to-serenade": { src: "assets/posters/namidaame-to-serenade-v2.webp", updatedAt: "2026-09-07" },
    "true-saint-banished-country-done-for": { src: "assets/posters/true-saint-banished-country-done-for-v3.webp", updatedAt: "2026-09-07" },
    "studio-cabana": { src: "assets/posters/studio-cabana-v2.webp", updatedAt: "2026-09-07" },
    "soara-and-the-house-of-monsters": { src: "assets/posters/soara-and-the-house-of-monsters-v2.webp", updatedAt: "2026-09-07" },
    "dengeki-daisy": { src: "assets/posters/dengeki-daisy-v2.webp", updatedAt: "2026-09-07" },
    "magic-to-the-limit-reincarnated-elf": { src: "assets/posters/magic-to-the-limit-reincarnated-elf-v3.webp", updatedAt: "2026-09-07" },
    "demons-are-plotting": { src: "assets/posters/demons-are-plotting-v3.webp", updatedAt: "2026-09-07" },
    "rebel-robotica": { src: "assets/posters/rebel-robotica-v2.webp", updatedAt: "2026-09-07" },
    "beat-and-motion": { src: "assets/posters/beat-and-motion-v2.webp", updatedAt: "2026-09-07" },
    "unlucky-to-strongest-man": { src: "assets/posters/unlucky-to-strongest-man-v2.webp", updatedAt: "2026-09-07" },
    "maiden-blood": { src: "assets/posters/maiden-blood-v2.webp", updatedAt: "2026-09-07" },
    "hokuto-no-ken-fist-of-the-north-star-part-2": { src: "assets/posters/hokuto-no-ken-fist-of-the-north-star-part-2-v2.webp", updatedAt: "2026-09-07" },
    "unrewarded-villager-a": { src: "assets/posters/unrewarded-villager-a-v3.webp", updatedAt: "2026-09-07" },
    "glasses-sometimes-yankee-kun": { src: "assets/posters/glasses-sometimes-yankee-kun-v2.webp", updatedAt: "2026-09-07" },
    "we-are-aliens": { src: "assets/posters/we-are-aliens.webp", updatedAt: "2026-09-07" },
    "the-timid-max-lady-took-her-shrewd-fiance-s-bet": {
      src: "https://img2.animatetimes.com/2025/10/eb0a0ae1968806570abb341412f0c1df68edefe58a6b92_92699022_53161abe07df736d0674582b3630719ef224d0a6.jpg",
      updatedAt: "2026-09-12"
    },
    "a-certain-dark-sides-shared-living": {
      src: "assets/posters/a-certain-dark-sides-shared-living-v2.webp",
      updatedAt: "2026-09-10"
    },
    "nia-liston-the-merciless-maiden": {
      src: "assets/posters/nia-liston-the-merciless-maiden-v2.webp",
      updatedAt: "2026-09-10"
    },
    "sss-class-revival-hunter": { src: "assets/posters/sss-class-revival-hunter.webp", updatedAt: "2026-09-10" }
  };

  for (const anime of window.animeData) {
    const fix = fixes[anime.id];
    if (!fix) continue;
    anime.poster = { ...(anime.poster || {}), src: fix.src };
    anime.updatedAt = fix.updatedAt;
  }

  // User-confirmed Korean titles. Keep these final overrides after the canonical data loads.
  const kinioto = window.animeData.find(anime => anime.id === "the-guy-she-was-interested-in-wasnt-a-guy-at-all");
  if (kinioto) {
    kinioto.title = { ...kinioto.title, ko: "신경 쓰이는 사람이 남자가 아니었다" };
    kinioto.updatedAt = "2026-09-07";
  }

  const timidMax = window.animeData.find(anime => anime.id === "the-timid-max-lady-took-her-shrewd-fiance-s-bet");
  if (timidMax) {
    timidMax.title = { ...timidMax.title, ko: "나약MAX 영애인데 수완가 약혼자와 내기를 하고 말았다" };
    timidMax.updatedAt = "2026-09-12";
  }

  const mercedes = window.animeData.find(anime => anime.id === "mercedes-and-the-waning-moon");
  if (mercedes) {
    mercedes.title = { ...mercedes.title, ko: "이지러진 달의 메르세데스 ~흡혈귀 귀족으로 전생했지만 버려질 운명에 처했으므로 던전을 제패하겠다~" };
    mercedes.updatedAt = "2026-09-12";
  }
})();