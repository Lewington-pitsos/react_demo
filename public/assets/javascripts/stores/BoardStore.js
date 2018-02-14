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

    this.flipping = false
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
    // starts a timeout which keeps choosing a random cell and telling it to flip OR stops it if it's already going
    if (this.flipping) {
      this.flipping = false
    } else {
      this.flipping = setInterval(this.flipRandomCell.bind(this), 500)
    }
  }

  flipRandomCell() {
    console.log('flipping...' + this);
    var cell = this.cells[ Math.floor(Math.random() * this.cells.length) ]
    this.flipCell(cell.id)
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
