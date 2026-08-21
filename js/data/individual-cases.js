// PLACEHOLDER SAMPLE DATA — replace entries with real picks before launch.
// Deliberately more than a handful of entries so the responsive grid in
// index.html actually wraps to several rows — makes it easy to eyeball how
// the "mark as done" sink-to-bottom reorder behaves with a fuller matrix.
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
  },
  {
    id: "case-columbia-brightbank",
    caseName: "BrightBank Digital Transformation",
    casebookTitle: "Columbia Ops & Growth Casebook 2023",
    authors: ["Columbia Consulting Club"],
    recommendedBy: "Alex Chen",
    url: "https://onedrive.live.com/PLACEHOLDER/case-brightbank"
  },
  {
    id: "case-harvard-solaris",
    caseName: "Solaris Energy Market Entry",
    casebookTitle: "Harvard Consulting Club Casebook 2023",
    authors: ["Harvard Consulting Club"],
    recommendedBy: "Diego Fernández",
    url: "https://onedrive.live.com/PLACEHOLDER/case-solaris"
  },
  {
    id: "case-lse-northline",
    caseName: "Northline Airlines Cost Reduction",
    casebookTitle: "LSE Consulting Society Casebook 2023",
    authors: ["LSE Consulting Society"],
    recommendedBy: "Marco Diaz",
    url: "https://onedrive.live.com/PLACEHOLDER/case-northline"
  },
  {
    id: "case-stanford-vitalcare",
    caseName: "VitalCare Hospital Network Expansion",
    casebookTitle: "Stanford GSB Advanced Case Compendium 2021",
    authors: ["Stanford GSB Consulting Club"],
    recommendedBy: "Sofia Reyes",
    url: "https://onedrive.live.com/PLACEHOLDER/case-vitalcare"
  },
  {
    id: "case-wharton-fastcart",
    caseName: "FastCart Grocery Delivery Profitability",
    casebookTitle: "Wharton PE/M&A Advanced Casebook 2022",
    authors: ["Wharton Consulting Club"],
    recommendedBy: "Jordan Lee",
    url: "https://onedrive.live.com/PLACEHOLDER/case-fastcart"
  },
  {
    id: "case-columbia-urbanmesh",
    caseName: "UrbanMesh Telecom Network Rollout",
    casebookTitle: "Columbia Case Competition Book 2022",
    authors: ["Columbia Consulting Club"],
    recommendedBy: "Priya Nair",
    url: "https://onedrive.live.com/PLACEHOLDER/case-urbanmesh"
  },
  {
    id: "case-harvard-oakfield",
    caseName: "Oakfield Retail Chain Turnaround",
    casebookTitle: "Harvard Consulting Club Casebook 2023",
    authors: ["Harvard Consulting Club"],
    recommendedBy: "Diego Fernández",
    url: "https://onedrive.live.com/PLACEHOLDER/case-oakfield"
  }
];

function getIndividualCases() {
  return Promise.resolve(INDIVIDUAL_CASES);
}
