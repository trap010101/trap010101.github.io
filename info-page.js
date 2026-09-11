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

  const uiLocales = {
    ko: {
      languageLabel: "언어 선택",
      menu: "메뉴",
      menuUpdates: "업데이트",
      menuContact: "문의",
      menuShare: "공유",
      shareCopied: "링크를 복사했습니다.",
      shareFailed: "공유 기능을 사용할 수 없습니다.",
      footerDescription: "방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다."
    },
    ja: {
      languageLabel: "言語を選択",
      menu: "メニュー",
      menuUpdates: "更新",
      menuContact: "お問い合わせ",
      menuShare: "共有",
      shareCopied: "リンクをコピーしました。",
      shareFailed: "共有機能を利用できません。",
      footerDescription: "放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。"
    },
    en: {
      languageLabel: "Select language",
      menu: "Menu",
      menuUpdates: "UPDATES",
      menuContact: "CONTACT",
      menuShare: "SHARE",
      shareCopied: "Link copied.",
      shareFailed: "Sharing is unavailable.",
      footerDescription: "Browse release dates, PVs, official sites, and streaming information for upcoming anime and films."
    }
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
  const ui = () => uiLocales[activeLang] || uiLocales.ko;

  function loadScript(src) {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(node => {
      if (!node.src) return false;
      const url = new URL(node.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (existing) {
      if (existing.dataset.newanimeLoaded === "true" || existing.readyState === "complete") return Promise.resolve(existing);
      return new Promise((resolve, reject) => {
        existing.addEventListener("load", () => resolve(existing), { once: true });
        existing.addEventListener("error", reject, { once: true });
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => {
        script.dataset.newanimeLoaded = "true";
        resolve(script);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadStylesheet(href) {
    const target = new URL(href, location.href);
    const exists = [...document.querySelectorAll('link[rel="stylesheet"]')].some(node => {
      const url = new URL(node.href, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (exists) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function prepareSharedShell() {
    const brand = document.querySelector(".site-brand");
    const logo = brand?.querySelector("img");
    if (logo) {
      logo.className = "brand-logo";
      logo.src = "/assets/newanime-logo.svg?v=20260909-logo2";
      logo.width = 1518;
      logo.height = 300;
      logo.decoding = "async";
      logo.fetchPriority = "high";
    }

    const languageSwitcher = document.querySelector(".site-header .language-row");
    if (languageSwitcher) languageSwitcher.id = "languageSwitcher";

    const siteMenu = document.getElementById("siteMenu");
    if (siteMenu) {
      siteMenu.innerHTML = `
        <a class="site-menu-item" href="/updates/" role="menuitem" id="updatesMenuLink">
          <span class="site-menu-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7"></path>
              <path d="M3 4v5h5"></path>
              <path d="M12 7v5l3 2"></path>
            </svg>
          </span>
          <span id="updatesMenuLabel">UPDATES</span>
        </a>
        <a class="site-menu-item" href="mailto:admin@newani.me" role="menuitem">
          <span class="site-menu-icon" aria-hidden="true">@</span>
          <span id="contactMenuLabel">CONTACT</span>
        </a>
        <button class="site-menu-item" id="shareButton" type="button" role="menuitem">
          <span class="site-menu-icon" aria-hidden="true">↗</span>
          <span id="shareMenuLabel">SHARE</span>
        </button>
      `;
    }

    const header = document.querySelector(".site-header");
    if (header && !document.getElementById("shareStatus")) {
      const status = document.createElement("div");
      status.className = "share-status hidden";
      status.id = "shareStatus";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      header.insertAdjacentElement("afterend", status);
    }

    const footer = document.querySelector("main > footer");
    if (footer) {
      footer.innerHTML = `
        <div id="footerDescription"></div>
        <nav class="site-footer-links" aria-label="Site information">
          <a id="archiveFooterLink" href="/2026/">ARCHIVE</a>
          <a href="/updates/" data-lang-link="/updates/">UPDATES</a>
          <a href="/about/" data-lang-link="/about/"${page === "about" ? ' aria-current="page"' : ""}>ABOUT</a>
          <a href="/privacy/" data-lang-link="/privacy/"${page === "privacy" ? ' aria-current="page"' : ""}>PRIVACY</a>
          <a href="/policy/" data-lang-link="/policy/"${page === "policy" ? ' aria-current="page"' : ""}>POLICY</a>
          <a href="mailto:admin@newani.me">CONTACT</a>
        </nav>
        <div id="footerCopyright">© 2026 NewAnime</div>
      `;
    }
  }

  prepareSharedShell();

  const menuToggle = document.getElementById("menuToggle");
  const siteMenu = document.getElementById("siteMenu");
  const menuWrap = document.querySelector(".menu-wrap");
  const shareButton = document.getElementById("shareButton");
  const shareStatus = document.getElementById("shareStatus");
  let shareStatusTimer;

  function closeMenu({ restoreFocus = false } = {}) {
    if (!siteMenu || !menuToggle || siteMenu.classList.contains("hidden")) return;
    siteMenu.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuToggle.focus();
  }

  function showShareStatus(message) {
    if (!shareStatus) return;
    clearTimeout(shareStatusTimer);
    shareStatus.textContent = message;
    shareStatus.classList.remove("hidden");
    shareStatusTimer = setTimeout(() => shareStatus.classList.add("hidden"), 2200);
  }

  async function copyShareUrl(url) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy failed");
  }

  menuToggle?.addEventListener("click", event => {
    event.stopPropagation();
    const willOpen = siteMenu?.classList.contains("hidden");
    if (!siteMenu || !willOpen) {
      closeMenu();
      return;
    }
    siteMenu.classList.remove("hidden");
    menuToggle.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => siteMenu.querySelector("[role='menuitem']")?.focus());
  });

  shareButton?.addEventListener("click", async () => {
    const meta = localeMeta[page]?.[activeLang] || localeMeta[page]?.ko;
    const shareData = {
      title: meta ? `${meta.title} - NewAnime` : "NewAnime",
      text: meta?.description || "NewAnime",
      url: window.location.href
    };
    closeMenu();
    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
      } else {
        await copyShareUrl(shareData.url);
        showShareStatus(ui().shareCopied);
      }
    } catch (error) {
      if (error?.name !== "AbortError") showShareStatus(ui().shareFailed);
    }
  });

  document.addEventListener("click", event => {
    if (menuWrap && !menuWrap.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && siteMenu && !siteMenu.classList.contains("hidden")) {
      closeMenu({ restoreFocus: true });
    }
  });

  function applyLanguage(lang, replaceUrl = false) {
    activeLang = supportedLanguages.includes(lang) ? lang : "ko";
    safeStorageSet("animeScheduleLang", activeLang);
    document.documentElement.lang = activeLang;

    document.querySelectorAll("[data-lang-content]").forEach(node => {
      node.hidden = node.dataset.langContent !== activeLang;
    });

    document.querySelectorAll("#languageSwitcher [data-lang]").forEach(button => {
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

    const brand = document.querySelector(".site-brand");
    if (brand) brand.href = `/?lang=${activeLang}`;

    const languageSwitcher = document.getElementById("languageSwitcher");
    if (languageSwitcher) languageSwitcher.setAttribute("aria-label", ui().languageLabel);

    if (menuToggle) {
      menuToggle.setAttribute("aria-label", ui().menu);
      menuToggle.title = ui().menu;
    }

    const updatesMenuLink = document.getElementById("updatesMenuLink");
    if (updatesMenuLink) updatesMenuLink.href = `/updates/?lang=${activeLang}`;
    const updatesMenuLabel = document.getElementById("updatesMenuLabel");
    const contactMenuLabel = document.getElementById("contactMenuLabel");
    const shareMenuLabel = document.getElementById("shareMenuLabel");
    if (updatesMenuLabel) updatesMenuLabel.textContent = ui().menuUpdates;
    if (contactMenuLabel) contactMenuLabel.textContent = ui().menuContact;
    if (shareMenuLabel) shareMenuLabel.textContent = ui().menuShare;

    const footerDescription = document.getElementById("footerDescription");
    if (footerDescription) footerDescription.textContent = ui().footerDescription;
    const archiveFooterLink = document.getElementById("archiveFooterLink");
    if (archiveFooterLink) archiveFooterLink.href = `/2026/?lang=${activeLang}`;

    document.querySelectorAll("[data-lang-link]").forEach(link => {
      const base = link.dataset.langLink;
      if (base) link.href = `${base}?lang=${activeLang}`;
    });

    const newUrl = `${pagePath}?lang=${activeLang}`;
    if (replaceUrl && `${location.pathname}${location.search}` !== newUrl) {
      history.replaceState(null, "", newUrl);
    }

    document.dispatchEvent(new CustomEvent("newanime:language"));
  }

  document.querySelectorAll("#languageSwitcher [data-lang]").forEach(button => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
  });

  applyLanguage(activeLang, !supportedLanguages.includes(requestedLang));

  loadScript("/language-switcher-compact.js?v=20260911-theme6")
    .catch(error => console.warn("Compact language selector could not be loaded.", error));

  loadStylesheet("/wishlist.css?v=20260909-wishlist5");
  const wishlistReady = Promise.resolve()
    .then(() => loadScript("/data/anime.js?v=20260907-schedule1"))
    .then(() => loadScript("/data/anime-20260904.js?v=20260910-data3"))
    .then(() => loadScript("/data/title-fixes-20260905.js?v=20260909-title2"))
    .then(() => loadScript("/data/title-hotfix-20260909.js?v=20260909-1"))
    .then(() => loadScript("/data/poster-fixes-20260905.js?v=20260907-posters4"))
    .then(() => loadScript("/data/schedule-updates-20260907.js?v=20260910-schedule3"))
    .then(() => loadScript("/wishlist.js?v=20260909-wishlist4"));

  const authReady = wishlistReady
    .then(() => loadScript("/auth-bootstrap.js?v=20260909-authboot4"))
    .then(() => window.NewAnimeAuthBootstrap?.ready || null);

  wishlistReady.catch(error => console.warn("Wishlist UI could not be loaded.", error));
  authReady.catch(error => console.warn("Authentication UI could not be loaded.", error));

  Promise.all([wishlistReady, authReady])
    .then(() => loadScript("/wishlist-sync.js?v=20260909-sync2"))
    .catch(error => console.warn("Account / wishlist sync could not be loaded.", error));
})();
