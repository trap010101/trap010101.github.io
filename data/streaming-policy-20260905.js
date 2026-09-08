// Upcoming titles are not treated as currently streamable.
// The Streaming button is reserved for verified catch-up links to earlier installments.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const verifiedPreviousStreaming = {
    "magical-sisters-lulutto-lilly-part-2": {
      watcha: "https://watcha.com/ko/contents/tEqZ5NY"
    },
    "ice-wall-season-2": {
      netflix: "https://www.netflix.com/title/82031882"
    },
    "mission-yozakura-family-season-2-part-2": {
      laftel: "https://laftel.net/item/42049"
    },
    "dragon-ball-super-beerus": {
      laftel: "https://laftel.net/item/25044"
    },
    "with-vengeance-sincerely-your-broken-saintess-season-2": {
      prime: "https://www.primevideo.com/detail/0OUPW1VINFZH941AW52V1U5WFO"
    },
    "dark-gathering-season-2": {
      laftel: "https://laftel.net/item/41524"
    },
    "kaiju-no-8-narumis-weekday": {
      laftel: "https://laftel.net/item/42047"
    },
    "girls-und-panzer-motto-love-love-operation": {
      laftel: "https://laftel.net/item/23062"
    },
    "my-happy-marriage-special-2026": {
      laftel: "https://laftel.net/item/41528"
    },
    "hotel-inhumans-season-2": {
      laftel: "https://laftel.net/item/42939"
    },
    "a-wild-last-boss-appeared-season-2": {
      laftel: "https://laftel.net/item/43402"
    },
    "ace-of-diamond-act-ii-second-season-part-2": {
      laftel: "https://laftel.net/item/45434"
    },
    "appraisal-skill-season-3": {
      laftel: "https://laftel.net/item/42415"
    },
    "marriage-toxin-season-2": {
      laftel: "https://laftel.net/item/45469"
    },
    "midnight-heart-tune-season-2": {
      laftel: "https://laftel.net/item/44233"
    },
    "berserk-of-gluttony-season-2": {
      laftel: "https://laftel.net/item/41720"
    },
    "haikyu-monsters-go-where": {
      laftel: "https://laftel.net/item/23661"
    }
  };

  window.animeData.forEach(anime => {
    const previousStreaming = {
      ...(anime?.previousStreaming && typeof anime.previousStreaming === "object"
        ? anime.previousStreaming
        : {}),
      ...(verifiedPreviousStreaming[anime.id] || {})
    };

    anime.previousStreaming = previousStreaming;

    // Never expose links as streaming destinations for the upcoming installment.
    anime.currentStreaming = {};
    anime.streaming = { ...previousStreaming };

    // Keep the regional foundation synchronized with the Korean-first homepage contract.
    if (anime.streamingByRegion?.kr) {
      anime.streamingByRegion.kr = {
        current: {},
        previous: { ...previousStreaming }
      };
      anime.currentStreamingByRegion ||= {};
      anime.previousStreamingByRegion ||= {};
      anime.currentStreamingByRegion.kr = anime.streamingByRegion.kr.current;
      anime.previousStreamingByRegion.kr = anime.streamingByRegion.kr.previous;
    }

    if (anime.links) {
      anime.links.streaming = null;
    }
  });

  const luluttoLilly = window.animeData.find(item => item.id === "magical-sisters-lulutto-lilly-part-2");
  if (luluttoLilly) {
    luluttoLilly.verification ||= { verifiedAt: "2026-09-07", sources: [] };
    luluttoLilly.verification.sources ||= [];

    const watchaUrl = verifiedPreviousStreaming["magical-sisters-lulutto-lilly-part-2"].watcha;
    if (!luluttoLilly.verification.sources.some(source => source?.url === watchaUrl)) {
      luluttoLilly.verification.sources.push({
        type: "streaming-platform",
        url: watchaUrl,
        label: "WATCHA — previous cour",
        supports: ["previous-streaming"],
        verifiedAt: "2026-09-07"
      });
    }
    luluttoLilly.verification.verifiedAt = "2026-09-07";
  }
})();
