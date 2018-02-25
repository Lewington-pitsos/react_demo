/*

The beating heart of the flipper interface, it:
  - stores an array of cell objects. Their indexes in this array act as unique identifiers
  - Also keeps track of:
    - the maximum number of cells the board should hold
    - whether this number has been reached
    - the maximum size of a cell
    - the current size of all cells on the board
    - whether the board's width is fixed

    - whether we are currently playing the GOL
    - whether randomflipping is occuring

It contains a bunch of methods for updating components

It is responsible for going in and out of GOL mode

  - normal mode unique features:
    - cells are stored in the normal array
    - random flipping is possible
    - cells can be added
    - the board's width varies depending on how wide the view is

  - GOL mode unique features:
    - cells are stored in a matrix (as well as the array) and have references to their siblings (the matrix should reflect the matrix of cells that the user sees)
    - GOL can be played, step-at-a-time or indefinitly
    - The board's width is fixed

It can trigger random flipping when in normal mode

It can trigger a GOL round or indefinite GOL round playing while in GOL mode (see GOLHelper)

It can add cells to the cell tracking array

It can change the flip-state (facing) of a given cell

*/

import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'
import randomFLippingHelper from './BoardStore/randomFlippingHelper'
import matrixHelper from './BoardStore/matrixHelper'
import PositionedCell from './BoardStore/PositionedCell'
import GOLHelper from './BoardStore/GOLHelper'
import flashActions from '../actions/flashActions'

// the cells that start off on the board
const defaultCells = [
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false },
  { backSide: false }
]

class BoardStore extends EventEmitter {
  constructor() {
    super()
    // information about the board's contents
    this.maxCells = 100
    this.maxedOut = false
    this.maxSize = 600
    this.cellSize = 200
    this.boardWidth = false

    // infromation about what is occuring to/on the board
    this.playing = false
    this.autoFlipper = false
    this.secondAutoFlipper = false

    // trackes whether changes were made during the last GOL round
    this.noChanges = true
    // cells are stored as an array of PositionedCell objects
    this.cells = defaultCells.map(cell =>
      new PositionedCell(cell.id,     cell.backSide))

    // mixins
    Object.assign(this, randomFLippingHelper);
    Object.assign(this, matrixHelper)
    Object.assign(this, GOLHelper)
  }

  // ======= component updating =========

  cellSpecs() {
    // returns all the cell info stored as a single object
    return {
      cellSize: this.cellSize,
      number: this.cells.length,
      cells: this.cells,
      fixedWidth: this.boardWidth,
      playing: this.playing
    }
  }

  isPlaying() {
    return { playing: this.playing }
  }

  isFlipping() {
    return { flipping: this.autoFlipper }
  }

  GOLMode() {
    return {GOLMode: this.boardWidth }
  }

  // ======= Dispatcher interaction =========

  handleActions(action) {
    switch(action.type) {
      case "ADD_CELL": {
        this.addCell(action.number);
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
      } case 'TOGGLE_GOL': {
        this.toggleGOL()
        break
      }
    }
  }

  // ======= board fixing (i.e. getting into GOL mode) =========

  fixBoard(boardWidth) {
    // firstly we stop any random flipping that might be going on
    this.stopRandFlip()
    // fixes the width of the board component/element to it's current width and creates a matrix from the cell objects
    this.fixBoardUi(boardWidth)
    this.everyCell(this.assignSiblings.bind(this))

    // this is only here so the board width gets fixed on the DOM
    this.emit('change')
  }

  fixBoardUi(boardWidth) {
    // calculates the maximum number of cells per row
    // fixes the board width using this number and the cell width
    // creates a matrix based on the cell number which reflects what the user sees on screen
    var cellsPerRow = Math.floor(boardWidth / this.cellSize)
    this.boardWidth = cellsPerRow * this.cellSize
    this.cellMatrix = this.matrixify(this.cells, cellsPerRow)
  }

  exitGol() {
    // the opposute of fixBoard, returns us to non-GOL flipping
    this.boardWidth = false
    this.stopPlaying()
    this.emit('change')
  }

  // ======= cell interaction =========

  addCell(number) {
    // checks whether the board is already maxed out
    // if not, adds number new PositionedCells to the array of cell objects, reduces the size of rendered cells and fires a 'change' event
    if (!this.maxedOut) {
      this.pushCells(number)
      this.emit('change')
    } else {
      setTimeout(function() {
        flashActions.flash('Maximum cell count reached. Don\'t be greedy now...')
      }, 0)
    }
  }

  pushCells(number) {
    // checks if the maximum cell count has been reached and records if it has
    // if not, cells to the array equal to the passed in number, resizing the cell size each time
    for (var i = 0; i < number; i++) {
      if (this.cells.length < this.maxCells) {
        this.cells.push(new PositionedCell)
        this.resizeCells()
      } else {
        this.maxedOut = true
      }
    }
  }

  resizeCells() {
    // Hackily reudces cell size as more cells are added
    this.cellSize = (this.cellSize <= 80 ? 80 : this.cellSize - 5)
  }

  flipCell(id) {
    // finds the cell object that matches id and toggles it's side value
    this.cells[id].backSide = !this.cells[id].backSide

    this.emit('change')
  }
}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
export default boardStore;
