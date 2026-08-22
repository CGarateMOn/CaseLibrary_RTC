// HAND-MAINTAINED — never touched by the .github/workflows/sync-data.yml
// data sync (that script only ever regenerates casebooks.js,
// individual-cases.js, mbb-links.js, case-of-week.js). University colors
// are a code/design decision, not sheet content — see NOTES.md.
//
// To add a school: add a line here, then use that exact name in the
// "University" column of the Casebooks sheet. A university with no entry
// here (or a null/independent casebook) just falls back to a neutral
// border — nothing breaks.
const UNIVERSITY_COLORS = {
  "Harvard Business School": "#A51C30",
  "Columbia University": "#75AADB",
  "London School of Economics": "#6C2C91",
  "Stanford Graduate School of Business": "#8C1515",
  "Wharton (University of Pennsylvania)": "#011F5B"
};
