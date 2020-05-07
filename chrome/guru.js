"use strict";
(function() {

  init();

  function init() {
    chrome.runtime.onMessage.addListener(
      function(message, sender, response) {
        console.log(message);
      }
    );
  }

  function sendToPage() {
    let channel = new BroadcastChannel('drafted');
    let message = 'justin is my favorite';
    channel.postMessage(message);
  }

})();