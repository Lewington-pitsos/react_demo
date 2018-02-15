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
        console.log('picked u at store');
        this.layoutGOL()
        break
      }
    }
  }

  layoutGOL() {
    this.GOLState = true

    this.emit('change')
  }
}

const flipperStore = new FlipperStore;

dispatcher.register(flipperStore.handleActions.bind(flipperStore))
export default flipperStore;
