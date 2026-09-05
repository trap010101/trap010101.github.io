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
    watcha: url => url.hostname.endsWith("watcha.com") && url.pathname.includes("/contents/")
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

  // Explicit catch-up destinations for an earlier installment in the same series.
  // These must never be exposed as confirmation for the upcoming installment itself.
  const previousSeriesOverrides = {
    "tiger-coming-in-2": {
      laftel: "https://laftel.net/item/42320"
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

      let previousStreaming = {};
      if (isSeriesTitle(anime) && !hasStreamingVerification(anime)) {
        previousStreaming = { ...directOriginalLinks };
      }
      if (Object.keys(previousOverride).length) {
        previousStreaming = { ...previousStreaming, ...previousOverride };
      }

      // Avoid showing the exact same destination in both sections.
      Object.entries(previousStreaming).forEach(([platformId, url]) => {
        if (currentStreaming[platformId] === url) delete previousStreaming[platformId];
      });

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
  }
];
