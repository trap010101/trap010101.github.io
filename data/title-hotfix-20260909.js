// Narrow title hotfixes that must apply regardless of historical ID drift.
// Static-page regeneration trigger: 2026-09-15.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const titleCorrections = new Map([
    ["takopis-original-sin-thank-you-see-you-tomorrow", "타코피의 원죄 -고마워, 또 만나-"],
    ["fall-in-love-you-false-angels", "사랑하라, 거짓된 천사들이여"],
    ["nabe-ni-dangan", "냄비로 총알을 막아내며"],
    ["the-strongest-magicmasters-retirement-plan", "최강 마법사의 은퇴 계획"],
    ["demons-are-plotting", "마물들은 계획한다"],
    ["unlucky-to-strongest-man", "불운으로부터의 최강남"],
    ["glasses-sometimes-yankee-kun", "안경, 때때로, 불량아"],
    ["looking-for-zombies", "좀비를 찾습니다"],
    ["the-timid-max-lady-took-her-shrewd-fiance-s-bet", "나약MAX 영애인데 수완가 약혼자와 내기를 하고 말았다"],
    ["the-jack-of-all-trades-support-mage-realizes-hes-the-strongest", "잡용 부여술사가 자신의 강함을 눈치챌 때까지"],
    ["sudachis-demon-kings-castle", "홀로서기 마왕성"],
    ["the-principle-of-a-philosopher-by-eternal-fool-asley", "영원한 바보 아즈리가 쓰는 현자의 서"],
    ["hirayasumi", "매일, 휴일"],
    ["mashle-season-3-divine-visionary-final-exam-arc", "마슐 삼마 대항 신각자 최종 시험 편"],
    ["welcome-to-demon-school-iruma-kun-if-episode-of-mafia", "마계학교 이루마군 if Episode of 魔fia"],
    ["reincarnated-in-a-game-world-dungeon-activity", "게임 세계 전생 〈던활〉~게이머는 【던전 취업 준비의 추천】을 〈처음부터〉 플레이 한다~"]
  ]);

  const koreanTitleCorrections = new Map([
    [
      "보답받지 못한 마을사람 A, 귀족에게 거두어져 익애받는 데다, 사실 가지고 있던 전설급 신 스킬도 각성했다",
      "보답받지 못했던 마을사람 A, 귀족에게 거둬져 사랑을 듬뿍 받는 데다 사실은 가지고 있던 전설급 신스킬도 각성했다"
    ],
    [
      "장갑기병 보톰즈 회색 마녀 제1작",
      "장갑기병 보톰즈: 회색의 마녀"
    ]
  ]);

  const september15TitleIds = new Set([
    "the-jack-of-all-trades-support-mage-realizes-hes-the-strongest",
    "sudachis-demon-kings-castle",
    "the-principle-of-a-philosopher-by-eternal-fool-asley",
    "hirayasumi",
    "mashle-season-3-divine-visionary-final-exam-arc",
    "welcome-to-demon-school-iruma-kun-if-episode-of-mafia",
    "reincarnated-in-a-game-world-dungeon-activity"
  ]);

  const aliasTitleReplacements = new Map([
    ["sudachis-demon-kings-castle", ["스다치의 마왕성", "홀로서기 마왕성"]],
    ["mashle-season-3-divine-visionary-final-exam-arc", ["마슐-MASHLE- 3기 「삼마대쟁 신각자 최종시험편」", "마슐 삼마 대항 신각자 최종 시험 편"]],
    ["welcome-to-demon-school-iruma-kun-if-episode-of-mafia", ["마계학교! 이루마군 if Episode of 마피아", "마계학교 이루마군 if Episode of 魔fia"]]
  ]);

  window.animeData.forEach(item => {
    const correctedTitle = titleCorrections.get(item?.id)
      || koreanTitleCorrections.get(item?.title?.ko);
    if (!correctedTitle) return;

    item.title = {
      ...item.title,
      ko: correctedTitle
    };

    const aliasReplacement = aliasTitleReplacements.get(item?.id);
    if (aliasReplacement && Array.isArray(item.aliases)) {
      const [from, to] = aliasReplacement;
      item.aliases = item.aliases.map(alias =>
        typeof alias === "string" ? alias.replace(from, to) : alias
      );
    }

    item.updatedAt = september15TitleIds.has(item.id)
      ? "2026-09-15"
      : item.id === "takopis-original-sin-thank-you-see-you-tomorrow"
        ? "2026-09-09"
        : ["looking-for-zombies", "the-timid-max-lady-took-her-shrewd-fiance-s-bet"].includes(item.id)
          ? "2026-09-14"
          : "2026-09-12";
  });

  const timidMaxLady = window.animeData.find(
    item => item?.id === "the-timid-max-lady-took-her-shrewd-fiance-s-bet"
  );
  if (timidMaxLady && Array.isArray(timidMaxLady.aliases)) {
    timidMaxLady.aliases = timidMaxLady.aliases.map(alias =>
      alias === "弱気MAX令嬢なのに、辣腕婚約者様の賭けに乗ってしまった (소심 MAX 영애인데 수완 좋은 약혼자의 내기에 올라타 버렸다)"
        ? "弱気MAX令嬢なのに、辣腕婚約者様の賭けに乗ってしまった (나약MAX 영애인데 수완가 약혼자와 내기를 하고 말았다)"
        : alias
    );
  }

  const lookingForZombies = window.animeData.find(item => item?.id === "looking-for-zombies");
  if (lookingForZombies) {
    if (Array.isArray(lookingForZombies.aliases)) {
      lookingForZombies.aliases = lookingForZombies.aliases.map(alias =>
        alias === "#ゾンビさがしてます (#좀비를 찾고 있습니다)"
          ? "#ゾンビさがしてます (좀비를 찾습니다)"
          : alias
      );
    }

    lookingForZombies.release = lookingForZombies.release || {};
    lookingForZombies.release.japan = {
      status: "date",
      year: 2026,
      month: 10,
      day: 3
    };
    lookingForZombies.schedule = lookingForZombies.schedule || {};
    lookingForZombies.schedule.premiere = {
      type: "tv",
      date: "2026-10-03",
      time: "23:30",
      timezone: "Asia/Tokyo",
      displayTime: "23:30"
    };
    lookingForZombies.schedule.source = "https://www.tv-asahi.co.jp/imanimation/";
    lookingForZombies.schedule.verifiedAt = "2026-09-14";
    lookingForZombies.updatedAt = "2026-09-14";
  }

  const horemajo = window.animeData.find(item => item?.id === "the-witch-was-asked-for-a-love-potion");
  if (horemajo) {
    const officialSiteUrl = "https://horemajo-anime.com/";
    const officialXUrl = "https://x.com/horemajo_anime/status/2099422907017634249";
    horemajo.release = horemajo.release || {};
    horemajo.release.japan = {
      status: "date",
      year: 2026,
      month: 10,
      day: 5
    };
    horemajo.schedule = horemajo.schedule || {};
    horemajo.schedule.premiere = {
      type: "tv",
      date: "2026-10-05",
      time: "21:30",
      timezone: "Asia/Tokyo",
      displayTime: "21:30"
    };
    horemajo.schedule.source = officialSiteUrl;
    horemajo.schedule.verifiedAt = "2026-09-14";
    horemajo.updatedAt = "2026-09-14";

    horemajo.verification = horemajo.verification || { verifiedAt: null, sources: [] };
    horemajo.verification.verifiedAt = "2026-09-14";
    horemajo.verification.sources = Array.isArray(horemajo.verification.sources)
      ? horemajo.verification.sources
      : [];

    const upsertHoremajoSource = source => {
      const existing = horemajo.verification.sources.find(item => item?.url === source.url);
      if (existing) Object.assign(existing, source);
      else horemajo.verification.sources.push(source);
    };

    upsertHoremajoSource({
      type: "official-site",
      url: officialSiteUrl,
      label: "Official website — October 5, 21:30 (JST)",
      supports: ["release"],
      verifiedAt: "2026-09-14"
    });
    upsertHoremajoSource({
      type: "official-x",
      url: officialXUrl,
      label: "Official X — October 5, 2026 premiere",
      supports: ["release"],
      verifiedAt: "2026-09-14"
    });
  }

  // Fallback for the Takopi entry if its historical ID changes again.
  const takopi = window.animeData.find(item => {
    const ja = item?.title?.ja || "";
    return ja.includes("タコピーの原罪");
  });

  if (takopi) {
    takopi.title = {
      ...takopi.title,
      ko: "타코피의 원죄 -고마워, 또 만나-"
    };
    takopi.updatedAt = "2026-09-09";
  }
})();
