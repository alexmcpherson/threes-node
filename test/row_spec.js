var row = require('../lib/row');
var expect = require('chai').expect;

describe('row', function() {

  it('combine works as expected', function() {
    expect(row.combine(0, 1)).to.eql(1);
    expect(row.combine(1, 1)).to.eql(-1);
    expect(row.combine(2, 1)).to.eql(3);
    expect(row.combine(1, 2)).to.eql(3);
    expect(row.combine(2, 2)).to.eql(-1);
    expect(row.combine(3, 3)).to.eql(6);
    expect(row.combine(12, 6)).to.eql(-1);
    expect(row.combine(48, 48)).to.eql(96);
  });

  it('correctly picks out rows that can be shifted right', function() {
    var grid = [ 
      [2,0,0,3],
      [0,3,3,0],
      [0,0,6,6],
      [1,192,2,2]];

    expect(row.canShiftRowRight(grid[0])).to.be.true;
    expect(row.canShiftRowRight(grid[1])).to.be.true;
    expect(row.canShiftRowRight(grid[2])).to.be.true;
    expect(row.canShiftRowRight(grid[3])).to.be.false;
  });

  it('correctly shifts a row to the right', function() {
    var grid = [ 
      [2,0,0,3],
      [0,3,3,0],
      [0,0,6,6],
      [1,192,2,2]];

    expect(row.shiftRowRight(grid[0])).to.eql([0,2,0,3]);
    expect(row.shiftRowRight(grid[1])).to.eql([0,0,3,3]);
    expect(row.shiftRowRight(grid[2])).to.eql([0,0,0,12]);
    expect(row.shiftRowRight(grid[3])).to.eql([1,192,2,2]);
  });

})
