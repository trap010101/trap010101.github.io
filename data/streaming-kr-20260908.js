// Korean previous-series streaming links verified against direct playable title pages.
(() => {
  if (typeof window.setAnimeStreamingForRegion !== "function") return;

  const audit = {
    "maebashi-witches-emoemories": {
      laftel: "https://laftel.net/item/42780",
      tving: "https://www.tving.com/contents/P001774211"
    },
    "akane-banashi-season-2": {
      laftel: "https://laftel.net/item/45436",
      tving: "https://www.tving.com/contents/P001789083"
    },
    "hotel-inhumans-season-2": {
      laftel: "https://laftel.net/item/42939",
      tving: "https://www.tving.com/contents/P001773673"
    },
    "takopis-original-sin-thank-you-see-you-tomorrow": {
      laftel: "https://laftel.net/item/42947",
      crunchyroll: "https://www.crunchyroll.com/series/GKEH2G0X4/takopis-original-sin"
    },
    "tougen-anki-nikko-and-kegon-falls-arc": {
      tving: "https://www.tving.com/contents/P001773985",
      crunchyroll: "https://www.crunchyroll.com/series/GP5HJ84D2/tougen-anki"
    },
    "magical-girl-raising-project-restart": {
      watcha: "https://watcha.com/ko-KR/contents/tP8kB3R",
      crunchyroll: "https://www.crunchyroll.com/series/GRQ4MKN4Y/magical-girl-raising-project"
    },
    "medaka-kuroiwa-is-impervious-to-my-charms-season-2": {
      laftel: "https://laftel.net/item/42651",
      watcha: "https://watcha.com/ko/contents/tRwGXxk",
      crunchyroll: "https://www.crunchyroll.com/series/G4PH0WJJG/medaka-kuroiwa-is-impervious-to-my-charms"
    },
    "marriage-toxin-season-2": {
      laftel: "https://laftel.net/item/45469",
      watcha: "https://watcha.com/ko-KR/contents/tRMxWk4",
      tving: "https://www.tving.com/contents/P001785141"
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
    },
    "sound-euphonium-the-final-movement-part-2": {
      laftel: "https://laftel.net/item/42050",
      watcha: "https://watcha.com/ko-KR/contents/tP8az7d",
      tving: "https://www.tving.com/contents/P001755380"
    },
    "girls-und-panzer-das-finale-part-5": {
      laftel: "https://laftel.net/item/41941",
      watcha: "https://watcha.com/ko/contents/mW9pjGB",
      tving: "https://www.tving.com/contents/M000318838"
    },
    "rascal-does-not-dream-of-a-dear-friend": {
      laftel: "https://laftel.net/item/42927",
      watcha: "https://watcha.com/ko/contents/tPvb92p",
      tving: "https://www.tving.com/contents/P001677425"
    },
    "made-in-abyss-theatrical-series-part-1-the-awakening-mystery": {
      tving: "https://www.tving.com/contents/P001668113",
      watcha: "https://watcha.com/ko-KR/contents/mO8a1Q2"
    },
    "black-clover-2nd-season": {
      netflix: "https://www.netflix.com/kr/title/80238012",
      watcha: "https://watcha.com/ko-KR/contents/tRB64Av"
    },
    "expelled-from-paradise-resonance-of-the-heart": {
      laftel: "https://laftel.net/item/23251",
      watcha: "https://watcha.com/ko/contents/mW93njM",
      tving: "https://www.tving.com/contents/M000360280"
    },
    "oblivion-battery-season-2": {
      laftel: "https://laftel.net/item/42086",
      watcha: "https://watcha.com/ko-KR/contents/tE15g6N",
      tving: "https://www.tving.com/contents/P001759524"
    },
    "the-new-prince-of-tennis-u-17-world-cup-final-roster-selection": {
      laftel: "https://laftel.net/item/42413",
      tving: "https://www.tving.com/contents/P001628588"
    },
    "fate-kaleid-liner-prisma-illya-finale": {
      laftel: "https://laftel.net/item/33300",
      watcha: "https://watcha.com/ko/contents/tPynagl",
      tving: "https://www.tving.com/contents/P001764603"
    },
    "dragon-ball-super-beerus": {
      watcha: "https://watcha.com/ko/contents/tR2Y6vE",
      tving: "https://www.tving.com/contents/P001682333"
    },
    "ace-of-diamond-act-ii-second-season-part-2": {
      laftel: "https://laftel.net/item/45434",
      watcha: "https://watcha.com/ko/contents/tRX5x1Q",
      tving: "https://www.tving.com/contents/P001785058"
    },
    "midnight-heart-tune-season-2": {
      laftel: "https://laftel.net/item/44233",
      tving: "https://www.tving.com/contents/P001781386"
    },
    "reincarnated-as-a-sword-ii": {
      prime: "https://www.primevideo.com/-/ko/detail/0SMRJS9YUTPHZO3CHCX2OX9AIX",
      tving: "https://www.tving.com/contents/P001655168"
    },
    "kaiju-no-8-narumis-weekday": {
      laftel: "https://laftel.net/item/42047",
      watcha: "https://watcha.com/ko/contents/tEqZAaY",
      tving: "https://www.tving.com/contents/P001754888"
    },
    "tiger-coming-in-2": {
      laftel: "https://laftel.net/item/42320",
      watcha: "https://watcha.com/ko/contents/tRbq6Lg",
      tving: "https://www.tving.com/contents/P001775884"
    },
    "girls-und-panzer-motto-love-love-operation": {
      netflix: "https://www.netflix.com/kr/title/80205232",
      watcha: "https://watcha.com/ko/contents/mOVPgwY"
    },
    "one-piece-film-god-valley": {
      netflix: "https://www.netflix.com/kr/title/80107103",
      tving: "https://www.tving.com/contents/P000327935"
    }
  };

  for (const [animeId, previous] of Object.entries(audit)) {
    window.setAnimeStreamingForRegion(animeId, "kr", { previous });
  }
})();