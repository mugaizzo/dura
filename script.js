const tashkeel = "[\\u064B-\\u0652]?";
const pairs = [
  { letters: ["ف", "ف"] },
  // { letters: ['ا', 'ا'] },
  { letters: ["ا", "أ"] },
  { letters: ["ا", "آ"] },
  { letters: ["ا", "إ"] },
  { letters: ["ا", "ا"] },
  { letters: ["ب", "ب"] },
  { letters: ["ج", "ج"] },
  { letters: ["ط", "ط"] },
  { letters: ["ي", "ي"] },
  { letters: ["ض", "ض"] },
  { letters: ["ق", "ق"] },
  { letters: ["ح", "ح"] },
];

const wordChar = "[\\u0600-\\u06FF\\u064B-\\u0652]";

pairs.forEach(({ letters: [l1, l2] }) => {
  const pattern = new RegExp(
    `(${wordChar}*)(${l1}${tashkeel})(${l2}${tashkeel})(${wordChar}*)`,
    "g",
  );

  document.querySelectorAll(".shatr-awwal, .shatr-thani, .naskh").forEach((span) => {
    span.innerHTML = span.innerHTML.replace(
      pattern,
      (match, before, top, base, after) => {
        return (
          `<span class="word-stack">` +
          before +
          `<span class="stack" data-top="${top}">` +
          base +
          `</span>` +
          after +
          `</span>`
        );
      },
    );
  });
});

// Theme toggle
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector(".theme-icon");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);
icon.textContent = savedTheme === "dark" ? "☀️" : "🌙";

toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  icon.textContent = next === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", next);
});

// Sections nav toggle
const navToggle = document.getElementById("sectionsNavToggle");
const navList = document.getElementById("sectionsNavList");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navList.classList.toggle("open");
});

document.addEventListener("click", () => {
  navList.classList.remove("open");
});

navList.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
  });
});

// ---- viewport persistence ----
let scrollSaveTimeout;

function saveScrollPosition() {
  if (scrollSaveTimeout) clearTimeout(scrollSaveTimeout);
  scrollSaveTimeout = setTimeout(() => {
    // use scrollY; on some browsers documentElement.scrollTop is used
    const y =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    localStorage.setItem("lastScrollY", String(y));
  }, 150); // debounce
}

window.addEventListener("scroll", saveScrollPosition);

window.addEventListener("load", () => {
  const stored = localStorage.getItem("lastScrollY");
  if (!stored) return;
  const y = parseInt(stored, 10);
  if (Number.isNaN(y)) return;

  window.scrollTo({
    top: y,
    left: 0,
    behavior: "auto",
  });
});
