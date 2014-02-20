threes-node
===========

An emulation of the iOS game Threes, for... reasons. Not commercial ones though. Just high scores.

`npm install`

`grunt watch`

Plans for implementing moves, and basic convinience methods for evaluating game state like counting nearest, expected values on next move, etc. Suggestions welcome.

 - Deal first 9 tiles into the starting grid
 - Calculate next grid state given a move left/right/up/down
  - collapse adjacent tiles properly
  - feed in from the 'hand' and redeal as needed
 -  Convinience method for 'game over'
