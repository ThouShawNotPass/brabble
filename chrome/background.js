"use strict";
(function() {

  window.addEventListener('load', init);
  var expertRankings;

  function init() {
    chrome.runtime.onMessage.addListener(gotMessage);
    fetchStats();
  }

  /**
   * Handles the message passing Chrome API
   */
  function gotMessage(message, sender, sendResponse) {
    // TODO: send message to Draft Guru tab
  }

  /**
   * Fetches the current expert concensus rankings from FantasyPros.
   */
  function fetchStats() {
    let url = 'https://www.fantasypros.com/nfl/rankings/half-point-ppr-cheatsheets.php';
    fetch(url)
      .then(checkStatus)
      .then(response => response.text())
      .then(parseData)
      .catch(error => console.log('Error: ' + error));
  }

  /**
   * Returns the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status text.
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise
   * rejected Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  /**
   * Pulls the html out of the fetch response, parses out the player
   * data and formats the data in a JSON object.
   * https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/
   * @param {object} data - the data to parse
   */
  function parseData(data) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, 'text/html');
    
    let rankings = {};
    rankings.date = doc.querySelector('h5 > time').textContent;
    rankings.concensus = doc.querySelector('.head-wrap > h5').textContent;
    rankings.scoring = 'half-point-ppr'; // Todo: Add scoring options
    rankings.players = [];

    let imgPath = "https://images.fantasypros.com/images/nfl/players/250x250/";
    let playerList = doc.querySelectorAll('.player-row');
    for (let i = 0; i < playerList.length; i++) {
      let p = {};
      let player = playerList[i];
      let playerData = player.childNodes[2].firstChild;
      p.rnk = i + 1;
      p.id = parseInt(playerData.getAttribute('data-id'));
      p.name = playerData.getAttribute('data-name');
      p.short = playerData.getAttribute('data-shortname');
      p.team = playerData.getAttribute('data-team');
      p.pos = playerData.getAttribute('data-position');
      p.posRnk = player.childNodes[5].textContent;
      p.bye = player.childNodes[7].textContent;
      p.best = player.childNodes[9].textContent;
      p.worst = player.childNodes[11].textContent;
      p.avg = player.childNodes[13].textContent;
      p.std = player.childNodes[15].textContent;
      try {
        p.src = imgPath + p.id + ".png";
      } catch {
        p.src = "https://images.fantasypros.com/images/photo_missing_square.jpg"
      }
      rankings.players.push(p);
    }
    expertRankings = rankings;
    console.log(rankings);
    let timerId = setInterval(sendRankings, 1000);
  }

  /**
   * Sends out a message with the current expert rankings.
   */
  function sendRankings() {
    chrome.runtime.sendMessage(expertRankings);
  }

})();