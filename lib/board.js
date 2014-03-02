var _ = require('lodash');
var grid = require('./grid');

var BOARD_DIM = 4;

var Board = function() {
  this.reset();
}

/* Threes! The best game ever
/  1, 2, 3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072...
*/

var tiles = function(n) {
  var tiles = [1,2,3];
  for(var i = 3; i < n; i++) {
    tiles.push(tiles[i-1] * 2);
  }
  return tiles;
}(25)

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
    return grid.reduce(this.grid, 0, function(max, tile) {
      return tile > max ? tile : max;
    });
  },

  reset: function() {
    this.deal();
    this.grid = [];
    for (var i = 0; i < BOARD_DIM; i++) {
      var row = [];
      for (var j = 0; j < BOARD_DIM; j++) {
        row.push(0);
      }
      this.grid.push(row);
    }
  },

  seed: function () {

  },

  up: function() {
    this.grid = grid.transpose(this.grid);
    this.grid = grid.reverseRows(this.grid);
    this.right();
    this.grid = grid.reverseRows(this.grid);
    this.grid = grid.transpose(this.grid);
  },

  down: function() {
    this.grid = grid.transpose(this.grid);
    this.right();
    this.grid = grid.transpose(this.grid);
  },

  left: function() {
    this.grid = grid.reverseRows(this.grid);
    this.right();
    this.grid = grid.reverseRows(this.grid);
  },

  right: function() {
    this.grid = grid.shiftRight(this.grid, Math.random(), this._nextTile());
  },

  _rightShiftableRows: function(grid) {
    var indices = [];
    for (var i = 0; i < grid.length; i++) {
      if (this._canShiftRowRight(grid[i])) {
        indices.push(i);
      }
    }
    return indices;
  },

  _addedTile: function(highest) {
    var limit = highest / 6;
    var firstHigher = _.findIndex(tiles, function(value) {
      return value > limit
    });

    var possibilities = tiles.slice(2, firstHigher)

    return possibilities[Math.floor(Math.random() * possibilities.length)]
  },

  _nextTile: function() {
    if (this.deck.length() < 1) {
      this.deal()
      return this.deck.pop();
    }

    return this.deck.pop();
  },

  count: function(tileValue) {
    return grid.reduce(this.grid, 0, function(cnt, tile) {
      return cnt + (tile == tileValue ? 1 : 0);
    });
  },

  getScore: function() {
    return grid.reduce(this.grid, 0, function(score, tile) {
      if (tile < 3) {
        return score;
      } else {
        return score + Math.pow(3, getBaseLog(2, tile/3) + 1);
      }
    });
  }
}

module.exports = Board
