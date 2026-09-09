// Curated public changelog additions for September 8-9, 2026.
// Only user-visible final results are included here.
(() => {
  const changelog = Array.isArray(window.siteChangelog) ? window.siteChangelog : [];

  const day0909 = {
    date: "2026-09-09",
    groups: [
      {
        id: "account",
        title: { ko: "계정", ja: "アカウント", en: "Account" },
        entries: [
          {
            id: "2026-09-09-header-profile-and-verification",
            title: { ko: "로그인 프로필·인증 표시", ja: "ログインプロフィール・認証表示", en: "Signed-in profile and verification badge" },
            summary: {
              ko: "로그인 상태를 바로 확인할 수 있도록 상단에 Google 프로필 이미지를 표시하고, 지정된 인증 계정에는 프로필과 계정 화면에 체크마크가 표시되도록 개선했습니다.",
              ja: "ログイン状態をすぐ確認できるようヘッダーにGoogleプロフィール画像を表示し、指定された認証済みアカウントにはプロフィールとアカウント画面にチェックマークを表示するよう改善しました。",
              en: "Added the signed-in Google profile image to the header for immediate account visibility, plus verification checkmarks on designated verified accounts in the header and account view."
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
