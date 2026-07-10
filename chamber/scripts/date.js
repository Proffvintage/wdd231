document.addEventListener("DOMContentLoaded", function () {
  // Set current copyright year
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Set last modified date (HTML already has "Last Updated:" label)
  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) {
    const lastModified = new Date(document.lastModified);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    lastModifiedSpan.textContent = lastModified.toLocaleString(undefined, options);
  }
});
