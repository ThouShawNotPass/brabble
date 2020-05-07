"use strict";
(function() {

  window.addEventListener('load', init);

  function init() {
    chrome.runtime.sendMessage('guru'); // ping the background script
    chrome.runtime.onMessage.addListener(handleMessage);
  }

  function handleMessage(message) {
    sendToPage(message);
  }

  function sendToPage(message) {
    let channel = new BroadcastChannel('drafted');
    channel.postMessage(message);
  }

})();