/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. TypeWriter Effect Animation
 * 03. Adrress Bar Color Change
 * 04. Favicon Color Change
 */

/*!========================================================================
 * 01. Reveal animations
 * ======================================================================!*/

/* Divider Animation */

// Function to handle reveal animation
function revealDivider(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal"); // Add reveal class when divider appears on the screen
      observer.unobserve(entry.target); // Stop observing once revealed
    }
  });
}

// Create an Intersection Observer
let dividerObserver = new IntersectionObserver(revealDivider, {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Adjust threshold as needed
});

document.querySelectorAll(".divider").forEach((divider) => {
  divider.classList.add("divider-center"); // Add the class
  dividerObserver.observe(divider);
});

/* Element Animation */

// Function to handle reveal animation
function revealElement(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal"); // Add reveal class when element appears on the screen
      observer.unobserve(entry.target); // Stop observing once revealed
    }
  });
}

// Create an Intersection Observer
let revealObserver = new IntersectionObserver(revealElement, {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Adjust threshold as needed
});

// Observe the elements with the slide-in-blurred-bottom class
document.querySelectorAll(".slide-in-blurred-bottom").forEach((element) => {
  revealObserver.observe(element);
});

/*!========================================================================
 * 02. TypeWriter Effect Animation
 * ======================================================================!*/

var typed = new Typed("#type", {
  strings: ["a designer", "a developer", "a producer"],
  typeSpeed: 150,
  loop: true,
  loopCount: Infinity,
});

/*!========================================================================
 * 03. Adrress Bar Color Change
 * ======================================================================!*/

function setAddressBarColor() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Dark mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#0a0a0a");
  } else {
    // Light mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#f5f8fd");
  }
}

// Call the function to set the initial address bar color
setAddressBarColor();

// Listen for changes in the user's color scheme preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(setAddressBarColor);

/*!========================================================================
 * 04. Favicon Color Change
 * ======================================================================!*/

function setFavicon() {
  var favicon = document.querySelector('link[rel="shortcut icon"]');
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Dark mode
    favicon.href = "/img/assets/favicons/favicon_dark.ico";
  } else {
    // Light mode
    favicon.href = "/img/assets/favicons/favicon.ico";
  }
}

// Call the function to set the initial favicon
setFavicon();

// Listen for changes in the user's color scheme preference
window.matchMedia("(prefers-color-scheme: dark)").addListener(setFavicon);
