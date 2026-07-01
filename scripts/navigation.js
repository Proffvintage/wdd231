document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("mobile-nav");

    // Toggle mobile nav
    hamburger.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("show");
        hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Wayfinding: highlight the current page's nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-button a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        // Match exact path or index.html at root
        if (
            currentPath.endsWith(linkPath) ||
            (linkPath === "index.html" && (currentPath === "/" || currentPath.endsWith("/") || currentPath.endsWith("index.html")))
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});