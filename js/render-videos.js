function initVideosPage() {
  const filterBar = document.getElementById("video-filters");
  const container = document.getElementById("video-groups");
  if (!container) return;

  getVideos().then((videos) => {
    if (filterBar) renderVideoFilters(filterBar, videos);
    renderVideoGroups(container, videos);
  });
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

// Short labels for the filter chips (distinct from the longer group headings).
const VIDEO_FILTER_LABELS = {
  mckinsey: "McKinsey",
  bcg: "BCG",
  bain: "Bain",
  general: "Cómo ser consultor"
};

// The chip bar is built from whatever categories actually have videos, so a
// category with zero entries (e.g. "General" before we have any) just isn't
// offered — no manual toggling needed once real videos are added there.
function renderVideoFilters(filterBar, videos) {
  const presentSlugs = VIDEO_FIRM_SLUG_ORDER.filter((slug) => videos.some((item) => item.firmSlug === slug));

  filterBar.innerHTML = `
    <button type="button" class="chip" data-filter="all" aria-pressed="true">Todos</button>
    ${presentSlugs
      .map((slug) => `<button type="button" class="chip" data-filter="${slug}" aria-pressed="false">${VIDEO_FILTER_LABELS[slug]}</button>`)
      .join("")}
  `;

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

// Deriva el ID de vídeo de YouTube tanto de enlaces youtu.be/<id> como
// youtube.com/watch?v=<id>, para poder pedir la miniatura real sin API key.
function extractYoutubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.has("v")) return u.searchParams.get("v");
  } catch (e) {
    return null;
  }
  return null;
}

function buildVideoCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card video-card";
  article.dataset.videoId = item.id;
  const videoId = extractYoutubeId(item.url);
  const thumbImg = videoId
    ? `<img class="video-thumb__img" src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="" loading="lazy">`
    : "";
  article.innerHTML = `
    <a class="video-thumb" href="${item.url}" target="_blank" rel="noopener" aria-label="Ver: ${item.title}">
      ${thumbImg}
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

// How long to wait, after a click, before the list actually reorders — long
// enough that the button's own "pulse" animation (.35s, in base.css) gets to
// play in full before its card is torn down and rebuilt at the new spot.
const VIDEO_REORDER_DELAY = 380;
const VIDEO_REORDER_ANIM_MS = 220;

function renderVideoGroups(container, videos) {
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

    let reorderTimer;

    function draw() {
      // FIRST: remember where each existing card currently sits.
      const firstRects = {};
      Array.from(grid.children).forEach((card) => {
        firstRects[card.dataset.videoId] = card.getBoundingClientRect();
      });

      grid.innerHTML = "";
      // Stable sort: not-done first (original order), done videos sink
      // to the bottom, same "how much is left" logic as Individual Cases.
      const ordered = [...items].sort(
        (a, b) => Number(ViewedTracker.isViewed(a.id)) - Number(ViewedTracker.isViewed(b.id))
      );
      ordered.forEach((item) => {
        grid.appendChild(buildVideoCard(item, () => {
          renderProgress(progressEl, items);
          clearTimeout(reorderTimer);
          reorderTimer = setTimeout(draw, VIDEO_REORDER_DELAY);
        }));
      });
      capVideoRows(scrollEl, grid, getVideoRowCap());

      // LAST + INVERT + PLAY: slide each card from its old spot to its new
      // one instead of letting it just snap there.
      Array.from(grid.children).forEach((card) => {
        const first = firstRects[card.dataset.videoId];
        if (!first) return;
        const last = card.getBoundingClientRect();
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (!dx && !dy) return;
        card.style.transition = "none";
        card.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => {
          card.style.transition = `transform ${VIDEO_REORDER_ANIM_MS}ms ease`;
          card.style.transform = "";
        });
      });
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
}
