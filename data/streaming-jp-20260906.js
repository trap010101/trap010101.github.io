// Japan previous-series streaming audit.
// Verified against direct streaming title/work pages on 2026-09-06, with targeted re-checks on 2026-09-13.
// Upcoming installments remain intentionally excluded by NewAnime policy.
(() => {
  if (typeof window.setAnimeStreamingForRegion !== "function") return;

  const dAnime = workId => `https://animestore.docomo.ne.jp/animestore/ci_pc?workId=${workId}`;

  const audit = {
    "sound-euphonium-the-final-movement-part-2": { danime: dAnime("20098"), unext: "https://www.video.unext.jp/title/SID0315530" },
    "jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage": { danime: dAnime("20495"), unext: "https://www.video.unext.jp/title/SID0013083" },
    "the-new-prince-of-tennis-u-17-world-cup-final-roster-selection": { danime: dAnime("24509"), unext: "https://www.video.unext.jp/title/SID0157073" },
    "the-apothecary-diaries-season-3-part-1": { danime: dAnime("26610"), unext: "https://www.video.unext.jp/title/SID0163357" },
    "ranma-1-2-season-3": { danime: dAnime("27655"), unext: "https://www.video.unext.jp/title/SID0167254" },
    "girls-und-panzer-das-finale-part-5": { danime: dAnime("20431"), unext: "https://www.video.unext.jp/title/SID0002511" },
    "bang-dream-ave-mujica-prima-aurora": { danime: dAnime("27572"), unext: "https://www.video.unext.jp/title/SID0163369" },
    "rascal-does-not-dream-of-a-dear-friend": { danime: dAnime("28053"), unext: "https://www.video.unext.jp/title/SID0200159" },
    "cyberpunk-edgerunners-2": { netflix: "https://www.netflix.com/jp/title/81054853" },
    "made-in-abyss-theatrical-series-part-1-the-awakening-mystery": { danime: dAnime("22458"), unext: "https://www.video.unext.jp/title/SID0070853" },
    "a-returners-magic-should-be-special-season-2": { danime: dAnime("26631"), unext: "https://www.video.unext.jp/title/SID0091741" },
    "tougen-anki-nikko-and-kegon-falls-arc": { danime: dAnime("28009"), unext: "https://www.video.unext.jp/title/SID0200165" },
    "tokyo-revengers-three-deities-war-arc": { danime: dAnime("24536"), unext: "https://www.video.unext.jp/title/SID0056138" },
    "black-clover-2nd-season": { danime: dAnime("25854"), unext: "https://www.video.unext.jp/title/SID0031251" },
    "the-iceblade-sorcerer-shall-rule-the-world-ii": { danime: dAnime("25965"), unext: "https://www.video.unext.jp/title/SID0076899" },
    "sasaki-and-peeps-season-2": { danime: dAnime("26811"), unext: "https://www.video.unext.jp/title/SID0096088" },
    "aoashi-season-2": { danime: dAnime("25328"), unext: "https://www.video.unext.jp/title/SID0066842" },
    "reincarnated-as-a-sword-ii": { danime: dAnime("26853"), unext: "https://www.video.unext.jp/title/SID0073132" },
    "chitose-is-in-the-ramune-bottle-part-2": { danime: dAnime("28352"), unext: "https://www.video.unext.jp/title/SID0232882" },
    "the-detective-is-already-dead-season-2": { danime: dAnime("24809"), unext: "https://www.video.unext.jp/title/SID0058467" },
    "blue-box-season-2": { danime: dAnime("27358"), unext: "https://www.video.unext.jp/title/SID0157094" },
    "magical-sisters-lulutto-lilly-part-2": {
      danime: dAnime("28824"),
      unext: "https://video.unext.jp/title/SID0285890",
      abema: "https://abema.tv/video/title/420-76"
    },
    "expelled-from-paradise-resonance-of-the-heart": { danime: dAnime("22718"), unext: "https://www.video.unext.jp/title/SID0027233" },
    "the-apothecary-diaries-the-late-consorts-secret-treasure": { danime: dAnime("26610"), unext: "https://www.video.unext.jp/title/SID0163357" },
    "monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre": { danime: dAnime("27567"), unext: "https://www.video.unext.jp/title/SID0125074" },
    "bang-dream-its-mygo-ave-mujica-sequel-series": { danime: dAnime("27572"), unext: "https://www.video.unext.jp/title/SID0163369" },
    "sakamoto-days-season-2": { danime: dAnime("27537"), unext: "https://www.video.unext.jp/title/SID0163171" },
    "everyday-host-new-series": { danime: dAnime("27877"), unext: "https://www.video.unext.jp/title/SID0181272" },
    "mashle-season-3-divine-visionary-final-exam-arc": { danime: dAnime("26297"), unext: "https://www.video.unext.jp/title/SID0079685" },
    "ramen-akaneko-part-two": { danime: dAnime("27230"), unext: "https://www.video.unext.jp/title/SID0104179" },
    "golden-kamuy-final-chapter-runaway-train-arc": { danime: dAnime("22772"), unext: "https://www.video.unext.jp/title/SID0035986" },
    "shangri-la-frontier-season-3": { danime: dAnime("26601"), unext: "https://www.video.unext.jp/title/SID0091715" },
    "akane-banashi-season-2": { danime: dAnime("28732"), unext: "https://www.video.unext.jp/title/SID0282792" },
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": { danime: dAnime("27594") },
    "medalist-the-movie": { danime: dAnime("27620"), unext: "https://www.video.unext.jp/title/SID0163336" },
    "skip-and-loafer-season-2": { danime: dAnime("26254"), unext: "https://www.video.unext.jp/title/SID0079938" },
    "the-apothecary-diaries-season-3-part-2": { danime: dAnime("26610"), unext: "https://www.video.unext.jp/title/SID0163357" },
    "delicious-in-dungeon-season-2": { danime: dAnime("26747"), unext: "https://www.video.unext.jp/title/SID0096083" },
    "frieren-beyond-journeys-end-season-3-golden-land-arc": { danime: dAnime("26609"), unext: "https://www.video.unext.jp/title/SID0091754" },
    "spice-and-wolf-merchant-meets-the-wise-wolf-season-2": { danime: dAnime("27063"), unext: "https://www.video.unext.jp/title/SID0100059" },
    "dan-da-dan-season-3": { danime: dAnime("27283"), unext: "https://www.video.unext.jp/title/SID0200132" },
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": { danime: dAnime("20525"), unext: "https://www.video.unext.jp/title/SID0100051" },
    "laid-back-camp-season-4": { danime: dAnime("21928"), unext: "https://www.video.unext.jp/title/SID0095777" },
    "the-dangers-in-my-heart-season-3": { danime: dAnime("27390"), unext: "https://www.video.unext.jp/title/SID0096010" },
    "oblivion-battery-season-2": { danime: dAnime("27004"), unext: "https://www.video.unext.jp/title/SID0100046" },
    "alya-sometimes-hides-her-feelings-in-russian-season-2": { danime: dAnime("27198"), unext: "https://www.video.unext.jp/title/SID0104147" },
    "one-punch-man-season-3-part-2": { danime: dAnime("22640"), unext: "https://www.video.unext.jp/title/SID0020051" },
    "the-rising-of-the-shield-hero-season-5": { danime: dAnime("22568"), unext: "https://www.video.unext.jp/title/SID0039229" },
    "fate-kaleid-liner-prisma-illya-finale": { danime: dAnime("11165"), unext: "https://www.video.unext.jp/title/SID0011858" },
    "haikyu-the-movie-vs-the-little-giant": { danime: dAnime("20140"), unext: "https://www.video.unext.jp/title/SID0045516" },
    "the-eminence-in-shadow-lost-echoes": { danime: dAnime("25786"), unext: "https://www.video.unext.jp/title/SID0073140" },
    "one-piece-film-god-valley": { unext: "https://video.unext.jp/title/SID0011124" },
    "the-worlds-finest-assassin-season-2": { danime: dAnime("25026"), unext: "https://www.video.unext.jp/title/SID0058466" },
    "be-forever-yamato-rebel3199-chapter-7-rainbow-reincarnation": { danime: dAnime("27252"), unext: "https://www.video.unext.jp/title/SID0301475" },
    "magical-girl-raising-project-restart": { danime: dAnime("21178"), unext: "https://www.video.unext.jp/title/SID0026837" },
    "armored-trooper-votoms-the-gray-witch-part-1": { danime: dAnime("20211") },
    "mobile-police-patlabor-ezy-file-3": { danime: dAnime("10363"), unext: "https://www.video.unext.jp/title/SID0312125" },
    "hokuto-no-ken-fist-of-the-north-star-part-2": { danime: dAnime("10480"), unext: "https://www.video.unext.jp/title/SID0013395" },
    "girls-und-panzer-motto-love-love-operation": { danime: dAnime("20431"), unext: "https://www.video.unext.jp/title/SID0002511" },
    "my-happy-marriage-special-2026": { danime: dAnime("26472"), unext: "https://www.video.unext.jp/title/SID0087610" },
    "takopis-original-sin-thank-you-see-you-tomorrow": { danime: dAnime("28000"), unext: "https://www.video.unext.jp/title/SID0196501" },
    "ice-wall-season-2": { netflix: "https://www.netflix.com/title/82031882" },
    "mission-yozakura-family-season-2-part-2": { danime: dAnime("27024"), unext: "https://www.video.unext.jp/title/SID0100044" },
    "dragon-ball-super-beerus": { danime: dAnime("21739"), unext: "https://www.video.unext.jp/title/SID0029410" },
    "hotel-inhumans-season-2": { unext: "https://www.video.unext.jp/title/SID0200151" },
    "marriage-toxin-season-2": { danime: dAnime("28839"), unext: "https://www.video.unext.jp/title/SID0285887" },
    "midnight-heart-tune-season-2": { unext: "https://www.video.unext.jp/title/SID0249080" },
    "gate-season-2": { unext: "https://www.video.unext.jp/title/SID0018898" },
    "new-kochikame": { danime: dAnime("20622"), unext: "https://www.video.unext.jp/title/SID0022028" },
    "duel-masters-lost-condemned-boy": { unext: "https://www.video.unext.jp/title/SID0157483" },
    "cardfight-vanguard-divinez-fate-star-war-arc": { unext: "https://www.video.unext.jp/title/SID0096699" },
    "with-vengeance-sincerely-your-broken-saintess-season-2": {
      prime: "https://www.primevideo.com/detail/0OUPW1VINFZH941AW52V1U5WFO",
      danime: dAnime("28029"),
      unext: "https://www.video.unext.jp/title/SID0200182"
    },
    "dark-gathering-season-2": { danime: dAnime("26513"), unext: "https://www.video.unext.jp/title/SID0087607" },
    "berserk-of-gluttony-season-2": { danime: dAnime("26620"), unext: "https://www.video.unext.jp/title/SID0091713" },
    "haikyu-monsters-go-where": { danime: dAnime("20140"), unext: "https://www.video.unext.jp/title/SID0045516" },
    "kaiju-no-8-narumis-weekday": { danime: dAnime("27039"), unext: "https://www.video.unext.jp/title/SID0100076" },
    "a-wild-last-boss-appeared-season-2": { danime: dAnime("28660"), unext: "https://www.video.unext.jp/title/SID0236478" },
    "ace-of-diamond-act-ii-second-season-part-2": { danime: dAnime("22678"), unext: "https://www.video.unext.jp/title/SID0040533" },
    "appraisal-skill-season-3": { danime: dAnime("26979"), unext: "https://www.video.unext.jp/title/SID0100082" }
  };

  for (const [animeId, previous] of Object.entries(audit)) {
    window.setAnimeStreamingForRegion(animeId, "jp", { previous });
  }

  window.streamingRegionalAuditMeta ||= {};
  window.streamingRegionalAuditMeta.jp = {
    verifiedAt: "2026-09-13",
    auditedTitles: Object.keys(audit).length,
    linkedTitles: Object.keys(audit).length,
    unresolvedAnimeIds: ["tiger-coming-in-2"]
  };
})();
