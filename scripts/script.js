/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. Adrress Bar Color Change
 * 03. YouTube Lazy Loading
 * 04. Header background on scroll
 * 05. Menu Toggle
 * 06. TextScramble
 * 07. Cookie Consent Banner
 * 08. Hero Section Particles Animation
 * 09. Swiper Slider
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
      .setAttribute("content", "rgb(20, 20, 20)");
  } else {
    // Light mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "rgb(244, 248, 255)");
  }
}

// Call the function to set the initial address bar color
setAddressBarColor();

// Listen for changes in the user's color scheme preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(setAddressBarColor);

/*!========================================================================
 * 03. YouTube Lazy Loading
 * ======================================================================!*/

function loadYoutubeVideo() {
  document.getElementById("youtube-video").innerHTML =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

/*!========================================================================
 * 04. Header background on scroll
 * ======================================================================!*/

window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

/*!========================================================================
 * 05. Menu Toggle
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
      item.style.animation = `slideInBlurredTop 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${
        index * 0.1
      }s both`;
    });
    socialIcons.forEach(function (icon, index) {
      icon.style.animation = `slideInBlurredTop 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${
        (menuItems.length + index) * 0.2
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
 * 06. TextScramble
 * ======================================================================!*/

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = ["Making Digital Dreams", "Come True", "with a Wink"];

const el = document.querySelector(".herotext");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1100);
  });
  counter = (counter + 1) % phrases.length;
};

next();

/*!========================================================================
 * 07. Cookie Consent Banner
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
* 08. Blob Animation
* ======================================================================!*/

const MIN_SPEED = 1.5
const MAX_SPEED = 2.5

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

class Blob {
  constructor(el) {
    this.el = el
    const boundingRect = this.el.getBoundingClientRect()
    this.size = boundingRect.width
    this.initialX = randomNumber(0, window.innerWidth - this.size)
    this.initialY = randomNumber(0, window.innerHeight - this.size)
    this.el.style.top = `${this.initialY}px`
    this.el.style.left = `${this.initialX}px`
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.x = this.initialX
    this.y = this.initialY
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size
      this.vx *= -1
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size
      this.vy *= -1
    }
    if (this.x <= 0) {
      this.x = 0
      this.vx *= -1
    }
    if (this.y <= 0) {
      this.y = 0
      this.vy *= -1
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll('.bouncing-blob')
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl))

  function update() {
    requestAnimationFrame(update)
    blobs.forEach((blob) => {
      blob.update()
      blob.move()
    })
  }

  requestAnimationFrame(update)
}

initBlobs()