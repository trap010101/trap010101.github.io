// Curated public changelog additions for September 8-9, 2026.
// Only user-visible final results are included here.
(() => {
  const changelog = Array.isArray(window.siteChangelog) ? window.siteChangelog : [];

  const day0909 = {
    date: "2026-09-09",
    groups: [
      {
        id: "account",
        title: { ko: "계정·운영", ja: "アカウント・運営", en: "Account and operations" },
        entries: [
          {
            id: "2026-09-09-header-profile-and-verification",
            title: { ko: "로그인 프로필·인증 표시", ja: "ログインプロフィール・認証表示", en: "Signed-in profile and verification badge" },
            summary: {
              ko: "로그인 상태를 바로 확인할 수 있도록 상단에 Google 프로필 이미지를 표시하고, 지정된 인증 계정에는 프로필과 계정 화면에 체크마크가 표시되도록 개선했습니다. 메인·상세·아카이브 등 페이지가 달라져도 로그인 상태가 일관되게 이어지도록 안정화했습니다.",
              ja: "ログイン状態をすぐ確認できるようヘッダーにGoogleプロフィール画像を表示し、指定された認証済みアカウントにはプロフィールとアカウント画面にチェックマークを表示するよう改善しました。トップ・詳細・アーカイブなどページが変わってもログイン状態が一貫して引き継がれるよう安定化しました。",
              en: "Added the signed-in Google profile image to the header for immediate account visibility, plus verification checkmarks on designated verified accounts. Sign-in state was also stabilized so it remains consistent across the homepage, detail pages, and archives."
            }
          },
          {
            id: "2026-09-09-account-privacy-policy-refresh",
            title: { ko: "계정 기능 관련 개인정보·운영 정책 갱신", ja: "アカウント機能に関するプライバシー・運営方針更新", en: "Account privacy and policy refresh" },
            summary: {
              ko: "Google 로그인과 Supabase 기반 계정·위시리스트 저장 방식이 실제 서비스 동작에 맞게 개인정보처리방침에 반영되었고, 인증 체크마크의 의미도 운영 정책에 명시했습니다.",
              ja: "GoogleログインとSupabaseを利用したアカウント・ウィッシュリスト保存の仕組みを実際のサービス動作に合わせてプライバシーポリシーへ反映し、認証チェックマークの意味も運営方針に明記しました。",
              en: "Updated the privacy policy to reflect Google sign-in and Supabase-backed account and wishlist storage, and clarified the meaning of verification checkmarks in the editorial policy."
            }
          }
        ]
      },
      {
        id: "wishlist",
        title: { ko: "위시리스트", ja: "ウィッシュリスト", en: "Wishlist" },
        entries: [
          {
            id: "2026-09-09-wishlist-session-and-mobile-stability",
            title: { ko: "위시리스트 계정·모바일 안정화", ja: "ウィッシュリストのアカウント・モバイル安定化", en: "Wishlist account and mobile stability" },
            summary: {
              ko: "로그아웃 시 화면의 위시리스트를 초기화하되 계정에 저장된 목록은 유지하도록 동작을 정리했습니다. 모바일에서는 항목이 많아져도 제목과 닫기 영역이 잘리지 않고 목록만 안정적으로 스크롤되도록 개선했습니다.",
              ja: "ログアウト時は画面上のウィッシュリストを初期化しつつ、アカウントに保存された一覧は維持するよう整理しました。モバイルでは項目が増えてもタイトルや閉じる領域が切れず、一覧部分だけを安定してスクロールできるよう改善しました。",
              en: "Refined sign-out so the visible wishlist resets while the account-saved list remains intact. On mobile, long wishlists now keep the title and close controls visible while only the item list scrolls."
            }
          }
        ]
      },
      {
        id: "ui",
        title: { ko: "UI·탐색", ja: "UI・ナビゲーション", en: "UI and navigation" },
        entries: [
          {
            id: "2026-09-09-detail-archive-ui-unification",
            title: { ko: "상세·아카이브 공통 UI 통일", ja: "詳細・アーカイブ共通UIの統一", en: "Unified detail and archive chrome" },
            summary: {
              ko: "작품 상세 페이지와 일정 아카이브의 상단·하단 UI를 메인과 동일한 구조로 통일했습니다. 언어 선택, 햄버거 메뉴, 로그인·위시리스트 동작과 반응형 비율도 함께 정리해 모바일과 데스크톱에서 일관되게 표시됩니다.",
              ja: "作品詳細ページとスケジュールアーカイブのヘッダー・フッターをトップページと同じ構造に統一しました。言語選択、ハンバーガーメニュー、ログイン・ウィッシュリスト動作、レスポンシブ比率も整理し、モバイルとデスクトップで一貫して表示されます。",
              en: "Unified the detail-page and schedule-archive header/footer with the homepage structure, including language selection, hamburger navigation, account/wishlist behavior, and responsive proportions across mobile and desktop."
            }
          },
          {
            id: "2026-09-09-mobile-detail-layout-stability",
            title: { ko: "모바일 작품 상세 레이아웃 안정화", ja: "モバイル作品詳細レイアウトの安定化", en: "Stable mobile detail-page layout" },
            summary: {
              ko: "모바일 작품 상세 페이지에서 포스터·기본 정보·공개 정보를 구조적으로 분리해 영역 겹침과 불규칙한 여백을 줄였습니다. 언어 전환 후에도 동일한 배치가 유지되도록 상세 페이지 구조를 안정화했습니다.",
              ja: "モバイルの作品詳細ページでポスター・基本情報・公開情報を構造的に分離し、領域の重なりや不規則な余白を減らしました。言語切り替え後も同じ配置が維持されるよう詳細ページ構造を安定化しました。",
              en: "Separated the poster, core title information, and release information into a stable mobile structure to prevent overlap and uneven spacing. The detail layout now remains consistent after language changes as well."
            }
          },
          {
            id: "2026-09-09-logo-and-favicon-refresh",
            title: { ko: "로고·사이트 아이콘 개편", ja: "ロゴ・サイトアイコン刷新", en: "Logo and site icon refresh" },
            summary: {
              ko: "헤더 로고를 새 SVG 벡터 자산으로 교체해 투명 배경과 선명도를 유지하도록 적용하고, 파비콘도 새 고양이 아이콘으로 갱신했습니다.",
              ja: "ヘッダーロゴを新しいSVGベクター素材へ置き換え、透明背景と鮮明さを維持するよう適用しました。ファビコンも新しい猫アイコンへ更新しました。",
              en: "Replaced the header logo with the new SVG vector asset to preserve transparency and sharp rendering, and refreshed the favicon with the new cat icon."
            }
          }
        ]
      },
      {
        id: "content",
        title: { ko: "작품 정보", ja: "作品情報", en: "Title information" },
        entries: [
          {
            id: "2026-09-09-korean-title-corrections",
            title: { ko: "한국어 작품명 정정", ja: "韓国語作品名の修正", en: "Korean title corrections" },
            summary: {
              ko: "「타코피의 원죄 -고마워, 또 만나」와 「가끔씩 툭하고 러시아어로 부끄러워하는 옆자리의 아랴 양 Season 2」의 한국어 작품명을 바로잡고 상세·목록 페이지에 동일하게 반영했습니다.",
              ja: "「タコピーの原罪 -ありがとう、また会おう」に相当する韓国語表記と、「時々ボソッとロシア語でデレる隣のアーリャさん Season 2」の韓国語作品名を修正し、詳細・一覧ページへ同一表記で反映しました。",
              en: "Corrected the Korean titles for Takopi's Original Sin - Thank You, See You Again and Alya Sometimes Hides Her Feelings in Russian Season 2, then applied the same wording across list and detail pages."
            }
          }
        ]
      }
    ]
  };

  if (!changelog.some(day => day?.date === day0909.date)) changelog.unshift(day0909);

  const day0908 = changelog.find(day => day?.date === "2026-09-08");
  if (day0908 && !day0908.groups?.some(group => group?.id === "account-wishlist")) {
    day0908.groups = day0908.groups || [];
    day0908.groups.unshift({
      id: "account-wishlist",
      title: { ko: "계정·위시리스트", ja: "アカウント・ウィッシュリスト", en: "Account and wishlist" },
      entries: [
        {
          id: "2026-09-08-google-login-cloud-wishlist",
          title: { ko: "Google 간편 로그인·계정 위시리스트", ja: "Googleかんたんログイン・アカウントウィッシュリスト", en: "Google sign-in and account wishlist" },
          summary: {
            ko: "Google 간편 로그인과 계정 기반 위시리스트 동기화를 추가했습니다. 저장한 작품은 방영 시기 순으로 정리되며, 로그인한 계정의 위시리스트를 여러 기기에서 이어서 사용할 수 있습니다.",
            ja: "Googleかんたんログインとアカウントベースのウィッシュリスト同期を追加しました。保存した作品は公開時期順に整理され、ログイン中のアカウントのウィッシュリストを複数端末で引き続き利用できます。",
            en: "Added quick Google sign-in and account-based wishlist syncing. Saved titles are ordered by release timing and the signed-in account's wishlist can be continued across devices."
          }
        }
      ]
    });
  }

  window.siteChangelog = changelog;
})();