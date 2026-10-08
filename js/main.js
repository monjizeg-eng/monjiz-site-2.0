// Mobile nav toggle
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  // Close menu when a link is clicked
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

// Reveal-on-scroll (subtle)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".service-card, .step, .why-item").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// Animated workspace controls
const workspaceDemo = document.getElementById("workspaceDemo");
const motionToggle = document.getElementById("motionToggle");

if (workspaceDemo && motionToggle) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) workspaceDemo.classList.add("is-paused");

  motionToggle.addEventListener("click", () => {
    const isPaused = workspaceDemo.classList.toggle("is-paused");
    motionToggle.setAttribute("aria-pressed", String(isPaused));
    motionToggle.setAttribute("aria-label", isPaused ? "تشغيل الحركة" : "إيقاف الحركة");
    motionToggle.textContent = isPaused ? "▶" : "Ⅱ";
  });
}
