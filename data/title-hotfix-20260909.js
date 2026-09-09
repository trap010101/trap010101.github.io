// Narrow title hotfixes that must apply regardless of historical ID drift.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const takopi = window.animeData.find(item => {
    const ko = item?.title?.ko || "";
    const ja = item?.title?.ja || "";
    return (
      item?.id === "takopis-original-sin-thank-you-see-you-tomorrow" ||
      ko === "타코피의 원죄 -고마워, 또 내일" ||
      ko === "타코피의 원죄 -고마워, 또 내일-" ||
      ko === "타코피의 원죄 -고마워, 또 만나-" ||
      ja.includes("タコピーの原罪")
    );
  });

  if (takopi) {
    takopi.title = {
      ...takopi.title,
      ko: "타코피의 원죄 -고마워, 또 만나"
    };
    takopi.updatedAt = "2026-09-09";
  }
})();
