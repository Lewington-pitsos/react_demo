/*

Here lie some methods to help the BoardStore play the GOL. The game is played in successive rounds. Each round consists of:
  - a check of every cell to determine it's next state accoridng to GOL rules
    - A related check to confirm that SOME cell at least has a next state different from it's current one (otherwise no more changes in state will happen ever and the game is over)
  - finally, an update of every cell to that next state*

These methods are also responsible for stopping and starting the GOL cleanly when commanded by the user.

  *the state-calculating and updating steps must be done as two seperate passes. Otherwise updates on cells early in a pass might effect the next-state-calculations of siblings of those cells which occur later in that pass.

*/

import flashActions from '../../actions/flashActions'

export default {
  playRound() {
    // first assumes that no state will change and goes through each cell and calculates its next state,
    // if any state did change, goes through each cell again and updates the state, emmittign a change
    // otherwise, stops the GOL and flashes a message
    this.noChanges = true
    this.everyCell(this.calculateNextState.bind(this))
    if (this.noChanges) {
      this.gameOver()
    } else {
      this.everyCell(this.assignNextState.bind(this))
      this.emit('change')
    }
  },

  toggleGOL() {
    // starts the game of life if there isn't one running currently, otherwise, stops the current one and triggers a change event
    if (!this.playing) {
      this.startPlaying()
    } else {
      this.stopPlaying()
    }
    this.emit('change')
  },

  gameOver() {
    // ceases the curent game, flashes a game over message and emits a change event
    this.stopPlaying()
    setTimeout(function() {
      flashActions.flash('Game over...')
    }, 0)
    this.emit('change')
  },

  startPlaying() {
    // instantly plays one round, and then plays one every interval
    this.playRound()
    this.playing = setInterval(this.playRound.bind(this), 1800)
  },

  stopPlaying() {
    // clears the interval, sets the playing value to false
    clearInterval(this.playing)
    this.playing = false
  },

  // SIMPLE CELL OPERATIONS

  everyCell(func) {
    // takes a function and calls it on every cell, plus that cell's coordinates
    for (var i = 0; i < this.cellMatrix.length; i++) {
      for (var j = 0; j < this.cellMatrix[i].length; j++) {
        func(this.cellMatrix[i][j], i, j)
      }
    }
  },

  calculateNextState(cell) {
    // finds the next state of the passed in cell and whether this is the same as its current one
    // sets noChanges to false as soon as it gets a single change
    const changed = cell.findNextSide()
    if (changed) {
      this.noChanges = false
    }
  },

  assignNextState(cell){
    cell.updateSide()
  },

  reverse(cell) {
    cell.backSide = !cell.backSide
  }
}
