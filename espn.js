"use strict";
(function() {

  window.addEventListener('load', init);
  var overallPick = 1;

  function init() {
    let pickListener = setInterval(listenForPicks, 1000);
  }

  function listenForPicks() {
    let picks = qsa('.jsx-2093861861 .playerinfo__playername');
    if (picks.length === overallPick) {
      let msg = picks[picks.length - 1].innerText + " was just drafted."
      console.log(msg);
      send(msg);
      overallPick++;
    }
  }

  /**
   * Sends a message to the background script.
   * @param {string} message - message to send.
   */
  function send(message) {
    chrome.runtime.sendMessage('Hello World!');
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