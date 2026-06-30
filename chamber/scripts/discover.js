import { places } from "../data/discover.mjs";

// Render cards from JSON
const cardsContainer = document.querySelector(".cards");
places.forEach((place, i) => {
  const card = document.createElement("div");
  card.classList.add(`card${i + 1}`);
  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure><img src="${place.image}" alt="${place.name}" loading="lazy"></figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-more-button">Learn More</button>
  `;
  cardsContainer.appendChild(card);
});

// Visitor message logic
const messageArea = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
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
