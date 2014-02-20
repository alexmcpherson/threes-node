threes-node
===========

An emulation of the iOS game Threes, for... reasons. Not commercial ones though. Just high scores.

`npm install`

`grunt watch`

Plans for implementing moves, and basic convinience methods for evaluating game state like counting nearest, expected values on next move, etc. Suggestions welcome.

TODO:

 - Deal first 9 tiles into the starting grid
 - Calculate next grid state given a move left/right/up/down
  - collapse adjacent tiles properly
  - feed in from the 'hand' and redeal as needed
 -  Convenience method for 'game over'

Long term I want a heuristic uploads site that score strategies that run against this implementation of threes. Pipedream, sure.
