function initReviews() {
  const reviewSection = document.querySelector('.review-section');
  if (!reviewSection) return;

  // Create form dynamically
  const form = document.createElement('form');
  form.id = 'reviewForm';
  form.innerHTML = `
    <h2>Leave us a Review</h2>
    <p>Your Feedback is Important to Us!</p>
    <label for="review_name">Name: </label>
    <input type="text" id="review_name" name="review_name" required>
    <label for="review">Review: </label>
    <textarea id="review" name="review" rows="4" required></textarea>
    <button type="submit">Share Review</button>
  `;
  reviewSection.appendChild(form);

  // Create container for reviews
  const reviewList = document.createElement('div');
  reviewList.id = 'reviewList';
  reviewSection.appendChild(reviewList);

  // Load saved reviews
  const savedReviews = JSON.parse(localStorage.getItem('uchihaCarCareReviews')) || [];
  savedReviews.forEach(review => {
    reviewList.insertAdjacentHTML('afterbegin', createReviewHTML(review));
  });

  // Handle new review submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('review_name').value.trim();
    const content = document.getElementById('review').value.trim();
    if (!name || !content) return;

    const newReview = { name, content };
    reviewList.insertAdjacentHTML('afterbegin', createReviewHTML(newReview));

    savedReviews.push(newReview);
    localStorage.setItem('uchihaCarCareReviews', JSON.stringify(savedReviews));

    form.reset();
  });
}

function createReviewHTML({ name, content }) {
  return `
    <div class="review">
      <p><strong>${name}</strong> says:</p>
      <p>${content}</p>
    </div>
  `;
}

// Run automatically
document.addEventListener('DOMContentLoaded', initReviews);
