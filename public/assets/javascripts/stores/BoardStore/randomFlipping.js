export default {
  toggleRandFlipping() {
    console.log('store received toggleflip command');
    // starts two staggered intervals which keep choosing random numbers of random cells and flipping them
    // if the intervals are already running, it stops them both
    if (this.autoFlipper) {
      clearInterval(this.autoFlipper)
      clearInterval(this.secondAutoFlipper)
    } else {
      this.autoFlipper = setInterval(this.flipSomeCells.bind(this), 2800)
      this.secondAutoFlipper = setInterval(this.flipSomeCells.bind(this), 2100)
    }
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
