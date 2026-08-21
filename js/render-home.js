function initHomePage() {
  renderCaseOfWeek();
  renderCasebooks();
  renderIndividualCases();
  renderMbbGroups();
}

/* ---------- Case of the Week (top notification bar) ---------- */
function renderCaseOfWeek() {
  const bar = document.getElementById("cow-bar");
  const body = document.getElementById("cow-body");
  const openLink = document.getElementById("cow-open");
  const toggle = document.getElementById("cow-fav");
  if (!bar || !body) return;

  getCaseOfWeek().then((item) => {
    body.innerHTML = `
      <strong class="cow-bar__name">${item.caseName}</strong>
      <span class="cow-bar__meta">from ${item.casebookTitle} — Selected by ${item.selectedBy}</span>
    `;
    openLink.href = item.url;
    wireViewedToggle(bar, toggle, item.id);
  });
}

/* ---------- Favorite Casebooks ---------- */
const RANK_LABELS = { 1: "Top pick", 2: "2nd pick", 3: "3rd pick" };

function buildStairCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card stair-card";
  article.style.setProperty("--university-color", item.universityColor);
  const warnBadge = item.notForBeginners
    ? `<span class="badge badge--warn">Not for beginners</span>`
    : "";

  article.innerHTML = `
    <span class="rank-badge rank-badge--${item.rank}">${item.rank}</span>
    <div class="stair-card__body">
      <div class="stair-card__head">
        <h4 class="card__title"><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h4>
        <span class="rank-label rank-label--${item.rank}">${RANK_LABELS[item.rank]}</span>
        ${warnBadge}
      </div>
      <dl class="card__meta">
        <div><dt>University</dt><dd>${item.university}</dd></div>
        <div><dt>Updated</dt><dd>${item.yearUpdated}</dd></div>
        <div><dt>Author(s)</dt><dd>${item.authors.join(", ")}</dd></div>
      </dl>
      <p class="card__desc">${item.description}</p>
    </div>
    <button class="viewed-toggle" type="button">Mark as done</button>
  `;
  const toggle = article.querySelector(".viewed-toggle");
  wireViewedToggle(article, toggle, item.id, onToggle);
  return article;
}

function buildCasebookCard(item, onToggle) {
  const article = document.createElement("article");
  article.className = "card casebook-card";
  article.style.setProperty("--university-color", item.universityColor);
  const warnBadge = item.notForBeginners
    ? `<span class="badge badge--warn">Not for beginners</span>`
    : "";

  article.innerHTML = `
    <div class="card-top">
      <h4 class="card__title"><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h4>
    </div>
    ${warnBadge}
    <dl class="card__meta">
      <div><dt>University</dt><dd>${item.university}</dd></div>
      <div><dt>Updated</dt><dd>${item.yearUpdated}</dd></div>
      <div><dt>Author(s)</dt><dd>${item.authors.join(", ")}</dd></div>
    </dl>
    <p class="card__desc">${item.description}</p>
    <button class="viewed-toggle" type="button">Mark as done</button>
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
  });
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

function renderIndividualCases() {
  const list = document.getElementById("individual-cases-list");
  const progressEl = document.getElementById("individual-cases-progress");
  if (!list) return;

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
    }

    renderProgress(progressEl, cases);
    draw();
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
    <p class="card__desc">${item.description}</p>
    <div class="mbb-card__actions">
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
