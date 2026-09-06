// Region-aware previous-series streaming UI for generated anime detail pages.
(() => {
  const data = window.ANIME_DETAIL;
  if (!data?.streamingByRegion) return;

  const STORAGE_KEY = "animeStreamingRegion";
  const regionOrder = Array.isArray(data.streamingRegionOrder) && data.streamingRegionOrder.length
    ? data.streamingRegionOrder
    : ["kr", "jp", "us"];

  const copy = {
    ko: {
      region: "시청 지역",
      note: "선택한 지역에서 이전 시리즈를 시청할 수 있는 서비스입니다. 현재 작품의 스트리밍 확정 정보가 아닙니다.",
      empty: "선택한 지역에서 확인된 이전 시리즈 스트리밍 서비스가 없습니다."
    },
    ja: {
      region: "視聴地域",
      note: "選択した地域で過去シリーズを視聴できるサービスです。今作の配信決定情報ではありません。",
      empty: "選択した地域では、確認済みの過去シリーズ配信サービスがありません。"
    },
    en: {
      region: "Streaming region",
      note: "These services stream earlier installments in the selected region and do not confirm streaming for the upcoming title.",
      empty: "No verified previous-series streaming service is available in the selected region."
    }
  };

  const safeGet = key => {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  };
  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) {}
  };

  const detectRegion = () => {
    const language = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
    const normalized = String(language || "").toLowerCase();
    if (normalized === "ko" || normalized.startsWith("ko-")) return "kr";
    if (normalized === "ja" || normalized.startsWith("ja-")) return "jp";
    return "us";
  };

  const stored = safeGet(STORAGE_KEY);
  let region = regionOrder.includes(stored) ? stored : detectRegion();
  if (!regionOrder.includes(region)) region = "kr";

  const esc = value => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const regionLabel = (regionId, lang) => {
    const meta = data.streamingRegions?.[regionId];
    return meta?.label?.[lang] || meta?.countryCode || regionId.toUpperCase();
  };

  const injectStyles = () => {
    if (document.getElementById("detailStreamingRegionStyles")) return;
    const style = document.createElement("style");
    style.id = "detailStreamingRegionStyles";
    style.textContent = `
      .detail-stream-region {
        margin: 12px 0 14px;
        padding: 11px;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 14px;
        background: rgba(255,255,255,.025);
      }
      .detail-stream-region-label {
        display: block;
        margin: 0 0 8px;
        color: #8f99ad;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .06em;
        text-transform: uppercase;
      }
      .detail-stream-region-options {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
      }
      .detail-stream-region-btn {
        min-width: 0;
        padding: 8px 9px;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 10px;
        background: rgba(255,255,255,.025);
        color: #aab3c5;
        font: inherit;
        font-size: 11px;
        font-weight: 850;
        cursor: pointer;
      }
      .detail-stream-region-btn.active {
        color: #fff;
        border-color: rgba(142,161,255,.42);
        background: linear-gradient(135deg, rgba(142,161,255,.24), rgba(178,140,255,.16));
      }
      .detail-stream-region-btn strong,
      .detail-stream-region-btn small { display: block; }
      .detail-stream-region-btn strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail-stream-region-btn small {
        margin-top: 2px;
        color: inherit;
        opacity: .62;
        font-size: 9px;
      }
      .detail-streaming-empty {
        margin: 0;
        padding: 13px 12px;
        border: 1px dashed rgba(255,255,255,.1);
        border-radius: 12px;
        color: #8f99ad;
        font-size: 12px;
        line-height: 1.55;
      }
      @media (max-width: 540px) {
        .detail-stream-region-options { grid-template-columns: 1fr; }
        .detail-stream-region-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .detail-stream-region-btn small { margin-top: 0; }
      }
    `;
    document.head.appendChild(style);
  };

  const panelLanguage = panel => panel?.dataset.langPanel || "ko";

  const renderPanel = panel => {
    const lang = panelLanguage(panel);
    const labels = copy[lang] || copy.ko;
    const list = panel.querySelector(".streaming-list");
    if (!list) return;

    const note = list.closest(".detail-panel")?.querySelector(".panel-note");
    if (note) note.textContent = labels.note;

    let selector = list.closest(".detail-panel")?.querySelector(".detail-stream-region");
    if (!selector) {
      selector = document.createElement("div");
      selector.className = "detail-stream-region";
      list.parentNode.insertBefore(selector, list);
    }

    selector.innerHTML = `
      <span class="detail-stream-region-label">${esc(labels.region)}</span>
      <div class="detail-stream-region-options">
        ${regionOrder.map(regionId => {
          const meta = data.streamingRegions?.[regionId];
          return `<button type="button" class="detail-stream-region-btn ${regionId === region ? "active" : ""}" data-detail-stream-region="${esc(regionId)}" aria-pressed="${regionId === region}">
            <strong>${esc(regionLabel(regionId, lang))}</strong>
            <small>${esc(meta?.countryCode || regionId.toUpperCase())}</small>
          </button>`;
        }).join("")}
      </div>`;

    const links = data.streamingByRegion?.[region]?.previous || {};
    const rows = Object.entries(links)
      .filter(([, url]) => Boolean(url))
      .map(([platformId, url]) => {
        const name = data.streamingPlatformNames?.[platformId] || platformId;
        return `<a class="streaming-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span>${esc(name)}</span><span aria-hidden="true">↗</span></a>`;
      })
      .join("");

    list.innerHTML = rows || `<p class="detail-streaming-empty">${esc(labels.empty)}</p>`;
  };

  const renderAll = () => {
    document.querySelectorAll("[data-lang-panel]").forEach(renderPanel);
  };

  injectStyles();
  renderAll();

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-detail-stream-region]");
    if (!button) return;
    const next = button.dataset.detailStreamRegion;
    if (!regionOrder.includes(next)) return;
    region = next;
    safeSet(STORAGE_KEY, region);
    renderAll();
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => requestAnimationFrame(renderAll));
  });
})();
