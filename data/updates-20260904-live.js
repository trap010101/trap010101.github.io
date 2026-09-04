// Meaningful updates added after the initial verification pass, plus derived release-start history.
(() => {
  function primaryRelease(anime) {
    return anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
  }

  function isoReleaseDate(release) {
    if (!release || release.status !== "date" || !release.year || !release.month || !release.day) return null;
    return `${release.year}-${String(release.month).padStart(2, "0")}-${String(release.day).padStart(2, "0")}`;
  }

  function japanTodayIso() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    const value = type => parts.find(part => part.type === type)?.value || "";
    return `${value("year")}-${value("month")}-${value("day")}`;
  }

  function releaseStartSummary(anime) {
    if (anime.format === "movie") {
      return {
        ko: "일본 극장 상영이 시작되었습니다.",
        ja: "日本での劇場公開が開始しました。",
        en: "The theatrical release in Japan has started."
      };
    }
    if (anime.format === "ona") {
      return {
        ko: "온라인 공개가 시작되었습니다.",
        ja: "オンライン配信が開始しました。",
        en: "The online release has started."
      };
    }
    return {
      ko: "일본 TV 방영이 시작되었습니다.",
      ja: "日本でのTV放送が開始しました。",
      en: "The TV broadcast in Japan has started."
    };
  }

  const additions = [
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

  const today = japanTodayIso();
  const releaseStarts = (window.animeData || []).flatMap(anime => {
    const changedAt = isoReleaseDate(primaryRelease(anime));
    if (!changedAt || changedAt > today) return [];
    const source = anime.verification?.sources?.[0] || null;
    return [{
      id: `${changedAt}-${anime.id}-release-start`,
      animeId: anime.id,
      changedAt,
      type: "release-date",
      fields: ["release"],
      summary: releaseStartSummary(anime),
      source
    }];
  });

  if (!Array.isArray(window.animeUpdates)) window.animeUpdates = [];
  const existingIds = new Set(window.animeUpdates.map(update => update.id));
  window.animeUpdates = [
    ...releaseStarts.filter(update => !existingIds.has(update.id)),
    ...additions.filter(update => !existingIds.has(update.id)),
    ...window.animeUpdates
  ];
})();
