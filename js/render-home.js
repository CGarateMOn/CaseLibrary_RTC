function initHomePage() {
  renderCaseOfWeek();
  renderCasebooks();
  renderMbbLinks();
  renderIndividualCases();
}

function renderCaseOfWeek() {
  const card = document.getElementById("cow-card");
  if (!card) return;

  getCaseOfWeek().then((item) => {
    card.innerHTML = `
      <h3 class="cow-card__title">${item.caseName}</h3>
      <p class="cow-card__meta">From: ${item.casebookTitle} — ${item.authors.join(", ")}</p>
      <p class="cow-card__blurb">${item.blurb}</p>
      <div class="cow-card__actions">
        <a class="btn btn--primary" href="${item.url}" target="_blank" rel="noopener">Open Case</a>
        <button class="viewed-toggle" type="button">Mark as done</button>
      </div>
    `;
    const toggle = card.querySelector(".viewed-toggle");
    wireViewedToggle(card, toggle, item.id);
  });
}

function buildCasebookCard(item) {
  const article = document.createElement("article");
  article.className = "card casebook-card";
  article.innerHTML = `
    <h4 class="card__title"><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h4>
    <dl class="card__meta">
      <div><dt>University</dt><dd>${item.university}</dd></div>
      <div><dt>Updated</dt><dd>${item.yearUpdated}</dd></div>
      <div><dt>Author(s)</dt><dd>${item.authors.join(", ")}</dd></div>
    </dl>
    <p class="card__desc">${item.description}</p>
    <button class="viewed-toggle" type="button">Mark as done</button>
  `;
  const toggle = article.querySelector(".viewed-toggle");
  wireViewedToggle(article, toggle, item.id);
  return article;
}

function renderCasebooks() {
  const tier1List = document.getElementById("casebooks-tier1");
  const tier2List = document.getElementById("casebooks-tier2");
  if (!tier1List || !tier2List) return;

  getCasebooks().then((casebooks) => {
    const tier1 = casebooks
      .filter((c) => c.tier === 1)
      .sort((a, b) => a.rank - b.rank);
    const tier2 = casebooks.filter((c) => c.tier === 2);

    tier1.forEach((item) => {
      const li = document.createElement("li");
      li.appendChild(buildCasebookCard(item));
      tier1List.appendChild(li);
    });

    tier2.forEach((item) => {
      const li = document.createElement("li");
      li.appendChild(buildCasebookCard(item));
      tier2List.appendChild(li);
    });
  });
}

function renderMbbLinks() {
  const list = document.getElementById("mbb-list");
  if (!list) return;

  getMbbLinks().then((links) => {
    links.forEach((item) => {
      const li = document.createElement("li");
      li.className = "link-list__item";
      li.dataset.firm = item.firm.toLowerCase();
      li.innerHTML = `
        <span class="firm-badge">${item.firm}</span><br>
        <a href="${item.url}" target="_blank" rel="noopener">${item.title}</a>
        <p>${item.description}</p>
      `;
      list.appendChild(li);
    });
  });
}

function renderIndividualCases() {
  const list = document.getElementById("individual-cases-list");
  if (!list) return;

  getIndividualCases().then((cases) => {
    cases.forEach((item) => {
      const li = document.createElement("li");
      li.className = "card indiv-case-card";
      li.innerHTML = `
        <article>
          <h4 class="card__title">${item.caseName}</h4>
          <p class="card__meta">From: ${item.casebookTitle}</p>
          <p class="card__meta">Author(s): ${item.authors.join(", ")}</p>
          <p class="card__recommender">Recommended by <strong>${item.recommendedBy}</strong></p>
          <a class="btn btn--secondary" href="${item.url}" target="_blank" rel="noopener">Open Case</a>
          <button class="viewed-toggle" type="button">Mark as done</button>
        </article>
      `;
      const toggle = li.querySelector(".viewed-toggle");
      wireViewedToggle(li, toggle, item.id);
      list.appendChild(li);
    });
  });
}
