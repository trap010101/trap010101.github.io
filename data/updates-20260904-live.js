// Meaningful updates added on 2026-09-04 after the initial verification pass.
(() => {
  const additions = [
    {
      id: "2026-09-04-sekiro-no-defeat-release-start",
      animeId: "sekiro-no-defeat",
      changedAt: "2026-09-04",
      type: "release-date",
      fields: ["release.japan"],
      summary: {
        ko: "일본 극장 상영이 오늘 시작되었습니다.",
        ja: "日本での劇場公開が本日開始しました。",
        en: "The theatrical release in Japan starts today."
      },
      source: {
        type: "official-site",
        url: "https://sekiro-anime.jp/",
        label: "Official website"
      }
    },
    {
      id: "2026-09-04-the-worlds-finest-assassin-season-2-added",
      animeId: "the-worlds-finest-assassin-season-2",
      changedAt: "2026-09-04",
      type: "anime-added",
      fields: ["title", "release.japan", "links.pv"],
      summary: {
        ko: "2027년 1월 방영이 확정된 Season 2를 신규 등록하고 메인 PV 1탄을 추가했습니다.",
        ja: "2027年1月放送決定のSeason2を新規登録し、メインPV第1弾を追加しました。",
        en: "Added Season 2 with its January 2027 broadcast window and first main PV."
      },
      source: {
        type: "official-x",
        url: "https://x.com/ansatsu_kizoku/status/2095708679857213795",
        label: "Official X announcement"
      }
    },
    {
      id: "2026-09-04-keroro-gunso-star-added",
      animeId: "keroro-gunso-star",
      changedAt: "2026-09-04",
      type: "anime-added",
      fields: ["title", "release.japan", "links.pv"],
      summary: {
        ko: "완전 신작 TV 애니메이션을 신규 등록하고 2026년 가을 방영 예정으로 반영했습니다.",
        ja: "完全新作TVアニメを新規登録し、2026年秋放送予定として反映しました。",
        en: "Added the all-new TV anime with its confirmed Fall 2026 broadcast window."
      },
      source: {
        type: "official-site",
        url: "https://www.bn-pictures.co.jp/keroro-anime/tv/",
        label: "Official website"
      }
    }
  ];

  if (!Array.isArray(window.animeUpdates)) window.animeUpdates = [];
  const existingIds = new Set(window.animeUpdates.map(update => update.id));
  window.animeUpdates = [
    ...additions.filter(update => !existingIds.has(update.id)),
    ...window.animeUpdates
  ];
})();
