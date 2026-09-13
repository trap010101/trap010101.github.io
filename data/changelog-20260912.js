// Curated public changelog additions for September 10-12, 2026.
// Only user-visible final results are included here.
(() => {
  const changelog = Array.isArray(window.siteChangelog) ? window.siteChangelog : [];

  const day0910 = {
    date: "2026-09-10",
    groups: [
      {
        id: "navigation-branding",
        title: { ko: "메뉴·브랜딩", ja: "メニュー・ブランディング", en: "Navigation and branding" },
        entries: [
          {
            id: "2026-09-10-shared-menu-and-branding",
            title: { ko: "공통 메뉴 순서·브랜딩 통일", ja: "共通メニュー順・ブランディング統一", en: "Unified shared menu order and branding" },
            summary: {
              ko: "메인과 보조 페이지의 햄버거 메뉴 순서를 동일하게 맞추고, 이벤트 등 하위 페이지의 상단 브랜딩 표현도 newani.me 기준으로 통일해 페이지 사이의 탐색 경험을 정리했습니다.",
              ja: "トップページと各サブページのハンバーガーメニュー順を統一し、イベントなどの下層ページの上部ブランディング表記もnewani.me基準に揃えて、ページ間のナビゲーション体験を整理しました。",
              en: "Standardized the hamburger-menu order across the homepage and secondary pages, and aligned top-level branding on event and other subpages with newani.me for a more consistent navigation experience."
            }
          }
        ]
      }
    ]
  };

  const day0911 = {
    date: "2026-09-11",
    groups: [
      {
        id: "theme-ui",
        title: { ko: "테마·UI", ja: "テーマ・UI", en: "Theme and UI" },
        entries: [
          {
            id: "2026-09-11-light-theme-and-system-scheme",
            title: { ko: "라이트 테마·기기 테마 연동", ja: "ライトテーマ・端末テーマ連動", en: "Light theme and system theme support" },
            summary: {
              ko: "라이트 테마를 추가하고 기본 화면 모드가 기기의 밝기 설정을 따르도록 개선했습니다. 팝업, 공지, 보조 페이지의 제목과 세부 요소도 밝은 화면에서 자연스럽게 보이도록 조정했습니다.",
              ja: "ライトテーマを追加し、既定の表示モードが端末の明暗設定に連動するよう改善しました。ポップアップ、告知、サブページの見出しや細部も明るい画面で自然に見えるよう調整しました。",
              en: "Added a light theme and made the default appearance follow the device color scheme. Popups, notices, secondary-page headings, and supporting UI were also adjusted for consistent light-mode rendering."
            }
          }
        ]
      },
      {
        id: "wishlist",
        title: { ko: "위시리스트", ja: "ウィッシュリスト", en: "Wishlist" },
        entries: [
          {
            id: "2026-09-11-wishlist-display-cleanup",
            title: { ko: "위시리스트 표시 개선", ja: "ウィッシュリスト表示改善", en: "Wishlist display improvements" },
            summary: {
              ko: "찜 목록에서 누락되던 포스터를 복구하고 라벨과 안내 배지 표시를 정리해 저장한 작품 정보를 더 정확하게 확인할 수 있도록 개선했습니다.",
              ja: "ウィッシュリストで欠けていたポスターを復旧し、ラベルと案内バッジの表示を整理して、保存した作品情報をより正確に確認できるよう改善しました。",
              en: "Restored missing posters in the wishlist and cleaned up labels and informational badges so saved title information is displayed more accurately."
            }
          },
          {
            id: "2026-09-11-popularity-ranking-temporarily-hidden",
            title: { ko: "인기 랭킹 임시 비노출", ja: "人気ランキングを一時非表示", en: "Popularity ranking temporarily hidden" },
            summary: {
              ko: "아직 위시리스트 집계량이 충분하지 않은 인기 랭킹은 의미 있는 데이터가 쌓일 때까지 화면에서 숨기고 관련 안내를 정리했습니다.",
              ja: "ウィッシュリストの集計量がまだ十分でない人気ランキングは、意味のあるデータが蓄積されるまで画面から一時的に非表示とし、関連案内も整理しました。",
              en: "Temporarily hid the popularity ranking until enough wishlist data is collected to make the results meaningful, and cleaned up the related guidance."
            }
          }
        ]
      }
    ]
  };

  const day0912 = {
    date: "2026-09-12",
    groups: [
      {
        id: "performance",
        title: { ko: "성능·로딩", ja: "パフォーマンス・読み込み", en: "Performance and loading" },
        entries: [
          {
            id: "2026-09-12-homepage-loading-and-poster-optimization",
            title: { ko: "메인 화면 로딩·포스터 최적화", ja: "トップ画面読み込み・ポスター最適化", en: "Homepage loading and poster optimization" },
            summary: {
              ko: "첫 화면 렌더링과 스크립트 로딩 순서를 정리하고, 큰 포스터 WebP 자산을 다시 최적화했습니다. 화면에 가까운 포스터를 우선 불러오도록 개선해 메인 화면에서 작품 목록을 더 빠르게 확인할 수 있도록 했습니다.",
              ja: "初期画面の描画とスクリプト読み込み順を整理し、大きなポスターWebP素材を再最適化しました。表示領域に近いポスターを優先して読み込むよう改善し、トップ画面の作品一覧をより早く確認できるようにしました。",
              en: "Refined initial rendering and script loading order, recompressed large poster WebP assets, and prioritized posters near the viewport so the homepage title list becomes usable sooner."
            }
          }
        ]
      },
      {
        id: "search",
        title: { ko: "검색·서비스 안내", ja: "検索・サービス案内", en: "Search and service information" },
        entries: [
          {
            id: "2026-09-12-search-identity-and-service-scope",
            title: { ko: "검색 노출 정보·서비스 범위 명확화", ja: "検索表示情報・サービス範囲の明確化", en: "Clearer search identity and service scope" },
            summary: {
              ko: "검색 결과에서 NewAnime이 방영 예정 애니메이션 정보와 공식 시청 경로를 안내하는 서비스라는 점이 명확하게 전달되도록 메타데이터와 소개 문구를 정비했습니다. 메인 화면에도 서비스 범위를 알기 쉽게 안내하는 문구를 추가했습니다.",
              ja: "検索結果でNewAnimeが放送予定アニメ情報と公式視聴先を案内するサービスであることが明確に伝わるよう、メタデータと紹介文を整備しました。トップ画面にもサービス範囲を分かりやすく示す案内を追加しました。",
              en: "Refined metadata and explanatory copy so search results clearly identify NewAnime as a service for upcoming anime information and official viewing destinations, with a matching service-scope notice added to the homepage."
            }
          }
        ]
      },
      {
        id: "content",
        title: { ko: "작품 정보", ja: "作品情報", en: "Title information" },
        entries: [
          {
            id: "2026-09-12-title-and-poster-corrections",
            title: { ko: "한국어 작품명·포스터 추가 정비", ja: "韓国語作品名・ポスター追加整備", en: "Additional Korean title and poster cleanup" },
            summary: {
              ko: "최근 등록 작품을 다시 검수해 여러 한국어 작품명을 바로잡고, 누락되거나 잘못 연결된 포스터를 교체했습니다. 포스터 비율과 썸네일 크롭도 함께 조정해 목록과 상세 화면의 표시를 안정화했습니다.",
              ja: "最近登録した作品を再確認し、複数の韓国語作品名を修正するとともに、欠落または誤接続されたポスターを差し替えました。ポスター比率とサムネイルのクロップも調整し、一覧・詳細画面の表示を安定化しました。",
              en: "Rechecked recently added titles, corrected multiple Korean names, replaced missing or mismatched posters, and adjusted poster ratios and thumbnail crops for more stable list and detail views."
            }
          }
        ]
      }
    ]
  };

  for (const day of [day0910, day0911, day0912]) {
    if (!changelog.some(item => item?.date === day.date)) changelog.unshift(day);
  }

  window.siteChangelog = changelog;
})();