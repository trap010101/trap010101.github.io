(() => {
  const homeCopy = {
    ko: {
      description: "NewAnime은 2026~2027년 방영 예정 애니메이션과 극장판의 방영일, 공식 PV, 공식 사이트 및 공식 OTT 제공 정보를 정리하는 독립 운영 정보 서비스입니다.",
      hero: "방영일과 공식 PV, 공식 사이트 및 공식 OTT 제공 정보를 한눈에 확인하세요.",
      footer: "방영 예정 애니메이션과 극장판의 일정, 공식 PV, 공식 사이트 및 공식 OTT 제공 정보를 정리합니다.",
      scope: "NewAnime은 영상 콘텐츠를 직접 호스팅하거나 애니메이션 시청·다운로드 서비스를 제공하지 않으며, 확인 가능한 외부 공식 페이지 정보를 안내합니다."
    },
    ja: {
      description: "NewAnimeは、2026～2027年放送予定のアニメ・劇場版について、放送日、公式PV、公式サイト、公式配信サービスの提供情報を整理する独立運営の情報サービスです。",
      hero: "放送日、公式PV、公式サイト、公式配信サービスの提供情報をまとめて確認できます。",
      footer: "放送予定のアニメと劇場版について、放送日、公式PV、公式サイト、公式配信サービスの提供情報を整理しています。",
      scope: "NewAnimeは映像コンテンツを直接ホスティングせず、アニメの視聴・ダウンロードサービスも提供しません。確認できる外部の公式ページ情報を案内します。"
    },
    en: {
      description: "NewAnime is an independently operated information service for upcoming anime and films, organizing release dates, official PVs, official sites, and availability on official streaming providers.",
      hero: "Browse release dates, official PVs, official sites, and availability on official streaming providers at a glance.",
      footer: "NewAnime organizes upcoming anime and film schedules, official PVs, official sites, and availability on official streaming providers.",
      scope: "NewAnime does not host video content or provide an anime viewing or download service. It points users to verified external official pages."
    }
  };

  const aboutCopy = {
    ko: "NewAnime은 방영 예정 애니메이션의 일정, 공식 출처 및 공식 OTT 제공 정보를 정리하는 독립 운영 정보 서비스입니다. 영상 콘텐츠를 직접 호스팅하거나 시청 서비스를 제공하지 않습니다.",
    ja: "NewAnimeは、放送予定アニメのスケジュール、公式情報源、公式配信サービスの提供情報を整理する独立運営の情報サービスです。映像コンテンツを直接ホスティングしたり、視聴サービスを提供したりするサイトではありません。",
    en: "NewAnime is an independently operated information service that organizes upcoming anime schedules, official sources, and availability on official streaming providers. It does not host video content or provide a viewing service."
  };

  const supported = new Set(["ko", "ja", "en"]);

  function currentLanguage() {
    const lang = String(document.documentElement.lang || "ko").toLowerCase().split("-")[0];
    return supported.has(lang) ? lang : "ko";
  }

  function setMeta(id, value) {
    document.getElementById(id)?.setAttribute("content", value);
  }

  function applySharedFooter(lang) {
    const footer = document.getElementById("footerDescription");
    if (footer) footer.textContent = (homeCopy[lang] || homeCopy.ko).footer;
  }

  function applyHome(lang) {
    const copy = homeCopy[lang] || homeCopy.ko;
    setMeta("metaDescription", copy.description);
    setMeta("ogDescription", copy.description);
    setMeta("twitterDescription", copy.description);

    const hero = document.getElementById("heroSubtitle");
    if (hero) hero.textContent = copy.hero;
    applySharedFooter(lang);

    const sourceBox = document.querySelector(".source-box");
    if (sourceBox) {
      let notice = document.getElementById("serviceScopeNotice");
      if (!notice) {
        notice = document.createElement("p");
        notice.id = "serviceScopeNotice";
        sourceBox.appendChild(notice);
      }
      notice.textContent = copy.scope;
    }

    const pageUrl = `https://newani.me/?lang=${lang}`;
    const schema = document.getElementById("websiteStructuredData");
    if (schema) {
      schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://newani.me/#organization",
            "name": "NewAnime",
            "url": "https://newani.me/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://newani.me/assets/newanime-logo.svg"
            }
          },
          {
            "@type": "WebSite",
            "@id": "https://newani.me/#website",
            "name": "NewAnime",
            "url": pageUrl,
            "description": copy.description,
            "inLanguage": lang,
            "publisher": { "@id": "https://newani.me/#organization" },
            "about": {
              "@type": "Thing",
              "name": lang === "ko" ? "방영 예정 애니메이션 일정 및 공식 출처 정보" : lang === "ja" ? "放送予定アニメのスケジュールと公式情報" : "Upcoming anime schedules and official source information"
            }
          }
        ]
      });
    }
  }

  function applyAbout(lang) {
    const description = aboutCopy[lang] || aboutCopy.ko;
    setMeta("metaDescription", description);
    setMeta("ogDescription", description);
    setMeta("twitterDescription", description);
    applySharedFooter(lang);

    const schema = document.getElementById("aboutStructuredData");
    if (schema) {
      schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://newani.me/about/#about",
        "name": lang === "ko" ? "NewAnime 소개" : lang === "ja" ? "NewAnimeについて" : "About NewAnime",
        "url": `https://newani.me/about/?lang=${lang}`,
        "description": description,
        "inLanguage": lang,
        "isPartOf": { "@id": "https://newani.me/#website" },
        "about": {
          "@type": "WebSite",
          "@id": "https://newani.me/#website",
          "name": "NewAnime",
          "url": "https://newani.me/"
        }
      });
    }
  }

  function apply() {
    const lang = currentLanguage();
    const page = document.body?.dataset.page;
    if (location.pathname === "/" || location.pathname === "/index.html") applyHome(lang);
    if (page === "about" || location.pathname.startsWith("/about")) applyAbout(lang);
  }

  apply();
  new MutationObserver(apply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
})();
