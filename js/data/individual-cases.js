// PLACEHOLDER SAMPLE DATA — replace entries with real picks before launch.
const INDIVIDUAL_CASES = [
  {
    id: "case-columbia-frozen-yogurt",
    caseName: "FrozenTop Yogurt Market Entry",
    casebookTitle: "Columbia Case Competition Book 2022",
    authors: ["Columbia Consulting Club"],
    recommendedBy: "Alex Chen",
    url: "https://onedrive.live.com/PLACEHOLDER/case-frozen-yogurt"
  },
  {
    id: "case-harvard-transitco",
    caseName: "TransitCo Public Transport Turnaround",
    casebookTitle: "Harvard Consulting Club Casebook 2023",
    authors: ["Harvard Consulting Club"],
    recommendedBy: "Priya Nair",
    url: "https://onedrive.live.com/PLACEHOLDER/case-transitco"
  },
  {
    id: "case-lse-streamflix",
    caseName: "StreamFlix Subscription Pricing",
    casebookTitle: "LSE Consulting Society Casebook 2023",
    authors: ["LSE Consulting Society"],
    recommendedBy: "Marco Diaz",
    url: "https://onedrive.live.com/PLACEHOLDER/case-streamflix"
  },
  {
    id: "case-stanford-greengrid",
    caseName: "GreenGrid Renewable Expansion",
    casebookTitle: "Stanford GSB Advanced Case Compendium 2021",
    authors: ["Stanford GSB Consulting Club"],
    recommendedBy: "Sofia Reyes",
    url: "https://onedrive.live.com/PLACEHOLDER/case-greengrid"
  },
  {
    id: "case-wharton-buildright",
    caseName: "BuildRight Construction M&A",
    casebookTitle: "Wharton PE/M&A Advanced Casebook 2022",
    authors: ["Wharton Consulting Club"],
    recommendedBy: "Jordan Lee",
    url: "https://onedrive.live.com/PLACEHOLDER/case-buildright"
  }
];

function getIndividualCases() {
  return Promise.resolve(INDIVIDUAL_CASES);
}
