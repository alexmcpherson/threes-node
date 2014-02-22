var grid = require('../lib/grid');
var expect = require('chai').expect;

describe('grid', function() {
  var testGrid = [ 
      [2,0,0,3],
      [0,3,3,0],
      [0,0,6,6],
      [1,192,2,2]];

  /** 
   * Test coverage of this and reduce is pretty 
   * well covered by tests of actual Board functionality
   */
  it('test traverse function for grids', function() {
    var cnt = 0;
    grid.traverse(testGrid, function(tile) {
      cnt++;
    });
    expect(cnt).to.eql(16);
  });

  it('test reverseRows functionality', function() {
    expect(grid.reverseRows(testGrid)).to.eql([
      [3,0,0,2],
      [0,3,3,0],
      [6,6,0,0],
      [2,2,192,1]]);
  });

  it('test that transpose works correctly', function() {
    expect(grid.transpose(testGrid)).to.eql([
        [2,0,0,1],
        [0,3,0,192],
        [0,3,6,2],
        [3,0,6,2]]);
  });

  it('test that shift right is working correctly', function() {
    expect(grid.shiftRight(testGrid,12,0.0)).to.eql([
      [12,2,0,3],
      [0,0,3,3],
      [0,0,0,12],
      [1,192,2,2]
    ]);

    expect(grid.shiftRight(testGrid,12,0.25)).to.eql([
      [12,2,0,3],
      [0,0,3,3],
      [0,0,0,12],
      [1,192,2,2]
    ]);

    expect(grid.shiftRight(testGrid,12,0.34)).to.eql([
      [0,2,0,3],
      [12,0,3,3],
      [0,0,0,12],
      [1,192,2,2]
    ]);

    expect(grid.shiftRight(testGrid,12,0.67)).to.eql([
      [0,2,0,3],
      [0,0,3,3],
      [12,0,0,12],
      [1,192,2,2]
    ]);
  });
});

