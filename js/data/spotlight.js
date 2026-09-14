// Hand-maintained — NOT synced from Google Sheets. Unlike casebooks/
// individual-cases/mbb-links (which rotate via the Sheet), the spotlight
// bar is a single static, permanent pick: edit this file directly to
// change it, the same way videos.js/university-colors.js work.
const SPOTLIGHT = {
  id: "guia-proceso-seleccion",
  name: "Supera el proceso de selección",
  recommendedBy: "Marta",
  url: "https://drive.google.com/file/d/1Y386ck7hxjZ5VySGRtXJzIx2YNKtoVRh/view?usp=share_link"
};

function getSpotlight() {
  return Promise.resolve(SPOTLIGHT);
}
