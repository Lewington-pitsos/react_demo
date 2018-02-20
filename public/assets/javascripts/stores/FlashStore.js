// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class FlashStore extends EventEmitter {
  constructor() {
    super()
    this.message = null
    this.recede = false
  }

  getInfo() {
    return {message: this.message, recede: this.recede}
  }

  flash(message) {
    this.recede = false
    this.message = message
    const $flash = $('#flash')
    $flash.removeClass('hidden')

    this.emit('change')
    setTimeout(this.unFlash.bind(this), 4000)
  }

  unFlash() {
    this.recede = true

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
