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
      } case 'CASCADE_FLIP': {
        this.cascadeFlip()
        break
      } case 'PLAY_ROUND': {
        this.playRound()
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

    // we also have to fix the width of the rendered cell board
    this.boardWidth = cellsPerRow * this.cellSize
    console.log(this.cells)
    this.cellMatrix = this.matrixify(this.cells, cellsPerRow)
    this.everyCell(this.assignSiblings.bind(this))
    console.log(this.cells)

    this.emit('change')
  }

  matrixify(array, rowLength) {
    // iterate throgh the array and add each element to row
    // if the current array index is equal to the rowLength,
    //  => push the row to matrix
    //  => reset row to an empty array
    //  => add the innitial row length to the current rowLength tracker
    // finally, push the final row to matrix if it contains anything
    var innitialRowLength = rowLength
    var matrix = []
    var row = []

    for (var i = 0; i < array.length; i++) {
      if (i == rowLength) {
        matrix.push(row)
        row = []
        rowLength += innitialRowLength
      }
      row.push(array[i])
    }

    if (row.length) {
      matrix.push(row)
    }

    return matrix
  }

  playRound() {
    // first goes through each cell and calculates its nexte state, then goes throguh them all again and updates the state
    this.everyCell(this.calculateNextState.bind(this))
    this.everyCell(this.assignNextState.bind(this))

    this.emit('change')
  }

  calculateNextState(cell) {
    cell.findNextSide()
  }

  assignNextState(cell){
    cell.updateSide()
  }

  cascadeFlip() {
    // for each row in the matrix it waits successfily longer and then triggers a full flip (all cells in the row have their facing reversed)
    for (var i = 0; i < this.cellMatrix.length; i++) {
      setTimeout( this.flipRow.bind(this), i * 100, this.cellMatrix[i] )
    }
  }

  flipRow(row) {
    // reverses the current facing of each cell on the given rown and then emits a change event
    for (var j = 0; j < row.length; j++) {
      row[j].backSide = !row[j].backSide
    }

    this.emit('change')
  }

  assignSiblings(cell, y, x) {
    // iterates through every cell in the matrix and adds all it's siblings to it's siblingsTracker object
    cell.addSiblings(this.getCoordinateSiblings(x, y))
  }

  everyCell(func) {
    // takes a function and calls it on every cell, plus that cell's coordinates
    for (var i = 0; i < this.cellMatrix.length; i++) {
      for (var j = 0; j < this.cellMatrix[i].length; j++) {
        func(this.cellMatrix[i][j], i, j)
      }
    }
  }

  getCoordinateSiblings(x, y) {
    // very simple: just pushes all the values at neighbouring coordinates to an array and returns it (minus any falsey values)
    var siblingsArray = []
    if (y > 0) {
      siblingsArray.push(this.cellMatrix[y-1][x-1])
      siblingsArray.push(this.cellMatrix[y-1][x])
      siblingsArray.push(this.cellMatrix[y-1][x+1])
    }

    siblingsArray.push(this.cellMatrix[y][x-1])
    siblingsArray.push(this.cellMatrix[y][x+1])

    if (y < this.cellMatrix.length - 1 ) {
      siblingsArray.push(this.cellMatrix[y+1][x-1])
      siblingsArray.push(this.cellMatrix[y+1][x])
      siblingsArray.push(this.cellMatrix[y+1][x+1])
    }

    return siblingsArray.filter(cell => cell);
  }

}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
export default boardStore;
