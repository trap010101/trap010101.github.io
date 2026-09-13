// Korean previous-series streaming links verified against direct playable title pages.
(() => {
  if (typeof window.setAnimeStreamingForRegion !== "function") return;

  const audit = {
    "maebashi-witches-emoemories": {
      laftel: "https://laftel.net/item/42780"
    },
    "takopis-original-sin-thank-you-see-you-tomorrow": {
      laftel: "https://laftel.net/item/42947"
    },
    "my-happy-marriage-special-2026": {
      laftel: "https://laftel.net/item/41528",
      netflix: "https://www.netflix.com/kr/title/81564905"
    },
    "mission-yozakura-family-season-2-part-2": {
      laftel: "https://laftel.net/item/42049",
      netflix: "https://www.netflix.com/kr/title/81766575",
      watcha: "https://watcha.com/ko/contents/tPJZK99",
      tving: "https://www.tving.com/contents/P001755381"
    },
    "the-eminence-in-shadow-lost-echoes": {
      laftel: "https://laftel.net/item/41643",
      netflix: "https://www.netflix.com/kr/title/81642096",
      watcha: "https://watcha.com/ko/contents/tlLrdaW",
      tving: "https://www.tving.com/contents/P001747504"
    },
    "the-worlds-finest-assassin-season-2": {
      laftel: "https://laftel.net/item/40533",
      watcha: "https://watcha.com/ko/contents/tlGNBbp",
      tving: "https://www.tving.com/contents/E003617877"
    },
    "berserk-of-gluttony-season-2": {
      laftel: "https://laftel.net/item/41720",
      tving: "https://www.tving.com/contents/E004108851"
    },
    "laid-back-camp-season-4": {
      watcha: "https://watcha.com/ko/contents/tRMZgbP",
      tving: "https://www.tving.com/contents/E004265303"
    },
    "the-dangers-in-my-heart-season-3": {
      watcha: "https://watcha.com/ko/contents/tPVdZdw",
      tving: "https://www.tving.com/contents/P001751825"
    },
    "haikyu-the-movie-vs-the-little-giant": {
      netflix: "https://www.netflix.com/kr/title/80090673",
      watcha: "https://watcha.com/ko/contents/tRa3pLl",
      tving: "https://www.tving.com/contents/M000290433"
    },
    "haikyu-monsters-go-where": {
      laftel: "https://laftel.net/item/23661",
      watcha: "https://watcha.com/ko/contents/tRa3pLl",
      tving: "https://www.tving.com/contents/M000290433"
    },
    "appraisal-skill-season-3": {
      laftel: "https://laftel.net/item/42415",
      watcha: "https://watcha.com/ko/contents/tEqZLjj",
      tving: "https://www.tving.com/contents/E004218097"
    },
    "dark-gathering-season-2": {
      watcha: "https://watcha.com/ko/contents/tE0mdAy",
      tving: "https://www.tving.com/contents/P001734576"
    },
    "one-punch-man-season-3-part-2": {
      tving: "https://www.tving.com/contents/P001778344",
      watcha: "https://watcha.com/ko-KR/contents/tPy8oLx"
    },
    "konosuba-gods-blessing-on-this-wonderful-world-season-4": {
      laftel: "https://laftel.net/item/42053",
      watcha: "https://watcha.com/ko-KR/contents/tEg8YJR",
      tving: "https://www.tving.com/contents/P000232344"
    }
  };

  for (const [animeId, previous] of Object.entries(audit)) {
    window.setAnimeStreamingForRegion(animeId, "kr", { previous });
  }
})();
