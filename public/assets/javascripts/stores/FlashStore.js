// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class FlashStore extends EventEmitter {
  constructor() {
    super()
    this.message = null
  }

  getInfo() {
    return {message: this.message}
  }

  flash(message) {
    this.message = message
    $flash = $('#flash')
    $flash.removeClass('hidden')

    this.emit('change')

    setTimeout(this.unFlash.bind(this), 6000)
  }

  unFlash() {
    this.message = null

    this.emit('change')
  }

  handleActions(action) {
    switch(action.type) {
      case "FLASH": {
        this.flash(action.message)
        break
      }
    }
  }

}

const flashStore = new FlashStore;

dispatcher.register(flashStore.handleActions.bind(flashStore))
export default flashStore;
