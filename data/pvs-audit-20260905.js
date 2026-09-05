// Official PV audit verified on 2026-09-05.
// Loaded after data/pvs.js so newly confirmed direct videos can restore otherwise-empty PV buttons.
(() => {
  const verifiedAt = "2026-09-05";
  const pvUpdates = {
    "looking-for-zombies": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=KbXVkk7UH9Q"
      }
    ],
    "tetsuryo-meet-with-tetsudo-musume": [
      {
        label: { ko: "PV 2탄", ja: "PV第2弾", en: "PV #2" },
        url: "https://www.youtube.com/watch?v=GixEiC7k9_4"
      }
    ],
    "tanuki-and-kitsune": [
      {
        label: { ko: "애니메이션 PV", ja: "アニメPV", en: "Anime PV" },
        url: "https://www.youtube.com/watch?v=DO_UchIVN9Y"
      }
    ],
    "the-seven-knights-of-the-marronnier-kingdom": [
      {
        label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" },
        url: "https://www.youtube.com/watch?v=K6N27yNdNIg"
      }
    ],
    "the-timid-max-lady-took-her-shrewd-fiance-s-bet": [
      {
        label: { ko: "PV 1탄", ja: "PV第1弾", en: "PV #1" },
        url: "https://www.youtube.com/watch?v=e41RGxVwJRs"
      }
    ],
    "i-woke-up-with-the-strongest-gear-and-a-spaceship-so-ill-live-freely-as-a-mercenary": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=6J7MHu2O7Vw"
      }
    ],
    "magical-sisters-lulutto-lilly-part-2": [
      {
        label: { ko: "메인 PV 2탄 (시리즈)", ja: "メインPV第2弾（シリーズ）", en: "Main PV #2 (Series)" },
        url: "https://www.youtube.com/watch?v=7oNuxIfJqiI"
      }
    ],
    "the-iceblade-sorcerer-shall-rule-the-world-ii": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=30rSarCHpmA"
      }
    ],
    "chitose-is-in-the-ramune-bottle-part-2": [
      {
        label: { ko: "제2쿨 PV 1탄", ja: "第2クールPV第1弾", en: "Part 2 PV #1" },
        url: "https://www.youtube.com/watch?v=G14qnuuJWtI"
      }
    ],
    "the-detective-is-already-dead-season-2": [
      {
        label: { ko: "Season 2 PV 1탄", ja: "Season 2 PV第1弾", en: "Season 2 PV #1" },
        url: "https://www.youtube.com/watch?v=nYYGphs8jvA"
      },
      {
        label: { ko: "Season 2 티저 PV", ja: "Season 2 ティザーPV", en: "Season 2 Teaser PV" },
        url: "https://www.youtube.com/watch?v=mHO3ZjEVNbU"
      }
    ],
    "matsurika-kanriden": [
      {
        label: { ko: "메인 PV 1탄", ja: "メインPV第1弾", en: "Main PV #1" },
        url: "https://www.youtube.com/watch?v=7ja8PqzctBg"
      },
      {
        label: { ko: "비주얼 공개 PV", ja: "ビジュアル解禁PV", en: "Visual Reveal PV" },
        url: "https://www.youtube.com/watch?v=UkiFIcxXTxk"
      }
    ],
    "the-principle-of-a-philosopher-by-eternal-fool-asley": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=nlTJz-N_LtI"
      }
    ],
    "giant-ojou-sama": [
      {
        label: { ko: "티저 PV", ja: "ティザーPV", en: "Teaser PV" },
        url: "https://www.youtube.com/watch?v=CmMCOThEhNk"
      }
    ],
    "hirayasumi": [
      {
        label: { ko: "스페셜 PV", ja: "スペシャルPV", en: "Special PV" },
        url: "https://www.youtube.com/watch?v=Gg-r7oP2x7E"
      }
    ],
    "frieren-beyond-journeys-end-season-3-golden-land-arc": [
      {
        label: { ko: "3기 발표 숏 PV", ja: "第3期発表ショートPV", en: "Season 3 Announcement Short PV" },
        url: "https://www.youtube.com/watch?v=765qxY2Tbm4"
      }
    ],
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": [
      {
        label: { ko: "10주년 기념 PV (4기 발표 포함)", ja: "10周年記念PV（第4期発表含む）", en: "10th Anniversary PV (Season 4 Announcement)" },
        url: "https://www.youtube.com/watch?v=8XpGThBki3Y"
      }
    ],
    "ghost-of-tsushima-legends": [
      {
        label: { ko: "티저", ja: "ティザー", en: "Teaser" },
        url: "https://www.youtube.com/watch?v=uU8slMpqDXU"
      }
    ]
  };

  if (!Array.isArray(window.animeData)) return;

  window.animeData.forEach(anime => {
    const additions = pvUpdates[anime.id];
    if (!additions?.length) return;

    const existing = Array.isArray(anime.pvs) ? anime.pvs : [];
    const seen = new Set();
    anime.pvs = [...additions, ...existing].filter(entry => {
      if (!entry?.url || seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });

    anime.links = anime.links || {};
    anime.links.pv = anime.pvs[0]?.url || null;

    anime.verification = anime.verification || { verifiedAt: null, sources: [] };
    anime.verification.verifiedAt = verifiedAt;
    if (!Array.isArray(anime.verification.sources)) anime.verification.sources = [];

    additions.forEach(entry => {
      if (anime.verification.sources.some(source => source.url === entry.url)) return;
      anime.verification.sources.push({
        type: "official-youtube",
        url: entry.url,
        label: `Official YouTube — ${entry.label?.en || "PV"}`,
        supports: ["pv"]
      });
    });

    anime.updatedAt = verifiedAt;
  });
})();
