/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. Adrress Bar Color Change
 * 03. Navigation background on scroll
 * 04. Menu Toggle
 * 05. TextScramble
 * 06. Cookie Consent Banner
 * 07. Cards Scroll Event
 * 08. Hover Fix for Touch Devices
 */

/*!========================================================================
 * 01. Reveal animations
 * ======================================================================!*/

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

/* function setAddressBarColor() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Dark mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#000");
  } else {
    // Light mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "rgb(250, 250, 250)");
  }
}

// Call the function to set the initial address bar color
setAddressBarColor();

// Listen for changes in the user's color scheme preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(setAddressBarColor); */

/*!========================================================================
 * 04. Menu Toggle
 * ======================================================================!*/

document.addEventListener('DOMContentLoaded', function () {
  const logo = document.getElementById('logo');
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const menuItems = navMenu.querySelectorAll('li');
  const menuLinks = navMenu.querySelectorAll('a');

  hamburgerMenu.addEventListener('click', function () {
    // Toggle active class on hamburgerMenu and navMenu
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    logo.classList.toggle('active');

    // Toggle body scrolling
    if (navMenu.classList.contains('active')) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';

      // Apply active class to menu items with delay
      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('active');
        }, index * 150); // Adjust delay (150ms here) for animation timing
      });
    } else {
      // Enable scrolling
      document.body.style.overflow = '';

      // Remove active class from menu items
      menuItems.forEach(item => {
        item.classList.remove('active');
      });

    }
  });

  // Close menu when a menu item link is clicked
  menuLinks.forEach(item => {
    item.addEventListener('click', function () {
      hamburgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
      logo.classList.remove('active');
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled
    });
  });

  // Close menu when device orientation changes
  window.addEventListener('resize', function () {
    // Check if navMenu is active and device is in landscape mode
    if (navMenu.classList.contains('active') && window.innerWidth > window.innerHeight) {
      hamburgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
      logo.classList.remove('active');
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled
    }
  });
});
/*!========================================================================
 * 06. Cookie Consent Banner
 * ======================================================================!*/

document.addEventListener("DOMContentLoaded", function () {
  // Check if the consent cookie is already set
  var consent = getCookie("cookie_consent");
  if (!consent) {
    // Show the banner if consent is not set
    document.getElementById("cookie-consent-banner").style.display = "block";
  }

  // Set up event listeners for the buttons
  document
    .getElementById("accept-cookies")
    .addEventListener("click", function () {
      setCookie("cookie_consent", "accepted", 365);
      hideBanner();
      // Push event to the GTM data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cookieConsentGranted",
      });
    });

  document
    .getElementById("deny-cookies")
    .addEventListener("click", function () {
      setCookie("cookie_consent", "denied", 365);
      hideBanner();
    });

  function hideBanner() {
    document.getElementById("cookie-consent-banner").style.display = "none";
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
});

/*!========================================================================
 * 07. Cards Scroll Event
 * ======================================================================!*/

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".card-container");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  const updateArrows = () => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft > 0) {
      leftArrow.classList.add("visible");
    } else {
      leftArrow.classList.remove("visible");
    }
    if (slider.scrollLeft < maxScrollLeft) {
      rightArrow.classList.add("visible");
    } else {
      rightArrow.classList.remove("visible");
    }
  };

  const scrollByOneCard = (direction) => {
    const card = slider.querySelector(".card");
    const cardWidth = card.clientWidth + parseInt(getComputedStyle(slider).gap);
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  leftArrow.addEventListener("click", () => {
    scrollByOneCard("left");
  });

  rightArrow.addEventListener("click", () => {
    scrollByOneCard("right");
  });

  slider.addEventListener("scroll", updateArrows);

  // Initial check
  updateArrows();
});

/*!========================================================================
 * 08. Hover Fix for Touch Devices
 * ======================================================================!*/

const element = document.getElementById('element');

element.addEventListener('touchstart', () => {
  element.classList.add('hover');
});

element.addEventListener('touchend', () => {
  element.classList.remove('hover');
});

// Optional: To handle touchmove if you want to ensure hover is removed when user moves finger away
document.addEventListener('touchmove', (event) => {
  if (!element.contains(event.target)) {
    element.classList.remove('hover');
  }
});

/*!========================================================================
 * 09. Active Menu Item Highlight
 * ======================================================================!*/

window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const menuLinks = document.querySelectorAll('.nav-menu ul li a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 50;
    if (pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
});
