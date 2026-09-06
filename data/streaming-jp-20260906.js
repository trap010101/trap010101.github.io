// Japan previous-series streaming audit.
// Verified against direct streaming title/work pages on 2026-09-06.
// Upcoming installments remain intentionally excluded by NewAnime policy.
(() => {
  if (typeof window.setAnimeStreamingForRegion !== "function") return;

  const dAnime = workId => `https://animestore.docomo.ne.jp/animestore/ci_pc?workId=${workId}`;

  const audit = {
    "sound-euphonium-the-final-movement-part-2": { danime: dAnime("20098") },
    "jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage": { danime: dAnime("20495") },
    "the-new-prince-of-tennis-u-17-world-cup-final-roster-selection": { danime: dAnime("24509") },
    "the-apothecary-diaries-season-3-part-1": { danime: dAnime("26610") },
    "ranma-1-2-season-3": { danime: dAnime("27655") },
    "girls-und-panzer-das-finale-part-5": { danime: dAnime("20431") },
    "bang-dream-ave-mujica-prima-aurora": { danime: dAnime("27572") },
    "rascal-does-not-dream-of-a-dear-friend": { danime: dAnime("28053") },
    "cyberpunk-edgerunners-2": { netflix: "https://www.netflix.com/jp/title/81054853" },
    "made-in-abyss-theatrical-series-part-1-the-awakening-mystery": { danime: dAnime("22458") },
    "a-returners-magic-should-be-special-season-2": { danime: dAnime("26631") },
    "tougen-anki-nikko-and-kegon-falls-arc": { danime: dAnime("28009") },
    "tokyo-revengers-three-deities-war-arc": { danime: dAnime("24536") },
    "black-clover-2nd-season": { danime: dAnime("25854") },
    "the-iceblade-sorcerer-shall-rule-the-world-ii": { danime: dAnime("25965") },
    "sasaki-and-peeps-season-2": { danime: dAnime("26811") },
    "aoashi-season-2": { danime: dAnime("25328") },
    "reincarnated-as-a-sword-ii": { danime: dAnime("26853") },
    "chitose-is-in-the-ramune-bottle-part-2": { danime: dAnime("28352") },
    "the-detective-is-already-dead-season-2": { danime: dAnime("24809") },
    "blue-box-season-2": { danime: dAnime("27358") },
    "expelled-from-paradise-resonance-of-the-heart": { danime: dAnime("22718") },
    "the-apothecary-diaries-the-late-consorts-secret-treasure": { danime: dAnime("26610") },
    "monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre": { danime: dAnime("27567") },
    "bang-dream-its-mygo-ave-mujica-sequel-series": { danime: dAnime("27572") },
    "sakamoto-days-season-2": { danime: dAnime("27537") },
    "everyday-host-new-series": { danime: dAnime("27877") },
    "mashle-season-3-divine-visionary-final-exam-arc": { danime: dAnime("26297") },
    "ramen-akaneko-part-two": { danime: dAnime("27230") },
    "golden-kamuy-final-chapter-runaway-train-arc": { danime: dAnime("22772") },
    "shangri-la-frontier-season-3": { danime: dAnime("26601") },
    "akane-banashi-season-2": { danime: dAnime("28732") },
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": { danime: dAnime("27594") },
    "medalist-the-movie": { danime: dAnime("27620") },
    "skip-and-loafer-season-2": { danime: dAnime("26254") },
    "the-apothecary-diaries-season-3-part-2": { danime: dAnime("26610") },
    "delicious-in-dungeon-season-2": { danime: dAnime("26747") },
    "frieren-beyond-journeys-end-season-3-golden-land-arc": { danime: dAnime("26609") },
    "spice-and-wolf-merchant-meets-the-wise-wolf-season-2": { danime: dAnime("27063") },
    "dan-da-dan-season-3": { danime: dAnime("27283") },
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": { danime: dAnime("20525") },
    "laid-back-camp-season-4": { danime: dAnime("21928") },
    "the-dangers-in-my-heart-season-3": { danime: dAnime("27390") },
    "oblivion-battery-season-2": { danime: dAnime("27004") },
    "alya-sometimes-hides-her-feelings-in-russian-season-2": { danime: dAnime("27198") },
    "one-punch-man-season-3-part-2": { danime: dAnime("22640") },
    "the-rising-of-the-shield-hero-season-5": { danime: dAnime("22568") },
    "fate-kaleid-liner-prisma-illya-finale": { danime: dAnime("11165") },
    "haikyu-the-movie-vs-the-little-giant": { danime: dAnime("20140") },
    "the-eminence-in-shadow-lost-echoes": { danime: dAnime("25786") },
    "one-piece-film-god-valley": { unext: "https://video.unext.jp/title/SID0011124" },
    "the-worlds-finest-assassin-season-2": { danime: dAnime("25026") }
  };

  for (const [animeId, previous] of Object.entries(audit)) {
    window.setAnimeStreamingForRegion(animeId, "jp", { previous });
  }

  window.streamingRegionalAuditMeta ||= {};
  window.streamingRegionalAuditMeta.jp = {
    verifiedAt: "2026-09-06",
    auditedTitles: 53,
    linkedTitles: Object.keys(audit).length,
    unresolvedAnimeIds: ["tiger-coming-in-2"]
  };
})();
