// Narrow title hotfixes that must apply regardless of historical ID drift.
// Static-page regeneration trigger: 2026-09-12.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const titleCorrections = new Map([
    ["takopis-original-sin-thank-you-see-you-tomorrow", "타코피의 원죄 -고마워, 또 만나-"],
    ["fall-in-love-you-false-angels", "사랑하라, 거짓된 천사들이여"],
    ["nabe-ni-dangan", "냄비로 총알을 막아내며"],
    ["the-strongest-magicmasters-retirement-plan", "최강 마법사의 은퇴 계획"],
    ["demons-are-plotting", "마물들은 계획한다"],
    ["unlucky-to-strongest-man", "불운으로부터의 최강남"],
    ["glasses-sometimes-yankee-kun", "안경, 때때로, 불량아"]
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
      : "2026-09-12";
  });

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
