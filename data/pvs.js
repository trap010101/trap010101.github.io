// Official PV catalog. Multiple videos remain selectable from the card PV popup.
// Only direct YouTube video URLs are exposed; article/movie index pages are never used as PV destinations.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const pvOverrides = {
    "the-worlds-finest-assassin-season-2": [
      { label: { ko: "메인 PV 1탄", ja: "メインPV第1弾", en: "Main PV #1" }, url: "https://www.youtube.com/watch?v=DAXn92SSHIo" }
    ],
    "keroro-gunso-star": [
      { label: { ko: "PV", ja: "PV", en: "PV" }, url: "https://www.youtube.com/watch?v=S6KZXOfh-uk" }
    ],
    "sound-euphonium-the-final-movement-part-2": [
      { label: { ko: "후편 예고", ja: "後編 予告", en: "Part 2 Trailer" }, url: "https://www.youtube.com/watch?v=cQxTu272gZU" },
      { label: { ko: "후편 본예고", ja: "後編 本予告", en: "Part 2 Main Trailer" }, url: "https://www.youtube.com/watch?v=ynf-VjW-U4A" }
    ],
    "jojos-bizarre-adventure-steel-ball-run-2nd-and-3rd-stage": [
      { label: { ko: "2nd STAGE 티저 PV", ja: "2nd STAGE ティザーPV", en: "2nd STAGE Teaser PV" }, url: "https://www.youtube.com/watch?v=TWw06YDOQy0" },
      { label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" }, url: "https://www.youtube.com/watch?v=jXtG_lcR9P4" }
    ],
    "tokyo-revengers-three-deities-war-arc": [
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=YgZ0M470sYg" },
      { label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" }, url: "https://www.youtube.com/watch?v=bwmEisjn408" },
      { label: { ko: "PV 3탄", ja: "PV第3弾", en: "PV #3" }, url: "https://www.youtube.com/watch?v=veuS7n4Zks4" }
    ],
    "ranma-1-2-season-3": [
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=MnYDGUBUzJQ" },
      { label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" }, url: "https://www.youtube.com/watch?v=dbe8esPSfYI" }
    ],
    "magical-explorer": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=M7bR4FznTN4" },
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=bQuJywMCYWg" },
      { label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" }, url: "https://www.youtube.com/watch?v=XqrBfyUNYZs" }
    ],
    "tank-chair": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=CdzLcwU9pVo" },
      { label: { ko: "메인 PV", ja: "メインPV", en: "Main PV" }, url: "https://www.youtube.com/watch?v=uaW2KLmA47M" }
    ],
    "blue-box-season-2": [
      { label: { ko: "Season 2 티저 PV", ja: "Season2 ティザーPV", en: "Season 2 Teaser PV" }, url: "https://www.youtube.com/watch?v=ZtFrSp4pMJ4" },
      { label: { ko: "Season 2 메인 PV", ja: "Season2 メインPV", en: "Season 2 Main PV" }, url: "https://www.youtube.com/watch?v=hJ6Y8PAOUk8" }
    ],
    "nia-liston-the-merciless-maiden": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=HKdiA5mNb_A" },
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=Jg9fxHp8UTc" }
    ],
    "the-worlds-strongest-witch-has-begun": [
      { label: { ko: "PV", ja: "PV", en: "PV" }, url: "https://www.youtube.com/watch?v=pIIJ7gVl6wg" },
      { label: { ko: "메인 PV", ja: "メインPV", en: "Main PV" }, url: "https://www.youtube.com/watch?v=snJZD9vxfHY" }
    ],
    "her-friend": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=ifIEcvYJwcE" }
    ],
    "super-psychic-policeman-chojo": [
      { label: { ko: "메인 PV 1탄", ja: "第1弾メインPV", en: "Main PV #1" }, url: "https://www.youtube.com/watch?v=fx66nT-2_AA" }
    ],
    "a-tale-of-the-secret-saint": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=TQYVI-xvGeA" }
    ],
    "im-a-reincarnated-goblin-any-questions": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=V4K-kG3hEJc" }
    ],
    "sasaki-and-peeps-season-2": [
      { label: { ko: "Season 2 티저 PV", ja: "Season 2 ティザーPV", en: "Season 2 Teaser PV" }, url: "https://www.youtube.com/watch?v=oR4Luug1NRc" }
    ],
    "reincarnated-as-a-sword-ii": [
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=Yg4w96HEbhY" },
      { label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" }, url: "https://www.youtube.com/watch?v=kbtRqqa2GyA" }
    ],
    "firefly-wedding": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=feXx-UG9iZk" },
      { label: { ko: "티저 PV 2탄", ja: "ティザーPV第2弾", en: "Teaser PV #2" }, url: "https://www.youtube.com/watch?v=7GfOA15WDhQ" }
    ],
    "psyren": [
      { label: { ko: "티저 PV 2탄", ja: "ティザーPV第2弾", en: "Teaser PV #2" }, url: "https://www.youtube.com/watch?v=zxgBkQcOv7I" }
    ],
    "suikoden": [
      { label: { ko: "PV 1탄", ja: "第1弾PV", en: "PV #1" }, url: "https://www.youtube.com/watch?v=kXssTd_3R3Q" },
      { label: { ko: "PV 2탄", ja: "第2弾PV", en: "PV #2" }, url: "https://www.youtube.com/watch?v=7ZAQGHThWME" }
    ],
    "demons-crest": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=llzkRQ9gM1I" },
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=jvxgudW4FCs" }
    ],
    "fool-night": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=HIHduZ8-Jx0" },
      { label: { ko: "티저 PV 2탄", ja: "ティザーPV第2弾", en: "Teaser PV #2" }, url: "https://www.youtube.com/watch?v=8E_SDmeOtVw" }
    ],
    "black-clover-2nd-season": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=b_hLnfMgltY" },
      { label: { ko: "본 PV", ja: "本PV", en: "Main PV" }, url: "https://www.youtube.com/watch?v=4MYo8FfiXMA" }
    ],
    "mashle-season-3-divine-visionary-final-exam-arc": [
      { label: { ko: "3기 티저 PV", ja: "第3期ティザーPV", en: "Season 3 Teaser PV" }, url: "https://www.youtube.com/watch?v=Ak8DnZUIPSk" }
    ],
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": [
      { label: { ko: "Season 2 티저 PV", ja: "Season2 ティザーPV", en: "Season 2 Teaser PV" }, url: "https://www.youtube.com/watch?v=OOHTPQCmfYA" }
    ],
    "isshiki-san-wants-to-know-love": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=M4Hd-y86hIs" }
    ],
    "the-kept-man-of-the-princess-knight": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=HHkhpN-DwxM" }
    ],
    "shangri-la-frontier-season-3": [
      { label: { ko: "3rd Season 티저 PV", ja: "3rd season ティザーPV", en: "Season 3 Teaser PV" }, url: "https://www.youtube.com/watch?v=84JvYWUOOaU" }
    ],
    "akane-banashi-season-2": [
      { label: { ko: "2기 제작 결정 PV", ja: "第2期制作決定PV", en: "Season 2 Announcement PV" }, url: "https://www.youtube.com/watch?v=XKi4oNgOTiA" }
    ],
    "murcie-lago": [
      { label: { ko: "울트라 티저 PV", ja: "ウルトラティザーPV", en: "Ultra Teaser PV" }, url: "https://www.youtube.com/watch?v=89GKTwYzKuM" }
    ],
    "historie": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=ZNXhIx7L0n4" },
      { label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" }, url: "https://www.youtube.com/watch?v=GM1Y206Unwg" }
    ],
    "skip-and-loafer-season-2": [
      { label: { ko: "2nd season 티저 PV", ja: "2nd season ティザーPV", en: "Season 2 Teaser PV" }, url: "https://www.youtube.com/watch?v=SizD56s6guU" }
    ],
    "laid-back-camp-season-4": [
      { label: { ko: "특보 PV", ja: "特報PV", en: "Special Teaser PV" }, url: "https://www.youtube.com/watch?v=pNDkVOlaGBQ" }
    ],
    "the-witch-and-the-mercenary": [
      { label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" }, url: "https://www.youtube.com/watch?v=Ma6twUC12To" }
    ],
    "the-apothecary-diaries-the-late-consorts-secret-treasure": [
      { label: { ko: "예고 영상", ja: "予告映像", en: "Trailer" }, url: "https://www.youtube.com/watch?v=HP5wg0kTh54" }
    ],
    "girls-und-panzer-das-finale-part-5": [
      { label: { ko: "본예고", ja: "本予告", en: "Main Trailer" }, url: "https://www.youtube.com/watch?v=yDRK9-yG9X8" }
    ]
  };

  const fallbackLabel = { ko: "PV", ja: "PV", en: "PV" };

  function normalizeYouTubeUrl(url) {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
      let videoId = null;

      if (host === "youtu.be") {
        videoId = parsed.pathname.split("/").filter(Boolean)[0] || null;
      } else if (["youtube.com", "m.youtube.com"].includes(host)) {
        if (parsed.pathname === "/watch") {
          videoId = parsed.searchParams.get("v");
        } else {
          const parts = parsed.pathname.split("/").filter(Boolean);
          if (["shorts", "embed"].includes(parts[0])) videoId = parts[1] || null;
        }
      }

      if (!videoId || !/^[A-Za-z0-9_-]{6,}$/.test(videoId)) return null;
      return `https://www.youtube.com/watch?v=${videoId}`;
    } catch (_) {
      return null;
    }
  }

  function normalizedEntry(entry) {
    if (!entry) return null;
    if (typeof entry === "string") {
      const url = normalizeYouTubeUrl(entry);
      return url ? { label: fallbackLabel, url } : null;
    }

    const url = normalizeYouTubeUrl(entry.url);
    if (!url) return null;
    const fallback = entry.label || fallbackLabel;
    const label = typeof fallback === "string"
      ? { ko: fallback, ja: fallback, en: fallback }
      : {
          ko: fallback.ko || fallback.ja || fallback.en || "PV",
          ja: fallback.ja || fallback.ko || fallback.en || "PV",
          en: fallback.en || fallback.ko || fallback.ja || "PV"
        };
    return { ...entry, label, url };
  }

  function normalizeEntries(entries) {
    const seen = new Set();
    return (Array.isArray(entries) ? entries : [entries])
      .map(normalizedEntry)
      .filter(entry => {
        if (!entry || seen.has(entry.url)) return false;
        seen.add(entry.url);
        return true;
      });
  }

  window.animeData.forEach(anime => {
    const explicitEntries = pvOverrides[anime.id]
      || anime.links?.pvs
      || anime.pvs
      || [];
    let entries = normalizeEntries(explicitEntries);

    if (!entries.length) {
      const legacy = normalizedEntry(anime.links?.pv);
      if (legacy) entries = [legacy];
    }

    if (!entries.length) {
      const verifiedYouTube = (anime.verification?.sources || [])
        .find(source => source.type === "official-youtube" && normalizeYouTubeUrl(source.url));
      const verifiedEntry = normalizedEntry(verifiedYouTube?.url);
      if (verifiedEntry) entries = [verifiedEntry];
    }

    anime.pvs = entries;
    if (anime.links) anime.links.pv = entries[0]?.url || null;
  });
})();
