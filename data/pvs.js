// Structured promotional-video metadata.
// Only direct YouTube video URLs are exposed as PV actions.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const pvOverrides = {
    "the-worlds-finest-assassin-season-2": [
      {
        label: { ko: "메인 PV 1탄", ja: "メインPV第1弾", en: "Main PV #1" },
        url: "https://www.youtube.com/watch?v=DAXn92SSHIo"
      }
    ],
    "keroro-gunso-star": [
      {
        label: { ko: "PV", ja: "PV", en: "PV" },
        url: "https://www.youtube.com/watch?v=S6KZXOfh-uk"
      }
    ],
    "black-clover-2nd-season": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=b_hLnfMgltY"
      },
      {
        label: { ko: "본 PV", ja: "本PV", en: "Main PV" },
        url: "https://www.youtube.com/watch?v=4MYo8FfiXMA"
      }
    ],
    "mashle-season-3-divine-visionary-final-exam-arc": [
      {
        label: { ko: "3기 티저 PV", ja: "第3期ティザーPV", en: "Season 3 Teaser PV" },
        url: "https://www.youtube.com/watch?v=Ak8DnZUIPSk"
      }
    ],
    "magical-explorer": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=M7bR4FznTN4"
      }
    ]
  };

  function isDirectYouTubeVideo(url) {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
      if (host === "youtu.be") return Boolean(parsed.pathname.slice(1));
      if (host === "youtube.com" || host === "m.youtube.com") {
        return parsed.pathname === "/watch" && Boolean(parsed.searchParams.get("v"));
      }
      return false;
    } catch (_) {
      return false;
    }
  }

  function normalizedEntry(entry) {
    if (!entry) return null;
    if (typeof entry === "string") {
      return isDirectYouTubeVideo(entry)
        ? { label: { ko: "PV", ja: "PV", en: "PV" }, url: entry }
        : null;
    }
    if (!isDirectYouTubeVideo(entry.url)) return null;
    const fallback = entry.label || "PV";
    const label = typeof fallback === "string"
      ? { ko: fallback, ja: fallback, en: fallback }
      : {
          ko: fallback.ko || fallback.ja || fallback.en || "PV",
          ja: fallback.ja || fallback.ko || fallback.en || "PV",
          en: fallback.en || fallback.ko || fallback.ja || "PV"
        };
    return { ...entry, label };
  }

  window.animeData.forEach(anime => {
    const explicitEntries = pvOverrides[anime.id]
      || anime.links?.pvs
      || anime.pvs
      || [];
    const rawEntries = Array.isArray(explicitEntries) ? explicitEntries : [explicitEntries];
    let entries = rawEntries.map(normalizedEntry).filter(Boolean);

    if (!entries.length) {
      const legacy = normalizedEntry(anime.links?.pv);
      if (legacy) entries = [legacy];
    }

    if (!entries.length) {
      const verifiedYouTube = (anime.verification?.sources || [])
        .find(source => source.type === "official-youtube" && isDirectYouTubeVideo(source.url));
      const verifiedEntry = normalizedEntry(verifiedYouTube?.url);
      if (verifiedEntry) entries = [verifiedEntry];
    }

    anime.pvs = entries;
    if (anime.links) anime.links.pv = entries[0]?.url || null;
  });
})();
