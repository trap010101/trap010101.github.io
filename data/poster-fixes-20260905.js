// Poster asset corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const fixes = {
    "me-and-big-bro-yuu": {
      src: "assets/posters/me-and-big-bro-yuu-v2.webp",
      updatedAt: "2026-09-05"
    },
    "magical-sisters-lulutto-lilly-part-2": {
      src: "assets/posters/magical-sisters-lulutto-lilly-part-2-cropped-v2.webp",
      updatedAt: "2026-09-07"
    },

    // Missing posters found in the September 7 schedule/data audit.
    // Prefer the current anime teaser/key visual; several match the official visuals indexed by Namuwiki.
    "ice-wall-season-2": {
      src: "https://spice.eplus.jp/images/qtx4Y66xNOJJ4Q1M1BA9hNseNoqVEj2wDWMNd1Qj3A26D1BMpCPtJ0u29NGOTmeS",
      updatedAt: "2026-09-07"
    },
    "lent-magic-revolving-collection": {
      src: "https://www.booklive.co.jp/media/3XcFBQBBEioNeucsGiSf4I62VWq62NYEI6syr9Gs.jpg",
      updatedAt: "2026-09-07"
    },
    "overgeared-the-power-of-items": {
      src: "https://a.storyblok.com/f/178900/849x1200/78ea70222f/overgeared-key-visual.jpeg/m/filters%3Aquality%2895%29format%28webp%29",
      updatedAt: "2026-09-07"
    },
    "uncle-likes-cute-things": {
      src: "https://ojikawa.com/assets/img/ogp.jpg?ver=1.00",
      updatedAt: "2026-09-07"
    },
    "mission-yozakura-family-season-2-part-2": {
      src: "https://img.anmosugoi.com/file/media-sugoi/2023/03/z7Yz7Q64-Yozakura-san-Chi-no-Daisakusen-visual.jpg",
      updatedAt: "2026-09-07"
    },
    "dragon-ball-super-beerus": {
      src: "https://unicornfantasian.com/ja/posts/anime-dragon-ball-super-beerus-hadir-sebagai-versi-disempurnakan/1000077468.jpg",
      updatedAt: "2026-09-07"
    },
    "zero-believers-goddess-isekai-strategy": {
      src: "https://ogre.natalie.mu/media/news/comic/2020/0424/shinjazeromegami_key.jpg?imdensity=1&imwidth=750",
      updatedAt: "2026-09-07"
    },
    "romelia-war-chronicle": {
      src: "https://media.eiga.com/images/anime/news/126175/photo/4f858b3b142da5e6/640.jpg",
      updatedAt: "2026-09-07"
    },
    "hotel-inhumans-season-2": {
      src: "https://hotel-inhumans.com/images/news/news-260306-1.jpg",
      updatedAt: "2026-09-07"
    },
    "a-wild-last-boss-appeared-season-2": {
      src: "https://cimg.kgl-systems.io/camion/files/61321/ogp_dNFP.jpg?x=1280",
      updatedAt: "2026-09-07"
    },
    "the-witch-was-asked-for-a-love-potion": {
      src: "https://horemajo-anime.com/core_sys/images/others/ogp.jpg",
      updatedAt: "2026-09-07"
    },
    "with-vengeance-sincerely-your-broken-saintess-season-2": {
      src: "https://shikimori.io/uploads/poster/animes/64180/main_alt_2x-2faf91acf694c97dbf81143989410106.jpeg",
      updatedAt: "2026-09-07"
    },
    "ace-of-diamond-act-ii-second-season-part-2": {
      src: "https://berita.jepang.org/s/common/uploaded_files/1782655300-99607ddffafc1c8619a6281358ec5c19.jpeg",
      updatedAt: "2026-09-07"
    },
    "prince-of-tennis-u17-world-cup-final-members-selection": {
      src: "https://img2.animatetimes.com/2025/09/d542bf8cff95fc16d77fcbd9ec8ca4036a5ed2f7b02477_62376358_512a62fe3953852ebeee0e76d6763e6e811977bc.jpg",
      updatedAt: "2026-09-07"
    },
    "appraisal-skill-season-3": {
      src: "https://pbs.twimg.com/media/HFXx06_aAAE0E-_.jpg",
      updatedAt: "2026-09-07"
    },
    "the-guy-she-was-interested-in-wasnt-a-guy-at-all": {
      src: "https://pbs.twimg.com/profile_banners/2058852828152729600/1783114799",
      updatedAt: "2026-09-07"
    },
    "chihara-san-is-she-a-landmine": {
      src: "https://berita.jepang.org/s/common/uploaded_files/1766655595-41d293aa0dc0b1ccb687e9fe185a9dbd.jpeg",
      updatedAt: "2026-09-07"
    },
    "arcanadea": {
      src: "https://static.animecorner.me/2025/03/1741946625-7c8a33fcd369d2647f31dbf8dfea4d9d.jpg",
      updatedAt: "2026-09-07"
    },
    "marriage-toxin-season-2": {
      src: "https://static.animecorner.me/2026/06/1782826469-6873d9f2d5cec82832a7ba3a43d3242f.jpg",
      updatedAt: "2026-09-07"
    },
    "eleceed": {
      src: "https://amuse-creative-studio.jp/wp-content/uploads/2025/06/ELECEED_KV_JPN%E8%BB%BD.jpg",
      updatedAt: "2026-09-07"
    },
    "lona": {
      src: "https://static.animecorner.me/2026/06/1782631833-28f2e398a102215f81d4f728306e614e.jpg",
      updatedAt: "2026-09-07"
    },
    "kindergarten-wars": {
      src: "https://static.animecorner.me/2026/03/1774748874-7358216b3d54d2da9966ab4851776292.jpg",
      updatedAt: "2026-09-07"
    },
    "free-fire-daybreak": {
      src: "https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20267/5b972bb62fa5e7f8da7832cf008667b0.jpeg",
      updatedAt: "2026-09-07"
    },
    "midnight-heart-tune-season-2": {
      src: "https://static.animecorner.me/2026/07/1784388279-ebfc119ee109ba96c50e750ea5072ca1.png",
      updatedAt: "2026-09-07"
    },
    "gate-season-2": {
      src: "https://www.gate2-alphapolis.com/img/anime_kv.png",
      updatedAt: "2026-09-07"
    },
    "dark-gathering-season-2": {
      src: "https://img.league-funny.com/imgur/176164466332_o.png",
      updatedAt: "2026-09-07"
    },
    "berserk-of-gluttony-season-2": {
      src: "https://prcdn.freetls.fastly.net/release_image/48095/2813/48095-2813-f102eac672c87465b6ac1d57c54eb212-539x629.png?width=536&quality=85%2C75&format=jpeg&auto=webp&fit=bounds&bg-color=fff",
      updatedAt: "2026-09-07"
    },
    "new-kochikame": {
      src: "https://img.kai-you.net/storage/2025/12/10433e2e-5dbb-46f0-b783-ad7925fd7924/1040x643/kochikame_anime_new.webp",
      updatedAt: "2026-09-07"
    },
    "haikyu-monsters-go-where": {
      src: "https://i.ytimg.com/vi/uEeZdVYu7AA/maxresdefault.jpg",
      updatedAt: "2026-09-07"
    },
    "red-riding-hood-detective-story": {
      src: "https://hermes.media.static.aol.com/media/2026/08/11/739299ed-cffe-3992-b413-9bea98cbea43/5b0eb0e2-d55e-4ab0-9734-c671285454b5.jpg",
      updatedAt: "2026-09-07"
    },
    "seven-sleeping-beauties": {
      src: "https://media.eiga.com/images/anime/program/113263/photo/6dad6ec9a24370c3.jpg",
      updatedAt: "2026-09-07"
    },
    "fall-in-love-you-false-angels": {
      src: "https://cimg.kgl-systems.io/camion/files/dengeki/78908/a4efdd2f969559e8b1c92e99f32ded48e.jpg?x=1280",
      updatedAt: "2026-09-07"
    },
    "the-strongest-magicmasters-retirement-plan": {
      src: "https://us.oricon-group.com/upimg/detail/8000/8810/img660/The-Greatest-Magicmasters-Retirement-Plan-11.jpg",
      updatedAt: "2026-09-07"
    },
    "nabe-ni-dangan": {
      src: "https://a.storyblok.com/f/178900/800x450/37dbf101cf/nabe-ni-tama-o-ukenagara-manga.jpg/m/filters%3Aquality%2895%29format%28webp%29",
      updatedAt: "2026-09-07"
    },
    "namidaame-to-serenade": {
      src: "https://pbs.twimg.com/media/HBAr5LlbsAArH5O.jpg",
      updatedAt: "2026-09-07"
    },
    "true-saint-banished-country-done-for": {
      src: "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2026/07/Because-I-the-True-Saint-was-Banished-that-Country-is-Done-For-teaser-visual-1-e1784804391961.jpg?resize=696%2C391&ssl=1",
      updatedAt: "2026-09-07"
    },
    "studio-cabana": {
      src: "https://a.storyblok.com/f/178900/1064x1505/f9dbb45439/studio-cabana-teaser-visual.jpg/m/filters%3Aquality%2895%29format%28webp%29",
      updatedAt: "2026-09-07"
    },
    "soara-and-the-house-of-monsters": {
      src: "https://img2.animatetimes.com/2026/07/b84d1f9cc9ee36c2b2a8ed919e540ff56a45be43896649_22166543_dcebe6e8c0dec40c76ac2986832ca5e0f7a6179d.jpg",
      updatedAt: "2026-09-07"
    },
    "dengeki-daisy": {
      src: "https://cimg.kgl-systems.io/camion/files/77669/thumbnail_FBMS.jpg?x=1280",
      updatedAt: "2026-09-07"
    },
    "magic-to-the-limit-reincarnated-elf": {
      src: "https://www.anitrendz.com/_next/image?q=75&url=https%3A%2F%2Fi0.wp.com%2Fanitrendz.net%2Fnews%2Fwp-content%2Fuploads%2F2026%2F06%2FMajutsu-o-Kiwamete-Tabi-ni-Deta-Tensei-Elf-teaser-visual-1-e1781777410350.jpg%3Ffit%3D1375%252C775%26ssl%3D1&w=1920",
      updatedAt: "2026-09-07"
    },
    "demons-are-plotting": {
      src: "https://a.storyblok.com/f/178900/800x450/74ba1e42ac/the-demons-are-planning-something-good-header.jpg",
      updatedAt: "2026-09-07"
    },
    "rebel-robotica": {
      src: "https://a.storyblok.com/f/178900/849x1200/c041d9a70b/re-bel-robotica-teaser-visual.jpg/m/filters%3Aquality%2895%29format%28webp%29",
      updatedAt: "2026-09-07"
    },
    "beat-and-motion": {
      src: "https://cimg.kgl-systems.io/camion/files/dengeki/78968/a51494b66b20eaec11fe501f5bdf797f4.jpg?x=1280",
      updatedAt: "2026-09-07"
    },
    "unlucky-to-strongest-man": {
      src: "https://cimg.kgl-systems.io/camion/files/dengeki/79110/af647fc8454b907cab3e695005e0c02b2.jpg?x=1280",
      updatedAt: "2026-09-07"
    },
    "maiden-blood": {
      src: "https://static.animecorner.me/2026/08/1787312176-864f9f0721cff3d73eeb79f589cb3f1f.jpg",
      updatedAt: "2026-09-07"
    },
    "hokuto-no-ken-fist-of-the-north-star-part-2": {
      src: "https://www.crank-in.net/img/db/232091129215404_650.jpg",
      updatedAt: "2026-09-07"
    },
    "unrewarded-villager-a": {
      src: "https://ogre.natalie.mu/media/news/comic/2025/0425/muabitoa_teaservisual.jpg?imdensity=1&impolicy=m&imwidth=750",
      updatedAt: "2026-09-07"
    },
    "glasses-sometimes-yankee-kun": {
      src: "https://static.animecorner.me/2026/08/1786408148-d067d587f0824651b71859ca772d44ce-724x1024.jpg",
      updatedAt: "2026-09-07"
    }
  };

  for (const anime of window.animeData) {
    const fix = fixes[anime.id];
    if (!fix) continue;
    anime.poster = { ...(anime.poster || {}), src: fix.src };
    anime.updatedAt = fix.updatedAt;
  }
})();
