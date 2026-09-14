// Narrow title hotfixes that must apply regardless of historical ID drift.
// Static-page regeneration trigger: 2026-09-14.
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
    ["the-timid-max-lady-took-her-shrewd-fiance-s-bet", "나약MAX 영애인데 수완가 약혼자와 내기를 하고 말았다"]
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

  window.animeData.forEach(item => {
    const correctedTitle = titleCorrections.get(item?.id)
      || koreanTitleCorrections.get(item?.title?.ko);
    if (!correctedTitle) return;

    item.title = {
      ...item.title,
      ko: correctedTitle
    };
    item.updatedAt = item.id === "takopis-original-sin-thank-you-see-you-tomorrow"
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
