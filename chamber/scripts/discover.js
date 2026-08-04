const cardsContainer = document.querySelector(".cards");

// Builds one card. The first card is above the fold on every breakpoint, so it
// loads eagerly; the rest are deferred per the "defer offscreen images" rule.
function buildCard(place, index) {
  const card = document.createElement("div");
  card.classList.add("discover-card", `card${index + 1}`);

  const loading = index === 0 ? "eager" : "lazy";
  const priority = index === 0 ? ' fetchpriority="high"' : "";

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.alt}" width="${place.width}" height="${place.height}"
           loading="${loading}"${priority}>
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-more-button" type="button">Learn More</button>
  `;
  return card;
}

async function renderPlaces() {
  try {
    const response = await fetch("data/discover.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const places = await response.json();
    const fragment = document.createDocumentFragment();
    places.forEach((place, index) => fragment.appendChild(buildCard(place, index)));
    cardsContainer.appendChild(fragment);
  } catch (error) {
    cardsContainer.innerHTML = `<p class="error-msg">Sorry, the places of interest could not be loaded.</p>`;
    console.error("Unable to load discover.json:", error);
  }
}

renderPlaces();

// Visitor message logic
const messageArea = document.getElementById("visit-message");
const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();

if (!lastVisit) {
  messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    messageArea.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    messageArea.textContent = "You last visited 1 day ago.";
  } else {
    messageArea.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
