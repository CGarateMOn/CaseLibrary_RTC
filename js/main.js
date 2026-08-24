document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "home") {
    initHomePage();
  } else if (page === "library") {
    initLibraryPage();
  } else if (page === "videos") {
    initVideosPage();
  }
});
