import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'
import randomFLipping from './BoardStore/randomFlipping'
import PositionedCell from './BoardStore/PositionedCell'

class BoardStore extends EventEmitter {
  constructor() {
    super()
    this.maxSize = 600
    this.cellSize = 200
    this.number = 12
    this.boardWidth = false

    // cells are stored as an array of PositionedCell objects
    this.cells = [
      { id: 88828, backSide: false },
      { id: 75766, backSide: false },
      { id: 54676, backSide: false },
      { id: 78678, backSide: false },
      { id: 53456, backSide: false },
      { id: 11231, backSide: false },
      { id: 45677, backSide: false },
      { id: 76576, backSide: false },
      { id: 35656, backSide: false },
      { id: 56456, backSide: false },
      { id: 96456, backSide: false },
      { id: 88528, backSide: false }
    ].map(cell => new PositionedCell(cell.id, cell.backSide))

    // random flipping mixin. All properties in randomFLipping are copied accross to our BoardStore instance
    Object.assign(this, randomFLipping);
  }

  cellSpecs() {
    // returns all the cell info stored as a single object
    return {
      cellSize: this.cellSize,
      number: this.number,
      cells: this.cells,
      fixedWidth: this.boardWidth
    }
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_CELL": {
        this.addCell();
        break
      } case "FLIP_CELL": {
        this.flipCell(action.cellId)
        break
      } case 'RAND_FLIPPING': {
        this.toggleRandFlipping()
        break
      } case 'FIX_BOARD': {
        this.fixBoard(action.boardWidth)
        break
      }
    }
  }

  addCell() {
    // adds a new PositionedCell to the array of cell objects, reduces the size of rendered cells and fires a 'change' event
    this.number += 1
    this.resizeCells()
    this.cells.push(new PositionedCell(Date.now()))
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

  fixBoard(boardWidth) {
    var cellsPerRow = Math.floor(boardWidth / this.cellSize)
    console.log('fixing board to width ' + cellsPerRow + ' cells per row')
    // we also have to fix the width of the rendered cell board
    this.boardWidth = cellsPerRow * this.cellSize
    console.log(this.cells)

    this.emit('change')
  }

}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
export default boardStore;
