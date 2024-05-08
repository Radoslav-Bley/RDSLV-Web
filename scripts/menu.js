var menuContainer = document.querySelector('#menu-toggle');
var menuTextOpen = document.querySelector('#menu-text-open');
var menuTextClose = document.querySelector('#menu-text-close');
var fullscreenMenu = document.querySelector('#fullscreen-menu');
var body = document.body; // Add this line

menuContainer.addEventListener('click', function() {
  var hamburger = document.querySelector('.hamburger');
  if (menuTextOpen.style.display !== 'none') {
    menuTextOpen.style.display = 'none';
    menuTextClose.style.display = 'block';
    fullscreenMenu.style.display = 'flex';
    body.style.overflow = 'hidden'; // Add this line
  } else {
    menuTextOpen.style.display = 'block';
    menuTextClose.style.display = 'none';
    fullscreenMenu.style.display = 'none';
    body.style.overflow = 'auto'; // Add this line
  }
  hamburger.classList.toggle('active');
});