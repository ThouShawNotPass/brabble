/**
 * The Team class encapsulates the state and behavior 
 * of any given fantasy football team.
 */
class Team {

  numStarters;
  maxPlayers;
  players;

  /**
   * Constructs a new team object based on num players
   * @param {array} starters – the number of players you can
   * start in any given week by position in the form:
   * [QB, RB, WR, TE, FLEX, SUPER-FLEX, DST, K]
   * @param {array} maxPlayers – the total number of players
   * you can roster on your team by position in the form
   * [QB, RB, WR, TE, DST, K, BENCH]
   */
  constructor(starters, total) {
    this.numStarters = starters;
    this.maxPlayers = total;
    this.players = {};
    this.players.QB = [];
    this.players.RB = [];
    this.players.WR = [];
    this.players.TE = [];
    this.players.DST = [];
    this.players.K = [];
  }

  /**
   * Adds the given player to the team, if it can.
   */
  add(player) {
    if (this.canAdd(player)) {
      this.players[player.pos].push(player);
    }
  }

  /**
   * Returns true if the player can be added to the team.
   */
  canAdd(player) {
    let pos = player.pos;
    let order = ['QB', 'RB', 'WR', 'TE', 'DST', 'K'];
    let index = order.indexOf(pos);
    return this.players[pos].length < this.maxPlayers[index];
  }

  // TODO: Add getStarters() and getTeam() with Flex/Superflex
  /**
   * Returns a list of 
   */
}