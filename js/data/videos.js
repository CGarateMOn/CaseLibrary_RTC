// Real content lives in js/data/videos.md — a plain Markdown table anyone on
// the team can edit directly (see the comment at the top of that file for
// the editing rules). This file just fetches it and turns rows into the
// shape render-videos.js expects; getVideos() keeps returning a Promise like
// every other js/data/*.js file, so no caller needs to change.

// Categoría (Markdown column) -> firmSlug used for grouping/CSS accent color,
// and the short label shown on each card's badge.
const VIDEO_CATEGORIES = {
  "McKinsey": { firmSlug: "mckinsey", firm: "McKinsey" },
  "BCG": { firmSlug: "bcg", firm: "BCG" },
  "Bain": { firmSlug: "bain", firm: "Bain" },
  "General": { firmSlug: "general", firm: "Cómo ser consultor" }
};

function parseVideosMarkdown(text) {
  const rows = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  // rows[0] = header, rows[1] = "---" separator, rows[2+] = data
  return rows.slice(2).map((line) => {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    const [id, categoria, title, channel, duration, url, description] = cells;
    const category = VIDEO_CATEGORIES[categoria] || VIDEO_CATEGORIES.General;
    return {
      id,
      title,
      channel,
      duration,
      description,
      url,
      firm: category.firm,
      firmSlug: category.firmSlug
    };
  });
}

function getVideos() {
  return fetch("js/data/videos.md")
    .then((res) => res.text())
    .then(parseVideosMarkdown);
}
