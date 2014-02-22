var _ = require('lodash');

/**
 * Tests if the from tile can be merged into the to
 * tile.  It is possible that this should live somewhere else
 * but this seems fine for now.  Returns -1 if from cannot
 * be smused into to, otherwise it returns the result of the smooshing
 */
var combine = function(from, to) {
  if (to === 0) {
    return from;
  } else if (from === 0) {
    return to;
  } else if (((to === 1) && (from === 2)) || ((to === 2) && (from === 1))) {
    return 3;
  } else if ((from > 2) && (from === to)) {
    return from + to;
  } else { 
    return -1;
  }
}

var canShiftRowRight = function(row) {
  for (var i = 0; i < (row.length - 1); i++) {
    if (combine(row[i], row[i+1]) > -1) {
      return true;
    }
  }
  return false;
}

/**
 * Actually return a new row which is this row shifted
 * right with no new value inserted at the front, even
 * if a shift does occur
 */
var shiftRowRight = function(row) {
  // new row is built in reverse since array doesn't appear to support prepend
  var newRow = [];

  // we only do at most, one smoosh of tiles (combine two tiles) per shift
  // so after we have done one we just copy the rest of the array 
  var shifted = false;
  for (var i = (row.length - 1); i > -1; i--) {
    if (shifted) {
      newRow.push(row[i])
    } else {
      var tile = combine(row[i-1], row[i])
      if (tile > -1) {
        newRow.push(tile);
        shifted = true;
        i--;
      } else {
        newRow.push(row[i]);
      }
    }
  }

  // if a row is shifted we need to push a 0 to the end (front)
  if (shifted) {
    newRow.push(0);
  }

  // since we built the new row in reverse we now need to reverse it
  newRow.reverse()
  return newRow;
}

module.exports = {
  combine: combine,
  canShiftRowRight: canShiftRowRight,
  shiftRowRight: shiftRowRight
}
