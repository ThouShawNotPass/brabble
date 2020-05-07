"use strict";
(function() {

  window.addEventListener('load', init);
  var expertRankings;

  function init() {
    chrome.runtime.onMessage.addListener(gotMessage);
    setInterval(function() {
      chrome.runtime.sendMessage('hello from background');
    }, 1000);
  }

  /**
   * Handles the message passing Chrome API
   */
  function gotMessage(message, sender, sendResponse) {
    // TODO: send message to Draft Guru tab
  }

  /**
   * Sends out a message with the current expert rankings.
   */
  function sendRankings() {
    chrome.runtime.sendMessage(expertRankings);
  }

})();