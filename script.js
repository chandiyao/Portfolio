// =============================
// Set current year in footer
// =============================
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =============================
// Bright/Dark Theme Toggle
// =============================
const themeToggle = document.getElementById("theme-toggle");
const rootElement = document.documentElement;
const savedTheme = localStorage.getItem("themeMode");

if (savedTheme === "dark") {
  rootElement.setAttribute("data-theme", "dark");
}

function updateThemeButtonLabel() {
  if (!themeToggle) {
    return;
  }

  const isDark = rootElement.getAttribute("data-theme") === "dark";
  themeToggle.textContent = isDark ? "Bright mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

updateThemeButtonLabel();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = rootElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      rootElement.removeAttribute("data-theme");
      localStorage.setItem("themeMode", "light");
    } else {
      rootElement.setAttribute("data-theme", "dark");
      localStorage.setItem("themeMode", "dark");
    }

    updateThemeButtonLabel();
  });
}

// =============================
// Mobile Navigation Toggle
// =============================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after selecting a section link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =============================
// Back To Top Button
// =============================
const backToTopLink = document.getElementById("back-to-top");

if (backToTopLink) {
  backToTopLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =============================
// Header Scroll Effect
// =============================
const header = document.querySelector(".site-header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  
  // Add shadow when scrolled down
  if (scrollTop > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  
  lastScrollTop = scrollTop;
});

// =============================
// Scroll Reveal Animation
// =============================
const cards = document.querySelectorAll(".card");
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      revealOnScroll.unobserve(entry.target);
    }
  });
}, revealOptions);

cards.forEach((card) => {
  revealOnScroll.observe(card);
});

// =============================
// Active Navigation Highlight
// =============================
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

const navHighlightOptions = {
  threshold: 0.3,
  rootMargin: "-100px 0px -50% 0px"
};

const highlightNav = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute("id");
      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${activeId}`) {
          item.classList.add("active");
        }
      });
    }
  });
}, navHighlightOptions);

sections.forEach((section) => {
  highlightNav.observe(section);
});

