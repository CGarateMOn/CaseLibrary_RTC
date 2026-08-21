// PLACEHOLDER SAMPLE DATA — replace with the real weekly pick before launch.
const CASE_OF_WEEK_STATIC = {
  id: "cow-2026-08-18",
  caseName: "PharmaCo Pricing Strategy",
  casebookTitle: "Wharton Case Book 2024",
  authors: ["Wharton Consulting Club"],
  recommendedBy: "RTC Team",
  url: "https://onedrive.live.com/PLACEHOLDER/pharmaco-pricing",
  weekOf: "2026-08-18",
  blurb: "A great mid-difficulty pricing case that tests structured math and creative segmentation."
};

// Isolated data-source function. Today it resolves a static object; later,
// swap the body for a fetch() to the Google Sheets / Apps Script endpoint —
// callers already treat this as async, so no other file needs to change.
function getCaseOfWeek() {
  // TODO(live-integration): replace with fetch('<apps-script-web-app-url>').then(r => r.json())
  return Promise.resolve(CASE_OF_WEEK_STATIC);
}
