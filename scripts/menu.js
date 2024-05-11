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