// Keep year-only / season-only releases out of arbitrary month buckets and group them by active year.
(() => {
  // A localized seasonal display (for example "겨울") means the exact month is not confirmed.
  // Normalize these runtime entries to year precision so the main monthly schedule does not imply a month.
  animeData.forEach(anime => {
    const release = getPrimaryScheduleRelease(anime);
    if (release?.status === "month" && release?.display && release?.year) {
      release.status = "year";
      release.month = null;
      release.day = null;
      release.display = null;
    }
  });

  function undatedYearLabel(year) {
    if (activeLang === "ko") return `${year}년 방영 예정 · 월 미정`;
    if (activeLang === "ja") return `${year}年放送予定・月未定`;
    return `Scheduled for ${year} · Month TBA`;
  }

  renderUndated = function renderUndatedByYear() {
    const undatedAnime = animeData.filter(anime => {
      const release = getPrimaryScheduleRelease(anime);
      return release?.year === activeYear && (release.status === "year" || release.status === "tba");
    });

    const undatedLabel = document.querySelector("#undatedToggle > span:first-child");
    if (undatedLabel) undatedLabel.textContent = undatedYearLabel(activeYear);

    document.getElementById("undatedList").innerHTML = undatedAnime.map(anime => {
      const release = getPrimaryScheduleRelease(anime);
      const yearLabel = release?.year ? String(release.year) : t("tba");

      return `
      <div class="undated-item">
        <div class="undated-layout">
          ${posterMarkup(anime)}
          <div class="undated-content-main">
            <div class="card-top">
              <div class="title-group">
                ${verificationIconMarkup(anime)}
                <div class="undated-title-scroll"><div class="undated-title undated-title-scroll-inner">${localTitle(anime)}</div></div>
              </div>
              <div class="date precision-year">${yearLabel}</div>
            </div>
            <div class="meta">
              ${anime.tags.map(tag => `<span class="badge ${tag}">${categoryLabel(tag)}</span>`).join("")}
            </div>
            ${resourceActions(anime)}
          </div>
        </div>
      </div>
    `;
    }).join("");

    undatedSection.classList.toggle("hidden", undatedAnime.length === 0);
  };

  // Re-render once after precision normalization so season-only titles disappear from month buckets immediately.
  render();
})();
