// United States previous-series streaming audit.
// Verified against direct streaming pages and current US availability evidence on 2026-09-06.
// Upcoming installments remain intentionally excluded by NewAnime policy.
(() => {
  if (typeof window.setAnimeStreamingForRegion !== "function") return;

  const audit = {
    "sound-euphonium-the-final-movement-part-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GRDQNQW9Y/sound-euphonium"
    },
    "jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage": {
      crunchyroll: "https://www.crunchyroll.com/series/GYP8DP1MY/jojos-bizarre-adventure"
    },
    "the-new-prince-of-tennis-u-17-world-cup-final-roster-selection": {
      crunchyroll: "https://www.crunchyroll.com/series/G65VP3106/the-prince-of-tennis-ii"
    },
    "the-apothecary-diaries-season-3-part-1": {
      crunchyroll: "https://www.crunchyroll.com/series/G3KHEVDJ7/the-apothecary-diaries"
    },
    "ranma-1-2-season-3": {
      netflix: "https://www.netflix.com/title/81171925"
    },
    "girls-und-panzer-das-finale-part-5": {
      hidive: "https://www.hidive.com/tv/girls-und-panzer"
    },
    "bang-dream-ave-mujica-prima-aurora": {
      crunchyroll: "https://www.crunchyroll.com/series/G0XHWM11X/ave-mujica---the-die-is-cast"
    },
    "rascal-does-not-dream-of-a-dear-friend": {
      crunchyroll: "https://www.crunchyroll.com/series/GYW4MG9G6"
    },
    "cyberpunk-edgerunners-2": {
      netflix: "https://www.netflix.com/title/81054853"
    },
    "made-in-abyss-theatrical-series-part-1-the-awakening-mystery": {
      hidive: "https://www.hidive.com/tv/made-in-abyss"
    },
    "a-returners-magic-should-be-special-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GEXH3W207/a-returners-magic-should-be-special"
    },
    "tougen-anki-nikko-and-kegon-falls-arc": {
      crunchyroll: "https://www.crunchyroll.com/series/GP5HJ84D2/tougen-anki"
    },
    "tokyo-revengers-three-deities-war-arc": {
      hulu_us: "https://www.hulu.com/series/tokyo-revengers-1a195a35-e19c-4e36-b609-3b1c451f6ce4"
    },
    "black-clover-2nd-season": {
      crunchyroll: "https://www.crunchyroll.com/series/GRE50KV36/black-clover"
    },
    "the-iceblade-sorcerer-shall-rule-the-world-ii": {
      prime: "https://www.primevideo.com/detail/0PSZZ48DV17ZKGJ3NBESJHAF85"
    },
    "sasaki-and-peeps-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G5PHNM935/sasaki-and-peeps"
    },
    "aoashi-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G4PH0WX5J/aoashi"
    },
    "reincarnated-as-a-sword-ii": {
      hulu_us: "https://www.hulu.com/series/reincarnated-as-a-sword-200a141e-df62-4506-a7dc-d9fae32c12d5"
    },
    "chitose-is-in-the-ramune-bottle-part-2": {
      crunchyroll: "https://www.crunchyroll.com/watch/GE00364785JAJP/the-hazy-spring-moon-above"
    },
    "the-detective-is-already-dead-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G24H1N334/the-detective-is-already-dead"
    },
    "blue-box-season-2": {
      netflix: "https://www.netflix.com/title/81663323"
    },
    "the-apothecary-diaries-the-late-consorts-secret-treasure": {
      crunchyroll: "https://www.crunchyroll.com/series/G3KHEVDJ7/the-apothecary-diaries"
    },
    "monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre": {
      crunchyroll: "https://www.crunchyroll.com/series/GNVHKN9W2/monogatari-series-off--monster-season"
    },
    "bang-dream-its-mygo-ave-mujica-sequel-series": {
      crunchyroll: "https://www.crunchyroll.com/series/G0XHWM11X/ave-mujica---the-die-is-cast"
    },
    "sakamoto-days-season-2": {
      netflix: "https://www.netflix.com/title/81663325"
    },
    "mashle-season-3-divine-visionary-final-exam-arc": {
      crunchyroll: "https://www.crunchyroll.com/series/GDKHZEP8W/mashle-magic-and-muscles"
    },
    "ramen-akaneko-part-two": {
      crunchyroll: "https://www.crunchyroll.com/series/GVDHX85ZN/ramen-akaneko"
    },
    "golden-kamuy-final-chapter-runaway-train-arc": {
      crunchyroll: "https://www.crunchyroll.com/series/GY8DWQN5Y/golden-kamuy"
    },
    "shangri-la-frontier-season-3": {
      crunchyroll: "https://www.crunchyroll.com/series/G79H23Z8P/shangri-la-frontier"
    },
    "akane-banashi-season-2": {
      netflix: "https://www.netflix.com/title/82701514"
    },
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G4PH0WJJG/medaka-kuroiwa-is-impervious-to-my-charms"
    },
    "medalist-the-movie": {
      hulu_us: "https://www.hulu.com/series/medalist-bb33d0c2-b077-4bc0-a549-d2ca27d4afa8"
    },
    "skip-and-loafer-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G9VHN9185/skip-and-loafer"
    },
    "the-apothecary-diaries-season-3-part-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G3KHEVDJ7/the-apothecary-diaries"
    },
    "delicious-in-dungeon-season-2": {
      netflix: "https://www.netflix.com/title/81564899"
    },
    "frieren-beyond-journeys-end-season-3-golden-land-arc": {
      crunchyroll: "https://www.crunchyroll.com/series/GG5H5XQX4/frieren-beyond-journeys-end"
    },
    "spice-and-wolf-merchant-meets-the-wise-wolf-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G1XHJV08M/spice-and-wolf-merchant-meets-the-wise-wolf"
    },
    "dan-da-dan-season-3": {
      crunchyroll: "https://www.crunchyroll.com/series/GG5H5XQ0D"
    },
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": {
      crunchyroll: "https://www.crunchyroll.com/series/GYE5K3GQR/konosuba--gods-blessing-on-this-wonderful-world"
    },
    "laid-back-camp-season-4": {
      crunchyroll: "https://www.crunchyroll.com/series/GRWEW95KR/laid-back-camp"
    },
    "the-dangers-in-my-heart-season-3": {
      hidive: "https://www.hidive.com/tv/the-dangers-in-my-heart"
    },
    "oblivion-battery-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GXJHM3GDX/oblivion-battery"
    },
    "alya-sometimes-hides-her-feelings-in-russian-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G1XHJV0XM/alya-sometimes-hides-her-feelings-in-russian"
    },
    "one-punch-man-season-3-part-2": {
      hulu_us: "https://www.hulu.com/series/one-punch-man-54a25fcf-a472-4d40-9968-13e2957e5abf"
    },
    "the-rising-of-the-shield-hero-season-5": {
      crunchyroll: "https://www.crunchyroll.com/series/G6W4QKX0R/the-rising-of-the-shield-hero"
    },
    "fate-kaleid-liner-prisma-illya-finale": {
      hidive: "https://www.hidive.com/tv/fate-kaleid-liner-prisma-illya"
    },
    "haikyu-the-movie-vs-the-little-giant": {
      crunchyroll: "https://www.crunchyroll.com/series/GY8VM8MWY/haikyu"
    },
    "the-eminence-in-shadow-lost-echoes": {
      hulu_us: "https://www.hulu.com/series/the-eminence-in-shadow-66f37cf4-dba5-4511-ae26-e4092df1668b"
    },
    "one-piece-film-god-valley": {
      crunchyroll: "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece"
    },
    "magical-girl-raising-project-restart": {
      crunchyroll: "https://www.crunchyroll.com/series/GRQ4MKN4Y/magical-girl-raising-project"
    },
    "the-worlds-finest-assassin-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GMEHME55K/the-worlds-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat"
    },
    "ice-wall-season-2": {
      netflix: "https://www.netflix.com/title/82031882"
    },
    "mission-yozakura-family-season-2-part-2": {
      hulu_us: "https://www.hulu.com/series/mission-yozakura-family-ac689bea-f955-4d95-8693-7b87b5a309cb"
    },
    "with-vengeance-sincerely-your-broken-saintess-season-2": {
      prime: "https://www.primevideo.com/detail/0OUPW1VINFZH941AW52V1U5WFO"
    },
    "gate-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GRGG9PN7R/gate"
    },
    "berserk-of-gluttony-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/G1XHJV05V/berserk-of-gluttony"
    },
    "haikyu-monsters-go-where": {
      crunchyroll: "https://www.crunchyroll.com/series/GY8VM8MWY/haikyu"
    },
    "kaiju-no-8-narumis-weekday": {
      crunchyroll: "https://www.crunchyroll.com/series/GG5H5XQ7D/kaiju-no-8"
    },
    "hotel-inhumans-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GXJHM3G08/hotel-inhumans"
    },
    "a-wild-last-boss-appeared-season-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GT00361955/a-wild-last-boss-appeared"
    },
    "ace-of-diamond-act-ii-second-season-part-2": {
      crunchyroll: "https://www.crunchyroll.com/series/GYX0MZ58R/ace-of-the-diamond"
    },
    "appraisal-skill-season-3": {
      crunchyroll: "https://www.crunchyroll.com/series/GG5H5XQMD/as-a-reincarnated-aristocrat-ill-use-my-appraisal-skill-to-rise-in-the-world"
    }
  };

  for (const [animeId, previous] of Object.entries(audit)) {
    window.setAnimeStreamingForRegion(animeId, "us", { previous });
  }

  window.streamingRegionalAuditMeta ||= {};
  window.streamingRegionalAuditMeta.us = {
    verifiedAt: "2026-09-06",
    auditedTitles: 53,
    linkedTitles: Object.keys(audit).length,
    unresolvedAnimeIds: [
      "expelled-from-paradise-resonance-of-the-heart",
      "tiger-coming-in-2",
      "everyday-host-new-series"
    ]
  };
})();
