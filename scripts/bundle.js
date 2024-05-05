'use strict';

(function() {
  var body = document.body;
  var burgerMenu = document.getElementsByClassName('b-menu')[0];
  var burgerContain = document.getElementsByClassName('b-container')[0];
  var burgerNav = document.getElementsByClassName('b-nav')[0];
  var links = document.querySelectorAll('.b-nav a');

  function toggleClasses() {
    [body, burgerContain, burgerNav].forEach(function (el) {
      el.classList.toggle('open');
    });
  }

  burgerMenu.addEventListener('click', toggleClasses, false);

  // Add event listener to links to remove 'open' class
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      [body, burgerContain, burgerNav].forEach(function (el) {
        el.classList.remove('open');
      });
    });
  });
})();

