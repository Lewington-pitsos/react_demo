import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class BoardStore extends EventEmitter {
  constructor() {
    super()
    this.cellSize = 600
    this.number = 1
    this.cells = [ 88828 ]
  }

  cellSpecs() {
    return {cellSize: this.cellSize, number: this.number, cells: this.cells}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_CELL": { // increases cell number by one
        console.log('action handled');
        this.addCell();
      }
    }
  }

  addCell() {
    this.number += 1
    this.cells.push(Date.now())

    this.emit('change')
  }

}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
window.dispatcher = dispatcher
export default boardStore;
