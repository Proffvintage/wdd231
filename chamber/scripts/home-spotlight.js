async function loadSpotlightMembers() {
    const spotlightContainer = document.querySelector('#spotlight .cards-container');
    if (!spotlightContainer) return;

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();

        // Filter for gold and silver members
        const qualified = data.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3 // 2 = Silver, 3 = Gold
        );

        // Randomly choose to display either 2 or 3 members
        const count = Math.floor(Math.random() * 2) + 2; // returns 2 or 3
        const spotlight = qualified
            .sort(() => 0.5 - Math.random())
            .slice(0, count);

        // Render spotlight cards
        spotlightContainer.innerHTML = '';
        spotlight.forEach(member => {
            const card = document.createElement('section');
            card.classList.add('card');
            card.classList.add('spotlight-card');

            const levelClass = member.membershipLevel === 3 ? 'badge-gold' : 'badge-silver';
            const levelName = member.membershipLevel === 3 ? 'Gold' : 'Silver';

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-logo" loading="lazy">
                <h3>${member.name}</h3>
                <div class="spotlight-badge-wrapper">
                    <span class="badge ${levelClass}">${levelName} Member</span>
                </div>
                <p class="spotlight-detail"><strong>Phone:</strong> ${member.phone}</p>
                <p class="spotlight-detail"><strong>Address:</strong> ${member.address}</p>
                <div class="spotlight-link-wrapper">
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                </div>
            `;
            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading spotlight members:', error);
        spotlightContainer.innerHTML = `<p class="error-msg">Unable to load spotlight members at this time.</p>`;
    }
}

loadSpotlightMembers();