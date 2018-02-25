/*

literally only responsible for working out whether the use is in GOL mode or not since the board exists irrespective of whether the user is in GOL mode or not I didn't want the BoardStore to be responsible for monitoring this.

*/

import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class FlipperStore extends EventEmitter {
  constructor() {
    super()
    this.GOLMode = false
  }

  getInfo() {
    return {GOLMode: this.GOLMode}
  }

  handleActions(action) {
    switch(action.type) {
      case "FIX_BOARD": {
        this.layoutGOL()
        break
      } case "EXIT_GOL": {
        this.exitGol()
        break
      }
    }
  }

  exitGol() {
    this.GOLMode = false

    this.emit('change')
  }

  layoutGOL() {
    this.GOLMode = true

    this.emit('change')
  }
}

const flipperStore = new FlipperStore;

dispatcher.register(flipperStore.handleActions.bind(flipperStore))
export default flipperStore;
