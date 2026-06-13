document.addEventListener("DOMContentLoaded", () => {

  const progress = document.getElementById("progress");
  const timeline = document.getElementById("timeline");
  const events   = document.querySelectorAll(".event");
  const endCard  = document.querySelector(".end-card");

  // ── Scroll-driven glow line ──────────────────────────────────────────────
  function updateProgress() {
    if (!timeline || !progress) return;

    const rect     = timeline.getBoundingClientRect();
    const total    = timeline.offsetHeight;
    const scrolled = -rect.top + window.innerHeight * 0.2;
    const pct      = Math.max(0, Math.min(100, (scrolled / total) * 100));

    progress.style.height = pct + "%";
  }

  // ── Intersection observer for event cards ────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });

  events.forEach(ev => observer.observe(ev));

  // ── Intersection observer for end card ──────────────────────────────────
  const endObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  if (endCard) endObserver.observe(endCard);

  // ── Scroll listener ──────────────────────────────────────────────────────
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

});