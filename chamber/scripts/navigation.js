document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mobile-nav");
  const icon = document.getElementById("hamburger-icon");
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Highlight active nav link based on current page
  links.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Hamburger toggle with aria-expanded
  if (hamburger && nav) {
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("show");
      nav.classList.toggle("hidden", !isOpen);

      // Toggle icon between ☰ and ✖
      icon.textContent = isOpen ? "✖" : "☰";
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});
