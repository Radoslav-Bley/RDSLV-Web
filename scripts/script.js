/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. Adrress Bar Color Change
 * 03. Favicon Color Change
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
 * 02. Adrress Bar Color Change
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
 * 03. Favicon Color Change
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

/*!========================================================================
 * 04. YouTube Lazy Loading
 * ======================================================================!*/

function loadYoutubeVideo() {
  document.getElementById("youtube-video").innerHTML =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

/*!========================================================================
 * 05. Header background on scroll
 * ======================================================================!*/

window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

/*!========================================================================
 * 06. Localization selector
 * ======================================================================!*/

window.addEventListener("DOMContentLoaded", (event) => {
  var userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.substring(0, 2).toLowerCase();

  var languageSelector = document.getElementById("language-selector");
  var languageMessage = document.getElementById("language-message");
  var languageDropdown = document.getElementById("language-dropdown");
  var confirmButton = document.getElementById("confirm-button");
  var closeButton = document.getElementById("close-button");
  var mainContent = document.getElementById("main-content");

  closeButton.addEventListener("click", function () {
    languageSelector.style.display = "none";
    mainContent.classList.remove("with-language-selector");
  });

  confirmButton.addEventListener("click", function () {
    var selectedLanguage = languageDropdown.value;
    if (selectedLanguage === "en") {
      window.location.href = "/index.html";
    } else if (selectedLanguage === "sk") {
      window.location.href = "/sk/index.html";
    }
    languageSelector.style.display = "none";
    sessionStorage.setItem("selectedLanguage", selectedLanguage); // Use sessionStorage instead of localStorage
  });

  var currentPageLanguage = window.location.pathname.includes("/sk/index.html")
    ? "sk"
    : "en";

  if (sessionStorage.getItem("selectedLanguage") !== currentPageLanguage) {
    // Use sessionStorage instead of localStorage
    if (userLang == "sk" || userLang == "cs") {
      languageMessage.textContent =
        "Váš systémový jazyk je nastavený na Slovenský/Český jazyk. Prajete si zobraziť stránku vo Vašom jazyku?";
      languageSelector.style.display = "block";
      mainContent.classList.add("with-language-selector");
    } else {
      languageMessage.textContent =
        "Your system language is set to English. Would you like to view the page in your language?";
      languageSelector.style.display = "block";
      mainContent.classList.add("with-language-selector");
    }
  }
});
