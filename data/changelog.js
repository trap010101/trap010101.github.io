// Curated public changelog for NewAnime.
// This is intentionally result-oriented: temporary workflows, retries, cache bumps,
// and internal-only normalization steps are excluded after reviewing the repository history.
window.siteChangelog = [
  {
    date: "2026-09-06",
    groups: [
      {
        id: "navigation",
        title: { ko: "작품 탐색", ja: "作品ナビゲーション", en: "Browsing" },
        entries: [
          {
            id: "2026-09-06-detail-and-archive-pages",
            title: { ko: "작품 상세 페이지·일정 아카이브", ja: "作品詳細ページ・スケジュールアーカイブ", en: "Anime detail pages and schedule archives" },
            summary: {
              ko: "각 작품의 전용 상세 페이지와 2026·2027 연도별·월별·월 미정 일정 페이지를 추가하고, 홈과 업데이트 내역에서 관련 페이지로 바로 이동할 수 있도록 연결했습니다.",
              ja: "各作品の詳細ページと、2026・2027年の年別・月別・月未定スケジュールページを追加し、ホームや更新履歴から直接移動できるようにしました。",
              en: "Added dedicated anime detail pages plus 2026–2027 yearly, monthly, and month-TBA schedule archives, with direct navigation from the homepage and changelog."
            },
            href: "/2026/"
          },
          {
            id: "2026-09-06-static-seo-navigation",
            title: { ko: "검색·공유용 페이지 구조 개선", ja: "検索・共有向けページ構造の改善", en: "Search and sharing page structure" },
            summary: {
              ko: "작품 상세 페이지와 일정 페이지에 정적 메타데이터, 사이트맵, 이동 경로를 정비해 검색 결과와 직접 링크에서 작품 정보를 찾기 쉽도록 개선했습니다.",
              ja: "作品詳細・スケジュールページの静的メタデータ、サイトマップ、ナビゲーションを整備し、検索結果や直接リンクから作品情報を見つけやすくしました。",
              en: "Improved static metadata, sitemap coverage, and navigation for detail and schedule pages so titles are easier to find from search results and direct links."
            }
          }
        ]
      },
      {
        id: "streaming",
        title: { ko: "스트리밍", ja: "配信", en: "Streaming" },
        entries: [
          {
            id: "2026-09-06-regional-previous-streaming",
            title: { ko: "지역별 이전 시리즈 정주행", ja: "地域別・過去シリーズ配信", en: "Regional previous-series streaming" },
            summary: {
              ko: "이전 시리즈 정주행 정보를 대한민국·일본·미국으로 구분하고, 선택한 시청 지역에서 확인된 직접 스트리밍 링크만 표시하도록 확장했습니다. UI 언어와 시청 지역은 서로 독립적으로 선택할 수 있습니다.",
              ja: "過去シリーズの配信情報を韓国・日本・米国に分け、選択した視聴地域で確認済みの直接配信リンクだけを表示するよう拡張しました。UI言語と視聴地域は個別に選択できます。",
              en: "Expanded catch-up streaming for previous installments by South Korea, Japan, and the United States, showing only verified direct streaming links for the selected region. UI language and streaming region can be selected independently."
            }
          }
        ]
      },
      {
        id: "site",
        title: { ko: "사이트 운영·UI", ja: "サイト運営・UI", en: "Site operations and UI" },
        entries: [
          {
            id: "2026-09-06-site-information-pages",
            title: { ko: "운영 정보 페이지", ja: "運営情報ページ", en: "Site information pages" },
            summary: {
              ko: "NewAnime 소개, 개인정보처리방침, 정보 검증 및 운영 정책을 추가하고 공통 푸터에서 확인할 수 있도록 연결했습니다.",
              ja: "NewAnimeについて、プライバシーポリシー、情報検証・運営ポリシーを追加し、共通フッターから確認できるようにしました。",
              en: "Added About, Privacy Policy, and Verification & Editorial Policy pages and linked them from the shared footer."
            },
            href: "/about/"
          },
          {
            id: "2026-09-06-operations-foundation",
            title: { ko: "운영 분석·광고 연동 기반", ja: "運営分析・広告連携基盤", en: "Analytics and advertising foundation" },
            summary: {
              ko: "사이트 이용 현황을 확인할 수 있는 분석 도구와 광고 서비스 연동에 필요한 기본 설정을 추가했습니다.",
              ja: "サイト利用状況を把握するための分析ツールと、広告サービス連携に必要な基本設定を追加しました。",
              en: "Added analytics and the baseline configuration required for advertising-service integration."
            }
          },
          {
            id: "2026-09-06-header-language-title-ui",
            title: { ko: "헤더·언어 선택·제목 표시 개선", ja: "ヘッダー・言語選択・タイトル表示の改善", en: "Header, language selector, and title display" },
            summary: {
              ko: "언어 선택을 компакт한 드롭다운으로 정리하고 모바일 햄버거 메뉴 정렬과 긴 작품명의 줄바꿈을 개선했습니다.",
              ja: "言語選択をコンパクトなドロップダウンに整理し、モバイルのハンバーガーメニュー配置と長い作品名の改行表示を改善しました。",
              en: "Changed language selection to a compact dropdown and refined mobile menu alignment and line wrapping for long anime titles."
            }
          },
          {
            id: "2026-09-06-changelog-overhaul",
            title: { ko: "업데이트 내역 전면 정리", ja: "更新履歴の全面整理", en: "Changelog overhaul" },
            summary: {
              ko: "사이트 오픈 이후의 작업 기록을 다시 검수해 중간 시행착오와 내부 작업을 제외하고, 최종 결과만 날짜와 주제별로 읽을 수 있는 changelog 형태로 재구성했습니다.",
              ja: "サイト公開以降の作業履歴を再確認し、途中の試行錯誤や内部作業を除外して、最終結果だけを日付・テーマ別に読める変更履歴へ再構成しました。",
              en: "Re-audited work since launch and rebuilt the public changelog around final results by date and topic, excluding retries, temporary workflows, and internal-only steps."
            },
            href: "/updates/"
          }
        ]
      },
      {
        id: "content",
        title: { ko: "작품 정보", ja: "作品情報", en: "Title information" },
        entries: [
          {
            id: "2026-09-06-monogatari-winter-precision",
            title: { ko: "모노가타리 시리즈 오프 & 몬스터 시즌", ja: "〈物語〉シリーズ オフ＆モンスターシーズン", en: "MONOGATARI Series: Off & Monster Season" },
            summary: {
              ko: "겨울 공개 예정 정보를 12월 확정으로 오해하지 않도록 ‘2026년 겨울 · 월 미정’으로 바로잡았습니다.",
              ja: "冬公開予定を12月確定と誤解しないよう、「2026年冬・月未定」に修正しました。",
              en: "Corrected the winter release window to “Winter 2026 · Month TBA” so it is not presented as a confirmed December release."
            },
            href: "/anime/monogatari-series-off-and-monster-season-wazamonogatari-karen-ogre/"
          }
        ]
      }
    ]
  },
  {
    date: "2026-09-05",
    groups: [
      {
        id: "release",
        title: { ko: "방영 일정", ja: "放送スケジュール", en: "Release schedule" },
        entries: [
          {
            id: "2026-09-05-month-tba-display-final",
            title: { ko: "월 미정 작품 분리", ja: "月未定作品の分離", en: "Separate month-TBA sections" },
            summary: {
              ko: "연도는 확정됐지만 월이 발표되지 않은 작품을 연도별 ‘월 미정’ 구역으로 분리하고, 카드에는 확정된 범위까지만 표시하도록 정리했습니다.",
              ja: "年は確定しているものの月が未発表の作品を年別の「月未定」セクションに分け、カードには確認済みの範囲だけを表示するよう整理しました。",
              en: "Moved titles with a confirmed year but no announced month into year-specific Month TBA sections and limited card labels to confirmed information only."
            }
          },
          {
            id: "2026-09-05-golden-kamuy-runaway-train-release",
            title: { ko: "골든 카무이 최종장 폭주열차편", ja: "ゴールデンカムイ 最終章 暴走列車編", en: "Golden Kamuy Final Chapter: Runaway Train Arc" },
            summary: { ko: "방영 시기를 2027년 1월로 바로잡았습니다.", ja: "放送時期を2027年1月に修正しました。", en: "Corrected the broadcast window to January 2027." },
            href: "/anime/golden-kamuy-final-chapter-runaway-train-arc/"
          }
        ]
      },
      {
        id: "streaming",
        title: { ko: "스트리밍·공식 자료", ja: "配信・公式資料", en: "Streaming and official resources" },
        entries: [
          {
            id: "2026-09-05-previous-series-streaming-final",
            title: { ko: "이전 시리즈 정주행", ja: "過去シリーズ一気見", en: "Catch up on previous series" },
            summary: {
              ko: "아직 공개 전인 예정작 자체의 스트리밍 연결은 제거하고, 시리즈 작품에는 현재 시청 가능한 이전 애니메이션의 검증된 정주행 링크만 제공하도록 정책을 정리했습니다.",
              ja: "未公開の新作そのものへの配信リンクを削除し、シリーズ作品では現在視聴できる過去アニメの確認済みリンクだけを案内する方針に整理しました。",
              en: "Removed streaming links that implied availability for unreleased upcoming titles and limited series catch-up links to verified, currently streamable earlier installments."
            }
          },
          {
            id: "2026-09-05-official-resource-audit",
            title: { ko: "공식 사이트·PV 전수 보완", ja: "公式サイト・PVの補完", en: "Official-site and PV audit" },
            summary: {
              ko: "누락되거나 잘못 연결된 공식 사이트와 공식 PV를 전반적으로 재검수해 보완하고, 「이 멋진 세계에 축복을! 4」 공식 발표 영상도 추가했습니다.",
              ja: "不足・誤接続していた公式サイトと公式PVを全体的に再確認して補完し、『この素晴らしい世界に祝福を！4』の公式発表映像も追加しました。",
              en: "Re-audited and filled missing or incorrect official-site and official-PV links, including the official KONOSUBA Season 4 announcement video."
            }
          }
        ]
      },
      {
        id: "content",
        title: { ko: "작품 정보 정비", ja: "作品情報の整備", en: "Title information cleanup" },
        entries: [
          {
            id: "2026-09-05-verification-final",
            title: { ko: "미검증 작품 공식 출처 재검수", ja: "未検証作品の公式情報再確認", en: "Official-source verification pass" },
            summary: {
              ko: "미검증 상태였던 작품을 공식 출처와 대조하고, 확인이 끝난 작품에는 제목 옆 검증 체크가 표시되도록 갱신했습니다.",
              ja: "未検証だった作品を公式情報と照合し、確認済みの作品にはタイトル横に検証チェックが表示されるよう更新しました。",
              en: "Checked previously unverified titles against official sources and enabled the verification check beside titles that passed review."
            }
          },
          {
            id: "2026-09-05-dating-a-dark-summoner-title",
            title: { ko: "다크서머너와 썸을 탔다", ja: "ダークサモナーと付き合っている", en: "Dating a Dark Summoner" },
            summary: { ko: "한국어 제목을 「다크서머너와 썸을 탔다」로 수정했습니다.", ja: "韓国語タイトルを『다크서머너와 썸을 탔다』に修正しました。", en: "Corrected the Korean title to “다크서머너와 썸을 탔다.”" },
            href: "/anime/dating-a-dark-summoner/"
          },
          {
            id: "2026-09-05-poster-corrections",
            title: { ko: "케로로☆·나와 유우 형! 포스터", ja: "ケロロ☆・俺と悠兄！ポスター", en: "Keroro☆ and Me and Big Bro Yuu posters" },
            summary: {
              ko: "「개구리 중사 케로로☆」는 제공된 최신 비주얼로 교체하고, 「나와 유우 형!」은 잘못 연결된 포스터를 올바른 이미지로 수정했습니다.",
              ja: "『ケロロ軍曹☆』は提供された最新ビジュアルへ差し替え、『俺と悠兄！』は誤っていたポスターを正しい画像へ修正しました。",
              en: "Replaced the Keroro☆ poster with the provided latest visual and corrected the incorrectly linked poster for Me and Big Bro Yuu."
            }
          }
        ]
      },
      {
        id: "ui",
        title: { ko: "UI 개선", ja: "UI改善", en: "UI improvements" },
        entries: [
          {
            id: "2026-09-05-resource-and-category-ui",
            title: { ko: "리소스 버튼·카테고리 UI", ja: "リソースボタン・カテゴリUI", en: "Resource buttons and category UI" },
            summary: {
              ko: "PV·스트리밍·공식 사이트 버튼의 화살표 표현과 크기를 통일하고, 카테고리 색상과 선택 상태의 호버 잘림을 개선했습니다. 업데이트 페이지도 이미지 없이 텍스트 중심으로 정돈했습니다.",
              ja: "PV・配信・公式サイトボタンの矢印表現とサイズを統一し、カテゴリ配色と選択時のホバー切れを改善しました。更新ページも画像を使わないテキスト中心の構成に整理しました。",
              en: "Standardized arrow styling and sizing across PV, streaming, and official-site buttons; refined category colors and selected-chip hover clipping; and simplified the updates page into a text-focused layout."
            }
          }
        ]
      }
    ]
  },
  {
    date: "2026-09-04",
    groups: [
      {
        id: "foundation",
        title: { ko: "정보 검증·변경 추적", ja: "情報検証・変更履歴", en: "Verification and change tracking" },
        entries: [
          {
            id: "2026-09-04-verification-foundation",
            title: { ko: "공식 출처 검증 기반 도입", ja: "公式情報源の検証基盤", en: "Official-source verification foundation" },
            summary: {
              ko: "작품마다 안정적인 ID와 방영 지역·정확도·검증 출처·확인일을 관리할 수 있도록 데이터 구조를 정비하고, 공식 출처 확인 상태를 실제 화면에 표시하는 기반을 도입했습니다.",
              ja: "作品ごとに安定したID、公開地域、日付精度、検証情報源、確認日を管理できるようデータ構造を整備し、公式情報の確認状態を画面に表示する基盤を導入しました。",
              en: "Introduced a structured foundation for stable title IDs, regional releases, date precision, verification sources, and check dates, with verified status surfaced in the UI."
            }
          },
          {
            id: "2026-09-04-recent-updates-page",
            title: { ko: "최근 업데이트 페이지", ja: "最近の更新ページ", en: "Recent Updates page" },
            summary: {
              ko: "중요한 작품 정보 변경을 별도로 확인할 수 있는 최근 업데이트 화면을 추가하고, 이후 메인 화면 대신 햄버거 메뉴에서 접근하도록 정리했습니다.",
              ja: "重要な作品情報の変更を確認できる更新ページを追加し、その後ホーム画面ではなくハンバーガーメニューからアクセスする構成に整理しました。",
              en: "Added a dedicated Recent Updates view for important information changes and moved access from the homepage into the hamburger menu."
            },
            href: "/updates/"
          },
          {
            id: "2026-09-04-pv-modal",
            title: { ko: "PV 선택 메뉴", ja: "PV選択メニュー", en: "PV selection menu" },
            summary: {
              ko: "한 작품에 여러 공식 영상이 있는 경우 티저·PV 등을 한곳에서 선택할 수 있도록 PV 데이터를 구조화하고 선택 팝업을 추가했습니다.",
              ja: "1作品に複数の公式映像がある場合にティザーやPVをまとめて選べるよう、PVデータを整理し選択ポップアップを追加しました。",
              en: "Structured PV data and added a selection popup so multiple official teasers and PVs for the same title can be chosen from one menu."
            }
          }
        ]
      },
      {
        id: "new",
        title: { ko: "신규 작품", ja: "新規作品", en: "New titles" },
        entries: [
          {
            id: "2026-09-04-the-worlds-finest-assassin-season-2-added",
            title: { ko: "세계 최고의 암살자, 이세계 귀족으로 전생하다 Season 2", ja: "世界最高の暗殺者、異世界貴族に転生する Season 2", en: "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat Season 2" },
            summary: { ko: "2027년 1월 방영 예정으로 신규 등록하고 메인 PV 1탄을 추가했습니다.", ja: "2027年1月放送予定として新規登録し、メインPV第1弾を追加しました。", en: "Added Season 2 with its January 2027 broadcast window and first main PV." },
            href: "/anime/the-worlds-finest-assassin-season-2/",
            source: { label: { ko: "공식 X 발표", ja: "公式X発表", en: "Official X announcement" }, url: "https://x.com/ansatsu_kizoku/status/2095708679857213795" }
          },
          {
            id: "2026-09-04-keroro-gunso-star-added",
            title: { ko: "개구리 중사 케로로☆", ja: "ケロロ軍曹☆", en: "Sgt. Frog☆" },
            summary: { ko: "완전 신작 TV 애니메이션을 신규 등록하고 2026년 10월 방영 예정으로 반영했습니다.", ja: "完全新作TVアニメを新規登録し、2026年10月放送予定として反映しました。", en: "Added the all-new TV anime with its confirmed October 2026 broadcast window." },
            href: "/anime/keroro-gunso-star/",
            source: { label: { ko: "공식 X 발표", ja: "公式X発表", en: "Official X announcement" }, url: "https://x.com/keroro_anime/status/2095784141308809403" }
          }
        ]
      },
      {
        id: "release",
        title: { ko: "방영·공개 정보", ja: "放送・公開情報", en: "Release information" },
        entries: [
          {
            id: "2026-09-04-forbidden-city-cat-guard-room-release-date",
            title: { ko: "자금·어묘방 ~자금성 고양이 경비실~", ja: "紫禁・御猫房 ～紫禁城猫警備室～", en: "Forbidden City Cat Guard Room" },
            summary: { ko: "일본 방영일을 2026년 10월 10일로 갱신했습니다.", ja: "日本放送日を2026年10月10日に更新しました。", en: "Updated the Japanese broadcast date to October 10, 2026." },
            href: "/anime/forbidden-city-cat-guard-room/",
            source: { label: { ko: "공식 사이트", ja: "公式サイト", en: "Official website" }, url: "https://nekokeibishitsu-anime.com/news/post-2/" }
          },
          {
            id: "2026-09-04-release-delays",
            title: { ko: "공식 연기 발표 반영", ja: "公式延期発表の反映", en: "Official delay notices" },
            summary: {
              ko: "「전생한 대성녀는 성녀임을 숨긴다」, 「탐정은 이미 죽었다. Season 2」, 「좀비가 넘쳐나는 세상에서 나만 습격당하지 않는다」의 공식 방영 연기 상태를 반영했습니다.",
              ja: "『転生した大聖女は、聖女であることをひた隠す』、『探偵はもう、死んでいる。Season 2』、『ゾンビのあふれた世界で俺だけが襲われない』の公式延期情報を反映しました。",
              en: "Recorded official delays for A Tale of the Secret Saint, The Detective Is Already Dead Season 2, and In a World Overrun with Zombies, I'm the Only One They Don't Attack."
            }
          }
        ]
      },
      {
        id: "streaming",
        title: { ko: "스트리밍 정보", ja: "配信情報", en: "Streaming information" },
        entries: [
          {
            id: "2026-09-04-streaming-announcements",
            title: { ko: "글로벌 공개 서비스 반영", ja: "グローバル配信サービスの反映", en: "Global streaming announcements" },
            summary: {
              ko: "「데몬즈 크레스트」의 Prime Video 글로벌 독점, 「풀 나이트」의 Netflix 글로벌 독점, 「카구라바치」의 Crunchyroll 동시 공개 안내를 반영했습니다.",
              ja: "『デモンズ・クレスト』のPrime Video世界独占、『フールナイト』のNetflix世界独占、『カグラバチ』のCrunchyroll同時配信情報を反映しました。",
              en: "Added the Prime Video worldwide exclusive for Demons' Crest, Netflix worldwide exclusive for Fool Night, and Crunchyroll simulcast announcement for Kagurabachi."
            }
          }
        ]
      }
    ]
  },
  {
    date: "2026-09-03",
    groups: [
      {
        id: "content",
        title: { ko: "작품·분류 정보", ja: "作品・分類情報", en: "Titles and classification" },
        entries: [
          {
            id: "2026-09-03-tiger-coming-in-2",
            title: { ko: "호랑이 들어와요 2", ja: "虎が入ってきます 2", en: "Tiger Coming In 2" },
            summary: { ko: "새로 발표된 「호랑이 들어와요 2」를 일정에 추가했습니다.", ja: "新たに発表された『虎が入ってきます 2』をスケジュールに追加しました。", en: "Added the newly announced Tiger Coming In 2 to the schedule." },
            href: "/anime/tiger-coming-in-2/"
          },
          {
            id: "2026-09-03-game-origin-filter",
            title: { ko: "게임 원작 태그·필터", ja: "ゲーム原作タグ・フィルター", en: "Game-origin tag and filter" },
            summary: { ko: "게임을 원작으로 한 작품을 구분할 수 있도록 ‘게임 원작’ 태그와 필터를 추가하고 해당 작품 분류를 정비했습니다.", ja: "ゲーム原作作品を区別できるよう「ゲーム原作」タグとフィルターを追加し、該当作品の分類を整備しました。", en: "Added a Game-origin tag and filter and classified applicable titles accordingly." }
          },
          {
            id: "2026-09-03-title-link-visual-corrections",
            title: { ko: "제목·공식 링크·비주얼 정정", ja: "タイトル・公式リンク・ビジュアル修正", en: "Title, official-link, and visual corrections" },
            summary: {
              ko: "한국어 현지화 제목을 다시 검수하고, 잘못되거나 누락된 스트리밍·공식 링크를 수정했으며 일부 작품의 키비주얼을 최신 이미지로 교체했습니다.",
              ja: "韓国語ローカライズタイトルを再確認し、誤り・不足のあった配信・公式リンクを修正するとともに、一部作品のキービジュアルを最新画像へ差し替えました。",
              en: "Rechecked Korean localized titles, corrected missing or incorrect streaming and official links, and refreshed key visuals for selected titles."
            }
          }
        ]
      }
    ]
  },
  {
    date: "2026-09-02",
    groups: [
      {
        id: "brand",
        title: { ko: "브랜딩·UI", ja: "ブランディング・UI", en: "Branding and UI" },
        entries: [
          {
            id: "2026-09-02-newanime-branding",
            title: { ko: "NewAnime 브랜딩 적용", ja: "NewAnimeブランディング適用", en: "NewAnime branding" },
            summary: {
              ko: "NewAnime 로고와 파비콘을 추가하고 헤더·푸터 문구를 정리했으며, 모바일을 포함한 히어로 영역과 언어 전환 UI를 다듬었습니다.",
              ja: "NewAnimeロゴとファビコンを追加し、ヘッダー・フッター文言を整理するとともに、モバイルを含むヒーロー領域と表示言語UIを調整しました。",
              en: "Added the NewAnime logo and favicon, refined header/footer copy, and improved the responsive hero and language-aware UI."
            }
          },
          {
            id: "2026-09-02-language-aware-metadata",
            title: { ko: "언어별 화면·메타데이터 연동", ja: "言語別UI・メタデータ連動", en: "Language-aware UI and metadata" },
            summary: {
              ko: "KR·JP·EN 전환 시 화면 문구와 브라우저 제목·검색 메타데이터가 함께 바뀌도록 수정하고, 언어별 사이트맵 항목을 추가했습니다.",
              ja: "KR・JP・EN切り替え時に画面文言、ブラウザタイトル、検索メタデータが連動するよう修正し、言語別サイトマップ項目を追加しました。",
              en: "Made visible copy, browser titles, and search metadata follow the KR/JP/EN language selection and added localized sitemap entries."
            }
          }
        ]
      },
      {
        id: "content",
        title: { ko: "작품 데이터 정비", ja: "作品データ整備", en: "Title data cleanup" },
        entries: [
          {
            id: "2026-09-02-poster-localization",
            title: { ko: "공식 포스터·로컬 이미지 정비", ja: "公式ポスター・ローカル画像整備", en: "Official posters and local assets" },
            summary: {
              ko: "외부 이미지가 깨지거나 잘못 연결되는 문제를 줄이기 위해 주요 포스터를 공식 비주얼로 다시 검수하고 로컬 자산으로 저장했습니다. 비블리아 고서당 사건수첩과 원피스 필름 갓 밸리 등 잘못된 비주얼도 수정했습니다.",
              ja: "外部画像の破損・誤接続を減らすため主要ポスターを公式ビジュアルで再確認し、ローカル資産として保存しました。『ビブリア古書堂の事件手帖』やONE PIECE FILM GOD VALLEYなどの誤ったビジュアルも修正しました。",
              en: "Re-audited major posters against official visuals and localized assets to reduce broken external images, including corrections for The Case Records of the Biblia Secondhand Bookstore and One Piece Film: God Valley."
            }
          },
          {
            id: "2026-09-02-origin-categories",
            title: { ko: "원작 분류 확대", ja: "原作カテゴリ拡張", en: "Expanded source categories" },
            summary: { ko: "원작 분류에 웹툰·웹소설을 추가하고 한국어 작품명과 분류 데이터를 함께 재검수했습니다.", ja: "原作分類にウェブトゥーン・Web小説を追加し、韓国語タイトルと分類データをあわせて再確認しました。", en: "Added Webtoon and Web Novel source categories and rechecked Korean titles and source classification data." }
          }
        ]
      },
      {
        id: "schedule",
        title: { ko: "일정 표시", ja: "スケジュール表示", en: "Schedule display" },
        entries: [
          {
            id: "2026-09-02-schedule-coverage-sort",
            title: { ko: "2027 일정 범위·정렬 개선", ja: "2027年スケジュール範囲・並び順改善", en: "2027 schedule coverage and sorting" },
            summary: {
              ko: "2027년 11·12월 구역을 추가하고, 같은 달의 작품은 확정된 방영일이 빠른 순서로 먼저 보이도록 정렬을 개선했습니다.",
              ja: "2027年11・12月のセクションを追加し、同じ月の作品は確定放送日が早い順に表示されるよう並び順を改善しました。",
              en: "Added November and December 2027 sections and changed monthly ordering so titles with confirmed earlier dates appear first."
            }
          }
        ]
      }
    ]
  },
  {
    date: "2026-09-01",
    groups: [
      {
        id: "site",
        title: { ko: "사이트 기반", ja: "サイト基盤", en: "Site foundation" },
        entries: [
          {
            id: "2026-09-01-domain-seo",
            title: { ko: "newani.me 도메인·검색 메타데이터", ja: "newani.meドメイン・検索メタデータ", en: "newani.me domain and search metadata" },
            summary: {
              ko: "newani.me 도메인을 기준 주소로 연결하고 검색 설명, canonical, Open Graph, Twitter Card, robots.txt, sitemap.xml 등 기본 검색·공유 메타데이터를 추가했습니다.",
              ja: "newani.meを基準URLとして設定し、検索説明、canonical、Open Graph、Twitter Card、robots.txt、sitemap.xmlなど基本的な検索・共有メタデータを追加しました。",
              en: "Established newani.me as the canonical site address and added baseline search/share metadata including descriptions, canonical tags, Open Graph, Twitter Cards, robots.txt, and sitemap.xml."
            }
          },
          {
            id: "2026-09-01-language-contact",
            title: { ko: "다국어 제목·문의 경로", ja: "多言語タイトル・お問い合わせ", en: "Localized titles and contact" },
            summary: {
              ko: "KR·JP·EN 선택에 맞춰 사이트 제목이 바뀌도록 정리하고 푸터에 운영 문의 이메일을 추가했습니다.",
              ja: "KR・JP・ENの選択に合わせてサイトタイトルが切り替わるよう整理し、フッターに運営問い合わせメールを追加しました。",
              en: "Made the site title follow the KR/JP/EN selection and added an operator contact email to the footer."
            }
          }
        ]
      },
      {
        id: "audit",
        title: { ko: "작품 정보 전수 점검", ja: "作品情報の全体点検", en: "Title information audit" },
        entries: [
          {
            id: "2026-09-01-links-dates",
            title: { ko: "PV·스트리밍·방영일 보완", ja: "PV・配信・放送日の補完", en: "PV, streaming, and air-date updates" },
            summary: {
              ko: "작품별 PV와 스트리밍 링크를 대규모로 보완하고, 공식 발표가 확인된 작품의 방영일을 갱신했습니다.",
              ja: "作品ごとのPV・配信リンクを大幅に補完し、公式発表を確認できた作品の放送日を更新しました。",
              en: "Substantially expanded per-title PV and streaming links and updated confirmed air dates from official announcements."
            }
          },
          {
            id: "2026-09-01-posters",
            title: { ko: "키비주얼·포스터 보완", ja: "キービジュアル・ポスター補完", en: "Key visual and poster updates" },
            summary: {
              ko: "누락된 작품 이미지를 추가하고 잘못된 포스터와 링크를 수정했으며, 가로형 비주얼이 카드에서 자연스럽게 보이도록 크롭 위치를 조정했습니다.",
              ja: "不足していた作品画像を追加し、誤ったポスターやリンクを修正するとともに、横長ビジュアルがカード上で自然に見えるよう切り抜き位置を調整しました。",
              en: "Added missing key visuals, corrected poster/link errors, and tuned crop positions so wide visuals display cleanly on cards."
            }
          }
        ]
      }
    ]
  },
  {
    date: "2026-08-31",
    groups: [
      {
        id: "content",
        title: { ko: "작품 추가", ja: "作品追加", en: "Title addition" },
        entries: [
          {
            id: "2026-08-31-spice-and-wolf-season-2",
            title: { ko: "늑대와 향신료 2기", ja: "狼と香辛料 2期", en: "Spice and Wolf Season 2" },
            summary: { ko: "방영 연도가 확정된 예정작으로 목록에 추가했습니다. 당시 월은 미정 상태로 등록했습니다.", ja: "放送年が決定している予定作品として追加し、当時は放送月未定として登録しました。", en: "Added the announced second season to the upcoming list with its year confirmed and month still TBA at the time." },
            href: "/anime/spice-and-wolf-merchant-meets-the-wise-wolf-season-2/"
          }
        ]
      }
    ]
  },
  {
    date: "2026-08-28",
    groups: [
      {
        id: "launch",
        title: { ko: "사이트 공개", ja: "サイト公開", en: "Launch" },
        entries: [
          {
            id: "2026-08-28-initial-launch",
            title: { ko: "방영 예정 애니메이션 일정 사이트 시작", ja: "放送予定アニメスケジュール公開", en: "Upcoming anime schedule launched" },
            summary: {
              ko: "2026·2027 방영 예정 애니메이션을 월별로 확인할 수 있는 첫 버전을 공개했습니다. 작품 검색, 카테고리 필터, 월 이동, 확정 일정 카드와 월 미정 목록을 기본 기능으로 제공했습니다.",
              ja: "2026・2027年放送予定アニメを月別に確認できる初期版を公開しました。作品検索、カテゴリフィルター、月移動、確定日程カード、月未定一覧を基本機能として提供しました。",
              en: "Launched the first version for browsing 2026–2027 upcoming anime by month, with title search, category filters, month navigation, confirmed schedule cards, and a month-TBA list."
            },
            href: "/"
          }
        ]
      }
    ]
  }
];
