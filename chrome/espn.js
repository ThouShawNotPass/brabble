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


// Roster
/**
 * <tr class="Table2__tr Table2__tr--sm Table2__even" data-idx="0">
  * <td class="Table2__td">
    * <div title="Position" class="jsx-2810852873 table--cell">QB</div>
  * </td>
  * <td class="Table2__td">
    * <div class="jsx-2810852873 table--cell player-column">
      * <div class="player-column__empty player-column__content flex items-center">Empty</div>
    * </div>
  * </td>
  * <td class="Table2__td">
    * <div title="Bye Week" class="jsx-2810852873 table--cell tar bye-column">-</div>
  * </td>
 * </tr>
 * 
 */

 // Roster Limits
 /**
  * <div class="w-100 pb4 ph4"><div class="dib w-25 clr-gray-01 n9 pt4">QB<span class="clr-gray-04 n9" style="margin-left: 5px;">0/4</span></div><div class="dib w-25 clr-gray-01 n9 pt4">RB<span class="clr-gray-04 n9" style="margin-left: 5px;">0/8</span></div><div class="dib w-25 clr-gray-01 n9 pt4">WR<span class="clr-gray-04 n9" style="margin-left: 5px;">1/8</span></div><div class="dib w-25 clr-gray-01 n9 pt4">TE<span class="clr-gray-04 n9" style="margin-left: 5px;">0/3</span></div><div class="dib w-25 clr-gray-01 n9 pt4">K<span class="clr-gray-04 n9" style="margin-left: 5px;">0/3</span></div><div class="dib w-25 clr-gray-01 n9 pt4">D/ST<span class="clr-gray-04 n9" style="margin-left: 5px;">0/3</span></div></div>
  */

  // Number of teams 
  /**
   * <ul class="jsx-4285595345 picklist"><li class="picklist--item picklist--pick"><div title="Team Shaw" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between own-pick"><div class="jsx-2824330803 pick-number ttu">PICK 44</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/1.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Shaw</div></div></li><li class="picklist--item picklist--pick"><div title="Team Touchton" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 45</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/12.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Touchton</div></div></li><li class="picklist--item picklist--pick"><div title="Team Peniche" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 46</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/20.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Peniche</div></div></li><li class="picklist--item picklist--pick"><div title="Team Murphy" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between offline"><div class="jsx-2824330803 pick-number ttu">PICK 47</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/19.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Murphy</div></div></li><li class="picklist--item picklist--pick"><div title="Team Eaton" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between offline"><div class="jsx-2824330803 pick-number ttu">PICK 48</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/2.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Eaton</div></div></li><li class="picklist--item picklist--divider"><div class="jsx-2433724591 clr-white round-divider__container  dib"><div class="jsx-2433724591 n8 tc truncate ttu">Round</div><div class="jsx-2433724591 n3 tc truncate ttu">5</div></div></li><li class="picklist--item picklist--pick"><div title="Team Eaton" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between offline"><div class="jsx-2824330803 pick-number ttu">PICK 49</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/2.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Eaton</div></div></li><li class="picklist--item picklist--pick"><div title="Team Murphy" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between offline"><div class="jsx-2824330803 pick-number ttu">PICK 50</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/19.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Murphy</div></div></li><li class="picklist--item picklist--pick"><div title="Team Peniche" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 51</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/20.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Peniche</div></div></li><li class="picklist--item picklist--pick"><div title="Team Touchton" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 52</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/12.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Touchton</div></div></li><li class="picklist--item picklist--pick"><div title="Team Shaw" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between own-pick"><div class="jsx-2824330803 pick-number ttu">PICK 53</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/1.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Shaw</div></div></li><li class="picklist--item picklist--pick"><div title="Team Rodriguez" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 54</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/14.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Rodriguez</div></div></li><li class="picklist--item picklist--pick"><div title="Team Matter" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 55</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/6.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Matter</div></div></li><li class="picklist--item picklist--pick"><div title="Team Thomasson" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 56</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/11.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Thomasson</div></div></li><li class="picklist--item picklist--pick"><div title="Team Zhou" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 57</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/5.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Zhou</div></div></li><li class="picklist--item picklist--pick"><div title="Team Aurora" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between autopick"><div class="jsx-2824330803 pick-number ttu">PICK 58</div><div class="jsx-2824330803 auto-word">AUTO</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/8.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Aurora</div></div></li><li class="picklist--item picklist--pick"><div title="Team Brown" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 59</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/4.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Brown</div></div></li><li class="picklist--item picklist--pick"><div title="Team Martinez" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 60</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/18.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Martinez</div></div></li><li class="picklist--item picklist--divider"><div class="jsx-2433724591 clr-white round-divider__container  dib"><div class="jsx-2433724591 n8 tc truncate ttu">Round</div><div class="jsx-2433724591 n3 tc truncate ttu">6</div></div></li><li class="picklist--item picklist--pick"><div title="Team Martinez" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 61</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/18.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Martinez</div></div></li><li class="picklist--item picklist--pick"><div title="Team Brown" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 62</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/4.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Brown</div></div></li><li class="picklist--item picklist--pick"><div title="Team Aurora" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between autopick"><div class="jsx-2824330803 pick-number ttu">PICK 63</div><div class="jsx-2824330803 auto-word">AUTO</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/8.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Aurora</div></div></li><li class="picklist--item picklist--pick"><div title="Team Zhou" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 64</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/5.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Team Zhou</div></div></li><li class="picklist--item picklist--pick"><div title="Team Thomasson" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 65</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/11.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Thomasson</div></div></li><li class="picklist--item picklist--pick"><div title="Team Matter" class="jsx-2824330803 pick-component tc flex flex-column items-center justify-between"><div class="jsx-2824330803 pick-number ttu">PICK 66</div><div class="jsx-2817594080 croppable-image team-logo" style="height: 24px; overflow: hidden; width: 24px;"><figure class="Image aspect-ratio--parent team-logo"><div class="Image__Wrapper aspect-ratio--1x1"><img class="aspect-ratio--child" alt="Team logo" title="Team logo" data-mptype="image" src="https://g.espncdn.com/lm-static/ffl/images/default_logos/6.svg"></div></figure></div><div class="jsx-2824330803 team-name truncate">Matter</div></div></li></ul>
   */