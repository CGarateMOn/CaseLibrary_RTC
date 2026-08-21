function initLibraryPage() {
  renderUniversityDirectory();
}

function renderUniversityDirectory() {
  const list = document.getElementById("university-directory");
  if (!list) return;

  getUniversities().then((universities) => {
    universities.forEach((uni) => {
      const li = document.createElement("li");
      li.className = "directory-list__item";
      li.innerHTML = `
        <a href="${uni.url}" target="_blank" rel="noopener">${uni.name}</a>
        <p class="directory-list__note">${uni.note}</p>
      `;
      list.appendChild(li);
    });
  });
}
