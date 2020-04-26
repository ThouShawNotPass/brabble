const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true});
const url = 'https://fantasy.espn.com/football/draft?leagueId=50974213&seasonId=2020&teamId=5&memberId={A1C7A33E-F57C-41EC-87A3-3EF57CE1ECD8}';
const pickHistory = '#espn-analytics > div > div.draft-columns > div.draft-column.raised.flex.flex-column > div.jsx-38436715.draft_tabs_container.flex.overflow-hidden.relative > div > div.tabs__content > div:nth-child(2) > div';
const firstPick = pickHistory + ' div > div:nth-child(1) > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div.player-details > div:nth-child(1) > span > span > a';

nightmare
  .goto(url)
  .wait(pickHistory)
  .evaluate(() => document.querySelector(firstPick).innerHTML)
  .end()
  .then(response => {
    console.log(response)
  }).catch(error => {
    console.log(err);
  });