// First-visit welcome screen (index.html only). Shown once, tracked via a
// localStorage flag — same pattern as RTC Ofertas' #intro.
const INTRO_STORAGE_KEY = "rtc_intro_v1";

function openIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  intro.classList.add("on");
  document.body.classList.add("intro-open");
}

function closeIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  intro.classList.remove("on");
  document.body.classList.remove("intro-open");
}

function initIntro() {
  const button = document.getElementById("empezar");
  if (!button) return;

  let firstVisit = false;
  try {
    firstVisit = !localStorage.getItem(INTRO_STORAGE_KEY);
  } catch (err) {
    firstVisit = false;
  }
  if (firstVisit) openIntro();

  button.addEventListener("click", () => {
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch (err) {
      // localStorage unavailable (private mode, quota, etc.) — the intro
      // just reappears next visit instead of persisting as seen.
    }
    closeIntro();
  });
}

// Step 1's "Marcar como hecho" preview is a real, clickable button (same
// .viewed-toggle class as the live ones) so visitors can feel how it works
// — but deliberately NOT wired through wireViewedToggle/ViewedTracker, so
// clicking it can never touch real localStorage progress or an item's id.
function initIntroDemoToggle() {
  const demo = document.getElementById("intro-demo-toggle");
  if (!demo) return;

  demo.addEventListener("click", () => {
    const isViewed = demo.classList.toggle("is-viewed");
    demo.textContent = isViewed ? "Hecho ✓" : "Marcar como hecho";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  initIntroDemoToggle();
});
