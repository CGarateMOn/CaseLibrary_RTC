function initHomePage() {
  renderCaseOfWeek();
  renderCasebooks();
  renderIndividualCases();
  renderMbbGroups();
}

/* ---------- Case of the Week (top notification bar) ---------- */
function renderCaseOfWeek() {
  const bar = document.getElementById("cow-bar");
  const nameEl = document.getElementById("cow-name");
  const metaEl = document.getElementById("cow-meta");
  const openLink = document.getElementById("cow-open");
  const toggle = document.getElementById("cow-fav");
  if (!bar || !nameEl || !metaEl) return;

  getCaseOfWeek().then((item) => {
    if (!item) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    nameEl.textContent = item.caseName;
    metaEl.textContent = `Seleccionado por ${item.selectedBy}`;
    openLink.href = item.url;
    wireViewedToggle(bar, toggle, item.id);
  });
}

/* ---------- Favorite Casebooks ---------- */
const RANK_LABELS = { 1: "Mejor opción", 2: "2ª opción", 3: "3ª opción" };

// `university` can be null (independent compilations) or a name that isn't
// in UNIVERSITY_COLORS yet — both fall back to the card's neutral default
// border instead of breaking.
function universityColorFor(item) {
  return (item.university && UNIVERSITY_COLORS[item.university]) || null;
}

// Always render the Universidad row, even without one — "Entidad privada"
// as a fallback keeps every card's meta block the same shape (3 fields),
// so cards without a university don't end up visibly shorter than the
// ones that have it once card heights get equalized.
function universityMetaRow(item) {
  return `<div><dt>Universidad</dt><dd>${item.university || "Entidad privada"}</dd></div>`;
}

// `description` can be null/empty (e.g. MBB rows with no write-up yet) —
// omit the paragraph entirely instead of rendering the literal text "null".
function descriptionHtml(item) {
  return item.description
    ? `<p class="card__desc">${item.description}</p>`
    : "";
}

function buildStairCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card stair-card";
  const color = universityColorFor(item);
  if (color) article.style.setProperty("--university-color", color);
  const warnBadge = item.notForBeginners
    ? `<span class="badge badge--warn">No es para principiantes</span>`
    : "";

  article.innerHTML = `
    <span class="rank-badge rank-badge--${item.rank}">${item.rank}</span>
    <div class="stair-card__body">
      <div class="stair-card__head">
        <h4 class="card__title">${item.title}</h4>
        <span class="rank-label rank-label--${item.rank}">${RANK_LABELS[item.rank]}</span>
        ${warnBadge}
      </div>
      <dl class="card__meta">
        ${universityMetaRow(item)}
        <div><dt>Actualizado</dt><dd>${item.yearUpdated}</dd></div>
        <div><dt>Autor(es)</dt><dd>${item.authors.join(", ")}</dd></div>
      </dl>
      ${descriptionHtml(item)}
    </div>
    <div class="card__actions">
      <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Abrir Caso</a>
      <button class="viewed-toggle" type="button">Marcar como hecho</button>
    </div>
  `;
  const toggle = article.querySelector(".viewed-toggle");
  wireViewedToggle(article, toggle, item.id, onToggle);
  return article;
}

function buildCasebookCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card casebook-card";
  const color = universityColorFor(item);
  if (color) article.style.setProperty("--university-color", color);
  const warnBadge = item.notForBeginners
    ? `<span class="badge badge--warn">No es para principiantes</span>`
    : "";

  article.innerHTML = `
    <div class="card-top">
      <h4 class="card__title">${item.title}</h4>
    </div>
    ${warnBadge}
    <dl class="card__meta">
      ${universityMetaRow(item)}
      <div><dt>Actualizado</dt><dd>${item.yearUpdated}</dd></div>
      <div><dt>Autor(es)</dt><dd>${item.authors.join(", ")}</dd></div>
    </dl>
    ${descriptionHtml(item)}
    <div class="card__actions">
      <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Abrir Caso</a>
      <button class="viewed-toggle" type="button">Marcar como hecho</button>
    </div>
  `;
  const toggle = article.querySelector(".viewed-toggle");
  wireViewedToggle(article, toggle, item.id, onToggle);
  return article;
}

function renderCasebooks() {
  const tier1List = document.getElementById("casebooks-tier1");
  const tier2List = document.getElementById("casebooks-tier2");
  const progressEl = document.getElementById("casebooks-progress");
  if (!tier1List || !tier2List) return;

  getCasebooks().then((casebooks) => {
    const tier1 = casebooks
      .filter((c) => c.tier === 1)
      .sort((a, b) => a.rank - b.rank);
    const tier2 = casebooks.filter((c) => c.tier === 2);

    const updateProgress = () => renderProgress(progressEl, casebooks);

    // Tier 1 keeps its fixed rank order always — it's a deliberate
    // hierarchy (best/2nd/3rd pick), not a "what's left" list, so it never
    // reorders on mark-done.
    tier1.forEach((item) => {
      const li = document.createElement("li");
      li.dataset.rank = item.rank;
      li.appendChild(buildStairCard(item, updateProgress));
      tier1List.appendChild(li);
    });

    // Tier 2 ("other titles we like") has no ranking to protect, so done
    // items sink to the bottom like Individual Cases / MBB Cases.
    renderSortableList(
      tier2List,
      tier2,
      (item, onMarked) => {
        const li = document.createElement("li");
        li.appendChild(buildCasebookCard(item, onMarked));
        return li;
      },
      { onToggle: updateProgress }
    );

    updateProgress();
    equalizeHeights(tier1List.querySelectorAll(".stair-card"));

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => equalizeHeights(tier1List.querySelectorAll(".stair-card")), 150);
    });
  });
}

// Tier-1 cards stack vertically (not a grid row), so there's no automatic
// "stretch to the tallest sibling" the way grid rows get for free — measure
// and force it explicitly. Resets to auto first so a shrinking card (e.g.
// after a viewport resize widens the text) can measure its true height,
// not the previous forced one.
function equalizeHeights(elements) {
  const items = Array.from(elements);
  if (items.length < 2) return;
  items.forEach((el) => { el.style.height = "auto"; });
  const tallest = Math.max(...items.map((el) => el.getBoundingClientRect().height));
  items.forEach((el) => { el.style.height = `${tallest}px`; });
}

// How long to wait, after a click, before a "sink to bottom" list actually
// reorders — long enough that the button's own "pulse" animation (.35s, in
// base.css) gets to play in full before its card is torn down and rebuilt
// at the new spot.
const REORDER_DELAY = 380;
const REORDER_ANIM_MS = 220;

// Renders `items` into `listEl`, sorted with done items sunk to the bottom,
// animating the move with a short slide instead of an instant snap.
// `buildCard(item, onMarked)` must build the movable element itself (the
// direct child of `listEl` — an <li> if listEl wraps cards in <li>s, the
// card itself otherwise) and wire its toggle to call `onMarked` once state
// is persisted. `onToggle` (optional) runs immediately on every click, e.g.
// to update a progress pill; `afterRebuild` (optional) runs after every
// rebuild, e.g. to recompute a row-capped scroll height.
function renderSortableList(listEl, items, buildCard, { onToggle, afterRebuild } = {}) {
  let reorderTimer;

  function draw() {
    const firstRects = {};
    Array.from(listEl.children).forEach((el) => {
      firstRects[el.dataset.sortId] = el.getBoundingClientRect();
    });

    listEl.innerHTML = "";
    const ordered = [...items].sort(
      (a, b) => Number(ViewedTracker.isViewed(a.id)) - Number(ViewedTracker.isViewed(b.id))
    );
    ordered.forEach((item) => {
      const el = buildCard(item, () => {
        if (onToggle) onToggle();
        clearTimeout(reorderTimer);
        reorderTimer = setTimeout(draw, REORDER_DELAY);
      });
      el.dataset.sortId = item.id;
      listEl.appendChild(el);
    });

    if (afterRebuild) afterRebuild();

    Array.from(listEl.children).forEach((el) => {
      const first = firstRects[el.dataset.sortId];
      if (!first) return;
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (!dx && !dy) return;
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        el.style.transition = `transform ${REORDER_ANIM_MS}ms ease`;
        el.style.transform = "";
      });
    });
  }

  draw();
}

/* ---------- Favorite Individual Cases ---------- */
function buildIndividualCard(item, onToggle) {
  const li = document.createElement("li");
  li.className = "card indiv-case-card";
  li.innerHTML = `
    <div class="card-top">
      <h4 class="card__title">${item.caseName}</h4>
    </div>
    <p class="card__meta">De: ${item.casebookTitle}</p>
    <p class="card__meta">Autor(es): ${item.authors.join(", ")}</p>
    <p class="card__recommender">Recomendado por <strong>${item.recommendedBy}</strong></p>
    <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Abrir Caso</a>
    <button class="viewed-toggle" type="button">Marcar como hecho</button>
  `;
  const toggle = li.querySelector(".viewed-toggle");
  wireViewedToggle(li, toggle, item.id, onToggle);
  return li;
}

// Measures the actual rendered row positions (column count varies with
// viewport width, so row height can't be a fixed CSS value) and caps the
// scroll container's height to the bottom of the 3rd row. Fewer than 3
// rows of content: no cap, nothing to scroll.
function capToRows(scrollEl, listEl, maxRows) {
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

function renderIndividualCases() {
  const scrollEl = document.getElementById("individual-cases-scroll");
  const list = document.getElementById("individual-cases-list");
  const progressEl = document.getElementById("individual-cases-progress");
  if (!list || !scrollEl) return;

  getIndividualCases().then((cases) => {
    renderProgress(progressEl, cases);
    renderSortableList(list, cases, buildIndividualCard, {
      onToggle: () => renderProgress(progressEl, cases),
      afterRebuild: () => capToRows(scrollEl, list, 3)
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => capToRows(scrollEl, list, 3), 150);
    });
  });
}

/* ---------- MBB Cases, grouped by firm ---------- */
const MBB_FIRM_SLUG_ORDER = ["mckinsey", "bcg", "bain"];

function buildMbbCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card mbb-card";
  article.innerHTML = `
    <div class="card-top">
      <h4 class="card__title">${item.title}</h4>
    </div>
    ${descriptionHtml(item)}
    <div class="card__actions">
      <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Abrir Caso</a>
      <button class="viewed-toggle viewed-toggle--sm" type="button">Marcar como hecho</button>
    </div>
  `;
  const toggle = article.querySelector(".viewed-toggle");
  wireViewedToggle(article, toggle, item.id, onToggle);
  return article;
}

function renderMbbGroups() {
  const container = document.getElementById("mbb-groups");
  if (!container) return;

  getMbbLinks().then((links) => {
    MBB_FIRM_SLUG_ORDER.forEach((slug) => {
      const firmLinks = links.filter((item) => item.firmSlug === slug);
      if (firmLinks.length === 0) return;
      const firmName = firmLinks[0].firm;

      const group = document.createElement("div");
      group.className = "mbb-firm-group";
      group.dataset.firm = slug;

      const progressId = `mbb-progress-${slug}`;
      group.innerHTML = `
        <div class="section__head section__head--sub">
          <h3 class="mbb-firm-group__title">${firmName}</h3>
          <span class="progress" id="${progressId}"></span>
        </div>
        <div class="card-grid" id="mbb-grid-${slug}"></div>
      `;
      container.appendChild(group);

      const grid = group.querySelector(`#mbb-grid-${slug}`);
      const progressEl = group.querySelector(`#${progressId}`);

      renderProgress(progressEl, firmLinks);
      renderSortableList(grid, firmLinks, buildMbbCard, {
        onToggle: () => renderProgress(progressEl, firmLinks)
      });
    });
  });
}
