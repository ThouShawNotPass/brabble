"use strict";
(function() {

  init();

  function init() {
    setInterval(function() {
      let data = {
        text: 'hello from background'
      };
      window.postMessage(data, '*');
      console.log('posted message: ' + data);
    }, 1000);
  }

})();