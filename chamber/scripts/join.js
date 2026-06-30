document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp on page load
  const timestampEl = document.getElementById("timestamp");
  if (timestampEl) {
    timestampEl.value = new Date().toISOString();
  }

  // Modal Dialog Functionality
  const modalLinks = document.querySelectorAll(".modal-link");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  // Open modal on link click
  modalLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.getAttribute("href");
      const modal = document.querySelector(modalId);
      if (modal) {
        modal.style.display = "flex";
      }
    });
  });

  // Close modal when close button is clicked
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal when clicking outside of modal content container
  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});