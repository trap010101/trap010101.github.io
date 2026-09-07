// Poster asset corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const fixes = {
    "me-and-big-bro-yuu": {
      src: "assets/posters/me-and-big-bro-yuu-v2.webp",
      updatedAt: "2026-09-05"
    },
    "magical-sisters-lulutto-lilly-part-2": {
      src: "assets/posters/magical-sisters-lulutto-lilly-part-2-cropped-v2.webp",
      updatedAt: "2026-09-07"
    },

    // Missing posters found in the September 7 schedule/data audit.
    // Prefer the current anime teaser/key visual; several match the official visuals indexed by Namuwiki.
    "ice-wall-season-2": {
      src: "assets/posters/ice-wall-season-2.jpg",
      updatedAt: "2026-09-07"
    },
    "lent-magic-revolving-collection": {
      src: "assets/posters/lent-magic-revolving-collection.webp",
      updatedAt: "2026-09-07"
    },
    "overgeared-the-power-of-items": {
      src: "assets/posters/overgeared-the-power-of-items.webp",
      updatedAt: "2026-09-07"
    },
    "uncle-likes-cute-things": {
      src: "assets/posters/uncle-likes-cute-things.jpg",
      updatedAt: "2026-09-07"
    },
    "mission-yozakura-family-season-2-part-2": {
      src: "assets/posters/mission-yozakura-family-season-2-part-2.jpg",
      updatedAt: "2026-09-07"
    },
    "dragon-ball-super-beerus": {
      src: "assets/posters/dragon-ball-super-beerus.jpg",
      updatedAt: "2026-09-07"
    },
    "zero-believers-goddess-isekai-strategy": {
      src: "assets/posters/zero-believers-goddess-isekai-strategy.webp",
      updatedAt: "2026-09-07"
    },
    "romelia-war-chronicle": {
      src: "assets/posters/romelia-war-chronicle.jpg",
      updatedAt: "2026-09-07"
    },
    "hotel-inhumans-season-2": {
      src: "assets/posters/hotel-inhumans-season-2.jpg",
      updatedAt: "2026-09-07"
    },
    "a-wild-last-boss-appeared-season-2": {
      src: "assets/posters/a-wild-last-boss-appeared-season-2.jpg",
      updatedAt: "2026-09-07"
    },
    "the-witch-was-asked-for-a-love-potion": {
      src: "assets/posters/the-witch-was-asked-for-a-love-potion.jpg",
      updatedAt: "2026-09-07"
    },
    "with-vengeance-sincerely-your-broken-saintess-season-2": {
      src: "assets/posters/with-vengeance-sincerely-your-broken-saintess-season-2.jpg",
      updatedAt: "2026-09-07"
    },
    "ace-of-diamond-act-ii-second-season-part-2": {
      src: "assets/posters/ace-of-diamond-act-ii-second-season-part-2.jpg",
      updatedAt: "2026-09-07"
    },
    "prince-of-tennis-u17-world-cup-final-members-selection": {
      src: "assets/posters/prince-of-tennis-u17-world-cup-final-members-selection.webp",
      updatedAt: "2026-09-07"
    },
    "appraisal-skill-season-3": {
      src: "assets/posters/appraisal-skill-season-3.jpg",
      updatedAt: "2026-09-07"
    },
    "the-guy-she-was-interested-in-wasnt-a-guy-at-all": {
      src: "assets/posters/the-guy-she-was-interested-in-wasnt-a-guy-at-all.jpg",
      updatedAt: "2026-09-07"
    },
    "chihara-san-is-she-a-landmine": {
      src: "assets/posters/chihara-san-is-she-a-landmine.jpg",
      updatedAt: "2026-09-07"
    },
    "arcanadea": {
      src: "assets/posters/arcanadea.jpg",
      updatedAt: "2026-09-07"
    },
    "marriage-toxin-season-2": {
      src: "assets/posters/marriage-toxin-season-2.jpg",
      updatedAt: "2026-09-07"
    },
    "eleceed": {
      src: "assets/posters/eleceed.jpg",
      updatedAt: "2026-09-07"
    },
    "lona": {
      src: "assets/posters/lona.jpg",
      updatedAt: "2026-09-07"
    },
    "kindergarten-wars": {
      src: "assets/posters/kindergarten-wars.jpg",
      updatedAt: "2026-09-07"
    },
    "free-fire-daybreak": {
      src: "assets/posters/free-fire-daybreak.jpg",
      updatedAt: "2026-09-07"
    },
    "midnight-heart-tune-season-2": {
      src: "assets/posters/midnight-heart-tune-season-2.webp",
      updatedAt: "2026-09-07"
    },
    "gate-season-2": {
      src: "assets/posters/gate-season-2.png",
      updatedAt: "2026-09-07"
    },
    "dark-gathering-season-2": {
      src: "assets/posters/dark-gathering-season-2.webp",
      updatedAt: "2026-09-07"
    },
    "berserk-of-gluttony-season-2": {
      src: "assets/posters/berserk-of-gluttony-season-2.webp",
      updatedAt: "2026-09-07"
    },
    "new-kochikame": {
      src: "assets/posters/new-kochikame.webp",
      updatedAt: "2026-09-07"
    },
    "haikyu-monsters-go-where": {
      src: "assets/posters/haikyu-monsters-go-where.jpg",
      updatedAt: "2026-09-07"
    },
    "red-riding-hood-detective-story": {
      src: "assets/posters/red-riding-hood-detective-story.jpg",
      updatedAt: "2026-09-07"
    },
    "seven-sleeping-beauties": {
      src: "assets/posters/seven-sleeping-beauties.jpg",
      updatedAt: "2026-09-07"
    },
    "fall-in-love-you-false-angels": {
      src: "assets/posters/fall-in-love-you-false-angels.jpg",
      updatedAt: "2026-09-07"
    },
    "the-strongest-magicmasters-retirement-plan": {
      src: "assets/posters/the-strongest-magicmasters-retirement-plan.jpg",
      updatedAt: "2026-09-07"
    },
    "nabe-ni-dangan": {
      src: "assets/posters/nabe-ni-dangan.webp",
      updatedAt: "2026-09-07"
    },
    "namidaame-to-serenade": {
      src: "assets/posters/namidaame-to-serenade.jpg",
      updatedAt: "2026-09-07"
    },
    "true-saint-banished-country-done-for": {
      src: "assets/posters/true-saint-banished-country-done-for.webp",
      updatedAt: "2026-09-07"
    },
    "studio-cabana": {
      src: "assets/posters/studio-cabana.webp",
      updatedAt: "2026-09-07"
    },
    "soara-and-the-house-of-monsters": {
      src: "assets/posters/soara-and-the-house-of-monsters.webp",
      updatedAt: "2026-09-07"
    },
    "dengeki-daisy": {
      src: "assets/posters/dengeki-daisy.jpg",
      updatedAt: "2026-09-07"
    },
    "magic-to-the-limit-reincarnated-elf": {
      src: "assets/posters/magic-to-the-limit-reincarnated-elf.webp",
      updatedAt: "2026-09-07"
    },
    "demons-are-plotting": {
      src: "assets/posters/demons-are-plotting.jpg",
      updatedAt: "2026-09-07"
    },
    "rebel-robotica": {
      src: "assets/posters/rebel-robotica.webp",
      updatedAt: "2026-09-07"
    },
    "beat-and-motion": {
      src: "assets/posters/beat-and-motion.jpg",
      updatedAt: "2026-09-07"
    },
    "unlucky-to-strongest-man": {
      src: "assets/posters/unlucky-to-strongest-man.jpg",
      updatedAt: "2026-09-07"
    },
    "maiden-blood": {
      src: "assets/posters/maiden-blood.jpg",
      updatedAt: "2026-09-07"
    },
    "hokuto-no-ken-fist-of-the-north-star-part-2": {
      src: "assets/posters/hokuto-no-ken-fist-of-the-north-star-part-2.jpg",
      updatedAt: "2026-09-07"
    },
    "unrewarded-villager-a": {
      src: "assets/posters/unrewarded-villager-a.avif",
      updatedAt: "2026-09-07"
    },
    "glasses-sometimes-yankee-kun": {
      src: "assets/posters/glasses-sometimes-yankee-kun.jpg",
      updatedAt: "2026-09-07"
    }
  };

  for (const anime of window.animeData) {
    const fix = fixes[anime.id];
    if (!fix) continue;
    anime.poster = { ...(anime.poster || {}), src: fix.src };
    anime.updatedAt = fix.updatedAt;
  }
})();
