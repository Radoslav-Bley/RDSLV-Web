/**
 * Developed by Radoslav Bley
 *
 * Table of Contents:
 *
 * 01. Reveal animations
 * 02. Address Bar Color Change
 * 03. YouTube Lazy Loading
 * 04. Header background on scroll
 * 05. Menu Toggle
 * 06. Hero Section Particles Animation
 */

/*!========================================================================
 * 01. Reveal animations
 * ======================================================================!*/

/* Element Animation */

// Function to handle reveal animation
function revealElement(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      requestIdleCallback(() => {
        entry.target.classList.add("reveal"); // Add reveal class when element appears on the screen
        observer.unobserve(entry.target); // Stop observing once revealed
      });
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
 * 02. Address Bar Color Change
 * ======================================================================!*/

function setAddressBarColor() {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Dark mode
    metaThemeColor.setAttribute("content", "#000000");
  } else {
    // Light mode
    metaThemeColor.setAttribute("content", "#ffffff");
  }
}

// Call the function to set the initial address bar color
setAddressBarColor();

// Listen for changes in the user's color scheme preference
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setAddressBarColor);

/*!========================================================================
 * 03. YouTube Lazy Loading
 * ======================================================================!*/

function loadYoutubeVideo() {
  requestIdleCallback(() => {
    document.getElementById("youtube-video").innerHTML =
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
}

/*!========================================================================
 * 04. Header background on scroll
 * ======================================================================!*/

// Debounce scroll event handler
let scrollTimeout;
window.addEventListener("scroll", function () {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    var nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
  }, 100);
});

/*!========================================================================
 * 05. Menu Toggle
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
 * 06. Hero Section Particles Animation
 * ======================================================================!*/

// Load particles.js only when the hero section is visible
let heroSectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
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
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
});

heroSectionObserver.observe(document.getElementById('particles-js'));
