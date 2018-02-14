import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class BoardStore extends EventEmitter {
  constructor() {
    super()
    // cells are stored in an array
    this.cellSize = 600
    this.number = 1
    this.cells = [
      { id: 88828, backSide: false }
    ]
  }

  cellSpecs() {
    return {cellSize: this.cellSize, number: this.number, cells: this.cells}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_CELL": {
        this.addCell();
      } case "FLIP_CELL": {
        this.flipCell(action.cellId)
      }
    }
  }

  addCell() {
    // adds a new cell object to the array of cell objects
    this.number += 1
    this.cells.push({id: Date.now(), backSide: false})

    this.emit('change')
  }

  flipCell(id) {
    // finds the cell object that matches id and toggles it's side value
    this.cells.forEach(function(cell) {
      if (cell.id == id) {
        cell.backSide = !cell.backSide
      }
    })
  }

}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
export default boardStore;
