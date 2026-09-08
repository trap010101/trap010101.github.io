// Korean previous-series streaming links verified against direct playable title pages.
(() => {
  if (typeof window.setAnimeStreamingForRegion !== "function") return;

  const audit = {
    "maebashi-witches-emoemories": {
      laftel: "https://laftel.net/item/42780"
    },
    "takopis-original-sin-thank-you-see-you-tomorrow": {
      laftel: "https://laftel.net/item/42947"
    }
  };

  for (const [animeId, previous] of Object.entries(audit)) {
    window.setAnimeStreamingForRegion(animeId, "kr", { previous });
  }
})();
