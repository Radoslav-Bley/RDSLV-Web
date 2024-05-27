/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. Adrress Bar Color Change
 * 03. Favicon Color Change
 * 04. YouTube Lazy Loading
 * 05. Header background on scroll
 * 06. Grid Drawing Animation
 * 07. Menu Toggle
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
      .setAttribute("content", "#000000");
  } else {
    // Light mode
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#ffffff");
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
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

/*!========================================================================
 * 06. Grid Drawing Animation
 * ======================================================================!*/

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.grid-container');
  const verticalLinesContainer = document.querySelector('.vertical-lines');
  const horizontalLinesContainer = document.querySelector('.horizontal-lines');

  const numVerticalLines = Math.ceil(window.innerWidth / 25);
  const numHorizontalLines = Math.ceil(window.innerHeight / 25);

  for (let i = 0; i <= numVerticalLines; i++) {
    const line = document.createElement('div');
    line.style.left = `${i * 25}px`;
    line.style.animationDelay = `${i * 0.1}s`;
    verticalLinesContainer.appendChild(line);
  }

  for (let i = 0; i <= numHorizontalLines; i++) {
    const line = document.createElement('div');
    line.style.top = `${i * 25}px`;
    line.style.animationDelay = `${i * 0.1}s`;
    horizontalLinesContainer.appendChild(line);
  }
});

/*!========================================================================
 * 07. Menu Toggle
 * ======================================================================!*/

var hamburgerMenu = document.querySelector('.hamburger-menu');
var fullscreenMenu = document.querySelector('#fullscreen-menu');
var menuItems = document.querySelectorAll('#fullscreen-menu .mobile-nav ul li');
var socialIcons = document.querySelectorAll('.rounded-social-buttons a');
var body = document.body;

hamburgerMenu.addEventListener('click', function() {
  this.classList.toggle('active');
  fullscreenMenu.classList.toggle('active');

  if (fullscreenMenu.classList.contains('active')) {
    body.style.overflow = 'hidden';
    menuItems.forEach(function(item, index) {
      item.style.animation = `slideInBlurredTop 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s both`;
    });
    socialIcons.forEach(function(icon, index) {
      icon.style.animation = `slideInBlurredTop 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${(menuItems.length + index) * 0.2}s both`;
    });
  } else {
    body.style.overflow = 'auto';
    menuItems.forEach(function(item) {
      item.style.animation = '';
    });
    socialIcons.forEach(function(icon) {
      icon.style.animation = '';
    });
  }
});

menuItems.forEach(function(item) {
  item.addEventListener('click', function() {
    hamburgerMenu.classList.remove('active');
    fullscreenMenu.classList.remove('active');
    body.style.overflow = 'auto';
    menuItems.forEach(function(item) {
      item.style.animation = '';
    });
    socialIcons.forEach(function(icon) {
      icon.style.animation = '';
    });
  });
});

/*!========================================================================
 * 08. Hero Section Particles Animation
 * ======================================================================!*/

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#808080"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.48927153781200905,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 1,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});