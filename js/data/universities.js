// PLACEHOLDER SAMPLE DATA — replace with real OneDrive folder links before launch.
const UNIVERSITIES = [
  {
    id: "uni-harvard",
    name: "Harvard",
    url: "https://onedrive.live.com/PLACEHOLDER/folders/harvard",
    note: "Full raw folder — casebooks, individual PDFs, misc materials."
  },
  {
    id: "uni-columbia",
    name: "Columbia",
    url: "https://onedrive.live.com/PLACEHOLDER/folders/columbia",
    note: "Full raw folder — casebooks, individual PDFs, misc materials."
  },
  {
    id: "uni-wharton",
    name: "Wharton (UPenn)",
    url: "https://onedrive.live.com/PLACEHOLDER/folders/wharton",
    note: "Full raw folder — casebooks, individual PDFs, misc materials."
  },
  {
    id: "uni-stanford",
    name: "Stanford",
    url: "https://onedrive.live.com/PLACEHOLDER/folders/stanford",
    note: "Full raw folder — casebooks, individual PDFs, misc materials."
  },
  {
    id: "uni-lse",
    name: "London School of Economics",
    url: "https://onedrive.live.com/PLACEHOLDER/folders/lse",
    note: "Full raw folder — casebooks, individual PDFs, misc materials."
  }
];

function getUniversities() {
  return Promise.resolve(UNIVERSITIES);
}
