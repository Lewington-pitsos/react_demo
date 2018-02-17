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

  addCommand(props) {
    // checkes for the type of command to add
    // creates and pushes the appripriate command to commands
    if (props.increment) {
      this.commands.push(new Increment(
        props.nextCommand,
        props.bucket,
        this.getNextId)
      )
    } else {
      this.commands.push(new Decrement(
        props.nextCommand,
        props.bucket,
        this.getNextId,
        props.alternateNext,
        programStore.getBucket(props.bucket)
      ))
    }

    this.emit('change')
  }

  getNextId() {
    var id = this.nextId

    this.getNextId += 1

    return id
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))
export default programStore;
