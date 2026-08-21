// PLACEHOLDER SAMPLE DATA — replace with real official links before launch.
//
// `firm` is the full legal name shown to the user; `firmSlug` is the stable
// grouping/color key (mckinsey|bcg|bain) used to bucket cards and pick the
// firm's accent color in css/layout.css.
const MBB_LINKS = [
  {
    id: "mbb-mckinsey-practice-cases",
    firm: "McKinsey & Company",
    firmSlug: "mckinsey",
    title: "McKinsey Solve & Practice Cases",
    url: "https://www.mckinsey.com/PLACEHOLDER/practice-cases",
    description: "Official practice cases and interactive case interview tool."
  },
  {
    id: "mbb-mckinsey-prep-guide",
    firm: "McKinsey & Company",
    firmSlug: "mckinsey",
    title: "Case Interview Prep Guide (PDF)",
    url: "https://www.mckinsey.com/PLACEHOLDER/prep-guide",
    description: "Official written guide covering McKinsey's interview format."
  },
  {
    id: "mbb-bcg-online-prep",
    firm: "Boston Consulting Group (BCG)",
    firmSlug: "bcg",
    title: "Online Case Interview Prep",
    url: "https://www.bcg.com/PLACEHOLDER/case-prep",
    description: "BCG's own interactive case prep and sample interviews."
  },
  {
    id: "mbb-bain-sample-cases",
    firm: "Bain & Company",
    firmSlug: "bain",
    title: "Sample Case Interviews",
    url: "https://www.bain.com/PLACEHOLDER/sample-cases",
    description: "Written and video walkthroughs of Bain-style cases."
  }
];

function getMbbLinks() {
  return Promise.resolve(MBB_LINKS);
}
