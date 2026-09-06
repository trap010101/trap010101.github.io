// Final-result-only history for 2026-09-06.
(() => {
  if (!Array.isArray(window.animeData)) window.animeData = [];

  const animeId = "site-update-site-information";
  if (!window.animeData.some(anime => anime?.id === animeId)) {
    window.animeData.push({
      id: animeId,
      title: {
        ko: "사이트 운영 정보",
        ja: "サイト運営情報",
        en: "Site information"
      },
      poster: null
    });
  }

  const update = {
    id: "2026-09-06-site-information-pages",
    animeId,
    changedAt: "2026-09-06",
    type: "other",
    summary: {
      ko: "NewAnime의 운영 목적과 독립성, 개인정보 처리, 작품 정보 검증·수정 기준을 확인할 수 있도록 소개·개인정보처리방침·정보 검증 및 운영 정책 페이지를 추가하고 공통 푸터에 연결했습니다.",
      ja: "NewAnimeの運営目的と独立性、個人情報の取り扱い、作品情報の検証・修正基準を確認できるよう、About・プライバシーポリシー・情報検証／運営ポリシーの各ページを追加し、共通フッターから案内するようにしました。",
      en: "Added About, Privacy Policy, and Verification & Editorial Policy pages covering NewAnime's purpose, independence, data practices, and information-verification standards, with links added to the shared footer."
    }
  };

  if (!Array.isArray(window.animeUpdates)) window.animeUpdates = [];
  if (!window.animeUpdates.some(entry => entry?.id === update.id)) {
    window.animeUpdates = [update, ...window.animeUpdates];
  }
})();
