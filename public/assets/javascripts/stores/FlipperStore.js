import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class FlipperStore extends EventEmitter {
  constructor() {
    super()
    this.GOLState = false
  }

  getInfo() {
    return {GOLState: this.GOLState}
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
    this.GOLState = false

    this.emit('change')
  }

  layoutGOL() {
    this.GOLState = true

    this.emit('change')
  }
}

const flipperStore = new FlipperStore;

dispatcher.register(flipperStore.handleActions.bind(flipperStore))
export default flipperStore;
