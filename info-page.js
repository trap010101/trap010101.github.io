(() => {
  const supportedLanguages = ["ko", "ja", "en"];
  const localeMeta = {
    about: {
      ko: { title: "NewAnime 소개", description: "NewAnime의 운영 목적, 제공 정보, 독립성 및 권리 관련 안내를 확인하세요." },
      ja: { title: "NewAnimeについて", description: "NewAnimeの運営目的、提供情報、独立性、権利に関する案内です。" },
      en: { title: "About NewAnime", description: "Learn about NewAnime, its purpose, information scope, independence, and rights notice." }
    },
    privacy: {
      ko: { title: "개인정보처리방침", description: "NewAnime의 Google 로그인, 계정·위시리스트, 분석, 브라우저 저장소, 광고 및 문의 데이터 처리 방침입니다." },
      ja: { title: "プライバシーポリシー", description: "NewAnimeにおけるGoogleログイン、アカウント・ウィッシュリスト、解析、ブラウザストレージ、広告、お問い合わせデータの取り扱い方針です。" },
      en: { title: "Privacy Policy", description: "How NewAnime handles Google sign-in, account and wishlist data, analytics, browser storage, advertising, and contact data." }
    },
    policy: {
      ko: { title: "정보 검증 및 운영 정책", description: "NewAnime의 작품 정보 검증 기준, 수정 원칙 및 계정 인증 표시의 의미를 안내합니다." },
      ja: { title: "情報検証・運営ポリシー", description: "NewAnimeの作品情報の検証基準、修正方針、アカウント認証表示の意味を案内します。" },
      en: { title: "Verification & Editorial Policy", description: "NewAnime's standards for title verification and corrections, plus the meaning of account verification marks." }
    }
  };

  const footerDescriptions = {
    ko: "방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.",
    ja: "放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。",
    en: "Browse release dates, PVs, official sites, and streaming information for upcoming anime and films."
  };

  function safeStorageGet(key) {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  }

  function safeStorageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (_) {}
  }

  function detectPreferredLanguage() {
    const language = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
    const normalized = String(language || "").toLowerCase();
    if (normalized === "ko" || normalized.startsWith("ko-")) return "ko";
    if (normalized === "ja" || normalized.startsWith("ja-")) return "ja";
    return "en";
  }

  const requestedLang = new URLSearchParams(window.location.search).get("lang");
  const savedLang = safeStorageGet("animeScheduleLang");
  let activeLang = supportedLanguages.includes(requestedLang)
    ? requestedLang
    : supportedLanguages.includes(savedLang)
      ? savedLang
      : detectPreferredLanguage();

  const page = document.body.dataset.page || "about";
  const pagePath = `/${page}/`;

  function applyLanguage(lang, replaceUrl = false) {
    activeLang = supportedLanguages.includes(lang) ? lang : "ko";
    safeStorageSet("animeScheduleLang", activeLang);
    document.documentElement.lang = activeLang;

    document.querySelectorAll("[data-lang-content]").forEach(node => {
      node.hidden = node.dataset.langContent !== activeLang;
    });

    document.querySelectorAll(".language-btn").forEach(button => {
      const active = button.dataset.lang === activeLang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const meta = localeMeta[page]?.[activeLang] || localeMeta[page]?.ko;
    if (meta) {
      const fullTitle = `${meta.title} - NewAnime`;
      const url = `https://newani.me${pagePath}?lang=${activeLang}`;
      document.title = fullTitle;
      document.querySelector("#metaDescription")?.setAttribute("content", meta.description);
      document.querySelector("#canonicalLink")?.setAttribute("href", url);
      document.querySelector("#ogTitle")?.setAttribute("content", fullTitle);
      document.querySelector("#ogDescription")?.setAttribute("content", meta.description);
      document.querySelector("#ogUrl")?.setAttribute("content", url);
      document.querySelector("#twitterTitle")?.setAttribute("content", fullTitle);
      document.querySelector("#twitterDescription")?.setAttribute("content", meta.description);
      document.querySelector("#contentLanguageMeta")?.setAttribute("content", activeLang);
      document.querySelector("#ogLocale")?.setAttribute("content", activeLang === "ko" ? "ko_KR" : activeLang === "ja" ? "ja_JP" : "en_US");
    }

    const footerDescription = document.querySelector("#footerDescription");
    if (footerDescription) footerDescription.textContent = footerDescriptions[activeLang];

    document.querySelectorAll("[data-lang-link]").forEach(link => {
      const base = link.dataset.langLink;
      if (base) link.href = `${base}?lang=${activeLang}`;
    });

    const newUrl = `${pagePath}?lang=${activeLang}`;
    if (replaceUrl && `${location.pathname}${location.search}` !== newUrl) {
      history.replaceState(null, "", newUrl);
    }
  }

  document.querySelectorAll(".language-btn").forEach(button => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
  });

  const menuToggle = document.querySelector("#menuToggle");
  const siteMenu = document.querySelector("#siteMenu");
  if (menuToggle && siteMenu) {
    const closeMenu = () => {
      siteMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
    };
    menuToggle.addEventListener("click", event => {
      event.stopPropagation();
      const nextOpen = siteMenu.classList.contains("hidden");
      siteMenu.classList.toggle("hidden", !nextOpen);
      menuToggle.setAttribute("aria-expanded", String(nextOpen));
    });
    document.addEventListener("click", event => {
      if (!siteMenu.contains(event.target) && event.target !== menuToggle) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  applyLanguage(activeLang, !supportedLanguages.includes(requestedLang));
})();
