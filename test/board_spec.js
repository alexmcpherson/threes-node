var expect = require('chai').expect;
//var _ = require('lodash');
var Board = require('../lib/board');

describe('Board', function() {
  var board = new Board();

  it('can be instantiated', function() {
    expect(board instanceof Board).to.be.true
  });

  it('has a grid of the proper size', function() {
    expect(board.grid.length).to.eql(4)
    expect(board.grid[0].length).to.eql(4)
  });

  it('responds to the cardinal directions', function() {
    expect(board).to.respondTo('up')
    expect(board).to.respondTo('down')
    expect(board).to.respondTo('left')
    expect(board).to.respondTo('right')
  });

  it('has a seed method that randomly starts the board', function() {
    var board = new Board();
    expect(board).to.respondTo('seed');
    //pending
  });

  it('can count its members properly', function() {
    var board = new Board();
    board.grid = [
      [2,0,0,0],
      [0,3,0,0],
      [0,0,6,0],
      [0,48,0,0]
    ];

    expect(board.count(0)).to.eql(12)
    expect(board.count(48)).to.eql(1)
  });

  it('can score the board accurately', function() {
    var board = new Board();
    board.grid = [
      [6,2,3,1],
      [2,12,6,3],
      [2,3,12,1],
      [3,96,1,12]
    ];

    expect(board.getScore()).to.eql(840)
  });

  it('can return the highets value on the grid', function() {
    var board = new Board();
    board.grid = [
      [2,0,0,0],
      [0,3,0,0],
      [0,0,6,0],
      [0,48,0,0]
    ];

    expect(board.highest()).to.eql(48)
  });

  it('has a deck of next tiles', function() {
    expect(board.deck).to.exist
    expect(board.deck.length).to.eql(12)
  });

  it('selects from the correct pool of possibilities for new tiles', function() {
    expect(board._addedTile(48)).to.be.within(3,6)
    expect(board._addedTile(96)).to.be.within(3,12)
    expect(board._addedTile(192)).to.be.within(3,24)
    expect(board._addedTile(384)).to.be.within(3,48)
  })

  it('adds another tile if the grid is over 48', function() {
    var board = new Board();
    board.grid = [
      [2,0,0,0],
      [0,3,0,0],
      [0,0,6,0],
      [0,192,0,0]
    ];
    board.deal();

    expect(board.deck.length).to.eql(13)
  })
});
