// Converts the first resource action on each anime card into a PV picker.
(() => {
  const sourceAnime = window.allAnimeData || window.animeData || [];
  const animeByTitle = new Map();
  sourceAnime.forEach(anime => {
    Object.values(anime.title || {}).forEach(title => {
      if (title) animeByTitle.set(String(title).trim(), anime);
    });
  });

  const localeText = {
    ko: {
      kicker: "프로모션 영상",
      description: "시청할 PV를 선택하세요.",
      close: "닫기",
      youtube: "YouTube ↗"
    },
    ja: {
      kicker: "プロモーション映像",
      description: "視聴するPVを選択してください。",
      close: "閉じる",
      youtube: "YouTube ↗"
    },
    en: {
      kicker: "PROMOTIONAL VIDEOS",
      description: "Choose a PV to watch.",
      close: "Close",
      youtube: "YouTube ↗"
    }
  };

  function language() {
    const value = (document.documentElement.lang || "ko").toLowerCase();
    if (value.startsWith("ja")) return "ja";
    if (value.startsWith("en")) return "en";
    return "ko";
  }

  function text(key) {
    return localeText[language()][key];
  }

  function localTitle(anime) {
    const lang = language();
    return anime?.title?.[lang] || anime?.title?.ko || anime?.title?.ja || anime?.title?.en || "";
  }

  function localPvLabel(entry) {
    const lang = language();
    if (typeof entry?.label === "string") return entry.label;
    return entry?.label?.[lang] || entry?.label?.ko || entry?.label?.ja || entry?.label?.en || "PV";
  }

  function entriesFor(anime) {
    return Array.isArray(anime?.pvs) ? anime.pvs.filter(entry => entry?.url) : [];
  }

  const modal = document.createElement("div");
  modal.className = "stream-modal hidden";
  modal.id = "pvModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "pvModalTitle");
  modal.innerHTML = `
    <div class="stream-modal-backdrop" data-pv-close></div>
    <section class="stream-dialog pv-dialog" tabindex="-1">
      <div class="stream-dialog-head">
        <div>
          <div class="stream-dialog-kicker" id="pvModalKicker"></div>
          <h4 id="pvModalTitle"></h4>
        </div>
        <button class="stream-close pv-close" type="button" data-pv-close>×</button>
      </div>
      <p class="stream-dialog-desc" id="pvModalDesc"></p>
      <div class="ott-grid pv-grid" id="pvGrid"></div>
    </section>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector("#pvModalTitle");
  const modalKicker = modal.querySelector("#pvModalKicker");
  const modalDesc = modal.querySelector("#pvModalDesc");
  const pvGrid = modal.querySelector("#pvGrid");
  const closeButton = modal.querySelector(".pv-close");
  let lastTrigger = null;

  function syncModalLanguage() {
    modalKicker.textContent = text("kicker");
    modalDesc.textContent = text("description");
    closeButton.setAttribute("aria-label", text("close"));
  }

  function openModal(anime, trigger) {
    const entries = entriesFor(anime);
    if (!entries.length) return;
    lastTrigger = trigger;
    syncModalLanguage();
    modalTitle.textContent = localTitle(anime);
    pvGrid.innerHTML = entries.map(entry => `
      <a class="ott-option pv-option" href="${entry.url}" target="_blank" rel="noopener noreferrer">
        <span class="ott-option-name">${localPvLabel(entry)}</span>
        <span class="ott-option-state">${text("youtube")}</span>
      </a>
    `).join("");
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeModal() {
    if (modal.classList.contains("hidden")) return;
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  function animeForCard(container) {
    const titleElement = container.querySelector(".title, .undated-title");
    if (!titleElement) return null;
    return animeByTitle.get(titleElement.textContent.trim()) || null;
  }

  function replacePvAction(container) {
    const anime = animeForCard(container);
    const actions = container.querySelector(".resource-actions");
    if (!anime || !actions || !actions.firstElementChild) return;

    const current = actions.firstElementChild;
    if (current.dataset?.pvAnimeId === anime.id) return;

    const entries = entriesFor(anime);
    let replacement;
    if (entries.length) {
      replacement = document.createElement("button");
      replacement.type = "button";
      replacement.className = "resource-btn pv-trigger";
      replacement.dataset.pvAnimeId = anime.id;
      replacement.innerHTML = `<span>PV</span><span class="external" aria-hidden="true">▾</span>`;
    } else {
      replacement = document.createElement("span");
      replacement.className = "resource-btn disabled";
      replacement.setAttribute("aria-disabled", "true");
      replacement.dataset.pvAnimeId = anime.id;
      replacement.textContent = "PV";
    }
    current.replaceWith(replacement);
  }

  function upgradeCards() {
    document.querySelectorAll("#schedule .card, #undatedList .undated-item")
      .forEach(replacePvAction);
  }

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-pv-anime-id]");
    if (trigger && trigger.matches("button.pv-trigger")) {
      const anime = sourceAnime.find(item => item.id === trigger.dataset.pvAnimeId);
      if (anime) openModal(anime, trigger);
      return;
    }
    if (event.target.closest("[data-pv-close]")) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (modal.classList.contains("hidden")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")]
      .filter(element => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const observer = new MutationObserver(upgradeCards);
  const schedule = document.getElementById("schedule");
  const undatedList = document.getElementById("undatedList");
  if (schedule) observer.observe(schedule, { childList: true, subtree: true });
  if (undatedList) observer.observe(undatedList, { childList: true, subtree: true });

  upgradeCards();
})();
