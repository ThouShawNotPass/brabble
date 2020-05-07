"use strict";
(function() {

  window.addEventListener('load', () => setInterval(listenForPicks, 1000));
  var overallPick = 1;


  /**
   * Listens for players to be added to the drafted list, then
   * sends a message to the background script.
   */
  function listenForPicks() {
    let names = qsa('.jsx-2093861861 .playerinfo__playername');
    if (names.length === overallPick) {
      let player = names[names.length - 1].innerText;
      console.log(player + " was just drafted.");
      sendMessage(player);
      overallPick++;
    }
  }

  /**
   * Sends a message to the background script.
   * @param {string} message - message to send.
   */
  function sendMessage(message) {
    chrome.runtime.sendMessage(message);
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