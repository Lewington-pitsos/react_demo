import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class BoardStore extends EventEmitter {
  constructor() {
    super()
    this.cellSize = 600
    this.number = 1
  }

  cellSpecs() {
    return {cellSize: this.cellSize, number: this.number}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_CELL": { // increases cell number by one
        this.addCell(action.title, action.text);
      }
    }
  }

  addCell(title, text) {
    this.number += 1

    this.emit('change')
  }

}

const boardStore = new BoardStore;

dispatcher.register(boardStore.handleActions.bind(boardStore))
window.dispatcher = dispatcher
export default boardStore;