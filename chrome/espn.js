"use strict";
(function() {

  window.addEventListener('load', init);
  var overallPick = 1;

  /**
   * Initializes the page.
   */
  function init() {
    let pickListener = setInterval(listenForPicks, 1000);
  }

  /**
   * Listens for players to be added to the drafted list, then
   * sends a message to the background script.
   */
  function listenForPicks() {
    let names = qsa('.jsx-2093861861 .playerinfo__playername');
    if (names.length === overallPick) {
      let images = qsa('.jsx-2093861861 .player-headshot img:nth-child(1)');
      let teams = qsa('.jsx-2093861861 .playerinfo__playerteam');
      let positions = qsa('.jsx-2093861861 .playerinfo__playerpos');
      let i = names.length - 1;
      // Send JSON to background script
      let player = {
        name: names[i].innerText,
        src: images[i].src,
        team: teams[i].innerText,
        position: positions[i].innerText
      };
      console.log(player.name + " was just drafted.");
      send(player);
      overallPick++;
    }
  }

  /**
   * Sends a message to the background script.
   * @param {string} message - message to send.
   */
  function send(message) {
    chrome.runtime.sendMessage(message);
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