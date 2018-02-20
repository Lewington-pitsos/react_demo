// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class FlashStore extends EventEmitter {
  constructor() {
    // recede tracks whether the flash is coming or going
    super()
    this.message = null
    this.recede = false
  }

  getInfo() {
    return {message: this.message, recede: this.recede}
  }

  flash(message) {
    // we throttle flashes by preventing flashes unless this.recede is true (i.e. the previous message has started receding) or the previous message is null (i.e. this is the first message)
    if (this.recede || !this.message) {
      this.displayMessage(message)
    }
  }

  displayMessage(message) {
    // we update the message and record that the flash is supposed to be fading in. After some time we fade it back out.

    // the first time it renders, flash is given the hidden class. Everytime we get a new message we un-hide it
    $('#flash').removeClass('hidden')
    this.recede = false
    this.message = message

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
