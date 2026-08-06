document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Fill a span from a query-string value, falling back when the page is
  // opened directly instead of arriving from the join form.
  function fill(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value && value.trim() !== "" ? value : "Not provided";
    }
  }

  fill("firstName", params.get("firstName"));
  fill("lastName", params.get("lastName"));
  fill("email", params.get("email"));
  fill("mobile", params.get("mobile"));
  fill("organization", params.get("organization"));

  // The hidden timestamp arrives as an ISO string; show it in a readable form
  // but keep the raw value if it cannot be parsed.
  const raw = params.get("timestamp");
  const stamp = document.getElementById("timestamp");
  if (stamp) {
    if (!raw) {
      stamp.textContent = "Not provided";
    } else {
      const date = new Date(raw);
      stamp.textContent = Number.isNaN(date.getTime())
        ? raw
        : date.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
    }
  }
});
