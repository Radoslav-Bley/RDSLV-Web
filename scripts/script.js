/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. Hero circles
 * 03. Adrress Bar Color Change
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
 * 02. Hero Circles
 * ======================================================================!*/

// Array of possible colors
const colors = ["#C0C0C0", "#231F20", "#ED1C24"];

document.querySelectorAll(".circle-with-line").forEach((circle) => {
  // Generate a random index to select a color from the array
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];

  // Apply the random color to the circle
  circle.style.backgroundColor = randomColor;

  // Generate a random initial rotation angle between 0 and 360 degrees
  const initialRotation = Math.random() * 360;
  circle.style.transform = `rotate(${initialRotation}deg)`;

  // Add event listener to rotate the circle towards the pointer
  circle.addEventListener("mousemove", function (e) {
    const centerX = circle.offsetLeft + circle.offsetWidth / 2;
    const centerY = circle.offsetTop + circle.offsetHeight / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const rotation = angle * (180 / Math.PI) + 90;
    circle.style.transform = `rotate(${rotation}deg)`;
  });
});

var typed = new Typed("#type", {
  strings: ["Radoslav Bley", "a designer", "a developer", "a producer"],
  typeSpeed: 100,
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
      .setAttribute("content", "var(--bg-color-dark)");
  } else {
    // Light mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "var(--bg-color-light)");
  }
}

// Call the function to set the initial address bar color
setAddressBarColor();

// Listen for changes in the user's color scheme preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(setAddressBarColor);



    function setFavicon() {
        var favicon = document.querySelector('link[rel="shortcut icon"]');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Dark mode
            favicon.href = '/img/assets/favicons/favicon_dark.ico';
        } else {
            // Light mode
            favicon.href = '/img/assets/favicons/favicon.ico';
        }
    }

    // Call the function to set the initial favicon
    setFavicon();

    // Listen for changes in the user's color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener(setFavicon);
