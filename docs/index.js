"use strict";
(function() {

  window.addEventListener('load', init);
  var isDarkMode = false;

  function init() {
    id('mode').addEventListener('click', toggleMode);
  }

  /**
   * Changes the window from light mode to dark mode.
   */
  function toggleMode() {
    let body = qs('body');
    let home = id('home');
    let dashboard = id('dashboard');
    let trophy = id('trophy');
    let menu = id('menu');
    let mode = id('mode');
    let sound = id('sound');
    let help = id('help');
    if (isDarkMode) {
      body.classList.remove('dark-mode');
      home.src = "/docs/img/awesome-home.png";
      dashboard.src = "/docs/img/material-dashboard.png";
      trophy.src = "/docs/img/ionic-md-trophy.png";
      menu.src = "/docs/img/feather-menu.png";
      mode.src = "/docs/img/awesome-cloud-moon.png";
      sound.src = "/docs/img/ionic-ios-musical-notes.png";
      help = "/docs/img/ionic-ios-help-circle-outline.png";
    } else {
      body.classList.add('dark-mode');
      home.src = "/docs/img/awesome-home-dark.png";
      dashboard.src = "/docs/img/material-dashboard-dark.png";
      trophy.src = "/docs/img/ionic-md-trophy-dark.png";
      menu.src = "/docs/img/feather-menu-dark.png";
      mode.src = "/docs/img/awesome-sun.png";
      sound.src = "/docs/img/ionic-ios-musical-notes-dark.png";
      help = "/docs/img/ionic-ios-help-circle-outline-dark.png";
    }
    isDarkMode = !isDarkMode;
  }

  /**
   * Returns the element with the specified ID attribute.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();