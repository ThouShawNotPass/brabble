"use strict";
(function() {

  window.addEventListener('load', init);
  
  var overallPick = 1;

  var hardNames; 

  /**
   * Initializes the espn content script.
   */
  function init() {
    initHardNames();
    setInterval(listenForPicks, 500);
    chrome.runtime.sendMessage('espn');
  }

  /**
   * Creates a map of names which are known to be different
   * from the draftGuru database spelling.
   */
  function initHardNames() {
    hardNames = new Map();
    hardNames.set('Allen Robbinson II', "Allen Robbinson");
    hardNames.set('DJ Moore', 'D.J. Moore');
    hardNames.set('TOdd Gurley II', 'Todd Gurley');
    hardNames.set('DK Metcalf', 'D.K. Metcalf');
    hardNames.set('DJ Chark Jr.', 'D.J. Chark');
    hardNames.set('Marvin Jones Jr.', 'Marvin Jones');
    hardNames.set('Will Fuller V', 'Will Fuller');
    hardNames.set('Darrell Henderson Jr.', 'Darrell Henderson');
    hardNames.set('Chris Herndon', 'Chris Herndon IV');
  }


  /**
   * Listens for players to be added to the drafted list, then
   * sends a message to the background script.
   */
  function listenForPicks() {
    let names = qsa('.jsx-2093861861 .playerinfo__playername');
    if (names.length === overallPick) {
      let data = {};
      let name = checkName(names[names.length - 1].innerText);
      data.player = name;
      console.log(name + " was just drafted.");
      sendMessage(data);
      overallPick++;
    }
  }

  /**
   * Checks the name of the player against a list of names
   * known to be spelled differently than our database.
   * @param {string} name - the name of the player to check
   * @returns {string} - the name of the player 
   */
  function checkName(name) {
    let result = name;
    if (hardNames.has(name)) {
      result = hardNames.get(name);
    }
    return result;
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