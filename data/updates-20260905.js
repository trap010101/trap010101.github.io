// Final-result-only history for 2026-09-05.
// Intermediate audit, cache-busting, and follow-up implementation steps are intentionally omitted.
(() => {
  const additions = [
    {
      id: "2026-09-05-month-tba-display-final",
      changedAt: "2026-09-05",
      type: "release-window",
      title: {
        ko: "월 미정 작품 표시",
        ja: "月未定作品の表示",
        en: "Month-TBA releases"
      },
      summary: {
        ko: "월이 확정되지 않은 작품을 연도별 별도 구역으로 분리하고, 카드에는 확정된 연도만 표시하도록 정리했습니다.",
        ja: "放送月が未定の作品を年ごとの専用セクションに分け、カードには確定している年のみ表示するよう整理しました。",
        en: "Titles without a confirmed month are now grouped in separate year-specific sections, with cards showing only the confirmed year."
      }
    },
    {
      id: "2026-09-05-previous-series-streaming-final",
      changedAt: "2026-09-05",
      type: "streaming-updated",
      title: {
        ko: "이전 시리즈 정주행",
        ja: "過去シリーズ一気見",
        en: "Previous-series streaming"
      },
      summary: {
        ko: "예정작 자체의 스트리밍 연결은 제거하고, 시리즈 작품에는 검증된 이전 애니메이션의 정주행 링크만 표시하도록 정리했습니다.",
        ja: "放送予定作品そのものへの配信リンクは削除し、シリーズ作品では確認済みの過去アニメを視聴できるリンクだけを表示するよう整理しました。",
        en: "Streaming links for the upcoming installments were removed, and series titles now show only verified catch-up links for earlier anime installments."
      }
    },
    {
      id: "2026-09-05-official-links-final",
      changedAt: "2026-09-05",
      type: "official-link",
      title: {
        ko: "공식 사이트 링크",
        ja: "公式サイトリンク",
        en: "Official site links"
      },
      summary: {
        ko: "누락된 공식 사이트 링크를 보완하고, 공식 사이트가 확인된 작품은 해당 페이지로 바로 연결되도록 정리했습니다.",
        ja: "不足していた公式サイトリンクを補完し、公式サイトを確認できた作品は該当ページへ直接移動できるよう整理しました。",
        en: "Missing official-site links were filled in, and titles with confirmed official sites now link directly to those pages."
      }
    },
    {
      id: "2026-09-05-pv-links-final",
      changedAt: "2026-09-05",
      type: "pv",
      title: {
        ko: "공식 PV 링크",
        ja: "公式PVリンク",
        en: "Official PV links"
      },
      summary: {
        ko: "누락된 공식 PV 링크를 복구하고, 「이 멋진 세계에 축복을! 4」의 공식 발표 영상을 추가했습니다.",
        ja: "不足していた公式PVリンクを復旧し、『この素晴らしい世界に祝福を！4』の公式発表映像を追加しました。",
        en: "Missing official PV links were restored, and the official announcement video for KONOSUBA Season 4 was added."
      }
    },
    {
      id: "2026-09-05-verification-final",
      changedAt: "2026-09-05",
      type: "source",
      title: {
        ko: "작품 정보 검증",
        ja: "作品情報の検証",
        en: "Anime information verification"
      },
      summary: {
        ko: "미검증 상태였던 작품을 공식 출처와 대조해 검수하고, 확인이 완료된 작품에 검증 체크가 표시되도록 갱신했습니다.",
        ja: "未検証だった作品を公式情報と照合し、確認が完了した作品に検証チェックが表示されるよう更新しました。",
        en: "Previously unverified titles were checked against official sources, and verified titles were updated to display the verification check."
      }
    },
    {
      id: "2026-09-05-golden-kamuy-runaway-train-release",
      animeId: "golden-kamuy-final-chapter-runaway-train-arc",
      changedAt: "2026-09-05",
      type: "release-window",
      fields: ["release.japan"],
      summary: {
        ko: "방영 시기를 2027년 1월로 바로잡았습니다.",
        ja: "放送時期を2027年1月に修正しました。",
        en: "The broadcast window was corrected to January 2027."
      }
    },
    {
      id: "2026-09-05-dating-a-dark-summoner-title",
      animeId: "dating-a-dark-summoner",
      changedAt: "2026-09-05",
      type: "title",
      fields: ["title.ko"],
      title: {
        ko: "다크서머너와 썸을 탔다",
        ja: "ダークサモナーとデキている",
        en: "Dating a Dark Summoner"
      },
      summary: {
        ko: "한국어 제목을 「다크서머너와 썸을 탔다」로 수정했습니다.",
        ja: "韓国語タイトルを『다크서머너와 썸을 탔다』に修正しました。",
        en: "The Korean title was corrected to “다크서머너와 썸을 탔다.”"
      }
    },
    {
      id: "2026-09-05-keroro-poster",
      animeId: "keroro-gunso-star",
      changedAt: "2026-09-05",
      type: "poster",
      fields: ["poster"],
      summary: {
        ko: "포스터 이미지를 제공된 최신 비주얼로 교체했습니다.",
        ja: "ポスター画像を提供された最新ビジュアルに差し替えました。",
        en: "The poster was replaced with the provided latest visual."
      }
    },
    {
      id: "2026-09-05-me-and-big-bro-yuu-poster",
      animeId: "me-and-big-bro-yuu",
      changedAt: "2026-09-05",
      type: "poster",
      fields: ["poster"],
      summary: {
        ko: "잘못 연결된 포스터를 올바른 이미지로 교체했습니다.",
        ja: "誤って紐づいていたポスターを正しい画像に差し替えました。",
        en: "The incorrectly linked poster was replaced with the correct image."
      }
    },
    {
      id: "2026-09-05-ui-final",
      changedAt: "2026-09-05",
      type: "other",
      title: {
        ko: "사이트 UI 개선",
        ja: "サイトUI改善",
        en: "Site UI improvements"
      },
      summary: {
        ko: "PV·스트리밍·공식 사이트 버튼의 화살표 표현을 정리하고, 카테고리 색상과 선택 시 호버 잘림을 개선했으며, 최근 업데이트 화면을 텍스트 중심 레이아웃으로 정돈했습니다.",
        ja: "PV・配信・公式サイトボタンの矢印表現を統一し、カテゴリ配色と選択時のホバー切れを改善するとともに、最近の更新ページをテキスト中心のレイアウトに整理しました。",
        en: "Resource-button arrows were standardized, category colors and selected-chip hover clipping were improved, and the Recent Updates page was refined into a text-focused layout."
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
