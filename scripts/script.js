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


const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let paths = [];
let animationColor = 'rgba(10, 10, 10, 0.05)'; // Lower opacity for the lines
let shiningColor = 'rgba(255, 255, 255, 0.5)'; // Shining color

// Function to set the color based on the preferred color scheme
function setAnimationColor() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        animationColor = 'rgba(245, 248, 253, 0.05)'; // Lower opacity for dark mode
        shiningColor = 'rgba(255, 255, 255, 0.5)';
    } else {
        animationColor = 'rgba(10, 10, 10, 0.05)'; // Lower opacity for light mode
        shiningColor = 'rgba(10, 10, 10, 0.5)';
    }
}

// Apply the initial color
setAnimationColor();

// Listen for changes in the preferred color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setAnimationColor);

// Function to draw subtle grid background
function drawGrid() {
    const gridSize = 50;
    ctx.strokeStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Function to fetch and parse SVG paths
async function loadSVG() {
    try {
        const response = await fetch('/img/assets/logo/Monogram WHT.svg');
        const text = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgPaths = svgDoc.querySelectorAll('path');
        svgPaths.forEach(path => {
            const length = path.getTotalLength();
            paths.push({ path, length, drawnLength: 0 });
        });
    } catch (error) {
        console.error('Error loading SVG:', error);
    }
}

// Function to draw the SVG paths progressively
function drawSVG() {
    paths.forEach(({ path, length, drawnLength }) => {
        const d = path.getAttribute('d');
        ctx.beginPath();
        ctx.setLineDash([length, length]);
        ctx.lineDashOffset = length - drawnLength;
        const path2d = new Path2D(d);
        ctx.strokeStyle = animationColor;
        ctx.lineWidth = 2;
        ctx.stroke(path2d);

        // Sketchy effect with subtle glow
        for (let i = 0; i < 3; i++) { // Multiple strokes for sketchy effect
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 * (3 - i)})`;
            ctx.lineWidth = 1;
            ctx.stroke(path2d);
        }
    });
}

// Function to animate the SVG paths
function animateSVG() {
    let allPathsDrawn = true;
    paths.forEach(path => {
        if (path.drawnLength < path.length) {
            path.drawnLength += path.length / 1200;  // Slow down the drawing speed
            allPathsDrawn = false;
        }
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawSVG();
    if (!allPathsDrawn) {
        requestAnimationFrame(animateSVG);
    } else {
        // Smooth transition to shining animation
        shiningOffset = 0;
        shiningOpacity = 0; // Initial opacity for fade-in effect
        requestAnimationFrame(shiningAnimation);
    }
}

// Function to create a shining effect
let shiningOffset = 0;
let shiningOpacity = 0;
function shiningAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    paths.forEach(({ path, length }) => {
        const d = path.getAttribute('d');
        ctx.beginPath();
        ctx.setLineDash([]);
        const path2d = new Path2D(d);
        ctx.strokeStyle = animationColor;
        ctx.lineWidth = 2;
        ctx.stroke(path2d);
    });
    
    paths.forEach(({ path, length }) => {
        const d = path.getAttribute('d');
        ctx.beginPath();
        ctx.setLineDash([length / 10, length / 2, length / 10, length]);
        ctx.lineDashOffset = -shiningOffset; // Speed of the shining effect
        const path2d = new Path2D(d);
        ctx.strokeStyle = `rgba(255, 255, 255, ${shiningOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke(path2d);
    });

    shiningOffset += 0.1; // Slower shining effect

    if (shiningOpacity < 0.5) { // Fade-in effect
        shiningOpacity += 0.001; // Adjust the speed of the fade-in effect
    }

    requestAnimationFrame(shiningAnimation);
}

// Resize canvas on window resize
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawSVG();
});

// Initialize and animate
loadSVG().then(() => {
    if (paths.length > 0) {
        drawGrid();
        requestAnimationFrame(animateSVG);
    } else {
        console.error('No paths found in SVG.');
    }
});
