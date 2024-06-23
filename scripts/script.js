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
 * 07. Gradient Animation
 * 08. Cards Scroll Event
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

function setAddressBarColor() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Dark mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "rgb(28, 28, 30)");
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
  .addListener(setAddressBarColor);

/*!========================================================================
 * 03. Navigation background on scroll
 * ======================================================================!*/

window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

/*!========================================================================
 * 04. Menu Toggle
 * ======================================================================!*/

var hamburgerMenu = document.querySelector(".hamburger-menu");
var fullscreenMenu = document.querySelector("#fullscreen-menu");
var menuItems = document.querySelectorAll("#fullscreen-menu .mobile-nav ul li");
var socialIcons = document.querySelectorAll(".rounded-social-buttons a");
var body = document.body;

hamburgerMenu.addEventListener("click", function () {
  this.classList.toggle("active");
  fullscreenMenu.classList.toggle("active");

  if (fullscreenMenu.classList.contains("active")) {
    body.style.overflow = "hidden";
    menuItems.forEach(function (item, index) {
      item.style.animation = `slideInBlurredTop 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1
        }s both`;
    });
    socialIcons.forEach(function (icon, index) {
      icon.style.animation = `slideInBlurredTop 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${(menuItems.length + index) * 0.2
        }s both`;
    });
  } else {
    body.style.overflow = "auto";
    menuItems.forEach(function (item) {
      item.style.animation = "";
    });
    socialIcons.forEach(function (icon) {
      icon.style.animation = "";
    });
  }
});

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    fullscreenMenu.classList.remove("active");
    body.style.overflow = "auto";
    menuItems.forEach(function (item) {
      item.style.animation = "";
    });
    socialIcons.forEach(function (icon) {
      icon.style.animation = "";
    });
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
 * 07. Gradient Animation
 * ======================================================================!*/

const MIN_SPEED = 0.1;
const MAX_SPEED = 1;
const VELOCITY_CHANGE_PROBABILITY = 0; // Probability of changing direction
const POSITION_VARIANCE = 1000; // Variance for initial positioning

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;

    // Ensure more varied initial positions
    this.initialX = randomNumber(
      POSITION_VARIANCE,
      window.innerWidth - this.size - POSITION_VARIANCE
    );
    this.initialY = randomNumber(
      POSITION_VARIANCE,
      window.innerHeight - this.size - POSITION_VARIANCE
    );

    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  update() {
    if (Math.random() < VELOCITY_CHANGE_PROBABILITY) {
      this.vx =
        randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
      this.vy =
        randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY
      }px)`;
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll(".gradient");
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

  function update() {
    blobs.forEach((blob) => {
      blob.update();
      blob.move();
    });
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Start the blobs animation after the initial website load
document.addEventListener("DOMContentLoaded", initBlobs);

/*!========================================================================
 * 08. Cards Scroll Event
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
 * 09. Hover Fix for Touch Devices
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
