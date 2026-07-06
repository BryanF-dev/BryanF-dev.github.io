const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mapPanel = document.querySelector("[data-map-panel]");
const mapFrame = document.querySelector("[data-map-frame]");
const mapHeading = document.querySelector("[data-map-heading]");
const mapOpen = document.querySelector("[data-map-open]");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-map-query]");

  if (!button) {
    return;
  }

  const query = button.dataset.mapQuery;
  const title = button.dataset.mapTitle;
  const encodedQuery = encodeURIComponent(query);
  const embedUrl = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  mapFrame.src = embedUrl;
  mapFrame.title = `Mapa da unidade ${title}`;
  mapHeading.textContent = title;
  mapOpen.href = openUrl;
  mapPanel.hidden = false;

  document.querySelectorAll(".unit-card").forEach((card) => card.classList.remove("is-selected"));
  button.closest(".unit-card").classList.add("is-selected");
  mapPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});
