function initVideosPage() {
  renderVideoGroups();
  initVideoFilters();
}

const VIDEO_FIRM_SLUG_ORDER = ["mckinsey", "bcg", "bain", "general"];

// Group headings say "Casos estilo X", not just "X" — these aren't official
// firm content, just videos about that firm's style of case. The per-card
// badge stays short (item.firm) since it's just a compact tag.
const VIDEO_GROUP_LABELS = {
  mckinsey: "Casos estilo McKinsey",
  bcg: "Casos estilo BCG",
  bain: "Casos estilo Bain",
  general: "Cómo ser consultor"
};

// 1 row on desktop, 2 on mobile — matches the site's single 1024px
// breakpoint. Video categories can grow long, so this is deliberately
// tighter than the 3-row cap on Favorite Individual Cases.
function getVideoRowCap() {
  return window.innerWidth >= 1024 ? 1 : 2;
}

// Same measuring approach as capToRows in render-home.js, duplicated here
// since this page doesn't load render-home.js — it's a small, self-
// contained utility, not worth a shared-module split for one function.
function capVideoRows(scrollEl, listEl, maxRows) {
  const items = Array.from(listEl.children);
  if (!items.length) {
    scrollEl.style.maxHeight = "";
    return;
  }
  const listTop = listEl.getBoundingClientRect().top;
  const relTops = items.map((el) => Math.round(el.getBoundingClientRect().top - listTop));
  const rowTops = [...new Set(relTops)].sort((a, b) => a - b);
  if (rowTops.length <= maxRows) {
    scrollEl.style.maxHeight = "";
    return;
  }
  const cutoffTop = rowTops[maxRows - 1];
  const rowItems = items.filter((el, i) => relTops[i] === cutoffTop);
  const cutoffBottom = Math.max(...rowItems.map((el) => {
    const r = el.getBoundingClientRect();
    return Math.round(r.top - listTop + r.height);
  }));
  scrollEl.style.maxHeight = `${cutoffBottom}px`;
}

function buildVideoCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card video-card";
  article.innerHTML = `
    <a class="video-thumb" href="${item.url}" target="_blank" rel="noopener" aria-label="Ver: ${item.title}">
      <span class="video-thumb__play"></span>
      <span class="video-thumb__duration">${item.duration}</span>
    </a>
    <div class="video-card__body">
      <span class="firm-badge">${item.firm}</span>
      <h4 class="card__title"><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h4>
      <p class="card__meta">${item.channel}</p>
      <p class="card__desc">${item.description}</p>
      <button class="viewed-toggle viewed-toggle--sm" type="button">Marcar como hecho</button>
    </div>
  `;
  const toggle = article.querySelector(".viewed-toggle");
  wireViewedToggle(article, toggle, item.id, onToggle);
  return article;
}

function renderVideoGroups() {
  const container = document.getElementById("video-groups");
  if (!container) return;

  getVideos().then((videos) => {
    const recomputeFns = [];

    VIDEO_FIRM_SLUG_ORDER.forEach((slug) => {
      const items = videos.filter((item) => item.firmSlug === slug);
      if (items.length === 0) return;

      const group = document.createElement("div");
      group.className = "video-group";
      group.dataset.firm = slug;

      const progressId = `video-progress-${slug}`;
      group.innerHTML = `
        <div class="section__head section__head--sub">
          <h3 class="video-group__title">${VIDEO_GROUP_LABELS[slug]}</h3>
          <span class="progress" id="${progressId}"></span>
        </div>
        <div class="video-group-scroll" id="video-scroll-${slug}">
          <div class="card-grid" id="video-grid-${slug}"></div>
        </div>
      `;
      container.appendChild(group);

      const scrollEl = group.querySelector(`#video-scroll-${slug}`);
      const grid = group.querySelector(`#video-grid-${slug}`);
      const progressEl = group.querySelector(`#${progressId}`);

      function draw() {
        grid.innerHTML = "";
        // Stable sort: not-done first (original order), done videos sink
        // to the bottom, same "how much is left" logic as Individual Cases.
        const ordered = [...items].sort(
          (a, b) => Number(ViewedTracker.isViewed(a.id)) - Number(ViewedTracker.isViewed(b.id))
        );
        ordered.forEach((item) => {
          grid.appendChild(buildVideoCard(item, () => {
            renderProgress(progressEl, items);
            draw();
          }));
        });
        capVideoRows(scrollEl, grid, getVideoRowCap());
      }

      renderProgress(progressEl, items);
      draw();
      recomputeFns.push(() => capVideoRows(scrollEl, grid, getVideoRowCap()));
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => recomputeFns.forEach((fn) => fn()), 150);
    });
  });
}

function initVideoFilters() {
  const filterBar = document.getElementById("video-filters");
  if (!filterBar) return;

  filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    filterBar.querySelectorAll(".chip").forEach((c) => {
      c.setAttribute("aria-pressed", String(c === chip));
    });

    const filter = chip.dataset.filter;
    document.querySelectorAll(".video-group").forEach((group) => {
      group.hidden = !(filter === "all" || group.dataset.firm === filter);
    });
  });
}
