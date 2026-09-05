// Streaming platform presentation metadata and runtime data policy.
// Keep current-installment streaming separate from previous-series catch-up links.
(() => {
  const directServiceMatchers = {
    netflix: url => url.hostname.endsWith("netflix.com") && url.pathname.includes("/title/"),
    laftel: url => url.hostname.endsWith("laftel.net") && url.pathname.includes("/item/"),
    disney: url => url.hostname.endsWith("disneyplus.com") && url.pathname.includes("/browse/entity-"),
    prime: url => url.hostname.endsWith("primevideo.com") && url.pathname.includes("/detail/"),
    crunchyroll: url => url.hostname.endsWith("crunchyroll.com") && url.pathname.includes("/series/"),
    tving: url => url.hostname.endsWith("tving.com") && url.pathname.includes("/contents/"),
    watcha: url => url.hostname.endsWith("watcha.com") && url.pathname.includes("/contents/"),
    youtube: url =>
      (url.hostname === "youtube.com" || url.hostname.endsWith(".youtube.com")) &&
      url.pathname === "/playlist" &&
      url.searchParams.has("list")
  };

  const isDirectServiceUrl = (platformId, value) => {
    const matcher = directServiceMatchers[platformId];
    if (!matcher || !value) return false;
    try {
      return matcher(new URL(value));
    } catch (_) {
      return false;
    }
  };

  const filterDirectServiceLinks = links => Object.fromEntries(
    Object.entries(links || {}).filter(([platformId, url]) => isDirectServiceUrl(platformId, url))
  );

  // Current-installment platform confirmations that live outside the older verification payload.
  const confirmedDirectOverrides = {
    "ranma-1-2-season-3": {
      netflix: "https://www.netflix.com/kr/title/81171925"
    },
    "blue-box-season-2": {
      netflix: "https://www.netflix.com/kr/title/81663323"
    },
    "sakamoto-days-season-2": {
      netflix: "https://www.netflix.com/kr-en/title/81663325"
    }
  };

  // Explicit catch-up destinations for earlier installments, audited for 2026-09-05.
  // These must never be inferred from, or exposed as confirmation for, the upcoming installment.
  const previousSeriesOverrides = {
    "sound-euphonium-the-final-movement-part-2": {
      laftel: "https://laftel.net/item/42050"
    },
    "jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage": {
      netflix: "https://www.netflix.com/kr/title/82116553"
    },
    "the-new-prince-of-tennis-u-17-world-cup-final-roster-selection": {
      laftel: "https://laftel.net/item/42413"
    },
    "the-apothecary-diaries-season-3-part-1": {
      netflix: "https://www.netflix.com/kr/title/81712068"
    },
    "ranma-1-2-season-3": {
      netflix: "https://www.netflix.com/kr/title/81171925"
    },
    "girls-und-panzer-das-finale-part-5": {
      laftel: "https://laftel.net/item/41941"
    },
    "bang-dream-ave-mujica-prima-aurora": {
      laftel: "https://laftel.net/item/42656",
      tving: "https://www.tving.com/contents/P001766479",
      watcha: "https://watcha.com/ko/contents/tPVdbX4"
    },
    "rascal-does-not-dream-of-a-dear-friend": {
      laftel: "https://laftel.net/item/42927"
    },
    "cyberpunk-edgerunners-2": {
      netflix: "https://www.netflix.com/kr/title/81054853"
    },
    "made-in-abyss-theatrical-series-part-1-the-awakening-mystery": {
      tving: "https://www.tving.com/contents/P001668113"
    },
    "a-returners-magic-should-be-special-season-2": {
      netflix: "https://www.netflix.com/kr/title/81726466",
      tving: "https://www.tving.com/contents/E004115538"
    },
    "tougen-anki-nikko-and-kegon-falls-arc": {
      tving: "https://www.tving.com/contents/P001773985"
    },
    "tokyo-revengers-three-deities-war-arc": {
      disney: "https://www.disneyplus.com/ko-kr/browse/entity-be391742-6617-42ad-b53a-be368ee73335",
      watcha: "https://watcha.com/ko/contents/tRMxXK0"
    },
    "black-clover-2nd-season": {
      netflix: "https://www.netflix.com/kr/title/80238012"
    },
    "the-iceblade-sorcerer-shall-rule-the-world-ii": {
      prime: "https://www.primevideo.com/-/ko/detail/0PSZZ48DV17ZKGJ3NBESJHAF85"
    },
    "sasaki-and-peeps-season-2": {
      netflix: "https://www.netflix.com/kr/title/81768306",
      tving: "https://www.tving.com/contents/P001756336"
    },
    "aoashi-season-2": {
      disney: "https://www.disneyplus.com/ko-kr/browse/entity-f94bf091-b30d-43ca-ba1e-548ccb28e19b"
    },
    "reincarnated-as-a-sword-ii": {
      prime: "https://www.primevideo.com/-/ko/detail/0SMRJS9YUTPHZO3CHCX2OX9AIX"
    },
    "chitose-is-in-the-ramune-bottle-part-2": {
      tving: "https://www.tving.com/contents/P001781694",
      watcha: "https://watcha.com/ko/contents/tR2eraW"
    },
    "the-detective-is-already-dead-season-2": {
      laftel: "https://laftel.net/item/40387",
      tving: "https://www.tving.com/contents/P001518955",
      watcha: "https://watcha.com/ko/contents/tPvbdn5"
    },
    "blue-box-season-2": {
      netflix: "https://www.netflix.com/kr/title/81663323"
    },
    "expelled-from-paradise-resonance-of-the-heart": {
      laftel: "https://laftel.net/item/23251"
    },
    "tiger-coming-in-2": {
      laftel: "https://laftel.net/item/42320"
    },
    "the-apothecary-diaries-the-late-consorts-secret-treasure": {
      netflix: "https://www.netflix.com/kr/title/81712068"
    },
    "monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre": {
      laftel: "https://laftel.net/item/42250",
      tving: "https://www.tving.com/contents/P001758881"
    },
    "bang-dream-its-mygo-ave-mujica-sequel-series": {
      laftel: "https://laftel.net/item/42656",
      tving: "https://www.tving.com/contents/P001766479",
      watcha: "https://watcha.com/ko/contents/tPVdbX4"
    },
    "sakamoto-days-season-2": {
      netflix: "https://www.netflix.com/kr/title/81663325"
    },
    "everyday-host-new-series": {
      youtube: "https://www.youtube.com/playlist?list=PLdG_RubOZ595dlvlqnACqPvod-f34uTkM"
    },
    "mashle-season-3-divine-visionary-final-exam-arc": {
      laftel: "https://laftel.net/item/41854",
      prime: "https://www.primevideo.com/-/ko/detail/0FJ5I56FI21X9QOLAPPBFIBO8U",
      tving: "https://www.tving.com/contents/P001751824",
      watcha: "https://watcha.com/ko/contents/tlLrq1W"
    },
    "ramen-akaneko-part-two": {
      laftel: "https://laftel.net/item/42261",
      watcha: "https://watcha.com/ko/contents/tPeWv55"
    },
    "golden-kamuy-final-chapter-runaway-train-arc": {
      tving: "https://www.tving.com/contents/P001788312",
      watcha: "https://watcha.com/ko/contents/tR2Z3DR"
    },
    "shangri-la-frontier-season-3": {
      laftel: "https://laftel.net/item/42411",
      tving: "https://www.tving.com/contents/P001762706",
      watcha: "https://watcha.com/ko/contents/tPrzvGO"
    },
    "akane-banashi-season-2": {
      laftel: "https://laftel.net/item/45436"
    },
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": {
      laftel: "https://laftel.net/item/42651"
    },
    "medalist-the-movie": {
      disney: "https://www.disneyplus.com/ko-kr/browse/entity-bb33d0c2-b077-4bc0-a549-d2ca27d4afa8"
    },
    "skip-and-loafer-season-2": {
      tving: "https://www.tving.com/contents/P001707310",
      watcha: "https://watcha.com/ko/contents/tRp4vN6"
    },
    "the-apothecary-diaries-season-3-part-2": {
      netflix: "https://www.netflix.com/kr/title/81712068"
    },
    "delicious-in-dungeon-season-2": {
      netflix: "https://www.netflix.com/kr/title/81564899"
    },
    "frieren-beyond-journeys-end-season-3-golden-land-arc": {
      netflix: "https://www.netflix.com/kr/title/81726714",
      laftel: "https://laftel.net/item/44281",
      prime: "https://www.primevideo.com/-/ko/detail/0FCJEHY4FXTDVCLZ5NR9A0N42N",
      tving: "https://www.tving.com/contents/P001781702",
      watcha: "https://watcha.com/ko/contents/tRN7gzz"
    },
    "spice-and-wolf-merchant-meets-the-wise-wolf-season-2": {
      tving: "https://www.tving.com/contents/P001755104",
      watcha: "https://watcha.com/ko/contents/tPd313d"
    },
    "dan-da-dan-season-3": {
      prime: "https://www.primevideo.com/-/ko/detail/0OFFTSH522NN0TQ2QJC1R2J590",
      tving: "https://www.tving.com/contents/P001766481",
      watcha: "https://watcha.com/ko/contents/tlnN0K1"
    },
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": {
      laftel: "https://laftel.net/item/42053"
    },
    "laid-back-camp-season-4": {
      watcha: "https://watcha.com/ko/contents/tRMZgbP"
    },
    "the-dangers-in-my-heart-season-3": {
      watcha: "https://watcha.com/ko/contents/tPVdZdw"
    },
    "oblivion-battery-season-2": {
      laftel: "https://laftel.net/item/42086"
    },
    "alya-sometimes-hides-her-feelings-in-russian-season-2": {
      laftel: "https://laftel.net/item/42278",
      tving: "https://www.tving.com/contents/P001758957",
      watcha: "https://watcha.com/ko/contents/tRWm84a"
    },
    "one-punch-man-season-3-part-2": {
      tving: "https://www.tving.com/contents/P001778344"
    },
    "the-rising-of-the-shield-hero-season-5": {
      tving: "https://www.tving.com/contents/P001773988",
      watcha: "https://watcha.com/ko/contents/tlnN0bz"
    },
    "fate-kaleid-liner-prisma-illya-finale": {
      laftel: "https://laftel.net/item/33300"
    },
    "haikyu-the-movie-vs-the-little-giant": {
      netflix: "https://www.netflix.com/kr/title/80090673"
    },
    "the-eminence-in-shadow-lost-echoes": {
      laftel: "https://laftel.net/item/41643"
    },
    "one-piece-film-god-valley": {
      netflix: "https://www.netflix.com/kr/title/80107103"
    },
    "the-worlds-finest-assassin-season-2": {
      laftel: "https://laftel.net/item/40533"
    }
  };

  const hasStreamingVerification = anime =>
    (anime?.verification?.sources || []).some(source =>
      Array.isArray(source?.supports) && source.supports.includes("streaming")
    );

  const isSeriesTitle = anime => Array.isArray(anime?.tags) && anime.tags.includes("series");

  if (Array.isArray(window.animeData)) {
    window.animeData.forEach(anime => {
      const originalLinks = anime?.streaming && typeof anime.streaming === "object"
        ? anime.streaming
        : {};
      const directOriginalLinks = filterDirectServiceLinks(originalLinks);
      const currentOverride = filterDirectServiceLinks(confirmedDirectOverrides[anime.id]);
      const previousOverride = filterDirectServiceLinks(previousSeriesOverrides[anime.id]);

      let currentStreaming = {};
      if (Object.keys(currentOverride).length) {
        currentStreaming = currentOverride;
      } else if (hasStreamingVerification(anime)) {
        currentStreaming = directOriginalLinks;
      }

      const previousStreaming = isSeriesTitle(anime) ? previousOverride : {};

      anime.currentStreaming = currentStreaming;
      anime.previousStreaming = previousStreaming;

      // app.js uses anime.streaming only to decide whether the Streaming button is enabled.
      // Keep a union here, while links.streaming remains current-installment only.
      anime.streaming = { ...previousStreaming, ...currentStreaming };

      if (anime.links) {
        anime.links.streaming = Object.values(currentStreaming)[0] || null;
      }
    });
  }

  const previousSeriesUi = {
    ko: {
      current: "현재 작품",
      previous: "이전 시리즈 정주행",
      note: "이전 시리즈를 시청할 수 있는 서비스입니다. 현재 작품의 스트리밍 확정 정보가 아닙니다."
    },
    ja: {
      current: "今作",
      previous: "過去シリーズをまとめて視聴",
      note: "過去シリーズを視聴できるサービスです。今作の配信決定情報ではありません。"
    },
    en: {
      current: "Current installment",
      previous: "Catch up on previous series",
      note: "These services are for earlier installments and do not confirm streaming for the upcoming title."
    }
  };

  const injectPreviousSeriesStyles = () => {
    if (document.getElementById("previousSeriesStreamingStyles")) return;

    const style = document.createElement("style");
    style.id = "previousSeriesStreamingStyles";
    style.textContent = `
      .ott-grid.streaming-sections {
        display: block;
      }

      .streaming-section + .streaming-section {
        margin-top: 18px;
        padding-top: 18px;
        border-top: 1px solid var(--line);
      }

      .streaming-section-title {
        margin: 0 0 9px;
        color: #dfe4f4;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .06em;
      }

      .streaming-section-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
      }

      .streaming-section-note {
        margin: 9px 2px 0;
        color: #7f899c;
        font-size: 10px;
        line-height: 1.55;
      }

      @media (max-width: 640px) {
        .streaming-section-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const installPreviousSeriesModal = () => {
    if (typeof openStreamingModal !== "function") return;

    injectPreviousSeriesStyles();

    const renderOptions = links => ottPlatforms
      .filter(platform => links?.[platform.id])
      .map(platform => `
        <a class="ott-option" href="${links[platform.id]}" target="_blank" rel="noopener noreferrer">
          <span class="ott-option-name">${platform.name}</span>
          <span class="ott-option-state">${t("open")}</span>
        </a>
      `)
      .join("");

    openStreamingModal = function(anime, trigger = null) {
      const currentLinks = anime.currentStreaming || {};
      const previousLinks = anime.previousStreaming || {};
      const labels = previousSeriesUi[activeLang] || previousSeriesUi.ko;
      const sections = [];

      lastStreamTrigger = trigger;
      streamModalTitle.textContent = localTitle(anime);

      if (ottPlatforms.some(platform => currentLinks[platform.id])) {
        sections.push(`
          <section class="streaming-section">
            <h5 class="streaming-section-title">${labels.current}</h5>
            <div class="streaming-section-grid">${renderOptions(currentLinks)}</div>
          </section>
        `);
      }

      if (ottPlatforms.some(platform => previousLinks[platform.id])) {
        sections.push(`
          <section class="streaming-section streaming-section-previous">
            <h5 class="streaming-section-title">${labels.previous}</h5>
            <div class="streaming-section-grid">${renderOptions(previousLinks)}</div>
            <p class="streaming-section-note">${labels.note}</p>
          </section>
        `);
      }

      ottGrid.classList.add("streaming-sections");
      ottGrid.innerHTML = sections.join("");

      streamModal.classList.remove("hidden");
      document.body.classList.add("modal-open");

      const closeButton = streamModal.querySelector(".stream-close");
      requestAnimationFrame(() => closeButton?.focus());
    };
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installPreviousSeriesModal, { once: true });
  } else {
    installPreviousSeriesModal();
  }
})();

window.ottPlatforms = [
  {
    "id": "netflix",
    "name": "Netflix"
  },
  {
    "id": "laftel",
    "name": "Laftel"
  },
  {
    "id": "disney",
    "name": "Disney+"
  },
  {
    "id": "prime",
    "name": "Prime Video"
  },
  {
    "id": "crunchyroll",
    "name": "Crunchyroll"
  },
  {
    "id": "tving",
    "name": "TVING"
  },
  {
    "id": "watcha",
    "name": "WATCHA"
  },
  {
    "id": "youtube",
    "name": "YouTube"
  }
];
