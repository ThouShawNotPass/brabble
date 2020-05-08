/**
 * This is a DraftManager Class which manages the
 * player actions in a draft.
 */
class DraftManager {

  numBest = 5;
  overallPick = 0; // the current overallPick
  numTeams = 12; // number of teams in the league
  teams = []; // an array of team objects
  drafted = []; // list of drafted players
  undrafted = []; // list of undrafted players

  // Constructs a new draft manager from a list of players
  // and the number of teams.
  constructor(players, num) {
    this.numTeams = num;
    // Teams =>  [QB, RB, WR, TE, FLX, SFLX, DST, K]
    let starters = [1, 2, 2, 1, 1, 0, 1, 1]; // TODO: settings
    let maxPlayers = [5, 10, 10, 5, 3, 3, 5]; // TODO: settings
    for (let i = 0; i < num; i++) {
      let team = new Team(starters, maxPlayers);
      this.teams.push(team);
    }
    // add all players to undrafted list
    for (let i = 0; i < players.length; i++) {
      this.undrafted.push(players[i]);
    }
  }

  // Sets numBest to the given num.
  setBest(num) {
    this.numBest = num;
  }

  // Gets the value of numBest.
  getBest() {
    return this.numBest;
  }

  // Returns the current draft pick in the format:
  // ["Pick <ROUND>.<PICK>", "(#<OVRALL_PICK> OVR)"]
  getPick() {
    let round = Math.floor(this.overallPick / this.numTeams) + 1;
    let pick = this.overallPick % this.numTeams + 1;
    let overall = this.overallPick + 1;
    return ["Pick " + round + "." + this.pad(pick), ' (#' + overall + ' OVR)'];
  }

  // Drafts the player with the given name
  draft(player) {
    try {
      let playerNotFound = true;
      for (let i = 0; i < this.undrafted.length; i++) {
        // search for player in undrafted player list
        if (this.undrafted[i].name === player) {
          let pick = this.undrafted[i];
          let teamId = this.overallPick % this.numTeams;
          this.drafted.push(pick); // add player to drafted list
          this.teams[teamId].add(pick); // add player to team
          this.undrafted.splice(i, 1); // remove player from undrafted list
          this.overallPick += 1; // increment pick count
          console.log(player + ' was just drafted');
          playerNotFound = false;
          break; // dont keep looking, stop for loop
        }
      }
      if (playerFound) {
        Error('Player not found: ' + player);
      }
    } catch {
      throw Error("Player not found: " + player);
    }
  }

  // Returns an array of the next numBest players available.
  getBestAvailable() {
    let result = [];
    for (let i = 0; i < this.numBest; i++) {
      result.push(this.undrafted[i]);
    }
    return result;
  }

  pad(num) {
    let result = num.toString();
    if (num < 10) {
      result = '0' + result;
    }
    return result;
  }

  /**
   * Returns an array of the percentage of experts who agree with the given
   * pick.
   * @returns {array}  - the percent of experts who agree with each pick
   */
  getExpertConsensus() {
    let players = this.getBestAvailable();
    let result = [];
    // (pick, avg, std) => z value
    for (let i = 0; i < players.length; i++) {
      let pick = this.overallPick + 1; // zero-indexed
      let player = players[i];
      let zScore = (pick - parseFloat(player.avg)) / parseFloat(player.std);
      let z = Math.floor(100 * zScore) / 100;
      result.push(z);
    }
    // z value => decimal
    let total = 0.0;
    for (let i = 0; i < players.length; i++) {
      let z = result[i];
      let decimal = 0.00;
      if (z < -3.99) {
        decimal = 0.00;
      } else if (z > 3.99) {
        decimal = 1.00;
      } else {
        let zTable = Stats.zTable();
        let index = Math.round(100 * z + 399);
        decimal = zTable[index];
      }
      result[i] = decimal;
      total += decimal;
    }
    // decimal => percentage
    for (let i = 0; i < result.length; i++) {
      result[i] = Math.round(100 * result[i] / total) + '%';
    }
    return result;
  }
}