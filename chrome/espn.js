"use strict";
(function() {

  window.addEventListener('load', init);
  var overallPick = 1;

  function init() {
    setInterval(listenForPicks, 500);
    chrome.runtime.sendMessage('espn');
  }


  /**
   * Listens for players to be added to the drafted list, then
   * sends a message to the background script.
   */
  function listenForPicks() {
    let names = qsa('.jsx-2093861861 .playerinfo__playername');
    if (names.length === overallPick) {
      let data = {};
      let name = names[names.length - 1].innerText;
      data.player = name;
      console.log(name + " was just drafted.");
      sendMessage(data);
      overallPick++;
    }
  }

  /**
   * Sends a message to the background script.
   * @param {object} message - message to send.
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