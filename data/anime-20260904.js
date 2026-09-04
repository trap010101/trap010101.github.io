// Additions verified on 2026-09-04. Kept separate from the large canonical file to make this update auditable.
(() => {
  const additions = [
    {
      id: "the-worlds-finest-assassin-season-2",
      title: {
        ko: "세계 최고의 암살자, 이세계 귀족으로 전생하다 Season 2",
        ja: "世界最高の暗殺者、異世界貴族に転生する Season2",
        en: "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat Season 2"
      },
      aliases: [
        "암살 귀족 2기",
        "暗殺貴族 Season2",
        "The World's Finest Assassin Season 2"
      ],
      release: {
        japan: {
          status: "month",
          year: 2027,
          month: 1,
          day: null
        },
        korea: null,
        global: null
      },
      productionStatus: "scheduled",
      season: "2027-winter",
      format: "tv",
      origin: "light-novel",
      tags: ["major", "series", "ln"],
      poster: {
        src: "assets/posters/worlds-finest-assassin-s2.webp",
        position: "center"
      },
      links: {
        pv: "https://www.youtube.com/watch?v=DAXn92SSHIo",
        official: "https://ansatsu-kizoku.jp/",
        streaming: null
      },
      streaming: {},
      verification: {
        verifiedAt: "2026-09-04",
        sources: [
          {
            type: "official-site",
            url: "https://ansatsu-kizoku.jp/news/post-37",
            label: "Official website — Season 2 teaser visual",
            supports: ["announcement", "release", "poster"]
          },
          {
            type: "official-x",
            url: "https://x.com/ansatsu_kizoku/status/2095708679857213795",
            label: "Official X announcement",
            supports: ["release", "pv", "announcement"]
          }
        ]
      },
      createdAt: "2026-09-04",
      updatedAt: "2026-09-04"
    },
    {
      id: "keroro-gunso-star",
      title: {
        ko: "개구리 중사 케로로☆",
        ja: "ケロロ軍曹☆",
        en: "Sgt. Frog☆"
      },
      aliases: ["케로로 중사☆", "케로로 군조☆", "Keroro Gunso☆"],
      release: {
        japan: {
          status: "month",
          year: 2026,
          month: 10,
          day: null
        },
        korea: null,
        global: null
      },
      productionStatus: "scheduled",
      season: "2026-fall",
      format: "tv",
      origin: "manga",
      tags: ["major", "new", "comic"],
      poster: {
        src: "assets/posters/keroro-gunso-star.webp",
        position: "center"
      },
      links: {
        pv: "https://www.youtube.com/watch?v=S6KZXOfh-uk",
        official: "https://www.bn-pictures.co.jp/keroro-anime/tv/",
        streaming: null
      },
      streaming: {},
      verification: {
        verifiedAt: "2026-09-04",
        sources: [
          {
            type: "official-x",
            url: "https://x.com/keroro_anime/status/2095784141308809403",
            label: "Official X announcement",
            supports: ["announcement", "release"]
          },
          {
            type: "official-site",
            url: "https://www.bn-pictures.co.jp/keroro-anime/tv/",
            label: "Official website",
            supports: ["announcement", "release", "format", "poster"]
          },
          {
            type: "official-youtube",
            url: "https://www.youtube.com/watch?v=S6KZXOfh-uk",
            label: "Official YouTube",
            supports: ["announcement", "release", "pv"]
          }
        ]
      },
      createdAt: "2026-09-04",
      updatedAt: "2026-09-04"
    }
  ];

  if (!Array.isArray(window.animeData)) window.animeData = [];
  const existingIds = new Set(window.animeData.map(anime => anime.id));
  additions.forEach(anime => {
    if (!existingIds.has(anime.id)) window.animeData.push(anime);
  });
})();
