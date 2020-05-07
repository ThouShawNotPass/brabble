"use strict";
(function() {

  chrome.runtime.onMessage.addListener(handleMessage);

  var guruId;
  var espnId;

  function handleMessage(message, sender) {
    if (message === 'guru') {
      guruId = sender.tab.id;
    } else if (message === 'espn') {
      espnId = sender.tab.id;
    }

    if (sender.tab.id === espnId) {
      console.log(message + ' from: ' + sender.tab.id);
      send(message);
    }
  }

  function send(message) {
    chrome.tabs.sendMessage(guruId, message)
  }

})();