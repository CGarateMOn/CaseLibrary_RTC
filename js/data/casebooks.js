// PLACEHOLDER SAMPLE DATA — replace entries with real casebooks before launch.
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
    description: "Finance-heavy PE and M&A cases; expects comfort with valuation math."
  }
];

function getCasebooks() {
  return Promise.resolve(CASEBOOKS);
}
