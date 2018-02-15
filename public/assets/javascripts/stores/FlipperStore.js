import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class FlipperStore extends EventEmitter {
  constructor() {
    super()
    this.GOLPanel = false
    this.titleText = 'Flippers'
  }

  getInfo() {
    {GOLPanel: this.GOL_panel, titleText: this.titleText}
  }
}

const flipperStore = new FlipperStore;

dispatcher.register(flipperStore.handleActions.bind(flipperStore))
export default flipperStore;
