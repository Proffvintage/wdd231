document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp on page load to ISO string
  const timestampEl = document.getElementById("timestamp");
  if (timestampEl) {
    timestampEl.value = new Date().toISOString();
  }

  // Native HTML <dialog> modal functionality
  const modalButtons = document.querySelectorAll(".modal-link");
  const closeButtons = document.querySelectorAll(".modal .close");

  // Open dialog when button is clicked
  modalButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const dialog = document.getElementById(modalId);
      if (dialog) {
        dialog.showModal();
      }
    });
  });

  // Close dialog when close button is clicked
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest(".modal");
      if (dialog) {
        dialog.close();
      }
    });
  });

  // Close dialog when clicking backdrop (outside modal content)
  document.querySelectorAll(".modal").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });
  });
});