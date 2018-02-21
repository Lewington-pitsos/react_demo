import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'
import randomFLippingHelper from './BoardStore/randomFlippingHelper'
import matrixHelper from './BoardStore/matrixHelper'
import PositionedCell from './BoardStore/PositionedCell'

class BoardStore extends EventEmitter {
  constructor() {
    super()
    this.maxSize = 600
    this.cellSize = 200
    this.number = 12
    this.boardWidth = false

    this.playing = false
    this.autoFlipper = false
    this.secondAutoFlipper = false

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
    Object.assign(this, randomFLippingHelper);
    Object.assign(this, matrixHelper)
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

  isPlaying() {
    return { playing: this.playing }
  }

  isFlipping() {
    return { flipping: this.autoFlipper }
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
      } case 'CASCADE_FLIP': {
        this.cascadeFlip(this.reverse.bind(this))
        break
      } case 'PLAY_ROUND': {
        this.playRound()
        break
      } case 'EXIT_GOL': {
        this.exitGol()
        break
      } case 'START_GOL': {
        this.startGOL()
        break
      }
    }
  }

  startGOL() {
    // starts the game of life if there isn't one running currently, otherwise, stops the current one
    if (!this.playing) {
      this.startPlaying()
    } else {
      clearInterval(this.playing)
      this.playing = false
    }

    this.emit('change')
  }

  exitGol() {
    this.boardWidth = false

    this.emit('change')
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
    this.cellSize = (this.cellSize <= 100 ? 100 : this.cellSize - 10)
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
    // firstly we stop any random flipping that might be going on
    this.stopRandFlip()
    // fixes the width of the board component/element to it's current width
    // also uses that width and the current cell size to craete a fixed matrix of cells that reflects the current on-screen cell layout
    this.fixBoardUi(boardWidth)
    this.everyCell(this.assignSiblings.bind(this))

    // this is only here so the board width gets fixed on the DOM
    this.emit('change')
  }

  fixBoardUi(boardWidth) {
    var cellsPerRow = Math.floor(boardWidth / this.cellSize)
    this.boardWidth = cellsPerRow * this.cellSize
    this.cellMatrix = this.matrixify(this.cells, cellsPerRow)
  }
}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
export default boardStore;
