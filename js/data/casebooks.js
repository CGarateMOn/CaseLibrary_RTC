// PLACEHOLDER SAMPLE DATA — replace entries with real casebooks before launch.
// This is the exact shape .github/workflows/sync-data.yml will overwrite
// this file with once the Google Sheet is live.
//
// `tier` and `notForBeginners` are independent: tier just says whether this
// is one of our top-3 all-round picks (1) or another title we like (2).
// "Not for beginners" is its own flag that can be true or false in either
// tier — a tier-2 book isn't automatically advanced.
//
// `university` can be null (a casebook not tied to any one school). There
// is no `universityColor` field here — that color comes from the
// hand-maintained UNIVERSITY_COLORS lookup in university-colors.js, keyed
// by this `university` string; render-home.js falls back to a neutral
// border if the name isn't in that map (or is null).
const CASEBOOKS = [
  {
    id: "casebook-hbs-2023",
    title: "Harvard Consulting Club Casebook 2023",
    university: "Harvard Business School",
    yearUpdated: 2023,
    authors: ["Harvard Consulting Club"],
    url: "https://onedrive.live.com/PLACEHOLDER/hbs-casebook-2023",
    tier: 1,
    rank: 1,
    notForBeginners: false,
    description: "Broad set of profitability, market-entry, and M&A cases; strong for first-time practice."
  },
  {
    id: "casebook-columbia-2022",
    title: "Columbia Case Competition Book 2022",
    university: "Columbia University",
    yearUpdated: 2022,
    authors: ["Columbia Consulting Club"],
    url: "https://onedrive.live.com/PLACEHOLDER/columbia-casebook-2022",
    tier: 1,
    rank: 2,
    notForBeginners: false,
    description: "Well-structured cases with clear frameworks, good for building fundamentals."
  },
  {
    id: "casebook-lse-2023",
    title: "LSE Consulting Society Casebook 2023",
    university: "London School of Economics",
    yearUpdated: 2023,
    authors: ["LSE Consulting Society"],
    url: "https://onedrive.live.com/PLACEHOLDER/lse-casebook-2023",
    tier: 1,
    rank: 3,
    notForBeginners: false,
    description: "Solid variety of market-sizing and operations cases with detailed guides."
  },
  {
    id: "casebook-stanford-2021",
    title: "Stanford GSB Advanced Case Compendium 2021",
    university: "Stanford Graduate School of Business",
    yearUpdated: 2021,
    authors: ["Stanford GSB Consulting Club"],
    url: "https://onedrive.live.com/PLACEHOLDER/stanford-advanced-2021",
    tier: 2,
    rank: null,
    notForBeginners: true,
    description: "Dense, ambiguous cases aimed at candidates who already have the fundamentals down."
  },
  {
    id: "casebook-wharton-pe-2022",
    title: "Wharton PE/M&A Advanced Casebook 2022",
    university: "Wharton (University of Pennsylvania)",
    yearUpdated: 2022,
    authors: ["Wharton Consulting Club"],
    url: "https://onedrive.live.com/PLACEHOLDER/wharton-pe-2022",
    tier: 2,
    rank: null,
    notForBeginners: true,
    description: "Finance-heavy PE and M&A cases; expects comfort with valuation math."
  },
  {
    id: "casebook-columbia-ops-2023",
    title: "Columbia Ops & Growth Casebook 2023",
    university: "Columbia University",
    yearUpdated: 2023,
    authors: ["Columbia Consulting Club"],
    url: "https://onedrive.live.com/PLACEHOLDER/columbia-ops-2023",
    tier: 2,
    rank: null,
    notForBeginners: false,
    description: "Operations and growth-strategy cases — outside our top 3, but approachable for anyone."
  },
  {
    id: "casebook-independent-compilation",
    title: "Independent Case Compilation",
    university: null,
    yearUpdated: 2022,
    authors: ["Various"],
    url: "https://onedrive.live.com/PLACEHOLDER/independent-compilation",
    tier: 2,
    rank: null,
    notForBeginners: false,
    description: "A grab-bag of cases not tied to any one school's club — tests the null-university fallback."
  }
];

function getCasebooks() {
  return Promise.resolve(CASEBOOKS);
}
