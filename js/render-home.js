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
    metaEl.textContent = `Selected by ${item.selectedBy}`;
    openLink.href = item.url;
    wireViewedToggle(bar, toggle, item.id);
  });
}

/* ---------- Favorite Casebooks ---------- */
const RANK_LABELS = { 1: "Top pick", 2: "2nd pick", 3: "3rd pick" };

// `university` can be null (independent compilations) or a name that isn't
// in UNIVERSITY_COLORS yet — both fall back to the card's neutral default
// border instead of breaking.
function universityColorFor(item) {
  return (item.university && UNIVERSITY_COLORS[item.university]) || null;
}

function universityMetaRow(item) {
  return item.university
    ? `<div><dt>University</dt><dd>${item.university}</dd></div>`
    : "";
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
    ? `<span class="badge badge--warn">Not for beginners</span>`
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
        <div><dt>Updated</dt><dd>${item.yearUpdated}</dd></div>
        <div><dt>Author(s)</dt><dd>${item.authors.join(", ")}</dd></div>
      </dl>
      ${descriptionHtml(item)}
    </div>
    <div class="card__actions">
      <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Open Case</a>
      <button class="viewed-toggle" type="button">Mark as done</button>
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
    ? `<span class="badge badge--warn">Not for beginners</span>`
    : "";

  article.innerHTML = `
    <div class="card-top">
      <h4 class="card__title">${item.title}</h4>
    </div>
    ${warnBadge}
    <dl class="card__meta">
      ${universityMetaRow(item)}
      <div><dt>Updated</dt><dd>${item.yearUpdated}</dd></div>
      <div><dt>Author(s)</dt><dd>${item.authors.join(", ")}</dd></div>
    </dl>
    ${descriptionHtml(item)}
    <div class="card__actions">
      <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Open Case</a>
      <button class="viewed-toggle" type="button">Mark as done</button>
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

    tier1.forEach((item) => {
      const li = document.createElement("li");
      li.dataset.rank = item.rank;
      li.appendChild(buildStairCard(item, updateProgress));
      tier1List.appendChild(li);
    });

    tier2.forEach((item) => {
      const li = document.createElement("li");
      li.appendChild(buildCasebookCard(item, updateProgress));
      tier2List.appendChild(li);
    });

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

/* ---------- Favorite Individual Cases ---------- */
function buildIndividualCard(item, onToggle) {
  const li = document.createElement("li");
  li.className = "card indiv-case-card";
  li.innerHTML = `
    <div class="card-top">
      <h4 class="card__title">${item.caseName}</h4>
    </div>
    <p class="card__meta">From: ${item.casebookTitle}</p>
    <p class="card__meta">Author(s): ${item.authors.join(", ")}</p>
    <p class="card__recommender">Recommended by <strong>${item.recommendedBy}</strong></p>
    <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Open Case</a>
    <button class="viewed-toggle" type="button">Mark as done</button>
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
    function draw() {
      list.innerHTML = "";
      // Stable sort: not-done first (in original order), done cases sink
      // to the bottom (in original order) as they get marked complete.
      const ordered = [...cases].sort(
        (a, b) => Number(ViewedTracker.isViewed(a.id)) - Number(ViewedTracker.isViewed(b.id))
      );
      ordered.forEach((item) => {
        list.appendChild(buildIndividualCard(item, () => {
          renderProgress(progressEl, cases);
          draw();
        }));
      });
      capToRows(scrollEl, list, 3);
    }

    renderProgress(progressEl, cases);
    draw();

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
      <a class="btn btn--secondary btn--sm" href="${item.url}" target="_blank" rel="noopener">Open Case</a>
      <button class="viewed-toggle viewed-toggle--sm" type="button">Mark as done</button>
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
      const updateProgress = () => renderProgress(progressEl, firmLinks);

      firmLinks.forEach((item) => {
        grid.appendChild(buildMbbCard(item, updateProgress));
      });

      updateProgress();
    });
  });
}
