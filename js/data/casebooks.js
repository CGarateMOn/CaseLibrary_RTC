// PLACEHOLDER SAMPLE DATA — replace entries with real casebooks before launch.
//
// `tier` and `notForBeginners` are independent: tier just says whether this
// is one of our top-3 all-round picks (1) or another title we like (2).
// "Not for beginners" is its own flag that can be true or false in either
// tier — a tier-2 book isn't automatically advanced.
//
// `universityColor` is an approximate placeholder for that school's brand
// color (not verified against any official brand guide — see NOTES.md),
// used as the card's left-border accent for both tiers.
const CASEBOOKS = [
  {
    id: "casebook-hbs-2023",
    title: "Harvard Consulting Club Casebook 2023",
    university: "Harvard Business School",
    universityColor: "#A51C30",
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
    universityColor: "#75AADB",
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
    universityColor: "#6C2C91",
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
    universityColor: "#8C1515",
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
    universityColor: "#011F5B",
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
    universityColor: "#75AADB",
    yearUpdated: 2023,
    authors: ["Columbia Consulting Club"],
    url: "https://onedrive.live.com/PLACEHOLDER/columbia-ops-2023",
    tier: 2,
    rank: null,
    notForBeginners: false,
    description: "Operations and growth-strategy cases — outside our top 3, but approachable for anyone."
  }
];

function getCasebooks() {
  return Promise.resolve(CASEBOOKS);
}
