export default {
  toggleRandFlipping() {
    // starts two staggered intervals which keep choosing random numbers of random cells and flipping them
    // if the intervals are already running, it stops them both
    // either way emit a change event to update flipping-related components
    if (this.autoFlipper) {
      this.stopRandFlip()
    } else {
      this.startRandFlip()
    }

    this.emit('change')
  },

  startRandFlip() {
    // flips some cells at random immidately, and then sets two staggared intervals for indefinite future flipping
    this.flipSomeCells()
    this.autoFlipper = setInterval(this.flipSomeCells.bind(this), 2800)
    this.secondAutoFlipper = setInterval(this.flipSomeCells.bind(this), 2100)
  },

  stopRandFlip() {
    // clears both intervals and resets them to false
    clearInterval(this.autoFlipper)
    clearInterval(this.secondAutoFlipper)
    this.secondAutoFlipper = false
    this.autoFlipper = false
  },

  flipSomeCells() {
    // chooses a number between 1 and 1/3 of the current max and executes that manay random flips
    var times = Math.floor(Math.random() * (this.cells.length / 3) ) + 1
    for (; times > 0; times--) {
      this.flipRandomCell.call(this)
    }
  },

  flipRandomCell() {
    // chooses a cell at random from all the stored cells and changes it's clip orientation, emmitting a change event
    var cell = this.cells[ Math.floor(Math.random() * this.cells.length) ]
    cell.backSide = !cell.backSide

    this.emit('change')
  },

  autoFlipper: false,
  secondAutoFlipper: false
}
