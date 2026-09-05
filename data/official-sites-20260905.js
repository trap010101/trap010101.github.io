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
