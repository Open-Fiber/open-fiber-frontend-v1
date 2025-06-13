// src/utils/scroll.js

/**
 * Smooth scroll to element by ID
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Optional offset from top (default: 80px for header)
 */
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

/**
 * Smooth scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Scroll to section with animation
 * @param {string} sectionName - Name of the section to scroll to
 */
export const scrollToSection = (sectionName) => {
  const sectionMap = {
    nosotros: "about-section",
    aprende: "learn-section",
    construye: "build-section",
    comunidad: "community-section",
  };

  const elementId = sectionMap[sectionName];
  if (elementId) {
    scrollToElement(elementId);
  }
};

/**
 * Initialize smooth scrolling behavior for the app
 */
export const initSmoothScrolling = () => {
  // Set CSS smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Handle anchor link clicks
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      scrollToElement(targetId);
    }
  });
};
