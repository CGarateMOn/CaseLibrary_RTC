// HAND-MAINTAINED — never touched by the .github/workflows/sync-data.yml
// data sync (that script only ever regenerates casebooks.js,
// individual-cases.js, mbb-links.js, case-of-week.js). University colors
// are a code/design decision, not sheet content — see NOTES.md.
//
// To add a school: add a line here for every way its name actually shows
// up in the "University" column of the Sheet (the team isn't consistent
// about long vs. short form, e.g. "Wharton" vs "Wharton (University of
// Pennsylvania)") — both point at the same color. A name with no entry
// here at all (or a null/independent casebook) just falls back to a
// neutral border — nothing breaks.
const UNIVERSITY_COLORS = {
  "Harvard Business School": "#A51C30",
  "Harvard": "#A51C30",

  "Columbia University": "#75AADB",
  "Columbia": "#75AADB",

  "London School of Economics": "#6C2C91",
  "LSE": "#6C2C91",

  "Stanford Graduate School of Business": "#8C1515",
  "Stanford": "#8C1515",

  "Wharton (University of Pennsylvania)": "#011F5B",
  "Wharton": "#011F5B",

  "IESE Business School": "#9E1B32",
  "IESE": "#9E1B32",

  "New York University": "#57068C",
  "NYU": "#57068C"
};
