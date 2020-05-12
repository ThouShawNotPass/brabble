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
    hardNames.set('Allen Robinson II', "Allen Robinson");
    hardNames.set('DJ Moore', 'D.J. Moore');
    hardNames.set('Todd Gurley II', 'Todd Gurley');
    hardNames.set('DK Metcalf', 'D.K. Metcalf');
    hardNames.set('DJ Chark Jr.', 'D.J. Chark');
    hardNames.set('Marvin Jones Jr.', 'Marvin Jones');
    hardNames.set('Will Fuller V', 'Will Fuller');
    hardNames.set('Darrell Henderson Jr.', 'Darrell Henderson');
    hardNames.set('Chris Herndon', 'Chris Herndon IV');
    hardNames.set('AJ Dillon', 'A.J. Dillon');
    hardNames.set('John Ross III', 'John Ross');
  }


  /**
   * Listens for players to be added to the drafted list, then
   * sends a message to the background script.
   */
  function listenForPicks() {
    // get a list of player names who have been drafted
    let drafted = qsa('.jsx-2093861861 .playerinfo__playername');
    if (drafted.length === overallPick) {
      let data = {};
      data.roster = [];
      data.settings = {};
      data.player = checkName(drafted[drafted.length - 1].textContent);
      
      // log the current roster as an array of player names
      let rosterRows = qsa('.Table2__tbody tr td:nth-child(2) > div');
      for (let i = 0; i < rosterRows.length; i++) {
        let playerName = rosterRows[i].getAttribute('title')
        data.roster.push(checkName(playerName));
      }

      // grab the roster limit settings
      let playerCount = qs('.roster-limits > div:first-child > div:last-child').textContent;
      data.settings.maxPlayers = playerCount;
      let posCount = qsa('.roster-limits > div:last-child > div');
      for (let i = 0; i < posCount.length; i++) {
        let position = posCount[i].textContent;
        let limit = posCount[i].lastChild.textContent;
        data.settings[position] = limit;
      }

      // count the number of teams
      let pickList = qsa('.picklist > li');
      let numTeams = -1;
      let isRoundOne = false;
      while (isRoundOne) {
        numTeams++;
        if (pickList[numTeams].classList.contains('picklist--divider')) {
          isRoundOne = !isRoundOne;
        }
      }
      data.settings.numTeams = numTeams;
      
      // TODO: Grab the "On the clock in <#Picks>" tag
      // Send the message as a JSON object and increment the counter
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

  // Number of teams 
  /**
   * <ul class="jsx-4285595345 picklist">
    * <li class="picklist--item picklist--pick"> picklist--divider
      * <div title="Team Shaw" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between own-pick">
      * <div class="jsx-2824330803 pick-number ttu">PICK 44</div>
        * <div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;">
          * <figure class="Image aspect-ratio--parent team-logo">
            * <div class="Image__Wrapper aspect-ratio--1x1">
              * <img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/1.svg">
            * </div>
          * </figure>
        * </div>
        * <div class="jsx-2824330803 team-name truncate">Team Shaw</div>
      * </div>
    * </li>
   */