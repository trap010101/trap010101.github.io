// Upcoming titles are not treated as currently streamable.
// The Streaming button is reserved for verified catch-up links to earlier installments.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const auditDate = "2026-09-10";

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
    "with-vengeance-sincerely-your-broken-saintess-season-2": {
      prime: "https://www.primevideo.com/detail/0OUPW1VINFZH941AW52V1U5WFO"
    },
    "kaiju-no-8-narumis-weekday": {
      laftel: "https://laftel.net/item/42047"
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
    },

    // Korean-region catch-up audit, verified again on 2026-09-10.
    "maebashi-witches-emoemories": {
      laftel: "https://laftel.net/item/42780"
    },
    "takopis-original-sin-thank-you-see-you-tomorrow": {
      laftel: "https://laftel.net/item/42947"
    },
    "dark-gathering-season-2": {
      watcha: "https://watcha.com/ko/contents/tE0mdAy"
    },
    "gate-season-2": {
      watcha: "https://watcha.com/ko/contents/tR2gdvD"
    },
    "mobile-police-patlabor-ezy-file-3": {
      watcha: "https://watcha.com/ko/contents/tEZYNOl"
    },
    "magical-girl-raising-project-restart": {
      watcha: "https://watcha.com/ko-KR/contents/tP8kB3R"
    },
    "girls-und-panzer-motto-love-love-operation": {
      netflix: "https://www.netflix.com/kr/title/80205232"
    },
    "new-kochikame": {
      watcha: "https://watcha.com/ko/contents/tRzzWQR"
    },
    "dragon-ball-super-beerus": {
      watcha: "https://watcha.com/ko/contents/tR2Y6vE"
    },
    "be-forever-yamato-rebel3199-chapter-7-rainbow-reincarnation": {
      prime: "https://www.primevideo.com/-/ko/detail/0HT1XEEEQIKKWXFEC473NDA3OS"
    },
    "armored-trooper-votoms-the-gray-witch-part-1": {
      watcha: "https://watcha.com/ko/contents/tR2zvvR"
    },
    "duel-masters-lost-condemned-boy": {
      prime: "https://www.primevideo.com/-/ko/detail/0G7IJBXYGKNPMJ6WY41YLM2DBB"
    }
  };

  // Direct official PVs confirmed after the September 5 audit.
  // These are title/rightsholder channels or direct videos cited by official title/publisher pages.
  const verifiedPvUpdates = {
    "ice-wall-season-2": [
      { label: { ko: "2기 결정 PV", ja: "第2期決定PV", en: "Season 2 Announcement PV" }, url: "https://www.youtube.com/watch?v=7OHlkGNvEAE" }
    ],
    "arcanadea": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=sS9vinZEljw" }
    ],
    "eleceed": [
      { label: { ko: "메인 PV 1탄", ja: "メインPV第1弾", en: "Main PV #1" }, url: "https://www.youtube.com/watch?v=-Vqya5QAqpc" }
    ],
    "kindergarten-wars": [
      { label: { ko: "애니메이션화 결정 PV", ja: "アニメ化決定PV", en: "Anime Announcement PV" }, url: "https://www.youtube.com/watch?v=jee6QLmJ2mU" }
    ],
    "red-riding-hood-detective-story": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=547dTuVUBh4" }
    ],
    "new-kochikame": [
      { label: { ko: "캐릭터 보이스 PV", ja: "キャラクターボイスPV", en: "Character Voice PV" }, url: "https://www.youtube.com/watch?v=hFxEBaTxkX0" }
    ],
    "hokuto-no-ken-fist-of-the-north-star-part-2": [
      { label: { ko: "제2쿨 공개 영상", ja: "第2クール解禁映像", en: "Part 2 Reveal Video" }, url: "https://www.youtube.com/watch?v=zBc0oFYivr4" }
    ],
    "beat-and-motion": [
      { label: { ko: "공식 트레일러", ja: "公式トレーラー", en: "Official Trailer" }, url: "https://www.youtube.com/watch?v=L1NnZectDzY" }
    ],
    "unlucky-to-strongest-man": [
      { label: { ko: "이미지 PV", ja: "イメージPV", en: "Image PV" }, url: "https://www.youtube.com/watch?v=bFi74B3n80o" }
    ],
    "my-happy-marriage-special-2026": [
      { label: { ko: "특별편 티저 PV", ja: "特別篇ティザーPV", en: "Special Episode Teaser PV" }, url: "https://www.youtube.com/watch?v=dXeAqvXkSUM" }
    ],
    "rebel-robotica": [
      { label: { ko: "PV", ja: "PV", en: "PV" }, url: "https://www.youtube.com/watch?v=vO08c2n5fUY" }
    ],
    "free-fire-daybreak": [
      { label: { ko: "공식 PV", ja: "公式PV", en: "Official PV" }, url: "https://www.youtube.com/watch?v=7M4HJfo8YxU" }
    ],
    "gate-season-2": [
      { label: { ko: "PV 1탄", ja: "第1弾PV", en: "PV #1" }, url: "https://www.youtube.com/watch?v=2P40hX1vK1E" }
    ],
    "cardfight-vanguard-divinez-fate-star-war-arc": [
      { label: { ko: "시리즈 완결편 PV", ja: "シリーズ完結編PV", en: "Series Finale PV" }, url: "https://www.youtube.com/watch?v=zxgmRfemSMI" }
    ],
    "maebashi-witches-emoemories": [
      { label: { ko: "극장판 본예고", ja: "劇場版本予告", en: "Movie Main Trailer" }, url: "https://www.youtube.com/watch?v=txDov2HH7xM" }
    ],
    "inherit-the-winds-the-beginning": [
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=RWUIMxHyNoM" }
    ]
  };

  const streamingLabels = {
    netflix: "Netflix",
    laftel: "Laftel",
    prime: "Prime Video",
    watcha: "WATCHA"
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

    const pvAdditions = verifiedPvUpdates[anime.id] || [];
    if (pvAdditions.length) {
      const existing = Array.isArray(anime.pvs) ? anime.pvs : [];
      const seen = new Set();
      anime.pvs = [...pvAdditions, ...existing].filter(entry => {
        if (!entry?.url || seen.has(entry.url)) return false;
        seen.add(entry.url);
        return true;
      });
      anime.links ||= {};
      anime.links.pv = anime.pvs[0]?.url || null;
    }

    const auditedStreaming = verifiedPreviousStreaming[anime.id];
    if (auditedStreaming || pvAdditions.length) {
      anime.verification ||= { verifiedAt: auditDate, sources: [] };
      anime.verification.sources = Array.isArray(anime.verification.sources) ? anime.verification.sources : [];

      if (auditedStreaming) {
        Object.entries(auditedStreaming).forEach(([platform, url]) => {
          if (anime.verification.sources.some(source => source?.url === url)) return;
          anime.verification.sources.push({
            type: "streaming-platform",
            url,
            label: `${streamingLabels[platform] || platform} — previous series`,
            supports: ["previous-streaming"],
            verifiedAt: auditDate
          });
        });
      }

      pvAdditions.forEach(entry => {
        if (anime.verification.sources.some(source => source?.url === entry.url)) return;
        anime.verification.sources.push({
          type: "official-youtube",
          url: entry.url,
          label: `Official YouTube — ${entry.label?.en || "PV"}`,
          supports: ["pv"],
          verifiedAt: auditDate
        });
      });

      anime.verification.verifiedAt = auditDate;
      anime.updatedAt = auditDate;
    }
  });
})();

// 2026-09-10 follow-up official PV audit
(() => {
  if (!Array.isArray(window.animeData)) return;
  const updates = {
  "tenkaichi-the-greatest-warrior-under-the-rising-sun": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=-TzkokU9NpY"
    }
  ],
  "the-guy-she-was-interested-in-wasnt-a-guy-at-all": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=qWJo5abhQ08"
    }
  ],
  "the-strongest-magicmasters-retirement-plan": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=nEnxKwK3UlY"
    }
  ],
  "soara-and-the-house-of-monsters": [
    {
      "label": {
        "ko": "울트라 티저 PV",
        "ja": "ウルトラティザーPV",
        "en": "Ultra Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=3XfUJwvfVq8"
    }
  ],
  "dengeki-daisy": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=Xjko6DPoACU"
    }
  ],
  "fall-in-love-you-false-angels": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=3OCNfYqUNlQ"
    }
  ],
  "magic-to-the-limit-reincarnated-elf": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=7AJmItoJgoM"
    }
  ],
  "glasses-sometimes-yankee-kun": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=qHM5FvelBxM"
    }
  ],
  "lona": [
    {
      "label": {
        "ko": "티저 PV",
        "ja": "ティザーPV",
        "en": "Teaser PV"
      },
      "url": "https://www.youtube.com/watch?v=zuhk83AZq2o"
    }
  ],
  "we-are-aliens": [
    {
      "label": {
        "ko": "본예고",
        "ja": "本予告",
        "en": "Main Trailer"
      },
      "url": "https://www.youtube.com/watch?v=0nk-AWBxZPc"
    }
  ],
  "takopis-original-sin-thank-you-see-you-tomorrow": [
    {
      "label": {
        "ko": "스페셜 영상",
        "ja": "スペシャル映像",
        "en": "Special Video"
      },
      "url": "https://www.youtube.com/watch?v=F0pqUWNrTXI"
    }
  ],
  "hotel-inhumans-season-2": [
    {
      "label": {
        "ko": "2기 본 PV",
        "ja": "第2期 本PV",
        "en": "Season 2 Main PV"
      },
      "url": "https://www.youtube.com/watch?v=JxeA37qVwnc"
    }
  ],
  "beat-and-motion": [
    {
      "label": {
        "ko": "PV 1탄",
        "ja": "第1弾PV",
        "en": "PV #1"
      },
      "url": "https://www.youtube.com/watch?v=NMSPJoELxw4"
    }
  ]
};
  const auditDate = '2026-09-10';
  window.animeData.forEach(anime => {
    const next = updates[anime.id];
    if (!next?.length) return;
    const existing = Array.isArray(anime.pvs) ? anime.pvs : [];
    const seen = new Set();
    anime.pvs = [...next, ...existing].filter(entry => {
      if (!entry?.url || seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });
    anime.links ||= {};
    anime.links.pv = anime.pvs[0]?.url || null;
    anime.verification ||= { verifiedAt:auditDate, sources:[] };
    anime.verification.sources = Array.isArray(anime.verification.sources) ? anime.verification.sources : [];
    next.forEach(entry => {
      if (anime.verification.sources.some(source => source?.url === entry.url)) return;
      anime.verification.sources.push({
        type:'official-youtube',
        url:entry.url,
        label:`Official YouTube — ${entry.label?.en || 'PV'}`,
        supports:['pv'],
        verifiedAt:auditDate
      });
    });
    anime.verification.verifiedAt = auditDate;
    anime.updatedAt = auditDate;
  });
})();
