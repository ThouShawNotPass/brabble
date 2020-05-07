"use strict";
(function() {

  init();

  function init() {
    setInterval(function() {
      let channel = new BroadcastChannel('drafted');
      let message = 'justin is my favorite';
      channel.postMessage(message);
    }, 1000);
  }

})();