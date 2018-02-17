import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import Command from './ProgramStore/Command'
import Increment from './ProgramStore/Increment'
import Decrement from './ProgramStore/Decrement'
import dispatcher from '../dispatcher'
import executorStore from './ExecutorStore'

class ProgramStore extends EventEmitter {
  constructor() {
    super()
    this.commands = [
      new Increment(1, 1, 1)
    ]
    this.nextId = 2
  }

  getInfo() {
    return {commands: this.commands}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMAND": {
        this.addCommand(action.commandProps)
        break
      }
    }
  }

  getNextId() {
    var id = this.nextId

    this.getId += 1

    return id
  }

  addCommand(props) {
    // checkes for the type of command to add
    // creates and pushes the appripriate command to commands
    var id = this.getNextId()

    if (props.increment) {
      this.commands.push(new Increment(
        props.nextCommand,
        props.bucket,
        id)
      )
    } else {
      this.commands.push(new Decrement(
        props.nextCommand,
        props.bucket,
        id,
        props.alternateNext,
        executorStore.getBucket(props.bucket)
      ))
    }

    this.emit('change')
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))
export default programStore;
