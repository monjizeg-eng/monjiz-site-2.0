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
