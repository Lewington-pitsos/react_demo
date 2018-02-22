import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class ExecutionStore extends EventEmitter {
  constructor() {
    super()
    this.tutorial = true
  }

  getTutorial() {
    return {tutorial: this.tutorial}
  }

  exitTutorial() {
    this.tutorial = false

    this.emit('change')
  }

  enterTutorial() {

    this.tutorial = true

    this.emit('change')
  }

  handleActions(action) {
    switch(action.type) {
      case "EXIT_TUTORIAL": {
        this.exitTutorial()
        break
      } case "ENTER_TUTORIAL": {
        this.enterTutorial()
        break
      }
    }
  }

}

const tutorialStore = new ExecutionStore;

dispatcher.register(tutorialStore.handleActions.bind(tutorialStore))
export default tutorialStore;
