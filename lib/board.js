var _ = require('lodash');

var Board = function() {
  this.reset();
}

/* Threes! The best game ever
/  1, 2, 3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072...
*/

var tiles = [1, 2, 3, 6, 12, 48, 96, 192, 384, 768, 1536, 3072, 6144, 12288]

var traverse = function(grid, cb) {
  _.each(grid, function(row) {
    _.each(row, function(tile) {
      cb(tile);
    });
  });
}

var getBaseLog = function(x, y) {
  return Math.log(y) / Math.log(x);
}

Board.prototype = {
  deal: function() {
    this.deck = _.shuffle([1,1,1,1,2,2,2,2,3,3,3,3]);
    if (this.highest() >= 48 ) {
      this.deck.push( this._addedTile(this.highest()) );
      this.deck = _.shuffle(this.deck);
    }
  },

  highest: function() {
    var highest = 0;
    traverse(this.grid, function(tile) {
      highest = tile > highest ? tile : highest;
    });

    return highest;
  },

  reset: function() {
    this.deal()
    this.grid = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  },

  seed: function () {

  },

  up: function() {

  },

  down: function() {

  },

  left: function() {

  },

  right: function() {

  },

  _addedTile: function(highest) {
    var limit = highest / 6;
    var firstHigher = _.findIndex(tiles, function(value) {
      return value > limit
    });

    var possibilities = tiles.slice(2, firstHigher)

    return possibilities[Math.floor(Math.random() * possibilities.length)]
  },

  count: function(tileValue) {
    var count = 0;

    traverse(this.grid, function(tile) {
      if (tile == tileValue) {
        count++;
      }
    });

    return count;
  },

  getScore: function(grid) {
    var total = 0;
    traverse(grid, function(tile) {
      if (tile > 2) {
        total += Math.pow(3, getBaseLog(2, tile/3) + 1)
      }
    });
    return total;
  }
}

module.exports = Board