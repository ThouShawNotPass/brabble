"use strict";
(function() {

  window.addEventListener('load', init);

  var isDarkMode = false;
  var isMuted = true;

  function init() {
    id('mode').addEventListener('click', toggleMode);
    id('sound').addEventListener('click', function() {
      isMuted = !isMuted;
      let audio = id('audio');
      if (!isMuted) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.pause();
      }
      updateSound();
    });
  }

  /**
   * Changes the window from light mode to dark mode.
   */
  function toggleMode() {
    let body = qs('body');
    let home = id('home');
    let dashboard = id('dashboard');
    let trophy = id('trophy');
    let logo = id('logo');
    let mode = id('mode');
    let help = id('help');
    if (isDarkMode) {
      body.classList.remove('dark-mode');
      home.src = "img/awesome-home.png";
      dashboard.src = "img/material-dashboard.png";
      trophy.src = "img/ionic-md-trophy.png";
      logo.src = "img/draft-guru.png";
      mode.src = "img/awesome-cloud-moon.png";
      help.src = "img/ionic-ios-help-circle-outline.png";
    } else {
      body.classList.add('dark-mode');
      home.src = "img/awesome-home-dark.png";
      dashboard.src = "img/material-dashboard-dark.png";
      trophy.src = "img/ionic-md-trophy-dark.png";
      logo.src = "img/draft-guru-dark.png";
      mode.src = "img/awesome-sun.png";
      help.src = "img/ionic-ios-help-circle-outline-dark.png";
    }
    isDarkMode = !isDarkMode;
    updateSound();
  }

  /**
   * Updates the sound icon to match the state of isMuted and isDarkMode.
   */
  function updateSound() {
    let sound = id('sound');
    let path = "img/ionic-ios-musical-notes";
    if (isMuted) {
      path += "-muted"; // use the muted version
    }
    if (isDarkMode) {
      path += "-dark"; // use the dark mode version
    }
    sound.src = path + ".png";
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