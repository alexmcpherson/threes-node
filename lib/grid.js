var _ = require('lodash');
var row = require('./row');

var traverse = function(grid, cb) {
  _.each(grid, function(row) {
    _.each(row, cb);
  });
}

var reduce = function(grid, init, cb) {
  traverse(grid, function(tile) {
    init = cb(init, tile);
  });
  return init;
}

var rightShiftableRows = function(grid) {
  var indices = [];
  for (var i = 0; i < grid.length; i++) {
    if (row.canShiftRowRight(grid[i])) {
      indices.push(i);
    }
  }
  return indices;
}

var copy = function(grid) {
  return _.map(grid, function(row) {
    return _.map(row, function(it){ return it; });
  })
}

var shiftRight = function(grid, value, randomNbr) {
  var newGrid = copy(grid);

  var shiftableRows = rightShiftableRows(grid);
  _.each(shiftableRows, function(rowIndex) {
    newGrid[rowIndex] = row.shiftRowRight(newGrid[rowIndex]);
  })

  if (shiftableRows.length > 0) {
    newGrid[shiftableRows[Math.floor(randomNbr * shiftableRows.length)]][0] = value;
  }

  return newGrid;
}

var reverseRows = function(grid) {
  var newGrid = copy(grid);
  _.each(newGrid, function(row){ row.reverse(); });
  return newGrid;
}

var transpose = function(grid) {
  var newGrid = _.map(grid, function(){ return []; });
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      newGrid[j][i] = grid[i][j];
    }
  }
  return newGrid;
}

module.exports = {
  copy: copy,
  traverse: traverse,
  reduce: reduce,
  reverseRows: reverseRows,
  transpose: transpose,
  shiftRight: shiftRight
}

