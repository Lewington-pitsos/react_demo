import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class BoardStore extends EventEmitter {
  constructor() {
    super()
    this.maxSize = 600
    this.cellSize = 600
    this.number = 1

    // cells are stored in an array
    this.cells = [
      { id: 88828, backSide: false }
    ]

    this.autoFlipper = false
    this.secondAutoFlipper = false
  }

  cellSpecs() {
    // returns all the cell info stored as a single object
    return {cellSize: this.cellSize, number: this.number, cells: this.cells}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_CELL": {
        this.addCell();
        break
      } case "FLIP_CELL": {
        this.flipCell(action.cellId);
        break
      } case 'RAND_FLIPPING': {
        this.toggleRandFlipping();
        break
      }
    }
  }

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
  }

  flipSomeCells() {
    // chooses a number between 1 and 1/3 of the current max and executes that manay random flips
    var times = Math.floor(Math.random() * (this.cells.length / 3) ) + 1
    for (; times > 0; times--) {
      this.flipRandomCell.call(this)
    }
  }

  flipRandomCell() {
    // chooses a cell at random from all the stored cells and changes it's clip orientation, emmitting a change event
    var cell = this.cells[ Math.floor(Math.random() * this.cells.length) ]
    cell.backSide = !cell.backSide

    this.emit('change')
  }

  addCell() {
    // adds a new cell object to the array of cell objects, reduces the size of rendered cells and fires a 'change' event
    this.number += 1
    this.resizeCells()
    this.cells.push({id: Date.now(), backSide: false})
    this.emit('change')
  }

  resizeCells() {
    // Hackily reudces cell size as more cells are added
    this.cellSize = (this.cellSize <= 100 ? 100 : this.cellSize - 50)
  }

  flipCell(id) {
    // finds the cell object that matches id and toggles it's side value
    this.cells.forEach(function(cell) {
      if (cell.id == id) {
        cell.backSide = !cell.backSide
      }
    })

    this.emit('change')
  }

}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
export default boardStore;
