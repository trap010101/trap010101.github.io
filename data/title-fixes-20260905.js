// Title corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const darkSummoner = window.animeData.find(item => item.id === "dating-a-dark-summoner");
  if (darkSummoner) {
    darkSummoner.title = {
      ...darkSummoner.title,
      ko: "다크서머너와 썸을 탔다"
    };

    if (Array.isArray(darkSummoner.aliases)) {
      darkSummoner.aliases = darkSummoner.aliases.map(alias =>
        alias === "ダークサモナーとデキている (다크 서머너와 사귀고 있다)"
          ? "ダークサモナーとデキている (다크서머너와 썸을 탔다)"
          : alias
      );
    }

    darkSummoner.updatedAt = "2026-09-05";
  }

  const luluttoLilly = window.animeData.find(item => item.id === "magical-sisters-lulutto-lilly-part-2");
  if (luluttoLilly) {
    luluttoLilly.title = {
      ...luluttoLilly.title,
      ko: "마법의 자매 루루토리리 제2쿨"
    };

    if (Array.isArray(luluttoLilly.aliases)) {
      luluttoLilly.aliases = luluttoLilly.aliases.map(alias =>
        alias === "魔法の姉妹ルルットリリィ 第2クール (마법의 자매 루룻토릴리 제2쿨)"
          ? "魔法の姉妹ルルットリリィ 第2クール (마법의 자매 루루토리리 제2쿨)"
          : alias
      );
    }

    luluttoLilly.updatedAt = "2026-09-07";
  }

  const cheatGrantingMage = window.animeData.find(item => item.id === "banished-cheat-granting-mage-second-life");
  if (cheatGrantingMage) {
    cheatGrantingMage.title = {
      ...cheatGrantingMage.title,
      en: "The Laid-Off Cheat-Granting Mage Enjoys a Second Lease on Life"
    };
    cheatGrantingMage.updatedAt = "2026-09-07";
  }
})();
