const filterNames = {
  major: "주요 기대작",
  follow: "후속작",
  new: "신작",
  streaming: "스트리밍"
};

let activeFilter = "all";

const scheduleEl = document.getElementById("schedule");
const searchEl = document.getElementById("search");
const totalCountEl = document.getElementById("totalCount");
const monthNavEl = document.getElementById("monthNav");

const total = data.reduce((sum, month) => sum + month.items.length, 0);
totalCountEl.textContent = total;

monthNavEl.innerHTML = data.map(m =>
  `<a href="#m-${m.month}">${m.label.replace("년 ",".")}</a>`
).join("");

function render() {
  const q = searchEl.value.trim().toLowerCase();
  let previousSeason = "";

  scheduleEl.innerHTML = data.map(month => {
    const items = month.items.filter(([title, date, tags]) => {
      const searchOk = !q || title.toLowerCase().includes(q);
      const filterOk = activeFilter === "all" || tags.includes(activeFilter);
      return searchOk && filterOk;
    });

    const seasonHeader = month.season !== previousSeason
      ? `<div class="season-divider"><h2>${month.season}</h2></div>`
      : "";

    previousSeason = month.season;

    const cards = items.length
      ? items.map(([title, date, tags]) => `
          <article class="card">
            <div class="card-top">
              <div class="title">${title}</div>
              <div class="date">${date}</div>
            </div>
            <div class="meta">
              ${tags.map(tag => `<span class="badge ${tag}">${filterNames[tag] || tag}</span>`).join("")}
            </div>
          </article>
        `).join("")
      : `<div class="empty">${
          month.items.length === 0
            ? "현재 월 단독 시작으로 확정된 주요 작품 없음"
            : "현재 검색·필터 조건에 맞는 작품 없음"
        }</div>`;

    return `
      ${seasonHeader}
      <section class="month" id="m-${month.month}">
        <div class="month-head">
          <div>
            <h3>${month.label}</h3>
            <small>${month.season}</small>
          </div>
          <span class="month-count">${items.length}작품</span>
        </div>
        <div class="cards">${cards}</div>
      </section>
    `;
  }).join("");
}

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

searchEl.addEventListener("input", render);

document.getElementById("resetBtn").addEventListener("click", () => {
  searchEl.value = "";
  activeFilter = "all";
  document.querySelectorAll(".chip").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === "all");
  });
  render();
});

document.getElementById("undatedList").innerHTML =
  undated.map(title => `<div class="undated-item">${title}</div>`).join("");

document.getElementById("undatedToggle").addEventListener("click", () => {
  const content = document.getElementById("undatedContent");
  const arrow = document.getElementById("undatedArrow");
  content.classList.toggle("hidden");
  arrow.textContent = content.classList.contains("hidden") ? "＋" : "−";
});

render();
