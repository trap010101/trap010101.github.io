// Korean title corrections applied after the canonical schedule data loads.
(() => {
  if (!Array.isArray(window.animeData)) return;

  const anime = window.animeData.find(item => item.id === "dating-a-dark-summoner");
  if (!anime) return;

  anime.title = {
    ...anime.title,
    ko: "다크서머너와 썸을 탔다"
  };

  if (Array.isArray(anime.aliases)) {
    anime.aliases = anime.aliases.map(alias =>
      alias === "ダークサモナーとデキている (다크 서머너와 사귀고 있다)"
        ? "ダークサモナーとデキている (다크서머너와 썸을 탔다)"
        : alias
    );
  }

  anime.updatedAt = "2026-09-05";
})();
