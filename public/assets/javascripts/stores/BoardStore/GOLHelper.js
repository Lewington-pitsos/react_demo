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

  gameOver() {
    // ceases the curent game and flashes a game over message
    this.stopPlaying()
    setTimeout(function() {
      flashActions.flash('Game over...')
    }, 0)
    this.emit('change')
  },

  startPlaying() {
    // instantly plays one round, and then plays one every interval
    this.playRound()
    this.playing = setInterval(this.playRound.bind(this), 1300)
  },

  stopPlaying() {
    // clears the interval, sets the playing value to false and emits a change
    clearInterval(this.playing)
    this.playing = false
  },
}
