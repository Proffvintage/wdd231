
let companies = [];

async function loadCompanies() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');
    companies = await response.json();
    displayCompanyCards();
  } catch (error) {
    console.error('Fetch error:', error);
    const container = document.getElementById('company-cards');
    if (container) {
      container.innerHTML = '<p class="error-msg">Unable to load member data. Please try again later.</p>';
    }
  }
}

function getMembershipLevel(level) {
  switch (level) {
    case 1: return 'Member';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Unknown';
  }
}

function getMembershipClass(level) {
  switch (level) {
    case 2: return 'badge-silver';
    case 3: return 'badge-gold';
    default: return 'badge-member';
  }
}

function displayCompanyCards() {
  const container = document.getElementById('company-cards');
  container.innerHTML = '';

  const isListView = container.classList.contains('list-view');

  if (isListView) {
    // List view – no images per rubric requirement
    const list = document.createElement('ul');
    list.classList.add('company-list');
    list.setAttribute('aria-label', 'Chamber member list');

    companies.forEach(company => {
      const item = document.createElement('li');
      item.classList.add('company-list-item');
      item.innerHTML = `
        <strong>${company.name}</strong>
        <span class="list-badge ${getMembershipClass(company.membershipLevel)}">${getMembershipLevel(company.membershipLevel)}</span>
        <span class="list-detail">${company.address}</span>
        <span class="list-detail">${company.phone}</span>
        <a href="${company.website}" target="_blank" rel="noopener">${company.website}</a>
      `;
      list.appendChild(item);
    });

    container.appendChild(list);
  } else {
    // Grid view – with images
    companies.forEach(company => {
      const card = document.createElement('article');
      card.classList.add('card');
      card.innerHTML = `
        <img src="images/${company.image}" alt="${company.name} logo" width="80" height="80" loading="lazy">
        <h2>${company.name}</h2>
        <span class="badge ${getMembershipClass(company.membershipLevel)}">${getMembershipLevel(company.membershipLevel)}</span>
        <p><strong>Address:</strong> ${company.address}</p>
        <p><strong>Phone:</strong> ${company.phone}</p>
        <p><strong>Industry:</strong> ${company.industry}</p>
        <p><a href="${company.website}" target="_blank" rel="noopener">Visit Website</a></p>
      `;
      container.appendChild(card);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const container = document.getElementById('company-cards');

  // Default: grid view is active
  container.classList.add('grid-view');
  gridBtn.classList.add('active');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');

  loadCompanies();

  gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
    displayCompanyCards();
  });

  listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
    displayCompanyCards();
  });
});
